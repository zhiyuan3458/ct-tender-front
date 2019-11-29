<template>
  <addendum :tenderBatchInfoId="$route.query.tenderBatchInfoId" title="资格预审文件补遗书发布" state="2" type="2" role="issue"></addendum>
</template>
<script>
import addendum from 'src/components/addendum';
export default {
  name: '/tender/biddermanagement/checkqualificationofprequalification/sendbid/issueprequalificationfileaddendum',
  components: {
    addendum
  }
};
</script>
<style lang="scss" scoped>
</style>
