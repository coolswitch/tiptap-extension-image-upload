<template>
  <NodeViewWrapper class="image-placeholder" :class="{ inline: options.inline }">
    <div v-if="isImgErr" class="iconfont icon-tupian"></div>
    <img v-else-if="base64" :src="base64" @error="isImgErr = true" @load="onLoad" />
  </NodeViewWrapper>
</template>

<script setup>
import { computed, ref } from "vue";
import { NodeViewWrapper } from "@tiptap/vue-3";

const props = defineProps({
  node: { type: Object, required: true },
  extension: { type: Object, required: true },
});
// const attrs = computed(() => props.node.attrs);
const options = computed(() => props.extension.options);
const src = computed(() => props.node.attrs.src);
const base64 = ref("");
const isImgErr = ref(false);

if (typeof src.value === 'string') {
  base64.value = src.value;
} else {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(src.value);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  }).then((res) => {
    base64.value = res;
  });
}

function onLoad(e) {
  const imgW = e.target?.naturalWidth || e.target?.clientWidth || 0
  const maxW = document.querySelector('.ProseMirror').clientWidth
  props.updateAttributes({ width: imgW > maxW ? `${maxW}px` : undefined })
}
</script>

<style lang="scss">
##{$editorContainerId} {
  .image-placeholder {
    max-width: 100%;
    position: relative;
    width: fit-content;

    &.inline {
      display: inline-block;
    }

    &::before {
      content: "上传中...";
      position: sticky;
      width: 100%;
      top: 20%;
      left: 0;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      text-shadow: 2px 2px 14px #000;
      white-space: pre;
      display: block;
      line-height: 44px;
    }

    img {
      margin-top: -44px;
      max-width: 100%;
      opacity: 0.2;
    }
  }
}
</style>
