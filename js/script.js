const $ = (e) => document.querySelector(e);
let theme;
const btnTheme = $('#btnTheme');
const sunTheme = $('.icon-tabler-sun');
const moonTheme = $('.icon-tabler-moon');
const currentTheme = localStorage.getItem('theme');
const btnLang = $('#btnLang');
const menuLang = $('#menuLang');
const btnLangEn = $('#btnLangEn');
const btnLangEs = $('#btnLangEs');
const toTraslate = ['title', 'description']

const iconCheck = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`

// Theme
if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}

btnTheme.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark')
    sunTheme.classList.toggle('hidden')
    moonTheme.classList.toggle('hidden')
    theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    localStorage.setItem('theme', theme)
})

// Languague
btnLang.addEventListener('click', () => {
    menuLang.classList.toggle('hidden')
    menuLang.classList.toggle('flex')
})

btnLangEn.addEventListener('click', () => {
    setLanguague('en')
})

btnLangEs.addEventListener('click', () => {
    setLanguague('es')
})

function setLanguague(lang) {
    [btnLangEn, btnLangEs].forEach(btn => {
        btn.classList.remove('active',)
        btn.innerHTML = btn.textContent.trim()
    })

    const activeLang = lang === 'en' ? btnLangEn : btnLangEs
    activeLang.classList.add('active')
    activeLang.innerHTML += iconCheck

    loadTranslations(lang)
    localStorage.setItem('languague', lang)
}

async function loadTranslations(lang) {
    const response = await fetch(`./lang/${lang}.json`)
    const translations = await response.json()

    toTraslate.forEach(id => {
        const element = $(`#${id}`)
        if (element) {
            element.textContent = translations[id]
        }
    })

    document.documentElement.lang = lang
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('languague') || 'en'
    setLanguague(savedLang)
})