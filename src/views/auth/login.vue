<template>
  <div class="login-page">
    <div class="form-login">
      {{ test }}
      <p class="form-login-title">Login</p>
      <p>Email</p>
      <input class="form-login-input" type="text" v-model="email" />
      <p>Password</p>
      <input class="form-login-input" type="password" v-model="password" />
      <button @click="submitSignIn">login</button>
      <br />
      <button @click="checkUserLogin">check</button>
      <textarea  rows="1" @input="changeTextarea" id=""></textarea>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { signIn } from "@/services/auth";
import { userAuthStore } from "@/stores/auth";
const showMessageSuccess = inject("showMessageSuccess") as (title: string, content: string)=>void;
const showMessageWarning = inject("showMessageWarning") as (title: string, content: string)=>void;
const showMessageError = inject("showMessageError") as (title: string, content: string)=>void;
const authStore = userAuthStore();
const router = useRouter();

const email = ref<string>("");
const password = ref<string>("");
let test = reactive({a:0})
const date = new Date();
const currentTime = date.getTime();
console.log(currentTime < currentTime + 36000, '44444444');


const submitSignIn = () => {
  signIn(email.value, password.value)
    .then( async (res: any) => {
      await showMessageSuccess("title", "thanh cong");
      await router.push('/')
    })
    .catch((err) => {
      console.log("err", err);
    });
};
const checkUserLogin = () => {
  // router.push('/')
  test.a = 2
};

const changeTextarea = (event: any) => {
  const style = getComputedStyle(event.target, null);
  const verticalBorders = Math.round(parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth));
  const maxHeight = parseFloat(style.maxHeight) || 100;
  
  event.target.style.height = "auto";

  const newHeight = event.target.scrollHeight + verticalBorders;
  
  event.target.style.overflowY = newHeight > maxHeight ? "auto" : "hidden";
  event.target.style.height = Math.min(newHeight, maxHeight) + "px";
}
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  padding-top: 200px;
  .form-login {
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
textarea {
  margin-top: 20px;
  scrollbar-width: thin;
  outline: none;
  resize: none;
  box-shadow: 0 0 0 4px rgba(#79bd8f, 0.3);
  width: 100%;
  min-height: 36px;
  max-height: 100px;
  border-radius: 5px;
  padding: 7px 10px;
  font-size: 15px;
  border: 1px solid #79bd8f;
}
</style>
