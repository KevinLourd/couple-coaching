const POSTMARK_API_URL = "https://api.postmarkapp.com/email";
const FROM_EMAIL = "Kevin Lourd <hello@kevinlourd.com>";
const BCC_EMAIL = "kevin.lourd@gmail.com";

function getPostmarkToken(): string {
  const token = process.env.POSTMARK_API_KEY;
  if (!token) throw new Error("POSTMARK_API_KEY is not set");
  return token;
}

function getMessageStream(): string {
  return process.env.POSTMARK_TRANSACTIONAL_STREAM_ID || "outbound";
}

function replaceVars(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}

interface PostmarkPayload {
  From: string;
  To: string;
  Bcc?: string;
  Subject: string;
  HtmlBody: string;
  TextBody: string;
  MessageStream: string;
}

async function sendEmail(payload: PostmarkPayload): Promise<void> {
  const res = await fetch(POSTMARK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": getPostmarkToken(),
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Postmark send failed (${res.status}): ${JSON.stringify(data)}`);
  }
}

const CONTACT_SUBJECT = "Got your message, {{firstName}}!";

const CONTACT_HTML = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#ededed;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
<tr><td align="center" style="padding:48px 20px;">
<table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
<tr><td align="center" style="padding-bottom:28px;">
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="width:56px;height:56px;border-radius:28px;background:#e11d48;text-align:center;font-size:20px;font-weight:bold;color:#fff;line-height:56px;">KL</td>
</tr></table></td></tr>
<tr><td align="center" style="padding-bottom:28px;">
<p style="font-size:11px;text-transform:uppercase;letter-spacing:0.3em;color:#fb7185;margin:0 0 12px 0;">Couple Coaching</p>
<h1 style="font-size:28px;font-weight:bold;margin:0;color:#ededed;">Got your message!</h1>
</td></tr>
<tr><td style="padding-bottom:32px;line-height:1.7;font-size:15px;color:#a1a1aa;">
<p style="margin:0 0 16px 0;color:#ededed;">Hey {{firstName}},</p>
<p style="margin:0 0 16px 0;">Thanks for reaching out about couple coaching. I'll get back to you soon to schedule our free discovery call.</p>
<p style="margin:0 0 8px 0;color:#71717a;font-size:13px;">Here's a copy of what you sent:</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 24px 0;">
<tr><td style="padding:14px 16px;border-left:2px solid #e11d48;color:#d4d4d8;font-size:14px;line-height:1.7;">{{message}}</td></tr>
</table>
<p style="margin:0;color:#ededed;">Talk soon,<br>Kevin</p>
</td></tr>
<tr><td style="padding-bottom:24px;"><div style="height:1px;background-color:rgba(255,255,255,0.08);"></div></td></tr>
<tr><td align="center" style="font-size:12px;color:#52525b;line-height:1.8;">
<p style="margin:0 0 8px 0;">Kevin Lourd &middot; Couple Coaching</p>
<p style="margin:0;"><a href="https://couple-coaching.kevinlourd.com" style="color:#71717a;text-decoration:none;">couple-coaching.kevinlourd.com</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;

const CONTACT_TEXT = `Hey {{firstName}},

Thanks for reaching out about couple coaching. I'll get back to you soon to schedule our free discovery call.

Here's a copy of what you sent:

> {{message}}

Talk soon,
Kevin

---
Kevin Lourd - Couple Coaching
couple-coaching.kevinlourd.com`;

export async function sendContactEmail(
  to: string,
  metadata: { firstName: string; message: string }
): Promise<void> {
  const vars = { firstName: metadata.firstName, message: metadata.message };
  await sendEmail({
    From: FROM_EMAIL,
    To: to,
    Bcc: BCC_EMAIL,
    Subject: replaceVars(CONTACT_SUBJECT, vars),
    HtmlBody: replaceVars(CONTACT_HTML, vars),
    TextBody: replaceVars(CONTACT_TEXT, vars),
    MessageStream: getMessageStream(),
  });
}
