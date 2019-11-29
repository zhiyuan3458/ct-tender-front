<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <router-link v-if="!item.children" :to="item.frontRouter" :key="item.id">
        <el-menu-item :index="item.frontRouter" :class="{'submenu-title-noDropdown':!isNest}">
          <span v-if="item.name" slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name || item.frontRouter" :key="item.id">
        <template slot="title">
          <svg-icon :icon-class="item.iconSkin" font-size="20"></svg-icon>
          <span v-if="item.name" slot="title">{{item.name}}</span>
        </template>

        <template v-for="child in item.children">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length > 0" :routes="[child]" :key="child.id"></sidebar-item>
            <router-link v-else :to="child.frontRouter" :key="child.id">
              <el-menu-item :index="child.frontRouter">
                <span v-if="child.name" slot="title">{{child.name}}</span>
              </el-menu-item>
            </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import svgIcon from 'src/components/svg-icon';
export default {
  name: 'SidebarItem',
  components: {
    svgIcon
  },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // hasOneShowingChildren (children) {
    //   const showingChildren = children.filter(item => {
    //     return !item.hidden;
    //   });
    //   if (showingChildren.length === 1) {
    //     return true;
    //   }
    //   return false;
    // }
  }
};
</script>
