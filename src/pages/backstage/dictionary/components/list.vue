<template>
    <div class="dictionary-container list-container">
      <div class="btn-group">
          <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
      </div>
      <div class="breadcrumb-container">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础配置</el-breadcrumb-item>
            <el-breadcrumb-item>数据字典</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <div class="table-container">
          <el-table
            show-overflow-tooltip
            :data="tableList"
            border
            :header-cell-style="headerCellStyle"
            :cell-style="cellStyle"
            :row-style="rowStyle"
          >
            <el-table-column
              label="序号"
              type="index"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="displayValue"
              label="隐藏值"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="displayName"
              label="显示值"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="value"
              label="编码值"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column label="操作" width="250" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button
                      class="el-btn-edit"
                      size="mini"
                      type="text"
                      @click="handleEdit(scope.row)"
                    >
                      编辑
                    </el-button>
                    <el-button
                      class="el-btn-delete"
                      size="mini"
                      type="text"
                      @click="handleRemove(scope.row)">
                      删除
                    </el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="pagenation-container" v-if="total !== 0">
              <el-pagination
                :page-sizes="$config.PAGE_SIZE"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              >
              </el-pagination>
          </div>
      </div>
      <add-edit v-if="dialogShow" ref="addEdit" @refresh-list="refreshList"></add-edit>
    </div>
</template>

<script>
import listMixin from 'src/mixins/list';
import dialog from './dialog';
import { listJson, remove } from 'src/api/backstage/dictionary';
import { EDIT } from '../constant';
export default {
  components: {
    'add-edit': dialog
  },
  data () {
    return {
      tableList: [],
      parentId: '',
      dialogShow: false
    };
  },
  mixins: [listMixin],
  props: {
    node: {
      type: Object
    }
  },
  computed: {
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
    }
  },
  methods: {
    /**
         * @description 获取表格数据
         * @author lvzhiyuan
         * @date 2019/9/3
         */
    async getList () {
      try {
        const obj = {
          value: this.node.code,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const { data } = await listJson(obj);
        if (data.code === process.env.ERR_OK) {
          this.tableList = data.data.tableList;
          this.total = data.total;
        }
      } catch (e) {
        console.log(`error: ${e}`);
      }
    },
    /**
         * @description 新增列表项
         * @author lvzhiyuan
         * @date 2019/9/3
         */
    handleAdd () {
      const formData = {
        value: '',
        color: '#000000',
        icon: '',
        name: '',
        displayValue: '',
        displayName: '',
        memo: '',
        effectiveFlag: '1',
        type: '0'
      };
      this.dialogShow = true;
      this.$nextTick(() => {
        formData.parentId = this.node.id;
        formData.value = this.node.code;
        formData.name = this.node.text;
        this.$refs.addEdit.init(JSON.parse(JSON.stringify(formData)));
      });
    },
    /**
         * @description 编辑列表项
         * @author lvzhiyuan
         * @date 2019/9/3
         */
    handleEdit (row) {
      this.dialogShow = true;
      this.$nextTick(() => {
        this.$refs.addEdit.init(JSON.parse(JSON.stringify(row)));
      });
    },
    /**
         * @description 删除列表项
         * @author lvzhiyuan
         * @date 2019/9/3
         */
    handleRemove (row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const { data } = await remove({ id: row.id });
          if (data.code === process.env.ERR_OPERATE_OK) {
            this.getList();
          }
        } catch (e) {
          console.log(`backstage/dictionary-handleRemove error: ${e}`);
        }
      }).catch(() => {
      });
    },
    /**
     * @description 保存后更新列表数据
     * @author lvzhiyuan
     * @date 2019/9/28
     */
    refreshList () {
      this.getList();
    }
  },
  watch: {
    node: {
      handler () {
        if (this.node.type === '0' && this.node.btnType === EDIT) {
          this.getList();
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.dictionary-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .btn-group {
        box-sizing: border-box;
        padding: 5px;
        border-bottom: 1px solid #eee;
    }
    .breadcrumb-container {
        height: 30px;
        line-height: 30px;
        box-sizing: border-box;
        padding: 8px;
    }
}
</style>
