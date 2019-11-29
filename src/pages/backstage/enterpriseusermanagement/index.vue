<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>统一用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>企业用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="box-body">
          <dictionary-comp
            code="companyType"
            v-model="currentRoleByTypeName"
            @changeRow="changeRow"
            @allRow="changeRoleByTypeList"
            type="dropdown"
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
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="单位名称">
              <el-input maxlength="100" clearable v-model="name" placeholder="请输入单位或简称"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input maxlength="20" clearable v-model="userAccount" placeholder="输入用户名查询"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="box-container table-container">
      <div class="box-header">
        <h3 class="tool-title">
          <span>查询结果</span>
        </h3>
        <el-button class="add-btn" type="success" size="mini" @click="handleAdd" icon="el-icon-circle-plus-outline" v-if="currentRoleByTypeName !== '投标单位'">新增</el-button>
      </div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
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
            align="center"
            prop="companyName"
            label="企业名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="企业类型"
            align="center"
            prop="companyType"
          >
            <template v-if="roleByTypeList.length > 0" slot-scope="scope">
              {{ roleByTypeList.find( m => m.displayValue === scope.row.companyType).displayName}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="userAccount"
            label="用户名"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            show-overflow-tooltip
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="telephone"
            label="手机"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="userStatus"
            label="账号状态"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" style="color: #44C1B9;" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    <add v-if="isAddShow" ref="add" @save="handleSave"></add>
    <edit v-if="isEditShow" ref="edit" @save="handleSave"></edit>
  </div>
</template>

<script>
import dictionaryComp from 'src/components/dictionary-component';
import listMixin from 'src/mixins/list';
import { listCompanyUser, listRoleByType } from 'src/api/enterpriseUserManagement';
import add from './add';
import edit from './edit';
export default {
  name: '/backstage/enterpriseusermanagement',
  components: {
    add,
    edit,
    dictionaryComp
  },
  data () {
    return {
      name: '',
      height: '0',
      userAccount: '',
      // 当前选中企业类型
      currentRoleByType: '',
      // 当前选中企业类型名称
      currentRoleByTypeName: '',
      formData: [
        {
          userType: '系统客服人员'
        }
      ],
      // 企业类型信息列表
      listRoleByTypeData: [],
      tableData: [],
      // 所有企业类型
      roleByTypeList: [],
      isAddShow: false,
      isEditShow: false
    };
  },
  watch: {
    currentRoleByType (newVal) {
      if (newVal) {
        this.getList();
      }
    }
  },
  mixins: [listMixin],
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
    },
    /**
     * @description 获取列表信息
     * @author lvzhiyuan
     * @date 2019/11/28
     */
    async getList () {
      const params = {
        name: this.name,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        userAccount: this.userAccount,
        companyType: this.currentRoleByType
      };
      const { data } = await listCompanyUser(params);
      try {
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
          setTimeout(() => {
            this.tableHeight();
          }, 15);
        };
      } catch (e) {
        console.log(`enterpriseUserManagement-getList error: ${e}`);
      }
    },
    async listRoleByType () {
      const params = {
        type: '1'
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
        console.log(`enterpriseUserManagement-listRoleByType error: ${e}`);
      }
    },
    /**
     * @description 点击新增按钮时触发
     * @author lvzhiyuan
     * @date 2019/10/1
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
    },
    /**
     * @description 点击编辑时触发
     * @author lvzhiyuan
     * @date 2019/10/1
     */
    handleEdit (row) {
      this.isEditShow = true;
      this.$nextTick(() => {
        this.$refs.edit.getFormData(row.id);
      });
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
     * @获取所有企业类型
     * @author wenruihuan
     * 2019/9/26
     */
    changeRoleByTypeList (val) {
      this.roleByTypeList = val;
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
     * @description 点击查询按钮触发
     * @author lvzhiyuan
     * @date 2019/10/1
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
