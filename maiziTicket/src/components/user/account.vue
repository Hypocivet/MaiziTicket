<template>
  <div>
    <div class="title">账号设置</div>
    <div>
      <div class="alter">
        <div class="headline">修改密码</div>
        <div class="content">
          <div class="flex pro">
            <div class="proName">原密码：</div>
            <div>
              <input type="password" v-model="oldP">
            </div>
          </div>
          <div class="flex pro">
            <div class="proName">新密码：</div>
            <div>
              <input type="password" v-model="newP1">
            </div>
          </div>
          <div class="flex pro">
            <div class="proName">重复新密码：</div>
            <div>
              <input type="password" v-model="newP2">
            </div>
          </div>
          <div @click="aPassword" class="btn pointer">修改</div>
        </div>
      </div>
      <div class="alter">
        <div class="headline">实名认证</div>
        <div class="notice">一旦实名认证，信息将无法修改</div>
        <div class="content">
          <div class="flex pro">
            <div class="proName">姓名：</div>
            <div>
              <input type="text" v-model="realname" v-bind:disabled="finish">
            </div>
          </div>
          <div class="flex pro">
            <div class="proName">身份证号：</div>
            <div>
              <input type="text" v-model="IDNumber" v-bind:disabled="finish">
            </div>
          </div>
          <div class="btn pointer" @click="authentication" v-show="!finish">实名认证</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldP: "",
      newP1: "",
      newP2: "",
      realname: "",
      IDNumber: "",
      finish:false
    };
  },
  methods: {
    aPassword() {
      if (this.newP1 === this.newP2) {
        var params = new URLSearchParams();
        params.append("username", this.$store.state.currentUser);
        params.append("oldP", this.oldP);
        params.append("newP", this.newP1);
        this.$ajax.post("/api/alterPassword", params).then(response => {
          if (response.data) {
            alert("修改成功！");
          } else {
            alert("修改失败，原密码错误，请重试！");
          }
        });
      } else {
        alert("两次输入密码不一致!");
      }
    },
    authentication() {
      console.log("实名认证");
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(this.IDNumber) && this.realname != "") {
        var params = new URLSearchParams();
        params.append("username", this.$store.state.currentUser);
        params.append("realname",this.realname);
        params.append("IDNumber",this.IDNumber);
        this.$ajax.post("/api/authentication", params).then(response => {
          if (response) {
            alert("实名认证完成！");
          }
        });
      } else if (this.IDNumber === "" || this.realname === "") {
        alert("信息不能为空！");
      } else {
        alert("请输入合法的18位身份证号码！");
      }
    }
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("username", this.$store.state.currentUser);
    this.$ajax.post("/api/userInfo", params).then(response => {
      console.log(response.data[0].realname!='')
      this.realname = response.data[0].realname;
      this.IDNumber = response.data[0].IDNumber;
      if(this.realname!='') this.finish = true;
    });
  }
};
</script>

<style scoped>
.title {
  padding: 20px;
  border-bottom: 1px solid #dddddd;
}
.content {
  margin: 10px;
}
.alter {
  margin: 20px;
  border: 1px solid #dddddd;
}
.headline {
  width: 65px;
  padding: 5px;
  margin: 10px;
  border-radius: 5px;
  background: #ff1268;
  color: #fff;
}
.pro {
  margin: 10px;
}
.proName {
  width: 100px;
  text-align: right;
}
.btn {
  width: 100px;
  padding: 5px 20px;
  background: #ff1268;
  text-align: center;
  color: #fff;
  margin: 20px 110px;
}
.notice {
  border: 1px solid #edd28b;
  padding: 10px 20px;
  background: #fffdee;
  color: #999;
  margin: 10px;
}
</style>
