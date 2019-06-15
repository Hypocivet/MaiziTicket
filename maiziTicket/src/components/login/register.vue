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
      <div class="pointer btns" @click="register()">注册</div>
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
    register: function() {
      if (this.username != "" && this.password != "") {
        var params = new URLSearchParams();
        params.append("username", this.username);
        params.append("password", this.password);
        this.$ajax
          .post("/api/register", params)
          .then(response => {
            console.log(response.data)
            if (response.data) {
              alert("注册成功！")
              this.$router.push({
                name: "login"
              });
            }else alert("注册失败，可能是用户名重复，请重试！")
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.username == "") {
        alert("用户名不能为空");
      } else if (this.password == "") {
        alert("密码不能为空");
      }
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
