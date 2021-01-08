<template>
  <div class="change-user grid">
    <div class="change-user__info grid">
      <div class="attribute grid">
        <label for="name">{{ NAME }}</label>
        <input v-model="n" name="name" />
      </div>
      <div class="attribute grid">
        <label for="surname">{{ SURNAME }}</label>
        <input v-model="s" name="surname" />
      </div>
      <div class="attribute grid">
        <label for="email">{{ EMAIL }}</label>
        <input v-model="e" name="email" />
      </div>
      <div class="attribute grid">
        <label for="phone">{{ PHONE }}</label>
        <input v-model="p" name="phone" />
      </div>
    </div>
    <button @click="Save">{{ SAVE }}</button>
    <textarea v-if="operation === 'add'" v-model="jsonObj" />
    <div class="change-user__buttons grid">
      <button v-if="operation === 'add'" @click="parse">
        {{ PARSE_JSON }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UserModel from "@/models/userModel";
import Data from "./constants";
@Options({
  props: {
    name: {
      type: String,
      required: true,
      default: ""
    },
    surname: {
      type: String,
      required: true,
      default: ""
    },
    email: {
      type: String,
      required: true,
      default: ""
    },
    phone: {
      type: String,
      required: true,
      default: ""
    },
    operation: {
      type: String,
      required: true
    },
    index: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      n: "" as string,
      s: "" as string,
      e: "" as string,
      p: "" as string,
      i: "" as string,
      jsonObj: [] as Array<UserModel>,
      NAME: Data.NAME as string,
      SURNAME: Data.SURNAME as string,
      EMAIL: Data.EMAIL as string,
      PHONE: Data.PHONE as string,
      SAVE: Data.SAVE as string,
      PARSE_JSON: Data.PARSE_JSON as string
    };
  },
  mounted() {
    this.n = this.name;
    this.s = this.surname;
    this.e = this.email;
    this.p = this.phone;
  },
  methods: {
    Save() {
      if (this.n !== "" || this.s !== "" || this.e !== "" || this.p !== "") {
        const currArr: Array<UserModel> = JSON.parse(localStorage.users);
        const newObj: UserModel = {
          name: this.n,
          surname: this.s,
          email: this.e,
          phone: this.p
        };
        if (this.operation === "add") {
          currArr.push(newObj);
          localStorage.setItem("users", JSON.stringify(currArr));
        } else {
          currArr[this.index] = newObj;
          localStorage.setItem("users", JSON.stringify(currArr));
        }
      }
      this.$router.push("/");
    },
    parse() {
      if (this.jsonObj.length > 0) {
        const obj: string = JSON.stringify(this.jsonObj, null, 2);
        const newObj: string = obj
          .replaceAll("\\n", "")
          .replaceAll("},]", "}]")
          .replaceAll("\\", "")
          .replaceAll(" ", "")
          .replaceAll('"[', "")
          .replaceAll(']"', "")
          .replaceAll("},{", "},\n{")
          .replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        const arr: Array<string> = newObj.split(",\n");
        const newArr: Array<UserModel> = [];
        for (let i = 0; i < arr.length; i++) newArr.push(JSON.parse(arr[i]));
        localStorage.setItem(
          "users",
          localStorage.users !== undefined
            ? JSON.stringify(JSON.parse(localStorage.users).concat(newArr))
            : JSON.stringify(newArr)
        );
      }
      this.$router.push("/");
    }
  }
})
export default class ChangeUser extends Vue {}
</script>
