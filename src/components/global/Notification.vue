<template>
  <div v-if="isShow">
    <div
      ref="element"
      class="notification"
      :class="{ 'hidden-noti': !isShow }"
      :style="`background-color: ${colorNoti}`"
      :key="keyTime"
      @mouseenter="handleMoveIn"
      @mouseleave="handleMoveOut"
    >
      <h3>{{ titleMessage }}</h3>
      <p>{{ contentMessage }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineExpose, nextTick } from "vue";
const element = ref();
const isShow = ref<boolean>(false);
const timeOff = 2000;
const idTimeOut = ref(0);
const keyTime = ref();
const colorNoti = ref("green");
const titleMessage = ref("");
const contentMessage = ref("");
const showMessage = (title: string, message: string, color: string) => {
  titleMessage.value = title;
  contentMessage.value = message;
  colorNoti.value = color;
  isShow.value = true;
  clearTimeout(idTimeOut.value);
  keyTime.value = new Date().getTime();
  idTimeOut.value = setTimeout(() => {
    isShow.value = false;
  }, timeOff);
};
const handleMoveIn = (e: any) => {
  clearTimeout(idTimeOut.value);
};
const handleMoveOut = (e: any) => {
  idTimeOut.value = setTimeout(() => {
    isShow.value = false;
  }, timeOff);
};
defineExpose({
  showMessage,
});
</script>
<style lang="scss" scoped>
.notification {
  min-width: 250px;
  max-width: 400px;
  position: fixed;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999999;
  border: 1px solid rgb(134, 126, 126);
  border-radius: 20px;
  padding: 10px;
  font-size: 15px;
  animation: noti 0.5s ease forwards;
}
@keyframes noti {
  from {
    top: -100%;
    opacity: 0;
  }
  to {
    top: 30px;
    opacity: 1;
  }
}
.hidden-noti {
  animation: hidden 0.3s forwards;
}
@keyframes hidden {
  to {
    opacity: 0.5;
  }
}
</style>
