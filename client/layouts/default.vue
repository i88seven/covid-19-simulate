<template>
  <el-container
    direction="vertical"
    class="fit-viewport-height"
  >
    <my-header />
    <main class="entire-main">
      <nuxt />
    </main>
  </el-container>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';
import MyHeader from '~/components/organisms/MyHeader';

const options: ThisTypedComponentOptionsWithRecordProps<
Vue,
{},
{},
{},
{}
> = {
  components: {
    MyHeader,
  },
};

export default Vue.extend(options);
</script>
