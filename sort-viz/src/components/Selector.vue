<template>
    <div>
        <!-- <Select
            mode="multiple"
            :size="size"
            placeholder="Please select"
            :default-value="getSelectedAlgorithms"
            :removeIcon="(<CloseOutline />)"
            @change="handleChange"
            @popupScroll="popupScroll"
        >
             <CheckOutline slot="menuItemSelectedIcon" />
            <CloseOutline slot="removeIcon" />
            <Option
                v-for="method in methods"
                :key="method"
                :disabled="algoFull && !getSelectedAlgorithms.includes(method)"
            >
                <div>{{ method }} <CloseOutline /></div>
            </Option>
        </Select> -->
        <a-select
            id="algo-selector"
            mode="multiple"
            :size="size"
            placeholder="Please select"
            :default-value="getSelectedAlgorithms"
            @change="handleChange"
            @popupScroll="popupScroll"
        >
            <Icon slot="removeIcon" type="close" />
            <Icon slot="menuItemSelectedIcon" type="check" />
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
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { algorithmCapacity } from "../assets/constants";
import { Select } from "ant-design-vue"; // import on demand with babel-plugin-import
import "ant-design-vue/lib/select/style";
import { CheckOutline, CloseOutline } from "../assets/antdIcons";
import { Icon } from "ant-design-vue";

const Option = Select.Option;
Vue.use(Select); // resolve issue: "cannot resolve directive input: ant-input"
console.log(Select, Option);
console.log(CloseOutline);

export default {
    components: {
        // Select,
        // Option,
        Icon
    },
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
                "Comb Sort",
                "Heap Sort",
                "Counting Sort",
                "Bucket Sort",
                "Radix Sort"
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
        },
        getIcon(iconName) {
            return iconName === "CloseOutline" ? (
                <CloseOutline />
            ) : (
                <CheckOutline />
            );
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
