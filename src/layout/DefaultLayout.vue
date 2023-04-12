<template>
  <Header :abc="abc" />
  <div class="main-page container">
    <slot />
  </div>
  <Footer />
</template>
<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { ref } from "vue"
const abc = ref("aaaaaaaaa")
</script>
<style scoped lang="scss">
.main-page {
  margin: auto;
  height: calc(100vh - 53px);
}
</style>
