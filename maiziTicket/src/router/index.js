import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "home",
      component: () => import("../view/home.vue")
    },
    {
      path: "/filter",
      name: "filter",
      component: () => import("../view/filter.vue")
    },
    {
      path: "/details",
      name: "details",
      component: () => import("../view/details.vue")
    },
    {
      path: "/loginPage",
      name: "loginPage",
      component: () => import("../view/loginPage.vue"),
      children: [
        {
          path: "/loginPage/login",
          name: "login",
          component: () => import("../components/login/login.vue")
        },
        {
          path: "/loginPage/register",
          name: "register",
          component: () => import("../components/login/register.vue")
        }
      ]
    },
    {
      path: "/success",
      name: "success",
      component: () => import("../view/success.vue")
    },
    {
      path: "/userCenter",
      name: "userCenter",
      component: () => import("../view/userCenter.vue")
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../view/order.vue"),
      children: [
        {
          path: "/order/makeSure",
          name: "makeSure",
          component: () => import("../components/order/makeSure.vue")
        },
        {
          path: "/order/pay",
          name: "pay",
          component: () => import("../components/order/pay.vue")
        }
      ]
    },
    {
      path:"/addTicket",
      name:"addTicket",
      component:()=>import("../view/addTicket.vue")
    },
    {
      path:"/alterGoods",
      name:"alterGoods",
      component:()=>import("../view/alterGoods.vue")
    }
  ]
});
