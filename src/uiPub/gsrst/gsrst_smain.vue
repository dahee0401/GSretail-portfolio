<script setup>
import { computed, defineProps } from "vue";
import mainImg01 from "@/assets/images/dummy/gsrst_smain_01.png";
import mainImg02 from "@/assets/images/dummy/gsrst_smain_02.jpg";
import Buttons from "@/components/Buttons.vue";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const langData = {
    ko: {
        pageTitle: "창업안내",
        pageDesc: "더 나은 미래를 향한 동행, GS리테일이 당신의 성공적인 창업을 응원합니다.", /*26.06.25 add 정다희 : 텍스트 수정*/ 
        cards: [
            {
                img: mainImg01,
                cls: "gs25",
                title: "<span class=\"franchise_card_title_point\">GS25</span>와 함께", /*26.06.25 add 정다희 : 텍스트 수정*/ 
                link: "/gsrst02010101",
                linkText: "바로가기",
            },
            {
                img: mainImg02,
                cls: "fresh",
                title: "<span class=\"franchise_card_title_point\">GS THE FRESH</span>와 함께", /*26.06.25 add 정다희 : 텍스트 수정*/ 
                link: "/gsrst01010101",
                linkText: "바로가기",
            },
        ],
    },
    en: {
        pageTitle: "Franchising Guide",
        pageDesc: "Together toward a better future,<br />GS Retail cheers for your successful startup."/* 260604 번역 */,
        cards: [
            {
                img: mainImg01,
                cls: "gs25",
                title: `together with<br /><span class=\"franchise_card_title_point\">GS25</span>`/* 260604 번역 */, /*26.06.25 add 정다희 : 텍스트 수정*/
                link: "/gsrst02010101",
                linkText: "Go >",
            },
            {
                img: mainImg02,
                cls: "fresh",
                title: `together with<br /><span class=\"franchise_card_title_point\">GS THE FRESH</span>`/* 260604 번역 */, /*26.06.25 add 정다희 : 텍스트 수정*/
                link: "/gsrst01010101",
                linkText: "Go >",
            },
        ],
    },
};

const t = computed(() => {
    const currentLang = langData[props.lang];
    return currentLang && currentLang.cards ? currentLang : langData.ko;
});
</script>

<template>
    <section class="sec_franchise">
        <div class="sec_inner">
            <header class="sec_franchise_head">
                <h2>{{ t.pageTitle }}</h2>
                <p v-html="t.pageDesc" />
            </header>

            <ul class="franchise_list">
                <li v-for="(card, i) in t.cards" :key="card.cls + '-' + i">
                    <article
                        class="franchise_card"
                        :class="card.cls"
                        :style="{ backgroundImage: `url(${card.img})` }"
                    >
                        <div class="franchise_card_body">
                            <strong v-html="card.title" />
                        </div>
                        <Buttons
                            tag="a"
                            :href="card.link"
                            btn-class="btn_icon_arrow btn_xl after"
                        >
                            {{ card.linkText }}
                        </Buttons>
                    </article>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
:deep(.m_br) { display: none; }
.sec_franchise { padding: 120px 0 0; }
.sec_inner { max-width: 1460px; margin: 0 auto; padding: 0 20px; }
.sec_franchise_head { margin-bottom: 80px; text-align: center; }
.sec_franchise_head > h2 { color: #000; font-size: 6.4rem; font-weight: 700; line-height: 1.24; letter-spacing: -0.02em; }
.sec_franchise_head > p { margin-top: 12px; color: #000; font-size: 2.4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.02em; }
.franchise_list { width: 100%;; margin: 0 auto; display: flex; align-items: stretch; gap: 20px; }
.franchise_list > li { display: flex; flex: 1 1 0; min-width: 0; max-width: 700px; flex-direction: column; }
.franchise_card { width: 100%; aspect-ratio: 700 / 540; max-height: none; padding: 0; background-size: cover; background-position: center; border-radius: 12px; position: relative; overflow: hidden; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(2.8rem, 2.6vw, 5rem); }
.franchise_card.gs25 :deep(.franchise_card_title_point) { color: #9fcafa; }
.franchise_card.fresh :deep(.franchise_card_title_point) { color: #9de2c5; }
.franchise_list > li .franchise_card_body::before{content: '';position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
.franchise_list > li:nth-child(1) .franchise_card_body::before{background-color: rgba(67, 65, 65, 0.3);filter: blur(80px);-webkit-filter: blur(80px); }
.franchise_list > li:nth-child(2) .franchise_card_body::before{background-color: rgba(40, 42, 53, 0.5); filter: blur(30px); -webkit-filter: blur(30px); }

.franchise_card_body { width: calc(100% - clamp(20px, 3.13vw, 60px)); max-width: clamp(280px, 33.33vw, 640px); padding: clamp(10px, 1.15vw, 22px) 0; text-align: center; position: relative; z-index: 1; }
.franchise_card_body > strong { color: #fff; font-size: clamp(3.1rem, 3.23vw, 6.2rem); font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: break-word; position:relative; z-index: 2; display: block; }
.franchise_card_body > p { margin-top: 4px; color: #fff; font-size: clamp(1.4rem, 1.04vw, 2rem); line-height: 1.35; letter-spacing: -0.01em; }
.franchise_card :deep(a) { margin-top: 0; height: clamp(50px, 3.75vw, 72px); padding: clamp(12px, 1.04vw, 20px) clamp(20px, 2.08vw, 40px); color: #161616; font-size: clamp(1.9rem, 1.25vw, 2.4rem); font-weight: 700; letter-spacing: -0.01em; background-color: #f2f2f4; border-radius: clamp(8px, 0.52vw, 10px); position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; flex-shrink: 0; }
.franchise_card :deep(a)::after { width: clamp(12px, 0.83vw, 16px); height: clamp(12px, 0.83vw, 16px); margin:0;}
@media (max-width: 1024px) {
    .sec_franchise_head { margin-bottom: clamp(48px, 7.81vw, 80px); }
    .sec_franchise_head > h2 { font-size: clamp(4.8rem, 6.25vw, 6.4rem); }
    .sec_franchise_head > p { font-size: clamp(2rem, 2.34vw, 2.4rem); }
}
@media (max-width: 768px) {
    :deep(.m_br) { display: block; }
    .sec_franchise { overflow-x: hidden; } /* 26.06.26 edit 이소라 */
    .sec_inner { padding: 0 20px; }
    .sec_franchise_head {margin-bottom:40px; padding: 0;  }
    .sec_franchise_head > h2 { display: none; }
    .sec_franchise_head > p { margin-top: 0; color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .franchise_list { flex-direction: column; align-items: stretch; gap: clamp(16px, 5.33vw, 20px); }
    .franchise_list > li { flex: 0 0 auto; width: 100%; min-width: 0; max-width: none; }
    .franchise_card { padding: clamp(48px, 16vw, 60px) clamp(16px, 5.33vw, 20px); height: clamp(240px, 76.27vw, 286px); gap: clamp(32px, 12.27vw, 46px); border-radius: 12px; justify-content: flex-start; align-items: center; background-color: #d9d9d9; flex: none; }
    .franchise_card.fresh { height: clamp(220px, 70.93vw, 266px); }
    .franchise_card_body { width: 100%; max-width: clamp(260px, 78.67vw, 295px); padding: 0; }
    .franchise_card_body > strong { font-size: clamp(2.4rem, 7.47vw, 2.8rem); line-height: 1.35; letter-spacing: -0.01em; }
    .franchise_card_body > p { margin-top: 4px; font-size: clamp(1.4rem, 4.27vw, 1.6rem); line-height: 1.5; letter-spacing: -0.01em; }
    .franchise_card :deep(a) { height: clamp(40px, 13.33vw, 50px); margin-top: 0; padding: clamp(10px, 3.2vw, 12px) clamp(12px, 5.33vw, 20px); font-size: clamp(1.4rem, 5.6vw, 2.1rem); background-color: #f2f2f4; border-radius: clamp(6px, 2.13vw, 8px); flex-shrink: 0; }
    .franchise_card :deep(a)::after { width: clamp(12px, 4.27vw, 16px); height: clamp(12px, 4.27vw, 16px); } 
}
</style>
