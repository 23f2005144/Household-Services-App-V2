import ServiceTable from "../components/ServiceTable.js"
import ProTable from "../components/ProTable.js"
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
                                <td>{{service_detail_record.service_id}}</td>
                                <td>{{service_detail_record.service_type}}</td>
                                <td>{{service_detail_record.service_name}}</td>
                                <td>{{service_detail_record.service_price}}</td>
                                <td>{{service_detail_record.service_duration}}</td>
                                <td>{{service_detail_record.service_desc}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <button type="button" class="btn btn-lg btn-danger" @click="serv_details_close">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <ProTable :new_pro_data="new_pro_data" @Pro_Details="pro_details_show"/>
            <!--<div class="row my-3">
                <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">Service Requests</p>
                <table class="table table-hover table-bordered border-primary">
                    <thead>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Assigned Professional</th>
                        <th>Date of Request</th>
                        <th>Status</th>
                    </thead>
                    {% for z in serv_reqs %}
                        <tr>
                            <td><a href="/admin/service_req/{{z[0]}}">{{z[0]}}</a></td>
                            <td>{{z[1]}}</td>
                            <td>{{z[2]}}</td>
                            <td>{{z[4]}}</td>
                            <td>{{z[5]}}</td>
                        </tr>
                    {% endfor %}
                </table>
            </div>-->
    </div>
    `,
    async mounted(){
        await this.ServiceDataFetch()
        await this.NewProDataFetch()
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
                this.services= await res.json()
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
                this.new_pro_data= await res.json()
            }
            catch(error){
                console.log("Error",error)
            }

        },
        serv_deleted(service_id){
            this.services = this.services.filter(service => service.service_id !== service_id)
        },
        serv_details_show(service_id){
            this.service_detail_record = this.services.find(service => service.service_id === service_id)
        },
        serv_details_close(){
            this.service_detail_record=null
        },
        serv_update(service_update_obj){
            const index = this.services.findIndex(service => service.service_id === service_update_obj.service_id);
            if (index !== -1) {
                this.$set(this.services, index, service_update_obj);
            }
        },
        pro_details_show(p_id){
            this.new_pro_detail_record=this.new_pro_data.find(pro=> pro.p_id===p_id)
        },
    },
    components:{
        ServiceTable
    },
}
