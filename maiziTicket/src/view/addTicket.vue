<template>
  <div class="center add">
    <div class="title">添加商品：{{this.$route.params.type}}</div>
    <div class="form">
      <div class="flex pro">
        <div class="proName">选择海报：</div>
        <div>
          <input type="file" @change="img2base64($event,getPoster)" ref="poster">
        </div>
      </div>
      <div class="flex pro">
        <div class="proName">名称：</div>
        <div>
          <input type="text" ref="name">
        </div>
        <div></div>
      </div>
      <div class="flex pro">
        <div class="proName">地点：</div>
        <div>
          <input type="text" ref="place">
        </div>
        <div></div>
      </div>
      <div class="flex pro">
        <div class="proName">时间：</div>
        <div>
          <input type="date" ref="time">
        </div>
        <div></div>
      </div>
      <div class="flex pro">
        <div class="proName">价格：</div>
        <div>
          <input type="text" ref="price">
        </div>
        <div></div>
      </div>
      <div class="flex pro">
        <div class="proName">城市：</div>
        <div>
          <input type="text" ref="city">
        </div>
      </div>
      <div>
        <div class="pointer btn" @click="add">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      poster: "poster"
    };
  },
  methods: {
    add() {
      var params = new URLSearchParams();
      var date = new Date();
      var time = new Date(this.$refs.time.value);
      params.append(
        "ticketId",
        date.getFullYear() +
          (date.getMonth() + 1).toString() +
          date.getDate() +
          (Math.round(Math.random() * 900) + 100).toString()
      );
      params.append("poster", this.poster);
      params.append("name", this.$refs.name.value);
      params.append("place", this.$refs.place.value);
      params.append(
        "time",
        time.getFullYear() + "." + (time.getMonth() + 1) + "." + time.getDate()
      );
      params.append("price", this.$refs.price.value);
      params.append("type", this.$route.params.type);
      params.append("city", this.$refs.city.value);
      this.$ajax.post("/api/addTicket", params).then(response => {
        if (response.data) {
          this.$router.push({
            name: "success",
            params: {
              text: "添加"
            }
          });
        }
      });
    },
    img2base64(e,callback) {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        callback(e.target.result);
      }
    },
    getPoster(poster){
      this.poster = poster;
    }
  }
};
</script>

<style scoped>
.add {
  border: 1px solid #e3e3e3;
  margin-bottom: 20px;
}
.title {
  padding: 20px;
  border-bottom: 1px solid #e3e3e3;
}
.form {
  padding: 40px;
}
.pro {
  margin: 10px;
}
.proName {
  width: 200px;
  text-align: right;
}
.btn {
  margin-left: 210px;
  padding: 10px 20px;
  background-color: #ff1268;
  border-radius: 5px;
  color: #fff;
  width: 100px;
  text-align: center;
}
input {
  width: 200px;
}
</style>
