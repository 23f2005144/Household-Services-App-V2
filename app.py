from flask import Flask
from backend.config import LocalDevelopmentConfig
from backend.models import db,User,Role
from flask_security import Security,SQLAlchemyUserDatastore
from flask_caching import Cache
from backend.celery.celery_factory import celery_init_app
import flask_excel as excel

def create_app():
    app=Flask(__name__, template_folder='frontend', static_folder='frontend', static_url_path='/static')
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    cache=Cache(app)
    
    datastore = SQLAlchemyUserDatastore(db, User, Role)
    app.cache=cache
    app.security=Security(app,datastore,register_blueprint=False)
    app.app_context().push()

    from backend.resources import api
    api.init_app(app)

    return app

app=create_app()
celery_app=celery_init_app(app)

with app.app_context():
    app.cache.clear() #remove it once done testing and all since this just clears redis again and again

import backend.celery.celery_schedule
import backend.initial_data
import backend.routes
excel.init_excel(app)

if __name__=="__main__":
    app.run()