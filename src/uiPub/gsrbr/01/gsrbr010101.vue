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
                            <a href="https://www.instagram.com/gs25_official" class="btn_sns btn_sns_insta" :aria-label="t.brand.str.snsInstaAria" target="_blank"></a>
                            <a href="https://www.youtube.com/gs25" class="btn_sns btn_sns_yt" :aria-label="t.brand.str.snsYtAria" target="_blank"></a>
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


        <!-- 탭 0: CAFE25 -->
        <div v-show="depth1ActiveIdx === 0 && activeTab === 0" class="brand_panel cafe_panel">
            <figure v-if="tab1.hero" class="brand_panel_bg" :style="{ backgroundColor: '#fff' }">   
                <img :src="isMobileView && tab1.heroMo ? tab1.heroMo : tab1.hero" :alt="tab1.heroAlt || ''" width="1420" height="340" />
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
                                        :style="{ textAlign: col.align }" 
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

            <DiffQrRow v-if="tab2.qr" :title="tab2.qr.title" :desc="tab2.qr.desc" />
        </div>

        <!-- 탭 2: CHICKEN25 -->
        <!-- 탭 1: 치킨25 -->
        <div v-show="depth1ActiveIdx === 0 && activeTab === 1" class="brand_panel chicken_panel">
            <figure v-if="tab2.hero" class="brand_panel_bg">
                <img :src="isMobileView && tab2.heroMo ? tab2.heroMo : tab2.hero" :alt="tab2.heroAlt || ''" width="1420" height="340" />
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
        <!-- 탭 2: GOPIZZA -->
        <div v-show="depth1ActiveIdx === 0 && activeTab === 2" class="brand_panel gopizza_panel">
            <figure v-if="tab3.hero" class="brand_panel_bg">
                <img :src="isMobileView && tab3.heroMo ? tab3.heroMo : tab3.hero" :alt="tab3.heroAlt || ''" width="1420" height="340" />
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
                            <img v-if="pnl.image" :src="pnl.image" alt="" />
                        </div>
                        <div class="gopizza_menu_info">
                            <div class="gopizza_menu_title">
                                <strong>{{ pnl.size }}</strong>
                                <div>
                                    <span v-for="(tag, ti) in pnl.tags" :key="ti" class="gopizza_menu_tag">{{ tag }}</span>
                                </div>
                            </div>
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
                <ul v-else-if="sec.type === 'phone_grid'" class="img_grid" role="list">
                    <li v-for="(item, ii) in sec.items" :key="ii">
                        <img v-if="item.image" :src="item.image" :alt="item.alt || ''" />
                        <DiffQrRow
                            v-if="ii === 0 && tab3.qr"
                            :title="tab3.qr.title"
                            :desc="tab3.qr.desc"
                            :mobile-desc="tab3.qr.descMo"
                        />
                        <DiffQrRow
                            v-else-if="ii === 1 && tab3.link"
                            variant="gopizza"
                            :title="tab3.link.title"
                            :desc="tab3.link.desc"
                            :mobile-desc="tab3.link.descMo"
                        />
                    </li>
                </ul>
            </section>
    
           
        </div>

        <!-- depth1 = 1: 신선강화점 -->
        <div v-if="depth1ActiveIdx === 1" class="brand_panel sinsen_panel">
            <figure class="brand_panel_bg" role="img" :aria-label="sinsen.heroAlt">
                <img :src="isMobileView && sinsen.heroMo ? sinsen.heroMo : sinsen.hero" :alt="sinsen.heroAlt">
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
                <div v-if="sec.flow" class="info_card_flow">
                    <div class="info_card" v-for="item in sec.flow_cont" :key="item">
                        <strong v-if="item.flowTitle">{{ item.flowTitle }}</strong>
                        <p v-if="item.flowNote" v-html="item.flowNote"></p>
                        <ol v-if="item.flowList && item.flowList.length" class="num_list">
                            <li v-for="(line, li) in item.flowList" :key="li"><p v-html="line"></p></li>
                        </ol>
                        <img :src="isMobileView ? item.mo_img : item.img" alt="" class="sinsen_flow_img" />
                    </div>
                </div>

                <ul v-if="sec.advantageCards" class="sinsen_advantage_grid">
                    <li v-for="(card, ci) in sec.advantageCards" :key="ci" class="sinsen_advantage_card">
                        <header>
                            <strong>{{ card.title }}</strong>
                            <p v-if="card.desc" v-html="card.desc"></p>
                        </header>
                        <table v-if="card.table" class="sinsen_compare_table">
                            <thead>
                                <tr>
                                    <th v-for="(head, hi) in card.table.headers" :key="hi" scope="col">{{ head }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, ri) in card.table.rows" :key="ri">
                                    <td scope="row" v-html="row.label"></td>
                                    <td v-for="(col, coli) in row.cols" :key="coli" v-html="col"></td>
                                </tr>
                            </tbody>
                        </table>
                        <ul v-if="card.items" class="sinsen_advantage_items">
                            <li v-for="(item, ii) in card.items" :key="ii">
                                <p v-if="item.desc" v-html="item.desc"></p>
                                <figure>
                                    <img :src="isMobileView && item.imgMo ? item.imgMo : item.img" alt="" />  
                                    <figcaption v-if="item.caption">{{ item.caption }}</figcaption>
                                </figure>
                            </li>
                        </ul>
                    </li>
                </ul>
            </section>

            <DiffQrRow v-if="tab2.qr" :title="tab2.qr.title" :desc="tab2.qr.desc" />
        </div>


        <!-- 생활 서비스 -->
        <div v-show="depth1ActiveIdx === 2 && storeActiveTab === 0" class="brand_panel pop_panel">
            <!-- 3depth 탭 네비 -->
            <nav class="service_tab_wrap" ref="serviceWrapEl" role="tablist" :aria-label="t.aLifeService">
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

                <template v-if="i === 0">
                    <figure v-if="tab.hero" class="brand_panel_bg">        
                        <img :src="isMobileView && tab.heroMo ? tab.heroMo : tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                    </figure>
                    <header v-if="tab.title" class="brand_panel_title">
                        <h2 v-html="tab.title"></h2>
                        <p v-if="tab.desc" v-html="tab.desc" />
                    </header>
                    <section>
                        <div class="usage_group">
                            <h4 class="usage_group_title is_compact">{{ tab.sub_item.title }}</h4>
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
                        <img :src="isMobileView && tab.heroMo ? tab.heroMo : tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
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
                        <nav class="pop_lnb" :aria-label="t.aPopcard">
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
                                                        <source v-if="card.imgMo" media="(max-width: 1024px)" :srcset="card.imgMo" /> 
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
                                            <h4 class="usage_group_title" :class="{ is_compact: tab.retailOptions[retailSelectVal].note }">{{ tab.retailOptions[retailSelectVal].title }}</h4>
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
                        <img :src="isMobileView && tab.heroMo ? tab.heroMo : tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
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
                                :space-between="20"
                                :breakpoints="{
                                    769: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 20 }
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
                        <img :src="isMobileView && tab.heroMo ? tab.heroMo : tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
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
                        <img :src="isMobileView && tab.heroMo ? tab.heroMo : tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
                    </figure>
                    <header v-if="tab.title" class="brand_panel_title">
                        <h2 v-html="tab.title"></h2>
                        <p v-if="tab.desc" v-html="tab.desc" />
                        <ul class="list_caution">
                            <li>{{ t.hipassCharge1 }}</li>
                            <li>{{ t.hipassCharge2 }}</li>
                        </ul>
                    </header>
                    <section class="hi_pass">
                        <header class="sec_header">

                            <h3 v-html="tab.hipassStepTitle" class="h3_steps"></h3>

                        </header>
                        <Steps type="2" :items="tab.hipassSteps" />
                    </section>
                    <section class="sec_header_only">
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
                        <img :src="isMobileView && tab.heroMo ? tab.heroMo : tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
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

                <!-- 온라인몰 편의점 결제 패널  -->
                <template v-else-if="i === 7">
                    <figure v-if="tab.hero" class="brand_panel_bg">
                        <img :src="isMobileView && tab.heroMo ? tab.heroMo : tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
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
            
            <DiffQrRow v-if="tab2.qr && serviceActiveTab === 0" :title="tab2.qr.title" :desc="tab2.qr.desc" />
        </div>

        <!-- 택배&픽업 -->
        <div v-show="depth1ActiveIdx === 2 && storeActiveTab === 1" class="brand_panel delivery_panel">
            <nav class="service_tab_wrap" ref="deliveryWrapEl" role="tablist" :aria-label="t.aDelivery">
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
                            <img :src="isMobileView && tab.heroMo ? tab.heroMo : tab.hero" :alt="tab.heroAlt || ''" width="1420" height="340" />
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
                            <a :href="tab.partnerBtnText_link" target="_blank" class="btn_big primary btn_icon_arrow after">{{ tab.partnerBtnText }}</a>
                        </div>
                    </div>
                </template>
            </div>

            <DiffQrRow v-if="tab2.qr && deliveryActiveTab === 0" :title="tab2.qr.title" :desc="tab2.qr.desc" />
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

        <!-- 상생협력: 운영지원제도 -->
        <div v-show="depth1ActiveIdx === 3 && winwinActiveTab === 0" class="brand_panel winwin_panel">
            <!-- 3depth 탭 네비 -->
            <nav class="service_tab_wrap" ref="winwinWrapEl" role="tablist" :aria-label="t.aWinwin">
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
                <img :src="isMobileView && winwin.tabs[1].heroMo ? winwin.tabs[1].heroMo : winwin.tabs[1].hero" :alt="winwin.tabs[1].heroAlt || ''" width="1420" height="340" />
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
                <img :src="isMobileView && milbox.heroMo ? milbox.heroMo : milbox.hero" :alt="milbox.heroAlt || ''" width="1420" height="340" />
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
                                <a v-if="item.link" :href="item.link" target="_blank" class="imgcard_link" :aria-label="t.aLink"></a>
                            </h4>
                            <p v-if="item.desc" class="imgcard_desc" v-html="item.desc"></p>
                        </div>
                        <div v-if="item.advantages" class="info_card">
                            <strong v-if="item.advantages.title" class="info_card_title">{{ item.advantages.title }}</strong>
                            <ul class="info_list">
                                <li v-for="(adv, ai) in item.advantages.items" :key="ai">
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

        <div class="bottom_btns">
            <button class="btn_back" @click="handleBack">{{ t.backLabel }}</button>
        </div>
    </div>

    <div id="pop_store_find" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
</template>

<script setup>
import { ref, computed, defineProps, nextTick, watch, onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter, useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import Tabs from "@/components/Tabs.vue";
import Buttons from "@/components/Buttons.vue";
import DiffQrRow from "@/components/DiffQrRow.vue";

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

/* 탭 1 이미지 */
import imgHero1 from "@/assets/images/dummy/brand_bg_02.png";
import imgHero1Mo from "@/assets/images/dummy/mo/brand_bg_02_mo.png"; 
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
import imgHero2Mo from "@/assets/images/dummy/mo/differentiated_bg_03_mo.png"; 
import imgChickenLeft from "@/assets/images/dummy/chicken25_card_01.png";
import imgChickenRight from "@/assets/images/dummy/chicken25_card_02.png";

/* 탭 3 이미지 */
import imgHero3 from "@/assets/images/dummy/differentiated_bg_04.png";
import imgHero3Mo from "@/assets/images/dummy/mo/differentiated_bg_04_mo.png"; 
import imgGoben1 from "@/assets/images/dummy/gopizza_goben_01.png";
import imgGoben2 from "@/assets/images/dummy/gopizza_goben_02.png";
import imgDough from "@/assets/images/dummy/gopizza_dough.png";
import imgMenu1 from "@/assets/images/dummy/gopizza_menu_01.png";
import imgMenu2 from "@/assets/images/dummy/gopizza_menu_02.png";
import imgPhone1 from "@/assets/images/dummy/gopizza_phone_01.png";
import imgPhone2 from "@/assets/images/dummy/gopizza_phone_02.png";

/* 신선강화점 이미지 */
import imgSinsen00 from "@/assets/images/sub/gsrbr010101/brand_bg_05.png";
import imgSinsen00Mo from "@/assets/images/sub/gsrbr010101/brand_bg_05_mo.png"; 
import imgSinsen01 from "@/assets/images/sub/gsrbr010101/sinsen_01.png";
import imgSinsen02 from "@/assets/images/sub/gsrbr010101/sinsen_02.png";
import imgSinsen03 from "@/assets/images/sub/gsrbr010101/sinsen_03.png";
import imgSinsen04 from "@/assets/images/sub/gsrbr010101/sinsen_04.png";
import imgSinsen05 from "@/assets/images/sub/gsrbr010101/sinsen_05.png";
import imgSinsen06 from "@/assets/images/sub/gsrbr010101/sinsen_06.png";
import imgSinsen01Mo from "@/assets/images/sub/gsrbr010101/sinsen_01_mo.png";
import imgSinsen02Mo from "@/assets/images/sub/gsrbr010101/sinsen_02_mo.png";
import imgSinsen03Mo from "@/assets/images/sub/gsrbr010101/sinsen_03_mo.png";
import imgSinsen04Mo from "@/assets/images/sub/gsrbr010101/sinsen_04_mo.png";
import imgSinsen05Mo from "@/assets/images/sub/gsrbr010101/sinsen_05_mo.png";
import imgSinsen06Mo from "@/assets/images/sub/gsrbr010101/sinsen_06_mo.png";

/* 매장/서비스 이미지 */
import imgHero5 from "@/assets/images/sub/gsrbr010101/brand_bg_06.png";
import imgHero5Mo from "@/assets/images/dummy/mo/brand_bg_06_mo.png";
import imgHero6 from "@/assets/images/dummy/brand_bg_07.png";
import imgHero6Mo from "@/assets/images/dummy/mo/brand_bg_07_mo.png"; 
import imgHero7 from "@/assets/images/dummy/brand_bg_08.png";
import imgHero7Mo from "@/assets/images/dummy/mo/brand_bg_08_mo.png"; 
import imgHero8 from "@/assets/images/sub/gsrbr010101/brand_bg_09.png";
import imgHero8Mo from "@/assets/images/dummy/mo/brand_bg_09_mo.png"; 
import imgHero9 from "@/assets/images/sub/gsrbr010101/brand_bg_10.png";
import imgHero9Mo from "@/assets/images/dummy/mo/brand_bg_10_mo.png"; 
import imgHero10 from "@/assets/images/sub/gsrbr010101/brand_bg_11.png";
import imgHero10Mo from "@/assets/images/dummy/mo/brand_bg_11_mo.png"; 
import imgHero11 from "@/assets/images/sub/gsrbr010101/brand_bg_11-1.png";
import imgHero11Mo from "@/assets/images/sub/gsrbr010101/brand_bg_11-1_mo.png"; 
import imgHero11_1 from "@/assets/images/sub/gsrbr010101/brand_bg_11-2.png";
import imgHero11_1Mo from "@/assets/images/dummy/mo/brand_bg_12_mo.png"; 
import imgHero12 from "@/assets/images/sub/gsrbr010101/brand_bg_13.png";
import imgHero12Mo from "@/assets/images/dummy/mo/brand_bg_13_mo.png"; 
import imgMilbox01 from "@/assets/images/sub/gsrbr010101/milbox_01.png";
import imgMilbox02 from "@/assets/images/sub/gsrbr010101/milbox_02.png";
import imgPopCard1 from "@/assets/images/dummy/pop_card_01.png";
import imgPopCard2 from "@/assets/images/sub/gsrbr010101/pop_card_02.png";
import imgPopCard3 from "@/assets/images/dummy/pop_card_03.png";
import imgPopCard1Mo from "@/assets/images/dummy/mo/pop_card_01_mo.png";
import imgPopCard2Mo from "@/assets/images/sub/gsrbr010101/pop_card_02_mo.png";
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


gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const route = useRoute(); 

function openModal(event) {
    const el = event.currentTarget;
    modal.open(el.dataset.popid, el.dataset.type || "default", el);
}

const activeTab = ref(0);

const ph = (n) => Array.from({ length: n }, () => ({ brand: "", logo: null }));

const langData = {
    ko: {
        aQr: "앱 다운로드 QR코드",
        aLifeService: "생활 서비스",
        aPopcard: "팝카드 메뉴",
        aDelivery: "택배&픽업 서비스",
        aWinwin: "운영지원제도",
        aLink: "링크 바로가기",
        hipassCharge1: "* 하이플러스카드에서 출시한 모든 카드를 충전하실 수 있습니다. (http://www.hipluscard.co.kr/)",
        hipassCharge2: "* 하이패스카드(자동충전) 및 단말기를 구매하실 수 있습니다.",
        nav: {
            depth1: [
                { item: "차별화 상품" },
                { item: "신선강화점" },
                { item: "매장/서비스" },
                { item: "상생협력" },
                { item: "밀박스/스낵바\n (기업 정기 서비스)" }, 
            ],
            depth2: [
                { item: "CAFE25" },
                { item: "치킨25" },
                { item: "고피자" },
            ],
            depth2Store: [
                { item: "생활 서비스" },
                { item: "택배&픽업" },
                { item: "공공요금수납" },
            ],
            depth2Winwin: [
                { item: "운영지원제도" },
                { item: "참여제도" },
            ],
        },
        tabs: [
            {
                hero: imgHero1,
                heroMo: imgHero1Mo,
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
                qr: {
                    title: "우리동네GS 앱 다운로드",
                    desc: "우리동네GS 앱을 다운로드하고, GS25의 다양한 이벤트와 차별화 상품을 만나보세요.<br />QR코드를 스캔하면 앱 다운로드 페이지로 이동합니다.",
                },
            },
            {
                hero: imgHero2,
                heroMo: imgHero2Mo, 
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
                heroMo: imgHero3Mo, 
                heroAlt: "",
                title: "GOPIZZA",
                subtitle: "한 판의 즐거움! 한 손의 간편함! 고피자는 1인 피자의 선두 브랜드로, 빠르고 맛있는 피자를 제공합니다.<br />이제 가까운 GS25에서도 고피자의 대표 메뉴를 만나볼 수 있습니다.",
                sections: [
                    {
                        type: "img_grid",
                        title: "GS25에만 있는 고븐미니 조리 시스템",
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
                    desc: "우리동네GS 앱을 다운로드하고, 다양한 이벤트와 차별화 상품을 만나보세요.<br />QR코드를 스캔하면 앱 다운로드 페이지로 이동합니다.",  
                    descMo: "GS25의 다양한 이벤트와 차별화 상품",
                },
                link: {
                    title: "GOPIZZA 홈페이지 바로가기",
                    desc: "우리동네GS 앱을 다운로드하고, 다양한 이벤트와 차별화 상품을 만나보세요.<br />QR코드를 스캔하면 앱 다운로드 페이지로 이동합니다.", 
                    descMo: "합리적인 가격과 차별화된 맛 GOPIZZA",
                    url: "https://gopizza.kr",
                },
            },
        ],
        sinsen: {
            hero: imgSinsen00,
            heroMo: imgSinsen00Mo, 
            heroAlt: "신선강화점",
            title: "신선강화점",
            subtitle: "신선강화점은 1~2인 가구 및 근거리/소용량 쇼핑 증가 트렌드에 맞춰, 24시간 365일 한번에 장보기를 구현한 신선강화형 편의점입니다.<br /><br class=\"m_br\" />편의점의 간편함과 수퍼마켓의 신선함을 결합한 차별화 컨셉 모델로 매일매일 신선한 신선상품(과일, 채소, 정육, 수산)을 제공합니다.",
            sections: [
                {
                    title: "신선강화점 특징",
                    desc: "GS THE FRESH와 통합 구매를 통해 상품 경쟁력을 확보하여<br /> 타 편의점 대비 다양한 신선상품을 운영합니다.", 
                    features: [
                        { title: "신선한 상품",   desc: "물류부터 진열 판매까지 전 과정<br /> 콜드체인 시스템 적용으로 신선도 유지" }, 
                        { title: "합리적인 가격", desc: "GS 더프레시와의 통합 구매를 통해<br /> 합리적인 가격에 판매" },
                        { title: "소용량 소포장", desc: "1인가구 및 2~3인 가구에 적합한<br/> 소용량·소포장 상품 구성" },
                        { title: "전용 상품 브랜드", desc: "신선식품 전문 브랜드<br/> 신선특별시 운영" },
                    ],
                },
                {
                    title: "왜 GS25 신선강화점인가?",
                    desc: "업계 유일의 신선식품 전용 물류센터를 운영중이며,<br/> 파트너사에서 점포까지 전 구간 선도관리를 통해 신선상품의 신선도를 유지합니다.",
                    flow: true,
                    flow_cont:[
                        {flowTitle: "GS25 신선 배송 방식", flowNote: "신선센터를 거쳐 각 저온센터로 배송하는 구조.", flowList: ["파트너사 → 단일 센터 입고로 물류비 절감 → 가격 경쟁력 ↑", "신선 센터 입고 시 신선상품 검품을 통해 1차 선도관리 진행"], flowNote2:"파트너사 → 단일 센터 입고로 물류비 절감 → 원가 경쟁력↑. 신선 단일센터 검품 관리로 점포 입고 전 1차 선도관리 진행", img:require("@/assets/images/sub/gsrbr010101/sinsen_flow.png"), mo_img:require("@/assets/images/sub/gsrbr010101/sinsen_flow_mo.png"), alt:""}, 
                        {flowTitle: "타사 신선 배송 방식", flowNote: "신선센터를 거치지 않고 각 저온센터로 배송하는 구조", flowList: ["파트너사 → 각 저온센터 입고로 물류비 증가 → 가격 경쟁력 ↓", "각 저온센터 입고 시 신선상품 검품 및 선도관리 제약"], img:require("@/assets/images/sub/gsrbr010101/sinsen_flow2.png"), mo_img:require("@/assets/images/sub/gsrbr010101/sinsen_flow2_mo.png"), alt:""} 
                    ],
                },
                {
                    title: "신선강화점 운영의 장점",
                    advantageCards: [
                        {
                            title: "일반 편의점 대비 다양한 상품 구색",
                            desc: "신선강화 편의점 전용상품 400 ~ 500 종류<br class=\"m_br\" /> 추가 운영<br />(신선상품, 두부/나물, 조미료 등 장보기 연관상품)",
                            table: {
                                headers: ["구분", "신선상품", "공산품"],
                                rows: [
                                    {
                                        label: "상품<br />구색",
                                        cols: [
                                            "편의점 상품 +<br />전용 상품 190<br class=\"m_br\" />종류",
                                            "편의점 상품 +<br />전용 상품 220<br class=\"m_br\" />종류",
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            title: "신선상품 운영 효율화",
                            items: [
                                { desc: "전자가격 표시기 도입으로 <br class=\"p_br\"/>가격표 변경 업무 효율 증대", img: imgSinsen01, imgMo: imgSinsen01Mo },
                                { desc: "신선상품 폐기 부담 완화를 위한 <br class=\"p_br\"/>마감 할인 프린터 운영", img: imgSinsen02, imgMo: imgSinsen02Mo },
                            ],
                        },
                        {
                            title: "신선상품 전용 장비 운영",
                            desc: "냉장/상온 전용 집기를 지원하여, 타 편의점에서 운영하기<br class=\"p_br\" />어려운 신선상품(대용량 과일/정육/수산 등) 운영 가능",
                            items: [
                                { img: imgSinsen03, imgMo: imgSinsen03Mo, caption: "[냉장 전용 집기]" },
                                { img: imgSinsen04, imgMo: imgSinsen04Mo, caption: "[상온 전용 집기]" },
                            ],
                        },
                        {
                            title: "신선강화점 전용 행사 운영",
                            desc: "정기행사에 외 주 단위 신선강화점 전용 행사<br />추가 운영(신선상품 &amp; 공산품)",  
                            items: [
                                { img: imgSinsen05, imgMo: imgSinsen05Mo, caption: "[신선 전단 행사]" },
                                { img: imgSinsen06, imgMo: imgSinsen06Mo, caption: "[공산 전단 행사]" },
                            ],
                        },
                    ],
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
                            heroMo: imgHero5Mo,
                            heroAlt: "",
                            title:   "현금인출기 서비스",
                            desc:    "현금인출, 계좌이체 등 금융 서비스 외에도 프로스포츠(야구, 축구, 배구, 농구) 정규리그 입장권(즉시 입장), 에버랜드 자유이용권의 발권도 가능합니다.<br />그 밖에 하이패스 충전(신용카드 결제), 알뜰폰 판매 등 다양한 생활편의 서비스를 제공하고 있습니다.", 
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
                            desc:    "편의점캐시는 온라인 콘텐츠, 쇼핑몰, 게임캐시, 국제전화카드를 편의점에서 구입/충전할 수 있는 서비스입니다.", 
                            table: {
                                rows: [ 
                                    { head: "게임 · 상품권 · 통신", text: "(알뜰폰/국제전화/모바일 데이터) 등 다양한 서비스를 편의점에서 실시간으로 구입, 충전할 수 있는 서비스 영수증형 PIN 구입과 국제전화카드 충전 이외에 스마트폰 APP를 통한 실시간 잔액 충전 가능" },
                                    { head: "게임캐시",         text: "N코인(엔씨소프트), 넥슨, 월드 오브 워크레프트, 리그 오브 레전드, 틴캐시, 한게임, 퍼니카드, 한빛소프트 등" },
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
                            pageDesc:  "GS25는 대중교통을 이용하는 고객님을 위해 교통카드 충전 서비스를 실행하고 있습니다.<br />또한, GS25에서 상품을 구매할 수 있어 결제 수단의 편의성을 제공하고있는 유익한 서비스입니다. (복권, 로또, 토토, 택배 등 일부 상품 제외)", 
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
                                    desc:  "하나의 카드로 관리 가능한 멀티멤버십의 혜택까지!\n팝티머니는 T-money와 팝카드의 기능을 동시에\n사용할 수 있는 차별화된 서비스입니다.",  
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
                                    desc:     "멤버십팝카드는 GS ALL 포인트와 팝카드가 결합되어 GS25, GS THE FRESH에서 결제와 동시에 포인트가 적립되고, 600여 온라인 쇼핑, 게임 등에서 결제가 가능한 혜택이 많은 선불카드입니다.",  
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
                            heroMo: imgHero6Mo, 
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
                            purchaseTitle: "POSA 기프트카드 구매 방법",
                            purchaseNote:  "기프트카드별로 사용 방법이 다르므로 카드와 카드 캐리어 뒷면에 기재된 사용 방법을 참고하시고, 자세한 사항은 카드에 기재된 고객센터로 문의하시기 바랍니다.", 
                            purchaseSteps: [
                                { num: "01", title: "판매처 방문",    desc: "가까운 GS25 편의점에 방문하세요." },
                                { num: "02", title: "기프트카드 선택", desc: "원하는 브랜드의 기프트카드를 선택하세요." },
                                { num: "03", title: "사용 설명 확인",   desc: "구매하신 카드 뒷면 사용설명을<br class=\"m_br\" />잘 확인하시고 사용하세요." }, 
                                { num: "04", title: "계산",           desc: "계산대에서 계산을 완료하시면 활성화되어 사용 가능한 상태가 됩니다." },
                            ],
                            usageTitle:   "POSA 기프트카드 사용방법",
                            usageDesc:
                                '<span class="txt_warn">기프트카드별로 사용방법이 다르므로 카드와 카드 캐리어 뒷면에 기재된 사용방법을 참고</span>하시고, 자세한 사항은 카드에 기재된 고객센터로 문의하시기 바랍니다.',
                            onlineLabel:  "온라인 사용방법",
                            onlineSteps: [
                                { step: "Step 1", title: "사이트 접속 및 로그인" },
                                { step: "Step 2", title: "캐시충전" },
                                { step: "Step 3", title: "결제수단 선택" },
                                { step: "Step 4", title: "결제금액 선택" },
                                { step: "Step 5", title: "PIN번호 입력" },
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
                                    title: "신용카드와 함께\n지갑 속에 쏙!",
                                    desc:  "신용카드처럼 작아서 지갑에 보관하기 편리하며, 결제해야만 사용할 수 있기에 판매점의 관리 부담이 적습니다.",
                                },
                                {
                                    num:   "02",
                                    title: "온/오프라인\n다양한 브랜드 제공",
                                    desc:  "외식, 게임, 레저, 영화, 커피, 도서 등 오프라인과 온라인의 다양한 브랜드를 제공하기에 선물받는 사람의 기호와 특성에 따라 최고의 만족도를 함께 드릴 수 있습니다.",
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
                            desc:           "U+ 알뜰모바일과 GS25가 만나 획기적으로 낮춘 휴대폰 요금제로 GS25 편의점 및 GS25 온라인 사이트에서 유심칩 구매 가능합니다.", 
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
                                { step: "Step 1", title: "GS25 편의점에서<br />유심카드 구입" },
                                { step: "Step 2", title: "본 GS 25 요금제<br />전용 가입 사이트 접속" },
                                { step: "Step 3", title: "유심 일련번호 등록 후<br />개통 신청 (또는 전화로 개통 신청)" },
                                { step: "Step 4", title: "해피콜/개통 완료 후<br />휴대폰에 유심을 장착하면 간편 개통 끝!" },
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
                                    competitor:   "41,250원",
                                },
                                {
                                    name:         "GS25(3GB/150분)",
                                    data:         "3GB",
                                    voice:        "150분",
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
                                        "가까운 GS25에서 하이패스카드 구매", 
                                        "카드 구입비: 5,000원",
                                    ],
                                },
                                {
                                    step:    "Step 2",
                                    title:   "카드 등록 및 결제 정보 등록", 
                                    bullets: [
                                        "홈페이지에서 카드번호 및 결제정보등록<br />(계좌 or 신용카드)",
                                        "<span style=\"color: #fb6432\">카드등록 후 24시간 이후 사용 가능</span>",
                                    ],
                                },
                                {
                                    step:    "Step 3",
                                    title:   "하이패스카드 이용", 
                                    bullets: [
                                        "하이패스 단말기에 삽입하여 사용",
                                        "등록된 결제방식을 통해 자동 충전됨",
                                    ],
                                },
                                
                            ],
                            hipassChargeTitle: "하이패스 카드 충전",
                            hipassChargeDesc: "하이플러스카드에서 출시한 모든 카드 충전 가능 ('도로공사', 'EX' 기재된 카드 충전 불가)", 
                            hipassTerminalTitle: "하이패스단말기 판매",
                            hipassTerminalDesc: "한국도로공사가 인증하고 2년 연속 한국품질만족도 1위 'GPASS' 단말기 판매",
                            hipassTerminalImg:    imgHipassTerminal,
                            hipassTerminalImgAlt: "하이패스 단말기(GPASS) 이미지",
                        },
                        {
                            label:   "고속도로 미납 \n 통행료 납부",
                            hero:    null,
                            heroAlt: "",
                            title:   "고속도로 미납통행료 조회/수납서비스",
                            desc:    "국내편의점 중 최초로 고속도로 미납통행료 실시간 조회 및 납부할 수 있는 서비스입니다.",
                            serviceTitle: "서비스 장점",
                            serviceAdvantages: [
                                {
                                    num:   "01",
                                    title: "전국 GS25 편의점에서<br /> 차량번호만으로 편리하게 납부 가능",
                                    desc:  "서비스 시행 : 2019.08.23부터",
                                },
                                {
                                    num:   "02",
                                    title: "미납통행료<br /> 실시간 납부",
                                    desc:  "*법인 차량은 추후 서비스 예정",
                                },
                                {
                                    num:   "03",
                                    title: "현금, 신용카드로<br /> 납부 가능",
                                    desc:  "현금이든 신용카드든  편의에 따라 납부 가능",
                                },
                            ],
                            unpaidTitle: "고속도로 미납통행료 납부 방법",
                            unpaidSteps: [
                                { step: "Step 1", title: "GS25 편의점에게<br />납부 요청",
                                    bullets: [ 
                                        "가까운 GS25에서 하이패스 카드 구매",
                                        "카드 구입비: 5,000 원",
                                    ],
                                },
                                { step: "Step 2", title: "차량번호 입력" },
                                { step: "Step 3", title: "개인정보 제공 동의" }, 
                                { step: "Step 4", title: "생년월일 입력" },
                                { step: "Step 5", title: "결제(현금/신용카드)" },
                            ],
                        },
                        {
                            label:   "온라인몰\n편의점 결제",
                            hero:    null,
                            heroAlt: "",
                            title:   "온라인몰 편의점 결제",
                            desc:    "온라인몰(쇼핑, 게임, 항공사, 기타)에서 구매할 때 '편의점 결제'를 선택하고 문자로 수납번호나 바코드를 받아 GS25에서 현금 결제할 수 있는 서비스입니다.",
                            serviceTitle: "편의점 결제의 장점",
                            serviceAdvantages: [
                                {
                                    num:   "01",
                                    title: "보편성",
                                    desc:  "은행보다 많고 가까운 집 근처 편의점에서 24시간 결제 가능<br /><span class=\"txt_point\">전국 모든 GS25 점포에서 수납 대행</span><br />(실시간 입금 확인, 대면 거래)",
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
                                    desc:  "복잡한 공인인증서나 보안 카드가 필요 없고,<br /> 결제정보 노출 방지<br />대면 거래에 따른 전자금융사고 (스미싱) 예방",
                                },
                            ],
                            mallPaymentTitle: "편의점 결제 이용 방법",
                            mallPaymentSteps: [
                                { step: "Step 1", title: "온라인몰에서<br />상품/서비스 구매",
                                  bullets: [ 
                                      "가까운 GS25에서 하이패스 카드 구매",
                                      "카드 구입비: 5,000 원",
                                  ],
                                },
                                { step: "Step 2", title: "'편의점결제' 선택" },
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
                            heroMo: imgHero7Mo, 
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
                                { step: "Step 2", title: "물품 포장 후 GS25 방문" },
                                { step: "Step 3", title: "무인택배장비로 접수<br />(중량측정)" },
                                { step: "Step 4", title: "카운터에서 결제 후<br />물품보관함에 보관" },
                            ],
                            cautionTitle: "국내택배 유의사항",
                            cautionItems: [
                                {
                                    icon:    null,
                                    iconAlt: "사이즈 아이콘",
                                    title:   "사이즈",
                                    desc:    "가로 세로 높이의 합 160cm 이내<br />한변의 길이가 1m 이내",
                                },
                                {   
                                    icon:    null,
                                    iconAlt: "중량 아이콘",
                                    title:   "중량",
                                    desc:    "20kg 이하",
                                },
                                {
                                    icon:    null,
                                    iconAlt: "물품가액 아이콘",
                                    title:   "물품가액",
                                    desc:    "100만원 이하",
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
                            heroMo: imgHero8Mo,
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
                            heroMo: imgHero9Mo,
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
                            label: "배달 픽업",
                            hero: imgHero10,
                            heroMo: imgHero10Mo,
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
                            shoppingItems: [ { text: "제휴 쇼핑몰은 <a href=\"https://www.cvsnet.co.kr/post-service/pick-up/use/contentsid/222/index.do\" target=\"_blank\" rel=\"noopener noreferrer\">www.cvsnet.co.kr</a>에서 확인" } ],
                            partnerBtnText: "픽업 제휴쇼핑몰 확인하기",
                            partnerBtnText_link: "https://www.cvsnet.co.kr/post-service/pick-up/use/contentsid/222/index.do" 
                        },
                        {
                            label:   "쇼핑몰거래",
                            hero:    imgHero11,
                            heroMo: imgHero11Mo, 
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
                            shoppingItems: [ { text: "제휴 쇼핑몰은 <a href=\"https://www.cvsnet.co.kr/post-service/shopping-mall/use/contentsid/225/index.do\" target=\"_blank\" rel=\"noopener noreferrer\">www.cvsnet.co.kr</a>에서 확인" } ],
                            partnerBtnText: "이용가능 제휴처 확인하기",
                            partnerBtnText_link: "https://www.cvsnet.co.kr/post-service/shopping-mall/use/contentsid/225/index.do"
                        },
                    ],
                },
                {
                    hero: null,
                    heroAlt: "",
                    title: "공공요금수납 서비스",
                    desc: "지로고지서에 편의점 수납용 바코드가 있다면 GS25 편의점에서 24시간 365일 세금, 4대보험료 및 공과금의 편리한 납부가 가능한 서비스입니다.",
                    sections: [],
                    panelExtra: {
                        desc: "지로고지서에 편의점 수납용 바코드가 있다면 GS25 편의점에서 24시간 365일 세금, 4대 보험료 및 공과금의 편리한 납부가 가능한 서비스입니다.<br /> 기존지로 납부 외 휴대폰을 통한 모바일 수납도 가능하며,납부 공과금에 따라 현금과 계좌이체 및 신용카드까지 다양한 수단으로 납부 가능합니다.", 
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
                                    title: "인센티브 제도",
                                    desc: "매출 향상, 신상품 도입 등 점포 경쟁력 향상을 위해<br class=\"p_br\" /> 노력하시는 경영주님을 위한 인센티브 제도",
                                },
                                {
                                    num: "02",
                                    title: "카운터FF 운영 우수점 지원",
                                    desc: "카운터FF 매출 활성화 도모",
                                    bullets: ["치킨25 운영 지원 제도", "카페25 운영 지원 제도", "식품안심업소 취득 점포 점수 필터 지원"],
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
                                { num: "01", title: "10주년 장기운영 지원 혜택", desc: "10주년 운영 경영주님 지원",bullets: ["기념패", "건강검진 (1인권)"] },
                                { num: "02", title: "20주년 장기운영 지원 혜택", desc: "20주년 운영 경영주님 지원", bullets: ["기념패", "건강검진(2인권)", "여행상품권"] },
                                { num: "03", title: "30주년 장기운영 지원 혜택", desc: "30주년 운영 경영주님 지원", bullets: ["기념패", "건강검진(2인권)", "여행상품권","점포 세레머니 및 기념 행사"]},
                                { num: "04", title: "우수점포 경영주 포상", desc: null, bullets: ["우수점포 대상 혜택 지급"] },
                            ],
                        },
                        {
                            label: "점포\n소통 지원",
                            title: "점포 소통 지원",
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
                                { num: "03", title: "경영주 열린아카데미", desc: "경영주 역량 강화", bullets: ["월 2회 실시간 라이브 교육 운영", "다시보기 영상 제공","점포 운영에 필요한 실무 중심 콘텐츠 교육\n (노무, 세무, 가맹정산, 판촉노하우 등)"] , link: "https://gs25.getsmart.co.kr/members/login?returnUrl=http%3A%2F%2Fgs25.getsmart.co.kr%2F"},
                                { num: "04", title: "GS클래스", desc: "언제든 학습 가능한 경영주 전용 교육 사이트", bullets: ["점포 운영에 필요한 양질의 교육 콘텐츠\n (매뉴얼, 운영 노하우, 강의 다시보기 등)","온라인 라이브 교육","우수점 연구소(우수경영주, 성공사례, 팁)"] },
                                { num: "05", title: "신규 경영주 입문교육", desc: null, bullets: ["운영 교육(POS, 점포경영, 시스템","서비스 교육","온라인 교육과정(GS클래스)"] , link: "https://gs25.getsmart.co.kr/members/login?returnUrl=http%3A%2F%2Fgs25.getsmart.co.kr%2F" },
                                { num: "06", title: "스토어매니저 클래스", desc: "스토어매니저 교육 지원", bullets: ["POS 교육","청결 교육","접객서비스 교육"] , link: "http://hpimg.gsretail.com/images/gs25/winwin/web/store_manager_map.html" }, 
                                { num: "07", title: "벤치마킹 교육", desc: "경영주 역량 강화", bullets: ["우수 가맹점 현장 방문 교육","우수 가맹점별 특화된 교육 콘텐츠","우수 경영주 노하우 공유"] },
                            ],
                        },
                        {
                            label: "사회공헌\n지원",
                            title: "사회공헌 지원", 
                            notes: [
                                { text: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다." },
                            ],
                            items: [
                                { num: "01", title: "상생나눔 플랫폼 운영", desc: "사회적 약자를 위한 사회공헌형 점포 운영", bullets: ["사회취약계층 자활을 위한 내일스토어", "노인 계층 일자리를 위한 시니어스토어", "장애인의 취업과 자활을 지원하는 늘봄스토어"] },
                                { num: "02", title: "GS 히어로상", desc: "사회적으로 귀감이 되는 경영주, 스토어매니저에게 지원", bullets: ["모범상","귀감상","나눔상"] }, 
                                { num: "03", title: "화재예방 소화기 공유", desc: "점포 인근 화재발생 시 소화기 공유를 통한 화재예방", bullets: ["점포인근 화재발생 시 점포 소화기 공유", "사용 후 교환 지원"] },
                            ],
                        },
                        {
                            label: "경영주\n복지 혜택",
                            title: "경영주 복지 혜택",
                            notes: [
                                { text: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다." },
                            ],
                            items: [
                                { num: "01", title: "경조사 지원", desc: "경조금 및 용품 지원", bullets:["경조금 지급", "점포 운영 지원금 지급","장례 용품 지급", "출산 용품 지급","자연재해 위로금 지급"] },
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
                    heroMo: imgHero11_1Mo, 
                    heroAlt: "",
                    title: "참여제도",
                    desc: "GS25에서는 다양한 의견 수렴, 제안 검토 및 반영하는 등 경영주님께서 참여할 수 있는 제도가 마련되어 있습니다.",
                    items: [
                        {
                            num: "01",
                            title: "경영주 협의회",
                            desc: "지역별 경영주협의회 정기 간담회 진행",
                        },
                        {
                            num: "02",
                            title: "자율분쟁조정위원회",
                            desc: "가맹본부와 경영주 간의 분쟁이 발생 시, 위원장(외부 전문가), 경영주/본부 대표가 자율적 해결/조정안 마련",
                        },
                        {
                            num: "03",
                            title: "경영주 열린제안",
                            desc: "경영주님의 다양한 제안과 아이디어 접수를 통해 생생한 현장의 목소리를 청취하여 점포 운영 및 본부 정책에 개선 반영하고 있습니다.",
                        },
                    ],
                },
            ],
        },
        milbox: {
            hero: imgHero12,
            heroMo: imgHero12Mo, 
            heroAlt: "",
            title: "밀박스/스낵바 (기업 정기 서비스) <a href='https://www.mealbox25.com/' target='_blank'>홈페이지</a>",
            sections: [
                {
                    type: "feature",
                    title: "GS25 기업/단체 대상 정기 배송 서비스란?",
                    desc: "대한민국 대표 편의점 GS25가 가진 차별화 경쟁력을 기반으로 한 기업·단체 대상 조식/간식 정기 배송 서비스입니다.<br />사내 식당이 없거나 간식 복지 도입을 고민 중이라면, 아래 서비스를 확인해보세요.",
                    items: [
                        { title: "트렌디한 상품" },
                        { title: "합리적인 가격" },
                        { title: "누계 이용 고객사 1,200개" },
                    ],
                },
                {
                    type: "imgcard",
                    title: "서비스 소개",
                    items: [
                        {
                            img: imgMilbox01,
                            name: "밀박스25",
                            desc: "GS25에서 제공하는 기업/단체 대상 간편식 정기 제공 서비스 입니다.<br class=\"p_br\" />주식부터 디저트, 음료까지 매일 새로운 구성으로 운영 됩니다.<br class=\"p_br\" />HACCP 인증, 개별 포장으로 위생적이고 맛있는 한끼를 제공합니다.",
                            link: "https://www.mealbox25.com/mealbox25-introduce",
                            advantages: {
                                title: "이런 분들에게 추천 드립니다.",
                                items: [
                                    { text: "직원 조식/간식을 정기적으로 운영하고 싶을 때" }, 
                                    { text: "합리적인 비용으로 직원 만족도를 높이고 싶을 때" },
                                    { text: "사내 급식 인프라가 없어 간편식 공급이 필요 할 때" },
                                ],
                            },
                        },
                        {
                            img: imgMilbox02,
                            name: "스낵바",
                            desc: "GS25에서 운영하는 트렌디한 상품을 정기적으로 기업/단체에 제공하는 간식 큐레이팅 서비스입니다.<br />사내 복지 향상을 위해 GS25의 상품을 이제는 회사에서 즐기세요.", 
                            link: "https://www.mealbox25.com/Snackbar-introduce",
                            advantages: {
                                title: "이런 분들에게 추천 드립니다.",
                                items: [
                                    { text: "직원 복지 향상을 위한 간식 서비스가 필요할 때" },
                                    { text: "사내 휴게공간의 만족도를 높이고 싶을 때" },
                                    { text: "언제든 편리하게 이용 가능한 간식 복지를 운영하고 싶을 때" },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        brand: {
            visual: {
                lines: [
                    "일상생활의 중심",
                    '하루의 시작 GS25', 
                ],
                logoAlt: "GS25",
            },
            about: [
                [
                    '대한민국 토종 브랜드의 <br class="m_br" />자존심을 지키고 있는 GS25는',
                    "'수익을 낼 수 있는 가맹점을 늘린다'는 <br class=\"m_br\" />프랜차이즈 사업의 대원칙을",
                    '변함없이 지켜온 결과, <br class="m_br" />개별점 수익성이 가장 높은<br class="p_br" /> 국내 최고의<br class="m_br" /> 편의점 브랜드로 자리매김하였습니다.', 
                ],
            ],
            str: {
                title: "당신 곁에는 언제나<br />GS25가 있습니다.",
                storeFind: "매장 찾기",
                snsInstaAria: "인스타그램",
                snsYtAria: "유튜브",
                items: [ 
                    {
                        title: "업계 최고<br />점포당 매출액 달성",
                        desc: '점포 경쟁력을 강화하고<br class="m_br" /> 고객 중심의 상품·서비스 제공을 통해<br />편의점 업계 최고의 매출액을 달성하고 있습니다.',
                    },
                    {
                        title: 'GS25만의 차별화된<br class="p_br" /> 상품과<br class="m_br" /> 서비스 제공',
                        desc: '안전하고 맛있는 후레쉬푸드 상품 등 고품질의 먹거리 상품 개발과<br class="p_br" /> 좋은 품질, 합리적 가격의 PB 브랜드 \'유어스\',<br class="p_br" /> GS리테일의 전용 어플리케이션 우리동네GS 등<br class="p_br" /> 차별화된 상품과 서비스를 통해 고객에게 새로운 가치를 제공하고 있습니다.',
                    },
                    {
                        title: '경영주와의 끊임없는 소통과<br /> 협력을 통한 단단한 파트너십',
                        desc: "경영주와 본부의 파트너십 구축을 위해 다양한 소통 창구와 상생 제도를 도입하여 운영 중에 있습니다.<br /> Refresh 휴가 지원, GS25 20's Club 등을 업계 최초로 개발하여 경영주의 만족과 자부심을 높이고 있습니다.",
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
        aQr: "App download QR code"/* 260708 번역 */,
        aLifeService: "Living Services"/* 260708 번역 */,
        aPopcard: "Pop Card Menu"/* 260708 번역 */,
        aDelivery: "Delivery & Pickup Services"/* 260708 번역 */,
        aWinwin: "Operation Support System"/* 260708 번역 */,
        aLink: "Go to link"/* 260708 번역 */,
        hipassCharge1: "* You can recharge all cards issued by Hi-plus Card. (http://www.hipluscard.co.kr/)"/* 260708 번역 */,
        hipassCharge2: "* You can purchase Hi-pass cards (auto-recharge) and terminals."/* 260708 번역 */,
        nav: {
            depth1: [
                { item: "Differentiated Products" },
                { item: "Fresh Concept Store" },
                { item: "Stores/Services" },
                { item: "Win-Win Partnership" },
                { item: "Meal Box/Snack Bar\n (Corporate Subscription Service)"/* 260604 번역 */ }, 
            ],
            depth2: [
                { item: "CAFE25" },
                { item: "Chicken25" },
                { item: "GoPizza" },
            ],
            depth2Store: [
                { item: "Everyday Services" },
                { item: "Delivery & Pickup" },
                { item: "Bill and Tax Payment" },
            ],
            depth2Winwin: [
                { item: "Operations Support Programs" },
                { item: "Partner Programs" },
            ],
        },
        tabs: [
            {
                hero: imgHero1,
                heroMo: imgHero1Mo, 
                heroAlt: "",
                title: "CAFE25",
                subtitle: "It is GS25's distinctive specialty coffee zone, using top-of-the-line coffee machines and specialty blended beans to offer the finest coffee at a reasonable price."/* 260604 번역 */,
                sections: [
                    {
                        type: "cards",
                        title: "Coffee Machine",
                        desc: "We use the Franke machine, a Swiss luxury coffee brand priced at approximately KRW 13 million for consumers.",
                        cards: [
                            { image: imgCoffeeMachine01, alt: "" },
                            { image: imgCoffeeMachine02, alt: "" },
                            { image: imgCoffeeMachine03, alt: "" },
                        ],
                    },
                    {
                        type: "table",
                        title: "Coffee Beans",
                        desc: "Specialty blended beans from Dongsuh Foods, Korea's No. 1 roaster. (A blend of 5 premium bean varieties from top coffee-producing countries including Brazil, Guatemala, and Colombia)",
                        columns: [
                            { key: "country", label: "Origin",  width: 200, align: "left" },
                            { key: "ratio",   label: "Blend Ratio",  width: 160, align: "center" },
                            { key: "process", label: "Processing Method", width: 289, align: "center" },
                            { key: "feature", label: "Bean Characteristics", width: 289, align: "left" },
                        ],
                        rows: [
                            { flag: imgFlagBrazil,    country: "Brazil",      ratio: "35%", process: "Natural", feature: "Well-balanced flavor" },
                            { flag: imgFlagGuatemala, country: "Guatemala",     ratio: "30%", process: "Washed",  feature: "Rich, full body" },
                            { flag: imgFlagColombia,  country: "Colombia",     ratio: "25%", process: "Washed",  feature: "Nutty richness" },
                            { flag: imgFlagEthiopia,  country: "Ethiopia",   ratio: "5%",  process: "Washed",  feature: "Bright and lively acidity" },
                            { flag: imgFlagPapua,     country: "Papua New Guinea", ratio: "5%",  process: "Washed",  feature: "Floral and herbal aroma" },
                        ],
                    },
                    {
                        type: "image",
                        title: "CAFE25: Better Than Specialty Cafés",
                        desc: "Evaluated by the Barista Association and found to match the quality of top coffee shop chains.",
                        source: "Korea Coffee Association Sensory Evaluation Results (May 2023)",
                        image: imgCafe25Graph,
                        imageAlt: "Coffee taste comparison graph - a bar chart showing that GS25 coffee matches specialty coffee shop quality"/* 260604 번역 */,
                    },
                    {
                        type: "split",
                        title: "Menu",
                        image: imgCafeMenu,
                        imageMo: imgCafeMenuMo,
                        imageAlt: "CAFE25 Menu Image"/* 260604 번역 */,
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
                            { menu: "Iced Americano",  volume: "480", caffeine: "140" },
                            { menu: "Iced Americano",  volume: "780", caffeine: "180" },
                        ],
                    },
                ],
            },
            {
                hero: imgHero2,
                heroMo: imgHero2Mo, 
                heroAlt: "",
                title: "CHICKEN25",
                subtitle: `It is GS25's distinctive food offering, serving freshly fried foods made with the finest ingredients at a reasonable price. <br class=\"p_br\" />Now you can enjoy specialty-shop-quality chicken with CHICKEN25 at convenience stores, too.`/* 260604 번역 */,
                sections: [
                    {
                        type: "text_cards",
                        title: "Carefully selected premium ingredients, taste you can trust",
                        desc: "We offer high-quality fried chicken made with the finest ingredients, so you can enjoy every bite with complete confidence.",
                        cards: [
                            {
                                title: "Crispier, tastier fried food with clean oil",
                                desc: "Using carefully maintained clean oil, we serve chicken that is crispier and more delicious. With rigorous hygiene standards, every bite is one you can enjoy with complete peace of mind.",
                            },
                            {
                                title: "A wide selection of menu items, the joy of choosing",
                                desc: "With an even wider selection than specialty restaurants, there's something for everyone to enjoy.<br />(Whole chicken, half chicken, drumstick, wings, bone-in pieces, skewers, hot dogs, fried dumplings, etc.)",
                            },
                            {
                                title: "Always fresh, always nearby",
                                desc: "Fresh, crispy fried chicken is always just around the corner at your nearest GS25.<br />Order delivery or pickup through the Our Neighborhood GS app for an even more convenient experience at your nearby GS25.",
                            },
                        ],
                    },
                ],
                imgGrid: [
                    { image: imgChickenLeft, alt: "" },
                    { image: imgChickenRight, alt: "" },
                ],
                qr: {
                    title: "Download the Our Neighborhood GS app"/* 260604 번역 */,
                    desc: "Download the Our Neighborhood GS app and discover GS25's various events and exclusive products.<br />Scanning the QR code takes you to the app download page."/* 260604 번역 */,
                },
            },
            {
                hero: imgHero3,
                heroMo: imgHero3Mo, 
                heroAlt: "", 
                title: "GOPIZZA",
                subtitle: "The joy of a whole pizza! The convenience of one hand! GOPIZZA, the leading brand in single-serve pizza, serves fast and delicious pizza.<br />Now you can enjoy GOPIZZA's signature menu at your nearby GS25, too."/* 260604 번역 */,
                sections: [
                    {
                        type: "img_grid",
                        title: "The GOVEN MINI cooking system, exclusive to GS25",
                        images: [
                            { image: imgGoben1, alt: "" },
                            { image: imgGoben2, alt: "" },
                        ],
                    },
                    {
                        type: "image",
                        title: "Signature Dough",
                        desc: `Made with par-baked dough aged for 24 hours at a low temperature of 9°C for a crispy outside and chewy inside!<br class=\"p_br\" />GoPizza's par-baked dough, crafted with years of culinary expertise, goes through a low-temperature fermentation process to achieve the perfect balance of crispiness and chewiness.`/* 260604 번역 */,
                        image: imgDough,
                        imageAlt: "",
                    },
                    {
                        type: "menu",
                        title: "Menu",
                        desc: `From GoPizza's bestsellers to exciting new additions, enjoy your favorites at GS25 in REGULAR and GRAB sizes!<br class=\"p_br\" />For the REGULAR size, the pizza is cut into 5 pieces in a W shape, so you can easily enjoy it one slice at a time.`/* 260604 번역 */,
                        panels: [
                            {
                                image: imgMenu1,
                                size: "REGULAR (27cm)",
                                tags: ["Meal replacement"/* 260604 번역 */, "Equivalent to 4 slices of a regular pizza"/* 260604 번역 */],
                                columns: [
                                    { key: "name",  label: "Menu Name"/* 260604 번역 */,       align: "left"  },
                                    { key: "price", label: "Amount (KRW)"/* 260604 번역 */,      align: "right" },
                                    { key: "kcal",  label: "Calories (kcal)"/* 260604 번역 */, align: "right" },
                                ],
                                rows: [
                                    { name: "Potato & Bacon"/* 260604 번역 */, price: "7,900", kcal: "922",   badge: "BEST" },
                                    { name: "Cheddar Pepperoni"/* 260604 번역 */,   price: "7,900", kcal: "1,017" },
                                    { name: "Meat Cheese"/* 260604 번역 */,        price: "7,900", kcal: "945"   },
                                    { name: "Triple Cheese"/* 260604 번역 */,      price: "8,500", kcal: "1,009" },
                                ],
                            },
                            {
                                image: imgMenu2,
                                size: "GRAB (20cm)",
                                tags: ["For snacks"/* 260604 번역 */, "Equivalent to 2 slices of a regular pizza"/* 260604 번역 */],
                                columns: [
                                    { key: "name",  label: "Menu Name"/* 260604 번역 */,       align: "left"  },
                                    { key: "price", label: "Amount (KRW)"/* 260604 번역 */,      align: "right" },
                                    { key: "kcal",  label: "Calories (kcal)"/* 260604 번역 */, align: "right" },
                                ],
                                rows: [
                                    { name: "Potato & Bacon"/* 260604 번역 */, price: "3,500", kcal: "357",  badge: "BEST" },
                                    { name: "Cheddar Pepperoni"/* 260604 번역 */,   price: "3,500", kcal: "355"  },
                                    { name: "Meat Cheese"/* 260604 번역 */,        price: "3,500", kcal: "341"  },
                                    { name: "Triple Cheese"/* 260604 번역 */,      price: "3,500", kcal: "349"  },
                                ],
                            },
                        ],
                    },
                    {
                        type: "phone_grid",
                        title: `On the Our Neighborhood GS app, you get fast delivery,<br class=\"m_br\" /> Pickup available`/* 260604 번역 */,
                        items: [
                            { image: imgPhone1, alt: "" },
                            { image: imgPhone2, alt: "" },
                        ],
                    },
                ],
                qr: {
                    title: "Download the Our Neighborhood GS app"/* 260604 번역 */,
                    desc: "Download the Our Neighborhood GS app and discover GS25's various events and exclusive products.<br />Scanning the QR code takes you to the app download page."/* 260604 번역 */,
                    descMo: "GS25's diverse events and distinctive products"/* 260604 번역 */,
                },
                link: {
                    title: "Go to GOPIZZA Website"/* 260604 번역 */,
                    desc: "Find a store near you on the GOPIZZA website and experience reasonable prices and a distinctive taste.<br />Clicking the button takes you to the relevant website."/* 260604 번역 */,
                    descMo: "Reasonable prices and distinctive taste—GOPIZZA"/* 260604 번역 */,
                    url: "https://gopizza.kr",
                },
            },
        ],
        sinsen: {
            hero: imgSinsen00,
            heroMo: imgSinsen00Mo, 
            heroAlt: "Fresh Concept Store",
            title: "Fresh Concept Store",
            subtitle: "Fresh Concept Stores are designed for the growing trend of single- and two-person households and convenient, small-quantity shopping, offering one-stop grocery shopping 24 hours a day, 365 days a year. Combining the convenience of a convenience store with the freshness of a supermarket, this distinctive concept delivers fresh products (fruits, vegetables, meat, and seafood) every single day.",
            sections: [
                
                {
                    title: "GS25 Fresh Product Features"/* 260604 번역 */,
                    desc: "Through integrated purchasing with GS THE FRESH, we secure product competitiveness and offer a wider variety of fresh products than other convenience stores."/* 260604 번역 */,
                    features: [
                        { title: "Fresh Products",   desc: "Cold chain maintained from logistics all the way to the shelf, keeping every product fresh" },
                        { title: "Affordable Prices", desc: "Offered at affordable prices through joint purchasing with GS THE FRESH" },
                        { title: "Small-Quantity, Small-Portion", desc: "A small-quantity, small-portion product lineup tailored for one- to three-person households" },
                        { title: "Exclusive Product Brand", desc: "Operating fresh food specialty brand 'Sinseon Teukbyeolsi'" },
                    ],
                },
                {
                    title: "Why GS25 Fresh Concept Store?",
                    desc: "We operate the industry's only dedicated fresh product logistics center, maintaining freshness through end-to-end temperature management across the entire supply chain from suppliers to stores.",
                    flow: true,
                    flow_cont:[
                        {flowTitle: "GS25 Fresh Delivery System", flowNote: "A delivery structure that goes through the fresh center to each cold-chain center."/* 260604 번역 */, flowList: ["Partner companies → reduced logistics costs through single-center receiving → higher price competitiveness ↑", "Initial freshness management is carried out through quality inspection of fresh products upon arrival at the fresh center"]/* 260604 번역 */, flowNote2:"Partner companies → reduced logistics costs through single-center receiving → higher cost competitiveness. Initial freshness management is carried out before in-store delivery through quality inspection at the single fresh-food center."/* 260604 번역 */, img:require("@/assets/images/sub/gsrbr010101/sinsen_flow.png"), mo_img:require("@/assets/images/sub/gsrbr010101/sinsen_flow_mo.png"), alt:""}, 
                        {flowTitle: "Other companies' fresh-delivery method"/* 260604 번역 */, flowNote: "A delivery structure that goes to each cold-chain center without going through the fresh center"/* 260604 번역 */, flowList: ["Partner companies → increased logistics costs through receiving at each cold-chain center → lower price competitiveness ↓", "Constraints on quality inspection and freshness management of fresh products upon receiving at each cold-chain center"]/* 260604 번역 */, img:require("@/assets/images/sub/gsrbr010101/sinsen_flow2.png"), mo_img:require("@/assets/images/sub/gsrbr010101/sinsen_flow2_mo.png"), alt:""}, 
                    ],
                },
                {
                    title: "Advantages of Operating Fresh Concept Stores",
                    advantageCards: [
                        {
                            title: "A wider product assortment than typical convenience stores"/* 260708 번역 */,
                            desc: "Additionally offers 400–500 items exclusive to fresh concept stores<br class=\"m_br\" /><br />(fresh products and grocery-related items such as tofu, namul, and seasonings)"/* 260708 번역 */,
                            table: {
                                headers: ["Category", "Fresh Products", "Manufactured Goods"]/* 260708 번역 */,
                                rows: [
                                    {
                                        label: "Product<br />Assortment"/* 260708 번역 */,
                                        cols: [
                                            "Convenience store items +<br />190 exclusive<br class=\"m_br\" />items"/* 260708 번역 */,
                                            "Convenience store items +<br />220 exclusive<br class=\"m_br\" />items"/* 260708 번역 */,
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            title: "Improved efficiency in fresh product operations"/* 260708 번역 */,
                            items: [
                                { desc: "Increased efficiency in price-tag updates <br class=\"p_br\"/>through the introduction of electronic shelf labels"/* 260708 번역 */, img: imgSinsen01, imgMo: imgSinsen01Mo },
                                { desc: "Operating closing-discount printers <br class=\"p_br\"/>to ease the burden of fresh product disposal"/* 260708 번역 */, img: imgSinsen02, imgMo: imgSinsen02Mo },
                            ],
                        },
                        {
                            title: "Operating equipment dedicated to fresh products"/* 260708 번역 */,
                            desc: "By providing refrigerated and room-temperature dedicated fixtures, it is possible to handle fresh products <br class=\"p_br\" />that are difficult to manage at other convenience stores (bulk fruit, meat, seafood, etc.)"/* 260708 번역 */,
                            items: [
                                { img: imgSinsen03, imgMo: imgSinsen03Mo, caption: "[Refrigerated fixtures]"/* 260708 번역 */ },
                                { img: imgSinsen04, imgMo: imgSinsen04Mo, caption: "[Room-temperature fixtures]"/* 260708 번역 */ },
                            ],
                        },
                        {
                            title: "Running promotions exclusive to fresh concept stores"/* 260708 번역 */,
                            desc: "In addition to regular promotions, weekly promotions exclusive to fresh concept stores<br />are also run (fresh products &amp; manufactured goods)"/* 260708 번역 */,
                            items: [
                                { img: imgSinsen05, imgMo: imgSinsen05Mo, caption: "[Fresh flyer promotion]"/* 260708 번역 */ },
                                { img: imgSinsen06, imgMo: imgSinsen06Mo, caption: "[Manufactured goods flyer promotion]"/* 260708 번역 */ },
                            ],
                        },
                    ],
                },
            ],
        },
        store: {
            tabs: [
                {
                    hero: null,
                    heroAlt: "",
                    title: "Everyday Services",
                    subtitle: "",
                    sections: [],
                    serviceTabs: [
                        {
                            label:   "ATM Services",
                            hero:    imgHero5,
                            heroMo: imgHero5Mo, 
                            heroAlt: "",
                            title:   "ATM Services",
                            desc:    "In addition to financial services such as cash withdrawals and account transfers, you can also issue regular-season tickets for professional sports (baseball, soccer, volleyball, basketball) for immediate entry, as well as Everland day passes.<br />In addition, we provide various everyday convenience services such as Hi-Pass recharge (credit card payment) and budget mobile (MVNO) sales."/* 260604 번역 */,
                            sub_item: {
                                title: "Fee-Free Cash Withdrawal Service",
                                explain: "Zero fees on cash withdrawals from Shinhan Bank / KB Kookmin Bank / Woori Bank / Kakaobank / K bank / Toss Bank / SC First Bank / Kwangju Bank / SB Savings Bank / Samsung Securities / NH Investment & Securities accounts!"/* 260604 번역 */,
                                retail_note: "*Please note that fees may apply outside of bank business hours depending on the bank's terms. For savings banks, the fee waiver applies to withdrawals only.",
                                bank: [
                                    {name:"Shinhan Bank"/* 260604 번역 */, logo: require("@/assets/images/sub/gsrbr010101/bank_shinhan.png")},
                                    {name:"KB Kookmin Bank"/* 260604 번역 */, logo: require("@/assets/images/sub/gsrbr010101/bank_kookmin.png")},
                                    {name:"Woori Bank"/* 260604 번역 */, logo: require("@/assets/images/sub/gsrbr010101/bank_woori.png")},
                                    {name:"kakaobank", logo: require("@/assets/images/sub/gsrbr010101/bank_kakao.png")},
                                    {name:"Kbank", logo: require("@/assets/images/sub/gsrbr010101/bank_kbank.png")},
                                    {name:"toss bank", logo: require("@/assets/images/sub/gsrbr010101/bank_toss.png")},
                                    {name:"Standard Chartered SC Bank Korea"/* 260604 번역 */, logo: require("@/assets/images/sub/gsrbr010101/bank_sc.png")},
                                    {name:"Gwangju Bank"/* 260604 번역 */, logo: require("@/assets/images/sub/gsrbr010101/bank_gwangju.png")},
                                    {name:"Savings bank"/* 260604 번역 */, logo: require("@/assets/images/sub/gsrbr010101/bank_sb.png")},
                                    {name:"Samsung Securities"/* 260604 번역 */, logo: require("@/assets/images/sub/gsrbr010101/bank_samsung.png")},
                                    {name:"NH Investment & Securities"/* 260604 번역 */, logo: require("@/assets/images/sub/gsrbr010101/bank_nh.png")}
                                ]
                            }
                        },
                        {
                            label:   "Convenience Store Cash Purchase/Reload",
                            hero:    null,
                            heroAlt: "",
                            title:   "Convenience Store Cash Purchase/Reload Service",
                            desc:    "Convenience Store Cash is a service that lets you purchase or reload online content, shopping mall credits, game cash, and international calling cards at any GS25.",
                            table: {
                                rows: [
                                    { head: "Games · Gift Vouchers · Telecommunications", text: "Purchase and reload a wide range of services in real time at GS25, including budget phone, international calling, and mobile data. Receipt-type PIN purchases and international calling card reloads are available, along with real-time balance reloading via smartphone app." },
                                    { head: "Game Cash",         text: "N Coin (NCSoft), Nexon, World of Warcraft, League of Legends, Teen Cash, HanGame, Funny Card, HanbitSoft, etc." },
                                    { head: "Gift Vouchers",           text: "Culture Gift Voucher, Smart Culture Gift Voucher, Happy Money Gift Voucher, Book Culture Gift Voucher, etc." },
                                    { head: "Smartphone App Reload", text: "Nexon Play, Cultureland" },
                                    { head: "Budget Mobile",           text: "EG CARD, 7mobile, Eyes, Mobing, M-Mobile, free C/T, Iyagi Mobile, etc." },
                                    { head: "International Calling Cards",     text: "LG U+, Naray, SK broadband" },
                                    { head: "Mobile Data & Other", text: "Olleh WiFi, T Data Coupon, KT LTE Data Coupon, Daum Cash" },
                                ],
                            },
                        },
                        {
                            label:    "Transit Card\nRecharge"/* 260604 번역 */,
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
                                    bullets: ["Kumho Express"/* 260604 번역 */, "Dongbu Express"/* 260604 번역 */, "Dongyang Express"/* 260604 번역 */, "Songnisan Express"/* 260604 번역 */, "Jungang Express Co., Ltd."/* 260604 번역 */, "Samhwa Express"/* 260604 번역 */, "Cheonil Express"/* 260604 번역 */, "Hanil Express"/* 260604 번역 */],
                                    logos: [imgBus1, imgBus2, imgBus3, imgBus4, imgBus5, imgBus6, imgBus7, imgBus8],
                                },
                                subway: { title: "Subway", bullets: ["• Metropolitan area (Lines 1–9, Suin Line, Gyeongchun Line, Gyeongui Line, Jungang Line, Uijeongbu Light Rail, Bundang Line, Shinbundang Line, Airport Railroad, Incheon)", "• Daejeon (Line 1)", "• Daegu (Lines 1–2)", "• Busan (Lines 1–4, Busan-Gimhae Light Rail Transit)"] },
                                bus:    { title: "Bus",   bullets: ["• Metropolitan Area","• Daejeon Metropolitan City, Sejong City", "• Chungnam, Chungbuk (Chungju, Yeongdong, Cheongju, Okcheon, Danyang, Jecheon, Jincheon, Cheongwon, Goesan, Boeun, Eumseong)", "• Gangwon (Wonju, Hoengseong, Chuncheon, Gangneung)", "• Busan Metropolitan City, Daegu Metropolitan City, Ulsan Metropolitan City","• Gyeongnam (Changwon, Tongyeong, Geoje, Miryang, Yangsan, Haman, Sacheon, Masan, Jinhae, Jinju)","• Gyeongbuk (Pohang, Gumi, Gyeongju, Andong, Sangju, Mungyeong, Yeongju, Gimcheon, Gyeongsan, Yecheon)", "• Jeonnam (Mokpo, Yeosu, Gwangyang, Suncheon, Hwasun, Naju, Jangseong, Hampyeong, Damyang, Boseong, Yeongam, Haenam)","• Jeonbuk (Jeonju, Iksan, Gunsan, Gimje, Namwon, Gochang, Jeongeup, Jinan, Imsil, Buan)","Jeju"] },
                                inter:  { title: "Intercity Bus", bullets: ["• Metropolitan Area (excluding Seoul City Airport Bus)","South Chungcheong","• Gangwon (excluding Wonju)"] },
                            },
                            retailSelectOptions: [
                                { value: "convenience",   label: "Convenience Stores" },
                                { value: "mart",          label: "Large Marts/Retail Stores" },
                                { value: "bakery",        label: "Bakeries" },
                                { value: "coffee",        label: "Coffee/Ice Cream" },
                                { value: "fastfood",      label: "Fast Food" },
                                { value: "restaurant",    label: "Restaurants & Dining" },
                                { value: "cosmetics",     label: "Cosmetics" },
                                { value: "entertainment", label: "Entertainment" },
                                { value: "pcroom",        label: "PC Cafés (PC Bangs)" },
                                { value: "university",    label: "Universities" },
                                { value: "public",        label: "Public Facilities" },
                                { value: "tourism",       label: "Tourism" },
                                { value: "parking",       label: "Parking Lots" },
                                { value: "kiosk",         label: "Self-service kiosks" },
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
                                mart:          { title: "Large Marts/Retail Stores",  note:"* Service coming soon to select mart and express locations", items: ph(4) },
                                bakery:        { title: "Bakeries", note:"* Excluding some stores located inside marts, department stores, and rest stops", items: ph(3) },
                                coffee:        { title: "Coffee/Ice Cream",  note: "* Excluding some stores located inside marts, department stores, and rest stops", items: [
                                    { brand: "Starbucks"/* 260604 번역 */,   logo: imgBrandUsage1 },
                                    { brand: "Pascucci"/* 260604 번역 */,   logo: imgBrandUsage2 },
                                    { brand: "Baskin Robbins"/* 260604 번역 */,       logo: imgBrandUsage3 },
                                    { brand: "Jamba Juice"/* 260604 번역 */,   logo: imgBrandUsage4 },
                                    { brand: "Angel-in-us"/* 260604 번역 */, logo: imgBrandUsage5 },
                                    { brand: "Caffe Tiamo"/* 260604 번역 */, logo: imgBrandUsage6 },
                                    { brand: "Java City"/* 260604 번역 */,   logo: imgBrandUsage7 },
                                    { brand: "Coffee Bay"/* 260604 번역 */,   logo: imgBrandUsage8 },
                                    { brand: "Yogerpresso"/* 260604 번역 */, logo: imgBrandUsage9 },
                                ]},
                                fastfood:      { title: "Fast Food", note:"* Excluding some stores located inside marts, department stores, and rest stops", items: ph(3) },
                                restaurant:    { title: "Restaurants & Dining", note:"* Excluding some stores located inside marts, department stores, and rest stops", items: ph(3) },
                                cosmetics:     { title: "Cosmetics", note:"* Excluding some stores located inside marts, department stores, and rest stops", items: ph(6) },
                                entertainment: { title: "Entertainment", note:"* LOTTE CINEMA (Piccadilly), MEGABOX (Ansan), SK Wyverns (Annual Pass)", items: ph(3) },
                                pcroom:        { title: "PC Cafés (PC Bangs)",       bullets: ["• T-money PC Café"], footnote: "• Children's cards are not accepted" },
                                university: {
                                    title: "Universities",
                                    bullets: [
                                        { dt: "Campus Cafeterias", dd: "• Chungnam National University" },
                                        { dt: "Campus Stores", dd: "• Dongguk University, Baekseok University, Jeongeui Girls' Middle & High School, Konkuk Affiliated High School, Dongduk Women's University" },
                                        { dt: "Office Equipment (OA)", dd: "• Dongguk University, Seoul National University of Science and Technology, Hanyang University, Ewha Womans University, Incheon National University" },
                                        { dt: "Shuttle Bus", dd: "• Ajou University, Sungkyunkwan University" },
                                        { dt: "Other", dd: "• Vending machines (Chung-Ang University, Konyang University, Ajou University, Myongji University, etc.)<br />• Self-service lockers (Yonsei University, Kyonggi University, Myongji University, etc.)" },
                                    ],
                                },
                                public:       { title: "Public Facilities", bullets: [
                                    "• Cycling/Motorboat Racing Venues (Korea Sports Promotion Foundation)",
                                    "• Horse Racing Tracks (Korea Racing Authority)",
                                    "• Seocho-gu Office AVANCE hall meal payments",  
                                    "• Seoul City Hall Dasan Plaza civil service issuance fees",
                                    "• All Seoul City District Office civil service payments",
                                    "• Jongno-gu Community Centers, 19 locations (Gahoe-dong, Samcheong-dong, etc.)",
                                    "• Central Post Office (restaurant payments)",
                                    "• Daejeon City public bike-share 'Tashu' payments",
                                    "• Gwacheon Science Museum meals, shops, cafés, and more",
                                    "• Pohang City Hall Tax Division civil service payments (32 locations including City Hall, District Offices, and Eup/Myeon/Dong offices)",
                                    "• Food waste volume-rate billing: Gunpo-si, Uijeongbu-si, Incheon Nam-gu, Incheon Seo-gu, Wonju-si, Pohang-si, Jeju-si, Seogwipo-si, Songpa-gu, Sunchang-gun",
                                ] },
                                tourism:       { title: "Tourism",        bullets: ["• Han River Water Taxi","• City Tour Bus (5% fare discount when paying with T-money)"] },
                                parking:       { title: "Parking Lots", bullets: [
                                    "• Seoul Metropolitan Government public parking lots",
                                    "• Gangnam Facility Management Corporation off-street parking lots, Seoul (9 locations): Tancheon, Gangnam-gu Office, Gangnam Education Center, Eonbuk Elementary School, Poi Elementary School, Gaepo Public, Yeoksam 1-ro, Yeoksam 10, Daechi 3-dong Cultural Center",
                                    "• Seoul Facility Management Corporation park-and-ride lots (parking discount available when entering with T-money subway fare): Jamsil Station, Changdong Station, Guro Digital Complex Station, Gaehwasan Station, Suseo Station, Dobongsan Station, Bonghwasan Station, Suraksan Station, Hangangjin Station, Hwarangdae Station, World Cup Stadium Parking Lot",
                                    "• Seoul Sports Facility Management Office Parking Lot (Jamsil Sports Complex)",
                                    "• Seoul Dream Forest, Incheon Airport",
                                    "• Suwon Facility Management Corporation Parking Lots: City Hall 1st Ground, City Hall 2nd Ground, Seonkyeong, Yeongtong-gu Office, Yeongtong Public, Gwonseon Public, Ingye Public, Yulcheon Public, Terminal Public, Daehwanggyo Freight, Hwaseo Transfer, Sungdae Transfer, Kkotmoe Transfer, Seoryu Station Transfer, Gwanggyo Public, Manseok Park, Baekseol Public, Yeonghwa-dong, Seoryu 2-dong, Ingye-dong, Maegyo-dong, Tap-dong, Gokbanjeong-dong 1 & 2",
                                    "• Seongnam Facility Management Corporation Parking Lots: Geumgok-dong, Seohyeon-dong, Jeongja Transfer, Ori Transfer, Yatap 1st, Jungbu Elementary School, Haeoruem, Daewoncheon, Dandae Park, Bokjeong-dong, Sinheung, Taepyeong, Araesutgol, etc. (44 locations)",
                                    "• Paju Facility Management Corporation Parking Lots: Geumchon 2 Public, Geumchon 2-8 Public, Geumchon 3 Public",
                                    "• KTX Railway Station Parking Lots (Gwangmyeong Station, Cheonan/Asan Station, etc.)",
                                    "• Hi Parking lots: Chuncheon Underground, Daegu Duryu 1-banga Underground, Sujin Station Transfer, Jukjeon IOne Plaza",
                                    "• Other: World Cup Stadium, Mokdong Street, Eungbong-dong (Building), Samseong-dong Oakwood, Gangbuk Samsung Hospital, SH Corporation Parking Lot, Nuri Dream Square Parking Lot, Seoul Forest Park Parking Lot, Seoul Trade Exhibition Center Parking Lot, Dongwon Industries Building Underground Parking Lot, Incheon Economic Promotion Agency Parking Lot, GS Park24 Seoul Design High School Parking Lot",
                                    "Self-service kiosks",
                                ] },
                                kiosk:         { title: "Self-service kiosks",    bullets: ["• KTL public payphones","• Subway self-service lockers, beverage/snack vending machines, book vending machines, self-service photo booths","• Post Office self-service postal counters: Seoul Regional Postal Service, Gyeongin Regional Postal Service, Chungcheong Regional Postal Service, Gyeongbuk Regional Postal Service, Busan Regional Postal Service"] },
                                etc:           { title: "Other",        bullets: ["• Expressway rest stops: Jinyeong Rest Stop, Yeongcheon Rest Stop", "• Gagstory Mart (select locations)","• Stationery store Saekgyeonpil (select locations)", "• Video rental store Yeongwha Village (select locations)"] },
                            },
                            pageTitle: "Transit Card Reload Service (POP T-money, MYbi, Cashbee (EZL), HanPay)",
                            pageDesc:  "GS25 offers a transit card reload service for customers who use public transportation.<br />Your transit card can also be used to purchase products at GS25, making it a convenient all-in-one payment option. (Excludes some items such as lottery tickets, lotto, sports toto, and delivery services)",
                            popTitle:   "What is POP Card?",
                            popDesc:    "Now, go POP!<br />Link your POP card with various payment methods to enjoy greater rewards, smarter spending, and a more convenient experience.",
                            popExclude: "(* POP card not accepted at the following locations: D Mall, Yeongpung Bookstore Jongno, SaveZone Bucheon, Dongdaemun Hyundai City Outlet, NC Seomyeon, Hyundai City Mall Garden Five, NC Moran, Daegu E-World, Donga Shopping NC Daegu, NC Icheon, NC Dong-Suwon, NC Yatap)",
                            chargingTitle: "Transit Card Reload Service",
                            chargingItems: [
                                { name: "T-money",     img: imgTransService1 },
                                { name: "Cashbee (EZL)", img: imgTransService2 },
                                { name: "HanPay",      img: imgTransService3 },
                                { name: "iM UPay"/* 260604 번역 */,   img: imgTransService4 },
                            ],
                            chargingNote: {
                                label: "Areas where charging and payment are available"/* 260604 번역 */,
                                text:  "T-money/Cashbee (EZL): all GS25 stores / Hanpay: Jeolla-do, Gwangju Metropolitan City / iM Upay: Gyeongsangbuk-do, Daegu Metropolitan City"/* 260604 번역 */,
                            },
                            popCards: [
                                {
                                    img:   imgPopCard1,
                                    imgMo: imgPopCard1Mo,
                                    name:  "POP T-money",
                                    desc:  "Plus the benefits of multi-membership managed with a single card!\nPOP T-money is a distinctive service that lets you use the functions of\nT-money and POP Card at the same time."/* 260604 번역 */,
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
                                    desc:     "The Membership POP Card combines GS ALL Points and the POP Card, earning points the moment you pay at GS25 and GS THE FRESH. It is a benefit-rich prepaid card that can be used for payments at over 600 online shopping sites, games, and more."/* 260604 번역 */,
                                    note:     "* No transit function"/* 260604 번역 */,
                                    noteWarn: true,
                                    logos:    [{ src: imgPoint2, w: 44, h: 24 }],
                                },
                                {
                                    img:   imgPopCard3,
                                    imgMo: imgPopCard3Mo,
                                    name:  "POP Credit/Debit Card",
                                    desc:  "The POP Credit/Debit Card brings the benefits and features of POP card to your everyday spending.",
                                    logos: [],
                                },
                            ],
                        },
                        {
                            label:          "Gift\nCard"/* 260604 번역 */,
                            hero:           imgHero6,
                            heroMo: imgHero6Mo, 
                            heroAlt:        "",
                            title:          "Gift Cards",
                            desc:           "GS25 offers gift cards that can be reloaded and used at any location nationwide. Choose from a wide variety of gift cards for the cherished friends, family, and loved ones in your life. (Note: reloading and use may not be available at select stores.)",
                            brandTitle: "Featured POSA Gift Card Brands",
                            brands: [
                                { img: imgGiftCard1, name: "Google Play" },
                                { img: imgGiftCard2, name: "KT Wi-Fi" },
                                { img: imgGiftCard3, name: "TeenCash" },
                                { img: imgGiftCard4, name: "EggMoney" },
                                { img: imgGiftCard5, name: "T-Data Coupon" },
                                { img: imgGiftCard6, name: "HappyMoney" },
                                { img: imgGiftCard1, name: "Culture Gift Voucher"/* 260604 번역 */ },
                                { img: imgGiftCard2, name: "Smart Culture Gift Certificate"/* 260604 번역 */ },
                                { img: imgGiftCard3, name: "Book & Culture Gift Voucher"/* 260604 번역 */ },
                                { img: imgGiftCard4, name: "Nexon Cash"/* 260604 번역 */ },
                                { img: imgGiftCard5, name: "NCSoft" },
                                { img: imgGiftCard6, name: "Hangame" },
                                { img: imgGiftCard1, name: "Cultureland"/* 260604 번역 */ },
                                { img: imgGiftCard2, name: "Funny Card"/* 260604 번역 */ },
                                { img: imgGiftCard3, name: "Burger King"/* 260604 번역 */ },
                                { img: imgGiftCard4, name: "CGV" },
                                { img: imgGiftCard5, name: "Starbucks"/* 260604 번역 */ },
                                { img: imgGiftCard6, name: "Olleh WiFi"/* 260604 번역 */ },
                            ],
                            purchaseTitle: "How to Purchase POSA Gift Card",
                            purchaseNote:  "As usage instructions vary by gift card, please refer to the instructions on the back of the card and card carrier. For further assistance, please contact the customer service number printed on your card.",
                            purchaseImg:   imgGiftPurchase,
                            purchaseSteps: [
                                { num: "01", title: "Visit a Retailer",    desc: "Visit your nearest GS25!" },
                                { num: "02", title: "Select a Gift Card", desc: "Select a gift card from the brand you want."/* 260604 번역 */ },
                                { num: "03", title: "View Usage Instructions"/* 260604 번역 */,   desc: "Please read the instructions on the back of your card carefully before use." },
                                { num: "04", title: "Payment",           desc: "Once payment is completed at the checkout, your card will be activated and ready to use." },
                            ],
                            usageTitle:   "How to Use POSA Gift Card",
                            usageDesc:
                                'As usage instructions vary by gift card, please refer to the instructions on the back of the card and card carrier. For further assistance, please contact the customer service number printed on your card.',
                            onlineLabel:  "How to Use Online",
                            onlineSteps: [
                                { step: "Step 1", title: "Site access and login"/* 260604 번역 */ },
                                { step: "Step 2", title: "Cash Reload" },
                                { step: "Step 3", title: "Select Payment Method" },
                                { step: "Step 4", title: "Select Payment Amount" },
                                { step: "Step 5", title: "Enter the PIN" },
                            ],
                            offlineLabel: "How to Use In-Store",
                            offlineSteps: [
                                { step: "Step 1", title: "Visit a Store" },
                                { step: "Step 2", title: "Select Your Items" },
                                { step: "Step 3", title: "Present Your Gift Card" },
                                { step: "Step 4", title: "Payment Complete" },
                            ],
                            advantageTitle: "Advantages of POSA Gift Card",
                            advantages: [
                                {
                                    num:   "01",
                                    title: "Along with your credit card,\nFits right in your wallet!"/* 260604 번역 */,
                                    desc:  "Its credit card-sized design makes it easy to store in your wallet, and since it must be activated at the point of sale before use, it reduces the management burden on retailers.",
                                },
                                {
                                    num:   "02",
                                    title: "Offering a wide range of brands\nonline and offline"/* 260604 번역 */,
                                    desc:  "With a wide range of brands across dining, gaming, leisure, movies, coffee, and books, both in-store and online, you can find the perfect gift for anyone.",
                                },
                                {
                                    num:   "03",
                                    title: "Your choice, for those who know value\nA premium-design gift card"/* 260604 번역 */,
                                    desc:  "Unlike cash or conventional gift vouchers, its premium design makes the gift and the giver feel truly special.",
                                },
                                {
                                    num:   "04",
                                    title: "In-Store Pickup Service\nConvenient Shopping"/* 260604 번역 */,
                                    desc:  "As we expand to large supermarkets, major bookstores, convenience stores, and well-known franchise brands across Korea, you'll always be able to find one close by.",
                                },
                            ],
                        },
                        {
                            label:          "USIM\nplan"/* 260604 번역 */,
                            hero:           null,
                            heroAlt:        "",
                            title:          "SIM Card Plans",
                            desc:           "A groundbreaking low-cost mobile plan brought to you by U+ Budget Mobile and GS25, with SIM cards available at GS25 stores and online.",
                            advantageTitle: "Advantages of GS25 Plans",
                            advantages: [
                                { num: "01", title: "An easy-to-sign-up plan"/* 260604 번역 */, desc: "Available at your nearest GS25 and sign up easily on our dedicated website" },
                                { num: "02", title: "The lowest prices in Korea"/* 260604 번역 */,          desc: "Korea's most affordable plan: unlimited data, no limits!" },
                                { num: "03", title: "ZERO contract terms / cancellation fees"/* 260604 번역 */,    desc: "Keep your number and phone. No contracts, no cancellation fees." },
                            ],
                            phoneTitle: "Compatible Devices",
                            phones: [
                                { term: "LG U+ Mobile Phone"/* 260604 번역 */,    desc: "• LG U+ phones: All LTE phones originally activated on LG U+" },
                                { term: "SKT/KT Mobile Phone"/* 260604 번역 */,  desc: "• SKT/KT phones: LTE phones released after August 2014 (Galaxy Note 4, AKA, and later)" },
                                { term: "Foreign-made phones"/* 260604 번역 */,      desc: "Phones released after the iPhone 6, as well as other models supporting the 850 (Band 5), 2100 (Band 1), and 2600 (Band 7) frequencies. Frequencies (LTE bands) can be verified through the manufacturer."/* 260604 번역 */ },
                            ],
                            purchaseTitle: "How to Purchase and Activate a SIM Card at GS25",
                            purchaseSteps: [
                                { step: "Step 1", title: "Purchase your SIM card at a GS25 store" },
                                { step: "Step 2", title: "Visit the dedicated sign-up website <br />for this GS25 plan" },
                                { step: "Step 3", title: "Register your SIM serial number <br />and apply for activation (or call to activate)" },
                                { step: "Step 4", title: "Once your Happy Call (confirmation call from the provider) and activation are complete, insert the SIM into your phone and you're all set!" },
                            ],
                            benefitTitle: "GS25 Plan Benefits",
                            benefitCards: [
                                {
                                    img:   imgRateBenefit1,
                                    imgAlt: "",
                                    title: "Get more value on your phone bill!",
                                    desc:  "Available at your nearest GS25 and sign up easily on our dedicated website",
                                    items: ["No sign-up fee", "Maximum discount on phone bills", "No contract, no cancellation fees"],
                                },
                                {
                                    img:   imgRateBenefit2,
                                    imgAlt: "",
                                    title: "4 add-on services included for free",
                                    desc:  "Available at your nearest GS25 and sign up easily on our dedicated website",
                                    items: ["Internet access via U+ Zone Wi-Fi", "U+Box<br />Store your files<br />in the cloud", "Manner Call<br />Get notified of <br />missed calls by text", "mVOIP<br />VoiceTalk<br />Free voice calls"],
                                },
                            ],
                            introTitle: "GS25 Mobile Plan Overview",
                            planTable: {
                                productName: "Plan Name",
                                provision: "Data Allowance",
                                data: "Data",
                                voice: "Negative",
                                sms: "SMS",
                                normalPrice: "Standard Fee",
                                promoDiscount: "Promotional Discount",
                                monthlyFee: "Monthly Base Fee (with affiliated card)",
                                competitor: "Comparable Plans from Other Providers",
                            },
                            plans: [
                                {
                                    name:         "GS25 (15GB+/100 min)",
                                    data:         "15GB (continues at 3Mbps after data is used up)",
                                    voice:        "100 min",
                                    sms:          "100 SMS",
                                    normalPrice:  "KRW 47,300",
                                    discount:     "KRW 19,800",
                                    monthly:      "KRW 27,500 (KRW 12,500)",
                                    monthlyDc:    "KRW 12,500",
                                    competitor:   "KRW 65,890",
                                },
                                {
                                    name:         "GS25 (10GB/100 min)",
                                    data:         "10GB",
                                    voice:        "100 min",
                                    sms:          "100 SMS",
                                    normalPrice:  "KRW 41,800",
                                    discount:     "KRW 20,900",
                                    monthly:      "KRW 20,900",
                                    monthlyDc:    "KRW 20,900",
                                    competitor:   "KRW 45,650",
                                },
                                {
                                    name:         "GS25 (6GB/100 min)",
                                    data:         "6GB",
                                    voice:        "100 min",
                                    sms:          "100 SMS",
                                    normalPrice:  "KRW 30,000",
                                    discount:     "KRW 12,500",
                                    monthly:      "KRW 27,500 (KRW 12,500)",
                                    monthlyDc:    "KRW 27,500 (KRW 12,500)",
                                    competitor:   "KRW 41,250",
                                },
                                {
                                    name:         "GS25 (3GB/150 min)",
                                    data:         "3GB",
                                    voice:        "150 min",
                                    sms:          "100 SMS",
                                    normalPrice:  "KRW 20,900",
                                    discount:     "KRW 12,100",
                                    monthly:      "KRW 12,100",
                                    monthlyDc:    "0 KRW"/* 260604 번역 */,
                                    competitor:   "KRW 41,800",
                                },
                            ],
                        },
                        {
                            label:          "Hi-Pass Card/Terminal",
                            hero:           null,
                            heroAlt:        "",
                            title:          "Hi-Pass Service",
                            desc:           "Purchase or recharge your Hi-Pass card at GS25, 24 hours a day.",
                            hipassStepTitle:    "Hi-Pass Card (Self-Service Auto-Reload)",
                            hipassSteps: [
                                {
                                    step:    "Step 1",
                                    title:   "Purchase a Self-Service Auto-Reload Card",
                                    bullets: [
                                        "- Purchase Hi-Pass card at your nearest GS25",
                                        "- Card purchase price: KRW 5,000",
                                    ],
                                },
                                {
                                    step:    "Step 2",
                                    title:   "Register Your Card and Payment Details",
                                    bullets: [
                                        "Register your card number and payment details on the website",
                                        "- Card is ready to use 24 hours after registration",
                                    ],
                                },
                                {
                                    step:    "Step 3",
                                    title:   "How to Use Your Hi-Pass Card",
                                    bullets: [
                                        "Insert into your Hi-Pass terminal to use",
                                        "Automatically recharged via the registered payment method"/* 260604 번역 */,
                                    ],
                                },
                                
                            ],
                            hipassChargeTitle: "Hi-Pass Card Reload",
                            hipassChargeDesc: "All cards issued by Hi Plus Card can be reloaded (cards marked 'Korea Expressway Corporation' or 'EX' are not eligible)",
                            hipassTerminalTitle: "Hi-Pass Terminal Sales",
                            hipassTerminalDesc: "The 'GPASS' terminal, certified by Korea Expressway Corporation and ranked No. 1 in the Korean Standard Quality Excellence Index for two consecutive years",
                            hipassTerminalImg:    imgHipassTerminal,
                            hipassTerminalImgAlt: "Hi-Pass terminal (GPASS) image"/* 260604 번역 */,
                        },
                        {
                            label:   "Unpaid Expressway Toll Payment",
                            hero:    null,
                            heroAlt: "",
                            title:   "Expressway Unpaid Toll Inquiry and Payment Service",
                            desc:    "The first service among Korean convenience stores to offer real-time inquiry and payment of unpaid expressway tolls.",
                            serviceTitle: "Service Benefits",
                            serviceAdvantages: [
                                {
                                    num:   "01",
                                    title: "• Pay conveniently at any GS25 nationwide using your vehicle registration number only",
                                    desc:  "• Service launched: August 23, 2019",
                                },
                                {
                                    num:   "02",
                                    title: "Unpaid Tolls<br /> Real-time payment"/* 260604 번역 */,
                                    desc:  "• Real-time unpaid toll payment (corporate vehicles to be supported at a later date)",
                                },
                                {
                                    num:   "03",
                                    title: "• Accepts cash and credit card payments",
                                    desc:  "Pay by cash or credit card, whichever is more convenient"/* 260604 번역 */,
                                },
                            ],
                            unpaidTitle: "How to Pay Your Unpaid Expressway Tolls",
                            unpaidSteps: [
                                { step: "Step 1", title: "Ask a GS25 staff member to process your payment",
                                },
                                { step: "Step 2", title: "Enter your vehicle registration number" },
                                { step: "Step 3", title: "Consent to personal data sharing" },
                                { step: "Step 4", title: "Enter your date of birth" },
                                { step: "Step 5", title: "Pay (cash or credit card)" },
                            ],
                        },
                        {
                            label:   "Online Shopping In-Store Payment",
                            hero:    null,
                            heroAlt: "",
                            title:   "Online Shopping In-Store Payment",
                            desc:    "Select 'Convenience Store Payment' when shopping online (shopping, gaming, airlines, and more), receive a payment number or barcode via text, and pay in cash at GS25.",
                            serviceTitle: "Advantages of Convenience Store Payment",
                            serviceAdvantages: [
                                {
                                    num:   "01",
                                    title: "Accessibility",
                                    desc:  `Pay 24 hours a day at a neighborhood convenience store, which is closer and more plentiful than banks<br /><span class=\"txt_point\">Bill payment service available at all GS25 stores nationwide</span><br />(Real-time deposit confirmation, in-person transaction)`/* 260604 번역 */,
                                },
                                {
                                    num:   "02",
                                    title: "Cost-Effectiveness",
                                    desc:  "No separate fee charged to customers<br />No banking fees for account transfers or direct deposits"/* 260604 번역 */,
                                },
                                {
                                    num:   "03",
                                    title: "Convenience",
                                    desc:  `No need to visit a bank or have a credit card—order at an online store and complete payment (deposit) at a convenience store<br /><span class=\"txt_point\">Change can be received directly at the store</span>`/* 260604 번역 */,
                                },
                                {
                                    num:   "04",
                                    title: "Security",
                                    desc:  "No need for complicated digital certificates or security cards, and it prevents exposure of payment information<br />Electronic financial fraud from in-person transactions (smishing)<br />Prevention"/* 260604 번역 */,
                                },
                            ],
                            mallPaymentTitle: "How to Use Convenience Store Payment",
                            mallPaymentSteps: [
                                { step: "Step 1", title: "Purchase products or services at an online mall",
                                },
                                { step: "Step 2", title: "Select 'Convenience Store Payment'" },
                                { step: "Step 3", title: "Pay at your nearest GS25, any time of day" },
                                { step: "Step 4", title: "Product delivered to your home (cash reload)" },
                            ],
                            mallSiteTitle: "Available online and mobile sites"/* 260604 번역 */,
                            mallSiteNote:  "* To be continuously expanded going forward"/* 260604 번역 */,
                            mallSiteItems: [
                                { name: "11st",                  img: imgServiceDesc01 },
                                { name: "StyleShare",              img: imgServiceDesc02 },
                                { name: "NCSoft",                img: imgServiceDesc03 },
                                { name: "PowerCall Air & Shopping",        img: imgServiceDesc04 },
                                { name: "T'way Air",              img: imgServiceDesc05 },
                                { name: "Unicomz (LG U+ Budget Provider)", img: imgServiceDesc06 },
                            ],
                        },
                    ],
                },
                {
                    hero:     null,
                    heroAlt:  "",
                    title:    "Delivery & Pickup",
                    subtitle: "",
                    sections: [],
                    serviceTabs: [
                        {
                            label:   "Domestic Delivery",
                            hero:  imgHero7,
                            heroMo: imgHero7Mo,
                            heroAlt: "",
                            title:   "Domestic Delivery Service",
                            desc:    "Delivery services are available 365 days a year, 24 hours a day at your nearest GS25.",
                            notes: [
                                {
                                    text: `We provide reasonable shipping rates based on weight measurement.<br class=\"m_br\" />(From 3,400 KRW)`/* 260604 번역 */,
                                    sub:  "* Effective April 1, 2025"/* 260604 번역 */,
                                },
                                {
                                    text: "* SMS updates provided at every stage of delivery, from drop-off to completion.",
                                },
                                {
                                    text: "* GS Postbox members can participate in exclusive events and enjoy tier-based rewards based on usage.",
                                },
                            ],
                            stepTitle: "How to Use Domestic Delivery",
                            steps: [
                                { step: "Step 1", title: "Reserve your drop-off via the website or mobile app" },
                                { step: "Step 2", title: "Package your item and visit your nearest GS25" },
                                { step: "Step 3", title: "Drop off at the self-service kiosk (weight measured automatically)" },
                                { step: "Step 4", title: "Pay at the counter and store your package in the locker" },
                            ],
                            cautionTitle: "Domestic Delivery Precautions",
                            cautionItems: [
                                {
                                    // icon: imgCautionSize,
                                    icon:    null,
                                    iconAlt: "Size icon"/* 260604 번역 */,
                                    title:   "Size"/* 260604 번역 */,
                                    desc:    "Total dimensions (L + W + H) within 160 cm<br />No single side exceeding 1 m",
                                },
                                {
                                    // icon: imgCautionWeight,
                                    icon:    null,
                                    iconAlt: "Weight icon"/* 260604 번역 */,
                                    title:   "Weight"/* 260604 번역 */,
                                    desc:    "Up to 20 kg"/* 260604 번역 */,
                                },
                                {
                                    // icon: imgCautionPrice,
                                    icon:    null,
                                    iconAlt: "Item Value Icon"/* 260604 번역 */,
                                    title:   "Item Value"/* 260604 번역 */,
                                    desc:    "Up to 1 million KRW"/* 260604 번역 */,
                                },
                            ],
                            priceTitle: "Domestic Delivery Rates",
                            priceItems: [
                                {
                                    text: "Starting from a minimum of 3,400 won, with rates applied based on weight and distance"/* 260604 번역 */,
                                    subs: [
                                        "Varies depending on same region/other region/Jeju region"/* 260604 번역 */,
                                        "(For letters and documents, rates are calculated in accordance with postal law regulations)",
                                    ],
                                },
                                { text: "- Cash-on-delivery (COD) surcharge: KRW 300" },
                                { text: "- Island and remote area delivery surcharge: KRW 4,000" },
                                { text: "- High-value items (over KRW 500,000) surcharge: KRW 2,500" },
                            ],
                            periodTitle: "Domestic Delivery Usage Period"/* 260604 번역 */,
                            periodItems: [
                                { text: "- Drop off by 5 PM on weekdays (3 PM for select city, county, and district areas and parts of Gyeonggi) or by 12 PM on Saturdays for next-day delivery" },
                                { text: "- Drop-off only on Sundays and public holidays" },
                                { text: "- Cut-off times may vary by store" },
                            ],
                        },
                        {
                            label: "Half-Price Delivery",
                            hero: imgHero8,
                            heroMo: imgHero8Mo,
                            heroAlt: "",
                            title: "Half-Price Delivery Service",
                            desc: "First in the convenience store industry! Korea's only public holiday delivery service! Send from GS25, receive at GS25 — at the lowest price.",
                            notes: [
                                {
                                    text: "* A convenience store first! Drop off and pick up at any convenience store.",
                                },
                                {
                                    text: "* Rates based on weight only, regardless of distance.",
                                },
                                {
                                    text: "* SMS updates provided at every stage of delivery, from drop-off to completion.",
                                },
                            ],
                            stepTitle: "How to Use Half-Price Delivery",
                            steps: [
                                { step: "Step 1", title: "Reserve your drop-off via the website or mobile app", bullets: ["Select and enter a pickup store"/* 260604 번역 */] },
                                { step: "Step 2", title: "Package your item and visit your nearest GS25" },
                                { step: "Step 3", title: "Drop off at the self-service kiosk (weight measured automatically)" }, 
                                { step: "Step 4", title: "After payment at counter, hand over to staff" },
                            ],
                            priceTable: {
                                title: "Half-Price Delivery Rates",
                                desc:  "Prepayment only",
                                note:  "Planned for continued expansion in the future"/* 260604 번역 */,
                                columns: [
                                    { label: "Category" },
                                    { label: "Inland↔Inland / Jeju↔Jeju", labelMo: "Inland↔Inland / Jeju↔Jeju" },
                                    { label: "Jeju↔Inland / Inland↔Island", labelMo: "Jeju↔Inland / Inland↔Island" },
                                ],
                                colWidths: ["18.87%", "40.56%", "40.56%"],
                                rows: [
                                    {
                                        cells: [
                                            "Rates",
                                            "~500g: KRW 1,900 / ~1kg: KRW 2,300 / ~5kg: KRW 2,700",
                                            "~500g: KRW 3,600 / ~1kg: KRW 4,000 / ~5kg: KRW 4,400",
                                        ],
                                    },
                                ],
                            },
                            infoTable: {
                                title: "Half-Price Delivery Guide",
                                colWidths: ["136px", "auto"],
                                rows: [
                                    { head: "How to Reserve",    text: "When making a Half-Price Delivery reservation, select a GS25 store as the destination" },
                                    { head: "Service Area", text: "GS25 ↔ GS25" },
                                    { head: "How to Pick Up",    text: "Present the QR code received via KakaoTalk to store staff" },
                                    { head: "Delivery Time",
                                        items: [
                                            "Mainland-to-mainland, Jeju-to-Jeju: within 4 days including the day of receipt; within the same region, 2-3 days"/* 260604 번역 */,
                                            "Jeju ↔ mainland: within 5–7 days including the receipt date"/* 260604 번역 */,
                                        ],
                                        note: [
                                            "* Delivery available on weekends/holidays"/* 260604 번역 */,
                                            "* Half-Price Delivery between the mainland and Jeju is completed within 7 days, including the day of receipt."/* 260604 번역 */,
                                            "* Delivery times may be extended if ferry operations are suspended due to weather conditions or if the ferry schedule changes."/* 260604 번역 */,
                                        ],
                                    },
                                ],
                            },
                            cautionTitle: "Half-Price Delivery Precautions",
                            cautionItems: [
                                { icon: null, iconAlt: "Closing Time Icon"/* 260604 번역 */,   title: "Closing Time"/* 260604 번역 */,          desc: "Same-day pickup cut-off time<br />9:00 AM" },
                                { icon: null, iconAlt: "Specification Icon"/* 260604 번역 */,       title: "Oversized items cannot be collected", desc: "Sum of three sides within 80 cm"/* 260604 번역 */ },
                                { icon: null, iconAlt: "Weight icon"/* 260604 번역 */,       title: "Weight"/* 260604 번역 */,              desc: "Up to 5 kg"/* 260604 번역 */ },
                                { icon: null, iconAlt: "Item Value Icon"/* 260604 번역 */,   title: "Item Value"/* 260604 번역 */,          desc: "Up to 500,000 KRW"/* 260604 번역 */ },
                            ],
                        },
                        {
                            label: "International Delivery",
                            hero:    imgHero9,
                            heroMo: imgHero9Mo, 
                            heroAlt: "",
                            title: "International Delivery Service",
                            desc: "Drop off your international deliveries at your nearest GS25, 24 hours a day, 365 days a year. (SF Express, EMS, DHL)",
                            notes: [
                                {
                                    text: "* International delivery reservations and drop-offs are available 24 hours a day at any GS25.",
                                },
                                {
                                    text: "* Choose your courier provider (SF Express, EMS, or DHL) when making your reservation.",
                                },
                                {
                                    text: "* SMS updates provided at every stage of delivery, from drop-off to completion.",
                                },
                            ],
                            noticeTitle:"How to Use International Delivery",
                            noticeItems: [
                                { step: "Step 1", title: "Reserve your drop-off via the website or mobile app", bullets: ["Member, written in English"/* 260604 번역 */] },
                                { step: "Step 2", title: "Package your item and visit your nearest GS25", },
                                { step: "Step 3", title: "Drop off at the self-service kiosk (weight measured automatically)"},
                                { step: "Step 4", title: "Pay at the counter and store your package in the locker"},
                            ],
                            chargeTitle: "International Delivery Rates and Available Destinations",
                            chargeItems: [
                                { text: "Rates and available destinations vary by courier provider. Check rates when making a reservation via the website or mobile app." },
                                { text: "Prepayment only" },
                                { text: "- Cut-off times may vary by store" },
                            ],
                            methodTitle: "International Delivery Process",
                            methodItems: [
                                { text: "- Drop off by 5 PM on weekdays (3 PM for select city, county, and district areas and parts of Gyeonggi) or by 12 PM on Saturdays. Packages are collected by CJ Logistics and handed off to your chosen courier provider the next day for overseas dispatch." },
                                { text: "- Drop-off only on Sundays and public holidays" },
                                { text: "- Cut-off times may vary by store" },
                            ],
                        },
                        {
                            label: "Delivery & Pickup", 
                            hero: imgHero10,
                            heroMo: imgHero10Mo,
                            heroAlt: "",
                            title: "Pick-up Service",
                            desc: "After ordering products from an online shopping mall, pick them up at your nearest GS25.",
                            notes: [
                                {
                                    text: "* Pick up at your chosen store at your own convenience, with no risk of missed delivery.",
                                },
                                {
                                    text: "* Receive an SMS notification when your item is ready for pickup.",
                                },
                            ],
                            pickupTitle: "How to use pickup"/* 260604 번역 */,
                            pickupItems: [
                                { step: "Step 1", title: "Select 'Convenience Store Pick-up' as your delivery method", bullets: ["Member, written in English"/* 260604 번역 */] },
                                { step: "Step 2", title: "Select your nearest GS25"},
                                { step: "Step 3", title: "Receive your arrival SMS and visit your GS25 to collect"},
                            ],
                            shoppingTitle: "Pick-up Service Partner Malls",
                            shoppingItems: [ { text: "View partner malls at www.cvsnet.co.kr" } ],
                            partnerBtnText: "View Pick-up Partner Malls >",
                            partnerBtnText_link: "https://www.cvsnet.co.kr"
                        },
                        {
                            label:   "Online Shopping Payment",
                            hero:    imgHero11,
                            heroMo: imgHero11Mo,
                            heroAlt: "",
                            title:   "Online Shopping Service",
                            desc:    "A convenient service for home shopping returns, open marketplace purchases, and online shopping mall transactions.",
                            notes: [
                                { text: "*Available 365 days a year, 24 hours a day. Simply visit your nearest GS25 at a time that suits you." },
                            ],
                            pickupTitle: "How to Use",
                            pickupItems: [
                                { step: "Step 1", title: "Obtain an approval number from the partner company and visit your nearest GS25", bullets: ["Member, written in English"/* 260604 번역 */]},
                                { step: "Step 2", title: "Enter the approval number at the self-service kiosk" },
                                { step: "Step 3", title: "Print your shipping label and submit" },
                            ],
                            shoppingTitle: "Available Partner Companies",
                            shoppingItems: [ { text: "View partner malls at www.cvsnet.co.kr" } ],
                            partnerBtnText: "View All Partner Companies >",
                            partnerBtnText_link: "https://www.cvsnet.co.kr"
                        },
                    ],
                },
                {
                    hero: null,
                    heroAlt: "",
                    title: "Bill and Tax Payment Service",
                    desc: "If your giro bill has a convenience store payment barcode, this service lets you conveniently pay taxes, four major insurance premiums, and utility bills at GS25 convenience stores 24 hours a day, 365 days a year."/* 260604 번역 */,
                    sections: [],
                    panelExtra: {
                        desc: "If your Giro (billing notice) includes a convenience store payment barcode, you can pay taxes, four major insurance premiums, and utility bills at any GS25, 24 hours a day, 365 days a year. Mobile payments via smartphone are also available in addition to standard Giro payments, with cash, bank transfer, and credit card accepted depending on the type of bill.",
                    },
                    taxTitle: "Payable Taxes and Utility Bills",
                    taxGroups: [
                        {
                            subtitle: "Taxes",
                            isList: true,
                            items: [
                                "National taxes (income tax, corporate tax, VAT, inheritance tax, gift tax, individual consumption tax, comprehensive real estate tax)",
                                "Seoul and Busan local taxes (acquisition tax, registration tax, property tax, vehicle tax, resident tax, water and sewage charges, bus-only lane violation fines, etc.)",
                                "Other local taxes (Seongnam, Anyang, Yongin, Ansan, Goyang, Uijeongbu, Gwacheon, Yangju, Dongducheon, Paju, Chuncheon, Jecheon, Boryeong, and Eumseong County — acquisition tax, registration tax, property tax, resident tax, vehicle tax, etc.)",
                            ],
                        },
                        {
                            subtitle: "Four Major Insurance Premiums",
                            items: [
                                "National Health Insurance, National Pension, Employment Insurance, and Industrial Accident Compensation Insurance (four major integrated social insurance premiums)",
                            ],
                        },
                        {
                            subtitle: "Utility Bills",
                            items: [
                                "Electricity bills, city gas charges (Seoul Gas, Samchully, Seorabeol, Incheon Gas, Gyeongnam Gas, Kyungdong City Gas), telecommunications charges (KT, LG U+, SKT), cable TV charges (HCN, T-broad, C&M, CMB, SkyLife, Areum Broadcasting, Chungbuk Broadcasting, Nam-Incheon Broadcasting, Geumgang Broadcasting, Pureun Broadcasting, etc.), newspaper bills (Chosun Ilbo, Maeil Business Newspaper), Korea Expressway Corporation fines, etc.",
                            ],
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
                            label: "Store Operations Support Benefits",
                            title: "Store Operations Support Benefits",
                            notes: [
                                { text: "※ The above benefits and programs are subject to change, discontinuation, or addition without prior notice." },
                            ],
                            items: [
                                {
                                    num: "01",
                                    title: "Incentive program"/* 260604 번역 */,
                                    desc: "An incentive program for store owners committed to improving store competitiveness through sales growth, new product introductions, and more",
                                },
                                {
                                    num: "02",
                                    title: "Outstanding Counter FF Store Support",
                                    desc: "Driving Counter FF Sales Growth",
                                    bullets: ["CHICKEN25 operation support program"/* 260604 번역 */, "CAFE25 operation support program"/* 260604 번역 */, "Filter support for stores that have obtained Food Safety Store certification"/* 260604 번역 */],
                                },
                                {
                                    num: "03",
                                    title: "Recruitment Platform Support",
                                    desc: "Staff Recruitment Support for Store Managers",
                                    bullets: ["Albamon Support", "Partner Platform Support"],
                                },
                                {
                                    num: "04",
                                    title: "Win-Win Support Insurance",
                                    desc: "An industry-leading comprehensive insurance support program",
                                    bullets: ["Personal Injury and Embezzlement Insurance", "Delivery Theft and Cash Theft Insurance"],
                                },
                                {
                                    num: "05",
                                    title: "Franchisee Win-Win Loan",
                                    desc: "Preferential interest rate available for credit and collateral loans",
                                    bullets: ["Woori Bank Partnership Loan", "Additional preferential interest rate available"],
                                },
                            ],
                        },
                        {
                            label: "Long-Term and Outstanding Store Benefits",
                            title: "Long-Term and Outstanding Store Benefits",
                            notes: [
                                { text: "※ The above benefits and programs are subject to change, discontinuation, or addition without prior notice." },
                            ],
                            items: [
                                { num: "01", title: "10-Year Long-Term Operation Support Benefits"/* 260604 번역 */, desc: "Support for Owners Operating for 10 Years"/* 260604 번역 */,bullets: ["Commemorative Plaque", "Health Checkup"] },
                                { num: "02", title: "20-Year Long-Term Operation Support Benefits"/* 260604 번역 */, desc: "Support for Owners Operating for 20 Years"/* 260604 번역 */, bullets: ["Commemorative Plaque", "Health Checkup", "Travel Gift Voucher"] },
                                { num: "03", title: "30-Year Long-Term Operation Support Benefits"/* 260604 번역 */, desc: "Support for Owners Operating for 30 Years"/* 260604 번역 */, bullets: ["Commemorative Plaque", "Health Checkup", "Travel Gift Voucher","Store ceremonies and commemorative events"/* 260604 번역 */]},
                                { num: "04", title: "Outstanding Store Owner Awards", desc: null, bullets: ["- Benefits for Outstanding Stores"] },
                            ],
                        },
                        {
                            label: "Store\ncommunication support"/* 260604 번역 */, 
                            title: "Store communication support"/* 260604 번역 */,
                            notes: [
                                { text: "※ The above benefits and programs are subject to change, discontinuation, or addition without prior notice." },
                            ],
                            items: [
                                { num: "01", title: "Happy Call Center Operations (24/7)", desc: "24-Hour Communication Channel" , bullets: ["Facilities"/* 260604 번역 */, "IT systems"/* 260604 번역 */, "Suggestions", "Other Inquiries"]},
                                { num: "02", title: "Free Legal Consultation Service", desc: "Free Legal Consultation with a Licensed Attorney", bullets: ["Civil and Criminal", "Family and Administrative"] },
                                { num: "03", title: "Labor Consultation Hotline", desc: "Comprehensive labor consultation services available", bullets: ["Careers"/* 260604 번역 */,"Four Major Insurance Premiums","Overall Labor Relations"] },
                            ],
                        },
                        {
                            label: "Competency Development Support (Store Owners and Store Managers)",
                            title: "Competency Development Support (Store Owners and Store Managers)",
                            notes: [
                                { text: "※ The above benefits and programs are subject to change, discontinuation, or addition without prior notice." },
                            ],
                            items: [
                                { num: "01", title: "GS25 Chatbot Joy", desc: "A KakaoTalk chatbot service <br />for GS25 operations support" , bullets: ["24/7 response", "Inventory and logistics inquiry", "Store operations manual", "Mobile Happy Call registration"], link: "https://pf.kakao.com/_xmTxexcb?from=qr" },
                                { num: "02", title: "Mobile Store Management", desc: "A communication app supporting store operations <br />between store owners and store managers", bullets: ["Exclusive app for store owners and store managers", "Service check time", "Expiration date management","Daily task management", "Notifications"] },
                                { num: "03", title: "Owners' Open Academy"/* 260604 번역 */, desc: "Store Owner Professional Development", bullets: ["Hosting real-time live training twice a month"/* 260604 번역 */, "Replay videos provided"/* 260604 번역 */,"Practical, hands-on training content needed for store operations\n (labor, taxation, franchise settlement, promotion know-how, etc.)"/* 260604 번역 */] , link: "https://gs25.getsmart.co.kr/members/login?returnUrl=http%3A%2F%2Fgs25.getsmart.co.kr%2F"},
                                { num: "04", title: "GS Class"/* 260604 번역 */, desc: "A dedicated training site for store owners, available to learn anytime"/* 260604 번역 */, bullets: ["High-quality training content needed for store operations\n (manuals, operational know-how, lecture replays, etc.)"/* 260604 번역 */,"Online live training"/* 260604 번역 */,"Outstanding Store Lab"] },
                                { num: "05", title: "Onboarding Training for New Store Owners", desc: null, bullets: ["- Operations Training (POS, Store Management, Systems)","- Service Training","- Online courses (GS Class)"] , link: "https://gs25.getsmart.co.kr/members/login?returnUrl=http%3A%2F%2Fgs25.getsmart.co.kr%2F" },
                                { num: "06", title: "Store Manager Class", desc: "Store Manager Training Support", bullets: ["POS Training","Cleanliness Training","Customer Service Training"] , link: "http://hpimg.gsretail.com/images/gs25/winwin/web/store_manager_map.html" }, 
                                { num: "07", title: "Benchmarking Training"/* 260604 번역 */, desc: "Store Owner Professional Development", bullets: ["On-site visit training for outstanding franchise stores"/* 260604 번역 */,"Specialized training content tailored to each outstanding franchise store"/* 260604 번역 */,"Sharing the know-how of outstanding store owners"/* 260604 번역 */] },
                            ],
                        },
                        {
                            label: "Social Contribution\nSupport"/* 260604 번역 */,
                            title: "Community Contribution Support", 
                            notes: [
                                { text: "※ The above benefits and programs are subject to change, discontinuation, or addition without prior notice." },
                            ],
                            items: [
                                { num: "01", title: "Mutual Growth & Sharing Platform Operations", desc: "Community-serving stores <br />for the socially vulnerable", bullets: ["Naeil Store, supporting the self-reliance of socially vulnerable groups"/* 260604 번역 */, "Senior Stores providing jobs for the elderly"/* 260604 번역 */, "Neulbom Store, supporting the employment and self-reliance of people with disabilities"/* 260604 번역 */] },
                                { num: "02", title: "GS Hero Award", desc: "Recognition and support for store owners and managers <br />who serve as community role models", bullets: ["Exemplary Award","Role Model Award","Community Spirit Award"] }, 
                                { num: "03", title: "Fire Prevention: Fire Extinguisher Sharing", desc: "Fire prevention through fire extinguisher sharing <br />when fires break out near the store", bullets: ["Fire extinguisher sharing when a fire breaks out near the store", "Replacement support after use"] },
                            ],
                        },
                        {
                            label: "Store Owner Benefits and Welfare",
                            title: "Store Owner Benefits and Welfare",
                            notes: [
                                { text: "※ The above benefits and programs are subject to change, discontinuation, or addition without prior notice." },
                            ],
                            items: [
                                { num: "01", title: "Congratulations & Condolences Support", desc: "Congratulations & Condolences Allowances and Supplies", bullets:["- Congratulations & Condolences allowance", "- Store operation subsidy","- Funeral supplies", "- Maternity supplies","Provision of natural disaster relief funds"/* 260604 번역 */] },
                                { num: "02", title: "Voluntary Leave for Holidays and Congratulations & Condolences", desc: "Voluntary leave available", bullets: ["- Holiday closure and reduced hours","- Congratulations & Condolences closure and reduced hours"] },
                                { num: "03", title: "Store Owner Welfare Mall", desc: "Welfare mall exclusively for store owners", bullets: ["Competitive prices", "Exclusive products", "Special deals"] },
                                { num: "04", title: "Comprehensive Health Checkup Discount", desc: "Discounted comprehensive health checkup <br />at affiliate health checkup centers", bullets: ["KMI Center","Affiliate Hospitals"] },
                                { num: "05", title: "Angel Resort", desc: "Angel Resort member rates available", bullets: ["Hanwha Resort", "ELYSIAN Resort GANGCHON"] },
                                { num: "06", title: "Exclusively for GS25 Store Owners", desc: "Angel Rental Car (Long-Term / Used Vehicles)<br />Exclusively for GS25 Store Owners", bullets: ["Affiliate rate quotes available", "Fast delivery across all vehicle types","Dedicated consultation channel"] },
                            ],
                        },
                    ],
                },
                {
                    hero: imgHero11_1,
                    heroMo: imgHero11_1Mo, 
                    heroAlt: "",
                    title: "Partner Programs",
                    desc: "GS25 has systems in place that allow owners to participate, such as gathering diverse opinions and reviewing and reflecting suggestions."/* 260604 번역 */,
                    items: [
                        {
                            num: "01",
                            title: "Store Owner Council",
                            desc: "Holding regular meetings of regional store owners' councils"/* 260604 번역 */,
                        },
                        {
                            num: "02",
                            title: "Independent Dispute Resolution Committee",
                            desc: "- In the event of a dispute between the franchisor and store owners, the chairperson (an external expert) and representatives from both parties work together to reach an independent resolution or mediation",
                        },
                        {
                            num: "03",
                            title: "Store Owner Open Suggestion",
                            desc: "By accepting various suggestions and ideas from store owners, GS Retail listens to real on-site voices and reflects improvements in store operations and headquarters policies.",
                        },
                    ],
                },
            ],
        },
        milbox: {
            hero: imgHero12,
            heroMo: imgHero12Mo,
            heroAlt: "",
            title: "Meal Box/Snack Bar (Corporate Subscription Service) <a href='https://www.mealbox25.com/' target='_blank'>Website</a>"/* 260604 번역 */,
            sections: [
                {
                    type: "feature",
                    title: "What Is the GS25 Corporate and Group Regular Delivery Service?",
                    desc: "A regular breakfast and snack delivery service for corporations and groups, powered by the unique strengths of GS25, Korea's leading convenience store.<br />If you have no in-house cafeteria or are considering introducing snack benefits, check out the services below."/* 260604 번역 */,
                    items: [
                        { title: "Trendy products"/* 260604 번역 */ },
                        { title: "Affordable Prices" },
                        { title: "Cumulative client companies: 1,200"/* 260604 번역 */ },
                    ],
                },
                {
                    type: "imgcard",
                    title: "About the service"/* 260604 번역 */,
                    items: [
                        {
                            img: imgMilbox01,
                            name: "Meal Box 25",
                            desc: "A regular meal delivery service for corporations and groups, provided by GS25. Featuring a fresh new lineup every day, from staple dishes to desserts and beverages. With HACCP certification and individual packaging, every meal is hygienic and delicious.",
                            link: "https://www.mealbox25.com/mealbox25-introduce",
                            advantages: {
                                title: "Recommended for:",
                                items: [
                                    { text: "When you want to regularly provide breakfast and snacks for your employees" }, 
                                    { text: "When you want to increase employee satisfaction at a reasonable cost" },
                                    { text: "When there is no in-house cafeteria infrastructure and ready-made meal supply is required" },
                                ],
                            },
                        },
                        {
                            img: imgMilbox02,
                            name: "Snack bar"/* 260604 번역 */,
                            desc: "A curated snack service that regularly delivers on-trend GS25 products to corporations and groups. Bring GS25 to your office and elevate your employee welfare benefits.",
                            advantages: {
                                title: "Recommended for:",
                                items: [
                                    { text: "When snack services are needed to enhance employee welfare" },
                                    { text: "When looking to improve satisfaction in in-house break rooms" },
                                    { text: "When seeking to operate a snack welfare program that is conveniently accessible at any time" },
                                ],
                            },
                        },
                    ],
                },
            ],
        },
        brand: {
            visual: {
                lines: [
                    "The center of everyday life"/* 260604 번역 */,
                    'At the Center of Daily Life, Where Your Day Begins – GS25',
                ],
                logoAlt: "GS25",
            },
            about: [
                [
                    'of a homegrown Korean brand <br class="m_br" />GS25, which upholds its pride,'/* 260604 번역 */,
                    `of 'increasing the number of profitable franchise stores' <br class=\"m_br\" />the fundamental principles of the franchise business`/* 260604 번역 */,
                    `As a result of upholding it without change, <br class="m_br" />Korea's leading company with the highest profitability for newly developed stores<br class="m_br" /> as a convenience store brand <br class="p_br" />has established itself.`/* 260604 번역 */,
                ],
                [
                    "Ranked No. 1 as 'Korea's Most Admired Company' for 16 consecutive years,"/* 260604 번역 */,
                    'No. 1 in the Korean Service Quality Index (KS-SQI) <br class="m_br" />from credible external organizations, including a total of 22 awards,'/* 260604 번역 */,
                    "leading to these evaluation results."/* 260604 번역 */,
                ],
            ],
            str: {
                title: "GS25 is always by your side.",
                storeFind: "Find a Store",
                snsInstaAria: "Instagram"/* 260604 번역 */,
                snsYtAria: "YouTube"/* 260604 번역 */,
                items: [
                    {
                        title: "The industry's best<br />Achieving sales per store"/* 260604 번역 */,
                        desc: 'By enhancing store competitiveness and providing customer-centric products and services, we achieve the highest revenue per store in the convenience store industry.',
                    },
                    {
                        title: `GS25's distinctive<br class="p_br" /> Products and<br class="m_br" />Service provision`/* 260604 번역 */,
                        desc: 'We deliver new value to customers through distinctive products and services, including high-quality fresh food items, our private brand YOUUS offering great quality at a reasonable price, and Our Neighborhood GS, the GS Retail exclusive app.',
                    },
                    {
                        title: 'Through continuous communication with owners and<br class="m_br" />Through cooperation <br class="p_br" />A solid partnership'/* 260604 번역 */,
                        desc: "To build a strong partnership between store owners and headquarters, we have introduced various communication channels and win-win growth programs. Industry-first initiatives such as the Refresh Vacation Support program and the GS25 20's Club continue to enhance store owner satisfaction and pride.",
                    },
                ],
            },
        },
        common: {
            selectPlaceholder: "Please select"/* 260604 번역 */,
            trafficSelectAria: "Select Transit Usage Location"/* 260604 번역 */,
            retailSelectAria: "Select a retail point of use"/* 260604 번역 */,
            prevAria: "Previous"/* 260604 번역 */,
            nextAria: "Next"/* 260604 번역 */,
        },
        backLabel: "← Back to Brand List",
    }
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
const tab1 = computed(() => t.value.tabs[0]);
const tab2 = computed(() => t.value.tabs[1]);
const tab3 = computed(() => t.value.tabs[2]);

const depth1ActiveIdx = ref(2); 
const depth1Tabs = computed(() => t.value.nav.depth1);
const depth2Tabs = computed(() => t.value.nav.depth2);
const storeTabs = computed(() => t.value.nav.depth2Store);
const winwinTabs = computed(() => t.value.nav.depth2Winwin);

const storeActiveTab = ref(0); 
const winwinActiveTab = ref(0); 
const winwinServiceActiveTab = ref(0); 
const giftSwiperInst = ref(null);
const onGiftSwiper = (swiper) => {
    giftSwiperInst.value = swiper;
};
const serviceActiveTab  = ref(0);
const deliveryActiveTab = ref(0);  


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
    const syncClip = () => {
        if (typeof _syncVisualClip === "function") _syncVisualClip();
    };
    syncClip();
    requestAnimationFrame(syncClip);
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        syncClip();
    }, 150);
};


watch(() => [route.query.depth1, route.query.tab], syncDepth1FromRoute);

let popSecObserver = null;
let _syncVisualClip = null;
onMounted(() => {
    syncDepth1FromRoute();
    isMobileView.value = _getIsMobile();
    window.addEventListener("resize", _onResize);

    const targets = document.querySelectorAll("[data-pop-sec]");
    if (targets.length) {
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
    }

    if (!sectionRef.value || !bgWrapRef.value || !textParaRef.value || !logoWrapRef.value || !aboutSectionRef.value) return;

    gsapCtx = gsap.context(() => {
        const spans = textParaRef.value.querySelectorAll("span");
        const PHASE1_PX = 400;
        const DESIGN_W = 1920;
        const DESIGN_H = 1080;
        const INSET_X = 250;
        const INSET_Y = 140;
        const TABLET_BP = 1024;
        const TABLET_CLIP_V = 35;
        const TABLET_CLIP_H = 20;
        const TABLET_CLIP_RADIUS = 8;

        const applyBgClip = (p) => {
            const el = bgWrapRef.value;
            if (window.innerWidth <= TABLET_BP) {
                el.style.setProperty("--bgClip", `${p * TABLET_CLIP_V}px ${p * TABLET_CLIP_H}px round ${p * TABLET_CLIP_RADIUS}px`);
                el.style.clipPath = "";
                el.style.webkitClipPath = "";
            } else {
                el.style.removeProperty("--bgClip");
                const bw = el.offsetWidth;
                const bh = el.offsetHeight;
                const hInset = p * (bw * INSET_X) / DESIGN_W;
                const vInset = p * (bh * INSET_Y) / DESIGN_H;
                const clip = `inset(${vInset}px ${hInset}px round ${p * 20}px)`;
                el.style.clipPath = clip;
                el.style.webkitClipPath = clip; 
            }
            el.classList.toggle("active", p >= 1);
        };

        const visualSt = ScrollTrigger.create({
            trigger: sectionRef.value,
            start: "top top",
            end: `+=${PHASE1_PX}`,
            scrub: 1.5,
            onUpdate(self) {
                applyBgClip(self.progress);
            },
        });
        _syncVisualClip = () => {
            visualSt.update();
            applyBgClip(visualSt.progress);
        };
        applyBgClip(visualSt.progress);
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
onBeforeUnmount(() => {
    window.removeEventListener("resize", _onResize);
    if (popSecObserver) popSecObserver.disconnect();
    if (gsapCtx) gsapCtx.revert();
    _syncVisualClip = null;
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


function syncDepth1FromRoute() {
    const tabKey = route.query.tab;
    if (tabKey === "sinsen") {
        depth1ActiveIdx.value = 1;
        return;
    }
    const raw = route.query.depth1;
    if (raw === undefined || raw === null || raw === "") return;
    const idx = Number(raw);
    if (Number.isInteger(idx) && idx >= 0 && idx < depth1Tabs.value.length) {
        depth1ActiveIdx.value = idx;
    }
}


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
.brand_panel_bg > img { width: 100%; height:340px; object-fit: cover; display: block;}
.brand_panel_title { padding: 0 0 100px;}
.brand_panel_title > h2 { margin: 0 0 16px; color: #161618; font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; display:flex; align-items:center;}

.brand_panel_title > h2 :deep(a) {margin-left:16px; padding:4px; font-size:1.8rem; font-weight:400; letter-spacing:-0.01em; line-height:160%; display:flex; align-items:center;}
.brand_panel_title > h2 :deep(a:before) {width:24px; height:24px; margin-right:8px; background:url('@/assets/images/common/icon_set_24.png') -1168px -56px no-repeat; content:''; display:block;}

.brand_panel_title > p { margin: 0; color: #161618; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.sec_header { padding-bottom: 40px; font-weight: 700;}
.sec_header > h3 { margin: 0; color: #161618; font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.sec_header > h3 + p,
.sec_header > h3 + .sec_header_desc,
.sec_header > h3 + .sec_note,
.sec_header > h3 + .pop_exclude { margin-top: 12px; }
.sec_header > .sec_header_desc, .sec_header > .sec_mobile_desc {font-weight: 700;font-size: 2rem;line-height: 1.5;letter-spacing: -0.01em;}
.sec_header .sec_cite { margin-left: 16px; color: #67676f; font-size: 1.4rem; font-weight: 500; font-style: normal; letter-spacing: -0.01em; }

.cafe_panel .brand_panel_bg > img { object-position: center bottom }
.chicken_panel .img_grid_swiper { margin-top: 120px }

.gopizza_panel .img_grid, .gopizza_panel .img_grid_swiper { margin-top: 0; padding:0 }
.gopizza_panel .img_grid > li { display: flex; flex-direction: column; } 
.gopizza_panel .img_grid > li :deep(.diff_qr_row) { height: 100%; }

.sec_brand_visual { position: relative; height: calc(100vh + 800px) }
.sticky { --base-ratio: 0.75; --base-size: 1536; --base-percent: 100vw; width: 100%; height: calc(100vh + max(calc(2px * var(--base-ratio)), calc(calc(2 / var(--base-size)) * var(--base-percent)))); position: -webkit-sticky; position: sticky; top: max(calc(1 / var(--base-size) * var(--base-percent) * -1)); left: 0; overflow: hidden }

.bg_wrap { width: 100%; height: 100%; position: relative; z-index: 1; overflow: hidden; clip-path: inset(0% round 0px); -webkit-clip-path: inset(0% round 0px) }
.brand_panel_title > p{font-weight: 700;font-size: 2.4rem;line-height: 1.5;letter-spacing: -0.01em;}
:deep(.feature_card_desc), :deep(.step_bullets > li){font-size:1.8rem}  

.bg_wrap > .bg { width: 100%;  height: 100%; background-image: url(@/assets/images/dummy/brand_main_bg.png); background-size: cover; background-position: center bottom; position: absolute; top: 0; left: 0; z-index: -1; transform: scale(1.0); transition: transform 0.7s ease-out } 
.bg_wrap.active > .bg { transform: scale(0.8) }
.bg_wrap > .bg::before, .bg_wrap > .bg::after { content: ""; width: 100%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0; visibility: hidden; pointer-events: none; transition: 0.7s }
.bg_wrap > .bg::after { background: rgba(0, 0, 0, 0.4); -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); z-index: 1 }
.bg_wrap.active > .bg::before, .bg_wrap.active > .bg::after { opacity: 1; visibility: visible }
.bg_wrap > .visual_inner {width:100%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, calc(-50% + 10px)); border-radius: 20px; display: flex; align-items: center; justify-content: center; }
.bg_wrap .visual_inner > .txt_area { position: relative; z-index: 3; text-align: center }

@media (max-width: 1024px) {
.sec_brand_visual{height:200vh}
.sec_brand_visual .bg_wrap { --bgClip: 0px 0px round 0px; clip-path: inset(var(--bgClip)); -webkit-clip-path: inset(var(--bgClip)) } 
.bg_wrap > .bg { transform: none; transition: none; }
.bg_wrap.active > .bg { transform: none; }
}


.txt_area > p { width: 100%; margin-bottom: 48px; overflow: hidden }
.txt_area > p > span { color: #fff; font-size: 5.6rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; word-break: keep-all; word-wrap: break-word; display: block }
.txt_area > .logo_wrap { overflow: hidden }
.txt_area > .logo_wrap > img { width: auto; margin: 0 auto; display: block }
.m_gs25 { font-style: normal; display: none }
.sec_brand_about { padding: clamp(140px, 10.42vw, 200px) 20px; background-color: #f8f8f8; }
.sec_brand_about > .about_inner { width:100%; max-width: 940px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; text-align: center;}
.sec_brand_about > .about_inner > .about_txt > p  { overflow: hidden }
.sec_brand_about > .about_inner > .about_txt > p > span { color: #161616; font-size: 3.6rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; will-change: transform, opacity; display: block } 
.sec_brand_str > .str_inner { max-width: 1460px; margin: 0 auto; padding: 200px 20px; }
.str_header { padding-bottom: 80px; display: flex; justify-content: space-between; align-items: flex-end }
.str_header > h2 { color: #161616; font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em }
.str_header > .str_actions { display: flex; align-items: center; gap: 24px }
.sns_wrap { display: flex; align-items: center; gap: 6px }


:deep(.tab_wrap ul.type_01 li .item) {height:100%; padding:8px 20px; white-space:pre-line; display:flex; align-items:center; justify-content:center;}

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
.acc_desc { padding-top: 16px; color: #67676f; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em }
:deep(.p_br) { display: block }
:deep(.m_br) { display: none }
.acc_img_wrap { overflow: hidden; height: 0; transition: height 0.65s ease }
.acc_img_wrap > img { width: auto; margin-left: auto; border-radius: 12px; display: block; object-fit: cover }

.brand_panel_desc { margin-top: 16px; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; color:#67676F }
.caution_note > p { color: #67676f }

img { display: block }
button { background-color: #fff }
.usage_select_box { width: 180px; padding: 11px 44px 11px 16px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; background-color: #F8F8F8; border: 0; border-radius: 6px; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 7.5L10 12.5L15 7.5' stroke='%23111111' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; background-size: 20px 20px; cursor: pointer }

.brand_panel { padding-top: 64px;}
.brand_panel section { padding-bottom: 120px }

.brand_panel section:last-of-type { padding-bottom: 0 }
.cafe25_card_list { margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, calc((100% - 40px) / 3)); gap: 20px }
.cafe25_card_list > li { min-width: 0; overflow: hidden }
.cafe25_card_list > li > div { width: 100% }
.cafe25_card_list > li > div img{width:100%;}
.cafe25_img_wrap { max-width: 938px; margin: 0; padding: 0; background-color: #f8f8f8; border-radius: 12px; overflow: hidden }
.cafe25_img_wrap > img{width:100%;}
.cafe25_split { display: flex; gap: clamp(10px, 1.25vw, 20px); align-items: flex-start; }
.cafe25_split > div { flex: 1 1 0; min-width: 0; width: auto; }
.cafe25_split_img > img { width: 100%; height: auto; display: block; }
.cafe25_split_table { min-width: 0; overflow-x: auto; }
.cafe25_split_table .cafe25_table { width: 100%; min-width: 0; }
.cafe25_split_table .cafe25_table th:nth-child(1), .cafe25_split_table .cafe25_table td:nth-child(1) { width: 37.14%; }
.cafe25_split_table .cafe25_table th:nth-child(2), .cafe25_split_table .cafe25_table td:nth-child(2) { width: 31.43%; }
.cafe25_split_table .cafe25_table th:nth-child(3), .cafe25_split_table .cafe25_table td:nth-child(3) { width: 31.43%; }
.cafe25_split_table .cafe25_table th, .cafe25_split_table .cafe25_table td { height: auto; min-height: 56px; padding: clamp(8px, 1.25vw, 15px); white-space: normal; word-break: keep-all; } 
.cafe25_split_table .cafe25_table th > span, .cafe25_split_table .cafe25_table td > span { font-size: clamp(1.2rem, 0.94vw, 1.8rem); line-height: 1.4; letter-spacing: -0.01em; }
.cafe25_table_wrap { overflow-x: auto }
.cafe25_table { border-collapse: collapse; table-layout: fixed }
.tbl_mo { width: 100%; border-collapse: collapse }
.tbl_mo th, .tbl_mo td { height: 56px; text-align: left; border-bottom: 1px solid #E5E5E9; vertical-align: middle }
.tbl_mo th { padding: 18px 24px; background-color: #F8F8F8 }
.tbl_mo th > span { color: #161618; font-size: 1.6rem; font-weight: 700; line-height: 1.24; letter-spacing: 0 }
.tbl_mo td { padding: 16px 20px }
.tbl_mo td > span { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.24; letter-spacing: 0 }
.tbl_mo td .flag_icon { display: inline-block; vertical-align: middle; margin-right: 8px }
.tbl_mo tr:first-child th, .tbl_mo tr:first-child td { border-top: 1px solid #E5E5E9 }
.cafe25_table_pagination { margin-top: 20px; display: flex; justify-content: center; gap: 10px }
.cafe25_table_pagination :deep(.swiper-pagination-bullet) { width: 6px; height: 6px; background-color: #D7D7DF; border-radius: 50%; opacity: 1; cursor: pointer; display: block }
.cafe25_table_pagination :deep(.swiper-pagination-bullet-active) { background-color: #161616 }
.gopizza_table_pagination { margin-top: 20px; display: flex; justify-content: center; gap: 10px } 
.gopizza_table_pagination :deep(.swiper-pagination-bullet) { width: 6px; height: 6px; background-color: #D7D7DF; border-radius: 50%; opacity: 1; cursor: pointer; display: block } 
.gopizza_table_pagination :deep(.swiper-pagination-bullet-active) { background-color: #161616 } 
.cafe25_table th, .cafe25_table td { height: 56px; padding: 0 24px; border-bottom: 1px solid #e5e5e9; vertical-align: middle; white-space: nowrap }
.cafe25_table th > span, .cafe25_table td > span { color: #161618; font-size: 1.8rem; font-weight: 700; line-height: 1.6; letter-spacing: -0.01em }
.cafe25_table th:first-child, .cafe25_table td:first-child { border-left: 0 }
.cafe25_table th:last-child, .cafe25_table td:last-child { border-right: 0 }
.cafe25_table th { background-color: #f8f8f8; border-top: 0 }
.cafe25_table th > span { font-weight: 700 } 

.cafe25_table > tbody > tr > td > .flag_icon { width: 24px; height: 24px; margin-right: 8px; border-radius: 50%; vertical-align: middle; display: inline-block; object-fit: cover }
.img_grid { margin-top: 120px; padding: 0; display: grid; grid-template-columns: repeat(2, calc((100% - 20px) / 2)); gap: 20px }
.img_grid > li { min-width: 0;  overflow: hidden }
.img_grid img { width: 100%; object-fit: cover }
.gopizza_img_wrap { height: 440px; margin: 0; padding: 0; border-radius: 12px; overflow: hidden }
.gopizza_img_wrap > img { height: 100%; object-fit: cover }
.gopizza_menu { display: flex; gap: 20px }
.gopizza_menu_panel { min-width: 0; flex: 1 }
.gopizza_menu_panel img { width: 100%; border-radius: 12px; object-fit: cover }


 .gopizza_menu_info { padding-top: 24px } 
 .gopizza_menu_title { margin-bottom: 16px; display: flex; align-items: center; gap: 8px } 
 .gopizza_menu_title > strong { color: #161618; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em } 
 .gopizza_menu_tag { color: #67676f; font-size: 1.4rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em } 
 .gopizza_menu_tag + .gopizza_menu_tag { margin-left: 8px } 
 .gopizza_menu_tag + .gopizza_menu_tag::before { content: ""; width: 1px; height: 8px; margin-right: 8px; background-color: #d7d7df; display: inline-block } 
.com_table_wrap { overflow-x: auto }
.com_table { width: 100%; border-collapse: collapse; border-top: 1px solid #e5e5e9 }
.com_table th, .com_table td { padding: 18px 24px; color: #161618; font-size: 1.8rem; font-weight: 700; line-height: 1.6; letter-spacing: -0.01em; border-bottom: 1px solid #e5e5e9; vertical-align: middle }
.com_table td { text-align: left }
.com_table thead th { padding: 11px 13px; font-weight: 700; background-color: #f8f8f8 }
.com_table tbody th { font-weight: 700; background-color: #f8f8f8; text-align: left; white-space: normal; word-break: keep-all; padding-top: 18px; padding-bottom: 18px; vertical-align: middle }
.com_table_col thead th { text-align: center }
.com_table_col td { padding: 15px 24px; text-align: center }


.gopizza_menu_name { display: flex; align-items: center; gap: 12px } 
.gopizza_badge_best { padding: 2px 6px; color: #fb4516; font-size: 1.1rem; font-weight: 700; font-style: normal; letter-spacing: -0.02em; background-color: #ffe9e3; border-radius: 4px } 
.diff_bottom_row { margin-top:40px;display: flex; gap: 32px }
.diff_bottom_row > .diff_qr_row { flex: 1 }
:deep(.diff_qr_row > div > strong + p ){font-weight:700;} 
.gopizza_link { min-width: 0; display: flex; align-items: center; flex: 1; gap: 20px; text-decoration: none }
.gopizza_link > figure { width: 90px; height: 90px; margin: 0; padding: 8px; background-color: #fff; border: 1px solid #e5e5e9; border-radius: 10px; flex-shrink: 0; display: none }
.gopizza_link > figure > img { width: 100%; display: block }
.gopizza_link > div { min-width: 0; padding: 7px 0; flex: 1 }
.gopizza_link > div > strong { margin: 0 0 6px; color: #161618; font-size: 2rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em; display:flex; gap:8px; align-items: center }
.gopizza_link > div > strong:after { content:""; width:20px; height:20px; background:url('@/assets/images/common/icon_set_20.png') -979px -24px;}
.gopizza_link > div > p { margin: 0; color: #67676f; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.02em }
.sinsen_feature :deep(.feature_card_item) { min-height: 240px }

.sinsen_feature :deep(.feature_card_item .feature_card_icon) {width:40px; height:40px; background-color:transparent; background-position:50%; background-repeat:no-repeat; background-size:cover;}
.sinsen_feature :deep(.feature_card_item:nth-child(1) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_01.png');}
.sinsen_feature :deep(.feature_card_item:nth-child(2) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_02.png');}
.sinsen_feature :deep(.feature_card_item:nth-child(3) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_03.png');}
.sinsen_feature :deep(.feature_card_item:nth-child(4) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_04.png');}

.info_card_flow {display:flex; gap:20px;}
.info_card_flow .info_card:nth-child(1){flex:0 1 794px; }
.info_card_flow .info_card:nth-child(2){flex:0 1 606px; }

.info_card { padding: 32px; background-color: #f8f8f8; border-radius: 12px }
.info_card strong { margin-bottom:16px; font-weight: 700; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; display: block }
.info_card span { font-size: 1.8rem; line-height: 1.4; font-weight:700; }
.info_card > p {margin-top:14px; color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
.info_card > strong + p {margin-top:0; margin-bottom:8px;}
.info_card > p + .num_list {margin-bottom:32px;}
.info_card > p + .num_list li{padding-left:24px;}
.info_card > p + .num_list li + li {margin-top:4px;}
.info_card > p + .num_list li > p {font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
.info_card > p + .num_list li::before{width:16px; height:16px;top:2px;}
.sinsen_flow_img { width: 100%; max-height:372px; margin-top: 24px; display: block; border-radius: 10px }
.sinsen_advantage_grid { width: 100%; display: flex; flex-wrap: wrap; align-items: stretch; gap: 16px; }
.sinsen_advantage_card { flex: 1 1 calc(50% - 8px); min-width: 0; padding: 32px; background-color: #f8f8f8; border-radius: 12px; }
.sinsen_advantage_card:nth-child(1) header > p{margin-bottom:42px;}
.sinsen_advantage_card > header > strong { margin: 0 0 16px; color: #161616; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: block; }
.sinsen_advantage_card > header > strong > em { margin-right: 8px; color: #107af2; font-size: 1.8rem; font-style: normal; font-weight: 700; line-height: 1.5; }
.sinsen_advantage_card > header > p { margin: 0 0 40px; color: #67676f; font-size: 1.8rem; font-weight: 700; line-height: 1.5;  }
.sinsen_compare_table { width: 100%; margin: 0; border-top: 1px solid #e5e5e9; border-collapse: collapse; table-layout: fixed; }
.sinsen_compare_table th, .sinsen_compare_table td { padding: 18px 24px; color: #161616; font-size: 1.8rem; line-height: 1.4; text-align: center; border-bottom: 1px solid #e5e5e9; vertical-align: middle; }
.sinsen_compare_table td {padding:30px 24px;}
.sinsen_compare_table thead th { font-weight: 700; background-color: #fff; }
.sinsen_compare_table tbody th { font-weight: 700; background-color: #fff; }
.sinsen_advantage_items { width: 100%; margin: 0; padding: 0; list-style: none; display: flex; gap: 16px; }
.sinsen_advantage_items > li { min-width: 0; flex: 1; }
.sinsen_advantage_items > li > p { margin: 0 0 42px; color: #67676f; font-size: 1.8rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em; }
.sinsen_advantage_items > li > figure { margin: 0; }
.sinsen_advantage_items > li > figure > img { width: 100%; height: 175px; display: block; object-fit: contain; border-radius: 8px; }
.sinsen_advantage_items > li > figure > figcaption { margin-top: 6px; color: #67676f; font-size: 1.6rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em; text-align: center; }

.info_list > li { margin-bottom: 8px; color: #161618; font-size: 1.8rem; font-weight: 400; line-height: 1.6; letter-spacing: -0.01em; display: flex; align-items: baseline; gap: 8px }
.info_list > li:last-child { margin-bottom: 0 }
.info_list > li::before { content: ""; width: 16px; height: 16px; background:url('@/assets/images/common/icon_bullet_checkmark.png') 0 0 no-repeat; border-radius: 50%; position: relative; top: 2px; flex-shrink: 0 }
.info_list > li > div { display: flex; flex-direction: column; gap: 2px }
.info_check_note { color: #67676f }
.chicken_panel :deep(.feature_card_item) { min-height: 238px }
.service_tab_wrap { margin-bottom: 80px; min-width: 0; overflow: hidden; position: relative }
.service_tab_list { width: 100%; display: flex; transition: transform 0.4s cubic-bezier(0.1, 0.57, 0.1, 1) }
.service_tab_item { background-color: transparent; border: none; cursor: pointer; border-radius: 12px; flex: 0 0 calc(100% / 8); aspect-ratio: 89 / 83; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px }

.brand_panel .service_tab_icon { width: 48px; height: 48px; background-image:url('@/assets/images/sub/gsrbr010101/icon_pc_set_storetab_off.png'); background-repeat:no-repeat; border-radius: 8px; display: block; flex-shrink: 0 ;}
.brand_panel .service_tab_item.is_active .service_tab_icon { background-image:url('@/assets/images/sub/gsrbr010101/icon_pc_set_storetab_on.png'); }

.service_tab_label { color: #7c7c86; font-size: 1.8rem; font-weight: 700; line-height: 1.5; text-align: center; white-space: pre-line }
.service_tab_item.is_active .service_tab_label { color: #107af2 }
.service_panel { min-height: 200px }
.service_panel .sec_header_only > .sec_header { margin-bottom: 0; padding: 0; }
.pop_exclude { margin-top: 8px; color: #f95823; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
.pop_card_item { display: flex; flex-direction: column; min-width: 0; } 
/* 매장/서비스 > 생활 서비스 탭 아이콘 */
.pop_panel .service_tab_list .service_tab_item:nth-child(1) .service_tab_icon {background-position:-65px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(2) .service_tab_icon {background-position:-243px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(3) .service_tab_icon {background-position:-421px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(4) .service_tab_icon {background-position:-599px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(5) .service_tab_icon {background-position:-777px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(6) .service_tab_icon {background-position:-955px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(7) .service_tab_icon {background-position:-1133px -24px;}
.pop_panel .service_tab_list .service_tab_item:nth-child(8) .service_tab_icon {background-position:-1311px -24px;}


/* 매장/서비스 > 택배&픽업 탭 아이콘 */
.delivery_panel .service_tab_list .service_tab_item:nth-child(1) .service_tab_icon {background-position:-1489px -24px;}
.delivery_panel .service_tab_list .service_tab_item:nth-child(2) .service_tab_icon {background-position:-1667px -24px;}
.delivery_panel .service_tab_list .service_tab_item:nth-child(3) .service_tab_icon {background-position:-1845px -24px;}
.delivery_panel .service_tab_list .service_tab_item:nth-child(4) .service_tab_icon {background-position:-2023px -24px;}
.delivery_panel .service_tab_list .service_tab_item:nth-child(5) .service_tab_icon {background-position:-2201px -24px;}

/* 상생협력 > 운영지원제도 탭 아이콘 */
.winwin_panel .service_tab_list .service_tab_item:nth-child(1) .service_tab_icon {background-position:-2379px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(2) .service_tab_icon {background-position:-2557px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(3) .service_tab_icon {background-position:-2735px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(4) .service_tab_icon {background-position:-2913px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(5) .service_tab_icon {background-position:-3091px -24px;}
.winwin_panel .service_tab_list .service_tab_item:nth-child(6) .service_tab_icon {background-position:-3269px -24px;}


/* step 아이콘 */
.gift_usage_wrap .gift_usage_group :deep(.step_list .step_item) {gap:24px;align-items:center; flex-direction:row;}
:deep(.step_list.step_type2){column-gap:16px;}
:deep(.step_list .step_item > span){ width: 40px; height: 40px; background-color: transparent; background-image: url('@/assets/images/sub/icon_cont_40.png'); background-repeat: no-repeat; }
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-260px -103px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-100px -103px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-180px -103px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-100px -103px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(1) :deep(.step_list .step_item:nth-of-type(5) span) {background-position:-20px -103px;}

.gift_usage_wrap .gift_usage_group:nth-of-type(2) :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-20px -20px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(2) :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-100px -20px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(2) :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-180px -20px;}
.gift_usage_wrap .gift_usage_group:nth-of-type(2) :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-260px -20px;}
.usim_use :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-20px -20px;}
.usim_use :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-260px -103px;}
.usim_use :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-20px -103px;}
.usim_use :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-340px -103px;}
.hi_pass :deep(.step_list .step_item:nth-of-type(1) >  span) {background-position:-180px -20px;}
.hi_pass :deep(.step_list .step_item:nth-of-type(2) > span) {background-position:-180px -103px;}
.hi_pass :deep(.step_list .step_item:nth-of-type(3) >span) {background-position:-420px -103px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-500px -103px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-580px -103px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-660px -103px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-260px -186px;}
.sec_unpaid_method :deep(.step_list .step_item:nth-of-type(5) span) {background-position:-180px -20px;}
.sec_mall_payment_method :deep(.step_list .step_item:nth-of-type(1) span) {background-position:-500px -186px;}
.sec_mall_payment_method :deep(.step_list .step_item:nth-of-type(2) span) {background-position:-20px -20px;}
.sec_mall_payment_method :deep(.step_list .step_item:nth-of-type(3) span) {background-position:-180px -20px;}
.sec_mall_payment_method :deep(.step_list .step_item:nth-of-type(4) span) {background-position:-580px -186px;}
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

.winwin_panel :deep(.num_info_icon:before) {display:none;}

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
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(4) .num_info_icon:after) {background-position:-664px -345.57px;}
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(5) .num_info_icon:after) {background-position:-900px -186px;}
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(6) .num_info_icon:after) {background-position:-1140px -266px;}
.winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(7) .num_info_icon:after) {background-position:-1060px -266px;}

.winwin_panel .winwin_panel_5 :deep(.num_info_item:nth-of-type(1) .num_info_icon:after) {background-position:-340px -20px;}
.winwin_panel .winwin_panel_5 :deep(.num_info_item:nth-of-type(2) .num_info_icon:after) {background-position:-580px -266px;}
.winwin_panel .winwin_panel_5 :deep(.num_info_item:nth-of-type(3) .num_info_icon:after) {background-position:-500px -20px;}

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

@media (max-width: 1200px) {
    .sinsen_advantage_items > li > p :deep(br) {display:none;}
}
@media (max-width: 1024px) {
  .brand_panel_title > h2 { font-size: 3.2rem; }
  .brand_panel_title > p { font-size: 2rem; }
  .sec_brand_str > .str_inner { width: 100%; padding: 140px 20px; }
  .acc_inner { padding: 28px 40px }
  .acc_item.is_open .acc_inner { grid-template-columns: 1fr 280px; column-gap: 28px }
  .acc_img_wrap > img { width: 100% }
  .sinsen_advantage_card{flex: 1 1 100%;}
  .cafe25_split_table .cafe25_table th, .cafe25_split_table .cafe25_table td { min-height: 48px; }
}

@media (max-width: 768px) {
  .chicken_panel .img_grid_swiper { margin-top: 60px }
  .bg_wrap > .visual_inner { transform: translate(-50%, calc(-50% - 10px));  }

  .sec_header { padding-bottom: 0; }
  .sec_header > p,
  .sec_header > .sec_header_desc,
  .sec_header > .sec_note { margin-bottom: 24px; }
  .sec_header > h3 { margin-bottom: 12px; font-size: 2.4rem; }
  .sec_header > h3.h3_steps { margin-bottom: 24px; }
  .sec_header > .sec_header_desc, .sec_header > .sec_mobile_desc { margin-bottom: 12px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
  .sec_header .sec_cite { margin-top: 4px; margin-left: 0; display: block; }
  .brand_panel_bg { width: calc(100% + 40px); margin: 0 -20px 24px; border-radius: 0; }
  .brand_panel_bg > img {height: auto; min-height:245px;}
  .brand_panel_title { padding: 0 0 64px; }
  .brand_panel_title > h2 { margin-bottom: 12px; font-family: Pretendard; font-size: 2.8rem; line-height: 1.35; letter-spacing: -0.01em; display:block;}
  .brand_panel_title > h2 :deep(a) {margin-top:16px; margin-left:0; font-size:1.4rem; font-weight:500; line-height:140%;}
  .brand_panel_title > h2 :deep(a:before) {width:20px; height:20px; background-image:url('@/assets/images/common/icon_set_20.png'); background-position:-454px -115px;}

  .brand_panel_title > p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }

  .gopizza_panel .diff_bottom_row { margin-top: 120px; }
  .info_card_flow .info_card:nth-child(1){flex:0 0 auto; }
  .info_card_flow .info_card:nth-child(2){flex:0 0 auto; }
  /* .sec_brand_visual { height: 100vh } */
  .sticky { height: 100vh; top: 0 }

  .txt_area > p { margin-bottom: 0 }
  .txt_area > p > span, .txt_area > p > span em { color:#fff; font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.01em; text-align: center }
  .txt_area > .logo_wrap { display: none }
  .m_gs25 { display: inline }
  .txt_area > p > span:first-child::after { content: "," }
  .sec_brand_about { padding: clamp(119px, 37.33vw, 140px) 20px; }
  .sec_brand_about > .about_inner { gap: 40px }
  .sec_brand_about > .about_inner > .about_txt > p > span { font-weight: 700; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0%; display: block }

  .str_header { flex-direction: column; align-items: flex-start; gap: 16px; padding-bottom: 40px }
  .str_header > h2 { font-size: 2.8rem; line-height: 1.35; letter-spacing: -0.01em }
  .str_header > .str_actions { gap:14px; flex: none; justify-content: flex-start }
  .sns_wrap { gap: 16px }

  .acc_btn { font-size: 1.8rem; line-height: 1.5; letter-spacing: -0 }
  .acc_inner { padding: 24px }
  .acc_desc { font-size: 1.6rem; line-height: 1.5 }
  .acc_item.is_open .acc_inner { grid-template-columns: 1fr; column-gap: 0; row-gap:40px }
  :deep(.p_br) { display: none }
  :deep(.m_br) { display: inline }

  .brand_panel_desc { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
  
  .caution_note { margin-top: 8px }
  .caution_note > p { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
  .brand_panel_title .list_dotted { padding-right: 6px }
  
  .usage_select_box { width: 100%; font-size: 1.4rem; line-height: 1.4 }
  
  .brand_panel section { padding: 0 0 80px }

  .gopizza_panel.brand_panel > section:nth-of-type(3) { padding-bottom: 100px; }

  .cafe25_table th, .cafe25_table td { padding: 16px 24px }
  .cafe25_table th > span, .cafe25_table td > span { font-size: 1.6rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em }
  .cafe25_table th > span { font-weight: 700 }
  .gopizza_menu_panel + .gopizza_menu_panel {margin-top:100px;}
  .gopizza_menu_panel img { min-height: 240px }
  

.gopizza_menu_title { gap:4px; flex-direction: column; align-items: flex-start } 
.gopizza_menu_title > strong { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% } 

  .com_table th, .com_table td { font-size: 1.6rem; font-weight: 700; line-height: 1.24 } 
  .com_table td { padding: 14px 20px; font-size: 1.4rem; letter-spacing: 0.01em }
  .com_table thead th { padding: 14px 0 }
  .com_table tbody th { padding: 14px 24px }
  .com_table_col td { padding: 11px 13px; font-size: 1.4rem }
  .info_card{padding:24px;}
  .info_card strong {margin-bottom:12px; font-size: 1.8rem; line-height: 150%; letter-spacing: 0% }
  .sinsen_feature :deep(.feature_card_item) { min-height: 227px }
  .info_card span { font-size: 1.4rem; letter-spacing: -0.01em }
  .info_card > p { margin-bottom:12px }
  .info_card > p + .num_list li > p{font-size:1.4rem; }
  .sinsen_flow_img {aspect-ratio: 287/147; }
  .info_card:nth-child(2) .sinsen_flow_img{ aspect-ratio:287/169;}

  :deep(.tab_wrap ul.type_01 li .item) {white-space:nowrap;}
  .info_card_flow {flex-direction:column;}
  .sinsen_advantage_grid { flex-direction: column; gap: 16px; }
  .sinsen_advantage_card { flex: 1 1 100%; width: 100%; padding: 32px 24px; }
  .sinsen_advantage_card > header > strong { margin: 0 0 6px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
  .sinsen_advantage_card > header > strong > em { font-size: 1.8rem; line-height: 1.5; }
  .sinsen_advantage_card > header > p { margin: 0 0 20px; font-size: 1.4rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; }
  .sinsen_compare_table th, .sinsen_compare_table td { padding: 22px 5px; font-size: 1.4rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em; }
  .sinsen_compare_table td { padding: 25px 9px; }
  .sinsen_compare_table thead th { font-weight: 700; }
  .sinsen_compare_table thead th:first-child { font-weight: 700; }
  .sinsen_compare_table th:first-child, .sinsen_compare_table td:first-child { width: 48px; }
  .sinsen_advantage_items { flex-direction: row; gap: 16px; }
  .sinsen_advantage_items > li > p { margin: 40px 0 16px; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
  .sinsen_advantage_items > li > figure > img { height: 175px; border-radius: 0; }
  .sinsen_advantage_items > li > figure > figcaption { margin-top: 16px; font-size: 1.4rem;  line-height: 1.4; letter-spacing: -0.01em; }
}

.pop_sec_acc :deep(dd.acc_panel > .acc_panel_inner > .acc_panel_cont) { color: #161616; } 
.pop_card_name { margin-bottom: 12px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: block }
.pop_card_thumb { width: 100%; display: block }
.pop_card_thumb img { width: auto; height: auto }
.pop_card_body { padding-top: 24px; display: flex; flex-direction: column; flex: 1 }
.pop_card_desc { color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; font-weight:700; white-space: pre-line } 

.pop_card_note { margin-top: 8px; color: #67676f; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.02em }
.pop_card_note.is_warn { color: #f95823 }
.pop_card_logos { margin-top: auto; padding-top: 16px; display: flex; align-items: center; gap: 24px; flex-wrap: wrap }

.pop_logo_thumb { width: auto; display: block }

@media (min-width: 769px) {
    .pop_card_swiper { overflow: visible }
    .pop_card_swiper :deep(.swiper-wrapper) { transform: none !important }
    .pop_card_swiper :deep(.swiper-slide) { width: auto !important; height: auto !important; flex: 1 }

    .pop_sec_acc :deep(.acc_tit_btn) { display: none }
    .pop_sec_acc :deep(.acc_panel) {height: auto !important; overflow: visible;}
    .pop_sec_acc :deep(.acc_panel + dt) {padding-top:120px;}
    .pop_sec_acc :deep(.acc_item) { border: none; padding-bottom: 120px }
    .pop_sec_acc :deep(.acc_item:last-child) { padding-bottom: 0 }
    .pop_sec_acc :deep(.acc_panel_cont) { padding: 0 }    
    
    .sinsen_advantage_card:nth-child(2) .sinsen_advantage_items > li > figure { padding: 0 15px; border: 1px solid #E5E5E9; }
    .sinsen_advantage_card:nth-child(3) .sinsen_advantage_items,
    .sinsen_advantage_card:nth-child(4) .sinsen_advantage_items { padding: 0 6.5px; border: 1px solid #E5E5E9; height: 245px; align-items: center; border: 1px solid #E5E5E9; }

}

@media (max-width: 768px) {
    .pop_card_body { min-height: 196px; padding-right: 8px }

    .sinsen_feature :deep(.swiper-slide:nth-of-type(1) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_01.png');}
    .sinsen_feature :deep(.swiper-slide:nth-of-type(2) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_02.png');}
    .sinsen_feature :deep(.swiper-slide:nth-of-type(3) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_03.png');}
    .sinsen_feature :deep(.swiper-slide:nth-of-type(4) .feature_card_icon) {background-image:url('@/assets/images/sub/gsrbr010101/icon_sinsen_feature_40_04.png');}

    .delivery_panel .service_panel :deep(.feature_card_item .feature_card_icon) {background-color:transparent; background-image:url('@/assets/images/sub/icon_cont_32.png'); background-repeat:no-repeat;}
    .delivery_panel .service_panel.delivery_panel_1 :deep(.swiper-slide:nth-of-type(1) .feature_card_icon) {background-position:-420px -186px;}
    .delivery_panel .service_panel.delivery_panel_1 :deep(.swiper-slide:nth-of-type(2) .feature_card_icon) {background-position:-340px -186px;}
    .delivery_panel .service_panel.delivery_panel_1 :deep(.swiper-slide:nth-of-type(3) .feature_card_icon) {background-position:-100px -103px;}

    .delivery_panel .service_panel.delivery_panel_2 :deep(.swiper-slide:nth-of-type(1) .feature_card_icon) {background-position:-740px -186px;}
    .delivery_panel .service_panel.delivery_panel_2 :deep(.swiper-slide:nth-of-type(2) .feature_card_icon) {background-position:-420px -186px;}
    .delivery_panel .service_panel.delivery_panel_2 :deep(.swiper-slide:nth-of-type(3) .feature_card_icon) {background-position:-340px -186px;}
    .delivery_panel .service_panel.delivery_panel_2 :deep(.swiper-slide:nth-of-type(4) .feature_card_icon) {background-position:-100px -103px;}

    .winwin_panel :deep(.num_info_icon:after) {width:32px; height:32px; background-image:url('@/assets/images/sub/icon_cont_32.png'); top:14px; left:14px;}

    .winwin_panel .winwin_panel_4 :deep(.num_info_item:nth-of-type(4) .num_info_icon:after) {background-position:-738.5px -347.23px;}

    .pop_card_name { margin-bottom: 12px; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0 }
    
    .pop_card_desc { font-size: 1.4rem; line-height: 1.4 }
    
    .pop_card_logos { padding-top: 0; flex-wrap:nowrap;}
    .pop_sec_acc :deep(dd.acc_panel) { padding: 0 32px; border-bottom: 1px solid #D7D7DF; }

    .pop_sec_acc :deep(.acc_panel_cont .pop_sec) { padding: 0 !important }
    .pop_sec_acc :deep(.acc_panel_cont #pop-sec-1), .pop_sec_acc :deep(.acc_panel_cont #pop-sec-2) { padding: 12px 0 24px !important }
    .pop_sec_acc :deep(#pop-sec-0 > header) { padding: 12px 0 24px }
    .pop_sec_acc :deep(#pop-sec-0 > header > h3) { display: none }
    .pop_sec_acc :deep(.pop_sec:not(#pop-sec-0) > header), .pop_sec_acc :deep(.pop_sec > .usage_header > header) { display: none }
}

.charging_service_list { display: flex; gap: 20px }
.charging_service_swiper { display: none }

@media (max-width: 768px) {
  .charging_service_list { display: none }
  .charging_service_swiper { width:calc(100% + 64px); margin:24px -32px 0; padding:0 32px; display: block; overflow: hidden; }
  .charging_service_swiper :deep(.swiper-slide) { width: 29.333vw !important; height: 29.333vw !important; flex: none }
}
.charging_service_item { max-width: 220px; aspect-ratio: 1 / 1; border-radius: 12px; flex: 1; display: flex; align-items: center; justify-content: center; background: #F8F8F8 }
@media (max-width: 768px) {
  .charging_service_item { max-width: none; width: 100%; height: 100%; aspect-ratio: unset }
}
.charging_service_item > img { max-width: 80%; max-height: 80%; width: auto; height: auto; display: block }
.charging_service_note { margin-top: 16px; color: #67676f; font-size: 1.6rem; line-height: 1.5; font-weight:700; letter-spacing: -0.01em } 
@media (max-width: 768px) {
  .charging_service_note {  margin: 24px 0; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
}
.charging_note_label { padding-right: 8px; color: #7c7c86; font-size: 1.6rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em }
@media (max-width: 768px) {
  .charging_note_label { font-size: 1.6rem; line-height: 1.5; display:block; }
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
  .usage_group_title.is_compact { margin-bottom: 8px; }
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

.usage_group .list_dotted > li { color: #67676f; font-weight:700;}
.usage_group .list_dotted > li::before { background-color: #67676f }
.explain{font-size:2rem; line-height:1.35; letter-spacing: -0.01em;} 
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
.list_caution > li { color: #161616; font-size: 1.8rem; font-weight:700; line-height: 1.4; letter-spacing: -0.01em; color:#67676F }
:deep(.num_info_body .list_dotted > li > p){font-weight:700;}
@media (max-width: 768px) {
  .list_caution > li { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em }
}
.imgcard_link { width: 20px; height: 20px; background:url('@/assets/images/common/icon_set_20.png') -979px -24px no-repeat; flex-shrink: 0; display: inline-block; vertical-align: middle; margin-left: 8px }
.sec_note { margin: 8px 0 0; color: #f95823; font-size: 1.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.02em }
.milbox_feature :deep(.feature_card_item) { min-height: 163px !important; max-width: 340px }
@media (max-width: 768px) {
   :deep(.feature_card_swiper){width: calc(100% + 40px); margin: 0 -20px; padding: 0 20px;}
  .milbox_feature :deep(.feature_card_swiper .swiper-slide) { min-height: 171px; }
  .milbox_feature :deep(.feature_card_swiper .swiper-slide) > .feature_card_item { min-height: 171px; }
  .milbox_feature :deep(.feature_card_item) { min-height: 171px; max-width: 100%; }
}
.brand_panel_title .list_dotted { margin: 16px 0 0 }
.brand_panel_title + section { padding-top: 0 }
.brand_panel_title .list_dotted > li::before { background-color: #67676f }
.list_dotted > li > p {font-weight:700; color:#161616;}
.brand_panel_title .list_dotted > li > p { color: #67676f; font-weight:700;}
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
.imgcard_body > p { color: #67676f; font-size: 1.6rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em; white-space: pre-line } 
.imgcard_sublist { display: flex; flex-direction: column; gap: 8px }


.imgcard_sublist > li { display: flex; gap: 8px; align-items: center }
.imgcard_sublist > li:before { content: ""; width: 16px; height: 16px; background:url('@/assets/images/common/icon_bullet_checkmark.png') 0 0 no-repeat; border-radius: 50%; position: relative; top: 2px; flex-shrink: 0 }
.imgcard_sublist > li > span{font-weight:700;}
.imgcard_sublist > li > span:last-child { color: #161616; font-size: 1.8rem; line-height: 1.4 }
.hipass_terminal_img > img { width: auto; max-width: 100%; height: auto; display: block }
@media (max-width: 768px) {
  .hipass_terminal_img > img { width: 100% }
  .imgcard_list { flex-direction: column; gap:40px }
  .imgcard_img { height: 216px }
  .imgcard_body { padding: 24px 0 }
  .imgcard_body > h4 { margin-bottom:8px; font-weight: 700; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0 }
  .imgcard_sublist > li > span:last-child { font-size: 1.6rem; line-height: 1.5; letter-spacing: 0 }
}
.usim_phone_list { margin: 0; padding: 0 }
.usim_phone_list dt { margin-bottom:6px; color: #161616; font-size: 1.8rem; font-weight: 700; line-height: 1.4; letter-spacing: -0.01em }
.usim_phone_list dd { margin-bottom: 32px; color: #67676f; font-size: 1.8rem; font-weight: 700; line-height: 1.4; letter-spacing: 0 } 
@media (max-width: 768px) {
  .usim_phone_list dt { margin-bottom:8px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0 }
  .usim_phone_list dd { margin-bottom:12px; font-size: 1.6rem; line-height: 1.5; letter-spacing: 0 }
}
.usim_plan_table_wrap { overflow-x: auto }
.usim_plan_table { width: 100%; min-width: 860px; border-collapse: collapse }
.usim_plan_table th { padding: 14.5px 24px; background-color: #f8f8f8; border-right: none; border-bottom: 1px solid #e5e5e9; color: #161616; font-size: 1.8rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: break-word; text-align: center; vertical-align: middle }
.usim_plan_table thead tr:nth-child(2) th { padding: 10.5px 24px }
.usim_plan_table thead tr:nth-child(1) th:first-child, .usim_plan_table thead tr:nth-child(1) th[colspan="3"] { border-right: 1px solid #e5e5e9 }
.usim_plan_table thead tr:nth-child(2) th:last-child { border-right: 1px solid #e5e5e9 }
.usim_plan_table td { padding: 15px 24px; border-right: none; border-bottom: 1px solid #e5e5e9; color: #161616; font-size: 1.8rem; font-weight: 700; line-height: 1.5; letter-spacing: -0.01em; word-break: keep-all; overflow-wrap: break-word; text-align: center; vertical-align: middle }
.usim_plan_table tbody td:first-child, .usim_plan_table tbody td:nth-child(4) { border-right: 1px solid #e5e5e9 }
.usim_plan_data_sub { font-size: 1.4rem; font-weight: 700 }
.usim_plan_dc { color: #107af2; font-size: 1.4rem; font-style: normal; font-weight: 700 }
@media (max-width: 768px) {
  .usim_plan_table th, .usim_plan_table td { padding: 10px 8px; font-size: 1.3rem; font-weight: 700 }
  .usim_plan_dc { font-size: 1.3rem }
}
.usage_group {font-weight:700;} 
.usim_advantage_cards :deep(.feature_card_item) { min-height: 212px }
.gift_advantage_cards :deep(.feature_card_item) { min-height: 271px }
.gift_usage_wrap { display: flex; flex-direction: column; gap: 40px }
.gift_usage_group > h3 { margin-bottom: 24px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em }

@media (max-width: 768px) {
    .gift_usage_group > h3 { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
    .gift_usage_wrap .gift_usage_group :deep(.step_list .step_item) {align-items:flex-start; flex-direction:row;}
    .gift_usage_wrap .gift_usage_group :deep(.step_list .step_item span),
    .usim_use :deep(.step_list .step_item span),
    .hi_pass :deep(.step_list .step_item > span),
    .sec_unpaid_method :deep(.step_list .step_item span),
    .sec_mall_payment_method :deep(.step_list .step_item span),
    .delivery_panel :deep(.step_list .step_item span) { background-color: transparent; background-image: url('@/assets/images/sub/icon_cont_32.png'); background-repeat: no-repeat; }
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
.gift_step_desc{font-weight:700;} 
@media (max-width: 768px) {
  .gift_step_header { gap:6px; margin-bottom: 4px }
  .gift_step_title { font-weight: 700; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
  .gift_step_desc { padding-left:36px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em}
  .gift_step_num { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0 }
}
.gift_step_desc { margin: 0; padding-left: 38px; color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
.gift_usage_heading :deep(.txt_warn) { color: #f95823 !important;  }
@media (max-width: 768px) {
  .gift_usage_heading .txt_warn { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
}
.gift_brand_slider { position: relative; width: 100%; display: flex; align-items: center; gap: 16px }
@media (max-width: 768px) {
  .brand_panel section.sec_gift_brand { padding-left: 0; padding-right:0 }
}
.gift_brand_swiper { width: 100%;  overflow: hidden }
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
  .brand_panel { padding-top: 48px; }
  .service_tab_item { flex: 0 0 clamp(140px, 18.23vw, 175px); gap: 12px }
  .service_tab_item.is_active { background-color: #F8F8F8 }
  .service_tab_label { font-size: 1.6rem }
  .service_tab_wrap::after { content:''; width:clamp(64px, 8vw, 88px); height:100%; background:linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1)); position:absolute; top:0; right:0; pointer-events:none; z-index:1 }
  .pop_lnb { width: 160px }
  .pop_lnb > ul > li > button { font-size: 1.6rem; min-height: 52px }
  .usage_header { gap: 12px; margin-bottom: 24px }
  .usage_select_box { width: 160px }
}

@media (max-width: 768px) {
    .service_tab_wrap { width: calc(100% + 20px); margin-bottom: 40px }
    .service_tab_wrap::after { content:''; width:clamp(24px, 8.53vw, 32px); height:100%; background:linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,1)); position:absolute; top:0; right:0; pointer-events:none; z-index:1 }
    .service_tab_item { gap: 10px }
    .service_tab_item.is_active { background-color: #F8F8F8 }
    .service_tab_item { flex: 0 0 clamp(100px, 26.67vw, 120px); aspect-ratio: 1 / 1.18 }
    .brand_panel .service_tab_icon { width: 32px; height: 32px; background-image:url('@/assets/images/sub/gsrbr010101/icon_mo_set_storetab_off.png'); background-repeat:no-repeat; border-radius: 8px; display: block; flex-shrink: 0 ;}
    .brand_panel .service_tab_item.is_active .service_tab_icon { background-image:url('@/assets/images/sub/gsrbr010101/icon_mo_set_storetab_on.png');}
    .service_tab_label { font-weight: 700; font-size: 1.2rem; line-height: 1.2; letter-spacing: 0% }

    /* 매장/서비스 > 생활 서비스 탭 아이콘 */
    .pop_panel .service_tab_list .service_tab_item:nth-child(1) .service_tab_icon {background-position:-34px -24px;}
    .pop_panel .service_tab_list .service_tab_item:nth-child(2) .service_tab_icon {background-position:-134px -24px;}
    .pop_panel .service_tab_list .service_tab_item:nth-child(3) .service_tab_icon {background-position:-234px -24px;}
    .pop_panel .service_tab_list .service_tab_item:nth-child(4) .service_tab_icon {background-position:-334px -24px;}
    .pop_panel .service_tab_list .service_tab_item:nth-child(5) .service_tab_icon {background-position:-434px -24px;}
    .pop_panel .service_tab_list .service_tab_item:nth-child(6) .service_tab_icon {background-position:-534px -24px;}
    .pop_panel .service_tab_list .service_tab_item:nth-child(7) .service_tab_icon {background-position:-634px -24px;}
    .pop_panel .service_tab_list .service_tab_item:nth-child(8) .service_tab_icon {background-position:-734px -24px;}


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
}

@media (min-width: 769px) and (max-width: 1024px) {
  .pop_wrap { gap: 24px }
  .gift_brand_nav { width: 40px; height: 40px }
  .gift_brand_slider { gap: 12px }
}

@media (max-width: 768px) {
  .cont_inner {overflow-x: clip;}
  .cafe25_img_wrap { max-width: none; overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch }
  .cafe25_img_wrap > img { max-width: none; display: block }
  .cafe25_card_swiper { overflow: visible; margin-bottom: 20px }
  .cafe25_card_swiper .swiper-slide { width: 42vw }
  .cafe25_card_slide { width: 42vw; height: 42vw; overflow: hidden; border-radius: 12px }
  .cafe25_card_slide > img { width: 100%; height: 100%; object-fit: cover; display: block }
  .cafe25_split { flex-direction: column; }
  .cafe25_split > div { flex: none; }
  .cafe25_split_table .cafe25_table th > span, .cafe25_split_table .cafe25_table td > span { font-size: 1.6rem; line-height: 1.5; }
  .brand_panel:first-of-type section:not(:first-of-type) :deep(header) { padding-bottom: 40px }
  .img_grid { grid-template-columns: 1fr; gap: 40px; margin-top: 60px } 
  .img_grid_swiper {overflow: visible }
  .img_grid_swiper :deep(.swiper-slide) { width: 84vw }
  .img_grid_slide { width: 84vw; overflow: hidden; }
  .img_grid_slide > img { width: 100%; height: 100%; object-fit: cover; display: block }
  .img_grid :deep(.diff_qr_row),
  .img_grid_swiper + :deep(.diff_qr_row){margin-top:24px;}
  .diff_bottom_row { flex-direction: column; gap: 20px }
  .gopizza_link { padding: 0 16px; position: relative; gap: 12px }
  .gopizza_link > figure { width: 48px; height: 48px; padding: 0; border: 0; display:block }
  .gopizza_link > figure > img { height: 48px }
  .gopizza_link > div { padding: 0 }
  .gopizza_link > div > strong { font-size: 1.6rem }
  .gopizza_link > div > strong:after { display:none }
  .gopizza_link::after { content: ""; width: 16px; height: 16px; position: absolute; top: 50%; right: 16px; transform: translateY(-50%); background: url("@/assets/images/common/arrow_set_16.png") -56px -20px no-repeat; }
  .info_list > li { margin-bottom: 4px }
  .pop_lnb { display:none }
  .pop_card_swiper {width: calc(100% + 64px); margin: 0 -32px; padding: 12px 32px 40px; overflow: hidden }
  .pop_card_swiper :deep(.swiper-slide) { width: 58.6vw !important; height: auto !important; flex: none }
  .logo_list { grid-template-columns: repeat(2, 1fr) }
  .gift_brand_card > img { width: 100%; height: auto; max-width: 100%; aspect-ratio: 106 / 165 }
  .gift_brand_card > figcaption { font-size: 1.2rem }
  .gift_purchase_wrap { flex-direction: column }
  .gift_purchase_img { width: 100% }
  .gift_purchase_steps { width: 100%; padding:0; }
  .gift_usage_wrap{margin-top:24px;}
  .pop_wrap{width:calc(100% + 40px); margin:0 -20px;}
}
.tax_group_list { display: grid; grid-template-columns: 1fr }
.tax_group_list > dd { margin: 0 0 40px }
.tax_group_list > dd:last-child { margin-bottom: 0 }
@media (max-width: 768px) {
  .tax_group_list { margin-top: 24px }
}
.tax_group_list .list_dotted > li + li { margin-top: 6px }
.tax_group_list .list_dotted > li::before { background-color: #67676f }
.tax_group_list .list_dotted > li p { color:#67676F; font-weight:700; }
.tax_group_subtitle { margin-bottom: 16px; font-size: 2.4rem; font-weight: 700; color: #161616; line-height: 1.35; letter-spacing: -0.01em }
.tax_group_desc, .tax_group_list .list_dotted > li p { font-size: 1.8rem; font-weight:700; color: #67676f; line-height: 1.4 }
@media (max-width: 768px) {
  .tax_group_desc, .tax_group_list .list_dotted > li p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em }
}

@media (max-width: 768px) {
  .tax_group_subtitle { margin-bottom:12px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0% }
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
