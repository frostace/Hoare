<template>
    <Modal
        :visible="this.value"
        title="Upload Custom Testcase"
        centered
        :afterClose="this.close"
        @ok="handleOk"
        @cancel="handleCancel"
    >
        <Uploader />
    </Modal>
</template>

<script>
import Vue from "vue";
import Uploader from "./Uploader.vue";
import { Modal } from "ant-design-vue";
import "ant-design-vue/lib/modal/style";
Vue.use(Modal);

export default {
    components: {
        Uploader,
        Modal
    },
    props: {
        value: Boolean,
        close: Function
    },
    watch: {
        value: function(newValue) {
            console.log(newValue);
        }
    },
    methods: {
        handleOk() {
            this.$emit("ok");
        },
        handleCancel() {
            this.$emit("cancel");
        }
    }
};
</script>
