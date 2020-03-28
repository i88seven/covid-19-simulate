import { i18n } from '~/plugins/i18n';
import '!style-loader!css-loader!element-ui/lib/theme-chalk/index.css';
import ElementUI from '~/plugins/element-ui';
import Focus from '~/plugins/focus';
import { configure, addDecorator } from '@storybook/vue';
import '~/assets/sass/element-variables.scss'
import '~/assets/sass/main.scss'

ElementUI();
Focus();

addDecorator(() => ({
  template: '<story/>',
  i18n
}))

// automatically import all files ending in *.stories.js
configure(require.context('~', true, /\.stories\.ts$/), module);
