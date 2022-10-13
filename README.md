# tiptap-extension-image-upload

Image upload extension for tiptap, support image preview.

[中文readme](./README.zh.md)

## Introduction

Upload support:

- File type data upload (such as the image selected by input:file)
- Image drop handling
- Screenshot in the clipboard
- Third party pictures in the clipboard (the image url will be read and converted to File)

Image preview（.image-placeholder）：

- The base64 of the image is used as the preview by default

## Instalation

`npm i tiptap-extension-image-upload -S`

## Usage

Add it as any extension in `useEditor()`

```ts
import { ImageUploadExtension, ImagePlaceholder } from 'tiptap-extension-image-upload'

  extensions: {
    ImageUploadExtension.configure({
      acceptMimes: ['image/jpeg', 'image/gif', 'image/png', 'image/jpg'],
      upload: (file: File, id: string) => {
        // your upload ajax
        return Promise.resolve('https://avatars.githubusercontent.com/u/112541088')
      },
    }),
    ImagePlaceholder.configure({
      inline: false
    }),
```

### ImageUploadExtension Configuration

```ts
export interface ImageUploaderPluginOptions {
  /** Image types allowed to upload */
  acceptMimes: string[];
  /**
   * Image File upload function
   * @param {File} file - File waiting to be uploaded
   * @param {string} id - Automatically generated unique key
   */
  upload(file: File | string, id: string): Promise<string>;
}
```
