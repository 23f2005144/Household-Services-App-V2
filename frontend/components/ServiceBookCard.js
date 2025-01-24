export default{
    template:`
    <div>
        <div class="row">
            <div v-for="x in service_data" class="card w-25 my-2 text-center" style="padding:5px; margin:auto; border: 5px solid teal;">
                <div class="card-body">
                    <h5 class="card-title">{{x}} Services</h5>
                    <p class="card-text">All in One {{x}} Packages, Available Now!</p>
                    <button class="btn btn-success card-link" @click="$router.push('/customer/'+cust_id+'/service_book/'+serv_type)">Book Now</button>
                </div>
            </div>
        </div>
    </div>
    `,
    async mounted(){
        await this.ServiceDataFetch()
        this.style = document.createElement('style')
        this.style.innerHTML=`
            table{
                font-size: 18px;
            }
            body{
                background-color: lightgoldenrodyellow;  
            }
            .card-link {
                font-size: 25px;
            }
            .card-title {
                font-size: 25px;
            }
            .card-text{
                font-size: 20px;
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
            service_data:null
        }
    },
    methods:{
        async ServiceDataFetch(){
            try{
                const res = await fetch(`${location.origin}/api/service_type`)
                const data = await res.json()
                this.service_data=data.Service_Types //since it is a list
            }
            catch(error){
                console.log("Error",error)
            }
        }
    }
    
}