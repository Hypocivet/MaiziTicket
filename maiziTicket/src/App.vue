<template>
  <div>
    <my-header></my-header>
    <router-view class="body"></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
import header from "./components/head/header";
import footer from "./components/footer";

export default {
  components: {
    myHeader: header,
    myFooter: footer
  },
  mounted(){
    if(localStorage.getItem("username"))
    this.$store.commit("userStatus",localStorage.getItem("username"))
  }
};
</script>


<style>
* {
  padding: 0;
  margin: 0;
}
.center {
  width: 1200px;
  margin: 0 auto;
}
.flex {
  display: flex;
  /* justify-content: space-between; */
}
a {
  text-decoration: none;
  outline: none;
  color:black;
}
a:visited{
  color: black;
}
.pointer{
    cursor: pointer;
}
li{
  list-style:none;
  width:30px;
  height:30px;
  font-size:20px;
  text-align: center;
  border:1px solid lightgrey;
  margin:0 5px;
  cursor: pointer;
  background:#f8f8f8;
}
li:hover{
  background:#ff1268;
}
.body{
  margin-bottom: 30px;
}
</style>
