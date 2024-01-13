import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false,
    superuser: false,
    username: '',
  },
  getters: {
  },
  mutations: {
    setLogged(state, value) {
      state.logged = value;
    },
    setSuperuser(state, value) {
      state.superuser = value;
    },
    setUsername(state, value) {
      state.username = value;
    }
  },
  actions: {
  },
  modules: {
  },
})
