from flask import current_app as app,request
from flask_restful import Api, Resource,fields,marshal_with
from backend.models import db,User,Customer,Professional,Service,ServiceRequest,UserRoles,Role
from flask_security import auth_required,current_user


api=Api(prefix='/api')

service_fields={
    'service_id' : fields.Integer,
    'service_type' : fields.String,
    'service_name' : fields.String,
    'service_price' : fields.Integer,
    'service_duration' : fields.Integer,
    'service_desc' : fields.String
}

service_request_fields={
    'serv_req_id': fields.Integer,
    'serv_id' : fields.Integer,
    'serv_type': fields.String(attribute="sr.service_type"),
    'serv_name' : fields.String(attribute='sr.service_name'),
    'serv_price' : fields.Integer(attribute="sr.service_price"),
    'cust_id' : fields.Integer,
    'cust_name' : fields.String(attribute="cr.c_name"),
    'cust_pincode': fields.Integer(attribute="cr.c_pincode"),
    'pro_id ' : fields.Integer,
    'pro_name' : fields.String(attribute="srp.p_name"),
    'pro_exp' : fields.Integer(attribute="srp.p_exp"),
    'date_of_req' : fields.DateTime,
    'date_of_comp' : fields.DateTime,
    'service_status' : fields.String,
    'service_remarks' : fields.String,
    'service_rating' : fields.Integer,
    'pro_rating' : fields.Integer

}

customer_fields={
    'c_id' : fields.Integer,
    'user_c_id' : fields.Integer,
    'c_name' : fields.String,
    'c_contact_no': fields.Integer,
    'c_address' : fields.String,
    'c_pincode' : fields.Integer
}

pro_fields={
    'p_id' : fields.Integer,
    'user_p_id' : fields.Integer,
    'p_email' : fields.String(attribute="p.email"),
    'p_status' : fields.Boolean(attribute="p.active"),
    'p_name' : fields.String,
    'p_contact_no': fields.Integer,
    'p_service_type': fields.String,
    'p_exp' : fields.Integer,
    'p_pincode' : fields.Integer
}

role_fields={
    'name' : fields.String,
    'desc' : fields.String
}
user_fields={
    'user_id' : fields.Integer,
    'email' : fields.String,
    'roles' : fields.List(fields.Nested(role_fields))
}
class RegisterAPI(Resource): #have not used any @auth only checking if registering user is already registred to the user table or not:)
    def post(self):
        data=request.get_json()
        email=data.get('email')
        role=data.get('role')
        user_data=User.query.filter_by(email=email).first()
        if user_data:
            roles_list=user_data.roles
            role_present=False
            for x in roles_list:
                if x.name==role:
                    role_present=True
            if role_present:
                if role=='Customer':
                    c_name=data.get('c_name')
                    c_contact_no=data.get('c_contact_no')
                    c_address=data.get('c_address')
                    c_pincode=data.get('c_pincode')
                    user_c_id=user_data.user_id

                    try:
                        new_customer=Customer(user_c_id=user_c_id,c_name=c_name,c_contact_no=c_contact_no,c_address=c_address,c_pincode=c_pincode)
                        db.session.add(new_customer)
                        db.session.commit()
                        return {'Message':'Customer details successfully added'},201
                    
                    except:
                        db.session.rollback()
                        return {"Message":"Error in database"},400

                elif role=='Professional':
                    p_name=data.get('p_name')
                    p_contact_no=data.get('p_contact_no')
                    p_service_type=data.get('p_serv_type')
                    p_exp=data.get('p_exp')
                    p_pincode=data.get('p_pincode')
                    user_p_id=user_data.user_id

                    try:
                        new_pro=Professional(user_p_id=user_p_id, p_name=p_name, p_contact_no=p_contact_no, p_service_type=p_service_type, p_exp=p_exp, p_pincode=p_pincode)
                        db.session.add(new_pro)
                        db.session.commit()
                        return {'Message':'Professional details successfully added'},201
                    
                    except:
                        db.session.rollback()
                        return {"Message":"Error in database"},400
                    
                else:
                    return {"Message":"Invalid Role"},404
            else:
                return {"Message":"Role does not exist"},404
        else:
            return {"Message":"User does not exist"},404

class ServiceAPI(Resource):

    @marshal_with(service_fields)
    @auth_required('token')
    def get(self,service_id):
        service_data=Service.query.get(service_id)

        if not service_data:
            return {"Message":"Service does not exist"},404
        
        return service_data
    
    @auth_required('token')
    def delete(self,service_id):
        service_data=Service.query.get(service_id)

        if not service_data:
             return {"Message":"Service does not exist"},404
        
        if current_user.roles[0].name!='Admin':
            return {"Message":"Forbidden: only Admin can delete services"},403
        
        try:
            db.session.delete(service_data)
            db.session.commit()
            return "",204
        
        except:
            db.session.rollback()
            return {"Message":"Error in database"},400
    
    @auth_required('token')
    def put(self,service_id):
        data=request.get_json()
        serv_type=data.get('service_type')
        serv_name=data.get('service_name')
        serv_price=data.get('service_price')
        serv_duration=data.get('service_duration')
        serv_desc=data.get('service_desc')
        service_data=Service.query.get(service_id)

        if not service_data:
             return {"Message":"Service does not exist"},404
        
        if current_user.roles[0].name!='Admin':
            return {"Message":"Forbidden: only Admin can update services"},403
        
        try:
            service_data.service_type=serv_type
            service_data.service_name=serv_name
            service_data.service_price=serv_price
            service_data.service_duration=serv_duration
            service_data.service_desc=serv_desc
            db.session.commit()
            return {"Message":"Service details updated successfully"},200
        
        except:
            db.session.rollback()
            return {"Message":"Error in database"},400
        
class ServiceListAPI(Resource):

    @marshal_with(service_fields)
    @auth_required('token')
    def get(self):
        service_data_list=Service.query.all()

        if not service_data_list:
            return {"Message":"Services do not exist"},404
        
        return service_data_list
    
    def post(self):
        data=request.get_json()
        service_type=data.get('service_type')
        service_name=data.get('service_name')
        service_price=data.get('service_price')
        service_duration=data.get('service_duration')
        service_desc=data.get('service_desc')

        if current_user.roles[0].name!='Admin':
            return {"Message":"Forbidden: only Admin can create new service"},403
        
        try:
            service=Service(service_type=service_type, service_name=service_name, service_price=service_price, service_duration=service_duration, service_desc=service_desc)
            db.session.add(service)
            db.session.commit()
            return {"Message":"Service data added successfully"},201
        
        except:
            db.session.rollback()
            return {"Message":"Error in database"},400


class ServiceRequestAPI(Resource):

    @marshal_with(service_request_fields)
    @auth_required('token')
    def get(self,serv_req_id):
        serv_req_data=ServiceRequest.query.get(serv_req_id)

        if not serv_req_data:
            return {"Message":"ServiceRequest does not exist"},404
        
        return serv_req_data
    

    @auth_required('token')
    def put(self,serv_req_id):
        data=request.get_json()
        serv_id=data.get('serv_id')
        cust_id=data.get('cust_id')
        pro_id=data.get('pro_id')
        serv_req_dt=data.get('serv_req_dt')
        serv_close_dt=data.get('serv_close_dt')
        serv_status=data.get('serv_status')
        serv_remarks=data.get('serv_remarks')
        serv_rating=data.get('serv_rating')
        pro_rating=data.get('pro_rating')
        serv_req_method=data.get('serv_req_method')
        serv_req_data=ServiceRequest.query.get(serv_req_id) #since in servicerequest api there would be status=requested at first, whenever it is created for the first time

        if serv_req_data:
            if serv_status=="Requested" and serv_req_method=="Accepted":
                try: #after pro has accepted, fetch call to make the
                    serv_req_data.pro_id=pro_id
                    serv_req_data.service_status='Accepted'
                    db.session.commit()
                    return {"Message":"ServiceRequest successfully accepted"},200
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
            
            if serv_status=="Accepted" and serv_req_method=="Closed": #trying to close the service once completed
                try:
                    serv_req_data.service_close_datetime=serv_close_dt
                    serv_req_data.service_remarks=serv_remarks
                    serv_req_data.service_rating=serv_rating
                    serv_req_data.pro_rating=pro_rating
                    serv_req_data.service_status='Closed'
                    db.session.commit()
                    return {"Message":"ServiceRequest successfully closed"},200
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
                
            if serv_status=="Requested" and serv_req_method=="Cancelled":
                try:
                    serv_req_data.service_close_datetime=serv_close_dt
                    serv_req_data.service_status="Cancelled"
                    db.session.commit()
                    return {"Message":"ServiceRequest successfully cancelled"},200
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
            
            if serv_status=="Accepted" and serv_req_method=="Cancelled":
                try:
                    serv_req_data.service_close_datetime=serv_close_dt
                    serv_req_data.service_status="Cancelled"
                    db.session.commit()
                    return {"Message":"ServiceRequest successfully cancelled"},200
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
        else:
            return {"Message":"ServiceRequest not found"},404
        

class ServiceRequestListAPI(Resource):

    @marshal_with(service_request_fields)
    @auth_required('token')
    def get(self):
        serv_req_data_list=ServiceRequest.query.all()

        if not serv_req_data_list:
            return {"Message":"ServiceRequests do not exist"},404
        
        return serv_req_data_list
    
    def post(self):
        data=request.get_json()
        serv_id=data.get('serv_id')
        cust_id=data.get('cust_id')
        serv_req_dt=data.get('serv_req_dt')

        if current_user.roles[0]!='Customer':
            return {"Message":"Forbidden: only Customer can create new ServiceRequest"},403
        
        serv_req_data=db.session.query(ServiceRequest).filter((ServiceRequest.cust_id==cust_id)&(ServiceRequest.serv_id==serv_id)&(ServiceRequest.service_status=='Requested')).all()
        
        if serv_req_data:
            return {"Message":"Service already booked "},400
        
        try:
            new_serv_req=ServiceRequest(serv_id=serv_id, cust_id=cust_id,service_request_datetime=serv_req_dt)
            db.session.add(new_serv_req)
            db.session.commit()
            return {"Message":"ServiceRequest details added successfully"},201
        
        except:
            db.session.rollback()
            return {"Message":"Error in database"},400
    


class CustomerAPI(Resource):

    @marshal_with(customer_fields)
    @auth_required('token')
    def get(self,c_id):
        c_data=Customer.query.get(c_id)

        if not c_data:
            return {"Message":"Customer does not exist"},404
        
        return c_data
    
    @auth_required('token')
    def put(self,c_id):
        data=request.get_json()
        user_c_id=data.get('user_c_id')
        req_method=data.get('req_method')
        c_data=Customer.query.get(c_id)
        c_user_data=User.query.get(user_c_id)
        if c_data and c_user_data:
            if req_method=="UpdateProfile" and current_user.roles[0]=="Customer":
                c_name=data.get('c_name')
                c_contact_no=data.get('c_contact_no')
                c_address=data.get('c_address')
                c_pincode=data.get('c_pincode')

                try:
                    c_data.c_name=c_name
                    c_data.c_contact_no=c_contact_no
                    c_data.c_address=c_address
                    c_data.c_pincode=c_pincode
                    db.session.commit()
                    return {"Message":"Customer details updated successfully"},200
                
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
                
            if req_method=="BlockCustomer" and current_user.roles[0]=="Admin":
                try:
                    c_user_data.active=False
                    db.session.commit()
                    return {"Message":"Customer successfully blocked"},200
                
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
            
            if req_method=="UnblockCustomer" and current_user.roles[0]=="Admin":
                try:
                    c_user_data.active=True
                    db.session.commit()
                    return {"Message":"Customer successfully unblocked"},200
                
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
        else:
            return {"Message":"Customer/User is not found"},404
    

class CustomerListAPI(Resource):

    @marshal_with(customer_fields)
    @auth_required('token')
    def get(self):
        cust_data_list=Customer.query.all()

        if not cust_data_list:
            return {"Message":"Customers do not exist"},404
        
        return cust_data_list
    

class ProfessionalAPI(Resource):
    
    @marshal_with(pro_fields)
    @auth_required('token')
    def get(self,p_id):
        p_data=Professional.query.get(p_id)

        if not p_data:
            return {"Message":"Professional does not exist"},404
        
        return p_data
    
    @auth_required('token')
    def put(self,p_id):
        data=request.get_json()
        user_p_id=data.get('user_p_id')
        req_method=data.get('req_method')
        p_data=Professional.query.get(p_id)
        p_user_data=User.query.get(user_p_id)
        if p_data and p_user_data:
            if req_method=="UpdateProfile" and current_user.roles[0]=="Professional":
                p_name=data.get('p_name')
                p_contact_no=data.get('p_contact_no')
                p_service_type=data.get('p_service_type')
                p_pincode=data.get('p_pincode')

                try:
                    p_data.p_name=p_name
                    p_data.p_contact_no=p_contact_no
                    p_data.p_service_type=p_service_type
                    p_data.p_pincode=p_pincode
                    db.session.commit()
                    return {"Message":"Professional details updated successfully"},200
                
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
                
            if req_method=="BlockPro" and current_user.roles[0]=="Admin":
                try:
                    p_user_data.active=False
                    db.session.commit()
                    return {"Message":"Professional successfully blocked"},200
                
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
            
            if req_method=="Approve/UnblockPro" and current_user.roles[0]=="Admin":
                try:
                    p_user_data.active=True
                    db.session.commit()
                    return {"Message":"Professional successfully approved/unblocked"},200
                
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
        else:
            return {"Message":"Professional/User is not found"},404
    

class ProfessionalListAPI(Resource):

    @marshal_with(pro_fields)
    @auth_required('token')
    def get(self):
        pro_data_list=Professional.query.all()

        if not pro_data_list:
            return {"Message":"Professionals do not exist"},404
        
        return pro_data_list


class UserAPI(Resource):

    @marshal_with(user_fields)
    @auth_required('token')
    def get(self,user_id):
        user_data=User.query.get(user_id)

        if not user_data:
            return {"Message":"User does not exist"},404
        
        return user_data

    @auth_required('token')
    def delete(self,user_id):
        user_data=User.query.filter(User.user_id==user_id).first()
        pro_data=Professional.query.filter(Professional.user_p_id==user_id).first()

        if not user_data:
             return {"Message":"User does not exist"},404
        
        if current_user.roles[0].name!='Admin':
            return {"Message":"Forbidden: only Admin can remove users"},403
        
        try:
            db.session.delete(user_data)
            db.session.delete(pro_data)
            db.session.commit()
            return "",204
        
        except:
            db.session.rollback()
            return {"Message":"Error in database"},400

class UserListAPI(Resource):
    
    @marshal_with(user_fields)
    @auth_required('token')
    def get(self):
        user_data=User.query.all()

        if current_user.roles[0]!='Admin':
            return {"Message":"Forbidden: only Admin can access user details"},403

        return user_data



    
    
api.add_resource(RegisterAPI,'/register')
api.add_resource(ServiceAPI,'/service/<int:service_id>')
api.add_resource(ServiceListAPI,'/service')
api.add_resource(ServiceRequestAPI,'/service_request/<int:serv_req_id>')
api.add_resource(ServiceRequestListAPI,'/service_request')
api.add_resource(CustomerAPI,'/customer/<int:c_id>')
api.add_resource(CustomerListAPI,'/customer')
api.add_resource(ProfessionalAPI,'/professional/<int:p_id>')
api.add_resource(ProfessionalListAPI,'/professional')
api.add_resource(UserAPI,'/user/<int:user_id>')
api.add_resource(UserListAPI,'/user')