from celery.schedules import crontab
from flask import current_app as app
from backend.celery.tasks import send_service_reminders,send_monthly_reports,update_expired_serv_requests


celery_app=app.extensions['celery']

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    #sender.add_periodic_task(crontab(minute="0", hour="*/1"),send_service_reminders.s(),name="Hourly Reminders to Professionals to accept new Service Requests")
    ##sender.add_periodic_task(crontab(minute="*/1"),send_service_reminders.s(),name="Hourly Reminders to Professionals to accept new Service Requests")
    #sender.add_periodic_task(crontab(day_of_month=1, hour=0, minute=0),send_monthly_reports.s(),name="Monthly Reports to Customers")
    ##sender.add_periodic_task(crontab(minute="*/1"),send_monthly_reports.s(),name="Monthly Reports to Customers")
    #sender.add_periodic_task(crontab(hour="*/2"),update_expired_serv_requests.s(),name="Hourly Updation of Expired Service Requests")
    sender.add_periodic_task(crontab(minute="*/1"),update_expired_serv_requests.s(),name="Hourly Updation of Expired Service Requests")
    









    



