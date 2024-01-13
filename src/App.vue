<template>
  <div v-if="logged" class="min-h-screen flex flex-col">
    <main-nav />
    <main class="grow">
      <error-component :errorMsg="errorMsg" />
      <router-view v-slot="slotProps">
        <transition name="fade" mode="out-in">
          <component :is="slotProps.Component" />
        </transition>
      </router-view>
    </main>
    <main-footer />
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

  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &:hover, &.router-link-exact-active {
        color: #42b983;
      }
    }
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
</style>
