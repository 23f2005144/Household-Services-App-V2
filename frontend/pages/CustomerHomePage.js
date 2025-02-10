import ProfileForm from "../components/ProfileForm.js"
import ServiceBookCard from "../components/ServiceBookCard.js"
import ServiceReqTable from "../components/ServiceReqTable.js"
import ServiceCloseForm from "../components/ServiceCloseForm.js"

export default{
    template:`
    <div>
        <p class="mb-0 text-center fs-1" style="color:teal;font-weight:bold;">Welcome to Customer Dashboard</p>
        <div class="container">
            <div class="row">
                <p class="text-end link-info link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover" style="font-size:25px; font-weight: bold;" @click="ShowProfile">View Profile</p>
                <div v-if="show_profile">
                    <ProfileForm :cust_profile_data="profile_data" @HideCustProfile="HideProfile"/>
                </div>
            </div>
            <div class="row">
                <ServiceBookCard/>
            </div>
            <div class="row">
                <ServiceReqTable :service_reqs_data='service_reqs_data' @Serv_Req_Details_Cust="serv_req_details_cust_show" @Serv_Req_Cancel="serv_req_cancel" @Pro_Details="pro_details_show" @Serv_Req_Close="serv_req_close_form_show"/>
            </div>
            <div v-if="service_req_detail_record" class="modal fade show" id="ServReqModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
                <div class="modal-dialog modal-xl" style="max-width: 90%;">
                    <div class="modal-content">
                        <div class="modal-header" >
                            <h1 class="modal-title fs-5">Service History Details</h1>
                            <button type="button" class="btn-close" @click="serv_req_details_cust_close" aria-label="Close"></button>
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
                                        <th>Assigned Professional</th>
                                        <th>Contact Number</th>
                                        <th>Experience (yrs)</th>
                                        <th>DateTime_of_Request</th>
                                        <th>DateTime_of_Completion</th>
                                        <th>Service Status</th>
                                        <th>Service Remarks</th>
                                        <th>Service Rating</th>
                                        <th>Pro Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{service_req_detail_record.serv_req_id}}</td>
                                        <td>{{service_req_detail_record.serv_type}}</td>
                                        <td>{{service_req_detail_record.serv_name}}</td>
                                        <td>{{service_req_detail_record.serv_price}}</td>
                                        <td>{{service_req_detail_record.serv_duration}}</td>
                                        <td>{{service_req_detail_record.pro_name}}</td>
                                        <td>{{service_req_detail_record.pro_contact_no}}</td>
                                        <td>{{service_req_detail_record.pro_exp}}</td>
                                        <td>{{service_req_detail_record.serv_request_datetime}}</td>
                                        <td>{{service_req_detail_record.serv_close_datetime}}</td>
                                        <td>{{service_req_detail_record.serv_status}}</td>
                                        <td>{{service_req_detail_record.serv_remarks}}</td>
                                        <td>{{service_req_detail_record.serv_rating}}</td>
                                        <td>{{service_req_detail_record.pro_rating}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="button" class="btn btn-lg btn-danger" @click="serv_req_details_cust_close">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="pro_detail_record" class="modal fade show" id="ProModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Service Professional Profile</h1>
                            <button type="button" class="btn-close" @click="pro_details_close" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center">
                            <div class="mb-3">
                                <i class="bi bi-person-circle" style="font-size: 120px; color: gray;"></i>
                            </div>
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <th><i class="bi bi-hash"></i> Professional ID:</th>
                                        <td>#{{pro_detail_record.p_id}}</td>
                                    </tr>
                                    <tr>
                                        <th><i class="bi bi-person"></i> Name:</th>
                                        <td>{{pro_detail_record.p_name}}</td>
                                    </tr>
                                    <tr>
                                        <th><i class="bi bi-telephone"></i> Contact:</th>
                                        <td>{{pro_detail_record.p_contact_no}}</td>
                                    </tr>
                                    <tr>
                                        <th><i class="bi bi-geo-alt"></i> Serviceable Pincode:</th>
                                        <td>{{pro_detail_record.p_pincode}}</td>
                                    </tr>
                                    <tr>
                                        <th><i class="bi bi-tools"></i> Service Type:</th>
                                        <td>{{pro_detail_record.p_service_type}}</td>
                                    </tr>
                                    <tr>
                                        <th><i class="bi bi-briefcase"></i> Experience:</th>
                                        <td>{{pro_detail_record.p_exp}} Years</td>
                                    </tr>
                                    <tr>
                                        <th><i class="bi bi-star"></i> Avg. Rating:</th>
                                        <td>{{pro_detail_record.p_avg_rating}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="button" class="btn btn-lg btn-danger" @click="pro_details_close"><i class="bi bi-x-circle"></i> Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="serv_req_close_data">
                <ServiceCloseForm :serv_req_close_data='serv_req_close_data' @Serv_Req_Closed='serv_req_close_form_close'/>
            </div> 
        </div>  
    </div>
    
    `,
    async mounted(){
        await this.ServiceReqsDataFetch()
        this.style = document.createElement('style')
        this.style.innerHTML=`
            table{
                font-size: 18px;
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
            service_req_detail_record:null,
            show_profile:false,
            profile_data:null,
            pro_detail_record:null,
            serv_req_close_data:null,
        }
    },
    methods:{
         async ServiceReqsDataFetch(){
            try{
                const QueryParams = new URLSearchParams({c_id:this.$store.state.c_id}).toString()
                const res = await fetch(`${location.origin}/api/service_request?${QueryParams}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const data = await res.json()
                    this.service_reqs_data=data
                }else{
                    const errormessage = await res.json()
                    throw new Error(errormessage.Message)
                }
            }
            catch(error){
                console.log(error)
            }
        },
        serv_req_details_cust_show(serv_req_id){
            this.service_req_detail_record=this.service_reqs_data.find(sr=> sr.serv_req_id===serv_req_id)
        },
        serv_req_details_cust_close(){
            this.service_req_detail_record=null
        },
        async ShowProfile(){
            try{
                const res = await fetch(`${location.origin}/api/customer/${this.$store.state.c_id}`,
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
                        const errormessage= await res.json()
                        throw new Error(errormessage.message)
                    }
            }catch(error){
                console.log(error)
            }
        },
        HideProfile(){
            this.show_profile=false
        },
        async serv_req_cancel(serv_req_id){
            const serv_req_obj=this.service_reqs_data.find(s=> s.serv_req_id===serv_req_id)
            const now = new Date();
            const current_datetime = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0') + " " +
            String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0')
            try{
                const res = await fetch(`${location.origin}/api/service_request/${serv_req_id}`,{
                    method: "PUT",
                    headers: {
                        'Authentication-Token': this.$store.state.auth_token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...serv_req_obj,'req_method':'Cancelled','serv_close_datetime':current_datetime})
                })
                if(res.ok){
                    const data = await res.json()
                    console.log(data.Message)
                    await this.ServiceReqsDataFetch()

                }else{
                    const errormessage = await res.json()
                    throw new Error(errormessage.Message)
                }
            }catch(error){
                console.log(error)
            }
        },
        async pro_details_show(p_id){
            try{
                const res = await fetch(`${location.origin}/api/professional/${p_id}`,{
                    headers:{ 
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const pro_data= await res.json()
                    this.pro_detail_record=pro_data
                    
                }else{
                    const errormessage = await res.json()
                    throw new Error(errormessage.Message)
                }
            }
            catch(error){
                console.log(error)
            }
        },
        pro_details_close(){
            this.pro_detail_record=null
        },
        serv_req_close_form_show(serv_req_id){
            this.serv_req_close_data=this.service_reqs_data.find(s=> s.serv_req_id===serv_req_id)
        },
        async serv_req_close_form_close(){
            this.serv_req_close_data=null
            await this.ServiceReqsDataFetch()
        },
    },
    components:{
        ServiceBookCard,
        ServiceReqTable,
        ProfileForm,
        ServiceCloseForm
    }
}