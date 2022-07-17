<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="objects.art_id">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ objects.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="objects.aut_photo"
          />
          <div slot="title" class="user-name">{{ objects.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ objects.pubdate | filterTime }}
          </div>
          <FollowUser :objects="objects" />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="center"
          class="article-content markdown-body"
          v-html="objects.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <comment-list
          :source="objects.art_id"
          :list="commentList"
          @reply_click="isReplyShows"
        ></comment-list>
      </div>
      <!-- /加载完成-文章详情 -->
      <!-- 评论列表 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="isNotFound">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="ispopup = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="objects.comm_count" color="#777" />
      <!-- <van-icon color="#777" name="star-o" /> -->
      <CollectArticle :id="objects.art_id" v-model="objects.isCollected" />
      <!-- <van-icon color="#777" name="good-job-o" /> -->
      <LikeArticle
        v-model="objects.attitude"
        :id="objects.art_id"
      ></LikeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <van-popup v-model="ispopup" position="bottom"
      ><comment-post
        :target="objects.art_id"
        @postsuccess="postsuccess"
      ></comment-post
    ></van-popup>

    <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 100%"
      v-if="isReplyShow"
    >
      <comment-reply
        :commentitem="commentitem"
        @ShutDown="isReplyShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import "github-markdown-css";
import { getArticleById } from "@/api";
import { ImagePreview } from "vant";
import FollowUser from "./components/follow-user/index.vue";
import CollectArticle from "./components/collect-article/index.vue";
import LikeArticle from "./components/like-article/index.vue";
import CommentList from "./components/comment-list.vue";
import CommentPost from "./components/comment-post.vue";
import CommentReply from "./components/comment-reply.vue";
export default {
  name: "ArticleIndex",
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      objects: {},
      loading: false,
      isNotFound: false,
      ispopup: false,
      isReplyShow: false,
      commentList: [],
      commentitem: {},
    };
  },
  computed: {},
  provide() {
    return {
      articleId: this.articleId,
    };
  },
  watch: {},
  created() {
    this.loadArtcileInfo();
  },
  mounted() {},
  methods: {
    isReplyShows(item) {
      this.isReplyShow = true;
      this.commentitem = item;
    },
    postsuccess(obj) {
      this.ispopup = false;
      this.commentList.unshift(obj);
    },
    getimg() {
      const imgs = this.$refs.center.querySelectorAll("img");
      console.log(imgs);
      const imgarr = [];
      imgs.forEach((item, index) => {
        imgarr.push(item.src);
        item.addEventListener("click", function () {
          ImagePreview({
            images: imgarr,
            startPosition: index,
          });
        });
      });
    },
    async loadArtcileInfo() {
      this.loading = true;
      try {
        const res = await getArticleById(this.articleId);
        this.objects = res.data.data;
        this.loading = false;
        this.$nextTick(() => {
          this.getimg();
        });
      } catch (err) {
        this.loading = false;
        this.isNotFound = err.responst.status === 404;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
/deep/.van-icon-arrow-left {
  color: rgb(255, 255, 255);
}
</style>
