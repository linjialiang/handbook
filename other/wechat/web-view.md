# web-view

web-view 是承载网页的容器

会自动铺满整个小程序页面，个人类型的小程序暂不支持使用

官方文档地址: [web-view](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

## 基本使用

基本使用只需要在 `.wxml` 文件上使用

小程序需要对 src 属性值对应的域名开放白名单

```wxml
<!--index.wxml-->
<web-view src="https://baidu.com"></web-view>
```

## 分享使用

分享则需要处理多个文件：

- 小程序：`.wxml` 和 `.js/.ts` 文件

- 网页端：每个需要处理的页面都需要加入 jweixin-1.3.2.js 的对应配置

> 说明：本次案例只处理了分享标题，更多处理方式请查询： web-view 官方文档的 `相关接口 1`

### 网页端

每个需要处理的页面加入如下代码：

```html
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
<script type="text/javascript">
  let pageTitle = document.title ? document.title : ""; // 分享标题，根是在这里设置的
  // console.log(pageTitle);
  wx.miniProgram.postMessage({ data: { title: pageTitle } });
</script>
```

### 小程序端 wxml

wxml 页面还是非常简单，具体如下：

```html
<!--index.wxml-->
<web-view src="{{url}}" bindmessage="bindmessage"></web-view>
```

`{{url}}`说明：

- 用于获取 ts/js 文件里的 Page.data.url 参数值

`bindmessage`说明 :

```text
网页向小程序 postMessage 时，会在特定时机（小程序后退、组件销毁、分享）触发并收到消息。
e.detail = { data }，data是多次 postMessage 的参数组成的数组
```

### 小程序端 ts

这里以 ts 为例，js 的话，可以去网上转码一下

```ts
// index.ts
// 获取应用实例
const app = getApp<IAppOption>();
Page({
  data: {
    title: "分享时，默认标题",
    url: "web-view默认的src属性值",
    // 其它内容被省略...
  },
  onLoad(res) {
    // 启用分享菜单
    wx.showShareMenu({
      withShareTicket: true,
      // menus: ["shareAppMessage", "shareTimeline"],  // 分享朋友圈对web-view无效，官方说明
      menus: ["shareAppMessage"],
    });

    // 打开分享链接时，将获取到的url参数，设置为web-view的src属性值
    if (res.url && typeof res.url !== "undefined") {
      this.setData({
        // 这里设置data对象的 url 参数
        url: decodeURIComponent(res.url), // decodeURIComponent 转成正常的url地址
      });
    }
  },

  // 绑定在web-view上的事件，用于实时设置分享标题
  bindmessage(e: any) {
    // 接收web-view传递的参数
    const pageTitle = e.detail.data[e.detail.data.length - 1].title ? e.detail.data[e.detail.data.length - 1].title : "默认分享标题";

    this.setData({
      // 这里设置data对象的 title 参数
      //存储状态
      title: pageTitle,
    });
  },

  // 分享时要修改的数据，在这里设置
  onShareAppMessage(res) {
    let webViewUrlString: string = res.webViewUrl ? res.webViewUrl : "";
    return {
      title: this.data.title, // 设置分享标题为 title
      path: "/pages/index/index?url=" + encodeURIComponent(webViewUrlString), // encodeURIComponent 将url转成可传递的字符串
    };
  },
  // 其它内容被省略...
});
```

web-view 分享，你结合下微信官方的说明，按这个套路去处理，就能全部搞定
