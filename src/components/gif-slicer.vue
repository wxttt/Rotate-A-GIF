<template>
  <div class="gifSlicer">
    <form class="fileInputWrapper">
      <label
        class="fileInputLabel"
        for="fileInput"
      >
        <input
          id="fileInput"
          ref="inputRef"
          accept=".gif"
          class="fileInput"
          type="file"
          @change="onFileChange"
        >
      </label>
      <div class="infoWrap">
        <span class="iconfont icon">&#xe664;</span>
        <p class="info">
          点击选择gif
        </p>
      </div>
    </form>
    
    <canvas
      ref="canvasRef"
      class="canvas"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { parseGIF, decompressFrames } from "gifuct-js";

const emit = defineEmits(['gif-sliced'])

const inputRef = ref(null)
const canvasRef = ref(null)
const imgSrc = reactive([])

function onFileChange(e, file) {
  var reader = new FileReader();

  reader.onload = function (e) {
    imgSrc.splice(0, imgSrc.length)
    const gif = parseGIF(e.target.result);
    const canvasEl = canvasRef.value;
    const frames = decompressFrames(gif, true);

    const ctx = canvasEl.getContext('2d');
    
    canvasEl.width = frames[0].dims.width;
    canvasEl.height = frames[0].dims.height;

    for(let i = 0; i < frames.length; i++){
      convertFrameToImg(canvasEl, ctx, frames[i]);
    }

    emit('gif-sliced', imgSrc);
  }

  function convertFrameToImg(canvasEl, ctx, frame){
    const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
    imageData.data.set(frame.patch)
    ctx.putImageData(imageData, 0, 0)

    imgSrc.push(canvasEl.toDataURL("image/png", 1.0))
  }
  reader.readAsArrayBuffer(inputRef.value.files[0]);
}
</script>

<style scoped lang="less">
@size: 140px;
@font-color: #606266;

.gifSlicer{
  position: relative;
  overflow: hidden;

  .fileInputWrapper{
    width: @size;
    height: @size;
    box-sizing: border-box;
    border-radius: 2px;
    overflow: hidden;
    border: 2px solid #eee;

    .infoWrap{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translate(0, -30%);
      pointer-events: none;
      .icon{
        font-size: 40px;
        color: #eee;
      }
      .info{
        font-size: 10px;
        color: @font-color;
      }
    }

    .fileInputLabel{
      display: block;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
    .fileInput{
      opacity: 0;
      width: 0;
      height: 0;
      cursor: pointer;
    }
  }

  .canvas{
    position: absolute;
    left: 10000px;
  }
}
</style>
