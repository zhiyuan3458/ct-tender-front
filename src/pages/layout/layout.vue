<template>
    <div class="app-wrapper">
      <nav-bar></nav-bar>
      <side-bar class="sidebar-container"></side-bar>
      <div class="site-content__wrapper" :style="{ height: documentClientHeight + 'px' }">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import { sideBar, navBar } from './components';

export default {
  name: 'layout',
  components: {
    sideBar,
    navBar
  },
  computed: {
    documentClientHeight: {
      get () { return this.$store.state.common.documentClientHeight; },
      set (val) { this.$store.commit('common/updateDocumentClientHeight', val); }
    }
  },
  mounted () {
    this.resetDocumentClientHeight();
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight () {
      this.documentClientHeight = document.documentElement.clientHeight;
      window.onresize = () => {
        this.documentClientHeight = document.documentElement.clientHeight;
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
