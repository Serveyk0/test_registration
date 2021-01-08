<template>
  <div class="home">
    <UsersTableShow />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import UsersTableShow from "@/components/UsersTableShow.vue";

@Options({
  components: {
    UsersTableShow
  }
})
export default class Home extends Vue {}
</script>
