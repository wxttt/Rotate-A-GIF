<script setup>
import MainPlayground from './components/main-playground.vue';
import SideBar from '@/components/side-bar.vue';

</script>

<template>
  <div class="playground">
    <div class="mainCtn">
      <main-playground />
    </div>
    <div class="subCtn">
      <side-bar />
    </div>
  </div>
</template>


<style lang="less">

html, body, #app {
  height: 100%;
}

html{
  font-family: sans-serif;
}

body{
  background: #fafafa;
  font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
}

.playground{
  display: flex;
  margin: 0;
  padding: 0;
  height: 100%;
  .mainCtn{
    flex: 1;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .subCtn{
    width: 30%;
    max-width: 280px;
    flex-shrink: 0;
    border-left: 1px solid #eee;
    overflow: hidden;
  }
}

</style>
