---
title: call、apply和bind的学习
date: 2022-01-08
categories:
    - js
tags:
    - js
sidebar: 'auto'
---

---

## theme: channing-cyan

### 前言

call、apply、bind 的作用是改变函数运行时 this 的指向，this 永远指向最后调用它的这个对象。关于 this 这里就不多说了，现在开始康康`call/apply/bind`

### 相似点

-   都是用来改变函数的 this 对象的指向的。
-   第一个参数都是 this 要指向的对象。
-   都可以利用后续参数传参。

```
var xw = {  name : "小王",gender : "男" age : 24, say : function() {console.log(this.name + " , " + this.gender + " ,今年" + this.age); }

  var xh = {  name : "小黄" ,gender : "女", age : 18 }

调用xw.say(); //这个简单 打印出：小王，男，今年24

那么如何用xw的say方法来显示xh的数据呢。这时候就可以用到call、apply、bind

xw.say.call(xh);  //这时打印的就是：  小黄，女，今年18

xw.say.apply(xh); //打印的 小黄，女，今年18

xw.say.bind(xh)(); //打印的  小黄，女，今年18
```

### 区别

-   这里 call 和 apply 的区别主要在于带参的形式，可以记住 apply 是以 array 数组形式调用，和 call 是...arg 形式，bind 和 call 一样；
-   使用时 bind 比 call 和 apply 调用多了(),所以 bind 返回函数需要自己再执行调用一次，而 bind 和 call 都是对函数的直接调用
    ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30e2f90f2b4e49108f1d36378faf03ae~tplv-k3u1fbpfcp-zoom-1.image)

### 自己使用 js 简单实现这个三个方法

call 实现

```
Function.prototype.mycall = function(obj,...arg){
  const fn = Symbol('test')
  obj[fn] = this
  obj[fn](...arg)
  delete obj[fn]
}
```

apply 实现

```
Function.prototype.myapply=function(obj,arg){
    const fn = Symbol('test')
    obj[fn] = this
    obj[fn](...arg)
    delete obj[fn]
}
```

bind 实现

```
Function.prototype.myBind = function(obj,...args){
   const Fn = this
   let fBind = function(...args2){
   const isNew = this instanceof fBind
   const context = isNew?this:Object(obj)
   return Fn.call(context,...args,...args2)
  }
   fBind.prototype = Object.create(Fn.prototype)
   return fBind
}
```

然后声明后试试
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4c5dac433f24599b1533679d3d6c117~tplv-k3u1fbpfcp-zoom-1.image)

### 后记

perfect! 一个人如果没有梦想，跟无忧无虑有什么区别呢？
