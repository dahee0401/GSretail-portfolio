<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
            <!-- 26.06.08 delete: visual-sub 삭제  -->
        </div>

        <section class="section-investor">
            <div class="cont_inner">
                <article class="sec_chairman">
                    <div class="chairman_intro">
                        <figure class="chairman_visual"></figure>
                        <figcaption v-if="t.ChairmanRole || t.ChairmanName" class="chairman_profile">
                            <p v-if="t.ChairmanRole">{{ t.ChairmanRole }}</p>
                            <strong v-if="t.ChairmanName">{{ t.ChairmanName }}</strong>
                        </figcaption>
                    </div>
                    <div v-if="t.ChairmanGreeting || t.ChairmanBody?.length" class="chairman_content">
                        <h3 v-if="t.ChairmanGreeting" v-html="t.ChairmanGreeting"></h3>
                        <p v-for="(para, pIdx) in t.ChairmanBody" :key="'chairman-' + pIdx" v-html="para"></p>
                    </div>
                </article>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    name: "gsrin0100",
    components: { },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            CTabIdx: 0,
            selectedFilter: "",
            isMobile: false,
            langData: {
                /* 26.06.29 edit 이소라 */
                ko: {
                    MainTitle: "이사회 의장 인사말",
                    ChairmanRole: "㈜GS리테일 이사회 의장",
                    ChairmanName: "사외이사 이성락",
                    ChairmanGreeting: "존경하는 GS리테일 주주 여러분 안녕하십니까?<br />GS리테일 이사회 의장 <br class='m_br'/>이성락입니다.",
                    ChairmanBody: [
                        "우리 회사는 투명한 지배구조 확립을 위해, 2020년 11월부터 대표이사와 이사회 의장을 분리하여 이사회를 운영하고 있습니다.",
                        "저는 이사회 의장으로서 GS리테일 주주의 권리 보호 및 공정한 대우를 통해 주주의 기본권을 최대한 보장하고, <br />주주와의 신뢰 구축을 바탕으로 기업 가치를 극대화하고자 노력하고 있습니다.",
                        "또한, 의사결정의 효율성을 위해 전문성을 갖춘 유능한 인사로 이사회를 구성하여, 주주가치 제고를 위해 최선을 다하고 있으며, <br />특히 감사위원회는 전원 사외이사 및 1인 이상의 재무 · 회계 전문가로 구성하고, 경영진과 지배주주로부터 독립적인 경영활동이 보장될 수 <br />있도록 하고 있습니다.",
                        "더불어 ESG관점의 지속가능경영 강화를 위해 ESG위원회, 보상위원회를 설치하는 등 이사회 내 5개의 위원회를 운영하며, <br />의사결정의 독립성과 전문성을 제고하기 위해 노력하고 있습니다.",
                        "이 밖에도 다양한 이해관계자의 권리 보호, 공정한 거래 문화 확립, 지역 사회와의 상생 등 기업의 사회적 책임을 다하는 한편, <br />GS리테일이 지속 성장하는 기업이 될 수 있도록 최선의 노력을 다하겠습니다.",
                        "앞으로도 GS리테일을 향한 많은 관심과 사랑 부탁드립니다. <br />감사합니다.",
                    ],
                },
                en: {
                    MainTitle: "Message from the Chairman of the Board of Directors",
                    ChairmanRole: "Chairman of the Board of Directors, GS Retail Co., Ltd."/* 260708 번역 */,
                    ChairmanName: "Lee Sung-rak, Outside Director"/* 260708 번역 */,
                    ChairmanGreeting: "Dear valued shareholders of GS Retail,<br />I am Lee Sung-rak, <br class='m_br'/>Chairman of the Board of Directors of GS Retail."/* 260708 번역 */,
                    ChairmanBody: [
                        "To establish transparent corporate governance, our company has separated the roles of CEO and Chairman of the Board, operating its board on this basis since November 2020."/* 260708 번역 */,
                        "As Chairman of the Board, I strive to protect the rights of GS Retail's shareholders and, through fair treatment, guarantee their fundamental rights to the fullest, <br />while working to maximize corporate value on the foundation of trust built with our shareholders."/* 260708 번역 */,
                        "In addition, to ensure efficient decision-making, we have composed the Board with competent members of professional expertise and are doing our utmost to enhance shareholder value. <br />In particular, the Audit Committee is composed entirely of outside directors along with at least one financial and accounting expert, ensuring management activities that remain <br />independent of the management and the controlling shareholder."/* 260708 번역 */,
                        "Furthermore, to strengthen sustainable management from an ESG perspective, we operate five committees within the Board, including the ESG Committee and the Compensation Committee, <br />striving to enhance the independence and expertise of our decision-making."/* 260708 번역 */,
                        "Beyond this, we will fulfill our corporate social responsibilities—protecting the rights of diverse stakeholders, establishing a fair trade culture, and pursuing mutual growth with local communities—<br />while making our utmost efforts to ensure that GS Retail becomes a company of sustained growth."/* 260708 번역 */,
                        "We sincerely ask for your continued interest in and support for GS Retail. <br />Thank you."/* 260708 번역 */,
                    ],
                }
            }
        };
    },
    mounted() {
        this.checkResolution();
        window.addEventListener('resize', this.checkResolution);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkResolution);
    },
    computed: { t() { return this.langData[this.lang] || this.langData.ko; } },
    methods: {
        checkResolution() {
            // 768px 미만일 때만 스와이퍼 활성화
            this.isMobile = window.innerWidth < 768;
        },
    }
};
</script>

<style scoped>
/*::::::::::::::::::::::::::::::: PC Style (정제됨) :::::::::::::::::::::::::::::::*/
/* gsrin0101 전용 스타일 */
:deep(.m_br) { display: none; }
.main-container {width: 100%; position: relative; display: block;}
.section-investor {width: 100%; position: relative; display: block;}
.title_wrap {width: 100%; height:480px;  padding:10.91% 0 11.25%; background: url('/src/assets/images/dummy/gsrin0101_bg.png') no-repeat center / cover; text-align: center; position: relative; display: block;}
.page-title {color: #FFFFFF; font-size: 72px; font-weight: 700; text-align: center; display: block;}
.visual-sub {margin-top: 10px; color: #FFFFFF; font-size: 32px; font-weight: 700; text-align: center;}
.title-sub-text {width: 100%; padding: 100px 0; color: #161616; font-size: 48px; font-weight: 700; text-align: center; line-height: 1.4;}
:deep(.title-sub-text br:not(:nth-of-type(2))) {display: none;}
.subtit_wrap {width: 100%; padding: 60px 40px; background: #F2F2F4; border-radius: 16px; text-align: center; display: flex; flex-direction: column; justify-content: center;}
/* 이사회 의장 인사말 탭 관련 css 추가 26.06.08 add 정다희 */
.sec_chairman { padding-top:200px; }
.chairman_intro { width: 100%; position: relative; }
.chairman_intro > figure.chairman_visual { width: 100%; height: 658px; background: url('@/assets/images/dummy/gsrin0101_01.png') no-repeat center top / cover; }
.chairman_intro > figcaption.chairman_profile { position: absolute; bottom: 30.7%; left: 11.97%; }
.chairman_intro > figcaption.chairman_profile > p { color: #000; font-size: 2rem; font-weight: 400; line-height: 1.35; letter-spacing: -0.01em; }
.chairman_intro > figcaption.chairman_profile > strong { margin-top: 11px; color: #000; font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; display: block; }
.chairman_content { width: 100%; margin-top: 80px; }
.chairman_content > h3 { color: #161616; font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.chairman_content > p { margin-top: 40px; color: #161616; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; white-space: pre-line; }


@media screen and (max-width:1024px) {
    .title-sub-text {padding: 60px 0; font-size: 36px;}
    .view-3 {display:block;}
    :deep(.view-6.res-swiper-container) .swiper-wrapper, :deep(.view-3.res-swiper-container) .swiper-wrapper {display: grid !important; grid-template-columns: repeat(2, 1fr); gap: 20px; transform:none;}
    .frame-5 {max-width:none;}
    .view-6:last-of-type {width:100%;}
}

@media screen and (max-width: 768px) {
    :deep(.m_br) { display: block; }
    .cont_inner {padding-top:60px;}
    .tab_wrap{margin-bottom:0;}
    .title_wrap {display:none;}
    .page-title {font-size: 40px;}
    .visual-sub {font-size: 20px;}
    .title-sub-text {padding: 60px 0 80px; font-size: 2.8rem; line-height: 1.3; text-align:left;}
    .chairman_content > h3 + p {margin-top:8px;}
    /* .gsrin0102 > * {margin-top: 80px;} */
    .view-2 + .view-2{margin-top:100px;}
    :deep(.title-sub-text br) {display:block !important;}
    .view-3 {flex-direction: column; align-items: center; gap: 40px;}
    .div-2 {max-width:312px; width:100%;} /* 1열 배치 및 최대너비 제한 */
    .view-6 {flex-direction: column; gap: 12px;}
    .view-6:last-of-type {width:100%;}
    .frame-5, .card_item.res-slide-item {width:90%;} /* 역량 구성표 1열 */
    .img {height: auto; aspect-ratio: 16 / 9;} /* 이미지 비율 유지 */
    .divider {display:none;} /* 구분선 가로로 변경 */
    .policy_wrap {padding: 30px 20px;}
    .policy_wrap dt {margin-top: 40px; font-size: 20px;}
    .policy_wrap dd {font-size: 16px;}
    .table thead { position: absolute; width: 1px; height: 1px; clip: rect(0, 0, 0, 0); overflow: hidden; }
    .table tbody tr { display: block; width: 100%; }
    .table td.view-wrapper { display: block; width: 100%; border-left: 0; box-sizing: border-box; }
    .table td.view-wrapper::before { content: attr(data-title); display: block; margin: -12px -24px 12px; padding: 12px 24px; background-color: #f8f8f8; border-bottom: 1px solid #e5e5e9; color: #161618; font-size: 1.8rem; font-weight: 600; line-height: 1.4; letter-spacing: -0.018rem; text-align: center; }
    .button-group {gap: 8px;}
    .text-wrapper-3 {font-size:24px;}
    .bullet_01 li {font-size:16px;}
    .p {font-size:18px;}
    .frame-6 {flex-direction:column; align-items:flex-start;}
    .section-sub-title {font-size:28px;}
    /* 이사회 의장 인사말 탭 관련 css 추가 26.06.08 add 정다희 */
    .sec_chairman { padding-top:60px; }
    .chairman_intro > figure.chairman_visual { height: auto;min-height: 400px; background-position: 57% center;  }
    .chairman_intro > figcaption.chairman_profile { position: static; margin-top: 60px; padding: 0; }
    .chairman_intro > figcaption.chairman_profile > p { font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
    .chairman_intro > figcaption.chairman_profile > strong { font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.01em; }
    .chairman_content { margin-top: 40px; }
    .chairman_content > h3 { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
    .chairman_content > p { margin-top: 10px; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
}

</style>