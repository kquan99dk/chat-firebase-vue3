import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home/router";
import rank from "@/views/rank/router";
import authR from "@/views/auth/router";
import chat from "@/views/chat/router";
import { auth } from "@/plugin/firebaseConfig";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...home, ...rank, ...authR, ...chat],
});

router.beforeEach((to, from, next) => {
  console.log('1');
  
  const isLogin = auth.currentUser
  if (to.name !== "login" && to.name !== "register" && !isLogin){
    next({ name: "login" });
  }
  if ((to.name == "login" || to.name == "register") && isLogin){
    next({ name: "home" });
  }
  
  else next();    
});

router.beforeResolve((to, from, next) => {
  console.log('2');
  console.log(to, from);
  next()
})

export default router;
