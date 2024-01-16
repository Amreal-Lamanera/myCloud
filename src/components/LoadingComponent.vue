<template>
    <div class="pageLoading" id="mainLoading" v-if="loading">
        <img :src="require('@/assets/img/loading.gif')" alt="" width="200">
    </div>
</template>

<script>

    export default{
        name: 'LoadingComponent',
        computed: {
            loading() {
                return this.$store.state.loading;
            },
        },
    }

</script>
