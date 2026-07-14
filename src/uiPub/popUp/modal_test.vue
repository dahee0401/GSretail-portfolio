<template>
    <div class="modal_cont">
        <!-- modal header -->
        <div class="modal_header">Modal Title
            <a href="#none" @click="closeModal" class="btn_close">닫기</a>
        </div>
        <!-- //modal header -->
        <!-- modal content -->
        <div class="modal_content">Modal Content</div>
        <!-- //modal content -->
        <!-- modal bottom -->
        <div class="modal_bottom">
            <div class="btnBox">
                <a href="#none" class="btn_fill">확인</a>
                <a href="#none" @click="closeModal" class="btn_border">취소</a>
            </div>
        </div>
        <!-- //modal bottom -->
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "Modal Test",
    components: {
    },
    methods:{
        closeModal(event) {
            modal.close(event.currentTarget);
        }
    },
};
</script>

<style></style>
