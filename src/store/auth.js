import firebase from 'firebase/app';

export default {
  state: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({}, { email, password }) {
      try {
        const resp = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        return resp;
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const userId = await dispatch('getUserId');
        await firebase
          .database()
          .ref(`/users/${userId}/info`)
          .set({
            bill: 1000,
            locale: 'ru-RU',
            name,
          });
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async getUserId({ rootState, commit }) {
      if (rootState.userId === null) {
        const user = await firebase.auth().currentUser;
        commit('setUserId', user.uid);
        return user ? user.uid : null;
      }
      return rootState.userId;
    },
    async logout({ commit }) {
      commit('clearInfo');
      await firebase.auth().signOut();
    },
  },
  getters: {},
};
