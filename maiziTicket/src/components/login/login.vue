<template>
  <div>
    <div class="input flex" v-bind:class="{border:cUsername}">
      <div class="icon">
        <img src="../../assets/body/login/username.png" alt>
      </div>
      <input
        type="text"
        ref="username"
        placeholder="请输入用户名"
        @focus="cUsername=!cUsername"
        @blur="cUsername=!cUsername"
        v-model="username"
      >
    </div>
    <div class="warn uWarn" v-show="!username">用户名不能为空</div>
    <div class="input flex" v-bind:class="{border:cPassword}">
      <div class="icon">
        <img src="../../assets/body/login/password.png" alt>
      </div>
      <input
        type="password"
        ref="password"
        placeholder="请输入密码"
        @focus="cPassword=!cPassword"
        @blur="cPassword=!cPassword"
        v-model="password"
      >
    </div>
    <div class="warn pWarn" v-show="!password">密码不能为空</div>
    <div class="flex btn">
      <router-link :to="{name:'register'}" class="pointer btns">注册</router-link>
      <div class="pointer btns" @click="login()">登陆</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cUsername: false,
      cPassword: false,
      username: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      var params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);
      this.$ajax
        .post("/api/login", params)
        .then(response => {
          if (response.data.isLogin) {
            localStorage.setItem("username", this.username);
            localStorage.setItem("class", response.data.class);
            this.$store.commit("userStatus", this.username);
            this.$router.push({
              name: "success",
              params: {
                text: "登陆"
              }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.input {
  width: 250px;
  height: 50px;
  margin: 25px;
  border: 1px solid transparent;
  border-radius: 10px;
  overflow: hidden;
}
.icon {
  width: 50px;
  background: grey;
}
.icon > img {
  width: 30px;
  height: 30px;
  margin: 10px;
}
.input > input {
  width: 200px;
  font-size: 20px;
  font-weight: 100;
  border: none;
  outline: none;
}
.border {
  border: 1px solid #ff1268;
}
.btn {
  width: 200px;
  margin: 50px;
  justify-content: space-between;
}
.btns {
  background: #ff1268;
  width: 80px;
  height: 50px;
  font-size: 20px;
  color: #ffffff;
  border: 12px solid transparent;
  box-sizing: border-box;
  text-align: center;
  border-radius: 10px;
}
.warn {
  position: absolute;
  font-size: 12px;
  color: red;
  left: 30px;
}
.uWarn {
  top: 80px;
}
.pWarn {
  top: 160px;
}
</style>
