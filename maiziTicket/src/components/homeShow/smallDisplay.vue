<template>
    <div class="flex small">
        <sd-div v-for="(good,index) in goods" v-if="index<6" :key="index" :goods="good"></sd-div>
    </div>
</template>

<script>
import sdDiv from "./sdDiv"

export default {
    props:['goods'],
    components:{
        sdDiv:sdDiv
    }
}
</script>

<style scoped>
.small{
    flex-wrap: wrap;
    width:850px;
}
</style>
