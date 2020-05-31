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
        RangeSlider,
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
            "varyAnimationDuration",
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
        },
    },
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
    padding: 0 60px;
}

#app {
    padding: 0 20px;
}

/* default is desktop: */
/* =================== */

/* =================== */
/* === responsive ==== */
/* =================== */

@media only screen and (max-width: 375px) {
    /* For mobile: */
    .header-section {
        display: grid;
        grid-template-areas:
            "button1 button2"
            "slider1 slider1"
            "slider2 slider2";
        grid-gap: 1rem 0;
        padding: 0px 30px 0 30px;
    }

    #button-play {
        grid-area: button1;
    }

    #button-redo {
        grid-area: button2;
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
