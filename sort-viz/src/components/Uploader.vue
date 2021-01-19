<template>
    <div>
        <Dragger
            name="file"
            :multiple="true"
            accept=".txt"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="handleChange"
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
import { mapActions } from "vuex";
import { Upload } from "ant-design-vue"; // import on demand with babel-plugin-import
const { Dragger } = Upload;
import "ant-design-vue/lib/upload/style";

Vue.use(Upload); // resolve issue: "cannot resolve directive input: ant-input"

export default {
    components: {
        Dragger
    },
    methods: {
        ...mapActions(["refillInitNums"]),
        handleChange(info) {
            const status = info.file.status;
            if (status !== "uploading") {
                console.log(`${info.file.name} file is uploading...`);
            }
            if (status === "done") {
                console.log(`${info.file.name} file uploaded successfully.`);
                let reader = new FileReader();
                reader.onload = e => {
                    console.log(e.target.result);
                    this.refillInitNums(JSON.parse(e.target.result));
                };
                // TODO: restrict array length
                // TODO: verify JSON parse
                reader.readAsText(info.file.originFileObj);
            } else if (status === "error") {
                console.log(`${info.file.name} file upload failed.`);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ant-upload-drag-icon {
    font-size: 40pt;
}
</style>
