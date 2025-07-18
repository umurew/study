import { intervalToDuration } from '/node_modules/date-fns'

const semesterEndDate = new Date(2025, 8, 8, 8); // September 8, 2025, 08.00.00

function calculateRemainingTime() {
    const todayDate = new Date();
    const duration = intervalToDuration({
        start: todayDate,
        end: semesterEndDate
    });

    var days , hours , minutes , seconds;

    if (duration.days) days = duration.days;
    else days = 0;

    if (duration.hours) hours = duration.hours;
    else hours = 0;

    if (duration.minutes) minutes = duration.minutes;
    else minutes = 0;

    if (duration.seconds) seconds = duration.seconds;
    else seconds = 0;

    let formattedDuration = `${days} gün, ${hours} saat, ${minutes} dakika ve ${seconds} saniye`;
    return formattedDuration;
};

function initializeTimer() {
    const elementId = "semester-end-timer";
    var element = document.getElementById(elementId);

    setInterval(() => {
        var remainingTime = calculateRemainingTime().toString();
        element.innerHTML = remainingTime;
    }, 1000);
};

document.addEventListener('DOMContentLoaded', (event) => {
    initializeTimer();

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    function loadCheckboxStates() {
        checkboxes.forEach(checkbox => {
            const checkboxId = checkbox.id;
            const isChecked = localStorage.getItem(checkboxId) === 'true';
            checkbox.checked = isChecked;
        });
    }

    function saveCheckboxState(event) {
        const checkbox = event.target;
        localStorage.setItem(checkbox.id, checkbox.checked);
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveCheckboxState);
    });

    loadCheckboxStates();
});