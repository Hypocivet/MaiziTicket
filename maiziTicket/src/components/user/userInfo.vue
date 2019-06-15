<template>
  <div>
    <div class="title">个人信息</div>
    <div class="content">
      <div class="flex tabs">
        <div class="tab pointer" v-bind:class="{choose:page==='基本信息'}" @click="page='基本信息'">基本信息</div>
        <!-- <div class="tab pointer" v-bind:class="{choose:page==='修改头像'}" @click="page='修改头像'">修改头像</div> -->
      </div>
      <div class="form">
        <div v-show="page==='基本信息'">
          <div class="notice">完善更多个人信息，有助于我们为您提供更加个性化的服务，麦子网将尊重并保护您的隐私。</div>
          <div class="flex">
            <div class="pro">昵称：</div>
            <div>
              <input type="text" v-model="nickname">
            </div>
          </div>
          <div class="flex">
            <div class="pro">真实姓名：</div>
            <div>
              <input type="text" v-model="realname" disabled="disabled">
            </div>
          </div>
          <div class="flex">
            <div class="pro">性别：</div>
            <div class="flex">
              <input class="radio" type="radio" name="sex" value="male" v-model="sex">男
              <input class="radio" type="radio" name="sex" value="female" v-model="sex">女
            </div>
          </div>
          <div class="flex">
            <div class="pro">出生日期：</div>
            <input type="date" v-model="birthday">
          </div>
          <div class="flex">
            <div class="pro">身份证号：</div>
            <div>
              <input type="text" v-model="IDNumber" disabled="disabled">
            </div>
          </div>
          <div @click="submitInfo" class="submit pointer">提交</div>
        </div>
        <!-- <c-head v-show="page==='修改头像'" :headImg="headImg"></c-head> -->
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import cHead from "./cHead";

export default {
  data() {
    return {
      nickname: "",
      realname: "",
      sex: "",
      birthday: "",
      IDNumber: "",
      page: "基本信息",
      headImg: ""
    };
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("username", this.$store.state.currentUser);
    this.$ajax.post("/api/userInfo", params).then(response => {
      this.nickname = response.data[0].nickname;
      this.realname = response.data[0].realname;
      this.sex = response.data[0].sex;
      this.IDNumber = response.data[0].IDNumber;
      this.birthday = response.data[0].birthday;
      this.headImg = response.data[0].headImg;
    });
  },
  methods: {
    submitInfo() {
      var params = new URLSearchParams();
      params.append("username", this.$store.state.currentUser);
      params.append("nickname", this.nickname);
      params.append("sex", this.sex);
      params.append("birthday", this.birthday);
      this.$ajax.post("/api/alterInfo", params).then(response => {
        if (response.status === 200) alert("修改成功！");
      });
    }
  },
  components: {
    cHead: cHead
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
.form {
  margin: 20px;
}
.form > div:nth-child(1) > div {
  margin: 20px;
}
.pro {
  width: 80px;
  text-align: right;
}
.notice {
  border: 1px solid #edd28b;
  padding: 10px 20px;
  background: #fffdee;
  color: #999;
}
input {
  width: 200px;
  height: 20px;
}
.radio {
  width: 15px;
  height: 15px;
  margin: 5px;
}
.form > div:nth-child(1) > .submit {
  margin-left: 100px;
  padding: 10px;
  width: 100px;
  background: #ff1268;
  color: #ffffff;
  text-align: center;
  border-radius: 5px;
}
.choose {
  background: #ff1268;
  color: #ffffff;
}
.tabs {
  border-bottom: 2px solid #ff1268;
}
.tabs > div {
  padding: 5px 15px;
  margin-left: 5px;
  border: 1px solid #dddddd;
  border-bottom: none;
}
.tabs > div:hover {
  background: #e6e6e6;
  color: black;
}
</style>
