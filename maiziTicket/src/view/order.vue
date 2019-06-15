<template>
    <div class="order center">
        <order-plan></order-plan>
        <router-view></router-view>
    </div>
</template>

<script>
import orderPlan from "../components/order/orderPlan"
export default {
    components:{
        orderPlan:orderPlan
    }
}
</script>

<style scoped>
.order{
    margin-top:20px;
}
</style>
