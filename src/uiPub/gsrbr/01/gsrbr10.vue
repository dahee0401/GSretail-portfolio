<template>
    <div class="gsrbr10" v-if="t">
        <section class="visual_section top_visual" ref="visualSection">
            <div class="visual_img" ref="visualImg">
                <img :src="t.Visual.img" :alt="t.Visual.alt" />
            </div>
            <div class="visual_content">
                <div class="text_box cont_inner">
                    <span>{{ t.Visual.subContent_1 }}</span>
                    <span>{{ t.Visual.subContent_2 }}</span>
                    <span>{{ t.Visual.subContent_3 }}</span>
                </div>
            </div>
        </section>

        <section class="body_wrap">
            <div class="cont_area">
                <div class="cont_inner">
                    <h3 v-html="t.SubTitle"></h3>
                    <ul>
                        <li>
                            <p>{{ t.SubContent_1 }}</p>
                            <p>{{ t.SubContent_2 }}</p>
                        </li>
                        <li>
                            <div class="btn_group">
                                <a :href="t.HopageLink" class="btn_website" target="_blank">{{ t.HopageText }}</a>
                                <a href="https://www.youtube.com/watch?v=YeVhN9bCeP4&feature=youtu.be" class="btn_sns btn_sns_yt" target="_blank"></a>
                            </div>
                        </li>
                    </ul>
                    <div class="bi_box">
                        <div class="bi_section">
                            <h4>{{ t.Bi.txt }}</h4>
                            <span><img :src="isMobile ? t.Bi.imgMo : t.Bi.img" :alt="t.Bi.alt" /></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cont_inner">
                <div class="bottom_btns">
                    <button class="btn_back" @click="handleBack">{{ t.ListBack }}</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "gsrbr10",
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            isMobile: false,
            langData: {
                ko: {
                    Visual: { 
                        img: require("@/assets/images/dummy/gsrbr10.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr10_mo.png"),
                        alt: "GS THE FRESH 메인 비주얼",
                        subContent_1: "언제 어디서나",
                        subContent_2: "산책하며 돈 버는 즐거움",
                        subContent_3: "우리동네 딜리버리",
                    },
                    SubTitle: `브랜드소개`,
                    SubContent_1: `우리동네 GS25, GS THE FRESH의 상품과 식품, 맛집 배달까지`,
                    SubContent_2: `별도의 장비 없이 성인이라면 누구나 손쉽게 배달 가능한 서비스입니다.`,
                    HopageLink: `http://woodel.co.kr/#page1`,
                    HopageText: `홈페이지`,
                    ListBack:`목록으로 돌아가기`,
                    Bi: {
                        txt: `BI 로고`,
                        img: require("@/assets/images/dummy/gsrbr10_bi.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr10_bi_mo.png"),
                        alt: "Real price BI 이미지"
                    },
                },
                en: {
                    Visual: { 
                        img: require("@/assets/images/dummy/gsrbr10.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr10_mo.png"),
                        alt: "GS THE FRESH Main Visual"/* 260604 번역 */,
                        subContent_1: "While taking a walk"/* 260604 번역 */,
                        subContent_2: "The joy of making money"/* 260604 번역 */,
                        subContent_3: "Our Neighborhood Delivery"/* 260604 번역 */,
                    },
                    SubTitle: `About the Brand`,
                    SubContent_1: `From the products and food of your neighborhood GS25 and GS THE FRESH to restaurant delivery`/* 260604 번역 */,
                    SubContent_2: `It is a service that any adult can easily deliver with no special equipment.`/* 260604 번역 */,
                    HopageLink: `http://woodel.co.kr/#page1`,
                    HopageText: `Homepage`,
                    ListBack:`Back to Brand List`,
                    Bi: {
                     
                    },
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
.gsrbr10 { width: 100%; position: relative; display: block; }
:deep(.cont_inner) h3 br {display:none;}

.visual_section { width:100%; position: relative; overflow: hidden; }
.visual_img { width: 100%; height: auto; position: relative;}
.visual_img::after{content:"";width: 100%;height: 100%;background:rgba(0,0,0,0.3);position: absolute;top: 0;left: 0;z-index: 1;}
.visual_img img { width: 100%; display: block; }
.visual_content { position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: 100%; z-index: 2; }
.text_box span { color:#fff; font-size:72px; font-weight:700; display: block; position: relative;z-index: 2; }

.body_wrap .cont_area {padding:10.41%; background:#F8F8F8;}
.body_wrap .cont_area .cont_inner h3 {margin-bottom:16px; color:#161616; font-size:48px; font-weight:700;}
.body_wrap .cont_area .cont_inner ul {margin-bottom:64px; display:flex; justify-content:space-between; align-items:flex-end;}
.body_wrap .cont_area .cont_inner ul li p {color:#161616; font-size:24px; font-weight:600; line-height:1.;}
.body_wrap .cont_area .cont_inner ul li a {color:#161616; font-size:18px; display:flex; align-items:center;}

.btn_group {display:flex; align-items:center; gap:24px;}

.body_wrap .cont_area .cont_inner .bi_box { padding: 56px 64px; background: #fff; border-radius: 12px; }
.bi_box > .bi_section{width: 100%;}
.bi_box > .bi_section > h4 { margin-bottom: 40px; font-size: 3.2rem; font-weight: 700; }
.bi_box > .bi_section > span > img { width: auto; height: 100%; margin: 0 auto; display: block; object-fit: cover; }
@media screen and (max-width: 1160px) {
    .body_wrap .cont_area .cont_inner ul {flex-direction:column; align-items:flex-start; gap:16px}
}
@media screen and (max-width: 1024px) {}
@media screen and (max-width: 768px) {
    .visual_img{height:100vh;}
    .visual_img img{height:100%; object-fit:cover; object-position: 25% center; transform-origin:center;}
    .text_box span {color:#fff; font-size:32px; font-weight:700; text-align:center; display: block;  }
    .body_wrap .cont_area {padding:140px 0px;}
    .body_wrap .cont_area .cont_inner ul {margin-bottom:40px;}
    .body_wrap .cont_area .cont_inner h3 {margin-bottom:16px; color:#161616; font-size:24px; font-weight:700;}
    .body_wrap .cont_area .cont_inner ul {display:flex; justify-content:space-between; align-items:flex-start;}
    .body_wrap .cont_area .cont_inner ul li p {color:#161616; font-size:16px; font-weight:400; line-height:1.5;}
    .body_wrap .cont_area .cont_inner ul li a{font-size: 1.4rem; line-height: 1.4;}
    .body_wrap .cont_area .cont_inner .bi_box { padding: 32px; }
    .bi_box > .bi_section > h4 { margin-bottom: 24px; font-size: 1.8rem; }
    .body_wrap .cont_area .cont_inner .bi_box > .bi_section > span > img { width: auto; height: 100%; margin: 0 auto; display: block; object-fit: cover; }
    .btn_list_back span {font-size:16px;}
    .btn_big.border {margin-top:80px; margin-bottom:80px; display:flex; justify-content: center;}
    :deep(.cont_inner) h3 br {display:block;}
}
</style>