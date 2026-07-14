<template>
    <div class="modal_cont gsrst010301">
        <!-- 타이틀 -->
        <div v-if="!inlineMode" class="modal_header">
            {{ t.title }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <p v-html="t.intro"></p>
            <div class="type_table_wrap">
                <table class="type_table">
                    <colgroup>
                        <col class="col_item_main" />
                        <col class="col_item_sub" />
                        <col class="col_cost" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th colspan="2">{{ t.tableHead.item }}</th>
                            <th>{{ t.tableHead.cost }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in t.tableRows" :key="index"> 
                            <th v-if="row.main" :rowspan="row.mainRowspan">{{ row.main }}</th>
                            <th :colspan="row.subColspan || 1">{{ row.sub }}</th>
                            <td v-html="row.cost"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="warning_box">
                <p v-html="t.warningText"></p>
            </div>
        </div>
         
        <div class="modal_bottom">
            <Buttons btn-class="btn_big primary">{{ t.submitLabel }}</Buttons>
            <Buttons btn-class="btn_big gary" @click="closeModal">{{ inlineMode ? t.closeLabel : t.printLabel }}</Buttons>
        </div>

    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
    inlineMode: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["close"]);

const langData = {
    ko: {
        title: "GSF1타입",
        intro: "본부가 임차하여 경영주 운영",
        tableHead: {
            item: "항목",
            cost: "비용",
        },
        tableRows: [
            { main: "투자 금액", mainRowspan: 5, sub: "가맹비", cost: "1,100만원 (부가세포함)" },
            { sub: "초기 상품대", cost: "7,000만원" },
            { sub: "소모품", cost: "700만원" },
            { sub: "시설보증금", cost: "500만원" },
            { sub: "개점투자 계", cost: "9,300만원" },
            { sub: "임차비용 부담주체", subColspan: 2, cost: "본부" },
            { sub: "시설투자 부담주체", subColspan: 2, cost: "본부" },
            { sub: "예치보증금", subColspan: 2, cost: "10,000만원 (보증보험 또는 현금)" },
            { sub: "경영주 투자 합계", subColspan: 2, cost: "최소 19,300만원" },
            { sub: "가맹 수수료 (부가세별도)", subColspan: 2, cost: "57% 매출총이익 구간별 52% ~ 62%" },
            { sub: "계약기간 (최초/재계약)", subColspan: 2, cost: "3년 / 3년 단위" },
            { sub: "담보설정", subColspan: 2, cost: "없음" },
            { sub: "** 최저 수입 보조금", subColspan: 2, cost: "영업면적 200평 초과 : 18백만/월<br />영업면적 165평 이상~200평 이하 : 16백만/월<br />영업면적 165평 미만 : 13백만/월" },
        ],
        warningText: "경영주 총수입(경영주 월매출총이익 + 본부지원금) 기준이며, 인건비 등 영업비용 차감 전 입니다.(개점일로부터 최초 1년만 적용)",
        submitLabel: "확인",
        printLabel: "인쇄하기",
        closeLabel: "닫기",
    },
    en: {
        title: "GSF1 Type"/* 260604 번역 */,
        intro: "Headquarters leases and the store owner operates"/* 260604 번역 */,
        tableHead: {
            item: "Item"/* 260604 번역 */,
            cost: "Cost"/* 260604 번역 */,
        },
        tableRows: [
            { main: "Investment amount"/* 260604 번역 */, mainRowspan: 5, sub: "Franchise Fee"/* 260604 번역 */, cost: "11 million won (VAT included)"/* 260604 번역 */ },
            { sub: "Initial merchandise cost"/* 260604 번역 */, cost: "70 million won"/* 260604 번역 */ },
            { sub: "Consumables", cost: "7 million won"/* 260604 번역 */ },
            { sub: "Facility Deposit"/* 260604 번역 */, cost: "5 million won"/* 260604 번역 */ },
            { sub: "Opening Investment Total"/* 260604 번역 */, cost: "93 million won"/* 260604 번역 */ },
            { sub: "Party responsible for lease costs"/* 260604 번역 */, subColspan: 2, cost: "Headquarters"/* 260604 번역 */ },
            { sub: "Party Bearing Facility Investment"/* 260604 번역 */, subColspan: 2, cost: "Headquarters"/* 260604 번역 */ },
            { sub: "Security Deposit", subColspan: 2, cost: "100 million won (guarantee insurance or cash)"/* 260604 번역 */ },
            { sub: "Total Store Owner Investment"/* 260604 번역 */, subColspan: 2, cost: "Minimum 193 million won"/* 260604 번역 */ },
            { sub: "Franchise Fee (VAT not included)"/* 260604 번역 */, subColspan: 2, cost: "57%, by gross sales profit bracket 52% ~ 62%"/* 260604 번역 */ },
            { sub: "Contract Period", subColspan: 2, cost: "3 years / in 3-year units"/* 260604 번역 */ },
            { sub: "Collateral Setup"/* 260604 번역 */, subColspan: 2, cost: "None"/* 260604 번역 */ },
            { sub: "** Minimum income subsidy"/* 260604 번역 */, subColspan: 2, cost: "Sales area over 200 pyeong: 18 million/month<br />Sales area 165 pyeong or more to 200 pyeong or less: 16 million/month<br />Sales area under 165 pyeong: 13 million/month"/* 260604 번역 */ },
        ],
        warningText: "Based on the store owner's total income (store owner's monthly gross sales profit + headquarters support funds), before deducting operating expenses such as labor costs. (Applies for the first 1 year from the opening date only)"/* 260604 번역 */,
        submitLabel: "Confirm",
        printLabel: "Print"/* 260604 번역 */,
        closeLabel: "Close"/* 260604 번역 */,
    },
};

const t = computed(() => {
    const selected = langData[props.lang];
    return selected && Object.keys(selected).length ? selected : langData.ko;
});




function closeModal(event) {
    if (props.inlineMode) {
        emit("close");
        return;
    }
    modal.close(event.currentTarget);
}
</script>

<style scoped>
:deep(.m_br) { display: none; }
:deep(.p_br) { display: block; }
.modal_content > p{font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;}

.type_table_wrap { margin-top: 20px; overflow-x: auto; border-top: 1px solid #161616; }
.type_table { width: 100%; border-collapse: collapse; }
.type_table .col_item_main { width: 177px; }
.type_table .col_item_sub { width: 177px; }
.type_table .col_cost { width: auto; }
.type_table thead th { padding: 28px 24px; color: #161616; font-size: 1.8rem; font-weight: 600; line-height: 1.4; letter-spacing: -0.01em; background-color: #f8f8f8; border: 1px solid #e5e5e9; text-align: center; }
.type_table tbody th { padding: 12px 24px; color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em; background-color: #f8f8f8; border: 1px solid #e5e5e9; text-align: left; word-break: keep-all; }
.type_table tbody td { padding: 12px 24px; color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em; border-bottom: 1px solid #e5e5e9; text-align: center; word-break: keep-all; }
.modal_bottom { margin-top: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.modal_bottom > :deep(.btn_big) { width: 134px; text-align: center; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.modal_bottom > :deep(button.primary) { background-color:#15B874; }
@media (max-width: 768px) {
    :deep(.m_br) { display: block; }
    :deep(.p_br) { display: none; }
    .modal_content { padding: 0 20px; }
    .type_table_wrap { margin-top: 24px; }
    .type_table .col_item_main { width: 42px; }
    .type_table .col_item_sub { width: 120px; }
    .type_table thead th { padding: 18px 0; font-size: 1.6rem; line-height: 1.24; }
    .type_table tbody th, .type_table tbody td { padding: 15px 24px; font-size: 1.6rem; line-height: 1.5; }
    .type_table tbody th:first-child { padding-left: 14px; padding-right: 14px; }
}
</style>
