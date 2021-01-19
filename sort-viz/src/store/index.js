import Vue from "vue";
import Vuex from "vuex";
// import * as d3 from "d3";

Vue.use(Vuex);

var genRandomArray = (length, max) =>
    [...new Array(length)].map(() => Math.ceil(Math.random() * max));

// var activateSlider = () => {
//     d3.selectAll("input").property("disabled", false);
// };

const state = {
    initNums: [],
    initNumsMax: 0, // maintain a fixed maximum value of nums so that merge sort won't change domain range dynamically
    animationDuration: 80, // default
    arrayLength: 50, // default
    chartIsBusy: false,
    algo0Finished: false,
    algo1Finished: false,
    algo2Finished: false,
    selectedAlgorithms: ["Quick Sort", "Merge Sort", "Insertion Sort"]
};

const getters = {
    getInitNums: state => state.initNums,
    getInitNumsMax: state => state.initNumsMax,
    getChartBusy: state => state.chartIsBusy,
    getArrayLength: state => state.arrayLength,
    getAnimationDuration: state => state.animationDuration,
    getSelectedAlgorithms: state => state.selectedAlgorithms
};

const actions = {
    resetInitNums({ commit }) {
        commit("updateInitNums", genRandomArray(state.arrayLength, 50));
    },
    refillInitNums({ commit }, newArr) {
        console.log("refilling");
        commit("updateInitNums", newArr);
    },
    makeChartBusy({ commit }) {
        commit("updateChartBusy");
    },
    varyArrayLength({ commit }, newLength) {
        commit("updateArrayLength", newLength);
    },
    varyAnimationDuration({ commit }, newDuration) {
        commit("updateAnimationDuration", newDuration);
    },
    varyAlgorithms({ commit }, newAlgos) {
        commit("updateAlgorithms", newAlgos);
    },
    releaseAlgo0({ commit }) {
        commit("finishAlgo0");
    },
    releaseAlgo1({ commit }) {
        commit("finishAlgo1");
    },
    releaseAlgo2({ commit }) {
        commit("finishAlgo2");
    }
};

const mutations = {
    updateInitNums: (state, newArr) => {
        state.initNums = newArr;
        state.initNumsMax = Math.max(...state.initNums);
        state.chartIsBusy = false;
    },
    updateChartBusy: state => {
        state.chartIsBusy = true;
        state.algo0Finished = false;
        state.algo1Finished = false;
        state.algo2Finished = false;
    },
    updateArrayLength: (state, newLength) => {
        state.arrayLength = newLength * 2;
        // default length = 25 * 2 = 50;
    },
    updateAnimationDuration: (state, newDuration) => {
        state.animationDuration = 144 - 2.56 * newDuration;
        // default animation duration = 144 - 2.56 * 25 = 80ms;
    },
    updateAlgorithms: (state, newAlgos) => {
        state.selectedAlgorithms = newAlgos;
    },
    finishAlgo0: state => {
        state.algo0Finished = true;
        state.chartIsBusy = !(state.algo1Finished && state.algo2Finished);
        console.log("algo0 fin");
    },
    finishAlgo1: state => {
        state.algo1Finished = true;
        state.chartIsBusy = !(state.algo0Finished && state.algo2Finished);
        console.log("algo1 fin");
    },
    finishAlgo2: state => {
        state.algo2Finished = true;
        state.chartIsBusy = !(state.algo0Finished && state.algo1Finished);
        console.log("algo2 fin", state.algo0Finished, state.algo1Finished);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {}
});
