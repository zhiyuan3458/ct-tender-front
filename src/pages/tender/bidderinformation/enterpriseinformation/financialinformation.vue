<template>
  <div class="Informationbase">
    <div class="info-tips" v-if="params.auditStatus === '待审核'">信息审核中</div>
    <div class="title">财务状况表</div>
    <div class="operationTable">
      <el-form :model="addItemData" ref="ctForm">
        <el-table
          :data="addItemData"
          style="width: 100%"
          :height="height"
          ref="table"
        >
          <el-table-column
            align="center"
            fixed
            width="120px"
            label="操作"
            v-if="params.auditStatus !== '待审核'"
          >
            <template slot-scope="scope">
              <el-form-item>
                <el-button title="删除" type="text" class="remove-icon-color" size="small" @click="handleDelete(scope.row)"
                           icon="el-icon-delete">
                </el-button>
                <el-button title="保存" v-if="scope.row.edit" type="text" class="save-icon-color" size="small"
                           @click="confirmSave(scope.row)" icon="el-icon-mobile">
                </el-button>
                <el-button title="编辑" v-if="!scope.row.edit" @click='confirmEdit(scope.row, "other")' type="text"
                           class="edit-icon-color" size="small" icon="el-icon-edit">
                </el-button>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            width="240"
            align="center"
            prop="yearOfFinance"
            label="年份"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.yearOfFinance}`">
                  <el-date-picker
                    v-model="scope.row.yearOfFinance"
                    type="year"
                    format="yyyy"
                    value-format="yyyy"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.yearOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="注册资金(万元)"
            align="center"
            width="120px"
            prop="registeredCapitalOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.registeredCapitalOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.registeredCapitalOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.registeredCapitalOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="总资产(万元)"
            align="center"
            width="120px"
            prop="totalAssetOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.totalAssetOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.totalAssetOfFinance"></el-input>
                </el-form-item>
              </template>

              <span v-else>{{ scope.row.totalAssetOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="净资产(万元)"
            width="120px"
            align="center"
            prop="netAssetOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.netAssetOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.netAssetOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.netAssetOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="固定资产(万元)"
            align="center"
            width="120px"
            prop="fixedAssetOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.fixedAssetOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.fixedAssetOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.fixedAssetOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="流动资产(万元)"
            align="center"
            width="120px"
            prop="currentAssetOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.currentAssetOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.currentAssetOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.currentAssetOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="流动负债(万元)"
            align="center"
            width="120px"
            prop="currentDebtOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.currentDebtOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.currentDebtOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.currentDebtOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="负债总额(万元)"
            width="120px"
            align="center"
            prop="totalDebtOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.totalDebtOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.totalDebtOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.totalDebtOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="营业收入(万元)"
            align="center"
            width="120px"
            prop="incomeOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.incomeOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.incomeOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.incomeOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="利润总额(万元)"
            align="center"
            width="120px"
            prop="totalProfitOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.totalProfitOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.totalProfitOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.totalProfitOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="净利润(万元)"
            align="center"
            width="120px"
            prop="netProfitOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.netProfitOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.netProfitOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.netProfitOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="现金流量净额(万元)"
            align="center"
            width="120px"
            prop="netCashFlowOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.netCashFlowOfFinance}`">
                  <el-input maxlength="10" class="edit-input" size="small" v-model="scope.row.netCashFlowOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.netCashFlowOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="总资产报酬率"
            width="120px"
            align="center"
            prop="incomeOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.paybackRatioOfFinance}`">
                  <el-input maxlength="5" class="edit-input" size="small" v-model="scope.row.paybackRatioOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.paybackRatioOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="净资产收益率"
            align="center"
            prop="yieldRatioOfFinance"
            width="120px"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.yieldRatioOfFinance}`">
                  <el-input maxlength="5" class="edit-input" size="small" v-model="scope.row.yieldRatioOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.yieldRatioOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="主营业务利润率"
            align="center"
            width="120px"
            prop="profitRatioOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.profitRatioOfFinance}`">
                  <el-input maxlength="5" class="edit-input" size="small" v-model="scope.row.profitRatioOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.profitRatioOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="资产负债率(%)"
            align="center"
            width="120px"
            prop="debtRatioOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.debtRatioOfFinance}`">
                  <el-input maxlength="5" class="edit-input" size="small" v-model="scope.row.debtRatioOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.debtRatioOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="速动比率(%)"
            align="center"
            width="120px"
            prop="quickRatioOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.quickRatioOfFinance}`">
                  <el-input maxlength="5" class="edit-input" size="small" v-model="scope.row.quickRatioOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.quickRatioOfFinance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="流动比率(%)"
            align="center"
            width="120px"
            prop="currentRatioOfFinance"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-form-item :prop="`${scope.$index}.${scope.row.currentRatioOfFinance}`">
                  <el-input maxlength="5" class="edit-input" size="small" v-model="scope.row.currentRatioOfFinance"></el-input>
                </el-form-item>
              </template>
              <span v-else>{{ scope.row.currentRatioOfFinance }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div class="addRowDataBtn" v-if="params.auditStatus !== '待审核'">
        <el-button title="新增" icon="el-icon-plus" @click="addRowData()" type="text"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { listJson, save, remove } from 'src/api/tender/financialinformation';
import { deepClone } from 'src/common/js/utils';
// 投标人信息
export default {
  name: 'bidderinformation',
  props: {
    params: {
      auditStatus: ''
    }
  },
  data () {
    return {
      addItemData: [
        {
          name: '',
          edit: false,
          qualificationType: '',
          qualificationLevel: '',
          certificateCode: '',
          issueDept: '',
          issueDate: ''
        }
      ],
      oldList: [],
      oldMianList: []
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /**
       * @description 查询企业资质信息列表接口
       * @author wenruihuan
       * 2019/10/29
       */
    async getList () {
      try {
        const { data } = await listJson();
        const mainData = [];
        this.addItemData = [];
        if (data.code === process.env.ERR_OK) {
          data.data.forEach(m => {
            if (m.isMain === '1') {
              mainData.push(m);
            } else {
              this.addItemData.push(m);
            }
          });
          this.list = this.addItemData.map(v => {
            this.$set(v, 'edit', false);
            return v;
          });
          if (mainData.length > 0) {
            this.mainData = mainData.map(v => {
              this.$set(v, 'edit', false);
              return v;
            });
          }
          this.oldList = deepClone(this.addItemData);
        }
      } catch (e) {
        console.log(`tender-qualificationinformation-listJson error: ${e}`);
      }
    },
    /**
       * @description 新增增项资质列数
       * @author wenruihuan
       * 2019/10/29
       */
    /**
       * @description 新增企业资质信息
       * @author wenruihuan
       * 2019/10/29
       */
    addRowData () {
      const addList = {
        name: '',
        qualificationType: '',
        qualificationLevel: '',
        certificateCode: '',
        edit: true,
        issueDept: '',
        issueDate: ''
      };
      this.addItemData.push(addList);
    },
    /**
       * @description 取消企业资质信息
       * @author wenruihuan
       * 2019/10/29
       */
    cancelEdit (scope, row) {
      this.addItemData[scope.$index] = this.oldList[scope.$index];
      row.edit = false;
    },
    /**
       * @description 保存企业资质信息
       * @author wenruihuan
       * 2019/10/29
       */
    async confirmSave (row) {
      try {
        const { data } = await save(row);
        if (data.code === process.env.ERR_OPERATE_OK) {
          row.id = data.data.id;
          row.edit = false;
        }
      } catch (e) {
        console.log(`tender-qualificationinformation-listJson error: ${e}`);
      }
    },
    /**
       * @description 触发编辑按钮，将数据存储到oldList
       * @author wenruihuan
       * 2019/10/29
       */
    confirmEdit (row, type) {
      if (type === 'Main') {
        this.oldMianList = deepClone(this.mainData);
        row.edit = true;
      } else {
        this.oldList = deepClone(this.addItemData);
        row.edit = true;
      }
    },
    /**
       * @description 删除当前列数据
       * @author wenruihuan
       * 2019/10/29
       */
    async handleDelete (row) {
      this.$confirm('确定删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          console.log(row);
          const { data } = await remove({ id: row.id });
          if (data.code === process.env.ERR_OPERATE_OK) {
            this.getList();
          }
        } catch (e) {
          console.log(`tender-qualificationinformation-handleDelete error: ${e}`);
        }
      }).catch(() => {});
    }
  }
};
</script>

<style scoped lang="scss">
  .Informationbase {
    .addRowDataBtn{
      width: 127px;
      text-align: center;
      button{
        font-size: 18px;
        font-weight: bold;
        color: rgb(68, 193, 185);
        i{
          & :before{
            font-weight: bold;
          }
        }
      }
    }
    /deep/ .el-form-item{
      margin-bottom: 0 !important;
    }
    /deep/.el-table{
      td{
        min-width: 150px;
      }
    }
    /deep/.el-date-editor{
      width: 100%;
      .el-input__inner{
        padding-right: 10px;
      }
    }
  }
</style>
