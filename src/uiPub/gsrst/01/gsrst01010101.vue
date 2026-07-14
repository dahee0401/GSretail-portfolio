<template>
    <div class="wrap_gsrst">
        <!-- HEADER -->
        <header class="page_header top_visual" :style="{ backgroundImage: `url(${imgBg})` }">
            <div class="header_inner">
                <h2 class="header_title">{{ headerTitle }}</h2> <!-- 26.07.01 edit 정다희 : t.headerTitle -> headerTitle -->
            </div>
        </header>

        <!-- BODY -->
        <div class="cont_inner">
            <!-- Depth 1: 페이지 탭 (type_01: 하단 보더 언더라인) -->
            <Tabs :tab-items="depth1Tabs" tab-class="type_01" v-model="activeD1" :tab-slide="true" />

            <!-- Depth 2: 섹션 탭 (type_02: pill 스타일) -->
            <!-- 26.07.01 move 정다희 : GS THE FRESH 창업 알아보기(activeD1 === 0) 2depth 탭 → 창업 준비하기(activeD1 === 1) 이동 -->
            <Tabs v-show="activeD1 === 1" :tab-items="depth2Tabs" tab-class="type_02" v-model="activeD2" :tab-slide="true"/>
            <Tabs v-show="activeD1 === 3" :tab-items="consultDepth2Tabs" tab-class="type_02" v-model="activeConsultD2" :tab-slide="true" /> <!-- 26.07.01 edit 정다희 : activeD1 4===>3 수정 -->

            <!-- GS THE FRESH 창업 알아보기 (activeD1 === 0) -->
            <!-- 26.07.01 add 정다희 : GS THE FRESH 창업 알아보기 탭 이동 및 새로운 내용 추가 -->
            <div class="panel" v-show="activeD1 === 0">
                <section class="sec_hero" :style="{ backgroundImage: `url(${imgBg2})` }">
                    <header>
                        <div class="hero_title">
                            <h3>{{ t.brandIntro.title }}</h3>
                            <div>
                                <img src="@/assets/images/dummy/gsrst_fresh_logo.png" alt="gs the fresh">
                            </div>
                        </div>
                    </header>
                    <p class="hero_desc" v-html="t.brandIntro.desc"></p>
                    <ul class="action_list">
                        <li v-for="(item, i) in t.brandApplyLinks" :key="i">
                            <a href="#none" class="action_card btn_icon_arrow primary after" @click.prevent="goToConsultTab(item.consultD2)">
                                <strong v-html="item.title"></strong>
                                <span class="action_card_btn"><em>{{ item.btnLabel }}</em></span>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="sec_num_list">
                    <header class="section_header">
                        <h2 v-html="t.successPointPanel.title"></h2>
                        <p>{{ t.successPointPanel.desc }}</p>
                    </header>
                    <NumberedInfoList :items="t.successPointCards" :show-icon="true" desc-class="num_info_desc_light" />
                </section>
                <!-- <section class="sec_img_banner">
                    <div>
                        <picture class="image_wrap">
                            <source media="(max-width: 768px)" srcset="@/assets/images/dummy/mo/gsrst02010101_04_mo.png" />
                            <img src="@/assets/images/dummy/gsrst02010101_04.png" :alt="t.brandBannerImageAlt">
                        </picture>
                        <Buttons type="button" btn-class="btn_icon_arrow btn_big after primary" @click="setTab(1)">{{ t.brandMoreButton }}</Buttons>
                    </div>
                </section> -->
                <section class="sec_band">
                    <div class="inner">
                        <header class="section_header ac">
                            <h2 v-html="t.brandSolutionPanel.title"></h2>
                        </header>
                        <ul class="link_grid">
                            <li v-for="(item, i) in t.brandSolutionCards" :key="i">
                                <a href="#none" class="btn_icon_arrow primary after" @click.prevent="goToSolutionTab(item.d1, item.d2)">
                                    <span class="thumb" aria-hidden="true"></span>
                                    <span class="txt">
                                        <strong>{{ item.title }}</strong>
                                        <span class="desc" v-html="item.desc"></span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <!-- //26.07.01 add 정다희 : GS THE FRESH 창업 알아보기 탭 이동 및 새로운 내용 추가 -->

            <!-- 창업 절차 (activeD1 === 1, activeD2 === 0) -->
            <!-- 26.07.01 move 정다희 : GS THE FRESH 창업 알아보기(activeD1 === 0) → 창업 준비하기(activeD1 === 1) 이동 -->
            <div class="panel sec_procedure" v-show="activeD1 === 1 && activeD2 === 0">
                <Steps type="2" :items="procedureSteps" :cols="5" row-gap="100px" />
                <!-- 26.07.01 add 정다희 : 창업 절차 추가 : 창업 절차(activeD1 === 1 && activeD2 === 0) -->
                <section class="sec_precaution">
                    <header class="sub_header">
                        <h3>{{ t.precaution.subHeaderTitle }}</h3>
                    </header>
                    <h3 class="precaution_title mo_only" v-html="t.precaution.title"></h3>
                    <div class="sec_precaution_inner">
                        <aside class="precaution_intro">
                            <h3 class="pc_only" v-html="t.precaution.title"></h3>
                        </aside>
                        <div class="precaution_main">
                            <div class="precaution_block precaution_block_sm">
                                <h4>{{ t.precaution.blockTitle1 }}</h4>
                                <FeatureCards type="num" :items="precautionCards1" :no-swipe="true" />
                            </div>
                            <div class="precaution_block">
                                <h4>{{ t.precaution.blockTitle2 }}</h4>
                                <p v-if="t.precaution.blockTitle2Desc" class="block_desc">{{ t.precaution.blockTitle2Desc }}</p>
                                <FeatureCards type="num" :items="precautionCards2" :no-swipe="true" />
                            </div>
                        </div>
                    </div>
                    <ul class="list_caution">
                        <li v-for="(caution, cautionIndex) in t.precaution.cautions" :key="cautionIndex"><p>{{ caution }}</p></li>
                    </ul>
                </section>
                <!-- 26.07.01 add 정다희 : 버튼 이동 -->
                <div class="link_wrap">
                    <!-- 26.06.18 edit 정다희 : 버튼 클래스 수정 */ -->
                    <Buttons tag="a" :href="t.procedure.buttonHref" btn-class="btn_xl primary">{{ t.procedure.buttonLabel }}</Buttons>
                </div>
            </div>
            <!-- //26.07.01 move 정다희 : GS THE FRESH 창업 알아보기(activeD1 === 0) → 창업 준비하기(activeD1 === 1) 이동 -->

            <!-- 가맹 조건 안내 (activeD1 === 1, activeD2 === 1) -->
            <!-- 26.07.01 move 정다희 : GS THE FRESH 창업 알아보기(activeD1 === 0) → 창업 준비하기(activeD1 === 1) 이동 -->
            <div class="panel" v-show="activeD1 === 1 && activeD2 === 1">
                <!-- 260624 add 이소라 -->
                <header class="sub_header">
                    <h3>{{ t.franchise.title }}</h3>
                </header>
                
                <!-- Depth 3: 타입 탭 -->
                <div class="tab_d3_wrap">
                    <div class="inner">
                        <nav class="tab_type" role="tablist" :aria-label="t.franchise.tabAria">
                            <button
                                v-for="(tab, i) in depth3Tabs"
                                :key="i"
                                type="button"
                                role="tab"
                                :class="{ active: activeD3 === i }"
                                :aria-selected="activeD3 === i"
                                @click="activeD3 = i"
                            >{{ tab.item }}</button>
                        </nav>
                    </div>
                </div>
                <div class="tab_content_wrap">
                    <div v-for="(guide, guideIndex) in franchiseGuideTypes" :key="guide.tab" v-show="activeD3 === guideIndex" class="tab_content" role="tabpanel">
                        <!-- 26.07.01 add 정다희 : 각 타입별 종합안내 탭 추가 -->
                        <template v-if="guide.isCompare">
                            <div class="compare_scroll_area">
                                <div class="type_table_wrap is_compare">
                                    <table class="type_table">
                                        <colgroup>
                                            <col class="col_group" />
                                            <col class="col_group2" />
                                            <col class="col_label" />
                                            <col class="col_gs" />
                                            <col class="col_gs" />
                                            <col class="col_gs" />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th colspan="3" scope="colgroup">{{ t.franchise.compare.typeHeader }}</th>
                                                <td v-for="(typeItem, typeIndex) in t.franchise.compare.types" :key="typeIndex" scope="col" :class="typeItem.themeClass">
                                                    <strong>{{ typeItem.name }}</strong>
                                                    <span v-html="typeItem.desc"></span>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th rowspan="9" scope="rowgroup"><strong>{{ t.franchise.compare.investAmount }}</strong></th>
                                                <th rowspan="5" scope="rowgroup" class="th_vertical"><span class="th_vertical_txt">{{ t.franchise.compare.openInvest }}</span></th>
                                                <th scope="row">{{ t.franchise.compare.franchiseFee }}</th>
                                                <td colspan="3">{{ t.franchise.compare.amount1100 }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">{{ t.franchise.compare.initialProduct }}</th>
                                                <td colspan="3">{{ t.franchise.compare.amount7000 }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">{{ t.franchise.compare.supplies }}</th>
                                                <td colspan="3">{{ t.franchise.compare.amount700 }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">{{ t.franchise.compare.facilityDeposit }}</th>
                                                <td colspan="3">{{ t.franchise.compare.amount500 }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><strong class="txt_sm">{{ t.franchise.compare.openInvestTotal }}</strong></th>
                                                <td colspan="3"><strong class="txt_sm">{{ t.franchise.compare.amount9300 }}</strong></td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colspan="2">{{ t.franchise.compare.rentEntity }}</th>
                                                <td>{{ t.franchise.compare.headOffice }}</td>
                                                <td>{{ t.franchise.compare.headInvest }}</td>
                                                <td>{{ t.franchise.compare.owner }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colspan="2">{{ t.franchise.compare.facilityEntity }}</th>
                                                <td colspan="3">{{ t.franchise.compare.headOffice }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colspan="2">{{ t.franchise.compare.escrowDeposit }}</th>
                                                <td>
                                                    {{ t.franchise.compare.escrowGsf1Main }}<br />
                                                    <span class="td_sub">{{ t.franchise.compare.escrowGsf1Sub }}</span>
                                                </td>
                                                <td v-html="t.franchise.compare.escrowGsf2"></td>
                                                <td>{{ t.franchise.compare.none }}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" colspan="2"><strong>{{ t.franchise.compare.ownerInvestTotal }}</strong></th>
                                                <td><strong class="txt_point">{{ t.franchise.compare.totalGsf1 }}</strong></td>
                                                <td><strong class="txt_point">{{ t.franchise.compare.totalGsf2 }}</strong></td>
                                                <td><strong class="txt_point">{{ t.franchise.compare.totalGsf3 }}</strong></td>
                                            </tr>
                                            <tr>
                                                <th colspan="3" scope="row"><strong v-html="t.franchise.compare.royalty"></strong></th>
                                                <td>
                                                    <strong class="txt_rate">{{ t.franchise.compare.rateGsf1 }}</strong><br />
                                                    <span class="td_sub" v-html="t.franchise.compare.rateGsf1Sub"></span>
                                                </td>
                                                <td>
                                                    <strong class="txt_rate">{{ t.franchise.compare.rateGsf2 }}</strong><br />
                                                    <span class="td_sub" v-html="t.franchise.compare.rateGsf2Sub"></span>
                                                </td>
                                                <td><strong class="txt_rate">{{ t.franchise.compare.rateGsf3 }}</strong></td>
                                            </tr>
                                            <tr>
                                                <th colspan="3" scope="row"><strong v-html="t.franchise.compare.contractPeriod"></strong></th>
                                                <td colspan="2">{{ t.franchise.compare.periodGsf12 }}</td>
                                                <td>{{ t.franchise.compare.periodGsf3 }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="3" scope="row"><strong>{{ t.franchise.compare.collateral }}</strong></th>
                                                <td>{{ t.franchise.compare.none }}</td>
                                                <td>{{ t.franchise.compare.collateralGsf2 }}</td>
                                                <td>{{ t.franchise.compare.collateralGsf3 }}</td>
                                            </tr>
                                            <tr>
                                                <th colspan="3" scope="row"><strong v-html="t.franchise.compare.minIncomeSubsidy"></strong></th>
                                                <td colspan="2" v-html="t.franchise.compare.subsidyGsf12"></td>
                                                <td>{{ t.franchise.compare.subsidyGsf3 }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- 26.07.01 add 정다희 : 가맹타입 비교 테이블 가로 스크롤 안내 -->
                                <p class="franchise_compare_scroll_hint">{{ t.franchise.compare.scrollHint }}</p>
                                <!-- //26.07.01 add 정다희 : 가맹타입 비교 테이블 가로 스크롤 안내 -->
                            </div>
                            <ul class="list_caution">
                                <li v-for="(note, noteIndex) in t.franchise.compare.notes" :key="noteIndex">
                                    <p v-html="note"></p>
                                </li>
                            </ul>
                        </template>
                        <!-- //26.07.01 add 정다희 : 각 타입별 종합안내 -->
                        <template v-else> <!-- 26.07.01 add 정다희 : v-else 추가 -->
                            <p class="type_info_bar">{{ guide.infoBar }}</p>
                            <div class="type_table_wrap">
                                <table class="type_table">
                                    <colgroup>
                                        <col class="col_item_main" />
                                        <col class="col_item_main" />
                                        <col class="col_item_sub" />
                                        <col class="col_cost" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th colspan="3" scope="col">{{ t.franchise.tableHead.item }}</th>
                                            <th scope="col">{{ t.franchise.tableHead.cost }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, rowIndex) in guide.tableRows" :key="rowIndex" :class="{ is_gray: row.isGray }">
                                            <th v-if="row.main" :rowspan="row.mainRowspan" scope="rowgroup">{{ row.main }}</th>
                                            <th v-if="row.subMain" :rowspan="row.subMainRowspan" scope="rowgroup">{{ row.subMain }}</th>
                                            <th :colspan="row.subColspan || 1" :scope="row.scope || 'row'" v-html="row.sub"></th>
                                            <td v-html="row.cost"></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <ul v-if="guide.cautions?.length" class="list_caution">
                                    <li v-for="(caution, cautionIndex) in guide.cautions" :key="cautionIndex">
                                        <p v-html="caution.text"></p>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="guide.graph" class="type_graph_wrap">
                                <strong>{{ guide.graph.title }}</strong>
                                <ul class="type_graph_inner">
                                    <li v-for="(graphItem, graphIndex) in guide.graph.items" :key="graphIndex" class="type_graph_item">
                                        <p v-html="graphItem.label"></p>
                                        <picture>
                                            <source media="(max-width: 768px)" :srcset="graphItem.imgMo" />
                                            <img :src="graphItem.img" :alt="graphItem.alt" />
                                        </picture>
                                    </li>
                                </ul>
                            </div>
                            <ul v-if="guide.warning" class="list_caution">
                                <li><p class="txt_warning">{{ guide.warning }}</p></li>
                            </ul>
                        </template>
                    </div>
                </div>

            </div><!-- /panel activeD2 === 1 -->

            <!-- 창업 혜택 (activeD1 === 1, activeD2 === 2) -->
            <!-- 26.07.01 move 정다희 : 경영주 지원제도(activeD1 === 3) → 창업 준비하기 > 창업 혜택(activeD1 === 1, activeD2 === 2) 이동 -->
            <section class="sec_owner_support panel" v-show="activeD1 === 1 && activeD2 === 2">
                <header class="sub_header">
                    <h3 v-html="t.support.intro"></h3>
                </header>
                <figure class="brand_panel_bg">
                    <img :src="imgBg02" alt="" width="1420" height="340" />
                </figure>
                <header class="brand_panel_title">
                    <h2 v-html="t.support.panelTitle"></h2>
                    <p v-if="t.support.panelDesc" v-html="t.support.panelDesc"></p>
                </header>
                <FeatureCards type="num" :items="supportCards" :swiper-space-between="0" />
            </section>
            <!-- //26.07.01 move 정다희 : 경영주 지원제도(activeD1 === 3) → 창업 준비하기 > 창업 혜택(activeD1 === 1, activeD2 === 2) 이동 -->

            <!-- 추천 점포 찾기 (activeD1 === 2) -->
            <section class="sec_store panel" v-show="activeD1 === 2">
                <p class="tab_intro">{{ t.store.intro }}</p>
                <div class="store_search">
                    <!-- 지역 -->
                    <div class="search_group">
                        <span class="search_group_label">{{ t.store.regionLabel }}</span>
                        <div class="chip_list">
                            <button
                                type="button"
                                class="chip"
                                :class="{ active: filterRegion === '' }"
                                @click="filterRegion = ''"
                            >{{ t.store.allLabel }}</button>
                            <button
                                v-for="r in storeRegions"
                                :key="r.value"
                                type="button"
                                class="chip"
                                :class="{ active: filterRegion === r.value }"
                                @click="filterRegion = r.value"
                            >{{ r.label }}<template v-if="r.count != null"> {{ r.count }}</template></button>
                        </div>
                    </div>
                    <!-- 구분선 -->
                 
                    <!-- 하단 row -->
                    <div class="search_bottom_row">
                        <!-- 가맹타입 -->
                        <div class="search_group">
                            <span class="search_group_label">{{ t.store.franchiseTypeLabel }}</span>
                            <div class="chip_list">
                                <button
                                    v-for="typeItem in franchiseTypes"
                                    :key="typeItem.value"
                                    type="button"
                                    class="chip"
                                    :class="{ active: filterFranchiseType === typeItem.value }"
                                    @click="filterFranchiseType = filterFranchiseType === typeItem.value ? '' : typeItem.value"
                                >{{ typeItem.label }}</button>
                            </div>
                        </div>
                        <!-- 점포유형/청년창업 -->
                        <div class="search_group">
                            <span class="search_group_label">{{ t.store.storeTypeLabel }}</span>
                            <div class="chip_list">
                                <button
                                    v-for="option in storeTypeOptions"
                                    :key="option.value"
                                    type="button"
                                    class="chip"
                                    :class="{ active: filterStoreType === option.value }"
                                    @click="filterStoreType = filterStoreType === option.value ? '' : option.value"
                                >{{ option.label }}</button>
                                <span class="chip_sep_v"></span>
                                <span class="chip_youth_wrap">
                                    <button
                                        type="button"
                                        class="chip"
                                        :class="{ active: filterYouth }"
                                        @click="filterYouth = !filterYouth"
                                    >{{ t.store.youthLabel }}</button>
                                    <button
                                        type="button"
                                        class="youth_info_btn"
                                        @click.stop="youthPopoverVisible = !youthPopoverVisible"
                                        :aria-label="t.store.youthInfoAria"
                                    >?</button>
                                    <div
                                        v-if="youthPopoverVisible"
                                        class="layer_tooltip youth_popover"
                                        role="tooltip"
                                        @click.stop
                                    >   
                                        <strong>{{ t.store.youthPopoverTitle }}</strong>
                                        <p>{{ t.store.youthPopoverDesc }}</p>
                                        <a :href="t.store.youthPopoverHref">{{ t.store.youthPopoverLinkLabel }}</a>
                                        <button
                                            type="button"
                                            class="layer_tooltip_close"
                                            @click="youthPopoverVisible = false"
                                            :aria-label="t.store.closeAria"
                                        ></button>
                                    </div>
                                </span>
                            </div>
                        </div>
                        <!-- 검색 -->
                        <div class="search_group search_group_input">
                            <!-- 26.06.17 edit 정다희 : 웹접근성 대응 label for 적용 -->
                            <label class="search_group_label" for="storeSearchInput">{{ t.store.searchLabel }}</label>
                            <div class="store_search_input_wrap">
                                <input
                                    id="storeSearchInput"
                                    type="text"
                                    class="store_search_input"
                                    :placeholder="t.store.searchPlaceholder"
                                    v-model="storeSearchQuery"
                                />
                                <button type="button" class="store_search_btn" :aria-label="t.store.searchAria">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 필터 + 테이블 + 페이지네이션 -->
                <div class="store_list_wrap"> 
                    <!-- 상단 바: 총 개수 + 정렬/뷰 토글 -->
                    <div class="store_list_bar">
                        <span class="store_count">{{ t.store.countPrefix }} <strong>{{ storeList.length }} </strong>{{ t.store.countSuffix }}</span>
                        <div class="store_bar_right">
                            <div class="store_sort_group">
                                <button
                                    type="button"
                                    class="sort_btn"
                                    :class="{ active: storeSort === 'latest' }"
                                    @click="storeSort = 'latest'"
                                >{{ t.store.sortLatest }}</button>
                                <button
                                    type="button"
                                    class="sort_btn"
                                    :class="{ active: storeSort === 'cost' }"
                                    @click="storeSort = 'cost'"
                                >{{ t.store.sortCost }}</button>
                            </div>
                            <div class="store_view_group">
                                <button
                                    type="button"
                                    class="view_btn"
                                    :class="{ active: storeView === 'list' }"
                                    @click="storeView = 'list'"
                                    :aria-label="t.store.viewListAria"
                                >
                                </button>
                                <button
                                    type="button"
                                    class="view_btn"
                                    :class="{ active: storeView === 'grid' }"
                                    @click="storeView = 'grid'"
                                    :aria-label="t.store.viewGridAria"
                                >
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 테이블 뷰 -->
                    <div v-show="storeView === 'list'" class="type_table_wrap type2">
                        <table class="type_table">
                            <colgroup>
                                <col class="col_region"/>
                                <col class="col_type"/>
                                <col class="col_form"/>
                                <col class="col_cost"/>
                                <col class="col_tag"/>
                                <col class="col_area"/>
                                <col class="col_date"/>
                                <col class="col_detail"/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th v-for="header in t.store.tableHeaders" :key="header">{{ header }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="item in storeList" :key="item.id">
                                    <tr :class="{ is_open: openTableId === item.id }">
                                        <td>{{ item.region }}</td>
                                        <td>
                                            <span v-for="badge in item.type" :key="badge" class="type_badge" :class="getBadgeClass(badge)">{{ badge }}</span>
                                        </td>
                                        <td>{{ item.form }}</td>
                                        <td>{{ item.cost }}</td>
                                        <td class="td_tag">{{ item.tags }}</td>
                                        <td>{{ item.area }}</td>
                                        <td>{{ item.date }}</td>
                                        <td>
                                            <button
                                                type="button"
                                                class="detail_toggle_btn"
                                                @click="openTableId = openTableId === item.id ? null : item.id"
                                            >
                                                {{ openTableId === item.id ? t.store.detailCloseLabel : t.store.detailOpenLabel }}
                                            </button>
                                        </td>
                                    </tr>
                                    <!-- 상세 패널 -->
                                    <tr v-if="openTableId === item.id" class="detail_panel_row">
                                        <td colspan="8" class="detail_panel_td">
                                            <div class="detail_panel">
                                                <StoreCardDetail :item="item" />
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>

                    <!-- 모바일 아코디언 뷰 (목록형) -->
                    <div class="store_accordion_list" v-show="storeView === 'list'">
                        <Accordion class="store_acc">
                            <AccordionItem
                                v-for="item in storeList"
                                :key="item.id"
                                :item-key="item.id"
                            >
                                <template #title>
                                    <div class="accordion_head_info">
                                        <p class="accordion_region">{{ item.region }}</p>
                                        <div class="accordion_badges">
                                            <span v-for="badge in item.type" :key="badge" class="type_badge" :class="getBadgeClass(badge)">{{ badge }}</span>
                                            <span class="type_badge badge_gray">{{ item.form }}</span>
                                            <span v-if="item.isYouth" class="type_badge badge_gray">{{ t.store.youthShortLabel }}</span>
                                        </div>
                                    </div>
                                </template>
                                <StoreCardDetail :item="item" />
                            </AccordionItem>
                        </Accordion>
                    </div>

                    <!-- 카드 그리드 뷰 -->
                    <div v-show="storeView === 'grid'" class="store_card_grid_wrap">
                        <template v-for="(row, rowIdx) in storeCardRows" :key="rowIdx">
                            <ul class="store_card_row">
                                <li
                                    v-for="item in row"
                                    :key="item.id"
                                >
                                    <StoreCard
                                        :item="item"
                                        :is-open="openCardId === item.id"
                                        @toggle="toggleCard(item.id)"
                                    />
                                </li>
                            </ul>
                            <!-- 해당 행에 열린 카드가 있으면 detail 패널 표시 -->
                            <div
                                v-if="openCardId && row.some(c => c.id === openCardId)"
                                class="store_card_detail_row"
                            >
                                <StoreCardDetail :item="storeList.find(c => c.id === openCardId)" />
                            </div>
                        </template>
                    </div>

                    <!-- 페이지네이션 -->
                    <div class="store_pagination">
                        <Pagination v-model="storePage" :total-pages="storeTotalPages" :visible-pages="5" />
                    </div>
                </div>
            </section>

            <!-- 26.07.01 add 정다희 : 탭 추가 : 창업설명회(activeD1 === 3, activeConsultD2 === 0) -->
            <section class="sec_seminar panel" v-show="activeD1 === 3 && activeConsultD2 === 0">
                <div class="seminar_head">
                    <p v-html="t.seminar.headDesc"></p>
                    <Buttons btn-class="btn_big fill primary btn_icon_arrow after" data-popid="gsrst010201" data-type="lg" data-cont="gsrst010201" @click.prevent="openModal">{{ t.seminar.applyButtonLabel }}</Buttons>
                </div>
                <ul class="seminar_list">
                    <li v-for="(item, i) in seminarList" :key="i" class="seminar_item">
                        <div class="seminar_item_body">
                            <div class="seminar_map"></div>
                            <div class="seminar_info">
                                <table class="type_table seminar_table">
                                    <colgroup>
                                        <col class="seminar_col_label" />
                                        <col class="seminar_col_value" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th colspan="2" scope="col">{{ item.title }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, ri) in item.rows" :key="ri">
                                            <template v-if="isMobile && ri === 3">
                                                <td colspan="2">
                                                    <ul class="schedule_list">
                                                        <li
                                                            v-for="(list, idx) in row.value"
                                                            :key="idx"
                                                            :class="{ disabled: list.state === 'false' }"
                                                        >
                                                            <span>{{ list.date }} {{ list.time }}</span>
                                                            <button>{{ list.btnTxt }}</button>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </template>

                                            <template v-else>
                                                <td scope="row">{{ row.label }}</td>
                                                <td>
                                                    <template v-if="Array.isArray(row.value)">
                                                        <ul class="schedule_list">
                                                            <li
                                                                v-for="(list, idx) in row.value"
                                                                :key="idx"
                                                                :class="{ disabled: list.state === 'false' }"
                                                            >
                                                                <span>{{ list.date }} {{ list.time }}</span>
                                                                <button>{{ list.btnTxt }}</button>
                                                            </li>
                                                        </ul>
                                                    </template>

                                                    <span v-else>
                                                        {{ row.value }}
                                                    </span>
                                                </td>
                                            </template>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </li>
                </ul>

                <!-- 26.06.09 Add 이종환 : 설명회 신청 -->
                <div class="seminar_region_pick" :aria-label="t.consultFormTexts.regionSelectAria">
                    <div ref="seminarWrapRef" class="seminar_wrap">
                        <article class="manager_card type_02" :aria-label="t.consultFormTexts.managerInfoAria">
                            <div class="manager_header">
                                <p>{{ t.consultFormTexts.selectedSeminarLabel }}</p>
                                <strong>{{ t.consultFormTexts.selectedSeminarValue }}</strong>
                            </div>
                            <button type="button" class="btn_close" :aria-label="t.consultFormTexts.closeButton">{{ t.consultFormTexts.closeButton }}</button>
                        </article>
                        <div class="consent_box" :aria-label="t.consultFormTexts.privacyConsentTitle">
                            <h3>{{ t.consultFormTexts.privacyConsentTitle }}</h3>
                            <ul v-if="seminarConsentItems.length" class="consent_list">
                                <li v-for="(item, idx) in seminarConsentItems" :key="idx">
                                    <p v-html="item"></p>
                                </li>
                            </ul>

                            <div class="consent_notice_area">
                                <p>{{ t.consultFormTexts.seminarConsentNotice }}</p>
                                <div class="consent_radio">
                                    <Inputs type="checkbox" v-model="startupConsentAgreed" :text="t.consultFormTexts.agreeText" />
                                </div>
                            </div>
                        </div>
                        <div class="apply_form">
                            <div class="form_body">
                                <div class="form_row col_02">
                                    <div class="col_item">
                                        <div class="form_label">{{ t.consultFormTexts.nameLabel }} <span class="form_required">{{ t.consultFormTexts.requiredInput }}</span></div>
                                        <div class="form_field">
                                            <Inputs type="text" v-model="startupConsultForm.name" />
                                        </div>
                                    </div>
                                    <div class="col_item">
                                        <div class="form_label">{{ t.consultFormTexts.contactLabel }} <span class="form_required">{{ t.consultFormTexts.requiredInput }}</span></div>
                                        <!-- 26.06.09 Edit 이종환 : 전화번호 입력 폼 변경에 따른 클래스 제거 및 입력폼 수정 -->
                                        <div class="form_field">
                                            <Inputs type="text" v-model="startupConsultForm.phone2" />
                                            <!-- <SelectBox :options="phoneOptions" v-model="startupConsultForm.phone1" />
                                            <span class="form_sep">-</span>
                                            <Inputs type="text" v-model="startupConsultForm.phone2" />
                                            <span class="form_sep">-</span>
                                            <Inputs type="text" v-model="startupConsultForm.phone3" /> -->
                                        </div>
                                        <!-- //26.06.09 Edit 이종환 : 전화번호 입력 폼 변경에 따른 클래스 제거 및 입력폼 수정 -->
                                    </div>
                                
                                </div> 
                                <div class="form_row">
                                    <div class="form_label">{{ t.consultFormTexts.birthLabel }} <span class="form_required">{{ t.consultFormTexts.requiredInput }}</span></div>
                                    <div class="form_field form_field_birth">
                                        <SelectBox :options="startupBirthYearOptions" v-model="startupConsultForm.birthYear" :initMsg="t.consultFormTexts.yearInit" />
                                        <SelectBox :options="startupBirthMonthOptions" v-model="startupConsultForm.birthMonth" :initMsg="t.consultFormTexts.monthInit" />
                                        <SelectBox :options="startupBirthDayOptions" v-model="startupConsultForm.birthDay" :initMsg="t.consultFormTexts.dayInit" />
                                    </div>
                                </div>
                                <!-- 투자가능금액 / 기대소득 -->
                                <div class="form_row col_02">
                                    <div class="col_item">
                                        <div class="form_label">{{ t.consultFormTexts.investAmountLabel }}</div>
                                        <SelectBox />
                                    </div>                   
                                    <div class="col_item">
                                        <div class="form_label">{{ t.consultFormTexts.price01 }}</div>
                                        <SelectBox />
                                    </div>             
                                </div>
                                <!-- //투자가능금액 / 기대소득 -->
                                <div class="form_row col_02">
                                    <div class="col_item">
                                        <div class="form_label">{{ t.consultFormTexts.storeOwnershipLabel }} <span class="form_required">{{ t.consultFormTexts.requiredInput }}</span></div>
                                        <div class="form_field form_field_radio">
                                            <Inputs
                                                v-for="opt in startupStoreOwnershipOptions"
                                                :key="opt.value"
                                                type="radio"
                                                name="startup_store_ownership"
                                                :value="opt.value"
                                                v-model="startupConsultForm.storeOwnership"
                                                :text="opt.label"
                                            />
                                        </div>
                                    </div>
                                    <div class="col_item">
                                        <div class="form_label">{{ t.consultFormTexts.openScheduleLabel }}</div>
                                        <div class="form_field form_field_open">
                                            <SelectBox />
                                            <SelectBox />
                                        </div>
                                    </div>
                                
                                </div>
                                <!-- 관심지역 -->
                                <div class="form_row">
                                    <div class="form_label">{{ t.consultFormTexts.localLabel }}
                                        <span class="form_required">{{ t.consultFormTexts.requiredInput }}</span>
                                        <span class="explain">{{ t.consultFormTexts.localLabel_explain }}</span>
                                    </div>
                                    <div class="form_field form_field_open">
                                        <SelectBox />
                                        <SelectBox />
                                    </div>
                                </div>
                                <!-- //관심지역 -->
                                <div class="form_row form_row_radio">
                                    <div class="form_label">{{ t.consultFormTexts.cvsExperienceLabel }}</div>
                                    <div class="form_field form_field_radio form_field_checkbox_card">
                                        <Inputs
                                            v-for="opt in startupCvsExperienceOptions"
                                            :key="opt.value"
                                            class="checkbox_card"
                                            type="checkbox"
                                            name="startup_cvs_experience"
                                            :value="opt.value"
                                            v-model="startupConsultForm.cvsExperience"
                                            :text="opt.label"
                                        />
                                    </div>
                                </div>
                                <div class="form_row form_row_textarea">
                                    <div class="form_label">{{ t.consultFormTexts.inquiryLabel }}</div>
                                    <div class="form_field">
                                        <Textarea
                                            v-model="startupConsultForm.inquiry"
                                            :placeholder="t.consultFormTexts.startupInquiryPlaceholder"
                                            :rows="6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="button_area">
                                <Buttons btn-class="btn_xl primary">{{ t.consultFormTexts.reserveButton }}</Buttons>
                            </div>
                        </div>
                    </div> 
                </div>
                <!-- //26.06.09 Add 이종환 : 설명회 신청 -->
            </section>

            <!-- 26.07. -->

            <!-- 상담 및 신청 > 창업 상담 신청 -->
            <!-- 26.07.01 add 정다희 :activeConsultD2 수정 : 창업 상담 신청(activeD1 === 3, activeConsultD2 === 1) -->
            <section class="sec_consult panel" v-show="activeD1 === 3 && activeConsultD2 === 1 && !showConsultApplyPage">
                <header class="brand_panel_title flex">
                    <div>
                        <h2 v-html="t.consult.panelTitle"></h2>
                        <p v-if="t.consult.panelDesc" v-html="t.consult.panelDesc"></p>
                        <ul class="caution_list consult_caution_pc">
                            <li v-for="(item, index) in t.consult.caution" :key="`consult-caution-pc-${index}`">
                                <p>{{ item }}</p>
                            </li>
                        </ul>
                    </div>
                    <!-- 26.06.18 edit 정다희 : 버튼 클래스 수정 */ -->
                    <Buttons btn-class="btn_icon_arrow fill btn_xl primary after" :href="t.consult.locationConsultHref" target="_blank">{{ t.consult.proposalButtonLabel }}</Buttons>
                </header>
                <ul class="caution_list consult_caution_mo">
                    <li v-for="(item, index) in t.consult.caution" :key="`consult-caution-mo-${index}`">
                        <p>{{ item }}</p>
                    </li>
                </ul>
                <ul class="consult_card_list">
                    <li v-for="(card, i) in consultCards" :key="i" class="consult_card">
                        <div class="consult_body">
                            <div class="label_wrap">
                                <p class="consult_label">{{ t.consult.label }}</p>
                                <p class="consult_label">{{ card.name }}</p>
                            </div>
                            <p class="consult_label region">{{ card.region }}</p>
                            <div class="consult_tel_wrap">
                                <button
                                    type="button"
                                    class="consult_tel_btn"
                                    @click.stop="toggleTooltip(i)"
                                >{{ t.consult.telButtonLabel }}</button>

                                <div
                                    v-if="activeCardIndex === i"
                                    class="layer_tooltip consult_tel"
                                    role="tooltip"
                                    @click.stop
                                >   
                                    <strong class="consult_tel_title">{{ t.consult.tooltipTitle }}</strong>
                                    <div class="consult_tel_content">
                                        <p class="consult_tel_phone">
                                            {{ t.consult.phoneLabel }}<br />
                                            {{ card.tel }}
                                        </p>
                                        <p class="consult_tel_kakao">{{ t.consult.kakaoLabel }}</p>
                                        <figure class="consult_tel_qr">
                                            <span>{{ t.consult.qrImageLabel }}</span>
                                        </figure>
                                        <p class="consult_tel_notice">{{ t.consult.kakaoNotice }}</p>
                                    </div>
                                    <button
                                        type="button"
                                        class="layer_tooltip_close"
                                        @click="activeCardIndex = null"
                                        :aria-label="t.consult.closeAria"
                                    ></button>
                                </div>
                            </div>
                            <p class="consult_note">{{ card.note }}</p>
                        </div>
                        <div class="consult_foot">
                            <Buttons btn-class="btn_big border btn_icon_arrow after" @click.prevent="showConsultApplyPage = true">{{ t.consult.applyButtonLabel }}</Buttons>
                        </div>
                    </li>
                </ul>

                <div class="info_banner">
                    <p>{{ t.consult.infoBannerText }}</p>
                    <Buttons btn-class="btn_mid border btn_icon_arrow after">{{ t.consult.infoBannerButtonLabel }}</Buttons>
                </div>
            </section>

            <!-- 상담 및 신청 > 입지제안 상담 -->
            <!-- 26.07.01 add 정다희 :activeConsultD2 수정 : 입지제안 상담(activeD1 === 3, activeConsultD2 === 2) -->
            <section class="sec_consult panel" v-show="activeD1 === 3 && activeConsultD2 === 2 && !showConsultApplyPage">
                <div class="consult_box">
                    <div class="consult_intro">
                        <div class="consult_intro_txt">
                            <h3 v-html="t.proposalConsultBox.title"></h3>
                            <p v-html="t.proposalConsultBox.desc"></p>
                            <ul class="caution_list">
                                <li v-for="(item, index) in t.proposalConsultBox.caution" :key="`consult-caution-box-${index}`">
                                    <p>{{ item }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="form_row">
                    <div class="form_label">{{ t.proposalForm.regionLabel }}<span class="form_required">*</span></div>
                    <div class="form_field form_field_region">
                        <SelectBox :options="sidoOptions" v-model="consultForm.openRegionSido" :initMsg="t.proposalForm.sidoInitMsg" @update:modelValue="consultForm.openRegionSigungu = ''" />
                        <SelectBox :options="openSigunguOptions" v-model="consultForm.openRegionSigungu" :initMsg="t.proposalForm.sigunguInitMsg" :disabled="!consultForm.openRegionSido" />
                    </div>
                </div>
                <ConsentInfoBox :title="t.consent2.title" :items="t.consent2.items" :notice-html="t.consent2.noticeHtml" />
                <!-- 고객정보 폼 -->
                <!-- 26.06.18 edit 정다희 : col_layout 클래스 추가 */ -->
                <div class="apply_form col_layout">
                    <div class="form_head">
                        <h3 class="form_head_title">{{ t.proposalCustomerForm.title }}</h3>
                        <span class="form_required_note">{{ t.requiredNote }}</span>
                    </div>
                    <div class="form_body">
                        <div class="form_row form_row_name">
                            <div class="form_label">{{ t.proposalCustomerForm.nameLabel }}<span class="form_required">*</span></div>
                            <div class="form_field">
                                <Inputs type="text" v-model="consultForm.name" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.proposalCustomerForm.emailLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_email">
                                <Inputs type="text" v-model="consultForm.emailId" />
                                <span class="form_sep">@</span>
                                <Inputs v-if="consultForm.emailDomain === ''" type="text" v-model="consultForm.emailDomainCustom" :placeholder="t.proposalCustomerForm.emailPlaceholder" />
                                <Inputs v-else type="text" :model-value="consultForm.emailDomain" :is-readonly="true" />
                                <SelectBox :options="emailDomainOptions" v-model="consultForm.emailDomain" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.proposalCustomerForm.phoneLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_phone">
                                <SelectBox :options="phoneOptions" v-model="consultForm.phone1" />
                                <span class="form_sep">-</span>
                                <Inputs type="text" v-model="consultForm.phone2" />
                                <span class="form_sep">-</span>
                                <Inputs type="text" v-model="consultForm.phone3" />
                            </div>
                        </div>
                        <div class="form_row form_row_address">
                            <div class="form_label">{{ t.proposalCustomerForm.storeAddressLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_address">
                                <div class="form_zip_row">
                                    <Inputs type="text" v-model="consultForm.proposalZipCode" />
                                    <Buttons type="button" btn-class="btn_big border" @click.prevent="onProposalZipSearch">{{ t.proposalCustomerForm.zipButtonLabel }}</Buttons>
                                </div>
                            </div>
                        </div>
                        <div class="form_row form_row_area">
                            <!-- 26.06.18 edit 정다희 : area_label 클래스 추가 */ -->
                            <div class="form_label area_label">{{ t.proposalCustomerForm.storeAreaLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_area">
                                <div class="form_sub_group">
                                    <span class="form_sub_label">{{ t.proposalCustomerForm.contractAreaLabel }}</span>
                                    <div class="form_sub_input_wrap">
                                        <Inputs type="text" v-model="consultForm.proposalAreaContract" />
                                        <span class="form_sub_unit">{{ t.proposalCustomerForm.areaUnit }}</span>
                                    </div>
                                </div>
                                <div class="form_sub_group">
                                    <span class="form_sub_label">{{ t.proposalCustomerForm.exclusiveAreaLabel }}</span>
                                    <div class="form_sub_input_wrap">
                                        <Inputs type="text" v-model="consultForm.proposalAreaExclusive" />
                                        <span class="form_sub_unit">{{ t.proposalCustomerForm.areaUnit }}</span>
                                        <span class="area_note">{{ t.proposalCustomerForm.areaNote }}</span>
                                        <p class="form_field_note" v-html="t.proposalCustomerForm.addressNote"></p>
                                    </div>
                                </div>
                             
                                <p class="form_field_note">{{ t.proposalCustomerForm.legalNotice }}</p>
                                 
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.proposalCustomerForm.storeNameLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_store">
                                <Inputs type="text" v-model="consultForm.proposalStoreName" />
                            </div>
                        </div>
                        <div class="form_row form_row_textarea">
                            <div class="form_label">{{ t.proposalCustomerForm.commercialFeatureLabel }}<span class="form_required">*</span></div>
                            <div class="form_field">
                                <Textarea v-model="consultForm.proposalCommercialFeature" name="proposal_commercial_feature" :placeholder="t.proposalCustomerForm.commercialFeaturePlaceholder" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.proposalCustomerForm.ownerRelationLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_store">
                                <Inputs type="text" v-model="consultForm.proposalOwnerRelation" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button_wrap">
                    <Buttons btn-class="btn_big primary">{{ t.consultForm.submitLabel }}</Buttons>
                    <Buttons btn-class="btn_big gary">{{ t.consultForm.resetLabel }}</Buttons>
                </div>
            </section>

            <!-- 26.07.01 add 정다희 :activeConsultD2 수정 : 창업 상담 신청(activeD1 === 3, activeConsultD2 === 1) -->
            <section class="sec_consult_apply panel" v-show="activeD1 === 3 && activeConsultD2 === 1 && showConsultApplyPage">
                <!-- 컨설턴트와 1:1 상담 -->
                <div class="consult_box consult_box_apply">
                    <div class="consult_selector_wrap">
                        <SelectBox :options="[t.consultBox.consultantName]" v-model="consultForm.consultantName" :initMsg="t.consultBox.consultantName" />
                    </div>
                    <div class="consult_intro">
                        <div class="consult_head">
                            <div class="consult_img_wrap"></div>
                            <!-- 26.06.18 add 정다희 : div.consult_intro_txt pc_only / mo_only 구조 추가 */ -->
                            <div class="consult_intro_txt pc_only">
                                <h3 v-html="t.consultBox.title"></h3>
                                <p v-html="t.consultBox.desc"></p>
                            </div>
                            <h3 class="mo_only" v-html="t.consultBox.title"></h3>
                        </div>
                        <p class="mo_only" v-html="t.consultBox.desc"></p>
                        <!-- //26.06.18 add 정다희 : div.consult_intro_txt pc_only / mo_only 구조 추가 */ -->
                    </div>
                </div>
                <!-- 점포 소유 여부 선택 -->
                <div class="middle_bts_wrap">
                    <button :class="{ active: hasStore === true }" @click="hasStore = true">{{ t.storeButtons.hasStore }}</button>
                    <button :class="{ active: hasStore === false }" @click="hasStore = false">{{ t.storeButtons.noStore }}</button>
                </div>
                <!-- 개인정보 동의 -->
                <ConsentInfoBox :title="t.consent.title" :items="t.consent.items" :notice-html="t.consent.noticeHtml" />
                <!-- 고객정보 폼 -->
                <!-- 26.06.18 edit 정다희 : col_layout 클래스 추가 */ -->
                <div class="apply_form col_layout">
                    <div class="form_head">
                        <h3 class="form_head_title">{{ t.customerForm.title }}</h3>
                        <span class="form_required_note">{{ t.requiredNote }}</span>
                    </div>
                    <div class="form_body">
                        <div class="form_row form_row_name">
                            <div class="form_label">{{ t.customerForm.nameLabel }}<span class="form_required">*</span></div>
                            <div class="form_field">
                                <Inputs type="text" v-model="consultForm.name" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.customerForm.emailLabel }}</div>
                            <div class="form_field form_field_email">
                                <Inputs type="text" v-model="consultForm.emailId" />
                                <span class="form_sep">@</span>
                                <Inputs v-if="consultForm.emailDomain === ''" type="text" v-model="consultForm.emailDomainCustom" :placeholder="t.customerForm.emailPlaceholder" />
                                <Inputs v-else type="text" :model-value="consultForm.emailDomain" :is-readonly="true" />
                                <SelectBox :options="emailDomainOptions" v-model="consultForm.emailDomain" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.customerForm.phoneLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_phone">
                                <SelectBox :options="phoneOptions" v-model="consultForm.phone1" />
                                <span class="form_sep">-</span>
                                <Inputs type="text" v-model="consultForm.phone2" />
                                <span class="form_sep">-</span>
                                <Inputs type="text" v-model="consultForm.phone3" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label" v-html="t.customerForm.addressLabel"></div>
                            <div class="form_field form_field_region">
                                <SelectBox :options="sidoOptions" v-model="consultForm.regionSido" :initMsg="t.customerForm.sidoInitMsg" @update:modelValue="consultForm.regionSigungu = ''" />
                                <SelectBox :options="sigunguOptions" v-model="consultForm.regionSigungu" :initMsg="t.customerForm.sigunguInitMsg" :disabled="!consultForm.regionSido" />
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 상담내용 폼 (점포 소유 시에만 표시) -->
                <!-- 26.06.18 edit 정다희 : col_layout 클래스 추가 */ -->
                <div class="apply_form col_layout" v-show="hasStore === true">
                    <div class="form_head">
                        <h3 class="form_head_title">{{ t.consultForm.title }}</h3>
                        <span class="form_required_note">{{ t.requiredNote }}</span>
                    </div>
                    <div class="form_body">
                        <div class="form_row form_row_area">
                            <!-- 26.06.18 edit 정다희 : area_label클래스 추가 */ -->
                            <div class="form_label area_label">{{ t.consultForm.areaLabel }}</div>
                            <div class="form_field form_field_area">
                                <div class="form_sub_group">
                                    <span class="form_sub_label">{{ t.consultForm.contractAreaLabel }}</span>
                                    <div class="form_sub_input_wrap">
                                        <Inputs type="text" v-model="consultForm.areaContract" />
                                        <span class="form_sub_unit">{{ t.consultForm.areaUnit }}</span>
                                    </div>
                                </div>
                                <div class="form_sub_group">
                                    <span class="form_sub_label">{{ t.consultForm.exclusiveAreaLabel }}</span>
                                    <div class="form_sub_input_wrap">
                                        <Inputs type="text" v-model="consultForm.areaExclusive" />
                                        <span class="form_sub_unit">{{ t.consultForm.areaUnit }}</span>
                                    </div>
                                </div>
                                <span class="area_note">{{ t.consultForm.areaNote }}</span>
                            </div>
                        </div>
                        <div class="form_row check_row">
                            <!-- 26.06.18 edit 정다희 : area_label 클래스 추가 */ -->
                            <div class="form_label area_label">{{ t.consultForm.superOperatorLabel }}</div>
                            <div class="form_field form_field_check">
                                <div class="form_sub_group">
                                    <span class="form_sub_label">{{ t.consultForm.itemCheckLabel }}</span>
                                    <div class="check_list">
                                        <Inputs v-for="opt in superItemOptions" :key="opt.value" type="checkbox" :value="opt.value" v-model="consultForm.superItems" :text="opt.label" />
                                    </div>
                                </div>
                                <div class="check_etc">
                                    <span class="form_sub_label">{{ t.consultForm.etcLabel }}</span>
                                    <Inputs type="text" v-model="consultForm.superItemEtc" />
                                </div>
                            </div>
                        </div>
                        <div class="form_row contract_row">
                            <!-- 26.06.18 edit 정다희 : area_label 클래스 추가 */ -->
                            <div class="form_label area_label">{{ t.consultForm.contractLabel }}</div>
                            <div class="form_field form_field_contract">
                                <div class="form_sub_group">
                                    <span class="form_sub_label">{{ t.consultForm.contractPeriodLabel }}</span>
                                    <div class="form_sub_inputs">
                                        <Inputs type="text" v-model="consultForm.contractStart" />
                                        <span class="form_sep">~</span>
                                        <Inputs type="text" v-model="consultForm.contractEnd" />
                                    </div>
                                </div>
                                <div class="form_sub_group">
                                    <span class="form_sub_label">{{ t.consultForm.depositRentLabel }}</span>
                                    <div class="contract_rent">
                                        <div class="form_sub_input_wrap">
                                            <Inputs type="text" v-model="consultForm.deposit" />
                                            <span class="form_sub_unit">{{ t.consultForm.rentUnit }}</span>
                                        </div>
                                        <div class="form_sub_input_wrap">
                                            <Inputs type="text" v-model="consultForm.monthlyRent" />
                                            <span class="form_sub_unit">{{ t.consultForm.rentUnit }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 26.06.18 edit 정다희 : col_layout 클래스 추가 */ -->
                <div class="apply_form col_layout" v-show="hasStore === false">
                    <div class="form_head">
                        <h3 class="form_head_title">{{ t.consultFormNoStore.title }}</h3>
                        <span class="form_required_note">{{ t.requiredNote }}</span>
                    </div>
                    <div class="form_body">
                        <div class="form_row">
                            <div class="form_label">{{ t.consultFormNoStore.investmentLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_select_220">
                                <SelectBox :options="t.consultFormNoStore.investmentOptions" v-model="consultForm.investmentAmount" :initMsg="t.consultFormNoStore.investmentInitMsg" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.consultFormNoStore.incomeLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_select_220">
                                <SelectBox :options="t.consultFormNoStore.incomeOptions" v-model="consultForm.expectedIncome" :initMsg="t.consultFormNoStore.incomeInitMsg" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.consultFormNoStore.openRegionLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_region">
                                <SelectBox :options="sidoOptions" v-model="consultForm.openRegionSido" :initMsg="t.customerForm.sidoInitMsg" @update:modelValue="consultForm.openRegionSigungu = ''" />
                                <SelectBox :options="openSigunguOptions" v-model="consultForm.openRegionSigungu" :initMsg="t.customerForm.sigunguInitMsg" :disabled="!consultForm.openRegionSido" />
                            </div>
                        </div>
                        <!-- 26.06.02 edit 정다희 : 추가 -->
                        <div class="form_row">
                            <div class="form_label">{{ t.consultFormNoStore.superExperienceLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_radio form_field_checkbox_card">
                                <Inputs
                                    v-for="opt in superExperienceOptions"
                                    :key="opt.value"
                                    class="checkbox_card"
                                    type="checkbox"
                                    name="super_experience"
                                    :value="opt.value"
                                    v-model="consultForm.superExperience"
                                    :text="opt.label"
                                />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.consultFormNoStore.openTimeLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_region">
                                <SelectBox :options="t.consultFormNoStore.openYearOptions" v-model="consultForm.openYear" :initMsg="t.consultFormNoStore.openYearInitMsg" />
                                <SelectBox :options="t.consultFormNoStore.openMonthOptions" v-model="consultForm.openMonth" :initMsg="t.consultFormNoStore.openMonthInitMsg" />
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.consultFormNoStore.typeLabel }}<span class="form_required">*</span></div>
                            <div class="form_field form_field_franchise">
                                <div class="franchise_type_item" v-for="opt in t.consultFormNoStore.franchiseTypeOptions" :key="opt.value">
                                    <Inputs type="radio" :name="'franchiseType'" :value="opt.value" v-model="consultForm.franchiseType" :text="opt.label" />
                                    <Buttons btn-class="btn_mid border" data-popid="gsrst01010101_view" data-type="lg" data-cont="gsrst01010101_view" @click.prevent="openModal">{{ t.consultFormNoStore.viewLabel }}</Buttons>
                                </div>
                            </div>
                        </div>
                        <div class="form_row">
                            <div class="form_label">{{ t.consultFormNoStore.inquiryLabel }}<span class="form_required">*</span></div>
                            <div class="form_field">
                                <textarea v-model="consultForm.inquiry" :placeholder="t.consultFormNoStore.inquiryPlaceholder"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 하단 버튼 -->
                <div class="button_wrap">
                    <Buttons btn-class="btn_big primary">{{ t.consultForm.submitLabel }}</Buttons>
                    <Buttons btn-class="btn_big gary">{{ t.consultForm.resetLabel }}</Buttons>
                </div>
            </section>
            
        </div>
        
        <!-- 26.06.01 Del 이종환 : 공통처리로 footer로 이동 <ul
            ref="quickMenuRef"
            class="quick_menu"
            :class="{ is_visible: showQuickMenu }"
            :aria-hidden="!showQuickMenu"
        >
            <li><button type="button">창업안내</button></li>
            <li><button type="button">입점상담</button></li>
            <li><button type="button">고객센터</button></li>
        </ul> -->
    </div>

    <!-- modal_wrap · 사업설명회 신청 -->
    <div id="gsrst010201" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
    <!-- //modal_wrap -->
    <div id="gsrst01010101_view" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, watch, onMounted, onUnmounted, nextTick } from "vue";
import Tabs from "@/components/Tabs.vue";
import Pagination from "@/components/Pagination.vue";
import Steps from "@/components/Steps.vue";
import FeatureCards from "@/components/FeatureCards.vue";
import Buttons from "@/components/Buttons.vue";
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue";
import ConsentInfoBox from "@/components/ConsentInfoBox.vue";
import Textarea from "@/components/Textarea.vue";
import StoreCard from "@/components/StoreCard.vue";
import StoreCardDetail from "@/components/StoreCardDetail.vue";
import Accordion from "@/components/Accordion.vue";
import AccordionItem from "@/components/AccordionItem.vue";
import NumberedInfoList from "@/components/NumberedInfoList.vue"; /** 26.07.01 add 정다희 : 번호 리스트 컴포넌트 추가 */
import modal from "@/assets/js/modal";
import imgBg from "@/assets/images/dummy/gsrst01010101_bg.png";
import imgBg2 from "@/assets/images/dummy/gsrst02010101_02.jpg"; /** 26.07.01 add 정다희 : 이미지 추가 */
import imgBg02 from "@/assets/images/dummy/gsrst01010101_bg_02.png";
import imgGph01 from "@/assets/images/dummy/gsrst01010101_gph_01.png";
import imgGph01Mo from "@/assets/images/dummy/mo/gsrst01010101_gph_01_mo.png";
import imgGph02 from "@/assets/images/dummy/gsrst01010101_gph_02.png";
import imgGph02Mo from "@/assets/images/dummy/mo/gsrst01010101_gph_02_mo.png";
import imgGph03 from "@/assets/images/dummy/gsrst01010101_gph_03.png";
import imgGph03Mo from "@/assets/images/dummy/mo/gsrst01010101_gph_03_mo.png";
import imgGph04 from "@/assets/images/dummy/gsrst01010101_gph_04.png";
import imgGph04Mo from "@/assets/images/dummy/mo/gsrst01010101_gph_04_mo.png";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

/* 26.06.09 Add 이종환 사업설명회 신청 관련 */
const seminarConsentItems =[
    "- 입력하신 정보는 창업상담을 위해서만 사용합니다.",
    "- 수집하는 개인정보 항목: 이름, 이메일, 휴대폰번호, 자택주소(시, 구/군)",
    "- 수집 및 목적: 본인 식별 및 문의사항 확인 및 답변",
    "- 보유 및 이용기간: 접수 후 1년",
]
const startupStoreOwnershipOptions = [
    { value: "yes", label: "있음" },
    { value: "no", label: "없음" },
];
const startupCvsExperienceOptions = [
    { value: "none", label: "없음" },
    { value: "", label: "Gs더프레시 근무자" },
    { value: "", label: "ssm 근무자" },
    { value: "", label: "ssm 경영주" },
    { value: "", label: "개인수퍼" },
];
const seminarWrapRef = ref(null);
const startupConsentAgreed = ref(false);

const startupRegionSidoOptions = [
    { value: "서울", label: "서울" },
    { value: "경기", label: "경기" },
    { value: "인천", label: "인천" },
    { value: "충청", label: "충청" },
    { value: "강원", label: "강원" },
    { value: "제주", label: "제주" },
    { value: "전라", label: "전라" },
    { value: "경상", label: "경상" },
];

// const consultEntryRegionOptions = startupRegionSidoOptions;

const startupConsultForm = reactive({
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    emailId: "",
    emailDomain: "",
    emailDomainCustom: "",
    consultType: "",
    brandConsultZipCode: "",
    brandConsultAddrBasic: "",
    brandConsultAddrDetail1: "",
    brandConsultAddrDetail2: "",
    brandConsultAreaContract: "",
    brandConsultAreaPrivate: "",
    brandConsultStoreName: "",
    brandConsultCommercialFeature: "",
    brandConsultLandlordRelation: "",
    storeOwnership: "",
    investAmount: "",
    openYear: "",
    openMonth: "",
    cvsExperience: [],
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    inquiry: "",
    regionSido: "",
    regionSigungu: "",
    consultDate: "",
    consultTime: "",
    seminarEntryRegion: "",
    seminarEntryConsultant: "",
    entryRegion: "",
    entryConsultant: "",
});
/* //26.06.09 Add 이종환 사업설명회 신청 관련 */

const langData = { 
    ko: {
        headerTitle: "GS THE FRESH 창업안내",
        depth1Tabs: [
            { item: "GS THE FRESH 창업 알아보기" },
            { item: "창업 준비하기" },
            { item: "추천 점포 찾기" },
            { item: "창업 상담 및 신청" }, /**26.07.01 edit 정다희 : 텍스트 수정*/ 
            { item: "가맹계약시스템" },
        ], /*26.07.01 delete 정다희 : 경영주 지원제도 탭 삭제  */
        depth2Tabs: [
            { item: "창업 절차" }, /*26.07.01 eidt 정다희 : 텍스트 수정*/ 
            { item: "가맹 조건 안내" }, /*26.07.01 eidt 정다희 : 텍스트 수정*/
            { item: "창업 혜택" }, /*26.07.01 eidt 정다희 : 텍스트 수정*/
        ],
        /* 26.07.01 add 정다희 : GS THE FRESH 창업 알아보기 내용 추가 */
        brandIntro: {
            title: "대한민국 수퍼의 기준,",
            desc: `합리적인 투자와 체계적인 지원으로<br class='m_br'>안정적인 창업을 함께하겠습니다.`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
        },
        brandApplyLinks: [
            {
                title: "사업설명회 신청",
                btnLabel: "신청하기",
                consultD2: 0,
            },
            {
                title: "가맹/창업상담 신청",
                btnLabel: "신청하기",
                consultD2: 1,
            },
            {
                title: "입지제안 상담 신청",
                btnLabel: "신청하기",
                consultD2: 2,
            },
        ],
        successPointPanel: {
            title: `<span class='txt_point'>고객이 먼저 찾는<br class='m_br'>GS THE FRESH</span><br />창업 성공 포인트`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
            desc: "GS25와 함께라면, 첫 창업은 확신으로 운영은 편리함으로 바뀝니다.",
        },
        successPointCards: [
            {
                em: "검증된 입지",
                title: "입지분석을 통한 신규 점포 오픈",
                desc: `점포 개발 전문가의 현장분석과 데이터를 기반으로<br class='p_br'/>수익성이 보이는 점포만 오픈합니다.`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
            },
            {
                em: "편리한 시스템",
                title: "체계적이고 스마트한 지원시스템",
                desc: `정확한 데이터를 기반으로 한 시스템과, 영업전문가의<br class='p_br'/>1:1 맞춤관리까지!  첫 창업이어도 걱정마세요.`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
            },
            {
                em: "물류 인프라",
                title: "안정된 상품운영",
                desc: `오랜 수퍼 경험을 바탕으로 한 체계적인 물류시스템이<br class='p_br'/>경영주님의 안정된 점포운영을 가능하게 합니다.`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
            },
        ],
        brandSolutionPanel: {
            title: `<span class='txt_point'>GS THE FRESH가 궁금하신가요?</span> <br />경영주님 상황에 맞는 상담 도와드리겠습니다.`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
        },
        brandSolutionCards: [
            {
                title: "가맹 타입 소개",
                desc: `나의 투자 여력에 딱 맞는<br />가맹 타입 확인하기`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
                d1: 1,
                d2: 1,
            },
            {
                title: "창업 절차 안내",
                desc: `상담부터 내 점포 오픈까지,<br />체계적인 밀착 지원 내용 확인하기`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
                d1: 1,
                d2: 0,
            },
            {
                title: "1:1 상담신청",
                desc: `지역별 창업전문가의 무료 상담,<br />지금 바로 신청하기`, /** 26.07.01 edit 정다희 : 텍스트 큰따옴료 "" 대신 백틱`` 사용*/ 
                d1: 3,
                d2: 1,
            },
        ],
        franchise: {
            title: "GS THE FRESH만의 3가지 맞춤형 가맹 타입을 만나보세요.",
            tabAria: "가맹 타입",
            tableHead: {
                item: "항목",
                cost: "비용",
            },
            compare: { /* 26.07.01 add 정다희 :   */
                typeHeader: "가맹유형",
                types: [
                    { name: "GSF1", desc: "본부가 임차하여 경영주 운영", themeClass: "is_gsf1" },
                    { name: "GSF2", desc: "경영주가 총투자비의 51% 부담<br />경영주 운영", themeClass: "is_gsf2" },
                    { name: "GSF3", desc: "경영주가 임차하여 경영주 운영", themeClass: "is_gsf3" },
                ],
                investAmount: "투자 금액",
                openInvest: "개점투자",
                franchiseFee: "가맹비",
                initialProduct: "초기 상품대",
                supplies: "소모품",
                facilityDeposit: "시설보증금",
                openInvestTotal: "개점투자 계",
                amount1100: "1,100만원(VAT포함)",
                amount7000: "7,000만원",
                amount700: "700만원",
                amount500: "500만원",
                amount9300: "9,300만원",
                rentEntity: "임차비용 부담주체",
                facilityEntity: "시설투자 부담주체",
                escrowDeposit: "예치보증금",
                headOffice: "본부",
                headInvest: "본부 투자",
                owner: "경영주",
                escrowGsf1Main: "10,000만원",
                escrowGsf1Sub: "(보증보험 또는 현금)",
                escrowGsf2: "<span class=\"txt_warning\">*</span> 점포 총 투자비 X 51% - 9,300만원<br /><span class=\"td_sub\">(현금)</span>",
                none: "없음",
                ownerInvestTotal: "경영주 투자 합계",
                totalGsf1: "최소 19,300만원",
                totalGsf2: "9,300만원 + 예치보증금",
                totalGsf3: "9,300만원 + 임차비용",
                royalty: "가맹 수수료<br />(부가세별도)",
                rateGsf1: "52%",
                rateGsf1Sub: "매출총이익 구간별<br class=\"m_br\" />52% ~ 62%",
                rateGsf2: "49%",
                rateGsf2Sub: "매출총이익 구간별<br class=\"m_br\" />49% ~ 55%",
                rateGsf3: "24%",
                contractPeriod: "계약기간<br />(최초/재계약)",
                periodGsf12: "3년 / 3년 단위",
                periodGsf3: "5년 / 5년 단위",
                collateral: "담보설정",
                collateralGsf2: "5천만원",
                collateralGsf3: "최소 2억 이상",
                minIncomeSubsidy: "<span class='txt_warning'>**</span> 최저 수입 보조금",
                subsidyGsf12: "영업면적 200㎡ 초과 : 18백만/월<br />영업면적 165㎡ 이상~200㎡ 이하 : 16백만/월<br />영업면적 165㎡ 미만 : 13백만/월",
                subsidyGsf3: "해당사항 없음",
                scrollHint: "좌우로 스크롤하여 전체 내용을 확인하실 수 있습니다.", /* 26.07.01 add 정다희 : 가맹타입 비교 테이블 가로 스크롤 안내 */
                notes: [
                    "<span class='txt_warning'>*</span> 점포 총 투자비는 임차비용, 시설투자비용, 개점투자비의 총 합산액.",
                    "<span class='txt_warning'>**</span> 경영주 총수입(경영주 월매출총이익 + 본부지원금) 기준이며, 인건비 등 영업비용 차감 전 입니다. (개점일로부터 최소 1년만 적용)",
                ],
            },
            guideTypes: [
                // 26.07.01 add 정다희 : "각 타입별 종합안내" 탭 추가
                {
                    tab: "각 타입별 종합안내",
                    isCompare: true,  
                },
                {
                    tab: "GSF1타입",
                    hasSubMainCol: true,
                    infoBar: "GSF1타입 - 본부가 임차하여 경영주 운영",
                    tableRows: [
                        { main: "투자 금액", mainRowspan: 9, subMain: "개점 투자", subMainRowspan: 5, sub: "가맹비", cost: "1,100만원 <br class=\"m_br\">(부가세포함)" },
                        { sub: "초기 상품대", cost: "7,000만원" },
                        { sub: "소모품", cost: "700만원" },
                        { sub: "시설보증금", cost: "500만원" },
                        { sub: "개점투자 계", cost: "9,300만원" },
                        { sub: "임차비용 부담주체", subColspan: 2, scope: "row", cost: "본부" },
                        { sub: "시설투자 부담주체", subColspan: 2, scope: "row", cost: "본부" },
                        { sub: "예치보증금", subColspan: 2, scope: "row", cost: "10,000만원 (보증보험 또는 현금)" },
                        { sub: "경영주 투자 합계", subColspan: 2, scope: "row", cost: "9,300만원 + 예치보증금", isGray: true },
                        { sub: "가맹 수수료 <br class=\"m_br\">(부가세별도)", subColspan: 3, scope: "row", cost: "매출 총이익의52%(구간별 52% ~ 62%)" },
                        { sub: "계약기간", subColspan: 3, scope: "row", cost: "3년이상 / 3년 단위" }, /*26.07.01 edit 정다희 :  (최초/재계약) 텍스트 삭제*/
                        { sub: "담보설정", subColspan: 3, scope: "row", cost: "없음" },
                        { sub: "운영비 최소보조", subColspan: 3, scope: "row", cost: "영업면적 200㎡ (60평)초과 : 18백만/월<br />영업면적 165㎡(50~60평) 이상~200㎡ 이하 : 16백만/월<br />영업면적 165㎡(50평) 미만 : 13백만/월<br />*적용기간 : 최초 1년" },  /**26.07.01 edit 정다희 : 적용기간 전 <br /> 추가 */
                    ],
                    cautions: [
                        { text: "** 최저수입보조금은 경영주 총수입 ( 경영주 월매출총이익 + 본부지원금 ) 기준이며, 인건비 등 영업비용 차감 전 입니다.(개점일로부터 최초 2년간 적용)" }, /**26.07.01 edit 정다희 : 텍스트 수정*/
                    ],
                    graph: {
                        title: "GSF1타입",
                        items: [
                            { label: "매출이익<br class=\"p_br\" />배분율", img: imgGph01, imgMo: imgGph01Mo, alt: "GSF1타입 매출이익 배분율" },
                            { label: "월매출<br class=\"p_br\" />총 이익 구간", img: imgGph02, imgMo: imgGph02Mo, alt: "GSF1타입 월매출 총 이익 구간" },
                        ],
                    },
                    // 26.07.01 add 정다희 : warning 추가
                    warning: "*가맹계약 체결 간 가맹점사업자와 가맹본부가 협의에 따라 가맹수수료는 달리 정할 수 있습니다",
                },
                {
                    tab: "GSF2타입",
                    infoBar: "GSF2타입 - 경영주가 총투자비의 51% 부담. 경영주 운영",
                    tableRows: [
                        { main: "투자 금액", mainRowspan: 9, subMain: "개점 투자", subMainRowspan: 5, sub: "가맹비", cost: "1,100만원 <br class=\"m_br\">(부가세포함)" },
                        { sub: "초기 상품대", cost: "7,000만원" },
                        { sub: "소모품", cost: "700만원" },
                        { sub: "시설보증금", cost: "500만원" },
                        { sub: "개점투자 계", cost: "9,300만원" },
                        { sub: "임차비용 부담주체", subColspan: 2, scope: "row", cost: "본부" },
                        { sub: "시설투자 부담주체", subColspan: 2, scope: "row", cost: "본부" },
                        { sub: "예치보증금", subColspan: 2, scope: "row", cost: "* 점포 총 투자비 X 51% ~ 9,300만원 (현금)" },
                        { sub: "경영주 투자 합계", subColspan: 2, scope: "row", cost: "9,300만원 + 예치보증금", isGray: true }, /**26.07.01 del 정다희 : isgray 추가 */
                        { sub: "가맹 수수료 <br class=\"m_br\">(부가세별도)", subColspan: 3, scope: "row", cost: "매출 총이익의49%(구간별 49% ~ 55%)"}, /**26.07.01 del 정다희 : isgray 삭제 */
                        { sub: "계약기간", subColspan: 3, scope: "row", cost: "3년 / 3년 단위" }, /**26.07.01 edit 정다희 : 텍스트 수정*/ 
                        { sub: "담보설정", subColspan: 3, scope: "row", cost: "5천만원 (보증보험 가능)" },
                        { sub: "** 최저 수입 보조금", subColspan: 3, scope: "row", cost: "영업면적 200㎡ (60평)초과 : 18백만/월<br />영업면적 165㎡(50~60평) 이상~200㎡ 이하 : 16백만/월<br />영업면적 165㎡(50평) 미만 : 13백만/월    *적용기간 : 최초 1년" },
                    ],
                    cautions: [
                        { text: "* 점포 총 투자비는 임차비용, 시설투자비용, 개점투자비의 총 합산액." },
                        { text: "** 경영주 총수입(경영주 월매출총이익 + 본부지원금) 기준이며, 인건비 등 영업비용 차감 전 입니다. (개점일로부터 최소 1년만 적용)" },
                        { text: "** 최저수입보조금은 경영주 총수입 ( 경영주 월매출총이익 + 본부지원금 ) 기준이며, 인건비 등 영업비용 차감 전 입니다.(개점일로부터 최초 2년간 적용)" }, /**26.07.01 edit 정다희 : 내용 수정 */
                    ],
                    graph: {
                        title: "GSF2타입",
                        items: [
                            { label: "매출이익<br class=\"p_br\" />배분율", img: imgGph03, imgMo: imgGph03Mo, alt: "GSF2타입 매출이익 배분율" },
                            { label: "월매출<br class=\"p_br\" />총 이익 구간", img: imgGph04, imgMo: imgGph04Mo, alt: "GSF2타입 월매출 총 이익 구간" },
                        ],
                    },
                    warning: "*가맹계약 체결 간 가맹점사업자와 가맹본부가 협의에 따라 가맹수수료는 달리 정할 수 있습니다",
                },
                {
                    tab: "GSF3타입",
                    infoBar: "GSF3타입 - 경영주가 임차하여 경영주 운영",
                    tableRows: [
                        { main: "투자 금액", mainRowspan: 9, subMain: "개점 투자", subMainRowspan: 5, sub: "가맹비", cost: "1,100만원 <br class=\"m_br\">(부가세포함)" },
                        { sub: "초기 상품대", cost: "7,000만원" },
                        { sub: "소모품", cost: "700만원" },
                        { sub: "시설보증금", cost: "500만원" },
                        { sub: "개점투자 계", cost: "9,300만원" },
                        { sub: "임차비용 부담주체", subColspan: 2, scope: "row", cost: "경영주" },
                        { sub: "시설투자 부담주체", subColspan: 2, scope: "row", cost: "본부" },
                        { sub: "예치보증금", subColspan: 2, scope: "row", cost: "없음" },
                        { sub: "경영주 투자 합계", subColspan: 2, scope: "row", cost: "9,300만원 + 임차비용", isGray:true},
                        { sub: "가맹 수수료 <br class=\"m_br\">(부가세별도)", subColspan: 3, scope: "row", cost: "24%" },
                        { sub: "계약기간", subColspan: 3, scope: "row", cost: "5년이상 / 3년 단위" }, /** 26.07.01 edit 정다희 : 최초/재계약 텍스트 삭제 */
                        { sub: "담보설정", subColspan: 3, scope: "row", cost: "2억원이상 (보증보험 가능)" },
                        { sub: "** 최저 수입 보조금", subColspan: 3, scope: "row", cost: "2억 6000만원 / 年 ( 약 2,167만원 / 月)" },
                    ],
                    cautions: [
                        // { text: "* 경영주 총수입(경영주 월매출총이익 + 본부지원금) 기준이며, 인건비 등 영업비용 차감 전 입니다. <br class=\"m_br\"/>(개점일로부터 최소 1년만 적용)" }, /**26.07.01 del 정다희  */
                        { text: "** 최저수입보조금은 경영주 총수입 ( 경영주 월매출총이익 + 본부지원금 ) 기준이며, 인건비 등 영업비용 차감 전 입니다.(개점일로부터 최초 2년간 적용)" }, /**26.07.01 edit 정다희 : 내용수정  */
                    ],
                },
            ],
        },
        procedure: {
            buttonHref: "#none",
            buttonLabel: "설명회신청 바로가기",
            steps: [
                { step: "Step 1", title: "사업설명회 참석", text: "GS THE FRESH 가맹 계약<br />조건안내 및 절차소개", numColor: "#15b874" },
                { step: "Step 2", title: "지원서 접수", text: "지원서 제출은 월~금요일 수시가능", numColor: "#15b874" },
                { step: "Step 3", title: "경영주 면접", text: "지원서를 토대로 면접 진행하여<br />사업 타당성 검토함", numColor: "#15b874" }, /** 26.07.01 edit 정다희 : text 수정*/
                { step: "Step 4", title: "점포소개", text: "예비경영주 희망사항과<br />조건에 부합하는 점포를 소개함", numColor: "#15b874" },
                { step: "Step 5", title: "가맹약정(필요시)", text: "소개 점포의 운영의사 최종확인 및<br />약정금 지불", numColor: "#15b874" },
                { step: "Step 6", title: "가맹 본 계약", text: "본계약금 최종 지불 및<br />본계약서 체결", numColor: "#15b874" },
                { step: "Step 7", title: "경영주 교육 이수", text: "점포 현장 OJT,<br />입문 교육(이론/실습)", numColor: "#15b874" },
                { step: "Step 8", title: "GRAND OPEN", text: "상품 재고조사 후 오픈", numColor: "#15b874" },
                { step: "Step 9", title: "점포운영", text: "점포 영업 지원 담당 직원의<br />주기적인 방문 및 컨설팅", numColor: "#15b874" },
            ],
        },
        precaution: {
            subHeaderTitle: "창업전 필수 확인 사항", /* 26.07.01 add 정다희 */
            title: "가맹 해약<br class=\"p_br\">수수료",
            blockTitle1: "GSF1, GSF2 타입",
            blockTitle2: "GSF3 타입",
            blockTitle2Desc: "가맹본부 회계기준, 감가상각잔존가액 별도 보상",
            cards1: [
                { num: "01", title: "중도 계약 해지", desc: "· 과거 1년간의 월 평균 매출 총이익 20% X 3개월 (3배)" },
                { num: "02", title: "즉시 계약 해지사유 발생시", desc: "· 과거 1년간의 월 평균 매출 총이익 20% X 6개월 (6배)" },
            ],
            cards2: [
                { num: "01", title: "경영주 신청", desc: ["· 3년 미만 : 과거 1년간의 월 평균 매출 총이익 24% X 8개월 (8배) + 시설잔존", "· 3년 이상 : 과거 1년간의 월 평균 매출 총이익 24% X 4개월 (4배) + 시설잔존"] },  /**26.07.01 edit 정다희 : desc 내용 삭제, title 수정 */ 
                { num: "02", title: "즉시 계약 해지사유 발생시", desc: ["· 운영기간 무관 과거 1년간의 월 평균 매출 총이익 24% X 12개월 (12배) + 시설잔존"] }, /**26.07.01 edit 정다희 : desc 오타 수정 */ 
            ],
            cautions: [
                "* 손해 배상금 별도이며 과거 영업기간이 1년 이하인 경우 해당 영업기간을 적용함.",
                "* '과거 1년간'의 기간은 관리금 중도해약인 경우 중도해약 월로부터 가까운 기간으로 하고, 해지사유 발생인 경우에는 계약 해지 사유가 발생한 달의 직전월의 말일로부터 기 기산함.",
            ],
        },
        seminar: {
            headDesc: "GS THE FRESH(GS수퍼마켓) 가맹 사업에 대한<br class=\"p_br\">자세하고 다양한 정보를 얻을 수 있는 사업설명회에 참여해 보세요.",
            applyButtonLabel: "창업 설명회 신청", /** 26.07.03 edit 정다희 : 텍스트 수정 */ 
            list: [
                {
                    title: "수도 사업 창업회", /** 26.07.03 edit 정다희 : 텍스트 수정 */ 
                    rows: [
                        { label: "장소", value: "서울 강남구 논현로508 GS타워 지하 1층" },
                        { label: "대상", value: "서울, 경기, 인천 GS THE FRESH 창업을 희망하는 분" },
                        { label: "문의", value: "02-2006-2363" },
                        { label: "신청", value: [
                            {date:"2/10(화)", time:"14:00", state:"false", btnTxt:"신청마감"},
                            {date:"2/10(화)", time:"14:00", state:"true", btnTxt:"신청"}
                        ] },
                    ],
                },
                {
                    title: "중부 사업창업회", /** 26.07.03 edit 정다희 : 텍스트 수정 */
                    rows: [
                        { label: "장소", value: "대전 중구 대종로167 모임공간 국보 3층" },
                        { label: "대상", value: "충청도 GS THE FRESH 창업을 희망하는 분" },
                        { label: "문의", value: "02-2006-2933" },
                        { label: "신청", value: [
                            {date:"2/10(화)", time:"14:00", state:"false", btnTxt:"신청마감"},
                            {date:"2/10(화)", time:"14:00", state:"true", btnTxt:"신청"}
                        ] },
                    ],
                },
                {
                    title: "영남 사업창업회", /** 26.07.03 edit 정다희 : 텍스트 수정 */
                    rows: [
                        { label: "장소", value: "부산 연제구 월드컵대로190 신현빌딩2층" },
                        { label: "대상", value: "부산, 경상도, 전라도 GS THE FRESH 창업을 희망하는 분" },
                        { label: "문의", value: "02-2006-2954" },
                        { label: "신청", value: [
                            {date:"2/10(화)", time:"14:00", state:"false", btnTxt:"신청마감"},
                            {date:"2/10(화)", time:"14:00", state:"true", btnTxt:"신청"}
                        ] },
                    ],
                },
            ],
        },
        store: {
            intro: "철저한 상권 조사를 바탕으로 가맹/창업을 위한 최적의 점포를 소개합니다.",
            regionLabel: "지역",
            allLabel: "전체",
            franchiseTypeLabel: "가맹타입",
            storeTypeLabel: "점포유형/청년창업",
            storeTypeOptions: [
                { value: "신규점", label: "신규점" },
                { value: "기존점", label: "기존점" },
            ],
            youthLabel: "청년창업",
            youthShortLabel: "청년",
            youthInfoAria: "청년창업 안내",
            youthPopoverTitle: "청년창업이란?",
            youthPopoverDesc: "20대 청년들을 위해서 투자비 일부를 할인해드리는 제도에요.",
            youthPopoverLinkLabel: "청년창업 자세히 보러가기",
            youthPopoverHref: "#",
            closeAria: "닫기",
            searchLabel: "검색",
            searchPlaceholder: "지역명, 태그....",
            searchAria: "검색",
            countPrefix: "총",
            countSuffix: "개 점포",
            sortLatest: "최신순",
            sortCost: "투자비 낮은순",
            viewListAria: "목록형",
            viewGridAria: "격자형",
            tableHeaders: ["지역", "타입", "유형", "투자비", "해시태그", "면적", "등록일", "상세"],
            detailOpenLabel: "상세",
            detailCloseLabel: "접기",
            regions: [
                { value: "서울", label: "서울", count: 4 },
                { value: "경기", label: "경기", count: 4 },
                { value: "인천", label: "인천", count: 4 },
                { value: "부산", label: "부산", count: 4 },
                { value: "대구", label: "대구", count: 4 },
                { value: "대전", label: "대전", count: 4 },
                { value: "광주", label: "광주", count: 4 },
                { value: "울산", label: "울산", count: 4 },
                { value: "세종", label: "세종", count: 1 },
                { value: "강원", label: "강원", count: 4 },
                { value: "충북", label: "충북", count: 4 },
                { value: "충남", label: "충남", count: 4 },
                { value: "전북", label: "전북", count: 4 },
                { value: "전남", label: "전남", count: 4 },
                { value: "경북", label: "경북", count: 4 },
                { value: "경남", label: "경남", count: 4 },
                { value: "제주", label: "제주", count: 2 },
            ],
            franchiseTypes: [
                { value: "GS1", label: "GS1 (경영주 임차)" },
                { value: "GS2", label: "GS2 (임차 공동 부담)" },
                { value: "GS3", label: "GS3 (임차 본부 부담)" },
            ],
            list: [
                { id: 1, region: "대전 동구", type: ["GS1", "GS2"], form: "기존점", isYouth: false, cost: "7,200만원", tags: "#버스정류장 #대로변", area: "18평", date: "2025.12.24", feature: "신축 아파트 단지 내 상가 1층에 위치하여 입주민 수요가 안정적입니다." },
                { id: 2, region: "강원 원주시", type: ["GS2", "GS3"], form: "기존점", isYouth: true, cost: "10,500만원", tags: "#버스정류장 #대로변", area: "22평", date: "2025.12.24", feature: "대형 마트 인접 상권으로 유동 인구가 많아 안정적인 매출이 기대됩니다." },
                { id: 3, region: "대구 서구", type: ["GS1"], form: "기존점", isYouth: true, cost: "5,000만원", tags: "#번화가 #버스정류장", area: "14평", date: "2025.09.21", feature: "지하철역 출구 인근에 위치하여 출퇴근 고객 수요가 풍부합니다." },
                { id: 4, region: "대전 동구", type: ["GS3"], form: "기존점", isYouth: false, cost: "7,200만원", tags: "#버스정류장 #대로변", area: "18평", date: "2025.12.24", feature: "신축 아파트 단지 내 상가 1층에 위치하여 입주민 수요가 안정적입니다." },
                { id: 5, region: "인천 연수구", type: ["GS2"], form: "기존점", isYouth: false, cost: "8,000만원", tags: "#주택가 #초등학교인근", area: "20평", date: "2025.11.10", feature: "주거 밀집 지역 내 독점 상권으로 안정적인 고정 고객층이 형성되어 있습니다." },
                { id: 6, region: "전북 익산시", type: ["GS1", "GS2"], form: "기존점", isYouth: true, cost: "4,500만원", tags: "#대로변 #유동인구많음", area: "15평", date: "2025.10.05", feature: "도심 중심 상가 위치로 다양한 연령층의 유동 고객이 상시 방문합니다." },
            ],
        },
        support: {
            intro: "GS THE FRESH는 <br class=\"m_br\"/><span class='txt_green'>경영주와의 공동의 발전</span>을 위해 <br />다양한 상생 제도를 운영하고 있습니다.",
            panelTitle: "경영주 운영 지원 제도",
            panelDesc: "GS THE FRESH 경영주님의 원활한 점포 운영을 위한 지원 제도 입니다.",
            cards: [
                { num: "01", title: "최소 운영 보조", desc: "계약양식 조건에 따라, 개점일로부터 정해진 기간에 한해 경영주 총수입을 기준으로 하여 일정 금액이 보장될 수 있도록 본부지원금을 통해 최소 운영 보조를 지원하고 있습니다." },
                { num: "02", title: "복리후생", desc: "경조사 발생시(가맹점 실경영주 기준 결혼 또는 조위) 경조금 및 화환 등을 지급하고 있습니다." },
                { num: "03", title: "스토어매니저(근무자) 구인사이트 지원", desc: "GS THE FRESH 전용 배너 업체(알바천국) 운영" },
                { num: "04", title: "기타 운영지원 제도", desc: "부진 점포에 한해, 본사 지원 활동으로 '부진점 케어활동'을 진행하며, 상권 특성 및 각종 이슈 사항으로 경제적지원금이 필요한 경우 특정점에 한해 '신규점 조기 정착 지원금'을 운영합니다. 또한, 필요시 양수도점 매출 향상을 위한 지원금을 지급하고 매년 가맹지원제도를 수립 및 운영하고 있습니다." }, /*26.06.30 edit 정다희 : 오타 수정*/ 
            ],
        },
        consult: {
            depth2Tabs: [{ item: "창업 설명회 신청" }, { item: "창업 상담 신청" }, { item: "입지제안 상담 신청" }], /**26.07.01 add 정다희 : 탭 추가, 탭 내용 수정*/ 
            panelTitle: "컨설턴트와 1:1 상담",
            panelDesc: "가맹/창업 컨설턴트가 1:1로 상담해 드립니다. <br /> 가맹/창업 컨설턴트에게 문의하시면 자세한 상담을 받으실 수 있습니다.",
            caution: ["※ 주말 및 공휴일은 연락이 불가하며 평일 09:00~17:30 사이에 연락 부탁드립니다."],
            label: "컨설턴트",
            telButtonLabel: "연락처 확인하기",
            tooltipTitle: "연락처",
            phoneLabel: "전화 번호",
            kakaoLabel: "카카오톡",
            qrAlt: "QR Code",
            kakaoNotice: "* 카카오톡 상담 가능",
            closeAria: "닫기",
            applyButtonLabel: "상담신청",
            infoBannerText: "'입지' 및 '점포소유' 상담은 입지제안 사이트를 통해 확인 부탁드립니다.",
            infoBannerButtonLabel: "바로가기",
            proposalPanelTitle: "입지제안 상담",
            proposalPanelDesc: "점포 소유 및 입지 관련 상담은 입지제안 상담으로 안내해 드립니다.",
            proposalCaution: "※ 입지제안 상담은 입지제안 사이트를 통해 접수 가능합니다.",
            proposalButtonLabel: "입지상담 바로가기",
            locationConsultHref: "http://gsthefresh.gsretail.com/thefresh/ko/franchise-info/one-on-ones-consult/offer-location",
            qrImageLabel: "QR 이미지",
            cards: [
                { name: "윤경진", region: "수도권", note: "*설명회 및 창업문의", tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_01.png"), link: "#none" },
                { name: "이승현", region: "수도권", note: "*설명회 및 창업문의", tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_02.png"), link: "#none" },
                { name: "남창호", region: "수도권", note: "*설명회 및 창업문의", tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_03.png"), link: "#none" },
                { name: "남궁신영", region: "충북/강원권", note: "*설명회 및 창업문의", tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_04.png"), link: "#none" },
                { name: "김수진", region: "영남/호남권", note: "*설명회 및 창업문의", tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_05.png"), link: "#none" },
            ],
            proposalCards: [
                { name: "입지상담 접수", region: "전국", note: "* 점포 소유 및 입지제안 상담" },
                { name: "입지검토 신청", region: "전국", note: "* 상권/입지 검토 상담" },
                { name: "점포제안 문의", region: "전국", note: "* 입지제안 관련 문의" },
            ],
        },
        intro: {
            title: "안녕하세요!<br>GS THE FRESH 1:1 상담<br class=\"m_br\">컨설턴트 윤경진 입니다.",
            desc: "아래의 상담 신청서를 작성하시면 귀하만의 창업 상담을 받아 보실 수있습니다. <br />담당자와 통화가 원활하지 않는 경우 상담신청 부탁 드립니다. 담당자가 확인 후 연락 드리겠습니다.",
            caution:["※ 규모: 전용면적 60평 이상", "※※ 주말/연휴에는 즉시 응답이 어려울 수 있는 점 양해 부탁드립니다."]
        },
        consultBox: {
            title: "안녕하세요!<br />GS THE FRESH 1:1 상담<br class=\"m_br\">컨설턴트 윤경진 입니다.",
            desc: "아래의 상담 신청서를 작성하시면 귀하만의 창업 상담을 받아 보실 수있습니다.<br />담당자와 통화가 원활하지 않는 경우 상담신청 부탁 드립니다. 담당자가 확인 후 연락 드리겠습니다.",
            consultantName: "윤경진 컨설턴트",
        },
        proposalConsultBox: {
            title: "입지제안 및 점포소유 상담",
            desc: "GS더프레시 입지에 대한 상담을 지역별 담당자들이 1:1 맞춤 상담 해드립니다.<br />상담신청을 남겨주시면 담당자가 확인 후 연락드립니다.",
            caution: ["※ 규모: 전용면적 60평 이상", "※※ 주말/연휴에는 즉시 응답이 어려울 수 있는 점 양해 부탁드립니다."],
        },
        proposalForm: {
            regionLabel: "입지제안 지역 선택",
            sidoInitMsg: "지역선택",
            sigunguInitMsg: "구/군 선택",
        },
        proposalCustomerForm: {
            title: "고객정보",
            nameLabel: "이름",
            emailLabel: "이메일",
            emailPlaceholder: "직접입력",
            phoneLabel: "휴대폰",
            storeAddressLabel: "추천점포 소재지",
            zipButtonLabel: "우편번호 찾기",
            addressNote: "<span class=\"form_required\">*</span> 추천점포 소재지는 필수입력 사항입니다.",
            storeAreaLabel: "추천점포 면적",
            contractAreaLabel: "계약면적",
            exclusiveAreaLabel: "전용면적",
            areaUnit: "평",
            areaNote: "* 평 = (기준)평 x 3.3",
            legalNotice: "* 법정도량은 계약면적을 기준으로 합니다.",
            storeNameLabel: "점포상호",
            commercialFeatureLabel: "상권특징",
            commercialFeaturePlaceholder: "상권 특징을 입력해 주세요.",
            ownerRelationLabel: "건물주와의 관계",
        },
        consent: {
            title: "개인정보 수집·이용 동의",
            items: [
                "- 입력하신 정보는 입지상담을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같으며,기타 개인정보 취급사항은 홈페이지 하단의 \"개인정보 처리방침\"을 참고하시기 바랍니다.",
                "-수집하는 개인정보 항목: 이름, 이메일, 휴대폰번호, 소유점포주소(시, 구/군)",
                "- 수집이용 및 목적: 수집한 개인정보를 본인 식별 및 문의사항 확인 및 답변을 위해 활용",
                "- 보유 및 이용기간: 접수 후 1년",
            ],
            noticeHtml: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우 <br />사업설명회 신청 글 작성이 불가능합니다.",
        },

        consent2: {
            title: "개인정보 수집·이용 동의",
            items: [
                "- 입력하신 정보는 입지상담을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같으며,기타 개인정보 취급사항은 홈페이지 하단의 \"개인정보 처리방침\"을 참고하시기 바랍니다.",
                "- 수집하는 개인정보 항목: 이름, 이메일, 휴대폰번호",
                "- 수집이용 및 목적: 수집한 개인정보를 본인 식별 및 문의사항 확인 및 답변을 위해 활용",
                "- 보유 및 이용기간: 접수 후 1년",
            ],
            noticeHtml: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우<br />입지제안 신청 글 작성이 불가능합니다.",
        },
        storeButtons: {
            hasStore: "내가 소유한 점포가 있다.",
            noStore: "내가 소유한 점포가 없다.",
        },
        requiredNote: "* 필수 입력사항",
        customerForm: {
            title: "고객정보",
            nameLabel: "이름",
            emailLabel: "이메일",
            emailPlaceholder: "직접입력",
            phoneLabel: "연락처",
            addressLabel: "소유점포 주소 <br class=\"p_br\"/>(과거, 현재 점포소유 <br class=\"p_br\">신청자에 한함)<span class=\"form_required\">*</span>",
            sidoInitMsg: "지역선택",
            sigunguInitMsg: "구/군 선택",
        },
        consultForm: {
            title: "상담내용",
            areaLabel: "소유점포 면적",
            contractAreaLabel: "계약면적",
            exclusiveAreaLabel: "전용면적",
            areaUnit: "m²",
            areaNote: "* m² = (기준)평 x 3.3",
            superOperatorLabel: "수퍼 운영자 일 경우",
            itemCheckLabel: "취급 품목 체크",
            etcLabel: "기타",
            contractLabel: "계약조건",
            contractPeriodLabel: "계약 기간",
            depositRentLabel: "보증금/월임대료",
            rentUnit: "만원",
            superItemOptions: [
                { value: "농산", label: "농산" },
                { value: "축산", label: "축산" },
                { value: "수산", label: "수산" },
                { value: "공산품", label: "공산품" },
                { value: "조리", label: "조리" },
            ],
            sidoOptions: [
                { value: "서울", label: "서울특별시" },
                { value: "부산", label: "부산광역시" },
                { value: "대구", label: "대구광역시" },
                { value: "인천", label: "인천광역시" },
                { value: "광주", label: "광주광역시" },
                { value: "대전", label: "대전광역시" },
                { value: "울산", label: "울산광역시" },
                { value: "세종", label: "세종특별자치시" },
                { value: "경기", label: "경기도" },
                { value: "강원", label: "강원특별자치도" },
                { value: "충북", label: "충청북도" },
                { value: "충남", label: "충청남도" },
                { value: "전북", label: "전북특별자치도" },
                { value: "전남", label: "전라남도" },
                { value: "경북", label: "경상북도" },
                { value: "경남", label: "경상남도" },
                { value: "제주", label: "제주특별자치도" },
            ],
            sigunguMap: {
                서울: ["종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"],
                부산: ["중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
                대구: ["중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군", "군위군"],
                인천: ["중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
                광주: ["동구", "서구", "남구", "북구", "광산구"],
                대전: ["동구", "중구", "서구", "유성구", "대덕구"],
                울산: ["중구", "남구", "동구", "북구", "울주군"],
                세종: ["세종시"],
                경기: ["수원시", "성남시", "의정부시", "안양시", "부천시", "광명시", "평택시", "동두천시", "안산시", "고양시", "과천시", "구리시", "남양주시", "오산시", "시흥시", "군포시", "의왕시", "하남시", "용인시", "파주시", "이천시", "안성시", "김포시", "화성시", "광주시", "양주시", "포천시", "여주시", "연천군", "가평군", "양평군"],
                강원: ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
                충북: ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
                충남: ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
                전북: ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
                전남: ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
                경북: ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
                경남: ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
                제주: ["제주시", "서귀포시"],
            },
            submitLabel: "상담신청",
            resetLabel: "다시작성",
        },
        consultFormNoStore: {
            title: "상담내용",
            investmentLabel: "투자 가능금액",
            investmentOptions: ["3000만원 이하", "3000만원~5000만원", "5000만원 이상"],
            investmentInitMsg: "3000만원 이하",
            incomeLabel: "기대 소득",
            incomeOptions: ["150~200만원", "200~300만원", "300만원 이상"],
            incomeInitMsg: "150~200만원",
            openRegionLabel: "개설 희망지역",
            superExperienceLabel: "수퍼 근무경험",
            superExperienceOptions: [
                { value: "none", label: "없음" },
                { value: "fresh_staff", label: "GS THE FRESH 근무자" },
                { value: "ssm_staff", label: "SSM 근무자" },
                { value: "ssm_owner", label: "SSM 경영주" },
                { value: "personal_super", label: "개인수퍼" },
            ],
            openTimeLabel: "개설 희망시기",
            openYearOptions: ["2026년", "2027년", "2028년"],
            openYearInitMsg: "2026년",
            openMonthOptions: ["01월", "02월", "03월", "04월", "05월", "06월", "07월", "08월", "09월", "10월", "11월", "12월"],
            openMonthInitMsg: "01월",
            typeLabel: "개설희망 가맹타입",
            franchiseTypeOptions: [
                { value: "GSF1", label: "GSF1 타입" },
                { value: "GSF2", label: "GSF2 타입" },
                { value: "GSF3", label: "GSF3타입" },
            ],
            viewLabel: "보기",
            inquiryLabel: "문의내용",
            inquiryPlaceholder: "문의내용을 입력해주세요.",
        },
        quickMenu: ["창업안내", "입점상담", "고객센터"],

        //사업설명회 신청 폼
        consultFormTexts: {
            startupPanelAria: "창업 상담 신청",
            seminarPanelAria: "창업 설명회 신청",
            entryPanelAria: "입점 제안/브랜드 전환 상담",
            requiredLabel: "* 필수 입력사항",
            requiredInput: "(필수 입력)",
            faqTypePeriodNote: "* 타입별/기간별 개월 수",
            compareTypeHeader: "가맹타입",
            compareGs1Desc: "직접 임차하고, 수익 배분율이 가장 높아요",
            compareGs2Desc: "본사와 임차비용 공동 부담해요",
            compareGs3Desc: "임차비용 부담 없이 시작해요",
            compareInvestAmount: "투자 금액",
            compareCommonInvestAmount: "공<br />통<br />투<br />자<br />금<br />액",
            compareProductPrep: "상품 준비금",
            compareSupplyPrep: "소모품 준비금",
            compareFranchiseFee: "가맹비",
            compareSubtotal: "상품 + 소모품 + 가맹비",
            compareAmount1400: "1,400만원",
            compareAmount100: "100만원",
            compareAmount770Vat: "770만원(VAT포함)",
            compareAmount2270: "2,270만원",
            compareRentCost: "점포 임차비용",
            compareOwnerInvest: "경영주 투자",
            compareHeadInvest: "본부 투자",
            compareHeadDeposit: "본부 보증금",
            compareSubleaseDeposit: "전대보증금",
            compareEscrowDeposit: "예치보증금",
            compareMin3000: "최소 3,000만원",
            compareFacilityInterior: "시설/인테리어",
            compareHeadSupport: "본부 지원",
            compareSpecialNote: "(※ 수익추구 특약: 경영주 투자)",
            compareTotalInvest: "총 투자금액",
            compareTotalGs1: "점포 임차비용 + 공통 투자비 2,270만원",
            compareTotalGs2Main: "최소 5,270만원",
            compareTotalGs2Sub: "(전대보증금 + 공통 투자비)",
            compareTotalGs3Main: "최소 5,270만원",
            compareTotalGs3Sub: "(예치보증금 + 공통 투자비)",
            compareContract: "계약",
            compareCondition: "조건",
            compareFinalProfitShare: "최종 경영주 수익 배분율",
            compareMax71: "최대 71%",
            compareMax65: "최대 65%",
            compareMax46: "최대 46%",
            compareProfitShare: "경영주 수익 배분율",
            compare24hSupport: "24시간 영업장려금",
            compareContractPeriod: "계약기간",
            comparePeriod5y: "5년",
            comparePeriod4y: "4년",
            compareCollateral: "담보 설정",
            compareCollateral5000: "5,000만원",
            compareCollateral2000: "2,000만원",
            compareSupportSystem: "각종지원제도",
            compareSupportSystemDesc: "상생 인센티브 / 상품 판매·발주 장려금 / 미오출 보상금",
            compareProfitSpecial: "수익추구특약",
            compareMax81: "최대 81%",
            compareSpecialPercentNote: "(※ GS1 수익배분율 71% + 특약 10%)",
            compareSafeOpAmount: "안심운영지원 기준금액",
            compareSupportPeriod: "(지원기간: 1년)",
            compareSafeOpGs1: "24시간 운영: 月 최대 800만원<br />18시간 운영: 月 최대 550만원",
            compareSafeOpGs2: "24시간 운영: 月 최대 750만원<br />18시간 운영: 月 최대 500만원",
            compareSafeOpGs3: "24시간 운영: 月 최대 700만원<br />18시간 운영: 月 최대 450만원",
            compareNote1: "* GS1 Type 수익추구 특약 : 시설 인테리어 및 장비 사용료 경영주 투자, 가맹계약기간 7년",
            compareNote2: "* GS3 Type은 가맹계약 체결 전 상호 협의에 따라 수익배분율을 달리 정할 수 있습니다",
            compareNote3: "* 신선강화점으로 오픈하는 경우, 상품준비금은 600만원 상향, 담보 설정은 1,000만원 상향됩니다. (<a href=\"#\">신선강화점 자세히 알아보기</a>)",
            compareNote4: "* 안심운영제도란? 경영주가 계약서에서 정한 내용을 준수하고 연중무휴, 1일 18시간 이상 점포 운영할 경우,<br/>경영주의 수입이 안심 운영 지원금 기준에 미달한 경우에 한하여 회사가 경영주의 운영비를 보조하는 제도입니다. (<a href=\"#\">안심운영제도 자세히 알아보기</a>)",
            benefitPolicyNote: "* 해당 제도는 회사 경영여건 및 운영 방침에 따라 일부 변경/삭제될 수 있습니다.",
            storeTableRegion: "지역",
            storeTableType: "타입",
            storeTableCategory: "유형",
            storeTableInvestment: "투자비",
            storeTableHashtag: "해시태그",
            storeTableArea: "면적",
            storeTableDate: "등록일",
            storeTableDetail: "상세",
            youthBadge: "청년",
            privacyConsentTitle: "개인정보 수집·이용 동의",
            startupConsentNotice: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우 상담 글 작성이 불가능합니다.",
            seminarConsentNotice: "동의하지 않으실 경우 상담 글 작성이 불가능합니다.",
            entryConsentNotice: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우 입지제안 신청 글 작성이 불가능합니다.",
            agreeText: "동의합니다.",
            reserveButton: "상담 예약 신청하기",
            seminarGuide: "GS25 창업설명회는 정기설명회 및 컨설턴트 상담으로 운영되며, 각 지역 사무소에서 진행됩니다. <br />지역별 창업설명회 일정이 상이하므로 확인 후 신청해 주세요.",
            seminarSelectRegionGuide: "창업 설명회 개설 지역을 선택해 주세요.",
            regionConsultantTitle: "지역 및 컨설턴트 선택",
            regionConsultantLabel: "지역/컨설턴트",
            customerInfoTitle: "고객정보",
            nameLabel: "이름",
            contactLabel: "연락처",
            birthLabel: "생년월일",
            emailLabel: "이메일",
            mobileLabel: "휴대폰",
            consultTypeLabel: "상담 형태",
            storeOwnershipLabel: "점포 소유 및 임차",
            openday: "오픈 희망 시기",
            price01: "기대소득",
            investAmountLabel: "투자가능금액 (만원)",
            openScheduleLabel: "오픈 희망 시기",
            localLabel: "관심 지역",
            localLabel_explain: "*상세 지역 선택 시 담당 컨설턴트가 배정됩니다.",
            yearInit: "년도",
            monthInit: "월",
            dayInit: "일",
            yearUnit: "년",
            monthUnit: "월",
            cvsExperienceLabel: "슈퍼 근무경험",
            inquiryLabel: "문의 내용",
            startupInquiryPlaceholder: "창업 관련 궁금한 사항을 입력해주세요.",
            interestRegionLabel: "관심 지역",
            interestRegionNote: "지역 선택 시 담당자가 배정되며, 담당자별로 예약 가능 시간이 다릅니다.",
            sidoInit: "시/도 선택",
            sigunguInit: "구/시 선택",
            consultDateLabel: "상담 날짜 선택",
            consultTimeLabel: "상담 시간 선택",
            selectRegionFirstPlaceholder: "먼저 관심 지역을 선택 해 주세요.",
            selectRegionTimePlaceholder: "먼저 날짜를 선택 해 주세요.",
            managerInfoAria: "담당자 정보",
            managerAlt: "담당자",
            regionSelectAria: "지역 선택",
            selectedSeminarLabel: "선택한 설명회",
            selectedSeminarValue: "수도 창업 설명회", /** 26.07.03 edit 정다희 : 텍스트 수정 */ 
            closeButton: "닫기",
            entryConsultTitle: "입점 제안/브랜드 전환 상담",
            recommendedStoreLocationLabel: "추천점포 소재지",
            recommendedStoreAreaLabel: "추천 점포 면적",
            contractAreaLabel: "계약면적",
            privateAreaLabel: "전용면적",
            areaUnit: "평",
            storeNameLabel: "점포 상호",
            commercialFeatureLabel: "상권 특징",
            landlordRelationLabel: "건물주와의 관계",
            regionSelectInit: "지역선택",
            consultantSelectInit: "컨설턴트 선택",
            searchButton: "조회",
            applyButton: "신청",
            directInputPlaceholder: "직접입력",
            findZipButton: "우편번호 찾기",
            commercialFeaturePlaceholder: "상권 특징을 입력해 주세요.",
        },
        seminarConsentItems
    },
    en: {
        headerTitle: "GS THE FRESH Startup Guide"/* 260604 번역 */,
        depth1Tabs: [
            { item: "Learn About GS THE FRESH Startup"/* 260604 번역 */ },
            { item: "Preparing for Startup"/* 260604 번역 */ },
            { item: "Find recommended stores"/* 260604 번역 */ },
            { item: "Consultation and Application"/* 260604 번역 */ },
            { item: "Franchise Contract System"/* 260604 번역 */ },
        ], /**26.07.01 delete 정다희 : Store Owner Support Programs 탭 삭제 → Preparing for Startup > Startup Benefits 탭으로 이동 */
        depth2Tabs: [
            { item: "Startup Procedure"/* 260604 번역 */ },/*26.07.01 edit 정다희 : 텍스트 수정*/
            { item: "Franchise Terms Guide"/* 260604 번역 */ }, /*26.07.01 edit 정다희 : 텍스트 수정*/
            { item: "Startup Benefits"/* 260604 번역 */ }, /*26.07.01 edit 정다희 : 텍스트 수정*/
        ],
        /* 26.07.01 add 정다희 : GS THE FRESH 창업 알아보기 내용 추가 */
        brandIntro: {
            title: "The standard for a new beginning,"/* 260604 번역 */,
            desc: "We will partner with you for a stable startup through reasonable investment and systematic support."/* 260604 번역 */,
        },
        brandApplyLinks: [
            {
                title: "Apply for startup briefing"/* 260604 번역 */,
                btnLabel: "Apply"/* 260604 번역 */,
                consultD2: 0,
            },
            {
                title: "Apply for startup consultation"/* 260604 번역 */,
                btnLabel: "Apply"/* 260604 번역 */,
                consultD2: 1,
            },
            {
                title: "Location proposal/Brand conversion inquiry"/* 260604 번역 */,
                btnLabel: "Inquire"/* 260604 번역 */,
                consultD2: 2,
            },
        ],
        brandApplyDesc: [
            "We guide you through all startup information at once.",
            "We provide 1:1 consultation for your startup questions.",
            "We consult on location proposals or brand conversion for your property.",
        ],
        brandStats: [
            { value: "18,000+", label: "Number of stores nationwide"/* 260604 번역 */ },
            { value: "No. 1 in convenience store sales", label: "Annual sales per store of 640 million won+"/* 260604 번역 */ },
        ],
        successPointPanel: {
            title: "GS25, comfortable for store owners<br /><span class='txt_blue'>Keys to startup success</span>"/* 260604 번역 */,
            desc: "With GS25, a successful startup is possible."/* 260604 번역 */,
        },
        successPointCards: [
            {
                em: "Profitability Analysis"/* 260604 번역 */,
                title: "Profitability-focused new store opening"/* 260604 번역 */,
                desc: "We open only stores with visible profitability, based on store development experts' on-site analysis and data."/* 260604 번역 */,
            },
            {
                em: "Smart Operation"/* 260604 번역 */,
                title: "A Reliable and Convenient Support System"/* 260604 번역 */,
                desc: "With a smart operation system and one-on-one customized management from sales experts, you don't have to worry even if it's your first business."/* 260604 번역 */,
            },
            {
                em: "Differentiation concept"/* 260604 번역 */,
                title: "Competitive products/concepts"/* 260604 번역 */,
                desc: "From mega-hit products to fresh-focused stores, GS25's unique differentiated concepts drive up sales."/* 260604 번역 */,
            },
        ],
        brandSolutionPanel: {
            title: "Don't worry even if it's your first startup.",
            desc: "We'll find customized solutions that fit your situation.",
        },
        brandSolutionCards: [
            {
                title: "Franchise type introduction"/* 260604 번역 */,
                desc: "3 types that fit you perfectly"/* 260604 번역 */,
                d1: 1,
                d2: 1,
            },
            {
                title: "Startup process guide"/* 260604 번역 */,
                desc: "Minimum 30 days until your store opens!"/* 260604 번역 */,
                d1: 1,
                d2: 0,
            },
            {
                title: "Apply for 1:1 consultation"/* 260604 번역 */,
                desc: "Free consultation with regional startup experts,<br />apply now"/* 260604 번역 */,
                d1: 3, /**26.07.01 edit 정다희 */
                d2: 1, /**26.07.01 edit 정다희 */
            },
        ],

        // 26.07.01 add 정다희 : title, compare 추가 
        franchise: {
            title: "Meet GS THE FRESH's 3 customized franchise types."/* 260604 번역 */,
            tabAria: "Franchise Type"/* 260604 번역 */,
            tableHead: {
                item: "Item"/* 260604 번역 */,
                cost: "Cost"/* 260604 번역 */,
            },
            compare: { /* 26.07.01 add 정다희  */
                typeHeader: "Franchise Type"/* 260604 번역 */,
                types: [
                    { name: "GSF1", desc: "Headquarters leases and store owner operates"/* 260604 번역 */, themeClass: "is_gsf1" },
                    { name: "GSF2", desc: "Store owner bears 51% of total investment<br class=\"m_br\" />Store owner operates"/* 260604 번역 */, themeClass: "is_gsf2" },
                    { name: "GSF3", desc: "Store owner leases and store owner operates"/* 260604 번역 */, themeClass: "is_gsf3" },
                ],
                investAmount: "Investment amount"/* 260604 번역 */,
                openInvest: "O<br />p<br />e<br />n",
                franchiseFee: "Franchise Fee"/* 260604 번역 */,
                initialProduct: "Initial merchandise cost"/* 260604 번역 */,
                supplies: "Consumables",
                facilityDeposit: "Facility Deposit"/* 260604 번역 */,
                openInvestTotal: "Opening Investment Total"/* 260604 번역 */,
                amount1100: "11 million won (VAT included)"/* 260604 번역 */,
                amount7000: "70 million won"/* 260604 번역 */,
                amount700: "7 million won"/* 260604 번역 */,
                amount500: "5 million won"/* 260604 번역 */,
                amount9300: "93 million won"/* 260604 번역 */,
                rentEntity: "Party responsible for lease costs"/* 260604 번역 */,
                facilityEntity: "Party Bearing Facility Investment"/* 260604 번역 */,
                escrowDeposit: "Security Deposit",
                headOffice: "Headquarters"/* 260604 번역 */,
                headInvest: "Headquarters investment"/* 260604 번역 */,
                owner: "Store owner"/* 260604 번역 */,
                escrowGsf1Main: "100 million won"/* 260604 번역 */,
                escrowGsf1Sub: "(guarantee insurance or cash)"/* 260604 번역 */,
                escrowGsf2: "* Total store investment x 51% - 93 million won<br /><span class=\"td_sub\">(cash)</span>"/* 260604 번역 */,
                none: "None"/* 260604 번역 */,
                ownerInvestTotal: "Total Store Owner Investment"/* 260604 번역 */,
                totalGsf1: "Minimum 193 million won"/* 260604 번역 */,
                totalGsf2: "93 million won + deposit"/* 260604 번역 */,
                totalGsf3: "93 million won + lease cost"/* 260604 번역 */,
                royalty: "Franchise Fee<br />(VAT not included)"/* 260604 번역 */,
                rateGsf1: "52%",
                rateGsf1Sub: "By gross profit tier<br class=\"m_br\" />52% ~ 62%"/* 260604 번역 */,
                rateGsf2: "49%",
                rateGsf2Sub: "By gross profit tier<br class=\"m_br\" />49% ~ 55%"/* 260604 번역 */,
                rateGsf3: "24%",
                contractPeriod: "Contract Period<br />(initial/renewal)"/* 260604 번역 */,
                periodGsf12: "3 years / in 3-year units"/* 260604 번역 */,
                periodGsf3: "5 years / in 5-year units"/* 260604 번역 */,
                collateral: "Collateral Setup"/* 260604 번역 */,
                collateralGsf2: "50 million won"/* 260604 번역 */,
                collateralGsf3: "Minimum 200 million won or more"/* 260604 번역 */,
                minIncomeSubsidy: "** Minimum income subsidy"/* 260604 번역 */,
                subsidyGsf12: "Sales area over 200㎡: 18 million/month<br />Sales area 165㎡ to 200㎡: 16 million/month<br />Sales area under 165㎡: 13 million/month"/* 260604 번역 */,
                subsidyGsf3: "Not applicable"/* 260604 번역 */,
                scrollHint: "You can scroll left and right to view the full content."/* 260604 번역 */, /* 26.07.01 add 정다희 : 가맹타입 비교 테이블 가로 스크롤 안내 */
                notes: [
                    "* Total store investment is the sum of lease costs, facility investment costs, and opening investment costs."/* 260604 번역 */,
                    "** Based on the store owner's total income (monthly gross sales profit + headquarters support), before deducting operating expenses such as labor costs. (Applies for a minimum of 1 year from opening date only)"/* 260604 번역 */,
                ],
            },
            guideTypes: [
                {
                    tab: "Comprehensive Guide by Type"/* 26.07.01 add 정다희 */,
                    isCompare: true, /* 26.07.01 add 정다희 */
                },
                {
                    tab: "GSF1 Type"/* 260604 번역 */,
                    hasSubMainCol: true,
                    infoBar: "GSF1 Type - headquarters leases and store owner operates"/* 260604 번역 */,
                    tableRows: [
                        { main: "Investment amount"/* 260604 번역 */, mainRowspan: 9, subMain: "Opening Investment"/* 260604 번역 */, subMainRowspan: 5, sub: "Franchise Fee"/* 260604 번역 */, cost: `11 million won <br class=\"m_br\">(VAT included)`/* 260604 번역 */ },
                        { sub: "Initial merchandise cost"/* 260604 번역 */, cost: "70 million won"/* 260604 번역 */ },
                        { sub: "Consumables", cost: "7 million won"/* 260604 번역 */ },
                        { sub: "Facility Deposit"/* 260604 번역 */, cost: "5 million won"/* 260604 번역 */ },
                        { sub: "Opening Investment Total"/* 260604 번역 */, cost: "93 million won"/* 260604 번역 */ },
                        { sub: "Party responsible for lease costs"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "Headquarters"/* 260604 번역 */ },
                        { sub: "Party Bearing Facility Investment"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "Headquarters"/* 260604 번역 */ },
                        { sub: "Security Deposit", subColspan: 2, scope: "row", cost: "100 million won (guarantee insurance or cash)"/* 260604 번역 */ },
                        { sub: "Total Store Owner Investment"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "93 million won + deposit"/* 260604 번역 */, isGray: true },
                        { sub: `Franchise Fee <br class=\"m_br\">(VAT not included)`/* 260604 번역 */, subColspan: 3, scope: "row", cost: "52% of Gross Profit (52% to 62% by tier)"/* 260604 번역 */ },
                        { sub: "Contract Period", subColspan: 3, scope: "row", cost: "3 years or more / in 3-year units"/* 260604 번역 */ },
                        { sub: "Collateral Setup"/* 260604 번역 */, subColspan: 3, scope: "row", cost: "None"/* 260604 번역 */ },
                        { sub: "Minimum operating cost subsidy"/* 260604 번역 */, subColspan: 3, scope: "row", cost: "Sales area over 200㎡ (60 pyeong): 18 million/month<br />Sales area 165㎡ (50–60 pyeong) or more to 200㎡ or less: 16 million/month<br />Sales area under 165㎡ (50 pyeong): 13 million/month    *Application period: First 1 year"/* 260604 번역 */ },
                    ],
                    cautions: [
                        { text: "* Based on the store owner's total income (store owner's monthly gross sales profit + headquarters support funds), before deducting operating expenses such as labor costs. (Applies for a minimum of 1 year from the opening date only)"/* 260604 번역 */ },
                    ],
                    graph: {
                        title: "GSF1 Type"/* 260604 번역 */,
                        items: [
                            { label: `Gross Profit<br class=\"p_br\" />Distribution Rate`/* 260604 번역 */, img: imgGph01, imgMo: imgGph01Mo, alt: "GSF1 Type sales profit distribution rate"/* 260604 번역 */ },
                            { label: `Monthly sales<br class=\"p_br\" />Total profit range`/* 260604 번역 */, img: imgGph02, imgMo: imgGph02Mo, alt: "GSF1 Type monthly gross sales profit bracket"/* 260604 번역 */ },
                        ],
                    },
                },
                {
                    tab: "GSF2 Type"/* 260604 번역 */,
                    infoBar: "GSF2 Type - store owner bears 51% of total investment cost. Store owner operates"/* 260604 번역 */,
                    tableRows: [
                        { main: "Investment amount"/* 260604 번역 */, mainRowspan: 9, subMain: "Opening Investment"/* 260604 번역 */, subMainRowspan: 5, sub: "Franchise Fee"/* 260604 번역 */, cost: `11 million won <br class=\"m_br\">(VAT included)`/* 260604 번역 */ },
                        { sub: "Initial merchandise cost"/* 260604 번역 */, cost: "70 million won"/* 260604 번역 */ },
                        { sub: "Consumables", cost: "7 million won"/* 260604 번역 */ },
                        { sub: "Facility Deposit"/* 260604 번역 */, cost: "5 million won"/* 260604 번역 */ },
                        { sub: "Opening Investment Total"/* 260604 번역 */, cost: "93 million won"/* 260604 번역 */ },
                        { sub: "Party responsible for lease costs"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "Headquarters"/* 260604 번역 */ },
                        { sub: "Party Bearing Facility Investment"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "Headquarters"/* 260604 번역 */ },
                        { sub: "Security Deposit", subColspan: 2, scope: "row", cost: "* Total store investment cost X 51% ~ 93 million won (cash)"/* 260604 번역 */ },
                        { sub: "Total Store Owner Investment"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "93 million won + deposit"/* 260604 번역 */, },
                        { sub: `Franchise Fee <br class=\"m_br\">(VAT not included)`/* 260604 번역 */, subColspan: 3, scope: "row", cost: "49% of Gross Profit (49% to 55% by tier)"/* 260604 번역 */, isGray: true },
                        { sub: "Contract Period", subColspan: 3, scope: "row", cost: "3 years / in 3-year units"/* 260604 번역 */ },
                        { sub: "Collateral Setup"/* 260604 번역 */, subColspan: 3, scope: "row", cost: "50 million won (guarantee insurance available)"/* 260604 번역 */ },
                        { sub: "** Minimum income subsidy"/* 260604 번역 */, subColspan: 3, scope: "row", cost: "Sales area over 200㎡ (60 pyeong): 18 million/month<br />Sales area 165㎡ (50–60 pyeong) or more to 200㎡ or less: 16 million/month<br />Sales area under 165㎡ (50 pyeong): 13 million/month    *Application period: First 1 year"/* 260604 번역 */ },
                    ],
                    cautions: [
                        { text: "* The total store investment cost is the sum total of leasing costs, facility investment costs, and opening investment costs."/* 260604 번역 */ },
                        { text: "** Based on the store owner's total income (store owner's monthly gross sales profit + headquarters support funds), before deducting operating expenses such as labor costs. (Applies for a minimum of 1 year from the opening date only)"/* 260604 번역 */ },
                        { text: "** The minimum operating cost subsidy is based on the store owner's total income (store owner's monthly gross sales profit + headquarters support funds), before deducting operating expenses such as labor costs. (Applies for the first 1 year from the opening date)"/* 260604 번역 */ },
                    ],
                    graph: {
                        title: "GSF2 Type"/* 260604 번역 */,
                        items: [
                            { label: `Gross Profit<br class=\"p_br\" />Distribution Rate`/* 260604 번역 */, img: imgGph03, imgMo: imgGph03Mo, alt: "GSF2 Type sales profit distribution rate"/* 260604 번역 */ },
                            { label: `Monthly sales<br class=\"p_br\" />Total profit range`/* 260604 번역 */, img: imgGph04, imgMo: imgGph04Mo, alt: "GSF2 Type monthly gross sales profit bracket"/* 260604 번역 */ },
                        ],
                    },
                    warning: "*The franchise fee may be set differently by agreement between the franchisee and the franchise headquarters during conclusion of the franchise contract"/* 260604 번역 */,
                },
                {
                    tab: "GSF3 Type"/* 260604 번역 */,
                    infoBar: "GSF3 Type - store owner leases and store owner operates"/* 260604 번역 */,
                    tableRows: [
                        { main: "Investment amount"/* 260604 번역 */, mainRowspan: 9, subMain: "Opening Investment"/* 260604 번역 */, subMainRowspan: 5, sub: "Franchise Fee"/* 260604 번역 */, cost: `11 million won <br class=\"m_br\">(VAT included)`/* 260604 번역 */ },
                        { sub: "Initial merchandise cost"/* 260604 번역 */, cost: "70 million won"/* 260604 번역 */ },
                        { sub: "Consumables", cost: "7 million won"/* 260604 번역 */ },
                        { sub: "Facility Deposit"/* 260604 번역 */, cost: "5 million won"/* 260604 번역 */ },
                        { sub: "Opening Investment Total"/* 260604 번역 */, cost: "93 million won"/* 260604 번역 */ },
                        { sub: "Party responsible for lease costs"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "Store Owner"/* 260604 번역 */ },
                        { sub: "Party Bearing Facility Investment"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "Headquarters"/* 260604 번역 */ },
                        { sub: "Security Deposit", subColspan: 2, scope: "row", cost: "None"/* 260604 번역 */ },
                        { sub: "Total Store Owner Investment"/* 260604 번역 */, subColspan: 2, scope: "row", cost: "93 million won + leasing cost"/* 260604 번역 */, isGray:true},
                        { sub: `Franchise Fee <br class=\"m_br\">(VAT not included)`/* 260604 번역 */, subColspan: 3, scope: "row", cost: "24%" },
                        { sub: "Contract Period", subColspan: 3, scope: "row", cost: "5 years or more / in 3-year units"/* 260604 번역 */ },
                        { sub: "Collateral Setup"/* 260604 번역 */, subColspan: 3, scope: "row", cost: "200 million won or more (guarantee insurance available)"/* 260604 번역 */ },
                        { sub: "** Minimum income subsidy"/* 260604 번역 */, subColspan: 3, scope: "row", cost: "260 million won/year (approx. 21.67 million won/month)"/* 260604 번역 */ },
                    ],
                    cautions: [
                        { text: `* Based on the store owner's total income (store owner's monthly gross sales profit + headquarters support funds), before deducting operating expenses such as labor costs. <br class=\"m_br\"/>(Applies for a minimum of 1 year from the opening date only)`/* 260604 번역 */ },
                        { text: "* The minimum operating cost subsidy is based on the store owner's total income (store owner's monthly gross sales profit + headquarters support funds), before deducting operating expenses such as labor costs. (Applies for the first 1 year from the opening date)"/* 260604 번역 */ },
                    ],
                },
            ],
        },
        procedure: {
            buttonHref: "#none",
            buttonLabel: "Go to Briefing Session Application"/* 260604 번역 */,
            steps: [
                { step: "Step 1", title: "Attend Business Briefing Session"/* 260604 번역 */, text: "GS THE FRESH Franchise Contract<br />Conditions guide and procedure introduction"/* 260604 번역 */, numColor: "#15b874" },
                { step: "Step 2", title: "Application reception"/* 260604 번역 */, text: "Applications can be submitted any time, Monday through Friday"/* 260604 번역 */, numColor: "#15b874" },
                { step: "Step 3", title: "Store Owner Interview"/* 260604 번역 */, text: "Conducting an interview based on the application,<br />Conducted Business Feasibility Review"/* 260604 번역 */, numColor: "#15b874" },
                { step: "Step 4", title: "Store introduction"/* 260604 번역 */, text: "Prospective store owner's preferences and<br />We introduce stores that meet the conditions"/* 260604 번역 */, numColor: "#15b874" },
                { step: "Step 5", title: "Franchise Agreement (if necessary)"/* 260604 번역 */, text: "Final confirmation of intent to operate the referred store and<br />Payment of Agreement Fee"/* 260604 번역 */, numColor: "#15b874" },
                { step: "Step 6", title: "Main Franchise Contract"/* 260604 번역 */, text: "Final payment of the main contract fee and<br />Signing of the Main Contract"/* 260604 번역 */, numColor: "#15b874" },
                { step: "Step 7", title: "Completion of Store Owner Training"/* 260604 번역 */, text: "On-site store OJT,<br />Introductory training (theory/practice)"/* 260604 번역 */, numColor: "#15b874" },
                { step: "Step 8", title: "GRAND OPEN", text: "Open after product inventory check"/* 260604 번역 */, numColor: "#15b874" },
                { step: "Step 9", title: "Store operation"/* 260604 번역 */, text: "the store operation support staff's<br />Periodic visits and consulting"/* 260604 번역 */, numColor: "#15b874" },
            ],
        },
        precaution: {
            subHeaderTitle: "Essential Items to Confirm Before Startup"/* 260604 번역 */, /* 26.07.01 add 정다희 */
            title: `Franchise Termination<br class=\"p_br\">Fee`/* 260604 번역 */,
            blockTitle1: "GSF1, GSF2 Type"/* 260604 번역 */,
            blockTitle2: "GSF3 Type"/* 260604 번역 */,
            blockTitle2Desc: "Based on the franchise headquarters' accounting standards, the depreciated residual value is compensated separately"/* 260604 번역 */,
            cards1: [
                { num: "01", title: "Mid-term contract termination"/* 260604 번역 */, desc: "· Monthly average gross sales profit over the past 1 year 20% X 3 months (3 times)"/* 260604 번역 */ },
                { num: "02", title: "When a cause for immediate contract termination arises"/* 260604 번역 */, desc: "· Monthly average gross sales profit over the past 1 year 20% X 6 months (6 times)"/* 260604 번역 */ },
            ],
            cards2: [
                { num: "01", title: "Mid-term contract termination"/* 260604 번역 */, desc: ["· Less than 3 years: monthly average gross sales profit over the past 1 year 24% X 8 months (8 times) + facility residual value"/* 260604 번역 */, "· Within 3 to 5 years: 76(74)% over 4 months"/* 260604 번역 */, "· Store owner calculation"/* 260604 번역 */, "· 3 years or more: monthly average gross sales profit over the past 1 year 24% X 4 months (4 times) + facility residual value"/* 260604 번역 */] },
                { num: "02", title: "When a cause for immediate contract termination arises"/* 260604 번역 */, desc: ["· Regardless of operating period, monthly average gross sales profit over the past 1 year 24% X 12 months (12 times) + facility residual"/* 260604 번역 */] },
            ],
            cautions: [
                "* Damages are charged separately, and if the past operating period is 1 year or less, the applicable operating period is applied."/* 260604 번역 */,
                "* The 'past 1 year' period is, in the case of early termination of management funds, the period nearest to the month of early termination; in the case of a termination cause arising, it is calculated from the last day of the month immediately preceding the month in which the contract termination cause arose."/* 260604 번역 */,
            ],
        },
        seminar: {
            headDesc: `For the GS THE FRESH (GS Supermarket) franchise business,<br class=\"p_br\">Join a business briefing where you can obtain detailed and diverse information.`/* 260604 번역 */,
            applyButtonLabel: "Apply for Business Briefing Session"/* 260604 번역 */,
            list: [
                {
                    title: "Capital Region Business Briefing Session"/* 260604 번역 */,
                    rows: [
                        { label: "Date and time"/* 260604 번역 */, value: "Twice a Month"/* 260604 번역 */ },
                        { label: "Eligibility"/* 260604 번역 */, value: "Those wishing to open a GS THE FRESH store in Seoul, Gyeonggi, or Incheon"/* 260604 번역 */ },
                        { label: "Items to prepare"/* 260604 번역 */, value: "Writing tools"/* 260604 번역 */ },
                        { label: "Location"/* 260604 번역 */, value: "B1 GS Tower, 508 Nonhyeon-ro, Gangnam-gu, Seoul"/* 260604 번역 */ },
                        { label: "Other", value: "Inquiries: 02-2006-2954, 2933"/* 260604 번역 */ },
                    ],
                },
                {
                    title: "Central region business briefing"/* 260604 번역 */,
                    rows: [
                        { label: "Date and time"/* 260604 번역 */, value: "Once a Month"/* 260604 번역 */ },
                        { label: "Eligibility"/* 260604 번역 */, value: "Those wishing to open a GS THE FRESH in Chungcheong, Gangwon, or Jeju"/* 260604 번역 */ },
                        { label: "Items to prepare"/* 260604 번역 */, value: "Writing tools"/* 260604 번역 */ },
                        { label: "Location"/* 260604 번역 */, value: "3F Gukbo Meeting Space, 167 Daejong-ro, Jung-gu, Daejeon"/* 260604 번역 */ },
                        { label: "Other", value: "Inquiries: 010-2141-2816 (Text or KakaoTalk)"/* 260604 번역 */ },
                    ],
                },
                {
                    title: "Yeongnam/Honam Business Briefing Session"/* 260604 번역 */,
                    rows: [
                        { label: "Date and time"/* 260604 번역 */, value: "Once a Month"/* 260604 번역 */ },
                        { label: "Eligibility"/* 260604 번역 */, value: "Those wishing to open a GS THE FRESH in Jeolla-do or Gyeongsang-do"/* 260604 번역 */ },
                        { label: "Items to prepare"/* 260604 번역 */, value: "Writing tools"/* 260604 번역 */ },
                        { label: "Location"/* 260604 번역 */, value: "2F Sinhyeon Building, 190 World Cup-daero, Yeonje-gu, Busan"/* 260604 번역 */ },
                        { label: "Other", value: "Inquiries: 02-2006-2363"/* 260604 번역 */ },
                    ],
                },
            ],
        },
        store: {
            intro: "Based on thorough commercial district research, we introduce the optimal store for your franchise/startup."/* 260604 번역 */,
            regionLabel: "Region"/* 260604 번역 */,
            allLabel: "All",
            franchiseTypeLabel: "Franchise Type"/* 260604 번역 */,
            storeTypeLabel: "Store type/youth startup"/* 260604 번역 */,
            storeTypeOptions: [
                { value: "New Store"/* 260604 번역 */, label: "New Store"/* 260604 번역 */ },
                { value: "Existing Store"/* 260604 번역 */, label: "Existing Store"/* 260604 번역 */ },
            ],
            youthLabel: "Youth startup"/* 260604 번역 */,
            youthShortLabel: "Youth"/* 260604 번역 */,
            youthInfoAria: "Youth startup guide"/* 260604 번역 */,
            youthPopoverTitle: "What is a youth startup?"/* 260604 번역 */,
            youthPopoverDesc: "This is a system that offers a discount on part of the investment cost for young people in their 20s."/* 260604 번역 */,
            youthPopoverLinkLabel: "Go to youth startup details"/* 260604 번역 */,
            youthPopoverHref: "#",
            closeAria: "Close"/* 260604 번역 */,
            searchLabel: "Search",
            searchPlaceholder: "Region name, tag...."/* 260604 번역 */,
            searchAria: "Search",
            countPrefix: "Total"/* 260604 번역 */,
            countSuffix: "stores"/* 260604 번역 */,
            sortLatest: "Most recent"/* 260604 번역 */,
            sortCost: "Lowest investment cost"/* 260604 번역 */,
            viewListAria: "List View"/* 260604 번역 */,
            viewGridAria: "Grid Type"/* 260604 번역 */,
            tableHeaders: ["Region"/* 260604 번역 */, "Type"/* 260604 번역 */, "Type"/* 260604 번역 */, "Investment cost"/* 260604 번역 */, "Hashtag"/* 260604 번역 */, "Area", "Registration Date"/* 260604 번역 */, "Details"/* 260604 번역 */],
            detailOpenLabel: "Details"/* 260604 번역 */,
            detailCloseLabel: "Collapse"/* 260604 번역 */,
            regions: [
                { value: "Seoul", label: "Seoul", count: 4 },
                { value: "Gyeonggi", label: "Gyeonggi", count: 4 },
                { value: "Incheon", label: "Incheon", count: 4 },
                { value: "Busan", label: "Busan", count: 4 },
                { value: "Daegu", label: "Daegu", count: 4 },
                { value: "Daejeon", label: "Daejeon", count: 4 },
                { value: "Gwangju", label: "Gwangju", count: 4 },
                { value: "Ulsan", label: "Ulsan", count: 4 },
                { value: "Sejong", label: "Sejong", count: 1 },
                { value: "Gangwon", label: "Gangwon", count: 4 },
                { value: "North Chungcheong", label: "North Chungcheong", count: 4 },
                { value: "South Chungcheong", label: "South Chungcheong", count: 4 },
                { value: "North Jeolla", label: "North Jeolla", count: 4 },
                { value: "South Jeolla", label: "South Jeolla", count: 4 },
                { value: "North Gyeongsang", label: "North Gyeongsang", count: 4 },
                { value: "South Gyeongsang", label: "South Gyeongsang", count: 4 },
                { value: "Jeju", label: "Jeju", count: 2 },
            ],
            franchiseTypes: [
                { value: "GS1", label: "GS1 (store owner lease)"/* 260604 번역 */ },
                { value: "GS2", label: "GS2 (lease jointly shared)"/* 260604 번역 */ },
                { value: "GS3", label: "GS3 (lease borne by headquarters)"/* 260604 번역 */ },
            ],
            list: [
                { id: 1, region: "Daejeon Dong-gu"/* 260604 번역 */, type: ["GS1", "GS2"], form: "Existing Store"/* 260604 번역 */, isYouth: false, cost: "72 million won"/* 260604 번역 */, tags: "#BusStop #MainStreet"/* 260604 번역 */, area: "18 pyeong"/* 260604 번역 */, date: "2025.12.24", feature: "Located on the first floor of a commercial space within a newly built apartment complex, demand from residents is stable."/* 260604 번역 */ },
                { id: 2, region: "Gangwon Wonju-si"/* 260604 번역 */, type: ["GS2", "GS3"], form: "Existing Store"/* 260604 번역 */, isYouth: true, cost: "105 million won"/* 260604 번역 */, tags: "#BusStop #MainStreet"/* 260604 번역 */, area: "22 pyeong"/* 260604 번역 */, date: "2025.12.24", feature: "Located in a commercial area adjacent to a large mart with heavy foot traffic, stable sales are expected."/* 260604 번역 */ },
                { id: 3, region: "Daegu Seo-gu"/* 260604 번역 */, type: ["GS1"], form: "Existing Store"/* 260604 번역 */, isYouth: true, cost: "50 million won"/* 260604 번역 */, tags: "#DowntownDistrict #BusStop"/* 260604 번역 */, area: "14 pyeong"/* 260604 번역 */, date: "2025.09.21", feature: "Located near a subway station exit, there is abundant demand from commuting customers."/* 260604 번역 */ },
                { id: 4, region: "Daejeon Dong-gu"/* 260604 번역 */, type: ["GS3"], form: "Existing Store"/* 260604 번역 */, isYouth: false, cost: "72 million won"/* 260604 번역 */, tags: "#BusStop #MainStreet"/* 260604 번역 */, area: "18 pyeong"/* 260604 번역 */, date: "2025.12.24", feature: "Located on the first floor of a commercial space within a newly built apartment complex, demand from residents is stable."/* 260604 번역 */ },
                { id: 5, region: "Yeonsu-gu, Incheon"/* 260604 번역 */, type: ["GS2"], form: "Existing Store"/* 260604 번역 */, isYouth: false, cost: "80 million won"/* 260604 번역 */, tags: "#ResidentialArea #NearElementarySchool"/* 260604 번역 */, area: "20 pyeong"/* 260604 번역 */, date: "2025.11.10", feature: "As an exclusive commercial district within a densely residential area, a stable base of regular customers is established."/* 260604 번역 */ },
                { id: 6, region: "Iksan-si, Jeollabuk-do"/* 260604 번역 */, type: ["GS1", "GS2"], form: "Existing Store"/* 260604 번역 */, isYouth: true, cost: "45 million won"/* 260604 번역 */, tags: "#MainStreet #HighFootTraffic"/* 260604 번역 */, area: "15 pyeong"/* 260604 번역 */, date: "2025.10.05", feature: "Located in a downtown commercial center, customers of all ages visit constantly."/* 260604 번역 */ },
            ],
        },
        support: {
            intro: `GS THE FRESH is <br class=\"m_br\"/><span class='txt_green'>Mutual development with store owners</span>for <br />We operate various win-win programs.`/* 260604 번역 */,
            panelTitle: "Operations Support Programs",
            panelDesc: "These are support programs to facilitate smooth store operations for GS THE FRESH store owners.",
            cards: [
                { num: "01", title: "Minimum Revenue Guarantee", desc: "Based on the conditions at the time of the contract, the Company provides a minimum revenue guarantee through headquarters support funds to guarantee a minimum income to store owners for a set period from the opening date." },
                { num: "02", title: "Welfare and Benefits", desc: "Upon a life event (marriage or bereavement of the actual franchise store owner), Congratulations and Condolences allowances and flower wreaths are provided." },
                { num: "03", title: "Store Manager (Staff)<br />Job Posting Insight Support", desc: "Dedicated Banner Service for GS THE FRESH (Albachunguk)" },
                { num: "04", title: "Other Operational Support Programs", desc: "For underperforming stores, the headquarters carries out 'underperforming store care activities', and where settlement support is needed due to trade area characteristics or various issues, a 'new store early settlement support fund' is operated for specific stores. Additionally, where necessary, support funds are provided to improve sales at transferred stores, and an annual franchise support program is established and operated." },
            ],
        },
        consult: {
            depth2Tabs: [{ item: "Startup Briefing Application"/* 260604 번역 */ }, { item: "Franchise/Startup Consultation"/* 260604 번역 */ }, { item: "Location proposal consultation"/* 260604 번역 */ }], /**26.07.01 add 정다희 : 탭 추가, 탭 내용 수정*/ 
            panelTitle: "1:1 consultation with a consultant"/* 260604 번역 */,
            panelDesc: "A franchise/startup consultant will provide a 1:1 consultation. <br /> If you inquire with a franchise/startup consultant, you can receive a detailed consultation."/* 260604 번역 */,
            caution: ["※ Contact is not available on weekends and public holidays; please contact us on weekdays between 09:00 and 17:30."/* 260604 번역 */],
            label: "Consultant"/* 260604 번역 */,
            telButtonLabel: "Verify Contact Number"/* 260604 번역 */,
            tooltipTitle: "Contact",
            phoneLabel: "Phone Number",
            kakaoLabel: "KakaoTalk"/* 260604 번역 */,
            qrAlt: "QR Code",
            kakaoNotice: "* KakaoTalk consultation available"/* 260604 번역 */,
            closeAria: "Close"/* 260604 번역 */,
            applyButtonLabel: "Consultation Request"/* 260604 번역 */,
            infoBannerText: "For 'location' and 'store ownership' consultations, please check via the location proposal site."/* 260604 번역 */,
            infoBannerButtonLabel: "Go >",
            proposalPanelTitle: "Location proposal consultation"/* 260604 번역 */,
            proposalPanelDesc: "Consultations regarding store ownership and location are directed to location proposal consultation."/* 260604 번역 */,
            proposalCaution: "※ Location proposal consultations can be submitted through the location proposal site."/* 260604 번역 */,
            proposalButtonLabel: "Go to location consulting"/* 260604 번역 */,
            locationConsultHref: "http://gsthefresh.gsretail.com/thefresh/ko/franchise-info/one-on-ones-consult/offer-location",
            qrImageLabel: "QR image"/* 260604 번역 */,
            cards: [
                { name: "Yoon Gyeong-jin"/* 260604 번역 */, region: "• Metropolitan Area", note: "*Information sessions and startup inquiries"/* 260604 번역 */, tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_01.png"), link: "#none" },
                { name: "Lee Seung-hyun"/* 260604 번역 */, region: "• Metropolitan Area", note: "*Information sessions and startup inquiries"/* 260604 번역 */, tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_02.png"), link: "#none" },
                { name: "Nam Chang-ho"/* 260604 번역 */, region: "• Metropolitan Area", note: "*Information sessions and startup inquiries"/* 260604 번역 */, tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_03.png"), link: "#none" },
                { name: "Namgung Sin-yeong"/* 260604 번역 */, region: "Chungbuk/Gangwon region"/* 260604 번역 */, note: "*Information sessions and startup inquiries"/* 260604 번역 */, tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_04.png"), link: "#none" },
                { name: "Kim Su-jin"/* 260604 번역 */, region: "Yeongnam/Honam Region"/* 260604 번역 */, note: "*Information sessions and startup inquiries"/* 260604 번역 */, tel: "010-0000-0000", img: require("@/assets/images/dummy/gsrst01050101_05.png"), link: "#none" },
            ],
            proposalCards: [
                { name: "Location consulting reception"/* 260604 번역 */, region: "Nationwide"/* 260604 번역 */, note: "* Store ownership and location proposal consultation"/* 260604 번역 */ },
                { name: "Apply for location review"/* 260604 번역 */, region: "Nationwide"/* 260604 번역 */, note: "* Trade area/location review consultation"/* 260604 번역 */ },
                { name: "Store proposal inquiry"/* 260604 번역 */, region: "Nationwide"/* 260604 번역 */, note: "* Inquiries regarding location proposals"/* 260604 번역 */ },
            ],
        },
        intro: {
            title: `Hello!<br>GS THE FRESH 1:1 Consultation<br class=\"m_br\">This is consultant Yoon Gyeong-jin.`/* 260604 번역 */,
            desc: "If you fill out the consultation request form below, you can receive a personalized startup consultation. <br />If you are unable to reach our representative by phone, please submit a consultation request. Our representative will review it and contact you."/* 260604 번역 */,
            caution:["※ Size: exclusive area of 60 pyeong or more"/* 260604 번역 */, "※※ Please understand that immediate responses may be difficult on weekends/holidays."/* 260604 번역 */]
        },
        consultBox: {
            title: `Hello!<br />GS THE FRESH 1:1 Consultation<br class=\"m_br\">This is consultant Yoon Gyeong-jin.`/* 260604 번역 */,
            desc: "If you fill out the consultation request form below, you can receive a personalized startup consultation.<br />If you are unable to reach our representative by phone, please submit a consultation request. Our representative will review it and contact you."/* 260604 번역 */,
            consultantName: "Consultant Yoon Gyeong-jin"/* 260604 번역 */,
        },
        proposalConsultBox: {
            title: "Location proposal and store ownership consultation"/* 260604 번역 */,
            desc: "Regional representatives provide 1:1 customized consultation on GS THE FRESH locations.<br />If you submit a consultation request, our representative will review it and contact you."/* 260604 번역 */,
            caution: ["※ Size: exclusive area of 60 pyeong or more"/* 260604 번역 */, "※※ Please understand that immediate responses may be difficult on weekends/holidays."/* 260604 번역 */],
        },
        proposalForm: {
            regionLabel: "Select location proposal area"/* 260604 번역 */,
            sidoInitMsg: "Select Region",
            sigunguInitMsg: "Select District/County"/* 260604 번역 */,
        },
        proposalCustomerForm: {
            title: "Customer Information",
            nameLabel: "Name",
            emailLabel: "Email",
            emailPlaceholder: "Enter directly",
            phoneLabel: "Mobile phone"/* 260604 번역 */,
            storeAddressLabel: "Recommended store location"/* 260604 번역 */,
            zipButtonLabel: "Find postal code"/* 260604 번역 */,
            addressNote: `<span class=\"form_required\">*</span> The recommended store location is a required field.`/* 260604 번역 */,
            storeAreaLabel: "Recommended store area"/* 260604 번역 */,
            contractAreaLabel: "Contract Area"/* 260604 번역 */,
            exclusiveAreaLabel: "Net floor area"/* 260604 번역 */,
            areaUnit: "pyeong"/* 260604 번역 */,
            areaNote: "* Pyeong = (standard) pyeong x 3.3"/* 260604 번역 */,
            legalNotice: "* The legal measurement is based on the contract area."/* 260604 번역 */,
            storeNameLabel: "Store name"/* 260604 번역 */,
            commercialFeatureLabel: "Commercial Area Characteristics"/* 260604 번역 */,
            commercialFeaturePlaceholder: "Please enter the characteristics of the commercial area."/* 260604 번역 */,
            ownerRelationLabel: "Relationship with the Building Owner"/* 260604 번역 */,
        },
        consent: {
            title: "Consent to Collection and Use of Personal Information",
            items: [
                `- The information you enter is used only for location consultation. The collected items, use and purpose, and retention and use period are as follows; for other matters regarding the handling of personal information, please refer to the \"Privacy Policy\" at the bottom of the homepage.`/* 260604 번역 */,
                "- Personal information items collected: name, email, mobile phone number, owned store address (city, district/county)"/* 260604 번역 */,
                "- Collection, use, and purpose: The collected personal information is used to identify the individual and to confirm and respond to inquiries"/* 260604 번역 */,
                "- Retention and Use Period: One year after receipt",
            ],
            noticeHtml: "You have the right to refuse this consent; however, if you do not consent, <br />You cannot submit a business briefing session application."/* 260604 번역 */,
        },

        consent2: {
            title: "Consent to Collection and Use of Personal Information",
            items: [
                `- The information you enter is used only for location consultation. The collected items, use and purpose, and retention and use period are as follows; for other matters regarding the handling of personal information, please refer to the \"Privacy Policy\" at the bottom of the homepage.`/* 260604 번역 */,
                "- Personal information items collected: name, email, mobile phone number"/* 260604 번역 */,
                "- Collection, use, and purpose: The collected personal information is used to identify the individual and to confirm and respond to inquiries"/* 260604 번역 */,
                "- Retention and Use Period: One year after receipt",
            ],
            noticeHtml: "You have the right to refuse this consent; however, if you do not consent,<br />You cannot create a location proposal application post."/* 260604 번역 */,
        },
        storeButtons: {
            hasStore: "I own a store."/* 260604 번역 */,
            noStore: "I do not own a store."/* 260604 번역 */,
        },
        requiredNote: "* Required fields",
        customerForm: {
            title: "Customer Information",
            nameLabel: "Name",
            emailLabel: "Email",
            emailPlaceholder: "Enter directly",
            phoneLabel: "Contact",
            addressLabel: `Owned Store Address <br class=\"p_br\"/>(Past or current store ownership <br class=\"p_br\">Applicants only)<span class=\"form_required\">*</span>`/* 260604 번역 */,
            sidoInitMsg: "Select Region",
            sigunguInitMsg: "Select District/County"/* 260604 번역 */,
        },
        consultForm: {
            title: "Consultation Content",
            areaLabel: "Owned Store Area"/* 260604 번역 */,
            contractAreaLabel: "Contract Area"/* 260604 번역 */,
            exclusiveAreaLabel: "Net floor area"/* 260604 번역 */,
            areaUnit: "m²",
            areaNote: "* m² = (standard) pyeong x 3.3"/* 260604 번역 */,
            superOperatorLabel: "If you are a supermarket operator"/* 260604 번역 */,
            itemCheckLabel: "Check items handled"/* 260604 번역 */,
            etcLabel: "Other",
            contractLabel: "Contract Terms"/* 260604 번역 */,
            contractPeriodLabel: "Contract Period",
            depositRentLabel: "Deposit/Monthly Rent"/* 260604 번역 */,
            rentUnit: "10,000 KRW"/* 260604 번역 */,
            superItemOptions: [
                { value: "Agricultural Products"/* 260604 번역 */, label: "Agricultural Products"/* 260604 번역 */ },
                { value: "Livestock", label: "Livestock" },
                { value: "Seafood", label: "Seafood" },
                { value: "Manufactured Goods"/* 260604 번역 */, label: "Manufactured Goods"/* 260604 번역 */ },
                { value: "Cooking"/* 260604 번역 */, label: "Cooking"/* 260604 번역 */ },
            ],
            sidoOptions: [
                { value: "Seoul", label: "Seoul Special City"/* 260604 번역 */ },
                { value: "Busan", label: "Busan Metropolitan City"/* 260604 번역 */ },
                { value: "Daegu", label: "Daegu Metropolitan City"/* 260604 번역 */ },
                { value: "Incheon", label: "Incheon Metropolitan City"/* 260604 번역 */ },
                { value: "Gwangju", label: "Gwangju Metropolitan City"/* 260604 번역 */ },
                { value: "Daejeon", label: "Daejeon Metropolitan City"/* 260604 번역 */ },
                { value: "Ulsan", label: "Ulsan Metropolitan City"/* 260604 번역 */ },
                { value: "Sejong", label: "Sejong Special Self-Governing City"/* 260604 번역 */ },
                { value: "Gyeonggi", label: "Gyeonggi Province" },
                { value: "Gangwon", label: "Gangwon Special Self-Governing Province"/* 260604 번역 */ },
                { value: "North Chungcheong", label: "Chungcheongbuk-do"/* 260604 번역 */ },
                { value: "South Chungcheong", label: "South Chungcheong Province" },
                { value: "North Jeolla", label: "Jeonbuk State"/* 260604 번역 */ },
                { value: "South Jeolla", label: "South Jeolla Province" },
                { value: "North Gyeongsang", label: "Gyeongsangbuk-do"/* 260604 번역 */ },
                { value: "South Gyeongsang", label: "South Gyeongsang Province" },
                { value: "Jeju", label: "Jeju Special Self-Governing Province"/* 260604 번역 */ },
            ],
            sigunguMap: {
                서울: ["Jongno-gu"/* 260604 번역 */, "Jung-gu"/* 260604 번역 */, "Yongsan-gu"/* 260604 번역 */, "Seongdong-gu"/* 260604 번역 */, "Gwangjin-gu"/* 260604 번역 */, "Dongdaemun-gu"/* 260604 번역 */, "Jungnang-gu"/* 260604 번역 */, "Seongbuk-gu"/* 260604 번역 */, "Gangbuk-gu"/* 260604 번역 */, "Dobong-gu"/* 260604 번역 */, "Nowon-gu"/* 260604 번역 */, "Eunpyeong-gu"/* 260604 번역 */, "Seodaemun-gu"/* 260604 번역 */, "Mapo-gu"/* 260604 번역 */, "Yangcheon-gu"/* 260604 번역 */, "Gangseo-gu"/* 260604 번역 */, "Guro-gu"/* 260604 번역 */, "Geumcheon-gu"/* 260604 번역 */, "Yeongdeungpo-gu"/* 260604 번역 */, "Dongjak-gu"/* 260604 번역 */, "Gwanak-gu"/* 260604 번역 */, "Seocho-gu"/* 260604 번역 */, "Gangnam-gu"/* 260604 번역 */, "Songpa-gu"/* 260604 번역 */, "Gangdong-gu"/* 260604 번역 */],
                부산: ["Jung-gu"/* 260604 번역 */, "Seo-gu"/* 260604 번역 */, "Dong-gu"/* 260604 번역 */, "Yeongdo-gu"/* 260604 번역 */, "Busanjin-gu"/* 260604 번역 */, "Dongnae-gu"/* 260604 번역 */, "Nam-gu"/* 260604 번역 */, "Buk-gu"/* 260604 번역 */, "Haeundae-gu"/* 260604 번역 */, "Saha-gu"/* 260604 번역 */, "Geumjeong-gu"/* 260604 번역 */, "Gangseo-gu"/* 260604 번역 */, "Yeonje-gu"/* 260604 번역 */, "Suyeong-gu"/* 260604 번역 */, "Sasang-gu"/* 260604 번역 */, "Gijang-gun"/* 260604 번역 */],
                대구: ["Jung-gu"/* 260604 번역 */, "Dong-gu"/* 260604 번역 */, "Seo-gu"/* 260604 번역 */, "Nam-gu"/* 260604 번역 */, "Buk-gu"/* 260604 번역 */, "Suseong-gu"/* 260604 번역 */, "Dalseo-gu"/* 260604 번역 */, "Dalseong-gun"/* 260604 번역 */, "Gunwi-gun"/* 260604 번역 */],
                인천: ["Jung-gu"/* 260604 번역 */, "Dong-gu"/* 260604 번역 */, "Michuhol-gu"/* 260604 번역 */, "Yeonsu-gu"/* 260604 번역 */, "Namdong-gu"/* 260604 번역 */, "Bupyeong-gu"/* 260604 번역 */, "Gyeyang-gu"/* 260604 번역 */, "Seo-gu"/* 260604 번역 */, "Ganghwa-gun"/* 260604 번역 */, "Ongjin-gun"/* 260604 번역 */],
                광주: ["Dong-gu"/* 260604 번역 */, "Seo-gu"/* 260604 번역 */, "Nam-gu"/* 260604 번역 */, "Buk-gu"/* 260604 번역 */, "Gwangsan-gu"/* 260604 번역 */],
                대전: ["Dong-gu"/* 260604 번역 */, "Jung-gu"/* 260604 번역 */, "Seo-gu"/* 260604 번역 */, "Yuseong-gu"/* 260604 번역 */, "Daedeok-gu"/* 260604 번역 */],
                울산: ["Jung-gu"/* 260604 번역 */, "Nam-gu"/* 260604 번역 */, "Dong-gu"/* 260604 번역 */, "Buk-gu"/* 260604 번역 */, "Ulju-gun"/* 260604 번역 */],
                세종: ["Sejong-si"/* 260604 번역 */],
                경기: ["Suwon-si"/* 260604 번역 */, "Seongnam-si"/* 260604 번역 */, "Uijeongbu-si"/* 260604 번역 */, "Anyang-si"/* 260604 번역 */, "Bucheon-si"/* 260604 번역 */, "Gwangmyeong-si"/* 260604 번역 */, "Pyeongtaek-si"/* 260604 번역 */, "Dongducheon-si"/* 260604 번역 */, "Ansan-si"/* 260604 번역 */, "Goyang-si"/* 260604 번역 */, "Gwacheon-si"/* 260604 번역 */, "Guri-si"/* 260604 번역 */, "Namyangju-si"/* 260604 번역 */, "Osan-si"/* 260604 번역 */, "Siheung-si"/* 260604 번역 */, "Gunpo-si"/* 260604 번역 */, "Uiwang-si"/* 260604 번역 */, "Hanam-si"/* 260604 번역 */, "Yongin-si"/* 260604 번역 */, "Paju-si"/* 260604 번역 */, "Icheon-si"/* 260604 번역 */, "Anseong-si"/* 260604 번역 */, "Gimpo-si"/* 260604 번역 */, "Hwaseong-si"/* 260604 번역 */, "Gwangju-si"/* 260604 번역 */, "Yangju-si"/* 260604 번역 */, "Pocheon-si"/* 260604 번역 */, "Yeoju-si"/* 260604 번역 */, "Yeoncheon-gun"/* 260604 번역 */, "Gapyeong-gun"/* 260604 번역 */, "Yangpyeong-gun"/* 260604 번역 */],
                강원: ["Chuncheon-si"/* 260604 번역 */, "Wonju-si"/* 260604 번역 */, "Gangneung-si"/* 260604 번역 */, "Donghae-si"/* 260604 번역 */, "Taebaek-si"/* 260604 번역 */, "Sokcho-si"/* 260604 번역 */, "Samcheok-si"/* 260604 번역 */, "Hongcheon-gun"/* 260604 번역 */, "Hoengseong-gun"/* 260604 번역 */, "Yeongwol-gun"/* 260604 번역 */, "Pyeongchang-gun"/* 260604 번역 */, "Jeongseon-gun"/* 260604 번역 */, "Cheorwon-gun"/* 260604 번역 */, "Hwacheon-gun"/* 260604 번역 */, "Yanggu-gun"/* 260604 번역 */, "Inje-gun"/* 260604 번역 */, "Goseong-gun"/* 260604 번역 */, "Yangyang-gun"/* 260604 번역 */],
                충북: ["Cheongju-si"/* 260604 번역 */, "Chungju-si"/* 260604 번역 */, "Jecheon-si"/* 260604 번역 */, "Boeun-gun"/* 260604 번역 */, "Okcheon-gun"/* 260604 번역 */, "Yeongdong-gun"/* 260604 번역 */, "Jeungpyeong-gun"/* 260604 번역 */, "Jincheon-gun"/* 260604 번역 */, "Goesan-gun"/* 260604 번역 */, "Eumseong-gun"/* 260604 번역 */, "Danyang-gun"/* 260604 번역 */],
                충남: ["Cheonan-si"/* 260604 번역 */, "Gongju-si"/* 260604 번역 */, "Boryeong-si"/* 260604 번역 */, "Asan-si"/* 260604 번역 */, "Seosan-si"/* 260604 번역 */, "Nonsan-si"/* 260604 번역 */, "Gyeryong-si"/* 260604 번역 */, "Dangjin-si"/* 260604 번역 */, "Geumsan-gun"/* 260604 번역 */, "Buyeo-gun"/* 260604 번역 */, "Seocheon-gun"/* 260604 번역 */, "Cheongyang-gun"/* 260604 번역 */, "Hongseong-gun"/* 260604 번역 */, "Yesan-gun"/* 260604 번역 */, "Taean-gun"/* 260604 번역 */],
                전북: ["Jeonju-si"/* 260604 번역 */, "Gunsan-si"/* 260604 번역 */, "Iksan-si"/* 260604 번역 */, "Jeongeup-si"/* 260604 번역 */, "Namwon-si"/* 260604 번역 */, "Gimje-si"/* 260604 번역 */, "Wanju-gun"/* 260604 번역 */, "Jinan-gun"/* 260604 번역 */, "Muju-gun"/* 260604 번역 */, "Jangsu-gun"/* 260604 번역 */, "Imsil-gun"/* 260604 번역 */, "Sunchang-gun"/* 260604 번역 */, "Gochang-gun"/* 260604 번역 */, "Buan-gun"/* 260604 번역 */],
                전남: ["Mokpo-si"/* 260604 번역 */, "Yeosu-si"/* 260604 번역 */, "Suncheon-si"/* 260604 번역 */, "Naju-si"/* 260604 번역 */, "Gwangyang-si"/* 260604 번역 */, "Damyang-gun"/* 260604 번역 */, "Gokseong-gun"/* 260604 번역 */, "Gurye-gun"/* 260604 번역 */, "Goheung-gun"/* 260604 번역 */, "Boseong-gun"/* 260604 번역 */, "Hwasun-gun"/* 260604 번역 */, "Jangheung-gun"/* 260604 번역 */, "Gangjin-gun"/* 260604 번역 */, "Haenam-gun"/* 260604 번역 */, "Yeongam-gun"/* 260604 번역 */, "Muan-gun"/* 260604 번역 */, "Hampyeong-gun"/* 260604 번역 */, "Yeonggwang-gun"/* 260604 번역 */, "Jangseong-gun"/* 260604 번역 */, "Wando-gun"/* 260604 번역 */, "Jindo-gun"/* 260604 번역 */, "Sinan-gun"/* 260604 번역 */],
                경북: ["Pohang-si"/* 260604 번역 */, "Gyeongju-si"/* 260604 번역 */, "Gimcheon-si"/* 260604 번역 */, "Andong-si"/* 260604 번역 */, "Gumi-si"/* 260604 번역 */, "Yeongju-si"/* 260604 번역 */, "Yeongcheon-si"/* 260604 번역 */, "Sangju-si"/* 260604 번역 */, "Mungyeong-si"/* 260604 번역 */, "Gyeongsan-si"/* 260604 번역 */, "Gunwi-gun"/* 260604 번역 */, "Uiseong-gun"/* 260604 번역 */, "Cheongsong-gun"/* 260604 번역 */, "Yeongyang-gun"/* 260604 번역 */, "Yeongdeok-gun"/* 260604 번역 */, "Cheongdo-gun"/* 260604 번역 */, "Goryeong-gun"/* 260604 번역 */, "Seongju-gun"/* 260604 번역 */, "Chilgok-gun"/* 260604 번역 */, "Yecheon-gun"/* 260604 번역 */, "Bonghwa-gun"/* 260604 번역 */, "Uljin-gun"/* 260604 번역 */, "Ulleung-gun"/* 260604 번역 */],
                경남: ["Changwon-si"/* 260604 번역 */, "Jinju-si"/* 260604 번역 */, "Tongyeong-si"/* 260604 번역 */, "Sacheon-si"/* 260604 번역 */, "Gimhae-si"/* 260604 번역 */, "Miryang-si"/* 260604 번역 */, "Geoje-si"/* 260604 번역 */, "Yangsan-si"/* 260604 번역 */, "Uiryeong-gun"/* 260604 번역 */, "Haman-gun"/* 260604 번역 */, "Changnyeong-gun"/* 260604 번역 */, "Goseong-gun"/* 260604 번역 */, "Namhae-gun"/* 260604 번역 */, "Hadong-gun"/* 260604 번역 */, "Sancheong-gun"/* 260604 번역 */, "Hamyang-gun"/* 260604 번역 */, "Geochang-gun"/* 260604 번역 */, "Hapcheon-gun"/* 260604 번역 */],
                제주: ["Jeju-si"/* 260604 번역 */, "Seogwipo-si"/* 260604 번역 */],
            },
            submitLabel: "Consultation Request"/* 260604 번역 */,
            resetLabel: "Rewrite"/* 260604 번역 */,
        },
        consultFormNoStore: {
            title: "Consultation Content",
            investmentLabel: "Available investment amount"/* 260604 번역 */,
            investmentOptions: ["30 million won or less"/* 260604 번역 */, "30 million to 50 million won"/* 260604 번역 */, "50 million won or more"/* 260604 번역 */],
            investmentInitMsg: "30 million won or less"/* 260604 번역 */,
            incomeLabel: "Expected Income"/* 260604 번역 */,
            incomeOptions: ["1.5 to 2 million won"/* 260604 번역 */, "2 to 3 million won"/* 260604 번역 */, "3 million won or more"/* 260604 번역 */],
            incomeInitMsg: "1.5 to 2 million won"/* 260604 번역 */,
            openRegionLabel: "Desired Opening Area"/* 260604 번역 */,
            superExperienceLabel: "Supermarket Work Experience"/* 260604 번역 */,
            superExperienceOptions: [
                { value: "none", label: "None"/* 260604 번역 */ },
                { value: "fresh_staff", label: "GS THE FRESH Employee"/* 260604 번역 */ },
                { value: "ssm_staff", label: "SSM Employee"/* 260604 번역 */ },
                { value: "ssm_owner", label: "SSM Store Owner"/* 260604 번역 */ },
                { value: "personal_super", label: "Private Supermarket"/* 260604 번역 */ },
            ],
            openTimeLabel: "Desired Opening Time"/* 260604 번역 */,
            openYearOptions: ["2026"/* 260604 번역 */, "2027"/* 260604 번역 */, "2028"/* 260604 번역 */],
            openYearInitMsg: "2026"/* 260604 번역 */,
            openMonthOptions: ["January"/* 260604 번역 */, "February"/* 260604 번역 */, "March"/* 260604 번역 */, "April"/* 260604 번역 */, "May"/* 260604 번역 */, "June"/* 260604 번역 */, "July"/* 260604 번역 */, "August"/* 260604 번역 */, "September"/* 260604 번역 */, "October"/* 260604 번역 */, "November"/* 260604 번역 */, "December"/* 260604 번역 */],
            openMonthInitMsg: "January"/* 260604 번역 */,
            typeLabel: "Desired Franchise Type for Opening"/* 260604 번역 */,
            franchiseTypeOptions: [
                { value: "GSF1", label: "GSF1 Type"/* 260604 번역 */ },
                { value: "GSF2", label: "GSF2 Type"/* 260604 번역 */ },
                { value: "GSF3", label: "GSF3 Type"/* 260604 번역 */ },
            ],
            viewLabel: "View"/* 260604 번역 */,
            inquiryLabel: "Inquiry Details"/* 260604 번역 */,
            inquiryPlaceholder: "Please enter your inquiry."/* 260604 번역 */,
        },
        quickMenu: ["Franchising Guide", "Business Inquiry", "Customer Service"],
    },
};

// =====================
// computed
// =====================
const t = computed(() => {
    const selected = langData[props.lang];
    // 26.07.01 add 정다희 : 선택된 언어 데이터가 없으면 한국어를 기본값으로 반환, 있으면 언어 설정에 따라 기본값과 병합 처리
    if (!selected || !Object.keys(selected).length) return langData.ko;
    return props.lang === "ko" ? selected : { ...langData.ko, ...selected };
});

const activeD1 = ref(0);
const activeD2 = ref(0);
const activeD3 = ref(0);
const activeConsultD2 = ref(0);
const showConsultApplyPage = ref(false);

/* 26.07.01 add 정다희 : GS THE FRESH 창업 알아보기 탭 이동 */
function setTab(d2Index) {
    activeD1.value = 1;
    nextTick(() => {
        activeD2.value = d2Index;
        window.scrollTo({ top: 0 });
    });
}

function goToConsultTab(d2Index) {
    activeD1.value = 3;
    nextTick(() => {
        activeConsultD2.value = d2Index;
        showConsultApplyPage.value = false;
        window.scrollTo({ top: 0 });
    });
}

function goToSolutionTab(d1Index, d2Index = 0) {
    activeD1.value = d1Index;
    nextTick(() => {
        /* 26.07.01 edit 정다희 : 창업 상담 및 신청(activeD1 === 3)은 activeConsultD2 사용  */
        if (d1Index === 3) {
            activeConsultD2.value = d2Index;
            showConsultApplyPage.value = false;
        } else {
            activeD2.value = d2Index;
        }
        /* //26.07.01 edit 정다희 : 창업 상담 및 신청(activeD1 === 3)은 activeConsultD2 사용  */
        window.scrollTo({ top: 0 });
    });
}
/* //26.07.01 add 정다희 : GS THE FRESH 창업 알아보기 탭 이동 */

const depth1Tabs = computed(() => t.value.depth1Tabs);
const headerTitle = computed(() => depth1Tabs.value[activeD1.value]?.item ?? ""); //26.07.01 add 정다희 : headerTitle 추가 
const depth2Tabs = computed(() => t.value.depth2Tabs);
const franchiseGuideTypes = computed(() => t.value.franchise.guideTypes);
const depth3Tabs = computed(() => franchiseGuideTypes.value.map((item) => ({ item: item.tab })));
const procedureSteps = computed(() => t.value.procedure.steps);
const precautionCards1 = computed(() => t.value.precaution.cards1);
const precautionCards2 = computed(() => t.value.precaution.cards2);
const supportCards = computed(() => t.value.support.cards);
const consultCards = computed(() => t.value.consult.cards);
const consultDepth2Tabs = computed(() => t.value.consult.depth2Tabs);
const seminarList = computed(() => t.value.seminar.list);
const hasStore = ref(null);
const superItemOptions = computed(() => t.value.consultForm.superItemOptions);
const sidoOptions = computed(() => t.value.consultForm.sidoOptions);
const sigunguMap = computed(() => t.value.consultForm.sigunguMap);
const sigunguOptions = computed(() => {
    const list = sigunguMap.value[consultForm.regionSido] || [];
    return list.map((v) => ({ value: v, label: v }));
});
const openSigunguOptions = computed(() => {
    const list = sigunguMap.value[consultForm.openRegionSido] || [];
    return list.map((v) => ({ value: v, label: v }));
});
const superExperienceOptions = computed(() => t.value.consultFormNoStore.superExperienceOptions);
const consultForm = reactive({
    consultantName: "",
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    emailId: "",
    emailDomain: "",
    emailDomainCustom: "",
    regionSido: "",
    regionSigungu: "",
    investmentAmount: "",
    expectedIncome: "",
    openRegionSido: "",
    openRegionSigungu: "",
    superExperience: [],
    openYear: "",
    openMonth: "",
    franchiseType: "",
    inquiry: "",
    areaContract: "",
    areaExclusive: "",
    superItems: [],
    superItemEtc: "",
    contractStart: "",
    contractEnd: "",
    deposit: "",
    monthlyRent: "",
    proposalZipCode: "",
    proposalAreaContract: "",
    proposalAreaExclusive: "",
    proposalStoreName: "",
    proposalCommercialFeature: "",
    proposalOwnerRelation: "",
});

function onProposalZipSearch() {
    // 우편번호 팝업/다음 도로명 API 등 연결
}
const phoneOptions = [
    { value: "010", label: "010" },
    { value: "011", label: "011" },
    { value: "016", label: "016" },
    { value: "017", label: "017" },
    { value: "018", label: "018" },
    { value: "019", label: "019" },
];
const emailDomainOptions = [
    { value: "naver.com", label: "naver.com" },
    { value: "gmail.com", label: "gmail.com" },
    { value: "daum.net", label: "daum.net" },
    { value: "kakao.com", label: "kakao.com" },
    { value: "hanmail.net", label: "hanmail.net" },
];

function openModal(event) {
    const el = event.currentTarget;
    const popId = el.dataset.popid;
    const type = el.dataset.type || "default";
    if (!popId) return;
    modal.open(popId, type, el);
}

/* ── 추천 점포 찾기 ── */
const filterRegion = ref('');
const filterFranchiseType = ref('');
const filterStoreType = ref('');
const filterYouth = ref(false);
const storeSearchQuery = ref('');
const youthPopoverVisible = ref(false);
const activeCardIndex = ref(null);

const storeRegions = computed(() => t.value.store.regions);
const franchiseTypes = computed(() => t.value.store.franchiseTypes);
const storeTypeOptions = computed(() => t.value.store.storeTypeOptions);

/* ── 점포 리스트 ── */
const storeSort = ref('latest');
const storeView = ref('list');
const storePage = ref(1);
const storeTotalPages = ref(5);

const storeList = computed(() => t.value.store.list);

function getBadgeClass(t) {
    return /^GS\d/i.test(t) ? 'badge_' + t.toLowerCase() : 'badge_gray';
}

function closeYouthPopover() { youthPopoverVisible.value = false; }
function toggleTooltip(index) {
    activeCardIndex.value = activeCardIndex.value === index ? null : index;
}
function closeAllTooltips() {
    activeCardIndex.value = null;
}
const isMobile = ref(false);
const isTablet = ref(false);
const mqMobile = window.matchMedia("(max-width: 768px)");
const mqTablet = window.matchMedia("(max-width: 1024px)");
function onMqTabletChange(e) { isTablet.value = e.matches; }

/* ────────────── [quick_menu · script] GSAP 없이 scroll + fixed/absolute 도킹 ────────────── */

const QUICK_MENU_REVEAL_PX = 100;
const QUICK_MENU_VIEWPORT_BOTTOM_PX = 100;
const QUICK_MENU_FOOTER_GAP_PX = 60;
const showQuickMenu = ref(false);
const quickMenuRef = ref(null);
let quickMenuFooterEl = null;
let quickMenuWrapEl = null;
let quickMenuLastBottomPx = null;
let quickMenuLastTopPx = null;
let quickMenuRefreshTimer = null;

/** App.vue #wrap 직하위 사이트 푸터만 (폼·컴포넌트 내 footer 태그 제외) */
function getQuickMenuSiteFooter() {
    return document.querySelector("#wrap > footer");
}

function setQuickMenuFixed(menu, bottomPx) {
    menu.style.position = "fixed";
    menu.style.top = "auto";
    menu.style.left = "auto";
    menu.style.right = "";
    menu.style.bottom = `${bottomPx}px`;
    menu.style.transform = "";
}

function setQuickMenuAbsolute(menu, topPx) {
    menu.style.position = "absolute";
    menu.style.top = `${topPx}px`;
    menu.style.bottom = "auto";
    menu.style.left = "auto";
    menu.style.right = "";
    menu.style.transform = "";
}

function updateQuickMenuVisibility() {
    if (mqMobile.matches) {
        showQuickMenu.value = false;
        return;
    }
    const y = window.scrollY ?? document.documentElement.scrollTop;
    showQuickMenu.value = y >= QUICK_MENU_REVEAL_PX;
}

/** 평소 fixed bottom 60 · 푸터 접근 시 wrap 기준 absolute top (GSAP set과 동일 계산) */
function updateQuickMenuBottom(quickMenu) {
    if (!quickMenu || mqMobile.matches) return;
    if (!quickMenuFooterEl) {
        quickMenuFooterEl = getQuickMenuSiteFooter();
    }
    if (!quickMenuWrapEl) {
        quickMenuWrapEl = quickMenu.closest(".wrap_gsrst");
    }
    const footer = quickMenuFooterEl;
    const wrap = quickMenuWrapEl;
    if (!footer || !wrap) {
        if (quickMenuLastBottomPx !== QUICK_MENU_VIEWPORT_BOTTOM_PX) {
            setQuickMenuFixed(quickMenu, QUICK_MENU_VIEWPORT_BOTTOM_PX);
            quickMenuLastBottomPx = QUICK_MENU_VIEWPORT_BOTTOM_PX;
            quickMenuLastTopPx = null;
        }
        return;
    }
    const rect = footer.getBoundingClientRect();
    const vh = window.innerHeight;
    const gap = QUICK_MENU_FOOTER_GAP_PX;
    const scrollY = window.scrollY ?? document.documentElement.scrollTop;
    const footerTopDoc = rect.top + scrollY;
    const wrapTopDoc = wrap.getBoundingClientRect().top + scrollY;
    const quickMenuHeight = quickMenu.offsetHeight;
    const fixedBottomDoc = scrollY + vh - QUICK_MENU_VIEWPORT_BOTTOM_PX;
    const footerLimitDoc = footerTopDoc - gap;
    const shouldDockToFooter = fixedBottomDoc >= footerLimitDoc;

    if (shouldDockToFooter) {
        const absoluteTopPx = Math.round(footerTopDoc - gap - quickMenuHeight - wrapTopDoc);
        if (quickMenuLastTopPx !== absoluteTopPx) {
            setQuickMenuAbsolute(quickMenu, absoluteTopPx);
            quickMenuLastTopPx = absoluteTopPx;
            quickMenuLastBottomPx = null;
        }
        return;
    }

    if (quickMenuLastBottomPx !== QUICK_MENU_VIEWPORT_BOTTOM_PX) {
        setQuickMenuFixed(quickMenu, QUICK_MENU_VIEWPORT_BOTTOM_PX);
        quickMenuLastBottomPx = QUICK_MENU_VIEWPORT_BOTTOM_PX;
        quickMenuLastTopPx = null;
    }
}

function onQuickMenuScroll() {
    updateQuickMenuVisibility();
    if (quickMenuRef.value) {
        updateQuickMenuBottom(quickMenuRef.value);
    }
}

function refreshQuickMenu() {
    if (quickMenuRefreshTimer) {
        window.clearTimeout(quickMenuRefreshTimer);
    }
    quickMenuRefreshTimer = window.setTimeout(() => {
        quickMenuLastBottomPx = null;
        quickMenuLastTopPx = null;
        onQuickMenuScroll();
    }, 120);
}

function resetQuickMenuState() {
    quickMenuFooterEl = null;
    quickMenuWrapEl = null;
    quickMenuLastBottomPx = null;
    quickMenuLastTopPx = null;
    showQuickMenu.value = false;
}

function initQuickMenu() {
    if (mqMobile.matches) return;
    const quickMenu = quickMenuRef.value;
    if (!quickMenu) return;
    resetQuickMenuState();
    quickMenuFooterEl = getQuickMenuSiteFooter();
    quickMenuWrapEl = quickMenu.closest(".wrap_gsrst");
    onQuickMenuScroll();
}

function onMqMobileChangeWithQuickMenu(e) {
    isMobile.value = e.matches;
    if (e.matches) {
        resetQuickMenuState();
    } else {
        nextTick(() => initQuickMenu());
    }
}

/* ────────────── [quick_menu · script] 끝 ────────────── */

watch([activeD1, activeD2], () => {
    refreshQuickMenu();
});
watch(activeD1, (value) => {
    if (value !== 4) {
        showConsultApplyPage.value = false;
        activeConsultD2.value = 0;
    }
});
watch(activeConsultD2, () => {
    showConsultApplyPage.value = false;
});

onMounted(() => {
    document.addEventListener("click", closeYouthPopover);
    document.addEventListener("click", closeAllTooltips);
    isMobile.value = mqMobile.matches;
    isTablet.value = mqTablet.matches;
    mqMobile.addEventListener("change", onMqMobileChangeWithQuickMenu);
    mqTablet.addEventListener("change", onMqTabletChange);
    window.addEventListener("resize", refreshQuickMenu);
    window.addEventListener("scroll", onQuickMenuScroll, { passive: true });
    nextTick(() => initQuickMenu());
});
onUnmounted(() => {
    document.removeEventListener("click", closeYouthPopover);
    document.removeEventListener("click", closeAllTooltips);
    mqMobile.removeEventListener("change", onMqMobileChangeWithQuickMenu);
    mqTablet.removeEventListener("change", onMqTabletChange);
    window.removeEventListener("resize", refreshQuickMenu);
    window.removeEventListener("scroll", onQuickMenuScroll);
    if (quickMenuRefreshTimer) {
        window.clearTimeout(quickMenuRefreshTimer);
        quickMenuRefreshTimer = null;
    }
    resetQuickMenuState();
});

/* ── 카드 그리드 뷰 ── */
const openCardId = ref(null);
const openTableId = ref(null);

const cardsPerRow = computed(() => isMobile.value ? 1 : isTablet.value ? 3 : 4);

const storeCardRows = computed(() => {
    const rows = [];
    for (let i = 0; i < storeList.value.length; i += cardsPerRow.value) {
        rows.push(storeList.value.slice(i, i + cardsPerRow.value));
    }
    return rows;
});

function toggleCard(id) {
    openCardId.value = openCardId.value === id ? null : id;
}
</script>

<style scoped>
/* 브랜드 색 */
.wrap_gsrst { --color-brand-primary: #15b874; position: relative; overflow-x: clip;}
.wrap_gsrst :deep([class*="btn_"][class*="fill"][class*="primary"]) { color: #fff; background-color: var(--color-brand-primary); }
:deep(.txt_warning) { color: #ED3030 !important; }
:deep(.txt_green) {color:#11935D}
:deep(.txt_point) {color:#15B874}
:deep(.m_br) { display: none; }
:deep(.p_br) { display: block; }

/* HEADER */
.page_header { width: 100%; height: 480px; background-size: cover; background-position: center; position: relative; display: flex; align-items: center; justify-content: center; }
.header_inner { position: relative; z-index: 1; text-align: center; }
.header_title { color: #fff; font-size: 7.2rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.24; }
.sub_header h3 { margin: 0 0 64px; color: #161616; font-weight: 700; font-size: 4rem; line-height: 1.3; letter-spacing: -0.01em; text-align: center; white-space: pre-line; } /* 260624 add 이소라 */

/* BODY — PC: 좌우 20px / 모바일: 가로 패딩은 tab_page·Tabs 등에서 (아래 모바일 미디어쿼리 참고) */
.cont_inner { max-width: 1460px; margin: 0 auto; padding: 0 20px; box-sizing: border-box; }
/* .sec_body > :deep(.tab_wrap) { padding-left: 20px; padding-right: 20px; box-sizing: border-box; } */

/* depth3 탭 */
.tab_d3_wrap { padding-top: 0; }
.tab_type { display: flex; border: 1px solid #c4c4d0; overflow: hidden; }
.tab_type > button { flex: 1; height: 60px; color: #90909a; font-size: 1.8rem; background-color: #fff; border: none; border-right: 1px solid #c4c4d0; cursor: pointer;  }
.tab_type > button:last-child { border-right: none; }
.tab_type > button.active { background-color: var(--color-brand-primary); color: #fff; border: 0; }

/* 탭 페이지 공통 */
.panel { padding: 64px 0 0; }
.tab_content_wrap { padding-top: 40px; }

/* GS THE FRESH 창업 알아보기 (activeD1 === 0) — 26.07.01 add 정다희 : gsrst02010101 이동 */
.section_header { margin-bottom: 64px; }
.section_header.ac { text-align: center; }
.section_header > .tit + h2 { margin-top: 16px; }
.section_header > h2 { font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.section_header > p { margin-top: 16px; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.panel > section + section { padding-top: 100px; }
.panel > section > .inner { margin-inline: calc(50% - 50vw); padding: 80px calc(50vw - 50%); background-color: #f8f8f8; }
.sec_hero { min-height:700px; padding: 150px 100px; background-size: cover; background-position: 0 -55px; border-radius: 20px; position: relative; display: flex; flex-direction: column; overflow: hidden; }
.sec_hero::before { width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); position: absolute; top: 0; left: 0; content: ''; }
.sec_hero > header, .sec_hero > .action_list { position: relative; z-index: 1; }
.sec_hero > header .tit { width: fit-content; margin: 0; padding: 8px 16px; color: #fff; font-size: 1.4rem; font-weight: 500; line-height: 1.4; letter-spacing: -0.01em; background-color: rgba(255,255,255,0.2); border: 0; border-radius: 99px; }
.sec_hero > header h3 { color: #fff; font-size: 5.6rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; flex: 0 0 auto; }
.sec_hero > header .desc { color: #fff; font-size: 1.8rem; font-weight: 700; line-height: 1.5; letter-spacing: 0; }
.sec_hero > header .hero_title { display: flex; align-items: center; }
.sec_hero > header .hero_title > div { width: 489px; margin-left: 12px; }
.sec_hero > header .hero_title img { width: 100%; height: auto; display: block; }
.sec_hero > header + .hero_desc { margin-top: 10px; color: #fff; font-size: 1.8rem; font-weight: 700; line-height: 1.5; z-index: 1; position: relative; }
.sec_hero > .action_list { width: 100%; margin-top: 30px; display: flex; align-items: stretch; gap: 10px; }
.sec_hero > .action_list > li { min-width: 0; max-width: 300px; min-height: 154px; flex: 1; display: flex; }
.sec_hero > .action_list > li > a.action_card { width: 100%; height: 100%; flex: 1; padding: 30px 20px; color: #fff; background-color: rgba(21, 184, 116, 0.8); border-radius: 12px; text-decoration: none; display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; }
.sec_hero > .action_list > li > a.action_card > strong { font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.sec_hero > .action_list > li > a.action_card > .action_card_btn { font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; display: inline-flex; align-items: center; gap: 8px; }
.sec_hero > .action_list > li > a.action_card > .action_card_btn > em { font-style: normal; }
.sec_hero > .action_list > li > a.action_card > .action_card_btn::after { width: 20px; height: 20px; background: url('@/assets/images/common/chevron_icon_20_fresh.png') no-repeat center; content: ''; display: block; flex-shrink: 0; }
.sec_hero > .action_list > li > a.action_card::after { display: none; }
.sec_num_list :deep(.num_info_list) { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px; }
.sec_num_list :deep(.num_info_item) { padding: 0; border-bottom: 0; }
.sec_num_list :deep(.num_info_num) { margin-bottom: 8px; color: #15B874;font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
.sec_num_list :deep(.num_info_item article) { display: flex; flex-direction: column; gap: 24px; }
.sec_num_list :deep(.num_info_icon) { width: 80px; height: 80px; }
.sec_num_list :deep(.num_info_item .num_info_icon::before){width:40px; height:40px; background-repeat: no-repeat; background-size: cover; background-position: center; filter: none;}  
.sec_num_list :deep(.num_info_item:nth-of-type(1) .num_info_icon::before) {width:48px; height:48px; background-image: url('@/assets/images/sub/icon_gsrst01_01.png'); }
.sec_num_list :deep(.num_info_item:nth-of-type(2) .num_info_icon::before) { background-image: url('@/assets/images/sub/icon_gsrst01_02.png'); }
.sec_num_list :deep(.num_info_item:nth-of-type(3) .num_info_icon::before) { background-image: url('@/assets/images/sub/icon_gsrst01_03.png'); }
.sec_num_list :deep(.num_info_title) { margin-bottom: 8px; }
.sec_num_list :deep(.num_info_title > strong) { font-size: 2.8rem; line-height: 1.35; letter-spacing: -0.01em; }
.sec_num_list :deep(.num_info_body > p) { font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
.sec_band > .inner > .link_grid { display: flex; align-items: stretch; gap: 20px; }
.sec_band > .inner > .link_grid > li { min-width: 0; flex: 1; display: flex; }
.sec_band > .inner > .link_grid > li > a { width: 100%; height:100%; min-height: 150px; padding: 32px 24px; background-color: #15B874; border-radius: 12px; display: flex; align-items: center; gap: 20px; }
.sec_band > .inner > .link_grid > li > a::after { width: 24px; height: 24px; margin: 0; background: url('@/assets/images/common/arrow_set_24.png') no-repeat -64px -20px; filter: brightness(0) invert(1); content: ''; display: block; flex-shrink: 0; }
.sec_band > .inner > .link_grid > li > a > .thumb { position: relative; width: 80px; height: 80px; flex-shrink: 0; background-color: #E8F8F1; border-radius: 12px; }
.sec_band > .inner > .link_grid > li > a > .thumb:before { content: ''; width: 40px; height: 40px; background: url('@/assets/images/sub/icon_cont_40.png') no-repeat; display: block; position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); }
.sec_band > .inner > .link_grid > li:nth-of-type(1) > a > .thumb:before { background-image: url('@/assets/images/sub/guide_icon_green_01.png'); }
.sec_band > .inner > .link_grid > li:nth-of-type(2) > a > .thumb:before { background-image: url('@/assets/images/sub/guide_icon_green_02.png'); }
.sec_band > .inner > .link_grid > li:nth-of-type(3) > a > .thumb:before { background-image: url('@/assets/images/sub/guide_icon_green_03.png'); }
.sec_band > .inner > .link_grid > li > a > .txt { min-width: 0; flex: 1; }
.sec_band > .inner > .link_grid > li > a > .txt > strong { color: #fff; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: block; }
.sec_band > .inner > .link_grid > li > a > .txt > .desc { margin-top: 6px; color: #E8F8F1; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; display: block; }
/* //GS THE FRESH 창업 알아보기 */

/* type_info_bar */
.type_info_bar { padding: 17px 24px; background-color: #e8f8f1; border: 1px solid #d2ede2; border-radius: 6px; color: #11935d; font-size: 1.8rem; line-height: 1.4; }

/* type_table */
.type_table_wrap { margin-top: 20px; overflow-x: auto; border-top: 1px solid #161616; }
.type_table { width: 100%; border-collapse: collapse; }
.type_table .col_item_main { width: 80px; }
.type_table .col_item_sub { width: 195px; }
.type_table .col_cost { width: auto; }
.type_table thead th { padding: 28px 24px; background-color: #f8f8f8; border: 1px solid #e5e5e9; font-size: 1.8rem; text-align: center; line-height: 1.4; }
.type_table tbody th { padding: 12px 24px; background-color: #f8f8f8; border: 1px solid #e5e5e9; font-size: 1.8rem; font-weight: 400; text-align: left; line-height: 1.4; word-break: keep-all;}
.type_table tbody td { border-bottom: 1px solid #e5e5e9; font-size: 1.8rem; text-align: center; padding: 12px 24px; line-height: 1.4; }
.type_table tbody tr.is_gray > td { color:#15B874; font-weight:700; background-color: #f8f8f8; }
.type_table_wrap.type2 .type_table thead th { padding: 18px 20px; line-height: 1.5; border: 0; }
.type_table_wrap.type2 .type_table colgroup col { width: 12.5%; }
.type_table_wrap.type2 .type_table tbody td { height: 82px; padding: 0 13px; }
.td_tag { font-size: 1.6rem; word-break: break-all; }
.type_table + .list_caution { margin-top: 16px; }
/* 26.07.01 add 정다희 : 각 타입별 종합안내 비교 테이블 (Figma 934-11511) */
.compare_scroll_area { container-type: inline-size; container-name: compare-scroll; }
.compare_scroll_area .type_table_wrap { border:0; }
.type_table_wrap.is_compare { margin-top: 0; }
.type_table_wrap.is_compare .type_table { min-width: 852px; table-layout: fixed; }
.type_table_wrap.is_compare .type_table col.col_group { width: 80px; }
.type_table_wrap.is_compare .type_table col.col_group2 { width: 80px; }
.type_table_wrap.is_compare .type_table col.col_label { width: 195px; }
/* .type_table_wrap.is_compare .type_table col.col_gs { width: 23%; } */
.type_table_wrap.is_compare .type_table thead td { padding: 16px 24px; border: 1px solid #e5e5e9; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; word-break: keep-all; text-align: center; vertical-align: middle; }
.type_table_wrap.is_compare .type_table thead td.is_gsf1 > strong { color: #42c68f; }
.type_table_wrap.is_compare .type_table thead td.is_gsf2 > strong { color: #11935d; }
.type_table_wrap.is_compare .type_table thead td.is_gsf3 > strong { color: #084a2e; }
.type_table_wrap.is_compare .type_table thead td > strong { font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: block; }
.type_table_wrap.is_compare .type_table thead td > span { margin-top: 4px; color: #67676f; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em; display: block; }
.type_table_wrap.is_compare .type_table tbody th { text-align: center; }
.type_table_wrap.is_compare .type_table tbody th.th_vertical{padding:0;}
.type_table_wrap.is_compare .type_table tbody th.th_vertical .th_vertical_txt { display: inline-block; writing-mode: vertical-rl; text-orientation: upright; line-height: 1.4;  } /* 26.07.01 add 정다희 : 개점투자 세로 정렬 */
/* .type_table_wrap.is_compare .type_table tbody th[scope="rowgroup"] { font-weight: 700; } */
.type_table_wrap.is_compare .type_table tbody td { border: 1px solid #e5e5e9; word-break: keep-all; vertical-align: middle; }
.type_table_wrap.is_compare .type_table .td_sub { color: #67676f; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em; }
.type_table_wrap.is_compare .type_table .txt_point { color: #0d6e46; font-weight: 700; }
.type_table_wrap.is_compare .type_table .txt_rate { color: #0d6e46; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.type_table_wrap.is_compare .type_table .txt_sm { font-size: 1.6rem; font-weight: 700; }
.franchise_compare_scroll_hint { display: none; margin: 0; padding: 0; color: #67676f; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em; text-align: center; } /* 26.07.01 add 정다희 : 가로 스크롤 안내 — 컨테이너 너비 기준 노출 */
@container compare-scroll (max-width: 851px) {
    .compare_scroll_area > .franchise_compare_scroll_hint { margin-top: 16px; display: flex; align-items: center; justify-content: center; gap: 3px; }
    .compare_scroll_area > .franchise_compare_scroll_hint::before { width: 20px; height: 20px; background: url('@/assets/images/common/icon_scroll_20.png') center no-repeat; content: ""; display: block; }
}
.compare_scroll_area + .list_caution { margin-top: 16px; }
/* //26.07.01 add 정다희 : 각 타입별 종합안내 비교 테이블 */

/* list_caution */
.list_caution { margin-top: 32px; }
.list_caution > li + li { margin-top: 8px; }
.list_caution > li > p { color: #67676F; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }

/* type_graph */
.type_graph_wrap { margin-top: 60px; padding: 64px; background-color: #f8f8f8; border-radius: 12px; }
.type_graph_wrap > strong { display: block; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.type_graph_inner { margin-top: 40px; padding-right: 56px; display: flex; flex-direction: column; align-items: flex-end; gap: 28px; }
.type_graph_item { display: flex; gap: 54px; align-items: center; justify-content: flex-end; }
.type_graph_item:nth-child(2) { justify-self: flex-start; }
.type_graph_item > p { font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; text-align: right; }
.type_graph_item > picture { flex: 1; display: block; }
.type_graph_item img { display: block; max-width: 100%; }
/* 가맹/창업 절차 */
.link_wrap { margin-top: 40px; display: flex; justify-content: center; }
.link_wrap > a { margin: 0 auto; padding: 18px 32px; color: #fff; font-weight: 700; font-size: 1.8rem; line-height: 1.5; text-align: center; background-color: var(--color-brand-primary); border-radius: 10px; display: inline-block; }
.link_wrap > a.btn_xl {  padding: 0 32px; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; }

/* 창업절차 */
.precaution_title, .precaution_intro > h3 { color: #161616; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.mo_only { display: none; }
.sec_precaution{margin-top: 120px;}
:deep(.feature_card_desc_list li + li){margin-top:6px;}
.sec_precaution .sub_header h3{margin-bottom: 40px; text-align: left;}
.sec_precaution_inner { padding: 64px; background-color: #f8f8f8; border-radius: 12px; display: flex; align-items: flex-start; }
.precaution_intro { flex: 0 1 clamp(200px, 28%, 296px); min-width: 0; max-width: 296px; }
.precaution_intro > h3 { margin-bottom: 16px; }
.precaution_intro > p { color: #67676f; font-size: 1.8rem; line-height: 1.6; letter-spacing: -0.01em; }
.precaution_main { flex: 1; min-width: 0; }
.precaution_block + .precaution_block { margin-top: 56px; }
.precaution_block > h4 { color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.precaution_block > .block_desc { margin-top:6px;color: #67676F; font-size: 1.8rem; line-height: 1.6;letter-spacing: -0.01em;}
.sec_precaution :deep(.feature_card_list){margin-top: 40px;}
.sec_precaution :deep(.feature_card_item) { background-color: #fff; min-height: 0; }
.precaution_block_sm :deep(.feature_card_item) { min-height: 180px; }
.sec_precaution :deep(.feature_card_num) { color: #15b874; }
.sec_precaution :deep(.feature_card_title) { font-size: 2.4rem; }

/* 사업설명회 */
.seminar_list li:nth-of-type(1) .seminar_map {background: url('@/assets/images/dummy/gsrst0102_map1.png') no-repeat 0 0; background-size: cover;}
.seminar_list li:nth-of-type(2) .seminar_map {background: url('@/assets/images/dummy/gsrst0102_map2.png') no-repeat 0 0; background-size: cover;}
.seminar_list li:nth-of-type(3) .seminar_map {background: url('@/assets/images/dummy/gsrst0102_map3.png') no-repeat 0 0; background-size: cover;}
.seminar_head > h3 { color: #161616; font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.seminar_head > p { color: #161616; font-size: 2.4rem; line-height: 1.5; letter-spacing: -0.01em; }
.seminar_head :deep(.btn_big) { margin-top: 16px; }
.seminar_list { margin-top: 60px; display: flex; flex-direction: column; gap: 60px; }
.seminar_item_body { display: flex; gap: 16px; min-height: 400px; }
.seminar_map { flex: 1; background-color: #d7d7df; border-radius: 16px; min-width: 0; }
.seminar_info { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow: hidden; border-radius: 12px; }
.seminar_table { width: 100%; height: 100%; border: 0; }
.seminar_table col.seminar_col_label { width: clamp(96px, 29%, 200px); }
.seminar_table col.seminar_col_value { width: 71%; }
.seminar_table thead th { padding: 47px 24px; background-color: #f8f8f8; border: 0; font-size: 1.8rem; font-weight: 600; text-align: left; line-height: 1.4; letter-spacing: -0.02em; }
.seminar_table tbody td { padding: 13px 24px; border-bottom: 1px solid #e5e5e9; font-size: 1.8rem; line-height: 1.6; letter-spacing: -0.01em; min-width: 0; text-align: left; }

.seminar_table tbody td .schedule_list li {padding:12px 16px; background-color:#F8F8F8; border-radius:12px; display:flex; align-items:center; justify-content:space-between;}
.seminar_table tbody td .schedule_list li + li {margin-top:10px;}
.seminar_table tbody td .schedule_list li span {font-size:1.6rem; display:flex; align-items:center;}
.seminar_table tbody td .schedule_list li span:before {width:16px; height:16px; margin-right:4px; background:url('@/assets/images/common/icon_set_16.png') -56px -43px no-repeat; content:''; display:block;}
.seminar_table tbody td .schedule_list li button {padding:5px 12px 4px; color:#fff; font-size:1.4rem; font-weight:700; letter-spacing:-0.01em; line-height:140%; background-color:#107AF2; border-radius:100px;}
.seminar_table tbody td .schedule_list li.disabled span {color:#67676F; text-decoration:line-through;}
.seminar_table tbody td .schedule_list li.disabled button {color:#67676F; background-color:#E5E5E9; pointer-events: none;}

/* 추천 점포 찾기 */
.sec_store { padding-top: 40px; }
.tab_intro { margin-bottom:64px; font-size: 2.4rem; color: #161616; line-height: 1.5; letter-spacing: -0.01em; }
.tab_intro span{ color:#11935D;}
.store_search { background-color: #f8f8f8; border-radius: 12px; padding: 48px 42px; display: flex; flex-direction: column; gap: 0; }
.search_group { display: flex; flex-direction: column; gap: 12px; }
.search_group_label { font-size: 1.6rem; font-weight: 700; color: #161616; line-height: 1.24; }
.chip_list { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.chip { min-width: 78px; height: 40px; padding: 0 18px; border: 1px solid #161616; border-radius: 99px; background-color: transparent; color: #161616; font-size: 1.6rem; font-weight: 400; letter-spacing: -0.01em; cursor: pointer; white-space: nowrap; transition: background-color 0.15s, border-color 0.15s, color 0.15s; }
.chip.active { background-color: #E8F8F1; border-color: #15B874; color: #15B874; }
.search_bottom_row { margin-top: 24px; padding-top: 24px; border-top: 1px solid #D7D7DF; display: flex; align-items: flex-start; gap: 32px; flex-wrap: wrap; }
.chip_sep_v { display: inline-block; width: 1px; height: 24px; background-color: #c4c4d0; flex-shrink: 0; align-self: center; }
.chip_youth_wrap { position: relative; display: inline-flex; align-items: center; }
.youth_info_btn { width: 18px; height: 18px; border: 1.4px solid #242428; border-radius: 50%; background-color: #fff; font-size: 1.3rem; font-weight: 500; color: #000; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: absolute; top: -11px; right: -12px; line-height: 1; }
.search_group_input { flex: 1; min-width: 280px; }
.store_search_input_wrap { position: relative; }
.store_search_input { width: 100%; height: 40px; padding: 0 16px; border: 1px solid #c4c4d0; border-radius: 12px; background-color: #fff; font-size: 1.6rem; color: #161616; letter-spacing: -0.01em; box-sizing: border-box; outline: none; }
.store_search_input::placeholder { color: #a4a4b0; }
.store_search_input:focus { border-color: #107AF2; }
.store_search_btn { width: 20px; height: 20px; background: none; border: none; cursor: pointer; position: absolute; top: 50%; right: 12px; transform: translateY(-50%); display: flex; align-items: center; justify-content: center; padding: 0; }

.layer_tooltip { position: absolute; background-color: #fff; border: 1px solid #C6C6C6; border-radius: 16px; padding: 32px; z-index: 10; }
.layer_tooltip > strong { font-weight: 700; font-size: 1.6rem; line-height: 1.24; }
.layer_tooltip > p { margin-top: 24px; font-size: 1.6rem; color: #161616; line-height: 1.5; letter-spacing: -0.01em; }
.layer_tooltip > a { margin-top: 16px; color: #15B874; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; text-decoration: underline; display: block; }
.layer_tooltip_close { width: 20px; height: 20px; background: none; border: none; cursor: pointer; position: absolute; top: 32px; right: 32px; background:url('@/assets/images/common/icon_set_20.png') -627px -25px no-repeat; }

.youth_popover { top: calc(100% + 8px); left: -119px; right: -166px; }

/* 점포 리스트 */
.store_list_wrap { margin-top: 32px; }
.store_list_bar { display: flex; align-items: center; justify-content: space-between; height: 40px; }
.store_count { font-size: 1.6rem; color: #67676f; letter-spacing: -0.01em; }
.store_count > strong { font-weight: 700; }
.store_bar_right { display: flex; align-items: center; gap: 8px; }

/* 정렬 버튼 */
.store_sort_group { display: flex; align-items: center; }
.sort_btn { height: 40px; padding: 0 12px; background: #fff; border: 1px solid #90909a; font-size: 1.4rem; font-weight: 700; color: #90909a; cursor: pointer; white-space: nowrap; position: relative; z-index: 0; margin-left: -1px; }
.sort_btn:first-child { margin-left: 0; border-radius: 8px 0 0 8px; }
.sort_btn:last-child { border-radius: 0 8px 8px 0; }
.sort_btn.active { color: #15B874; border-color: #15B874; z-index: 1; }

/* 뷰 토글 버튼 */
.store_view_group { display: flex; gap: 8px; }
.view_btn { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #90909a; border-radius: 8px; color: #107af2; cursor: pointer; }
.view_btn::before { content: ""; width: 20px; height: 20px; background:url('@/assets/images/sub/icon_view_type_list.png') no-repeat 0 0; display: inline-block; }
.view_btn.active { border-color: #15B874; color: #15B874; }
.view_btn.active::before { background:url('@/assets/images/sub/icon_view_type_list_on_fresh.png') no-repeat 0 0; }
.store_view_group .view_btn:last-child:before {background-image: url('@/assets/images/sub/icon_view_type_card.png')}
.store_view_group .view_btn.active:last-child:before {background-image: url('@/assets/images/sub/icon_view_type_card_on_fresh.png')}

/* 타입 뱃지 */
.type_badge { display: inline-block; padding: 3px 6px; border-radius: 4px; font-size: 1.4rem; }
.type_badge + .type_badge { margin-left: 4px; }
.badge_gs1 { background: #e8f8f1; color: #15b874; }
.badge_gs2 { background: #f9f2ea; color: #fb6432; }
.badge_gs3 { background: #faeeee; color: #ed3030; }
.type_badge.badge_gray { background: #f2f2f4; color: #67676f; }

/* 상세 토글 버튼 */
.detail_toggle_btn { display: inline-flex; align-items: center; gap: 4px; background: none; border: none; font-size: 2rem; color: #161616; cursor: pointer; letter-spacing: -0.01em; }
.detail_toggle_btn::after { content: ''; width:20px; height:20px; background:url('@/assets/images/common/icon_set_20.png') no-repeat -191px -25px; display: inline-block; transform: rotate(0deg); transform-origin: center; transition: transform 0.2s ease; }
.type_table_wrap.type2 .type_table tbody tr.is_open .detail_toggle_btn::after { transform: rotate(180deg); }

/* 상세 패널 */
.detail_panel_td { padding: 0 !important; height: auto !important; border: none !important; }
.detail_panel { padding: 40px; background: #f8f8f8; border-bottom: 1px solid #D7D7DF; }
.detail_panel :deep(.detail_card) { border: 0; }

/* 모바일 아코디언 */
.store_accordion_list { display: none; }
.store_accordion_list :deep(.board_type_toggle) { border-top: 1px solid #d7d7df; }
.store_accordion_list :deep(dt > a.acc_tit_btn) { min-height: auto; padding: 16px 20px; font-size: inherit; font-weight: inherit; border-bottom: 1px solid #d7d7df; }
.store_accordion_list :deep(dt > a.acc_tit_btn::after) { width: 24px; height: 24px; transform: rotate(0deg); transform-origin: center; transition: transform 0.2s ease; }
.store_accordion_list :deep(dt > a.acc_tit_btn.acc_tit_open::after) { transform: rotate(180deg); }
.store_accordion_list :deep(.acc_panel_cont) { padding: 0; }


/* 아코디언 헤드 */
.accordion_head_info { flex: 1; min-width: 0; }
.accordion_region { font-size: 2rem; font-weight: 700; color: #161616; letter-spacing: -0.01em; line-height: 1.35; }
.accordion_badges { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 8px; }

/* 카드 그리드 뷰 */
.store_card_grid_wrap { margin-top: 16px; display: flex; flex-direction: column; gap: 20px; }
.store_card_row { margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; align-items: stretch; }
.store_card_row > li { display: flex; flex-direction: column; }

/* 페이지네이션 */
.store_pagination { display: flex; justify-content: center; }

/* 상담 및 신청 */
.caution_list { margin-top: 16px; }
.caution_list li p { color: #67676F; font-size: 1.8rem; line-height: 1.4; letter-spacing: -0.01em; }
.consult_caution_mo { display: none; }
.consult_card_list { margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.consult_card { min-height: 239px; padding: 32px; background: #F8F8F8; border-radius: 12px; display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; min-width: 0; }
.consult_body { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.consult_body p  {font-size: 1.6rem;line-height: 1.5;word-break: keep-all; }
.consult_body p.consult_label { font-size: 1.4rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; }
.label_wrap .consult_label + .consult_label { margin-top:2px; font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.consult_body p.region { margin-top: 2px; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; }
.consult_note { margin-top: 2px; color:#67676F; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.consult_tel_wrap { position: relative; }
.consult_tel_btn { margin-top: 32px; padding: 4px; background: none; border: 0; font-size: 1.6rem; font-weight: 500; color: #15B874; letter-spacing: -0.01em; line-height: 1.5; cursor: pointer; display: inline-flex; align-items: center; gap: 12px; white-space: nowrap; }
.consult_tel_btn::after { content: ""; width: 16px; height: 16px; background:url('@/assets/images/sub/icon_tel.png') no-repeat; flex-shrink: 0; display: inline-block; }
.consult_tel { width: 300px; height: 372px; padding: 32px; border: 1px solid #c6c6c6; border-radius: 16px; background-color: #ffffff; position: absolute; top: 100%; left: 0; right: auto; z-index: 20;  }
.consult_tel_title { color: #1d1d1d; font-size: 1.6rem; font-weight: 700; line-height: 1.24; letter-spacing: 0; display: block; }
.consult_tel_content { margin-top: 24px; }
.consult_tel_phone { color: #1d1d1d; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.consult_tel_kakao { margin-top: 16px; color: #1d1d1d; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.consult_tel_qr { width: 120px; height: 120px; margin-top: 16px; background-color: #d9d9d9; display: flex; align-items: center; justify-content: center; }
.consult_tel_qr > span { color: #000000; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.consult_tel_notice { margin-top: 16px; color: #1d1d1d; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.consult_tel .layer_tooltip_close { top: 32px; right: 32px; }
.consult_foot { margin-top: 0; flex: 0 0 auto; }
.consult_foot button{width:164px;}

/* 가맹/창업 상담 상담 폼 */
.consult_box { padding: 56px 40px; background-color: #f8f8f8; border-radius: 12px; }
.consult_box_apply { display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; gap: 40px; flex-wrap:wrap;}
.consult_box_apply .consult_selector_wrap { width: 360px; flex: 0 0 360px; order: 2; }
.consult_box_apply .consult_head { display: flex; align-items: flex-start; gap: 20px; }
.consult_box_apply .consult_head  h3 { flex: 1; min-width: 0; margin: 0; color: #161616; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.consult_box_apply .consult_intro p { margin: 16px 0 0; color: #161616; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.consult_img_wrap { width: 114px; height: 152px; border: 1px solid #000; flex-shrink: 0; overflow: hidden; }
.consult_intro_txt { flex: 1; min-width: 0; }
.consult_intro_txt > h3 { color: #161616; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.consult_intro_txt > p { margin-top: 16px; color: #161616; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.consult_selector_wrap { width: 100%; }
.consult_selector_wrap :deep(.select) { width: 100%; }
.consult_selector_wrap :deep(.select select) { width: 100%; height: 62px; padding: 0 56px 0 20px; border: 1px solid #c4c4d0; border-radius: 14px; color: #a4a4b0; font-size: 1.8rem; font-weight: 400; line-height: 1.4; background-color: #fff; }
.consult_selector_hint { margin-top: 8px; padding-left: 24px; color: #4c4c53; font-size: 1.4rem; font-weight: 400; line-height: 1.4; position: relative; }
.consult_selector_hint::before { width: 20px; height: 20px; content: ""; background: url("@/assets/images/common/icon_set_20.png") no-repeat -1155px -69px; position: absolute; top: 0; left: 0; }
.middle_bts_wrap { margin-top: 64px; display: flex; gap: 8px; }
.middle_bts_wrap > button { height: 52px; padding: 0 16px; background: #fff; border: 1px solid #90909a; border-radius: 10px; font-size: 1.8rem; font-weight: 700; cursor: pointer; transition: border-color 0.15s, color 0.15s; color: #161616; }
.middle_bts_wrap > button:hover, .middle_bts_wrap > button.active { border-color: #107af2; color: #107af2; }
.middle_bts_wrap + :deep(.consent_box){margin-top:30px;}
.info_banner { margin-top: 64px; padding: 34px 24px; background-color: #F9F2EA; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap:wrap;}
.info_banner > p { display: flex; align-items: flex-start; gap: 12px; font-size: 1.8rem; line-height: 1.4; }
.info_banner > p::before { content: ''; width: 27px; height: 27px; flex-shrink: 0; background: url('@/assets/images/common/icon_set_24.png') no-repeat -160px -56px;  display: block; }
.button_wrap { margin-top: 40px; display: flex; gap: 8px; justify-content: flex-end;}
.button_wrap :deep(button){ width:134px;}
.button_wrap :deep(button.primary){ background-color:#15B874; }
.apply_form.col_layout{border:0 !important; }
.apply_form.col_layout .form_body .form_row {grid-template-columns: 134px 1fr; gap:8px;}
.form_row_name .form_field :deep(.input_wrap){max-width:205px;}
.consult_box + .form_row, .form_row + .consent_box{margin-top:64px}
.check_list { display: flex; flex-wrap: wrap; gap: 8px; }
.check_list :deep(.input_wrap) { width: auto; flex: 0 0 auto; }
.form_field_email :deep(.input_wrap){max-width:205px;}
.form_field_email span + :deep(.input_wrap){max-width:180px;}
.form_field_email :deep(.input_wrap + label.select){width:100%; max-width:180px;}
.form_field_phone :deep(label.select),
.form_field_phone :deep(.input_wrap) { max-width: 134px; flex: 1; min-width: 0; }
.form_field_select_220 :deep(label.select){width:100%; max-width:220px;}
.form_field_region :deep(label.select){width:100%; max-width:220px;}
.apply_form .form_field.form_field_area{gap:24px;}
.form_field_area :deep(.input_wrap){max-width:134px;}
.form_field_area .form_sub_input_wrap { flex-wrap: wrap; align-items: center; gap: 8px; max-width: 100%; }
.form_field_area .form_sub_input_wrap :deep(.input_wrap) { flex: 0 0 auto; max-width: 134px; min-width: 134px; }
.form_field_area .form_sub_input_wrap .form_sub_unit { flex-shrink: 0; }
.form_field_area .form_sub_input_wrap .area_note { flex: 0 0 auto; flex-shrink: 0; white-space: nowrap; }
.form_field_area .form_sub_input_wrap .form_field_note { flex: 0 0 auto; flex-basis: auto; flex-shrink: 0; width: auto; max-width: none; margin: 0; color: #161616; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; white-space: nowrap; }
.form_field_area > .form_field_note { color: #161616 !important;font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;flex-basis: 100%; width: 100%; max-width: 100%; }
.form_field_address { flex-direction: column; align-items: flex-start; gap: 8px; }
.form_sub_input_wrap .area_note,
.form_sub_input_wrap .form_field_note{margin-left:16px;}

/* .form_field_address :deep(.input_wrap){max-width:305px;} */
.form_zip_row :deep(.input_wrap){max-width:305px; flex: 0 0 auto;}
.form_zip_row { width: 100%; display: flex; align-items: center; gap: 8px; }
.form_zip_row :deep(button){width:134px; flex:0 0 134px;}
.form_zip_row .form_field_note { color: #161616; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; flex: 0 1 auto; }
.form_field_store :deep(.input_wrap) { max-width: 448px; }
.form_row_textarea .form_field :deep(.textarea_wrap) { width: 100%;}
.form_row_textarea .form_field :deep(.textarea_field){width:100%; max-width:100%;}
.form_row_textarea .form_field :deep(.textarea_field > textarea) { width:100%; max-width:100%; resize: none; }
.form_row_area{align-items: flex-start;}
.form_row_area > .form_label{height: 52px; line-height: 52px;}
.form_field_franchise { display: flex; flex-wrap: wrap; gap: 12px 20px; }
.franchise_type_item { display: inline-flex; align-items: center; gap: 8px; }
.franchise_type_item :deep(.input_wrap) { width:auto; flex: none; }
.franchise_type_item :deep(button) { min-width: 56px; }
.apply_form textarea { width: 100%; height: 120px; padding: 16px; color: #161616; font-size: 1.6rem; font-weight: 400; line-height: 1.5; background-color: #fff; border: 1px solid #c4c4d0; border-radius: 10px; resize: vertical; box-sizing: border-box; }
.apply_form textarea::placeholder { color: #a4a4b0; }
.form_field_check .check_etc :deep(.input_wrap){max-width:428px;}
.form_sub_inputs :deep(.input_wrap){max-width:134px;}
.contract_rent :deep(.input_wrap){max-width:134px;}
.brand_panel_bg { margin: 0 0 40px; padding: 0; background-color: #e8e8ec; border-radius: 12px; overflow: hidden; }
.brand_panel_bg > img { width: 100%; display: block; object-fit: cover; }
.brand_panel_title { padding: 0 0 100px; }
.brand_panel_title.flex{display: flex;justify-content: space-between; align-items: center; gap:40px; flex-wrap:wrap;}
.brand_panel_title h2 { margin: 0 0 16px; color: #161618; font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.brand_panel_title p { margin: 0; color: #161618; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.sec_owner_support.tab_page { padding-left: 0; padding-right: 0; }
.sec_owner_support .tab_intro { margin-bottom: 24px; }
.sec_owner_support :deep(.brand_panel_title) { padding: 0 20px 64px; box-sizing: border-box; }

.sec_owner_support :deep(.feature_card_item) { min-height: 480px; background-repeat: no-repeat; background-position: left 32px bottom 32px; background-size: auto; }
.sec_owner_support :deep(.feature_card_item > .feature_card_num) { color:#11935D;}
.sec_owner_support :deep(.feature_card_list > .feature_card_item:nth-child(1)),
.sec_owner_support :deep(.feature_card_swiper .swiper-slide:nth-child(1) .feature_card_item) { background-image: url("@/assets/images/dummy/gsrst_info_01.png"); }
.sec_owner_support :deep(.feature_card_list > .feature_card_item:nth-child(2)),
.sec_owner_support :deep(.feature_card_swiper .swiper-slide:nth-child(2) .feature_card_item) { background-image: url("@/assets/images/dummy/gsrst_info_02.png"); }
.sec_owner_support :deep(.feature_card_list > .feature_card_item:nth-child(3)),
.sec_owner_support :deep(.feature_card_swiper .swiper-slide:nth-child(3) .feature_card_item) { background-image: url("@/assets/images/dummy/gsrst_info_03.png"); }
.sec_owner_support :deep(.feature_card_list > .feature_card_item:nth-child(4)),
.sec_owner_support :deep(.feature_card_swiper .swiper-slide:nth-child(4) .feature_card_item) { background-image: url("@/assets/images/dummy/gsrst_info_04.png"); }
/* .label_wrap{display:flex; flex-direction:column; gap:2px; } */
.consult_tel_btn{margin-top:20px;}
/* 상담 및신청 */
.sec_consult :deep(.brand_panel_title) {padding-bottom:64px;}
.sec_consult :deep(.brand_panel_title h2){display:flex; align-items:center; gap:8px;}
.sec_consult :deep(.brand_panel_title h2::after){content:''; display:block; width:40px; height:40px; background: url(@/assets/images/sub/icon_cont_40.png) no-repeat -740px -103px; }

/* quick menu */
.quick_menu{position:fixed; bottom:60px; right:clamp(24px, calc(50% - 1420px / 2 - 160px), 800px); width:clamp(104px, 6.8229vw, 131px); z-index:100; display:flex; flex-direction:column; gap:clamp(8px, 0.5208vw, 10px); opacity:0; pointer-events:none; transition:opacity 0.35s ease;}
.quick_menu.is_visible{opacity:1; pointer-events:auto;}
.quick_menu li{position:relative; width:100%;}
.quick_menu li button{width:100%; height:clamp(48px, 3.125vw, 60px); padding:clamp(12px, 0.9375vw, 18px) 0; color:#161616; font-size:clamp(1.3rem, 0.8333vw, 1.6rem); font-weight:700; letter-spacing:-0.01em; background:none; background-color:#F2F2F4; border:0; border-radius:99px; text-align:center; display:flex; align-items:center; justify-content:center; gap:clamp(8px, 0.5208vw, 10px);}
.quick_menu li button::before{content:''; width:20px; height:20px; background: url(@/assets/images/common/icon_set_20.png) no-repeat; display:block;}
.quick_menu li:nth-of-type(1) button::before {background-position: -1155px -70px;}
.quick_menu li:nth-of-type(2) button::before {background-position: -15px -114px;}
.quick_menu li:nth-of-type(3) button::before {background: url(@/assets/images/sub/icon_quick3.png) no-repeat 0 0;}

/* 26.06.09 Add 이종환 : 사업설명회 신청 */
.seminar_wrap{max-width:1000px; margin:60px auto 0; scroll-margin-top: 24px; box-sizing:border-box;}

.manager_card { width: 100%; max-width: 740px; margin:0 0 40px; padding: 40px; background-color: #E8F8F1; border: 1px solid #15B874; border-radius: 12px; display: flex; align-items: center; gap: 32px;  }
.manager_card.type_02{max-width:100%;display:flex; justify-content: space-between;}
.manager_card .manager_header > p{color:#67676F;font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
.manager_card .manager_header > strong{margin-top:2px; font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em;display:block;}
.manager_card .manager_header + .btn_close{width:20px; height:20px; text-indent:-9999px; background:url('@/assets/images/common/icon_set_20.png') no-repeat -627px -24px; }

.consent_box { width: 100%; padding: 32px; background-color: #f8f8f8; border-radius: 12px; }
.consent_box + .consent_box { margin-top: 40px; }
.consent_box > h3 { font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.consent_list { margin-top: 24px; }
.consent_list > li { padding-left: 10px; position: relative; }
.consent_list > li + li { margin-top: 8px; }
.consent_list > li > p { color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.consent_notice_area { margin-top: 24px; padding-top: 24px; border-top: 1px solid #d7d7df; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.consent_notice_area > p { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.24; letter-spacing: 0; }
.consent_radio { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
.consent_radio :deep(.input_wrap) { width: auto; flex: 0 0 auto; }
.consent_radio > span { color: #161616; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
:deep(.consent_box) + .apply_form{margin-top:40px;}
.apply_form.col_layout{margin-top:64px;} 
.apply_form {border-top:1px solid #242428;}
.apply_form .form_body {padding-top:12px; border-bottom: 1px solid #E5E5E9;}
.apply_form .form_body .form_row { min-height: auto; padding: 12px 0; display: grid; grid-template-columns: minmax(0, 1fr); align-items: start; gap: 0; }
.apply_form .form_body + .button_area{margin-top:40px; display:flex; justify-content: center;}

.apply_form .form_body p.explain {color:#ED3030; font-size:1.6rem; letter-spacing:-0.01em; line-height:150%;}

.apply_form .button_area :deep(.primary){width:100%; max-width:250px; background-color:#15B874;}
.apply_form .form_body .form_row .form_label { margin-bottom: 12px; font-weight:400}
.apply_form .form_body .form_row .form_label .explain {margin-left:12px; font-size:1.2rem;}
/* .apply_form .form_body .form_row .form_field { width: 100%; } */
.apply_form .form_body .form_row_radio, .apply_form .form_body .form_row_textarea,
.apply_form .form_body .form_row_textarea .form_field,
.apply_form .form_body .form_row_calendar :deep(.consult_calendar),
.apply_form .form_body .form_row_calendar :deep(.consult_time_picker) { width: 100%; max-width: 1000px; }
.apply_form .form_body .form_row_textarea .form_field :deep(Textarea){resize:none;}
.apply_form .form_body .form_row.col_02 { width: 100%; max-width:720px;  padding: 12px 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));  gap: 20px; align-items: start; }
.apply_form .form_body .form_row.col_02 .col_item { min-width: 0; }
.apply_form .form_body .form_label { margin-bottom: 12px; }
.apply_form .form_body .form_row.col_02 .col_item .form_field { width: 100%; }
.apply_form .form_body .form_row.col_02 .col_item .forn_field_radio{padding:12px 0;}
.apply_form .form_field { display: flex; gap: 8px; flex-wrap: wrap; min-width: 0; }
.apply_form .form_field .flex1 {flex:1;}
.apply_form .form_field_phone :deep(label.select),
/* .apply_form .form_field_phone :deep(.input_wrap) { max-width: 134px; flex: 1; min-width: 0; } */
.apply_form .form_field_birth { flex-wrap: nowrap; }
.apply_form .form_field_birth :deep(.select) { max-width:150px;flex: 1; min-width: 0; }
.apply_form .form_field_open :deep(.input_wrap){max-width: 150px;}
.apply_form .form_row_region :deep(.select){max-width:220px; flex: 1; min-width: 0; }
.apply_form .form_field_calendar :deep(.input_wrap){max-width:700px;}
.form_label_note { margin-top: 4px; color: #67676f; font-size: 1.2rem; line-height: 1.2; }

/* //26.06.09 Add 이종환 : 사업설명회 신청 */

@media (max-width: 1200px) {
    .consult_card_list { grid-template-columns: repeat(2, 1fr); }

}

/* Tablet */
@media (max-width: 1024px) {
    .page_header { height: 360px; }
    .header_title { font-size: 5.2rem; }
    .sub_header h3 { margin: 0 0 24px; font-size: 2.4rem;} /* 260624 add 이소라 */
    .tab_type > button { font-size: 1.6rem; }
    .type_info_bar { font-size: 1.6rem; }
    .type_table thead th, .type_table tbody th, .type_table tbody td { font-size: 1.6rem;}
    .type_table_wrap.is_compare .type_table { min-width: 852px; }
    .type_table_wrap.is_compare .type_table thead td > strong { font-size: 2rem; }
    .type_table_wrap.is_compare .type_table .txt_rate { font-size: 1.6rem; }
    .type_graph_wrap { padding: 48px; }
    .type_graph_wrap > strong { font-size: 2.8rem; }
    .type_graph_item { gap: 32px; }
    .type_graph_item > p { font-size: 1.8rem; }
    .precaution_intro > h3 { font-size: 2.6rem; }
    .sec_precaution_inner { flex-direction: column; padding: 48px; gap: 32px; }
    .precaution_intro { width: 100%; }
    .precaution_intro > p { font-size: 1.6rem; }
    .precaution_block > h4 { font-size: 2.4rem;}
    .precaution_block + .precaution_block { margin-top: 40px; }
    .seminar_head > h3 { font-size: 3.2rem; }
    .seminar_head > p { font-size: 2rem; }
    .seminar_table thead th, .seminar_table tbody th, .seminar_table tbody td { font-size: 1.6rem; }
    .brand_panel_title > h2 { font-size: 3.2rem; }
    .brand_panel_title > p { font-size: 2rem; }
    .store_card_row { grid-template-columns: repeat(3, 1fr); }
    .sec_num_list :deep(.num_info_list) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 20px; }
    .sec_band > .inner > .link_grid { flex-direction: column; }
    .sec_hero { height: auto; min-height: 600px; padding: 60px 40px 80px; }
    .sec_hero > header .hero_title { flex-wrap: wrap; align-items: center; gap: 12px 16px; }
    .sec_hero > header h3 { font-size: 4.2rem; line-height: 1.3; letter-spacing: -0.01em; }
    .sec_hero > header .hero_title > h3 { min-width: 0; flex: 1 1 auto; }
    .sec_hero > header .hero_title > div { width: 130px; margin-left: 0; flex-shrink: 0; }
    /* :deep(.consent_box + .apply_form){margin-top:40px;} */
    /* .apply_form .form_field_area .form_sub_input_wrap { flex-wrap: wrap; }
    .apply_form .form_field_area .form_sub_input_wrap :deep(.input_wrap) { min-width: 0; max-width: 100%; }
    .apply_form .form_field_area .form_sub_input_wrap .area_note,
    .apply_form .form_field_area .form_sub_input_wrap .form_field_note { white-space: normal; }
    .apply_form .form_zip_row { flex-wrap: wrap; max-width: 100%; min-width: 0; } */
}

/* Mobile */
@media (max-width: 768px) {
    .wrap_gsrst {margin-top:84px;} /* 26.06.26 edit 이소라 */

    :deep(.m_br) { display: block; }
    :deep(.p_br) { display: none; }
    .page_header { display: none; }
    .section_header, .sub_header { margin-bottom: 32px; }
    .section_header > h2, .sub_header > h3 { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
    .section_header > p, .sub_header > p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .section_header > p { margin-top: 12px; }
    .panel > section + section { padding-top: 80px; }
    .panel > section > .inner { padding-top: 40px; padding-bottom: 40px; }
    .sec_hero { max-height: none; height: 640px; padding: 60px 20px; border-radius: 20px; gap: 0; }
    .sec_hero > header { text-align: center; }
    .sec_hero > header .hero_title { flex-direction: column; gap: 8px; }
    .sec_hero > header .hero_title > div { width: 295px; }
    .sec_hero > header h3 { font-size: 3.2rem; }
    .sec_hero > header + .hero_desc{text-align: center;}
    .sec_hero > .action_list { width: 100%; max-width: none; margin-top: 60px; flex-direction: column; }
    .sec_hero > .action_list > li { max-width: none; min-height:auto;}
    .sec_hero > .action_list > li > a.action_card { flex-direction: row; min-height: auto; padding: 12px 16px; gap: 0; justify-content: center; }
    .sec_hero > .action_list > li > a.action_card::after { display: block; }
    .sec_hero > .action_list > li > a.action_card > strong { width: 100%; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .sec_hero > .action_list > li:last-child > a.action_card > strong { text-align: left; }
    .sec_hero > .action_list > li > a.action_card > .action_card_btn { display: none; }
    .sec_num_list .section_header > h2 + p { color: #67676f; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
    .sec_num_list :deep(.num_info_item .num_info_icon::before){width:32px; height:32px;}
    .sec_num_list :deep(.num_info_item:nth-of-type(1) .num_info_icon::before){width:40px; height:40px;}
    .sec_num_list :deep(.num_info_list) { grid-template-columns: 1fr; gap: 40px; }
    .sec_num_list :deep(.num_info_item > article) { flex-direction: row; align-items: flex-start; gap: 16px; }
    .sec_num_list :deep(.num_info_icon) { width: 60px; height: 60px; }
    .sec_num_list :deep(.num_info_content) { min-width: 0; flex: 1; }
    .sec_num_list :deep(.num_info_num) { margin-bottom: 6px; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
    .sec_num_list :deep(.num_info_title) { margin-bottom: 6px; }
    .sec_num_list :deep(.num_info_title > strong) { font-size: 2rem; line-height: 1.35; }
    .sec_num_list :deep(.num_info_body > p) { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .sec_band > .inner { padding: 40px 20px; }
    .sec_band > .inner > .link_grid { margin-top: 32px; gap: 10px; }
    .sec_band > .inner > .link_grid > li > a { height: auto; min-height: 0; padding: 16px; gap: 16px; }
    .sec_band > .inner > .link_grid > li > a > .thumb { width: 60px; height: 60px; }
    .sec_band > .inner > .link_grid > li > a > .thumb:before { width: 32px; height: 32px; background-size: cover; }
    .sec_band > .inner > .link_grid > li > a > .txt > strong { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
    .sec_band > .inner > .link_grid > li > a > .txt > .desc { font-size: 1.4rem; line-height: 1.4; }
    .sec_body { padding: 24px 0 40px; }
    .header_title { font-size: 3.6rem; }
    .panel { padding: 60px 0 80px; }
    .sec_owner_support.panel { padding-left: 0; padding-right: 0; }
    .brand_panel_bg { margin: 0 0 24px; border-radius: 0; }
    .brand_panel_bg > img { max-height: 245px; }
    .brand_panel_title { padding: 0 0 64px; }
    .brand_panel_title h2 {margin-bottom: 12px;font-size: 2.4rem;line-height: 1.35;letter-spacing: -0.01em;}
    .brand_panel_title p {font-size: 1.8rem;line-height: 1.4;letter-spacing: -0.01em;}
    .brand_panel_title.flex{flex-direction: column; align-items: flex-start; gap:16px;}
    .brand_panel_title.flex > div + :deep(button){width:100%;}
    .tab_content_wrap { padding-top: 40px; }
    .tab_type > button { height: 48px; font-size: 1.4rem; }
    .type_info_bar { height: auto; min-height: 48px; padding: 20px 24px; font-size: 1.4rem; }
    .list_caution { margin-top: 16px; }
    .type_table_wrap { margin-top: 24px; }
    .compare_scroll_area { margin-right: -20px; margin-left: -20px; padding: 0 20px; }
    .type_table_wrap.is_compare { -webkit-overflow-scrolling: touch; }
    .type_table_wrap.is_compare .type_table { min-width: 852px; }
    .type_table_wrap.is_compare .type_table col.col_group { width: 60px; }
    .type_table_wrap.is_compare .type_table col.col_group2 { width: 35px; }
    .type_table_wrap.is_compare .type_table col.col_label { width: 115px; }
    .type_table_wrap.is_compare .type_table col.col_gs { width: 25.1%; }
    .type_table_wrap.is_compare .type_table thead td { padding: 12px 16px; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .type_table_wrap.is_compare .type_table thead td > strong { font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .type_table_wrap.is_compare .type_table thead td > span { font-size: 1.2rem; line-height: 1.4; letter-spacing: -0.01em; }
    .type_table_wrap.is_compare .type_table tbody th[scope="rowgroup"] { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .type_table_wrap.is_compare .type_table .txt_rate { font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
    .type_table_wrap.is_compare .type_table .td_sub { font-size: 1.2rem; }
    .franchise_compare_scroll_hint { font-size: 1.2rem; gap: 4px; } /* 26.07.01 add 정다희 */
    .type_table .col_item_main { width: 35px; }
    .type_table .col_item_sub { width: 102px; }
    .type_table thead th { padding: 18px 0; font-size: 1.4rem; line-height: 1.24;  }
    .type_table tbody th, .type_table tbody td { padding: 15px 24px; font-size: 1.4rem; line-height: 1.5;}
    .type_table tbody th{padding: 0 11px; word-break: break-all;}
    .type_table tbody th:first-child { padding-left: 14px; padding-right: 14px; }
    .type_table tbody tr.is_gray > td{color:#161616;font-weight:400;}
    .type_graph_wrap { margin-top: 80px; padding: 40px 20px; }
    .type_graph_wrap > strong { font-size: 2rem; line-height: 1.32; letter-spacing: -0.01em; }
    .type_graph_inner { margin-top: 30px; padding-right: 0; align-items: flex-start; gap: 20px; }
    .type_graph_item { flex-direction: column; align-items: flex-start; justify-content: flex-start; gap: 16px; }
    .type_graph_item > p { font-size: 1.6rem; text-align: left; }
    .link_wrap > a { width: 100%; padding: 14px 0; font-weight: 400; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .mo_only { display: block; }
    .pc_only { display: none; }
    .precaution_title { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
    .sec_precaution_inner { margin-top: 32px; padding: 30px 20px; gap: 40px; display: block; }
    .precaution_intro { display: none; }
    .precaution_intro > p { font-size: 1.4rem; }
    .precaution_block > h4 { font-size: 2rem; }
    .precaution_block > .block_desc{font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em;}
    .sec_precaution :deep(.feature_card_list){margin-top: 24px;}
    .sec_precaution :deep(.feature_card_title) { font-size: 1.8rem; }
    .seminar_info { padding-bottom: 18px; }
    .seminar_head > h3 { font-size: 2.8rem; }
    .seminar_head > p { font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
    .seminar_list { gap: 40px; }
    .seminar_item_title { font-size: 2rem; }
    .seminar_item_body { flex-direction: column; height: auto; gap: 16px; }
    .seminar_map { flex: none; height: clamp(183.36px, 50.933vw, 260px); border-radius: 12px; }
    .seminar_table thead th { padding: 21px 24px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; font-weight: 700; }
    .seminar_table tbody td { padding: 16px 24px; font-size: 1.6rem; line-height: 1.5; }
    .seminar_table col.seminar_col_label { width: clamp(60.75px, 27%, 118.125px); }
    .seminar_table col.seminar_col_value { width: 73%; }

    .info_banner{margin-top:32px;padding:20px; gap:12px;}
    .info_banner button{margin-left:32px;}
    .info_banner > p{font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em;}
    .info_banner > p::before{width:24px; height:24px;}
    .caution_list li p{font-size: 1.4rem;}
    .consult_caution_pc { display: none; }
    .consult_caution_mo { display: block; margin-top: 0; margin-bottom: 20px; padding: 0 20px; }
    .consult_box { padding:0; background-color: #fff; }
    .consult_box_apply { padding:0;display: flex; flex-direction: column; align-items: stretch; gap: 0; }
    .consult_box_apply .consult_selector_wrap { order: 1; width: 100%; flex: none; margin: 0 0 32px; }
    .consult_box_apply .consult_selector_wrap :deep(.select select) { height: 52px; padding: 0 48px 0 16px; font-size: 1.6rem; border-radius: 12px; }
    .consult_box_apply .consult_intro { order: 2; display: block; }
    .consult_box_apply .consult_head { display: flex; align-items: center; gap: 12px; }
    .consult_box_apply .consult_img_wrap { width: 90px; height: 120px; }
    .consult_box_apply .consult_head > h3 { font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
    .consult_box_apply .consult_intro > p { margin: 12px 0 0; font-size: 1.6rem; line-height: 1.5; }
    .consult_intro { display: block; }
    .consult_img_wrap { width: 90px; height: 120px; }
    .consult_intro_txt { margin-top: 0; }
    .consult_intro_txt > h3 { font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
    .consult_intro_txt > p { margin-top: 12px; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
    .consult_selector_wrap :deep(.select select) { height: 52px; padding-right: 48px; font-size: 1.6rem; }
    .consult_selector_hint { margin-top: 6px; }
    .consult_card{min-height:auto; padding:20px; flex-direction:column; gap:18px; align-items: flex-start;}
    .consult_card_list { grid-template-columns: 1fr; gap: 20px; }
    .consult_note { order: 1; }
    .consult_tel_wrap { order: 2; }
    .consult_tel_btn{margin-top:12px;}
    .consult_foot{width:100%;}
    .consult_foot :deep(button){width:100%;border-radius:4px; }
    .consult_name { font-size: 1.6rem; }

    .store_list_wrap { margin-top: 60px; }
    .tab_intro { margin-bottom:60px; font-size: 1.8rem; line-height: 1.4;}
    .store_count { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .store_count > strong { font-weight: 400; }
    .store_search { padding: 30px 20px; }
    .search_bottom_row { margin-top: 24px; padding-top: 24px; border-top: 1px solid #D7D7DF; flex-direction: column; gap: 50px; }
    .search_group_input { width: 100%; }
    .store_search_input { height: 52px; }
    .layer_tooltip { left: -20px; right: auto; transform: none; width: calc(100vw - 40px); max-width: 335px; }
    /* .youth_popover { top: calc(100% + 8px); } */
    /* .consult_tel { left: -155px; } */
    .chip_list { position: relative; }
    .chip_youth_wrap { position: static; }
    .store_list_bar { margin-bottom: 16px; align-items: flex-end; gap: 12px; height: auto; }
    .store_bar_right { justify-content: flex-end; }
    .sort_btn { height: 32px; font-size: 1.3rem; padding: 0 10px; }
    .view_btn { width: 32px; height: 32px; }
    .type_table_wrap.type2 { display: none; }
    .store_accordion_list { margin: 0 -20px; display: block; }
    .store_card_grid_wrap { gap: 8px; }
    .store_card_row { grid-template-columns: 1fr; }
    .detail_panel { padding: 16px; }
    .store_card_detail_row { margin-top: 0; }
    .store_accordion_list :deep(dt > a.acc_tit_btn.acc_tit_open), .store_accordion_list :deep(dt > a.acc_tit_btn.acc_tit_btn) { border: 0; }
    .store_accordion_list :deep(dt + dd){border-bottom:1px solid #D7D7DF;}
    .store_accordion_list :deep(.detail_card) { padding: 20px; border: 0; border-radius: 12px; }
    .store_accordion_list :deep(dd.acc_panel > .acc_panel_inner > .acc_panel_cont) { padding: 30px 20px !important; background-color: #F8F8F8 !important; }
    .accordion_badges { margin-top: 6px; }

    .store_card_row > li :deep(.card_cost) {color:#15B874;}

    /* Swiper: cont_inner 좌우 20px 패딩 상쇄 — sec_owner_support에 overflow-x:hidden 주면 margin -20px 확장이 잘림 */
    .sec_owner_support :deep(.brand_panel_bg) { margin: 0 0 80px; }
    .sec_owner_support :deep(.brand_panel_title) { padding: 0 0 32px; }
    .sec_owner_support :deep(.feature_card_swiper) { width: calc(100% + 40px); margin: 0 -20px; padding: 0 20px; overflow: hidden; box-sizing: border-box; }
    .sec_owner_support :deep(.feature_card_swiper .swiper-slide) { width: 85.333vw; box-sizing: border-box; }
    .sec_owner_support :deep(.feature_card_swiper .feature_card_item) { width: 100%; min-width: 0; min-height: 420px !important; box-sizing: border-box; }
    .sec_owner_support :deep(.feature_card_swiper .swiper-slide:not(:last-child)) { margin-right: 10px; }
    .label_wrap{display:flex; flex-direction:row; align-items: flex-end; gap:0;}
    .consult_body p.consult_label{font-weight: 400;font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
    .label_wrap .consult_label + .consult_label{font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;gap:0;}
    .consult_body p{font-size: 1.6rem;}
    .consult_body p.consult_label.region{margin-top:6px;font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em;}
    .consult_body p.consult_note{margin-top:2px;color:#67676F;font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em;}
    .consult_foot :deep([class*="btn_"]) {height:38px;}
    .sec_consult :deep(.brand_panel_title){padding-bottom:16px;} 
    .quick_menu{display: none;}
    .sec_consult :deep(.brand_panel_title h2::after){width:32px; height:32px; background-image: url(@/assets/images/sub/icon_cont_32.png); background-position: -740px -103px;}
    .sec_consult.panel,
    .sec_consult_apply.panel { overflow-x: hidden; max-width: 100%; min-width: 0; }
    .sec_consult > .form_row { min-width: 0; max-width: 100%; padding: 20px 0; grid-template-columns: 1fr; gap: 0; align-items: flex-start; }
    .sec_consult > .form_row .form_label { margin-bottom: 16px; font-weight: 700; font-size: 1.6rem; line-height: 1.24; letter-spacing: -0.01em; }
    .sec_consult > .form_row .form_field { width: 100%; min-width: 0; max-width: 100%; flex-direction: column; align-items: stretch; gap: 12px; }
    .sec_consult > .form_row .form_field_region :deep(label.select) { width: 100%; max-width: none; min-width: 0; }
    .sec_consult :deep(.consent_box),
    .sec_consult_apply :deep(.consent_box) { max-width: 100%; min-width: 0; box-sizing: border-box; }
    .sec_consult :deep(.consent_list > li > p),
    .sec_consult_apply :deep(.consent_list > li > p) { word-break: keep-all; overflow-wrap: anywhere; }
    .apply_form { margin-top: 32px; max-width: 100%; min-width: 0; overflow-x: clip; box-sizing: border-box; }
    .apply_form + .apply_form { margin-top: 40px; }
    .apply_form .form_head { height: auto; padding-bottom: 16px; flex-wrap: wrap; gap: 8px; min-width: 0; max-width: 100%; }
    .apply_form .form_head_title { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: anywhere; }
    .apply_form .form_required_note { font-size: 1.4rem; line-height: 1.4; flex-shrink: 0; }
    .apply_form .form_body { padding: 30px 0; min-width: 0; max-width: 100%; }
    .apply_form .form_row { padding: 20px 0; grid-template-columns: 1fr; gap: 0; align-items: flex-start; min-width: 0; max-width: 100%; }
    .apply_form .form_row:first-child { padding-top: 0; }
    .apply_form .form_row:last-child { padding-bottom: 0; }
    .apply_form .form_label { margin-bottom: 16px; font-weight: 700; font-size: 1.6rem; line-height: 1.24; letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: anywhere; }
    .apply_form.col_layout {margin-top:40px;}
    .apply_form.col_layout +.apply_form.col_layout{margin-top:60px;}
    .apply_form.col_layout .form_body .form_row{grid-template-columns:1fr; gap:0;}
    .apply_form.col_layout .form_body{padding:10px 0;}
    .apply_form .form_field :deep(input),
    .apply_form .form_field :deep(select) { max-width: 100%; box-sizing: border-box; }
    .form_field_email :deep(.input_wrap + label.select){ max-width:none;}
    .apply_form .form_field_region { flex-direction: column; flex-wrap: wrap; }
    .apply_form .form_field_region :deep(label.select) { width: 100%; max-width: 100%; min-width: 0; }
    .apply_form .form_field_address { width: 100%; min-width: 0; max-width: 100%; }
    .apply_form .form_zip_row { flex-wrap: wrap; max-width: 100%; gap: 12px; min-width: 0; }
    .apply_form .form_zip_row :deep(.input_wrap) { flex: 1 1 100%; max-width: 100%; min-width: 0; width: 100%; }
    .apply_form .form_zip_row :deep(button) { width: 100%; flex: 1 1 100%; max-width: 100%; min-width: 0; }
    .apply_form .form_zip_row .form_field_note { flex: 1 1 100%; width: 100%; max-width: 100%; font-size: 1.4rem; line-height: 1.4; word-break: keep-all; overflow-wrap: anywhere; }
    .apply_form .form_row_area { align-items: flex-start; }
    .apply_form .form_row_area > .form_label { height: auto; line-height: 1.24; }
    .apply_form .form_field_area { flex-direction: column; align-items: stretch; gap: 16px; min-width: 0; max-width: 100%; }
    .apply_form .form_field_area .form_sub_group { width: 100%; min-width: 0; flex-direction: column; align-items: flex-start; gap: 12px; }
    .apply_form .form_field_area .form_sub_input_wrap { flex-wrap: wrap; align-items: center; width: 100%; min-width: 0; max-width: 100%; gap: 8px; }
    .apply_form .form_field_area .form_sub_input_wrap :deep(.input_wrap) { flex: 1 1 0; min-width: 0; max-width: 100%; width: auto; }
    .apply_form .form_field_area .form_sub_input_wrap .form_sub_unit { flex: 0 0 auto; flex-shrink: 0; }
    .apply_form .form_sub_input_wrap .area_note,
    .apply_form .form_sub_input_wrap .form_field_note { margin-left: 0; }
    .apply_form .form_field_area .form_sub_input_wrap .area_note,
    .apply_form .form_field_area .form_sub_input_wrap .form_field_note { flex: 1 1 100%; width: 100%; max-width: 100%; min-width: 0; white-space: normal; word-break: keep-all; overflow-wrap: anywhere; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .apply_form .form_field_area > .area_note { width: 100%; max-width: 100%; font-size: 1.4rem; line-height: 1.4; white-space: normal; word-break: keep-all; overflow-wrap: anywhere; }
    .apply_form .form_field_area > .form_field_note { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: anywhere; max-width: 100%; min-width: 0; }
    .apply_form .form_field_check,
    .apply_form .form_field_contract { width: 100%; min-width: 0; max-width: 100%; }
    .apply_form .form_field_check .form_sub_group,
    .apply_form .form_field_contract .form_sub_group { width: 100%; min-width: 0; }
    .apply_form .form_field_check .check_etc { width: 100%; min-width: 0; }
    .apply_form .form_field_check .check_etc :deep(.input_wrap) { max-width: 100%; width: 100%; min-width: 0; }
    .apply_form .check_list{gap:20px;}
    .apply_form .check_list :deep(.input_wrap){width:auto !important;}
    .apply_form .form_sub_inputs { width: 100%; min-width: 0; flex-wrap: wrap; }
    .apply_form .form_sub_inputs :deep(.input_wrap) {  max-width: 100%; min-width: 0; }
    .apply_form .contract_rent { width: 100%;}
    .apply_form .contract_rent :deep(.input_wrap) { flex: 1 1 100%; max-width: 100%; width: 100%; min-width: 0; }
    .apply_form .form_field_franchise { flex-direction: column; align-items: stretch; gap: 12px; min-width: 0; max-width: 100%; }
    .apply_form .form_row_textarea .form_field { min-width: 0; max-width: 100%; }
    .apply_form .form_row_textarea .form_field :deep(.textarea_wrap),
    .apply_form .form_row_textarea .form_field :deep(.textarea_field),
    .apply_form .form_row_textarea .form_field :deep(.textarea_field > textarea) { width: 100%; max-width: 100%; min-width: 0; box-sizing: border-box; }
    .apply_form textarea { height: 160px; max-width: 100%; box-sizing: border-box; }
    .apply_form .check_row,
    .apply_form .contract_row { align-items: flex-start; }
    .middle_bts_wrap { margin-top: 60px; gap: 8px; max-width: 100%; min-width: 0; }
    .middle_bts_wrap > button { width: 100%; height: auto; min-height: 48px; padding: 12px 5px; font-size: 1.6rem; letter-spacing:-0.02em; }
    .middle_bts_wrap + :deep(.consent_box) { margin-top: 40px; }
    .consult_box + .form_row,
    .form_row + .consent_box { margin-top: 32px; }
    .button_wrap { margin-top: 32px; justify-content: center; gap: 8px; max-width: 100%; min-width: 0; }
    .button_wrap :deep(button) { width: calc(50% - 4px); flex: 1 1 auto; min-width: 0; max-width: calc(50% - 4px); box-sizing: border-box; }

    .apply_form .form_body{margin-bottom:40px;padding: 30px 0 10px; }
    .apply_form .form_body > .form_row:first-child > .col_item:first-child{padding:0 0 20px 0;}
    .apply_form .form_body .form_row.col_02 .col_item .forn_field_radio{padding:0;}
    .apply_form .form_body .form_row.col_02 { max-width: none; padding:0; grid-template-columns: 1fr; gap: 0; }
    .apply_form .form_body .form_row .form_label { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .apply_form.col_layout .form_body .form_row .form_label.area_label{margin-bottom:16px;font-weight: 700;}
    .form_sub_label{color:#161616;}
    .apply_form .form_body .form_row_calendar :deep(.consult_calendar),
    .apply_form .form_body .form_row_calendar :deep(.consult_time_picker) { max-width: none; }
    .apply_form .form_field :deep(.input_wrap),
    .apply_form .form_field :deep(.select) { max-width: none; }
    .apply_form .form_field_phone { display: flex; align-items: center; gap: 8px; }
    .apply_form .form_field_phone .form_sep { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; }
    .apply_form .form_field_phone :deep(.select),
    .apply_form .form_field_phone :deep(.input_wrap) { width: auto; max-width: none; min-width: 0; flex: 1 1 0; }
    .apply_form .form_row_textarea .form_field :deep(.textarea_wrap) { width: 100%; max-width: none; }
    .apply_form .form_field_birth :deep(.select) { max-width: none; flex: 1; min-width: 0; }
    .apply_form .form_field_open :deep(.input_wrap) { max-width: none; flex: 1; min-width: 0; }
    .apply_form .form_field_region { flex-direction: column; align-items: stretch; }
    .apply_form .form_row_region :deep(.select) { max-width: none; flex: 1 1 100%; width: 100%; }
    .apply_form .form_field_calendar :deep(.input_wrap) { max-width: none; }
    .manager_card { max-width: none; margin-top: 0; padding: 16px; gap: 16px; }
    .consult_manager_photo { width: 50px; height: 50px; }
    .manager_name { font-size: 1.6rem; line-height: 1.24; }
    .manager_addr > .tit, .manager_addr > .addr {font-size:1.6rem;}
    .manager_icon {width:16px; height:16px; background:url('@/assets/images/sub/icon_map_16.png');}
    .apply_form .form_body .form_row{padding:20px 0;}
    .apply_form .form_body .form_row.col_02 .col_item{padding:20px 0px;}
    .apply_form .button_area :deep(.primary){width:100%; max-width:100%; }
    .consult_search_box strong{font-size: 1.65rem;line-height: 124%;letter-spacing: 0%;}
    .consult_search_box > div :deep(button){width:80px;}
    .consult_search_box > div > p{font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em;}
    .consult_search_box .flex{margin-top:12px;}
    .seminar_list { gap: 40px; }
    .seminar_item_body { flex-direction: column; height: auto; gap: 16px; }
    .seminar_map { flex: none; height: clamp(183.36px, 50.933vw, 260px); border-radius: 12px; }
    .seminar_table thead th { padding: 21px 24px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; font-weight: 700; }
    .seminar_table tbody td { padding: 12px 16px; font-size: 1.6rem; line-height: 1.5; }
    .seminar_table tbody td p{font-size: 1.6rem; line-height: 1.5;}
    .seminar_table col.seminar_col_label { width:70px }
    .apply_form .form_body p.explain {font-size:1.4rem;}
}
</style>
