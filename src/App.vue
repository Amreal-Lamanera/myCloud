<template>
  <div v-if="logged" class="min-h-screen flex flex-col">
    <main-nav />
    <main class="grow pt-48 pb-16">
      <error-component :errorMsg="errorMsg" />
      <router-view v-slot="slotProps">
        <transition name="fade" mode="out-in">
          <component :is="slotProps.Component" :key="componentKey" />
        </transition>
      </router-view>
    </main>
    <main-footer />
  </div>
  <div class="pageLoading" ref="pageLoading" id="mainLoading" v-if="loading">
    <img :src="require('@/assets/img/loading.gif')" alt="" width="200">
  </div>
</template>

<script>
  import axios from 'axios';
  import Store from '@/store/index';
  import { API_CHECKLOGGED_URL } from '/config.js';
  import MainNav from '@/components/MainNav.vue';
  import MainFooter from '@/components/MainFooter';
  import ErrorComponent from '@/components/ErrorComponent';

  export default {
    components: {
      MainNav,
      MainFooter,
      ErrorComponent,
    },
    data() {
      return {
        errorMsg: ''
      }
    },
    computed: {
      logged() {
        return Store.state.logged;
      },
      loading() {
        return Store.state.loading;
      },
      // triggera la transition anche se il componente è lo stesso
      componentKey() {
        return Store.state.componentKey;
      },
    },
    methods: {
      async checkLogged() {
        try {
          // Esegui la chiamata API utilizzando axios
          const response = await axios.get(API_CHECKLOGGED_URL);
          // console.log(response);

          if (!response.data.logged) {
            window.location.href = '../login/login.php';
          } else {
            Store.commit('setLogged', true);
            Store.commit('setUsername', response.data.username);
            if (response.data.superuser == true) {
              Store.commit('setSuperuser', true);
            }
          }
        } catch (error) {
          this.errorMsg = 'Si è verificato un errore, contattare l\'amministratore. Errore: ' + error;
        }
      },
    },
    async beforeMount() {
      await this.checkLogged();
    },
  }

</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease-in-out;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateX(0px);
  }

  .pageLoading {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
  }
</style>
