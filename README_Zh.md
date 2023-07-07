# reosimgs

🌏 [English](https://github.com/Kori000/reosimgs/blob/main/README.md)

## 功能

- Tinymce 格式化 img 标签的 src、background-image 的 url

### 介绍

- Tinymce 版本支持: 5.0.4+
- 支持语言: 简体中文
- 仓库作者: Kori

### 使用

- 将本库文件夹 (reosimgs) 放到 TinyMCE 主目录下的 plugins 文件夹内

- 路径样例: **public/js/tinymce/plugins/reosimgs**

- 在你的组件页面中:

  - **fetch_new_src** 是获取新 src 的逻辑函数
  - 这个函数需要接收 **1 个** url 字符串
  - 需要返回 的 Promise 响应格式如下:

  ```json
  {
    "code": 200,
    "msg": "OK",
    "data": {
      "url": "https://newimgrul-asdads21321321asxasx.png"
    }
  }
  ```

## 初始化

```js
 initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#tinymceId`,
        plugins: 'reosimgs',
        toolbar: [
          'reosimgs'
        ],
        width: '100%',
        fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 26px 36px 48px 56px',
        statusbar: false,
        async fetch_new_src(src) {
          return fetch('http://xxxx.com/api/save/image', {
            body: JSON.stringify({ url: src }),
            method: 'POST',
            'Content-Type': 'application/json'
          })
            .then((response) => {
              return response.json()
            })
            .catch((error) => {
              console.error('Failed to fetch image:', error)
              throw error
            })
        },
      })
    },
```
