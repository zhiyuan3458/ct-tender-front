<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标项目信息库</el-breadcrumb-item>
            <el-breadcrumb-item>履约信息</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
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
              <el-form-item label="项目名称">
                <el-input clearable v-model="searchData.projectName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="项目编号">
                <el-input clearable v-model="searchData.projectCode" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标项目名称">
                <el-input clearable v-model="searchData.tenderProjectName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标项目编号">
                <el-input clearable v-model="searchData.tenderProjectCode" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="标段名称" v-if="this.searchData.isTenderProject === '1'">
                <el-input clearable v-model="searchData.sectionName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="标段编号" v-if="this.searchData.isTenderProject === '1'">
                <el-input clearable v-model="searchData.sectionCode" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标人名称">
                <el-input clearable v-model="searchData.tendererName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="中标人名称" v-if="this.searchData.isTenderProject === '1'">
                <el-input clearable v-model="searchData.bidderName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标代理名称" v-if="this.searchData.isTenderProject === '0'">
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
    <el-tabs type="border-card" @tab-click="changeRadio">
      <el-tab-pane label="招标项目">
        <div class=" table-container">
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
              :listColumn="tenderListColumn"
              :listConfig="listConfig"
              :tableBtns="entrustTableBtns"
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
      </el-tab-pane>
      <el-tab-pane label="委托项目">
        <div class=" table-container">
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
              :listColumn="entrustListColumn"
              :listConfig="listConfig"
              :tableBtns="tableBtns"
              @down="handleFile"
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
      </el-tab-pane>
    </el-tabs>
    <add-edit v-if="isDialog" ref="addEdit"></add-edit>

    <el-dialog
      title="附件列表"
      :close-on-click-modal="false"
      :visible.sync="isShow"
      width="400"
    >
      <div class="fileList" v-for="item in fileList" :key="item.id">
        <p @click="handleDown(item.id, item.originalFileName)"><i class="save-icon-color el-icon-download"></i> {{item.originalFileName}}</p>
      </div>
      <div class="tool-container" style="text-align: right">
        <el-button @click="isShow = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import addEdit from './add-edit';
import { downloadFile } from 'src/common/js/utils';
import commonTable from 'src/components/common-table';
import { getFileList, downFile } from 'src/api/tender/bidderinformation/performanceinformation';
import { performanceinfoListJson } from 'src/api/tender/bidderprojectinformation';
export default {
  name: '/tender/bidderprojectinformation/performanceinfo',
  data () {
    return {
      name: '',
      code: '',
      isShow: false,
      searchData: {
        projectName: '',
        projectCode: '',
        tenderProjectName: '',
        tenderProjectCode: '',
        sectionName: '',
        sectionCode: '',
        tendererName: '',
        bidderName: '',
        isTenderProject: '1',
        tenderAgencyName: '',
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
     * @description 获取附件列表信息
     * @author wenruihuan
     * 2019/11/8
     */
    async handleFile (obj) {
      try {
        const { data } = await getFileList({ attachmentId: obj.row.attachmentIdOfPerformance });
        if (data.code === process.env.ERR_OK) {
          this.isShow = true;
          this.fileList = data.data;
        }
      } catch (e) {
        console.log(`src/pages/tender/bidderprojectinformation/performanceinfo-getFileList-error: ${e}`);
      }
    },
    /**
     * @description 下载当前列附件
     * @author wenruihuan
     * 2019/11/6
     */
    async handleDown (id, originalFileName) {
      try {
        const { data } = await downFile({ id: id });
        downloadFile(data, originalFileName);
      } catch (e) {
        console.log(`src/pages/tender/bidderprojectinformation/performanceinfo-handleDown error: ${e}`);
      }
    },
    /**
       * @设置table高度
       * @author wenruihuan
       * 2019/10/23
       */
    tableHeight () {
      const siteNavbarHeight = document.getElementsByClassName('site-navbar')[0].clientHeight;
      const boxContainerFix = document.getElementsByClassName('box-container-fix')[0].clientHeight;
      this.listConfig.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 170;
      window.onresize = () => {
        this.tableHeight();
      };
    },
    /**
     * @description 切换委托项目和招标项目
     * @author lvzhiyuan
     * @date 2019/11/7
     */
    changeRadio (value) {
      if (value.label === '委托项目') {
        this.searchData.isTenderProject = '0';
      } else if (value.label === '招标项目') {
        this.searchData.isTenderProject = '1';
      }
      this.getList();
      this.searchData.tenderType = '';
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
      const { data } = await performanceinfoListJson(params);
      try {
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
          setTimeout(() => {
            this.tableHeight();
          }, 15);
        }
      } catch (e) {
        console.log(`src/pages/tender/bidderprojectinformation/performanceinfo-getList error: ${e}`);
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
  /deep/.el-tabs--border-card{
    .el-tabs__content{
      padding: 0;
    }
  }
  .fileList{
    p{
      cursor: pointer;
      line-height: 35px;
    }
  }
  .el-table{
    margin-top: 20px;
  }
</style>
