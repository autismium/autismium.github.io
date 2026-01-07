let currentLanguage = localStorage.getItem('language') || 'ru';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    updateContent();
}

function updateContent() {
    const t = translations[currentLanguage];
    
    // Обновляем title
    document.title = t.title;
    
    // Обновляем элементы с data-i18n атрибутом
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    // Обновляем атрибуты (alt, placeholder и т.д.)
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
        const attr = element.getAttribute('data-i18n-attr');
        const key = element.getAttribute('data-i18n-key');
        if (t[key]) {
            element.setAttribute(attr, t[key]);
        }
    });
    
    // Обновляем списки
    const featureList = document.querySelector('#features ul');
    if (featureList) {
        featureList.innerHTML = `
            <li>${t.feature1}</li>
            <li>${t.feature2}</li>
            <li>${t.feature3}</li>
            <li>${t.feature4}</li>
        `;
    }
    
    // Обновляем активную кнопку языка
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    
    // Обработчики для переключателя языка
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
});
