<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="box-container">
        <div class="box-header">
          <h3 class="tool-title">
            <span>查询条件</span>
          </h3>
        </div>
        <div class="box-body search-box-body">
          <div>
            <el-form :inline="true" class="demo-form-inline" label-width="110px">
              <el-form-item label="项目名称">
                <el-input clearable v-model="searchParams.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="项目编号">
                <el-input clearable v-model="searchParams.code" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label=" ">
                <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="box-container table-container">
      <div class="box-header">
        <h3 class="tool-title">
          <span>查询结果</span>
        </h3>
        <el-button
          class="add-btn"
          type="success"
          size="mini"
          @click="handleAdd"
          icon="el-icon-circle-plus-outline">
          新增
        </el-button>
      </div>
      <template>
        <common-table
          ref="table"
          :tableData="tableData"
          :listColumn="listColumn"
          :listConfig="listConfig"
          :tableBtns="tableBtns"
          @edit="handleEdit"
          @view="handleView"
          @remove="handleRemove"
        >
        </common-table>
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
    <add-edit v-if="isDialog" :show-type="addEditType" ref="addEdit" @return="handleReturn"></add-edit>
  </div>
</template>
<script>
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import addEdit from './add-edit';
import commonTable from 'src/components/common-table';
import { tenderListJson, remove } from 'src/api/tender/tendermanagement/projectinformation';

export default {
  name: '/tender/tendermanagement/projectinformation',
  data () {
    return {
      searchParams: {
        name: '',
        code: ''
      },
      isDialog: false, // 是否显示详情信息
      tableData: [],
      addEditType: ''
    };
  },
  mixins: [
    listMixin,
    tableMix
  ],
  components: {
    commonTable,
    addEdit
  },
  created () {
    this.getList();
  },
  mounted () {
    setTimeout(() => {
      this.tableHeight();
    }, 20);
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
      this.listConfig.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 130;
      window.onresize = () => {
        this.tableHeight();
      };
    },
    /**
     * @description 点击新增触发
     * @author lizipei
     * @date 2019/11/11
     */
    handleAdd () {
      this.isDialog = true;
      this.addEditType = 'add';
      this.$nextTick(() => {
        this.$refs.addEdit.isShow = true;
      });
    },
    /**
     * @description 点击查看触发
     * @author wenruihuan
     * 2019/11/6
     */
    handleView (obj) {
      this.isDialog = true;
      this.addEditType = 'view';
      this.$nextTick(() => {
        this.$refs.addEdit.getFormData(obj.row.id);
      });
    },
    /**
     * @description 点击编辑触发
     * @author lizipei
     * @date 2019/11/11
     */
    handleEdit (obj) {
      this.isDialog = true;
      this.addEditType = 'edit';
      this.$nextTick(() => {
        this.$refs.addEdit.getFormData(obj.row.id);
      });
    },
    /**
     * @description 点击删除触发
     * @author lizipei
     * @date 2019/11/12
     */
    async handleRemove (obj) {
      try {
        const { data } = await remove({ id: obj.row.id });
        if (data.code === process.env.ERR_OPERATE_OK) {
          this.getList();
        } else {
          this.$message.error(data.msg);
        }
      } catch (e) {
        console.log(`handleRemove-error: ${e}`);
      }
    },
    /**
     * @description 详情页面关闭触发
     * @author lizipei
     * @date 2019/11/12
     */
    handleReturn (type) {
      if (type === 'refresh') {
        this.getList();
      }
    },
    /**
     * @description  获取项目信息分页列表
     * @author wenruihuan
     * 2019/11/6
     */
    async getList () {
      try {
        const params = {
          ...this.searchParams,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const { data } = await tenderListJson(params);
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
        }
      } catch (e) {
        console.log(`error: ${e}`);
      }
    },
    handleSubmit () {
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
  .list-container{
    .table-container{
      .box-header{
        padding: 0;
        border-bottom: 0;
        height: 25px;
        line-height: 25px;
        position: relative;
        button.add{
          position: absolute;
          right: 12px;
          top: 10px;
        }
      }
      .box-body{
        padding: 20px 0;
        .name{
          margin-right: 10px;
        }
      }
      .el-form{
        display: flex;
        flex-wrap: wrap;
        .el-form-item{
          width: 50%;
          margin: 0 0 10px 0;
        }
      }
    }
  }
  .el-table{
    margin-top: 20px;
  }
</style>
