<template>
  <div class="article-item">
    <van-cell :title="article.title" :to="`/article/${article.art_id}`">
      <template #default v-if="article.cover.type === 1">
        <van-image width="100" height="100" :src="article.cover.images[0]" />
      </template>
      <template #label>
        <div class="qwer" v-if="article.cover.type === 3">
          <van-image
            width="100"
            height="100"
            :src="item"
            v-for="item in article.cover.images"
            :key="item"
          />
        </div>
        <div class="ml">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}</span>
          <span>{{ article.pubdate | filterTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
/deep/.van-cell__title {
  flex: 1.7;
}
.qwer {
  display: flex;
  justify-content: space-between;
}
.ml {
  margin-top: 20px;
  span {
    margin-right: 15px;
  }
}
</style>
