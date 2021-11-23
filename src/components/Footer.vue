<template>
  <div class="footer">
    <div role="tablist" aria-label="选项卡标题" class="weui-tabbar">
      <div
        id="tab1"
        role="tab"
        aria-labelledby="t1_title"
        aria-describedby="t1_tips"
        aria-selected="true"
        aria-controls="panel1"
        :class="[
          'weui-tabbar__item',
          { 'weui-bar__item_on': activeItem === item.item },
        ]"
        wah-hotarea="click"
        @click="changeItem(item.item, item.path)"
        v-for="(item, index) in itemMenu"
        :key="index"
      >
        <div
          id="t1_tips"
          aria-hidden="true"
          style="display: inline-block; position: relative"
        ></div>
        <p id="t1_title" aria-hidden="true" class="weui-tabbar__label">
          {{ item.item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";

export default {
  setup() {
    let store = useStore();
    let router = useRouter();
    let route = useRoute();
    //菜单选项
    let itemMenu = reactive([
      { item: "9.9包邮", path: "/" },
      { item: "最热商品", path: "/hot" },
      { item: "搜索商品", path: "/searchcommodity" },
      { item: "查询返利", path: "/searchcommission" },
      { item: "购物帮助", path: "/help" },
    ]);
    //激活的导航栏 item
    let activeItem = ref("");

    let changeItem = (item, path) => {
      activeItem.value = item;
      router.push(path);
    };


    //返回模版需要的数据
    return {
      itemMenu,
      changeItem,
      activeItem,
    };
  },
};
</script>

<style>
body {
  margin-bottom: 30px;
}

.footer {
  height: 100px;
  width: 100%;
  position: fixed;
  bottom: -70px;
}
</style>