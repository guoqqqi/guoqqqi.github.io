import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const resumeEditorContent = [
  `
# 张雨晨


## 项目及实习经历

### 思科实习生：软件定义云网 (Software-defined Cloud Network)

* 基于 NSO 控制器开发 IDC 与运营商网络协同自动化框架。
* 开发基于 Segment Routing 的广域网专线 QoS 调度系统。

### 实验室项目：面向远程医疗的SDN网络可靠性及安全研究 (Java)

* 基于 SDN 为数据中心远程医疗平台提供防火墙、DDoS 防御、QoS 保障、链路快速恢复、路由环路与黑洞检测能力。

### [React Gallery](https://shiningdan.github.io/react-gallery/) (点击链接试试吧)

* React 和 Webpack 制作的画廊应用效果

### [Animation Resume](https://shiningdan.github.io/react-animation-resume/) (点击链接试试吧)

* React 和 Webpack 制作的简历自动演示效果。


## 教育经历

1. **北京邮电大学 - 通信工程**             研究生

	* 校一等奖学金

2. **北京邮电大学 - 通信工程**             本科生

	* 连续三年国家励志奖学金（专业前 10 %）

## 其他

cet-6 (525)


## 博客

**GitHub: **https://github.com/ShiningDan
**Animation Resume: https://shiningdan.github.io/react-animation-resume/**

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/ShiningDan/react-animation-resume)，打造你自己的简历！`,
];

const styleEditorContent = [
  `/*
* Inspired by http://strml.net/
* 
* Hello, 我是张雨晨
*
* 我用 React 做了一份简易的动态简历
* 希望大家能够喜欢 :)
*/

/* 所以我们就开始吧！首先给所有元素加上过渡效果 */
* {
  -webkit-transition: all 1s;
  transition: all 1s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(222,222,222); background: #425261; 
}
/* 文字直接显示在页面上，没有任何装饰，真的人反人类呢！所以我们来给文字加点装饰吧~~ */
.styleEditor {
  position: fixed; left: 0; top: 0;
  background-color: #303030;
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 作为一个程序员，我们不可以太沉闷哦~~，给自己的代码加一点色彩吧 */
.token.comment{ color: #857F6B; font-style: italic; }
.token.selector{ color: #E86E75; }
.token.property{ color: #F78C6C; }
.token.punctuation{ color: #88DCFE; }
.token.function{ color: #82AAFF; }

/* 加一点 3D 效果，更加地酷炫 */
html{
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0; 
  -webkit-transition: none; 
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}
/* 不知道以上对代码框的修改你是否喜欢呢？ */

/* 接下来我给自己准备一个编辑器，用来存放我的简历内容 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh; 
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}

/* 好了，我开始写简历了 */
`,
  `
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 *           3          
 *           2          
 *           1          
 *          啦啦！
 */
`,
  `
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h1{
  display: block;
  width: 80px;
  margin: 0 auto;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor h3{
	display: inline-block;
	margin: 0.5em 0;
}
.resumeEditor a{
	color: #000;
}
.resumeEditor ul{
	list-style: none;
}
.resumeEditor ul>li::before {
	content: "•";
	margin-left: 1em;
	margin-right: 0.5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
/*
* I hope you enjoyed this.
*/
`,
];

const MyDetail: React.FC = () => {
  useEffect(() => {
    load(styleEditorContent);
  }, []);

  const loadItem = (container: any, text: any) => {
    let num = 0;
    let sum = text.length;
    let interval = 16;
    const startLoad = () => {
      setTimeout(() => {
        num += 1;
        if (num <= sum) {
          let str = text.substr(0, num);
          container.scrollTop = 100000;
          container.innerHTML = str;

          setTimeout(() => {
            startLoad();
          }, interval);
        }
      }, interval);
    };
    startLoad();
  };

  const load = (contents: any) => {
    const container = document.getElementById('container');
    console.log(container);
    if (contents.length) {
      loadItem(container, contents[0]);
    }
  };

  console.log(styleEditorContent.length, 'container');

  return (
    <>
      <div>123</div>
      <article className="container" id="container"></article>
    </>
  );
};

export default MyDetail;
