<template>
  <div
    :class="[
      'weui-search-bar',
      { 'weui-search-bar_focusing': isFocus },
      (id = 'earchBar'),
    ]"
  >
    <form class="weui-search-bar__form">
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input
          type="search"
          ref="inputElement"
          v-model="searchValue"
          class="weui-search-bar__input"
          id="searchInput"
          :placeholder="rhd"
          required
          v-on:keydown.enter.prevent
          @keydown.enter="search(searchValue)"
        />
        <a href="javascript:" class="weui-icon-clear" id="searchClear" @click="clear"></a>
      </div>
      <label @click="toggle" class="weui-search-bar__label" id="searchText">
        <i class="weui-icon-search"></i>
        <span>{{rhd}}</span>
      </label>
    </form>
    <a
      @click="toggle(), clear()"
      href="javascript:"
      class="weui-search-bar__cancel-btn"
      id="searchCancel"
      >取消</a
    >
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { watch } from "@vue/runtime-core";
export default {
  props: {
    rhd: String
  },
  emits: ['search'],

  setup(prop, context) {
    //获取 store (vuex)
    const store = useStore();

    //是否聚焦
    let state = reactive({
      isFocus: false,
      inputElement: null,
      searchValue: "",
    });
    //切换搜索框是否选中状态
    let toggle = () => {
      state.isFocus = !state.isFocus;
      state.inputElement.focus();
    };
    //清除搜索文本
    let clear = () => {
        state.searchValue = ''
    }

    //搜索 提交数据给 搜索页面 让其展示
    let search = (searchValue) => {
       context.emit('search', searchValue)
    }

    
    //将搜索词 传给 state
    watch(
      () => {
        return state.searchValue;
      },
      () => {
          store.commit('setSearchValue', state.searchValue)
      }
    );

    return {
      ...toRefs(state),
      toggle,
      clear,
      search
    };
  },
};
</script>

<style>
</style>