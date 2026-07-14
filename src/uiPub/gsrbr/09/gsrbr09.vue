<template>
    <div class="gsrbr09" v-if="t">
        <section class="visual_section top_visual" ref="visualSection">
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

        <section class="body_wrap">
            <div class="cont_area">
                <div class="cont_inner">
                    <h3>{{ t.SubTitle }}</h3>
                    <ul>
                        <li>
                            <p v-html="t.SubContent_1"></p>
                            <!-- <p v-html="t.SubContent_2"></p>
                            <p>{{ t.SubContent_3 }}</p> -->
                        </li>
                        <li class="bi_section">
                            <h4 class="">{{ t.Bi.txt }}</h4>
                            <span><img :src="isMobile ? t.Bi.imgMo : t.Bi.img" :alt="t.Bi.alt"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="cont_inner desc_section">
                <h3 v-html="t.desc.title"></h3>
                <p>
                    <span>{{ t.desc.text_1 }}</span>
                    <span>{{ t.desc.text_2 }}</span>
                </p>
                <ul>
                    <li><img :src="t.desc.img_1" alt=""></li>
                    <li><img :src="t.desc.img_2" alt=""></li>
                </ul>
            </div>
            <div class="cont_inner">
                <!-- 26.05.11 Edit 이종환 : 하단 목록 버튼 통일 -->
                <div class="bottom_btns">
                    <button class="btn_back" @click="handleBack">{{ t.ListBack }}</button>
                </div>
                <!-- //26.05.11 Edit 이종환 : 하단 목록 버튼 통일 -->
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "gsrbr09",
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            isMobile: false,
            langData: {
                ko: {
                    Visual: { // 대문자 유지
                        img: require("@/assets/images/dummy/gsrbr09.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr09_mo.png"),
                        alt: "GS THE FRESH 메인 비주얼",
                        subContent_1: "가격 그 이상의 가치,",
                        subContent_2: "리얼 프라이스",
                    },
                    SubTitle: `브랜드 소개`,
                    SubContent_1: `리얼프라이스는 우수 제조사 발굴 역량과 상품 개발 노하우를 바탕으로<br/>검증된 품질의 상품을 합리적인 가격으로 선보이는 GS리테일만의 PB 브랜드입니다.`,
                    Bi: {
                        txt: `BI 로고`,
                        img: require("@/assets/images/dummy/gsrbr09_real_bi.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr09_real_bi_mo.png"),
                        alt: "Real price BI 이미지"
                    },
                    desc: {
                        title: `가격 이상의 가치,<br/> 리얼프라이스`,
                        text_1: `‘가격 이상의 가치, 리얼프라이스’라는 브랜드 슬로건을 가지고 엄격한 기준으로 발굴한 높은 품질의 상품에 개발 노하우를 담아 생선하고 있습니다.`,
                        text_2: `이제는 리얼프라이스로 똑똑한 소비를 시작하세요.`,
                        img_1: require("@/assets/images/dummy/gsrbr09_1.png"),
                        img_2: require("@/assets/images/dummy/gsrbr09_2.png")
                    },
                    ListBack:`목록으로 돌아가기`
                },
                en: {
                    Visual: { // 대문자 유지
                        img: require("@/assets/images/dummy/gsrbr09.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr09_mo.png"),
                        alt: "GS THE FRESH Main Visual"/* 260604 번역 */,
                        subContent_1: "Value beyond price,"/* 260604 번역 */,
                        subContent_2: "REAL Price",
                    },
                    SubTitle: `About the Brand`,
                    SubContent_1: `REAL Price is GS Retail's exclusive private-brand label that leverages its expertise in sourcing top-quality manufacturers and accumulated product development know-how to deliver products of proven quality at reasonable prices.`,
                    Bi: {
                        txt: `BI Logo`/* 260604 번역 */,
                        img: require("@/assets/images/dummy/gsrbr09_real_bi.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr09_real_bi_mo.png"),
                        alt: "REAL price BI Image"/* 260604 번역 */
                    },
                    desc: {
                        title: `Value Beyond the Price: REAL Price`,
                        text_1: `Under the brand slogan 'Value Beyond Price, REAL price,' we produce high-quality products discovered by strict standards, infused with our development expertise.`/* 260604 번역 */,
                        text_2: `Now, start shopping smart with REAL price.`/* 260604 번역 */,
                        img_1: require("@/assets/images/dummy/gsrbr09_1.png"),
                        img_2: require("@/assets/images/dummy/gsrbr09_2.png")
                    },
                    ListBack:`Back to Brand List`
                }
            }
        };
    },
    computed: {
        t() {
            // 안전하게 데이터 반환
            return this.langData[this.lang] || this.langData.ko;
        }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        checkMobile() {
            this.isMobile = window.innerWidth < 768;
        },
        handleBack() {
            this.$router.back();
        }
    },
};
</script>

<style scoped>
.gsrbr09 { width: 100%; position: relative; display: block; }

/* Visual Section */
.visual_section { width:100%; position: relative; overflow: hidden; }
.visual_img { width: 100%; height: auto; }
.visual_img img {width: 100%; display: block; }
.visual_content {width: 100%; position: absolute; top: 50%; left: 0; transform: translateY(-50%); z-index: 2; }
.text_box span {margin-bottom:10px; color:#fff; font-size:72px; font-weight:700; display: block;  }

/* body_wrap Section */
.body_wrap .cont_area {padding:10.41% 0; background:#F8F8F8;}
.body_wrap .cont_inner h3 {margin-bottom:16px; color:#161616; font-size:48px; font-weight:700;}
.body_wrap .cont_area .cont_inner ul li p {color:#161616; font-size:24px; font-weight:600;}
.bi_section {width:100%; margin-top:60px; padding:50px; background:#fff; border-radius:12px;}
.bi_section h4 {margin-bottom:40px;}
.bi_section span {widows:100%; display:block;}
.bi_section span img {width:100%; display:block; object-fit:cover;}
.body_wrap .cont_inner:nth-of-type(2) {padding-top:200px;}
.body_wrap .cont_inner:nth-of-type(2) p {margin-bottom:60px; display:flex; flex-direction:column;}
.body_wrap .cont_inner:nth-of-type(2) p span {font-size:24px; font-weight:700;}
.body_wrap .cont_inner:nth-of-type(2) ul {width:100%; display:flex; gap:20px;}
.body_wrap .cont_inner:nth-of-type(2) ul li img {width:100%; display:block; object-fit:cover;}
:deep(.desc_section h3 br) {display:none;}

/* Bottom Buttons */
.btn_list_back {background: transparent; padding: 0; border: 0; cursor: pointer; }
.btn_list_back span {color: #161616; font-size: 20px; display: flex; align-items: center; gap: 12px; }
.btn_list_back span::before {width: 16px; height: 16px; background-color: red; content: ''; display: inline-block; }
.btn_mid.border {display:none;}
.bottom_btns + .btn_big.border {display:none;}
@media screen and (max-width: 1024px) {
    .body_wrap .cont_area {padding:10.41% 20px;}
    .body_wrap .cont_area .cont_inner ul {flex-direction:column; align-items:flex-start; gap:16px}
    .desc_section p span br {display: none !important;}
    .body_wrap .cont_inner:nth-of-type(2) ul {width:100%; display:flex; flex-direction:column; gap:20px}
    .body_wrap .cont_inner:nth-of-type(2) ul li {width:100%;}
    .body_wrap .cont_inner:nth-of-type(2) ul li img {width:100%; display:block;}
    .bi_section {padding:30px;}
}
@media screen and (max-width: 768px) {
    .visual_img{height:100vh;}
    .visual_img img{height:100%; object-position: center; }
    .text_box span {margin-bottom:10px; color:#fff; font-size:28px; font-weight:700; text-align:center; display: block;  }
    .body_wrap .cont_area {padding:60px 0px;}
    .bi_section {padding:30px;}
    :deep(.desc_section h3 br) {display:block !important;}
    .body_wrap .cont_inner h3 {margin-bottom:16px; color:#161616; font-size:24px; font-weight:700;}
    .body_wrap .cont_area .cont_inner ul {display:flex; justify-content:space-between; align-items:flex-start;}
    .body_wrap .cont_area .cont_inner ul li p {color:#161616; font-size:18px; font-weight:400; line-height:1.5;}
    .body_wrap .cont_area .cont_inner ul li p:first-of-type {margin-bottom:20px;}
    .body_wrap .cont_inner:nth-of-type(2) {padding-top:80px; padding-bottom:80px;}
    .desc_section br {display:block;}
    .desc_section p span {font-size:18px !important; font-weight:400 !important;}
    .desc_section p span br { display: none !important;}
    .btn_list_back span {font-size:16px;}
    .bottom_btns {display:none;}
    .bottom_btns + .btn_big.border {margin-top:0px; margin-bottom:80px; display:flex; justify-content: center;}
}
</style>