<template>
  <div v-if="logged" class="min-h-screen flex flex-col">
    <nav>
      <router-link to="/">Le foto di: {{ username }}</router-link> |
      <span v-if="superuser"><router-link :to="{ name: 'all', params: { superuser: superuser }}">Tutte le foto</router-link> | </span>
      <router-link :to="{ name: 'public', params: { forAll: true }}">Foto pubbliche</router-link> |
      <router-link to="/upload">Upload</router-link> |
      <a href="../">francescopieraccini.it</a> |
      <a :href="logout_url">Logout</a> |
      <a v-if="superuser" :href="cpanel_url">C-panel</a>
    </nav>
    <router-view v-slot="slotProps" class="grow">
      <transition name="fade" mode="out-in">
        <component :is="slotProps.Component" :username="username" />
      </transition>
    </router-view>
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
        logout_url: API_LOGOUT_URL,
      }
    },
    computed: {
      logged() {
        console.log('**** STATE ****');
        console.log(Store.state.logged);
        return Store.state.logged;
      },
      superuser() {
        console.log('**** STATE ****');
        console.log(Store.state.superuser);
        return Store.state.superuser;
      },
      username() {
        console.log('**** STATE ****');
        console.log(Store.state.username);
        return Store.state.username;
      },
    },
    methods: {
      async checkLogged() {
        try {
          // Esegui la chiamata API utilizzando axios
          const response = await axios.get(API_CHECKLOGGED_URL);
          console.log(response);

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
          console.error('Errore durante la chiamata API:', error);
        }
      },
    },
    async beforeMount() {
      await this.checkLogged();
      console.log(process.env.BASE_URL)
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

    &.router-link-exact-active {
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
