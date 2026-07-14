<template>
    <div class="main-container">
        <div v-if="!isMobile" class="title_wrap">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
        </div>

        <section class="customer-intro-section">
            <div class="cont_inner">
                <article>
                    <div class="intro-summary">
                        <h3 v-html="t.IntroTitle"></h3>
                        <p v-html="t.IntroDesc"></p>
                        <em>{{ t.CallCenterGuide }}</em>
                    </div>

                    <ul class="brand-card-group">
                        <li v-for="brand in t.Brands" :key="brand.id">
                            <div class="brand-info-box">
                                <h4>{{ brand.name }}</h4>
                                <dl>
                                    <dt class="blind">{{t.전화번호}}</dt>
                                    <dd class="tel-number">{{ brand.tel }}</dd>
                                    <dt class="blind">{{t.운영시간}}</dt>
                                    <dd class="working-hours" v-html="brand.hours"></dd>
                                    <dd class="working-hours" v-html="brand.hours2"></dd>
                                </dl>
                            </div>
                            <div class="brand-btn-group">
                                <template v-for="(btn, bIdx) in brand.buttons" :key="bIdx">
                                    <Buttons 
                                        v-if="btn.type === 'popup'" 
                                        @click="openModal" 
                                        :data-popid="btn.popId" 
                                        :data-cont="btn.cont"
                                        data-type="lg" 
                                        btn-class="btn_base border btn_icon_arrow after">
                                        {{ btn.label }}
                                    </Buttons>
                                    <!-- 26.07.03 Del 이종환 <Buttons v-else @click="handleLink(btn.target)" btn-class="btn_base border btn_icon_arrow after">
                                        {{ btn.label }}
                                    </Buttons> -->
                                </template>
                            </div>
                        </li>
                    </ul>
                </article>

                <div class="btnSection bottom">
                    <Buttons btn-class="btn_xl border btn_icon_arrow after">{{ t.OtherInquiry }}</Buttons>
                </div>

                <!-- 26.07.03 Del 이종환 <ul class="service-link-list">
                    <li v-for="(link, idx) in t.BottomLinks" :key="idx">
                        <div>
                            <h5>{{ link.title }}</h5>
                            <p v-html="link.desc"></p>
                            <Buttons 
                                v-if="link.type === 'popup'" 
                                @click="openModal" 
                                :data-popid="link.popId" 
                                :data-cont="link.cont" 
                                data-type="lg" 
                                btn-class="btn_mid gray btn_icon_arrow after"
                            >
                                {{ link.btnLabel }}
                            </Buttons>
                            <Buttons 
                                v-else 
                                @click.stop.prevent="handleLink(link.target)" 
                                class="btn_mid gray btn_icon_arrow after"
                            >
                                {{ link.btnLabel }}
                            </Buttons>
                        </div>
                    </li>
                </ul> -->
            </div>
        </section>



        <div id="gsrcu0101" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "gsrcu01",
    components: { Buttons },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            isMobile: false,
            langData: {
                ko: {
                    MainTitle: "고객센터",
                    OtherInquiry: "기타 문의하기",
                    IntroTitle: `안녕하세요! <br/><span class="point-blue">GS리테일 고객센터</span><br/>입니다.`,
                    IntroDesc: "고객님 한분 한분의 의견을 소중하게 여기며,<br/>고객님의 값진 한마디로 더욱 새롭게 거듭나겠습니다.",
                    CallCenterGuide: "※ 고객센터 대표전화 (무료)",
                    Brands: [
                        {
                            id: "gs25", name: "GS25", tel: "080-999-5425", hours: "· 평일 09:00~18:00 (공휴일 휴무)", hours2: "· 픽업/배달 문의 10:00~23:00<br />&nbsp;&nbsp;(연중무휴)",
                            buttons: [
                                { label: "1:1 상담", type: "popup", popId: "gsrcu0101", cont: "gsrcu0101" },
                                { label: "창업안내", type: "link", target: "/gsrst02010101" }
                            ]
                        },
                        {
                            id: "gsshop", name: "GS SHOP", tel: "080-414-4545", hours: "· 24시간 콜센터",
                            buttons: [{ label: "1:1 상담", type: "popup", popId: "gsrcu0101", cont: "gsrcu0101" }]
                        },
                        {
                            id: "gsthefresh", name: "GS THE FRESH", tel: "080-345-7700", hours: "· 평일, 주말, 공휴일 10:00~19:00<br/>&nbsp;&nbsp;(명절 당일은 휴무)",
                            buttons: [
                                { label: "1:1 상담", type: "popup", popId: "gsrcu0101", cont: "gsrcu0101" },
                                { label: "창업안내", type: "link", target: "/gsrst01010101" }
                            ]
                        }
                    ],
                    BottomLinks: [
                        { title: "정도경영목소리", btnLabel: "문의하기", desc: "언제나 고객님의 입장이 되어 <br/>작은 소리에도 귀를 기울이겠습니다.", type: "link", target:"/gsrsu040101" },
                        { title: "입점상담", btnLabel: "문의하기", desc: "GS리테일과 파트너사의 첫 만남,<br/>입점을 환영합니다", type: "link", target: "/gsrse01" },
                        // 260623 delete 이소라 { title: "채용문의", btnLabel: "채용문의", desc: "GS리테일과 함께,<br/>더 좋은 내일을 만들어갈 당신을 기다립니다.", type: "link", target: "https://gsretail.recruiter.co.kr/career/home" },
                        { title: "기타문의", btnLabel: "문의하기", desc: "언제나 고객님의 입장이 되어 <br/>작은 소리에도 귀를 기울이겠습니다.", type: "popup", popId: "gsrcu0101", cont: "gsrcu0101" } //26.06.09 Edit 이종환
                    ],
                    전화번호:'전화번호',
                    운영시간:'운영시간'
                },
                en: {
                    MainTitle: "Customer Service",
                    OtherInquiry: "Other Inquiries"/* 260708 번역 */,
                    IntroTitle: `Hello! Welcome to the GS Retail Customer Service Center.`,
                    IntroDesc: "We value every opinion from each and every one of our customers.<br/>Your valuable words will help us continually improve and grow.",
                    CallCenterGuide: "※ Customer Service Center Representative Number (Toll-Free)",
                    Brands: [
                        {
                            id: "gs25", name: "GS25", tel: "080-999-5425", hours: "· Weekdays 9:00–18:00 (Closed on public holidays)"/* 260604 번역 */, hours2: "· Pickup/Delivery inquiries 10:00–23:00<br />&nbsp;&nbsp;(Open year-round)"/* 260604 번역 */,
                            buttons: [
                                { label: "1:1 Consultation >", type: "popup", popId: "gsrcu0101", cont: "gsrcu0101" },
                                { label: "Franchising Guide", type: "link", target: "/gsrst02010101" }
                            ]
                        },
                        {
                            id: "gsshop", name: "GS SHOP", tel: "080-414-4545", hours: "24-Hour Call Center",
                            buttons: [{ label: "1:1 Consultation >", type: "popup", popId: "gsrcu0101", cont: "gsrcu0101" }]
                        },
                        {
                            id: "gsthefresh", name: "GS THE FRESH", tel: "080-345-7700", hours: "· Weekdays, weekends, and public holidays 10:00–19:00<br/>&nbsp;&nbsp;(Closed on the day of national holidays)"/* 260604 번역 */,
                            buttons: [
                                { label: "1:1 Consultation >", type: "popup", popId: "gsrcu0101", cont: "gsrcu0101" },
                                { label: "Franchising Guide", type: "link", target: "/gsrst01010101" }
                            ]
                        }
                    ],
                    BottomLinks: [
                        { title: "Ethics Hotline", btnLabel: "Inquiry", desc: "We will always put ourselves in our customers' shoes and listen even to the smallest voice.", type: "link", target:"/gsrsu040101" },
                        { title: "Business Inquiry", btnLabel: "Inquiry", desc: "The first meeting between GS Retail and its partners,<br/>Welcome aboard"/* 260604 번역 */, type: "link", target: "/gsrse01" },
                        // 260623 delete 이소라 { title: "Recruitment Inquiry >", btnLabel: "Inquiry >", desc: "Together with GS Retail,<br/>We look forward to you, who will build a better tomorrow."/* 260604 번역 */, type: "link", target: "https://gsretail.recruiter.co.kr/career/home" },
                        { title: "Etc Inquiry", btnLabel: "Inquiry", desc: "We will always put ourselves in our customers' shoes and listen even to the smallest voice.", type: "link", target: "https://with.gsshop.com/cust/custCent/main.gs?lseq=380732-1&dseq=0&gsid=gnb-AU380732-AU380732-1" }
                    ],
                    전화번호:'Phone Number',
                    운영시간:'Operating Hours'/* 260604 번역 */
                }
            }
        };
    },
    computed: { t() { return this.langData[this.lang] || this.langData.ko; } },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
        
        const header = document.getElementById("header");
        header.classList.add("head_black");
    },
    beforeUnmount() { window.removeEventListener('resize', this.checkMobile); },
    methods: {
        checkMobile() { this.isMobile = window.innerWidth < 768; },
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default"; // data-type 속성 읽기
            const cont = el.dataset.cont; // data-cont 속성 읽기
            modal.open(popId, type, el, cont); // 4개 인자 모두 전달
        },

        handleLink(url) {
            if (!url) return;
            // 외부 링크 스크린 아웃 후 즉시 종료 조치
            if (url.startsWith('http')) {
                window.open(url, '_blank');
                return;
            }
            this.$router.push(url);
        }
    }
};
</script>

<style scoped>
.title_wrap {width:100%; padding:200px 0 100px; justify-content:center;}
.title_wrap h2 {font-size:72px;}
.blind {width:1px; height:1px; position:absolute; top:0; left:0; overflow:hidden; z-index:-1;}
.page-top-title {margin-bottom:48px; text-align:center;}
.title-xl {width:100%; color:#111111; font-size:4.5rem; font-weight:700; line-height:1.24; letter-spacing:-1.44px;}
.cont_inner article {width:100%; padding:100px 64px; background-color:#f8f8f8; border-radius:12px; display:flex; gap:40px;}
.intro-summary {width:30%;}
h3 {color:#161616; font-size:32px; font-weight:700; line-height:1.3; letter-spacing:-0.32px;}
h3 :deep(.point-blue) {color:#107af2;}
.intro-summary p {margin-top:16px; color:#67676f; font-size:16px; font-weight:400; line-height:1.5; letter-spacing:-0.16px;}
em {margin-top:12px; color:#67676f; font-size:14px; font-weight:400; line-height:1.4; letter-spacing:-0.14px; display:block;}

.brand-card-group {width:100%; display:flex; gap:30px; overflow:hidden; list-style:none;}
.brand-card-group li {width:100%; padding:172px 32px 32px; background-color:#ffffff; border-radius:12px; position:relative; display:flex; flex-direction:column; justify-content:space-between; align-items:center;}
.brand-card-group li::before {content:''; width:100px; height:100px; background-color:#F8F8F8; background-position:50% 50%; background-repeat:no-repeat; border-radius:50%; position:absolute; top:32px; left:50%; display:block; transform:translateX(-50%);}

.brand-card-group li:nth-of-type(1)::before {background-image:url('@/assets/images/sub/gsrcu/logo_cu01_01.png');}
.brand-card-group li:nth-of-type(2)::before {background-image:url('@/assets/images/sub/gsrcu/logo_cu01_02.png');}
.brand-card-group li:nth-of-type(3)::before {background-image:url('@/assets/images/sub/gsrcu/logo_cu01_03.png');}

.brand-info-box {width:100%; padding-top:24px; margin-bottom:24px;}

h4 {margin-bottom:24px; color:#161616; font-size:20px; font-weight:700; line-height:1.35; letter-spacing:-0.2px;}
.tel-number {padding-top:24px; margin-bottom:6px; color:#161616; font-size:28px; font-weight:700; line-height:1.35; letter-spacing:-0.28px; border-top:1px solid #E5E5E9;}
.working-hours {font-size:14px; color:#67676F; line-height:1.5}
.working-hours + .working-hours {margin-top:6px;}
.brand-btn-group {width:100%; display:flex; gap:8px;}
.service-link-list {width:100%; padding:100px 0 0; display:flex; gap:20px; list-style:none;}
.service-link-list li {width:100%; display:flex; flex-direction:column; gap:20px; flex-basis:25%;}
.service-icon-box img {width:40px; height:40px;}

.service-link-list li > div {width:100%; padding-top:60px; position:relative; display:flex; flex-direction:column; gap:30px;}
.service-link-list li > div::before {content:''; width:40px; height:40px; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat; position:absolute; top:0; left:0; display:block;}
.service-link-list li:nth-of-type(1) > div::before {background-position:-580px -342.86px;}
.service-link-list li:nth-of-type(2) > div::before {background-position:-20px -20px;}
.service-link-list li:nth-of-type(3) > div::before {background-position:-900px -186px;} /* 260625 edit 이소라 */

h5 {color:#161616; font-size:18px; font-weight:700; line-height:1.5;}
.service-link-list p {min-height:3em; color:#161616; font-size:16px; font-weight:400; line-height:1.5; letter-spacing:-0.16px;}
.brand-card-group .btn_mid {padding:0 9px; border-radius:4px;}
.service-link-list a.btn_mid.gray {width:fit-content;}
.service-link-list :deep(button.btn_mid.gray) {width:fit-content;}

.btnSection.bottom {margin-top:40px; text-align:right;}
.btnSection.bottom button {font-weight:700;}

@media screen and (max-width: 1400px) and (min-width: 769px) {
    .brand-card-group {overflow-x: auto;}
    .brand-card-group li {min-width: 285px;}
}
@media screen and (max-width: 1200px) {
    .cont_inner article {padding:60px 40px; flex-direction:column;}
    /* .brand-btn-group, .brand-card-group {flex-direction:column;} */
    .intro-summary {width:100%;}
}
@media screen and (max-width: 768px) {
    h3 {font-size:28px;}
    h4 {font-size:18px;}
    .tel-number {font-size:24px;}
    .cont_inner article {padding:100px 0px 0px; background:transparent; display:flex; flex-direction:column; gap:40px;} /* 260625 edit 이소라 */
    .intro-summary {width:100%;}
    .brand-card-group {width:100%; padding:30px 24px; background-color: #f8f8f8; border-radius:8px; display:flex; flex-direction:column; gap:20px;}
    .service-link-list {padding:40px 20px 0; display:flex; flex-direction:column; gap:48px;}
    .service-link-list li {width:100%; display:flex; flex-direction:row; gap:16px; align-items:flex-start;}
    .service-link-list li > div {width:100%; padding-top:0; padding-left:80px; display:flex; flex-direction:column; align-items: baseline; gap:16px;}
    .service-link-list li > div::before {left:20px;}
    .service-link-list p {min-height:auto; margin-top:-8px;}
    .btn_mid.gray {width:auto;}

    .btnSection.bottom {margin-top:60px;}
    .btnSection.bottom button {width:100%; font-weight:400;}
}
</style>