export default function checkAuthorization(auth = []) {
  if (!Array.isArray(auth)) {
    throw TypeError(
      '请检查参数类型：Excepted Array，got ' + Object.prototype.toString.call(auth).slice(8, -1)
    );
  }
  return store.state.authorization.some((el) => auth.includes(el));
}

export default (Vue) => {
  Vue.directive('permission', {
    inserted(el, binding) {
      if (!checkAuthorization(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    },
  });
};
