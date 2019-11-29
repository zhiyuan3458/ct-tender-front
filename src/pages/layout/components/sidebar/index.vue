<template>
  <scroll-bar>
    <el-menu
            mode="vertical"
            :collapse-transition="false"
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            unique-opened
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import ScrollBar from 'src/components/scrollBar';
import SidebarItem from './sidebarItem';
import { getSideBarMenus } from 'src/api/sidebar';
import { mapState } from 'vuex';

export default {
  components: { SidebarItem, ScrollBar },
  data () {
    return {
      isCollapse: false,
      permission_routers: []
    };
  },
  computed: {
    ...mapState('user', [
      'modelType'
    ])
  },
  created () {
    this.getSideBarMenus();
  },
  methods: {
    /**
     * @description 获取左侧导航栏菜单
     * @author lvzhiyuan
     * @date 2019/11/1
     */
    getSideBarMenus () {
      const modelType = this.$route.meta.modelType || '主菜单';
      getSideBarMenus({ modelType }).then(({ data }) => {
        if (data.code === process.env.ERR_OK) {
          this.permission_routers = data.data.listMenuTree;
        }
      }).catch((e) => {
        console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue');
        this.$router.push('/login');
      });
    }
  }
};
</script>
