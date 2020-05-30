<template>
    <div id="app">
        <BarChart :inputNums="initNums" msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";

export default {
    name: "App",
    components: {
        BarChart
    },
    data() {
        return {
            initNums: this.genRandomArray(50, 50)
        };
    },
    methods: {
        genRandomArray: (length, max) =>
            [...new Array(length)].map(() => Math.ceil(Math.random() * max))
    },
    created() {
        document.title = "Sorting Visualization";
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
</style>
