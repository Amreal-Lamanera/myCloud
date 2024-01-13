<template>
  <div v-if="logged" class="min-h-screen flex flex-col">
    <nav>
      <router-link :to="{ name: 'home'}">
        Homepage
      </router-link> |
      <router-link :to="{ name: 'LeTueFoto'}">
        Le foto di: {{ username }}
      </router-link> |
      <span v-if="superuser">
        <router-link :to="{ name: 'all'}">
          Tutte le foto
        </router-link> |
      </span>
      <router-link :to="{ name: 'public'}">
        Foto pubbliche
      </router-link> |
      <router-link to="/upload">
        Upload
      </router-link> |
      <a href="../" title="Vai alla homepage di francescopieraccini.it">
        francescopieraccini.it
      </a> |
      <a href="#" title="Effettua il logout" @click="logout" class="cursor-pointer">
        Logout
      </a>
      <span v-if="superuser">
        |
        <a v-if="superuser" :href="cpanel_url" title="Vai al pannello di controllo">
          C-panel
        </a>
      </span>
    </nav>
    <main class="grow">
      <div v-if="errorMsg" class="p-4">
        <span 
          class="
            text-xl 
            text-red-500 
            bg-gray-200 
            p-3 
            border-4 
            border-red-500
            flex
          "
        >
            {{ errorMsg}}
          </span>
      </div>
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
  import MainFooter from '@/components/MainFooter';
  import { API_CHECKLOGGED_URL, CPANEL_URL, API_LOGOUT_URL } from '/config.js';

  export default {
    components: {
      MainFooter
    },
    data() {
      return {
        cpanel_url: CPANEL_URL,
        errorMsg: ''
      }
    },
    computed: {
      logged() {
        return Store.state.logged;
      },
      superuser() {
        return Store.state.superuser;
      },
      username() {
        return Store.state.username;
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
      async logout() {
        try {
          // Esegui la chiamata API per il logout
          const response = await axios.get(API_LOGOUT_URL);

          if(response.data) {
            window.location.href = '../login/login.php';
          } else {
            this.errorMsg = "Qualcosa è andato storto! Contattare l'amministratore";
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
