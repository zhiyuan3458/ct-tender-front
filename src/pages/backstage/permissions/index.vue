<template>
  <div class="permissions drag-container">
    <div class="permissions-top">
      <div class="permissions-row">
        <div class="operation">
          <div class="el-button" @click="saveData"><i class="el-icon-s-order">保存</i></div>
        </div>
      </div>
      <div class="permissions-row">
        <span class="name">选择角色</span>
        <el-select
          style="width: 300px;margin-right: 10px;"
          v-model="currentRoleByTypeName"
          @change="selectRoleById"
          placeholder="请选择">
          <el-option
            v-for="item in listRoleByTypeData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="permissions-row">
        <span class="name">关键词搜索</span>
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          style="width: 300px;margin-right: 10px;"
        >
        </el-input>
      </div>
    </div>
<!--    <el-tree-->
<!--      class="filter-tree"-->
<!--      :data="ztreeList"-->
<!--      :props="defaultProps"-->
<!--      check-strictly-->
<!--      :default-checked-keys="defaultCheckedKeys"-->
<!--      @check-change="getCurrentNode"-->
<!--      node-key="id"-->
<!--      show-checkbox-->
<!--      default-expand-all-->
<!--      :filter-node-method="filterNode"-->
<!--      ref="permissionsTree">-->
<!--    </el-tree>-->
    <tree class="filter-tree"
          :nodes="ztreeList"
          ref="permissionsTree"
          :setting="setting"
          @onCreated="handleCreated"
    />
  </div>
</template>

<script>
// 功能权限管理
import tree from 'vue-giant-tree';
import { listRoleByType, rolemenuSave, getTree } from 'src/api/personalUserManagement';
import { dataToChildren } from 'src/common/js/utils';
export default {
  name: '/backstage/permissions',
  data () {
    return {
      setting: {
        view: {
          showIcon: false
        }
      },
      ztreeObj: null,
      filterText: '',
      currentRoleById: '', // 当前选中角色Id
      currentRoleByType: '', // 当前选中角色
      currentRoleByTypeName: '', // 当前选中角色名称
      permitList: [], // 选中节点集合
      listRoleByTypeData: [],
      ztreeList: [],
      value: '',
      defaultCheckedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'text'
      }
    };
  },
  components: {
    tree
  },
  watch: {
    filterText (val) {
      var nodes = this.ztreeObj.getNodesByParam(val);
      console.log(nodes);
    }
  },
  created () {
    this.setting = this.$config.setting;
    const check = {
      enable: true,
      chkStyle: 'checkbox',
      chkboxType: {
        Y: 'ps',
        N: 's'
      }
    };
    this.setting.check = check;
    this.listRoleByType();
  },
  methods: {
    handleCreated (ztreeObj) {
      this.ztreeObj = ztreeObj;
      // onCreated 中操作ztreeObj对象展开第一个节点
      ztreeObj.expandNode(ztreeObj.getNodes()[0], true);
    },
    /**
     * @description 筛选树的信息
     * @author wenruihuan
     * 2019/9/20
     */
    filterNode (value, data) {
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },
    /**
     * @description 获取权限树的信息
     * @author lvzhiyuan
     * @date 2019/9/28
     */
    async getTree () {
      try {
        const params = {
          roleId: this.currentRoleById
        };
        const { data } = await getTree(params);
        this.permitList = [];
        if (data.code === process.env.ERR_OK) {
          data.data.ztreeList.forEach(item => {
            item.status = false;
          });
          this.defaultCheckedKeys = data.data.ztreeList.map((item) => {
            if (item.checked) {
              return item.id;
            };
          });
          data.data.ztreeList.forEach((item) => {
            if (item.checked) {
              this.permitList.push(item.actionUrl === '' ? item.id + ',' + item.type : item.id + ',' + item.actionUrl);
            };
          });
          this.ztreeList = dataToChildren(data.data.ztreeList);
        };
      } catch (e) {
        console.log(`permision-getTree error: ${e}`);
      };
    },
    /**
     * @description 获取当前选中的节点
     * @author lvzhiyuan
     * @date 2019/9/28
     */
    getCurrentNode (val, state) {
      let str = '';
      str = val.actionUrl === '' ? val.id + ',' + val.type : val.id + ',' + val.actionUrl;
      if (state) {
        this.permitList.push(str);
      } else {
        this.permitList.remove(str);
      };
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
          this.currentRoleById = this.listRoleByTypeData[0].id;
          this.currentRoleByType = this.listRoleByTypeData[0].code;
          this.currentRoleByTypeName = this.listRoleByTypeData[0].name;
          this.getTree();
        };
      } catch (e) {
        console.log(`permission-listRoleByType error: ${e}`);
      }
    },
    /**
     * @角色选中
     * @author wenruihuan
     * 2019/9/20
     */
    selectRoleById (val) {
      this.currentRoleById = val;
      this.getTree();
    },
    /**
     * @保存当前操作
     * @author wenruihuan
     * 2019/9/20
     */
    async saveData () {
      this.permitList = [];
      this.ztreeObj.getCheckedNodes().forEach(m => {
        this.permitList.push(m.actionUrl === '' ? m.id + ',' + m.type : m.id + ',' + m.actionUrl);
      });
      const params = {
        roleId: this.currentRoleById,
        permitStr: this.permitList.join(';')
      };
      try {
        await rolemenuSave(params);
        this.getTree();
      } catch (e) {
        console.log(`save permission error:${e}`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.permissions{
  position: relative;
  height: 100%;
  width: 400px;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  /deep/.el-checkbox__inner{
    margin-right: 5px;
  }
  .permissions-top{
    position: absolute;
    top: 10px;
    background: #fff;
    z-index: 9;
    width: 380px;
    left: 10px;
    .permissions-row{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span{
        margin-right: 10px;
        min-width: 80px;
        text-align: right;
      }
      .operation{
        .el-button{
          padding: 6px;
        }
      }
    }
  }
  .filter-tree{
    overflow-y: auto;
    margin-top: 123px;
    height: calc(100vh - 244px);
  }
}
</style>
