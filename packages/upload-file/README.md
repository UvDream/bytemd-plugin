# bytemd 上传文件插件

```js
import { Editor } from "bytemd";
import UploadFile from "bytemd-plugin-uploadFile";

new Editor({
  target: document.body,
  props: {
    plugins: [
      UploadFile(),
      // ... other plugins
    ],
  },
});
```
