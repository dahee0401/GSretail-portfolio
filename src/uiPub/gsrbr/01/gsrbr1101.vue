<template>
    <div class="gsrbr1101">
        <section class="visual_section" ref="visualSection">
            <div class="visual_img" ref="visualImg">
                <img :src="isMobile ? t.Visual.imgMo : t.Visual.img" :alt="t.Visual.alt" />
            </div>
            <div class="visual_content">
                <div class="text_box cont_inner">
                    <span>{{ t.Visual.subContent_1 }}</span>
                    <span>{{ t.Visual.subContent_2 }}</span>
                </div>
            </div>
        </section>

        <div class="body_wrap">
            <!-- 26.06.08 add 정다희 : cont_area 삭제 -->
            <div class="cont_inner">
                <div class="category_tabs">
                    <Tabs 
                        v-model="CTabIdx" 
                        :tab-items="t?.Tabs1" 
                        tab-class="type_01" 
                        @change="onTabChange1" 
                    />
                    
                    <Tabs 
                        v-if="CTabIdx === 1"
                        v-model="SUBTabIdx" 
                        :tab-items="t?.Tabs2_Mall" 
                        tab-class="type_02" 
                        :tab-slide="true" 
                        class="sub_tabs"
                        @change="onTabChange2" 
                    />
                </div>

                <div class="detail_content">
                    <section v-if="CTabIdx === 0 && t?.SubwayData" class="tab_content subway_content">
                        <div class="inner_cont">
                            <div class="info_section">
                                <!-- 26.06.08 add 정다희 : content_title 태그 수정 -->
                                <h2 class="content_title" v-html="t.SubwayData.title"></h2> 
                                <div class="contact_left pc">
                                    <div class="info_item">
                                        <em>{{ t.Labels.phone }}</em>
                                        <span class="val">{{ t.SubwayData.contact.phone }}</span>
                                    </div>
                                    <div class="info_item">
                                        <em>{{ t.Labels.email }}</em>
                                        <span class="val">{{ t.SubwayData.contact.email1 }}</span>
                                        <span class="val">{{ t.SubwayData.contact.email2 }}</span>
                                        <span class="val">{{ t.SubwayData.contact.email3 }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="visual_img">
                                <img :src="isMobile ? t.SubwayData.imgMo : t.SubwayData.img" :alt="t.SubwayData.alt" />
                            </div>

                            <div class="principles_card_container">
                                <component 
                                    :is="isMobile ? 'swiper' : 'div'"
                                    :slides-per-view="isMobile ? '1.1' : undefined"
                                    :space-between="isMobile ? 8 : 0" 
                                    :breakpoints="{ 768: { allowTouchMove: false } }"
                                    class="principles_swiper_wrapper"
                                >
                                    <component 
                                        :is="isMobile ? 'swiper-slide' : 'div'"
                                        v-for="(p, pIdx) in t.SubwayData.principles" 
                                        :key="'principle-' + pIdx" 
                                        class="principle_card_item"
                                        :class="{ 'swiper-slide': isMobile }"
                                    >
                                        <div class="card_header">
                                            <span class="card_num">0{{ pIdx + 1 }}</span>
                                            <strong class="card_title">{{ p.subTitle }}</strong>
                                        </div>
                                        
                                        <div class="card_body">
                                            <ul class="bullet_01">
                                                <li v-for="(descText, dIdx) in p.desc" :key="'desc-'+dIdx">
                                                    <p class="bullet_text" v-html="descText"></p>
                                                    
                                                    <div v-if="p.txt && p.txt[dIdx]" class="sub_text_box">
                                                        <div class="sub_line">
                                                            <span class="sub_dash"></span>
                                                            <p class="sub_desc" v-html="p.txt[dIdx]"></p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </component>
                                </component>
                            </div>

                            <div class="tell_area mo">
                                <h3 class="main_title">{{ t.SubwayData.contact.연락처 }}</h3> <!-- 26.06.08 add 정다희 : 클래스 수정 -->
                                <ul>
                                    <li>
                                        <strong>{{ t.SubwayData.contact.전화 }}</strong>
                                        <p>{{ t.SubwayData.contact.phone }}</p>
                                    </li>
                                    <li>
                                        <strong>{{ t.SubwayData.contact.이메일 }}</strong>
                                        <p>{{ t.SubwayData.contact.email1 }}</p>
                                        <p>{{ t.SubwayData.contact.email2 }}</p>
                                        <p>{{ t.SubwayData.contact.email3 }}</p>
                                    </li>
                                </ul>
                            </div>

                            <div class="lease_condition_section">
                                <h3 class="main_title">{{ t.Labels.conditionInfo }}</h3> <!-- 26.06.08 add 정다희 : 클래스 수정 -->
                                <div class="condition_grid">
                                    <div v-for="(cond, cIdx) in t.SubwayData.conditions" :key="cIdx" class="condition_item">
                                        <!-- <div class="visual_img_small">
                                            <img :src="cond.img" :alt="cond.name" />
                                        </div> -->
                                        <h4 class="sub_title">{{ cond.name }}</h4>
                                        <div class="policy_wrap">
                                            <table>
                                                <colgroup><col width="200"><col width="*"></colgroup>
                                                <tr v-for="(row, rIdx) in cond.table" :key="rIdx">
                                                    <th>{{ row.th }}</th>
                                                    <td v-html="row.td"></td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section v-if="CTabIdx === 1 && t?.MallData" class="tab_content mall_content" :class="'mall-type-' + SUBTabIdx">
                        <template v-for="(mall, mIdx) in t.MallData" :key="mIdx">
                            <div v-if="SUBTabIdx === mIdx" class="inner_cont">
                                <!-- 26.06.30 edit 정다희 : 쇼핑몰 2depth 탭 콘텐츠 visual_img — MallData mainImg/mainImgMo, isMobile 분기, no_img 삭제 -->
                                <div class="visual_img">
                                    <img :src="isMobile ? mall.mainImgMo : mall.mainImg" :alt="mall.name" />
                                </div>
                                <!-- //26.06.30 edit 정다희 : 쇼핑몰 2depth 탭 콘텐츠 visual_img -->

                                <div class="info_section">
                                    <h3 class="content_title">
                                        {{ mall.contentTitle }}
                                        <a :href="mall.contact.homepage" target="_blank" v-if="mall.contact.homepage">
                                            {{ mall.홈페이지 }}
                                        </a>
                                    </h3>
                                    <div class="info_box">
                                        <h4 class="sub_title" v-if="t.MallData[SUBTabIdx]?.type === 'card_type'">{{ t.Labels.mallIntro }}</h4>
                                        
                                        <div v-if="mall.type === 'card_type'" class="principles_card_container mall_intro_cards">
                                            <component 
                                                :is="isMobile ? 'swiper' : 'div'"
                                                :slides-per-view="isMobile ? '1.1' : undefined"
                                                :space-between="isMobile ? 8 : 0"
                                                :breakpoints="{ 768: { allowTouchMove: false } }"
                                                class="principles_swiper_wrapper"
                                            >
                                                <component 
                                                    :is="isMobile ? 'swiper-slide' : 'div'"
                                                    v-for="(introItem, idx) in mall.intro" 
                                                    :key="'intro-card-' + idx" 
                                                    class="principle_card_item"
                                                    :class="{ 'swiper-slide': isMobile }"
                                                >
                                                    <div class="card_header">
                                                        <span class="card_num">0{{ idx + 1 }}</span>
                                                        <strong class="card_title" v-html="introItem.title"></strong>
                                                    </div>
                                                    <div v-if="introItem.desc" class="card_body_sub">
                                                        <p class="desc_sub_text" v-html="introItem.desc"></p>
                                                    </div>
                                                </component>
                                            </component>
                                        </div>

                                        <div v-else class="text_list">
                                            <p class="text_item" v-for="(txt, idx) in mall.intro" :key="idx" v-html="txt"></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="map_section">
                                    <div class="contact_info_wrap">
                                        <div class="contact_left">
                                            <strong class="main_title">{{ t.mall_txt }}</strong> <!-- 26.06.08 add 정다희 : 클래스 추가 -->
                                            <div class="info_item">
                                                <span>{{ mall.contact.snsLabel || t.Labels.sns }}</span>
                                                <span class="val">{{ mall.contact.instatxt }}</span>
                                                <a v-if="mall.contact.insta" :href="mall.contact.insta" target="_blank" class="btn_sns small ico_insta"> 
                                                </a> <!-- 26.07.06 Edit 이종환 : 원복, 26.06.10 Del 이종환  -->
                                            </div>
                                            <div v-if="mall.contact.blog" class="info_item">
                                                <span>{{ t.Labels.blog }}</span>
                                                <a v-if="mall.contact.blog" :href="mall.contact.blog" target="_blank"> 
                                                    {{ mall.contact.blog }}
                                                </a>
                                            </div>
                                            <div v-if="mall.contact.phone || mall.contact.phone1" class="info_item"> <!-- 26.06.29 edit 정다희 :  v-if문 수정 -->
                                                <span>{{ t.Labels.phoneNum }}</span>
                                                <!-- 26.06.29 edit 정다희 : span에 v-if문 추가 -->
                                                <span v-if="mall.contact.phone" class="val">{{ mall.contact.phone }}</span>
                                                <span v-if="mall.contact.phone1" class="val">{{ mall.contact.phone1 }}</span>
                                                <!-- //26.06.29 edit 정다희 : span에 v-if문 추가 -->
                                            </div>
                                            <div v-if="mall.contact.email1 || mall.contact.email2 || mall.contact.email3" class="info_item">
                                                <span>{{ t.Labels.email }}</span>
                                                <span class="val">
                                                    <template v-if="mall.contact.email1">
                                                        <a :href="`mailto:${mall.contact.email1}`" class="email_link">{{ mall.contact.email1 }}</a>
                                                    </template>
                                                    <template v-if="mall.contact.email2">
                                                        <a :href="`mailto:${mall.contact.email2}`" class="email_link">{{ mall.contact.email2 }}</a>
                                                    </template>
                                                    <template v-if="mall.contact.email3">
                                                        <a :href="`mailto:${mall.contact.email3}`" class="email_link">{{ mall.contact.email3 }}</a>
                                                    </template>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 26.06.17 edit 정다희 : 웹접근성 대응 iframe title 적용 -->
                                    <div class="map_area">
                                        <iframe :title="mall.mapTitle" :src="mall.mapUrl" width="100%" height="100%" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </section>
                </div>

                <div class="lease_section">
                    <h3 class="main_title">{{ t.lease_subtitle }}</h3> <!-- 26.06.08 add 정다희 : 클래스 수정정 -->
                    <div class="principles_card_container">
                        <component 
                            :is="isMobile ? 'swiper' : 'div'"
                            :slides-per-view="'1.1'"
                            :space-between="isMobile ? 8 : 0"
                            :breakpoints="{ 768: { allowTouchMove: false } }"
                            class="principles_swiper_wrapper"
                        >
                            <component 
                                :is="isMobile ? 'swiper-slide' : 'div'"
                                v-for="(p, pIdx) in t.lease_subtitle_desc.principles" 
                                :key="'principle-' + pIdx" 
                                class="principle_card_item"
                            >
                                <div class="card_header">
                                    <span class="card_num">0{{ pIdx + 1 }}</span>
                                    <strong class="card_title">{{ p.subTitle }}</strong>
                                </div>
                                
                                <!-- 26.06.29 del 정다희 : card_body_sub 삭제 -->
                                <!-- <div v-if="p.subtxt" class="card_body_sub">
                                    <p class="desc_sub_text">{{ p.subtxt }}</p>
                                </div> -->
                                <!-- //26.06.29 del 정다희 : card_body_sub 삭제 -->
                            </component>
                        </component>
                    </div>

                    <div class="fee_tip_box">
                        <div>
                            <strong>{{ t.fee_tip_title }}</strong>
                            <p>{{ t.fee_tip_desc_1 }}</p>
                        </div>
                    </div>
                </div>

                <!-- 26.06.24 edit 정다희 : help_desk_area — 지하철 탭만, 공통 lease_section 하단 -->
                <div v-if="CTabIdx === 0" class="help_desk_area">
                    <div class="guide_header">
                        <h4 class="text-wrapper mb12">{{ t.HelpDeskTitle }}</h4>
                        <p class="div_desc">{{ t.HelpDeskDesc }}</p>
                    </div>
                    <ul>
                        <li v-for="(help, hIdx) in t.HelpDeskItems" :key="'help-'+hIdx">
                            <div class="info">
                                <span class="brand">{{ help.brand }}</span>
                                <strong class="tel">{{ help.tel }}</strong>
                                <p class="note">※ {{ help.note }}</p>
                                <a :href="help.link" class="btn_big border btn_icon_arrow after mt20" target="_blank">
                                    {{ t.BtnGoDetail }}
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- //26.06.24 edit 정다희 : help_desk_area -->

                <div class="bottom_btns">
                    <button class="btn_back" @click="handleBack">{{ t.backLabel }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
/* 26.06.30 add 정다희 : 쇼핑몰 2depth 탭 visual_img 이미지 import (gsrbr1101_01~04 PC / mo 01~04_mo) */
import imgGsrbr1101Mall01 from "@/assets/images/dummy/gsrbr1101_01.png";
import imgGsrbr1101Mall02 from "@/assets/images/dummy/gsrbr1101_02.png";
import imgGsrbr1101Mall03 from "@/assets/images/dummy/gsrbr1101_03.png";
import imgGsrbr1101Mall04 from "@/assets/images/dummy/gsrbr1101_04.png";
import imgGsrbr1101Mall01Mo from "@/assets/images/dummy/mo/gsrbr1101_01_mo.png";
import imgGsrbr1101Mall02Mo from "@/assets/images/dummy/mo/gsrbr1101_02_mo.png";
import imgGsrbr1101Mall03Mo from "@/assets/images/dummy/mo/gsrbr1101_03_mo.png";
import imgGsrbr1101Mall04Mo from "@/assets/images/dummy/mo/gsrbr1101_04_mo.png";

/* 26.06.30 add 정다희 : SUBTabIdx별 visual 매핑 — 0:안녕인사동(01), 1:구로(02), 2:판교(03), 3:동부산(04) */
const mallVisualList = [
    { mainImg: imgGsrbr1101Mall01, mainImgMo: imgGsrbr1101Mall01Mo },
    { mainImg: imgGsrbr1101Mall02, mainImgMo: imgGsrbr1101Mall02Mo },
    { mainImg: imgGsrbr1101Mall03, mainImgMo: imgGsrbr1101Mall03Mo },
    { mainImg: imgGsrbr1101Mall04, mainImgMo: imgGsrbr1101Mall04Mo },
];

export default {
    name: "gsrbr1101",
    components: { Tabs, Swiper, SwiperSlide },
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            CTabIdx: 0,
            SUBTabIdx: 0,
            isMobile: false,
            langData: {
                ko: {
                    Labels: {
                        phone: "전화",
                        email: "이메일",
                        conditionInfo: "임대조건 안내",
                        mallIntro: "상업시설 소개",
                        sns: "SNS(인스타그램)",
                        blog: "블로그",
                        phoneNum: "전화번호"
                    },
                    Visual: { 
                        img: require("@/assets/images/dummy/gsrbr1101.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr1101_mo.png"),
                        alt: "GS THE FRESH 메인 비주얼",
                        subContent_1: "부동산",
                        subContent_2: "개발 및 임대",
                    },
                    SubContent_1: `GS리테일의 부동산 개발 및 임대 사업부입니다.`,
                    SubContent_2: `상업용 부동산 개발부터 임대, 관리까지<br/> 토탈 솔루션을 제공합니다.`,
                    SubContent_3: `최적의 입지 분석과<br/> 수익성 높은 부동산 포트폴리오를 구축합니다.`,
                    Tabs1: [{ item: "지하철" }, { item: "쇼핑몰" }],
                    Tabs2_Mall: [{ item: "안녕인사동" }, { item: "구로 지밸리몰" }, { item: "판교 파미어스몰" }, { item: "동부산 미식일상" }],
                    SubwayData: {
                        img: require("@/assets/images/dummy/gsrbr1101_subway.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr1101_subway_mo.png"),
                        title: `신분당선 1, 2단계 임대상가 모집`,
                        principles: [
                            { subTitle: `최단시간 강남접근`, desc: [`강남역 ~ 정자역 16분대 운행 (기존 분당선 대비 약 30분 단축)`, `광역버스 및 자가용 이용 통근자의 교통 체증 난(難) 해소`] },
                            { subTitle: `풍부한 유동성`, desc: [`총 6개역 중 4개 역사가 환승역사 <br />강남(2호선), 양재(3호선), 판교, 정자(분당선)`, `강남 최고의 오피스/상업 밀집지인 강남역 연결`]}, // <!-- 26.06.08 add 정다희 : 텍스트 수정 -->
                            { subTitle: `최적화된 역사 환경`, desc: [`현대적 감각의 인테리어 구현 및 높은 층고(3.6M)로 개방감 확보`] }
                        ],
                        routeMapImg: require("@/assets/images/dummy/gsrbr1101_subway.png"),
                        contact: { 
                            연락처:"연락처",
                            전화:"전화",
                            phone: `02-2006-3198`, 
                            이메일:"이메일",
                            email1: `hyungwook.lim@gsretail.com` ,
                            email2: `masiaeve@gsretail.com` ,
                        },
                        conditions: [
                            {
                                name: `임대상가`, img: require("@/assets/images/dummy/subway_shop.png"),
                                // table 26.06.29 edit 정다희 : 테이블 내용 수정 
                                table: [
                                    { th: `월 임대료`, td: `계약 기간 전체 선납` },
                                    // { th: `임대 보증금`, td: `월 임대료 * 12개월` },  // table 26.06.29 del 정다희 : th 삭제 
                                    { th: `계약기간`, td: `3개월 이상 ~ 12개월 이하` },
                                    { th: `면적`, td: `각 역사별 상이` },
                                    { th: `추천업종`, td: `의류, 편의서비스, 생활잡화, 디저트 등` }
                                ]
                            },
                            {
                                name: `키오스크`, img: require("@/assets/images/dummy/subway_kiosk.png"),
                                // table 26.06.29 edit 정다희 : 테이블 내용 수정 
                                table: [
                                    { th: `월 집기 사용료`, td: `업체 제안 방식` }, // <!-- 26.06.08 add 정다희 : th 텍스트 수정 -->
                                    { th: `사용료 납입`, td: `6개월 선납 방식` },  // <!-- 26.06.08 add 정다희 : th 텍스트 수정 -->
                                    { th: `계약기간`, td: `6개월 단위` },
                                    { th: `예치보증금`, td: `사용료 3개월 분` },
                                    { th: `추천업종`, td: `악세사리, 잡화 등` }
                                ]
                            }
                        ],
                    },
                    lease_subtitle: `임대차방식`,
                    lease_subtitle_desc_1: `보증금/고정 월세`,
                    lease_subtitle_desc_2: `보증금/변동 월세`,
                    lease_subtitle_desc:{
                        principles: [
                            { subTitle: `보증금/고정 월세`},
                            { subTitle: '보증금/변동 월세 (수수료 방식)'} /* 26.06.29 edit 정다희 : subtxt 삭제 */
                        ],
                    },

                    fee_tip_title: `수수료방식이란?`, 
                    fee_tip_desc_1: `월 순매출의 일정 비율을 임대인에게 임대로로 지급하는 방식. 예) 월 순매출금액 x 수수료율 (VAT별도)`,    
                    
                    // 26.06.29 add 정다희 : help_desk_area 추가 
                    HelpDeskTitle: "GS25, GS THE FRESH 창업 문의",
                    HelpDeskDesc: "GS25, GS THE FRESH 창업 문의는 창업안내의 상담 및 신청 메뉴에서 진행하실 수 있습니다.",
                    HelpDeskItems: [
                        { brand: "GS25", tel: "1644-5425", note: "GS25 창업상담 문의", link: "/gsrst02010101" },
                        { brand: "GS THE FRESH (GS수퍼마켓)", tel: "1833-9779", note: "GS THE FRESH 가맹상담 문의", link: "/gsrst01010101" }
                    ],
                    BtnGoDetail: "바로가기",
                    // //26.06.29 add 정다희 : help_desk_area 추가 

                    mall_txt:'연락처',
                    MallData: [
                        { 
                            홈페이지:'홈페이지',
                            name: `안녕인사동`, contentTitle: `안녕인사동 복합상업시설`,
                            intro: [
                                {title:`인사동 랜드마크`,desc:`인사동 쌈지길 맞은편에 위치한 복합문화상업시설로 2019년 10월 그랜드 오픈 후 인사동의 랜드마크로 자리매김함`},
                                {title:`상시밀집 지역`,desc:`직장인/외국인/가족나들이/관광객 등이 상시 밀집하며, 인사동-익선동으로 이어지는 우수한 도보 접근성 및 신비로운 건물 가시성`},
                                {title:`고객 경험에 특화된 MD 구성`,desc:`갤러리, 카페, 식음, 소품 등 다양한 매장이 거리를 형성하고, 전통 문화 지역 특성을 준수하여 고객 경험에 특화된 MD 구성`}, /*26.06.29 edit 정다희 : title 오타 수정 */
                                {title:`차별화된 시설`,desc:`상권 내 차별화된 시설(나인트리 호텔 숙박 연계 및 주차 공간 제공) 등 국내외 방문객의 장시간 체류 가능 (호캉스+몰캉스)`}
                            ], 
                            mainImg: mallVisualList[0].mainImg, mainImgMo: mallVisualList[0].mainImgMo, /* 26.06.30 add 정다희 : visual_img — 안녕인사동 gsrbr1101_01 */
                            mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.1734625641543!2d126.98088067587412!3d37.574532872036556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3ef4127fbcd%3A0xdff366a8dbc227d6!2z7JWI64WV7J247IKs64-Z!5e0!3m2!1sko!2skr!4v1775627958896!5m2!1sko!2skr`,
                            mapTitle: "안녕인사동 위치 지도 영역(퍼블용 이미지)",/* 26.06.17 edit 정다희 : 웹접근성 iframe title */
                            contact: { phone: `02-6954-2991`, email1: `anyounginsadong@gsretail.com`, instatxt:`anyounginsadong`, blog:``, insta: `https://www.instagram.com/anyounginsadong/`, homepage: `` },
                            type:`card_type`
                        },
                        { 
                            홈페이지:'홈페이지',
                            name: `구로 지밸리몰`, contentTitle: `구로 지밸리 비즈플라자 지밸리몰`,
                            // 26.06.29 edit 정다희: intro - title 내용수정, desc 추가 
                            intro: [
                                {title:`구로디지털단지 최대 규모의<br/>복합 라이프스타일몰`, desc:"업무·의료·뷰티·식음·휴식까지 한곳에서 누리는 생활 복합 공간"},
                                {title:`다양한 전문 의료시설이 모인<br/>메디컬 특화 공간`, desc:"산부인과·피부과·안과·한의원·마취통증의학과 등 일상 가까이에서 누리는 건강 케어"},
                                {title:`뷰티·운동·교육이 어우러진<br />라이프스타일 공간`, desc:"네일샵·헬스장·PT샵·발레학원 등 취향과 자기관리를 위한 다양한 선택"},
                                {title:`카페와 식당가가 함께하는<br />편안한 만남과 휴식 공간`, desc:"커피숍과 다양한 식음 매장으로 일상 속 여유와 즐거움을 더하는 공간"},
                            ], 
                            // //26.06.29 edit 정다희: intro - title 내용수정, desc 추가 

                            mainImg: mallVisualList[1].mainImg, mainImgMo: mallVisualList[1].mainImgMo, /* 26.06.30 add 정다희 : visual_img — 구로 지밸리몰 gsrbr1101_02 */
                            mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.9672616045955!2d126.89372737714335!3d37.485098928791544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e24b5094a57%3A0x548819319c910b57!2z6rWs66Gc7KeA67C466as66qw!5e0!3m2!1sko!2skr!4v1775628029310!5m2!1sko!2skr`,
                            mapTitle: "구로 지밸리몰 위치 지도 영역(퍼블용 이미지)",/* 26.06.17 edit 정다희 : 웹접근성 iframe title */
                            contact: { phone: `02-2006-3199`, email1: `sigar11@gsretail.com`, snsLabel: `SNS(인스타그램)`, instatxt:`g_valley`, blog:``, insta: `https://www.instagram.com/g_valley/`, homepage: `` },
                            type:`card_type`
                        },
                        { 
                            홈페이지:'홈페이지',
                            name: `판교 파미어스몰`, contentTitle: `판교 파미어스몰`,
                            intro: [
                                `<b>아이와 함께, 친구와 함께, 연인와 함께,<br/> 판교에서 따로, 또 같이 '파미어스몰'로 여러분을 초대합니다.</br>`,
                                `국내 최고의 자족형 신도시, 판교에 다양한 라이프 스타일이 조화롭게 어우러진 복합 문화 상업 공간, '파미어스몰<br/>
                                파미어스몰은 연면적 약 7만 7천평 규모의 복합시설로 315실의 '나인트리 호텔', 785세대의 '오피스텔', 5개기업의 오피스로 사용되고,<br/> 약 8,653평의 저층부에는 극장, 메디컬, 키즈, 쇼핑, 카페, 레스토랑 등 지역 주민들의 풍요로운 하루를 완성할 수 있는 다양한 상업 및 문화시설이 자리잡았습니다.
                                '`,
                            ], 
                            mainImg: mallVisualList[2].mainImg, mainImgMo: mallVisualList[2].mainImgMo, /* 26.06.30 add 정다희 : visual_img — 판교 파미어스몰 gsrbr1101_03 */
                            mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.017687225739!2d127.09543847714181!3d37.41305683291176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca7d57f7c5fdb%3A0x3205f726fd596acf!2z7YyM66-47Ja07Iqk66qw!5e0!3m2!1sko!2skr!4v1775628062277!5m2!1sko!2skr`,
                            mapTitle: "판교 파미어스몰 위치 지도 영역(퍼블용 이미지)",/* 26.06.17 edit 정다희 : 웹접근성 iframe title */ 
                            contact: { phone1: `031-759-0429`, email1: `jhpyo@gsretail.com`, email2: `pameus@gsretail.com`, snsLabel: `SNS(인스타그램)`, instatxt:`pameusmall`, blog:``, insta: `https://www.instagram.com/pameusmall/`, homepage: `http://www.pameusmall.com/pameus/main/main.php` } /* 26.06.29 del 정다희 : phone 삭제 */ 
                        },
                        { 
                            홈페이지:'홈페이지',
                            name: `동부산 미식일상`, contentTitle: `동부산 미식일상`,
                            intro: [
                                `<b>미식일상은 오시리아 관광단지 중심부에 위치한 약 3,000평 규모의 복합문화시설로,<br />2021년 6월 오픈 이후 F&B와 다채로운 체험 콘텐츠가 결합된 독보적인 '문화복합시설'로의 재도약을 준비중입니다.</b>`, /*26.06.29 edit 정다희 : 텍스트 수정 */ 
                                `오시리아 관광단지는 연간 약 4천만명이 방문하는 지역으로 일회성 방문지가 아닌 높은 재방문율과 지속적인 소비력을 갖춘 '안정적인 배후 수요의 상권' 입니다.<br />특히, 미식일상은 롯데아울렛/롯데월드/스카이라인루지/바운스유니버스의 중심부에 위치하여 주변시설을 연결하는 집객력과 확장성을 보유하고 있는 시설입니다.` /*26.06.29 edit 정다희 : 텍스트 수정 */ 
                            ], 
                            mainImg: mallVisualList[3].mainImg, mainImgMo: mallVisualList[3].mainImgMo, /* 26.06.30 add 정다희 : visual_img — 동부산 미식일상 gsrbr1101_04 */
                            mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5041907160903!2d129.2118041770898!3d35.19390825658788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35688d0870d1aba7%3A0x236d755155fb1b70!2z66-47Iud7J287IOBIO2RuOuTnO2ZgA!5e0!3m2!1sko!2skr!4v1775628088485!5m2!1sko!2skr`,
                            mapTitle: "동부산 미식일상 위치 지도 영역(퍼블용 이미지)",/* 26.06.17 edit 정다희 : 웹접근성 iframe title */
                            contact: { phone: `051-722-8155`, email1: `wlssoddl@gsretail.com`, email2: `kjk5774@gsretail.com`,email3: `foodhallbusan@gsretail.com`, snsLabel: `SNS(인스타그램)`, instatxt:`busan_foodhall`, blog:`https://blog.naver.com/busanfoodhall`, insta: `https://www.instagram.com/busan_foodhall/`, homepage: `https://blog.naver.com/busanfoodhall` } /*26.06.29 add 정다희 : email3 추가*/ 
                        }
                    ],
                    backLabel : '목록으로 돌아가기'
                },
                en: {
                    Labels: {
                        phone: "Phone",
                        email: "Email",
                        conditionInfo: "Leasing Terms",
                        mallIntro: "About our commercial facilities"/* 260604 번역 */,
                        sns: "Instagram"/* 260604 번역 */,
                        blog: "Blog",
                        phoneNum: "Phone Number"
                    },
                    Visual: { 
                        img: require("@/assets/images/dummy/gsrbr1101.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr1101_mo.png"),
                        alt: "GS THE FRESH Main Visual"/* 260604 번역 */,
                        subContent_1: "Real Estate"/* 260604 번역 */,
                        subContent_2: "Development and Leasing"/* 260604 번역 */,
                    },
                    SubContent_1: `GS Retail's real estate development and leasing division. We provide end-to-end solutions covering commercial real estate development, leasing, and management, while conducting optimal location analysis and building high-yield real estate portfolios.`,
                    SubContent_2: `From commercial real estate development to leasing and management<br/> We provide a total solution.`/* 260604 번역 */,
                    SubContent_3: `Optimal location analysis and<br/> We build a highly profitable real estate portfolio.`/* 260604 번역 */,
                    Tabs1: [{ item: "Subway" }, { item: "Shopping Mall" }],
                    Tabs2_Mall: [{ item: "Anyoung Insadong" }, { item: "Guro G-Valley Mall" }, { item: "Pangyo Pameus Mall" }, { item: "East Busan Misik Ilsang" }],
                    SubwayData: {
                        img: require("@/assets/images/dummy/gsrbr1101_subway.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr1101_subway_mo.png"),
                        title: `Sinbundang Line Phase 1 & 2 Retail Space Leasing`,
                        principles: [
                            { subTitle: `Fastest Access to Gangnam`, desc: [`01. Gangnam Station to Jeongja Station in approximately 16 minutes (approximately 30 minutes faster than the existing Bundang Line)`, `02. Relieves traffic congestion for commuters using express buses and private vehicles`] },
                            { subTitle: `High Foot Traffic`, desc: [`01. 4 out of 6 stations are transfer stations`, `02. Connected to Gangnam Station, the top office and commercial hub in Gangnam`], txt:[`Gangnam (Line 2), Yangjae (Line 3), Pangyo, Jeongja (Bundang Line)`,`Gangnam (Line 2), Yangjae (Line 3), Pangyo, Jeongja (Bundang Line)`] },
                            { subTitle: `Optimized Station Environment`, desc: [`01. Modern interior design with high ceilings (3.6m) for a spacious, open feel`] }
                        ],
                        routeMapImg: require("@/assets/images/dummy/gsrbr1101_subway.png"),
                        contact: { 
                            연락처:"Contact",
                            전화:"Phone",
                            phone: `02-2006-3198`, 
                            이메일:"Email",
                            email1: `hyungwook.lim@gsretail.com` ,
                            email2: `masiaeve@gsretail.com` ,
                        },
                        conditions: [
                            {
                                name: `Retail Space`, img: require("@/assets/images/dummy/subway_shop.png"),
                                table: [
                                    { th: `Monthly Rent`, td: `Proposed by tenant` },
                                    { th: `Lease Deposit`, td: `Monthly rent × 12 months` },
                                    { th: `Contract Period`, td: `Phase 1: Until December 31, 2026 / Phase 2: Until August 15, 2028` },
                                    { th: `Area`, td: `Varies by station` },
                                    { th: `Recommended Business Types`, td: `Apparel, convenience services, daily goods, desserts, etc.` }
                                ]
                            },
                            {
                                name: `Kiosk`, img: require("@/assets/images/dummy/subway_kiosk.png"),
                                table: [
                                    { th: `Monthly Equipment Usage Fee`, td: `Proposed by tenant` },
                                    { th: `Payment Method`, td: `6-month prepayment` },
                                    { th: `Contract Period`, td: `6-month units` },
                                    { th: `Security Deposit`, td: `3 months' usage fee` },
                                    { th: `Recommended Business Types`, td: `Accessories, general goods, etc.` }
                                ]
                            }
                        ],
                    },
                    lease_subtitle: `Lease Type`,
                    lease_subtitle_desc_1: `- Security deposit / Fixed monthly rent`,
                    lease_subtitle_desc_2: `Deposit/Variable Monthly Rent`/* 260604 번역 */,
                    lease_subtitle_desc:{
                        principles: [
                            { subTitle: `- Security deposit / Fixed monthly rent`},
                            { subTitle: '- Security deposit / Variable monthly rent (commission-based)' } /* 26.06.29 edit 정다희 : subtxt 삭제 */
                        ],
                    },
                    fee_tip_title: `What is the Commission-Based Lease?`, 
                    fee_tip_desc_1: `A method of paying the landlord rent as a set percentage of monthly net sales. e.g., monthly net sales x commission rate (VAT excluded)`/* 260604 번역 */,
                    // 26.06.29 add 정다희 : help_desk_area 추가
                    HelpDeskTitle: "GS25, GS THE FRESH Franchise Inquiries",
                    HelpDeskDesc: "For GS25 and GS THE FRESH franchise inquiries, please use the Consultation and Application menu in the Franchise Guide section.",
                    HelpDeskItems: [
                        { brand: "GS25", tel: "1644-5425", note: "GS25 Franchise Consultation", link: "/gsrst02010101" },
                        { brand: "GS THE FRESH (GS Supermarket)", tel: "1833-9779", note: "GS THE FRESH Franchise Consultation", link: "/gsrst01010101" }
                    ],
                    BtnGoDetail: "Go",
                    // //26.06.29 add 정다희 : help_desk_area 추가
                    mall_txt:'Contact',
                    MallData: [
                        { 
                            홈페이지:'Homepage',
                            name: `Anyoung Insadong`, contentTitle: `Anyoung Insadong Mixed-Use Commercial Complex`,
                            intro: [
                                {title:`Insadong landmark`/* 260604 번역 */,desc:`01. A mixed-use cultural and commercial complex located across from Ssamziegil in Insadong. Since its grand opening in October 2019, it has established itself as a landmark of Insadong.`},
                                {title:`Constantly crowded area`/* 260604 번역 */,desc:`02. Consistently frequented by office workers, international visitors, families on outings, and tourists, with excellent walkability along the Insadong–Ikseon-dong corridor and a distinctive building presence.`},
                                {title:`MD lineup specialized for the customer experience`/* 260604 번역 */,desc:`03. A diverse mix of galleries, cafes, dining, and specialty stores creates a vibrant streetscape, with tenant mix curated to reflect the area's traditional cultural character and enhance customer experience.`},
                                {title:`Differentiated facilities`/* 260604 번역 */,desc:`04. Distinctive facilities including a Nine Tree Hotel stay package and parking, enabling extended visits by domestic and international guests (staycation + mallcation)`}
                            ], 
                            mainImg: mallVisualList[0].mainImg, mainImgMo: mallVisualList[0].mainImgMo, /* 26.06.30 add 정다희 : visual_img — 안녕인사동 gsrbr1101_01 */
                            mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.1734625641543!2d126.98088067587412!3d37.574532872036556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3ef4127fbcd%3A0xdff366a8dbc227d6!2z7JWI64WV7J247IKs64-Z!5e0!3m2!1sko!2skr!4v1775627958896!5m2!1sko!2skr`,
                            mapTitle: "Anyoung Insadong location map area (publishing image)",/* 260604 번역, 26.06.17 edit 정다희 : 웹접근성 iframe title */
                            contact: { phone: `02-6954-2991`, email1: `anyounginsadong@gsretail.com`, instatxt:`anyounginsadong`, blog:``, insta: `#`, homepage: `` },
                            type:`card_type`
                        },
                        { 
                            홈페이지:'Homepage',
                            name: `Guro G-Valley Mall`, contentTitle: `Guro G-Valley Biz Plaza — G-Valley Mall`,
                            // 26.06.29 edit 정다희: intro title 내용수정, desc 추가
                            intro: [
                                {title:`The largest mixed-use lifestyle mall<br/>in Guro Digital Complex`, desc:"A comprehensive living complex where work, medical care, beauty, dining, and relaxation come together in one place"},
                                {title:`A medical-specialized space<br/>with diverse professional healthcare facilities`, desc:"Everyday health care close at hand — obstetrics & gynecology, dermatology, ophthalmology, Korean medicine, pain medicine, and more"},
                                {title:`A lifestyle space where beauty,<br />fitness, and education come together`, desc:"A wide range of choices for your taste and self-care — nail salons, gyms, PT studios, ballet academies, and more"},
                                {title:`A comfortable space for gatherings<br />and relaxation with cafes and dining`, desc:"Coffee shops and various dining options that add ease and enjoyment to everyday life"},
                            ],
                            // //26.06.29 edit 정다희: intro title 내용수정, desc 추가
                            mainImg: mallVisualList[1].mainImg, mainImgMo: mallVisualList[1].mainImgMo, /* 26.06.30 add 정다희 : visual_img — 구로 지밸리몰 gsrbr1101_02 */
                            mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.9672616045955!2d126.89372737714335!3d37.485098928791544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e24b5094a57%3A0x548819319c910b57!2z6rWs66Gc7KeA67C466as66qw!5e0!3m2!1sko!2skr!4v1775628029310!5m2!1sko!2skr`,
                            mapTitle: "Guro G-Valley Mall location map area (publishing image)",/* 260604 번역, 26.06.17 edit 정다희 : 웹접근성 iframe title */
                            contact: { phone: `02-2006-3199`, email1: `sigar11@gsretail.com`, snsLabel: `SNS`, instatxt:`g_valley`, blog:``, insta: `https://www.instagram.com/g_valley/ `, homepage: `` },
                            type:`card_type`
                        },
                        { 
                            홈페이지:'Homepage',
                            name: `Pangyo Pameus Mall`, contentTitle: `Pangyo Pameus Mall`,
                            intro: [
                                `With your children, with friends, with your partner — <br />we invite you to Pameus Mall in Pangyo, where you can enjoy it your own way or all together.`,
                                `South Korea's premier self-sufficient new town of Pangyo is home to 'PAMEUS MALL' — a mixed-use cultural and commercial space where diverse lifestyles harmoniously converge. PAMEUS MALL is part of a complex spanning approximately 254,545㎡ of total floor area, encompassing a 315-room Nine Tree Hotel, 785 serviced apartments, and offices for five companies. The lower floors, spanning approximately 28,596㎡, house a rich variety of commercial and cultural facilities including a cinema, medical center, kids' zone, shopping, cafes, and restaurants — offering everything local residents need for a fulfilling day.`,
                            ], 
                            mainImg: mallVisualList[2].mainImg, mainImgMo: mallVisualList[2].mainImgMo, /* 26.06.30 add 정다희 : visual_img — 판교 파미어스몰 gsrbr1101_03 */
                            mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.017687225739!2d127.09543847714181!3d37.41305683291176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca7d57f7c5fdb%3A0x3205f726fd596acf!2z7YyM66-47Ja07Iqk66qw!5e0!3m2!1sko!2skr!4v1775628062277!5m2!1sko!2skr`,
                            mapTitle: "Pangyo Pameus Mall location map area (publishing image)",/* 260604 번역, 26.06.17 edit 정다희 : 웹접근성 iframe title */
                            contact: { phone1: `031-759-0429`, email1: `jhpyo@gsretail.com`, email2: `pameus@gsretail.com`, snsLabel: `SNS`, instatxt:`pameusmall`, blog:``, insta: `https://www.instagram.com/pameusmall/`, homepage: `http://www.pameusmall.com/pameus/main/main.php` } /*26.06.29 del 정다희 : phone 삭제*/
                        },
                        { 
                            홈페이지:'Homepage',
                            name: `East Busan Misik Ilsang`, contentTitle: `East Busan Misik Ilsang`,
                            intro: [
                                `<b>Misik Ilsang is a cultural complex of approximately 3,000 pyeong located at the center of the Osiria Tourism Complex,<br />and since opening in June 2021, it has been preparing to take a new leap forward as an unrivaled 'cultural complex' that combines F&B with diverse experiential content.</b>`/* 260604 번역 */, /*26.06.29 edit 정다희 : 오픈 이후 텍스트 수정*/
                                `Osiria Tourism Complex is an area visited by approximately 40 million people annually — not a one-time destination, but a stable commercial district with a captive demand base, characterized by high return visit rates and sustained spending power.<br />In particular, Misik Ilsang is located at the heart of Lotte Outlet / Lotte World / Skyline Luge / Bounce Universe, making it a facility with strong customer-drawing power and scalability that connects the surrounding attractions.`/* 260604 번역 */ /* 26.06.29 edit 정다희 : 텍스트 수정 */
                            ], 
                            mainImg: mallVisualList[3].mainImg, mainImgMo: mallVisualList[3].mainImgMo, /* 26.06.30 add 정다희 : visual_img — 동부산 미식일상 gsrbr1101_04 */
                            mapUrl: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3260.5041907160903!2d129.2118041770898!3d35.19390825658788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35688d0870d1aba7%3A0x236d755155fb1b70!2z66-47Iud7J287IOBIO2RuOuTnO2ZgA!5e0!3m2!1sko!2skr!4v1775628088485!5m2!1sko!2skr`,
                            mapTitle: "East Busan Misik Ilsang location map area (publishing image)",/* 260604 번역, 26.06.17 edit 정다희 : 웹접근성 iframe title */
                            contact: { phone: `051-722-8155`, email1: `wlssoddl@gsretail.com`, email2: `kjk5774@gsretail.com`,email3: `foodhallbusan@gsretail.com`, snsLabel: `SNS`, instatxt:`busan_foodhall`, blog:`https://blog.naver.com/busanfoodhall`, insta: `https://www.instagram.com/busan_foodhall/`, homepage: `https://blog.naver.com/busanfoodhall` } /*26.06.29 add 정다희 : email3 추가*/ 
                        }
                    ],
                    backLabel : 'Back to Brand List'
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
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
        const header = document.getElementById("header");

        header.classList.add("head_black");
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        onTabChange1(idx) {
            this.CTabIdx = idx;
            this.SUBTabIdx = 0; 
        },
        onTabChange2(idx) {
            this.SUBTabIdx = idx;
        },
        handleBack() {
            this.$router.back();
        },
        checkMobile() {
            this.isMobile = window.innerWidth < 768;
        },
    },
};
</script>

<style scoped>
.gsrbr1101 { width: 100%; position: relative; display: block; }
.mo {display:none;}
.bullet_01 li + li{margin-top:4px;}
.principles_card_container { width: 100%; margin-top:40px; }
.principles_swiper_wrapper { display: flex; gap: 20px; width: 100%; }
.principle_card_item { flex: 1; display: flex; flex-direction: column; gap: 24px; padding: 40px 32px 48px; background-color: #f8f8f8; border-radius: 12px; box-sizing: border-box; position: relative; }
.principle_card_item .card_header { display: flex; flex-direction: column; gap: 12px; }
.principle_card_item .card_num { font-size: 18px; font-weight: 700; color: #107af2; }
.principle_card_item .card_title { font-size: 2rem; font-weight: 700; color: #161616; }
.principle_card_item .card_body { display: flex; flex-direction: column; gap: 16px;}
.principle_card_item .card_body_sub {font-size:1.6rem;}
.principle_card_item .sub_text_box { display: flex; flex-direction: column; gap: 8px;}
.principle_card_item .sub_line { display: flex; align-items: flex-start; gap: 6px; }
.principle_card_item .sub_dash { font-size: 14px; color: #7c7c86; flex-shrink: 0; }
.principle_card_item .sub_dash::before { content: '-'; }
.principle_card_item .sub_desc {line-height: 1.4; color: #7c7c86; }
.principle_card_item .bullet_text, .principle_card_item .sub_desc {font-size:16px;}
.visual_section { width:100%; position: relative; overflow: hidden; }
.visual_content {width: 100%; position: absolute; top: 50%; left: 0; transform: translateY(-50%); z-index: 2; }
.text_box span {margin-bottom:10px; color:#fff; font-size:72px; font-weight:700; display: block;  }
/* cont_area 삭제 26.06.08 정다희  */

.sub_tabs { margin-top: 24px; }
.policy_wrap * {word-break: break-word;}
.detail_content { margin-top:64px; }
.tab_content { width: 100%; display: block; }
.inner_cont { width: 100%; position: relative; }
.visual_img { width: 100%;}
.visual_img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.info_section { margin-bottom:100px; }
.content_title{margin-bottom:16px;font-size: 4rem;line-height: 1.3;letter-spacing: -0.01em;display: flex; align-items: center;}
.content_title > a {margin-left:16px; padding:4px; font-size:1.8rem; font-weight:400; letter-spacing:-0.01em; line-height:160%; display:flex; align-items:center;}
.content_title > a::before{width:24px; height:24px; margin-right:8px; background:url('@/assets/images/common/icon_set_24.png') -1168px -56px no-repeat; content:''; display:block;}
.visual_img + .info_section{margin-top:40px;}
.main_title { margin-bottom:16px; color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.3; }
.sub_title { color: #161616; font-size: 2.4rem; font-weight: 700; }
.text_list { margin-top: 16px; }
.text_item {width: 100%; margin-bottom:16px; padding-left: 24px; color: #161616; font-size: 28px; line-height: 1.6; text-indent: -24px;}
.mall_content .visual_img { width: 100%; height: 340px; background-color: #D9D9D9; border-radius: 12px; overflow: hidden; }
.mall_content .visual_img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mall_content .main_title {margin-bottom:100px; color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.35; }
.mall_content .main_title a {margin-left:16px; font-size:18px; font-weight:500; display:inline-flex; gap:8px; align-items:center;}
.mall_content .main_title a::before {content: ''; display: inline-block; width:24px; height:24px; background:url('@/assets/images/common/icon_set_20.png') -454px -112px no-repeat;}
.mall-type-2 .text_item, .mall-type-3 .text_item {padding-left:0px; color:#90909A; font-size:18px; text-indent:0px;}
.mall-type-2 .text_item :deep(b), .mall-type-3 .text_item :deep(b) {color:#161616; font-size:24px; font-weight:700;}
.lease_condition_section { width: 100%; margin-top: 120px; }
.condition_grid { width: 100%; margin-top: 40px; display: flex; gap: 140px; }
.condition_item { flex: 1; }
.visual_img_small { width: 100%; height: 420px; margin-bottom:30px; border-radius: 12px; overflow: hidden; }
.visual_img_small img { width: 100%; height: 100%; object-fit: cover; }
.policy_wrap {margin-top:24px;}
.policy_wrap table { width: 100%; border-top: 1px solid #e5e5e9; }
.policy_wrap table th { padding: 18px 24px; color: #161616; font-size: 1.8rem; font-weight: 700; background-color: #f8f8f8; border-bottom: 1px solid #e5e5e9; border-top:0; border-left:0; border-right:0; text-align:left; }
.policy_wrap table td { padding: 18px 24px; color: #161616; font-size: 1.8rem; border-bottom: 1px solid #e5e5e9; border-left:0; border-right:0;}
.map_section {display:flex; gap:60px;}
.map_area { width: 100%; height: 600px; background-color: #f0f0f0; border: 1px solid #e5e5e9; border-radius: 12px; overflow: hidden; }
.contact_left { display: flex; gap: 40px; }
.mall_content .contact_info_wrap {width:calc(100% - 940px);}
.mall_content .contact_left {flex-direction:column; align-items:flex-start; gap:0px}
.mall_content .contact_left strong {margin-bottom:24px; }
.mall_content .contact_left .info_item {width:100%; padding-top:16px; padding-bottom:16px; border-bottom:1px solid #E5E5E9; position:relative; display: flex; flex-direction:column; align-items:flex-start; gap:4px;}

.btn_sns.ico_insta {width:24px; height:24px; background:url('@/assets/images/common/icon_set_24.png') -832px -15px no-repeat; position:absolute; top:50%; right:0; display:inline-flex; transform:translateY(-50%);}/* 26.07.06 Edit 이종환 원복, 26.06.10 Del 이종환*/
.mall_content .contact_left .info_item span {color:#161616; font-size:18px; font-weight:700;}
.mall_content .contact_left .info_item .val {color:#67676F; font-size:18px; font-weight:400; line-height:1.4; display:flex; flex-direction:column; gap:4px;}
.mall_content .contact_left .info_item a {color:#67676F; font-size:18px; font-weight:400; line-height:1.4;}
.info_item { display: flex; align-items: center; gap: 8px; }
.info_item em {color:#67676F; font-size:18px; font-weight:700;}
.info_item span {color:#67676F; font-size:16px;}
.sns_right { display: flex; gap: 10px; }
.tell_area.mo {margin-top:40px;}
.tell_area.mo h3 {margin-bottom:24px;}
.tell_area.mo ul li:first-of-type {padding:16px 0; border-top:1px solid #E5E5E9; border-bottom:1px solid #E5E5E9;}
.tell_area.mo ul li:first-of-type + li {padding-top:16px;}
.tell_area.mo ul li * {font-size:16px;}
.tell_area.mo ul li p {margin-top:4px; color:#67676F; line-height:1.5;}
.tell_area.mo ul li p + p{margin-top:8px;}
.mall_intro_cards .desc_sub_text {color:#67676F; font-size:16px; line-height:1.5;}
.mall-type-1 .principles_swiper_wrapper {display: grid; grid-template-columns: repeat(2, 1fr);}
.lease_section, .help_desk_area { width: 100%; margin-top:120px; }
.fee_tip_box {margin-top:40px;}
.fee_tip_box strong {margin-bottom:8px; padding-left:32px; color:#67676F; font-size:18px; font-weight:700; display:block; position:relative;}
.fee_tip_box strong::before {content:''; width:24px; height:24px; background:url('@/assets/images/common/icon_set_24.png') -496px -56px no-repeat; display:inline-flex; position:absolute; left:0; top:50%; transform:translateY(-50%);}
.fee_tip_box p {color:#67676F; font-size:16px; font-weight:400; line-height:1.5;}
.lease_section .principles_card_container .principle_card_item {width:340px; flex:none;}
/* 26.06.29 add 정다희 : help_desk_area 추가 */
.help_desk_area { width: 100%; }
.help_desk_area ul { margin-top:40px; padding: 0; display: flex; gap:20px; list-style: none; }
.help_desk_area ul li {width:calc(100% / 2 - 10px ); padding: 32px; background-color: #f8f8f8; border-radius: 10px; position: relative; }
.text-wrapper { font-size: 2.8rem; font-weight: 700; color: #161616; }
.div_desc { font-size: 2rem; line-height: 1.4; color: #161616; }
/* li::before를 이용한 브랜드 로고 처리 */
.help_desk_area ul li::before { content: ''; width: 160px; height: 160px; margin-right:40px; background-repeat: no-repeat; background-position: center; background-size: contain; display:inline-block; flex-shrink: 0; }
.help_desk_area ul li:nth-child(1)::before { background-image: url('@/assets/images/dummy/gsrst01_gs25.png'); }
.help_desk_area ul li:nth-child(2)::before { background-image: url('@/assets/images/dummy/gsrst01_fresh.png'); }

.help_desk_area .info {vertical-align:top; display:inline-block;}
.help_desk_area .brand { font-size: 1.8rem; font-weight: 700; color: #161616; }
.help_desk_area .tel { font-size: 2.8rem; font-weight: 700; color: #161616; margin: 4px 0; display: block; }
.help_desk_area .note { font-size: 1.6rem; color: #67676f; }

.bottom_btns { width: 100%; margin-top: 100px; text-align: left; }
.btn_list_back { background: transparent; padding: 0; border: 0; cursor: pointer; }
.btn_list_back span { color: #161616; font-size: 20px; display: flex; align-items: center; gap: 12px; }
.btn_list_back span::before {content: ''; width: 16px; height: 16px; background:url('@/assets/images/common/icon_set_16.png') -856px -14px no-repeat; display:inline-flex;}
.ac { text-align: center; }

@media screen and (min-width: 1024px) {
    :deep(.subway_content) .main_title br {display:none;}
  
}
@media screen and (max-width: 1024px) {
    .visual_wrap { padding: 80px 0; }
    .intro_content { flex-direction: column; align-items: flex-start; gap: 40px; }
    .visual_img + .info_section{margin-top:24px;}
    .visual_img + .info_section > .content_title{margin-bottom:64px;}
    .text_box .title { font-size: 36px; }
    .text_box .desc_box { margin-top: 24px; }
    .text_box .summary, .text_box .desc { font-size: 1.8rem; line-height: 1.5; }
    .detail_content { margin-top: 60px; }
    .content_title {font-size: 2.8rem !important; display: block;}
    .main_title {font-size: 28px; }
    .sub_title { font-size: 20px; }
    .text_item { font-size: 1.8rem; line-height: 1.6; }
    .map_area { height: 400px; }
    .map_section {flex-direction:column;}
    .mall_content .contact_info_wrap {width:100%; order:1;}
    .contact_info_wrap { padding: 0; flex-direction: column; align-items: flex-start; gap: 24px; }
    .contact_left { flex-direction: column; gap: 12px; }
    .sns_right { width: 100%; margin-top: 10px; justify-content: flex-start; }
    .lease_section, .help_desk_area { margin-top: 80px; }
    .fee_tip_box {flex-direction: column; align-items: flex-start; gap: 16px; }
    .val_txt { font-size: 16px; word-break: keep-all; }
    .btn_list_back span { height: 50px; justify-content: center; }
    /* .principles_swiper_wrapper { flex-direction: column; gap: 16px; } */
    .principle_card_item {height:auto; padding: 32px; display:block; flex:none;}
    .principles_swiper_wrapper, .mall-type-1 .principles_swiper_wrapper {display: grid; grid-template-columns: repeat(2, 1fr);}
    
    /* 26.06.29 add 정다희 : help_desk_area */
    .help_desk_area ul { flex-direction: column; grid-template-columns: 1fr; }
    .help_desk_area ul li { width:100%; padding:20px; flex-direction:column;}
    .help_desk_area .info .brand { font-size: 1.4rem;}
    .help_desk_area .info .tel { font-size: 2rem;}
    .help_desk_area .info .note { font-size: 1.2rem;}
    .help_desk_area .info .btn_big {height:38px; font-size: 1.6rem;}
}
@media screen and (max-width: 768px) {
    .pc {display:none;}
    .mo {display:block;}
    
    .info_section { margin-bottom:40px; }
    .condition_grid{gap:40px;}
    .content_title{font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em;}
    .content_title > a {margin-top:16px; margin-left:0; font-size:1.4rem; font-weight:500; line-height:140%;}
    .content_title > a::before{width:20px; height:20px; background-image:url('@/assets/images/common/icon_set_20.png'); background-position:-454px -115px;}
    .text_box span {margin-bottom:10px; color:#fff; font-size:28px; font-weight:700; text-align:center; display: block;  }
    .text_box .title { font-size: 30px; letter-spacing: -0.5px; }
    .text_item, .mall-type-2 .text_item :deep(b), .mall-type-3 .text_item :deep(b),.mall-type-2 .text_item, .mall-type-3 .text_item {font-size: 16px; }
    .mall_content .visual_img { width:calc(100% + 40px); height: 245px; margin:0 -20px; border-radius: 0;}
    .mall_content .main_title {margin-bottom:60px; margin-left:0px;font-size:2.4rem;line-height:1.35; display:flex; flex-direction:column;}
    .mall_content .main_title a {margin-left:0px; margin-top:16px; font-size:14px;}
    .mall-type-2 .text_item :deep(b br) , .mall-type-3 .text_item :deep(b br) {display:none;}
    .main_title { font-size: 24px; }
    .condition_grid {flex-direction:column; margin-top:24px;}
    .principles_card_container { margin-top: 24px; }
    .principles_swiper_wrapper{width:calc(100% + 20px); padding-right:20px;}
    .principle_card_item .card_header{gap:6px;}
    .principle_card_item .card_num{font-size:1.8rem; line-height:1.5;}
    .principle_card_item .card_title{margin-bottom:16px; font-size:1.8rem; line-height:1.5;}
    .principle_card_item .bullet_text, .principle_card_item .sub_desc { font-size: 1.4rem; line-height:1.4; }
    .bullet_01 li + li{margin-top:6px;}
    .bullet_01 li{padding-left:6px;}
    .bullet_01 li::before{width:2px; height:2px;}
    .lease_condition_section {margin-top:80px; }
    .policy_wrap table { table-layout: fixed; }
    .policy_wrap table colgroup col:first-child { width: 113px; }
    .lease_section{margin-top:80px;}
    .lease_section .principles_card_container .principle_card_item {width:100%;}
    .contact_left .info_item:first-of-type{border-top:1px solid #E5E5E9;}
    /* .mall-type-1 .principles_swiper_wrapper {display:block;} */
    .policy_wrap{margin-top:8px;}
    .policy_wrap table th{padding:22px 20px;font-size: 1.6rem;line-height: 1.24;letter-spacing: 0%;}
    .policy_wrap table td{padding:20px;font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
    .policy_wrap table td p {font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
    .fee_tip_box{margin-top:24px;}
    .fee_tip_box strong{font-size: 1.6rem;line-height: 1.24;letter-spacing: 0%;}
    .fee_tip_box p{font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em;}
    /* 26.06.29 add 정다희 : help_desk_area */
    .help_desk_area ul {margin-top:24px;}
    .help_desk_area ul li { width:100%; padding:20px; display:flex; flex-direction:row; gap:20px; align-items:center;}
    .help_desk_area ul li::before {width:100px; margin-right:0;}
    .help_desk_area .info .brand { font-size: 1.4rem;}
    .help_desk_area .info .tel { font-size: 2rem;}
    .help_desk_area .info .note { font-size: 1.2rem;}
    .help_desk_area .info .btn_big {height:38px; font-size: 1.6rem;}
    .div_desc :deep(li), .div_desc { font-size: 1.8rem; margin-top:12px; }
    .bottom_btns { margin-top: 60px; }
    .text-wrapper{font-size: 2.4rem; line-height: 1.35;}
    }
 
</style>