<template>
    <router-link :to="{name:'details',params:{goods:goods}}" class="goods flex">
        <img :src="goods.poster" alt="" class="img pointer">
        <div>
            <div class="name pointer">{{goods.name}}</div>
            <div class="details flex"><div class="placeIcon icon"></div>{{goods.place}}</div>
            <div class="details flex"><div class="timeIcon icon"></div>{{goods.time}}</div>
            <div class="price">￥{{getPrice()}}起</div>
        </div>
    </router-link>
</template>

<script>
export default {
    props:['goods'],
    methods:{
        getPrice(){
            return this.goods.price.split(" ")[0];
        }
    }
}
</script>

<style scoped>
.goods{
    height:206px;
    overflow: hidden;
    margin:30px;
    padding:22px 0;
    border-bottom: 1px dashed lightgrey;
}
.img{
    width:153px;
    height:206px;
    margin-right: 30px;
}
.name{
    font-size:20px;
    font-weight: bolder;
}
.name:hover{
    color: #ff1268;
}
.details{
    margin:10px 0;
    font-size: 12px;
    color: grey;
}
.price{
    color: #ff1268;
}
.icon{
    width:15px;
    height:15px;
    margin-right: 5px;
}
.placeIcon{
    background: url("../../assets/body/icon2.png") no-repeat -1px -84px;
}
.timeIcon{
    background: url("../../assets/body/icon2.png") no-repeat 0px -45px;
}
</style>
