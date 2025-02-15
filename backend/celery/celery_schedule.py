from celery.schedules import crontab
from flask import current_app as app
from backend.celery.tasks import send_service_reminders,send_monthly_reports


celery_app=app.extensions['celery']

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(crontab(minute="*/1"),send_service_reminders.s(),name="Reminders to Pros to accept new ServiceRequests")
    sender.add_periodic_task(crontab(minute="*/1"),send_monthly_reports.s(),name="Monthly Reports to Customers") #day_of_month=1, hour=0, minute=0
    









    



