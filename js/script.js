const $ = (e) => document.querySelector(e);
let theme;
const btnTheme = $('#btn-theme');
const sunTheme = $('.icon-tabler-sun');
const moonTheme = $('.icon-tabler-moon');
const currentTheme = localStorage.getItem('theme');

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