<template>
  <van-button class="BTN" @click="cheackColor" :loading="loading">
    <template #icon>
      <van-icon
        :name="isCollected === 1 ? 'good-job' : 'good-job-o'"
        :color="isCollected === 1 ? 'red' : ''"
      ></van-icon>
    </template>
  </van-button>
</template>
<script>
import { addLike, deleteLike } from "@/api";
export default {
  name: "CollectArticle",
  model: {
    prop: "isCollected",
    event: "ooo",
  },
  props: {
    isCollected: [Boolean, String, Number],
    id: [String, Number],
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async cheackColor() {
      let a = -1;
      this.loading = true;
      try {
        if (this.isCollected === 1) {
          await deleteLike(this.id);
          this.loading = false;
          a = -1;
        } else {
          await addLike(this.id);
          this.loading = false;
          a = 1;
        }
        this.$emit("ooo", a);
        this.$toast.success(a === 1 ? "点赞成功" : "点赞取消");
      } catch (error) {
        this.$toast.success("操作失败");
        this.loading = false;
      }
    },
  },
  created() {},
};
</script>
<style scoped lang="less">
.BTN {
  border: none;
}
</style>
