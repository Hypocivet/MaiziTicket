<template>
  <div>
    <div class="title">收货地址</div>
    <div class="content">
      <div>
        <span class="btn pointer" @click="add=true">创建新地址</span>
      </div>
      <div class="addSite" v-show="add">
        <div class="flex">
          <div class="proName">收件人：</div>
          <div>
            <input type="text" ref="name">
          </div>
        </div>
        <div class="flex">
          <div class="proName">手机：</div>
          <div>
            <input type="text" ref="phone">
          </div>
        </div>
        <div class="flex">
          <div class="proName">配送地址：</div>
          <div>
            <input type="text" ref="site">
          </div>
        </div>
        <div class="flex btns">
          <div @click="addSite" class="pointer">保存地址</div>
          <div @click="add=!add" class="pointer">取消</div>
        </div>
      </div>
      <div class="site">
        <site-div v-for="(site,index) in sites" :key="index" :site="site"></site-div>
      </div>
    </div>
  </div>
</template>

<script>
import siteDiv from "./siteDiv";
export default {
  data() {
    return {
      add: false,
      sites: []
    };
  },
  components: {
    siteDiv: siteDiv
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("username", this.$store.state.currentUser);
    this.$ajax.post("/api/getSite", params).then(response => {
      this.sites = response.data;
    });
  },
  methods: {
    addSite() {
      var params = new URLSearchParams();
      params.append("username", this.$store.state.currentUser);
      params.append("name", this.$refs.name.value);
      params.append("phone", this.$refs.phone.value);
      params.append("site", this.$refs.site.value);
      this.$ajax.post("/api/addSite", params).then(response => {
        if (response) alert("新地址添加成功！");
      });
    }
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
.btn {
  font-size: 12px;
  color: #fff;
  padding: 5px 20px;
  background: #ff1268;
  margin-left: 800px;
}
.site {
  margin-top: 30px;
}
.addSite {
  background: #eef1f3;
  margin-top: 10px;
  padding-top: 20px;
}
.addSite > div {
  margin: 20px;
}
.proName {
  width: 80px;
  text-align: right;
}
.btns > div {
  padding: 5px 10px;
  background: #ff1268;
  margin: 10px;
  text-align: center;
  color: #fff;
}
input {
  width: 300px;
  height: 20px;
}
</style>
