<template>
    <div class="center detailsPage">
        <abstract :goods="this.$route.params.goods"></abstract>
        <details-div></details-div>
    </div>
</template>

<script>
import abstract from "./abstract"
import details from "./details"
export default {
    components:{
        abstract:abstract,
        detailsDiv:details
    }
}
</script>

<style scoped>
.detailsPage{
    border:1px solid #dddddd;
    border-top:none;
    margin-bottom: 30px;
}
</style>
