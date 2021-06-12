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
const a = document.getElementById("container");
console.log(a);
a.innerHTML = "asd";

function loadItem(container, text) {
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
}

// loadItem(a, styleEditorContent[0]);
function getStyleEl() {
  let newStyle = document.createElement('style')
  let head = document.querySelector('head')
  head.appendChild(newStyle)
  let allStyle = document.querySelectorAll('style')

  return allStyle[allStyle.length - 1]
}

function handleStyle(style, el) {
  el.innerHTML = style
}

let code
switch (type) {
  case 'css':
    handleStyle(str, styleEl)
    code = Prism.highlight(str, Prism.languages.css)
    break
  case 'md':
    code = marked(str)
    break
}

function load(contents) {
  if (contents.length) {
    this.loadItem(a, contents[0]).then(
      new Promise(this.load(contents.slice(1)))
    );
  }
}

load(styleEditorContent);
