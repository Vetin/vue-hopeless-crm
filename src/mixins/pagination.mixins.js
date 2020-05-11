import _ from 'lodash';

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    setupPagination(data) {
      this.allItems = _.chunk(data, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    pageChangeHandler(page) {
      this.items = this.allItems[page - 1] || this.allItems[0];
      this.$router.push(`${this.$route.path}?page=${page}`);
    },
  },
};
