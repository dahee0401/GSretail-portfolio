<template>
    <div class="modal_cont gsrbr0601">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">닫기</a>
        </div>

        <div class="modal_content">
            <div class="subtit_wrap">
                <h3 v-html="t.Greeting"></h3>
            </div>

            <section class="accodian_sec">
                <h4>{{ t.sub_title }}</h4>
                <Accordion class="type_faq"><!-- 26.05.12 Edit 이종환 : 클래스 수정 -->
                    <AccordionItem v-for="(title, idx) in t.faq_1.title" :key="'best-' + idx" :item-key="'best-' + idx">
                        <template #title>{{ title }}</template>
                        <div v-html="t.faq_1.desc[idx] || t.default_desc"></div>
                    </AccordionItem>
                </Accordion>
                <div class="info_box mt40">
                    <p>{{ t.info_text }}</p>
                    <Buttons href="#none" btn-class="btn_mid primary">{{ t.btn_customer }}</Buttons>
                </div>
            </section>

            <section class="tab_sec">
                <Tabs @change="onTabChange1" v-model="CTabIdx" :tab-items="tabs" tab-class="type_01" :tab-slide="true" />
                <div class="tab_content">
                    <Accordion class="type_faq no_bor"><!-- 26.05.12 Edit 이종환 : 클래스 수정 -->
                        <AccordionItem v-for="(title, idx) in t.faq_2.title" :key="'tab-' + CTabIdx + '-' + idx" :item-key="'tab-' + idx">
                            <template #title>{{ title }}</template>
                            <div v-html="t.faq_2.desc[idx] || t.default_desc"></div>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div class="pagination_area mt60 ac">
                    <Pagination 
                        v-model="currentPage" 
                        :total-pages="5" 
                        :visible-pages="5"
                        @change="onPageChange" 
                    />
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Tabs from "@/components/Tabs.vue";
import Pagination from "@/components/Pagination.vue";
import Accordion from "@/components/Accordion.vue";
import AccordionItem from "@/components/AccordionItem.vue";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "gsrbr0601",
    components: {
        Tabs,
        Accordion,
        AccordionItem,
        Pagination,
        Buttons
    },
    data() {
        return {
            CTabIdx: 0,
            currentPage: 1,
            tabs: [
                { item: "멤버십 소개" },
                { item: "가입방법" },
                { item: "포인트" },
                { item: "카드" },
                { item: "정보보호/관리" },
                { item: "회원탈퇴" },
            ],
            langData: {
                ko: {
                    MainTitle: "멤버십 FAQ",
                    Greeting: "멤버십 포인트 관련<br/> 궁금하신 문제를 해결해 드립니다.",
                    sub_title: "자주묻는질문 BEST",
                    info_text: "원하시는 답변이 없으셨나요? 그럼 고객의 소리를 이용해 주세요.",
                    btn_customer: "고객의 소리",
                    default_desc: "상세 답변 준비 중입니다.",
                    faq_1: {
                        title: [
                            "GS ALL 멤버십은 어떤건가요?",
                            "이름을 개명했는데 어떻게 해야 하나요?",
                            "GS ALL 패밀리란 어떤건가요?",
                            "휴대폰번호 변경은 어떻게 할 수 있나요?",
                            "GS ALL 멤버십 카드 등록은 어떻게 할 수 있나요?",
                            "본인인증이 뭔가요? 꼭 해야만 하나요?",
                            "본인인증이 안돼요. 어떻게 해야하나요?"
                        ],
                        desc: [
                            "<span>GS ALL 멤버십은 GS리테일의 3개 브랜드(GS25, GS SHOP, GS THE FRESH)를 통합한 GS리테일 통합 멤버십입니다. 하나의 브랜드에서만 등급을 달성해도 3개 브랜드 등급혜택을 모두 받아보실 수 있습니다.</span><br /><br /><span>GS ALL 멤버십에 대한 자세한 내용은 각 앱별 마이페이지에서 확인하실 수 있습니다.</span>",
                            "<span>개명하신 경우 통신사 실명인증 정보를 먼저 변경하신 후, 앱 내 개인정보 수정 메뉴에서 본인인증을 다시 진행해 주시기 바랍니다.</span>",
                            "<span>가족이나 친구와 함께 포인트를 합산하여 사용할 수 있는 공유 서비스입니다.</span>",
                            "<span>기존 번호로 로그인 후 마이페이지의 '휴대폰 번호 변경' 메뉴를 이용하세요.</span>",
                            "<span>실물 카드의 바코드 번호를 등록하거나 모바일 카드를 발급받으실 수 있습니다.</span>"
                        ]
                    },
                    faq_2: {
                        title: [
                            "GS ALL 멤버십 등급 선정 기준은 무엇인가요?",
                            "등급별 혜택 및 나의 등급은 어디서 확인할 수 있나요?",
                            "얼마나 더 사용해야 승급할 수 있나요?",
                            "GS ALL 멤버십을 이용하기 위해 별도의 신청이 필요한가요?",
                            "고객 등급은 얼마나 유지되나요?",
                            "GS ALL 패밀리란 어떤건가요?",
                            "본인인증이 안돼요. 어떻게 해야하나요?"
                        ],
                        desc: [
                            "<span>직전 3개월간의 이용 실적(금액/횟수)에 따라 산정됩니다.</span>",
                            "<span>각 브랜드 앱의 마이페이지 상단 등급 표시 영역을 클릭하시면 상세 확인이 가능합니다.</span>",
                            "<span>마이페이지 내 승급 가이드를 통해 다음 등급까지 필요한 조건이 표시됩니다.</span>"
                        ]
                    }
                },
                en: {
                    MainTitle: "Membership FAQ",
                    Greeting: "We're here to answer all your questions about membership points.",
                    sub_title: "Top FAQs",
                    info_text: "· Couldn't find what you were looking for? Try our Customer Feedback section.",
                    btn_customer: "Customer Feedback",
                    default_desc: "A detailed answer is being prepared."/* 260604 번역 */,
                    faq_1: {
                        title: [
                            "What is GS ALL Membership?",
                            "I have legally changed my name. What should I do?",
                            "What is GS ALL Family?",
                            "How can I update my mobile phone number?",
                            "How do I register my GS ALL Membership card?",
                            "What is identity verification? Is it mandatory?",
                            "I'm having trouble with identity verification. What should I do?"
                        ],
                        desc: [
                            "GS ALL Membership is the integrated membership program across GS Retail's three brands: GS25, GS SHOP, and GS THE FRESH. Achieving the required tier at just one brand grants tier benefits across all three brands. For more details, please visit My Page in each brand's app.",
                            "<span>If you have legally changed your name, please first update your real-name verification information with your mobile carrier, then re-verify your identity in the Edit Personal Information menu within the app.</span>"/* 260604 번역 */,
                            "<span>It is a sharing service that lets you combine and use points together with family or friends.</span>"/* 260604 번역 */,
                            "<span>Log in with your existing number, then use the 'Change Mobile Number' menu in My Page.</span>"/* 260604 번역 */,
                            "<span>You can register the barcode number of a physical card or issue a mobile card.</span>"/* 260604 번역 */
                        ]
                    },
                    faq_2: {
                        title: [
                            "What are the criteria for determining my GS ALL Membership tier?",
                            "Where can I check my tier benefits and current tier status?",
                            "How much more do I need to spend to be promoted to the next tier?",
                            "Do I need to apply separately to use GS ALL Membership?",
                            "How long does my membership tier last?",
                            "What is GS ALL Family?",
                            "I'm having trouble with identity verification. What should I do?"
                        ],
                        desc: [
                            "<span>It is calculated based on your usage record (amount/number of times) over the previous three months.</span>"/* 260604 번역 */,
                            "<span>You can view details by tapping the tier display area at the top of My Page in each brand's app.</span>"/* 260604 번역 */,
                            "<span>The promotion guide in My Page shows the conditions required to reach the next tier.</span>"/* 260604 번역 */
                        ]
                    }
                }
            }
        };
    },
    computed: {
        t() { return this.langData.ko; }
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); },
        onTabChange1(idx) {
            this.CTabIdx = idx;
            this.currentPage = 1; // 탭 바뀔 때 페이지 초기화
        },
        onPageChange(page) {
            this.currentPage = page;
            console.log('Page:', page);
        }
    }
};
</script>

<style scoped>
:deep(.modal_content) h3 {margin-bottom:64px;}
:deep(.modal_content) h3 br {display:none;}
.accodian_sec {margin-bottom:80px;}
.board_type_toggle {margin-top:24px;}
:deep(.board_type_toggle dt + dd) {border-bottom:1px solid #D7D7DF;}
:deep(.board_type_toggle dt > a.acc_tit_btn){border-bottom:0;}
:deep(.board_type_toggle.type_faq dt > a.acc_tit_open){border-bottom:0;}
.btn_mid {padding:10px 23px;}

/* 안내 박스 영역 */
.info_box { display: flex; align-items: center; justify-content: space-between; padding: 24px 32px; background-color: #f8f8f8; border-radius: 12px; }
.info_box p { font-size: 1.8rem; color: #666; }
.btn_customer { display: inline-flex; align-items: center; justify-content: center; height: 48px; padding: 0 24px; background-color: #107af2; color: #fff; font-size: 16px; font-weight: 700; border-radius: 6px; text-decoration: none; }

.tab_wrap {margin-bottom:24px;}

/* FAQ 아코디언 스타일링 */
/* :deep(.board_type_toggle) dt a.acc_tit_btn {padding: 24px 29px; color: #161616; font-size: 20px; font-weight: 500; border-bottom:0; display: flex; align-items: center; }
:deep(.board_type_toggle) dt a.acc_tit_btn::before { content: 'Q'; margin-right: 16px; font-weight: 700; color: #161616; }
:deep(.board_type_toggle) dt a.acc_tit_btn::after { margin-left: auto; }
:deep(dd.acc_panel) > .acc_panel_inner > .acc_panel_cont {padding:12px 10px 24px 32px !important;}
:deep(dd.acc_panel) > .acc_panel_inner > .acc_panel_cont div {display:flex; flex-direction:column; gap:16px;}
:deep(dd.acc_panel) > .acc_panel_inner > .acc_panel_cont * {color:#67676F; font-size:18px;} */
/* 
.faq_answer span { display: block; font-size: 1.8rem; color: #67676f; line-height: 1.6; }
.faq_answer span + span { margin-top: 16px; } */

/* 반응형 */
@media screen and (max-width: 767px) {
    .info_box {gap: 16px;}
    .info_box p {width:55%; color:#161616; font-size:14px;}
    /* :deep(.board_type_toggle) {border-top:1px solid #161616;}
    :deep(.board_type_toggle) dt a.acc_tit_btn {padding:8px 0;  font-size: 16px; }
    :deep(dd.acc_panel) > .acc_panel_inner > .acc_panel_cont * {font-size:16px;} */
    /* .faq_answer span { font-size: 15px; } */
    :deep(.modal_content) h3 br {display:block;}
    /* .tab_sec :deep(.board_type_toggle) {border-top:0;} */
    .btn_mid {padding:7px 12px !important; font-size:16px; border-radius:4px;}

    .tab_wrap {margin-bottom:10px;}

    :deep(.modal_content) h3 {margin-bottom:60px;}
    .board_type_toggle.type_faq.no_bor {margin-top:0;}
}
</style>