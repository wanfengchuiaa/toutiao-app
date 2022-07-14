<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    v-if="!objects.is_followed"
    :loading="isshow"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    size="small"
    v-else
    @click="onFollow"
    :loading="isshow"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api";

export default {
  props: ["objects"],
  data() {
    return {
      isshow: false,
    };
  },
  methods: {
    async onFollow() {
      // 开启按钮的 loading 状态
      this.isshow = true;
      try {
        // 如果已关注，则取消关注
        const authorId = this.objects.aut_id;
        if (this.objects.is_followed) {
          await deleteFollow(authorId);
          this.isshow = false;
        } else {
          // 否则添加关注
          await addFollow(authorId);
          this.isshow = false;
        }

        // 更新视图
        this.objects.is_followed = !this.objects.is_followed;
      } catch (err) {
        console.log(err);
        this.$toast.fail("操作失败");
      }
    },
  },
};
</script>

<style></style>
