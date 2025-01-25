const store = new Vuex.Store({
    state: {
        auth_token: null,
        role: null,
        user_id: null,
        c_id: null,
        p_id: null,
        LoggedIn:false,

    },
    mutations: {
        setUser(state) {
            try{
                if(JSON.parse(localStorage.getItem('user'))){
                    const user= JSON.parse(localStorage.getItem('user'));
                    if (user.c_id){
                        state.auth_token=user.token;
                        state.role=user.role;
                        state.user_id=user.user_id;
                        state.c_id=user.c_id;
                        state.LoggedIn=true;
                    }
                    else if(user.p_id){
                        state.auth_token=user.token;
                        state.role=user.role;
                        state.user_id=user.user_id;
                        state.p_id=user.p_id;
                        state.LoggedIn=true;
                    }
                    else{
                        state.auth_token=user.token;
                        state.role=user.role;
                        state.user_id=user.user_id;
                        state.LoggedIn=true;
                    }
                    
                }
            }
            catch{
                console.warn("Not logged in")

            }

        },
        logout(state){
            state.auth_token=null;
            state.role=null;
            state.user_id=null;
            state.c_id=null;
            state.p_id=null;
            state.LoggedIn=false;
        }
    },
    actions: {
        LogOut({commit}){
            localStorage.removeItem('user')
            commit('logout')
        }

    }
})

store.commit('setUser')

export default store;