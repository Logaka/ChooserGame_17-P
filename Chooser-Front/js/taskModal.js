let taskModal, taskText, taskTimer;
let countdownInterval = null;
let currentSessionId = null;
let currentTask = null;
let taskResultCallback = null;

function initTaskModal() {
    const taskModalElement = document.getElementById('taskModal');

    taskModal = new bootstrap.Modal(taskModalElement);
    taskText = document.getElementById('taskText');
    taskTimer = document.getElementById('taskTimer');
    
    taskModalElement.addEventListener('hidden.bs.modal', stopTimer);
    
    // Инициализация кнопок для режима elimination
    document.getElementById('passedBtn').addEventListener('click', () => {
        handleTaskResult('PASSED');
    });
    
    document.getElementById('notPassedBtn').addEventListener('click', () => {
        handleTaskResult('NOT_PASSED');
    });
}

function startTask(taskData, sessionId, resultCallback) {
    if (!taskData || !taskData.text) return;
    
    currentTask = taskData;
    currentSessionId = sessionId;
    taskResultCallback = resultCallback;
    
    const playerColor = taskData.playerColor || "selected player";
    showTask(taskData.text, playerColor);
    
    // Показываем/скрываем кнопки elimination в зависимости от режима
    const eliminationMode = localStorage.getItem('elimination') === 'true';
    const buttonsContainer = document.getElementById('eliminationButtons');
    
    if (eliminationMode && buttonsContainer) {
        buttonsContainer.classList.remove('d-none');
    } else if (buttonsContainer) {
        buttonsContainer.classList.add('d-none');
    }
}

function handleTaskResult(result) {
    if (taskResultCallback) {
        taskResultCallback(result, currentSessionId);
    }
    
    taskModal.hide();
}

function showTask(task, playerColor) {
    const timerValue = parseInt(document.getElementById('timer').value, 10);

    taskText.textContent = task;
    document.getElementById('taskModalLabel').textContent = `Task for player: ${playerColor}`;

    startTimer(timerValue);
    taskModal.show();
}

function startTimer(duration) {
    let timeRemaining = duration;
    updateTimerText(timeRemaining);

    stopTimer();
    countdownInterval = setInterval(() => {
        timeRemaining -= 1;
        updateTimerText(timeRemaining);

        if (timeRemaining <= 0) {
            stopTimer();
            taskModal.hide();
        }
    }, 1000);
}

function stopTimer() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function updateTimerText(time) {
    taskTimer.textContent = `Timer: ${time} sec`;
}

document.addEventListener('DOMContentLoaded', () => {
    initTaskModal();
    window.startTask = startTask;
});
