export default{
    template:`
    <div>
        <router-link v-if="!$store.state.LoggedIn" to='/' class="btn btn-lg btn-info">Home</router-link>
        <router-link v-if="!$store.state.LoggedIn" to='/login' class="btn btn-lg btn-primary">Login</router-link>
        <router-link v-if="!$store.state.LoggedIn" to='/register/Customer'class="btn btn-lg btn-success">New Customer? Register Now!</router-link>
        <router-link v-if="!$store.state.LoggedIn" to='/register/Professional'class="btn btn-lg btn-warning">Service Professionals Register Here!</router-link>
        
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/home' class="btn btn-lg btn-primary">Home</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/search' class="btn btn-lg btn-warning">Search</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Admin'" to='/admin/summary' class="btn btn-lg btn-success">Summary</router-link>

        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="`/customer/home/${$store.state.user_id}`" class="btn btn-lg btn-primary">Home</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="`/customer/search/${$store.state.user_id}`" class="btn btn-lg btn-warning">Search</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Customer'" :to="`/customer/summary/${$store.state.user_id}`" class="btn btn-lg btn-success">Summary</router-link>

        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="`/pro/home/${$store.state.user_id}`" class="btn btn-lg btn-primary">Home</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="`/pro/search/${$store.state.user_id}`" class="btn btn-lg btn-warning">Search</router-link>
        <router-link v-if="$store.state.LoggedIn && $store.state.role==='Professional'" :to="`/pro/summary/${$store.state.user_id}`" class="btn btn-lg btn-success">Summary</router-link>

        <button v-if="$store.state.LoggedIn" class="btn btn-lg btn-danger" @click="logout">Logout</button>
    </div>
    `,
    methods:{
        logout(){
            this.$store.commit('logout');
            this.$router.push('/');
        }
    }
}