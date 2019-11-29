<template>
  <addendum :tenderBatchInfoId="$route.query.tenderBatchInfoId" title="招标文件补遗书查看" type="1"></addendum>
</template>
<script>
import addendum from 'src/components/addendum';
export default {
  name: '/tender/biddermanagement/bidderofprequalification/sendbid/checktenderfileaddendum',
  components: {
    addendum
  }
};
</script>
<style lang="scss" scoped>
</style>
