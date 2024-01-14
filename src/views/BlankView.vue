<template>
    <div class="pageLoading" id="layover-loading">
        <img :src="require('@/assets/img/loading.gif')" alt="" width="200">
    </div>
</template>

<script>
import Store from '@/store/index';

  export default {
    mounted() {
      document.title = 'myCloud';
    },
    beforeMount() {
      if (Store.state.redirect) {
        const redirect = Store.state.redirect;
        Store.commit('setRedirect', '');
        this.$router.replace({ name: redirect });
      } else {
        this.$router.replace({ name: 'home' });
      }

    }
  }
</script>