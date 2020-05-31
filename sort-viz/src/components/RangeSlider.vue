<template>
    <div @change="handleChange" class="slider-container">
        <span>{{content}}</span>
        <input
            type="range"
            :id="sliderID"
            class="slider"
            name="vol"
            min="0"
            max="46"
            :value="currentValue"
        />
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

<style lang="scss" scoped>
@import "../assets/var";

.slider-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
span {
    margin: 0 10px;
    color: $--content-font-color;
}
.slider {
    -webkit-appearance: none;
    width: 100px;
    height: 10px;
    background: #d3d3d3;
    border-radius: 10px;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 10px;
    background: $--decent-blue;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 10px;
    background: $--decent-blue;
    cursor: pointer;
}
</style>