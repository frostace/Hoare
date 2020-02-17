let arrSize = 10;
let arr = Array.from({
    length: arrSize
}, () => Math.floor(Math.random() * 1000));
let arrMax = Math.max(...arr);
let unit;
let w;
let canvasWidth, canvasHeight;
let callTime = 0;
let timeStep = 100;
let bkg_color;
let color1 = [255, 199, 44];
let color2 = [210, 39, 48];
let color_gap = color1.map(function(item, index) {
    // In this case item correspond to currentValue of array a, 
    // using index to get value from array b
    return color2[index] - item;
})

function color_interp(ratio) {
    return color1.map(function(item, index) {
        // In this case item correspond to currentValue of array a, 
        // using index to get value from array b
        return item + ratio * color_gap[index];
    })
}

function randomize() {
    arr = Array.from({
        length: arrSize
    }, () => Math.floor(Math.random() * 1000));
}

function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowWidth * 9 / 16;
    createCanvas(canvasWidth, canvasHeight);
    unit = windowWidth / (3 * arr.length + 1);
    w = unit * 2;
    // bkg_color = color(215, 210, 203);
    bkg_color = "black";
    initDisplay(arr);
    qsort(0, arr.length - 1);
}

// function iteration() {
//     for (var i = 0; i < arr.length; i++) {
//         if (arr[i] === 0) continue;
//         // arr[i]--;
//     }
//     // initDisplay(arr);
// }

function getRandomInt(lower, upper) {
    lower = Math.ceil(lower);
    upper = Math.floor(upper);
    return Math.floor(Math.random() * (upper - lower)) + lower; //The maximum is exclusive and the minimum is inclusive
}

function swap(i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    initDisplay();

    // delay(1000)
    // .then(() => {
    //     // let temp = arr[i];
    //     // arr[i] = arr[j];
    //     // arr[j] = temp;
    //     initDisplay();
    //     console.log(callTime, arr);
    // })
    // .catch((err) => console.error(err));

    // setTimeout((i, j) => {
    //     let temp = arr[i];
    //     arr[i] = arr[j];
    //     arr[j] = temp;
    //     initDisplay();
    //     console.log(callTime, arr);
    // }, callTime++ * timeStep);
}

// function delay(time) {
//     return new Promise((resolve, reject) => {
//         if (isNaN(time)) {
//             reject(new Error('delay requires a valid number of time'))
//         } else {
//             setTimeout(resolve, time);
//         }
//     });
// }

async function partition(l, r) {
    let i = l - 1;
    let pivot_idx = r;
    for (let j = l; j < r; j++) {
        if (arr[j] < arr[pivot_idx]) {
            // setInterval(() => swap(i + 1, j), 1000);
            await swap(i + 1, j);
            i++;
        }
    }
    // setInterval(() => swap(i + 1, pivot_idx), 1000);
    await swap(i + 1, pivot_idx);
    return i + 1;
}

async function qsort(l, r) {
    // implicit base case
    if (l < r) {
        pivot_idx = await partition(l, r);
        await qsort(l, pivot_idx - 1);
        await qsort(pivot_idx + 1, r);
    }
}

function initDisplay() {
    background(bkg_color);
    for (var i = 0; i < arr.length; i++) {
        let x = (1 + 3 * i) * unit;
        let h = arr[i] / arrMax * canvasHeight * 0.8;
        let y = canvasHeight - h;
        // let color = 'rgba(' + bar_color + ',' + (arr[i] / arrMax) + ')';
        let color = color_interp(arr[i] / arrMax);
        console.log(color);
        fill(color);
        noStroke();
        rect(x, y, w, h, w / 2, w / 2, 0, 0);
        // console.log(i, "x=", x, "y=", y, w, h)
    }
}

function draw() {
    // background(220);
    frameRate(30);
    // iteration();
    noLoop();
}