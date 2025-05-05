const MIN_PLAYERS = 2;
const CHOOSE_DELAY_MS = 1500;
const RESET_DELAY_MS = 1000;

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const description = document.getElementById('description');

const players = new Map();
let chosenPlayer;
const chosenPlayerAnimation = {
    startTime: 0,
    startValue: 0,
};

const colorNames = [
    'red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'grey', 'white',
];

const resizeCanvas = () => {
    canvas.width = Math.floor(window.innerWidth);
    canvas.height = Math.floor(window.innerHeight);
};
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const drawPlayer = (player) => {
    ctx.beginPath();
    ctx.strokeStyle = color(player.color);
    ctx.lineWidth = 10;
    ctx.arc(player.x, player.y, 50, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = color(player.color);
    ctx.arc(player.x, player.y, 35, 0, 2 * Math.PI);
    ctx.fill();
};

const easeOutQuint = (t) => 1 + --t * t * t * t * t;

const draw = (function () {
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (chosenPlayer !== undefined) {
            description.hidden = true;
            const player = players.get(chosenPlayer);
            drawPlayer(player);

            const {startTime, startValue} = chosenPlayerAnimation;
            const endValue = 90;
            const elapsed = Date.now() - startTime;
            const duration = RESET_DELAY_MS;
            const t = elapsed / duration;
            const value =
                t < 1
                    ? startValue - (startValue - endValue) * easeOutQuint(t)
                    : endValue;

            ctx.beginPath();
            ctx.fillStyle = color(player);
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.arc(player.x, player.y, value, 0, 2 * Math.PI);
            ctx.fill('evenodd');

            return t < 1;
        } else if (players.size > 0) {
            description.hidden = true;
            for (const player of players.values()) {
                drawPlayer(player);
            }
            return false;
        } else {
            description.hidden = false;
            return false;
        }
    };

    let running = false;
    const run = () => {
        if (draw()) {
            window.requestAnimationFrame(run);
        } else {
            running = false;
        }
    };
    return () => {
        if (!running) {
            window.requestAnimationFrame(run);
            running = true;
        }
    };
})();

const color = (index) => colorNames[index % colorNames.length];

const pickUnusedColor = () => {
    const alreadyChosenColors = Array.from(players.values()).map(
        (p) => p.color
    );
    let color = 0;
    while (alreadyChosenColors.includes(color)) {
        color++;
    }

    return color;
};

const addPlayer = (id, x, y) => {
    const color = pickUnusedColor();
    players.set(id, {x, y, color});
    draw();
};

const updatePlayer = (id, x, y) => {
    const player = players.get(id);
    if (player) {
        player.x = x;
        player.y = y;
        draw();
    }
};

const removePlayer = (id) => {
    players.delete(id);
    draw();
};

const choosePlayer = (function () {
    const choosePlayer = async () => {
        if (players.size < MIN_PLAYERS) return;

        try {
            const playerIds = Array.from(players.keys());

            const mode = localStorage.getItem('mode') || 'random';
            const level = localStorage.getItem('level') || 'easy';
            const aiPrompt = localStorage.getItem('aiPrompt') || '';

            const body = {
                playerIds: playerIds,
                gameOption: {
                    mode: mode.toUpperCase(),
                }
            };

            if (mode === 'task') {
                body.gameOption.taskLevel = level.toUpperCase(); // ("EASY", "SIMPLE", "HARD")
                
                if (aiPrompt) {
                    body.gameOption.prompt = aiPrompt;
                }
            }

            const apiUrl = 'http://10.93.150.1:8080/api/v1/start';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                console.error('Failed to choose player.');
                return;
            }

            const data = await response.json();

            const chosenId = data.choosenPlayerId;
            const player = players.get(chosenId);

            chosenPlayer = chosenId;
            chosenPlayerAnimation.startTime = Date.now();
            chosenPlayerAnimation.startValue = Math.max(
                player.x,
                canvas.width - player.x,
                player.y,
                canvas.height - player.y
            );


            window.chosenPlayer = chosenPlayer;

            playVictoryMusic();
            draw();
            if (navigator.vibrate) {
                navigator.vibrate([200, 100, 200]);
            }

            if (data.task) {
                const selectedPlayer = players.get(chosenPlayer);
                const playerColorName = colorNames[selectedPlayer.color];

                const taskWithColor = {
                    ...data.task,
                    playerColor: playerColorName
                };

                startTask(taskWithColor);
            }

        } catch (error) {
            console.error('Error choosing player:', error);
        }
    };

    let timeout;
    return () => {
        window.clearTimeout(timeout);
        if (chosenPlayer === undefined && players.size >= MIN_PLAYERS) {
            timeout = window.setTimeout(choosePlayer, CHOOSE_DELAY_MS);
        }
    };
})();

const reset = (function () {
    const reset = () => {
        chosenPlayer = undefined;
        players.clear();
        draw();
    };

    let timeout;
    return () => {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(reset, RESET_DELAY_MS);
    };
})();

document.addEventListener('pointerdown', (e) => {
    addPlayer(e.pointerId, e.clientX, e.clientY);
    choosePlayer();
});
document.addEventListener('pointermove', (e) => {
    updatePlayer(e.pointerId, e.clientX, e.clientY);
});
const onPointerRemove = (e) => {
    if (chosenPlayer === e.pointerId) {
        reset();
    } else {
        removePlayer(e.pointerId);
        choosePlayer();
    }
};
document.addEventListener('pointerup', onPointerRemove);
document.addEventListener('pointercancel', onPointerRemove);

// Prevent page from scrolling.
// Chrome on Android immediately cancels pointer events if the page starts to
// scroll up or down. Because of Chrome's hiding url bar, the page does actually
// scroll, even though the page content is not enough to cause scroll bars.
// Calling preventDefault on all touchmove events helps here, but feels like a
// hack. Would be nice to find a better solution.
document.addEventListener(
    'touchmove',
    (e) => {
        e.preventDefault();
    },
    {passive: false}
);

if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((err) => {
            console.warn('ServiceWorker registration failed: ', err);
        });
    });
}

// Экспортируем функции и для других модулей
window.removePlayer = removePlayer;
window.players = players;
window.chosenPlayer = chosenPlayer;

