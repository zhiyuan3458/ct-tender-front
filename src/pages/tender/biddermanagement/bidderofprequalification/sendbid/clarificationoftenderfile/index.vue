<template>
  <clarification-request :tenderBatchInfoId="$route.query.tenderBatchInfoId" title="招标文件澄清要求提出" type="1"></clarification-request>
</template>
<script>
import clarificationRequest from 'src/components/clarification-request';
export default {
  name: '/tender/biddermanagement/checkqualificationofprequalification/sendbid/requestforclarificationofprequalificationfile',
  components: {
    clarificationRequest
  }
};
</script>
<style lang="scss" scoped>
</style>
