/* eslint-disable import/no-unresolved */
import Vue from 'vue';
import Vuex from 'vuex';
// import user from './modules/user';
import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],

  state: {
    data: {},
  },

  getters: {
    getSubmitData: (state) => ({
      ...state.data,
    }),
  },

  mutations: {
    initState(state) {
      const { experimentType } = state.data;
      state.data = {
        experimentType, // delete everything except exp type
      };
    },

    updateFields(state, data) {
      state.data = { ...state.data, ...data };
    },
  },
});
