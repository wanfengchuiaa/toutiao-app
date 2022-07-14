<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :error.sync="error"
    error-text="出错了，点击重试"
  >
    <comment-item
      :comment="item"
      v-for="item in list"
      :key="item.com_id"
    ></comment-item>
    <!-- <van-cell
      v-for="item in list"
      :key="item.com_id"
      :title="item.content"
    ></van-cell> -->
  </van-list>
</template>
<script>
import { getComments } from "@/api";
import CommentItem from "./comment-item.vue";
export default {
  name: "CommentList",
  components: { CommentItem },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false,
      offset: null,
      limit: 10,
      error: false, // 是否加载结束
    };
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: "a",
          source: this.source,
          offset: this.offset, // 评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit, // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        });

        this.list.push(...res.data.data.results);
        this.loading = false;
        if (res.data.data.results.length) {
          this.offset = res.data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
        this.loading = false;
      }

      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 500);
    },
  },
};
</script>
