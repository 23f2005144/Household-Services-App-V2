import ProfileForm from "../components/ProfileForm.js";
import ServiceReqTable from "../components/ServiceReqTable.js";

export default{
    template:`
    <div>
        <p class="mb-0 text-center fs-1" style="color:teal;font-weight:bold;">Welcome to Professional Dashboard</p>
        <div class="container">
            <div class="row">
                <p class="text-end link-info link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover" style="font-size:25px; font-weight: bold;" @click="ShowProfile">View Profile</p>
                <div v-if="show_profile">
                    <ProfileForm :pro_profile_data="profile_data" @HideProProfile="HideProfile"/>
                </div>
            </div>
            <div class="row" v-if="service_req_acc_data && !show_profile">           
                <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Accepted Service</p>
                <table class="table table-hover table-bordered border-primary">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service Name</th>
                            <th>Service Price</th>
                            <th>Customer Name</th>
                            <th>Contact Number</th>
                            <th>Service Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><button type="button" class="btn btn-primary" @click="serv_req_details_pro_show(service_req_acc_data.serv_req_id)">{{service_req_acc_data.serv_req_id}}</button></td>
                            <td>{{service_req_acc_data.serv_name}}</td>
                            <td>{{service_req_acc_data.serv_price}}</td>
                            <td>{{service_req_acc_data.cust_name}}</td>
                            <td>{{service_req_acc_data.cust_contact_no}}</td>
                            <td>{{service_req_acc_data.cust_address}} {{service_req_acc_data.cust_pincode}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row" v-show="new_service_reqs_pro_data && !show_profile">
                <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Service Requests</p>
                <table class="table table-hover table-bordered border-primary">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Service Name</th>
                            <th>Service Price</th>
                            <th>Customer Name</th>
                            <th>Service Location</th>
                            <th>Request Date & Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sr in new_service_reqs_pro_data" :key="sr.serv_req_id">
                            <td><button type="button" class="btn btn-primary" @click="serv_req_details_pro_show(sr.serv_req_id)">{{sr.serv_req_id}}</button></td>
                            <td>{{sr.serv_name}}</td>
                            <td>{{sr.serv_price}}</td>
                            <td>{{sr.cust_name}}</td>
                            <td>{{sr.cust_address}} {{sr.cust_pincode}}</td>
                            <td>{{sr.serv_request_datetime}}</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button type="button" @click="ServiceAccept(sr.serv_req_id)" class="btn btn-lg btn-success">Accept Service</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row" v-show="!show_profile">
                <ServiceReqTable :service_reqs_data='service_reqs_data' @Serv_Req_Details_Pro="serv_req_details_pro_show"/>
            </div>
            <div v-if="service_req_detail_record" class="modal fade show" id="ServReqModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
                <div class="modal-content">
                    <div class="modal-header" >
                        <h1 class="modal-title fs-5">Service History Details</h1>
                        <button type="button" class="btn-close" @click="serv_req_details_pro_close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Service Type</th>
                                    <th>Service Name</th>
                                    <th>Service Price ₹</th>
                                    <th>Service Duration (hrs)</th>
                                    <th>Customer Name</th>
                                    <th>Customer Contact Number</th>
                                    <th>Service Location</th>
                                    <th>Request Date & Time</th>
                                    <th>Completion Date & Time</th>
                                    <th>Service Status</th>
                                    <th>Service Remarks</th>
                                    <th>Service Rating</th>
                                    <th>My Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{service_req_detail_record.serv_req_id}}</td>
                                    <td>{{service_req_detail_record.serv_type}}</td>
                                    <td>{{service_req_detail_record.serv_name}}</td>
                                    <td>{{service_req_detail_record.serv_price}}</td>
                                    <td>{{service_req_detail_record.serv_duration}}</td>
                                    <td>{{service_req_detail_record.cust_name}}</td>
                                    <td>{{service_req_detail_record.cust_contact_no}}</td>
                                    <td>{{service_req_detail_record.cust_address}} {{service_req_detail_record.cust_pincode}}</td>
                                    <td>{{service_req_detail_record.serv_request_datetime}}</td>
                                    <td>{{service_req_detail_record.serv_close_datetime}}</td>
                                    <td>{{service_req_detail_record.serv_status}}</td>
                                    <td>{{service_req_detail_record.serv_remarks}}</td>
                                    <td>{{service_req_detail_record.serv_rating}}</td>
                                    <td>{{service_req_detail_record.pro_rating}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-lg btn-danger" @click="serv_req_details_pro_close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    async mounted(){
        await this.ServiceReqsDataFetch()
        await this.ServiceReqsProDataFetch()
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
            show_profile:false,
            service_reqs_data:[],
            service_req_acc_data:null,
            new_service_reqs_pro_data:[],
            service_req_detail_record:null,
            profile_data:[]
        }
    },
    methods:{
        async ServiceReqsDataFetch(){
            try{
                const QueryParams = new URLSearchParams({p_id:this.$store.state.p_id}).toString()
                const res = await fetch(`${location.origin}/api/service_request?${QueryParams}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const data = await res.json()
                    this.service_reqs_data=data
                    this.service_req_acc_data=this.service_reqs_data.find(sr=> sr.serv_status==='Accepted')
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        },
        async ServiceReqsProDataFetch(){
            try{
                const QueryParams = new URLSearchParams({pro_new_req:this.$store.state.p_id}).toString()
                const res = await fetch(`${location.origin}/api/service_request?${QueryParams}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const data = await res.json()
                    this.new_service_reqs_pro_data=data
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        },
        serv_req_details_pro_show(serv_req_id){
            this.service_req_detail_record=this.service_reqs_data.find(sr=> sr.serv_req_id===serv_req_id) || this.new_service_reqs_pro_data.find(sr=> sr.serv_req_id===serv_req_id)
        },
        serv_req_details_pro_close(){
            this.service_req_detail_record=null
        },
        async ShowProfile(){
            try{
                const res = await fetch(`${location.origin}/api/professional/${this.$store.state.p_id}`,
                    {
                        headers:{
                            'Authentication-Token' : this.$store.state.auth_token
                        }
                    })
                    if(res.ok){
                        const data = await res.json()
                        this.profile_data=data
                        this.show_profile=true

                    }else{
                        const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        },
        async HideProfile(){
            this.show_profile=false
            await this.ServiceReqsProDataFetch()  
        },
        async ServiceAccept(serv_req_id){
            try{
                const res = await fetch(`${location.origin}/api/service_request/${serv_req_id}`,{
                    method:'PATCH',
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"pro_id":this.$store.state.p_id})
                })
                if(res.ok){
                    console.log("Service Accepted")
                    alert("Service Accepted")
                    this.new_service_reqs_pro_data=null
                    await this.ServiceReqsDataFetch()
                    await this.ServiceReqsProDataFetch()
                    
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        }
    },
    components:{
        ProfileForm,
        ServiceReqTable
    }

}