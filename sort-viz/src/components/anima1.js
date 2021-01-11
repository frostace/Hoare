const algo0LastFrameNums = this.animationNumsAlgo0[lengthAlgo0Anima - 1][
    "nums"
];
const algo0LastFrame = () => {
    if (this.getChartBusy && localIterNum === this.iterNum) {
        if (this.chartAlgo0 != null) this.chartAlgo0.remove();
        this.renderChart(algo0LastFrameNums, null, "#algo0");
        // this.animationNumsAlgo0 = [];
        this.releaseAlgo0();
    } else return;
};
const algo0Frame = timestamp => {
    // base case
    if (this.animationNumsAlgo0.length === 0) {
        window.requestAnimationFrame(algo0LastFrame);
        return;
    }
    // control fps according to getAnimationDuration
    if (startTimeStamp1 === undefined) {
        startTimeStamp1 = timestamp;
    }
    const elapsedTime = timestamp - startTimeStamp1;

    // render chart once per animationDuration
    if (elapsedTime > this.getAnimationDuration) {
        let animationFrame = this.animationNumsAlgo0.shift();
        let iterationNums = animationFrame["nums"];
        let swapIndices = animationFrame["pointers"];
        if (this.getChartBusy && localIterNum === this.iterNum) {
            // compare local iter num with context iter num to prevent conflict calls of animation
            if (this.chartAlgo0 != null) this.chartAlgo0.remove();
            this.renderChart(iterationNums, swapIndices, "#algo0");
        } else return;

        // clear startTimeStamp1
        startTimeStamp1 = undefined;
    }

    window.requestAnimationFrame(algo0Frame);
};
window.requestAnimationFrame(algo0Frame);
