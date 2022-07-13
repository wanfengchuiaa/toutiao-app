import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
//引入相对时间的功能
import relativeTime from "dayjs/plugin/relativeTime";
import Vue from "vue";

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime);

Vue.filter("filterTime", (val) => {
  return dayjs().to(dayjs(val));
});
