<template>
  <date-time-management type="3" title="招标时间管理" :formItemList="formItemList"></date-time-management>
</template>
<script>
import dateTimeManagement from 'src/components/date-time-management';

export default {
  name: '/tender/tendermanagement/tenderofprequalification/sendbid/tendertimemanagement',
  components: {
    dateTimeManagement
  },
  data () {
    return {
      formItemList: [
        { id: 1, key: 'inviteStartDate', label: '投标邀请发出时间', isValidate: true },
        { id: 2, key: 'inviteEndDate', label: '投标邀请回复截止时间', isValidate: true },
        { id: 3, key: 'fileAccquireStartDate', label: '招标文件获取开始时间', isValidate: true },
        { id: 4, key: 'fileAccquireEndDate', label: '招标文件获取截止时间', isValidate: false },
        { id: 5, key: 'questionDeadline', label: '投标人提出问题截止时间', isValidate: true },
        { id: 6, key: 'clarifyDeadline', label: '招标人书面澄清截止时间', isValidate: true },
        { id: 7, key: 'fileSubmitStartDate', label: '投标文件递交开始时间', isValidate: true },
        { id: 8, key: 'fileSubmitEndDate', label: '投标文件递交截止时间', isValidate: true },
        { id: 9, key: 'firstOpeningStartDate', label: '第一信封开标开始时间', isValidate: true },
        { id: 10, key: 'firstOpeningEndDate', label: '第一信封开标结束时间', isValidate: true },
        { id: 11, key: 'secondOpeningStartDate', label: '第二信封开标开始时间', isValidate: true },
        { id: 12, key: 'secondOpeningEndDate', label: '第二信封开标结束时间', isValidate: true }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
