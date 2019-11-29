<template>
  <div class="Informationbase">
    <div class="info-tips" v-if="params.auditStatus === '待审核'">信息审核中</div>
    <div class="box-container table-container">
      <template>
        <el-table
          :data="tableData"
          width="100%"
          :height="height"
          stripe
          header-cell-style="background: #3592cb; color:#fff;border-right:#fff solid 1px; "
          ref="table"
        >
          <el-table-column
            prop="versions"
            label="序号"
            align="center"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="auditDate"
            label="变更时间"
            align="center"
            show-overflow-tooltip
          >
<!--            <template slot-scope="scope">-->
<!--              <p>{{ formatDate(scope.row.auditDate, 'Y-M-D h:m:s') }}</p>-->
<!--            </template>-->
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button class="el-btn-edit" type="text" style="color: #44C1B9;" size="small" @click="handleEdit(scope.row.id)">详情</el-button>
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
    <el-dialog width="900px" :visible.sync="showBasicInfo">
      <basic-info :isRequired="false" :historyId="historyId" :isJump="true"></basic-info>
    </el-dialog>
  </div>
</template>

<script>
import listMixin from 'src/mixins/list';
import { list } from 'src/api/tender/tenderagencyinfobase';
import { formatDate } from 'src/common/js/utils';
import basicInfo from 'src/pages/tender/tenderagencyinfobase/enterpriseinformation/basicinfo';

export default {
  name: 'tenderagencyinfobase',
  props: {
    params: {
      auditStatus: ''
    }
  },
  components: {
    basicInfo
  },
  mixins: [listMixin],
  data () {
    return {
      tableData: [],
      historyId: '',
      showBasicInfo: false
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /**
     * @description 获取企业信息变更历史列表
     * @author lizipei
     * @date 2019/10/28
     */
    async getList () {
      try {
        const { data } = await list({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        });
        this.tableData = data.data.tableList;
        this.total = data.total;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * @description 详情弹窗
     * @author lizipei
     * @date 2019/10/28
     */
    handleEdit (id) {
      this.historyId = id;
      this.showBasicInfo = true;
    },
    /**
     * @description 日期格式化
     * @author lizipei
     * @date 2019/10/28
     */
    formatDate (date, type) {
      return formatDate(date, type);
    }
  }
};
</script>

<style lang="scss" scoped>
  /deep/.el-dialog {
    height: 70vh;
    .el-dialog__body{
      height: 65vh;
      overflow-y: auto;
    }
  }
</style>
