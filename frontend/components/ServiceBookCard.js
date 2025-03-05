export default{
    template:`
    <div>
        <div class="row">
            <div v-for="x in service_data" class="card w-25 my-2 text-center" style="padding:5px; margin:auto; border: 5px solid teal;">
                <div class="card-body">
                    <h5 class="card-title">{{x}} Services</h5>
                    <p class="card-text">All in One {{x}} Packages, Available Now!</p>
                    <button class="btn btn-success card-link" @click="$router.push('/customer/'+$store.state.user_id+'/service_book/'+x)">Book Now</button>
                </div>
            </div>
        </div>
    </div>
    `,
    async mounted(){
        await this.ServiceDataFetch()
        this.style = document.createElement('style')
        this.style.textContent=`
            table{
                font-size: 16px;
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
    beforeDestroy(){
        if (this.style) {
            document.head.removeChild(this.style)
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
                const QueryParams = new URLSearchParams({q:"service_types"}).toString()
                const res = await fetch(`${location.origin}/api/service?${QueryParams}`)
                if(res.ok){
                    const data = await res.json()
                    this.service_data=data.Service_Types
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }
        }
    }
    
}