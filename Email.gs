/**
 * Sends an email with a PDF attachment.
 *
 * @param {string} emailAddress The email address of the recipient.
 * @param {string} subject The subject line of the email.
 * @param {string} emailBody The body content of the email.
 * @param {object} pdf The PDF object representing the attachment.
 * @param {string} [senderName="Unknown"] The name of the sender (optional).
 *
 * @throws {AppsScriptException} Throws an error if the email fails to send.
 */
function emailPDFAttachment(emailAddress, subject, emailBody, pdf, senderName = "Unknown") 
{
  if (senderName)
  {
    message.name = senderName
  }

  let message = {
    to: emailAddress,
    subject: subject,
    body: emailBody,
    attachments: [pdf]
  }

  MailApp.sendEmail(message)
}