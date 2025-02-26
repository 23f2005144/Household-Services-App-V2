export default{
    props:{
        cust_profile_data:Object,
        pro_profile_data:Object
    },
    template:`
    <div>
        <div class="container">
            <div v-if="$store.state.role==='Customer'" class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card shadow-lg p-4" style="background-color: #fdf5d9;">
                        <div class="card-header text-center">
                            <h1 class="fs-4">Your Profile</h1>
                        </div>
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="bi bi-person-circle" style="font-size: 80px; color: gray;"></i>
                            </div>
                            <form @submit.prevent="EditCustProfile" class="text-center fs-5">
                                <div class="row">
                                    <div class="mb-2 col-md-6">
                                        <label for="name" class="form-label">Full Name</label>
                                        <input type="text" class="form-control" id="name" name="fullname" v-model="cust_profile_data.c_name" required>
                                    </div>
                                    <div class="mb-2 col-md-6">
                                        <label for="contact" class="form-label">Contact Number</label>
                                        <input type="tel" class="form-control" name="c_contact_no" v-model="cust_profile_data.c_contact_no" min="10" max="10" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-2 col-md-6">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" name="email" v-model="cust_profile_data.c_email" disabled>
                                    </div>
                                    <div class="mb-2 col-md-6">
                                        <label for="inputAddress" class="form-label">Address</label>
                                        <input type="text" class="form-control" id="inputAddress" name="address" v-model="cust_profile_data.c_address" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-2 col-md-6">
                                        <label for="inputZip" class="form-label">Pin Code</label>
                                        <input type="text" class="form-control" id="inputZip" name="pincode" v-model="cust_profile_data.c_pincode" required>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-6 text-end">
                                        <button type="submit" class="btn btn-warning btn-lg p-2 col-md-4">Update</button>
                                    </div>
                                    <div class="col-6 text-start">
                                        <button type="button" @click="$emit('HideCustProfile')" class="btn btn-danger btn-lg p-2 col-md-4">Close</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="$store.state.role==='Professional'" class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card shadow-lg p-4" style="background-color:#e8fcfa ;">
                        <div class="card-header text-center">
                            <h1 class="fs-4">Your Professional Profile</h1>
                        </div>
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <i class="bi bi-person-circle" style="font-size: 80px; color: gray;"></i>
                            </div>
                            <form @submit.prevent="EditProProfile" class="text-center fs-5">
                                <div class="row">
                                    <div class="mb-2 col-md-6">
                                        <label for="name" class="form-label">Full Name</label>
                                        <input type="text" class="form-control" id="name" name="fullname" v-model="pro_profile_data.p_name" required>
                                    </div>
                                    <div class="mb-2 col-md-6">
                                        <label for="contact" class="form-label">Contact Number</label>
                                        <input type="tel" class="form-control" name="pro_contact_no" v-model="pro_profile_data.p_contact_no" min="10" max="10" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-2 col-md-6">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" v-model="pro_profile_data.p_email" name="email" disabled>
                                    </div>
                                    <div class="mb-2 col-md-6">
                                        <label for="serviceType" class="form-label">Service Type</label>
                                        <select class="form-select" name="service_type" v-model="pro_profile_data.p_service_type">
                                            <option v-for="p in services_type_data">
                                                {{p}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-2 col-md-6">
                                        <label for="pincode" class="form-label">Serviceable Pin Code</label>
                                        <input type="text" class="form-control" id="pincode" name="pincode" v-model="pro_profile_data.p_pincode" required>
                                    </div>
                                    <div class="mb-2 col-md-6">
                                        <label for="experience" class="form-label">Years of Experience</label>
                                        <input type="number" class="form-control" id="experience" name="yrs_of_exp" v-model="pro_profile_data.p_exp" disabled>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="mb-2 col-md-6">
                                        <label for="rating" class="form-label">My Average Rating</label>
                                        <input type="number" class="form-control" id="rating" name="avg_rating" v-model="pro_profile_data.p_avg_rating" disabled>
                                    </div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-6 text-end">
                                        <button type="submit" class="btn btn-warning btn-lg p-2 col-md-4">Update</button>
                                    </div>
                                    <div class="col-6 text-start">
                                        <button type="button" @click="$emit('HideProProfile')" class="btn btn-danger btn-lg p-2 col-md-4">Close</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    mounted(){
        this.style=document.createElement('style')
        this.style.textContent=`
        #Profile-Form{
            background-color:lightgoldenrodyellow;
            padding: 15px;
            font-size: 20px;
            margin: auto;
            border: 10px solid #00827f;
            height: 550px;
            width: 900px;
        }
        `
        document.head.appendChild(this.style)
        
    },
    unmounted(){
        if (this.style) {
            document.head.removeChild(this.style);
        }
    },
    data(){
        return{
            style:null,
            services_type_data:['Cleaning','Electrical','Plumbing',
                'Carpentry','Painting','Appliance Installation',
                'Appliance Service','Pest Control'],
        }
    },
    methods:{
        async EditCustProfile(){
            try{
                const res = await fetch(`${location.origin}/api/customer/${this.$store.state.c_id}`,{
                        method:'PUT',
                        headers:{
                            'Authentication-Token' : this.$store.state.auth_token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({...this.cust_profile_data})

                })
                if (res.ok){
                    const data = await res.json()
                    alert(data.Message)
                    console.log("Profile Updated successfully")
                    this.$emit('HideCustProfile')
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
                alert(error.message)
                this.$emit('HideCustProfile')
            }
            
        },
        async EditProProfile(){
            try{
                const res = await fetch(`${location.origin}/api/professional/${this.$store.state.p_id}`,{
                        method:'PUT',
                        headers:{
                            'Authentication-Token' : this.$store.state.auth_token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({...this.pro_profile_data})

                })
                if (res.ok){
                    const data = await res.json()
                    alert(data.Message)
                    console.log("Profile Updated successfully")
                    this.$emit('HideProProfile')
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
                alert(error.message)
                this.$emit('HideProProfile')
            }
        }
    }
}