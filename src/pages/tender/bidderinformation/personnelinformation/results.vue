<template>
  <div class="bidderinformation">
    <div class="item">
      <div class="title">个人业绩信息</div>
      <div class="operationTable">
        <el-table
          :data="resultsData"
          style="width: 100%"
          :height="height"
          ref="table"
        >
          <el-table-column
            align="center"
            label="操作"
            width="120px"
            v-if="!disabled"
            fixed
          >
            <template slot-scope="scope">
              <el-button title="删除" type="text" class="remove-icon-color" size="small"
                         @click="handleDelete(scope, scope.row, 'title')"
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
            prop="projectName"
            label="项目名称"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small"
                          v-model="scope.row.projectName"></el-input>
              </template>
              <span v-else>{{ scope.row.projectName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="sectionName"
            label="标段名称"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small"
                          v-model="scope.row.sectionName"></el-input>
              </template>
              <span v-else>{{ scope.row.sectionName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="constructDeptOfProjct"
            label="项目建设单位"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="50" class="edit-input" size="small"
                          v-model="scope.row.constructDeptOfProjct"></el-input>
              </template>
              <span v-else>{{ scope.row.constructDeptOfProjct }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="position"
            label="工作岗位"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-input maxlength="100" class="edit-input" size="small"
                          v-model="scope.row.position"></el-input>
              </template>
              <span v-else>{{ scope.row.position }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="startPosDate"
            width="160px"
            label="在岗起始日期"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.startPosDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.startPosDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="endPosDate"
            width="160px"
            label="在岗结束日期"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-date-picker
                  v-model="scope.row.endPosDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </template>
              <span v-else>{{ scope.row.endPosDate }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="addRowDataBtn" v-if="!disabled">
          <el-button title="新增" icon="el-icon-plus" @click="addRowData('title')" type="text"></el-button>
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
import { resultsList, resultsSave, resultsRemove } from 'src/api/tender/personnelinformation';
import bottomToolBar from 'src/components/bottom-tool-bar/index';

export default {
  name: 'bidderinformation',
  props: {
    params: {}
  },
  components: {
    bottomToolBar
  },
  data () {
    return {
      disabled: false,
      resultsData: [] // 个人职称信息列表
    };
  },
  created () {
    this.disabled = this.params.operation;
    if (this.params.personnelId !== '') {
      this.getList();
    }
  },
  methods: {
    /**
       * @description 查询个人业绩信息列表接口
     * @author wenruihuan
       * 2019/10/29
       */
    async getList () {
      try {
        const { data } = await resultsList({ personnelId: this.params.personnelId });
        this.resultsData = [];
        if (data.code === process.env.ERR_OK) {
          this.resultsData = data.data;
          this.list = this.resultsData.map(v => {
            this.$set(v, 'edit', false);
            return v;
          });
        };
      } catch (e) {
        console.log(`tender-qualificationinformation-listJson error: ${e}`);
      }
    },
    /**
       * @description 新增企业资质信息
       * @author wenruihuan
       * 2019/10/29
       */
    addRowData () {
      const addList = {
        id: '',
        projectName: '',
        personnelId: this.params.personnelId,
        constructDeptOfProjct: '',
        position: '',
        startPosDate: '',
        edit: true,
        endPosDate: ''
      };
      this.resultsData.push(addList);
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
       * @description 保存个人业绩信息接口
     * @author wenruihuan
       * 2019/10/29
       */
    async confirmSave (row) {
      try {
        const { data } = await resultsSave(row);
        if (data.code === process.env.ERR_OPERATE_OK) {
          row.edit = false;
          row.id = data.data.id;
          if (this.params.personnelId === '') {
            this.$emit('setPersonnelId', data.data.personnelId);
          };
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
       * @description 删除个人业绩信息接口
       * @author wenruihuan
       * 2019/10/29
       */
    async handleDelete (scope, row) {
      this.$confirm('确定删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (row.id) {
          try {
            const { data } = await resultsRemove({ id: row.id });
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.resultsData.splice(scope.$index, 1);
            }
          } catch (e) {
            console.log(`tender-qualificationinformation-handleDelete error: ${e}`);
          }
        } else {
          this.resultsData.splice(scope.$index, 1);
        }
      }).catch(() => {
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .bidderinformation {
    margin-bottom: 60px;
    .title {
      font-size: 14px;
      margin: 20px auto;
      border-bottom: 2px solid #409EFF;
      display: inline-block;
      line-height: 30px;
    }
    .addRowDataBtn {
      width: 127px;
      text-align: center;

      button {
        font-size: 18px;
        font-weight: bold;
        color: rgb(68, 193, 185);

        i {
          & :before {
            font-weight: bold;
          }
        }
      }
    }
    /deep/.el-date-editor{
      width: 100%;
      .el-input__inner{
        padding: 0 10px 0 30px;
      }
    }
  }
</style>
