<template>
  <notice-public :tenderBatchInfoId="$route.query.tenderBatchInfoId" type="2" title="发布资格预审公告"></notice-public>
</template>
<script>
import noticePublic from 'src/components/notice-publish';

export default {
  name: '/tender/tendermanagement/checkqualificationofprequalification/sendbid/issueprequalificationnotice',
  components: {
    noticePublic
  }
};
</script>

<style lang="scss" scoped>
</style>
