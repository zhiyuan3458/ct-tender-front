<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>投标人信息库</el-breadcrumb-item>
            <el-breadcrumb-item>业绩信息</el-breadcrumb-item>
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
              <el-form-item label="项目名称" v-if="isType === 'other'">
                <el-input clearable v-model="searchData.projectName" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标项目名称" v-if="isType !== 'other'">
                <el-input clearable v-model="searchData.projectCode" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="标段名称">
                <el-input clearable v-model="searchData.name" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="招标人名称" v-if="isType !== 'other'">
                <el-input clearable v-model="searchData.name" placeholder=""></el-input>
              </el-form-item>
            </el-form>
            <div class="search-btn search-row-one-btn">
              <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-tabs type="border-card" @tab-click="changeRadio ">
      <el-tab-pane label="其他业绩">
        <div class=" table-container">
          <div class="box-header">
            <h3 class="tool-title">
              <span>查询结果</span>
            </h3>
            <el-button
              class="add-btn"
              type="success"
              size="mini"
              @click="handleAdd('', 'edit')"
              icon="el-icon-circle-plus-outline"
              v-if="isType === 'other'">
              新增
            </el-button>
          </div>
          <template>
            <common-table
              ref="table"
              :tableData="tableData"
              :height="listConfig.height"
              :listColumn="otherListColumn"
              :listConfig="listConfig"
              :tableBtns="otherBtns"
              @edit="handleEdit"
              @view="handleView"
              @remove="handleRemove"
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
      <el-tab-pane label="电子投标业绩">
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
              :height="height"
              :listColumn="electronicListColumn"
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
      </el-tab-pane>
    </el-tabs>
    <add-edit v-if="isDialog" ref="addEdit"></add-edit>
  </div>
</template>
<script>
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import addEdit from './addedit';
import commonTable from 'src/components/common-table';
import { otherachievementListJson, tenderachievementListJson, otherachievementRemove } from 'src/api/tender/bidderinformation/achievementinfo';
export default {
  name: '/tender/bidderinformation/achievementinfo',
  data () {
    return {
      searchData: {
        tenderProjectName: '',
        tendererName: '',
        projectName: '',
        sectionName: ''
      },
      isDialog: false, // 是否显示详情信息
      isType: 'other', // 判断是其他业绩还是电子投标业绩
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
     * @description 编辑
     * @author lvzhiyuan
     * @date 2019/10/13
     */
    handleAdd (id, operation) {
      this.$router.push(`/tender/bidderinformation/achievementinfo/addedit?otherAchievementId=${id}&operation=${operation}`);
    },
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
     * @description 切换委托项目和招标项目
     * @author lvzhiyuan
     * @date 2019/11/7
     */
    changeRadio (value) {
      if (value.label === '其他业绩') {
        this.isType = 'other';
      } else if (value.label === '电子投标业绩') {
        this.isType = 'electronic';
      }
      this.getList();
    },
    /**
     * @description 删除列表项
     * @author lvzhiyuan
     * @date 2019/9/3
     */
    handleRemove (obj) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const { data } = await otherachievementRemove({ id: obj.row.id });
          if (data.code === process.env.ERR_OPERATE_OK) {
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        } catch (e) {
          console.log(`tender-bidderinformation-achievementinfo-index-remove error: ${e}`);
        }
      }).catch(() => {
      });
    },
    /**
       * @description 点击查看业绩详情
       * @author wenruihuan
       * 2019/11/6
       */
    handleView (obj) {
      this.$router.push(`/tender/bidderinformation/achievementinfo/addedit?otherAchievementId=${obj.row.id}&operation=view`);
    },
    /**
       * @description 点击编辑业绩详情
       * @author wenruihuan
       * 2019/11/6
       */
    handleEdit (obj) {
      this.$router.push(`/tender/bidderinformation/achievementinfo/addedit?otherAchievementId=${obj.row.id}&operation=edit`);
    },
    /**
       * @description  查询其他业绩分页列表
       * @author wenruihuan
       * 2019/11/6
       */
    async getList () {
      const params = { ...this.searchData, pageNum: this.pageNum, pageSize: this.pageSize };
      let data;
      if (this.isType === 'other') {
        data = await otherachievementListJson(params);
      } else {
        data = await tenderachievementListJson(params);
      }
      try {
        if (data.data.code === process.env.ERR_OK) {
          this.tableData = data.data.data.tableList;
          this.total = data.data.total;
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
