import ServiceReqTable from "../components/ServiceReqTable.js"

export default{
    template:`
    <div>
        <div class="container">
            <div class="row my-5">
                <p class="mb-0" style="color:teal; font-size:40px; font-weight:bold;">Available {{this.$route.params.type}} Services</p>
                <table class="table table-hover table-bordered border-primary">
                    <thead>
                        <tr>
                            <th>Service Type</th>
                            <th>Service Name</th>
                            <th>Service Price ₹</th>
                            <th>Service Duration</th>
                            <th>Service Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="s in services_data">
                            <td>{{s.serv_type}}</td>
                            <td>{{s.serv_name}}</td>
                            <td>{{s.serv_price}}</td>
                            <td>{{s.serv_duration}}</td>
                            <td>{{s.serv_desc}}</td>
                            <td>
                                <div>
                                    <button type="button" class="btn btn-lg btn-primary" @click="ServiceInProgress(s.serv_id)">Book Now!</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="serv_book_record" class="modal fade show" id="ServiceBookModal" style="display: block; background-color: rgba(0, 0, 0, 0.5);" role="dialog">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header" >
                            <h1 class="modal-title fs-2">Service Details</h1>
                            <button type="button" class="btn-close" @click="booking_modal_close" aria-label="Close"></button>
                        </div>
                        <div class="modal-body fs-5">
                            <table class="table table-striped fs-5">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Name</th>
                                        <th>Price ₹</th>
                                        <th>Duration</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{serv_book_record.serv_type}}</td>
                                        <td>{{serv_book_record.serv_name}}</td>
                                        <td>{{serv_book_record.serv_price}}</td>
                                        <td>{{serv_book_record.serv_duration}}</td>
                                        <td>{{serv_book_record.serv_desc}}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="row">
                                <label for="datetimePicker" class="form-label" style="font-size:18px;font-weight:bold;">Choose your Date and Time for Service</label>
                                <input id="datetimePicker" class="form-control" v-model="service_slot" placeholder="Choose your slot" required>
                            </div><br>
                            <div class="row">
                                <div class="col-6 text-start">
                                    <button type="button" class="btn btn-lg btn-success" @click="ServBookSubmit">Book Now</button>
                                </div>
                                <div class="col-6 text-end">
                                    <button type="button" class="btn btn-lg btn-danger" @click="booking_modal_close">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <ServiceReqTable :service_reqs_data='service_reqs_data' @Serv_Req_Details_Cust="serv_req_details_cust_show" @Serv_Req_Cancel="serv_req_cancel"/>
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
        await this.ServiceDataTypeFetch()
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
            services_data:[],
            service_reqs_data:[],
            serv_book_record:null,
            service_slot:null,
            service_req_detail_record:null
        }
    },
    methods:{
        async ServiceReqsDataFetch(){
            try{
                const res = await fetch(`${location.origin}/api/service_request_customer/${this.$store.state.c_id}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const data = await res.json()
                    this.service_reqs_data=data
                }
            }
            catch(error){
                console.log("Error",error)
            }
        },
        async ServiceDataTypeFetch(){
            try{
                const res = await fetch(`${location.origin}/api/service/type/${this.$route.params.type}`,{
                    headers:{
                        'Authentication-Token': this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const d = await res.json()
                    this.services_data=JSON.parse(JSON.stringify(d))
                }
            }
            catch(error){
                console.log("Error",error)
            }
        },
        ServiceInProgress(serv_id){
            this.serv_book_record=this.services_data.find(s=> s.serv_id==serv_id)
            this.$nextTick(() => {
                this.initializeFlatpickr()
            })
        },
        initializeFlatpickr() {
            const now = new Date()
            const hour = now.getHours()
            let minDate = new Date(now)  
            let maxDate = new Date(now)
            maxDate.setDate(now.getDate() + 3)
            if (hour >= 20 || hour < 8) {
                minDate = new Date(now)
                minDate.setHours(8, 0, 0, 0)
                if (hour>=20) {
                    minDate.setDate(now.getDate() + 1)
                }else if(hour>=8){
                    let nextMin= now.getMinutes() < 30 ? "30" : "00"
                    let nextHour= now.getMinutes() < 30 ? hour : hour + 1
                    if(nextHour>= 20){
                        minDate.setDate(now.getDate() + 1)
                    } 
                    if(nextHour>= 20) {
                        minDate.setDate(now.getDate() + 1)
                        minTime = "08:00"
                    }else {
                        minTime = String(nextHour).padStart(2, '0') + ":" + String(nextMin).padStart(2, '0')
                    }
                }
            }
            const dt = document.getElementById("datetimePicker")
            flatpickr(dt, {
              enableTime: true,               // time selection
              dateFormat: "d-m-Y H:i",        // Date and time format
              minDate,                        // Start from today
              maxDate,                        // Up to 3 days from today
              minTime: "08:00",               // Start time
              maxTime: "20:00",               // End time
              time_24hr: true,               // 12-hour clock
              minuteIncrement: 30,
              onChange: (selectedDates) => {
                this.service_slot = selectedDates[0]; // Update selected date
              },
            })
        },
        async ServBookSubmit(){
            if(this.service_slot!==null){
                try{
                    const res = await fetch(`${location.origin}/api/service_request`,
                    {
                        method: 'POST',
                        headers: {'Authentication-Token':this.$store.state.auth_token,'Content-Type':'application/json'},
                        body: JSON.stringify({"serv_id":this.serv_book_record.serv_id, "cust_id":this.$store.state.c_id, "serv_request_datetime":this.service_slot})
                                        
                    })
                    if (res.ok){
                        const data = await res.json()
                        await this.ServiceReqsDataFetch()
                        console.log(data.Message)
                        alert("Service Booked!")
                        this.serv_book_record=null
                        this.$router.push(`/customer/home/${this.$store.state.user_id}`)

                    }else{
                        const errormess = await res.json()
                        throw new Error(errormess.Message)
                    }
                } 
                catch(error){
                    alert(error)
                    this.$router.push(`/customer/home/${this.$store.state.user_id}`)

                }
            }else{
                alert("Please choose a slot")
            }
        },
        booking_modal_close(){
            this.serv_book_record=null
        },
        serv_req_details_cust_show(serv_req_id){
            this.service_req_detail_record=this.service_reqs_data.find(sr=> sr.serv_req_id===serv_req_id)
        },
        serv_req_details_cust_close(){
            this.service_req_detail_record=null
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
       }


    },
    components:{
        ServiceReqTable
    }
    
}