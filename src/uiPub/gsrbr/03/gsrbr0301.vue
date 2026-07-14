<template>
    <div class="brand">
        <section ref="sectionRef" class="sec_brand_visual top_visual">
            <div class="sticky">
                <div ref="bgWrapRef" class="bg_wrap">
                    <div class="bg"></div>
                    <div class="visual_inner">
                        <div class="txt_area">
                            <p ref="textParaRef">
                                <span v-for="(line, index) in t.visual.lines" :key="index" v-html="line"></span>
                            </p>
                            <div ref="logoWrapRef" class="logo_wrap">
                                <img :src="imgLogo" :alt="t.visual.logoAlt" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="brand_kv"></section>
        <section ref="aboutSectionRef" class="sec_brand_about">
            <div class="about_inner">
                <div v-for="(block, blockIndex) in t.about" :key="blockIndex" class="about_txt">
                    <p v-for="(line, lineIndex) in block" :key="lineIndex"><span>{{ line }}</span></p>
                </div>
            </div>
        </section>
        <section class="sec_brand_str">
            <div class="str_inner">
                <header class="str_header">
                    <h2 v-html="t.str.headerTitle"></h2>
                    <div class="str_actions">
                        <a
                            href="https://www.gsshop.com/index.gs?utm_source=google.adwords&utm_campaign=SA_GS_Brand_Term&utm_medium=paid_search&opps=gsshop&_emk_keyword=gsshop&no_key_encode=1&media=LLs&gad_source=1&gad_campaignid=22373782952&gbraid=0AAAAACg8DCHe7RxcksZXWK6j5Z-rcJodl&gclid=Cj0KCQiA7-rMBhCFARIsAKnLKtBjgmSBvjeDxKecu1j6gkkxhNWAr0Xo165HEdCyKMpbJxi9AJ5BsKMaAi-5EALw_wcB&fromWith=Y"
                            class="btn_website"
                            target="_blank">{{ t.str.websiteLabel }}</a>
                        <div class="sns_wrap">
                            <a href="https://www.instagram.com/gsshop_story/" class="btn_sns btn_sns_insta" :aria-label="t.str.snsInstaAria" target="_blank"></a>
                            <a href="https://www.youtube.com/channel/UCFR22SdPEC3XmU7nIygGjXw" class="btn_sns btn_sns_yt" :aria-label="t.str.snsYtAria" target="_blank"></a>
                        </div>
                    </div>
                </header>
            </div>
        </section>
        <section class="sec_brand_competency str_inner">
            <header class="str_header">
                <h2>{{ t.competency.title }}</h2>
            </header>
            <figure class="sec_brand_competency_fig">
                <img :src="competencyImgSrc" :alt="t.competency.imageAlt" />
            </figure>
        </section>
        <section class="sec_brand_biz str_inner" :aria-label="t.biz.ariaLabel">
            <header class="str_header">
                <h2 v-html="t.biz.title"></h2>
                <p v-html="t.biz.desc"></p>
            </header>
            <div class="str_biz_fig">
                <div class="str_biz_fig_inner">
                    <div class="str_biz_fig_txt">
                        <strong v-html="t.biz.certTitle"></strong>
                        <p>{{ t.biz.certDesc }}</p>
                        <dl v-if="!isMobileView" class="str_biz_fig_cert">
                            <template v-for="row in ccmCertDlItems" :key="row.term">
                                <dt>{{ row.term }}</dt>
                                <dd><img :src="row.imgSrc" :alt="row.imgAlt" /></dd>
                            </template>
                        </dl>
                    </div>
                    <div class="str_biz_fig_img">
                        <img :src="imgCert03" :alt="t.biz.certImageAlt" />
                    </div>
                </div>
                <dl v-if="isMobileView" class="str_biz_fig_cert">
                    <template v-for="row in ccmCertDlItems" :key="row.term">
                        <dt>{{ row.term }}</dt>
                        <dd><img :src="row.imgSrc" :alt="row.imgAlt" /></dd>
                    </template>
                </dl>
            </div>
            <div class="str_biz_block">
                <h3 class="str_biz_subtit">{{ t.biz.performanceTitle }}</h3>
                <p>{{ t.biz.performanceDesc }}</p>
                <FeatureCards class="str_biz_feature_cards" type="text" :items="ccmFeatureItems" :swiper-space-between="8" />
            </div>
        </section>
        <section class="sec_brand_channel str_inner" :aria-label="t.channel.ariaLabel">
            <header class="str_header str_header_channel"> 
                <h2>{{ t.channel.title }}</h2>
                <p>{{ t.channel.desc }}</p>
            </header>
            <ul class="card_list" role="list">
                <li
                    v-for="card in channelCardList"
                    :key="card.key"
                >
                    <CardItem
                        :thumb-src="card.image"
                        :thumb-alt="card.imgAlt || ''"
                    >
                        <template v-if="card.em" #num>{{ card.em }}</template>
                        <template v-if="card.title" #title>{{ card.title }}</template>
                        <p v-if="card.desc">{{ card.desc }}</p>
                    </CardItem>
                </li>
            </ul>
        </section>
        <section class="sec_brand_program str_inner" :aria-label="t.program.ariaLabel">
            <header class="str_header str_header_program">
                <h2>{{ t.program.title }}</h2>
            </header>
            <ul class="card_list" role="list">
                <li
                    v-for="card in programCardList"
                    :key="card.key"
                >
                    <CardItem
                        :thumb-src="isMobileView && card.image_mo ? card.image_mo : card.image"
                        :thumb-alt="card.imgAlt || ''"
                    >
                        <template v-if="card.title" #title>{{ card.title }}</template>
                        <p v-if="card.desc" v-html="card.desc"></p>
                    </CardItem>
                </li>
            </ul>
            <div class="bottom_btns">
                <button class="btn_back" @click="handleBack">{{ t.backLabel }}</button>
            </div>
        </section>
    </div>


</template>

<script setup>
import { ref, computed, defineProps, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCards from "@/components/FeatureCards.vue";
import CardItem from "@/components/CardItem.vue";
import imgLogo from "@/assets/images/dummy/brand_gsshop_logo.png";
import imgBi09 from "@/assets/images/dummy/gsrbr0301_09.png";
import imgBi09Mo from "@/assets/images/dummy/mo/gsrbr0301_09_mo.png";
import imgBi09En from "@/assets/images/dummy/gsrbr0301_09_en.png"; 
import imgBi09EnMo from "@/assets/images/dummy/mo/gsrbr0301_09_en_mo.png"; 


import imgCert01 from "@/assets/images/dummy/cert_logo_01.png";
import imgCert02 from "@/assets/images/dummy/cert_logo_02.png";
import imgCert03 from "@/assets/images/dummy/cert_logo_03.png";
import imgCh01 from "@/assets/images/sub/gsrbr03/gsrbr0301_10.png";
import imgCh02 from "@/assets/images/sub/gsrbr03/gsrbr0301_11.png";
import imgCh03 from "@/assets/images/sub/gsrbr03/gsrbr0301_12.png";
import imgCh04 from "@/assets/images/sub/gsrbr03/gsrbr0301_13.png";

import imgPr01 from "@/assets/images/sub/gsrbr03/gsrbr0301_14.png";
import imgPr02 from "@/assets/images/sub/gsrbr03/gsrbr0301_15.png";
import imgPr03 from "@/assets/images/sub/gsrbr03/gsrbr0301_16.png";
import imgPr04 from "@/assets/images/sub/gsrbr03/gsrbr0301_17.png";
import imgPr05 from "@/assets/images/sub/gsrbr03/gsrbr0301_18.png";
import imgPr06 from "@/assets/images/sub/gsrbr03/gsrbr0301_19.png";

import imgPr01_mo from "@/assets/images/sub/gsrbr03/gsrbr0301_14_mo.png";
import imgPr02_mo from "@/assets/images/sub/gsrbr03/gsrbr0301_15_mo.png";
import imgPr03_mo from "@/assets/images/sub/gsrbr03/gsrbr0301_16_mo.png";
import imgPr04_mo from "@/assets/images/sub/gsrbr03/gsrbr0301_17_mo.png";
import imgPr05_mo from "@/assets/images/sub/gsrbr03/gsrbr0301_18_mo.png";
import imgPr06_mo from "@/assets/images/sub/gsrbr03/gsrbr0301_19_mo.png";



gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const langData = {
    ko: {
        visual: {
            lines: ["고객의 라이프스타일을 <br class=\"m_br\"/>가치 있게"], 
            logoAlt: "GS SHOP",
        },
        about: [
            [
                "GS SHOP은 고객의 라이프스타일을 깊이 이해하고, 소비의 기준을 만듭니다.",
                "데이터 분석과 AI 기술을 통한 인사이트를 바탕으로",
                "TV, 모바일 등 고객이 있는 모든 접점에서 다양하고",
                "차별화된 상품을 제공하고 있습니다.",
            ],
            [
                "앞으로도 GS SHOP은 고객의 일상에 가장 적합한 선택을 제안하며,",
                "소비의 가치를 높여가겠습니다.",
            ],
        ],
        str: {
            headerTitle: "고객의 더 나은 쇼핑 경험을 위해<br />TV쇼핑·모바일·인터넷 쇼핑을 하나로 통합한 브랜드입니다.",  
            websiteLabel: "홈페이지",
            snsInstaAria: "인스타그램",
            snsYtAria: "유튜브",
        },
        competency: {
            title: "GS SHOP의 비즈니스 핵심역량",
            imageAlt: "GS SHOP의 비즈니스 핵심역량",
        },
        biz: {
            ariaLabel: "GS SHOP 비즈니스 핵심역량",
            title: "소비자중심경영(CCM)을 <br class=\"m_br\"/>실천하는 <br class=\"p_br\"/>GS SHOP",
            desc: "GS SHOP은 소비자의 목소리를 가장 먼저 듣고, <br class=\"m_br\"/> 나누고, 공감하는 CCM 인증기업입니다.",
            certTitle: "CCM(Consumer<br class=\"m_br\"/>Centered Management)<br class=\"m_br\"/>인증이란?",
            certDesc: "기업이 수행하는 모든 활동을 소비자 관점에서 소비자 중심으로 구성하고 관련 경영활동을 지속적으로 개선하고 있는지를 평가하여 인증하는 제도",
            certImageAlt: "소비자중심경영 인증 이미지",
            certItems: [
                { term: "인증기관", imgSrc: imgCert01, imgAlt: "공정거래위원회" },
                { term: "운영기관", imgSrc: imgCert02, imgAlt: "한국소비자원" },
            ],
            performanceTitle: "CCM 도입, 운영 성과",
            performanceDesc: "GS SHOP은 2009년 12월, 첫 인증을 받은 이후 고객을 먼저 생각하는 다양한 활동을 통해 CCM 재인증을 지속적으로 진행해왔습니다.",
            featureItems: [
                {
                    title: "경영 전 과정에<br />CCM 도입",
                    listDotted: true,
                    desc: [
                        "소비자중심경영 실천을 위해 경영 전 과정에 CCM의 가치와 철학을 반영",
                        "고객불만 사전예방 시스템 체계를 구축하고 체계적인 CCM 관리지표 운영",
                    ],
                },
                {
                    title: "소비자<br />권익 증진 노력",
                    listDotted: true,
                    desc: [
                        "'소비자분쟁해결기준'보다 소비자에게 유리한 'CS처리지침 및 고객서비스 정책’ 마련 ",
                        "협력사와 상생경영을 통한 소비자 권익증진 협업시스템 운영",
                    ],
                },
                {
                    title: "소비자 효용을 증대한<br />우수한 서비스",
                    listDotted: true,
                    desc: [
                        "고객의 라이프 스타일을 반영한 서비스 시행",
                    ],
                    subdesc: [
                        "'도착일/수거일 선택 서비스', '안심택배 서비스', '편의점 픽업/반품 서비스' 등 고객 Needs에 부합하는 다양한 배송 서비스 실시",
                        "GS Pay 등 다양한 결제 수단 도입, 결제 편의성 개선 등",
                    ],
                },
            ],
        },
        channel: {
            ariaLabel: "판매 채널 소개",
            title: "판매 채널 소개",
            desc: "TV, 온라인, 모바일 등 고객이 있는 접점에서 GS SHOP만의 쇼핑 경험을 제공합니다.",
            cards: [
                {
                    key: "ch-tv",
                    image: imgCh01,
                    imgAlt: "TV 홈쇼핑",
                    em: "01",
                    title: "TV 홈쇼핑",
                    desc: "국내 최초로 홈쇼핑 방송을 선보인 GS SHOP은 최초 홈쇼핑 채널만의 콘텐츠 제작 역량을 바탕으로 생동감 있는 Live 방송을 통해 고객에게 차별화된 쇼핑 경험을 제공하고 있습니다.",
                },
                {
                    key: "ch-online",
                    image: imgCh02,
                    imgAlt: "데이터 홈쇼핑",
                    em: "02",
                    title: "데이터 홈쇼핑",
                    desc: "고객이 원할 때 리모콘으로 필요한 상품을 직접 선택, 구매할 수 있는 양방향 데이터 쇼핑으로 GS SHOP의 홈쇼핑 노하우를 그대로 담아 IPTV 플랫폼에 맞게 운영하고 있습니다.",
                },
                {
                    key: "ch-mobile",
                    image: imgCh03,
                    imgAlt: "모바일 & 인터넷몰",
                    em: "03",
                    title: "모바일 & 인터넷몰",
                    desc: "GS SHOP은 정교한 고객 DATA 분석을 통해 고객 맞춤형 상품과 매장을 선보이고 있으며 TV쇼핑과 지속적인 시너지를 유지하고 있습니다.",
                },
                {
                    key: "ch-commerce",
                    image: imgCh04,
                    imgAlt: "라이브 커머스",
                    em: "04",
                    title: "라이브 커머스",
                    desc: "GS SHOP에서 실시간 동영상 스트리밍으로 상품을 판매하는 '모바일 라이브'는 고객과 소통하며 상품에 대한 다양하고 생생한 정보를 제공합니다.",
                },
            ],
        },
        program: {
            ariaLabel: "대표 브랜드 프로그램 소개",
            title: "대표 브랜드 프로그램 소개",
            cards: [
                {
                    key: "pr-05",
                    image: imgPr05,
                    image_mo: imgPr05_mo,
                    imgAlt: "대표 브랜드 프로그램 5",
                    title: "쇼미더트렌드",
                    desc: "트렌드를 스타일링하다<br />매주 토요일 저녁 9시 35분",
                },
                {
                    key: "pr-04",
                    image: imgPr04,
                    image_mo: imgPr04_mo,
                    imgAlt: "대표 브랜드 프로그램 4",
                    title: "더컬렉션",
                    desc: "더 럭셔리 프리미엄 편집샵<br />매주 토요일 오전 9시 20분",
                },
                {
                    key: "pr-01",
                    image: imgPr01,
                    image_mo: imgPr01_mo,
                    imgAlt: "대표 브랜드 프로그램 1",
                    title: "소유진쇼",
                    desc: "차원이 다른 쇼핑<br />매주 금요일 저녁 8시 35분",
                },
                {
                    key: "pr-06",
                    image: imgPr06,
                    image_mo: imgPr06_mo,
                    imgAlt: "대표 브랜드 프로그램 6",
                    title: "신상뷰티찬스",
                    desc: "화제의 뷰티템 이달의 신상<br />격주 토요일 낮 11시 50분",
                },
                {
                    key: "pr-02",
                    image: imgPr02,
                    image_mo: imgPr02_mo,
                    imgAlt: "대표 브랜드 프로그램 3",
                    title: "지금 백지연",
                    desc: "프리미엄 큐레이션의 시작<br />매주 목요일 저녁 8시45분",
                },
                {
                    key: "pr-03",
                    image: imgPr03,
                    image_mo: imgPr03_mo,
                    imgAlt: "대표 브랜드 프로그램 3",
                    title: "스타일나우; 더 김동은",
                    desc: "지금, 더 나다워지는 순간<br/> 매주 화요일 오전 8시 15분",
                },
            ],
        },
        backLabel: "목록으로 돌아가기",
    },
    en: {
        visual: {
            lines: ["Every moment of the customer"/* 260604 번역 */, "The core that creates value"/* 260604 번역 */],
            logoAlt: "GS SHOP",
        },
        about: [
            [
                "GS SHOP deeply understands customers' lifestyles and sets the standard for smarter consumption. Powered by insights from data analysis and AI technology, we offer a wide range of distinctive products across all customer touchpoints, including TV and mobile. GS SHOP will continue to recommend the best choices for customers' everyday lives and elevate the value of every purchase.",
                "Based on insights from data analysis and AI technology,"/* 260604 번역 */,
                "Across all touchpoints where customers are, such as TV and mobile, we offer diverse and"/* 260604 번역 */,
                "We provide differentiated products."/* 260604 번역 */,
            ],
            [
                "GS SHOP will continue to suggest the best choices for customers' everyday lives,"/* 260604 번역 */,
                "We will continue to enhance the value of consumption."/* 260604 번역 */,
            ],
        ],
        str: {
            headerTitle: "It is a brand that integrates TV shopping, mobile, and internet shopping into one for a better customer shopping experience.", 
            websiteLabel: "Homepage",
            snsInstaAria: "Instagram"/* 260604 번역 */,
            snsYtAria: "YouTube"/* 260604 번역 */,
        },
        competency: {
            title: "GS SHOP's Core Business Competencies"/* 260604 번역 */,
            imageAlt: "GS SHOP's Core Business Competencies"/* 260604 번역 */,
        },
        biz: {
            ariaLabel: "GS SHOP Core Business Competencies"/* 260604 번역 */,
            title: `Consumer-Centered Management (CCM) <br class=\"m_br\"/>Putting into practice <br class=\"p_br\"/>GS SHOP`/* 260604 번역 */,
            desc: "GS SHOP is a CCM-certified company that puts consumers first — listening to, sharing, and empathizing with their voices.",
            certTitle: "What Is CCM (Consumer Centered Management) Certification?",
            certDesc: "A certification program that evaluates whether a company organizes all its activities from a consumer-centered perspective and continuously improves its related management practices",
            certImageAlt: "Consumer-Centered Management certification image"/* 260604 번역 */,
            certItems: [
                { term: "Certifying Agency", imgSrc: imgCert01, imgAlt: "Korea Fair Trade Commission" },
                { term: "Operating Agency", imgSrc: imgCert02, imgAlt: "Korea Consumer Agency" },
            ],
            performanceTitle: "GS SHOP CCM Implementation and Performance",
            performanceDesc: "Since receiving its first certification in December 2009, GS SHOP has continuously renewed its CCM certification through a variety of customer-first activities.",
            featureItems: [
                {
                    title: "CCM Integrated Across All Management Processes",
                    listDotted: true,
                    desc: [
                        "•Reflecting CCM values and philosophy throughout all management processes to practice Consumer-Centered Management",
                        "•Establishing a proactive customer complaint prevention system and operating systematic CCM management indicators",
                    ],
                },
                {
                    title: "Efforts to Enhance Consumer Rights and Interests",
                    listDotted: true,
                    desc: [
                        "•Establishing 'CS Processing Guidelines and Customer Service Policies' that are more favorable to consumers than the 'Consumer Dispute Resolution Standards'",
                        "•Operating a collaborative system with partner companies to enhance consumer rights through mutual growth management",
                    ],
                },
                {
                    title: "Outstanding Services That Enhance Consumer Benefits",
                    listDotted: true,
                    desc: [
                        "•Services designed around customers' lifestyles",
                    ],
                    subdesc: [
                        "We offer a variety of delivery services tailored to customer needs, including the 'Delivery/Pickup Date Selection Service,' 'Safe Delivery Service,' and 'Convenience Store Pickup/Return Service.'"/* 260604 번역 */,
                        "•- Introduction of diverse payment methods including GS Pay, and improvements to payment convenience",
                    ],
                },
            ],
        },
        channel: {
            ariaLabel: "Sales Channel",
            title: "Sales Channel",
            desc: "We provide GS SHOP's unique shopping experience at every touchpoint where customers are, including TV, online, and mobile."/* 260604 번역 */,
            cards: [
                {
                    key: "ch-tv",
                    image: imgCh01,
                    imgAlt: "TV Home Shopping",
                    em: "01",
                    title: "TV Home Shopping",
                    desc: "GS SHOP, the first to introduce home shopping broadcasting in Korea, leverages its unique content production capabilities as the pioneering home shopping channel to deliver a differentiated shopping experience to customers through vibrant live broadcasts.",
                },
                {
                    key: "ch-online",
                    image: imgCh02,
                    imgAlt: "Data Home Shopping",
                    em: "02",
                    title: "Data Home Shopping",
                    desc: "An interactive data shopping service that lets customers select and purchase products via remote control at any time, bringing GS SHOP's full home shopping expertise to the IPTV platform.",
                },
                {
                    key: "ch-mobile",
                    image: imgCh03,
                    imgAlt: "Mobile & Internet Mall",
                    em: "03",
                    title: "Mobile & Internet Mall",
                    desc: "GS SHOP leverages sophisticated customer data analysis to present personalized products and storefronts, while maintaining continuous synergy with TV shopping.",
                },
                {
                    key: "ch-commerce",
                    image: imgCh04,
                    imgAlt: "Live Commerce",
                    em: "04",
                    title: "Live Commerce",
                    desc: "Mobile Live' sells products through real-time video streaming on GS SHOP, engaging with customers and delivering rich, firsthand product information.",
                },
            ],
        },
        program: {
            ariaLabel: "Flagship Brand Programs",
            title: "Flagship Brand Programs",
            cards: [
                {
                    key: "pr-05",
                    image: imgPr05,
                    image_mo: imgPr05_mo,
                    imgAlt: "Flagship Brand Program 5"/* 260604 번역 */,
                    title: "Show Me the Trend",
                    desc: "Styling the Trend<br />Every Saturday at 9:35 PM",
                },
                {
                    key: "pr-04",
                    image: imgPr04,
                    image_mo: imgPr04_mo,
                    imgAlt: "Flagship Brand Program 4"/* 260604 번역 */,
                    title: "The Collection",
                    desc: "The Luxury Premium Edit<br />Every Saturday at 9:20 AM",
                },
                {
                    key: "pr-01",
                    image: imgPr01,
                    image_mo: imgPr01_mo,
                    imgAlt: "Flagship Brand Program 1"/* 260604 번역 */,
                    title: "The So Yoo-Jin Show",
                    desc: "A Shopping Experience Like No Other <br />Every Friday at 8:35 PM",
                },
                {
                    key: "pr-06",
                    image: imgPr06,
                    image_mo: imgPr06_mo,
                    imgAlt: "Flagship Brand Program 6"/* 260604 번역 */,
                    title: "New Beauty Chance",
                    desc: "This Month's Hottest New Beauty Picks <br />Every Other Saturday at 11:50 AM",
                },
                {
                    key: "pr-02",
                    image: imgPr02,
                    image_mo: imgPr02_mo,
                    imgAlt: "Flagship Brand Program 3"/* 260604 번역 */,
                    title: "Baek Ji-Yeon Now",
                    desc: "Where Premium Curation Begins <br />Every Thursday at 8:45 PM",
                },
                {
                    key: "pr-03",
                    image: imgPr03,
                    image_mo: imgPr03_mo,
                    imgAlt: "Flagship Brand Program 3"/* 260604 번역 */,
                    title: "Style Now; The Kim Dong-eun"/* 260604 번역 */,
                    desc: "Now, the moment you become more yourself<br/> Every Tuesday at 8:15 AM"/* 260604 번역 */,
                },
            ],
        },
        backLabel: "Back to Brand List",
    },
};
const t = computed(() => {
    const selected = langData[props.lang];
    return selected && Object.keys(selected).length ? selected : langData.ko;
});

const _getIsMobile = () => window.innerWidth <= 768;
const isMobileView = ref(_getIsMobile());

const sectionRef = ref(null);
const bgWrapRef = ref(null);
const textParaRef = ref(null);
const logoWrapRef = ref(null);
const aboutSectionRef = ref(null);

const isBiCompetencyMobile = ref(false);
let biCompetencyMql = null;
function onBiCompetencyMqlChange(e) {
    isBiCompetencyMobile.value = e.matches;
}

const competencyImgSrc = computed(() => {
    const isEn = props.lang === "en";
    if (isBiCompetencyMobile.value) {
        return isEn ? imgBi09EnMo : imgBi09Mo;
    }
    return isEn ? imgBi09En : imgBi09;
});


const ccmCertDlItems = computed(() => t.value.biz.certItems);


const ccmFeatureItems = computed(() => t.value.biz.featureItems);

const channelCardList = computed(() => t.value.channel.cards);

const programCardList = computed(() => t.value.program.cards);

let gsapCtx = null;
let resizeTimer = null; 
let syncVisualClip = null;

function onBrandResize() {
    isMobileView.value = _getIsMobile();
    const syncClip = () => {
        if (typeof syncVisualClip === "function") syncVisualClip();
    };
    syncClip();
    requestAnimationFrame(syncClip);
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        syncClip();
    }, 150);
}

function handleBack() {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push("/");
    }
}

function initBrandGsap() {
    if (!sectionRef.value || !bgWrapRef.value || !textParaRef.value || !logoWrapRef.value || !aboutSectionRef.value) {
        return;
    }
    gsapCtx = gsap.context(() => {
        const spans = textParaRef.value.querySelectorAll("span");
        const PHASE1_PX = 400;
        const DESIGN_W = 1920;
        const DESIGN_H = 1080;
        const INSET_X = 250;
        const INSET_Y = 140;
        const TABLET_BP = 1024;
        const TABLET_CLIP_V = 35;
        const TABLET_CLIP_H = 20;
        const TABLET_CLIP_RADIUS = 8;

        const applyBgClip = (p) => {
            const el = bgWrapRef.value;
            if (window.innerWidth <= TABLET_BP) {
                el.style.setProperty("--bgClip", `${p * TABLET_CLIP_V}px ${p * TABLET_CLIP_H}px round ${p * TABLET_CLIP_RADIUS}px`);
                el.style.clipPath = "";
                el.style.webkitClipPath = "";
            } else {
                el.style.removeProperty("--bgClip");
                const bw = el.offsetWidth;
                const bh = el.offsetHeight;
                const hInset = p * (bw * INSET_X) / DESIGN_W;
                const vInset = p * (bh * INSET_Y) / DESIGN_H;
                const clip = `inset(${vInset}px ${hInset}px round ${p * 20}px)`;
                el.style.clipPath = clip;
                el.style.webkitClipPath = clip;
            }
            el.classList.toggle("active", p >= 1);
        };

        const visualSt = ScrollTrigger.create({
            trigger: sectionRef.value,
            start: "top top",
            end: `+=${PHASE1_PX}`,
            scrub: 1.5,
            onUpdate(self) {
                applyBgClip(self.progress);
            },
        });
        syncVisualClip = () => {
            visualSt.update();
            applyBgClip(visualSt.progress);
        };
        applyBgClip(visualSt.progress);
        gsap.set([...spans, logoWrapRef.value], { opacity: 0, y: 40 });

        const textTl = gsap.timeline({ paused: true });
        textTl
            .to(spans, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
            })
            .to(logoWrapRef.value, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
            }, "-=0.3");

        ScrollTrigger.create({
            trigger: sectionRef.value,
            start: `top+=${PHASE1_PX} top`,
            once: false,
            onEnter: () => textTl.play(),
            onLeaveBack: () => textTl.reverse(),
        });

        const aboutSpans = aboutSectionRef.value.querySelectorAll("span");

        gsap.set(aboutSpans, { y: 200, opacity: 0, willChange: "transform, opacity" });

        ScrollTrigger.create({
            trigger: aboutSectionRef.value,
            start: "top 75%",
            once: true,
            onEnter: () => {
                gsap.to(aboutSpans, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    onComplete() {
                        gsap.set(aboutSpans, { willChange: "auto" });
                    },
                });
            },
        });
    });
}

onMounted(() => {
    isMobileView.value = _getIsMobile();
    biCompetencyMql = window.matchMedia("(max-width: 768px)");
    isBiCompetencyMobile.value = biCompetencyMql.matches;
    biCompetencyMql.addEventListener("change", onBiCompetencyMqlChange);
    window.addEventListener("resize", onBrandResize);
    nextTick(() => {
        initBrandGsap();
    });
});

onBeforeUnmount(() => {
    if (biCompetencyMql) {
        biCompetencyMql.removeEventListener("change", onBiCompetencyMqlChange);
        biCompetencyMql = null;
    }
    window.removeEventListener("resize", onBrandResize);
    syncVisualClip = null;
    if (resizeTimer) {
        clearTimeout(resizeTimer);
        resizeTimer = null;
    }
    if (gsapCtx) {
        gsapCtx.revert();
    }
    gsapCtx = null;
});
</script>

<style scoped>
:deep(.p_br) { display: block; }
:deep(.m_br) { display: none; }
img { width: 100%; object-fit: cover; display: block; }
p { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
.brand { max-width: 100%; overflow-x: clip; }
.sec_brand_visual { position: relative; height: calc(100vh + 800px); max-width: 100%; }
.sticky { --base-ratio: 0.75; --base-size: 1536; --base-percent: 100%; width: 100%; max-width: 100%; height: calc(100vh + max(calc(2px * var(--base-ratio)), calc(calc(2 / var(--base-size)) * var(--base-percent)))); position: -webkit-sticky; position: sticky; top: max(calc(1 / var(--base-size) * var(--base-percent) * -1)); left: 0; overflow: hidden }
.bg_wrap { width: 100%; height: 100%; position: relative; z-index: 1; overflow: hidden; clip-path: inset(0% round 0px); -webkit-clip-path: inset(0% round 0px) }

.bg_wrap > .bg { width: 100%; height: 100%; background-image: url(@/assets/images/sub/gsrbr03/gs_shop_bg.png); background-size: cover; background-position: center; position: absolute; top: 0; left: 0; z-index: -1; transform: scale(1.0); transition: transform 0.7s ease-out }
.bg_wrap.active > .bg { transform: scale(0.8) }
.bg_wrap > .bg::before, .bg_wrap > .bg::after { content: ""; width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0; visibility: hidden; pointer-events: none; transition: 0.7s }
.bg_wrap > .bg::after { background: rgba(0, 0, 0, 0.4); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); z-index: 1 }
.bg_wrap.active > .bg::before, .bg_wrap.active > .bg::after { opacity: 1; visibility: visible }
.bg_wrap > .visual_inner {width:100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, calc(-50% + 10px)); border-radius: 20px; display: flex; align-items: center; justify-content: center; }
.bg_wrap .visual_inner > .txt_area { position: relative; z-index: 3; text-align: center }
.logo_wrap{max-width: 382px; margin:0 auto;}
.txt_area > p { width: 100%; margin-bottom: 48px; overflow: hidden }
.txt_area > p > span { color: #fff; font-size: 5.6rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; word-break: keep-all; word-wrap: break-word; display: block }

@media (max-width: 1024px) {
.sec_brand_visual { height: 200vh }
.sec_brand_visual .bg_wrap { --bgClip: 0px 0px round 0px; clip-path: inset(var(--bgClip)); -webkit-clip-path: inset(var(--bgClip)) }
.bg_wrap > .bg { transform: none; transition: none; }
.bg_wrap.active > .bg { transform: none; }
}
.sec_brand_about { padding: clamp(140px, 10.42vw, 200px) 20px; background-color: #f8f8f8; }
.sec_brand_about > .about_inner { width:100%; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; text-align: center; }
.sec_brand_about > .about_inner > .about_txt > p  { overflow: hidden }
.sec_brand_about > .about_inner > .about_txt > p > span { color: #161616; font-size: 3.6rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; will-change: transform, opacity; display: block }
.str_inner { width: 1460px; max-width: 100%; margin: 0 auto; padding: 200px 20px 0; box-sizing: border-box; }
.sec_brand_str .str_inner { padding:200px 20px; }
.sec_brand_str .str_header {flex-wrap:wrap; margin:0;}

section.sec_brand_biz.str_inner .str_header { margin-bottom: 24px; display: block; }
.str_header {margin-bottom: 64px; display: flex; justify-content: space-between; align-items: flex-end }
.str_header h2 { font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em;text-align: left; }
.str_header p {margin-top: 16px;}
.str_header .str_actions { margin-left:auto; display: flex; align-items: center; gap: 24px }
.sns_wrap { display: flex; align-items: center; gap: 6px }
.str_biz_fig { padding:32px; background-color: #F8F8F8; border-radius: 12px; }
.str_biz_fig_inner{display: flex; align-items: center; justify-content: space-between;}
.str_biz_fig strong{font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;}
.str_biz_fig p{margin-top:8px; color:#67676F; font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
.str_biz_fig_cert { margin-top: 50px; display: flex; align-items: center; gap: 16px; }
.str_biz_fig_cert > dt { color: #67676f; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; flex-shrink: 0; white-space: nowrap; }
.str_biz_fig_cert > dd + dt { padding-left: 16px; position: relative; }
.str_biz_fig_cert > dd + dt::before { content: ""; display: block; width: 1px; height: 16px; background-color: #d7d7df; position: absolute; top: 50%; left: 0; transform: translateY(-50%); }
.str_biz_fig_cert > dd > img { display: block; width: auto; max-width: 100%; height: auto; mix-blend-mode: multiply; }
.str_biz_fig_img{padding:0 80px;}

.str_biz_block { width: 100%; margin: 64px 0 0 0 }
.str_biz_subtit { margin: 0; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em }
.str_biz_block p { margin: 16px 0 0 0; color:#67676F;}
.str_biz_block :deep(.feature_card_list) { margin-top: 32px }
.str_biz_block :deep(.feature_card_item) { height: 317px; }
.sec_brand_competency_fig { margin: 0; padding: 0; }
/* 채널 */
.sec_brand_channel .str_header_channel { display: block; margin-bottom: 64px }
.sec_brand_channel .card_list { display: grid; width: 100%; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 80px 40px; align-items: stretch }
.sec_brand_channel .card_list > li,
.sec_brand_program .card_list > li { min-width: 0; min-height: 0; display: flex; flex-direction: column; }
.sec_brand_channel .card_list > li > *,
.sec_brand_program .card_list > li > * { flex: 1; min-height: 0; }
.sec_brand_channel .card_list :deep(.card_thumb) { aspect-ratio: 690 / 380; border-radius: 12px;  background-size:cover;background-blend-mode: multiply;}
.sec_brand_channel .card_list :deep(.card_item .card_body) { padding-top: 24px;}
.sec_brand_channel .card_list :deep(.card_desc) { margin-top: 8px; }
.sec_brand_channel .card_list :deep(.card_desc p){font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;}
/* 프로그램 */
.sec_brand_program .str_header_program { display: block; margin-bottom: 64px }
.sec_brand_program .card_list { display: grid; width: 100%; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 80px 20px; align-items: stretch }
.sec_brand_program .card_list :deep(.card_thumb) {aspect-ratio: 460 / 300; border-radius: 12px; background-size: contain;background-blend-mode: multiply;}

.diff_actions { width: 100%; max-width: 1460px; margin: 0 auto; padding: 100px 20px 0; box-sizing: border-box; }

:deep(.feature_card_sub_list) {margin-top:12px;}
:deep(.feature_card_sub_list li + li) {margin-top:8px;}
:deep(.feature_card_sub_list .feature_card_desc) {padding-left:22px; position:relative;}
:deep(.feature_card_sub_list .feature_card_desc:before) {width:4px; border-top:1px solid #67676F; content:''; position:absolute; top:11px; left:10px;}

@media (max-width: 768px) {
    :deep(.p_br) { display: none; }
    :deep(.m_br) { display: block; }
    p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .sticky { height: 100vh; top: 0 }
    .bg_wrap > .bg {  background-position: 10% 17px }
    .bg_wrap > .visual_inner {transform: translate(-50%, calc(-50% - 10px));  }
    .txt_area > p { margin-bottom: 0 }
    .txt_area > p > span { font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.01em; text-align: center; }
    .txt_area > .logo_wrap { max-width: 219px; margin:10px auto 0; }
    .txt_area > p > span:first-child::after { content: "," }
    .sec_brand_about { padding: clamp(119px, 37.33vw, 140px) 20px; }
    .sec_brand_about > .about_inner { gap: 40px }
    .sec_brand_about > .about_inner > .about_txt > p > span { font-weight: 700; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0%; display: block }
    .sec_brand_str .str_inner{padding: 140px 20px; }
    section.str_inner { padding: 80px 20px 0;}
    .sec_brand_competency.str_inner, .sec_brand_biz.str_inner{padding: 80px 20px 0;}
    .sec_brand_str .str_header h2{font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em;}
    .str_header { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 24px }
    .str_header h2 { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em }
    .str_header p{margin-top:8px; }
    .str_header .str_actions { margin-left:0; gap:14px; flex: none; justify-content: flex-start }
    .sns_wrap { gap: 16px }
    .str_biz_fig_img{min-width:60px; padding:0;}
    section.sec_brand_biz.str_inner .str_header p {font-weight: 700; line-height: 1.24; letter-spacing: 0; }
    .str_biz_fig_inner{gap:20px;}
    .str_biz_fig strong { font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
    .str_biz_fig p { margin-top: 12px; font-size: 1.2rem; line-height: 1.2; letter-spacing: 0; }
    .str_biz_fig_cert { margin-top: 20px; gap: 10px; }
    .str_biz_fig_cert > dt { font-size: 1.2rem; line-height: 1.2; letter-spacing: 0; }
    .str_biz_fig_cert > dd + dt { padding-left: 10px; }
    .str_biz_block { margin-top: 40px }
    .str_biz_subtit { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
    .str_biz_block p { margin-top: 8px; }
    .str_biz_block :deep(.swiper-wrapper) { margin-top: 24px }
    .str_biz_block :deep(.feature_card_item) { height: 312px; }
    .str_biz_feature_cards {--fc-swiper-slide-w: 84.53vw;}

    /* 채널 */
    .sec_brand_channel .card_list { grid-template-columns: minmax(0, 1fr); gap: 40px }
    .sec_brand_channel .str_header_channel { margin-bottom: 40px }
    .sec_brand_channel .card_list :deep(.card_thumb) { aspect-ratio: 335 / 190;}
    .sec_brand_channel .card_list :deep(.card_item .card_body) { padding-top: 20px; display: block;}
    .sec_brand_channel .card_list :deep(.card_item .card_body .card_num),
    .sec_brand_channel .card_list :deep(.card_item .card_body .card_tit) { display: inline-block; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
    .sec_brand_channel .card_list :deep(.card_desc) { margin-top: 4px; margin-left:27px; font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
    .sec_brand_channel .card_list :deep(.card_desc p){font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
    .sec_brand_channel .card_list :deep(.card_item .card_body .card_num) {margin-right:6px;}

    /* 프로그램 */
    .sec_brand_program .str_header_program { margin-bottom: 40px }
    .sec_brand_program .card_list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 10px }
    .sec_brand_program .card_list :deep(.card_thumb) {background-size:cover; aspect-ratio: 162 / 114;}
    .sec_brand_program .card_list :deep(.card_item .card_body) { padding-top: 20px; }
    .sec_brand_program .card_list :deep(.card_desc) { margin-top: 8px; }
    .sec_brand_program .card_list :deep(.card_desc p) { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .diff_actions { max-width: 100%; padding: 80px 20px 0; }
    .diff_actions :deep(.btn_back) { width: 100%; height: 52px; border: 1px solid #67676f; border-radius: 10px; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
    .diff_actions :deep(.btn_back)::before { display: none; }

    :deep(.feature_card_sub_list) {margin-top:6px;}
    :deep(.feature_card_sub_list .feature_card_desc) {padding-left:17px; position:relative;}
    :deep(.feature_card_sub_list .feature_card_desc:before) {width:3px;}
}
</style>
