# reosimgs

👀 [中文文档](https://github.com/Kori000/reosimgs/blob/main/README_Zh.md)

## Feature

- Tinymce Plugin - Format img tag src, background-image url

### Description

- Tinymce version support: 5.0.4+
- Supported language: Simplified Chinese
- Repo Author: Kori

### Usage

- Put this repo folder(reosimgs) in the plugins folder under the TinyMCE home directory

- Example path: **public/js/tinymce/plugins/reosimgs**

- In your component page:

  - **fetch_new_src** is get new src logic function

    - This function takes **a** url string
    - Need return this Promise response for example:

    ```json
    {
      "code": 200,
      "msg": "OK",
      "data": {
        "url": "https://newimgrul-asdads21321321asxasx.png"
      }
    }
    ```

## Init

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
