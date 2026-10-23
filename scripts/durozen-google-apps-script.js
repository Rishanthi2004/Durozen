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
// EMAIL TEMPLATES: CONTACT INQUIRIES & CAREER APPLICATIONS
// ============================================================================

/**
 * Production-Grade HTML Template: Admin Alert for Client Inquiries
 */
function sendContactAdminAlert(r) {
  const formattedDate = Utilities.formatDate(r.timestamp, CONFIG.TIMEZONE, "dd MMM yyyy, hh:mm a") + " IST";
  const subject = `[Project Inquiry] ${r.service} - ${r.fullName} ${r.company && r.company !== "Not specified" ? "(" + r.company + ")" : ""}`;
  const previewText = `New project consultation: ${r.fullName} (${r.company}) requesting ${r.service} [Budget: ${r.budget}]`;

  const htmlBody = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F4F3EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Hidden Preview Text -->
    <div style="display: none; font-size: 1px; color: #FAF9F6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
      ${escapeHtml(previewText)}
    </div>

    <!-- Main Container -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F3EE; padding: 32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E4DE; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
            
            <!-- 4-Color Brand Stripe -->
            <tr>
              <td style="height: 5px; background: linear-gradient(90deg, #DE2F28 0%, #F4A81E 33%, #549B31 66%, #24419E 100%); line-height: 5px; font-size: 1px;">&nbsp;</td>
            </tr>

            <!-- Header -->
            <tr>
              <td style="background-color: #121316; padding: 28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.2;">
                        DUROZEN<span style="color: #DE2F28;">.</span> TECHNOLOGIES
                      </div>
                      <div style="font-size: 11px; font-weight: 600; color: #9A9B99; text-transform: uppercase; letter-spacing: 0.16em; margin-top: 5px;">
                        Enterprise Client Ingestion Engine
                      </div>
                    </td>
                    <td align="right" style="vertical-align: middle;">
                      <span style="display: inline-block; padding: 5px 12px; background-color: rgba(222, 47, 40, 0.18); border: 1px solid rgba(222, 47, 40, 0.4); border-radius: 20px; font-size: 10px; font-weight: 800; color: #FF6B65; text-transform: uppercase; letter-spacing: 0.12em;">
                        NEW LEAD
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 32px 32px 24px 32px;">
                
                <!-- Headline Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                  <tr>
                    <td>
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #DE2F28; margin-bottom: 6px;">
                        Channel: ${escapeHtml(r.source)}
                      </div>
                      <h1 style="font-size: 22px; font-weight: 800; color: #121316; margin: 0 0 8px 0; line-height: 1.25; letter-spacing: -0.01em;">
                        Project Consultation Request
                      </h1>
                      <p style="font-size: 13px; color: #666664; margin: 0; line-height: 1.6;">
                        A prospect has submitted inquiry details through the portal. Review requirements and initiate the discovery pipeline.
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Structured Key-Value Specification Grid -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; border-spacing: 0; border: 1px solid #ECEBE6; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                  <tr style="background-color: #FAF9F6;">
                    <td width="34%" style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em;">
                      Client Name
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 700; color: #121316;">
                      ${escapeHtml(r.fullName)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em; background-color: #FAF9F6;">
                      Company / Organization
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 600; color: #121316;">
                      ${escapeHtml(r.company)}
                    </td>
                  </tr>
                  <tr style="background-color: #FAF9F6;">
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em;">
                      Work Email
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 600; color: #24419E;">
                      <a href="mailto:${r.email}" style="color: #24419E; text-decoration: none; font-weight: 600;">${escapeHtml(r.email)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em; background-color: #FAF9F6;">
                      Direct Phone
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 600; color: #121316;">
                      <a href="tel:${r.phone}" style="color: #121316; text-decoration: none; font-weight: 600;">${escapeHtml(r.phone)}</a>
                    </td>
                  </tr>
                  <tr style="background-color: #FAF9F6;">
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em;">
                      Required Service
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 700;">
                      <span style="display: inline-block; padding: 4px 10px; background-color: #24419E; color: #FFFFFF; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.02em;">
                        ${escapeHtml(r.service)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em; background-color: #FAF9F6;">
                      Budget Range
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 700;">
                      <span style="display: inline-block; padding: 4px 10px; background-color: #549B31; color: #FFFFFF; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.02em;">
                        ${escapeHtml(r.budget)}
                      </span>
                    </td>
                  </tr>
                  <tr style="background-color: #FAF9F6;">
                    <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em;">
                      Timestamp
                    </td>
                    <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #555553;">
                      ${formattedDate}
                    </td>
                  </tr>
                </table>

                <!-- Message / Project Scope Card -->
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #121316; letter-spacing: 0.1em; margin-bottom: 8px;">
                  Project Brief &amp; Problem Statement:
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                  <tr>
                    <td style="background-color: #FAF9F6; border-left: 4px solid #DE2F28; border-top: 1px solid #ECEBE6; border-right: 1px solid #ECEBE6; border-bottom: 1px solid #ECEBE6; padding: 18px 20px; border-radius: 0 10px 10px 0; font-size: 13px; color: #121316; line-height: 1.65; white-space: pre-wrap;">${escapeHtml(r.message)}</td>
                  </tr>
                </table>

                <!-- Primary Action CTA -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${r.email}?subject=Re:%20Durozen%20Technologies%20Consultation%20-%20${encodeURIComponent(r.service)}" style="display: inline-block; background-color: #DE2F28; color: #FFFFFF !important; padding: 14px 34px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; letter-spacing: 0.02em; box-shadow: 0 4px 14px rgba(222, 47, 40, 0.25);">
                        Reply to ${escapeHtml(r.fullName)} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #FAF9F6; padding: 24px 32px; border-top: 1px solid #ECEBE6; text-align: center;">
                <div style="font-size: 12px; font-weight: 700; color: #121316; margin-bottom: 4px;">
                  ${CONFIG.COMPANY_NAME} Pvt. Ltd.
                </div>
                <div style="font-size: 11px; color: #777775; line-height: 1.5;">
                  Your Trusted Digital Transformation Partner • <a href="${CONFIG.WEBSITE_URL}" style="color: #24419E; text-decoration: none;">${CONFIG.WEBSITE_URL}</a><br />
                  Sent automatically by the Durozen Enterprise Lead Orchestrator.
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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

/**
 * Production-Grade HTML Template: Client Confirmation Receipt
 */
function sendContactClientReceipt(r) {
  const subject = `Inquiry Confirmed: Welcome to ${CONFIG.COMPANY_NAME}`;
  const refId = `DRZ-${Math.floor(100000 + Math.random() * 900000)}`;
  const previewText = `Thank you for consulting Durozen Technologies. Your inquiry regarding ${r.service} has been received.`;

  const htmlBody = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F4F3EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Hidden Preview Text -->
    <div style="display: none; font-size: 1px; color: #FAF9F6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
      ${escapeHtml(previewText)}
    </div>

    <!-- Main Container -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F3EE; padding: 32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E4DE; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
            
            <!-- 4-Color Brand Stripe -->
            <tr>
              <td style="height: 5px; background: linear-gradient(90deg, #DE2F28 0%, #F4A81E 33%, #549B31 66%, #24419E 100%); line-height: 5px; font-size: 1px;">&nbsp;</td>
            </tr>

            <!-- Header -->
            <tr>
              <td style="background-color: #121316; padding: 28px 32px;">
                <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">
                  DUROZEN<span style="color: #DE2F28;">.</span> TECHNOLOGIES
                </div>
                <div style="font-size: 11px; font-weight: 600; color: #9A9B99; text-transform: uppercase; letter-spacing: 0.16em; margin-top: 5px;">
                  Your Trusted Digital Transformation Partner
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px 32px 24px 32px;">
                <div style="display: inline-block; padding: 4px 12px; background-color: #F0F7ED; border: 1px solid #D1E7CA; border-radius: 20px; font-size: 10px; font-weight: 800; color: #3E7923; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px;">
                  INQUIRY CONFIRMED
                </div>

                <h1 style="font-size: 22px; font-weight: 800; color: #121316; margin: 0 0 12px 0; line-height: 1.3;">
                  Hello ${escapeHtml(r.fullName)},
                </h1>

                <p style="font-size: 14px; color: #4B4C4A; line-height: 1.65; margin: 0 0 20px 0;">
                  Thank you for reaching out to <strong>Durozen Technologies</strong> regarding <strong>${escapeHtml(r.service)}</strong>. Your request has been securely logged into our client delivery pipeline.
                </p>

                <!-- Summary Receipt Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF9F6; border: 1px solid #ECEBE6; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 16px 20px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #777775; margin-bottom: 8px;">
                        Consultation Summary
                      </div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding: 4px 0; font-size: 13px; color: #666664;">Reference Number:</td>
                          <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 700; font-family: monospace; color: #121316;">${refId}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; font-size: 13px; color: #666664;">Requested Capability:</td>
                          <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 700; color: #24419E;">${escapeHtml(r.service)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; font-size: 13px; color: #666664;">Allocated Budget Scope:</td>
                          <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 700; color: #549B31;">${escapeHtml(r.budget)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- 3-Step Next Steps Flow -->
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #121316; letter-spacing: 0.08em; margin-bottom: 12px;">
                  What Happens Next:
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="28" style="vertical-align: top;">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #DE2F28; color: #FFFFFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">1</div>
                          </td>
                          <td style="font-size: 13px; color: #4B4C4A; line-height: 1.5;">
                            <strong>Technical Scoping (0–12 Hours):</strong> Our solutions architects analyze your technical problem statement and stack feasibility.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="28" style="vertical-align: top;">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #F4A81E; color: #FFFFFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">2</div>
                          </td>
                          <td style="font-size: 13px; color: #4B4C4A; line-height: 1.5;">
                            <strong>Engineering Consultation:</strong> We schedule a focused, 30-minute discovery call to map architectural milestones.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="28" style="vertical-align: top;">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #24419E; color: #FFFFFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">3</div>
                          </td>
                          <td style="font-size: 13px; color: #4B4C4A; line-height: 1.5;">
                            <strong>Execution Blueprint:</strong> You receive a high-level roadmap, timeline estimate, and engineering commitment.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Immediate Assistance Box -->
                <div style="padding: 16px; background-color: #FAF9F6; border-radius: 10px; border: 1px dashed #D6D5CF; font-size: 12px; color: #666664; line-height: 1.5;">
                  Need immediate support? Contact our technical advisory team directly at <a href="mailto:${CONFIG.ADMIN_EMAIL}" style="color: #24419E; font-weight: 700; text-decoration: none;">${CONFIG.ADMIN_EMAIL}</a> or call <a href="tel:${CONFIG.SUPPORT_PHONE}" style="color: #121316; font-weight: 700; text-decoration: none;">${CONFIG.SUPPORT_PHONE}</a>.
                </div>

                <p style="font-size: 13px; color: #121316; margin: 24px 0 0 0; line-height: 1.6;">
                  Warm regards,<br />
                  <strong>Solutions Engineering Leadership</strong><br />
                  <span style="font-size: 12px; color: #777775;">Durozen Technologies Pvt. Ltd.</span>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #FAF9F6; padding: 24px 32px; border-top: 1px solid #ECEBE6; text-align: center;">
                <div style="font-size: 11px; color: #777775; line-height: 1.5;">
                  &copy; ${new Date().getFullYear()} ${CONFIG.COMPANY_NAME} Pvt. Ltd. All rights reserved.<br />
                  Namakkal, Tamil Nadu, India • <a href="${CONFIG.WEBSITE_URL}" style="color: #24419E; text-decoration: none;">${CONFIG.WEBSITE_URL}</a>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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

/**
 * Production-Grade HTML Template: Admin Alert for Career Applications
 */
function sendCareerAdminAlert(r) {
  const formattedDate = Utilities.formatDate(r.timestamp, CONFIG.TIMEZONE, "dd MMM yyyy, hh:mm a") + " IST";
  const subject = `[Career Application] ${r.discipline} - ${r.fullName}`;
  const previewText = `New candidate profile: ${r.fullName} applying for ${r.discipline}`;

  const htmlBody = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F4F3EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Hidden Preview Text -->
    <div style="display: none; font-size: 1px; color: #FAF9F6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
      ${escapeHtml(previewText)}
    </div>

    <!-- Main Container -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F3EE; padding: 32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E4DE; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
            
            <!-- 4-Color Brand Stripe -->
            <tr>
              <td style="height: 5px; background: linear-gradient(90deg, #F4A81E 0%, #DE2F28 50%, #24419E 100%); line-height: 5px; font-size: 1px;">&nbsp;</td>
            </tr>

            <!-- Header -->
            <tr>
              <td style="background-color: #121316; padding: 28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em; line-height: 1.2;">
                        DUROZEN<span style="color: #F4A81E;">.</span> TALENT PIPELINE
                      </div>
                      <div style="font-size: 11px; font-weight: 600; color: #9A9B99; text-transform: uppercase; letter-spacing: 0.16em; margin-top: 5px;">
                        Engineering Craft &amp; Candidate Acquisition
                      </div>
                    </td>
                    <td align="right" style="vertical-align: middle;">
                      <span style="display: inline-block; padding: 5px 12px; background-color: rgba(244, 168, 30, 0.18); border: 1px solid rgba(244, 168, 30, 0.4); border-radius: 20px; font-size: 10px; font-weight: 800; color: #F4A81E; text-transform: uppercase; letter-spacing: 0.12em;">
                        NEW CANDIDATE
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 32px 32px 24px 32px;">
                
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                  <tr>
                    <td>
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #F4A81E; margin-bottom: 6px;">
                        Discipline: ${escapeHtml(r.discipline)}
                      </div>
                      <h1 style="font-size: 22px; font-weight: 800; color: #121316; margin: 0 0 8px 0; line-height: 1.25; letter-spacing: -0.01em;">
                        Candidate Application Received
                      </h1>
                      <p style="font-size: 13px; color: #666664; margin: 0; line-height: 1.6;">
                        A candidate has submitted their profile and engineering credentials. Review their portfolio and track record below.
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Candidate Grid -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate; border-spacing: 0; border: 1px solid #ECEBE6; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                  <tr style="background-color: #FAF9F6;">
                    <td width="34%" style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em;">
                      Candidate Name
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 700; color: #121316;">
                      ${escapeHtml(r.fullName)}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em; background-color: #FAF9F6;">
                      Email Address
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 600; color: #24419E;">
                      <a href="mailto:${r.email}" style="color: #24419E; text-decoration: none; font-weight: 600;">${escapeHtml(r.email)}</a>
                    </td>
                  </tr>
                  <tr style="background-color: #FAF9F6;">
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em;">
                      Phone Number
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 600; color: #121316;">
                      <a href="tel:${r.phone}" style="color: #121316; text-decoration: none; font-weight: 600;">${escapeHtml(r.phone)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em; background-color: #FAF9F6;">
                      Target Discipline
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 700;">
                      <span style="display: inline-block; padding: 4px 10px; background-color: #F4A81E; color: #FFFFFF; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.02em;">
                        ${escapeHtml(r.discipline)}
                      </span>
                    </td>
                  </tr>
                  <tr style="background-color: #FAF9F6;">
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em;">
                      Portfolio / Profiles
                    </td>
                    <td style="padding: 12px 16px; border-bottom: 1px solid #ECEBE6; font-size: 13px; font-weight: 600;">
                      ${r.portfolioUrl && r.portfolioUrl !== "N/A" ? '<a href="' + r.portfolioUrl + '" target="_blank" style="color: #24419E; text-decoration: none; font-weight: 700;">' + escapeHtml(r.portfolioUrl) + ' &rarr;</a>' : '<span style="color: #999;">Not provided</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; font-size: 11px; font-weight: 700; color: #666664; text-transform: uppercase; letter-spacing: 0.06em; background-color: #FAF9F6;">
                      Applied Date
                    </td>
                    <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #555553;">
                      ${formattedDate}
                    </td>
                  </tr>
                </table>

                <!-- Note / Introduction Box -->
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #121316; letter-spacing: 0.1em; margin-bottom: 8px;">
                  Candidate Introduction &amp; Systems Built:
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                  <tr>
                    <td style="background-color: #FAF9F6; border-left: 4px solid #F4A81E; border-top: 1px solid #ECEBE6; border-right: 1px solid #ECEBE6; border-bottom: 1px solid #ECEBE6; padding: 18px 20px; border-radius: 0 10px 10px 0; font-size: 13px; color: #121316; line-height: 1.65; white-space: pre-wrap;">${escapeHtml(r.message)}</td>
                  </tr>
                </table>

                <!-- Action CTAs -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${r.email}?subject=Durozen%20Careers%20-%20Interview%20Next%20Steps%20for%20${encodeURIComponent(r.discipline)}" style="display: inline-block; background-color: #121316; color: #FFFFFF !important; padding: 13px 30px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; margin-right: 10px; box-shadow: 0 4px 14px rgba(0,0,0,0.15);">
                        Contact Candidate &rarr;
                      </a>
                      ${r.portfolioUrl && r.portfolioUrl !== "N/A" ? '<a href="' + r.portfolioUrl + '" target="_blank" style="display: inline-block; background-color: #F4A81E; color: #FFFFFF !important; padding: 13px 26px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 14px rgba(244, 168, 30, 0.25);">Open Portfolio</a>' : ''}
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #FAF9F6; padding: 24px 32px; border-top: 1px solid #ECEBE6; text-align: center;">
                <div style="font-size: 12px; font-weight: 700; color: #121316; margin-bottom: 4px;">
                  ${CONFIG.COMPANY_NAME} Talent Acquisition Team
                </div>
                <div style="font-size: 11px; color: #777775; line-height: 1.5;">
                  Engineering High-Craft Systems • <a href="${CONFIG.WEBSITE_URL}" style="color: #24419E; text-decoration: none;">${CONFIG.WEBSITE_URL}</a>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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

/**
 * Production-Grade HTML Template: Candidate Confirmation Receipt
 */
function sendCareerClientReceipt(r) {
  const subject = `Application Received: Welcome to ${CONFIG.COMPANY_NAME} Careers`;
  const appRef = `APP-${Math.floor(100000 + Math.random() * 900000)}`;
  const previewText = `Thank you for applying to Durozen Technologies as part of our ${r.discipline} team.`;

  const htmlBody = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #F4F3EE; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
    <!-- Hidden Preview Text -->
    <div style="display: none; font-size: 1px; color: #FAF9F6; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
      ${escapeHtml(previewText)}
    </div>

    <!-- Main Container -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F3EE; padding: 32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; border: 1px solid #E5E4DE; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
            
            <!-- 4-Color Brand Stripe -->
            <tr>
              <td style="height: 5px; background: linear-gradient(90deg, #F4A81E 0%, #DE2F28 50%, #24419E 100%); line-height: 5px; font-size: 1px;">&nbsp;</td>
            </tr>

            <!-- Header -->
            <tr>
              <td style="background-color: #121316; padding: 28px 32px;">
                <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">
                  DUROZEN<span style="color: #F4A81E;">.</span> CAREERS
                </div>
                <div style="font-size: 11px; font-weight: 600; color: #9A9B99; text-transform: uppercase; letter-spacing: 0.16em; margin-top: 5px;">
                  High-Craft Software &amp; Scalable Engineering
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px 32px 24px 32px;">
                <div style="display: inline-block; padding: 4px 12px; background-color: #FEF8EC; border: 1px solid #FBE7BF; border-radius: 20px; font-size: 10px; font-weight: 800; color: #C27D05; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px;">
                  PROFILE RECEIVED
                </div>

                <h1 style="font-size: 22px; font-weight: 800; color: #121316; margin: 0 0 12px 0; line-height: 1.3;">
                  Hello ${escapeHtml(r.fullName)},
                </h1>

                <p style="font-size: 14px; color: #4B4C4A; line-height: 1.65; margin: 0 0 18px 0;">
                  Thank you for your interest in building high-impact software systems with <strong>${CONFIG.COMPANY_NAME}</strong> as part of our <strong>${escapeHtml(r.discipline)}</strong> team.
                </p>

                <p style="font-size: 14px; color: #4B4C4A; line-height: 1.65; margin: 0 0 20px 0;">
                  Our engineering leadership values craftsmanship, architectural rigor, and problem-solving velocity over boilerplate solutions. We treat candidate evaluations seriously and examine source contributions, architecture decisions, and portfolio work closely.
                </p>

                <!-- Application Summary Card -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAF9F6; border: 1px solid #ECEBE6; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                  <tr>
                    <td style="padding: 16px 20px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #777775; margin-bottom: 8px;">
                        Application Metadata
                      </div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td style="padding: 4px 0; font-size: 13px; color: #666664;">Application ID:</td>
                          <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 700; font-family: monospace; color: #121316;">${appRef}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; font-size: 13px; color: #666664;">Target Discipline:</td>
                          <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 700; color: #F4A81E;">${escapeHtml(r.discipline)}</td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0; font-size: 13px; color: #666664;">Candidate Email:</td>
                          <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #121316;">${escapeHtml(r.email)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Evaluation Process Timeline -->
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: #121316; letter-spacing: 0.08em; margin-bottom: 12px;">
                  Our Interview &amp; Evaluation Philosophy:
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="28" style="vertical-align: top;">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #F4A81E; color: #FFFFFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">1</div>
                          </td>
                          <td style="font-size: 13px; color: #4B4C4A; line-height: 1.5;">
                            <strong>Technical Deep-Dive:</strong> We review your public repositories, projects, or work samples rather than asking trivia questions.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 12px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="28" style="vertical-align: top;">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #DE2F28; color: #FFFFFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">2</div>
                          </td>
                          <td style="font-size: 13px; color: #4B4C4A; line-height: 1.5;">
                            <strong>Practical Architecture Discussion:</strong> A candid conversation with senior engineering peers on real problems and systems design.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="28" style="vertical-align: top;">
                            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: #24419E; color: #FFFFFF; font-size: 11px; font-weight: 800; text-align: center; line-height: 22px;">3</div>
                          </td>
                          <td style="font-size: 13px; color: #4B4C4A; line-height: 1.5;">
                            <strong>Leadership &amp; Roadmap Alignment:</strong> Aligning on company vision, technical autonomy, and mutual fit.
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <p style="font-size: 14px; color: #4B4C4A; line-height: 1.6; margin: 0 0 20px 0;">
                  If your background matches an active project engagement or roadmap priority, our talent team will reach out directly.
                </p>

                <p style="font-size: 13px; color: #121316; margin: 20px 0 0 0; line-height: 1.6;">
                  Warm regards,<br />
                  <strong>Talent Acquisition &amp; Engineering Leadership</strong><br />
                  <span style="font-size: 12px; color: #777775;">${CONFIG.COMPANY_NAME} Pvt. Ltd.</span>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #FAF9F6; padding: 24px 32px; border-top: 1px solid #ECEBE6; text-align: center;">
                <div style="font-size: 11px; color: #777775; line-height: 1.5;">
                  &copy; ${new Date().getFullYear()} ${CONFIG.COMPANY_NAME} Pvt. Ltd. All rights reserved.<br />
                  Namakkal, Tamil Nadu, India • <a href="${CONFIG.WEBSITE_URL}" style="color: #24419E; text-decoration: none;">${CONFIG.WEBSITE_URL}</a>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
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
