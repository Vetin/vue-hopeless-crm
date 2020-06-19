import firebase from 'firebase/app';

export default {
  state: () => ({
    info: {},
  }),
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
    updateInfo(state, data) {
      state.info = {
        ...state.info,
        ...data,
      };
    },
  },

  actions: {
    async fetchInfo({ dispatch, commit }) {
      const userId = await dispatch('getUserId');
      const info = (
        await firebase
          .database()
          .ref(`/users/${userId}/info`)
          .once('value')
      ).val();
      commit('setInfo', info);
      return info;
    },
    async updateInfo({ commit, dispatch }, data) {
      try {
        const userId = await dispatch('getUserId');
        await firebase
          .database()
          .ref(`/users/${userId}/info`)
          .update(data);
        commit('updateInfo', data);
        return data;
      } catch (error) {
        dispatch('setError', error);
        throw new Error(error);
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
