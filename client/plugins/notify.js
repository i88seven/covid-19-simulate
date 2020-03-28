import Vue from 'vue';

function notifyError(title, message) {
  Vue.prototype.$notify({
    title: title,
    message: message,
    duration: 0,
    type: 'error'
  });
}

Vue.prototype.$notifyError = notifyError;
