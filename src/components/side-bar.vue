<template>
  <div class="sideBar">
    <gif-slicer @gif-sliced="onGifSliced" />
    <el-form
      label-position="left"
      label-width="100px"
      class="form"
    >
      <el-form-item label="转速(r/s)">
        <el-slider
          v-model="rotateSpeed"
          size="small"
          @change="onRotateSpeedChange"
        />
      </el-form-item>
    </el-form>
    <div class="holder" />
    <el-button
      class="btn"
      type="primary"
      size="large"
      @click="toggleIsOn"
    >
      {{ btnTxt }}
    </el-button>
    <el-button
      class="btn"
      size="large"
      @click="exportImg"
    >
      导出图片
    </el-button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import useEmitter from '@/composables/use-emitter';
import GifSlicer from '@/components/gif-slicer.vue';

import { GIF_SLICED_EVENT, IS_ON_CHANGE_EVENT, ROTATE_SPEED_CHANGE_EVENT, EXPORT_IMG_EVENT } from '@/constants/events';


const emitter = useEmitter();

const rotateSpeed = ref(10);
const isOn = ref(false);

const btnTxt = computed(() => {
  return isOn.value ? '停止旋转' : '开始旋转';
})

function exportImg() {
  emitter.emit(EXPORT_IMG_EVENT);
}

function onGifSliced(imgList) {
  emitter.emit(GIF_SLICED_EVENT, imgList);
}

function onRotateSpeedChange() {
  emitter.emit(ROTATE_SPEED_CHANGE_EVENT, rotateSpeed.value);
}

function toggleIsOn() {
  isOn.value = !isOn.value;
  emitter.emit(IS_ON_CHANGE_EVENT, isOn.value);
}
</script>

<style scoped lang="less">
@font-size-s: 12px;
@font-size-m: 14px;
@font-size-l: 16px;

@font-color-black: #333;

.sideBar {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 20px 15px;
  align-items: center;

  .form {
    display: block;
    padding: 20px 0 0 0;
    box-sizing: border-box;
    width: 100%;
  }

  .holder{
    flex: 1;
  }

  .btn {
    width: 100%;
  }
  .btn + .btn{
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
