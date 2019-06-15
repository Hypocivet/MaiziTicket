<template>
  <div class="flex login" @mouseenter="isShow=!isShow" @mouseleave="isShow=!isShow">
    <img src="../../assets/header/user.png" class="userImg">
    <div @click="login" class="words" v-if="this.$store.state.currentUser==='null'">登陆</div>
    <div
      @click="userCenter"
      class="words"
      v-if="this.$store.state.currentUser!='null'"
    >{{this.$store.state.currentUser}}</div>
    <div class="more" v-show="isShow&&this.$store.state.currentUser!='null'">
      <div>^</div>
      <div class="btn" @click="userCenter">个人中心</div>
      <div class="btn" @click="exit">退出登陆</div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isShow: false
    };
  },
  methods: {
    login(){
      this.$store.commit("page","login");
      this.$router.push({
        name:"login"
      })
    },
    userCenter() {
      this.$store.commit("page", "userCenter");
      this.$router.push({
        name: "userCenter"
      });
    },
    exit(){
      localStorage.setItem("username","");
      localStorage.setItem("class","");
      this.$store.commit("userStatus","");
      this.$router.push({
        name:"success",
        params:{
          text:"退出"
        }
      })
    }
  }
};
</script>

<style scoped>
.userImg {
  width: 30px;
  height: 30px;
}
.login {
  margin: 25px;
  cursor: pointer;
  font-size: 20px;
}
.words {
  margin: 1px 10px;
}
.more {
  width: 100px;
  position: absolute;
  top: 65px;
  background: #ffffff;
  z-index: 2;
}
.more>div:nth-child(1){
  position: absolute;
  top:-15px;
  color: #dddddd;
  left:50%;
  transform: translateX(-50%);
}
.btn {
  padding: 8px;
  border: 1px solid #dddddd;
}
.btn:hover {
  color: #ff1268;
  background: #fff4f8;
}
</style>
