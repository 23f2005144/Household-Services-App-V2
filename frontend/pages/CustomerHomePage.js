import ServiceBookCard from "../components/ServiceBookCard.js"
import ServiceReqTable from "../components/ServiceReqTable.js"
export default{
    template:`
    <div>
        <p class="mb-0" style="color:teal; font-size:30px; font-weight:bold;">Welcome to Customer Dashboard</p>
        <div class="container">
            <div class="row">
                <p class="text-end link-info link-offset-2 link-underline-opacity-100 link-underline-opacity-100-hover" style="font-size:25px; font-weight: bold;" @click='$router.push("/customer/profile"+cust_id)'>View Profile</p>
            </div>
            <div class="row">
                <ServiceBookCard/>
            </div>
            <div class="row">
                <ServiceReqTable :service_reqs_data='service_reqs_data' @Serv_Req_Details_Cust="serv_req_details_cust_show"/>
            </div>
            <div v-if="service_req_detail_record" class="modal fade show" id="ServReqModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header" >
                            <h1 class="modal-title fs-5">Service History Details</h1>
                            <button type="button" class="btn-close" @click="service_req_details_cust_close" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Service Type</th>
                                        <th>Service Name</th>
                                        <th>Service Price</th>
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
            service_req_detail_record:null
        }
    },
    methods:{
         async ServiceReqsDataFetch(){
            try{
                const res = await fetch(`${location.origin}/api/service_request_customer/${cust_id}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                const data = await res.json()
                this.service_reqs_data=data
            }
            catch(error){
                console.log("Error",error)
            }
        },
        serv_req_details_cust_show(serv_req_id){
            this.service_req_detail_record=this.service_reqs_data.find(sr=> sr.serv_req_id===serv_req_id)
        },
        serv_req_details_cust_close(){
            this.service_req_detail_record=null
        }

    },
    components:{
        ServiceBookCard,
        ServiceReqTable
    }
}