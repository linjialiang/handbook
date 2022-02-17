# jssdk 实现图片缩放

使用 jssdk 实现图片缩放和多图滑动

`previewImage` 组件不需要，通过 config 接口注入权限验证配置，直接就可以使用

```html
<!-- 引入最新的微信jssdk -->
<script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>

<script>
  let imgList = $('#img-parent').find('img');
  let imgsSrc = new Array();
  for (let k = 0, len = imgList.length; k < len; k++) {
    imgsSrc[k] = $('#img-parent').find('img').eq(k).attr('src');
  }
  $('#img-parent img').click(function () {
    wx.previewImage({
      current: $(this).attr('src'), // 当前显示图片的http链接
      urls: imgsSrc, // 需要预览的图片http链接列表[]像这种其实就是数组
    });
  });
</script>
```
