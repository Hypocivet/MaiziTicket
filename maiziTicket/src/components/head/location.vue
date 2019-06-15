<template>
  <div class="location flex" ref="location" @mouseenter="block=!block" @mouseleave="block=!block">
    <img src="../../assets/header/location.png" alt class="local">
    <div>{{city}}</div>
    <img src="../../assets/header/drop-down.png" alt class="drop">
    <div class="place" v-show="block">
      <div>
        <div class="flex">
          <div class="type">当前城市：</div>
          <div class="choose position1 fontCenter">{{city}}</div>
        </div>
        <div class="flex">
          <div class="type">热门城市：</div>
          <div class="position2 flex">
            <div
              v-for="hotcity in hotCity"
              :key="hotcity"
              class="fontCenter"
              @click="filter(hotcity)"
            >{{hotcity}}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex">
          <div class="type">其他城市：</div>
          <div class="position3 flex">
            <div
              v-for="othercity in otherCity"
              :key="othercity"
              class="fontCenter"
              @click="filter(othercity)"
            >{{othercity}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      block: false,
      city: "全国",
      hotCity: [
        "全国",
        "北京",
        "上海",
        "深圳",
        "广州",
        "杭州",
        "天津",
        "重庆",
        "成都",
        "香港"
      ],
      otherCity: [
        "上海",
        "北京",
        "深圳",
        "杭州",
        "天津",
        "武汉",
        "成都",
        "广州",
        "重庆",
        "西安",
        "南京",
        "苏州",
        "宁波",
        "长沙",
        "厦门",
        "香港",
        "郑州",
        "济南",
        "青岛",
        "合肥",
        "昆明",
        "无锡",
        "贵阳",
        "石家庄",
        "哈尔滨",
        "太原",
        "南昌",
        "绍兴",
        "宜昌",
        "常州",
        "沈阳",
        "佛山",
        "南宁",
        "包头",
        "福州",
        "呼和浩特",
        "长春",
        "大连",
        "河源",
        "珠海",
        "东莞",
        "海口",
        "南通",
        "廊坊",
        "澳门",
        "江门",
        "兰州",
        "烟台",
        "桂林",
        "黄冈",
        "泉州",
        "中山",
        "扬州",
        "惠州",
        "嘉兴",
        "金华",
        "台州",
        "唐山",
        "大同",
        "泰州",
        "潍坊",
        "遵义",
        "邯郸",
        "丽水",
        "柳州",
        "银川",
        "保定",
        "长治",
        "黄石",
        "晋中",
        "荆州",
        "马鞍山",
        "眉山",
        "绵阳",
        "南充",
        "秦皇岛",
        "温州",
        "乌鲁木齐",
        "芜湖",
        "湘潭",
        "新乡",
        "徐州",
        "张家口",
        "自贡",
        "阿坝",
        "鞍山",
        "安庆",
        "安顺",
        "昌吉",
        "大理",
        "德阳",
        "广安",
        "湖州",
        "济宁",
        "荆门",
        "九江",
        "洛阳",
        "三门峡",
        "三亚",
        "汕头",
        "韶关",
        "遂宁",
        "台北",
        "泰安",
        "西宁",
        "运城",
        "湛江",
        "漳州",
        "肇庆",
        "淄博"
      ]
    };
  },
  methods: {
    filter(city) {
      this.city = city;
      this.$router.push({ name: "filter", params: { city: this.city } });
    }
  }
};
</script>

<style scoped>
.location {
  position: relative;
  margin-top: 25px;
  cursor: pointer;
}
.local {
  height: 20px;
  margin-top: 5px;
}
.location > div:nth-child(2) {
  border: 5px solid transparent;
  box-sizing: border-box;
}
.drop {
  height: 6px;
  margin-top: 12px;
}
.place {
  height: 500px;
  width: 800px;
  position: absolute;
  left: -30px;
  top: 30px;
  border: 1px solid #f0f0f0;
  background: #ffffff;
  z-index: 2;
}
.place > div {
  margin: 20px;
}
.place > div > div {
  padding: 15px 0;
  justify-content: space-between;
}
.place > div:nth-child(1) {
  border-bottom: 1px solid #f0f0f0;
}
.type {
  padding: 5px;
}
.position1 {
  position: relative;
  left: -600px;
}
.position2 {
  position: relative;
  left: -30px;
}
.position2 > div {
  margin: 0 10px;
}
.choose {
  text-align: center;
  background: #fff4f8;
  color: #ff1268;
}
.fontCenter {
  border: 5px solid transparent;
  box-sizing: border-box;
}
.fontCenter:hover {
  color: #ff1268;
}
.position3 {
  position: relative;
  left: -40px;
  width: 600px;
  height: 300px;
  flex-wrap: wrap;
}
</style>
