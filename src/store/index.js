import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false,
    superuser: false,
    username: '',
    error: '',
    page: 0,
    redirect: '',
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
    },
    setError(state, value) {
      state.error = value;
    },
    setPage(state, value) {
      state.page = value;
    },
    setRedirect(state, value) {
      state.redirect = value;
    },
  },
  actions: {
  },
  modules: {
  },
})
