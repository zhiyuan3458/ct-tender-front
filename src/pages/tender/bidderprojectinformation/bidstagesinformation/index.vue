<template>
  <div class="list-container">
    <!--  头部固定部分  -->
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标项目信息库</el-breadcrumb-item>
            <el-breadcrumb-item>标段信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <!--   查询条件   -->
      <div class="box-container">
        <div class="box-header">
          <h3 class="tool-title">
            <span>查询条件</span>
            <el-button class="senior-search-btn" @click="showOtherSearchBtn"><i class="el-icon-plus"></i>展开高级查询</el-button>
          </h3>
        </div>
        <div class="box-body search-box-body">
          <div>
            <el-form :inline="true" class="demo-form-inline el-form-more" label-width="110px" ref="searchTable">
              <el-form-item label="项目业主单位">
                <el-input clearable v-model="searchData.ownerName"></el-input>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-input clearable v-model="searchData.projectName"></el-input>
              </el-form-item>
              <el-form-item label="项目编号">
                <el-input clearable v-model="searchData.projectCode"></el-input>
              </el-form-item>
              <el-form-item label="招标项目名称">
                <el-input clearable v-model="searchData.tenderBatchName"></el-input>
              </el-form-item>
              <el-form-item label="招标项目编号">
                <el-input clearable v-model="searchData.tenderBatchCode"></el-input>
              </el-form-item>
              <el-form-item label="标段名称">
                <el-input clearable v-model="searchData.name"></el-input>
              </el-form-item>
              <el-form-item label="标段编号">
                <el-input clearable v-model="searchData.code"></el-input>
              </el-form-item>
              <el-form-item label="招标类型">
                <dictionary-comp
                  v-model="searchData.tenderType"
                  code="tenderType"
                  clearable
                  :is-default="false"
                  type="select"
                >
                </dictionary-comp>
              </el-form-item>
              <el-form-item label="标段类型">
                <dictionary-comp
                  v-model="searchData.sectionProjectType"
                  code="sectionProjectType"
                  type="select"
                  :is-default="false"
                  clearable
                >
                </dictionary-comp>
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
import dictionaryComp from 'src/components/dictionary-component';
import { bidstagesListJson } from 'src/api/tender/bidderprojectinformation';
export default {
  name: '/tender/bidderprojectinformation/bidstagesinformation',
  data () {
    return {
      searchData: {
        ownerName: '',
        projectName: '',
        projectCode: '',
        tenderBatchName: '',
        tenderBatchCode: '',
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
    addEdit,
    dictionaryComp
  },
  created () {
    this.getList();
  },
  mounted () {
    this.tableHeight();
  },
  methods: {
    /**
       * @设置table高度
       * @author wenruihuan
       * 2019/10/23
       */
    tableHeight () {
      this.$nextTick(() => {
        const siteNavbarHeight = document.getElementsByClassName('site-navbar')[0].clientHeight;
        const boxContainerFix = document.getElementsByClassName('box-container-fix')[0].clientHeight;
        this.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 130;
        this.listConfig.height = this.height;
        window.onresize = () => {
          this.tableHeight();
        };
      });
    },
    /**
     * @description 显示/隐藏搜索条件
     * @author wenruihuan
     * 2019/11/6
     */
    showOtherSearchBtn () {
      if (this.$refs.searchTable.$el.style.height === 'auto') {
        this.$refs.searchTable.$el.style.height = '85px';
      } else {
        this.$refs.searchTable.$el.style.height = 'auto';
      }
      this.tableHeight();
    },
    /**
       * @description 点击查看触发
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
      const { data } = await bidstagesListJson(params);
      try {
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
        }
      } catch (e) {
        console.log(`src/pages/tender/bidderprojectinformation/bidstagesinformation-getList error: ${e}`);
      }
    },
    /**
     * @description 点击查询按钮查询
     * @author lvzhiyuan
     * @date 2019/11/22
     */
    handleSubmit () {
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
      }
    }
  }
</style>
