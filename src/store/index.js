import { createStore } from 'vuex'

export default createStore({
  state: {
    logged: false,
    superuser: false,
    special_guess_type: '',
    username: '',
    error: '',
    page: 0,
    redirect: '',
    loading: true,
    componentKey: 0,
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
    setSpecialGuessType(state, value) {
      state.special_guess_type = value;
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
    setLoading(state, value) {
      state.loading = value;
    },
    incrementComponentKey(state) {
      state.componentKey++;
    },
  },
  actions: {
  },
  modules: {
  },
})
