<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <p class="intro_desc">{{ t.intro }}</p>

                <div class="pop_guide_wrap">

                    <!-- 제1조 목적 -->
                    <section class="section">
                        <strong class="title">{{ t.section1.title }}</strong>
                        <p class="desc">{{ t.section1.desc }}</p>
                    </section>

                    <!-- 제2조 책임과 권한 -->
                    <section class="section">
                        <strong class="title">{{ t.section2.title }}</strong>
                        <p class="desc">{{ t.section2.desc }}</p>
                    </section>

                    <!-- 제3조 위원회의 구성 -->
                    <section class="section">
                        <strong class="title">{{ t.section3.title }}</strong>
                        <p class="desc">{{ t.section3.desc }}</p>
                    </section>

                    <!-- 제4조 위원회의 회의 -->
                    <section class="section">
                        <strong class="title">{{ t.section4.title }}</strong>
                        <p class="desc">{{ t.section4.desc }}</p>
                    </section>

                    <!-- 제5조 심의사항 -->
                    <section class="section">
                        <strong class="title">{{ t.section5.title }}</strong>
                        <div class="sub_content_block">
                            <ul>
                                <li v-for="(item, index) in t.section5.items" :key="index">
                                    <p class="desc">{{ item.content }}</p>
                                </li>
                            </ul>
                            <ul class="row">
                                <li v-for="(row, idx) in t.section5.rows" :key="'can'+idx">
                                    {{ row }}
                                </li>
                            </ul>
                        </div>
                    </section>

                    <!-- 제6조 의견청취 -->
                    <section class="section">
                        <strong class="title">{{ t.section6.title }}</strong>
                        <p class="desc">{{ t.section6.desc }}</p>
                    </section>

                    <!-- 제7조 시정 및 제재조치 -->
                    <section class="section">
                        <strong class="title">{{ t.section7.title }}</strong>
                        <p class="desc">{{ t.section7.desc }}</p>
                    </section>

                    <!-- 제8조 심의결과의 통보 및 문서의 보관 -->
                    <section class="section">
                        <strong class="title">{{ t.section8.title }}</strong>
                        <p class="desc">{{ t.section8.desc }}</p>
                    </section>

                    <!-- 제9조 심의의원회 조직 운영 -->
                    <section class="section">
                        <strong class="title">{{ t.section9.title }}</strong>
                        <p class="desc">{{ t.section9.desc }}</p>
                    </section>

                    
                    <!-- 부칙 -->
                    <section class="section addendum">
                        <strong>{{ t.addendum.title }}</strong>
                        <div class="addendum_box">
                            <strong>{{ t.addendum.article }}</strong>
                            <p v-for="(line, idx) in t.addendum.lines" :key="idx" class="desc">
                                {{ line }}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "gsrsu04020303",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "하도급거래 심의위원회 운영규정",
                    intro: '2021.04.\nGS리테일\n\n GS리테일하도급거래 내부 심의위원회 설치·운영을 위한 가이드라인',
                    section1: {
                        title: "제1조 목적",
                        desc: '이 규정은 GS리테일(이하 “회사”)가 하도급거래 내부 심의위원회(이하 “위원회”)를 구성하여 일정규모 이상의 하도급거래에 대한 공정성 및 적법성 여부 등을 스스로 사전에 심의하게 함으로써 공정한 하도급 거래질서 확립에 이바지하는데 그 목적이 있다.'
                    },
                    section2: {
                        title: "제2조 책임과 권한",
                        desc: "위원회는 회사의 하도급 거래와 관련한 주요사항에 대해 심의/의결한다.",
                    },
                    section3: {
                        title: "제3조 위원회의 구성",
                        desc: "내부 심의위원회는 하도급관련업무 담당임원을 포함하여 3인 이상의 임직원으로 구성한다.",
                    },
                    section4: {
                        title: "제4조 위원회의 회의",
                        desc: "위원회는 현안 발생 시 수시로 개최할 수 있으며, 별도의 안건이 없는 경우에는 별도로 기록 관리 하지 않는다.",
                    },
                    section5: {
                        title: "제5조 심의사항",
                        items: [
                            { content: '1. 위원회는 파트너사 등록/취소 기준 및 절차의 적절성 여부를 사전 심의한다.' },
                            { content: '2. 위원회는 파트너사 등록취소에 대한 이의 신청 건을 심의한다.' },
                            { content: '3. 위원회는 하도급 거래금액과 파트너사에 대한 계약체결 및 하도급법 등 관련 법규에 대한 적법성 여부 등을 사전 /사후 심의하고 대상은 연간 5억원 이상의 하도급 계약으로 한다.' }
                        ],
                        rows: [
                            "- 서면계약서 발급의무 준수여부",
                            "- 부당한 하도급대금 결정금지 위반여부",
                            "- 물품 등의 구매강제금지 위반여부",
                            "- 경제적 이익의 부당요구 금지 위반여부 등"
                        ],
                    },
                    section6: {
                        title: "제6조 의견청취",
                        desc: "위원회는 필요 시 파트너사의 의견을 청취할 수 있으며 이 경우 파트너사의 익명성이 보장되도록 하여야 한다.",
                    },
                    section7: {
                        title: "제7조 시정 및 제재조치",
                        desc: "위원회는 심의결과 하도급법 등 관련 법규에 위반될 소지가 있는 경우에는 스스로 시정하여야 하며, 관련 임직원의 고의 또는 중대한 과실이 있는 경우에는 위반정도에 상응하는 제재조치(인사상 불이익 등)를 취하여야 한다.",
                    },
                    section8: {
                        title: "제8조 심의결과의 통보 및 문서의 보관",
                        desc: "위원회는 심의결과 및 조치결과 등 관련 문서를 심의종료일로부터 3년 이상 보관하여야 한다.",
                    },
                    section9: {
                        title: "제9조 심의의원회 조직 운영",
                        desc: "회사의 상시 심의위원회 운영은 MD본부 MD플랫폼TFT에서 진행하며 이슈에 대한 의견청취 및 시정/제재조치, 심의결과 통보는 경영진단실에서 진행한다",
                    },
                    addendum: {
                        title: "[부칙]",
                        article: "제 1조[시행일]",
                        lines: ["- 이 지침은 2020년 4월 1일부터 시행한다.", "- 이 지침은 2021년 4월 1일부터 시행한다."]
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Operating Regulations of the Subcontracting Transaction Review Committee"/* 260604 번역 */,
                    intro: 'April 2021\nGS Retail\n\n GS Retail Guidelines for the Establishment and Operation of an Internal Deliberation Committee for Subcontract Transactions'/* 260604 번역 */,
                    section1: {
                        title: "Article 1 (Purpose)",
                        desc: 'The purpose of these regulations is to contribute to the establishment of a fair subcontracting transaction order by having GS Retail (hereinafter the "Company") establish an internal subcontracting transaction review committee (hereinafter the "Committee") to deliberate in advance, on its own, on the fairness and legality of subcontracting transactions above a certain scale.'/* 260604 번역 */
                    },
                    section2: {
                        title: "Article 2 Responsibilities and Authority",
                        desc: "The committee deliberates on and resolves major matters related to the company's subcontracting transactions."/* 260604 번역 */,
                    },
                    section3: {
                        title: "Article 3 Composition of the Committee",
                        desc: "The internal review committee shall be composed of three or more executives and employees, including the executive in charge of subcontracting-related affairs."/* 260604 번역 */,
                    },
                    section4: {
                        title: "Article 4 Committee Meetings",
                        desc: "The committee may be convened at any time when a pending issue arises, and where there is no separate agenda item, no separate records shall be kept."/* 260604 번역 */,
                    },
                    section5: {
                        title: "Article 5 Matters for Deliberation",
                        items: [
                            { content: '1. The Committee shall deliberate in advance on the appropriateness of the criteria and procedures for partner company registration/cancellation.'/* 260604 번역 */ },
                            { content: '2. The Committee shall deliberate on objections to the cancellation of partner company registration.'/* 260604 번역 */ },
                            { content: '3. The Committee shall deliberate, in advance and ex post, on the subcontract transaction amount and on the legality of contract conclusion with partner companies and of relevant laws such as the Subcontracting Act, etc.; the subject thereof shall be subcontracts of KRW 500 million or more per year.'/* 260604 번역 */ }
                        ],
                        rows: [
                            "Compliance with the obligation to issue written contracts",
                            "Compliance with the prohibition on unfair determination of subcontracting prices",
                            "Compliance with the prohibition on forcing purchase of goods, etc.",
                            "Compliance with the prohibition on improper demand for economic benefits, etc."
                        ],
                    },
                    section6: {
                        title: "Article 6 Hearing of Opinions",
                        desc: "The committee may, where necessary, hear the opinions of Partner Companies, and in such cases, the anonymity of the Partner Companies shall be guaranteed."/* 260604 번역 */,
                    },
                    section7: {
                        title: "Article 7 Corrective Measures and Sanctions",
                        desc: "Where the results of deliberation indicate a possibility of violating relevant laws and regulations such as the Subcontracting Act, the committee shall correct it on its own, and where there is intent or gross negligence on the part of the relevant executives or employees, it shall take sanctions corresponding to the degree of violation (such as personnel disadvantages)."/* 260604 번역 */,
                    },
                    section8: {
                        title: "Article 8 Notification of Deliberation Results and Document Retention",
                        desc: "The committee shall retain related documents, such as the results of deliberation and the results of measures, for at least three years from the date of completion of deliberation."/* 260604 번역 */,
                    },
                    section9: {
                        title: "Article 9 Committee Organization Operations",
                        desc: "The operation of the company's standing review committee is carried out by the MD Platform TFT of the MD Division, and the hearing of opinions on issues, corrective/sanction measures, and notification of deliberation results are carried out by the Management Diagnosis Office"/* 260604 번역 */,
                    },
                    addendum: {
                        title: "Supplementary Provisions",
                        article: "Article 1 (Effective Date)",
                        lines: ["These guidelines shall take effect from April 1, 2020.", "These guidelines shall take effect from April 1, 2021."]
                    }
                }
            }
        };
    },
    computed: { 
        t() { 
            // langData가 없거나, 해당 언어 데이터가 없을 경우를 모두 대비
            const data = this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko;
            return data || {}; 
        } 
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
.pop_space .intro_desc {color:#444; font-size:18px; line-height:26px;white-space:pre-line;background:url('@/assets/images/dummy/pop_guide_tit.png') no-repeat right top;}
.pop_guide_wrap {font-size:15px; line-height:25px;}
.pop_guide_wrap .title {display:block;font-size:18px;font-weight:700;padding-bottom:20px}
.pop_guide_wrap .title_b {display:block;font-size:15px;font-weight:normal;margin-bottom:20px;}
.pop_guide_wrap .section {padding:20px 0;}
.pop_guide_wrap .section:last-child {border-bottom:0}
.pop_guide_wrap .section .desc {font-size:15px;line-height:25px;white-space:pre-line;}
.pop_guide_wrap .image_wrap {margin:30px 0; text-align: center;}
.pop_guide_wrap .image_wrap img {width:100%}
.pop_guide_wrap .row {padding-left:20px;color: #666666}
.pop_guide_wrap .sub_content_block {margin-bottom:25px;}
.pop_guide_wrap .cancel_criteria {margin-bottom:25px;}
.pop_guide_wrap .section.addendum strong {font-weight:normal}

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; padding-bottom:24px;}
    .pop_space .intro_desc {padding-top:80px; background-position:center top;}
}
</style>