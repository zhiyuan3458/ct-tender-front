<template>
  <div class="list-container" @keydown.enter.prevent>
    <div v-show="!isAddEditShow && !isShowSave">
      <div class="box-container nav-container">
        <div class="box-header address-header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-s-home"></i>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>CA绑定</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="box-container tool-container">
        <div class="box-header">
          <h3 class="tool-title">
            <span>绑定CA</span>
          </h3>
        </div>
        <div class="box-body">
          <el-form v-if="isInertCA" :inline="true" :model="conditionForm">
            <el-form-item label="CA密码" prop="password">
              <el-input type="password" v-model="conditionForm.password" placeholder="请输入CA密码"></el-input>
              <p class="error-msg" v-show="errorMsg">{{ errorMsg }}</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :disabled="!conditionForm.password" @click="bindCA">绑定</el-button>
            </el-form-item>
          </el-form>
          <p class="error-msg" v-show="!isInertCA">请接入需要绑定的CA</p>
        </div>
      </div>
      <div class="box-container table-container">
        <div class="box-header">
          <h3 class="tool-title">
            <span>CA列表</span>
          </h3>
        </div>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="trustId"
              align="center"
              label="信任服务号(CA唯一标识)"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="type"
              align="center"
              label="证书类型"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="socialCreditCode"
              label="状态"
              show-overflow-tooltip
            >
              <template>
                已绑定
              </template>
            </el-table-column>
            <el-table-column
              prop="createDate"
              label="证书绑定时间"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template slot-scope="scope">
                <el-button type="text" class="el-btn-edit" size="small" @click="remove(scope.row)">解除绑定</el-button>
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
  </div>
</template>

<script>
import listMixin from 'src/mixins/list';
import { listJson, save, remove } from 'src/api/tender/ca';
import { checkkey, checkPin } from 'src/common/js/ca';

export default {
  name: 'caBind',
  data () {
    return {
      isInertCA: false,
      errorMsg: '',
      /* 查询条件 */
      conditionForm: {
        password: ''
      },
      form: {},
      tableData: [],
      trustId: ''
    };
  },
  created () {
    setInterval(() => {
      const flag = checkkey();
      if (!flag) {
        this.isInertCA = false;
      } else {
        this.isInertCA = true;
      }
    }, 1000);
    this.getList();
  },
  mixins: [listMixin],
  methods: {
    /**
     * @description 绑定CA
     * @author lvzhiyuan
     * @date 2019/10/25
     */
    bindCA () {
      const result = checkPin(this.conditionForm.password);
      if (result.flag) {
        this.errorMsg = '';
        this.conditionForm.password = '';
        const params = {
          trustId: result.code,
          type: result.type
        };
        this.save(params);
      } else {
        this.errorMsg = result.error;
      }
    },
    /**
     * @description 查询CA信息列表
     * @author lvzhiyuan
     * @date 2019/10/22
     */
    async getList () {
      try {
        const params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        };
        const { data } = await listJson(params);
        if (data.code === process.env.ERR_OK) {
          this.tableData = data.data.tableList;
          this.total = data.total;
        }
      } catch (e) {
        console.log(`ca-getList error: ${e}`);
      }
    },
    /**
     * @description 解除绑定单个CA
     * @author lvzhiyuan
     * @date 2019/10/22
     */
    async remove (row) {
      this.$confirm('确定解除绑定该CA?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const params = {
            id: row.id
          };
          const { data } = await remove(params);
          if (data.code === process.env.ERR_OPERATE_OK) {
            this.getList();
          }
        } catch (e) {
          console.log(`ca-remove error: ${e}`);
        }
      }).catch(() => {
      });
    },
    /**
     * @description 保存单个CA信息
     * @author lvzhiyuan
     * @date 2019/10/22
     */
    async save (params) {
      try {
        const { data } = await save(params);
        if (data.code === process.env.ERR_OPERATE_OK) {
          this.errorMsg = '';
          this.getList();
        } else {
          this.errorMsg = data.msg;
        }
      } catch (e) {
        console.log(`ca-save error: ${e}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tool-container {
  height: 120px;
}
.error-msg {
  color: red;
}
</style>
