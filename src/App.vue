<template>
  <Notification ref="notiComponent" />
  <button @click="closeWindow">close</button>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { ref, reactive, computed, provide, onMounted } from "vue";
import { useCounterStore } from "@/stores/counter";
import { RouterView, useRoute } from "vue-router";
const route = useRoute();

interface INotification extends InstanceType<typeof Notification>{
  showMessage(title: string, message: string, color: string): void;
}
// type INotification = {
//   showMessage(title: string, message: string, color: string): void;
// }

const notiComponent = ref<INotification>()

provide("showMessageSuccess", (title: string, content: string) => {
  notiComponent.value?.showMessage(title, content, "green");
});
provide("showMessageWarning", (title: string, content: string) => {
  notiComponent.value?.showMessage(title, content, "yellow");
});
provide("showMessageError", (title: string, content: string) => {
  notiComponent.value?.showMessage(title, content, "red");
});

const arrrr = reactive<any>([])


const counterStore = useCounterStore();
counterStore.counter++;

const layout = computed<string>(() => {
  if (!route.meta.layout || route.meta.layout === "default-layout") {
    return "DefaultLayout";
  } else {
    return "AuthenLayout";
  }
});
const closeWindow = () => {
  // console.log(window.location.port);
  console.log(navigator.cookieEnabled,
navigator.appCodeName,
navigator.platform);
}

onMounted(() => {
  setTimeout(() => {arrrr.push(123)}, 2000)
})
</script>
