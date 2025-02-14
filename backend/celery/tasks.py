from celery import shared_task
from backend.models import db,ServiceRequest
import flask_excel

@shared_task(bind=True, ignore_result=False) #will store the filename instead
def create_csv(self):
    resource=ServiceRequest.query.all()
    task_id = self.request.id
    filename=f"ServiceRequests_data_{task_id}.csv"
    column_names = [column.name for column in ServiceRequest.__table__.columns]
    csv_out = flask_excel.make_response_from_query_sets(resource, column_names = column_names, file_type='csv')

    with open(f'backend/celery/admin_downloads/{filename}', 'wb') as file:
        file.write(csv_out.data)
    
    return filename

