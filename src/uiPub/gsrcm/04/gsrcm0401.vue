<template>
    <div class="cont_inner">
        <header class="title_wrap">
            <h2>{{ t.pageTitle }}</h2>
        </header>

        <Tabs v-model="cTabIdx" :tab-items="t.tabs" tab-class="type_01" :tab-slide="true" />

        <div v-show="cTabIdx === 0" class="panel" :aria-label="t.tabs[0].item">
            <section class="sec_viewer">
                <h3 class="tit">{{ t.committee.introTitle }}</h3>
                <p class="desc">{{ t.committee.introDesc }}</p>
            </section>

            <section class="sec_viewer">
                <h3 class="tit">{{ t.committee.composeTitle }}</h3>
                <p class="desc">{{ t.committee.composeDesc }}</p>
            </section>

            <section class="sec_viewer sec_duty">
                <h3 class="tit">{{ t.committee.dutyTitle }}</h3>
                <ul>
                    <li v-for="(item, idx) in t.committee.dutyItems" :key="'duty-' + idx">{{ item }}</li>
                </ul>
            </section>

            <section class="sec_viewer">
                <h3 class="tit">{{ t.committee.scheduleTitle }}</h3>
                <p class="desc">{{ t.committee.scheduleDesc }}</p>
                <div class="button_wrap">
                    <Buttons
                        v-for="(btn, bIdx) in t.committee.downloadBtns"
                        :key="'dl-' + bIdx"
                        btn-class="btn_icon_arrow btn_big gray after"
                        @click="handleDownload(btn.link)"
                    >
                        {{ btn.text }}
                    </Buttons>
                </div>
            </section>

            <section class="sec_viewer sec_roster">
                <h3 class="tit_md">{{ t.committee.rosterTitle }}</h3>
                <ul>
                    <li v-for="(member, mIdx) in t.committee.members" :key="'member-' + mIdx">
                        <article>
                            <figure>
                                <img v-if="member.img" :src="member.img" :alt="member.name" />
                            </figure>
                            <div class="info">
                                <p>{{ member.role }}</p>
                                <strong>{{ member.name }}</strong>
                                <p class="org" v-html="member.org"></p>
                                <p class="position" v-html="member.position"></p>
                            </div>
                        </article>
                    </li>
                </ul>
            </section>
        </div>

        <div v-show="cTabIdx === 1" class="panel" :aria-label="t.tabs[1].item">
            <section class="sec_viewer">
                <h3 class="tit ac">{{ t.meeting.introTitle }}</h3>
                <div class="policy_wrap">
                    <table class="base_table">
                        <tbody>
                            <tr v-for="(item, idx) in t.meeting.list" :key="'meeting-' + idx">
                                <td class="ac color_gray">{{ item.id }}</td>
                                <td class="al title_cell">
                                    <a href="javascript:void(0);" class="link_title">{{ item.title }}</a>
                                </td>
                                <td class="ac">
                                    <button type="button" class="btn_download_file" @click="handleDownload(item.link)">
                                        <span class="file_type_text">PDF</span>
                                    </button>
                                </td>
                                <td class="ac color_gray date_cell">{{ item.year }}</td>
                            </tr>
                            <tr v-if="t.meeting.list.length === 0">
                                <td colspan="4" class="ac py80">{{ t.noDataText }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <div class="pagination_area">
                <Pagination v-model="meetingPage" :total-pages="5" @change="onMeetingPageChange" />
            </div>
        </div>

        <div v-show="cTabIdx === 2" class="panel" :aria-label="t.tabs[2].item">
            <section class="sec_viewer">
                <h3 class="tit ac">{{ t.opinions.introTitle }}</h3>
                <div class="policy_wrap">
                    <table class="base_table">
                        <tbody>
                            <tr v-for="(item, idx) in t.opinions.list" :key="'opinion-' + idx">
                                <td class="ac color_gray">{{ item.id }}</td>
                                <td class="al title_cell">
                                    <a href="javascript:void(0);" class="link_title">{{ item.title }}</a>
                                </td>
                                <td class="ac">
                                    <button type="button" class="btn_download_file" @click="handleDownload(item.link)">
                                        <span class="file_type_text">PDF</span>
                                    </button>
                                </td>
                                <td class="ac color_gray date_cell">{{ item.year }}</td>
                            </tr>
                            <tr v-if="t.opinions.list.length === 0">
                                <td colspan="4" class="ac py80">{{ t.noDataText }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <div class="pagination_area">
                <Pagination v-model="opinionPage" :total-pages="5" @change="onOpinionPageChange" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import Tabs from "@/components/Tabs.vue";
import Buttons from "@/components/Buttons.vue";
import Pagination from "@/components/Pagination.vue";

const props = defineProps({
    lang: { type: String, default: "ko" },
});

const langData = {
    ko: {
        pageTitle: "GS SHOP 시청자 관련",
        tabs: [
            { item: "시청자위원회" },
            { item: "시청자위원회 회의자료" },
            { item: "시청자의견 반영 결과 보고서" },
        ],
        committee: {
            introTitle: "소개",
            introDesc:
                "GS SHOP 시청자위원회는 방송법 제87조에 따라 설치된 법적 기구로서, 시청자의 권익을보호하고 방송의 공공성을 제도적으로 보완하기 위한 목적으로 운영됩니다.",
            composeTitle: "구성",
            composeDesc:
                "시청자위원은 각계의 시청자를 대표할 수 있는 사람으로서, 방송통신위원회 규칙이 정한 단체의 추천을 받아 시청자위원회의 위원으로 위촉됩니다.",
            dutyTitle: "직무와 권한",
            dutyItems: [
                "방송편성에 관한 의견제시 또는 시정요구",
                "방송 프로그램 내용에 관한 의견 제시 또는 시정요구",
                "GS SHOP의 자체 심의규정에 관한 의견 제시 또는 시정 요구",
                "기타 시청자 권익 보호와 침해 구제에 관한 의견 제시",
            ],
            scheduleTitle: "개최 시기",
            scheduleDesc: "매월 1회 정기 회의 개최",
            downloadBtns: [
                { text: "시청자위원회 운영규칙 다운로드", link: "#none" },
                { text: "시청자위원회 관련법규 다운로드", link: "#none" },
            ],
            rosterTitle: "명단",
            members: [ /* 2026.07.07 edit 이소라 */
                { img: require("@/assets/images/dummy/gsrcm0401_member01.png"), role: "위원장", name: "최정혜", org: "연세대학교", position: "경영대학 교수" },
                { img: require("@/assets/images/dummy/gsrcm0401_member02.png"), role: "부위원장", name: "한명삼", org: "기아대책", position: "행복한나눔 본부장" },
                { img: require("@/assets/images/dummy/gsrcm0401_member03.png"), role: "위원", name: "심재웅", org: "숙명여자대학교", position: "미디어학부 교수" },
                { img: require("@/assets/images/dummy/gsrcm0401_member04.png"), role: "위원", name: "정사강", org: "이화여대", position: "커뮤니케이션 미디어연구소 교수" },
                { img: require("@/assets/images/dummy/gsrcm0401_member05.png"), role: "위원", name: "신영수", org: "경북대학교", position: "법과대학 교수" },
                { img: require("@/assets/images/dummy/gsrcm0401_member06.png"), role: "위원", name: "서현선", org: "한양대학교", position: "사회혁신 융합전공 겸임교수" },
                { img: require("@/assets/images/dummy/gsrcm0401_member07.png"), role: "위원", name: "김민정", org: "충북대학교", position: "사회복지학과 교수" },
                { img: require("@/assets/images/dummy/gsrcm0401_member08.png"), role: "위원", name: "김다래", org: "한국소비자단체<br/>협의회", position: "물가감시센터 팀장" },
                { img: require("@/assets/images/dummy/gsrcm0401_member09.png"), role: "위원", name: "박상오", org: "법무법인 바른", position: "변호사" },
                { img: require("@/assets/images/dummy/gsrcm0401_member10.png"), role: "위원", name: "김현호", org: "법무법인 이제", position: "변호사" },
            ],
        },
        meeting: {
            introTitle: "GS SHOP의 시청자위원회 자료들을 열람하실 수 있습니다.",
            list: [
                { id: "60", title: "1월 GS리테일(GSSHOP) 시청자위원회 운영실적 보고서", link: "#", year: "2026-02-17" },
                { id: "59", title: "12월 GS리테일(GSSHOP) 시청자위원회 운영실적 보고서", link: "#", year: "2026-02-17" },
                { id: "58", title: "11월 GS리테일(GSSHOP) 시청자위원회 운영실적 보고서", link: "#", year: "2026-02-17" },
            ],
        },
        opinions: {
            introTitle: "GS SHOP의 시청자의견 반영 결과보고 자료들을 열람하실 수 있습니다.",
            list: [
                { id: "60", title: "2025년 12월 소비자 실무위원회 결과보고서", link: "#", year: "2026-02-17" },
                { id: "59", title: "2025년 12월 시청자 의견 반영 결과 보고서", link: "#", year: "2026-02-17" },
                { id: "58", title: "2025년 11월 소비자 실무위원회 결과보고서", link: "#", year: "2026-02-17" },
            ],
        },
        noDataText: "조회된 데이터가 없습니다.",
    },
};

const cTabIdx = ref(0);
const meetingPage = ref(1);
const opinionPage = ref(1);

const t = computed(() => langData[props.lang] || langData.ko);

function onMeetingPageChange(page) {
    meetingPage.value = page;
}

function onOpinionPageChange(page) {
    opinionPage.value = page;
}

function handleDownload(link) {
    if (link && link !== "#none") {
        window.open(link, "_blank");
    }
}
</script>

<style scoped>
.title_wrap { padding: 200px 0 100px; display: flex; flex-direction: column; }
.title_wrap > h2 { color: #161616; font-size: 7.2rem; font-weight: 700; line-height: 1.24; letter-spacing: -0.02em; text-align: center; }
:deep(.tab_wrap){margin-bottom:0;}
.panel { padding-top: 80px; }
.sec_viewer + .sec_viewer { margin-top: 100px; }
.sec_viewer > h3.tit { margin: 0 0 16px; color: #161616; font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.sec_viewer > h3.tit_md { margin: 0 0 24px; color: #161616; font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.sec_viewer > p.desc { margin: 0; color: #161616; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.sec_duty > ul { width: 100%; margin: 0; padding: 32px; list-style: none; background-color: #f8f8f8; border-radius: 12px; display: flex; flex-direction: column; gap: 16px; }
.sec_duty > ul > li { padding-left: 24px; color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; position: relative; }
.sec_duty > ul > li::before { width: 16px; height: 16px; background: url("@/assets/images/common/icon_bullet_checkmark.png") 0 0 no-repeat; position: absolute; top: 4px; left: 0; content: ""; }
.sec_viewer > .button_wrap { width: 100%; margin: 16px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
/* 26.07.07 edit 이소라 */
.sec_roster > ul { width: 100%; margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); row-gap: 40px; column-gap: 28px;}
.sec_roster > ul > li { min-width: 0; padding-right:20px; }
.sec_roster > ul > li > article { height: 100%; display: flex; gap:32px; align-items: center; } 
.sec_roster > ul > li > article > figure { width: 151px; height: 148px; margin: 0; padding: 0; background-color: #f2f2f4; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.sec_roster > ul > li > article > figure > img { width: 100%; height: 100%; object-fit: cover; }
.sec_roster > ul > li > article > .info { min-width: 0; display: flex; flex-direction: column; }
.sec_roster > ul > li > article > .info > p { margin: 0; color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.3; letter-spacing: 0; }
.sec_roster > ul > li > article > .info > strong { margin: 2px 0 0; color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.sec_roster > ul > li > article > .info > p.org { margin: 16px 0 0; color: #242428; font-size: 1.8rem; font-weight: 400; line-height: 1.3; letter-spacing: -0.01em; }
.sec_roster > ul > li > article > .info > p.org + p.position { margin: 0; color: #242428; font-size: 1.8rem; font-weight: 400; line-height: 1.3; letter-spacing: -0.01em; }
/* //26.07.07 edit 이소라 */
.policy_wrap { margin-top: 100px; }
.policy_wrap table { width: 100%; border-collapse: collapse; border-top: 0; }
.policy_wrap td { height: 82px; padding: 18px 24px; color: #161616; font-size: 1.8rem; vertical-align: middle; border-bottom: 1px solid #E5E5E9; border-left: 0; border-right: 0; }
.policy_wrap td a { font-size: 1.8rem; color: #161616; text-decoration: none; }
.policy_wrap td a:hover { text-decoration: underline; }
.policy_wrap tbody tr:first-of-type td { border-top: 1px solid #161616; }
.color_gray { color: #67676f; }
.file_type_text { font-size: 18px; color: #161616; }
.btn_download_file { display: inline-flex; align-items: center; gap: 12px; background: none; border: 0; cursor: pointer; }
.btn_download_file::before { content: ""; width: 24px; height: 24px; background: url("@/assets/images/common/icon_set_24.png") -832px -56px no-repeat; display: inline-block; }

/* 26.07.07 edit 이소라 */
@media screen and (max-width: 1600px) {
    .sec_roster > ul { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .sec_roster > ul > li > article > .info > p :deep(br) { display: none; }
}

@media screen and (max-width: 1024px) {
    .policy_wrap td, .policy_wrap td a { font-size: 1.6rem !important; }
    .sec_roster > ul { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
/* //26.07.07 edit 이소라 */

@media screen and (max-width: 768px) {
    .cont_inner {padding-top: 84px;}  /* 26.06.26 edit 이소라 */
    .title_wrap { display: none;}
    .panel { padding-top:60px; }
    .sec_viewer + .sec_viewer { margin-top: 80px; }
    .sec_viewer > h3.tit { margin-bottom: 8px; font-size: 2.4rem; line-height: 1.35;}
    .sec_viewer > p.desc { font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
    .sec_duty > ul { padding: 32px; gap: 4px; }
    .sec_duty > ul > li { padding-left:20px; font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em;}
    .sec_viewer > .button_wrap { margin-top: 24px; }
    .policy_wrap{margin-top:80px;}
    /* 26.07.07 add 이소라 */
    .sec_roster > ul { grid-template-columns: 1fr; row-gap: 20px; }
    .sec_roster > ul > li { padding-right: 0; border-right: none; }
    .sec_roster > ul > li > article { min-height: 160px; flex-direction: row; align-items:flex-end; gap: 32px; }
    .sec_roster > ul > li > article > figure { width: 152px; height: 160px; }
    .sec_roster > ul > li > article > .info { flex: 1; }
    .sec_roster > ul > li > article > .info > p { margin: 0; font-size: 1.6rem; line-height: 1.24; }
    .sec_roster > ul > li > article > .info > strong { margin: 3px 0 0; font-size: 2.8rem; line-height: 1.35; }
    .sec_roster > ul > li > article > .info > p.org { margin: 3px 0 0; color: #242428; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .sec_roster > ul > li > article > .info > p.org + p.position { margin: 0; color: #242428; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    /* //26.07.07 add 이소라 */
    .base_table tbody tr td:first-of-type { display: none; }
    .base_table tbody,.base_table tr,.base_table td { display: block; width: 100%; height: auto; border: 0; }
    .base_table tr { padding: 12px 10px; border-bottom: 1px solid #EEE; display: flex; flex-wrap: wrap; align-items: center; }
    .policy_wrap tbody tr:first-of-type td { border-top: 0; }
    .base_table { border-top: 1px solid #161616; }
    .base_table .title_cell { padding: 0 0 8px 0; order: 1; }
    .base_table .title_cell .link_title { color: #161616; font-size: 1.6rem !important; font-weight: 500; line-height: 1.4; }
    .base_table .date_cell { width: 50%; height: auto; padding: 0; color: #999; font-size: 1.2rem !important; text-align: left !important; order: 2; display: flex; align-items: center; }
    .base_table tr > td:nth-child(3) { width: 50%; height: auto; padding: 0; text-align: right !important; order: 3; border: 0; display: flex; align-items: center; justify-content: flex-end; }
    .base_table tr > td:nth-child(3) .btn_download_file { margin-left: 0; }
    .base_table tr > td:nth-child(3) .file_type_text { display: none; }
    .policy_wrap td, .policy_wrap td a { font-size: 1.6rem !important; }
}
</style>
