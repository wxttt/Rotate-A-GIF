<template>
  <div class="mainPlayground">
    <animation-preview
      :img-list="imgList"
      :is-on="isOn"
      :rotate-speed="rotateSpeed"
    />
  </div>
</template>

<script setup>
import useEmitter from '@/composables/use-emitter';
import animationPreview from '@/components/animation-preview.vue';

import { GIF_SLICED_EVENT, IS_ON_CHANGE_EVENT, ROTATE_SPEED_CHANGE_EVENT } from '@/constants/events';

import { ref } from 'vue';

const imgList = ref([]);
const isOn = ref(false);
const rotateSpeed = ref(10);

const emitter = useEmitter();

emitter.on(GIF_SLICED_EVENT, (data) => {
  imgList.value = data;
})

emitter.on(IS_ON_CHANGE_EVENT, (val) => {
  isOn.value = val;
})

emitter.on(ROTATE_SPEED_CHANGE_EVENT, (val) => {
  rotateSpeed.value = val;
})


</script>

<style scoped lang="less">
.mainPlayground{
  height: 100%;
}
</style>
