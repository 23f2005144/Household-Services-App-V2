import ServiceTable from "../components/ServiceTable.js"
import ProTable from "../components/ProTable.js"
import ServiceReqTable from "../components/ServiceReqTable.js"
export default{
    template:`
    <div>
        <p class="mb-0 text-center fs-1" style="color:teal;font-weight:bold;">Welcome to Admin Dashboard</p>
        <div class="row">
            <ServiceTable :services="services" @Service_Deleted="serv_deleted" @Service_Details="serv_details_show" @Service_Updated="serv_update" @Service_Created="ServiceDataFetch" @ServiceForm="ServiceFormVisible"/><br>
        </div>
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
                                    <th>Average Rating</th>
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
                                <td>{{service_detail_record.serv_avg_rating}}</td>
                                <td>{{service_detail_record.serv_desc}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-lg btn-danger" @click="serv_details_close">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" v-show="!serv_form">
            <ProTable :new_pro_data="new_pro_data" @Pro_Approved="pro_approved" @Pro_Details="pro_details_show" @Pro_Rejected="pro_rejected"/>
        </div>
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
                                    <th>Average Rating</th>
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
                                    <td>{{new_pro_detail_record.p_avg_rating}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-lg btn-danger" @click="pro_details_close">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row-6 text-end" v-show="!serv_form">
            <button class="btn btn-lg btn-dark col-2 pt-2 text-center" @click="CreateCSV">+ Get ServiceRequest Data</button>
        </div>
        <div class="row" v-show="!serv_form">
            <ServiceReqTable :service_reqs_data="service_reqs_data" @Serv_Req_Details="serv_req_details_show" @Serv_Details="serv_details_show" @Pro_Details="pro_details_show" />
        </div>
        <div v-if="service_req_detail_record" class="modal fade show" id="ServReqModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
            <div class="modal-dialog modal-xl" style="max-width: 90%;">
                <div class="modal-content">
                    <div class="modal-header" >
                        <h1 class="modal-title fs-5">Service Request Details</h1>
                        <button type="button" class="btn-close" @click="serv_req_details_close" aria-label="Close"></button>
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
                                    <td>
                                        <div v-if="service_req_detail_record.pro_id">
                                            {{service_req_detail_record.pro_id}}
                                        </div>
                                        <div v-else>
                                            <p>Null</p>
                                        </div>
                                    </td>
                                    <td>{{service_req_detail_record.serv_request_datetime}}</td>
                                    <td>{{service_req_detail_record.serv_close_datetime}}</td>
                                    <td>{{service_req_detail_record.serv_remarks}}</td>
                                    <td>
                                        <div v-if="service_req_detail_record.serv_rating">
                                            {{service_req_detail_record.serv_rating}}
                                        </div>
                                        <div v-else>
                                            <p>Null</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div v-if="service_req_detail_record.pro_rating">
                                            {{service_req_detail_record.pro_rating}}
                                        </div>
                                        <div v-else>
                                            <p>Null</p>
                                        </div>
                                    </td>
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
            service_req_detail_record:null,
            serv_form:false
            
        }
    },
    methods:{
        async ServiceDataFetch(){
            try{
                const res = await fetch(location.origin+'/api/service')
                if(res.ok){
                    const data = await res.json()
                    this.services=data
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        },
        async NewProDataFetch(){
            try{
                const res = await fetch(location.origin+'/api/professional',{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const new_pro_data_all= await res.json()
                    this.new_pro_data=new_pro_data_all.filter(pro=> pro.p_status===false)
                    
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }

        },
        async ServiceReqsDataFetch(){
            try{
                const res = await fetch(location.origin+'/api/service_request',{
                    headers:{
                        'Authentication-Token': this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const data= await res.json()
                    this.service_reqs_data=data;
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        },

        async serv_deleted(service_id){
            this.services = this.services.filter(service => service.serv_id !== service_id)
            await this.ServiceReqsDataFetch()
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
        async pro_details_show(p_id){
            try{
                const res = await fetch(`${location.origin}/api/professional/${p_id}`,{
                    headers:{ 
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const pro_data= await res.json()
                    this.new_pro_detail_record=pro_data
                    
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        },
        pro_details_close(){
            this.new_pro_detail_record=null
        },
        serv_req_details_show(serv_req_id){
            this.service_req_detail_record=this.service_reqs_data.find(sr=> sr.serv_req_id===serv_req_id)
        },
        serv_req_details_close(){
            this.service_req_detail_record=null
        },
        ServiceFormVisible(){
            if(this.serv_form){
                this.serv_form=false
            }else{
                this.serv_form=true
            }
        },
        async CreateCSV(){
            try{
                const res = await fetch(location.origin+'/create-csv',{
                    headers:{
                        'Authentication-Token' : this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const task_id = (await res.json()).task_id

                    const interval = setInterval(async()=>{
                        const res = await fetch(`${location.origin}/get-csv/${task_id}`)
                        if(res.ok){
                            console.log("CSV created successfully")
                            window.open(`${location.origin}/get-csv/${task_id}`)
                            clearInterval(interval)
                        }else if (res.status===405){
                            console.log("Task not ready yet")
                        }else{
                            clearInterval(interval)
                            const { Message } = await res.json() 
                            console.log(Message)
                            alert(Message)  
                        }
                    }, 100)
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
        ServiceTable,
        ProTable,
        ServiceReqTable
    },
}
