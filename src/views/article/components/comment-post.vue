<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="message.length === 0"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api";
export default {
  name: "CommentPost",
  props: {
    // 目标id，接收文章id或者评论id
    target: {
      type: [Number, String],
      required: true,
    },
    type: {
      type: [String, Number],
      default: "a",
    },
    // commentList: {
    //   type: Array,
    // },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  inject: ["articleId"],
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
      });

      try {
        const res = await addComment({
          target: this.target, // 评论目标id（评论文章即文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.type === "a" ? null : this.articleId, // 文章
        });
        this.$toast.success("发布评论成功");
        this.message = "";
        this.$emit("postsuccess", res.data.data.new_obj);
        // this.commentList.unshift(res.data.data.new_obj);
      } catch (error) {
        this.$toast.success("发布评论失败");
        this.$emit("postsuccess");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
