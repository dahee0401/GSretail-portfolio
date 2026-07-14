<template>
    <div class="modal_cont gsrbr0602">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">닫기</a>
        </div>

        <div class="modal_content">
            <div class="version_select_area mb40">
                <div class="flex_between">
                    <h3>{{ t.Greeting }}</h3>
                    <div class="select_group">
                        <SelectBox 
                            :options="t.yearOptions" 
                            v-model="selectedYear" 
                            class="width_170"
                        />
                        <SelectBox 
                            :options="t.versionOptions" 
                            v-model="selectedVersion" 
                            class="width_260"
                        />
                    </div>
                </div>
            </div>

            <div class="policy_wrap">
                <dl>
                    <dt>{{ t.Chapter1.title }}</dt>
                    <dd>
                        <dl v-for="(item, idx) in t.Chapter1.items" :key="'ch1-' + idx">
                            <dt>{{ item.article }}</dt>
                            <dd>
                                <span v-if="typeof item.content === 'string'">{{ item.content }}</span>
                                <ul v-else>
                                    <li v-for="(sub, sIdx) in item.content" :key="'sub-' + sIdx">
                                        {{ sub }}
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>

                    <dt>{{ t.Chapter4.title }}</dt>
                    <dd>
                        <dl>
                            <dt>{{ t.Chapter4.article13.title }}</dt>
                            <dd>
                                <div class="desc">{{ t.Chapter4.article13.desc }}</div>
                                <div class="desc">{{ t.Chapter4.article13.content }}</div>
                                <div class="table_scroll_area">
                                    <table>
                                        <colgroup>
                                            <col style="width: 200px;">
                                            <col v-for="n in 5" :key="n" style="width: auto;">
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th scope="col">{{t.기능종류}}</th>
                                                <th scope="col" v-for="head in t.Chapter4.article13.tableHead" :key="head" v-html="head"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(row, rIdx) in t.Chapter4.article13.tableRows" :key="'row-' + rIdx">
                                                <th scope="row">{{ row.label }}</th>
                                                <td v-for="(cell, cIdx) in row.data" :key="'cell-' + cIdx" v-html="cell" class="ac"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </dd>

                            <dt>{{ t.Chapter4.article14.title }}</dt>
                            <dd>
                                <ul>
                                    <li v-for="(sub, idx) in t.Chapter4.article14.content" :key="'art14-' + idx">
                                        {{ sub }}
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                    </dd>

                    <dt>{{ t.Appendix.title }}</dt>
                    <dd>
                        <dl>
                            <dt>{{ t.Appendix.article }}</dt>
                            <dd>
                                <div class="desc">{{ t.Appendix.content }}</div>
                                <p>{{ t.Appendix.copyright }}</p>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </div>
        </div>

        <div class="modal_bottom right">
            <div class="btnBox">
                <Buttons btn-class="btn_big primary" @click="closeModal">{{t.check}}</Buttons>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import SelectBox from "@/components/SelectBox.vue";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "gsrbr0602",
    components: {
        SelectBox, Buttons
    },
    data() {
        return {
            selectedYear: "2025",
            selectedVersion: "v1",
            langData: {
                ko: {
                    MainTitle: "GS ALL 멤버십 회원약관",
                    Greeting: "2026.01.19 개정판 고시",
                    numIcons: ["①", "②", "③", "④", "⑤"],
                    yearOptions: [{ value: "2025", label: "2025" }],
                    versionOptions: [{ value: "v1", label: "2025.02.26 개정판 고시" }],
                    Chapter1: {
                        title: "제1장 총칙",
                        items: [
                            { 
                                article: "제1조(목적)", 
                                // 백틱을 제거하고 일반 따옴표로 연결하여 줄바꿈/공백 오류 방지
                                content: "이 약관은 주식회사 지에스리테일(이하 \"GS리테일\")이 제공하는 GS ALL 멤버십 서비스, 팝카드 서비스 및 GS리테일 관련 서비스를 회원들이 이용함에 있어 GS리테일과 회원 간의 권리 의무 및 기타 필요한 사항 등을 규정하는데 그 목적이 있습니다." 
                            },
                            { 
                                article: "제2조(정의)", 
                                content: [
                                    "① \"회원\"이란 GS리테일에서 제공하는 서비스 이용을 위해 이 약관에 동의하고 GS리테일이 정한 방법과 절차에 따라 개인정보를 제공함으로써 서비스 이용 권한을 부여받은 자를 말합니다. 회원으로 가입하지 않은 \"비회원\" 혹은 본인인증이 완료되지 않은 \"미인증 회원\"은 GS리테일이 제공하는 일부 서비스만 이용할 수 있습니다.",
                                    "② \"회원등급\"이란 GS리테일의 재화를 구매한 결과를 바탕으로 GS리테일이 정한 기준에 따라 GS리테일이 회원에게 부여하는 등급을 말합니다.",
                                    "③ \"서비스\"라 함은 회원에게 제공하는 GS리테일 서비스 및 GS리테일 관련 제반 서비스를 의미합니다. 1. \"GS ALL 멤버십 서비스\"(이하 \"멤버십 서비스\")란 회원을 위해 GS리테일이 제공하는 서비스로서 그 개요는 제7조에 기술된 바와 같습니다. 2. \"팝카드 서비스\"란 회원을 위해 GS리테일이 제공하는 서비스로서 회원이 GS25, GS THE FRESH, 우리동네GS 등에서 재화, 용역 등을 팝카드로 결제 시 할인·증정 등의 혜택을 제공하는 것을 말합니다. 자세한 내용은 제4장에 기술된 바와 같습니다.",
                                    "④ \"팝카드\"란 GS리테일 및 제휴가맹점이 회원으로 하여금 멤버십 서비스 및 팝카드 서비스를 이용할 수 있도록 발급한 카드(모바일 카드 포함)를 말합니다.",
                                    "⑤ \"제휴가맹점\"이란 GS리테일이 멤버십 서비스 또는 팝카드 서비스와 관련하여 각 서비스를 공동으로 운영하기 위해 가맹점 계약 또는 제휴 계약을 체결한 업체(교통기관, 유통업체, 은행, 카드회사 등) 또는 업소(GS리테일 점포 내 임대업체 포함)를 말하며 회원에게 제공되는 서비스는 각 가맹점 계약 또는 제휴 계약의 약정내용에 따라 달라질 수 있습니다."
                                ] 
                            }
                        ]
                    },
                    Chapter4: {
                        title: "제4장 팝카드 서비스",
                        article13: {
                            title: "제13조(팝카드의 종류 및 기능)",
                            desc: "GS리테일이 제공하는 팝카드 서비스를 이용할 수 있는 팝카드의 종류와 기능은 아래와 같습니다.",
                            content: "① 카드별 기능 개요",
                            tableHead: ["팝캐시비 (일반)", "팝티머니 (일반)", "팝티머니(금융)", "멤버십팝", "팝체크/신용"],
                            tableRows: [
                                { label: "공통기능", data: ["O", "O", "O", "O", "O"] },
                                { label: "교통카드", data: ["선불", "선불", "선불", "X", "후불 선택"] },
                                { label: "충전식 선불결제 수단", data: ["O", "O", "O", "O", "X"] },
                                { label: "체크/신용카드", data: ["X", "X", "O", "X", "O"] },
                                { label: "T-마일리지", data: ["X", "X", "O", "X", "O"] },
                                { label: "T-제휴가맹점", data: ["X", "O", "O", "X", "X"] },
                                { label: "제휴가맹점", data: ["(주)이동의즐거움", "(주)티머니", "우리카드<br/>농협은행<br/>국민카드", "한국선불카드<br/>BC카드", "신한카드<br/>농협카드<br/>하나은행<br/>국민카드<br/>하나카드<br/>BC카드<br/>KBANK<br/>삼성카드"] },
                            ]
                        },
                        article14: {
                            title: "제14조(팝카드 서비스의 내용)",
                            content: [
                                "① 회원은 GS리테일 및 제휴가맹점에서 팝카드로 재화와 용역을 구매하고, 할인 및 행사상품을 증정 받을 수 있습니다. 할인율과 증정품은 GS리테일의 판매 정책에 따라 달라질 수 있습니다.",
                                "② 팝카드의 종류 또는 기술적 사유(시스템 점검, 단말기 고장, 통신회선 불량, 신규 카드 또는 단말기의 안정화 작업 등)에 따라 일부 팝카드는 제휴가맹점 이용이 제한될 수 있으며, 이 경우GS리테일은 홈페이지 내 게시하는 방법 등을 통해 고객에게 고지합니다."
                            ]
                        }
                    },
                    Appendix: {
                        title: "부칙",
                        article: "부칙 제1조(효력 및 시행일)",
                        content: "이 약관은 2026년 01월 19일부터 시행합니다.",
                        copyright: "* 이 약관에 대한 저작권은 GS리테일에 귀속하며 무단 복제, 배포, 전송, 기타 저작권 침해행위를 엄금합니다."
                    },
                    check:'확인',
                    기능종류:'기능/종류',


                },
                en: {
                    MainTitle: "GS ALL Membership Terms and Conditions",
                    Greeting: "Notice of Revised Edition: January 19, 2026",
                    numIcons: ["①", "②", "③", "④", "⑤"],
                    yearOptions: [{ value: "2025", label: "2025" }],
                    versionOptions: [{ value: "v1", label: "Notice of Revised Edition: February 26, 2025" }],
                    Chapter1: {
                        title: "Chapter 1: General Provisions",
                        items: [
                            { 
                                article: "Article 1 (Purpose)", 
                                // 백틱을 제거하고 일반 따옴표로 연결하여 줄바꿈/공백 오류 방지
                                content: `These Terms and Conditions govern the rights, obligations, and other necessary matters between GS Retail Co., Ltd. (hereinafter "GS Retail") and its members in connection with the use of the GS ALL Membership Service, POP Card Service, and other GS Retail-related services.` 
                            },
                            { 
                                article: "Article 2 (Definitions)", 
                                content: [
                                    `① A \"Member\" refers to a person who has agreed to these Terms in order to use the services provided by GS Retail and has been granted the right to use the services by providing personal information in accordance with the methods and procedures established by GS Retail. A \"Non-Member\" who has not signed up as a member or an \"Unverified Member\" whose identity verification has not been completed may use only some of the services provided by GS Retail.`/* 260604 번역 */,
                                    `② \"Member Tier\" refers to the tier that GS Retail assigns to a member based on the results of purchasing GS Retail goods, in accordance with the criteria established by GS Retail.`/* 260604 번역 */,
                                    `③ \"Service\" refers to GS Retail services provided to members and all services related to GS Retail. 1. The \"GS ALL Membership Service\" (hereinafter the \"Membership Service\") is a service provided by GS Retail for members, the overview of which is as described in Article 7. 2. The \"POP Card Service\" is a service provided by GS Retail for members, which offers benefits such as discounts and giveaways when a member pays for goods, services, etc. with a POP Card at GS25, GS THE FRESH, Our Neighborhood GS, and so on. Details are as described in Chapter 4.`/* 260604 번역 */,
                                    `④ \"POP Card\" refers to a card (including a mobile card) issued by GS Retail and affiliated merchants to enable members to use the Membership Service and POP Card Service.`/* 260604 번역 */,
                                    `⑤ \"Affiliated Merchant\" refers to a company (transit agency, distributor, bank, card company, etc.) or business (including tenants within GS Retail stores) that has entered into a merchant agreement or partnership agreement with GS Retail to jointly operate the respective service in connection with the Membership Service or POP Card Service. The services provided to members may vary depending on the terms of each merchant agreement or partnership agreement.`/* 260604 번역 */
                                ] 
                            }
                        ]
                    },
                    Chapter4: {
                        title: "Chapter 4: POP Card Services",
                        article13: {
                            title: "Article 13 (Types and Functions of POP Cards)",
                            desc: "The types and functions of POP Cards eligible for the POP Card Service provided by GS Retail are as follows.",
                            content: "① Overview of Card Functions",
                            tableHead: ["POP Cashbee (Standard)", "POP T-money (Standard)", "POP T-money (Financial)", "Membership POP", "POP Check/Credit"],
                            tableRows: [
                                { label: "Common Features"/* 260604 번역 */, data: ["O", "O", "O", "O", "O"] },
                                { label: "Transit Card", data: ["Prepaid", "Prepaid", "Prepaid", "X", "Postpaid (optional)"] },
                                { label: "Rechargeable Prepaid Payment", data: ["O", "O", "O", "O", "X"] },
                                { label: "Debit/Credit Card", data: ["X", "X", "O", "X", "O"] },
                                { label: "T-Mileage", data: ["X", "X", "O", "X", "O"] },
                                { label: "T-Affiliated Merchant"/* 260604 번역 */, data: ["X", "O", "O", "X", "X"] },
                                { label: "Partner Affiliates", data: ["eZL Co., Ltd.", "T-money Co., Ltd.", "Woori Card / Nonghyup Bank / KB Card", "Korea Prepaid Card / BC Card", "Shinhan Card / NH Card / Hana Bank / KB Card / Hana Card / BC Card / K Bank / Samsung Card"] },
                            ]
                        },
                        article14: {
                            title: "Article 14 (Contents of POP Card Services)",
                            content: [
                                "Members may purchase goods and services and receive discounts and gift items at GS Retail and partner affiliates using their POP Card. Discount rates and gift items may vary depending on GS Retail's sales policies.",
                                "① Members may purchase goods and services and receive discounts and gift items at GS Retail and partner affiliates using their POP Card. Discount rates and gift items may vary depending on GS Retail's sales policies.<br />② Depending on the type of POP Card or for technical reasons (system maintenance, terminal malfunction, communication line failure, stabilization work for new cards or terminals, etc.), certain POP Cards may be restricted from use at certain partner affiliates. In such cases, GS Retail shall notify customers via posting on its website or other appropriate means."
                            ]
                        }
                    },
                    Appendix: {
                        title: "Supplementary Provisions",
                        article: "Addendum Article 1 (Effect and Effective Date)"/* 260604 번역 */,
                        content: "These Terms and Conditions shall take effect from January 19, 2026.",
                        copyright: "Supplementary Provisions<br />Article 1 of Supplementary Provisions (Effective Date of Terms and Conditions)<br />These Terms and Conditions shall take effect from January 19, 2026.<br />* The copyright to these Terms and Conditions belongs to GS Retail. Unauthorized reproduction, distribution, transmission, or any other infringement of copyright is strictly prohibited."
                    },
                    check:'Confirm',
                    기능종류:'Function / Type',


                }
            }
        };
    },
    computed: {
        t() { return this.langData.ko; }
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
/* policy_wrap 내부 스타일 */
.policy_wrap {margin-top:64px; padding:32px; border:1px solid #E5E5E9; border-radius:12px;}
.policy_wrap > dl > dt {margin-bottom:32px; color:#161616; font-size:24px; font-weight:700;}
.policy_wrap > dl > dd > dl {margin-bottom:32px;}
.policy_wrap dl dd + dt {margin-top:32px;}
.policy_wrap > dl > dd > dl > dt {color:#161616; font-size:18px; font-weight:700;}
.policy_wrap > dl > dd > dl > dd span {color:#67676F; font-size:18px; line-height:1.4; display:block;}
.policy_wrap > dl > dd > dl > dd > ul > li {color:#67676F; font-size:18px; margin-left:20px; text-indent:-20px; line-height:1.4;}

/* 테이블 스타일 */
.policy_wrap table { width: 100%; margin-top: 10px; border-collapse: collapse; word-break: keep-all; }
.policy_wrap th, .policy_wrap td { padding:10px 20px; color:#161616; font-size:18px; border: 1px solid #E5E5E9; line-height:1.5; white-space: normal; word-break: keep-all; }
.policy_wrap th { background-color: #F8F8F8; border-right: 1px solid #E5E5E9; border-top: 1px solid #000000; text-align: center; }
.policy_wrap tr th:first-child { text-align: left; background-color: #F8F8F8; } /* 첫 번째 열 헤더 처리 */

/* 스크롤 영역 */
.table_scroll_area { width: 100%; overflow-x: visible; }

/* 모달 레이아웃 */
h3 { font-size: 32px; font-weight: 700; }
.flex_between { display: flex; justify-content: space-between; align-items: center; }
.select_group { display: flex; gap: 8px; }
.width_170 { width: 170px; }
.width_260 { width: 260px; }
p {margin-top:4px; font-size:18px; color: #fb6432 !important; }
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 1024px) { 
    .table_scroll_area { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .table_scroll_area table { min-width: 1000px; }
}

@media screen and (max-width: 767px) {
    h3 {font-size:24px;}
    .policy_wrap {padding:0px; border:0;}
    .policy_wrap > dl > dt {margin-bottom:24px; font-size:20px;}
    .policy_wrap > dl > dd > dl > dd span, .policy_wrap > dl > dd > dl > dd > ul > li, p, .desc {font-size:16px; }
    .policy_wrap dd .desc {margin-bottom:8px; font-size:16px;}
    .flex_between {display:flex; flex-direction:column; align-items:stretch;}
    .select_group {margin-top:32px; flex-direction:column;}
    .width_170, .width_260 {width:100%;}
    .policy_wrap th, .policy_wrap td, .policy_wrap > dl > dd > dl > dt {font-size:16px;}
}
</style>