# MarkDown 基本标记

MarkDown 基本语法非常简洁，下面是通用的标记语法

## 标题

在行首使用 `#` + `空格` 可表示 1-6 级标题

::: details 写法

```md
# 一级标题

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题
```

:::

::: details 预览

<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>

:::

::: tip 提示
标题使用 1 个空行与其它标记区分：

-   标题前后，均需 1 个空行隔开；
-   标题在首行：前面空行可以省略；
-   标题在行尾：后面空行可以省略。

:::

## 段落

Markdown 段落没有特殊的格式，直接编写文字就好

::: details 写法

```md{3}
第 1 个段落：Markdown 是一种常见的标记语言，可以帮助用户快速排版文档

第 2 个段落：Markdown 易学易用，不限于编程人员，上班族也可以快速掌握

第 3 个段落：Markdown 支持代码高亮，可以帮助编程人员写出更直观的开发文档
```

:::

::: details 预览

第 1 个段落：Markdown 是一种常见的标记语言，可以帮助用户快速排版文档

第 2 个段落：Markdown 易学易用，不限于编程人员，上班族也可以快速掌握

第 3 个段落：Markdown 支持代码高亮，可以帮助编程人员写出更直观的开发文档

:::

::: tip 提示

段落之间使用 1 个空行隔开，和标题类似：

-   段落前后，均需 1 个空行隔开；
-   段落在行首：前面空行可以省略；
-   段落在结尾：后面空行可以省略。

:::

## 样式处理

Markdown 可以进行简单的样式处理

-   文本样式

    Markdown 针对文本有 `斜体` `粗体` `删除线` 几个变体，它们可以相互组合

    ::: details 写法

    ```md
    常规文本：everyone can quickly master the basics of markdown

    _斜体文本：everyone can quickly master the basics of markdown_

    **粗体文本：everyone can quickly master the basics of markdown**

    ~~删除文本：everyone can quickly master the basics of markdown~~

    **~~粗体删除：everyone can quickly master the basics of markdown~~**

    _~~斜体删除：everyone can quickly master the basics of markdown~~_

    **_~~粗斜删除：everyone can quickly master the basics of markdown~~_**
    ```

    :::

    ::: details 预览
    常规文本：everyone can quickly master the basics of markdown

    _斜体文本：everyone can quickly master the basics of markdown_

    **粗体文本：everyone can quickly master the basics of markdown**

    ~~删除文本：everyone can quickly master the basics of markdown~~

    **~~粗体删除：everyone can quickly master the basics of markdown~~**

    _~~斜体删除：everyone can quickly master the basics of markdown~~_

    **_~~粗斜删除：everyone can quickly master the basics of markdown~~_**
    :::

    ::: tip 提示
    浏览器通常无法为中文字体渲染斜体效果
    :::

-   分隔线

    Markdown 可以在单独 1 行中使用 `3个连续的减号` 来实现分隔线

    ::: details 写法与预览

    ```md
    ---
    ```

    ***

    :::

## 区块

Markdown 区块在行首使用 `>` 加上 `1空格` ，然后写上若干连续的段落：

::: details 写法

```md
> 区块：指将若干连续的段落做 1 个关联
>
> 区块内的普通段落之间同样需要使用空行隔开
>
> 区块空行：与普通空行有所区别，空行的行首需要加上 `>` 符号

> 如果区块空行没有使用 `>` 符号，则会生成新的区块

> 区块内除了段落外还可以包含子区块
>
> > 子区块与区块内其它元素使用 `区块空行` 分开
> > 2 级区块：使用 2 个 `>加空白` 即，`> > `
> > 2 级区块空行：对应变成 `> >`
> >
> > > 3 级区块：使用 3 个 `>加空白` 即， `> > > `
> > > 3 级区块空行：对应变成 `> > >`
```

:::

::: details 预览

> 区块：指将若干连续的段落做 1 个关联
>
> 区块内的普通段落之间同样需要使用空行隔开
>
> 区块空行：与普通空行有所区别，空行的行首需要加上 `>` 符号

> 如果区块空行没有使用 `>` 符号，则会生成新的区块

> 区块内除了段落外还可以包含子区块
>
> > 子区块与区块内其它元素使用 `区块空行` 分开
> > 2 级区块：使用 2 个 `>加空白` 即，`> > `
> > 2 级区块空行：对应变成 `> >`
> >
> > > 3 级区块：使用 3 个 `>加空白` 即， `> > > `
> > > 3 级区块空行：对应变成 `> > >`

:::

## 列表
