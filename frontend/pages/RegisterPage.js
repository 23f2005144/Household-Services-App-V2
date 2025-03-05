export default{
    template:`
    <div>
        <div v-if="role==='Customer'">
            <div>
                <p class="Title display-1 text-center">Abode Mantra:Your A-Z Cleaning Experts</p>
                <hr style="border:6px dashed lightseagreen;">
                <p class="Subtitle text-center">Experience the Comfort and Satisfaction of a Perfectly Maintained Home</p>
                <img class="img-fluid rounded float-end" style="height: 440px; width: 440px;" src="/static/bucket-303265_640-copywritefreefromPixabay.png">
                <img class="img-fluid rounded float-start" style="height: 440px; width: 440px;" src="/static/cleaning-up-294085_1920-copywritefreefromPixabay.png">
            </div>
            <div class="container" id="Register-Cust">
                <form @submit.prevent="RegisterCustomer">
                    <h1 class="text-center"style="font-weight:bolder;font-size:40px;padding:15px;">Welcome to Customer Registration!</h1>
                    <div class="row d-flex justify-content-center">
                        <div class="mb-4 col-md-5">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" v-model="c_name" required>
                        </div>
                        <div class="mb-4 col-md-4">
                            <label for="contact" class="form-label">Contact Number</label>
                            <input type="tel" class="form-control" name="c_contact_no" min="10" max="10" v-model="c_contact_no" required>  
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <div class="mb-4 col-md-5">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="email" class="form-control" name="email" v-model="c_email" required>
                        </div>
                        <div class="mb-4 col-md-4">
                            <label for="inputPassword4" class="form-label">Password</label>
                            <input type="password" class="form-control" name="password" v-model="c_password" required>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <div class="mb-4 col-md-5">
                            <label for="inputAddress" class="form-label">Address</label>
                            <input type="text" class="form-control" name="address" v-model="c_address" required>
                        </div>
                        <div class="mb-4 col-md-4">
                            <label for="inputZip" class="form-label">Pin Code</label>
                            <input type="text" class="form-control" name="pincode" v-model="c_pincode" required>
                        </div>
                    </div>
                    <div class="row-6">
                        <div class="text-center">
                            <button type="submit" class="btn btn-success btn-lg p-2 col-md-2">Register</button>
                            <button type="reset" class="btn btn-lg btn-danger p-2 col-md-2">Clear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div v-else-if="role==='Professional'">
            <div>
                <h1 class="Title display-1 text-center">Abode Mantra:Your A-Z Cleaning Experts</h1>
                <hr style="border:6px dashed lightseagreen;">
                <p class="Subtitle text-center">Experience the Comfort and Satisfaction of a Perfectly Maintained Home</p>
                <img class="img-fluid rounded float-end" style="height: 440px; width: 440px;" src="/static/bucket-303265_640-copywritefreefromPixabay.png">
                <img class="img-fluid rounded float-start" style="height: 440px; width: 440px;" src="/static/cleaning-up-294085_1920-copywritefreefromPixabay.png">
            </div>
            <div class="container" id="Register-Pro">
                <form @submit.prevent="RegisterPro">
                    <h2 class="text-center" style="font-weight:bolder;font-size:35px;padding:15px;">Welcome to Service Professional Registration!</h2>
                    <div class="row d-flex justify-content-center">
                        <div class="mb-3 col-md-5">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" v-model="pro_name" name="fullname" required>
                        </div>
                        <div class="mb-3 col-md-3">
                            <label for="name" class="form-label">Contact Number</label>
                            <input type="tel" class="form-control" v-model="pro_contact_no" name="pro_contact_no" min="10" max="10" required>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <div class="mb-3 col-md-5">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="email" class="form-control" v-model="pro_email" name="email" required>
                        </div>
                        <div class="mb-3 col-md-3">
                            <label for="inputPassword4" class="form-label">Password</label>
                            <input type="password" class="form-control" v-model="pro_password" name="password" required>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <div class="mb-3 col-md-5">
                            <label for="name" class="form-label">Service Type</label>
                            <select class="form-select" v-model="pro_serv_type" name="service_type" required>
                                <option v-for="service in services_data">
                                    {{service}}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3 col-md-3">
                            <label for="name" class="form-label">Years of Experience</label>
                            <input type="number" class="form-control" id="exp" v-model="pro_exp" name="yrs_of_exp" min="1" max="20" required>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center">
                        <div class="mb-3 col-md-5">
                            <label for="formFile" class="form-label">Attach Your Documents(Single PDF)</label>
                            <input class="form-control" type="text" id="File" v-model="pro_resume" name="File">
                        </div>
                        <div class="mb-3 col-md-3">
                            <label for="inputZip" class="form-label">Serviceable Pin Code</label>
                            <input type="text" class="form-control" id="inputZip" v-model="pro_pincode" name="pincode" required>  
                        </div>
                    </div>
                    <div class="row-6">
                        <div class="text-center">
                            <button type="submit" class="btn btn-warning btn-lg p-2 col-md-2">Register</button>
                            <button type="reset" class="btn btn-lg btn-danger p-2 col-md-2">Clear</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div v-else>Invalid Role</div>
    </div>
    `,
    mounted(){
        this.style=document.createElement('style')
        this.style.textContent=`
            .Title{
                background-color:lightgoldenrodyellow;
                font-style: italic;
                font-weight: bolder;
                padding: 12px;
                font-size: 80px;
                font-family:'Times New Roman', Times, serif;
                color:#00827f;
            
            }
            .Subtitle{
                background-color:lightgoldenrodyellow;
                font-style: italic;
                padding: 15px;
                font-size: 30px;
                font-weight: bolder;
                color:lightseagreen;
            }
            #Register-Cust{
                height: 510px;
                width: 1000px;
                border: 10px solid teal;
                border-radius: 10px;
                background-color:lightgoldenrodyellow;
                margin: auto;
                padding: 0px;
                font-size: 25px;
                
            }
            #Register-Pro{
                height: 560px;
                width: 1000px;
                border: 10px solid teal;
                border-radius: 10px;
                background-color:lightgoldenrodyellow;
                font-size: 24px;
                margin: auto;
            }
            body{
                background-color:lightgoldenrodyellow;
            }`
        document.head.appendChild(this.style)
        
    },
    beforeDestroy(){
        if (this.style) {
            document.head.removeChild(this.style)
        }
    },
    data(){
        return{
            style:null,
            c_name:null,
            c_contact_no:null,
            c_email:null,
            c_password:null,
            c_address:null,
            c_pincode:null,
            pro_name:null,
            pro_contact_no:null,
            pro_email:null,
            pro_password:null,
            pro_serv_type:null,
            pro_exp:null,
            pro_pincode:null,
            pro_resume:null,
            services_data:[
                'Cleaning','Electrical','Plumbing',
                'Carpentry','Painting','Appliance Installation',
                'Appliance Service','Pest Control'
            ]

        }
    },
    computed:{
        role(){
            return this.$route.params.role
        }
    },
    methods:{
        async RegisterCustomer()
        {
            try{
                const c_res = await fetch(location.origin+'/register',
                {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({'email': this.c_email,'password': this.c_password,'role':this.role})
                })
                if (c_res.ok){
                    const data = await c_res.json()
                    console.log('Successfully registered Customer',"User ID is",data.user_id)
                }
                else{
                    const {Message} = await c_res.json()
                    throw new Error(Message)
                }
                const c_response = await fetch(location.origin+'/api/register',
                    {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({'email':this.c_email,'role':this.role,'c_name':this.c_name,'c_contact_no':this.c_contact_no,'c_address':this.c_address,'c_pincode':this.c_pincode})
                    })
                if(c_response.ok){
                    console.log('Successfully added Customer Details')
                    const data_c=await c_response.json()
                    console.log(data_c)
                    this.$router.push('/login')
                    alert("Registered Successfully, Login now!")
                }else{
                    const {Message} = await c_response.json()
                    throw new Error(Message)
                }
            }catch(error){
                alert(error.message)
                console.log(error.message)
            }
        },
        async RegisterPro()
        {
            try{
                const p_res = await fetch(location.origin+'/register',
                {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({'email': this.pro_email,'password': this.pro_password,'role':this.role})
                })
                if (p_res.ok){
                    const data = await p_res.json()
                    console.log('Successfully registered Professional',"User ID is",data.user_id)
                }
                else{
                    const {Message} = await p_res.json()
                    throw new Error(Message)
                    
                }
                const p_response = await fetch(location.origin+'/api/register',
                    {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({'email':this.pro_email,'role':this.role,'p_name':this.pro_name,'p_contact_no':this.pro_contact_no,'p_serv_type':this.pro_serv_type,'p_exp':this.pro_exp,'p_pincode':this.pro_pincode})
                    })
                if(p_response.ok){
                    console.log('Successfully added Professional Details')
                    const data_p=await p_response.json()
                    console.log(data_p)
                    this.$router.push('/login')
                    alert("Registered Successfully, Login once approved by Admin")
                }else{
                    const {Message} = await p_response.json()
                    throw new Error(Message)
                }
            }catch(error){
                alert(error.message)
                console.log(error.message)
            }
        }
    }
}