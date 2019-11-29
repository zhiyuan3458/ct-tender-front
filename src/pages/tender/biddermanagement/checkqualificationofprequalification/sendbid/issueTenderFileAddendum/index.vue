<template>
  <addendum :tenderBatchInfoId="$route.query.tenderBatchInfoId" title="招标文件补遗书发布" state="2" type="1" role="issue"></addendum>
</template>
<script>
import addendum from 'src/components/addendum';

export default {
  name: '/tender/biddermanagement/checkqualificationofprequalification/sendbid/issuesupplementarynotice',
  data () {
    return {
      searchParams: {
        tenderBatchInfoId: this.$route.query.tenderBatchInfoId,
        noticeType: '2', // 1是招标公告发布， 2是发布资格预审公告
        noticeNature: '2' // 1是正常公告，2是更正公告
      },
      isDialog: false, // 是否显示详情信息
      tableData: [],
      addEditType: ''
    };
  },
  components: {
    addendum
  }
};
</script>

<style lang="scss" scoped>
  .list-container{
    .senior-search-btn{
      position: absolute;
      right: 0;
      top: 0;
    }
    .table-container{
      .box-header{
        padding: 0;
        border-bottom: 0;
        height: 25px;
        line-height: 25px;
        position: relative;
        button.add{
          position: absolute;
          right: 14px;
          top: 10px;
        }
      }
      .box-body{
        padding: 20px 0;
        .name{
          margin-right: 10px;
        }
      }
      .el-form{
        display: flex;
        flex-wrap: wrap;
        .el-form-item{
          width: 50%;
          margin: 0 0 10px 0;
        }
      }
    }
  }
  .el-table{
    margin-top: 20px;
  }
</style>
