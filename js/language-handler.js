// Language handling utilities
let currentLanguage = localStorage.getItem('language') || 'de';

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageText();
}

function updatePageText() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update select options for states
    const stateSelect = document.getElementById('state');
    if (stateSelect) {
        const currentValue = stateSelect.value;
        stateSelect.innerHTML = `<option value="">${currentLanguage === 'de' ? 'Bitte wählen...' : 'Please select...'}</option>`;
        Object.entries(translations[currentLanguage].states).forEach(([value, text]) => {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = text;
            stateSelect.appendChild(option);
        });
        stateSelect.value = currentValue;
    }
    
    // Update yes/no options
    const realEstateAgentSelect = document.getElementById('realEstateAgent');
    if (realEstateAgentSelect) {
        const currentValue = realEstateAgentSelect.value;
        realEstateAgentSelect.innerHTML = `
            <option value="no">${translations[currentLanguage].no}</option>
            <option value="yes">${translations[currentLanguage].yes}</option>
        `;
        realEstateAgentSelect.value = currentValue;
    }
}

// Initial translation
document.addEventListener('DOMContentLoaded', () => {
    updatePageText();
});
