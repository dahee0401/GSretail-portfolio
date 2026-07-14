<template>
    <div class="modal_cont wine25_modal">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <section class="intro_section">
                <div class="title_area">
                    <h3 class="p" v-html="t.IntroTitle"></h3>
                    <div class="desc_group">
                        <p class="main_desc" v-html="t.IntroDesc"></p>
                        <p class="sub_notice">{{ t.IntroNotice }}</p>
                    </div>
                </div>

                <ul class="feature_list">
                    <li v-for="(feature, fIdx) in t.Features" :key="fIdx">
                        <figure class="img_box" :class="'bg_0' + (fIdx + 1)">
                            <img :src="feature.img" :alt="feature.text">
                        </figure>
                        <p class="feature_txt" v-html="feature.text"></p>
                    </li>
                </ul>
            </section>

            <section class="guide_section">
                <div class="section_tit">
                    <h4>{{ t.GuideTitle }}</h4>
                    <p>{{ t.GuideDesc }}</p>
                </div>

                <ul class="how_to_grid">
                    <li v-for="(step, sIdx) in t.Steps" :key="sIdx" :class="'card_0' + step.num">
                        <div class="card_tit">
                            <span class="num">{{ step.num }}</span>
                            <strong class="txt" v-html="step.text"></strong>
                        </div>
                        <figure class="step_img">
                            <img :src="step.img" :alt="'Step ' + step.num">
                            <div v-if="step.hasGradient" class="gradient"></div>
                        </figure>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "gsrbr0402",
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            isMobile: false,
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "와인25플러스",
                    IntroTitle: "내 손 안의 주류 플랫폼, <br/>와인25플러스",
                    IntroDesc: "와인, 양주, 맥주, 전통/기타주류, 페어링물(안주류)<br />원하는 주류를 원하는 날짜에, 원하는 매장에서 예약, 수령할 수 있는 서비스 (전국 GS25 편의점, GS THE FRESH 수퍼)",
                    IntroNotice: "*일부 매장은 와인25플러스 서비스를 제공하지 않을 수 있습니다.",
                    Features: [
                        { img: require("@/assets/images/dummy/gsrbr0402_1.png"), text: "<span>5,000여종</span>의<br/>다양한 주류" },
                        { img: require("@/assets/images/dummy/gsrbr0402_2.png"), text: "구매한 상품과 마일리지까지 관리하는<br/>나의 와이너리" },
                        { img: require("@/assets/images/dummy/gsrbr0402_3.png"), text: "전국 언제 어디서나<br/>매장 픽업 서비스" }
                    ],
                    GuideTitle: "매장 픽업 서비스 이용 가이드",
                    GuideDesc: "언제 어디서나 앱에서 원하는 상품을 간단하게 결제한 후 저장하신 점포에서 수령하세요.",
                    Steps: [
                        { num: "01", text: "수령하고자 하는<br/>매장 설정", img: require("@/assets/images/dummy/gsrbr0402_step_1.png") },
                        { num: "02", text: "원하는 주류<br/>카테고리 선택", img: require("@/assets/images/dummy/gsrbr0402_step_2.png"), hasGradient: true },
                        { num: "03", text: "상품 선택 후,<br/>'예약 주문하기' 선택", img: require("@/assets/images/dummy/gsrbr0402_step_3.png") },
                        { num: "04", text: "픽업 정보 입력 후,<br/>바로 예약하기 선택", img: require("@/assets/images/dummy/gsrbr0402_step_4.png") },
                        { num: "05", text: "결제 완료 후,<br/>수령 QR 보기", img: require("@/assets/images/dummy/gsrbr0402_step_5.png") },
                        { num: "06", text: "수령할 매장에서 <br/>QR코드로 픽업", img: require("@/assets/images/dummy/gsrbr0402_step_6.png"), hasGradient: true }
                    ]
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Wine25Plus",
                    IntroTitle: "Wine25Plus: Your Personal Alcohol Platform, Right at Your Fingertips",
                    IntroDesc: "Reserve and pick up wine, spirits, beer, traditional and other liquors, and food pairings (snacks) at your preferred store on your chosen date<br /> — available at GS25 and GS THE FRESH locations nationwide.",
                    IntroNotice: "※ Wine25Plus service may not be available at all store locations.",
                    Features: [
                        { img: require("@/assets/images/dummy/gsrbr0402_1.png"), text: "Over 5,000 Varieties of <br />Alcoholic Beverages" },
                        { img: require("@/assets/images/dummy/gsrbr0402_2.png"), text: "My Winery: <br />Manage Your Purchases and <br />Mileage All in One Place" },
                        { img: require("@/assets/images/dummy/gsrbr0402_3.png"), text: "In-Store Pickup Service<br />Available Nationwide, Anytime" }
                    ],
                    GuideTitle: "In-Store Pickup Service Guide",
                    GuideDesc: "Simply pay for your desired items in the app anytime, anywhere, then pick them up at your saved store.",
                    Steps: [
                        { num: "01", text: "Set Your Preferred Pickup Store", img: require("@/assets/images/dummy/gsrbr0402_step_1.png") },
                        { num: "02", text: "Select Your Preferred Alcohol Category", img: require("@/assets/images/dummy/gsrbr0402_step_2.png"), hasGradient: true },
                        { num: "03", text: "Select your item, <br />then tap 'Reserve and Order'", img: require("@/assets/images/dummy/gsrbr0402_step_3.png") },
                        { num: "04", text: "Enter pickup information,<br />then tap 'Reserve Now'", img: require("@/assets/images/dummy/gsrbr0402_step_4.png") },
                        { num: "05", text: "After payment is complete,<br />view your pickup QR code", img: require("@/assets/images/dummy/gsrbr0402_step_5.png") },
                        { num: "06", text: "Collect your order at the designated store<br />using the QR code", img: require("@/assets/images/dummy/gsrbr0402_step_6.png"), hasGradient: true }
                    ]
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
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
/* Intro Section */
section + section{ margin-top: 80px; }
.title_area { display: flex; flex-direction: column; gap: 16px; padding-bottom: 40px; }
.title_area h3 { color: #161616; font-size: 3.2rem; font-weight: 700; }
:deep(.title_area) h3 br {display:none; }
.desc_group { display: flex; flex-direction: column; gap: 8px; }
.main_desc { color: #161616; font-size: 1.8rem; line-height: 1.4; }
.sub_notice { color: #fb6432; font-size: 1.4rem; }

/* Feature List (3 Column) */
.feature_list { display: flex; gap: 8px; list-style: none; }
.feature_list li { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.img_box { overflow: hidden; width: 100%; height:auto; border-radius: 12px; }

.img_box img { width: 100%; height: 100%; object-fit: cover; display: block;}
.feature_txt { color: #67676f; font-size: 1.6rem; text-align: center; line-height: 1.5; }
:deep(.feature_txt span) { font-weight: 700; }

/* Guide Section */
.section_tit { padding-bottom: 40px; }
.section_tit h4 { margin-bottom: 8px; color: #161616; font-size: 2.4rem; font-weight: 700; }
.section_tit p { color: #161616; font-size: 1.6rem; }

/* How-to Grid (PC 3x2) */
.how_to_grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; list-style: none; }
.how_to_grid li { display: flex; flex-direction: column; gap: 40px; padding: 32px; background-color: #f8f8f8; border-radius: 12px; overflow: hidden; }
.card_tit { display: flex; flex-direction: column; gap: 6px; }
.card_tit .num { color: #107af2; font-size: 1.6rem; font-weight: 700; }
.card_tit strong { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.3; }
.step_img { position: relative; width: 100%; height: 280px; margin: 0; }
.step_img img { width: 100%; height: 100%; object-fit: contain; }
.gradient { position: absolute; bottom: 0; left: 0; width: 100%; height: 40px; background: linear-gradient(180deg, rgba(248, 248, 248, 0) 0%, #f8f8f8 100%); }

/* Order: 01, 02, 03 -> 04, 05, 06 순서 맞춤 (Grid 기본흐름 이용) */

/* Responsive */
@media screen and (max-width: 1024px) {
    .how_to_grid { grid-template-columns: repeat(2, 1fr); }
}

@media screen and (max-width: 768px) {
    .modal_content { padding-bottom: 100px; }
    .main_desc{font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
    section + section{margin-top:60px;}
    .title_area h3 { font-size: 2.4rem; line-height:1.3;}
    :deep(.title_area) h3 br {display:block; }
    .feature_list { flex-direction: column; gap:20px; }
    .img_box { height:auto; }
    .how_to_grid { grid-template-columns: 1fr; }
    .step_img { height: 280px; }
    .sub_notice{font-size:1.2rem;}
    /* :deep(.main_desc br) {display:none;} */
}
</style>