<script setup>
import html2canvas from "html2canvas";
import { ref, computed, onMounted } from "vue";

import useEmitter from '@/composables/use-emitter';

import { EXPORT_IMG_EVENT } from '@/constants/events';

const props = defineProps({
  imgList: { type: Array, default() { return [] } },
  rotateSpeed: { type: Number, default: 10 },
  isOn: { type: Boolean, default: false }
});

const emitter = useEmitter();

emitter.on(EXPORT_IMG_EVENT, onExportImg)

const animateStyle = computed(() => {
  const duration = props.rotateSpeed > 0 ? 1 / props.rotateSpeed : 0;

  return {
    animationDuration: `${duration}s`,
  };
});

const animateClass = computed(() => {
  return { stopAnimation: !props.isOn };
});

const imgConfig = computed(() => {
  return props.imgList.map((item, index) => {
    return {
      url: item,
      outStyle: {
        transform: `rotate(${(index * 360) / props.imgList.length}deg)`,
      },
    };
  });
})

const frisbeeRef = ref(null);
const canvasRef = ref(null);
const previewImg = ref("");

function draw() {
  const options = {
    scale: window.devicePixelRatio,
  };

  return html2canvas(frisbeeRef.value, options)
}

async function onExportImg() {
  const canvasEl = await draw();

  const link = document.createElement('a')
  const event = new MouseEvent('click')
  link.download = 'sliced-gif.png';
  link.href = canvasEl.toDataURL("image/png", 1.0);
  link.dispatchEvent(event)
}

</script>

<template>
  <div class="animationPreview">
    <div class="wrapper">
      <div class="frisbeeWrapper">
        <div
          ref="frisbeeRef"
          class="frisbee"
          :class="animateClass"
          :style="animateStyle"
        >
          <div
            v-for="item in imgConfig"
            :key="item.url"
            class="quarterItem one"
            :style="item.outStyle"
          >
            <img
              class="cycle"
              :src="item.url"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@borderSize: 20px;
@frisbeeSize: 600px;

@circleSize: 110px;
@halfCircleSize: (@circleSize / 2);

.animationPreview{
  position: relative;
  height: 100%;
  overflow: hidden;
}
.wrapper {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  .frisbeeWrapper {
    padding: 40px;
    width: @frisbeeSize;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.4);
  }

  .canvas {
    width: @frisbeeSize;
    height: @frisbeeSize;
  }
}

.frisbee {
  margin: 0 auto;
  position: relative;
  width: @frisbeeSize;
  height: @frisbeeSize;
  border: @borderSize solid rgb(250, 220, 54);
  border-radius: 50%;
  animation-name: rolling;
  animation-duration: 0.05s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  box-sizing: border-box;
}

.stopAnimation {
  animation: none !important;
}

.tail {
  position: absolute;
  width: 200px;
  height: 200px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.cycle {
  position: absolute;
  width: @circleSize;
  height: @circleSize;
  border-radius: 50%;
}

.quarterItem {
  position: absolute;
  box-sizing: border-box;
  background: transparent;
  width: @circleSize;
  height: (@frisbeeSize / 2 - @borderSize);
  left: 50%;
  margin-left: (-1 * @halfCircleSize);
  transform-origin: 50% 100%;

  .cycle {
    top: 32px;
    background-size: cover;
    background-repeat: none;
  }
}

.green {
  background: green !important;
}

@keyframes rolling {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
