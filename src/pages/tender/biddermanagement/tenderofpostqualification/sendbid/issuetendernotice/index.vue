<template>
  <notice-public :tenderBatchInfoId="$route.query.tenderBatchInfoId" type="2" title="资格预审公告查看" isView></notice-public>
</template>
<script>
import noticePublic from 'src/components/notice-publish';

export default {
  name: 'tender/biddermanagement/tenderofpostqualification/sendbid/issuetendernotice',
  components: {
    noticePublic
  }
};
</script>

<style lang="scss" scoped>
</style>
