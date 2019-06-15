<template>
<div class="loginPage">
    <div class="background center">
        <router-view class="form"></router-view>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.loginPage{
    width:100%;
    height:600px;
    background:black;
}
.background{
    height:100%;
    background:url("../../assets/body/login/loginBackground.png") no-repeat;
    position: relative;
}
.form{
    width:300px;
    height:300px;
    background:rgba(211,211,211,0.5);
    position:absolute;
    right:50px;
    top:150px;
    border-radius: 10px;
}
</style>
