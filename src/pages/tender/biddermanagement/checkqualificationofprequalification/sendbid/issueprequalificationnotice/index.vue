<template>
  <notice-public :tenderBatchInfoId="$route.query.tenderBatchInfoId" type="1" title="招标公告查看" isView></notice-public>
</template>
<script>
import noticePublic from 'src/components/notice-publish';

export default {
  name: '/tender/biddermanagement/checkqualificationofprequalification/sendbid/issueprequalificationnotice',
  components: {
    noticePublic
  }
};
</script>

<style lang="scss" scoped>
</style>
