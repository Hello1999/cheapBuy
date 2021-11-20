<template>
    <div class="weui-panel weui-panel_access">
    <div v-for="(item,index) in data" :key="index" class="weui-panel__bd">
      <a :href="item.couponurl" class="weui-media-box weui-media-box_appmsg">
        <div class="weui-media-box__hd">
          <img class="weui-media-box__thumb" :src="item.itempic + '_100x100.jpg'">
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-text="item.itemtitle"></h4>
          <h4 class="weui-media-box__title">券后包邮仅需: {{item.itemendprice}}</h4>
          <p class="weui-media-box__desc" v-text="item.itemdesc"></p>
        </div>
      </a>
    </div>
    <div @click="loadHot" class="weui-panel__ft">
      <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
        <div class="weui-cell__bd">查看更多</div>
        <span class="weui-cell__ft"></span>
      </a>
    </div>
  </div>
  <button @click="loadHot">加载更多</button>
</template>

<script>
import axios from "axios";
import { onMounted, reactive, ref, toRef, toRefs } from "@vue/runtime-core";

export default {
  setup() {
    //获取优惠信息
    let data =  reactive([]);
    let page = 1;

    let loadHot = async () => {
      let getData = await axios.post("api/spk/jiukuaijiu", {
        apikey: "ycq9hxGGYdUG7GTdkHBhQQ77UsiZFW2h",
        nav: 1,
        page_size: 10,
        min_id: page,
        sort: 0,
      });

      //每次点击重新加载 就添加页数
      page++;
      //添加从淘宝联盟获取的商品数据
      data.push(...getData.data.data.data)
      console.log(data);
    };


    onMounted(() => {
      loadHot();
    });

    return {
      loadHot,
      data
    };
  },
};
</script>

<style>
  .imgBox{
    margin: 10px;
  }
</style>