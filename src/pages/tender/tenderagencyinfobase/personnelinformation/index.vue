<template>
  <div class="list-container">
    <div class="box-container-fix">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>招标代理信息库</el-breadcrumb-item>
            <el-breadcrumb-item>人员信息</el-breadcrumb-item>
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
              <el-form-item label="人员姓名">
                <el-input clearable v-model="name" placeholder="输入人员姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码">
                <el-input clearable v-model="identityCode" placeholder="输入身份证号码"></el-input>
              </el-form-item>
              <el-form-item style="text-align: right;">
                <el-button type="primary" @click="handleSubmit" icon="el-icon-search">查询</el-button>
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
        <el-button class="add-btn" type="success" size="mini" @click="handleAdd('', 'edit')" icon="el-icon-circle-plus-outline">新增</el-button>
      </div>
      <template>
        <el-table
          :data="tableData"
          width="100%"
          class="common-table-container"
          :height="height"
          ref="table"
          size="mini"
          :header-cell-style="headerCellStyle"
          :cell-style="cellStyle"
          :row-style="rowStyle"
        >
          <el-table-column
            type="index"
            align="center"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="identityCode"
            label="身份证号码"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="position"
            label="职务"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="techTitle"
            align="center"
            label="技术职称"
          >
          </el-table-column>
          <el-table-column
            prop="firstDegree"
            label="第一学历"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="specialtyOfFirstDegree"
            label="第一学历所学专业"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="workYears"
            label="从业年限（年）"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="联系方式"
            align="center"
          >
          </el-table-column>
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <div style="white-space: nowrap;">
                <el-button class="el-btn-view" type="text" style="color: #44C1B9;" size="small" @click="handleAdd(scope.row.id, 'view')">查看</el-button>
                <el-button class="el-btn-edit" type="text" style="color: #44C1B9;" size="small" @click="handleAdd(scope.row.id, 'edit')">编辑</el-button>
                <el-button class="el-btn-delete" @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
              </div>
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
  </div>
</template>
<script>
import listMixin from 'src/mixins/list';
import { listJson, remove } from 'src/api/tender/personnelinformation';
export default {
  name: '/tender/tenderagencyinfobase/personnelinformation',
  computed: {
    /**
     * @description 头部样式
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    headerCellStyle () {
      return {
        background: '#3592CB',
        color: 'white',
        height: '48px'
      };
    },
    /**
     * @description 列表单元格属性
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    cellStyle () {
      return {
        color: '#909399'
      };
    }
  },
  data () {
    return {
      height: '200',
      name: '',
      selected: '基本信息',
      identityCode: '',
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
  mixins: [listMixin],
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
     * @description 列表每一行的样式
     * @author lvzhiyuan
     * @date 2019/11/5
     */
    rowStyle ({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return { background: '#F0F2F5' };
      } else {
        return { background: 'white' };
      }
    },
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
    async getList () {
      const params = {
        name: this.name,
        identityCode: this.identityCode,
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
    handleAdd (id, operation) {
      this.$router.push(`/tender/tenderagencyinfobase/personnelinformation/addedit?personnelId=${id}&operation=${operation}`);
    },
    /**
       * @description
       * @author wenruihuan
       * 删除个人用户信息接口
       * 2019/9/16
       */
    handleDelete (id) {
      this.$confirm('确认删除用户信息！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = {
          id: id
        };
        try {
          const { data } = await remove(params);
          if (data.code === process.env.ERR_OPERATE_OK) {
            this.getList();
          }
        } catch (e) {
          console.log(`personalUserManagement-handleDelete error: ${e}`);
        }
      });
    },
    handleSubmit () {
      this.getList();
    },
    /**
       * @description
       * @author wenruihuan
       * 保存
       * 2019/9/16
       */
    handleAdd1 () {
      this.isAddShow = true;
      this.$nextTick(() => {
        const params = {
          currentRoleByType: this.currentRoleByType,
          currentRoleByTypeName: this.currentRoleByTypeName
        };
        this.$refs.add.handleAdd(params);
      });
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
  .common-table-container {
    width: 98% !important;
    margin: 0 auto;
  }
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
