// import translate.js

import i18Obj from './translate.js';

// jquery variant, jquery library has to be linked

// $(document).ready(function() {
//   $('.hamburger, .nav-list').click(function(event) {
//     $('.hamburger, .nav').toggleClass('is-active');
//   });
// });

// First working variant as in a rs school task

// const hamburger = document.querySelector('.hamburger');
// const nav = document.querySelector('.nav');
// const navList = document.querySelector('.nav-list');

// function toggleMenu() {
//   hamburger.classList.toggle('is-active');
//   nav.classList.toggle('is-active');
// }

// function closeMenu() {
//   hamburger.classList.remove('is-active');
//   nav.classList.remove('is-active');
// }

// hamburger.addEventListener('click', toggleMenu);
// navList.addEventListener('click', closeMenu);

// Second working variant as in a rs school task

const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const navLinks = document.querySelectorAll('.nav-link')

function toggleMenu() {
  hamburger.classList.toggle('is-active')
  nav.classList.toggle('is-active')
}

hamburger.addEventListener('click', toggleMenu)
nav.addEventListener('click', closeMenu)
navLinks.forEach((el) => el.addEventListener('click', closeMenu))

function closeMenu(event) {
  if (event.target.classList.contains('nav-link')) {
    hamburger.classList.remove('is-active')
    nav.classList.remove('is-active')
  }
}

// Gallery

// Cache Images

const seasons = ['winter', 'spring', 'summer', 'autumn']

function preloadImages() {
  seasons.forEach(season => {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/gallery/${season}/${i}.jpg`
    }
  })
}
preloadImages()

// EventListener for season buttons

const portfolioImages = document.querySelectorAll('.portfolio-image')
const portfolioButtons = document.querySelectorAll('.portfolio-btn')

portfolioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const seasonButton = button.dataset.season

    portfolioImages.forEach((img, index) => img.src = `./assets/img/gallery/${seasonButton}/${index + 1}.jpg`)

    portfolioButtons.forEach((button) => {
      button.classList.remove('active-btn')
    })
    button.classList.add('active-btn')
  })
})

// Day-Night switcher

document.querySelector('.theme-toggle').addEventListener('click', (event) => {
  event.preventDefault()
  if (localStorage.getItem('theme') === 'light') {
    localStorage.removeItem('theme')
  } else {
    localStorage.setItem('theme', 'light')
  }
  addLightClassToHtml()
})

function addLightClassToHtml() {
  try {
    if (localStorage.getItem('theme') === 'light') {
      document.querySelector('html').classList.add('light')
      document.querySelector('html').classList.remove('dark')
      document.querySelector('.theme-toggle').classList.add('sun')
    } else {
      document.querySelector('html').classList.add('dark')
      document.querySelector('html').classList.remove('light')
      document.querySelector('.theme-toggle').classList.remove('sun')
    }
  } catch (err) {}
}

addLightClassToHtml()

// Language switcher

const navLanguages = document.querySelectorAll('.lang-link')
const langNodeList = document.querySelectorAll('[data-i18]')
let translation = {}
let langItemKeys = []
let chosenLang = ''

const getTranslate = (chosenLang) => {
  const translateCurrentLanguage = (langNodeList.forEach((currentElement) => {
    let langListItem = currentElement.dataset.i18
    translation = i18Obj[chosenLang][langListItem]

    if (currentElement.placeholder) {
      currentElement.placeholder = translation
    } else {
      currentElement.innerText = translation
    }
  }))
}

navLanguages.forEach((a) => {
  a.addEventListener('click', () => {
    chosenLang = a.dataset.lang
    getTranslate(chosenLang)

    localStorage.setItem('lang', chosenLang)

    navLanguages.forEach((a) => {
      a.parentElement.classList.remove('active-lang')
    })
    a.parentElement.classList.add('active-lang')
  })
})

//////////////// Set language to localStorage

// function setLocalStorage() {
//   localStorage.setItem('lang', chosenLang);
// }
// window.addEventListener('beforeunload', setLocalStorage)

//////////////// Take language from localStorage

function getLocalStorage() {

  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);

    if (lang === 'ru') {
      navLanguages.forEach((a) => {
        a.parentElement.classList.remove('active-lang')
      })
      document.getElementById('ru').classList.add('active-lang')
    }
  }
}
window.addEventListener('load', getLocalStorage)