<template>
  <div>
    <div class="operation">
<!--      <el-button @click="refresh"><i class="el-icon-refresh-right"></i>重新生成</el-button>-->
      <el-button @click="isShow = true"><i class="el-icon-add"></i>批量新增</el-button>
    </div>
    <template>
      <el-table
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="value"
          label="显示值"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="value"
          label="图标"
          align="center"
        >
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.value"></svg-icon>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="page_box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="$config.PAGE_SIZE"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isShow"
      width="35%"
    >
      <el-button size="mini" type="primary" @click="saveFn">保存</el-button>
      <el-table
        :data="formData"
        :cell-style="cellStyle"
        empty-text=""
      >
        <el-table-column
          width="80"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <span class="remove-icon el-icon-remove-outline" @click="removeFn(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column
          width="60"
          type="index"
          label="序号"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="value"
          label="编码"
          width="160"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.value" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="160"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" size="mini"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-icon-container">
        <span class="add-icon el-icon-circle-plus-outline" @click="addFn"></span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getIconList, save } from 'src/api/backstage/icon';
import listMixins from 'src/mixins/list';
import svgIcon from 'src/components/svg-icon';

export default {
  name: '/backstage/icon',
  components: {
    svgIcon
  },
  data () {
    return {
      tableData: [],
      iconValue: '',
      isShow: false,
      formData: []
    };
  },
  mixins: [listMixins],
  created () {
    this.getList();
    this.addFn();
  },
  computed: {
    cellStyle () {
      return {
        padding: '2px 0'
      };
    }
  },
  methods: {
    /**
     * @description 获取图标列表
     * @author lvzhiyuan
     * @date 2019/10/30
     */
    async getList () {
      try {
        const params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const { data } = await getIconList(params);
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
        };
      } catch (e) {
        console.log(`enterpriseUserManagement-getList error: ${e}`);
      }
    },
    /**
     * @description dialog添加图标行
     * @author lvzhiyuan
     * @date 2019/10/30
     */
    addFn () {
      this.formData.push({
        name: '',
        value: ''
      });
    },
    /**
     * @description dialog删除图标行
     * @author lvzhiyuan
     * @date 2019/10/30
     */
    removeFn (item) {
      this.formData.remove(item);
    },
    /**
     * @description 保存
     * @author lvzhiyuan
     * @date 2019/10/30
     */
    async saveFn () {
      try {
        const arr = this.formData.map(item => ({
          ...item,
          icon: item.value
        }));
        const { data } = await save(arr);
        if (data.code === process.env.ERR_OPERATE_OK) {
          this.isShow = false;
          this.getList();
        }
      } catch (e) {
        console.log(`icon-saveFn error: ${e}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.operation {
  margin: 5px 0;
}
.add-icon-container {
  position: relative;
  .add-icon {
    position: absolute;
    top: 5px;
    left: 33px;
    cursor: pointer;
    color: darkgreen;
  }
}
.remove-icon {
  color: red;
  cursor: pointer;
  font-size: 14px;
}
</style>
