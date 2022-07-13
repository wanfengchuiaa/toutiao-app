<template>
  <div class="div">
    <van-nav-bar title="标题">
      <template #left>
        <van-icon name="cross" size="18" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        placeholder="用户名"
        left-icon="smile-o"
        :rules="rules.mobile"
        name="mobile"
        required
        type="number"
        maxlength="11"
      >
        <template #left-icon> <my-icon icon="shouji"></my-icon> </template
      ></van-field>
      <van-field
        v-model="user.code"
        placeholder="密码"
        :rules="rules.code"
        type="number"
        maxlength="6"
        required
      >
        <template #left-icon>
          <my-icon icon="yanzhengma"></my-icon>
        </template>
        <template #button>
          <van-count-down
            @finish="isshowCountShow = false"
            :time="5000"
            format="ss 秒"
            v-if="isshowCountShow"
          />
          <van-button
            v-else
            size="mini"
            type="primary"
            native-type="button"
            class="send-sms-btn"
            @click="Checktel"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, smscodes } from "@/api";
import { Toast } from "vant";
import MyIcon from "@/components/MyIcon.vue";
export default {
  components: { MyIcon },
  data() {
    return {
      isshowCountShow: false,
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        console.log(res);
        Toast.success("登录成功");
        this.$store.commit("getToken", res.data.data);
        this.$router.push("./");
      } catch (error) {
        Toast.fail(error?.response?.data?.message || "服务端错误");
      }
    },
    async Checktel() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (error) {
        console.log(error);
        return;
      }
      try {
        this.isshowCountShow = true;
        await smscodes(this.user.mobile);
        Toast.success("发送验证码成功");
      } catch (error) {
        Toast.fail(error?.response?.data?.message || "出错了");
      }
    },
  },
};
</script>

<style scoped lang="less">
/deep/.toutiao {
  font-size: 37px;
}
.van-icon {
  color: #fff;
}
.send-sms-btn {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
  border: 0;
}
</style>
