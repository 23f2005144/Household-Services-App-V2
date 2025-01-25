from flask import current_app as app, jsonify,request,render_template
from flask_security import verify_password,hash_password
from backend.models import db

datastore=app.security.datastore
@app.get('/')
def home():
    return render_template('index.html')

@app.route('/login',methods=['POST'])
def login():
    data=request.get_json()
    email=data.get('email')
    password=data.get('password')

    if not email and not password:
        return jsonify({"Message":'invalid input'}),404
    
    user=datastore.find_user(email=email)
    active=user.active

    if not user:
        return jsonify({"Message":"invalid email"}),404
    
    if verify_password(password,user.password):
        if active:
            if user.c_user:
                return jsonify({"token":user.get_auth_token(),"user_id":user.user_id,"email":user.email,"role":user.roles[0].name,"c_id":user.c_user.c_id}),200
            
            elif user.p_user:
                return jsonify({"token":user.get_auth_token(),"user_id":user.user_id,"email":user.email,"role":user.roles[0].name,"p_id":user.p_user.p_id}),200

            else:
                return jsonify({"token":user.get_auth_token(),"user_id":user.user_id,"email":user.email,"role":user.roles[0].name}),200
        else:
            return jsonify({"Message":"User is blocked/not approved"}),403
    else:
        return jsonify({"Message":"wrong password"}),400
    
@app.route('/register',methods=["POST"])
def register_user():
    data=request.get_json()
    email=data.get('email') 
    password=data.get('password')
    role=data.get('role')
    role_obj=datastore.find_role(role)
    if role_obj=='Customer':
        user=datastore.find_user(email=email)
        if user:
            return jsonify({"Message":"User already exists"}),409
        try:
            datastore.create_user(email=email, password=hash_password(password), roles=[role_obj])
            db.session.commit()
            return jsonify({"Message":"User created successfully"}),201
        except:
            db.session.rollback()
            return jsonify({"Message":"Error creating user in database"}),400
        
    elif role_obj=='Professional':
        user=datastore.find_user(email=email)
        if user:
            return jsonify({"Message":"User already exists"}),409
        try:
            datastore.create_user(email=email, password=hash_password(password), roles=[role_obj],active=False) #since pro first has to be approved by admin
            db.session.commit()
            return jsonify({"Message":"User created successfully"}),201
        except:
            db.session.rollback()
            return jsonify({"Message":"Error creating user in database"}),400
    else:
        return jsonify({"Message":"Admin cannot be registered"}),400
