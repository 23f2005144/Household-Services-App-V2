export default{
    props:{
        cust_profile_data:Object,
        pro_profile_data:Object
    },
    template:`
    <div>
        <div class="container">
            <p class="mb-0 text-center" style="color:teal; font-size:40px; font-weight:bold;">Edit Your Profile</p><br>
            <div v-if="$store.state.role==='Customer'" class="row">
                <form @submit.prevent="EditCustProfile" class="text-center" id='Profile-Form'>
                    <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="name" name="fullname" v-model="cust_profile_data.c_name" required>
                    </div>
                    <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                        <label for="name" class="form-label">Contact Number</label>
                        <input type="tel" class="form-control" name="c_contact_no" min="10" max="10"  v-model="cust_profile_data.c_contact_no" required>
                    </div>
                    <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" name="email" v-model="cust_profile_data.c_email" disabled>
                    </div>
                    <div class="mb-2 col-md-6" style="text-align: center;padding:0px;margin:auto">
                        <label for="inputAddress" class="form-label">Address</label>
                        <input type="text" class="form-control" id="inputAddress" name="address"  v-model="cust_profile_data.c_address" required>
                    </div>
                    <div class="mb-2 col-md-2" style="text-align: center;padding:0px;margin:auto">
                        <label for="inputZip" class="form-label">Pincode</label>
                        <input type="text" class="form-control" id="inputZip" name="pincode"  v-model="cust_profile_data.c_pincode" required>
                    </div><br>
                    <div class="col-md-12" style="text-align: center;padding:0px;margin:auto">
                        <button type="submit" class="btn btn-primary btn-lg p-2 col-md-2">Update</button>
                        <button type="button" @click="$emit('HideCustProfile')" class="btn btn-lg p-2 col-md-2 btn-danger">Close</button>
                    </div>
                </form>
            </div>
            <div v-else-if="$store.state.role==='Professional'" class="row">
                <form @submit.prevent="EditProProfile" class="text-center" id='Profile-Form'>
                    <div class="row">
                        <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" name="fullname" v-model="pro_profile_data.p_name" required>
                        </div>
                        <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Contact Number</label>
                            <input type="tel" class="form-control" name="pro_contact_no" v-model="pro_profile_data.p_contact_no" min="10" max="10" required>
                        </div>
                        <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="inputEmail4" class="form-label">Email</label>
                            <input type="email" class="form-control" id="inputEmail4" v-model="pro_profile_data.p_email" name="email" disabled>
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Type</label>
                            <select class="form-select" name="service_type" v-model="pro_profile_data.p_service_type">
                                <option v-for="p in services_type_data">
                                    {{p}}
                                </option>
                            </select>
                        </div>
                        <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="inputZip" class="form-label">Serviceable Pincode</label>
                            <input type="text" class="form-control" id="inputZip" name="pincode" v-model="pro_profile_data.p_pincode" required>
                        </div>
                        
                    </div>
                    <div class="row">
                        <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="name" class="form-label">My Average Rating</label>
                            <input type="number" class="form-control" id="rate" name="avg_rating" v-model="pro_profile_data.p_avg_rating" disabled>
                        </div>
                        <div class="mb-2 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Years of Experience</label>
                            <input type="number" class="form-control" id="exp" name="yrs_of_exp" v-model="pro_profile_data.p_exp" disabled>
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-6" style="text-align:end;padding:0px;margin:auto">
                            <button type="submit" class="btn btn-warning btn-lg p-2 col-6">Update</button>
                        </div>
                        <div class="col-6" style="text-align:start;padding:0px:margin:auto">
                            <button type="button" @click="$emit('HideProProfile')" class="btn btn-lg p-2 col-6 btn-danger">Close</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `,
    mounted(){
        this.style=document.createElement('style')
        this.style.innerHTML=`
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
                    alert(data.message)
                    console.log("Profile Updated successfully")
                    this.$emit('HideCustProfile')
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
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
                    alert(data.message)
                    console.log("Profile Updated successfully")
                    this.$emit('HideProProfile')
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
                this.$emit('HideProProfile')
            }
        }
    }
}