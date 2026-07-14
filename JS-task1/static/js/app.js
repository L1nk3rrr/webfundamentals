const MAX_SIZE = 30;
const MIN_SIZE = 2;
const MAX_VALUE = 100;
const STEP_DELAY_MS = 80;

const sizeInput = document.getElementById("arraySize");
const generateBtn = document.getElementById("generateBtn");
const chartContainer = document.getElementById("chartContainer");
const emptyStateText = document.getElementById("emptyStateText");

const statIterations = document.getElementById("statIterations");
const statTime = document.getElementById("statTime");
const statAlgorithm = document.getElementById("statAlgorithm");

const sortButtons = document.querySelectorAll(".js-sort-btn");

let currentArray = [];
let isAnimating = false;

function randomArray(size) {
    const result = [];

    for (let i = 0; i < size; i++) {
        result.push(Math.floor(Math.random() * 99) + 1);
    }

    return result;
}

function renderBars(container, array, compared, swapped, done) {
    container.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.className = "sort-bar";
        bar.style.height = (array[i] / MAX_VALUE * 100) + "%";

        if (done) {
            bar.classList.add("sort-bar--done");
        } else if (compared && compared.indexOf(i) !== -1) {
            bar.classList.add(swapped ? "sort-bar--swapped" : "sort-bar--comparing");
        }

        const label = document.createElement("span");
        label.className = "sort-bar__value";
        label.textContent = array[i];
        bar.appendChild(label);

        container.appendChild(bar);
    }
}

function updateControlsState() {
    generateBtn.disabled = isAnimating;
    sortButtons.forEach(function (button) {
        button.disabled = isAnimating || currentArray.length === 0;
    });
}

function clampSize(value) {
    if (isNaN(value)) {
        return MIN_SIZE;
    }

    return Math.min(MAX_SIZE, Math.max(MIN_SIZE, value));
}

generateBtn.addEventListener("click", function () {
    const size = clampSize(parseInt(sizeInput.value, 10));
    sizeInput.value = String(size);

    currentArray = randomArray(size);
    renderBars(chartContainer, currentArray, [], false, false);

    statIterations.textContent = "—";
    statTime.textContent = "—";
    statAlgorithm.textContent = "—";
    emptyStateText.classList.add("d-none");

    updateControlsState();
});

function animateSteps(steps, finalArray) {
    isAnimating = true;
    updateControlsState();

    if (steps.length === 0) {
        renderBars(chartContainer, finalArray, [], false, true);
        isAnimating = false;
        updateControlsState();
        return;
    }

    let index = 0;

    const timer = setInterval(function () {
        const step = steps[index];
        renderBars(chartContainer, step.array, step.compared, step.swapped, false);
        index++;

        if (index >= steps.length) {
            clearInterval(timer);
            renderBars(chartContainer, finalArray, [], false, true);
            isAnimating = false;
            updateControlsState();
        }
    }, STEP_DELAY_MS);
}

sortButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (currentArray.length === 0 || isAnimating) {
            return;
        }

        const algorithm = button.dataset.algorithm;
        const sortFn = window[algorithm];

        const startTime = performance.now();
        const result = sortFn(currentArray);
        const endTime = performance.now();
        const elapsedMs = endTime - startTime;

        statIterations.textContent = result.iterations;
        statTime.textContent = elapsedMs.toFixed(3) + " ms";
        statAlgorithm.textContent = button.textContent.trim();

        animateSteps(result.steps, result.array);
    });
});

updateControlsState();