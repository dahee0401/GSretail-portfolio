<template>
    <article class="store_card" :class="{ is_open: isOpen }">
        <header class="card_head">
            <div class="card_badges">
                <span v-for="t in item.type" :key="t" class="type_badge" :class="getBadgeClass(t)">{{ t }}</span>
                <span class="type_badge badge_gray">{{ item.form }}</span>
                <span v-if="item.isYouth" class="type_badge badge_gray">청년</span>
            </div>
            <span class="card_date">{{ item.date }}</span>
        </header>

        <p class="card_region">{{ item.region }}</p>

        <div class="card_body">
            <p class="card_cost">{{ item.cost }}</p>
            <p class="card_tags">{{ item.tags }}</p>
        </div>

        <button type="button" class="card_detail_btn" @click="$emit('toggle')">
            {{ isOpen ? '접기' : '상세보기' }}
        </button>
    </article>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

function getBadgeClass(t) {
    return /^GS\d/i.test(t) ? 'badge_' + t.toLowerCase() : 'badge_gray';
}

defineProps({
    item: { type: Object, required: true },
    isOpen: { type: Boolean, default: false },
});
defineEmits(['toggle']);
</script>

<style scoped>
/* 카드 */
.store_card { --color-brand-primary: #15b874; }
.store_card { padding: 24px; background: #fff; border: 1px solid #d7d7df; border-radius: 12px; display: flex; flex-direction: column; flex: 1; box-sizing: border-box; transition: border-color 0.15s; }
.store_card.is_open { border-color: var(--color-brand-primary); }

/* 상단 뱃지 + 날짜 */
.card_head { display: flex; align-items: center; justify-content: space-between; }
/* .card_badges { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; } */
.type_badge { padding: 3px 6px; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; border-radius: 4px; display: inline-block; }
.type_badge + .type_badge { margin-left: 4px; }
.badge_gs1 { color: #15b874; background: #e8f8f1; }
.badge_gs2 { color: #fb6432; background: #f9f2ea; }
.badge_gs3 { color: #ed3030; background: #faeeee; }
.type_badge.badge_gray { color: #67676f; background: #f2f2f4; }
.card_date { color: #67676f; font-size: 1.4rem; letter-spacing: -0.01em; white-space: nowrap; }

/* 지역명 */
.card_region { margin-top: 2px; color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }

/* 투자비 + 태그 */
.card_body { margin-top: 24px; display: flex; flex-direction: column; flex: 1; gap: 2px; }
.card_cost { color: #107af2; font-size: 2rem; font-weight: 700; letter-spacing: -0.01em; }
.card_tags { color: #67676f; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }

/* 상세보기 버튼 */
.card_detail_btn { width: 100%; height: 38px; margin-top: 16px; color: #161616; font-size: 1.6rem; letter-spacing: -0.01em; border: none; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; gap: 4px; cursor: pointer; transition: background-color 0.15s; }
.card_detail_btn::after { content: ''; width:20px; height:20px; background:url('@/assets/images/common/icon_set_20.png') no-repeat -191px -25px; flex-shrink: 0; transform-origin: center; transition: transform 0.2s ease; }
.store_card.is_open .card_detail_btn::after { transform: rotate(180deg); }

@media (max-width: 768px) {
    .store_card { padding: 20px; }
    .card_region { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
    .card_cost { font-size: 1.8rem; line-height: 1.5; letter-spacing: -0.01em; }
}
</style>
