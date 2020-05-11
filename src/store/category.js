import firebase from 'firebase/app';

export default {
  state: () => ({
    categories: [],
  }),
  mutations: {
    addCategory(state, category) {
      const categories = [...state.categories];
      categories.push(category);
      state.category = [...categories];
    },
    initCategories(state, categories) {
      state.categories = categories;
    },
    updateCategory(state, { title, limit, id }) {
      const categories = [...state.categories];
      const idx = categories.findIndex((el) => el.id === id);
      categories[idx] = { ...categories[idx], title, limit };
      state.categories = [...categories];
    },
  },
  actions: {
    async createCategory({ commit, dispatch }, data) {
      try {
        const userId = await dispatch('getUserId');
        const response = await firebase
          .database()
          .ref(`/users/${userId}/categories`)
          .push(data);
        const category = await dispatch('getCategoryById', response.key);
        commit('addCategory', category);
        return category;
      } catch (error) {
        commit('setError', error);
        throw new Error(error);
      }
    },
    async getCategories({ commit, dispatch }) {
      try {
        const userId = await dispatch('getUserId');
        const response = (
          await firebase
            .database()
            .ref(`/users/${userId}/categories/`)
            .once('value')
        ).val();
        const categories = Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
        commit('initCategories', categories);
        return categories;
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateCategory({ commit }, { title, limit, id }) {
      try {
        await firebase
          .database()
          .ref(`/users/${state.userId}/categories/${id}`)
          .set({ title, limit });
        commit('updateCategory', { title, limit, id });
        return { msg: 'Категория успешно обновлена' };
      } catch (error) {
        console.log(error);
      }
    },
    async getCategoryById({ state }, key) {
      const userId = state.userId;
      const category = await firebase
        .database()
        .ref(`/users/${userId}/categories/${key}`)
        .once('value')
        .then((data) => ({
          ...data.val(),
          id: key,
        }));
      return category;
    },
  },
  getters: {
    categories: (s) => s.categories,
  },
};
