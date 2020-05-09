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
      console.log(info);
      commit('setInfo', info);
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
