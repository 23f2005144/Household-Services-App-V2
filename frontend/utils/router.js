import HomePage from "../pages/HomePage.js";
import LoginPage from "../pages/LoginPage.js";
import RegisterPage from "../pages/RegisterPage.js";
import AdminHomePage from "../pages/AdminHomePage.js";
import AdminSearchPage from "../pages/AdminSearchPage.js";
import CustomerHomePage from "../pages/CustomerHomePage.js";
import CustomerSearchPage from "../pages/CustomerSearchPage.js";
import ServiceBookPage from "../pages/ServiceBookPage.js";
import ProHomePage from "../pages/ProHomePage.js";
import ProSearchPage from "../pages/ProSearchPage.js";
import SummaryPage from "../pages/SummaryPage.js";

import store from'./store.js';
const routes=[
    {path:'/', component:HomePage },
    {path:'/login', component:LoginPage } ,
    {path:'/register/:role', component:RegisterPage },
    {path:'/admin/home', component:AdminHomePage, meta:{RequiresLogin:true, role:'Admin'}},
    {path:'/admin/search', component:AdminSearchPage, meta:{RequiresLogin:true, role:'Admin'}, props:route=>({query:route.query.q || "", table: route.query.table || "" })},
    {path:'/admin/summary', component:SummaryPage, meta:{RequiresLogin:true, role:'Admin'}},
    {path:'/customer/home/:user_id', name:'CustomerHome', component:CustomerHomePage, meta:{RequiresLogin:true, role:'Customer'}},
    {path:'/customer/:user_id/search', name:'CustomerSearch', component:CustomerSearchPage, meta:{RequiresLogin:true, role:'Customer'}, props:route=>({query:route.query.q || "", table: route.query.table || "" })},
    {path:'/customer/summary/:user_id', name:'CustomerSummary', component:SummaryPage, meta:{RequiresLogin:true, role:'Customer'}},
    {path:'/customer/:c_id/service_book/:type', name:'CustomerServiceBook', component:ServiceBookPage, meta:{RequiresLogin:true, role:'Customer'}},
    {path:'/pro/home/:user_id', name:'ProHome', component:ProHomePage, meta:{RequiresLogin:true, role:'Professional'}},
    {path:'/pro/:user_id/search', name:'ProSearch', component:ProSearchPage, meta:{RequiresLogin:true, role:'Professional'}, props:route=>({query:route.query.q || "" })},
    {path:'/pro/summary/:user_id', name:'ProSummary', component:SummaryPage, meta:{RequiresLogin:true, role:'Professional'}},
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next)=>{
    if(to.matched.some((record)=> record.meta.RequiresLogin)){
        if(!store.state.LoggedIn){
            next({path:"/login"})
        } else if(to.meta.role && to.meta.role!=store.state.role && store.state.role==="Customer"){
            next({path:`/customer/home/${store.state.user_id}`})
        }else if(to.meta.role && to.meta.role!=store.state.role && store.state.role==="Professional"){
            next({path:`/pro/home/${store.state.user_id}`})
        }else if(to.meta.role && to.meta.role!=store.state.role && store.state.role==="Admin"){
            next({path:`/admin/home`})
        }else{
            next();
        }
        
    }else if(store.state.LoggedIn){
        if (["/", "/login"].includes(to.path) || (to.path.startsWith("/register"))){
            if (store.state.role === "Customer"){
                next({ path: `/customer/home/${store.state.user_id}`});
            } else if (store.state.role === "Professional"){
                next({ path: `/pro/home/${store.state.user_id}`});  
            } else {
                next({ path: `/admin/home`});
            }
            return; 
        }
    }else{
        next();
    }
})

export default router;