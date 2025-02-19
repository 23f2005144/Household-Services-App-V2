export default{
    template:`
    <div>
        <div v-if="this.$store.state.role==='Admin'">
            <div class="container">
                <h2 class="mb-0 text-center fs-1" style="color:teal; font-weight:bold;">Overall Service Statuses & Ratings Overview</h2><br><br>
                <div class="row">
                    <div class="col-6">
                        <canvas id="DoughnutChartAdmin"></canvas>
                    </div>
                    <div class="col-6">
                        <canvas id="BarChartAdmin"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="this.$store.state.role==='Customer'">
            <div class="container">
                <h2 class="mb-0 text-center fs-1" style="color:teal; font-weight:bold;">Your Service Statuses & Feedback Overview</h2><br><br>
                <div class="row">
                    <div class="col-6">
                        <canvas id="DoughnutChartCust"></canvas>
                    </div>
                    <div class="col-6">
                        <canvas id="BarChartCust"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="container">
                <h2 class="mb-0 text-center fs-1" style="color:teal; font-weight:bold;">Your Service Performance Overview</h2><br><br>
                <div class="row">
                    <div class="col-6">
                        <canvas id="DoughnutChartPro"></canvas>
                    </div>
                    <div class="col-6">
                        <canvas id="BarChartPro"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    `,
    async mounted(){
        if (this.$store.state.role==='Admin'){
            await this.AdminSummaryDataFetch()

        }else if (this.$store.state.role==='Customer'){
            await this.CustomerSummaryDataFetch()
        }else{
            await this.ProSummaryDataFetch()
        }
        this.style = document.createElement('style')
        this.style.innerHTML=`
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
            ServiceStatusLabels:["Requested","Accepted","Closed","Cancelled"],
            ServiceStatusData:[0,0,0,0],
            RatingLabels:["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
            ProRatingData:[0,0,0,0,0],
            ServRatingData:[0,0,0,0,0],
            barChart:null,
            doughnutChart:null,
            ProServiceStatusLabels:["Accepted","Closed","Cancelled"],
            ProServiceStatusData:[0,0,0]
            
        }
    },
    beforeDestroy() {
        this.ResetSummaryData();
    },
    methods:{
        ResetSummaryData(){
            this.ServiceStatusData=[0,0,0,0]
            this.ServRatingData=[0,0,0,0,0]
            this.ProRatingData=[0,0,0,0,0]
        },
        async ProSummaryDataFetch(){
            try{
                const QueryParams = new URLSearchParams({p_id:this.$store.state.p_id}).toString()
                const res = await fetch(`${location.origin}/api/service_request?${QueryParams}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const data = await res.json()
                    let accepted = 0, closed = 0, cancelled = 0
                    let rating1 = 0, rating2 = 0, rating3 = 0, rating4 = 0, rating5 = 0

                    for (let i = 0; i < data.length; i++) {
                        const sr=data[i]

                        if (sr.serv_status === "Accepted") accepted++
                        else if (sr.serv_status === "Closed") closed++
                        else if (sr.serv_status === "Cancelled") cancelled++

                        if (sr.pro_rating === 1) rating1++;
                        else if (sr.pro_rating === 2) rating2++
                        else if (sr.pro_rating === 3) rating3++
                        else if (sr.pro_rating === 4) rating4++
                        else if (sr.pro_rating === 5) rating5++
                    }
                    this.ProServiceStatusData=[accepted,closed,cancelled]
                    this.ProRatingData=[rating1,rating2,rating3,rating4,rating5]

                    this.$nextTick(() => {
                        this.CreateCharts()
                    })
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }    
        },
        async CustomerSummaryDataFetch(){
            try{
                const QueryParams = new URLSearchParams({c_id:this.$store.state.c_id}).toString()
                const res = await fetch(`${location.origin}/api/service_request?${QueryParams}`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const data = await res.json()
                    let requested = 0, accepted = 0, closed = 0, cancelled = 0
                    let servrating1 = 0, servrating2 = 0, servrating3 = 0, servrating4 = 0, servrating5 = 0
                    let prorating1=0, prorating2 = 0, prorating3 = 0, prorating4 = 0, prorating5 = 0

                    for (let i = 0; i < data.length; i++) {
                        const sr=data[i];

                        if (sr.serv_status === "Requested") requested++
                        else if (sr.serv_status === "Accepted") accepted++
                        else if (sr.serv_status === "Closed") closed++
                        else if (sr.serv_status === "Cancelled") cancelled++

                        if (sr.serv_rating === 1) servrating1++
                        else if (sr.serv_rating === 2) servrating2++
                        else if (sr.serv_rating === 3) servrating3++
                        else if (sr.serv_rating === 4) servrating4++
                        else if (sr.serv_rating === 5) servrating5++

                        if (sr.pro_rating === 1) prorating1++
                        else if (sr.pro_rating === 2) prorating2++
                        else if (sr.pro_rating === 3) prorating3++
                        else if (sr.pro_rating === 4) prorating4++
                        else if (sr.pro_rating === 5) prorating5++

                    }
                    this.ServiceStatusData=[requested,accepted,closed,cancelled]
                    this.ServRatingData=[servrating1,servrating2,servrating3,servrating4,servrating5]
                    this.ProRatingData=[prorating1,prorating2,prorating3,prorating4,prorating5]

                    this.$nextTick(() => {
                        this.CreateCharts()
                    })
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }  
        },
        async AdminSummaryDataFetch(){
            try{
                const res = await fetch(`${location.origin}/api/service_request`,{
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if(res.ok){
                    const data = await res.json()
                    let requested = 0, accepted = 0, closed = 0, cancelled = 0
                    let rating1 = 0, rating2 = 0, rating3 = 0, rating4 = 0, rating5 = 0

                    for (let i = 0; i < data.length; i++) {
                        const sr=data[i]

                        if (sr.serv_status === "Requested") requested++
                        else if (sr.serv_status === "Accepted") accepted++
                        else if (sr.serv_status === "Closed") closed++
                        else if (sr.serv_status === "Cancelled") cancelled++

                        if (sr.serv_rating === 1) rating1++;
                        else if (sr.serv_rating === 2) rating2++
                        else if (sr.serv_rating === 3) rating3++
                        else if (sr.serv_rating === 4) rating4++
                        else if (sr.serv_rating === 5) rating5++
                    }
                    this.ServiceStatusData=[requested,accepted,closed,cancelled]
                    this.ServRatingData=[rating1,rating2,rating3,rating4,rating5]

                    this.$nextTick(() => {
                        this.CreateCharts()
                    })
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
            }    
        },
        CreateCharts(){
            if (this.$store.state.role==='Admin'){
                new Chart(document.getElementById("BarChartAdmin"), {
                    type: "bar",
                    data: {
                        labels: this.RatingLabels,
                        datasets: [{
                            data: this.ServRatingData,
                            backgroundColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(255, 205, 86)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)"
                            ],
                            hoverOffset: 4,
                            barPercentage: 0.7
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Overall Service Ratings",
                                font: { weight: "bold", size: 40 }
                            },
                            legend: { display: false }
                        }
                    },
                    scales:{
                        y: {
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            }
                        }
                    }
                })
        
                new Chart(document.getElementById("DoughnutChartAdmin"), {
                    type: "doughnut",
                    data: {
                        labels: this.ServiceStatusLabels,
                        datasets: [{
                            data: this.ServiceStatusData,
                            backgroundColor: [

                                "rgb(124, 219, 251)",
                                "rgb(255, 206, 86)",
                                "rgb(48, 150, 74)",
                                "rgb(255, 99, 132)"
                                
                            ],
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        radius: "80%",
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Overall Service Statuses",
                                font: { weight: "bold", size: 40 }
                            },
                            legend: { position: "bottom" }
                        }
                    }
                })
            }else if(this.$store.state.role==='Customer'){
                new Chart(document.getElementById("BarChartCust"), {
                    type: "bar",
                    data: {
                        labels: this.RatingLabels,
                        datasets: [{
                            label: "Professional Ratings", 
                            data: this.ProRatingData,
                            backgroundColor: [
                                "rgb(255, 99, 132)",
                                "rgb(54, 162, 235)",
                                "rgb(75, 192, 192)",
                                "rgb(255, 159, 64)",
                                "rgb(153, 102, 255)",
                            ],
                            hoverOffset: 4,
                            barPercentage: 0.7
                        },{
                            label: "Service Ratings", 
                            data: this.ServRatingData,
                            backgroundColor: [
                                "rgb(255, 0, 0)",
                                "rgb(30, 144, 255)",
                                "rgb(34, 139, 34)",
                                "rgb(255, 105, 180)",
                                "rgb(138, 43, 226)"
                            ],
                            hoverOffset: 4,
                            barPercentage: 0.7
                        }]  
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Overall Service & Pro Ratings",
                                font: { weight: "bold", size: 40 }
                            },
                            legend: { display: false }
                        }
                    }
                })
                new Chart(document.getElementById("DoughnutChartCust"), {
                    type: "doughnut",
                    data: {
                        labels: this.ServiceStatusLabels,
                        datasets: [{
                            data: this.ServiceStatusData,
                            backgroundColor: [
                                "rgb(255, 215, 0)",
                                "rgb(135, 206, 235)",
                                "rgb(60, 179, 113)",
                                "rgb(255, 69, 0)"
                            ],
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        radius: "80%",
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Overall Service Statuses",
                                font: { weight: "bold", size: 40 }
                            },
                            legend: { position: "bottom" }
                        }
                    }
                })
            } else {
                new Chart(document.getElementById("BarChartPro"), {
                    type: "bar",
                    data: {
                        labels: this.RatingLabels,
                        datasets: [{
                            data: this.ProRatingData,
                            backgroundColor: [
                                "rgb(237, 166, 14)",
                                "rgb(54, 162, 235)",
                                "rgb(7, 252, 187)",
                                "rgb(42, 73, 252)",
                                "rgb(246, 126, 228)"
                            ],
                            hoverOffset: 4,
                            barPercentage: 0.7
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Your Service Ratings Overview",
                                font: { weight: "bold", size: 40 }
                            },
                            legend: { display: false }
                        }
                    },
                    scales:{
                        y: {
                            ticks: {
                                beginAtZero: true,
                                stepSize: 1
                            }
                        }
                    }
                })
        
                new Chart(document.getElementById("DoughnutChartPro"), {
                    type: "doughnut",
                    data: {
                        labels: this.ProServiceStatusLabels,
                        datasets: [{
                            data: this.ProServiceStatusData,
                            backgroundColor: [
                                "rgb(255, 206, 86)",
                                "rgb(48, 150, 74)",
                                "rgb(255, 99, 132)"
                                
                            ],
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        radius: "80%",
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: "Overall Service Statuses",
                                font: { weight: "bold", size: 40 }
                            },
                            legend: { position: "bottom" }
                        }
                    }
                })
            }
        }
    }
}