import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'ja',
  messages: {
    'ja': require('~/locales/ja.json')
  }
});

export default ({ app }): void => {
  app.i18n = i18n;
};
