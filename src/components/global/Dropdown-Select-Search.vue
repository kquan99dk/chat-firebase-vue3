<template>
  <div ref="elDropdow" class="dropdow-select-search" @click="show">
    <p class="dropdow-select-search_label">{{ label }}</p>
    <font-awesome-icon icon="fa-solid fa-caret-down" />
    <div v-if="isShow" class="dropdow-select-search_dropdown">
      <div class="dropdow-select-search_dropdown-input">
        <input type="text" />
        <font-awesome-icon
          class="dropdow-select-search_dropdown-input_icon"
          icon="fa-solid fa-magnifying-glass"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const elDropdow = ref<any>();
const label = ref<string>("lang");
const isShow = ref<boolean>(false);
const show = (): void => {
  isShow.value = true;
};
const setShow = (e: Event) => {
  if (!elDropdow.value.contains(e.target)) {
    isShow.value = false;
  }
  //   console.log(e.target.classList.contains('main-page'));
};
onMounted(() => {
  document.addEventListener("click", setShow);
});
onUnmounted(() => {
  document.removeEventListener("click", setShow);
});
</script>

<style lang="scss" scoped>
.dropdow-select-search {
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  &_label {
    margin-right: 4px;
  }
  &_dropdown {
    position: absolute;
    z-index: 999;
    min-width: 150px;
    height: 100px;
    top: 100%;
    right: 0;
    background-color: #171924;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 15px;
    border-radius: 4px;
    &-input {
      position: relative;
      input {
        width: 100%;
        height: 36px;
        border-radius: 8px;
        border: 1px solid #222531;
        outline: none;
        background-color: #171924;
        color: #ffffff;
        padding-left: 30px;
        &:focus {
          border-color: rgb(56, 97, 251);
          box-shadow: rgb(56 97 251 / 30%) 0px 0px 0px 4px;
        }
      }
      &_icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
      }
    }
  }
}
</style>
