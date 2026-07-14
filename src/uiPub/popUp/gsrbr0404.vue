<template>
    <div class="modal_cont gsrbr0601">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <section class="gs25_event">
                <span><img :src="isMobile ? t.sub1.imgMo : t.sub1.img" :alt="t.sub1.alt"></span>
                <h4>{{ t.sub_Title1 }}</h4>
                <span>{{t.sub_desc1 }}</span>
                <p v-html="t.sub_detail_1"></p>
                <ul class="event_icon_list">
                    <li v-for="(img, idx) in t.iconsrc" :key="idx">
                        <p class="img_box"><img :src="img" :alt="t.icontxt[idx]"></p>
                        <em>{{ t.icontxt[idx] }}</em>
                    </li>
                </ul>
                <!-- 26.06.30 add 정다희 : 재추가-->
                <div class="notice_bar">
                    <p>{{ t.app_desc }}</p>
                </div>
                <!-- 26.06.30 add 정다희 : 재추가-->
                <!-- <i>{{t.app_desc}}</i> -->
            </section>
            <section class="gsfresh_event">
                <span><img :src="isMobile ? t.sub2.imgMo : t.sub2.img" :alt="t.sub2.alt"></span>
                <h4>{{ t.sub_title2 }}</h4>
                <span>{{ t.sub_desc2 }}</span>
                <p v-html="t.sub_detail_2"></p>
            </section>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "gsrbr0404",
    components: {
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "행사/이벤트",
                    sub_Title1: "GS25",
                    sub_desc1:"'우리동네GS'에서만 만나볼 수 있는 파격 혜택!",
                    sub_detail_1:`<em>1+1, 2+1, 덤증정, POP할인 상품들을 우리동네GS앱에서도 구매하실 수 있습니다.<br />우리동네GS 앱에서 <span>GS25 이달의 행사</span>와 온라인앱 전용 행사 상품들도 빨 빠르게 확인하세요!</em>`, /*26.06.26 edit 정다희 : 텍스트 수정*/ 
                    sub1 : {
                        img: require("@/assets/images/dummy/gsrbr0404_1.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr0404_1_mo.png"),
                        alt:`GS25 우리동네GS'에서만 만나볼 수 있는 파격 혜택!`
                    },
                    sub2 : {
                        img: require("@/assets/images/sub/gsrbr04/gsrbr0404_2.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr0404_2_mo.png"),
                        alt:`GS THE FRESH 매주 달라지는 행사 미리보기`
                    },
                    iconsrc:[
                        require("@/assets/images/dummy/gsrbr0404_icon_1.png"),
                        require("@/assets/images/dummy/gsrbr0404_icon_2.png"),
                        require("@/assets/images/dummy/gsrbr0404_icon_3.png"),
                        require("@/assets/images/dummy/gsrbr0404_icon_4.png"),
                    ],
                    icontxt: [`1+1`, `2+1`, `덤증정`, `가격할인`],
                    sub_title2: "GS THE FRESH",
                    sub_desc2:"매주 달라지는 행사 미리보기",
                    sub_detail_2:`<em>우리동네GS 앱에서 단골 매장의 <span>주간 행사 상품과 행사전단</span>을 편리하게 확인할 수 있습니다.</em>`, /*26.06.26 edit 정다희 : 텍스트 수정*/
                    app_desc:`매장 방문 전, 우리동네GS 앱에서 가까운 편의점의 행사 상품/재고를 미리 확인해 보세요!` /*26.06.30 add 정다희 : 텍스트 재추가 및 내용수정*/
                },
                en: {
                    closeLabel: "Close",
                    MainTitle: "Events & Promotions",
                    sub_Title1: "GS25",
                    sub_desc1:"Exclusive Deals Available Only on Our Neighborhood GS!",
                    sub_detail_1:`ou can also purchase 1+1, 2+1, bonus gift, and POP discount items on the Woori Dongne GS app.<br />Check out <span>GS25 Monthly Promotions</span> and online app-exclusive sale items quickly on the Woori Dongne GS app!`,
                    sub1 : {
                        img: require("@/assets/images/dummy/gsrbr0404_1.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr0404_1_mo.png"),
                        alt:`Exclusive benefits available only at GS25 Our Neighborhood GS!`/* 260604 번역 */
                    },
                    sub2 : {
                        img: require("@/assets/images/sub/gsrbr04/gsrbr0404_2.png"),
                        imgMo: require("@/assets/images/dummy/gsrbr0404_2_mo.png"),
                        alt:`Preview GS THE FRESH's weekly changing promotions`/* 260604 번역 */
                    },
                    iconsrc:[
                        require("@/assets/images/dummy/gsrbr0404_icon_1.png"),
                        require("@/assets/images/dummy/gsrbr0404_icon_2.png"),
                        require("@/assets/images/dummy/gsrbr0404_icon_3.png"),
                        require("@/assets/images/dummy/gsrbr0404_icon_4.png"),
                    ],
                    icontxt: [`1+1`, `2+1`, `Bonus Gift`, `Price Discount`],
                    sub_title2: "GS THE FRESH",
                    sub_desc2:"Weekly Promotions Preview",
                    sub_detail_2:`<em>You can conveniently check your regular store's <span>weekly promotional items and promotional flyers</span> on the Woori Dongne GS app.</em>`, /*26.06.26 edit 정다희 : 텍스트 수정*/ 
                    app_desc:`Before visiting the store, check out sale items and stock at your nearest convenience store in advance on the Our Neighborhood GS app!`/* 260604 번역 */ /*26.06.30 edit 정다희 : 텍스트 재추가 및 수정 */
                }
            }
        };
    },
    computed: {
        t() { return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko; }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        checkMobile() { this.isMobile = window.innerWidth < 768; },
        closeModal(event) { modal.close(event.currentTarget); },
    }
};
</script>

<style scoped>
h3 { margin-bottom: 60px; color: #161616; font-size: 3.2rem; font-weight: 700; }
h4 {margin-top:24px; color:#161616; font-size:3.2rem; font-weight:700;}
span { color:#161616; font-size:1.8rem; font-weight:700; display:block;}
span img {max-width:100%; object-fit:cover; border-radius:12px; }
section h4 + span{margin: 16px 0 8px;}
section > p {display:flex; flex-direction:column; gap:4px;font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
:deep(.gs25_event p em), :deep(.gsfresh_event p em) { color:#67676F; font-size:1.6rem;}
:deep(.gs25_event p em span), :deep(.gsfresh_event p em span) { font-weight:700; }
.event_icon_list { display: flex; flex-wrap: wrap; gap: 8px; width: 100%; margin-top: 40px; }
.event_icon_list li { display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: calc((100% - (8px * 3)) / 4); }
.event_icon_list li .img_box { display: flex; align-items: center; justify-content: center; width: 100%; height: 142px; padding: 20px; background: #F8F8F8; border-radius: 12px; text-align: center; }
.event_icon_list li .img_box img { max-width: 64px; max-height: 64px; object-fit: contain; }
.event_icon_list li em { margin-top: 8px; color: #67676F; font-size: 1.6rem; font-style: normal; }
/* i {padding:16px 16px 16px 42px; color:#161616; font-size:16px; background:#F8F8F8; border-radius:6px; display:flex; position:relative;}
i::before {content:''; width:20px; height:20px; background:red; position:absolute; top:50%; left:16px; display:inline-block; transform:translateY(-50%);} */
section.gsfresh_event {margin-top:80px;}

/* Notice Bar */
.notice_bar { margin-top:24px; padding: 16px !important; background: #f8f8f8; border-radius: 6px;  display: flex; align-items: center; gap: 6px;}
.notice_bar p {margin-bottom:0px !important; padding-left: 26px; color: #161616; font-size: 1.6rem; position: relative; }
.notice_bar p::before { content: ''; display: inline-block; position: absolute; top: 0; left: 0; width: 20px; height: 20px; background: url('@/assets/images/common/icon_set_20.png') -935px -24px no-repeat; }

/* 반응형 */

@media screen and (max-width: 1024px) {
    /* 태블릿 환경 필요시 2열 조정 */
    .event_icon_list li { width: calc((100% - 8px) / 2); }
}

@media screen and (max-width: 767px) {
    /* 모바일 2열 유지 및 간격 조정 */
    .modal_content { padding-bottom: 100px; }
    .event_icon_list { margin:20px 0; gap: 12px 8px; }
    .event_icon_list li { width: calc((100% - 8px) / 2); }
    .event_icon_list li .img_box {padding: 33px; }
    h4 {margin-top:40px; color:#161616; font-size:2.4rem; font-weight:700;}
    span { color:#161616; font-size:1.8rem; font-weight:700; display:block;}
    section h4 + span{margin: 8px 0;}
    span img {height:200px;}
    :deep(.gs25_event p em), :deep(.gsfresh_event p em) {line-height:1.5;}
    .notice_bar p {font-size:1.2rem !important; font-weight:400 !important;}
    .notice_bar p::before {top:-2px;}
    section.gsfresh_event {margin-top:60px; }

}
</style>