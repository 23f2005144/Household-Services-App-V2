import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication


SMTP_SERVER="localhost"
SMTP_PORT=1025
SENDER_EMAIL='admin@abodemantra.in'
SENDER_PASSWORD=''

def send_email(to,subject,content, pdf_data=None,pdf_filename=None):
    msg=MIMEMultipart()
    msg['To']=to
    msg["Subject"]=subject
    msg["From"]=SENDER_EMAIL

    msg.attach(MIMEText(content,'html'))

    if pdf_data and pdf_filename:
        pdf_attachment = MIMEApplication(pdf_data, _subtype="pdf")
        pdf_attachment.add_header('Content-Disposition', f'attachment; filename="{pdf_filename}"')
        msg.attach(pdf_attachment)

    with smtplib.SMTP(host=SMTP_SERVER,port=SMTP_PORT) as client:
        client.send_message(msg)
        client.quit()



