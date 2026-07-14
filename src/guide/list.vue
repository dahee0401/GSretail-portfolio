<template>
    <div class="contents">

        <h2>List</h2>

        <section>
            <h4>Search</h4>
            <ul class="explain">
                <li><strong>[searchData]</strong> : [type] = "select 초기 선택 value 값" / [keyword] = "input 초기 입력 값"</li>
                <li><strong>@search="handleSearch"</strong> : [검색] 버튼 클릭 시 실행 이벤트</li>
                <li><strong>:useSelect="false"</strong> : select 사용여부 // default = "true"</li>
            </ul>

            <p class="tit_wrap">
                <strong class="tit">Design</strong>
            </p>
            <div class="design_box">
                <Search v-model="searchData" :search_opt="options" @search="handleSearch" />

                <Search class="mt10" v-model="searchData" :search_opt="options" @search="handleSearch" :useSelect="false" />
            </div>

            <p class="tit_wrap">
                <strong class="tit">Code</strong>
                <a href="#none">OPEN</a>
            </p>
            <pre class="code_box">
<code>&lt;template&gt;
    &lt;Search v-model="searchData" :search_opt="options" @search="handleSearch" /&gt;
&lt;/template&gt;

&lt;script&gt;
import Search from "@/components/Search.vue";

data() {
    return {
        /* 검색어 */
        searchData: {
            type: "all",    // select 초기 선택 value 값
            keyword: ""     // input 초기 입력 값
        },

        /* 검색 유형 선택 */
        options: [
            { value: "all", label: "전체" },
            { value: "title", label: "제목" },
            { value: "content", label: "내용" },
        ]
    }
},
methods: {
    handleSearch(val) { //[검색] 버튼 클릭 시 실행 이벤트
        const i = 0;
        console.log("검색 실행:", val);
    }
}
&lt;/script&gt;</code></pre>
        </section>

        <section>
            <h4>Pagination</h4>
            <ul class="explain">
                <li><strong>totalPages</strong> : 총 페이지 목록 수</li>
                <li><strong>visiblePages</strong> : pagination 목록에 보여질 버튼 수</li>
                <li><strong>showEllipsis</strong> : pagination 중간 생략 여부 // default = false</li>
            </ul>

            <p class="tit_wrap">
                <strong class="tit">Design</strong>
            </p>
            <div class="design_box">
                <Pagination v-model="page" :totalPages="32" :visiblePages="10" @change="handlePage" />
            </div>

            <p class="tit_wrap">
                <strong class="tit">Code</strong>
                <a href="#none">OPEN</a>
            </p>
            <pre class="code_box">
<code>&lt;template&gt;
    &lt;Pagination v-model="page" :totalPages="32" :visiblePages="10" :showEllipsis="false" @change="handlePage" /&gt;
&lt;/template&gt;

&lt;script&gt;
import Pagination from "@/components/Pagination.vue";

data() {
    return {
        page: 2, // pagination 현재 선택된 페이지
    }
},
methods: {
    /* pagination */
    handlePage(page) {
        console.log("선택된 페이지:", page);
        this.page = page;
    }
}
&lt;/script&gt;</code></pre>
        </section>

    </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    name: "list",
    components: {
        Search,
        Pagination,
    },

    data() {
        return {
            /* 검색어 */
            searchData: {
                type: "all",    // select 초기 선택 value 값
                keyword: ""     // input 초기 입력 값
            },

            /* 검색 유형 선택 */
            options: [
                { value: "all", label: "전체" },
                { value: "title", label: "제목" },
                { value: "content", label: "내용" },
            ],

            /* 초기 선택된 페이지 */
            page: 2,
        }
    },
    mounted() {
        /* 소스보기 */
        $('.tit_wrap a').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').parent().siblings('.code_box').slideUp();
            } else {
                $(this).addClass('active').parent().siblings('.code_box').slideDown();
            }
        });
    },
    methods: {
        handleSearch(val) {
            const i = 0;
            console.log("검색 실행:", val);
        },

        /* pagination */
        handlePage(page) {
            console.log("선택된 페이지:", page);
            this.page = page;
        }
    }
}
</script>

<style></style>