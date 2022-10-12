import { Extension } from '@tiptap/core'
// import { imageUploader } from 'prosemirror-image-uploader'
import { imageUploader, getPluginInstances } from './imageUploader'

export interface ImageUploaderPluginOptions {

  acceptMimes: string[];

  upload(file: File | string, id: string): Promise<string>;

  id(): string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    imageUploadExtension: {
      /** Add an image */
      uploadImage: (options: { file: File }) => ReturnType
    }
  }
}

export const ImageUploadExtension = Extension.create<ImageUploaderPluginOptions>({
  name: 'imageUploadExtension',

  addOptions() {
    return {
      id: () => Math.random().toString(36).substring(7),
      acceptMimes: ['image/jpeg', 'image/gif', 'image/png', 'image/jpg'],
      upload: () => Promise.reject('【ImageUploadExtension】参数 upload 为必填项'),
    }
  },

  addCommands() {
    return {
      uploadImage: options => ({ commands }) => {
        // commands.focus
        // var xx = new ClipboardItem({ 'image/png': options.file as Blob })
        // navigator.clipboard.write([xx])
        // navigator.clipboard.read()
        const plugin = getPluginInstances()
        plugin?.beforeUpload(options.file, -1)
        return true
      }
    }
  },

  addProseMirrorPlugins() {
    const options = this.options
    return [
      imageUploader(options)
    ]
  }
}) 
