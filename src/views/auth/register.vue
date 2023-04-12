<template>
  <div class="register-page">
    <div class="form-register">
      <p class="form-register-title">Register</p>
      <p>Email</p>
      <input class="form-register-input" type="text" v-model="email" />
      <p>Password</p>
      <input class="form-register-input" type="password" v-model="password" />
      <button @click="submitRegister">register</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { register } from "@/services/auth";

const email = ref<string>("");
const password = ref<string>("");

const submitRegister = () => {
  register(email.value, password.value)
    .then((res) => {
      console.log("done", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
};
</script>
<style lang="scss" scoped>
.register-page {
  width: 100%;
  height: 100%;
  padding-top: 200px;
  .form-register {
    margin: auto;
    width: 350px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    border: 1px solid #858383;
    &-title {
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    &-input {
      margin-bottom: 10px;
    }
  }
}
</style>
