<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs animated swipeable v-model="active" class="channel-tabs">
      <van-tab v-for="item in userchannelsa" :key="item.id" :title="item.name">
        <article-list :channel="item"></article-list>
      </van-tab>
      <template #nav-right>
        <div class="placeholder" @click="show = true">
          <my-icon class="hamburger-btn" icon="gengduo"></my-icon>
        </div>
      </template>
    </van-tabs>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '85%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-edit
        @navcheack="navcheack"
        :userchannelsa="userchannelsa"
        :active="active"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { userchannels } from "@/api";
import { mapState } from "vuex";
import MyIcon from "@/components/MyIcon.vue";
import ArticleList from "@/components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
import { userchannelkey } from "@/Constant";

export default {
  name: "HomeIndex",
  components: { MyIcon, ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      userchannelsa: [],
      show: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.userchannels();
  },
  mounted() {},
  methods: {
    navcheack(index, flag) {
      this.active = index;
      this.show = flag;
    },
    async userchannels() {
      // const res = await userchannels();
      // console.log(res);
      // this.userchannelsa = res.data.data.channels;

      try {
        const token = this.$store?.state?.user?.token;
        let channel = JSON.parse(localStorage.getItem(userchannelkey));
        if (token || !channel) {
          const res = await userchannels();
          channel = res.data.data.channels;
        }
        this.userchannelsa = channel;
      } catch (e) {
        this.$toast.fail("获取频道数据失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      // border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }
    // .van-tabs__content {
    //   margin-top: 120px;
    // }
    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
  }
}
</style>
