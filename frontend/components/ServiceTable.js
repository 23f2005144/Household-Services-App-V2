export default{
    props:{
        services: Array,
    },
    template:`
    <div>
        <div v-if="service_table">
            <div class="container">
                <div class="row my-3">
                    <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Services</p>
                    <table class="table table-hover table-bordered border-primary">
                        <thead>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Price ₹</th>
                            <th>Action</th>
                        </thead>
                            <tr v-for="s in services" :key="s.service_id">
                                <td><button type="button" class="btn btn-lg btn-info" @click.prevent="service_details_page(s.service_id)">{{s.service_id}}</button></td>
                                <td>{{s.service_type}}</td>
                                <td>{{s.service_name}}</td>
                                <td>{{s.service_price}}</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <a @click.prevent="service_edit(s.service_id)"><button type="button" class="btn btn-lg btn-warning">Edit</button></a>
                                        <a @click.prevent="ServiceDelete(s.service_id)"><button type="button" class="btn btn-lg btn-danger">Delete</button></a>
                                    </div>
                                </td>
                            </tr>
                    </table>
                </div>
            </div>
        </div>
        <div v-else-if="service_update_form">
            <p class="mb-0 text-center" style="color:lightseagreen; font-size:35px; font-weight:bold;">Update Service</p><br>
            <div class="container">
                <form @submit.prevent="ServiceUpdate">
                    <div class="row">
                        <div class="my-3 col-md-4" style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Type</label>
                            <select class="form-select" v-model="service_update_obj.service_type" name="service_type" required>
                                <option v-for="s in services_type_data">
                                    {{s}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-4"style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Name</label>
                            <input type="text" class="form-control" v-model="service_update_obj.service_name" name="service_name" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Price ₹</label>
                            <input type="text" class="form-control"  v-model="service_update_obj.service_price" name="service_price" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align:center;padding:0px;margin:auto">
                            <label for="name" class="form-label">Service Duration (hrs)</label>
                            <input type="text" class="form-control" v-model="service_update_obj.service_duration" name="service_duration" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="my-3 col-md-3" style="text-align: center;padding:0px;margin:auto">
                            <label for="service_desc" class="form-label">Service Description</label>
                            <input type="text" class="form-control" v-model="service_update_obj.service_desc" name="service_desc">
                        </div>
                    </div><br>
                    <button type="submit" class="btn btn-success btn-lg p-2 col-md-2" id="btn-create">Update</button>
                </form>
            </div> 
        </div>
    </div>
    `,
    data(){
        return{
            service_table:true,
            service_update_form:false,
            services_type_data:[
                'Cleaning','Electrical','Plumbing',
                'Carpentry','Painting','Appliance Installation',
                'Appliance Service','Pest Control'
            ],
            service_update_id:null,
            service_update_obj:null,
        }
    },
    methods:{
        service_details_page(service_id){
            this.$emit('service_details',service_id)
        },

        service_edit(service_id){
            this.service_table=false;
            this.service_update_form=true;
            this.service_update_id=service_id
            this.service_update_obj=this.services.find(service => service.service_id === service_id)
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
                    this.$emit('Service_Deleted',service_id)
                    console.log("Service Deleted Successfully")
                    alert("Service Deleted Successfully")
                }
            }
            catch(error){
                console.log("Error",error)
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
                    this.service_update_form=false;
                    this.service_table=true;
                    this.$emit('Service_Updated',this.service_update_obj)
                }

            }
            catch(error){
                console.log("Error",error)
            }

        }
    },
}