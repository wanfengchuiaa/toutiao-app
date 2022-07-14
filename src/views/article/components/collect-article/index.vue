<template>
  <van-button class="BTN" @click="cheackColor" :loading="loading">
    <template #icon>
      <van-icon
        :name="isCollected ? 'star' : 'star-o'"
        :color="isCollected ? 'red' : ''"
      ></van-icon>
    </template>
  </van-button>
</template>
<script>
import { deleteCollect, addCollect } from "@/api";
export default {
  name: "CollectArticle",
  model: {
    prop: "isCollected",
    event: "ooo",
  },
  props: {
    isCollected: Boolean,
    id: [String, Number],
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async cheackColor() {
      this.loading = true;
      try {
        if (this.isCollected) {
          await deleteCollect(this.id);
          this.loading = false;
        } else {
          await addCollect(this.id);
          this.loading = false;
        }
        this.$emit("ooo", !this.isCollected);
        this.$toast.success(!this.isCollected ? "收藏成功" : "取消收藏");
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
