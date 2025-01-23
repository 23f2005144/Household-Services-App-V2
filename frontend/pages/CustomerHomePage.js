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
                <ServiceReqTable :service_reqs_data='service_reqs_data'/>
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
            service_reqs_data:null
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
        }

    },
    components:{
        ServiceBookCard,
        ServiceReqTable
    }
}