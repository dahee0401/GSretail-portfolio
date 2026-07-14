<script setup>
import { defineProps } from "vue";
import Inputs from "@/components/Inputs.vue";

defineProps({
    items: { type: Array, default: () => [] },
    required: String,
    title: {
        type: String,
        default: "개인정보 제공 동의",
    },
    modelValue: { type: Boolean, default: false },
    noticeHtml: {
        type: String,
        default: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우<br />확인해야 하는 문의에 대해 정확하고 신속한 답변을 받으시는데 어려움이 있습니다.",
    },
});

</script>

<template>
    <div class="consent_box" aria-label="개인정보 제공 동의">
        <h3>{{ required }} {{ title }}</h3>

        <ul v-if="items && items.length" class="consent_list">
            <li v-for="(item, idx) in items" :key="idx">
                <p v-html="item"></p>
            </li>
        </ul>

        <div class="consent_notice_area">
            <p v-html="noticeHtml"></p>
            <Inputs type="checkbox" text="동의합니다."  />
        </div>
    </div>
</template>

<style scoped>
.consent_box { width: 100%; padding: 32px; background-color: #f8f8f8; border-radius: 12px; }
.consent_box + .consent_box { margin-top: 40px; }
.consent_box > h3 { font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.consent_list { margin-top: 24px; }
.consent_list > li { padding-left: 10px; position: relative; }
.consent_list > li + li { margin-top: 8px; }
.consent_list > li > p { color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.consent_notice_area { margin-top: 24px; padding-top: 24px; border-top: 1px solid #d7d7df; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.consent_notice_area > p { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.24; letter-spacing: 0; }
.consent_radio { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
:deep(.input_wrap){width:auto; flex: 0 0 auto;}
.consent_radio > span { color: #161616; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }

@media (max-width: 768px) {
    .consent_box { padding: 24px 20px; }
    .consent_box > h3 { font-size: 2rem; line-height: 1.35; }
    .consent_list { margin-top: 16px; }
    .consent_list > li > p { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .consent_notice_area { margin-top: 16px; padding-top: 16px; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
    .consent_notice_area > p { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .consent_radio > span { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
}
</style>
