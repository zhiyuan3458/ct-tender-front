<template>
  <addendum :tenderBatchInfoId="$route.query.tenderBatchInfoId" title="资格预审文件补遗书查看" type="2"></addendum>
</template>
<script>
import addendum from 'src/components/addendum';
export default {
  name: '/tender/biddermanagement/checkqualificationofprequalification/sendbid/checkprequalificationfileaddendum',
  components: {
    addendum
  }
};
</script>
<style lang="scss" scoped>
</style>
