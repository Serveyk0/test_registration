<template>
  <div class="home grid">
    <button @click="changePage">{{REGISTRATION}}</button>
    <div class="grid users">
      <div class="users__header grid">
        <span v-for="item in HEADER" :key="item">{{item}}</span>
      </div>
      <div class="users__one grid" v-for="(user, index) in users" :key="index">
        <span>{{ user.name }}</span>
        <span>{{ user.surname }}</span>
        <span>{{ user.email }}</span>
        <span>{{ user.phone }}</span>
        <button @click="editUser(user, index)">{{EDIT}}</button>
        <button @click="deletUser(index)">{{DELETE}}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import userModel from "@/models/userModel";
import Data from './constants';

@Options({
  data() {
    return {
      users  : []                     as userModel[],
      HEADER : Data.HEADER            as string[],
      EDIT   : Data.EDIT              as string,
      DELETE : Data.DELETE            as string,
      REGISTRATION: Data.REGISTRATION as string
    };
  },
  methods: {
    changePage() {
      this.$router.push({
        name  : "ChangeUser",
        params: {
          operation: "add",
        },
      });
    },
    editUser(user: userModel, index: Number) {
      this.$router.push({
        name  : "ChangeUser",
        params: {
          operation: "edit",
          index    : index,
          name     : user.name,
          surname  : user.surname,
          email    : user.email,
          phone    : user.phone,
        },
      });
    },
    deletUser(index: Number) {
      this.users.splice(index, 1);
      if (this.users.length > 0)
        localStorage.setItem("users", JSON.stringify(this.users));
      else localStorage.setItem("users", JSON.stringify([]));
    },
  },
  mounted() {
    if (localStorage.users !== undefined)
      this.users = JSON.parse(localStorage.users);
    else localStorage.setItem("users", JSON.stringify([]));
  },
})
export default class UsersTableShow extends Vue {}
</script>
