---
title: vue开发扩展程序实践
date: 2022-01-08
categories:
    - vue
tags:
    - vue
sidebar: 'auto'
---

---

### **背景**

假如传统的方式，我们用 html js 的方式来开发，我们最终只要开发出这种结构的就可以

![微信截图_20211224154913.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cf7830dd4964d38bd1143f8b7e9bc65~tplv-k3u1fbpfcp-watermark.image?)
但是这种调试麻烦，开发效率低下，不符合现在数据驱动页面的方式，所以我们就用现在比较流行的 vue,react 等来开发扩展程序，下面 vue 来搭建讲述

### **一、首先搭建一个脚手架**

具体访问[vue-cli 官网](https://cli.vuejs.org/zh/guide/prototyping.html)

首先

1、vue create vue-extension

2、vue add chrome-ext（这个插件就是官方提供开发谷歌扩展程序的）

3、删除无用文件跟文件夹：src/main.js，public、src/components

**以上三步最终得到的工程结构如下**

![微信截图_20211224155158.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52c84d90f0d8401c96e3860b12cdcc1f~tplv-k3u1fbpfcp-watermark.image?)

### **二、运行环境**

![微信图片_20211224155443.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/603e56bf3a3d4434b77591f2aae22a98~tplv-k3u1fbpfcp-watermark.image?)
这条命令就会运行开发环境，对修改文件进行实时编译并自动在根目录下生成  `dist`  文件夹

接着我们谷歌浏览器加载

![微信截图_20211224155718.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be7d23fa31bf4d209796c41da6895805~tplv-k3u1fbpfcp-watermark.image?)
这样就可以在右侧的扩展程序栏看到

![微信图片_20211224155831.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/262d0906555548cab23d57f8b9f9b597~tplv-k3u1fbpfcp-watermark.image?)

### **三、与第三方 ui 组件的结合开发**

下面我们用 element-ui 来举例子

`npm install element-ui`
然后假如按需引入，要再执行

`npm install babel-plugin-component -D`

babel.config.js 文件的修改

![1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5792beb314df4e9f880463483ad48d97~tplv-k3u1fbpfcp-watermark.image?)

修改 src/popup/index.js

![2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2644466446bc44bf804b188b8a08a498~tplv-k3u1fbpfcp-watermark.image?)
这样我们就可以按需引入 element-ui 的组件，开发我们的扩展程序

接下来我们写个简单的例子

src/popup/App/App.vue

![7.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80c89053b05440d58776bad1c3557ffa~tplv-k3u1fbpfcp-watermark.image?)

效果如下

![微信截图_20211224194017.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00ab98bc94244e7fab29461dc2d9d596~tplv-k3u1fbpfcp-watermark.image?)

### **四、简单说下这个扩展程序的通信**

首先我们先了解下这个扩展程序的结构

#### 1、我们首先一眼看到的是 popup.html,然后这个页面的逻辑会生成 popup.js,就是控制我们看到的这个小窗口

#### 2、content.js 主要作用于浏览网页，对打开的网页进行插入、修改  `DOM` ，对其进行操作交互

#### 3、background 是一个常驻的页面，它的生命周期是插件中所有类型页面中最长的，它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在 background 里面

#### 4 ...

**等等**

然后就是现在 popup 页面的按钮，实现点击按钮，页面弹框，我们可以通过 popup.js 传到 content.js,再 content.js 向我们的页面发送。（先在 vue 工程建 src/content/index.js）

这个 content.js 必须配置 manifest.develpment.json 或者 manifest.production.json 配置，marches 属性具体配置域名才生效，现在以百度为例子

![微信截图_20211224163626.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08a67a1145604c46a18642df9255506e~tplv-k3u1fbpfcp-watermark.image?)

**怎么通信呢？这里也有几种方式**

1、chrome.runtime.sendMessage 可以实现 popup 这个来像这个 content.js 发送，并接收返回数据，例如

popup 先发送数据

![5.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e665d30e6674f6a9aacf5b37c9d199d~tplv-k3u1fbpfcp-watermark.image?)
content.js 接受数据

![6.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adb57516fe694aef867878c198ecd9ef~tplv-k3u1fbpfcp-watermark.image?)
这样我们就可以实现点击扩展程序的按钮，content.js 接受到了数据，向网页 alert 一条消息

2、通过 window.postMessage 实现通信

3、通过 background.js 收发 Message 实现通信

4、等等

后面几种通信方式，留给各位读者尝试

码字不易，望点赞支持，by:向 乾 看

### **五、参考列表**

[谷歌扩展程序文档](https://developer.chrome.com/docs/extensions/reference/)

[极客系列博客](https://www.cnblogs.com/champagne/p/)
