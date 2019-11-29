<template>
    <div class="color-choose-container">
      <el-input class="color-input" v-model="private_color" readonly></el-input>
      <el-color-picker
        class="picker"
        v-model="private_color"
        show-alpha
        :size="size"
        :disabled="disabled"
        :predefine="predefineColors"
        @change="handleChange"
      >
      </el-color-picker>
    </div>
</template>

<script>
export default {
  name: 'color-picker',
  data () {
    return {
      private_color: this.value
    };
  },
  props: {
    /**
     * 默认颜色
     */
    value: {
      type: String,
      default: 'rgba(0, 0, 0, 1)'
    },
    /**
     * 选择器大小
     */
    size: {
      type: String,
      default: 'mini'
    },
    /**
     * 是否禁止
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 预定义颜色
     */
    predefineColors: {
      type: Array,
      default () {
        return [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ];
      }
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('input', value);
    }
  }
};
</script>

<style lang="scss" scoped>
.color-choose-container {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .color-input {
    flex-basis: 90%;
    margin-right: 5px;
  }
  .picker {
    height: 100%;
  }
}
</style>
