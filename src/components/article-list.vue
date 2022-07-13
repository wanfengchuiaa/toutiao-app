<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="失败了点击重新加载"
      >
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { articles } from "@/api";
import ArticleItem from "./article-item/index.vue";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      time: null,
      error: false,
      isLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const res = await articles({
          channel_id: this.channel.id,
          timestamp: this.time || new Date(),
          with_top: 1,
        });
        // console.log(res);
        this.list = [...this.list, ...res.data.data.results];
        this.loading = false;
        if (this.list.length === 50) {
          this.finished = true;
        } else {
          this.time = res.data.data.pre_timestamp;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }
    },
    async onRefresh() {
      const res = await articles({
        channel_id: this.channel.id,
        timestamp: new Date(),
        with_top: 1,
      });
      this.list = [...res.data.data.results, ...this.list];
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
