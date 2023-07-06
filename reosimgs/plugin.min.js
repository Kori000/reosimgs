tinymce.PluginManager.add('reosimgs', function (editor, url) {
  var pluginName = '格式化所有图片为对象存储'
  window.reosimgs = {} //扔外部公共变量，也可以扔一个自定义的位置

  var baseURL = tinymce.baseURL
  var iframe1 = baseURL + '/plugins/reosimgs/upfiles.html'

  // img 标签待替换的图
  reosimgs.formatRes = []
  // background-image url() 待替换的图
  reosimgs.backgroundRes = []
  // 编辑器原始内容
  reosimgs.originContent = null
  // 是否正在上传
  reosimgs.isloading = false

  // 上传中
  reosimgs.showLoading = function showLoading(loadingDiv) {
    reosimgs.isloading = true
    loadingDiv.style.display = 'block'
  }
  // 隐藏上传中图标
  reosimgs.hideLoading = function hideLoading(loadingDiv) {
    reosimgs.isloading = false
    loadingDiv.style.display = 'none'
  }
  // 发送 {url:xxx} 对象到后端 换取新的 url
  reosimgs.fetch_new_src = editor.getParam('fetch_new_src', undefined, 'function')

  var openDialog = function () {
    return editor.windowManager.openUrl({
      title: pluginName,
      size: 'large',
      url: iframe1,
      buttons: [
        {
          type: 'cancel',
          text: 'Close'
        },
        {
          type: 'custom',
          text: 'save',
          name: 'formatSave',
          primary: true
        }
      ],
      onAction: function (api, details) {
        switch (details.name) {
          case 'formatSave':
            if (reosimgs.isloading) break
            if (!editor.originContent) {
              api.close()

              break
            }
            var imgs = reosimgs.formatRes
            let richContent = document.createElement('div')

            richContent.innerHTML = editor.originContent

            let imgElements = richContent.getElementsByTagName('img')

            for (let i = 0; i < imgElements.length; i++) {
              const oldSrc = imgElements[i].getAttribute('src')
              const newSrc = imgs[i].url
              imgElements[i].setAttribute('src', newSrc)
            }
            const newHtml = richContent.innerHTML

            // 开始替换 backgroud-image 的 url

            let resHtml = replaceBackgroundImageURL(newHtml)

            editor.setContent(resHtml)
            reosimgs.formatRes = []
            reosimgs.backgroundRes = []
            reosimgs.originContent = null

            api.close()

            break
          default:
            break
        }
      }
    })
  }

  function replaceBackgroundImageURL(text) {
    // var pattern = /background-image:\s*url\(['"](.*?)['"]\)/g
    var pattern = /background-image:\s*url\('(.*?)'\)/g
    var result = text.match(pattern)
    if (result) {
      for (var i = 0; i < result.length; i++) {
        var url = result[i].match(/url\('(.*?)'\)/)[1]
        text = text.replace(url, reosimgs.backgroundRes[i].url)
      }
    }
    return text
  }

  editor.ui.registry.getAll().icons.reosimgs ||
    editor.ui.registry.addIcon(
      'reosimgs',
      '<svg t="1688633633765" width="34" height="34" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5907" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M768 465.450667V257.194667H256v286.848l135.637333-139.349334a20.906667 20.906667 0 0 1 30.165334 0l89.173333 91.648c-11.562667 8.704-21.333333 19.882667-28.458667 32.768l-75.818666-77.952L256 606.037333v89.6h216.021333v43.818667H234.666667c-11.776 0-21.333333-9.813333-21.333334-21.930667V235.264C213.333333 223.146667 222.890667 213.333333 234.666667 213.333333h554.666666c11.776 0 21.333333 9.813333 21.333334 21.930667v241.152h-24.917334L768 465.450667z m-42.666667 98.645333h-112c-32.426667 0-58.666667 26.965333-58.666666 60.288v54.784h-42.666667v-54.784c0-57.514667 45.354667-104.106667 101.333333-104.106667H725.333333v-18.901333c0-1.493333 0.384-2.986667 1.109334-4.266667a8.192 8.192 0 0 1 11.392-3.114666l68.693333 40.746666a8.704 8.704 0 0 1 0 14.805334l-68.693333 40.746666a8.149333 8.149333 0 0 1-4.181334 1.152 8.448 8.448 0 0 1-8.32-8.533333v-18.816z m-85.333333 175.36h112c32.426667 0 58.666667-26.965333 58.666667-60.288v-54.784h42.666666v54.784c0 57.514667-45.354667 104.106667-101.333333 104.106667H640v18.816c0 4.736-3.712 8.576-8.32 8.576a8.149333 8.149333 0 0 1-4.181333-1.152l-68.693334-40.746667a8.704 8.704 0 0 1 0-14.805333l68.693334-40.746667a8.192 8.192 0 0 1 11.392 3.114667c0.725333 1.28 1.109333 2.773333 1.109333 4.266666v18.858667zM597.333333 301.013333h85.333334v43.861334h-85.333334V301.013333z" fill="#000000" fill-opacity=".7" p-id="5908"></path></svg>'
    )

  editor.ui.registry.addButton('reosimgs', {
    icon: 'reosimgs',
    tooltip: pluginName,
    onAction: function () {
      openDialog()
    }
  })
  editor.ui.registry.addMenuItem('reosimgs', {
    icon: 'reosimgs',
    text: '格式化所有图片为对象存储',
    onAction: function () {
      openDialog()
    }
  })
  return {
    getMetadata: function () {
      return {
        name: pluginName,
        url: 'http://tinymce.ax-z.cn/more-plugins/reosimgs.php'
      }
    }
  }
})
