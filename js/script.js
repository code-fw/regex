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
const consoleRegex = $('#consola');
const testRegex = $('#test');
const contentTest = $('#contentTest');
const iconTest = $('#iconTest');
const messageTest = $('#messageTest');
const gridCollection = $('#gridCollection');
const iconCheck = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>`;
const iconX = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`;
const iconAlert = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-alert-square-rounded"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>`;
const iconCopy = `<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>`;

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

// Collection
async function loadCollection() {
    const response = await fetch('./js/collection.json')
    const collection = await response.json()
    let content = ''

    if (collection) {
        Object.keys(collection).forEach(key => {
            content += `
                <div id="${key}" class="col-auto rounded-lg flex flex-col">
                    <div class="px-3 py-2 rounded-t-lg bg-zinc-200/50 dark:bg-stone-900/50">
                        <h5 id="${key}Title" class="font-bold"></h5>
                        <p class="mb-0"><small id="${key}Description" class="text-xs"></small></p>
                    </div>
                    <div class="p-3 flex items-center justify-between gap-3 rounded-b-lg bg-white/90 dark:bg-stone-950/60">
                        <span class="font-mono text-zinc-950 text-nowrap overflow-hidden dark:text-zinc-50">/${collection[key]}/</span>
                        <button data-key="${key}" class="copy-btn text-black dark:text-white" title="Copy"><svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.8"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-copy"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg></button>
                    </div>
                </div>
            `
        })

        gridCollection.innerHTML = content

        gridCollection.addEventListener('click', (e) => {
            if (e.target.closest('.copy-btn')) {
                const btn = e.target.closest('.copy-btn')
                const key = btn.getAttribute('data-key')
                const regex = collection[key]
                navigator.clipboard.writeText(`/${regex}/`).then(() => {
                    btn.innerHTML = iconCheck
                    setTimeout(() => {
                        alert('Copied')
                    }, 500)
                    setTimeout(() => {
                        btn.innerHTML = iconCopy
                    }, 3500);
                }). catch(error => {
                    alert('Error')
                })
            }
        })
    } else {
        content += `
                <div class="col-span-full rounded-lg flex flex-col items-center justify-center p-5 md:p-9 lg:p-12 xl:p-16 rounded-lg bg-zinc-200/50 dark:bg-stone-900/50">
                    <h6 id="errorCollection" class="font-bold text-xl">Oops, an error occurred while loading the collection, please reload the page</h6>
                </div>
            `

        gridCollection.innerHTML = content
    }
}

document.addEventListener('DOMContentLoaded', loadCollection)

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

    if (translations.text) {
        Object.keys(translations.text).forEach(key => {
            const element = $(`#${key}`)
            if (element) {
                element.textContent = translations.text[key]
            }
        })
    } else {
        console.log('Error to translate');
    }

    if (translations.inner) {
        Object.keys(translations.inner).forEach(key => {
            const element = $(`#${key}`)
            if (element) {
                element.innerHTML = translations.inner[key]
            }
        })
    } else {
        console.log('Error to translate');
    }

    if (translations.collectionRegex) {
        Object.keys(translations.collectionRegex).forEach(key => {
            const title = $(`#${key} #${key}Title`)
            const description = $(`#${key} #${key}Description`)
            if (title || description) {
                title.textContent = translations.collectionRegex[key].title
                description.textContent = translations.collectionRegex[key].description
            }
        })
    } else {
        console.log('Error to translate');
    }

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
            messageTest.classList.add('opacity-0')
            contentTest.classList.remove('bg-red-500/30', 'bg-amber-500/30')
            contentTest.classList.add('bg-green-500/30')
            iconTest.classList.remove('text-red-500', 'text-amber-500')
            iconTest.classList.add('text-green-500')
            iconTest.innerHTML = iconCheck
        } else {
            messageTest.classList.add('opacity-0')
            contentTest.classList.remove('bg-green-500/30', 'bg-amber-500/30')
            contentTest.classList.add('bg-red-500/30')
            iconTest.classList.remove('text-green-500', 'text-amber-500')
            iconTest.classList.add('text-red-500')
            iconTest.innerHTML = iconX
        }
    } catch(error) {
        contentTest.classList.remove('bg-green-500/30')
        contentTest.classList.add('bg-amber-500/30')
        iconTest.classList.remove('text-green-500')
        iconTest.classList.add('text-amber-500')
        testRegex.setCustomValidity = 'Invalid regular expression'
        iconTest.innerHTML = iconAlert
        messageTest.classList.remove('opacity-0')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    validateRegex()
    testRegex.style.height = `${testRegex.scrollHeight}px`
    testRegex.addEventListener('input', () => {
        validateRegex();
        testRegex.style.height = `${testRegex.scrollHeight}px`
    })
    testRegex.addEventListener('click', validateRegex)
    testRegex.addEventListener('blur', validateRegex)
    consoleRegex.addEventListener('input', validateRegex)
    consoleRegex.addEventListener('blur', validateRegex)
})