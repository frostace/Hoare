<template>
    <div id="canvas">
        <div
            v-for="(algo, idx) in getSelectedAlgorithms"
            :key="algo"
            class="rotation-wrapper-outer"
        >
            <div class="rotation-wrapper-inner">
                <div class="section" :class="'section-algo' + idx">
                    <p class="chart-title">{{ algo }}</p>
                    <svg
                        :id="'algo' + idx"
                        class="svg"
                        :class="'svg-algo' + idx"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as d3 from "d3";
import quicksort from "../algos/quicksort";
import mergesort from "../algos/mergesort";
import insertionsort from "../algos/insertionsort";
import shellsort from "../algos/shellsort";
import bubblesort from "../algos/bubblesort";
import cocktailshakersort from "../algos/cocktailshakersort";
import combsort from "../algos/combsort";
import heapsort from "../algos/heapsort";
import countingsort from "../algos/countingsort";
import bucketsort from "../algos/bucketsort.mjs";
import radixsort from "../algos/radixsort-msd.js";
import { mapGetters, mapActions } from "vuex";

const AlgorithmBook = {
    "Quick Sort": quicksort,
    "Merge Sort": mergesort,
    "Insertion Sort": insertionsort,
    "Shell Sort": shellsort,
    "Bubble Sort": bubblesort,
    "Cocktailshaker Sort": cocktailshakersort,
    "Comb Sort": combsort,
    "Heap Sort": heapsort,
    "Counting Sort": countingsort,
    "Bucket Sort": bucketsort,
    "Radix Sort": radixsort
};
console.log(AlgorithmBook);

export default {
    props: ["inputNums", "selectedAlgorithms"],
    data() {
        return {
            chart: null,
            chartAlgo0: null,
            chartAlgo1: null,
            chartAlgo2: null,
            palette: ["#caf0f8", "#00A6FB"],
            animationNumsAlgo0: [],
            animationNumsAlgo1: [],
            animationNumsAlgo2: [],
            iterNum: 0
        };
    },
    computed: mapGetters([
        "getInitNums",
        "getChartBusy",
        "getInitNumsMax",
        "getAnimationDuration",
        "getSelectedAlgorithms"
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
        this.renderChart(this.getInitNums, null, "#algo0");
        this.renderChart(this.getInitNums, null, "#algo1");
        this.renderChart(this.getInitNums, null, "#algo2");
    },
    updated() {
        this.resetAllCharts();
        this.renderChart(this.getInitNums, null, "#algo0");
        this.renderChart(this.getInitNums, null, "#algo1");
        this.renderChart(this.getInitNums, null, "#algo2");
    },
    methods: {
        ...mapActions(["releaseAlgo0", "releaseAlgo1", "releaseAlgo2"]),
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
        /**
         * Map input string to lower case and remove space in it.
         * @param {String} input
         * @returns {String}
         */
        minisculize(input) {
            return input
                .toLowerCase()
                .split(" ")
                .join("");
        },
        resetAllCharts() {
            // clear current charts
            if (this.chartAlgo0 != null) this.chartAlgo0.remove();
            if (this.chartAlgo1 != null) this.chartAlgo1.remove();
            if (this.chartAlgo2 != null) this.chartAlgo2.remove();
            // re-render charts with new data
            this.renderChart(this.getInitNums, null, "#algo0");
            this.renderChart(this.getInitNums, null, "#algo1");
            this.renderChart(this.getInitNums, null, "#algo2");
        },
        resetAllAnimations() {
            this.animationNumsAlgo0 = [];
            this.animationNumsAlgo1 = [];
            this.animationNumsAlgo2 = [];
        },
        renderChart(nums, swapIndices = null, selector = "svg") {
            // Chart will be drawn here
            const body_width = d3.select("body")._groups[0][0].clientWidth;
            const svg_width = body_width > 450 ? 250 : 150;
            const svg_height = svg_width * 2;
            const margin = svg_width / 7;
            const chart_width = svg_width - 2 * margin;
            const chart_height = svg_height; //  - 2 * margin
            const arrayMax = Math.max(this.getInitNumsMax, ...nums);

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

            if (selector === "#algo0") {
                this.chartAlgo0 =
                    svg.select("g").node() === null
                        ? svg
                              .append("g")
                              .attr("transform", `translate(${margin}, ${0})`)
                        : svg.select("g");
                chart = this.chartAlgo0;
            } else if (selector === "#algo1") {
                this.chartAlgo1 =
                    svg.select("g").node() === null
                        ? svg
                              .append("g")
                              .attr("transform", `translate(${margin}, ${0})`)
                        : svg.select("g");
                chart = this.chartAlgo1;
            } else if (selector === "#algo2") {
                this.chartAlgo2 =
                    svg.select("g").node() === null
                        ? svg
                              .append("g")
                              .attr("transform", `translate(${margin}, ${0})`)
                        : svg.select("g");
                chart = this.chartAlgo2;
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

            // get animation process synchronously
            // TODO: refactor the following 3 trunks with forEach
            if (this.getSelectedAlgorithms.length >= 1)
                this.animationNumsAlgo0 = AlgorithmBook[
                    this.getSelectedAlgorithms[0]
                ]([...nums]);
            if (this.getSelectedAlgorithms.length >= 2)
                this.animationNumsAlgo1 = AlgorithmBook[
                    this.getSelectedAlgorithms[1]
                ]([...nums]);
            if (this.getSelectedAlgorithms.length >= 3)
                this.animationNumsAlgo2 = AlgorithmBook[
                    this.getSelectedAlgorithms[2]
                ]([...nums]);

            let lengthAlgo0Anima = this.animationNumsAlgo0.length;
            let lengthAlgo1Anima = this.animationNumsAlgo1.length;
            let lengthAlgo2Anima = this.animationNumsAlgo2.length;

            let startTimeStamp1, startTimeStamp2, startTimeStamp3;

            // ========================================
            // ======= Async Ops for Algos Viz ========
            // ========================================
            // iteratively render nums, pointers coral, others blue
            if (this.getSelectedAlgorithms.length <= 0) return;
            const algo0LastFrameNums = this.animationNumsAlgo0[
                lengthAlgo0Anima - 1
            ]["nums"];
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

            // ========================================
            // ===== Async Ops for Algo1 Viz ======
            // ========================================
            if (this.getSelectedAlgorithms.length <= 1) return;
            const algo1LastFrameNums = this.animationNumsAlgo1[
                lengthAlgo1Anima - 1
            ]["nums"];
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

            // ========================================
            // ==== Async Ops for Insertion Viz =======
            // ========================================
            // iteratively render nums, swaping nums to be coral, normal nums to be blue
            if (this.getSelectedAlgorithms.length <= 2) return;
            const algo2LastFrameNums = this.animationNumsAlgo2[
                lengthAlgo2Anima - 1
            ]["nums"];
            const algo2LastFrame = () => {
                if (this.getChartBusy && localIterNum === this.iterNum) {
                    if (this.chartAlgo2 != null) this.chartAlgo2.remove();
                    this.renderChart(algo2LastFrameNums, null, "#algo2");
                    // this.animationNumsAlgo0 = [];
                    this.releaseAlgo2();
                } else return;
            };
            const algo2Frame = timestamp => {
                // base case
                if (this.animationNumsAlgo2.length === 0) {
                    window.requestAnimationFrame(algo2LastFrame);
                    return;
                }

                if (startTimeStamp3 === undefined) {
                    startTimeStamp3 = timestamp;
                }

                const elapsed = timestamp - startTimeStamp3;

                if (elapsed > this.getAnimationDuration) {
                    let animationFrame = this.animationNumsAlgo2.shift();
                    let iterationNums = animationFrame["nums"];
                    let swapIndices = animationFrame["pointers"];
                    if (this.getChartBusy && localIterNum === this.iterNum) {
                        // compare local iter num with context iter num to prevent conflict calls of animation
                        if (this.chartAlgo2 != null) this.chartAlgo2.remove();
                        this.renderChart(iterationNums, swapIndices, "#algo2");
                    } else return;

                    // clear startTimeStamp3
                    startTimeStamp3 = undefined;
                }
                window.requestAnimationFrame(algo2Frame);
            };
            window.requestAnimationFrame(algo2Frame);
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

.section {
    display: flex;
    flex-direction: row;
    margin-top: 55px;
    margin-right: 40px;

    p {
        height: 20px;
        width: 100px;
        text-align: right;
        font-size: 16px;
        color: #888;
        margin-top: 3px;
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        transform-origin: top right;
    }
    svg {
        -webkit-display: block;
        display: block;
        // height: 100%;
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
        height: 450px;

        .rotation-wrapper-outer {
            // display: table;
            height: fit-content; // shrink width to fit content
        }
        .rotation-wrapper-inner {
            padding: 50% 0; // padding decided by parent width
            height: 0;
        }

        .section {
            flex: 1;
            margin-right: 0px;

            margin-top: -50%;
            transform: rotate(-90deg) translate(-120%, -24%);
            -moz-transform: rotate(-90deg) translate(-120%, -24%);
            -ms-transform: rotate(-90deg) translate(-120%, -24%);
            -webkit-transform: rotate(-90deg) translate(-120%, -24%);
            -o-transform: rotate(-90deg) translate(-120%, -24%);
            transform-origin: top left;

            p {
                position: absolute;
                text-align: left;
                width: 100px;
                height: 20px;
                transform: rotate(90deg) translateY(-15px);
                -moz-transform: rotate(90deg) translateY(-15px);
                -ms-transform: rotate(90deg) translateY(-15px);
                -webkit-transform: rotate(90deg) translateY(-15px);
                -o-transform: rotate(90deg) translateY(-15px);
                transform-origin: top left;
            }

            .svg {
                display: block;
            }
        }
    }
}
</style>
