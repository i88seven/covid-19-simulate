<template>
  <el-card
    class="main-card"
  >
    Welcome!!!
  </el-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  layout: 'default',
})
class MainPage extends Vue {
}

export default MainPage;
</script>

<style lang='scss' scoped>
.main-card {
  width: 100%;
}
</style>
