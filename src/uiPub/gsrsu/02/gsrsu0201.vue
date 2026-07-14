<template>
    <div class="main-container" v-if="t">
        <div class="title_wrap ac top_visual">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
            <!-- 26.06.10 Del 이종환 <p class="visual-sub">{{ t.MainsubTitle }}</p> -->
        </div>

        <section class="section-investor">
            <div class="cont_inner">
                <Tabs 
                    v-model="CTabIdx" 
                    :tab-items="t.Tabs1" 
                    tab-class="type_01" 
                    :tab-slide="true" 
                    @change="onTabChange1" 
                />

                <div class="tab_content_wrap">
                    <article v-if="CTabIdx === 0" class="env_management">
                        <div class="panel">
                            <div class="intro_view ac">
                                <h3 v-html="t.IntroTitle"></h3>
                                <p v-html="t.IntroDesc"></p>
                            </div>
    
                            <section class="policy_card_box mb80">
                                <div class="title_area">
                                    <h4>{{ t.PolicyTitle }}</h4>
                                    <p>{{ t.PolicySub }}</p>
                                </div>
                                <ul>
                                    <li v-for="(item, idx) in t.PolicyItems" :key="'policy-'+idx">
                                        <strong>{{ item.tit }}</strong>
                                        <span>{{ item.desc }}</span>
                                    </li>
                                </ul>
                            </section>
    
                            <section class="strategy_section mb100">
                                <div class="title_area ac">
                                    <h4 class="al">{{ t.StrategyTitle }}</h4>
                                    <p class="al">{{ t.StrategyDesc }}</p>
                                </div>
                                
                                <picture class="image_wrap">
                                    <source media="(max-width: 768px)" :srcset="t.Images.StrategyImgMo" />
                                    <img :src="t.Images.StrategyImg" :alt="t.StrategyTitle">
                                </picture>
                            </section>
    
                            <section class="system_section">
                                <div class="title_area ac">
                                    <h4 class="al">{{ t.SystemTitle }}</h4>
                                    <p class="al" v-html="t.SystemDesc"></p>
                                </div>
                                <picture class="image_wrap">
                                    <source media="(max-width: 768px)" :srcset="t.Images.SystemImgMo" />
                                    <img :src="t.Images.SystemImg" :alt="t.SystemTitle">
                                </picture>
                            </section>
                        </div>
                    </article>

                    <article v-if="CTabIdx === 1">
                        <Tabs v-model="InnerTabIdx" :tab-items="t.InnerTabs" tab-class="type_02" />
                        <div class="panel">
                            <div v-if="InnerTabIdx === 0" class="green_value_chain">
                                <div class="value_grid">
                                    <div v-for="(item, idx) in t.GreenValueChain" :key="'gvc-'+idx" class="value_item">
                                        <figure class="mask_group">
                                            <img :src="item.img" :alt="item.tit">
                                        </figure>
                                        <div class="sub_title_area">
                                            <h4 class="text_wrapper">{{ item.tit }}</h4>
                                            <p class="desc_p" v-html="item.desc"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="InnerTabIdx === 1" class="green_store">
                                <section class="intro_section">
                                    <figure class="main_frame">
                                        <img :src="t.GreenStore.IntroImg" :alt="t.GreenStore.Title">
                                    </figure>
                                    <div class="title_area mt40">
                                        <h4>{{ t.GreenStore.Title }}</h4>
                                        <div class="desc_group mt24">
                                            <p v-html="t.GreenStore.Desc"></p>
                                        </div>
                                    </div>
                                </section>

                                <ul class="key_features_grid mb80">
                                    <li v-for="(feature, idx) in t.GreenStore.Features" :key="'feat-'+idx">
                                        <div class="card_content">
                                            <strong>{{ feature.tit }}</strong>
                                            <p>{{ feature.desc }}</p>
                                        </div>
                                    </li>
                                </ul>

                                <div class="system_detail_grid">
                                    <section v-for="(system, idx) in t.GreenStore.Systems" :key="'sys-'+idx" class="system_item">
                                        <figure class="image_wrap">
                                            <img :src="system.img" :alt="system.tit">
                                        </figure>
                                        <div class="sub_title_area mt32">
                                            <h4>{{ system.tit }}</h4>
                                            <p class="mt12" v-html="system.desc"></p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div v-if="InnerTabIdx === 2" class="green_product"> 
                                <ul>
                                    <li class="one_divide">
                                        <div>
                                            <h4>{{ t.GreenProduct.greenSave.tit }}</h4>
                                            <p>{{ t.GreenProduct.greenSave.sesc1 }}</p>
                                            <p>{{ t.GreenProduct.greenSave.sesc2 }}</p>
                                        </div>
                                    </li>
                                    <li class="two_divide">
                                        <div>
                                            <figure class="image_wrap">
                                                <img :src="t.GreenProduct.ecofriendly.img" :alt="t.GreenProduct.ecofriendly.tit">
                                            </figure>
                                            <div>
                                                <h4>{{ t.GreenProduct.ecofriendly.tit }}</h4>
                                                <p>{{ t.GreenProduct.ecofriendly.sesc1 }}</p>
                                                <p>{{ t.GreenProduct.ecofriendly.sesc2 }}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <figure class="image_wrap">
                                                <img :src="t.GreenProduct.originmana.img" :alt="t.GreenProduct.originmana.tit">
                                            </figure>
                                            <div>
                                                <h4>{{ t.GreenProduct.originmana.tit }}</h4>
                                                <p>{{ t.GreenProduct.originmana.sesc1 }}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <figure class="image_wrap">
                                            <img :src="t.GreenProduct.procurementpolicy.img" :alt="t.GreenProduct.procurementpolicy.tit">
                                        </figure>
                                        <div>
                                            <h4>{{ t.GreenProduct.procurementpolicy.tit }}</h4>
                                            <p>{{ t.GreenProduct.procurementpolicy.sesc1 }}</p>
                                        </div>
                                    </li>
                                </ul>
                                <div class="policy_card_box">
                                    <div class="title_area">
                                        <h4>{{ t.GreenProduct.guideline.tit }}</h4>
                                        <p>{{ t.GreenProduct.guideline.desc }}</p>
                                    </div>
                                    <ul>
                                        <li><strong>{{ t.GreenProduct.guideline.num1 }}</strong> <span>{{ t.GreenProduct.guideline.txt1 }}</span></li>
                                        <li><strong>{{ t.GreenProduct.guideline.num2 }}</strong> <span>{{ t.GreenProduct.guideline.txt2 }}</span></li>
                                        <li><strong>{{ t.GreenProduct.guideline.num3 }}</strong> <span>{{ t.GreenProduct.guideline.txt3 }}</span></li>
                                        <li><strong>{{ t.GreenProduct.guideline.num4 }}</strong> <span>{{ t.GreenProduct.guideline.txt4 }}</span></li>
                                    </ul>
                                    <div class="ac">
                                        <Buttons btn-class="btn_icon_arrow btn_xl border after" 
                                            @click="openModal" 
                                            data-popid="gsrsu02010301" 
                                            data-type="lg" 
                                            data-cont="gsrsu02010301"
                                        >{{ t.GreenProduct.guideline.btn_txt }}</Buttons>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </article>

                    <article v-if="CTabIdx === 2" class="climate_change">
                        <div class="panel">
                            <div class="intro_view ac">
                                <p v-html="t.ClimateIntro"></p>
                            </div>
                            <div class="content_grid">
                                <section class="wide_card">
                                    <figure class="image_wrap"><img :src="t.Images.SeaBreathImg" :alt="t.SeaBreathTitle"></figure>
                                    <div class="text_group">
                                        <div class="title_area">
                                            <h4>{{ t.SeaBreathTitle }}</h4>
                                            <p v-html="t.SeaBreathDesc"></p>
                                        </div>
                                        <a class="btn_icon_arrow btn_xl border after" :href="t.sealink" target="_blank">{{ t.MoreBtn }}</a>
                                    </div>
                                </section>
    
                                <div class="sub_grid_container">
                                    <section v-for="(item, idx) in t.EcoProjects" :key="'eco-'+idx" class="grid_item">
                                        <figure class="image_wrap"><img :src="item.img" :alt="item.tit"></figure>
                                        <div class="title_area">
                                            <h4>{{ item.tit }}</h4>
                                            <p v-html="item.desc"></p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <div id="gsrsu02010301" class="modal_wrap">
            <div class="modal_container"></div>
        </div>
    </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import Buttons from "@/components/Buttons.vue";
import modal from "@/assets/js/modal";

export default {
    name: "gsrsu0201",
    components: { Tabs , Buttons },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            CTabIdx: 0,
            InnerTabIdx: 0,
            langData: {
                ko: {
                    MainTitle: "환경",
                    MainsubTitle: "Environmental Management",
                    Tabs1: [{ item: "환경경영" }, { item: "친환경 활동" }, { item: "함께하는 기후변화 대응" }],
                    InnerTabs: [{ item: "그린 밸류체인" }, { item: "그린 스토어" }, { item: "그린 프로덕트" }],
                    MoreBtn: "자세히 보기",
                    sealink:`https://www.badasoom.com/`,
                    Images: {
                        StrategyImg: require("@/assets/images/dummy/gsrsu0201_1.png"),
                        SystemImg: require("@/assets/images/dummy/gsrsu0201_2.png"),
                        SeaBreathImg: require("@/assets/images/dummy/gsrsu020104_1.png"),
                        StrategyImgMo: require("@/assets/images/dummy/mo/gsrsu0201_1_mo.png"),
                        SystemImgMo: require("@/assets/images/dummy/mo/gsrsu0201_2_mo.png"),
                    },
                    IntroTitle: "Green Together<br/>지구를 지키기 위한 노력을 함께 합니다.",
                    IntroDesc: "전 세계적으로 기후 변화, 환경오염 등 환경 관련 이슈가 확산되고 있습니다.<br/>이제 환경경영은 현재의 우리와 미래 후손들을 위해 기업이 사회적 책임을 가져야 할 필수 경영 활동이 되었습니다.<br/>GS리테일은 종합 유통 플랫폼으로써 고객이 경험하는 모든 밸류체인 및 경영 활동 전반에 걸친 환경 영향도를 파악하고<br/>최소화하고자 최선의 노력을 다하겠습니다.", /* 2026.07.06 edit 이소라 */
                    PolicyTitle: "환경경영방침",
                    PolicySub: "GS리테일은 지속가능한 환경경영을 위해, 환경경영 방침을 수립하였습니다.",
                    PolicyItems: [ /* 2026.07.06 edit 이소라 */
                        { tit: "하나. 환경 관련 법령 준수 :", desc: "환경 관련 법령을 준수할 수 있도록 주기적인 모니터링 및 임직원 교육을 진행하여 발생 가능한 리스크를 최소화 하고 있습니다." },
                        { tit: "하나. 환경 성과의 체계적 관리 :", desc: "의사결정 과정에서 환경을 최우선으로 생각하며 환경경영시스템이 체계적으로 관리되도록 최선을 다합니다." },
                        { tit: "하나. 에너지 저감 및 폐기물 관리 :", desc: "본사를 비롯한 매장에서도 에너지의 효율적 사용 방안을 모색하고 확대하며, 폐기물 재사용 및 축소를 통해 환경영향을 축소하겠습니다." },
                        { tit: "하나. 친환경 제품의 확대 :", desc: "유통사로써 고객이 손쉽게 친환경 상품을 접할 수 있도록 친환경 상품의 정의 및 확대를 지속하겠습니다." },
                        { tit: "하나. 환경 정보 공개 :", desc: "관계 법령에 따라 환경 정보를 대중에 공개하여 투명한 환경경영을 실천합니다." }
                    ],
                    StrategyTitle: "환경경영 3대 전략",
                    StrategyDesc: "사업의 밸류체인 전반에 걸친 환경경영 기반을 강화하기 위한 그린 밸류체인, 친환경매장 및 자원 선순환 등 진행을 통한 그린스토어, 지속가능 제품의 확대 및 책임있는 원재료 조달에 대한 그린 프로덕트 등 환경경영 3대 전략과제를 수립하였습니다.",
                    SystemTitle: "환경경영 운영체계",
                    SystemDesc: "환경경영 전략과제를 통해 각 사업별 실행전략을 수립하고, 환경경영 평가위원회를 통해 진행 현황 관리 및 영향평가를 진행합니다.<br/>또한, ESG추진협의회 및 ESG위원회에 진행사항을 보고할 수 있도록 하는 환경경영 체계를 구축하였습니다.",
                    ClimateIntro: "GS리테일은 기후변화의 심각성을 인지하고, 모든 이해관계자들과 함께 <br/>기후변화 문제에 대한 적극적인 대응을 위해 최선의 노력을 다하겠습니다.",
                    SeaBreathTitle: "바다숨 프로젝트",
                    SeaBreathDesc: "바다숨 프로젝트는 GS25, GS THE FRESH에서 수거한 폐가전을 E-순환거버넌스를 통해 재활용하고, 이를 기부금으로 전환해 해양생태계를 보전하는 활동입니다. 2023년 기획을 시작으로 2025년부터 본격 운영되며, 해양 전문 NGO 동아시아바다공동체 오션, 팀부스터와 함께하고 있습니다.<br/><br/>2025년에는 바다거북의 이동 경로를 따라 해양 폐기물을 수거했으며, 2026년에는 잘피 서식지 보전 활동을 진행할 예정입니다. GS리테일은 바다와 공존하는 지속가능한 미래를 만들어가고자 합니다.", /* 260624 edit 이소라 */
                    EcoProjects: [
                        // {
                        //     tit: "에코 크리에이터: 환경영상제작지원",
                        //     img: require("@/assets/images/dummy/gsrsu020104_2.png"),
                        //     desc: "환경재단과 협업하여 영상미디어 컨텐츠 분야의 ESG활동을 실천하고 청소년 및 일반 시민들의 환경 영상 제작 지원을 위해 멘토링, 전문가 강연 등 다양한 기회를 제공하고 있습니다.<br/>2020년 부터 현재까지 18억을 지원하여 460명의 에코크리에이터를 양성하였으며, 10만 명 이상의 지역사회 시민과 친환경 캠페인을 진행해 환경부 우수환경 프로그램으로도 지정되었습니다.<br/><br/>또한 서울시교육청과 연계한 전국 17개 시·도교육청에 환경교육을 진행하였고 서대문 자연사박물관 외 지역사회 환경활동에도 기여하였습니다."
                        // },
                        // {
                        //     tit: "에코 소셜임팩트: 환경분야 제조 소셜벤처 창업지원",
                        //     img: require("@/assets/images/dummy/gsrsu020104_3.png"),
                        //     desc: "지속 가능한 에코제조 분야의 소셜벤처를 양성하기 위해 창업팀을 발굴하고 사업화를 위한 맞춤 성장을 지원하고 있습니다. 2018년부터 현재까지 20억 5천만원을 기부하고 65개의 5년 미만 창업기업에 맞춤형 창업교육, 시제품 제작 지원금, GS리테일 임직원 및 전문가 멘토링 코칭 등을 제공하여 소규모 에코 제조 기업의 브랜드 정체성 확립, 판로 확대 및 라인업 확장에 기여하였습니다.<br/><br/>또한 참여기업간 협업과 네트워킹, 멘토링 지원과 상품품평회 등을 통해 차별화된 GS리테일의 연계형 인큐베이팅 및 유통 판로의 개척을 지원하고 있습니다."
                        // },
                        {
                            tit: "Upcycling 친구 캠페인 : 고객 및 임직원 참여 물품기부", /* 260623 edit 이소라 */
                            img: require("@/assets/images/dummy/gsrsu020104_4.png"),
                            desc: "GS리테일 임직원 및 고객이 직접 물품을 기부하면 업사이클링 환경교육키트로 제작하여 취약계층 아동에게 전달하는 ‘친환경으로 지구 구하기’ 캠페인을 진행하고 있습니다.<br/><br/>2024년 GS리테일은 총 1,704명으로부터 46,789개의 물품을 기부 받아 331명의 아동에게 환경교육 자료를 전달하였습니다. 이를 통해 소나무 967그루를 심은 효과를 창출했습니다."
                        },
                        {
                            tit: "자원순환의 날 행사: 임직원 참여 폐가전 수거 캠페인",
                            img: require("@/assets/images/dummy/gsrsu020104_5.png"),
                            desc: "GS리테일은 2024년부터 매년 자원순환의 날을 맞아 임직원이 참여하는 폐가전 수거 캠페인을 진행하고 있습니다. 편의점 매장에서 발생되는 폐가전을 E-순환거버넌스가 수거하고, 이 과정에서 조성된 기금을 기부하는 자원순환 활동을 진행하고 있습니다.<br /><br /> 폐가전 수거캠페인을 통해 임직원을 대상으로 자원순환에 대한 내재화를 지원하고 있습니다.  "
                        }
                    ],
                    GreenValueChain: [
                        {
                            tit: "녹색물류",
                            img: require("@/assets/images/dummy/gsrsu020101_1.png"),
                            desc: "GS리테일은 제조사로부터 물류센터를 거쳐 전국의 편의점과 수퍼마켓 등으로 상품을 운송하고 있습니다. <br/>물류단계에서 발생하는 환경 영향을 저감하고자 친환경 물류 시스템을 구축 및 운영하여 녹색물류 인증을 획득하였습니다."
                        },
                        {
                            tit: "신재생에너지",
                            img: require("@/assets/images/dummy/gsrsu020101_2.png"),
                            desc: "공주 및 진주 물류센터 유휴공간을 통해 태양광 발전설비를 착공하여, 전력 생산을 진행하고 있습니다.<br/>또한, 문래동 강서N타워에도 태양광 발전설비를 설치하여 전력을 생산하고 있습니다."
                        },
                        {
                            tit: "사내 환경활동 – 페이퍼리스, 머그컵 사용 캠페인",
                            img: require("@/assets/images/dummy/gsrsu020101_3.png"),
                            desc: "GS리테일은 2018년부터 문서관리 기준을 수립하고 내부 업무보고 등 업무진행 시 종이 인쇄를 지양하는 페이퍼리스 문화를 정착하고 있습니다.<br/>또한, 사무실에서 일회용컵 사용을 자제하고 다회용 머그컵을 사용할 수 있도록 머그컵 사용 시 무료 커피 제공 등의 캠페인을 진행하고 있습니다."
                        },
                        {
                            tit: "임직원 환경교육",
                            img: require("@/assets/images/dummy/gsrsu020101_4.png"),
                            desc: "임직원의 환경인식 제고 및 역량강화를 위해 ESG 및 환경교육을 진행하고 있습니다. <br/>임직원을 대상으로 한 환경교육 외에도 2024년부터 매년 자원순환의 날 행사로 임직원이 동참하는 폐가전 수거캠페인을 진행하는 등 임직원이 체감하고 공감할 수 있는 활동을 통해 임직원의 환경 역량 강화를 위해 노력하고 있습니다."
                        }
                    ],
                    GreenStore: {
                        // 상단 인트로
                        IntroImg: require("@/assets/images/dummy/gsrsu020102_1.png"),
                        Title: "녹색매장 인증",
                        Desc: "GS리테일은 매장에서 발생되는 환경영향도를 저감시키고자, 친환경 매장 구축을 진행하고 있습니다. 친환경 매장은 친환경 내·외부 전반에는 친환경 기술·자재·디자인이 도입되며, 3가지 테마(에너지 Saving & 자연 Recycle, 안전 안심 Tech, Green Eco 디자인)를 주제로 적용됐습니다.<br/><br/>2021년 GS25 3개 매장이 녹색매장 인증을 받았으며, 그리고 1개의 점포는 녹색 건축 인증을 획득하였습니다. 특히, GS25 동두천 송내점의 경우 리모델링 민간분야 최초로 녹색건축인증의 가장 높은 등급인 '최우수(그린1등급)'을 받았으며, 앞으로도 친환경 매장을 확대해갈 예정입니다.",
                        
                        // 3대 핵심 테마 카드
                        Features: [
                            {
                                tit: "에너지 Saving & 자연 Recycle",
                                desc: "태양광 발전기, SEMS, 병렬형 에너지 절감 장치, 매장 조명 및 조도 자동 센서, 고효율 에너지 절감형 냉장비, 냉장비 에코 커버, 로이 유리 적용",
                            },
                            {
                                tit: "안전 안심 Tech",
                                desc: "친환경 자재, 살균 소독기, 공기청정기, 친환경 냉매 적용된 냉장비, 장애인 도움벨 설치",
                            },
                            {
                                tit: "Green Eco 디자인",
                                desc: "친환경 조형물, 사이니지 내 그린 활동 영상 송출 등 적용",
                            }
                        ],

                        // 하단 상세 시스템
                        Systems: [
                            {
                                tit: "SEMS (Smart store Energy Management System)",
                                img: require("@/assets/images/dummy/gsrsu020102_2.png"),
                                desc: "IOT기술을 점포에 있는 전기 장비, 기기에 접목한 스마트 에너지 관리 시스템으로, 본부의 메인 서버 또는 경영주·근무자가 스마트폰을 통해 언제 어디서든 매장의 전력량을 관리합니다. 냉·난방기의 원격 관리로 실내 온도를 관리하고, 전력 이상 시 알림을 활용한 에너지 총량을 관리함으로써 환경경영에 매우 중요한 역할을 하고 있습니다."
                            },
                            {
                                tit: "편의점 Auto DR",
                                img: require("@/assets/images/dummy/gsrsu020102_3.png"),
                                desc: "‘수요반응(DR)’ 시스템은 전력거래소가 전력 사용량이 많은 특정 시간대에 전력 사용 절감을 요청하면, 이에 참여한 개별 사용자가 인센티브를 지급받는 제도입니다. GS25 점포에 도입된 ‘자동 수요반응(AUTO DR)’ 시스템은 이를 한 단계 발전시킨 형태로, 원격 제어가 가능한 IoT장비(SEMS)와 연동되어 매장 내 시설을 자동으로 제어하는 것이 특징입니다. 수요 제어 시 자동 시스템을 통해 운영 효율을 높일 수 있으며, 전력 감축 효과는 물론 가맹점에 감축 인센티브가 제공되어 점포 수익성 제고에도 기여하고 있습니다."
                            }
                        ] 
                    },
                    GreenProduct:{
                        greenSave : {
                            img: require("@/assets/images/dummy/gsrsu020103_1.png"),
                            tit: `지속가능한 제품`,
                            sesc1: `GS리테일은 환경 친화적인 제품의 개발 및 도입을 통해 고객의 녹색소비를 촉진할 수 있도록 노력하고 있습니다. 특히, 취급 제품 중 제품 본연의 특성 혹은 패키징에 대해 제3자 친환경 관련 인증을 획득한 제품을 '지속가능제품'으로 정의하였습니다. 지속가능제품은 제품의 원재료, 패키징, 또는 제품의 전 생애주기에서 발생하는 환경 영향이 적은 제품들로 구성하고 있습니다.`,
                            sesc2: `또한, 그린세이브(Green Save)라는 친환경 활동 통합 아이덴티티를 만들고, 자체적인 패키지 개선에 대해서도 기준을 수립해 그린 프로덕트 확대를 위해 노력하고 있습니다.`,
                        },
                        ecofriendly : {
                            img: require("@/assets/images/dummy/gsrsu020103_2.png"),
                            tit: `환경친화적 포장재`,
                            sesc1: `상품 배송 시에도 환경영향도를 최소화하고자 FSC 인증받은 친환경 배송박스를 도입하여 운영중에 있습니다.`,
                            sesc2: `또한, 당일 배송의 경우 다회용백을 통해 배송함으로써 고객의 필요에 따라 다회용으로 이용하여 환경영향도를 저감시키는 노력을 확대해가고 있습니다.`,
                        },
                        originmana : {
                            img: require("@/assets/images/dummy/gsrsu020103_3.png"),
                            tit: `원산지 관리 체계 구축`,
                            sesc1: `유통업 최초로 블록체인 기술을 특정 농작물에 적용하여 제품의 생산부터 출고까지의 전체 이력을 체계적으로 관리하고 있습니다. ‘산지애 사과’ 에 최초로 적용된 이 기술을 통해 사과의 원산지, 재배자, 재배·보관·선별·포장 환경 등을 확인할 수 있습니다. 또한, 축산·수산물에 대해서도 일부 원산지 추적 시스템을 적용하고 있습니다. 이외에도 일부 건강식품의 경우 원재료에 대한 점검을 이행하여 상품의 안전성을 확보하고 있습니다.`,
                        },
                        procurementpolicy : {
                            img: require("@/assets/images/dummy/gsrsu020103_4.png"),
                            tit: `책임있는 원재료 지속가능한 구매 정책`,
                            sesc1: `소모품 및 원재료 조달과정에서 사회적인 책임을 다하고자 지속가능한 구매 정책을 수립하고 준수하고자 노력하고 있습니다.`,
                        },
                        guideline : {
                            tit: `지속가능한 구매 방침`,
                            desc:`녹색구매활동을 통한 ESG 경영을 적극적으로 실천하기 위해 아래 방침 을 준수한다.`,
                            num1:`첫째`,
                            txt1:`적극적인 녹색구매활동을 통해 환경경영을 정착하고 확대하여 친환경의 가치를 고객에게 제공하는 등 친환경 선도 기업으로 사회적 책임과 역할을 다한다.`,
                            num2:`둘째`,
                            txt2:`당사의 녹색구매방침을 파트너사/협력사에게 공유 및 장려한다.`,
                            num3:`셋째`,
                            txt3:`모든 구매활동은 녹색구매를 우선으로 검토한다. 단, 녹색구매가 불가능한 경우(공급불가, 품질저하, 친환경/녹색 제품 부재 등)는 예외로 한다.`,
                            num4:`넷째`,
                            txt4:`녹색구매활동에 대해 정기적인 모니터링 및 평가를 실시하며 개선 필요 시 보완한다.`,
                            btn_txt:`전문보기`
                        }
                        
                    }

                },
                en: {
                    MainTitle: "Environmental Management",
                    MainsubTitle: "Environmental Management",
                    Tabs1: [{ item: "Environmental Management" }, { item: "Eco-Friendly Activities" }, { item: "Addressing Climate Change Together" }],
                    InnerTabs: [{ item: "Green Value Chain" }, { item: "Green Store" }, { item: "Green Product" }],
                    MoreBtn: "Learn More",
                    sealink:`https://www.badasoom.com/`,
                    Images: {
                        StrategyImg: require("@/assets/images/dummy/gsrsu0201_1.png"),
                        SystemImg: require("@/assets/images/dummy/gsrsu0201_2.png"),
                        SeaBreathImg: require("@/assets/images/dummy/gsrsu020104_1.png"),
                        StrategyImgMo: require("@/assets/images/dummy/mo/gsrsu0201_1_mo.png"),
                        SystemImgMo: require("@/assets/images/dummy/mo/gsrsu0201_2_mo.png"),
                    },
                    IntroTitle: "Green Together<br />Working together to protect the planet.",
                    IntroDesc: "Environmental issues such as climate change and pollution are spreading worldwide.<br />Environmental management has now become an essential business activity and a corporate responsibility toward both present and future generations.<br />As an integrated retail platform, GS Retail is committed to identifying and minimizing the environmental impact across all value chains and business activities experienced by its customers.",
                    PolicyTitle: "Environmental Management Policy",
                    PolicySub: "GS Retail has established an environmental management policy for sustainable environmental management."/* 260604 번역 */,
                    PolicyItems: [
                        { tit: "One. Compliance with environment-related laws and regulations:"/* 260604 번역 */, desc: "We conduct periodic monitoring and training of executives and employees to ensure compliance with environment-related laws and regulations, thereby minimizing potential risks."/* 260604 번역 */ },
                        { tit: "One. Systematic management of environmental performance:"/* 260604 번역 */, desc: "We give top priority to the environment in our decision-making process and do our utmost to ensure that the environmental management system is systematically managed."/* 260604 번역 */ },
                        { tit: "One. Energy reduction and waste management:"/* 260604 번역 */, desc: "At our headquarters as well as our stores, we will seek out and expand ways to use energy efficiently, and we will reduce environmental impact through the reuse and reduction of waste."/* 260604 번역 */ },
                        { tit: "One. Expansion of eco-friendly products:"/* 260604 번역 */, desc: "As a distributor, we will continue to define and expand eco-friendly products so that customers can easily access them."/* 260604 번역 */ },
                        { tit: "One. Disclosure of environmental information:"/* 260604 번역 */, desc: "We practice transparent environmental management by disclosing environmental information to the public in accordance with relevant statutes."/* 260604 번역 */ }
                    ],
                    StrategyTitle: "Three Core Strategies for Environmental Management",
                    StrategyDesc: "GS Retail has established three core environmental management strategies: Green Value Chain, aimed at strengthening environmental management foundations across the entire business value chain; Green Store, pursued through eco-friendly store expansion and resource circularity; and Green Product, focused on expanding sustainable products and responsible raw material sourcing.",
                    SystemTitle: "Environmental Management Framework",
                    SystemDesc: "Through its environmental management strategies, GS Retail establishes implementation plans for each business unit and conducts progress monitoring and impact assessments through the Environmental Management Evaluation Committee.<br />An environmental management framework has also been established to enable progress reporting to the ESG Promotion Council and the ESG Committee.",
                    ClimateIntro: "GS Retail recognizes the severity of climate change and will make every effort to address climate-related challenges together with all stakeholders.",
                    SeaBreathTitle: "Bada-sum Project",
                    SeaBreathDesc: "The Badasoom Project collects discarded home appliances from GS25 and GS THE FRESH, recycles them through E-Cycle Governance, and converts the proceeds into donations to preserve marine ecosystems. Launched in planning in 2023 and in full operation from 2025, the project partners with marine NGO Ocean, the East Asian Seas Community, and Team Booster. <br><br>In 2025, marine waste was collected along sea turtle migration routes, and in 2026, seagrass habitat conservation activities are planned. <br>GS Retail is committed to building a sustainable future in harmony with the ocean.", /* 260624 edit 이소라 */
                    EcoProjects: [
                        // {
                        //     tit: "에코 크리에이터: 환경영상제작지원",
                        //     img: require("@/assets/images/dummy/gsrsu020104_2.png"),
                        //     desc: "환경재단과 협업하여 영상미디어 컨텐츠 분야의 ESG활동을 실천하고 청소년 및 일반 시민들의 환경 영상 제작 지원을 위해 멘토링, 전문가 강연 등 다양한 기회를 제공하고 있습니다.<br/>2020년 부터 현재까지 18억을 지원하여 460명의 에코크리에이터를 양성하였으며, 10만 명 이상의 지역사회 시민과 친환경 캠페인을 진행해 환경부 우수환경 프로그램으로도 지정되었습니다.<br/><br/>또한 서울시교육청과 연계한 전국 17개 시·도교육청에 환경교육을 진행하였고 서대문 자연사박물관 외 지역사회 환경활동에도 기여하였습니다."
                        // },
                        // {
                        //     tit: "에코 소셜임팩트: 환경분야 제조 소셜벤처 창업지원",
                        //     img: require("@/assets/images/dummy/gsrsu020104_3.png"),
                        //     desc: "지속 가능한 에코제조 분야의 소셜벤처를 양성하기 위해 창업팀을 발굴하고 사업화를 위한 맞춤 성장을 지원하고 있습니다. 2018년부터 현재까지 20억 5천만원을 기부하고 65개의 5년 미만 창업기업에 맞춤형 창업교육, 시제품 제작 지원금, GS리테일 임직원 및 전문가 멘토링 코칭 등을 제공하여 소규모 에코 제조 기업의 브랜드 정체성 확립, 판로 확대 및 라인업 확장에 기여하였습니다.<br/><br/>또한 참여기업간 협업과 네트워킹, 멘토링 지원과 상품품평회 등을 통해 차별화된 GS리테일의 연계형 인큐베이팅 및 유통 판로의 개척을 지원하고 있습니다."
                        // },
                        {
                            tit: "Upcycling Friend Campaign: Customer and Employee Goods Donation", /* 260623 edit 이소라 */
                            img: require("@/assets/images/dummy/gsrsu020104_4.png"),
                            desc: `GS Retail runs a "Saving the Earth the Eco-Friendly Way" campaign in which employees and customers donate goods that are crafted into upcycled environmental education kits and delivered to underprivileged children.<br />In 2024, GS Retail received 46,789 donated items from a total of 1,704 people, and delivered environmental education materials to 331 children.<br />This was equivalent to planting 967 pine trees.`
                        },
                        {
                            tit: "Resource Circulation Day event: a campaign for collecting waste home appliances with the participation of executives and employees"/* 260604 번역 */,
                            img: require("@/assets/images/dummy/gsrsu020104_5.png"),
                            desc: "Since 2024, GS Retail has conducted an employee-participation waste electronics collection campaign every year to mark Resource Circulation Day. Waste electronics generated at convenience store outlets are collected by E-Cycle Governance, and the funds raised through this process are donated as part of our resource circulation activities.<br /><br /> Through the waste home appliance collection campaign, we support the internalization of resource circulation among executives and employees.  "/* 260604 번역 */
                        }
                    ],
                    GreenValueChain: [
                        {
                            tit: "Green Logistics"/* 260604 번역 */,
                            img: require("@/assets/images/dummy/gsrsu020101_1.png"),
                            desc: "GS Retail transports products from manufacturers through distribution centers to convenience stores and supermarkets across the country. Every day, delivery vehicles traveling to stores nationwide cover a distance equivalent to circling the globe ten times.<br />In order to reduce the environmental impact generated at the logistics stage, GS Retail has established and operates an eco-friendly logistics system, earning Green Logistics Certification."
                        },
                        {
                            tit: "New and renewable energy"/* 260604 번역 */,
                            img: require("@/assets/images/dummy/gsrsu020101_2.png"),
                            desc: "GS Retail has begun constructing solar power generation facilities in the idle spaces of its Gongju and Jinju distribution centers and is currently generating electricity.<br />Solar power generation equipment has also been installed at Mullae-dong Gangseo N Tower, contributing to electricity generation."
                        },
                        {
                            tit: "In-House Environmental Activities – Paperless and Mug Usage Campaign",
                            img: require("@/assets/images/dummy/gsrsu020101_3.png"),
                            desc: "Since 2018, GS Retail has established document management standards and has been fostering a paperless culture that minimizes printing for internal reporting and other business processes.<br />In addition, the Company encourages employees to refrain from using disposable cups in the office and to use reusable mugs, running campaigns that include offering free coffee when employees use a mug."
                        },
                        {
                            tit: "Employee Environmental Training",
                            img: require("@/assets/images/dummy/gsrsu020101_4.png"),
                            desc: "To enhance environmental awareness and capabilities among all employees, ESG and environmental training is offered as mandatory education for all staff. In addition to environmental training, GS Retail has been running hands-on initiatives that employees can directly experience and connect with, such as an annual used home appliance collection campaign on Resource Recycling Day starting in 2024, to strengthen employees' environmental competencies."
                        }
                    ],
                    GreenStore: {
                        // 상단 인트로
                        IntroImg: require("@/assets/images/dummy/gsrsu020102_1.png"),
                        Title: "Green Store Certification",
                        Desc: "GS Retail is working to build eco-friendly stores in order to reduce the environmental impact generated at its retail locations. Eco-friendly technologies, materials, and designs are incorporated throughout the interior and exterior of these stores, organized around three themes: Energy Saving and Natural Recycling, Safety and Assurance Technology, and Green Eco Design.<br />In 2021, three GS25 stores received Green Store Certification, and one store obtained Green Building Certification. In particular, GS25 Dongducheon Songnae Branch became the first private-sector remodeled building to receive the highest grade, 'Excellent (Green Grade 1)', under the Green Building Certification. GS Retail will continue to expand its eco-friendly store network.",
                        
                        // 3대 핵심 테마 카드
                        Features: [
                            {
                                tit: "Energy Saving and Natural Recycling",
                                desc: "Solar power generators, SEMS, parallel energy-saving devices, automatic lighting and illuminance sensors, high-efficiency energy-saving refrigeration units, refrigeration eco-covers, and Low-E glass",
                            },
                            {
                                tit: "Safety and Assurance Technology",
                                desc: "Eco-friendly materials, sterilizers, air purifiers, refrigeration units with eco-friendly refrigerants, and disability assistance call buttons",
                            },
                            {
                                tit: "Green Eco Design",
                                desc: "Eco-friendly installations and green activity videos displayed on in-store signage",
                            }
                        ],

                        // 하단 상세 시스템
                        Systems: [
                            {
                                tit: "SEMS (Smart store Energy Management System)",
                                img: require("@/assets/images/dummy/gsrsu020102_2.png"),
                                desc: "This smart energy management system integrates IoT technology with electrical equipment and devices in stores, enabling headquarters' main server or franchise owners/staff to manage store power consumption anytime, anywhere via smartphone. It plays a crucial role in environmental management by remotely controlling heating and cooling systems to regulate indoor temperature, and by managing total energy consumption through alerts for power anomalies."
                            },
                            {
                                tit: "Convenience Store Auto DR (Demand Response)",
                                img: require("@/assets/images/dummy/gsrsu020102_3.png"),
                                desc: "The 'Demand Response (DR)' system is a scheme in which the Korea Power Exchange requests reductions in electricity usage during peak demand periods, and participating users receive incentives accordingly. The 'Automatic Demand Response (Auto DR)' system introduced at GS25 stores is an advanced form of this scheme, characterized by its ability to automatically control in-store facilities through integration with IoT-enabled remote control devices (SEMS). The automated system enhances operational efficiency during demand control periods, while also contributing to franchisee profitability by providing demand reduction incentives in addition to the electricity savings benefits."
                            }
                        ] 
                    },
                    GreenProduct:{
                        greenSave : {
                            img: require("@/assets/images/dummy/gsrsu020103_1.png"),
                            tit: `Sustainable Products`,
                            sesc1: `GS Retail strives to promote customers' green consumption through the development and introduction of environmentally friendly products. In particular, among the products it handles, GS Retail has defined as 'sustainable products' those that have obtained third-party eco-friendly certifications for the inherent characteristics of the product itself or its packaging. Sustainable products consist of products with low environmental impact arising from their raw materials, packaging, or entire product life cycle.`/* 260604 번역 */,
                            sesc2: `In addition, we have created an integrated eco-friendly activity identity called Green Save, and have established standards for improving our own packaging, striving to expand green products.`/* 260604 번역 */,
                        },
                        ecofriendly : {
                            img: require("@/assets/images/dummy/gsrsu020103_2.png"),
                            tit: `Eco-Friendly Packaging`,
                            sesc1: `To minimize the environmental impact of product delivery, GS Retail has introduced FSC-certified eco-friendly delivery boxes and is currently operating them.`,
                            sesc2: `For same-day delivery, reusable bags are used, and the Company is expanding its efforts to reduce environmental impact by enabling customers to reuse them according to their needs.`,
                        },
                        originmana : {
                            img: require("@/assets/images/dummy/gsrsu020103_3.png"),
                            tit: `Origin Management System`,
                            sesc1: `As the first in the retail industry to apply blockchain technology to specific agricultural products, GS Retail systematically manages the complete traceability record from production to distribution. First applied to 'Sanjiae Apples', this technology enables verification of the apple's origin, grower, and cultivation, storage, sorting, and packaging conditions can be verified.<br />Origin tracking systems are also partially applied to livestock and seafood products. In addition, for some health food products, raw material inspections are conducted to ensure product safety.`,
                        },
                        procurementpolicy : {
                            img: require("@/assets/images/dummy/gsrsu020103_4.png"),
                            tit: `Responsible Raw Materials: Sustainable Procurement Policy`,
                            sesc1: `GS Retail has established and strives to comply with a sustainable procurement policy in order to fulfill its social responsibilities throughout the procurement of consumables and raw materials.`,
                        },
                        guideline : {
                            tit: `Sustainable Procurement Policy`,
                            desc:`In order to actively practice ESG management through green purchasing activities, we comply with the following policies.`/* 260604 번역 */,
                            num1:`First`/* 260604 번역 */,
                            txt1:`Through active green purchasing activities, we establish and expand environmental management, providing eco-friendly value to our customers and fulfilling our social responsibility and role as a leading eco-friendly company.`/* 260604 번역 */,
                            num2:`Second`/* 260604 번역 */,
                            txt2:`We share and encourage our green purchasing policy with Partner Companies and partner companies.`/* 260604 번역 */,
                            num3:`Third`/* 260604 번역 */,
                            txt3:`All purchasing activities shall give priority to green purchasing. However, cases where green purchasing is not possible (e.g., unavailability of supply, deterioration of quality, absence of eco-friendly/green products) shall be exceptions.`/* 260604 번역 */,
                            num4:`Fourth`/* 260604 번역 */,
                            txt4:`We conduct regular monitoring and evaluation of green purchasing activities and make improvements where necessary.`/* 260604 번역 */,
                            btn_txt:`View Full Text >`
                        }
                        
                    }

                }
            }
        };
    },
    computed: { 
        t() { 
            // langData가 없거나, 해당 언어 데이터가 없을 경우를 모두 대비
            const data = this.langData[this.lang] || this.langData.ko;
            return data || {}; 
        } 
    },
    methods: {
        onTabChange1(idx) {
            this.CTabIdx = idx;
            this.InnerTabIdx = 0;
        },
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
/* 1. Layout & Utils */
.main-container { width: 100%; position: relative; background-color: #ffffff; }
.tab_wrap :deep(ul.type_02){margin-top:24px;}

.panel{margin-top:80px;}
/* 2. Visual Area */
.title_wrap { display: block; width: 100%; height: 480px; padding: 160px 0; background: url('/src/assets/images/dummy/gsrsu0201_bg.png') no-repeat center / cover; position: relative; }
.page-title { color: #FFFFFF; font-size: 72px; font-weight: 700; letter-spacing: -1.44px; text-align: center; }
.visual-sub { margin-top: 10px; color: #FFFFFF; font-size: 32px; font-weight: 700; text-align: center; }

/* 3. Typography */
h3 { color: #161616; font-size: 40px; font-weight: 700; line-height: 1.3; }
h4 { color: #161616; font-size: 32px; font-weight: 700; line-height: 1.3; margin-bottom: 12px; }
p { color: #161616; font-size: 20px; line-height: 1.45; word-break: keep-all; }
/* .intro_view{margin-bottom:40px;} */
.intro_view p {font-size: 24px; font-weight: 400; line-height: 1.5; }
.climate_change .intro_view p { font-size: 32px; font-weight: 700; line-height: 1.3; }

/* 4. Cards & Grid (시안 반영) */
.image_wrap {max-width: 100%; display: flex; justify-content: center; background: #fff; border-radius: 20px; overflow: hidden; }
.image_wrap img { width: 100%; height: 100%; object-fit: cover; }
.strategy_section .title_area {margin-bottom:80px;}
.strategy_section .image_wrap {width: clamp(100px, 100%, 752px); margin:0 auto; } 
.system_section .title_area {margin-bottom:32px;}
.system_section .image_wrap {width: clamp(100px, 100%, 1060px); margin:0 auto;}
.intro_view{margin-bottom:80px;}


/* Policy Card */
.policy_card_box {padding: 60px; background-color: #F8F8F8; border-radius: 20px; }
.policy_card_box h4 { font-size: 40px; }
.policy_card_box .title_area p { font-size: 24px; }
.policy_card_box ul { margin-top: 24px;  }
.policy_card_box li { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 24px; letter-spacing: -1%; }
.policy_card_box li strong { color: #161616; font-size: 20px; font-weight: 700; white-space: nowrap; }
.policy_card_box li span { color: #161616; font-size: 20px; line-height: 1.35; }

/* Wide Card (바다숨) */
.wide_card {margin-bottom:120px; padding: 60px; background: #F8F8F8; border-radius: 20px; display: flex; align-items: flex-start; gap: 40px;  }
.wide_card .image_wrap { flex: 0 0 500px; height: 320px; }
.wide_card .text_group { flex: 1; display: flex; flex-direction: column; gap: 40px; }
.wide_card .btn_icon_arrow {width:180px;}

/* 5. Sub Grid (2열 그리드 구현) */
.sub_grid_container { display: flex; flex-wrap: wrap; gap: 80px 40px; }
.grid_item { width: calc(50% - 20px); display: flex; flex-direction: column; gap: 32px; }
.grid_item .image_wrap { height: 360px; }
.btn_icon.btn_xl.after {width:fit-content}

/* [추가] 그린 밸류체인 (제공해주신 style.css 기반 레이아웃) */

.value_grid { display: flex; flex-wrap: wrap; gap: 80px 40px; }
.value_item { width: calc(50% - 20px); display: flex; flex-direction: column; gap: 32px; }
.mask_group { width: 100%; height: 360px; border-radius: 20px; overflow: hidden; background: #f8f8f8; }
.mask_group img { width: 100%; height: 100%; object-fit: cover; }
.sub_title_area { display: flex; flex-direction: column; gap: 12px; }
.text_wrapper { font-size: 32px; font-weight: 700; color: #161616; line-height: 1.3; }
.desc_p { font-size: 20px; font-weight: 400; color: #161616; line-height: 1.6; word-break: keep-all; }

/* 그린스토어 메인 레이아웃 */
.green_store { width: 100%; margin-top: 80px; }
.green_store h3 {margin-top:40px; margin-bottom:16px;}
.green_store h4 {margin-top:32px;}

/* Intro */
.intro_section{margin-bottom:80px;}
.main_frame { width: 100%; height: 340px; border-radius: 20px; overflow: hidden; }
.main_frame img { width: 100%; height: 100%; object-fit: cover; }

/* 3대 테마 카드 (box .key-features & .card 기반) */
/* Key Features (ul, li 스타일) */
.key_features_grid { width: 100%; padding: 0; display: flex; gap: 20px; }
.key_features_grid li { height: 300px; padding: 42px 32px 32px; background-color: #F8F8F8; border-radius: 12px; position:relative; display:flex; flex-direction:column; justify-content:space-between; align-items: flex-end; flex: 1; overflow: hidden;}
.key_features_grid li::after {content:''; width:72px; height:72px; background:red; position:absolute; right:32px; bottom:32px}
.key_features_grid li:first-child::after { background: url('/src/assets/images/sub/icon_solar_panel.png') no-repeat center / contain; }
.key_features_grid li:nth-child(2)::after { background: url('/src/assets/images/sub/icon_recycle.png') no-repeat center / contain; }
.key_features_grid li:nth-child(3)::after { background: url('/src/assets/images/sub/icon_eco_design.png') no-repeat center / contain; }
.card_content { width: 100%; display: flex; flex-direction: column; gap: 16px; text-align: left; }
.card_content strong { font-size: 24px; font-weight: 700; color: #161616; line-height: 1.35; }
.card_content p { font-size: 1.8rem; font-weight: 400; color: #67676f; line-height: 1.4; }

/* 시스템 상세 그리드 (frame-3 & frame-4 기반) */
.system_detail_grid { display: flex; gap: 40px; width: 100%; }
.system_item { flex: 1; display: flex; flex-direction: column; }
.system_item .mask_group { width: 100%; height: 360px; border-radius: 20px; overflow: hidden; }
.system_item h4 { font-size: 32px; font-weight: 700; color: #161616; text-align: left; }
.system_item p { font-size: 20px; color: #161616; line-height: 1.6; text-align: left; }


/* 그린 프로덕트 컨테이너 */
.green_product { width: 100%; margin-top: 80px; }
.green_product > ul {display: flex; flex-direction: column;}
.green_product li.two_divide {margin-top:80px; display: flex; gap: 40px; align-items: flex-start; }
.green_product li.two_divide > div { flex: 1; display: flex; flex-direction: column; gap: 32px; }
.green_product li.two_divide + li{margin-top:120px;}
.green_product li.two_divide .image_wrap { width: 100%; height: 360px; border-radius: 20px; overflow: hidden; }

.green_product > ul > li:last-of-type h4 {margin-top:40px;}
.green_product > ul li div h4 + p {margin-bottom:20px;}
.green_product .image_wrap img { width: 100%; height: 100%; object-fit: cover;}

/* 7. Responsive */
@media screen and (max-width: 1024px) {
    .mt100 { margin-top: 60px; }
    .key_features_grid { overflow-x: auto; }
    .key_features_grid li {width: 300px; height: 240px; flex: none;}
    .key_features_grid li::after {content:''; width:36px; height:36px; background:red; position:absolute; right:32px; bottom:32px}
    .key_features_grid li .card_content {gap: 18px;}
    .key_features_grid li .card_content strong { font-size: 18px; }
    .key_features_grid li .card_content p { font-size: 14px !important; }
    .card_content { flex: 0 0 100%; height: auto; gap: 24px; }
    .system_detail_grid { flex-direction: column; }
 
    .green_product li.two_divide { flex-direction: column; gap: 32px; }
    .green_product li.one_divide .image_wrap, .green_product li.two_divide .image_wrap { flex: 0 0 auto; width: 100%; height: auto;}
}
@media screen and (max-width: 768px) {
    .cont_inner {padding-top:80px;}
    
    .title_wrap {display:none;}
    .tab_wrap :deep(ul.type_02){margin-top:16px;}
    .panel{margin-top:60px;}
    h3, h4, .policy_card_box h4, .climate_change .intro_view p { font-size: 2.4rem !important;}
    .intro_view {margin-bottom:40px;}
    p, .policy_card_box p, .intro_view p { font-size: 16px !important; }
    .title_wrap { height: auto; padding: 60px 20px; }
    .page-title { font-size: 40px; }
    .visual-sub { font-size: 20px; }
    .intro_view{margin-bottom:40px;}
    .intro_section{margin-bottom:40px;}
    .policy_card_box { padding: 30px 20px; }
    .policy_card_box li { flex-direction: column; }
    .wide_card {margin-bottom:80px; flex-direction: column; padding: 30px 20px; }
    .wide_card .text_group button { width:100% }
    .wide_card .image_wrap { flex: 0 0 auto; width: 100%; height: auto; }
    .wide_card .btn_icon_arrow {width:100%;}
    .sub_grid_container { gap: 40px; }
    .grid_item { width: 100%; }
    .strategy_section .image_wrap, .system_section .image_wrap {width:100%; margin:0 auto;}
    .mb200 {margin-bottom:80px !important;}
    .btn_icon.btn_xl.after, .green_product .policy_card_box .ac .btn_icon_arrow.btn_xl { width: 100%; }
    .value_grid { gap: 40px; }
    .text_wrapper { font-size: 24px !important; }
    .desc_p { font-size: 16px !important; }
    .value_item {width:100%; gap:16px;}
    .green_store { margin-top: 40px; }
    .main_frame { height: 178px; }
    .feature_card strong { font-size: 20px; }
    .feature_card p { font-size: 16px; }
    .system_item h4 { font-size: 24px !important; }
    .system_item p { font-size: 16px !important; }
    .green_product h4 { font-size: 24px !important; }
    .green_product p { font-size: 16px !important; }
    .green_product > ul > li:last-of-type, .green_product li.two_divide {margin-top:40px;}
    .modal_wrap .modal_container {padding:20px;}
    .strategy_section .title_area{margin-bottom:32px;}
    .policy_card_box li{margin-bottom:16px;}
    .policy_card_box li strong{font-size: 1.6rem;line-height: 1.24}
    .policy_card_box li span{font-size: 1.4rem;line-height: 1.4;}
    .mask_group, .grid_item .image_wrap{height:auto;}
    .sub_title_area{gap:0px;}
}
</style>