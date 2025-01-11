export default{
    template:`
    <div>
        <router-link to='/' class="btn btn-lg btn-info">Home</router-link>
        <router-link to='/login' class="btn btn-lg btn-primary">Login</router-link>
        <router-link to='/register/Customer'class="btn btn-lg btn-success">New Customer? Register Now!</router-link>
        <router-link to='/register/Professional'class="btn btn-lg btn-warning">Service Professionals Register Here!</router-link>
    </div>
    ` 
}