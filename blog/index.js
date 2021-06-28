const R = document.getElementById("clickRight");
const L = document.getElementById("clickLeft");
const List = document.getElementById("cardList");
const Length = List.querySelectorAll("div .footer-card");

let i = 0;
R.onclick = () => {
  if (i < Length.length - 1) {
    i += 1;
    List?.setAttribute("style", `transform: translateX(calc(-${i} * (370px)))`);
  }
};

L.onclick = () => {
  if (i > 0) {
    i -= 1;
    List?.setAttribute("style", `transform: translateX(calc(-${i} * (370px)))`);
  }
};
