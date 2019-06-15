<template>
  <div class="buyer">
    <div class="title">常用购票人</div>
    <div class="content">
      <div>
        <span class="btn pointer" @click="add = true">新增购票人</span>
      </div>
      <div class="table" v-show="!add">
        <table cellspacing="1">
          <tr class="head">
            <th>序号</th>
            <th>姓名</th>
            <th>证件类型</th>
            <th>证件号</th>
            <th>操作</th>
          </tr>
          <tr v-for="(buyer,index) in buyers" :key="index">
            <td>{{index+1}}</td>
            <td>{{buyer.name}}</td>
            <td>{{buyer.type}}</td>
            <td>{{buyer.number}}</td>
            <td class="del pointer" @click="delBuyer(buyer.number)">删除</td>
          </tr>
        </table>
      </div>
      <div v-show="add" class="addPage">
        <div class="addPageTitle">新增购票人</div>
        <div class="flex pro">
          <div class="proName">姓名：</div>
          <div>
            <input type="text" ref="name" placeholder="请输入购票人姓名">
          </div>
        </div>
        <div class="flex pro">
          <div class="proName">证件类型：</div>
          <div>
            <select name="type" ref="type">
              <option :value="type" v-for="(type ,index) in types" :key="index">{{type}}</option>
            </select>
          </div>
        </div>
        <div class="flex pro">
          <div class="proName">证件号码：</div>
          <div>
            <input type="text" ref="number" placeholder="请输入证件号码">
          </div>
        </div>
        <div class="flex pro sBtns">
          <div class="sBtn pointer" @click="addBuyer">保存</div>
          <div class="sBtn pointer" @click="add=!add">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      add: false,
      buyers: [],
      types: ["身份证", "护照", "港澳通行证", "台胞证"]
    };
  },
  mounted() {
    var params = new URLSearchParams();
    params.append("username", this.$store.state.currentUser);
    this.$ajax.post("/api/getBuyer", params).then(response => {
      this.buyers = response.data;
    });
  },
  methods: {
    delBuyer(number) {
      var params = new URLSearchParams();
      params.append("username", this.$store.state.currentUser);
      params.append("number", number);
      this.$ajax.post("/api/delBuyer", params).then(response => {
        alert("删除成功！");
      });
    },
    addBuyer() {
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      var date = new Date();
      if (reg.test(this.$refs.number.value)) {
        var params = new URLSearchParams();
        params.append("username", this.$store.state.currentUser);
        params.append("name", this.$refs.name.value);
        params.append("type", this.$refs.type.value);
        params.append("number", this.$refs.number.value);
        params.append(
          "id",
          this.$store.state.currentUser +
            date.getFullYear() +
            (date.getMonth() + 1) +
            date.getDate() +
            date.getHours() +
            date.getMinutes()
        );
        this.$ajax.post("/api/addBuyer", params).then(response => {
          alert("添加成功！");
        });
      } else alert("请输入正确的证件号码！");
    }
  }
};
</script>

<style scoped>
.buyer {
  text-align: center;
  min-height: 300px;
}
.title {
  padding: 20px;
  border-bottom: 1px solid #dddddd;
  text-align: left;
}
.content {
  margin: 10px;
}
.btn {
  margin-left: 800px;
  font-size: 12px;
  color: #fff;
  background: #ff1268;
  padding: 3px;
  border-radius: 5px;
}
.table {
  margin: 30px;
  width: 88.8%;
  background: #d5d5d5;
}
th {
  background: #e3e3e3;
  padding: 5px 60px;
  font-weight: 10;
}
td {
  background: #fff;
  padding: 5px 10px;
}
.del {
  color: #2f97b4;
}
.addPage {
  margin-top: 30px;
  padding: 0 30px;
  width: 93%;
  border: 1px solid #e3e3e3;
}
.addPageTitle {
  width: 100px;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-bottom: 5px solid #ff1268;
}
.pro {
  margin: 10px;
}
.proName {
  width: 100px;
  text-align: right;
}
select {
  width: 160px;
  height: 22px;
}
.sBtns {
  margin-left: 90px;
}
.sBtn {
  padding: 5px 10px;
  background: #ff1268;
  margin: 10px 20px;
  border-radius: 5px;
  color: #fff;
}
</style>
