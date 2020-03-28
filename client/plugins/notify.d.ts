import Vue from 'vue';
import { Notification as ElNotification } from 'element-ui';

declare module 'vue/types/vue' {
  interface Vue {
    $notifyError: ElNotification;
  }
}