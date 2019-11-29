<template>
  <div class="list-container">
    <!--  需要固定的部分，使用class为box-container-fix  -->
    <div class="box-container-fix">
      <!--   固定的第一部分   -->
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>统一用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>个人用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="box-body">
          <dictionary-comp
            code="userType"
            v-model="currentRoleByType"
            type="dropdown"
            @changeRow="changeRow"
          >
          </dictionary-comp>
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
            <el-form-item label="姓名">
              <el-input clearable v-model="name" placeholder="请输入姓名查询"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input clearable v-model="userAccount" placeholder="输入用户名查询"></el-input>
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
          v-if="currentRoleByTypeName !== '评审专家'">
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
          :delete-url="`${$urlPrefix.backstage}/sys/bs/user/remove`"
          @edit="handleEdit"
          @remove="handleDelete"
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
    <!--   新增和编辑   -->
    <edit ref="edit" @save="handleSave"></edit>
    <add ref="add" @save="handleSave"></add>
  </div>
</template>

<script>
import add from './add';
import edit from './edit';
import listMixin from 'src/mixins/list';
import tableMix from './tableMix';
import commonTable from 'src/components/common-table';
import { listUser, listRoleByType } from 'src/api/personalUserManagement/index';
import dictionaryComp from 'src/components/dictionary-component';
export default {
  name: '/backstage/personalUserManagement',
  components: {
    add,
    edit,
    dictionaryComp,
    commonTable
  },
  data () {
    return {
      height: '200',
      name: '',
      userAccount: '',
      currentRoleByType: '', // 当前选中角色
      currentRoleByTypeName: '', // 当前选中角色名称
      isAddShow: false,
      isEditShow: false,
      operationEditorDialogVisible: false,
      isDialog: false, // 是否显示新增编辑页面
      formData: [
        {
          userTypeName: ''
        }
      ],
      listRoleByTypeData: '', // 角色信息列表
      tableData: [],
      userType: ''
    };
  },
  mixins: [listMixin, tableMix],
  watch: {
    currentRoleByType (newVal) {
      if (newVal) {
        this.getList();
      }
    }
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
      this.listConfig.height = window.innerHeight - siteNavbarHeight - boxContainerFix - 130;
      window.onresize = () => {
        this.tableHeight();
      };
    },
    /**
     * @description 获取列表信息
     * @author lvzhiyuan
     * @date 2019/11/11
     */
    async getList () {
      const params = {
        userType: this.currentRoleByType,
        name: this.name,
        userAccount: this.userAccount,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      const { data } = await listUser(params);
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
     * @description
     * @author wenruihuan
     * 2019/9/19
     */
    async listRoleByType () {
      const params = {
        type: '0'
      };
      const { data } = await listRoleByType(params);
      try {
        if (data.code === process.env.ERR_OK) {
          this.listRoleByTypeData = data.data;
          this.currentRoleByType = this.listRoleByTypeData[0].code;
          this.currentRoleByTypeName = this.listRoleByTypeData[0].name;
          this.getList();
        }
      } catch (e) {
        console.log(`personalUserManagement-listRoleByType error: ${e}`);
      }
    },
    /**
     * @description
     * @author wenruihuan
     * 选择角色
     * 2019/9/19
     */
    changeRow (val) {
      this.currentRoleByType = val.displayValue;
      this.currentRoleByTypeName = val.displayName;
    },
    /**
     * @description
     * @author wenruihuan
     * 保存新增后
     * 2019/9/18
     */
    handleSave () {
      this.getList();
    },
    /**
     * @description 编辑
     * @author lvzhiyuan
     * @date 2019/10/13
     */
    handleEdit ({ row }) {
      this.isEditShow = true;
      const params = {
        currentRoleByType: this.currentRoleByType,
        currentRoleByTypeName: this.currentRoleByTypeName
      };
      this.$nextTick(() => {
        this.$refs.edit.handleEdit(row.id, params);
      });
    },
    /**
     * @description
     * @author wenruihuan
     * 删除个人用户信息接口
     * 2019/9/16
     */
    handleDelete () {
      this.getList();
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
     * @description
     * @author wenruihuan
     * 保存
     * 2019/9/16
     */
    handleAdd () {
      this.isAddShow = true;
      this.$nextTick(() => {
        const params = {
          currentRoleByType: this.currentRoleByType,
          currentRoleByTypeName: this.currentRoleByTypeName
        };
        this.$refs.add.handleAdd(params);
      });
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
}
.el-table{
  margin-top: 20px;
}
</style>
