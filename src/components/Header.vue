<template>
  <div class="header">
    <header
      :title="title"
      :style="{ backgroundColor: color ? color : defaultColor }"
    >
      {{ title }}
    </header>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: {
    title: String,
    color: String,
  },

  setup() {
    let defaultColor = ref("red");

    return {
      defaultColor,
    };
  },
};
</script>

<style>
header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: white;
  text-align: center;
}

</style>