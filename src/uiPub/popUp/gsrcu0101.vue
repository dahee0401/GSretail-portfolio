<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.common.close }}</a>
        </div>

        <div class="modal_content">
            <section class="listening_form_area">
                <i v-html="t.listening.Txt"></i>
                <!-- case: 멤머십 및 홈페이지 문의 시 26.06.02 add 정다희 -->
                <div class="section_title_area">
                    <h4>{{ t.listening.membershipTitle }}</h4>
                    <p class="p_desc">{{ t.listening.membershipDesc }}</p>
                </div>
                <!-- //case: 멤머십 및 홈페이지 문의 시 26.06.02 add 정다희 -->
                <div class="consent_container">
                    <article v-for="(consent, cIdx) in t.listening.Consents" :key="'consent-'+cIdx" class="consent_box">
                        <strong class="consent_tit">{{ consent.title }}</strong>
                        <ul class="consent_list">
                            <li v-for="(list, lIdx) in consent.items" :key="'list-'+lIdx">{{ list }}</li>
                        </ul>
                        <div class="consent_agree">
                            <p class="guide_text" v-html="consent.guide"></p>
                            <Inputs type="checkbox" :text="t.common.agree" v-model="formData.agreements[cIdx]" />
                        </div>
                    </article>
                </div>

                <!-- 260508: hgkim: class="off" 추가시 displya:none 처리됨 -->
                <article class="notion_member">
                    <p class="noti_title">
                        <i class="noti_icon" aria-hidden="true"></i>
                        <span>{{ t.listening.Nonmember.title }}</span>
                    </p>
                    <ul class="bullet_01">
                        <li v-for="(list, lIdx) in t.listening.Nonmember.items" :key="'list-'+lIdx" v-html="list"></li>
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
                                        <SelectBox :options="t.listening.InputWrapcont.part1.emailOptions" v-model="formData.emailSelect" :initMsg="t.listening.InputWrapcont.part1.emailInitMsg" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part1.telLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_group">
                                        <div class="input_flex_item">
                                            <SelectBox :options="t.listening.InputWrapcont.part1.telOptions" v-model="formData.tel1" :initMsg="t.listening.InputWrapcont.part1.telInitMsg" />
                                        </div>
                                        <span class="unit">-</span>
                                        <div class="input_flex_item"><Inputs type="text" v-model="formData.tel2" /></div>
                                        <span class="unit">-</span>
                                        <div class="input_flex_item"><Inputs type="text" v-model="formData.tel3" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- case: 1:1 상담 / 상담/비회원 시 26.06.02 add 정다희 -->
                        <div class="form_section">
                            <div class="form_header">
                                <h5 class="form_title">{{ t.listening.InputWrapcont.part2.title }}</h5>
                                <span class="required_guide">{{ t.listening.InputWrapcont.part1.requiredText }}</span>
                            </div>
                            <div class="form_body">
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.categoryLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full input_item_txt">
                                        <span>GS25</span>
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.Consulting }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.part2.categoryOptions" v-model="formData.category" :initMsg="t.listening.InputWrapcont.part2.consultingInitMsg" class="w428" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.storeLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_complex">
                                        <Inputs type="text" v-model="formData.storeName" :placeholder="t.listening.InputWrapcont.part2.storePlaceholder" class="w428"/>
                                        <p class="guide_msg">{{ t.listening.InputWrapcont.part2.storeGuide }}</p>
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
                                <div class="form_row ai_start">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.part2.contentLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_complex">
                                        <Textarea v-model="formData.body" :placeholder="t.listening.InputWrapcont.part2.contentPlaceholder" />
                                        <p class="guide_msg_multi" v-html="t.listening.InputWrapcont.part2.noticeText"></p>
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
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.part2.replyOptions" v-model="formData.replyType" :initMsg="t.listening.InputWrapcont.part2.replyInitMsg" class="w428"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- //case: 1:1 상담/ 상담/비회원 시 26.06.02 add 정다희 -->

                        <!-- case: 멤머십 및 홈페이지 문의 시 26.06.02 add 정다희 -->
                        <div class="form_section">
                            <div class="form_header">
                                <h5 class="form_title">{{ t.listening.InputWrapcont.membershipForm.title }}</h5>
                                <span class="required_guide">{{ t.listening.InputWrapcont.membershipForm.requiredText }}</span>
                            </div>
                            <div class="form_body">
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.membershipForm.inquiryTypeLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.membershipForm.inquiryTypeOptions" v-model="formData.category" :initMsg="t.listening.InputWrapcont.membershipForm.inquiryTypeInitMsg" class="w428" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.membershipForm.divisionLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.membershipForm.divisionOptions" v-model="formData.category" :initMsg="t.listening.InputWrapcont.membershipForm.divisionInitMsg" class="w428" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.membershipForm.consultingLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.membershipForm.consultingOptions" v-model="formData.replyType" :initMsg="t.listening.InputWrapcont.membershipForm.consultingInitMsg" class="w428" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.membershipForm.subjectLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <Inputs type="text" v-model="formData.subject" class="w428" />
                                    </div>
                                </div>
                                <div class="form_row ai_start">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.membershipForm.contentLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_complex">
                                        <Textarea v-model="formData.body" :placeholder="t.listening.InputWrapcont.membershipForm.contentPlaceholder" />
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.membershipForm.fileLabel }}</span>
                                    </div>
                                    <div class="input_complex">
                                        <FileUpload :lang="lang" :multiple="true" accept="*" @update:files="onFiles" />
                                        <p class="guide_msg">{{ t.listening.InputWrapcont.membershipForm.fileGuide }}</p>
                                    </div>
                                </div>
                                <div class="form_row">
                                    <div class="label_item">
                                        <span class="label_text">{{ t.listening.InputWrapcont.membershipForm.replyLabel }}</span>
                                        <span class="required_mark">*</span>
                                    </div>
                                    <div class="input_item full">
                                        <SelectBox :options="t.listening.InputWrapcont.part2.replyOptions" v-model="formData.replyType" :initMsg="t.listening.InputWrapcont.membershipForm.replyInitMsg" class="w428" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- case: 멤머십 및 홈페이지 문의 시 26.06.02 add 정다희 -->
                    </article>
                    <div class="btn-wrap">
                        <Buttons btn-class="btn_big primary"  @click="openModal" data-popid="gsrcu010101" data-type="small" data-cont="gsrcu010101">{{ t.listening.InputWrapcont.part2.btnSubmit }}</Buttons>
                        <Buttons btn-class="btn_big gray" @click="closeModal">{{ t.listening.InputWrapcont.part2.btnCancel }}</Buttons>
                    </div>
                </div>
            </section>
        </div>

        <!-- 상담신청완료 팝업 -->
        <teleport to="body">
            <div id="gsrcu010101" class="modal_wrap">
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
                tel1: "", tel2: "", tel3: "", category: "", storeName: "",
                subject: "", body: "", replyType: "", files: []
            },
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "고객의 소리",
                    common: {
                        close: "닫기",
                        agree: "동의합니다.",
                    },
                    listening: {
                        Txt:"언제나 고객님의 입장이 되어<br/> 작은 소리에도 귀를 기울이겠습니다.",
                        membershipTitle: "멤버십 및 홈페이지 문의",
                        membershipDesc: "멤버십 및 홈페이지 문의 또는, 제안할 점 등에 대해 의견을 남겨주세요.",
                        Consents: [
                            {
                                title: "(선택) 개인정보 제3자 제공 동의",
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
                            title: "고객정보의 연락처를 확인해 주세요.",
                            items: [
                                "문의에 대한 답변은 ‘등록하신 연락처(문자, 전화) 또는 이메일을 통해서만’ 확인하실 수 있습니다. <br>연락처를 정확하게 입력해주세요. (홈페이지 내에서 이전 문의이력 확인 불가)", /* 260624 edit 이소라 */
                            ]
                        },
                        InputWrapcont: {
                            part1: {
                                title: "고객정보",
                                requiredText: "* 필수 입력사항",
                                nameLabel: "이름",
                                namePlaceholder: "이름을 입력해주세요",
                                emailLabel: "이메일",
                                emailIdPlaceholder: "이메일 아이디",
                                emailDomainPlaceholder: "도메인 입력",
                                emailInitMsg: "직접입력",
                                emailOptions: [{ value: 'naver.com', label: 'naver.com' }, { value: 'gmail.com', label: 'gmail.com' }],
                                telLabel: "연락처",
                                telInitMsg: "선택",
                                telOptions: [{ value: '010', label: '010' }, { value: '011', label: '011' }]
                            },
                            part2: {
                                title: "상담내용",
                                categoryLabel: "구분",
                                Consulting:"상담구분 선택",
                                consultingInitMsg: "상담구분 선택",
                                categoryOptions: [{ value: 'store', label: '편의점/수퍼' }, { value: 'home', label: '홈쇼핑' }],
                                storeLabel: "매장명",
                                storePlaceholder: "매장명을 입력해주세요",
                                storeGuide: "* 단, 점포명을 모르시는 경우 점포위치를 적어주세요",
                                subjectLabel: "제목",
                                subjectPlaceholder: "제목을 입력해주세요",
                                contentLabel: "내용",
                                contentPlaceholder: "문의사항을 입력해주세요.",
                                noticeText: `
                                    <span>GS25 매장관련문의를 하시는 경우, 정확한 점포명/방문(구매)날짜, 시간을 함께 작성해주셔야 보다 원활한 답변을 받아보실 수 있습니다.</span>
                                    <span>내용 입력 시 개인정보보호를 위해 연락처, 주소 등의 개인정보를 작성하지 않도록 주의 부탁드립니다.</span>
                                    <span>상담내용에 욕설이나 비속어가 포함되어 있으면 답변 되지 않을 수 있습니다.</span>
                                    <span>상담 내용(첨부파일 포함)과 관계 없이 성적 수치감이나 혐오감을 일으키는 내용을 게시하는 경우, 성폭력범죄의 처벌 등에 관한 특례법에 따라 처벌받을 수 있습니다.</span>`,
                                fileLabel: "파일첨부",
                                fileNotice: "* 여러 개의 파일 업로드 시 zip파일로 압축하여 올려주세요 (*용량제한 20MB)",
                                replyLabel: "회신방법",
                                replyInitMsg: "회신방법 선택",
                                replyOptions: [{ value: 'email', label: '이메일' }, { value: 'sms', label: 'SMS' }],
                                btnSubmit: "신청",
                                btnCancel: "취소"
                            },
                            membershipForm: {
                                title: "상담내용",
                                requiredText: "* 필수 입력사항",
                                inquiryTypeLabel: "문의유형",
                                inquiryTypeInitMsg: "문의유형 선택",
                                inquiryTypeOptions: [{ value: 'membership', label: '멤버십/홈페이지' }],
                                divisionLabel: "구분",
                                divisionInitMsg: "상담구분 선택",
                                divisionOptions: [{ value: 'consult', label: '상담구분' }],
                                consultingLabel: "상담구분 선택",
                                consultingInitMsg: "GS리테일",
                                consultingOptions: [{ value: 'gsretail', label: 'GS리테일' }],
                                subjectLabel: "제목",
                                contentLabel: "내용",
                                contentPlaceholder: "내용 입력시",
                                fileLabel: "파일첨부",
                                fileGuide: "* 여러 개의 파일 업로드 시 zip파일로 압축하여 올려주세요 (*용량제한 20MB)",
                                replyLabel: "회신방법",
                                replyInitMsg: "이메일",
                            },
                        }
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Customer Feedback",
                    common: {
                        close: "Close"/* 260604 번역 */,
                        agree: "I agree.",
                    },
                    listening: {
                        Txt:"We will always put ourselves in our customers' shoes and listen even to the smallest voice.",
                        membershipTitle: "Membership/Website Inquiry",
                        membershipDesc: "Please leave your feedback or suggestions regarding membership and the website."/* 260604 번역 */,
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
                            title: "Please verify the contact information in your customer details."/* 260604 번역 */,
                            items: [
                                "Responses to inquiries can only be checked through the contact information (SMS, phone) or email you registered. <br>Please enter your contact information accurately. (Previous inquiry history cannot be checked on the website)", /* 260624 edit 이소라 */
                            ]
                        },
                        InputWrapcont: {
                            part1: {
                                title: "Customer Information",
                                requiredText: "* Required fields",
                                nameLabel: "Name",
                                namePlaceholder: "Please enter your name"/* 260604 번역 */,
                                emailLabel: "Email",
                                emailIdPlaceholder: "Email ID"/* 260604 번역 */,
                                emailDomainPlaceholder: "Enter domain"/* 260604 번역 */,
                                emailInitMsg: "Enter directly",
                                emailOptions: [{ value: 'naver.com', label: 'naver.com' }, { value: 'gmail.com', label: 'gmail.com' }],
                                telLabel: "Contact",
                                telInitMsg: "Select"/* 260604 번역 */,
                                telOptions: [{ value: '010', label: '010' }, { value: '011', label: '011' }]
                            },
                            part2: {
                                title: "Consultation Content",
                                categoryLabel: "Category",
                                Consulting:"Select Consultation Category",
                                consultingInitMsg: "Select Consultation Category",
                                categoryOptions: [{ value: 'store', label: 'Convenience store/supermarket'/* 260604 번역 */ }, { value: 'home', label: 'Home Shopping' }],
                                storeLabel: "Store Name",
                                storePlaceholder: "Please enter the store name"/* 260604 번역 */,
                                storeGuide: "If you do not know the store name, please write the store location.",
                                subjectLabel: "Title",
                                subjectPlaceholder: "Please enter a title"/* 260604 번역 */,
                                contentLabel: "Details",
                                contentPlaceholder: "Please enter any questions related to store onboarding",
                                noticeText: `
                                    <span>For inquiries about GS25 stores, please include the exact store name and the date and time of your visit (purchase) so we can provide a smoother response.</span>
                                    <span>When entering your content, please be careful not to include personal information such as contact numbers or addresses to protect your privacy.</span>
                                    <span>If the consultation content contains profanity or abusive language, it may not be answered.</span>
                                    <span>Regardless of the consultation content (including attachments), posting content that causes sexual shame or disgust may be punishable under the Act on Special Cases Concerning the Punishment of Sexual Crimes.</span>`/* 260604 번역 */,
                                fileLabel: "File Attachment",
                                fileNotice: "* When uploading multiple files, please compress them into a zip file (* File size limit: 20MB)",
                                replyLabel: "Reply Method",
                                replyInitMsg: "Select reply method"/* 260604 번역 */,
                                replyOptions: [{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }],
                                btnSubmit: "Apply"/* 260604 번역 */,
                                btnCancel: "Cancel"
                            },
                            membershipForm: {
                                title: "Consultation Content",
                                requiredText: "* Required fields",
                                inquiryTypeLabel: "Inquiry Type",
                                inquiryTypeInitMsg: "Select inquiry type"/* 260604 번역 */,
                                inquiryTypeOptions: [{ value: 'membership', label: 'Membership/Website Inquiry' }],
                                divisionLabel: "Category",
                                divisionInitMsg: "Select Consultation Category",
                                divisionOptions: [{ value: 'consult', label: 'Consultation Category' }],
                                consultingLabel: "Select Consultation Category",
                                consultingInitMsg: "GS Retail",
                                consultingOptions: [{ value: 'gsretail', label: 'GS Retail' }],
                                subjectLabel: "Title",
                                contentLabel: "Details",
                                contentPlaceholder: "When entering content",
                                fileLabel: "File Attachment",
                                fileGuide: "* When uploading multiple files, please compress them into a zip file (* File size limit: 20MB)",
                                replyLabel: "Reply Method",
                                replyInitMsg: "Email",
                            },
                        }
                    }
                }
            }
        };
    },
    computed: {
        t() {
            const currentLang = this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')];
            return currentLang && currentLang.common && currentLang.listening ? currentLang : this.langData.ko;
        }
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
        onFiles(files) { this.formData.files = files; },
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
.modal_header {width:100%; color:#161616; font-size:40px; font-weight:700; display:flex; align-items:center; justify-content:space-between; border-bottom:0 !important;}
.modal_content {width:100%; overflow-y:auto; flex:1;}
.input_wrap {display:flex; align-items:center; justify-content:flex-end;}
.listening_form_area i {margin-bottom:40px;font-size:20px; display:block;}
:deep(.listening_form_area) i br {display:none;}
:deep(.listening_form_area textarea){resize:none;}
.section_title_area {margin-bottom:40px;}
.section_title_area h4 {margin-bottom:8px; font-size:24px;}
.section_title_area .p_desc { font-size:16px; font-weight: 400; color: #161616; line-height: 1.5; word-break: keep-all; }
.notion_member {padding:24px; background:#F9F2EA; border-radius:12px;}
.notion_member .noti_title {margin:0; color:#161616; font-size:1.8rem; line-height:1.4; letter-spacing:0; display:flex; align-items:center; gap:8px;}
.notion_member .noti_icon {width:24px; height:24px; margin-bottom:0 !important; background:url('@/assets/images/common/icon_set_24.png') -160px -56px no-repeat; flex-shrink:0; display:block;}
.notion_member ul {margin-top:10px; padding-left:0;}
.notion_member ul li {font-size:1.6rem; letter-spacing: -0.01em;}
.listening_form_area .consent_box { background-color: #f8f8f8; padding: 32px; border-radius: 12px;}
.listening_form_area .consent_tit {margin-bottom: 24px; font-size: 24px; font-weight: 700; display: block; }
.listening_form_area .consent_list {padding-bottom:24px;}
.listening_form_area .consent_list li { font-size: 16px; color: #67676f; margin-bottom: 8px; padding-left: 12px; line-height:1.5; position: relative; }
.listening_form_area .consent_list li::before { content: ""; position: absolute; left: 0; top: 10px; width: 4px; height: 1px; background-color: #67676f; }
.listening_form_area .form_table { border-top: 1px solid #242428; }
.listening_form_area .form_row { display: flex; align-items: center; }
.listening_form_area .form_row.ai_start { align-items: flex-start; }
.listening_form_area .form_row .label { width: 134px; padding: 24px; font-size: 16px; color: #161616; }
.listening_form_area .required { color: #fb6432; }
.listening_form_area input, .listening_form_area textarea { width: 100%; padding: 14px 16px; border: 1px solid #c4c4d0; border-radius: 12px; font-size: 16px; }
.listening_form_area textarea { height: 160px; resize: none; }
.listening_form_area .consent_agree {padding-top:24px; border-top:1px solid #D7D7DF; display:flex; justify-content:space-between; align-items:center;}
.listening_form_area .consent_agree p {font-size:16px; font-weight:700;}
.listening_form_area article {margin-top:40px;}
.listening_form_area article.notion_member {position:relative;}
.listening_form_wrap .form_header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid #242428; }
.listening_form_wrap .form_title { font-size: 24px; font-weight: 700; color: #161616; }
.listening_form_wrap .required_guide { font-size: 14px; color: #fb6432; }
.form_section:first-of-type {margin-bottom:64px;}
.listening_form_wrap .form_body {padding:10px 0 12px; border-bottom: 1px solid #e5e5e9; }
.listening_form_wrap .form_row { display: flex; align-items: center; gap: 8px; padding: 12px 0; }
.listening_form_wrap .label_item { display: flex; width: 134px; align-items: center; gap: 4px;}
.listening_form_wrap .label_text { font-size: 16px; color: #161616; }
.listening_form_wrap .required_mark { color: #fb6432; font-size: 16px; }
.listening_form_wrap .input_group { display: flex; align-items: center; gap: 8px;}
.listening_form_wrap .input_group .group_wrap { display: flex; align-items: center; gap: 8px;}
.listening_form_wrap .input_flex_item { flex: 1; min-width: 0; }
.listening_form_wrap .unit { color: #67676f; font-size: 16px; padding: 0 4px; }
.listening_form_wrap .input_complex {width:calc(100% - 134px);  display: flex; flex-direction: column; gap: 8px;}
.listening_form_wrap .input_complex .textarea_wrap {max-width:600px;}
.listening_form_wrap .guide_msg { font-size: 14px; color: #67676f; }
.listening_form_wrap .guide_msg_multi {width:90%; margin-top: 8px; color: #67676f; font-size: 14px; line-height:1.4; display:flex; flex-direction:column; }
.listening_form_wrap :deep(.guide_msg_multi) span {padding-left:15px; line-height:1.4; display:inline-block; position:relative;}
.listening_form_wrap :deep(.guide_msg_multi) span::before {content:'*'; position:absolute; top:0; left:0;}
.listening_form_wrap .file_upload_group { display: flex; align-items: center; gap: 10px; }
.listening_form_wrap .btn_file { height: 38px; padding: 0 12px; font-size: 16px; cursor: pointer; }
.listening_form_wrap .file_name { font-size: 14px; color: #161616; }
.form_container .btn-wrap {margin-top:40px;display:flex; justify-content:flex-end; gap:8px;}
.form_container .btn-wrap * {width:134px;}
.w428 {width:428px; display:inline-block;}


@media screen and (max-width: 1024px) {
    .listening_form_wrap .form_row {flex-direction:column;}
    .w428 {width:100%;}
}
@media screen and (max-width: 768px) {
    .modal_header {font-size:18px;}
    .input_item, .input_complex, .input_wrap, .w428 {width:100%;}
    .section_title_sub {font-size:16px !important;}
    .p_desc {font-size:14px;}
    .listening_form_area i {font-weight:700;}
    .section_title_area{margin-bottom:60px;}
    .input_item.input_item_txt span{font-weight: 700;font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;}
    :deep(.listening_form_area) i br {display:block;}
    .section_title_area h4{font-size: 1.6rem;line-height: 1.24;letter-spacing: 0%;}
    .listening_form_wrap .form_row{gap:12px;align-items: flex-start;}
    .listening_form_area .consent_box {padding:30px 20px;}
    .listening_form_area article{margin-top:20px;}
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
    .notion_member .noti_title {font-size:1.4rem; line-height:1.4; letter-spacing:-0.01em;}
    .notion_member ul li {font-size:1.2rem;}
    .listening_form_wrap .guide_msg_multi {font-size:14px;}
    :deep(.guide_msg_multi) span {margin-bottom:8px; display:block;}
    :deep(.guide_msg_multi) span:last-of-type {margin-bottom:0;}
    .listening_form_wrap .input_complex, .listening_form_wrap .input_complex .textarea_wrap {width:100%; max-width:100%;}
}
</style>