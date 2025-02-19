from flask import current_app as app,request
from flask_restful import Api, Resource,fields,marshal_with,marshal
from backend.models import db,User,Customer,Professional,Service,ServiceRequest
from flask_security import auth_required,current_user
from datetime import datetime,timedelta


cache=app.cache

api=Api(prefix='/api')

   
service_fields={
    'serv_id' : fields.Integer,
    'serv_type' : fields.String,
    'serv_name' : fields.String,
    'serv_price' : fields.Integer,
    'serv_duration' : fields.Integer,
    'serv_avg_rating' : fields.Float(attribute='serv_avg_rating'),
    'serv_desc' : fields.String
}

service_request_fields={
    'serv_req_id': fields.Integer,
    'serv_id' : fields.Integer,
    'serv_type': fields.String(attribute="service.serv_type"),
    'serv_name' : fields.String(attribute='service.serv_name'),
    'serv_price' : fields.Integer(attribute="service.serv_price"),
    'cust_id' : fields.Integer,
    'cust_name' : fields.String(attribute="customer.c_name"),
    'cust_pincode': fields.Integer(attribute="customer.c_pincode"),
    'pro_id' : fields.Integer,
    'pro_name' : fields.String(attribute="professional.p_name"),
    'pro_exp' : fields.Integer(attribute="professional.p_exp"),
    'pro_avg_rating' :  fields.Float(attribute="pro_avg_rating"),
    'serv_request_datetime' : fields.String(attribute='format_serv_request_datetime'),
    'serv_close_datetime' : fields.String(attribute='format_serv_close_datetime'),
    'serv_status' : fields.String,
    'serv_remarks' : fields.String,
    'serv_rating' : fields.Integer,
    'pro_rating' : fields.Integer

}

customer_fields={
    'c_id' : fields.Integer,
    'user_c_id' : fields.Integer,
    'c_email' : fields.String(attribute='c.email'),
    'c_name' : fields.String,
    'c_contact_no': fields.Integer,
    'c_address' : fields.String,
    'c_pincode' : fields.Integer,
    'c_status' : fields.Boolean(attribute='c.active')
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
    'p_avg_rating' : fields.Float(attribute="avg_rating"),
    'p_pincode' : fields.Integer
}

role_fields={
    'name' : fields.String,
    'desc' : fields.String
}
user_fields={
    'user_id' : fields.Integer,
    'email' : fields.String,
    'roles' : fields.List(fields.Nested(role_fields)),
    'active' : fields.Boolean
}

serv_req_cust_fields={
    'serv_req_id' : fields.Integer,
    'serv_type' : fields.String(attribute='service.serv_type'),
    'serv_name' : fields.String(attribute='service.serv_name'),
    'serv_price' : fields.Integer(attribute='service.serv_price'),
    'serv_duration' :  fields.Integer(attribute='service.serv_duration'),
    'pro_id' : fields.Integer,
    'pro_name' : fields.String(attribute='professional.p_name'),
    'pro_contact_no' : fields.Integer(attribute='professional.p_contact_no'),
    'pro_exp' : fields.String(attribute='professional.p_exp'),
    'pro_avg_rating' :  fields.Float(attribute="pro_avg_rating"),
    'serv_request_datetime' : fields.String(attribute='format_serv_request_datetime'),
    'serv_close_datetime' : fields.String(attribute='format_serv_close_datetime'),
    'serv_status' : fields.String,
    'serv_remarks': fields.String,
    'serv_rating' : fields.Integer,
    'pro_rating' : fields.Integer,
}

serv_req_pro_fields={
    'serv_req_id' : fields.Integer,
    'serv_type' : fields.String(attribute='service.serv_type'),
    'serv_name' : fields.String(attribute='service.serv_name'),
    'serv_price' : fields.Integer(attribute='service.serv_price'),
    'serv_duration' :  fields.Integer(attribute='service.serv_duration'),
    'cust_name' : fields.String(attribute='customer.c_name'),
    'cust_contact_no' : fields.Integer(attribute='customer.c_contact_no'),
    'cust_address' : fields.String(attribute='customer.c_address'),
    'cust_pincode' : fields.Integer(attribute='customer.c_pincode'),
    'serv_request_datetime' : fields.String(attribute='format_serv_request_datetime'),
    'serv_close_datetime' : fields.String(attribute='format_serv_close_datetime'),
    'serv_status' : fields.String,
    'serv_remarks': fields.String,
    'serv_rating' : fields.Integer,
    'pro_rating' : fields.Integer,

}

class RegisterAPI(Resource):
    def post(self):
        data=request.get_json()
        email=data.get('email')
        role=data.get('role')
        if email is None or role is None:
            return {"Message":"Invalid Input"},400
        
        if '@' not in email:
            return {"Message":"Invalid Email"},400
        
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

                    if c_name is None or c_contact_no is None or c_address is None or c_pincode is None:
                        return {"Message":"Invalid Input"},400
                    
                    if type(c_contact_no) != int or len(str(c_contact_no))!=10:
                        return {"Message":"Invalid Contact Number"},400
                    
                    if type(c_pincode)!=int or len(str(c_pincode))!=6:
                        return {"Message":"Invalid Pincode"},400

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

                    if p_name is None or p_contact_no is None or p_service_type is None or p_pincode is None:
                        return {"Message":"Invalid Input"},400
                    
                    if type(p_contact_no) != int or len(str(p_contact_no))!=10:
                        return {"Message":"Invalid Contact Number"},400

                    if type(p_pincode)!=int or len(str(p_pincode))!=6:
                        return {"Message":"Invalid Pincode"},400
                    
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
            cache.delete("all_services")
            cache.delete("all_service_requests")
            return "",204
        
        except:
            db.session.rollback()
            return {"Message":"Error in database"},400
    
    @auth_required('token')
    def put(self,service_id):
        data=request.get_json()
        serv_type=data.get('serv_type')
        serv_name=data.get('serv_name')
        serv_price=data.get('serv_price')
        serv_duration=data.get('serv_duration')
        serv_desc=data.get('serv_desc')
        service_data=Service.query.get(service_id)

        if serv_type is None or serv_name is None or serv_price is None or serv_duration is None:
            return {"Message":"Invalid Input"},400
        
        if type(serv_price)!=int or type(serv_duration)!=int:
            return {"Message":"Invalid Price or Duration"},400

        if not service_data:
             return {"Message":"Service does not exist"},404
        
        if current_user.roles[0].name!='Admin':
            return {"Message":"Forbidden: only Admin can update services"},403
        
        try:
            service_data.serv_type=serv_type
            service_data.serv_name=serv_name
            service_data.serv_price=serv_price
            service_data.serv_duration=serv_duration
            service_data.serv_desc=serv_desc
            db.session.commit()
            cache.delete("all_services")
            return {"Message":"Service details updated successfully"},200
        
        except:
            db.session.rollback()
            return {"Message":"Error in database"},400
        
class ServiceListAPI(Resource):

    def get(self):
        query=request.args.get("q", "").strip()
        s_type=request.args.get("s_type","").strip()

        if query and query!='service_types':
            serv_data_query=Service.query.filter((Service.serv_type==query)|(Service.serv_price==query)|(Service.serv_duration==query)).all()

            if not serv_data_query:
                return {"Message":"Service not found"},404
            
            return marshal(serv_data_query,service_fields),200
        
        if query=='service_types' and s_type:
            serv_data=Service.query.filter(Service.serv_type==s_type).all()

            if not serv_data:
                return {"Message":"Services do not exist of this type"},404
            
            return marshal(serv_data,service_fields),200
            
        if query=='service_types':
            serv_types=db.session.query(Service.serv_type.distinct()).all()
            unique_serv_types=[s_type[0] for s_type in serv_types]

            return {"Service_Types": unique_serv_types},200
        
        cached_services=cache.get("all_services")
        if cached_services:
            return cached_services,200
        
        service_data_list=Service.query.all()

        if not service_data_list:
            return {"Message": "Services do not exist"},404
        
        response = marshal(service_data_list,service_fields)
        cache.set("all_services", response, timeout=180)
        return response,200


    @auth_required('token')
    def post(self):
        data=request.get_json()
        serv_type=data.get('service_type')
        serv_name=data.get('service_name')
        serv_price=data.get('service_price')
        serv_duration=data.get('service_duration')
        serv_desc=data.get('service_desc')

        if serv_type is None or serv_name is None or serv_price is None or serv_duration is None:
            return {"Message":"Invalid Input"},400
        
        if type(serv_price)!=int or type(serv_duration)!=int:
            return {"Message":"Invalid Price or Duration"},400

        if current_user.roles[0].name!='Admin':
            return {"Message":"Forbidden: only Admin can create new service"},403
        
        try:
            service=Service(serv_type=serv_type, serv_name=serv_name, serv_price=serv_price, serv_duration=serv_duration, serv_desc=serv_desc)
            db.session.add(service)
            db.session.commit()
            cache.delete("all_services")
            return {"Message":"Service created successfully"},201
        
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
    def patch(self,serv_req_id):
        data=request.get_json()
        serv_close_dt=data.get('serv_close_datetime')
        serv_rating=data.get('serv_rating')
        pro_rating=data.get('pro_rating')
        serv_remarks=data.get('serv_remarks')
        pro_id=data.get('pro_id')

        serv_req_data=ServiceRequest.query.get(serv_req_id)

        if not(serv_req_data):
            return {"Message" : "ServiceRequest not Found"},404

        if serv_close_dt:
            serv_close_dt=datetime.strptime(serv_close_dt, "%Y-%m-%d %H:%M:%S")
            if serv_rating and pro_rating:
                serv_request_time=serv_req_data.serv_request_datetime
                serv_duration=serv_req_data.service.serv_duration
                serv_closing_time=serv_request_time + timedelta(hours=serv_duration)
                current_time = datetime.now()

                if current_time < serv_closing_time:
                    return {"Message": "Sorry, you cannot close the ServiceRequest before the scheduled time."}, 400
                try:
                    serv_req_data.serv_rating=serv_rating
                    serv_req_data.pro_rating=pro_rating
                    serv_req_data.serv_remarks=serv_remarks
                    serv_req_data.serv_status='Closed'
                    serv_req_data.serv_close_datetime=serv_close_dt
                    db.session.commit()
                    cache.delete("all_service_requests")
                    return "",204
                except:
                    db.session.rollback()
                    return{"Message" : "Error in database"},400
            else:
                try:
                    serv_req_data.serv_status='Cancelled'
                    serv_req_data.serv_close_datetime=serv_close_dt
                    db.session.commit()
                    cache.delete("all_service_requests")
                    return "",204
                
                except:
                    db.session.rollback()
                    return{"Message" : "Error in database"},400
                
        if pro_id:
            pro_serv_req_data=ServiceRequest.query.filter((ServiceRequest.pro_id==pro_id)&(ServiceRequest.serv_status=='Accepted')).all()
           
            if pro_serv_req_data:
                return {"Message":"Professional is not free to accept ServiceRequest"},400
            
            try:
                serv_req_data.pro_id=pro_id
                serv_req_data.serv_status='Accepted'
                db.session.commit()
                cache.delete("all_service_requests")
                return "",204
            except:
                    db.session.rollback()
                    return{"Message" : "Error in database"},400
            
        return {"Message" : "Request body missing"},400

class ServiceRequestListAPI(Resource):

    @auth_required('token')
    def get(self):
        query=request.args.get("q", "").strip()
        cust_id=request.args.get("c_id", "").strip()
        pro_id=request.args.get("p_id", "").strip()
        pro_id_req=request.args.get("pro_new_req","").strip()
        if cust_id:
            if query:
                if len(query)==10 and query.count("-")==2:
                    query=datetime.strptime(query, "%d-%m-%Y").strftime("%Y-%m-%d")
                    serv_req_data=ServiceRequest.query.filter((ServiceRequest.cust_id==cust_id)&((ServiceRequest.serv_request_datetime.like(f"{query}%"))|(ServiceRequest.serv_close_datetime.like(f"{query}%")))).all()
            
                    if not serv_req_data:
                        return {"Message":"ServiceRequest not found"},404
            
                    return marshal(serv_req_data,serv_req_cust_fields),200
                
                else:
                    serv_req_data_query=ServiceRequest.query.join(Service).filter((ServiceRequest.cust_id==cust_id)&((Service.serv_type==query)|(Service.serv_price==query)|(ServiceRequest.serv_status==query))).all()

                    if not serv_req_data_query:
                        return {"Message":"ServiceRequest not found"},404
                    
                    return marshal(serv_req_data_query,serv_req_cust_fields),200
                
            else:
                serv_req_data=ServiceRequest.query.filter(ServiceRequest.cust_id==cust_id).all()

                if not serv_req_data:
                    return {"Message":"ServiceRequest Data not found"},404
                
                return marshal(serv_req_data,serv_req_cust_fields),200
            
        if pro_id:
            if query:
                if len(query)==10 and query.count("-")==2:
                    query=datetime.strptime(query, "%d-%m-%Y").strftime("%Y-%m-%d")
                    serv_req_data=ServiceRequest.query.filter((ServiceRequest.pro_id==pro_id)&((ServiceRequest.serv_request_datetime.like(f"{query}%"))|(ServiceRequest.serv_close_datetime.like(f"{query}%")))).all()
                    
                    if not serv_req_data:
                        return {"Message":"ServiceRequest not found"},404
                    
                    return marshal(serv_req_data,serv_req_pro_fields),200
                
                else:
                    serv_req_data=ServiceRequest.query.join(Service).filter((ServiceRequest.pro_id==pro_id)&((ServiceRequest.serv_status==query)|(ServiceRequest.pro_rating==query)|(Service.serv_price==query))).all()
                    
                    if not serv_req_data:
                        return {"Message":"ServiceRequest not found"},404
                    
                    return marshal(serv_req_data,serv_req_pro_fields),200
                
            else:
                serv_req_data=ServiceRequest.query.filter(ServiceRequest.pro_id==pro_id).all()

                if not serv_req_data:
                    return {"Message":"ServiceRequest Data not found"},404
                
                return marshal(serv_req_data,serv_req_pro_fields),200
            
        if pro_id_req:
            pro_data=Professional.query.get(pro_id_req)

            if not pro_data:
                return {"Message":"Professional does not exist"}, 404
            
            current_datetime = datetime.now()
            new_service_req_data=ServiceRequest.query.join(Customer).join(Service).filter(ServiceRequest.serv_status == 'Requested',Customer.c_pincode == pro_data.p_pincode,Service.serv_type == pro_data.p_service_type,ServiceRequest.serv_request_datetime >= current_datetime).all()

            if not new_service_req_data:
                return {"Message":'ServiceRequests do not exist'},404
                        
            return marshal(new_service_req_data,serv_req_pro_fields),200

        else:
            if query:
                if len(query)==10 and query.count("-")==2:
                    query=datetime.strptime(query, "%d-%m-%Y").strftime("%Y-%m-%d")
                    serv_req_data=ServiceRequest.query.filter((ServiceRequest.serv_request_datetime.like(f"{query}%"))|(ServiceRequest.serv_close_datetime.like(f"{query}%"))).all()
                    
                    if not serv_req_data:
                        return {"Message":"ServiceRequest not found"},404
                    
                    return marshal(serv_req_data,service_request_fields),200
                
                else:
                    serv_req_data=ServiceRequest.query.join(Customer).filter((Customer.c_pincode==query)|(ServiceRequest.serv_status==query)).all()
                    
                    if not serv_req_data:
                        return {"Message":"ServiceRequest not found"},404
                    
                    return marshal(serv_req_data,service_request_fields),200

            else:
                cached_serv_reqs=cache.get("all_service_requests")
                if cached_serv_reqs:
                    return cached_serv_reqs,200
                
                serv_req_data_list=ServiceRequest.query.all()

                if not serv_req_data_list:
                    return {"Message":"ServiceRequests do not exist"},404
                
                response = marshal(serv_req_data_list,service_request_fields)
                cache.set("all_service_requests", response, timeout=180)
                return response,200
                
                
    
    @auth_required('token')
    def post(self):
        data=request.get_json()
        serv_id=data.get('serv_id')
        cust_id=data.get('cust_id')
        serv_req_dt=data.get('serv_request_datetime')
    
        if serv_id is None or cust_id is None or serv_req_dt is None:
            return {"Message":"Invalid Input"},400
        
        req_datetime= datetime.strptime(serv_req_dt, '%d-%m-%Y %H:%M')

        if current_user.roles[0].name!='Customer':
            return {"Message":"Forbidden: only Customer can create new ServiceRequest"},403
        
        serv_req_data=db.session.query(ServiceRequest).filter((ServiceRequest.cust_id==cust_id)&(ServiceRequest.serv_id==serv_id)&((ServiceRequest.serv_status=='Requested')|(ServiceRequest.serv_status=='Accepted'))).all()
        
        if serv_req_data:
            return {"Message":"Service already booked"},400
        
        try:
            new_serv_req=ServiceRequest(serv_id=serv_id, cust_id=cust_id,serv_request_datetime=req_datetime)
            db.session.add(new_serv_req)
            db.session.commit()
            cache.delete("all_service_requests")
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
        if user_c_id is None:
            return {"Message":"Invalid Input"},400
            
        c_data=Customer.query.get(c_id)
        c_user_data=User.query.get(user_c_id)
        if c_data and c_user_data:
            if current_user.roles[0].name=="Customer":
                c_name=data.get('c_name')
                c_contact_no=data.get('c_contact_no')
                c_address=data.get('c_address')
                c_pincode=data.get('c_pincode')

                if c_name is None or c_contact_no is None or c_address is None or c_pincode is None:
                    return {"Message":"Invalid Input"},400
                
                if type(c_contact_no)!=int or len(str(c_contact_no))!=10:
                    return {"Message":"Invalid Contact Number"},400
                
                if type(c_pincode)!=int or len(str(c_pincode))!=6:
                    return {"Message":"Invalid Pincode"},400
                
                serv_reqs=ServiceRequest.query.filter((ServiceRequest.cust_id==c_id)&(ServiceRequest.serv_status=='Accepted')).all()
                if serv_reqs:
                    return {"Message" : "ServiceRequests in progress, cannot update profile right now"},409

                try:
                    c_data.c_name=c_name
                    c_data.c_contact_no=c_contact_no
                    c_data.c_address=c_address
                    c_data.c_pincode=c_pincode
                    db.session.commit()
                    cache.delete("all_customers")
                    return {"Message":"Customer details updated successfully"},200
                
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
        else:
            return {"Message" : "Customer not found"},404
                


class CustomerListAPI(Resource):

    @auth_required('token')
    def get(self):
        query=request.args.get("q","").strip()

        if query:
            cust_data=Customer.query.join(User).filter((Customer.c_pincode==query)|(Customer.c_name==query)|(User.active==query)).all()

            if not cust_data:
                return {"Message" : "Customer data not found"},404
            
            return marshal(cust_data,customer_fields),200
        

        
        cached_cust_data=cache.get("all_customers")
        if cached_cust_data:
            return cached_cust_data,200
        
        cust_data_list=Customer.query.all()

        if not cust_data_list:
            return {"Message":"Customers do not exist"},404
        
        response=marshal(cust_data_list,customer_fields)
        cache.set("all_customers", response, timeout=300) 
        return response,200
        
    

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

        if user_p_id is None:
            return {"Message":"Invalid Input"},400
        
        p_data=Professional.query.get(p_id)
        p_user_data=User.query.get(user_p_id)
        if p_data and p_user_data:
            if current_user.roles[0].name=="Professional":
                p_name=data.get('p_name')
                p_contact_no=data.get('p_contact_no')
                p_service_type=data.get('p_service_type')
                p_pincode=data.get('p_pincode')

                if p_name is None or p_contact_no is None or p_service_type is None or p_pincode is None:
                    return {"Message":"Invalid Input"},400
                
                if type(p_contact_no)!=int or len(str(p_contact_no))!=10:
                    return {"Message":"Invalid Contact Number"},400

                if type(p_pincode)!=int or len(str(p_pincode))!=6:
                    return {"Message":"Invalid Pincode"},400

                serv_reqs=ServiceRequest.query.filter((ServiceRequest.pro_id==p_id)&(ServiceRequest.serv_status=='Accepted')).all()
                if serv_reqs:
                    return {"Message" : "ServiceRequests in progress, cannot update profile right now"},409

                try:
                    p_data.p_name=p_name
                    p_data.p_contact_no=p_contact_no
                    p_data.p_service_type=p_service_type
                    p_data.p_pincode=p_pincode
                    db.session.commit()
                    cache.delete("all_service_pros")
                    return {"Message":"Professional details updated successfully"},200
                
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
        else:
            return {"Message":"Professional not found"},404
                

class ProfessionalListAPI(Resource):

    @auth_required('token')
    def get(self):
        query=request.args.get("q","").strip()

        if query:
            pro_data=Professional.query.join(User).filter((Professional.p_name==query)|(Professional.p_service_type==query)|(Professional.p_exp==query)|(Professional.p_pincode==query)|(User.active==query)).all()

            if not pro_data:
                return {"Message" : "Professional data not found"},404
            
            return marshal(pro_data,pro_fields),200

        cached_pro_data=cache.get("all_service_pros")
        if cached_pro_data:
            return cached_pro_data,200
        
        pro_data_list=Professional.query.all()

        if not pro_data_list:
            return {"Message":"Professionals do not exist"},404
        
        response=marshal(pro_data_list,pro_fields)
        cache.set("all_service_pros", response, timeout=300)
        return response,200


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

        if not user_data:
            return {"Message":"User does not exist"},404
        
        if current_user.roles[0].name!='Admin':
            return {"Message":"Forbidden: only Admin can remove users"},403
        
        try:
            db.session.delete(user_data)
            db.session.commit()
            cache.delete("all_users")
            cache.delete("all_service_pros")
            return "",204
        
        except:
            db.session.rollback()
            return {"Message":"Error in database"},400
    
    @auth_required('token')
    def patch(self,user_id):
        data=request.get_json()
        status = data["user_status"]

        if "user_status" not in data:
            return {"Message" : "Status missing"},400
        
        if status not in [True, False]:
            return {"Message": "Invalid status"},400

        user_data=User.query.get(user_id)

        if not user_data:
            return {"Message" : "User not found"},404
        if status==False:
            try:
                user_data.active = True
                db.session.commit()
                cache.delete("all_users")
                cache.delete("all_service_pros")
                cache.delete("all_customers")
                return "",204
            
            except:
                db.session.rollback()
                return {"Message":"Error in database"},400
            
        else:
            if user_data.c_user:
                c_id=user_data.c_user[0].c_id
                serv_req_data=ServiceRequest.query.filter((ServiceRequest.cust_id==c_id)&(ServiceRequest.serv_status=='Requested')|(ServiceRequest.serv_status=='Accepted')).all()
                for x in serv_req_data:
                    try:
                        x.serv_status='Cancelled'
                        db.session.commit()
                        cache.delete("all_service_requests")
                    except:
                        db.session.rollback()
                        return {"Message" : "Error in database"},400
                try:
                    user_data.active = False
                    db.session.commit()
                    cache.delete("all_users")
                    cache.delete("all_customers")
                    return "",204
            
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400

            elif user_data.p_user:
                p_id=user_data.p_user[0].p_id
                serv_req_data=ServiceRequest.query.filter((ServiceRequest.pro_id==p_id)&(ServiceRequest.serv_status=='Accepted')).all()
                for x in serv_req_data:
                    try:
                        x.serv_status='Cancelled'
                        db.session.commit()
                        cache.delete("all_service_requests")
                    except:
                        db.session.rollback()
                        return {"Message" : "Error in database"},400
                
                try:
                    user_data.active = False
                    db.session.commit()
                    cache.delete("all_users")
                    cache.delete("all_service_pros")
                    return "",204
            
                except:
                    db.session.rollback()
                    return {"Message":"Error in database"},400
            else:
                return {"User not found"},404


class UserListAPI(Resource):
    
    @auth_required('token')
    def get(self):
        query=request.args.get("q","").strip()

        if current_user.roles[0].name!='Admin':
            return {"Message":"Forbidden: only Admin can access user details"},403

        if query:
            user_data=User.query.filter((User.email==query)|(User.roles[0].name==query)|(User.active==query)).all()

            if not user_data:
                return {"Message" : "User data not found"},404
            
            return marshal(user_data,user_fields),200

        cached_user_data=cache.get("all_users")
        if cached_user_data:
            return cached_user_data,200
        
        user_data=User.query.all()

        if not user_data:
            return {"Message" : "User data not found"},404

        response=marshal(user_data,user_fields)
        cache.set("all_users", response, timeout=300)
        return response,200
        

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


