<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page_title">{{ t.MainTitle }}</h2>
        </div>
        <div class="cont_inner">
            <section class="sec_vision">
                <header class="header">
                    <h3>{{ t.SubTitle }}</h3>
                    <p>{{t.VisionSub}}</p>
                </header>
                <div class="img_wrap">
                    <picture>
                        <source media="(max-width: 768px)" :srcset="imgVisionMo" />
                        <img :src="imgVision" :alt="t.VisionAlt" />
                    </picture>
                </div>
            </section>
            <section class="sec_value">
                <header class="header">
                    <h3>{{ t.valueHeading }}</h3>
                    <p>{{ t.valueSub }}</p>
                </header>
                <ul v-if="!isMobileView" class="value_list">
                    <li v-for="item in t.valueItems" :key="item.title">
                        <div class="item">
                            <span class="thumb"><em><img :src="item.img" :alt="item.title" /></em></span>  
                            <p>
                                <strong>{{ item.title }}</strong>
                                <span>{{ item.desc }}</span>
                            </p>
                        </div>
                    </li>
                </ul>
                <!-- mo swiper -->
                <Swiper v-else slides-per-view="auto" :space-between="8" wrapper-tag="ul" class="value_swiper">
                    <SwiperSlide v-for="item in t.valueItems" :key="item.title" tag="li">
                        <div class="item">
                            <span class="thumb"><em><img :src="item.img" :alt="item.title" /></em></span>
                            <p>
                                <strong>{{ item.title }}</strong>
                                <span>{{ item.desc }}</span>
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <!-- //mo swiper -->
            </section>
            <section class="sec_way">
                <header class="header">
                    <h3>{{ t.wayHeading }}</h3>
                    <p>{{ t.waySub }}</p>
                </header>
                <ul class="way_list">
                    <li v-for="item in t.wayItems" :key="item.title">
                        <strong>{{ item.title }}</strong>
                        <p>{{ item.desc }}</p>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

// 이미지 자원 임포트
import imgVision from "@/assets/images/dummy/gsrab02_02.png";
import imgVisionMo from "@/assets/images/dummy/mo/gsrab02_02_mo.png";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const MOBILE_BREAKPOINT = 768;
const getIsMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;
const isMobileView = ref(false);
const onResize = () => { isMobileView.value = getIsMobile(); };

onMounted(() => {
    isMobileView.value = getIsMobile();
    window.addEventListener("resize", onResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", onResize);
});

// 다국어 데이터셋 객체로 완전 통합
const langData = {
    ko: {
        MainTitle: "경영이념 및 가치체계", 
        SubTitle:'Our Vision',
        VisionSub: "고객의 모든 경험을 연결하고, 데이터로 공감하며, 상품과 서비스로 신뢰받는 플랫폼",
        VisionAlt: "연결, 공감, 신뢰를 표현한 GS리테일 비전 다이어그램",
        valueHeading: "GS Value",
        valueSub: "GS리테일 고유의 가치관",
        valueItems: [
            { title: "Fair", desc: "공정함을 지키고\n사회와 환경에 기여합니다.", img: require("@/assets/images/sub/gsrab/img_value_01.png") },
            { title: "Friendly", desc: "다양성을 인정하고\n서로를 존중합니다.", img: require("@/assets/images/sub/gsrab/img_value_02.png") },
            { title: "Fresh", desc: "창의와 도전을 장려하여\n회사와 개인이 함께 성장합니다.", img: require("@/assets/images/sub/gsrab/img_value_03.png") },
            { title: "Fun", desc: "유연하고 자율적인 환경에서\n즐겁게 일합니다.", img: require("@/assets/images/sub/gsrab/img_value_04.png") },
        ],
        wayHeading: "GS Way",
        waySub: "GS리테일의 일하는 방식",
        wayItems: [
            { title: "01 고객 최우선", desc: "# 업무의 시작과 끝을 고객으로 연결합니다.\n# 고객을 위해, '되는 방법'을 먼저 찾습니다." },
            { title: "02 성장 마인드", desc: "# 작고 빠르게 시도하며 성공 경험을 만듭니다.\n# 매일의 성장과 변화를 추구합니다." },
            { title: "03 열린 소통", desc: "# 명확한 목표와 과정 공유로 눈높이를 맞춥니다.\n# 치열하게 논의하고, One Team으로 해냅니다." },
            { title: "04 AX 실행력", desc: "# 설득과 결정 모두 데이터가 기준입니다.\n# 디지털/AI 툴로 업무 방식을 개선합니다." },
        ],
    },
    en: {
        MainTitle: "Management Philosophy and Value System", 
        SubTitle:'Our Vision',
        VisionSub: "A platform that connects all customer experiences, understands customers through data, and is trusted for its products and services",
        VisionAlt: "GS Retail vision diagram expressing connection, empathy, and trust"/* 260604 번역 */,
        valueHeading: "GS Value",
        valueSub: "GS Retail's Unique Values",
        valueItems: [
            { title: "Fair", desc: "We uphold fairness and\ncontribute to society and the environment."/* 260604 번역 */, img: require("@/assets/images/sub/gsrab/img_value_01.png") },
            { title: "Friendly", desc: "We recognize diversity and\nrespect one another."/* 260604 번역 */, img: require("@/assets/images/sub/gsrab/img_value_02.png") },
            { title: "Fresh", desc: "By encouraging creativity and challenge,\nthe company and individuals grow together."/* 260604 번역 */, img: require("@/assets/images/sub/gsrab/img_value_03.png") },
            { title: "Fun", desc: "Fun – We enjoy our work in a flexible and autonomous environment", img: require("@/assets/images/sub/gsrab/img_value_04.png") },
        ],
        wayHeading: "GS Way",
        waySub: "GS Retail's Way of Working",
        wayItems: [
            { title: "01 Customer First", desc: "# Every aspect of our work begins and ends with the customer.\n# For our customers, we always look for a way to make it work." },
            { title: "02 Growth Mindset", desc: "# We start small, move fast, and build on every success.\n# We pursue growth and continuous improvement every day." },
            { title: "03 Open Communication", desc: "# We get on the same page by sharing clear goals and progress.\n# We debate passionately and deliver as One Team." },
            { title: "04 AX Execution", desc: "# We let data guide both our reasoning and our decisions.\n# We continuously improve how we work through digital and AI tools." },
        ],
    }
};

const locale = computed(() => props.lang); // 외부 props 언어 바인딩 동기화
const t = computed(() => langData[locale.value] || langData.ko);
</script>
<style scoped>
img { width: 100%; height: auto; object-fit: cover; display: block;  }
.main-container { width: 100%; position: relative; display: block; }
.title_wrap { width: 100%; max-height: 480px; padding: 10.91% 0 11.25%; text-align: center; position: relative; display: block; background-color: transparent; background-image: url("@/assets/images/dummy/gsrab02_01.png"); background-repeat: no-repeat; background-size: cover; background-position: center -90px; }
.title_wrap::after { content: ""; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3); position: absolute; left: 0; top: 0; z-index: 1; }
.title_wrap > h2 { color: #fff; font-weight: 700; font-size: 7.2rem; line-height: 1.24; letter-spacing: -0.02em; position: relative; z-index: 2; }
section { padding-top: 200px; }
section > header{margin-bottom:100px;}
.header { text-align: center;}
.header h3 { margin: 0; font-weight: 700; font-size: 4.8rem; line-height: 1.3; letter-spacing: -0.01em; }
.header p { margin: 16px 0 0; font-weight: 700; font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }

.sec_vision .img_wrap picture { width: 100%; position: relative; display: block; }
.sec_vision .img_wrap picture img { margin: 0 auto; object-fit: contain; }

.sec_value .value_list {max-width:1100px; margin:0 auto;}
.sec_value .value_list li + li {margin-top:20px;}
.sec_value .value_list .item {position:relative;}
.sec_value .value_list .item .thumb img {border-radius:12px;}
.sec_value .value_list .item p {position:absolute; top:56px; left:56px; display:flex; flex-direction:column; gap:8px;}
.sec_value .value_list .item p strong {font-size:4rem; letter-spacing:-0.01em; line-height:130%;}
.sec_value .value_list .item p span {font-size:2rem; letter-spacing:-0.01em; line-height:135%; white-space:pre-line;}

.sec_way > .way_list { padding: 0; list-style: none; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.sec_way > .way_list > li {padding: 56px; min-height: 400px; border-radius: 12px; background-repeat: no-repeat; background-position: center; background-size: cover; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; }
.sec_way > .way_list > li > strong { font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.sec_way > .way_list > li > p { margin: 8px 0 0; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; white-space: pre-line; }
.sec_way > .way_list > li:nth-child(1) { background-image: url("@/assets/images/dummy/gsrab02_07.png"); }
.sec_way > .way_list > li:nth-child(2) { background-image: url("@/assets/images/dummy/gsrab02_08.png"); }
.sec_way > .way_list > li:nth-child(3) { background-image: url("@/assets/images/dummy/gsrab02_09.png"); }
.sec_way > .way_list > li:nth-child(4) { background-image: url("@/assets/images/dummy/gsrab02_10.jpg"); }

@media screen and (max-width: 768px) {
    .title_wrap { display: none; }
    .visual_sub { font-size: 2rem; }
    section{padding:60px 0 0; }
    .header {margin-bottom:24px;}
    .header h3 { font-size: 2.4rem; }
    .header p { margin-top: 12px; font-weight: 400; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .sec_vision {padding-top: 120px; }
    .sec_vision .img_wrap picture img{max-width: 335px;}
    .swiper{width: calc(100% + 40px); margin: 0 -20px;padding: 0 20px;}
    .sec_value :deep(.value_swiper .swiper-slide) { width: 84.53vw; }
    .sec_vision header{text-align:left;}
    .sec_value .value_swiper .item .thumb img { aspect-ratio: 317 / 210; border-radius: 12px; }
    .sec_value .value_swiper .item p { margin-top: 8px; display: flex; flex-direction: column; gap: 8px; }
    .sec_value .value_swiper .item p strong { font-size: 2rem; letter-spacing: -0.01em; line-height: 135%; }
    .sec_value .value_swiper .item p span { font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; white-space: pre-line; }
    .sec_way > .way_list { grid-template-columns: 1fr; }
    .sec_way > .way_list > li { min-height: 240px; padding: 56px 20px; }
    .sec_way > .way_list > li > strong { font-size: 2.4rem; line-height: 1.35; }
    .sec_way > .way_list > li > p { margin-top: 8px; font-size: 1.6rem; line-height: 1.5; }
}
</style>
