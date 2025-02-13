from celery import shared_task
from backend.models import db,ServiceRequest
import flask_excel

@shared_task(bind=True, ignore_result=False) #will store the filename instead
def create_csv(self):
    task_id = self.request.id
    filename=f"ServiceRequests_data_{task_id}.csv"
    csv_out = flask_excel.make_response_from_a_table(db.session, ServiceRequest, file_type='csv').data
    
   
    with open(f'backend/celery/admin_downloads/{filename}', 'wb') as file:
        file.write(csv_out)

    return filename

