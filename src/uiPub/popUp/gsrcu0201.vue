<template>
    <div class="modal_cont delivery_modal">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <section class="listening_form_area">
                <i v-html="t.listening.Txt"></i>
                <div class="section_title_area">
                    <h4 class="section_title_sub">{{ t.listening.Title }}</h4>
                    <p class="p_desc" v-html="t.listening.Desc"></p>
                </div>
                
                <div class="consent_container">
                    <article v-for="(consent, cIdx) in t.listening.Consents" :key="'consent-'+cIdx" class="consent_box">
                        <strong class="consent_tit">{{ consent.title }}</strong>
                        <ul class="consent_list">
                            <li v-for="(list, lIdx) in consent.items" :key="'list-'+lIdx">{{ list }}</li>
                        </ul>
                        <div class="consent_agree">
                            <p class="guide_text" v-html="consent.guide"></p>
                            <Inputs type="checkbox" :text="t.agreeLabel" v-model="formData.agreements[cIdx]" />
                        </div>
                    </article>
                </div>

                <!-- 260508: hgkim: class="off" 추가시 displya:none 처리됨 -->
                <article class="noti_non_member">
                    <span>{{ t.listening.Nonmember.title }}</span>
                    <ul class="bullet_01">
                        <li v-for="(list, lIdx) in t.listening.Nonmember.items" :key="'list-'+lIdx">{{ list }}</li>
                    </ul>
                </article>

                <div class="form_container">
                    <article class="listening_form_wrap">
                        <div class="form_section">
                            <div class="form_header">
                                <h5 class="form_title">{{ t.listening.InputWrapcont.part1.title }}</h5>
                                <span class="required_guide">{{ t.listening.InputWrapcont.part1.requiredText }}</span>
                            </div>
                            <div class="form_body">
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part1.nameLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item">
                                        <Inputs type="text" v-model="formData.name" :placeholder="t.listening.InputWrapcont.part1.namePlaceholder" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part1.emailLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_group email">
                                        <div class="group_wrap">
                                            <div class="input_flex_item"><Inputs type="text" v-model="formData.emailId" :placeholder="t.listening.InputWrapcont.part1.emailIdPlaceholder" /></div>
                                            <span class="unit">@</span>
                                            <div class="input_flex_item"><Inputs type="text" v-model="formData.emailDomain" :placeholder="t.listening.InputWrapcont.part1.emailDomainPlaceholder" /></div>
                                        </div>
                                        <SelectBox :options="t.listening.InputWrapcont.part1.emailOptions" v-model="formData.emailSelect" :initMsg="t.listening.InputWrapcont.part1.directInput" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part1.telLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_group">
                                        <div class="input_flex_item">
                                            <SelectBox :options="t.listening.InputWrapcont.part1.telOptions" v-model="formData.tel1" :initMsg="t.selectDefault" />
                                        </div>
                                        <span class="unit">-</span>
                                        <div class="input_flex_item"><Inputs type="text" v-model="formData.tel2" /></div>
                                        <span class="unit">-</span>
                                        <div class="input_flex_item"><Inputs type="text" v-model="formData.tel3" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form_section">
                            <div class="form_header">
                                <h5 class="form_title">{{ t.listening.InputWrapcont.part2.title }}</h5>
                                <span class="required_guide">{{ t.listening.InputWrapcont.part1.requiredText }}</span>
                            </div>
                            <div class="form_body">
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.Inquirytype }}</span>
                                    </div>
                                    <div class="input_item full">
                                        <span>{{ t.hp01 }}</span>
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.categoryLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.part2.categoryOptions" v-model="formData.Inquiry" :initMsg="t.listening.InputWrapcont.part2.Consulting" class="w428" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.Consulting }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.part2.ConsultingyOptions" v-model="formData.category" :initMsg="t.listening.InputWrapcont.part2.selectPlaceholder" class="w428" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.subjectLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <Inputs type="text" v-model="formData.subject" :placeholder="t.listening.InputWrapcont.part2.subjectPlaceholder" class="w428"/>
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.contentLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_complex">
                                        <Textarea v-model="formData.body" :placeholder="t.listening.InputWrapcont.part2.contentPlaceholder" :rows="6" :maxlength="500" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.fileLabel }}</span>
                                    </div>
                                    <div class="input_complex">
                                        <FileUpload :lang="lang" :multiple="true" accept="*" @update:files="onFiles" />
                                        <p class="guide_msg">{{ t.listening.InputWrapcont.part2.fileNotice }}</p>
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.replyLabel }}</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.part2.replyOptions" v-model="formData.replyType" :initMsg="t.listening.InputWrapcont.part2.replySelect" class="w428"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <div class="btn-wrap">
                        <Buttons btn-class="btn_big primary"  @click="openModal" data-popid="gsrcu020101" data-type="small" data-cont="gsrcu020101">{{ t.listening.InputWrapcont.part2.btnSubmit }}</Buttons>
                        <Buttons btn-class="btn_big gray" @click="closeModal">{{ t.listening.InputWrapcont.part2.btnCancel }}</Buttons>
                    </div>
                </div>
            </section>
        </div>

        <!-- 상담신청완료 팝업 -->
        <teleport to="body">
            <div id="gsrcu020101" class="modal_wrap">
                <div class="modal_container"></div>
            </div>
        </teleport>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue"; 
import Textarea from "@/components/Textarea.vue";
import FileUpload from "@/components/FileUpload.vue";

export default {
    name: "gsrcu0101",
    components: { Buttons, Inputs, SelectBox, Textarea, FileUpload },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            isMobile: false,
            formData: {
                agreements: [false, false],
                name: "", emailId: "", emailDomain: "", emailSelect: "",
                tel1: "", tel2: "", tel3: "", category: "", storeName: "", Inquiry:"",
                subject: "", body: "", replyType: ""
            },
            langData: {
                ko: {
                    hp01: "제휴 및 협력문의",
                    closeLabel: "닫기",
                    agreeLabel: "동의합니다.",
                    selectDefault: "선택",
                    MainTitle: "고객의 소리",
                    listening: {
                        Txt:"언제나 고객님의 입장이 되어<br/> 작은 소리에도 귀를 기울이겠습니다.",
                        Title: "제휴 및 협력문의",
                        Desc: "제휴 및 협력, 제안할 점 등에 대해 의견을 남겨주세요.",
                        Consents: [
                            {
                                title: "개인정보 제3자 제공 동의",
                                items: [
                                    "입력하신 정보는 신속하고 정확한 처리를 위해 해당 점포 경영주에게 전달되며 문의 및 컴플레인 응대를 위해서 사용됩니다.",
                                    "제공받는 자: 고객님이 문의 신청한 GS25 관리자와 GS25에 입점 된 상품의 제조사/유통사(수입사)",
                                    "이용 목적: 문의사항 확인, 답변 및 만족도 조사를 위해 활용",
                                    "개인정보 항목: 이름, 연락처, 이메일",
                                    "보유 및 이용기간: 접수 후 1년"
                                ],
                                guide: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우<br/> 정보가 확인해야 하는 문의에 대해 정확하고 신속한 답변을 받으시는데 어려움이 있습니다."
                            },
                            {
                                title: "개인정보 수집·이용 동의",
                                items: [
                                    "입력하신 정보는 문의사항에 대한 확인을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같으며, 기타 개인정보 취급사항은 홈페이지 하단의 '개인정보 처리방침'을 참고하시기 바랍니다.",
                                    "수집하는 개인정보 항목: 이름, 연락처, 이메일",
                                    "수집이용 및 목적: 수집한 개인정보를 본인 식별, 문의사항 확인, 답변 및 만족도 조사, 서비스 개선 등을 위한 통계 분석을 위해 활용",
                                    "보유 및 이용기간: 접수 후 1년"
                                ],
                                guide: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우<br/> 문의 글 작성이 불가능합니다."
                            }
                        ],
                        Nonmember: {
                            title: "고객님께서는 현재 비회원(비로그인)으로 문의를 접수 중이십니다.",
                            items: [
                                "비회원 문의를 하신 경우 답변은 '등록하신 연락처(문자,전화) 또는 이메일을 통해서만' 확인하실 수 있습니다.",
                                "연락처를 정확하게 입력해주세요. (홈페이지 내에서 이전 문의이력 확인 불가)",
                                "로그인 후 고객문의를 접수하시면, 마이페이지에서 문의/답변 내역 확인이 가능합니다.(단,정도경영 제외)"
                            ]
                        },
                        InputWrapcont: {
                            part1: {
                                title: "고객정보",
                                requiredText: "* 필수 입력사항",
                                directInput: "직접입력",
                                emailIdPlaceholder: "이메일 아이디",
                                emailDomainPlaceholder: "도메인 입력",
                                nameLabel: "이름",
                                namePlaceholder: "이름을 입력해주세요",
                                emailLabel: "이메일",
                                emailOptions: [{ value: 'naver.com', label: 'naver.com' }, { value: 'gmail.com', label: 'gmail.com' }],
                                telLabel: "연락처",
                                telOptions: [{ value: '010', label: '010' }, { value: '011', label: '011' }]
                            },
                            part2: {
                                title: "상담내용",
                                Inquirytype:'문의유형',
                                categoryLabel: "구분",
                                categoryOptions: [{ value: 'store', label: '편의점/수퍼' }, { value: 'home', label: '홈쇼핑' }],
                                Consulting:"상담구분 선택",
                                selectPlaceholder: "선택해주세요.",
                                subjectPlaceholder: "제목을 입력해주세요",
                                replySelect: "회신방법 선택",
                                ConsultingyOptions: [{ value: 'store', label: '편의점/수퍼' }, { value: 'home', label: '홈쇼핑' }],
                                storeLabel: "매장명",
                                storeGuide: "* 단, 점포명을 모르시는 경우 점포위치를 적어주세요",
                                subjectLabel: "제목",
                                contentLabel: "내용",
                                contentPlaceholder: "문의사항을 입력해주세요.",
                                fileLabel: "파일첨부",
                                fileNotice: "* 여러 개의 파일 업로드 시 zip파일로 압축하여 올려주세요 (*용량제한 20MB)",
                                replyLabel: "회신방법",
                                replyOptions: [{ value: 'email', label: '이메일' }, { value: 'sms', label: 'SMS' }],
                                btnSubmit: "신청",
                                btnCancel: "취소"
                            }
                        }
                    }
                },
                en: {
                    hp01: "Partnership & Cooperation Inquiry"/* 260708 번역 */,
                    closeLabel: "Close"/* 260708 번역 */,
                    agreeLabel: "I agree."/* 260708 번역 */,
                    selectDefault: "Select"/* 260708 번역 */,
                    MainTitle: "Customer Feedback",
                    listening: {
                        Txt:"We will always put ourselves in our customers' shoes and listen even to the smallest voice.",
                        Title: "Partnership and Collaboration Inquiry",
                        Desc: "Please leave your comments, suggestions, etc., regarding partnerships and collaborations.",
                        Consents: [
                            {
                                title: "Consent to Third-Party Provision of Personal Information",
                                items: [
                                    "The information you enter will be forwarded to the owner of the relevant store for prompt and accurate handling, and will be used to respond to inquiries and complaints.",
                                    "Recipients: The GS25 administrator you submitted your inquiry to, and the manufacturer/distributor (importer) of the products stocked at GS25"/* 260604 번역 */,
                                    "Purpose of use: Used to confirm inquiries and conduct responses and satisfaction surveys."/* 260604 번역 */,
                                    "Personal Information Items: Name, contact number, email",
                                    "- Retention and Use Period: One year after receipt"
                                ],
                                guide: "※ You have the right to refuse this consent; however, if you do not consent, you may experience difficulty receiving prompt and accurate responses to inquiries that require verification."
                            },
                            {
                                title: "Consent to Collection and Use of Personal Information",
                                items: [
                                    "The information you enter is used solely to address your inquiry. The collected items, use and purpose, and retention and use period are as follows. For other personal information handling matters, please refer to the 'Privacy Policy' at the bottom of the website."/* 260604 번역 */,
                                    "Items of personal information collected: Name, contact number, email",
                                    "Collection, use, and purpose: The collected personal information is used for identity verification, inquiry confirmation, responses and satisfaction surveys, and statistical analysis for service improvement."/* 260604 번역 */,
                                    "- Retention and Use Period: One year after receipt"
                                ],
                                guide: "You have the right to refuse this consent; however, if you do not consent,<br/> Writing an inquiry is not possible."/* 260604 번역 */
                            }
                        ],
                        Nonmember: {
                            title: "You are currently submitting your inquiry as a non-member (not logged in)."/* 260604 번역 */,
                            items: [
                                "If you make an inquiry as a non-member, the response can be checked 'only through the contact information you registered (text message, phone call) or email.'"/* 260604 번역 */,
                                "Please enter your contact information accurately. (Previous inquiry history cannot be checked within the website.)"/* 260604 번역 */,
                                "If you submit a customer inquiry after logging in, you can check the inquiry/response history on My Page. (Except for Integrity Management)"/* 260604 번역 */
                            ]
                        },
                        InputWrapcont: {
                            part1: {
                                title: "Customer Information",
                                requiredText: "* Required fields",
                                directInput: "Direct input"/* 260708 번역 */,
                                emailIdPlaceholder: "Email ID"/* 260708 번역 */,
                                emailDomainPlaceholder: "Enter domain"/* 260708 번역 */,
                                nameLabel: "Name",
                                namePlaceholder: "Please enter your name"/* 260604 번역 */,
                                emailLabel: "Email",
                                emailOptions: [{ value: 'naver.com', label: 'naver.com' }, { value: 'gmail.com', label: 'gmail.com' }],
                                telLabel: "Contact",
                                telOptions: [{ value: '010', label: '010' }, { value: '011', label: '011' }]
                            },
                            part2: {
                                title: "Consultation Content",
                                Inquirytype:'Inquiry Type',
                                categoryLabel: "Category",
                                categoryOptions: [{ value: 'store', label: 'Convenience store/supermarket'/* 260604 번역 */ }, { value: 'home', label: 'Home Shopping' }],
                                Consulting:"Select Consultation Category",
                                selectPlaceholder: "Please select."/* 260708 번역 */,
                                subjectPlaceholder: "Please enter a title"/* 260708 번역 */,
                                replySelect: "Select reply method"/* 260708 번역 */,
                                ConsultingyOptions: [{ value: 'store', label: 'Convenience store/supermarket'/* 260604 번역 */ }, { value: 'home', label: 'Home Shopping' }],
                                storeLabel: "Store Name",
                                storeGuide: "If you do not know the store name, please write the store location.",
                                subjectLabel: "Title",
                                contentLabel: "Details",
                                contentPlaceholder: "Please enter any questions related to store onboarding",
                                fileLabel: "File Attachment",
                                fileNotice: "* When uploading multiple files, please compress them into a zip file (* File size limit: 20MB)",
                                replyLabel: "Reply Method",
                                replyOptions: [{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }],
                                btnSubmit: "Apply"/* 260604 번역 */,
                                btnCancel: "Cancel"
                            }
                        }
                    }
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
        closeModal(event) { modal.close(event.currentTarget); },
        submitForm() { console.log("Form Data:", this.formData); },
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default"; // data-type 속성 읽기
            const cont = el.dataset.cont; // data-cont 속성 읽기
            modal.open(popId, type, el, cont); // 4개 인자 모두 전달
        },
    }
};
</script>

<style scoped>
.off {display:none;}
.modal_header {width:100%; padding-bottom:0; color:#161616; font-size:40px; font-weight:700; display:flex; align-items:center; justify-content:space-between; border-bottom:0 !important;}
.modal_content {width:100%; overflow-y:auto; flex:1;}
section {padding-bottom:80px;}
.input_wrap {display:flex; align-items:center; justify-content:flex-end;}
.listening_form_area i {margin-bottom:40px; font-size:20px; display:block;}
:deep(.listening_form_area) i br {display:none;}
.section_title_area {margin-bottom:40px;}
.section_title_area h4 {margin-bottom:8px; font-size:24px;}
.section_title_area .p_desc { font-size:16px; font-weight: 400; color: #161616; line-height: 1.5; word-break: keep-all; }
.noti_non_member {padding:24px; background:#F9F2EA; border-radius:12px;}
.noti_non_member span {margin-bottom:12px; padding-left:34px; font-size:18px; position:relative; display:block;}
.noti_non_member span::before {content:''; width:24px; height:24px; background: url(http://localhost:8080/img/icon_set_24.5b5c044c.png) -160px -56px no-repeat; display:inline-block; position:absolute; top:0; left:0px;}
.noti_non_member ul {padding-left:34px;}
.noti_non_member ul li {font-size:16px;}
.listening_form_area .consent_box { background-color: #f8f8f8; padding: 32px; border-radius: 12px;}
.listening_form_area .consent_tit {margin-bottom: 24px; font-size: 24px; font-weight: 700; display: block; }
.listening_form_area .consent_list {padding-bottom:24px;}
.listening_form_area .consent_list li { font-size: 16px; color: #67676f; margin-bottom: 8px; position: relative; padding-left: 12px; }
.listening_form_area .consent_list li::before { content: ""; position: absolute; left: 0; top: 10px; width: 4px; height: 1px; background-color: #67676f; }
.listening_form_area .form_table { border-top: 1px solid #242428; }
.listening_form_area .form_row { display: flex; align-items: center; }
.listening_form_area .form_row .label { width: 134px; padding: 24px; font-size: 16px; color: #161616; }
.listening_form_area .required { color: #fb6432; }
.listening_form_area input, .listening_form_area textarea { width: 100%; padding: 14px 16px; border: 1px solid #c4c4d0; border-radius: 12px; font-size: 16px; }
.listening_form_area textarea { height: 160px; resize: none; }
.listening_form_area .consent_agree {padding-top:24px; border-top:1px solid #D7D7DF; display:flex; justify-content:space-between; align-items:center;}
.listening_form_area .consent_agree p {font-size:16px; font-weight:700;}
.listening_form_area article {margin-bottom:40px;}
.listening_form_wrap .form_header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid #242428; }
.listening_form_wrap .form_title { font-size: 24px; font-weight: 700; color: #161616; }
.listening_form_wrap .required_guide { font-size: 14px; color: #fb6432; }
.form_section:first-of-type {margin-bottom:64px;}
.listening_form_wrap .form_body {padding:10px 0 12px; border-bottom: 1px solid #e5e5e9; }
.listening_form_wrap .form_row { display: flex; align-items: flex-start; gap: 8px; padding: 12px 0; }
.listening_form_wrap .label_item { display: flex; width: 134px; align-items: center; gap: 4px; padding-top: 14px; }
.listening_form_wrap .label_text { font-size: 16px; color: #161616; }
.listening_form_wrap .required_mark { color: #fb6432; font-size: 16px; }
.listening_form_wrap .input_group { display: flex; align-items: center; gap: 8px;}
.listening_form_wrap .input_group .group_wrap { display: flex; align-items: center; gap: 8px;}
.listening_form_wrap .input_flex_item { flex: 1; min-width: 0; }
.listening_form_wrap .unit { color: #67676f; font-size: 16px; padding: 0 4px; }
.listening_form_wrap .input_complex {width:calc(100% - 134px);  display: flex; flex-direction: column; gap: 8px;}
.listening_form_wrap .input_complex .textarea_wrap {max-width:600px;}
.listening_form_wrap .guide_msg { font-size: 14px; color: #67676f; }
.listening_form_wrap .guide_msg_multi { font-size: 12px; color: #67676f; line-height: 18px; margin-top: 8px; }
.listening_form_wrap .file_upload_group { display: flex; align-items: center; gap: 10px; }
.listening_form_wrap .btn_file { height: 38px; padding: 0 12px; font-size: 16px; cursor: pointer; }
.listening_form_wrap .file_name { font-size: 14px; color: #161616; }
.form_container .btn-wrap {display:flex; justify-content:flex-end; gap:8px;}
.form_container .btn-wrap * {width:134px;}
.w428 {width:428px; display:inline-block;}


@media screen and (max-width: 1024px) {
    .listening_form_wrap .form_row {flex-direction:column;}
    .w428 {width:100%;}
}
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px;}
    .input_item, .input_complex, .input_wrap, .w428 {width:100%;}
    .input_item.full span {font-size:20px; font-weight:700;}
    .section_title_sub {font-size:16px !important;}
    .p_desc {font-size:14px;}
    .listening_form_area i {font-weight:700;}
    :deep(.listening_form_area) i br {display:block;}
    .listening_form_area .consent_box {padding:30px 20px;}
    .listening_form_wrap .input_group.email {flex-direction:column; align-items:stretch;}
    .consent_agree {flex-direction:column; align-items:flex-start; gap:15px;}
    .guide_text + .input_wrap {justify-content:flex-start;}
    .form_container .btn-wrap {display:flex; justify-content:flex-start; gap:8px;}
    .form_container .btn-wrap * {width:50%;}
    .form_body .form_row:first-of-type .label_item {padding-top: 0px;}
    .consent_tit {font-size:18px !important;}
    .consent_list li, .consent_agree p  {font-size:14px !important;}
    :deep(.check) em {font-size:16px !important;}
    :deep(.guide_text) br {display:none;}
    .noti_non_member span {font-size:14px;}
    .noti_non_member ul {padding-left:0;}
    .noti_non_member ul li {font-size:12px;}
    .listening_form_wrap .guide_msg_multi {font-size:14px;}
    :deep(.guide_msg_multi) span {margin-bottom:8px; display:block;}
    :deep(.guide_msg_multi) span:last-of-type {margin-bottom:0;}
    .listening_form_wrap .input_complex, .listening_form_wrap .input_complex .textarea_wrap {width:100%; max-width:100%;}
}
</style>