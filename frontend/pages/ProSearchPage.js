export default{
    props:{
        query:String
    },
    template:`
    <div>
        <div class="container">
            <div class="row">
                <form @submit.prevent="ServReqSearchData">
                    <div class="row my-5">
                        <div class="col-md-6">
                            <select class="form-select" name="search_cat" required>
                                <option value="ServiceRequest">ServiceRequest</option>
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
            <div class="row" v-if="service_reqs_data">
                <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Search Results for Service Requests</p>
                <table class="table table-hover table-bordered border-primary">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service Type</th>
                            <th>Service Name</th>
                            <th>Service Price (₹)</th>
                            <th>Service Duration (hrs)</th>
                            <th>Request Date & Time</th>
                            <th>Completion Date & Time</th>
                            <th>Service Status</th>
                            <th>Service Remarks</th>
                            <th>Service Rating</th>
                            <th>My Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sr in service_reqs_data" :key="sr.serv_req_id">
                            <td>{{sr.serv_req_id}}</td>
                            <td>{{sr.serv_type}}</td>
                            <td>{{sr.serv_name}}</td>
                            <td>{{sr.serv_price}}</td>
                            <td>{{sr.serv_duration}}</td>
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
    
    `,
    async mounted(){
        this.style = document.createElement('style')
        this.style.textContent=`
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
            service_reqs_data:null,
            search_query:this.query || "",
        }

    },
    methods:{
        async ServReqSearchData(){
            try{
                const QueryString = new URLSearchParams({q:this.search_query,p_id:this.$store.state.p_id}).toString()
                const res = await fetch(`${location.origin}/api/service_request?${QueryString}`,{
                    headers:{
                        'Authentication-Token' : this.$store.state.auth_token
                    }
                })
                this.$router.push({ query:{ q:this.search_query || undefined }}).catch(err => {
                    if (err.name !== 'NavigationDuplicated') {
                        throw err;
                    }
                })
                if (res.ok){
                    const data = await res.json()
                    this.service_reqs_data=data
                    
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
                this.service_reqs_data=null
            }

        }

    },
}
