<template>
    <div class="gsrbr020101" v-if="t">
        <section ref="sectionRef" class="sec_brand_visual top_visual">
            <div class="sticky">
                <div ref="bgWrapRef" class="bg_wrap">
                    <div class="bg"></div>
                    <div class="visual_inner">
                        <div class="txt_area">
                            <p ref="textParaRef">
                                <span v-for="(line, vi) in t.brand.visual.lines" :key="vi" v-html="line"></span>
                            </p>
                            <div ref="logoWrapRef" class="logo_wrap">
                                <img :src="imgLogo" :alt="t.brand.visual.logoAlt" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="brand_kv"></section>

        <section ref="aboutSectionRef" class="sec_brand_about">
            <div class="about_inner">
                <div v-for="(block, bi) in t.brand.about" :key="bi" class="about_txt">
                    <p v-for="(line, li) in block" :key="li"><span v-html="line"></span></p>
                </div>
            </div>
        </section>

        <section class="brand_value_section">
            <div class="cont_inner">
                <div class="brand_value_wrap">
                    <div class="value_title">
                        <h3 class="title_text" v-html="t.ValueTitle"></h3>
                        <div class="btn_group">
                            <div class="links">
                                <button type="button" class="btn_link ico_location" @click="openModal" data-popid="gsrbr0204" data-type="lg" data-cont="gsrbr0204">{{ t.Buttons.proposal }}</button>
                                <button type="button" class="btn_link btn_store_find" @click="openModal" data-popid="pop_store_find" data-type="lg" data-cont="gsrbr0603">{{ t.Buttons.findStore }}</button>
                                <a href="https://www.instagram.com/gsthefresh_official/" class="btn_sns btn_sns_insta" :aria-label="t.Sns.insta" target="_blank"></a> 
                                <a href="https://www.youtube.com/gsthefresh" class="btn_sns btn_sns_yt" :aria-label="t.Sns.facebook" target="_blank"></a>
                            </div>
                        </div>
                    </div>

                    <ul class="brand_acc">
                        <li
                            v-for="(item, i) in t.AccordionList"
                            :key="i"
                            class="acc_item"
                            :class="{ is_open: openAcc === i }"
                        >
                            <div class="acc_inner">
                                <div class="acc_body">
                                    <button
                                        type="button"
                                        class="acc_btn"
                                        :aria-expanded="openAcc === i"
                                        @click="toggleAcc(i)"
                                        v-html="item.title"
                                    ></button>
                                    <div
                                        :ref="el => { if (el) descRefs[i] = el }"
                                        class="acc_desc_wrap"
                                    >
                                        <p class="acc_desc" v-html="item.desc"></p>
                                    </div>
                                </div>
                                <div
                                    :ref="el => { if (el) imgRefs[i] = el }"
                                    class="acc_img_wrap"
                                >
                                    <img :src="item.img" :alt="item.title" />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
        </section>

        <section class="origin_section">
            <div class="cont_inner">
                <div class="origin_tabs">
                    <Tabs @change="onTabChange1" v-model="originTabIdx1" :tab-items="t.OriginTabs1" tab-class="type_01" :tab-slide="false" />
                </div>

                <div class="tab_content" v-if="originTabIdx1 === 0">
                    <div class="origin_tabs_2depth">
                        <Tabs @change="onTabChange2" v-model="originTabIdx2" :tab-items="t.OriginTabs2" tab-class="type_02" :tab-slide="false" />
                    </div>
                    
                    <div class="sub_tab_content" v-if="originTabIdx2 === 0">
                        <div class="origin_intro">
                            <div class="visual_img_small production_bg"></div>
                            <div class="text_box">
                                <h3 class="title">{{ t.OriginContent.title }}</h3>
                                <p class="desc">{{ t.OriginContent.desc }}</p>
                                <p class="desc">{{ t.OriginContent.desc1 }}</p>
                            </div>
                        </div>

                        <div class="origin_content_wrap">
                            <aside class="origin_lnb">
                                <ul>
                                    <li v-for="(cat, idx) in t.OriginCategories" :key="idx" :class="{ active: currentCat === idx }">
                                        <button type="button" @click="scrollToSection(idx)">{{ cat }}</button>
                                    </li>
                                </ul>
                            </aside>

                            <div class="origin_list_box">
                                <div 
                                    v-for="(group, gIdx) in t.OriginData" 
                                    :key="gIdx" 
                                    ref="originRefs"
                                    class="origin_group"
                                >
                                    <div class="group_header">
                                        <h4 class="group_title">{{ group.category }}</h4>
                                        <p class="group_desc">{{ group.summary }}</p>
                                    </div>
                                    <div class="item_grid">
                                        <div v-for="(item, iIdx) in group.items" :key="iIdx" class="origin_item">
                                            <div class="item_thumb">
                                                <img :src="item.img" :alt="item.name" />
                                            </div>
                                            <p class="item_name">{{ item.name }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="sub_tab_content" v-if="originTabIdx2 === 1">
                        <div class="partnership_wrap">
                            <div class="origin_intro">
                                <div class="visual_img_small partnership_bg">
                                </div>
                                <div class="text_box">
                                    <h3 class="title">{{ t.PartnershipTitle }}</h3>
                                    <p class="desc" v-html="t.PartnershipDesc"></p>
                                </div>
                            </div>

                            <div class="mou_status">
                                <h4 class="sub_title">{{ t.MouStatusTitle }}</h4>
                                <div class="mou_grid">
                                    <div 
                                        v-for="(mou, mIdx) in t.MouList" 
                                        :key="mIdx" 
                                        class="mou_item"
                                        :class="{ 'text_item': mou.isTextType }"
                                    >
                                        <div class="mou_logo" :class="{ 'fipa_logo': mou.isTextType }">
                                            <img :src="mou.img" :alt="mou.name" />
                                        </div>
                                        <div v-if="!mou.isTextType">
                                            <p class="mou_name">{{ mou.name }}</p>
                                        </div>
                                        <div v-else class="mou_text_box">
                                            <p class="mou_name">{{ mou.name }}</p>
                                            <p class="mou_info" v-html="mou.info"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mou_products">
                                <h4 class="sub_title">{{ t.MouProductsTitle }}</h4>
                                <table class="mou_table">
                                    <caption class="blind">{{ t.MouTableCaption }}</caption>
                                    <colgroup>
                                        <col style="width: 15%;">
                                        <col style="width: auto;">
                                    </colgroup>
                                    <tbody>
                                        <tr v-for="(row, rIdx) in t.MouProducts" :key="rIdx">
                                            <th scope="row">{{ row.location }}</th>
                                            <td v-html="row.products"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab_content" v-if="originTabIdx1 === 1">
                    <div class="tm-content-container">
                        <div class="tm-intro-section">
                            <div class="tm-title-box">
                                <h3 class="tm-main-title">{{ t.TasteManagement.title }}</h3>
                                <div class="tm-main-desc-box">
                                    <p class="tm-main-desc" v-html="t.TasteManagement.desc"></p>
                                </div>
                            </div>
                        </div>

                        <div class="tm-node-section">
                            <div class="tm-section-header">
                                <h4 class="tm-section-title">{{ t.TasteManagement.processTitle }}</h4>
                            </div>
                            <div class="tm-steps-wrap">
                                <div class="tm-steps-grid">
                                    <div v-for="(step, sIdx) in t.TasteManagement.steps" :key="sIdx" class="tm-step-item">
                                        <div class="tm-step-info">
                                            <div class="tm-step-header">
                                                <span class="tm-step-num">Step {{ sIdx + 1 }}</span>
                                                <strong class="tm-step-tit">{{ step.title }}</strong>
                                            </div>
                                            <div class="tm-step-body">
                                                <p class="tm-step-text" v-html="step.desc"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tm-node-section">
                            <div class="tm-section-header">
                                <h4 class="tm-section-title">{{ t.TasteManagement.principleTitle }}</h4>
                                <p class="tm-section-subtext">{{ t.TasteManagement.principleSub }}</p>
                            </div>
                            <div class="tm-principles-container res-swiper-container">
                                <swiper
                                    :slides-per-view="'auto'"
                                    :space-between="0"
                                    :breakpoints="{
                                        768: {
                                            allowTouchMove: false
                                        }
                                    }"
                                    class="tm-principles-swiper"
                                >
                                    <swiper-slide 
                                        v-for="(p, pIdx) in t.TasteManagement.principles" 
                                        :key="'principle-' + pIdx" 
                                        class="tm-principle-card res-slide-item"
                                    >
                                        <div class="tm-card-header">
                                            <span class="tm-card-num">0{{ pIdx + 1 }}</span>
                                            <strong class="tm-card-tit">{{ p.title }}</strong>
                                        </div>
                                        <div class="tm-card-body">
                                            <p class="tm-card-main-text">{{ p.desc }}</p>
                                            <p class="tm-card-sub-text">{{ p.subDesc }}</p>
                                        </div>
                                        <div v-if="pIdx < t.TasteManagement.principles.length - 1" class="divider pc-only"></div>
                                    </swiper-slide>
                                </swiper>
                            </div>
                        </div>

                        <div class="tm-node-section">
                            <div class="tm-product-layout">
                                <aside class="tm-lnb-side">
                                    <div class="tm-lnb-list">
                                        <div v-for="(cat, cIdx) in t.TasteManagement.categories" :key="cIdx" 
                                             class="tm-lnb-item" :class="{ 'is-active': currentTasteCat === cIdx }">
                                            <button type="button" @click="scrollToTasteSection(cIdx)">{{ cat }}</button>
                                        </div>
                                    </div>
                                </aside>
                                <div class="tm-product-main">
                                    <div 
                                        v-for="(group, gIdx) in t.TasteManagement.productGroups" 
                                        :key="gIdx" 
                                        ref="tasteRefs" 
                                        class="tm-group-container"
                                    >
                                        <h4 class="tm-group-title">{{ group.category }}</h4>
                                        <div class="tm-product-grid">
                                            <div v-for="(item, iIdx) in group.items" :key="iIdx" class="tm-product-card">
                                                <div class="tm-product-thumb">
                                                    <img v-if="item.img" :src="item.img" :alt="item.name" />
                                                </div>
                                                <div class="tm-product-info">
                                                    <p class="tm-product-name">{{ item.name }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DiffQrRow v-if="t.qr" :title="t.qr.title" :desc="t.qr.desc" />
                <div class="bottom_btns">
                    <button type="button" class="btn_back" @click="handleBack">{{ t.Buttons.backToList }}</button>
                </div>
                <a class="btn_big border">{{ t.Buttons.backToList}}</a>
            </div>
        </section>

        <div id="gsrbr0203" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrbr0204" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrbr020401" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="pop_store_find" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

    </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import modal from "@/assets/js/modal";
import DiffQrRow from "@/components/DiffQrRow.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import imgLogo from "@/assets/images/dummy/brand_fresh_logo.png";

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

let resizeTimer = null; 
let syncVisualClip = null;

export default {
    name: "GsTheFreshBrand",
    components: {
        Tabs,
        Swiper,
        SwiperSlide,
        DiffQrRow
    },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            openAcc: -1,
            descRefs: [],
            imgRefs: [],
            accTokens: [0, 0],
            originTabIdx1: 0,
            originTabIdx2: 0,
            currentCat: 0,
            currentTasteCat: 0,
            gsapCtx: null,
            originScrollRaf: null,
            imgLogo,
            langData: {
                ko: {
                    brand: {
                        visual: {
                            lines: [
                                "신선한 행복을 채우다", 
                            ],
                            logoAlt:  "GS THE FRESH 메인 비주얼",
                        },
                        about: [
                            [
                                '1974년 럭키수퍼체인(주)로 출범한 LG수퍼마켓은',
                                "GS그룹의 출범에 따라 GS수퍼마켓으로 변경되고,",
                                "이후 2019년 '삶의 가치를 누리는 라이프스타일 마켓'으로의 변화를 위해",
                                '"GS THE FRESH"로 새롭게 태어나게 되었습니다.',
                            ],
                            [
                                '새롭게 태어난 GS THE FRESH는 Friendly, Fresh, Fun 가치와 함께', 
                                '고객의 생활에 늘 가까이 있는 점포로서 신선하고 다양한 상품을 제공함과',
                                '동시에 더욱 친근한 서비스를 바탕으로 고객과 함께하는',
                                '친근하고, 신속하며, 편리하고 즐거운 쇼핑문화를 지향합니다.'
                            ],

                        ],
                    },
                    ValueTitle:"가족과 함께하는 행복<br/>쇼핑 산지의 신선함을 그대로 고객님께 전해드립니다.", 
                    Buttons: {  
                        proposal: "입지 제안",
                        findStore: "매장 찾기",
                        backToList: "목록으로 돌아가기"
                    },
                    Sns: {
                        insta: "인스타그램",
                        facebook: "페이스북"
                    },
                    AccordionList: [
                        {
                            title: "신선, 맛, 서비스<br/> 대한민국 NO.1을 향한 약속",
                            desc: "전국의 우수 산지에서 가장 신선하고 맛있는 상품만을 선별하고, <br/>GS THE FRESH만의 엄격한 추가 검품 과정을 통해 최고의 상품 서비스를 제공하고 있습니다.<br/><br/>또한 고객 중심의 차별화된 서비스로 한국서비스품질지수(KS-SQI) 10년 연속 1위를 수상하는 등 고객을 위한 매장을 만들어가고 있습니다.", /**26.07.09 edit 정다희 : <br/> 제거 */
                            img: require("@/assets/images/sub/gsrbr020101/gsrbr020101_3.png")
                        },
                        {
                            title: "GS THE FRESH만의<br/> 차별화된 컨텐츠로 업계 선도",
                            desc: "상품성을 갖춘 우수 중소업체의 상품을 발굴해<br/> 일반상품 가격의 7~80% 수준 가격으로 판매하는 '리얼프라이스'와<br/> 우수산지에서 선도, 당도를 엄선한 신선식품 전용 브랜드 '신선특별시' 등<br/> 차별화된 상품과 서비스로 국내 수퍼마켓 업계를 선도하고 있습니다.",
                            img: require("@/assets/images/sub/gsrbr020101/gsrbr020101_4.png")
                        }
                    ],
                    OriginTabs1: [{ item: "신선 산지 안내" }, { item: "맛/선도 관리" }],
                    OriginTabs2: [{ item: "전국 우수 산지" }, { item: "함께하는 지자체" }],
                    OriginContent: {
                        title: "전국 우수 산지",
                        desc: "GS리테일은 고객에게 항상 신선하고 우수한 품질의 상품을 제공하고자 노력하고 있습니다.",
                        desc1: "지속적인 발굴과 지원을 통해 우수산지를 확보하고, 우수산지에서 생산된 최고 품질의 상품을 고객에게 제공해 드리고 있습니다."
                    },
                    OriginCategories: ["과일", "수산", "채소", "양곡", "축산"],
                    OriginData: [
                        {
                            category: "과일",
                            summary: "달콤함이 가득한 제철의 정수, 전국 산지에서 갓 수확한 프리미엄 과일",
                            items: [
                                { name: "영흥섬 포도", img: require("@/assets/images/sub/gsrbr020101/tab_1_1.png") },
                                { name: "제주 감귤", img: require("@/assets/images/sub/gsrbr020101/tab_1_2.png") },
                                { name: "하동 딸기", img: require("@/assets/images/sub/gsrbr020101/tab_1_3.png") },
                                { name: "안동 사과", img: require("@/assets/images/sub/gsrbr020101/tab_1_4.png") }
                            ]
                        },
                        {
                            category: "수산",
                            summary: "청정 해역의 신선함을 그대로, 산지 직송 수산물",
                            items: [
                                { name: "부산 생물고등어", img: require("@/assets/images/sub/gsrbr020101/tab_1_5.png") },
                                { name: "대부도 바지락", img: require("@/assets/images/sub/gsrbr020101/tab_1_6.png") },
                                { name: "제주도 갈치", img: require("@/assets/images/dummy/tab_1_7.png") },
                                { name: "완도 전복", img: require("@/assets/images/sub/gsrbr020101/tab_1_8.png") }
                            ]
                        },
                        {
                            category: "채소",
                            summary: "땅의 기운을 담은 신선한 채소, 건강한 밥상의 시작",
                            items: [
                                { name: "금산 깻잎", img: require("@/assets/images/sub/gsrbr020101/tab_1_9.png") },
                                { name: "해남 고구마", img: require("@/assets/images/sub/gsrbr020101/tab_1_10.png") },
                                { name: "제주 깐마늘", img: require("@/assets/images/sub/gsrbr020101/tab_1_11.png") },
                                { name: "해남 절임배추", img: require("@/assets/images/sub/gsrbr020101/tab_1_12.png") },
                                { name: "참타리버섯", img: require("@/assets/images/sub/gsrbr020101/tab_1_13.png") }
                            ]
                        },
                        {
                            category: "양곡",
                            summary: "고슬고슬 밥맛 좋은 우리 곡식",
                            items: [{ name: "당진 쌀", img: require("@/assets/images/sub/gsrbr020101/tab_1_14.png") }]
                        },
                        {
                            category: "축산",
                            summary: "풍부한 육즙의 고품질 축산물",
                            items: [{ name: "우월 한우", img: require("@/assets/images/sub/gsrbr020101/tab_1_15.png") }]
                        }
                    ],
                    PartnershipTitle: "함께하는 지자체",
                    PartnershipDesc: `GS리테일은 함께하는 지자체 활동(MOU)을 통해 지역경제 활성화에 앞장서고 있습니다.
                    <span>* 7개의 광역자치단체, 13개의 기초자치단체, 1개 수협중앙회(완도수협) 와 MOU(Memorandum of Understanding, 양해각서) 를 체결</span>`,
                    MouStatusTitle: "지자체 MOU 체결 현황",
                    MouList: [
                        { name: "진도군 MOU 체결", img: require("@/assets/images/dummy/tab_1_2_1.png"), isTextType: false },
                        { name: "밀양시 MOU 체결", img: require("@/assets/images/dummy/tab_1_2_2.png"), isTextType: false },
                        { name: "고창군 MOU 체결", img: require("@/assets/images/dummy/tab_1_2_3.png"), isTextType: false },
                        { name: "전라남도 MOU 체결", img: require("@/assets/images/dummy/tab_1_2_4.png"), isTextType: false },
                        { name: "부산광역시 MOU 체결", img: require("@/assets/images/dummy/tab_1_2_5.png"), isTextType: false },
                        { name: "충청남도 MOU 체결", img: require("@/assets/images/dummy/tab_1_2_6.png"), isTextType: false },
                        { name: "완도군 MOU 체결", img: require("@/assets/images/dummy/tab_1_2_7.png"), isTextType: false },
                        { 
                            name: "업무협약 체결", 
                            img: require("@/assets/images/dummy/tab_1_2_8.png"), 
                            info: "경상남도 청년 어업인 연합회, 한국어촌어항공단, <br/>경상남도 업무협약 체결",
                            isTextType: true 
                        }
                    ],
                    MouProductsTitle: "MOU체결을 통한 신선식품",
                    MouTableCaption: "지자체별 MOU 체결 신선식품 정보",
                    MouProducts: [
                        { location: "충청남도", products: "상추, 깻잎, 부추, 딸기, 수박, 대추방울토마토, 메론, 사과, 배, 한우, 국산돈육, 계란, 꽃게" },
                        { location: "전라남도", products: "<p>강진군: 양곡, 돈육</p><p>나주시: 배, 오리</p><p>무안군: 양파</p><p>해남군: 고구마, 절임배추</p><p>완도군: 전복</p><p>영광군: 굴비</p><p>신안군: 김, 소금</p><p>진도군: 대파</p><p>장흥군: 블루베리, 오리</p>" },
                        { location: "경상남도", products: "<p>밀양시: 상추, 깻잎, 표고버섯, 토마토, 메론, 수박, 사과, 단감, 딸기</p><p>울릉도: 나물</p><p>산청군: 딸기, 계란, 생물</p>" },
                        { location: "전라북도", products: "고창군: 양곡" },
                        { location: "경기도", products: "안성시: 배, 한우, 돈육" },
                        { location: "제주도", products: "밀감, 한라봉, 키위, 갈치" },
                        { location: "부산시", products: "대저토마토" }
                    ],
                    TasteManagement: {
                        title: "맛·선도 지킴이 안내",
                        desc: "신선, 맛, NO.1을 위한 GS리테일의 선도 지킴이 활동을 확인해보세요.<br/>GS리테일은 가장 맛있고 신선하며 안전이 검증된, 차별화된 상품만을 엄선하여 고객님께 제공합니다.",
                        processTitle: "맛·선도 관리 노하우",
                        steps: [
                            { title: "신선한 상품", desc: "담사기준에 적합한 산지의 신선한 상품만을 공급합니다."},
                            { title: "완벽한 검품", desc: "물류센터에 상품이 입고되면 완벽한 검품 활동을 통해, 불량상품 입고를 원천봉쇄 합니다."},
                            { title: "최적의 온도", desc: "차량 내 할로겐과 냉장기를 통해 신선함을 유지할 수 있는 최적의 온도로 배송합니다."},
                            { title: "점포 내 관리", desc: "점포에서는 가장 신선한 상품을 고객에게 제공하기 위하여 점포별 선도지킴이를 운영하고 있으며 선도지킴이는 상품의 선도 및 판매기간을 수시로 확인하여 최고의 상품님께 제공하고 있습니다."},
                            { title: "고객 만족", desc: "산지, 물류센터를 거쳐 점포 및 고객님께 판매되기까지 완벽한 콜드체인시스템(Cold Chain System) 으로 고객님에게 산지의 맛과 신선함을 그대로 전달해드리고 있습니다."}
                        ],
                        principleTitle: "맛·선도 관리방침",
                        principleSub: "GS리테일의 먹거리 약속과 철저한 선도관리 기준을 소개합니다.",
                        principles: [
                            { title: "생산자 직거래", desc: "밭에서 뽑은 채소의 싱싱함을 식탁까지 전달해드립니다.", subDesc: "생산자 재배, 수확시점관리를 통하여 항상 최상의 상품만을 공급합니다." },
                            { title: "최고의 당도", desc: "과수원의 맛! 과수에서 충분히 익은 상품만 수확합니다.", subDesc: "유통되는 시간을 고려하여 미리 수확해야 하지만 GS 과일은 과수에서 최대한 익혀서 수확하기 때문에 당도가 매우 높고 맛있습니다." },
                            { title: "부드럽고 풍부한 육즙", desc: "담백하고 부드러운 맛! 생산 후 숙성과정을 거친 상미기간 내 상품만 입고됩니다.", subDesc: "한우 육즙의 맛을 지키기 위해 최고의 냉장 배송 시스템, 신선유지 노하우를 34년 동안 발전시켜 왔습니다." },
                            { title: "바다 직송 시스템", desc: "갓 잡은 수산물을 항공배송과 새벽직송을 통하여 신선하게 입고합니다.", subDesc: "항공배 및 새벽직송을 통하여 갓 잡은 수산물을 매장에 입고 시키기 때문에, 바닷가에서 먹는 수산물의 맛을 느끼실 수 있습니다." }
                        ],
                        categories: ["맛있는 고기", "싱싱한 과일", "신선한 채소", "신선한 해산물"],
                        productGroups: [
                            {
                                category: "맛있는 고기",
                                items: [
                                    { name: "소갈비", img: require("@/assets/images/dummy/tab_2_1.png") },
                                    { name: "국거리용 소고기", img: require("@/assets/images/dummy/tab_2_2.png") },
                                    { name: "한우안심", img: require("@/assets/images/dummy/tab_2_3.png") },
                                    { name: "삼겹살", img: require("@/assets/images/dummy/tab_2_4.png") },
                                    { name: "계랸", img: require("@/assets/images/dummy/tab_2_5.png") },
                                    { name: "닭고기", img: require("@/assets/images/dummy/tab_2_6.png") },
                                    { name: "한우등심", img: require("@/assets/images/dummy/tab_2_7.png") },
                                    { name: "불고기용 소고기", img: require("@/assets/images/dummy/tab_2_8.png") },
                                    { name: "목심", img: require("@/assets/images/dummy/tab_2_9.png") }
                                ]
                            },
                            {
                                category: "싱싱한 과일",
                                items: [
                                    { name: "거창 애플딸기", img: require("@/assets/images/dummy/tab_2_10.png") },
                                    { name: "딸기", img: require("@/assets/images/dummy/tab_2_11.png") },
                                    { name: "수박", img: require("@/assets/images/dummy/tab_2_12.png") },
                                    { name: "키위", img: require("@/assets/images/dummy/tab_2_13.png") },
                                    { name: "밀감", img: require("@/assets/images/dummy/tab_2_14.png") },
                                    { name: "토마토", img: require("@/assets/images/dummy/tab_2_15.png") },
                                    { name: "참외", img: require("@/assets/images/dummy/tab_2_16.png") },
                                    { name: "멜론", img: require("@/assets/images/dummy/tab_2_17.png") },
                                    { name: "사과", img: require("@/assets/images/dummy/tab_2_18.png") },
                                    { name: "배", img: require("@/assets/images/dummy/tab_2_19.png") }
                                ]
                            },
                            {
                                category: "신선한 채소",
                                items: [
                                    { name: "무", img: require("@/assets/images/dummy/tab_2_20.png") },
                                    { name: "파프리카", img: require("@/assets/images/dummy/tab_2_21.png") },
                                    { name: "양파", img: require("@/assets/images/dummy/tab_2_22.png") },
                                    { name: "배추", img: require("@/assets/images/dummy/tab_2_29.png") },
                                    { name: "고구마", img: require("@/assets/images/dummy/tab_2_23.png") },
                                    { name: "새송이 버섯", img: require("@/assets/images/dummy/tab_2_24.png") },
                                ]
                            },
                            {
                                category: "신선한 해산물",
                                items: [
                                    { name: "김", img: require("@/assets/images/dummy/tab_2_25.png") },
                                    { name: "백진미", img: require("@/assets/images/dummy/tab_2_26.png") },
                                    { name: "멸치", img: require("@/assets/images/dummy/tab_2_27.png") },
                                    { name: "오징어", img: require("@/assets/images/dummy/tab_2_28.png") },
                                ]
                            }
                        ]
                    },
                    qr: { 
                        title: "우리동네GS 앱 다운로드",
                        desc: "우리동네GS 앱을 다운로드하고, GS25의 다양한 이벤트와 차별화 상품을 만나보세요.<br />QR코드를 스캔하면 앱 다운로드 페이지로 이동합니다.",
                    },
                    
                },
                en: {
                    brand: {
                        visual: {
                            lines: [
                                "A brand that brings freshness and happiness",
                            ],
                            logoAlt:  "GS THE FRESH Main Visual"/* 260604 번역 */,
                        },
                        about: [
                            [
                                'LG Supermarket, which launched in 1974 as Lucky Super Chain Co., Ltd.,'/* 260604 번역 */,
                                "With the launch of the GS Group, it was renamed GS Supermarket,"/* 260604 번역 */,
                                "Later, in 2019, to transform into a 'lifestyle market where you enjoy life's value,'"/* 260604 번역 */,
                                'Reborn anew as "GS THE FRESH."'/* 260604 번역 */,
                            ],
                            [
                                'The newly reborn GS THE FRESH, embracing the values of Friendly, Fresh, and Fun,'/* 260604 번역 */,
                                `As a store that is always close to customers' lives,`/* 260604 번역 */,
                                'While offering fresh and diverse products and providing even friendlier service,'/* 260604 번역 */,
                                'We strive for a friendly, fast, convenient, and enjoyable shopping culture together with our customers.'/* 260604 번역 */
                            ],
                            [
                                'GS THE FRESH, meeting customers again under a new name,'/* 260604 번역 */,
                                'we will create a shopping culture that brings fresh happiness,'/* 260604 번역 */,
                                'We promise to bring even greater satisfaction to our customers.'/* 260604 번역 */
                            ]
                        ],
                    },
                    ValueTitle: "Happy family shopping, with farm-fresh products delivered straight to your door.",
                    Buttons: {
                        proposal: "Location Inquiry",
                        findStore: "Find a Store",
                        backToList: "Back to Brand List"
                    },
                    Sns: {
                        insta: "Instagram"/* 260604 번역 */,
                        facebook: "Facebook"/* 260604 번역 */
                    },
                    AccordionList: [
                        {
                            title: "We promise to be Korea's No. 1 in freshness, taste, and service.",
                            desc: "We carefully select only the freshest and most flavorful products from top-quality production regions nationwide, <br />putting each through GS THE FRESH's rigorous inspection process to deliver the very best. <br />With a commitment to customer-centered service, we have ranked No. 1 for 10 consecutive years in the Korean Service Quality Index (KS-SQI), and we continue to build a store our customers love.",
                            img: require("@/assets/images/sub/gsrbr020101/gsrbr020101_3.png")
                        },
                        {
                            title: "GS THE FRESH leads the industry with its own distinctive offerings.",
                            desc: "We discover marketable products from outstanding small and medium-sized businesses<br/>'REAL price,' which sells products at around 70–80% of regular prices, and<br/>Brands such as 'Sinseon Special City,' a dedicated fresh-food brand sourcing carefully selected freshness and sweetness from premium regions,<br/>We lead Korea's supermarket industry with differentiated products and services."/* 260604 번역 */,
                            img: require("@/assets/images/sub/gsrbr020101/gsrbr020101_4.png")
                        }
                    ],
                    OriginTabs1: [{ item: "Fresh Growing Region Guide" }, { item: "Taste and Freshness Management" }],
                    OriginTabs2: [{ item: "Premium Growing Regions Nationwide" }, { item: "Partner Local Governments" }],
                    OriginContent: {
                        title: "Premium Growing Regions Nationwide",
                        desc: "GS Retail is committed to always providing customers with fresh, high-quality products.",
                        desc1: "Through ongoing sourcing efforts and support, we partner with premium growing regions to bring the finest products straight to our customers."
                    },
                    OriginCategories: ["Fruit", "Seafood", "Vegetables", "Grains", "Livestock"],
                    OriginData: [
                        {
                            category: "Fruit",
                            summary: "Sweet, seasonal perfection: premium fruit freshly harvested from growing regions across the country",
                            items: [
                                { name: "Yeongheung Island grapes"/* 260604 번역 */, img: require("@/assets/images/sub/gsrbr020101/tab_1_1.png") },
                                { name: "Jeju Tangerines", img: require("@/assets/images/sub/gsrbr020101/tab_1_2.png") },
                                { name: "Hadong Strawberries", img: require("@/assets/images/sub/gsrbr020101/tab_1_3.png") },
                                { name: "Andong Apples", img: require("@/assets/images/sub/gsrbr020101/tab_1_4.png") }
                            ]
                        },
                        {
                            category: "Seafood",
                            summary: "The freshness of pristine waters, delivered straight from the source: fresh seafood",
                            items: [
                                { name: "Busan Fresh Mackerel", img: require("@/assets/images/sub/gsrbr020101/tab_1_5.png") },
                                { name: "Daebudo Clams", img: require("@/assets/images/sub/gsrbr020101/tab_1_6.png") },
                                { name: "Jeju Island hairtail"/* 260604 번역 */, img: require("@/assets/images/dummy/tab_1_7.png") },
                                { name: "Wando Abalone", img: require("@/assets/images/sub/gsrbr020101/tab_1_8.png") }
                            ]
                        },
                        {
                            category: "Vegetables",
                            summary: "Fresh vegetables infused with the vitality of the earth: the start of a healthy meal",
                            items: [
                                { name: "Geumsan Perilla Leaves", img: require("@/assets/images/sub/gsrbr020101/tab_1_9.png") },
                                { name: "Haenam Sweet Potatoes", img: require("@/assets/images/sub/gsrbr020101/tab_1_10.png") },
                                { name: "Jeju Peeled Garlic", img: require("@/assets/images/sub/gsrbr020101/tab_1_11.png") },
                                { name: "Haenam Salted Cabbage", img: require("@/assets/images/sub/gsrbr020101/tab_1_12.png") },
                                { name: "Chamtari mushrooms"/* 260604 번역 */, img: require("@/assets/images/sub/gsrbr020101/tab_1_13.png") }
                            ]
                        },
                        {
                            category: "Grains",
                            summary: "Our wholesome grains: firm, plump, and full of flavor",
                            items: [{ name: "Dangjin Rice", img: require("@/assets/images/sub/gsrbr020101/tab_1_14.png") }]
                        },
                        {
                            category: "Livestock",
                            summary: "High-quality livestock products with rich, succulent flavor",
                            items: [{ name: "Yeongwol Hanwoo", img: require("@/assets/images/sub/gsrbr020101/tab_1_15.png") }]
                        }
                    ],
                    PartnershipTitle: "Partner Local Governments",
                    PartnershipDesc: `GS Retail is leading the way in revitalizing local economies through collaborative activities (MOUs) with local governments.
                    <span>* Signed MOUs (Memorandums of Understanding) with 7 metropolitan/provincial governments, 13 local governments, and 1 fisheries cooperative (Wando Suhyup).</span>`/* 260604 번역 */,
                    MouStatusTitle: "Local Government MOU Status",
                    MouList: [
                        { name: "MOU Signed with Jindo County", img: require("@/assets/images/dummy/tab_1_2_1.png"), isTextType: false },
                        { name: "MOU Signed with Miryang City", img: require("@/assets/images/dummy/tab_1_2_2.png"), isTextType: false },
                        { name: "MOU Signed with Gochang County", img: require("@/assets/images/dummy/tab_1_2_3.png"), isTextType: false },
                        { name: "MOU Signed with South Jeolla Province", img: require("@/assets/images/dummy/tab_1_2_4.png"), isTextType: false },
                        { name: "MOU signed with Busan Metropolitan City"/* 260604 번역 */, img: require("@/assets/images/dummy/tab_1_2_5.png"), isTextType: false },
                        { name: "MOU Signed with South Chungcheong Province", img: require("@/assets/images/dummy/tab_1_2_6.png"), isTextType: false },
                        { name: "MOU Signed with Wando County", img: require("@/assets/images/dummy/tab_1_2_7.png"), isTextType: false },
                        { 
                            name: "Business agreement signed"/* 260604 번역 */, 
                            img: require("@/assets/images/dummy/tab_1_2_8.png"), 
                            info: "MOU Signed with South Gyeongsang Province Young Fishers Association, Korea Fisheries Infrastructure Public Agency, and South Gyeongsang Province",
                            isTextType: true 
                        }
                    ],
                    MouProductsTitle: "Fresh food through MOU partnerships"/* 260604 번역 */,
                    MouTableCaption: "Fresh food information from MOUs signed with local governments"/* 260604 번역 */,
                    MouProducts: [
                        { location: "South Chungcheong Province", products: "Lettuce, perilla leaves, chives, strawberries, watermelon, cherry tomatoes, melon, apples, pears, Korean beef (Hanwoo), domestic pork, eggs, blue crabs" },
                        { location: "South Jeolla Province", products: "* Gangjin County: grains, pork | * Naju City: pears, duck | * Muan County: onions | * * Haenam County: sweet potatoes, salted cabbage | * Wando County: abalone | * Yeonggwang County: dried yellow corvina | * Sinan County: dried seaweed, salt | * Jindo County: green onions | * Jangheung County: blueberries, duck" },
                        { location: "South Gyeongsang Province", products: "* Miryang City: lettuce, perilla leaves, shiitake mushrooms, tomatoes, melon, watermelon, apples, persimmons, strawberries | * Ulleungdo: wild herbs | * Sancheong County: strawberries, eggs, fresh catch" },
                        { location: "North Jeolla Province", products: "* Gochang County: grains" },
                        { location: "Gyeonggi Province", products: "* Anseong City: pears, Korean beef (Hanwoo), pork" },
                        { location: "Jeju Island", products: "Tangerines, Hallabong (Jeju citrus), kiwi, hairtail" },
                        { location: "Busan City", products: "Daejeo Tomatoes" }
                    ],
                    TasteManagement: {
                        title: "Taste & Freshness Guardian",
                        desc: "Discover GS Retail's Freshness Guardian program, dedicated to being No. 1 in freshness, taste, and quality. GS Retail carefully selects only the most delicious, fresh, and safety-verified products for our customers.",
                        processTitle: "Expertise in managing taste and freshness"/* 260604 번역 */,
                        steps: [
                            { title: "Fresh Products", desc: "We supply only fresh products from growing regions that meet our sourcing standards."},
                            { title: "Thorough Inspection", desc: "When products arrive at the distribution center, thorough inspection procedures are carried out to block all defective products from entering."},
                            { title: "Optimal Temperature", desc: "Products are delivered at optimal temperatures using in-vehicle halogen heaters and refrigeration units to maintain freshness."},
                            { title: "In-Store Management", desc: "Each store operates a designated Freshness Guardian to provide customers with the freshest products possible. The Freshness Guardian regularly monitors product freshness and remaining shelf life to ensure only the finest products reach our customers."},
                            { title: "Customer Satisfaction", desc: "From growing regions through distribution centers to stores and into your hands, our complete Cold Chain System delivers the original taste and freshness straight from the source."}
                        ],
                        principleTitle: "Taste and Freshness Management Policy",
                        principleSub: "Learn about GS Retail's food promise and rigorous freshness management standards.",
                        principles: [
                            { title: "1. Direct Trade with Producers", desc: "We bring the crispness of field-fresh vegetables straight to your table.", subDesc: "Through careful cultivation and harvest timing, we always supply only the finest products." },
                            { title: "The finest sweetness"/* 260604 번역 */, desc: "The taste of the orchard! We harvest only fruit that has fully ripened on the tree.", subDesc: "While most produce is harvested early to allow for distribution time, GS fruit is left to ripen fully on the tree, resulting in exceptionally high sugar content and outstanding flavor." },
                            { title: "3. Tender and Juicy!", desc: "Light and tender flavor! Only products that have undergone a post-production aging process and are within their optimal consumption period are stocked.", subDesc: "To preserve the rich, juicy flavor of Korean beef (Hanwoo), we have refined our refrigerated delivery system and freshness-maintenance know-how over 34 years." },
                            { title: "Direct-from-sea delivery system"/* 260604 번역 */, desc: "The taste of seafood straight from the sea! Freshly caught seafood is delivered via air freight and early morning direct delivery.", subDesc: "With freshly caught seafood delivered via air freight and early morning direct delivery, you can enjoy the taste of seafood as if you were right by the sea." }
                        ],
                        categories: ["Delicious Meat", "Fresh Fruit", "Fresh Vegetables", "Fresh Seafood"],
                        productGroups: [
                            {
                                category: "Delicious Meat",
                                items: [
                                    { name: "Beef Short Ribs", img: require("@/assets/images/dummy/tab_2_1.png") },
                                    { name: "Beef for Soup", img: require("@/assets/images/dummy/tab_2_2.png") },
                                    { name: "Hanwoo Tenderloin", img: require("@/assets/images/dummy/tab_2_3.png") },
                                    { name: "Pork Belly", img: require("@/assets/images/dummy/tab_2_4.png") },
                                    { name: "Eggs"/* 260604 번역 */, img: require("@/assets/images/dummy/tab_2_5.png") },
                                    { name: "Chicken", img: require("@/assets/images/dummy/tab_2_6.png") },
                                    { name: "Hanwoo Sirloin", img: require("@/assets/images/dummy/tab_2_7.png") },
                                    { name: "Beef for Bulgogi", img: require("@/assets/images/dummy/tab_2_8.png") },
                                    { name: "Pork Shoulder (Neck)", img: require("@/assets/images/dummy/tab_2_9.png") }
                                ]
                            },
                            {
                                category: "Fresh Fruit",
                                items: [
                                    { name: "Geochang Apple Strawberries", img: require("@/assets/images/dummy/tab_2_10.png") },
                                    { name: "Strawberries", img: require("@/assets/images/dummy/tab_2_11.png") },
                                    { name: "Watermelon", img: require("@/assets/images/dummy/tab_2_12.png") },
                                    { name: "Kiwi", img: require("@/assets/images/dummy/tab_2_13.png") },
                                    { name: "Tangerines", img: require("@/assets/images/dummy/tab_2_14.png") },
                                    { name: "Tomatoes", img: require("@/assets/images/dummy/tab_2_15.png") },
                                    { name: "Korean Melon", img: require("@/assets/images/dummy/tab_2_16.png") },
                                    { name: "Melon", img: require("@/assets/images/dummy/tab_2_17.png") },
                                    { name: "Apples", img: require("@/assets/images/dummy/tab_2_18.png") },
                                    { name: "Pears", img: require("@/assets/images/dummy/tab_2_19.png") }
                                ]
                            },
                            {
                                category: "Fresh Vegetables",
                                items: [
                                    { name: "Daikon Radish", img: require("@/assets/images/dummy/tab_2_20.png") },
                                    { name: "Bell Peppers", img: require("@/assets/images/dummy/tab_2_21.png") },
                                    { name: "Onions", img: require("@/assets/images/dummy/tab_2_22.png") },
                                    { name: "Napa Cabbage", img: require("@/assets/images/dummy/tab_2_29.png") },
                                    { name: "Sweet Potatoes", img: require("@/assets/images/dummy/tab_2_23.png") },
                                    { name: "King Oyster Mushrooms", img: require("@/assets/images/dummy/tab_2_24.png") },
                                ]
                            },
                            {
                                category: "Fresh Seafood",
                                items: [
                                    { name: "Dried Seaweed (Gim/Nori)", img: require("@/assets/images/dummy/tab_2_25.png") },
                                    { name: "Dried Squid", img: require("@/assets/images/dummy/tab_2_26.png") },
                                    { name: "Anchovies", img: require("@/assets/images/dummy/tab_2_27.png") },
                                    { name: "Squid", img: require("@/assets/images/dummy/tab_2_28.png") },
                                ]
                            }
                        ]
                    },
                    qr: {
                        title: "Download the Our Neighborhood GS app"/* 260604 번역 */,
                        desc: "Download the Our Neighborhood GS app and discover GS25's various events and exclusive products.<br />Scanning the QR code takes you to the app download page."/* 260604 번역 */,
                    },
                }
            }
        };
    },
    computed: {
        t() {
            return this.langData[this.lang] || this.langData.ko;
        }
    },
    mounted() {
        window.addEventListener("resize", this._onResize);
        this.$nextTick(() => {
            setTimeout(() => {
                this.initVisualInteraction();
                // 26.06.23 add 정다희 : origin_lnb — 스크롤 위치에 따라 currentCat(active) 동기화
                this.setupOriginSpy();
            }, 100);
        });
    },
    beforeUnmount() {
        window.removeEventListener("resize", this._onResize);
        // 26.06.23 add 정다희 : origin_lnb 스크롤 스파이 리스너 해제
        this.teardownOriginSpy();
        syncVisualClip = null;
        if (this.gsapCtx) {
            this.gsapCtx.revert();
            this.gsapCtx = null;
        }
    },
    methods: {
        onTabChange1(idx) {
            this.originTabIdx1 = idx;
            this.originTabIdx2 = 0;
            // 26.06.23 add 정다희 : 1depth 탭 전환 시 스크롤 스파이 재등록(전국 우수 산지 탭에서만 동작)
            this.$nextTick(() => this.setupOriginSpy());
        },
        onTabChange2(idx) {
            this.originTabIdx2 = idx;
            // 26.06.23 add 정다희 : 2depth 탭 전환 시 스크롤 스파이 재등록
            this.$nextTick(() => this.setupOriginSpy());
        },
        // 26.06.23 add 정다희 : origin_lnb 스크롤 스파이 — 신선 산지 안내 > 전국 우수 산지 구간에서만 scroll 이벤트 등록
        setupOriginSpy() {
            this.teardownOriginSpy();
            if (this.originTabIdx1 !== 0 || this.originTabIdx2 !== 0) return;
            this._updateOriginActive();
            window.addEventListener("scroll", this._onOriginScroll, { passive: true });
        },
        // 26.06.23 add 정다희 : origin_lnb 스크롤 스파이 해제
        teardownOriginSpy() {
            window.removeEventListener("scroll", this._onOriginScroll);
            if (this.originScrollRaf) {
                cancelAnimationFrame(this.originScrollRaf);
                this.originScrollRaf = null;
            }
        },
        // 26.06.23 add 정다희 : scroll 이벤트 rAF 스로틀 — 스크롤 중 currentCat 갱신
        _onOriginScroll() {
            if (this.originScrollRaf) return;
            this.originScrollRaf = requestAnimationFrame(() => {
                this.originScrollRaf = null;
                this._updateOriginActive();
            });
        },
        // 26.06.23 add 정다희 : 뷰포트 상단(offset)을 지난 마지막 origin_group 기준으로 li.active(currentCat) 결정 — offset은 .origin_group scroll-margin-top(100px)와 동일
        _updateOriginActive() {
            if (this.originTabIdx1 !== 0 || this.originTabIdx2 !== 0) return;
            const targets = this.$refs.originRefs;
            if (!targets) return;
            const sections = Array.isArray(targets) ? targets : [targets];
            const offset = 101; // .origin_group scroll-margin-top 100px + 1
            let activeIdx = 0;
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].getBoundingClientRect().top <= offset) activeIdx = i;
            }
            if (this.currentCat !== activeIdx) this.currentCat = activeIdx;
        },
        scrollToSection(idx) {
            this.currentCat = idx;
            const targets = this.$refs.originRefs;
            if (targets && targets[idx]) {
                targets[idx].scrollIntoView({ behavior: "smooth", block: "start" });
            }
        },
        scrollToTasteSection(idx) {
            this.currentTasteCat = idx;
            const targets = this.$refs.tasteRefs;
            if (targets && targets[idx]) {
                targets[idx].scrollIntoView({ behavior: "smooth", block: "start" });
            }
        },
        _animateOpen(el, myToken, index) {
            if (!el || (el.classList.contains("acc_show") && el.style.height === "auto")) return;
            el.classList.add("acc_animating", "acc_show");
            el.style.height = "auto";
            const heightPx = `${el.scrollHeight}px`;
            el.style.height = "0px";
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (myToken !== this.accTokens[index]) return;
                    el.style.height = heightPx;
                });
            });
            el.addEventListener("transitionend", function onEnd(e) {
                if (e.target !== el || e.propertyName !== "height") return;
                el.removeEventListener("transitionend", onEnd);
                if (myToken !== this.accTokens[index]) return;
                el.style.height = "auto";
                el.classList.remove("acc_animating");
            }.bind(this));
        },
        _animateClose(el, myToken, index) {
            if (!el || !el.classList.contains("acc_show")) return;
            el.classList.add("acc_animating");
            const h = el.scrollHeight;
            if (h === 0) {
                el.classList.remove("acc_show", "acc_animating");
                el.style.height = "";
                return;
            }
            el.style.height = `${h}px`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (myToken !== this.accTokens[index]) return;
                    el.style.height = "0px";
                });
            });
            el.addEventListener("transitionend", function onEnd(e) {
                if (e.target !== el || e.propertyName !== "height") return;
                el.removeEventListener("transitionend", onEnd);
                if (myToken !== this.accTokens[index]) return;
                el.classList.remove("acc_show", "acc_animating");
                el.style.height = "";
            }.bind(this));
        },
        toggleAcc(index) {
            const prev = this.openAcc;
            if (prev === index) {
                this.openAcc = -1;
                const token = ++this.accTokens[index];
                this._animateClose(this.descRefs[index], token, index);
                this._animateClose(this.imgRefs[index], token, index);
                return;
            }
            if (prev !== -1) {
                const token = ++this.accTokens[prev];
                this._animateClose(this.descRefs[prev], token, prev);
                this._animateClose(this.imgRefs[prev], token, prev);
            }
            this.openAcc = index;
            const token = ++this.accTokens[index];
            this._animateOpen(this.descRefs[index], token, index);
            this.$nextTick(() => {
                this._animateOpen(this.imgRefs[index], token, index);
            });
        },
        handleBack() {
            this.$router.back();
        },
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default";
            const cont = el.dataset.cont;
            modal.open(popId, type, el, cont);
        },
        initVisualInteraction() {
            const section = this.$refs.sectionRef;
            const bgWrap = this.$refs.bgWrapRef;
            const textPara = this.$refs.textParaRef;
            const logoWrap = this.$refs.logoWrapRef;
            const aboutSection = this.$refs.aboutSectionRef;

            if (!section || !bgWrap || !textPara || !logoWrap || !aboutSection) return;

            this.gsapCtx = gsap.context(() => {
                const spans = textPara.querySelectorAll("span");
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
                    if (window.innerWidth <= TABLET_BP) {
                        bgWrap.style.setProperty("--bgClip", `${p * TABLET_CLIP_V}px ${p * TABLET_CLIP_H}px round ${p * TABLET_CLIP_RADIUS}px`);
                        bgWrap.style.clipPath = "";
                        bgWrap.style.webkitClipPath = "";
                    } else {
                        bgWrap.style.removeProperty("--bgClip");
                        const bw = bgWrap.offsetWidth;
                        const bh = bgWrap.offsetHeight;
                        const hInset = p * (bw * INSET_X) / DESIGN_W;
                        const vInset = p * (bh * INSET_Y) / DESIGN_H;
                        const clip = `inset(${vInset}px ${hInset}px round ${p * 20}px)`;
                        bgWrap.style.clipPath = clip;
                        bgWrap.style.webkitClipPath = clip;
                    }
                    bgWrap.classList.toggle("active", p >= 1);
                };

                const visualSt = ScrollTrigger.create({
                    trigger: section,
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
           
                gsap.set([...spans, logoWrap], { opacity: 0, y: 40 });

                const textTl = gsap.timeline({ paused: true });
                textTl
                    .to(spans, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.2,
                        ease: "power2.out",
                    })
                    .to(logoWrap, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: "power2.out",
                    }, "-=0.3");

                ScrollTrigger.create({
                    trigger: section,
                    start: `top+=${PHASE1_PX} top`,
                    once: false,
                    onEnter: () => textTl.play(),
                    onLeaveBack: () => textTl.reverse(),
                });

                const aboutSpans = aboutSection.querySelectorAll("span");
                gsap.set(aboutSpans, { y: 200, opacity: 0, willChange: "transform, opacity" });

                ScrollTrigger.create({
                    trigger: aboutSection,
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
            }, this.$el);
        },
      
        _onResize() {
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
        },
    }
};
</script>


<style scoped>


.gsrbr020101 { width: 100%; position: relative; display: block; overflow-x: clip; }

:deep(.p_br) { display: block }
:deep(.m_br) { display: none }
.sec_brand_visual { position: relative; height: calc(100vh + 800px); max-width: 100%; }
.sticky { --base-ratio: 0.75; --base-size: 1536; --base-percent: 100%; width: 100%; max-width: 100%; height: calc(100vh + max(calc(2px * var(--base-ratio)), calc(calc(2 / var(--base-size)) * var(--base-percent)))); position: -webkit-sticky; position: sticky; top: max(calc(1 / var(--base-size) * var(--base-percent) * -1)); left: 0; overflow: hidden; }
.bg_wrap { width: 100%; height: 100%; position: relative; z-index: 1; overflow: hidden; clip-path: inset(0% round 0px); -webkit-clip-path: inset(0% round 0px); }



.bg_wrap > .bg { width: 100%; height: 100%; background-image: url("@/assets/images/dummy/gsrbr020101_main.png"); background-size: cover; background-position: center top; position: absolute; top: 0; left: 0; z-index: -1; transform: scale(1.0); transition: transform 0.7s ease-out; }
.bg_wrap.active > .bg { transform: scale(0.8); }
.bg_wrap > .bg::before, .bg_wrap > .bg::after { content: ""; width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0; visibility: hidden; pointer-events: none; transition: 0.7s; }
.bg_wrap > .bg::after { background: rgba(0, 0, 0, 0.4); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); z-index: 1 }
.bg_wrap.active > .bg::before, .bg_wrap.active > .bg::after { opacity: 1; visibility: visible; }
.bg_wrap > .visual_inner {width:100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 20px; display: flex; align-items: center; justify-content: center; }
.bg_wrap .visual_inner > .txt_area { position: relative; z-index: 3; text-align: center; }
.logo_wrap { width:100%; max-width:693px; margin: 0 auto; }
.logo_wrap > img { width: 100%; margin: 0 auto; display: block }

@media (max-width: 1024px) {
    .sec_brand_visual{height:200vh}
    .sec_brand_visual .bg_wrap { --bgClip: 0px 0px round 0px; clip-path: inset(var(--bgClip)); -webkit-clip-path: inset(var(--bgClip)) }
    .bg_wrap > .bg { transform: none; transition: none; }
    .bg_wrap.active > .bg { transform: none; }
}



.txt_area > p { width: 100%; margin-bottom: 48px; overflow: hidden; }
.txt_area > p > span { color: #fff; font-size: 5.6rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; word-break: keep-all; word-wrap: break-word; display: block; }
.txt_area > p > span :deep(strong) { color: #fff; font-weight: 800; }
.sec_brand_about { padding: clamp(140px, 10.42vw, 200px) 20px; background-color: #f8f8f8; }
.sec_brand_about > .about_inner { margin: 0 auto; display: flex; flex-direction: column; gap: 40px; text-align: center; }
.sec_brand_about > .about_inner > .about_txt > p { overflow: hidden; }
.sec_brand_about > .about_inner > .about_txt > p > span { color: #161616; font-size: 3.6rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; will-change: transform, opacity; display: block; }

/* Brand Value */
.brand_value_section { width: 100%; padding: 200px 0; position: relative; display: block; }
.value_title { width: 100%; margin-bottom: 64px; display: flex; align-items: flex-end; justify-content: space-between; }
.title_text { color: #161616; font-size: 48px; font-weight: 700; line-height: 1.3; }

.btn_group {padding:0; display: flex; align-items: center; gap: 10px; }
.links { display: flex; align-items: center; gap: 16px; }



.brand_acc { margin: 0; padding: 0; background-color: #f8f8f8; border-radius: 12px; list-style: none; overflow: hidden; }
.acc_item { border-bottom: 1px solid #e5e5e9; }
.acc_item:last-child { border-bottom: 0; }
.acc_inner { padding: 40px 64px; display: grid; grid-template-columns: 1fr 0; align-items: start; }
.acc_item.is_open .acc_inner { grid-template-columns: 1fr 1fr; }
.acc_body { min-width: 0; }
.acc_btn { width: 100%; padding: 0; color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; background: transparent; border: none; cursor: pointer; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.acc_btn:focus-visible { outline: 2px solid #111; outline-offset: 2px; }
.acc_btn::after { content: ""; width: 20px; height: 20px; flex-shrink: 0; background: url('@/assets/images/common/icon_set_20.png') -539px -24px no-repeat; background-size: auto 159px; display: block; }
.acc_item.is_open .acc_btn::after { opacity: 0; }
.acc_desc_wrap { overflow: hidden; height: 0; box-sizing: border-box; transition: height 0.35s ease; }
.acc_desc { padding-top: 16px; color: #67676f; font-size: 2rem; font-weight: 400; line-height: 1.35; letter-spacing: -0.01em; }
.acc_img_wrap { overflow: hidden; height: 0; transition: height 0.65s ease; }
.acc_img_wrap > img { width: auto; margin-left: auto; border-radius: 12px; display: block; object-fit: cover; }

/* Origin Section & Tabs */
.origin_section { width: 100%; position: relative; display: block; }
.mt40 { margin-top: 40px; }
.origin_tabs_2depth { width: 100%; margin: 60px 0 0; }
.empty_cont { padding: 100px 0; text-align: center; color: #67676f; font-size: 2rem; background-color: #f8f8f8; border-radius: 12px; }

/* 지자체 컨텐츠 디자인 */
.production_bg { background-image: url('@/assets/images/sub/gsrbr02/gsrbr020101_6.png'); background-size: cover; }
.partnership_bg { background-image: url('@/assets/images/dummy/gsrbr020101_5.png'); background-size: cover; }
.sub_title { margin-bottom: 40px; color: #161616; font-size: 2.8rem; font-weight: 700; }
.mou_grid { display: grid; grid-template-columns: repeat(4, 1fr); row-gap: 40px; column-gap: 20px; }
.mou_item { border-radius: 12px; text-align: center; }
.mou_logo { width: 100%; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; }
.mou_logo img { max-width: 100%; max-height: 100%; object-fit: contain; }
.mou_name { color: #161616; font-size: 1.8rem; font-weight: 700; text-align:left;}

.mou_item.text_item { text-align: left; display: flex; flex-direction: column; justify-content: center; }
.mou_logo.fipa_logo {margin-bottom:20px; justify-content: flex-start; }
.mou_info { margin-top: 8px; color: #67676f; font-size: 14px; line-height: 1.6; }

.mou_products { margin-top: 100px; }
.mou_table { width: 100%; border-top: 1px solid #E5E5E9; border-collapse: collapse; }
.mou_table th, .mou_table td { padding: 24px; border-bottom: 1px solid #E5E5E9; text-align: left; font-size: 1.8rem; line-height: 1.6; }
.mou_table th { background-color: #f8f8f8; color: #161616; font-weight: 700; }
.mou_table td { color: #67676f; }

/* Origin Content Layout */
.origin_intro { width: 100%; padding: 60px 0 100px; display: flex; flex-direction: column; align-items: center; }
.visual_img_small { width: 100%; height: 340px; background-color: #c4c4c4; border-radius: 12px; }
.origin_intro .title { margin-top: 40px; margin-bottom:16px; color: #161616; font-size: 40px; font-weight: 700; }
.origin_intro .text_box { margin-left: 0; margin-right: auto; }
.origin_intro .text_box p { margin-top: 16px; font-size: 24px; line-height: 1.4; display:flex; flex-direction:column; gap:16px;}
.origin_intro .text_box p:last-of-type {margin-top:0px;}
.origin_intro .text_box p :deep(span) {color:#67676F !important; font-size:2rem !important;}

.origin_content_wrap { width: 100%; display: flex; align-items: flex-start; }
.origin_lnb { width: 200px; position: sticky; top: 100px; }
.origin_lnb ul {margin-top:-18.5px;}
.origin_lnb button { width: 100%; height: 64px; color: #4c4c53; font-size: 2rem; font-weight: 700; text-align: left; background: none; border: 0; cursor: pointer; }
.origin_lnb ul li.active button { color: #11935D; }

.origin_list_box { flex: 1; }
.origin_group { padding-top: 100px; scroll-margin-top: 100px; }
.origin_group:first-of-type { padding-top: 0; }
.group_header { margin-bottom: 40px; }
.group_title { margin-bottom: 12px; color: #161616; font-size: 2.8rem; font-weight: 700; }
.group_desc {font-size:2rem; line-height:135%; letter-spacing:-0.01em;}
.item_grid { width: 100%; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.origin_item { width: 100%; }
.item_thumb { width: 100%; height: 198px; background-color: #f8f8f8; border-radius: 12px; overflow: hidden; }
.item_thumb img { width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply; }
.item_name { width: 100%; margin-top: 16px; color: #67676f; font-size: 1.8rem; text-align: center; }


.blind { width: 1px; height: 1px; clip: rect(0,0,0,0); overflow: hidden; position: absolute; }


/* 2. 맛·선도 관리 독립 섹션 스타일 (style.css 반영) */
.tm-content-container { display: flex; flex-direction: column; align-items: flex-start; background-color: #ffffff; }
.tm-title-box {margin-top:60px;}

/* Intro */
.tm-intro-section { width: 100%; padding: 0 0 100px; }
.tm-main-title { font-size: 40px; font-weight: 700; color: #161616; margin-bottom: 16px; letter-spacing: -0.4px; }
.tm-main-desc { font-size: 24px; color: #161616; line-height: 1.5; letter-spacing: -0.24px; }

/* Node Sections */
.tm-node-section { width: 100%; margin-bottom: 120px; display: flex; flex-direction: column; gap: 40px; }
.tm-node-section:last-of-type {margin-bottom:0;}
.tm-section-title { font-size: 2.8rem; font-weight: 700; color: #161616; letter-spacing: -0.28px; }
.tm-section-subtext { font-size: 2rem; color: #161616; margin-top: 12px; }

/* Steps */
.tm-steps-wrap { width: 100%; background-color: #F8F8F8; border-radius: 12px; padding: 56px 64px; }
.tm-steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 56px 20px; }
.tm-step-item { display: flex; flex-direction: column; gap: 20px; }
.tm-step-icon { width: 40px; height: 40px; }
.tm-step-num { font-size: 1.8rem; font-weight: 700; color: #11935D; display: block; margin-bottom: 6px; }
.tm-step-tit {margin-bottom:16px; font-size: 2rem; font-weight: 700; color: #161616; display: block; }
.tm-step-text { font-size: 16px; color: #67676F; line-height: 1.5; }

.tm-step-num::before {content:''; width:40px; height:40px; margin-bottom:20px; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat; display:block;}
.tm-steps-grid .tm-step-item:nth-of-type(1) .tm-step-num:before {background-position:-20px -186px;}
.tm-steps-grid .tm-step-item:nth-of-type(2) .tm-step-num:before {background-position:-180px -266px;}
.tm-steps-grid .tm-step-item:nth-of-type(3) .tm-step-num:before {background-position:-1140px -104px;}
.tm-steps-grid .tm-step-item:nth-of-type(4) .tm-step-num:before {background-position:-20px -20px;}
.tm-steps-grid .tm-step-item:nth-of-type(5) .tm-step-num:before {background-position:-1060px -186px;}

/* Principles */
.tm-principle-card {width:calc((100% - 60px) / 4) !important; padding:32px; background-color:#F8F8F8; border-radius:12px; display:flex; flex-direction:column; gap:16px; position:relative; box-sizing:border-box;}
.swiper-slide.tm-principle-card {height:stretch; margin-right:20px;}
.swiper-slide.tm-principle-card:last-of-type {margin-right:0 !important;}
.tm-card-header {display:flex; flex-direction:column; gap:8px;}
.tm-card-num { font-size: 1.8rem; font-weight: 700; color: #11935D; }
.tm-card-tit { font-size: 2rem; font-weight: 700; color: #161616; }
.tm-card-main-text { margin-bottom:8px; font-size: 1.8rem; font-weight: 700; color: #67676F; line-height: 1.5; }
.tm-card-sub-text { font-size: 16px; color: #67676F; line-height: 1.5; }

/* Product Layout */
.tm-product-layout { display: flex; width: 100%; align-items: flex-start; }
.tm-lnb-side { width: 200px; padding-right: 20px; position:sticky; top:100px;}
.tm-lnb-item { height: 64px; display: flex; align-items: center; }
.tm-lnb-item button { font-size: 2rem; font-weight: 700; color: #4C4C53; background: none; border: 0; cursor: pointer; text-align: left; width: 100%; }
.tm-lnb-item.is-active button { color: #11935D; }

.tm-product-main { flex: 1; padding-top: 16px; }
.tm-group-title { font-size: 24px; font-weight: 700; color: #161616; margin-bottom: 24px; }
.tm-group-container {margin-top:60px;}
.tm-group-container:first-of-type {margin-top:0;}
.tm-product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.tm-product-thumb { width: 100%; height: 198px; background-color: #f8f8f8; border-radius: 12px; overflow: hidden; }
.tm-product-thumb img { width: 100%; height: 100%; object-fit: cover; mix-blend-mode: multiply; }
.tm-product-name { margin-top: 16px; font-size: 1.8rem; color: #67676F; text-align: center; line-height: 1.4; }
.bottom_btns + .btn_big.border {display:none !important;}


@media screen and (max-width: 1024px) {
    .value_title { flex-direction: column; align-items: flex-start; gap: 30px; }
    .title_text { font-size: 32px; }
    .acc_inner { padding: 28px 40px; }
    .acc_item.is_open .acc_inner { grid-template-columns: 1fr 280px; column-gap: 28px; }
    .acc_img_wrap > img { width: 100%; }
    .origin_list_box {width:100%;}
    .origin_intro .title { font-size: 32px; }
    .origin_intro .text_box p { font-size: 1.8rem; }
    .origin_content_wrap { flex-direction: column; }
    .origin_lnb { width: 100%; position: static; margin-bottom: 40px; }
    .origin_lnb ul { display: flex; flex-wrap: wrap; gap: 10px; }
    .origin_lnb button { width: auto; height: 40px; padding: 0 20px; border: 1px solid #e5e5e9; border-radius: 20px; font-size: 16px; }
    .origin_lnb ul li.active button { background-color: #161616;  }
    .item_grid { grid-template-columns: repeat(2, 1fr); }
    .mou_grid { grid-template-columns: repeat(2, 1fr); }
    .tm-steps-grid { grid-template-columns: repeat(2, 1fr); }
    .tm-principles-grid { flex-direction: column; }
    .tm-product-layout { flex-direction: column; }
    .tm-lnb-side { width: 100%; position: static; margin-bottom: 30px; }
    .tm-lnb-list { display: flex; flex-wrap: wrap; gap: 10px; }
    .tm-lnb-item { height: auto; }
    .tm-lnb-item button { width: auto; padding: 10px 20px; border: 1px solid #e5e5e9; border-radius: 20px; font-size: 16px; }
    .tm-product-grid { grid-template-columns: repeat(2, 1fr); }
}

/* 모바일 반응형 (767px 이하) */
@media screen and (max-width: 768px) {
    :deep(.p_br) { display: none }
    :deep(.m_br) { display: inline  }
/* .sec_brand_visual { height: 100vh; } */
    .sticky { height: 100vh; top: 0; }
    .txt_area > p {margin-bottom:10px;}
    .txt_area > p > span { font-size: 3.2rem; }
    .sec_brand_about { padding: clamp(119px, 37.33vw, 140px) 20px; }
    .sec_brand_about > .about_inner > .about_txt > p > span { font-weight: 700; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0%; display: block }
    .bg_wrap > .visual_inner {transform: translate(-50%, calc(-50% - 10px));}
    .visual_img_small {height:auto; padding-top:64%;}
    .production_bg { background-image: url('@/assets/images/sub/gsrbr02/gsrbr020101_6_mo.png'); background-size: cover; }
}

@media screen and (max-width: 768px) {
    .brand_value_section { padding: 140px 0; }
    .title_text { font-size: 24px; }
    .logo_wrap{width:100%; max-width:255px;  }
    .logo_wrap > img{width:100%;}
    .acc_btn { font-size: 1.8rem; line-height: 1.5; letter-spacing: -0.01em; }
    .acc_inner { padding: 24px; }
    .acc_desc { font-size: 1.6rem; line-height: 1.5; }
    .acc_item.is_open .acc_inner { grid-template-columns: 1fr; column-gap: 0; row-gap: 40px; }
    :deep(.acc_desc) br:first-of-type, :deep(.acc_desc) br:last-of-type { display: none !important; }
    .origin_group { padding-top:40px;}
    .origin_lnb {display:none;}
    .origin_intro {padding-top:20px;}
    .origin_intro .title { font-size: 2.8rem; }
    .origin_intro .text_box p :deep(span) {font-size:14px !important;}
    .sub_title {font-size:24px;}
    .group_header { margin-bottom:24px; }
    .group_title {font-size:2rem;}
    .group_title + p {font-size:16px; line-height:1.5;}
    .visual_img_small { height: 200px; }
    .item_grid { grid-template-columns: repeat(2, 1fr); }
    .item_thumb { height: auto; aspect-ratio: 16/10; }
    .mou_name {font-size:16px;}
    .mou_table th, .mou_table td { padding: 15px; font-size: 14px; }
    h4.tm-section-title {font-size:24px;}
    .tm-intro-section {padding-bottom:64px;}
    .tm-node-section {margin-bottom:80px;}
    .tm-node-section:last-of-type {margin-bottom:0px;}
    .tm-lnb-side {display:none;}
    .tm-product-main {width:100%;}
    .tm-main-title { font-size: 2.8rem; }
    .tm-card-tit {font-size:18px;}
    .tm-main-desc, .tm-step-num, .tm-step-tit, .tm-section-subtext, .tm-card-main-text { font-size: 16px; }
    .tm-step-text {font-size:14px;}
    .tm-steps-grid {position:relative; grid-template-columns: repeat(1, 1fr); gap: 30px; }
    .tm-steps-wrap { padding:40px; }
    .tm-product-grid { grid-template-columns: repeat(2, 1fr); }
    .tm-product-thumb { height: auto; aspect-ratio: 16/10; }
    .tm-step-item {padding-left:80px; position:relative;}
    .tm-step-num::before {margin-bottom:0; position:absolute; top:0; left:0;}
    .tm-product-name, .item_name {font-size:14px;}
    .origin_list_box {width:100%;}
    .mou_item.text_item { text-align: center; }
    .mou_logo {justify-content:flex-start;}
    .mou_logo img {width:100%;}
    .mou_logo.fipa_logo {justify-content:center;}
    .links {gap:14px;}
    .btn_link {padding:0; font-size:14px;}
    .btn_sns { width:40px; height:40px;}
    .btn_link::before {width:20px; height:20px;} 
    .origin_tabs_2depth {margin:0px;}
    .bottom_btns {display:none;}
    .bottom_btns + .btn_big.border {margin-top:80px; display:flex !important; justify-content: center;}
    .tm-principles-swiper {overflow:hidden !important;}
    .res-slide-item {width:280px !important; margin-right:16px !important; padding:24px; flex-shrink:0;}
    .pc-only {display:none;}
}

</style>
