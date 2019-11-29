<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>统一用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <div class="box-container">
      <div class="box-header">
        <h3 class="tool-title">
          <span>查询条件</span>
        </h3>
      </div>
      <div class="box-body">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="角色名称">
            <el-input clearable v-model="searchName" placeholder="输入角色名称查询"></el-input>
          </el-form-item>
          <el-form-item label="角色编码">
            <el-input clearable v-model="searchCode" placeholder="输入角色编码查询"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
        </el-form>
      </div>
    </div>
    <div class="box-container table-container">
      <div class="box-header">
        <h3 class="tool-title">
          <span>查询结果</span>
        </h3>
        <el-button class="add-btn" type="success" size="mini" @click="handleAdd('')" icon="el-icon-circle-plus-outline">新增</el-button>
      </div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          :height="height"
          ref="table"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="角色名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="code"
            align="center"
            label="角色编码"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="description"
            label="角色说明"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" class="el-btn-edit" size="small" @click="handleAdd(scope.row.id)">编辑</el-button>
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
    </div>

    <add-edit ref="addEdit" :msg-data="rowDataId" @save="save"></add-edit>
  </div>
</template>

<script>
import listMixin from 'src/mixins/list';
import addEdit from 'src/pages/backstage/role/add-edit';
export default {
  name: '/backstage/role',
  components: {
    addEdit
  },
  data () {
    return {
      isDialog: false, // 是否显示新增编辑页面
      formData: {},
      height: '0',
      rowDataId: '',
      tableData: [],
      total: 1, // 总条数
      dialogState: false, // 判断是新增还是修改,false为新增，true为修改
      searchName: '',
      sort: '',
      direction: '',
      searchCode: ''
    };
  },
  mixins: [listMixin],
  created () {
    this.getList();
  },
  mounted () {
    window.onresize = () => {
      this.tableHeight();
    };
  },
  methods: {
    /**
     * @设置table高度
     * @author wenruihuan
     * 2019/10/23
     */
    tableHeight () {
      const siteNavbarHeight = document.getElementsByClassName('site-navbar')[0].clientHeight;
      const boxContainerFix = document.getElementsByClassName('box-container-fix')[0].clientHeight;
      this.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 240;
      this.$refs.table.$el.style.height = this.height;
    },
    async getList () {
      const params = {
        name: this.searchName,
        code: this.searchCode,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        sort: this.sort,
        direction: this.direction
      };
      try {
        const { data } = await this.$http.get('/backstage/sys/bs/role/listJson', params);
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
          setTimeout(() => {
            this.tableHeight();
          }, 15);
        };
      } catch (e) {
        console.log(`error: ${e}`);
      }
    },
    handleEdit (row) {
      this.rowDataId = row;
      this.isDialog = true;
      this.dialogState = true;
    },
    handleSubmit () {
      this.getList();
    },
    handleAdd (val) {
      this.isDialog = true;
      this.rowDataId = '';
      this.$refs.addEdit.handleInit(val);
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.pageNum = val;
      this.getList();
    },
    // 取消弹窗
    save () {
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
  /deep/.el-breadcrumb{
    line-height: 1.5;
  }
  .list-container{
    .table-container{
      .box-header{
        padding: 0;
        border-bottom: 0;
        height: 25px;
        position: relative;
        line-height: 25px;
      }
      .box-body{
        padding: 20px 0;
      }
    }
  }
  .el-table{
    margin-top: 20px;
  }
</style>
