<template>
    <ul class="history_list">
        <li v-for="item in props.items" :key="item.period" class="history_item" :data-period="item.period">
            <div>
                <strong class="history_period">{{ item.period }}</strong>
                <p v-if="item.summary" class="history_summary">{{ item.summary }}</p>
            </div>
            <div class="history_body">
                <ul class="history_detail_list">
                    <li v-for="(detail, idx) in item.details" :key="item.period + '-' + idx" class="history_detail_row">
                        <p class="history_term_primary">{{ getPrimaryTerm(detail) }}</p>
                        <div class="history_detail_group">
                            <dl v-for="(pair, pairIdx) in getDetailPairs(detail)" :key="item.period + '-' + idx + '-pair-' + pairIdx" class="history_detail_content">
                                <dt v-if="pair.term">{{ pair.term }}</dt>
                                <dt v-else></dt>
                                <dd v-html="pair.desc"></dd>
                            </dl>
                        </div>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    items: { type: Array, default: () => [] },
});

const getTerms = (detail) => {
    if (Array.isArray(detail?.terms)) return detail.terms.filter(Boolean);
    if (Array.isArray(detail?.term)) return detail.term.filter(Boolean);
    if (detail?.term) return [detail.term];
    return [];
};

const getPrimaryTerm = (detail) => getTerms(detail)[0] ?? "";
const getSecondaryTerms = (detail) => getTerms(detail).slice(1);
const getDetailPairs = (detail) => {
    if (Array.isArray(detail?.subDetails) && detail.subDetails.length) return detail.subDetails;
    return [{ term: getSecondaryTerms(detail)[0] ?? "", desc: detail.desc ?? "" }];
};
</script>

<style scoped>
.history_list { padding-left: 48px; position: relative; }
.history_item { display: flex; gap: 32px; position: relative; }
.history_item::before { content: ""; width: 8px; height: 8px; background-color: #107af2; border: 8px solid #cfe4fc; border-radius: 50%; position: absolute; top: 11px; left: -48px; z-index: 5; }
.history_item:not(:last-child)::after { content: ""; width: 1px; height: 100%; background-color: #107af2; position: absolute; top: 12px; bottom: 0; left: -36px; }
.history_period { width: 300px; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; flex-shrink: 0; display: block; }
.history_body { width: 100%; padding-bottom: 100px; }
.history_item:last-child .history_body { padding-bottom: 0; }
.history_summary { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.history_detail_list { display: flex; flex-direction: column;  }
.history_detail_row { margin: 0; display: grid; grid-template-columns: 103px minmax(0, 1fr); column-gap: 20px; align-items: start; }
.history_term_primary { margin: 0; padding: 14px 0; color: #90909a; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.history_detail_group { display: flex; flex-direction: column; }
.history_detail_content { margin: 0; padding: 14px 0; display: grid; grid-template-columns: max-content minmax(0, 1fr); row-gap: 0; column-gap: 0; align-items: start; }
.history_detail_content > dt { min-width: 150px; margin: 0; color: #90909a; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.history_detail_content > dd { margin: 0; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; word-break: keep-all; }

@media (max-width: 768px) {
    .history_list { padding-left: 20px; }
    .history_item { gap: 8px; flex-direction: column; }
    .history_item::before { width: 8px; height: 8px; border-width: 4px; top: 8px; left: -20px; }
    .history_item:not(:last-child)::after { top: 16px; left: -12px; }
    .history_item:last-child .history_body { padding-bottom: 0; }
    .history_period { width: 100%; font-size: 2rem; line-height: 1.35; }
    .history_body { margin-top: 6px; padding-bottom: 42px; }
    .history_summary { font-size: 1.4rem; line-height: 1.4; }
    .history_detail_list { gap: 12px; }
    .history_detail_row { grid-template-columns: minmax(0, 1fr); row-gap: 4px; column-gap: 0; }
    .history_term_primary { padding: 6px 0 0; font-size: 1.6rem; line-height: 1.4; }
    .history_detail_group { gap: 0; }
    .history_detail_content { padding: 0; grid-template-columns: max-content minmax(0, 1fr); row-gap: 0; column-gap: 0; }
    .history_detail_content > dt { font-size: 1.4rem; line-height: 1.4; }
    .history_detail_content > dd { font-size: 1.4rem; line-height: 1.4; }
}
</style>
