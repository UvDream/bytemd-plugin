# bytemd markdown 编辑器代码拷贝插件

## 示例

```typescript
import CodeCopy from '@uvdream/bytemd-plugin-code-copy';
 defaultOptions: [
        CodeCopy(),
        ...
      ],
```

## 参数

```typescript
export interface CopyCodeOptions {
  // 拷贝按钮文字
  copyText?: string;
  // 拷贝按钮Icon
  copyIcon?: string;
  // 主题
  theme?: string;
  // 拷贝成功事件
  copySuccess?: (text: string) => {};
  // 拷贝失败事件
  copyError?: () => {};
  // 拷贝附带版权说明
  copyright?: string;
}
```
