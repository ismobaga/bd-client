import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    async signIn({ dispatch }, creds) {
      let response = await axios.post("auth/signin", creds);
      console.log(response);

      return dispatch("attempt", response.data.access_token);
    },
    async attempt({ commit, state }, token) {
      if (token) commit("SET_TOKEN", token);
      if (!state.token) return;

      try {
        let response = await axios.get("auth/me");

        commit("SET_USER", response.data);
      } catch (e) {
        console.log("failed");
        commit("SET_USER", null);
        commit("SET_TOKEN", null);
      }
    },
    async signOut({ commit }) {
      return axios.post("auth/signout").then(() => {
        commit("SET_USER", null);
        commit("SET_TOKEN", null);
      });
    },
  },
};
