export default{
    props:{
        query:String,
        table:String
    },
    template:`
    <div>
        <div class="container">
            <div class="row">
                <form @submit.prevent="CustomerSearchData">
                    <div class="row my-5">
                        <div class="col-md-6">
                            <select class="form-select" name="search_cat" required v-model="search_table">
                                <option v-for="t in c_tables" :value="t">
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
                                    <th>Action</th>
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
                                    <td><button class="btn btn-primary btn-lg" @click="$router.push('/customer/'+$store.state.c_id+'/service_book/'+s.serv_type)">Book Service</button></td> 
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
                                    <th>Service Duration (hrs)</th>
                                    <th>Assigned Professional</th>
                                    <th>Contact Number</th>
                                    <th>Experience (yrs)</th>
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
                                    <td>{{sr.serv_duration}}</td>
                                    <td>{{sr.pro_name}}</td>
                                    <td>{{sr.pro_contact_no}}</td>
                                    <td>{{sr.pro_exp}}</td>
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
            c_tables:['Service','ServiceRequest'],
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
    methods:{
        async CustomerSearchData(){
            try{
                this.table_data=null
                const QueryParams = new URLSearchParams({c_id:this.$store.state.c_id,t:this.search_table,q:this.search_query}).toString()
                const endp=this.search_table==="ServiceRequest"?"service_request":"service"
                const res = await fetch(`${location.origin}/api/${endp}?${QueryParams}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if (res.ok){
                    const data = await res.json()
                    this.table_data=data
                    this.$router.push({ query:{ t:this.search_table, q:this.search_query || undefined }}).catch(err => {
                        if (err.name !== 'NavigationDuplicated') {
                            throw err;
                        }
                    })
                    
                }else{
                    const {Message} = await res.json();
                    throw new Error(Message);
                }
            }catch(error){
                console.log(error.message)
                this.table_data=null
            }

        }
    }

}