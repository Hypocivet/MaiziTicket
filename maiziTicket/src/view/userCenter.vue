<template>
    <div class="center userCenter flex">
        <div class="tabs">
            <div class="tab pointer flex" v-for="(tab,index) in tabs" :key="index" @click="choose(tab)" v-bind:class="{cBorder:cTab===tab}">
                <div class="text">{{tab}}</div>
                <div class="arrows" v-show="cTab===tab">></div>
                </div>
        </div>
        <div class="content">
            <user-info v-show="cTab==='个人信息'"></user-info>
            <account v-show="cTab==='账号设置'"></account>
            <buyer v-show="cTab==='常用购票人'"></buyer>
            <site v-show="cTab==='收货地址'"></site>
            <order v-show="cTab==='订单管理'"></order>
        </div>
    </div>
</template>

<script>
import userInfo from "../components/user/userInfo"
import account from "../components/user/account"
import buyer from "../components/user/buyer"
import site from "../components/user/site"
import order from "../components/user/order"
export default {
    data(){
        return{
            tabs:[
                "个人信息",
                "账号设置",
                "常用购票人",
                "收货地址",
                "订单管理"
            ],
            cTab:"个人信息"
        }
    },
    methods:{
        choose(tab){
            this.cTab = tab;
        }
    },
    components:{
        userInfo:userInfo,
        account:account,
        buyer:buyer,
        site:site,
        order:order
    }
}
</script>

<style scoped>
.userCenter{
    border:1px solid #dddddd;
    margin-top:30px;
}
.userCenter div{
    box-sizing: border-box;
}
.tabs{
    width:20%;
    border-right: 1px solid #dddddd;
}
.content{
    width:80%;
}
.tab{
    padding:20px;
    text-align: center;
    border-bottom: 1px solid #dddddd;
    position: relative;
}
.tab:hover{
    border-left:3px solid #ff1268;
    background: #f6f6f6;
}
.cBorder{
    border-left:3px solid #ff1268;
}
.text{
    width:100%;
    height:100%;
}
.arrows{
    position: absolute;
    right:20px;
    color: skyblue;
}
</style>
