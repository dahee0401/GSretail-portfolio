<template>
    <div class="gsrbr04" v-if="t">
        <!-- 26.07.02 edit 정다희 :sec_brand_visual과 동일 구조·GSAP 스크롤 인터랙션 적용 -->
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
                                <img :src="t.brand.visual.logoImg" :alt="t.brand.visual.logoAlt" />
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
                    <template v-if="isMobile && block.length > 1">
                        <p><span v-html="block.slice(0, -1).join(' ')"></span></p>
                        <p><span v-html="block[block.length - 1]"></span></p>
                    </template>
                    <template v-else>
                        <p v-for="(line, li) in block" :key="li"><span v-html="line"></span></p>
                    </template>
                </div>
            </div>
        </section>
        <!-- //26.07.02 edit 정다희 :sec_brand_visual과 동일 구조·GSAP 스크롤 인터랙션 적용 -->

        <section class="body_wrap">
            <div class="cont_area">
                <article class="cont_inner">
                    <h3 v-html="t.SubTitle"></h3>
                    <!-- 26.07.02 del 정다희 : QR 다운로드 영역 삭제 -->
                    <!-- <div class="qr_download_area pc">
                        <div class="qr_info">
                            <strong class="qr_title">{{ t.Intro.qrTitle }}</strong>
                            <p class="qr_desc" v-html="t.Intro.qrDesc"></p>
                        </div>
                    </div> -->
                    <!-- //26.07.02 del 정다희 : QR 다운로드 영역 삭제 -->

                    <!-- 26.07.02 add 정다희 : QR 다운로드 영역 추가 (gsrbr 다운로드 영역 공통화) -->
                    <div class="diff_bottom_row pc">
                        <a v-if="t.Intro" class="diff_qr_row">
                            <figure aria-hidden="true">
                                <img :src="imgQr" alt="앱 다운로드 QR코드" width="90" height="90" />
                            </figure>
                            <figure aria-hidden="true">
                                <img :src="imgGs" alt="우리동네 GS 앱" width="90" height="90" />
                            </figure>
                            <div>
                                <strong>{{ t.Intro.qrTitle }}</strong>
                                <p v-html="isMobile && t.Intro.qrDesc_mo ? t.Intro.qrDesc_mo : t.Intro.qrDesc"></p>
                            </div>
                        </a>
                    </div>
                    <!-- //26.07.02 add 정다희 : QR 다운로드 영역 추가 (gsrbr 다운로드 영역 공통화) -->
                    <div class="bi_section">
                        <img :src="isMobile ? t.Bi.imgMo : t.Bi.img" :alt="t.Bi.alt">
                    </div>
                    <!-- 26.07.02 del 정다희 : qr_download_area 삭제-->
                    <!-- <div class="qr_download_area mo">
                        <a href="javascript:void(0);">
                            <strong>{{ t.Intro.qrTitle }}</strong>
                            <span>{{ t.Intro.qrDesc_mo }}</span>
                        </a>
                    </div> -->
                    <!-- //26.07.02 add 정다희 : qr_download_area 삭제-->
                    <!-- 26.07.08 add 정다희 : diff_bottom_row mo 추가 (gsrbr 다운로드 영역 공통화) -->
                    <div class="diff_bottom_row mo">
                        <div v-if="t.Intro" class="diff_qr_row">
                            <figure aria-hidden="true">
                                <img :src="imgGsMo" alt="우리동네 GS 앱" width="90" height="90" />
                            </figure>
                            <div>
                                <strong>{{ t.Intro.qrTitle }}</strong>
                                <p v-html="isMobile && t.Intro.qrDesc_mo ? t.Intro.qrDesc_mo : t.Intro.qrDesc"></p>
                            </div>
                        </div>
                        <!-- //26.07.08 add 정다희 : diff_bottom_row mo 추가 (gsrbr 다운로드 영역 공통화) -->
                    </div>
                    <!-- 26.07.02 del 정다희 : ul 삭제 -->
                    
                    <!-- 26.07.02 add 정다희 : benefit_list 위치 이동-->
                    <div v-for="(row, rIdx) in t.BenefitRows" :key="'row-' + rIdx">
                        <ul class="benefit_list">
                            <li v-for="(item, iIdx) in row" :key="'item-' + iIdx">
                                <div class="benefit_info">
                                    <p class="tit_area">
                                        <strong>{{ item.title }}</strong>
                                        <a v-if="item.popId" class="btn_link ico_link" @click="openModal" :data-popid="item.popId" :data-type="item.popType" :data-cont="item.popCont"></a>
                                    </p>
                                    <span class="desc">{{ item.desc }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- //26.07.02 add 정다희 : benefit_list 위치 이동-->
                </article>
            </div>

            <!-- 26.07.02 add 정다희 : cont_inner benefit_section 삭제 -->
            <!-- <div class="cont_inner benefit_section">
                <h3 v-html="t.BenefitTitle"></h3>  
                <div v-for="(row, rIdx) in t.BenefitRows" :key="'row-' + rIdx">

                </div>

                <div class="bottom_btns">
                    <button class="btn_back" @click="handleBack">{{ t.ListBack }}</button>
                </div>
            </div> -->
            <!-- //26.07.02 add 정다희 : cont_inner benefit_section 삭제 -->
        </section>

        <!-- 26.07.07 Edit 이소라 : 위치 이동, 26.07.02 add 정다희 : sec_brand_str 추가 -->
        <section class="sec_brand_str">
            <div class="str_inner">
                <header class="str_header">
                    <h2 v-html="t.str.headerTitle"></h2>
                </header>
                <div class="str_content">
                    <!-- 26.07.08 add 정다희 : img_wrap pc 추가 -->
                    <div class="img_wrap pc">
                        <img :src=" t.str.img" :alt="t.str.alt">
                    </div>
                    <!-- //26.07.08 add 정다희 : img_wrap pc 추가 -->
                    <!-- 26.07.08 add 정다희 : div 추가 (content 영역) -->
                    <div>
                        <h3 v-html="t.str.contTitle"></h3>
                        <p class="str_desc" v-html="t.str.desc"></p>
                    </div>
                    <!-- //26.07.08 add 정다희 : div 추가 (content 영역) -->
                    <!-- 26.07.08 add 정다희 : img_wrap mo 추가 -->
                    <div class="img_wrap mo">
                        <img :src=" t.str.img" :alt="t.str.alt">
                    </div>
                    <!-- //26.07.08 add 정다희 : img_wrap mo 추가 -->
                    <div class="str_actions">
                        <a
                            :href="t.str.websiteUrl"
                            class="btn_icon_arrow btn_xl border after"
                            target="_blank"
                        >{{ t.str.websiteLabel }}</a>
                    </div>
                </div>
            </div>
        </section>
        <!-- //26.07.07 Edit 이소라 : 위치 이동, 26.07.02 add 정다희 : sec_brand_str 추가 -->


        <div id="gsrbr0401" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrbr0402" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrbr0403" class="modal_wrap">
            <div class="modal_container"></div>
        </div>
        <div id="gsrbr0404" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <!-- 26.06.08 Add 이종환 : 팝업 추가 -->
        <!-- 나만의 냉장고 -->
        <div id="gsrbr0405" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <!-- 사전예약 -->
        <div id="gsrbr0406" class="modal_wrap">
            <div class="modal_container"></div>
        </div>
        <!-- //26.06.08 Add 이종환 : 팝업 추가 -->
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import gsap from "gsap"; /**26.07.02 add 정다희 : 플러그인 추가 */ 
import { ScrollTrigger } from "gsap/ScrollTrigger"; /**26.07.02 add 정다희 : 플러그인 추가 */ 
import imgDelivery from "@/assets/images/dummy/gsrbr04_delivery.png"; /**26.07.02 add 정다희 : 배달 이미지 추가*/
import imgDeliveryMo from "@/assets/images/dummy/mo/gsrbr04_delivery_mo.png"; /**26.07.02 add 정다희 : 배달 모바일 이미지 추가*/
import imgQr from "@/assets/images/dummy/qr-app-download.svg"; /**26.07.08 add 정다희 : QR 이미지 추가 */
import imgGs from "@/assets/images/dummy/qr_app.png"; /**26.07.08 add 정다희 : 우리동네 GS 이미지 추가 */
import imgGsMo from "@/assets/images/dummy/mo/qr_app_mo.png"; /**26.07.08 add 정다희 : 우리동네 GS 모바일 이미지 추가 */
gsap.registerPlugin(ScrollTrigger); /**26.07.02 add 정다희 : 플러그인 추가 */ 

let syncVisualClip = null; /**26.07.02 add 정다희 : 변수 추가 */ 

export default {
    name: "gsrbr04",
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            isMobile: false,
            imgQr, /**26.07.08 add 정다희 : QR 이미지 추가 */
            imgGs, /**26.07.08 add 정다희 : 우리동네 GS 이미지 추가 */
            imgGsMo, /**26.07.08 add 정다희 : 우리동네 GS 모바일 이미지 추가 */
            gsapCtx: null, /**26.07.02 add 정다희 : 변수 추가 */
            visualResizeTimer: null, /**26.07.02 add 정다희 : 변수 추가 */
            langData: {
                ko: {
                    /* 26.07.02 edit 정다희 : brand.visual·brand.about  */
                    brand: {
                        visual: {
                            lines: [ /* 26.07.07 edit 이소라 */
                                "편의점•슈퍼마켓을 하나로", /*26.06.22 add 정다희 : 오타수정*/
                                "GS리테일 O4O 통합 앱",  // 26.07.02 edit 정다희 : lines 텍스트 수정
                            ],
                            logoImg: require("@/assets/images/dummy/gsrbr04_logo.png"),
                            logoAlt: "편의점·수퍼마켓을 하나로 GS리테일 O4O 통합 앱 우리동네GS", /*26.06.22 add 정다희 : 오타수정*/
                        },
                        about: [
                            [
                                "편의점도, 수퍼마켓도, 이제 하나의 ‘우리동네GS’ 앱으로.",
                                "전국 GS25 · GS THE FRESH의 재고확인, 배달, 픽업부터",
                                "증정품 보관 '나만의 냉장고’, 주류 스마트오더 '와인25플러스’까지. ",
                                "가까운 매장이 더 가깝게, 매장 안팎의 경계 없이,<br class=\"m_br\"/>더 가까운 일상을 제안합니다."
                            ],
                        ],
                        
                    },
                    /* //26.07.02 edit 정다희 : brand.visual·brand.about  */
                    
                    /* //26.07.02 edit 정다희 : brand.visual·brand.about */
                    SubTitle: "‘우리동네 GS’ 앱에서<br/>일상의 모든 것을 해결하세요.",
                    Bi: {
                        title: "우리동네GS App",
                        sub_desc: `<span>가까운 매장 재고 확인부터 배달·픽업은 물론 증정품 보관과 택배 예약까지 한 번에!</span><span>우리동네GS 앱 하나로 필요한 모든 것을 해결하세요.</span>`, /*26.06.22 del 정다희 : 2번째 span 삭제*/ 
                        img: require("@/assets/images/dummy/gsrbr04_brand.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr04_brand_mo.png"),
                        alt: "우리동네GS App"
                    },
                    Intro: {
                        qrTitle: "우리동네GS 앱 다운로드",
                        qrDesc: "우리동네GS 앱을 다운로드하고, GS25의 다양한 이벤트와 차별화 상품을 만나보세요.<br />QR코드를 스캔하면 앱 다운로드 페이지로 이동합니다.",
                        qrDesc_mo: "GS25의 다양한 이벤트와 차별화 상품",
                    },
                    BenefitTitle: "‘우리동네GS’ 앱에서 <br/>일상의 모든 것을 해결하세요.", /* 26.06.26 edit 이소라 */
                    BenefitRows: [
                        [
                            { title: "재고찾기/검색", desc: "전국 매장별 실시간 상품 재고 현황 및 잔여 수량을 간편하게 확인할 수 있습니다.", popId: "gsrbr0403", popType: "lg", popCont: "gsrbr0403"},
                            { title: "나만의 냉장고", desc: "GS25에서 받은 증정품이나 경품, GS THE FRESH의 사전예약 상품을 보관하고 원하는 때에 찾아갈 수 있습니다." , popId: "gsrbr0405", popType: "lg", popCont: "gsrbr0405"}, //26.06.08 Edit 이종환 : 나만의 냉장고 팝업 (gsrbr0405) 추가
                            { title: "배달/픽업", desc: "GS25,GS THE FRESH의 인기상품을 배달/픽업으로 간편하게 만나보세요!", popId: "gsrbr0401", popType: "lg", popCont: "gsrbr0401"},
                            { title: "사전예약", desc: "품절 걱정없이, 원하는 상품을 미리 주문하고 원하는 매장·시간에 수령하세요. 점포에서 판매하지 않는 기획전 단독 상품도 사전예약으로 만나볼 수 있습니다.",  popId: "gsrbr0406", popType: "lg", popCont: "gsrbr0406"}, /*26.06.23 add 정다희 : 내용 수정*/ 
                            { title: "와인25플러스", desc: "와인은 물론 위스키 맥주, 사케까지. 다양한 주류를 앱에서 주문하고 전국 편의점·수퍼에서 스마트하게 수령할 수 있습니다.", popId: "gsrbr0402", popType: "lg", popCont: "gsrbr0402" }, /*26.06.23 add 정다희 : 내용 수정*/ 
                            { title: "GS Pay/QR결제", desc: "GS Pay 또는 QR코드 한 번으로 전국 GS25, GS THE FRESH 매장에서 빠르게 결제할 수 있습니다. 우리동네GS 앱 하나로 로그인부터 결제까지 한 번에." }, /*26.06.23 add 정다희 : 내용 수정*/ 
                            { title: "멤버십 혜택", desc: "GS리테일 통합 멤버십 'GS ALL'. 우리동네GS 앱에서 나의 멤버십 등급과 브랜드별 혜택 쿠폰을 한눈에 확인할 수 있습니다." }, /*26.06.23 add 정다희 : 내용 수정*/ 
                            { title: "택배 서비스", desc: "가까운 GS25에서 국내택배·반값택배를 접수하세요. 앱으로 미리 예약하고 매장에서 간편하게 접수할 수 있습니다." }, /*26.06.23 add 정다희 : 내용 수정*/ 
                            { title: "행사/이벤트", desc: "현재 진행 중인 행사와 이벤트를 확인하고 참여 내역도 조회할 수 있습니다.", popId: "gsrbr0404", popType: "lg", popCont: "gsrbr0404" } /*26.06.23 add 정다희 : 내용 수정*/ 
                        ]
                    ],
                    ListBack: "목록으로 돌아가기",
                    /* 26.07.02 add 정다희 : sec_brand_str 추가 */
                    str: {
                        headerTitle: "우리동네 딜리버리",
                        contTitle: "언제 어디서나 산책하며<br class=\"m_br\"/>돈 버는 즐거움", /**26.07.08 add 정다희 : br 추가*/
                        desc: "우리동네 GS25, GS THE FRESH의 상품과 식품, 맛집 배달까지<br />별도의 장비 없이 성인이라면 누구나 손쉽게 배달 가능한 서비스입니다.",  /**26.07.08 add 정다희 : (class=\"m_br\") 삭제*/
                        websiteLabel: "우리동네 딜리버리",
                        websiteUrl: "#",
                        img: imgDelivery,
                        imgMo: imgDeliveryMo,
                        alt: "우리동네 딜리버리",
                    },
                    /* //26.07.02 add 정다희 : sec_brand_str 추가 */
                },
                en: {
                    brand: {
                        visual: {
                            lines: [
                                "Convenience stores and supermarkets in one"/* 260604 번역 */,
                                "GS Retail Integrated O4O App"/* 260604 번역 */,
                            ],
                            logoImg: require("@/assets/images/dummy/gsrbr04_logo.png"),
                            logoAlt: "Convenience stores and supermarkets in one—Our Neighborhood GS, GS Retail's O4O integrated app"/* 260604 번역 */,
                        },
                        about: [
                            [
                                "Convenience stores and supermarkets—now all in one 'Our Neighborhood GS' app."/* 260604 번역 */,
                                "From stock checks, delivery, and pickup at GS25 and GS THE FRESH nationwide"/* 260604 번역 */,
                                "From 'My Fridge' for storing free gifts to 'Wine25 Plus' for smart alcohol ordering."/* 260604 번역 */,
                                "Bringing nearby stores even closer, with no boundary between inside and outside the store,<br class=\"m_br\"/>we propose a closer everyday life."/* 260604 번역 */,
                            ],
                        ],
                    },
                    SubTitle: "Handle everything in your everyday life, all in the 'Our Neighborhood GS' app.", /** 26.07.02 edit 정다희 : 제목 수정 */
                    Bi: {
                        title: "Our Neighborhood GS App"/* 260604 번역 */,
                        sub_desc: `From checking nearby store inventory to delivery and pick-up, storing complimentary items, and booking delivery services — all in one place! Handle everything you need with the Our Neighborhood GS app.`,
                        img: require("@/assets/images/dummy/gsrbr04_brand.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr04_brand_mo.png"),
                        alt: "Our Neighborhood GS App"/* 260604 번역 */
                    },
                    Intro: {
                        qrTitle: "Download the Our Neighborhood GS app"/* 260604 번역 */,
                        qrDesc: "Download the Our Neighborhood GS app and discover GS25's various events and exclusive products.<br />Scanning the QR code takes you to the app download page."/* 260604 번역 */,
                        qrDesc_mo: "GS25's diverse events and distinctive products"/* 260604 번역 */,
                    },
                    BenefitTitle: "On the 'Our Neighborhood GS' app <br/>Take care of everything in your daily life."/* 260604 번역 */,
                    BenefitRows: [
                        [
                            { title: "Stock Finder and Search", desc: "Easily check real-time inventory and remaining stock at stores nationwide.", popId: "gsrbr0403", popType: "lg", popCont: "gsrbr0403"},
                            { title: "My Refrigerator", desc: "You can store giveaways or prizes received at GS25, as well as pre-ordered products from GS THE FRESH, and pick them up whenever you like."/* 260604 번역 */  , popId: "gsrbr0405", popType: "lg", popCont: "gsrbr0405"}, //26.06.08 Edit 이종환 : 나만의 냉장고 팝업 (gsrbr0405) 추가},
                            { title: "Delivery and Pick-up", desc: "Get popular products from GS25 and GS THE FRESH delivered or ready for pick-up! Download the 'Our Neighborhood GS' app for exclusive events and extra discounts!", popId: "gsrbr0401", popType: "lg", popCont: "gsrbr0401"},
                            { title: "Pre-Order", desc: "The Our Neighborhood GS app offers a pre-order service that lets you pick up items at the store and time of your choice.",  popId: "gsrbr0406", popType: "lg", popCont: "gsrbr0406"}, //26.06.08 Edit 이종환 : 사전예약 팝업 (gsrbr0405) 추가
                            { title: "Wine25Plus", desc: "Order from over 5,000 wine varieties and a wide selection of alcoholic beverages, and pick them up at convenience stores and supermarkets nationwide.", popId: "gsrbr0402", popType: "lg", popCont: "gsrbr0402" },
                            { title: "Easy Payment and Easy Login", desc: "Easy payment and login are available through a variety of methods." },
                            { title: "Membership Benefits", desc: "GS Retail's integrated membership 'GS ALL'. Check your membership tier and brand benefit coupons at a glance in the Our Neighborhood GS app." }, /*26.07.02 add 정다희 : 영문 누락 번역 추가*/ 
                            { title: "Delivery Service", desc: "Request domestic parcel and half-price delivery services at nearby GS25 stores. Reserve in the app first, then complete drop-off quickly at the store." }, /*26.07.02 add 정다희 : 영문 누락 번역 추가*/ 
                            { title: "Events & Promotions", desc: "You can check ongoing promotions and events and review your participation history.", popId: "gsrbr0404", popType: "lg", popCont: "gsrbr0404" } /*26.07.02 add 정다희 : 영문 누락 번역 추가*/ 
                        ]
                    ],
                    ListBack: "Back to Brand List",
                    str: {
                        contTitle: "The joy of earning money while taking a walk, anytime and anywhere"/* 260708 번역 */,
                        headerTitle: "GS Retail's integrated O4O app 'Our Neighborhood GS'<br />connecting nearby stores to everyday life.",
                        /* 26.07.02 add 정다희 : 영문 sec_brand_str 설명 문구 추가 */
                        desc: "From products and food at GS25 and GS THE FRESH<br class=\"m_br\"/>to local restaurant delivery,<br />any adult can easily deliver without special equipment<br class=\"m_br\"/>through Our Neighborhood Delivery service.",
                        websiteLabel: "Homepage",
                        websiteUrl: "https://www.gsretail.com",
                        /* 26.07.02 add 정다희 : 영문 sec_brand_str 이미지/대체텍스트 추가 */
                        img: imgDelivery,
                        imgMo: imgDeliveryMo,
                        alt: "Our Neighborhood Delivery",
                    },
                }
            }
        };
    },
    computed: {
        t() { return this.langData[this.lang] || this.langData.ko; },
    },
    mounted() {
        this.checkMobile();
        window.addEventListener("resize", this.checkMobile);
        /* 26.07.02 add 정다희 :  GSAP 비주얼 인터랙션 초기화 */
        window.addEventListener("resize", this._onVisualResize);
        this.$nextTick(() => {
            setTimeout(() => {
                this.initVisualInteraction();
            }, 100);
        });
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkMobile);
        /* 26.07.02 add 정다희 : GSAP·ScrollTrigger 정리 */
        window.removeEventListener("resize", this._onVisualResize);
        syncVisualClip = null;
        if (this.gsapCtx) {
            this.gsapCtx.revert();
            this.gsapCtx = null;
        }
    },
    methods: {
        checkMobile() { this.isMobile = window.innerWidth < 768; },
        /* 26.07.02 add 정다희 : 리사이즈 시 clip-path·ScrollTrigger 동기화  */
        _onVisualResize() {
            this.checkMobile();
            const syncClip = () => {
                if (typeof syncVisualClip === "function") syncVisualClip();
            };
            syncClip();
            requestAnimationFrame(syncClip);
            clearTimeout(this.visualResizeTimer);
            this.visualResizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
                syncClip();
            }, 150);
        },
        /* 26.07.02 add 정다희 : 스크롤 clip + 텍스트·로고 페이드인  */
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

                /* 26.07.02 add 정다희 : about 섹션 스크롤 페이드인  */
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
        /* //26.07.02 add 정다희 : 스크롤 clip + 텍스트·로고 페이드인 */
        handleBack() { this.$router.back(); },
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default";
            const cont = el.dataset.cont;
            modal.open(popId, type, el, cont);
        },
    }
};
</script>

<style scoped>
:deep(.p_br) { display: block; }
:deep(.m_br) { display: none; }

.gsrbr04 { position: relative; width: 100%; max-width: 100%; overflow-x: clip; }
.benefit_section { padding-top: 200px; }
img { display: block; width: 100%; }
h3 { margin-bottom:16px; color: #161616; font-size: 48px; font-weight: 700; }
h4 {  margin-bottom: 40px; color: #161616; font-size: 32px; font-weight: 700; }

/* 26.07.01 add 정다희 : sec_brand_visual*/
.cont_inner {padding-top: 200px;}
.sec_brand_visual { position: relative; height: calc(100vh + 800px); max-width: 100%; }
.sticky { --base-ratio: 0.75; --base-size: 1536; --base-percent: 100%; width: 100%; max-width: 100%; height: calc(100vh + max(calc(2px * var(--base-ratio)), calc(calc(2 / var(--base-size)) * var(--base-percent)))); position: -webkit-sticky; position: sticky; top: max(calc(1 / var(--base-size) * var(--base-percent) * -1)); left: 0; overflow: hidden; }
.bg_wrap { width: 100%; height: 100%; position: relative; z-index: 1; overflow: hidden; clip-path: inset(0% round 0px); -webkit-clip-path: inset(0% round 0px); }
.bg_wrap > .bg { width: 100%; height: 100%; background-image: url("@/assets/images/dummy/gsrbr04.png"); background-size: cover; background-position: center top; position: absolute; top: 0; left: 0; z-index: -1; transform: scale(1.0); transition: transform 0.7s ease-out; }
.bg_wrap.active > .bg { transform: scale(0.8); }
.bg_wrap > .bg::before, .bg_wrap > .bg::after { content: ""; width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0; visibility: hidden; pointer-events: none; transition: 0.7s; }
.bg_wrap > .bg::after { background: rgba(0, 0, 0, 0.4); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); z-index: 1; }
.bg_wrap.active > .bg::before, .bg_wrap.active > .bg::after { opacity: 1; visibility: visible; }
.bg_wrap > .visual_inner {width:100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, calc(-50% + 10px)); border-radius: 20px; display: flex; align-items: center; justify-content: center; }
.bg_wrap .visual_inner > .txt_area { position: relative; z-index: 3; text-align: center; }
.txt_area > p { width: 100%; overflow: hidden; }
.txt_area > p > span { color: #fff; font-size: 5.6rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; word-break: keep-all; word-wrap: break-word; display: block; }
.txt_area > .logo_wrap { width: 100%; max-width: 264px; margin: 48px auto 0; overflow: hidden; }
.txt_area > .logo_wrap > img { width:100%; height:auto; display: block; }
@media (max-width: 1024px) {
    .sec_brand_visual { height: 200vh; }
    .sec_brand_visual .bg_wrap { --bgClip: 0px 0px round 0px; clip-path: inset(var(--bgClip)); -webkit-clip-path: inset(var(--bgClip)); }
    .bg_wrap > .bg { transform: none; transition: none; }
    .bg_wrap.active > .bg { transform: none; }
}
/* //26.07.02 add 정다희 : sec_brand_visual */

/* 26.07.02 add 정다희 : sec_brand_about  */
.sec_brand_about { padding: clamp(140px, 10.42vw, 200px) 20px; background-color: #f8f8f8; text-align:center;}
.sec_brand_about > .about_inner { width: 100%; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; }
.sec_brand_about > .about_inner > .about_txt > p { overflow: hidden; }
.sec_brand_about > .about_inner > .about_txt > p > span { color: #161616; font-size: 3.6rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; will-change: transform, opacity; display: block; }
/* //26.07.02 add 정다희 : sec_brand_about */

/* 26.07.02 add 정다희 : sec_brand_str 스타일 */
.sec_brand_str .str_inner {  width: 1460px; max-width: 100%; margin: 0 auto; padding:200px 20px 0; }
.sec_brand_str .str_header {margin:0;}
.str_header {margin-bottom: 64px; }
.str_header h2 { font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em;text-align: left; }
.str_content { margin-top: 40px; padding:60px; background-color:#E7F2FE; border-radius:20px; display:flex; align-items:flex-start; flex-wrap:wrap; gap: 40px;}
.str_content .img_wrap.mo{display:none;}
.str_content .img_wrap.pc{display:block;}
.str_content .img_wrap { max-width:149px; flex-shrink:0;}
.str_content > div:not([class]){ flex:1; min-width:0;}
.str_content > img{ width: 100%; margin-top: 40px;display: block;}
.str_content h3 {margin-bottom: 12px; color: #161616; font-size: 32px; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em;}
.str_content p {color: #161616; font-weight: 400; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em;}
.str_content .str_actions { margin-left:auto; flex-shrink:0; }
.str_content .str_actions a{font-weight:700 ;}
/* Body Content Area */
/* .body_wrap .cont_area .cont_inner > ul { margin-top: 65px; margin-bottom: 40px; border-radius: 12px; } */

/* 26.07.08 add 정다희 : gsrbr010101 diff_bottom_row 스타일 */
.diff_bottom_row { margin-top: 64px; display: flex; gap: 32px; }
.diff_bottom_row.mo{display:none;}
.diff_bottom_row > .diff_qr_row { flex: 1; }
/* //26.07.08 add 정다희 : gsrbr010101 diff_bottom_row 스타일 */

.bi_section { margin-top:40px; position: relative; width: 100%; }
.bi_section span { display: block; width: 100%; }
.bi_section span img { display: block; width: 100%; object-fit: cover; }
.bi_section h4 p {width: 50%; margin-top:16px; color: #67676F; font-size: 20px; font-weight: 400; display: flex; flex-direction: column; }

.qr_download_area { margin-top: 64px; padding:20px; border-radius: 8px; background-color: #F2F2F4; display: flex; align-items: center; }
.pc.qr_download_area::before { display: inline-block; width: 90px; height: 90px; background: url('@/assets/images/dummy/gsrbr06_qr.png') no-repeat center / cover; content: ''; }
.pc.qr_download_area .qr_info { display: flex; flex-direction: column; padding-left: 20px; }
.pc.qr_download_area .qr_info strong { margin-bottom: 8px; color: #161616; font-size: 20px; font-weight: 700; }
.pc.qr_download_area .qr_info p { color: #67676F; font-size: 14px; }

.qr_download_area.mo a { display: flex; flex-direction: column; gap: 4px; padding-left: 60px; position: relative; text-decoration: none; }
.qr_download_area.mo a::before { display: inline-block; position: absolute; left: 0; width: 48px; height: 48px; background: url('@/assets/images/dummy/gsrbr06_app_icon.png') no-repeat center / cover; content: ''; }
.mo.qr_download_area a strong { display: flex; align-items: center; gap: 4px; color: #161616; font-size: 16px; font-weight: 700; }
.mo.qr_download_area a strong::after {content: ""; width: 24px; height: 24px; background-image: url(http://localhost:8080/img/icon_set_24.5b5c044c.png); background-repeat: no-repeat; background-size: auto 95px; background-position: -832px -15px; flex-shrink: 0; display: block;}
.mo.qr_download_area a span{color: #67676F;}
/* Benefit Section */
.benefit_list {margin-top:64px; display: flex; flex-wrap: wrap; gap:80px 40px;}
.benefit_list li { position: relative; width: calc((100% - (40px * 2)) / 3); padding-top: 104px; }
.benefit_list li::before { position: absolute; top: 0; left: 0; width: 80px; height: 80px; background-color: #eee; border-radius: 50%; content: ''; }
.benefit_list li::after {width:40px; height:40px; background-repeat:no-repeat; background-position:center; background-size:cover; content:''; position:absolute; top:20px; left:20px; display:block;}
/* 아이콘 규칙 수립 후 수정 */
.benefit_list li:nth-child(1)::after{background-image: url('@/assets/images/sub/icon_br04_inventory_40.png');}
.benefit_list li:nth-child(2)::after{background-image: url('@/assets/images/sub/icon_br04_refrigerator_40.png');}
.benefit_list li:nth-child(3)::after {width:40px; height:40px; background:url('@/assets/images/sub/icon_br04_delivery_40.png');}
.benefit_list li:nth-child(4)::after {width:40px; height:40px; background:url('@/assets/images/sub/icon_br04_reservation_40.png');}
.benefit_list li:nth-child(5)::after {width:40px; height:40px; background:url('@/assets/images/sub/icon_br04_wineplus_40.png');}
.benefit_list li:nth-child(6)::after {width:40px; height:40px; background:url('@/assets/images/sub/icon_br04_easypayment_40.png');}
.benefit_list li:nth-child(7)::after {width:40px; height:40px; background:url('@/assets/images/sub/icon_br04_membership_40.png');}
.benefit_list li:nth-child(8)::after {width:40px; height:40px; background:url('@/assets/images/sub/icon_br04_parcel_40.png');}
.benefit_list li:nth-child(9)::after {width:40px; height:40px; background:url('@/assets/images/sub/icon_br04_event_40.png');}

.benefit_info .tit_area { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.benefit_info .tit_area strong { color: #161616; font-size: 24px; font-weight: 700; }
.benefit_info .btn_link {padding:0; color: #107af2; font-size: 14px; text-decoration: underline; }
.benefit_info .desc { display: block; color: #67676f; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
/* 26.05.11 제거
.benefit_info a {font-size:0px;}
.benefit_info a::after {content:''; width:24px; height:24px; background:red; display:inline-block;}
*/

/* Buttons Area */
.btn_list_back { display: block; background: transparent; padding: 0; border: 0; cursor: pointer; }
.btn_list_back span { display: flex; align-items: center; gap: 12px; color: #161616; font-size: 20px; }
.btn_list_back span::before { display: inline-block; width: 16px; height: 16px; background-color: red; content: ''; }

/* Utils */
.mt40 { margin-top: 40px; }

/* Mobile Responsive */
/* @media screen and (min-width: 1024px) {
    :deep(.qr_download_area).pc { display: flex; }
    :deep(.qr_download_area).mo { display: none; }
} */

@media screen and (max-width: 1024px) {
    h4 { font-size: 1.8rem; }
    .bi_section { padding: 0; }
    .benefit_list { gap: 40px 15px; }
    .benefit_list li { width: calc((100% - 15px) / 2); padding-top: 70px; }
    .benefit_info .tit_area strong { font-size:18px; }
    .benefit_info .desc { font-size: 1.4rem; line-height: 1.4;  }
    .benefit_list li::before { position: absolute; top: 0; left: 0; width: 60px; height: 60px; background-color: #eee; border-radius: 50%; content: ''; }
    .benefit_list li::after {top:10px; left:10px;}
    .benefit_list li:nth-child(2)::after, .benefit_list li:nth-child(3)::after {top:10px; left:10px;}
    .str_content {gap:24px;}
    .str_content > img {margin-bottom: 40px;}
    .str_content .str_actions {width:100%; margin-left:0; flex-basis:100%;}
    .str_content .str_actions a {width:100%; height:52px;}
}

@media screen and (max-width: 768px) {
    :deep(.p_br) { display: none; }
    :deep(.m_br) { display: block; }
    .pc { display: none; }
    .mo { display: flex; }
    h3 {font-size:24px;}
    .cont_inner {padding-top: 40px;}
    /* 26.07.02 add 정다희 : 배경 */
    .sticky { height: 100vh; top: 0; }
    .bg_wrap > .bg { background-position: center; }
    .bg_wrap > .visual_inner {transform: translate(-50%, calc(-50% - 10px));}
    .txt_area > p { width:100%; margin-bottom: 0; }
    .txt_area > p > span, .txt_area > .logo_wrap > .logo_txt { font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.01em; text-align: center; }
    .txt_area > p > span:first-child::after { content: ","; }
    .txt_area > .logo_wrap{max-width:116px; margin-top:10px;}
    /* //26.07.02 add 정다희 : 배경 */

    /* 26.07.02 add 정다희 : sec_about  */
    .sec_brand_about { padding: clamp(119px, 37.33vw, 140px) 20px; }
    .sec_brand_about > .about_inner { gap: 40px; }
    .sec_brand_about > .about_inner > .about_txt > p > span { font-weight: 700; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; display: block; word-break: keep-all; }
    .sec_brand_about > .about_inner > .about_txt > p:last-child { margin-top: 40px; }

   
   /* 26.07.02 add 정다희 : sec_brand_str  */
    .sec_brand_str .str_inner{width:100%; padding: 150px 20px; }
    .sec_brand_str .str_header h2{font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em;}
    .str_content {margin-top: 24px; padding:32px 20px; flex-direction: column;}
    .str_content .img_wrap.pc{display:none;}
    .str_content .img_wrap.mo{display:block;}
    .diff_bottom_row.mo{display:flex;}
    .diff_bottom_row.pc{display: none;}
    .str_content .img_wrap {max-width:120px; margin: 0 auto;}
    .str_content h3 {font-size:2rem;}
    .str_content p {margin-top:8px; font-size: 1.6rem; line-height: 1.5;}
    .str_content > img {margin: 8px 0 24px;}

    .benefit_section { padding-top: 80px; }
    .benefit_list { margin-top:40px; gap: 40px 20px; }
    .benefit_list li { width: calc((100% - 20px) / 2); }
    .bottom_btns + .btn_big.border { display: flex; justify-content: center; margin-top: 100px; margin-bottom: 80px; }
    .bi_section h4 {flex-direction:column;}
    /* .body_wrap .cont_area .cont_inner > ul { margin-top: 40px; margin-bottom: 0; padding: 32px; } */
    .bi_section{margin-top:24px; }
    .bi_section h4 p {width:100%; margin-top:8px; font-size:16px; line-height:1.5; flex-direction:column;}
    .qr_download_area{margin-top:24px; }
    /* 26.07.08 add 정다희 : diff_bottom_row 모바일 스타일 */
    .diff_bottom_row {margin-top:24px; flex-direction: column; gap: 20px; }
    .diff_qr_row::after{display:none;}
    .diff_qr_row > div > strong{display:flex; align-items:center; gap:4px;}
    .diff_qr_row > div > strong::after{content:'';width:20px;height:20px;background-image:url('@/assets/images/common/icon_set_20.png');background-position:-979px -24px; cursor:pointer; display:block;}
    /* //26.07.08 add 정다희 : diff_bottom_row 모바일 스타일 */

    .str_content .str_actions a{height:38px; padding:7px 0; font-size:1.6rem; font-weight: 400;}
}
</style>