<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="getitem(item)"
    >
      <template #title> <div v-html="ApplyColoursToDraw(item)"></div></template
    ></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api";
import { debounce } from "lodash";

export default {
  props: ["value"],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    getitem(item) {
      console.log(item);
      this.$emit("onSearch", item);
    },
    ApplyColoursToDraw(value) {
      const reg = new RegExp(this.value, "gi");
      return value.replace(reg, `<span style="color:red">${this.value}</span>`);
    },
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q);
      console.log(res);
      this.list = res.data.data.options;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler: debounce(function (value) {
        console.log(value);
        this.getSearchSuggestion(value);
      }, 700),
    },
  },
};
</script>

<style></style>
