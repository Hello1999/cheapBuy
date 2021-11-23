<template>
  <search-bar
    rhd="输入商品链接或者淘口令 可以查询隐藏优惠券和返利优惠哦~!"
    @search="getCommision"
  ></search-bar>
  <div class="weui-dialog" v-if="dialogView && dataCode === 200">
    <div class="weui-dialog__hd">
      <strong class="weui-dialog__title" id="js_title1">返利信息</strong>
    </div>
    <div class="weui-dialog__bd">
      商品: {{ commodityInfo.values.itemInfo.title }}

      <br />
      店铺:
      {{ commodityInfo.values.itemInfo.nick }}

      <br />
      原价:
      {{ commodityInfo.values.itemInfo.reserve_price }}

      <br />
      券后价:
      {{ commodityInfo.values.itemInfo.qh_final_price }}

      <br />
      机器人再返:
      {{ (commodityInfo.values.itemInfo.qh_final_commission * 0.6).toFixed(2) }}

      <br />
      已复制淘口令到粘贴板 打开手淘即可购买
      <br />
      如果打开手淘客户端没有显示的话,请手动复制以下淘口令再打开:
      <br />
      {{ commodityInfo.values.long_coupon_tpwd }}
    </div>

    <div class="weui-dialog__ft">
      <a
        role="button"
        class="weui-dialog__btn weui-dialog__btn_primary"
        @click="dialogView = false"
        >我知道了</a
      >
    </div>
  </div>
  <!-- 没有返利的dialog -->
  <div class="weui-dialog" v-if="dataCode === -1">
    <div class="weui-dialog__hd">
      <strong class="weui-dialog__title" id="js_title1">返利信息</strong>
    </div>
    <div class="weui-dialog__bd">这个商品没有返利或输入有误 重新试试看吧!</div>

    <div class="weui-dialog__ft">
      <a
        role="button"
        class="weui-dialog__btn weui-dialog__btn_primary"
        @click="dataCode = 0"
        >我知道了</a
      >
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar";
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import useClipboard from "vue-clipboard3";

export default {
  components: {
    SearchBar,
  },

  setup() {
    let commodityInfo = reactive({});
    let dataCode = ref("");
    let dialogView = ref(false);

    //万能转高佣API 获取商品信息
    let getCommision = async (content) => {
      let getData = await axios.post("api/tbk/wn_convert", {
        apikey: "ycq9hxGGYdUG7GTdkHBhQQ77UsiZFW2h",
        content: content,
        logo: true,
        itemInfo: true,
        tpwd: true,
      });
      //获取API返回的信息
      dataCode.value = getData.data.code;

      if (dataCode.value === 200) {
        commodityInfo.values = { ...getData.data.data };

        //复制淘口令到粘贴板
        const { toClipboard } = useClipboard();
        toClipboard(commodityInfo.values.long_coupon_tpwd);
      } else {
        return;
      }

      //搜索之后 显示dialog
      dialogView.value = true;
    };

    return {
      getCommision,
      commodityInfo,
      dialogView,
      dataCode,
    };
  },
};
</script>

<style>
</style>