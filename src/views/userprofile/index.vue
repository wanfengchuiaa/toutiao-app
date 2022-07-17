<template>
  <div>
    <van-nav-bar title="个人信息">
      <template #left>
        <van-icon
          color="#fff"
          name="arrow-left"
          @click="$router.back()"
        ></van-icon>
      </template>
    </van-nav-bar>
    <input type="file" ref="input" hidden @change="getinput" />
    <van-cell is-link title="头像" center @click="$refs.input.click()">
      <template #default>
        <van-image class="touxiang" round :src="user.photo"></van-image>
      </template>
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="showname = !showname"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 1 ? '男' : '女'"
      @click="showsex = !showsex"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="showtime = !showtime"
    ></van-cell>
    <!-- 修改昵称弹出层 -->
    <van-popup v-model="showname" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="昵称"
        left-text="返回"
        right-text="确定"
        left-arrow
        @click-left="showname = false"
        @click-right="onClickRight"
      />

      <van-field
        v-model="user.name"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>
    <!-- 修改性别弹出层 -->
    <van-popup v-model="showsex" position="bottom" :style="{ height: '40%' }">
      <van-area title="选择性别" :area-list="areaListsex" @confirm="issex" />
    </van-popup>

    <!-- 修改生日弹出层 -->
    <van-popup v-model="showtime" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="istiem"
      />
    </van-popup>
    <van-popup v-model="showIMg" position="bottom" :style="{ height: '100%' }">
      <UpdataIMG
        :img="img"
        @close="showIMg = false"
        v-model="user.photo"
      ></UpdataIMG>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from "@/api";
import dayjs from "dayjs";
import UpdataIMG from "../../components/updataIMG.vue";
export default {
  name: "UserProfile",
  components: { UpdataIMG },
  props: {},
  data() {
    return {
      user: {},
      img: "",
      showname: false,
      showsex: false,
      showtime: false,
      showIMg: false,
      areaListsex: {
        province_list: {},
        city_list: {
          110100: "男",
          110200: "女",
        },
        county_list: {},
      },
      minDate: new Date(1969, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile();
  },
  mounted() {},
  methods: {
    //性别确定回调
    async issex(e) {
      this.showsex = false;
      try {
        await updateUserProfile({
          gender: e[1].name === "男" ? 1 : 0,
        });
        this.user.gender = e[1].name === "男" ? 1 : 0;
        this.$toast.success("性别修改成功");
      } catch (error) {
        this.$toast.fail("修改失败");
      }
    },
    //监听图片上传input框
    getinput(e) {
      console.log(this.$refs.input.file);
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      console.log(url);
      this.showIMg = true;
      this.img = url;
    },
    // 日期确定回调
    async istiem(e) {
      console.log(e);
      this.showtime = false;
      const currentDate = dayjs(e).format("YYYY-MM-DD");
      try {
        await updateUserProfile({
          birthday: currentDate,
        });
        this.user.birthday = currentDate;
        this.$toast.success("生日修改成功");
      } catch (error) {
        this.$toast.fail("修改失败");
      }
    },
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile();
        this.user = data.data;
      } catch (err) {
        this.$toast("数据获取失败");
      }
    },
    async onClickRight() {
      console.log(111);
      this.showname = false;
      if (this.user.name.trim() === "") return this.$toast.fail("昵称不能为空");
      try {
        await updateUserProfile({
          name: this.user.name,
        });
        this.$toast.success("修改成功");
      } catch (error) {
        this.$toast.fail("修改失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.touxiang {
  width: 70px;
  height: 70px;
}
// /deep/.van-nav-bar__content {
//   /deep/.van-nav-bar__left {
//     color: #fff !important;
//   }
//   .van-nav-bar__right {
//     color: #fff;
//   }
// }

/deep/.van-nav-bar__text {
  color: #e8f3ff;
}
</style>
