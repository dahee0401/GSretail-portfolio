<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
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
                    <div class="disclosure_info_head" v-if="CTabIdx === 0">
                        <h3 class="section-sub-title">{{ t.MainTitle }}</h3>
                        <p class="policy_desc" v-html="t.DartDesc"></p>
                        <div class="button-area mt16">
                            <a :href="t.DartLink" target="_blank" class="btn_big primary btn_icon_arrow after">
                                {{ t.DartBtnText }}
                            </a>
                        </div>
                    </div>

                    <section class="tab_content gsrin0301" v-if="CTabIdx === 0">
                        <h4 class="content_title">{{ t.ContentTitle[0].item }}</h4>
                        
                        <div class="search_filter_area">
                            <div class="filter_group">
                                <span class="filter_label">{{ t.YearSelectLabel }}</span>
                                <SelectBox v-model="selectedYear1" :options="t.YearOptions" />
                            </div>

                            <Search v-model="searchData" :search_opt="t.options" @search="handleSearch"  :placeholder="t.searchPlaceholder"/>
                        </div>

                        <div class="policy_wrap">
                            <table class="base_table">
                                <thead>
                                    <tr>
                                        <th scope="col" class="ac">{{ t.TableHeader.col1 }}</th>
                                        <th scope="col" class="ac">{{ t.TableHeader.col2 }}</th>
                                        <th scope="col" class="ac">{{ t.TableHeader.col4 }}</th>
                                        <th scope="col" class="ac">{{ t.TableHeader.col3 }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in t.IRListData" :key="'ir-'+idx">
                                        <td class="ac">{{ item.id }}</td>
                                        <td class="al">
                                            <a href="javascript:void(0);" class="link_title">{{ item.title }}</a>
                                        </td>
                                        <td class="ac">{{ item.date }}</td>
                                        <td class="ac">
                                            <button type="button" class="btn_download_file" @click="handleDownload(item.link)"></button>
                                        </td>
                                    </tr>
                                    <tr v-if="t.IRListData.length === 0">
                                        <td colspan="4" class="ac py80">{{ t.NoDataText }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section class="tab_content" v-if="CTabIdx === 1">
                        <div class="disclosure_info_head" v-if="CTabIdx === 1">
                            <h3 class="section-sub-title">{{ t.MainTitle }}</h3>
                            <p class="policy_desc" v-html="t.DartDesc"></p>
                            <div class="button-area mt16">
                                <a :href="t.DartLink" target="_blank" class="btn_big primary btn_icon_arrow after">
                                    {{ t.DartBtnText }}
                                </a>
                            </div>
                        </div>
                        <div class="inner_tabs_wrap">
                            <Tabs v-model="InnerTabIdx" :tab-items="t.InnerTabs" tab-class="type_02" />
                        </div>
                        <section class="tab_content gsrin030201" v-if="InnerTabIdx === 0">
                            <h4 class="content_title">{{ t.ContentTitle[1].item }}</h4>
                            <div class="search_filter_area">
                                <Search v-model="searchData" :search_opt="t.options" @search="handleSearch" />
                            </div>
                            <div class="policy_wrap">
                                <table class="base_table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="ac">{{ t.TableHeader.col1 }}</th>
                                            <th scope="col" class="ac">{{ t.TableHeader.col2 }}</th>
                                            <th scope="col" class="ac">{{ t.TableHeader.col3 }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, idx) in t.IRListData" :key="'report-'+idx">
                                            <td class="ac">{{ item.id }}</td>
                                            <td class="al">{{ item.title }}</td>
                                            <td class="ac">
                                                <button type="button" class="btn_download_file" @click="handleDownload(item.link)">
                                                    <span class="file_type_text">PDF</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section class="tab_content gsrin030202" v-if="InnerTabIdx === 1">
                            <h4 class="content_title">{{ t.ContentTitle[2].item }}</h4>
                            <div class="search_filter_area">
                                <Search v-model="searchData" :search_opt="t.options" @search="handleSearch" />
                            </div>
                            <div class="policy_wrap">
                                <table class="base_table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="ac">{{ t.TableHeader.col1 }}</th>
                                            <th scope="col" class="ac">{{ t.TableHeader.col2 }}</th>
                                            <th scope="col" class="ac">{{ t.TableHeader.col3 }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, idx) in t.IRListData" :key="'report-'+idx">
                                            <td class="ac">{{ item.id }}</td>
                                            <td class="al">{{ item.title }}</td>
                                            <td class="ac">
                                                <button type="button" class="btn_download_file" @click="handleDownload(item.link)">
                                                    <span class="file_type_text">PDF</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section class="tab_content gsrin030203" v-if="InnerTabIdx === 2">
                            <h4 class="content_title">{{ t.ContentTitle[3].item }}</h4> 
                            <div class="search_filter_area">
                                <Search v-model="searchData" :search_opt="t.options" @search="handleSearch" />
                            </div>
                            <div class="policy_wrap">
                                <table class="base_table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="ac">{{ t.TableHeader.col1 }}</th>
                                            <th scope="col" class="ac">{{ t.TableHeader.col2 }}</th>
                                            <th scope="col" class="ac">{{ t.TableHeader.col3 }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, idx) in t.IRListData" :key="'report-'+idx">
                                            <td class="ac">{{ item.id }}</td>
                                            <td class="al">{{ item.title }}</td>
                                            <td class="ac">
                                                <button type="button" class="btn_download_file" @click="handleDownload(item.link)">
                                                    <span class="file_type_text">PDF</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </section>

                    <section class="tab_content gsrin0303" v-if="CTabIdx === 2">
                        <div class="disclosure_info_head">
                            <h3 class="section-sub-title">{{ t.Tabs1[2].item }}</h3>
                            <p class="policy_desc">GS리테일의 공시자료는 금융감독원의 DART(전자공시시스템)를 통해 제공하고 있습니다.</p>
                            <Buttons  
                                class="btn_big primary btn_icon_arrow after mt16"
                                btn-class="btn_icon" 
                                @click="openModal" 
                                data-popid="gsrin030301" 
                                data-type="lg" 
                                data-cont="gsrin030301"    
                            >
                                {{ t.GeneralText }}
                            </Buttons>
                        </div>
                       
                        <h4 class="content_title">
                            <span>{{ t.ContentTitle[4].item }}</span>
                            <Buttons class="btn_big primary btn_icon_arrow after" btn-class="btn_icon">
                                {{ t.ShareholderPolicyBtn }}
                            </Buttons>
                        </h4>
                        <div class="search_filter_area">
                            <div class="filter_group">
                                <span class="filter_label">{{ t.YearSelectLabel }}</span>
                                <SelectBox v-model="selectedYear3" :options="t.YearOptions2" />
                            </div>

                            <Search v-model="searchData" :search_opt="t.options" @search="handleSearch" />
                        </div>
                        
                        <div class="policy_wrap">
                            <table class="base_table">
                                <thead>
                                    <tr>
                                        <th scope="col" class="ac">{{ t.TableHeader.col1 }}</th>
                                        <th scope="col" class="ac">{{ t.TableHeader.col2 }}</th>
                                        <th scope="col" class="ac">{{ t.TableHeader.col3 }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in t.IRListData" :key="'ir-'+idx">
                                        <td class="ac">{{ item.id }}</td>
                                        <td class="al">
                                            <a href="javascript:void(0);" class="link_title">{{ item.title }}</a>
                                        </td>
                                        <td class="ac">
                                            <button type="button" class="btn_download_file" @click="handleDownload(item.link)">
                                                <span class="file_type_text">PDF</span>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="t.IRListData.length === 0">
                                        <td colspan="3" class="ac py80">{{ t.NoDataText }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div class="pagination_area mt100">
                        <Pagination v-model="currentPage" :total-pages="5" @change="onPageChange" />
                    </div>
                </div>
            </div>
        </section>

        <div id="gsrin030301" class="modal_wrap">
            <div class="modal_container"></div>
        </div>
    </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import SelectBox from "@/components/SelectBox.vue";
import Buttons from "@/components/Buttons.vue";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";
import modal from "@/assets/js/modal";

export default {
    name: "gsrin0301",
    components: { Tabs, SelectBox, Search, Pagination, Buttons },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            CTabIdx: 0,
            InnerTabIdx: 0,
            currentPage: 1,
            // 수정: 선택된 연도 데이터를 탭별로 분리
            selectedYear1: "전체",
            selectedYear3: "전체",
            searchData: { type: "all", keyword: "" },
            langData: {
                ko: {
                    MainTitle: "공시정보",
                    searchPlaceholder: "검색어 입력",
                    MainsubTitle: "Disclosure Information",
                    Tabs1: [{ item: "공고" }, { item: "사업/감사보고서" }, { item: "공시정보" }],
                    ContentTitle: [{ item: "공고" }, { item: "분기보고서" }, { item: "사업보고서" }, { item: "감사보고서" }, { item: "주주총회 공시" }],
                    ShareholderPolicyBtn: "주주보호 정책 및 관련 제도 정보", 
                    InnerTabs: [{ item: "분/반기보고서" }, { item: "사업보고서" }, { item: "감사보고서" }], 
                    DartDesc: "GS리테일의 공시자료는 금융감독원의 DART(전자공시시스템)를 통해 제공하고 있습니다.",
                    DartBtnText: "공시자료 바로가기",
                    GeneralText: "공시자료 바로가기",
                    DartLink: "https://dart.fss.or.kr/",
                    YearSelectLabel: "년도선택",
                    YearOptions: [
                        { value: "전체", label: "전체" },
                        { value: "2026", label: "2026" },
                        { value: "2025", label: "2025" }
                    ],
                    YearOptions2: [
                        { value: "전체", label: "전체" },
                        { value: "2026", label: "2026" },
                        { value: "2025", label: "2025" }
                    ],
                    options: [
                        { value: "all", label: "전체" },
                        { value: "title", label: "제목" },
                        { value: "content", label: "내용" }
                    ],
                    TableHeader: { col1: "구분", col2: "제목", col3: "다운로드", col4: "등록일" }, 
                    IRListData: [
                        { id: "60", title: "2025년도 재무제표 결산공고", date: "2026.06.23", link: "#" },
                        { id: "59", title: "제55기 사업연도 배당기준일 설정 공고", date: "2026.06.22", link: "#" },
                        { id: "58", title: "2024년도 재무제표 결산공고", date: "2025.06.23", link: "#" },
                        { id: "57", title: "제54기 사업연도 배당기준일 설정 공고", date: "2025.06.22", link: "#" },
                        { id: "56", title: "외부감사계약 체결 공고", date: "2024.06.23", link: "#" }
                    ],
                    MeetingListData: [],
                    NoDataText: "조회된 데이터가 없습니다."
                },
                en: {
                    MainTitle: "Disclosure",
                    searchPlaceholder: "Enter search term"/* 260708 번역 */,
                    MainsubTitle: "Disclosure Information",
                    Tabs1: [{ item: "Announcement"/* 260604 번역 */ }, { item: "Business/Audit Report"/* 260604 번역 */ }, { item: "Disclosure" }],
                    ContentTitle: [{ item: "Announcement"/* 260604 번역 */ }, { item: "Business Report"/* 260604 번역 */ }, { item: "Audit Report"/* 260604 번역 */ }, { item: "Shareholders' Meeting Disclosure"/* 260604 번역 */ }, { item: "Disclosure" }],
                    ShareholderPolicyBtn: "Shareholder Protection Policy and Related Systems"/* 260604 번역 */, 
                    InnerTabs: [{ item: "Quarterly/Semi-annual Report"/* 260604 번역 */ }, { item: "Business Report"/* 260604 번역 */ }, { item: "Audit Report"/* 260604 번역 */ }],
                    DartDesc: "GS Retail's disclosure materials are provided through the Financial Supervisory Service's DART (Data Analysis, Retrieval and Transfer System)."/* 260604 번역 */,
                    DartBtnText: "Go to Disclosure Materials"/* 260604 번역 */,
                    GeneralText: "Go to Disclosure Materials"/* 260604 번역 */,
                    DartLink: "https://dart.fss.or.kr/",
                    YearSelectLabel: "Select Year"/* 260604 번역 */,
                    YearOptions: [
                        { value: "All", label: "All" },
                        { value: "2026", label: "2026" },
                        { value: "2025", label: "2025" }
                    ],
                    YearOptions2: [
                        { value: "All", label: "All" },
                        { value: "2026", label: "2026" },
                        { value: "2025", label: "2025" }
                    ],
                    options: [
                        { value: "all", label: "All" },
                        { value: "title", label: "Title" },
                        { value: "content", label: "Details" }
                    ],
                    TableHeader: { col1: "Category", col2: "Title", col3: "Date", col4: "Download ↓" },
                    IRListData: [
                        { id: "60", title: "FY2025 Financial Statements Settlement Announcement"/* 260604 번역 */, date: "2026.06.23", link: "#" },
                        { id: "59", title: "Notice of Setting the Dividend Record Date for the 55th Fiscal Year"/* 260604 번역 */, date: "2026.06.22", link: "#" },
                        { id: "58", title: "FY2024 Financial Statements Settlement Announcement"/* 260604 번역 */, date: "2025.06.23", link: "#" },
                        { id: "57", title: "Notice of Setting the Dividend Record Date for the 54th Fiscal Year"/* 260604 번역 */, date: "2025.06.22", link: "#" },
                        { id: "56", title: "Notice of External Audit Contract Conclusion"/* 260604 번역 */, date: "2024.06.23", link: "#" }
                    ],
                    MeetingListData: [],
                    NoDataText: "There is no data found."/* 260604 번역 */
                }
            }
        };
    },
    computed: { t() { return this.langData[this.lang] || this.langData.ko; } },
    methods: {
        onTabChange1(idx) { 
            this.CTabIdx = idx; 
            this.currentPage = 1; 
            this.InnerTabIdx = 0; 
        },
        handleSearch(val) { console.log("검색:", val); },
        handleDownload(link) { console.log("다운로드:", link); },
        onPageChange(page) { this.currentPage = page; },
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default";
            const cont = el.dataset.cont; 
            // modal.js 라이브러리를 통해 팝업 열기
            modal.open(popId, type, el, cont);
        },
    }
};
</script>

<style scoped>
.main-container { width: 100%; position: relative; }
.title_wrap { width: 100%; height: 480px; padding: 10.91% 0 11.25%; background: url('/src/assets/images/dummy/gsrin0301_bg.png') no-repeat center / cover; text-align: center; position: relative; display: block;}
.page-title { color: #FFFFFF; font-size: 72px; font-weight: 700; letter-spacing: -1.44px; }
.visual-sub { margin-top: 10px; color: #FFFFFF; font-size: 32px; font-weight: 700; }
.search_filter_area{margin-top:32px;}
.disclosure_info_head {margin-bottom:100px; text-align: left; }
.section-sub-title { font-size: 4rem; font-weight: 700; color: #161616; margin-bottom: 16px; }
.policy_desc { font-size: 24px; color: #161616; line-height: 1.5; word-break: keep-all; }
.tab_content_wrap {margin-top:100px;}
.inner_tabs_wrap {margin-bottom:40px;}
.inner_tabs_wrap + .tab_content {margin-top:100px;}

/* 테이블 스타일 */
.content_title {margin-bottom:16px; font-size: 4rem; font-weight: 700; color: #161616; display:flex; align-items:center; justify-content:space-between;}
.content_title .section-sub-title {margin-bottom:0;}
.content_title a {font-weight:normal;}
.policy_wrap table { width: 100%; border-collapse: collapse; border-top: 2px solid #161616; }
.policy_wrap th, .policy_wrap td { padding: 18px 24px; border-bottom: 1px solid #E5E5E9; font-size: 1.8rem; vertical-align: middle; }
.policy_wrap thead th { background-color: #F8F8F8; color: #161616; font-weight: 700; }
.policy_wrap td { height: 82px; color: #161616; border-left: 0; border-right: 0; }
.policy_wrap th { border-left: 0; border-right: 0; }
.policy_wrap td a { font-size: 1.8rem; color: #161616; text-decoration: none; }
.policy_wrap td a:hover { text-decoration: underline; }

@media screen and (min-width: 769px) {
    .policy_wrap thead th:nth-of-type(1) {width:150px;}
    .policy_wrap thead th:nth-of-type(3),
    .policy_wrap thead th:nth-last-of-type(1) {width:200px;}
}

@media screen and (max-width: 768px) {
    h3.section-sub-title, h4.content_title {font-size:2.4rem;}
    .policy_desc {font-size:1.8rem;}
    .title_wrap { display: none; }
    .inner_tabs_wrap {margin-bottom:60px;}
    .disclosure_info_head {margin-bottom:80px;}
    :deep(ul.type_02) {margin-top:-35px !important;}
    .policy_wrap th:first-child, .policy_wrap td:first-child { display: none; }
    .policy_wrap thead {display:none;}
    .content_title {margin-bottom:32px; flex-direction:column; align-items:flex-start; gap:12px}
    .filter_label {display:none;}
    .btn_big {font-size:16px;}
    .policy_wrap td a {font-size:16px;}
    .inner_tabs_wrap + .tab_content{margin-top:80px;}
    .cont_inner > .tab_wrap.tabSlide {margin-top: 84px;} 
    .tab_content_wrap{margin:0;padding-top:36px;} 
    .pagination_area.mt100 {margin-top: 0 !important;} 
}
</style>