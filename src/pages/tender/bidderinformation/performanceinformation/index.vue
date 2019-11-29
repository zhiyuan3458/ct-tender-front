<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>投标人信息库</el-breadcrumb-item>
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
            <el-form :inline="true" class="demo-form-inline" label-width="110px">
              <el-form-item label="招标项目名称">
                <el-input clearable v-model="tenderProjectName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="标段名称">
                <el-input clearable v-model="sectionName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标人名称">
                <el-input clearable v-model="tendererName" placeholder=""></el-input>
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
      <!--      <template>
        <el-table
          :data="tableData"
          width="100%"
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
            prop="tenderProjectName"
            label="招标项目名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="sectionName"
            label="标段名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="tendererName"
            label="招标人名称"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="contractPriceUnit"
            align="center"
            label="合同金额"
          >
          </el-table-column>
          <el-table-column
            prop="settlePriceUnit"
            label="合同结算金额"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="contractDeadline"
            label="合同期限（天）"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="actualDeadline"
            label="实际履约期限（天）"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="signDate"
            label="合同签署时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="endContractDate"
            label="合同完成时间"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="attachmentIdOfPerformance"
            align="center"
            label="合同附件"
          >
            <template slot-scope="scope">
              <el-button @click="getFileList(scope.row.attachmentIdOfPerformance)" type="text" size="small" icon="el-icon-download">附件</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>-->
      <template>
        <common-table
          ref="table"
          :tableData="tableData"
          :height="height"
          :listColumn="listColumn"
          :listConfig="listConfig"
          :tableBtns="tableBtns"
          @edit="getFileList"
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
  name: '/tender/bidderinformation/performanceinformation',
  data () {
    return {
      height: '200',
      projectName: '',
      sectionName: '',
      bidderName: '',
      isTenderProject: '0',
      tendererName: '',
      tenderProjectName: '',
      currentRoleByType: '', // 当前选中角色
      currentRoleByTypeName: '', // 当前选中角色名称
      isShow: false,
      tableData: [],
      fileList: []
    };
  },
  components: {
    commonTable
  },
  mixins: [
    listMixin,
    tableMix
  ],
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
      this.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 130;
      this.$refs.table.$el.style.height = this.height;
      this.listConfig.height = this.height;
    },
    async getList () {
      const params = {
        projectName: this.projectName,
        tenderProjectName: this.tenderProjectName,
        isTenderProject: this.isTenderProject,
        sectionName: this.sectionName,
        bidderName: this.bidderName,
        tendererName: this.tendererName,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
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
    }
    .fileList{
      p{
        cursor: pointer;
        line-height: 35px;
      }
    }
  }
</style>
