let seasonButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");
  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

let winterBtn = document.querySelector(".winter");
let springBtn = document.querySelector(".spring");
let summerBtn = document.querySelector(".summer");
let autumnBtn = document.querySelector(".autumn");
let seasonBtn = document.querySelectorAll(".season-btn");

for (let i = 0; i < seasonBtn.length; i++) {
  seasonBtn[i].addEventListener("click", seasonButton, false);
}
