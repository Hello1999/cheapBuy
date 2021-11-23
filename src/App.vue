<template>
  <Header title="每日最优惠
  -wx: zuihuimai118 购物多重返利 一省再省" color="green"></Header>
    <router-view></router-view>
  <Footer></Footer>
  
</template>

<script>
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import Footer from '@/components/Footer'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
export default {
  components: {
    Header,
    SearchBar,
    Footer
  },

  setup() {
    const store = useStore()
  }
  
}
</script>

<style>

</style>