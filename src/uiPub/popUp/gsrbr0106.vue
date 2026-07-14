<template>
    <!-- Figma node 198:26591 — popup 940×874, content 844 wide -->
    <div class="modal_cont store_find_modal">
        <div class="modal_header">
            {{ t.title }}
            <button type="button" class="btn_close" :aria-label="t.closeLabel" @click="closeModal"></button>
        </div>

        <div class="modal_content">
            <div class="sf_row sf_row_dd">
                <select
                    v-model="selSido"
                    class="sf_select"
                    :class="{ sf_is_placeholder: !selSido }"
                    :aria-label="t.hp03"
                >
                    <option value="" disabled>{{ t.hp03 }}</option>
                    <option v-for="o in optionsSido" :key="o" :value="o">{{ o }}</option>
                </select>
                <select
                    v-model="selSigungu"
                    class="sf_select"
                    :class="{ sf_is_placeholder: !selSigungu }"
                    :aria-label="t.hp02"
                >
                    <option value="" disabled>{{ t.hp02 }}</option>
                    <option v-for="o in optionsSigungu" :key="o" :value="o">{{ o }}</option>
                </select>
                <select
                    v-model="selDong"
                    class="sf_select"
                    :class="{ sf_is_placeholder: !selDong }"
                    :aria-label="t.hp01"
                >
                    <option value="" disabled>{{ t.hp01 }}</option>
                    <option v-for="o in optionsDong" :key="o" :value="o">{{ o }}</option>
                </select>
            </div>

            <!-- 26.05.11 Edit 이종환 : search component로 변경 -->
            <Search v-model="searchData" :search_opt="options" @search="handleSearch" :placeholder="t.hp05" :useSelect="false" />

            <!-- <div class="sf_row sf_row_input">
                <div class="sf_input_wrap">
                    <input
                        v-model="keyword"
                        type="search"
                        class="sf_input"
                        :placeholder="t.hp05"
                        autocomplete="off"
                    />
                    <span class="sf_input_trailing" aria-hidden="true"></span>
                </div>
            </div> -->

            <div class="sf_filter">
                <button
                    type="button"
                    class="sf_filter_btn"
                    :aria-expanded="filterExpanded"
                    @click="filterExpanded = !filterExpanded"
                >
                    <span class="sf_filter_label">{{ t.hp04 }}</span>
                    <span class="sf_chevron" :class="{ is_collapsed: !filterExpanded }"></span>
                </button>
                <div v-show="filterExpanded" class="sf_chip_wrap">
                    <button
                        v-for="c in chips"
                        :key="c.id"
                        type="button"
                        class="sf_chip"
                        :class="{ is_selected: c.selected, has_icon: !!c.icon }"
                        :style="c.icon ? { '--chip-icon': `url(${c.icon})` } : {}"
                        @click="c.selected = !c.selected"
                    >
                        {{ c.label }}
                    </button>
                </div>
            </div>

            <div class="sf_map_canvas">
                <!-- 26.05.19 Del iframe 제거 <iframe
                    class="sf_map_iframe"
                    src=""
                    :title="t.hp06"
                    frameborder="0"
                    allowfullscreen
                ></iframe> -->
                <div class="inner">
                    <div class="store_list">
                        <!-- 검색결과 없음 -->
                        <div class="no_result">
                            <!-- 매장명 입력하여 검색 -->
                            <p class="type_1" v-html="t.store.nodata_1"></p>

                            <!-- 검색결과 없음 -->
                            <p class="type_2" v-html="t.store.nodata_2"></p>
                        </div>
                        <!-- //검색결과 없음 -->

                        <!-- 매장목록 -->
                        <dl v-for="item_1 in t.store.list" :key="item_1" class="item">
                            <dt>{{ item_1.name }}</dt>
                            <dd>
                                <p>{{ item_1.address }}</p>
                                <ul>
                                    <li v-for="item_2 in item_1.key" :key="item_2">
                                        <em>{{item_2}}</em>
                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        <!-- //매장목록 -->
                    </div>
                    <!-- 지도 영역 -->
                    <div class="map_canvas"></div>
                    <!-- //지도 영역 -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, reactive } from "vue";

import modal from "@/assets/js/modal";

import icoChip01 from "@/assets/images/dummy/mo/ico_chip_01.png";
import icoChip02 from "@/assets/images/dummy/mo/ico_chip_02.png";
import icoChip03 from "@/assets/images/dummy/mo/ico_chip_03.png";
import icoChip04 from "@/assets/images/dummy/mo/ico_chip_04.png";
import icoChip05 from "@/assets/images/dummy/mo/ico_chip_05.png";

/* Search */
import Search from "@/components/Search.vue";

// =====================
// props
// =====================
const props = defineProps({
    lang: { type: String, default: "ko" }
});

// =====================
// language data
// =====================
const langData = {
    ko: {
                    hp01: "동 선택",
                    hp02: "시/군/구",
                    hp03: "시·도",
                    hp04: "필터",
                    hp05: "찾으시려는 매장명을 입력하세요.",
                    hp06: "매장 위치 지도",
                    closeLabel: "닫기",
        title: "GS25 매장찾기",
        chips: [
            { id: "c1", label: "스포츠 토토", selected: true },
            { id: "c2", label: "CAFE25", selected: false },
            { id: "c3", label: "치킨25", selected: true },
            { id: "c4", label: "의약품", selected: false },
            { id: "c5", label: "self25", selected: false },
            { id: "c6", label: "택배", selected: false, icon: icoChip01 },
            { id: "c7", label: "ATM 현금 입/출금", selected: false },
            { id: "c8", label: "현금출금(CD기)", selected: false },
            { id: "c9", label: "TAX REFUND", selected: false },
            { id: "c10", label: "SMART ATM", selected: false },
            { id: "c11", label: "셀프 조리기", selected: false },
            { id: "c12", label: "배달서비스", selected: true },
            { id: "c13", label: "택배 픽업", selected: false },
            { id: "c14", label: "군고구마", selected: true },
            { id: "c15", label: "심장재세동기", selected: false },
            { id: "c16", label: "붕어빵", selected: false, icon: icoChip02 },
            { id: "c17", label: "GOPIZZA", selected: false, icon: icoChip03 },
            { id: "c18", label: "양주/와인", selected: false },
            { id: "c19", label: "신선강화", selected: false },
            { id: "c20", label: "무신사 스탠다드 EXPRESS", selected: false, icon: icoChip04 },
            { id: "c21", label: "대한항공 POSA", selected: false, icon: icoChip05 }
        ],

        store: {
            list : [
                {
                    name: "GS25LG사이언스파크점",
                    address: "서울 강서구 마곡중앙10로10, 지하1층 (마곡동 770, 엘지사이언스파크)",
                    key: ["의약품", "택배", "군고구마", "붕어빵"]
                },
                {
                    name: "GS25S9가양역점",
                    address: "서울 강서구 양천로지하 485 (가양동 14-61)",
                    key: ["양주/와인", "배달서비스", "현금출금(CD기)", "택배", "ATM 현금 입/출금"]
                },
                {
                    name: "GS25S9가양역점2",
                    address: "서울 강서구 양천로지하 485 (가양동 14-61)",
                    key: ["양주/와인", "배달서비스", "현금출금(CD기)", "택배", "ATM 현금 입/출금"]
                },
            ],
            nodata_1: "매장명을 입력하여<br/> 검색해 주세요.",
            nodata_2: "검색결과가 없습니다.",
        },
    },

    en: {
                    hp01: "Select Dong"/* 260708 번역 */,
                    hp02: "City/County/District"/* 260708 번역 */,
                    hp03: "City/Province"/* 260708 번역 */,
                    hp04: "Filter"/* 260708 번역 */,
                    hp05: "Enter the store name you are looking for."/* 260708 번역 */,
                    hp06: "Store Location Map"/* 260708 번역 */,
                    closeLabel: "Close"/* 260708 번역 */,
        chips: [
            { id: "c1", label: "Sports Toto", selected: true },
            { id: "c2", label: "CAFE25", selected: false },
            { id: "c3", label: "Chicken25", selected: true },
            { id: "c4", label: "Medicine", selected: false },
            { id: "c5", label: "self25", selected: false },
            { id: "c6", label: "Parcel Service", selected: false, icon: icoChip01 }
        ],

        store: {
            list : [
                {
                    name: "GS25 LG Science Park",
                    address: "B1F, 10 Magokjungang-ro 10, Gangseo-gu, Seoul",
                    key: ["Medicine", "Parcel Service"]
                }
            ],
            nodata_1: "Please enter a store name<br/> to search.",
            nodata_2: "No matching results found.",
        }
    }
};

// =====================
// computed
// =====================
// const t = computed(() => langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || langData.ko);
const t = computed(() => {
    const base = langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || langData.ko;

    return {
        ...base,
        // chips: [...base.chips],
        store: {
            ...base.store,
            list: [...(base.store?.list || [])]
        }
    };
});

const chips = ref(
    structuredClone(
        (langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || langData.ko).chips
    )
);

// =====================
// state
// =====================


const searchData = ref("");
const options = ref([]);

const filterExpanded = ref(true);

const selSido = ref("");
const selSigungu = ref("");
const selDong = ref("");

const optionsSido = ["서울시", "경기도", "인천광역시"];
const optionsSigungu = ["강남구", "서초구", "송파구"];
const optionsDong = ["역삼동", "삼성동", "청담동"];

// =====================
// methods
// =====================
const closeModal = (event) => {
    modal.close(event.currentTarget);
};

const handleSearch = () => {
    console.log("search:", searchData.value);
};
</script>

<style scoped>
.sf_body {
    padding: 0;
    margin: 0;
}

/* 3×276 + gap8×2 = 844 */
.sf_row {
    margin: 0;
    padding: 0;
}

.sf_row_dd {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.sf_select {
    min-width: 0;
    height: 52px;
    padding: 0 40px 0 16px;
    border: 1px solid #c4c4d0;
    border-radius: 12px;
    background-color: #fff;
    color: #161616;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.16px;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='none' stroke='%23666' stroke-width='1.5' d='M5 7.5L10 12.5 15 7.5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    box-sizing: border-box;
}

.sf_select.sf_is_placeholder {
    color: #a4a4b0;
}

.sf_select option {
    color: #161616;
}

.sf_input {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    padding: 0 44px 0 16px;
    border: 1px solid #c4c4d0;
    border-radius: 12px;
    background: #fff;
    color: #161616;
    font-size: 1.6rem;
    line-height: 24px;
    letter-spacing: -0.16px;
    outline: none;
}

.sf_input::placeholder {
    color: #a4a4b0;
}

.sf_input:focus {
    border-color: #107af2;
}

/* Filter y gap: input 끝 + 12px */
.sf_filter {
    margin-top: 12px;
}

.sf_filter_btn {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
    margin: 0 0 6px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
}

.sf_filter_label {
    color: #161616;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.01em;
}

.sf_chevron {
    width: 16px;
    height: 16px;
    background:url('@/assets/images/common/icon_set_16.png') -136px -14px no-repeat;
    background-size:auto 83px;
    transition:transform 0.25s;
}

.sf_chevron.is_collapsed {
    transform: rotate(180deg) translateY(2px);
}

/* Chip 영역 h124, chip h36, gap 8 */
.sf_chip_wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 124px;
    align-content: flex-start;
}

.sf_chip {
    height: 36px;
    padding: 0 16px;
    box-sizing: border-box;
    border-radius: 99px;
    border: 1px solid #d7d7df;
    background: #f2f2f4;
    color: #666;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 19.6px;
    letter-spacing: -0.14px;
    cursor: pointer;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.sf_chip.is_selected {
    border-color: #107af2;
    background: #e7f2fe;
    color: #107af2;
}

.sf_chip.has_icon::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-right: 4px;
    background: var(--chip-icon) center / contain no-repeat;
}



.sf_map_canvas {
    margin-top: 64px;
    width: 100%;
    height: 320px;
    border-radius: 10px;
    overflow: hidden;
}

.sf_map_canvas .inner {display:flex; gap:20px;}

.sf_map_canvas .map_canvas {min-height:320px; background-color:#D7D7DF; border-radius:10px; flex:1;}

.sf_map_canvas .store_list {max-height:320px; border-bottom:1px solid #D7D7DF; overflow-y:auto; flex:1;}
.sf_map_canvas .store_list dl {padding:16px 20px; border-top:1px solid #D7D7DF;}
.sf_map_canvas .store_list dt {color:#161616; font-size:2rem; font-weight:700; letter-spacing:-0.01em; line-height:135%;}
.sf_map_canvas .store_list dd {margin-top:8px;}
.sf_map_canvas .store_list dd p {color:#67676f; font-size:1.6rem; letter-spacing:-0.01em; line-height:150%;}
.sf_map_canvas .store_list dd ul {margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;}
.sf_map_canvas .store_list dd ul em {padding:3px 6px; color:#107AF2; font-size:1.4rem; letter-spacing:-0.01em; line-height:140%; background-color:#E7F2FE; border-radius:4px; display:block;}

.sf_map_canvas .store_list .no_result {min-height:100%; display:flex; flex-direction:column; justify-content:center;}
.sf_map_canvas .store_list .no_result p {height:100%; color:#161616; font-size:1.8rem; font-weight:700; line-height:150%; text-align:center; display:flex; align-items:center; justify-content:center; flex-direction:column;}
.sf_map_canvas .store_list .no_result p:before {width:40px; height:40px; margin-bottom:16px; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat; content:''; display:block;}
.sf_map_canvas .store_list .no_result p.type_1:before {background-position:-20px -20px;}
.sf_map_canvas .store_list .no_result p.type_2:before {background-position:-260px -346px;}

/* .sf_map_iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 2px solid red;
    display: block;
} */

@media (max-width: 768px) {
    /* .sf_row_dd {
        flex-direction: column;
    } */

    .store_find_modal .modal_content {margin-top:-40px; padding-top:340px;}

    .sf_select {
        width: 100%;
        height: 48px;
    }
    .sf_chip_wrap {
        min-height: 0;
    }

    .sf_map_canvas {overflow:initial;}

    .sf_map_canvas .inner {
        display:block;
    }

    .sf_map_canvas .store_list {max-height:initial;}

    .sf_map_canvas .map_canvas {border-radius:0; position:fixed; top:61.2px; right:0; left:0;}
}
</style>
