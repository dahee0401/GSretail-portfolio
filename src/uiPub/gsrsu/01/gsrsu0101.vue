<template>
    <div class="main-container">
        <div class="title_wrap tac top_visual">
            <h2 class="page_title">{{ t.MainTitle }}</h2>
        </div>

        <!-- gsrbr010101 맥락: brand_content ≈ content, Tabs 나열 후 v-show 패널 -->
        <div class="content">
            <Tabs v-model="CTabIdx" :tab-items="t.Tabs1" tab-class="type_01" :tab-slide="true" @change="onTabChange1" />
            <Tabs
                v-if="CTabIdx === 1"
                v-model="CTabIdxEsgArchive"
                :tab-items="t.TabsEsgArchive"
                tab-class="type_02"
                :tab-slide="true"
                @change="onEsgArchiveTabChange"
            />
        
            <!-- 비전&전략 -->
            <div v-show="CTabIdx === 0" class="panel panel_vision_strategy" :aria-label="t.Tabs1?.[0]?.item || ''">
              
                <p class="tab_desc">{{ t.MainDesc }}</p>
                <div class="sec_vision_together">
                    <div class="img_wrapper">
                        <picture>
                            <source media="(max-width: 768px)" :srcset="imgSr01Mo" />
                            <img :src="imgSr01" :alt="t.VisionMainTitle" />
                        </picture>
                    </div>
                </div>
                <section>
                    <header class="sub_header">
                        <h3>{{ t.esgTitle }}</h3>
                        <p>{{ t.esgDesc }}</p>
                    </header>
                    <div class="esg_process" :aria-label="t.esgProcessTitle">
                        <ol class="esg_flow">
                            <li v-for="(item, idx) in t.esgFlowItems" :key="'flow-' + idx" class="esg_flow_step">
                                <div class="esg_flow_card" :class="{ final: idx === t.esgFlowItems.length - 1 }">
                                    <header class="esg_flow_card_head">
                                        <strong class="esg_flow_card_title" v-html="item.title"></strong>
                                        <p v-if="item.meta" class="esg_flow_card_meta" v-html="item.meta"></p>
                                    </header>
                                    <p class="esg_flow_card_desc" v-html="item.desc"></p>
                                </div>
                                <div v-if="idx < t.esgFlowItems.length - 1" class="esg_flow_connector" aria-hidden="true">
                                    <p><span class="esg_flow_connector_text">{{ item.connectorLeft }}</span></p>
                                    <p><span class="esg_flow_connector_text">{{ item.connectorRight }}</span></p>
                                </div>
                            </li>
                        </ol>
                        <p class="esg_flow_note">{{ t.esgFlowNote }}</p>
                    </div>
                    <div class="esg_committee_table" :aria-label="t.esgTableHeader">
                        <table>
                            <thead>
                                <tr>
                                    <th colspan="2">{{ t.esgTableHeader }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(leftItem, idx) in t.esgTableLeftItems" :key="'tbl-row-' + idx">
                                    <td>{{ leftItem }}</td>
                                    <td>{{ t.esgTableRightItems[idx] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section>
                    <header class="sub_header">
                        <h3>{{ t.bnbpTitle }}</h3>
                    </header>
                    <div class="bnbp_wrapper">
                        <div class="bnbp_main">
                            <div class="img_wrapper"><img :src="imgBnbpLogo" :alt="t.esgCommitteeDetailImageAlt"></div>
                            <div class="txt_box">
                                <p v-for="(item, idx) in t.esgBnbpContents" :key="idx">
                                    {{ item }}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!-- ESG 자료실 -->
            <div v-show="CTabIdx === 1" class="panel" :aria-label="t.Tabs1?.[1]?.item || ''">
                <div v-show="CTabIdxEsgArchive === 0" class="panel_inner" :aria-label="t.TabsEsgArchive?.[0]?.item || ''">
                    <header class="sub_header sub_header_center">
                        <h3>{{ t.tab2.stab1.title }}</h3>
                        <p class="tab_desc">{{ t.tab2.stab1.desc }}</p>
                    </header>
                    <div class="table_wrap type1">
                        <table class="base_table">
                            <colgroup>
                                <col style="width: 150px;" />
                                <col style="width: auto;" />
                                <col style="width: 200px;" />
                            </colgroup>
                            <tbody>
                                <tr v-for="(item, idx) in t.EnvMgmtListData" :key="'env-doc-' + idx">
                                    <td class="ac">{{ item.id }}</td>
                                    <td class="al">
                                        <a href="javascript:void(0);" class="link_title">{{ item.title }}</a>
                                    </td>
                                    <td class="ac">
                                        <button type="button" class="btn_download_file" @click="handleEnvMgmtDownload(item.link)">
                                            <span class="file_type_text">{{ item.fileType || "PDF" }}</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="!t.EnvMgmtListData || t.EnvMgmtListData.length === 0">
                                    <td colspan="3" class="ac py80">{{ t.EnvMgmtNoDataText }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination_area">
                        <Pagination v-model="envMgmtPage" :total-pages="envMgmtTotalPages" @change="onEnvMgmtPageChange" />
                    </div>
                </div>
                <div v-show="CTabIdxEsgArchive === 1" class="panel_inner" :aria-label="t.TabsEsgArchive?.[1]?.item || ''">
                    <header class="sub_header sub_header_center">
                        <h3>{{ t.tab2.stab2.title }}</h3>
                        <p class="tab_desc">{{ t.tab2.stab2.desc }}</p>
                    </header>
                    <div class="table_wrap type1">
                        <table class="base_table">
                            <colgroup>
                                <col style="width: 150px;" />
                                <col style="width: auto;" />
                                <col style="width: 200px;" />
                            </colgroup>
                            <tbody>
                                <tr v-for="(item, idx) in t.EnvMgmtListData" :key="'env-doc-' + idx">
                                    <td class="ac">{{ item.id }}</td>
                                    <td class="al">
                                        <a href="javascript:void(0);" class="link_title">{{ item.title }}</a>
                                    </td>
                                    <td class="ac">
                                        <button type="button" class="btn_download_file" @click="handleEnvMgmtDownload(item.link)">
                                            <span class="file_type_text">{{ item.fileType || "PDF" }}</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="!t.EnvMgmtListData || t.EnvMgmtListData.length === 0">
                                    <td colspan="3" class="ac py80">{{ t.EnvMgmtNoDataText }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="pagination_area">
                        <Pagination v-model="envMgmtPage" :total-pages="envMgmtTotalPages" @change="onEnvMgmtPageChange" />
                    </div>
                </div>

                <div v-show="CTabIdxEsgArchive === 2" class="panel_inner" :aria-label="t.TabsEsgArchive?.[2]?.item || ''">
                    <div class="table_wrap type2">
                        <table class="base_table">
                            <colgroup>
                                <col style="width: 220px;" />
                                <col style="width: 245px;" />
                                <col style="width: 245px;" />
                                <col style="width: 245px;" />
                                <col style="width: 245px;" />
                                <col style="" />
                            </colgroup>
                            <thead>
                                <tr v-for="(item, idx) in t.tab2.stab3.tableTitle" :key="'ir-'+idx">
                                    <th :class="item.class1" v-if="item.rs1 > 0" :rowspan="item.rs1" :colspan="item.cs1 || 1">{{ item.title1 }}</th>
                                    <th :class="item.class2" v-if="item.rs2 > 0" :rowspan="item.rs2" :colspan="item.cs2 || 1">{{ item.title2 }}</th>
                                    <th :class="item.class3" v-if="item.rs3 > 0" :rowspan="item.rs3" :colspan="item.cs3 || 1">{{ item.title3 }}</th>
                                    <th :class="item.class4" v-if="item.rs4 > 0" :rowspan="item.rs4" :colspan="item.cs4 || 1">{{ item.title4 }}</th>
                                    <th :class="item.class5" v-if="item.rs5 > 0" :rowspan="item.rs5" :colspan="item.cs5 || 1">{{ item.title5 }}</th>
                                    <th :class="item.class6" v-if="item.rs6 > 0" :rowspan="item.rs6" :colspan="item.cs6 || 1">{{ item.title6 }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, idx) in t.tab2.stab3.tableData" :key="'ir-'+idx">
                                    <th class="ac bold">{{ item.title }}</th>
                                    <td class="ac">{{ item.item1 }}</td>
                                    <td class="ac">{{ item.item2 }}</td>
                                    <td class="ac">{{ item.item3 }}</td>
                                    <td class="ac">{{ item.item4 }}</td>
                                    <td class="ac bold">{{ item.item5 }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <ul class="list_dotted">
                        <li v-for="(item, idx) in t.tab2.stab3.listData" :key="'ir-'+idx">
                            <p>{{ item.desc }}</p>
                        </li>
                    </ul>
                </div>

                <div v-show="CTabIdxEsgArchive === 3" class="panel_inner" :aria-label="t.TabsEsgArchive?.[3]?.item || ''">
                    <header class="sub_header sub_header_center">
                        <h3>{{ t.tab2.stab4.title }}</h3>
                        <p class="tab_desc">{{ t.tab2.stab4.desc }}</p>
                    </header>
                    <div class="social_award_wrap">
                        <div class="table_wrap type3">
                            <table class="base_table">
                                <colgroup>
                                    <col style="width: 120px;" />
                                    <col style="width: 150px;" />
                                    <col style="width: 470px;" />
                                    <col style="width: 300px;" />
                                    <col style="" />
                                </colgroup>
                                <thead>
                                    <tr v-for="(item, idx) in t.tab2.stab4.tableTitle" :key="'ir-'+idx">
                                        <th class="ac">{{ item.title1 }}</th>
                                        <th class="ac">{{ item.title2 }}</th>
                                        <th class="ac">{{ item.title3 }}</th>
                                        <th class="ac">{{ item.title4 }}</th>
                                        <th class="ac">{{ item.title5 }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in t.tab2.stab4.tableData" :key="'ir-'+idx">
                                        <th class="ac" v-if="item.rs1 > 0" :rowspan="item.rs1">{{ item.title }}</th>
                                        <td class="ac m_label">{{ item.item1 }}</td>
                                        <td class="al">{{ item.item2 }}</td>
                                        <td class="al">{{ item.item3 }}</td>
                                        <td class="al">{{ item.item4 }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Accordion :multiple="false" class="social_award_acc">
                            <AccordionItem item-key="social-award-1">
                                <template #title>{{ t.tab2.stab4.acctitle1 }}</template>
                                <div class="table_wrap type3">
                                    <table class="base_table">
                                        <colgroup>
                                            <col style="width: 120px;" />
                                            <col style="width: 150px;" />
                                            <col style="width: 470px;" />
                                            <col style="width: 300px;" />
                                            <col style="" />
                                        </colgroup>
                                        <tbody>
                                            <tr v-for="(item, idx) in t.tab2.stab4.tableData2" :key="'ir-'+idx">
                                                <th class="ac" v-if="item.rs1 > 0" :rowspan="item.rs1">{{ item.title }}</th>
                                                <td class="ac m_label">{{ item.item1 }}</td>
                                                <td class="al">{{ item.item2 }}</td>
                                                <td class="al">{{ item.item3 }}</td>
                                                <td class="al">{{ item.item4 }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </AccordionItem>
                            <AccordionItem item-key="social-award-2">
                                <template #title>{{ t.tab2.stab4.acctitle2 }}</template>
                                <div class="table_wrap type3">
                                    <table class="base_table">
                                        <colgroup>
                                            <col style="width: 120px;" />
                                            <col style="width: 150px;" />
                                            <col style="width: 470px;" />
                                            <col style="width: 300px;" />
                                            <col style="" />
                                        </colgroup>
                                        <tbody>
                                            <tr v-for="(item, idx) in t.tab2.stab4.tableData3" :key="'ir-'+idx">
                                                <th class="ac" v-if="item.rs1 > 0" :rowspan="item.rs1">{{ item.title }}</th>
                                                <td class="ac m_label">{{ item.item1 }}</td>
                                                <td class="al">{{ item.item2 }}</td>
                                                <td class="al">{{ item.item3 }}</td>
                                                <td class="al">{{ item.item4 }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </AccordionItem>
                            <AccordionItem item-key="social-award-3">
                                <template #title>{{ t.tab2.stab4.acctitle3 }}</template>
                                <div class="table_wrap type3">
                                    <table class="base_table">
                                        <colgroup>
                                            <col style="width: 120px;" />
                                            <col style="width: 150px;" />
                                            <col style="width: 470px;" />
                                            <col style="width: 300px;" />
                                            <col style="width: 380px;" />
                                        </colgroup>
                                        <tbody>
                                            <tr v-for="(item, idx) in t.tab2.stab4.tableData4" :key="'ir-'+idx">
                                                <th class="ac" v-if="item.rs1 > 0" :rowspan="item.rs1">{{ item.title }}</th>
                                                <td class="ac m_label">{{ item.item1 }}</td>
                                                <td class="al">{{ item.item2 }}</td>
                                                <td class="al">{{ item.item3 }}</td>
                                                <td class="al">{{ item.item4 }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>

            <!-- 지속가능경영보고서 — Figma 431:13093 -->
            <div v-show="CTabIdx === 2" class="panel panel_sustainability_report" :aria-label="t.Tabs1?.[2]?.item || ''">
                <section class="sec_sustain_report_hero" aria-labelledby="sustain_report_feature_heading">
                    <figure>
                        <img :src="imgSr07" :alt="t.sustainReportHeroCoverAlt" width="465" height="280" />
                    </figure>
                    <article>
                        <header class="sub_header">
                            <h3 id="sustain_report_feature_heading">{{ t.sustainReportHeroTitle }}</h3>
                            <p>{{ t.sustainReportHeroPeriod }}</p>
                        </header>
                        <p>{{ t.sustainReportHeroLead }}</p>
                        <div class="sustain_report_hero_actions" :aria-label="t.sustainReportHeroNavAria">
                            <Buttons tag="a" :href="t.sustainReportHeroKoHref" btn-class="btn_icon btn_big after border btn_download_file">{{ t.sustainReportKoBtn }}</Buttons>
                            <Buttons tag="a" :href="t.sustainReportHeroEnHref" btn-class="btn_icon btn_big after border btn_download_file">{{ t.sustainReportEnBtn }}</Buttons>
                        </div>
                    </article>
                </section>
                <section class="sec_sustain_report_archive" aria-labelledby="sustain_report_archive_heading">
                    <header class="sub_header">
                        <h3 id="sustain_report_archive_heading">{{ t.sustainReportArchiveTitle }}</h3>
                    </header>
                    <div class="table_wrap type_report">
                        <table>
                            <colgroup>
                                <col style="width: 236px" />
                                <col style="width: auto" />
                                <col style="width: 200px" />
                            </colgroup>
                            <tbody>
                                <tr v-for="row in sustainReportPastRowsWithThumbs" :key="row.key">
                                    <td>
                                        <figure>
                                            <picture>
                                                <source media="(max-width: 768px)" :srcset="row.thumbSrcMo" />
                                                <img :src="row.thumbSrc" :alt="row.coverAlt" />
                                            </picture>
                                        </figure>
                                    </td>
                                    <td>
                                        <article>
                                            <h3>{{ row.title }}</h3>
                                            <p>{{ row.period }}</p>
                                        </article>
                                    </td>
                                    <td>
                                        <Buttons tag="a" :href="row.koHref" btn-class="btn_icon btn_big after border btn_download_file">{{ t.sustainReportKoBtn }}</Buttons>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import Pagination from "@/components/Pagination.vue";
import Accordion from "@/components/Accordion.vue";
import AccordionItem from "@/components/AccordionItem.vue";
import Buttons from "@/components/Buttons.vue";
import imgSr01 from "@/assets/images/dummy/gsrsu0101_01.png";
import imgSr01Mo from "@/assets/images/dummy/mo/gsrsu0101_01_mo.png";
import imgBnbpLogo from "@/assets/images/dummy/gsrsu0101_02.png";
import imgSr03 from "@/assets/images/dummy/gsrsu0101_03.png";
import imgSr04 from "@/assets/images/dummy/gsrsu0101_04.png"; 
import imgSr05 from "@/assets/images/dummy/gsrsu0101_05.png";
import imgSr06  from "@/assets/images/dummy/gsrsu0101_06.png";
import imgSr03Mo from "@/assets/images/dummy/mo/gsrsu0101_03_mo.png";
import imgSr04Mo from "@/assets/images/dummy/mo/gsrsu0101_04_mo.png"; 
import imgSr05Mo from "@/assets/images/dummy/mo/gsrsu0101_05_mo.png";
import imgSr06Mo  from "@/assets/images/dummy/mo/gsrsu0101_06_mo.png";
import imgSr07 from "@/assets/images/dummy/gsrsu0101_07.png";

const sustainReportThumbByRow = [imgSr03, imgSr04, imgSr05, imgSr06];
const sustainReportThumbMoByRow = [imgSr03Mo, imgSr04Mo, imgSr05Mo, imgSr06Mo];

export default {
    name: "gsrsu0101",
    components: { Tabs, Pagination, Accordion, AccordionItem, Buttons },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            CTabIdx: 0,
            CTabIdxEsgArchive: 0,
            envMgmtPage: 1,
            envMgmtTotalPages: 5,
            imgSr01,
            imgSr01Mo,
            imgBnbpLogo,
            imgSr07,
            langData: {
                ko: {
                    MainTitle: "지속가능경영",
                    MainDesc: "GS리테일은 통합 GS리테일 출범 이후 지속가능한 기업의 가치 창출을 위해\n‘Green Life Together’라는 ESG 비전을 수립하였습니다.\n이 중장기 비전이 실행될 수 있도록 환경과 사회의 세부 전략 및 과제를 추진하고 있으며,\n이행 현황과 지속가능한 경영의 성과를 이해관계자와 지속 소통해가겠습니다.",
                    Tabs1: [{ item: "비전&전략" }, { item: "ESG 자료실" }, { item: "지속가능경영보고서" }],
                    TabsEsgArchive: [
                        { item: "환경경영 자료" },
                        { item: "상생경영 자료" },
                        { item: "ESG성과" },
                        { item: "사회공헌 수상내역" },
                    ],

                    // [Tab 1] 비전&전략
                    VisionTogetherAria: "Green Life Together — 환경·사회",
                    VisionMainTitle: "Green Life Together.",

                    // [Tab 1] 지배구조헌장 전체 데이터 (KO)
                    CharterTitle: "Green Life Together!", 
                    PolicyIntroTitle: "전문",
                    PolicyIntroDesc: "<p class='desc'>㈜GS리테일(이하 “회사”라 함.)은 건전한 기업지배구조 확립을 기반으로 하여, 모든 이해관계자와 신뢰를 구축하고, 끊임없는 도전으로 고객의 라이프 이노베이션(Life Innovation)을 선도하는 회사로 도약하고자 한다. 이러한 비전 달성을 위해 본 기업지배구조헌장을 제정한다.</p><p class='desc'>회사는 본 기업지배구조헌장에 따라, 주주의 권리 보장, 이사회의 역할과 책임, 전문 감사기구의 독립적 운영 등 회사의 건전한 지배구조를 확립하여, 공정하고 투명한 경영활동을 지향하며, 주주·고객·임직원 등 모든 이해관계자의 지속적인 권익 증진을 위해 노력한다.</p>",
                    PolicySections: [
                        {
                            title: "I. 주 주",
                            content: [
                                { subTitle: "1. 주주의 권리", list: [
                                    "① 주주는 회사의 소유자이며, 이익 분배에 참여 할 수 있는 권리, 주주총회 참석 및 의결권을 행사 할 수 있는 권리, 주주총회의 목적사항을 제안할 수 있는 권리 등 관련 법령이 보장하는 기본적인 권리를 보장 받는다.",
                                    "② 정관의 변경, 합병, 영업양수도 및 기업의 분할, 해산, 자본금의 감소 등 관련 법령이 정하는 사항 중 회사의 존립과 주주권에 중대한 변화를 가져오는 사항은 주주의 권리를 최대한 보장하여, 주주총회를 통해 결정한다.",
                                    "③ 회사는 주주총회의 결의가 투명하고 공정한 절차에 따라 이루어지도록 노력하며, 주주에 대하여 주주총회 참석 전에 주주총회의 일시와 장소 및 의안 의결권의 행사 방법 등에 관하여 충분한 정보를 제공한다.",
                                    "④ 주주권의 행사는 주주의 자유로운 의사에 따라 행사되어야 한다."
                                ]},
                                { subTitle: "2. 주주의 공평한 대우", list: [
                                    "① 주주는 1주 1의결권 원칙에 따라 권리를 보장 받는다. 단, 법령에 의거하여, 특정 주주의 의결권이 제한되는 경우, 관련 법령을 따른다. 회사는 상법 및 관련 법령이 정하는 기준에 따라 주주의 본질적인 권리가 훼손되지 않도록 공평하게 대우한다.",
                                    "② 회사는 주주에게 필요한 정보를 적시에 충분히 이해할 수 있도록 쉽게 구성하여, 공평한 방법으로 제공한다. 또한 부당한 내부거래 및 자기거래로부터 주주가 보호될 수 있도록 노력한다."
                                ]},
                                { subTitle: "3. 주주의 책임", list: [
                                    "① 주주는 회사의 발전과 이익을 위하여. 자신의 의결권을 적극적으로 행사하여야 한다.",
                                    "② 회사 경영에 영향력을 행사하는 지배주주는 회사와 다른 모든 주주의 이익을 고려하여 주주권을 행사하며, 그 지배권을 남용하여 다른 주주에게 손해가 발생하지 않도록 노력해야 한다."
                                ]}
                            ]
                        },
                        {
                            title: "II. 이 사 회",
                            content: [
                                { subTitle: "1. 이사회의 기능", list: [
                                    "① 이사회는 관련 법령에 의거하여, 경영에 대해 포괄적인 권한을 가지며, 회사와 주주의 이익을 위하여 회사의 기본적인 경영목표를 결정하고, 법령, 정관, 이사회 규정 등 관련 규정이 정하는 회사의 주요 의사 결정 사항에 대한 심의, 의결을 한다.",
                                    "② 이사회는 투명하고, 공정한 회사의 업무 수행 및 주주가치 훼손 방지를 위해 경영진의 활동을 감독한다.",
                                    "③ 이사회는 관련 법령, 정관, 이사회 규정 등에 의해, 위임이 허용되지 않는 주요한 사항을 제외하고, 대표이사 또는 이사회 내 위원회에 권한을 위임할 수 있다."
                                ]},
                                { subTitle: "2. 이사회의 구성", list: [
                                    "① 회사는 이사회에서 다양한 논의와 효율적인 의사결정이 가능하도록 6 인 이상의 이사로 이사회를 구성하며, 이사회 독립성 보장을 위해 사외이사는 이사회 구성원 총수의 과반수 이상으로 구성한다.",
                                    "② 이사회는 회사의 투명한 경영에 대한 감독기능을 강화하기 위하여 감사위원회를 설치하며, 각 상정 안건에 대한 객관적이고 전문적인 심의를 위해 기타 법령, 정관에서 정하는 바에 따라 이사회 내 위원회를 설치 할 수 있다."
                                ]},
                                { subTitle: "3. 이사의 선임", list: [
                                    "① 이사는 이사회 추천, 사외이사후보추천위원회 추천, 주주 추천 등의 방법을 통해 선정된 후보자에 대해, 주주총회 결의로 선임하며, 회사는 전문성이 충분히 검증된 후보자가 이사로 선임되어, 이사회 중심의 기업경영이 달성될 수 있도록 노력한다.",
                                    "② 대표이사는 주주총회에서 선임된 이사 중에서 이사회의 결의에 의하여 선임한다.",
                                    "③ 이사회 의장은 주주총회에서 선임된 이사 중 이사회의 결의로 선임하되, 대표이사와의 겸직을 지양한다."
                                ]},
                                { subTitle: "4. 이사의 자격", list: [
                                    "① 사내이사는 회사의 사업 내용과 관련된 풍부한 경험과 전문지식을 갖춰야하며, 회사의 발전과 주주가치의 제고에 기여할 수 있어야 한다.",
                                    "② 사외이사는 법조, 재무, 회계, 신사업, IT-TECH, 공공부문 등에서 충분한 식견과 전문성을 갖춘 자로, 회사와 중대한 이해관계가 없고, 독립성이 검증 되어야 한다."
                                ]},
                                { subTitle: "5. 이사회의 운영", list: [
                                    "① 이사회는 정기이사회와 필요에 따라 개최되는 임시이사회로 운영되며, 회사는 이사회의 원활한 운영을 위하여 이사회의 권한과 책임, 운영절차 등을 구체적으로 규정한 이사회 규정을 제정, 운영한다.",
                                    "② 회사는 이사회 내 위원회의 원활한 운영을 위하여 위원회의 권한과 책임, 운영절차 등을 구체적으로 규정한 위원회 규정을 제정, 운영한다.",
                                    "③ 회사는 이사회 회의의 경과 과정, 중요한 심의 내용을 기록한 의사록을 작성하고 이를 보관하여야 한다."
                                ]},
                            ]
                        },

                    ],
                    esgTitle: "ESG 거버넌스",
                    esgDesc: "GS리테일은 실천하는 ESG경영을 위해 실무조직으로 구성된 ESG자주연을 비롯해 이사회 내 ESG위원회 운영까지 ESG에 관한 거버넌스를 구축하여 운영하고 있습니다.",
                    esgFlowItems: [
                        {
                            title: "ESG위원회",
                            meta: "이사회內",
                            desc: "이사회 산하 ESG위원회를 통해 <br class='m_br'>ESG 관련 주요 안건 승인",
                            connectorLeft: "승인",
                            connectorRight: "보고",
                        },
                        {
                            title: "ESG 추진협의회",
                            meta: "CEO 및 C레벨 10인", 
                            desc: "CEO 주재 추진협의회를 통해 ESG관련 사항 의사결정", 
                            connectorLeft: "의사결정",
                            connectorRight: "의안상정",
                        },
                        {
                            title: "ESG 총괄사무국",
                            meta: "지속가능경영부문/<br class='m_br'>ESG파트", 
                            desc: "ESG 전담 실행 부서",
                            connectorLeft: "결과 공유",
                            connectorRight: "과제취합",
                        },
                        {
                            title: "ESG 실무협의체",
                            meta: "",
                            desc: "ESG 실행 점검 및 이슈 관련 빠른 협의",
                            connectorLeft: "결과 공유",
                            connectorRight: "과제협의/실행점검",
                        },
                        {
                            title: "BU별 ESG<br class='m_br'>자주연*",
                            meta: "",
                            desc: "ESG 과제 실행 조직 (과제 수립 및 실행)",
                            connectorLeft: "",
                            connectorRight: "",
                        },
                    ],
                    esgFlowNote: "* 자주연: 자기주도연구회",
                    esgTableHeader: "주요 분야별 위원회/협의회",
                    esgTableLeftItems: [
                        "[환경] 환경영향평가위원회",
                        "[임직원] 노사정협의회",
                        "[경영주] 경영주협의회",
                    ],
                    esgTableRightItems: [
                        "[파트너사] 파트너사 간담회",
                        "[개인정보] 정보보안위원회", 
                        "[사회공헌] 사회공헌 심의위원회",
                    ],
                    bnbpTitle: "BNBP(Biz N Biodiversity Platform) 이니셔티브",
                    esgCommitteeDetailImageAlt: "BNBP 로고 이미지",
                    esgBnbpContents: [
                        "BNBP(Biz N Biodiversity Platform) 는 기업들로 하여금 생물다양성 보전 및 이용에 대한 산업계의 국제적, 사회적 책임이 있음을 인식하게 하고, 기업 활동 전반에서 생물다양성을 보전하며 이를 지속가능하게 이용할 수 있도록 지원하고자 지난 2016년 설립된 이니셔티브 입니다.",
                        "GS리테일은 BNBP 가입을 통해, 기업의 생물다양성 보전에 대한 사회적 책임을 인식하고 함께 어우러져 사는 삶을 영위하기 위한 노력을 지속하겠습니다.",
                    ],
                    esgChangwonTitle: "창원이니셔티브",
                    esgChangwonContents: [
                        "2011년도 제10차 유엔사막화방지협약(United Nations Convention to Combat Desertification, UNCCD) 당사국 총회가 경상남도 창원에서 성공적으로 개최되었으며 성과 사업으로서 ‘창원 이니셔티브’가 출범하였습니다. 창원 이니셔티브는 UN 지속가능 발전 목표 (Sustainable Development Goal; SDG) 15.3에 해당하는 토지황폐화 중립에 기여하는데 중요한 역할을 하며 산림복원 사업의 추진을 지원하고 있습니다.",
                        "GS리테일은 ’21년 10월 창원 이니셔티브 출범 10주년을 맞이하여, 토지황폐화 방지에 지지와 참여를 선언하였습니다. 뿐만 아니라 산림청 그리고 UNCCD 사무국과 업무협약을 체결하여 토지황폐화를 방지하기 위한 활동들에 참여하고 있습니다. 구체적으로 마을 공동숲 조성 등 황사와 가뭄을 억제하기 위한 지역사회 참여 프로그램을 실시했습니다. 정부, 기업, 국제기구 및 시민단체와의 파트너십을 통해 산림 복원 사업을 시행함으로써 보다 효과적으로 지역사회의 환경을 개선하고 생물다양성을 보전하는데 기여하고 있습니다.",
                    ],

                    // [Tab 2] ESG 자료실
                    tab2: { 
                        stab1: {
                            title: "GS리테일의 환경 경영과 관련된 실적 자료를 열람하실 수 있습니다.",
                            desc: "본 자료는 이해관계자 및 기관, 주주들을 위해 공개된 GS리테일의 정보자산, 구성원들의 정보가 포함되어 있으므로\n용도 외 활용, 불법 유출 시에는 법에 의해 처벌을 받으실 수 있습니다.", 
                        },
                        stab2: {
                            title: "GS리테일의 상생 경영과 관련된 실적 자료를 열람하실 수 있습니다.",
                            desc: "본 자료는 이해관계자 및 기관, 주주들을 위해 공개된 GS리테일의 정보자산, 구성원들의 정보가 포함되어 있으므로\n용도 외 활용, 불법 유출 시에는 법에 의해 처벌을 받으실 수 있습니다.", 
                        },
                        stab3: {
                            tableTitle: [
                                { title1: "항목", title2: "KCGS", title3: "", title4: "", title5: "", title6: "서스틴 베스트", rs1: 2, cs1: 1, rs2: 1, cs2: 4, rs6: 2, cs6: 1, class1: "ac th_item", class2: "ac", class6: "ac th_sustin_best" },
                                { title1: "", title2: "종합등급", title3: "환경", title4: "사회", title5: "지배구조", title6: "", rs2: 1, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1, rs5: 1, cs5: 1, class2: "ac normal", class3: "ac normal", class4: "ac normal", class5: "ac normal" },
                            ],
                            tableData: [
                                { title: "2025", item1: "A+", item2: "A+", item3: "A+", item4: "A", item5: "AA" },
                                { title: "2024", item1: "A+", item2: "A+", item3: "A+", item4: "A", item5: "AA" },
                                { title: "2023", item1: "A", item2: "A+", item3: "A", item4: "A", item5: "A" },
                                { title: "2022", item1: "A", item2: "B+", item3: "A", item4: "A", item5: "-" },
                                { title: "2021", item1: "A", item2: "A", item3: "A", item4: "A", item5: "-" },
                            ],
                            listData: [
                                { desc: "평가기관: 한국기업지배구조원(Korea Corporate Governance Service, KCGS), 서스틴베스트(SUSTINVEST)" },
                                { desc: "ESG 평가: 회사의 ESG 수준에 대한 직관적 정보 제공 및 투자 의사결정 활용 지원을 목적으로 하여, 매년 평가 실시함." },
                            ],
                        },
                        stab4: {
                            title: "구성원, 경영주, 고객과 함께 GS나누미 봉사활동, 기부 등을 통해\n꾸준히 지역 사회와 함께한 나눔 활동을 소개합니다.",
                            desc: "2006년부터 구성원, 경영주, 고객과 함께 GS나누미 봉사활동, 기부 등을 통해 꾸준히 지역 사회와 함께하며\n나눔 활동을 지속적으로 함께하고 있습니다.\n앞으로도 일상에서 함께하는 따뜻한 나눔을 실천, 마음을 나누겠습니다.", 
                            tableTitle: [
                                { title1: "연도", title2: "구분", title3: "표창명", title4: "대회", title5: "소속" },
                            ],
                            tableData: [
                                { title: "2025", item1: "봉사", item2: "화성특례시의회 표창장", item3: "화성시남부종합사회복지관", item4: "편의점 3부문4지역 GS나누미", rs1: 2,},
                                { title: "", item1: "봉사", item2: "국회의원 표창장", item3: "2025년 창영복지인의 날", item4: "편의점 3부문4지역 GS나누미"},
                                { title: "2024", item1: "기부", item2: "한림화상재단 감사패(몸짱소방관 희망나눔 달력 캠페인)", item3: "한림화상재단", item4: "GS리테일", rs1: 4},
                                { title: "", item1: "봉사", item2: "우리모두복지재단 등촌9종합사회복지관 감사패", item3: "", item4: "GS나누미 조직문화서비스팀 직할 연합" },
                                { title: "", item1: "기부", item2: "제4회 대한민국 착한 기부자상 국무총리 표창장", item3: "행정안전부 주최", item4: "GS리테일" },
                                { title: "", item1: "봉사", item2: "사단법인 나눔과실천 표창장", item3: "화성시남부종합사회복지관", item4: "편의점 3부문4지역 GS나누미" },
                                { title: "2023", item1: "그외", item2: "경상북도지사 표창(정신건강 및 자살예방 사업 참여, 생명존중 문화 확산 기여)", item3: "", item4: "편의점사업부 5부문(박서우)", rs1: 8 },
                                { title: "", item1: "그외", item2: "전주시장 표창(자살예방 사업 적극 참여, 생명존중 문화 확산 기여)", item3: "", item4: "편의점사업부 4부문" },
                                { title: "", item1: "그외", item2: "강원특별자치도지사 표창(강원도정 발전 및 성공추진 공로", item3: "강원도 유공", item4: "GS리테일(곽용구 상무)" },
                                { title: "", item1: "기부", item2: "한림화상재단 감사패(몸짱소방관 희망나눔 달력 캠페인)", item3: "한림화상재단", item4: "GS리테일" },
                                { title: "", item1: "기부", item2: "영등포구 감사패(영등포 2023 희망온돌 따뜻한 겨울나기)", item3: "", item4: "GS리테일" },
                                { title: "", item1: "기부", item2: "강릉시 감사장(4월 강릉산불 구호물품 지원)", item3: "", item4: "GS리테일" },
                                { title: "", item1: "봉사", item2: "경기도 김포시 국회의원 표창장", item3: "김포시 자원봉사자의 날", item4: "수퍼 김포권 연합 GS나누미" },
                                { title: "", item1: "봉사", item2: "부평구노인복지관 관장 표창장", item3: "부평구노인복지관 자원봉사자의 날", item4: "수퍼 인천권 연합 GS나누미(부평)" },
                            ],
                            acctitle1: "2022년 ~ 2018년",
                            tableData2: [
                                { title: "2022", item1: "그외", item2: "경상북도지사 표창(소방 안전문화 확산 기여)", item3: "", item4: "편의점사업부 5부문(김민호)", rs1: 9 },
                                { title: "", item1: "기부", item2: "아름다운가게 20주년 감사헌정", item3: "", item4: "GS리테일" },
                                { title: "", item1: "기부", item2: "영등포구 감사패(영등포 2022 희망온돌 따뜻한 겨울나기)", item3: "", item4: "GS리테일" },
                                { title: "", item1: "기부", item2: "아름다운가게 감사장(물품 기부)", item3: "아름다운가게", item4: "편의점사업부 3부문" },
                                { title: "", item1: "봉사", item2: "대한민국나눔대상 한국사회복지협의회 보건복지부장관상 표창", item3: "전국사회복지나눔대회", item4: "GS나누미 조직문화서비스팀 직할연합(김시연)" },
                                { title: "", item1: "봉사", item2: "강남구청장 표창", item3: "", item4: "GS나누미 편의점 3부문2지역팀" },
                                { title: "", item1: "봉사", item2: "우리모두복지재단 등촌9종합사회복지관 감사패", item3: "", item4: "GS나누미 조직문화서비스팀 직할 연합" },
                                { title: "", item1: "재해재난", item2: "대한적십자사 감사패(동해안 산불)", item3: "", item4: "GS리테일" },
                                { title: "", item1: "헌혈", item2: "대한적십자사 부산혈액원 표창", item3: "", item4: "편의점사업부 6부문(노준호)" },
                                { title: "2020", item1: "기부", item2: "서울특별시장 표창", item3: "소방의날 기념표창", item4: "홈쇼핑BU", rs1: 2 },
                                { title: "", item1: "재해재난", item2: "행정안전부장관상 표창(우한교민)", item3: "재난구호유공", item4: "GS나누미 MD본부(유영준)" },
                                { title: "2019", item1: "기부", item2: "서울시장상", item3: "민관협력 우수기관 표창", item4: "홈쇼핑BU", rs1: 9 },
                                { title: "", item1: "기부", item2: "보건복지부장관상", item3: "보건복지부 유공자 표창", item4: "홈쇼핑BU" },
                                { title: "", item1: "봉사", item2: "강남구청장 표창", item3: "", item4: "GS나누미 편의점 2부문1지역팀" },
                                { title: "", item1: "봉사", item2: "한빛맹아원 감사패", item3: "", item4: "GS나누미 편의점 2부문2지역팀" },
                                { title: "", item1: "봉사", item2: "창원시 감사패 표창", item3: "", item4: "GS나누미 편의점 4부문3지역팀" },
                                { title: "", item1: "봉사", item2: "경남종합사회복지관에서 표창", item3: "", item4: "GS나누미 편의점 4부문3지역팀" },
                                { title: "", item1: "봉사", item2: "전주 사랑의 집 감사패", item3: "", item4: "GS나누미 수퍼 2부문 영업6팀 전주권" },
                                { title: "", item1: "봉사", item2: "서울YWCA 봉천종합사회복지관 감사패 표창", item3: "", item4: "GS나누미 H&B 북서울권 영업팀" },
                                { title: "", item1: "재해재난", item2: "행정안전부장관상 표창(고성 속초 산불)", item3: "재난구호유공", item4: "GS나누미 강원(황호성)" },
                                { title: "2018", item1: "기부", item2: "TV홈쇼핑 부문 1위", item3: "대한민국 사회적가치 우수기업", item4: "홈쇼핑BU", rs1: 12 },
                                { title: "", item1: "봉사", item2: "마산시장 표창", item3: "", item4: "GS나누미 수퍼 마산점" },
                                { title: "", item1: "봉사", item2: "강남구장애인복지관 표창", item3: "", item4: "GS나누미 편의점 2부문1지역팀" },
                                { title: "", item1: "봉사", item2: "김포시장 표창", item3: "", item4: "GS나누미 수퍼 1부문 NSC영업1팀 김포권 연합" },
                                { title: "", item1: "봉사", item2: "몰운대종합사회복지관 표창", item3: "", item4: "GS나누미 수퍼 3부문 영업3팀 다대점" },
                                { title: "", item1: "봉사", item2: "사단법인 한국국제연합봉사단 아름다운 大韓國人상", item3: "", item4: "GS리테일" },
                                { title: "", item1: "봉사", item2: "보건복지부장관 표창", item3: "", item4: "GS리테일" },
                                { title: "", item1: "봉사", item2: "(사)한국유엔봉사단 대한민국 봉사대상", item3: "", item4: "GS리테일" },
                                { title: "", item1: "봉사", item2: "몰운대종합사회복지관 표창", item3: "", item4: "GS나누미 수퍼 3부문 영업3팀 다대점" },
                                { title: "", item1: "봉사", item2: "사단법인 한국국제연합봉사단 아름다운 大韓國人상", item3: "", item4: "GS리테일" },
                                { title: "", item1: "봉사", item2: "보건복지부장관 표창", item3: "", item4: "GS리테일" },
                                { title: "", item1: "봉사", item2: "(사)한국유엔봉사단 대한민국 봉사대상", item3: "", item4: "GS리테일" },
                            ],
                            acctitle2: "2017년 ~ 2013년",
                            tableData3: [
                                { title: "2017", item1: "봉사", item2: "우리모두복지재단 등촌9종합사회복지관 감사패", item3: "", item4: "GS나누미 조직문화서비스팀 직할 연합", rs1: 3 },
                                { title: "", item1: "봉사", item2: "보건복지부장관 표창", item3: "제 18회 사회복지의 날 표창", item4: "홈쇼핑BU" },
                                { title: "", item1: "재해재난", item2: "국무총리단체 표창(포항지진)", item3: "재난구호유공", item4: "GS나누미 대구경북(김영욱)" },
                                { title: "2016", item1: "기부", item2: "고용노동부 장관표창", item3: "사회적 기업육성", item4: "홈쇼핑BU", rs1: 2 },
                                { title: "", item1: "봉사", item2: "대한민국나눔대상 서울사회복지협의회 보건복지부장관상 표창", item3: "전국사회복지나눔대회", item4: "GS나누미 편의점 중부권경영주연합" },
                                { title: "2015", item1: "봉사", item2: "대한민국나눔대상 서울사회복지협의회 보건복지부장관상 표창", item3: "전국사회복지나눔대회", item4: "GS나누미 건설부문", rs1: 1 },
                                { title: "2014", item1: "봉사", item2: "(사)대한노인회 강서지회 감사패", item3: "", item4: "GS나누미 조직문화서비스팀 직할 연합", rs1: 1 },
                                { title: "2013", item1: "봉사", item2: "대한민국나눔대상 제주도사회복지협의회 표창", item3: "전국사회복지나눔대회", item4: "GS나누미 편의점 영남권3지역/제주센타", rs1: 2 },
                                { title: "", item1: "봉사", item2: "대한민국나눔대상 한국사회복지협의회 표창", item3: "전국사회복지나눔대회", item4: "GS나누미 수퍼 당진점" },
                            ],
                            acctitle3: "2012년 ~ 2005년",
                            tableData4: [
                                { title: "2012", item1: "기부", item2: "중소기업청장 표창", item3: "대한민국 판로지원 종합대전", item4: "홈쇼핑BU", rs1: 3 },
                                { title: "", item1: "봉사", item2: "대한민국나눔대상 경기도사회복지협의회 표창", item3: "전국사회복지나눔대회", item4: "GS나누미 편의점 수도권3지역", },
                                { title: "", item1: "봉사", item2: "대한민국나눔대상 경기도사회복지협의회 표창", item3: "전국사회복지나눔대회", item4: "GS나누미 수퍼 수도권3,4,5지역" },
                                { title: "2011", item1: "기부", item2: "아동복지부문 大賞", item3: "2011 사회공헌기업大賞", item4: "홈쇼핑BU", rs1: 4 },
                                { title: "", item1: "기부", item2: "아동복지공헌부문大賞", item3: "2011 행복더함 사회공헌대상", item4: "홈쇼핑BU" },
                                { title: "", item1: "봉사", item2: "기업부문", item3: "제1회SBS 희망나눔대상", item4: "홈쇼핑BU)" },
                                { title: "", item1: "봉사", item2: "보건복지부 장관상", item3: "이달의 나눔인‘기업 봉사 부문’", item4: "홈쇼핑BU" },
                                { title: "2010", item1: "기부", item2: "대통령 표창(사회 공헌 활동 우수 관리자)", item3: "제11회 사회복지의 날기념 표창", item4: "홈쇼핑BU", rs1: 2 },
                                { title: "", item1: "기부", item2: "아동복지부문 大賞", item3: "2010 사회공헌기업大賞", item4: "홈쇼핑BU" },
                                { title: "2009", item1: "기부", item2: "아동복지부문 大賞", item3: "2009사회공헌기업大賞", item4: "홈쇼핑BU", rs1: 1 },
                                { title: "2007", item1: "기부", item2: "아동복지부문 대상", item3: "대한민국사회공헌기업대상", item4: "홈쇼핑BU", rs1: 1 },
                                { title: "2005", item1: "기부", item2: "아동.청소년복지부문 대상", item3: "한국사회공헌대상", item4: "홈쇼핑BU", rs1: 1 },
                            ],
                        }
                    },
                    EnvMgmtListData: [
                        { id: "5", title: "2025년 4분기 분기보고서", link: "#", fileType: "다운로드" },
                        { id: "4", title: "2025년 3분기 분기보고서", link: "#", fileType: "다운로드" },
                        { id: "3", title: "2025년 2분기 분기보고서", link: "#", fileType: "다운로드" },
                        { id: "2", title: "2025년 1분기 분기보고서", link: "#", fileType: "다운로드" },
                        { id: "1", title: "2024년 4분기 분기보고서", link: "#", fileType: "다운로드" },
                    ],
                    EnvMgmtNoDataText: "조회된 데이터가 없습니다.",
                    sustainReportHeroCoverAlt: "2024 지속가능경영보고서 표지",
                    sustainReportHeroTitle: "2024년 지속가능경영 보고서",
                    sustainReportHeroPeriod: "(보고기간: 2024.01.01 ~ 2024.12.31)",
                    sustainReportHeroLead:
                        "GS리테일의 2024 지속가능경영보고서는 고객과 사회, 그리고 다양한 이해관계자와 함께 만들어가는 지속 가능성의 여정과 GS리테일의 ESG 실천 성과를 담았습니다.",
                    sustainReportHeroKoHref: "#none",
                    sustainReportHeroEnHref: "#none",
                    sustainReportHeroNavAria: "2024 보고서 다운로드",
                    sustainReportKoBtn: "국문 보고서",
                    sustainReportEnBtn: "영문 보고서",
                    sustainReportArchiveTitle: "지난 지속가능경영보고서",
                    sustainReportPastRows: [
                        {
                            key: "2023",
                            title: "2023년 지속가능경영 보고서",
                            period: "(보고기간: 2023.01.01 ~ 2023.12.31)",
                            coverAlt: "2023 지속가능경영보고서 표지",
                            koHref: "#none",
                        },
                        {
                            key: "2022",
                            title: "2022년 지속가능경영 보고서",
                            period: "(보고기간: 2022.01.01 ~ 2022.12.31)",
                            coverAlt: "2022 지속가능경영보고서 표지",
                            koHref: "#none",
                        },
                        {
                            key: "2021",
                            title: "2021년 지속가능경영 보고서",
                            period: "(보고기간: 2021.01.01 ~ 2021.12.31)",
                            coverAlt: "2021 지속가능경영보고서 표지",
                            koHref: "#none",
                        },
                        {
                            key: "2020",
                            title: "2020년 지속가능경영 보고서",
                            period: "(보고기간: 2020.01.01 ~ 2020.12.31)",
                            coverAlt: "2020 지속가능경영보고서 표지",
                            koHref: "#none",
                        },
                    ],
                },
                en: {
                    MainTitle: "Sustainability Management",
                    MainDesc: "Following the launch of the integrated GS Retail, the Company established the ESG vision 'Green Life Together' to create sustainable corporate value.\nTo realize this mid-to-long-term vision, we are pursuing detailed environmental and social strategies and initiatives,\nand we will continue to communicate our implementation status and sustainable management performance with our stakeholders."/* 260604 번역 */,
                    Tabs1: [{ item: "Vision and Strategy" }, { item: "ESG Resource Center" }, { item: "Sustainability Report" }],
                    TabsEsgArchive: [
                        { item: "Environmental Management Resources" },
                        { item: "Mutual Growth Management Resources" },
                        { item: "ESG Performance" },
                        { item: "Social Contribution Awards" },
                    ],

                    // [Tab 1] 비전&전략
                    VisionTogetherAria: "Green Life Together — Environment & Society"/* 260604 번역 */,
                    VisionMainTitle: "Green Life Together.",

                    // [Tab 1] 지배구조헌장 전체 데이터 (KO)
                    CharterTitle: "Green Life Together!", 
                    PolicyIntroTitle: "Preamble",
                    PolicyIntroDesc: "GS Retail Co., Ltd. (hereinafter the 'Company') aspires to build trust with all stakeholders on the foundation of a sound corporate governance structure, and to rise as a company that leads customer Life Innovation through relentless challenge. To achieve this vision, this Corporate Governance Charter is hereby enacted. In accordance with this Charter, the Company shall establish a sound governance structure, including the protection of shareholder rights, the roles and responsibilities of the Board of Directors, and the independent operation of professional audit bodies, to pursue fair and transparent management practices and continuously advance the rights and interests of all stakeholders, including shareholders, customers, and employees.",
                    PolicySections: [
                        {
                            title: "I. Shareholders",
                            content: [
                                { subTitle: "1. Shareholder Rights", list: [
                                    "① Shareholders are the owners of the Company and are guaranteed the basic rights protected by relevant statutes, including the right to participate in profit distribution, the right to attend the general meeting of shareholders and exercise voting rights, and the right to propose agenda items for the general meeting of shareholders."/* 260604 번역 */,
                                    "② Among matters prescribed by relevant statutes, such as amendment of the Articles of Incorporation, mergers, transfer or acquisition of business, corporate division, dissolution, and capital reduction, those that bring about material changes to the Company's existence and shareholders' rights shall be decided at the general meeting of shareholders, guaranteeing shareholders' rights to the greatest extent."/* 260604 번역 */,
                                    "③ The Company strives to ensure that resolutions of the general meeting of shareholders are made through transparent and fair procedures, and provides shareholders, before they attend the general meeting, with sufficient information regarding the date, time, and place of the meeting, the agenda items, and the methods of exercising voting rights."/* 260604 번역 */,
                                    "④ The exercise of shareholder rights shall be carried out in accordance with the free will of the shareholders."/* 260604 번역 */
                                ]},
                                { subTitle: "2. Equal Treatment of Shareholders", list: [
                                    "① Shareholders are guaranteed their rights in accordance with the principle of one vote per share. However, where the voting rights of a particular shareholder are restricted pursuant to statutes, the relevant statutes shall apply. The Company treats shareholders equitably in accordance with the standards prescribed by the Commercial Act and relevant statutes, so that the essential rights of shareholders are not impaired."/* 260604 번역 */,
                                    "② The Company provides shareholders with the information they need in a timely manner, organized in an easily understandable way, and through an equitable method. The Company also strives to protect shareholders from unfair related-party transactions and self-dealing."/* 260604 번역 */
                                ]},
                                { subTitle: "3. Shareholder Responsibilities", list: [
                                    "① Shareholders shall actively exercise their voting rights for the development and benefit of the Company."/* 260604 번역 */,
                                    "② A controlling shareholder who exercises influence over the Company's management shall exercise its shareholder rights in consideration of the interests of the Company and all other shareholders, and shall endeavor not to cause harm to other shareholders by abusing its controlling power."/* 260604 번역 */
                                ]}
                            ]
                        },
                        {
                            title: "II. Board of Directors",
                            content: [
                                { subTitle: "1. Functions of the Board of Directors", list: [
                                    "① The Board of Directors holds comprehensive authority over management pursuant to the relevant statutes, determines the Company's basic management objectives for the benefit of the Company and its shareholders, and deliberates and resolves on the Company's major decision-making matters as prescribed by relevant rules such as statutes, the Articles of Incorporation, and the Board of Directors Regulations."/* 260604 번역 */,
                                    "② The Board of Directors supervises the activities of management to ensure transparent and fair conduct of the Company's business and to prevent the impairment of shareholder value."/* 260604 번역 */,
                                    "③ The Board of Directors may delegate authority to the Representative Director or to a committee within the Board, except for major matters for which delegation is not permitted under relevant statutes, the Articles of Incorporation, or the Board of Directors Regulations."/* 260604 번역 */
                                ]},
                                { subTitle: "2. Board Composition", list: [
                                    "① The Company composes the Board of Directors of six or more directors to enable diverse discussions and efficient decision-making at the Board, and, to ensure the independence of the Board, outside directors shall constitute a majority of the total number of Board members."/* 260604 번역 */,
                                    "② To strengthen its supervisory function over the Company's transparent management, the Board of Directors establishes an Audit Committee, and may establish committees within the Board, as prescribed by other statutes and the Articles of Incorporation, for the objective and expert deliberation of each agenda item submitted."/* 260604 번역 */
                                ]},
                                { subTitle: "3. Director Appointment", list: [
                                    "① Directors shall be appointed by resolution of the general meeting of shareholders from among candidates selected through methods such as recommendation by the Board of Directors, recommendation by the Outside Director Candidate Recommendation Committee, or recommendation by shareholders; and the Company strives to ensure that candidates whose expertise has been sufficiently verified are appointed as directors, so that Board-centered corporate management can be achieved."/* 260604 번역 */,
                                    "② The Representative Director shall be appointed by resolution of the Board of Directors from among the directors appointed at the general meeting of shareholders."/* 260604 번역 */,
                                    "③ The Chairperson of the Board of Directors shall be appointed by resolution of the Board from among the directors appointed at the general meeting of shareholders, and concurrent service as the Representative Director shall be avoided."/* 260604 번역 */
                                ]},
                                { subTitle: "4. Director Qualifications", list: [
                                    "① Internal directors shall possess abundant experience and expertise related to the Company's business and shall be able to contribute to the Company's development and the enhancement of shareholder value."/* 260604 번역 */,
                                    "② Outside directors shall be persons with sufficient knowledge and expertise in fields such as law, finance, accounting, new business, IT-Tech, and the public sector, who have no material interest in the Company and whose independence has been verified."/* 260604 번역 */
                                ]},
                                { subTitle: "5. Board Operations", list: [
                                    "① The Board of Directors operates as regular Board meetings and extraordinary Board meetings convened as necessary; and for the smooth operation of the Board, the Company enacts and operates Board of Directors Regulations that specifically prescribe the authority, responsibilities, and operating procedures of the Board."/* 260604 번역 */,
                                    "② For the smooth operation of the committees within the Board of Directors, the Company enacts and operates committee regulations that specifically prescribe the authority, responsibilities, and operating procedures of the committees."/* 260604 번역 */,
                                    "③ The Company shall prepare and retain minutes recording the proceedings of Board of Directors meetings and the substance of important deliberations."/* 260604 번역 */
                                ]},
                            ]
                        },

                    ],
                    esgTitle: "ESG Governance"/* 260604 번역 */,
                    esgDesc: "GS Retail has established and operates an ESG governance structure encompassing practical working organizations, including the ESG Self-Directed Research Group (ESG-Jajuyeon), as well as the ESG Committee within the Board of Directors, to ensure actionable ESG management.",
                    esgFlowItems: [
                        {
                            title: "ESG Committee",
                            meta: "Within the Board of Directors",
                            desc: "Approval of major ESG-related agenda items through the ESG Committee under the Board of Directors",
                            connectorLeft: "Approval",
                            connectorRight: "Report",
                        },
                        {
                            title: "ESG Promotion Council",
                            meta: "CEO and 10 C-Level Executives", 
                            desc: "Decision-making on ESG-related matters through a CEO-led Promotion Council", 
                            connectorLeft: "Decision-Making",
                            connectorRight: "Agenda Submission",
                        },
                        {
                            title: "ESG General Secretariat",
                            meta: "Sustainability Management Division / ESG Team",
                            desc: "Dedicated ESG Implementation Departments",
                            connectorLeft: "Results Sharing",
                            connectorRight: "Task collection",
                        },
                        {
                            title: "ESG Working Group",
                            meta: "",
                            desc: "Quick consultation on ESG implementation progress and emerging issues",
                            connectorLeft: "Results Sharing",
                            connectorRight: "Task coordination and implementation review",
                        },
                        {
                            title: "BU-Level ESG Self-Directed Research Group (ESG-Jajuyeon)",
                            meta: "",
                            desc: "ESG task implementation teams (task planning and execution)",
                            connectorLeft: "",
                            connectorRight: "",
                        },
                    ],
                    esgFlowNote: "* Jajuyeon: Self-Directed Research Group",
                    esgTableHeader: "Key Sector Committees and Councils",
                    esgTableLeftItems: [
                        "[Environment] Environmental Impact Assessment Committee [Employees] Labor-Management-Government Council [Store Owners] Store Owner Council",
                        "[Employees] Labor-Management-Government Council"/* 260604 번역 */,
                        "Store Owner Council",
                    ],
                    esgTableRightItems: [
                        "[Partners] Partner Briefing Session [Personal Data] Information Security Council [Social Contribution] Social Contribution Review Committee",
                        "[Personal Information] Information Security Committee"/* 260604 번역 */,
                        "[Social Contribution] Social Contribution Review Committee"/* 260604 번역 */, 
                    ],
                    bnbpTitle: "BNBP (Biz N Biodiversity Platform) Initiative",
                    esgCommitteeDetailImageAlt: "BNBP logo image"/* 260604 번역 */,
                    esgBnbpContents: [
                        "BNBP (Biz N Biodiversity Platform) is an initiative established in 2016 to help companies recognize their international and social responsibilities regarding the conservation and sustainable use of biodiversity, and to support the integration of biodiversity protection into all aspects of business operations.",
                        "Through its participation in the BNBP, GS Retail recognizes its corporate social responsibility for biodiversity conservation and will continue its efforts to lead a life of coexistence and harmony."/* 260604 번역 */,
                    ],
                    esgChangwonTitle: "Changwon Initiative",
                    esgChangwonContents: [
                        "In 2011, the 10th Conference of the Parties (COP10) to the United Nations Convention to Combat Desertification (UNCCD) was successfully held in Changwon, South Gyeongsang Province, and the 'Changwon Initiative' was launched as a key outcome. The Changwon Initiative plays a significant role in contributing to Land Degradation Neutrality (LDN), corresponding to SDG 15.3, and supports forest restoration efforts.",
                        "In 2011, the 10th Conference of the Parties (COP10) to the United Nations Convention to Combat Desertification (UNCCD) was successfully held in Changwon, South Gyeongsang Province, and the 'Changwon Initiative' was launched as a key outcome. The Changwon Initiative plays a significant role in contributing to Land Degradation Neutrality (LDN), corresponding to SDG 15.3, and supports forest restoration efforts.<br />In October 2021, on the occasion of the 10th anniversary of the Changwon Initiative, GS Retail declared its support for and participation in efforts to prevent land degradation. In addition, the Company signed MOUs with the Korea Forest Service and the UNCCD Secretariat, actively participating in activities to prevent land degradation. Specifically, GS Retail implemented community participation programs to mitigate yellow dust and drought, including the creation of communal village forests. Through partnerships with governments, corporations, international organizations, and civil society groups, the Company has implemented forest restoration projects, contributing more effectively to environmental improvement and biodiversity conservation in local communities.",
                    ],

                    // [Tab 2] ESG 자료실
                    tab2: {
                        stab1: {
                            title: "You can view performance data related to GS Retail's environmental management.",
                            desc: "This document contains GS Retail's information assets and employee information disclosed for stakeholders, institutions, and shareholders. Any unauthorized use or illegal disclosure may be subject to legal penalties.",
                        },
                        stab2: {
                            title: "You can view performance data related to GS Retail's mutual growth management.",
                            desc: "This document contains GS Retail's information assets and employee information disclosed for stakeholders, institutions, and shareholders. Any unauthorized use or illegal disclosure may be subject to legal penalties.",
                        },
                        stab3: {
                            tableTitle: [
                                { title1: "Item"/* 260604 번역 */, title2: "KCGS", title3: "", title4: "", title5: "", title6: "SUSTINVEST", rs1: 2, cs1: 1, rs2: 1, cs2: 4, rs6: 2, cs6: 1, class1: "ac th_item", class2: "ac", class6: "ac th_sustin_best" },
                                { title1: "", title2: "Overall Rating", title3: "Environment", title4: "Social", title5: "Governance", title6: "", rs2: 1, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1, rs5: 1, cs5: 1, class2: "ac normal", class3: "ac normal", class4: "ac normal", class5: "ac normal" },
                            ],
                            tableData: [
                                { title: "2025", item1: "A+", item2: "A+", item3: "A+", item4: "A", item5: "AA" },
                                { title: "2024", item1: "A+", item2: "A+", item3: "A+", item4: "A", item5: "AA" },
                                { title: "2023", item1: "A", item2: "A+", item3: "A", item4: "A", item5: "A" },
                                { title: "2022", item1: "A", item2: "B+", item3: "A", item4: "A", item5: "-" },
                                { title: "2021", item1: "A", item2: "A", item3: "A", item4: "A", item5: "-" },
                            ],
                            listData: [
                                { desc: "Evaluation Bodies: Korea Corporate Governance Service (KCGS), SUSTINVEST" },
                                { desc: "ESG Evaluation: Conducted annually for the purpose of providing intuitive information on the Company's ESG level and supporting its use in investment decision-making."/* 260604 번역 */ },
                            ],
                        },
                        stab4: {
                            title: "Here, we highlight the community sharing activities GS Retail has consistently carried out with its employees, store owners, and customers through GS Nanumi volunteering, donations, and more.",
                            desc: "Since 2006, GS Retail has been consistently engaging with local communities through GS Nanumi volunteering, donations, and other sharing activities together with its employees, store owners, and customers.\nWe continue to take part in these sharing activities together.\nGoing forward, we will continue to practice warm, everyday sharing and share our hearts with others."/* 260604 번역 */,
                            tableTitle: [
                                { title1: "Year"/* 260604 번역 */, title2: "Category", title3: "Award Name", title4: "Competition"/* 260604 번역 */, title5: "Department" },
                            ],
                            tableData: [
                                { title: "2025", item1: "Volunteering", item2: "Hwaseong Special City Council Commendation", item3: "Hwaseong City Southern General Social Welfare Center", item4: "CVS Division 3 Region 4 GS Nanumi", rs1: 2,},
                                { title: "", item1: "Volunteering", item2: "Member of the National Assembly Commendation", item3: "2025 Changyeong Welfare Day", item4: "CVS Division 3 Region 4 GS Nanumi"},
                                { title: "2024", item1: "Donation", item2: "Hallym Burn Foundation Certificate of Appreciation (Muscular Firefighter Hope Sharing Calendar Campaign)", item3: "Hallym Burn Foundation", item4: "GS Retail", rs1: 4},
                                { title: "", item1: "Volunteering", item2: "Woorimodu Welfare Foundation Deungchon 9 General Social Welfare Center Certificate of Appreciation", item3: "", item4: "GS Nanumi Organizational Culture Service Team Direct Chapter" },
                                { title: "", item1: "Donation", item2: "4th Korea Good Donor Award – Prime Minister's Commendation", item3: "Hosted by Ministry of the Interior and Safety", item4: "GS Retail" },
                                { title: "", item1: "Volunteering", item2: "Korea Association of Sharing and Practice Commendation", item3: "Hwaseong City Southern General Social Welfare Center", item4: "CVS Division 3 Region 4 GS Nanumi" },
                                { title: "2023", item1: "Other", item2: "Gyeongsangbuk-do Governor's Commendation (Participation in mental health and suicide prevention initiatives, contribution to promoting a culture of respect for life)", item3: "", item4: "CVS Division 5 (Park Seo-woo)", rs1: 8 },
                                { title: "", item1: "Other", item2: "Jeonju Mayor's Commendation (Active participation in suicide prevention initiatives, contribution to spreading life-respect culture)", item3: "", item4: "CVS Division 4" },
                                { title: "", item1: "Other", item2: "Gangwon Special Self-Governing Province Governor's Commendation (Contribution to the advancement and successful development of Gangwon Province)", item3: "Gangwon Province Merit", item4: "GS Retail (Executive Director Kwak Yong-gu)" },
                                { title: "", item1: "Donation", item2: "Hallym Burn Foundation Certificate of Appreciation (Muscular Firefighter Hope Sharing Calendar Campaign)", item3: "Hallym Burn Foundation", item4: "GS Retail" },
                                { title: "", item1: "Donation", item2: "Yeongdeungpo-gu Certificate of Appreciation (Yeongdeungpo 2023 Hope Ondol Warm Winter Campaign)", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Donation", item2: "Gangneung City Certificate of Appreciation (April Gangneung Wildfire Relief Supply Support)", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Volunteering", item2: "Gyeonggi-do Gimpo City Member of the National Assembly Commendation", item3: "Gimpo City Volunteer Day", item4: "GS Nanumi Supermarket Gimpo Area Chapter" },
                                { title: "", item1: "Volunteering", item2: "Bupyeong Senior Welfare Center Director's Commendation", item3: "Bupyeong Senior Welfare Center Volunteer Day", item4: "GS Nanumi Supermarket Incheon Area Chapter (Bupyeong)" },
                            ],
                            acctitle1: "2018–2022 |  | ▲",
                            tableData2: [
                                { title: "2022", item1: "Other", item2: "Gyeongsangbuk-do Governor's Commendation (Contribution to fire safety culture promotion)", item3: "", item4: "CVS Division 5 (Min-ho Kim)", rs1: 9 },
                                { title: "", item1: "Donation", item2: "Beautiful Store 20th Anniversary Certificate of Gratitude", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Donation", item2: "Yeongdeungpo-gu Certificate of Appreciation (Yeongdeungpo 2022 Hope Ondol Warm Winter Campaign)", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Donation", item2: "Beautiful Store Certificate of Appreciation (Goods Donation)", item3: "Beautiful Store", item4: "CVS Division 3" },
                                { title: "", item1: "Volunteering", item2: "Korea National Sharing Award, Minister of Health and Welfare Commendation (Korea Council on Social Welfare)", item3: "National Social Welfare Sharing Convention", item4: "GS Nanumi Organizational Culture Service Team Direct Chapter (Si-yeon Kim)" },
                                { title: "", item1: "Volunteering", item2: "Gangnam-gu Mayor's Commendation", item3: "", item4: "GS Nanumi CVS Division 3 Region 2 Team" },
                                { title: "", item1: "Volunteering", item2: "Woorimodu Welfare Foundation Deungchon 9 General Social Welfare Center Certificate of Appreciation", item3: "", item4: "GS Nanumi Organizational Culture Service Team Direct Chapter" },
                                { title: "", item1: "Disaster and Emergency Relief", item2: "Korean Red Cross Certificate of Appreciation (East Coast Wildfires)", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Blood Donation", item2: "Korean Red Cross Busan Blood Center Commendation", item3: "", item4: "CVS Division 6 (Jun-ho Noh)" },
                                { title: "2020", item1: "Donation", item2: "Seoul Metropolitan Government Mayor's Commendation", item3: "Fire Safety Day Memorial Commendation", item4: "Home Shopping BU", rs1: 2 },
                                { title: "", item1: "Disaster and Emergency Relief", item2: "Minister of the Interior and Safety Award (Wuhan Evacuees)", item3: "Disaster Relief Merit", item4: "GS Nanumi MD Headquarters (Young-jun Yoo)" },
                                { title: "2019", item1: "Donation", item2: "Seoul Mayor's Award", item3: "Outstanding Public-Private Partnership Institution", item4: "Home Shopping BU", rs1: 9 },
                                { title: "", item1: "Donation", item2: "Minister of Health and Welfare Award", item3: "Ministry of Health and Welfare Merit Commendation", item4: "Home Shopping BU" },
                                { title: "", item1: "Volunteering", item2: "Gangnam-gu Mayor's Commendation", item3: "", item4: "GS Nanumi CVS Division 2 Region 1 Team" },
                                { title: "", item1: "Volunteering", item2: "Hanbit School for the Blind Certificate of Appreciation", item3: "", item4: "GS Nanumi CVS Division 2 Region 2 Team" },
                                { title: "", item1: "Volunteering", item2: "Changwon City Certificate of Appreciation", item3: "", item4: "GS Nanumi CVS Division 4 Region 3 Team" },
                                { title: "", item1: "Volunteering", item2: "Gyeongnam General Social Welfare Center Commendation", item3: "", item4: "GS Nanumi CVS Division 4 Region 3 Team" },
                                { title: "", item1: "Volunteering", item2: "Jeonju House of Love Certificate of Appreciation", item3: "", item4: "GS Nanumi Supermarket Division 2 Sales Team 6, Jeonju Area" },
                                { title: "", item1: "Volunteering", item2: "Seoul YWCA Bongcheon General Social Welfare Center Certificate of Appreciation", item3: "", item4: "GS Nanumi H&B Northwest Seoul Sales Team" },
                                { title: "", item1: "Disaster and Emergency Relief", item2: "Minister of the Interior and Safety Award (Goseong-Sokcho Wildfire)", item3: "Disaster Relief Merit", item4: "GS Nanumi Gangwon Area (Ho-seong Hwang)" },
                                { title: "2018", item1: "Donation", item2: "TV Home Shopping Category No. 1", item3: "Korea Social Value Outstanding Company Award", item4: "Home Shopping BU", rs1: 12 },
                                { title: "", item1: "Volunteering", item2: "Masan Mayor's Commendation", item3: "", item4: "GS Nanumi Supermarket Masan Branch" },
                                { title: "", item1: "Volunteering", item2: "Gangnam-gu Disability Welfare Center Commendation", item3: "", item4: "GS Nanumi CVS Division 2 Region 1 Team" },
                                { title: "", item1: "Volunteering", item2: "Gimpo Mayor's Commendation", item3: "", item4: "GS Nanumi Supermarket Division 1 NSC Sales Team 1, Gimpo Area Chapter" },
                                { title: "", item1: "Volunteering", item2: "Molundae General Social Welfare Center Commendation", item3: "", item4: "GS Nanumi Supermarket Division 3 Sales Team 3, Dadae Branch" },
                                { title: "", item1: "Volunteering", item2: "Korea UN Volunteers Grand Korean Award", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Volunteering", item2: "Minister of Health and Welfare Commendation", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Volunteering", item2: "Korea UN Volunteers Korea Volunteer Grand Award", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Volunteering", item2: "Molundae General Social Welfare Center Commendation", item3: "", item4: "GS Nanumi Supermarket Division 3 Sales Team 3, Dadae Branch" },
                                { title: "", item1: "Volunteering", item2: "Korea UN Volunteers Grand Korean Award", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Volunteering", item2: "Minister of Health and Welfare Commendation", item3: "", item4: "GS Retail" },
                                { title: "", item1: "Volunteering", item2: "Korea UN Volunteers Korea Volunteer Grand Award", item3: "", item4: "GS Retail" },
                            ],
                            acctitle2: "2013–2017 |  | ▲",
                            tableData3: [
                                { title: "2017", item1: "Volunteering", item2: "Woorimodu Welfare Foundation Deungchon 9 General Social Welfare Center Certificate of Appreciation", item3: "", item4: "GS Nanumi Organizational Culture Service Team Direct Chapter", rs1: 3 },
                                { title: "", item1: "Volunteering", item2: "Minister of Health and Welfare Commendation", item3: "Commendation at the 18th Social Welfare Day", item4: "Home Shopping BU" },
                                { title: "", item1: "Disaster and Emergency Relief", item2: "Prime Minister's Group Commendation (Pohang Earthquake)", item3: "Disaster Relief Merit", item4: "GS Nanumi Daegu/Gyeongbuk (Kim Young-wook)" },
                                { title: "2016", item1: "Donation", item2: "Commendation from the Minister of Employment and Labor", item3: "Social Enterprise Development", item4: "Home Shopping BU", rs1: 2 },
                                { title: "", item1: "Volunteering", item2: "Korea National Sharing Award, Minister of Health and Welfare Commendation (Seoul Social Welfare Council)", item3: "National Social Welfare Sharing Convention", item4: "GS Nanumi CVS Central Region Franchise Chapter" },
                                { title: "2015", item1: "Volunteering", item2: "Korea National Sharing Award, Minister of Health and Welfare Commendation (Seoul Social Welfare Council)", item3: "National Social Welfare Sharing Convention", item4: "GS Nanumi Construction Division", rs1: 1 },
                                { title: "2014", item1: "Volunteering", item2: "Korean Senior Citizens Association Gangseo Branch Certificate of Appreciation", item3: "", item4: "GS Nanumi Organizational Culture Service Team Direct Chapter", rs1: 1 },
                                { title: "2013", item1: "Volunteering", item2: "Grand Award for Sharing in Korea – Jeju Social Welfare Council Commendation", item3: "National Social Welfare Sharing Convention", item4: "GS Nanumi CVS Yeongnam Region 3 Area and Jeju Center", rs1: 2 },
                                { title: "", item1: "Volunteering", item2: "Grand Award for Sharing in Korea – Korea Social Welfare Council Commendation", item3: "National Social Welfare Sharing Convention", item4: "GS Nanumi Supermarket Dangjin Branch" },
                            ],
                            acctitle3: "2012–2005",
                            tableData4: [
                                { title: "2012", item1: "Donation", item2: "Commissioner of the Small and Medium Business Administration Commendation", item3: "Korea Sales Support Grand Exhibition", item4: "Home Shopping BU", rs1: 3 },
                                { title: "", item1: "Volunteering", item2: "Korea National Sharing Award, Gyeonggi-do Council on Social Welfare Commendation", item3: "National Social Welfare Sharing Convention", item4: "GS Nanumi CVS Capital Area Region 3", },
                                { title: "", item1: "Volunteering", item2: "Korea National Sharing Award, Gyeonggi-do Council on Social Welfare Commendation", item3: "National Social Welfare Sharing Convention", item4: "GS Nanumi Supermarket Capital Area Regions 3, 4, and 5" },
                                { title: "2011", item1: "Donation", item2: "Children's Welfare Grand Prize", item3: "2011 Corporate Social Contribution Grand Prize", item4: "Home Shopping BU", rs1: 4 },
                                { title: "", item1: "Donation", item2: "Children's Welfare Contribution Grand Prize", item3: "2011 Happiness Sharing Social Contribution Award", item4: "Home Shopping BU" },
                                { title: "", item1: "Volunteering", item2: "Corporate Category", item3: "1st SBS Hope Sharing Grand Award", item4: "Home Shopping BU" },
                                { title: "", item1: "Volunteering", item2: "Minister of Health and Welfare Award", item3: "'Volunteer of the Month' – Corporate Volunteering Category", item4: "Home Shopping BU" },
                                { title: "2010", item1: "Donation", item2: "Presidential Commendation (Outstanding Social Contribution Activity Manager)", item3: "11th Social Welfare Day Memorial Commendation", item4: "Home Shopping BU", rs1: 2 },
                                { title: "", item1: "Donation", item2: "Children's Welfare Grand Prize", item3: "2010 Corporate Social Contribution Grand Prize", item4: "Home Shopping BU" },
                                { title: "2009", item1: "Donation", item2: "Children's Welfare Grand Prize", item3: "2009 Corporate Social Contribution Grand Prize", item4: "Home Shopping BU", rs1: 1 },
                                { title: "2007", item1: "Donation", item2: "Children's Welfare Grand Prize", item3: "Korea Corporate Social Contribution Grand Prize", item4: "Home Shopping BU", rs1: 1 },
                                { title: "2005", item1: "Donation", item2: "Children's and Youth Welfare Category Grand Prize", item3: "Korea Social Contribution Grand Prize", item4: "Home Shopping BU", rs1: 1 },
                            ],
                        }
                    },
                    EnvMgmtListData: [
                        { id: "5", title: "Q4 2025 Quarterly Report"/* 260604 번역 */, link: "#", fileType: "Download ↓" },
                        { id: "4", title: "Q3 2025 Quarterly Report"/* 260604 번역 */, link: "#", fileType: "Download ↓" },
                        { id: "3", title: "Q2 2025 Quarterly Report"/* 260604 번역 */, link: "#", fileType: "Download ↓" },
                        { id: "2", title: "Q1 2025 Quarterly Report"/* 260604 번역 */, link: "#", fileType: "Download ↓" },
                        { id: "1", title: "Q4 2024 Quarterly Report"/* 260604 번역 */, link: "#", fileType: "Download ↓" },
                    ],
                    EnvMgmtNoDataText: "There is no data found."/* 260604 번역 */,
                    sustainReportHeroCoverAlt: "2024 Sustainability Report",
                    sustainReportHeroTitle: "2024 Sustainability Report",
                    sustainReportHeroPeriod: "(Reporting Period: January 1, 2024 – December 31, 2024)",
                    sustainReportHeroLead:
                        "GS Retail's 2024 Sustainability Report captures the journey of sustainability co-created with customers, society, and diverse stakeholders, as well as GS Retail's ESG performance achievements.",
                    sustainReportHeroKoHref: "#none",
                    sustainReportHeroEnHref: "#none",
                    sustainReportHeroNavAria: "Download 2024 Report"/* 260604 번역 */,
                    sustainReportKoBtn: "Korean Report ↓",
                    sustainReportEnBtn: "English Report ↓",
                    sustainReportArchiveTitle: "Previous Sustainability Reports",
                    sustainReportPastRows: [
                        {
                            key: "2023",
                            title: "2023 Sustainability Report",
                            period: "(Reporting Period: January 1, 2023 – December 31, 2023)",
                            coverAlt: "2023 Sustainability Report",
                            koHref: "#none",
                        },
                        {
                            key: "2022",
                            title: "2022 Sustainability Report",
                            period: "(Reporting Period: January 1, 2022 – December 31, 2022)",
                            coverAlt: "2022 Sustainability Report",
                            koHref: "#none",
                        },
                        {
                            key: "2021",
                            title: "2021 Sustainability Report",
                            period: "(Reporting Period: January 1, 2021 – December 31, 2021)",
                            coverAlt: "2021 Sustainability Report",
                            koHref: "#none",
                        },
                        {
                            key: "2020",
                            title: "2020 Sustainability Report",
                            period: "(Reporting Period: January 1, 2020 – December 31, 2020)",
                            coverAlt: "2020 Sustainability Report",
                            koHref: "#none",
                        },
                    ],
                }
              
            }
        };
    },
    computed: {
        t() {
            const selected = this.langData[this.lang];
            if (selected && Array.isArray(selected.Tabs1) && selected.Tabs1.length > 0) {
                return selected;
            }
            return this.langData.ko;
        },
        sustainReportPastRowsWithThumbs() {
            const rows = this.t.sustainReportPastRows;
            if (!rows || !rows.length) {
                return [];
            }
            return rows.map((row, idx) => ({
                ...row,
                thumbSrc: sustainReportThumbByRow[idx] || sustainReportThumbByRow[0],
                thumbSrcMo: sustainReportThumbMoByRow[idx] || sustainReportThumbMoByRow[0],
            }));
        },
    },
    methods: {
        onTabChange1(idx) {
            this.CTabIdx = idx;
            this.envMgmtPage = 1;
        },
        onEsgArchiveTabChange() {
            this.envMgmtPage = 1;
        },
        handleEnvMgmtDownload(link) {
            console.log("환경경영 자료 다운로드:", link);
        },
        onEnvMgmtPageChange(page) {
            this.envMgmtPage = page;
        },
    },
}; 
</script>

<style scoped>
.bold{font-weight: 700 !important;}
.btn_icon.btn_big.after.download::after {background:url('@/assets/images/common/icon_set_20.png') -1067px -24px no-repeat; display:inline-block; } /* 아이콘 가상요소 */
.normal{font-weight: normal !important;}
img{width:100%; height:auto; display:block; object-fit: cover;}
.main-container { width: 100%; position: relative; display: block; }
.title_wrap { width: 100%; height: 480px; padding: 10.91% 0 11.25%; background: url(@/assets/images/dummy/gsrsu0101_bg.jpg) no-repeat center / cover; text-align: center; position: relative; display: block; }
.title_wrap::after{content:'';width:100%; height:100%; background-color:rgba(0, 0, 0, 0.5);position:absolute;left: 0; top:0; z-index:1;}
.page_title { color: #FFFFFF; font-size: 7.2rem; font-weight: 700;line-height:1.24;letter-spacing: -0.02em; text-align: center; position: relative; display: block; z-index: 2;}
.content { width: 100%; max-width: 1460px; margin: 0 auto; padding: 0 20px 0; position: relative; display: block; }
.panel { padding-top: 80px; }
.table_wrap {margin-top:0; border-top: 1px solid #161616;}
.sub_header + .table_wrap {margin-top: 64px;}
.table_wrap table { margin-top:0;width: 100%; border-collapse: collapse; }
.table_wrap th { padding: 0 20px; border-bottom: 1px solid #E5E5E9; font-size: 1.8rem;  font-weight: 700; vertical-align: middle; }
.table_wrap td { padding: 0 20px; border-bottom: 1px solid #E5E5E9; font-size: 1.8rem; vertical-align: middle; }
.table_wrap thead tr:nth-child(1) th {padding: 16px 24px;}
.table_wrap thead tr:nth-child(2) th {padding: 12px 24px;}
.table_wrap thead th { background-color: #F8F8F8; }
.table_wrap thead th.th_item { border-right: 1px solid #E5E5E9; }
.table_wrap thead th.th_sustin_best { border-left: 1px solid #E5E5E9; }
.table_wrap th,
.table_wrap td{height: 82px; border-left: 0; border-right: 0;}
.table_wrap th:not(:last-child),
.table_wrap td:not(:last-child) { border-right: 1px solid #E5E5E9; }
.table_wrap th { border-left: 0; border-right: 0; }
.table_wrap td .link_title { font-size: 1.8rem; color: #161616; text-decoration: none; }
.table_wrap td .link_title:hover { text-decoration: underline; }
.table_wrap.type1 table td{border-left:0; border-right:0; }
.table_wrap.type2 table td{ height: 70px; }
.table_wrap.type3 { overflow-x: auto; -webkit-overflow-scrolling: touch; }
.table_wrap.type3 table { min-width: 1400px; }
.table_wrap.type3 table th{font-weight: 600;font-size: 1.8rem;line-height: 1.4;letter-spacing: -0.01em;}
.table_wrap.type3 table th:not(:last-child) { border-right: 1px solid #E5E5E9;}
.table_wrap.type3 table td {height: auto; padding:16px 24px; font-size: 1.8rem;line-height:1.4; border-left: 0; border-right: 0; }
.table_wrap.type3 table td[rowspan] { border-right: 1px solid #E5E5E9; }
.pagination_area{margin-top:24px; display: flex; justify-content: center; }
.social_award_wrap { margin-top: 64px; }
.social_award_wrap :deep(dl dt > a.acc_tit_btn){padding:24px;font-weight: 700;font-size: 2.4rem;line-height: 1.35;letter-spacing: -0.01em;
background-color: #F8F8F8; border-bottom: 1px solid #E5E5E9;}
.social_award_wrap :deep(dd.acc_panel > .acc_panel_inner > .acc_panel_cont > .table_wrap){border-top: 0;}

.list_dotted {margin-top: 24px;}

/* 환경경영 자료 */
.visual_sub {color: #FFFFFF; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em;  text-align: center; position: relative; z-index: 2; }
.panel.panel_vision_strategy > section { margin-top: 100px; }
.sub_header h3 { font-weight: 700; font-size: 4rem; line-height: 1.35; letter-spacing: -0.01em; white-space: pre-line; }
.sub_header p { margin-top: 16px; font-size: 2.4rem; line-height: 1.5; letter-spacing: -0.01em; }
.sub_header_center h3 { text-align: center; }
.sub_header_center p { text-align: center; }
.tab_desc { padding: 20px 0; font-size: 2.4rem; line-height: 1.5; letter-spacing: -0.01em; text-align: center; white-space: pre-line; }
.sec_vision_together { margin-top: 80px; }
.sec_vision_together > .img_wrapper{width:100%;max-width:100%;margin: 0 auto; }
.esg_process { margin-top: 40px; }
.esg_flow { margin-top: 0; }
.esg_flow_card { width: 100%; min-height: 120px; padding: 20px; background: #E7F2FE; border-radius: 99px; display: flex; align-items: center; }
.esg_flow_card.final { background: #E8F8F1; }
.esg_flow_card_head { width: 400px; height: 100%; min-height: 100px; padding: 0 16px; background: #ffffff; border-radius: 99px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 0 0 auto; }
.esg_flow_card_title { font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.esg_flow_card_meta { margin-top: 4px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.esg_flow_card_desc { margin-left: 36px; font-size: 2rem; font-weight: 400; line-height: 1.35; letter-spacing: -0.01em; }
.esg_flow_connector { width: 420px; height: 84px; padding: 30px 20px; display: flex; align-items: center; justify-content: space-between; gap: 40px; }
.esg_flow_connector > p { flex: 1; }
.esg_flow_connector_text { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; display: flex; align-items: center; gap: 12px; }
.esg_flow_connector > p:first-child > span { justify-content: flex-end; }
.esg_flow_connector > p:last-child > span { justify-content: flex-start; }
.esg_flow_connector_text::after { content: ''; display: block; width: 24px; height: 24px; background:url('@/assets/images/common/arrow_green.png'); transform:rotate(90deg); }
.esg_flow_connector > p:last-child > span::after { content: none; }
.esg_flow_connector > p:last-child > span::before { content: ''; display: block; width: 24px; height: 24px; background:url('@/assets/images/common/arrow_blue.png'); transform:rotate(270deg); }
.esg_flow_note { margin-top: 0; padding: 24px 0 0 24px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; color: #67676f; }
.esg_committee_table { width: 100%; margin-top: 60px; }
.esg_committee_table table { width: 100%; border-collapse: collapse; border: 1px solid #E5E5E9; }
.esg_committee_table thead th { width: 100%; height: 70px; padding: 0 24px; background: #F8F8F8; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; text-align: center; border-right: 1px solid #E5E5E9; border-bottom: 1px solid #E5E5E9; }
.esg_committee_table tbody td { width: 50%; padding: 6px 0; border-right: 1px solid #E5E5E9; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; text-align: center; }
.esg_committee_table tbody tr:first-child td { padding-top: 24px; }
.esg_committee_table tbody tr:last-child td { padding-bottom: 24px; }
.bnbp_main { margin-top: 32px; display: flex; align-items: flex-start; gap: 60px; }
.img_wrapper { width: 428px; max-width: 100%; flex: 0 0 auto; }
.img_wrapper img { width: 100%; display: block; }
.txt_box p { font-size: 1.8rem; line-height: 1.6; letter-spacing: -0.01em; }
.txt_box p + p { margin-top: 20px; }
.bnbp_sub { margin-top: 60px; }
.bnbp_sub h4 { margin-bottom: 24px; font-weight: 700; font-size: 2.8rem; line-height: 1.35; letter-spacing: -0.01em; }
.bnbp_sub > .txt_box p { margin-top: 24px; }
/* 지속가능경영보고서 */
.panel_sustainability_report .sec_sustain_report_hero {width: 100%;max-width: 1025px;margin: 0 auto;padding: 0;display: flex;flex-wrap: nowrap;align-items: stretch;justify-content: center;gap: 60px;}
.panel_sustainability_report .sec_sustain_report_hero > figure {width: 465px;max-width: 100%;margin: 0;flex-shrink: 0;}
.panel_sustainability_report .sec_sustain_report_hero > figure > img {width: 100%;height: auto;border-radius: 1.6rem;}
.panel_sustainability_report .sec_sustain_report_hero > article { width: 500px; max-width: 100%; flex: 1 1 auto; }
.panel_sustainability_report .sec_sustain_report_hero > article > p { margin-top: 24px; font-size: 2rem; font-weight: 400; line-height: 1.35; letter-spacing: -0.01em; }
.panel_sustainability_report .sec_sustain_report_hero > article > .sustain_report_hero_actions { margin-top: 40px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.panel_sustainability_report .sec_sustain_report_archive { margin: 80px auto 0; }
.panel_sustainability_report .table_wrap.type_report { margin-top: 32px; border-top: 1px solid #D7D7DF; }
.panel_sustainability_report .table_wrap.type_report table { width: 100%; margin: 0; border-collapse: collapse; }
.panel_sustainability_report .table_wrap.type_report tbody td { height: auto; padding: 27px 20px; vertical-align: middle; border-bottom: 1px solid #D7D7DF; border-right: 0; }
.panel_sustainability_report .table_wrap.type_report tbody td:last-child { border-right: 0; }
.panel_sustainability_report .table_wrap.type_report tbody td figure { width: 196px; max-width: 100%; margin: 0 auto; }
.panel_sustainability_report .table_wrap.type_report tbody td figure img { width: 100%; display: block; border-radius: 12px; }
.panel_sustainability_report .table_wrap.type_report tbody td article > h3 {font-weight: 700;font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em;}
.panel_sustainability_report .table_wrap.type_report tbody td article > p {margin-top: 12px;font-size: 1.8rem;line-height: 1.4;}
.panel_sustainability_report .table_wrap.type_report tbody td:last-child {text-align: center;}
@media screen and (max-width: 1024px) {
    .esg_flow_card { padding: 16px; }
    .esg_flow_card_head { width: 320px; min-height: 84px; padding: 0 12px; }
    .esg_flow_card_desc { margin-left: 20px; }
    .esg_flow_connector { width: 100%; height: auto; padding: 20px 16px; gap: 16px; }
    .esg_flow_connector_text { gap: 8px; }
    .esg_flow_connector_text::after { width: 14px; height: 14px; background-size:14px; }
    .esg_flow_connector > p:last-child > span::before { width: 14px; height: 14px; background-size:14px; }
    .bnbp_main { gap: 32px; flex-direction: column; }
    .panel_sustainability_report .sec_sustain_report_hero {flex-wrap: wrap;flex-direction: column;align-items: center;gap: 40px;}
    .panel_sustainability_report .sec_sustain_report_hero > article {width: 100%;align-items: flex-start;}
    .sub_header h3 {white-space: normal;}
}
@media screen and (max-width: 768px) {
    .content { width: 100vw; max-width: 100%; padding: 0 20px 0; }
    .panel{padding-top: 48px;}
    .title_wrap { display: none; }
    .page_title { font-size: 4rem; }
    .visual_sub { font-size: 2rem; }
    .panel.panel_vision_strategy > section{margin-top:80px;}
    .sec_vision_together > .img_wrapper{max-width:100%;}
    .table_wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .table_wrap table { min-width: 960px; }
    .table_wrap th { font-size: 1.6rem; }
    .table_wrap td { font-size: 1.6rem; }
    .table_wrap.type2 table { min-width: 960px; }
    .table_wrap.type3 table { min-width: 0; }
    .table_wrap.type3 table * { display:block; }
    .table_wrap.type3 table colgroup,
    .table_wrap.type3 table thead { display:none; }
    .table_wrap.type3 table tr { position: relative; border-bottom: 1px solid #d7d7df;}
    .table_wrap.type3 table th { height:auto; padding: 12px 0; font-size: 1.8rem; background-color: #F8F8F8; }
    .table_wrap.type3 table td { padding: 3px 10px 3px 51px; font-size: 1.6rem; border:0px;}
    .table_wrap.type3 table td.m_label { position: absolute; top:12px; left:6px; padding: 3px 6px; color: #67676F; font-size: 14px; line-height:14px; border:0px; background-color: #F2F2F4;}
    .table_wrap.type3 table td.m_label:nth-child(2) {top:62px}
    .table_wrap.type3 table td:last-child { padding-bottom: 12px; color:#67676F; }
    .table_wrap.type3 table td:nth-last-child(3) { padding-top: 12px; }
    .table_wrap.type1 { overflow-x: visible; }
    .table_wrap.type1 table { min-width: 0; table-layout: fixed; }
    .content .tab_wrap {margin-top:24px}
    .content .tab_wrap:nth-of-type(1) {margin-top:84px}
    .panel_sustainability_report .sec_sustain_report_hero > figure {width: 100%;}
    .panel_sustainability_report .sec_sustain_report_hero > article > .sustain_report_hero_actions { flex-wrap: nowrap; }
    .panel_sustainability_report .sec_sustain_report_hero > article > .sustain_report_hero_actions [class*="btn_"][class*="border"] { width:100% }
    .panel_sustainability_report .table_wrap.type_report { overflow-x: visible; }
    .panel_sustainability_report .table_wrap.type_report table { width: 100%; min-width: 0; display: block; }
    .panel_sustainability_report .table_wrap.type_report colgroup { display: none; }
    .panel_sustainability_report .table_wrap.type_report tbody { width: 100%; display: block; }
    .panel_sustainability_report .table_wrap.type_report tbody tr { width: 100%; margin: 0 0 16px 0; padding: 20px 0; display: block; background-color: #fff; border-radius: 12px; box-sizing: border-box; }
    .panel_sustainability_report .table_wrap.type_report tbody tr:last-child { margin-bottom: 0; }
    .panel_sustainability_report .table_wrap.type_report tbody td { width: 100%; min-width: 0; height: auto; margin: 0; padding: 0; display: block; border: 0; border-bottom: 0; text-align: left; }
    .panel_sustainability_report .table_wrap.type_report tbody td + td { margin-top: 16px; }
    .panel_sustainability_report .table_wrap.type_report tbody td article { margin: 0; padding: 0; text-align: left; }
    .panel_sustainability_report .table_wrap.type_report tbody td article > h3 { margin: 0; color: #161616; font-size: 1.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .panel_sustainability_report .table_wrap.type_report tbody td article > p { margin: 0; margin-top: 8px; color: #161616; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em; }
    .panel_sustainability_report .table_wrap.type_report tbody td figure { width: 100%;}
    .panel_sustainability_report .table_wrap.type_report tbody td:last-child { margin-top: 20px; text-align: left; }
    .panel_sustainability_report .table_wrap.type_report tbody td:last-child :deep([class*="btn_"]) { justify-content: center; box-sizing: border-box; }
    .panel_sustainability_report .sec_sustain_report_archive { margin-top: 48px; }
    .table_wrap.type1 colgroup col:nth-child(1) { width: 50px !important; }
    .table_wrap.type1 colgroup col:nth-child(2) { width: auto !important; }
    .table_wrap.type1 colgroup col:nth-child(3) { width: 70px !important; }
    .table_wrap.type1 th { padding: 0 10px; line-height: 1.4; word-break: keep-all; }
    .table_wrap.type1 td { padding: 0 10px; line-height: 1.4; word-break: keep-all; }
    .table_wrap td .link_title{font-size: 1.4rem;}
    .sub_header h3 { font-size: 2.4rem; text-align: left; }
    .sub_header p { margin-top: 16px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .sub_header_center h3 { text-align: left; }
    .sub_header_center p { text-align: left; }
    .tab_desc { padding: 0; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
    .sec_vision_together { margin-top: 50px; }
    .esg_process { margin-top: 28px; }
    .esg_flow_card { min-height: 102px; padding: 16px;  gap:16px;}
    .esg_flow_card_head { width: 120px; min-height: 0; padding: 15px 10px; text-align: center;}
    .esg_flow_card_title { font-size: 1.4rem; line-height: 1.4; }
    .esg_flow_card_meta { margin-top: 4px; font-size: 1.2rem;  line-height: 1.2;}
    .esg_flow_card_desc {  margin-left: 0; font-size: 1.3rem; line-height: 1.4; }
    .esg_flow_connector { padding: 12px 0; gap: 10px; }
    .esg_flow_connector_text { font-size: 1.4rem; line-height: 1.4; }
    .esg_flow_note { padding: 16px 0 0 24px; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .esg_committee_table thead th { height: 56px; padding: 0 24px; font-size: 1.6rem; white-space: nowrap; }
    .esg_committee_table tbody td { padding: 6px; font-size: 1.4rem; line-height: 1.5; letter-spacing: -0.01em; }
    .esg_committee_table tbody tr:first-child td { padding-top: 18px; }
    .esg_committee_table tbody tr:last-child td { padding-bottom: 18px; }
    .bnbp_main { margin-top: 24px; gap: 12px; }
    .img_wrapper { width: 100%; }
    .txt_box p { font-size: 1.6rem; line-height: 1.5; }
    .txt_box p + p { margin-top: 14px; }
    .bnbp_sub { margin-top: 40px; }
    .bnbp_sub h4 { margin-bottom: 16px; font-size: 2.2rem; }
    .bnbp_sub > .txt_box p { margin-top: 12px; }
    .social_award_wrap :deep(dl dt > a.acc_tit_btn){min-height: 64px;padding: 0 20px;font-weight: 700;font-size: 1.8rem;line-height: 1.4;letter-spacing: 0;}
}
@media screen and (min-width: 769px) {
    :deep(.m_br) { display: none }
}
</style>