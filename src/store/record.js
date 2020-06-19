import firebase from 'firebase/app';

export default {
  state: () => ({
    records: [],
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
        dispatch('setError', error);
        throw new Error(error);
      }
    },
    async getRecords({ commit, dispatch }) {
      try {
        const userId = await dispatch('getUserId');
        const response = (
          await firebase
            .database()
            .ref(`/users/${userId}/records`)
            .once('value')
        ).val();
        const records = response ? response : [];
        commit('initRecords', records);
        return records;
      } catch (error) {
        dispatch('setError', error);
        throw new Error(error);
      }
    },
    async getRecordById({ dispatch }, id) {
      try {
        const userId = await dispatch('getUserId');
        const record = (
          await firebase
            .database()
            .ref(`/users/${userId}/records/${id}`)
            .once('value')
        ).val();
        return record;
      } catch (error) {
        dispatch('setError', error);
        throw new Error(error);
      }
    },
  },
  getters: {
    records: (s) => s.records,
  },
};
