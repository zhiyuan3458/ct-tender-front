<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>投标管理</el-breadcrumb-item>
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
              <el-form-item label="招标项目名称">
                <el-input clearable v-model="searchParams.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标项目编号">
                <el-input clearable v-model="searchParams.code" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label=" ">
                <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
                <el-button type="primary" :icon="searchParams.isCurrent === '1' ? 'el-icon-document' : 'el-icon-arrow-left'" @click="handleChangeCurrent">
                  {{ searchParams.isCurrent === '1' ? '历史项目' : '当前项目' }}
                </el-button>
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
      </div>
      <template>
        <common-table
          ref="table"
          :tableData="tableData"
          :listColumn="listColumn"
          :listConfig="listConfig"
          :tableBtns="tableBtns"
          @register="handleRegister"
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
    <add-edit v-if="isDialog" ref="addEdit" @return="handleReturn"></add-edit>
  </div>
</template>
<script>
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import addEdit from './add-edit';
import commonTable from 'src/components/common-table';
import { bidderListJson } from 'src/api/tender/biddermanagement/projectinformation';

export default {
  name: '/tender/biddermanagement/projectinformation',
  data () {
    return {
      searchParams: {
        name: '',
        code: '',
        isCurrent: '1' // 当前项目时值为”1”，历史的则是”0”,后台定的
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
     * @description 点击登记触发
     * @author lizipei
     * @date 2019/11/11
     */
    handleRegister (obj) {
      this.isDialog = true;
      this.$nextTick(() => {
        this.$refs.addEdit.getFormData(obj.row.id);
      });
    },
    /**
     * @description 是否显示历史
     * @author lizipei
     * @date 2019/11/12
     */
    handleChangeCurrent () {
      this.searchParams.isCurrent = this.searchParams.isCurrent === '0' ? '1' : '0';
      /* 当前项目有操作栏，历史项目没有操作栏 */
      this.$set(this.listConfig, 'isShowBtn', this.searchParams.isCurrent === '1');
      this.getList();
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
        const { data } = await bidderListJson(params);
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
        }
      } catch (e) {
        console.log(`error: ${e}`);
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
