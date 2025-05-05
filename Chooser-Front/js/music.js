const backgroundMusic = document.getElementById("background-music");
const victoryMusic = document.getElementById("victory-music");
const musicToggle = document.getElementById("background-music-toggle");

const startBackgroundMusic = (time) => {
    backgroundMusic.currentTime = time
    backgroundMusic.play().catch((err) => {
        console.error("Не удалось воспроизвести фоновую музыку:", err);
    });
};

const playVictoryMusic = () => {
    let stoppedTime = backgroundMusic.currentTime
    stopBackgroundMusic();

    victoryMusic.play().catch((err) => {
        console.error("Не удалось воспроизвести музыку победы:", err);
    });

    victoryMusic.onended = () => {
        if (musicToggle.checked) {
            startBackgroundMusic(stoppedTime);
        }
    };
};

const stopBackgroundMusic = () => {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    console.log("Фоновая музыка остановлена.");
};

musicToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
        startBackgroundMusic(0);
    } else {
        stopBackgroundMusic();
    }
});
