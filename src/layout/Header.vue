<template>
  <div class="header-global">
    <div class="header-global-content container">
      <ul class="list-quick-information">
        <li>
          <span class="list-quick-information_title"
            >Các loại tiền điện tử: </span
          ><span class="list-quick-information_value">22.495</span>
        </li>
        <li>
          <span class="list-quick-information_title">Trao đổi: </span
          ><span class="list-quick-information_value">546</span>
        </li>
        <li>
          <span class="list-quick-information_title">Vốn hóa thị trường: </span
          ><span class="list-quick-information_value">$1,011,453,480,558</span>
        </li>
        <li>
          <span class="list-quick-information_title"
            >Khối lượng trong vòng 24 giờ </span
          ><span class="list-quick-information_value">$54,662,728,031 Tỷ</span>
        </li>
        <li>
          <span class="list-quick-information_title">Tỷ lệ thống trị </span
          ><span class="list-quick-information_value"
            >BTC: 41.4% ETH: 18.4%</span
          >
        </li>
        <li>
          <span class="list-quick-information_title">Phí gas trên ETH: </span
          ><span class="list-quick-information_value">18 Gwei</span>
        </li>
        <li>
          <DropdownSelectSearch />
        </li>
        <li class="logout" @click="userLogout">logout</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { logout } from "@/services/auth";
import { userAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { defineProps } from "vue";
defineProps({
  abc: String,
});
const authStore = userAuthStore();
const router = useRouter();
const userLogout = () => {
  logout()
    .then((res) => {
      router.push({ path: "login" });
    })
    .catch((err) => {
      console.log("err logout", err);
    });
};
</script>

<style lang="scss" scoped>
.header-global {
  border-bottom: 1px solid #222531;
  &-content {
    height: 53px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .list-quick-information {
      display: flex;
      align-items: center;
      list-style: none;
      font-size: 10px;
      white-space: nowrap;
      &_title {
        color: rgb(161, 167, 187);
        font-weight: bold;
      }
      &_value {
        color: rgb(97, 136, 255);
        margin-inline-end: 12px;
      }
      .logout {
        margin-left: 10px;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>
