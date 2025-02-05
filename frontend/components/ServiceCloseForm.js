export default{
    props:{
        serv_req_close_data : Object
    },
    template:`
    <div>
        <div class="container">
            <p class="mb-0 text-center" style="color:teal; font-size:44px; font-weight:bold;">Service Remarks</p>
            <form @submit.prevent="serv_req_close" id="remark-form">
                <div class="row fs-5">
                    <div class="my-3 col-md-3">
                        <label for="name" class="form-label">Service Name</label>
                        <input type="text" class="form-control" id="service_name" name="service_name" v-model="serv_req_close_data.serv_name" disabled>
                    </div>
                    <div class="my-3 col-md-3">
                        <label for="name" class="form-label">Service Type</label>
                        <input type="text" class="form-control" id="service_type" name="service_type" v-model="serv_req_close_data.serv_type" disabled>
                    </div>
                    <div class="my-3 col-md-3">
                        <label for="name" class="form-label">Service Price ₹</label>
                        <input type="text" class="form-control" name="service_price" v-model="serv_req_close_data.serv_price" disabled>
                    </div>
                    <div class="my-3 col-md-3">
                        <label for="name" class="form-label">Service Duration (hrs)</label>
                        <input type="text" class="form-control" id="service_duration" name="service_duration" v-model="serv_req_close_data.serv_duration" disabled>
                    </div>
                </div>
                <div class="row fs-5">
                    <div class="my-3 col-md-3">
                        <label for="name" class="form-label">DateTime_of_Request</label>
                        <input type="text" class="form-control" id="service_dor" name="service_dor" v-model="serv_req_close_data.serv_request_datetime" disabled>
                    </div>
                    <!--<div class="my-3 col-md-3">
                        <label for="name" class="form-label">Date of Completion</label>
                        <input type="text" class="form-control" id="service_doc" name="service_doc" value="{{x[6]}}" disabled>
                    </div>-->
                    <div class="my-3 col-md-3">
                        <label for="name" class="form-label">Professional Name</label>
                        <input type="text" class="form-control" name="service_pro_name" v-model="serv_req_close_data.pro_name"  disabled>
                    </div>
                    <div class="my-3 col-md-3">
                        <label for="name" class="form-label">Professional Contact No</label>
                        <input type="text" class="form-control" id="service_pro_contact_no" name="service_pro_contact_no" v-model="serv_req_close_data.pro_contact_no" disabled>
                    </div>
                </div><br>
                <div class="row">
                    <div class="my-3 col-md-6">
                        <h1 class="display-6 text-center">Rate the Service</h1><br>
                        <div class="fs-4 text-center">
                            <div class="form-check form-check-inline" v-for="s_rate in [1,2,3,4,5]">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" :value="s_rate" v-model="serv_req_close_data.serv_rating" required>
                                <label class="form-check-label">{{s_rate}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="my-3 col-md-6">
                        <h1 class="display-6 text-center">Rate the Professional</h1><br>
                        <div class="fs-4 text-center">
                            <div class="form-check form-check-inline" v-for="p_rate in [1,2,3,4,5]">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions_pro" :value="p_rate" v-model="serv_req_close_data.pro_rating" required>
                                <label class="form-check-label">{{p_rate}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="fs-4 text-center col-md-6" style="margin: auto;">
                        <label for="service_desc" class="form-label">Service Review (if any)</label>
                        <input type="text" class="form-control p-4" id="service_rev" name="service_rev" v-model="serv_req_close_data.serv_remarks"><br>
                        <button type="submit" class="btn btn-lg btn-success p-3 col-md-4" id="btn-submit">Close Service</button>
                        <button type="button" class="btn btn-lg btn-danger p-3 col-md-4" @click="$emit('Serv_Req_Closed')">Go back</button>
                    </div>
                </div><br>
            </form>
        </div>
    </div>
    `,
    async mounted(){
        this.style = document.createElement('style')
        this.style.innerHTML=`
            #remark-form{
                border: 10px solid lightseagreen;
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
        }
    },
    methods:{
        async serv_req_close(){
            const now = new Date();
            const current_datetime = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0') + " " +
            String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0')
            try{
                const res = await fetch(`${location.origin}/api/service_request/${this.serv_req_close_data.serv_req_id}`,{
                    method: "PUT",
                    headers: {
                        'Authentication-Token': this.$store.state.auth_token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...this.serv_req_close_data,'req_method':'Closed','serv_close_datetime':current_datetime})
                })
                if(res.ok){
                    const data = await res.json()
                    console.log(data.Message)
                    $emit('Serv_Req_Closed')

                }else{
                    const errormessage = await res.json()
                    throw new Error(errormessage.Message)
                }
            }catch(error){
                console.log(error)
            }
        },
    }
}