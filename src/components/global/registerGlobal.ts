import type { App as Application } from 'vue'


import DefaultLayout from "@/layout/DefaultLayout.vue";
import AuthenLayout from "@/layout/AuthenLayout.vue";
import DropdownSelectSearch from "./Dropdown-Select-Search.vue"
import Notification from "./Notification.vue"

const registerGlobal = (app: Application<Element>) => {
  app.component("DefaultLayout", DefaultLayout)
  .component("AuthenLayout", AuthenLayout)
  .component("DropdownSelectSearch", DropdownSelectSearch)
  .component("Notification", Notification)
};

export default registerGlobal;
