<template>
  <date-time-management type="1" title="招标时间管理" :formItemList="formItemList"></date-time-management>
</template>
<script>
import dateTimeManagement from 'src/components/date-time-management';

export default {
  name: '/tender/tendermanagement/tenderofpostqualification/sendbid/tendertimemanagement',
  components: {
    dateTimeManagement
  },
  data () {
    return {
      formItemList: [
        { id: 1, key: 'noticeStartDate', label: '招标公告发布时间', isValidate: true },
        { id: 2, key: 'noticeEndDate', label: '招标公告结束时间', isValidate: true },
        { id: 3, key: 'registerStartDate', label: '投标登记开始时间', isValidate: true },
        { id: 4, key: 'registerEndDate', label: '投标登记截止时间', isValidate: true },
        { id: 5, key: 'fileAccquireStartDate', label: '招标文件获取开始时间', isValidate: true },
        { id: 6, key: 'fileAccquireEndDate', label: '招标文件获取截止时间', isValidate: false },
        { id: 7, key: 'questionDeadline', label: '投标人提出问题截止时间', isValidate: true },
        { id: 8, key: 'clarifyDeadline', label: '招标人书面澄清截止时间', isValidate: true },
        { id: 9, key: 'fileSubmitStartDate', label: '投标文件递交开始时间', isValidate: true },
        { id: 10, key: 'fileSubmitEndDate', label: '投标文件递交截止时间', isValidate: true },
        { id: 11, key: 'firstOpeningStartDate', label: '第一信封开标开始时间', isValidate: true },
        { id: 12, key: 'firstOpeningEndDate', label: '第一信封开标结束时间', isValidate: true },
        { id: 13, key: 'secondOpeningStartDate', label: '第二信封开标开始时间', isValidate: true },
        { id: 14, key: 'secondOpeningEndDate', label: '第二信封开标结束时间', isValidate: true }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
