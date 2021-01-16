<template>
    <div id="app">
        <div class="header-section">
            <!-- internal signal of a click would call handleClick method -->
            <Button
                id="button-play"
                @click="handleClickStart"
                iconName="play"
                content="Start"
            />
            <Button
                id="button-redo"
                @click="handleClickReset"
                iconName="redo"
                content="Reset"
            />
            <Button
                id="button-testcase"
                @click="handleClickUploadTestcase"
                iconName="sort-numeric-down"
                content="Array"
            />
            <Selector id="select" />
            <RangeSlider
                id="slider-length"
                sliderID="arrayLength"
                @change="handleRangeSet"
                content="Array Length"
            />
            <RangeSlider
                id="slider-speed"
                sliderID="animationDuration"
                @change="handleRangeSet"
                content="Animation Speed"
            />
        </div>
        <BarChart
            :inputNums="getInitNums"
            :selectedAlgorithms="getSelectedAlgorithms"
            ref="barChart"
        />
    </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import Button from "./components/Button";
import RangeSlider from "./components/RangeSlider";
import Selector from "./components/Selector";
import { mapGetters, mapActions } from "vuex";
import * as d3 from "d3";

export default {
    name: "App",
    components: {
        BarChart,
        Button,
        RangeSlider,
        Selector
    },
    created() {
        document.title = "Hoare";
        this.resetInitNums();
    },
    computed: mapGetters([
        "getInitNums",
        "getChartBusy",
        "getSelectedAlgorithms"
    ]),
    data() {
        return {};
    },
    watch: {
        getChartBusy(newValue) {
            console.log("watcher of getChartBusy: ", newValue);
            if (newValue === false) {
                d3.selectAll("#arrayLength").attr("disabled", null);
                d3.selectAll("#animationDuration").attr("disabled", null);
            } else {
                d3.selectAll("input").property("disabled", true);
            }
        }
    },
    methods: {
        ...mapActions([
            "resetInitNums",
            "makeChartBusy",
            "varyArrayLength",
            "varyAnimationDuration"
        ]),
        handleClickReset() {
            this.resetInitNums();
            this.$refs.barChart.resetAllCharts();
        },
        handleClickStart() {
            this.makeChartBusy();
            this.$refs.barChart.startAnimation();
        },
        handleClickUploadTestcase() {
            console.log("clicked");
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

<style lang="scss">
$chart-bkg-color: #f4f4f4;

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 0 20px;
    position: absolute;
    width: 100%;
}

body {
    background-color: $chart-bkg-color !important;
}

.header-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 60px;
    margin-top: 60px;
}

/* default is desktop: */
/* =================== */

/* =================== */
/* === responsive ==== */
/* =================== */

@media only screen and (max-width: 450px) {
    /* For mobile: */
    .header-section {
        display: grid;
        grid-template-areas:
            "button1 button2 button3"
            "select select select"
            "slider1 slider1 slider1"
            "slider2 slider2 slider2";
        grid-gap: 1rem 0;
        padding: 0px 30px 0 30px;
        margin-top: 40px;
    }

    #button-play {
        grid-area: button1;
        width: calc((94vw - 60px - 1rem) / 3);
    }

    #button-redo {
        grid-area: button2;
        width: calc((94vw - 60px - 1rem) / 3);
        justify-self: center;
    }

    #button-testcase {
        grid-area: button3;
        width: calc((94vw - 60px - 1rem) / 3);
        justify-self: end;
    }

    #select {
        grid-area: select;
    }

    .ant-select {
        width: calc(94vw - 60px);
    }

    #slider-length {
        grid-area: slider1;
    }

    #slider-speed {
        grid-area: slider2;
    }

    #slider-length.slider-container,
    #slider-speed.slider-container {
        justify-content: space-between;
    }

    #app {
        padding: 3vw;
    }
}

@media only screen and (max-width: 768px) {
    /* For tablets: */
    * {
    }
}
</style>
