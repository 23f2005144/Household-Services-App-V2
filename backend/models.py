from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
db=SQLAlchemy()

class User(db.Model,UserMixin):
    user_id=db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String(), nullable=False, unique=True)
    password=db.Column(db.String(), nullable=False)
    fs_uniquifier=db.Column(db.String(), unique = True, nullable = False)
    active=db.Column(db.Boolean, default = True)
    roles=db.relationship('Role', backref = 'ur', secondary='user_roles')
    p_user=db.relationship('Professional',backref='p',cascade='delete')
    c_user=db.relationship('Customer',backref='c')
    
class Role(db.Model,RoleMixin):
    role_id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(), nullable=False, unique=True)
    desc=db.Column(db.String())

class UserRoles(db.Model):
    ur_id=db.Column(db.Integer,primary_key=True)
    u_id=db.Column(db.Integer, db.ForeignKey('user.user_id', ondelete="CASCADE"))
    r_id=db.Column(db.Integer, db.ForeignKey('role.role_id', ondelete="CASCADE"))

class Service(db.Model):
    serv_id=db.Column(db.Integer, primary_key=True)
    serv_type=db.Column(db.String(), nullable=False)
    serv_name=db.Column(db.String(), nullable=False, unique=True)
    serv_price=db.Column(db.Integer, nullable=False)
    serv_duration=db.Column(db.Integer, nullable=False)
    serv_desc=db.Column(db.String())
    serv_req=db.relationship('ServiceRequest',backref='service',cascade='delete')

    @property
    def serv_avg_rating(self):
        total_rating=0
        c=0
        for s in self.serv_req:
            if s.serv_rating is not None:
                total_rating+=s.serv_rating
                c+= 1

        if c > 0:
            return round(total_rating/c, 2)
        else:
            return 0.0


class Customer(db.Model):
    c_id=db.Column(db.Integer,primary_key=True,nullable=False)
    user_c_id=db.Column(db.Integer, db.ForeignKey('user.user_id'),nullable=False)
    c_name=db.Column(db.String(), nullable=False)
    c_contact_no=db.Column(db.Integer, nullable=False)
    c_address=db.Column(db.String(),nullable=False)
    c_pincode=db.Column(db.Integer,nullable=False)
    c_req=db.relationship('ServiceRequest',backref='customer')
    

class Professional(db.Model):
    p_id=db.Column(db.Integer,primary_key=True,nullable=False)
    user_p_id=db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    p_name=db.Column(db.String(), nullable=False)
    p_contact_no=db.Column(db.Integer)
    p_status=db.Column(db.String(), nullable=False, default='Pending')
    p_service_type=db.Column(db.String(), nullable=False)
    p_exp=db.Column(db.Integer, nullable=False)
    p_pincode=db.Column(db.Integer, nullable=False)
    serv_req_pro=db.relationship('ServiceRequest',backref='professional')

    @property
    def avg_rating(self):
        total_rating=0
        c=0
        for sr in self.serv_req_pro:
            if sr.pro_rating is not None:
                total_rating+=sr.pro_rating
                c+= 1

        if c > 0:
            return round(total_rating/c, 2)
        else:
            return 0.0
    

class ServiceRequest(db.Model):
    serv_req_id=db.Column(db.Integer, primary_key=True)
    serv_id=db.Column(db.Integer, db.ForeignKey('service.serv_id'))
    cust_id=db.Column(db.Integer, db.ForeignKey('customer.c_id'))
    pro_id=db.Column(db.Integer, db.ForeignKey('professional.p_id'))
    serv_request_datetime=db.Column(db.DateTime, nullable=False)
    serv_close_datetime=db.Column(db.DateTime)
    serv_status=db.Column(db.String(), nullable=False, default="Requested")
    serv_remarks=db.Column(db.String())
    serv_rating=db.Column(db.Integer)
    pro_rating=db.Column(db.Integer)

    @property
    def pro_avg_rating(self):
        return self.professional.avg_rating if self.professional else None
    
    @property
    def format_serv_request_datetime(self):
        if self.serv_request_datetime:
            return self.serv_request_datetime.strftime("%d-%m-%Y %H:%M")
        return None

    @property
    def format_serv_close_datetime(self):
        if self.serv_close_datetime:
            return self.serv_close_datetime.strftime("%d-%m-%Y %H:%M")
        return None
    
    