import firebase from 'firebase/app';

export default {
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
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
            name,
          });
      } catch (error) {
        throw new Error(error.code);
      }
    },
    async getUserId() {
      const user = await firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    async logout({commit}) {
      commit('clearInfo');
      await firebase.auth().signOut();
    },
  },
  getters: {},
};
