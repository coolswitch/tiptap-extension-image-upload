# tiptap-extension-image-upload

tiptap 的图片上传扩展，支持图片预览或占位

## Introduction

上传支持：

- File数据上传（比如 input:file 选择的图片）
- 拖拽上传的文件
- 剪切板中的截图
- 剪切板中的第三方图片（会读取图片数据转为File）

图片预览或占位（.image-placeholder）：

- 默认使用图片的 base64 做为预览

## Instalation

`npm i tiptap-extension-image-upload -S`

## Usage

添加在 `useEditor()` 的扩展中：

```ts
import { ImageUploadExtension, ImagePlaceholder } from 'tiptap-extension-image-upload'

  extensions: {
    ImageUploadExtension.configure({
      acceptMimes: ['image/jpeg', 'image/gif', 'image/png', 'image/jpg'],
      upload: (file: File, id: string) => {
        // 你的上传方法
        return Promise.resolve('https://avatars.githubusercontent.com/u/112541088')
      },
    }),
    ImagePlaceholder.configure({
      inline: false
    }),
```

ImageUploadExtension 配置项：

```ts
export interface ImageUploaderPluginOptions {
  /** 允许上传的图片类型 */
  acceptMimes: string[];
  /**
   * 图片上传方法
   * @param {File} file 待上传的文件
   * @param {string} id 自动生成的唯一key
   */
  upload(file: File | string, id: string): Promise<string>;
}
```

## Commands

```js
<input type="file" @change="onFileInputChoose" />

function onFileInputChoose({ target }) {
  const file = target.files[0]
  target.value = ''
  editor.commands.uploadImage({ file })
}
```
