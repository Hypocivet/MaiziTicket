<template>
  <div class="header">
    <div class="center flex">
      <img src="../../assets/header/logo.png" alt class="logo">
      <div class="flex">
        <location></location>
        <router-link
          to="/home"
          class="where"
          @click.native="page('home')"
          v-bind:class="{color:this.$store.state.page === 'home'}"
        >首页</router-link>
        <router-link
          to="/filter"
          class="where"
          @click.native="page('filter')"
          v-bind:class="{color:this.$store.state.page === 'filter'}"
        >分类</router-link>
      </div>
      <search v-bind:isHome="this.$store.state.isHome" @data="getinputdata"></search>
      <user></user>
    </div>
  </div>
</template>

<script>
import location from "./location";
import search from "./search";
import user from "./user";

export default {
  components: {
    location: location,
    search: search,
    user: user
  },
  methods: {
    getinputdata(data) {
      this.$store.commit("page","filter");
    },
    page(page) {
      this.$store.commit("page", page);
    }
  }
};
</script>

<style scoped>
.header {
  box-shadow: 0 0 10px 0 grey;
  height: 80px;
}
.header > div {
  justify-content: space-between;
}
.logo {
  height: 40px;
  margin-top: 20px;
}
.where {
  font-size: 20px;
  border: 10px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  margin: 15px;
  color: black;
}
.color {
  color: #ff1268;
}
.where:hover {
  color: #ff1268;
}
</style>
