/**
 * DUROZEN TECHNOLOGIES PVT. LTD. - WEBSITE INQUIRY HANDLER
 * Google Apps Script Web App for capturing contact form submissions
 * 
 * Target Website: Durozen Technologies (https://durozen.in)
 * Sheet Destination: Active Spreadsheet -> "Inquiries" or "Sheet1"
 */

// 1. UPDATE WITH YOUR TEAM NOTIFICATION EMAIL (or multiple comma-separated emails)
const RECIPIENT_EMAIL = "info@durozen.in"; // <-- Update or add team emails (e.g. "sales@durozen.in, info@durozen.in")
const SHEET_NAME = "Inquiries"; // Google Sheet tab name

function doPost(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

    // Set up header columns if sheet is freshly created or empty
    if (sheet.getLastRow() === 0) {
      var headerRange = sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Company Name",
        "Work Email",
        "Phone Number",
        "Service Required",
        "Budget Range",
        "Project Description"
      ]);
      // Optional header styling
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#121316").setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // Parse incoming payload (supports JSON and form-encoded data)
    var parsedData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        parsedData = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        parsedData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      parsedData = e.parameter;
    }

    // Extract Durozen contact form fields
    var name = parsedData.name || (parsedData.firstName ? (parsedData.firstName + " " + (parsedData.lastName || "")).trim() : "") || "Not specified";
    var company = parsedData.company || "Not specified";
    var email = parsedData.email || "Not specified";
    var phone = parsedData.phone || "Not specified";
    var service = parsedData.service || parsedData.inquiryType || "Custom Software Development";
    var budget = parsedData.budget || "Not specified";
    var message = parsedData.message || "No project description provided.";
    var timestamp = new Date();

    // 1. Append record to Google Sheet
    sheet.appendRow([
      timestamp,
      name,
      company,
      email,
      phone,
      service,
      budget,
      message
    ]);

    // 2. Prepare Professional HTML Email Notification for Durozen
    var subject = "New Project Inquiry: " + service + " - " + name + (company && company !== "Not specified" ? " (" + company + ")" : "");

    var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #121316; margin: 0; padding: 0; background-color: #f7f6f2; }
        .container { max-width: 640px; margin: 24px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e5e0; box-shadow: 0 10px 30px rgba(0,0,0,0.04); }
        .header-bar { height: 5px; background: linear-gradient(90deg, #DE2F28 0%, #F4A81E 33%, #549B31 66%, #24419E 100%); }
        .header { background-color: #121316; padding: 32px 30px; text-align: left; }
        .brand-title { color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
        .brand-title span { color: #DE2F28; }
        .brand-sub { color: #9E9E9C; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; margin-top: 4px; }
        .content { padding: 32px 30px; }
        .badge { display: inline-block; padding: 4px 12px; background-color: #f4f3ee; border: 1px solid #e0dfd5; border-radius: 20px; font-size: 11px; font-weight: 700; color: #DE2F28; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
        .h2 { font-size: 22px; font-weight: 800; color: #121316; margin: 0 0 8px 0; }
        .intro { font-size: 14px; color: #555555; margin-top: 0; margin-bottom: 24px; }
        .details-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 28px; border-radius: 10px; overflow: hidden; border: 1px solid #ebeae5; }
        .details-table td { padding: 12px 16px; border-bottom: 1px solid #ebeae5; font-size: 13px; }
        .details-table tr:last-child td { border-bottom: none; }
        .label-col { width: 35%; background-color: #faf9f6; font-weight: 700; color: #555555; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
        .val-col { color: #121316; font-weight: 600; background-color: #ffffff; }
        .val-col a { color: #24419E; text-decoration: none; font-weight: 600; }
        .service-pill { display: inline-block; background-color: #24419E; color: #ffffff; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 6px; }
        .budget-pill { display: inline-block; background-color: #549B31; color: #ffffff; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 6px; }
        .message-section { margin-top: 24px; }
        .section-heading { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #666666; margin-bottom: 10px; }
        .message-box { background-color: #FAF9F6; border-left: 4px solid #DE2F28; padding: 18px 20px; border-radius: 0 8px 8px 0; font-size: 14px; color: #121316; white-space: pre-wrap; line-height: 1.6; border-top: 1px solid #ebeae5; border-right: 1px solid #ebeae5; border-bottom: 1px solid #ebeae5; }
        .cta-container { margin: 30px 0 10px; text-align: center; }
        .cta-btn { display: inline-block; background-color: #DE2F28; color: #ffffff !important; padding: 12px 28px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 12px rgba(222,47,40,0.25); }
        .footer { background-color: #f4f3ee; padding: 24px 30px; text-align: center; border-top: 1px solid #ebeae5; font-size: 12px; color: #777777; }
        .footer p { margin: 4px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- 4-Color Accent Bar -->
        <div class="header-bar"></div>

        <!-- Header -->
        <div class="header">
          <div class="brand-title">DUROZEN<span>.</span> TECHNOLOGIES</div>
          <div class="brand-sub">Enterprise Inquiry Routing System</div>
        </div>

        <!-- Content -->
        <div class="content">
          <div class="badge">Inbound Website Lead</div>
          <h2 class="h2">New Project Consultation Request</h2>
          <p class="intro">A prospective client has submitted an inquiry via the Durozen website contact portal.</p>

          <table class="details-table">
            <tr>
              <td class="label-col">Client Name</td>
              <td class="val-col">${name}</td>
            </tr>
            <tr>
              <td class="label-col">Company</td>
              <td class="val-col">${company}</td>
            </tr>
            <tr>
              <td class="label-col">Work Email</td>
              <td class="val-col"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td class="label-col">Phone Number</td>
              <td class="val-col"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td class="label-col">Service Required</td>
              <td class="val-col"><span class="service-pill">${service}</span></td>
            </tr>
            <tr>
              <td class="label-col">Budget Range</td>
              <td class="val-col"><span class="budget-pill">${budget}</span></td>
            </tr>
            <tr>
              <td class="label-col">Submitted On</td>
              <td class="val-col">${timestamp.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</td>
            </tr>
          </table>

          <div class="message-section">
            <div class="section-heading">Project Description / Requirements</div>
            <div class="message-box">${message}</div>
          </div>

          <div class="cta-container">
            <a href="mailto:${email}?subject=Re:%20Durozen%20Consultation%20-%20${encodeURIComponent(service)}" class="cta-btn">Reply to ${name}</a>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p><strong>Durozen Technologies Pvt. Ltd.</strong></p>
          <p>Namakkal, Tamil Nadu, India • <a href="mailto:info@durozen.in" style="color: #555555;">info@durozen.in</a> • +91 81223 39694</p>
          <p style="font-size: 11px; color: #999999; margin-top: 8px;">This is an automated notification from your Durozen contact pipeline.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send email notification
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      htmlBody: htmlBody,
      replyTo: email !== "Not specified" ? email : RECIPIENT_EMAIL
    });

    // Return Success JSON
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Inquiry recorded and notification sent." }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return Error JSON
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Required to handle CORS preflight OPTIONS requests from browsers
function doOptions(e) {
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}
