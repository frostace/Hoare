<template>
    <div>
        <a-select
            id="algo-selector"
            mode="multiple"
            :size="size"
            placeholder="Please select"
            :default-value="['Quick Sort', 'Merge Sort']"
            style="width: 260px"
            @change="handleChange"
            @popupScroll="popupScroll"
        >
            <a-select-option v-for="method in methods" :key="method">
                {{ method }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            size: "default",
            methods: [
                "Quick Sort",
                "Merge Sort",
                "Insertion Sort",
                "Shell Sort",
                "Bucket Sort"
            ]
        };
    },
    methods: {
        handleChange(value) {
            console.log(`Selected: ${value}`);
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
</style>
