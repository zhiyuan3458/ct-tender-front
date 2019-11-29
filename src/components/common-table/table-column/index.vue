<template>
  <el-table-column
    :width="col.width"
    :min-width="col.minWidth"
    :prop="col.prop"
    :label="col.label"
    :show-overflow-tooltip="true"
    :align="col.align || align"
    :sortable="col.sort || false"
    :header-align="col.headerAlign || headerAlign"
  >
    <template v-if="col.children && col.children.length > 0">
      <table-column
        v-for="item in col.children"
        :key="item.id"
        :col="item"
      >
      </table-column>
    </template>
  </el-table-column>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'tableColumn',
  data () {
    return {
      align: 'center',
      headerAlign: 'center'
    };
  },
  props: {
    col: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
