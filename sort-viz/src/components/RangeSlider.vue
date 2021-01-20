<template>
    <div @input="handleChange" class="slider-container">
        <span>{{ content }}</span>
        <input
            type="range"
            :id="sliderID"
            class="slider"
            name="vol"
            min="4"
            max="50"
            :value="currentValue"
        />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
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
            currentValue: 27
        };
    },
    computed: {
        ...mapGetters(["getArrayLength"])
    },
    watch: {
        getArrayLength: {
            immediate: true,
            handler: function(newLen) {
                if (this.sliderID !== "arrayLength") return;
                this.currentValue = newLen / 2; // map from arr len to slider val
            }
        }
    },
    methods: {
        handleChange(evt) {
            this.$emit("change", evt);
        }
    }
};
</script>

<style lang="scss">
@import "../assets/var";
@import "../assets/presets";

.slider-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
span {
    margin: 0 10px;
    color: $--content-font-color;
    font-size: 16px;
    @include clear-select-effect;
}
.slider {
    -webkit-appearance: none;
    width: 100px;
    height: 6.68px;
    background: #d3d3d3;
    border-radius: 10px;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    &:disabled {
        &::-webkit-slider-thumb {
            background: #d3d3d3;
        }
    }
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

// input[type="range"]:disabled {
//     &::-webkit-slider-thumb {
//         background: red;
//     }
// }
</style>
