//пузырьки при нажатии кнопки

/*// ***** Fancy button animation *****

const animatedButtons = document.querySelectorAll('.button-animation');

animatedButtons.forEach((elem) => {
  elem.addEventListener('click', () => {
    let buttonPressed = event.target;
    buttonPressed.preventDefault;
    buttonPressed.classList.remove('animate');
    buttonPressed.classList.add('animate');
    setTimeout (() => {
      buttonPressed.classList.remove('animate');
    }, 690);
  })
});
 */
const animatedBtn = document.querySelectorAll(".season-btn");
/* animatedBtn.forEach((elem) => {
    elem.addEventListener('click', (event) => {
      let buttonPressed = event.target;
      buttonPressed.preventDefault;
      buttonPressed.classList.remove('animate');
      buttonPressed.classList.add('animate');
      setTimeout (() => {
        buttonPressed.classList.remove('animate');
      }, 690);
    })
  }); */

// ---------photo camera come and flASH animation----------
/*
.big-button__cameraSvg{
    position: absolute;
    left:-100px;
    top: 3px;
    width: 45px;
    height: 45px;
    background-image: url("../assets/svg/photo-camera.svg");
    background-repeat: no-repeat;
    background-position: cover;
    z-index: 3;
    transition: left .7s ease-in;
    -webkit-transition: left .7s ease-in;
    -moz-transition: left .7s ease-in;
    -ms-transition: left .7s ease-in;
    -o-transition: left .7s ease-in;
    filter:invert(50%);
    -webkit-filter:invert(50%);
}

.big-button__animateText{
    position: absolute;
    white-space:nowrap;
    transition: transform 0.7s ease-in, left .7s ease-in;
    -webkit-transition: transform 0.7s ease-in, left .7s ease-in;
    -moz-transition: transform 0.7s ease-in, left .7s ease-in;
    -ms-transition: transform 0.7s ease-in, left .7s ease-in;
    -o-transition: transform 0.7s ease-in, left .7s ease-in;
}
.big-button__flash{
    position: absolute;
    top: 8px;
    left: 80px;
    background-image: url("../assets/svg/flash.svg");
    background-position: center;
    background-size: 20px;
    width: 20px;
    height: 20px;
    filter: invert(100%);
    z-index: 4;
    transition: transform 0.1s ease-in;
    -webkit-transition: transform 0.1s ease-in;
    -moz-transition: transform 0.1s ease-in;
    -ms-transition: transform 0.1s ease-in;
    -o-transition: transform 0.1s ease-in;
} */

//-----------splash from mouse over-------------------

var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};

var bubblyButtons = document.getElementsByClassName("bubbly-button");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("mouseover", animateButton);
}
