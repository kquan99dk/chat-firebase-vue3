<template>
  <div class="chat">
    <div class="chat__list">
      <div v-if="listUser" class="chat__list-user">
        <template v-for="(user, index) in listUser" :key="user.uid">
          <div
            v-if="user.uid !== id"
            class="chat__list-user-items"
            :class="{ 'chat__list-user-items-selected': idUserTo === user.uid }"
            @click="selectUser(user.uid)"
          >
            {{ user.email }}
          </div>
        </template>
      </div>
    </div>
    <div class="chat__form">
      <template v-if="idUserTo">
        <div class="chat__form-timeline">
          <div
            v-for="(content, index) in listContentChat"
            :key="index"
            :class="
              content.uid === idUserTo
                ? 'chat__form-timeline-chat-to'
                : 'chat__form-timeline-chat-from'
            "
          >
            <p>
              {{ content.textChat }}
            </p>
          </div>
        </div>
        <input type="text" v-model="textChat" />
        <button @click="addChat">chat</button>
      </template>
      <h2 v-else>Select User</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from "vue";
import { database } from "@/plugin/firebaseConfig";
import { auth } from "@/plugin/firebaseConfig";
import { useRoute, useRouter } from "vue-router";
import { getListUser } from "@/services/general_services";
import {
  ref as reffb,
  push,
  set,
  onChildAdded,
  onValue,
} from "firebase/database";

const route = useRoute();
const router = useRouter();

let listUser = ref<any>([]);
let listContentChat = ref<any>([]);
const textChat = ref("");

const idUserTo = computed<any>(() => {
  return route.query.id;
});
const channelChatSubrights = () => {
  console.log("key");
  if (idUserTo.value > id) {
    console.log(idUserTo.value + id);

    return idUserTo.value + id;
  } else {
    console.log(id + idUserTo.value);
    return id + idUserTo.value;
  }
};
const id: any = auth.currentUser?.uid;

const addChat = () => {
  const postListRef = reffb(database, channelChatSubrights());
  const newPostRef = push(postListRef);
  set(newPostRef, {
    textChat: textChat.value,
    uid: id,
  })
    .then(() => {
      textChat.value = "";
    })
    .catch((err) => {
      console.log(err);
    });
};

let chatListRef = reffb(database, channelChatSubrights());
const selectUser = (uid: string) => {
  router.push({
    path: "/chat",
    query: {
      id: uid,
    },
  });
};

const getListContentChat = () => {
  onValue(
    chatListRef,
    (snapshot) => {
      listContentChat.value = snapshot.val();
      console.log("listContentChat.value", listContentChat.value);

      // addPushContentChat();
    }
    // {
    //   onlyOnce: true,
    // }
  );
};
let text = reactive({});
const addPushContentChat = () => {
  onChildAdded(chatListRef, (data) => {
    console.log("dsadasdsad");

    text = data.val();
  });
};

watch(idUserTo, (value) => {
  if (value) {
    console.log("zoooooooooooo");
    channelChatSubrights();
    chatListRef = reffb(database, channelChatSubrights());
    getListContentChat();
  }
});
onMounted(() => {
  getListUser()
    .then((res) => {
      listUser.value = res.data.users;
    })
    .catch((err) => {
      console.log("err", err);
    });

  if (idUserTo.value) {
    getListContentChat();
  }
});
</script>

<style lang="scss" scoped>
.chat {
  height: 100%;
  width: 100%;
  display: flex;
  &__list {
    width: 250px;
    height: 100%;
    border: 1px solid #fff;
    &-user {
      width: 100%;
      &-items {
        background-color: #2f3838;
        padding: 8px;
        border-radius: 10px;
        margin-bottom: 2px;
        cursor: pointer;
        &:hover {
          background-color: #272c2c;
        }
        &-selected {
          background-color: #393b3b;
        }
      }
    }
  }
  &__form {
    flex-grow: 1;
    height: 100%;
    border: 1px solid #fff;
    &-timeline {
      width: 100%;
      background-color: #2c2929;
      &-chat-from {
        display: flex;
        justify-content: end;
      }
    }
    &-inputchat {
    }
  }
}
</style>
