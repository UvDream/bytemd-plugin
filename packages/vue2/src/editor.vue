<!--
 * @Author: wangzhongjie
 * @Date: 2021-08-09 15:50:53
 * @LastEditors: wangzhongjie
 * @LastEditTime: 2021-08-10 14:19:45
 * @Description: 编辑器
 * @Email: UvDream@163.com
-->
<template>
  <div></div>
</template>

<script>
import * as bytemd from "bytemd";

export default {
  name: "Editor",
  props: {
    value: String,
    plugins: Array,
    sanitize: Object,
    mode: String,
    previewDebounce: Number,
    placeholder: String,
    editorConfig: Object,
    locale: Object,
    uploadImages: Function,
    maxLength: Number,
  },
  mounted() {
    const editor = new bytemd.Editor({
      target: this.$el,
      props: this.$props,
    });
    editor.$on("change", (e) => {
      this.$emit("change", e.detail.value);
      editor.value = e.detail.value;
    });
    this.editor = editor;
  },
  watch: {
    $props: {
      handler(newValue, oldValue) {
        // TODO:
        const copy = { ...newValue };
        for (let k in copy) {
          if (copy[k] === undefined) {
            delete copy[k];
          }
        }
        this.editor.$set(copy);
      },
      deep: true,
    },
  },
};
</script>