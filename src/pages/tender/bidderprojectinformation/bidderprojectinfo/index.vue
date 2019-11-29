<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标项目信息库</el-breadcrumb-item>
            <el-breadcrumb-item>招标项目信息</el-breadcrumb-item>
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
            <el-form :inline="true" class="demo-form-inline el-form-more" label-width="110px" ref="searchTable">
              <el-form-item label="项目名称">
                <el-input clearable v-model="searchData.projectName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="项目编号">
                <el-input clearable v-model="searchData.projectCode" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标项目名称">
                <el-input clearable v-model="searchData.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标项目编号">
                <el-input clearable v-model="searchData.code" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="项目业主单位">
                <el-input clearable v-model="searchData.ownerName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标代理名称">
                <el-input clearable v-model="searchData.tenderAgencyName" placeholder=""></el-input>
              </el-form-item>
            </el-form>
            <div class="search-btn search-row-one-btn">
              <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box-container table-container">
      <div class="box-header">
        <h3 class="tool-title">
          <span>查询结果</span>
        </h3>
      </div>
      <template>
        <common-table
          ref="table"
          :tableData="tableData"
          :height="listConfig.height"
          :listColumn="listColumn"
          :listConfig="listConfig"
          :tableBtns="tableBtns"
          @view="handleView"
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
    <add-edit v-if="isDialog" ref="addEdit"></add-edit>
  </div>
</template>
<script>
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import addEdit from './add-edit';
import commonTable from 'src/components/common-table';
import { tenderbatchinfoListJson } from 'src/api/tender/bidderprojectinformation';
export default {
  name: '/tender/bidderprojectinformation/bidderprojectinfo',
  data () {
    return {
      searchData: {
        ownerName: '',
        projectName: '',
        projectCode: '',
        tenderBatchName: '',
        tenderBatchCode: '',
        tenderAgencyName: '',
        name: '',
        code: '',
        tenderType: '',
        sectionProjectType: ''
      },
      isDialog: false, // 是否显示详情信息
      tableData: []
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
       * @description 点击编辑触发
       * @author wenruihuan
       * 2019/11/6
       */
    handleView (obj) {
      this.isDialog = true;
      this.$nextTick(() => {
        this.$refs.addEdit.getFormData(obj.row.id);
      });
    },
    /**
       * @description  获取项目信息分页列表
       * @author wenruihuan
       * 2019/11/6
       */
    async getList () {
      const params = { ...this.searchData, pageNum: this.pageNum, pageSize: this.pageSize };
      const { data } = await tenderbatchinfoListJson(params);
      try {
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
          setTimeout(() => {
            this.tableHeight();
          }, 15);
        }
      } catch (e) {
        console.log(`error: ${e}`);
      }
    },
    handleSubmit () {
      this.getList();
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange (val) {
      this.pageNum = val;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
  .list-container{
    .senior-search-btn{
      position: absolute;
      right: 0;
      top: 0;
    }
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
