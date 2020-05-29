<template>
    <div id="bar-chart" class="card">
        <svg id="qsort" class="svg-qsort" />
        <svg id="mergesort" class="svg-mergesort" />
    </div>
</template>

<script>
import * as d3 from "d3";
import _ from "lodash";
import qsort from "../algos/qsort";

export default {
    props: ["inputNums"],
    data() {
        return {
            chart: null,
            palette: ["#caf0f8", "#00A6FB"],
            nums: this.inputNums,
            iter: 0,
            animationNumsQuickSort: []
        };
    },
    watch: {
        nums: {
            immediate: true,
            handler: function(newNums, oldNums) {
                // if (this.chart != null) this.chart.remove();
                console.log("watcher triggered", newNums, oldNums);
                // setTimeout(() => {
                //     this.iter++;
                //     this.renderChart(newNums);
                //     console.log(this.iter, newNums);
                // }, 4000 * this.iter);
            }
        }
    },
    mounted() {
        console.log("mounted nums", this.nums);

        this.renderChart(this.nums);
        this.animationNumsQuickSort = qsort(this.nums, 0, this.nums.length - 1);
        let length = this.animationNumsQuickSort.length;

        // iteratively render nums, swaping nums to be coral, normal nums to be blue
        for (let i = 0; i < length; i++) {
            let iterationNums = this.animationNumsQuickSort[i]["nums"];
            let swapIndices = this.animationNumsQuickSort[i]["swap"];
            setTimeout(() => {
                if (this.chart != null) this.chart.remove();
                this.renderChart(iterationNums, swapIndices, "#qsort");
                // console.log(new Date().getSeconds(), iterationNums);
            }, i * 100);
        }

        // recover all rects to blue
        setTimeout(() => {
            if (this.chart != null) this.chart.remove();
            this.renderChart(
                this.animationNumsQuickSort[length - 1]["nums"],
                null,
                "#qsort"
            );
        }, length * 100);
    },
    methods: {
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

        renderChart(nums, swapIndices = null, selector = "svg") {
            // Chart will be drawn here
            const margin = 60;
            const svg_width = 400;
            const svg_height = 600;
            const chart_width = svg_width - 2 * margin;
            const chart_height = svg_height - 2 * margin;

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

            this.chart = svg
                .append("g")
                .attr("transform", `translate(${margin}, ${margin})`);

            const xScale = d3
                .scaleBand()
                .range([0, chart_height])
                .domain(nums.map((g, idx) => idx + 1))
                .padding(0.3);

            const yScale = d3
                .scaleLinear()
                .range([0, chart_width])
                .domain([0, _.maxBy(nums)]);

            this.chart
                .append("g")
                .call(d3.axisLeft(xScale).ticks(_.maxBy(nums)));

            this.chart.append("g").call(d3.axisTop(yScale));

            const barGroups = this.chart
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
                        ? this.lerpColor(g / _.maxBy(nums))
                        : swapIndices[idx]
                        ? "coral"
                        : this.lerpColor(g / _.maxBy(nums))
                );
        }
    }
};
</script>

<style lang="scss" scoped>
#bar-chart {
    background-color: #f4f4f4;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>
