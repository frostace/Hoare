<template>
    <div id="app">
        <div class="header-section">
            <!-- internal signal of a click would call handleClick method -->
            <Button @click="handleClickReset" content="Reset" />
            <Button @click="handleClickStart" content="Start" />
            <RangeSlider sliderID="arrayLength" @change="handleRangeSet" content="Array Length" />
            <RangeSlider
                sliderID="animationDuration"
                @change="handleRangeSet"
                content="Animation Speed"
            />
        </div>
        <BarChart :inputNums="getInitNums" ref="barChart" />
    </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import Button from "./components/Button";
import RangeSlider from "./components/RangeSlider";
import { mapGetters, mapActions } from "vuex";

export default {
    name: "App",
    components: {
        BarChart,
        Button,
        RangeSlider
    },
    created() {
        document.title = "Sorting Visualization";
        this.resetInitNums();
    },
    computed: mapGetters(["getInitNums"]),
    data() {
        return {};
    },
    methods: {
        ...mapActions([
            "resetInitNums",
            "toggleChartBusy",
            "varyArrayLength",
            "varyAnimationDuration"
        ]),
        handleClickReset() {
            this.resetInitNums();
            this.$refs.barChart.resetAllCharts();
        },
        handleClickStart() {
            this.toggleChartBusy();
            this.$refs.barChart.startAnimation();
        },
        handleRangeSet(evt) {
            if (evt.target.id === "arrayLength") {
                this.varyArrayLength(evt.target.value);
                this.handleClickReset();
            }
            if (evt.target.id === "animationDuration") {
                this.varyAnimationDuration(evt.target.value);
            }
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

<style lang="scss">
$chart-bkg-color: #f4f4f4;

body {
    background-color: $chart-bkg-color;
}

.header-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
</style>
