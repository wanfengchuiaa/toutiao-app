<template>
  <div>
    <van-cell title="历史记录">
      <template #default>
        <template v-if="isshow">
          <van-tag class="btn" type="danger" @click="addedl">全部删除</van-tag>
          <van-tag class="btn" type="success" @click="isshow = false"
            >确定</van-tag
          >
        </template>
        <van-icon name="delete" v-else @click="isshow = true"></van-icon>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchList"
      :key="index"
      @click="delitem(item, index)"
    >
      <template>
        <van-icon name="close" v-if="isshow"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ["searchList"],
  data() {
    return {
      isshow: false,
    };
  },
  methods: {
    addedl() {
      this.$emit("adddel");
    },
    delitem(item, index) {
      if (this.isshow) {
        this.searchList.splice(index, 1);
      } else {
        this.$emit("Search", item);
      }
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  margin-right: 10px;
}
</style>
