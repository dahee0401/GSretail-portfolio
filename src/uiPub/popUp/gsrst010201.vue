<template>
    <div class="modal_cont gsrst010201">
        <div class="modal_header">
            {{ t.title }}
            <a href="#none" @click="closeModal" class="btn_close">닫기</a>
        </div>

        <div class="modal_content">
            <div class="smn_intro">
                <p>{{ t.intro }}</p>
            </div>

            <div class="consent_box">
                <div class="consent_info">
                    <h3 class="consent_info_title">{{ t.consent.title }}</h3>
                    <ul class="consent_info_list">
                        <li v-for="(item, index) in t.consent.items" :key="index" v-html="item"></li>
                    </ul>
                    <div class="consent_notice">
                        <p class="consent_notice_text" v-html="t.consent.notice"></p>
                        <Inputs type="checkbox" :text="t.consent.agreeLabel" v-model="consentAgree" />
                    </div>
                </div>
            </div>

            <div class="apply_form">
                <div class="form_head">
                    <h3 class="form_head_title">{{ t.form.title }}</h3>
                    <span class="form_required_note">{{ t.form.requiredNote }}</span>
                </div>
                <div class="form_body">
                    <div class="form_row">
                        <div class="form_label">{{ t.form.nameLabel }}<span class="form_required">*</span></div>
                        <div class="form_field">
                            <Inputs type="text" v-model="seminarForm.name" />
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.form.phoneLabel }}<span class="form_required">*</span></div>
                        <div class="form_field form_field_phone">
                            <SelectBox :options="phoneOptions" v-model="seminarForm.phone1" />
                            <span class="form_sep">-</span>
                            <Inputs type="text" v-model="seminarForm.phone2" />
                            <span class="form_sep">-</span>
                            <Inputs type="text" v-model="seminarForm.phone3" />
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.form.emailLabel }}<span class="form_required">*</span></div>
                        <div class="form_field form_field_email">
                            <Inputs type="text" v-model="seminarForm.emailId" />
                            <span class="form_sep">@</span>
                            <Inputs v-if="seminarForm.emailDomain === ''" type="text" v-model="seminarForm.emailDomainCustom" :placeholder="t.form.emailPlaceholder" />
                            <Inputs v-else type="text" :model-value="seminarForm.emailDomain" :is-readonly="true" />
                            <SelectBox :options="emailDomainOptions" v-model="seminarForm.emailDomain" :initMsg="t.form.emailPlaceholder" />
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.form.regionLabel }}<span class="form_required">*</span></div>
                        <div class="form_field form_field_region">
                            <SelectBox :options="regionSidoOptions" v-model="seminarForm.regionSido" :initMsg="t.form.regionInitMsg" />
                            <SelectBox :options="[]" v-model="seminarForm.regionSigungu" :initMsg="t.form.sigunguInitMsg" />
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.form.prevJobLabel }}</div>
                        <div class="form_field">
                            <Inputs type="text" v-model="seminarForm.prevJob" />
                        </div>
                    </div>
                    <div class="form_row form_row_radio">
                        <div class="form_label" v-html="t.form.seminarRegionLabel"></div>
                        <div class="form_field form_field_radio">
                            <Inputs
                                v-for="opt in seminarRegionOptions"
                                :key="opt.value"
                                type="radio"
                                name="seminar_region"
                                :value="opt.value"
                                v-model="seminarForm.seminarRegion"
                                :text="opt.label"
                            />
                        </div>
                    </div>
                    <div class="form_row form_row_textarea">
                        <div class="form_label">{{ t.form.contentLabel }}<span class="form_required">*</span></div>
                        <div class="form_field">
                            <Textarea v-model="seminarForm.content" :placeholder="contentPlaceholder" :rows="6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal_bototm">
            <Buttons btn-class="btn_big fill primary">{{ t.submitLabel }}</Buttons>
            <Buttons btn-class="btn_big gary" @click="closeModal">{{ t.cancelLabel }}</Buttons>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, onMounted, onUnmounted } from "vue";
import modal from "@/assets/js/modal";
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue";
import Textarea from "@/components/Textarea.vue";
import Buttons from "@/components/Buttons.vue";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const langData = {
    ko: {
        title: "사업설명회 신청",
        intro: "사업설명회 신청을 하시려면 아래 내용을 입력해 주시기 바랍니다.",
        consent: {
            title: "개인정보 수집·이용 동의",
            items: [
                '입력하신 정보는 사업설명회에 의한 확인을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같습니다.<br>기타 개인정보 취급사항은 홈페이지 하단의 "개인정보 취급방침"을 참고하시기 바랍니다.',
                "수집하는 개인정보 항목 : 이름, 연락처, E-mail, 지역",
                "수집이용 및 목적: 수집된 개인정보를 통한 사업 및 문의사항 확인 및 답변을 위하여 활용",
                "보유 및 이용기간: 개인정보 수집 및 이용 목적이 달성된 후에는 예외없이 정보를 파기 합니다.",
            ],
            notice: '고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우<br class="p_br">사업설명회 신청 글 작성이 불가능합니다.',
            agreeLabel: "동의합니다.",
        },
        form: {
            title: "신청하기",
            requiredNote: "* 필수 입력사항",
            nameLabel: "이름",
            phoneLabel: "연락처",
            emailLabel: "이메일",
            emailPlaceholder: "직접입력",
            regionLabel: "개설희망지역",
            regionInitMsg: "지역선택",
            sigunguInitMsg: "구/군 선택",
            prevJobLabel: "재직중인 과거직장",
            seminarRegionLabel: '사업 설명회 신청<br class="p_br">지역<span class="form_required">*</span>',
            contentLabel: "내용",
            regionSidoOptions: [
                { value: "서울", label: "서울" },
                { value: "경기", label: "경기" },
                { value: "인천", label: "인천" },
                { value: "충청", label: "충청" },
                { value: "강원", label: "강원" },
                { value: "제주", label: "제주" },
                { value: "전라", label: "전라" },
                { value: "경상", label: "경상" },
            ],
            seminarRegionOptions: [
                { value: "수도", label: "수도 (서울, 경기, 인천)" },
                { value: "중부", label: "중부 (충청, 강원, 제주)" },
                { value: "영남호남", label: "영남/호남 (전라, 경상)" },
            ],
        },
        contentPlaceholderPc: "개설 희망 타입을 적어주세요. (타입 GSF1, GSF2, GSF3)",
        contentPlaceholderMobile: "개설 희망 타입을 적어주세요.\n(타입 GSF1, GSF2, GSF3)",
        submitLabel: "신청",
        cancelLabel: "취소",
    },
    en: {
        title: "Apply for Business Briefing Session"/* 260604 번역 */,
        intro: "To apply for the business briefing session, please enter the information below."/* 260604 번역 */,
        consent: {
            title: "Consent to Collection and Use of Personal Information",
            items: [
                'The information you enter is used solely for verification related to the business briefing. The items collected, the use and purpose, and the retention and use period are as follows.<br>For other matters regarding the handling of personal information, please refer to the "Privacy Policy" at the bottom of the website.'/* 260604 번역 */,
                "Personal Information Collected: Name, Contact Number, E-mail, Region"/* 260604 번역 */,
                "Collection, Use, and Purpose: The collected personal information is used to verify and respond to business matters and inquiries."/* 260604 번역 */,
                "Retention and Use Period: After the purpose of collecting and using personal information has been achieved, the information will be destroyed without exception."/* 260604 번역 */,
            ],
            notice: 'You have the right to refuse this consent; however, if you do not consent,<br class="p_br">You cannot submit a business briefing session application.'/* 260604 번역 */,
            agreeLabel: "I agree.",
        },
        form: {
            title: "Submit",
            requiredNote: "* Required fields",
            nameLabel: "Name",
            phoneLabel: "Contact",
            emailLabel: "Email",
            emailPlaceholder: "Enter directly",
            regionLabel: "Desired Opening Area"/* 260604 번역 */,
            regionInitMsg: "Select Region",
            sigunguInitMsg: "Select District/County"/* 260604 번역 */,
            prevJobLabel: "Previous workplace currently employed at"/* 260604 번역 */,
            seminarRegionLabel: 'Apply for Business Briefing Session<br class="p_br">Region<span class="form_required">*</span>'/* 260604 번역 */,
            contentLabel: "Details",
            regionSidoOptions: [
                { value: "Seoul", label: "Seoul" },
                { value: "Gyeonggi", label: "Gyeonggi" },
                { value: "Incheon", label: "Incheon" },
                { value: "Chungcheong"/* 260604 번역 */, label: "Chungcheong"/* 260604 번역 */ },
                { value: "Gangwon", label: "Gangwon" },
                { value: "Jeju", label: "Jeju" },
                { value: "Jeolla"/* 260604 번역 */, label: "Jeolla"/* 260604 번역 */ },
                { value: "Gyeongsang"/* 260604 번역 */, label: "Gyeongsang"/* 260604 번역 */ },
            ],
            seminarRegionOptions: [
                { value: "Capital Region"/* 260604 번역 */, label: "Capital Region (Seoul, Gyeonggi, Incheon)"/* 260604 번역 */ },
                { value: "Central region"/* 260604 번역 */, label: "Central region (Chungcheong, Gangwon, Jeju)"/* 260604 번역 */ },
                { value: "Yeongnam Honam"/* 260604 번역 */, label: "Yeongnam/Honam (Jeolla, Gyeongsang)"/* 260604 번역 */ },
            ],
        },
        contentPlaceholderPc: "Please write your desired opening type. (Type GSF1, GSF2, GSF3)"/* 260604 번역 */,
        contentPlaceholderMobile: "Please write your desired opening type.\n(Type GSF1, GSF2, GSF3)"/* 260604 번역 */,
        submitLabel: "Apply"/* 260604 번역 */,
        cancelLabel: "Cancel",
    },
};

const t = computed(() => {
    const selected = langData[props.lang];
    return selected && Object.keys(selected).length ? selected : langData.ko;
});

const consentAgree = ref("");

const phoneOptions = [
    { value: "010", label: "010" },
    { value: "011", label: "011" },
    { value: "016", label: "016" },
    { value: "017", label: "017" },
    { value: "018", label: "018" },
    { value: "019", label: "019" },
];
const emailDomainOptions = [
    { value: "naver.com", label: "naver.com" },
    { value: "gmail.com", label: "gmail.com" },
    { value: "daum.net", label: "daum.net" },
    { value: "kakao.com", label: "kakao.com" },
    { value: "hanmail.net", label: "hanmail.net" },
];
const regionSidoOptions = computed(() => t.value.form.regionSidoOptions);
const seminarRegionOptions = computed(() => t.value.form.seminarRegionOptions);

const seminarForm = reactive({
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    emailId: "",
    emailDomain: "",
    emailDomainCustom: "",
    regionSido: "",
    regionSigungu: "",
    prevJob: "",
    seminarRegion: "",
    content: "",
});

const isMobile = ref(false);
const mq = window.matchMedia("(max-width: 768px)");
function onMqChange(e) { isMobile.value = e.matches; }
onMounted(() => { isMobile.value = mq.matches; mq.addEventListener("change", onMqChange); });
onUnmounted(() => { mq.removeEventListener("change", onMqChange); });

const contentPlaceholder = computed(() =>
    isMobile.value
        ? t.value.contentPlaceholderMobile
        : t.value.contentPlaceholderPc
);

function closeModal(event) {
    modal.close(event.currentTarget);
}
</script>

<style scoped>
.gsrst010201 { --color-brand-primary: #15b874; }
.gsrst010201 :deep([class*="btn_"][class*="primary"]) { color: #fff; background-color: var(--color-brand-primary); }

.smn_intro > p { color: #161616; font-size: 2rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.35; }
.consent_box { margin-top: 40px; border-radius: 12px; background-color: #f8f8f8; overflow: hidden; }
.consent_info { padding: 32px; }
.consent_info_title { color: #161616; font-size: 2.4rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.35; }
.consent_info_list { margin-top: 24px; display: flex; flex-direction: column; gap: 8px; }
.consent_info_list > li { padding-left: 10px; color: #67676f; font-size: 1.6rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.5; position: relative; }
.consent_info_list > li::before { content: ""; width: 4px; height: 1px; background-color: #67676f; position: absolute; left: 0; top: 0.5lh; }
.consent_notice { margin-top: 24px; padding-top: 24px; border-top: 1px solid #d7d7df; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.consent_notice > :deep(.input_wrap) { width: auto !important; flex: 0 1 auto;}
.consent_notice_text { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.24; }
.consent_notice :deep(.label) { font-size: 1.8rem; color: #161616; }
.consent_radio { width: 24px; height: 24px; padding: 0; appearance: none; border: 0; border-radius: 8px; background-color: #fff; cursor: pointer; flex-shrink: 0; position: relative; transition: border-color 0.2s, background-color 0.2s; }
.consent_radio:checked { border-color: #107af2; background-color: #107af2; }
.consent_radio:checked::after { width: 13px; height: 8px; background-color: #fff; content: ""; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.consent_radio_text { color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.4; }
.apply_form { margin-top: 40px; }
.form_head { height: 48px; padding-bottom: 16px; border-bottom: 1px solid #242428; display: flex; align-items: center; justify-content: space-between; }
.form_head_title { color: #161616; font-size: 2.4rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.35; }
.form_required_note { color: #fb6432; font-size: 1.4rem; line-height: 1.4; }
.form_body { padding: 12px 0; border-top: 1px solid #e5e5e9; }
.form_row { min-height: 52px; padding: 12px 0; display: grid; grid-template-columns: 134px 1fr; align-items: center; gap: 0 8px; }
.form_row_radio, .form_row_textarea { align-items: start; }
.form_label { color: #161616; font-size: 1.6rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.5; }
.form_required { margin-left: 2px; color: #fb6432; }
.form_field { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; min-width: 0; }
.form_field > :deep(.input_wrap) { flex: 1; min-width: 0; }
.form_sep { color: #67676f; font-size: 1.6rem; flex-shrink: 0; }
.form_field_phone :deep(.select) { width: 134px; flex-shrink: 0; }
.form_field_phone :deep(.select select) { width: 100%; font-size: 1.6rem; }
.form_field_phone > :deep(.input_wrap) { max-width: 134px; flex: 1; min-width: 80px; }
.form_field_email { align-items: center; }
.form_field_email > :deep(.input_wrap:nth-child(1)) { flex: 0 0 205px; width: 205px; min-width: 0; }
.form_field_email > :deep(.input_wrap:nth-child(3)) { flex: 0 0 180px; width: 180px; min-width: 0; }
.form_field_email :deep(.select) { flex: 0 0 180px; width: 180px; min-width: 0; }
.form_field_email :deep(.select select) { width: 100%; font-size: 1.6rem; }
.form_field_region { flex-wrap: nowrap; }
.form_field_region :deep(.select) { flex: 1; min-width: 0; }
.form_field_region :deep(.select select) { width: 100%; font-size: 1.6rem; }
.form_field_radio { padding: 13px 0; gap: 8px; }
.form_field_radio :deep(.input_wrap) { width: auto; flex: 0 0 auto; }
.form_field_radio :deep(.check) { gap: 8px; white-space: nowrap; cursor: pointer; }
.form_field_radio :deep(.label) { font-size: 1.8rem; color: #161616; }
.form_row_textarea .form_field { display: block; }
.form_field > :deep(.textarea_wrap) { width: 100%; }
.modal_bototm { margin-top: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.modal_bototm > :deep(.btn_big) { width: 134px; text-align: center; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }

@media (max-width: 768px) {
    .smn_modal { max-height: 100%; }
    .modal_wrap .modal_container { padding-bottom: 32px; }
    /* .smn_intro { display: none; } */
    .smn_intro > p { font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
    .consent_info { padding: 30px 20px; }
    .consent_info_list > li { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .consent_info_title { font-weight: 700; font-size: 1.8rem; line-height: 1.5; }
    .consent_notice { flex-direction: column; align-items: flex-start; gap: 16px; }
    .consent_notice_text { font-size: 1.4rem; line-height: 1.4; }
    .form_head { height: auto; padding-bottom: 12px; }
    .form_head_title { font-size: 2rem; }
    .form_body { padding: 30px 0; }
    .form_row { padding: 20px 0; grid-template-columns: 1fr; gap: 0; }
    .form_row:first-child { padding-top: 0; }
    .form_row:last-child { padding-bottom: 0; }
    .form_field_phone > :deep(.input_wrap) { max-width: none; flex: 1; }
    .form_field_email > :deep(.input_wrap:nth-child(1)) { flex: 1; min-width: 80px; }
    .form_field_email > :deep(.input_wrap:nth-child(3)) { flex: 1; min-width: 60px; }
    .form_field_email :deep(.select) { flex: 1 0 100%; width: 100%; }
    .form_field_region { flex-wrap: wrap; }
    .form_field_region :deep(.select) { flex: 1 0 100%; width: 100%; }
    .form_label { margin-bottom: 12px; }
    .consent_radio { width: 20px; height: 20px; }
    .consent_radio_text { font-size: 1.6rem; }
    .consent_notice :deep(.label) { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .form_field_radio { flex-direction: column; gap: 20px; align-items: flex-start; }
    .form_field_radio :deep(.label) { font-size: 1.6rem; letter-spacing: -0.01em; line-height: 1.5; }
    .modal_bototm { justify-content: center; }
    .modal_bototm > :deep(.btn_big) { width: 100%; flex: 1; }
}
</style>
