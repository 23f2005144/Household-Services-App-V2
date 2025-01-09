from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
db=SQLAlchemy()

class User(db.Model,UserMixin):
    user_id=db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String(), nullable=False, unique=True)
    password=db.Column(db.String(), nullable=False)
    fs_uniquifier=db.Column(db.String(), unique = True, nullable = False)
    active=db.Column(db.Boolean, default = True)
    roles=db.Relationship('Role', backref = 'ur', secondary='user_roles')

class Role(db.Model,RoleMixin):
    role_id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(), nullable=False, unique=True)
    desc=db.Column(db.String())

class UserRoles(db.Model):
    ur_id=db.Column(db.Integer,primary_key=True)
    u_id=db.Column(db.Integer, db.ForeignKey('user.user_id'))
    r_id=db.Column(db.Integer, db.ForeignKey('role.role_id'))

class Service(db.Model):
    service_id=db.Column(db.Integer, primary_key=True)
    service_type=db.Column(db.String(), nullable=False)
    service_name=db.Column(db.String(), nullable=False, unique=True)
    service_price=db.Column(db.Integer, nullable=False)
    service_duration=db.Column(db.Integer, nullable=False)
    service_desc=db.Column(db.String())
    service_req=db.Relationship('ServiceRequest',backref='sr',cascade='delete')

class Customer(db.Model):
    c_id=db.Column(db.Integer,primary_key=True,nullable=False)
    user_c_id=db.Column(db.Integer, db.ForeignKey('user.user_id'),nullable=False)
    c_name=db.Column(db.String(), nullable=False)
    c_contact_no=db.Column(db.Integer, nullable=False)
    c_address=db.Column(db.String(),nullable=False)
    c_pincode=db.Column(db.Integer,nullable=False)
    c_req=db.Relationship('ServiceRequest',backref='cr')
    c_user=db.Relationship('User',backref='c')

class Professional(db.Model):
    p_id=db.Column(db.Integer,primary_key=True,nullable=False)
    user_p_id=db.Column(db.Integer, db.ForeignKey('user.user_id'),nullable=False)
    p_name=db.Column(db.String(), nullable=False)
    p_contact_no=db.Column(db.Integer)
    p_service_type=db.Column(db.String(), nullable=False)
    p_exp=db.Column(db.Integer, nullable=False)
    p_pincode=db.Column(db.Integer, nullable=False)
    serv_req_pro=db.Relationship('ServiceRequest',backref='srp')
    p_user=db.Relationship('User',backref='p')
    

class ServiceRequest(db.Model):
    serv_req_id=db.Column(db.Integer, primary_key=True)
    serv_id=db.Column(db.Integer, db.ForeignKey('service.service_id'))
    cust_id=db.Column(db.Integer, db.ForeignKey('customer.c_id'))
    pro_id=db.Column(db.Integer, db.ForeignKey('professional.p_id'))
    service_request_datetime=db.Column(db.DateTime, nullable=False)
    service_close_datetime=db.Column(db.DateTime)
    service_status=db.Column(db.String(), nullable=False, default="Requested")
    service_remarks=db.Column(db.String())
    service_rating=db.Column(db.Integer)
    pro_rating=db.Column(db.Integer)