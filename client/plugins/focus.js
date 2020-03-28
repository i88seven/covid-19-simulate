import Vue from 'vue';

export default () => {
  Vue.directive('focus', {
    inserted: function(el, binding) {
      if (binding.value === true || binding.value === undefined) {
        Vue.nextTick(() => el.focus());
      }
    }
  });
};