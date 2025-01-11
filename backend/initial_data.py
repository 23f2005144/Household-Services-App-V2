from flask import current_app as app
from backend.models import db
from flask_security import SQLAlchemyUserDatastore, hash_password

with app.app_context():
    db.create_all()

    userdatastore:SQLAlchemyUserDatastore=app.security.datastore

    userdatastore.find_or_create_role(name = 'Admin', desc = 'To access Admin Dashboard')
    userdatastore.find_or_create_role(name = 'Customer', desc = 'To access Customer Dashboard')
    userdatastore.find_or_create_role(name = 'Professional', desc = 'To access Professional Dashboard')
    if (not userdatastore.find_user(email = 'admin@abodemantra.in')):
        userdatastore.create_user(email='admin@abodemantra.in', password=hash_password('admin123'), roles=['Admin'])
    db.session.commit()