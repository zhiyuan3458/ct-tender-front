<template>
  <date-time-management type="2" title="资格预审时间管理" :formItemList="formItemList"></date-time-management>
</template>
<script>
import dateTimeManagement from 'src/components/date-time-management';

export default {
  name: '/tender/tendermanagement/checkqualificationofprequalification/sendbid/prequalificationtimemanagement',
  components: {
    dateTimeManagement
  },
  data () {
    return {
      formItemList: [
        { id: 1, key: 'noticeStartDate', label: '资格预审公告发布时间', isValidate: true },
        { id: 2, key: 'noticeEndDate', label: '资格预审公告结束时间', isValidate: true },
        { id: 3, key: 'registerStartDate', label: '资格预审登记开始时间', isValidate: true },
        { id: 4, key: 'registerEndDate', label: '资格预审登记截止时间', isValidate: true },
        { id: 5, key: 'fileAccquireStartDate', label: '资格预审文件获取开始时间', isValidate: true },
        { id: 6, key: 'fileAccquireEndDate', label: '资格预审文件获取截止时间', isValidate: false },
        { id: 7, key: 'questionDeadline', label: '投标人提出问题截止时间', isValidate: true },
        { id: 8, key: 'clarifyDeadline', label: '招标人书面澄清截止时间', isValidate: true },
        { id: 9, key: 'fileSubmitStartDate', label: '资格预审申请文件递交开始时间', isValidate: true },
        { id: 10, key: 'fileSubmitEndDate', label: '资格预审申请文件递交截止时间', isValidate: true }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
