<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标管理</el-breadcrumb-item>
            <el-breadcrumb-item>开始招标</el-breadcrumb-item>
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
                <el-input clearable v-model="searchData.tenderBatchName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标项目编号">
                <el-input clearable v-model="searchData.tenderBatchCode" placeholder=""></el-input>
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
          @audit="handleAudit"
          @tender="handleTender"
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
  </div>
</template>
<script>
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import commonTable from 'src/components/common-table';
import { tenderListJson } from 'src/api/tender/tendermanagement/starttender';
export default {
  name: 'startTender',
  components: {
    commonTable
  },
  mixins: [
    listMixin,
    tableMix
  ],
  data () {
    return {
      searchData: {
        projectName: '',
        projectCode: '',
        tenderBatchName: '',
        tenderBatchCode: ''
      },
      tableData: []
    };
  },
  created () {
    this.getList();
  },
  mounted () {
    this.tableHeight();
  },
  methods: {
    /**
     * @description 设置table高度
     * @author lvzhiyuan
     * @date 2019/11/12
     */
    tableHeight () {
      this.$nextTick(() => {
        const siteNavbarHeight = document.getElementsByClassName('site-navbar')[0].clientHeight;
        const boxContainerFix = document.getElementsByClassName('box-container-fix')[0].clientHeight;
        const height = window.innerHeight - siteNavbarHeight - boxContainerFix - 130;
        this.$refs.table.$el.style.height = height;
        this.listConfig.height = height;
        window.onresize = () => {
          this.tableHeight();
        };
      });
    },
    /**
       * @description 点击资深按钮触发
       * @author wenruihuan
       * 2019/11/6
       */
    handleAudit (obj) {
      const { row } = obj;
      window.open(`/tender/tendermanagement/checkqualificationofprequalification/sendbid/prequalificationdocumentrecord?tenderBatchInfoId=${row.id}`, '_blank');
    },
    /**
     * @description 点击招标按钮触发
     * @author lvzhiyuan
     * @date 2019/11/12
     */
    handleTender (obj) {
      const { row } = obj;
      window.open(`/tender/tendermanagement/tenderofprequalification/sendbid/tenderfilerecord?tenderBatchInfoId=${row.id}`, '_blank');
    },
    /**
     * @description 获取项目信息分页列表
     * @author lvzhiyuan
     * @date 2019/11/12
     */
    async getList () {
      const params = { ...this.searchData, pageNum: this.pageNum, pageSize: this.pageSize };
      const { data } = await tenderListJson(params);
      try {
        if (data.code === process.env.ERR_OK) {
          const showOperateBtns = new Map([
            [{ qualificationReviewWay: '资格预审' }, ['audit', 'tender']],
            [{ qualificationReviewWay: '资格后审' }, ['tender']]
          ]);
          const disabledBtns = new Map([
            [{ qualificationReviewWay: '资格预审' }, ['tender']]
          ]);
          this.tableData = data.data.tableList;
          this.tableData.forEach(item => {
            item.rowBtns = this.$utils.handleOperateBtns(item, [showOperateBtns, disabledBtns])[0];
            item.disbledBtns = this.$utils.handleOperateBtns(item, [showOperateBtns, disabledBtns])[1];
          });
          this.total = data.total;
          this.tableHeight();
        }
      } catch (e) {
        console.log(`tender-tendermanagement-starttender-getList error: ${e}`);
      }
    },

    /**
     * @description 点击查询触发
     * @author lvzhiyuan
     * @date 2019/11/12
     */
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
    }
  }
}
</style>
