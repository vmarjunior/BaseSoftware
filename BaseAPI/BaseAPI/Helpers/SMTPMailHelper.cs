namespace BaseAPI.Helpers
{
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.IO;
    using System.Net;
    using System.Net.Mail;

    public class SMTPMailHelper
    {
        private string Server = "smtp.mydomain.com";
        private string EmailFrom = "myemail@mydomain.com";
        private string User = "myemail@mydomain.com";
        private string Password = "mypassword";
        private int Gateway = 25;
        private bool IsSSL = false;
        private string AnswerTo = "replyto@mydomain.com";

        public SMTPMailHelper()
        {
        }

        public bool SendMail(List<string> sendTo, string subject, string body, List<string> sendCC, string attachmentString)
        {
            return SendMail(sendTo, subject, body, sendCC, null, attachmentString);
        }

        public bool SendMail(List<string> sendTo, string subject, string body, List<string> sendCC, List<string> sendBCC, string attachmentString)
        {
            return SendMail(sendTo, subject, body, sendCC, sendBCC, attachmentString, false, null, null);
        }

        public bool SendMail(List<string> sendTo, string subject, string body, List<string> sendCC, List<string> sendBCC, Stream attachmentStream, string attachmentStreamName)
        {
            return SendMail(sendTo, subject, body, sendCC, sendBCC, null, false, attachmentStream, attachmentStreamName);
        }

        public bool SendMail(List<string> sendTo, string subject, string body, List<string> sendCC, List<string> sendBCC, string attachmentString, bool async, Stream attachmentStream, string attachmentStreamName)
        {
            bool sent = true;

            try
            {
                MailAddress fromAddress = new MailAddress(EmailFrom);
                MailAddress toAddress;
                MailMessage mail = new MailMessage();

                mail.From = fromAddress;

                if (!string.IsNullOrEmpty(AnswerTo)) mail.ReplyToList.Add(new MailAddress(AnswerTo));

                foreach (string s in sendTo)
                {
                    toAddress = new MailAddress(s);
                    mail.To.Add(toAddress);
                }

                if (sendCC != null)
                {
                    foreach (string s in sendCC)
                    {
                        toAddress = new MailAddress(s);
                        mail.CC.Add(toAddress);
                    }
                }

                if (sendBCC != null)
                {
                    foreach (string s in sendBCC)
                    {
                        toAddress = new MailAddress(s);
                        mail.Bcc.Add(toAddress);
                    }
                }

                mail.IsBodyHtml = true;
                mail.Subject = subject;
                mail.Body = body;

                if (!string.IsNullOrEmpty(attachmentString)) mail.Attachments.Add(new Attachment(attachmentString));

                if (attachmentStream != null) mail.Attachments.Add(new Attachment(attachmentStream, attachmentStreamName));

                SmtpClient smtp = new SmtpClient(Server, Gateway);

                if (!string.IsNullOrEmpty(User)) smtp.Credentials = new NetworkCredential(User, Password);

                smtp.EnableSsl = IsSSL;

                if (!async)
                {
                    smtp.Send(mail);
                }
                else
                {
                    smtp.SendCompleted += (s, e) => {
                        smtp.Dispose();
                        mail.Dispose();
                    };
                    smtp.SendAsync(mail, null);
                }
            }
            catch
            {
                sent = false;
            }

            return sent;
        }

    }
}