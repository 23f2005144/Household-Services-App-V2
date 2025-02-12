export default{
    props:{
        query:String,
        table:String
    },
    template:`
    <div>
        <div class="container">
            <div class="row">
                <form @submit.prevent="AdminSearchData">
                    <div class="row my-5">
                        <div class="col-md-6">
                            <select class="form-select" name="search_cat" required v-model="search_table">
                                <option v-for="t in a_tables" :value="t">
                                    {{t}}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-4 text-end">
                            <input class="form-control me-2" type="search" v-model="search_query" id="search_q" name="search_q"
                                placeholder="Search by:">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-lg btn-outline-success" type="submit">Search</button>
                        </div>
                    </div>
                </form>
            </div>
            <div v-if="table_data">
                <div v-if="search_table==='Service'">
                    <div class="row">
                        <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Search Results for Services</p>
                        <table class="table table-hover table-bordered border-primary">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Service Type</th>
                                    <th>Service Name</th>
                                    <th>Service Price (₹)</th>
                                    <th>Service Duration (hrs)</th>
                                    <th>Service Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in table_data" :key="s.serv_id">
                                    <td>{{s.serv_id}}</td>
                                    <td>{{s.serv_type}}</td>
                                    <td>{{s.serv_name}}</td>
                                    <td>{{s.serv_price}}</td>
                                    <td>{{s.serv_duration}}</td>
                                    <td>{{s.serv_desc}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else-if="search_table==='ServiceRequest'">
                    <div class="row">
                        <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Search Results for Service Requests</p>
                        <table class="table table-hover table-bordered border-primary">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Service Type</th>
                                    <th>Service Name</th>
                                    <th>Service Price (₹)</th>
                                    <th>Customer Name (Location)</th>
                                    <th>Professional Name (Contact Number)</th>
                                    <th>Professional Experience (yrs) (Average Rating)</th>
                                    <th>DateTime_of_Request</th>
                                    <th>DateTime_of_Completion</th>
                                    <th>Service Status</th>
                                    <th>Service Remarks</th>
                                    <th>Service Rating</th>
                                    <th>Professional Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="sr in table_data" :key="sr.serv_req_id">
                                    <td>{{sr.serv_req_id}}</td>
                                    <td>{{sr.serv_type}}</td>
                                    <td>{{sr.serv_name}}</td>
                                    <td>{{sr.serv_price}}</td>
                                    <td>{{sr.cust_name}}  ({{sr.cust_pincode}})</td>
                                    <td>{{sr.pro_name}}  ({{sr.pro_contact_no}})</td>
                                    <td>{{sr.pro_exp}}  ({{sr.pro_avg_rating}})</td>
                                    <td>{{sr.serv_request_datetime}}</td> 
                                    <td>{{sr.serv_close_datetime}}</td> 
                                    <td>{{sr.serv_status}}</td>
                                    <td>{{sr.serv_remarks}}</td>
                                    <td>{{sr.serv_rating}}</td>
                                    <td>{{sr.pro_rating}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else-if="search_table==='Customer'">
                    <div class="row">
                        <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Search Results for Customers</p>
                        <table class="table table-hover table-bordered border-primary">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Customer Name</th>
                                    <th>Customer Contact Number</th>
                                    <th>Customer Address</th>
                                    <th>Customer Pincode</th>
                                    <th>Customer Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="c in table_data" :key="c.c_id">
                                    <td>{{c.c_id}}</td>
                                    <td>{{c.user_c_id}}</td>
                                    <td>{{c.c_name}}</td>
                                    <td>{{c.c_contact_no}}</td>
                                    <td>{{c.c_address}}</td>
                                    <td>{{c.c_pincode}}</td>
                                    <td>
                                        <p v-if="c.c_status===true">Active</p>
                                        <p v-else>Blocked</p>
                                    </td>
                                    <td>
                                        <button v-if="c.c_status===true" class="btn btn-lg btn-danger" @click="BlockUser(c.user_c_id,'customer')">Block</button>
                                        <button v-else class="btn btn-lg btn-warning" @click="UnblockUser(c.user_c_id,'customer')">Unblock</button>   
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else-if="search_table==='Professional'">
                    <div class="row">
                        <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Search Results for Service Professionals</p>
                        <table class="table table-hover table-bordered border-primary">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Professional Name</th>
                                    <th>Professional Contact Number</th>
                                    <th>Professional Serviceable Pincode</th>
                                    <th>Professional Expertise</th>
                                    <th>Professional Experience (yrs)</th>
                                    <th>Professional Average Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in table_data" :key="p.p_id">
                                    <td>{{p.p_id}}</td>
                                    <td>{{p.user_p_id}}</td>
                                    <td>{{p.p_name}}</td>
                                    <td>{{p.p_contact_no}}</td>
                                    <td>{{p.p_pincode}}</td>
                                    <td>{{p.p_exp}}</td>
                                    <td>{{p.p_avg_rating}}</td>
                                    <td>
                                        <p v-if="p.p_status===true">Active</p>
                                        <p v-else>Blocked</p>
                                    </td>
                                    <td>
                                        <button v-if="p.p_status===true" class="btn btn-lg btn-danger" @click="BlockUser(p.user_p_id,'professional')">Block</button>
                                        <button v-else class="btn btn-lg btn-warning" @click="UnblockUser(p.user_p_id,'professional')">Unblock</button>   
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div v-else-if="search_table==='User'">
                    <div class="row">
                        <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Search Results for Users</p>
                        <table class="table table-hover table-bordered border-primary">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>User Email</th>
                                    <th>User Status</th>
                                    <th>User Role</th>
                                    <th>User Role Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="u in table_data" :key="u.user_id">
                                    <td>{{u.user_id}}</td>
                                    <td>{{u.email}}</td>
                                    <div v-if="u.active==true">
                                        <td><p>Active</p></td>
                                    </div>
                                    <div v-else>
                                        <td><p>Blocked</p></td>
                                    </div>
                                    <td>{{u.roles[0].name}}</td>
                                    <td>{{u.roles[0].desc}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `,
    async mounted(){
        this.style = document.createElement('style')
        this.style.innerHTML=`
            table{
                font-size: 16px;
            }
            body{
                background-color: lightgoldenrodyellow;  
            }`
        document.head.appendChild(this.style)    
    },
    unmounted() {
        if (this.style) {
            document.head.removeChild(this.style);
        }
    },
    data(){
        return{
            style:null,
            a_tables:['Service','ServiceRequest','Customer','Professional','User'],
            table_data:[],
            search_query:this.query || "",
            search_table:this.table || ""
        }
    },
    watch:{
        search_table(newVal,oldVal) {
            if (newVal!==oldVal) {
                this.table_data = null //helps so that service table data is not shown during selecting servicereq table and vis-a-vis
            }
        }
    },
    methods:{//still need to check this.
        async AdminSearchData(){
            try{
                this.table_data=null
                let QueryParams=""
                let endp=""
                if (this.search_table==="ServiceRequest") {
                    endp="service_request"
                    if (this.search_query){
                        QueryParams=new URLSearchParams({q:this.search_query}).toString()
                    }
                } else if (this.search_table==="Service") {
                    endp="service"
                    if (this.search_query){
                        QueryParams=new URLSearchParams({q:this.search_query}).toString()
                    }
                } else if (this.search_table==="Customer") {
                    endp="customer"
                    if (this.search_query){
                        if(this.search_query==='Active'){
                            QueryParams=new URLSearchParams({q:1}).toString()
                        }
                        else if(this.search_query==='Blocked'){
                            QueryParams=new URLSearchParams({q:0}).toString()
                        }else{
                            QueryParams=new URLSearchParams({q:this.search_query}).toString()
                        }
                    }
                } else if (this.search_table==="Professional") {
                    endp="professional"
                    if (this.search_query){
                        if(this.search_query==='Active'){
                            QueryParams=new URLSearchParams({q:1}).toString()
                        }
                        else if(this.search_query==='Blocked'){
                            QueryParams=new URLSearchParams({q:0}).toString()
                        }else{
                            QueryParams=new URLSearchParams({q:this.search_query}).toString()
                        }
                    }
                } else if (this.search_table==="User") {
                    endp="user"
                    if (this.search_query){
                        QueryParams=new URLSearchParams({q:this.search_query}).toString()
                    }
                }
                const res = await fetch(`${location.origin}/api/${endp}${QueryParams ? "?"+QueryParams : ""}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                this.$router.push({ query:{ t:this.search_table, q:this.search_query || undefined }}).catch(err => {
                    if (err.name !== 'NavigationDuplicated') {
                        throw err;
                    }
                })
                
                if (res.ok){
                    const data = await res.json()
                    this.table_data=data
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
                this.table_data=null
            }

        },
        async BlockUser(user_id,role){
            try{
                let user_data
                let user_status
                if (role==='customer'){
                    user_data=this.table_data.find(user => user.user_c_id===user_id)
                    user_status=user_data.c_status

                }else if (role==='professional'){
                    user_data=this.table_data.find(user => user.user_p_id===user_id)
                    user_status=user_data.p_status
                }
                const res = await fetch(`${location.origin}/api/user/${user_id}`,{
                    method:"PATCH",
                    headers:{
                        'Authentication-Token' : this.$store.state.auth_token,
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({'user_status':user_status})
                })
                if(res.status===204){
                    console.log("User Blocked Successfully")
                    alert("User Blocked Successfully!")
                    window.location.reload()
                    this.table_data=null

                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)

                }
            } catch(error){
                console.log(error.message)
                this.table_data=null
            }
        },
        async UnblockUser(user_id,role){
            try{
                let user_data
                let user_status
                if (role==='customer'){
                    user_data=this.table_data.find(user => user.user_c_id===user_id)
                    user_status=user_data.c_status

                }else if (role==='professional'){
                    user_data=this.table_data.find(user => user.user_p_id===user_id)
                    user_status=user_data.p_status
                }
                const res = await fetch(`${location.origin}/api/user/${user_id}`,{
                    method:"PATCH",
                    headers:{
                        'Authentication-Token' : this.$store.state.auth_token,
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({'user_status':user_status})
                })
                if(res.status===204){
                    console.log("User Unblocked Successfully")
                    alert("User Unblocked Successfully!")
                    window.location.reload()
                    this.table_data=null

                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)

                }
            } catch(error){
                console.log(error.message)
                this.table_data=null
            }
        }


    }

    
}