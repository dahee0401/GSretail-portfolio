<template>
    <div class="main-container">
        <div class="title_wrap top_visual"> <!-- 26.06.24 add 정다희 : top_visual 클래스 추가 -->
            <h2 class="page-title">{{ t.MainTitle }}</h2>
            <!-- <p class="visual-sub" v-html="t.MainsubTitle"></p> -->  <!-- 26.06.24 del 정다희 : MainsubTitle 삭제 / 위치이동 -->
        </div>

        <section>
            <div class="cont_inner">
                <!-- <Tabs @change="onTabChange1" v-model="t.TabIdx" :tab-items="t.tabs" tab-class="type_02 ac" :tab-slide="false" /> -->
                <!-- 26.06.24 add 정다희 : visual-sub_pc, visual-sub_mo 클래스 추가 / 모바일 화면에서는 visual-sub_mo 클래스 사용 -->
                <p class="visual-sub visual-sub_pc" v-html="t.MainsubTitle"></p>
                <p class="visual-sub visual-sub_mo">{{ t.MainsubTitleMo }}</p>
                <section>
                    <div class="element">
                        <div class="search_filter_area">
                            <Search 
                                v-model="searchData" 
                                :search_opt="t.SearchOptions" 
                                @search="handleSearch"
                                :placeholder="t.placeholder"
                            />
                        </div>

                        <Tabs v-model="t.sTabIdx" :tab-items="t.subTabs" tab-class="type_full" :tab-slide="true" />

                        <div class="board_wrap type_gallery">
                            <ul class="body">
                                <li v-for="item in t.ListData" :key="item">
                                    <div class="item">
                                        <a href="/gsrne0301">
                                            <span class="thumb"><em><img :src="item.thumb" alt="" /></em></span> <!-- 26. 06. 17 add 정다희 : 대체텍스트 추가   -->
                                        </a>
                                        <a href="#none" class="cont">
                                            <strong>{{ item.title }}</strong>
                                            <p>
                                                <em class="cate">{{ item.cate }}</em>
                                                <span>{{ item.date }}</span>
                                            </p>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 26.05.13 Edit 이종환 : 공통화 -->
                <Pagination 
                    v-model="currentPage" 
                    :total-pages="10" 
                    @change="onPageChange" 
                />
                <!-- //26.05.13 Edit 이종환 : 공통화 -->

            </div>
        </section>
    </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";
import Tabs from "@/components/Tabs.vue";

export default {
    name: "gsrin04",
    components: { Search, Pagination, Tabs },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
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
                    MainTitle: "스토리", /* 26.06.23 add 정다희 : 스토리 타이틀 국문 변경 */ 
                    MainsubTitle: "궁금했던 GS리테일의 모든 것, 이제 여기저기 찾지 마세요.<br/> 여러분이 가장 많이 묻는 질문에 대한 정답을 한눈에 보기 쉽게 정리했습니다.",
                    MainsubTitleMo: "궁금했던 GS리테일의 모든것, 한눈에 보기 쉽게 정리해드립니다.", /*26.06.24 add 정다희 :MainsubTitleMo 추가 **/

                    sTabIdx: 0, //최초 선택된 탭 index
                    // 26.06.24 edit 정다희 : subTabs 아이템 텍스트 수정 
                    subTabs: [ //탭 아이템 배열
                        { item: "전체" },
                        { item: "GS리테일" },
                        { item: "GS25" },
                        { item: "GS SHOP" },
                        { item: "GS THE FRESH" },
                    ],

                    /* Search 컴포넌트 전용 옵션 (props: search_opt) */
                    SearchOptions: [
                        { value: "all", label: "전체" },
                        { value: "title", label: "제목" },
                        { value: "content", label: "내용" }
                    ],

                    placeholder: "검색어 입력",

                    /* 리스트 데이터 */
                    ListData: [
                        { thumb:  require("@/assets/images/dummy/thumb_news_01-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", cate: "GS SHOP", date: "2026.00.00" },
                        { thumb:  require("@/assets/images/dummy/thumb_news_01-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", cate: "GS SHOP", date: "2026.00.00" },
                        { thumb:  require("@/assets/images/dummy/thumb_news_01-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", cate: "GS SHOP", date: "2026.00.00" },
                        { thumb:  require("@/assets/images/dummy/thumb_news_01-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", cate: "GS SHOP", date: "2026.00.00" },
                    ],
                    ListData2: [
                        { thumb:  require("@/assets/images/dummy/thumb_news_02-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                        { thumb:  require("@/assets/images/dummy/thumb_news_02-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                        { thumb:  require("@/assets/images/dummy/thumb_news_02-3.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                    ]
                },
                en: {
                    MainTitle: "Story", /* 26.06.23 add 정다희 : 스토리 타이틀 영문 변경    */ 
                    MainsubTitle: "Everything you were curious about GS Retail — no need to search here and there anymore.<br/> We have organized clear answers to the questions you ask most often in an easy-to-read format."/* 260604 번역 */,
                    MainsubTitleMo: "Everything you were curious about GS Retail, organized at a glance for easy reading."/* 26.06.24 add 정다희 : MainsubTitleMo 추가 */,

                    sTabIdx: 0, //최초 선택된 탭 index
                    // 26.06.24 edit 정다희 : subTabs 아이템 텍스트 수정 
                    subTabs: [ //탭 아이템 배열
                        { item: "All" },
                        { item: "GS Retail"/* 260604 번역 */ },
                        { item: "GS25"/* 260604 번역 */ },
                        { item: "GS SHOP"/* 260604 번역 */ },
                        { item: "GS THE FRESH"/* 260604 번역 */ },
                    ],

                    /* Search 컴포넌트 전용 옵션 (props: search_opt) */
                    SearchOptions: [
                        { value: "all", label: "All" },
                        { value: "title", label: "Title" },
                        { value: "content", label: "Details" }
                    ],

                    placeholder: "Enter search term"/* 260604 번역 */,

                    /* 리스트 데이터 */
                    ListData: [
                        { thumb:  require("@/assets/images/dummy/thumb_news_01-1.png"), title: "GS Shop strengthens its premium fashion competitiveness with 'Style NOW The Kim Dong-eun'"/* 260604 번역 */, cate: "GS SHOP", date: "2026.00.00" },
                        { thumb:  require("@/assets/images/dummy/thumb_news_01-2.png"), title: "GS Shop strengthens its premium fashion competitiveness with 'Style NOW The Kim Dong-eun'"/* 260604 번역 */, cate: "GS SHOP", date: "2026.00.00" },
                        { thumb:  require("@/assets/images/dummy/thumb_news_01-1.png"), title: "GS Shop strengthens its premium fashion competitiveness with 'Style NOW The Kim Dong-eun'"/* 260604 번역 */, cate: "GS SHOP", date: "2026.00.00" },
                        { thumb:  require("@/assets/images/dummy/thumb_news_01-2.png"), title: "GS Shop strengthens its premium fashion competitiveness with 'Style NOW The Kim Dong-eun'"/* 260604 번역 */, cate: "GS SHOP", date: "2026.00.00" },
                    ],
                    ListData2: [
                        { thumb:  require("@/assets/images/dummy/thumb_news_02-1.png"), title: "GS Shop strengthens its premium fashion competitiveness with 'Style NOW The Kim Dong-eun'"/* 260604 번역 */, sub: "Watch a video on GS Retail's key management performance in the second half of 2025 and its growth strategies by business division."/* 260604 번역 */ },
                        { thumb:  require("@/assets/images/dummy/thumb_news_02-2.png"), title: "GS Shop strengthens its premium fashion competitiveness with 'Style NOW The Kim Dong-eun'"/* 260604 번역 */, sub: "Watch a video on GS Retail's key management performance in the second half of 2025 and its growth strategies by business division."/* 260604 번역 */ },
                        { thumb:  require("@/assets/images/dummy/thumb_news_02-3.png"), title: "GS Shop strengthens its premium fashion competitiveness with 'Style NOW The Kim Dong-eun'"/* 260604 번역 */, sub: "Watch a video on GS Retail's key management performance in the second half of 2025 and its growth strategies by business division."/* 260604 번역 */ },
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
            
            // 여기서 실제 API 호출 등의 로직을 수행합니다.
            this.currentPage = 1; // 검색 시 1페이지로 초기화
        },
        onPageChange(page) { 
            this.currentPage = page;
        },
    },
    mounted() {
        const header = document.getElementById("header");

        header.classList.add("head_black");
    }
};
</script>

<style scoped>
/* 제공해주신 CSS 그대로 유지 (수정 없음) */
.main-container { width: 100%; position: relative; }
.title_wrap {width: 100%; height:460px; padding:10.91% 0 11.25%; background: url('/src/assets/images/dummy/gsrne01_bg.png') no-repeat center 57% / cover; text-align: center; position: relative; display: block;}
.title_wrap::before{content:''; display:block; width:100%; height:100%; background:rgba(0,0,0,0.4); position:absolute; top:0; left:0; z-index:1;}
.title_wrap > h2{color:#fff; position: relative; z-index:2;}
.title_wrap > p{color:#fff; position: relative; z-index:2;}
.page-title { color: #111; font-size: 72px; font-weight: 700; line-height:124%; letter-spacing:-0.02em;}
.visual-sub {margin-top:80px; font-weight: 700;font-size: 3.2rem;line-height: 1.3;letter-spacing: -0.01em;text-align: center;}
.visual-sub_mo { display: none; }

.tab_wrap.tabSlide :deep(ul.type_full) li { flex:1; }
.tab_wrap.tabSlide :deep(ul.type_full) li a {padding:16.5px 5px; color:#90909A; font-size:1.8rem; line-height:140%; border:1px solid #C4C4D0; text-align:center;}
.tab_wrap.tabSlide :deep(ul.type_full) li.current a {color:#fff; background-color:#90909A; border-color:#90909A;}

/* board_wrap */
.board_wrap.type_gallery .body {margin-top:-54px; margin-left:-50px; display:flex; flex-wrap:wrap;}
.board_wrap.type_gallery .body > li {width:33.3333%; padding-top:54px; padding-left:50px;}
.board_wrap.type_gallery .item {display:flex; flex-direction:column;}
.board_wrap.type_gallery .item .thumb {padding-top:60.90909%; border-radius:12px; overflow:hidden; position:relative; display:block; align-items:center;}
.board_wrap.type_gallery .item .thumb em {position:absolute; top:0; right:0; bottom:0; left:0;}
.board_wrap.type_gallery .item .thumb img {width:100%; height:100%; object-fit:cover; display:block;}
.board_wrap.type_gallery .item .cont {margin-top:24px;}
.board_wrap.type_gallery .item .cont strong {font-size:2rem; line-height:135%; letter-spacing:-0.01em; display:block;}
.board_wrap.type_gallery .item .cont p {margin-top:12px; font-size:1.6rem; line-height:150%; letter-spacing:-0.01em; display:flex; align-items:center;}
.board_wrap.type_gallery .item .cont p em.cate {margin-right:8px; padding:2px 6px; color:#67676F; font-size:1.4rem; font-style:normal; line-height:140%; letter-spacing:-0.01em; background-color:#F2F2F4; border-radius:4px;}
.board_wrap.type_gallery .item .cont p .date {color:#67676F; font-size:1.6rem; line-height:150%; letter-spacing:-0.01em;}

.board_wrap.type_gallery.type_long .item .thumb {padding-top:177.727272%;}

@media screen and (max-width: 768px) {
    .main-container{padding-top:60px;}
    .title_wrap {display: none;}
    .visual-sub_pc { display: none; }
    .tab_wrap.tabSlide :deep(ul.type_full) li a { padding: 16.5px 16px; white-space: nowrap; }
    .visual-sub_mo { display: block; margin-top: 60px; font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; text-align: left;}
    .board_wrap.type_gallery .body {margin-top:-48px;}
    .board_wrap.type_gallery .body > li {width:100%; padding-top:48px;}
    .board_wrap.type_gallery .item .thumb {padding-top:60.895522%;}
    .tab_wrap.tabSlide :deep(ul.type_full) li a{padding:8px; font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em;}
}
</style>