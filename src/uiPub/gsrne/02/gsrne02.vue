<template>
    <div class="main-container">
        <div class="title_wrap top_visual"> <!-- 클래스 top_visual 추가 26.06.08 add 정다희 -->
            <h2 class="page-title">{{ t.MainTitle }}</h2>
            <!-- <p class="visual-sub" v-html="t.MainsubTitle"></p> -->  <!-- 26.06.23 del 정다희 : MainsubTitle 삭제 -->
        </div>

        <section>
            <div class="cont_inner">

                <Tabs @change="onTabChange" v-model="tabIdx" :tab-items="t.tabs" tab-class="type_02 ac" :tab-slide="false" />
                
                
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

                        <div class="board_wrap type_gallery" v-if="tabIdx === 0">
                            <ul class="body">
                                <li v-for="item in t.ListData" :key="item">
                                    <div class="item">
                                        <a href="/gsrne0101">
                                            <span class="thumb"><em><img :src="item.thumb" alt="" /></em></span> <!-- 26. 06. 17 add 정다희 : 대체텍스트 추가   -->
                                        </a>
                                        <a href="#none" class="cont">
                                            <strong>{{ item.title }}</strong>
                                            <p>{{ item.sub }}</p>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="board_wrap type_gallery type_long" v-if="tabIdx === 1">
                            <ul class="body">
                                <li v-for="item in t.ListData2" :key="item">
                                    <div class="item">
                                        <a href="/gsrne0101">
                                            <span class="thumb"><em><img :src="item.thumb" alt="" /></em></span> <!-- 26. 06. 17 add 정다희 : 대체텍스트 추가   -->  
                                        </a>
                                        <a href="#none" class="cont">
                                            <strong>{{ item.title }}</strong>
                                            <p>{{ item.sub }}</p>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

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
        </section>
    </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";
import Tabs from "@/components/Tabs.vue";

export default {
    name: "gsrin04",
    components: { Search, Pagination, Tabs },
    setup() {
        const route = useRoute();
        const isGuide = computed(() => route.path.startsWith("/guide"));

        const lang = ref("ko");

        const setLang = (value) => {
            lang.value = value;
        };

        const searchData = ref({
            type: "all",
            keyword: "",
        });

        const currentPage = ref(1);
        const tabIdx = ref(0);

        const langData = {
            ko: {
                MainTitle: "뉴스룸", /* 26.06.23 add 정다희 : 뉴스룸 타이틀 국문 변경 */ 
                // MainsubTitle: "GS리테일 공식 유튜브 채널", <!-- 26.06.23 del 정다희 : MainsubTitle 삭제 -->
                tabs: [
                    { item: "롱폼" },
                    { item: "숏폼" },
                ],
                SearchOptions: [
                    { value: "all", label: "전체" },
                    { value: "title", label: "제목" },
                    { value: "content", label: "내용" },
                ],
                placeholder: "검색어 입력",
                ListData: [
                    { thumb: require("@/assets/images/dummy/thumb_news_01-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                    { thumb: require("@/assets/images/dummy/thumb_news_01-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                    { thumb: require("@/assets/images/dummy/thumb_news_01-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                    { thumb: require("@/assets/images/dummy/thumb_news_01-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                ],
                ListData2: [
                    { thumb: require("@/assets/images/dummy/thumb_news_02-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강" },
                    { thumb: require("@/assets/images/dummy/thumb_news_02-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강" },
                    { thumb: require("@/assets/images/dummy/thumb_news_02-3.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강" },
                ],
            },
            en: {
                MainTitle: "Newsroom", /* 26.06.23 add 정다희 : 뉴스룸 타이틀 영문 변경 */ 
                // MainsubTitle: "GS리테일 공식 유튜브 채널", <!-- 26.06.23 del 정다희 : MainsubTitle 삭제 -->
                tabs: [
                    { item: "롱폼" },
                    { item: "숏폼" },
                ],
                SearchOptions: [
                    { value: "all", label: "All" },
                    { value: "title", label: "Title" },
                    { value: "content", label: "Details" },
                ],
                placeholder: "검색어 입력",
                ListData: [
                    { thumb: require("@/assets/images/dummy/thumb_news_01-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                    { thumb: require("@/assets/images/dummy/thumb_news_01-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                    { thumb: require("@/assets/images/dummy/thumb_news_01-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                    { thumb: require("@/assets/images/dummy/thumb_news_01-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강", sub: "GS리테일의 2025년 하반기 주요 경영성과와 사업부문별 성장 전략을 영상으로 만나보세요." },
                ],
                ListData2: [
                    { thumb: require("@/assets/images/dummy/thumb_news_02-1.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강" },
                    { thumb: require("@/assets/images/dummy/thumb_news_02-2.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강" },
                    { thumb: require("@/assets/images/dummy/thumb_news_02-3.png"), title: "GS샵, '스타일NOW 더김동은' 앞세워 프리미엄 패션 경쟁력 강화 프리미엄 패션 경쟁력 강" },
                ],
            },
        };

        const t = computed(() => {
            const current = langData[lang.value];
            return current && Object.keys(current).length ? current : langData.ko;
        });

        /* [검색] 버튼 클릭 시 Search 컴포넌트에서 전달받은 값 처리 */
        const handleSearch = (val) => {
            console.log("검색 유형:", val.type);
            console.log("검색어:", val.keyword);
            currentPage.value = 1;
        };

        const onPageChange = (page) => {
            currentPage.value = page;
        };

        const onTabChange = (idx) => {
            tabIdx.value = idx;
            currentPage.value = 1;
        };

        onMounted(() => {
            // const header = document.getElementById("header");
            // header?.classList.add("head_black");
        });

        return { isGuide, lang, setLang, searchData, currentPage, tabIdx, t, handleSearch, onPageChange, onTabChange };
    },
};
</script>

<style scoped>
/* 제공해주신 CSS 그대로 유지 (수정 없음) */
.main-container { width: 100%; position: relative; }
/* title_wrap css수정 26.06.08 edit 정다희 */
.title_wrap {width: 100%; height:460px; padding:10.91% 0 11.25%; background: url('/src/assets/images/dummy/gsrne02_bg.png') no-repeat center 47% / cover; text-align: center; position: relative; display: block;}
.title_wrap::before{content:''; display:block; width:100%; height:100%; background:rgba(0,0,0,0.4); position:absolute; top:0; left:0; z-index:1;}
.title_wrap > h2{color:#fff; position: relative; z-index:2;}
.title_wrap > p{color:#fff; position: relative; z-index:2;}
.page-title { color: #111; font-size: 72px; font-weight: 700; line-height:124%; letter-spacing:-0.02em;}
.visual-sub { margin-top: 10px; color: #111; font-size: 24px; font-weight: 400; line-height:150%; }

.tab_wrap {margin-top:48px;}

/* board_wrap */
.board_wrap.type_gallery .body {margin-top:-54px; margin-left:-50px; display:flex; flex-wrap:wrap;}
.board_wrap.type_gallery .body > li {width:33.3333%; padding-top:54px; padding-left:50px;}
.board_wrap.type_gallery .item {display:flex; flex-direction:column;}
.board_wrap.type_gallery .item .thumb {padding-top:60.90909%; border-radius:12px; overflow:hidden; position:relative; display:block; align-items:center;}
.board_wrap.type_gallery .item .thumb em {position:absolute; top:0; right:0; bottom:0; left:0;}
.board_wrap.type_gallery .item .thumb img {width:100%; height:100%; object-fit:cover; display:block;}
.board_wrap.type_gallery .item .cont {margin-top:24px;}
.board_wrap.type_gallery .item .cont strong {font-size:2rem; line-height:135%; letter-spacing:-0.01em; display:block;}
.board_wrap.type_gallery .item .cont p {margin-top:12px; font-size:1.6rem; line-height:150%; letter-spacing:-0.01em;}

.board_wrap.type_gallery.type_long .item .thumb {padding-top:177.727272%;}

@media screen and (max-width: 767px) {

    /* 26.06.08 Add 이종환 */
    .cont_inner {margin-top:84px;} /* 26.06.26 edit 이소라 */

    /* 26.06.08 edit 정다희 : title_wrap css 수정  */
    .title_wrap {display: none;}
    .board_wrap.type_gallery .body {margin-top:-48px;}
    .board_wrap.type_gallery .body > li {width:100%; padding-top:48px;}
    .board_wrap.type_gallery .item .thumb {padding-top:60.895522%;}
}
</style>