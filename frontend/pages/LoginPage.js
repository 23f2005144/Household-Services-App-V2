export default{
    template:`
        <div>
            <div>
                <h1 class="Login-Title display-1 text-center">Abode Mantra:Your A-Z Cleaning Experts</h1>
                <hr style="border:9px dashed lightseagreen;">
                <p class="Login-subtitle text-center">Experience the Comfort and Satisfaction of a Perfectly Maintained Home</p><br>
            </div>
            <div class="container" id="login-form">
                <form @submit.prevent="LoginSubmit">
                    <p style="font-weight:bolder;font-size:40px;padding: 15px;">Welcome to the Login Page!</p>
                    <div class="mb-4">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" class="form-control" v-model="email" id="emailbox" required>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" v-model="password" id="passwordbox" required>
                    </div>
                    <button type="submit" class="btn btn-success btn-lg p-2 col-md-3" id="btn-login">Login</button>
                </form>
            </div>     
        </div>
    `,
    mounted() {
        const style=document.createElement('style')
        style.innerHTML=`
            #emailbox{
                border: 2px solid ;
                height: 35px;
                width: 300px;
                margin: auto;
            }

            #passwordbox{
                border: 2px solid ;
                height: 35px;
                width: 225px;
                margin:auto;  
            }

            #login-form{
                height: 400px;
                width: 800px;
                border: 10px solid teal;
                border-radius: 10px;
                text-align: center;
                background-color:lightgoldenrodyellow;
                font-size: 25px;
                margin: auto;
            }
            
            .Login-Title{
                background-color:lightgoldenrodyellow;
                font-style: italic;
                font-weight: bolder;
                padding: 20px;
                font-size: 80px;
                font-family:'Times New Roman', Times, serif;
                color:#00827f;
            }

            .Login-subtitle{
                background-color:lightgoldenrodyellow;
                font-style: italic;
                padding: 15px;
                font-size: 30px;
                font-weight: bolder;
                color:lightseagreen;
            }
            body{
                background-color:lightgoldenrodyellow;
            }`
        document.head.appendChild(style)
    },
    data(){
        return{
            email:null,
            password:null
        }
    },
    methods:{
        async LoginSubmit()
        {
            try{
                const res = await fetch(location.origin+'/login',
                {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({'email': this.email,'password': this.password})
                })
                if (res.ok){
                    console.log("Successfully Logged In!")
                    const data=await res.json()
                    
                    localStorage.setItem('user',JSON.stringify(data))

                    if(data.role==="Admin"){
                        this.$router.push('/admin')
                    }
                    
                    else if(data.role==="Customer"){
                        this.$router.push('/customer')
                    }
                    else{
                        this.$router.push('/pro')
                    }

                }
                else if (res.status===403){
                    console.log("Message",res.status,res.statusText)
                    alert("Current user is blocked/Not yet approved")
                }
          
            }
            catch (error){
                console.log("Error",error)

            }
        }
    }
}