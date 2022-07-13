<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isshowresult = false"
      />
    </form>
    <SearchResult v-if="isshowresult" :value="value" />
    <search-suggestion
      v-else-if="value"
      :value="value"
      @onSearch="onSearch"
    ></search-suggestion>

    <search-history
      v-else
      @Search="onSearch"
      :searchList="searchList"
      @adddel="adddel"
    ></search-history>
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
import { setToken, getToken } from "@/utils/storeage";
export default {
  name: "SearchPage",
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data() {
    return {
      value: "",
      isshowresult: false,
      searchList: getToken("sousuolishi") || [],
    };
  },
  computed: {},
  watch: {
    searchList(value) {
      setToken("sousuolishi", value);
    },
  },
  created() {},
  methods: {
    adddel() {
      this.searchList = [];
    },
    onSearch(val) {
      this.value = val;
      this.isshowresult = true;
      const index = this.searchList.indexOf(val);
      if (index !== -1) {
        this.searchList.splice(index, 1);
      }
      this.searchList.unshift(val);
    },
    onCancel() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped></style>
