from celery import shared_task
from backend.models import ServiceRequest,db
import flask_excel
from backend.celery.mail_service import send_email
from backend.models import User,ServiceRequest,Customer,Professional
from datetime import datetime,timedelta
from flask import render_template_string
from weasyprint import HTML


HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monthly Report</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        h1 {
            font-size: 2em;
            font-weight: bold;
            color: #00827f;
        }
        h2 {
            color: #0073e6;
        }
        p {
            font-size: 1.1em;
            color: black;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            text-align: left;
            border: 2px solid black;
        }
        th, td {
            border: 2px solid black;
            padding: 10px;
        }
        .contact-info {
            font-weight: bold;
            font-size: 1.1em;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Abode Mantra: Your A-Z Cleaning Experts</h1>
    <h2>Monthly Service Report for {{ customer.c_name }}</h2><br>
    <table>
        <tr><th>Total Requested Services</th><td>{{ total_requested }}</td></tr>
        <tr><th>Total Closed Services</th><td>{{ total_closed }}</td></tr>
        <tr><th>Total Cancelled Services</th><td>{{ total_cancelled }}</td></tr>
        <tr><th>Total Amount Spent</th><td>₹{{ total_spent }}</td></tr>
        <tr><th>Average Service Rating</th><td>{{ avg_service_rating }}</td></tr>
        <tr><th>Average Professional Rating</th><td>{{ avg_pro_rating }}</td></tr>
        <tr><th>Most Booked Service</th><td>{{ most_booked_service }}</td></tr>
    </table><br>
    <p class="contact-info">📧 For any queries or support, contact us at support@abodemantra.in</p>
</body>
</html>
"""

def generate_monthly_report(customer):
    service_history=ServiceRequest.query.filter(ServiceRequest.cust_id==customer.c_id).all()
    if not service_history:
        return "Service Request data not found as Customer has not booked any services."
    total_requested=0
    total_closed=0
    total_cancelled=0
    total_spent=0
    serv_ratings=[]
    pro_ratings=[]
    serv_type_counts={}
    

    for req in service_history:
        total_requested+= 1
        if req.serv_status=='Closed':
            total_closed+=1
            total_spent+=req.service.serv_price
        
        if req.serv_status=='Cancelled':
            total_cancelled+=1

        if req.serv_rating is not None:
            serv_ratings.append(req.serv_rating)
        if req.pro_rating is not None:
            pro_ratings.append(req.pro_rating)

        if req.service.serv_type in serv_type_counts:
            serv_type_counts[req.service.serv_type]+=1
        else:
            serv_type_counts[req.service.serv_type]=1
 
    avg_serv_rating=round(sum(serv_ratings)/ len(serv_ratings),1) if serv_ratings else "N/A"
    avg_pro_rating=round(sum(pro_ratings)/ len(pro_ratings),1) if pro_ratings else "N/A"

    most_booked_serv=None
    most_booked_count=0
    for (service_type, count) in serv_type_counts.items():
        if count > most_booked_count:
            most_booked_serv=service_type
            most_booked_count =count

    if most_booked_serv is None:
        most_booked_serv="N/A"

    html_content=render_template_string(HTML_TEMPLATE,customer=customer,service_history=service_history,total_requested=total_requested,total_closed=total_closed,total_cancelled=total_cancelled,total_spent=total_spent,avg_service_rating=avg_serv_rating,avg_pro_rating=avg_pro_rating,most_booked_service=most_booked_serv)    
    pdf_report=HTML(string=html_content).write_pdf()
    return pdf_report

@shared_task(bind=True, ignore_result=False)
def create_csv(self):
    resource=ServiceRequest.query.filter(ServiceRequest.serv_status=='Closed').all()
    if not resource:
        return {"Message":"No Closed ServiceRequests found"}
    
    task_id = self.request.id
    filename=f"ServiceRequests_data_{task_id}.csv"
    column_names = [column.name for column in ServiceRequest.__table__.columns]
    csv_out = flask_excel.make_response_from_query_sets(resource, column_names = column_names, file_type='csv')

    with open(f'backend/celery/admin_downloads/{filename}', 'wb') as file:
        file.write(csv_out.data)
    
    return filename

@shared_task(ignore_result=True)
def email_reminder(to,subject,content):
    send_email(to,subject,content)
    return "Sent email to user"


@shared_task(ignore_result=True)
def send_service_reminders():
    now = datetime.now()
    service_requests=ServiceRequest.query.filter((ServiceRequest.serv_status=='Requested')&(ServiceRequest.serv_request_datetime>=now)).all()

    if not service_requests:
        return "No pending Service Requests found"
    
    found_pro=False
    for req in service_requests:
        serv_pincode=req.customer.c_pincode
        serv_type=req.service.serv_type
        serv_name=req.service.serv_name
        serv_price=req.service.serv_price
        service_pros=Professional.query.join(User).filter((Professional.p_service_type == serv_type)&(Professional.p_pincode == serv_pincode)&(User.active == True)&~ServiceRequest.query.filter((ServiceRequest.pro_id == Professional.p_id) & (ServiceRequest.serv_status == "Accepted")).exists()).all()
        if not service_pros:
            continue
        found_pro=True
        for pro in service_pros:
            email_reminder.delay(
                pro.p.email,
                "🔔 New Service Request Available - Check Your Dashboard!",
                f"""
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h1 style="color: #00827f; text-align: center;">Abode Mantra</h1>
                    <h2 style="color: #007bff">Hello {pro.p_name},</h2>
                    <p style="font-size: 16px;">We have a new service request that matches your expertise!</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <p><strong>🛠️ Service Type:</strong> {serv_type}</p>
                        <p><strong>🛠️ Service Name:</strong> {serv_name}</p>
                        <p><strong>📍 Location:</strong> {serv_pincode}</p>
                        <p><strong>⏰ Scheduled Date & Time:</strong> {req.serv_request_datetime}</p>
                        <p><strong>💰 Price:</strong> ₹{serv_price}</p>
                    </div>
                    <p style="font-size: 16px;">Please check your dashboard to accept the request:</p>
                    <p style="text-align: center;">
                        <a href="http://127.0.0.1:5000/#/login"style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                            Go to Dashboard
                        </a>
                    </p>
                    <p style="font-size: 16px;">Best Regards,</p>
                    <p style="font-size: 16px;"><strong>Abode Mantra Team</strong></p>
                    <hr style="border: 0.5px solid #ddd; margin: 20px 0;">
                    <div style="text-align: center; font-size: 14px; color: #777;">
                        <p>You are receiving this email because you are a service professional at <strong>Abode Mantra.</strong></p>
                        <p>For any queries or concerns kindly contact support at <strong>support@abodemantra.in</strong></p>
                    </div>
                </div>
            """)
        return "Sent Service Reminders to Service Professionals via email" if found_pro else "Service Professionals are not available"


@shared_task(ignore_result=True)
def send_monthly_reports():
    customers = Customer.query.join(User).filter(User.active==True).all() 
    for c in customers:
        pdf_report=generate_monthly_report(c) 
        if isinstance(pdf_report, str):
            print("Skipping email because",pdf_report)
            continue
        subject = f"📝 Your Monthly Service Report - {datetime.now().strftime('%B %Y')}"
        body = f"""
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h1 style="color: #00827f; text-align: center;">Abode Mantra</h1>
            <h2 style="color: #007bff">Hello {c.c_name},</h2>
            <p style="font-size: 16px;">Please find your attached monthly service report from Abode Mantra.</p>
            <p style="font-size: 16px;">It includes:</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <ul style="padding-left: 20px;">
                    <li><strong>📋 Total Services Requested & Closed</strong></li>
                    <li><strong>💰 Total Amount Spent</strong></li>
                    <li><strong>⭐ Average Ratings</strong></li>
                    <li><strong>🛠️ Most Booked Services</strong></li>
                </ul>
            </div>
            <p style="font-size: 16px;">Best Regards,</p>
            <p style="font-size: 16px;"><strong>Abode Mantra Team</strong></p>
            <hr style="border: 0.5px solid #ddd; margin: 20px 0;">
            <div style="text-align: center; font-size: 14px; color: #777;">
                <p>You are receiving this email because you are a registered customer at <strong>Abode Mantra.</strong></p>
                <p>For any queries or concerns kindly contact support at <strong>support@abodemantra.in</strong></p>
            </div>
        </div>
        """
        send_email(c.c.email, subject, body, pdf_report, "Monthly_Report.pdf")
        
    return "Sent monthly reports to customers via email"

@shared_task(ignore_result=True)
def update_expired_serv_requests():
    now=datetime.now()
    serv_request_data=ServiceRequest.query.filter((ServiceRequest.serv_request_datetime<now)&(ServiceRequest.serv_status=='Requested')).all()

    updated_serv_requests=[]
    if not serv_request_data:
        return "No past Service Requests found for rescheduling"
    
    for req in serv_request_data:
        old_serv_request_datetime=req.serv_request_datetime
        new_date=now.date()+timedelta(days=1)
        req.serv_request_datetime=datetime.combine(new_date, old_serv_request_datetime.time())
        updated_serv_requests.append((req,old_serv_request_datetime))

    db.session.commit()

    for (req, old_serv_request_datetime) in updated_serv_requests:
        cust=req.customer
        subject = "⚠️ Your Recent Service Request Has Been Rescheduled"
        body = f"""
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h1 style="color: #00827f; text-align: center;">Abode Mantra</h1>
            <h2 style="color: #007bff">Hello {cust.c_name},</h2>
            <p style="font-size: 16px;">We regret to inform you that no service professional was assigned to your service request for <strong>{req.service.serv_name} Service</strong> at <strong>{old_serv_request_datetime.strftime('%d-%m-%Y %H:%M')}</strong>.</p>
            <p style="font-size: 16px;">Hence, we have rescheduled it to tomorrow at the same time:</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>🔄 Rescheduled Date & Time:</strong> {req.serv_request_datetime.strftime('%d-%m-%Y %H:%M')}</p>
            </div>
            <p style="font-size: 16px;">Please log in to your dashboard to review the updated service request details:</p>
            <p style="text-align: center;">
                <a href="http://127.0.0.1:5000/#/login" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                    Go to Dashboard
                </a>
            </p>
            <hr style="border: 0.5px solid #ddd; margin: 20px 0;">
            <div style="text-align: center; font-size: 14px; color: #777;">
                <p>You are receiving this email because you are a registered customer at <strong>Abode Mantra.</strong></p>
                <p>For any queries or concerns kindly contact support at <strong>support@abodemantra.in</strong></p>
            </div>
        </div>
        """
        send_email(cust.c.email,subject,body)

    return "Rescheduled service requests and sent emails to notify customers."