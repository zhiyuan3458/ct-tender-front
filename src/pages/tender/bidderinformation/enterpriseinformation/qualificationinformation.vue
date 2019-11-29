<template>
  <div class="Informationbase">
    <div class="info-tips" v-if="params.auditStatus === '待审核'">信息审核中</div>
    <div class="title">主项资质</div>
    <div class="operationTable">
      <el-table
        :data="mainData"
        style="width: 100%;overflow: auto;"
        :height="height"
        ref="table"
      >

        <el-table-column
          align="center"
          label="操作"
          width="120px"
          v-if="params.auditStatus !== '待审核'"
          fixed
        >
          <template slot-scope="scope">
            <el-button title="保存" v-if="scope.row.edit" type="text" class="save-icon-color" size="small"
                       @click="confirmSave(scope.row, '1')" icon="el-icon-mobile">
            </el-button>
            <el-button title="编辑" v-if="!scope.row.edit" @click='confirmEdit(scope.row, "Main")' type="text"
                       class="edit-icon-color" size="small" icon="el-icon-edit">
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyName"
          label="资质名称"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.name"></el-input>
            </template>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="资质类型"
          align="center"
          prop="qualificationType"
        >
          <template slot-scope="scope">
            <dictionary-comp
              code="qualificationType"
              :show-span="!scope.row.edit"
              v-model="scope.row.qualificationType"
            ></dictionary-comp>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="userAccount"
          label="资质等级"
        >
          <template slot-scope="scope">
            <dictionary-comp
              :show-span="!scope.row.edit"
              code="qualificationLevel"
              v-model="scope.row.qualificationLevel"
            ></dictionary-comp>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          show-overflow-tooltip
          label="证书编号"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.certificateCode"></el-input>
            </template>
            <span v-else>{{ scope.row.certificateCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="issueDept"
          label="发证机关"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input maxlength="100" class="edit-input" size="small" v-model="scope.row.issueDept"></el-input>
            </template>
            <span v-else>{{ scope.row.issueDept }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="issueDate"
          width="240px"
          label="发证日期"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-date-picker
                v-model="scope.row.issueDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
            <span v-else>{{ scope.row.issueDate }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="title">增项资质</div>
    <div class="operationTable">
      <el-table
        :data="addItemData"
        style="width: 100%"
        :height="height"
        ref="table"
      >

        <el-table-column
          align="center"
          label="操作"
          width="120px"
          v-if="params.auditStatus !== '待审核'"
          fixed
        >
          <template slot-scope="scope">
            <el-button title="删除" type="text" class="remove-icon-color" size="small" @click="handleDelete(scope.row)"
                       icon="el-icon-delete">
            </el-button>
            <el-button title="保存" v-if="scope.row.edit" type="text" class="save-icon-color" size="small"
                       @click="confirmSave(scope.row, '0')" icon="el-icon-mobile">
            </el-button>
<!--            <el-button title="取消" v-if="scope.row.edit" type="text" style="color: #44C1B9;" size="small"-->
<!--                       @click="cancelEdit(scope, scope.row, '0')" icon="el-icon-close">-->
<!--            </el-button>-->
            <el-button title="编辑" v-if="!scope.row.edit" @click='confirmEdit(scope.row, "other")' type="text"
                       class="edit-icon-color" size="small" icon="el-icon-edit">
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          align="center"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="companyName"
          label="资质名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.name"></el-input>
            </template>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="资质类型"
          align="center"
          prop="qualificationType"
        >
          <template slot-scope="scope">
            <dictionary-comp
              code="qualificationType"
              :show-span="!scope.row.edit"
              v-model="scope.row.qualificationType"
            ></dictionary-comp>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="userAccount"
          label="资质等级"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <dictionary-comp
              :show-span="!scope.row.edit"
              code="qualificationLevel"
              v-model="scope.row.qualificationLevel"
            ></dictionary-comp>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          show-overflow-tooltip
          label="证书编号"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.certificateCode"></el-input>
            </template>
            <span v-else>{{ scope.row.certificateCode }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="issueDept"
          label="发证机关"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input maxlength="100" class="edit-input" size="small" v-model="scope.row.issueDept"></el-input>
            </template>
            <span v-else>{{ scope.row.issueDept }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="issueDate"
          width="160px"
          label="发证日期"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-date-picker
                v-model="scope.row.issueDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </template>
            <span v-else>{{ scope.row.issueDate }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="addRowDataBtn" v-if="params.auditStatus !== '待审核'">
        <el-button title="新增" icon="el-icon-plus" @click="addRowData()" type="text"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { listJson, save, remove } from 'src/api/tender/qualificationinformation';
import { deepClone } from 'src/common/js/utils';
import dictionaryComp from 'src/components/dictionary-component/index';
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
      addItemData: [],
      mainData: [
        {
          name: '',
          isEdit: false,
          qualificationType: '',
          qualificationLevel: '',
          certificateCode: '',
          issueDept: '',
          issueDate: ''
        }
      ],
      oldMainList: [],
      oldList: []
    };
  },
  components: {
    dictionaryComp
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
          } else {
            this.mainData = [
              {
                name: '',
                edit: false,
                qualificationType: '',
                qualificationLevel: '',
                certificateCode: '',
                issueDept: '',
                issueDate: ''
              }
            ];
          }
          this.oldList = deepClone(this.addItemData);
          this.oldMainList = deepClone(this.mainData);
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
    cancelEdit (scope, row, state) {
      if (state === '1') {
        this.mainData[scope.$index] = this.oldMainList[scope.$index];
      } else {
        this.addItemData[scope.$index] = this.oldList[scope.$index];
      }
      row.edit = false;
    },
    /**
     * @description 保存企业资质信息
     * @author wenruihuan
     * 2019/10/29
     */
    async confirmSave (row, isMain) {
      try {
        row.isMain = isMain;
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
        this.oldMainList = deepClone(this.mainData);
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
      if (row.id) {
        this.$confirm('确定删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          try {
            const { data } = await remove({ id: row.id });
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.getList();
            }
          } catch (e) {
            console.log(`tender-qualificationinformation-handleDelete error: ${e}`);
          }
        }).catch(() => {});
      } else {
        this.addItemData.remove(row);
      }
    }
  }
};
</script>

<style scoped lang="scss">
  .bidderinformation {
    /deep/.el-input{
      width: 100%;
    }
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
  }
</style>
