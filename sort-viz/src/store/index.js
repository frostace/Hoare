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
    qsortFinished: false,
    mergesortFinished: false,
    insertionsortFinished: false,
};

const getters = {
    getInitNums: (state) => state.initNums,
    getInitNumsMax: (state) => state.initNumsMax,
    getChartBusy: (state) => state.chartIsBusy,
    getArrayLength: (state) => state.arrayLength,
    getAnimationDuration: (state) => state.animationDuration,
};

const actions = {
    resetInitNums({ commit }) {
        commit("updateInitNums");
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
    releaseQsort({ commit }) {
        commit("finishQsort");
    },
    releaseMergeSort({ commit }) {
        commit("finishMergeSort");
    },
    releaseInsertionSort({ commit }) {
        commit("finishInsertionSort");
    },
};

const mutations = {
    updateInitNums: (state) => {
        state.initNums = genRandomArray(state.arrayLength, 50);
        state.initNumsMax = Math.max(...state.initNums);
        state.chartIsBusy = false;
    },
    updateChartBusy: (state) => {
        state.chartIsBusy = true;
        state.qsortFinished = false;
        state.mergesortFinished = false;
        state.insertionsortFinished = false;
    },
    updateArrayLength: (state, newLength) => {
        state.arrayLength = newLength * 2;
        // default length = 25 * 2 = 50;
    },
    updateAnimationDuration: (state, newDuration) => {
        state.animationDuration = 144 - 2.56 * newDuration;
        // default animation duration = 144 - 2.56 * 25 = 80ms;
    },
    finishQsort: (state) => {
        state.qsortFinished = true;
        state.chartIsBusy = !(
            state.mergesortFinished && state.insertionsortFinished
        );
        console.log("qsort fin");
    },
    finishMergeSort: (state) => {
        state.mergesortFinished = true;
        state.chartIsBusy = !(
            state.qsortFinished && state.insertionsortFinished
        );
        console.log("mergesort fin");
    },
    finishInsertionSort: (state) => {
        state.insertionsortFinished = true;
        state.chartIsBusy = !(state.qsortFinished && state.mergesortFinished);
        console.log(
            "insertsion fin",
            state.qsortFinished,
            state.mergesortFinished
        );
    },
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {},
});
