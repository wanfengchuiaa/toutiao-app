<template>
  <div class="channel-edit">
    <van-cell title="编辑频道" style="text-align: center"></van-cell>
    <van-cell title="我的频道">
      <template>
        <van-button
          plain
          type="danger"
          size="mini"
          round
          class="edit-btn"
          @click="isshow = !isshow"
          >{{ isshow ? "完成" : "编辑" }}</van-button
        >
      </template>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value, index) in userchannelsa"
        :key="value.id"
        class="vvvv"
        @click="cheacknav(value, index)"
      >
        <template #icon v-if="isshow && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="grid-span" :class="{ active: active === index }">
            {{ value.name }}
          </span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道"> </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in Filterchannels"
        :key="value.id"
        @click="addchannel(value)"
      >
        <template #text>
          <span class="grid-span1">
            <van-icon name="plus" />
            {{ value.name }}
          </span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
import _ from "lodash";
import { getchannelsa, getuserchannels, deleteUserChannel } from "@/api";
import { Notify } from "vant";
import { mapState } from "vuex";
import { setToken } from "@/utils/storeage";
import { userchannelkey } from "@/Constant";
export default {
  name: "qweqe",
  components: {},
  props: {
    userchannelsa: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      channelsList: [],
      isshow: false,
    };
  },
  computed: {
    Filterchannels() {
      return _.differenceBy(this.channelsList, this.userchannelsa, "id");
    },
    ...mapState(["user"]),
    // Filterchannels() {
    //   return this.channelsList.filter((item) => {
    //     return !this.userchannelsa.some((i) => item.id === i.id);
    //   });
    // },
  },
  watch: {},
  created() {
    this.getchannelsa();
  },
  mounted() {},
  methods: {
    async dellists(i) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(i.id);
        } else {
          // 未登录，将数据存储到本地
          setToken(userchannelkey, this.userchannelsa);
        }
      } catch (err) {
        console.log(err);
        this.$toast("删除频道失败，请稍后重试");
      }
    },
    cheacknav(value, index) {
      if (this.isshow) {
        if (index === 0) return Notify("不让删除");
        if (this.active >= index) {
          this.$emit("navcheack", this.active - 1, true);
        }
        this.userchannelsa.splice(index, 1);
        this.dellists(value);
      } else {
        this.$emit("navcheack", index, false);
      }
    },
    async addchannel(i) {
      this.userchannelsa.push(i);
      if (this.user) {
        await getuserchannels({
          id: i.id,
          seq: this.userchannelsa.length,
        });
      } else {
        setToken(userchannelkey, this.userchannelsa);
      }
    },
    async getchannelsa() {
      const res = await getchannelsa();
      console.log(res);
      this.channelsList = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
/deep/.van-grid-item__icon-wrapper {
  position: unset;
}
.vvvv {
  position: relative;

  /deep/.van-icon-clear {
    position: absolute;
    top: -7px;
    right: -5px;
    font-size: 12px;
    color: #cacaca;
  }
}
.channel-edit {
  .edit-btn {
    width: 100px;
  }
  /deep/.van-grid-item__content {
    background-color: #f4f5f6;
    .grid-span {
      font-size: 26px;
      // color: red;
      margin-top: 0;
      // &.active {
      //   color: red;
      // }
    }
    .active {
      color: red;
    }
    .grid-span1 {
      font-size: 0.37333rem;
      display: flex;
      font-size: 22px;
    }
  }
}
/deep/.van-icon-plus {
  margin-right: 15px;
}
</style>
