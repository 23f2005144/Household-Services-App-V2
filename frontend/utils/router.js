import HomePage from "../pages/HomePage.js";
import LoginPage from "../pages/LoginPage.js";
import RegisterPage from "../pages/RegisterPage.js";
import AdminHomePage from "../pages/AdminHomePage.js";
import store from'./store.js';
const routes=[
    {path:'/', component:HomePage },
    {path:'/login', component:LoginPage } ,
    {path:'/register/:role', component:RegisterPage },
    {path:'/admin/home', component:AdminHomePage, meta:{RequiresLogin:true, role:'Admin'}},
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next)=>{
    if(to.matched.some((record)=> record.meta.RequiresLogin)){//array of objects of routes check it once later
        if(!store.state.LoggedIn){
            next({path:"/login"})
        } else if(to.meta.role && to.meta.role!=store.state.role){
            next({path:'/'})
        } else{
            next();
        }
        
    } else{
        next();
    }
})

export default router;