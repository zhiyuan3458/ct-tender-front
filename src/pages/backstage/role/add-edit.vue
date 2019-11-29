<template>
  <el-dialog
    title=""
    :visible.sync="isShow"
    :close-on-click-modal="false"
    :before-close="cancel"
    width="50%"
  >
    <div class="table">
      <el-form class="clearfix" ref="editForm" :model="formLabelAlign" label-width="100px">
        <el-form-item label="角色名称" prop="name" :rules="$validate.Required">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code" :rules="$validate.Required">
          <el-input v-model="formLabelAlign.code"></el-input>
        </el-form-item>
        <el-form-item label="角色说明" prop="description" :rules="$validate.Required">
          <el-input v-model="formLabelAlign.description"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formLabelAlign.memo"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="update">确 定</el-button>
  </span>
  </el-dialog>
</template>
<script>

import { edit, save } from 'src/api/role/index';
export default {
  name: 'add-edit',
  props: ['msgData'],
  data () {
    return {
      isShow: false,
      formLabelAlign: {}
    };
  },
  created () {
  },
  methods: {
    async edit (val) {
      const params = {
        id: val
      };
      try {
        const { data } = await edit(params);
        if (data.code === process.env.ERR_OK) {
          this.formLabelAlign = data.data.entity;
        }
      } catch (e) {
        console.log(`error: ${e}`);
      }
    },
    async update () {
      try {
        this.$refs.editForm.validate(async (valid) => {
          if (valid) {
            const { id, name, code, description, memo } = this.formLabelAlign;
            const { data } = await save({ id, name, code, description, memo });
            if (data.code === process.env.ERR_OPERATE_OK) {
              this.isShow = false;
              this.$emit('save');
            }
          }
        });
      } catch (e) {
        console.log(`error: ${e}`);
      }
    },
    handleInit (val) {
      console.log(val);
      if (val !== '') {
        this.edit(val);
      }
      this.isShow = true;
      setTimeout(() => {
        this.$refs.editForm.clearValidate();
      }, 20);
    },
    // 取消弹窗
    cancel () {
      this.$refs.editForm.clearValidate();
      this.$refs.editForm.resetFields();
      this.isShow = false;
      this.$emit('isDialog', this.isDialog);
    }
  }
};
</script>

<style lang="scss" scoped>
  .add-edit-box{
    position: fixed;
    top: 50%;
    background: #fff;
    width: 800px;
    height: auto;
    right: 50%;
    margin-right: -400px;
    border: 1px solid #ccc;
    z-index: 9;
    padding: 20px;
    border-radius: 3px;
    text-align: center;
    div{
      margin: 5px;
    }
  }
</style>
