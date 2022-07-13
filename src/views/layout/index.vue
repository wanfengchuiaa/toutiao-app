<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar v-model="active" class="layout-tabbar" route>
      <van-tabbar-item icon="home-o" to="/home">
        首页
        <template #icon>
          <my-icon icon="shouye"></my-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/qa">
        问答
        <template #icon>
          <my-icon icon="wenda"></my-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/video">
        视频
        <template #icon>
          <my-icon icon="shipin"></my-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" to="/my">
        我的
        <template #icon>
          <my-icon icon="wode"></my-icon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import MyIcon from "@/components/MyIcon.vue";
export default {
  components: { MyIcon },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang="less">
.layout-container {
  margin-bottom: 110px;
  /deep/.layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
