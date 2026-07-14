<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <div class="store_search_popup">
                <div class="intro_box">
                    <p class="intro_text" v-html="t.IntroText"></p>
                </div>

                <div class="filter_search_wrap">
                    <div class="input_group">
                        <SelectBox :options="t.CityOptions" v-model="searchForm.city" class="base_select" />
                        <SelectBox :options="t.DistrictOptions" v-model="searchForm.district" class="base_select" />
                        <div class="base_input_wrap">
                            <Inputs type="text" :placeholder="t.SearchPlaceholder" v-model="searchForm.keyword" class="base_input" />
                        </div>
                    </div>
                    <div class="btn_group">
                        <button type="button" class="btn_big btn_icon before primary" @click="handleSearch">{{ t.BtnSearch }}</button>
                        <button type="button" class="btn_big gray" @click="handleReset">{{ t.BtnReset }}</button>
                    </div>
                </div>

                <div class="store_layout_flex">
                    <div class="store_list_side">
                        <div v-for="(store, idx) in t.storeData" :key="idx" class="store_item" :class="{ 'active': selectedIdx === idx }">
                            <div class="item_info">
                                <div class="item_header">
                                    <strong class="store_name" @click="toggleMap(idx)">{{ store.name }}</strong>
                                </div>
                                <dl class="info_details">
                                    <dt>{{ t.LabelTime }}</dt>
                                    <dd>{{ store.time }}</dd>
                                    <dt>{{ t.LabelOffDay }}</dt>
                                    <dd>{{ store.offDay }}</dd>
                                    <dt>{{ t.LabelAddress }}</dt>
                                    <dd>{{ store.address }}</dd>
                                    <dt>{{ t.LabelTel }}</dt>
                                    <dd>{{ store.tel }}</dd>
                                </dl>
                                <button type="button" class="btn_leaflet">{{ t.BtnLeaflet }}</button>
                            </div>

                            <div class="store_map_mobile" v-if="selectedIdx === idx">
                                <div class="map_box">
                                    <img :src="store.mapImg" :alt="store.name + t.mapSuffix" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="store_map_pc" v-if="selectedIdx !== null">
                        <div class="map_box_sticky">
                            <img :src="t.storeData[selectedIdx].mapImg" :alt="t.storeData[selectedIdx].name + t.mapSuffix" />
                            <button type="button" class="btn_map_close" @click="selectedIdx = null">{{ t.hp01 }}</button>
                        </div>
                    </div>
                </div>

                <div class="pagination_area">
                    <Pagination 
                        v-model="page" 
                        :totalPages="10" 
                        :visiblePages="5" 
                        :showEllipsis="false" 
                        :lang="currentLang" 
                        @change="handlePage" 
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import SelectBox from "@/components/SelectBox.vue";
import Inputs from "@/components/Inputs.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    name: "gsrbr0203",
    components: {
        SelectBox,
        Inputs,
        Pagination
    },
    data() {
        return {
            page: 1,
            selectedIdx: null,
            currentLang: "ko",
            searchForm: { city: "서울", district: "", keyword: "" },
            langData: {
                ko: {
                    hp01: "지도 닫기",
                    mapSuffix: " 지도",
                    closeLabel: "닫기",
                    MainTitle: "GS THE FRESH 매장찾기",
                    IntroText: "빠르고 편리하게 <br/>우리동네 GS THE FRESH(GS수퍼마켓)을 찾아보세요!",
                    CityOptions: [{ value: "서울", label: "서울" }, { value: "경기도", label: "경기도" }],
                    DistrictOptions: [{ value: "", label: "시/군 선택" }],
                    SearchPlaceholder: "찾으시려는 동명, 도로명 또는 점포명을 입력하세요",
                    BtnSearch: "검색", BtnReset: "새로고침", BtnLeaflet: "행사 전단보기",
                    LabelTime: "영업시간", LabelOffDay: "휴점일", LabelAddress: "주소", LabelTel: "전화",
                    storeData: [
                        { name: "가경아이파크점", time: "10:00 ~ 23:00", offDay: "02월 11일 / 02월 25일", address: "충북 청주시 흥덕구 서현로 60, 상가 1층 (가경동 2270)", tel: "043-231-8012", mapImg: require("@/assets/images/dummy/gsrbr0203_map.png") },
                        { name: "가정루원시티점", time: "10:00 ~ 23:00", offDay: "02월 08일 / 02월 22일", address: "인천 서구 봉오재3로 66, 루원시티프라디움2동106호 (가정동 610-1)", tel: "032-569-6227", mapImg: require("@/assets/images/dummy/gsrbr0203_map.png") }
                    ]
                },
                en: {
                    hp01: "Close Map"/* 260708 번역 */,
                    mapSuffix: " Map"/* 260708 번역 */,
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Find a GS THE FRESH Store",
                    IntroText: "Find your nearest GS THE FRESH (GS Supermarket) quickly and easily!",
                    CityOptions: [{ value: "Seoul", label: "Seoul" }, { value: "Gyeonggi Province", label: "Gyeonggi Province" }],
                    DistrictOptions: [{ value: "", label: "Select City/County" }],
                    SearchPlaceholder: "Enter a neighborhood, street, or store name",
                    BtnSearch: "Search", BtnReset: "Refresh", BtnLeaflet: "View Promotional Flyer",
                    LabelTime: "Business hours"/* 260604 번역 */, LabelOffDay: "Closed days"/* 260604 번역 */, LabelAddress: "Address", LabelTel: "Phone",
                    storeData: [
                        { name: "Gagyeong iPark Branch", time: "10:00 ~ 23:00", offDay: "Closed: February 11 and February 25", address: "Address: 60 Seohyeon-ro, Heungdeok-gu, Cheongju-si, Chungcheongbuk-do, 1F (Gagyeong-dong 2270)", tel: "043-231-8012", mapImg: require("@/assets/images/dummy/gsrbr0203_map.png") },
                        { name: "Gajeong Rouen City Branch", time: "10:00 ~ 23:00", offDay: "Closed: February 8 and February 22", address: "Address: 66, Bongojae 3-ro, Seo-gu, Incheon, Rouen City Pradium Building 2, Unit 106 (Gajeong-dong 610-1)", tel: "032-569-6227", mapImg: require("@/assets/images/dummy/gsrbr0203_map.png") }
                    ]
                }
            }
        };
    },
    computed: {
        t() { return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko; }
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); },
        handleSearch() { console.log("검색", this.searchForm); },
        handleReset() { this.searchForm = { city: "서울", district: "", keyword: "" }; },
        handlePage(page) { this.page = page; },
        toggleMap(idx) { this.selectedIdx = (this.selectedIdx === idx) ? null : idx; }
    }
};
</script>

<style scoped>
.modal_header { font-size: 40px; font-weight: 700; border-bottom: 0; }
.store_search_popup { padding: 10px 0; }
.intro_box { margin-bottom: 32px; }
.intro_text { font-size: 24px; font-weight: 700; line-height: 1.4; color: #161616; }
.filter_search_wrap { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
.input_group { display: flex; flex: 1; gap: 8px; }
.base_select { width: 140px; }
/* 🔥 input이 포함된 wrap이 나머지 가로 전체를 차지하게 설정 */
.base_input_wrap { flex: 1; }
/* 🔥 컴포넌트 내부의 input 태그 너비를 100%로 강제 */
.base_input_wrap :deep(input) { width: 100% !important; }
.store_layout_flex { display: flex; align-items: flex-start; gap: 32px; border-top: 1px solid #161618; }
.store_list_side { flex: 1; width: 100%; max-height: 600px; overflow-y: auto; }
.store_item { padding: 24px 0; border-bottom: 1px solid #e5e5e9; }
.store_item.active { background-color: #f8f9fb; }
.store_name { font-size: 24px; font-weight: 700; display: block; margin-bottom: 12px; cursor: pointer; }
.store_name::after { content: ''; width: 20px; height: 20px; margin-left: 8px; background: red; display: inline-block; vertical-align: middle; }
.info_details { display: grid; grid-template-columns: 70px 1fr; gap: 8px 12px; font-size: 15px; }
.info_details dt { color: #67676f; }
.info_details dd { color: #161616; }
.btn_leaflet { width: fit-content; margin-top: 24px; padding: 6px 12px; border: 1px solid #67676f; border-radius: 4px; font-size: 13px; background: #fff; }
.store_map_pc { width: 450px; position: sticky; top: 0; padding: 24px 0; }
.map_box_sticky { width: 100%; height: 450px; border: 1px solid #e5e5e9; border-radius: 12px; overflow: hidden; position: relative; }
.map_box_sticky img { width: 100%; height: 100%; object-fit: cover; }
.btn_map_close { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.6); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
.store_map_mobile { display: none; }
.pagination_area { margin-top: 32px; display: flex; justify-content: center; }
.btn_group { padding: 0; display: flex; gap: 8px; }
@media screen and (max-width: 1024px) { 
    .store_layout_flex { flex-direction: column; } 
    .store_map_pc { display: none; } 
    .store_map_mobile { display: block; width: 100%; margin-top: 20px; } 
    .store_map_mobile .map_box { width: 100%; height: 250px; border-radius: 12px; overflow: hidden; border: 1px solid #e5e5e9; } 
    .store_map_mobile .map_box img { width: 100%; height: 100%; object-fit: cover; } 
    .filter_search_wrap { flex-direction: column; align-items: flex-start; gap: 20px; } 
    .input_group { width: 100%; flex-wrap:wrap;} 
}
</style>