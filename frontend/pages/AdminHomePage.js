import ServiceTable from "../components/ServiceTable.js"
import ProTable from "../components/ProTable.js"
import ServiceReqTable from "../components/ServiceReqTable.js"
export default{
    template:`
    <div>
        <ServiceTable :services="services" @Service_Deleted="serv_deleted" @Service_Details="serv_details_show" @Service_Updated="serv_update" @Service_Created="ServiceDataFetch"/>
        <div v-if="service_detail_record" class="modal fade show" id="ServiceModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" >
                        <h1 class="modal-title fs-5">Service Details</h1>
                        <button type="button" class="btn-close" @click="serv_details_close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Price ₹</th>
                                    <th>Duration</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{service_detail_record.serv_id}}</td>
                                <td>{{service_detail_record.serv_type}}</td>
                                <td>{{service_detail_record.serv_name}}</td>
                                <td>{{service_detail_record.serv_price}}</td>
                                <td>{{service_detail_record.serv_duration}}</td>
                                <td>{{service_detail_record.serv_desc}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-lg btn-danger" @click="serv_details_close">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <ProTable :new_pro_data="new_pro_data" @Pro_Approved="pro_approved" @Pro_Details="pro_details_show" @Pro_Rejected="pro_rejected"/>
        <div v-if="new_pro_detail_record" class="modal fade show" id="ProModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header" >
                        <h1 class="modal-title fs-5">New Professional Details</h1>
                        <button type="button" class="btn-close" @click="pro_details_close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>UserID</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Contact_No</th>
                                    <th>Service_Type</th>
                                    <th>Experience(yrs)</th>
                                    <th>Serviceable_Pincode</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{new_pro_detail_record.p_id}}</td>
                                    <td>{{new_pro_detail_record.user_p_id}}</td>
                                    <td>{{new_pro_detail_record.p_email}}</td>
                                    <td>{{new_pro_detail_record.p_name}}</td>
                                    <td>{{new_pro_detail_record.p_contact_no}}</td>
                                    <td>{{new_pro_detail_record.p_service_type}}</td>
                                    <td>{{new_pro_detail_record.p_exp}}</td>
                                    <td>{{new_pro_detail_record.p_pincode}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-lg btn-danger" @click="pro_details_close">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <ServiceReqTable :service_reqs_data="service_reqs_data" @Serv_Req_Details="serv_req_details_show" @Serv_Details="serv_details_show" @Pro_Details="pro_details_show" />
        <div v-if="service_req_detail_record" class="modal fade show" id="ServReqModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header" >
                        <h1 class="modal-title fs-5">Service Request Details</h1>
                        <button type="button" class="btn-close" @click="service_req_details_close" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>    
                                    <th>ID</th>
                                    <th>Service ID</th>
                                    <th>Customer ID</th>
                                    <th>Customer Name</th>
                                    <th>Customer Pincode</th>
                                    <th>Service Status</th>
                                    <th>Pro ID</th>
                                    <th>DateTime_of_Request</th>
                                    <th>DateTime_of_Completion</th>
                                    <th>Service Remarks</th>
                                    <th>Service Rating</th>
                                    <th>Pro Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{service_req_detail_record.serv_req_id}}</td>
                                    <td>{{service_req_detail_record.serv_id}}</td>
                                    <td>{{service_req_detail_record.cust_id}}</td>
                                    <td>{{service_req_detail_record.cust_name}}</td>
                                    <td>{{service_req_detail_record.cust_pincode}}</td>
                                    <td>{{service_req_detail_record.serv_status}}</td>
                                    <td>{{service_req_detail_record.pro_id}}</td>
                                    <td>{{service_req_detail_record.serv_request_datetime}}</td>
                                    <td>{{service_req_detail_record.serv_close_datetime}}</td>
                                    <td>{{service_req_detail_record.serv_remarks}}</td>
                                    <td>{{service_req_detail_record.serv_rating}}</td>
                                    <td>{{service_req_detail_record.pro_rating}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-lg btn-danger" @click="serv_req_details_close">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    async mounted(){
        await this.ServiceDataFetch()
        await this.NewProDataFetch()
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
            service_detail_record:null,
            services:[],
            new_pro_data:[],
            new_pro_detail_record:null,
            service_reqs_data:[],
            service_req_detail_record:null
            
        }
    },
    methods:{
        async ServiceDataFetch(){
            try{
                const res = await fetch(location.origin+'/api/service',{
                    headers:{
                        'Authentication-Token': this.$store.state.auth_token
                    }
                })
                const data = await res.json()
                if(typeof data !=="Array"){
                    this.services=data
                }
            }
            catch(error){
                console.log("Error",error)
            }
        },
        async NewProDataFetch(){
            try{
                const res = await fetch(location.origin+'/api/professional',{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                const new_pro_data_all= await res.json()
                if( typeof new_pro_data_all!=="object" ){ //since if no record, then api gives object and not list
                    this.new_pro_data=this.new_pro_data_all.filter(pro=> pro.p_status===false)
                }
            }
            catch(error){
                console.log("Error",error)
            }

        },
        async ServiceReqsDataFetch(){
            try{
                const res = await fetch(location.origin+'/api/service_request',{
                    headers:{
                        'Authentication-Token': this.$store.state.auth_token
                    }
                })
                
                const data= await res.json()
                if( typeof data!=="object"){
                    this.service_reqs_data=data;
                }
            }
            catch(error){
                console.log("Error",error)
            }
        },

        serv_deleted(service_id){
            this.services = this.services.filter(service => service.serv_id !== service_id)
        },
        serv_details_show(service_id){
            this.service_detail_record = this.services.find(service => service.serv_id === service_id)
        },
        serv_details_close(){
            this.service_detail_record=null
        },
        serv_update(service_update_obj){
            const index = this.services.findIndex(service => service.serv_id === service_update_obj.serv_id);
            if (index !== -1) {
                this.$set(this.services, index, service_update_obj);
            }
        },
        pro_approved(p_id){
            this.new_pro_data=this.new_pro_data.filter(pro => pro.p_id !== p_id)
        },
        pro_rejected(p_id){
            this.new_pro_data=this.new_pro_data.filter(pro => pro.p_id !== p_id)
        },
        pro_details_show(p_id){
            this.new_pro_detail_record=this.new_pro_data.find(pro=> pro.p_id===p_id)
        },
        pro_details_close(){
            this.new_pro_detail_record=null
        },
        serv_req_details_show(serv_req_id){
            this.service_req_detail_record=this.service_reqs_data.find(sr=> sr.serv_req_id===serv_req_id)
        },
        serv_req_details_close(){
            this.service_req_detail_record=null
        }
    },
    components:{
        ServiceTable,
        ProTable,
        ServiceReqTable
    },
}
