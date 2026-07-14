<template>
    <div class="modal_cont delivery_modal">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <section>
                <p>{{ t.desc1 }}</p>
                <span>{{ t.desc2 }}</span>
                <em>{{ t.desc3 }}</em>
            </section>
        </div>
        <!-- modal bottom -->
        <div class="modal_bottom">
            <div class="btnBox">
                <a href="#none" @click="closeModal" class="btn_mid primary">{{ t.check}}</a>
            </div>
        </div>
        <!-- //modal bottom -->
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "gsrbr0401",
    components: {
    },
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            isMobile: false,
            langData: {
                ko: {
                    closeLabel: "닫기",
                    desc1: "1:1 상담 신청이 완료 되었습니다.",
                    desc2: "빠른 시일 내에 회신 드리도록 하겠습니다.",
                    desc3:"(평균 1~2일 이내)",
                    check:"확인"
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    desc1: "Your 1:1 consultation request has been completed.",
                    desc2: "We will reply as soon as possible.",
                    desc3:"(Average: within 1–2 business days)",
                    check:"Confirm"
                }
            }
        };
    },
    computed: {
        t() { return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko; }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        checkMobile() { this.isMobile = window.innerWidth < 768; },
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
/* Common Layout */
.modal_header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 40px; color: #161616; font-size: 40px; font-weight: 700; border-bottom: 0 !important; }
.modal_content p {margin-bottom:12px; font-size:18px; font-weight:700; }
section {display:flex; flex-direction:column; align-items:center; }

/* Responsive */
@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 767px) {

}
</style>