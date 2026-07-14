<template>
    <div class="gs_about_container">
        <section class="visual top_visual">
            <strong v-html="t.VisualTitle"></strong>
            <p v-html="t.ceo"></p>
        </section>

        <section class="prepare">
            <div class="inner">
                <header class="header">
                    <h2 v-html="t.PrepareTitle"></h2>
                    <div>
                        <p v-html="t.PrepareDesc1"></p>
                        <p v-html="t.PrepareDesc2"></p>
                    </div>
                </header>
                <ul class="prepare_photos">
                    <li v-for="(item, index) in t.prepare_photos" :key="item" :class="{'big_box': index === 0}">
                        <span class="thumb"><em><img :src="item.img" :alt="item.alt" /></em></span>
                    </li>
                </ul>
            </div>
        </section>

        <section class="sustain">
            <div class="inner">
                <header class="header">
                    <h2 v-html="t.SustainTitle"></h2>
                    <p v-html="t.SustainDesc1"></p>
                    <p v-html="t.SustainDesc2"></p>
                </header>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";


const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const isMobile = ref(false);

// 모든 국문 텍스트 데이터셋 치환 관리
const langData = {
    ko: {
        VisualTitle: `더 나은 일상을 만드는 기업,<br />항상 고객과 함께하는<br />GS리테일이 되겠습니다.`,
        ceo:`<span>대표이사</span><strong>허서홍</strong><em><img src="${require('@/assets/images/sub/gsrab/img_ceo_signature.png')}" /></em>`,
        AboutTitle: `GS리테일은 대한민국을 대표하는<br />Lifestyle Platform 입니다.`,
        AboutDesc: `GS리테일은 다양한 생활 밀착형 플랫폼을 운영하며<br />고객의 Lifestyle을 선도하고 있습니다.`,
        PrepareTitle: `GS리테일은 고객 감동을 위해<br />한 걸음 먼저 준비합니다.`,
        PrepareDesc1: `GS리테일은 1971년 창업 이래 고객 감동을 최우선으로<br class="p_br"/> 최고의 상품과 서비스를 제공하고 있습니다.`, 
        PrepareDesc2: `고객의 삶을 더욱 편리하고 가치 있게 만들기 위해<br class="p_br"/> 한 걸음 더 움직이고 한 걸음 먼저 준비하겠습니다.`, 
        prepare_photos:[
            {img: require("@/assets/images/sub/gsrab/prepare_photos_01.png"), alt:""},
            {img: require("@/assets/images/sub/gsrab/prepare_photos_02.png"), alt:""},
            {img: require("@/assets/images/sub/gsrab/prepare_photos_03.png"), alt:""},
            {img: require("@/assets/images/sub/gsrab/prepare_photos_04.png"), alt:""},
            {img: require("@/assets/images/sub/gsrab/prepare_photos_05.png"), alt:""},
        ],
        SustainTitle: `GS리테일은 지속 가능 경영을<br />적극 실천하고 있습니다.`, 
        SustainDesc1: `GS리테일은 친환경 상품을 확대하고 자원 순환 활성화를 통해<br class="p_br"/> 환경 경영을 실천하고 있습니다.`, 
        SustainDesc2: `또한 경영주·임직원·파트너사·지역사회와 함께 성장하기 위해<br class="p_br"/> 다양한 제도와 정책을 운영하고 있습니다.<br class="m_br"/> 지속 가능한 미래를 위해<br class="p_br"/> ESG 경영을 적극 실천하며<br class="m_br"/> 신뢰받는 기업이 되겠습니다.`, 
        GrowthRow1: "GS리테일은",
        GrowthRow2: "고객과 함께 성장하며",
        GrowthRow3: "더 나은 미래를<br />만들어가겠습니다.",
        GrowthDesc: `항상 고객의 목소리에 귀 기울이고, <br class="m_br"/>혁신을 통해 가치를 창출하며,<br />사회적 책임을 다하는 기업으로 함께하겠습니다.`,
        CeoRole: "대표이사",
        CeoName: "허서홍"
    },
    en: {
        VisualTitle: `A company that makes everyday life better,<br />a company that always puts customers first:<br />that is the GS Retail we strive to be.`,
        ceo:`<span>CEO</span><strong>Suh-hong Hur</strong><em><img src="${require('@/assets/images/sub/gsrab/img_ceo_signature.png')}" /></em>`,
        AboutTitle: `GS Retail is Korea's leading<br />Lifestyle Platform.`,
        AboutDesc: `GS Retail leads the way in everyday living by operating platforms<br />deeply embedded in daily life.`,
        PrepareTitle: `GS Retail goes one step further<br />for customer delight.`,
        PrepareDesc1: `Since its founding in 1971, GS Retail has made customer satisfaction its top priority,<br class="p_br"/>delivering the best products and services.`,
        PrepareDesc2: `We will continue to go the extra mile to make our customers' lives<br class="p_br"/>more convenient and meaningful.`,
        prepare_photos:[
            {img: require("@/assets/images/sub/gsrab/prepare_photos_01.png"), alt:""},
            {img: require("@/assets/images/sub/gsrab/prepare_photos_02.png"), alt:""},
            {img: require("@/assets/images/sub/gsrab/prepare_photos_03.png"), alt:""},
            {img: require("@/assets/images/sub/gsrab/prepare_photos_04.png"), alt:""},
            {img: require("@/assets/images/sub/gsrab/prepare_photos_05.png"), alt:""},
        ],
        SustainTitle: `GS Retail is committed to<br />sustainable business practices.`,
        SustainDesc1: `We are expanding our eco-friendly product lineup and advancing a circular economy,<br class="p_br"/>implementing environmental management.`,
        SustainDesc2: `We also run various programs and initiatives to grow alongside our store owners, employees, partners, and local communities.<br class="m_br"/>Through active ESG leadership,<br class="p_br"/>we will build a sustainable future<br class="m_br"/>and earn the trust of all our stakeholders.`,
        GrowthRow1: "GS Retail",
        GrowthRow2: "will grow alongside our customers",
        GrowthRow3: "and create<br />a better future together.",
        GrowthDesc: `We will always listen to our customers, <br class="m_br"/>create value through innovation,<br />and be a company that lives up to its social responsibilities.`,
        CeoRole: "CEO",
        CeoName: "Suh-hong Hur"
    }
};

const t = computed(() => langData[props.lang] || langData.ko);

const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);

});

onBeforeUnmount(() => {
    window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped>
.gs_about_container {margin-bottom:-200px;}

:deep(.p_br) { display: block; }
:deep(.m_br) { display: none; }
img { width: 100%; height: auto; object-fit: cover; display: block; }
.inner { width: 1460px; max-width: 100%; margin: 0 auto; padding: 0 20px; }
.inner > .header h2 { margin: 0; font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.inner > .header p { margin: 16px 0 0; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.visual { width: 100%; min-height: 100vh; padding: 0 clamp(20px, 5vw, 80px) 0 clamp(20px, 13vw, 250px); position: relative; display: flex; flex-direction:column; justify-content:center; background-image: url("@/assets/images/sub/gsrab/gsrab01_01.png"); background-repeat: no-repeat; background-position: center; background-size: cover; }
.visual > strong { margin: 0; position: relative; z-index: 2; color: #ffffff; font-size: clamp(3.2rem, 2.4rem + 2.5vw, 7.2rem); font-weight: 700; line-height: 1.24; letter-spacing: -0.02em; }
.visual p {margin-top:80px; color:#fff; font-size:2rem;}
.visual p :deep(strong) {margin-left:8px;}
.visual p :deep(em) {margin-top:16px; display:block;}
.about { padding: 200px 0; background-color: #ffffff; }
.about .inner > .header { text-align: center; }
.about .inner > .img_wrap { margin: 120px 0 0; overflow: hidden; }
.about .inner > .img_wrap img { width: 100%; max-width: 1180px; height: 640px; margin: 0 auto; border-radius: 12px; }
.prepare { padding: 100px 0 200px; background-color: #ffffff; }
.prepare .inner > .header { display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; justify-content: space-between; }
.prepare .inner > .header > h2 { margin: 0; text-align: left; }
.prepare .inner > .header > div { min-width: 0; }
.prepare .inner > .header > div > p + p { margin: 10px 0 0; }
/* .prepare .inner > .prepare_photos { margin: 140px 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: 700fr 340fr 340fr; gap: 20px; }
.prepare .inner > .prepare_photos > li { margin: 0; padding: 0; }
.prepare .inner > .prepare_photos > li:first-child > .img_wrap { width: 100%; aspect-ratio: 700 / 480; border-radius: 12px; overflow: hidden; }
.prepare .inner > .prepare_photos > li:first-child > .img_wrap img { width: 100%; height: 100%; }
.prepare .inner > .prepare_photos > li:not(:first-child) { align-self: end; }
.prepare .inner > .prepare_photos > li:not(:first-child) > .img_wrap { width: 100%; aspect-ratio: 340 / 233; border-radius: 12px; overflow: hidden; }
.prepare .inner > .prepare_photos > li:not(:first-child) > .img_wrap img { width: 100%; height: 100%; } */
.prepare_photos {margin-top:140px; display: grid; grid-template-columns: 49.295774% 23.943661% 23.943661%; gap: 20px;}
.prepare_photos li.big_box {grid-row: span 2;}

.sustain { min-height: 100vh; padding: 200px 0; position: relative; background-color: #161616; background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("@/assets/images/dummy/gsrab01_06.png"); background-repeat: no-repeat; background-position: center; background-size: cover; }
.sustain .inner > .header { color: #ffffff; }
.sustain .inner > .header p + p { margin: 16px 0 0; }
.growth { padding: 240px 0 210px; background-color: #ffffff; }
.growth .inner > .growth_row { display: flex; flex-wrap: wrap; gap: 140px; align-items: flex-start; justify-content: center; }
.growth .inner > .growth_row > .growth_visual { width: 340px; max-width: 100%; flex-shrink: 0; }
.growth .inner > .growth_row > .growth_visual > .img_wrap { width: 340px; height: 453px; overflow: hidden; border-radius: 12px; }
.growth .inner > .growth_row > .growth_visual > .img_wrap img { width: 100%; height: 100%; }
.growth .inner > .growth_row > .growth_content { min-width: 0; }
.growth .inner > .growth_row > .growth_content > div:first-of-type > p { margin: 0; font-size: 5.6rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.56px; text-align: left; }
.growth .inner > .growth_row > .growth_content > div:first-of-type > p + p { margin: 20px 0 0; }
.growth .inner > .growth_row > .growth_content > div:first-of-type + p { margin: 64px 0 0; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; text-align: left; }
.growth .inner > .growth_row > .growth_content > .growth_sign_block { margin: 64px 0 0; }
.growth .inner > .growth_row > .growth_content > .growth_sign_block > .growth_role { margin: 0; display: flex; align-items: baseline; gap: 8px; font-size: 2rem; font-weight: 400; line-height: 1.35; letter-spacing: -0.01em; }
.growth .inner > .growth_row > .growth_content > .growth_sign_block > .growth_role strong { font-weight: 700; }
.growth .inner > .growth_row > .growth_content > .growth_sign_block > .img_wrap.growth_sign { margin: 16px 0 0; }
.growth .inner > .growth_row > .growth_content > .growth_sign_block > .img_wrap.growth_sign img { width: 151px; height: auto; max-width: 100%; object-fit: contain; }

@media (max-width: 768px) {
    .gs_about_container {margin-bottom:-100px;}

    :deep(.p_br) { display: none; }
    :deep(.m_br) { display: block; }
    .inner { width: 100%; padding: 0 20px; }
    .visual { min-height: 100dvh; padding: 337px 0 297px; background-image: url("@/assets/images/dummy/mo/gsrab01_01_mo.png"); align-items:center;}
    .visual p {margin-top:10px;}
    .visual > strong { width: 100%; margin: 0 auto; padding: 0; text-align: center; font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.32px; }
    .inner > .header h2 { font-size: 2.4rem; line-height: 1.35; }
    .inner > .header p { margin: 12px 0 0; font-size: 1.6rem; line-height: 1.5; }
    .inner > .img_wrap { margin-top: 40px; }
    .about { padding: 140px 0; background-color: #F8F8F8 }
    .about .inner > .img_wrap { margin-top: 40px; }
    .about .inner > .img_wrap img { max-height: 380px; }
    .prepare { padding: 100px 0; }
    .prepare .inner > .header { flex-direction: column; gap: 0; }
    .prepare .inner > .header > h2 { flex: none; width: 100%; } 
    .prepare .inner > .header > div { flex: none; width: 100%; }
    .prepare .inner > .header > div > p + p { margin: 0; }
    .prepare .inner > .prepare_photos { margin-top: 20px; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; min-height: 0; }
    .prepare .inner > .prepare_photos > li:first-child { grid-column: 1 / -1; }
    .prepare .inner > .prepare_photos > li:first-child > .img_wrap { aspect-ratio: 335 / 480; }
    .prepare .inner > .prepare_photos > li:not(:first-child) { align-self: stretch; }
    .prepare .inner > .prepare_photos > li:not(:first-child) > .img_wrap { aspect-ratio: 157.5 / 130; }
    .sustain {min-height:400px; padding: 80px 0; }
    .growth { padding: 100px 0 190px; }
    .growth .inner > .growth_row { flex-direction: column; gap: 40px; }
    .growth .inner > .growth_row > .growth_visual { width: 100%; }
    .growth .inner > .growth_row > .growth_visual > .img_wrap { width: 260px; height: auto; margin: 0 auto; aspect-ratio: 260 / 346; }
    .growth .inner > .growth_row > .growth_content > div:first-of-type > p { font-size: 2.8rem; line-height: 1.35; }
    .growth .inner > .growth_row > .growth_content > div:first-of-type + p { margin-top: 40px; font-size: 1.6rem; }
    .growth .inner > .growth_row > .growth_content > div:first-of-type > p + p { margin: 0; }
    .growth .inner > .growth_row > .growth_content > .growth_sign_block { margin-top: 40px; }
    .growth .inner > .growth_row > .growth_content > .growth_sign_block > .growth_role { font-size: 2rem; }
}
</style>