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
const toTraslate = ['title', 'description', 'h1Index', 'h2Description', 'labelConsole', 'labelTest', 'creator', 'linkToCollection'];
const consoleRegex = $('#consola');
const testRegex = $('#test');
const contentTest = $('#contentTest');
const iconTest = $('#iconTest');
const iconCheck = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`
const iconX = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`
const iconAlert = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-alert-square-rounded"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>`

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

document.addEventListener('click', (e) => {
    if (menuLang.classList.contains('flex') && !menuLang.contains(e.target) && !btnLang.contains(e.target)) {
        menuLang.classList.remove('flex')
        menuLang.classList.add('hidden')    
    }
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

// Regular expressions
function validateRegex() {
    try {
        const regexContent = consoleRegex.textContent.trim()
        const regex = new RegExp(regexContent)

        if (regex.test(testRegex.value)) {
            contentTest.classList.remove('border-red-500', 'border-amber-500')
            contentTest.classList.add('border-green-500')
            iconTest.classList.remove('text-red-500', 'text-amber-500')
            iconTest.classList.add('text-green-500')
            iconTest.innerHTML = iconCheck
        } else {
            contentTest.classList.remove('border-green-500', 'border-amber-500')
            contentTest.classList.add('border-red-500')
            iconTest.classList.remove('text-green-500', 'text-amber-500')
            iconTest.classList.add('text-red-500')
            iconTest.innerHTML = iconX
        }
    } catch(error) {
        contentTest.classList.remove('border-green-500')
        contentTest.classList.add('border-amber-500')
        iconTest.classList.remove('text-green-500')
        iconTest.classList.add('text-amber-500')
        testRegex.setCustomValidity = 'Invalid regular expression'
        iconTest.innerHTML = iconAlert
    }
}

document.addEventListener('DOMContentLoaded', () => {
    validateRegex()
    testRegex.addEventListener('click', validateRegex)
    testRegex.addEventListener('input', validateRegex)
    testRegex.addEventListener('blur', validateRegex)
    consoleRegex.addEventListener('input', validateRegex)
    consoleRegex.addEventListener('blur', validateRegex)
})