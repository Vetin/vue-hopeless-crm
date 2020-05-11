import firebase from 'firebase/app';

export default {
  state: () => ({
    records: null,
  }),
  mutations: {
    initRecords(state, records) {
      state.records = records;
    },
  },
  actions: {
    async createRecord({ commit, dispatch }, data) {
      try {
        const userId = await dispatch('getUserId');
        await firebase
          .database()
          .ref(`/users/${userId}/records`)
          .push(data);
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      }
    },
    async getRecords({ commit, dispatch }) {
      try {
        const userId = await dispatch('getUserId');
        const records = (
          await firebase
            .database()
            .ref(`/users/${userId}/records`)
            .once('value')
        ).val();
        commit('initRecords', records);
        return records;
      } catch (error) {
        setError('error', error);
        throw new Error(error);
      }
    },
  },
  getters: {
    records: (s) => s.records,
  },
};
