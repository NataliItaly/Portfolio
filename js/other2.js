import i18Obj from "./translate.js"

const selfScoreLines = [
    {text: 'Смена изображений в секции portfolio', score: 25, subs: [
        { text: 'при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием', score: 20},
        { text: 'кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными', score: 5},
    ]},
    {text: 'Перевод страницы на два языка', score: 25, subs: [
        { text: 'при клике по надписи ru англоязычная страница переводится на русский язык', score: 10},
        { text: 'при клике по надписи en русскоязычная страница переводится на английский язык', score: 10},
        { text: 'надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем', score: 5},
        
    ]},
    {text: 'Переключение светлой и тёмной темы. На страницу добавлен переключатель при клике по которому:', score: 25, subs: [
        { text: 'тёмная тема приложения сменяется светлой', score: 10},
        { text: 'светлая тема приложения сменяется тёмной', score: 10},
        { text: 'после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне)', score: 5},
    ]},
    {text: 'Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы', score: 5, subs: []},
    {text: 'Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике', score: 5, subs: []}

]

let totalScore = 0
let result = ''

selfScoreLines.forEach((item, i) => {
    totalScore += item.score
    result += `${i+1}. ${item.text} [+${item.score}]\n`
    if (item.subs) item.subs.forEach((subitem, j) => result += `  - ${subitem.text} +${subitem.score}\n`)
})
console.log(`Самооценка ${totalScore}/75`)
console.log(result)


const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const navItems = document.querySelectorAll('.nav-item')
const overlay = document.querySelector('.overlay')

const toggleHamburger = () => {
    hamburger.classList.toggle('open')
    nav.classList.toggle('open')
    overlay.classList.toggle('open')
}

hamburger.addEventListener('click', toggleHamburger)
overlay.addEventListener('click', toggleHamburger)
navItems.forEach(elem => elem.addEventListener('click', () => {
    toggleHamburger()
    overlay.classList.remove('open')
}))

function setActive (targetClass, targetElement) {    
    document.querySelectorAll(`.${targetClass}`).forEach(elem => elem.classList.remove(`${targetClass}-active`))
    targetElement.classList.add(`${targetClass}-active`)
}

function getLocalStorage() {
    if (localStorage.getItem('lang')) {        
        getTranslate(localStorage.getItem('lang'))        
    }
    if (localStorage.getItem('theme')) {
        setTheme(localStorage.getItem('theme'))
    }
    else {
        let theme = (window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark'
        localStorage.setItem('theme', theme)
        setTheme(theme)
    }
}

window.addEventListener('load', getLocalStorage)

const languageSwitches = document.querySelectorAll('.language-item')

function getTranslate(lang) {        
        localStorage.setItem('lang', lang)        
        document.querySelectorAll('[data-i18]').forEach(elem => {
            elem.classList.add('hidden')
            setTimeout(() => {
                elem.classList.remove('hidden')
                elem.textContent = i18Obj[lang][elem.dataset.i18]
            if (elem.placeholder) {
                elem.placeholder = i18Obj[lang][elem.dataset.i18]
                elem.textContent = ''
            }
            }, 500)
        })
        setActive('language-item', document.querySelector(`[data-language="${lang}"]`))
        document.querySelector('html').lang = lang
}

languageSwitches.forEach((langSwitch) => {
    langSwitch.addEventListener('click', () => getTranslate(langSwitch.dataset.language))    
})

function setTheme(theme) {
    document.documentElement.className = theme == 'light' ? 'theme-light' : 'theme-dark'
    localStorage.setItem('theme', theme)    
}

const themeSwitch = document.querySelector('.theme-switch')

themeSwitch.addEventListener('click', () => {
    setTheme(localStorage.getItem('theme') == 'dark' ? 'light' : 'dark') 
})

const buttons = document.querySelectorAll('button:not(.play-hover)')
buttons.forEach((elem) => elem.addEventListener('click', () => {
    elem.classList.add('pulse')
    setTimeout(() => elem.classList.remove('pulse'), 700)
}))

const portfolioItems = document.querySelectorAll('.portfolio-item')

function animateImages(images, season) {

    let t = 700;
    images.forEach((image, i) => {                
        if (image.classList.contains('bigger')) image.classList.remove('bigger')
        t += 200
        setTimeout(() => {
            image.classList.add('hidden')
            image.src = `./assets/images/${season}/${i+1}.jpg`
        }, t-200)
        setTimeout(() => {
            if (image.classList.contains('hidden')) image.classList.remove('hidden')
            image.classList.add('bigger')
        }, t)
        setTimeout(() => image.classList.remove('bigger'), t+t)
    } ) 
}

const portfolioButtons = document.querySelectorAll('.portfolio-btns button')
const portfolioImages = document.querySelectorAll('.portfolio-item')

async function preloadImages(season) {
    const images = []
    for (let i = 1; i < 6; i++) {
        let promise = new Promise((resolve, reject) => {
            let img = new Image()
            img.src = `./assets/images/${season}/${i+1}.jpg`
            img.onload = () => resolve(img)
        })
        images.push(await promise)
    }
    return images
}

function animate(elem, animation) {
    return new Promise(resolve => {
        const handleAnimationEnd = () => {
            elem.classList.remove(animation)
            resolve(elem)
        }
        elem.addEventListener('animationend', handleAnimationEnd, {once: true})
        elem.classList.add(animation)
    })
}

function delay(t) {
    return new Promise((resolve) => setTimeout(() => resolve(), t))
}

async function checkAnimation(elements, animations) {
    let progress = false
    do {
        for (let elem of elements) {
            for (let animation of animations) {
                progress = elem.classList.contains(animation)
                if (progress) {
                    let promise = new Promise(resolve => {
                        const handleAnimationEnd = () => {
                            elem.classList.remove(animation)
                            resolve(elem)
                        }
                    elem.addEventListener('animationend', handleAnimationEnd, {once: true})                                        
                    })
                    await promise
                }
            }
        }
    } while (progress)
    return progress
}

portfolioButtons.forEach((button) => button.addEventListener('click', async (event) => {
    setActive('portfolio-button', event.target)
    let t = 0;
    const delta = 100;
    await checkAnimation(portfolioImages, ['hidden', 'bigger'])
    portfolioImages.forEach(async (image, i) => {
        await delay(t+=delta)
        const preload = async () => image.src = `./assets/images/${event.target.dataset.season}/${i+1}.jpg`        
        await animate(image, 'hidden')
        await preload()        
        await animate(image, 'bigger')
    })  
}))
//--------css animation styles------------------
/* @keyframes hide-image {
        0% {opacity: 100; transform: scale(1);}
        30% {transform: scale(1.1);}
        100% {opacity: 0; transform: scale(0.5);}
    }

    .hidden {
        animation: hide-image .4s ease-in-out;
        opacity: 0;
    }

    @keyframes show-image {
        0% {transform: scale(1.3); opacity: 0;}
        70% {transform: scale(0.95); opacity: 90;}
        100% {transform: scale(1); opacity: 100;}
    }

    .bigger {
        animation: show-image .7s ease-in-out;
    } */


   
