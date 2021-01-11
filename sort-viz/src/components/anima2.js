const algo1LastFrameNums = this.animationNumsAlgo1[lengthAlgo1Anima - 1][
    "nums"
];
const algo1LastFrame = () => {
    if (this.getChartBusy && localIterNum === this.iterNum) {
        if (this.chartAlgo1 != null) this.chartAlgo1.remove();
        this.renderChart(algo1LastFrameNums, null, "#algo1");
        // this.animationNumsAlgo0 = [];
        this.releaseAlgo1();
    } else return;
};
const algo1Frame = timestamp => {
    // base case
    if (this.animationNumsAlgo1.length === 0) {
        window.requestAnimationFrame(algo1LastFrame);
        return;
    }

    if (startTimeStamp2 === undefined) {
        startTimeStamp2 = timestamp;
    }

    const elapsedTime = timestamp - startTimeStamp2;

    // render chart once per animationDuration
    if (elapsedTime > this.getAnimationDuration) {
        let animationFrame = this.animationNumsAlgo1.shift();
        let iterationNums = animationFrame["nums"];
        let swapIndices = animationFrame["pointers"];
        if (this.getChartBusy && localIterNum === this.iterNum) {
            // compare local iter num with context iter num to prevent conflict calls of animation
            if (this.chartAlgo1 != null) this.chartAlgo1.remove();
            this.renderChart(iterationNums, swapIndices, "#algo1");
        } else return;

        // clear startTimeStamp2
        startTimeStamp2 = undefined;
    }
    window.requestAnimationFrame(algo1Frame);
};
window.requestAnimationFrame(algo1Frame);
