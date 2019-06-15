<template>
  <div class="condition">
    <div class="border flex">
      <div class="pad">城市：</div>
      <div>
        <div class="flex cDiv">
          <div
            v-bind:class="{choose:cityChoose==='全部'}"
            class="height pointer"
            @click="cityChange('全部')"
          >全部</div>
          <div class="all flex">
            <div
              v-for="(city,index) in city"
              :key="index"
              class="one pad pointer"
              @click="cityChange(city)"
              v-bind:class="{choose:cityChoose===city}"
            >{{city}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="border flex">
      <div class="pad">分类：</div>
      <div>
        <div class="flex cDiv">
          <div
            v-bind:class="{choose:typeChoose==='全部'}"
            class="height pointer"
            @click="typeChange('全部')"
          >全部</div>
          <div class="all flex">
            <div
              v-for="(type,index) in type"
              :key="index"
              class="one pad pointer"
              @click="typeChange(type)"
              v-bind:class="{choose:typeChoose===type}"
            >{{type}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="border flex">
      <div class="pad">时间：</div>
      <div>
        <div class="flex cDiv">
          <div
            v-bind:class="{choose:timeChoose==='全部'&&startTime===''&&endTime===''}"
            class="height pointer"
            @click="timeChange('全部')"
          >全部</div>
          <div class="all flex">
            <div
              v-for="(time,index) in time"
              :key="index"
              class="one pad pointer"
              @click="timeChange(time)"
              v-bind:class="{choose:timeChoose===time&&startTime===''&&endTime===''}"
            >{{time}}</div>
            <!-- <div class="flex">
              <span class="pad">按时间段：</span>
              <input type="date" class="date pad" v-model="startTime">
              <span class="pad">到</span>
              <input type="date" class="date pad" v-model="endTime">
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <div class="btn pad pointer" @click="empty()">清除所选</div>
      <div class="btn pad pointer" @click="query()">查询</div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      cityChoose: "全部",
      typeChoose: "全部",
      timeChoose: "全部",
      startTime: "",
      endTime: "",
      city: [
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
      ],
      type: [
        "演唱会",
        "话剧歌剧",
        "体育赛事",
        "儿童亲子",
        "度假休闲",
        "音乐会",
        "曲苑杂坛",
        "舞蹈芭蕾",
        "动漫",
        "旅游展览"
      ],
      time: ["今天", "明天", "本周末", "一个月内"]
    };
  },
  methods: {
    cityChange: function(city) {
      this.cityChoose = city;
    },
    typeChange: function(type) {
      this.typeChoose = type;
    },
    timeChange: function(time) {
      this.timeChoose = time;
      this.startTime = "";
      this.endTime = "";
    },
    empty: function() {
      this.cityChoose = "全部";
      this.typeChoose = "全部";
      this.timeChoose = "全部";
      this.startTime = "";
      this.endTime = "";
    },
    //查询请求
    query: function() {
      var sql = "select * from ticket";
      if (
        this.cityChoose != "全部" ||
        this.typeChoose != "全部" ||
        this.timeChoose != "全部"
      ) {
        sql += " where ";
        if (this.cityChoose != "全部") sql += 'city="' + this.cityChoose + '"';
        if (this.typeChoose != "全部") {
          if (this.cityChoose != "全部") sql += " and ";
          sql += 'type="' + this.typeChoose + '"';
        }
        if (this.timeChoose != "全部") {
          if (this.typeChoose != "全部") sql += " and ";
          var date = new Date();
          switch (this.timeChoose) {
            case "今天": {
              sql +=
                'time="' +
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate() +
                '"';
              break;
            }
            case "明天": {
              sql +=
                'time="' +
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                (date.getDate() + 1) +
                '"';
              break;
            }
            case "本周末": {
              sql +=
                'time between "' +
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                (this.showWeekLastDay() - 1) +
                '"and"' +
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                this.showWeekLastDay() +
                '"';
              break;
            }
            case "一个月内": {
              sql +=
                'time between "' +
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                this.showMonthFirstDay() +
                '"and"' +
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                this.showMonthLastDay() +
                '"';
              break;
            }
          }
        }
      }
      console.log(sql)
      var params = new URLSearchParams();
      params.append("sql",sql);
      this.$ajax.post("/api/getInfoByUser",params).then(response=>{
        this.$emit("query",response.data)
      })
    },
    showMonthFirstDay() {
      var Nowdate = new Date();
      var MonthFirstDay = new Date(Nowdate.getYear(), Nowdate.getMonth(), 1);
      return MonthFirstDay.getDate();
    },
    showMonthLastDay() {
      var Nowdate = new Date();
      var MonthNextFirstDay = new Date(
        Nowdate.getYear(),
        Nowdate.getMonth() + 1,
        1
      );
      var MonthLastDay = new Date(MonthNextFirstDay - 86400000);
      return MonthLastDay.getDate();
    },
    showWeekLastDay() {
      var Nowdate = new Date();
      var WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
      var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
      return WeekLastDay.getDate();
    }
  },
  mounted() {
    if (typeof this.$route.params.city != "undefined") {
      this.cityChoose = this.$route.params.city;
    }
    if (typeof this.$route.params.type != "undefined") {
      this.typeChoose = this.$route.params.type;
    }
  }
};
</script>

<style scoped>
.condition {
  border: 1px solid lightgrey;
  margin-top: 20px;
}
.condition > div {
  margin: 0 20px;
  padding: 20px;
}
.border {
  border-bottom: 1px dashed lightgrey;
}
.pad {
  padding: 5px;
}
.none {
  color: transparent;
}
.more {
  cursor: pointer;
  color: grey;
}
.more:hover {
  color: red;
}
.cDiv > div {
  padding: 5px;
}
.choose {
  background: #ff1268;
  color: #ffffff;
}
.all {
  width: 950px;
  flex-wrap: wrap;
  margin-top: -5px;
}
.height {
  height: 21px;
}
.one {
  margin-right: 20px;
}
.btn {
  margin: 0 200px;
  width: 100px;
  height: 40px;
  background: #ff1268;
  color: #ffffff;
  border: 5px solid transparent;
  box-sizing: border-box;
  text-align: center;
}
</style>
