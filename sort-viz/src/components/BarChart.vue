<template>
    <div id="canvas">
        <div class="section section-qsort">
            <p class="chart-title">Quick Sort</p>
            <svg id="qsort" class="svg svg-qsort" />
        </div>
        <div class="section section-mergesort">
            <p class="chart-title">Merge Sort</p>
            <svg id="mergesort" class="svg svg-mergesort" />
        </div>
        <div class="section section-insertionsort">
            <p class="chart-title">Insertion Sort</p>
            <svg id="insertionsort" class="svg svg-insertionsort" />
        </div>
    </div>
</template>

<script>
import * as d3 from "d3";
// import _ from "lodash";
import qsort from "../algos/qsort";
import mergesort from "../algos/mergesort";
import insertionsort from "../algos/bubblesort";
// import shellsort from "../algos/shellsort";
import { mapGetters, mapActions } from "vuex";
// import { start } from "repl";

export default {
    props: ["inputNums", "selectedAlgorithms"],
    data() {
        return {
            chart: null,
            chartQsort: null,
            chartMergesort: null,
            chartInsertionsort: null,
            palette: ["#caf0f8", "#00A6FB"],
            animationNumsQuickSort: [],
            animationNumsMergeSort: [],
            animationNumsInsertionSort: [],
            iterNum: 0
        };
    },
    computed: mapGetters([
        "getInitNums",
        "getChartBusy",
        "getInitNumsMax",
        "getAnimationDuration"
    ]),
    // watch: {
    //     nums: {
    //         immediate: true,
    //         handler: function(newNums, oldNums) {
    //             console.log("watcher triggered", newNums, oldNums);
    //         }
    //     }
    // },
    mounted() {
        // init all charts
        this.renderChart(this.getInitNums, null, "#qsort");
        this.renderChart(this.getInitNums, null, "#mergesort");
        this.renderChart(this.getInitNums, null, "#insertionsort");
    },
    methods: {
        ...mapActions([
            "releaseQsort",
            "releaseMergeSort",
            "releaseInsertionSort"
        ]),
        /**
         * A linear interpolator for hexadecimal colors
         * @param {Number} amount
         * @param {String} a
         * @param {String} b
         * @example
         * // returns #7F7F7F
         * lerpColor(0.5, '#000000', '#ffffff')
         * @returns {String}
         */
        lerpColor(amount, a = this.palette[0], b = this.palette[1]) {
            var ah = +a.replace("#", "0x"),
                ar = ah >> 16,
                ag = (ah >> 8) & 0xff,
                ab = ah & 0xff,
                bh = +b.replace("#", "0x"),
                br = bh >> 16,
                bg = (bh >> 8) & 0xff,
                bb = bh & 0xff,
                rr = ar + amount * (br - ar),
                rg = ag + amount * (bg - ag),
                rb = ab + amount * (bb - ab);

            return (
                "#" +
                (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0)
                    .toString(16)
                    .slice(1)
            );
        },
        resetAllCharts() {
            // clear current charts
            if (this.chartQsort != null) this.chartQsort.remove();
            if (this.chartMergesort != null) this.chartMergesort.remove();
            if (this.chartInsertionsort != null)
                this.chartInsertionsort.remove();
            // re-render charts with new data
            this.renderChart(this.getInitNums, null, "#qsort");
            this.renderChart(this.getInitNums, null, "#mergesort");
            this.renderChart(this.getInitNums, null, "#insertionsort");
        },
        resetAllAnimations() {
            this.animationNumsQuickSort = [];
            this.animationNumsMergeSort = [];
            this.animationNumsInsertionSort = [];
        },
        renderChart(nums, swapIndices = null, selector = "svg") {
            // Chart will be drawn here
            const body_width = d3.select("body")._groups[0][0].clientWidth;
            const svg_width = body_width > 450 ? 300 : 150;
            const svg_height = svg_width * 2;
            const margin = svg_width / 5;
            const chart_width = svg_width - 2 * margin;
            const chart_height = svg_height - 2 * margin;
            const arrayMax = this.getInitNumsMax;

            //  O                      y
            //   --------------------->
            //   |
            //   |
            //   |
            //   |
            //   \/
            // x

            const svg = d3
                .selectAll(selector)
                .attr("width", svg_width)
                .attr("height", svg_height);

            let chart;

            if (selector === "#qsort") {
                this.chartQsort = svg
                    .append("g")
                    .attr("transform", `translate(${margin}, ${margin})`);
                chart = this.chartQsort;
            } else if (selector === "#mergesort") {
                this.chartMergesort = svg
                    .append("g")
                    .attr("transform", `translate(${margin}, ${margin})`);
                chart = this.chartMergesort;
            } else if (selector === "#insertionsort") {
                this.chartInsertionsort = svg
                    .append("g")
                    .attr("transform", `translate(${margin}, ${margin})`);
                chart = this.chartInsertionsort;
            }

            const xScale = d3
                .scaleBand()
                .range([0, chart_height])
                .domain(nums.map((g, idx) => idx + 1))
                .padding(0.3);

            const yScale = d3
                .scaleLinear()
                .range([0, chart_width])
                .domain([0, arrayMax]);

            // chart.append("g").call(d3.axisLeft(xScale).ticks(_.maxBy(nums)));
            // chart.append("g").call(d3.axisTop(yScale));

            const barGroups = chart
                .selectAll("rect")
                .data(nums)
                .enter();
            barGroups
                .append("rect")
                .attr("class", (g, idx) => "bar" + idx)
                .attr("x", 0)
                .attr("y", (g, idx) => xScale(idx + 1))
                .attr("rx", xScale.bandwidth() / 3)
                .attr("height", xScale.bandwidth())
                .attr("width", g => yScale(g))
                .attr("fill", (g, idx) =>
                    swapIndices === null
                        ? this.lerpColor(g / arrayMax)
                        : swapIndices[idx]
                        ? "coral"
                        : this.lerpColor(g / arrayMax)
                );
        },
        startAnimation() {
            console.log("animation start");

            let nums = this.getInitNums;
            let localIterNum = ++this.iterNum;
            // TODO: simplify this command with wildcard *

            // get animation process synchronously
            this.animationNumsQuickSort = qsort([...nums], 0, nums.length - 1);
            this.animationNumsMergeSort = mergesort(
                [...nums],
                0,
                nums.length - 1
            );
            this.animationNumsInsertionSort = insertionsort([...nums]);

            let lengthQuickSortAnima = this.animationNumsQuickSort.length;
            let lengthMergeSortAnima = this.animationNumsMergeSort.length;
            let lengthInsertionSortAnima = this.animationNumsInsertionSort
                .length;

            let startTimeStamp1, startTimeStamp2, startTimeStamp3;

            // ========================================
            // ======= Async Ops for Qsort Viz ========
            // ========================================
            // iteratively render nums, pointers coral, others blue
            const qsortLastFrameNums = this.animationNumsQuickSort[
                lengthQuickSortAnima - 1
            ]["nums"];
            const qsortLastFrame = () => {
                if (this.getChartBusy && localIterNum === this.iterNum) {
                    if (this.chartQsort != null) this.chartQsort.remove();
                    this.renderChart(qsortLastFrameNums, null, "#qsort");
                    // this.animationNumsQuickSort = [];
                    this.releaseQsort();
                } else return;
            };
            const qsortFrame = timestamp => {
                // base case
                if (this.animationNumsQuickSort.length === 0) {
                    window.requestAnimationFrame(qsortLastFrame);
                    return;
                }
                // control fps according to getAnimationDuration
                if (startTimeStamp1 === undefined) {
                    startTimeStamp1 = timestamp;
                }
                const elapsedTime = timestamp - startTimeStamp1;

                // render chart once per animationDuration
                if (elapsedTime > this.getAnimationDuration) {
                    let animationFrame = this.animationNumsQuickSort.shift();
                    let iterationNums = animationFrame["nums"];
                    let swapIndices = animationFrame["pointers"];
                    if (this.getChartBusy && localIterNum === this.iterNum) {
                        // compare local iter num with context iter num to prevent conflict calls of animation
                        if (this.chartQsort != null) this.chartQsort.remove();
                        this.renderChart(iterationNums, swapIndices, "#qsort");
                    } else return;

                    // clear startTimeStamp1
                    startTimeStamp1 = undefined;
                }

                window.requestAnimationFrame(qsortFrame);
            };
            window.requestAnimationFrame(qsortFrame);

            // for (let i = 0; i < lengthQuickSortAnima; i++) {
            //     let iterationNums = this.animationNumsQuickSort[i]["nums"];
            //     let swapIndices = this.animationNumsQuickSort[i]["pointers"];
            //     setTimeout(() => {
            //         if (this.getChartBusy && localIterNum === this.iterNum) {
            //             // compare local iter num with context iter num to prevent conflict calls of animation
            //             if (this.chartQsort != null) this.chartQsort.remove();
            //             this.renderChart(iterationNums, swapIndices, "#qsort");
            //         } else return;
            //         // console.log(new Date().getSeconds(), iterationNums);
            //     }, i * this.getAnimationDuration);
            // }

            // // recover all rects to blue
            // setTimeout(() => {
            //     if (this.getChartBusy && localIterNum === this.iterNum) {
            //         if (this.chartQsort != null) this.chartQsort.remove();
            //         this.renderChart(
            //             this.animationNumsQuickSort[lengthQuickSortAnima - 1][
            //                 "nums"
            //             ],
            //             null,
            //             "#qsort"
            //         );
            //         this.animationNumsQuickSort = [];
            //         this.releaseQsort();
            //     } else return;
            // }, lengthQuickSortAnima * this.getAnimationDuration);

            // ========================================
            // ===== Async Ops for MergeSort Viz ======
            // ========================================
            const mergeSortLastFrameNums = this.animationNumsMergeSort[
                lengthMergeSortAnima - 1
            ]["nums"];
            const mergeSortLastFrame = () => {
                if (this.getChartBusy && localIterNum === this.iterNum) {
                    if (this.chartMergesort != null)
                        this.chartMergesort.remove();
                    this.renderChart(
                        mergeSortLastFrameNums,
                        null,
                        "#mergesort"
                    );
                    // this.animationNumsQuickSort = [];
                    this.releaseMergeSort();
                } else return;
            };
            const mergeSortFrame = timestamp => {
                // base case
                if (this.animationNumsMergeSort.length === 0) {
                    window.requestAnimationFrame(mergeSortLastFrame);
                    return;
                }

                if (startTimeStamp2 === undefined) {
                    startTimeStamp2 = timestamp;
                }

                const elapsedTime = timestamp - startTimeStamp2;

                // render chart once per animationDuration
                if (elapsedTime > this.getAnimationDuration) {
                    let animationFrame = this.animationNumsMergeSort.shift();
                    let iterationNums = animationFrame["nums"];
                    let swapIndices = animationFrame["pointers"];
                    if (this.getChartBusy && localIterNum === this.iterNum) {
                        // compare local iter num with context iter num to prevent conflict calls of animation
                        if (this.chartMergesort != null)
                            this.chartMergesort.remove();
                        this.renderChart(
                            iterationNums,
                            swapIndices,
                            "#mergesort"
                        );
                    } else return;

                    // clear startTimeStamp2
                    startTimeStamp2 = undefined;
                }
                window.requestAnimationFrame(mergeSortFrame);
            };
            window.requestAnimationFrame(mergeSortFrame);

            // for (let i = 0; i < lengthMergeSortAnima; i++) {
            //     let iterationNums = this.animationNumsMergeSort[i]["nums"];
            //     let swapIndices = this.animationNumsMergeSort[i]["pointers"];
            //     setTimeout(() => {
            //         if (this.getChartBusy && localIterNum === this.iterNum) {
            //             if (this.chartMergesort != null)
            //                 this.chartMergesort.remove();
            //             this.renderChart(
            //                 iterationNums,
            //                 swapIndices,
            //                 "#mergesort"
            //             );
            //         } else return;
            //         // console.log(new Date().getSeconds(), iterationNums);
            //     }, i * this.getAnimationDuration);
            // }

            // // recover all rects to blue
            // setTimeout(() => {
            //     if (this.getChartBusy && localIterNum === this.iterNum) {
            //         if (this.chartMergesort != null)
            //             this.chartMergesort.remove();
            //         this.renderChart(
            //             this.animationNumsMergeSort[lengthMergeSortAnima - 1][
            //                 "nums"
            //             ],
            //             null,
            //             "#mergesort"
            //         );
            //         this.animationNumsMergekSort = [];
            //         this.releaseMergeSort();
            //     } else return;
            // }, lengthMergeSortAnima * this.getAnimationDuration);

            // ========================================
            // ==== Async Ops for Insertion Viz =======
            // ========================================
            // iteratively render nums, swaping nums to be coral, normal nums to be blue
            const insertionSortLastFrameNums = this.animationNumsInsertionSort[
                lengthInsertionSortAnima - 1
            ]["nums"];
            const insertionSortLastFrame = () => {
                if (this.getChartBusy && localIterNum === this.iterNum) {
                    if (this.chartInsertionsort != null)
                        this.chartInsertionsort.remove();
                    this.renderChart(
                        insertionSortLastFrameNums,
                        null,
                        "#insertionsort"
                    );
                    // this.animationNumsQuickSort = [];
                    this.releaseInsertionSort();
                } else return;
            };
            const insertionSortFrame = timestamp => {
                // base case
                if (this.animationNumsInsertionSort.length === 0) {
                    window.requestAnimationFrame(insertionSortLastFrame);
                    return;
                }

                if (startTimeStamp3 === undefined) {
                    startTimeStamp3 = timestamp;
                }

                const elapsed = timestamp - startTimeStamp3;

                if (elapsed > this.getAnimationDuration) {
                    let animationFrame = this.animationNumsInsertionSort.shift();
                    let iterationNums = animationFrame["nums"];
                    let swapIndices = animationFrame["pointers"];
                    if (this.getChartBusy && localIterNum === this.iterNum) {
                        // compare local iter num with context iter num to prevent conflict calls of animation
                        if (this.chartInsertionsort != null)
                            this.chartInsertionsort.remove();
                        this.renderChart(
                            iterationNums,
                            swapIndices,
                            "#insertionsort"
                        );
                    } else return;

                    // clear startTimeStamp3
                    startTimeStamp3 = undefined;
                }
                window.requestAnimationFrame(insertionSortFrame);
            };
            window.requestAnimationFrame(insertionSortFrame);
            // for (let i = 0; i < lengthInsertionSortAnima; i++) {
            //     let iterationNums = this.animationNumsInsertionSort[i]["nums"];
            //     let swapIndices = this.animationNumsInsertionSort[i][
            //         "pointers"
            //     ];
            //     setTimeout(() => {
            //         if (this.getChartBusy && localIterNum === this.iterNum) {
            //             if (this.chartInsertionsort != null)
            //                 this.chartInsertionsort.remove();
            //             this.renderChart(
            //                 iterationNums,
            //                 swapIndices,
            //                 "#insertionsort"
            //             );
            //         } else return;
            //         // console.log(new Date().getSeconds(), iterationNums);
            //     }, i * this.getAnimationDuration);
            // }

            // recover all rects to blue
            // setTimeout(() => {
            //     if (this.getChartBusy && localIterNum === this.iterNum) {
            //         if (this.chartInsertionsort != null)
            //             this.chartInsertionsort.remove();
            //         this.renderChart(
            //             this.animationNumsInsertionSort[
            //                 lengthInsertionSortAnima - 1
            //             ]["nums"],
            //             null,
            //             "#insertionsort"
            //         );
            //         this.animationNumsInsertionSort = [];
            //         this.releaseInsertionSort();
            //     } else return;
            // }, lengthInsertionSortAnima * this.getAnimationDuration);
        } // end of startAnimation
    } // end of methods
};
</script>

<style lang="scss" scoped>
@import "../assets/var";

#canvas {
    background-color: $chart-bkg-color;
    // height: 600px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

p {
    margin-top: 15px;
}

.section {
    &:first-child p {
        transform: translate(-47px, 48px) rotate(-90deg);
        -ms-transform: translate(-47px, 48px) rotate(-90deg);
        -o-transform: translate(-47px, 48px) rotate(-90deg);
        -moz-transform: translate(-47px, 48px) rotate(-90deg);
        -webkit-transform: translate(-47px, 48px) rotate(-90deg);
    }
    &:last-child p {
        transform: translate(-66px, 48px) rotate(-90deg);
        -ms-transform: translate(-66px, 48px) rotate(-90deg);
        -o-transform: translate(-66px, 48px) rotate(-90deg);
        -moz-transform: translate(-66px, 48px) rotate(-90deg);
        -webkit-transform: translate(-66px, 48px) rotate(-90deg);
    }
    p {
        position: absolute; // cannot make position relative here, or the svg's cannot be aligned
        font-size: 16px;
        color: #888;
        // writing-mode: vertical-rl;
        transform: translate(-52px, 48px) rotate(-90deg);
        -ms-transform: translate(-52px, 48px) rotate(-90deg);
        -o-transform: translate(-52px, 48px) rotate(-90deg);
        -moz-transform: translate(-52px, 48px) rotate(-90deg);
        -webkit-transform: translate(-52px, 48px) rotate(-90deg);
        transform-origin: top right;
    }
    svg {
        -webkit-display: block;
        display: block;
        height: 100%;
    }
}

@media only screen and (max-width: 450px) {
    /* For mobile: */
    #canvas {
        display: flex;
        -webkit-display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 400px;
        .section {
            flex: 1;
            display: inline-block;
            transform: translate(25%, 0) rotate(90deg);
            -webkit-transform: translate(25%, 0) rotate(90deg);
            -moz-transform: translate(25%, 0) rotate(90deg);
            -o-transform: translate(25%, 0) rotate(90deg);
            -ms-transform: translate(25%, 0) rotate(90deg);
            margin-bottom: -60%;
            p {
                -moz-transform: translate(10px, 33px) rotate(-180deg);
                -ms-transform: translate(10px, 33px) rotate(-180deg);
                -webkit-transform: translate(10px, 33px) rotate(-180deg);
                -o-transform: translate(10px, 33px) rotate(-180deg);
                transform: translate(10px, 33px) rotate(-180deg);
            }
        }
    }
}
</style>
