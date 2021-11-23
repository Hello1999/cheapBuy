<template>
  <div>
    <div class="weui-panel weui-panel_access">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="weui-panel__bd"
        @click="
          getTkl(item.itemid);
          dialogView = true;
        "
        style="cursor: pointer"
      >
        <a class="weui-media-box weui-media-box_appmsg" target="_blank">
          <div class="weui-media-box__hd">
            <img
              class="weui-media-box__thumb"
              :src="item.itempic + '_100x100.jpg'"
            />
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title" v-text="item.itemtitle"></h4>
            <h4 class="weui-media-box__title">
              原价: {{item.itemprice}}
            </h4>
            <h4 class="weui-media-box__title">
              券后包邮仅需: {{ item.itemendprice }} || 机器人再返:
              {{ (item.tkmoney * 0.6).toFixed(2) }}
            </h4>
            <p class="weui-media-box__desc" v-text="item.itemdesc"></p>
          </div>
        </a>
      </div>
      <div @click="loadHot" class="weui-panel__ft">
        <a
          href="javascript:void(0);"
          class="weui-cell weui-cell_access weui-cell_link"
        >
          <div class="weui-cell__bd">查看更多</div>
          <span class="weui-cell__ft"></span>
        </a>
      </div>
    </div>
    <div class="weui-dialog" v-if="dialogView">
      <div class="weui-dialog__hd">
        <strong class="weui-dialog__title" id="js_title1">温馨提示</strong>
      </div>
      <div class="weui-dialog__bd">
        如果打开手淘客户端没有显示的话,请手动复制以下淘口令再打开
        <br />
        {{ tkl }}
      </div>
      <div class="weui-dialog__ft">
        <a
          role="button"
          class="weui-dialog__btn weui-dialog__btn_primary"
          @click="
            dialogView = false;
            tkl = '';
          "
          >我知道了</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { onMounted, reactive, ref, toRef, toRefs } from "@vue/runtime-core";
import useClipboard from "vue-clipboard3";
export default {
  setup() {
    //获取优惠信息
    let data = reactive([]);
    let page = 1;

    let loadHot = async () => {
      let getData = await axios.post("api/spk/top", {
        apikey: "ycq9hxGGYdUG7GTdkHBhQQ77UsiZFW2h",
        sale_type: 1,
        cid: 0,
        min_id: page,
        back: 20,
      });

      //每次点击重新加载 就添加页数
      page++;
      //添加从淘宝联盟获取的商品数据
      data.push(...getData.data.data);
    };

    //淘口令
    let tkl = ref("");
    //点击商品信息的时候 获取淘口令
    let getTkl = async (itemid) => {
      let tklData = await axios.post("api/tbk/id_privilege", {
        apikey: "ycq9hxGGYdUG7GTdkHBhQQ77UsiZFW2h",
        id: itemid,
        tpwd: true,
      });

      //淘口令
      tkl.value = tklData.data.data.long_coupon_tpwd;

      //复制到粘贴板
      const { toClipboard } = useClipboard();
      toClipboard(tkl.value);
    };

    //控制点击商品信息后的提示框 是否打开/关闭
    let dialogView = ref(false);

    onMounted(() => {
      loadHot();
    });

    return {
      loadHot,
      getTkl,
      data,
      tkl,
      dialogView,
    };
  },
};
</script>

<style>
.imgBox {
  margin: 10px;
}

.weui-dialog__hd {
  color: RGB(0, 128, 0);
}
</style>