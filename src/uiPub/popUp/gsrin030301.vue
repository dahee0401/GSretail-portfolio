<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <div>
                <div class="intro_box">
                    <p class="intro_text" v-html="t.IntroText"></p>
                </div>
                
                <div class="policy_wrap">
                    <div class="accordion_list">
                        <div 
                            class="base-accordion" 
                            v-for="(item, idx) in t.PolicyList" 
                            :key="'policy-' + idx"
                        >
                            <div class="item_frame">
                                <span class="num_text">{{ idx + 1 }}</span>
                                <p class="policy_item_text">{{ item }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "gsrin030301",
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "주주보호 정책 및 관련 제도 정보",
                    IntroText: "GS리테일은 대한민국을 대표하는 유통플랫폼 기업으로서 지속적인 성장동력을 발굴하고 있으며 이해관계자의 의견을 반영한 투명하고 건전한 지배구조를 확보함으로써 주주의 투자수익 극대화를 위해 지속 노력하고 있습니다.",
                    PolicyList: [
                        "주주들의 다양한 의결권 행사 제공 전자투표제, 의결권 대리행사 권유 등",
                        "사외이사 및 감사 선임 시 주주추천제 도입",
                        "사외이사 후보 분리 선출",
                        "사외이사 연임 최대 기간 정관 내 명문화",
                        "이사회 소집 통기 기간 정관 내 명문화",
                        "대표이사와 이사회 의장 분리",
                        "이사회 및 설치 위원회 규정 공개",
                        "계열사 간 거래를 검토하는 이사회 내 내부거래위원회 운영",
                        "사외이사 후보를 검증하고 추천하는 이사회 내 사외이사 후보 추천위원회 운영",
                        "감사위원회는 회계 전문가를 포함한 전원 사외이사 구성",
                        "임직원 윤리 규정 및 기업지배구조 헌장 제정",
                        "기업지배구조와 모범규준과의 차이 공개",
                        "지배구조 5개년 등급 공개",
                        "배당금 증가 ('18년 650원, '19년 750원, '20년 900원, '21년 1200원) -> 안정적인 배당금 지급" /* 260624 edit 이소라 */
                    ]
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Shareholder Protection Policies and Related System Information"/* 260604 번역 */,
                    IntroText: "As a leading retail platform company representing Korea, GS Retail continuously seeks new growth engines and strives to maximize shareholder investment returns by securing a transparent and sound governance structure that reflects stakeholders' opinions."/* 260604 번역 */,
                    PolicyList: [
                        "Providing shareholders with various means of exercising voting rights, such as electronic voting and solicitation of proxy voting"/* 260604 번역 */,
                        "Introduction of a shareholder recommendation system for the appointment of outside directors and auditors"/* 260604 번역 */,
                        "Separate Election of Outside Director Candidates"/* 260604 번역 */,
                        "Stipulation in the articles of incorporation of the maximum term for the reappointment of outside directors"/* 260604 번역 */,
                        "Stipulation in the articles of incorporation of the board meeting convocation notice period"/* 260604 번역 */,
                        "Separation of the Representative Director and the Board Chairperson"/* 260604 번역 */,
                        "Disclosure of Board and Standing Committee Regulations"/* 260604 번역 */,
                        "Operation of an Internal Transactions Committee within the board to review transactions among affiliates"/* 260604 번역 */,
                        "Operation of an Outside Director Candidate Recommendation Committee within the board that verifies and recommends outside director candidates"/* 260604 번역 */,
                        "The Audit Committee is composed entirely of outside directors, including accounting experts"/* 260604 번역 */,
                        "Establishment of an Employee Code of Ethics and a Corporate Governance Charter"/* 260604 번역 */,
                        "Disclosure of Differences from Corporate Governance Best Practice Standards"/* 260604 번역 */,
                        "Disclosure of 5-Year Governance Ratings"/* 260604 번역 */,
                        "Dividend increase (KRW 650 in '18, KRW 750 in '19, KRW 900 in '20, KRW 1,200 in '21) -> Stable Dividend Payments"/* 260624 edit 이소라 */
                    ]
                }
            }
        };
    },
    computed: {
        t() {
            return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko;
        }
    },
    methods: {
        closeModal(event) {
            modal.close(event.currentTarget);
        }
    }
};
</script>

<style scoped>
.modal_header { font-size: 40px; font-weight: 700; border-bottom: 0; }
.intro_box { margin-bottom: 32px; }
.intro_text { font-size: 24px; font-weight: 400; line-height: 1.4; color: #161616; word-break: keep-all; }

/* 정책 리스트 스타일 (제공된 style.css 반영) */
.policy_wrap { padding-bottom: 80px; }
.accordion_list { border-top: 1px solid #161616; display: flex; flex-direction: column; }

.base-accordion {
    display: flex;
    min-height: 64px;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #d7d7df; /* var(--borderborder-20) */
}

.item_frame {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 16px;
}

.num_text {
    font-size: 1.8rem;
    font-weight: 700;
    color: #161616;
}

.policy_item_text {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.4;
    color: #1d1d1d; /* var(--grayscale-90) */
    flex: 1;
}

/* 모바일 대응 */
@media screen and (max-width: 767px) {
    .modal_header {margin-bottom:20px;}
    .modal_header, .intro_text { font-size:18px !important; }
    .base-accordion { padding: 16px 10px; }
    .policy_item_text { font-size: 16px; }
}
</style>