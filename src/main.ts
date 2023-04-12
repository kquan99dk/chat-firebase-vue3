import { createApp } from "vue";
import { createPinia } from "pinia";
import type { App as Application } from 'vue'
import App from "./App.vue";
import router from "./router";
import registerGlobal from "@/components/global/registerGlobal";
import "./assets/main.scss";
import icons from "@/icon/index";
import axios from "axios";
import VueAxios from "vue-axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { auth } from "@/plugin/firebaseConfig";

library.add(...icons);

let app:Application<Element>;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.use(VueAxios, axios);
    app.component("font-awesome-icon", FontAwesomeIcon);

    registerGlobal(app);
    app.use(createPinia());
    app.use(router);

    app.mount("#app");
  }
});
