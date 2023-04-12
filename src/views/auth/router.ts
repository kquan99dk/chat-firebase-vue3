import Login from "./login.vue";
import Register from "./register.vue";
export default [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
        layout: 'AuthenLayout'
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
        layout: 'AuthenLayout'
    }
  }
];
