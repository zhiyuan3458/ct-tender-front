<template>
  <div class="bidderinformation">
    <div class="item">
      <div class="title">个人职称信息</div>
      <div class="operationTable">
        <el-table
          :data="titleData"
          style="width: 100%"
          :height="height"
          ref="table"
        >
          <el-table-column
            align="center"
            label="操作"
            v-if="!disabled"
            width="120px"
            fixed
          >
            <template slot-scope="scope">
              <el-button title="删除" type="text" class="remove-icon-color" size="small" @click="handleDelete(scope, scope.row, 'title')"
                         icon="el-icon-delete">
              </el-button>
              <el-button title="保存" v-if="scope.row.edit" type="text" class="save-icon-color" size="small"
                         @click="confirmSave(scope.row, 'title')" icon="el-icon-mobile">
              </el-button>
              <el-button title="编辑" v-if="!scope.row.edit" @click="confirmEdit(scope.row, 'title')" type="text"
                         class="edit-icon-color" size="small" icon="el-icon-edit">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="职称名称"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.name"></el-input>
              </template>
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="specialtyOfTitle"
            label="职称专业"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.specialtyOfTitle"></el-input>
              </template>
              <span v-else>{{ scope.row.specialtyOfTitle }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="职称级别"
            align="center"
            prop="levelOfTitle"
          >
            <template slot-scope="scope">
              <dictionary-comp
                code="levelOfTitle"
                :show-span="!scope.row.edit"
                v-model="scope.row.levelOfTitle"
              ></dictionary-comp>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="certificateCodeOfTitle"
            label="职称证书编号"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.certificateCodeOfTitle"></el-input>
              </template>
              <span v-else>{{ scope.row.certificateCodeOfTitle }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="issueDeptOfTitle"
            label="职称核发机关"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="100" class="edit-input" size="small" v-model="scope.row.issueDeptOfTitle"></el-input>
              </template>
              <span v-else>{{ scope.row.issueDeptOfTitle }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="issueDateOfTitle"
            width="160px"
            label="发证日期"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.issueDateOfTitle"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.issueDateOfTitle }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="addRowDataBtn" v-if="!disabled">
          <el-button title="新增" icon="el-icon-plus" @click="addRowData('title')" type="text"></el-button>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">个人职业资格信息</div>
      <div class="operationTable">
        <el-table
          :data="professionalData"
          style="width: 100%"
          :height="height"
          ref="table"
        >
          <el-table-column
            align="center"
            label="操作"
            v-if="!disabled"
            width="120px"
            fixed
          >
            <template slot-scope="scope">
              <el-button title="删除" type="text" class="remove-icon-color" size="small" @click="handleDelete(scope, scope.row, 'professional')"
                         icon="el-icon-delete">
              </el-button>
              <el-button title="保存" v-if="scope.row.edit" type="text" class="save-icon-color" size="small"
                         @click="confirmSave(scope.row, 'professional')" icon="el-icon-mobile">
              </el-button>
              <el-button title="编辑" v-if="!scope.row.edit" @click="confirmEdit(scope.row, 'professional')" type="text"
                         class="edit-icon-color" size="small" icon="el-icon-edit">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="typeOfQualification"
            label="类别"
          >
            <template slot-scope="scope">
              <dictionary-comp
                code="typeOfQualification"
                :show-span="!scope.row.edit"
                v-model="scope.row.typeOfQualification"
              ></dictionary-comp>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="specialtyOfQualification"
            label="专业"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.specialtyOfQualification"></el-input>
              </template>
              <span v-else>{{ scope.row.specialtyOfQualification }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="levelOfQualification"
            label="等级"
          >
            <template slot-scope="scope">
              <dictionary-comp
                code="levelOfTitle"
                :show-span="!scope.row.edit"
                v-model="scope.row.levelOfQualification"
              ></dictionary-comp>
            </template>
          </el-table-column>
          <el-table-column
            label="注册证号"
            align="center"
            prop="regNumberOfQualification"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.regNumberOfQualification"></el-input>
              </template>
              <span v-else>{{ scope.row.regNumberOfQualification }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="certificateCodeOfQualification"
            label="证书编号"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.certificateCodeOfQualification"></el-input>
              </template>
              <span v-else>{{ scope.row.certificateCodeOfQualification }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="regDeptOfQualification"
            label="注册单位"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.regDeptOfQualification"></el-input>
              </template>
              <span v-else>{{ scope.row.regDeptOfQualification }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="issueDeptOfQualification"
            label="发证机关"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.issueDeptOfQualification"></el-input>
              </template>
              <span v-else>{{ scope.row.issueDeptOfQualification }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="issueDateOfQualification"
            width="160px"
            label="发证日期"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.issueDateOfQualification"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.issueDateOfQualification }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="endDateOfCertificateValidity"
            width="160px"
            label="注册有效期至"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.endDateOfCertificateValidity"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.endDateOfCertificateValidity }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="addRowDataBtn" v-if="!disabled">
          <el-button title="新增" icon="el-icon-plus" @click="addRowData('professional')" type="text"></el-button>
        </div>
      </div>
    </div>
    <div class="item">
      <div class="title">个人履历信息</div>
      <div class="operationTable">
        <el-table
          :data="recordData"
          style="width: 100%"
          :height="height"
          ref="table"
        >
          <el-table-column
            align="center"
            v-if="!disabled"
            label="操作"
            width="120px"
            fixed
          >
            <template slot-scope="scope">
              <el-button title="删除" type="text" class="remove-icon-color" size="small" @click="handleDelete(scope, scope.row, 'record')"
                         icon="el-icon-delete">
              </el-button>
              <el-button title="保存" v-if="scope.row.edit" type="text" class="save-icon-color" size="small"
                         @click="confirmSave(scope.row, 'record')" icon="el-icon-mobile">
              </el-button>
              <el-button title="编辑" v-if="!scope.row.edit" @click="confirmEdit(scope.row, 'record')" type="text"
                         class="edit-icon-color" size="small" icon="el-icon-edit">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="companyName"
            label="所在单位名称"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.companyName"></el-input>
              </template>
              <span v-else>{{ scope.row.companyName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="organizationCode"
            label="所在单位组织机构代码"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.organizationCode"></el-input>
              </template>
              <span v-else>{{ scope.row.organizationCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="startWorkDate"
            width="160px"
            label="工作起始日期
"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.startWorkDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.startWorkDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="endWorkDate"
            width="160px"
            label="工作截止日期
"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.endWorkDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.endWorkDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="职务"
            align="center"
            prop="position"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.position"></el-input>
              </template>
              <span v-else>{{ scope.row.position }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="isWork"
            label="任职状态"
          >
            <template slot-scope="scope">
              <dictionary-comp
                code="isWork"
                :show-span="!scope.row.edit"
                v-model="scope.row.isWork"
              ></dictionary-comp>
            </template>
          </el-table-column>
        </el-table>
        <div class="addRowDataBtn" v-if="!disabled">
          <el-button title="新增" icon="el-icon-plus" @click="addRowData('record')" type="text"></el-button>
        </div>
      </div>
    </div>
    <bottom-tool-bar
      @return="returnFn"
      :isShowSave="false"
      :isShowEdit="false"
      :isShowSubmit="false"
    ></bottom-tool-bar>
  </div>

<!--  v-if="formData.auditStatus !== '待审核'"-->
</template>

<script>
// 投标人信息
import { personneltitleListJson, personneltitleSave, personneltitleRemove, professionalList, professionalRemove, professionalSave, recordList, recordRemove, recordSave } from 'src/api/tender/personnelinformation';
import dictionaryComp from 'src/components/dictionary-component/index';
import bottomToolBar from 'src/components/bottom-tool-bar/index';
export default {
  name: 'bidderinformation',
  props: {
    params: {}
  },
  data () {
    return {
      titleData: [], // 个人职称信息列表
      professionalData: [], // 个人职业信息列表
      recordData: [] // 个人职业信息列表
    };
  },
  components: {
    dictionaryComp,
    bottomToolBar
  },
  created () {
    this.disabled = this.params.operation;
    if (this.params.personnelId !== '') {
      this.getList();
    }
  },
  methods: {
    /**
     * @description 查询企业资质信息列表接口
     * @author wenruihuan
     * 2019/10/29
     */
    async getList () {
      try {
        const { data } = await personneltitleListJson({ personnelId: this.params.personnelId });
        const { data: data1 } = await professionalList({ personnelId: this.params.personnelId });
        const { data: data2 } = await recordList({ personnelId: this.params.personnelId });
        this.titleData = [];
        if (data.code === process.env.ERR_OK) {
          this.titleData = data.data;
          this.list = this.titleData.map(v => {
            this.$set(v, 'edit', false);
            return v;
          });
        }
        if (data1.code === process.env.ERR_OK) {
          this.professionalData = data1.data;
          this.list = this.professionalData.map(v => {
            this.$set(v, 'edit', false);
            return v;
          });
        }
        if (data2.code === process.env.ERR_OK) {
          this.recordData = data2.data;
          this.list = this.recordData.map(v => {
            this.$set(v, 'edit', false);
            return v;
          });
        }
      } catch (e) {
        console.log(`tender-qualificationinformation-listJson error: ${e}`);
      }
    },
    /**
     * @返回列表页
     * @author wenruihuan
     * 2019/10/28
     */
    returnFn () {
      this.$router.go(-1);
    },
    /**
     * @description 新增企业资质信息
     * @author wenruihuan
     * 2019/10/29
     */

    addRowData (funName) {
      if (funName === 'title') {
        const addList = {
          name: '',
          id: '',
          levelOfTitle: '',
          personnelId: this.params.personnelId,
          specialtyOfTitle: '',
          certificateCodeOfTitle: '',
          certificateCodeOfRegistration: '',
          edit: true,
          issueDeptOfTitle: '',
          issueDateOfTitle: ''
        };
        this.titleData.push(addList);
      } else if (funName === 'professional') {
        const addList = {
          specialtyOfQualification: '',
          id: '',
          typeOfQualification: '',
          personnelId: this.params.personnelId,
          levelOfQualification: '',
          regNumberOfQualification: '',
          certificateCodeOfQualification: '',
          edit: true,
          regDeptOfQualification: '',
          issueDateOfQualification: '',
          endDateOfCertificateValidity: '',
          issueDeptOfQualification: ''
        };
        this.professionalData.push(addList);
      } else if (funName === 'record') {
        const addList = {
          companyName: '',
          id: '',
          organizationCode: '',
          personnelId: this.params.personnelId,
          startWorkDate: '',
          endWorkDate: '',
          position: '',
          edit: true,
          isWork: ''
        };
        this.recordData.push(addList);
      }
    },
    /**
     * @description 保存企业资质信息
     * @author wenruihuan
     * 2019/10/29
     */
    async confirmSave (row, funName) {
      try {
        let data = {};
        if (funName === 'title') {
          data = await personneltitleSave(row);
        } else if (funName === 'professional') {
          data = await professionalSave(row);
        } else if (funName === 'record') {
          data = await recordSave(row);
        }
        if (data.data.code === process.env.ERR_OPERATE_OK) {
          row.edit = false;
          row.id = data.data.data.id;
          if (this.params.personnelId === '') {
            this.$emit('setPersonnelId', data.data.data.personnelId);
          }
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
    confirmEdit (row) {
      row.edit = true;
    },
    /**
     * @description 删除当前列数据
     * @author wenruihuan
     * 2019/10/29
     */
    async handleDelete (scope, row, funName) {
      this.$confirm('确定删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (row.id) {
          try {
            if (funName === 'title') {
              const { data } = await personneltitleRemove({ id: row.id });
              if (data.code === process.env.ERR_OPERATE_OK) {
                this.titleData.splice(scope.$index, 1);
              }
            } else if (funName === 'professional') {
              const { data } = await professionalRemove({ id: row.id });
              if (data.code === process.env.ERR_OPERATE_OK) {
                this.professionalData.splice(scope.$index, 1);
              }
            } else if (funName === 'record') {
              const { data } = await recordRemove({ id: row.id });
              if (data.code === process.env.ERR_OPERATE_OK) {
                this.recordData.splice(scope.$index, 1);
              }
            }
          } catch (e) {
            console.log(`tender-qualificationinformation-handleDelete error: ${e}`);
          }
        } else {
          if (funName === 'title') {
            this.titleData.splice(scope.$index, 1);
          } else if (funName === 'professional') {
            this.professionalData.splice(scope.$index, 1);
          } else if (funName === 'record') {
            this.recordData.splice(scope.$index, 1);
          }
        }
      }).catch(() => {});
    }
  }
};
</script>

<style scoped lang="scss">
  .bidderinformation{
    margin-bottom: 60px;
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
    .title {
      font-size: 14px;
      margin: 20px auto;
      border-bottom: 2px solid #409EFF;
      display: inline-block;
      line-height: 30px;
    }
    /deep/.el-date-editor{
      width: 100%;
      .el-input__inner{
        padding: 0 10px 0 30px;
      }
    }
}
</style>
