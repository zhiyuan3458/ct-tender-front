<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标人信息库</el-breadcrumb-item>
            <el-breadcrumb-item>履约信息</el-breadcrumb-item>
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
            <el-form :inline="true" class="demo-form-inline" label-width="110px" ref="searchTable">
              <el-form-item label="项目名称">
                <el-input clearable v-model="searchData.projectName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标项目名称">
                <el-input clearable v-model="searchData.projectCode" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标代理名称" v-if="isType !== 'other'">
                <el-input clearable v-model="searchData.projectCode" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="标段名称" v-if="isType === 'other'">
                <el-input clearable v-model="searchData.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="中标人名称" v-if="isType === 'other'">
                <el-input clearable v-model="searchData.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label=" ">
              </el-form-item>
              <el-form-item label=" " v-if="isType !== 'other'">
              </el-form-item>
              <el-form-item label=" " style="text-align: right;">
                <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <el-tabs type="border-card" @tab-click="changeRadio ">
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
              style="width: 100%"
              :height="height"
              :listColumn="otherListColumn"
              :listConfig="listConfig"
              :tableBtns="tableBtns"
              @view="getFileList"
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
              style="width: 100%"
              :height="height"
              :listColumn="electronicListColumn"
              :listConfig="listConfig"
              :tableBtns="tableBtns"
              @view="getFileList"
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
import commonTable from 'src/components/common-table';
import { downloadFile } from 'src/common/js/utils';
import { listJson, getFileList, downFile } from 'src/api/tender/bidderinformation/performanceinformation';

export default {
  name: '/tender/tenderagencyinfobase/performanceinformation',
  data () {
    return {
      height: '200',
      name: '',
      code: '',
      searchData: {
        projectName: '',
        tenderProjectName: '',
        tendererName: '',
        bidderName: '',
        isTenderProject: '1',
        sectionName: ''
      },
      isShow: false, //
      isDialog: false, // 是否显示详情信息
      isType: 'other', // 判断是招标项目还是委托项目
      tableData: [],
      fileList: []
    };
  },
  mixins: [
    listMixin,
    tableMix
  ],
  components: {
    commonTable
  },
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
      this.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 200;
      this.$refs.table.$el.style.height = this.height;
      this.listConfig.height = this.height;
    },
    /**
     * @description 获取当前列附件列表
     * @author wenruihuan
     * 2019/11/6
     */
    async handleDown (id, originalFileName) {
      try {
        const { data } = await downFile({ id: id });
        console.log(data);
        downloadFile(data, originalFileName);
      } catch (e) {
        console.log(`bidderinformation-performanceinformation handleDown error: ${e}`);
      }
    },
    /**
     * @description 获取历史文件
     * @author wenruihuan
     * 2019/11/6
     */
    async getFileList (obj) {
      try {
        this.fileList = [];
        const { data } = await getFileList({ attachmentId: obj.row.attachmentId });
        if (data.code === process.env.ERR_OK) {
          this.fileList = data.data;
          this.isShow = true;
        }
      } catch (e) {
        console.log(`bidderinformation-performanceinformation getFileList error:${e}`);
      }
    },
    /**
     * @description 切换委托项目和招标项目
     * @author lvzhiyuan
     * @date 2019/11/7
     */
    changeRadio (value) {
      if (value.label === '招标项目') {
        this.isType = 'other';
        this.searchData.isTenderProject = '1';
      } else if (value.label === '委托项目') {
        this.isType = 'electronic';
        this.searchData.isTenderProject = '0';
      }
      this.getList();
    },
    /**
       * @description  查询招标项目分页列表
       * @author wenruihuan
       * 2019/11/6
       */
    async getList () {
      const params = { ...this.searchData, pageNum: this.pageNum, pageSize: this.pageSize };
      const { data } = await listJson(params);
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
  .fileList{
    p{
      cursor: pointer;
      line-height: 35px;
    }
  }
</style>
