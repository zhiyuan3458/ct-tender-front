<template>
  <div class="file-back-up list-container">
    <!--  需要固定的部分，使用class为box-container-fix  -->
    <div class="box-container-fix">
      <!--   固定的第一部分   -->
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>发标</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <!--   固定的第二部分   -->
      <div class="box-container">
        <div class="box-header">
          <h3 class="tool-title">
            <span>查询条件</span>
          </h3>
        </div>
        <div class="box-body">
          <el-form :inline="true">
            <el-form-item label="文件标题">
              <el-input clearable v-model="fileTitle"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <!--  列表部分  -->
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
          icon="el-icon-circle-plus-outline"
        >
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
          @show="handleShow"
        >
        </common-table>
      </template>
      <!--   分页部分   -->
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
    <!--   新增和查看   -->
    <add v-if="isAddShow" ref="add"></add>
    <show v-if="isShowShow" ref="show"></show>
  </div>
</template>

<script>
import add from './add';
import show from './show';
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import commonTable from 'src/components/common-table';

export default {
  components: {
    add,
    show,
    commonTable
  },
  data () {
    return {
      /* 文件标题 */
      fileTile: '',
      isAddShow: false,
      isShowShow: false,
      api: '/tender/td/projectmanagement/filerecordinfo/listJson'
    };
  },
  props: {
    /* 副标题 */
    title: {
      type: String
    },
    /* 招标文件类型与资格预审招标文件类型 */
    fileType: {
      type: String
    }
  },
  mixins: [listMixin, tableMix],
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
     * @date 2019/11/18
     */
    tableHeight () {
      setTimeout(() => {
        const siteNavbarHeight = document.getElementsByClassName('site-navbar')[0].clientHeight;
        const boxContainerFix = document.getElementsByClassName('box-container-fix')[0].clientHeight;
        this.listConfig.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 130;
        window.onresize = () => {
          this.tableHeight();
        };
      }, 20);
    },
    /**
     * @description 获取列表信息
     * @author lvzhiyuan
     * @date 2019/11/18
     */
    async getList () {
      const params = {
        tenderBatchInfoId: this.$route.query.tenderBatchInfoId,
        fileTitle: this.fileTitle,
        fileType: this.fileType,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      const { data } = await this.$http.get(this.api, params);
      try {
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
          setTimeout(() => {
            this.tableHeight();
          }, 15);
        }
      } catch (e) {
        console.log(`src-components-file-back-up-getList error: ${e}`);
      }
    },
    /**
     * @description 查询
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    handleSubmit () {
      this.getList();
    },
    /**
     * @description 新增
     * @author lvzhiyuan
     * @date 2019/11/18
     */
    handleAdd () {
      this.isAddShow = true;
      this.$nextTick(() => {
        this.$refs.add.showAddPage();
      });
    },
    /**
     * @description 查看
     * @author lvzhiyuan
     * @date 2019/11/18
     */
    handleShow ({ row }) {
      this.isShowShow = true;
      this.$nextTick(() => {
        this.$refs.show.getFormData(row.id);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.file-back-up{
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
