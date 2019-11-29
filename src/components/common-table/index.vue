<template>
  <el-table
    class="common-table-container"
    ref="table"
    :data="tableData"
    :height="list_config.height"
    border
    size="mini"
    :header-cell-style="headerCellStyle"
    :cell-style="cellStyle"
    :row-style="rowStyle"
    @sort-change="handleSort"
  >
    <el-table-column
      type="index"
      align="center"
      label="序号"
    >
    </el-table-column>
    <table-column
      v-for="item in privateListColumn"
      :key="item.id"
      :col="item"
    >
    </table-column>
    <el-table-column
      :width="tableBtnsWidth"
      align="center"
      label="操作"
      v-if="list_config.isShowBtn"
    >
      <template slot-scope="scope">
       <div class="operate-btn-group">
         <el-button
           ref="btn"
           v-for="(item, index) in tableBtns"
           :key="index"
           v-if="!scope.row.rowBtns || (scope.row.rowBtns && scope.row.rowBtns.includes(item.value))"
           :disabled="scope.row.disabledBtns || (scope.row.disabledBtns && scope.row.disabledBtns.includes(item.value))"
           type="text"
           :style="{ color: item.color }"
           size="small"
           @click="handleOperate(scope.row, scope.$index, item, tableData)"
         >
           {{ item.name }}
         </el-button>
       </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import tableColumn from './table-column';
import { gengerateRandom } from 'src/common/js/utils';
export default {
  components: {
    tableColumn
  },
  data () {
    return {};
  },
  props: {
    /* 表格数据 */
    tableData: {
      type: Array,
      default () {
        return [];
      }
    },
    /* 列表配置 */
    listConfig: {
      type: Object,
      default () {
        return {};
      }
    },
    /* 列表表头 */
    listColumn: {
      type: Array,
      default () {
        return [];
      }
    },
    /* 列表按钮配置 */
    tableBtns: {
      type: Array,
      default () {
        return [];
      }
    },
    /* 删除url */
    deleteUrl: {
      type: String
    },
    /* 删除参数 */
    deleteParams: {
      type: Object
    }
  },
  computed: {
    list_config () {
      const DEFAULT = { isShowBtn: true };
      return Object.assign({}, DEFAULT, this.listConfig);
    },
    /**
     * @description 列数据
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    privateListColumn () {
      return this.listColumn.map(item => ({ ...item, id: gengerateRandom() }));
    },
    /**
     * @description 头部样式
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    headerCellStyle () {
      return {
        background: '#3592CB',
        color: 'white',
        height: '48px'
      };
    },
    /**
     * @description 列表单元格属性
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    cellStyle () {
      return {
        color: '#909399'
      };
    },
    /**
     * @description 操作按钮宽度
     * @author lvzhiyuan
     * @date 2019/11/25
     */
    tableBtnsWidth () {
      let width = 0;
      const tableNames = this.tableBtns.map(item => item.name);
      tableNames.forEach(item => {
        width += item.length * 12 + 22;
      });
      return width > 60 ? width : 60;
    }
  },
  methods: {
    /**
     * @description 点击按钮触发
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    async handleOperate (row, index, item, tableData) {
      if (this.deleteUrl && item.value === 'remove') {
        this.removeItem(row);
      } else {
        this.$emit(item.value, { row, index, item, tableData });
      }
    },
    /**
     * @description 列表每一行的样式
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    rowStyle ({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return { background: '#F0F2F5' };
      } else {
        return { background: 'white' };
      }
    },
    /**
     * @description 删除行数据
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    removeItem (row) {
      this.$confirm('确认删除该行信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = { ...this.deleteParams, id: row.id };
        try {
          const { data } = await this.$http.post(this.deleteUrl, params);
          if (data.code === process.env.ERR_OPERATE_OK) {
            this.$emit('remove');
          }
        } catch (e) {
          console.log(`common-table-removeItem error: ${e}`);
        }
      }).catch(e => {
        console.log(e);
      });
    },
    /**
     * @description 排序
     * @author lvzhiyuan
     * @date 2019/11/6
     */
    handleSort ({ column, prop, order }) {
      let direction = '';
      if (order === 'ascending') {
        direction = 'ASC';
      } else if (order === 'descending') {
        direction = 'DESC';
      } else {
        direction = '';
      }
      this.$emit('sort', { column, prop, direction });
    }
  }
};
</script>

<style lang="scss" scoped>
.common-table-container {
  width: 98%;
  margin: 0 auto;
  .operate-btn-group {
    white-space: nowrap;
  }
}
</style>
