export default{
    props:{
        services: Array,
    },
    template:`
    <div>
        <div class="container">
            <div v-if="service_table">
                <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Services</p>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Price ₹</th>
                            <th>Average Rating</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="s in services" :key="s.serv_id">
                            <td><button type="button" class="btn btn-warning" @click="service_details_page(s.serv_id)">{{s.serv_id}}</button></td>
                            <td>{{s.serv_type}}</td>
                            <td>{{s.serv_name}}</td>
                            <td>{{s.serv_price}}</td>
                            <td>{{s.serv_avg_rating}}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-lg btn-warning" @click="Service_Update(s.serv_id)">Edit</button>
                                    <button type="button" class="btn btn-lg btn-danger" @click="ServiceDelete(s.serv_id)">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="row-6 text-end">
                    <button class="btn btn-lg btn-success" @click="ServiceCreateForm">+ Create Service</button>
                </div>
            </div>
            <div v-else-if="service_update_form">
                <p class="mb-0 text-center" style="color:lightseagreen; font-size:35px; font-weight:bold;">Update Service</p><br>
                <form @submit.prevent="ServiceUpdate" id="ServiceUpdateForm">
                    <div class="row">
                        <div class="my-3 col-md-4" style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Type</label>
                            <select class="form-select" v-model="service_update_obj.serv_type" name="service_type" required>
                                <option v-for="s in services_type_data">
                                    {{s}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-4"style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Name</label>
                            <input type="text" class="form-control" v-model="service_update_obj.serv_name" name="service_name" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Price ₹</label>
                            <input type="text" class="form-control"  v-model="service_update_obj.serv_price" name="service_price" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Duration (hrs)</label>
                            <input type="text" class="form-control" v-model="service_update_obj.serv_duration" name="service_duration" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="service_desc" class="form-label">Service Description</label>
                            <input type="text" class="form-control" v-model="service_update_obj.serv_desc" name="service_desc">
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-6" style="text-align:end;padding:0px;margin:auto">
                            <button type="submit" class="btn btn-success btn-lg p-2 col-4" id="btn-create">Update</button>
                        </div>
                        <div class="col-6" style="text-align:start;padding:0px;margin:auto">
                            <button type="button" @click="ServiceUpdateClose" class="btn btn-lg p-2 col-4 btn-danger">Close</button>
                        </div>
                    </div>
                </form>    
            </div>
            <div v-else-if="service_create_form">
                <p class="mb-0 text-center" style="color:lightseagreen; font-size:35px; font-weight:bold;">Create Service</p><br>
                <form @submit.prevent="ServiceCreate" id="ServiceCreateForm">
                    <div class="row">
                        <div class="my-3 col-md-4" style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Type</label>
                            <select class="form-select" v-model="new_service_type" name="service_type" required>
                                <option v-for="s in services_type_data">
                                    {{s}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-4"style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Name</label>
                            <input type="text" class="form-control" v-model="new_service_name" name="service_name" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Price ₹</label>
                            <input type="text" class="form-control"  v-model="new_service_price" name="service_price" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Duration (hrs)</label>
                            <input type="text" class="form-control" v-model="new_service_duration" name="service_duration" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="service_desc" class="form-label">Service Description</label>
                            <input type="text" class="form-control" v-model="new_service_desc" name="service_desc">
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-6" style="text-align:end;padding:0px;margin:auto">
                            <button type="submit" class="btn btn-success btn-lg p-2 col-4" id="btn-create">Create</button>
                        </div>
                        <div class="col-6" style="text-align:start;padding:0px;margin:auto">
                            <button type="button" @click="ServiceCreateClose" class="btn btn-lg p-2 col-4 btn-danger">Close</button>
                        </div>
                    </div>                
                </form>
            </div>
        </div>
    </div>
    `,
    mounted(){
        this.style = document.createElement('style')
        this.style.innerHTML=`
            #ServiceCreateForm {
                text-align: center;
                background-color: lightgoldenrodyellow;
                padding: 10px;
                font-size: 22px;
                margin: auto;
                border: 10px solid teal;
                height: 700px;
                width: 1000px;
            }
            #ServiceUpdateForm {
                text-align: center;
                background-color: lightgoldenrodyellow;
                padding: 10px;
                font-size: 22px;
                margin: auto;
                border: 10px solid teal;
                height: 700px;
                width: 1000px;
            }
        `
        document.head.appendChild(this.style)    
    },
    unmounted() {
        if (this.style) {
            document.head.removeChild(this.style);
        }
    },
    data(){
        return{
            service_table:true,
            service_update_form:false,
            service_create_form:false,
            services_type_data:[
                'Cleaning','Electrical','Plumbing',
                'Carpentry','Painting','Appliance Installation',
                'Appliance Service','Pest Control'
            ],
            service_update_id:null,
            service_update_obj:null,
            new_service_type:null,
            new_service_name:null,
            new_service_price:null,
            new_service_duration:null,
            new_service_desc:null
        }
    },
    methods:{
        service_details_page(service_id){
            this.$emit('Service_Details',service_id)
        },

        Service_Update(service_id){
            this.service_table=false
            this.service_update_form=true
            this.service_update_id=service_id
            this.service_update_obj=this.services.find(service => service.serv_id === service_id)
            this.$emit('ServiceForm')
        },
        ServiceCreateForm(){
            this.service_table=false
            this.service_create_form=true
            this.$emit('ServiceForm')
        },
        ServiceUpdateClose(){
            this.service_table=true
            this.service_update_form=false
            this.service_update_id=null
            this.service_update_obj=null
            this.$emit('ServiceForm')
        },
        ServiceCreateClose(){
            this.service_table=true
            this.service_create_form=false
            this.$emit('ServiceForm')
            this.new_service_type=null
            this.new_service_name=null
            this.new_service_price=null
            this.new_service_duration=null
            this.new_service_desc=null

        },
        async ServiceDelete(service_id){
            try{
                const res = await fetch(`${location.origin}/api/service/${service_id}`,{
                    method: 'DELETE',
                    headers:{
                        'Authentication-Token': this.$store.state.auth_token
                    }
                })
                if (res.ok){
                    this.$emit('Service_Deleted')
                    console.log("Service Deleted Successfully")
                    alert("Service Deleted Successfully")
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        },
        async ServiceUpdate(){
            try{
                const res = await fetch(`${location.origin}/api/service/${this.service_update_id}`,{
                    method:"PUT",
                    headers:{
                        'Authentication-Token': this.$store.state.auth_token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.service_update_obj)
                })
                if(res.ok){
                    const data=await res.json()
                    alert(data.Message)
                    console.log("Service updated successfully")
                    this.service_update_form=false
                    this.service_table=true
                    this.$emit('Service_Updated')
                    this.$emit('ServiceForm')
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
                this.$emit('ServiceForm')
            }

        },
        async ServiceCreate(){
            try{
                const res = await fetch(location.origin+"/api/service",{
                    method:"POST",
                    headers:{
                        'Authentication-Token': this.$store.state.auth_token,
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({"service_type":this.new_service_type,"service_name":this.new_service_name, "service_price":this.new_service_price, "service_duration":this.new_service_duration, "service_desc":this.new_service_desc})
                })
                if (res.ok){
                    const data= await res.json()
                    alert(data.Message)
                    console.log("Service Created Successfully")
                    this.service_create_form=false;
                    this.service_table=true;
                    this.$emit("Service_Created")
                    this.$emit('ServiceForm')
                    this.new_service_type=null
                    this.new_service_name=null
                    this.new_service_price=null
                    this.new_service_duration=null
                    this.new_service_desc=null
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
                this.$emit('ServiceForm')
            }
        }
        
    },
}