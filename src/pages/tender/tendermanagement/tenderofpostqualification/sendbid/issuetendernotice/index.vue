<template>
  <notice-public :tenderBatchInfoId="$route.query.tenderBatchInfoId" type="1" title="招标公告发布"></notice-public>
</template>
<script>
import noticePublic from 'src/components/notice-publish';

export default {
  name: '/tender/tendermanagement/tenderofpostqualification/sendbid/issuetendernotice',
  components: {
    noticePublic
  }
};
</script>

<style lang="scss" scoped>
</style>
