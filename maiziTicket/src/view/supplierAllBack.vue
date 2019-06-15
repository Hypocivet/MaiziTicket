<template>
    
</template>

<script>
export default {
    data(){
            this.$router.replace({
                path:"/filter",
                name:this.$route.params.name,
                params:{
                    goods:this.$route.params.goods
                }
            })
    }
}
</script>

<style scoped>

</style>
