<template>
    <div class="main-container">
        <header class="title_wrap ac top_visual"><!-- 26.06.04 Edit 이종환 : top_visual 클래스 추가-->
            <h2 class="page_title">{{ t.pageTitle }}</h2>
        </header>
        <main class="cont_inner">
            <section class="sec_ci_intro">
                <header class="header">
                    <h3>{{ t.ciIntro.title }}</h3>
                    <p>{{ t.ciIntro.lead }}</p>
                </header>
                <article class="cont_box">
                    <div class="cont_box_row">
                        <h4 class="sub_title">{{ t.ciIntro.symbolTitle }}</h4>
                        <p class="desc" v-html="t.ciIntro.symbolDesc"></p>
                    </div>
                    <figure class="gray_box">
                        <div class="img_wrap">
                            <img :src="imgCiLogo" :alt="t.ciIntro.logoAlt" />
                        </div>
                    </figure>
                    <ul class="color_cards">
                        <li v-for="item in t.ciIntro.colors" :key="item.name" :class="item.className">
                            <strong>{{ item.name }}</strong>
                            <p>{{ item.desc }}</p>
                        </li>
                    </ul>
                </article>
            </section>

            <section class="sec_ci_bi">
                <header class="header">
                    <h3>{{ t.ciBi.title }}</h3>
                </header>
                <ul class="ci_bi_cards">
                    <li v-for="logo in t.ciBiLogos" :key="logo.alt" class="ci_bi_card">
                        <figure class="img_wrap">
                            <img :src="logo.src" :alt="logo.alt" />
                        </figure>
                    </li>
                </ul>
                <article class="notice_box">
                    <header class="notice_head">
                        <span class="notice_ico" aria-hidden="true"></span>
                        <h4>{{ t.ciBi.noticeTitle }}</h4>
                    </header>
                    <p>{{ t.ciBi.noticeLead }}</p>
                    <ul class="notice_list">
                        <li v-for="(item, idx) in t.ciBi.noticeList" :key="'notice-' + idx" v-html="item"></li>
                    </ul>
                </article>
                <div class="button_wrap">
                    <Buttons btn-class="btn_icon btn_xl primary after">{{ t.ciBi.downloadLabel }}</Buttons>
                </div>
            </section>

            <section class="sec_color_reg">
                <header class="header">
                    <h3>{{ t.colorReg.title }}</h3>
                    <p v-html="t.colorReg.desc"></p>
                </header>
                <div class="color_reg_list_wrap">
                    <ul class="reg_list">
                        <li v-for="brand in t.colorRegList" :key="brand.name">
                            <article class="reg_card">
                                <header>
                                    <h4><img :src="brand.logo" :alt="brand.logo_alt" /><!--{{ brand.name }}--></h4>
                                </header>
                                <ol class="color_list">
                                    <li v-for="pantone in brand.pantones" :key="brand.name + '-' + pantone.name" :style="{ backgroundColor: pantone.bg }">
                                        <strong v-html="pantone.name"></strong>
                                        <ul class="color_detail">
                                            <li v-for="detail in pantone.details" :key="pantone.name + '-' + detail"><span>{{ detail }}</span></li>
                                        </ul>
                                    </li>
                                </ol>
                            </article>
                        </li>
                    </ul>
                </div>
                <div class="table_scroll">
                    <table class="spec_table">
                        <caption class="sr_only">{{ t.colorReg.tableCaption }}</caption>
                        <colgroup>
                            <col class="col_gs_color" />
                            <col span="4" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">GS COLOR</th>
                                <th scope="col">CMYK(PROCESS)</th>
                                <th scope="col">RGB(DESKTOP)</th>
                                <th scope="col">RGB(BROADCAST)</th>
                                <th scope="col">HEX(WEB-SAFE)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in t.colorSpecRows" :key="row.label">
                                <th scope="row">
                                    <span class="spec_cell_lead">
                                        <span class="spec_swatch" :style="{ backgroundColor: row.swatch }" aria-hidden="true"></span>
                                        <span>{{ row.label }}</span>
                                    </span>
                                </th>
                                <td>{{ row.cmyk }}</td>
                                <td>{{ row.rgbDesktop }}</td>
                                <td>{{ row.rgbBroadcast }}</td>
                                <td>{{ row.hex }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Buttons from "@/components/Buttons.vue";

// 이미지 자원 선언부
import imgCiLogo from "@/assets/images/dummy/gsrab04_02.png";
import imgCiBiLogo1 from "@/assets/images/sub/gsrab/img_ci_logo_01.png";  /* 260624 edit 이소라 */
import imgCiBiLogo2 from "@/assets/images/sub/gsrab/img_ci_logo_02.png";  /* 260624 edit 이소라 */
import imgCiBiLogo3 from "@/assets/images/sub/gsrab/img_ci_logo_03.png";  /* 260624 edit 이소라 */
import imgCiBiLogo4 from "@/assets/images/sub/gsrab/img_ci_logo_04.png";  /* 260624 edit 이소라 */
 
const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const langData = {
    ko: {
        pageTitle: "기업 CI/BI",
        ciIntro: {
            title: "CI 소개",
            lead: "‘GS’는 특정 단어의 약자이거나 어떤 의미를 함축하는 것은 아니며 'GS' 자체로 존재합니다.",
            symbolTitle: "GS심볼",
            symbolDesc: "에너지 사업의 역동성과 유통 서비스 사업의 성장과 활력을 상징하며, 불타는 태양,<br />하늘과 바다, 푸른 대지를 아우르는 심플하면서도 역동적인 느낌을 표현합니다.",
            logoAlt: "GS CI 로고",
            colors: [
                { className: "color_orange", name: "GS Orange", desc: "태양의 에너지와 열정" },
                { className: "color_green", name: "GS Green", desc: "대지의 환경 그리고 무한한 가능성" },
                { className: "color_blue", name: "GS Blue", desc: "하늘과 바다, 투명함과 창의성을 상징" },
            ],
        },
        ciBi: {
            title: "CI 및 BI",
            noticeTitle: "주의",
            noticeLead: "위 CI 및 BI를 도용하여 사용할 경우 상표법 제 93조에 의거하여 처벌받게 됩니다.",
            noticeList: [
                "CI (Corporate Identity) / BI (Brand Identity)<br />(참조) 상표법 제 93조 ~ 상표권 및 전용사용권의 침해행위를 한 자는 7년 이하의 징역 또는 1억원 이하의 벌금에 처한다. (개정 2001년 2월 3일)",
            ],
            downloadLabel: "CI 및 BI 다운로드(PNG)", /* 260624 edit 이소라 */
        },
        ciBiLogos: [
            { src: imgCiBiLogo1, alt: "GS리테일 로고" },
            { src: imgCiBiLogo2, alt: "GS25 로고" },
            { src: imgCiBiLogo3, alt: "GSSHOP 로고" },
            { src: imgCiBiLogo4, alt: "GS THE FRESH 로고" },
        ],
        colorReg: {
            title: "색상규정",
            desc: "기본적으로 심볼의 4원색(Gradient Color)표현을 기본으로 Communication을 하나, GS그룹을 알리는 Accent Color로 Jade Green을 사용합니다.<br />Gradient Color표현이 힘든 Service Space나 기타 요소에 Accent Color로 적용할 수 있습니다.",
            tableCaption: "GS 색상 규정 표",
        },
        colorRegList: [
            {
                logo: require("@/assets/images/sub/gsrab/img_ci_logo_01_s.png"),  /* 260624 edit 이소라 */
                logo_alt:"GS리테일",
                pantones: [
                    { name: "PANTONE <br />166 C", details: ["C 0", "M 65", "Y 100", "K 0"], bg: "#f47920" },
                    { name: "PANTONE <br />300 C", details: ["C 100", "M 50", "Y 0", "K 0"], bg: "#0072bc" },
                    { name: "PANTONE <br />7482 C", details: ["C 80", "M 0", "Y 75", "K 0"], bg: "#00b274" },
                    { name: "PANTONE <br />COOL Gray <br />10C", details: ["C 0", "M 0", "Y 0", "K 50"], bg: "#939598" },
                ],
            },
            {
                logo: require("@/assets/images/sub/gsrab/img_ci_logo_02_s.png"),  /* 260624 edit 이소라 */
                logo_alt:"GS25",
                pantones: [
                    { name: "PANTONE <br />285 C", details: ["C 100", "M 39", "Y 0", "K 0"], bg: "#007ec6" },
                    { name: "PANTONE <br />311 C", details: ["C 63", "M 0", "Y 10", "K 0"], bg: "#40c4e0" },
                ],
            },
            {
                logo: require("@/assets/images/sub/gsrab/img_ci_logo_03_s.png"),  /* 260624 edit 이소라 */
                logo_alt:"GS SHOP",
                pantones: [
                    { name: "PANTONE <br />2173 C", details: ["C 72", "M 27", "Y 0", "K 0"], bg: "#3698d4" },
                ],
            },
            {
                logo: require("@/assets/images/sub/gsrab/img_ci_logo_04_s.png"),  /* 260624 edit 이소라 */
                logo_alt:"GS THE FRESH",
                pantones: [
                    { name: "PANTONE <br />7484 C", details: ["C 91", "M 14", "Y 78", "K 60"], bg: "#005133" },
                ],
            },
        ],
        colorSpecRows: [
            { label: "PANTONE 321C", swatch: "#009999", cmyk: "100/0/50/0", rgbDesktop: "0/153/153", rgbBroadcast: "0/153", hex: "009999" },
            { label: "PANTONE 300C", swatch: "#3366CC", cmyk: "100/50/0/0", rgbDesktop: "51/102/204", rgbBroadcast: "20/102/204", hex: "3366CC" },
            { label: "PANTONE 368C", swatch: "#99CC00", cmyk: "53/0/100/0", rgbDesktop: "153/204/0", rgbBroadcast: "600/200/10", hex: "99CC00" },
            { label: "PANTONE 173C", swatch: "#CC6600", cmyk: "0/75/100/0", rgbDesktop: "204/102/0", rgbBroadcast: "20/102/1", hex: "CC6600" },
            { label: "PANTONE COOL GRAY 10C", swatch: "#999999", cmyk: "0/0/0/75", rgbDesktop: "102/102/102", rgbBroadcast: "102/102/102", hex: "999999" },
            { label: "PANTONE WARM GRAY 1C", swatch: "#ebebe3", cmyk: "0/0/3/8", rgbDesktop: "235/235/227", rgbBroadcast: "", hex: "EBEBE3" },
        ],
    },
    en: {
        pageTitle: "Corporate CI/BI"/* 260604 번역 */,
        ciIntro: {
            title: "CI Introduction"/* 260604 번역 */,
            lead: "'GS' is not an abbreviation of any particular word nor does it imply any specific meaning; 'GS' exists as itself."/* 260604 번역 */,
            symbolTitle: "GS Symbol",
            symbolDesc: "Symbolizing the dynamism of the energy business and the growth and vitality of the retail services business, the symbol captures a simple yet dynamic essence encompassing the blazing sun, the sky and sea, and the verdant earth",
            logoAlt: "GS CI Logo"/* 260604 번역 */,
            colors: [
                { className: "color_orange", name: "GS Orange", desc: "The energy and passion of the sun" },
                { className: "color_green", name: "GS Green", desc: "The earth, the environment, and infinite possibilities" },
                { className: "color_blue", name: "GS Blue", desc: "Symbolizing the sky and sea: transparency and creativity" },
            ],
        },
        ciBi: {
            title: "CI and BI",
            noticeTitle: "Notice",
            noticeLead: "Any unauthorized use of the above CI and BI will be subject to punishment pursuant to Article 93 of the Trademark Act.",
            noticeList: [
                "CI (Corporate Identity) / BI (Brand Identity)<br />(Reference) Article 93 of the Trademark Act – Any person who infringes upon a trademark right or exclusive license shall be subject to imprisonment of up to seven (7) years or a fine of up to KRW 100 million. (Amended February 3, 2001)",
            ],
            downloadLabel: "Download CI and BI (AI, JPG)",
        },
        ciBiLogos: [
            { src: imgCiBiLogo1, alt: "GS Retail Logo"/* 260604 번역 */ },
            { src: imgCiBiLogo2, alt: "GS25 Logo"/* 260604 번역 */ },
            { src: imgCiBiLogo3, alt: "GS SHOP Logo"/* 260604 번역 */ },
            { src: imgCiBiLogo4, alt: "GS THE FRESH Logo"/* 260604 번역 */ },
        ],
        colorReg: {
            title: "Color Guidelines",
            desc: "The primary communication approach uses the symbol's four-color gradient (Gradient Color) representation, with Jade Green used as the Accent Color for the GS Group.<br />The Accent Color may be applied to service spaces or other elements where Gradient Color representation is difficult.",
            tableCaption: "GS Color Guidelines Table"/* 260604 번역 */,
        },
        colorRegList: [
            {
                logo: require("@/assets/images/sub/gsrab/img_ci_logo_01.png"),
                logo_alt:"GS Retail",
                pantones: [
                    { name: "PANTONE <br />166 C", details: ["C 0", "M 65", "Y 100", "K 0"], bg: "#f47920" },
                    { name: "PANTONE <br />300 C", details: ["C 100", "M 50", "Y 0", "K 0"], bg: "#0072bc" },
                    { name: "PANTONE <br />7482 C", details: ["C 80", "M 0", "Y 75", "K 0"], bg: "#00b274" },
                    { name: "PANTONE <br />COOL Gray <br />10C", details: ["C 0", "M 0", "Y 0", "K 50"], bg: "#939598" },
                ],
            },
            {
                logo: require("@/assets/images/sub/gsrab/img_ci_logo_02.png"),
                logo_alt:"GS25",
                pantones: [
                    { name: "PANTONE <br />285 C", details: ["C 100", "M 39", "Y 0", "K 0"], bg: "#007ec6" },
                    { name: "PANTONE <br />311 C", details: ["C 63", "M 0", "Y 10", "K 0"], bg: "#40c4e0" },
                ],
            },
            {
                logo: require("@/assets/images/sub/gsrab/img_ci_logo_03.png"),
                logo_alt:"GS SHOP",
                pantones: [
                    { name: "PANTONE <br />2173 C", details: ["C 72", "M 27", "Y 0", "K 0"], bg: "#3698d4" },
                ],
            },
            {
                logo: require("@/assets/images/sub/gsrab/img_ci_logo_04.png"),
                logo_alt:"GS THE FRESH",
                pantones: [
                    { name: "PANTONE <br />7484 C", details: ["C 91", "M 14", "Y 78", "K 60"], bg: "#005133" },
                ],
            },
        ],
        colorSpecRows: [
            { label: "PANTONE 321C", swatch: "#009999", cmyk: "100/0/50/0", rgbDesktop: "0/153/153", rgbBroadcast: "0/153", hex: "009999" },
            { label: "PANTONE 300C", swatch: "#3366CC", cmyk: "100/50/0/0", rgbDesktop: "51/102/204", rgbBroadcast: "20/102/204", hex: "3366CC" },
            { label: "PANTONE 368C", swatch: "#99CC00", cmyk: "53/0/100/0", rgbDesktop: "153/204/0", rgbBroadcast: "600/200/10", hex: "99CC00" },
            { label: "PANTONE 173C", swatch: "#CC6600", cmyk: "0/75/100/0", rgbDesktop: "204/102/0", rgbBroadcast: "20/102/1", hex: "CC6600" },
            { label: "PANTONE COOL GRAY 10C", swatch: "#999999", cmyk: "0/0/0/75", rgbDesktop: "102/102/102", rgbBroadcast: "102/102/102", hex: "999999" },
            { label: "PANTONE WARM GRAY 1C", swatch: "#ebebe3", cmyk: "0/0/3/8", rgbDesktop: "235/235/227", rgbBroadcast: "", hex: "EBEBE3" },
        ],
    }
};

const t = computed(() => langData[props.lang] || langData.ko);
</script>

<style scoped>
    .main-container { width: 100%; position: relative; display: block; }
    .title_wrap { width: 100%; max-height: 480px; padding: 10.91% 0 11.25%; position: relative; display: block; overflow: hidden; text-align: center; background-color: transparent; }
    .title_wrap::before { width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 0; content: ""; background-image: url("@/assets/images/dummy/gsrab04_01.jpg"); background-repeat: no-repeat; background-position: 60% 85%; background-size: 150% auto; transform: scaleX(-1); transform-origin: center; }
    .title_wrap::after { width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 1; content: ""; background-color: rgba(0, 0, 0, 0.5); }
    .title_wrap > h2 { position: relative; z-index: 2; color: #fff; font-weight: 700; font-size: 7.2rem; line-height: 1.24; letter-spacing: -0.02em; }
    section + section { padding: 200px 0 0; }
    section { padding: 120px 0 0;display: flex; flex-direction: column; gap: 64px; }
    .header h3 { font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
    .header p { margin: 16px 0 0; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .sec_color_reg > .header p {  color: #161616; font-weight: 700; }
    .header.center h3, .header.center p { text-align: center; }
    .cont_box { width: 100%; padding: 56px 64px; border: 1px solid #e5e5e9; border-radius: 12px; }
    .cont_box_row { width: 100%; display: flex; justify-content: space-between; align-items: flex-start; gap: 24px; }
    .cont_box_row > .sub_title { flex-shrink: 0; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; white-space: nowrap; }
    .cont_box_row > .desc {min-width: 0; color: #67676f; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em;}
    .cont_box_row + .gray_box { margin-top: 40px; }
    .gray_box { width: 100%; padding: 70px 0; display: flex; justify-content: center; align-items: center; background-color: #f8f8f8; border-radius: 12px; }
    .gray_box > .img_wrap { height: 120px; }
    .gray_box > .img_wrap > img { width: 100%; display: block; }
    .color_cards { width: 100%; margin: 24px 0 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px;  }
    .color_cards > li { position: relative; padding: 18px 0 0; }
    .color_cards > li::before { width: 100%; height: 8px; position: absolute; left: 0; top: 0; z-index: 0; content: ""; border-radius: 10px; }
    .color_cards > li.color_orange::before { background-color: #ff7630; }
    .color_cards > li.color_green::before { background-color: #109e69; }
    .color_cards > li.color_blue::before { background-color: #0d62c2; }
    .color_cards > li.color_orange > strong { color: #ff7630; }
    .color_cards > li.color_green > strong { color: #109e69; }
    .color_cards > li.color_blue > strong { color: #0d62c2; }
    .color_cards > li > strong { font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
    .color_cards > li > p { margin: 4px 0 0; color: #7c7c86; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .ci_bi_cards { width: 100%; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
    .ci_bi_card { min-width: 0; height: 230px; padding: 0 clamp(16px, 3.6vw, 36px); display: flex; justify-content: center; align-items: center; overflow: hidden; border: 1px solid #e5e5e9; border-radius: 12px; box-sizing: border-box; }
    .ci_bi_card > .img_wrap { width: 100%; max-width: 100%; min-width: 0; height: 100%; min-height: 0; margin: 0; display: flex; justify-content: center; align-items: center; }
    .ci_bi_card > .img_wrap img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; object-position: center; display: block; }
    .button_wrap { width: 100%; display: flex; justify-content: center; }
    .notice_box { width: 100%; margin-top:-24px; padding: 32px; background-color: #f8f8f8; border-radius: 12px;}
    .notice_head { margin: 0 0 24px; display: flex; align-items: center; gap: 8px; }
    .notice_box > p { margin: 0 0 8px; color: #67676f; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; }
    .notice_head > .notice_ico { width: 24px; height: 24px; background:url('@/assets/images/common/icon_set_24.png') -496px -56px no-repeat; display: inline-flex; align-items: center; justify-content: center;}
    .notice_head > h4 { font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .notice_list { display: flex; flex-direction: column; gap: 8px;  }
    .notice_list > li { position: relative; padding-left: 12px; color: #67676f; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; }
    .notice_list > li::before { width: 4px; height: 4px; position: absolute; left: 0; top: 11px; content: ""; border-radius: 50%; background-color: #67676f; }
    .sec_color_reg .color_reg_list_wrap { width: 100%;}
    .sec_color_reg .reg_list { width: 100%; display: flex; flex-direction: column; gap: 24px;  }
    .sec_color_reg .reg_card { width: 100%; max-width: 1420px; margin: 0 auto; padding: 56px 64px; display: flex; flex-wrap: nowrap; gap: 20px 32px; align-items: flex-start; justify-content: space-between; border: 1px solid #e5e5e9; border-radius: 12px; background-color: #fff; }
    .sec_color_reg .reg_card > header { flex: 0 0 clamp(112px, 14vw, 220px); min-width: 0; padding: 0 0 40px; }
    .sec_color_reg .reg_card > header > h4 { font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
    .sec_color_reg .reg_card > .color_list { flex: 1 1 auto; min-width: 0; max-width: 876px; display: grid; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); gap: 10px; overflow-x: visible; }
    .sec_color_reg .reg_card > .color_list > li { min-height: 180px; padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 26px; overflow: hidden; border-radius: 10px; }
    .sec_color_reg .reg_list > li:first-child .reg_card > .color_list > li { min-height: 240px; }
    .sec_color_reg .reg_card > .color_list > li > strong { flex: 1 1 0; min-height: 0; display: block; color: #fff; font-size: 2.4rem; font-weight: 600; line-height: 1.35; letter-spacing: -0.01em; }
    .sec_color_reg .reg_card .color_detail { width: 100%; display: flex; flex-wrap: wrap; align-items: flex-start; gap: 4px 10px;  }
    .sec_color_reg .reg_list > li:first-child .reg_card .color_detail > li { width: 48px; flex-shrink: 0; }
    .sec_color_reg .reg_list > li:not(:first-child) .reg_card .color_detail { flex-wrap: nowrap; gap: 10px; }
    .sec_color_reg .reg_card .color_detail > li > span { color: #e5e5e9; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
    .table_scroll { width: 100%; overflow-x: auto; }
    .spec_table { width: 100%; max-width: 1420px; margin: 0 auto; border-collapse: collapse; border-spacing: 0; table-layout: fixed; }
    .spec_table col.col_gs_color { width: 320px; }
    .spec_table thead th { height: 82px; position: relative; padding: 27px 20px; vertical-align: middle; font-size: 1.8rem; font-weight: 700; line-height: 1.5; letter-spacing: 0; background-color: #f8f8f8; border-bottom: 1px solid #e5e5e9; }
    .spec_table thead th::before { width: 100%; height: 1px; position: absolute; left: 0; top: 0; content: ""; background-color: #161616; }
    .spec_table thead th:first-child { text-align: left; }
    .spec_table thead th:not(:first-child) { text-align: center; }
    .spec_table tbody th, .spec_table tbody td { min-height: 82px; padding: 27px 20px; vertical-align: middle; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; border-bottom: 1px solid #d7d7df; }
    .spec_table tbody th { text-align: left; font-weight: 400; }
    .spec_table tbody th[scope="row"] .spec_cell_lead { display: flex; align-items: center; gap: 12px; }
    .spec_table tbody th[scope="row"] .spec_swatch { width: 24px; height: 24px; flex-shrink: 0; border-radius: 999px; }
    .spec_table tbody th[scope="row"] .spec_cell_lead > span:last-child { white-space: nowrap; }
    .spec_table tbody td { text-align: center; word-break: keep-all; }
    .sr_only { width: 1px; height: 1px; margin: -1px; position: absolute; overflow: hidden; border: 0; clip: rect(0, 0, 0, 0); }
    [class*="btn_icon"][class*="after"]::after {background:url('@/assets/images/common/down_wh.png');}
    @media screen and (max-width: 1024px) {
        .sec_color_reg .reg_card { flex-direction: column; flex-wrap: nowrap; gap: 0; padding: 48px 40px; align-items: stretch; }
        .sec_color_reg .reg_card > header { flex: none; max-width: none; width: 100%; padding: 0 0 28px; }
        .sec_color_reg .reg_card > .color_list { flex: none; max-width: none; width: 100%; overflow-x: visible; }
    }
    @media screen and (max-width: 768px) {
        .title_wrap { display: none; }
        .visual_sub { font-size: 2rem; }
        section{padding: 60px 0 0; gap: 60px;}  /* 26.06.26 edit 이소라 */
        section + section { padding: 60px 0 0; }
        .header h3 { font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; text-align: left; }
        .header p { margin: 12px 0 0; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
        .header.center h3, .header.center p { text-align: left; }
        .sec_ci_intro { padding-top: 120px; }  /* 26.06.26 edit 이소라 */
        .sec_color_reg > .header p {margin-bottom:64px; font-weight:400;}
        .cont_box { padding: 36px 20px; }
        .cont_box_row { display: flex; flex-direction: column; gap: 12px; }
        .cont_box_row > .sub_title { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
        .cont_box_row > .desc { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; text-align:left;}
        .gray_box { min-height: 260px; padding: 70px 20px; }
        .gray_box > .img_wrap { padding: 16px 32px; }
        .color_cards { margin-top: 24px; grid-template-columns: minmax(0, 1fr); gap: 0; }
        .color_cards > li + li { margin-top: 10px; }
        .ci_bi_cards { grid-template-columns: minmax(0, 1fr); }
        .ci_bi_card { width: 100%; height: clamp(180px, 48vw, 230px); padding: 0 20px; }
        .sec_ci_bi { padding-bottom: 100px; }
        .notice_box { padding: 32px 20px; }
        .notice_box > p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
        .notice_head > h4 { font-size: 2rem; }
        .notice_list { margin-top: 8px; }
        .notice_list > li { padding-left: 14px; font-size: 1.4rem; line-height: 1.4; }
        .notice_list > li::before { top: 8px; }
        .sec_color_reg .color_reg_list_wrap { padding: 0 0 40px; }
        .sec_color_reg .reg_card { max-width: 100%; margin: 0; padding:0 20px 36px; flex-direction: column; align-items: stretch; }
        .sec_color_reg .reg_card > header { width: 100%; padding: 36px 0 20px; }
        .sec_color_reg .reg_card > header > h4 { margin: 0; font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; } /* 260624 edit 이소라 */
        .sec_color_reg .reg_card > .color_list { width: 100%; grid-template-columns: minmax(0, 1fr); }
        .sec_color_reg .reg_card > .color_list > li { width: 100%; min-height: 180px; height: auto; padding: 24px; gap: 26px; }
        .sec_color_reg .reg_list > li:first-child .reg_card > .color_list > li { min-height: 180px; }
        .sec_color_reg .reg_card > .color_list > li > strong { margin: 0 0 20px; font-size: 2.4rem; line-height: 1.35; }
        .sec_color_reg .reg_list > li:first-child .reg_card .color_detail > li { width: 48px; min-width: 0; flex-shrink: 0; }
        .sec_color_reg .reg_list > li:not(:first-child) .reg_card .color_detail { flex-wrap: wrap; gap: 4px 10px; }
        .sec_color_reg .reg_card .color_detail { gap: 4px 10px; }
        .table_scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .spec_table { width: 1147px; min-width: 1147px; max-width: none; margin: 0; }
        .spec_table thead th { height: auto; min-height: 82px; }
        .spec_table tbody th[scope="row"] .spec_cell_lead > span:last-child { white-space: normal; }
        .spec_table tbody th[scope="row"] .spec_cell_lead { align-items: flex-start; }
        section.sec_color_reg { gap: 0; }
    }
</style>