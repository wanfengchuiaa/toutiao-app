<template>
  <div class="my-container">
    <!-- 未登录头部 -->
    <div class="header not-login" v-if="!user">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->
    <!-- 已登录头部 -->
    <!-- 已登录 -->
    <div class="header user-info" v-else>
      <!-- 基本信息 -->
      <div class="base-info">
        <div class="left">
          <van-image
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            class="avatar"
            round
          />
          <span class="name">{{ userinfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round to="/userprofile"
            >编辑资料</van-button
          >
        </div>
      </div>
      <!-- 粉丝、关注 -->
      <div class="data">
        <div class="data-item">
          <span>{{ userinfo.art_count + 10 }}</span>
          <span>头条</span>
        </div>
        <div class="data-item">
          <span>{{ userinfo.follow_count + 25 }}</span>
          <span>关注</span>
        </div>
        <div class="data-item">
          <span>{{ userinfo.fans_count + 33 }}</span>
          <span>粉丝</span>
        </div>
        <div class="data-item">
          <span>{{ userinfo.like_count + 66 }}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->

    <div class="grid-nav">
      <van-grid clickable :column-num="2">
        <van-grid-item>
          <template #default>
            <my-icon icon="shoucang"></my-icon>
            <span class="text">收藏</span>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #default>
            <my-icon icon="lishi"></my-icon>
            <span class="text">历史</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <van-cell title="消息通知" is-link url="" />
    <van-cell title="实名认证" is-link url="" />
    <van-cell title="用户反馈" is-link url="" />
    <van-cell title="小智同学" is-link url="" />
    <van-cell title="系统设置" is-link url="" />
    <van-cell class="my-cell" title="退出登录" v-if="user" @click="okinfo" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { myuser } from "@/api";
import MyIcon from "@/components/MyIcon.vue";
export default {
  name: "MyIndex",
  components: { MyIcon },
  props: {},
  data() {
    return {
      userinfo: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    if (this.$store.state?.user?.token) {
      this.myuser();
    }
  },
  mounted() {},
  methods: {
    async okinfo() {
      try {
        await this.$dialog.confirm({
          title: "提示",
          message: "确认退出？",
        });
        this.$store.commit("getToken", null);
      } catch (error) {
        console.log(error);
      }
    },
    async myuser() {
      const res = await myuser();
      this.userinfo = res.data.data;
    },
  },
};
</script>

<style scoped lang="less">
.data {
  display: flex;
  justify-content: space-around;
  .data-item {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    span:nth-child(1) {
      font-size: 36px;
      margin-bottom: 15px;
    }
    span:nth-child(2) {
      font-size: 23px;
    }
  }
}
.my-container {
  /deep/.grid-nav {
    background: #fff;
    .toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .text {
      color: #000;
      margin-top: 8px;
      font-size: 28px;
    }
  }
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .my-cell {
    text-align: center;
    color: red;
    margin-top: 5px;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}
.user-info {
  //background: red;
  .base-info {
    height: 231px;
    padding: 76px 32px 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
        border: 2px solid #fff;
      }
      .name {
        font-size: 30px;
        color: #fff;
        margin-left: 30px;
      }
    }
  }
}
</style>
