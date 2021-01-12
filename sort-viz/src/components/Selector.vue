<template>
    <div>
        <a-select
            id="algo-selector"
            mode="multiple"
            :size="size"
            placeholder="Please select"
            :default-value="getSelectedAlgorithms"
            @change="handleChange"
            @popupScroll="popupScroll"
        >
            <a-select-option
                v-for="method in methods"
                :key="method"
                :disabled="algoFull && !getSelectedAlgorithms.includes(method)"
            >
                {{ method }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { algorithmCapacity } from "../assets/constants";

export default {
    data() {
        return {
            size: "default",
            methods: [
                "Quick Sort",
                "Merge Sort",
                "Insertion Sort",
                "Shell Sort",
                "Bubble Sort",
                "Cocktailshaker Sort",
                "Comb Sort"
            ]
        };
    },
    computed: {
        ...mapGetters(["getSelectedAlgorithms"]),
        algoFull() {
            return this.getSelectedAlgorithms.length >= algorithmCapacity;
        }
    },
    methods: {
        ...mapActions(["varyAlgorithms"]),
        handleChange(value) {
            console.log(`Selected: ${value}`);
            this.varyAlgorithms(value);
        },
        popupScroll() {
            console.log("popupScroll");
        }
    }
};
</script>
<style lang="scss">
.ant-select-selection {
    height: 40px;
    border: none !important;
    border-radius: 20px !important;
    padding: 5px;

    &__choice {
        border-radius: 12px !important;
        width: 70px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    &__choice__remove {
        margin: 0;
    }
}

.ant-select {
    width: 260px;
}
</style>
