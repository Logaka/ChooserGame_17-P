const modeSelect = document.getElementById("mode");
const levelSelect = document.getElementById("level");
const timerInput = document.getElementById("timer");
const backgroundMusicToggle = document.getElementById("background-music-toggle");
const eliminationToggle = document.getElementById("elimination");

const toggleOptions = () => {
    const isRandomMode = modeSelect.value === "random";
    console.log("toggleOptions called, random mode:", isRandomMode);

    levelSelect.disabled = isRandomMode;
    timerInput.disabled = isRandomMode;

};

const timerConstraint = () => {
    if (timerInput.value > 100)
        timerInput.value = 100
}

const saveSettingsState = () => {
    localStorage.setItem('mode', modeSelect.value);
    localStorage.setItem('level', levelSelect.value);
    localStorage.setItem('timer', timerInput.value);
    localStorage.setItem('backgroundMusic', backgroundMusicToggle.checked);
    localStorage.setItem('elimination', eliminationToggle.checked);
    
    console.log('Настройки сохранены в localStorage:', {
        mode: modeSelect.value,
        level: levelSelect.value,
        timer: timerInput.value,
        elimination: eliminationToggle.checked
    });
};

const loadSettingsState = () => {
    if (localStorage.getItem('mode')) {
        modeSelect.value = localStorage.getItem('mode');
        levelSelect.value = localStorage.getItem('level');
        timerInput.value = localStorage.getItem('timer');
        backgroundMusicToggle.checked = localStorage.getItem('backgroundMusic') === 'true';
        eliminationToggle.checked = localStorage.getItem('elimination') === 'true';
        
        console.log('Настройки загружены из localStorage:', {
            mode: localStorage.getItem('mode'),
            modeSelectValue: modeSelect.value,
            elimination: eliminationToggle.checked
        });
    }
    toggleOptions();
};

document.addEventListener('DOMContentLoaded', () => {
    const settingsModal = document.getElementById('settingsModal');
    
    settingsModal.addEventListener('shown.bs.modal', () => {
        console.log('Модальное окно открыто, применяю текущие настройки');
        toggleOptions();
    });
});

levelSelect.addEventListener("change", saveSettingsState);
modeSelect.addEventListener("change",() => {
        toggleOptions();
        saveSettingsState();
});

window.addEventListener("load", loadSettingsState);

timerInput.addEventListener('input', () => {
    timerConstraint()
    saveSettingsState()
});

eliminationToggle.addEventListener("change", saveSettingsState);