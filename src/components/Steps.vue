<script setup>
import { ref, defineProps, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";

defineProps({
    type: { type: String, default: "1" },
    items: { type: Array, default: () => [] },
    cols: { type: Number, default: null },
    rowGap: { type: String, default: null },
});

const _getIsMobile = () => window.innerWidth <= 768;
const isMobileView = ref(false);
const _onResize = () => { isMobileView.value = _getIsMobile(); };

onMounted(() => {
    isMobileView.value = _getIsMobile();
    window.addEventListener("resize", _onResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", _onResize);
});
</script>

<template>
    <!-- PC, 또는 모바일 type=2: ul 리스트 -->
    <ul
        v-if="!isMobileView || type === '2'"
        class="step_list"
        :class="`step_type${type}`"
        :style="{
            '--step-cols': !isMobileView ? (cols ?? items.length) : 1,
            '--step-row-gap': rowGap || undefined,
        }"
    >
        <li v-for="(item, i) in items" :key="i" class="step_item">
            <span class="step_icon"></span>
            <div class="step_body">
                <em class="step_num" :style="item.numColor ? { color: item.numColor } : {}">{{ item.step }}</em>
                <strong class="step_title" v-html="item.title" />
                <p v-if="item.text" class="step_text" v-html="item.text" />
                <ul v-if="item.bullets && item.bullets.length" class="step_bullets">
                    <li v-for="(bullet, bi) in item.bullets" :key="bi" v-html="bullet" />
                </ul>
                <p v-if="item.note" class="step_note" v-html="item.note" />
            </div>
        </li>
    </ul>

    <!-- 모바일 type=1: Swiper -->
    <Swiper
        v-else
        :modules="[Pagination]"
        slides-per-view="auto"
        :space-between="8"
        :pagination="{ clickable: true }"
        class="step_swiper"
    >
        <SwiperSlide v-for="(item, i) in items" :key="i">
            <div class="step_slide_card step_type1">
                <span class="step_icon"></span>
                <div class="step_body">
                    <em class="step_num" :style="item.numColor ? { color: item.numColor } : {}">{{ item.step }}</em>
                    <strong class="step_title" v-html="item.title" />
                    <p v-if="item.text" class="step_text" v-html="item.text" />
                    <ul v-if="item.bullets && item.bullets.length" class="step_bullets">
                        <li v-for="(bullet, bi) in item.bullets" :key="bi" v-html="bullet" />
                    </ul>
                    <p v-if="item.note" class="step_note" v-html="item.note" />
                </div>
            </div>
        </SwiperSlide>
    </Swiper>
</template>

<style scoped>
.step_list {
    padding: 56px 64px;
    background-color: #f8f8f8;
    border-radius: 12px;
    display: grid;
    grid-template-columns: repeat(var(--step-cols), 1fr);
}

.step_list.step_type1{
    gap:16px;
}
.step_list.step_type2{
    row-gap: var(--step-row-gap, 20px);
    column-gap: 20px;
}
/* ── 공통 아이콘 ── */
.step_icon {
    width: 32px;
    height: 32px;
    background: url('@/assets/images/sub/icon_cont_32.png') no-repeat;
    flex-shrink: 0;
    display: block;
}
.step_type2 .step_item:nth-of-type(1) .step_icon {
    background-position: -660px -186px;
}
.step_type2 .step_item:nth-of-type(2) .step_icon {
    background-position: -260px -20px;
}
.step_type2 .step_item:nth-of-type(3) .step_icon {
    background-position: -740px -103px;
}
.step_type2 .step_item:nth-of-type(4) .step_icon {
    background-position: -20px -20px;
}
.step_type2 .step_item:nth-of-type(5) .step_icon {
    background-position: -100px -104px;
}
.step_type2 .step_item:nth-of-type(6) .step_icon {
    background-position: -660px -102px;
}
.step_type2 .step_item:nth-of-type(7) .step_icon {
    background-position: -900px -186px;
}
.step_type2 .step_item:nth-of-type(8) .step_icon {
    background-position: -180px -186px;
}
.step_type2 .step_item:nth-of-type(9) .step_icon {
    background-position: -740px -103px;
}
/* .step_type2 .step_item:nth-of-type(10) .step_icon {
    background-position: -740px -103px;
} */
/* ── 공통 텍스트 ── */
.step_num {
    color: #107af2;
    font-size: 1.8rem;
    font-weight: 700;
    font-style: normal;
    line-height: 1.5;
}

.step_title {
    color: #161616;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.01em;
}

/* ── Type 1: 아이콘 + 텍스트 가로 배치 ── */
.step_type1 .step_num {
    margin-bottom: 4px;
}

.step_type1 .step_item,
.step_type1.step_slide_card {
    display: flex;
    align-items: center;
    gap: 20px;
}

.step_type1 .step_body {
    display: flex;
    flex-direction: column;
}

/* ── Type 2: 아이콘 위, 텍스트 아래 세로 배치 ── */
.step_type2 .step_item,
.step_type2.step_slide_card {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.step_type2 .step_body {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.step_bullets {
    margin: 8px 0 0;
    padding: 0;
    list-style: none;
}

.step_text {
    margin: 10px 0 0;
    color: #67676f;
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: -0.01em;
}

.step_bullets > li {
    padding-left: 12px;
    color: #67676f;
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: -0.01em;
    position: relative;
}



.step_bullets > li::before {
    content: "";
    width: 4px;
    height: 4px;
    background-color: #67676f;
    border-radius: 50%;
    position: absolute;
    /* line-height 1.5 기준: (1.5em / 2) - (4px / 2) ≈ 0.7em */
    top: 0.7em;
    left: 0;
    transform: translateY(-50%);
}

.step_note {
    margin: 4px 0 0;
    color: #fb6432;
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: -0.01em;
}
@media (max-width: 768px) {
    .step_note {
        font-size: 1.4rem;
        line-height: 1.4;
        letter-spacing: -0.01em;
    }
    .step_text {
        margin:0;
        font-size: 1.4rem;
        line-height: 1.4;
        letter-spacing: -0.01em;
    }
}
@media (max-width: 768px) {
    .step_bullets > li {
        padding-left: 6px;
        font-size: 1.4rem;
        line-height: 1.4;
        letter-spacing: -0.01em;
    }
    .step_bullets > li + li{
        margin-top: 6px;
    }
    /* line-height 1.4 기준: (1.4em / 2) ≈ 0.7em */
    .step_bullets > li::before {
        top: 0.7em;
        width:2px;
        height:2px;
    }
}
/* ── 반응형 ── */
@media (max-width: 1024px) {
    .step_list {
        /* padding: 30px 40px; */
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
    .step_list.step_type2 {
        row-gap: 40px;
    }
}

@media (max-width: 768px) {
    /* type=2: 모바일 수직 리스트 */
    .step_icon {
        width: 32px;
        height: 32px;
    }
    .step_bullets{
        margin: 0;
    }
    .step_list.step_type2 {
        padding: 40px 30px;
        grid-template-columns: 1fr;
        gap: 24px;
    }

    .step_type2 .step_item {
        flex-direction: row;
        gap: 16px;
    }

    /* Swiper 컨테이너 */
    .step_swiper {
        overflow: visible;
        padding-bottom: 32px;
    }

    .step_swiper :deep(.swiper-slide) {
        width: 84vw;
    }

    /* 각 슬라이드 카드 */
    .step_slide_card {
        background-color: #f8f8f8;
        border-radius: 12px;
        padding: 32px;
        box-sizing: border-box;
        height: 100%;
    }

    /* pagination */
    .step_swiper :deep(.swiper-pagination) {
        bottom: 0;
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    .step_swiper :deep(.swiper-pagination-bullet) {
        width: 6px;
        height: 6px;
        background-color: #d7d7df;
        border-radius: 50%;
        opacity: 1;
        cursor: pointer;
        display: block;
    }

    .step_swiper :deep(.swiper-pagination-bullet-active) {
        background-color: #161616;
    }

    /* 모바일 타이포 */
    .step_num {
        font-size: 1.6rem;
        line-height: 1.24;
        letter-spacing: 0;
    }

    .step_title {
        font-size: 1.6rem;
        line-height: 1.24;
        letter-spacing: 0;
    }

    .step_type1.step_slide_card {
        gap: 24px;
    }
}
</style>
