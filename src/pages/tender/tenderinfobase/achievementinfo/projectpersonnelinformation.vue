<template>
  <div class="bidderinformation">
    <div class="item">
      <div class="title">项目人员信息</div>
      <div class="operationTable">
        <el-table
          :data="personnelData"
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
              <el-button title="删除" type="text" class="remove-icon-color" size="small" @click="handleDelete(scope, scope.row, 'personnel')"
                         icon="el-icon-delete">
              </el-button>
              <el-button title="保存" v-if="scope.row.edit" type="text" class="save-icon-color" size="small"
                         @click="confirmSave(scope.row, 'personnel')" icon="el-icon-mobile">
              </el-button>
              <el-button title="编辑" v-if="!scope.row.edit" @click="confirmEdit(scope.row, 'personnel')" type="text"
                         class="edit-icon-color" size="small" icon="el-icon-edit">
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
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
            prop="identityCode"
            label="身份证号"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.identityCode"></el-input>
              </template>
              <span v-else>{{ scope.row.identityCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="工作岗位"
            align="center"
            prop="jobPosition"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small" v-model="scope.row.jobPosition"></el-input>
              </template>
              <span v-else>{{ scope.row.jobPosition }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="startWorkDate"
            width="160px"
            label="在岗起始日期"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.startWorkDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="在岗起始日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.startWorkDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="endWorkDate"
            width="160px"
            label="在岗结束日期"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.endWorkDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="在岗结束日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.endWorkDate }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="addRowDataBtn" v-if="!disabled">
          <el-button title="新增" icon="el-icon-plus" @click="addRowData('personnel')" type="text"></el-button>
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
</template>

<script>
// 投标人信息
import { personneltitleListJson, personneltitleSave, personneltitleRemove } from 'src/api/tender/bidderinformation/achievementinfo';
import bottomToolBar from 'src/components/bottom-tool-bar/index';
export default {
  name: 'projectpersonnelinformation',
  props: {
    params: {}
  },
  data () {
    return {
      personnelData: [] // 项目人员信息列表
    };
  },
  components: {
    bottomToolBar
  },
  created () {
    this.disabled = this.params.operation;
    if (this.params.otherAchievementId !== '') {
      this.getList();
    }
  },
  methods: {
    /**
       * @description 获取其他业绩项目人员信息列表
       * @author wenruihuan
       * 2019/10/29
       */
    async getList () {
      try {
        const { data } = await personneltitleListJson({ otherAchievementId: this.params.otherAchievementId });
        this.personnelData = [];
        if (data.code === process.env.ERR_OK) {
          this.personnelData = data.data;
          this.list = this.personnelData.map(v => {
            this.$set(v, 'edit', false);
            return v;
          });
        }
      } catch (e) {
        console.log(`tender-bidderinformation-achievementinfo-projectpersonnelinformation-listJson error: ${e}`);
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
      if (funName === 'personnel') {
        const addList = {
          name: '',
          id: '',
          levelOfTitle: '',
          otherAchievementId: this.params.otherAchievementId,
          specialtyOfTitle: '',
          certificateCodeOfTitle: '',
          certificateCodeOfRegistration: '',
          edit: true,
          issueDeptOfTitle: '',
          issueDateOfTitle: ''
        };
        this.personnelData.push(addList);
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
        if (funName === 'personnel') {
          data = await personneltitleSave(row);
        }
        if (data.data.code === process.env.ERR_OPERATE_OK) {
          row.edit = false;
          row.id = data.data.data.id;
          if (this.params.otherAchievementId === '') {
            console.log(data.data.data.otherAchievementId);
            this.$emit('setPersonnelId', data.data.data.otherAchievementId);
          }
        }
      } catch (e) {
        console.log(`tender-bidderinformation-achievementinfo-projectpersonnelinformation-confirmSave error: ${e}`);
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
            if (funName === 'personnel') {
              const { data } = await personneltitleRemove({ id: row.id });
              if (data.code === process.env.ERR_OPERATE_OK) {
                this.personnelData.splice(scope.$index, 1);
              }
            }
          } catch (e) {
            console.log(`tender-bidderinformation-achievementinfo-projectpersonnelinformation-handleDelete error: ${e}`);
          }
        } else {
          if (funName === 'personnel') {
            this.personnelData.splice(scope.$index, 1);
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
