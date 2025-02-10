export default{
    template:`
    <!--<div>
        <router-link v-if="!$store.state.LoggedIn" to='/' class="btn btn-lg btn-info">Home</router-link>
        <router-link v-if="!$store.state.LoggedIn" to='/login' class="btn btn-lg btn-primary">Login</router-link>
        <router-link v-if="!$store.state.LoggedIn" to='/register/Customer'class="btn btn-lg btn-success">New Customer? Register Now!</router-link>
        <router-link v-if="!$store.state.LoggedIn" to='/register/Professional'class="btn btn-lg btn-warning">Service Professionals Register Here!</router-link>
        
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/home' class="btn btn-lg btn-primary">Home</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/search' class="btn btn-lg btn-warning">Search</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/summary' class="btn btn-lg btn-success">Summary</router-link>

        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="{name:'CustomerHome',params:{user_id:$store.state.user_id}}" class="btn btn-lg btn-primary">Home</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="{name:'CustomerSearch',params:{user_id:$store.state.user_id}}" class="btn btn-lg btn-warning">Search</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="{name:'CustomerSummary',params:{user_id:$store.state.user_id}}" class="btn btn-lg btn-success">Summary</router-link>

        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="{name:'ProHome',params:{user_id:$store.state.user_id}}" class="btn btn-lg btn-primary">Home</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="{name:'ProSearch',params:{user_id:$store.state.user_id}}" class="btn btn-lg btn-warning">Search</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="{name:'ProSummary',params:{user_id:$store.state.user_id,}}" class="btn btn-lg btn-success">Summary</router-link>

        <button v-if="$store.state.LoggedIn" class="btn btn-lg btn-danger" @click="logout">Logout</button>
    </div>-->

    <div>
        <nav class="navbar navbar-expand-lg col-md-12" style="background-color: lightcyan; font-size: 25px; padding: 15px;">
            <div class="container-fluid d-flex justify-content-center">
                <div class="navbar-nav text-center">
                    <router-link v-if="!$store.state.LoggedIn" to='/' class="nav-link  mx-2">Home</router-link>
                    <router-link v-if="!$store.state.LoggedIn" to='/login' class="nav-link  mx-2">Login</router-link>
                    <router-link v-if="!$store.state.LoggedIn" to='/register/Customer' class="nav-link  mx-2">New Customer? Register Now!</router-link>
                    <router-link v-if="!$store.state.LoggedIn" to='/register/Professional' class="nav-link  mx-2">Service Professionals Register Here!</router-link>

                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/home' class="nav-link  mx-2">Home</router-link>
                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/search' class="nav-link  mx-2">Search</router-link>
                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/summary' class="nav-link  mx-2">Summary</router-link>

                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="{name:'CustomerHome',params:{user_id:$store.state.user_id}}" class="nav-link mx-2">Home</router-link>
                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="{name:'CustomerSearch',params:{user_id:$store.state.user_id}}" class="nav-link mx-2">Search</router-link>
                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="{name:'CustomerSummary',params:{user_id:$store.state.user_id}}" class="nav-link mx-2">Summary</router-link>

                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="{name:'ProHome',params:{user_id:$store.state.user_id}}" class="nav-link mx-2">Home</router-link>
                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="{name:'ProSearch',params:{user_id:$store.state.user_id}}" class="nav-link mx-2">Search</router-link>
                    <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="{name:'ProSummary',params:{user_id:$store.state.user_id}}" class="nav-link mx-2">Summary</router-link>

                    <button v-if="$store.state.LoggedIn" class="nav-link mx-2" @click="logout">Logout</button>
                </div>
            </div>
        </nav>
    </div>
    `,
    methods:{
        logout(){
            this.$store.dispatch('LogOut');
            this.$router.push('/')
        }
    }
}