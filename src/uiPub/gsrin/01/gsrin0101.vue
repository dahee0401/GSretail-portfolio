<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
        </div>

        <section class="section-investor">
            <div class="cont_inner">
                <Tabs v-model="CTabIdx" :tab-items="t.Tabs1" tab-class="type_01" :tab-slide="true" @change="onTabChange1" />
                <p v-if="CTabIdx !== 0" class="title-sub-text" v-html="t.MainDesc[CTabIdx - 1]"></p> 
                <div class="tab_content_wrap">
                    <section class="tab_content gsrin0101" v-if="CTabIdx === 1" :aria-label="t.Tabs1[1].item">
                        <div class="subtit_wrap ac">
                            <h3 class="section-sub-title">{{ t.CharterTitle }}</h3>
                            <p class="section-date mt15">{{ t.CharterDate }}</p>
                        </div>

                        <div class="policy_wrap">
                            <dl>
                                <dt>{{ t.PolicyIntroTitle }}</dt>
                                <dd v-html="t.PolicyIntroDesc"></dd>

                                <template v-for="(section, idx) in t.PolicySections" :key="'section-'+idx">
                                    <dt>{{ section.title }}</dt>
                                    <dd>
                                        <template v-for="(sec, sIdx) in section.content" :key="'content-'+idx+'-'+sIdx">
                                            <strong class="bullet_title" :class="{mt30: sIdx > 0}">{{ sec.subTitle }}</strong>
                                            <ul v-if="sec.list && sec.list.length > 0" class="mt15 bullet_01 no_type">
                                                <li v-for="(li, lIdx) in sec.list" :key="'l-'+idx+'-'+sIdx+'-'+lIdx">{{ li }}</li>
                                            </ul>
                                        </template>
                                    </dd>
                                </template>
                            </dl>
                        </div>
                    </section>
                    
                    <section class="tab_content gsrin0102" v-if="CTabIdx === 2" :aria-label="t.Tabs1[2].item">
                        <!-- 1. 이사회 구성 현황 -->
                        <div class="view-2">
                            <div class="sub-title">
                                <div class="text-wrapper-3">{{ t.BoardSectionTitle1 }}</div>
                                <p class="p" v-html="t.BoardSectionDesc1"></p>
                            </div>

                            <div class="view-3 res-swiper-container">
                                <!-- isMobile 상태에 따라 swiper 또는 div로 렌더링 -->
                                <component 
                                    :is="isMobile ? 'swiper' : 'div'"
                                    :slides-per-view="'auto'"
                                    :space-between="20"
                                    class="board-swiper-wrapper"
                                >
                                    <component 
                                        :is="isMobile ? 'swiper-slide' : 'div'"
                                        v-for="(member, mIdx) in t.BoardMemberList" 
                                        :key="'board-' + mIdx" 
                                        class="div-2 res-slide-item"
                                    >
                                        <div class="view-4">
                                            <img class="img" :src="member.img" :alt="member.name" />
                                        </div>
                                        <div class="view-4">
                                            <div class="div-3">
                                                <div class="text-wrapper-4">{{ member.pos }}</div>
                                                <div class="text-wrapper-5">{{ member.name }}</div>
                                            </div>
                                            <div class="div-4">
                                                <div class="div-3">
                                                    <div class="text-wrapper-6">{{ member.term }}</div>
                                                    <div class="text-wrapper-7">{{ member.firstDate }}</div>
                                                </div>
                                                <ul class="view-5 bullet_01 mt10">
                                                    <li v-for="(career, cIdx) in member.careers" 
                                                        :key="'career-' + cIdx" 
                                                        :class="career.class"
                                                        v-html="career.text"
                                                    >
                                                       
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <!-- PC 그리드 레이아웃 사용 시 구분선은 CSS gap으로 대체하므로 v-if="isMobile"일 때만 혹은 제거 권장 -->
                                        <div v-if="!isMobile && mIdx < t.BoardMemberList.length - 1" class="divider pc-only"></div>
                                    </component>
                                </component>
                            </div>
                        </div>
                        <!-- 2. 사외이사 및 위원회 구성 -->
                        <div class="view-2">
                            <div class="view-3 res-swiper-container" v-if="t">
                                <component 
                                    :is="isMobile ? 'swiper' : 'div'"
                                    :slides-per-view="'auto'"
                                    :space-between="20"
                                    class="board-swiper-wrapper"
                                >
                                    <component 
                                        :is="isMobile ? 'swiper-slide' : 'div'"
                                        v-for="(member, sIdx) in t.SubMemberList" 
                                        :key="'sub-' + sIdx" 
                                        class="div-2 res-slide-item"
                                    >
                                        <div class="view-4">
                                            <img class="img" :src="member.img" :alt="member.name" />
                                        </div>
                                        <div class="view-4">
                                            <div class="div-3">
                                                <div class="frame-4">
                                                    <div class="text-wrapper-4">{{ member.pos.split(' / ')[0] }}</div>
                                                    <template v-if="member.pos.includes('/')">
                                                        <div class="rectangle"></div>
                                                        <div class="text-wrapper-4">{{ member.pos.split(' / ')[1] }}</div>
                                                    </template>
                                                </div>
                                                <div class="text-wrapper-5">{{ member.name }}</div>
                                            </div>
                                            <div class="div-4">
                                                <div class="div-3">
                                                    <div class="text-wrapper-6">{{ member.term }}</div>
                                                    <div class="text-wrapper-7">{{ member.firstDate }}</div>
                                                </div>
                                                <ul class="view-5 bullet_01 mt10">
                                                    <li v-for="(career, cIdx) in member.careers" 
                                                        :key="'sc-' + cIdx" 
                                                        :class="career.class"
                                                        v-html="career.text"
                                                    >
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div v-if="!isMobile && sIdx < t.SubMemberList.length - 1" class="divider pc-divider"></div>
                                    </component>
                                </component>
                            </div>
                        </div>
                        <!-- 이사회 역량 구성표 예시 (다른 영역도 동일한 방식으로 적용 가능) -->
                        <div class="view-2">
                            <div class="sub-title">
                                <h3 class="text-wrapper-3">{{ t.BoardSectionTitle2 }}</h3>
                            </div>                            
                            <div class="table_wrap type_open">
                                <div class="inner">
                                    <table class="ac" style="min-width:800px;">
                                        <thead>
                                            <tr>
                                                <th rowspan="2">{{t.MatrixTable.title}}</th>

                                                <th
                                                    v-for="group in t.MatrixTable.columns"
                                                    :key="group.type"
                                                    :colspan="group.list.length"
                                                >
                                                    {{ group.type }}
                                                </th>
                                            </tr>

                                            <tr>
                                                <template v-for="group in t.MatrixTable.columns" :key="group.type">
                                                    <th
                                                        v-for="item in group.list"
                                                        :key="item.title"
                                                    >
                                                        {{ item.title }}
                                                    </th>
                                                </template>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr
                                                v-for="row in t.MatrixTable.rows"
                                                :key="row.title"
                                            >
                                                <td v-html="row.title"></td>

                                                <td
                                                    v-for="item in row.list"
                                                    :key="item.name"
                                                    v-html="item.name">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                        <div class="view-2">
                            <div class="sub-title"><div class="text-wrapper-3">{{ t.BoardSectionTitle3 }}</div>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th v-for="(committee, cIdx) in t.CommitteeTable" :key="'comm-th-' + cIdx" scope="col" class="table-cell">
                                            <span class="text-wrapper-19">{{ committee.title }}</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td v-for="(committee, cIdx) in t.CommitteeTable" :key="'comm-td-' + cIdx" class="view-wrapper" :data-title="committee.title">
                                            <div class="view-7">
                                                <div class="view-8">
                                                    <span class="text-wrapper-20">{{ t.ChairLabel }}</span>
                                                    <span class="text-wrapper-21">{{ committee.chair }}</span>
                                                </div>
                                                <div class="view-8">
                                                    <span class="text-wrapper-20">{{ t.MemberLabel }}</span>
                                                    <span class="text-wrapper-21">{{ committee.members }}</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="button-group">
                                <button v-for="(btn, bIdx) in t.BoardDownloadBtns" :key="'btn-'+bIdx" class="btn_mid btn_icon_file after" @click="handleDownload(btn.link)">
                                    <div class="view-9">
                                        <div class="text-wrapper-22">{{ btn.text }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </section>

                    <section class="tab_content gsrin0103" v-if="CTabIdx === 3" :aria-label="t.Tabs1[3].item">
                        <div class="eval_item_group">
                            <div class="eval_title_box ac">
                                <h3 class="section-sub-title">{{ t.EvalSystemTitle }}</h3>
                            </div>
                            <div class="policy_wrap">
                                <table>
                                    <colgroup>
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                    </colgroup>
                                    <tbody>
                                        <tr v-for="(row, rIdx) in t.EvalSystemTable" :key="'system-'+rIdx">
                                            <th scope="row"><span class="important"><span style="color:#ed3030;">*</span> {{ row.label }}</span></th>
                                            <td v-html="row.content"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="eval_item_group">
                            <div class="eval_title_box ac">
                                <h3 class="section-sub-title">{{ t.EvalResultTitle }}</h3>
                            </div>
                            <div class="policy_wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>{{ t.EvalResultHeader.col1 }}</th>
                                            <th>{{ t.EvalResultHeader.col2 }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(res, resIdx) in t.EvalResultData" :key="'res-'+resIdx">
                                            <td>{{ res.category }}</td>
                                            <td>{{ res.score }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="eval_item_group">
                            <div class="sub-title">
                                <h3 class="text-wrapper-3" style="width:100%;">{{ t.EvalUsageTitle }}</h3>
                            </div>
                            <div class="res-swiper-container">
                                <!-- 스크립트에서 설정한 isMobile 상태에 따라 태그 전환 -->
                                <component 
                                    :is="isMobile ? 'swiper' : 'div'"
                                    :slides-per-view="'auto'"
                                    :space-between="20"
                                    class="eval-usage-swiper-wrapper"
                                >
                                    <component 
                                        :is="isMobile ? 'swiper-slide' : 'div'"
                                        v-for="(card, cIdx) in t.EvalUsageCards" 
                                        :key="'usage-'+cIdx" 
                                        class="card_item res-slide-item"
                                        :class="'card-' + (cIdx + 1)"
                                    >
                                        <div class="title-2">
                                            <div class="text-wrapper-6">{{ card.num }}</div>
                                            <p class="element" v-html="card.title"></p>
                                        </div>
                                        <div v-if="card.sub" class="body">
                                            <div class="text-wrapper-7">{{ card.sub }}</div>
                                        </div>
                                    </component>
                                </component>
                            </div>
                        </div>
                    </section>

                    <section class="tab_content gsrin0104" v-if="CTabIdx === 4" :aria-label="t.Tabs1[4].item">
                        <div class="diff_table_wrap ">
                            <div class="policy_wrap">
                                <table>
                                    <colgroup>
                                        <col style="width: auto;">
                                        <col style="width: 150px;">
                                        <col style="width: 350px;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col" style="text-align:center; border-right:1px solid #E5E5E9;">{{ t.DiffTableHeader.col1 }}</th>
                                            <th scope="col" style="text-align:center; border-right:1px solid #E5E5E9;">{{ t.DiffTableHeader.col2 }}</th>
                                            <th scope="col" style="text-align:center;">{{ t.DiffTableHeader.col3 }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, idx) in t.DiffTableData" :key="'diff-'+idx">
                                            <td>{{ item.recommendation }}</td>
                                            <td class="ac">{{ item.status }}</td>
                                            <td class="ac">{{ item.note }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';


export default {
    name: "gsrin0102",
    components: { Tabs, Swiper, SwiperSlide },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            CTabIdx: 1,
            selectedFilter: "",
            isMobile: false,
            langData: {
                ko: {
                    MainTitle: "기업지배구조",
                    PreparingFile: "파일을 준비 중입니다.",
                    MainDesc: [
                        "GS리테일은<br/> 기업지배구조헌장에 의거, <br/>건전한 지배구조를 <br/>확립하고 있습니다",
                        "GS리테일은<br/> 투명한 경영 문화 정착을 위해,<br/>이사회 중심 경영을<br/> 실천하고 있습니다.",
                        "GS리테일은<br/> 이사회 운영 개선 및 지배구조 신뢰성 제고를 위하여<br/>2021년 12월 개최된 정기이사회에서<br/> 이사회 평가제도를 도입하였습니다.",
                        "GS리테일은<br/> 지속가능한 경영을 위해,<br/> 지배구조건전성을 <br/>지속 개선해 나아가겠습니다."
                    ],
                    Tabs1: [{ item: "이사회 의장 인사말" }, { item: "지배구조헌장" }, { item: "이사회 및 위원회 구성" }, { item: "이사회 평가" }, { item: "지배구조 모범규준과의 차이" }], 
                    tab1Url: "gsrin0100",

                    // [Tab 1] 지배구조헌장 전체 데이터 (KO)
                    CharterTitle: "㈜GS리테일 기업지배구조헌장", 
                    CharterDate: "제정 2021.02.08",
                    PolicyIntroTitle: "전문",
                    PolicyIntroDesc: "<p class='desc'>㈜GS리테일(이하 “회사”라 함.)은 건전한 기업지배구조 확립을 기반으로 하여, 모든 이해관계자와 신뢰를 구축하고, 끊임없는 도전으로 고객의 라이프 이노베이션(Life Innovation)을 선도하는 회사로 도약하고자 한다. 이러한 비전 달성을 위해 본 기업지배구조헌장을 제정한다.</p><p class='desc'>회사는 본 기업지배구조헌장에 따라, 주주의 권리 보장, 이사회의 역할과 책임, 전문 감사기구의 독립적 운영 등 회사의 건전한 지배구조를 확립하여, 공정하고 투명한 경영활동을 지향하며, 주주·고객·임직원 등 모든 이해관계자의 지속적인 권익 증진을 위해 노력한다.</p>",
                    PolicySections: [
                        {
                            title: "I. 주 주",
                            content: [
                                { subTitle: "1. 주주의 권리", list: [
                                    "① 주주는 회사의 소유자이며, 이익 분배에 참여 할 수 있는 권리, 주주총회 참석 및 의결권을 행사 할 수 있는 권리, 주주총회의 목적사항을 제안할 수 있는 권리 등 관련 법령이 보장하는 기본적인 권리를 보장 받는다.",
                                    "② 정관의 변경, 합병, 영업양수도 및 기업의 분할, 해산, 자본금의 감소 등 관련 법령이 정하는 사항 중 회사의 존립과 주주권에 중대한 변화를 가져오는 사항은 주주의 권리를 최대한 보장하며, 주주총회를 통해 결정한다.",
                                    "③ 회사는 주주총회의 결의가 투명하고 공정한 절차에 따라 이루어지도록 노력하며, 주주에 대하여 주주총회 참석 전에 주주총회의 일시와 장소 및 의안 의결권의 행사 방법 등에 관하여 충분한 정보를 제공한다.",
                                    "④ 주주권의 행사는 주주의 자유로운 의사에 따라 행사되어야 한다."
                                ]},
                                { subTitle: "2. 주주의 공평한 대우", list: [
                                    "① 주주는 1주 1의결권 원칙에 따라 권리를 보장 받는다. 단, 법령에 의거하여, 특정 주주의 의결권이 제한되는 경우, 관련 법령을 따른다. 회사는 상법 및 관련 법령이 정하는 기준에 따라 주주의 본질적인 권리가 훼손되지 않도록 공평하게 대우한다.",
                                    "② 회사는 주주에게 필요한 정보를 적시에 충분히 이해할 수 있도록 쉽게 구성하여, 공평한 방법으로 제공한다. 또한 부당한 내부거래 및 자기거래로부터 주주가 보호될 수 있도록 노력한다."
                                ]},
                                { subTitle: "3. 주주의 책임", list: [
                                    "① 주주는 회사의 발전과 이익을 위하여, 자신의 의결권을 적극적으로 행사하여야 한다.",
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
                                { subTitle: "6. 사외이사의 역할", list: [
                                    "① 사외이사는 독립성을 바탕으로 중요한 경영정책 결정에 참여하고, 전문성을 바탕으로 경영진을 감독하여, 회사가 건전하게 사업을 영위할 수 있도록 지원한다.",
                                    "② 회사는 사외이사가 회사의 경영 실태 및 현황에 대하여 정확히 파악할 수 있도록 직무 수행에 필요한 정보를 신속하게 제공하며, 사외이사는 회사에게 직무수행에 필요한 정보의 제공을 요청할 수 있다. 또한 사외이사는 필요한 경우 외부 전문가의 조력을 받을 수 있으며, 회사는 이에 소요되는 비용을 지원한다."
                                ]},
                                { subTitle: "7. 이사의 역할", list: [
                                    "① 이사는 선량한 관리자로서 그 책임을 다해, 이사회에 적극적으로 참여하며, 회사와 주주 및 이해관계자의 지속적인 이익 증진을 위해 최선의 의사 결정을 하여야 한다.",
                                    "② 이사는 전체 주주의 이익을 고려한 의사결정을 하며, 직무상 얻어진 정보를 외부에 누출하거나 개인의 이익을 위하여 사용하여서는 안되며, 이사가 법령이나 정관을 위배하여 그 임무를 소홀히 하여 손해가 발생한 경우, 이사는 회사 또는 제3자에 대하여 손해배상책임을 진다.",
                                    "③ 회사는 유능한 인사를 유치하고 책임 추궁의 실효성을 확보하기 위하여 회사의 비용으로 이사를 위한 손해배상책임보험에 가입할 수 있다."
                                ]},
                                { subTitle: "8. 평가 및 보상", list: [
                                    "① 경영진의 경영활동을 공정하게 평가하여야 하며, 그 결과를 보수에 적정하게 반영한다. 이사의 보수는 주주총회에서 승인된 범위 내에서 적절한 심사를 거쳐 집행한다.",
                                    "② 사외이사의 활동 내역은 사외이사후보추천위원회에서 공정하게 평가하여, 그 평가결과를 재선임의 결정 등에 반영할 수 있다."
                                ]},
                                { subTitle: "9. 이사의 교육", list: [
                                    "① 회사는 이사회의 전문성 제고를 위해, 이사의 직무 수행에 필요한 교육 및 능력 개발의 기회를 회사의 비용으로 제공할 수 있다."
                                ]}
                            ]
                        },
                        {
                            title: "III. 감 사 기 구",
                            content: [
                                { subTitle: "1. 감사위원회", list: [
                                    "① 감사위원회는 3인 이상의 이사로 구성하되, 위원의 3분의 2 이상은 사외이사로 하고, 회계 또는 재무 전문가를 1인 이상 포함하여 구성한다.",
                                    "② 감사위원회의 회계 및 업무 감사에 관한 사항 등 법령과 정관이 정하는 바에 따라, 이사와 경영진의 직무집행에 대한 적법성 감사, 재무활동의 건전성과 재무보고의 정확성 검토, 중요한 회계처리기준이나 회계추정 변경의 타당성 검토, 외부감사인의 선임 및 해임에 대한 승인, 외부감사인의 감사활동에 대한 평가 등의 업무를 독립적으로 수행한다.",
                                    "③ 감사위원회 회의는 분기 1회 이상 개최하고, 필요한 경우 수시로 개최할 수 있다."
                                ]},
                                { subTitle: "2. 외부감사인", list: [
                                    "① 외부감사인은 회사와 경영진 및 특정주주 등으로부터 독립적인 입장에서 공정하게 감사 업무를 수행하여야 한다.",
                                    "② 외부감사인은 외부감사 활동 중 확인한 중요사항을 감사위원회에 보고한다.",
                                    "③ 외부감사인은 주주총회에 참석하여 감사보고서에 관한 주주의 질문이 있는 경우, 이에 충분히 설명하여야 한다."
                                ]}
                            ]
                        },
                        {
                            title: "IV. 이해관계자",
                            content: [
                                { subTitle: "", list: ["1. 회사는 고객, 주주, 임직원 등 모든 이해관계자의 권리 보호를 위한 사회적 책임을 충실히 이행한다."] },
                                { subTitle: "", list: ["2. 회사는 근로기준법 등 노동관계 법령을 성실히 준수하고, 근로조건의 유지 개선에 노력한다."] },
                                { subTitle: "", list: ["3. 회사는 법령이 허용하는 범위 내에서 이해관계자의 권리보호에 필요한 정보를 제공하며, 이해관계자의 관련정보 접근을 지원한다."] }
                            ]
                        },
                        {
                            title: "V. 공 시",
                            content: [
                                { subTitle: "", list: ["1. 회사는 정기적으로 사업보고서, 분기보고서 및 반기보고서 등을 작성하여 공시하며, 법령에서 요구하는 공시 사항과 주주 및 이해관계자에게 중대한 영향을 미칠 수 있는 사항은 신속하고 정확하게 공시한다."] },
                                { subTitle: "", list: ["2. 회사는 중요한 기업 정보의 공개 범위나 공개 시기에 있어 특정인을 우대하거나 차별하지 않으며, 모든 이해관계자들이 동시에 접근할 수 있도록 공시한다."] }
                            ]
                        },
                        {
                            title: "부 칙(2021.2.8)",
                            content: [
                                { subTitle: "", list: ["제 1 조(시행일) 이 헌장은 2021년 2월 8일부터 시행한다."] }
                            ]
                        }
                        
                    ],
                    BoardSectionTitle1: `이사회 구성 현황`,
                    BoardSectionDesc1: `사내이사, 사외이사, 기타 비상무이사로 구성된 이사회 현황입니다.<br />독립성과 전문성을 갖춘 사외이사를 통해 투명성과 견제 기능을 강화하고 있습니다.`,
                    BoardSectionTitleSub: `사외이사 및 위원회 구성`,
                    BoardSectionDescSub: `독립성과 전문성을 갖춘 사외이사를 통해 경영 투명성과 견제 기능을 강화하고 있습니다.`, 
                    BoardMemberList: [
                        {
                            pos: "대표이사", name: "허서홍", 
                            img: require("@/assets/images/dummy/gsrin0102_1.png"),
                            term: "2025.03.20~2028.03.19", firstDate: "2025.03.20 최초선임",
                            careers: [
                                { text: "美 스탠퍼드대", class: "" },
                                { text: "2022년 (주)GS 미래사업팀장", class: "" },
                                { text: "2024년 (주)GS리테일 경영전략 Service Unit장", class: "" },
                                { text: "現) (주)GS리테일 대표이사", class: "point" }
                            ]
                        },
                        {
                            pos: "사내이사", name: "오진석", 
                            img: require("@/assets/images/dummy/gsrin0102_2.png"),
                            term: "2024.03.21~2027.03.20", firstDate: "2024.03.21 최초선임",
                            careers: [
                                { text: "서강대", class: "" },
                                { text: "2014년 (주)GS리테일 경영지원부문장", class: "" },
                                { text: "2021년 (주)GS리테일 전략부문장", class: "" },
                                { text: "現) (주)GS리테일 플랫폼BU장", class: "point" }
                            ]
                        },
                        {
                            pos: "기타 비상무이사", name: "홍순기", 
                            img: require("@/assets/images/dummy/gsrin0102_3.png"),
                            term: "2024.03.21~2027.03.20", firstDate: "2021.07.01 최초선임", 
                            careers: [
                                { text: "연세대", class: "" },
                                { text: "2017년 (주)GS 재무팀장", class: "" },
                                { text: "現) (주)GS 대표이사", class: "point" }
                            ]
                        }
                    ],
                    SubMemberList: [
                        {
                            pos: "사외이사 / 이사회의장", name: "이성락", 
                            img: require("@/assets/images/dummy/gsrin0102_4.png"),
                            term: "2022.03.25~2028.03.19", firstDate: "2022.03.25 최초선임", 
                            careers: [
                                { text: "건국대", class: "" },
                                { text: "2009년 (주)신한은행 부행장", class: "" },
                                { text: "2013년 신한생명보험(주) 사장", class: "" },
                                { text: "2017년 (주)고든앤파트너스 대표이사", class: "" }
                            ]
                        },
                        {
                            pos: "사외이사", name: "이상규", 
                            img: require("@/assets/images/dummy/gsrin0102_6.png"),
                            term: "2026.03.19~2029.03.18", firstDate: "2023.03.23 최초선임",
                            careers: [
                                { text: "美 워싱턴대", class: "" },
                                { text: "2012년 LG전자(주) 한국B2C 그룹장", class: "" },
                                { text: "2016년 LG전자(주) 한국모바일 그룹장", class: "" },
                                { text: "2021년 LG전자(주) 한국영업 본부장, 사장", class: "" },
                                { text: "現) 숙명여자대학교 석좌교수", class: "point" }
                            ]
                        },
                        {
                            pos: "사외이사", name: "윤윤진", 
                            img: require("@/assets/images/dummy/gsrin0102_7.png"),
                            term: "2025.03.20~2028.03.19", firstDate: "2025.03.20 최초선임",
                            careers: [
                                { text: "美 UC 버클리대", class: "" },
                                { text: "2009년 Stanford SRI International 인공지능 연구센터 연구원", class: "" },
                                { text: "2018년 국토안전관리원 비상임 이사", class: "" },
                                { text: "現) 카이스트 건설 및 환경공학과 교수", class: "point" }
                            ]
                        },
                        {
                            pos: "사외이사", name: "안동현", 
                            img: require("@/assets/images/dummy/gsrin0102_5.png"),
                            term: "2026.03.19~2029.03.18", firstDate: "2026.03.19 최초선임",
                            careers: [
                                { text: "美 뉴욕대", class: "" },
                                { text: "2015년 공적자금관리 위원회<br />매각위원장", class: "" },
                                { text: "2016년 자본시장연구원 원장", class: "" },
                                { text: "2022년 금융발전 심의회 위원장", class: "" },
                                { text: "現) 서울대학교 경제학부 교수", class: "point" }
                            ]
                        },


                    ],
                    BoardSectionTitle2: "이사회 역량 구성표 (Board Skills Matrix)",
                    SkillsList: [
                        { type: "사내이사/대표이사", name: "허서홍", appointDate: "2025.03 선임", tags: [{text: "경영·리더십", class:""}, {text: "리스크관리·ESG", class:""}, {text: "유통·관련산업", class:""}] },
                        { type: "사내이사", name: "오진석", appointDate: "2024.03 선임", tags: [{text: "경영·리더십", class:""}, {text: "금융", class:"TAG-2"}, {text: "리스크관리·ESG", class:""}, {text: "보상위원회", class:"TAG-3"}] },
                        { type: "기타 비상무이사", name: "홍순기", appointDate: "2021.07 선임", tags: [{text: "경영·리더십", class:""}, {text: "재무·회계", class:""}, {text: "리스크관리·ESG", class:""}, {text: "ESG위", class:"TAG-3"}] },
                        { type: "사외이사", name: "이성락", appointDate: "2022.03 선임", tags: [{text: "경영·리더십", class:"TAG-2"}, {text: "금융", class:"TAG-2"}, {text: "리스크관리·ESG", class:"TAG-2"}, {text: "독립성", class:"TAG-2"}, {text: "내부거래위", class:"TAG-4"}, {text: "사외이사추천위", class:"TAG-4"}, {text: "감사위원회", class:"TAG-4"}] },
                        { type: "사외이사", name: "안동현", appointDate: "2026.03 선임", tags: [{text: "재무·회계", class:"TAG-2"}, {text: "금융", class:"TAG-2"}, {text: "리스크관리·ESG", class:"TAG-2"}, {text: "독립성", class:"TAG-2"}] },
                        { type: "사외이사", name: "이상규", appointDate: "2023.03 선임", tags: [{text: "유통·관련산업", class:""}, {text: "리스크관리·ESG", class:""}, {text: "독립성", class:"TAG-2"}, {text: "경영·리더십", class:"TAG-2"}, {text: "내부거래위", class:"TAG-3"}, {text: "사외이사추천위", class:"TAG-3"}, {text: "ESG위", class:"TAG-3"}] },
                        { type: "사외이사", name: "윤윤진", appointDate: "2025.03 선임", tags: [{text: "IT", class:""}, {text: "리스크관리·ESG", class:""}, {text: "독립성", class:""}, {text: "감사위", class:"TAG-3"}, {text: "ESG위", class:"TAG-3"}, {text: "보상위", class:"TAG-3"}, {text: "내부거래위", class:"TAG-3"}] }
                    ],
                    BoardSectionTitle3: "이사회 내 위원회 현황",
                    ChairLabel: "위원장", MemberLabel: "위원",

                    MatrixTable: {
                        title: "구분",
                        columns: [
                            {
                                type: "사내이사",
                                list: [
                                    { title: "허서홍" },
                                    { title: "오진석" }
                                ]
                            },
                            {
                                type: "기타 비상무이사",
                                list: [
                                    { title: "홍순기" }
                                ]
                            },
                            {
                                type: "사외이사",
                                list: [
                                    { title: "이성락" },
                                    { title: "이상규" },
                                    { title: "윤윤진" },
                                    { title: "안동현" }
                                ]
                            }
                        ],

                        rows: [
                            {
                                title: "경영·리더십",
                                list: [
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "" },
                                    { name: "" }
                                ]
                            },
                            {
                                title: "유통·관련산업",
                                list: [
                                    { name: "O" },
                                    { name: "" },
                                    { name: "" },
                                    { name: "" },
                                    { name: "O" },
                                    { name: "" },
                                    { name: "" }
                                ]
                            },
                            {
                                title: "재무·회계",
                                list: [
                                    { name: "" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "" },
                                    { name: "" }
                                ]
                            },
                            {
                                title: "금융",
                                list: [
                                    { name: "" },
                                    { name: "O" },
                                    { name: "" },
                                    { name: "O" },
                                    { name: "" },
                                    { name: "" },
                                    { name: "O" }
                                ]
                            },
                            {
                                title: "IT",
                                list: [
                                    { name: "" },
                                    { name: "" },
                                    { name: "" },
                                    { name: "" },
                                    { name: "" },
                                    { name: "" },
                                    { name: "O" }
                                ]
                            },
                            {
                                title: "리스크관리·ESG",
                                list: [
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" }
                                ]
                            },
                            {
                                title: "독립성",
                                list: [
                                    { name: "" },
                                    { name: "" },
                                    { name: "" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" },
                                    { name: "O" }
                                ]
                            },
                            {
                                title: "최초 선임일",
                                list: [
                                    { name: "2025.03" },
                                    { name: "2024.03" },
                                    { name: "2021.07" },
                                    { name: "2022.03" },
                                    { name: "2023.03" },
                                    { name: "2025.03" },
                                    { name: "2026.03" }
                                ]
                            },
                            {
                                title: "소속 위원회",
                                list: [
                                    { name: "-" },
                                    { name: "보상위" },
                                    { name: "ESG위" },
                                    { name: "내부위<br/> 사추위<br/> 감사위" },
                                    { name: "내부위<br/> 사추위<br/> ESG위" },
                                    { name: "내부위<br/> 감사위<br/> ESG위<br/> 보상위" },
                                    { name: "사추위<br/> 감사위<br/> ESG위<br/> 보상위" }
                                ]
                            },
                            {
                                title: "성별",
                                list: [
                                    { name: "남" },
                                    { name: "남" },
                                    { name: "남" },
                                    { name: "남" },
                                    { name: "남" },
                                    { name: "여" },
                                    { name: "남" }
                                ]
                            }
                        ]
                    },

                    CommitteeTable: [
                        { title: "내부거래위원회", chair: "이상규", members: "이성락, 윤윤진" },
                        { title: "사외이사후보추천위원회", chair: "안동현", members: "이성락, 이상규" },
                        { title: "감사위원회", chair: "안동현", members: "이성락, 윤윤진" },
                        { title: "ESG위원회", chair: "이상규", members: "윤윤진, 안동현, 홍순기" },
                        { title: "보상위원회", chair: "윤윤진", members: "안동현, 오진석" }
                    ],
                    // [Tab 2] BoardDownloadBtns 데이터 부분
                    BoardDownloadBtns: [
                        { 
                            text: "(주)GS리테일 정관", 
                            link: "https://hpimg.gsretail.com/_ui/desktop/common/docs/gsr_incorporation.pdf" 
                        },
                        { 
                            text: "이사회 규정", 
                            link: "https://hpimg.gsretail.com/_ui/desktop/common/docs/boardCharter.pdf" 
                        },
                        { 
                            text: "감사위원회 규정", 
                            link: "https://hpimg.gsretail.com/_ui/desktop/common/docs/directors_audit_committee.pdf" 
                        },
                        { 
                            text: "사외이사후보 추천위원회 규정", 
                            link: "https://hpimg.gsretail.com/_ui/desktop/common/docs/%EC%82%AC%EC%99%B8%EC%9D%B4%EC%82%AC%ED%9B%84%EB%B3%B4%20%EC%B6%94%EC%B2%9C%EC%9C%84%EC%9B%90%ED%9A%8C%20%EA%B7%9C%EC%A0%95.pdf"
                        },
                        { 
                            text: "내부거래위원회 운영규정", 
                            link: "https://hpimg.gsretail.com/_ui/desktop/common/docs/internal_trade_commission_rule.pdf"
                        },
                        { 
                            text: "ESG 위원회 운영 규정", 
                            link: "https://hpimg.gsretail.com/_ui/desktop/common/docs/ESG%20%EC%9C%84%EC%9B%90%ED%9A%8C%20%EC%9A%B4%EC%98%81%20%EA%B7%9C%EC%A0%95.pdf"
                        },
                        { 
                            text: "보상위원회 운영규정", 
                            link: "https://hpimg.gsretail.com/_ui/desktop/common/docs/%EB%B3%B4%EC%83%81%EC%9C%84%EC%9B%90%ED%9A%8C%20%EC%9A%B4%EC%98%81%20%EA%B7%9C%EC%A0%95.pdf"
                        }
                    ],
                    SelectMsg: "위원회 선택", SelectOptions: [{value:'', label:'위원회 선택'}, {value:'0', label:'감사위원회'}, {value:'1', label:'ESG위원회'}],
                    BtnConfirm: "목록보기",
                    EvalSystemTitle: "이사회 평가 제도",
                    EvalSystemTable: [
                        { label: "평가 주기", content: "사업연도 中 1회" },
                        { label: "평가 항목", content: "1.이사회 운영 효율성<br/>2.이사회 성과<br/>3.이사회 內 위원회 활동<br/>4.사외이사 자가 평가" },
                        { label: "평가 사항", content: "관련 제도 및 운영 수준 등" },
                        { label: "평가 방식", content: "구성원 자가 평가" },
                        { label: "평가 참여자", content: "이사회 구성원 전원(7인)<br/>※ 사외이사 자가 평가는 사외이사(4인) 대상 진행" }
                    ],
                    EvalResultTitle: "2025년 이사회 평가 결과",
                    EvalResultHeader: { col1: "구분", col2: "평가결과" }, // 추가
                    EvalResultData: [
                        { category: "이사회 성과", score: "4.6점/5.0점" },
                        { category: "이사회 운영 효율성", score: "4.7점/5.0점" },
                        { category: "위원회 활동", score: "4.5점/5.0점" },
                        { category: "사외이사 자가 평가", score: "4.6점/5.0점" }
                    ],
                    EvalUsageTitle: "평가 결과 활용",
                    EvalUsageCards: [
                        { num: "01", title: "평가 결과<br/>이사회 보고" },
                        { num: "02", title: "이사회 의장 및 사외이사<br/>중심 평가 결과 리뷰", sub: "(별도 대면 면담 방식)" },
                        { num: "03", title: "리뷰를 통한<br/>개선점 도출 및 이사회 반영" },
                        { num: "04", title: "이사회 운영<br/>개선 및 지배구조 신뢰성 제고" },
                        { num: "05", title: "지속가능경영보고서 및<br/>홈페이지 등 이사회 평가 결과 공개" }
                    ],
                    DiffTableHeader: { col1: "기업지배구조 모범규준 권고 사항", col2: "채택여부", col3: "비고" },
                    DiffTableData: [
                        { recommendation: "기업지배구조헌장 도입", status: "O", note: "-" },
                        { recommendation: "이사회 구성요건", status: "O", note: "과반수(57.1%) 사외이사 구성" },
                        { recommendation: "이사회 의장과 대표이사 분리", status: "O", note: "사외이사 의장 운영" },
                        { recommendation: "사외이사의 독립성", status: "O", note: "-" },
                        { recommendation: "사외이사후보추천위원회 구성", status: "O", note: "-" },
                        { recommendation: "보상위원회 구성", status: "O", note: "-" },
                        { recommendation: "이사회 및 이사회 내 위원회 운영규정 제정", status: "O", note: "-" },
                        { recommendation: "이사회 및 이사회 내 위원회 활동 내역, 주요 안건에 대한 찬반 여부 공시", status: "O", note: "-" },
                        { recommendation: "이사회 평가", status: "O", note: "-" },
                        { recommendation: "이사회 개최시 이사에 대한 사전 정보제공", status: "O", note: "-" },
                        { recommendation: "감사위원회 구성", status: "O", note: "전원 사외이사" },
                        { recommendation: "집중투표제의 도입", status: "X", note: "-" },
                        { recommendation: "대표이사 및 재무담당 책임자의 재무보고에 대한 정확과 완전성 인증", status: "O", note: "-" },
                        { recommendation: "회사비용으로 이사를 위한 손해배상보험 가입", status: "O", note: "임원배상책임보험 가입" },
                        { recommendation: "임직원 윤리규정 도입 및 공시", status: "O", note: "-" },
                        { recommendation: "모범규준과의 차이설명", status: "O", note: "-" }
                    ]
                },
                en: {
                    MainTitle: "Corporate Governance",
                    PreparingFile: "The file is being prepared."/* 260708 번역 */,
                    MainDesc: [
                        "GS Retail establishes a sound corporate governance structure in accordance with its Corporate Governance Charter.",
                        "GS Retail is committed to board-centric management to foster a culture of transparent governance.",
                        "To improve board operations and enhance governance credibility, GS Retail introduced a board evaluation system at the regular board meeting held in December 2021.",
                        "GS Retail is committed to continuously strengthening its corporate governance in pursuit of sustainable management."
                    ],
                    Tabs1: [{ item: "Message from the Chairman of the Board of Directors"/* 260708 번역 */ }, { item: "Corporate Governance Charter" }, { item: "Board and Committee Composition" }, { item: "Board Evaluation" }, { item: "Differences from Governance Best Practice Guidelines" }],
                    tab1Url: "gsrin0100",
                    
                    // [Tab 1] 지배구조헌장 전체 데이터 (KO)
                    CharterTitle: "GS Retail Corporate Governance Charter", 
                    CharterDate: "Enacted: February 8, 2021",
                    PolicyIntroTitle: "Preamble",
                    PolicyIntroDesc: "GS Retail Co., Ltd. (hereinafter the 'Company') aspires to build trust with all stakeholders on the foundation of a sound corporate governance structure, and to rise as a company that leads customer Life Innovation through relentless challenge. To achieve this vision, this Corporate Governance Charter is hereby enacted. In accordance with this Charter, the Company shall establish a sound governance structure, including the protection of shareholder rights, the roles and responsibilities of the Board of Directors, and the independent operation of professional audit bodies, to pursue fair and transparent management practices and continuously advance the rights and interests of all stakeholders, including shareholders, customers, and employees.",
                    PolicySections: [
                        {
                            title: "I. Shareholders",
                            content: [
                                { subTitle: "1. Shareholder Rights", list: [
                                    "① Shareholders are the owners of the Company and are guaranteed the basic rights protected by relevant statutes, including the right to participate in profit distribution, the right to attend the general meeting of shareholders and exercise voting rights, and the right to propose agenda items for the general meeting of shareholders."/* 260604 번역 */,
                                    "② Matters that bring about significant changes to the company's existence and shareholder rights—among those prescribed by relevant laws, such as amendment of the articles of incorporation, merger, transfer of business, company division, dissolution, and capital reduction—shall be decided at the general meeting of shareholders, maximizing the protection of shareholder rights."/* 260604 번역 */,
                                    "③ The Company strives to ensure that resolutions of the general meeting of shareholders are made through transparent and fair procedures, and provides shareholders, before they attend the general meeting, with sufficient information regarding the date, time, and place of the meeting, the agenda items, and the methods of exercising voting rights."/* 260604 번역 */,
                                    "④ The exercise of shareholder rights shall be carried out in accordance with the free will of the shareholders."/* 260604 번역 */
                                ]},
                                { subTitle: "2. Equal Treatment of Shareholders", list: [
                                    "① Shareholders are guaranteed their rights in accordance with the principle of one vote per share. However, where the voting rights of a particular shareholder are restricted pursuant to statutes, the relevant statutes shall apply. The Company treats shareholders equitably in accordance with the standards prescribed by the Commercial Act and relevant statutes, so that the essential rights of shareholders are not impaired."/* 260604 번역 */,
                                    "② The Company provides shareholders with the information they need in a timely manner, organized in an easily understandable way, and through an equitable method. The Company also strives to protect shareholders from unfair related-party transactions and self-dealing."/* 260604 번역 */
                                ]},
                                { subTitle: "3. Shareholder Responsibilities", list: [
                                    "① Shareholders shall actively exercise their voting rights for the development and benefit of the company."/* 260604 번역 */,
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
                                { subTitle: "6. Role of Outside Directors", list: [
                                    "① Outside directors participate in important management policy decisions based on their independence and supervise management based on their expertise, thereby supporting the company in conducting its business soundly."/* 260604 번역 */,
                                    "② The company promptly provides outside directors with the information necessary for performing their duties so that they can accurately understand the company's management status and current situation, and outside directors may request the company to provide information necessary for performing their duties. In addition, outside directors may receive assistance from external experts when necessary, and the company supports the costs incurred."/* 260604 번역 */
                                ]},
                                { subTitle: "7. Role of Directors", list: [
                                    "① As a prudent manager, a director shall fulfill their responsibilities, actively participate in the board of directors, and make the best decisions to continuously enhance the interests of the company, its shareholders, and stakeholders."/* 260604 번역 */,
                                    "② Directors shall make decisions considering the interests of all shareholders, and shall not leak information obtained in the course of their duties externally or use it for personal gain. If a director neglects their duties in violation of laws or the articles of incorporation, causing damage, the director shall be liable for damages to the company or third parties."/* 260604 번역 */,
                                    "③ To attract competent personnel and ensure the effectiveness of accountability, the company may take out directors' liability insurance at the company's expense."/* 260604 번역 */
                                ]},
                                { subTitle: "8. Evaluation and Compensation", list: [
                                    "The management activities of executives shall be evaluated fairly, and the results shall be appropriately reflected in compensation. Directors' compensation shall be executed within the scope approved by the General Meeting of Shareholders after appropriate review.",
                                    "The activities of outside directors shall be fairly evaluated by the Outside Director Candidate Nomination Committee, and the evaluation results may be reflected in decisions regarding re-appointment."
                                ]},
                                { subTitle: "9. Director Training", list: [
                                    "The Company may provide directors with opportunities for training and capability development necessary for the performance of their duties at the Company's expense, in order to enhance the expertise of the Board of Directors."
                                ]}
                            ]
                        },
                        {
                            title: "III. Audit Bodies",
                            content: [
                                { subTitle: "1. Audit Committee", list: [
                                    "① The Audit Committee shall be composed of three or more directors, with at least two-thirds being outside directors, and shall include at least one accounting or financial expert."/* 260604 번역 */,
                                    "② In accordance with laws and the articles of incorporation, the Audit Committee independently performs duties such as legality audits of the execution of duties by directors and management, review of the soundness of financial activities and the accuracy of financial reporting, review of the validity of changes to important accounting standards or accounting estimates, approval of the appointment and dismissal of the external auditor, and evaluation of the external auditor's audit activities."/* 260604 번역 */,
                                    "③ Audit Committee meetings are held at least once per quarter and may be held at any time as needed."/* 260604 번역 */
                                ]},
                                { subTitle: "2. External Auditor", list: [
                                    "① The external auditor shall perform audit duties fairly and from a position independent of the company, management, and specific shareholders."/* 260604 번역 */,
                                    "② The external auditor reports important matters identified during external audit activities to the Audit Committee."/* 260604 번역 */,
                                    "③ If a shareholder has a question about the audit report at the general meeting of shareholders, the external auditor shall attend and provide a sufficient explanation."/* 260604 번역 */
                                ]}
                            ]
                        },
                        {
                            title: "IV. Stakeholders",
                            content: [
                                { subTitle: "(1) The Company shall faithfully fulfill its social responsibility to protect the rights of all stakeholders, including customers, shareholders, and employees.", list: [] },
                                { subTitle: "(2) The Company shall diligently comply with labor-related laws including the Labor Standards Act and shall endeavor to maintain and improve working conditions.", list: [] },
                                { subTitle: "(3) The Company shall provide information necessary for the protection of stakeholders' rights within the scope permitted by law, and shall support stakeholders' access to relevant information.", list: [] }
                            ]
                        },
                        {
                            title: "V. Disclosure",
                            content: [
                                { subTitle: "(1) The Company shall regularly prepare and disclose business reports, quarterly reports, and semi-annual reports, and shall promptly and accurately disclose matters required by law and matters that may have a significant impact on shareholders and stakeholders.", list: [] },
                                { subTitle: "(2) The Company shall not give preferential or discriminatory treatment to specific individuals regarding the scope or timing of disclosure of important corporate information, and shall disclose information so that all stakeholders can access it simultaneously.", list: [] }
                            ]
                        },
                        {
                            title: "Supplementary Provisions (2021.2.8)",
                            content: [
                                { subTitle: "Supplementary Provisions (2021.2.8) Article 1 (Effective Date) This Charter shall take effect from February 8, 2021.", list: [] }
                            ]
                        }
                    ],
                    // [Tab 2] 이사회 구성 현황 데이터 (KO)
                    BoardSectionTitle1: `Board Composition`,
                    BoardSectionDesc1: `The board of directors is composed of executive directors, outside directors, and other non-executive directors.<br />We strengthen transparency and checks-and-balances through outside directors with independence and expertise.`/* 260604 번역 */,
                    BoardSectionTitleSub: `Outside Directors and Committee Composition`,
                    BoardSectionDescSub: `Outside directors with independence and expertise reinforce management transparency and oversight.`,
                    BoardMemberList: [
                        {
                            pos: "CEO", name: "Suh-hong Hur", 
                            img: require("@/assets/images/dummy/gsrin0102_1.png"),
                            term: "2025.03.20~2028.03.19", firstDate: "First appointed Mar. 20, 2025"/* 260604 번역 */,
                            careers: [
                                { text: "Stanford University (USA)", class: "" },
                                { text: "2022: Future Business Team Leader, GS Co., Ltd.", class: "" },
                                { text: "2024 Head of Management Strategy Service Unit, GS Retail Co., Ltd."/* 260604 번역 */, class: "" },
                                { text: "Current: CEO, GS Retail Co., Ltd.", class: "point" }
                            ]
                        },
                        {
                            pos: "Executive Director", name: "Jin-seok Oh", 
                            img: require("@/assets/images/dummy/gsrin0102_2.png"),
                            term: "2024.03.21~2027.03.20", firstDate: "First appointed Mar. 21, 2024"/* 260604 번역 */,
                            careers: [
                                { text: "Sogang University", class: "" },
                                { text: "2014: Management Support Division Head, GS Retail Co., Ltd.", class: "" },
                                { text: "2021: Strategy Division Head, GS Retail Co., Ltd.", class: "" },
                                { text: "Current: Platform BU Head, GS Retail Co., Ltd.", class: "point" }
                            ]
                        },
                        {
                            pos: "Other Non-Executive Director", name: "Soon-gi Hong", 
                            img: require("@/assets/images/dummy/gsrin0102_3.png"),
                            term: "2025.03.21~2027.03.20", firstDate: "First appointed Jul. 1, 2021"/* 260604 번역 */,
                            careers: [
                                { text: "Yonsei University", class: "" },
                                { text: "2017: Finance Team Leader, GS Co., Ltd.", class: "" },
                                { text: "Current: CEO, GS Co., Ltd.", class: "point" }
                            ]
                        }
                    ],
                    SubMemberList: [
                        {
                            pos: "Seong-rak Lee (Outside Director) *Board Chairman", name: "Lee Seong-rak"/* 260604 번역 */, 
                            img: require("@/assets/images/dummy/gsrin0102_4.png"),
                            term: "2025.03.20~2028.03.19", firstDate: "First appointed Mar. 25, 2023"/* 260604 번역 */,
                            careers: [
                                { text: "Konkuk University", class: "" },
                                { text: "2009: Deputy President, Shinhan Bank", class: "" },
                                { text: "2013: President, Shinhan Life Insurance", class: "" },
                                { text: "2017: CEO, Gordon & Partners Co., Ltd.", class: "" }
                            ]
                        },
                        {
                            pos: "Outside Director", name: "Sang-gyu Lee", 
                            img: require("@/assets/images/dummy/gsrin0102_6.png"),
                            term: "2023.03.23~2026.03.22", firstDate: "First appointed Mar. 23, 2023"/* 260604 번역 */,
                            careers: [
                                { text: "University of Washington (USA)", class: "" },
                                { text: "2012: Korea B2C Group Head, LG Electronics", class: "" },
                                { text: "2016: Korea Mobile Group Head, LG Electronics", class: "" },
                                { text: "2021: Korea Sales Division Head & President, LG Electronics", class: "" },
                                { text: "Current: Chair Professor, Sookmyung Women's University", class: "point" }
                            ]
                        },
                        {
                            pos: "Outside Director", name: "Yun-jin Yoon", 
                            img: require("@/assets/images/dummy/gsrin0102_7.png"),
                            term: "2025.03.20~2028.03.19", firstDate: "First appointed Mar. 20, 2025"/* 260604 번역 */,
                            careers: [
                                { text: "UC Berkeley (USA)", class: "" },
                                { text: "2009: Researcher, Stanford SRI International AI Research Center", class: "" },
                                { text: "2018: Non-Executive Director, Korea Infrastructure Safety & Technology Institute", class: "" },
                                { text: "Current: Professor, KAIST Dept. of Civil & Environmental Engineering", class: "point" }
                            ]
                        },
                        {
                            pos: "Outside Director", name: "Ahn Dong-hyun"/* 260604 번역 */, 
                            img: require("@/assets/images/dummy/gsrin0102_5.png"),
                            term: "2026.3.19~2029.3.18", firstDate: "First appointed Mar. 19, 2026"/* 260604 번역 */,
                            careers: [
                                { text: "New York University, USA"/* 260604 번역 */, class: "" },
                                { text: "2015 Public Fund Oversight Committee<br />Sale Committee Chairperson"/* 260604 번역 */, class: "" },
                                { text: "2016 Director of the Korea Capital Market Institute"/* 260604 번역 */, class: "" },
                                { text: "2022 Chairperson of the Financial Development Deliberation Committee"/* 260604 번역 */, class: "" },
                                { text: "Current: Professor, Department of Economics, Seoul National University"/* 260604 번역 */, class: "point" }
                            ]
                        },


                    ],
                    BoardSectionTitle2: "Board Skills Matrix",
                    SkillsList: [
                        { type: "Executive Director, CEO", name: "Suh-hong Hur", appointDate: "Appointed Mar. 2025"/* 260604 번역 */, tags: [{text: "Management & Leadership", class:""}, {text: "Risk Management & ESG", class:""}] },
                        { type: "Executive Director", name: "Jin-seok Oh", appointDate: "Appointed Mar. 2024"/* 260604 번역 */, tags: [{text: "Management & Leadership", class:""}, {text: "Distribution & Related Industries", class:""}, {text: "Finance", class:"TAG-2"}, {text: "Risk Management & ESG", class:""}, {text: "Compensation Committee", class:"TAG-3"}] },
                        { type: "Other Non-Executive Director", name: "Soon-gi Hong", appointDate: "Appointed Jul. 2021"/* 260604 번역 */, tags: [{text: "Management & Leadership", class:""}, {text: "Finance & Accounting", class:""}, {text: "Risk Management & ESG", class:""}, {text: "ESG Committee", class:"TAG-3"}] },
                        { type: "Outside Director", name: "Lee Seong-rak"/* 260604 번역 */, appointDate: "Appointed Mar. 2022"/* 260604 번역 */, tags: [{text: "Management & Leadership", class:"TAG-2"}, {text: "Finance", class:"TAG-2"}, {text: "Risk Management & ESG", class:"TAG-2"}, {text: "Independence", class:"TAG-2"}, {text: "Related-Party Transactions Committee", class:"TAG-4"}, {text: "Outside Director Nomination Committee", class:"TAG-4"}, {text: "Audit Committee", class:"TAG-4"}] },
                        { type: "Outside Director", name: "Lee In-moo"/* 260604 번역 */, appointDate: "Appointed Jul. 2021"/* 260604 번역 */, tags: [{text: "Finance & Accounting", class:"TAG-2"}, {text: "Finance", class:"TAG-2"}, {text: "Risk Management & ESG", class:"TAG-2"}, {text: "Independence", class:"TAG-2"}, {text: "Outside Director Nomination Committee", class:"TAG-4"}, {text: "Audit Committee", class:"TAG-4"}, {text: "ESG Committee", class:"TAG-4"}, {text: "Compensation Committee", class:"TAG-4"}] },
                        { type: "Outside Director", name: "Sang-gyu Lee", appointDate: "Appointed Mar. 2023"/* 260604 번역 */, tags: [{text: "Distribution & Related Industries", class:""}, {text: "Risk Management & ESG", class:""}, {text: "Independence", class:"TAG-2"}, {text: "Related-Party Transactions Committee", class:"TAG-3"}, {text: "Outside Director Nomination Committee", class:"TAG-3"}, {text: "ESG Committee", class:"TAG-3"}] },
                        { type: "Outside Director", name: "Yun-jin Yoon", appointDate: "Appointed Mar. 2025"/* 260604 번역 */, tags: [{text: "IT & Digital", class:""}, {text: "Risk Management & ESG", class:""}, {text: "Independence", class:""}, {text: "Outside Director Nomination Committee", class:"TAG-3"}, {text: "Audit Committee", class:"TAG-3"}, {text: "ESG Committee", class:"TAG-3"}, {text: "Compensation Committee", class:"TAG-3"}] }
                    ],
                    BoardSectionTitle3: "Board Committee Composition",
                    ChairLabel: "Chairperson", MemberLabel: "Member"/* 260604 번역 */,
                    CommitteeTable: [
                        { title: "Related-Party Transactions Committee", chair: "Sang-gyu Lee", members: "Lee Seong-rak, Yoon Yoon-jin"/* 260604 번역 */ },
                        { title: "Outside Director Nomination Committee", chair: "Sang-gyu Lee", members: "Lee Seong-rak, Lee In-moo"/* 260604 번역 */ },
                        { title: "Audit Committee", chair: "Lee In-moo"/* 260604 번역 */, members: "Lee Seong-rak, Yoon Yoon-jin"/* 260604 번역 */ },
                        { title: "ESG Committee", chair: "Lee In-moo"/* 260604 번역 */, members: "Chair: In-mu Lee / Members: Sang-gyu Lee, Yun-jin Yoon, Soon-gi Hong" },
                        { title: "Compensation Committee", chair: "Yun-jin Yoon", members: "Lee In-moo, Oh Jin-seok"/* 260604 번역 */ }
                    ],
                    // [Tab 2] BoardDownloadBtns 데이터 부분
                    BoardDownloadBtns: [
                        { 
                            text: "GS Retail Co., Ltd. Articles of Incorporation", 
                            link: require("@/assets/download/gsr_incorporation_1.pdf").default || require("@/assets/download/gsr_incorporation_1.pdf") 
                        },
                        { 
                            text: "Board of Directors Regulations", 
                            link: require("@/assets/download/boardCharter_2.pdf").default || require("@/assets/download/boardCharter_2.pdf") 
                        },
                        { 
                            text: "Audit Committee Regulations", 
                            link: require("@/assets/download/directors_audit_committee_3.pdf").default || require("@/assets/download/directors_audit_committee_3.pdf") 
                        },
                        { 
                            text: "Outside Director Candidate Nomination Committee Regulations", 
                            link: require("@/assets/download/Outside_Director_4.pdf").default || require("@/assets/download/Outside_Director_4.pdf") 
                        },
                        { 
                            text: "Related-Party Transactions Committee Operating Regulations", 
                            link: require("@/assets/download/internal_trade_commission_rule_5.pdf").default || require("@/assets/download/internal_trade_commission_rule_5.pdf") 
                        },
                        { 
                            text: "ESG Committee Operating Regulations", 
                            link: require("@/assets/download/ESG_6.pdf").default || require("@/assets/download/ESG_6.pdf") 
                        },
                        { 
                            text: "Compensation Committee Operating Regulations", 
                            link: require("@/assets/download/compensation_7.pdf").default || require("@/assets/download/compensation_7.pdf") 
                        }
                    ],
                    SelectMsg: "Select Committee"/* 260604 번역 */, SelectOptions: [{value:'', label:'Select Committee'/* 260604 번역 */}, {value:'0', label:'Audit Committee'}, {value:'1', label:'ESG Committee'}],
                    BtnConfirm: "View List"/* 260604 번역 */,
                    EvalSystemTitle: "Board Evaluation System",
                    EvalSystemTable: [
                        { label: "*Evaluation Frequency", content: "Once per fiscal year" },
                        { label: "Evaluation Item", content: "1. Board Operational Efficiency 2. Board Performance 3. Board Committee Activities 4. Outside Director Self-Evaluation" },
                        { label: "*Evaluation Items", content: "Relevant systems and operating standards, etc." },
                        { label: "*Evaluation Method", content: "Self-evaluation by members" },
                        { label: "*Evaluation Participants", content: "All Board members (7 members) ※ Outside Director self-evaluation targets outside directors (4 outside directors)" }
                    ],
                    EvalResultTitle: "2025 Board Evaluation Results",
                    EvalResultHeader: { col1: "Category", col2: "Evaluation Result" }, // 추가
                    EvalResultData: [
                        { category: "Board Performance", score: "/ 5.0" },
                        { category: "Board Operational Efficiency", score: "/ 5.0" },
                        { category: "Committee Activities", score: "/ 5.0" },
                        { category: "Outside Director Self-Evaluation", score: "/ 5.0" }
                    ],
                    EvalUsageTitle: "Utilization of Evaluation Results",
                    EvalUsageCards: [
                        { num: "01", title: "Report Evaluation Results<br />to the Board" },
                        { num: "02", title: "Board Chairman and Outside Directors<br/>Review Evaluation Results", sub: "(via separate in-person interviews)" },
                        { num: "03", title: "Identify areas for improvement <br />and incorporate findings into board operations" },
                        { num: "04", title: "Improve board operations <br />and enhance governance credibility" },
                        { num: "05", title: "Disclose board evaluation results <br />via the Sustainability Report and website" }
                    ],
                    DiffTableHeader: { col1: "Corporate Governance Best Practice Recommendations", col2: "Adopted", col3: "Remarks" },
                    DiffTableData: [
                        { recommendation: "Adoption of Corporate Governance Charter", status: "O", note: "-" },
                        { recommendation: "Board Composition Requirements", status: "O", note: "Majority (57.1%) outside directors" },
                        { recommendation: "Separation of Board Chairman and CEO", status: "O", note: "Outside director serving as Chairman" },
                        { recommendation: "Independence of Outside Directors", status: "O", note: "-" },
                        { recommendation: "Formation of Outside Director Nomination Committee", status: "O", note: "-" },
                        { recommendation: "Formation of Compensation Committee", status: "O", note: "-" },
                        { recommendation: "Establishment of Operating Regulations for the Board and Board Committees", status: "O", note: "-" },
                        { recommendation: "Disclosure of Board and Board Committee Activities and Voting on Key Agenda Items", status: "O", note: "-" },
                        { recommendation: "Board Evaluation", status: "O", note: "-" },
                        { recommendation: "Advance provision of information to directors prior to board meetings", status: "O", note: "-" },
                        { recommendation: "Formation of Audit Committee", status: "O", note: "Composed entirely of outside directors" },
                        { recommendation: "Adoption of Cumulative Voting System", status: "X", note: "-" },
                        { recommendation: "Certification of Accuracy and Completeness of Financial Reporting by CEO and CFO", status: "O", note: "-" },
                        { recommendation: "Directors' Liability Insurance at Company's Expense", status: "O", note: "Officers' liability insurance maintained" },
                        { recommendation: "Adoption and Disclosure of Employee Code of Ethics", status: "O", note: "-" },
                        { recommendation: "Explanation of differences from Best Practice Guidelines", status: "O", note: "-" }
                    ]
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
        onTabChange1(idx) {
            this.selectedFilter = "";
            // GS SHOP 탭(인덱스 1) 클릭 시 외부 페이지 오픈
            if (idx === 0) {
                window.open(this.t.tab1Url, "_self");
                // 화면상에서는 다시 GS25 탭으로 되돌리거나 현재 상태 유지 (기획에 따라 조절)
                this.$nextTick(() => {
                    this.CTabIdx = 1;
                });
            } else {
                this.CTabIdx = idx;
            }
        },
        handleDownload(link) {
            if (!link || link === "#") {
                alert(this.t.PreparingFile);
                return;
            }

            // require 결과가 객체로 넘어올 경우를 대비한 방어 코드
            const downloadUrl = typeof link === 'object' ? link.default : link;
            
            if (downloadUrl) {
                window.open(downloadUrl, "_blank");
            }
        }
    }
};
</script>

<style scoped>
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

/* //이사회 의장 인사말 탭 관련 css 추가 26.06.08 add 정다희 */
.section-date {margin-top: 15px; color: #161616; font-size: 1.8rem; text-align: center; display: block;}
.gsrin0101 .policy_wrap {padding-top: 60px;}
.gsrin0101 .policy_wrap dt {margin-top: 60px; color: #161616; font-size: 24px; font-weight: 700;}
.policy_wrap dt:first-child {margin-top: 0;}
.gsrin0101 .policy_wrap dd {margin-top: 20px; padding-bottom:32px; color: #444444; font-size: 1.8rem; line-height: 1.8; border-bottom:1px solid #D7D7DF;}
.bullet_title {margin-top:32px; color: #161616; font-size: 20px; font-weight: 700; display: block;}
.bullet_01 li {font-size:18px; word-break: keep-all;}
.bullet_01 li.point {color:#242428}
:deep(.gsrin0101) .policy_wrap dd .desc {font-size:16px;}

/* gsrin0102 전용 스타일 */
/* .gsrin0102 > * {margin-top: 100px;} */
.view {width: 100%; padding: 20px 0; position: relative; display: flex; align-items: center; justify-content: center; gap: 8px; align-self: stretch; flex: 0 0 auto;}
.view-2 {width: 100%; padding: 0; position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 32px; align-self: stretch; flex: 0 0 auto;}
.view-2 + .view-2{margin-top:100px;}
.sub-title {width: 100%; padding: 0; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; align-self: stretch; flex: 0 0 auto;}
.text-wrapper-3 {width: 100%; margin-top: -1.00px; padding: 0; color: #161618; font-size: 40px; font-weight: 700; font-style: normal; letter-spacing: -0.4px; line-height: 129.99999523162842%; position: relative; align-self: stretch;}
.p {width: 100%; padding: 0; color: #242428; font-size: 24px; font-weight: 500; font-style: normal; letter-spacing: -0.24px; line-height: 150%; position: relative; align-self: stretch;}
.view-3 {width: 100%; padding: 0; position: relative; display: flex; align-items: flex-start; gap: 28px; align-self: stretch; flex: 0 0 auto;}

.div-2 {height:auto; padding: 0; border-radius: 24px; position: relative; display: flex; flex-direction: column; align-items: center; gap: 32px;}
.view-4 {width: 100%; padding: 0; position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; align-self: stretch; flex: 0 0 auto;}
.img {width: 100%; height:auto; position: relative; align-self: stretch;}
.div-3 {width: 100%; padding: 0; position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 2px; align-self: stretch; flex: 0 0 auto;}
.text-wrapper-4 {width: fit-content; margin-top: -1.00px; padding: 0; color: #161618; font-size: 16px; font-weight: 700; letter-spacing: -0.16px; line-height: 24px; position: relative; white-space: nowrap;}
.text-wrapper-5 {width: fit-content; padding: 0; color: #161618; font-size: 2.8rem; font-weight: 700; font-style: normal; letter-spacing: -0.28px; line-height: 135.0000023841858%; position: relative; white-space: nowrap;}
.div-4 {width: 100%; padding: 0; position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; align-self: stretch; flex: 0 0 auto;}
.text-wrapper-6 {width: 100%; margin-top: -1.00px; padding: 0; color: #242428; font-size: 1.8rem; font-weight: 400; font-style: normal; letter-spacing: -0.18px; line-height: 160.0000023841858%; position: relative; align-self: stretch;}
.text-wrapper-7 {width: 100%; padding: 0; color: #67676f; font-size: 14px; font-weight: 400; font-style: normal; letter-spacing: -0.14px; line-height: 139.9999976158142%; position: relative; align-self: stretch;}
.view-5 {width: 100%; padding: 0; position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 4px; align-self: stretch; flex: 0 0 auto;}
.frame-2 {width: 100%; padding: 0; position: relative; display: flex; align-items: center; gap: 10px; align-self: stretch; flex: 0 0 auto;}
.bullet {height: 24px; position: relative; display: inline-flex; align-items: center; gap: 8px; flex: 0 0 auto;}
.ellipse {width: 3px; height: 3px; background-color: #67676f; border-radius: 50%; position: relative;}
.text-wrapper-8 {margin-top: -1.00px; padding: 0; color: #67676f; font-size: 1.8rem; font-weight: 400; font-style: normal; letter-spacing: -0.18px; line-height: 160.0000023841858%; position: relative; flex: 1;}
.frame-3 {width: 100%; padding: 0; position: relative; display: flex; align-items: flex-start; gap: 10px; align-self: stretch; flex: 0 0 auto;}
.text-wrapper-9 {margin-top: -1.00px; padding: 0; color: #242428; font-size: 1.8rem; font-weight: 400; font-style: normal; letter-spacing: -0.18px; line-height: 160.0000023841858%; position: relative; flex: 1;}
.divider {width: 1px; background-color: #f2f2f4; position: relative; align-self: stretch;}
.frame-4 {padding: 0; position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex: 0 0 auto;}
.rectangle {width: 1px; height: 12px; background-color: #e5e5e9; position: relative;}
.view-6 {width: 100%; padding: 0; position: relative; display: flex; flex-wrap:wrap; align-items: flex-start; justify-content: flex-start; gap: 12px; align-self: stretch; flex: 0 0 auto;}
.frame-5 {width:100%; padding: 32px; border: 1px solid #e5e5e9; border-radius: 24px; position: relative; display: flex; flex-direction: column; align-items: center; gap: 16px; flex: 1; align-self: stretch; flex: 0 0 auto;}
.frame-6 {width: 100%; padding: 0; position: relative; display: flex; align-items: center; gap: 8px; align-self: stretch; flex: 0 0 auto;}
.frame-6 .div-6 {display:flex; gap:8px;}

.skill-swiper-wrapper, .eval-usage-swiper-wrapper {display: grid; grid-template-columns: repeat(3, 1fr); gap:12px;}
.board-swiper-wrapper {display: flex; flex-direction: row; align-items: stretch; gap: 0; width: 100%; }
.gsrin0102 .board-swiper-wrapper > .div-2{ flex: 0 1 312px; min-width: 0; position: relative; box-sizing: border-box; }
.gsrin0102 .board-swiper-wrapper > .div-2:not(:last-child){ margin-right: 57px; }
.gsrin0102 .board-swiper-wrapper > .div-2:not(:last-child)::after{ width: 1px; height: 100%; background-color: #f2f2f4; content: ""; position: absolute; top: 0; right: -28px; }

.text-wrapper-10 {width: fit-content; margin-top: -1.00px; padding: 0; color: #161618; font-size: 22px; font-weight: 400; letter-spacing: -0.24px; line-height: 36px; position: relative; white-space: nowrap;}
.text-wrapper-11 {width: fit-content; padding: 0; color: #161618; font-size: 24px; font-weight: 700; font-style: normal; letter-spacing: -0.24px; line-height: 135.0000023841858%; position: relative; white-space: nowrap;}
.text-wrapper-12 {padding: 0; color: #656565; font-size: 16px; font-weight: 400; font-style: normal; text-align: right; letter-spacing: -0.16px; line-height: 150%; position: relative; flex: 1;}
.frame-9 {width: 100%; padding: 24px 0 0; border-top: 1px solid #f2f2f4; position: rela
    tive; display: flex; flex-wrap: wrap; align-items: flex-start; gap: 8px 8px; flex: 0 0 auto; align-self: stretch;}
.TAG {padding: 8px 12px; color: #107af2; background-color: #e7f2fe; border: 1px solid #107af2; border-radius: 99px; position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px; flex: 0 0 auto;}
.TAG-2 {min-width: 64px; background-color: #e7f2fe; border-color: #107af2;}
.TAG-3 {background-color: #f2f2f4; border-color: #c4c4d0;}
.TAG-3 .text-wrapper-13 {color: #67676f;}
.TAG-4 .text-wrapper-13 {color: #67676f;}
.TAG-4 {min-width: 64px; background-color: #f2f2f4; border-color: #c4c4d0;}
.text-wrapper-13 {width: fit-content; margin-top: -1.00px; padding: 0; color: #107af2; font-size: 16px; font-weight: 400; font-style: normal; letter-spacing: -0.16px; line-height: 150%; position: relative; white-space: nowrap;}
.table {width: 100%; border-top: 1px solid #161618; border-collapse: collapse; table-layout: fixed;}
.table th.table-cell {width: 20%; height: 82px; padding: 12px 24px; background-color: #f8f8f8; border-bottom: 1px solid #e5e5e9; border-left: 1px solid #e5e5e9; vertical-align: middle; text-align: center;}
.table th.table-cell:first-child {border-left: 0;}
.text-wrapper-19 {padding: 0; color: #161618; font-size: 1.8rem; font-weight: 600; font-style: normal; text-align: center; letter-spacing: -0.18px; line-height: 139.9999976158142%; position: relative;}
.table td.view-wrapper {width: 20%; padding: 12px 24px; border-bottom: 1px solid #e5e5e9; border-left: 1px solid #e5e5e9; vertical-align: top;}
.table td.view-wrapper:first-child {border-left: 0;}
.view-7 {padding: 0; position: relative; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 8px; flex: 1; flex-grow: 1;}
.view-8 {width: 100%; padding: 0; position: relative; display: flex; align-items: center; justify-content: center; gap: 8px; align-self: stretch; flex: 0 0 auto;}
.text-wrapper-20 {width: fit-content; margin-top: -1.00px; padding: 0; color: #67676f; font-size: 1.8rem; font-weight: 400; font-style: normal; letter-spacing: -0.18px; line-height: 160.0000023841858%; position: relative; white-space: nowrap;}
.text-wrapper-21 {margin-top: -1.00px; padding: 0; color: #242428; font-size: 1.8rem; font-weight: 400; font-style: normal; text-align: right; letter-spacing: -0.18px; line-height: 160.0000023841858%; position: relative; flex: 1;}

.button-group {width: 100%; padding: 0; position: relative; display: flex; flex-wrap: wrap; align-items: flex-start; gap: 12px 12px; flex: 0 0 auto; align-self: stretch;}

.BUTTON {padding: 10px 16px; background-color: #f2f2f4; border-radius: 8px; border: 0; position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 24px; flex: 0 0 auto; cursor: pointer;}
.view-9 {padding: 0; position: relative; display: inline-flex; align-items: center; gap: 2px; flex: 0 0 auto;}
.text-wrapper-22 {width: fit-content; margin-top: -1.00px; padding: 0; color: #242428; font-size: 16px; font-weight: 400; font-style: normal; letter-spacing: -0.16px; line-height: 150%; position: relative; white-space: nowrap;}
.download {width: 24px; height: 24px; position: relative; aspect-ratio: 1;}
.ac {text-align:center;}

/* gsrin0103 이사회 평가 */
.gsrin0103 .eval_item_group { display: flex; flex-direction: column; width: 100%; }
.gsrin0103 .eval_item_group .sub-title {margin-bottom:32px;}
.gsrin0103 .section-sub-title {color: #161618; font-size: 40px; font-weight: 700; text-align:left;}
.gsrin0103 .policy_wrap {padding-top:32px; padding-bottom:100px;}
.gsrin0103 colgroup col:first-of-type {width:200px}
.gsrin0103 .policy_wrap table { width: 100%; border-collapse: collapse; word-break: keep-all;}
.gsrin0103 .policy_wrap th, .gsrin0103 .policy_wrap td {padding: 18px 24px; border: 1px solid #E5E5E9; font-size: 1.8rem; line-height: 1.6; vertical-align: middle; }
.gsrin0103 .policy_wrap tr:first-of-type th, .gsrin0103 .policy_wrap tr:first-of-type td {border-top:1px solid #242428;}
.gsrin0103 .eval_item_group:nth-of-type(2) .policy_wrap th, .gsrin0103 .eval_item_group:nth-of-type(2) .policy_wrap td {text-align:center; }
.gsrin0103 .policy_wrap {padding-left:0; padding-right:0;}
.gsrin0103 .policy_wrap th { background-color: #F8F8F8; color: #161616; font-weight: 700; text-align: left; }
.gsrin0103 .policy_wrap tbody tr th, .gsrin0103 .policy_wrap thead tr th:first-of-type, .gsrin0103 .policy_wrap tbody tr td:first-of-type  {border-left:0}
.policy_wrap thead tr th:last-of-type {border-right:0;}
.gsrin0103 .policy_wrap tbody tr td {border-right:0}
.gsrin0103 .important { font-size: 1.8rem; font-weight: 700; color: #161616; text-decoration:none;}
:deep(.eval-usage-swiper .swiper-wrapper) {display:grid !important; grid-template-columns:repeat(3, 1fr); gap:20px; transform:none;}
.card_item.res-slide-item {width:100%;}
.gsrin0103 .card_item { padding: 32px 32px 48px; background-color: #f8f8f8; border-radius: 12px; display: flex; flex-direction: column; gap: 16px; min-height: 180px; }
.gsrin0103 .text-wrapper-6 { font-size: 1.8rem; font-weight: 700; color: #107af2; }
.gsrin0103 .element { font-size: 20px; font-weight: 700; color: #161618; line-height: 1.35; }
.gsrin0103 .text-wrapper-7 { font-size: 16px; color: #67676f; }
.gsrin0103 .eval-usage-swiper {width:100%;}
.gsrin0103 .card_item {padding:32px; background-color:#f8f8f8; border-radius:12px; display:flex; flex-direction:column; gap:16px; min-height:180px; box-sizing:border-box;}

/* gsrin0104 전용 스타일 */
.gsrin0104 { display: flex; flex-direction: column; width: 100%; }
.gsrin0104 .top_visual_banner { width: 100%; padding: 60px 0; display: flex; align-items: center; justify-content: center; background-color: #ffffff; }
.gsrin0104 .banner_text { font-size: 48px; font-weight: 700; color: #161616; text-align: center; line-height: 1.3; letter-spacing: -0.48px; }
.gsrin0104 .diff_table_wrap { width: 100%; }
.gsrin0104 .policy_wrap {padding-top:0;}
.gsrin0104 .policy_wrap table { width: 100%; border-collapse: collapse; border-top: 1px solid #000; }
.gsrin0104 .policy_wrap th, .gsrin0104 .policy_wrap td { padding: 18px 24px; border: 1px solid #E5E5E9; font-size: 1.8rem; line-height: 1.5; vertical-align: middle; }
.gsrin0104 .policy_wrap th { background-color: #F8F8F8; color: #161618; font-weight: 700; }
.gsrin0104 .policy_wrap td { color: #242428; }

/*:::::::::::::::::::::::::::::::Responsive Style :::::::::::::::::::::::::::::::*/

@media screen and (max-width:1024px) {
    .title-sub-text {padding: 60px 0; font-size: 36px;}
    .view-3 {display:block;}
    :deep(.view-6.res-swiper-container) .swiper-wrapper, :deep(.view-3.res-swiper-container) .swiper-wrapper {display: grid !important; grid-template-columns: repeat(2, 1fr); gap: 20px; transform:none;}
    .frame-5 {max-width:none;}
    .view-6:last-of-type {width:100%;}
    .gsrin0104 .banner_text { font-size: 32px; }
    .gsrin0104 .policy_wrap th, .gsrin0104 .policy_wrap td { padding: 12px 15px; font-size: 16px; }
    .skill-swiper-wrapper, .eval-usage-swiper-wrapper {grid-template-columns: repeat(2, 1fr);}
    .board-swiper-wrapper {display: grid; grid-template-columns: repeat(2, 1fr); gap:20px 20px;}

    /* 추가 css */
    .gsrin0102 .board-swiper-wrapper { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; width: 100%; }
    .gsrin0102 .board-swiper-wrapper > .div-2{ width: 100%; margin-right: 0; }
    .gsrin0102 .board-swiper-wrapper > .div-2::after { display: none; }

}

@media screen and (max-width: 768px) {
    :deep(.m_br) { display: block; }
    .cont_inner {padding-top:80px;}
    .tab_wrap{margin-bottom:0;}
    .title_wrap {display:none;}
    .page-title {font-size: 40px;}
    .visual-sub {font-size: 20px;}
    .title-sub-text {padding: 60px 0 80px; font-size: 2.8rem; line-height: 1.3; text-align:left;}
    .gsrin0101 .chairman_content > h3 + p {margin-top:8px;}
    .view-2 + .view-2{margin-top:100px;}
    :deep(.title-sub-text br) {display:block !important;}
    .view-3 {flex-direction: column; align-items: center; gap: 40px;}
    .div-2 {max-width:312px; width:100%;} 
    .view-6 {flex-direction: column; gap: 12px;}
    .view-6:last-of-type {width:100%;}
    .frame-5, .card_item.res-slide-item {width:90%;} 
    .img {height: auto; aspect-ratio: 16 / 9;} 
    .divider {display:none;} 
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
    .gsrin0101 .section-sub-title {font-size:28px;}

    .gsrin0101 .sec_chairman { padding-top:60px; }
    .gsrin0101 .chairman_intro > figure.chairman_visual { height: auto;min-height: 400px; background-position: 57% center;  }
    .gsrin0101 .chairman_intro > figcaption.chairman_profile { position: static; margin-top: 60px; padding: 0; }
    .gsrin0101 .chairman_intro > figcaption.chairman_profile > p { font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
    .gsrin0101 .chairman_intro > figcaption.chairman_profile > strong { font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.01em; }
    .gsrin0101 .chairman_content { margin-top: 40px; }
    .gsrin0101 .chairman_content > h3 { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
    .gsrin0101 .chairman_content > p { margin-top: 10px; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }

    .gsrin0101 .policy_wrap {padding:30px 0;}
    .gsrin0102 .view-2:first-of-type {margin-top:0;}
    .gsrin0103 .section-sub-title {font-size:24px; text-align:left;}
    .gsrin0103 .policy_wrap {padding-top:30px; padding-left:0; padding-right:0;}
    .gsrin0103 .policy_wrap th { width: 120px !important; padding: 12px; font-size: 15px; } 
    .gsrin0103 .policy_wrap td { padding: 12px; font-size: 15px; } 
    .gsrin0103 .important {font-size:16px;}
    .gsrin0104 .banner_text { font-size: 24px; padding: 0 20px; }
    .gsrin0104 .policy_wrap { padding:0; overflow-x: auto; }
    .gsrin0104 .policy_wrap table { min-width: 700px; } /* 모바일에서는 가로 스크롤 허용 */
    .gsrin0104 .policy_wrap th, .gsrin0104 .policy_wrap td { padding: 10px; font-size: 14px; }
    .skill-swiper-wrapper {display:flex;}
    :deep(.view-6.res-swiper-container) .swiper-wrapper, :deep(.view-3.res-swiper-container) .swiper-wrapper, .eval-usage-swiper-wrapper {display:flex !important; gap:0px;}

}

/* swiper */
.swiper {width:100%;}
.swiper-slide { height:auto; position:relative;}



/* 모바일 스타일: 스와이퍼 활성화 */
@media screen and (max-width: 767px) {
    .res-slide-item {
        margin-right: 0;
        box-sizing: border-box;
    }
    :deep(.view-6.res-swiper-container) .swiper-wrapper {display: flex !important; gap:0px;}
    .pc-only { display: none; } 

    .eval-usage-swiper {overflow:hidden !important;}
    /* 슬라이딩을 위해 flex-wrap 해제 및 초기 위치 설정 */
    :deep(.eval-usage-swiper .swiper-wrapper) {display:flex !important; flex-wrap:nowrap;}
    .eval-usage-swiper .card_item.res-slide-item {height: auto !important; flex-shrink: 0 !important; }
    .gsrin0103 .element {font-size:18px;}
    .gsrin0103 .sub-title {margin-bottom:32px;}
    .gsrin0103 colgroup col:first-of-type {width:80px}
}

</style>