<template>
  <Header title="每日最优惠" color="red"></Header>
  <Search></Search>
  <Panel></Panel>
</template>

<script>
import Header from '@/components/Header'
import Search from '@/components/Search'
import Panel from '@/components/Panel'
import {useStore} from 'vuex'
export default {
  components: {
    Header,
    Search,
    Panel
  },

  setup() {
    const store = useStore()
  }
  
}
</script>

<style>

</style>