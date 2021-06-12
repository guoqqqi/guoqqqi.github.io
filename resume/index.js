const content = `
/* 
 * Hi，我是郭奇
 * 从去年开始学习 Web 前端
 * 最近发现了一个好玩的动态简历
 * 接下来先写一个 demo
 * 首先准备一些样式
 */

* {
  transition: all 1s;
}

body {
  background: #47484c;
}

pre {
  color: #fff;
  border: 1px solid #FFF;
}

/**
 * 颜色看起来好多了，但是有一些空
 * 接下来让它丰富一些
*/

#code:not(:empty) {
  overflow: auto;
  background: #525288;
  height: 45vh;
  width: 49%;
  font-size: 14px;
  padding: 1vw 0.5vw;
  box-shadow: -4px 4px 2px 0 rgba(0,0,0,0.3);
  white-space: pre-wrap;
  outline: 0;
  margin: 1vh 0.5vw;
}

/* 感受一下 3D 效果 */
#code {
  transform: rotate(360deg);
}

/* Cool! 接下来我需要一张新页面
   首先让我们将之前的页面移走
 */
#code {
  position: absolute;
  transform: translateX(95%);
}

/* 给代码加个高亮吧 */
.token.selector { 
  color: #690;
}
.token.property { 
  color: #905;
}

body {
  perspective: 1000px;
}

#code {
  transform: translateX(98.5%) rotateY(-10deg);
  transform-origin: right;
  height: 90vh !important;
}

/*
 * 这样我就可以创建我的新页面啦
 * 让我将它和现在的页面对称放到一起
 * 这样看起来像一本书一样
 */
`;

const contentPaper = `
  #paper{
    transform: rotateY(10deg);
    transform-origin: left;    
  }`;

writeCode("", content, () => {
  createPaper(() => {
    writeCode(content, contentPaper);
  });
});

// 动态输出代码
function writeCode(prefix, code, fn) {
  let domCode = document.querySelector("#code");
  console.log(document.querySelector("code"));
  domCode.innerHTML = prefix || "";
  let n = 0;
  let timerId = setInterval(() => {
    n++;
    domCode.innerHTML = Prism.highlight(
      prefix + code.substring(0, n),
      Prism.languages.css,
      "css"
    );
    styleTag.innerHTML = prefix + code.substring(0, n);
    domCode.scrollTop = domCode.scrollTop = domCode.scrollHeight;
    if (n >= code.length) {
      clearInterval(timerId);
      fn().call();
    }
  }, 30);
}

// 增加新容器
function createPaper(fn) {
  var paper = document.createElement("div");
  paper.id = "paper";
  document.body.appendChild(paper);
  fn.call();
}
