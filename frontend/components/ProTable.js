export default{
    props:{
        new_pro_data:Array
    },
    template:`
    <div>
        <div class="container">
            <p class="mb-0" style="color:teal; font-size:35px; font-weight:bold;">New Service Professionals</p>
            <table class="table table-hover table-bordered border-primary">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Experience(yrs)</th>
                        <th>Service Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in new_pro_data" :key="p.p_id">
                        <td><button type="button" class="btn btn-primary" @click="pro_details_page(p.p_id)">{{p.p_id}}</button></td>
                        <td>{{p.p_name}}</td>
                        <td>{{p.p_email}}</td>
                        <td>{{p.p_exp}}</td>
                        <td>{{p.p_service_type}}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-lg btn-success" @click="ApprovePro(p.p_id)">Approve</button>
                                <button type="button" class="btn btn-lg btn-danger" @click="RejectPro(p.p_id)">Reject</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data(){
        return{
            new_pro_obj:null
        }
    },
    methods:{
        pro_details_page(p_id){
            this.$emit('Pro_Details',p_id)
        },
        async ApprovePro(p_id){
            this.new_pro_obj=this.new_pro_data.find(pro => pro.p_id === p_id)
            try{
                const res= await fetch(`${location.origin}/api/user/${this.new_pro_obj.user_p_id}`,{
                    method:"PATCH",
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token,
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({"user_status":this.new_pro_obj.p_status})
                })
                if(res.ok){
                    this.$emit('Pro_Approved')
                    alert("Professional Approved Successfully")
                    console.log("Professional Approved Successfully")
                    this.new_pro_obj=null
                }else{
                    const {Message} = await res.json()
                    throw new Error(Message)
                }
            }catch(error){
                console.log(error.message)
                alert(error.message)
            }
        },
        async RejectPro(p_id){
            this.new_pro_obj=this.new_pro_data.find(pro => pro.p_id === p_id)
            try{
                const res = await fetch(`${location.origin}/api/user/${this.new_pro_obj.user_p_id}`,{
                    method:'DELETE',
                    headers:{
                        'Authentication-Token':this.$store.state.auth_token
                    }
                })
                if (res.ok){
                    this.$emit('Pro_Rejected')
                    console.log('Professional Rejected Successfully')
                    alert("Professional Rejected Successfully")
                    this.new_pro_obj=null
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