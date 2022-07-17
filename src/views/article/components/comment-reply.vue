<template>
  <div class="comment-reply">
    <van-nav-bar title="回复" @click-left="$emit('ShutDown')">
      <van-icon slot="left" name="cross" color="#fff" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="commentitem" />
      <!-- /当前评论项 -->
      <van-cell title="评论回复" :border="false"></van-cell>

      <!-- 评论的回复列表 -->
      <comment-list
        :source="commentitem.com_id"
        type="c"
        :list="list"
      ></comment-list>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost
        :target="commentitem.com_id"
        type="c"
        @postsuccess="postsuccess"
      />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import CommentList from "./comment-list.vue";
import CommentPost from "./comment-post.vue";
export default {
  name: "CommentReply",
  components: { CommentItem, CommentList, CommentPost },
  props: {
    commentitem: {
      type: Object,
    },
  },
  data() {
    return {
      isPostShow: false,
      list: [],
    };
  },
  computed: {},

  watch: {},
  created() {},
  mounted() {},
  methods: {
    postsuccess(a) {
      this.isPostShow = false;
      this.list.unshift(a);
      this.commentitem.reply_count++;
    },
  },
};
</script>
<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>
