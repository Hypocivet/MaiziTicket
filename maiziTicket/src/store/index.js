import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: "home",
    currentUser:null
  },
  getters:{
    getIsHome(state){
      return state.isHome;
    },
    // currentUser(state){
    //   state.currentUser = localStorage.getItem("username");
    //   return state.currentUser;
    // }
  },
  mutations: {
    page(state,page){
      state.page = page;
    },
      // this.$store.commit("userStatus","");
    //
    userStatus(state,user){
      if(user){
        state.currentUser = localStorage.getItem("username");
      }else{
        localStorage.setItem("username",null);

        state.currentUser = "null";
      }
    }
  },
  actions:{
    page(context){
      context.commit("page");
    },
    userStatus(context){
      context.commit("userStatus");
    }
  }
});
