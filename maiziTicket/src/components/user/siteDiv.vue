<template>
  <div class="site">
    <div class="flex">
      <div class="operation flex">
        <div class="alert pointer" @click="alter = true">修改</div>
        <div>|</div>
        <div class="del pointer" @click="delSite">删除</div>
      </div>
    </div>
    <div class="flex text">
      <div>
        <div>{{site.name}} {{site.phone}}</div>
        <div>{{site.site}}</div>
      </div>
      <div v-show="site.choose==='1'" class="first">首选地址</div>
    </div>
    <div class="notice" v-show="site.choose==='1'">下单时默认使用此地址作为收货地址，您可以在订单确认时选用其他地址。</div>
    <div v-show="alter" class="alterForm">
        <div class="flex">
            <div class="proName">收件人：</div>
            <div><input type="text" ref="name" :value="site.name"></div>
        </div>
        <div class="flex">
            <div class="proName">手机：</div>
            <div><input type="text" ref="phone" :value="site.phone"></div>
        </div>
        <div class="flex">
            <div class="proName">配送地址：</div>
            <div><input type="text" ref="site" :value="site.site"></div>
        </div>
        <div class="flex btns">
            <div @click="alterSite" class="pointer">保存地址</div>
            <div @click="alter=!alter" class="pointer">取消</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            alter:false
        }
    },
  props: ["site"],
  methods: {
    delSite() {
      var params = new URLSearchParams();
      params.append("id", this.site.id);
      this.$ajax.post("/api/delSite", params).then(response => {
        if (response) alert("收货地址删除成功！");
      });
    },
    alterSite() {
      var params = new URLSearchParams();
      params.append("id", this.site.id);
      params.append("name",this.$refs.name.value);
      params.append("phone",this.$refs.phone.value);
      params.append("site",this.$refs.site.value);
      this.$ajax.post("/api/alterSite", params).then(response => {
        if (response) alert("收货地址修改成功！");
      });
    }
  }
};
</script>

<style scoped>
.site {
  border: 1px solid #e3e3e3;
}
.operation {
  margin: 10px 0 0 800px;
  font-size: 15px;
}
.alert,
.del {
  margin: 0 15px;
  color: #2f97b4;
}
.text>div:nth-child(1) {
  margin: 10px 30px 30px 30px;
}
.text{
    position: relative;
}
.first {
  font-weight: bold;
  color: #dadada;
  font-size: 14px;
  position:absolute;
  top:30px;
  right:50px;
}
.notice {
  background: #eff2f4;
  border-top: 1px solid #e3e3e3;
  padding: 10px 20px;
}
.alterForm{
    margin-left: 30px;
}
.alterForm>div{
    margin:20px;
}
.proName{
    width:80px;
    text-align: right;
}
.btns>div{
    padding:5px 10px;
    background:#ff1268;
    margin:10px;
    text-align: center;
    color: #fff;
}
input{
    width:300px;
    height:20px;
}
</style>
