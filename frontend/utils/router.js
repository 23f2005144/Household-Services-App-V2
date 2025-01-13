import HomePage from "../pages/HomePage.js";
import LoginPage from "../pages/LoginPage.js";
import RegisterPage from "../pages/RegisterPage.js";
import AdminHomePage from "../pages/AdminHomePage.js";

const routes=[
    {path:'/', component:HomePage },
    {path:'/login', component:LoginPage } ,
    {path:'/register/:role', component:RegisterPage },
    {path:'/admin/home', component:AdminHomePage},
]

const router = new VueRouter({
    routes
})
export default router;