import Vue from "vue";
import Vuex from "vuex";
import * as d3 from "d3";

Vue.use(Vuex);

var genRandomArray = (length, max) =>
    [...new Array(length)].map(() => Math.ceil(Math.random() * max));

// var activateSlider = () => {
//     d3.selectAll("input").property("disabled", false);
// };

const state = {
    initNums: [],
    initNumsMax: 0, // maintain a fixed maximum value of nums so that merge sort won't change domain range dynamically
    animationDuration: 100, // default
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
        state.chartIsBusy = !state.chartIsBusy;
        d3.selectAll("input").property("disabled", true);
    },
    updateArrayLength: (state, newLength) => {
        state.arrayLength = newLength * 2 + 4;
        console.log(state.initNums);
    },
    updateAnimationDuration: (state, newDuration) => {
        state.animationDuration = 146 - 2 * newDuration;
    },
    finishQsort: (state) => {
        state.qsortFinished = true;
        state.chartIsBusy = !(
            state.qsortFinished &&
            state.mergesortFinished &&
            state.insertionsortFinished
        );
        console.log("qsort fin");
    },
    finishMergeSort: (state) => {
        state.mergesortFinished = true;
        state.chartIsBusy = !(
            state.qsortFinished &&
            state.mergesortFinished &&
            state.insertionsortFinished
        );
        console.log("mergesort fin");
    },
    finishInsertionSort: (state) => {
        state.insertsionsortFinished = true;
        state.chartIsBusy = !(
            state.qsortFinished &&
            state.mergesortFinished &&
            state.insertionsortFinished
        );
        console.log("busy", state.chartIsBusy);
        console.log("insertsion fin");
    },
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {},
});
