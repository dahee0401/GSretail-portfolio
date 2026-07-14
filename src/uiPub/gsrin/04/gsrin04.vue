<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
            <!-- 26.06.10 Del 이종환 <p class="visual-sub">{{ t.MainsubTitle }}</p> -->
        </div>

        <section class="section-investor">
            <div class="cont_inner">
                <section class="gsrin04">
                    <div class="element">
                        <div class="search_filter_area">
                            <div class="filter_group">
                                <span class="filter_label">{{ t.YearSelectLabel }}</span>
                                <SelectBox 
                                    v-model="selectedYear" 
                                    :options="t.YearOptions" 
                                    style="width: 160px;" 
                                />
                            </div>

                            <Search 
                                v-model="searchData" 
                                :search_opt="t.SearchOptions" 
                                @search="handleSearch" 
                            />
                        </div>

                        <div class="policy_wrap ">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col" class="ac">{{ t.TableHeader.col1 }}</th>
                                        <th scope="col" class="ac">{{ t.TableHeader.col2 }}</th>
                                        <th scope="col" class="ac">{{ t.TableHeader.col3 }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in t.IRListData" :key="'ir-'+idx">
                                        <td class="ac">{{ item.no }}</td>
                                        <td class="al">
                                            <a href="javascript:void(0)" class="file_link">{{ item.title }}</a>
                                        </td>
                                        <td class="ac">
                                            <button type="button" class="btn_download_file" @click="handleDownload(item.link)">
                                                <span class="file_type_text">{{ item.fileType }}</span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="pagination_area ">
                            <Pagination 
                                v-model="currentPage" 
                                :total-pages="10" 
                                @change="onPageChange" 
                            />
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
import SelectBox from "@/components/SelectBox.vue";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    name: "gsrin04",
    components: { SelectBox, Search, Pagination },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            /* 1. 상단 연도 선택 필터 데이터 */
            selectedYear: "전체", 

            /* 2. Search 컴포넌트와 v-model로 연결될 데이터 구조 */
            searchData: {
                type: "all",    // Search 컴포넌트 내 select의 초기값
                keyword: ""     // Search 컴포넌트 내 input의 초기값
            },

            /* 3. 페이지네이션 현재 페이지 */
            currentPage: 1,

            /* 4. 언어별 텍스트 데이터 */
            langData: {
                ko: {
                    MainTitle: "IR 자료실",
                    MainsubTitle: "IR Library",
                    YearSelectLabel: "년도선택",

                    /* SelectBox 컴포넌트용 옵션 */
                    YearOptions: [
                        { value: "전체", label: "전체" },
                        { value: "2026", label: "2026" },
                        { value: "2025", label: "2025" },
                        { value: "2024", label: "2024" }
                    ],

                    /* Search 컴포넌트 전용 옵션 (props: search_opt) */
                    SearchOptions: [
                        { value: "all", label: "전체" },
                        { value: "title", label: "제목" },
                        { value: "content", label: "내용" }
                    ],

                    /* 테이블 헤더 */
                    TableHeader: { 
                        col1: "번호", 
                        col2: "제목", 
                        col3: "다운로드" 
                    },

                    /* 리스트 데이터 */
                    IRListData: [
                        { no: "60", title: "2026년 경영실적 발표 자료", fileType: "PDF", link: "/files/report_60.pdf" },
                        { no: "59", title: "제 55기 정기주주총회 소집공고", fileType: "PDF", link: "/files/report_59.pdf" },
                        { no: "58", title: "2025년 4분기 IR 리포트", fileType: "PDF", link: "/files/report_58.pdf" },
                        { no: "57", title: "기업가치 제고 계획(밸류업) 공시", fileType: "PDF", link: "/files/report_57.pdf" },
                        { no: "56", title: "연결재무제표 기준 영업실적", fileType: "PDF", link: "/files/report_56.pdf" },
                        { no: "55", title: "2025년 3분기 실적자료", fileType: "PDF", link: "/files/report_55.pdf" },
                        { no: "54", title: "ESG 보고서 2025", fileType: "PDF", link: "/files/report_54.pdf" },
                        { no: "53", title: "신규 시설 투자 결정 안내", fileType: "PDF", link: "/files/report_53.pdf" },
                        { no: "52", title: "2025년 2분기 경영실적", fileType: "PDF", link: "/files/report_52.pdf" },
                        { no: "51", title: "감사보고서 제출", fileType: "PDF", link: "/files/report_51.pdf" }
                    ]
                },
                en: {
                    MainTitle: "IR Library",
                    MainsubTitle: "IR Library",
                    YearSelectLabel: "Select Year"/* 260604 번역 */,

                    /* SelectBox 컴포넌트용 옵션 */
                    YearOptions: [
                        { value: "All", label: "All" },
                        { value: "2026", label: "2026" },
                        { value: "2025", label: "2025" },
                        { value: "2024", label: "2024" }
                    ],

                    /* Search 컴포넌트 전용 옵션 (props: search_opt) */
                    SearchOptions: [
                        { value: "all", label: "All" },
                        { value: "title", label: "Title" },
                        { value: "content", label: "Details" }
                    ],

                    /* 테이블 헤더 */
                    TableHeader: { 
                        col1: "No.", 
                        col2: "Title", 
                        col3: "Download ↓" 
                    },

                    /* 리스트 데이터 */
                    IRListData: [
                        { no: "60", title: "2026 Business Results Presentation Materials"/* 260604 번역 */, fileType: "PDF", link: "/files/report_60.pdf" },
                        { no: "59", title: "Notice of Convocation of the 55th Annual General Meeting of Shareholders"/* 260604 번역 */, fileType: "PDF", link: "/files/report_59.pdf" },
                        { no: "58", title: "Q4 2025 IR Report"/* 260604 번역 */, fileType: "PDF", link: "/files/report_58.pdf" },
                        { no: "57", title: "Corporate Value-up Plan Disclosure"/* 260604 번역 */, fileType: "PDF", link: "/files/report_57.pdf" },
                        { no: "56", title: "Operating Results Based on Consolidated Financial Statements"/* 260604 번역 */, fileType: "PDF", link: "/files/report_56.pdf" },
                        { no: "55", title: "Q3 2025 Performance Materials"/* 260604 번역 */, fileType: "PDF", link: "/files/report_55.pdf" },
                        { no: "54", title: "ESG Report 2025"/* 260604 번역 */, fileType: "PDF", link: "/files/report_54.pdf" },
                        { no: "53", title: "New Facility Investment Decision Notice"/* 260604 번역 */, fileType: "PDF", link: "/files/report_53.pdf" },
                        { no: "52", title: "Q2 2025 Business Results"/* 260604 번역 */, fileType: "PDF", link: "/files/report_52.pdf" },
                        { no: "51", title: "Submission of Audit Report"/* 260604 번역 */, fileType: "PDF", link: "/files/report_51.pdf" }
                    ]
                }
            }
        };
    },
    computed: { 
        t() { 
            return this.langData[this.lang] || this.langData.ko; 
        } 
    },
    methods: {
        /* [검색] 버튼 클릭 시 Search 컴포넌트에서 전달받은 값 처리 */
        handleSearch(val) { 
            // val은 { type: "...", keyword: "..." } 형태입니다.
            console.log("검색 유형:", val.type);
            console.log("검색어:", val.keyword);
            console.log("선택된 연도:", this.selectedYear);
            
            // 여기서 실제 API 호출 등의 로직을 수행합니다.
            this.currentPage = 1; // 검색 시 1페이지로 초기화
        },
        handleDownload(link) { 
            if(link === "#") {
                alert("준비 중인 파일입니다.");
                return;
            }
            window.open(link, '_blank');
        },
        onPageChange(page) { 
            this.currentPage = page;
            console.log("현재 페이지:", page);
            // 페이지 변경 시 스크롤 상단 이동 또는 데이터 재조회
        }
    }
};
</script>

<style scoped>
/* 제공해주신 CSS 그대로 유지 (수정 없음) */
.main-container { width: 100%; position: relative; }
.title_wrap { width: 100%; height: 480px; padding: 10.91% 0 11.25%; background: url('/src/assets/images/dummy/gsrin04_bg.png') no-repeat center / cover; text-align: center; position: relative; display: block; }
.page-title { color: #FFFFFF; font-size: 72px; font-weight: 700; }
.visual-sub { margin-top: 10px; color: #FFFFFF; font-size: 32px; font-weight: 700; }

.policy_wrap table { width: 100%; border-collapse: collapse; word-break: keep-all; border-top: 1px solid #161616; }
.policy_wrap th, .policy_wrap td { padding: 18px 24px; border: 1px solid #E5E5E9; font-size: 1.8rem; line-height: 1.6; vertical-align: middle; }
.policy_wrap th { background-color: #F8F8F8; color: #161616; font-weight: 700; border-top: 1px solid #000; }
.policy_wrap td a {font-size:18px;}
.policy_wrap td {height: 82px; color: #161616; border-left:0; border-right:0; }
.policy_wrap th {border-left:0; border-right:0;}
.file_link { color: #161616; text-decoration: none; }
.file_link:hover { text-decoration: underline; }
.file_type_text { font-size: 18px; color: #161616; }
.img { width: 24px; height: 24px; }
.policy_wrap th:first-child, .policy_wrap td:first-child {width:150px}

@media screen and (max-width: 767px) {
    .cont_inner {padding-top: 52px;} /* 26.06.26 add 이소라 */
    .title_wrap {display:none;}
    .policy_wrap th:first-child, .policy_wrap td:first-child { display: none; }
    .policy_wrap th, .policy_wrap td { padding: 12px; font-size: 15px; }
    .policy_wrap td a, .file_type_text {font-size:16px;}
    .file_type_text {margin-left:8px;}
    .pagination {margin-top: 24px;} /* 26.06.26 add 이소라 */
}
</style>