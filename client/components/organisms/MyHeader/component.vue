<template>
  <el-header>
    <img
      class="header-logo"
      src="~assets/img/logo.png"
      alt="Logo"
    >
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
class MyHeader extends Vue {
}

export default MyHeader;
</script>

<style lang="scss">
.el-header {
  height: 60px;
  padding: 0px;
  background-color: #ffffff;
  color: #333333;
  z-index: $z-index-header;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
}
.header-logo {
  float: left;
  width: 68px;
  height: 60px;
  padding: 15px 19px;
  box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.12);
}
.navbar-right {
  float: right;
  padding: 20px 40px 20px 0;
}
</style>
