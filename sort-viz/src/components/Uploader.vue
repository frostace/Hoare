<template>
    <div>
        <TextArea
            class="ant-textarea"
            placeholder="input your array here"
            allow-clear
            @change="handleChangeTextarea"
            v-model="localInputNumsStr"
        />
        <Dragger
            name="file"
            :multiple="true"
            accept=".txt"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="handleChangeDragger"
        >
            <p class="ant-upload-drag-icon">
                <font-awesome-icon icon="inbox" />
            </p>
            <p class="ant-upload-text">
                Click or drag file to this area to upload
            </p>
            <p class="ant-upload-hint">
                Support for a single file upload (.txt).
            </p>
        </Dragger>
    </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Upload, Input, message } from "ant-design-vue"; // import on demand with babel-plugin-import
const { Dragger } = Upload;
const { TextArea } = Input;
import "ant-design-vue/lib/upload/style";
import "ant-design-vue/lib/input/style";
import "ant-design-vue/lib/message/style";
import debounce from "lodash/debounce"; // import lodash on demand
Vue.use(Upload); // resolve issue: "cannot resolve directive input: ant-input"

export default {
    components: {
        Dragger,
        TextArea
    },
    data() {
        return {
            localInputNumsStr: ""
        };
    },
    methods: {
        ...mapActions(["refillInitNums", "varyInputNums"]),
        handleChangeDragger(info) {
            const status = info.file.status;
            if (status !== "uploading") {
                console.log(`${info.file.name} file is uploading...`);
            }
            if (status === "done") {
                console.log(`${info.file.name} file uploaded successfully.`);
                let reader = new FileReader();
                reader.onload = e => {
                    console.log(e.target.result);
                    this.localInputNumsStr = e.target.result;
                    this.handleChangeTextarea();
                    // this.refillInitNums(JSON.parse(e.target.result));
                };

                // refill init nums after clicking on OK
                reader.readAsText(info.file.originFileObj);
            } else if (status === "error") {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
        handleChangeTextarea: debounce(function() {
            // pass localInputNumsStr to state.inputNums
            let nums = this.verifiedInputNums(this.localInputNumsStr);
            // invalid JSON parse or empty arr
            if (nums.length === 0) {
                message.error("Invalid Input or Empty Array!", 1);
                return;
            }
            // limit arr length
            if (nums.length < 8) {
                message.error("Array Length should be >= 8!", 1);
                return;
            }
            if (nums.length > 100) {
                message.error("Array Length should be <= 100!", 1);
                return;
            }
            // now that nums is valid
            this.varyInputNums(nums);
        }, 200),
        verifiedInputNums(inputNumsStr) {
            // remove redundant comma
            // remove trailing comma
            let results = [];
            let entries = inputNumsStr.match(/\d+/g);
            if (entries === null) return results;
            entries.forEach(function(x) {
                results.push(parseInt(x));
            });
            return results;
        }
    },
    computed: {
        ...mapGetters(["getInitNums"])
    },
    watch: {
        getInitNums: {
            immediate: true,
            handler: function(newNums) {
                this.localInputNumsStr = newNums.toString();
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ant-upload-drag-icon {
    font-size: 40pt;
}

.ant-textarea {
    margin-bottom: 20px;
}
</style>
