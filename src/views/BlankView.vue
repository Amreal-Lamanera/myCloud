<template>
    <div class="pageLoading" id="layover-loading">
        <img :src="require('@/assets/img/loading.gif')" alt="" width="200">
    </div>
</template>

<script>

  export default {
    mounted() {
      document.title = 'myCloud';
    },
    beforeMount() {
      if (this.$store.state.redirect) {
        const redirect = this.$store.state.redirect;
        this.$store.commit('setRedirect', '');
        this.$router.replace({ name: redirect });
      } else {
        this.$router.replace({ name: 'home' });
      }

    }
  }
</script>