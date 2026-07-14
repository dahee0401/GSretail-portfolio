<template>
    <div class="modal_cont gsrbr020401">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <div class="intro_section">
                <p class="greeting_text" v-html="t.Greeting"></p>
                <div class="desc_box">
                    <p class="desc_text" v-html="t.SubDesc"></p>
                </div>
            </div>

            <div class="consent_container">
                <div class="consent_header">
                    <h3 class="consent_title">{{ t.ConsentTitle }}</h3>
                    <ul class="bullet_list">
                        <li v-for="(item, idx) in t.ConsentItems" :key="idx">{{ item }}</li>
                    </ul>
                </div>
                <div class="consent_footer">
                    <p class="refuse_notice" v-html="t.RefuseNotice"></p>
                    <div class="agree_check">
                        <Inputs type="checkbox" :text="t.AgreeLabel" v-model="form.isAgree" />
                    </div>
                </div>
            </div>

            <div class="application_form">
                <div class="form_section">
                    <div class="section_title_row">
                        <h4 class="section_title">{{ t.SectionCustomer }}</h4>
                        <span class="required_guide">{{ t.RequiredGuide }}</span>
                    </div>
                    <div class="input_rows">
                        <div class="form_row">
                            <label class="row_label">{{ t.LabelName }}<span class="ess">*</span></label>
                            <div class="row_content">
                                <Inputs type="text" v-model="form.name" class="w205" />
                            </div>
                        </div>
                        <div class="form_row">
                            <label class="row_label">{{ t.LabelEmail }}<span class="ess">*</span></label>
                            <div class="row_content email_row">
                                <Inputs type="text" v-model="form.emailId" />
                                <span class="unit">@</span>
                                <Inputs type="text" v-model="form.emailDomain" />
                                <SelectBox :options="t.EmailOptions" v-model="form.emailDomainSelect" class="w180" />
                            </div>
                        </div>
                        <div class="form_row">
                            <label class="row_label">{{ t.LabelPhone }}<span class="ess">*</span></label>
                            <div class="row_content phone_row">
                                <SelectBox :options="t.PhoneOptions" v-model="form.phone1" class="w134" />
                                <span class="unit">-</span>
                                <Inputs type="text" v-model="form.phone2" class="w134" />
                                <span class="unit">-</span>
                                <Inputs type="text" v-model="form.phone3" class="w134" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form_section">
                    <div class="section_title_row">
                        <h4 class="section_title">{{ t.SectionConsult }}</h4>
                        <span class="required_guide">{{ t.RequiredGuide }}</span>
                    </div>
                    <div class="input_rows">
                        <div class="form_row align_top">
                            <label class="row_label">{{ t.LabelAddress }}<span class="ess">*</span></label>
                            <div class="row_content address_row">
                                <div class="zip_code">
                                    <Inputs type="text" v-model="form.zipCode" readonly />
                                    <Buttons type="button" class="btn_big border" @click="searchPost">{{ t.BtnZip }}</Buttons>
                                </div>
                                <div class="address_detail_group">
                                    <Inputs type="text" v-model="form.addrBasic" :placeholder="t.PlaceholderAddrBasic" :isDisabled="true" />
                                    <Inputs type="text" v-model="form.addrDetail" :placeholder="t.PlaceholderAddrDetail" :isDisabled="true" />
                                </div>
                            </div>
                        </div>
                        <div class="form_row">
                            <label class="row_label">{{ t.LabelArea }}</label>
                            <div class="row_content area_row">
                                <div class="area_item">
                                    <span>{{ t.hp01 }}</span>
                                    <Inputs type="text" v-model="form.areaContract" class="w134" />
                                    <span class="unit">m²</span>
                                </div>
                                <div class="area_item">
                                    <span>{{ t.hp02 }}</span>
                                    <Inputs type="text" v-model="form.areaPrivate" class="w134" />
                                    <span class="unit">m²</span>
                                </div>
                                <span class="area_guide">{{ t.AreaGuide }}</span>
                            </div>
                        </div>
                        <div class="form_row">
                            <label class="row_label">{{ t.LabelStoreName }}</label>
                            <div class="row_content">
                                <Inputs type="text" v-model="form.areaPrivate" class="w347" />
                            </div>
                        </div>
                        <div class="form_row">
                            <label class="row_label">{{ t.LabelFeature }}</label>
                            <div class="row_content w100">
                                <Textarea
                                    v-model="body"
                                    name="inquiry_body"
                                    :placeholder="t.PlaceholderBody"
                                    :hint="t.HintBody"
                                    :rows="6"
                                    :maxlength="500"
                                />
                            </div>
                        </div>
                        <div class="form_row">
                            <label class="row_label">{{ t.LabelRelation }}</label>
                            <div class="row_content">
                                <Inputs type="text" v-model="form.areaPrivate" class="w347" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="button_area">
                <Buttons type="button" class="btn_big primary" @click="submitForm">{{ t.BtnSubmit }}</Buttons>
                <Buttons type="button" class="btn_big gray" @click="resetForm">{{ t.BtnReset }}</Buttons>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue";
import Buttons from "@/components/Buttons.vue";
import Textarea from "@/components/Textarea.vue";

export default {
    name: "GsSiteProposalDetail",
    components: {
        Inputs,
        SelectBox,
        Buttons,
        Textarea,
    },
    data() {
        return {
            page: 1,
            form: {
                isAgree: false, name: "", emailId: "", emailDomain: "", emailDomainSelect: "",
                phone1: "010", phone2: "", phone3: "", zipCode: "", addrBasic: "", addrDetail: "",
                areaContract: "", areaPrivate: "", storeName: "", feature: "", relation: ""
            },
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "입지제안",
                    Greeting: "안녕하세요!<br/>GS THE FRESH 입지상담 담당자입니다.",
                    SubDesc: "아래의 상담 신청서를 작성하시면 귀하만의 상담을 받아 보실 수 있습니다.<br/>상담신청 시, 담당자 확인 후 연락드리겠습니다.",
                    ConsentTitle: "개인정보 수집·이용 동의",
                    ConsentItems: [
                        "입력하신 정보는 입지상담을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같으며,기타 개인정보 취급사항은 홈페이지 하단의 '개인정보 처리방침'을 참고하시기 바랍니다.",
                        "수집하는 개인정보 항목: 이름, 이메일, 휴대폰번호",
                        "수집이용 및 목적: 수집한 개인정보를 본인 식별 및 문의사항 확인 및 답변을 위해 활용",
                        "보유 및 이용기간: 접수 후 1년"
                    ],
                    RefuseNotice: "고객님께서는 본 동의에 거부하실 권리가 있으나, <br/>동의하지 않으실 경우 입지제안 신청 글 작성이 불가능합니다.",
                    AgreeLabel: "동의합니다.",
                    SectionCustomer: "고객정보",
                    SectionConsult: "상담내용",
                    RequiredGuide: "* 필수 입력사항",
                    LabelName: "이름", LabelEmail: "이메일", LabelPhone: "휴대폰",
                    LabelAddress: "추천점포 소재지", LabelArea: "추천점포 면적", LabelStoreName: "점포상호", LabelFeature: "상권특징", LabelRelation: "건물주와의 관계",
                    BtnZip: "우편번호 찾기", BtnSubmit: "상담신청", BtnReset: "다시작성",
                    hp01: "계약면적", hp02: "전용면적",
                    PlaceholderBody: "내용을 입력해 주세요", HintBody: "최대 500자까지 입력할 수 있습니다.", AlertAgree: "동의 항목에 체크해주세요.",
                    PlaceholderAddrBasic: "기본주소", PlaceholderAddrDetail: "상세주소", PlaceholderRelation: "예: 본인 소유, 임차인 등",
                    AreaGuide: "* m² = (기준)평 x 3.3",
                    EmailOptions: [{ value: "", label: "직접입력" }, { value: "naver.com", label: "naver.com" }, { value: "gmail.com", label: "gmail.com" }],
                    PhoneOptions: [{ value: "010", label: "010" }, { value: "011", label: "011" }],
                    RelationOptions: [{ value: "본인", label: "본인 소유" }, { value: "임차인", label: "임차인" }],
                    StoreOptions: [{ value: "", label: "선택하세요" }, { value: "store01", label: "상호A" }],
                    FeatureOptions: [{ value: "", label: "선택하세요" }, { value: "feat01", label: "상권A" }]
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Location Inquiry",
                    Greeting: "Hello!<br/>I am a GS THE FRESH location consultation representative."/* 260604 번역 */,
                    SubDesc: "Fill out the consultation request form below to receive a consultation tailored just for you.<br/>Once you submit your consultation request, our representative will review it and contact you."/* 260604 번역 */,
                    ConsentTitle: "Consent to Collection and Use of Personal Information",
                    ConsentItems: [
                        "The information you provide is used solely for location consultation. The items collected, the use and purpose, and the retention and use period are as follows. For other matters regarding the handling of personal information, please refer to the 'Privacy Policy' at the bottom of the website."/* 260604 번역 */,
                        "Personal information items collected: name, email, mobile phone number"/* 260604 번역 */,
                        "Collection, Use, and Purpose: The collected personal information is used for identity verification and to verify and respond to inquiries."/* 260604 번역 */,
                        "- Retention and Use Period: One year after receipt"
                    ],
                    RefuseNotice: "You have the right to refuse this consent; however, <br/>If you do not agree, you will not be able to submit a location proposal application."/* 260604 번역 */,
                    AgreeLabel: "I agree.",
                    SectionCustomer: "Customer Information",
                    SectionConsult: "Consultation Content",
                    RequiredGuide: "* Required fields",
                    LabelName: "Name", LabelEmail: "Email", LabelPhone: "Mobile phone"/* 260604 번역 */,
                    LabelAddress: "Recommended store location"/* 260604 번역 */, LabelArea: "Recommended store area"/* 260604 번역 */, LabelStoreName: "Store name"/* 260604 번역 */, LabelFeature: "Commercial Area Characteristics"/* 260604 번역 */, LabelRelation: "Relationship with the Building Owner"/* 260604 번역 */,
                    BtnZip: "Find postal code"/* 260604 번역 */, BtnSubmit: "Consultation Request"/* 260604 번역 */, BtnReset: "Rewrite"/* 260604 번역 */,
                    hp01: "Contract Area"/* 260708 번역 */, hp02: "Exclusive Area"/* 260708 번역 */,
                    PlaceholderBody: "Please enter your content"/* 260708 번역 */, HintBody: "You can enter up to 500 characters."/* 260708 번역 */, AlertAgree: "Please check the consent items."/* 260708 번역 */,
                    PlaceholderAddrBasic: "Base Address"/* 260604 번역 */, PlaceholderAddrDetail: "Detailed address"/* 260604 번역 */, PlaceholderRelation: "e.g., owner-occupied, tenant, etc."/* 260604 번역 */,
                    AreaGuide: "* m² = (standard) pyeong x 3.3"/* 260604 번역 */,
                    EmailOptions: [{ value: "", label: "Enter directly" }, { value: "naver.com", label: "naver.com" }, { value: "gmail.com", label: "gmail.com" }],
                    PhoneOptions: [{ value: "010", label: "010" }, { value: "011", label: "011" }],
                    RelationOptions: [{ value: "Self"/* 260604 번역 */, label: "Owned by Self"/* 260604 번역 */ }, { value: "Tenant"/* 260604 번역 */, label: "Tenant"/* 260604 번역 */ }],
                    StoreOptions: [{ value: "", label: "Please select"/* 260604 번역 */ }, { value: "store01", label: "Business Name A"/* 260604 번역 */ }],
                    FeatureOptions: [{ value: "", label: "Please select"/* 260604 번역 */ }, { value: "feat01", label: "Commercial Area A"/* 260604 번역 */ }]
                }
            }
        };
    },
    computed: {
        t() { return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko; }
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); },
        searchPost() { console.log("우편번호 찾기"); },
        submitForm() {
            if (!this.form.isAgree) { alert(this.t.AlertAgree); return; }
            console.log("제출", this.form);
        },
        resetForm() { this.form = { isAgree: false, name: "", emailId: "", emailDomain: "", emailDomainSelect: "", phone1: "010", phone2: "", phone3: "", zipCode: "", addrBasic: "", addrDetail: "", areaContract: "", areaPrivate: "", storeName: "", feature: "", relation: "" }; }
    }
};
</script>

<style scoped>
.modal_header { flex-shrink: 0; display: flex; align-items: center; justify-content: space-between; padding-bottom: 40px; font-family: "Pretendard", Helvetica; font-weight: 700; font-size: 40px; color: #161616; border-bottom: 0; }
.modal_content { flex: 1; overflow-y: auto; padding-right: 10px; }
.intro_section { margin-bottom: 40px; display: flex; flex-direction: column; gap: 16px; }
.greeting_text { font-family: "Pretendard", Helvetica; font-weight: 700; font-size: 32px; color: #161616; line-height: 1.3; }
.desc_text { font-family: "Pretendard", Helvetica; font-size: 1.8rem; line-height: 1.4; color: #161616; }
.consent_container { padding: 32px; background-color: #f8f8f8; border-radius: 12px; margin-bottom: 40px; }
.consent_title { font-size: 24px; font-weight: 700; color: #161616; margin-bottom: 24px; }
.bullet_list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
.bullet_list li { position: relative; padding-left: 12px; font-size: 16px; color: #67676f; line-height: 1.5; }
.bullet_list li::before { content: ''; position: absolute; left: 0; top: 10px; width: 4px; height: 1px; background: #67676f; }
.consent_footer { display: flex; align-items: center; justify-content: space-between; padding-top: 24px; border-top: 1px solid #d7d7df; }
.refuse_notice { font-size: 16px; font-weight: 700; color: #161616; line-height: 1.2; }
.application_form { display: flex; flex-direction: column; gap: 64px; }
.form_section { display: flex; flex-direction: column; }
.section_title_row { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid #242428; }
.section_title { font-size: 24px; font-weight: 700; color: #161616; }
.required_guide { font-size: 14px; color: #fb6432; }
.input_rows { display: flex; flex-direction: column; padding: 24px 0; border-bottom: 1px solid #e5e5e9; gap: 24px; }
.form_row { display: flex; align-items: center; }
.form_row.align_top { align-items: flex-start; }
/* 🔥 PC 라벨 정렬: 입력창 시작 지점 일치 */
.row_label { width: 160px; flex-shrink: 0; font-size: 16px; color: #161616; display: flex; align-items: center; gap: 4px; }
.ess { color: #fb6432; }
.row_content {display: flex; align-items: center; gap: 8px; }
.email_row, .phone_row { display: flex; align-items: center; gap: 8px; }
.unit { color: #67676f; font-size: 16px; }
.address_row {width:100%; flex-direction: column; align-items: flex-start; gap: 8px; }
.zip_code { display: flex; gap: 8px; }
.area_row { display: flex; align-items: center; gap: 24px;}
.area_item { display: flex; align-items: center; gap: 8px; }
.area_guide { font-size: 14px; color: #107af2; }
.button_area { display: flex; justify-content: flex-end; gap: 8px; margin-top: 40px; }
.w205 { width: 205px; } .w180 { width: 180px; } .w134 { width: 134px; } .w347 { width: 347px; } .w100 { width: 100%; }
.btn_big.border {height:auto !important;}
/* 🔥 PC: 주소 입력 필드 5:5 배치를 위한 스타일 */
.address_detail_group { display: flex; gap: 8px; width: 100%; }
.address_detail_group :deep(.input_wrap) { flex: 1; }

/* 태블릿 반응형 */
@media screen and (max-width: 1024px) {
    .modal_cont.gsrbr020401 {
        padding: 0;
    }
    .consent_footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }
    .form_row {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
    }
    .row_label {
        width: 100%;
    }
    .row_content {
        width: 100%;
    }
    .w205, .w180, .w134, .w347 {
        width: 100%;
    }
    .area_row {
        gap: 12px;
    }
}

/* 모바일 반응형: 767px 이하 한 줄 배치 */
@media screen and (max-width: 767px) {
    .consent_container {
        padding: 20px;
    }
    .email_row, .phone_row {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
        width: 100%;
    }
    .email_row :deep(.input_wrap), 
    .phone_row :deep(.input_wrap), 
    .phone_row :deep(.select_wrap),
    .address_row :deep(.input_wrap) {
        width: 100% !important;
    }
    .unit {
        display: none;
    }
    .area_item {
        width: 100%;
        justify-content: space-between;
    }
    .area_item .unit {
        display: block;
    }
    .address_detail_group {
        flex-direction: column;
        width: 100%;
        gap: 12px;
    }
    .address_detail_group :deep(.input_wrap) {
        width: 100% !important;
    }
    .area_row {flex-wrap:wrap;}
}
</style>