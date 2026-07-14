function bubbleSort(arr) {
    const a = arr.slice();
    let iterations = 0;
    const steps = [];

    for (let i = 0; i < a.length - 1; i++) {
        let swapped = false;

        for (let j = 0; j < a.length - 1 - i; j++) {
            iterations++;
            let didSwap = false;

            if (a[j] > a[j + 1]) {
                const temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
                swapped = true;
                didSwap = true;
            }

            steps.push({ array: a.slice(), compared: [j, j + 1], swapped: didSwap });
        }

        if (!swapped) {
            break;
        }
    }

    return { array: a, iterations: iterations, steps: steps };
}

function selectionSort(arr) {
    const a = arr.slice();
    let iterations = 0;
    const steps = [];

    for (let i = 0; i < a.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < a.length; j++) {
            iterations++;

            if (a[j] < a[minIndex]) {
                minIndex = j;
            }

            steps.push({ array: a.slice(), compared: [minIndex, j], swapped: false });
        }

        if (minIndex !== i) {
            const temp = a[i];
            a[i] = a[minIndex];
            a[minIndex] = temp;
            steps.push({ array: a.slice(), compared: [i, minIndex], swapped: true });
        }
    }

    return { array: a, iterations: iterations, steps: steps };
}

function insertionSort(arr) {
    const a = arr.slice();
    let iterations = 0;
    const steps = [];

    for (let i = 1; i < a.length; i++) {
        const current = a[i];
        let j = i - 1;

        while (j >= 0 && a[j] > current) {
            iterations++;
            a[j + 1] = a[j];
            j--;
            steps.push({ array: a.slice(), compared: [j + 1, j + 2], swapped: true });
        }

        a[j + 1] = current;
        steps.push({ array: a.slice(), compared: [j + 1, j + 1], swapped: false });
    }

    return { array: a, iterations: iterations, steps: steps };
}