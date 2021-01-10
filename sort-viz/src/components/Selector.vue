<template>
    <div>
        <a-select
            id="algo-selector"
            mode="multiple"
            :size="size"
            placeholder="Please select"
            :default-value="['a1', 'b2']"
            style="width: 200px"
            @change="handleChange"
            @popupScroll="popupScroll"
        >
            <a-select-option v-for="i in 5" :key="(i + 9).toString(36) + i">
                {{ (i + 9).toString(36) + i }}
            </a-select-option>
        </a-select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            size: "default"
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
        width: 60px;
    }
}
</style>
