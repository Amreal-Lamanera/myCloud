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
  <teleport to='body'>
    <loading-component />
  </teleport>
</template>

<script>
  import axios from 'axios';
  import { API_CHECKLOGGED_URL } from '/config.js';

  export default {
    data() {
      return {
        errorMsg: ''
      }
    },
    computed: {
      logged() {
        return this.$store.state.logged;
      },
      // triggera la transition anche se il componente è lo stesso
      componentKey() {
        return this.$store.state.componentKey;
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
            console.log(response.data);
            this.$store.commit('setLogged', true);
            this.$store.commit('setUsername', response.data.username);
            if (response.data.superuser == true) {
              this.$store.commit('setSuperuser', true);
            }
            if (response.data.special_guess) {
              this.$store.commit('setSpecialGuessType', response.data.special_guess);
            }
            console.log(this.$store.state.special_guess_type)
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
