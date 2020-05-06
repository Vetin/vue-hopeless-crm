export default {
  install(Vue) {
    Vue.prototype.$message = (html) => {
      M.toast({ html, classes: 'rounded' });
    };

    Vue.prototype.$error = (html) => {
      M.toast({
        html: `[Ошибка]: ${html}`,
        classes: 'rounded',
      });
    };
  },
};
