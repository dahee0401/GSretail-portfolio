<template>
    <h2>GS리테일 Work List</h2>

    <div style="display:flex; align-items:center; justify-content:space-between;">
        <ul class="legend">
            <li><em class="com"></em> <span>완료(com)</span></li>
            <li><em class="ing"></em> <span>진행중(ing)</span></li>
            <li><em class="del"></em> <span>삭제(del)</span></li>
        </ul>

        <!-- 필터 -->
        <Search v-model="searchKeyword" :search_opt="options" :placeholder="placeholder" @search="handleSearch" />
    </div>

    <table>
        <thead>
            <tr style="background-color:#ebebe3;">
                <th>1Depth</th>
                <th>2Depth</th>
                <th>3Depth</th>
                <th>4Depth</th>
                <th>5Depth</th>
                <th>6Depth</th>
                <th>Type</th>
                <th>Path</th>
                <th>시작일</th>
                <th>종료일</th>
                <th>상태</th>
                <th>비고</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(item, index) in filteredList" :key="index">
                <td>{{ item.depth1 }}</td>
                <td>{{ item.depth2 }}</td>
                <td>{{ item.depth3 }}</td>
                <td>{{ item.depth4 }}</td>
                <td>{{ item.depth5 }}</td>
                <td>{{ item.depth6 }}</td>
                <td style="text-align:center;">{{ item.type }}</td>
                <td>
                    <a :href="item.link" target="_blank" v-if="item.status === 'com' || item.status === 'ing'">/uiPub/{{ item.path }}.vue</a>
                    <span v-else-if="item.path">/uiPub/{{ item.path }}.vue</span>
                </td>
                <td style="text-align:center;">{{ item.startDate }}</td>
                <td style="text-align:center;">{{ item.endDate }}</td>
                <td class="status" :class="item.status"> {{ getStatusText(item.status) }}</td>
                <td>{{ item.note }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Search from "@/components/Search.vue";
import workListData from "@/assets/language/menu/workList.json"

export default {
    name: "Work List",
    components: {
        Search,
    },
    data() {
        return {
            placeholder: '검색어를 입력하세요.',
            workList: workListData,  // 빌드 후에도 정상 로드됨

            /* 검색어 */
            searchKeyword: {       // Search.vue v-model 구조에 맞춤
                type: "all",           // select 초기값
                keyword: ""         // input 초기값
            },

            /* 검색 유형 선택 */
            options: [
                { value: "all", label: "전체" },
                { value: "com", label: "완료" },
                { value: "ing", label: "진행중" },
                { value: "del", label: "제거" }
            ]

        }
    },
    methods: {
        getStatusText(status) {
            switch (status) {
                case "com": return "완료";
                case "ing": return "진행중";
                case "del": return "삭제";
                default: return status;
            }
        }
    },
    computed: {
        filteredList() {
            // 안전하게 문자열 변환
            const keyword = String(this.searchKeyword.keyword || "").toLowerCase();
            const status = this.searchKeyword.type || "";

            return this.workList.filter(item => {
                const keywordMatch =
                    !keyword ||
                    Object.values(item).some(v =>
                        String(v).toLowerCase().includes(keyword)
                    );
                const statusMatch = status === "all" || item.status === status;

                return keywordMatch && statusMatch;
            });
        }
    }
}
</script>

<style scoped>
h2 {margin-bottom:22px; font-size:2.4rem; text-align:center;}

.search_wrap {margin-bottom:16px;}

.legend {display:flex; align-items:center; gap:10px;}
.legend li {display:flex; align-items:center; gap:4px;}
.legend em {width:10px; height:10px; display:block;}

table {width:100%; border-collapse:collapse;}

th, td {padding:8px 6px; font-size:1.3rem; border:1px solid #ccc; border-right:0; border-left:0;}
td {font-size:1.2rem;}

td.status {color:#fff; text-align:center;}

/* 상태 스타일 */
.com {background-color:#3366CC;}

.ing {background-color:#CC6600;}

.del {background-color:#666666;}
</style>