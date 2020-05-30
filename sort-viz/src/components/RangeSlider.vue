<template>
    <div @change="handleChange" class="slider-container">
        <span>{{content}}</span>
        <input type="range" :id="sliderID" name="vol" min="0" max="46" :value="currentValue" />
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
            default: ""
        },
        sliderID: {
            type: String,
            default: "vol"
        }
    },
    data() {
        return {
            currentValue: 23
        };
    },
    methods: {
        handleChange(evt) {
            this.$emit("change", evt);
        }
    }
};
</script>

<style scoped>
.slider-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
span {
    margin: 0 10px;
}
</style>