<template>
    <div class="brand">
        <section ref="sectionRef" class="sec_brand_visual top_visual">
            <div class="sticky">
                <div ref="bgWrapRef" class="bg_wrap">
                    <div class="bg"></div>
                    <div class="visual_inner">
                        <div class="txt_area">
                            <p ref="textParaRef">
                                <span v-for="(line, vi) in t.brand.visual.lines" :key="vi" v-html="line"></span>
                            </p>
                            <div ref="logoWrapRef" class="logo_wrap">
                                <img :src="imgLogo" :alt="t.brand.visual.logoAlt" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="brand_kv"></section>

        <section ref="aboutSectionRef" class="sec_brand_about">
            <div class="about_inner">
                <div v-for="(block, bi) in t.brand.about" :key="bi" class="about_txt">
                    <p v-for="(line, li) in block" :key="li"><span v-html="line"></span></p>
                </div>
            </div>
        </section>

        <section class="sec_brand_str">
            <div class="str_inner">
                <header class="str_header">
                    <h2 v-html="t.brand.str.title"></h2>
                    <div class="str_actions">
                        <a
                            href="#"
                            class="btn_store_find"
                            data-popid="pop_store_find"
                            data-type="lg"
                            data-cont="gsrbr0106"
                            @click.prevent="openModal"
                        >{{ t.brand.str.storeFind }}</a>
                        <div class="sns_wrap">
                            <a href="#" class="btn_sns btn_sns_insta" :aria-label="t.brand.str.snsInstaAria"></a>
                            <a href="#" class="btn_sns btn_sns_yt" :aria-label="t.brand.str.snsYtAria"></a>
                        </div>
                    </div>
                </header>
                <ul class="brand_acc">
                    <li
                        v-for="(item, i) in strItems"
                        :key="i"
                        class="acc_item"
                        :class="{ is_open: openAcc === i }"
                    >
                        <div class="acc_inner">
                            <div class="acc_body">
                                <button
                                    type="button"
                                    class="acc_btn"
                                    :aria-expanded="openAcc === i"
                                    @click="toggleAcc(i)"
                                    v-html="item.title"
                                ></button>
                                <div
                                    :ref="el => { if (el) descRefs[i] = el }"
                                    class="acc_desc_wrap"
                                >
                                    <p class="acc_desc" v-html="item.desc"></p>
                                </div>
                            </div>
                            <div
                                :ref="el => { if (el) imgRefs[i] = el }"
                                class="acc_img_wrap"
                            >
                                <img :src="item.img" alt="" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </div>

    <div class="cont_inner">
        <Tabs
            :model-value="depth1ActiveIdx"
            tab-class="type_01"
            :tab-items="depth1Tabs"
            :tab-slide="true"
            @change="onDepth1Change"
        />
        <Tabs
            v-if="depth1ActiveIdx === 0"
            v-model="activeTab"
            tab-class="type_02"
            :tab-items="depth2Tabs"
            :tab-slide="true"
        />
        <Tabs
            v-if="depth1ActiveIdx === 2"
            v-model="storeActiveTab"
            tab-class="type_02"
            :tab-items="storeTabs"
            :tab-slide="true"
        />
        <Tabs
            v-if="depth1ActiveIdx === 3"
            v-model="winwinActiveTab"
            tab-class="type_02"
            :tab-items="winwinTabs"
            :tab-slide="true"
        />

        <!-- 탭 0: 차별화 상품 -->
        <div v-show="depth1ActiveIdx === 0 && activeTab === 0" class="brand_panel">
            <figure v-if="tab0.hero" class="brand_panel_bg">
                <img :src="tab0.hero" :alt="tab0.heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="tab0.title" class="brand_panel_title">
                <h2 v-html="tab0.title"></h2>
                <p v-if="tab0.subtitle" v-html="tab0.subtitle" />
            </header>

            <ul v-if="tab0.cards && tab0.cards.length && !isMobileView" class="diff_card_grid" role="list">
                <li v-for="(card, c) in tab0.cards" :key="c">
                    <article class="diff_card">
                        <figure>
                            <img :src="card.image" :alt="card.alt || ''" width="460" height="320" />
                        </figure>
                        <div>
                            <h3>{{ card.title }}</h3>
                            <p>{{ card.desc }}</p>
                        </div>
                    </article>
                </li>
            </ul>
            <Swiper
                v-if="tab0.cards && tab0.cards.length && isMobileView"
                class="diff_card_swiper"
                :space-between="8"
                slides-per-view="auto"
            >
                <SwiperSlide v-for="(card, c) in tab0.cards" :key="c">
                    <article class="diff_card">
                        <figure>
                            <img :src="card.image" :alt="card.alt || ''" width="460" height="320" />
                        </figure>
                        <div>
                            <h3>{{ card.title }}</h3>
                            <p>{{ card.desc }}</p>
                        </div>
                    </article>
                </SwiperSlide>
            </Swiper>

            <DiffQrRow v-if="tab0.qr" :title="tab0.qr.title" :desc="tab0.qr.desc" />
        </div>

        <!-- 탭 1: CAFE25 -->
        <div v-show="depth1ActiveIdx === 0 && activeTab === 1" class="brand_panel cafe_panel">
            <figure v-if="tab1.hero" class="brand_panel_bg" :style="{ backgroundColor: '#fff' }">
                <img :src="tab1.hero" :alt="tab1.heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="tab1.title" class="brand_panel_title">
                <h2 v-html="tab1.title"></h2>
                <p v-if="tab1.subtitle" v-html="tab1.subtitle" />
            </header>

            <section v-for="(sec, i) in tab1.sections" :key="i">
                <header class="sec_header">

                    <h3 v-html="sec.title"></h3>

                    <p v-if="sec.desc || sec.source" class="sec_header_desc"><span v-if="sec.desc" v-html="sec.desc"></span><cite v-if="sec.source" class="sec_cite">{{ sec.source }}</cite></p>

                </header>

                <!-- 카드형 -->
                <template v-if="sec.type === 'cards'">
                    <ul v-if="!isMobileView" class="cafe25_card_list" role="list">
                        <li v-for="(card, c) in sec.cards" :key="c">
                            <div>
                                <img :src="card.image" :alt="card.alt || ''" />
                            </div>
                        </li>
                    </ul>
                    <Swiper
                        v-else
                        class="cafe25_card_swiper"
                        :space-between="8"
                        slides-per-view="auto"
                    >
                        <SwiperSlide v-for="(card, c) in sec.cards" :key="c">
                            <div class="cafe25_card_slide">
                                <img :src="card.image" :alt="card.alt || ''" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </template>

                <!-- 이미지형 -->
                <figure v-else-if="sec.type === 'image'" class="cafe25_img_wrap">
                    <img :src="sec.image" :alt="sec.imageAlt || ''" width="938" height="472" />
                </figure>

                <!-- 분할형 (이미지 + 테이블) -->
                <div v-else-if="sec.type === 'split'" class="cafe25_split">
                    <div class="cafe25_split_img">
                        <img :src="isMobileView && sec.imageMo ? sec.imageMo : sec.image" :alt="sec.imageAlt || ''" />
                    </div>
                    <div class="cafe25_split_table">
                        <table class="cafe25_table">
                            <thead>
                                <tr>
                                    <th
                                        v-for="(col, ci) in sec.columns"
                                        :key="ci"
                                        scope="col"
                                        :style="{ width: col.width + 'px', textAlign: col.align }"
                                    ><span>{{ col.label }}</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, ri) in sec.rows" :key="ri">
                                    <td v-for="(col, ci) in sec.columns" :key="ci" :style="{ textAlign: col.align }"><span>{{ row[col.key] }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 테이블형 -->
                <div v-else-if="sec.type === 'table'" class="cafe25_table_wrap">
                    <!-- PC: 기존 테이블 -->
                    <table v-if="!isMobileView" class="cafe25_table">
                        <thead>
                            <tr>
                                <th
                                    v-for="(col, ci) in sec.columns"
                                    :key="ci"
                                    scope="col"
                                    :style="{ width: col.width + 'px', textAlign: col.align }"
                                ><span>{{ col.label }}</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(row, ri) in sec.rows" :key="ri">
                                <td v-for="(col, ci) in sec.columns" :key="ci" :style="{ textAlign: col.align }">
                                    <img v-if="ci === 0 && row.flag" :src="row.flag" :alt="row.country" class="flag_icon" width="24" height="24" />
                                    <span>{{ row[col.key] }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- Mobile: row별 Swiper -->
                    <template v-if="isMobileView">
                        <Swiper
                            :modules="[Pagination]"
                            :slides-per-view="1"
                            :pagination="{ el: '.cafe25_table_pagination', clickable: true }"
                            class="cafe25_table_swiper"
                        >
                            <SwiperSlide v-for="(row, ri) in sec.rows" :key="ri">
                                <table class="tbl_mo">
                                    <tbody>
                                        <tr v-for="(col, ci) in sec.columns" :key="ci">
                                            <th scope="row" style="width: 96px"><span>{{ col.label }}</span></th>
                                            <td>
                                                <img v-if="ci === 0 && row.flag" :src="row.flag" :alt="row.country" class="flag_icon" width="24" height="24" />
                                                <span>{{ row[col.key] }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </SwiperSlide>
                        </Swiper>
                        <div class="cafe25_table_pagination"></div>
                    </template>
                </div>
            </section>
        </div>

        <!-- 탭 2: CHICKEN25 -->
        <div v-show="depth1ActiveIdx === 0 && activeTab === 2" class="brand_panel chicken_panel">
            <figure v-if="tab2.hero" class="brand_panel_bg">
                <img :src="tab2.hero" :alt="tab2.heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="tab2.title" class="brand_panel_title">
                <h2 v-html="tab2.title"></h2>
                <p v-if="tab2.subtitle" v-html="tab2.subtitle" />
            </header>

            <section v-for="(sec, i) in tab2.sections" :key="i">
                <header class="sec_header">

                    <h3 v-html="sec.title"></h3>

                    <p v-if="sec.desc" class="sec_header_desc" v-html="sec.desc" />

                </header>

                <FeatureCards v-if="sec.type === 'text_cards'" :items="sec.cards" type="text" />
            </section>

            <ul v-if="tab2.imgGrid && tab2.imgGrid.length && !isMobileView" class="img_grid" role="list">
                <li v-for="(item, i) in tab2.imgGrid" :key="i">
                    <div>
                        <img :src="item.image" :alt="item.alt || ''" />
                    </div>
                </li>
            </ul>
            <Swiper
                v-else-if="tab2.imgGrid && tab2.imgGrid.length && isMobileView"
                class="img_grid_swiper"
                slides-per-view="auto"
                :space-between="8"
            >
                <SwiperSlide v-for="(item, i) in tab2.imgGrid" :key="i">
                    <div class="img_grid_slide">
                        <img :src="item.image" :alt="item.alt || ''" />
                    </div>
                </SwiperSlide>
            </Swiper>

            <DiffQrRow v-if="tab2.qr" :title="tab2.qr.title" :desc="tab2.qr.desc" />
        </div>

        <!-- 탭 3: GOPIZZA -->
        <div v-show="depth1ActiveIdx === 0 && activeTab === 3" class="brand_panel gopizza_panel">
            <figure v-if="tab3.hero" class="brand_panel_bg">
                <img :src="tab3.hero" :alt="tab3.heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="tab3.title" class="brand_panel_title">
                <h2 v-html="tab3.title"></h2>
                <p v-if="tab3.subtitle" v-html="tab3.subtitle" />
            </header>

            <section v-for="(sec, i) in tab3.sections" :key="i">
                <header class="sec_header">

                    <h3 v-html="sec.title"></h3>

                    <p v-if="sec.desc" class="sec_header_desc" v-html="sec.desc" />

                </header>

                <!-- 이미지 2열 -->
                <ul v-if="sec.type === 'img_grid' && !isMobileView" class="img_grid" role="list">
                    <li v-for="(item, gi) in sec.images" :key="gi">
                        <div>
                            <img v-if="item.image" :src="item.image" :alt="item.alt || ''" />
                        </div>
                    </li>
                </ul>
                <Swiper
                    v-else-if="sec.type === 'img_grid' && isMobileView"
                    class="img_grid_swiper"
                    slides-per-view="auto"
                    :space-between="8"
                >
                    <SwiperSlide v-for="(item, gi) in sec.images" :key="gi">
                        <div class="img_grid_slide">
                            <img v-if="item.image" :src="item.image" :alt="item.alt || ''" />
                        </div>
                    </SwiperSlide>
                </Swiper>

                <!-- 단일 이미지 -->
                <figure v-else-if="sec.type === 'image'" class="gopizza_img_wrap">
                    <img v-if="sec.image" :src="sec.image" :alt="sec.imageAlt || ''" />
                </figure>

                <!-- 메뉴 소개 (REGULAR / GRAB 2패널) -->
                <ul v-else-if="sec.type === 'menu'" class="gopizza_menu">
                    <li v-for="(pnl, pi) in sec.panels" :key="pi" class="gopizza_menu_panel">
                        <div>
                            <img v-if="pnl.image" :src="pnl.image" :alt="pnl.size" />
                        </div>
                        <div class="gopizza_menu_info">
                            <div class="gopizza_menu_title">
                                <strong>{{ pnl.size }}</strong>
                                <div>
                                    <span v-for="(tag, ti) in pnl.tags" :key="ti" class="gopizza_menu_tag">{{ tag }}</span>
                                </div>
                            </div>
                            <!-- PC: 기존 테이블 -->
                            <div v-if="!isMobileView" class="com_table_wrap">
                                <table class="com_table com_table_col">
                                    <thead>
                                        <tr>
                                            <th
                                                v-for="(col, ci) in pnl.columns"
                                                :key="ci"
                                                scope="col"
                                                :style="{ textAlign: col.align }"
                                            >{{ col.label }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, ri) in pnl.rows" :key="ri">
                                            <td
                                                v-for="(col, ci) in pnl.columns"
                                                :key="ci"
                                                :style="{ textAlign: col.align }"
                                            >
                                                <span v-if="ci === 0" class="gopizza_menu_name">
                                                    {{ row[col.key] }}
                                                    <em v-if="row.badge" class="gopizza_badge_best">{{ row.badge }}</em>
                                                </span>
                                                <span v-else>{{ row[col.key] }}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- Mobile: row별 Swiper -->
                            <template v-if="isMobileView">
                                <Swiper
                                    :modules="[Pagination]"
                                    :slides-per-view="1"
                                    :pagination="{ el: `.gopizza_menu_pagi_${pnl.size.replace(/[^a-z0-9]/gi, '')}`, clickable: true }"
                                    class="cafe25_table_swiper"
                                >
                                    <SwiperSlide v-for="(row, ri) in pnl.rows" :key="ri">
                                        <table class="tbl_mo">
                                            <tbody>
                                                <tr v-for="(col, ci) in pnl.columns" :key="ci">
                                                    <th scope="row" style="width: 136px"><span>{{ col.label }}</span></th>
                                                    <td>
                                                        <span v-if="ci === 0" class="gopizza_menu_name">
                                                            {{ row[col.key] }}
                                                            <em v-if="row.badge" class="gopizza_badge_best">{{ row.badge }}</em>
                                                        </span>
                                                        <span v-else>{{ row[col.key] }}</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </SwiperSlide>
                                </Swiper>
                                <div :class="`gopizza_menu_pagi_${pnl.size.replace(/[^a-z0-9]/gi, '')} gopizza_table_pagination`"></div>
                            </template>
                        </div>
                    </li>
                </ul>

                <!-- 배달·픽업 앱 (2열) -->
                <ul v-else-if="sec.type === 'phone_grid' && !isMobileView" class="img_grid" role="list">
                    <li v-for="(item, ii) in sec.items" :key="ii">
                        <img v-if="item.image" :src="item.image" :alt="item.alt || ''" />
                    </li>
                </ul>
                <Swiper
                    v-else-if="sec.type === 'phone_grid' && isMobileView"
                    class="img_grid_swiper"
                    slides-per-view="auto"
                    :space-between="8"
                >
                    <SwiperSlide v-for="(item, ii) in sec.items" :key="ii">
                        <div class="img_grid_slide">
                            <img v-if="item.image" :src="item.image" :alt="item.alt || ''" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>

            <div class="diff_bottom_row">
                <DiffQrRow v-if="tab3.qr" :title="tab3.qr.title" :desc="tab3.qr.desc" />
                <a v-if="tab3.link" :href="tab3.link.url" class="gopizza_link" target="_blank" rel="noopener noreferrer">
                    <figure aria-hidden="true">
                        <img v-if="isMobileView" :src="imgQrMo" alt="" />
                    </figure>
                    <div>
                        <strong>{{ tab3.link.title }}</strong>
                        <p v-html="isMobileView && tab3.link.descMo ? tab3.link.descMo : tab3.link.desc" />
                    </div>
                </a>
            </div>
        </div>

        <!-- depth1 = 1: 신선강화점 -->
        <div v-if="depth1ActiveIdx === 1" class="brand_panel sinsen_panel">
            <figure v-if="sinsen.hero" class="brand_panel_bg">
                <img :src="sinsen.hero" :alt="sinsen.heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="sinsen.title" class="brand_panel_title">
                <h2 v-html="sinsen.title"></h2>
                <p v-if="sinsen.subtitle" v-html="sinsen.subtitle" />
            </header>

            <section v-for="(sec, i) in sinsen.sections" :key="i">
                <header class="sec_header">

                    <h3 v-html="sec.title"></h3>

                    <p v-if="sec.desc" class="sec_header_desc" v-html="sec.desc" />

                    <p v-if="sec.mobileDesc" class="sec_mobile_desc">{{ sec.mobileDesc }}</p>

                </header>

                <!-- 특징 카드 4열 -->
                <FeatureCards v-if="sec.features" :items="sec.features" type="icon" no-pagination class="sinsen_feature" />

                <!-- 배송 흐름도 -->
                <div v-if="sec.flow" class="info_card info_card_flow">
                    <strong v-if="sec.flowTitle">{{ sec.flowTitle }}</strong>
                    <p v-if="sec.flowNote">{{ sec.flowNote }}</p>
                    <!-- 26.06.29 add 정다희 : num_list 추가--> 
                    <ol class="num_list">
                        <li><p>파트너사 → 단일 센터 입고로 물류비 절감 → 가격 경쟁력 ↑</p></li>
                        <li><p>신선 센터 입고 시 신선상품 검품을 통해 1차 선도관리 진행</p></li>
                    </ol>
                    <!-- //26.06.29 add 정다희 : num_list 추가--> 
                    <img :src="isMobileView ? imgFlowMo : imgFlow" alt="" class="sinsen_flow_img" />
                </div>

                <!-- 운영 장점 체크리스트 카드 -->
                <div v-if="sec.advantages" class="info_card">
                    <ul class="info_list">
                        <li v-for="(item, ii) in sec.advantages.items" :key="ii">
                            <div>
                                <span>{{ item.text }}</span> 
                                <span v-if="item.note" class="info_check_note">{{ item.note }}</span>
                            </div>
                        </li> 
                    </ul>
                </div>
            </section>
        </div>

        <!-- depth1 = 2: 매장/서비스 -->
        <!-- 생활 서비스 -->
        <div v-show="depth1ActiveIdx === 2 && storeActiveTab === 0" class="brand_panel pop_panel">
            <!-- 3depth 탭 네비 -->
            <nav class="service_tab_wrap" ref="serviceWrapEl" role="tablist" aria-label="생활 서비스">
                <div class="service_tab_list" ref="serviceListEl" :style="serviceTransformStyle"
                    @touchstart.passive="serviceOnTouchStart" @touchmove.passive="serviceOnTouchMove"
                    @mousedown="serviceOnMouseDown">
                    <button
                        v-for="(tab, i) in store.tabs[0].serviceTabs"
                        :key="i"
                        type="button"
                        role="tab"
                        :aria-selected="serviceActiveTab === i"
                        class="service_tab_item"
                        :class="{ is_active: serviceActiveTab === i }"
                        @click="serviceActiveTab = i"
                    >
                        <span class="service_tab_icon" aria-hidden="true"></span>
                        <span class="service_tab_label">{{ tab.label }}</span>
                    </button>
                </div>
            </nav>

            <!-- 3depth 패널 -->
            <div
                v-for="(tab, i) in store.tabs[0].serviceTabs"
                :key="i"
                v-show="serviceActiveTab === i"
                class="service_panel">

                <!-- 26.05.15 Edit 이종환 : 그 외 패널: 기본 구조를 각 패널로 다시 분리 -->
                <template v-if="i === 0">
                        <figure v-if="tab.hero" class="brand_panel_bg">
                            <img :src="tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                        </figure>
                        <header v-if="tab.title" class="brand_panel_title">
                            <h2 v-html="tab.title"></h2>
                            <p v-if="tab.desc" v-html="tab.desc" />
                        </header>
                    <section>
                        <div class="usage_group">
                            <h4 class="usage_group_title">{{ tab.sub_item.title }}</h4>
                            <p class="explain" v-html="tab.sub_item.explain"></p>
                            <p class="retail_note" v-html="tab.sub_item.retail_note"></p>

                            <ul class="logo_list">
                                <li v-for="item in tab.sub_item.bank" :key="item">
                                    <img :src="item.logo" :alt="name" />
                                </li>
                            </ul>
                        </div>
                    </section>
                </template>

                <template v-else-if="i === 1">
                        <figure v-if="tab.hero" class="brand_panel_bg">
                            <img :src="tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                        </figure>
                        <header v-if="tab.title" class="brand_panel_title">
                            <h2 v-html="tab.title"></h2>
                            <p v-if="tab.desc" v-html="tab.desc" />
                        </header>
                    <section>
                        <div v-if="tab.table" class="com_table_wrap">
                            <table class="com_table">
                                <tbody>
                                    <tr v-for="(row, ri) in tab.table.rows" :key="ri">
                                        <th scope="row">{{ row.head }}</th>
                                        <td>
                                            <div class="cash_table_cell">
                                                <span>{{ row.text }}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </template>

                <!-- 교통카드 충전: LNB + 콘텐츠 2열 레이아웃 -->
                <template v-else-if="i === 2">
                    <header v-if="tab.pageTitle" class="brand_panel_title">
                        <h2 v-html="tab.pageTitle"></h2>
                        <p v-if="tab.pageDesc" v-html="tab.pageDesc" />
                    </header>
                    <div class="pop_wrap">
                        <nav class="pop_lnb" aria-label="팝카드 메뉴">
                            <ul>
                                <li v-for="(lnb, li) in tab.lnbItems" :key="li">
                                    <button
                                        type="button"
                                        :class="{ is_active: popLnbActiveIdx === li }"
                                        @click="scrollToSection(li)"
                                    >{{ lnb }}</button>
                                </li>
                            </ul>
                        </nav>
                        <div class="pop_content">
                            <Accordion :multiple="true" class="pop_sec_acc">
                                <!-- 팝카드란? -->
                                <AccordionItem item-key="pop0" @opened="onPopCard0Opened">
                                    <template #title>{{ tab.popTitle }}</template>
                                    <section id="pop-sec-0" data-pop-sec="0" class="pop_sec">
                                        <header class="sec_header">
                                            <h3 v-html="tab.popTitle"></h3>
                                            <p v-if="tab.popDesc" class="sec_header_desc" v-html="tab.popDesc" />
                                            <p class="pop_exclude">{{ tab.popExclude }}</p>
                                        </header>
                                        <Swiper
                                            class="pop_card_swiper"
                                            slides-per-view="auto"
                                            :space-between="20"
                                            :observer="true"
                                            :observe-parents="true"
                                            @swiper="onPopCardSwiper"
                                        >
                                            <SwiperSlide v-for="(card, ci) in tab.popCards" :key="ci" class="pop_card_item">
                                                <strong class="pop_card_name">{{ card.name }}</strong>
                                                <figure class="pop_card_thumb">
                                                    <picture>
                                                        <source v-if="card.imgMo" media="(max-width: 768px)" :srcset="card.imgMo" />
                                                        <img :src="card.img" :alt="card.name" />
                                                    </picture>
                                                </figure>
                                                <div class="pop_card_body">
                                                    <p class="pop_card_desc">{{ card.desc }}</p>
                                                    <p v-if="card.note" class="pop_card_note" :class="{ is_warn: card.noteWarn }">{{ card.note }}</p>
                                                    <div v-if="card.logos && card.logos.length" class="pop_card_logos">
                                                        <img
                                                            v-for="(logo, li) in card.logos"
                                                            :key="li"
                                                            :src="logo.src"
                                                            :width="logo.w"
                                                            :height="logo.h"
                                                            alt=""
                                                            class="pop_logo_thumb"
                                                        />
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </Swiper>
                                    </section>
                                </AccordionItem>

                                <!-- 교통카드 충전 서비스 -->
                                <AccordionItem item-key="pop-charging" @opened="onChargingOpened">
                                    <template #title>{{ tab.chargingTitle }}</template>
                                    <section class="pop_sec">
                                        <header class="sec_header">
                                            <h3 v-html="tab.chargingTitle"></h3>
                                        </header>
                                        <!-- PC: 기존 flex 레이아웃 -->
                                        <ul class="charging_service_list">
                                            <li v-for="(item, ci) in tab.chargingItems" :key="ci" class="charging_service_item">
                                                <img :src="item.img" :alt="item.name" />
                                            </li>
                                        </ul>
                                        <!-- 모바일: Swiper -->
                                        <Swiper
                                            class="charging_service_swiper"
                                            slides-per-view="auto"
                                            :space-between="8"
                                            :observer="true"
                                            :observe-parents="true"
                                            @swiper="onChargingSwiper"
                                        >
                                            <SwiperSlide v-for="(item, ci) in tab.chargingItems" :key="ci" class="charging_service_item">
                                                <img :src="item.img" :alt="item.name" />
                                            </SwiperSlide>
                                        </Swiper>
                                        <p class="charging_service_note">
                                            <span class="charging_note_label">{{ tab.chargingNote.label }}</span>
                                            {{ tab.chargingNote.text }}
                                        </p>
                                    </section>
                                </AccordionItem>

                                <!-- 교통 사용처 안내 -->
                                <AccordionItem item-key="pop1">
                                    <template #title>{{ tab.lnbItems[1] }}</template>
                                    <section id="pop-sec-1" data-pop-sec="1" class="pop_sec">
                                        <div class="usage_header">
                                            <header class="sec_header">

                                                <h3 v-html="tab.lnbItems[1]"></h3>

                                            </header>
                                            <select
                                                class="usage_select_box"
                                                v-model="trafficSelectVal"
                                                :aria-label="t.common.trafficSelectAria"
                                            >
                                                <option value="" disabled>{{ t.common.selectPlaceholder }}</option>
                                                <option v-for="o in tab.trafficSelectOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
                                            </select>
                                        </div>

                                        <div v-if="trafficSelectVal && tab.trafficOptions[trafficSelectVal]" class="usage_group">
                                            <h4 class="usage_group_title">{{ tab.trafficOptions[trafficSelectVal].title }}</h4>
                                            <ul v-if="trafficSelectVal !== 'express' && tab.trafficOptions[trafficSelectVal].bullets?.length" class="list_dotted">
                                                <li v-for="(item, bi) in tab.trafficOptions[trafficSelectVal].bullets" :key="bi">{{ item }}</li>
                                            </ul>
                                            <!-- 고속버스일 때만 로고 표시 -->
                                            <ul v-if="trafficSelectVal === 'express'" class="logo_list">
                                                <li v-for="(logo, li) in tab.trafficOptions[trafficSelectVal].logos" :key="li">
                                                    <img :src="logo" :alt="tab.trafficOptions[trafficSelectVal].bullets[li]" />
                                                </li>
                                            </ul>
                                        </div>
                                    </section>






                                </AccordionItem>

                                <!-- 유통 사용처 안내 -->
                                <AccordionItem item-key="pop2">
                                    <template #title>{{ tab.lnbItems[2] }}</template>
                                    <section id="pop-sec-2" data-pop-sec="2" class="pop_sec">
                                        <div class="usage_header">
                                            <header class="sec_header">

                                                <h3 v-html="tab.lnbItems[2]"></h3>

                                            </header>
                                            <select
                                                class="usage_select_box"
                                                v-model="retailSelectVal"
                                                :aria-label="t.common.retailSelectAria"
                                            >
                                                <option value="" disabled>{{ t.common.selectPlaceholder }}</option>
                                                <option v-for="o in tab.retailSelectOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
                                            </select>
                                        </div>

                                        <div v-if="retailSelectVal && tab.retailOptions[retailSelectVal]" class="usage_group">
                                            <h4 class="usage_group_title">{{ tab.retailOptions[retailSelectVal].title }}</h4>
                                            <p v-if="tab.retailOptions[retailSelectVal].note" class="retail_note">{{ tab.retailOptions[retailSelectVal].note }}</p>
                                            <!-- 로고 그리드 -->
                                            <ul v-if="tab.retailOptions[retailSelectVal].items" class="logo_list">
                                                <li v-for="(item, ri) in tab.retailOptions[retailSelectVal].items" :key="ri">
                                                    <img v-if="item.logo" :src="item.logo" :alt="item.brand" />
                                                    <span v-else class="logo_placeholder"></span>
                                                </li>
                                            </ul>
                                            <!-- 텍스트 목록 -->
                                            <ul v-else-if="tab.retailOptions[retailSelectVal].bullets?.length && !tab.retailOptions[retailSelectVal].bullets[0]?.dt" class="list_dotted">
                                                <li v-for="(bullet, bi) in tab.retailOptions[retailSelectVal].bullets" :key="bi">{{ bullet }}</li>
                                            </ul>
                                            <!-- 정의 목록 (dt/dd) -->
                                            <dl v-else-if="tab.retailOptions[retailSelectVal].bullets?.length" class="usage_def_list">
                                                <template v-for="(bullet, bi) in tab.retailOptions[retailSelectVal].bullets" :key="bi">
                                                    <dt>{{ bullet.dt }}</dt>
                                                    <dd>{{ bullet.dd }}</dd>
                                                </template>
                                            </dl>
                                            <p v-if="tab.retailOptions[retailSelectVal].footnote" class="retail_footnote">{{ tab.retailOptions[retailSelectVal].footnote }}</p>
                                        </div>
                                    </section>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </template>

                <!-- 기프트카드 패널 -->
                <template v-else-if="i === 3">
                    <figure v-if="tab.hero" class="brand_panel_bg">
                        <img :src="tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                    </figure>
                    <header v-if="tab.title" class="brand_panel_title">
                        <h2 v-html="tab.title"></h2>
                        <p v-if="tab.desc" v-html="tab.desc" />
                    </header>
                    <section>
                        <header class="sec_header">

                            <h3 v-html="tab.advantageTitle"></h3>

                        </header>
                        <div class="gift_advantage_cards">
                            <FeatureCards :items="tab.advantages" />
                        </div>
                    </section>

                    <section class="sec_gift_brand">
                        <header class="sec_header">

                            <h3 v-html="tab.brandTitle"></h3>

                        </header>
                        <div class="gift_brand_slider">
                            <button type="button" class="gift_brand_nav gift_brand_prev" :aria-label="t.common.prevAria">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </button>
                            <Swiper
                                :modules="[Pagination, Navigation]"
                                :slides-per-view="3"
                                :slides-per-group="3"
                                :space-between="14"
                                :breakpoints="{
                                    769: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 12 }
                                }"
                                :speed="700"
                                :observer="true"
                                :observe-parents="true"
                                :navigation="{ prevEl: '.gift_brand_prev', nextEl: '.gift_brand_next' }"
                                :pagination="{ el: '.gift_brand_pagination', clickable: true }"
                                class="gift_brand_swiper"
                                @swiper="onGiftSwiper"
                            >
                                <SwiperSlide v-for="(brand, bi) in tab.brands" :key="bi">
                                    <figure class="gift_brand_card">
                                        <img :src="brand.img" :alt="brand.name" />
                                    </figure>
                                </SwiperSlide>
                            </Swiper>
                            <button type="button" class="gift_brand_nav gift_brand_next" :aria-label="t.common.nextAria">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </button>
                        </div>
                        <div class="gift_brand_pagination"></div>
                    </section>
                    <section>
                        <header class="sec_header">

                            <h3 v-html="tab.purchaseTitle"></h3>

                            <p v-if="tab.purchaseNote" class="sec_header_desc" v-html="tab.purchaseNote" />

                        </header>
                        <div class="gift_purchase_wrap">
                            <figure class="gift_purchase_img">
                                <img :src="tab.purchaseImg" alt="" />
                            </figure>
                            <ol class="gift_purchase_steps">
                                <li v-for="(step, si) in tab.purchaseSteps" :key="si" class="gift_purchase_step">
                                    <div class="gift_step_header">
                                        <em class="gift_step_num">{{ step.num }}</em>
                                        <strong class="gift_step_title" v-html="step.title"></strong>
                                    </div>
                                    <p class="gift_step_desc" v-html="step.desc"></p>
                                </li>
                            </ol>
                        </div>
                    </section>
                    <section>
                        <header class="sec_header gift_usage_heading">

                            <h3 v-html="tab.usageTitle"></h3>

                            <div v-if="tab.usageDesc" class="sec_header_desc" v-html="tab.usageDesc" />

                        </header>
                        <div class="gift_usage_wrap">
                            <div class="gift_usage_group">
                                <h3>{{ tab.onlineLabel }}</h3>
                                <Steps type="2" :items="tab.onlineSteps" />
                            </div>
                            <div class="gift_usage_group">
                                <h3>{{ tab.offlineLabel }}</h3>
                                <Steps type="2" :items="tab.offlineSteps" />
                            </div>
                        </div>
                    </section>
                </template>

                <!-- GS25 유심 요금제 패널 -->
                <template v-else-if="i === 4">
                    <figure v-if="tab.hero" class="brand_panel_bg">
                        <img :src="tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                    </figure>
                    <header v-if="tab.title" class="brand_panel_title">
                        <h2 v-html="tab.title"></h2>
                        <p v-if="tab.desc" v-html="tab.desc" />
                    </header>
                    <section>
                        <header class="sec_header">

                            <h3 v-html="tab.advantageTitle"></h3>

                        </header>
                        <FeatureCards :items="tab.advantages" class="usim_advantage_cards" />
                    </section>
                    <section>
                        <header class="sec_header">

                            <h3 v-html="tab.introTitle"></h3>

                        </header>
                        <div class="usim_plan_table_wrap">
                            <table class="usim_plan_table">
                                <thead>
                                    <tr>
                                        <th rowspan="2" scope="col">{{ tab.planTable.productName }}</th>
                                        <th colspan="3" scope="col">{{ tab.planTable.provision }}</th>
                                        <th rowspan="2" scope="col">{{ tab.planTable.normalPrice }}</th>
                                        <th rowspan="2" scope="col">{{ tab.planTable.promoDiscount }}</th>
                                        <th rowspan="2" scope="col" v-html="tab.planTable.monthlyFee"></th>
                                        <th rowspan="2" scope="col" v-html="tab.planTable.competitor"></th>
                                    </tr>
                                    <tr>
                                        <th scope="col">{{ tab.planTable.data }}</th>
                                        <th scope="col">{{ tab.planTable.voice }}</th>
                                        <th scope="col">{{ tab.planTable.sms }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(plan, pi) in tab.plans" :key="pi">
                                        <td>{{ plan.name }}</td>
                                        <td class="usim_plan_data" v-html="plan.data.replace('\n', '<br />')"></td>
                                        <td>{{ plan.voice }}</td>
                                        <td>{{ plan.sms }}</td>
                                        <td>{{ plan.normalPrice }}</td>
                                        <td>{{ plan.discount }}</td>
                                        <td>
                                            {{ plan.monthly }}<br />
                                            <em class="usim_plan_dc">{{ plan.monthlyDc }}</em>
                                        </td>
                                        <td>{{ plan.competitor }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section>
                        <header class="sec_header">

                            <h3 v-html="tab.benefitTitle"></h3>

                        </header>
                        <ul class="imgcard_list">
                            <li v-for="(card, ci) in tab.benefitCards" :key="ci" class="imgcard_item">
                                <figure class="imgcard_img">
                                    <img v-if="card.img" :src="card.img" :alt="card.imgAlt" />
                                </figure>
                                <div class="imgcard_body">
                                    <h4>{{ card.title }}</h4>
                                    <ul class="imgcard_sublist">
                                        <li v-for="(item, ii) in card.items" :key="ii">
                                            <span class="imgcard_icon"></span>
                                            <span>{{ item }}</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section class="usim_use">
                        <header class="sec_header">

                            <h3 v-html="tab.purchaseTitle" class="h3_steps"></h3>

                        </header>
                        <Steps type="2" :items="tab.purchaseSteps" />
                    </section>

                    <section>
                        <header class="sec_header">

                            <h3 v-html="tab.phoneTitle"></h3>

                        </header>
                        <dl class="usim_phone_list">
                            <template v-for="(phone, pi) in tab.phones" :key="pi">
                                <dt>{{ phone.term }}</dt>
                                <dd>{{ phone.desc }}</dd>
                            </template>
                        </dl>
                    </section>

                </template>

                <!-- 하이패스 카드/단말기 패널 -->
                <template v-else-if="i === 5">
                    <figure v-if="tab.hero" class="brand_panel_bg">
                        <img :src="tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                    </figure>
                    <header v-if="tab.title" class="brand_panel_title">
                        <h2 v-html="tab.title"></h2>
                        <p v-if="tab.desc" v-html="tab.desc" />
                        <ul class="list_caution">
                            <li>* 하이플러스카드에서 출시한 모든 카드를 충전하실 수 있습니다. (http://www.hipluscard.co.kr/)</li>
                            <li>* 하이패스카드(자동충전) 및 단말기를 구매하실 수 있습니다.</li>
                        </ul>
                    </header>
                    <section class="hi_pass">
                        <header class="sec_header">

                            <h3 v-html="tab.hipassStepTitle" class="h3_steps"></h3>

                        </header>
                        <Steps type="2" :items="tab.hipassSteps" />
                    </section>
                    <section>
                        <header class="sec_header">

                            <h3 v-html="tab.hipassChargeTitle"></h3>

                            <p v-if="tab.hipassChargeDesc" class="sec_header_desc" v-html="tab.hipassChargeDesc" />

                        </header>
                    </section>
                    <section>
                        <header class="sec_header">

                            <h3 v-html="tab.hipassTerminalTitle"></h3>

                            <p v-if="tab.hipassTerminalDesc" class="sec_header_desc" v-html="tab.hipassTerminalDesc" />

                        </header>
                        <div class="hipass_terminal_img">
                            <img :src="tab.hipassTerminalImg" :alt="tab.hipassTerminalImgAlt" />
                        </div>
                    </section>
                </template>

                <!-- 고속도로 미납 통행료 납부 패널 -->
                <template v-else-if="i === 6">
                    <figure v-if="tab.hero" class="brand_panel_bg">
                        <img :src="tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                    </figure>
                    <header v-if="tab.title" class="brand_panel_title">
                        <h2 v-html="tab.title"></h2>
                        <p v-if="tab.desc" v-html="tab.desc" />
                    </header>
                    <section class="sec_unpaid_advantage">
                        <header class="sec_header">

                            <h3 v-html="tab.serviceTitle"></h3>

                            <p v-if="tab.serviceDesc" class="sec_header_desc" v-html="tab.serviceDesc" />

                        </header>
                        <FeatureCards :items="tab.serviceAdvantages" />
                    </section>
                    <section class="sec_unpaid_method">
                        <header class="sec_header">

                            <h3 v-html="tab.unpaidTitle" class="h3_steps"></h3>

                        </header>
                        <Steps type="2" :items="tab.unpaidSteps" />
                    </section>
                </template>

                <!-- 온라인몰 편의점 결제 패널 (Figma 97:16410, 97:16422) -->
                <template v-else-if="i === 7">
                    <figure v-if="tab.hero" class="brand_panel_bg">
                        <img :src="tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                    </figure>
                    <header v-if="tab.title" class="brand_panel_title">
                        <h2 v-html="tab.title"></h2>
                        <p v-if="tab.desc" v-html="tab.desc" />
                    </header>
                    <section class="sec_mall_payment_advantage">
                        <header class="sec_header">

                            <h3 v-html="tab.serviceTitle"></h3>

                            <p v-if="tab.serviceDesc" class="sec_header_desc" v-html="tab.serviceDesc" />

                        </header>
                        <FeatureCards :items="tab.serviceAdvantages" />
                    </section>
                    <section class="sec_mall_payment_method">
                        <header class="sec_header">

                            <h3 v-html="tab.mallPaymentTitle"></h3>

                        </header>
                        <Steps type="2" :items="tab.mallPaymentSteps" />
                    </section>
                    <section class="sec_mall_sites">
                        <header class="sec_header">
                            <h3 v-html="tab.mallSiteTitle"></h3>
                            <p v-if="tab.mallSiteNote" class="mall_site_note">{{ tab.mallSiteNote }}</p>
                        </header>
                        <!-- PC -->
                        <ul v-if="!isMobileView" class="mall_site_list">
                            <li v-for="(item, si) in tab.mallSiteItems" :key="si">
                                <figure>
                                    <div class="mall_site_thumb">
                                        <img :src="item.img" :alt="item.name" />
                                    </div>
                                    <figcaption>{{ item.name }}</figcaption>
                                </figure>
                            </li>
                        </ul>
                        <!-- 모바일: Swiper -->
                        <Swiper
                            v-else
                            slides-per-view="auto"
                            :space-between="8"
                            class="mall_site_swiper"
                        >
                            <SwiperSlide v-for="(item, si) in tab.mallSiteItems" :key="si">
                                <figure class="mall_site_figure">
                                    <div class="mall_site_thumb">
                                        <img :src="item.img" :alt="item.name" />
                                    </div>
                                    <figcaption>{{ item.name }}</figcaption>
                                </figure>
                            </SwiperSlide>
                        </Swiper>
                    </section>
                </template>
            </div>
        </div>

        <!-- 택배&픽업 -->
        <div v-show="depth1ActiveIdx === 2 && storeActiveTab === 1" class="brand_panel delivery_panel">
            <nav class="service_tab_wrap" ref="deliveryWrapEl" role="tablist" aria-label="택배&픽업 서비스">
                <div class="service_tab_list" ref="deliveryListEl" :style="deliveryTransformStyle"
                    @touchstart.passive="deliveryOnTouchStart" @touchmove.passive="deliveryOnTouchMove"
                    @mousedown="deliveryOnMouseDown">
                    <button
                        v-for="(tab, i) in store.tabs[1].serviceTabs"
                        :key="i"
                        type="button"
                        role="tab"
                        :aria-selected="deliveryActiveTab === i"
                        class="service_tab_item"
                        :class="{ is_active: deliveryActiveTab === i }"
                        @click="deliveryActiveTab = i"
                    >
                        <span class="service_tab_icon" aria-hidden="true"></span>
                        <span class="service_tab_label">{{ tab.label }}</span>
                    </button>
                </div>
            </nav>
            <div>
                <template v-for="(tab, i) in store.tabs[1].serviceTabs" :key="i">
                    <div v-show="deliveryActiveTab === i" :class="['service_panel', `delivery_panel_${i+1}`]">
                        <figure v-if="tab.hero" class="brand_panel_bg">
                            <img :src="tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                        </figure>
                        <header v-if="tab.title" class="brand_panel_title">
                            <h2 v-html="tab.title"></h2>
                            <p v-if="tab.desc" v-html="tab.desc" />
                            <ul v-if="tab.notes && tab.notes.length" class="list_dotted">
                                <li v-for="(note, ni) in tab.notes" :key="ni">
                                    <p v-html="note.text"></p>
                                    <p v-if="note.sub" class="note_sub">{{ note.sub }}</p>
                                </li>
                            </ul>
                        </header>
                        <section v-if="tab.steps && tab.steps.length" class="sec_delivery_service">
                            <header class="sec_header">
                                <h3 v-html="tab.stepTitle" class="h3_steps"></h3>
                            </header>
                            <Steps type="2" :items="tab.steps" />
                        </section>
                        <section v-if="tab.priceTable" class="sec_delivery_price_table">
                            <header class="sec_header">

                                <h3 v-html="tab.priceTable.title"></h3>

                            </header>
                            <div class="com_table_wrap">
                                <table class="com_table com_table_col">
                                    <colgroup>
                                        <col v-for="(w, ci) in tab.priceTable.colWidths" :key="ci" :style="{ width: w }">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th v-for="(col, ci) in tab.priceTable.columns" :key="ci" scope="col" v-html="isMobileView && col.labelMo ? col.labelMo : col.label"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(row, ri) in tab.priceTable.rows" :key="ri">
                                            <td v-for="(cell, ci) in row.cells" :key="ci" v-html="cell"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section v-if="tab.infoTable" class="sec_delivery_info_table">
                            <header class="sec_header">

                                <h3 v-html="tab.infoTable.title"></h3>

                            </header>
                            <div class="com_table_wrap">
                                <table class="com_table">
                                    <colgroup>
                                        <col v-for="(w, ci) in tab.infoTable.colWidths" :key="ci" :style="{ width: w }">
                                    </colgroup>
                                    <tbody>
                                        <tr v-for="(row, ri) in tab.infoTable.rows" :key="ri">
                                            <th scope="row">{{ row.head }}</th>
                                            <td v-if="row.items">
                                                <ul class="list_dotted">
                                                    <li v-for="(item, ii) in row.items" :key="ii"><p>{{ item }}</p></li>
                                                </ul>
                                                <div v-if="row.note && row.note.length" class="caution_note">
                                                    <p v-for="(n, ni) in row.note" :key="ni">{{ n }}</p>
                                                </div>
                                            </td>
                                            <td v-else v-html="row.text"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                        <section v-if="tab.priceItems && tab.priceItems.length" class="sec_delivery_price">
                            <header class="sec_header">

                                <h3 v-html="tab.priceTitle"></h3>

                            </header>
                            <div class="info_card">
                                <ul class="info_list">
                                    <li v-for="(item, pi) in tab.priceItems" :key="pi">
                                        <div>
                                            <span>{{ item.text }}</span>
                                            <span v-for="(sub, si) in item.subs" :key="si" class="info_check_note">{{ sub }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>
                        <section v-if="tab.cautionItems && tab.cautionItems.length" class="sec_delivery_caution">
                            <header class="sec_header">

                                <h3 v-html="tab.cautionTitle"></h3>

                            </header>
                            <FeatureCards type="icon" :items="tab.cautionItems" />
                        </section>
                        <section v-if="tab.periodItems && tab.periodItems.length" class="sec_delivery_period">
                            <header class="sec_header">

                                <h3 v-html="tab.periodTitle"></h3>

                            </header>
                            <ul class="list_dotted">
                                <li v-for="(item, pi) in tab.periodItems" :key="pi">
                                    <p>{{ item.text }}</p>
                                </li>
                            </ul>
                        </section>
                        <section v-if="tab.noticeItems && tab.noticeItems.length" class="sec_delivery_notice">
                            <header class="sec_header">

                                <h3 v-html="tab.noticeTitle" class="h3_steps"></h3>

                            </header>
                            <Steps type="2" :items="tab.noticeItems" />
                        </section>
                        <section v-if="tab.chargeItems && tab.chargeItems.length" class="sec_delivery_charge">
                            <header class="sec_header">

                                <h3 v-html="tab.chargeTitle"></h3>

                            </header>
                            <ul class="list_dotted">
                                <li v-for="(item, ii) in tab.chargeItems" :key="ii">
                                    <p>{{ item.text }}</p>
                                </li>
                            </ul>
                        </section>
                        <section v-if="tab.methodItems && tab.methodItems.length" class="sec_delivery_method">
                            <header class="sec_header">

                                <h3 v-html="tab.methodTitle"></h3>

                            </header>
                            <ul class="list_dotted">
                                <li v-for="(item, ii) in tab.methodItems" :key="ii">
                                    <p>{{ item.text }}</p>
                                </li>
                            </ul>
                        </section>
                        <section v-if="tab.pickupItems && tab.pickupItems.length" class="sec_delivery_pickup">
                            <header class="sec_header">

                                <h3 v-html="tab.pickupTitle" class="h3_steps"></h3>

                            </header>
                            <Steps type="2" :items="tab.pickupItems" />
                        </section>
                        <div v-if="tab.partnerBtnText" class="link_wrap">
                            <a href="#" class="btn_big primary btn_icon_arrow after">{{ tab.partnerBtnText }}</a>
                        </div>
                            <!-- 택배&픽업 --> <!-- 택배&픽업 --> <!-- 택배&픽업 --> <!-- 택배&픽업 -->     
                        <!-- <section v-if="tab.shoppingItems && tab.shoppingItems.length" class="sec_delivery_shopping">
                            <header class="sec_header">

                                <h3 v-html="tab.shoppingTitle"></h3>

                            </header>
                            <ul class="list_dotted">
                                <li v-for="(item, ii) in tab.shoppingItems" :key="ii">
                                    <p v-html="item.text"></p>
                                </li>
                            </ul> 
                        </section> -->
                    </div>
                </template>
            </div>
        </div>

        <!-- 공공요금수납 -->
        <div v-show="depth1ActiveIdx === 2 && storeActiveTab === 2" class="brand_panel">
            <figure v-if="store.tabs[2].hero" class="brand_panel_bg">
                <img :src="store.tabs[2].hero" :alt="store.tabs[2].heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="store.tabs[2].title" class="brand_panel_title">
                <h2 v-html="store.tabs[2].title"></h2>
                <p v-if="store.tabs[2].subtitle" v-html="store.tabs[2].subtitle" />
                <p v-if="store.tabs[2].panelExtra" class="brand_panel_desc" v-html="store.tabs[2].panelExtra.desc"></p>
                <ul v-if="store.tabs[2].panelExtra?.bullets?.length" class="list_dotted">
                    <li v-for="(bullet, bi) in store.tabs[2].panelExtra.bullets" :key="bi">
                        <p>{{ bullet }}</p>
                    </li>
                </ul>
            </header>
            <section v-if="store.tabs[2].taxGroups && store.tabs[2].taxGroups.length" class="sec_tax_list">
                <header class="sec_header">

                    <h3 v-html="store.tabs[2].taxTitle"></h3>

                </header>
                <dl class="tax_group_list">
                    <template v-for="(group, gi) in store.tabs[2].taxGroups" :key="gi">
                        <dt class="tax_group_subtitle">{{ group.subtitle }}</dt>
                        <dd>
                            <ul v-if="group.isList" class="list_dotted">
                                <li v-for="(item, ii) in group.items" :key="ii"><p>{{ item }}</p></li>
                            </ul>
                            <template v-else>
                                <p v-for="(item, ii) in group.items" :key="ii" class="tax_group_desc">{{ item }}</p>
                            </template>
                        </dd>
                    </template>
                </dl>
            </section>
        </div>
        <!-- 상품권 판매 -->
        <div v-show="depth1ActiveIdx === 2 && storeActiveTab === 3" class="brand_panel">
            <figure v-if="store.tabs[3].hero" class="brand_panel_bg">
                <img :src="store.tabs[3].hero" :alt="store.tabs[3].heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="store.tabs[3].subtitle" class="brand_panel_title">
                <h2 v-html="store.tabs[3].subtitle"></h2>
                <p v-if="store.tabs[3].desc" v-html="store.tabs[3].desc" />
            </header>
            <section v-if="store.tabs[3].voucherItems && store.tabs[3].voucherItems.length" class="sec_voucher">
                <header class="sec_header">

                    <h3 v-html="store.tabs[3].voucherTitle"></h3>

                </header>
                <!-- PC -->
                <ul v-if="!isMobileView" class="voucher_list">
                    <li v-for="(item, vi) in store.tabs[3].voucherItems" :key="vi" class="voucher_item">
                        <div class="voucher_img">
                            <img :src="item.img" :alt="item.name" />
                        </div>
                        <div class="voucher_info">
                            <strong class="voucher_name">{{ item.name }}</strong>
                            <div class="voucher_tags">
                                <span v-for="(tag, ti) in item.tags" :key="ti" class="voucher_tag" :class="`tag_${tag.type}`">{{ tag.text }}</span>
                            </div>
                            <p class="voucher_desc">{{ item.desc }}</p>
                        </div>
                    </li>
                </ul>
                <!-- 모바일 Swiper -->
                <Swiper
                    v-else
                    class="voucher_swiper"
                    slides-per-view="auto"
                    :space-between="20"
                >
                    <SwiperSlide v-for="(item, vi) in store.tabs[3].voucherItems" :key="vi">
                        <div class="voucher_item">
                            <div class="voucher_img">
                                <img :src="item.img" :alt="item.name" />
                            </div>
                            <div class="voucher_info">
                                <strong class="voucher_name">{{ item.name }}</strong>
                                <div class="voucher_tags">
                                    <span v-for="(tag, ti) in item.tags" :key="ti" class="voucher_tag" :class="`tag_${tag.type}`">{{ tag.text }}</span>
                                </div>
                                <p class="voucher_desc">{{ item.desc }}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
        <!-- 상생협력: 운영지원제도 -->
        <div v-show="depth1ActiveIdx === 3 && winwinActiveTab === 0" class="brand_panel winwin_panel">
            <!-- 3depth 탭 네비 -->
            <nav class="service_tab_wrap" ref="winwinWrapEl" role="tablist" aria-label="운영지원제도">
                <div class="service_tab_list" ref="winwinListEl" :style="winwinTransformStyle"
                    @touchstart.passive="winwinOnTouchStart" @touchmove.passive="winwinOnTouchMove"
                    @mousedown="winwinOnMouseDown">
                    <button
                        v-for="(tab, i) in winwin.tabs[0].serviceTabs"
                        :key="i"
                        type="button"
                        role="tab"
                        :aria-selected="winwinServiceActiveTab === i"
                        class="service_tab_item"
                        :class="{ is_active: winwinServiceActiveTab === i }"
                        @click="winwinServiceActiveTab = i"
                    >
                        <span class="service_tab_icon" aria-hidden="true"></span>
                        <span class="service_tab_label">{{ tab.label }}</span>
                    </button>
                </div>
            </nav>

            <!-- 3depth 패널 -->
            <div
                v-for="(tab, i) in winwin.tabs[0].serviceTabs"
                :key="i"
                v-show="winwinServiceActiveTab === i"
                :class="['service_panel', `winwin_panel_${i+1}`]"
            >
                <header v-if="tab.title" class="brand_panel_title">
                    <h2 v-html="tab.title"></h2>
                    <ul v-if="tab.notes && tab.notes.length" class="list_caution">
                        <li v-for="(note, ni) in tab.notes" :key="ni">{{ note.text }}</li>
                    </ul>
                </header>
                <section>
                    <NumberedInfoList :items="tab.items" :show-icon="true" />
                </section>
            </div>
        </div>

        <!-- 상생협력: 참여제도 -->
        <div v-show="depth1ActiveIdx === 3 && winwinActiveTab === 1" class="brand_panel">
            <figure v-if="winwin.tabs[1].hero" class="brand_panel_bg">
                <img :src="winwin.tabs[1].hero" :alt="winwin.tabs[1].heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="winwin.tabs[1].title" class="brand_panel_title">
                <h2 v-html="winwin.tabs[1].title"></h2>
                <p v-if="winwin.tabs[1].desc" v-html="winwin.tabs[1].desc" />
            </header>
            <section>
                <NumberedInfoList :items="winwin.tabs[1].items" desc-class="num_info_desc_light" />
            </section>
        </div>

        <!-- depth1 = 4: 밀박스/스낵바 -->
        <div v-if="depth1ActiveIdx === 4" class="brand_panel milbox_panel">
            <figure v-if="milbox.hero" class="brand_panel_bg">
                <img :src="milbox.hero" :alt="milbox.heroAlt || ''" width="1420" height="340" />
            </figure>
            <header v-if="milbox.title" class="brand_panel_title">
                <h2 v-html="milbox.title"></h2>
            </header>
            <section v-for="(sec, si) in milbox.sections" :key="si">
                <header class="sec_header">
                    <h3 v-html="sec.title"></h3>
                    <p v-if="sec.desc" class="sec_header_desc" v-html="sec.desc" />
                    <p v-if="sec.note" class="sec_note">{{ sec.note }}</p>
                </header>
                <FeatureCards v-if="sec.type === 'feature' && sec.items && sec.items.length" :items="sec.items" type="icon" class="milbox_feature" />
                <ul v-if="sec.type === 'imgcard' && sec.items && sec.items.length" class="imgcard_list">
                    <li v-for="(item, ii) in sec.items" :key="ii" class="imgcard_item">
                        <figure class="imgcard_img">
                            <img v-if="item.img" :src="item.img" :alt="item.name" />
                        </figure>
                        <div class="imgcard_body">
                            <h4>
                                {{ item.name }}
                                <a v-if="item.link" :href="item.link" target="_blank" class="imgcard_link" aria-label="링크 바로가기"></a>
                            </h4>
                            <p v-if="item.desc" class="imgcard_desc" v-html="item.desc"></p>
                        </div>
                        <div v-if="sec.advantages" class="info_card">
                            <strong v-if="sec.advantages.title" class="info_card_title">{{ sec.advantages.title }}</strong>
                            <ul class="info_list">
                                <li v-for="(adv, ai) in sec.advantages.items" :key="ai">
                                    <div>
                                        <span>{{ adv.text }}</span>
                                        <span v-if="adv.note" class="info_check_note">{{ adv.note }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </section>
        </div>

        <!-- 26.05.11 Edit 이종환 : 하단 목록 버튼 통일 -->
        <div class="bottom_btns">
            <button class="btn_back" @click="handleBack">{{ t.backLabel }}</button>
        </div>
        <!-- //26.05.11 Edit 이종환 : 하단 목록 버튼 통일 -->
    </div>

    <div id="pop_store_find" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps, nextTick, watch, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import Tabs from "@/components/Tabs.vue";
import Buttons from "@/components/Buttons.vue";
import DiffQrRow from "@/components/DiffQrRow.vue";
import imgQrMo from "@/assets/images/dummy/qr_app.png";
import Steps from "@/components/Steps.vue";
import FeatureCards from "@/components/FeatureCards.vue";
import NumberedInfoList from "@/components/NumberedInfoList.vue";
import Accordion from "@/components/Accordion.vue";
import AccordionItem from "@/components/AccordionItem.vue";
import modal from "@/assets/js/modal";

/* smain 이미지 */
import imgLogo from "@/assets/images/dummy/brand_gs25_logo.png";
import imgAcc01 from "@/assets/images/dummy/brand_accordion_01.png";
import imgAcc02 from "@/assets/images/dummy/brand_accordion_02.png";
import imgAcc03 from "@/assets/images/sub/gsrbr010101/brand_accordion_03.png";

/* 탭 0 이미지 */
import imgHero0 from "@/assets/images/sub/gsrbr010101/img_01-01-01.png"; //26.05.15 Edit 이종환
import imgCard1 from "@/assets/images/sub/gsrbr010101/img_01-01-02.png";
import imgCard2 from "@/assets/images/sub/gsrbr010101/img_01-01-03.png";

/* 탭 1 이미지 */
import imgHero1 from "@/assets/images/dummy/brand_bg_02.png";
import imgCoffeeMachine01 from "@/assets/images/dummy/coffee_machine_01.png";
import imgCoffeeMachine02 from "@/assets/images/dummy/coffee_machine_02.png";
import imgCoffeeMachine03 from "@/assets/images/dummy/coffee_machine_03.png";
import imgFlagBrazil from "@/assets/images/dummy/img_flag_brazil.png";
import imgFlagGuatemala from "@/assets/images/dummy/img_flag_guatemala.png";
import imgFlagColombia from "@/assets/images/dummy/img_flag_colombia.png";
import imgFlagEthiopia from "@/assets/images/dummy/img_flag_ethiopia.png";
import imgFlagPapua from "@/assets/images/dummy/img_flag_papua.png";
import imgCafe25Graph from "@/assets/images/dummy/cafe25_graph.png";
import imgCafeMenu from "@/assets/images/sub/gsrbr010101/cafe25_menu.png";
import imgCafeMenuMo from "@/assets/images/sub/gsrbr010101/cafe25_menu_mo.png";

/* 탭 2 이미지 */
import imgHero2 from "@/assets/images/dummy/differentiated_bg_03.png";
import imgChickenLeft from "@/assets/images/dummy/chicken25_card_01.png";
import imgChickenRight from "@/assets/images/dummy/chicken25_card_02.png";

/* 탭 3 이미지 */
import imgHero3 from "@/assets/images/dummy/differentiated_bg_04.png";
import imgGoben1 from "@/assets/images/dummy/gopizza_goben_01.png";
import imgGoben2 from "@/assets/images/dummy/gopizza_goben_02.png";
import imgDough from "@/assets/images/dummy/gopizza_dough.png";
import imgMenu1 from "@/assets/images/dummy/gopizza_menu_01.png";
import imgMenu2 from "@/assets/images/dummy/gopizza_menu_02.png";
import imgPhone1 from "@/assets/images/dummy/gopizza_phone_01.png";
import imgPhone2 from "@/assets/images/dummy/gopizza_phone_02.png";

/* 신선강화점 이미지 */
import imgHero4 from "@/assets/images/sub/gsrbr010101/brand_bg_05.png";
import imgFlow from "@/assets/images/dummy/sinsen_flow.png";
import imgFlowMo from "@/assets/images/dummy/mo/sinsen_flow_mo.png";

/* 매장/서비스 이미지 */
import imgHero5 from "@/assets/images/sub/gsrbr010101/brand_bg_06.png";
import imgHero6 from "@/assets/images/dummy/brand_bg_07.png";
import imgHero7 from "@/assets/images/dummy/brand_bg_08.png"; 
import imgHero8 from "@/assets/images/sub/gsrbr010101/brand_bg_09.png"; 
import imgHero9 from "@/assets/images/sub/gsrbr010101/brand_bg_10.png"; 
import imgHero10 from "@/assets/images/sub/gsrbr010101/brand_bg_11.png"; 
import imgHero11 from "@/assets/images/sub/gsrbr010101/brand_bg_11-1.png"; 
import imgHero11_1 from "@/assets/images/sub/gsrbr010101/brand_bg_11-2.png"; 
import imgHero12 from "@/assets/images/sub/gsrbr010101/brand_bg_13.png"; 
import imgPopCard1 from "@/assets/images/dummy/pop_card_01.png";
import imgPopCard2 from "@/assets/images/sub/gsrbr010101/pop_card_02.png";
import imgPopCard3 from "@/assets/images/dummy/pop_card_03.png";
import imgPopCard1Mo from "@/assets/images/dummy/mo/pop_card_01_mo.png";
import imgPopCard2Mo from "@/assets/images/dummy/mo/pop_card_02_mo.png";
import imgPopCard3Mo from "@/assets/images/dummy/mo/pop_card_03_mo.png";
import imgPoint1 from "@/assets/images/dummy/point_01.png";
import imgPoint2 from "@/assets/images/dummy/point_02.png"; 
import imgPoint3 from "@/assets/images/dummy/point_03.png";
import imgPoint4 from "@/assets/images/dummy/point_04.png";
import imgTransService1 from "@/assets/images/dummy/transportation_service_01.png";
import imgTransService2 from "@/assets/images/dummy/transportation_service_02.png";
import imgTransService3 from "@/assets/images/dummy/transportation_service_03.png";
import imgTransService4 from "@/assets/images/dummy/transportation_service_04.png";
import imgBus1 from "@/assets/images/dummy/express_bus_01.png";
import imgBus2 from "@/assets/images/dummy/express_bus_02.png";
import imgBus3 from "@/assets/images/dummy/express_bus_03.png";
import imgBus4 from "@/assets/images/dummy/express_bus_04.png";
import imgBus5 from "@/assets/images/dummy/express_bus_05.png";
import imgBus6 from "@/assets/images/dummy/express_bus_06.png";
import imgBus7 from "@/assets/images/dummy/express_bus_07.png";
import imgBus8 from "@/assets/images/dummy/express_bus_08.png";
import imgBrandUsage1 from "@/assets/images/dummy/brand_usage_01.png";
import imgBrandUsage2 from "@/assets/images/dummy/brand_usage_02.png";
import imgBrandUsage3 from "@/assets/images/dummy/brand_usage_03.png";
import imgBrandUsage4 from "@/assets/images/dummy/brand_usage_04.png";
import imgBrandUsage5 from "@/assets/images/dummy/brand_usage_05.png";
import imgBrandUsage6 from "@/assets/images/dummy/brand_usage_06.png";
import imgBrandUsage7 from "@/assets/images/dummy/brand_usage_07.png";
import imgBrandUsage8 from "@/assets/images/dummy/brand_usage_08.png";
import imgBrandUsage9 from "@/assets/images/dummy/brand_usage_09.png";
import imgGiftCard1 from "@/assets/images/dummy/gift_card_01.png";
import imgGiftCard2 from "@/assets/images/dummy/gift_card_02.png";
import imgGiftCard3 from "@/assets/images/dummy/gift_card_03.png";
import imgGiftCard4 from "@/assets/images/dummy/gift_card_04.png";
import imgGiftCard5 from "@/assets/images/dummy/gift_card_05.png";
import imgGiftCard6 from "@/assets/images/dummy/gift_card_06.png";
import imgGiftPurchase from "@/assets/images/dummy/gift_purchase_bg.png";
import imgRateBenefit1 from "@/assets/images/dummy/rate_benefit_01.png";
import imgRateBenefit2 from "@/assets/images/sub/gsrbr010101/rate_benefit_02.png";
import imgHipassTerminal    from "@/assets/images/dummy/hipass_terminal.png";
import imgServiceDesc01    from "@/assets/images/dummy/service_desc_01.png";
import imgServiceDesc02    from "@/assets/images/dummy/service_desc_02.png";
import imgServiceDesc03    from "@/assets/images/dummy/service_desc_03.png";
import imgServiceDesc04    from "@/assets/images/dummy/service_desc_04.png";
import imgServiceDesc05    from "@/assets/images/dummy/service_desc_05.png";
import imgServiceDesc06    from "@/assets/images/dummy/service_desc_06.png";
import imgGiftCerti01 from "@/assets/images/dummy/gift_certi_01.png";
import imgGiftCerti02 from "@/assets/images/dummy/gift_certi_02.png";
import imgGiftCerti03 from "@/assets/images/dummy/gift_certi_03.png";

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

function openModal(event) {
    const el = event.currentTarget;
    modal.open(el.dataset.popid, el.dataset.type || "default", el);
}

const activeTab = ref(0);

const ph = (n) => Array.from({ length: n }, () => ({ brand: "", logo: null }));

const langData = {
    ko: {
    nav: {
        depth1: [
            { item: "차별화 상품" },
            { item: "신선강화점" },
            { item: "매장/서비스" },
            { item: "상생협력" },
            { item: "기업/단체 정기 서비스" }, //26.05.15 Edit 이종환
        ],
        depth2: [
            { item: "차별화 상품" },
            { item: "CAFE25" },
            { item: "치킨25" },
            { item: "고피자" },
        ],
        depth2Store: [
            { item: "생활 서비스" },
            { item: "택배&픽업" },
            { item: "공공요금수납" },
            { item: "상품권 판매" },
        ],
        depth2Winwin: [
            { item: "운영지원제도" },
            { item: "참여제도" },
        ],
    },
    tabs: [
        {
            hero: imgHero0,
            heroAlt: "",
            title: "차별화 상품",
            subtitle: "합리적인 가격, 믿을 수 있는 품질, 삶의 가치를 높이는 새로운 상품까지 생활 속 기쁨을 누릴 수 있도록 늘 함께 합니다.",
            cards: [
                {
                    image: imgCard1,
                    alt: "",
                    title: "김혜자 도시락",
                    desc: "정성 가득한 한끼를 위한 프리미엄 도시락 라인으로, 높은 고객 만족도를 자랑하는 GS25 대표 차별화 상품입니다.",
                },
                {
                    image: imgCard2,
                    alt: "",
                    title: "유어스",
                    desc: "유어스는 좋은 품질과 합리적인 가치를 기본으로 하며, 오직 GS리테일에서만 만날 수 있는 재미와 즐거움을 제공합니다.",
                },
            ],
            qr: {
                title: "우리동네GS 앱 다운로드",
                desc: "우리동네GS 앱을 다운로드하고, GS25의 다양한 이벤트와 차별화 상품을 만나보세요. QR코드를 스캔하면 앱 다운로드 페이지로 이동합니다.",
            },
        },
        {
            hero: imgHero1,
            heroAlt: "",
            title: "CAFE25",
            subtitle: "최고급 커피머신과 스페셜티 블렌딩 원두를 사용하여 최상의 커피를 합리적인 가격으로 제공하는 GS25의 차별화 원두커피 전문 존입니다.",
            sections: [
                {
                    type: "cards",
                    title: "커피머신",
                    desc: "소비자가 1,300만원 상당의 스위스 명품 커피 머신 브랜드 프랑케 머신입니다.",
                    cards: [
                        { image: imgCoffeeMachine01, alt: "" },
                        { image: imgCoffeeMachine02, alt: "" },
                        { image: imgCoffeeMachine03, alt: "" },
                    ],
                },
                {
                    type: "table",
                    title: "원두",
                    desc: "국내 NO1. 로스터인 동서식품의 스페셜티 블렌딩 원두입니다. (브라질, 과테말라, 콜롬비아 등 최상위 원두 생산국의 원두 5종 블렌딩)",
                    columns: [
                        { key: "country", label: "원산지",  width: 200, align: "left" },
                        { key: "ratio",   label: "배합비",  width: 160, align: "center" },
                        { key: "process", label: "가공방식", width: 289, align: "center" },
                        { key: "feature", label: "원두특징", width: 289, align: "left" },
                    ],
                    rows: [
                        { flag: imgFlagBrazil,    country: "브라질",      ratio: "35%", process: "Natural", feature: "균형감 있는 향미" },
                        { flag: imgFlagGuatemala, country: "과테말라",     ratio: "30%", process: "Washed",  feature: "뛰어난 바디감" },
                        { flag: imgFlagColombia,  country: "콜롬비아",     ratio: "25%", process: "Washed",  feature: "견과류의 고소함" },
                        { flag: imgFlagEthiopia,  country: "에티오피아",   ratio: "5%",  process: "Washed",  feature: "밝고 경쾌한 산미" },
                        { flag: imgFlagPapua,     country: "파푸아뉴기니", ratio: "5%",  process: "Washed",  feature: "꽃과 허브의 향기" },
                    ],
                },
                {
                    type: "image",
                    title: "전문점 커피보다 맛이 뛰어난 CAFE25",
                    desc: "바리스타협회 평가 결과 커피 프랜차이즈 수준의 커피 맛이 입증되었습니다.",
                    source: "한국커피연합회 관능평가결과(23.05)",
                    image: imgCafe25Graph,
                    imageAlt: "커피 맛 비교 그래프 - GS25가 전문점 커피 수준임을 나타낸 바 차트",
                },
                {
                    type: "split",
                    title: "메뉴 소개",
                    image: imgCafeMenu,
                    imageMo: imgCafeMenuMo,
                    imageAlt: "CAFE25 메뉴 이미지",
                    columns: [
                        { key: "menu",     label: "구분",           width: 260, align: "left" },
                        { key: "volume",   label: "1회 제공량(mL)", width: 220, align: "center" },
                        { key: "caffeine", label: "카페인 함량(mg)", width: 220, align: "center" },
                    ],
                    rows: [
                        { menu: "에스프레소",            volume: "35",  caffeine: "137" },
                        { menu: "카카오에스프레소",       volume: "43",  caffeine: "127" },
                        { menu: "아메리카노",             volume: "200", caffeine: "121" },
                        { menu: "아메리카노 큰컵",        volume: "245", caffeine: "132" },
                        { menu: "아이스아메리카노",       volume: "380", caffeine: "144" },
                        { menu: "아이스아메리카노 큰컵",  volume: "480", caffeine: "140" },
                        { menu: "아이스아메리카노 점보",  volume: "780", caffeine: "180" },
                    ],
                },
            ],
        },
        {
            hero: imgHero2,
            heroAlt: "",
            title: "CHICKEN25",
            subtitle: "최고의 원재료를 사용하여 즉석에서 조리한 튀김을 합리적인 가격으로 제공하는 GS25만의 차별화 먹거리입니다. <br class=\"p_br\" />편의점에서도 치킨25와 함께 전문점 수준의 치킨을 즐길 수 있습니다.",
            sections: [
                {
                    type: "text_cards",
                    title: "엄선된 원재료, 믿을 수 있는 맛",
                    desc: "최고의 원재료로 만들어 안심하고 더 맛있게 즐길 수 있는 고품질의 치킨을 제공합니다.",
                    cards: [
                        {
                            title: "깨끗한 기름으로<br />더 맛있는 튀김",
                            desc: "깨끗하게 관리한 기름을 사용하여 더욱 바삭하고 맛있고,<br />철저한 위생 관리로 안심하고 즐길 수 있는<br />맛있는 치킨을 제공합니다.",
                        },
                        {
                            title: "다양한 메뉴,<br />골라 먹는 재미",
                            desc: "전문점보다 더 풍성하게 준비된 메뉴들로<br /> 다양한 메뉴를 골라 드실 수 있습니다.<br />(한마리, 반마리, 닭다리, 날개, 봉, 꼬치, 핫도그, 튀김만두 등)",
                        },
                        {
                            title: "가까운 곳에서 언제든<br />간편히 구매",
                            desc: "가까운 GS25에서 갓 튀긴 바삭한 치킨을<br />언제든지 간편하게 접할 수 있습니다.<br />우리동네GS앱을 통한 배달/픽업 서비스로<br />인근 GS25에서 더욱 간편한 구매가 가능합니다.",
                        },
                    ],
                },
            ],
            imgGrid: [
                { image: imgChickenLeft, alt: "" },
                { image: imgChickenRight, alt: "" },
            ],
            qr: {
                title: "우리동네GS 앱 다운로드",
                desc: "우리동네GS 앱을 다운로드하고, GS25의 다양한 이벤트와 차별화 상품을 만나보세요.<br />QR코드를 스캔하면 앱 다운로드 페이지로 이동합니다.",
            },
        },
        {
            hero: imgHero3,
            heroAlt: "",
            title: "GOPIZZA",
            subtitle: "한 판의 즐거움! 한 손의 간편함! 고피자는 1인 피자의 선두 브랜드로, 빠르고 맛있는 피자를 제공합니다.<br />이제 가까운 GS25에서도 고피자의 대표 메뉴를 만나볼 수 있습니다.",
            sections: [
                {
                    type: "img_grid",
                    title: "GS25에만 있는 고븐미니 조리 시스템",
                    desc: "매장에서 바로 구워내 더욱 바삭한 식감! 편의점에서 만나는 피자 전문점 퀄리티!<br />초소형, 초고온, 저전력의 고븐미니는 고온에서 짧은 시간의 조리를 할 수 있어 언제 어디서나 갓 구운 피자를 즐길 수 있습니다.",
                    images: [
                        { image: imgGoben1, alt: "" },
                        { image: imgGoben2, alt: "" },
                    ],
                },
                {
                    type: "image",
                    title: "차별화된 도우",
                    desc: "9˚C 저온에서 24시간 숙성한 파베이크 도우를 사용하여 겉바속쫄!<br class=\"p_br\" />고피자의 기술력이 집적된 파베이크 도우는 저온숙성을 거쳐 먹기 좋은 볼륨감과 충분한 수분 함량으로 빠삭하고 쫄깃한 식감을 제공합니다.",
                    image: imgDough,
                    imageAlt: "",
                },
                {
                    type: "menu",
                    title: "메뉴 소개",
                    desc: "고피자의 스테디셀러부터 기대되는 신메뉴까지! GS25에서 REGULAR와 GRAB으로 간편하고 맛있게 즐기세요!<br class=\"p_br\" />REGULAR 사이즈의 경우 피자가 W모양으로 5등분 컷팅되어 한조각씩 간편하게 먹을 수 있습니다.",
                    panels: [
                        {
                            image: imgMenu1,
                            size: "REGULAR (27cm)",
                            tags: ["식사대용", "일반피자 4조각 분량"],
                            columns: [
                                { key: "name",  label: "메뉴명",       align: "left"  },
                                { key: "price", label: "금액(원)",      align: "right" },
                                { key: "kcal",  label: "칼로리(kcal)", align: "right" },
                            ],
                            rows: [
                                { name: "포테이토&베이컨", price: "7,900", kcal: "922",   badge: "BEST" },
                                { name: "체다 페퍼로니",   price: "7,900", kcal: "1,017" },
                                { name: "미트치즈",        price: "7,900", kcal: "945"   },
                                { name: "트리플치즈",      price: "8,500", kcal: "1,009" },
                            ],
                        },
                        {
                            image: imgMenu2,
                            size: "GRAB (20cm)",
                            tags: ["간식용", "일반피자 2조각 분량"],
                            columns: [
                                { key: "name",  label: "메뉴명",       align: "left"  },
                                { key: "price", label: "금액(원)",      align: "right" },
                                { key: "kcal",  label: "칼로리(kcal)", align: "right" },
                            ],
                            rows: [
                                { name: "포테이토&베이컨", price: "3,500", kcal: "357",  badge: "BEST" },
                                { name: "체다 페퍼로니",   price: "3,500", kcal: "355"  },
                                { name: "미트치즈",        price: "3,500", kcal: "341"  },
                                { name: "트리플치즈",      price: "3,500", kcal: "349"  },
                            ],
                        },
                    ],
                },
                {
                    type: "phone_grid",
                    title: "우리동네GS앱에서는 빠른 배달,<br class=\"m_br\" /> 픽업 가능",
                    items: [
                        { image: imgPhone1, alt: "" },
                        { image: imgPhone2, alt: "" },
                    ],
                },
            ],
            qr: {
                title: "우리동네GS 앱 다운로드",
                desc: "우리동네GS 앱을 다운로드하고, GS25의 다양한 이벤트와 차별화 상품을 만나보세요.<br />QR코드를 스캔하면 앱 다운로드 페이지로 이동합니다.",
            },
            link: {
                title: "GOPIZZA 홈페이지 바로가기",
                desc: "GOPIZZA 홈페이지에서 내 주변 매장 찾고 합리적인 가격과 차별화된 맛을 경험해보세요.<br />버튼을 클릭하면 해당 홈페이지로 이동합니다.",
                descMo: "합리적인 가격과 차별화된 맛 GOPIZZA",
                url: "https://gopizza.kr",
            },
        },
    ],
    sinsen: {
        hero: imgHero4,
        heroAlt: "신선강화점",
        title: "신선강화점",
        subtitle: "신선강화점은 1~2인 가구 및 근거리/소용량 쇼핑 증가 트렌드에 맞춰, 24시간 365일 한번에 장보기를 구현한 신선강화형 편의점입니다.<br /><br class=\"m_br\" />편의점의 간편함과 수퍼마켓의 신선함을 결합한 차별화 컨셉 모델로 매일매일 신선한 신선상품(과일, 채소, 정육, 수산)을 제공합니다.",
        sections: [
            {
                title: "신선강화점 특징",
                mobileDesc: "매장에서 바로 구워내 더욱 바삭한 식감! 편의점에서 만나는 피자 전문점 퀄리티!\n초소형, 초고온, 저전력의 고븐미니는 고온에서 짧은 시간의 조리를 할 수 있어 언제 어디서나 갓 구운 피자를 즐길 수 있습니다.",
                features: [
                    { title: "신선한 상품",   desc: "물류부터 진열 판매까지 전 과정 콜드체인 시스템 적용으로 신선도 유지" },
                    { title: "합리적인 가격", desc: "GS 더프레시와의 통합 구매를 통해 합리적인 가격에 판매" },
                    { title: "소용량 소포장", desc: "1인가구 및 2~3인 가구에 적합한 <br />소용량·소포장 상품 구성" },
                    { title: "전용 상품 브랜드", desc: "신선식품 전문 브랜드 <br />신선특별시 운영" },
                ],
            },
            {
                title: "왜 GS25 신선강화점인가?",
                desc: "GSTHEFRESH 통합 구매를 통한 상품 경쟁력을 확보하여 타 편의점 대비 다양한 신선·장보기 상품을 운영합니다. <br /><br class=\"m_br\" />업계 유일의 신선상품 전용 물류센터를 운영중이며, 파트너사에서 점포까지 전 구간 선도관리를 통해 신선상품의 신선도를 유지합니다.",
                flow: true,
                flowTitle: "GS25 신선 배송 방식",
                flowNote: "*신선센터를 거쳐 각 저온센터로 배송하는 구조",
            },
            {
                title: "신선강화점 운영의 장점",
                advantages: {
                    items: [
                        { text: "전용상품을 통한 다양한 상품 구색(약 400SKU)" },
                        { text: "신선강화점 전용 행사 운영 (신선 & 가공)" },
                        { text: "신선식품에 신선함을 더해주는 전용 장비 운영" },
                        { text: "전자가격표시기를 활용한 신선 가격 대응 자동화" },
                        { text: "마감할인 라벨프린터 운영으로 폐기 최소화" },
                        { text: "내/외부 전용 홍보물을 통한 홍보 강화" },
                        { text: "기존 일반점 → 신선강화점 변경 시 효과성 검증", note: "\u201C도입 후 일평균 매출 기존대비 약 12.6% 증가, 일평균 고객 수 21명 증가\u201D" },
                    ],
                },
            },
        ],
    },
    store: {
        tabs: [
            {
                hero: null,
                heroAlt: "",
                title: "생활 서비스",
                subtitle: "",
                sections: [],
                serviceTabs: [
                    {
                        label:   "현금인출기\n서비스",
                        hero:    imgHero5,
                        heroAlt: "",
                        title:   "현금인출기 서비스",
                        desc:    "현금인출, 계좌 이체 등 금융서비스 외에도 프로스포츠(야구, 축구, 배구, 농구) 정규리그 입장권(즉시 입장), 에버랜드 자유이용권의 발권도 가능합니다.<br />그 밖에 하이패스 충전(신용카드 결제), 알뜰폰 판매 등 다양한 생활 편의 서비스를 제공하고 있습니다.",
                        sub_item: {
                            title: "현금인출 수수료 0원 서비스",
                            explain: "신한은행 / KB국민은행 / 우리은행 / Kakaobank / K bank / 토스뱅크 / SC제일은행 / 광주은행 / SB저축은행 / 삼성증권 / NH투자증권 계좌에서 현금인출시 수수료 0원!",
                            retail_note: "* 단, 은행 영업 시간 외에는 은행 조건에 따라서 수수료가 발생할 수 있으며, 저축은행은 출금 시에만 수수료가 면제 됩니다.",
                            bank: [
                                {name:"신한은행", logo: require("@/assets/images/sub/gsrbr010101/bank_shinhan.png")},
                                {name:"KB국민은행", logo: require("@/assets/images/sub/gsrbr010101/bank_kookmin.png")},
                                {name:"우리은행", logo: require("@/assets/images/sub/gsrbr010101/bank_woori.png")},
                                {name:"kakaobank", logo: require("@/assets/images/sub/gsrbr010101/bank_kakao.png")},
                                {name:"Kbank", logo: require("@/assets/images/sub/gsrbr010101/bank_kbank.png")},
                                {name:"toss bank", logo: require("@/assets/images/sub/gsrbr010101/bank_toss.png")},
                                {name:"standard chartered SC제일은행", logo: require("@/assets/images/sub/gsrbr010101/bank_sc.png")},
                                {name:"광주은행", logo: require("@/assets/images/sub/gsrbr010101/bank_gwangju.png")},
                                {name:"저축은행", logo: require("@/assets/images/sub/gsrbr010101/bank_sb.png")},
                                {name:"삼성증권", logo: require("@/assets/images/sub/gsrbr010101/bank_samsung.png")},
                                {name:"NH투자증권", logo: require("@/assets/images/sub/gsrbr010101/bank_nh.png")}
                            ]
                        }
                    },
                    {
                        label:   "편의점캐시\n구입/충전",
                        hero:    null,
                        heroAlt: "",
                        title:   "편의점 캐시 구입/충전 서비스",
                        desc:    "편의점캐시는 온라인콘텐츠, 쇼핑몰, 게임캐시, 국제전화카드를 편의점에서 구입/충전 할 수 있는 서비스입니다.",
                        table: {
                            rows: [
                                { head: "게임 · 상품권 · 통신", text: "(알뜰폰/국제전화/모바일 데이터) 등 다양한 서비스를 편의점에서 실시간으로 구입, 충전 할 수 있는 서비스 영수증형 PIN 구입과 국제전화카드 충전 이외에 스마트폰 APP를 통한 실시간 잔액 충전 가능" },
                                { head: "게임캐시",         text: "N코인(엔씨소프트), 넥슨, 월드오브워크레프트, 리그오브레전드, 틴캐시, 한게임, 퍼니카드, 한빛소프트 등" },
                                { head: "상품권",           text: "문화상품권, 스마트문화상품권, 해피머니상품권, 도서문화상품권 등" },
                                { head: "스마트폰 APP충전", text: "넥슨플레이, 컬쳐랜드" },
                                { head: "알뜰폰",           text: "EG CARD, 7mobile, 아이즈, 모빙, M모바일, free C/T, 이야기 모바일 등" },
                                { head: "국제전화카드",     text: "LG U+, Naray, SK broadband" },
                                { head: "통신(데이터)/기타", text: "올레 WiFi, T데이터쿠폰, KT LTE 데이터쿠폰, DAUM캐시" },
                            ],
                        },
                    },
                    {
                        label:    "교통카드\n충전",
                        hero:     null,
                        heroAlt:  "",
                        title:    "",
                        desc:     "",
                        lnbItems: ["팝카드란?", "교통 사용처 안내", "유통 사용처 안내"],
                        trafficSelectOptions: [
                            { value: "subway",  label: "지하철" },
                            { value: "bus",     label: "버스" },
                            { value: "express", label: "고속버스" },
                            { value: "inter",   label: "시외버스" },
                        ],
                        trafficOptions: {
                            express: {
                                title: "고속버스",
                                bullets: ["금호고속", "동부 익스프레스", "동양고속", "속리산고속", "(주)중앙고속", "삼화 고속", "천일 고속", "한일 익스프레스"],
                                logos: [imgBus1, imgBus2, imgBus3, imgBus4, imgBus5, imgBus6, imgBus7, imgBus8],
                            },
                            subway: { title: "지하철", bullets: ["수도권(1~9호선, 수인선, 경춘선, 경의선, 중앙선, 의정부, 분당선, 신분당, 공항, 인천)", "대전(1호선)", "대구(1~2호선)", "부산(1~4호선, 부산-김해경전철)"] },
                            bus:    { title: "버스",   bullets: ["수도권","대전광역시, 세종시", "충남, 충북(충주, 영동, 청주, 옥천, 단양, 제천, 진천, 청원, 괴산, 보은, 음성", "강원(원주, 횡성, 춘천, 강릉)", "부산광역시, 대구광역시, 울산광역시","경남(창원, 통영, 거제, 밀양, 양산, 함안, 사천, 마산, 진해, 진주)","경북(포항, 구미, 경주, 안동, 상주, 문경, 영주, 김천, 경산, 예천)", "전남(목포, 여수, 광양, 순천, 화순, 나주, 장성, 함평, 담양, 보성, 영암, 해남)","전북(군산, 전주, 익산, 군산, 김제, 남원, 고창, 정읍, 진안, 임실, 부안)","제주"] },
                            inter:  { title: "시외버스", bullets: ["수도권(서울시 공항버스 제외)","충남","강원(원주 제외)"] },
                        },
                        retailSelectOptions: [
                            { value: "convenience",   label: "편의점" },
                            { value: "mart",          label: "대형마트/유통점" },
                            { value: "bakery",        label: "베이커리" },
                            { value: "coffee",        label: "커피/아이스크림" },
                            { value: "fastfood",      label: "패스트푸드" },
                            { value: "restaurant",    label: "요식" },
                            { value: "cosmetics",     label: "화장품" },
                            { value: "entertainment", label: "엔터테인먼트" },
                            { value: "pcroom",        label: "PC방" },
                            { value: "university",    label: "대학" },
                            { value: "public",        label: "공공시설" },
                            { value: "tourism",       label: "관광" },
                            { value: "parking",       label: "주차장" },
                            { value: "kiosk",         label: "무인기기" },
                            { value: "etc",           label: "기타" },
                        ],
                        retailOptions: {
                            convenience:   { title: "편의점", items: [
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_01.gif")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_02.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_03.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_04.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_05.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_06.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_07.jpg")},
                            ]},//ph(7) },
                            mart:          { title: "대형마트/유통점",  note:"마트, 익스프레스의 일부 매장은 향후 서비스 도입 예정", items: ph(4) },
                            bakery:        { title: "베이커리", note:"마트, 백화점, 휴게소 등 일부 입점 매장 제외", items: ph(3) },
                            coffee:        { title: "커피/아이스크림",  note: "마트, 백화점, 휴게소 등 일부 입점 매장 제외", items: [
                                { brand: "스타벅스",   logo: imgBrandUsage1 },
                                { brand: "파스쿠찌",   logo: imgBrandUsage2 },
                                { brand: "베라",       logo: imgBrandUsage3 },
                                { brand: "잠바주스",   logo: imgBrandUsage4 },
                                { brand: "엔젤인어스", logo: imgBrandUsage5 },
                                { brand: "카페띠아모", logo: imgBrandUsage6 },
                                { brand: "자바시티",   logo: imgBrandUsage7 },
                                { brand: "커피베이",   logo: imgBrandUsage8 },
                                { brand: "요거프레소", logo: imgBrandUsage9 },
                            ]},
                            fastfood:      { title: "패스트푸드", note:"마트, 백화점, 휴게소 등 일부 입점 매장 제외", items: ph(3) },
                            restaurant:    { title: "요식", note:"마트, 백화점, 휴게소 등 일부 입점 매장 제외", items: ph(3) },
                            cosmetics:     { title: "화장품", note:"마트, 백화점, 휴게소 등 일부 입점 매장 제외", items: ph(6) },
                            entertainment: { title: "엔터테인먼트", note:"LOTTE CINEMA(피카디리관), MEGABOX(안산관), SK와이번스(연간회원권)", items: ph(3) },
                            pcroom:        { title: "PC방",       bullets: ["T-money PC방"], footnote: "어린이카드는 사용이 제한됨" },
                            university: {
                                title: "대학",
                                bullets: [
                                    { dt: "교내식당", dd: "충남대" },
                                    { dt: "매점", dd: "동국대, 백석대, 정의여중고, 건대부속고, 동덕여대" },
                                    { dt: "OA기기", dd: "동국대, 서울과학기술대, 한양대, 이화여대, 인천대" },
                                    { dt: "셔틀버스", dd: "아주대, 성균관대" },
                                    { dt: "기타", dd: "자판기(중앙대, 건양대, 아주대, 명지대 등), 무인사물함(연세대, 경기대, 명지대 등)" },
                                ],
                            },
                            public:       { title: "공공시설", bullets: [
                                "경륜 / 경정장(서울올림픽기념국민체육진흥공단)",
                                "경마장(한국마사회)",
                                "서초구청 아방세홀 식대 결제",  
                                "서울시청 다산프라자 민원발급 수수료",
                                "서울시 구청 민원결제(전체)",
                                "종로구 자치회관 19개소 (가회동, 삼청동 등)",
                                "중앙우체국(식당결제)",
                                "대전시 공용자전거 타슈 결제",
                                "과천 과학관 식대, 매점, 카페 등 결제",
                                "포항시청 세무과 민원결제(시청, 구청, 읍 / 면 / 동사무소 32개소)",
                                "음식물종량제 : 군포시, 의정부시, 인천남구, 인천서구, 원주시, 포항시, 제주시, 서귀포시, 송파구, 순창군",
                            ] },
                            tourism:       { title: "관광",        bullets: ["한강수상택시","시티투어버스(T-money카드 결제 시 요금 5% 할인혜택)"] },
                            parking:       { title: "주차장", bullets: [
                                "서울특별시 공영주차장",
                                "서울특별시 강남시설관리공단 노외주차장 9개소 : 탄천, 강남구청, 강남교육원, 언북초교, 포이초교, 개포공영, 역삼1로, 역삼10, 대치3동 문화센터",
                                "서울특별시 시설관리공단 환승주차장 (T-money로 지하철 탑승 후 출차시 주차요금 환승할인 혜택가능) : 잠실역, 창동역, 구로디지털단지역, 개화산역, 수서역, 도봉산역, 봉화산역, 수락산역, 한강진역, 화랑대역, 월드컵경기장주차장",
                                "서울특별시 체육시설관리사업소 주차장(잠실종합운동장)",
                                "북서울 꿈의 숲, 인천공항",
                                "수원시 시설관리공단 주차장 : 시청제1지상, 시청제2지상, 선경, 영통구청, 영통공영, 권선공영, 인계공영, 율전공영, 터미널공영, 대황교화물, 화서환승, 성대환승, 꽃뫼환승, 세류역 환승, 광교공영, 만석공원, 백설공영, 영화동, 세류2동, 인계동, 매교동, 탑동, 곡반정동 제1,2",
                                "성남시 시설관리공단 주차장 : 금곡동, 서현동, 정자 환승, 오리 환승, 야탑 제1, 중부초교, 해오름, 대원천, 단대공원, 복정동. 신흥제, 태평제, 아래숯골 등 44개소",
                                "파주시 시설관리공단 주차장 : 금촌2공영, 금촌2-8공영, 금촌3공영",
                                "KTX 철도역사 주차장 (광명역, 천안 / 아산역 등)",
                                "하이파킹 주차장 : 춘천 지하, 대구 두류1번가 지하, 수진역 환승, 죽전 아이원프라자",
                                "기타 : 월드컵경기장, 목동 노상, 응봉동(건물), 삼성동 오크우드, 강북삼성병원, SH공사 주차장, 누리꿈스퀘어 주차장, 서울숲 공원 주차장, 서울무역전시장 주차장, 동원산업 빌딩 지하 주차장, 인천경제통상진흥원 주차장, 지에스파크24㈜ 서울디자인고 주차장",
                                "무인기기",
                            ] },
                            kiosk:         { title: "무인기기",    bullets: ["KTL 공중전화","지하철 무인택배 보관함, 음료 / 스낵 자판기, 도서자판기, 무인사진 촬영기","우체국 무인우편창구 : 서울체신청, 경인체신청, 충청체신청, 경북체신청, 부산체신청"] },
                            etc:           { title: "기타",        bullets: ["고속도로 휴게소 : 진영휴게소, 영천휴게소", "개그스토리 마트 (일부점)","문구점 색연필 (일부점)", "비디오 대여점 영화마을 (일부점)"] },
                        },
                        pageTitle: "교통카드 충전서비스(팝티머니,마이비,캐시비(EZL),한페이)",
                        pageDesc:  "GS25는 대중교통을 이용하는 고객님을 위해 교통카드 충전 서비스를 실행하고있습니다.<br />또한, GS25에서 상품을 구매할 수 있어 결제수단의 편의성을 제공하고있는 유익한 서비스입니다. (복권, 로또, 토토, 택배 등 일부상품제외)",
                        popTitle:   "팝카드란?",
                        popDesc:    "이제 팝 하세요! <br />다양한 결제 수단과 결합하여 혜택은 더 크게, 소비는 더 합리적으로, 사용은 더 편리하게 할 수 있도록 팝카드만의 차별화된 서비스를 제공합니다.",
                        popExclude: "팝카드 사용 제외 매장 : 디몰점, 영풍종로점, 부천세이브존점, 동대문현대시티아울렛점, 서면NC점, 현대시티몰가든파이브점, 모란NC점, 대구이월드점, 동아쇼핑NC점, 이천NC점, 동수원NC점, 야탑NC점",
                        chargingTitle: "교통카드 충전 서비스",
                        chargingItems: [
                            { name: "티머니",     img: imgTransService1 },
                            { name: "캐시비(EZL)", img: imgTransService2 },
                            { name: "한페이",      img: imgTransService3 },
                            { name: "iM유페이",   img: imgTransService4 },
                        ],
                        chargingNote: {
                            label: "충전 및 결제 가능 지역",
                            text:  "티머니/캐시비(EZL) : GS25 전 매장 / 한페이: 전라도, 광주광역시 / iM유페이: 경상북도, 대구광역시",
                        },
                        popCards: [
                            {
                                img:   imgPopCard1,
                                imgMo: imgPopCard1Mo,
                                name:  "팝티머니",
                                desc:  "하나의 카드로 관리가능한 멀티멤버십의 혜택까지!\n팝티머니는 T-money와 팝카드의 기능을 동시에\n사용할 수 있는 차별화된 서비스입니다.",
                                logos: [
                                    { src: imgPoint1, w: 28, h: 36 },
                                    { src: imgPoint2, w: 44, h: 24 },
                                    { src: imgPoint3, w: 29, h: 36 },
                                    { src: imgPoint4, w: 32, h: 32 },
                                ],
                            },
                            {
                                img:      imgPopCard2,
                                imgMo:    imgPopCard2Mo,
                                name:     "멤버십 팝카드",
                                desc:     "멤버십팝카드는 GS ALL 포인트와 팝카드가 결합되어 GS25, GS THE FRESH에서 결제와 동시에 포인트가 적립되고, 600여 온라인쇼핑, 게임 등에서 결제가 가능한 혜택이 많은 선불카드입니다.",
                                note:     "*교통기능 없음",
                                noteWarn: true,
                                logos:    [{ src: imgPoint2, w: 44, h: 24 }],
                            },
                            {
                                img:   imgPopCard3,
                                imgMo: imgPopCard3Mo,
                                name:  "팝 신용/체크 카드",
                                desc:  "팝 신용/체크카드는 고객의 소비생활에\n팝카드의 혜택 및 기능을 추가한 서비스입니다.",
                                logos: [],
                            },
                        ],
                    },
                    {
                        label:          "기프트\n카드",
                        hero:           imgHero6,
                        heroAlt:        "",
                        title:          "기프트카드",
                        desc:           "GS25는 기프트카드를 운영하고 있으며, 전국 어디에서나 충전 및 사용이 가능합니다.<br />다양한 기프트카드를 소중한 친구, 가족, 지인들에게 선물할 수 있습니다. (단,일부 매장에서는 충전 및 사용이 불가합니다.)",
                        brandTitle: "POSA 기프트카드 대표 브랜드",
                        brands: [
                            { img: imgGiftCard1, name: "구글플레이" },
                            { img: imgGiftCard2, name: "KT 와이파이" },
                            { img: imgGiftCard3, name: "틴캐시" },
                            { img: imgGiftCard4, name: "에그머니" },
                            { img: imgGiftCard5, name: "T데이터쿠폰" },
                            { img: imgGiftCard6, name: "해피머니" },
                            { img: imgGiftCard1, name: "문화상품권" },
                            { img: imgGiftCard2, name: "스마트문화상품권" },
                            { img: imgGiftCard3, name: "도서문화상품권" },
                            { img: imgGiftCard4, name: "넥슨캐시" },
                            { img: imgGiftCard5, name: "NC소프트" },
                            { img: imgGiftCard6, name: "한게임" },
                            { img: imgGiftCard1, name: "컬쳐랜드" },
                            { img: imgGiftCard2, name: "퍼니카드" },
                            { img: imgGiftCard3, name: "버거킹" },
                            { img: imgGiftCard4, name: "CGV" },
                            { img: imgGiftCard5, name: "스타벅스" },
                            { img: imgGiftCard6, name: "올레WiFi" },
                        ],
                        purchaseTitle: "POSA 기프트카드 구매방법",
                        purchaseNote:  "기프트 카드별로 사용방법이 다르므로 카드와 카드 캐리어 뒷면에 기재된 사용방법을 참고하시고, 자세한 사항은 카드에 기재된 고객센터로 문의하시기 바랍니다.",
                        purchaseImg:   imgGiftPurchase,
                        purchaseSteps: [
                            { num: "01", title: "판매처 방문",    desc: "가까운 GS25 편의점에 방문하세요." },
                            { num: "02", title: "기프트카드 선택", desc: "원하는 브랜드의 기프트카드를 선택하세요." },
                            { num: "03", title: "사용설명 확인",   desc: "구매하신 카드 뒷면 사용설명을<br class=\"m_br\" />잘 확인하시고 사용하세요." },
                            { num: "04", title: "계산",           desc: "계산대에서 계산을 완료하시면 활성화되어 사용 가능한 상태가 됩니다." },
                        ],
                        usageTitle:   "POSA 기프트카드 사용방법",
                        usageDesc:
                            '<span class="gift_usage_desc_emphasis">기프트카드별로 사용방법이 다르므로 카드와 카드 캐리어 뒷면에 기재된 사용방법을 참고</span>하시고, 자세한 사항은 카드에 기재된 고객센터로 문의하시기 바랍니다.',
                        onlineLabel:  "온라인 사용방법",
                        onlineSteps: [
                            { step: "Step 1", title: "사이트 접속 및 로그인" },
                            { step: "Step 2", title: "캐시충전" },
                            { step: "Step 3", title: "결제수단 선택" },
                            { step: "Step 4", title: "PIN번호 입력" },
                        ],
                        offlineLabel: "오프라인 사용방법",
                        offlineSteps: [
                            { step: "Step 1", title: "매장 방문" },
                            { step: "Step 2", title: "상품 선택" },
                            { step: "Step 3", title: "기프트카드 제시" },
                            { step: "Step 4", title: "결제완료" },
                        ],
                        advantageTitle: "POSA 기프트카드 장점",
                        advantages: [
                            {
                                num:   "01",
                                title: "신용카드와 함께\n지갑속에 쏙!",
                                desc:  "신용카드처럼 작아서 지갑에 보관하기 편리하며, 결제해야만 사용할 수 있기에 판매점의 관리 부담이 적습니다.",
                            },
                            {
                                num:   "02",
                                title: "온/오프라인\n다양한 브랜드 제공",
                                desc:  "외식, 게임, 레저, 영화, 커피, 도서 등 오프라인과 온라인의 다양한 브랜드를 제공하기에 선물 받는 사람의 기호와 특성에 따라 최고의 만족도를 함께 드릴 수 있습니다.",
                            },
                            {
                                num:   "03",
                                title: "가치를 아는 당신의 선택\n고품격 디자인 기프트카드",
                                desc:  "현금이나 기존 상품권과 달리 고품격으로 디자인되어 선물하는 분의 가치와 품격을 높여 드릴 수 있습니다.",
                            },
                            {
                                num:   "04",
                                title: "전국 언제 어디서나\n편리한 구매",
                                desc:  "전국의 대형마트, 대형서점, 편의점, 유명 프랜차이즈 등으로 판매점을 확대할 것이기에 고객과 가장 가까운 곳에서 언제든지 간편하게 카드를 구입할 수 있습니다.",
                            },
                        ],
                    },
                    {
                        label:          "유심\n요금제",
                        hero:           null,
                        heroAlt:        "",
                        title:          "유심 요금제",
                        desc:           "U+ 알뜰모바일과 GS25가 만나 획기적으로 낮춘 휴대폰 요금제로 GS25편의점 및 GS25 온라인사이트에서 유심칩 구매 가능합니다.",
                        advantageTitle: "GS25 요금제 장점",
                        advantages: [
                            { num: "01", title: "간편하게 가입하는 요금제", desc: "가까운 GS25에서 구매 가능 전용 사이트에서<br /> 간편하게 가입하는 요금제" },
                            { num: "02", title: "대한민국 최저가",          desc: "데이터 마음껏 쓰는 대한민국 최저가 요금제!" },
                            { num: "03", title: "약정 조건/위약금 ZERO",    desc: "번호, 휴대폰 모두 그대로, 약정 조건과 위약금 없는 요금제!" },
                        ],
                        phoneTitle: "사용 가능 핸드폰",
                        phones: [
                            { term: "LG U+휴대폰",    desc: "LG U+로 최초 개통한 모든 LTE 휴대폰" },
                            { term: "SKT/KT 휴대폰",  desc: "14년 8월 이후출시된 LTE 휴대폰(갤럭시노트4, AKA 이후 출시 휴대폰)" },
                            { term: "외산휴대폰",      desc: "아이폰6 이후출시 휴대폰, 그외 주파수 850(Band5), 2100(Band1), 2600(Band7) 지원 모델 주파수(LTE 밴드)는 제조사를 통해서 확인 가능" },
                        ],
                        purchaseTitle: "GS25 매장에서 유심 구매/사용 방법",
                        purchaseSteps: [
                            { step: "Step 1", title: "GS25 편의점에서\n 유심카드 구입" },
                            { step: "Step 2", title: "GS25 편의점에서\n 유심카드 구입" },
                            { step: "Step 3", title: "유심 일련번호 등록 후\n 개통 신청 (또는 전화로 개통 신청)" },
                            { step: "Step 4", title: "해피콜/개통 완료 후\n 휴대폰에 유심을 장착하면 간편 개통 끝!" },
                        ],
                        benefitTitle: "GS25 요금제 혜택",
                        benefitCards: [
                            {
                                img:   imgRateBenefit1,
                                imgAlt: "",
                                title: "통신비 실속 있게 할인 받자!",
                                desc:  "가까운 GS25에서 구매 가능 전용 사이트에서\n간편하게 가입하는 요금제",
                                items: ["가입비 무료", "통신비 최대 할인", "무약정 위약금 없음"],
                            },
                            {
                                img:   imgRateBenefit2,
                                imgAlt: "",
                                title: "다양한 부가서비스 4종 무료",
                                desc:  "가까운 GS25에서 구매 가능 전용 사이트에서\n간편하게 가입하는 요금제",
                                items: ["U+ Zone Wi-Fi로 인터넷을", "U+ Box 내 파일을 클라우드로", "매너콜 전화 온 곳을 문자로", "mVOIP 보이스톡 무료 통화"],
                            },
                        ],
                        introTitle: "GS25 요금제 소개",
                        planTable: {
                            productName: "상품명",
                            provision: "제공량",
                            data: "데이터",
                            voice: "음성",
                            sms: "문자",
                            normalPrice: "정상 요금",
                            promoDiscount: "프로모션 할인",
                            monthlyFee: "월 기본요금<br />(제휴카드 이용 시)",
                            competitor: "타사 유사<br />요금제",
                        },
                        plans: [
                            {
                                name:         "GS25(15GB+/100분)",
                                data:         "15GB\n<span class=\"usim_plan_data_sub\">(소진시 3Mbps속도로 계속 사용)</span>",
                                voice:        "100분",
                                sms:          "100건",
                                normalPrice:  "47,300원",
                                discount:     "19,800원",
                                monthly:      "27,500원",
                                monthlyDc:    "12,500원",
                                competitor:   "65,890원",
                            },
                            {
                                name:         "GS25(10GB/100분)",
                                data:         "10GB",
                                voice:        "100분",
                                sms:          "100건",
                                normalPrice:  "41,800원",
                                discount:     "20,900원",
                                monthly:      "20,900원",
                                monthlyDc:    "5,900원",
                                competitor:   "45,650원",
                            },
                            {
                                name:         "GS25(6GB/100분)",
                                data:         "6GB",
                                voice:        "100분",
                                sms:          "100건",
                                normalPrice:  "30,000원",
                                discount:     "12,500원",
                                monthly:      "17,500원",
                                monthlyDc:    "2,500원",
                                competitor:   "45,250원",
                            },
                            {
                                name:         "GS25(3GB/150분)",
                                data:         "3GB",
                                voice:        "100분",
                                sms:          "100건",
                                normalPrice:  "20,900원",
                                discount:     "12,100원",
                                monthly:      "12,100원",
                                monthlyDc:    "0원",
                                competitor:   "41,800원",
                            },
                        ],
                    },
                    {
                        label:          "하이패스\n카드/단말기",
                        hero:           null,
                        heroAlt:        "",
                        title:          "하이패스 서비스",
                        desc:           "GS25에서 24시간 하이패스카드를 구매/충전하세요.",
                        hipassStepTitle:    "하이패스카드 구매<br class=\"m_br\" />(셀프형 자동충전카드)",
                        hipassSteps: [
                            {
                                step:    "Step 1",
                                title:   "셀프형 자동충전카드 구매",
                                bullets: [
                                    "가까운 GS25에서 하이패스 카드 구매",
                                    "카드 구입비: 5,000원",
                                ],
                            },
                            {
                                step:    "Step 2",
                                title:   "카드등록 및 결제정보등록",
                                bullets: [
                                    "홈페이지에서 카드번호 및 결제정보등록<br />(계좌 or 신용카드)",
                                    "<span style=\"color: #fb6432\">카드등록 후 24시간 이후 사용 가능</span>",
                                ],
                            },
                            {
                                step:    "Step 3",
                                title:   "하이패스 카드 이용",
                                bullets: [
                                    "하이패스 단말기에 삽입하여 사용",
                                    "등록된 결제방식을 통해 자동 충전됨",
                                ],
                            },
                            
                        ],
                        hipassChargeTitle: "하이패스 카드 충전",
                        hipassChargeDesc: "하이플러스카드에서 출시한 모든 카드 충전가능 ('도로공사', 'EX' 기재된 카드 충전불가)",
                        hipassTerminalTitle: "하이패스단말기 판매",
                        hipassTerminalDesc: "한국도로공사가 인증하고 2년 연속 한국품질만족도 1위 'GPASS' 단말기 판매",
                        hipassTerminalImg:    imgHipassTerminal,
                        hipassTerminalImgAlt: "하이패스 단말기(GPASS) 이미지",
                    },
                    {
                        label:   "고속도로 미납\n통행료 납부",
                        hero:    null,
                        heroAlt: "",
                        title:   "고속도로 미납통행료 조회\n/수납서비스",
                        desc:    "국내편의점 중 최초로 고속도로 미납통행료 실시간 조회 및 납부할 수 있는 서비스입니다.",
                        serviceTitle: "서비스 장점",
                        serviceAdvantages: [
                            {
                                num:   "01",
                                title: "전국 GS25 편의점에서\n 차량번호만으로 편리하게 납부 가능",
                                desc:  "서비스 시행 : 2019.08.23부터",
                            },
                            {
                                num:   "02",
                                title: "미납통행료\n 실시간 납부",
                                desc:  "*법인 차량은 추후 서비스 예정",
                            },
                            {
                                num:   "03",
                                title: "현금, 신용카드로\n 납부 가능",
                                desc:  "현금이든 신용카드든  편의에 따라 납부 가능",
                            },
                        ],
                        unpaidTitle: "고속도로 미납통행료 납부 방법",
                        unpaidSteps: [
                            { step: "Step 1", title: "GS25 편의점에게<br />납부요청",
                                bullets: [
                                    "가까운 GS25에서 하이패스 카드 구매",
                                    "카드 구입비: 5,000원",
                                ],
                             },
                            { step: "Step 2", title: "차량번호 입력" },
                            { step: "Step 3", title: "개인정보제공동의" },
                            { step: "Step 4", title: "생년월일 입력" },
                            { step: "Step 5", title: "결제(현금/신용카드)" },
                        ],
                    },
                    {
                        label:   "온라인몰\n편의점 결제",
                        hero:    null,
                        heroAlt: "",
                        title:   "온라인몰 편의점 결제",
                        desc:    "온라인몰(쇼핑, 게임, 항공사, 기타)에서 구매할 때 '편의점결제'를 선택하고 문자로 수납번호나 바코드를 받아 GS25에서 현금 결제할 수 있는 서비스입니다.",
                        serviceTitle: "편의점 결제의 장점",
                        serviceAdvantages: [
                            {
                                num:   "01",
                                title: "보편성",
                                desc:  "은행보다 많고 가까운 집 근처 편의점에서 24시간 결제 가능<br /><span class=\"txt_point\">전국 모든 GS25 점포에서 수납 대행</span><br />(실시간 입금확인, 대면 거래)",
                            },
                            {
                                num:   "02",
                                title: "경제성",
                                desc:  "고객 수수료 별도 부담 없음<br />계좌이체, 무통장입금 발생되는 뱅킹 수수료 없음",
                            },
                            {
                                num:   "03",
                                title: "편리성",
                                desc:  "은행에 가지 않아도, 신용카드가 없어도, 온라인상점에서 주문하면 결제(입금)은 편의점에서 완료<br /><span class=\"txt_point\">거스름돈은 점포에서 바로 수령 가능</span>",
                            },
                            {
                                num:   "04",
                                title: "안전성",
                                desc:  "복잡한 공인인증서나 보안 카드가 필요 없고, 결제정보 노출 방지<br />대면 거래에 따른 전자금융사고 (스미싱)<br />예방",
                            },
                        ],
                        mallPaymentTitle: "편의점 결제 이용 방법",
                        mallPaymentSteps: [
                            { step: "Step 1", title: "온라인몰에서<br />상품/서비스 구매",
                                bullets: [
                                    "가까운 GS25에서 하이패스 카드 구매",
                                    "카드 구입비: 5,000원",
                                ],
                             },
                            { step: "Step 2", title: "온라인몰에서<br />상품/서비스 구매" },
                            { step: "Step 3", title: "가까운 GS25에서<br />24시간 결제" },
                            { step: "Step 4", title: "집으로 상품 배송<br />(캐시충전)" },
                        ],
                        mallSiteTitle: "이용 가능한 온라인 및 모바일 사이트",
                        mallSiteNote:  "* 향후 지속 확대예정",
                        mallSiteItems: [
                            { name: "11번가",                  img: imgServiceDesc01 },
                            { name: "스타일쉐어",              img: imgServiceDesc02 },
                            { name: "NC소프트",                img: imgServiceDesc03 },
                            { name: "파워콜 항공/쇼핑",        img: imgServiceDesc04 },
                            { name: "티웨이항공",              img: imgServiceDesc05 },
                            { name: "유니컴즈\n(LG U+ 별정통신사)", img: imgServiceDesc06 },
                        ],
                    },
                ],
            },
            {
                hero:     null,
                heroAlt:  "",
                title:    "택배&픽업",
                subtitle: "",
                sections: [],
                serviceTabs: [
                    {
                        label:   "국내택배",
                        hero:  imgHero7,
                        heroAlt: "",
                        title:   "국내택배 서비스",
                        desc:    "365일 24시간 가까운 GS25에서 택배 접수가 가능합니다.",
                        notes: [
                            {
                                text: "중량 측정을 통한 합리적인 운임을 제공합니다.<br class=\"m_br\" />(최저 3,400원)",
                                sub:  "*25년 4월1일부로 변경",
                            },
                            {
                                text: "접수시점부터 배달완료까지 배송단계 별 SMS 서비스를 제공합니다.",
                            },
                            {
                                text: "GS포스트박스 회원으로 접수 시 다양한 이벤트에 참여 가능하며, 사용량에 따라 등급 별 혜택을 제공합니다.",
                            },
                        ],
                        stepTitle: "국내택배 이용방법",
                        steps: [
                            { step: "Step 1", title: "홈페이지/모바일APP<br />택배접수 예약" },
                            { step: "Step 2", title: "홈페이지/모바일APP<br />택배접수 예약" },
                            { step: "Step 3", title: "무인택배장비로 접수<br />(중량측정)" },
                            { step: "Step 4", title: "카운터에서 결제 후<br />물품보관함에 보관" },
                        ],
                        cautionTitle: "국내택배 유의사항",
                        cautionItems: [
                            {
                                // icon: imgCautionSize,
                                icon:    null,
                                iconAlt: "사이즈 아이콘",
                                title:   "사이즈",
                                desc:    "가로 세로 높이의 합 160cm 이내<br />한변의 길이가 1m 이내",
                            },
                            {
                                // icon: imgCautionWeight,
                                icon:    null,
                                iconAlt: "중량 아이콘",
                                title:   "중량",
                                desc:    "20kg 이하",
                            },
                            {
                                // icon: imgCautionPrice,
                                icon:    null,
                                iconAlt: "물품가액 아이콘",
                                title:   "물품가액",
                                desc:    "50만원 이하",
                            },
                        ],
                        priceTitle: "국내택배 이용요금",
                        priceItems: [
                            {
                                text: "최저 3,400원부터 중량 및 거리에 따라 요금 적용",
                                subs: [
                                    "동일권/타권/제주권에 따라 다름",
                                    "서신/서류는 우편법 규정에 의거하여 운임산정",
                                ],
                            },
                            { text: "착불 시 착불수수료(300원) 부과" },
                            { text: "도서지역으로 배송 시 4,000원 부과" },
                            { text: "고액상품(50만원 초과) 배송시 2,500원 부과" },
                        ],
                        periodTitle: "국내택배 이용기간",
                        periodItems: [
                            { text: "평일 17시(시,군,구 일부지역 및 경기 일부지역 15시), 토요일 12시 이전 접수 시 익일 배송" },
                            { text: "일요일 및 공휴일은 접수만 가능" },
                            { text: "점포 별로 마감시간이 다를 수 있음" },
                        ],
                    },
                    {
                        label: "반값택배",
                        hero: imgHero8,
                        heroAlt: "",
                        title: "반값택배 서비스",
                        desc: "편의점 최초! 국내유일 공휴일 배송! 최저가택배 GS25에서 보내고 GS25에서 받아보세요.",
                        notes: [
                            {
                                text: "편의점 최초! 편의점에서 접수하고 편의점에서 수령 가능합니다.",
                            },
                            {
                                text: "거리에 상관없이 무게에 따라 이용 가능합니다.",
                            },
                            {
                                text: "접수시점부터 배달완료까지 배송단계 별 SMS 서비스를 제공합니다.",
                            },
                        ],
                        stepTitle: "반값택배 이용 방법",
                        steps: [
                            { step: "Step 1", title: "홈페이지/모바일APP<br />택배접수 예약", bullets: ["수령점포 선택 입력"] },
                            { step: "Step 2", title: "물품 포장 후<br />GS25 방문" },
                            { step: "Step 3", title: "무인택배장비로 접수<br />(중량측정)" }, 
                            { step: "Step 4", title: "카운터에서 결제 후<br/> 근무자에게 전달" },
                        ],
                        priceTable: {
                            title: "반값택배 이용요금",
                            desc:  "운임 결제는 선불만 가능",
                            note:  "향후 지속 확대예정",
                            columns: [
                                { label: "구분" },
                                { label: "내륙↔내륙 / 제주↔제주", labelMo: "내륙↔내륙<br />제주↔제주" },
                                { label: "제주↔내륙 / 내륙↔도서", labelMo: "제주↔내륙<br />내륙↔도서" },
                            ],
                            colWidths: ["18.87%", "40.56%", "40.56%"],
                            rows: [
                                {
                                    cells: [
                                        "이용요금",
                                        "~500g: 1,900원<br />~1kg: 2,300원<br />~5kg: 2,700원",
                                        "~500g: 3,600원<br />~1kg: 4,000원<br />~5kg: 4,400원",
                                    ],
                                },
                            ],
                        },
                        infoTable: {
                            title: "반값택배 이용안내",
                            colWidths: ["136px", "auto"],
                            rows: [
                                { head: "예약방법",    text: "반값택배 예약 시 도착점을 GS25 편의점으로 선택" },
                                { head: "서비스 지역", text: "GS25 ↔ GS25" },
                                { head: "수령방법",    text: "점포 근무자에게 알림톡으로 전송된 QR코드 제시" },
                                { head: "배송기간",
                                    items: [
                                        "내륙~내륙, 제주~제주 : 접수일포함 4일 이내, 동일권역 2~3일 이내",
                                        "제주↔내륙 : 접수일 포함 5~7일 내",
                                    ],
                                    note: [
                                        "*주말/공휴일 배송 가능",
                                        "*내륙↔제주 간 반값택배는 접수일 포함 7일 이내 배송 완료 됩니다.",
                                        "*기상 상황으로 선박 운행이 불가하거나, 선박운행 스케줄 변동으로 배송소요일이 추가될 수 있습니다.",
                                    ],
                                },
                            ],
                        },
                        cautionTitle: "반값택배 유의사항",
                        cautionItems: [
                            { icon: null, iconAlt: "마감시간 아이콘",   title: "마감시간",          desc: "당일 수거 마감시간 오전 09시" },
                            { icon: null, iconAlt: "규격 아이콘",       title: "규격 초과 시 수거 불가", desc: "세변의 합 80cm 이내" },
                            { icon: null, iconAlt: "중량 아이콘",       title: "중량",              desc: "5kg 이하" },
                            { icon: null, iconAlt: "물품가액 아이콘",   title: "물품가액",          desc: "50만원 이하" },
                        ],
                    },
                    {
                        label: "국제택배",
                        hero:    imgHero9,
                        heroAlt: "",
                        title: "국제택배 서비스",
                        desc: "365일 24시간 가까운 GS25에서 국제택배 접수가 가능 합니다. (SFExpress, 우체국EMS, DHL)",
                        notes: [
                            {
                                text: "GS25 편의점에서 24시간 국제택배 예약/접수가 가능합니다.",
                            },
                            {
                                text: "예약 시 특송사(SF Express, EMS, DHL)를 선택하여 접수 가능합니다.",
                            },
                            {
                                text: "접수시점부터 배달완료까지 배송단계 별 SMS 서비스를 제공합니다.",
                            },
                        ],
                        noticeTitle:"국제택배 이용방법",
                        noticeItems: [
                            { step: "Step 1", title: "홈페이지/모바일APP<br />택배접수 예약", bullets: ["회원, 영문작성"] },
                            { step: "Step 2", title: "물품 포장 후<br />GS25 방문", },
                            { step: "Step 3", title: "무인택배장비로 접수<br />(중량측정)"},
                            { step: "Step 4", title: "카운터에서 결제 후<br />물품보관함에 보관"},
                        ],
                        chargeTitle: "국제택배 이용요금 및 배송 가능 국가",
                        chargeItems: [
                            { text: "서비스 운임 및 배송가능 국가는 각 특송사 별 상이하며, 홈페이지/모바일 APP 예약 시 운임 조회 가능" },
                            { text: "운임 결제는 선불만 가능" },
                            { text: "점포 별로 마감시간이 다를 수 있음" },
                        ],
                        methodTitle: "국제택배 배송방법",
                        methodItems: [
                            { text: "평일 17시(시,군,구 일부지역 및 경기 일부지역 15시), 토요일 12시 이전 접수 시 CJ대한통운 택배를 통해 수거 되며, 익일 각 특송사에 접수되어 해외로 발송" },
                            { text: "일요일 및 공휴일은 접수만 가능" },
                            { text: "점포 별로 마감시간이 다를 수 있음" },
                        ],
                    },
                    {
                        label: "픽업",
                        hero: imgHero10,
                        heroAlt: "",
                        title: "픽업 서비스",
                        desc: "쇼핑몰에서 상품주문 후, 가까운 GS25에서 물건을 찾아가세요.",
                        notes: [
                            {
                                text: "원하는 시간에 지정한 점포에서 수령이 가능합니다. (안심택배)",
                            },
                            {
                                text: "도착 완료 시 SMS 알림 서비스를 제공합니다.",
                            },
                        ],
                        pickupTitle: "픽업 이용방법",
                        pickupItems: [
                            { step: "Step 1", title: "쇼핑몰 배송방법<br />편의점 PICK-UP 선택", bullets: ["회원, 영문작성"] },
                            { step: "Step 2", title: "가까운 GS25 선택"},
                            { step: "Step 3", title: "물건 도착 SMS를 받고<br />편의점 방문 수령"},
                        ],
                        shoppingTitle: "픽업서비스 제휴쇼핑몰",
                        shoppingItems: [ { text: "제휴 쇼핑몰은 <a href=\"https://www.cvsnet.co.kr\" target=\"_blank\" rel=\"noopener noreferrer\">www.cvsnet.co.kr</a>에서 확인" } ],
                        partnerBtnText: "픽업 제휴쇼핑몰 확인하기",
                    },
                    {
                        label:   "쇼핑몰거래",
                        hero:    imgHero11,
                        heroAlt: "",
                        title:   "쇼핑몰 거래 서비스",
                        desc:    "홈쇼핑 반품, 오픈마켓, 온라인 쇼핑몰 등 편리하게 이용하실 수 있는 서비스입니다.",
                        notes: [
                            { text: "365일 24시간 편리한 시간대에 가까운 GS25에 방문하여 이용 가능합니다." },
                        ],
                        pickupTitle: "이용방법",
                        pickupItems: [
                            { step: "Step 1", title: "제휴업체 승인번호 발급 후<br />GS25 방문", bullets: ["회원, 영문작성"]},
                            { step: "Step 2", title: "무인택배장비에서<br />승인번호 입력" },
                            { step: "Step 3", title: "운송장 출력 후<br />접수" },
                        ],
                        shoppingTitle: "이용가능 제휴처",
                        shoppingItems: [ { text: "제휴 쇼핑몰은 <a href=\"https://www.cvsnet.co.kr\" target=\"_blank\" rel=\"noopener noreferrer\">www.cvsnet.co.kr</a>에서 확인" } ],
                        partnerBtnText: "이용가능 제휴처 확인하기",
                    },
                ],
            },
            {
                hero: null,
                heroAlt: "",
                title: "공공요금수납 서비스",
                subtitle: "365일 24시간 가까운 GS25에서 택배 접수가 가능합니다.",
                desc: "지로고지서에 편의점 수납용 바코드가 있다면 GS25편의점에서 24시간 365일 세금, 4대보험료 및 공과금의 편리한 납부가 가능한 서비스입니다.",
                sections: [],
                panelExtra: {
                    desc: "지로고지서에 편의점 수납용 바코드가 있다면 GS25편의점에 서 24시간 365일 세금, 4대보험료 및 공과금의 편리한 납부가 가능한 서비스입니다.<br class=\"m_br\" /><br class=\"m_br\" />기존지로 납부 외 휴대폰을 통한 모바일수납도 가능하며,납부공과금에 따라 현금과 계좌이체 및 신용카드까지 다양한 수단으로 납부가능합니다.",
                    bullets: [
                        "접수시점부터 배달완료까지 배송단계 별 SMS 서비스를 제공합니다.",
                        "GS포스트박스 회원으로 접수 시 다양한 이벤트에 참여 가능하며, 사용량에 따라 등급 별 혜택을 제공합니다.",
                    ],
                },
                taxTitle: "납부가능 세금 및 공과금",
                taxGroups: [
                    {
                        subtitle: "세금",
                        isList: true,
                        items: [
                            "국세(소득세, 법인세, 부가세, 상속세, 증여세, 개별소비세, 종합부동산세)",
                            "서울, 부산시지방세(취득세, 등록세, 재산세, 자동차세, 주민세, 상하수도요금 버스정용차선위반벌칙금 등)",
                            "기타 지방세(남양, 안양, 안산, 고양, 과천부, 양주, 동두천, 마주, 충전, 제천, 보령시 및 음성군 - 취득세, 등록세, 재산세, 주민세, 자동차세 등)",
                        ],
                    },
                    {
                        subtitle: "4대보험료",
                        items: [
                            "건강보험, 국민연금, 고용보험, 산재보험(사회보험통합 4대보험료)",
                        ],
                    },
                    {
                        subtitle: "공과금",
                        items: [
                            "전기요금, 도시가스요금(서울, 삼천리, 서라벨, 인천, 강남, 경동도시가스), 통신요금(kt, LGU+, SKT), 케이블TV요금(현대HCN, 티브로드, C&M, CMB, 스카이라이프, 아름방송, 충북방송, 남인천방송, 금강방송, 무료방송 등), 신문료(조선일보, 매일경제신문), 한국도로공사 과태료 등",
                        ],
                    },
                ],
            },
            {
                hero: null,
                heroAlt: "",
                title: "상품권 판매",
                subtitle: "상품권 판매 서비스",
                desc: "문화상품권, 금강제화, GS칼텍스 상품권 등을 판매하고 있습니다.",
                sections: [],
                voucherTitle: "상품권 종류",
                voucherItems: [
                    {
                        img: imgGiftCerti01,
                        name: "문화상품권",
                        tags: [
                            { text: "5천원권", type: "blue" },
                            { text: "1만원권", type: "green" },
                        ],
                        desc: "도서음반, 영화티켓구입, 외식(일부), 인터넷(게임, 포털)에서 사용 가능한 상품권",
                    },
                    {
                        img: imgGiftCerti02,
                        name: "금강제화상품권",
                        tags: [
                            { text: "5만원권", type: "orange" },
                            { text: "10만원권", type: "orange" },
                        ],
                        desc: "전국 1300여개 도시 4000여 매장 (~5만원권, 10만원권)/(금강, 버팔로, PGA, LPGA, 금강핸드백 등) 어디서나 사용 가능한 실속 있는 상품권",
                    },
                    {
                        img: imgGiftCerti03,
                        name: "GS칼텍스상품권",
                        tags: [
                            { text: "1만원권", type: "green" },
                            { text: "5만원권", type: "orange" },
                            { text: "10만원권", type: "orange" },
                        ],
                        desc: "주유소,백화점,외식,마트,호텔,여행사 등에서 사용 가능한 상품권",
                    },
                ],
            },
        ],
    },
    winwin: {
        tabs: [
            {
                serviceTabs: [
                    { 
                        label: "점포\n운영지원 혜택",
                        title: "점포 운영지원 혜택",
                        notes: [
                            { text: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다." },
                        ],
                        items: [
                            {
                                num: "01",
                                title: "인력 지원 제도",
                                desc: "매출 향상, 신상품 도입 등 점포 경쟁력 향상을 위해<br class=\"p_br\" />노력하시는 경영주님을 위한 인센티브 제도",
                            },
                            {
                                num: "02",
                                title: "카운터FF 운영 우수점 지원",
                                desc: "카운터FF 매출 활성화 도모",
                                bullets: ["치킨25 운영비 지원", "카페25 운영비 지원", "위생등급 취득 점포 점수 필터 지원"],
                            },
                            {
                                num: "03",
                                title: "채용 플랫폼 지원",
                                desc: "스토어매니저(근무자) 구인 지원",
                                bullets: ["알바몬 이용 지원", "제휴 플랫폼 지원"],
                            },
                            {
                                num: "04",
                                title: "상생지원 보험",
                                desc: "업계를 선도하는 '다양한 보험 지원'제도",
                                bullets: ["안심상해/횡령", "택배도난/현금도난"],
                            },
                            {
                                num: "05",
                                title: "가맹점 상생대출",
                                desc: "신용/담보대출 우대금리 적용",
                                bullets: ["우리은행 연계 대출", "추가 우대금리 적용"],
                            },
                        ],
                    },
                    {
                        label: "장기운영점 및\n우수점포 혜택",
                        title: "장기운영점 및 우수점포 혜택",
                        notes: [
                            { text: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다." },
                        ],
                        items: [
                            { num: "01", title: "10년차 장기운영 지원 혜택", desc: "10주년 운영 경영주님 예우",bullets: ["기념패", "건강검진"] },
                            { num: "02", title: "20년차 장기운영 지원 혜택", desc: "20’s Clubf 가입", bullets: ["기념패", "여행상품권", "건강검진"] },
                            { num: "03", title: "30년차 장기운영 지원 혜택", desc: "30주년 운영 경영주님 점포 세레머니 진행", bullets: ["기념패", "30주년 기념 행사", "여행상품권","건강검진"]},
                            { num: "04", title: "우수점포 경영주 포상", desc: null, bullets: ["우수점포 대상 혜택 지급"] },
                        ],
                    },
                    {
                        label: "점포\n소원 지원",
                        title: "점포 소원 지원",
                        notes: [
                            { text: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다." },
                        ],
                        items: [
                            { num: "01", title: "해피콜 센터 운영(24H)", desc: "24시간 소통채널 운영" , bullets: ["시설", "전산", "건의사항", "기타문의"]},
                            { num: "02", title: "무료 법률 상담 서비스", desc: "변호사 무료 법률 자문 상담", bullets: ["민사 / 형사", "가사 / 행정"] },
                            { num: "03", title: "노무상담 콜센터 운영", desc: "전반적인 노무 상담 서비스 제공", bullets: ["채용","4대 보험","전반적인 노무"] },
                        ],
                    },
                    {
                        label: "(경영주/스토어매니저)역량 레벨업 지원",
                        title: "(경영주/스토어매니저)<br class=\"m_br\" />역량 레벨업 지원",
                        notes: [
                            { text: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다." },
                        ],
                        items: [
                            { num: "01", title: "GS25 챗봇조이", desc: "GS25 근무 지원을 위한 카카오톡 챗봇 서비스" , bullets: ["365일 24시간 응답", "재고 / 물류 조회", "점포 운영 매뉴얼", "모바일 해피콜 등록"], link: "https://pf.kakao.com/_xmTxexcb?from=qr" },
                            { num: "02", title: "모바일 점포경영", desc: "경영주와 스토어매니저 간 점포 운영 업무에 대한 소통 지원 APP", bullets: ["경영주/스토어매니저 전용 앱", "서비스 체크타임", "소비기한 관리","오늘의 업무 관리", "공지 전달"] },
                            { num: "03", title: "온라인 열린아카데미", desc: "경영주 역량 강화", bullets: ["매월 2회 라이브 교육", "다양한 컨텐츠","사내/외 전문강사"] , link: "https://gs25.getsmart.co.kr/members/login?returnUrl=http%3A%2F%2Fgs25.getsmart.co.kr%2F"},
                            { num: "04", title: "우수점 연구소", desc: "GS25 온라인 소식지", bullets: ["이달의 우수 경영주","성공 사례 안내","운영 Tip 소개"] },
                            { num: "05", title: "신규 경영주 입문교육", desc: null, bullets: ["운영 교육(POS, 점포경영, 시스템","서비스 교육","온라인 교육과정(GS클래스)"] , link: "https://gs25.getsmart.co.kr/members/login?returnUrl=http%3A%2F%2Fgs25.getsmart.co.kr%2F" },
                            { num: "06", title: "스토어매니저 클래스", desc: "근무자 교육 지원", bullets: ["POS 교육","청결 교육","접객서비스 교육"] , link: "http://hpimg.gsretail.com/images/gs25/winwin/web/store_manager_map.html" },
                        ],
                    },
                    {
                        label: "사회공헌\n지원",
                        title: "사회공헌 지원", 
                        notes: [
                            { text: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다." },
                        ],
                        items: [
                            { num: "01", title: "상생나눔 플랫폼 운영", desc: "사회적 약자를 위한 사회공헌형 점포 운영", bullets: ["내일스토어", "시니어스토어", "늘봄스토어"] },
                            { num: "02", title: "자연재해 피해 위로금", desc: "자연재해 피해를 입은 점포에 위로금 지급", bullets: ["자연재해","화재","가옥/전/답 피해"] },
                            { num: "03", title: "GS 히어로상", desc: "사회적으로 귀감이 되는 경영주,근무자에게 지원", bullets: ["모범상","귀감상","나눔상"] },
                            { num: "04", title: "화재예방 소화기 공유", desc: "점포 인근 화재발생 시 소화기 공유를 통한 화재예방", bullets: ["점포인근 화재발생 시 점포 소화기 공유", "사용 후 교환 지원"] },
                        ],
                    },
                    {
                        label: "경영주\n복지 혜택",
                        title: "경영주 복지 혜택",
                        notes: [
                            { text: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다." },
                        ],
                        items: [
                            { num: "01", title: "경조사 지원", desc: "경조금 및 용품 지원", bullets:["경조금 지급", "점포 운영 지원금 지급","장례 용품 지급", "출산 용품 지급"] },
                            { num: "02", title: "명절 및 경조사 자율휴무", desc: "자율 휴무 진행", bullets: ["명절 휴점 및 단축 영업","경조사 휴점 및 단축 영업"] },
                            { num: "03", title: "경영주 복지몰 운영", desc: "경영주 전용 복지몰", bullets: ["합리적 가격", "단독상품", "기획 특가전"] },
                            { num: "04", title: "종합 건강검진 할인", desc: "제휴 건강검진 센터 종합 건강검진 할인가 이용", bullets: ["KMI 센터","협력 병원"] },
                            { num: "05", title: "엔젤 리조트", desc: "엔젤리조트 회원가 이용", bullets: ["한화리조트", "엘리시안 강촌"] },
                            { num: "06", title: "엔젤 렌터카 (장기/중고차)", desc: "GS25 경영주님만을 위한 엔젤 렌터카 (장기/중고차)", bullets: ["제휴가 견적 제공", "빠른 출고/전 차종","전용 상담 채널 운영"] },
                        ],
                    },
                ],
            },
            {
                hero: imgHero11_1,
                heroAlt: "",
                title: "참여제도",
                desc: "GS25에서는 다양한 의견 수렴, 홍보, 콜센터 지원으로 경영주님에게 도움을 드리고 있습니다.",
                items: [
                    {
                        num: "01",
                        title: "경영주 협의회",
                        desc: "지역별 정기 간담회(격월, 분기별)를 통하여 각종 제도제안 및 이슈사항 협의",
                    },
                    {
                        num: "02",
                        title: "자율분쟁조정위원회",
                        desc: "가맹본부와 경영주 간의 분쟁이 발생 시, 위원장(외부 전문가), 경영주/본부 대표가 자율적 해결/조정안 마련",
                    },
                    {
                        num: "03",
                        title: "24시간 통합 콜센터 운영",
                        desc: "점포 운영의 불편사항에 대한 접수<br />및 상담 창구 운영(24시간 운영)",
                    },
                    {
                        num: "04",
                        title: "경영주 열린제안",
                        desc: "경영주님의 다양한 제안과 아이디어 접수를 통해 생생한 현장의 목소리를 청취하여 점포 운영 및 본부 정책에 개선 반영하고 있습니다.",
                    },
                ],
            },
        ],
    },
    milbox: {
        hero: imgHero12,
        heroAlt: "",
        title: "기업/단체 정기 서비스",
        sections: [
            {
                type: "feature",
                title: "GS25 기업/단체 대상 정기 배송 서비스란?",
                desc: "대한민국 대표 편의점 GS25가 가진 차별화 경쟁력을 기반으로 한 기업·단체 대상 조식/간식 정기 배송 서비스입니다.<br />사내 식당이 없거나 간식 복지 도입을 고민 중이라면, 아래 서비스를 확인해보세요.",
                items: [
                    { title: "트렌디한 상품" },
                    { title: "합리적인 가격" },
                    { title: "약 1,200개 기업 이용중" },
                ],
            },
            {
                type: "imgcard",
                title: "서비스 소개",
                items: [
                    {
                        img: require("@/assets/images/sub/gsrbr010101/img_mealbox.png"),
                        name: "밀박스25",
                        desc: "GS25에서 제공하는 기업/단체 대상 간편식 정기 제공 서비스 입니다.<br class=\"p_br\" />주식부터 디저트, 음료까지 매일 새로운 구성으로 운영 됩니다.<br class=\"p_br\" />HACCP 인증, 개별 포장으로 위생적이고 맛있는 한끼를 제공합니다.",
                        link: "#",
                    },
                    {
                        img: require("@/assets/images/sub/gsrbr010101/img_snackbar.png"),
                        name: "스낵바",
                        desc: "GS25에서 운영하는 트렌디한 상품을 정기적으로 기업/단체에 제공하는 간식 큐레이팅 서비스입니다. 사내 복지 향상을 위해 GS25의 상품을 이제는 회사에서 즐기세요.",
                    },
                ],
                advantages: {
                    title: "이런 분들에게 추천 드립니다.",
                    items: [
                        { text: "정기적 조식/간식 서비스가 필요할 때" },
                        { text: "합리적 가격의 복지 서비스가 필요할 때" },
                        { text: "급식 인프라가 없어 정기적인 간편식 공급이 필요할 때" },
                    ],
                },
            },
        ],
    },
    brand: {
        visual: {
            lines: [
                "일상생활의 중심",
                '하루의 시작<em class="m_gs25"> GS25</em>',
            ],
            logoAlt: "GS25",
        },
        about: [
            [
                '대한민국 토종 브랜드의 <br class="m_br" />자존심을 지키고 있는 GS25는',
                "'수익을 낼 수 있는 가맹점을 늘린다'는 <br class=\"m_br\" />프랜차이즈 사업의 대원칙을",
                '변함없이 지켜온 결과, <br class="m_br" />개발점 수익성이 가장 높은 국내 최고의<br class="m_br" /> 편의점 브랜드로 <br class="p_br" />자리매김하였습니다.',
            ],
            [
                "'한국에서 가장 존경받는 기업' 16년 연속 1위,",
                '한국서비스 품질지수(KS-SQI) 1위 <br class="m_br" />총 19회 수상 등 공신력 있는 대외 기관의',
                "평가 결과로 이어지고 있습니다.",
            ],
        ],
        str: {
            title: "당신 곁에는 언제나<br />GS25가 있습니다.",
            storeFind: "매장 찾기",
            snsInstaAria: "인스타그램",
            snsYtAria: "유튜브",
            items: [
                {
                    title: "업계 최고<br />점포 당 매출액 달성",
                    desc: '점포 경쟁력을<br class="m_br" />강화하고 고객중심의 상품서비스 제공을 통해<br />편의점 업계 최고의 매출액을 달성하고 있습니다.',
                },
                {
                    title: 'GS25만의 차별화된<br class="p_br" /> 상품과<br class="m_br" />서비스 제공',
                    desc: '안전하고 맛있는 후레쉬푸드 상품 등 고품질의 먹거리 상품 개발과<br class="p_br" />좋은 품질, 합리적 가격의 PB브랜드 \'YOUUS\',<br class="p_br" />GS리테일의 전용 어플리케이션 우리동네GS 등 차별화된 상품과 서비스를 통해 고객에게 새로운 가치를 제공하고 있습니다.',
                },
                {
                    title: '경영주와의 끊임없는 소통과<br class="m_br" />협력을 통한 <br class="p_br" />단단한 파트너십',
                    desc: "경영주와 본부의 파트너십 구축을 위해 다양한 소통창구와 상생제도를 도입하여 운영중에 있습니다. Refresh 휴가지원, GS25 20's Club 등을 업계 최초로 개발하여 경영주의 만족과 자부심을 높이고 있습니다.",
                },
            ],
        },
    },
    common: {
        selectPlaceholder: "선택하세요",
        trafficSelectAria: "교통 사용처 선택",
        retailSelectAria: "유통 사용처 선택",
        prevAria: "이전",
        nextAria: "다음",
    },
    backLabel: "목록으로 돌아가기",
    },
    en: {
    nav: {
        depth1: [
            { item: "Differentiated Products" },
            { item: "Fresh Concept Store" },
            { item: "Store / Services" },
            { item: "Win-Win Cooperation" },
            { item: "Corporate / Group Subscription Service" }, //26.05.15 Edit 이종환
        ],
        depth2: [
            { item: "Differentiated Products" },
            { item: "CAFE25" },
            { item: "CHICKEN25" },
            { item: "GOPIZZA" },
        ],
        depth2Store: [
            { item: "Lifestyle Services" },
            { item: "Parcel & Pickup" },
            { item: "Utility Bill Payment" },
            { item: "Gift Card Sales" },
        ],
        depth2Winwin: [
            { item: "Operational Support Programs" },
            { item: "Participation Programs" },
        ],
    },
    tabs: [
        {
            hero: imgHero0,
            heroAlt: "",
            title: "Differentiated Products",
            subtitle: "From reasonable prices and trustworthy quality to innovative products that enrich everyday life, we are always with you, bringing joy to your daily life.",
            cards: [
                {
                    image: imgCard1,
                    alt: "",
                    title: "Kim Hye-ja Lunchbox",
                    desc: "A premium lunchbox line crafted for a heartfelt, wholesome meal — GS25's signature differentiated product with high customer satisfaction.",
                },
                {
                    image: imgCard2,
                    alt: "",
                    title: "YOUUS",
                    desc: "Built on outstanding quality and reasonable value, YOUUS delivers fun and enjoyment available only at GS Retail.",
                },
            ],
            qr: {
                title: "Download the Our Neighborhood GS App",
                desc: "Download the Our Neighborhood GS app to discover GS25's various events and differentiated products. Scan the QR code to go to the app download page.",
            },
        },
        {
            hero: imgHero1,
            heroAlt: "",
            title: "CAFE25",
            subtitle: "GS25's differentiated specialty coffee zone, offering top-quality coffee at reasonable prices using premium machines and specialty blended beans.",
            sections: [
                {
                    type: "cards",
                    title: "Coffee Machine",
                    desc: "A Franke machine — a premium Swiss coffee machine with a consumer value of approximately KRW 13 million.",
                    cards: [
                        { image: imgCoffeeMachine01, alt: "" },
                        { image: imgCoffeeMachine02, alt: "" },
                        { image: imgCoffeeMachine03, alt: "" },
                    ],
                },
                {
                    type: "table",
                    title: "Coffee Beans",
                    desc: "Specialty blended beans from Dongsuh Foods, Korea's No. 1 roaster (a blend of five beans from leading producers including Brazil, Guatemala, and Colombia).",
                    columns: [
                        { key: "country", label: "Origin",  width: 200, align: "left" },
                        { key: "ratio",   label: "Blend Ratio",  width: 160, align: "center" },
                        { key: "process", label: "Processing Method", width: 289, align: "center" },
                        { key: "feature", label: "Bean Characteristics", width: 289, align: "left" },
                    ],
                    rows: [
                        { flag: imgFlagBrazil,    country: "Brazil",      ratio: "35%", process: "Natural", feature: "Well-balanced aroma and flavor" },
                        { flag: imgFlagGuatemala, country: "Guatemala",     ratio: "30%", process: "Washed",  feature: "Outstanding body" },
                        { flag: imgFlagColombia,  country: "Colombia",     ratio: "25%", process: "Washed",  feature: "Nutty richness" },
                        { flag: imgFlagEthiopia,  country: "Ethiopia",   ratio: "5%",  process: "Washed",  feature: "Bright and lively acidity" },
                        { flag: imgFlagPapua,     country: "Papua New Guinea", ratio: "5%",  process: "Washed",  feature: "Floral and herbal notes" },
                    ],
                },
                {
                    type: "image",
                    title: "CAFE25, outperforming specialty café coffee in taste",
                    desc: "Evaluated by the Barista Association as matching the taste of major coffee franchises.",
                    source: "Korea Coffee Association sensory evaluation results (May 2023)",
                    image: imgCafe25Graph,
                    imageAlt: "Coffee taste comparison graph — bar chart showing GS25 reaches specialty café-level quality",
                },
                {
                    type: "split",
                    title: "Menu Introduction",
                    image: imgCafeMenu,
                    imageMo: imgCafeMenuMo,
                    imageAlt: "CAFE25 menu image",
                    columns: [
                        { key: "menu",     label: "Category",           width: 260, align: "left" },
                        { key: "volume",   label: "Serving Size (mL)", width: 220, align: "center" },
                        { key: "caffeine", label: "Caffeine Content (mg)", width: 220, align: "center" },
                    ],
                    rows: [
                        { menu: "Espresso",            volume: "35",  caffeine: "137" },
                        { menu: "Cacao Espresso",       volume: "43",  caffeine: "127" },
                        { menu: "Americano",             volume: "200", caffeine: "121" },
                        { menu: "Americano (Large)",        volume: "245", caffeine: "132" },
                        { menu: "Iced Americano",       volume: "380", caffeine: "144" },
                        { menu: "Iced Americano (Large)",  volume: "480", caffeine: "140" },
                        { menu: "Iced Americano (Jumbo)",  volume: "780", caffeine: "180" },
                    ],
                },
            ],
        },
        {
            hero: imgHero2,
            heroAlt: "",
            title: "CHICKEN25",
            subtitle: "GS25's differentiated food line, freshly fried in-store using the finest ingredients and offered at reasonable prices.<br class=\"p_br\" />Now you can enjoy specialty-shop-quality chicken at the convenience store with CHICKEN25.",
            sections: [
                {
                    type: "text_cards",
                    title: "Carefully selected ingredients, trustworthy taste",
                    desc: "We provide high-quality chicken made from the finest ingredients, so you can enjoy it with confidence and great taste.",
                    cards: [
                        {
                            title: "Tastier fried food<br />with clean oil",
                            desc: "We use carefully managed clean oil for crispier, tastier results,<br />and strict hygiene management means you can enjoy<br />delicious chicken with peace of mind.",
                        },
                        {
                            title: "Various menu,<br />fun to choose",
                            desc: "Choose from a wider range of options than specialty stores<br />and enjoy a variety of menu items.<br />(whole chicken, half chicken, drumsticks, wings, mini-drumsticks, skewers, hot dogs, fried dumplings, and more)",
                        },
                        {
                            title: "Convenient purchase<br />anytime nearby",
                            desc: "You can easily enjoy crispy, freshly fried chicken<br />anytime at your nearest GS25.<br />Delivery and pickup through the Our Neighborhood GS app<br />makes purchasing from nearby GS25 stores even more convenient.",
                        },
                    ],
                },
            ],
            imgGrid: [
                { image: imgChickenLeft, alt: "" },
                { image: imgChickenRight, alt: "" },
            ],
            qr: {
                title: "Download the Our Neighborhood GS App",
                desc: "Download the Our Neighborhood GS app to discover GS25's various events and differentiated products.<br />Scan the QR code to go to the app download page.",
            },
        },
        {
            hero: imgHero3,
            heroAlt: "",
            title: "GOPIZZA",
            subtitle: "A whole pizza of joy! Easy to hold with one hand! GOPIZZA is the leading single-serve pizza brand, delivering fast and delicious pizza.<br />Now you can enjoy GOPIZZA's signature menu at your nearest GS25, too.",
            sections: [
                {
                    type: "img_grid",
                    title: "GS25-Exclusive Goven Mini Cooking System",
                    desc: "Baked fresh in-store for an even crispier texture — specialty pizzeria quality right in a convenience store!<br />The ultra-compact, ultra-high-temperature, low-power Goven Mini cooks at high heat in a short time, so you can enjoy freshly baked pizza anytime, anywhere.",
                    images: [
                        { image: imgGoben1, alt: "" },
                        { image: imgGoben2, alt: "" },
                    ],
                },
                {
                    type: "image",
                    title: "Signature Dough",
                    desc: "Crispy on the outside, chewy on the inside, thanks to par-baked dough aged 24 hours at 9°C!<br class=\"p_br\" />GOPIZZA's signature par-baked dough is cold-aged to deliver an ideal volume and ample moisture for a crisp, chewy texture.",
                    image: imgDough,
                    imageAlt: "",
                },
                {
                    type: "menu",
                    title: "Menu Introduction",
                    desc: "From GOPIZZA's bestsellers to the most anticipated new menu items! Enjoy them easily and deliciously at GS25 in REGULAR and GRAB sizes!<br class=\"p_br\" />The REGULAR size is cut into five W-shaped slices so you can enjoy them piece by piece.",
                    panels: [
                        {
                            image: imgMenu1,
                            size: "REGULAR (27cm)",
                            tags: ["Meal-sized", "Equivalent to 4 slices of regular pizza"],
                            columns: [
                                { key: "name",  label: "Menu Name",       align: "left"  },
                                { key: "price", label: "Price (KRW)",      align: "right" },
                                { key: "kcal",  label: "Calories (kcal)", align: "right" },
                            ],
                            rows: [
                                { name: "Potato & Bacon", price: "7,900", kcal: "922",   badge: "BEST" },
                                { name: "Cheddar Pepperoni",   price: "7,900", kcal: "1,017" },
                                { name: "Meat Cheese",        price: "7,900", kcal: "945"   },
                                { name: "Triple Cheese",      price: "8,500", kcal: "1,009" },
                            ],
                        },
                        {
                            image: imgMenu2,
                            size: "GRAB (20cm)",
                            tags: ["Snack-sized", "Equivalent to 2 slices of regular pizza"],
                            columns: [
                                { key: "name",  label: "Menu Name",       align: "left"  },
                                { key: "price", label: "Price (KRW)",      align: "right" },
                                { key: "kcal",  label: "Calories (kcal)", align: "right" },
                            ],
                            rows: [
                                { name: "Potato & Bacon", price: "3,500", kcal: "357",  badge: "BEST" },
                                { name: "Cheddar Pepperoni",   price: "3,500", kcal: "355"  },
                                { name: "Meat Cheese",        price: "3,500", kcal: "341"  },
                                { name: "Triple Cheese",      price: "3,500", kcal: "349"  },
                            ],
                        },
                    ],
                },
                {
                    type: "phone_grid",
                    title: "Fast delivery and pickup<br class=\"m_br\" /> through the Our Neighborhood GS app",
                    items: [
                        { image: imgPhone1, alt: "" },
                        { image: imgPhone2, alt: "" },
                    ],
                },
            ],
            qr: {
                title: "Download the Our Neighborhood GS App",
                desc: "Download the Our Neighborhood GS app to discover GS25's various events and differentiated products.<br />Scan the QR code to go to the app download page.",
            },
            link: {
                title: "Go to GOPIZZA Website",
                desc: "Find nearby stores on the GOPIZZA website and experience reasonable prices and a distinctive taste.<br />Click the button to go to the GOPIZZA website.",
                descMo: "GOPIZZA — reasonable prices and a distinctive taste",
                url: "https://gopizza.kr",
            },
        },
    ],
    sinsen: {
        hero: imgHero4,
        heroAlt: "Fresh Concept Store",
        title: "Fresh Concept Store",
        subtitle: "Fresh Concept Stores are designed for the growing trend of single- and two-person households and small-volume, close-to-home shopping. They are fresh-enhanced convenience stores that enable one-stop shopping 24/7, all year round.<br /><br class=\"m_br\" />As a differentiated concept that combines the convenience of a convenience store with the freshness of a supermarket, they provide fresh products (fruits, vegetables, meat, and seafood) every day.",
        sections: [
            {
                title: "Features of Fresh Concept Stores",
                mobileDesc: "Baked fresh in-store for an even crispier texture — specialty pizzeria quality right in a convenience store!\nThe ultra-compact, ultra-high-temperature, low-power Goven Mini cooks at high heat in a short time, so you can enjoy freshly baked pizza anytime, anywhere.",
                features: [
                    { title: "Fresh Products",   desc: "Cold chain maintained from logistics all the way to the shelf, keeping every product fresh" },
                    { title: "Reasonable Prices", desc: "Reasonable prices through integrated purchasing with GS THE FRESH" },
                    { title: "Small-volume, Small-portion Packaging", desc: "Small-volume, small-portion product lineup<br />suited to 1- and 2–3-person households" },
                    { title: "Exclusive Product Brand", desc: "Operating fresh food specialty brand <br />'Sinseon Teukbyeolsi'" },
                ],
            },
            {
                title: "Why GS25 Fresh Concept Store?",
                desc: "Leveraging joint purchasing power with GS THE FRESH, we carry a broader selection of fresh and grocery items than other convenience stores. <br /><br class=\"m_br\" />We operate the only logistics center in the industry dedicated to fresh products, maintaining freshness through end-to-end quality control from partner suppliers to stores.",
                flow: true,
                flowTitle: "GS25 Fresh Delivery System",
                flowNote: "*In operations that bypass the fresh center, differences may arise in product inspection, logistics cost, and freshness management.",
            },
            {
                title: "Advantages of Operating Fresh Concept Stores",
                advantages: {
                    items: [
                        { text: "A diverse product assortment through exclusive items (approx. 400 SKUs)" },
                        { text: "Exclusive promotions for Fresh Concept Stores (fresh & processed)" },
                        { text: "Dedicated equipment that adds freshness to fresh products" },
                        { text: "Automated fresh-price management using electronic shelf labels" },
                        { text: "Minimized waste through closing-time discount label printers" },
                        { text: "Strengthened promotion through dedicated indoor/outdoor materials" },
                        { text: "Verified effectiveness when converting existing stores to Fresh Concept Stores", note: "“After implementation, average daily sales increased by approximately 12.6%, and average daily customer count rose by 21.”" },
                    ],
                },
            },
        ],
    },
    store: {
        tabs: [
            {
                hero: null,
                heroAlt: "",
                title: "Lifestyle Services",
                subtitle: "",
                sections: [],
                serviceTabs: [
                    {
                        label:   "ATM\nService",
                        hero:    imgHero5,
                        heroAlt: "",
                        title:   "ATM Service",
                        desc:    "In addition to financial services such as cash withdrawal and account transfer, you can also purchase regular-season tickets for pro sports (baseball, soccer, volleyball, basketball) for immediate entry, and Everland day passes.<br />We also offer a variety of everyday convenience services such as Hi-pass recharging (credit card payment) and MVNO mobile sales.",
                        sub_item: {
                            title: "Zero-Fee Cash Withdrawal Service",
                            explain: "Zero withdrawal fees with accounts at Shinhan Bank / KB Kookmin Bank / Woori Bank / Kakaobank / K bank / Toss Bank / SC First Bank / Gwangju Bank / SB Savings Bank / Samsung Securities / NH Investment & Securities!",
                            retail_note: "* Outside bank business hours, fees may apply depending on bank conditions. Savings bank fee exemptions apply to withdrawals only.",
                            bank: [
                                {name:"Shinhan Bank", logo: require("@/assets/images/sub/gsrbr010101/bank_shinhan.png")},
                                {name:"KB Kookmin Bank", logo: require("@/assets/images/sub/gsrbr010101/bank_kookmin.png")},
                                {name:"Woori Bank", logo: require("@/assets/images/sub/gsrbr010101/bank_woori.png")},
                                {name:"kakaobank", logo: require("@/assets/images/sub/gsrbr010101/bank_kakao.png")},
                                {name:"Kbank", logo: require("@/assets/images/sub/gsrbr010101/bank_kbank.png")},
                                {name:"toss bank", logo: require("@/assets/images/sub/gsrbr010101/bank_toss.png")},
                                {name:"Standard Chartered SC First Bank", logo: require("@/assets/images/sub/gsrbr010101/bank_sc.png")},
                                {name:"Gwangju Bank", logo: require("@/assets/images/sub/gsrbr010101/bank_gwangju.png")},
                                {name:"Savings Bank", logo: require("@/assets/images/sub/gsrbr010101/bank_sb.png")},
                                {name:"Samsung Securities", logo: require("@/assets/images/sub/gsrbr010101/bank_samsung.png")},
                                {name:"NH Investment & Securities", logo: require("@/assets/images/sub/gsrbr010101/bank_nh.png")}
                            ]
                        }
                    },
                    {
                        label:   "Convenience Store Cash\nPurchase/Recharge",
                        hero:    null,
                        heroAlt: "",
                        title:   "Convenience Store Cash Purchase/Recharge Service",
                        desc:    "Convenience Store Cash is a service that lets you purchase and recharge online content, shopping malls, game cash, and international calling cards at convenience stores.",
                        table: {
                            rows: [
                                { head: "Games · Gift Cards · Telecom", text: "Various services such as MVNO mobile, international calls, and mobile data can be purchased and recharged in real time at convenience stores. In addition to receipt-type PIN purchases and international calling card recharges, real-time balance recharges are also available via smartphone apps." },
                                { head: "Game Cash",         text: "N Coin (NCsoft), Nexon, World of Warcraft, League of Legends, TeenCash, Hangame, Funny Card, Hanbitsoft, and more" },
                                { head: "Gift Cards",           text: "Culture Gift Card, Smart Culture Gift Card, Happy Money Gift Card, Book Culture Gift Card, and more" },
                                { head: "Smartphone App Recharge", text: "Nexon Play, Culture Land" },
                                { head: "MVNO",           text: "EG CARD, 7mobile, Eyes, Mobing, M Mobile, free C/T, Iyagi Mobile, and more" },
                                { head: "International Calling Card",     text: "LG U+, Naray, SK broadband" },
                                { head: "Telecom (Data) / Other", text: "Olleh WiFi, T Data Coupon, KT LTE Data Coupon, Daum Cash" },
                            ],
                        },
                    },
                    {
                        label:    "Transit Card\nRecharge",
                        hero:     null,
                        heroAlt:  "",
                        title:    "",
                        desc:     "",
                        lnbItems: ["What is POP Card?", "Transit Usage Guide", "Retail Usage Guide"],
                        trafficSelectOptions: [
                            { value: "subway",  label: "Subway" },
                            { value: "bus",     label: "Bus" },
                            { value: "express", label: "Express Bus" },
                            { value: "inter",   label: "Intercity Bus" },
                        ],
                        trafficOptions: {
                            express: {
                                title: "Express Bus",
                                bullets: ["Kumho Express", "Dongbu Express", "Dongyang Express", "Songnisan Express", "Jungang Express Co., Ltd.", "Samhwa Express", "Cheonil Express", "Hanil Express"],
                                logos: [imgBus1, imgBus2, imgBus3, imgBus4, imgBus5, imgBus6, imgBus7, imgBus8],
                            },
                            subway: { title: "Subway", bullets: ["Seoul Capital Area (Lines 1–9, Suin Line, Gyeongchun Line, Gyeongui Line, Jungang Line, Uijeongbu Line, Bundang Line, Sinbundang Line, Airport Line, Incheon Line)", "Daejeon (Line 1)", "Daegu (Lines 1–2)", "Busan (Lines 1–4, Busan–Gimhae Light Rail Transit)"] },
                            bus:    { title: "Bus",   bullets: ["Seoul Capital Area","Daejeon Metropolitan City, Sejong City", "Chungcheongnam-do, Chungcheongbuk-do (Chungju, Yeongdong, Cheongju, Okcheon, Danyang, Jecheon, Jincheon, Cheongwon, Goesan, Boeun, Eumseong", "Gangwon-do (Wonju, Hoengseong, Chuncheon, Gangneung)", "Busan Metropolitan City, Daegu Metropolitan City, Ulsan Metropolitan City","Gyeongsangnam-do (Changwon, Tongyeong, Geoje, Miryang, Yangsan, Haman, Sacheon, Masan, Jinhae, Jinju)","Gyeongsangbuk-do (Pohang, Gumi, Gyeongju, Andong, Sangju, Mungyeong, Yeongju, Gimcheon, Gyeongsan, Yecheon)", "Jeollanam-do (Mokpo, Yeosu, Gwangyang, Suncheon, Hwasun, Naju, Jangseong, Hampyeong, Damyang, Boseong, Yeongam, Haenam)","Jeollabuk-do (Gunsan, Jeonju, Iksan, Gunsan, Gimje, Namwon, Gochang, Jeongeup, Jinan, Imsil, Buan)","Jeju"] },
                            inter:  { title: "Intercity Bus", bullets: ["Seoul Capital Area (excluding Seoul airport buses)","Chungcheongnam-do","Gangwon-do (excluding Wonju)"] },
                        },
                        retailSelectOptions: [
                            { value: "convenience",   label: "Convenience Stores" },
                            { value: "mart",          label: "Hypermarkets / Retailers" },
                            { value: "bakery",        label: "Bakery" },
                            { value: "coffee",        label: "Coffee / Ice Cream" },
                            { value: "fastfood",      label: "Fast Food" },
                            { value: "restaurant",    label: "Dining" },
                            { value: "cosmetics",     label: "Cosmetics" },
                            { value: "entertainment", label: "Entertainment" },
                            { value: "pcroom",        label: "PC Cafés" },
                            { value: "university",    label: "Universities" },
                            { value: "public",        label: "Public Facilities" },
                            { value: "tourism",       label: "Tourism" },
                            { value: "parking",       label: "Parking Lots" },
                            { value: "kiosk",         label: "Self-Service Kiosks" },
                            { value: "etc",           label: "Other" },
                        ],
                        retailOptions: {
                            convenience:   { title: "Convenience Stores", items: [
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_01.gif")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_02.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_03.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_04.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_05.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_06.png")},
                                { brand: "GS25", logo: require("@/assets/images/sub/gsrbr010101/logo_convenience_07.jpg")},
                            ]},//ph(7) },
                            mart:          { title: "Hypermarkets / Retailers",  note:"Service to be introduced at select Mart and Express stores in the future", items: ph(4) },
                            bakery:        { title: "Bakery", note:"Excludes some stores located in marts, department stores, rest areas, etc.", items: ph(3) },
                            coffee:        { title: "Coffee / Ice Cream",  note: "Excludes some stores located in marts, department stores, rest areas, etc.", items: [
                                { brand: "Starbucks",   logo: imgBrandUsage1 },
                                { brand: "Pascucci",   logo: imgBrandUsage2 },
                                { brand: "Baskin Robbins",       logo: imgBrandUsage3 },
                                { brand: "Jamba Juice",   logo: imgBrandUsage4 },
                                { brand: "Angel-in-us", logo: imgBrandUsage5 },
                                { brand: "Caffé Tiamo", logo: imgBrandUsage6 },
                                { brand: "Java City",   logo: imgBrandUsage7 },
                                { brand: "Coffee Bay",   logo: imgBrandUsage8 },
                                { brand: "Yogerpresso", logo: imgBrandUsage9 },
                            ]},
                            fastfood:      { title: "Fast Food", note:"Excludes some stores located in marts, department stores, rest areas, etc.", items: ph(3) },
                            restaurant:    { title: "Dining", note:"Excludes some stores located in marts, department stores, rest areas, etc.", items: ph(3) },
                            cosmetics:     { title: "Cosmetics", note:"Excludes some stores located in marts, department stores, rest areas, etc.", items: ph(6) },
                            entertainment: { title: "Entertainment", note:"LOTTE CINEMA (Piccadilly), MEGABOX (Ansan), SK Wyverns (annual membership)", items: ph(3) },
                            pcroom:        { title: "PC Cafés",       bullets: ["T-money PC Cafés"], footnote: "Children's cards are restricted" },
                            university: {
                                title: "Universities",
                                bullets: [
                                    { dt: "Campus Dining Halls", dd: "Chungnam National University" },
                                    { dt: "Campus Stores", dd: "Dongguk University, Baekseok University, Jeongui Girls' Middle/High School, Konkuk University Affiliated High School, Dongduk Women's University" },
                                    { dt: "Office Equipment", dd: "Dongguk University, Seoul National University of Science and Technology, Hanyang University, Ewha Womans University, Incheon National University" },
                                    { dt: "Shuttle Buses", dd: "Ajou University, Sungkyunkwan University" },
                                    { dt: "Other", dd: "Vending machines (Chung-Ang University, Konyang University, Ajou University, Myongji University, etc.), automated lockers (Yonsei University, Kyonggi University, Myongji University, etc.)" },
                                ],
                            },
                            public:       { title: "Public Facilities", bullets: [
                                "Cycle Racing / Motorboat Racing (Korea Sports Promotion Foundation)",
                                "Horse Racing Tracks (Korea Racing Authority)",
                                "Seocho-gu Office Avantsay Hall meal payment",  
                                "Seoul City Hall Dasan Plaza civil document fees",
                                "Seoul ward office civil service payments (all)",
                                "19 Jongno-gu community centers (Gahoe-dong, Samcheong-dong, etc.)",
                                "Central Post Office (cafeteria payments)",
                                "Daejeon City public bicycle 'Tashu' payment",
                                "Gwacheon Science Museum dining, shop, café payments",
                                "Pohang City Tax Office civil payments (city hall, ward offices, town/township/neighborhood offices, 32 locations)",
                                "Food waste fee system: Gunpo, Uijeongbu, Incheon Nam-gu, Incheon Seo-gu, Wonju, Pohang, Jeju, Seogwipo, Songpa-gu, Sunchang-gun",
                            ] },
                            tourism:       { title: "Tourism",        bullets: ["Hangang River Water Taxi","City Tour Bus (5% fare discount when paying with T-money card)"] },
                            parking:       { title: "Parking Lots", bullets: [
                                "Seoul Metropolitan Public Parking Lots",
                                "9 off-street parking lots operated by the Gangnam Facilities Management Corporation, Seoul: Tancheon, Gangnam-gu Office, Gangnam Education Center, Eonbuk Elementary School, Poi Elementary School, Gaepo Public, Yeoksam 1-ro, Yeoksam 10, Daechi 3-dong Cultural Center",
                                "Seoul Facilities Management Corporation transfer parking lots (transfer discount available when paying with T-money after taking the subway): Jamsil Station, Changdong Station, Guro Digital Complex Station, Gaehwasan Station, Suseo Station, Dobongsan Station, Bonghwasan Station, Suraksan Station, Hangangjin Station, Hwarangdae Station, World Cup Stadium Parking",
                                "Seoul Sports Facilities Management Office parking (Jamsil Sports Complex)",
                                "Dream Forest of Northern Seoul, Incheon International Airport",
                                "Suwon Facilities Management Corporation parking lots: City Hall Ground Lot 1, City Hall Ground Lot 2, Seonkyeong, Yeongtong-gu Office, Yeongtong Public, Gwonseon Public, Ingye Public, Yuljeon Public, Terminal Public, Daehwanggyo Cargo, Hwaseo Transfer, Seongdae Transfer, Kkotmoe Transfer, Seryu Station Transfer, Gwanggyo Public, Manseok Park, Baekseol Public, Yeonghwa-dong, Seryu 2-dong, Ingye-dong, Maegyo-dong, Tap-dong, Gokbanjeong-dong Lots 1 & 2",
                                "Seongnam Facilities Management Corporation parking lots: Geumgok-dong, Seohyeon-dong, Jeongja Transfer, Ori Transfer, Yatap Lot 1, Jungbu Elementary School, Haeoreum, Daewoncheon, Dandae Park, Bokjeong-dong, Sinheung, Taepyeong, Araesutgol, and 44 more locations",
                                "Paju Facilities Management Corporation parking lots: Geumchon 2 Public, Geumchon 2-8 Public, Geumchon 3 Public",
                                "KTX railway station parking (Gwangmyeong Station, Cheonan/Asan Station, etc.)",
                                "Hi-Parking lots: Chuncheon Underground, Daegu Duryu 1-beonga Underground, Sujin Station Transfer, Jukjeon iOnePlaza",
                                "Other: World Cup Stadium, Mok-dong on-street, Eungbong-dong (building), Samseong-dong Oakwood, Kangbuk Samsung Hospital, SH Corporation parking, Nurikum Square parking, Seoul Forest parking, Seoul Trade Exhibition Center parking, Dongwon Industries building underground parking, Incheon Business and Trade Promotion Agency parking, GS Park24 Co. Seoul Design High School parking",
                                "Self-Service Kiosks",
                            ] },
                            kiosk:         { title: "Self-Service Kiosks",    bullets: ["KTL Public Phones","Subway parcel lockers, beverage/snack vending machines, book vending machines, photo booths","Self-service postal kiosks: Seoul, Gyeongin, Chungcheong, Gyeongbuk, and Busan Regional Postal Service"] },
                            etc:           { title: "Other",        bullets: ["Highway rest stops: Jinyeong Rest Area, Yeongcheon Rest Area", "Gag Story Mart (selected locations)","Color Pencil Stationery Store (selected locations)", "Movie Town Video Rental (selected locations)"] },
                        },
                        pageTitle: "Transit Card Recharge Service (POP T-money, Mybi, Cashbee (EZL), Hanpay)",
                        pageDesc:  "GS25 offers transit card recharge services for customers using public transportation.<br />Customers can also use the cards to purchase products at GS25, providing payment convenience. (Excludes some products such as lottery tickets, Lotto, Toto, and parcel services.)",
                        popTitle:   "What is POP Card?",
                        popDesc:    "Now, go POP! <br />Link your POP card with various payment methods to enjoy greater rewards, smarter spending, and more convenient use through POP Card's distinctive services.",
                        popExclude: "POP card-exempt stores: D-mall Branch, Youngpoong Jongno Branch, Bucheon Save Zone Branch, Dongdaemun Hyundai City Outlet Branch, Seomyeon NC Branch, Hyundai City Mall Garden Five Branch, Moran NC Branch, Daegu E-World Branch, Dong-A Shopping NC Branch, Icheon NC Branch, Dongsuwon NC Branch, Yatap NC Branch",
                        chargingTitle: "Transit Card Recharge Service",
                        chargingItems: [
                            { name: "T-money",     img: imgTransService1 },
                            { name: "Cashbee (EZL)", img: imgTransService2 },
                            { name: "Hanpay",      img: imgTransService3 },
                            { name: "iM U-pay",   img: imgTransService4 },
                        ],
                        chargingNote: {
                            label: "Recharge and Payment Available Areas",
                            text:  "T-money / Cashbee (EZL): All GS25 stores / Hanpay: Jeolla-do, Gwangju Metropolitan City / iM U-pay: Gyeongsangbuk-do, Daegu Metropolitan City",
                        },
                        popCards: [
                            {
                                img:   imgPopCard1,
                                imgMo: imgPopCard1Mo,
                                name:  "POP T-money",
                                desc:  "Enjoy multi-membership benefits manageable with a single card!\nPOP T-money is a distinctive service that lets you use both\nT-money and POP Card functions at the same time.",
                                logos: [
                                    { src: imgPoint1, w: 28, h: 36 },
                                    { src: imgPoint2, w: 44, h: 24 },
                                    { src: imgPoint3, w: 29, h: 36 },
                                    { src: imgPoint4, w: 32, h: 32 },
                                ],
                            },
                            {
                                img:      imgPopCard2,
                                imgMo:    imgPopCard2Mo,
                                name:     "Membership POP Card",
                                desc:     "Membership POP Card combines GS ALL Points with POP Card functions, automatically earning points when you pay at GS25 or GS THE FRESH, and is usable at over 600 online shopping and gaming sites — a prepaid card packed with benefits.",
                                note:     "*No transit function",
                                noteWarn: true,
                                logos:    [{ src: imgPoint2, w: 44, h: 24 }],
                            },
                            {
                                img:   imgPopCard3,
                                imgMo: imgPopCard3Mo,
                                name:  "POP Credit/Debit Card",
                                desc:  "POP Credit/Debit Cards add the benefits and functions of\nPOP Card to your everyday spending.",
                                logos: [],
                            },
                        ],
                    },
                    {
                        label:          "Gift\nCard",
                        hero:           imgHero6,
                        heroAlt:        "",
                        title:          "Gift Card",
                        desc:           "GS25 operates gift cards that can be recharged and used anywhere in Korea.<br />Choose from a variety of gift cards to give to friends, family, or acquaintances. (Recharging and use may be limited at some stores.)",
                        brandTitle: "POSA Gift Card Featured Brands",
                        brands: [
                            { img: imgGiftCard1, name: "Google Play" },
                            { img: imgGiftCard2, name: "KT Wi-Fi" },
                            { img: imgGiftCard3, name: "TeenCash" },
                            { img: imgGiftCard4, name: "Egg Money" },
                            { img: imgGiftCard5, name: "T-Data Coupon" },
                            { img: imgGiftCard6, name: "HappyMoney" },
                            { img: imgGiftCard1, name: "Culture Gift Card" },
                            { img: imgGiftCard2, name: "Smart Culture Gift Card" },
                            { img: imgGiftCard3, name: "Book Culture Gift Card" },
                            { img: imgGiftCard4, name: "Nexon Cash" },
                            { img: imgGiftCard5, name: "NCSoft" },
                            { img: imgGiftCard6, name: "Hangame" },
                            { img: imgGiftCard1, name: "Culture Land" },
                            { img: imgGiftCard2, name: "Funny Card" },
                            { img: imgGiftCard3, name: "Burger King" },
                            { img: imgGiftCard4, name: "CGV" },
                            { img: imgGiftCard5, name: "Starbucks" },
                            { img: imgGiftCard6, name: "Olleh WiFi" },
                        ],
                        purchaseTitle: "How to Purchase a POSA Gift Card",
                        purchaseNote:  "Usage varies by gift card, so refer to the instructions on the back of the card and its carrier. For details, contact the customer service number printed on the card.",
                        purchaseImg:   imgGiftPurchase,
                        purchaseSteps: [
                            { num: "01", title: "Visit a store",    desc: "Visit your nearest GS25 convenience store." },
                            { num: "02", title: "Select a gift card", desc: "Choose the gift card of your preferred brand." },
                            { num: "03", title: "View Usage Guide",   desc: "Please check the usage instructions on the back of the purchased card<br class=\"m_br\" />before use." },
                            { num: "04", title: "Checkout",           desc: "Once you complete checkout, the card is activated and ready to use." },
                        ],
                        usageTitle:   "How to Use a POSA Gift Card",
                        usageDesc:
                            '<span class="gift_usage_desc_emphasis">Usage varies by gift card, so refer to the instructions on the back of the card and its carrier</span>, and for details, contact the customer service number printed on the card.',
                        onlineLabel:  "Online Usage",
                        onlineSteps: [
                            { step: "Step 1", title: "Visit the Website and Log In" },
                            { step: "Step 2", title: "Cash Recharge" },
                            { step: "Step 3", title: "Select Payment Method" },
                            { step: "Step 4", title: "Enter PIN" },
                        ],
                        offlineLabel: "Offline Usage",
                        offlineSteps: [
                            { step: "Step 1", title: "Visit Store" },
                            { step: "Step 2", title: "Select Product" },
                            { step: "Step 3", title: "Present Gift Card" },
                            { step: "Step 4", title: "Payment Complete" },
                        ],
                        advantageTitle: "Advantages of POSA Gift Cards",
                        advantages: [
                            {
                                num:   "01",
                                title: "Slim enough to fit in your wallet\nalongside your credit cards!",
                                desc:  "Small enough to carry in your wallet like a credit card, and usable only at payment, which reduces store handling burden.",
                            },
                            {
                                num:   "02",
                                title: "Available with various brands\nonline and offline",
                                desc:  "With a wide range of online and offline brands across dining, games, leisure, movies, coffee, and books, you can match the gift to the recipient's preferences for maximum satisfaction.",
                            },
                            {
                                num:   "03",
                                title: "Premium-designed gift cards\nfor those who value quality",
                                desc:  "Unlike cash or traditional gift cards, the elegant design elevates the value and class of your gift.",
                            },
                            {
                                num:   "04",
                                title: "Convenient purchase\nanywhere in Korea, anytime",
                                desc:  "As distribution expands to large supermarkets, major bookstores, convenience stores, and well-known franchises nationwide, customers can easily purchase cards wherever they are.",
                            },
                        ],
                    },
                    {
                        label:          "USIM\nPlans",
                        hero:           null,
                        heroAlt:        "",
                        title:          "USIM Plans",
                        desc:           "An innovative low-cost mobile plan from U+ Alttle Mobile and GS25, with USIM chips available at GS25 stores and the GS25 online site.",
                        advantageTitle: "GS25 Plan Advantages",
                        advantages: [
                            { num: "01", title: "Plans that are easy to sign up for", desc: "Plans available at your nearest GS25 — easy sign-up via the dedicated site" },
                            { num: "02", title: "Lowest prices in Korea",          desc: "Korea's lowest-priced plan with unlimited data!" },
                            { num: "03", title: "No contract requirements / Zero cancellation fees",    desc: "Keep your number and phone, with no contract requirements or cancellation fees!" },
                        ],
                        phoneTitle: "Eligible Phones",
                        phones: [
                            { term: "LG U+ Phones",    desc: "All LTE phones originally activated on LG U+" },
                            { term: "SKT/KT Phones",  desc: "LTE phones released after August 2014 (Galaxy Note 4, AKA, and later)" },
                            { term: "Foreign-made Phones",      desc: "iPhone 6 or later, and other models supporting frequencies 850 MHz (Band 5), 2100 MHz (Band 1), and 2600 MHz (Band 7). LTE band support can be confirmed with the device manufacturer." },
                        ],
                        purchaseTitle: "How to Purchase and Use a USIM at GS25",
                        purchaseSteps: [
                            { step: "Step 1", title: "Purchase USIM cards\nat GS25 convenience stores" },
                            { step: "Step 2", title: "Purchase USIM cards\nat GS25 convenience stores" },
                            { step: "Step 3", title: "Register the USIM serial number and apply for activation\n(or apply by phone)" },
                            { step: "Step 4", title: "Once the Happy Call/activation is complete,\nsimply insert the USIM into your phone — and you're done!" },
                        ],
                        benefitTitle: "GS25 Plan Benefits",
                        benefitCards: [
                            {
                                img:   imgRateBenefit1,
                                imgAlt: "",
                                title: "Get smart, valuable savings on your phone bill!",
                                desc:  "Plans you can sign up for easily on a dedicated site, with purchase available at your nearest GS25",
                                items: ["No sign-up fee", "Maximum discount on phone bills", "No contract, no cancellation fees"],
                            },
                            {
                                img:   imgRateBenefit2,
                                imgAlt: "",
                                title: "Four additional services included free",
                                desc:  "Plans you can sign up for easily on a dedicated site, with purchase available at your nearest GS25",
                                items: ["Internet via U+ Zone Wi-Fi", "U+ Box: Move your files to the cloud", "MannerCall: Receive missed-call info via SMS", "mVOIP: Free voice calls"],
                            },
                        ],
                        introTitle: "GS25 Plan Overview",
                        planTable: {
                            productName: "Product Name",
                            provision: "Serving Size",
                            data: "Data",
                            voice: "Voice",
                            sms: "Text",
                            normalPrice: "Regular Price",
                            promoDiscount: "Promotion Discount",
                            monthlyFee: "Monthly base fee<br />(with partner card)",
                            competitor: "Comparable Plans <br />from Other Carriers",
                        },
                        plans: [
                            {
                                name:         "GS25 (15GB+ / 100 min)",
                                data:         "15GB\n<span class=\"usim_plan_data_sub\">(Continued use at 3 Mbps after data depletion)</span>",
                                voice:        "100 min",
                                sms:          "100 messages",
                                normalPrice:  "KRW 47,300",
                                discount:     "KRW 19,800",
                                monthly:      "KRW 27,500",
                                monthlyDc:    "KRW 12,500",
                                competitor:   "KRW 65,890",
                            },
                            {
                                name:         "GS25 (10GB / 100 min)",
                                data:         "10GB",
                                voice:        "100 min",
                                sms:          "100 messages",
                                normalPrice:  "KRW 41,800",
                                discount:     "KRW 20,900",
                                monthly:      "KRW 20,900",
                                monthlyDc:    "KRW 5,900",
                                competitor:   "KRW 45,650",
                            },
                            {
                                name:         "GS25 (6GB / 100 min)",
                                data:         "6GB",
                                voice:        "100 min",
                                sms:          "100 messages",
                                normalPrice:  "KRW 30,000",
                                discount:     "KRW 12,500",
                                monthly:      "KRW 17,500",
                                monthlyDc:    "KRW 2,500",
                                competitor:   "KRW 45,250",
                            },
                            {
                                name:         "GS25 (3GB / 150 min)",
                                data:         "3GB",
                                voice:        "100 min",
                                sms:          "100 messages",
                                normalPrice:  "KRW 20,900",
                                discount:     "KRW 12,100",
                                monthly:      "KRW 12,100",
                                monthlyDc:    "KRW 0",
                                competitor:   "KRW 41,800",
                            },
                        ],
                    },
                    {
                        label:          "Hi-pass\nCard/Device",
                        hero:           null,
                        heroAlt:        "",
                        title:          "Hi-Pass Service",
                        desc:           "Purchase and recharge Hi-Pass cards 24/7 at GS25.",
                        hipassStepTitle:    "Hi-Pass Card Purchase<br class=\"m_br\" />(self-recharging card)",
                        hipassSteps: [
                            {
                                step:    "Step 1",
                                title:   "Purchase a self-recharging Hi-Pass card",
                                bullets: [
                                    "Purchase a Hi-Pass card at your nearest GS25",
                                    "Card purchase fee: KRW 5,000",
                                ],
                            },
                            {
                                step:    "Step 2",
                                title:   "Card and payment registration",
                                bullets: [
                                    "Register the card number and payment information on the website<br />(bank account or credit card)",
                                    "<span style=\"color: #fb6432\">Available for use 24 hours after card registration</span>",
                                ],
                            },
                            {
                                step:    "Step 3",
                                title:   "Use the Hi-Pass card",
                                bullets: [
                                    "Insert into a Hi-pass device for use",
                                    "Automatically recharged through the registered payment method",
                                ],
                            },
                            
                        ],
                        hipassChargeTitle: "Hi-pass Card Recharge",
                        hipassChargeDesc: "All cards issued by Hi Plus Card can be recharged ('Korea Expressway Corporation' and 'EX' branded cards cannot be recharged).",
                        hipassTerminalTitle: "Hi-Pass Terminal Sales",
                        hipassTerminalDesc: "We sell the 'GPASS' terminal, certified by Korea Expressway Corporation and ranked No. 1 in Korea Quality Satisfaction Index for two consecutive years.",
                        hipassTerminalImg:    imgHipassTerminal,
                        hipassTerminalImgAlt: "Hi-pass device (GPASS) image",
                    },
                    {
                        label:   "Pay unpaid\nhighway tolls",
                        hero:    null,
                        heroAlt: "",
                        title:   "Unpaid Highway Toll Lookup\n/ Payment Service",
                        desc:    "Korea's first convenience store service for real-time lookup and payment of unpaid highway tolls.",
                        serviceTitle: "Service Advantages",
                        serviceAdvantages: [
                            {
                                num:   "01",
                                title: "Pay conveniently at any GS25 in Korea\nusing only your vehicle number",
                                desc:  "Service start date: August 23, 2019",
                            },
                            {
                                num:   "02",
                                title: "Pay unpaid tolls\nin real time",
                                desc:  "*Service for corporate vehicles to be launched later",
                            },
                            {
                                num:   "03",
                                title: "Payable by cash\nor credit card",
                                desc:  "Pay by cash or credit card as you prefer",
                            },
                        ],
                        unpaidTitle: "How to Pay Unpaid Highway Tolls",
                        unpaidSteps: [
                            { step: "Step 1", title: "Request payment<br />at a GS25 convenience store",
                                bullets: [
                                    "Purchase a Hi-Pass card at your nearest GS25",
                                    "Card purchase fee: KRW 5,000",
                                ],
                             },
                            { step: "Step 2", title: "Enter vehicle number" },
                            { step: "Step 3", title: "Consent to personal information use" },
                            { step: "Step 4", title: "Enter date of birth" },
                            { step: "Step 5", title: "Payment (cash/credit card)" },
                        ],
                    },
                    {
                        label:   "Online Mall\nConvenience Store Payment",
                        hero:    null,
                        heroAlt: "",
                        title:   "Online Mall Convenience Store Payment",
                        desc:    "When making a purchase at an online mall (shopping, games, airlines, etc.), select 'Convenience Store Payment,' receive the payment code or barcode via text message, and pay in cash at GS25.",
                        serviceTitle: "Advantages of Convenience Store Payment",
                        serviceAdvantages: [
                            {
                                num:   "01",
                                title: "Wide availability",
                                desc:  "Pay 24/7 at nearby convenience stores, which outnumber bank branches<br /><span class=\"txt_point\">Available at all GS25 stores nationwide</span><br />(real-time payment confirmation, in-person transactions)",
                            },
                            {
                                num:   "02",
                                title: "Economical",
                                desc:  "No additional customer fees<br />No banking fees for transfers or non-account deposits",
                            },
                            {
                                num:   "03",
                                title: "Convenient",
                                desc:  "No need to visit a bank or have a credit card — complete your online purchase and pay at a convenience store<br /><span class=\"txt_point\">Receive change immediately at the store</span>",
                            },
                            {
                                num:   "04",
                                title: "Safe",
                                desc:  "No complex digital certificates or security cards required, and payment information is protected<br />In-person transactions help prevent electronic financial fraud (smishing).",
                            },
                        ],
                        mallPaymentTitle: "How to Use Convenience Store Payment",
                        mallPaymentSteps: [
                            { step: "Step 1", title: "Purchase the product/service<br />at an online mall",
                                bullets: [
                                    "Purchase a Hi-Pass card at your nearest GS25",
                                    "Card purchase fee: KRW 5,000",
                                ],
                             },
                            { step: "Step 2", title: "Purchase the product/service<br />at an online mall" },
                            { step: "Step 3", title: "Pay 24 hours a day<br />at your nearest GS25" },
                            { step: "Step 4", title: "Product delivery to your home<br />(or cash recharge)" },
                        ],
                        mallSiteTitle: "Available online and mobile sites",
                        mallSiteNote:  "* To be continually expanded",
                        mallSiteItems: [
                            { name: "11st",                  img: imgServiceDesc01 },
                            { name: "StyleShare",              img: imgServiceDesc02 },
                            { name: "NCSoft",                img: imgServiceDesc03 },
                            { name: "PowerCall Air & Shopping",        img: imgServiceDesc04 },
                            { name: "T'way Air",              img: imgServiceDesc05 },
                            { name: "Unicoms\n(LG U+ specialized telecom)", img: imgServiceDesc06 },
                        ],
                    },
                ],
            },
            {
                hero:     null,
                heroAlt:  "",
                title:    "Parcel & Pickup",
                subtitle: "",
                sections: [],
                serviceTabs: [
                    {
                        label:   "Domestic Parcel Delivery",
                        hero:  imgHero7,
                        heroAlt: "",
                        title:   "Domestic Delivery Service",
                        desc:    "Drop off parcels at your nearest GS25 24 hours a day, 365 days a year.",
                        notes: [
                            {
                                text: "Reasonable shipping rates based on weight measurement.<br class=\"m_br\" />(starting from KRW 3,400)",
                                sub:  "*Updated as of April 1, 2025",
                            },
                            {
                                text: "SMS notifications are provided at every delivery stage, from drop-off to completion.",
                            },
                            {
                                text: "GS Postbox members can participate in various events and receive tiered benefits based on usage.",
                            },
                        ],
                        stepTitle: "How to Use Domestic Parcel",
                        steps: [
                            { step: "Step 1", title: "Reserve parcel drop-off via the website/mobile app" },
                            { step: "Step 2", title: "Reserve parcel drop-off via the website/mobile app" },
                            { step: "Step 3", title: "Drop off at the self-service parcel kiosk<br />(weight measurement)" },
                            { step: "Step 4", title: "Pay at the counter and store in the parcel locker" },
                        ],
                        cautionTitle: "Domestic Parcel Notes",
                        cautionItems: [
                            {
                                // icon: imgCautionSize,
                                icon:    null,
                                iconAlt: "Size icon",
                                title:   "Size",
                                desc:    "Sum of length, width, and height within 160 cm<br />Each side under 1 m",
                            },
                            {
                                // icon: imgCautionWeight,
                                icon:    null,
                                iconAlt: "Weight icon",
                                title:   "Weight",
                                desc:    "Under 20kg",
                            },
                            {
                                // icon: imgCautionPrice,
                                icon:    null,
                                iconAlt: "Declared value icon",
                                title:   "Declared Value",
                                desc:    "Up to KRW 500,000",
                            },
                        ],
                        priceTitle: "Domestic Parcel Fees",
                        priceItems: [
                            {
                                text: "Starting from KRW 3,400, with fees based on weight and distance",
                                subs: [
                                    "Varies by same-zone / different-zone / Jeju-zone",
                                    "Letters and documents are priced in accordance with postal regulations.",
                                ],
                            },
                            { text: "An additional KRW 300 fee applies for cash-on-delivery shipments" },
                            { text: "An additional KRW 4,000 fee applies for delivery to remote island areas." },
                            { text: "An additional KRW 2,500 fee applies for high-value shipments (over KRW 500,000)." },
                        ],
                        periodTitle: "Domestic Parcel Service Hours",
                        periodItems: [
                            { text: "Next-day delivery for drop-offs by 5:00 PM on weekdays (3:00 PM in some city/county/district and Gyeonggi areas) and noon on Saturdays." },
                            { text: "On Sundays and holidays, only drop-off is accepted" },
                            { text: "Cut-off times may vary by store" },
                        ],
                    },
                    {
                        label: "Half-price Parcel",
                        hero: imgHero8,
                        heroAlt: "",
                        title: "Half-Price Parcel Service",
                        desc: "An industry first! Holiday delivery available exclusively in Korea! Send and receive parcels at the lowest rates at GS25.",
                        notes: [
                            {
                                text: "An industry first! Drop off and pick up at convenience stores.",
                            },
                            {
                                text: "Pricing is based on weight, regardless of distance.",
                            },
                            {
                                text: "SMS notifications are provided at every delivery stage, from drop-off to completion.",
                            },
                        ],
                        stepTitle: "How to Use Half-price Parcel",
                        steps: [
                            { step: "Step 1", title: "Reserve parcel drop-off via the website/mobile app", bullets: ["Select and enter the pickup store"] },
                            { step: "Step 2", title: "Package the item<br />and visit GS25" },
                            { step: "Step 3", title: "Drop off at the self-service parcel kiosk<br />(weight measurement)" }, 
                            { step: "Step 4", title: "Pay at the counter<br/>and hand the item to the staff" },
                        ],
                        priceTable: {
                            title: "Half-Price Delivery Rates",
                            desc:  "Shipping is payable in advance only.",
                            note:  "To be continually expanded",
                            columns: [
                                { label: "Category" },
                                { label: "Mainland↔Mainland / Jeju↔Jeju", labelMo: "Mainland↔Mainland<br />Jeju↔Jeju" },
                                { label: "Jeju↔Mainland / Mainland↔Islands", labelMo: "Jeju↔Mainland<br />Mainland↔Islands" },
                            ],
                            colWidths: ["18.87%", "40.56%", "40.56%"],
                            rows: [
                                {
                                    cells: [
                                        "Fees",
                                        "Up to 500g: KRW 1,900<br />Up to 1kg: KRW 2,300<br />Up to 5kg: KRW 2,700",
                                        "Up to 500g: KRW 3,600<br />Up to 1kg: KRW 4,000<br />Up to 5kg: KRW 4,400",
                                    ],
                                },
                            ],
                        },
                        infoTable: {
                            title: "Half-Price Parcel Usage Guide",
                            colWidths: ["136px", "auto"],
                            rows: [
                                { head: "How to Book",    text: "When booking Half-Price Parcel, choose a GS25 as the destination." },
                                { head: "Service Areas", text: "GS25 ↔ GS25" },
                                { head: "Pickup Method",    text: "Show the QR code from the notification message to store staff." },
                                { head: "Delivery Time",
                                    items: [
                                        "Mainland↔Mainland, Jeju↔Jeju: within 4 days of drop-off; same region within 2–3 days",
                                        "Jeju↔Mainland: within 5–7 days of drop-off",
                                    ],
                                    note: [
                                        "*Weekend/holiday delivery available",
                                        "*Mainland↔Jeju Half-Price Parcel deliveries are completed within 7 days of drop-off.",
                                        "*Delivery may take longer if vessel operations are disrupted by weather or shipping schedule changes.",
                                    ],
                                },
                            ],
                        },
                        cautionTitle: "Half-Price Parcel Notes",
                        cautionItems: [
                            { icon: null, iconAlt: "Cut-off time icon",   title: "Cut-off Time",          desc: "Same-day pickup cut-off at 09:00 AM" },
                            { icon: null, iconAlt: "Specification icon",       title: "Pickup unavailable if specifications are exceeded", desc: "Sum of three sides within 80 cm" },
                            { icon: null, iconAlt: "Weight icon",       title: "Weight",              desc: "Under 5 kg" },
                            { icon: null, iconAlt: "Declared value icon",   title: "Declared Value",          desc: "Up to KRW 500,000" },
                        ],
                    },
                    {
                        label: "International Parcel Delivery",
                        hero:    imgHero9,
                        heroAlt: "",
                        title: "International Parcel Service",
                        desc: "International parcels can be dropped off at your nearest GS25 24 hours a day, 365 days a year. (SF Express, EMS, DHL)",
                        notes: [
                            {
                                text: "International parcel bookings and drop-offs are available 24 hours a day at GS25 stores.",
                            },
                            {
                                text: "When booking, select a courier (SF Express, EMS, DHL) to drop off.",
                            },
                            {
                                text: "SMS notifications are provided at every delivery stage, from drop-off to completion.",
                            },
                        ],
                        noticeTitle:"How to Use International Parcel",
                        noticeItems: [
                            { step: "Step 1", title: "Reserve parcel drop-off via the website/mobile app", bullets: ["Membership required, English-only entry"] },
                            { step: "Step 2", title: "Package the item<br />and visit GS25", },
                            { step: "Step 3", title: "Drop off at the self-service parcel kiosk<br />(weight measurement)"},
                            { step: "Step 4", title: "Pay at the counter and store in the parcel locker"},
                        ],
                        chargeTitle: "International Parcel Fees and Destination Countries",
                        chargeItems: [
                            { text: "Rates and destination countries vary by courier; check rates when booking via the website/mobile app." },
                            { text: "Shipping is payable in advance only." },
                            { text: "Cut-off times may vary by store" },
                        ],
                        methodTitle: "International Parcel Delivery Method",
                        methodItems: [
                            { text: "Drop-offs by 5:00 PM on weekdays (3:00 PM in some city/county/district and Gyeonggi areas) and noon on Saturdays are collected by CJ Logistics and handed to the chosen courier for overseas shipping the next day." },
                            { text: "On Sundays and holidays, only drop-off is accepted" },
                            { text: "Cut-off times may vary by store" },
                        ],
                    },
                    {
                        label: "Pickup",
                        hero: imgHero10,
                        heroAlt: "",
                        title: "Pickup Service",
                        desc: "Order from an online shopping mall and pick up your item at your nearest GS25.",
                        notes: [
                            {
                                text: "You can pick up at your chosen store at a convenient time. (Safe Delivery)",
                            },
                            {
                                text: "SMS notification is sent upon arrival.",
                            },
                        ],
                        pickupTitle: "How to Use Pickup",
                        pickupItems: [
                            { step: "Step 1", title: "On the shopping mall, choose<br />Convenience Store PICK-UP as delivery method.", bullets: ["Membership required, English-only entry"] },
                            { step: "Step 2", title: "Select your nearest GS25"},
                            { step: "Step 3", title: "Visit the convenience store to pick up<br />once you receive an arrival SMS"},
                        ],
                        shoppingTitle: "Pickup Service Partner Shopping Malls",
                        shoppingItems: [ { text: "Check partner shopping malls at <a href=\"https://www.cvsnet.co.kr\" target=\"_blank\" rel=\"noopener noreferrer\">www.cvsnet.co.kr</a>." } ],
                        partnerBtnText: "View partner shopping malls for pickup",
                    },
                    {
                        label:   "Shopping mall transaction",
                        hero:    imgHero11,
                        heroAlt: "",
                        title:   "Shopping Mall Transaction Service",
                        desc:    "A service for convenient handling of home shopping returns, open markets, and online shopping malls.",
                        notes: [
                            { text: "Available at your nearest GS25 24 hours a day, 365 days a year, at your convenience." },
                        ],
                        pickupTitle: "How to Use",
                        pickupItems: [
                            { step: "Step 1", title: "Receive an approval number from the partner<br />and visit GS25", bullets: ["Membership required, English-only entry"]},
                            { step: "Step 2", title: "Enter the approval number<br />at the self-service kiosk" },
                            { step: "Step 3", title: "Print the waybill<br />and drop off" },
                        ],
                        shoppingTitle: "Available Partner Companies",
                        shoppingItems: [ { text: "Check partner shopping malls at <a href=\"https://www.cvsnet.co.kr\" target=\"_blank\" rel=\"noopener noreferrer\">www.cvsnet.co.kr</a>." } ],
                        partnerBtnText: "View available partners",
                    },
                ],
            },
            {
                hero: null,
                heroAlt: "",
                title: "Utility Bill Payment Service",
                subtitle: "Drop off parcels at your nearest GS25 24 hours a day, 365 days a year.",
                desc: "If your giro bill has a convenience-store payment barcode, you can pay taxes, the four major insurances, and utility bills 24/7 at GS25.",
                sections: [],
                panelExtra: {
                    desc: "If your giro bill has a convenience-store payment barcode, you can pay taxes, the four major insurances, and utility bills 24/7 at GS25.<br class=\"m_br\" /><br class=\"m_br\" />In addition to traditional giro payments, mobile payment via smartphone is available. Depending on the type of bill, you can pay by cash, bank transfer, or credit card.",
                    bullets: [
                        "SMS notifications are provided at every delivery stage, from drop-off to completion.",
                        "GS Postbox members can participate in various events and receive tiered benefits based on usage.",
                    ],
                },
                taxTitle: "Payable Taxes and Utility Bills",
                taxGroups: [
                    {
                        subtitle: "Taxes",
                        isList: true,
                        items: [
                            "National taxes (income tax, corporate tax, VAT, inheritance tax, gift tax, individual consumption tax, comprehensive real estate tax)",
                            "Seoul and Busan local taxes (acquisition tax, registration tax, property tax, automobile tax, residence tax, water and sewer bills, bus-lane violation fines, etc.)",
                            "Other local taxes (Namyang, Anyang, Ansan, Goyang, Gwacheon, Yangju, Dongducheon, Maju, Chungjeon, Jecheon, Boryeong, and Eumseong-gun — acquisition tax, registration tax, property tax, residence tax, automobile tax, etc.)",
                        ],
                    },
                    {
                        subtitle: "Four Major Insurance Premiums",
                        items: [
                            "Health Insurance, National Pension, Employment Insurance, Industrial Accident Insurance (Integrated Social Insurance — Four Major Insurances)",
                        ],
                    },
                    {
                        subtitle: "Utility Bills",
                        items: [
                            "Electricity, city gas (Seoul, Samchully, Seorabeol, Incheon, Gangnam, Kyungdong City Gas), telecom (KT, LG U+, SKT), cable TV (Hyundai HCN, T-broad, C&M, CMB, Skylife, Areum Broadcasting, Chungbuk Broadcasting, Namincheon Broadcasting, Geumgang Broadcasting, MyTV, etc.), newspapers (Chosun Ilbo, Maeil Business Newspaper), Korea Expressway Corporation fines, etc.",
                        ],
                    },
                ],
            },
            {
                hero: null,
                heroAlt: "",
                title: "Gift Card Sales",
                subtitle: "Gift Card Sales Service",
                desc: "We sell Culture Gift Cards, Kumkang Shoes gift cards, GS Caltex gift cards, and more.",
                sections: [],
                voucherTitle: "Gift Card Types",
                voucherItems: [
                    {
                        img: imgGiftCerti01,
                        name: "Culture Gift Card",
                        tags: [
                            { text: "5,000 KRW", type: "blue" },
                            { text: "10,000 KRW", type: "green" },
                        ],
                        desc: "A gift card usable for books and music, movie tickets, dining (partial), and online (games, portals).",
                    },
                    {
                        img: imgGiftCerti02,
                        name: "Kumkang Shoes Gift Card",
                        tags: [
                            { text: "50,000 KRW", type: "orange" },
                            { text: "100,000 KRW", type: "orange" },
                        ],
                        desc: "A practical gift card usable at over 4,000 stores in more than 1,300 cities nationwide (KRW 50,000 and KRW 100,000 denominations) at Kumkang, Buffalo, PGA, LPGA, Kumkang Handbag, and other brands.",
                    },
                    {
                        img: imgGiftCerti03,
                        name: "GS Caltex Gift Card",
                        tags: [
                            { text: "10,000 KRW", type: "green" },
                            { text: "50,000 KRW", type: "orange" },
                            { text: "100,000 KRW", type: "orange" },
                        ],
                        desc: "A gift card usable at gas stations, department stores, restaurants, supermarkets, hotels, travel agencies, and more.",
                    },
                ],
            },
        ],
    },
    winwin: {
        tabs: [
            {
                serviceTabs: [
                    { 
                        label: "Store\nOperational Support Benefits",
                        title: "Store Operational Support Benefits",
                        notes: [
                            { text: "※ Benefits and programs may be changed, discontinued, or added depending on circumstances." },
                        ],
                        items: [
                            {
                                num: "01",
                                title: "Workforce Support Program",
                                desc: "An incentive program for store operators who work to improve store competitiveness through higher sales, new product introductions, and more",
                            },
                            {
                                num: "02",
                                title: "Support for top-performing CounterFF stores",
                                desc: "Boosting CounterFF sales",
                                bullets: ["CHICKEN25 operating cost support", "CAFE25 operating cost support", "Score filter support for stores with hygiene certification"],
                            },
                            {
                                num: "03",
                                title: "Recruitment Platform Support",
                                desc: "Recruitment support for store managers (staff)",
                                bullets: ["Albamon usage support", "Partner platform support"],
                            },
                            {
                                num: "04",
                                title: "Win-win Support Insurance",
                                desc: "An industry-leading 'diverse insurance support' program",
                                bullets: ["Safety injury / embezzlement", "Parcel theft / cash theft"],
                            },
                            {
                                num: "05",
                                title: "Franchise Win-win Loan",
                                desc: "Preferential rates on unsecured/secured loans",
                                bullets: ["Loans in partnership with Woori Bank", "Additional preferential rate applied"],
                            },
                        ],
                    },
                    {
                        label: "Long-term and\nTop-performing Store Benefits",
                        title: "Long-term and Top-performing Store Benefits",
                        notes: [
                            { text: "※ Benefits and programs may be changed, discontinued, or added depending on circumstances." },
                        ],
                        items: [
                            { num: "01", title: "Benefits for 10-year long-term stores", desc: "Honoring 10-year veteran operators",bullets: ["Commemorative plaque", "Health checkups"] },
                            { num: "02", title: "Benefits for 20-year long-term stores", desc: "20's Club enrollment", bullets: ["Commemorative plaque", "Travel gift cards", "Health checkups"] },
                            { num: "03", title: "Benefits for 30-year long-term stores", desc: "Hosting a store ceremony for 30-year veteran operators", bullets: ["Commemorative plaque", "30th anniversary events", "Travel gift cards","Health checkups"]},
                            { num: "04", title: "Awards for top-performing store operators", desc: null, bullets: ["Provision of benefits to top-performing stores"] },
                        ],
                    },
                    {
                        label: "Store\nVOC Support",
                        title: "Store VOC Support",
                        notes: [
                            { text: "※ Benefits and programs may be changed, discontinued, or added depending on circumstances." },
                        ],
                        items: [
                            { num: "01", title: "24-hour Happy Call Center", desc: "24-hour communication channel" , bullets: ["Facilities", "IT Systems", "Suggestions", "Other Inquiries"]},
                            { num: "02", title: "Free Legal Counseling Service", desc: "Free legal counseling with attorneys", bullets: ["Civil / Criminal", "Family / Administrative"] },
                            { num: "03", title: "Labor Counseling Call Center", desc: "Comprehensive labor counseling service", bullets: ["Recruitment","Four Major Insurance","General Labor Matters"] },
                        ],
                    },
                    {
                        label: "Capability Development Support (Operators/Store Managers)",
                        title: "Capability Development Support<br class=\"m_br\" />(Operators/Store Managers)",
                        notes: [
                            { text: "※ Benefits and programs may be changed, discontinued, or added depending on circumstances." },
                        ],
                        items: [
                            { num: "01", title: "GS25 Chatbot Joy", desc: "A KakaoTalk chatbot service supporting GS25 store work" , bullets: ["24/7, 365 days a year", "Inventory / Logistics Inquiry", "Store Operations Manual", "Mobile Happy Call Registration"], link: "https://pf.kakao.com/_xmTxexcb?from=qr" },
                            { num: "02", title: "Mobile Store Management", desc: "An app supporting communication between operators and store managers on store operations", bullets: ["App exclusively for store operators and store managers", "Service Check Time", "Use-by Date Management","Today's Task Management", "Notice Distribution"] },
                            { num: "03", title: "Online Open Academy", desc: "Strengthening operator capabilities", bullets: ["Live training twice a month", "Diverse content","In-house and external expert instructors"] , link: "https://gs25.getsmart.co.kr/members/login?returnUrl=http%3A%2F%2Fgs25.getsmart.co.kr%2F"},
                            { num: "04", title: "Top-performing Store Lab", desc: "GS25 online newsletter", bullets: ["Operator of the Month","Success case introduction","Operations Tips"] },
                            { num: "05", title: "Onboarding training for new operators", desc: null, bullets: ["Operations training (POS, store management, systems","Service training","Online training courses (GS Class)"] , link: "https://gs25.getsmart.co.kr/members/login?returnUrl=http%3A%2F%2Fgs25.getsmart.co.kr%2F" },
                            { num: "06", title: "Store Manager Class", desc: "Staff training support", bullets: ["POS Training","Cleanliness Training","Customer Service Training"] , link: "http://hpimg.gsretail.com/images/gs25/winwin/web/store_manager_map.html" },
                        ],
                    },
                    {
                        label: "Social Contribution\nSupport",
                        title: "Social Contribution Support", 
                        notes: [
                            { text: "※ Benefits and programs may be changed, discontinued, or added depending on circumstances." },
                        ],
                        items: [
                            { num: "01", title: "Win-win Sharing Platform", desc: "Operating community-serving stores for vulnerable groups", bullets: ["Naeil Store", "Senior Store", "Neulbom Store"] },
                            { num: "02", title: "Disaster relief compensation", desc: "Disaster relief payments for stores affected by natural disasters", bullets: ["Natural disasters","Fire","Damage to houses / fields / paddies"] },
                            { num: "03", title: "GS Hero Award", desc: "Awards for operators and staff who serve as social role models", bullets: ["Excellence Award","Role Model Award","Sharing Award"] },
                            { num: "04", title: "Fire prevention extinguisher sharing", desc: "Fire prevention through shared fire extinguishers near stores", bullets: ["Share store fire extinguishers in the event of a nearby fire", "Replacement support after use"] },
                        ],
                    },
                    {
                        label: "Operator\nWelfare Benefits",
                        title: "Operator Welfare Benefits",
                        notes: [
                            { text: "※ Benefits and programs may be changed, discontinued, or added depending on circumstances." },
                        ],
                        items: [
                            { num: "01", title: "Family-event Support", desc: "Family-event monetary and supply support", bullets:["Family-event monetary support", "Store operations subsidy","Funeral supply support", "Childbirth supply support"] },
                            { num: "02", title: "Discretionary closures for holidays and family events", desc: "Discretionary closures", bullets: ["Holiday closures and shortened hours","Family-event closures and shortened hours"] },
                            { num: "03", title: "Operator welfare shopping mall", desc: "Welfare shopping mall exclusively for operators", bullets: ["Reasonable prices", "Exclusive products", "Special promotional sales"] },
                            { num: "04", title: "Comprehensive health checkup discounts", desc: "Discounted comprehensive health checkups at partner centers", bullets: ["KMI Center","Partner hospitals"] },
                            { num: "05", title: "Angel Resort", desc: "Angel Resort member rates", bullets: ["Hanwha Resort", "Elysian Gangchon"] },
                            { num: "06", title: "Angel Rent-a-Car (long-term/used)", desc: "Angel Rent-a-Car (long-term/used) exclusively for GS25 operators", bullets: ["Partner-rate quotes", "Fast delivery / all vehicle types","Dedicated consultation channel"] },
                        ],
                    },
                ],
            },
            {
                hero: imgHero11_1,
                heroAlt: "",
                title: "Participation Programs",
                desc: "GS25 supports operators through opinion gathering, promotion, and call center assistance.",
                items: [
                    {
                        num: "01",
                        title: "Operator Council",
                        desc: "Regional regular meetings (bimonthly, quarterly) to discuss policy proposals and key issues",
                    },
                    {
                        num: "02",
                        title: "Voluntary Dispute Mediation Committee",
                        desc: "In the event of a dispute between headquarters and operators, an external-expert committee chair, operator representatives, and headquarters representatives work together to reach a voluntary resolution.",
                    },
                    {
                        num: "03",
                        title: "24-hour Integrated Call Center",
                        desc: "Intake and counseling for store operation issues<br />(operates 24 hours)",
                    },
                    {
                        num: "04",
                        title: "Operator Open Suggestions",
                        desc: "By collecting various suggestions and ideas from operators, we incorporate firsthand insights from the field into store operations and headquarters policies.",
                    },
                ],
            },
        ],
    },
    milbox: {
        hero: imgHero12,
        heroAlt: "",
        title: "Corporate / Group Subscription Service",
        sections: [
            {
                type: "feature",
                title: "What is GS25's Corporate/Group Subscription Delivery Service?",
                desc: "A regular breakfast and snack delivery service for corporations and groups, powered by GS25's differentiated capabilities as Korea's leading convenience store.<br />If you don't have an in-house cafeteria or are considering a snack benefit program, take a look at the services below.",
                items: [
                    { title: "Trendy products" },
                    { title: "Reasonable Prices" },
                    { title: "Used by approximately 1,200 companies" },
                ],
            },
            {
                type: "imgcard",
                title: "Service Overview",
                items: [
                    {
                        img: require("@/assets/images/sub/gsrbr010101/img_mealbox.png"),
                        name: "Mealbox25",
                        desc: "A regular meal-box service from GS25 for corporations and groups.<br class=\"p_br\" />A new lineup is offered each day, from main dishes to desserts and beverages.<br class=\"p_br\" />HACCP-certified and individually packaged for hygienic, delicious meals.",
                        link: "#",
                    },
                    {
                        img: require("@/assets/images/sub/gsrbr010101/img_snackbar.png"),
                        name: "Snack Bar",
                        desc: "A snack curation service that regularly delivers GS25's trendy products to corporations and groups. Enhance employee benefits by enjoying GS25 products at the office.",
                    },
                ],
                advantages: {
                    title: "Recommended for:",
                    items: [
                        { text: "When you need a regular breakfast/snack service" },
                        { text: "When you need a benefit service at a reasonable price" },
                        { text: "When you lack catering infrastructure and need a regular supply of ready-to-eat meals" },
                    ],
                },
            },
        ],
    },
    brand: {
        visual: {
            lines: [
                "At the Center of Daily Life",
                'Start of your day<em class="m_gs25"> GS25</em>',
            ],
            logoAlt: "GS25",
        },
        about: [
            [
                'GS25 carries the pride of <br class="m_br" />a homegrown Korean brand,',
                "and by faithfully upholding the franchising principle <br class=\"m_br\" />of 'growing the number of profitable stores,'",
                'we have established ourselves as Korea\'s leading convenience store brand <br class="m_br" />with the highest profitability per new store.',
            ],
            [
                "Ranked No. 1 for 16 consecutive years as Korea's Most Admired Company,",
                'and ranked No. 1 in the Korea Service Quality Index (KS-SQI) <br class="m_br" />a total of 19 times — among other accolades from reputable external institutions —',
                "leading to strong assessment results.",
            ],
        ],
        str: {
            title: "GS25 is always<br />by your side.",
            storeFind: "Find a Store",
            snsInstaAria: "Instagram",
            snsYtAria: "YouTube",
            items: [
                {
                    title: "Industry-leading<br />Sales Per Store",
                    desc: 'By strengthening store competitiveness<br class="m_br" />and providing customer-centric products and services,<br />we are achieving the highest sales in the convenience store industry.',
                },
                {
                    title: 'Differentiated<br class="p_br" /> products and<br class="m_br" />services unique to GS25',
                    desc: 'We deliver new value to customers through differentiated products and services — including the development of safe, delicious fresh food and other high-quality food products,<br class="p_br" />the PB brand \'YOUUS\' offering great quality at reasonable prices,<br class="p_br" />and GS Retail\'s proprietary app, Our Neighborhood GS.',
                },
                {
                    title: 'A strong partnership built on continuous communication and<br class="m_br" />cooperation with store operators',
                    desc: "To build a strong partnership between store operators and headquarters, we operate a variety of communication channels and win-win programs. We have also developed industry firsts — such as Refresh Vacation Support and the GS25 20's Club — to elevate operator satisfaction and pride.",
                },
            ],
        },
    },
    common: {
        selectPlaceholder: "Please select",
        trafficSelectAria: "Select transit category",
        retailSelectAria: "Select retail category",
        prevAria: "Previous",
        nextAria: "Next",
    },
    backLabel: "Back to List",
    },
};

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const t = computed(() => langData[props.lang] || langData.ko);

const sinsen = computed(() => t.value.sinsen);
const store = computed(() => t.value.store);
const winwin = computed(() => t.value.winwin);
const milbox = computed(() => t.value.milbox);
const tab0 = computed(() => t.value.tabs[0]);
const tab1 = computed(() => t.value.tabs[1]);
const tab2 = computed(() => t.value.tabs[2]);
const tab3 = computed(() => t.value.tabs[3]);

const depth1ActiveIdx = ref(0); // 26.05.18 : 1depth 활성화탭 선언
const depth1Tabs = computed(() => t.value.nav.depth1);
const depth2Tabs = computed(() => t.value.nav.depth2);
const storeTabs = computed(() => t.value.nav.depth2Store);
const winwinTabs = computed(() => t.value.nav.depth2Winwin);

const storeActiveTab = ref(0); //매장/서비스 2Depth 활성화탭
const winwinActiveTab = ref(0); //상생협력 2Depth 활성화탭
const winwinServiceActiveTab = ref(0); //상생협력 3Depth 활성화탭
const giftSwiperInst = ref(null);
const onGiftSwiper = (swiper) => {
    giftSwiperInst.value = swiper;
};
const serviceActiveTab  = ref(0);
const deliveryActiveTab = ref(4);  // 26.05.18 : 매장/서비스 > 택배&픽업 3depth 활성화탭 선언

/* ── service_tab_wrap 슬라이드 (Tabs tabSlide 동일 방식) ── */
function useTabSlide() {
    const wrapEl   = ref(null);
    const listEl   = ref(null);
    const transformX = ref(0);

    const transformStyle = computed(() => ({ transform: `translateX(${transformX.value}px)` }));

    function adjustSlide(index) {
        const wrap = wrapEl.value;
        const list = listEl.value;
        if (!wrap || !list) return;
        const wrapWidth = wrap.offsetWidth;
        const listWidth = list.scrollWidth;
        if (listWidth <= wrapWidth) { transformX.value = 0; return; }
        const item = list.children[index];
        if (!item) return;
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        let newX = wrapWidth / 2 - itemCenter;
        newX = Math.min(0, newX);
        newX = Math.max(wrapWidth - listWidth, newX);
        transformX.value = newX;
    }

    let startX = 0, lastX = 0;
    const onTouchStart = (e) => { startX = e.touches[0].clientX; lastX = transformX.value; };
    const onTouchMove  = (e) => {
        const wrap = wrapEl.value; const list = listEl.value;
        if (!wrap || !list) return;
        let newX = lastX + (e.touches[0].clientX - startX);
        newX = Math.min(0, newX);
        newX = Math.max(wrap.offsetWidth - list.scrollWidth, newX);
        transformX.value = newX;
    };

    let isDragging = false, dragStartX = 0, dragStartTransform = 0;
    const onMouseDown = (e) => { isDragging = true; dragStartX = e.clientX; dragStartTransform = transformX.value; e.preventDefault(); };
    const onMouseMove = (e) => {
        if (!isDragging) return;
        const wrap = wrapEl.value; const list = listEl.value;
        if (!wrap || !list) return;
        let newX = dragStartTransform + (e.clientX - dragStartX);
        newX = Math.min(0, newX);
        newX = Math.max(wrap.offsetWidth - list.scrollWidth, newX);
        transformX.value = newX;
    };
    const onMouseUp = () => { isDragging = false; };

    onMounted(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        nextTick(() => adjustSlide(0));
    });
    onBeforeUnmount(() => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
    });

    return { wrapEl, listEl, transformStyle, adjustSlide, onTouchStart, onTouchMove, onMouseDown };
}

const {
    wrapEl: serviceWrapEl, listEl: serviceListEl,
    transformStyle: serviceTransformStyle, adjustSlide: adjustServiceSlide,
    onTouchStart: serviceOnTouchStart, onTouchMove: serviceOnTouchMove, onMouseDown: serviceOnMouseDown,
} = useTabSlide();

const {
    wrapEl: deliveryWrapEl, listEl: deliveryListEl,
    transformStyle: deliveryTransformStyle, adjustSlide: adjustDeliverySlide,
    onTouchStart: deliveryOnTouchStart, onTouchMove: deliveryOnTouchMove, onMouseDown: deliveryOnMouseDown,
} = useTabSlide();

const {
    wrapEl: winwinWrapEl, listEl: winwinListEl,
    transformStyle: winwinTransformStyle, adjustSlide: adjustWinwinSlide,
    onTouchStart: winwinOnTouchStart, onTouchMove: winwinOnTouchMove, onMouseDown: winwinOnMouseDown,
} = useTabSlide();

watch(serviceActiveTab, (idx) => {
    if (idx === 3 && giftSwiperInst.value) {
        nextTick(() => { giftSwiperInst.value.update(); });
    }
    nextTick(() => adjustServiceSlide(idx));
});
watch(deliveryActiveTab,       (idx) => nextTick(() => adjustDeliverySlide(idx)));
watch(winwinServiceActiveTab,  (idx) => nextTick(() => adjustWinwinSlide(idx)));
const popLnbActiveIdx = ref(0);
const trafficSelectVal = ref("subway");
const retailSelectVal = ref("convenience");

/* 팝카드 Swiper — 아코디언 패널 오픈 완료 후 update() 호출 */
const popCardSwiperInst = ref(null);

function onPopCardSwiper(swiper) {
    popCardSwiperInst.value = swiper;
}

function onPopCard0Opened() {
    if (popCardSwiperInst.value) {
        popCardSwiperInst.value.update();
    }
}

/* 교통카드 충전 서비스 Swiper */
const chargingSwiperInst = ref(null);

function onChargingSwiper(swiper) {
    chargingSwiperInst.value = swiper;
}

function onChargingOpened() {
    if (chargingSwiperInst.value) {
        chargingSwiperInst.value.update();
    }
}

const scrollToSection = (idx) => {
    popLnbActiveIdx.value = idx;
    const el = document.getElementById(`pop-sec-${idx}`);
    if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 57;
        window.scrollTo({ top, behavior: "smooth" });
    }
};

const _getIsMobile = () => window.innerWidth <= 768;
const isMobileView = ref(_getIsMobile());
let _resizeTimer = null;
const _onResize = () => {
    isMobileView.value = _getIsMobile();
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => { ScrollTrigger.refresh(); }, 150);
};

let popSecObserver = null;
onMounted(() => {
    isMobileView.value = _getIsMobile();
    window.addEventListener("resize", _onResize);

    const targets = document.querySelectorAll("[data-pop-sec]");
    if (!targets.length) return;
    popSecObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    popLnbActiveIdx.value = Number(entry.target.dataset.popSec);
                }
            });
        },
        { threshold: 0.3 }
    );
    targets.forEach((el) => popSecObserver.observe(el));

    gsapCtx = gsap.context(() => {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1025px)", () => {
            const spans = textParaRef.value.querySelectorAll("span");
            const PHASE1_PX = 400;

            ScrollTrigger.create({
                trigger: sectionRef.value,
                start: "top top",
                end: `+=${PHASE1_PX}`,
                scrub: 1.5,
                onUpdate(self) {
                    const p = self.progress;
                    const bw = bgWrapRef.value.offsetWidth;
                    const bh = bgWrapRef.value.offsetHeight;
                    const hInset = p * Math.max(0, (bw - 1420) / 2);
                    const vInset = p * Math.max(0, (bh - 799) / 2);
                    const clip = `inset(${vInset}px ${hInset}px round ${p * 20}px)`;
                    bgWrapRef.value.style.clipPath = clip;
                    bgWrapRef.value.style.webkitClipPath = clip;
                    bgWrapRef.value.classList.toggle("active", p >= 1);
                },
            }); 

            gsap.set([...spans, logoWrapRef.value], { opacity: 0, y: 40 });

            const textTl = gsap.timeline({ paused: true });
            textTl
                .to(spans, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.2,
                    ease: "power2.out",
                })
                .to(logoWrapRef.value, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                }, "-=0.3");

            ScrollTrigger.create({
                trigger: sectionRef.value,
                start: `top+=${PHASE1_PX} top`,
                once: false,
                onEnter: () => textTl.play(),
                onLeaveBack: () => textTl.reverse(),
            });

            const aboutSpans = aboutSectionRef.value.querySelectorAll("span");

            gsap.set(aboutSpans, { y: 200, opacity: 0, willChange: "transform, opacity" });

            ScrollTrigger.create({
                trigger: aboutSectionRef.value,
                start: "top 75%",
                once: true,
                onEnter: () => {
                    gsap.to(aboutSpans, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        onComplete() {
                            gsap.set(aboutSpans, { willChange: "auto" });
                        },
                    });
                },
            });
        });
    });
});
onBeforeUnmount(() => {
    window.removeEventListener("resize", _onResize);
    if (popSecObserver) popSecObserver.disconnect();
    if (gsapCtx) gsapCtx.revert();
});

/* =====================
   sec_brand_visual / sec_brand_str (smain)
   ===================== */
const sectionRef = ref(null);
const bgWrapRef = ref(null);
const textParaRef = ref(null);
const logoWrapRef = ref(null);
const aboutSectionRef = ref(null);

const strItemImgs = [imgAcc01, imgAcc02, imgAcc03];
const strItems = computed(() =>
    (t.value.brand?.str?.items || []).map((item, i) => ({
        ...item,
        img: strItemImgs[i],
    })),
);

const openAcc = ref(-1);
const descRefs = [];
const imgRefs = [];
const accTokens = ref([0, 0, 0]);

function _animateOpen(el, myToken, index) {
    if (el.classList.contains("acc_show") && el.style.height === "auto") return;
    el.classList.add("acc_animating", "acc_show");
    el.style.height = "auto";
    const heightPx = `${el.scrollHeight}px`;
    el.style.height = "0px";
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (myToken !== accTokens.value[index]) return;
            el.style.height = heightPx;
        });
    });
    el.addEventListener("transitionend", function onEnd(e) {
        if (e.target !== el || e.propertyName !== "height") return;
        el.removeEventListener("transitionend", onEnd);
        if (myToken !== accTokens.value[index]) return;
        el.style.height = "auto";
        el.classList.remove("acc_animating");
    });
}

function _animateClose(el, myToken, index) {
    if (!el.classList.contains("acc_show")) return;
    el.classList.add("acc_animating");
    const h = el.scrollHeight;
    if (h === 0) {
        el.classList.remove("acc_show", "acc_animating");
        el.style.height = "";
        return;
    }
    el.style.height = `${h}px`;
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (myToken !== accTokens.value[index]) return;
            el.style.height = "0px";
        });
    });
    el.addEventListener("transitionend", function onEnd(e) {
        if (e.target !== el || e.propertyName !== "height") return;
        el.removeEventListener("transitionend", onEnd);
        if (myToken !== accTokens.value[index]) return;
        el.classList.remove("acc_show", "acc_animating");
        el.style.height = "";
    });
}

function toggleAcc(index) {
    const prev = openAcc.value;
    if (prev === index) {
        openAcc.value = -1;
        const token = ++accTokens.value[index];
        _animateClose(descRefs[index], token, index);
        _animateClose(imgRefs[index], token, index);
        return;
    }
    if (prev !== -1) {
        const token = ++accTokens.value[prev];
        _animateClose(descRefs[prev], token, prev);
        _animateClose(imgRefs[prev], token, prev);
    }
    openAcc.value = index;
    const token = ++accTokens.value[index];
    _animateOpen(descRefs[index], token, index);
    // DOM에 is_open 클래스가 적용된 후 이미지 높이를 측정해야 scrollHeight가 올바르게 반환됨
    nextTick(() => {
        _animateOpen(imgRefs[index], token, index);
    });
}

let gsapCtx = null;

const depth1Routes = ["/gsrbr010101", null, null, null, null];

function onDepth1Change(idx) {
    depth1ActiveIdx.value = idx;
    const route = depth1Routes[idx];
    if (route) router.push(route);
}

function goBack() {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push("/");
    }
}
</script>

<style scoped>
.brand_panel_bg { margin: 0 0 40px; padding: 0; background-color: #e8e8ec; border-radius: 12px; overflow: hidden; }
.brand_panel_bg > img { width: 100%; display: block; object-fit: cover; }
.brand_panel_title { padding: 0 0 100px; }
.brand_panel_title > h2 { margin: 0 0 16px; color: #161618; font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.brand_panel_title > p { margin: 0; color: #161618; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.sec_header { padding-bottom: 40px; }
.sec_header > h3 { margin: 0 0 12px; color: #161618; font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.sec_header:not(:has(p)) > h3 { margin-bottom: 0; }
.sec_header > .sec_header_desc, .sec_header > .sec_mobile_desc { margin: 0; color: #161618; font-size: 1.8rem; font-weight: 400; line-height: 1.6; letter-spacing: -0.01em; }
.sec_header .sec_cite { margin-left: 16px; color: #67676f; font-size: 1.4rem; font-weight: 500; font-style: normal; letter-spacing: -0.01em; }
@media (max-width: 768px) {
  .cafe25_split_img > img { width: 100% }
}
.cafe_panel .brand_panel_bg > img { object-position: center bottom }
.chicken_panel .img_grid_swiper { margin-top: 120px }
@media (max-width: 768px) {
  .chicken_panel .img_grid_swiper { margin-top: 60px }
}
.gopizza_panel .img_grid, .gopizza_panel .img_grid_swiper { margin-top: 0; padding:0 }

@media (max-width: 1024px) {
  .brand_panel_title > h2 { font-size: 3.2rem; }
  .brand_panel_title > p { font-size: 2rem; }
}
@media (max-width: 768px) {
  .sec_header { padding-bottom: 24px; }
  .sec_header:not(:has(p)) { padding-bottom: 0; }
  .sec_header > h3, .sec_header:not(:has(p)) > h3 { margin-bottom: 12px; font-size: 2.4rem; }
  .sec_header > h3.h3_steps, .sec_header:not(:has(p)) > h3.h3_steps { margin-bottom: 24px; }
  .sec_header > .sec_header_desc, .sec_header > .sec_mobile_desc { margin-bottom: 12px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
  .sec_header .sec_cite { margin-top: 4px; margin-left: 0; display: block; }
  .brand_panel_bg { margin: 0 0 24px; border-radius: 0; }
  .brand_panel_title { padding: 0 0 64px; }
  .brand_panel_bg > img { max-height: 245px; object-fit: none; }
  .brand_panel_title > h2 { margin-bottom: 12px; font-family: Pretendard; font-size: 2.8rem; line-height: 1.35; letter-spacing: -0.01em; }
  .brand_panel_title > p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
  .cafe_panel .brand_panel_bg > img { object-position: -348px center; }
  .chicken_panel .brand_panel_bg > img { object-position: -385px center; }
  .gopizza_panel .brand_panel_bg > img { object-position: -591px bottom; }
  .gopizza_panel .diff_bottom_row { margin-top: 120px; }
  .sinsen_panel .brand_panel_bg > img { object-position: -395px bottom; }
}

.sec_brand_visual { position: relative; height: calc(100vh + 800px) }
.sticky { --base-ratio: 0.75; --base-size: 1536; --base-percent: 100vw; width: 100%; height: calc(100vh + max(calc(2px * var(--base-ratio)), calc(calc(2 / var(--base-size)) * var(--base-percent)))); position: -webkit-sticky; position: sticky; top: max(calc(1 / var(--base-size) * var(--base-percent) * -1)); left: 0; overflow: hidden }
@media (max-width: 768px) {
  .sec_brand_visual { height: 100vh }
  .sticky { height: 100vh; top: 0 }
}
.bg_wrap { width: 100%; height: 100%; position: relative; z-index: 1; overflow: hidden; clip-path: inset(0% round 0px); -webkit-clip-path: inset(0% round 0px) }
.bg_wrap > .bg { width: 100%; height: 100%; background-image: url(@/assets/images/dummy/brand_main_bg.png); background-size: cover; background-position: center; position: absolute; top: 0; left: 0; z-index: -1; transform: scale(1.2); transition: transform 0.7s ease-out }
@media (max-width: 768px) {
  .bg_wrap > .bg { background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(@/assets/images/dummy/brand_main_bg.png); transform: scale(1.25); background-position: 54% 50px }
}
.bg_wrap.active > .bg { transform: scale(1) }
.bg_wrap > .bg::before, .bg_wrap > .bg::after { content: ""; width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0; visibility: hidden; pointer-events: none; transition: 0.7s }
.bg_wrap > .bg::before { background-color: #00000066; z-index: 2 }
.bg_wrap > .bg::after { background: linear-gradient(180deg, rgba(0, 0, 0, .3) 0, rgba(0, 0, 0, .3) 48.27%, rgba(0, 0, 0, 0) 90.33%); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); z-index: 1 }
.bg_wrap.active > .bg::before, .bg_wrap.active > .bg::after { opacity: 1; visibility: visible }
.bg_wrap > .visual_inner { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 20px; display: flex; align-items: center; justify-content: center }
.bg_wrap .visual_inner > .txt_area { position: relative; z-index: 3; text-align: center }
.txt_area > p { width: 100%; margin-bottom: 48px; overflow: hidden }
.txt_area > p > span { color: #fff; font-size: 5.6rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; word-break: keep-all; word-wrap: break-word; display: block }
.txt_area > .logo_wrap { overflow: hidden }
.txt_area > .logo_wrap > img { width: auto; margin: 0 auto; display: block }
.m_gs25 { font-style: normal; display: none }
.sec_brand_about { padding: 200px 0; background-color: #f8f8f8 }
.sec_brand_about > .about_inner { width: 940px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px }
.sec_brand_about > .about_inner > .about_txt > p  { overflow: hidden }
.sec_brand_about > .about_inner > .about_txt > p > span { color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; will-change: transform, opacity; display: block }
.sec_brand_str > .str_inner { max-width: 1460px; margin: 0 auto; padding: 200px 20px; }
.str_header { padding-bottom: 80px; display: flex; justify-content: space-between; align-items: flex-end }
.str_header > h2 { color: #161616; font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em }
.str_header > .str_actions { display: flex; align-items: center; gap: 24px }
.sns_wrap { display: flex; align-items: center; gap: 6px }

/* common.css로 이동
.btn_sns { width: 56px; height: 56px; background-color: #F8F8F8; border-radius: 100%; display: flex; align-items: center; justify-content: center }
.btn_sns::before { content: ""; background-color: #161616; border-radius: 4px; display: block }
*/

.brand_acc { margin: 0; padding: 0; background-color: #f8f8f8; border-radius: 12px; list-style: none; overflow: hidden }
.acc_item { border-bottom: 1px solid #e5e5e9 }
.acc_item:last-child{border-bottom:0;}
.acc_inner { padding: 40px 64px; display: grid; grid-template-columns: 1fr 0; align-items: start }
.acc_item.is_open .acc_inner { grid-template-columns: 1fr 1fr }
.acc_body { min-width: 0 }
.acc_btn { width: 100%; padding: 0; color: #161616; font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; background: transparent; border: none; cursor: pointer; text-align: left; display: flex; align-items: center; justify-content: space-between; gap: 16px }
.acc_btn:focus-visible { outline: 2px solid #111; outline-offset: 2px }
.acc_btn::after { content: ""; width: 20px; height: 20px; flex-shrink: 0; background:url('@/assets/images/common/icon_set_20.png') -539px -24px no-repeat; background-size:auto 159px; display:block }
.acc_item.is_open .acc_btn::after { opacity: 0 }
.acc_desc_wrap { overflow: hidden; height: 0; box-sizing: border-box; transition: height 0.35s ease }
.acc_desc { padding-top: 16px; color: #67676f; font-size: 2rem; font-weight: 400; line-height: 1.35; letter-spacing: -0.01em }
:deep(.p_br) { display: block }
:deep(.m_br) { display: none }
.acc_img_wrap { overflow: hidden; height: 0; transition: height 0.65s ease }
.acc_img_wrap > img { width: auto; margin-left: auto; border-radius: 12px; display: block; object-fit: cover }
@media (max-width: 1024px) {
  .sec_brand_about > .about_inner { width: 100%; padding: 0 40px; box-sizing: border-box }
  .sec_brand_str > .str_inner { width: 100%; padding: 100px 40px; box-sizing: border-box }
  .acc_inner { padding: 28px 40px }
  .acc_item.is_open .acc_inner { grid-template-columns: 1fr 280px; column-gap: 28px }
  .acc_img_wrap > img { width: 100% }
}
@media (max-width: 768px) {
  .bg_wrap > .visual_inner { width: calc(100% - 40px); height: auto; top: 358px; bottom: 318px; transform: translateX(-50%) }
  .txt_area > p { margin-bottom: 0 }
  .txt_area > p > span, .txt_area > p > span em { color:#fff; font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.01em; text-align: center }
  .txt_area > .logo_wrap { display: none }
  .m_gs25 { display: inline }
  .txt_area > p > span:first-child::after { content: "," }
  .sec_brand_about > .about_inner > .about_txt > p > span { font-weight: 700; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0%; display: block }
  .sec_brand_about { padding: 140px 0 }
  .sec_brand_about > .about_inner { padding: 0 20px; gap: 40px }
  .sec_brand_str { padding: 140px 0 }
  .sec_brand_str > .str_inner { padding: 0 20px }
  .str_header { flex-direction: column; align-items: flex-start; gap: 16px; padding-bottom: 40px }
  .str_header > h2 { font-size: 2.8rem; line-height: 1.35; letter-spacing: -0.01em }
  .str_header > .str_actions { gap:14px; flex: none; justify-content: flex-start }
  .sns_wrap { gap: 16px }
  /* common.css로 이동
  .btn_sns { width: 40px; height: 40px }
  */
  .acc_btn { font-size: 1.8rem; line-height: 1.5; letter-spacing: -0 }
  .acc_inner { padding: 24px }
  .acc_desc { font-size: 1.6rem; line-height: 1.5 }
  .acc_item.is_open .acc_inner { grid-template-columns: 1fr; column-gap: 0; row-gap:40px }
  :deep(.p_br) { display: none }
  :deep(.m_br) { display: inline }
}
.brand_panel_desc { margin-top: 16px; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; color:#67676F }
@media (max-width: 768px) {
  .brand_panel_desc { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
}

.caution_note > p { color: #67676f }
@media (max-width: 768px) {
  .caution_note { margin-top: 8px }
  .caution_note > p { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
  .brand_panel_title .list_dotted { padding-right: 6px }
}
img { display: block }
button { background-color: #fff }
.usage_select_box { width: 180px; padding: 11px 44px 11px 16px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; background-color: #F8F8F8; border: 0; border-radius: 6px; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23111111' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; background-size: 20px 20px; cursor: pointer }
@media (max-width: 768px) {
  .usage_select_box { width: 100%; font-size: 1.4rem; line-height: 1.4 }
}
.brand_panel { padding-top: 64px; margin-bottom: 100px ;}
.brand_panel section { padding-bottom: 120px }
@media (max-width: 768px) {
  .brand_panel section { padding: 0 0 80px }
}
.brand_panel section:last-of-type { padding-bottom: 0 }
.diff_card_grid { margin: 0 0 40px; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 460px)); gap: 20px }
.diff_card { margin: 0; padding: 0; background-color: #fff; border-radius: 12px; overflow: hidden }
.diff_card > figure { margin: 0; padding: 0; background-color: #e8e8ec; overflow: hidden }
@media (max-width: 768px) {
  .diff_card > figure { height:220px }
}
.diff_card > figure > img { height: 100%; object-fit: cover }
.diff_card > div { min-height: 200px; padding: 32px; background-color: #f8f8f8 }
.diff_card > div > h3 { margin: 0 0 16px; color: #161618; font-size: 2.8rem; font-weight: 600; line-height: 1.35; letter-spacing: -0.01em }
.diff_card > div > p { margin: 0; color: #67676f; font-size: 1.8rem; font-weight: 400; line-height: 1.6; letter-spacing: -0.01em }
.cafe25_card_list { margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, calc((100% - 40px) / 3)); gap: 20px }
.cafe25_card_list > li { min-width: 0; overflow: hidden }
.cafe25_card_list > li > div { width: 100% }
.cafe25_img_wrap { max-width: 938px; margin: 0; padding: 0; background-color: #f8f8f8; border-radius: 12px; overflow: hidden }
.cafe25_split { display: flex; gap: 20px; align-items: flex-start }
.cafe25_split > div { width: calc(50% - 10px); min-width: 0 }
.cafe25_split_table { overflow-x: auto }
.cafe25_table_wrap { overflow-x: auto }
.cafe25_table { border-collapse: collapse; table-layout: fixed }
.tbl_mo { width: 100%; border-collapse: collapse }
.tbl_mo th, .tbl_mo td { height: 56px; text-align: left; border-bottom: 1px solid #E5E5E9; vertical-align: middle }
.tbl_mo th { padding: 18px 24px; background-color: #F8F8F8 }
.tbl_mo th > span { color: #161618; font-size: 1.6rem; font-weight: 700; line-height: 1.24; letter-spacing: 0 }
.tbl_mo td { padding: 16px 20px }
.tbl_mo td > span { color: #161616; font-size: 1.6rem; font-weight: 400; line-height: 1.24; letter-spacing: 0 }
.tbl_mo td .flag_icon { display: inline-block; vertical-align: middle; margin-right: 8px }
.tbl_mo tr:first-child th, .tbl_mo tr:first-child td { border-top: 1px solid #E5E5E9 }
.cafe25_table_pagination, .gopizza_table_pagination { margin-top: 20px; display: flex; justify-content: center; gap: 10px }
.cafe25_table_pagination :deep(.swiper-pagination-bullet), .gopizza_table_pagination :deep(.swiper-pagination-bullet) { width: 6px; height: 6px; background-color: #D7D7DF; border-radius: 50%; opacity: 1; cursor: pointer; display: block }
.cafe25_table_pagination :deep(.swiper-pagination-bullet-active), .gopizza_table_pagination :deep(.swiper-pagination-bullet-active) { background-color: #161616 }
.cafe25_table th, .cafe25_table td { height: 56px; padding: 0 24px; border-bottom: 1px solid #e5e5e9; vertical-align: middle; white-space: nowrap }
.cafe25_table th > span, .cafe25_table td > span { color: #161618; font-size: 1.8rem; font-weight: 400; line-height: 1.6; letter-spacing: -0.01em }
.cafe25_table th:first-child, .cafe25_table td:first-child { border-left: 0 }
.cafe25_table th:last-child, .cafe25_table td:last-child { border-right: 0 }
.cafe25_table th { background-color: #f8f8f8; border-top: 0 }
.cafe25_table th > span { font-weight: 600 }
@media (max-width: 768px) {
  .cafe25_table th, .cafe25_table td { padding: 16px 24px }
  .cafe25_table th > span, .cafe25_table td > span { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
  .cafe25_table th > span { font-weight: 700 }
  .diff_card > figure > img{width:100%;}
}
.cafe25_table > tbody > tr > td > .flag_icon { width: 24px; height: 24px; margin-right: 8px; border-radius: 50%; vertical-align: middle; display: inline-block; object-fit: cover }
.img_grid { margin-top: 120px; padding: 0; display: grid; grid-template-columns: repeat(2, calc((100% - 20px) / 2)); gap: 20px }
.img_grid > li { min-width: 0; border-radius: 12px; overflow: hidden }
.img_grid img { width: 100%; object-fit: cover }
.gopizza_img_wrap { height: 440px; margin: 0; padding: 0; border-radius: 12px; overflow: hidden }
.gopizza_img_wrap > img { height: 100%; object-fit: cover }
.gopizza_menu { display: flex; gap: 20px }
.gopizza_menu_panel { min-width: 0; flex: 1 }
.gopizza_menu_panel img { width: 100%; border-radius: 12px; object-fit: cover }
@media (max-width: 768px) {
  .gopizza_menu_panel + .gopizza_menu_panel { margin-top: 100px }
  .gopizza_menu_panel img { min-height: 240px }
}
.gopizza_menu_info { padding-top: 24px }
.gopizza_menu_title { margin-bottom: 16px; display: flex; align-items: center; gap: 8px }
.gopizza_menu_title > strong { color: #161618; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .gopizza_menu_title { gap:4px; flex-direction: column; align-items: flex-start }
  .gopizza_menu_title > strong { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
}
.gopizza_menu_tag { color: #67676f; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em }
.gopizza_menu_tag + .gopizza_menu_tag { margin-left: 8px }
.gopizza_menu_tag + .gopizza_menu_tag::before { content: ""; width: 1px; height: 8px; margin-right: 8px; background-color: #d7d7df; display: inline-block }
.com_table_wrap { overflow-x: auto }
.com_table { width: 100%; border-collapse: collapse; border-top: 1px solid #e5e5e9 }
.com_table th, .com_table td { padding: 18px 24px; color: #161618; font-size: 1.8rem; line-height: 1.6; letter-spacing: -0.01em; border-bottom: 1px solid #e5e5e9; vertical-align: middle }
.com_table td { font-weight: 400; text-align: left }
.com_table thead th { padding: 11px 13px; font-weight: 600; background-color: #f8f8f8 }
.com_table tbody th { font-weight: 700; background-color: #f8f8f8; text-align: left; white-space: normal; word-break: keep-all; padding-top: 18px; padding-bottom: 18px; vertical-align: middle }
.com_table_col thead th { text-align: center }
.com_table_col td { padding: 15px 24px; text-align: center }
@media (max-width: 768px) {
  .com_table th, .com_table td { font-size: 1.6rem; line-height: 1.24 }
  .com_table td { padding: 14px 20px; font-size: 1.4rem; letter-spacing: 0.01em }
  .com_table thead th { padding: 14px 0 }
  .com_table tbody th { padding: 14px 24px }
  .com_table_col td { padding: 11px 13px; font-size: 1.4rem }
}
.gopizza_menu_name { display: flex; align-items: center; gap: 6px }
.gopizza_badge_best { padding: 2px 6px; color: #fb4516; font-size: 1.1rem; font-weight: 600; font-style: normal; letter-spacing: -0.02em; background-color: #ffe9e3; border-radius: 4px }
.diff_bottom_row { display: flex; gap: 32px }
.diff_bottom_row > .diff_qr_row { flex: 1 }
.gopizza_link { min-width: 0; display: flex; align-items: center; flex: 1; gap: 20px; text-decoration: none }
.gopizza_link > figure { width: 90px; height: 90px; margin: 0; padding: 8px; background-color: #fff; border: 1px solid #e5e5e9; border-radius: 10px; flex-shrink: 0; display: none }
.gopizza_link > figure > img { width: 100%; display: block }
.gopizza_link > div { min-width: 0; padding: 7px 0; flex: 1 }
.gopizza_link > div > strong { margin: 0 0 6px; color: #161618; font-size: 2rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em; display:flex; gap:8px; align-items: center }
.gopizza_link > div > strong:after { content:""; width:20px; height:20px; background:url('@/assets/images/common/icon_set_20.png') -979px -24px;}
.gopizza_link > div > p { margin: 0; color: #67676f; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.02em }
.sinsen_feature :deep(.feature_card_item) { min-height: 240px }

/* 26.05.15 Add 이종환 : 신선강화점 특징 아이콘 */
.sinsen_feature :deep(.feature_card_item .feature_card_icon) {width:40px; height:40px; background-color:transparent; background-position:50%; background-repeat:no-repeat; background-size:cover;}
.sinsen_feature :deep(.feature_card_item:nth-child(1) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_01.png');}
.sinsen_feature :deep(.feature_card_item:nth-child(2) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_02.png');}
.sinsen_feature :deep(.feature_card_item:nth-child(3) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_03.png');}
.sinsen_feature :deep(.feature_card_item:nth-child(4) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_04.png');}


.info_card { max-width: 940px; padding: 32px; background-color: #f8f8f8; border-radius: 12px }
.info_card strong { margin-bottom:8px; font-weight: 700; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; display: block }
@media (max-width: 768px) {
  .info_card strong { font-size: 1.8rem; line-height: 150%; letter-spacing: 0% }
}
@media (max-width: 768px) {
  .sinsen_feature :deep(.feature_card_item) { min-height: 227px }
}
.info_card span { font-size: 1.8rem; line-height: 1.4 }
@media (max-width: 768px) {
  .info_card span { font-size: 1.4rem; letter-spacing: -0.01em }
}
.info_card > p { margin-bottom: 32px; color: #67676f; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .info_card > p { margin-bottom:12px }
}
.sinsen_flow_img { width: 100%; margin-top: 24px; display: block; border-radius: 10px }
@media (max-width: 768px) {
  .sinsen_flow_img { height:auto;min-height:147px }
}
.info_list > li { padding-bottom: 12px; color: #161618; font-size: 1.8rem; font-weight: 400; line-height: 1.6; letter-spacing: -0.01em; display: flex; align-items: baseline; gap: 8px }
.info_list > li:last-child { padding-bottom: 0 }
.info_list > li::before { content: ""; width: 16px; height: 16px; background:url('@/assets/images/common/icon_bullet_checkmark.png') 0 0 no-repeat; border-radius: 50%; position: relative; top: 2px; flex-shrink: 0 }
.info_list > li > div { display: flex; flex-direction: column; gap: 2px }
.info_check_note { color: #67676f }
.chicken_panel :deep(.feature_card_item) { min-height: 238px }
.service_tab_wrap { margin-bottom: 80px; min-width: 0; overflow: hidden; position: relative }
.service_tab_list { width: 100%; display: flex; transition: transform 0.4s cubic-bezier(0.1, 0.57, 0.1, 1) }
.service_tab_item { background-color: transparent; border: none; cursor: pointer; border-radius: 12px; flex: 0 0 calc(100% / 8); aspect-ratio: 89 / 83; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px }

/* 26.05.15 Edit 이종환 : 아아콘 적용으로 수정 (on / off 포지션은 동일) */
.brand_panel .service_tab_icon { width: 32px; height: 32px; background-image:url('@/assets/images/sub/gsrbr010101/icon_pc_set_storetab_off.png'); background-repeat:no-repeat; border-radius: 8px; display: block; flex-shrink: 0 ;}
.brand_panel .service_tab_item.is_active .service_tab_icon { background-image:url('@/assets/images/sub/gsrbr010101/icon_pc_set_storetab_on.png'); }

.service_tab_label { color: #7c7c86; font-size: 1.8rem; font-weight: 700; line-height: 1.5; text-align: center; white-space: pre-line }
.service_tab_item.is_active .service_tab_label { color: #107af2 }
.service_panel { min-height: 200px }
.service_panel section:has(> header:only-child) :deep(header) { margin-bottom: 0; padding: 0 }
.pop_exclude { margin-top: 8px; color: #f95823; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
.pop_card_item { overflow: hidden; display: flex; flex-direction: column }

/* 매장/서비스 > 생활 서비스 탭 아이콘 */
.pop_panel .service_tab_list .service_tab_item:nth-child(1) .service_tab_icon {background-position:-34px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(2) .service_tab_icon {background-position:-134px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(3) .service_tab_icon {background-position:-234px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(4) .service_tab_icon {background-position:-334px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(5) .service_tab_icon {background-position:-434px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(6) .service_tab_icon {background-position:-534px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(7) .service_tab_icon {background-position:-634px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(8) .service_tab_icon {background-position:-734px -24px;}
/* //26.05.15 Edit 이종환 : 아아콘 적용으로 수정 */

/* 매장/서비스 > 택배&픽업 탭 아이콘 */
.delivery_panel .service_tab_list .service_tab_item:nth-child(1) .service_tab_icon {background-position:-834px -24px;}
.delivery_panel .service_tab_list .service_tab_item:nth-child(2) .service_tab_icon {background-position:-934px -24px;}
.delivery_panel .service_tab_list .service_tab_item:nth-child(3) .service_tab_icon {background-position:-1034px -24px;}
.delivery_panel .service_tab_list .service_tab_item:nth-child(4) .service_tab_icon {background-position:-1134px -24px;}
.delivery_panel .service_tab_list .service_tab_item:nth-child(5) .service_tab_icon {background-position:-1234px -24px;}

/* 상생협력 > 운영지원제도 탭 아이콘 */
.winwin_panel .service_tab_list .service_tab_item:nth-child(1) .service_tab_icon {background-position:-1434px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(2) .service_tab_icon {background-position:-1334px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(3) .service_tab_icon {background-position:-1534px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(4) .service_tab_icon {background-position:-1634px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(5) .service_tab_icon {background-position:-1734px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(6) .service_tab_icon {background-position:-1834px -24px;}


/* step 아이콘 */
.gift_usage_wrap .gift_usage_group :deep(.step_list .step_item) {align-items:center; flex-direction:row;}
.gift_usage_wrap .gift_usage_group :deep(.step_list .step_item > span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;}

.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-260px -103px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-100px -103px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-180px -103px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-100px -103px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(5) span) {background-position:-20px -103px;}

.gift_usage_wrap .gift_usage_group:nth-of-type(2) :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-20px -20px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(2) :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-100px -20px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(2) :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-180px -20px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(2) :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-260px -20px;}


.usim_use :deep(.step_list .step_item > span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;}
.usim_use :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-20px -20px;}
.usim_use :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-260px -103px;}
.usim_use :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-20px -103px;}
.usim_use :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-340px -103px;}


.hi_pass :deep(.step_list .step_item > span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;}
.hi_pass :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-180px -20px;}
.hi_pass :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-180px -103px;}
.hi_pass :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-420px -103px;}

.sec_unpaid_method :deep(.step_list .step_item > span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-500px -103px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-580px -103px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-660px -103px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-260px -186px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(5) span) {background-position:-180px -20px;}

.sec_mall_payment_method :deep(.step_list .step_item > span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;}
.sec_mall_payment_method :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-500px -186px;}
.sec_mall_payment_method :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-20px -20px;}
.sec_mall_payment_method :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-180px -20px;}
.sec_mall_payment_method :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-580px -186px;}

.delivery_panel :deep(.step_list .step_item > span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;}

.delivery_panel .service_panel.delivery_panel_1 :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-500px -186px;}
.delivery_panel .service_panel.delivery_panel_1 :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-580px -186px;}
.delivery_panel .service_panel.delivery_panel_1 :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-660px -186px;}
.delivery_panel .service_panel.delivery_panel_1 :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-180px -20px;}
.delivery_panel .service_panel.delivery_panel_2 :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-500px -186px;}
.delivery_panel .service_panel.delivery_panel_2 :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-580px -186px;}
.delivery_panel .service_panel.delivery_panel_2 :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-660px -186px;}
.delivery_panel .service_panel.delivery_panel_2 :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-900px -104px;}
.delivery_panel .service_panel.delivery_panel_3 :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-500px -186px;}
.delivery_panel .service_panel.delivery_panel_3 :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-580px -186px;}
.delivery_panel .service_panel.delivery_panel_3 :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-660px -186px;}
.delivery_panel .service_panel.delivery_panel_3 :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-180px -20px;}
.delivery_panel .service_panel.delivery_panel_4 :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-1060px -104px;}
.delivery_panel .service_panel.delivery_panel_4 :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-20px -20px;}
.delivery_panel .service_panel.delivery_panel_4 :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-980px -104px;}
.delivery_panel .service_panel.delivery_panel_5 :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-20px -20px;}
.delivery_panel .service_panel.delivery_panel_5 :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-20px -103px;}
.delivery_panel .service_panel.delivery_panel_5 :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-660px -186px;}

.delivery_panel :deep(.feature_card_item .feature_card_icon) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;}

.delivery_panel .service_panel.delivery_panel_1 :deep(.feature_card_item:nth-of-type(1) .feature_card_icon) {background-position:-420px -186px;}
.delivery_panel .service_panel.delivery_panel_1 :deep(.feature_card_item:nth-of-type(2) .feature_card_icon) {background-position:-340px -186px;}
.delivery_panel .service_panel.delivery_panel_1 :deep(.feature_card_item:nth-of-type(3) .feature_card_icon) {background-position:-100px -103px;}

.delivery_panel .service_panel.delivery_panel_2 :deep(.feature_card_item:nth-of-type(1) .feature_card_icon) {background-position:-740px -186px;}
.delivery_panel .service_panel.delivery_panel_2 :deep(.feature_card_item:nth-of-type(2) .feature_card_icon) {background-position:-420px -186px;}
.delivery_panel .service_panel.delivery_panel_2 :deep(.feature_card_item:nth-of-type(3) .feature_card_icon) {background-position:-340px -186px;}
.delivery_panel .service_panel.delivery_panel_2 :deep(.feature_card_item:nth-of-type(4) .feature_card_icon) {background-position:-100px -103px;}

.winwin_panel :deep(.num_info_icon:after) {width:40px; height:40px; background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat; content:''; position:absolute; top:20px; left:20px; display:block;}
.winwin_panel .winwin_panel_1 :deep(.num_info_item:nth-of-type(1) .num_info_icon:after) {background-position:-980px -20px;}
.winwin_panel .winwin_panel_1 :deep(.num_info_item:nth-of-type(2) .num_info_icon:after) {background-position:-20px -266px;}
.winwin_panel .winwin_panel_1 :deep(.num_info_item:nth-of-type(3) .num_info_icon:after) {background-position:-100px -266px;}
.winwin_panel .winwin_panel_1 :deep(.num_info_item:nth-of-type(4) .num_info_icon:after) {background-position:-180px -266px;}
.winwin_panel .winwin_panel_1 :deep(.num_info_item:nth-of-type(5) .num_info_icon:after) {background-position:-260px -266px;}

.winwin_panel .winwin_panel_2 :deep(.num_info_item:nth-of-type(1) .num_info_icon:after) {background-position:-340px -266px;}
.winwin_panel .winwin_panel_2 :deep(.num_info_item:nth-of-type(2) .num_info_icon:after) {background-position:-420px -266px;}
.winwin_panel .winwin_panel_2 :deep(.num_info_item:nth-of-type(3) .num_info_icon:after) {background-position:-500px -266px;}
.winwin_panel .winwin_panel_2 :deep(.num_info_item:nth-of-type(4) .num_info_icon:after) {background-position:-580px -266px;}

.winwin_panel .winwin_panel_3 :deep(.num_info_item:nth-of-type(1) .num_info_icon:after) {background-position:-660px -266px;}
.winwin_panel .winwin_panel_3 :deep(.num_info_item:nth-of-type(2) .num_info_icon:after) {background-position:-260px -266px;}
.winwin_panel .winwin_panel_3 :deep(.num_info_item:nth-of-type(3) .num_info_icon:after) {background-position:-740px -266px;}

.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(1) .num_info_icon:after) {background-position:-820px -266px;}
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(2) .num_info_icon:after) {background-position:-900px -266px;}
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(3) .num_info_icon:after) {background-position:-980px -266px;}
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(4) .num_info_icon:after) {background-position:-1060px -266px;}
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(5) .num_info_icon:after) {background-position:-900px -186px;}
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(6) .num_info_icon:after) {background-position:-1140px -266px;}

.winwin_panel .winwin_panel_5 :deep(.num_info_item:nth-of-type(1) .num_info_icon:after) {background-position:-340px -20px;}
.winwin_panel .winwin_panel_5 :deep(.num_info_item:nth-of-type(2) .num_info_icon:after) {background-position:-420px -20px;}
.winwin_panel .winwin_panel_5 :deep(.num_info_item:nth-of-type(3) .num_info_icon:after) {background-position:-580px -266px;}
.winwin_panel .winwin_panel_5 :deep(.num_info_item:nth-of-type(4) .num_info_icon:after) {background-position:-500px -20px;}

.winwin_panel .winwin_panel_6 :deep(.num_info_item:nth-of-type(1) .num_info_icon:after) {background-position:-580px -20px;}
.winwin_panel .winwin_panel_6 :deep(.num_info_item:nth-of-type(2) .num_info_icon:after) {background-position:-660px -20px;}
.winwin_panel .winwin_panel_6 :deep(.num_info_item:nth-of-type(3) .num_info_icon:after) {background-position:-740px -20px;}
.winwin_panel .winwin_panel_6 :deep(.num_info_item:nth-of-type(4) .num_info_icon:after) {background-position:-820px -20px;}
.winwin_panel .winwin_panel_6 :deep(.num_info_item:nth-of-type(5) .num_info_icon:after) {background-position:-900px -20px;}
.winwin_panel .winwin_panel_6 :deep(.num_info_item:nth-of-type(6) .num_info_icon:after) {background-position:-580px -103px;}

.milbox_panel .milbox_feature :deep(.feature_card_item .feature_card_icon) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;}
.milbox_panel .milbox_feature :deep(.feature_card_item:nth-of-type(1) .feature_card_icon) {background-position:-1060px -20px;}
.milbox_panel .milbox_feature :deep(.feature_card_item:nth-of-type(2) .feature_card_icon) {background-position:-100px -186px;}
.milbox_panel .milbox_feature :deep(.feature_card_item:nth-of-type(3) .feature_card_icon) {background-position:-1140px -20px;}

@media (min-width: 769px) {
    .pop_card_swiper { overflow: visible }
    .pop_card_swiper :deep(.swiper-wrapper) { gap: 20px; transform: none !important }
    .pop_card_swiper :deep(.swiper-slide) { width: auto !important; height: auto !important; flex: 1 }
}
.pop_card_thumb { width: 100%; display: block }
.pop_card_thumb img { width: auto; height: auto }
.pop_card_body { padding-top: 24px; display: flex; flex-direction: column; flex: 1 }

@media (max-width: 768px) {
    .pop_card_body { min-height: 196px; padding-right: 8px }

    .delivery_panel :deep(.step_list .step_item > span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_32.png'); background-repeat:no-repeat;}

    .delivery_panel .service_panel :deep(.feature_card_item .feature_card_icon) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_32.png'); background-repeat:no-repeat;}
    .delivery_panel .service_panel.delivery_panel_1 :deep(.swiper-slide:nth-of-type(1) .feature_card_icon) {background-position:-420px -186px;}
    .delivery_panel .service_panel.delivery_panel_1 :deep(.swiper-slide:nth-of-type(2) .feature_card_icon) {background-position:-340px -186px;}
    .delivery_panel .service_panel.delivery_panel_1 :deep(.swiper-slide:nth-of-type(3) .feature_card_icon) {background-position:-100px -103px;}

    .delivery_panel .service_panel.delivery_panel_2 :deep(.swiper-slide:nth-of-type(1) .feature_card_icon) {background-position:-740px -186px;}
    .delivery_panel .service_panel.delivery_panel_2 :deep(.swiper-slide:nth-of-type(2) .feature_card_icon) {background-position:-420px -186px;}
    .delivery_panel .service_panel.delivery_panel_2 :deep(.swiper-slide:nth-of-type(3) .feature_card_icon) {background-position:-340px -186px;}
    .delivery_panel .service_panel.delivery_panel_2 :deep(.swiper-slide:nth-of-type(4) .feature_card_icon) {background-position:-100px -103px;}

    .winwin_panel :deep(.num_info_icon:after) {width:32px; height:32px; background-image:url('@/assets/images/sub/icon_cont_32.png'); top:14px; left:14px;}
}
.pop_card_name { margin-bottom: 12px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: block }
@media (max-width: 768px) {
  .pop_card_name { margin-bottom: 12px; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0 }
}
.pop_card_desc { color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; white-space: pre-line }
@media (max-width: 768px) {
  .pop_card_desc { font-size: 1.4rem; line-height: 1.4 }
}
.pop_card_note { margin-top: 8px; color: #67676f; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.02em }
.pop_card_note.is_warn { color: #f95823 }
.pop_card_logos { margin-top: auto; padding-top: 16px; display: flex; align-items: center; gap: 24px; flex-wrap: wrap }
@media (max-width: 768px) {
  .pop_card_logos { padding-top: 0 }
  .pop_sec_acc :deep(dd.acc_panel) { border-bottom: 1px solid #D7D7DF; }
}
.pop_logo_thumb { width: auto; display: block }
@media (min-width: 769px) {
  .pop_sec_acc :deep(.acc_tit_btn) { display: none }
  .pop_sec_acc :deep(.acc_panel) {height: auto !important; overflow: visible;}
  .pop_sec_acc :deep(.acc_panel + dt) {padding-top:120px;}
  .pop_sec_acc :deep(.acc_item) { border: none; padding-bottom: 120px }
  .pop_sec_acc :deep(.acc_item:last-child) { padding-bottom: 0 }
  .pop_sec_acc :deep(.acc_panel_cont) { padding: 0 }
}
@media (max-width: 768px) {
  .pop_sec_acc :deep(.acc_panel_cont .pop_sec) { padding: 0 !important }
  .pop_sec_acc :deep(.acc_panel_cont #pop-sec-1), .pop_sec_acc :deep(.acc_panel_cont #pop-sec-2) { padding: 12px 32px 24px !important }
  .pop_sec_acc :deep(#pop-sec-0 > header) { padding: 12px 32px 24px }
  .pop_sec_acc :deep(#pop-sec-0 > header > h3) { display: none }
  .pop_sec_acc :deep(.pop_sec:not(#pop-sec-0) > header), .pop_sec_acc :deep(.pop_sec > .usage_header > header) { display: none }
}
.charging_service_list { display: flex; gap: 20px }
.charging_service_swiper { display: none }
@media (max-width: 768px) {
  .charging_service_list { display: none }
  .charging_service_swiper { display: block; overflow: hidden; margin-top: 24px; padding: 0 32px }
  .charging_service_swiper :deep(.swiper-slide) { width: 28vw !important; height: 28vw !important; flex: none }
}
.charging_service_item { max-width: 220px; aspect-ratio: 1 / 1; border-radius: 12px; flex: 1; display: flex; align-items: center; justify-content: center; background: #F8F8F8 }
@media (max-width: 768px) {
  .charging_service_item { max-width: none; width: 100%; height: 100%; aspect-ratio: unset }
}
.charging_service_item > img { max-width: 80%; max-height: 80%; width: auto; height: auto; display: block }
.charging_service_note { margin-top: 16px; color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .charging_service_note { margin-top: 24px; margin-bottom: 8px; padding: 0 32px 24px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
}
.charging_note_label { padding-right: 8px; color: #7c7c86; font-size: 1.6rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .charging_note_label { font-size: 1.4rem; line-height: 1.4; margin-top: 8px }
}
.usage_header { display: flex; align-items: center; gap: 20px; margin-bottom: 40px }
@media (max-width: 768px) {
  .usage_header { margin-bottom: 24px; display: block }
}
.usage_header :deep(header) { margin-bottom: 0; padding-bottom: 0 }
.usage_header :deep(h3) { margin: 0 }
.usage_group_title { margin: 0 0 8px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .usage_group_title { margin-bottom: 24px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
  .usage_group_title:has(+ .retail_note) { margin-bottom: 8px }
}
.retail_footnote { margin: 6px 0 0; color: #fb6432; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em }
.usage_def_list { margin: 0; padding: 0; display: grid; grid-template-columns: auto 1fr; gap: 4px 16px }
.usage_def_list > dt { color: #161616; font-size: 1.6rem; font-weight: 600; line-height: 1.6; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .usage_def_list { gap: 8px 16px }
  .usage_def_list > dt { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; min-width:60px }
}
.usage_def_list > dd { margin: 0; color: #67676f; font-size: 1.6rem; font-weight: 400; line-height: 1.6; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .usage_def_list > dd { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
}
.usage_group .list_dotted > li { color: #67676f }
.usage_group .list_dotted > li::before { background-color: #67676f }

.explain + .retail_note {margin-top:8px;}

.retail_note { margin: 0 0 24px; color: #f95823; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
.logo_list { padding: 0; gap: 12px; display: grid; grid-template-columns: repeat(6, 1fr) }
.logo_list > li { height: 56px; min-width: 0; padding: 6px 12px; border: 1px solid #e5e5e9; border-radius: 8px; display: flex; align-items: center; justify-content: center }
.logo_list > li > img { max-width: 100%; width: auto; height: auto; display: block }
.logo_placeholder { width: 100%; height: 100%; background-color: #d7d7df; border-radius: 4px; display: block }
.pop_wrap { position: relative; display: flex; align-items: flex-start }
.pop_lnb { width: 240px; position: sticky; top: 40px; left: 0; flex-shrink: 0 }
.pop_lnb > ul > li > button { width: 100%; min-height: 64px; padding: 17px 0; color: #161616; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; box-sizing: border-box; text-align: left }
.pop_content { flex: 1; min-width: 0 }
.list_caution { margin: 8px 0 0; padding: 0 }
.list_caution > li { color: #161616; font-size: 1.8rem; line-height: 1.4; letter-spacing: -0.01em; color:#67676F }
@media (max-width: 768px) {
  .list_caution > li { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
}
.imgcard_link { width: 20px; height: 20px; background:url('@/assets/images/common/icon_set_20.png') -979px -24px no-repeat; flex-shrink: 0; display: inline-block; vertical-align: middle; margin-left: 8px }
.sec_note { margin: 8px 0 0; color: #f95823; font-size: 1.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.02em }
.milbox_feature :deep(.feature_card_item) { min-height: 163px !important; max-width: 340px }
@media (max-width: 768px) {
  .milbox_feature :deep(.feature_card_swiper .swiper-slide) { min-height: 171px; }
  .milbox_feature :deep(.feature_card_swiper .swiper-slide) > .feature_card_item { min-height: 171px; }
  .milbox_feature :deep(.feature_card_item) { min-height: 171px; max-width: 100%; }
}
.brand_panel_title .list_dotted { margin: 16px 0 0 }
.brand_panel_title + section { padding-top: 0 }
.brand_panel_title .list_dotted > li::before { background-color: #67676f }
.brand_panel_title .list_dotted > li > p { color: #67676f }
.note_sub, .brand_panel_title .list_dotted > li > p.note_sub { color: #f95823 }
.sec_unpaid_advantage :deep(.feature_card_item), .sec_mall_payment_advantage :deep(.feature_card_item) { min-height: 260px }
.sec_delivery_caution :deep(.feature_card_item) { min-height: 211px }
:deep(.txt_point) { color: #fb6432 }
@media (max-width: 768px) {
  .sec_unpaid_advantage :deep(.feature_card_item) { min-height: 244px }
  .sec_mall_payment_advantage :deep(.feature_card_item) { min-height: 244px }
  .sec_delivery_caution :deep(.feature_card_item) { min-height: 199px }
}
.mall_site_note { margin: 0; color: #f95823; font-size: 1.4rem; line-height: 1.5; letter-spacing: -0.02em }
.mall_site_list { margin: 0; padding: 0; display: flex; gap: 20px }
.mall_site_list > li { flex: 1 }
.mall_site_list > li > figure { margin: 0; display: flex; flex-direction: column; gap: 16px }
.mall_site_thumb { width: 100%; height: 200px; background-color: #f8f8f8; border-radius: 12px; display: flex; align-items: center; justify-content: center }
.mall_site_thumb > img { width: auto; max-width: 100% }
.mall_site_list > li > figure > figcaption { color: #67676f; font-size: 1.8rem; line-height: 1.4; letter-spacing: -0.01em; white-space: pre-line; text-align: center }
@media (max-width: 1024px) {
  .mall_site_list { flex-wrap: wrap; gap: 16px }
  .mall_site_list > li { flex: 1 1 calc((100% - 32px) / 3) }
}
@media (max-width: 768px) {
  .mall_site_swiper { overflow: visible }
  .mall_site_swiper :deep(.swiper-slide) { width: 29.5vw }
  .mall_site_swiper :deep(.swiper-slide:nth-child(1)) .mall_site_thumb > img { width: 60px }
  .mall_site_swiper :deep(.swiper-slide:nth-child(2)) .mall_site_thumb > img { width: 56px }
  .mall_site_swiper :deep(.swiper-slide:nth-child(3)) .mall_site_thumb > img { width: 62px }
  .mall_site_swiper :deep(.swiper-slide:nth-child(4)) .mall_site_thumb > img { width: 26px }
  .mall_site_swiper :deep(.swiper-slide:nth-child(5)) .mall_site_thumb > img { width: 82px }
  .mall_site_swiper :deep(.swiper-slide:nth-child(6)) .mall_site_thumb > img { width: 26px }
  .mall_site_figure { margin: 0; display: flex; flex-direction: column; gap: 8px }
  .mall_site_figure > figcaption { color: #67676f; font-size: 1.2rem; line-height: 1.4; letter-spacing: -0.01em; text-align: center; white-space: pre-line }
  .mall_site_swiper .mall_site_thumb { height: 104px }
}
.cash_table_cell { display: flex; align-items: flex-start; gap: 12px }
.imgcard_list { display: flex; gap: 20px }
.imgcard_item { overflow: hidden; display: flex; flex: 1; flex-direction: column }
.imgcard_img { width: 100%; height: 340px; margin: 0; border-radius:12px; overflow: hidden }
.imgcard_img > img { width: 100%; height: 100%; object-fit: cover }
.imgcard_body { padding: 32px 0; flex: 1 }
.imgcard_body > h4 { margin-bottom: 16px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em }
.imgcard_body > p { color: #67676f; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; white-space: pre-line }
.imgcard_sublist { display: flex; flex-direction: column; gap: 8px }

/* 26.05.15 Edit 이종환 : 아이콘 공통화 */
.imgcard_sublist > li { display: flex; gap: 8px; align-items: center }
.imgcard_sublist > li:before { content: ""; width: 16px; height: 16px; background:url('@/assets/images/common/icon_bullet_checkmark.png') 0 0 no-repeat; border-radius: 50%; position: relative; top: 2px; flex-shrink: 0 }
/* .imgcard_icon { width: 16px; height: 16px; background-color: #0059fe; border-radius: 50%; flex-shrink: 0 } */
/* 26.05.15 Edit 이종환 : 아이콘 공통화 */

.imgcard_sublist > li > span:last-child { color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.4 }
.hipass_terminal_img > img { width: auto; max-width: 100%; height: auto; display: block }
@media (max-width: 768px) {
  .hipass_terminal_img > img { width: 100% }
  .imgcard_list { flex-direction: column; gap:40px }
  .imgcard_img { height: 220px }
  .imgcard_body { padding: 24px 0 }
  .imgcard_body > h4 { margin-bottom:8px; font-weight: 700; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0 }
  .imgcard_sublist > li > span:last-child { font-size: 1.6rem; line-height: 1.5; letter-spacing: 0 }
}
.usim_phone_list { margin: 0; padding: 0 }
.usim_phone_list dt { margin-bottom:6px; color: #161616; font-size: 1.8rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em }
.usim_phone_list dd { margin-bottom: 32px; color: #67676f; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0 }
@media (max-width: 768px) {
  .usim_phone_list dt { margin-bottom:8px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0 }
  .usim_phone_list dd { margin-bottom:12px; font-size: 1.6rem; line-height: 1.5; letter-spacing: 0 }
}
.usim_plan_table_wrap { overflow-x: auto }
.usim_plan_table { width: 100%; min-width: 860px; border-collapse: collapse }
.usim_plan_table th { padding: 14.5px 24px; background-color: #f8f8f8; border-right: none; border-bottom: 1px solid #e5e5e9; color: #161616; font-size: 1.8rem; font-weight: 600; line-height: 1.5; letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: break-word; text-align: center; vertical-align: middle }
.usim_plan_table thead tr:nth-child(2) th { padding: 10.5px 24px }
.usim_plan_table thead tr:nth-child(1) th:first-child, .usim_plan_table thead tr:nth-child(1) th[colspan="3"] { border-right: 1px solid #e5e5e9 }
.usim_plan_table thead tr:nth-child(2) th:last-child { border-right: 1px solid #e5e5e9 }
.usim_plan_table td { padding: 15px 24px; border-right: none; border-bottom: 1px solid #e5e5e9; color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: break-word; text-align: center; vertical-align: middle }
.usim_plan_table tbody td:first-child, .usim_plan_table tbody td:nth-child(4) { border-right: 1px solid #e5e5e9 }
.usim_plan_data_sub { font-size: 1.4rem }
.usim_plan_dc { color: #107af2; font-size: 1.4rem; font-style: normal; font-weight: 600 }
@media (max-width: 768px) {
  .usim_plan_table th, .usim_plan_table td { padding: 10px 8px; font-size: 1.3rem }
  .usim_plan_dc { font-size: 1.3rem }
}
.usim_advantage_cards :deep(.feature_card_item) { min-height: 212px }
.gift_advantage_cards :deep(.feature_card_item) { min-height: 271px }
.gift_usage_wrap { display: flex; flex-direction: column; gap: 40px }
.gift_usage_group > h3 { margin-bottom: 24px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em }

@media (max-width: 768px) {
    .gift_usage_group > h3 { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
    .gift_usage_wrap .gift_usage_group :deep(.step_list .step_item) {align-items:flex-start; flex-direction:row;}
    .gift_usage_wrap .gift_usage_group :deep(.step_list .step_item span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_32.png'); background-repeat:no-repeat;}

    .usim_use :deep(.step_list .step_item span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_32.png'); background-repeat:no-repeat;}
    .hi_pass :deep(.step_list .step_item span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_32.png'); background-repeat:no-repeat;}
    .sec_unpaid_method :deep(.step_list .step_item span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_32.png'); background-repeat:no-repeat;}
    .sec_mall_payment_method :deep(.step_list .step_item span) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_32.png'); background-repeat:no-repeat;}
}
.gift_purchase_wrap { display: flex; gap: 40px; align-items: flex-start }
.gift_purchase_img { width: calc(50% - 10px); margin: 0; padding: 0; border-radius: 12px; flex-shrink: 0; overflow: hidden }
.gift_purchase_img > img { width: 100%; height: 100%; display: block; object-fit: cover }
.gift_purchase_steps { width: calc(50% - 10px); margin: 0; padding: 20px 0 0 }
.gift_purchase_step { padding-bottom: 40px }
.gift_purchase_step:last-child { padding-bottom: 0 }
.gift_step_header { margin-bottom: 8px; display: flex; align-items: center; gap: 8px }
.gift_step_num { color: #107af2; font-size: 2.4rem; font-weight: 600; font-style: normal; letter-spacing: -0.01em }
.gift_step_title { color: #161616; font-size: 2.4rem; font-weight: 600; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .gift_step_header { gap:6px; margin-bottom: 4px }
  .gift_step_title { font-weight: 700; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
  .gift_step_desc { padding-left:36px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
  .gift_step_num { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0 }
}
.gift_step_desc { margin: 0; padding-left: 38px; color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
.gift_usage_heading .gift_usage_desc_emphasis { color: #f95823; font-size: 1.8rem; font-weight: 400; line-height: 1.6; letter-spacing: -0.01em; }
@media (max-width: 768px) {
  .gift_usage_heading .gift_usage_desc_emphasis { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
}
.gift_brand_slider { position: relative; width: 100%; display: flex; align-items: center; gap: 16px }
@media (max-width: 768px) {
  .brand_panel section.sec_gift_brand { padding-left: 0; padding-right:0 }
  .brand_panel section.sec_gift_brand :deep(header) { padding: 0 20px }
}
.gift_brand_swiper { width: 100%; padding: 0 20px; overflow: hidden }
@media (min-width: 769px) {
  .gift_brand_swiper { max-width: none; flex: 1; min-width: 0 }
}
.gift_brand_nav { flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; border: 1px solid #d7d7df; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #111; transition: border-color 0.2s }
.gift_brand_nav:hover { border-color: #111 }
.gift_brand_nav.swiper-button-disabled { opacity: 0.3; cursor: default }
@media (max-width: 768px) {
  .gift_brand_nav { display: none }
  .gift_brand_slider { display: block }
}
.gift_brand_swiper :deep(.swiper-slide) { width: 106px; flex-shrink: 0; display: flex; justify-content: center; box-sizing: border-box }
.gift_brand_card { margin: 0; padding: 0 }
.gift_brand_card > img { width: 106px; height: 165px; max-width: 106px; margin: 0 auto; border-radius: 4px; display: block; object-fit: cover }
.gift_brand_card > figcaption { margin-top: 8px; color: #161618; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; text-align: center }
.gift_brand_pagination { margin-top: 20px; display: flex; justify-content: center; gap: 16px }
.gift_brand_pagination :deep(.swiper-pagination-bullet) { width: 8px; height: 8px; background-color: #d7d7df; border-radius: 50%; opacity: 1; cursor: pointer; display: block }
@media (max-width: 768px) {
  .gift_brand_pagination { margin-top: 16px; gap: 10px }
  .gift_brand_pagination :deep(.swiper-pagination-bullet) { width: 6px; height:6px }
}
.gift_brand_pagination :deep(.swiper-pagination-bullet-active) { background-color: #161616 }
@media (max-width: 1024px) {
  .cafe25_card_list { grid-template-columns: repeat(3, minmax(0, 1fr)) }
  .gopizza_menu { flex-direction: column }
  .logo_list { grid-template-columns: repeat(3, 1fr) }
  .gift_brand_card > figcaption { font-size: 1.4rem }
  .brand_panel { padding-top: 48px; padding-bottom: 80px }
  /* 26.05.15 Del 이종환 .brand_panel section { padding-bottom: 0 } */
  .service_tab_item { flex: 0 0 clamp(140px, 18.23vw, 175px); gap: 12px }
  .service_tab_item.is_active { background-color: #F8F8F8 }
  .service_tab_icon { width: 40px; height: 40px }
  .service_tab_label { font-size: 1.6rem }
  .service_tab_wrap::after { content:''; width:clamp(64px, 8vw, 88px); height:100%; background:linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1)); position:absolute; top:0; right:0; pointer-events:none; z-index:1 }
  .pop_lnb { width: 160px }
  .pop_lnb > ul > li > button { font-size: 1.6rem; min-height: 52px }
  .diff_card_grid { grid-template-columns: repeat(2, minmax(0, 1fr)) }
  .usage_header { gap: 12px; margin-bottom: 24px }
  .usage_select_box { width: 160px }
}

@media (max-width: 768px) {
  .service_tab_wrap { margin-bottom: 40px }
  .service_tab_wrap::after { content:''; width:clamp(24px, 8.53vw, 32px); height:100%; background:linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1)); position:absolute; top:0; right:0; pointer-events:none; z-index:1 }
  /* .service_tab_list { padding: 0 20px } */
  /* .service_tab_list::after { content:''; min-width:20px; flex-shrink:0 } */
  .service_tab_item { gap: 10px }
  .service_tab_item.is_active { background-color: #F8F8F8 }
  .service_tab_item { flex: 0 0 clamp(100px, 26.67vw, 120px); aspect-ratio: 1 / 1.18 }
  .service_tab_icon { width: 32px; height: 32px }
  .service_tab_label { font-weight: 700; font-size: 1.2rem; line-height: 1.2; letter-spacing: 0% }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .pop_wrap { gap: 24px }
  .pop_card_swiper :deep(.swiper-wrapper) { gap: 16px }
  .gift_brand_nav { width: 40px; height: 40px }
  .gift_brand_slider { gap: 12px }
}

@media (max-width: 768px) {
  .cont_inner {overflow-x: clip;}
  .diff_card_swiper { overflow: visible }
  .diff_card > div { min-height: 163px; padding: 20px }
  .diff_card > div > p { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
  .diff_card > div > h3 { font-weight: 700; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0%; margin-bottom: 8px }
  .cafe25_img_wrap { max-width: none; overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch }
  .cafe25_img_wrap > img { max-width: none; display: block }
  .cafe25_card_swiper { overflow: visible; margin-bottom: 20px }
  .cafe25_card_swiper .swiper-slide { width: 42vw }
  .cafe25_card_slide { width: 42vw; height: 42vw; overflow: hidden; border-radius: 12px }
  .cafe25_card_slide > img { width: 100%; height: 100%; object-fit: cover; display: block }
  .cafe25_split { flex-direction: column }
  .cafe25_split > div { width: 100% }
  .cafe25_split > img { width: 100% }
  .brand_panel:first-of-type section:not(:first-of-type) :deep(header) { padding-bottom: 40px }
  .img_grid_swiper {overflow: visible }
  .img_grid_swiper :deep(.swiper-slide) { width: 84vw }
  .img_grid_slide { width: 84vw; overflow: hidden; border-radius: 12px }
  .img_grid_slide > img { width: 100%; height: 100%; object-fit: cover; display: block }
  .gopizza_img_wrap { height: 260px }
  .diff_bottom_row { flex-direction: column; gap: 20px }
  .gopizza_link { padding: 0 16px; position: relative; gap: 12px }
  .gopizza_link > figure { width: 48px; height: 48px; padding: 0; border: 0; display:block }
  .gopizza_link > figure > img { height: 48px }
  .gopizza_link > div { padding: 0 }
  .gopizza_link > div > strong { font-size: 1.6rem }
  .gopizza_link > div > strong:after { display:none }
  .gopizza_link::after { content: ""; width: 16px; height: 16px; position: absolute; top: 50%; right: 16px; transform: translateY(-50%); background-color: #e5e5e9 }
  .info_list > li { padding-bottom: 4px }
  .pop_lnb { display:none }
  .pop_card_swiper { padding: 12px 32px 40px; overflow: hidden }
  .pop_card_swiper :deep(.swiper-slide) { width: 56vw !important; height: auto !important; flex: none }
  .logo_list { grid-template-columns: repeat(2, 1fr) }
  .gift_brand_card > img { width: 100%; height: auto; max-width: 100%; aspect-ratio: 106 / 165 }
  .gift_brand_card > figcaption { font-size: 1.2rem }
  .gift_purchase_wrap { flex-direction: column }
  .gift_purchase_img { width: 100% }
  .gift_purchase_steps { width: 100% }
}
.tax_group_list { display: grid; grid-template-columns: 1fr }
.tax_group_list > dd { margin: 0 0 40px }
.tax_group_list > dd:last-child { margin-bottom: 0 }
@media (max-width: 768px) {
  .tax_group_list { margin-top: 24px }
}
.tax_group_list .list_dotted > li + li { margin-top: 6px }
.tax_group_list .list_dotted > li::before { background-color: #67676f }
.tax_group_list .list_dotted > li p { color:#67676F }
.tax_group_subtitle { margin-bottom: 16px; font-size: 2.4rem; font-weight: 700; color: #161616; line-height: 1.35; letter-spacing: -0.01em }
.tax_group_desc, .tax_group_list .list_dotted > li p { font-size: 1.8rem; color: #67676f; line-height: 1.4 }
@media (max-width: 768px) {
  .tax_group_desc, .tax_group_list .list_dotted > li p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
}
.voucher_list { display: flex; gap: 20px }
.voucher_item { max-width: 340px; flex: 1 }
.voucher_img { height: 200px; background-color: #f8f8f8; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center }
.voucher_img > img { width: auto }
.voucher_info { padding-top: 24px }
.voucher_name { margin-bottom: 8px; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; font-weight: 700; color: #000; display: block }
@media (max-width: 768px) {
  .voucher_name { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
}
.voucher_tags { margin-bottom: 16px; letter-spacing: -0.01em; line-height: 1.4; display: flex; gap: 4px }
.voucher_tag { padding: 2px 8px; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; border-radius: 4px }
.tag_blue { background-color: #e7f2fe; color: #0d62c2 }
.tag_green { background-color: #dff5ec; color: #0d6e46 }
.tag_orange { background-color: #f9f2ea; color: #ca5028 }
.voucher_desc { font-size: 1.6rem; color: #67676f; line-height: 1.5; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .tax_group_subtitle { margin-bottom:12px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
  .brand_panel section.sec_voucher { padding: 0 !important }
  .brand_panel section.sec_voucher header { padding: 0 20px }
  .voucher_swiper .swiper-slide { width: 69.33vw }
}
.link_wrap { margin-top: 64px; display: flex; justify-content: center }
.link_wrap > .btn_pickup { height: 64px; padding: 20px 32px; color: #fff; text-align: center; font-size: 1.8rem; line-height: 1.4; background-color: #107AF2; border-radius: 10px; border:0; gap:8px }
.link_wrap > .btn_pickup::after { content:''; width: 16px; height: 16px; background:#fff }
@media (max-width: 768px) {
  .link_wrap { margin-top: 80px }
  .link_wrap > .btn_pickup { height: 44px; padding: 10px 16px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; border-radius: 8px }
}
.milbox_panel .imgcard_body { padding: 32px 0 24px }
@media (max-width: 768px) {
  .milbox_panel .imgcard_body { padding: 24px 0 }
}
</style>
