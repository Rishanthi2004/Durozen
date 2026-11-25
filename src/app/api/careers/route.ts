import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Maximum allowable file size: 5 MB
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Allowed file extensions and mime types
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream", // Fallback mime occasionally reported by browsers
];

function sanitize(input?: string | null): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = (formData.get("name") as string | null)?.trim() || "";
    const email = (formData.get("email") as string | null)?.trim() || "";
    const phone = (formData.get("phone") as string | null)?.trim() || "";
    const discipline =
      (formData.get("discipline") as string | null)?.trim() || "";
    const portfolioUrl =
      (formData.get("portfolioUrl") as string | null)?.trim() || "";
    const message = (formData.get("message") as string | null)?.trim() || "";
    const resumeFile = formData.get("resume") as File | null;

    // Validate required text fields
    if (!name || !email || !phone || !discipline || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Phone, Discipline, Note)." },
        { status: 400 }
      );
    }

    // Validate mandatory resume file
    if (!resumeFile || typeof resumeFile === "string" || resumeFile.size === 0) {
      return NextResponse.json(
        { error: "Resume upload is mandatory. Please attach your CV in PDF, DOC, or DOCX format." },
        { status: 400 }
      );
    }

    // Validate file size (max 5 MB)
    if (resumeFile.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          error: `File size exceeds the 5 MB limit (Uploaded: ${(
            resumeFile.size /
            (1024 * 1024)
          ).toFixed(2)} MB). Please upload a smaller file.`,
        },
        { status: 400 }
      );
    }

    // Validate file extension
    const originalName = resumeFile.name || "resume.pdf";
    const fileExtension = originalName.slice(originalName.lastIndexOf(".")).toLowerCase();

    const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(fileExtension);
    const isMimeAllowed =
      !resumeFile.type || ALLOWED_MIME_TYPES.includes(resumeFile.type);

    if (!isExtensionAllowed && !isMimeAllowed) {
      return NextResponse.json(
        {
          error:
            "Invalid file format. Only PDF, DOC, and DOCX files are supported.",
        },
        { status: 400 }
      );
    }

    // Convert resume File to Buffer for Nodemailer attachment
    const arrayBuffer = await resumeFile.arrayBuffer();
    const resumeBuffer = Buffer.from(arrayBuffer);

    // Read SMTP and recruitment credentials from environment variables securely
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : smtpPort === 465;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

    const recruitmentEmail =
      process.env.RECRUITMENT_EMAIL ||
      process.env.CAREERS_EMAIL ||
      "sachinn2413@gmail.com";

    // Format human-readable file size for email body
    const formattedFileSize =
      resumeFile.size >= 1024 * 1024
        ? `${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.round(resumeFile.size / 1024)} KB`;

    const emailSubject = `[Durozen Careers] Application: ${name} - ${discipline}`;

    const textBody = `
New Career Application Received

Applicant Name: ${name}
Email: ${email}
Phone: ${phone}
Primary Discipline: ${discipline}
Portfolio / Links: ${portfolioUrl || "Not provided"}

Brief Introduction / Note:
${message}

Resume / CV Attached:
Filename: ${originalName}
Size: ${formattedFileSize}
Format: ${fileExtension.toUpperCase()}
`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #121316; line-height: 1.6; margin: 0; padding: 24px; background-color: #FAF9F6; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.08); overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
    .banner { height: 6px; background-color: #DE2F28; }
    .header { padding: 28px 32px 20px; border-bottom: 1px solid #f0f0f0; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 800; color: #121316; }
    .header p { margin: 4px 0 0; font-size: 13px; color: #666666; }
    .content { padding: 28px 32px; }
    .grid { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #888888; margin-bottom: 4px; }
    .value { font-size: 15px; font-weight: 600; color: #121316; margin-bottom: 16px; word-break: break-word; }
    .note-box { background: #FAF9F6; border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 14px; color: #222222; white-space: pre-wrap; }
    .attachment-badge { display: inline-flex; align-items: center; gap: 8px; background: #FFF5F5; border: 1px solid #FFD6D6; border-radius: 10px; padding: 12px 16px; margin-top: 8px; }
    .attachment-title { font-weight: 700; font-size: 13px; color: #DE2F28; }
    .attachment-meta { font-size: 12px; color: #666666; }
    .footer { padding: 18px 32px; background: #fafafa; border-top: 1px solid #f0f0f0; font-size: 12px; color: #888888; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="banner"></div>
    <div class="header">
      <h2>Durozen Technologies — New Career Application</h2>
      <p>Received via Durozen Careers Portal on ${new Date().toUTCString()}</p>
    </div>
    <div class="content">
      <div class="grid">
        <div class="label">Applicant Full Name</div>
        <div class="value">${sanitize(name)}</div>

        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${sanitize(email)}" style="color: #24419E; text-decoration: none;">${sanitize(email)}</a></div>

        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${sanitize(phone)}" style="color: #24419E; text-decoration: none;">${sanitize(phone)}</a></div>

        <div class="label">Primary Engineering Discipline</div>
        <div class="value" style="color: #DE2F28;">${sanitize(discipline)}</div>

        <div class="label">Portfolio / GitHub / LinkedIn</div>
        <div class="value">
          ${
            portfolioUrl
              ? `<a href="${sanitize(portfolioUrl)}" target="_blank" rel="noopener noreferrer" style="color: #24419E; text-decoration: underline;">${sanitize(portfolioUrl)}</a>`
              : `<span style="color: #888888; font-weight: normal;">Not provided</span>`
          }
        </div>
      </div>

      <div class="label">Brief Introduction / Candidate Note</div>
      <div class="note-box">${sanitize(message)}</div>

      <div class="label">Uploaded Resume / CV Attachment</div>
      <div class="attachment-badge">
        <div>
          <div class="attachment-title">📎 ${sanitize(originalName)}</div>
          <div class="attachment-meta">${formattedFileSize} • Attached directly to this email</div>
        </div>
      </div>
    </div>
    <div class="footer">
      Durozen Technologies Private Limited • Recruitment & Talent Acquisition
    </div>
  </div>
</body>
</html>
`;

    // Forward to Google Apps Script webhook if configured in environment
    const googleScriptUrl =
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
      process.env.GOOGLE_SCRIPT_URL;

    let googleScriptDispatched = false;
    if (googleScriptUrl && !googleScriptUrl.includes("YOUR_DEPLOYMENT_ID")) {
      try {
        await fetch(googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            name,
            email,
            phone,
            discipline,
            portfolioUrl,
            message,
            type: "career",
            resumeName: originalName,
            resumeSize: formattedFileSize,
          }),
        });
        googleScriptDispatched = true;
      } catch (err) {
        console.warn("[Careers API] Google Apps Script forward error:", err);
      }
    }

    // Check if SMTP credentials are provided for Nodemailer
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from:
          process.env.SMTP_FROM ||
          `"Durozen Careers" <${smtpUser}>`,
        replyTo: email,
        to: recruitmentEmail,
        subject: emailSubject,
        text: textBody,
        html: htmlBody,
        attachments: [
          {
            filename: originalName,
            content: resumeBuffer,
            contentType: resumeFile.type || "application/octet-stream",
          },
        ],
      });

      return NextResponse.json(
        {
          success: true,
          message: "Career application and resume delivered successfully via email.",
        },
        { status: 200 }
      );
    } else if (googleScriptDispatched) {
      return NextResponse.json(
        {
          success: true,
          message: "Career application received and forwarded to recruitment system.",
        },
        { status: 200 }
      );
    } else {
      console.error(
        `[Durozen Careers API] SMTP credentials (SMTP_USER / SMTP_PASS) not configured in environment (.env.local). ` +
        `Cannot deliver email for ${name} <${email}>.`
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not yet configured on the server. Please add SMTP_USER and SMTP_PASS (e.g. Gmail App Password) to .env.local to send emails.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[Durozen Careers API] Error processing career application:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected server error occurred while sending your application. Please try again or email us directly at info@durozen.in.",
      },
      { status: 500 }
    );
  }
}
