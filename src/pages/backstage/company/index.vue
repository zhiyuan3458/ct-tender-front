<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>统一用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>企业管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="box-body">
          <dictionary-comp
            code="companyType"
            v-model="currentCompanyType"
            type="dropdown"
            @changeRow="changeRow"
            @allRow="changeRoleByTypeList"
          >
          </dictionary-comp>
        </div>
      </div>
      <div class="box-container">
        <div class="box-header">
          <h3 class="tool-title">
            <span>查询条件</span>
          </h3>
        </div>
        <div class="box-body">
          <el-form :inline="true" ref="ruleForm" :model="ruleForm">
            <el-form-item label="单位名称" prop="name">
              <el-input maxlength="100" clearable v-model="ruleForm.name" placeholder="请输入单位名称/简称"></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="socialCreditCode">
              <el-input maxlength="18" clearable v-model="ruleForm.socialCreditCode" placeholder="输入统一社会信用代码"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="box-container table-container">
      <el-tabs type="border-card" @tab-click="changeRadio">
        <el-tab-pane label="待审核">
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
                :listColumn="listColumn"
                :listConfig="listConfig"
                :tableBtns="tableBtns"
                :delete-url="`${$urlPrefix.backstage}/sys/bs/user/remove`"
                @edit="handleEdit"
                @remove="handleDelete"
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
        <el-tab-pane label="所有单位">
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
                :listColumn="listColumn"
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
    </div>
    <add-edit v-if="isAddEditShow" :isShowSave="isShowSaveBtn" ref="addEdit" @save="saveFn"></add-edit>
  </div>
</template>

<script>
import listMixin from 'src/mixins/list';
import { listJson } from 'src/api/company';
import dictionaryComp from 'src/components/dictionary-component';
import addEdit from './add-edit';
import tableMix from './tableMix';
import commonTable from 'src/components/common-table';
export default {
  name: '/backstage/company',
  data () {
    return {
      /* 选择企业类型 */
      companyType: '',
      height: '0',
      ruleForm: {
        name: '',
        socialCreditCode: ''
      },
      auditStatus: '待审核',
      roleByTypeList: [], // 所有企业类型
      tableData: [],
      currentCompanyType: '',
      currentCompanyTypeName: '',
      isAddEditShow: false,
      isShowSaveBtn: false
    };
  },
  props: {
    isShowSave: {
      type: Boolean,
      default: false
    }
  },
  components: {
    dictionaryComp,
    commonTable,
    addEdit
  },
  mixins: [listMixin, tableMix],
  created () {
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
      this.listConfig.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 200;
      window.onresize = () => {
        this.tableHeight();
      };
    },
    /**
     * @获取所有企业类型
     * @author wenruihuan
     * 2019/9/26
     */
    changeRoleByTypeList (val) {
      this.ruleForm.socialCreditCode = '';
      this.ruleForm.name = '';
      this.roleByTypeList = val;
    },
    /**
     * @description
     * @author wenruihuan
     * 选择角色
     * 2019/9/19
     */
    changeRow (val) {
      this.auditStatus = '待审核';
      this.currentCompanyType = val.displayValue;
      this.currentCompanyTypeName = val.displayName;
      this.getList();
    },
    /**
     * @description 切换待审核和已审核
     * @author lvzhiyuan
     * @date 2019/10/13
     */
    changeRadio (value) {
      if (value.label === '待审核') {
        this.auditStatus = value.label;
      } else {
        this.auditStatus = '';
      }
      this.getList();
    },
    /**
     * @description 获取企业列表数据
     * @author lvzhiyuan
     * @date 2019/9/30
     */
    async getList () {
      try {
        const params = {
          companyType: this.currentCompanyType,
          name: this.ruleForm.name,
          socialCreditCode: this.ruleForm.socialCreditCode,
          auditStatus: this.auditStatus,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const { data } = await listJson(params);
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
          const operateBtns = new Map([
            [{ auditStatus: '审核不通过' }, ['view']],
            [{ auditStatus: '审核通过' }, ['view']],
            [{ auditStatus: '待审核' }, ['view', 'edit']]
          ]);
          data.data.tableList.forEach(m => {
            m.rowBtns = this.$utils.handleOperateBtns(m, [operateBtns])[0];
          });
          setTimeout(() => {
            this.tableHeight();
          }, 15);
        }
      } catch (e) {
        console.log(`backstage-company-getList error: ${e}`);
      }
    },
    /**
     * @description 点击查询时触发
     * @author lvzhiyuan
     * @date 2019/9/30
     */
    handleSubmit () {
      this.getList();
    },
    /**
     * @description 点击编辑触发
     * @author lvzhiyuan
     * @date 2019/9/30
     */
    handleEdit (row, status) {
      if (status === 'edit') {
        this.isAddEditShow = true;
        this.isShowSaveBtn = true;
      } else {
        this.isShowSaveBtn = false;
        this.isAddEditShow = true;
      }
      this.$nextTick(() => {
        this.$refs.addEdit.getFormData(row.id, this.roleByTypeList, status);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-radio-group{
  margin: 0 20px;
}
.list-container{
  position: relative;
  .table-container{
    .box-header{
      padding: 0;
      border-bottom: 0;
      height: 25px;
      line-height: 25px;
    }
    .box-body{
      padding: 20px 0;
      .name{
        margin-right: 10px;
      }
    }
  }
}
</style>
