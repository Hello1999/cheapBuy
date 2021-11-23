<template>
  <SearchBar
    rhd="来搜索想买的东西吧-全力查找优惠!"
    @search="loadHot"
  ></SearchBar>
  <div class="weui-panel weui-panel_access" v-if="dataCode === 200">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="weui-panel__bd"
      @click="
        getTkl(item.item_id);
        dialogView = true;
      "
      style="cursor: pointer"
    >
      <a class="weui-media-box weui-media-box_appmsg" target="_blank">
        <div class="weui-media-box__hd">
          <img
            class="weui-media-box__thumb"
            :src="item.pict_url + '_100x100.jpg'"
          />
        </div>
        <div class="weui-media-box__bd">
          <h4 class="weui-media-box__title" v-text="item.title"></h4>
          <h4 class="weui-media-box__title" >
            原价: {{item.reserve_price}}
          </h4>
          <h4 class="weui-media-box__title">
            券后包邮仅需:
            {{
              parseInt(item.coupon) >= 1
                ? parseInt(item.zk_final_price) - parseInt(item.coupon)
                : parseInt(item.zk_final_price)
            }}
            || 机器人再返:
            {{
              (
                (parseInt(item.zk_final_price) - parseInt(item.coupon)) *
                (item.commission_rate * 0.0001) *
                0.6
              ).toFixed(2)
            }}
          </h4>
          <p class="weui-media-box__desc" v-text="item.item_description"></p>
        </div>
      </a>
    </div>
    <div @click="loadHot(searchValue)" class="weui-panel__ft">
      <a
        href="javascript:void(0);"
        class="weui-cell weui-cell_access weui-cell_link"
      >
        <div class="weui-cell__bd">查看更多</div>
        <span class="weui-cell__ft"></span>
      </a>
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
  <div class="weui-dialog" v-if="dataCode === -1">
    <div class="weui-dialog__hd">
      <strong class="weui-dialog__title" id="js_title1">没有找到商品</strong>
    </div>
    <div class="weui-dialog__bd">
      没有找到商品 可能是搜索词错误 请检查
      <br />
    </div>
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
import axios from "axios";
import { reactive, ref } from "@vue/reactivity";
import useClipboard from "vue-clipboard3";
export default {
  components: {
    SearchBar,
  },

  setup() {
    //当前搜索的页数
    let page = 1;
    let dataCode = ref("");
    let data = reactive([]);
    let searchValue = ref("");

    let loadHot = async (searchTitle) => {
      //如果更换了搜索词 就删除之前的列表数据 重载新搜索词的结果
      if (searchValue.value != searchTitle && searchValue.value != "") {
        data.splice(0);
      }
      //传递过来的searchValue 设置成组件全局变量 方便查看更多数据
      searchValue.value = searchTitle;
      let getData = await axios.post("api/tbk/super_search", {
        apikey: "ycq9hxGGYdUG7GTdkHBhQQ77UsiZFW2h",
        q: searchTitle,
        sort: "total_sales",
        page_size: 20,
        page_on: page,
      });

      //获取API请求代码
      dataCode.value = getData.data.code;
      if (dataCode.value === -1) {
        return;
      } else {
        //后续搜索的参数 也添加到 data 列表中
        data.push(...getData.data.data);
        //每次调用之后 page ++
        page++;
        //搜索之后判断是否更改了搜索词
      }
    };

    //淘口令
    let tkl = ref("");
    //点击商品信息的时候 获取淘口令
    let getTkl = async (item_id) => {
      let tklData = await axios.post("api/tbk/id_privilege", {
        apikey: "ycq9hxGGYdUG7GTdkHBhQQ77UsiZFW2h",
        id: item_id,
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

    return {
      loadHot,
      dataCode,
      searchValue,
      data,
      getTkl,
      tkl,
      dialogView,
    };
  },
};
</script>

<style>
.weui-dialog__hd {
  color: RGB(0, 128, 0);
}
</style>