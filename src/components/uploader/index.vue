<template>
    <div class="uploader-container">
      <div class="uploader-wrapper">
        <el-upload
          ref="uploader"
          :action="url"
          :headers="headers"
          :multiple="multiple"
          :show-file-list="false"
          :file-list="uploadFileList"
          with-credentials
          :limit="limit"
          :http-request="customUpload"
        >
          <el-button :style="{float: isVertical ? 'left' : 'initial'}" v-show="!disabled" size="small" type="primary" :disabled="disabled">点击上传</el-button>
        </el-upload>
        <!--      <div slot="tip" class="el-upload__tip">单个文件大小不可以超过10M!</div>-->
        <div class="history-file-list-container">
          <ul ref="fileWrapper" class="history-file-list-wrapper" :class="isVertical ? 'vertical' : ''" v-show="fileList && fileList.length > 0" :style="{width: width + 'px'}">
            <li
              ref="fileItem"
              class="file-item"
              v-for="item in fileList"
              :key="item.id"
            >
              <span class="text" @click="download(item)">{{ item.originalFileName }}</span>
              <span class="icon el-icon-close" @click="removeFile(item)" v-show="!disabled"></span>
            </li>
          </ul>
          <span class="no-files" v-if="fileList && fileList.length <= 0">暂无文件</span>
        </div>
      </div>
    </div>
</template>

<script>
import { getToken } from 'src/common/js/cookie';
import { gengerateRandom } from 'src/common/js/utils';
import { downloadFile } from './utils';
import emitter from 'element-ui/src/mixins/emitter';

export default {
  data () {
    return {
      width: 0,
      uploadFiles: [],
      attachmentId: '',
      isShow: false,
      headers: {
        tenderToken: getToken()
      },
      fileList: [],
      uploadFileList: []

    };
  },
  mixins: [emitter],
  props: {
    /* attachmentId id */
    value: {
      type: String,
      defatult: ''
    },
    /* 上传文件的url */
    uploadUrl: {
      type: String,
      default: '/upload/sys/at/minio/upload'
    },
    /* 是否多文件上传 */
    multiple: {
      type: Boolean,
      default: true
    },
    /* 头部额外参数 */
    headersParams: {
      type: Object,
      defatult () {
        return {};
      }
    },
    /* 是否垂直排列文件列表 */
    isVertical: {
      type: Boolean,
      default: false
    },
    /* 额外参数 */
    params: {
      type: Object,
      default () {
        return {};
      }
    },
    /* 上传文件最大限制数 */
    limit: {
      type: String
    },
    /* file name */
    name: {
      tyupe: String,
      default: 'files'
    },
    /* 拿历史文件的接口 */
    historyUrl: {
      type: String,
      default: '/upload/sys/at/minio/findByAttachmentId'
    },
    /* 下载api接口 */
    downloadUrl: {
      type: String,
      default: '/upload/sys/at/minio/download'
    },
    /* 删除文件url */
    removeFileUrl: {
      type: String,
      default: '/upload/sys/at/minio/delete'
    },
    /* 是否只读 */
    disabled: {
      type: Boolean,
      default: false
    },
    /* 是否需要验证 */
    isValidate: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler () {
        if (this.value) {
          this.attachmentId = this.value;
          this.getFileList();
        }
      },
      immediate: true
    },
    disabled () {
      this.setFileListWidth();
      if (!this.disabled) {
        this.dispatch('ElFormItem', 'el.form.change', this.attachmentId);
      }
    }
  },
  created () {
    this.headers = { ...this.headersParams, ...this.headers };
  },
  methods: {
    /**
     * @description 设置宽度
     * @author lvzhiyuan
     * @date 2019/11/2
     */
    setFileListWidth () {
      this.$nextTick(() => {
        if (this.$refs.fileItem && this.$refs.fileItem.length > 0) {
          let width = 0;
          this.$refs.fileItem.forEach(item => {
            width += item.offsetWidth + 1;
          });
          this.width = width;
        }
      });
    },
    /**
     * @description 获取历史文件
     * @author lvzhiyuan
     * @date 2019/10/26
     */
    getFileList () {
      const params = { attachmentId: this.attachmentId };
      this.$http.get(this.historyUrl, params).then(({ data }) => {
        this.fileList = data.data;
        this.setFileListWidth();
        this.attachmentId = this.fileList && this.fileList.length > 0 ? this.attachmentId : '';
        this.$emit('input', this.attachmentId);
        if (this.isValidate) {
          this.dispatch('ElFormItem', 'el.form.change', this.attachmentId);
        }
      });
    },
    /**
     * @description 自定义上传
     * @author lvzhiyuan
     * @date 2019/10/28
     */
    customUpload (content) {
      if (this.disabled) return false;
      if (!this.attachmentId) {
        this.attachmentId = gengerateRandom();
      }
      const size = Math.floor(content.file.size / (1024 * 1024));
      if (size > 10) {
        this.$message({
          message: '每个文件不可以超过10M!',
          type: 'warning'
        });
      } else {
        const formData = new FormData();
        formData.append('attachmentId', this.attachmentId);
        formData.append(this.name, content.file);
        this.$http.postAsFormData(this.uploadUrl, formData).then(({ data }) => {
          if (data.code === process.env.ERR_OK) {
            this.$emit('input', this.attachmentId);
            this.getFileList();
          }
        }).catch(e => {
          console.log(`upload customUpload-error: ${e}`);
        });
      }
    },
    /**
     * @description 下载文件
     * @authorlvzhiyuan
     * @date 2019/10/28
     */
    async download (item) {
      const id = item.id;
      this.$http.getDownloadFiles(this.downloadUrl, { id }).then(({ data }) => {
        downloadFile(data, item.originalFileName);
      }).catch(e => {
        console.log(`download-error: ${e}`);
      });
    },
    /**
     * @description 删除文件
     * @author lvzhiyuan
     * @date 2019/10/28
     */
    removeFile (item) {
      const id = item.id;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const { data } = await this.$http.post(this.removeFileUrl, { id });
          if (data.code === process.env.ERR_OPERATE_OK) {
            this.getFileList();
          }
        } catch (e) {
          console.log(`upload removeFile-error: ${e}`);
        }
      }).catch(e => {
        console.log(`${e}`);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.uploader-container {
  position: relative;
  .uploader-wrapper {
    &>div {
      display: inline-block;
      float: left;
    }
    .el-icon-upload {
      color: #409EFF;
    }
    .history-file-list-container {
      width: calc(100% - 85px);
      display: inline-block;
      vertical-align: middle;
      overflow-x: auto;
      overflow-y: hidden;
      list-style: none;
      padding: 0 5px;
      .history-file-list-wrapper {
        overflow: hidden;
        .file-item {
          white-space: nowrap;
          float: left;
          padding-right: 8px;
          .icon {
            cursor: pointer;
          }
          .el-icon-close {
            display: inline-block;
            color: #F56C6C;
          }
          .text:hover {
            color: #409EFF;
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
      .no-files {
        color: #ccc;
      }
    }
    .vertical {
      width: auto!important;
      li {
        float: inherit!important;
      }
    }
  }
}
</style>
