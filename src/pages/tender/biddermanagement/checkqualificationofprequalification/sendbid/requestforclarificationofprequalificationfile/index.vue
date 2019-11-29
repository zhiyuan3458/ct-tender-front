<template>
  <clarification-request :tenderBatchInfoId="$route.query.tenderBatchInfoId" title="资格预审文件澄清要求提出" type="2"></clarification-request>
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
