import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import SetO from './seto';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    texts: [],
    _texts: new SetO(),
    
    meta: {
      last_page: 0,
      current_page: 0,
    },
    current_text: null,
  },
  getters: {
    getTexts(state) {
      return state._texts.values();
    },
    getByIndex(state, id) {
      return state.texts.find((el) => el.id == id);
    },
    getCurrentPage(state){
      return state.meta.current_page;
    },
    getCurrentText(state) {
      return state.current_text;
    },
    completed({ meta }) {
      return 0 != meta.last_page && meta.last_page == meta.current_page;
    },
  },
  mutations: {
    SET_LOADED_TEXTS(state, texts) {
      state.texts = texts;
      texts.forEach((item) => state._texts.add(item));
      let temp = state._texts;
      state._texts = [];
      state._texts = temp;
      // state._texts.splice(state.meta.current_page, 0, texts);
    },
    SET_LOADED_TEXTS_PAGINATION(state, meta) {
      state.meta = meta;
    },
    SET_CURRENT_TEXT(state, text) {
      state.current_text = text;
    },
    SET_CURRENT_TEXT_TRADUCTION(state, traduction) {
      state;
      traduction;
    },
  },
  actions: {
    // actions.js

    async LOAD_TEXTS({ commit, state, getters }, page=null) {
      try {
        if (!getters.completed) {
          console.log(state);
          if(!page)
           page = state.meta.current_page + 1;
           else
            page = page+1;
          } else{
            page = state.meta.last_page;
          }
          // page = page <= state.meta.last_page ? page : state.meta.last_page;
          let response = await axios.get(`texts?page=${page}`);
          console.log(response);
          commit("SET_LOADED_TEXTS_PAGINATION", response.data.meta);
          commit("SET_LOADED_TEXTS", response.data.data);
      
      } catch (e) {
        console.log(e);
      }
    },

    async LOAD_TEXT_BY_ID({ commit }, id) {
      if (id == "create") {
        commit("SET_CURRENT_TEXT", { text: "", traductions: [], dirty: true, id:"create" });
        return;
      }
      try {
        let response = await axios.get(`texts/${id}`);
        console.log(response);
        commit("SET_CURRENT_TEXT", response.data.data);
      } catch (e) {
        console.log(e);
      }
    },

    async storeTraduction({ dispatch }, { id, textId, text, lang }) {
      let tid = !id || id === "create" ? "" : `/${id}`;
      let data = { text_id: textId, traduction: { text, lang } };
      try {
        let response;
        if (!id || id === "create") {
          response = await axios.post(`traductions${tid}`, data);
        } else response = await axios.put(`traductions${tid}`, data);
        console.log(response);
        //commit("SET_CURRENT_TEXT_TRADUCTION", response.data.data);
        dispatch("LOAD_TEXT_BY_ID", textId);
      } catch (e) {
        console.log(e);
      }
    },

    async storeText({ dispatch }, { id, text }) {
      let tid = !id || id === "create" ? "" : `/${id}`;
      let data = { text };
      try {
        let response;
        if (!id || id === "create") {
          response = await axios.post(`texts${tid}`, data);
        } else response = await axios.put(`texts${tid}`, data);
        console.log(response);
        //commit("SET_CURRENT_TEXT_TRADUCTION", response.data.data);
        dispatch("LOAD_TEXT_BY_ID", id);
        return response;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteTraduction({ dispatch }, { id, textId }) {
      try {
        let response;

        response = await axios.delete(`traductions/${id}`);
        console.log(response);
        //commit("SET_CURRENT_TEXT_TRADUCTION", response.data.data);
        dispatch("LOAD_TEXT_BY_ID", textId);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
