<template>
  <el-select
    :style="{width: width}"
    v-if="!showSpan && type === 'select'"
    :disabled="readonly"
    :clearable="clearable"
    v-model="private_value"
    :placeholder="placeholder"
    @change="handleChange"
    @clear="handleClear"
  >
    <el-option
      v-for="item in options"
      :key="item.displayValue"
      :label="item.displayName"
      :value="item.displayValue">
    </el-option>
  </el-select>
  <el-radio-group v-else-if="!showSpan && type === 'radio'" :disabled="readonly" v-model="private_value" @change="handleChange">
    <el-radio
      v-for="item in options"
      :key="item.displayValue"
      :label="item.displayValue"
    >
      {{item.displayName}}
    </el-radio>
  </el-radio-group>
  <el-checkbox-group v-else-if="!showSpan && type === 'checkbox'" :disabled="readonly" v-model="private_value" @change="handleChange">
    <el-checkbox
      v-for="item in options"
      :key="item.displayValue"
      :label="item.displayValue"
      border
      size="mini"
    >
      {{item.displayName}}
    </el-checkbox>
  </el-checkbox-group>
  <div v-else-if="!showSpan && type === 'dropdown'">
    <el-dropdown trigger="click" @command="handleChange">
      <span class="el-dropdown-link">
        {{defaultName}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in options"
          :command="item.displayValue"
          :key="item.displayValue"
        >
          {{item.displayName}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
  <span v-else-if="showSpan && options && options.length > 0 && private_value">{{ spanName }}</span>
</template>

<script>
import emitter from 'element-ui/src/mixins/emitter';
import { getDictionaryValue } from 'src/api/common';
export default {
  name: 'dictionary-component',
  data () {
    return {
      private_value: this.type === 'checkbox' ? [] : '',
      options: [],
      defaultName: '',
      defaultValue: '',
      flag: true
    };
  },
  mixins: [emitter],
  created () {
    this.getDictionaryValue();
  },
  props: {
    /**
     * @description 组件宽度
     * @author lvzhiyuan
     * @date 2019/10/15
     */
    width: {
      type: String,
      default: '100%'
    },
    /**
     * @description 传过来的value值
     * @author lvzhiyuan
     * @date 2019/9/13
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * @description 表单组件的类型（select， radio， checkbox）
     * @author lvzhiyuan
     * @date 2019/9/13
     */
    type: {
      type: String,
      default: 'select'
    },
    /**
     * @description 是否需要默认值,只有单选或者选择下拉才有默认值，多选不给默认值
     * @author lvzhiyuan
     * @date 2019/10/1
     */
    isDefault: {
      type: Boolean,
      default: true
    },
    /**
     * @description 是否关联
     * @author lvzhiyuan
     * @date 2019/10/28
     */
    isLink: {
      type: Boolean,
      default: false
    },
    /**
     * @description 数据字典的code值
     * @author lvzhiyuan
     * @date 2019/9/13
     */
    code: {
      type: String,
      default: ''
    },
    /**
     * @description code的key
     * @author lvzhiyuan
     * @date 2019/10/28
     */
    codeName: {
      type: String,
      default: 'value'
    },
    /**
     * @description 是否只读
     * @author lvzhiyuan
     * @date 2019/9/13
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * @description 提示语
     * @author lvzhiyuan
     * @date 2019/9/14
     */
    placeholder: {
      type: String,
      default: ''
    },
    /**
     * @description
     * @author lvzhiyuan
     * @date 2019/10/30
     */
    clearable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否显示span
     * @author lvzhiyuan
     * @date 2019/10/29
     */
    showSpan: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    spanName () {
      const name = this.options.find(item => item.displayValue === this.private_value);
      return name ? name.displayName : '';
    }
  },
  watch: {
    value () {
      const temp = this.value || '';
      this.private_value = this.type === 'checkbox' ? temp.split(',') : temp;
      if (!this.private_value && this.isDefault && this.type !== 'checkbox' && this.flag) {
        this.private_value = this.defaultValue;
        this.validate(this.private_value);
      }
    },
    code () {
      if (this.code && this.isLink) {
        this.getDictionaryValue();
      }
    }
  },
  methods: {
    /**
     * @description 从数据字典中获取对应的值
     * @author lvzhiyuan
     * @date 2019/9/13
     */
    async getDictionaryValue () {
      try {
        const { data } = await getDictionaryValue({ [this.codeName]: this.code });
        if (data.code === process.env.ERR_OK) {
          this.options = data.data;
          if (this.options && this.options.length > 0) {
            this.defaultValue = this.options[0].displayValue;
            this.defaultName = this.options[0].displayName;
            /* 给个默认值,除了checkbox之外 */
            if (this.type !== 'checkbox' && !this.value && this.isDefault && this.options && this.options.length > 0) {
              this.private_value = this.options[0].displayValue;
              this.validate(this.private_value);
              this.$emit('input', this.private_value);
            } else {
              const temp = this.value || '';
              this.private_value = this.type === 'checkbox' ? temp.split(',') : temp;
              this.$emit('input', temp);
            }
            this.$emit('changeRow', this.options.find(m => m.displayValue === this.private_value));
            this.$emit('allRow', this.options);
          }
        }
      } catch (e) {
        console.log(`dictionary component error: ${e}`);
      }
    },
    /**
     * @description 点击下拉，radio，checkbox时触发
     * @author lvzhiyuan
     * @date 2019/9/14
     */
    handleChange (value) {
      if (this.type === 'dropdown') {
        this.defaultValue = value;
        this.defaultName = this.options.find(m => m.displayValue === value).displayName;
      }
      const selected = this.type === 'checkbox' ? value.join(',') : value;
      this.$emit('input', selected);
      this.$emit('change', value);
      this.$emit('allRow', this.options);
      /* 把当前选中的隐藏和显示值都扔出去 */
      if (this.type !== 'checkbox') {
        this.$emit('changeRow', this.options.find(m => m.displayValue === value));
      }
      if (!this.clearable) {
        this.dispatch('ElFormItem', 'el.form.change', value);
      }
    },
    /**
     * @description 验证
     * @author lvzhiyuan
     * @date 2019/10/30
     */
    validate (params) {
      this.$emit('input', params);
      this.dispatch('ElFormItem', 'el.form.change', params);
    },
    /**
     * @description 清楚值
     * @author lvzhiyuan
     * @date 2019/11/7
     */
    handleClear () {
      this.flag = false;
      if (this.type === 'select') {
        this.private_value = '';
        this.$emit('input', this.private_value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin: 0 30px 8px 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

</style>
