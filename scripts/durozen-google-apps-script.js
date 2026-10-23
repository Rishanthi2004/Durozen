/**
 * DUROZEN TECHNOLOGIES PVT. LTD.
 * Unified Enterprise Ingestion Engine: Contact Inquiries & Career Applications
 * 
 * Ingestion Architecture:
 * - Mode A: Web App Endpoint (doPost) for website forms (Contact + Careers)
 * - Mode B: Automated Gmail Inbound Reader (syncGmailInbound) for parsing incoming emails
 * 
 * Multi-Channel Routing:
 * - "contact" -> Appends to "Inquiries" sheet, alerts Sales/Tech leads
 * - "career"  -> Appends to "Careers" sheet, alerts Talent/HR team
 * 
 */
 
// ============================================================================
// GLOBAL CONFIGURATION
// ============================================================================
const CONFIG = {
  // Sheet Tab Destinations
  CONTACT_SHEET_NAME: "Inquiries",
  CAREERS_SHEET_NAME: "Careers",

  // Routing Email Addresses
  ADMIN_EMAIL: "sachinn2413@gmail.com",          // General & Sales inquiries recipient
  CAREERS_EMAIL: "sachinn2413@gmail.com",        // Careers & HR applications recipient
  SENDER_EMAIL: "sachinn2413@gmail.com",         // Authorized sender Google account
  
  // Organization Metadata
  COMPANY_NAME: "Durozen Technologies",
  SUPPORT_PHONE: "+91 81223 39694",
  WEBSITE_URL: "https://durozen.in",
  TIMEZONE: "Asia/Kolkata",

  // Gmail Inbound Reader Settings
  GMAIL_QUERY: 'is:unread (subject:"Inquiry" OR subject:"Project" OR subject:"Contact" OR subject:"Career" OR subject:"Resume" OR subject:"Application") -label:Durozen_Processed',
  PROCESSED_LABEL: "Durozen_Processed",
  MAX_THREADS_PER_RUN: 25,

  // Deduplication Cache TTL (6 hours)
  CACHE_TTL_SEC: 21600,

  // Automated Confirmation Receipts
  ENABLE_CLIENT_AUTO_REPLY: true
};

// ============================================================================
// MODE A: WEB APP REST ENDPOINT (doPost & doOptions)
// ============================================================================

/**
 * Handles incoming HTTP POST requests from both Contact and Careers forms.
 * Accepts application/json, application/x-www-form-urlencoded, or text/plain.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    // Acquire lock for up to 10 seconds to eliminate concurrent race conditions
    lock.waitLock(10000);

    // 1. Parse incoming payload
    const data = parseIncomingPayload(e);

    // 2. Determine Submission Type: 'career' vs 'contact'
    const isCareer = detectIfCareerSubmission(data);
    const formType = isCareer ? "career" : "contact";

    // 3. Deduplication Check via CacheService
    const dedupeKey = generateDedupeKey(data, formType);
    const cache = CacheService.getScriptCache();
    if (cache.get(dedupeKey)) {
      Logger.log(`Duplicate submission intercepted [${formType}]: ` + dedupeKey);
      return createJsonResponse({
        status: "ignored",
        message: "Duplicate submission already processed."
      });
    }
    cache.put(dedupeKey, "1", CONFIG.CACHE_TTL_SEC);

    // 4. Route and Process based on type
    if (isCareer) {
      const record = normalizeCareerRecord(data, "Website Careers Form");
      const sheet = getOrInitCareersSheet(CONFIG.CAREERS_SHEET_NAME);
      appendCareerRecord(sheet, record);
      sendCareerAdminAlert(record);

      if (CONFIG.ENABLE_CLIENT_AUTO_REPLY && isValidEmail(record.email)) {
        sendCareerClientReceipt(record);
      }

      return createJsonResponse({
        status: "success",
        type: "career",
        message: "Career application received and recorded successfully.",
        timestamp: record.timestamp.toISOString()
      });

    } else {
      const record = normalizeContactRecord(data, "Website Contact Form");
      const sheet = getOrInitContactSheet(CONFIG.CONTACT_SHEET_NAME);
      appendContactRecord(sheet, record);
      sendContactAdminAlert(record);

      if (CONFIG.ENABLE_CLIENT_AUTO_REPLY && isValidEmail(record.email)) {
        sendContactClientReceipt(record);
      }

      return createJsonResponse({
        status: "success",
        type: "contact",
        message: "Contact inquiry recorded and notifications sent.",
        timestamp: record.timestamp.toISOString()
      });
    }

  } catch (error) {
    Logger.log("doPost Execution Error: " + error.toString());
    return createJsonResponse({
      status: "error",
      message: error.message || error.toString()
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

/**
 * Handles CORS Preflight OPTIONS requests from browsers.
 */
function doOptions(e) {
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Handles GET requests (Browser visits & health checks).
 */
function doGet(e) {
  return createJsonResponse({
    status: "healthy",
    service: "Durozen Technologies Webhook Engine",
    message: "Endpoint is active and accepting POST submissions for Contact and Careers.",
    timestamp: new Date().toISOString()
  });
}

// ============================================================================
// MODE B: GMAIL INBOUND AUTOMATED PARSER (syncGmailInbound)
// ============================================================================

/**
 * Trigger-based function: Scans unread inquiry & career emails in Gmail,
 * parses headers/body, intelligently classifies into Careers vs Inquiries,
 * writes to the respective Sheet, and labels them as processed.
 */
function syncGmailInbound() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    Logger.log("Sync already in progress. Skipping.");
    return;
  }

  try {
    const contactSheet = getOrInitContactSheet(CONFIG.CONTACT_SHEET_NAME);
    const careersSheet = getOrInitCareersSheet(CONFIG.CAREERS_SHEET_NAME);
    const processedLabel = getOrCreateGmailLabel(CONFIG.PROCESSED_LABEL);
    const threads = GmailApp.search(CONFIG.GMAIL_QUERY, 0, CONFIG.MAX_THREADS_PER_RUN);

    threads.forEach(thread => {
      const messages = thread.getMessages();
      messages.forEach(msg => {
        if (!msg.isUnread()) return;

        const msgId = msg.getId();
        const cache = CacheService.getScriptCache();
        if (cache.get("gmail_msg_" + msgId)) return;

        const fromHeader = msg.getFrom();
        const emailAddress = extractEmail(fromHeader);
        const senderName = extractSenderName(fromHeader);
        const subject = msg.getSubject() || "Incoming Email";
        const bodyText = msg.getPlainBody() || "";
        const isCareer = /career|resume|cv|job|hiring|application|internship|engineer/i.test(subject + " " + bodyText.substring(0, 300));

        if (isCareer) {
          const record = {
            timestamp: msg.getDate() || new Date(),
            source: "Gmail Inbound",
            fullName: senderName || "Applicant",
            email: emailAddress,
            phone: extractPhoneNumber(bodyText) || "Not provided",
            discipline: subject,
            portfolioUrl: extractUrl(bodyText) || "N/A",
            message: bodyText.trim().substring(0, 3000),
            status: "New Candidate"
          };
          appendCareerRecord(careersSheet, record);
          sendCareerAdminAlert(record);
        } else {
          const record = {
            timestamp: msg.getDate() || new Date(),
            source: "Gmail Inbound",
            fullName: senderName || "Email Client",
            company: extractDomainAsCompany(emailAddress),
            email: emailAddress,
            phone: extractPhoneNumber(bodyText) || "Not provided",
            service: subject,
            budget: "Via Email",
            message: bodyText.trim().substring(0, 3000),
            status: "New Lead"
          };
          appendContactRecord(contactSheet, record);
          sendContactAdminAlert(record);
        }

        cache.put("gmail_msg_" + msgId, "1", CONFIG.CACHE_TTL_SEC * 4);
        msg.markRead();
      });

      thread.addLabel(processedLabel);
    });

  } catch (err) {
    Logger.log("syncGmailInbound Error: " + err.toString());
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

// ============================================================================
// SHEET MANAGERS (CONTACT & CAREERS)
// ============================================================================

function getOrInitContactSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    const headers = [
      "Timestamp", "Source", "Full Name", "Company",
      "Work Email", "Phone", "Service Required", "Budget Range", "Project Description", "Status"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#121316")
      .setFontColor("#FFFFFF")
      .setFontSize(11)
      .setHorizontalAlignment("center");
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);
    sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");
  }
  return sheet;
}

function appendContactRecord(sheet, r) {
  sheet.appendRow([
    r.timestamp,
    r.source,
    r.fullName,
    r.company,
    r.email,
    r.phone,
    r.service,
    r.budget,
    r.message,
    r.status || "New Lead"
  ]);
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, 2).setHorizontalAlignment("center");
  sheet.getRange(lastRow, 10, 1, 1).setHorizontalAlignment("center");
}

function getOrInitCareersSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    const headers = [
      "Timestamp", "Source", "Candidate Name", "Email",
      "Phone", "Discipline / Role", "Portfolio / LinkedIn / GitHub", "Cover Note / Intro", "Status"
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold")
      .setBackground("#1E293B") // Slate Blue header for Careers
      .setFontColor("#FFFFFF")
      .setFontSize(11)
      .setHorizontalAlignment("center");
    sheet.setRowHeight(1, 36);
    sheet.setFrozenRows(1);
    sheet.getRange(2, 1, sheet.getMaxRows() - 1, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");
  }
  return sheet;
}

function appendCareerRecord(sheet, r) {
  sheet.appendRow([
    r.timestamp,
    r.source,
    r.fullName,
    r.email,
    r.phone,
    r.discipline,
    r.portfolioUrl,
    r.message,
    r.status || "New Candidate"
  ]);
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 1, 1, 2).setHorizontalAlignment("center");
  sheet.getRange(lastRow, 9, 1, 1).setHorizontalAlignment("center");
}

// ============================================================================
// EMAIL TEMPLATES: CONTACT INQUIRIES
// ============================================================================

function sendContactAdminAlert(r) {
  const formattedDate = Utilities.formatDate(r.timestamp, CONFIG.TIMEZONE, "dd MMM yyyy, hh:mm a") + " IST";
  const subject = `[New Project Inquiry] ${r.service} - ${r.fullName} ${r.company && r.company !== "Not specified" ? "(" + r.company + ")" : ""}`;

  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #121316; margin: 0; padding: 0; background-color: #f7f6f2; }
      .wrapper { max-width: 620px; margin: 24px auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e5e5e0; }
      .stripe { height: 5px; background: linear-gradient(90deg, #DE2F28 0%, #F4A81E 33%, #549B31 66%, #24419E 100%); }
      .header { background-color: #121316; padding: 26px 28px; }
      .brand { color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
      .brand span { color: #DE2F28; }
      .sub { color: #8F908E; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; margin-top: 4px; }
      .content { padding: 28px; }
      .badge { display: inline-block; padding: 4px 10px; background-color: #FAF9F6; border: 1px solid #e2e1dc; border-radius: 20px; font-size: 10px; font-weight: 700; color: #DE2F28; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
      .title { font-size: 22px; font-weight: 800; color: #121316; margin: 0 0 6px 0; }
      .desc { font-size: 13px; color: #666666; margin: 0 0 20px 0; }
      .table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 24px; border-radius: 8px; overflow: hidden; border: 1px solid #ebeae5; }
      .table td { padding: 11px 14px; border-bottom: 1px solid #ebeae5; font-size: 13px; }
      .table tr:last-child td { border-bottom: none; }
      .col-label { width: 32%; background-color: #faf9f6; font-weight: 700; color: #555555; text-transform: uppercase; font-size: 11px; }
      .col-val { color: #121316; font-weight: 600; }
      .pill { display: inline-block; padding: 3px 10px; border-radius: 5px; font-size: 11px; font-weight: 700; color: #ffffff; }
      .pill-service { background-color: #24419E; }
      .pill-budget { background-color: #549B31; }
      .msg-box { background-color: #faf9f6; border-left: 4px solid #DE2F28; padding: 14px 18px; border-radius: 0 8px 8px 0; font-size: 13px; white-space: pre-wrap; border: 1px solid #ebeae5; margin-bottom: 24px; }
      .btn { display: inline-block; background-color: #DE2F28; color: #ffffff !important; padding: 12px 26px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; }
      .footer { background-color: #f4f3ee; padding: 20px; text-align: center; border-top: 1px solid #ebeae5; font-size: 11px; color: #777; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="stripe"></div>
      <div class="header">
        <div class="brand">DUROZEN<span>.</span> TECHNOLOGIES</div>
        <div class="sub">Inbound Project Consultation Routing</div>
      </div>
      <div class="content">
        <div class="badge">${r.source}</div>
        <h2 class="title">New Client Consultation Request</h2>
        <p class="desc">A client has submitted an inquiry on the website portal.</p>

        <table class="table">
          <tr><td class="col-label">Full Name</td><td class="col-val">${escapeHtml(r.fullName)}</td></tr>
          <tr><td class="col-label">Company</td><td class="col-val">${escapeHtml(r.company)}</td></tr>
          <tr><td class="col-label">Email</td><td class="col-val"><a href="mailto:${r.email}">${escapeHtml(r.email)}</a></td></tr>
          <tr><td class="col-label">Phone</td><td class="col-val"><a href="tel:${r.phone}">${escapeHtml(r.phone)}</a></td></tr>
          <tr><td class="col-label">Service</td><td class="col-val"><span class="pill pill-service">${escapeHtml(r.service)}</span></td></tr>
          <tr><td class="col-label">Budget</td><td class="col-val"><span class="pill pill-budget">${escapeHtml(r.budget)}</span></td></tr>
          <tr><td class="col-label">Received At</td><td class="col-val">${formattedDate}</td></tr>
        </table>

        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #666; margin-bottom: 6px;">Project Scope:</div>
        <div class="msg-box">${escapeHtml(r.message)}</div>

        <div style="text-align: center; margin: 24px 0 10px;">
          <a href="mailto:${r.email}?subject=Re:%20Durozen%20Consultation%20-%20${encodeURIComponent(r.service)}" class="btn">Reply to ${escapeHtml(r.fullName)} &rarr;</a>
        </div>
      </div>
      <div class="footer">${CONFIG.COMPANY_NAME} Pvt. Ltd. • ${CONFIG.ADMIN_EMAIL}</div>
    </div>
  </body>
  </html>
  `;

  MailApp.sendEmail({
    to: CONFIG.ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    name: CONFIG.COMPANY_NAME,
    replyTo: isValidEmail(r.email) ? r.email : CONFIG.ADMIN_EMAIL
  });
}

function sendContactClientReceipt(r) {
  const subject = `Thank you for contacting ${CONFIG.COMPANY_NAME}`;
  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family: sans-serif; background-color: #f7f6f2; padding: 20px; color: #121316;">
    <div style="max-width: 580px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0;">
      <div style="height: 4px; background: #DE2F28;"></div>
      <div style="padding: 28px;">
        <h2 style="margin-top: 0; color: #121316;">Inquiry Received - ${CONFIG.COMPANY_NAME}</h2>
        <p>Hi ${escapeHtml(r.fullName)},</p>
        <p>Thank you for reaching out regarding <strong>${escapeHtml(r.service)}</strong>. We have logged your request into our systems.</p>
        <div style="background: #faf9f6; padding: 14px 18px; border-radius: 8px; border: 1px solid #eee; margin: 18px 0; font-size: 13px;">
          <strong>Request Summary:</strong><br/>
          • Service: ${escapeHtml(r.service)}<br/>
          • Budget Estimate: ${escapeHtml(r.budget)}<br/>
          • Reference ID: DRZ-${Math.floor(100000 + Math.random() * 900000)}
        </div>
        <p>Our solutions engineering team will review your requirements and respond within <strong>24 business hours</strong>.</p>
        <p>Best regards,<br/><strong>Team Durozen Technologies</strong></p>
      </div>
    </div>
  </body>
  </html>
  `;

  MailApp.sendEmail({
    to: r.email,
    subject: subject,
    htmlBody: htmlBody,
    name: CONFIG.COMPANY_NAME,
    replyTo: CONFIG.ADMIN_EMAIL
  });
}

// ============================================================================
// EMAIL TEMPLATES: CAREERS / TALENT ENQUIRIES
// ============================================================================

function sendCareerAdminAlert(r) {
  const formattedDate = Utilities.formatDate(r.timestamp, CONFIG.TIMEZONE, "dd MMM yyyy, hh:mm a") + " IST";
  const subject = `[Career Application] ${r.discipline} - ${r.fullName}`;

  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #121316; margin: 0; padding: 0; background-color: #f7f6f2; }
      .wrapper { max-width: 620px; margin: 24px auto; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e5e5e0; }
      .stripe { height: 5px; background: linear-gradient(90deg, #F4A81E 0%, #DE2F28 50%, #24419E 100%); }
      .header { background-color: #121316; padding: 26px 28px; }
      .brand { color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; }
      .brand span { color: #F4A81E; }
      .sub { color: #8F908E; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; margin-top: 4px; }
      .content { padding: 28px; }
      .badge { display: inline-block; padding: 4px 10px; background-color: #FAF9F6; border: 1px solid #e2e1dc; border-radius: 20px; font-size: 10px; font-weight: 700; color: #F4A81E; text-transform: uppercase; margin-bottom: 12px; }
      .title { font-size: 22px; font-weight: 800; color: #121316; margin: 0 0 6px 0; }
      .table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 24px; border-radius: 8px; overflow: hidden; border: 1px solid #ebeae5; }
      .table td { padding: 11px 14px; border-bottom: 1px solid #ebeae5; font-size: 13px; }
      .table tr:last-child td { border-bottom: none; }
      .col-label { width: 34%; background-color: #faf9f6; font-weight: 700; color: #555555; text-transform: uppercase; font-size: 11px; }
      .col-val { color: #121316; font-weight: 600; }
      .pill { display: inline-block; background-color: #F4A81E; color: #ffffff; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 5px; }
      .msg-box { background-color: #faf9f6; border-left: 4px solid #F4A81E; padding: 14px 18px; border-radius: 0 8px 8px 0; font-size: 13px; white-space: pre-wrap; border: 1px solid #ebeae5; margin-bottom: 24px; }
      .btn { display: inline-block; background-color: #121316; color: #ffffff !important; padding: 12px 24px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; margin-right: 10px; }
      .btn-secondary { display: inline-block; background-color: #F4A81E; color: #ffffff !important; padding: 12px 24px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; }
      .footer { background-color: #f4f3ee; padding: 20px; text-align: center; border-top: 1px solid #ebeae5; font-size: 11px; color: #777; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="stripe"></div>
      <div class="header">
        <div class="brand">DUROZEN<span>.</span> TALENT PIPELINE</div>
        <div class="sub">Candidate Application Notification</div>
      </div>
      <div class="content">
        <div class="badge">Discipline: ${escapeHtml(r.discipline)}</div>
        <h2 class="title">New Candidate Application</h2>
        <p style="font-size: 13px; color: #666; margin: 0 0 20px 0;">A candidate has submitted their engineering credentials for review:</p>

        <table class="table">
          <tr><td class="col-label">Candidate Name</td><td class="col-val">${escapeHtml(r.fullName)}</td></tr>
          <tr><td class="col-label">Email Address</td><td class="col-val"><a href="mailto:${r.email}">${escapeHtml(r.email)}</a></td></tr>
          <tr><td class="col-label">Phone</td><td class="col-val"><a href="tel:${r.phone}">${escapeHtml(r.phone)}</a></td></tr>
          <tr><td class="col-label">Target Discipline</td><td class="col-val"><span class="pill">${escapeHtml(r.discipline)}</span></td></tr>
          <tr><td class="col-label">Portfolio / Link</td><td class="col-val">${r.portfolioUrl && r.portfolioUrl !== "N/A" ? '<a href="' + r.portfolioUrl + '" target="_blank">' + escapeHtml(r.portfolioUrl) + '</a>' : 'Not provided'}</td></tr>
          <tr><td class="col-label">Applied On</td><td class="col-val">${formattedDate}</td></tr>
        </table>

        <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #666; margin-bottom: 6px;">Introduction / Candidate Note:</div>
        <div class="msg-box">${escapeHtml(r.message)}</div>

        <div style="text-align: center; margin: 24px 0 10px;">
          <a href="mailto:${r.email}?subject=Durozen%20Careers%20-%20Interview%20Next%20Steps" class="btn">
            Email Candidate &rarr;
          </a>
          ${r.portfolioUrl && r.portfolioUrl !== "N/A" ? '<a href="' + r.portfolioUrl + '" target="_blank" class="btn-secondary">Open Portfolio</a>' : ''}
        </div>
      </div>
      <div class="footer">${CONFIG.COMPANY_NAME} Talent Acquisition • ${CONFIG.CAREERS_EMAIL}</div>
    </div>
  </body>
  </html>
  `;

  MailApp.sendEmail({
    to: CONFIG.CAREERS_EMAIL,
    subject: subject,
    htmlBody: htmlBody,
    name: CONFIG.COMPANY_NAME,
    replyTo: isValidEmail(r.email) ? r.email : CONFIG.CAREERS_EMAIL
  });
}

function sendCareerClientReceipt(r) {
  const subject = `Your application to ${CONFIG.COMPANY_NAME} has been received`;
  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"></head>
  <body style="font-family: sans-serif; background-color: #f7f6f2; padding: 20px; color: #121316;">
    <div style="max-width: 580px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e0e0e0;">
      <div style="height: 4px; background: #F4A81E;"></div>
      <div style="padding: 28px;">
        <h2 style="margin-top: 0; color: #121316;">Application Received</h2>
        <p>Hi ${escapeHtml(r.fullName)},</p>
        <p>Thank you for your interest in joining <strong>${CONFIG.COMPANY_NAME}</strong> as part of our <strong>${escapeHtml(r.discipline)}</strong> team.</p>
        <p>Our engineering leadership evaluates profiles thoroughly with a strong focus on craft, autonomy, and clean software architecture. If your experience aligns with our current roadmap, our talent team will reach out directly for an introductory technical conversation.</p>
        <p>We appreciate the time you took to share your work with us.</p>
        <p style="margin-top: 24px;">Best regards,<br/><strong>Talent & Engineering Leadership</strong><br/>${CONFIG.COMPANY_NAME} Pvt. Ltd.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  MailApp.sendEmail({
    to: r.email,
    subject: subject,
    htmlBody: htmlBody,
    name: CONFIG.COMPANY_NAME,
    replyTo: CONFIG.CAREERS_EMAIL
  });
}

// ============================================================================
// PARSERS, DETECTORS & NORMALIZERS
// ============================================================================

function parseIncomingPayload(e) {
  let parsed = {};
  if (e && e.postData && e.postData.contents) {
    try {
      parsed = JSON.parse(e.postData.contents);
    } catch (_) {
      parsed = e.parameter || {};
    }
  } else if (e && e.parameter) {
    parsed = e.parameter;
  }
  return parsed;
}

function detectIfCareerSubmission(d) {
  if (d.type === "career" || d.formType === "career" || d.submissionType === "career") {
    return true;
  }
  // Detect presence of career-specific attributes
  if (d.discipline || d.portfolioUrl || d.resume || d.github || d.linkedin) {
    return true;
  }
  return false;
}

function normalizeContactRecord(d, source) {
  const name = d.name || (d.firstName ? `${d.firstName} ${d.lastName || ""}`.trim() : "") || "Not specified";
  return {
    timestamp: new Date(),
    source: source || "Website Contact Form",
    fullName: name,
    company: d.company || "Not specified",
    email: (d.email || "").trim() || "Not specified",
    phone: (d.phone || "").trim() || "Not specified",
    service: d.service || d.inquiryType || d.subject || "Custom Software Development",
    budget: d.budget || "Not specified",
    message: d.message || "No project description provided.",
    status: "New Lead"
  };
}

function normalizeCareerRecord(d, source) {
  const name = d.name || (d.firstName ? `${d.firstName} ${d.lastName || ""}`.trim() : "") || "Applicant";
  return {
    timestamp: new Date(),
    source: source || "Website Careers Form",
    fullName: name,
    email: (d.email || "").trim() || "Not specified",
    phone: (d.phone || "").trim() || "Not specified",
    discipline: d.discipline || d.role || "Software Engineering",
    portfolioUrl: d.portfolioUrl || d.portfolio || d.linkedin || d.github || "N/A",
    message: d.message || d.note || "No note provided.",
    status: "New Candidate"
  };
}

function generateDedupeKey(d, type) {
  const email = (d.email || "").toLowerCase().trim();
  const name = (d.name || "").toLowerCase().trim();
  const raw = `${type}_${email}_${name}`;
  return Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, raw, Utilities.Charset.UTF_8)
    .map(b => (b < 0 ? b + 256 : b).toString(16).padStart(2, "0"))
    .join("");
}

function extractEmail(text) {
  const match = text.match(/<([^>]+)>/) || text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return match ? match[1].toLowerCase().trim() : text.trim();
}

function extractSenderName(fromHeader) {
  const match = fromHeader.match(/^"?([^"<]+)"?\s*</);
  if (match && match[1]) return match[1].trim();
  return fromHeader.split("@")[0].replace(/[._]/g, " ").trim();
}

function extractDomainAsCompany(email) {
  if (!email || !email.includes("@")) return "N/A";
  const domain = email.split("@")[1].toLowerCase();
  const generic = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];
  if (generic.includes(domain)) return "Individual";
  return domain.split(".")[0].toUpperCase();
}

function extractPhoneNumber(text) {
  const match = text.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/);
  return match ? match[0].trim() : null;
}

function extractUrl(text) {
  const match = text.match(/(https?:\/\/[^\s]+)/i);
  return match ? match[0] : null;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getOrCreateGmailLabel(labelName) {
  let label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);
  }
  return label;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
