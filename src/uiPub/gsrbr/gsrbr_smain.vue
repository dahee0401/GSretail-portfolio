<template>
    <div class="sub_main" v-if="t">

        <div class="title_wrap">
            <h2>{{ t.h2 }}</h2>
            <p class="explain">{{ t.h2_explain }}</p>
        </div>

        <div class="cont_inner">

            <div class="brand_list">
                <!-- gs25 -->
                <div class="item" v-for="item in t.brand" :key="item">
                    <a :href="item.link">
                        <span class="thumb">
                            <em><img :src="item.img" alt="" /></em>
                        </span>
                        <!-- name -->
                        <p>
                            <span>{{ item.explain }}</span>
                            <strong>{{ item.name }}</strong>
                        </p>
                        <!-- //name -->
                    </a>
                </div>
                <!-- //gs25 -->
            </div>

        </div>
        
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
                    h2: "Our Brands",
                    h2_explain: "GS리테일의 다양한 브랜드를 만나보세요",
                    brand: [
                        {name:"GS25", explain:"대한민국 No.1 편의점", link:"/gsrbr010101", img: require("@/assets/images/sub/gsrbr/img_main_thumb_01.png")},//, img: require("@/assets/images/dummy/main_visual_01.png"),}
                        {name:"GS THE FRESH", explain:"신선한 행복을 주는 브랜드", link:"/gsrbr020101", img: require("@/assets/images/sub/gsrbr/img_main_thumb_02.png")},
                        {name:"GS SHOP", explain:"홈쇼핑 & 이커머스", link:"/gsrbr0301", img: require("@/assets/images/sub/gsrbr/img_main_thumb_03.png")},
                        {name:"우리동네GS", explain:"GS리테일 통합 앱", link:"/gsrbr04", img: require("@/assets/images/sub/gsrbr/img_main_thumb_04.png")},
                        {name:"우딜", explain:"소셜커머스 플랫폼", link:"/gsrbr10", img: require("@/assets/images/sub/gsrbr/img_main_thumb_05.png")},
                        {name:"GS Pay", explain:"간편 결제 서비스", link:"/gsrbr05", img: require("@/assets/images/sub/gsrbr/img_main_thumb_06.png")},
                        {name:"GS ALL", explain:"통합 멤버십 프로그램", link:"/gsrbr06", img: require("@/assets/images/sub/gsrbr/img_main_thumb_07.png")},
                        {name:"POP", explain:"생활용품 브랜드", link:"/gsrbr07", img: require("@/assets/images/sub/gsrbr/img_main_thumb_08.png")},
                        {name:"유어스", explain:"생활 편의 서비스", link:"/gsrbr08", img: require("@/assets/images/sub/gsrbr/img_main_thumb_09.png")},
                        {name:"리얼프라이스", explain:"합리적인 가격의 PB 브랜드", link:"/gsrbr09", img: require("@/assets/images/sub/gsrbr/img_main_thumb_10.png")},
                        {name:"개발/임대 사업", explain:"부동산 개발 및 임대", link:"/gsrbr1101", img: require("@/assets/images/sub/gsrbr/img_main_thumb_11.png")}
                    ]
                },
                en: {
                    h2: "Our Brands",
                    h2_explain: "Bringing everyday life closer, making every moment more meaningful. Discover GS Retail's diverse brands.",
                    brand: [
                        {name:"GS25", explain:"No. 1 Convenience Store in Korea", link:"/gsrbr010101", img: require("@/assets/images/sub/gsrbr/img_main_thumb_01.png")},//, img: require("@/assets/images/dummy/main_visual_01.png"),}
                        {name:"GS THE FRESH", explain:"A brand that brings freshness and happiness", link:"/gsrbr020101", img: require("@/assets/images/sub/gsrbr/img_main_thumb_02.png")},
                        {name:"GS SHOP", explain:"Home Shopping & E-Commerce", link:"/gsrbr0301", img: require("@/assets/images/sub/gsrbr/img_main_thumb_03.png")},
                        {name:"Our Neighborhood GS", explain:"GS Retail All-in-One App", link:"/gsrbr04", img: require("@/assets/images/sub/gsrbr/img_main_thumb_04.png")},
                        {name:"Our Neighborhood Delivery", explain:"Social Commerce Platform", link:"/gsrbr10", img: require("@/assets/images/sub/gsrbr/img_main_thumb_05.png")},
                        {name:"GS Pay", explain:"Easy Payment Service", link:"/gsrbr05", img: require("@/assets/images/sub/gsrbr/img_main_thumb_06.png")},
                        {name:"GS ALL", explain:"Integrated Membership Program", link:"/gsrbr06", img: require("@/assets/images/sub/gsrbr/img_main_thumb_07.png")},
                        {name:"POP", explain:"Daily Essentials Brand", link:"/gsrbr07", img: require("@/assets/images/sub/gsrbr/img_main_thumb_08.png")},
                        {name:"YOUUS", explain:"Daily Life Convenience Service", link:"/gsrbr08", img: require("@/assets/images/sub/gsrbr/img_main_thumb_09.png")},
                        {name:"REAL Price", explain:"An affordable PB brand", link:"/gsrbr09", img: require("@/assets/images/sub/gsrbr/img_main_thumb_10.png")},
                        {name:"Development/Leasing Business", explain:"Real estate development and leasing", link:"/gsrbr1101", img: require("@/assets/images/sub/gsrbr/img_main_thumb_11.png")}
                    ]
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
        const header = document.getElementById("header");

        header.classList.add("head_black"); // 배경 흰색일 경우 head_black 클래스 추가
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
        },
    },
};
</script>

<style scoped>
.sub_main .title_wrap {padding-top:140px; padding-bottom:100px; flex-direction:column;}
.sub_main .title_wrap h2 {font-size:7.2rem; letter-spacing:-0.02em; line-height:124%;}
.sub_main .title_wrap .explain {margin-top:8px; font-size:2.4rem; letter-spacing:-0.01em; line-height:150%; text-align:center;}

.brand_list {display:flex; flex-wrap:wrap; gap:60px 10px;}
.brand_list .item {width:calc(33.3333% - 10px);}
.brand_list a {position:relative; display:block;}
.brand_list .thumb {border-radius:12px; display:block;}/* 높이는 샘플 */
.brand_list a p {width:100%; padding:0 40px; position:absolute; bottom:32px; left:0; display:flex; flex-direction:column; gap:4px;}
.brand_list a p * {color:#fff;}
.brand_list a p span {font-size:1.8rem; line-height:140%;}
.brand_list a p strong {font-size:3.2rem; letter-spacing:-0.01em; line-height:130%;}

@media screen and (max-width: 1024px) {
    .brand_list .item {width:calc(50% - 10px);}
    .brand_list a p {padding:0 24px; bottom:24px;}
    .brand_list a p strong {font-size:2.4rem;}
}
@media screen and (max-width: 767px) {    
    .sub_main .title_wrap {padding-top:0; padding-bottom:60px;}
    .sub_main .title_wrap h2 {font-size:4.2rem;}
    .sub_main .title_wrap .explain {font-size:1.8rem;}

    .brand_list .item {width:100%;}
    .brand_list a p {padding:0 20px; bottom:20px;}
    .brand_list a p strong {font-size:2rem;}
}
</style>