<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>发标</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
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
              <el-form-item label="标段名称">
                <el-input clearable v-model="searchParams.sectionName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label=" ">
              </el-form-item>
              <el-form-item label=" " style="text-align: right;">
                <el-button type="primary" @click="getList" icon="el-icon-search">查询</el-button>
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
          @view="handleView"
          @edit="handleEdit"
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
    <add-edit v-if="isDialog" :show-type="addEditType" :tenderBatchInfoId="tenderBatchInfoId" :type="type" ref="addEdit" @return="handleReturn"></add-edit>
  </div>
</template>
<script>
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import addEdit from './add-edit';
import commonTable from 'src/components/common-table';
import { listJson } from 'src/api/tender/biddermanagement/clarificationrequest';

export default {
  data () {
    return {
      searchParams: {
        sectionName: ''
      },
      isDialog: false, // 是否显示详情信息
      tableData: [],
      addEditType: ''
    };
  },
  props: {
    tenderBatchInfoId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '' // 1为招标文件类型, 2为资格预审文件类型
    }
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
     * @description 设置table高度
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
     * @date 2019/11/13
     */
    handleAdd () {
      this.isDialog = true;
      this.addEditType = 'add';
      this.$nextTick(() => {
        this.$refs.addEdit.isShow = true;
      });
    },
    /**
     * @description 点击编辑触发
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
     * @description 获取列表
     * @author lizipei
     * @date 2019/11/13
     */
    async getList () {
      try {
        const params = {
          ...this.searchParams,
          tenderBatchInfoId: this.tenderBatchInfoId,
          fileType: this.type,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const { data } = await listJson(params);
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
        }
      } catch (e) {
        console.log(`error: ${e}`);
      }
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
</style>
