<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page_title">{{ t.MainTitle }}</h2>
            <!-- 26.06.10 Del 이종환 <p class="visual_sub">{{ t.MainsubTitle }}</p> -->
        </div>


        <div class="cont_inner">
            <Tabs v-model="CTabIdx" :tab-items="t.Tabs1" tab-class="type_01" :tab-slide="true" @change="onTabChange1" />
            <Tabs
                v-if="CTabIdx === 0"
                v-model="CTabIdxEsgArchive"
                :tab-items="t.TabsEsgArchive"
                tab-class="type_02"
                :tab-slide="true"
            />
            <Tabs
                v-if="CTabIdx === 1"
                v-model="CTabIdxCompliance"
                :tab-items="t.TabsCompliance"
                tab-class="type_02"
                :tab-slide="true"
            />

            <!-- 정도경영 -->
            <div v-show="CTabIdx === 0" class="panel" :aria-label="t.Tabs1?.[0]?.item || ''">
                <!-- 소개 -->
                <div v-show="CTabIdxEsgArchive === 0" class="panel_inner" :aria-label="t.TabsEsgArchive?.[0]?.item || ''">
                    <header class="tab_header">
                        <h2>{{ t.hc10 }} <br class="p_br" />{{ t.hc38 }}</h2>
                    </header>
                    <section>
                        <header class="sub_header">
                            <h3>{{ t.hc31 }}</h3>
                        </header>
                        <FeatureCards
                            class="purpose_feature_cards feature_cards_grid"
                            type="text"
                            :items="t.PurposeFeatureItems"
                            :no-swipe="false"
                        />
                    </section>
                    <section class="sec_history" :aria-label="t.hcAriaHistory">
                        <header class="sub_header">
                            <h3>{{ t.hc42 }}</h3>
                            <p>{{ t.hc04 }}</p>
                        </header>
                        <HistoryTimeline :items="t.HistoryItems" />
                    </section>
                </div>
                <!-- 지침 -->
                <div v-show="CTabIdxEsgArchive === 1" class="panel_inner" :aria-label="t.TabsEsgArchive?.[1]?.item || ''">
                    <header class="tab_header">
                        <h2 v-html="t.EthicsMainTitle"></h2>
                    </header>
                    <section class="gray_box">
                        <header class="sub_header">
                            <h3>{{ t.EthicsCodeTitle }}</h3>
                            <p>{{ t.EthicsCodeDesc }}</p>
                        </header>
                        <div class="button_area"><Buttons tag="a" href="#none" btn-class="btn_icon_arrow btn_xl after border">{{ t.EthicsCodeBtn }}</Buttons></div>
                    </section>
                    <section class="sec_ethics_cards">
                        <ul class="card_list" role="list">
                            <li v-for="card in t.EthicsCardItems" :key="card.key">
                                <CardItem :thumb-src="card.image" :thumb-alt="card.imgAlt || ''">
                                    <template v-if=" card.title" #title>{{ card.title }}</template>
                                    <p v-if="card.desc">{{ card.desc }}</p>
                                </CardItem>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <header class="sub_header">
                            <h3>{{ t.EthicsGuideTitle }}</h3>
                            <p>{{ t.EthicsGuideDesc }}</p>
                        </header>
                        <!-- 세부실천지침 -->
                        <h4 class="practice_title">{{ t.EthicsPracticeSubTitle }}</h4>
                        <ol class="base_list">
                            <li v-for="(item, idx) in t.EthicsPracticeItems" :key="item.key" class="base_item">
                                <em>{{ String(idx + 1).padStart(2, "0") }}</em>
                                <strong>{{ item.title }}</strong>
                                <p>{{ item.desc }}</p>
                            </li>
                        </ol>
                    </section>
                    <section>
                        <header class="sub_header">
                            <h3>{{ t.EthicsPledgeTitle }}</h3>
                            <p>{{ t.EthicsPledgeDesc }}</p>
                        </header>
                        <ol class="base_list type02">
                            <li v-for="(item, idx) in t.EthicsPracticeItems" :key="item.key" class="base_item">
                                <em>{{ String(idx + 1).padStart(2, "0") }}</em>
                                <strong>{{ item.title }}</strong>
                            </li>
                        </ol>
                        <div class="signature_box">
                            <div>
                                <p>{{ t.EthicsPledgeText }}</p>
                                <dl>
                                    <dt>{{ t.EthicsPledgeDateLabel }} : {{ t.EthicsPledgeMeta }}</dt>
                                    <dd>{{ t.EthicsPledgeDeptLabel }} : {{ t.EthicsPledgeCompany }}</dd>
                                    <dd>{{ t.EthicsPledgeNameLabel }} : {{ t.EthicsPledgeName }}</dd>
                                </dl>
                            </div>
                            <span>{{ t.EthicsPledgeToCompany }}</span>

                        </div> 
                    </section>
                </div>
                <!-- 제도 -->
                <div v-show="CTabIdxEsgArchive === 2" class="panel_inner" :aria-label="t.TabsEsgArchive?.[2]?.item || ''">
                    <div class="wrap_tabs_type03">
                        <Tabs
                            v-model="CTabIdxEsgSystem"
                            :tab-items="t.TabsEsgSystem"
                            tab-class="type_03"
                            :tab-slide="true"
                        />
                    </div>
                    <div v-show="CTabIdxEsgSystem === 0" class="panel_third_depth" :aria-label="t.TabsEsgSystem?.[0]?.item || ''">
                        <!-- <header class="sub_header">
                            <h3>{{ t.hc62 }}</h3>
                        </header> -->
                        <ol class="base_list">
                            <li v-for="(row, idx) in t.WhistleGuideSections" :key="row.key" class="base_item">
                                <em>{{ String(idx + 1).padStart(2, "0") }}</em>
                                <strong>{{ row.title }}</strong>
                                <p v-html="row.desc"></p>
                                <div v-if="row.key === 'wg-04'" class="button_area">
                                    <Buttons tag="button" type="button" btn-class="btn_xl border btn_icon_arrow after" @click="goToWhistleTab(1)">
                                        {{ t.hc64 }}
                                    </Buttons>
                                    <Buttons tag="button" type="button" btn-class="btn_xl border btn_icon_arrow after" @click="goToWhistleTab(2)">
                                        {{ t.hc63 }}
                                    </Buttons>
                                </div>
                                <template v-if="row.key === 'wg-05'">
                                    <div class="gray_box">
                                        <div role="list" :aria-label="t.hc75" class="process_flow">
                                            <template v-for="(stepLabel, sIdx) in t.WhistleProcessSteps" :key="stepLabel">
                                                <p role="listitem">{{ stepLabel }}</p>
                                                <ProcessFlowArrow v-if="sIdx < t.WhistleProcessSteps.length - 1" />
                                            </template>
                                        </div>
                                    </div>
                                </template>
                                <div v-if="row.key === 'wg-06'" class="button_area">
                                    <Buttons tag="a" href="#none" btn-class="btn_xl border btn_icon_arrow after">{{ t.hc65 }}</Buttons>
                                </div>
                            </li>
                        </ol>
                    </div>
                    <div v-show="CTabIdxEsgSystem === 1" class="panel_third_depth" :aria-label="t.TabsEsgSystem?.[1]?.item || ''">
                        <!-- <header class="sub_header">
                            <h3>{{ t.WhistleRewardPageTitle }}</h3>
                        </header> -->
                        <ol class="base_list whistle_reward_list">
                            <li v-for="(row, idx) in t.WhistleRewardSections" :key="row.key" class="base_item">
                                <em>{{ String(idx + 1).padStart(2, "0") }}</em>
                                <strong>{{ row.title }}</strong>
                                <div v-if="row.criteriaTables" class="reward_criteria">
                                    <template v-for="(blk, bi) in row.criteriaTables" :key="row.key + '-tbl-' + bi">
                                        <p v-if="blk.sectionLead" v-html="blk.sectionLead"></p>
                                        <div class="common_table_scroll">
                                            <table class="common_table">
                                                <thead>
                                                    <tr>
                                                        <th v-for="col in blk.cols" :key="col" scope="col">{{ col }}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td v-for="(cell, ci) in blk.cells" :key="ci">
                                                            <p class="common_table_sub">{{ cell.sub }}</p>
                                                            <p v-html="cell.desc"></p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </template>
                                </div>
                                <p v-else v-html="row.desc"></p>
                            </li>
                        </ol>
                        <div class="button_area reward_report_btn">
                            <Buttons tag="a" href="#none" btn-class="btn_xl primary btn_icon_arrow after">{{ t.hc65 }}</Buttons>
                        </div>
                    </div>
                    <div v-show="CTabIdxEsgSystem === 2" class="panel_third_depth" :aria-label="t.TabsEsgSystem?.[2]?.item || ''">
                        <header class="sub_header">
                            <!-- <h3>{{ t.WhistleProtectPageTitle }}</h3> -->
                            <p>{{ t.WhistleProtectPageDesc }}</p>
                        </header>
                        <ol class="base_list">
                            <li v-for="(row, idx) in t.WhistleProtectSections" :key="row.key" class="base_item">
                                <em>{{ String(idx + 1).padStart(2, "0") }}</em>
                                <strong>{{ row.title }}</strong>
                                <p v-html="row.desc"></p>
                                <div v-if="row.grayBox" class="gray_box type02">
                                    <strong>{{ row.grayBox.title }}</strong>
                                    <p v-html="row.grayBox.desc"></p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
                <div v-show="CTabIdxEsgArchive === 3" class="panel_inner" :aria-label="t.TabsEsgArchive?.[3]?.item || ''">
                    <template v-if="!isEthicsInquiryOpen">
                        <header class="tab_header">
                            <h2 v-html="t.ReportIntroTitle"></h2>
                            <p>{{ t.ReportIntroDesc }}</p>
                        </header>
                        <section>
                            <ul class="report_channel_list">
                                <li v-for="item in t.ReportChannelItems" :key="item.key" class="report_channel_item">
                                    <article class="report_channel_card">
                                        <figure class="report_channel_thumb" :class="'thumb_' + item.key" aria-hidden="true" />
                                        <div class="report_channel_body">
                                            <h3>{{ item.title }}</h3>
                                            <p v-html="item.desc"></p>
                                            <div class="button_area">
                                                <Buttons
                                                    v-if="item.key === 'ethics'"
                                                    tag="button"
                                                    type="button"
                                                    btn-class="btn_xl border btn_icon_arrow after"
                                                    @click="openEthicsInquiry"
                                                >
                                                    {{ item.btnText }}
                                                </Buttons>
                                                <Buttons v-else tag="a" href="#none" btn-class="btn_xl border btn_icon_arrow after">{{ item.btnText }}</Buttons>
                                            </div>
                                        </div>
                                    </article>
                                </li>
                            </ul>
                            <ul class="list_cuation">
                                <li v-for="(notice, nIdx) in t.ReportNotice" :key="'report-notice-' + nIdx">
                                    <p v-html="notice"></p>
                                </li>
                            </ul>
                        </section>
                    </template>
                    <template v-else>
                        <header class="tab_header">
                            <h2>{{ t.hc56 }}</h2>
                            <p>{{ t.hc40 }}</p>
                        </header>
                        <section>
                            <header class="sub_header">
                                <h3>{{ t.hc58 }}</h3>
                                <p class="txt_blue">{{ t.hc57 }}</p>
                            </header>
                            <ul class="list_dotted">
                                <li>
                                    <p>{{ t.hc45 }}</p>
                                </li>
                                <li>
                                    <p>{{ t.hc34 }}</p>
                                </li>
                                <li>
                                    <p>{{ t.hc13 }}</p>
                                </li>
                                <li>
                                    <p>{{ t.hc69 }}</p>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <header class="sub_header">
                                <h3>{{ t.hc06 }}</h3>
                            </header>
                            <NumberedInfoList
                                class="ethics_target_list"
                                :items="t.EthicsReportTargetItems"
                                :show-icon="true"
                            />
                        </section>
                        <section>
                            <ConsentInfoBox
                                :required="t.EthicsConsentRequired"
                                :title="t.EthicsConsentTitle"
                                :notice-html="t.EthicsConsentNotice"
                                :items="t.EthicsConsentItems"
                                v-model="isEthicsConsentAgreed"
                            />
                            <ConsentInfoBox
                                :required="t.EthicsConsentRequired2"
                                :title="t.EthicsConsentTitle"
                                :notice-html="t.EthicsConsentNotice"
                                :items="t.EthicsConsentItems2"
                                v-model="isEthicsConsentAgreed2"
                            />
                            <div class="report_form_wrap">
                                <div class="apply_form">
                                    <div class="form_head">
                                        <h3 class="form_head_title">{{ t.hc16 }}</h3>
                                        <span class="form_required_note">{{ t.hc02 }}</span>
                                    </div>
                                    <div class="form_body">
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hc46 }}<span class="form_required">*</span></div>
                                            <div class="form_field form_field_name">
                                                <Inputs type="text" v-model="ethicsReportForm.name" />
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hcEmailLabel }}<span class="form_required">*</span></div>
                                            <div class="form_field form_field_email">
                                                <Inputs type="text" v-model="ethicsReportForm.emailId" />
                                                <span class="form_sep">@</span>
                                                <Inputs type="text" v-model="ethicsReportForm.emailDomain" />
                                                <label class="select">
                                                    <div>
                                                        <select v-model="ethicsReportForm.emailDomainSelect">
                                                            <option v-for="opt in ethicsEmailDomainOptions" :key="opt" :value="opt">{{ opt }}</option>
                                                        </select>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hc41 }}<span class="form_required">*</span></div>
                                            <div class="form_field form_field_phone">
                                                <Inputs type="text" v-model="ethicsReportForm.phonePrefix" is-disabled="true" />
                                                <span class="form_sep">-</span>
                                                <Inputs type="text" v-model="ethicsReportForm.phoneMid" />
                                                <span class="form_sep">-</span>
                                                <Inputs type="text" v-model="ethicsReportForm.phoneTail" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
    
                                <div class="apply_form">
                                    <div class="form_head">
                                        <h3 class="form_head_title">{{ t.hc61 }}</h3>
                                        <span class="form_required_note">{{ t.hc02 }}</span>
                                    </div>
                                    <div class="form_body">
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hc24 }}<span class="form_required">*</span></div>
                                            <div class="form_field">
                                                <label class="select">
                                                    <div>
                                                        <select v-model="ethicsReportForm.division">
                                                            <option v-for="opt in ethicsDivisionOptions" :key="opt" :value="opt">{{ opt }}</option>
                                                        </select>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hc60 }}<span class="form_required">*</span></div>
                                            <div class="form_field">
                                                <label class="select">
                                                    <div>
                                                        <select v-model="ethicsReportForm.reportType">
                                                            <option v-for="opt in ethicsReportTypeOptions" :key="opt" :value="opt">{{ opt }}</option>
                                                        </select>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hc28 }}<span class="form_required">*</span></div>
                                            <div class="form_field form_field_store">
                                                <Inputs type="text" v-model="ethicsReportForm.storeName" />
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hc59 }}<span class="form_required">*</span></div>
                                            <div class="form_field">
                                                <Inputs type="text" v-model="ethicsReportForm.title" />
                                            </div>
                                        </div>
                                        <div class="form_row form_row_content">
                                            <div class="form_label">{{ t.hc27 }}<span class="form_required">*</span></div>
                                            <div class="form_field form_field_content">
                                                <textarea
                                                    v-model="ethicsReportForm.content"
                                                    :placeholder="t.hcPlaceholder5W1H"
                                                />
                                                <p class="form_field_note">{{ t.hc12 }}</p>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hc67 }}</div>
                                            <div class="form_field form_field_file">
                                                <FileUpload :lang="lang" :multiple="true" accept="*" @update:files="onFiles" />
                                                <p class="form_field_note">{{ t.hc01 }}</p>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="form_label">{{ t.hc70 }}</div>
                                            <div class="form_field">
                                                <label class="select">
                                                    <div>
                                                        <select v-model="ethicsReportForm.replyType">
                                                            <option v-for="opt in ethicsReplyTypeOptions" :key="opt" :value="opt">{{ opt }}</option>
                                                        </select>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form_action_area">
                                    <Buttons btn-class="btn_big primary">{{ t.hc37 }}</Buttons>
                                    <Buttons tag="button" type="button" btn-class="btn_big gray" @click="closeEthicsInquiry">
                                        {{ t.hc66 }}
                                    </Buttons>
                                </div>
                            </div>
                        </section>
                    </template>
                </div>
            </div>

            <!-- 준법경영 -->
            <div v-show="CTabIdx === 1" class="panel" :aria-label="t.Tabs1?.[1]?.item || ''">
                <div v-show="CTabIdxCompliance === 0" class="panel_inner" :aria-label="t.TabsCompliance?.[0]?.item || ''">
                    <header class="tab_header">
                        <h2 v-html="t.ComplianceProgramHeroTitle"></h2>
                    </header>
                    <section>
                        <header class="sub_header">
                            <p v-html="t.ComplianceProgramLead"></p>
                        </header>
                        <FeatureCards
                            class="law_feature_cards feature_cards_grid"
                            type="num"
                            :items="t.ComplianceProgramFeatureItems"
                            :no-swipe="false"
                        />
                    </section>
                    <div class="signature_box type02">
                        <div>
                            <strong>{{ t.ComplianceManualTitle }}</strong>
                            <p>{{ t.ComplianceManualMeta }}</p>
                        </div>
                        <div class="button_area">
                            <Buttons tag="a" href="#none" btn-class="btn_mid border btn_icon_arrow after">
                                {{ t.ComplianceManualBtnEbook }}
                            </Buttons>
                            <Buttons tag="a" href="#none" btn-class="btn_mid border btn_download_file">
                                {{ t.ComplianceManualBtnDownload }}
                            </Buttons>
                        </div>
                    </div>
                </div>
                <div v-show="CTabIdxCompliance === 1" class="panel_inner" :aria-label="t.TabsCompliance?.[1]?.item || ''">
                    <!-- {{ t.hc48 }} 안내 -->
                    <header class="tab_header ac">
                        <h2>{{ t.hc11 }} <br />
                            {{ t.hc54 }}</h2>
                    </header>
                    <section>
                        <header class="sub_header">
                            <h3>{{ t.hc50 }}</h3>
                        </header>
                        <FeatureCards
                            class="law_feature_cards feature_cards_grid cp_manager_role_cards"
                            type="num"
                            :items="t.ComplianceManagerRoleFeatureItems"
                            :no-swipe="false"
                        />
                    </section>
                    <section>
                        <header class="sub_header">
                            <h3>{{ t.hc49 }}</h3>
                        </header>
                        <div class="cp_appoint_board">
                            <div role="list" :aria-label="t.hcAriaOfficerProc" class="process_flow">
                                <template v-for="(step, sIdx) in t.ComplianceAppointmentSteps" :key="step.key">
                                    <article role="listitem">
                                        <h4 v-html="step.title"></h4>
                                        <p>{{ step.note }}</p>
                                    </article>
                                    <ProcessFlowArrow v-if="sIdx < t.ComplianceAppointmentSteps.length - 1" />
                                </template>
                            </div>
                        </div>
                    </section>
                    <section>
                        <header class="sub_header">
                            <h3>{{ t.hc48 }}</h3>
                        </header>
                        <figure class="cp_manager_banner">
                            <figcaption>
                                <strong>{{ t.hc08 }}<br />{{ t.hc19 }} <br />{{ t.hc30 }}</strong>
                                <p>{{ t.hc22 }} <br />{{ t.hc36 }}<br /><br />
                                    {{ t.hc32 }}<br />
                                    {{ t.hc15 }} <br />
                                    {{ t.hc55 }}
                                </p>
                                <div class="cp_manager_banner_content">
                                    <dl>
                                        <dt>{{ t.hc07 }}</dt>
                                        <dd>{{ t.hc35 }} <strong>{{ t.hc23 }}</strong></dd>
                                    </dl>
                                    <div>
                                        <img src="@/assets/images/dummy/gsrsu040101_11.png" :alt="t.hcAltSign">
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                        <p>
                            {{ t.hc05 }} <br />
                            {{ t.hc39 }}<br /><br />

                            {{ t.hc47 }}<br />
                            {{ t.hc43 }}<br />
                            {{ t.hc25 }}<br /><br />

                            {{ t.hc20 }}<br />
                            {{ t.hc26 }} <br />
                            {{ t.hc18 }}<br /><br />

                            {{ t.hc68 }}<br />
                            {{ t.hc03 }}<br />
                            {{ t.hc52 }}<br /><br />

                            {{ t.hc21 }}<br />
                            {{ t.hc29 }}<br />
                            {{ t.hc53 }}<br /><br />

                            {{ t.hc33 }}<br />
                            {{ t.hc44 }}<br /><br />
                            {{ t.hc51 }}<br /><br />

                            {{ t.hc14 }}
                        </p>
                    </section>
                </div>
                <div v-show="CTabIdxCompliance === 2" class="panel_inner" :aria-label="t.TabsCompliance?.[2]?.item || ''">
                    <!-- 공정거래 4대 가이드라인 (Figma 491:13910) -->
                    <header class="tab_header">
                        <h2>{{ t.hc09 }}<br />{{ t.hc17 }}</h2>
                    </header>
                    <section>
                        <FeatureCards
                            class="feature_cards_grid ft_gd_cards"
                            type="num"
                            :items="t.FairTradeGuidelineItems"
                            :no-swipe="true"
                        >
                            <template #action="{item}">
                                <Buttons btn-class="btn_xl border btn_icon_arrow after"
                                    @click="openModal" 
                                    :data-popid="item.popContId" 
                                    data-type="lg" 
                                    :data-cont="item.popContId">
                                {{ t.FairTradeGuidelineDetailBtn }}</Buttons>
                            </template>
                        </FeatureCards>
                    </section>
                </div>
                <div v-show="CTabIdxCompliance === 3" class="panel_inner" :aria-label="t.TabsCompliance?.[3]?.item || ''">
                    <div class="wrap_tabs_type03">
                        <Tabs
                            v-model="CTabIdxFairTradeBiz"
                            :tab-items="t.TabsFairTradeBiz"
                            tab-class="type_03"
                            :tab-slide="true"
                        />
                    </div>
                    <div v-show="CTabIdxFairTradeBiz === 0" class="panel_third_depth" :aria-label="t.TabsFairTradeBiz?.[0]?.item || ''">
                        <section class="ft_acc_wrap">
                            <Accordion>
                                <AccordionItem v-for="item in t.FairTradeWorkStandardAccordionItems" :key="'sup-' + item.key" :item-key="'sup-' + item.key">
                                    <template #title><strong v-html="item.title" class="acc_tit_txt"></strong></template>
                                    <template v-if="item.key === '01' || item.key === '02' || item.key === '03' || item.key === '04' || item.key === '05' || item.key === '06' || item.key === '07' || item.key === '08'">
                                        <ol class="ft_sec_list">
                                            <li v-for="section in item.key === '02' ? t.FairTradeSalesIncentiveSections : item.key === '03' ? t.FairTradePromotionCostSharingSections : item.key === '04' ? t.FairInteriorAndPromotionCostSharingSections : item.key === '05' ? t.FairPartnerCompanyManagementSections : item.key === '06' ? t.FairPartnerEmployeeDispatchSections : item.key === '07' ? t.FairPartnerSpecialPurchaseSections : item.key === '08' ? t.FairPartnerReturnRelatedSections : t.FairTradePartnerStandardSections" :key="'sup-sec-' + item.key + '-' + (section.no !== undefined && section.no !== '' ? section.no : section.title || 'sec')">
                                                <article :class="{ gray_box: isFairTradeAddendumSection(section) }">
                                                    <template v-if="isFairTradeAddendumSection(section)">
                                                        <ul v-if="section.addendumItems">
                                                            <li v-for="(text, idx) in section.addendumItems" :key="'sup-add-' + item.key + '-' + idx">
                                                                <p>{{ text }}</p>
                                                            </li>
                                                        </ul>
                                                        <p v-if="section.addendumText" v-html="section.addendumText"></p>
                                                    </template>
                                                    <template v-else>
                                                        <h4>{{ section.title ? `${section.no} ${section.title}` : section.no }}</h4>
                                                        <div class="ft_stack">
                                                            <p v-if="section.lead">{{ section.lead }}</p>
                                                            <component v-if="section.items" :is="(item.key === '02' && section.no === '05') || section.usePlainList ? 'ul' : 'ol'" :class="(item.key === '02' && section.no === '05') || section.usePlainList ? 'plain_list' : 'num_list'">
                                                                <li v-for="row in section.items" :key="'sup-sec-' + section.no + '-' + row.num">
                                                                    <p v-html="row.title"></p>
                                                                    <dl v-if="row.criteria" class="ft_kvs">
                                                                        <template v-for="(crit, rIdx) in row.criteria" :key="'sup-sec-' + section.no + '-' + row.num + '-crit-' + rIdx">
                                                                            <dt v-if="crit.term || crit.text">{{ crit.term || crit.text }}</dt>
                                                                            <dd>
                                                                                <ul v-if="crit.details" class="ft_note_ul">
                                                                                    <li v-for="(detail, ddIdx) in crit.details" :key="'sup-sec-' + section.no + '-' + row.num + '-crit-' + rIdx + '-detail-' + ddIdx">
                                                                                        <template v-if="typeof detail === 'string'">
                                                                                            <span v-html="detail"></span>
                                                                                        </template>
                                                                                        <template v-else>
                                                                                            <p v-if="detail.text" v-html="detail.text"></p>
                                                                                            <p v-if="detail.desc" class="sub_txt" v-html="detail.desc"></p>
                                                                                            <ul v-if="detail.children">
                                                                                                <li v-for="(child, cIdx) in detail.children" :key="'sup-sec-' + section.no + '-' + row.num + '-crit-' + rIdx + '-detail-' + ddIdx + '-' + cIdx" v-html="child"></li>
                                                                                            </ul>
                                                                                        </template>
                                                                                    </li>
                                                                                </ul>
                                                                            </dd>
                                                                        </template>
                                                                    </dl>
                                                                    <ul v-if="row.details">
                                                                        <li v-for="(detail, dIdx) in row.details" :key="'sup-sec-' + section.no + '-' + row.num + '-' + dIdx">
                                                                            <template v-if="typeof detail === 'string'">
                                                                                {{ detail }}
                                                                            </template>
                                                                            <template v-else>
                                                                                <p>{{ detail.text }}</p>
                                                                                <ul v-if="detail.children">
                                                                                    <li v-for="(child, cIdx) in detail.children" :key="'sup-sec-' + section.no + '-' + row.num + '-' + dIdx + '-' + cIdx">
                                                                                        <template v-if="typeof child === 'string'">
                                                                                            <span v-html="child"></span>
                                                                                        </template>
                                                                                        <template v-else>
                                                                                            <dl>
                                                                                                <dt v-if="child.text" v-html="child.text"></dt>
                                                                                                <dd>
                                                                                                    <ul v-if="child.children">
                                                                                                        <li v-for="(grandChild, gIdx) in child.children" :key="'sup-sec-' + section.no + '-' + row.num + '-' + dIdx + '-' + cIdx + '-' + gIdx" v-html="grandChild"></li>
                                                                                                    </ul>
                                                                                                </dd>
                                                                                            </dl>
                                                                                        </template>
                                                                                    </li>
                                                                                </ul>
                                                                            </template>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </component>
                                                            <dl v-if="section.criteria" class="ft_kvs">
                                                                <template v-for="row in section.criteria" :key="'sup-sec-' + section.no + '-' + row.term">
                                                                    <dt>{{ row.term }}</dt>
                                                                    <dd>
                                                                        <ul v-if="row.details" class="ft_note_ul">
                                                                            <li v-for="detail in row.details" :key="'sup-sec-' + section.no + '-' + row.term + '-' + detail">{{ detail }}</li>
                                                                        </ul>
                                                                        <p v-else>{{ row.desc }}</p>
                                                                    </dd>
                                                                </template>
                                                            </dl>
                                                            <ol v-if="section.definitions" class="num_list">
                                                                <li v-for="row in section.definitions" :key="'sup-sec-' + section.no + '-' + row.term">
                                                                    <p>{{ `${row.desc}` }}</p>
                                                                    <ul v-if="row.details">
                                                                        <li v-for="detail in row.details" :key="'sup-sec-' + section.no + '-' + row.term + '-' + detail">{{ detail }}</li>
                                                                    </ul>
                                                                </li>
                                                            </ol>
                                                        </div>
                                                    </template>    
                                                </article>
                                            </li>
                                        </ol>
                                    </template>
                                    <p v-else class="ft_preface">{{ item.desc }}</p>
                                </AccordionItem>
                            </Accordion>
                        </section>
                    </div>
                    <div v-show="CTabIdxFairTradeBiz === 1" class="panel_third_depth" :aria-label="t.TabsFairTradeBiz?.[1]?.item || ''">
                        <section class="ft_acc_wrap">
                            <Accordion>
                                <AccordionItem v-for="item in t.FairTradeHomeShoppingAccordionItems" :key="'tv-' + item.key" :item-key="'tv-' + item.key">
                                    <template #title><strong v-html="item.title" class="acc_tit_txt"></strong></template>
                                    <template v-if="item.key === '01' || item.key === '02' || item.key === '03' || item.key === '04' || item.key === '05' || item.key === '06' || item.key === '07' || item.key === '08' || item.key === '09' || item.key === '10' || item.key === '11' || item.key === '12'">
                                        <ol class="ft_sec_list">
                                            <li v-for="section in item.key === '01' ? t.FairTradeHomeShoppingCooperationSections : item.key === '02' ? t.FairTradeHomeShoppingTermsSections : item.key === '03' ? t.FairTradeHomeShoppingFixedCommissionSections : item.key === '04' ? t.FairTradeHomeShoppingPromotionSections : item.key === '05' ? t.FairTradeHomeShoppingProductionCostSections : item.key === '06' ? t.FairTradeHomeShoppingReturnSections : item.key === '07' ? t.FairTradeHomeShoppingManagementInfoSections : item.key === '08' ? t.FairTradeHomeShoppingGuidelineComplianceSections : item.key === '09' ? t.FairTradeHomeShoppingProductSelectionSections : item.key === '10' ? t.FairTradeHomeShoppingIntangibleProductSections : item.key === '11' ? t.FairTradeHomeShoppingLinkedProgrammingSections : item.key==='12' ?  t.FairTradeHomeShoppingDamageCompensationSections : []" :key="'tv-sec-' + item.key + '-' + (section.no !== undefined && section.no !== '' ? section.no : section.title || 'sec')">
                                                <article :class="{ gray_box: isFairTradeAddendumSection(section) }">
                                                    <template v-if="isFairTradeAddendumSection(section)">
                                                        <ul v-if="section.addendumItems">
                                                            <li v-for="(text, idx) in section.addendumItems" :key="'tv-add-' + item.key + '-' + idx">
                                                                <p>{{ text }}</p>
                                                            </li>
                                                        </ul>
                                                        <p v-if="section.addendumText" v-html="section.addendumText"></p>
                                                    </template>
                                                    <template v-else>
                                                        <h4>{{ section.title ? `${section.no} ${section.title}` : section.no }}</h4>
                                                        <div class="ft_stack">
                                                            <p v-if="section.lead">{{ section.lead }}</p>
                                                            <component v-if="section.items" :is="section.usePlainList ? 'ul' : 'ol'" :class="section.usePlainList ? 'plain_list' : 'num_list'">
                                                                <li v-for="row in section.items" :key="'tv-sec-' + section.no + '-' + row.num">
                                                                    <p v-html="row.title"></p>
                                                                    <ul v-if="row.details">
                                                                        <li v-for="(detail, dIdx) in row.details" :key="'tv-sec-' + section.no + '-' + row.num + '-' + dIdx">
                                                                            <template v-if="typeof detail === 'string'">
                                                                                {{ detail }}
                                                                            </template>
                                                                            <template v-else>
                                                                                <p>{{ detail.text }}</p>
                                                                                <ul v-if="detail.children">
                                                                                    <li v-for="(child, cIdx) in detail.children" :key="'tv-sec-' + section.no + '-' + row.num + '-' + dIdx + '-' + cIdx">{{ child }}</li>
                                                                                </ul>
                                                                            </template>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </component>
                                                            <dl v-if="section.criteria" class="ft_kvs">
                                                                <template v-for="row in section.criteria" :key="'tv-sec-' + section.no + '-' + row.term">
                                                                    <dt>{{ row.term }}</dt>
                                                                    <dd>
                                                                        <ul v-if="row.details" class="ft_note_ul">
                                                                            <li v-for="detail in row.details" :key="'tv-sec-' + section.no + '-' + row.term + '-' + detail">{{ detail }}</li>
                                                                        </ul>
                                                                        <p v-else>{{ row.desc }}</p>
                                                                    </dd>
                                                                </template>
                                                            </dl>
                                                            <ol v-if="section.definitions" class="num_list">
                                                                <li v-for="row in section.definitions" :key="'tv-sec-' + section.no + '-' + row.term">
                                                                    <p>{{ `${row.desc}` }}</p>
                                                                    <ul v-if="row.details">
                                                                        <li v-for="detail in row.details" :key="'tv-sec-' + section.no + '-' + row.term + '-' + detail">{{ detail }}</li>
                                                                    </ul>
                                                                </li>
                                                            </ol>
                                                            <p v-if="section.appendixTitle" class="ft_preface">{{ section.appendixTitle }}</p>
                                                            <div v-if="section.commonTables">
                                                                <template v-for="(tbl, tIdx) in section.commonTables" :key="'tv-common-table-' + section.no + '-' + tIdx">
                                                                    <div class="table_wrap">
                                                                        <p v-if="tbl.appendixTitle" class="ft_preface">{{ tbl.appendixTitle }}</p>
                                                                        <div class="common_table_scroll" :class="{ common_table_scroll_type_02: tbl.tableClass === 'type_02' }" :data-node-id="tbl.tableClass === 'type_02' ? '674:44720' : undefined">
                                                                            <table :class="getFairTradeCommonTableClassArray(tbl)">
                                                                                <colgroup v-if="getCommonTableColGroupCount(tbl) > 0">
                                                                                    <col
                                                                                        v-for="n in getCommonTableColGroupCount(tbl)"
                                                                                        :key="'tv-col-' + section.no + '-' + tIdx + '-' + (n - 1)"
                                                                                        :style="getCommonTableColWidthStyle(tbl, n - 1)"
                                                                                    />
                                                                                </colgroup>
                                                                                <thead>
                                                                                    <template v-if="tbl.theadRows && tbl.theadRows.length">
                                                                                        <tr v-for="(hRow, hRidx) in tbl.theadRows" :key="'tv-thead-' + section.no + '-' + tIdx + '-' + hRidx">
                                                                                            <th
                                                                                                v-for="(hCell, hCidx) in hRow"
                                                                                                :key="'tv-thead-cell-' + section.no + '-' + tIdx + '-' + hRidx + '-' + hCidx"
                                                                                                scope="col"
                                                                                                :rowspan="getCommonTableRowspan(hCell)"
                                                                                                :colspan="getCommonTableColspan(hCell)"
                                                                                            >
                                                                                                <template v-if="typeof hCell === 'object' && hCell && !Array.isArray(hCell)">
                                                                                                    <span v-if="hCell.html != null && hCell.html !== ''" v-html="hCell.html"></span>
                                                                                                    <template v-else>{{ hCell.label !== undefined ? hCell.label : "" }}</template>
                                                                                                </template>
                                                                                                <template v-else>{{ hCell }}</template>
                                                                                            </th>
                                                                                        </tr>
                                                                                    </template>
                                                                                    <tr v-else-if="tbl.cols && tbl.cols.length">
                                                                                        <th
                                                                                            v-for="(col, colIdx) in tbl.cols"
                                                                                            :key="'tv-common-col-' + section.no + '-' + tIdx + '-' + colIdx"
                                                                                            scope="col"
                                                                                            :rowspan="getCommonTableRowspan(col)"
                                                                                            :colspan="getCommonTableColspan(col) !== undefined ? getCommonTableColspan(col) : (typeof col === 'object' && col && col.colspan ? col.colspan : undefined)"
                                                                                        >
                                                                                            <template v-if="typeof col === 'object' && col && !Array.isArray(col)">
                                                                                                <span v-if="col.html != null && col.html !== ''" v-html="col.html"></span>
                                                                                                <template v-else>{{ col.label !== undefined ? col.label : "" }}</template>
                                                                                            </template>
                                                                                            <template v-else>{{ col }}</template>
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr v-for="(row, rIdx) in tbl.rows" :key="'tv-common-row-' + section.no + '-' + tIdx + '-' + rIdx">
                                                                                        <td
                                                                                            v-for="(cell, cIdx) in row"
                                                                                            :key="'tv-common-cell-' + section.no + '-' + tIdx + '-' + rIdx + '-' + cIdx"
                                                                                            :rowspan="getCommonTableRowspan(cell)"
                                                                                            :colspan="getCommonTableColspan(cell)"
                                                                                            :style="getCommonTableCellTdStyle(cell)"
                                                                                            :class="{ txt_verticle: typeof cell === 'object' && cell && cell.txt_verticle === true }"
                                                                                        >
                                                                                            <template v-if="Array.isArray(cell)">
                                                                                                <template v-for="(line, pIdx) in cell" :key="'tv-common-line-' + section.no + '-' + tIdx + '-' + rIdx + '-' + cIdx + '-' + pIdx">
                                                                                                    <p v-if="tableCellLineHasLeadMark(line)" :class="{ txt_warn: pIdx === 1, dot_txt: true }">{{ stripTableCellLeadMarkPlain(line) }}</p>
                                                                                                    <p v-else :class="{ txt_warn: pIdx === 1, warn_txt: tableCellLineHasWarnTxt(line) }" v-html="line"></p>
                                                                                                </template>
                                                                                            </template>
                                                                                            <template v-else-if="isCommonTableMergedMetaCell(cell)">
                                                                                                <p v-html="cell.html !== undefined ? cell.html : cell.label"></p>
                                                                                            </template>
                                                                                            <template v-else-if="isCommonTableStyledTextCell(cell)">
                                                                                                <p v-if="cell.html != null && cell.html !== ''" v-html="cell.html"></p>
                                                                                                <template v-else>{{ cell.label }}</template>
                                                                                            </template>
                                                                                            <template v-else-if="typeof cell === 'object' && cell && cell.numList">
                                                                                                <ul class="common_num_list">
                                                                                                    <li v-for="(text, nIdx) in cell.numList" :key="'tv-common-num-' + section.no + '-' + tIdx + '-' + rIdx + '-' + cIdx + '-' + nIdx">
                                                                                                        <p v-html="text"></p>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </template>
                                                                                            <template v-else-if="getTableCellBulletParagraphs(cell)">
                                                                                                <p
                                                                                                    v-for="(seg, sIdx) in getTableCellBulletParagraphs(cell)"
                                                                                                    :key="'tv-common-bull-' + section.no + '-' + tIdx + '-' + rIdx + '-' + cIdx + '-' + sIdx"
                                                                                                    :class="{ dot_txt: seg.bullet, warn_txt: seg.warn }"
                                                                                                    v-html="seg.html"
                                                                                                ></p>
                                                                                            </template>
                                                                                            <p v-else v-html="cell"></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table
                                                                                v-if="isTblDualGrid(tbl)"
                                                                                class="common_table type_01 tbl_dual_mo"
                                                                            >
                                                                                <colgroup>
                                                                                    <col style="width: 50px" />
                                                                                    <col style="width: 165px" />
                                                                                    <col style="width: 80px" />
                                                                                </colgroup>
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th v-for="(mh, mhIdx) in appendixPartnerEvalMobileHeadLabels(tbl)" :key="'tv-mo-h-' + section.no + '-' + tIdx + '-' + mhIdx" scope="col">{{ mh }}</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr v-for="(trCells, trIdx) in appendixPartnerEvalMobileTrDescriptors(tbl)" :key="'tv-mo-tr-' + section.no + '-' + tIdx + '-' + trIdx">
                                                                                        <td
                                                                                            v-for="(tdDef, tdIdx) in trCells"
                                                                                            :key="'tv-mo-td-' + section.no + '-' + tIdx + '-' + trIdx + '-' + tdIdx"
                                                                                            :rowspan="tdDef.rowspan"
                                                                                            :style="tdDef.style"
                                                                                            :class="{ txt_verticle: tdDef.lead && tdDef.cell && tdDef.cell.txt_verticle === true }"
                                                                                        >
                                                                                            <template v-if="tdDef.lead">
                                                                                                <p class="mo_cell_lead" v-html="appendixPartnerEvalMoLeadMobileHtml(tdDef.cell)"></p>
                                                                                            </template>
                                                                                            <template v-else-if="typeof tdDef.cell === 'object' && tdDef.cell && tdDef.cell.html">
                                                                                                <p v-html="tdDef.cell.html"></p>
                                                                                            </template>
                                                                                            <template v-else-if="typeof tdDef.cell === 'object' && tdDef.cell && tdDef.cell.label !== undefined">
                                                                                                {{ tdDef.cell.label }}
                                                                                            </template>
                                                                                            <p v-else>{{ tdDef.cell }}</p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>

                                                                </template>
                                                                <ul v-if="section.cautionItems" class="list_cuation">
                                                                    <li v-for="(notice, nIdx) in section.cautionItems" :key="'tv-caution-' + section.no + '-' + nIdx">
                                                                        <p v-html="notice"></p>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </template>
                                                </article>
                                            </li>
                                        </ol>
                                    </template>
                                    <p v-else class="ft_preface">{{ item.desc }}</p>
                                </AccordionItem>
                            </Accordion>
                        </section>
                    </div>
                   
                </div>
            </div>


        </div>

        <div id="gsrsu04020301" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu04020302" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu04020303" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu04020304" class="modal_wrap">
            <div class="modal_container"></div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, ref, watch } from "vue";
import Tabs from "@/components/Tabs.vue";
import FeatureCards from "@/components/FeatureCards.vue";
import Accordion from "@/components/Accordion.vue";
import AccordionItem from "@/components/AccordionItem.vue";
import Buttons from "@/components/Buttons.vue";
import Inputs from "@/components/Inputs.vue";
import CardItem from "@/components/CardItem.vue";
import NumberedInfoList from "@/components/NumberedInfoList.vue";
import ConsentInfoBox from "@/components/ConsentInfoBox.vue";
import ProcessFlowArrow from "@/components/ProcessFlowArrow.vue";
import HistoryTimeline from "@/components/HistoryTimeline.vue";
import imgEthics01 from "@/assets/images/dummy/gsrsu040101_01.png";
import imgEthics02 from "@/assets/images/dummy/gsrsu040101_02.png";
import imgEthics03 from "@/assets/images/dummy/gsrsu040101_03.png";
import imgEthics04 from "@/assets/images/dummy/gsrsu040101_04.png";
import imgEthics05 from "@/assets/images/dummy/gsrsu040101_05.png";
import imgEthics06 from "@/assets/images/dummy/gsrsu040101_06.png";
import modal from "@/assets/js/modal";
import FileUpload from "@/components/FileUpload.vue";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

function getCommonTableRowspan(cell) {
    if (cell === null || typeof cell !== "object" || Array.isArray(cell)) return undefined;
    const n = Number(cell.rowspan);
    return n >= 2 ? n : undefined;
}
function getCommonTableColspan(cell) {
    if (cell === null || typeof cell !== "object" || Array.isArray(cell)) return undefined;
    const n = Number(cell.colspan);
    return n >= 2 ? n : undefined;
}
function commonTableCellColspanUnits(cell) {
    const cs = getCommonTableColspan(cell);
    return cs != null ? cs : 1;
}
function getCommonTableColGroupCount(tbl) {
    if (!tbl) return 0;
    if (tbl.colgroupWidths && tbl.colgroupWidths.length) return tbl.colgroupWidths.length;
    if (tbl.theadRows && tbl.theadRows.length > 0 && Array.isArray(tbl.theadRows[0])) {
        const sum = tbl.theadRows[0].reduce((acc, hCell) => acc + commonTableCellColspanUnits(hCell), 0);
        return sum > 0 ? sum : 0;
    }
    if (tbl.cols && tbl.cols.length) {
        const sum = tbl.cols.reduce((acc, col) => acc + commonTableCellColspanUnits(col), 0);
        return sum > 0 ? sum : 0;
    }
    if (tbl.rows && tbl.rows.length > 0 && Array.isArray(tbl.rows[0])) {
        const sum = tbl.rows[0].reduce((acc, cell) => acc + commonTableCellColspanUnits(cell), 0);
        return sum > 0 ? sum : 0;
    }
    return 0;
}
function getCommonTableColWidthStyle(tbl, colIndex) {
    if (tbl.colgroupWidths && tbl.colgroupWidths.length > colIndex) {
        const cw = tbl.colgroupWidths[colIndex];
        return { width: typeof cw === "number" ? cw + "px" : cw };
    }
    return undefined;
}
function isCommonTableMergedMetaCell(cell) {
    if (cell === null || typeof cell !== "object" || Array.isArray(cell) || !cell || cell.numList) return false;
    if (cell.html === undefined && cell.label === undefined) return false;
    return getCommonTableRowspan(cell) != null || getCommonTableColspan(cell) != null;
}
function isCommonTableStyledTextCell(cell) {
    if (cell == null || typeof cell !== "object" || Array.isArray(cell) || cell.numList) return false;
    if (cell.html === undefined && cell.label === undefined) return false;
    if (getCommonTableRowspan(cell) != null || getCommonTableColspan(cell) != null) return false;
    return true;
}
function getCommonTableCellTdStyle(cell) {
    if (cell == null || typeof cell !== "object" || Array.isArray(cell) || cell.numList) return undefined;
    if (cell.style == null || String(cell.style).trim() === "") return undefined;
    return cell.style;
}
function isTblDualGrid(tbl) {
    return Boolean(tbl && tbl.tableClass === "tbl_dual_grid");
}
function getFairTradeCommonTableClassArray(tbl) {
    if (!tbl) return ["common_table", "type_01"];
    const tc = tbl.tableClass || "";
    const out = ["common_table"];
    if (tc === "type_02") {
        out.push("type_02");
    } else {
        out.push("type_01");
        if (tc && tc !== "type_01") out.push(tc);
    }
    if (isTblDualGrid(tbl)) out.push("tbl_dual_pc");
    return out;
}
function appendixPartnerEvalMobileHeadLabels(tbl) {
    if (!tbl || !Array.isArray(tbl.cols)) return [];
    return tbl.cols.slice(0, 3).map((col) => {
        if (typeof col === "string") return col;
        if (col && col.label !== undefined) return col.label;
        if (col && col.html) return String(col.html).replace(/<[^>]+>/g, "");
        return "";
    });
}
function appendixPartnerEvalMoEscapeForVertical(ch) {
    if (ch === "&") return "&amp;";
    if (ch === "<") return "&lt;";
    if (ch === ">") return "&gt;";
    if (ch === "\"") return "&quot;";
    return ch;
}
function appendixPartnerEvalMobileLeadVerticalHtml(leadCell) {
    if (!leadCell || typeof leadCell !== "object" || Array.isArray(leadCell)) return "";
    const raw = leadCell.html != null && String(leadCell.html).trim() !== "" ? String(leadCell.html) : leadCell.label != null ? String(leadCell.label) : "";
    const plain = raw.replace(/<br\s*\/?>/gi, "").replace(/<[^>]+>/g, "").trim();
    if (!plain) return "";
    return [...plain].map(appendixPartnerEvalMoEscapeForVertical).join("<br />");
}
function appendixPartnerEvalMoLeadMobileHtml(leadCell) {
    if (!leadCell || typeof leadCell !== "object" || Array.isArray(leadCell)) return "";
    if (leadCell.txt_verticle === true) {
        if (leadCell.html != null && String(leadCell.html).trim() !== "") return String(leadCell.html);
        if (leadCell.label != null) return String(leadCell.label);
        return "";
    }
    return appendixPartnerEvalMobileLeadVerticalHtml(leadCell);
}
function appendixPartnerEvalMobileTrDescriptors(tbl) {
    if (!tbl || !Array.isArray(tbl.rows)) return [];
    const rows = tbl.rows;
    const gradeBlockA = [];
    const gradeBlockB = [];
    let leadCell = null;
    let leadStyle;
    for (let g = 0; g < rows.length; g++) {
        const row = rows[g];
        if (!Array.isArray(row)) continue;
        let lead = null;
        let a;
        let b;
        let c;
        let d;
        if (row.length === 5) {
            [lead, a, b, c, d] = row;
        } else if (row.length === 4) {
            [a, b, c, d] = row;
        } else {
            continue;
        }
        if (g === 0 && lead != null && typeof lead === "object" && !Array.isArray(lead) && !lead.numList) {
            leadCell = lead;
            leadStyle = lead.style != null && String(lead.style).trim() !== "" ? lead.style : undefined;
        }
        gradeBlockA.push({ goods: a, grade: b });
        gradeBlockB.push({ goods: c, grade: d });
    }
    const totalBodyRows = gradeBlockA.length + gradeBlockB.length;
    const out = [];
    const pushRow = (goods, grade, includeLead) => {
        const tds = [];
        if (includeLead && leadCell != null) {
            tds.push({ lead: true, cell: leadCell, rowspan: totalBodyRows, style: leadStyle });
        }
        tds.push({ lead: false, cell: goods }, { lead: false, cell: grade });
        out.push(tds);
    };
    for (let i = 0; i < gradeBlockA.length; i++) {
        const { goods, grade } = gradeBlockA[i];
        pushRow(goods, grade, i === 0);
    }
    for (let i = 0; i < gradeBlockB.length; i++) {
        const { goods, grade } = gradeBlockB[i];
        pushRow(goods, grade, false);
    }
    return out;
}
const TABLE_CELL_BULLET_RE = /^•/u;
function tableCellLineHasLeadMark(line) {
    return typeof line === "string" && TABLE_CELL_BULLET_RE.test(line.trim());
}
function tableCellLineHasWarnTxt(line) {
    return typeof line === "string" && /^※/u.test(line.trim());
}
function stripTableCellLeadMarkPlain(line) {
    if (typeof line !== "string") return "";
    return line.trim().replace(/^•\s*/u, "");
}
function getTableCellBulletParagraphs(cell) {
    if (typeof cell !== "string") return null;
    const trimmed = cell.trim();
    if (!trimmed) return null;
    if (/<br\s*\/?>/i.test(trimmed)) {
        const parts = trimmed.split(/<br\s*\/?>/i).map((p) => p.trim()).filter((p) => p.length > 0);
        if (parts.length === 0) return null;
        const mapped = parts.map((p) => ({
            bullet: TABLE_CELL_BULLET_RE.test(p),
            warn: /^※/u.test(p),
            html: TABLE_CELL_BULLET_RE.test(p) ? p.replace(/^•\s*/u, "").trim() : p,
        }));
        if (mapped.length >= 2 && (mapped.some((m) => m.bullet) || mapped.some((m) => m.warn))) return mapped;
        if (mapped.length === 1 && mapped[0].bullet) return mapped;
        if (mapped.length === 1 && mapped[0].warn) return mapped;
        return null;
    }
    if (TABLE_CELL_BULLET_RE.test(trimmed)) {
        return [{ bullet: true, warn: false, html: trimmed.replace(/^•\s*/u, "").trim() }];
    }
    if (/^※/u.test(trimmed)) {
        return [{ bullet: false, warn: true, html: trimmed }];
    }
    return null;
}
function isFairTradeAddendumSection(section) {
    if (!section) return false;
    if (section.no === "부칙" || section.no === "부속지침" || section.no === "Supplementary Provisions"/* 260708 번역 */) return true;
    return Boolean(section.addendumText && (section.title === "부칙" || section.title === "Supplementary Provisions"/* 260708 번역 */) && (section.no === "" || section.no == null));
}

const CTabIdx = ref(0);
const CTabIdxEsgArchive = ref(0);
const CTabIdxEsgSystem = ref(0);
const CTabIdxCompliance = ref(0);
const CTabIdxFairTradeBiz = ref(0);
const isEthicsInquiryOpen = ref(false);
const isEthicsConsentAgreed = ref(false);
const isEthicsConsentAgreed2 = ref(false);
const ethicsEmailDomainOptions = computed(() => props.lang === "en"
    ? ["Direct input"/* 260708 번역 */, "naver.com", "gmail.com", "hanmail.net"]
    : ["직접입력", "naver.com", "gmail.com", "hanmail.net"]);
const ethicsDivisionOptions = computed(() => props.lang === "en"
    ? ["Select division"/* 260708 번역 */, "GS25", "GS THE FRESH", "GS SHOP", "Other"/* 260708 번역 */]
    : ["사업부 선택", "GS25", "GS THE FRESH", "GS SHOP", "기타"]);
const ethicsReportTypeOptions = computed(() => props.lang === "en"
    ? ["Select report type"/* 260708 번역 */, "Misconduct"/* 260708 번역 */, "Unfair trade"/* 260708 번역 */, "Human rights violation"/* 260708 번역 */, "Other"/* 260708 번역 */]
    : ["제보구분 선택", "부정행위", "불공정거래", "인권침해", "기타"]);
const ethicsReplyTypeOptions = computed(() => props.lang === "en"
    ? ["Email"/* 260708 번역 */, "Phone"/* 260708 번역 */]
    : ["이메일", "전화"]);
const ethicsReportForm = ref({
    name: "",
    emailId: "",
    emailDomain: "",
    emailDomainSelect: props.lang === "en" ? "Direct input"/* 260708 번역 */ : "직접입력",
    phonePrefix: "010",
    phoneMid: "",
    phoneTail: "",
    division: props.lang === "en" ? "Select division"/* 260708 번역 */ : "사업부 선택",
    reportType: props.lang === "en" ? "Select report type"/* 260708 번역 */ : "제보구분 선택",
    storeName: "",
    title: "",
    content: "",
    replyType: props.lang === "en" ? "Email"/* 260708 번역 */ : "이메일",
});

const langData = {
    ko: {
        MainTitle: "정도경영", /* 20260623 edit 이소라 */
        MainsubTitle: "Compliance",
        Tabs1: [{ item: "윤리경영" }, { item: "준법경영" }], /* 20260623 edit 이소라 */
        TabsEsgArchive: [
            { item: "소개" },
            { item: "지침" },
            { item: "제도" },
            { item: "제보" },
        ],
        TabsEsgSystem: [
            { item: "제보 이용 안내" },
            { item: "제보자 포상제도" },
            { item: "제보자 보호제도" },
        ],
        TabsCompliance: [
            { item: "자율준수 프로그램" },
            { item: "자율준수 관리자 안내" },
            { item: "공정거래 4대 가이드라인" },
            { item: "공정거래 업무기준" },
        ],
        TabsFairTradeBiz: [
            { item: "수퍼, 편의점, 전문점" },
            { item: "TV홈쇼핑" },
        ],
        ComplianceProgramHeroTitle:
            "GS리테일은 책임을 바탕으로 한 자유경쟁의 원칙에 따라 상호 신뢰와 협력으로 <br class=\"p_br\" />공동의 발전을 도모하기 위해 자율적으로 공정거래를 실천하고 있습니다.",
        // ComplianceProgramLead:
        //     "GS리테일은 자율적 공정거래를 적극 실천하기 위해 ‘자율준수 프로그램’을 운영하고 있습니다.",
        /* 2026.07.06 edit 이소라 */
        ComplianceProgramFeatureItems: [
            {
                num: "01",
                title: "CP 기준과 절차 마련 및 시행",
                desc: "전사 구성원들이 공정거래 관련 법규 준수사항을 명확하게 인지하고 실천할 수 있도록 필요한 업무기준과 절차를 마련하고 시행하고 있습니다.",
            },
            {
                num: "02",
                title: "최고경영자의 자율준수 의지 및 지원",
                desc: "최고경영자는 회사의 모든 구성원, 고객 및 이해관계자가 쉽게 인지할 수 있도록 자율준수 의지를 공개적으로 표명하고 CP 운영을 적극적으로 지원하고 있습니다.",
            },
            {
                num: "03",
                title: "CP의 운영을 담당하는 자율준수 관리자 임명",
                desc: "이사회 등 최고 의사결정기구에서 조직 내 자율준수 관리자를 임명하고 효과적인 CP운영에 대한 책임과 권한을 부여하고 있습니다.",
            },
            {
                num: "04",
                title: "자율준수 편람의 제작·활용",
                desc: "회사의 모든 구성원이 쉽게 이해하고 실천할 수 있도록 공정거래 관련 법규 및 CP의 기준과 절차가 포함된 자율준수 편람을 제작하여 배포(e-book형태 포함)하고 구성원들은 활발하게 활용하고 있습니다.",
            },
            {
                num: "05",
                title: "지속적이고 체계적인 자율준수 교육 실시",
                desc: "공정거래 관련법규 준수 사항 등에 대하여 최고경영자를 포함한 전 구성원을 대상으로 효과적인 교육을 정기적으로 실시하고 있습니다.",
            },
            {
                num: "06",
                title: "내부감시체계 구축",
                desc: "내부감시체계를 통해 취약점을 식별하고, 제도 개선을 통해 투명한 공정거래 환경을 구축해 나가고 있습니다.",
            },
            {
                num: "07",
                title: "공정거래 관련 법규 위반 임직원에 대한 제재",
                desc: "공정거래 관련 법규 위반 정도에 상응하는 제재 조치를 규정한 사규를 운영하고 있으며 구성원의 법 위반 발견 시, 적극 대응하고 향후 유사 행위가 재발하지 않도록 예방 활동을 하고 있습니다.",
            },
            {
                num: "08",
                title: "효과성 평가와 개선 조치",
                desc: "CP가 효과적이고 지속적으로 운영될 수 있도록 CP의 기준, 절차 및 운용 등에 대한 점검과 평가 등을 실시하고 그에 따라 제도 개선 조치 등을 시행하고 있습니다.",
            },
        ],
        ComplianceManagerRoleFeatureItems: [
            { num: "01", title: "법규준수 여부에 대한 감독/감사를 실시합니다." },
            { num: "02", title: "자율준수편람 제작 및 운영을 합니다." },
            { num: "03", title: "자율준수 교육을 지휘/감독합니다." },
        ],
        ComplianceAppointmentSteps: [
            { key: "ap1", iconKey: "recommend", title: "자율준수 관리자<br />후보 추천", note: "제척/기피 요건" },
            { key: "ap2", iconKey: "verify", title: "자율준수 관리자<br />역량 검증", note: "반부패도 검증, 업무 역량 검증" },
            { key: "ap3", iconKey: "appoint", title: "선임, 임명", note: "임기 3년" },
            { key: "ap4", iconKey: "notify", title: "임직원 안내<br />임무 수행" },
        ],
        FairTradeGuidelineDetailBtn: "자세히 보기",
        FairTradeGuidelineItems: [
            {
                num: "01",
                title: "파트너사 선정, 운영 가이드 라인",
                desc: "파트너사의 공정한 선정 · 운영을 위한 실천사항",
                popContId: "gsrsu04020301"
            },
            {
                num: "02",
                title: "서면 발급, 보존 가이드 라인",
                desc: "하도급거래에서의 서면발급 및 보존에 관한 가이드라인",
                popContId: "gsrsu04020302"
            
            },
            {
                num: "03",
                title: "하도급 거래 심의위원회 운영 규정",
                desc: "GS리테일 하도급거래 내부 심의위원회 설치·운영을 위한 가이드라인",
                popContId: "gsrsu04020303"
            },
            {
                num: "04", 
                title: "계약 체결가이드 라인",
                desc: "대·중소기업간 상생협력을 위한 계약 체결 가이드라인",
                popContId: "gsrsu04020304"
            },
       
        ],
        FairTradeWorkStandardAccordionItems: [
            {
                key: "01",
                title: "<span class='acc_num'>1.</span>파트너사 선정, 운영 기준",             
            },
            {
                key: "02",
                title: "<span class='acc_num'>2.</span>판매장려금 결정, 변경에 대한 기준",              
            },
            {
                key: "03",
                title: "<span class='acc_num'>3.</span>판매촉진행사 진행 및 비용분담 기준",              
            },
            {
                key: "04",
                title: "<span class='acc_num'>4.</span>인테리어 및 홍보물 비용분담 기준",  
            },
            {
                key: "05",
                title: "<span class='acc_num'>5.</span>파트너사 경영정보요구 기준",
            },
            {
                key: "06",
                title: "<span class='acc_num'>6.</span>파트너사 종업원 파견 기준",
            },
            {
                key: "07",
                title: "<span class='acc_num'>7.</span>파트너사 특약매입거래 기준",
            },
            {
                key: "08", 
                title: "<span class='acc_num'>8.</span>파트너사 반품관련 기준",
            },
        ],
        FairTradeHomeShoppingAccordionItems: [
            { key: "01", title: "<span class='acc_num'>1.</span>협력사와의 공정거래를 위한 기준과 절차" },
            { key: "02", title: "<span class='acc_num'>2.</span>거래조건 결정 기준과 절차" },
            { key: "03", title: "<span class='acc_num'>3.</span>정액수수료 방송 운영기준과 절차" },
            { key: "04", title: "<span class='acc_num'>4.</span>판매촉진행사 진행 기준과 절차" },
            { key: "05", title: "<span class='acc_num'>5.</span>방송제작비 등 분담 기준과 절차" },
            { key: "06", title: "<span class='acc_num'>6.</span>직매입 상품 등의 반품 기준과 절차" },
            { key: "07", title: "<span class='acc_num'>7.</span>경영정보 제공 요구 금지 기준" },
            { key: "08", title: "<span class='acc_num'>8.</span>홈쇼핑 불공정거래행위에 대한 위법성 심사지침 준수 기준" },
            { key: "09", title: "<span class='acc_num'>9.</span>상품선정 및 방송편성 기준과 절차" },
            { key: "10", title: "<span class='acc_num'>10.</span>무형상품 선정 기준과 절차" },
            { key: "11", title: "<span class='acc_num'>11.</span>연계편성의 부당한 강요행위 금지 기준" },
            { key: "12", title: "<span class='acc_num'>12.</span>불공정거래행위로 인한 협력사 피해 보상 기준" },
        ],
        // 1. 협력사와의 공정거래를 위한 기준과 절차
        FairTradeHomeShoppingCooperationSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 ‘GS SHOP’)의 TV홈쇼핑 및 데이터홈 쇼핑 방송(이하 통칭하여 ‘방송’)을 위한 협력사와의 거래 과정에서, 협력사와 GS SHOP 간의 정당하고 공정한 거래조건이 보장되도록 하고, GS SHOP과 협력사가 지속적으로 협력하는 관계를 유지하기 위해 GS SHOP 임직원이 준수해야 할 기본적인 사항들을 규정하기 위해 작성된 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 협력사와의 상담 또는 거래 과정에서 항상 이 기준을 숙지하고 준수하여야 한다." },
                    { num: "2", title: "GS SHOP 임직원은 이 기준 외에도 협력사와의 거래에 있어 「독점규제 및 공정거래에 관한 법률」, 「대규모유통업에서의 거래 공정화에 관한 법 률」 등 공정거래 관련 법령(이하 통칭하여 ‘공정거래 관련 법령’)에 규정 된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 기준 및 부속 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해 당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 기준은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거 래시스템(http://withgs.gsshop.com) 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 기준을 지속적으로 고지하고 공유 하기로 한다." },
                ],
            },
            {
                no: "03",
                title: "상품 및 협력사의 선정",
                definitions: [
                    { term: "1", desc: "GS SHOP은 온라인 또는 오프라인을 통해 협력사로부터 제안 받은 상품에 대해 공정하고 투명한 절차에 따라 상품 및 협력사를 선정한다." },
                    { term: "2", desc: "제1항을 준수하기 위한 구체적 기준 및 절차는 별도 기준인 「상품 선정 및 방송 편성 기준과 절차」에서 정한다." },
                ],
            },
            {
                no: "04",
                title: "판매수수료의 결정",
                items:[
                    {num:"1", title:"상품 판매수수료는 협력사와 상호 신뢰의 원칙에 따라 공정하고 투명한 기준에 따라 산정되어야 한다."},
                    {num:"2", title:"GS SHOP은 협력사와의 상품 판매수수료 조건을 정액수수료 형태로 정하고자 하는 경우 대상 상품 및 편성 비율 등을 제한적으로 운영하여야 하며, 중소기업 협력사에 대한 보호 장치를 마련해야 한다."},
                    {num:"3", title:"제1항 및 제2항을 준수하기 위한 구체적 기준 및 절차는 별도의 지침으로 정한다."},
                ]
            },
            {
                no: "05",
                title: "판매촉진행사의 진행 및 비용 분담",
                items: [
                    { num: "1", title: "판매촉진행사는 협력사와 사전에 상호 합의한 후 진행하여야 하며, 진행시 공정거래 관련 법령을 준수하여 진행한다." },
                    { num: "2", title: "제1항을 준수하기 위한 구체적 기준 및 절차는 별도의 지침으로 정한다." },
                ],
            },
            {
                no: "06",
                title: "방송제작비의 분담",
                items: [
                    { num: "1", title: "상품 판매 방송의 제작비는 GS SHOP이 전액 부담함을 원칙으로 한다. 단, 협력사의 요청에 따라 판매전문가, 모델, 협력사가 사전에 제작한 자체 영상물 등을 추가로 사용할 경우 사전 합의를 통해 소요 비용을 분담 할 수 있다." },
                    { num: "2", title: "제1항을 준수하기 위한 구체적 기준 및 절차는 별도의 지침으로 정한다." },
                ],
            },
            {
                no: "07",
                title: "불공정거래행위의 금지",
                items: [
                    {
                        num: "1",
                        title: "GS SHOP은 협력사와의 거래 과정에서 다음 각 호의 사항들을 준수하고, 협력사에 대해 우월적 지위를 남용하여 부당한 강요나 그 밖의 불공정한 거래를 조장하는 행위를 하지 않는다. 이러한 불공정거래행위에 대한 구체적인 기준은 공정거래 관련 법령에서 정한 사항에 따른다.",
                        details: [
                            "1. 서면 계약 체결, 교부, 보존 의무",    
                            "2. 상품 대금의 감액 금지",
                            "3. 상품 판매 대금 지급 의무",
                            "4. 부당한 상품 수령 거부, 지체 금지",
                            "5. 부당한 상품 반품 금지",
                            "6. 판매촉진비용 등의 부당한 강요 금지",
                            "7. 배타적 거래 강요금지",
                            "8. 경영정보 제공 요구 금지",
                            "9. 부당한 경제적 이익 요구 및 수령 금지",
                            "10. 부당한 계약 변경 등 불이익 제공 금지",
                            "11. 보복 조치 금지",
                            "12. 경영활동 간섭 금지",
                        ],
                    },
                    { num: "2", title: "제1항 제5호를 준수하기 위한 구체적 기준은 별도의 지침으로 정한다." },
                    { num: "3", title: "제1항 제8호를 준수하기 위한 구체적 기준은 별도의 지침으로 정한다." },
                    { num: "4", title: "제1항의 내용과 더불어 공정거래위원회가 홈쇼핑 방송 거래 영역에서의 특정한 불공정거래행위에 관하여 규정한 위법성 심사지침 상의 내용을 준수하기 위한 구체적 기준은 별도의 지침으로 정한다." },
                ],
            },
            {
                no: "08",
                title: "이해관계자 거래 배제",
                items: [
                    { num: "1", title: "협력사 임직원 등이 GS SHOP 임직원의 직계가족, 친인척 등 이해관계자인 경우, GS SHOP은 관련 임직원이 해당 협력사의 상품 선정 및 거래 조건 결정 절차 등에 직·간접적으로 관여하는 것을 금지한다." },
                    {
                        num: "2",
                        title: "제1항의 이해관계자의 기준은 다음 각 호와 같다.",
                        details: [
                            {
                                text: "1. 민법 제777조에 의거한 친족",
                                children: [
                                    "가. 8촌 이내의 혈족",
                                    "나. 4촌 이내의 인척 (인척의 범위는 민법 제769조를 따름)",
                                    "다. 배우자",
                                ],
                            },
                            "2. GS SHOP에 근무 이력이 있는 자",
                            "3. GS 그룹 계열사 관계자",
                        ],
                    },
                    { num: "3", title: "제1항에도 불구하고 협력사 임직원 등과 이해관계 있는 임직원이 협력사의 상품 선정 및 거래 조건 결정 절차 등에 관여한 것으로 밝혀진 경우 관련 임직원을 배제한 상태에서 상품 선정 및 거래 조건을 재검토한다." },
                ],
            },
            {
                no: "09",
                title: "특정 협력사의 독점 방지",
                items: [
                    {
                        num: "1",
                        title: "GS SHOP은 유통단계 축소를 통한 중소기업 보호를 위해 제조사 직접 납품을 원칙으로 한다. 단, 제조사가 물류, A/S 접수 및 처리 등 통상적으로 납품에 필요한 행위를 수행할 능력을 갖추지 못하여 이를 대행할 협력사(이하 ‘대행 협력사’)를 통하여 입점하고자 할 경우에는 예외로 한다.",
                    },
                    { 
                        num: "2", 
                        title: "제1항의 단서와 관련하여 GS SHOP은 특정 대행 협력사가 납품을 독점하지 않도록 하고, 동일 상품에 대해 복수의 대행 협력사의 제안이 있을 경우에는 협력사의 선정에 관한 기준에 입각하여 공정하고 투명한 경쟁을 통해 협력사를 선정한다." 
                    },
                ],
            },
            {
                no: "10",
                title: "상품 판매 중단 등 기준",
                items: [
                    { num: "1", title: "GS SHOP은 협력사의 상품 판매 중단, 협력사와의 거래를 중단 또는 종료하려는 경우 그 사유 및 절차를 명확히 정하고 이를 준수하여야 하며, 그 과정에서 협력사에게 부당한 피해가 발생하지 않도록 노력하여야 한다." },
                    { num: "2", title: "제1항의 구체적 사유 및 절차는 별도 기준인 「상품 선정 및 방송 편성 기준과 절차」에서 정한다." },
                ],
            },
            {
                no: "11",
                title: "신고, 불만 접수 및 처리",
                items: [
                    { num: "1", title: "GS SHOP은 협력사와의 거래 중 발생한 협력사의 민원과 불만을 해소할 수 있도록 최선을 다하고 재발 방지를 위해 노력해야 한다." },
                    { num: "2", title: "협력사는 GS SHOP 임직원이 이 기준 및 부속 지침을 위반하거나 GS SHOP과의 거래 중 불공정한 처우 등으로 인해 불만이 발생한 경우, 공식 홈페이지 또는 투명거래시스템 등에서 제공하는 신고 채널(레드휘슬 등)을 통해 위반 사항을 신고하거나 불만 사항을 접수할 수 있다." },
                    { num: "3", title: "GS SHOP은 제2항에 따라 접수된 신고 건에 대해 GS SHOP의 감사업무담당부서, 법무 또는 컴플라이언스업무 담당부서 등(이하 ‘감사업무 담당부서 등’)의 실사 및 감사를 통해 사실 관계를 신속히 확인하여야 한다." },
                    { num: "4", title: "GS SHOP은 사실 관계에 대한 조사가 종료되면, 해당 협력사에 조사된 사실 관계, 관련 임직원에 대한 제재 조치, 협력사 피해 구제책, 재발 방 지 대책 등을 포함한 신고 사건 처리 결과를 통보해야 한다." },
                    { num: "5", title: "GS SHOP은 이 조에 따라 협력사의 신고 업무를 처리하는 과정이나 그 이후에도 협력사 및 협력사 관계자의 정보와 인적 사항 등을 비밀 정보로 보호하고, 협력사가 신고로 인해 부당하게 차별 대우를 받거나 거래 중단 등의 보복 조치가 발생하지 않도록 해야 한다." },
                ],
            },
            {
                no: "12",
                title: "제재",
                items: [
                    { num: "1", title: "GS SHOP의 감사업무 담당부서 등은 협력사의 신고를 통해 또는 직권으로 GS SHOP 임직원이 이 기준, 공정거래 관련 법령, 윤리규범 및 실천지침, 기타 사규 등을 위반한 사실을 인지한 경우 즉시 해당 임직원의 위반 행위를 조사하여야 하고, 사실로 확인된 경우 윤리위원회에 보고하여야 하며, 해당 위원회에서 해당 임직원에 대한 제재 여부 및 수준을 최종 결정한다." },
                    { num: "2", title: "GS SHOP은 임직원의 위반 행위가 사기, 횡령, 배임, 뇌물수수, 부정청탁 및 금품수수 등에 해당하여 형사 책임을 부담하여야 하는 사안인 경우 객관적인 사실 관계의 조사 및 재발 방지 등을 위해 해당 임직원을 수사기관에 형사 고발 조치할 수 있다." },
                ],
            },
            {
                no: "",
                title: "부칙",
                addendumText: "부칙(2018.04.01.)<br />제1조 (시행일)<br />① 이 기준은 2016. 5. 9. 제정, 시행한다.<br />② 이 기준은 2017. 1. 1. 개정, 시행한다.<br />③ 이 기준은 2018. 8. 2. 개정, 시행한다.<br />④ 이 기준은 2020. 12. 30. 개정, 시행한다. <br />⑤ 이 기준은 2021. 11. 15. 개정, 시행한다.<br />⑥ 이 기준은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 2. 거래조건 결정 기준과 절차
        FairTradeHomeShoppingTermsSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「협력사와의 공정한 거래를 위한 기준과 절차」에서 정한 사항 중 협력사와의 거래 조건 결정 기준 및 절차에 관한 세부적인 준수 사항을 제시함으로써, 판매수수료 등 거래 조건의 결정 과정에서 협력사가 주식회사 지에스리테일(이하 ‘GS SHOP’)로부터 정당하고 공정한 거래환경을 제공받을 수 있도록 하고, GS SHOP과 협력사가 지속적으로 상호 협력하는 관계를 구축하기 위해 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 협력사와의 상담 또는 거래 과정에서 항상 이 지침을 숙지하고 준수하여야 한다." },
                    { num: "2", title: "GS SHOP 임직원은 이 지침 외에도 협력사와의 거래에 있어 「독점규제 및 공정거래에 관한 법률」, 「대규모유통업에서의 거래 공정화에 관한 법률」 등 공정거래 관련 법령에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com) 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다." },
                    { num: "6", title: "GS SHOP은 동종의 상품군에서는 협력사가 대기업 또는 중소기업이라는 이유로 판매수수료 등을 포함한 어떠한 거래 조건의 차별도 두지 아니한다." },
                ],
            },
            {
                no: "03",
                title: "협의 절차",
                items: [
                    { num: "1", title: "GS SHOP은 온라인 또는 오프라인을 통해 협력사로부터 제안 받은 상품에 대해 별도 기준인 「상품선정 및 방송편성 기준과 절차」에 따라 GS SHOP 의 방송을 위한 상품을 선정한다." },
                    { num: "2", title: "제1항에 따른 기준에 부합된 상품에 대해서는 품질 안전 담당부서를 통해 상품군별로 정해진 지침에 의거한 품질 검사를 거쳐야 한다." },
                    { num: "3", title: "품질 검사 합격 후에는 협력사와 상품 구성, 판매가 등 방송 대상 상품의 판매 조건에 대해 구체적으로 협의해야 한다." },
                    { num: "4", title: "방송 10~5일 전에는 협력사와 GS SHOP의 MD, PD가 상품 정보를 공유하고, 상호 간의 판매수수료, 공급 수량 등 거래 조건을 구체적으로 협의 해야 한다." },
                    { num: "5", title: "방송 5일 전까지 협력사와 GS SHOP의 MD, PD가 모여 방송 진행 컨셉 등을 협의하고, 최종 판매수수료, 공급 수량 등 거래 조건을 확정한다." },
                    { num: "6", title: "담당 MD 등은 협력사와 최종 합의된 내용에 대해서는 내부 전결 규정에 의거하여 보고하고 최종 결재를 득한다." },
                    { num: "7", title: "판매수수료 등에 대해서는 상호 이익이 될 수 있도록 협력사와 충분한 협의 절차를 진행하고 합리적으로 산정되어야 하며, 부당하게 일방에 의해 결정되거나 정당한 사유 없이 결정된 판매수수료 등의 거래 조건을 변경해서는 아니 된다." },
                ],
            },
            {
                no: "04",
                title: "계약 체결 절차",
                definitions: [
                    { term: "1", desc: "GS SHOP은 계약 체결 전이라도 상호 협의된 사항에 대해서는 상호 신뢰 원칙에 따라 준수하여야 한다. 단, 협력사에게 계약 체결 및 서면 교부 이전에 협력사로 하여금 상품을 제조·주문하게 하거나 납품할 상품을 위한 설비·장치를 준비하도록 요구하여서는 아니 된다." },
                    { term: "2", desc: "GS SHOP은 상호 간에 최종 합의된 판매수수료 등의 거래 조건을 기재한 방송 조건에 관한 합의서를 전자계약 형태로 체결한 후 투명거래시스템으로 교부한다. 계약 체결 및 교부는 원칙적으로 방송일 기준 3일 전까지 완료되어야 하고, 합의서의 교부는 계약 체결 즉시 이행한다." },
                    { term: "3", desc: "제2항에도 불구하고 현저한 시황 변동 등 불가피한 사유가 있는 경우에는 방송 전까지 계약 사항을 변경할 수 있으나 사전에 협력사와 합의되어야 하며 협력사로부터 변경 의사 및 사유를 확인하기 위한 신청서를 받아야 한다." },
                    { term: "4", desc: "제3항에 따른 계약 사항 변경 변경 시 담당 MD는 변경 합의 전 담당 부서장에게 변경 사실 및 사유를 보고하고 담당 부서장은 그 사유나 변경 절차의 타당성을 검토하여야 하며, 변경 계약을 체결하는 즉시 협력사에 변경된 합의서를 교부하여야 한다." },
                    { term: "5", desc: "계약의 내용에는 거래와 관련하여 분쟁의 대상이 될 수 있는 다음 각 호의 사항들을 포함하여야 한다.",
                      details:[
                            "1. 거래형태, 거래품목 및 위탁 판매수량, 거래가격, 거래기간, 납품조건, 대금지급방법, 대금결제기간 및 판촉비용의 부담 여부 및 부담 조건, 반품 조건, 판매수수료, 판매장려금 부담 여부 및 부담 조건",
                            "2. 판매방송일정, 방송제작비용, 상품전문가/모델 등의 출연 여부, 일정 및 출연 비용 부담 여부 및 부담 조건, 소비자의 주문 및 반품 상품에 대한 배송 조건, 소비자의 구매 취소 및 반품 상품의 처리 조건 등"
                        ]
                    },
                    { term: "6", desc: "GS SHOP은 협력사와의 계약이 끝난 날부터 5년간 양 당사자 사이의 거래에 관한 서류를 보존하여야 한다." },
                ],
            },
            {
                no: "05",
                title: "계약 이행 절차",
                items: [
                    { num: "1", title: "GS SHOP은 협력사의 계약 합의 여부를 확인한 후 합의된 거래 조건에 따라 방송 및 판매를 진행한다." },
                    { num: "2", title: "MD는 방송 후 계약 내용대로 대금이 정산되었는지 여부를 반드시 확인하여야 한다. 당초 계약 내용과 달리 대금이 정산되었을 경우에는 해당 MD는 지체 없이 협력사에 통지하고 계약 내용대로 수정 이행해야 한다." },
                    { num: "3", title: "GS SHOP은 계약서에 기재된 판매수수료율 및 거래 조건을 준수하고 어떠한 경우에도 방송 중 또는 그 이후에 거래 조건을 변경하거나 소급 적용하지 않는다." },
                    { num: "4", title: "GS SHOP은 협력사와 사전에 합의하지 않거나 계약서에 정하지 않은 각종 명목의 수수료나 비용을 협력사에게 요구하거나 일절 부담시키지 않으며, 그 밖에 경제적 불이익을 전가하지 않는다." },
                ],
            },
            {
                no: "06",
                title: "판매수수료 결정",
                items: [
                    { num: "1", title: "GS SHOP은 협력사와 다음 각 호의 사항을 고려하여 협력사 상품의 판매수수료를 협의·결정한다.",
                      details:[
                            "1. 품질",
                            "2. 유사상품(군)의 평균 판매수수료율",
                            "3. 협력사의 매출 추이, 상품 카테고리의 시황 및 유통채널 내 경쟁 상황",
                            "4. 예상 판매실적 및 GS SHOP 전체 매출에의 기여도",
                            "5. A/S 및 배송 등 관련 비용(설치상품인 경우 설치비용 등)",
                            "6. 거래 이행의 안정성과 신뢰도",
                            "7. 브랜드 인지도",
                            "8. 시장성",
                            "9. 기존 상품과의 차별성",
                            "10. 기타 상품의 특성에 따른 고려 사항"
                        ]
                    },
                    { num: "2", title: "판매수수료는 협력사와 상호 신뢰의 원칙 하에 공정하고 투명한 절차에 따라 산정되어야 한다." },
                    { num: "3", title: "협력사와의 공정거래협약 등 상생 협력을 위해 해당 상품이 다음 각 호에 해당하는 경우에는 협력사의 이익 등을 우선적으로 고려함을 원칙으로 한다.",
                        details:[
                            "1.「중소기업기본법」 제2조 및 동법 시행령 제3조에 의거한 중소기업이 제조하거나 공급·판매하는 상품",
                            "2. 장애인/노인 등 사회적 소외계층이 공급하는 상품 또는 소외계층을 주 대상으로 하는 상품",
                            "3. 농축산어민이 최종 생산자이거나 농축산어민이 직접 공급하는 상품"
                        ]
                    },
                ],
            },
            {
                no: "07",
                title: "정액수수료 운영",
                items: [
                    { num: "1", title: "정액수수료라 함은 「방송법」 시행령 별표2의 3에 규정된 바와 같이 상품 판매액과 관계 없는 수익배분방식(상품 판매액과 관계 없는 수익배분방식과 그 외의 수익배분방식을 혼합한 수익배분방식을 포함)을 말한다." },
                    { num: "2", title: "정액수수료를 적용하는 상품의 유형, 편성 시간과 비율, 중소기업 협력사의 정액수수료로 인한 피해 방지 방안 등 정액수수료 방송의 구체적 운영 기준은 별도의 지침으로 정한다." },
                ],
            },
            {
                no: "08",
                title: "불공정거래행위 금지",
                lead: "GS SHOP은 협력사와의 거래 조건을 결정함에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 협력사에 대해 거래상 지위를 남용하여 불이익을 주거나 그 밖에 불공정한 거래 조건을 강요하는 행위를 하여서는 아니 된다."
            },
            {
                no: "09",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와 거래 조건을 협의·결정하는 과정에서 이 지침을 위반하거나 기타 거래 조건의 결정과 관련하여 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다."
            },
            {
                no: "10",
                title: "제재",
                lead: "GS SHOP 임직원이 이 지침에서 규정한 사항을 위반한 사실이 확인된 경우 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다."
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />제1조 (시행일)<br />① 이 기준은 2016. 5. 9. 제정, 시행한다.<br />② 이 기준은 2017. 1. 1. 개정, 시행한다.<br />③ 이 기준은 2018. 8. 2. 개정, 시행한다.<br />④ 이 기준은 2020. 12. 30. 개정, 시행한다. <br />⑤ 이 기준은 2021. 11. 15. 개정, 시행한다.<br />⑥ 이 기준은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 3. 정액수수료 방송 운영기준과 절차
        FairTradeHomeShoppingFixedCommissionSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「협력사와의 공정한 거래를 위한 기준과 절차」에서 정한 사항 중 정액수수료 방송 운영의 기준 및 절차에 관한 세부적인 준수 사항을 제시함으로써, 정액수수료 형태의 방송 운영 과정에서 협력사가 주식회사 지에스리테일(이하 ‘GS SHOP’)로부터 정당하고 공정한 거래환경을 제공받을 수 있도록 하고, GS SHOP과 협력사가 지속적으로 상호 협력하는 관계를 구축하기 위해 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 협력사와의 상담 또는 거래 과정에서 항상 이 지침을 숙지하고 준수하여야 한다." },
                    { num: "2", title: "GS SHOP 임직원은 이 지침 외에도 협력사와의 거래에 있어 「독점규제 및 공정거래에 관한 법률」, 「대규모유통업에서의 거래 공정화에 관한 법률」 등 공정거래 관련 법령에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com) 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다." },
                    { num: "6", title: "GS SHOP은 협력사와 공정하고 투명한 원칙에 따라 정액수수료제 방송을 운영하여야 한다." },
                ],
            },
            {
                no: "03",
                title: "정액수수료 방송 대상", 
                usePlainList: true,
                lead:"정액수수료를 적용하는 상품의 유형은 다음 각 호와 같다.",
                items: [
                    { num: "1", title: "1. 재고 소진 목적을 위한 상품" },
                    { num: "2", title: "2. 시장 반응 점검을 목적으로 한 신규 상품" },
                    { num: "3", title: "3. 판로 확보 및 재고 관리의 안정성 유지, 홍보/판촉비용 절감 등을 목적으로 한 상품" },
                    { num: "4", title: "4. 기타의 사유로 협력사가 희망하는 상품" },
                ],
            },
            {
                no: "04",
                title: "정액수수료 방송 편성 시간과 비율",
                definitions: [
                    { term: "1", desc: "정액수수료 방송 상품의 편성 시간은 생방송 시간대를 원칙으로 하나 협력사가 원하는 경우 생방송 이외의 시간대에도 편성할 수 있다." },
                    { term: "2", desc: "중소기업 제품에 대한 정액수수료 방송의 편성 비율은 희망 협력사의 수요, 시장 상황 및 운영 전략 등에 따라 최소화하여 운용하도록 한다." },
                ],
            },
            {
                no: "05",
                title: "정액수수료 방송 협의 및 계약 체결 절차",
                items: [
                    { num: "1", title: "GS SHOP은 「거래조건 결정 기준과 절차」에서 정한 바에 따라 방송 전까지 협력사와 상호 이익이 될 수 있도록 충분한 협의 절차를 진행하고 합리적으로 정액수수료를 산정하여야 한다." },
                    { num: "2", title: "GS SHOP은 부당하게 일방적으로 정액수수료를 결정하거나, 방송 편성을 조건으로 협력사에 대하여 정액수수료 또는 혼합수수료 형태의 방송 조건을 수용하지 않았다는 이유로 다음 각 호에 해당하는 행위를 하여서는 아니된다.",
                        details:[
                            "1.방송 일자, 시각, 분량을 다른 협력사에 비해 현저히 불리하게 결정하는 행위",
                            "2. 이미 결정한 방송 일자, 시각, 분량을 취소하는 행위",
                            "3. 이미 결정한 방송 일자, 시각, 분량을 다른 협력사에 비해 현저히 불리하게 변경하는 행위"
                        ]

                    },
                    { num: "3", title: "GS SHOP은 상호 간에 최종 합의된 정액수수료 조건 등을 기재한 정액 방송 조건에 관한 합의서를 전자계약 형태로 체결하여 투명거래시스템으로 교부한다. 계약 체결 및 교부는 원칙적으로 방송일 기준 3일 전까지 완료되어야 하고, 합의서의 교부는 계약 체결 즉시 이행한다." },
                    { num: "4", title: "제3항에도 불구하고 현저한 시황 변동 등 불가피한 사유가 있는 경우에는 방송 전까지 계약 사항을 변경할 수 있으나 사전에 협력사와 합의되어야 하며 변경 계약을 체결하는 즉시 협력사에 변경된 합의서를 교부하여야 한다." },
                    { num: "5", title: "GS SHOP은 협력사와의 계약이 끝난 날부터 5년간 양 당사자 사이의 거래에 관한 서류를 보존하여야 한다."}
                ],
            },
            {
                no: "06",
                title: "정액수수료 방송 위험성 사전설명제도",
                items: [
                    { num: "1", title: "정액수수료 방송은 상품 판매액과 관계없는 수익 배분 방식으로 운영되기에, 방송 결과 상품 판매 실적이 저조한 경우 협력사에 손실이 발생할 수 있다. 따라서 협력사는 정액수수료 방송의 위험성에 대해 충분히 인지하고, 자신의 과거 판매 실적, 예상 총 판매금액 등을 고려하여 자유롭고 독자적인 판단과 책임에 따라 정액수수료 방송 진행 여부를 결정하여야 한다."},
                    { num: "2", title: "GS SHOP은 협력사에게 제1항에서 명시한 정액수수료 방송 위험성에 대해 사전에 고지하여야 한다." },
                    { num: "3", title: "GS SHOP은 협력사 입점 단계에서 체결하는 ‘방송판매 상품공급 협약서’ 내에 정액수수료 방송의 위험성에 관하여 충실히 설명하고, 투명거래시스템을 통해 이 협약서의 내용을 협력사에게 고지하며, 이 협약서에 상호 전자서명하는 방식으로 협력사의 확인 여부를 검증한다."},
                ],
            },
            {
                no: "07",
                title: "정액수수료 방송 재고 소진 기회 제공",
                lead: "GS SHOP은 중소기업 협력사1)가 정액수수료 조건의 방송을 진행한 결과 판매가 저조한 경우 재고 소진 기회를 제공하여 중소기업 부담을 경감시키고자 노력한다."
            },
            {
                no: "08",
                title: "정액수수료 방송에 대한 환급 제도 운영",
                items: [
                    { num: "1", title: "GS SHOP은 중소기업 협력사가 정액수수료 방송을 진행한 결과 판매가 저조한 경우 수수료 환급 제도를 운영하여 협력사의 부담을 경감하고자 노력한다."},
                    { num: "2", title: "구체적인 환급 제도 운영 기준은 별표 1과 같으며, 환급 시점의 시장 상황, GS SHOP 경영 상태, 보유 재원 등을 고려하여 조정할 수 있다." },
                ],
            },
            {
                no: "09",
                title: "불공정거래행위 금지",
                lead: "GS SHOP은 정액수수료 운영 관련 업무를 처리함에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 협력사에 대해 거래상 지위를 남용하여 불이익을 주거나 그 밖에 불공정한 거래 조건을 강요하는 행위를 하여서는 아니 된다."
            },
            {
                no: "10",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와 정액수수료 관련 조건을 협의·결정하는 과정에서 이 지침을 위반하거나 기타 정액수수료 조건의 결정과 관련하여 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다."
            },
            {
                no: "11",
                title: "제재",
                lead: "GS SHOP 임직원이 이 지침에서 규정한 사항을 위반한 사실이 확인된 경우 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다."
            },
            {
                no: "12",
                title: "별표",
                appendixTitle: "[별표1] 정액수수료 방송 환급 제도 운영 기준",
                commonTables: [
                    {
                        tableClass:"quality_standards",
                        cols: ["구분", "내용"],
                        rows: [
                            [
                                { label: "환급기준", style: "text-align: center;" },
                                [
                                    "중소기업 제품 정액수수료 방송별로 목표 대비 실적이 30% 미만인 경우 해당 방송 정액수수료의 10% 환급",
                                    "※ 정액수수료와 정률수수료를 함께 지급한 방송의 경우 정액수수료 부분에 대해서만 환급",
                                ],
                            ],
                            [
                                { label: "환급절차", style: "text-align: center;" },
                                [
                                    "분기마다 실적 확인 후 환급",
                                    "※ 공정성을 위해 외부 기관과 연계하여 해당 기관에서 검증 후 환급 가능",
                                ],
                            ],
                            [
                                { label: "제외대상", style: "text-align: center;" },
                                {
                                    numList: [
                                        "대기업, 중견기업 및 수입 제품",
                                        "여행·렌탈·핸드폰 등의 무형상품으로서 소개가 목적인 방송",
                                        "전년도에 정액수수료 방송을 4회 이상 편성한 협력사의 방송",
                                        "당해연도에 4회 이상 환급을 받은 협력사의 방송 <br />(※ 당해연도 환급 대상 방송 프로그램이 4회 이상인 경우)",
                                        "정부·지방자치단체·공공기관 등을 통해 정액수수료를 지원받아 진행한 협력사의 방송",
                                    ],
                                },
                            ],
                        ],
                    },
                ],
                cautionItems: [
                    "※ 중소기업 제품 여부는 정부에서 정한 「홈쇼핑사업자의 중소기업 제품 기준」을 따름",
                    "※ 환급 규모는 환급 시점의 시장 상황, GS SHOP 경영 상태, 보유한 재원 등을 고려하여 증감될 수 있음",
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />제1조 (시행일)<br />① 이 기준은 2016. 5. 9. 제정, 시행한다.<br />② 이 기준은 2017. 1. 1. 개정, 시행한다.<br />③ 이 기준은 2018. 8. 2. 개정, 시행한다.<br />④ 이 기준은 2020. 12. 30. 개정, 시행한다. <br />⑤ 이 기준은 2021. 11. 15. 개정, 시행한다.<br />⑥ 이 기준은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 4. 판매촉진행사 진행 기준과 절차
        FairTradeHomeShoppingPromotionSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「협력사와의 공정한 거래를 위한 기준과 절차」에서 정한 사항 중 판매촉진행사 진행 기준 및 절차에 관한 세부적인 준수 사항을 제시함으로써, 판매촉진행사 진행 과정에서 협력사가 주식회사 지에스리테일(이하 ‘GS SHOP’)로부터 정당하고 공정한 거래환경을 제공받을 수 있도록 하고, GS SHOP과 협력사가 지속적으로 상호 협력하는 관계를 구축하기 위해 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 협력사와의 상담 또는 거래 과정에서 항상 이 지침을 숙지하고 준수하여야 한다." },
                    { num: "2", title: "GS SHOP 임직원은 이 지침 외에도 협력사와의 거래에 있어 「독점규제 및 공정거래에 관한 법률」, 「대규모유통업에서의 거래 공정화에 관한 법률」 등 공정거래 관련 법령에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com) 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다." },
                    { num: "6", title: "GS SHOP은 협력사와 공정하고 투명한 원칙에 따라 판매촉진행사를 진행하여야 한다." },
                ],
            },
            {
                no: "03",
                title: "협의 절차", 
                lead:"정액수수료를 적용하는 상품의 유형은 다음 각 호와 같다.",
                items: [
                    { num: "1", title: "GS SHOP은 온라인 또는 오프라인을 통해 협력사로부터 제안 받은 상품에 대해 별도 기준인 「상품선정 및 방송편성 기준과 절차」에 따라 GS SHOP의 방송을 위한 상품을 선정한다." },
                    { num: "2", title: "제1항에 따른 기준에 부합된 상품에 대해서는 품질 안전 담당부서를 통해 상품군별로 정해진 지침에 의거한 품질 검사를 거쳐야 한다." },
                    { num: "3", title: "품질 검사 합격 후에는 협력사와 상품 구성, 판매가 등 거래 조건을 협의하면서, 이와 함께 판매촉진행사 진행 여부 등에 대해 협의해야 한다." },
                    { num: "4", title: "방송 10~5일 전에는 협력사와 GS SHOP의 MD, PD가 판매촉진행사 대상 상품의 대상 상품 및 상호 간의 비용 분담 비율 조건 등을 구체적으로 협의해야 한다." },
                    { num: "5", title: "방송 5일 전까지 협력사와 GS SHOP의 MD, PD가 모여 방송 진행 컨셉 등을 협의하고, 최종 판매촉진행사 조건 등을 확정한다." },
                    { num: "6", title: "담당 MD 등은 협력사와 최종 합의된 내용에 대해서는 내부 전결 규정에 의거하여 보고하고 최종 결재를 득한다." },
                    { num: "7", title: "판매촉진행사 진행 여부나 상호 비용 분담 비율 등에 대해서는 상호 이익이 될 수 있도록 협력사와 충분한 협의 절차를 진행하고 합리적으로 산정되어야 하며, 부당하게 일방에 의해 결정되거나 정당한 사유 없이 결정된 판매촉진행사 조건을 변경해서는 아니 된다." },
                ],
            },
            {
                no: "04",
                title: "계약 체결 절차",
                items: [
                    { num: "1", title: "상호간에 최종 합의된 판매촉진행사 조건 등은 전자계약 형태로 판매촉진행사에 관한 합의서를 체결하여 투명거래시스템으로 교부한다. 계약 체결 및 교부는 원칙적으로 방송일 기준 3일 전까지 완료되어야 하고, 합의서의 교부는 계약 체결 즉시 이행한다. 단, 현저한 시황 변동 등 불가피한 사유가 있는 경우에는 방송 전까지 계약 사항을 변경할 수 있으나 이러한 경우에도 사전에 협력사와 합의되어야하며 변경 계약을 체결하는 즉시 협력사에 변경된 합의서를 교부하여야 한다." },
                    { num: "2", title: "계약의 내용에는 판매촉진행사와 관련하여 행사 내용, 기간, 비용의 부담 비율 등을 포함하여야 한다." },
                    { num: "3", title: "계약 체결 전이라도 상호 협의된 사항에 대해서는 상호 신뢰 원칙에 따라 준수하여야 한다." },
                    { num: "4", title: "GS SHOP은 협력사와의 계약이 끝난 날부터 5년간 협력사와의 판매촉진행사 약정 관련 서류 및 그 판매촉진행사의 실시에 관한 서류를 보존하여야 한다." },
                ],
               
            },
            {
                no: "05",
                title: "계약 이행 절차",
                items: [
                    { num: "1", title: "GS SHOP은 협력사의 판매촉진행사에 관한 합의 여부를 확인한 후 합의된 거래 조건에 따라 판매촉진행사를 진행한다." },
                    { num: "2", title: "MD는 판매촉진행사 후 계약 내용대로 판매촉진행사가 이행되었는지 여부를 반드시 확인하여야 한다. 당초 계약 내용과 달리 판매촉진행사가 이행되었을 경우에는 해당 MD는 지체 없이 협력사에 통지하고 협력사에 피해가 발생하지 않도록 후속 조치를 하여야 하며 협력사의 손해가 발생한 경우에는 관련 법 규정에 따라 즉시 협력사의 손해를 배상해야 한다."},
                    { num: "3", title: "GS SHOP은 계약서에 기재된 판매촉진행사 관련 거래 조건을 준수하고 어떠한 경우에도 방송 중 또는 그 이후에 거래 조건을 변경하거나 소급 적용하지 않는다." },
                    { num: "4", title: "GS SHOP은 협력사와 사전에 합의하지 않거나 계약서에 정하지 않은 판매촉진행사의 진행 비용 또는 각종 명목의 판매촉진행사 비용을 협력사에게 요구하거나 일절 부담시키지 않으며, 그 밖에 경제적 불이익을 전가하지 않는다." },
                ],
            },
            {
                no: "06",
                title: "비용 분담 결정 기준",
                items: [
                    { num: "1", title: "협력사와 협의하는 해당 MD는 다음 각 호의 사항을 고려하여 판매촉진행사 비용의 분담 비용을 결정한다.",
                        details:[
                            "1. 협력사와 GS SHOP이 판매촉진행사를 통하여 직접적으로 얻을 것으로 예상되는 경제적 이익의 비율에 따라 정하되, 협력사와 GS SHOP 사이의 예상이익의 비율을 산정할 수 없는 경우에는 협력사와 GS SHOP의 예상이익이 같은 것으로 추정한다.",
                            "2. 협력사의 판매촉진행사 비용 분담 비율은 총 판매촉진행사 비용의 100분의 50을 초과할 수 없다.",
                            "3. 협력사가 GS SHOP에 자발적으로 요청하여 다른 협력사와 차별화되는 판매촉진행사를 실시하려는 경우에는 GS SHOP은 협력사와 상호 합의하여 판매촉진행사 비용의 분담비율을 정할 수 있다."
                        ]
                    },
                    { num: "2", title: "GS SHOP은 협력사와 상호 신뢰의 원칙에 따라 공정하고 투명한 기준으로 판매촉진행사 비용의 분담 비율을 결정한다." },
                ],
            },
            {
                no: "07",
                title: "불공정거래행위 금지",
                lead: "GS SHOP은 협력사와 판매촉진행사를 협의 및 진행함에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 협력사에 대해 거래상 지위를 남용하여 불이익을 주거나 그 밖에 불공정한 거래 조건을 강요하는 행위 및 정당한 사유 없이 협력사에게 협력사의 의사에 반하여 판촉행사에 참여하게 하여서는 아니 된다."
            },
            {
                no: "08",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와 판매촉진행사 관련 거래 조건을 협의·결정하는 과정에서 이 지침을 위반하거나 기타 판매촉진행사 관련 조건의 결정과 관련하여 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다."
            },
            {
                no: "09",
                title: "제재",
                lead: "GS SHOP 임직원이 이 지침에서 규정한 사항을 위반한 사실이 확인된 경우 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다."
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />제1조 (시행일)<br />① 이 기준은 2016. 5. 9. 제정, 시행한다.<br />② 이 기준은 2017. 1. 1. 개정, 시행한다.<br />③ 이 기준은 2018. 8. 2. 개정, 시행한다.<br />④ 이 기준은 2020. 12. 30. 개정, 시행한다. <br />⑤ 이 기준은 2021. 11. 15. 개정, 시행한다.<br />⑥ 이 기준은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 5. 방송제작비 등 분담 기준과 절차
        FairTradeHomeShoppingProductionCostSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「협력사와의 공정한 거래를 위한 기준과 절차」에서 정한 사항 중 방송제작비 등의 분담 기준 및 절차에 관한 세부적인 준수 사항을 제시함으로써, 방송제작비 등 분담 과정에서 협력사가 주식회사 지에스리테일(이하 ‘GS SHOP’)로부터 정당하고 공정한 대우를 받을 수 있도록 하고, GS SHOP과 협력사가 지속적으로 상호 협력하는 관계를 구축하기 위해 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 협력사와의 상담 또는 거래 과정에서 항상 이 지침을 숙지하고 준수하여야 한다" },
                    { num: "2", title: "GS SHOP 임직원은 이 지침 외에도 협력사와의 거래에 있어 「독점규제 및 공정거래에 관한 법률」, 「대규모유통업에서의 거래 공정화에 관한 법률」 등 공정거래 관련 법령에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com)의 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다."},
                    { num: "6", title: "GS SHOP은 협력사와 공정하고 투명한 원칙에 따라 방송제작비 등을 분담하여야 한다."}
                ],
            },
            {
                no: "03",
                title: "협의 절차 및 방송제작비 등 분담 기준", 
                items: [
                    { num: "1", title: "GS SHOP은 협력사와 판매 방송을 진행하기로 합의한 상품에 대하여 협력사와 사전에 방송 내용 및 상품 구성 등을 협의한 후에 방송을 제작, 진행한다. 이 때 방송 제작에 소요되는 비용은 GS SHOP이 부담함을 원칙으로 한다." },
                    { num: "2", title: "GS SHOP은 방송 편성을 조건으로 협력사에 대하여 방송의 사전 제작 비용을 부담하게 하거나 판매전문가, 보조출연자(유명인사, 상품전문가, 모델), 방청객(이하 ‘판매전문가 등’)의 출연료를 지급하게 하는 등 방송 제작 비용의 전부 또는 일부를 부당하게 전가하여서는 아니 된다." },
                    { num: "3", title: "제1항 후문에도 불구하고, 협력사가 자신의 브랜드 가치 유지 및 제고, 홈쇼핑 방송을 통한 광고 효과 증진, 매출 증대 등을 도모하기 위해 다음 각 호의 어느 하나에 해당하는 사항을 GS SHOP에 요청하는 경우에는 GS SHOP은 협력사와 사전 협의하여 비용 분담비율을 정할 수 있다.",
                        details:[
                            "1. 협력사가 섭외한 판매전문가 등의 출연",
                            "2. 협력사가 홈쇼핑 방송을 위해 별도로 제작 또는 보유한 사전제작영상물의 사용(GS SHOP의 방송에 적합하게 편집하여 사용하는 것을 포함)",
                            "3. GS SHOP이 준비한 방송세트(무대장치·설비 등)의 추가 또는 변경",
                            "4. 협력사가 준비 또는 지참한 소품의 사용"
                        ]
                    },
                    { num: "4", title: "GS SHOP이 방송 제작 및 진행 시 제3항에 따른 협력사의 요청 사항을 반영하는 경우 그로 인해 추가로 발생되는 비용에 관하여 제4조 및 제5조의 기준과 절차에 따라 협력사와 사전에 서면으로 합의하여야 한다." },
                ],
            },
            {
                no: "04",
                title: "사전제작영상물의 제작비 분담 기준",
                items: [
                    { num: "1", title: "GS SHOP이 판매 방송을 위해 영상물을 사전 제작하는 경우 그 제작 비용은 원칙적으로 GS SHOP이 부담하여야 한다." },
                    { num: "2", title: "GS SHOP은 협력사의 요청이 있는 경우 협력사가 보유 또는 제작한 사전제작영상물을 제공 받아 사용할 수 있고, 그에 따른 비용은 GS SHOP과 협력사가 별도로 합의하여 정하기로 한다." },
                    { num: "3", title: "제2항에도 불구하고 GS SHOP이 TV홈쇼핑 방송에서 협력사로부터 직매입한 상품을 판매하면서 해당 협력사가 제공하는 사전제작영상물을 사용하는 경우 협력사에 다음 각 호의 기준에 따라 비용을 지급하기로 한다.",
                      details:[
                            "1. 협력사의 공급 상품이 라이선스 상품(GS SHOP이 협력사에 라이센싱한 상표권을 사용하여 제작한 상품)인 경우 : 20만원",
                            "2. 협력사의 공급 상품이 제1호 상품에 해당하지 않는 일반 상품인 경우 : 10만원",
                            "3. 해당 방송 프로그램에 사용된 협력사 사전제작영상물의 수가 2개 이상이더라도 추가 사용료를 지급하지 아니 한다.",
                            "4. 협력사가 1개의 프로그램에 복수의 상품을 방송/판매하는 경우 브랜드 단위로 사용료를 지급한다.",
                            "5. 협력사의 사전제작영상물 사용료는 매 방송 프로그램당 지급하는 것으로 하되, 심야 시간대, 명절 기간, 긴급 편성 등의 사유로 진행되는 재방송 프로그램에서 사용하는 경우 사용료를 지급하지 아니 한다.",
                            "6. 협력사의 광고영상물(CF)은 본 조에 따른 사전제작영상물에 포함되지 아니하며, 사용료 지급 대상에서 제외한다."
                        ]
                    },
                    { num: "4", title: "제2항에도 불구하고 GS SHOP이 데이터홈쇼핑 방송에서 협력사로부터 직매입한 상품을 판매하면서 해당 협력사가 제공하는 사전제작영상물을 사용하는 경우 협력사에 다음 각 호의 기준에 따라 비용을 지급하기로 한다.",
                      details:[
                            "1. 본 항의 직매입 상품이 중소기업 제품에 해당하는 경우에 한해 사용료를 지급한다. 중소기업 제품인지 여부는 과학기술정보통신부가 작성한 「홈쇼핑사업자의 중소기업 제품 기준」에 따른다.",
                            "2. 협력사의 사전제작영상물을 사용한 상품의 신규 본방송(최초 편성 방송) 프로그램에 대해 사용료를 지급하며, 동일한 상품의 재방송(최초 이후 편성 방송)부터는 사용료를 지급하지 않는다.",
                            "3. 그 밖에 TV홈쇼핑 방송 관련 제3항 제1호부터 제4호 및 제6호의 지급 기준은 본 항의 데이터홈쇼핑 방송에 대해서도 동일하게 적용한다."
                        ]
                    },
                ],
               
            },
            {
                no: "05",
                title: "계약 체결 절차",
                items: [
                    { num: "1", title: "계약 체결 전이라도 상호 협의된 사항에 대해서는 상호 신뢰 원칙에 따라 준수하여야 한다." },
                    { num: "2", title: "방송 제작비 중 협력사가 부담하는 비용이 있는 경우, 전자계약 형태로 방송 조건에 관한 합의서 또는 직매입 거래 관련 계약서를 체결하여 투명거래시스템으로 교부한다. 계약 체결 및 교부는 계약 체결 즉시 이행하되, 방송 조건에 관한 합의서는 원칙적으로 방송일 기준 3일 전까지 체결되어야 한다. 단, 현저한 시황 변동 등 불가피한 사유가 있는 경우에는 방송 전까지 계약 사항을 변경하여 교부할 수 있으나 이러한 경우에도 사전에 협력사와 합의되어야 하며 변경 계약을 체결하는 즉시 협력사에 변경 합의서를 교부하여야 한다."},
                    { num: "3", title: "계약의 내용에는 방송 일정(협력사와 방송 조건에 관한 합의서를 작성하는 거래인 경우), 판매전문가 등의 출연 인원 수 및 출연료 분담 조건, 사전제작영상물의 사용료 분담 조건, 방송세트의 추가 또는 변경 시 그에 따른 비용 분담 조건 등을 포함하여야 한다." },
                ],
            },
            {
                no: "06",
                title: "불공정거래행위 금지",
                lead: "GS SHOP은 협력사와 방송제작비를 협의·결정함에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 협력사에 대해 거래상 지위를 남용하여 불이익을 주거나 그 밖에 불공정한 거래 조건을 강요하는 행위를 하여서는 아니 된다."
            },
            {
                no: "07",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와 방송제작비 등의 조건을 협의·결정하는 과정에서 이 지침을 위반하거나 기타 방송제작비 등의 조건의 결정과 관련하여 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다."
            },
            {
                no: "08",
                title: "제재",
                lead: "GS SHOP 임직원이 이 지침에서 규정한 사항을 위반한 사실이 확인된 경우 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다."
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />제1조 (시행일)<br />① 이 기준은 2016. 5. 9. 제정, 시행한다.<br />② 이 기준은 2017. 1. 1. 개정, 시행한다.<br />③ 이 기준은 2018. 8. 2. 개정, 시행한다.<br />④ 이 기준은 2020. 12. 30. 개정, 시행한다. <br />⑤ 이 기준은 2021. 11. 15. 개정, 시행한다.<br />⑥ 이 기준은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 6. 직매입 상품 등의 반품 기준과 절차
        FairTradeHomeShoppingReturnSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「협력사와의 공정한 거래를 위한 기준과 절차」에서 정한 사항 중 직매입 상품 등의 반품 기준 및 절차에 관한 세부적인 준수 사항을 제시함으로써, 주식회사 지에스리테일(이하 ‘GS SHOP’)이 협력사와의 거래(직매입거래, 특약매입거래, 위수탁거래 등을 모두 포함하며, 이하 통칭하여 ‘거래’)를 통해 납품 받은 상품을 반품하는 과정에서 합리적이고 정당한 반품 기준을 확립하고, 이와 관련된 법령을 준수하여 협력사와 공정한 거래 관계를 확립하고자 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 협력사와의 상담 또는 거래 과정에서 항상 이 지침을 숙지하고 준수하여야 한다." },
                    { num: "2", title: "GS SHOP은 협력사와의 거래에 있어 이 지침 외에도 「독점규제 및 공정거래에 관한 법률(이하 ‘공정거래법’)」, 「대규모유통업에서의 거래 공정화에 관한 법률(이하 ‘대규모유통업법’)」 제10조(상품의 반품금지) 및 「대규모유통업자의 반품행위에 대한 위법성 심사지침」 등 공정거래 관련 법령에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com) 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다."},
                ],
            },
            {
                no: "03",
                title: "상품의 반품 금지", 
                lead:"GS SHOP은 정당한 사유 없이 협력사로부터 납품 받은 상품의 전부 또는 일부를 반품하여서는 아니 된다. 단, 대규모유통업법 제10조에서 예외적으로 반품을 허용하고 있는 다음 각 호의 어느 하나에 해당하는 경우로서 해당 거래분야에서 합리적이라고 인정되는 기간 내에 반품하는 경우에는 정당한 사유가 있는 것으로 추정한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 특약매입거래의 경우로서 계약 체결 시 반품조건을 구체적으로 약정하고 그 반품조건을 명시한 서면을 협력사에게 준 경우" },
                    { num: "2", title: "2. 위수탁거래의 경우" },
                    { num: "3", title: "3. 납품받은 상품이 협력사의 책임 있는 사유로 인하여 오손·훼손되었거나 상품에 하자가 있는 경우"},
                    { num: "4", title: "4. 납품받은 상품이 계약한 상품과 다른 경우" },
                    { num: "5", title: "5. GS SHOP이 반품으로 인하여 생기는 손실을 스스로 부담하고 해당 협력사에게 반품의 동의를 받은 경우" },
                    { num: "6", title: "6. 직매입거래의 경우로서 일정한 기간이나 계절에 집중적으로 판매되는 상품(신선농ㆍ수ㆍ축산물은 제외한다. 이하 ‘시즌상품’)에 대하여 계약체결 시 반품조건을 구체적으로 약정하고 그 반품조건이 명시된 서면을 협력사에게 준 경우" },
                    { num: "7", title: "7. 직매입거래의 경우로서 협력사가 반품이 자기에게 직접적으로 이익이 된다는 객관적인 근거자료를 첨부한 서면으로 반품일 이전에 자발적으로 반품을 요청한 경우",},
                    { num: "8", title: "8. 그밖에 직매입거래의 경우로서 제3호부터 제7호까지의 규정에 준하는 정당한 사유가 있는 경우" },
                ],
            },
            {
                no: "04",
                title: "정당한 사유 있는 반품의 세부 기준",
                items: [
                    { num: "1", title: "특약매입거래의 경우 GS SHOP이 구체적인 반품 조건을 미리 약정하고 그 반품조건을 명시한 서면을 협력사에게 준 경우에는 반품에 정당한 사유가 있는 것으로 추정한다. 이 경우 구체적인 반품 조건에는 반품 대상을 특정하는 방법과 절차, 반품이 이루어지는 시점, 반품 절차 등이 포함되어야 한다." },
                    { num: "2", title: "위수탁거래의 경우 상품의 소유권이 위탁자인 협력사에게 있기 때문에 GS SHOP이 별도의 제한 없이 재고 상품을 협력사에게 반품하더라도 특별한 사정이 없는 한 반품에 정당한 사유가 있는 것으로 추정한다." },
                    { num: "3", title: "GS SHOP은 협력사가 오손·훼손된 상품 또는 하자 있는 상품을 납품한 경우 반품에 정당한 사유가 있는 것으로 추정한다. 다만, GS SHOP의 창고 또는 GS SHOP이 지정한 장소에 협력사가 납품한 이후에 GS SHOP의 고의 또는 과실로 인해 상품이 오손·훼손된 경우에는 그러하지 아니하다."},
                    { num: "4", title: "GS SHOP이 납품받은 상품이 계약한 상품과 다른 경우 반품에 정당한 사유가 있는 것으로 추정한다. 여기에는 협력사가 납품한 상품이 계약한 상품과 다른 경우뿐만 아니라 상품의 원산지, 유통기한, 크기 등 계약 목적 달성에 중요한 제품의 특성이 당초 계약한 내용과 다른 경우도 포함된다."},
                    { num: "5", title: "GS SHOP이 이미 납품받은 상품을 반품하여 발생하는 손실을 스스로 부담하는 경우 특별한 사정이 없는 한 협력사의 이익을 저해하거나 손실을 유발하지 않기 때문에 반품에 정당한 사유가 있는 것으로 추정한다. 이때 손실의 범위는 반품으로 인해 협력사에게 추가적으로 발생하는 모든 비용을 의미하며 반품에 소요되는 직접 비용, 반품된 상품을 협력사가 재판 매하는 등의 방식으로 사용·수익하는데 추가적으로 소요되는 비용, 납품시점에 비해 상품의 가치가 하락한 경우 그 차액 등이 포함된다." },
                    { num: "6", title: "시즌상품의 직매입거래시 GS SHOP이 계약 체결 시점부터 협력사와 반품 조건에 대해 구체적으로 약정하고 그 반품 조건이 명시된 계약 서면을 미리 준 경우 반품에 정당한 사유가 있는 것으로 추정하며, 어떤 상품이 이에 해당하는지는 해당 상품의 월별·분기별 판매량과 재고량, 해당 상품에 대한 소비자의 인식 등을 종합적으로 고려하여 판단한다. 시즌상품으로 판단될 수 있는 사례는 다음 각 호와 같다.",
                      details:[
                            "1. 기념일 상품 : 발렌타인데이 초콜릿, 화이트데이 사탕, 빼빼로데이 과자, 어린이날 완구, 어버이날 또는 스승의날 선물, 크리스마스 트리 등",
                            "2. 명절 상품 : 추석 선물세트, 설 선물세트, 차례용품, 제기 등",
                            "3. 신학기/졸업시즌 용품 : 가방, 연필, 공책, 실내화, 교복, 꽃다발 등",
                            "4. 휴가철 용품 : 수영복, 튜브 등 물놀이용품, 스키복, 고글 등 스키용품 등",
                            "5. 계절 용품 : 에어컨, 제습기, 선풍기, 히터 등"
                        ]
                    },
                    { num: "7", title: "직매입거래의 경우로서 협력사가 GS SHOP에 반품이 자기에게 이익이 된다는 사실을 객관적으로 증명할 수 있는 근거와 함께 반품일 이전에 자발적으로 반품을 요청하는 경우 반품에 정당한 사유가 있는 것으로 추정한다. 구체적인 사례는 다음 각 호와 같다.",
                      details:[
                            "1. 협력사가 자신의 상품에 유해물질이 첨가되어 있다는 보도를 접하고 이를 신속히 반품 받아 소비자 피해를 줄이는 것이 스스로에게도 이익이 된다고 판단하여 GS SHOP에게 반품을 요청하면서 객관적인 근거서류를 제출한 경우",
                            "2. 협력사가 신제품을 출시하면서 기존에 납품한 상품을 매장에서 회수하는 것이 브랜드 이미지 제고에 더 도움이 된다는 판단을 하여 GS SHOP에게 반품을 요청하면서 객관적인 근거서류를 제출한 경우",
                        ]
                    },
                    { num: "8", title: "대규모유통업법 제10조 제1항 제3호부터 제7호까지에 직접적으로 해당되는 사유가 없더라도 그에 준하는 사유가 있는 경우에는 반품에 정당한 사유가 있는 것으로 추정될 수 있다.",}
                ]
            },
            {
                no: "05",
                title: "반품 절차 기본 원칙",
                items: [
                    { num: "1", title: "모든 반품은 협력사와 사전에 조건을 합의한 뒤 관련 부서장의 승인을 받고 진행하여야 한다." },
                    { num: "2", title: "직매입 상품의 반품의 경우 오손·훼손 또는 하자가 있는 상품, 계약한 상품과 다른 상품이 납품된 경우에는 즉시 협력사에 통보하여 관련 사실을 상호 확인한 후 반품 절차를 진행하여야 한다."},
                    { num: "3", title: "제2항에 따른 확인 결과 상품의 오손·훼손이 GS SHOP의 고의 또는 과실로 인해 발생한 경우에는 반품을 할 수 없다. 단, 이 경우에도 GS SHOP이 상품의 오손·훼손 및 반품에 따른 협력사의 모든 손실을 부담하면서 협력사의 동의를 얻은 후 반품하는 경우에는 가능하다." },
                ],
            },
            {
                no: "06",
                title: "반품 세부 절차",
                items: [
                    { num: "1", title: "특약매입거래나 위수탁거래의 경우 상품 판매를 마감한 이후 판매되지 않은 상품을 협력사와 합의한 일정한 기간(예: 10영업일) 이내에 협력사에게 반품(반환)하여야 한다." },
                    { num: "2", title: "납품받은 상품이 오손·훼손 또는 하자가 있어 반품하는 경우 상품에 하자 등이 발견되면 해당 하자 등이 발생한 원인이 GS SHOP 또는 협력사 중 누구에게 있는지 객관적인 근거를 통해 상호 확인한 후 협력사에게 귀책사유가 있는 경우에만 반품하여야 한다."},
                    { num: "3", title: "납품받은 상품이 계약한 상품과 다른 경우 즉시 협력사에게 해당 사실을 통보하여야 하고 계약한 상품과 다름을 협력사와 상호 확인한 후 반품하여야 한다." },
                    { num: "4", title: "GS SHOP에서 반품으로 인하여 협력사에게 발생하는 손실을 모두 부담하고 협력사에게 반품의 동의를 받아 반품하고자 할 경우 협력사와 사전 손실 금액을 협의하고 관련 부서장에게 승인을 받은 후 반품을 진행하여야 한다." },
                    { num: "5", title: "시즌상품을 협력사와 계약체결 시 약정한 반품조건에 따라 반품하려는 경우 사전에 관련 부서장의 승인을 받은 후 반품을 진행하여야 한다."},
                    { num: "6", title: "직매입거래에서 협력사가 반품이 자기에게 이익이 된다는 사실을 객관적으로 증명할 수 있는 근거와 함께 반품일 이전에 자발적으로 반품을 요청하는 경우 담당MD는 협력사가 반품이 자기에게 이익이 된다는 객관적으로 증명하는 근거에 대해 법무 담당부서 및 공정거래업무 담당부서에 사전 문의하여 협력사가 제시하는 근거가 정당하다는 승인을 받고 부서 장의 승인을 받은 후 해당 상품을 반품하여야 한다. 이때 협력사는 자기에게 이익이 된다는 사실을 객관적으로 증명하는 근거자료를 직접 반품요청시스템에 등록하여야 한다." },
                    { num: "7", title: "대규모유통업법 제10조 제1항 제3호부터 제7호까지에 직접적으로 해당되는 사유가 없더라도 그에 준하는 사유가 있어 반품을 하고자 할 경우 사전에 법무 담당부서 및 공정거래업무 담당부서에 사전 승인을 거쳐 관련 부서장의 승인을 받은 후에 반품을 진행하여야 한다." },
                ],
               
            },
            {
                no: "07",
                title: "반품 조건 등에 관한 서면의 기재",
                items: [
                    { num: "1", title: "GS SHOP은 상품의 반품 조건에 대해 협력사와 합의한 경우 다음 각 호의 사항에 관하여 기재한 서면(전자거래기본법에 따른 전자문서 포함)을 협력사에게 교부하여야 한다. 서면에는 GS SHOP과 협력사가 각각 서명 또는 기명날인하여야 한다.",
                        details:[
                            "1. 반품조건",
                            "2. 반품된 상품의 목록",
                            "3. 반품된 상품의 수량",
                            "4. 반품된 상품의 거래형태(직매입/특약매입/위수탁 거래 등)",
                            "5. 반품된 상품의 반품일자",
                            "6. 반품된 상품과 관련된 납품대금",
                            "7. 반품된 상품의 반품사유",
                            "8. 협력사가 GS SHOP에 서면으로 반품을 요청하면서 해당 반품이 자신에게 직접적으로 이익이 된다는 사실을 증명하는 객관적인 근거 자료를 제출한 경우 협력사가 제출한 서면과 근거 자료"
                        ]
                    },
                    { num: "2", title: "GS SHOP은 반품조건을 적은 서면을 협력사에 교부하기 전까지는 협력사에게 반품을 하여서는 아니 된다."},
                  
                ],
            },
            {
                no: "08",
                title: "반품조건 등에 관한 서면의 보존",
                lead: "GS SHOP은 제7조 1항의 반품 조건 관련 합의서 및 관련 증빙 자료를 협력사와의 계약이 끝난 날부터 5년간 보존하여야 한다."
            },
            {
                no: "09",
                title: "불공정거래행위 금지",
                lead: "GS SHOP은 협력사와 반품 관련 업무를 처리함에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 협력사에 대해 거래상 지위를 남용하여 불이익을 주거나 그 밖에 불공정한 거래 조건을 강요하는 행위를 하여서는 아니 된다."
            },
            {
                no: "10",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와 반품 조건을 협의·결정하는 과정에서 이 지침을 위반하거나 기타 반품 조건의 결정과 관련하여 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다."
            },
            {
                no: "11",
                title: "제재",
                lead: "GS SHOP 임직원이 이 지침에서 규정한 사항을 위반한 사실이 확인된 경우 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다."
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙<br />제1조 (시행일)<br />① 이 지침은 2018. 8. 2. 제정, 시행한다.<br />② 이 지침은 2020. 12. 30. 개정, 시행한다.<br />③ 이 지침은 2021. 11. 15. 개정, 시행한다.<br />④ 이 지침은 2025. 8. 1. 제정, 시행한다.",
            },

        ],
        // 7. 경영정보 제공 요구 금지 기준
        FairTradeHomeShoppingManagementInfoSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「협력사와의 공정한 거래를 위한 기준과 절차」에서 정한 내용을 바탕으로, 주식회사 지에스리테일(이하 ‘GS SHOP’)이 협력사의 경영정보를 적절하게 보호하고 거래의 투명성과 신뢰를 높이며, 관련 법령을 준수함으로써 협력사와 상호 존중에 기반한 공정한 거래 관계를 구축하기 위한 세부적인 준수 사항을 제시하고자 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 협력사와의 상담 또는 거래 과정에서 항상 이 지침을 숙지하고 준수하여야 한다." },
                    { num: "2", title: "GS SHOP은 협력사와의 거래에 있어 이 지침 외에도 「독점규제 및 공정거래에 관한 법률(이하 ‘공정거래법’)」, 「대규모유통업법에서의 거래 공정화에 관한 법률(이하 ‘대규모유통업법’)」 제14조(경영정보 제공 요구 금지) 등 공정거래 관련 법령에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com) 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다."},
                ],
            },
            {
                no: "03",
                title: "금지사항", 
                lead:"GS SHOP은 부당하게 다음 각 호의 어느 하나에 해당하는 정보를 협력사에 요구하여서는 아니 된다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 협력사가 다른 사업자에게 공급하는 상품의 공급 조건에 관한 정보(공급가격, 공급물량, 공급시기 및 방법, 대금지급시기 및 방법, 반품조건 등)" },
                    { num: "2", title: "2. 협력사가 공급하거나 판매하는 상품의 원가에 관한 정보" },
                    { num: "3", title: "3. 협력사가 다른 사업자에게 판매하는 상품의 매출 관련 정보(거래처별 매출액, 기간별 판매량 등)"},
                    { num: "4", title: "4. 협력사가 다른 사업자와 진행하는 판매촉진행사에 관한 정보(거래처별판매촉진행사의 시기, 횟수, 행사 내용 및 거래조건 등)" },
                    { num: "5", title: "5. 협력사가 다른 사업자와 거래에 사용하는 전산망에 접속하기 위한 정보(다른 사업자와 거래에 사용되는 전산망에 접속하는 아이디, 비밀번호 등)" },
                    { num: "6", title: "6. 제1호부터 5호까지에 준하는 경영정보로서 GS SHOP과의 거래 과정에서 협력사에게 불이익을 줄 수 있는 정보" },
                ],
            },
            {
                no: "04",
                title: "예외사항",
                items: [
                    { num: "1", title: "제3조에도 불구하고 GS SHOP이 협력사에 다음 각 호의 사항을 기입하고 각각 기명날인 한 서면을 제공한 경우 GS SHOP은 협력사에게 경영정보의 제공을 요구할 수 있다.",
                      details:[
                          "1. 경영정보 제공을 요구하는 목적",
                          "2. 비밀유지방법 등 요구 대상 정보의 비밀유지에 관한 사항 및 비밀침해 시 손해배상에 관한 사항",
                          "3. 경영정보 요구일자, 제공일자 및 제공방법",
                          "4. 경영정보 제공 요구가 불가피함을 객관적으로 증명할 수 있는 사항"
                      ]
                    },
                    { num: "2", title: "다음 각 호의 정보는 공개되어 있거나 협력사와의 거래 개시 또는 유지를 위해 필요한 정보로써 원칙적으로 협력사에 요구할 수 있는 정보로 본다.",
                        details:[
                            "1. 대외적으로 공개되어 있는 협력사의 일반 현황(대표자 학력, 직원수, 취급 상품명등)",
                            "2. 협력사의 재무제표",
                            "3. 협력사의 연간 전체 매출액(단, 거래처별, 채널별 매출액은 제외)",
                            "4. 제1호부터 제3호까지에 준하는 것으로 제공하더라도 GS SHOP과의 거래 또는 협상 과정에서 불리하게 활용될 가능성이 없는 정보",
                        ]
                    },
                    { num: "3", title: "GS SHOP이 협력사에 정당한 절차를 거쳐 경영정보를 요구하는 경우에도 GS SHOP은 요구 목적에 필요한 최소한의 범위에서 요구하여야 하고, 수령한 경영정보는 요구 목적의 범위 내에서만 사용하여야 한다." },
                  
                ]
            },
            {
                no: "05",
                title: "기타 불공정거래행위 금지",
                lead: "GS SHOP은 협력사에 대해 경영정보 등을 요구함에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 협력사에게 부당한 방법으로 경영정보를 요구하거나 협력사가 경영정보 등을 제공하지 않는다는 이유로 협력사에게 불이익을 주거나 협력사의 사업 활동을 방해하는 등의 불공정한 거래행위를 하여서는 아니 된다."
            },
            {
                no: "06",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와 거래 과정에서 이 지침을 위반하거나 기타 경영정보 제공 요구와 관련하여 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다."
            },
            {
                no: "07",
                title: "제재",
                lead: "GS SHOP 임직원이 이 지침에서 규정한 사항을 위반한 사실이 확인된 경우 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다."
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙<br />제1조 (시행일)<br />① 이 지침은 2015. 6. 1. 제정, 시행한다.<br />② 이 지침은 2018. 8. 2. 개정, 시행한다.<br />③ 이 지침은 2020. 12. 30. 개정, 시행한다.<br />④ 이 기준은 2020. 12. 30. 개정, 시행한다. <br />⑤ 이 지침은 2021. 11. 15. 개정, 시행한다.<br />⑥ 이 기준은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 8. 홈쇼핑 불공정거래행위에 대한 위법성 심사지침 준수 기준
        FairTradeHomeShoppingGuidelineComplianceSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「협력사와의 공정한 거래를 위한 기준과 절차」에서 정한 사항 중 공정거래위원회의 홈쇼핑 사업 영역 내 불공정거래행위 위법성 심사 기준에 관한 세부적인 사항을 제시함으로써, 주식회사 지에스리테일(이하 ‘GS SHOP’)이 관련 법령을 성실히 준수하고, 협력사와의 거래 과정에서 공정성과 투명성을 확보하여 상호 신뢰 기반의 건전한 거래 문화를 조성하기 위해 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "이 지침은 「대규모유통업에서의 거래 공정화에 관한 법률(이하 ‘대규모유통업법’)」을 바탕으로 제정된 “TV홈쇼핑사업자의 특정 불공정거래행위에 대한 위법성 심사지침”에 규정된 사항들을 GS SHOP 임직원들이 쉽게 이해하고 업무에 적용하기 위해 만들어진 것으로 임직원들은 협력사와의 상담 또는 거래 과정에서 항상 이 지침을 숙지하고 준수하여야 한다." },
                    { num: "2", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "3", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com) 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "4", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다." },
                ],
            },
            {
                no: "03",
                title: "금지사항", 
                lead:"GS SHOP 임직원은 협력사와의 거래 과정에서 불공정거래행위를 하여서는 아니되며, 다음 각 호의 사항을 준수하여야 한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 협력사와 계약을 체결하는 즉시 서면으로 계약서를 작성하여 교부하 고, 정식 서면계약 체결 없이 구두 발주를 하지 않는다." },
                    { num: "2", title: "2. 협력사와 직접 거래할 수 있음에도 정당한 이유 없이 중간유통업자(벤 더)를 통해 납품하도록 유도하지 않는다." },
                    { num: "3", title: "3. 특별한 사정이 없는 한 판매분 매입 방식의 거래를 하지 않는다."},
                    { num: "4", title: "4. 협력사에게 사은품 비용 등 판매촉진행사 비용부담을 50%을 초과하여 전가하지 않는다." },
                    { num: "5", title: "5. 협력사에게 ARS, 일시불, 무이자할부 등으로 인해 발생하는 가격할인 비용부담을 50%를 초과하여 전가하지 않는다." },
                    { num: "6", title: "6. 판매 목표 미달 등의 이유로 협력사에게 추가 수수료를 요구, 수취하 거나 판매수수료 산정 방식 등의 거래 조건을 변경하지 않는다." },
                    { num: "7", title: "7. 직매입거래 시 협력사가 비용을 부담하는 판촉행사(프로모션 등)를 진행하지 않는다." },
                    { num: "8", title: "8. 방송 편성을 조건으로 방송의 사전 제작 비용을 협력사에 부당하게 전가하지 않는다." },
                    { num: "9", title: "9. 협력사와의 계약 체결 전 판매 물량이나 방송 횟수를 보장하지 않는다." },
                    { num: "10", title: "10. 협력사와 사전 합의 없이 방송을 취소하거나 편성 시간, 내용 등을 변 경하지 않는다." },
                    { num: "11", title: "11. 협력사의 택배사, 사전 방송 제작 업체 등 선정 시 특정 업체 이용을 강요하지 않는다." },
                    { num: "12", title: "12. 신상품 론칭 시 고효율 달성을 위해 협력사에게 상품 구매를 강요하지 않는다." },
                    { num: "13", title: "13. 상품의 오·훼손 등의 정당한 이유 없이 협력사에게 직매입한 상품을 반품하거나 신상품으로 교환을 요청하지 않는다."},
                    { num: "14", title: "14. 협력사와 경쟁업체 간의 거래를 방해하지 않는다." },
                    { num: "15", title: "15. 협력사와의 입점 상담 시 거래를 위해 필요한 정보(일반 현황 자료, 재 무 상태 및 신용 확인에 필요한 자료 등) 외에는 협력사의 경영정보 제공을 요구하지 않는다." },
                    { num: "16", title: "16. 협력사와의 거래 중 경쟁업체와의 거래실적 등의 경영정보 제공을 요구하지 않는다." },
                    { num: "17", title: "17. 불공정 행위 신고 등을 이유로 협력사에게 불이익을 주지 않는다." },
                    { num: "18", title: "18. 상품 판매 대금을 지연하여 지급하지 않는다." },
                    { num: "19", title: "19. 협력사로부터 금품, 접대, 무상 제공품 등을 받거나 요구하지 않는다." },
                ],
            },
            {
                no: "04",
                title: "기타 불공정거래행위 금지",
                lead: "GS SHOP은 협력사와의 거래에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 이에 준하는 행위로서 협력사에게 불이익을 주거나 경쟁을 제한하는 불공정한 거래행위를 하여서는 아니 된다."
            },
            {
                no: "05",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와의 거래 과정에서 이 지침을 위반하거나 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다."
            },
            {
                no: "06",
                title: "제재",
                lead: "GS SHOP 임직원이 이 지침에서 규정한 사항을 위반한 사실이 확인된 경우 상위 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다."
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙<br />제1조 (시행일)<br />① 이 지침은 2017. 4. 28. 제정, 시행한다.<br />② 이 지침은 2018. 8. 2. 개정, 시행한다.<br />③ 이 지침은 2020. 12. 30. 개정, 시행한다.<br />④ 이 지침은 2021. 11. 15. 개정, 시행한다.<br />⑤ 이 지침은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 9.상품선정 및 방송편성 기준과 절차
        FairTradeHomeShoppingProductSelectionSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 ‘GS SHOP’)의 TV홈쇼핑 및 데이터홈쇼핑 방송(이하 통칭하여 ‘방송’)을 위해 공정하고 투명하게 신상품 및 협력사를 선정하고, 객관적인 지표에 따라 방송을 편성하는 등 상품의 선정 및 방송 편성 과정에서의 공정성과 객관성을 강화함으로써 사업자 간 건전한 경쟁 환경을 조성하고, 중소기업과 고객을 보호하며, 방송의 공익성 확보 및 방송사업자로서의 공적 책임을 다하기 위해 GS SHOP 임직원이 준수해야 할 사항들을 규정하기 위해 작성된 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 협력사와의 상담 또는 거래 과정에서 항상 이 기준을 숙지하고 준수하여야 한다." },
                    { num: "2", title: "GS SHOP 임직원은 이 기준 외에도 협력사와의 거래에 있어 「독점규제 및 공정거래에 관한 법률」, 「대규모유통업에서의 거래 공정화에 관한 법률」 등 공정거래 관련 법령 및 「방송법」에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 기준 및 부속 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 기준은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com)의 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 기준을 지속적으로 고지하고 공유하기로 한다." },
                    { num: "6", title: "GS SHOP과 거래하는 협력사의 상품이 무형상품인 경우 해당 무형상품의 선정 기준 및 절차는 별도의 지침으로 정한다." },
                ],
            },
            {
                no: "03",
                title: "협력사 평가 기준", 
                lead:"GS SHOP의 방송을 위한 협력사 선정 시, 고객의 피해를 사전에 예방, 최소화 하고자 다음 각 호의 기준에 따라 협력사의 신뢰도를 평가한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 협력사의 과거 경영 실적과 재무 건전성 및 안정성을 측정하기 위해 신용 평가 기관의 신용 평가 등급을 기준으로 상품군별로 일정한 등급 이상을 받은 협력사에 대해서만 방송 입점을 허용한다. 신용 등급에 대한 구체적인 기준은 별표 1과 같다." },
                    { num: "2", title: "2. 상품에 대한 고객의 불만이나 A/S 요청에 대비하여 협력사의 A/S 이행 능력을 확인하고, A/S 이행 능력이 부족하다고 판단될 경우 고객 보호를 위해 입점 제안을 반려할 수 있다." },
                ],
            },
            {
                no: "04",
                title: "상품신청 절차",
                items: [
                    { num: "1", title: "GS SHOP의 방송을 위한 상품 선정은 협력사로부터 제안 받은 상품에 대해 신상품 평가 위원회의 평가를 거쳐 공정하게 선정한다." },
                    { num: "2", title: "제1항을 통해 기준에 부합된 상품에 대해서는 품질·안전 담당부서와 심의 담당부서를 통해 상품군별 정해진 기준에 의거한 품질 검사와 심의 절차를 거쳐 합격해야 한다." },
                    { num: "3", title: "협력사는 온라인을 통해 자신이 입점 제안한 상품에 대한 선정 절차 진행 현황을 알 수 있으며, 입점 불가 판정을 받은 제안 내역에 대해서도 확인할 수 있다." },
                ],
            },
            {
                no: "05",
                title: "신상품 평가 위원회의 구성",
                items: [
                    { num: "1", title: "신상품 평가 위원회는 GS SHOP 내부 평가위원 2∼5명, 외부 평가위원 12∼16명으로 구성한다." },
                    { num: "2", title: "신상품 평가 위원회의 내부 평가위원은 상품 기획 및 전략 담당 부서 담당자, 상품 PD, 심의 담당자, 품질안전 담당자로 구성한다." },
                    { num: "3", title: "신상품 평가 위원회의 외부 평가위원은 GS SHOP 이용 고객들 중에서 선정한다. 외부 평가위원 모집 방식은 공식 홈페이지에 안내, 게시하는 방법 등을 통한 공개 모집을 원칙으로 한다." },
                ],
            },
            {
                no: "06",
                title: "신상품 평가 위원회의 운영 및 기능",
                items: [
                    { num: "1", title: "신상품 평가 위원회는 주 1회 정기 운영을 원칙으로 하며, 그 외에 평가 위원의 요청이 있거나 필요하다고 인정하는 때에 운영할 수 있다." },
                    { num: "2", title: "신상품 평가 위원회는 GS SHOP에서 판매할 상품을 선정함에 있어, 투명하고 객관적인 기준과 절차를 통해 공정하게 평가하여 대상 상품을 선정하여야 한다." }
                ],
            },
            {
                no: "07",
                title: "상품평가 기준",
                items: [
                    { num: "1", title: "신상품 평가 위원회는 협력사로부터 제안 받은 상품에 대해 항목별 평가 및 최종 가중치를 반영한 평가에 의거하여 상품성을 측정하며, 13개 항목에 대하여 각 항목 당 5점 만점 중 전체 평균 3점 이상 시 가결됨을 원칙으로 한다. 각 평가 항목 및 세부 평가 기준은 별표 2와 같다." },
                    { num: "2", title: "해당 상품이 제1항의 기준을 충족할 경우, 동일한 조건 하에서는 다음 각 호의 기준을 충족하는 상품을 우선 선정함을 원칙으로 한다. 우선 선정의 상세 기준은 별표 3과 같다.",
                      details:[
                            "1. 중소기업 기본법 제2조 및 동법 시행령 제3조에 의거한 중소기업 제조사 또는 유통업체가 공급하는 상품",
                            "2. 장애인/노인 등이 사회적 소외계층이 공급하는 상품 또는 소외계층을 대상으로 하는 상품",
                            "3. 농축산어민이 최종 제조사이거나 농축산어민이 직접 공급하는 상품",
                        ]
                    },
                    { num: "3", title: "제1항 및 제2항의 기준에도 불구하고, 「상품소개 및 판매방송 심의에 관한 규정」 제64조(방송금지)에 해당하거나, 기타 방송 심의 상 문제가 발생될 여지가 있는 상품에 대해서는 입점 또는 상품 선정 제안을 반려하며, 해당 사유를 협력사에게 고지하여야 한다." },
                ],
            },
            {
                no: "08",
                title: "신상품 품평회",
                items: [
                    { num: "1", title: "제7조에 명시된 기준을 통해 선정된 상품의 담당 MD 또는 해당 팀에서는 신상품 평가 위원회를 통해 선정된 결과를 투명하게 임직원에게 공유하기 위하여 신상품 품평회를 개최할 수 있다." },
                    { num: "2", title: "신상품 품평회는 매월 1회 상품 기획 및 전략 담당 부서의 주관으로 개최한다. 임직원은 상품에 대한 자유로운 의견 등을 개진하고, 주관 부서와 해당 팀은 임직원의 의견을 수렴하여 신상품 판매 계획 등에 반영할 수 있다."},
                ],
            },
            {
                no: "09",
                title: "품질 검사 기준 및 절차",
                items: [
                    { num: "1", title: "GS SHOP의 방송을 위한 상품 및 협력사 선정 시, 제안된 상품은 반드시 GS SHOP 품질안전 담당부서의 품질 검사, 공정 관리, 배송 전 검사의 품질 승인 절차를 거쳐야 하며, 품질 부적합 판정을 받은 상품에 대해서는 고객 보호를 위해 입점 또는 상품 선정 제안을 반려할 수 있다." },
                    { num: "2", title: "품질 검사는 아래 표와 같이 상품 관련 각종 서류 검사, 실물 검사, 기능/성능 테스트, 공정 실사 등을 통해 법적 기준, 안전성, 기능 및 성능, 포장 상태 등을 종합적으로 판단한다. 상품군, 매체별로 품질 검사의 업무진행 방식, 샘플 제출방법, 품질서류에 차이가 있으며, 상세 내용은 투명거래시스템에 별도로 게시함으로써 협력사가 상시 확인 가능하도록 한다."},
                ],
                commonTables: [
                    {
                       
                        cols: ["구분", { label: "세부 검사 항목", colspan: 2 }],
                        rows: [
                            [
                                { label: "서류 검사", style: "text-align: center;" },
                                "• 상품 및 협력사 인허가 관련 서류 확인<br />• 상품의 기능, 성능 관련 내용 확인",
                                "• 상품과 관련된 서류 전체 확인",
                            ],
                            [
                                { label: "실물 검사", style: "text-align: center;" },
                                "• 상품의 안전성 및 외관의 이상여부<br />• 상품사양, 표시사항, 구성확인<br />• 포장 상태의 적합성 확인",
                                "• 고객에게 배송 전 상태의 제품 전반 사항을 확인",
                            ],
                            [
                                { label: "성능 검사", style: "text-align: center;" },
                                "• 테스트 통한 상품 기능/성능 점검 및 내구성 확인",
                                "• 상품의 내구성 및 기능/성능 점검",
                            ],
                        ],
                    },
                ],
            },
            {
                no: "10",
                title: "품질 승인",
                items: [
                    { num: "1", title: "협력사는 품질 승인을 위하여 샘플과 관련 품질 서류를 GS SHOP 품질안전 담당자에게 제출해야 한다." },
                    { num: "2", title: "협력사는 샘플 제출 시 고객에게 배송되는 포장 형태로 제출하여야 하며, GS SHOP의 상품별 포장기준에 적합해야 한다."},
                    { num: "3", title: "GS SHOP은 샘플검사 완료 후, 정해진 절차에 따라 택배 발송 등의 방법을 통하여 협력사에게 샘플을 반환하여야 한다."},
                ],
            },
            {
                no: "11",
                title: "방송편성 및 운영 원칙",
                items: [
                    { num: "1", title: "GS SHOP은 매년 정량화, 계량화된 평가 지표를 수립하고, 고객의 시청 패턴 등에 따른 시간대별 가치를 차등화한 객관적 지표에 기반하여 공정하고 투명하게 방송을 편성한다." },
                    { num: "2", title: "GS SHOP은 편성 시 시즌, 시간대, 요일, 직전 방송과의 시간적 간격 등을 고려하고, 동일 시간대 동일 상품 연속 편성을 지양한다."},
                    { num: "3", title: "GS SHOP은 중소기업의 신상품의 경우, 특별한 사정이 없는 한 론칭 포함 3회 이상 방송 편성 기회를 제공한다. 단, 협력사의 요청 또는 제13조에서 정한 편성 불가 사유에 해당하는 경우에는 예외로 한다."},
                    { num: "4", title: "GS SHOP은 협력사에게 방송편성을 조건으로 부당한 연계편성 등을 강요하는 행위를 하지 아니한다." },
                    { num: "5", title: "제4항을 준수하기 위한 구체적인 기준 및 금지행위의 유형 등은 별도의 지침으로 정한다."},
                ],
            },
            {
                no: "12",
                title: "편성 절차",
                items: [
                    { num: "1", title: "GS SHOP은 공정하고 독립적인 방송 편성을 위하여 편성 전문부서를 설치·운영하고, 상품선정 절차와는 분리·독립된 편성협의회를 통해 방송을 편성한다." },
                    { num: "2", title: "편성협의회는 편성 전문부서를 주관부서로 하고, 각 부서별 편성 전문 인력으로 구성하며, 방송 10~15일 이전에 공정하고 투명한 편성을 위해 협의한다."},
                    { num: "3", title: "편성협의회에서 편성이 확정되면, GS SHOP은 편성 결과를 협력사에 안내하고 상호 합의된 편성 결과에 대해 협력사와 서면 계약을 체결한다."},
                    { num: "4", title: "편성의 독립성을 보장하기 위하여, GS SHOP은 오직 편성협의회를 통해 모든 편성을 확정하며, 불가항력에 의하여 정상적인 방송이 어려운 사유로(송출사고 대응 등) 긴급한 편성이 필요한 경우 외에는 편성협의회의 절차를 생략할 수 없다." },
                    { num: "5", title: "편성 취소 또는 편성일시를 변경하려는 경우 편성 전문부서는 협력사와 합의 사실을 반드시 사전에 확인하여야 하며, 그 사유의 타당성 여부를 검토 후 진행하여야 한다."},
                ],
            },
            {
                no: "13",
                title: "편성 불가 사유",
                lead: "GS SHOP은 방송 환경 변화에 신속히 대응하고 고객이 만족하는 쇼핑 환경 제공을 위하여 다음 각 호의 사유에 해당하는 경우에는 편성의 일부 또는 전부를 변경 또는 취소할 수 있다. 다만, 이 경우 각 사유는 명백히 검증 및 확인되어야 하며, GS SHOP은 협력사에 미치는 불이익이 최소화 되도록 배려하여야 한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 상품의 품질, 안전성 등의 문제" },
                    { num: "2", title: "2. 고객 고발 등 사회적 이슈"},
                    { num: "3", title: "3. 특허권/상표권 등 지식재산권 침해 또는 침해 예상"},
                    { num: "4", title: "4. 이전 방송의 주요 고객 클레임 미해결" },
                    { num: "5", title: "5. 협력사 사전 준비 미흡 등으로 인한 방송 불가"},
                    { num: "6", title: "6. 기타 이와 유사한 경우로서 원활한 방송 등이 심히 불가능하다고 판단하는 경우"},
                ],
            },
            {
                no: "14",
                title: "편성 배려",
                lead: "GS SHOP은 중소기업과 고객의 보호, 방송의 공익성 확보 및 방송사업자로서의 공적 책임을 다하고자 방송 편성 시 다음 각 호를 준수한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 중소기업 상품은 상품 판매 방송 중 일정 비율 이상 우대 편성" },
                    { num: "2", title: "2. 중소기업, 농축산어민 및 장애인/노인 등의 사회적 소외계층을 위한 무료 판매 방송 운영"},
                    { num: "3", title: "3. 공익 목적의 공익광고, 옴부즈맨, 시청자 정보 프로그램 운영"},
                    { num: "4", title: "4. 장애인의 시청권 보장을 위한 폐쇄자막, 수화방송, 화면해설 등 장애인 시청을 위한 시청 지원 서비스 제공" },
                    { num: "5", title: "5. 청소년 보호를 위한 유해 상품 판매 금지"},
                ],
            },
            {
                no: "15",
                title: "상품 판매 중단",
                lead: "GS SHOP은 협력사가 납품한 상품 또는 그 광고 내용과 관련하여 다음 각 호의 어느 하나에 해당하는 사유가 발생한 경우, 해당 상품의 판매를 중단할 수 있다. 이 경우 GS SHOP은 즉시 협력사에게 중단 사유 및 중단 기간 등 판매 중단과 관련한 구체적인 내용을 통보하여야 하며, 판매 중단의 방법, 시기, 절차 등은 대하여서는 긴급성 및 중요성 등을 고려하여 불가피한 경우를 제외하고 협력사와 사전에 협의를 통하여 결정함을 원칙으로 한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 제3자로부터 지식재산권 침해 등의 경고가 접수된 경우" },
                    { num: "2", title: "2. 관련 법령 등의 위반을 이유로 정부기관 등(경찰·검찰 등 수사기관, 소 비자 단체 포함)의 조사가 시작되거나 출석 또는 자료 제출 등의 요청 이 있는 경우"},
                    { num: "3", title: "3. 협력사의 주요 자산에 대한 제3자의 (가)압류, (가)처분, 추심 등 강제 집행으로 협력사가 해당 상품의 정상적인 판매 또는 판매 상품의 정상 적인 A/S를 수행할 수 없다고 객관적으로 판단되는 경우"},
                    { num: "4", title: "4. 협력사의 부도, 파산, 영업 양도, 폐업, 중대한 자금 사정 악화 등으로 협력사가 해당 상품의 정상적인 판매 또는 판매 상품의 정상적인 A/S 및 고객 클레임 처리 등을 수행할 수 없다고 객관적으로 판단되는 경우" },
                    { num: "5", title: "5. 감독기관 등의 인허가 취소, 영업 정지 명령 등으로 정상적인 판매, 영 업 활동이 어려운 경우"},
                    { num: "6", title: "6. 관련 법령 등에 따라 상품에 요구되는 각종 기준(안전, 위생, 표시/광고 등)의 위반 또는 상품(부속품 포함)의 품질, 성능 및 안정성 문제 등과 관련하여, 상품 구매고객이 한국소비자원에 집단분쟁조정을 신청 또는 법원에 소비자단체소송을 제기하거나 소비자 관련 단체가 GS SHOP에 게 해당 상품에 대한 대량 교환, 환불 또는 보상 요청을 하는 경우(다 만, 상기 각종 기준을 위반하지 않았고, 품질, 성능 및 안정성 등에 문 제가 없다고 객관적으로 확인되는 경우에는 그러하지 아니한다)" },
                    { num: "7", title: "7. 제1호 내지 제6호의 사유와 관련한 방송(방송 예고 포함) 등 언론보도로 인해 해당 상품에 대한 구매고객의 클레임이 다수 발생하여 GS SHOP 에게 손해가 발생하거나 손해 발생이 객관적으로 예상되는 경우"},
                    { num: "8", title: "8. 협력사가 GS SHOP이 요청한 담보의 제공을 정당한 사유 없이 거부하 거나 갱신하지 아니하여 계약 기간 중 담보의 가치가 상실된 경우"},
                    { num: "9", title: "9. 해당 상품에 대하여 3개월 동안 매출이 전혀 발생하지 아니하는 등 그 수익성을 객관적으로 기대하기 어려운 경우" },
                    { num: "10", title: "10. 해당 상품의 납품 또는 배송(직송 또는 직송위탁의 경우에 한한다)과 관련하여 최근 6개월 이내에 3회 이상 지연이 발생하는 등 상품의 원 활한 공급 내지 배송을 기대하기 어렵다고 인정할 만한 객관적 사정이 존재하는 경우 (단, 협력사가 납품 또는 배송지연에 정당한 사유가 있 었음을 소명하는 경우에는 그러하지 아니하다)"},
                ],
            },
            {
                no: "16",
                title: "거래 종료 사유",
                lead: "GS SHOP은 협력사가 다음 각 호의 기준에 해당하는 경우, 협력사에 거래 중단 및 종료를 요청할 수 있으며, GS SHOP은 해당 기준을 투명거래시스템 및 협력사 교육을 통해 지속적으로 협력사와 공유해야 한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 원산지 표기 오류" },
                    { num: "2", title: "2. 품질/광고/심의 관련 고의적인 허위 서류 제출"},
                    { num: "3", title: "3. 고의적인 허위/과장 광고" },
                    { num: "4", title: "4. 고의적인 허위 주문" },
                    { num: "5", title: "5. 기타 협력사와 체결한 거래기본계약서 등에 명시된 계약 해지 또는 해제 사유의 발생"},
                ],
            },
            {
                no: "17",
                title: "거래 종료 절차",
                lead: "GS SHOP은 협력사가 다음 각 호의 기준에 해당하는 경우, 협력사에 거래 중단 및 종료를 요청할 수 있으며, GS SHOP은 해당 기준을 투명거래시스템 및 협력사 교육을 통해 지속적으로 협력사와 공유해야 한다.",
                items: [
                    { num: "1", title: "GS SHOP이 협력사와의 거래를 종료하고자 하는 경우 서면에 종료일자와 그 사유를 명확히 기재하여 전달하여야 한다." },
                    { num: "2", title: "협력사와의 거래 종료 사유가 협력사의 법령, 이 기준 또는 계약 위반 행위로 인한 것인 경우 협력사에 소명의 기회를 주어야 한다."},
                    { num: "3", title: "GS SHOP은 거래 종료에 따른 후속 절차(대금 정산, 상품 반환, 협력사 자료의 반환 등)를 성실히 이행하여야 한다." },
                ],
            },
            {
                no: "18",
                title: "기타 불공정거래행위 금지",
                lead: "GS SHOP은 상품선정 및 방송편성 관련 업무를 처리함에 있어 이 기준에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 협력사에 대해 거래상 지위를 남용하여 불이익을 주거나 그 밖에 불공정한 거래 조건을 강요하는 행위를 하여서는 아니 된다.",
            },
            {
                no: "19",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와 거래 조건을 협의·결정하는 과정에서 이 기준을 위반하거나 기타 거래 조건의 결정과 관련하여 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 별도 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다.",
            },
            {
                no: "20",
                title: "제재",
                lead: "GS SHOP 임직원이 이 기준에서 규정한 사항을 위반한 사실이 확인된 경우 별도 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다.",
            },
            {
                no: "21",
                title: "부속지침",
                usePlainList:true,
                items:[
                    { num: "1", title: "지침1. 무형상품 선정 기준과 절차" },
                    { num: "2", title: "지침2. 연계편성의 부당한 강요행위 금지 지침" },
                ]
            },
            {
                no: "22",
                title: "별표",
                usePlainList: true,
                items: [
                    { num: "1", title: "1. 협력사 평가 기준" },
                    { num: "2", title: "2. 신상품 평가 기준" },
                    { num: "3", title: "3. 신상품 우선 선정 기준" },
                ],
                commonTables: [
                    {
                        appendixTitle: "[별표1] 협력사 평가 기준 (제3조 제1항 제1호 관련)",
                        tableClass: "tbl_dual_grid",
                        cols: [
                            "구분",
                            "상품군(대분류)",
                            "신용등급",
                            "상품군(대분류)",
                            "신용등급",
                        ],
                        rows: [
                            [{ html: '<span class="p_txt">TV홈쇼핑<br class="p_br" />협력사</span><span class="m_txt">TV홈쇼핑협력사</span>', rowspan: 10, style:"text-align: center !important;", txt_verticle: true }, "디지털기기/핸드폰", "B", "스포츠/레저/자동차용품", "CCC"],
                            ["컴퓨터/게임기/소프트웨어", "B", "가구/인테리어", "CCC"],
                            ["대형가전", "B", "의류", "CCC"],
                            ["생활/소형가전", "B", "패션잡화", "CCC"],
                            ["생활건강용품", "B", "속옷", "CCC"],
                            ["건강식품", "B", "보석/시계/액세서리/장식", "CCC"],
                            ["일반식품", "B", "침구/커튼", "CCC"],
                            ["주방가전", "B", "출산/유아/아동", "CCC"],
                            ["주방용품", "B", "악기/취미/문화/애완", "CCC"],
                            ["화장품/미용기구/향수", "B", "여행/서비스/상품권", "CCC"],
                        ],
                    },
                    {
                        appendixTitle: "[별표2] 신상품 평가 기준 (제7조 제1항 관련)",
                        tableClass: "type_02",
                        theadRows: [
                            [
                                { label: "구분", rowspan: 2 },
                                { label: "평가자", rowspan: 2 },
                                { label: "평가항목", rowspan: 2 },
                                { label: "세부평가기준", colspan: 5 },
                            ],
                            ["5점", "4점", "3점", "2점", "1점"],
                        ],
                        rows: [
                            [{ html: '<span class="p_txt">내부 평가단</span><span class="m_txt">내부평가단</span>', rowspan: 8, style:"text-align: center !important;", txt_verticle: true }, { html: "PD", rowspan: 2 }, "소구 포인트 차별성", "우수", "양호", "보통", "미흡", "불량"],
                            ["상품 판매력", "우수", "양호", "보통", "미흡", "불량"],
                            [{ html: "품질안전", rowspan: 2 }, "관련 법 적합성", "우수", "양호", "보통", "미흡", "불량"],
                            ["사용 안전성", "우수", "양호", "보통", "미흡", "불량"],
                            [{ html: "심의", rowspan: 2 }, "심의 적합성", "우수", "양호", "보통", "미흡", "불량"],
                            ["대외 이슈 여부 (낮은 Risk)", "우수", "양호", "보통", "미흡", "불량"],
                            [{ html: "상품전략", rowspan: 2 }, "가격 경쟁력", "우수", "양호", "보통", "미흡", "불량"],
                            ["수수료율 적절성", "우수", "양호", "보통", "미흡", "불량"],
                            [{ html: '<span class="p_txt">외부 평가단</span><span class="m_txt">외부평가단</span>', rowspan: 5, style:"text-align: center !important;", txt_verticle: true }, { html: "디자인 우수성", colspan: 2 }, "우수", "양호", "보통", "미흡", "불량"],
                            [{ html: "구매 의사", colspan: 2 }, "우수", "양호", "보통", "미흡", "불량"],
                            [{ html: "가격 경쟁력", colspan: 2 }, "우수", "양호", "보통", "미흡", "불량"],
                            [{ html: "기능성", colspan: 2 }, "우수", "양호", "보통", "미흡", "불량"],
                            [{ html: "시장 트렌드", colspan: 2 }, "우수", "양호", "보통", "미흡", "불량"],
                        ],
                    },
                    {
                        appendixTitle: "[별표3] 신상품 우선 선정 기준 (제7조 제2항 관련)",
                        tableClass: "appendix_new_product_priority",
                        cols: [
                            "평가내용",
                            { label: "세부 평가 기준", colspan: 2 },
                        ],
                        rows: [
                            [{ label: "중소기업", style: "text-align: center;" },
                             "제조사 또는 협력사가 중소기업 기본법에 의거한 중소기업에 해당하는 경우", "상품 MD는 사업자 등록증 확인 후, 한국신용정보평가를 통하여 해당 기업의 규모를 확인"],
                            [{ label: "소외계층", style: "text-align: center;" },
                             "장애인/노인 등 사회적 소외계층이 공급하는 상품 또는 소외계층을 대상으로 하는 상품", "상품 MD는 거래처를 통하여 관련 입증 서류를 수령, 상품 기획 및 전략 담당 부서에 제출"],
                            [ { label: "농축산수산 식품", style: "text-align: center;" },
                              "농축산어민이 최종 제조사 혹은 직접 공급하는 상품", "식품 관련 영업 부서에 한하여 적용, 상품 MD는 식품팀장 결재"],
                        ],
                    },
                ],
                cautionItems: [
                    "※ 각 항목당 5점 만점, 전체 평균 3점 이상시 가결",
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "제1조 (시행일)<br />① 이 기준은 2016. 5. 9. 제정, 시행한다.<br />② 이 기준은 2017. 1. 1. 개정, 시행한다.<br />③ 이 기준은 2018. 8. 2. 개정, 시행한다.<br />④ 이 기준은 2020. 12. 30. 개정, 시행한다.<br />⑤ 이 기준은 2021. 11. 15. 개정, 시행한다.<br />⑥ 이 기준은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 10.무형상품 선정 기준과 절차
        FairTradeHomeShoppingIntangibleProductSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「상품선정 및 방송편성 기준과 절차」에서 정한 사항 중 주식회사 지에스리테일(이하 ‘GS SHOP’)이 운영하는 TV홈쇼핑 및 데이터 홈쇼핑 방송(이하 통칭하여 ‘방송’)에서 소개 및 판매하는 무형상품을 선정하기 위한 세부적인 기준과 절차를 정한 것으로, GS SHOP이 객관적이고 공정하게 무형상품을 선정함으로써 소비자를 보호하고 나아가 방송의 공익적 책임을 다하고자 하는데 그 제정 목적이 있다.",
            },
            {
                no: "02",
                title: "정의 및 기본 원칙",
                items: [
                    { num: "1", title: "이 지침에서 사용하는 주요 용어의 정의는 다음 각 호와 같다.",
                        details: [
                            "1. “무형상품”이라 함은, 여행상품, 시공상품, 자동차 렌탈 등 일정한 형태가 없거나, 실물이 수반되더라도 이용 권리 또는 서비스 제공이 거래의 본질을 이루는 상품을 말한다.",
                            "2. “협력사”라 함은, 「대규모유통업에서의 거래 공정화에 관한 법률(이하 ‘대규모유통업법’)」 제2조 제2호의 ‘납품업자’ 중 GS SHOP과 거래기본계약(입점 계약)을 체결한 자를 말한다.",
                            "3. “소비자”라 함은, GS SHOP으로부터 무형상품을 구매하여 소비, 사용 또는 이용하는 자를 말한다."
                        ],
                    },
                    { num: "2", title: "GS SHOP 임직원은 이 지침 외에도 협력사와의 거래에 있어 「독점규제 및 공정거래에 관한 법률(이하 ‘공정거래법’)」, 대규모유통업법 등 공정거래 관련 법령 및 「방송법」에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com)의 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다." },
                ],
            },
            {
                no: "03",
                title: "적용 제외", 
                lead:"제2조 제1항 제1호에 따른 무형상품 중 GS SHOP이 협력사와 판매 대행 계약 체결 후 대리인(대리점)의 지위에서 판매하는 상품의 경우, 해당 협력사와 그 협력사의 상품이 법령에서 요구하는 제조 및 판매 관련 자격 요건을 모두 충족하면 별도로 이 지침을 적용하지 않기로 한다.",
            },
            {
                no: "04",
                title: "협력사 선정 절차 및 기준",
                items: [
                    { num: "1", title: "GS SHOP은 특정 업체가 신규 입점을 요청하는 경우 GS SHOP 내부의 사전 RISK 검토 Committee(이하 ‘Risk 검토 커미티’)의 검토를 거쳐 해당 업체의 협력사 자격 구비 여부 등을 평가한 후 협력사를 선정한다." },
                    { num: "2", title: "입점을 제안한 업체는 온라인을 통해 입점 제안된 내역에 대한 진행 현황 및 입점 불가 판정을 받은 제안 내역에 대해서 확인 할 수 있다." },
                    { num: "3", title: "GS SHOP은 협력사 선정 시 다음 각 호의 요소를 고려하여 선정한다. 이 때 제1호에 대한 세부 기준은 별표 1에 따른다.",
                      details:[
                          "1. 업체의 신용등급",
                          "2. 업체의 무형상품 관련 법령에 따른 인·허가 보유 여부",
                          "3. 여행상품의 경우 관광진흥법에 따른 보증보험 가입 여부",
                          "4. 기타 무형상품 관련 법령에 따른 보증보험 가입 여부",
                          "5. 업체가 제안한 무형상품의 소비자 보호 장치 구비 여부",
                      ]
                    },
                    { num: "4", title: "GS SHOP은 협력사 선정 시 다음 각 호의 사유 중 어느 하나에 해당하는 업체에 대해서는 협력사 선정 대상에서 배제하거나 보증보험 증액 등을 통해 보완토록 요청할 수 있다.",
                      details:[
                          "1. 업체가 자발적으로 제공한 재무제표 등 경영 관련 자료나, 신용평가 등 객관적으로 입수 가능한 외부 정보를 종합적으로 검토하여 업체의 폐업 또는 부도 위험이 매우 크다고 판단되는 경우",
                          "2. 업체가 GS SHOP과 고객에 대한 무형상품 공급 계약의 이행 담보 수단을 적절히 제공 및 유지하지 못하는 경우",
                          "3. 업체가 무형상품 A/S 약정의 이행 능력이 부족하다고 판단될 경우",
                          "4. 업체의 무형상품이 「상품소개 및 판매방송 심의에 관한 규정」 제64조(방송금지)에 해당하는 등 기타 심의에 위반될 여지가 있거나, 특허법, 상표법 등 지식재산권 관련 법령 등에 저촉되는 등의 사유로 문제될 여지가 있는 상품이라고 판단하는 경우 등"
                      ]
                    }
                ],
            },
            {
                no: "05",
                title: "무형상품 선정 절차 및 기준",
                items: [
                    { num: "1", title: "GS SHOP은 협력사가 제안한 무형상품에 대해 Risk 검토 커미티의 검토 를 거쳐 해당 무형상품의 적격성 여부 등을 평가한 후 상품을 선정하며, 이 때 GS SHOP은 업체의 신규 입점 시 협력사 선정 절차와 동시에 해당 업체의 무형상품을 함께 평가·선정할 수 있다. 단, 신규 입점 이후에는 해당 협력사의 신용등급, 소비자 보호 장치 구비 등 제4조 제3항 및 제4항 각 호의 요건에 변경 사항이 없으면 Risk 검토 커미티의 별도 평가 없이 관련 무형상품 사업부의 판단에 따라 운영한다." },
                    { num: "2", title: "Risk 검토 커미티에서 검토된 무형상품이라 하더라도 이후 소비자에게 제공되는 용역 서비스 범위가 변경될 경우 재검토를 받아야 한다."},
                    { num: "3", title: "Risk 검토 커미티에서 평가된 무형상품에 대해서는 품질·안전 담당부서와심의 담당부서를 통해 상품군별 정해진 기준에 의거한 품질 검사와 방송 심의 절차를 거쳐야 한다."},
                    { num: "4", title: "GS SHOP은 무형상품 선정 시 다음 각 호의 요소를 고려하여 평가한다.",
                        details:[
                          "1. 상품의 가격 및 구성",
                          "2. 상품의 차별성",
                          "3. 상품의 경쟁력",
                          "4. 안정적인 서비스 제공 가능 여부 (예 : 무형상품의 판매 업체와 제조 업체가 다른 경우 양 업체 간의 계약 관계 확인 등)",
                          "5. 소비자 보호 장치 구비 여부 (예 : 청약철회 기간, 고지 방법 등)"
                        ]
                    },
                ],
            },
            {
                no: "06",
                title: "Risk 검토 커미티의 구성",
                items: [
                    { num: "1", title: "Risk 검토 커미티는 6명 내외의 평가위원으로 구성한다." },
                    { num: "2", title: "Risk 검토 커미티의 평가위원은 GS SHOP 상품 기획 및 전략 업무 담당자, 재경 업무 담당자, 법무 또는 컴플라이언스 업무 담당자, 소비자 보호 업무 담당자, 심의 담당자 등으로 구성되며 Risk 유형에 따라 달리 정할 수 있다." }
                ],
            },
            {
                no: "07",
                title: "Risk 검토 커미티의 개최, 운영 및 기능",
                items: [
                    { num: "1", title: "Risk 검토 커미티는 협력사의 제안사항을 신속하게 평가하기 위해 온라인 으로 운영한다." },
                    { num: "2", title: "Risk 검토 커미티의 운영은 소비자 보호 업무 담당 부서에서 주관하는 것으로 한다." },
                    { num: "3", title: "Risk 검토 커미티는 제5조의 절차 및 기준에 따라 공정하고 투명하게 무형상품 Risk를 검토·평가한다." },
                ],
            },
            {
                no: "08",
                title: "소비자 보호 기준",
                items: [
                    { num: "1", title: "GS SHOP과 협력사는 소비자에게 상품을 판매함에 있어 「소비자기본법(이하 ‘소비자기본법’)」, 「전자상거래 등에서의 소비자 보호에 관한 법률(이하 ‘전자상거래법’)」, 「방송심의에 관한 규정」, 「상품소개 및 판매방송 심의에 관한 규정」 등의 법령을 준수하여야 하며, 소비자의 권익 보호 및 증진을 위해 노력하여야 한다." },
                    { num: "2", title: "GS SHOP과 협력사는 서비스 제공 주체, 청약 철회 방법, 상품 보증보험 가입 여부 등 판매 상품에 대한 정확한 정보를 소비자에게 제공하여야 한다."},
                    { num: "3", title: "GS SHOP과 협력사는 소비자기본법 제19조에 따른 사업자의 책무를 성실히 이행하여야 한다."},
                    { num: "4", title: "GS SHOP은 협력사가 판매를 위탁한 바에 따라 상담 또는 소개 상품을 판매하는 경우 자신이 상품 판매의 당사자가 아니라는 사실을 전자상거래법에서 정하는 방법에 따라 소비자가 알기 쉽게 고지한다."},
                    { num: "5", title: "소비자가 GS SHOP을 통한 상품 구매, 이용 또는 환불 과정에서 피해를 입은 경우 GS SHOP은 전자상거래법 등 관련 법령에 따른 책임을 부담하여야 하며, 관련 법령에 따라 GS SHOP이 소비자에게 직접 배상 책임을 부담하는 경우 구체적인 피해 구제 방법 및 분쟁 해결 절차는 관련 법령 및 「소비자분쟁해결기준」에 따른다."},
                ],
            },
            {
                no: "09",
                title: "편성 절차",
                items: [
                    { num: "1", title: "GS SHOP은 공정하고 독립적인 방송편성을 위하여 편성 전문부서를 설치·운영하고, 상품선정 절차와는 분리·독립된 편성협의회를 통해 편성한다." },
                    { num: "2", title: "편성협의회는 편성 전문부서를 주관부서로 하고, 각 부서별 편성 전문 인력으로 구성하며, 방송 10일 전부터 15일 전까지의 기간 내에 공정하고 투명한 편성을 위해 협의한다."},
                    { num: "3", title: "편성협의회에서 편성이 확정되면, GS SHOP은 편성 결과를 협력사에 안내하고 상호 합의된 편성 결과에 대해 협력사와 서면 계약을 체결한다." },
                    { num: "4", title: "편성의 독립성을 보장하기 위하여, GS SHOP은 모든 편성을 오직 편성협의회를 통해 확정하며, 불가항력에 의하여 정상적인 방송이 어려운 사유로(송출사고 대응 등) 긴급한 편성이 필요한 경우 외에는 편성협의회의 절차를 생략할 수 없다."},
                ],
            },
            {
                no: "10",
                title: "편성 불가 사유",
                lead: "GS SHOP은 방송 환경 변화에 신속히 대응하고 고객이 만족하는 쇼핑 환경 제공을 위하여 다음 각 호의 사유에 해당하는 경우에는 편성의 일부 또는 전부를 변경 또는 취소할 수 있다. 다만, 이 경우 각 사유는 명백히 검증 및 확인되어야 하며, GS SHOP은 협력사에 미치는 불이익이 최소화 되도록 배려하여야 한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. 상품의 품질, 안전성 등의 문제" },
                    { num: "2", title: "2. 고객 고발 등 사회적 이슈"},
                    { num: "3", title: "3. 특허권/상표권 등 지식재산권 침해 또는 침해 예상"},
                    { num: "4", title: "4. 이전 방송의 주요 고객 클레임 미해결" },
                    { num: "5", title: "5. 협력사 사전 준비 미흡 등으로 인한 방송 불가"},
                    { num: "6", title: "6. 기타 이와 유사한 경우로서 원활한 방송 등이 심히 불가능하다고 판단하는 경우"},
                ],
            },
            {
                no: "11",
                title: "거래 중단 및 퇴점 기준",
                lead: "협력사와의 거래 중단 및 퇴점 기준은 GS SHOP의 「상품선정 및 방송편성 기준과 절차」 제7장(거래 중단 및 퇴점 기준)에서 정한 내용을 따른다."
            },
            {
                no: "12",
                title: "기타 불공정거래행위 금지",
                lead: "GS SHOP은 무형상품 선정 업무를 처리함에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 협력사에 대해 거래상 지위를 남용하여 불이익을 주거나 그 밖에 불공정한 거래 조건을 강요하는 행위를 하여서는 아니 된다."
            },
            {
                no: "13",
                title: "신고, 불만 접수 및 처리",
                lead: "협력사는 GS SHOP이 협력사와 무형상품 관련 거래 조건을 협의, 결정하는 과정에서 이 지침을 위반하거나 기타 거래 조건의 결정과 관련하여 GS SHOP에 불만이 발생한 경우 GS SHOP에 위반 사항을 신고하거나 불만을 접수할 수 있고, 이 경우 GS SHOP은 별도 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 처리하여야 한다.",
            },
            {
                no: "14",
                title: "제재",
                lead: "GS SHOP 임직원이 이 지침에서 규정한 사항을 위반한 사실이 확인된 경우 별도 기준인 「협력사와의 공정거래를 위한 기준과 절차」에 규정된 절차에 따라 해당 임직원에 대한 제재 절차를 진행하여야 한다.",
            },
            {
                no: "15",
                title: "별표",
                lead: "1. 협력사 신용평가등급 기준",
                commonTables: [
                    {
                        appendixTitle: "[별표1] 협력사 신용평가등급 기준 (제4조 제3항 제1호 관련)",
                        tableClass: "tbl_dual_grid",
                        cols: [
                            "구분",
                            "상품군(대분류)",
                            "신용등급",
                            "상품군(대분류)",
                            "신용등급",
                        ],
                        rows: [
                            [{ html: '<span class="p_txt">TV홈쇼핑<br class="p_br" />협력사</span><span class="m_txt">TV홈쇼핑협력사</span>', rowspan: 10, style:"text-align: center !important;", txt_verticle: true }, "디지털기기/핸드폰", "B", "스포츠/레저/자동차용품", "CCC"],
                            ["컴퓨터/게임기/소프트웨어", "B", "가구/인테리어", "CCC"],
                            ["대형가전", "B", "의류", "CCC"],
                            ["생활/소형가전", "B", "패션잡화", "CCC"],
                            ["생활건강용품", "B", "속옷", "CCC"],
                            ["건강식품", "B", "보석/시계/액세서리/장식", "CCC"],
                            ["일반식품", "B", "침구/커튼", "CCC"],
                            ["주방가전", "B", "출산/유아/아동", "CCC"],
                            ["주방용품", "B", "악기/취미/문화/애완", "CCC"],
                            ["화장품/미용기구/향수", "B", "여행/서비스/상품권", "CCC"],
                        ],
                    },
                ],
                cautionItems: [
                    "※ 신규 중소기업 협력사의 판로지원을 위해, 사업자 등록 후 3년 이내로 신용평가사의 신용평가등급을 받지 못한 경우 또는 상기 신용평가등급 기준에 미치지 못하는 경우에는 보증보험 한도 증액 등을 통해 신용등급을 대체할 수 있다.",
                ],
                
            },
            {
                no: "",
                title: "부칙",
                addendumText: "부칙<br />제1조 (시행일)<br />① 이 지침은 2019. 1. 1. 제정, 시행한다.<br />② 이 지침은 2020. 12. 30. 개정, 시행한다.<br />③ 이 지침은 2021. 11. 15. 개정, 시행한다.<br />④ 이 지침은 2025. 8. 1. 개정, 시행한다.",
            },
        ],
        // 11. 연계편성의 부당한 강요행위 금지 기준
        FairTradeHomeShoppingLinkedProgrammingSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 지침은 상위 기준인 「상품선정 및 방송편성 기준과 절차」에서 정한 사항 중 부당한 연계편성 강요행위 금지에 관한 세부적인 사항을 정함으로써 협력사가 주식회사 지에스리테일(이하 ‘GS SHOP’)로부터 방송 편성 등과 관련한 자율성과 공정한 기회를 보장받고, GS SHOP과 협력사가 지속적으로 협력하는 관계를 유지할 수 있도록 하기 위해 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP 임직원은 방송을 위해 협력사와 상담할 시 이 지침을 숙지하고 이행해야 한다."},
                    { num: "2", title: "GS SHOP 임직원은 이 지침 외에도 협력사와의 거래에 있어 「독점규제 및 공정거래에 관한 법률」, 「대규모유통업에서의 거래 공정화에 관한 법률」 등 공정거래 관련 법령(이하 통칭하여 ‘공정거래 관련 법령’이라 함) 및 「방송법」에 규정된 사항을 엄격히 준수하여야 한다." },
                    { num: "3", title: "이 지침은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." },
                    { num: "4", title: "이 지침은 공식 홈페이지(http://www.gsretail.com) 또는 GS SHOP 투명거래시스템(http://withgs.gsshop.com) 게시판 등을 통해 공지하고, 협력사의 GS SHOP 방송을 위한 개별 입점 상담 시에도 공개함을 원칙으로 한다." },
                    { num: "5", title: "GS SHOP은 협력사 교육을 통하여 이 지침을 지속적으로 고지하고 공유하기로 한다." },
                    { num: "6", title: "GS SHOP은 공정하고 투명한 원칙에 따라 방송 준비를 하여 판매방송을 하여야 한다." },
                ],
            },
            {
                no: "03",
                title: "용어의 정의", 
                items: [
                    { num: "1", title: "“협찬”이라 함은 방송프로그램의 제작에 관여하지 않는 자가 방송프로그램의 제작에 직·간접적으로 필요한 경비·물품·용역·인력 또는 장소 등을 제공하는 것을 말한다."},
                    { num: "2", title: "“연계편성”이라 함은 홈쇼핑 채널과 유사한 시간대의 타 채널 프로그램에 동일한 상품을 협찬하여 소개하도록 편성하는 것을 말한다." },
                    { num: "3", title: "“강요”란 거래 상대방의 행위의 이행 또는 비용의 지불 의사가 없음에도 불구하고, 우월적인 거래관계 등을 이용하여 거래 상대방의 의사에 반하는 업무처리 또는 의사결정을 이행하도록 강압하는 행위를 말한다." },
                ],
                
            },
            {
                no: "04",
                title: "연계편성 유무에 따른 편성의 결정·취소·변경 금지",
                items: [
                    { num: "1", title: "GS SHOP은 협력사의 연계편성을 조건으로 상품판매방송의 일자, 시각, 분량 및 제작비용을 불공정하게 결정·취소 또는 변경하는 행위를 하지 아니한다." },
                    { num: "2", title: "GS SHOP의 편성 책임자와 편성 담당자는 GS SHOP의 「상품선정 및 방송편성 기준과 절차」 제4조 (방송편성 및 운영 원칙)의 편성 원칙을 준수하고, 협력사 상품의 지상파 또는 종합편성 채널(이하 ‘종편’) 연계편성 유무에 따른 직·간접적 영향으로, 편성을 불공정하게 결정·취소 또는 변경하는 행위를 하지 아니한다." },
                ],
            },
            {
                no: "05",
                title: "협찬 및 연계편성의 기획·제작 강요 금지",
                items: [
                    { num: "1", title: "GS SHOP은 협력사에 대하여 다른 방송사업자등이나 외주제작사에게 협찬할 것을 요구하는 등 협력사로 하여금 상품에 관한 광고를 할 것을 강요하여서는 아니 된다." },
                    { num: "2", title: "GS SHOP의 상품기획자(MD)는 협력사 상품의 입점 또는 판매 여부를 결정하는 과정에서, 협력사가 지상파 또는 종합편성 채널의 프로그램 등에 협찬을 하고 있거나 할 계획이라는 점을 판단 기준으로 삼을 수 없으며, 그 심사 과정에서 협력사에게 상품의 협찬에 관한 현황이나 계획에 관한 정보를 요구하여서는 아니 된다."},
                ],
            },
            {
                no: "06",
                title: "연계편성 기획 및 준비 단계에서의 관여 금지",
                items: [
                    { num: "1", title: "협력사가 GS SHOP을 통한 상품판매방송을 진행함에 있어, 해당 상품의 광고를 목적으로 타 방송사를 통한 협찬, 연계편성(광고활동) 등을 진행할 경우 해당 행위는 협력사 고유의 판단과 집행의 영역이며, GS SHOP은 협력사의 연계편성과 관련된 전 과정에 일절 관여하지 아니한다." },
                    { num: "2", title: "협력사가 GS SHOP이 아닌 타 방송사를 통한 협찬, 연계편성(광고활동) 등의 진행은 GS SHOP의 상품판매방송 준비 및 진행에 있어 전혀 무관한 활동이므로 GS SHOP에 집행의견을 물을 수 없으며, GS SHOP도 협력사의 연계편성과 관련된 어떠한 의견이나 혜택을 제시하여서는 아니 된다. 해당 행위의 의사결정 및 집행책임은 협력사 고유의 의사결정 사항임을 분명히 한다. 또한 GS SHOP은 관련 행위에 관한 정보를 협력사에게 요구하지 않는다." }
                ],
            },
            {
                no: "07",
                title: "협찬 및 연계편성 제작비의 분담 금지",
                items: [
                    { num: "1", title: "협력사의 협찬 또는 광고행위는 GS SHOP의 상품판매방송에서 활용하는 판촉활동이 아님을 상호간에 확인한다." },
                    { num: "2", title: "GS SHOP은 상품판매방송에 소요되는 프로그램 제작관련 비용 일체를 부담하며, 협력사의 별도 요청에 따른 제작 사항은 「방송법」 및 공정거래 관련 법령에 의거하여 상호 협의하여 개별적으로 정한다. GS SHOP은 상품판매방송과 직접적인 관련이 없는 협력사의 타 방송사를 통한 협찬, 연계편성(광고활동) 등에 소요되는 비용을 일절 부담하지 않는다." },
                ],
            },
            {
                no: "08",
                title: "기타 불공정거래행위의 금지",
                lead: "GS SHOP은 협력사와의 거래에 있어 이 지침에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 이에 준하는 행위로서 협력사에게 불이익을 주거나 경쟁을 제한하는 불공정한 거래행위를 하여서는 아니 된다."
            },
            {
                no: "09",
                title: "신고, 불만 접수 및 처리",
                items: [
                    { num: "1", title: "협력사는 GS SHOP 임직원이 이 지침을 위반하거나 GS SHOP과의 거래 중 불공정한 처우 등으로 인해 불만이 발생한 경우, GS SHOP 웹사이트 또는 투명거래시스템에서 레드휘슬 등의 채널을 통해 위반 사항을 신고하거나 불만 사항을 접수할 수 있다." },
                    { num: "2", title: "GS SHOP은 제1항에 따라 접수된 신고 건에 대해 GS SHOP의 감사업무 담당부서, 법무 또는 컴플라이언스업무 담당부서 등(이하 ‘감사업무 담당부서 등’)의 실사 및 감사를 통해 사실 여부를 확인한 후 해당 협력사에 조사된 사실관계, 관련 임직원에 대한 제재 조치, 협력사 피해 구제책, 재발 방지 대책 등을 포함한 신고 처리 결과를 통보해야 한다."},
                    { num: "3", title: "GS SHOP은 본 조에 따라 협력사의 신고 업무를 처리하는 과정이나 그 이후에도 협력사 및 협력사 관계자의 정보와 인적 사항 등을 비밀 정보로 보호하고 협력사가 신고로 인해 부당하게 차별 대우를 받거나 거래 중단 등의 보복 조치가 발생하지 않도록 해야 한다." },
                    { num: "4", title: "GS SHOP은 협력사와의 거래 중 발생한 협력사의 민원과 불만을 해소할 수 있도록 최선을 다하고 재발 방지를 위해 노력해야 한다."},
                ],
            },
            {
                no: "10",
                title: "제재",
                items: [
                    { num: "1", title: "GS SHOP의 감사업무 담당부서 등은 협력사의 신고를 통해 또는 직권으로 GS SHOP 임직원이 이 지침, 공정거래 관련 법령, 윤리규범 실천지침, 기타 사규 등을 위반한 사실을 인지한 경우 즉시 해당 임직원의 위반 행위를 조사하여야 하고, 사실로 확인된 경우 윤리위원회에 보고하여야 하며 해당 위원회에서 해당 임직원에 대한 제재 여부 및 수준을 최종 결정한다." },
                    { num: "2", title: "GS SHOP 임직원의 위반 행위가 사기, 횡령, 배임, 뇌물수수, 부정청탁 및 금품수수 등에 해당하여 형사 책임을 부담하여야 하는 사안인 경우 GS SHOP은 객관적인 사실 관계의 조사 및 재발 방지 등을 위해 해당 임직원을 수사기관에 형사 고발 조치할 수 있다."},
                ],
            },
            {
                no: "11",
                title: "주관 및 소관부서",
                items: [
                    { num: "1", title: "이 지침의 주관부서는 방송사업지원업무 담당부서로 한다. 주관부서는 이 지침의 해석과 필요시 해당 사유에 관련된 팀 간의 업무 조정을 주관한다." },
                    { num: "2", title: "이 지침의 소관부서는 식품군 상품 영업 담당부서로 한다. 소관부서는 연관부서인 편성 담당부서, 영업 전략 담당부서, 상품 기획 및 전략 담당부서와 논의를 통하여 이 지침의 준수 여부 점검 및 제정된 기준의 관리업무를 소관한다."},
                ],
               
            },
            {
                no: "",
                title: "부칙",
                addendumText: "부칙<br />제1조 (시행일)<br />① 이 지침은 2021. 1. 1. 제정, 시행한다.<br />② 이 지침은 2021. 11. 15. 개정, 시행한다.<br />③ 이 지침은 2025. 8. 1. 개정, 시행한다.",
            },
        ], 
        //12. 불공정거래행위로 인한 협력사 피해 보상 기준
        FairTradeHomeShoppingDamageCompensationSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 ‘GS SHOP’)이 협력사와의 TV홈쇼핑 및 데이터홈쇼핑 방송(이하 통칭하여 ‘방송’)을 위한 거래 중에 「독점규제 및 공정거래에 관한 법률」, 「대규모유통업에서의 거래 공정화에 관한 법률」 등 공정거래 관련 법령(이하 통칭하여 ‘공정거래 관련 법령’)에서 정한 금지행위를 위반하여 협력사에 피해를 야기한 경우, 이에 대한 협력사 피해 보상 절차와 피해보상협의회(이하 ‘협의회’)의 구성 및 운영 등에 관한 세부사항을 정하기 위해 작성한 것이다.",
            },
            {
                no: "02",
                title: "기본 원칙",
                items: [
                    { num: "1", title: "GS SHOP은 협력사가 GS SHOP의 불공정거래행위로 인해 피해를 입은 경우 객관적이고 투명한 절차에 따라 협력사의 피해 보상을 위한 최선의 노력을 다하여야 한다."},
                    { num: "2", title: "이 기준은 GS SHOP을 통해 방송을 진행하는 협력사 및 해당 협력사와의 거래에 한하여 적용하기로 한다." }, 
                ],
            },
            {
                no: "03",
                title: "피해 보상 대상", 
                items: [
                    { num: "1", title: "이 기준에 따른 피해 보상 대상은 GS SHOP과의 거래 중 GS SHOP이 공정거래 관련 법령상 금지행위 조항을 위반하여 손해를 입은 협력사로 해당 피해 협력사가 GS SHOP의 불공정거래행위 신고 채널(레드휘슬 등)을 통해 피해 사실을 신고하고 보상을 신청한 경우를 대상으로 한다."},
                    { num: "2", title: "협의회는 협력사의 신고 사건이 공정거래 관련 법령의 위반 행위에 따른 것이 아님이 명백하거나, 협력사가 입은 손해와의 인과관계가 불분명하거나, 협력사에게 어떠한 손해가 발생한 것인지 특정하기가 불가능한 경우에는 협력사의 피해 보상 신청을 각하할 수 있다." },
                ],
                
            },
            {
                no: "04",
                title: "사건 조사",
                items: [
                    { num: "1", title: "협의회는 신고 채널을 통해 접수된 협력사의 신고 사건이 이 기준에 따른 피해 보상 대상에 해당되는 경우 사실 관계 확인을 위해 GS SHOP 임직원 및 해당 협력사를 대상으로 GS SHOP의 불공정거래행위, 그로 인한 협력사의 피해 규모 등에 대해 즉시 조사를 진행하여야 한다." },
                    { num: "2", title: "협의회는 객관적이고 투명한 조사를 위해 사내 감사 업무 담당 부서에게 제1항의 사실 관계 확인 업무를 위임할 수 있다." },
                    { num: "3", title: "협의회는 구체적인 법 위반 행위 여부를 판단하기 위하여 공정거래 관련 법령 외 관련 시행령, 고시, 지침 등을 참고할 수 있다." },
                ],
            },
            {
                no: "05",
                title: "전체회의",
                items: [
                    { num: "1", title: "감사 업무 담당 부서는 제4조에 따른 사건 조사가 완료되면 즉시 협의회에 조사 결과를 보고하여야 한다. 협의회는 조사 결과에 오류가 있거나 미흡하다고 판단되는 경우 재조사 또는 추가 조사를 요청할 수 있다." },
                    { num: "2", title: "협의회는 사건 조사가 완료되었다고 판단되면 전체회의를 소집하여 피해 협력사에 대한 보상안 등을 협의·의결한다."},
                    { num: "3", title: "전체회의의 소관 사항은 다음 각 호와 같다.",
                      details:[
                          "1. 피해 보상 신청 사건에 대한 보상안의 협의",
                          "2. 피해 보상 신청 사건에 대한 보상안의 의결",
                          "3. 피해 보상 신청 사건이 이 기준에 따른 피해 보상 대상이 아님이 명백한 경우의 각하 결정",
                      ]
                    },
                ],
            },
            {
                no: "06",
                title: "보상안 제시",
                items: [
                    { num: "1", title: "협의회는 전체회의에서 의결된 보상안은 그 의결이 있는 날로부터 14일 이내에 협력사에게 통지함을 원칙으로 한다." },
                    { num: "2", title: "제1항에 따른 보상안을 통지받은 협력사가 이를 수락하면 지체 없이 협력사와 구체적인 보상 계획, 절차 등을 협의한다." },
                    { num: "3", title: "제1항에 따른 보상안을 통지받은 협력사가 이를 거부하면 협의회는 1회에 한해 다시 전체회의를 개최하여 보상안을 재협의 및 재의결한다." }
                ],
            },
            {
                no: "07",
                title: "절차의 종료",
                lead: "협의회는 다음 각 호의 어느 하나에 해당되는 경우에는 피해 보상 절차를 종료한다.",
                usePlainList: true,
                items: [
                    { num: "1", title: "1. 피해 협력사가 협의회의 보상안을 수락한 경우" },
                    { num: "2", title: "2. 피해 협력사가 신고를 스스로 철회하거나 절차의 종료를 요청한 경우" },
                    { num: "3", title: "3. 피해 협력사가 제6조에 따른 협의회의 최종 보상안을 거부한 경우" },
                    { num: "4", title: "4. 피해 협력사가 GS SHOP 신고 채널을 통한 신고와는 별도로 관련 사건에 대해 공정거래위원회 등에 신고하거나, 공정거래조정원 등을 통한 조정을 신청하거나, 법원에 소를 제기하는 경우" },
                ],
            },
            {
                no: "08",
                title: "협의회의 구성",
                items: [
                    { num: "1", title: "협의회의 위원장은 공정거래 자율준수관리자로 지정한다. 위원장은 협의회의 대표자로서 업무를 총괄하며 회의를 주재한다." },
                    { num: "2", title: "본 협의회의 위원은 컴플라이언스, 법무, 감사, 대외협력 분야의 각 부서장, 공정거래 또는 윤리경영 실무 담당자 중 1인, 영업 또는 사업 전략 실무 담당자 중 1인으로 구성하되, 객관성과 공정성을 위해 필요에 따라 외부 법률전문가 1인을 참여시킬 수 있다." },
                    { num: "3", title: "외부 법률전문가는 제3장의 피해 보상 절차에 참여하여 협의회에 피해 사실의 위법성, 보상안의 타당성 등에 관한 의견을 제공한다." },
                    { num: "4", title: "위원장은 합리적인 의사결정을 위해 필요하다고 판단되는 경우 위원을 추가 또는 배제 할 수 있다." },
                ],
            },
            {
                no: "09",
                title: "협의회의 회의 진행 및 의결",
                lead: "전체회의는 위원장이 주재하며, 재적위원 과반수의 출석으로 개의하고, 출석위원 과반수의 찬성으로 의결한다."
            },
            {
                no: "10",
                title: "윤리위원회 회부",
                lead: "협의회는 협력사의 피해 보상 신청 사건과 관련하여 GS SHOP의 임직원이 제반 법령, 사내 기준 또는 윤리 규범 위반 등의 사실이 있는 것으로 확인된 경우 해당 사건 및 임직원을 윤리위원회에 회부한다."
            },
            {
                no: "11",
                title: "재발방지",
                items: [
                    { num: "1", title: "협의회는 협력사의 피해 보상 신청 사건과 관련하여 GS SHOP의 불공정거래행위가 확인된 경우 즉시 유관 부서에 재발 방지 및 이를 위한 구체적인 계획의 수립을 요청하여야 한다." },
                    { num: "2", title: "협의회로부터 제1항의 요청을 받은 유관 부서는 재발 방지 계획을 마련하여 협의회에 보고하여야 하고, 재발 방지 조치가 끝나는 즉시 그 결과를 보고하여야 한다."},
                ],
               
            },
            {
                no: "",
                title: "부칙",
                addendumText: "부칙<br />제1조 (시행일)<br />① 이 기준은 2016. 12. 26. 제정, 2017. 1. 1. 시행한다.<br />② 이 기준은 2020. 12. 30. 개정, 시행한다.<br />③ 이 기준은 2021. 11. 15. 개정, 시행한다.<br />④ 이 기준은 2022. 11. 30. 개정, 시행한다.<br />⑤ 이 기준은 2025. 8. 1. 개정, 시행한다.",
            },
        ],

        // 1. 파트너사 선정 및 운용기준
        FairTradePartnerStandardSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하“회사”라 함)과 동반자적 입장에서 파트너사(이하“파트너사”라 함) 선정 및 운용과정에 대한 투명성과 공정성을 제고하여 합리적이며 공정한 거래질서를 확립시키고, 소비자에게 안전한 상품을 제공하는 사회적 책임을 다함에 목적이 있다.",
            },
            {
                no: "02",
                title: "준수의무",
                items: [
                    { num: "1", title: "“회사”의 임직원은 “파트너사”와의 거래에 있어서 이 기준 이외에도 『독점규제 및 공정 거래에 관한 법률』과 『대규모유통업에서의 거래 공정화에 관한 법률(이하 ‘대규모유통업법’ 이라 함)』 등 관계 법령을 엄격히 준수하여야 한다." },
                    { num: "2", title: "이 기준은 “파트너사”가 상시 확인할 수 있도록 “회사” 홈페이지 등에 게시하고, 내부직원에 대해서는 정기적으로 교육하여 준수할 수 있도록 한다." },
                ],
            },
            {
                no: "03",
                title: "용어의 정의",
                definitions: [
                    { term: "1", desc: "“파트너사”란 “회사”와 상품 공급 거래 등의 대상업체로 예정되거나, 거래중인 사업자를 의미한다." },
                    { term: "2", desc: "“파트너사Pool”이란 “회사”가 정한 기준에 따라 마스터에 등록하여 관리·운용하는 “파트너사” 그룹을 의미한다." },
                    { term: "3", desc: "“파트너사 선정”은 “회사”의 “파트너사Pool”에 등록하는 것을 의미한다." },
                    { term: "4", desc: "“파트너사 운용”이란 “회사”가 “파트너사”로 선정 및 등록된 업체에 대한 거래 개시 부여, 등록 취소 등 “파트너사Pool”을 일정한 기준에 따라 관리하는 것을 의미한다." },
                ],
            },
            {
                no: "04",
                title: "파트너사 선정기준",
                lead: "“회사”는 “파트너사” 선정 시 거래 개시를 위한 선정 기준에 공정성을 기하여야 하며, 고객 및 제3자에 대한 신뢰 및 건전성을 확보하기 위해 아래의 사항을 기준으로 “파트너사”를 선정한다.",
                criteria: [
                    { term: "1. 전문성", details: ["가. 상품개발력", "나. 가격경쟁력", "다. 판촉능력", "라. 업력"] },
                    { term: "2. 공신력", details: ["가. 신용평가", "나. 현금흐름", "다. 담보능력", "라. 거래실적"] },
                    { term: "3. ESG 기준", details: ["가. 환경", "나. 안전보건", "다. 노동 및 인권", "라. 윤리규범", "마. 반부패/준법경영"] },
                    { term: "4. 기타 상품 특성에 따른 기준(위생, 인증, 배송능력 등)", desc: "" },
                ],
            },
            {
                no: "05",
                title: "파트너사 신청절차",
                lead: "“파트너사” 선정절차는 다음 각 호의 순서에 따라 공정하고 투명하게 진행한다.",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. “회사” 홈페이지(www.gsretail.com) 입점상담 페이지를 통해 입점신청서, 기업소개서, 상품제안서 등 서류를 첨부하여 상담 신청" },
                    { num: "2", title: "2. 상담 신청 접수일로부터 10 영업일 이내에 서류심사 결과 통보" },
                    { num: "3", title: "3. 서류심사 통과 시, 상담일정 협의하여 상담 진행" },
                    { num: "4", title: "4. 제출서류, 상담결과 등을 공정하게 정량 평가하여 최종 입점 여부 결정" },
                    { num: "5", title: "5. 입점이 결정된 “파트너사”에게 거래 약정 체결에 필요한 사항과 절차 및 일정 안내" },
                    { num: "6", title: "6. 상호 협의 하에 계약서를 작성" },
                ],
            },
            {
                no: "06",
                title: "거래개시",
                items: [
                    { num: "1", title: "“파트너사”와 공정한 거래를 개시하기 위해서는 거래 관련 제반사항에 대하여 상호 충분한 협의 후 물품공급계약서를 체결하여야 한다." },
                    { num: "2", title: "거래는 물품공급계약서에 기명 날인 또는 서명(전자서명 포함)하여 그 서면(전자문서 포함)을 “파트너사”에 준 때에 개시한다." },
                    { num: "3", title: "“회사”는 계약기간 도중에 거래조건을 변경하지 않는다." },
                    { num: "4", title: "“회사”는 구두발주를 하지 않는다." },
                ],
            },
            {
                no: "07",
                title: "불공정거래행위의 금지",
                items: [
                    {
                        num: "1",
                        title: "“회사”는“파트너사”와 거래 시 다음 각 호의 사항을 준수하며, 우월적인 지위를 이용하여 “파트너사”에게 불공정한 거래를 강요하지 않는다. <br />이 기준은 공정거래 관련 법령에 정한 사항에 따른다.",
                        details: [
                            "1. 서면계약 체결 의무",    
                            "2. 상품대금 감액금지",
                            "3. 상품판매대금 지급의무",
                            "4. 부당한 상품 수령 거부 및 수령 지체 금지",
                            "5. 부당한 상품 반품 금지",
                            "6. 판촉비용 등의 부당 강요 금지",
                            "7. 배타적 거래 강요금지",
                            "8. 경영정보 제공 요구 금지",
                            "9. 경영활동 간섭 금지",
                            "10. 부당한 경제상의 이익 수령 금지",
                            "11. 부당한 계약 변경 등 불이익 제공 금지",
                            "12. “파트너사”에게 특정 벤더를 지정하여 거래하도록 요구하는 행위 금지",
                            "13. “파트너사”에게 특정 벤더를 이용하지 않으면 불이익을 주는 행위 금지",
                        ],
                    },
                    { num: "2", title: "“회사”는 “파트너사”의 부득이한 사정을 제외하고는 직매입을 원칙으로 한다." },
                    { num: "3", title: "최저임금 인상, 원재료 가격 상승 등으로 납품하는 상품의 공급원가가 변동되어 납품가격 조정이 불가피한 경우에는 “파트너사”는 “회사”에 납품가격의 조정을 신청할 수 있다." },
                    { num: "4", title: "“파트너사”는 “회사”의 담당MD가 불공정한 거래를 요구할 경우에는 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보를 할 수 있다." },
                    { num: "5", title: "“파트너사”에게 부당하게 재고 부담을 전가하는 판매분 매입 거래는 원칙적으로 금지된다. 다만, 상품의 특성, “파트너사”의 필요 등을 고려하여 “파트너사”에게 부당하게 재고부담을 전가하기 위한 목적이 아니라고 인정되는 경우에는 예외적으로 인정될 수 있다." },
                ],
            },
            {
                no: "08",
                title: "이해관계자 거래 배제",
                items: [
                    { num: "1", title: "“파트너사” 임직원 등이 “회사” 임직원의 친인척 등 이해관계자인 경우 “회사”는 관련 임직원이 해당 “파트너사”의 상품 선정 및 거래조건 협상 절차 등에 직·간접적으로 관여하지 않도록 배제한다." },
                    {
                        num: "2",
                        title: "제1항의 이해관계자의 기준은 아래와 같다.",
                        details: [
                            {
                                text: "1. 민법 제777조에 따른 다음 각 목의 친족",
                                children: [
                                    "가. 8촌 이내의 혈족",
                                    "나. 4촌 이내의 인척(인척의 범위는 민법 제769조에 따름)",
                                    "다. 배우자",
                                ],
                            },
                            "2. “회사”에 근무이력이 있는 임직원 등 기존 퇴사자",
                            "3. GS그룹 계열사 관계자",
                        ],
                    },
                    { num: "3", title: "“제1항에도 불구하고 “파트너사”와 이해 관계가 있는 임직원이 거래 단계에 관여를 하였을 경우 해당 거래는 공정한 절차에 따라 재검토하는 것으로 한다." },
                ],
            },
            {
                no: "09",
                title: "거래 종료",
                items: [
                    {
                        num: "1",
                        title: "“회사”와 “파트너사”는 다음 각 호의 어느 하나에 해당하는 경우 물품공급 계약을 중단 혹은 종료할 수 있다.",
                        details: [
                            "1. 양 당사자의 서면상 합의가 있는 경우",
                            "2. “회사” 또는 “파트너사”가 발행한 어음·수표가 지급 거절되거나, “회사” 또는 “파트너사” 자신에 의한 회생·파산 절차의 신청이 있거나, 채권자의 신청에 의해 동 절차가 개시된 경우",
                            "3. 기업구조조정촉진법상 부실징후기업으로 판단되어 이에 관한 절차가 개시된 경우",
                            "4. “회사” 또는 “파트너사”의 주요 재산(이 계약에 따라 “파트너사”가 “회사”에 대하여 가지는 납품대금 청구 채권을 포함한다)에 대하여 강제경매 등이 실행되어 더 이상의 이 계약 이행이 곤란하게 된 경우",
                            "5. 관계기관에 의하여 영업정지, 영업허가취소 등의 처분을 받은 경우",
                            "6. “파트너사”가 납품한 상품이 관계법령에 저촉되거나, “파트너사”가 라이선스권자와 체결한 라이선스계약이 종료되어 해당 상품의 납품 또는 판매가 불가능하게 된 경우",
                            "7. 물품공급계약에 명시된 브랜드나 거래 품목의 생산이 중단 또는 종료된 경우",
                            {
                                text: "8. 기타 다음 각 목의 예와 같이 원활한 계약이행을 현저히 저해하는 사유가 발생한 경우",
                                children: [
                                    "가. 공급상품의 생산이 장기간 중단되거나 종료된 경우",
                                    "나. 원산지 표기 오류인 경우",
                                    "다. “파트너사”의 관리소홀로 인한 품질 불량이 3회 이상 적발이 될 경우",
                                    "라. 상품의 판매실적이 현저히 저조한 경우",
                                    "마. “회사” 또는 “파트너사”가 물품공급계약의 중요한 사항을 위반하여 상대방이 14일 이상의 기간을 정하여 시정을 요구하였으나 시정이 이루어지지 않은 경우",
                                    "바. 기타 물품공급계약서 기재된 계약의 해지 및 해제의 사유에 해당할 경우",
                                ],
                            },
                        ],
                    },
                    { num: "2", title: "제1항에 의하여 거래가 중지 또는 종료가 되었다 하더라도 “파트너사”로부터 공급받는 물품에 대해서는 반품을 하여서는 안 된다. 단, 법령에서 허용하는 반품 사유에 해당하는 경우에는 예외로 한다." },
                ],
            },
            {
                no: "10",
                title: "거래 종료 절차",
                items: [
                    { num: "1", title: "“회사”가 “파트너사”와의 거래를 종료할 경우에는 서면으로 종료에 대한 명확한 사유를 기재하여 전달하여야 하며, 계약기간 만료로 인한 거래종료의 경우 계약기간 만료일로부터 30일 전까지 계약갱신 거절사유를 구체적으로 적시하여 서면으로 통지하여야 한다." },
                    { num: "2", title: "“회사”는 “파트너사”의 귀책 사유로 인하여 거래를 종료할 경우에는 “파트너사”가 소명할 수 있는 기회를 주어야 한다." },
                    { num: "3", title: "“회사”와 “파트너사”는 거래 종료에 따른 대금 정산 등의 절차를 성실히 이행한다." },
                ],
            },
            {
                no: "11",
                title: "불공정행위 접수 및 처리",
                items: [
                    { num: "1", title: "“파트너사”는 “회사”의 임직원이 이 기준을 위반하여 불공정한 처우에 따른 불이익을 받았을 경우 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보할 수 있으며, “회사”는 제보 내용을 규정된 절차에 따라 처리하여야 한다." },
                    { num: "2", title: "“회사”는 “파트너사”의 제보 업무를 처리하는 과정에서 “파트너사”관련 정보와 인적사항 등을 보호하며, 제보로 인하여 부당하게 차별 대우를 받거나 거래 중단 등의 행위가 발생되지 않도록 해야 한다." },
                    { num: "3", title: "“회사”는 “파트너사”와 거래 중 발생한 제반 민원사항에 대한 재발방지를 위하여 최선을 다한다." },
                ],
            },
            {
                no: "12",
                title: "제재",
                items: [
                    { num: "1", title: "“회사”의 임직원은 업무를 수행함에 있어 이 기준을 준수하여야 하며, 당사자의 고의 또는 중대한 과실로 이 기준을 위반한 사실이 확인된 경우에는 “회사”의 윤리 규범 등에 따라 제재조치를 진행하여야 한다." },
                    { num: "2", title: "“회사”의 임직원이 사기, 횡령, 배임, 금전 수수, 부정 청탁 등에 해당할 경우 “회사”는 해당 임직원을 형사고발할 수 있다." },
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />이 기준은 2018.04. 01. 제정·시행한다.<br /><br />부칙(2024.06.11.)<br />이 기준은 2024.06.11. 개정·시행한다.",
            },
        ],
        // 2. 판매장려금 결정, 변경에 대한 기준
        FairTradeSalesIncentiveSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 “회사”라 한다)과 파트너사 등(이하 “파트너사”라 한다) 간에 거래관계에 있어 판매장려금의 합리적 인정범위에 대한 판단 기준을 명확히 함으로서 불공정한 행위를 예방하고, 관련법령을 준수하여 “파트너사”와 공정한 거래관계를 확립하고자 함을 목적으로 한다.",
            },
            {
                no: "02",
                title: "준수의무",
                items: [
                    { num: "1", title: "“회사”의 임직원은 “파트너사”와의 거래에 있어서 이 기준 이외에도 『대규모유통업에서의 거래공정화에 관한 법률(이하 ‘대규모유통업법’이라 함)』과 『대규모유통업 분야에서 판매장려금의 부당성 심사에 관한 지침』 등 관계 법령을 엄격히 준수하여야 한다." },
                    { num: "2", title: "이 기준은 “파트너사”가 상시 확인할 수 있도록 “회사” 홈페이지 등에 게시하고, 내부직원에 대해서는 정기적으로 교육하여 준수할 수 있도록 한다." },
                ],
            },
            {
                no: "03",
                title: "기본원칙",
                items: [
                    { num: "1", title: "판매장려금은 “파트너사”가 “회사”에게 판매장려금을 지급하여 상품에 대한 소비자 수요를 늘려 판매를 증진시킴으로써, 판매성과에 대한 이익을 공유하는 것을 원칙으로 한다." },
                    { num: "2", title: "판매장려금의 약정은 “회사”와 “파트너사” 모두의 이익에 기여하여야 하며 판매장려금 지급 대상 기간 중 “회사”가 받은 판매장려금액과 해당 기간 중 “파트너사”의 납품액 증가로 인한 이익 간에는 합리적인 비례관계가 있어야 한다." },
                ],
            },
            {
                no: "04",
                title: "용어의 정의",
                definitions: [
                    { term: "1", desc: "“판매장려금”이란 직매입거래에서 상품의 판매촉진을 위하여 연간거래 물품공급계약에 명시된 조건에 따라 “파트너사”가 “회사”에 지급하는 경제적 이익을 의미한다." },
                    { term: "2", desc: "“성과장려금”이란 “회사”와 “파트너사”가 합의하여 전년동기 대비 납품액(납품단가*납품물량) 신장목표를 달성하였을 때, “회사”가 “파트너사”로부터 지급받는 형태의 판매장려금을 의미한다." },
                    { term: "3", desc: "“신상품장려금”이란 “회사”가 “파트너사”의 신상품을 매장에 진열해 주는 대가로 “파트너사”로부터 받는 형태의 판매장려금을 의미한다. 이 때 신상품인지의 여부는 업계의 거래관행 등을 고려하여 출시 후 6개월 이내의 상품을 원칙으로 하며, 실질적으로 기존 상품과 상품코드가 바뀐 것에 불과한 리뉴얼 상품은 신상품에 해당되지 않는다." },
                    { term: "4", desc: "“진열장려금”이란 “회사”가 “파트너사”의 상품을 매출증가 가능성이 큰 매대에 진열해주는 서비스에 대한 대가로 “파트너사”로부터 받는 형태의 판매장려금을 의미한다." },
                ],
            },
            {
                no: "05",
                title: "허용되지 않는 판매장려금",
                lead: "직매입거래에서 “회사”는 “파트너사”로부터 납품받은 상품에 대한 소유권을 취득하며, 상품판매에 대한 권한을 가짐과 동시에 판매부진에 따른 재고책임을 부담하므로 다음과 같은 유형의 장려금은 장려금으로 허용하지 않는다.",
                items: [
                    { num: "1", title: "1. “기본장려금”이란 “회사”가 “파트너사”로부터 “파트너사”의 매출증가여부와 상관없이 상품매입금액의 일정비율 또는 일정금액을 받는 형태의 장려금을 의미한다." },
                    { num: "2", title: "2. “무반품장려금”이란 “회사”가 직매입한 상품을 반품하지 않는 것을 조건으로 “파트너사”로부터 수취하는 장려금을 의미한다." },
                    { num: "3", title: "3. “시장판매가격 대응장려금”이란 “회사”가 “파트너사”로부터 기 납품받은 상품의 판매가격을 인하하기 위한 목적으로 받는 형태의 장려금을 의미한다." },
                    { num: "4", title: "4. “재고소진 장려금”이란 “회사”가 직매입한 상품의 재고를 소진시킬 목적으로 재고분의 일정 비율에 해당하는 금액을 “파트너사”로부터 받는 형태의 장려금을 의미한다." },
                    { num: "5", title: "5. “폐점장려금”이란 “회사”가 점포 폐점 시 덤핑, 가격할인 등을 통해 남아 있는 상품을 소진하는 과정에서 발생하는 비용을 보전하기 위해 “파트너사”로부터 받는 형태의 장려금을 의미한다." },
                ],
            },
            {
                no: "06",
                title: "판매장려금의 결정 및 변경",
                items: [
                    { num: "1", title: "“회사”는 상품의 판매촉진을 위하여 “파트너사”와 공정하게 체결한 물품공급계약에 따라 “파트너사”로부터 판매장려금을 수령할 수 있다." },
                    { num: "2", title: "판매장려금은 지급목적에 부합하는 기준에 따라 “회사”와 “파트너사”가 협의를 통하여 물품공급계약 및 개별약정서식에 의해 결정한다." },
                    { num: "3", title: "예측하지 못한 매출액의 급격한 증감 및 시장상황의 변동 등의 사유로 “파트너사”의 요청 또는 “회사”와 “파트너사” 간의 합의가 있을 경우 물품공급계약의 판매장려금 항목을 변경 또는 폐지하거나, 기존 판매장려금의 지급조건을 변경할 수 있다. 이 경우 제2항의 결정 절차와 동일한 방식으로 변경한다." },
                ],
            },
            {
                no: "07",
                title: "판매장려금의 절차적 요건",
                items: [
                    {
                        num: "1",
                        title: "“회사”는 “파트너사”로부터 판매장려금을 수령하는 경우 다음 각 호의 약정사항을 계약 체결 이전에 서면으로 제공하여 사전에 충분히 협의한다.",
                        details: [
                            "1. 판매장려금의 종류 및 명칭",    
                            "2. 판매장려금의 지급목적, 지급시기 및 지급횟수",
                            "3. 판매장려금의 비율 또는 액수",
                            "4. 판매장려금의 결정기준 및 결정절차",
                            "5. 판매장려금의 변경사유, 변경기준 및 변경절차",
                        ],
                    },
                    { num: "2", title: "“회사”와 “파트너사”는 강요에 의한 것이 아닌 자유로운 의사합치에 의해 판매장려금에 관한 약정을 체결한다." },
                    { num: "3", title: "“회사”와 “파트너사”는 판매장려금 약정사항을 연간거래 기본계약 내용에 포함시키고 해당 계약 서면을 날인 후 즉시 교부한다." },
                ],
            },
            {
                no: "08",
                title: "금지행위",
                items: [
                    { num: "1", title: "“회사”가 연간거래 물품공급계약시 약정되지 아니하거나 약정된 범위를 초과하여 판매장려금을 “파트너사”로부터 받는 행위" },
                    { num: "2", title: "“회사”가 판매장려금의 종류 및 명칭, 판매장려금의 지급목적, 지급시기 및 지급횟수, 판매장려금의 비율 또는 액수 등을 구체적으로 기재함이 없이 추후에 개별적으로 판매장려금 약정을 체결할 수 있다고 포괄적으로 규정한 후 수시로 판매장려금을 수취하는 행위" },
                    { num: "3", title: "“회사”가 계약기간 도중 판매장려금률 또는 액수를 “파트너사”의 의사와 무관하게 일방적으로 인상하는 행위" },
                    { num: "4", title: "“회사”가 연간거래 기본계약 체결 시 판매장려금 항목과 비율을 협의 절차없이 일방적으로 정하여 통보하고 판매장려금을 수취하는 행위" },
                    { num: "5", title: "“회사”가 진열장려금과 관련하여 “파트너사”의 해당 상품이 진열될 위치 및 기간, 위치 별 판매장려금률 또는 금액 등 판매장려금 결정 및 변경 기준을 사전에 명확히 구체적으로 규정함이 없이 자신이 정한 규정에 따라 일방적으로 판매장려금을 수취하는 행위" },
                    { num: "6", title: "“회사”의 제안내용을 “파트너사”가 수용하지 않을 경우 거래중단 등 불이익을 받을 수 있음을 직간접적으로 암시하는 등 “파트너사”의 자율적인 의사가 제한된 상태에서 판매장려금 약정을 체결하는 경우" },
                ],
            },
            {
                no: "09",
                title: "불공정행위 접수 및 처리",
                items: [
                    { num: "1", title: "“파트너사”는 “회사”의 임직원이 이 기준을 위반하여 불공정한 처우에 따른 불이익을 받았을 경우 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보할 수 있으며, “회사”는 제보 내용을 규정된 절차에 따라 처리하여야 한다." },
                    { num: "2", title: "“회사”는 “파트너사”의 제보 업무를 처리하는 과정에서 “파트너사”관련 정보와 인적사항 등을 보호하며, 제보로 인하여 부당하게 차별 대우를 받거나 거래 중단 등의 행위가 발생되지 않도록 해야 한다." },
                    { num: "3", title: "“회사”는 “파트너사”와 거래 중 발생한 제반 민원 사항에 대한 재발방지를 위하여 최선을 다한다." },
                ],
            },
            {
                no: "10",
                title: "제재",
                items: [
                    { num: "1", title: "“회사”의 임직원은 업무를 수행함에 있어 이 기준을 준수하여야 하며, 당사자의 고의 또는 중대한 과실로 이 기준을 위반한 사실이 확인된 경우에는 “회사”의 윤리 규범 등에 따라 제재조치를 진행하여야 한다." },
                    { num: "2", title: "“회사”의 임직원이 사기, 횡령, 배임, 금전수수, 부정청탁 등에 해당할 경우 “회사”는 해당 임직원을 형사고발할 수 있다." },
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />이 기준은 2018.04. 01. 제정·시행한다.<br /><br />부칙(2024.06.11.)<br />이 기준은 2024.06.11. 개정·시행한다.",
            },
        ],
        // 3. 판매촉진행사 진행 및 비용분담 기준
        FairTradePromotionCostSharingSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 “회사”라 한다)과 동반자적 입장에서 파트너사(이하 “파트너사”라 한다)와 판매촉진행사를 진행함에 있어 발생할 수 있는 부당한 행위를 예방하고, 관련 법령을 준수하여 “파트너사”와 공정한 거래 관계를 확립하고자 함을 목적으로 한다.",
            },
            {
                no: "02",
                title: "준수의무",
                items: [
                    { num: "1", title: "“회사”의 임직원은 “파트너사”와의 거래에 있어서 이 기준 이외에도 『독점규제 및 공정거래에 관한 법률』(이하 ‘공정거래법‘이라 함)과 『대규모유통업에서의 거래 공정화에 관한 법률(이하 ‘대규모유통업법’이라 함)』 등 관계 법령을 엄격히 준수하여야 한다." },
                    { num: "2", title: "이 기준은 “파트너사”가 상시 확인할 수 있도록 “회사” 홈페이지 등에 게시하고, 내부직원에 대해서는 정기적으로 교육하여 준수할 수 있도록 한다." },
                ],
            },
            {
                no: "03",
                title: "용어의 정의",
                definitions: [
                    { term: "1", desc: "“판매촉진행사”란 상품에 대한 수요를 늘려 판매를 증진시킬 목적으로 행하는 행사 또는 활동을 의미하며, 세부목적은 다음 각 호와 같다.", details: ["1. 신상품/신규입점상품의 홍보 및 매출확대", "2. 경쟁사의 경쟁상품과 차별화된 추가 혜택 제공을 통한 매출 확대", "3. 관련 상품군 내 해당기간 판촉활동을 통한 매출증대 및 MS(점유율) 확대"] },
                    { term: "2", desc: "“합의서”란 “회사”와 “파트너사”가 합의된 내용을 문서화한 것을 의미한다" },
                    { term: "3", desc: "“판촉부담비율”이란 “회사”와 “파트너사”가 판촉행사에 필요한 비용의 부담 비율을 의미한다." },
                ],
            },
            {
                no: "04",
                title: "판매촉진행사 진행요건",
                items: [
                    { num: "1", title: "판매촉진행사를 진행하고자 할 경우 “회사”는 행사 진행 전 “파트너사”로부터 제안서를 수취하여야 한다." },
                    { num: "2", title: "양 당사자는 판매촉진행사를 하기 위해서 행사시작 최소 15일 이전에 협의를 완료한다." },
                    { num: "3", title: "양 당사자는 판매촉진행사 계획 수립 시 컨셉, 카테고리, 기간, 방법 등을 충분히 협의하여 진행하며, 일방이 정당한 사유 없이 협의에 의해 결정된 판매촉진행사 등의 거래조건을 변경하여서는 안된다." },
                ],
            },
            {
                no: "05",
                title: "판매촉진행사 진행 절차",
                items: [
                    {
                        num: "1",
                        title: "양 당사자는 판매촉진행사 진행 전 다음 각 호의 사항을 기재한 서면에 기명날인 또는 서명하여 약정하고, 기명날인 또는 서명 즉시 그 서면을 각 1부씩 교부한다.",
                        details: [
                            "1. 판매촉진행사명, 성격, 기간",
                            "2. 판매촉진행사를 통하여 판매할 상품의 품목",
                            "3. 판매촉진행사에 소요될 것으로 예상되는 비용의 규모 및 사용내역",
                            "4. 해당 판매촉진행사를 통하여 “회사”와 “파트너사”가 직접적으로 얻을 것으로 예상되는 경제적 이익의 비율",
                            "5. 판매촉진행사에 소요되는 모든 비용의 분담비율 또는 액수",
                        ],
                    },
                    { num: "2", title: "판매촉진행사 진행 여부나 상호 비용 분담 비율 등에 대해서는 상호 이익이 될 수 있도록 “파트너사”와 충분한 협의를 거쳐 합리적으로 산정하여야 하며, 부당하게 일방에 의해 결정되거나 정당한 사유 없이 결정된 판매촉진행사 조건을 변경해서는 아니 된다." },
                    { num: "3", title: "“회사”는 판매촉진행사관련 제반 서류를 “파트너사”와 거래 종결 후 5년간 보존하여야 한다." },
                ],
            },
            {
                no: "06",
                title: "판매촉진행사 계약이행절차",
                items: [
                    { num: "1", title: "판매촉진행사 합의 후 “회사”의 담당MD는 판매촉진행사가 합의된 내용으로 진행이 되고 있는지 확인할 의무가 있다." },
                    { num: "2", title: "판매촉진행사가 합의된 내용대로 이행이 되지 않을 경우 “파트너사”에 통지하여야 하며, “파트너사”에 손해가 가지 않도록 적절한 조치를 취하고, “파트너사”에 손해가 발생할 경우 관련 법 규정에 따라 손해를 배상할 수 있다." },
                    { num: "3", title: "“회사”는 “파트너사”와 사전에 합의되지 않거나 계약서에 기재되지 않은 명목의 판매촉진행사 비용이나 경제적인 불이익을 “파트너사”에 전가할 수 없다." },
                ],
            },
            {
                no: "07",
                title: "비용 분담",
                items: [
                    { num: "1", title: "“회사”와 “파트너사”는 판매촉진행사를 통한 직접적으로 얻을 것으로 예상되는 경제적 이익의 비율에 따라 판매촉진비용의 분담비율을 정한다." },
                    { num: "2", title: "“회사”와 “파트너사”가 예상되는 경제적 이익을 산정할 수 없는 경우에는 양당사자의 예상이익이 동일한 것으로 추정한다." },
                    { num: "3", title: "“파트너사”의 판매촉진비용 분담비율은 50%를 초과할 수 없다. 다만, “파트너사”의 자발적 요청에 의해 다른 “파트너사”와 차별화되는 판매촉진행사를 진행할 경우 상호 협의하여 분담비율을 정할 수 있다." },
                    { num: "4", title: "“회사”가 행사 기간, 주제, 홍보, 고객지원방안 등 판촉 행사를 기획하더라도, 참여업체를 공개모집하고 “파트너사”가 자율적으로 참여 여부를 결정하여 자기 상품의 할인 품목, 할인 폭을 스스로 결정하는 경우에는 제3항 단서의 요건을 충족한 것으로 본다." },
                    { num: "5", title: "판매촉진비용은 판매촉진행사가 종료된 월의 판매마감일 익월 매입대금 지급일에 정산하며, “회사”가 “파트너사”에 지급하는 매입대금에서 “파트너사”가 부담하는 판매촉진비용을 공제하는 정산방식을 원칙으로 한다. 이 경우 “회사”는 공제 내역을 “파트너사”에게 지급 전일까지 서면으로 통지한다." },
                ],
            },
            {
                no: "08",
                title: "불공정거래행위 등의 금지",
                items: [
                    {
                        num: "1",
                        title: "“회사”는 판매촉진비용과 관련하여 다음 각 호의 행위를 하지 않는다.",
                        details: [
                            "1. 서면 약정을 체결하지 않고 판매촉진행사를 진행하는 행위",
                            "2. 사전 약정 없이 판매촉진비용을 “파트너사”에게 전가하는 행위",
                            "3. 분담비율에 대한 약정없이 판매촉진비용을 “파트너사”에게 부담시키는 행위",
                        ],
                    },
                    { num: "2", title: "“회사”는 “파트너사”와 판매촉진행사를 협의 진행함에 있어 이 규정에 의무 또는 금지 사항으로 명시되어 있지 아니하더라도 “파트너사”에 대해 거래상 지위를 남용하여 불이익을 주거나, 그 밖에 불공정한 거래 조건을 강요하는 행위 및 정당한 사유 없이 “파트너사”의 의사에 반하여 판매촉진행사에 참여하게 하여서는 아니 된다." },
                ],
            },
            {
                no: "09",
                title: "불공정행위 접수 및 처리",
                items: [
                    { num: "1", title: "“파트너사”는 “회사”의 임직원이 이 기준을 위반하여 불공정한 처우에 따른 불이익을 받았을 경우 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보할 수 있으며, “회사”는 제보 내용을 규정된 절차에 따라 처리하여야 한다." },
                    { num: "2", title: "“회사”는 “파트너사”의 제보 업무를 처리하는 과정에서 “파트너사”관련 정보와 인적사항 등을 보호하며, 제보로 인하여 부당하게 차별 대우를 받거나 거래 중단 등의 행위가 발생되지 않도록 해야 한다." },
                    { num: "3", title: "“회사”는 “파트너사”와 거래 중 발생한 제반 민원 사항에 대한 재발방지를 위하여 최선을 다한다." },
                ],
            },
            {
                no: "10",
                title: "제재",
                items: [
                    { num: "1", title: "“회사”의 임직원은 업무를 수행함에 있어 이 기준을 준수하여야 하며, 당사자의 고의 또는 중대한 과실로 이 기준을 위반한 사실이 확인된 경우에는 “회사”의 윤리 규범 등에 따라 제재조치를 진행하여야 한다." },
                    { num: "2", title: "“회사”의 임직원이 사기, 횡령, 배임, 금전수수, 부정청탁 등에 해당할 경우 “회사”는 해당 임직원을 형사고발할 수 있다." },
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />이 기준은 2018.04. 01. 제정·시행한다.<br /><br />부칙(2024.06.11.)<br />이 기준은 2024.06.11. 개정·시행한다.",
            },
        ],
        // 4. 인테리어 및 홍보물 비용분담 기준
        FairInteriorAndPromotionCostSharingSections:[
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 “회사”라 함)과 파트너사(이하 “파트너사”라 함) 등과의 거래관계에 있어, 매장 인테리어 및 홍보물 등을 제작하는 과정에서 발생할 수 있는 불공정한 행위를 예방하고, 관련 법령을 준수하여 “파트너사”와 공정한 거래관계를 확립하고자 함을 목적으로 한다.",
            },
            {
                no: "02",
                title: "준수의무",
                items: [
                    { num: "1", title: "“회사”의 임직원은 “파트너사”와의 거래에 있어서 이 기준 이외에도 『독점규제 및 공정 거래에 관한 법률』(이하 “공정거래법”이란 함)과 『대규모유통업에서의 거래 공정화에 관한 법률(이하 “대규모유통업법”이라 함)』 등 관계 법령을 엄격히 준수하여야 한다." },
                    { num: "2", title: "이 기준은 “파트너사”가 상시 확인할 수 있도록 “회사” 홈페이지 등에 게시하고, 내부 직원에 대해서는 정기적으로 교육하여 준수할 수 있도록 한다." },
                ],
            },
            {
                no: "03",
                title: "용어의 정의",
                definitions: [
                    { term: "1", desc: "“매장 인테리어”란 “파트너사”가 “회사” 내 매장에 인테리어, 매장 내 집기 등의 설치·개량·개선에 투입된 비용, 기타 당해 매장에서의 상품 소매를 위해 필요한 설비를 하는데 필요한 모든 비용을 의미한다."},
                    { term: "2", desc: "“홍보물”이란 “회사”와 “파트너사”가 상품의 홍보를 위하여 제작한 것을 의미한다." },
                    { term: "3", desc: "“비용분담”이란 “회사”와 “파트너사”가 매장 인테리어 또는 홍보물 등 제작함에 있어 필요한 비용의 분담을 의미한다." },
                ],
            },
            {
                no: "04",
                title: "매장 인테리어 요건 및 절차",
                items: [
                    { num: "1", title: "매장 인테리어는 “파트너사”가 점포 내 매장에 대해 설비 비용을 지출한 것이어야 한다." },
                    { num: "2", title: "“대규모유통업법” 제16조에서 매장 설비비용 보상제도는 “회사”와의 거래를 위해 초기 비용을 지출한 “파트너사”의 계약기간 동안의 기대이익을 보호하기 위한 것이어야 한다." },
                    {
                        num: "3",
                        title: "보상의무에 대한 요건은 각 호와 같다.",
                        details: [
                            "1. “회사”가 “파트너사”에게 계약기간 도중 거래의 거절 또는 중단을 요청하는 경우. 단, “파트너사”의 채무불이행 또는 귀책사유로 인한 계약해지의 경우에는 그러하지 아니하다.",
                            "2. 양당사자가 합의 또는 쌍방 귀책사유에 의한 계약해지를 하는 경우.",
                            "3. 계약기간 도중 “회사”의 필요에 의하여 리뉴얼을 하거나 매장의 위치·면적·시설을 변경하는 행위를 하는 경우.",
                            "4. 자연재해 등 불가항력으로 인하여 거래가 중단되는 경우에는 보상의무가 발생하지 않는다.",
                            "5. 보상에 대한 산식은 다음과 같다.",
                            " “파트너사”의 매장 설비비용 지출총액* X [(계약기간 마지막날 – 거래중단 등 발생일) / 계약기간]",
                            " * “회사”와 “파트너사”가 계약 체결 시점에 협의하여 작성한 서류의 기재사항에 따름",
                        ],
                    },
                ],
            },
            {
                no: "05",
                title: "홍보물 등 요건 및 절차",
                items: [
                    {num: "1", title: "홍보물 등은 판매촉진을 목적으로 제작하는 것을 목적으로 한다.",},
                    {num: "2", title: "홍보물 등의 비용은 “회사”가 부담함을 원칙으로 하며, 회사의 홍보물 제작 양식이 아닌 별도의 양식을 요청하는 경우에는 “파트너사”가 별도의 비용을 부담할 수 있다." },
                ],
            },
            {
                no: "06",
                title: "불공정행위 접수 및 처리",
                items: [
                    {num:"1", title: "“파트너사”는 “회사”의 임직원이 이 기준을 위반하여 불공정한 처우에 따른 불이익을 받았을 경우 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보할 수 있으며, “회사”는 제보 내용을 규정된 절차에 따라 처리하여야 한다."},
                    {num:"2", title: "“회사”는 “파트너사”의 제보 업무를 처리하는 과정에서 “파트너사”관련 정보와 인적사항 등을 보호하며, 제보로 인하여 부당하게 차별 대우를 받거나 거래 중단 등의 행위가 발생되지 않도록 해야 한다."},
                    {num:"3", title: "회사”는 “파트너사”와 거래 중 발생한 제반 민원 사항에 대한 재발방지를 위하여 최선을 다한다."}
                ]
            },
            {
                no: "07",
                title: "제재",
                items: [
                    { num: "1", title: "“회사”의 임직원은 업무를 수행함에 있어 이 기준을 준수하여야 하며, 당사자의 고의 또는 중대한 과실로 이 기준을 위반한 사실이 확인된 경우에는 “회사”의 윤리 규범 등에 따라 제재조치를 진행하여야 한다." },
                    { num: "2", title: "“회사”의 임직원이 사기, 횡령, 배임, 금전수수, 부정청탁 등에 해당할 경우 “회사”는 해당 임직원을 형사고발할 수 있다." },
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />이 기준은 2018.04. 01. 제정·시행한다.<br /><br />부칙(2024.06.11.)<br />이 기준은 2024.06.11. 개정·시행한다.",
            },
        ],
        //5. 파트너사 경영정보요구 기준
        FairPartnerCompanyManagementSections:[
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 “회사”라 함)이 파트너사(이하 “파트너사”라 함)와 거래(직매입, 특약매입, 위수탁거래 등을 모두 포함함)하는 과정에서 “파트너사”에 대하여 부당하게 경영정보를 요구하는 행위를 금지하고, 관련 법령을 준수함으로서, “파트너사”와 공정한 거래관계를 확립하고자 함을 목적으로 한다.",
            },
            {
                no: "02",
                title: "기본원칙",
                items: [
                    { num: "1", title: "“회사”의 임직원은 “파트너사”와의 거래에 있어서 이 기준 이외에도 『독점규제 및 공정거래에 관한 법률』과 『대규모유통업에서의 거래 공정화에 관한 법률(이하 ‘대규모유통업법’이라 함)』 등 관계 법령을 엄격히 준수하여야 한다." },
                    { num: "2", title: "이 기준은 “파트너사”가 상시 확인할 수 있도록 “회사” 홈페이지 등에 게시하고, 내부직원에 대해서는 정기적으로 교육하여 준수할 수 있도록 한다." },
                ],
            },
            {
                no: "03",
                title: "용어의 정의",
                definitions: [
                    { term: "1", desc: "“파트너사”란 거래형태에 상관없이 “회사”와 상품공급거래, 물품납품거래, 서비스 등 제공하는 사업자로서 납품업자뿐만 아니라 일반적인 거래상대방도 포함한다."},
                    { term: "2", desc: "“경영정보”란 “파트너사”가 다른 사업자에게 공급하는 상품의 공급조건이나, 다른 사업자의 매장에 들어가기 위한 입점조건 및 “파트너사”나 “파트너사”의 거래 상대방에 관한 정보를 포함한다." },
                ],
            },
            {
                no: "04",
                title: "경영정보 요구의 금지",
                lead: "“회사”는 “파트너사”에 대하여 거래개시 전후를 불문하고 다음 각 호에 해당하는 경영정보를 부당하게 요구해서는 아니 된다.",
                usePlainList: true,
                items: [
                    { num: "1", title: "1. “파트너사”가 다른 사업자에게 공급하는 상품의 공급조건에 관한 정보 (공급가격, 공급물량, 공급시기 및 방법, 대금지급시기 및 방법, 반품조건 등)" },
                    { num: "2", title: "2. “파트너사”가 공급하거나 판매하는 상품의 원가에 관한 정보" },
                    { num: "3", title: "3. “파트너사”가 다른 사업자에게 판매하는 상품의 매출관련정보 (거래처별 매출액, 기간별 판매량 등)" },
                    { num: "4", title: "4. “파트너사”가 다른 사업자와 진행하는 판매촉진행사에 관한 정보 (거래처별 판매촉진행사의 시기, 횟수, 행사내용 및 거래조건 등)" },
                    { num: "5", title: "5. “파트너사”가 다른 사업자와 거래에 사용하는 전산망에 접속하기 위한 정보 (다른 사업자와의 거래에 사용되는 전산망에 접속하는 아이디, 비밀번호 등)" },
                    { num: "6", title: "6. 기타 위 각 호에 준하는 정보로서 “파트너사”에게 불이익을 줄 수 있는 경영정보" },
                ],
            },
            {
                no: "05",
                title: "예외사항",
                items: [
                    {
                        num: "1",
                        title: "제4조에도 불구하고, “회사”는 “파트너사”에 대하여 정당한 절차를 통하여 다음 각 호의 사항을 기재하여 각각 기명날인한 서면을 제공한 경우 경영정보의 제공을 요구할 수 있다.",
                        details: [
                            "1. 경영정보 제공을 요구하는 목적",
                            "2. 비밀유지방법 등 요구 대상 정보의 비밀유지에 관한 사항 및 비밀 침해시 손해배상에 관한 사항",
                            "3. 경영정보의 요구일자, 제공일자 및 방법",
                            "4. 경영정보 제공 요구가 불가피함을 객관적으로 증명할 수 있는 사항",
                        ],
                    },
                    {
                        num: "2",
                        title: "다음 각 호의 정보는 공개되어 있거나, “파트너사”와의 거래 개시 또는 유지를 위하여 필요한 정보로서 원칙적으로 “파트너사”에 요구할 수 있는 정보로 본다.",
                        details: [
                            "1. 대외적으로 공개되어 있는 “파트너사”의 일반현황 (대표자 경력, 직원수, 취급상품명 등)",
                            "2. “파트너사”의 재무제표",
                            "3. “파트너사”의 연간 전체 매출액(단, 거래처별, 채널별 매출액은 제외)",
                            "4. 위 제1호부터 제3호에 준하는 것으로 “파트너사”에게 불이익을 줄 가능성이 없는 정보",
                        ],
                    },
                    { num: "3", title: "“회사”가 “파트너사”에 정당한 절차를 거쳐 경영정보를 요구하는 경우에도, 필요한 최소한의 범위에서 요청하여야 하고, 수령한 경영정보는 요구 목적의 범위 내에서만 사용하여야 한다." },
                ],
            },
            {
                no: "06",
                title: "기타 불공정한 거래행위의 금지",
                lead: "“회사”는 “파트너사”에 대해 경영정보 등을 요구함에 있어, 이 규정에 의무 또는 금지사항으로 명시되어 있지 아니하더라도, “파트너사”가 경영정보 등을 제공하지 않는다는 이유로 “파트너사”에 대해 불이익을 주거나, 사업활동을 방해하는 등의 불공정한 거래행위를 하여서는 아니된다.",
            },
            {
                no: "07",
                title: "불공정행위 접수 및 처리",
                items: [
                    { num: "1", title: "“파트너사”는 “회사”의 임직원이 이 기준을 위반하여 불공정한 처우에 따른 불이익을 받았을 경우 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보할 수 있으며, “회사”는 제보 내용을 규정된 절차에 따라 처리하여야 한다." },
                    { num: "2", title: "“회사”는 “파트너사”의 제보 업무를 처리하는 과정에서 “파트너사”관련 정보와 인적사항 등을 보호하며, 제보로 인하여 부당하게 차별 대우를 받거나 거래 중단 등의 행위가 발생되지 않도록 해야 한다." },
                    { num: "3", title: "“회사”는 “파트너사”와 거래 중 발생한 제반 민원 사항에 대한 재발방지를 위하여 최선을 다한다." },
                ],
            },
            {
                no: "08",
                title: "제재",
                items: [
                    { num: "1", title: "“회사”의 임직원은 업무를 수행함에 있어 이 기준을 준수하여야 하며, 당사자의 고의 또는 중대한 과실로 이 기준을 위반한 사실이 확인된 경우에는 “회사”의 윤리 규범 등에 따라 제재조치를 진행하여야 한다." },
                    { num: "2", title: "회사”의 임직원이 사기, 횡령, 배임, 금전수수, 부정청탁 등에 해당할 경우 “회사”는 해당 임직원을 형사고발할 수 있다." },
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />이 기준은 2018.04. 01. 제정·시행한다.<br /><br />부칙(2024.06.11.)<br />이 기준은 2024.06.11. 개정·시행한다.",
            },

        ],
        // 6. 파트너사 종업원 파견 기준
        FairPartnerEmployeeDispatchSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 “회사”라 함)이 파트너사(이하 “파트너사”라 함)등으로부터 종업원이나 그 밖에 “파트너사”에 고용된 인력(이하 ‘종업원’이라 함)을 파견 받아 “회사”의 사업장에 근무하게 하는 과정에서 발생할 수 있는 부당한 행위를 예방하고, 관련 법령을 준수하여 “파트너사”와 공정한 거래관계를 확립하고자 함을 목적으로 한다.",
            },
            {
                no: "02",
                title: "준수의무",
                items: [
                    { num: "1", title: "“회사”의 임직원은 “파트너사”와의 거래에 있어서 이 기준 이외에도 『대규모유통업에서의 거래 공정화에 관한 법률(이하 ‘대규모유통업법’이라 함)』과 『대규모유통업 분야에서 납품업자 등의 종업원 파견 및 사용에 관한 가이드 라인』 등 관계 법령을 엄격히 준수하여야 한다." },
                    { num: "2", title: "이 기준은 “파트너사”가 상시 확인할 수 있도록 “회사” 홈페이지 등에 게시하고, 내부직원에 대해서는 정기적으로 교육하여 준수할 수 있도록 한다." },
                ],
            },
            {
                no: "03",
                title: "용어의 정의",
                definitions: [
                    { term: "1", desc: "“파트너사”라 함은 “회사”와의 상품공급거래, 물품납품거래 등의 대상업체로 예정되거나 거래중인 사업자로서 납품업자뿐만 아니라 일반적인 거래상대방도 포함한다."},
                    { term: "2", desc: "“특약매입거래”란 “회사”가 매입한 상품 중 판매되지 아니한 상품을 반품할 수 있는 조건으로 납품업자로부터 상품을 외상매입하고, 상품판매 후 일정률이나 일정액의 판매수익을 공제한 상품판매대금을 납품업자에게 지급하는 형태의 거래를 말한다." },
                    { term: "3", desc: "“판매장려금”이란 명칭에 상관없이 직매입거래에서 상품의 판매촉진을 위하여 연간 거래기본계약에 명시된 조건에 따라 납품업자가 “회사”에게 지급하는 경제적 이익을 말한다." },
                ],
            },
            {
                no: "04",
                title: "종업원의 파견",
                items: [
                    { num: "1", title: "“회사”는 “파트너사” 등으로부터 종업원을 파견 받아 “회사”의 매장에서 근무하게 하는 행위를 원칙적으로 금지한다." },
                    {
                        num: "2",
                        title: "다만, 다음 각 호의 어느 하나에 해당하는 경우로서 “파트너사”와 사전에 파견조건을 서면으로 약정하고 파견된 종업원을 해당종업원을 고용한 “파트너사”가 납품하는 상품의 판매 및 관리 업무에 종사하게 하는 경우에는 그러하지 아니한다.",
                        details: [
                            "1. “회사”가 파견된 종업원의 인건비를 비롯한 식비, 교통비 등 각종 실비와 그 밖에 “회사” 매장에서 파견종업원이 상품판매 및 관련업무에 종사하는데 드는 비용을 부담하는 경우",
                            "2. “파트너사”가 종업원 파견에 따른 예상 이익과 비용의 내역 및 산출 근거를 객관적, 구체적으로 작성하여 명시한 서면에 따라 “회사”에게 자발적으로 자신이 고용한 종업원의 파견을 요청하는 경우",
                            "3. 특수한 판매 기법 또는 능력을 지닌 숙련된 종업원을 파견 받는 경우",
                            "4. 특약매입거래를 하는 “파트너사”의 제품을 상시적으로 운영하는 매장의 형태로 운영 시 해당 상품의 특성상 전문지식이 중요하다고 공정거래위원회가 정하여 고시하는 상품류를 판매·관리하기 위하여 종업원을 파견 받는 경우",
                        ],
                    },
                    {
                        num: "3",
                        title: "다음 각 호의 어느 하나에 해당하는 행위는 파견허용사유에 포함하지 아니한다.",
                        details: [
                            "1. 파견비용 부담조건으로 파견을 받았으나, 파견 인력에 지급하는 비용부담을 이유로 “파트너사”에게 상품매입원가의 인하를 요구하거나, 판매장려금 또는 광고비를 추가로 수취하는 행위",
                            "2. 파견비용 부담조건으로 파견을 받았으나, 약정서에 기재된 판매활동을 수행함에 있어 소요되는 진열대 등의 설치비용, 샘플상품 비용 등 “회사”가 부담해야 할 비용 중 일부를 “파트너사”에게 부담시키는 행위",
                            "3. “파트너사”의 자발적 요청 이전에, 협조요청 등의 명목으로 종업원을 파견하여 줄 것을 구두나 유선 또는 이메일 등으로 비공식적으로 요구하고, 사후에 “파트너사”로부터 파견 요청서를 제출하게 하는 행위",
                            "4. “파트너사”에 종업원 파견을 요구하면서 이를 거절할 경우 거래개시거절, 거래지속중단 등 불이익을 부여하거나, 이를 암시함으로써 “파트너사”가 그 요구에 응할 수밖에 없는 경우",
                            "5. 파견에 따른 제반비용을 부담하거나 “파트너사”가 자발적으로 파견을 요청하는 경우에 해당되지 않음에도 불구하고, 상품의 특성이나 판매업무와 관련된 소정의 교육만으로도 가능한 단순 상품판매 업무의 수행을 위해 종업원을 파견 받는 행위",
                            "6. 특별한 기술이 필요하지 않은 고객에 대한 관심제고 수준의 단순 판촉업무에 숙련된 종업원을 요구하여 판촉사원을 파견 받는 행위",
                            "7. 특수한 판매기법이나 능력과 무관한 판매대금 수령 등 단순판매보조업무의 수행을 위해 숙련된 종업원을 요구하여 파견 받는 행위",
                            "8. “회사” 차원의 판촉행사기간에 행사보조업무의 수행을 위한 임시행사요원을 추가로 요구하여 파견 받는 경우",
                        ],
                    },
                ],
            },
            {
                no: "05",
                title: "서면약정",
                items: [
                    {
                        num: "1",
                        title: "“회사”는 “파트너사”로부터 종업원을 파견 받을 시 파견조건을 사전에 서면으로 약정하고, 동서면에 “회사”와 “파트너사”가 각각 서명 또는 기명날인 하여야 한다.",
                    },
                    {
                        num: "2",
                        title: "제1항의 서면에 포함되어야 하는 사항은 다음 각 호와 같다.",
                        details: [
                            "1. 종업원의 수",
                            "2. 종업원의 근무기간 및 근무시간",
                            "3. 종업원이 종사할 업무내용",
                            "4. 종업원의 인건비 분담 여부 및 조건",
                        ],
                    },
                    {
                        num: "3",
                        title: "다음 각 호의 어느 하나에 해당하는 경우는 대규모유통업법의 위반행위로 간주한다.",
                        details: [
                            {
                                text: "1. 종업원을 파견 받은 이후에 서면 약정하는 경우",
                                children: [
                                    "가. 단기 판촉행사라는 이유로 서면 약정 없이 “파트너사”에게 판촉사원 파견을 추가로 요구하고, 사후에 “파트너사”로부터 파견요청서와 서면 약정서(기명날인포함)를 징구하는 경우",
                                    "나. 종업원을 최초로 파견 받은 시기와 약정한 시기가 상이하고, 약정 이전 시기부터 소급하여 적용하거나 약정 일자를 최초 파견 시기 이전으로 수정하여 기재하는 경우",
                                    "다. 파견종업원의 인원 수 등 파견조건약정을 사후로 유보하는 경우",
                                    "라. 파견조건을 명시한 서면의 마련은 종업원 파견 이전에 이루어졌으나, 한 당사자 또는 양 당사자의 서명 또는 기명날인은 파견 이후에 이루어진 경우",
                                ],
                            },
                            {
                                text: "2. 서면에 포함되어야 하는 사항 일부 또는 전부에 대해 약정을 체결하지 않은 경우",
                                children: [
                                    "가. 파견조건을 사전에 서면으로 약정하지 않고 구두, 이메일, 파견요청 문서 등으로 종업원 파견을 요청하여 파견 받는 경우",
                                    "나. “파트너사”가 자발적으로 종업원 파견을 요청했다는 이유로 사전에 서면약정을 체결하지 않는 경우",
                                    "다. 종업원의 근무시간 및 근무기간, 업무내용에 대해서는 명확히 약정하였으나, 종업원수는 예측이 어렵다는 이유로 약정서에 명시하지 않는 경우",
                                ],
                            },
                            {
                                text: "3. 서면에 포함되어야 하는 사항 일부 또는 전부에 대해 불명확하게 약정하는 경우",
                                children: [
                                    "가. 파견조건에 관한 예측이 가능한 상시 근무 판매사원을 파견 받으면서 파견 인원 및 근무시간 등을 명확히 약정하지 않는 경우",
                                    "나. 상품매출변동, 단기 판촉행사 등 필요한 종업원수가 최대10명 등으로 예상 가능한 경우에도“5명~30명” 또는“30명이하” 등 포괄적으로 약정하는 경우",
                                    "다. 종업원의 근무기간을 “상반기중” 또는 “3분기 중” 등으로 모호하게 규정하여 “파트너사” 가 파견기간을 예측하기 어려운 경우",
                                    "라. “파트너사”는 구체적 파견 조건이 명시되지 않은 서면에 서명 또는 기명날인 만하고, 구체적인 파견 조건은 “회사”가 사후에 일방적으로 기재하는 경우",
                                ],
                            },
                            {
                                text: "4. 약정한 서면이 불완전한 경우",
                                children: [
                                    "가. 파견 조건을 명시한 서면은 마련되었으나, 한 당사자 또는 양 당사자 모두의 서명 또는 기명날인이 누락된 경우",
                                    "나. 전자서면을 통해 약정을 체결할 때, “파트너사”의 서명을 “회사”가 보관하고 있다가 이를 약정서에 기재하는 경우",
                                ],
                            },
                            "5. “파트너사”에게 약정 서면을 교부하지 않는 경우"
                        ],
                    },
                    { 
                        num:"4",
                        title:"“회사”와 “파트너사”가 종업원 파견조건을 약정한 서면은 체결 즉시 “파트너사”에 교부하여야 하며, 해당 서면은 약정이 끝난 날부터 5년간 보존하여야 한다."
                    }
                ],
            },
            {
                no: "06",
                title: "파견종업원의 업무범위",
                items: [
                    { num: "1", title: "파견종업원은 해당 인원을 고용한 “파트너사”가 납품하는 상품의 판매 및 관리업무에만 종사하여야 한다." },
                    { num: "2", title: "다음 각 호의 어느 하나에 해당하는 행위는 파견종업원의 업무범위에 해당하지 아니한다.",
                        details: [
                            "1. 파견된 종업원을 계산대에서 현금출납보조업무, 포장 업무 등에 종사시키는 행위",
                            "2. 파견된 종업원에게 통로·화장실 등 매장 공용공간 청소, 매장 공용공간에서 매장 전체 차원의 고객응대 및 안내 업무 등을 하도록 지시하는 행위",
                            "3. 파견된 종업원을 상품하역, 창고반입업무, 쇼핑카트 회수·정리, 주차장관리 및 주차지원 업무에 종사시키는 행위",
                            "4. 파견된 종업원에게 “파트너사” 자사상품 뿐 아니라 다른 “파트너사”가 납품하는 상품의 판매 및 재고파악 및 관리, 진열업무 등을 맡기는 행위",
                            "5. “회사” 고유업무의 일환으로 수행하는 정기재고조사 업무 등의 원활한 수행을 위해 파견 종업원으로 하여금 “파트너사” 자사상품의 재고를 파악하도록 하는 행위",
                        ],
                    },
                ],
            },
            {
                no: "07",
                title: "파트너사의 종업원 파견요청",
                lead: "“회사”의 “파트너사” 등은 제4조 제2항 제2호에 따라 “파트너사”의 입장에서 상품의 홍보 및 매출 증대를 위하여 이익이 될 것으로 판단하고 “파트너사”의 종업원을 “회사”에 파견 요청하려는 경우에는 상품 계약을 체결하기 전에 종업원 파견에 따른 예상 이익과 비용의 내역 및 산출 근거를 객관적 · 구체적으로 기재한 종업원 파견요청서를 “회사”에 제출하여야 한다.",
            },
            {
                no: "08",
                title: "불공정행위 접수 및 처리",
                items: [
                    { num: "1", title: "“파트너사”는 “회사”의 임직원이 이 기준을 위반하여 불공정한 처우에 따른 불이익을 받았을 경우 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보할 수 있으며, “회사”는 제보 내용을 규정된 절차에 따라 처리하여야 한다." },
                    { num: "2", title: "“회사”는 “파트너사”의 제보 업무를 처리하는 과정에서 “파트너사”관련 정보와 인적사항 등을 보호하며, 제보로 인하여 부당하게 차별 대우를 받거나 거래 중단 등의 행위가 발생되지 않도록 해야 한다." },
                    { num: "3", title: "“회사”는 “파트너사”와 거래 중 발생한 제반 민원사항에 대한 재발방지를 위하여 최선을 다한다." },
                ],
            },
            {
                no: "09",
                title: "제재",
                items: [
                    { num: "1", title: "“회사”의 임직원은 업무를 수행함에 있어 이 기준을 준수하여야 하며, 당사자의 고의 또는 중대한 과실로 이 기준을 위반한 사실이 확인된 경우에는 “회사”의 윤리 규범 등에 따라 제재조치를 진행하여야 한다." },
                    { num: "2", title: "“회사”의 임직원이 사기, 횡령, 배임, 금전수수, 부정청탁 등에 해당할 경우 “회사”는 해당 임직원을 형사고발할 수 있다." },
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />이 기준은 2018.04. 01. 제정·시행한다.<br /><br />부칙(2024.06.11.)<br />이 기준은 2024.06.11. 개정·시행한다.",
            },
        ],
        // 7. 파트너사 특약매입거래 기준
        FairPartnerSpecialPurchaseSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 “회사”라 함)과 파트너사(이하 “파트너사”라 함)간 특약매입거래 과정에서 발생할 수 있는 각종 비용 분담에 대한 기준을 마련하고, 관련 판매촉진행사를 진행하는 과정에서 발생할 수 있는 불공정한 거래행위를 예방하고, 관련 법령을 준수함으로서, “파트너사”와 공정한 거래관계를 확립하고자 함을 목적으로 한다.",
            },
            {
                no: "02",
                title: "기본원칙",
                items: [
                    { num: "1", title: "“회사”의 임직원은 “파트너사”와의 거래에 있어서 이 기준 이외에도 『대규모유통업에서의 거래공정화에 관한 법률(이하 ‘대규모유통업법’이라 함)』과 『대규모유통업 분야의 특약매입거래에 관한 부당성 심사지침』 등 관계 법령을 엄격히 준수하여야 한다." },
                    { num: "2", title: "이 기준은 “파트너사”가 상시 확인할 수 있도록 “회사” 홈페이지 등에 게시하고, 내부 직원에 대해서는 정기적으로 교육하여 준수할 수 있도록 한다." },
                ],
            },
            {
                no: "03",
                title: "용어의 정의",
                definitions: [
                    { term: "1", desc: "“파트너사”라 함은 “회사”와의 상품공급거래, 물품 납품거래 등의 대상업체로 예정되거나 거래중인 사업자로서 납품업자뿐만 아니라 일반적인 거래상대방도 포함한다."},
                    { term: "2", desc: "“특약매입거래”란 “회사”가 매입한 상품 중 판매되지 아니한 상품을 반품할 수 있는 조건으로 납품업자로부터 상품을 외상매입하고, 상품판매 후 일정률이나 일정액의 판매수익을 공제한 상품판매대금을 납품업자에게 지급하는 형태의 거래를 말한다." },
                    { term: "3", desc: "“판매촉진행사”란 명칭이나 형식에 상관없이 상품에 대한 수요를 늘려 판매를 증진시킬 목적으로 행하는 모든 행사 또는 활동을 말하며, 세부 목적은 다음 각 호와 같다.",
                      details:[
                          "1. 신상품/신규입점상품의 홍보 및 매출확대",
                          "2. 경쟁사의 경쟁상품과 차별화된 추가 혜택 제공을 통한 매출 확대",
                          "3. 관련 상품군내 해당기간 판촉활동을 통한매출증대 및 MS(점유율) 확대"
                      ]
                    },
                ],
            },
            {
                no: "04",
                title: "거래 과정",
                items: [
                    { num: "1", title: "“회사”는 “파트너사”와 특약매입거래 계약을 체결한 즉시 “파트너사”에게 계약 사항이 명시된 서면을 주어야 하며, 이 서면에는 “회사”와 “파트너사”가 각각 서명 또는 기명날인 하여야 한다." },
                    { num: "2",title: "“회사”는 제1항의 서면을 “파트너사”에게 줄 때까지 납품할 상품을 제조·주문하여서는 아니된다."},
                    { num: "3", title: "특약매입거래는 계약체결 시 판매수수료와 반품조건, 판촉비용 등을 “회사”와 “파트너사”간 협의로 통하여 구체적으로 약정하고 계약서에 명시하여야 한다."},
                    { num: "4", title: "특약매입거래 체결 당시 “회사”와 “파트너사” 간 예상하지 못한 비용이 발생할 경우 그에 따른 추가 비용은 “회사”와 “파트너사”간 협의하여 결정한다."},
                ],
            },
            {
                no: "05",
                title: "역할분담",
                items: [
                    {
                        num: "1",
                        title: "“회사”는 “파트너사”를 통해 납품 받은 상품의 소유권을 취득하며, “회사” 명의로 판매한 판매대금을 수령한 후 월별로 판매수익을 집계하여, 사전에 약정된 판매수수료를 공제한 금액을 “파트너사”에 지급한다.",
                    },
                    {
                        num: "2",
                        title: "“회사”는 전체 점포차원에서 집객 및 수요창출을 위한 광고, 홍보, 판촉행사 기획 등의 활동을 실시한다.",
                    },
                    {
                        num: "3",
                        title: "“파트너사”는 점포 내에 있는 납품상품의 판매촉진을 위하여 판촉사원을 파견하여 상품에 대한 판매활동과 매장 내에서 상품에 대한 진열·보관 등의 업무를 수행한다.",
                    },
                    { 
                        num:"4",
                        title:"“파트너사”는 이 과정에서 해당 “파트너사”의 상품재고를 관리하고 미판매 상품을 “회사”와 협의하여 회수(반품)한다."
                    }
                ],
            },
            {
                no: "06",
                title: "비용 분담",
                lead: "“회사”와 “파트너사” 간 특약매입거래 과정에서 발생하는 비용을 분담하는 기준은 다음과 같다.",
                usePlainList: true,
                items: [
                    {
                        num: "1",
                        title: "1. 상품 입고 및 관리 단계",
                        criteria: [
                            {
                                details: [
                                    {
                                        text: "가. 상품에 대한 재산보장보험 비용",
                                        desc: "화재 홍수 등 천재지변과 도난 등에 의해 보유 상품이 피해를 입을 경우를 대비하여 가입하는 재산보장보험 비용은 “회사”가 부담한다.",
                                    },
                                    {
                                        text: "나. 상품보관 비용",
                                        desc: "상품에 대한 검품 · 검수 후 창고 등 시설에 상품을 보관할 때 발생하는 비용은 “회사”가 부담한다.",
                                    },
                                    {
                                        text: "다. 상품 멸실·훼손 비용부담",
                                        desc: "납품한 상품에 대하여 “회사”가 검품·검수 이후 상품이 멸실 또는 훼손되는 경우, 발생하는 비용은 “회사”가 부담하는 것을 원칙으로 한다. 단, “파트너사”나 “파트너사”로부터 파견된 판촉사원에게 명백한 귀책사유가 있는 경우에는 “파트너사”가 상품의 멸실·훼손 비용을 부담한다.",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        num: "2",
                        title: "2. 매장 운영 및 관리 단계",
                        criteria: [
                            {
                                details: [
                                    {
                                        text: "가. 매장 인테리어 비용",
                                        desc: "매장 집기 등을 교체하는 경우 발생하는 인테리어 비용은 “회사”가 부담한다",
                                    },
                                    {
                                        text: "나. 판촉사원 비용 및 규모",
                                        desc: "파견된 판촉사원의 인건비, 식비·교통비 등의 실비 및 상품 판매 및 관련 업무에 종사하는데 드는 비용은 “회사”와 “파트너사”가 협의하여 분담하며, 매장에 파견할 판촉사원 규모는 “파트너사”가가 자율적으로 결정하도록 한다.",
                                    },
                                    {
                                        text: "다. 매장관리비용",
                                        desc: "“파트너사”가 납품한 상품을 판매하는 과정에서 발생하는 전기료, 대금결제 장비 사용료 등과 같은 각종 관리 비용은 “회사”가 부담한다.",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        num: "3",
                        title: "3. 광고 및 판매촉진 활동 단계",
                        criteria: [
                            {
                                details: [
                                    {
                                        text: "가. 매장 차원에서의 광고 비용",
                                        children:[
                                            "1) “회사” 브랜드 이미지 제고를 위한 광고 비용은 “회사”가 부담한다.",
                                            "2) 매장 차원에서 집객을 위한 전단지 등의 광고 비용은 “회사”가 부담한다.",
                                            "3) “회사”가 전체 매장 단위로 통일적으로 연출하는 POP. 포스터 등의 홍보·광고 장식· 제작물 비용은 “회사”가 부담한다."  ]
                                    },
                                    {
                                        text: "나. 매장 차원에서의 판매촉진행사 비용",
                                        desc:"“회사”가 주체가 되어 전체 매장 또는 개별 매장 차원에서 진행하는 판매촉진행사에 소요되는 비용은 “회사”가 부담한다."
                                    },
                                    {
                                        text: "다. “회사”와 “파트너사” 간 공동 판매촉진행사 비용",
                                        desc:"“회사”와 “파트너사”가 공동으로 진행하는 판매촉진행사에 소요되는 비용은 직접적인 예상이익 비율에 따라 분담하되, 비율을 산정할 수 없는 경우에는 “회사”와 “파트너사”의 예상이익이 동일한 것으로 추정한다. 단, “파트너사”의 분담비율이 50%를 초과하여서는 아니 된다."
                                    },
                                    {
                                        text: "라. “파트너사”의 자발적인 판매촉진행사 비용",
                                        desc:"“파트너사”가 자발적으로 “회사”에게 요청하여 다른 업체와 차별화되는 판매촉진행사를 실시하려는 경우 소요되는 비용은 “회사”와 “파트너사”가 상호 협의하여 분담한다."
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                no: "07",
                title: "판촉사원 업무 범위",
                items: [
                    {num: "1", title: "“파트너사”가 파견한 판촉사원은 “회사” 매장의 영업시간 동안 근무한다."},
                    {num: "2", title: "판촉사원은 해당 인원을 고용한 “파트너사”가 납품하는 상품의 판매 및 관리 업무에만 종사하여야 하며, 다른 “파트너사”가 납품하는 상품의 판매 및 관리 업무 및 현금출납 보조업무, 주차지원 업무 등 “회사” 고유 업무에 종사시켜서는 아니 된다."},
                    {num: "3", title: "판촉사원은 고객이 통상적으로 제공받을 것으로 기대한 수준 이상의 서비스 품질이 유지될 수 있도록 노력하여야 한다."}
                ]
            },
            {
                no: "08",
                title: "판매촉진행사 참여",
                items: [
                    { num: "1", title: "“회사”는 판매촉진행사에 “파트너사”의 의사에 반하여 강제적으로 “파트너사”를 참여시켜서는 아니 된다." },
                    { num: "2", title: "판매촉진행사 참여의 강제성 여부는 다음 각 호의 사항을 종합적으로 고려하여 판단한다.",
                        details:[
                            "1. “파트너사”의 실질적이고 자발적인 참여의사",
                            "2. 판매촉진행사 불참 시 제재 수단의 존부 또는 불이익 부여 여부",
                            "3. 판매촉진행사의 성격 및 거래상 우월적 지위의 정도",
                            "4. “파트너사”의 거래의존도",
                            "5. “회사”와 “파트너사”의 거래관계의 지속성",
                            "6. 거래상품의 특성",
                        ]
                    },
                ],
            },
            {
                no: "09",
                title: "불공정행위 접수 및 처리",
                items: [
                    { num: "1", title: "“파트너사”는 “회사”의 임직원이 이 기준을 위반하여 불공정한 처우에 따른 불이익을 받았을 경우 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보할 수 있으며, “회사”는 제보 내용을 규정된 절차에 따라 처리하여야 한다." },
                    { num: "2", title: "“회사”는 “파트너사”의 제보 업무를 처리하는 과정에서 “파트너사”관련 정보와 인적사항 등을 보호하며, 제보로 인하여 부당하게 차별 대우를 받거나 거래 중단 등의 행위가 발생되지 않도록 해야 한다." },
                    { num: "3", title: "“회사”는 “파트너사”와 거래 중 발생한 제반 민원 사항에 대한 재발방지를 위하여 최선을 다한다." },
                ],
            },
            {
                no: "10",
                title: "불공정행위 접수 및 처리",
                items: [
                    { num: "1", title: "“회사”의 임직원은 업무를 수행함에 있어 이 기준을 준수하여야 하며, 당사자의 고의 또는 중대한 과실로 이 기준을 위반한 사실이 확인된 경우에는, “회사”의 윤리규범 등에 따라 제재조치를 진행하여야 한다." },
                    { num: "2", title: "“회사”의 임직원이 사기, 횡령, 배임, 금전수수, 부정청탁 등에 해당할 경우 “회사”는 해당 임직원을 형사고발할 수 있다." },
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />이 기준은 2018.04. 01. 제정·시행한다.<br /><br />부칙(2024.06.11.)<br />이 기준은 2024.06.11. 개정·시행한다.",
            },
        ],
        // 8. 파트너사 반품관련 기준
        FairPartnerReturnRelatedSections: [
            {
                no: "01",
                title: "목적",
                lead: "이 기준은 주식회사 지에스리테일(이하 “회사”라 함)과 파트너사(이하 “파트너사”라 함)간 거래에 있어 반품처리에 대한 기준을 명확히 규정하여, 반품과정에서 발생할 수 있는 불공정한 거래행위를 예방하고, 관련 법령을 준수함으로서, “파트너사”와 공정한 거래관계를 확립하고자 함을 목적으로 한다.",
            },
            {
                no: "02",
                title: "기본원칙",
                items: [
                    { num: "1", title: "“회사”의 임직원은 “파트너사”와의 거래에 있어서 이 기준 이외에도 『대규모유통업에서의 거래공정화에 관한 법률(이하 ‘대규모유통업법’이라 함)』과 『대규모유통업자의 반품행위에 대한 위법성 심사지침』 등 관계 법령을 엄격히 준수하여야 한다." },
                    { num: "2", title: "이 기준은 “파트너사”가 상시 확인할 수 있도록 “회사” 홈페이지 등에 게시하고, 내부직원에 대해서는 정기적으로 교육하여 준수할 수 있도록 한다." },
                ],
            },
            {
                no: "03",
                title: "용어의 정의",
                definitions: [
                    { term: "1", desc: "“납품”이란 거래형태에 상관없이 “회사”가 판매할 상품을 “회사”에 공급하는 행위를 말한다. 또한, “회사”가 이미 판매한 상품을 “파트너사”가 소비자에게 직접 공급하는 행위도 “회사”와 “파트너사”의 관계에서는 납품으로 본다."},
                    { term: "2", desc: "“반품”이란 “회사”가 납품받은 상품을 “파트너사”에게 실질적으로 되돌려주는 모든 행위를 말한다. 또한, “파트너사”의 다른 상품과 바꾸면서 당초 납품 받은 상품을 되돌려주는 경우 등 형식에 상관없이 당초에 납품 받은 상품이 “파트너사”에게 되돌아간 경우에는 반품된 것으로 본다." },
                    { term: "3", desc: "“직매입거래”란 “회사”가 “파트너사”로부터 상품을 매입하는 형태의 거래를 말한다. 매입한 상품 중 소비자에게 판매되지 아니한 상품에 대한 재고는 “회사”가 부담한다."},
                    { term: "4", desc: "“특약매입거래”란 “회사”가 소비자에게 판매되지 아니한 상품을 반품할 수 있는 조건으로 “파트너사”로부터 상품을 외상매입하는 형태의 거래를 말한다. 상품판매 후 “회사”는 일정율이나 일정액의 판매수익을 공제한 상품판매 대금을 “파트너사”에게 지급하는 형태의 거래를 말한다."},
                    { term: "5", desc: "“위수탁거래”란 “회사”가 “파트너사”로부터 납품 받은 상품을 자기명의로 판매하고, 상품판매 후 일정율이나 일정액의 수수료를 공제한 상품판매대금을 “파트너사”에게 지급하는 형태의 거래를 말한다." },
                ],
            },
            {
                no: "04",
                title: "반품의 조건",
                items: [
                    { num: "1", title: "“회사”는 정당한 사유 없이 납품 받은 상품의 전부 또는 일부를 “파트너사”에게 반품하여서는 아니된다." },
                    { num: "2",title: "제1항에도 불구하고 다음 각 호의 어느 하나에 해당하는 경우에는 예외적으로 반품을 할 수 있다.", 
                      details:[
                          "1. 특약매입거래의 경우로서 계약체결 시 반품조건을 구체적으로 약정하고 그 반품조건을 명시한 서면을 “파트너사”에게 준 경우에 그 반품조건에 해당하면 반품할 수 있다. “회사”는 구체적인 반품조건을 “회사”의 표준 물품공급계약서(특약매입)에 반영하여 활용할 수 있다.",
                          "2. 위수탁거래의 경우는 별도의 제한없이 상품판매 후 남은 재고상품을 반품할 수 있다.",
                          "3. 납품받은 상품의 “파트너사”의 책임있는 사유로 인하여 오손, 훼손되었거나 상품에 하자가 있는 경우에는 반품할 수 있다.",
                          "4. 납품받은 상품이 계약한 상품과 다른 경우로서, 상품의 원산지, 유통기한, 크기 등 중요한 제품의 특성이 당초 계약한 내용과 다른 경우에는 상품을 반품할 수 있다.",
                          "5. “회사”가 반품으로 인하여 생기는 손실을 스스로 부담하고, 해당 “파트너사”에게 반품의 동의를 얻는 경우에는 상품을 반품할 수 있다.",
                          "6. 직매입거래의 경우로서 일정한 기간이나 계절에 집중적으로 판매되는 상품(이하 “시즌상품”이라 함)에 대하여 계약 체결 시 반품조건을 구체적으로 약정하고, 그 반품조건이 명시된 서면을 “파트너사”에 준 경우에는 상품을 반품할 수 있다.",
                          "7. 직매입거래의 경우로서 “파트너사”가 반품이 자기에게 직접적으로 이익이 된다는 객관적인 근거자료를 첨부한 서면으로 반품일 이전에 자발적으로 반품을 요청한 경우에는 상품을 반품할 수 있다.",
                          "8. 가맹점사업자가 폐업하면서 “회사”에 반품한 상품에 대해서는, “회사”가 다시 “파트너사”에게 반품할 수 있다. 이 경우 재판매가 불가능한 상품은 반품할 수 없다.",
                          "9. 그 밖에 직매입거래의 경우로서 정당한 사유가 있는 경우에는 상품을 반품할 수 있다. 이 경우 정당한 사유의 판단은 납품거래의 형태와 특성, 반품의 의도와 목적, “파트너사”에 미치는 효과 등을 종합적으로 고려하여 개별적, 구체적으로 판단한다."

                      ]},
                    { num: "3", title: "제2항의 반품은 해당 거래분야에서 합리적이라고 인정되는 기간내에 반품하여야 하며, 다음 각 호의 경우 해당 거래분야에서 합리적이라고 인정되는 기간이라고 추정한다.",
                        details:[
                          "1. 제2항 제3호 및 제4호의 경우 납품일로부터 10 영업일 이내. 다만, 납품일에 제2항 제3호 및 제4호에 해당하는 사유를 외견상 즉시 발견할 수 없는 합리적인 사유가 있는 경우에는 상호 별도의 합의로 그 기간을 연장할 수 있다.",
                          "2. 제2항 제3호 및 제4호에 따른 상품이 농ㆍ수ㆍ축산물인 경우 납품한 시점부터 2일 이내",
                          "3. 제2항 제6호의 경우 판매시즌 종료일로부터 30일 이내. 다만, “회사” 또는 “파트너사”의 사유로 30일을 초과될 것으로 예상될 경우에는 판매시즌 종료일 15일 이전 상호 서면 합의로 그 기간을 연장할 수 있다."]
                    },
                ],
            },
            {
                no: "05",
                title: "반품 세부 절차",
                items: [
                    {
                        num: "1",
                        title: "직매입거래 상품의 반품의 경우 오손·훼손 또는 하자가 있는 상품, 계약한 상품과 다른 상품이 납품된 경우에는 즉시 “파트너사”에 통보하여 관련 사실을 상호 확인한 후 반품 절차를 진행하여야 한다.",
                    },
                    {
                        num: "2",
                        title: "제1항에 따른 확인 결과 상품의 오손·훼손이 “회사”의 고의 또는 과실로 인해 발생한 경우에는 반품을 할 수 없다. 단, 이 경우에도 “회사”가 상품의 오손·훼손 및 반품에 따른 “파트너사”의 모든 손실을 부담하면서 “파트너사”의 동의를 얻은 후 반품하는 경우에는 가능하다.",
                    },
                    {
                        num: "3",
                        title: "특약매입거래나 위수탁거래의 경우 상품 판매를 마감한 이후 판매되지 않은 상품을 “파트너사”와 합의한 기간 이내에 “파트너사”에게 반품하여야 한다.",
                    },
                    { 
                        num:"4",
                        title:"납품받은 상품이 오손·훼손 또는 하자가 있어 반품하는 경우 상품에 하자 등이 발견되면 해당 하자 등이 발생한 원인이 “회사” 또는 “파트너사” 중 누구에게 있는지 객관적인 근거를 통해 상호 확인한 후 “파트너사”에게 귀책사유가 있는 경우에만 반품하여야 한다."
                    },
                    { 
                        num:"5",
                        title:"납품받은 상품이 계약한 상품과 다른 경우 즉시 “파트너사”에게 해당 사실을 통보하여야 하고 계약한 상품과 다름을 “파트너사”와 상호 확인한 후 반품하여야 한다."
                    },
                    { 
                        num:"6",
                        title:"회사”가 반품으로 인하여 “파트너사”에게 발생하는 손실을 모두 부담하고 “파트너사”에게 반품의 동의를 받아 반품하고자 할 경우 “파트너사”와 사전에 손실 금액을 협의한 후 반품을 진행하여야 한다."
                    }
                ],
            },
            {
                no: "06",
                title: "서면의 교부와 보존",
                items: [
                    {
                        num: "1",
                        title: "회사”와 “파트너사”는 상품의 반품조건에 대해 상호 합의한 경우, 이를 적은 서면을 “파트너사”에게 주어야 하며, 서면에는 “회사”와 “파트너사”가 각각 서명 또는 기명날인하여야 한다.",
                    },
                    {
                        num: "2",
                        title: "합의서면은 『전자거래 기본법』에 따른 전자문서의 형태로 교부할 수 있으며, 『전자서명법』에 따른 공인전자서명 등으로 서명하는 것도 가능하다.",
                    },
                    {
                        num: "3",
                        title: "“회사”는 반품조건을 적은 서면을 납품업자에게 교부하기 전까지는, 원칙적으로 “파트너사”에게 상품을 제조하게 하거나 주문하여서는 아니된다. 다만, 반품조건을 적은 서면을 교부하기 이전이라도 “회사”가 서명 또는 기명날인 한 서면으로 상품의 제조나 주문을 요구하는 것은 가능하다.",
                    },
                    {
                        num: "4",
                        title: "“회사”는 “파트너사”와의 계약이 끝나는 날부터 5년간 다음의 사항이 적힌 서류를 보존해야 한다.",
                        details:[
                            "1. 반품 조건",
                            "2. 반품된 상품의 목록",
                            "3. 반품된 상품의 수량",
                            "4. 반품된 상품의 거래형태(직매입, 특약매입, 위수탁거래)",
                            "5. 반품된 상품의 반품일자",
                            "6. 반품된 상품과 관련된 납품대금",
                            "7. 반품된 상품의 반품사유",
                            "8. “파트너사”가 “회사”에게 서면으로 반품을 요청하면서, 해당반품이 자신에게 직접적으로 이익이 된다는 사실을 증명하는 객관적이 근거자료를 제출한 경우, “파트너사”가 제출한 서면과 근거자료",
                        ]
                    },

                ],
            },
            {
                no: "07",
                title: "기타 불공정한 거래행위의 금지",
                lead: "“회사”는 “파트너사”와 반품 관련 업무를 처리함에 있어 이 규정에 의무 또는 금지사항으로 명시되어 있지 아니하더라도, “파트너사”에 대하여 거래상 지위를 남용하여 불이익을 주거나, 그 밖에 불공정한 거래조건을 강요하는 행위를 하여서는 아니된다.",
            },
            {
                no: "08",
                title: "불공정행위 접수 및 처리",
                items: [
                    { num: "1", title: "“파트너사”는 “회사”의 임직원이 이 기준을 위반하여 불공정한 처우에 따른 불이익을 받았을 경우 “회사”의 홈페이지 내 정도경영 제보 페이지에 제보할 수 있으며, “회사”는 제보 내용을 규정된 절차에 따라 처리하여야 한다." },
                    { num: "2", title: "“회사”는 “파트너사”의 제보 업무를 처리하는 과정에서 “파트너사”관련 정보와 인적사항 등을 보호하며, 제보로 인하여 부당하게 차별 대우를 받거나 거래 중단 등의 행위가 발생되지 않도록 해야 한다."},
                    { num: "3", title: "“회사”는 “파트너사”와 거래 중 발생한 제반 민원 사항에 대한 재발방지를 위하여 최선을 다한다."},
                ],
            },
            {
                no: "09",
                title: "제재",
                items: [
                    { num: "1", title: "“회사”의 임직원은 업무를 수행함에 있어 이 기준을 준수하여야 하며, 당사자의 고의 또는 중대한 과실로 이 기준을 위반한 사실이 확인된 경우에는 “회사”의 윤리 규범 등에 따라 제재조치를 진행하여야 한다." },
                    { num: "2", title: "“회사”의 임직원이 사기, 횡령, 배임, 금전수수, 부정청탁 등에 해당할 경우 “회사”는 해당 임직원을 형사고발할 수 있다." },
                ],
            },
            {
                no: "부칙",
                title: "",
                addendumText: "부칙(2018.04.01.)<br />이 기준은 2018.04. 01. 제정·시행한다.<br /><br />부칙(2024.06.11.)<br />이 기준은 2024.06.11. 개정·시행한다.",
            },
        ],
        ComplianceManagerBannerP1:
            "자율준수 관리자는 공정거래 자율준수 프로그램(CP)의 효과적 운영을 위해 이사회 등 최고 의사결정기구에서 임명됩니다.",
        ComplianceManagerBannerP2:
            "임명된 관리자는 CP 기준과 절차에 따라 전 구성원의 법규 준수를 지원하고, 자율준수 활동이 현장에서 실현될 수 있도록 역할을 수행합니다.",
        ComplianceManualTitle: "공정거래 자율준수 편람",
        ComplianceManualMeta: "(개정 2024.12)",
        ComplianceManualBtnEbook: "공정거래 자율준수 편람 e-book 보기",
        ComplianceManualBtnDownload: "다운로드",
        WhistleGuideSections: [
            {
                key: "wg-01",
                title: "제보이용안내",
                desc: "GS리테일은 모든 임직원이 지켜야 할 올바른 행동과 가치 판단의 기준으로서 윤리규범 및 실천지침을 지키기 위해 노력하고 있습니다.<br />자유롭고 안전한 문제제기와 신고 문화의 정착이 GS리테일의 지속가능한 성장을 보장합니다.",
            },
            {
                key: "wg-02",
                title: "제보운영방침",
                desc: "회사의 전 임직원, 이해관계자, 고객으로부터 회사의 윤리규범 및 관련 규정에 위반되거나 위반의 우려가 있는 일체 사안에 대해 제보할 수 있도록 다양한 제보방법을 운영합니다.",
            },
            {
                key: "wg-03",
                title: "제보 대상",
                desc: "임직원 및 파트너사의 윤리경영 위반 사례 (금품수수, 향응/편의접대, 기타 부정행위 등), 불공정 거래 및 부당한 행위, 법규위반 및 회계부정 행위, 임직원의 성희롱, 무례한 언행 등의 인권침해 행위를 비롯하여 기타 정도경영을 위한 좋은 의견들도 함께 접수하고 있습니다.",
            },
            {
                key: "wg-04",
                title: "제보정책",
                desc: "당사는 제보자에 대한 신분 및 비밀을 철저히 보호하며, 제보와 관련하여 어떠한 차별, 불이익 등으로부터 보호합니다. 또한 제보자에 대한 포상 정책에 따라 포상금을 지급할 수 있습니다.",
            },
            {
                key: "wg-05",
                title: "제보 처리 절차",
                desc: "제보하신 내용은 객관적인 근거 확보 후 조사가 진행 되오며 후속 조치를 진행합니다.",
            },
            {
                key: "wg-06",
                title: "제보 방법",
                desc: "온라인 신고, 전화 및 메일",
            },
        ],
        WhistleProcessSteps: ["제보사항 제출", "접수 및 조사 진행", "제보대상 조치"],
        WhistleRewardPageTitle: "제보자 포상제도",
        WhistleRewardSections: [
            {
                key: "wr-01",
                title: "제보내용",
                desc: "-당사 임직원 부정 및 불공정 행위에 대한 제보<br />-협력회사 부정 및 불공정 행위 등",
            },
            {
                key: "wr-02",
                title: "포상대상",
                desc: "제보자 : 임직원 및 외부 일반인(협력회사/협력사원/제 3 자)",
            },
            {
                key: "wr-03",
                title: "포상기준",
                criteriaTables: [
                    {
                        sectionLead:
                            "1. 자진신고<br />&nbsp;&nbsp; 협력업체는 「CEO가 거래상의 혜택」을 보장함.",
                        cols: ["임직원", "협력업체"],
                        cells: [
                            {
                                sub: "면책 또는 경감",
                                desc: "신고기한(발생일 부터 1개월)내에 자진 신고한 경우<br />금품을 먼저 요구한 경우에는 적용대상에서 제외",
                            },
                            {
                                sub: "거래상의 혜택 보장",
                                desc: "CEO가 거래상의 혜택을 보장함.<br />제공되는 혜택은 당사의 내부심의를 통해 결정",
                            },
                        ],
                    },
                    {
                        sectionLead: "2. 제 3자에 의한 신고<br />&nbsp;&nbsp; 「최대 1억원」까지 포상함",
                        cols: ["금액환산 가능", "금액환산 불가능"],
                        cells: [
                            {
                                sub: "제보내용 확인결과, 금액환산 가능한 경우",
                                desc: "당사 정도경영 확립에 기여한 경우 손실감소(수익증대) 금액을<br />감안하여 내부기준에 따라 최대 1억원까지 지급",
                            },
                            {
                                sub: "제보내용 확인결과, 금액환산 불가능한 경우",
                                desc: "당사 정도경영 확립에 기여한 경우 50만원 정액 지급",
                            },
                        ],
                    },
                ],
            },
            {
                key: "wr-04",
                title: "포상내역 선정",
                desc: "-제보 내용이 당사 윤리위원회 사무국(경영진단팀)의 사실확인이 되어야 함<br />-포상 내역(금액 또는 거래상 혜택)의 결정 및 확정은 당사 심의 후 결정함.<br />-포상 사유가 중복하여 발생하는 경우는 가장 큰 금액 또는 혜택을 기준으로 함.",
            },
            {
                key: "wr-05",
                title: "포상금 지급 기준",
                desc: "-신고자의 신고로 부정행위 적발 및 처리하는데 기여도를 고려하여 포상금을 결정한다.<br />-동일한 피신고자의 동일한 부정행위에 대하여 2인 이상의 신고자가 신고한 경우, 나중에 신고한 신고자에 대하여 보상금 또는 포상금을 지급하지 아니한다.<br />&nbsp;&nbsp;(나중에 신고된 내용이 부정행위 사건 해결에 결정적인 자료로 활용된 경우는 예외)<br />-동일한 피신고자의 동일한 부정행위에 대하여 2인 이상이 공동으로 신고한 경우, 포상금액 지급 기준의 범위내에서 균등분할 지급한다.",
            },
            {
                key: "wr-06",
                title: "신고자 기여도 결정 기준",
                desc: "-증거자료의 신빙성 등 신고의 정확성<br />-피신고자의 부정행위가 신문, 방송 등 언론매체에 의하여 이미 공개된 것인지의 여부<br />-신고자가 신고와 관련한 불법행위를 행하였는지의 여부<br />-신고자가 부정행위를 신고할 의무를 가졌는지 또는 직무와 관련하여 부정부패를 신고하였는지 여부<br />-그 밖에 신고자가 부정행위 사건의 해결에 기여한 정도",
            },
            {
                key: "wr-07",
                title: "제보사실 확인결과",
                desc: "다음의 경우에는 포상을 실시하지 않음.<br />-제보 내용이 사실이 아닌 것으로 판명되거나 증거부족으로 인하여 사실여부 확인이 곤란한 경우<br />-외부 이해관계자와의 업무와 관련되지 않은 비 윤리행위 제보 시 (단, 공금횡령, 회사자산 절도 등 회사에 직접적인 손실을 끼치는 행위는 보상 가능)<br />-이미 제보된 사항이거나 경영진단팀 또는 기타 부서 또는 외부기관에서 이미 인지하여 조사가 진행중 이거나 징계절차 등이 진행 또는 완료된 사항<br />-언론보도 등에 의해 공개된 사항<br />-익명 또는 가명으로 제보하여 제보자가 누구인지 알 수 없는 경우<br />-단순 업무 개선과 관련된 사항<br />-조사관련 직무에 종사하는 경영진단팀 및 유사 부서 직원이 제보한 경우<br />-기타 보상 심의 결과 보상이 부적절하다고 인정되는 경우",
            },
        ],
        WhistleProtectPageTitle: "제보자 보호제도",
        WhistleProtectPageDesc: "다음과 같은 임직원 행동규범을 신설/직원 교육 등을 통하여, 제보자의 비밀유지를 강화함.",
        WhistleProtectSections: [
            {
                key: "wp-01",
                title: "제보자 신분누설 및 색출행위 금지",
                desc: "-제보와 관련된 사실을 확인하는 경영진단팀은 제보자 본인의 동의 없이 제보자 및 조사 협조자의 신분 공개 또는 암시를 금지함.<br />-직무상 또는 우연히 제보자의 신분을 인지한 임직원은 누구든지 제보자의 신분 누설을 금함.<br />-피제보자 또는 피제보자의 소속 부서 및 기타 관련부서에서 경영진단팀 등에 제보자의 신분에 대한 문의, 제보자를 알아내기 위한 탐문 활동 등 제보자의 신분노출이 가능한 모든 행위를 금지함.<br />-신분 보호 의무위반(인사상/거래상 불이익)시 관련자는 처벌함.(전사 윤리위원회에 상정함)<br />-제보를 한 임직원 및 업체에 대한 아래와 같은 불이익 조치를 금지하며, 해당 불이익 조치를 행한 임직원에 대해서는 전사윤리위원회에 상정함.",
                grayBox: {
                    title: "불이익 조치 정의",
                    desc: "1)파면, 해임, 해고 그 밖에 신분 상실에 해당하는 신분상의 불이익 조치<br />2)징계,정직, 승진 제한, 그 밖에 부당한 인사조치<br />3)전보,전근, 직무 미 부여, 직무 재배치, 그 밖에 본인의 의사에 반하는 인사조치<br />4)주의 대상자 명단 작성 또는 그 명단의 공개, 집단 따돌림, 폭행 또는 폭언, 그 밖에 정신적, 신체적 손상을 가져오는 행위<br />5)물품계약 또는 용역계약의 해지, 그 밖에 경제적 불이익을 주는 조치",
                },
            },
            {
                key: "wp-02",
                title: "제보자 신분노출이 예상되는 경우",
                desc: "-제보자 신분노출(예상)시, 당사자는 경영진단팀에 통보. 경영진단팀은 신분노출 경로를 조사하여, 관련자를 전사 윤리위원회에 상정함.<br />-제보자 본인이 원할 경우, 경영진단팀 면담을 요청할 수 있으며, 이 경우 경영진단팀은 CEO 보고 후, 해당 색출시도 임직원에 대해 즉시 보직변경/이동 발령 등 인사조치 권고를 할 수 있음.",
            },
        ],
        ReportIntroTitle: "GS리테일 임직원 및 파트너사의 <span class='txt_blue'>부정/불공정 행위 제보와 개선 제안</span>에 대한 <br/>의견을 쓰는 곳입니다.", /* 2026.07.06 edit 이소라 */
        ReportIntroDesc: "아래 각 메뉴별 안내 사항을 참고하셔서 작성하여 주시기 바랍니다.", /* 2026.07.06 edit 이소라 */
        ReportChannelItems: [
            {
                key: "voice",
                title: "고객의 소리",
                desc: "GS25/GS SHOP/GS THE FRESH 이용 중<br />고객불만/불편/칭찬사항은 고객의 소리에 접수하시면 관련부서에서 신속히 처리가 됩니다.", /* 2026.07.06 edit 이소라 */
                btnText: "고객의 소리 바로가기",
            },
            {
                key: "ethics",
                title: "정도경영 목소리",
                desc: "임직원/협력업체 등 부정/불공정 사항 제보 → 조사부서(경영진단팀) 제보",
                btnText: "문의하기",
            },
            {
                key: "redwhistle",
                title: "레드휘슬 (외부제보채널)",
                desc: "GS리테일 정도경영 관련 불공정행위 및 윤리위반 행위 제보<br />→ 외부기관에서 운영하는 익명제보 시스템으로 익명성과 보안을 철저히 보호",
                btnText: "문의하기",
            },
        ],
        ReportNotice: [
            "※ 기타 제보 방법 : GS리테일 경영진단팀 (02-2006-2088 / singo@gsretail.com)",
            "※ GS리테일에서는 <span class='txt_red'>제보자 포상제도</span>를 실시하며, <span class='txt_red'>제보자 보호제도</span>를 운영합니다.",
        ],
        EthicsReportTargetItems: [
            {
                num: "01",
                title: "불량한 직무수행",
                desc: "업무 소홀/미흡 및 겸업 (투잡 등)<br />기준 위반",
            },
            {
                num: "02",
                title: "금전/선물 등 수수 및 접대",
                desc: "당사 임직원과 금전/선물 등을<br />주거나 받거나, 접대를 하는 등의 행위",
            },
            {
                num: "03",
                title: "금전 거래 및 공동 투자",
                desc: "당사 임직원이 금전 거래를<br />하는 등의 행위",
            },
            {
                num: "04",
                title: "불공정 거래 및 부정 청탁",
                desc: "신규점포 오픈 시 기준<br />미준수 및 불공정 행위",
            },
            {
                num: "05",
                title: "불합리한 업무 관행/제도 개선 건의",
                desc: "불필요한 업무 개선 요청",
            },
            {
                num: "06",
                title: "성희롱 및 직장내 괴롭힘",
                desc: "",
            },
        ],
        EthicsConsentRequired: "[선택]",
        EthicsConsentTitle: "개인정보 제공 동의",
        EthicsConsentNotice: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우<br />확인해야 하는 문의에 대해 정확하고 신속한 답변을 받으시는데 어려움이 있습니다.",
        EthicsConsentItems: [
            "- 입력하신 정보는 신속하고 정확한 처리를 위해 관련 부서(담당자)에게 전달되며 문의 및 컴플레인 응대를 위해서 사용됩니다.",
            "- 제공받는 자: 고객님이 문의 신청한 GS리테일 점포 관리자, GS리테일 자회사, GS리테일에 입점 된 상품 제조사의 관리자(처리자)",
            "- 이용 목적: 문의사항 확인 및 답변을 위해 활용",
            "- 개인정보 항목: 이름, 연락처, 이메일",
            "- 보유 및 이용기간: 접수 후 1년",
        ],
        EthicsConsentRequired2: "[필수]",
        EthicsConsentItems2: [
            "- 입력하신 정보는 문의사항에 대한 확인을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같으며, 기타 개인정보 취급사항은 홈페이지 하단의 '개인정보 처리방침'을 참고하시기 바랍니다.",
            "- 수집하는 개인정보 항목: 이름, 연락처, 이메일",
            "- 수집이용 및 목적: 수집한 개인정보를 본인 식별, 문의사항 확인 및 답변을 위해 활용",
            "- 보유 및 이용기간: 접수 후 1년",
        ],
        EthicsCardItems: [
            {
                key: "ethics-01",
                image: imgEthics01,
                imgAlt: "1. 고객에 대한 책임과 의무 관련 이미지",
                title: "1. 고객에 대한 책임과 의무",
                desc: "회사는 고객이 사업 기반이라는 신념 하에 고객의견을 존중하고, 고객에게 도움이 되는 가치를 창출하여 제공함으로써 고객으로부터 신뢰를 확보한다.",
            },
            {
                key: "ethics-02",
                image: imgEthics02,
                imgAlt: "2. 공정한 경쟁 관련 이미지",
                title: "2. 공정한 경쟁",
                desc: "회사는 전세계의 모든 사업활동에서 해당지역의 관계법규를 준수하며, 정당한 방법을 통하여 경쟁의 우위를 확보한다.​",
            },
            {
                key: "ethics-03",
                image: imgEthics03,
                imgAlt: "3. 공정한 거래​ 관련 이미지",
                title: "3. 공정한 거래​",
                desc: "모든 거래는 평등한 참여기회가 보장된 가운데 자유경쟁의 원칙에 따라 이루어지며, 투명하고 공정한 거래를 통해 상호신뢰와 협력관계를 구축함으로써 장기적 관점에서 공동의 발전을 추구한다.",
            },
            {
                key: "ethics-04",
                image: imgEthics04,
                imgAlt: "4. 임직원의 기본윤리 관련 이미지​",
                title: "4. 임직원의 기본윤리​​",
                desc: "임직원은 정직과 공정의 신념으로 올바른 가치관을 확립하고, 끊임없는 자기계발과 공정한 직무수행을 통해 주어진 사명을 완수한다.​",
            },
            {
                key: "ethics-05",
                image: imgEthics05,
                imgAlt: "5. 임직원에 대한 책임​​ 관련 이미지",
                title: "5. 임직원에 대한 책임​​",
                desc: "회사는 모든 임직원을 한 인간으로서 존중하고 능력과 업적에 따라 공정하게 대우하며, 임직원의 창의성이 충분히 발휘되도록 노력한다.​​",
            },
            {
                key: "ethics-06",
                image: imgEthics06,
                imgAlt: "6. 국가와 사회에 대한 책임​​ 관련 이미지",
                title: "6. 국가와 사회에 대한 책임​",
                desc: "회사는 합리적인 사업전개를 통해 건실한 기업으로 성장함으로써 주주의 이익을 보호하고, 국민의 풍요로운 삶과 사회발전에 공헌한다.",
            },
        ],
        EthicsPracticeItems: [
            {
                key: "practice-01",
                title: "이해관계자로부터 사례를 받는 행위",
                desc: "이해관계자가 금품 등을 받아서는 안되며, 선물을 줄 경우에는 정중하게 거절하거나 되돌려 주어야 한다.",
            },
            {
                key: "practice-02",
                title: "이해관계자의 공동투자, 공동자산취득, 거래업체에 대한 부당 지분 참여",
                desc: "임직원 및 그 가족은 이해관계자와(목적여하에 관계없이) 자금을 공동 투자하여 동산, 부동산을 공동으로 취득하는 경우에는 지분에 상당하는 금액을 이해관계자로부터 수취한 것으로 간주하며, 이해관계가 있는 거래업체의 상장·비상장 증권에 대한 부당한 지분 취득은 절대로 안된다.",
            },
            {
                key: "practice-03",
                title: "회사 자산을 불법으로 사용하는 행위",
                desc: "회사의 유·무형자산 및 기밀정보 등은 회사의 중요한 자산으로 이들 자산은 회사의 사업활동 및 승인된 목적으로만 사용되어야 하며, 임직원들은 자산의 분실, 오용 및 도난에 대비할 책임이 있다.​ 회사의 비용은 공금으로서 정해진 목적에 맞게 사용되어야 하며 회사의 기준을 준수하여야 한다.",
            },
            {
                key: "practice-04",
                title: "불량한 직무수행",
                desc: "임직원들은 선량한 관리자로서의 주의의무를 다하여야 하며 이를 위반함으로써 회사에 손실을 끼치거나 명예를 손상시키는 행위를 해서는 안된다.",
            },
            {
                key: "practice-05",
                title: "직무를 이용한 사리도모",
                desc: "임직원은 직무를 이용하여 획득한 정보 또는 지식을 개인의 영리 목적으로 사용하면 안되며, 직무를 이용하여 업무상 영향력을 미치는 이해관계자에게 부당한 지시나 요구를 해서는 안된다.",
            },
            {
                key: "practice-06",
                title: "문서 · 계수의 조작 및 허위보고",
                desc: "고의로 사실과 다르게 문서, 계수의 조작 · 변조하거나 지시 또는 유도함으로써 상위자나 관련부서의 의사결정 및 판단을 흐리게 하거나 오판을 하게 하는 행위를 해서는 안되며, 모든정보의 기록과 보고는 정확하고 정직하게 이루어져야한다.",
            },
            {
                key: "practice-07",
                title: "성희롱 금지",
                desc: "임직원은 개인의 인권을 침해하고 근무 분위기를 저해할 수 있는 일체의 성희롱 행위를 포함하여, 다른 사람에게 불쾌감을 주는 언어적, 육체적, 시각적 행위를 하지 않는다.",
            },
            {
                key: "practice-08",
                title: "직장 내 괴롭힘 금지​",
                desc: "임직원은 직장에서의 지위 또는 관계 등의 우위를 이용하는 업무상 적정 범위를 넘어 다른 근로자에게 신체적 정신적 고통을 주거나 근무환경을 악화시키는 행위를 하여서는 안된다.",
            },
            {
                key: "practice-09",
                title: "회사의 명예를 실추시키는 행위​",
                desc: "불량한 직무수행 및 개인의 이익을 위하여 대외적으로 회사의 명예를 실추시키는 행위를 해서는 안된다.",
            },
        ],
        EthicsPledgeText: "본인은 GS리테일 윤리규범 세부실천사항을 최선의 노력으로 실천할 것을 다짐하여 이에 서약합니다.",
        EthicsPledgeMeta: "20**. 01. 01",
        EthicsPledgeCompany: "*****부문 ***점 *********",
        EthicsPledgeName: "홍길동 (서명)",
        hcEmailLabel: "이메일",
        hcAriaHistory: "정도경영 연혁",
        hcAriaOfficerProc: "자율준수 관리자 선임 절차",
        hcAltSign: "곽창헌 사인",
        hcPlaceholder5W1H: "1.누가 :\n2.언제 :\n3.어디서 :\n4.내용 :\n5.아는 사람 :\n6.확인 방법 :",
        hc01: "* 여러 개의 파일 업로드 시 zip파일로 압축하여 올려주세요 (*용량제한 20MB)",
        hc02: "* 필수 입력사항",
        hc03: "1995년부터 이미 투명한 거래 의지를 대내외에 천명하고 공정거래를 자율적으로 실천해 왔으며,",
        hc04: "GS그룹의 정도경영 추진 방침에 따라 당사도 1995년도부터 해당 방침에 따른 다양한 활동을 전개 해 나가고 있습니다.",
        hc05: "GS리테일 임직원 여러분!",
        hc06: "GS리테일 정도경영 제보 대상",
        hc07: "GS리테일 지속가능경영부분",
        hc08: "GS리테일은",
        hc09: "GS리테일은 투명하고 거래질서 확립과 자율준수 프로그램의 지속적 실천을 위해",
        hc10: "GS리테일은 투명하고, 공정하며, 합리적인 사고와",
        hc11: "GS리테일은 협력사와의 신뢰와 협력을 통해 공동의 발전 도모와 자율준수 프로그램의",
        hc12: "※ 내용 입력 시 개인정보보호를 위해 연락처, 주소 등의 개인정보를 작성하지 않도록 주의 부탁드립니다.",
        hc13: "가급적 6하원칙에 입각하여 작성해 주시고, 내용이 부정확한 경우에는 조사대상에서 제외될 수도 있습니다.",
        hc14: "감사합니다.",
        hc15: "고객과 파트너사 등으로부터 신뢰를 얻어 지속적으로 성장하도록 임직원 여러분의",
        hc16: "고객정보",
        hc17: "공정거래 4대 가이드라인을 도입, 적용하고 있습니다.",
        hc18: "공정거래 관련 법규 위반을 사전에 예방함은 물론 조기에 위반 여부를 발견하고 시정할 수 있도록 하는 제도입니다.",
        hc19: "공정거래 자율준수",
        hc20: "공정거래 자율준수 프로그램(CP: Compliance Program)은",
        hc21: "공정거래 자율준수 프로그램은 자율준수 관리자와 CP 주관부서만의 업무가 아니라",
        hc22: "공정거래 자율준수를 통한 올바른 업무 수행을 통해 위험을 줄이고 지속 가능한",
        hc23: "곽창헌",
        hc24: "구분",
        hc25: "그렇기에 기업과 구성원이 공정한 경쟁에 관하여 정해진 법규를 스스로 준수하는 것은 선택사항이 아니라 필수 불가결한 사항입니다.",
        hc26: "기업이 공정거래 관련 법규를 스스로 준수하기 위해 운영하는 준법시스템으로서,",
        hc27: "내용",
        hc28: "매장명",
        hc29: "모든 임직원이 일상 업무를 수행함에 있어 지켜야 할 원칙이자 기준입니다.",
        hc30: "모범기업입니다.",
        hc31: "목적과 취지",
        hc32: "법규 위반으로부터 GS리테일과 임직원을 안전하게 보호하고,",
        hc33: "법규 위반으로부터 GS리테일과 임직원을 안전하게 보호하고, 고객과 파트너사 등으로부터 신뢰를 얻어",
        hc34: "상담이나 제보를 하신 분에 대하여서는 어떠한 불이익도 발생하지 않도록 하겠습니다.",
        hc35: "상무",
        hc36: "성장을 이룰 수 있습니다.",
        hc37: "신청",
        hc38: "실행력을 통해 윤리경영을 최우선 기본 가치로 실현합니다.",
        hc39: "안녕하십니까. 자율준수 관리자 곽창헌 상무입니다.",
        hc40: "언제나 고객님의 입장이 되어 작은 소리에도 귀를 기울이겠습니다.",
        hc41: "연락처",
        hc42: "연혁",
        hc43: "오늘날에는 사회적 책임의 이행과 공정하고 투명한 경영체계의 확립이 기업의 지속적 성장 가능성을 판가름하는 핵심 요소로 자리 잡았습니다.",
        hc44: "우리 GS리테일이 지속적으로 성장하도록 임직원 여러분의 적극적인 자율준수 실천을 당부 드립니다.",
        hc45: "이곳에서 접수되는 모든 글들은 철저한 보안과 안전 속에서 처리됨을 알려드립니다.",
        hc46: "이름",
        hc47: "이윤 극대화를 추구하는 기업활동의 속성에도 불구하고,",
        hc48: "자율준수 관리자",
        hc49: "자율준수 관리자 선임절차",
        hc50: "자율준수 관리자 역할",
        hc51: "자율준수 관리자와 CP 주관부서가 최선을 다해 임직원 여러분을 돕겠습니다.",
        hc52: "자율준수 문화의 정착과 확산에 힘을 쏟고 있는 공정거래 자율준수 모범 기업입니다.",
        hc53: "자율준수를 통한 올바른 업무 수행을 통해 위험을 줄이고 지속 가능한 성장을 이룰 수 있습니다.",
        hc54: "적극적 실천을 위해 기준과 절차에 따라 ‘자율준수관리자’를 임명하여 운영하고 있습니다.",
        hc55: "적극적인 자율준수 실천을 당부드립니다.",
        hc56: "정도경영 목소리",
        hc57: "정도경영 목소리에는 임직원 또는 협력업체 직원의 불공정 행위들 (금품수수, 향응접대, 매출누락, 불공정거래, 기타 부정행위)에 대한 제보뿐만 아니라, 정도경영을 위한 좋은 의견들도 함께 접수하고 있습니다.",
        hc58: "정도경영 사이버 신문고",
        hc59: "제목",
        hc60: "제보구분",
        hc61: "제보내용",
        hc62: "제보이용안내",
        hc63: "제보자 보호제도",
        hc64: "제보자 포상제도",
        hc65: "제보하기",
        hc66: "취소",
        hc67: "파일첨부",
        hc68: "편의점, 수퍼 및 홈쇼핑 사업을 견인하는 우리 GS리테일은 공정한 기업활동에 대한 시대적 요구에 부응하고자",
        hc69: "허위 사실을 신고하여 개인의 명예를 훼손시키는 행위는 절대 삼가 바랍니다.",
        hc70: "회신방법",
        hc71: "1.누가 :&#10;2.언제 :&#10;3.어디서 :&#10;4.내용 :&#10;5.아는 사람 :&#10;6.확인 방법 :",
        hc72: "곽창헌 사인",
        hc73: "자율준수 관리자 선임 절차",
        hc74: "정도경영 연혁",
        hc75: "제보 처리 단계",
        EthicsMainTitle: "GS리테일은 투명하고, 공정하며, 합리적인 사고와 <br class=\"p_br\" />실행력을 통해 윤리경영을 최우선 기본 가치로 실현합니다.",
        EthicsCodeTitle: "GS리테일 윤리규범",
        EthicsCodeDesc: "GS리테일은 상호 신뢰와 협력을 토대로 모든 이해관계자와 공동의 이익을 추구함으로써 모두가 선망하는 Value No.1 기업으로 발전하기 위해 올바른 행동과 가치 판단의 기준으로 윤리규범을 제정하고 정도경영의 길을 걷습니다.",
        EthicsCodeBtn: "㈜GS리테일 윤리규범",
        EthicsGuideTitle: "GS리테일 실천지침",
        EthicsGuideDesc: "본 내용은 정직과 공정의 신조직문화 창출을 위하여 GS리테일인으로서 지켜야 할 ‘임직원의 기본윤리’를 구체적으로 해설하고 실천에 용이하도록 제도화한 내용입니다.",
        EthicsPracticeSubTitle: "세부실천지침",
        EthicsPledgeTitle: "윤리규범 실천서약",
        EthicsPledgeDesc: "정도경영을 위한 임직원의 기본 윤리를 숙지하고 회사업무를 수행함에 있어 GS리테일인으로서 아래의 행위를 하지 않는다.",
        EthicsPledgeDateLabel: "일시",
        EthicsPledgeDeptLabel: "소속",
        EthicsPledgeNameLabel: "성명",
        EthicsPledgeToCompany: "주식회사 GS리테일 귀중",
        PurposeFeatureItems: [
            {
                title: "정당성 획득",
                desc: "기업의 존재가치에 대한 사회적 <br /> 정당성 획득의 기반을 갖춘다.",
            },
            {
                title: "경쟁력 향상",
                desc: "장기적인 측면에서 기업 및 <br />국가의 경쟁력을 향상시킨다.",
            },
            {
                title: "마찰과 갈등해소",
                desc: "행동에 대한 올바른 기본을<br />제시함으로써 구성원간의 마찰과<br />갈등을 해소할 수 있다.",
            },
        ],
        HistoryItems: [
            {
                period: "2016 ~ 현재",
                summary: null,
                details: [
                    { term: "당사주요활동", desc: "상시모니터링 시스템 도입" },
                    { term: null, desc: "Fair DNA 캠페인 진행" },
                    { term: null, desc: "자회사 정도경영 활동 지원​" },
                    { term: null, desc: "윤리규범 및 청렴규정 제정('21.7월)" },
                    { term: null, desc: "전사 직책자 대상 정도경영 항목 평가 반영('21~)" },
                ],
            },
            {
                period: "2003 ~ 2015",
                summary: "지속적인 추진",
                details: [
                    { term: "그룹주요활동", desc: "정도경영 TFT 발족 ('03.4월)" },
                    { term: null, desc: "윤리규범 실천 및 자매사의 공정/투명성 감사 강화" },
                    { term: "당사주요활동", desc: "부정비리적발감사에서 사전업무 진단위주로 업무전환" },
                    { term: null, desc: "정도경영 사이트 구축('03. 7월)" },
                    { term: null, desc: "GS리테일 포브스 경영품질 대상​ 윤리경영부문 1위('07.8월)" },
                ],
            },
            {
                period: "2002 ~ 2003",
                summary: "윤리규범 실천기반 조성",
                details: [
                    { term: "그룹주요활동", desc: "평가 반영 시스템 운영" },
                    { term: null, desc: "윤리규범 준수 실천 여부에 대한 확인 감사" },
                    { term: "당사주요활동", desc: "'02년 7월 3사 통합 후 윤리규범 세무실천지침 제정 후 공포 ('02.8월)" },
                    { term: null, desc: "전 임직원 윤리규범실천서약" },
                    { term: null, desc: "경력 및 신입사원 윤리규범교육 지속 실시" },
                ],
            },
            {
                period: "1995 ~ 2001",
                summary: "윤리규범 실천기반 조성",
                details: [
                    { term: "그룹주요활동", desc: "'93년 공정, 정직, 성실 보고" },
                    { term: null, desc: "'95년 윤리규범 제정 선포공정거래제도 완비" },
                    { term: "당사주요활동", desc: "윤리규범 추진부서 : 감사팀('96)" },
                    { term: null, desc: "'96.4月 윤리규범 교육 및 실천의지 다짐 : 전사 대리이상" },
                    { term: null, desc: "불공정사례 신고센터 운영 부정, 비리관련 내부감사 지속" },
                ],
            },
        ],
    },
    en: {
        MainTitle: "Compliance",
        MainsubTitle: "Compliance",
        Tabs1: [{ item: "Ethical Management" }, { item: "Legal Compliance" }], /* 20260623 edit 이소라 */
        TabsEsgArchive: [
            { item: "Introduction" },
            { item: "Guidelines" },
            { item: "Systems" },
            { item: "Reporting" },
        ],
        TabsEsgSystem: [
            { item: "Reporting Usage Guide" },
            { item: "Reporter Reward Program" },
            { item: "Reporter Protection Program" },
        ],
        TabsCompliance: [
            { item: "Compliance Program" },
            { item: "Compliance Manager Information" },
            { item: "Four Major Fair Trade Guidelines" },
            { item: "Fair Trade Work Standards" },
        ],
        TabsFairTradeBiz: [
            { item: "Supermarket, CVS, Specialty" },
            { item: "TV Home Shopping" },
        ],
        ComplianceProgramHeroTitle:
            "GS Retail voluntarily upholds fair trade to promote mutual growth through trust and cooperation, in accordance with the principle of responsible free competition.",
        // ComplianceProgramLead:
        //     "GS리테일은 자율적 공정거래를 적극 실천하기 위해 ‘자율준수 프로그램’을 운영하고 있습니다.",
        ComplianceProgramFeatureItems: [
            {
                num: "01",
                title: "Establishment and implementation of CP criteria and procedures"/* 260604 번역 */,
                desc: "Establishment and Implementation of CP Standards and Procedures",
            },
            {
                num: "02",
                title: "The CEO's commitment to and support for compliance"/* 260604 번역 */,
                desc: "CEO's Commitment to and Support for Voluntary Compliance<br />The CEO publicly expresses the commitment to voluntary compliance in a manner easily recognizable by all members, customers, and stakeholders of the Company, and actively supports CP operations.",
            },
            {
                num: "03",
                title: "Appointment of a compliance officer responsible for operating the CP"/* 260604 번역 */,
                desc: "Appointment of a Compliance Manager Responsible for CP Operations<br />A compliance manager is appointed within the organization by the highest decision-making body such as the Board of Directors, with responsibility and authority granted for effective CP operations.",
            },
            {
                num: "04",
                title: "Production and use of the compliance manual"/* 260604 번역 */,
                desc: "Development and Utilization of the Compliance Manual",
            },
            {
                num: "05",
                title: "Conducting continuous and systematic compliance training"/* 260604 번역 */,
                desc: "Continuous and Systematic Compliance Training<br />Effective training on matters related to fair trade law compliance is conducted regularly for all members, including the CEO.",
            },
            {
                num: "06",
                title: "Establishment of an internal monitoring system"/* 260604 번역 */,
                desc: "Establishment of Internal Monitoring System<br />Vulnerabilities are identified through an internal monitoring system, and a transparent fair trade environment is being built through institutional improvement.",
            },
            {
                num: "07",
                title: "Sanctions against employees who violate fair trade-related laws and regulations"/* 260604 번역 */,
                desc: "Sanctions against Employees Who Violate Fair Trade Laws and Regulations<br />The Company operates internal regulations specifying sanctions commensurate with the degree of fair trade law violations; when violations are identified, the Company responds actively and conducts preventive activities to avoid recurrence of similar acts.",
            },
            {
                num: "08",
                title: "Effectiveness evaluation and improvement measures"/* 260604 번역 */,
                desc: "Effectiveness Evaluation and Improvement Measures<br />To enable CP to operate effectively and continuously, reviews and evaluations of CP standards, procedures, and operations are conducted, and institutional improvement measures are implemented accordingly.",
            },
        ],
        ComplianceManagerRoleFeatureItems: [
            { num: "01", title: "- Conducts supervision and audits on legal compliance." },
            { num: "02", title: "- Develops and operates the compliance manual." },
            { num: "03", title: "- Directs and supervises compliance training." },
        ],
        ComplianceAppointmentSteps: [
            { key: "ap1", iconKey: "recommend", title: "Compliance Manager<br />Candidate Recommendation", note: "Disqualification and Recusal Requirements" },
            { key: "ap2", iconKey: "verify", title: "Compliance Manager<br />Capability Verification", note: "Anti-corruption verification and job capability verification" },
            { key: "ap3", iconKey: "appoint", title: "Appointment", note: "Term: 3 years" },
            { key: "ap4", iconKey: "notify", title: "Employee Notification<br />Execution of Duties" },
        ],
        FairTradeGuidelineDetailBtn: "Learn More",
        FairTradeGuidelineItems: [
            {
                num: "01",
                title: "Partner Company Selection and Operation Guidelines"/* 260604 번역 */,
                desc: "Guidelines for the Fair Selection and Operation of Partner Companies",
                popContId: "gsrsu04020301"
            },
            {
                num: "02",
                title: "Guidelines for Issuance and Retention of Written Documents"/* 260604 번역 */,
                desc: "Guidelines for the Issuance and Retention of Written Documents in Subcontracting Transactions",
                popContId: "gsrsu04020302"
            
            },
            {
                num: "03",
                title: "Operating Regulations of the Subcontracting Transaction Review Committee"/* 260604 번역 */,
                desc: "GS Retail Guidelines for the Establishment and Operation of an Internal Deliberation Committee for Subcontract Transactions"/* 260604 번역 */,
                popContId: "gsrsu04020303"
            },
            {
                num: "04", 
                title: "Large and Small and Medium-Sized Enterprises",
                desc: "Guidelines for Concluding Contracts for Win-Win Cooperation between Large and Small and Medium-sized Enterprises"/* 260604 번역 */,
                popContId: "gsrsu04020304"
            },
       
        ],
        FairTradeWorkStandardAccordionItems: [
            {
                key: "01",
                title: "<span class='acc_num'>1.</span>Partner Company Selection and Operation Criteria"/* 260604 번역 */,             
            },
            {
                key: "02",
                title: "2. Standards for Determining and Changing Sales Incentives",              
            },
            {
                key: "03",
                title: "3. Standards and Procedures for Conducting Sales Promotion Events and Cost Sharing",              
            },
            {
                key: "04",
                title: "4. Standards for Sharing Costs for Interior and Promotional Materials",  
            },
            {
                key: "05",
                title: "5. Standards for Requesting Management Information from Partner Companies",
            },
            {
                key: "06",
                title: "6. Standards for Dispatching Partner Company Employees",
            },
            {
                key: "07",
                title: "7. Standards for Partner Company Special Purchase Transactions",
            },
            {
                key: "08", 
                title: "8. Partner Company Return-Related Standards",
            },
        ],
        FairTradeHomeShoppingAccordionItems: [
            { key: "01", title: "1. Standards and Procedures for Fair Trade with Partner Companies" },
            { key: "02", title: "2. Standards and Procedures for Determining Transaction Conditions" },
            { key: "03", title: "3. Standards and Procedures for Fixed-Commission Broadcast Operations" },
            { key: "04", title: "4. Standards and Procedures for Conducting Sales Promotion Events" },
            { key: "05", title: "5. Standards and Procedures for Sharing Broadcast Production Costs" },
            { key: "06", title: "6. Standards and Procedures for Returns of Directly Purchased Products" },
            { key: "07", title: "7. Standards for Prohibition on Demanding Management Information" },
            { key: "08", title: "8. Standards for Compliance with Guidelines for Reviewing the Illegality of Unfair Trade Practices in Home Shopping" },
            { key: "09", title: "9. Standards and Procedures for Product Selection and Broadcast Scheduling" },
            { key: "10", title: "10. Standards and Procedures for Intangible Product Selection" },
            { key: "11", title: "11. Standards for Prohibition on Coercive Acts of Linked Scheduling" },
            { key: "12", title: "12. Standards for Compensation for Partner Company Damage Due to Unfair Trade Practices" },
        ],
        // 1. 협력사와의 공정거래를 위한 기준과 절차
        FairTradeHomeShoppingCooperationSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These standards govern the trade process between GS Retail Co., Ltd. (hereinafter "GS SHOP") and Partner Companies for TV home shopping and data home shopping broadcasts (hereinafter collectively "broadcasts"), setting forth standards and procedures for the Company to conduct business with Partner Companies in a transparent, fair, and lawful manner.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "GS SHOP employees must always be familiar with and comply with these Standards during consultations or transactions with Partner Companies." },
                    { num: "2", title: `In addition to these Standards, GS SHOP employees must also strictly comply with the provisions of the Monopoly Regulation and Fair Trade Act, the Act on Fair Transactions in Large-Scale Retail Business, and other fair trade-related laws and regulations (hereinafter collectively "Fair Trade-Related Laws and Regulations") in transactions with Partner Companies.` },
                    { num: "3", title: "These Standards and subsidiary guidelines shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "These Standards shall in principle be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) bulletin board, and shall also be disclosed during individual consultation with Partner Companies for their listing for GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share these Standards through Partner Company training." },
                ],
            },
            {
                no: "03",
                title: "Product and Partner Company Selection",
                definitions: [
                    { term: "1", desc: "GS SHOP selects products and Partner Companies through fair and transparent procedures in response to proposals received from Partner Companies online or offline." },
                    { term: "2", desc: `The specific standards and procedures for complying with paragraph ① shall be set forth in the separate standard "Standards and Procedures for Product Selection and Broadcast Scheduling."` },
                ],
            },
            {
                no: "04",
                title: "Determination of Sales Commission",
                items:[
                    {num:"1", title:"The product sales commission must be calculated according to fair and transparent standards in accordance with the principle of mutual trust with Partner Companies."},
                    {num:"2", title:"Where GS SHOP intends to set the sales commission conditions with a partner company in the form of a fixed-fee commission, the target products and scheduling ratio must be operated restrictively, and protective measures for small and medium-sized enterprise Partner Companies must be established."},
                    {num:"3", title:"The specific standards and procedures for complying with paragraphs ① and ② shall be set forth in a separate guideline."},
                ]
            },
            {
                no: "05",
                title: "Conduct of Promotional Events and Cost Sharing",
                items: [
                    { num: "1", title: "Promotional events must be conducted after prior mutual agreement with Partner Companies, and must comply with fair trade-related laws and regulations when conducted." },
                    { num: "2", title: "The specific standards and procedures for complying with paragraph ① shall be set forth in a separate guideline." },
                ],
            },
            {
                no: "06",
                title: "Sharing of Broadcast Production Costs",
                items: [
                    { num: "1", title: "As a general rule, GS SHOP shall bear the entire production cost of product sales broadcasts. However, where, at the request of a partner company, additional use is made of sales experts, models, or self-produced videos prepared in advance by the partner company, the costs incurred may be shared through prior agreement."/* 260604 번역 */ },
                    { num: "2", title: "The specific standards and procedures for complying with paragraph ① shall be set forth in a separate guideline." },
                ],
            },
            {
                no: "07",
                title: "Prohibition of Unfair Trade Practices",
                items: [
                    {
                        num: "1",
                        title: "In the course of transacting with Partner Companies, GS SHOP shall comply with the following items and shall not engage in acts that abuse its superior position over Partner Companies to impose unfair coercion or other unfair trade practices. The specific standards for such unfair trade practices shall be governed by the provisions of fair trade-related laws and regulations.",
                        details: [
                            "1. Obligation to conclude, provide, and retain written contracts",    
                            "2. Prohibition on reduction of product payment",
                            "3. Obligation to pay product sales proceeds",
                            "4. Prohibition on unfair refusal or delay of product receipt",
                            "5. Prohibition on improper return of goods",
                            "6. Prohibition on unfair coercion of promotional costs and similar",
                            "7. Prohibition on coercion of exclusive transactions",
                            "8. Prohibition on requesting management information",
                            "9. Prohibition on unfair demand and receipt of economic benefits",
                            "10. Prohibition on unfair changes to contracts and provision of other disadvantages",
                            "11. Prohibition on retaliatory measures",
                            "12. Prohibition on interference in business activities",
                        ],
                    },
                    { num: "2", title: "The specific standards for complying with subparagraph 5 of paragraph ① shall be set forth in a separate guideline." },
                    { num: "3", title: "The specific standards for complying with subparagraph 8 of paragraph ① shall be set forth in a separate guideline." },
                    { num: "4", title: "The specific standards for complying with the content of the guidelines on the illegality review of specific unfair trade practices in the home shopping broadcast transaction sector stipulated by the Fair Trade Commission, in addition to the content of paragraph ①, shall be set forth in a separate guideline." },
                ],
            },
            {
                no: "08",
                title: "Exclusion of Transactions with Conflicted Parties",
                items: [
                    { num: "1", title: "If employees or officers of a Partner Company are direct family members, relatives, or other interested parties of GS SHOP employees, GS SHOP shall prohibit the relevant employees from directly or indirectly participating in procedures for selecting that Partner Company's products or determining transaction conditions." },
                    {
                        num: "2",
                        title: "The standards for interested parties under paragraph ① are as follows:",
                        details: [
                            {
                                text: "1. Relatives pursuant to Article 777 of the Civil Act",
                                children: [
                                    "a. Blood relatives within 8 degrees",
                                    "b. Relatives by affinity within the 4th degree (the scope of relatives by affinity follows Article 769 of the Civil Act)",
                                    "c. Spouses",
                                ],
                            },
                            "2. Persons who have previously worked at GS SHOP",
                            "3. Persons associated with GS Group affiliates",
                        ],
                    },
                    { num: "3", title: "Notwithstanding paragraph ①, if an employee with an interested party relationship with a Partner Company's employee is found to have been involved in the procedures for selecting that Partner Company's products or determining transaction conditions shall be re-examined with the relevant employee excluded." },
                ],
            },
            {
                no: "09",
                title: "Prevention of Monopolization by Specific Partner Companies",
                items: [
                    {
                        num: "1",
                        title: `GS SHOP in principle requires direct supply from manufacturers in order to protect small and medium-sized enterprises by reducing distribution stages.① GS SHOP in principle requires direct supply from manufacturers in order to protect small and medium-sized enterprises by reducing distribution stages. However, if the manufacturer does not have the capability to perform acts ordinarily necessary for supply such as logistics, A/S reception and handling, and therefore wishes to list through a Partner Company acting on its behalf (hereinafter "Acting Partner Company"), an exception shall apply.`,
                    },
                    { 
                        num: "2", 
                        title: "In connection with the proviso of paragraph ①, GS SHOP shall ensure that no specific Acting Partner Company monopolizes the supply, and if there are proposals from multiple Acting Partner Companies for the same product, Partner Companies shall be selected through fair and transparent competition in accordance with the standards for Partner Company selection." 
                    },
                ],
            },
            {
                no: "10",
                title: "Standards for Suspension of Product Sales, etc.",
                items: [
                    { num: "1", title: "Where GS SHOP intends to suspend the sale of a Partner Company's products, or to suspend or terminate transactions with a Partner Company, the reasons and procedures therefor must be clearly defined and adhered to, and GS SHOP must endeavor to ensure that no unfair damage is caused to the Partner Company in the process." },
                    { num: "2", title: `The specific reasons and procedures under paragraph ① shall be set forth in the separate standard "Standards and Procedures for Product Selection and Broadcast Scheduling."` },
                ],
            },
            {
                no: "11",
                title: "Receipt and Processing of Complaints and Reports",
                items: [
                    { num: "1", title: "GS SHOP shall make every effort to resolve complaints and grievances of Partner Companies arising in the course of transactions with Partner Companies, and shall endeavor to prevent recurrence." },
                    { num: "2", title: "If a Partner Company finds that a GS SHOP employee has violated these Standards or subsidiary guidelines, or if a complaint arises due to unfair treatment in the course of transactions with GS SHOP, the Partner Company may report the violation or submit the complaint through reporting channels (Red Whistle, etc.) provided on the official website or the Transparent Trading System." },
                    { num: "3", title: `GS SHOP shall promptly confirm the facts of reports received pursuant to paragraph ② through investigation and audit by GS SHOP's audit department, legal affairs or compliance department, or similar (hereinafter "Audit Department, etc.").` },
                    { num: "4", title: "Upon completion of the factual investigation, GS SHOP must notify the relevant Partner Company of the results of the report handling, including the confirmed facts, disciplinary measures taken against the relevant employees, measures to remedy Partner Company damages, and recurrence prevention measures." },
                    { num: "5", title: "Both during and after the process of handling Partner Company reports pursuant to this Article, GS SHOP shall protect the information and personal details of the Partner Company and related parties as confidential information, and shall ensure that the Partner Company does not suffer unfair discriminatory treatment or retaliatory measures such as suspension of transactions as a result of the report." },
                ],
            },
            {
                no: "12",
                title: "Sanctions",
                items: [
                    { num: "1", title: "Where the Audit Department, etc. of GS SHOP becomes aware, through a Partner Company's report or on its own initiative, that a GS SHOP employee has violated these Standards, fair trade-related laws and regulations, the Code of Ethics and Implementation Guidelines, or other internal regulations, the Audit Department, etc. must immediately investigate the relevant employee's violation, and if confirmed to be true, must report to the Ethics Committee, which shall make the final decision on whether and to what extent the relevant employee shall be sanctioned." },
                    { num: "2", title: "Where a GS SHOP employee's violation involves fraud, embezzlement, breach of trust, bribery, improper solicitation and receipt of money or valuables, or similar conduct requiring criminal liability, GS SHOP may file a criminal complaint against the relevant employee with investigative authorities for the purpose of conducting an objective factual investigation and preventing recurrence." },
                ],
            },
            {
                no: "",
                title: "Supplementary Provisions",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />Article 1 (Effective Date)<br />① These Standards were enacted and entered into force on May 9, 2016.<br />② These Standards were amended and entered into force on January 1, 2017.<br />③ These Standards were amended and entered into force on August 2, 2018.<br />④ These Standards were amended and entered into force on December 30, 2020.<br />⑤ These Standards were amended and entered into force on November 15, 2021.<br />⑥ These Standards were amended and entered into force on August 1, 2025.",
            },
        ],
        // 2. 거래조건 결정 기준과 절차
        FairTradeHomeShoppingTermsSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `This Guideline presents detailed compliance requirements concerning the standards and procedures for determining transaction conditions with Partner Companies, as set forth in the higher-level standard "Standards and Procedures for Fair Transactions with Partner Companies," in order to enable Partner Companies to receive a fair and equitable trading environment from GS Retail Co., Ltd. (hereinafter "GS SHOP") in the process of determining transaction conditions such as sales commissions, and to build a relationship of continuous mutual cooperation between GS SHOP and Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "GS SHOP employees must always be familiar with and comply with this Guideline during consultations or transactions with Partner Companies." },
                    { num: "2", title: "In addition to this Guideline, GS SHOP employees must also strictly comply with the provisions of the Monopoly Regulation and Fair Trade Act, the Act on Fair Transactions in Large-scale Distribution Business, and other fair trade-related laws and regulations in transactions with Partner Companies." },
                    { num: "3", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "This Guideline shall in principle be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) bulletin board, and shall also be disclosed during individual consultation with Partner Companies for their listing for GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training." },
                    { num: "6", title: "GS SHOP shall not apply any differential treatment in transaction conditions including sales commissions to Partner Companies in the same product category on the grounds that the Partner Company is a large corporation or a small and medium-sized enterprise." },
                ],
            },
            {
                no: "03",
                title: "Consultation Procedures",
                items: [
                    { num: "1", title: `GS SHOP selects products for its broadcasts in accordance with the separate standard "Standards and Procedures for Product Selection and Broadcast Scheduling" in response to proposals received from Partner Companies online or offline.` },
                    { num: "2", title: "Products that meet the standards under paragraph ① must undergo quality inspection in accordance with guidelines established by product category through the quality and safety department." },
                    { num: "3", title: "After passing quality inspection, specific consultation must be conducted with the Partner Company regarding product composition, selling price, and other sales conditions for the broadcast target product." },
                    { num: "4", title: "Ten to five days before the broadcast, the Partner Company, GS SHOP's MD, and PD must share product information and specifically discuss transaction conditions such as the mutual sales commission and supply quantity." },
                    { num: "5", title: "No later than five days before the broadcast, the Partner Company, GS SHOP's MD, and PD shall meet to discuss the broadcast concept and similar matters, and finalize transaction conditions such as the final sales commission and supply quantity." },
                    { num: "6", title: "The responsible MD and others shall report in accordance with internal approval regulations regarding the final agreed content with the Partner Company and obtain final approval." },
                    { num: "7", title: "With respect to sales commissions and similar, sufficient consultation procedures must be conducted with the Partner Company so as to be mutually beneficial, and they must be reasonably calculated; transaction conditions such as the sales commission determined must not be unilaterally altered in an unfair manner or changed without justifiable reason." },
                ],
            },
            {
                no: "04",
                title: "Contract Conclusion Procedures",
                definitions: [
                    { term: "1", desc: "Even before concluding a contract, GS SHOP must comply with mutually agreed-upon matters in accordance with the principle of mutual trust. However, GS SHOP shall not require the Partner Company to manufacture or order products, or prepare facilities or equipment for products to be supplied, before concluding the contract and providing the written document." },
                    { term: "2", desc: "GS SHOP shall conclude an agreement on broadcast conditions in electronic contract form, specifying the mutually finalized transaction conditions such as sales commissions, and shall provide it through the Transparent Trading System. Conclusion and provision of the contract must in principle be completed at least three days before the broadcast date, and provision of the agreement must be carried out immediately upon contract conclusion." },
                    { term: "3", desc: "Notwithstanding paragraph ②, where there is an unavoidable reason such as a significant change in market conditions, the contract terms may be changed before the broadcast, but this must be agreed upon with the Partner Company in advance, and a written application must be obtained from the Partner Company to confirm their intention and reason for the change." },
                    { term: "4", desc: "When changing contract terms pursuant to paragraph ③, the responsible MD must report the change and its reasons to the department head before concluding the change agreement, the department head must review the validity of the reason and the change procedure, and the changed agreement must be provided to the Partner Company immediately upon conclusion of the changed contract." },
                    { term: "5", desc: "The content of the contract must include the following items that may be subject to dispute in connection with the transaction:",
                      details:[
                            "1. Transaction form, transaction items and consignment sales quantity, transaction price, transaction period, delivery conditions, payment method, payment settlement period, whether and on what conditions promotional costs are borne, return conditions, sales commission, and whether and on what conditions sales incentives are borne"/* 260604 번역 */,
                            "2. The sales broadcast schedule, broadcast production costs, whether product experts/models, etc. appear, the schedule and whether and on what conditions appearance costs are borne, delivery conditions for products ordered and returned by consumers, processing conditions for consumers' purchase cancellations and returned products, etc."/* 260604 번역 */
                        ]
                    },
                    { term: "6", desc: "GS SHOP shall retain documents relating to transactions between the parties for five years from the date the contract with the Partner Company ends." },
                ],
            },
            {
                no: "05",
                title: "Contract Performance Procedures",
                items: [
                    { num: "1", title: "GS SHOP confirms the Partner Company's agreement to the contract and then proceeds with the broadcast and sales in accordance with the agreed transaction conditions." },
                    { num: "2", title: "The MD must confirm without fail whether the payment was settled in accordance with the contract terms after the broadcast. If the payment was settled differently from the original contract terms, the relevant MD must promptly notify the Partner Company and perform a corrective settlement in accordance with the contract terms." },
                    { num: "3", title: "GS SHOP shall comply with the sales commission rate and transaction conditions set forth in the contract, and under no circumstances shall it change transaction conditions during or after the broadcast or apply them retroactively." },
                    { num: "4", title: "GS SHOP shall not demand or impose any commissions or costs of any name not agreed upon in advance with the Partner Company or not specified in the contract, and shall not transfer any other economic disadvantages to the Partner Company." },
                ],
            },
            {
                no: "06",
                title: "Determination of Sales Commission",
                items: [
                    { num: "1", title: "GS SHOP shall discuss and determine the sales commission for Partner Company products with the Partner Company in consideration of the following items:",
                      details:[
                            "1. Quality",
                            "2. Average sales commission rate for similar products (category)",
                            "3. Partner Company's sales trends, market conditions by product category, and competitive situation within the distribution channel",
                            "4. Expected sales performance and contribution to GS SHOP's overall sales",
                            "5. Related costs such as A/S and delivery (including installation costs in the case of installed products)",
                            "6. Stability and reliability of transaction performance",
                            "7. Brand awareness",
                            "8. Market potential",
                            "9. Differentiation from existing products",
                            "10. Other considerations based on the characteristics of the product"
                        ]
                    },
                    { num: "2", title: "The sales commission shall be calculated through fair and transparent procedures based on the principle of mutual trust with the Partner Company." },
                    { num: "3", title: "In principle, the interests of the Partner Company shall be given priority consideration where the relevant product falls under any of the following items, in connection with win-win cooperation such as fair trade agreements with Partner Companies:",
                        details:[
                            "1. Products manufactured, supplied, or sold by small and medium-sized enterprises pursuant to Article 2 of the Framework Act on Small and Medium Enterprises and Article 3 of the Enforcement Decree thereof",
                            "2. Products supplied by socially marginalized groups such as persons with disabilities or the elderly, or products primarily targeting such vulnerable groups",
                            "3. Products for which farmers, fishermen, or livestock farmers are the final producers, or products directly supplied by farmers, fishermen, or livestock farmers"
                        ]
                    },
                ],
            },
            {
                no: "07",
                title: "Fixed-Fee Commission Operations",
                items: [
                    { num: "1", title: `"Fixed-fee commission" refers, as stipulated in Annex Table 2-3 of the Enforcement Decree of the Broadcasting Act, to a revenue-sharing method unrelated to product sales proceeds (including revenue-sharing methods that combine a method unrelated to product sales proceeds with other revenue-sharing methods).` },
                    { num: "2", title: "The specific operational standards for fixed-fee commission broadcasts, including the types of products to which fixed-fee commissions apply, scheduling time and ratio, and measures to prevent harm to small and medium-sized enterprise Partner Companies from fixed-fee commissions, shall be set forth in a separate guideline." },
                ],
            },
            {
                no: "08",
                title: "Prohibition of Unfair Trade Practices",
                lead: "In determining transaction conditions with Partner Companies, GS SHOP shall not engage in acts of abusing its superior position in the transaction to disadvantage Partner Companies or otherwise coerce unfair trade conditions, even if such acts are not explicitly stated as mandatory or prohibited under this Guideline."
            },
            {
                no: "09",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `Where a Partner Company finds that GS SHOP has violated this Guideline in the process of consulting and determining transaction conditions with Partner Companies, or if a complaint arises in connection with the determination of transaction conditions by GS SHOP, the Partner Company may report the violation or submit the complaint to GS SHOP, and in such cases GS SHOP must handle the report in accordance with the procedures set forth in the higher-level standard "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "10",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these guidelines, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />Article 1 (Effective Date)<br />① These Standards were enacted and entered into force on May 9, 2016.<br />② These Standards were amended and entered into force on January 1, 2017.<br />③ These Standards were amended and entered into force on August 2, 2018.<br />④ These Standards were amended and entered into force on December 30, 2020.<br />⑤ These Standards were amended and entered into force on November 15, 2021.<br />⑥ These Standards were amended and entered into force on August 1, 2025.",
            },
        ],
        // 3. 정액수수료 방송 운영기준과 절차
        FairTradeHomeShoppingFixedCommissionSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These guidelines are prepared to present detailed compliance requirements regarding the standards and procedures for fixed-commission broadcast operations, as specified in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies," in order to ensure that Partner Companies receive a fair and equitable trading environment from GS Retail Co., Ltd. (hereinafter "GS SHOP") in the course of fixed-commission broadcast operations, and to build a relationship of continuous mutual cooperation between GS SHOP and its Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "GS SHOP employees must always be familiar with and comply with this Guideline during consultations or transactions with Partner Companies." },
                    { num: "2", title: "In addition to this Guideline, GS SHOP employees must also strictly comply with the provisions of the Monopoly Regulation and Fair Trade Act, the Act on Fair Transactions in Large-scale Distribution Business, and other fair trade-related laws and regulations in transactions with Partner Companies." },
                    { num: "3", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "This Guideline shall in principle be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) bulletin board, and shall also be disclosed during individual consultation with Partner Companies for their listing for GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training." },
                    { num: "6", title: "GS SHOP shall operate fixed-commission broadcasts with Partner Companies in accordance with fair and transparent principles." },
                ],
            },
            {
                no: "03",
                title: "Target Products for Fixed-Commission Broadcasts", 
                usePlainList: true,
                lead:"The types of products to which fixed commissions apply are as follows:",
                items: [
                    { num: "1", title: "1. Products intended for inventory clearance" },
                    { num: "2", title: "2. New products intended for market response testing" },
                    { num: "3", title: "3. Products intended for securing distribution channels, maintaining stable inventory management, reducing promotional costs, etc." },
                    { num: "4", title: "4. Products desired by Partner Companies for other reasons" },
                ],
            },
            {
                no: "04",
                title: "Fixed-Commission Broadcast Scheduling Time and Ratio",
                definitions: [
                    { term: "1", desc: "Fixed-commission broadcast products shall, in principle, be scheduled during live broadcast time slots; however, they may also be scheduled outside of live broadcast time slots if the Partner Company desires." },
                    { term: "2", desc: "The scheduling ratio of fixed-commission broadcasts for SME products shall be operated at a minimum level in accordance with the demand of interested Partner Companies, market conditions, and operational strategies." },
                ],
            },
            {
                no: "05",
                title: "Fixed-Commission Broadcast Consultation and Contract Execution Procedure",
                items: [
                    { num: "1", title: `GS SHOP shall, in accordance with the provisions of the "Standards and Procedures for Determining Transaction Conditions," conduct sufficient consultation procedures to ensure mutual benefit with Partner Companies prior to broadcasting, and shall calculate fixed commissions rationally.` },
                    { num: "2", title: "GS SHOP shall not unilaterally determine fixed commissions in an unreasonable manner, nor — on the grounds that a Partner Company has not accepted fixed-commission or mixed-commission broadcast conditions as a condition of scheduling — engage in any of the following acts:",
                        details:[
                            "1. Determining broadcast dates, times, or airtime significantly less favorably than for other Partner Companies",
                            "2. Canceling already-decided broadcast dates, times, or airtime",
                            "3. Changing already-decided broadcast dates, times, or airtime significantly less favorably than for other Partner Companies"
                        ]

                    },
                    { num: "3", title: "GS SHOP shall execute an agreement on fixed broadcast conditions containing the finally agreed-upon fixed commission conditions, etc., in the form of an electronic contract, and deliver it through the Transparent Trading System. Contract execution and delivery shall, in principle, be completed at least three days prior to the broadcast date, and delivery of the agreement shall be carried out immediately upon contract execution." },
                    { num: "4", title: "Notwithstanding paragraph ③, if there are unavoidable circumstances such as a significant change in market conditions, contract matters may be changed prior to broadcast, provided that prior agreement with the Partner Company is required, and the amended agreement shall be delivered to the Partner Company immediately upon execution of the amendment." },
                    { num: "5", title: "GS SHOP shall retain documents relating to transactions between the parties for five years from the date the contract with the Partner Company ends."}
                ],
            },
            {
                no: "06",
                title: "Prior Disclosure System for Fixed-Commission Broadcast Risks",
                items: [
                    { num: "1", title: "Since fixed-commission broadcasts operate on a revenue-sharing basis unrelated to product sales amounts, losses may occur to Partner Companies if broadcast sales performance is poor. Accordingly, Partner Companies must be sufficiently aware of the risks of fixed-commission broadcasts, and shall determine whether to proceed with fixed-commission broadcasts based on their own free and independent judgment and responsibility, taking into account their past sales performance, expected total sales amount, etc."},
                    { num: "2", title: "GS SHOP shall notify Partner Companies in advance of the risks of fixed-commission broadcasts specified in paragraph ①." },
                    { num: "3", title: "At the onboarding stage, GS SHOP shall fully explain the risks of fixed-commission broadcasts in the 'Broadcast Sales Product Supply Agreement' concluded with Partner Companies, notify Partner Companies of the contents of such agreement through the Transparent Trading System, and verify Partner Company confirmation by means of mutual electronic signatures on the agreement."},
                ],
            },
            {
                no: "07",
                title: "Provision of Inventory Clearance Opportunity for Fixed-Commission Broadcasts",
                lead: "GS SHOP shall endeavor to alleviate the burden on SME Partner Companies by providing inventory clearance opportunities when sales are poor as a result of fixed-commission broadcasts conducted by SME Partner Companies¹)."
            },
            {
                no: "08",
                title: "Operation of Fee Refund System for Fixed-Commission Broadcasts",
                items: [
                    { num: "1", title: "GS SHOP shall endeavor to alleviate the burden on SME Partner Companies by operating a fee refund system when sales are poor as a result of fixed-commission broadcasts conducted by SME Partner Companies."},
                    { num: "2", title: "The specific criteria for operating the refund system shall be as set forth in Appendix 1, and may be adjusted in consideration of market conditions at the time of refund, GS SHOP's management status, and available financial resources." },
                ],
            },
            {
                no: "09",
                title: "Prohibition of Unfair Trade Practices",
                lead: "In handling matters related to fixed-commission broadcast operations, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these guidelines, engage in any act of abusing its trading position to cause disadvantage to Partner Companies or to impose other unfair trading conditions."
            },
            {
                no: "10",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `If a Partner Company finds that GS SHOP has violated these guidelines in the course of consulting or deciding on fixed-commission-related conditions with the Partner Company, or if the Partner Company otherwise has a complaint related to the determination of fixed-commission conditions, the Partner Company may report the violation to GS SHOP or file a complaint, and in such case GS SHOP shall process the matter in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "11",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these guidelines, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "12",
                title: "Appendix",
                appendixTitle: "[Appendix 1] Criteria for Operating the Fixed-Commission Broadcast Fee Refund System",
                commonTables: [
                    {
                        tableClass:"quality_standards",
                        cols: ["Category", "Details"],
                        rows: [
                            [
                                { label: "Refund Criteria", style: "text-align: center;" },
                                [
                                    "Where the performance against the target for each fixed-fee broadcast of small and medium-sized enterprise products is less than 30%, 10% of the fixed fee for that broadcast shall be refunded"/* 260604 번역 */,
                                    "* For broadcasts in which both a fixed-amount commission and a percentage-based commission were paid, only the fixed-amount commission portion shall be refunded."/* 260604 번역 */,
                                ],
                            ],
                            [
                                { label: "Refund Procedure", style: "text-align: center;" },
                                [
                                    "Refund after verifying performance each quarter"/* 260604 번역 */,
                                    "· Performance is verified each quarter, after which refund is made. ※ For fairness, the refund may be processed after verification by an external institution.",
                                ],
                            ],
                            [
                                { label: "Exclusions", style: "text-align: center;" },
                                {
                                    numList: [
                                        "Large enterprises, mid-sized enterprises, and imported products"/* 260604 번역 */,
                                        "Broadcasts whose purpose is the introduction of intangible products such as travel, rentals, and mobile phones"/* 260604 번역 */,
                                        "Broadcasts of partner companies that scheduled fixed-fee broadcasts four or more times in the previous year"/* 260604 번역 */,
                                        "Broadcasts of partner companies that received refunds four or more times in the relevant year <br />(* Where there are four or more broadcast programs eligible for refund in the relevant year)"/* 260604 번역 */,
                                        "Broadcasts of partner companies conducted with fixed-fee support received through the government, local governments, public institutions, and the like"/* 260604 번역 */,
                                    ],
                                },
                            ],
                        ],
                    },
                ],
                cautionItems: [
                    "* Whether a product qualifies as an SME product shall be determined in accordance with the government-established 'Criteria for SME Products of Home Shopping Operators.'"/* 260604 번역 */,
                    "* The scale of the refund may be increased or decreased in consideration of market conditions at the time of refund, the management status of GS SHOP, available financial resources, and other factors."/* 260604 번역 */,
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />Article 1 (Effective Date)<br />① These Standards were enacted and entered into force on May 9, 2016.<br />② These Standards were amended and entered into force on January 1, 2017.<br />③ These Standards were amended and entered into force on August 2, 2018.<br />④ These Standards were amended and entered into force on December 30, 2020.<br />⑤ These Standards were amended and entered into force on November 15, 2021.<br />⑥ These Standards were amended and entered into force on August 1, 2025.",
            },
        ],
        // 4. 판매촉진행사 진행 기준과 절차
        FairTradeHomeShoppingPromotionSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These guidelines are prepared to present detailed compliance requirements regarding the standards and procedures for conducting sales promotion events, as specified in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies," in order to ensure that Partner Companies receive a fair and equitable trading environment from GS Retail Co., Ltd. (hereinafter "GS SHOP") in the course of conducting sales promotion events, and to build a relationship of continuous mutual cooperation between GS SHOP and its Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "GS SHOP employees must always be familiar with and comply with this Guideline during consultations or transactions with Partner Companies." },
                    { num: "2", title: "In addition to this Guideline, GS SHOP employees must also strictly comply with the provisions of the Monopoly Regulation and Fair Trade Act, the Act on Fair Transactions in Large-scale Distribution Business, and other fair trade-related laws and regulations in transactions with Partner Companies." },
                    { num: "3", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "This Guideline shall in principle be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) bulletin board, and shall also be disclosed during individual consultation with Partner Companies for their listing for GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training." },
                    { num: "6", title: "GS SHOP shall conduct sales promotion events with Partner Companies in accordance with fair and transparent principles." },
                ],
            },
            {
                no: "03",
                title: "Consultation Procedures", 
                lead:"The types of products to which fixed commissions apply are as follows:",
                items: [
                    { num: "1", title: `GS SHOP selects products for its broadcasts in accordance with the separate standard "Standards and Procedures for Product Selection and Broadcast Scheduling" in response to proposals received from Partner Companies online or offline.` },
                    { num: "2", title: "Products that meet the standards under paragraph ① must undergo quality inspection in accordance with guidelines established by product category through the quality and safety department." },
                    { num: "3", title: "After passing quality inspection, the Partner Company and GS SHOP shall consult on transaction conditions such as product composition and selling price, and simultaneously consult on whether to conduct sales promotion events." },
                    { num: "4", title: "Ten to five days prior to broadcast, the Partner Company's and GS SHOP's MD and PD shall consult specifically on the target products for the sales promotion event, the mutual cost-sharing ratio conditions, and other details." },
                    { num: "5", title: "At least five days prior to broadcast, the Partner Company's and GS SHOP's MD and PD shall meet to consult on broadcast concepts, etc., and finalize sales promotion event conditions." },
                    { num: "6", title: "The responsible MD and others shall report in accordance with internal approval regulations regarding the final agreed content with the Partner Company and obtain final approval." },
                    { num: "7", title: "Whether to conduct the sales promotion event and the mutual cost-sharing ratio shall be rationally calculated through sufficient consultation procedures with Partner Companies for mutual benefit, and shall not be unilaterally and unreasonably determined by one party or changed without justifiable cause." },
                ],
            },
            {
                no: "04",
                title: "Contract Conclusion Procedures",
                items: [
                    { num: "1", title: "The finally agreed-upon sales promotion event conditions, etc., shall be concluded in the form of an electronic contract as an agreement concerning the sales promotion event, and delivered through the Transparent Trading System. Contract execution and delivery shall, in principle, be completed at least three days prior to the broadcast date, and delivery of the agreement shall be carried out immediately upon contract execution. However, if there are unavoidable circumstances such as a significant change in market conditions, contract matters may be changed prior to broadcast, but even in such cases prior agreement with the Partner Company is required, and the amended agreement shall be delivered to the Partner Company immediately upon execution." },
                    { num: "2", title: "The contract shall include the event content, period, cost-sharing ratio, and other matters related to the sales promotion event." },
                    { num: "3", title: "Even prior to contract execution, matters mutually agreed upon shall be complied with in accordance with the principle of mutual trust." },
                    { num: "4", title: "GS SHOP shall retain documents related to the sales promotion event agreement with the Partner Company and documents relating to the implementation of the sales promotion event for five years from the date the contract with the Partner Company ends." },
                ],
               
            },
            {
                no: "05",
                title: "Contract Performance Procedures",
                items: [
                    { num: "1", title: "GS SHOP shall confirm whether the Partner Company has agreed to the sales promotion event and then conduct the event in accordance with the agreed-upon transaction conditions." },
                    { num: "2", title: "The MD must verify without fail whether the sales promotion event was carried out in accordance with the contract contents after the event. If the event was carried out differently from the original contract contents, the relevant MD must promptly notify the Partner Company and take follow-up measures to prevent any damage to the Partner Company, and if damage to the Partner Company has occurred, the Partner Company's damages must be compensated immediately in accordance with relevant legal provisions."},
                    { num: "3", title: "GS SHOP shall comply with the sales promotion event-related transaction conditions stated in the contract and shall not, under any circumstances, change or retroactively apply transaction conditions during or after the broadcast." },
                    { num: "4", title: "GS SHOP shall not demand from or impose on Partner Companies any sales promotion event costs or costs in the name of various promotional activities not agreed upon in advance or not stipulated in the contract, and shall not otherwise transfer economic disadvantages." },
                ],
            },
            {
                no: "06",
                title: "Cost-Sharing Determination Criteria",
                items: [
                    { num: "1", title: "The responsible MD consulting with the Partner Company shall determine the cost-sharing amount for sales promotion event costs in consideration of the following items:",
                        details:[
                            "1. The ratio shall be determined according to the ratio of economic benefits the partner company and GS SHOP are expected to directly obtain from the sales promotion event; where the ratio of expected benefits between the partner company and GS SHOP cannot be calculated, the expected benefits of the partner company and GS SHOP shall be presumed to be equal."/* 260604 번역 */,
                            "2. The partner company's share ratio of sales promotion event costs may not exceed 50/100 of the total sales promotion event costs."/* 260604 번역 */,
                            "3. Where the partner company voluntarily requests GS SHOP to conduct a sales promotion event differentiated from other partner companies, GS SHOP may determine the share ratio of the sales promotion event costs by mutual agreement with the partner company."/* 260604 번역 */
                        ]
                    },
                    { num: "2", title: "In accordance with the principle of mutual trust with partner companies, GS SHOP determines the share ratio of sales promotion event costs based on fair and transparent criteria."/* 260604 번역 */ },
                ],
            },
            {
                no: "07",
                title: "Prohibition of Unfair Trade Practices",
                lead: "In consulting and conducting sales promotion events with Partner Companies, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these guidelines, engage in any act of abusing its trading position to cause disadvantage to Partner Companies, impose other unfair trading conditions, or cause Partner Companies to participate in promotional activities against their will without justifiable cause."
            },
            {
                no: "08",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `If a Partner Company finds that GS SHOP has violated these guidelines in the course of consulting or deciding on sales promotion event-related transaction conditions with the Partner Company, or if the Partner Company otherwise has a complaint related to the determination of sales promotion event-related conditions, the Partner Company may report the violation to GS SHOP or file a complaint, and in such case GS SHOP shall process the matter in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "09",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these guidelines, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />Article 1 (Effective Date)<br />① These Standards were enacted and entered into force on May 9, 2016.<br />② These Standards were amended and entered into force on January 1, 2017.<br />③ These Standards were amended and entered into force on August 2, 2018.<br />④ These Standards were amended and entered into force on December 30, 2020.<br />⑤ These Standards were amended and entered into force on November 15, 2021.<br />⑥ These Standards were amended and entered into force on August 1, 2025.",
            },
        ],
        // 5. 방송제작비 등 분담 기준과 절차
        FairTradeHomeShoppingProductionCostSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These guidelines are prepared to present detailed compliance requirements regarding the standards and procedures for sharing broadcast production costs, etc., as specified in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies," in order to ensure that Partner Companies receive fair and equitable treatment from GS Retail Co., Ltd. (hereinafter "GS SHOP") in the process of sharing broadcast production costs, etc., and to build a relationship of continuous mutual cooperation between GS SHOP and its Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "① GS SHOP employees must always be familiar with and comply with this Guideline during consultations or transactions with Partner Companies." },
                    { num: "2", title: "In addition to this Guideline, GS SHOP employees must also strictly comply with the provisions of the Monopoly Regulation and Fair Trade Act, the Act on Fair Transactions in Large-scale Distribution Business, and other fair trade-related laws and regulations in transactions with Partner Companies." },
                    { num: "3", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "These guidelines shall, in principle, be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) board, and shall also be disclosed during individual onboarding consultations for Partner Companies' GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training."},
                    { num: "6", title: "GS SHOP shall share broadcast production costs, etc., with Partner Companies in accordance with fair and transparent principles."}
                ],
            },
            {
                no: "03",
                title: "Consultation Procedure and Criteria for Sharing Broadcast Production Costs", 
                items: [
                    { num: "1", title: "GS SHOP shall produce and conduct broadcasts after consulting in advance with Partner Companies on broadcast content and product composition, etc., for products on which it has agreed to conduct sales broadcasts with the Partner Company. In this case, the costs required for broadcast production shall, in principle, be borne by GS SHOP." },
                    { num: "2", title: "On the condition of broadcast scheduling, GS SHOP shall not unfairly pass on all or part of the broadcast production costs to a partner company, such as by having the partner company bear the pre-production costs of the broadcast or pay the appearance fees of sales experts, supporting performers (celebrities, product experts, models), or studio audiences (hereinafter 'sales experts, etc.')."/* 260604 번역 */ },
                    { num: "3", title: "Notwithstanding the latter part of paragraph (1), where a partner company requests from GS SHOP any matter falling under any of the following items in order to maintain and enhance its brand value, increase advertising effects through home shopping broadcasts, increase sales, and the like, GS SHOP may, through prior consultation with the partner company, determine the cost-sharing ratio."/* 260604 번역 */,
                        details:[
                            "1. Appearance of sales experts, etc. recruited by the partner company"/* 260604 번역 */,
                            "2. Use of pre-produced video content separately produced or held by the partner company for the home shopping broadcast (including use after editing it to be suitable for GS SHOP's broadcast)"/* 260604 번역 */,
                            "3. Addition or change of the broadcast set (stage equipment, facilities, etc.) prepared by GS SHOP"/* 260604 번역 */,
                            "4. Use of props prepared or brought by the partner company"/* 260604 번역 */
                        ]
                    },
                    { num: "4", title: "Where GS SHOP reflects the partner company's requests under paragraph 3 in producing and conducting the broadcast, it shall reach a prior written agreement with the partner company on the additional costs arising therefrom, in accordance with the criteria and procedures of Articles 4 and 5."/* 260604 번역 */ },
                ],
            },
            {
                no: "04",
                title: "Criteria for Sharing Pre-Produced Video Content Production Costs",
                items: [
                    { num: "1", title: "If GS SHOP pre-produces video content for a sales broadcast, the production costs shall, in principle, be borne by GS SHOP." },
                    { num: "2", title: "Where a partner company so requests, GS SHOP may receive and use pre-produced video content held or produced by the partner company, and the costs therefor shall be determined by separate agreement between GS SHOP and the partner company."/* 260604 번역 */ },
                    { num: "3", title: "Notwithstanding paragraph (2), where GS SHOP, while selling goods directly purchased from a partner company in a TV home shopping broadcast, uses pre-produced video material provided by that partner company, it shall pay the partner company costs in accordance with the following criteria."/* 260604 번역 */,
                      details:[
                            "1. Where the product supplied by the partner company is a licensed product (a product manufactured using a trademark right licensed by GS SHOP to the partner company): KRW 200,000"/* 260604 번역 */,
                            "2. Where the product supplied by the partner company is a general product not falling under the item 1 product: KRW 100,000"/* 260604 번역 */,
                            "3. No additional usage fee shall be paid even where the number of the partner company's pre-produced video contents used in the relevant broadcast program is two or more."/* 260604 번역 */,
                            "4. Where the partner company broadcasts/sells multiple products in one program, the usage fee shall be paid by brand unit."/* 260604 번역 */,
                            "5. The partner company's pre-produced video content usage fee shall be paid per broadcast program; however, no usage fee shall be paid where it is used in a rebroadcast program conducted for reasons such as late-night time slots, holiday periods, or emergency scheduling."/* 260604 번역 */,
                            "6. The partner company's advertising video (CF) is not included in the pre-produced video content under this Article and is excluded from the subject of usage fee payment."/* 260604 번역 */
                        ]
                    },
                    { num: "4", title: "Notwithstanding paragraph (2), where GS SHOP, while selling goods directly purchased from a partner company in a data home shopping broadcast, uses pre-produced video material provided by that partner company, it shall pay the partner company costs in accordance with the following criteria."/* 260604 번역 */,
                      details:[
                            "1. A usage fee shall be paid only where the directly purchased product under this clause falls under products of small and medium-sized enterprises. Whether a product is an SME product shall be determined in accordance with the 「Criteria for SME Products of Home Shopping Operators」 prepared by the Ministry of Science and ICT."/* 260604 번역 */,
                            "2. A usage fee shall be paid for the new first-run broadcast (initial scheduled broadcast) program of a product using the partner company's pre-produced video content, and no usage fee shall be paid from the rebroadcast (scheduled broadcasts after the first) of the same product onward."/* 260604 번역 */,
                            "3. In addition, the payment criteria of items 1 through 4 and item 6 of paragraph 3 regarding TV home shopping broadcasts shall apply equally to the data home shopping broadcasts under this clause."/* 260604 번역 */
                        ]
                    },
                ],
               
            },
            {
                no: "05",
                title: "Contract Conclusion Procedures",
                items: [
                    { num: "1", title: "Even prior to contract execution, matters mutually agreed upon shall be complied with in accordance with the principle of mutual trust." },
                    { num: "2", title: "If there are costs to be borne by the Partner Company among broadcast production costs, an agreement on broadcast conditions or a direct-purchase transaction-related contract shall be executed in the form of an electronic contract and delivered through the Transparent Trading System. Contract execution and delivery shall be carried out immediately upon execution; however, an agreement on broadcast conditions shall, in principle, be executed at least three days prior to the broadcast date. However, if there are unavoidable circumstances such as a significant change in market conditions, contract matters may be changed and delivered prior to broadcast, but even in such cases prior agreement with the Partner Company is required, and the amended agreement shall be delivered to the Partner Company immediately upon execution."},
                    { num: "3", title: "The contract shall include broadcast schedule (for transactions where an agreement on broadcast conditions is executed with the Partner Company), the number of appearances and appearance fee-sharing conditions for sales professionals, etc., usage fee-sharing conditions for pre-produced video content, and cost-sharing conditions for additions or changes to the broadcast set." },
                ],
            },
            {
                no: "06",
                title: "Prohibition of Unfair Trade Practices",
                lead: "In consulting and deciding on broadcast production costs with Partner Companies, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these guidelines, engage in any act of abusing its trading position to cause disadvantage to Partner Companies or to impose other unfair trading conditions."
            },
            {
                no: "07",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `If a Partner Company finds that GS SHOP has violated these guidelines in the course of consulting or deciding on broadcast production cost conditions with the Partner Company, or if the Partner Company otherwise has a complaint related to the determination of broadcast production cost conditions, the Partner Company may report the violation to GS SHOP or file a complaint, and in such case GS SHOP shall process the matter in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "08",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these guidelines, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />Article 1 (Effective Date)<br />① These Standards were enacted and entered into force on May 9, 2016.<br />② These Standards were amended and entered into force on January 1, 2017.<br />③ These Standards were amended and entered into force on August 2, 2018.<br />④ These Standards were amended and entered into force on December 30, 2020.<br />⑤ These Standards were amended and entered into force on November 15, 2021.<br />⑥ These Standards were amended and entered into force on August 1, 2025.",
            },
        ],
        // 6. 직매입 상품 등의 반품 기준과 절차
        FairTradeHomeShoppingReturnSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These guidelines are prepared to present detailed compliance requirements regarding the standards and procedures for returns of directly purchased products, etc., as specified in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies," in order to establish rational and legitimate return criteria in the process of returning products received through transactions (including direct-purchase transactions, special-purchase transactions, consignment transactions, and all other forms, hereinafter collectively "transactions") by GS Retail Co., Ltd. (hereinafter "GS SHOP") with Partner Companies, to comply with related laws, and to establish a fair trading relationship with Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "GS SHOP employees must always be familiar with and comply with this Guideline during consultations or transactions with Partner Companies." },
                    { num: "2", title: `In addition to these guidelines, GS SHOP shall strictly comply with the provisions of fair trade-related laws and regulations in transactions with Partner Companies, including the Monopoly Regulation and Fair Trade Act (hereinafter "Fair Trade Act"), Article 10 (Prohibition on Return of Products) of the Act on Fair Transactions in Large-Scale Distribution Industries (hereinafter "Large-Scale Retail Business Act"), and the Guidelines for Reviewing the Illegality of Return Acts by Large-Scale Distributors.` },
                    { num: "3", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "This Guideline shall in principle be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) bulletin board, and shall also be disclosed during individual consultation with Partner Companies for their listing for GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training."},
                ],
            },
            {
                no: "03",
                title: "Prohibition on Return of Products", 
                lead:"GS SHOP shall not return all or part of products received from Partner Companies without justifiable cause. However, if the matter falls under any one of the following items where return is exceptionally permitted under Article 10 of the Large-Scale Distribution Industries Act, and the return is made within a period recognized as reasonable in the relevant trading sector, justifiable cause for return is presumed:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. For special-purchase transactions: cases where specific return conditions are agreed upon at the time of contract execution and a written document stating the return conditions is provided to the Partner Company" },
                    { num: "2", title: "2. For consignment transactions" },
                    { num: "3", title: "3. Cases where the products received are damaged, defaced, or defective due to reasons attributable to the Partner Company"},
                    { num: "4", title: "4. Cases where the products received differ from the contracted products" },
                    { num: "5", title: "5. Cases where GS SHOP bears the losses arising from the return itself and obtains the Partner Company's consent to the return" },
                    { num: "6", title: `6. For direct-purchase transactions: cases involving seasonal products (products sold intensively during a certain period or season; excluding fresh agricultural, fishery, and livestock products; hereinafter "seasonal products") where specific return conditions are agreed upon at the time of contract execution and a written document stating the return conditions is provided to the Partner Company` },
                    { num: "7", title: "7. For direct-purchase transactions: cases where the Partner Company voluntarily requests a return prior to the return date, accompanied by a written document with objective supporting evidence that the return is directly beneficial to the Partner Company",},
                    { num: "8", title: "8. For other direct-purchase transactions: cases where there is justifiable cause equivalent to items 3 through 7" },
                ],
            },
            {
                no: "04",
                title: "Detailed Criteria for Returns with Justifiable Cause",
                items: [
                    { num: "1", title: "For special-purchase transactions, if GS SHOP specifically agrees on return conditions in advance and provides a written document stating the return conditions to the Partner Company, justifiable cause for the return is presumed. In this case, the specific return conditions shall include the method and procedure for specifying the products subject to return, the timing of return, and the return procedure." },
                    { num: "2", title: "In the case of a consignment transaction, because ownership of the goods rests with the consignor partner company, even if GS SHOP returns the inventory goods to the partner company without separate restrictions, the return shall be presumed to have a justifiable ground unless there are special circumstances."/* 260604 번역 */ },
                    { num: "3", title: "Where a partner company delivers a soiled/damaged product or a defective product, GS SHOP presumes that there is justifiable reason for the return. However, this shall not apply where the product was soiled/damaged due to GS SHOP's intent or negligence after the partner company delivered it to GS SHOP's warehouse or a location designated by GS SHOP."/* 260604 번역 */},
                    { num: "4", title: "Where a product delivered to GS SHOP differs from the contracted product, it is presumed that there is justifiable reason for the return. This includes not only cases where the product delivered by the partner company differs from the contracted product, but also cases where important product characteristics significant to achieving the purpose of the contract—such as the country of origin, expiration date, or size—differ from the originally contracted content."/* 260604 번역 */},
                    { num: "5", title: "Where GS SHOP itself bears the loss arising from returning a product it has already received, it is presumed that there is justifiable reason for the return, since, absent special circumstances, this does not harm the partner company's interests or cause it loss. Here, the scope of loss means all costs additionally incurred by the partner company due to the return, including the direct costs required for the return, the costs additionally required for the partner company to use and profit from the returned product, such as by reselling it, and, where the value of the product has declined compared to the time of delivery, the difference therein, etc."/* 260604 번역 */ },
                    { num: "6", title: "In the case of a direct purchase transaction of seasonal products, where GS SHOP specifically agrees with the partner company on the return conditions from the time of concluding the contract and provides in advance a written contract specifying those return conditions, the return shall be presumed to have a justifiable ground. Whether a given product falls under this is determined by comprehensively considering the monthly and quarterly sales volume and inventory volume of the product, consumer perception of the product, and the like. Cases that may be deemed seasonal products are as follows."/* 260604 번역 */,
                      details:[
                            "1. Anniversary products: Valentine's Day chocolates, White Day candies, Pepero Day snacks, Children's Day toys, Parents' Day or Teachers' Day gifts, Christmas trees, etc."/* 260604 번역 */,
                            "2. Holiday products: Chuseok gift sets, Seollal (Lunar New Year) gift sets, ancestral rite supplies, ritual vessels, etc."/* 260604 번역 */,
                            "3. New semester/graduation season items: bags, pencils, notebooks, indoor shoes, school uniforms, bouquets, etc.",
                            "4. Vacation-season items: swimsuits, water-play items such as tubes, ski wear, ski items such as goggles, etc."/* 260604 번역 */,
                            "5. Seasonal items: air conditioners, dehumidifiers, electric fans, heaters, etc."/* 260604 번역 */
                        ]
                    },
                    { num: "7", title: "In the case of a direct purchase transaction, where a partner company voluntarily requests a return from GS SHOP before the return date, together with grounds that can objectively prove that the return is to its own benefit, the return shall be presumed to have a justifiable ground. Specific cases are as follows."/* 260604 번역 */,
                      details:[
                            "1. Where the partner company, upon learning of a report that a harmful substance has been added to its product, judges that promptly accepting the return to reduce consumer harm is also in its own interest, and requests a return from GS SHOP while submitting objective supporting documents"/* 260604 번역 */,
                            "2. Where the partner company, upon launching a new product, judges that recovering the previously delivered product from the store is more helpful for enhancing its brand image, and requests a return from GS SHOP while submitting objective supporting documents"/* 260604 번역 */,
                        ]
                    },
                    { num: "8", title: "Even where there is no ground directly falling under Article 10 (1) 3 through 7 of the Act on Fair Transactions in Large Retail Business, where there is a ground equivalent thereto, the return may be presumed to have a justifiable ground."/* 260604 번역 */,}
                ]
            },
            {
                no: "05",
                title: "Basic Principles of Return Procedure",
                items: [
                    { num: "1", title: "All returns shall be processed after reaching prior agreement on conditions with the Partner Company and obtaining approval from the relevant department head." },
                    { num: "2", title: "For returns of directly purchased products in cases where products are damaged, defaced, or defective, or where products different from the contracted products have been delivered, the Partner Company shall be promptly notified, the relevant facts shall be mutually confirmed, and then the return procedure shall be carried out."},
                    { num: "3", title: "If, as a result of confirmation under paragraph ②, the damage or defacement was caused by GS SHOP's intent or negligence, the return may not be made. However, even in such case, it is permissible if GS SHOP bears all losses incurred by the Partner Company due to the product damage/defacement and return, and obtains the Partner Company's consent." },
                ],
            },
            {
                no: "06",
                title: "Detailed Return Procedures",
                items: [
                    { num: "1", title: "For special-purchase or consignment transactions, unsold products after the close of product sales shall be returned to the Partner Company within a certain period agreed upon with the Partner Company (e.g., 10 business days)." },
                    { num: "2", title: "When returning products that are damaged, defaced, or defective, once a defect, etc., is discovered in the product, the cause of the defect, etc., shall be confirmed through objective evidence to determine whether GS SHOP or the Partner Company is responsible, and the return shall be made only if the Partner Company bears the attributable cause."},
                    { num: "3", title: "If the products received differ from the contracted products, the Partner Company shall be immediately notified, and the return shall be made after mutually confirming with the Partner Company that the products differ from the contracted products." },
                    { num: "4", title: "If GS SHOP intends to make a return after bearing all losses incurred by the Partner Company due to the return and obtaining the Partner Company's consent, the parties shall consult in advance on the loss amount, obtain approval from the relevant department head, and then proceed with the return." },
                    { num: "5", title: "If seasonal products are to be returned in accordance with the return conditions agreed upon at the time of contract execution, prior approval from the relevant department head shall be obtained before proceeding with the return."},
                    { num: "6", title: "For direct-purchase transactions where the Partner Company voluntarily requests a return prior to the return date accompanied by objective supporting evidence that the return is beneficial to the Partner Company, the responsible MD shall make a prior inquiry to the legal affairs department and the fair trade affairs department regarding the evidence presented by the Partner Company proving that the return is beneficial to the Partner Company, obtain approval confirming that the evidence presented by the Partner Company is legitimate, and then obtain approval from the department head before returning the relevant products. In this case, the Partner Company must directly register in the return request system the supporting documents objectively proving that the return is beneficial to itself." },
                    { num: "7", title: "Even if a case does not directly fall under items 3 through 7 of Article 10, paragraph 1 of the Large-Scale Distribution Industries Act, if there is equivalent cause to warrant a return, prior approval from the legal affairs department and the fair trade affairs department shall be obtained, followed by approval from the relevant department head, before proceeding with the return." },
                ],
               
            },
            {
                no: "07",
                title: "Written Statement of Return Conditions, etc.",
                items: [
                    { num: "1", title: "If GS SHOP agrees with a Partner Company on product return conditions, GS SHOP shall provide the Partner Company with a written document (including electronic documents pursuant to the Framework Act on Electronic Transactions) stating the matters set forth in the following items. The written document shall be signed or sealed by both GS SHOP and the Partner Company:",
                        details:[
                            "1. Return conditions"/* 260604 번역 */,
                            "2. List of returned products"/* 260604 번역 */,
                            "3. Quantity of returned products"/* 260604 번역 */,
                            "4. Transaction form of the returned product (direct purchase/special-contract purchase/consignment transaction, etc.)"/* 260604 번역 */,
                            "5. Return date of the returned product"/* 260604 번역 */,
                            "6. Delivery payment related to the returned product"/* 260604 번역 */,
                            "7. Reason for return of the returned product"/* 260604 번역 */,
                            "8. Where the partner company requests a return from GS SHOP in writing while submitting objective supporting data proving the fact that the relevant return is directly beneficial to it: the written document and supporting data submitted by the partner company"/* 260604 번역 */
                        ]
                    },
                    { num: "2", title: "GS SHOP shall not make returns to a partner company before delivering to the partner company a written document stating the return conditions."/* 260604 번역 */},
                  
                ],
            },
            {
                no: "08",
                title: "Retention of Written Documents on Return Conditions, etc.",
                lead: "GS SHOP shall retain the return condition-related agreement under Article 7, paragraph 1, and related supporting documents for five years from the date the contract with the Partner Company ends."
            },
            {
                no: "09",
                title: "Prohibition of Unfair Trade Practices",
                lead: "In handling return-related matters with Partner Companies, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these guidelines, engage in any act of abusing its trading position to cause disadvantage to Partner Companies or to impose other unfair trading conditions."
            },
            {
                no: "10",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `If a Partner Company finds that GS SHOP has violated these guidelines in the course of consulting or deciding on return conditions with the Partner Company, or if the Partner Company otherwise has a complaint related to the determination of return conditions, the Partner Company may report the violation to GS SHOP or file a complaint, and in such case GS SHOP shall process the matter in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "11",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these guidelines, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions<br />Article 1 (Effective Date)<br />① These guidelines are enacted and take effect on August 2, 2018.<br />② These guidelines are amended and take effect on December 30, 2020.<br />③ These guidelines are amended and take effect on November 15, 2021.<br />④ These guidelines are enacted and take effect on August 1, 2025.",
            },

        ],
        // 7. 경영정보 제공 요구 금지 기준
        FairTradeHomeShoppingManagementInfoSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These guidelines are prepared, based on the contents of the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies," to present detailed compliance requirements to ensure that GS Retail Co., Ltd. (hereinafter "GS SHOP") appropriately protects the management information of Partner Companies, enhances the transparency and trust of transactions, and complies with related laws and regulations, thereby establishing a fair trading relationship based on mutual respect with Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "GS SHOP employees must always be familiar with and comply with this Guideline during consultations or transactions with Partner Companies." },
                    { num: "2", title: `In addition to these guidelines, GS SHOP shall strictly comply with the provisions of fair trade-related laws and regulations in transactions with Partner Companies, including the Monopoly Regulation and Fair Trade Act (hereinafter "Fair Trade Act") and Article 14 (Prohibition on Demanding Management Information) of the Act on Fair Transactions in Large-Scale Distribution Industries (hereinafter "Large-Scale Retail Business Act").` },
                    { num: "3", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "This Guideline shall in principle be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) bulletin board, and shall also be disclosed during individual consultation with Partner Companies for their listing for GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training."},
                ],
            },
            {
                no: "03",
                title: "Prohibited Items", 
                lead:"GS SHOP shall not unreasonably demand from Partner Companies information falling under any one of the following items:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. Information on the supply conditions of products that the Partner Company supplies to other businesses (supply price, supply volume, supply timing and method, payment timing and method, return conditions, etc.)" },
                    { num: "2", title: "2. Information on the cost of products supplied or sold by the Partner Company" },
                    { num: "3", title: "3. Sales-related information on products sold by the Partner Company to other businesses (sales amounts by customer, sales volumes by period, etc.)"},
                    { num: "4", title: "4. Information on sales promotion events conducted by the Partner Company with other businesses (timing, frequency, event content, and transaction conditions of sales promotion events by customer, etc.)" },
                    { num: "5", title: "5. Information for accessing computer networks used by the Partner Company in transactions with other businesses (IDs, passwords, etc., for accessing computer networks used in transactions with other businesses)" },
                    { num: "6", title: "6. Management information equivalent to items 1 through 5 that could disadvantage the Partner Company in the course of transactions with GS SHOP" },
                ],
            },
            {
                no: "04",
                title: "Exceptions",
                items: [
                    { num: "1", title: "Notwithstanding Article 3, GS SHOP may demand the provision of management information from Partner Companies if GS SHOP provides the Partner Company with a written document in which the following items are entered and each item is signed and sealed:",
                      details:[
                          "1. Purpose of requesting the provision of business information",
                          "2. Matters relating to confidentiality of the requested information, such as confidentiality methods, and matters relating to damages in case of breach of confidentiality",
                          "3. The date of demand for management information, date of provision, and method of provision",
                          "4. Matters that can objectively demonstrate the inevitability of the demand for business information"
                      ]
                    },
                    { num: "2", title: "The following information is considered to be publicly available or information necessary for the initiation or maintenance of transactions with Partner Companies, and may in principle be demanded from Partner Companies:",
                        details:[
                            "1. General status of the Partner Company that is publicly available (representative's educational background, number of employees, names of handled products, etc.)",
                            "2. The Partner Company's financial statements",
                            "3. The Partner Company's total annual sales (however, sales by customer and by channel are excluded)",
                            "4. Information equivalent to items 1 through 3 that, even if provided, has no possibility of being used unfavorably in the course of transactions or negotiations with GS SHOP",
                        ]
                    },
                    { num: "3", title: "Even when GS SHOP demands management information from a Partner Company through legitimate procedures, GS SHOP shall demand only to the minimum extent necessary for the purpose of the demand, and the management information received shall be used only within the scope of the purpose of the demand." },
                  
                ]
            },
            {
                no: "05",
                title: "Prohibition on Other Unfair Trade Practices",
                lead: "In demanding management information, etc., from Partner Companies, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these guidelines, demand management information from Partner Companies in an unreasonable manner, or engage in unfair trade practices such as disadvantaging Partner Companies on the grounds that they do not provide management information, etc., or obstructing the business activities of Partner Companies."
            },
            {
                no: "06",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `If a Partner Company finds that GS SHOP has violated these guidelines in the course of transactions with the Partner Company, or if the Partner Company otherwise has a complaint related to demands for management information, the Partner Company may report the violation to GS SHOP or file a complaint, and in such case GS SHOP shall process the matter in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "07",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these guidelines, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions<br />Article 1 (Effective Date)<br />① These guidelines are enacted and take effect on June 1, 2015.<br />② These guidelines are amended and take effect on August 2, 2018.<br />③ These guidelines are amended and take effect on December 30, 2020.<br />④ These Standards were amended and entered into force on December 30, 2020.<br />⑤ These guidelines are amended and take effect on November 15, 2021.<br />⑥ These Standards were amended and entered into force on August 1, 2025.",
            },
        ],
        // 8. 홈쇼핑 불공정거래행위에 대한 위법성 심사지침 준수 기준
        FairTradeHomeShoppingGuidelineComplianceSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These guidelines are prepared to present detailed requirements regarding the Fair Trade Commission's standards for reviewing the illegality of unfair trade practices in the home shopping business sector, as specified in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies," in order to ensure that GS Retail Co., Ltd. (hereinafter "GS SHOP") faithfully complies with related laws and regulations, and establishes a healthy trading culture based on mutual trust with Partner Companies by ensuring fairness and transparency in the course of transactions with Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: `These guidelines are created based on the "Guidelines for Reviewing the Illegality of Specific Unfair Trade Practices by TV Home Shopping Operators," enacted pursuant to the Act on Fair Transactions in Large-Scale Distribution Industries (hereinafter "Large-Scale Retail Business Act"), to enable GS SHOP employees to easily understand and apply the stipulated matters in their work; accordingly, employees must always familiarize themselves with and comply with these guidelines in the course of consultations or transactions with Partner Companies.` },
                    { num: "2", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "3", title: "This Guideline shall in principle be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) bulletin board, and shall also be disclosed during individual consultation with Partner Companies for their listing for GS SHOP broadcasts." },
                    { num: "4", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training." },
                ],
            },
            {
                no: "03",
                title: "Prohibited Items", 
                lead:"GS SHOP employees shall not engage in unfair trade practices in the course of transactions with Partner Companies, and shall comply with the following:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. Execute a contract in writing immediately upon conclusion of a contract with a Partner Company, provide a copy to the Partner Company, and do not place verbal orders without a formal written contract." },
                    { num: "2", title: "2. Do not induce Partner Companies to deliver products through intermediary distributors (vendors) without justifiable cause, even when it is possible to trade directly with the Partner Company." },
                    { num: "3", title: "3. Do not conduct sales-on-consignment transactions except in special circumstances."},
                    { num: "4", title: "4. Do not transfer to Partner Companies more than 50% of sales promotion event costs such as gift item costs." },
                    { num: "5", title: "5. Do not transfer to Partner Companies more than 50% of price discount costs arising from ARS, lump-sum, and interest-free installment payments, etc." },
                    { num: "6", title: "6. Do not demand or collect additional commissions, or change transaction conditions such as sales commission calculation methods, on the grounds of failing to achieve sales targets, etc." },
                    { num: "7", title: "7. Do not conduct promotional events (promotions, etc.) where Partner Companies bear the costs in direct-purchase transactions." },
                    { num: "8", title: "8. Do not unreasonably transfer to Partner Companies the pre-production costs of broadcasts as a condition of broadcast scheduling." },
                    { num: "9", title: "9. Do not guarantee sales volumes or number of broadcasts prior to conclusion of contracts with Partner Companies." },
                    { num: "10", title: "10. Do not cancel broadcasts or change scheduling times, content, etc., without prior agreement with Partner Companies." },
                    { num: "11", title: "11. Do not coerce the use of a specific company when Partner Companies select courier companies, pre-broadcast production companies, etc." },
                    { num: "12", title: "12. Do not coerce Partner Companies to purchase products in order to achieve high efficiency when launching new products." },
                    { num: "13", title: "13. Do not return directly purchased products to Partner Companies or request exchanges for new products without justifiable cause such as product damage or defacement."},
                    { num: "14", title: "14. Do not obstruct transactions between Partner Companies and competing businesses." },
                    { num: "15", title: "15. Do not demand the provision of Partner Company management information other than information necessary for transactions during onboarding consultations (general status materials, materials necessary for checking financial condition and credit, etc.)." },
                    { num: "16", title: "16. Do not demand the provision of management information such as transaction performance with competing businesses during transactions with Partner Companies." },
                    { num: "17", title: "17. Do not impose disadvantages on Partner Companies on the grounds of reporting unfair practices, etc." },
                    { num: "18", title: "18. Do not delay payment of product sales proceeds." },
                    { num: "19", title: "19. Do not receive or demand money, entertainment, free goods, etc., from Partner Companies." },
                ],
            },
            {
                no: "04",
                title: "Prohibition on Other Unfair Trade Practices",
                lead: "In transactions with Partner Companies, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these guidelines, engage in unfair trade practices equivalent thereto that disadvantage Partner Companies or restrict competition."
            },
            {
                no: "05",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `If a Partner Company finds that GS SHOP has violated these guidelines in the course of transactions with the Partner Company, or if the Partner Company has a complaint regarding GS SHOP, the Partner Company may report the violation to GS SHOP or file a complaint, and in such case GS SHOP shall process the matter in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "06",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these guidelines, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the higher-level standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions<br />Article 1 (Effective Date)<br />① These guidelines are enacted and take effect on April 28, 2017.<br />② These guidelines are amended and take effect on August 2, 2018.<br />③ These guidelines are amended and take effect on December 30, 2020.<br />④ These guidelines are amended and take effect on November 15, 2021.<br />⑤ These guidelines are amended and take effect on August 1, 2025.",
            },
        ],
        // 9.상품선정 및 방송편성 기준과 절차
        FairTradeHomeShoppingProductSelectionSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These Standards are prepared to regulate the matters that GS SHOP employees must comply with in order to fairly and transparently select new products and Partner Companies for GS Retail Co., Ltd.'s (hereinafter "GS SHOP") TV home shopping and data home shopping broadcasts (hereinafter collectively "broadcasts"), to schedule broadcasts based on objective indicators, and thereby strengthen the fairness and objectivity of the product selection and broadcast scheduling process, fostering a sound competitive environment among operators, protecting SMEs and customers, and fulfilling the public service role of broadcasting and GS SHOP's public responsibilities as a broadcasting operator.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "GS SHOP employees must always be familiar with and comply with these Standards during consultations or transactions with Partner Companies." },
                    { num: "2", title: "In addition to these Standards, GS SHOP employees must strictly comply with the provisions of fair trade-related laws and regulations in transactions with Partner Companies, including the Monopoly Regulation and Fair Trade Act, the Act on Fair Transactions in Large-Scale Distribution Industries, and the Broadcasting Act." },
                    { num: "3", title: "These Standards and subsidiary guidelines shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "These Standards shall, in principle, be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) board, and shall also be disclosed during individual onboarding consultations for Partner Companies' GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share these Standards through Partner Company training." },
                    { num: "6", title: "If a product handled by a Partner Company transacting with GS SHOP is an intangible product, the selection criteria and procedures for such intangible products shall be governed by a separate guideline." },
                ],
            },
            {
                no: "03",
                title: "Partner Company Evaluation Criteria", 
                lead:"When selecting Partner Companies for GS SHOP broadcasts, in order to prevent and minimize customer damage in advance, Partner Company reliability shall be evaluated according to the following criteria:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. To measure a Partner Company's past business performance, financial soundness, and stability, only Partner Companies that have received a credit rating above a certain level for each product category, as determined by credit rating agencies, shall be permitted to enter as broadcast partners. The specific criteria for credit ratings are set forth in Appendix 1." },
                    { num: "2", title: "2. In preparation for customer complaints or A/S requests regarding products, the Partner Company's A/S performance capability shall be confirmed, and if it is determined that the Partner Company's A/S performance capability is insufficient, the onboarding proposal may be rejected for customer protection purposes." },
                ],
            },
            {
                no: "04",
                title: "Product Application Procedure",
                items: [
                    { num: "1", title: "Products for GS SHOP broadcasts shall be selected fairly by evaluating products proposed by Partner Companies through the New Product Evaluation Committee." },
                    { num: "2", title: "Products that meet the criteria through paragraph ① must pass quality inspection and review procedures conducted in accordance with the guidelines established for each product category through the quality and safety department and the review department." },
                    { num: "3", title: "Partner Companies may check the progress of the selection procedure for products they have proposed for onboarding online, and may also confirm the status of proposals that have been rejected." },
                ],
            },
            {
                no: "05",
                title: "Composition of the New Product Evaluation Committee",
                items: [
                    { num: "1", title: "The New Product Evaluation Committee shall consist of 2 to 5 internal evaluators from GS SHOP and 12 to 16 external evaluators." },
                    { num: "2", title: "The internal evaluators of the New Product Evaluation Committee shall consist of staff from the product planning and strategy department, product PDs, review staff, and quality and safety staff." },
                    { num: "3", title: "External evaluators of the New Product Evaluation Committee shall be selected from GS SHOP's customers. The method of recruiting external evaluators shall, in principle, be open recruitment through the official website announcement, posting, and similar methods." },
                ],
            },
            {
                no: "06",
                title: "Operation and Functions of the New Product Evaluation Committee",
                items: [
                    { num: "1", title: "The New Product Evaluation Committee shall, in principle, operate on a regular weekly basis, and may also operate when requested by evaluators or when deemed necessary." },
                    { num: "2", title: "The New Product Evaluation Committee shall evaluate fairly through transparent and objective criteria and procedures in selecting products to be sold at GS SHOP." }
                ],
            },
            {
                no: "07",
                title: "Product Evaluation Criteria",
                items: [
                    { num: "1", title: "The New Product Evaluation Committee shall assess the commerciality of products proposed by Partner Companies through item-by-item evaluation and evaluation incorporating final weighting, and products shall be approved in principle if the overall average score across 13 items is 3 or above (out of a maximum of 5 points per item). The evaluation items and detailed evaluation criteria are set forth in Appendix 2." },
                    { num: "2", title: "If the relevant product meets the criteria in paragraph ①, products meeting the following criteria shall, in principle, be given priority selection under identical conditions. The detailed priority selection criteria are set forth in Appendix 3:",
                      details:[
                            "1. Products supplied by SME manufacturers or distributors as defined under Article 2 of the Framework Act on Small and Medium Enterprises and Article 3 of the Enforcement Decree thereof",
                            "2. Products supplied by socially marginalized groups such as persons with disabilities and the elderly, or products intended for such groups",
                            "3. Products where farmers, livestock farmers, or fishermen are the final manufacturer, or products directly supplied by farmers, livestock farmers, or fishermen",
                        ]
                    },
                    { num: "3", title: "Notwithstanding paragraphs ① and ②, products that fall under Article 64 (Prohibited Broadcasts) of the Regulations on the Review of Product Introduction and Sales Broadcasts, or products where there are concerns of violation of broadcast review standards or infringement of laws related to intellectual property rights such as the Patent Act and Trademark Act, may be rejected for onboarding or product selection, and the reason shall be notified to the Partner Company." },
                ],
            },
            {
                no: "08",
                title: "New Product Showcase",
                items: [
                    { num: "1", title: "The responsible MD or relevant team for products selected through the criteria specified in Article 7 may hold a new product showcase to transparently share with employees the results selected through the New Product Evaluation Committee." },
                    { num: "2", title: "The new product showcase shall be held once a month under the auspices of the product planning and strategy department. Employees may freely express opinions on products, and the supervising department and relevant teams may reflect employees' opinions in new product sales plans, etc."},
                ],
            },
            {
                no: "09",
                title: "Quality Inspection Criteria and Procedures",
                items: [
                    { num: "1", title: "When selecting products and Partner Companies for GS SHOP broadcasts, proposed products must undergo the quality approval procedure of GS SHOP's quality and safety department, including quality inspection, process control, and pre-delivery inspection, and products that receive a quality non-conformance determination may be rejected for onboarding or product selection for customer protection purposes." },
                    { num: "2", title: "Quality inspection comprehensively evaluates legal standards, safety, function and performance, packaging condition, etc., through document inspection of various product-related documents, physical inspection, functional/performance testing, and process due diligence, as shown in the table below. The workflow, sample submission method, and quality documents for quality inspection differ by product category and media, and detailed contents are separately posted on the Transparent Trading System for Partner Companies to confirm at any time."},
                ],
                commonTables: [
                    {
                       
                        cols: ["Category", { label: "Detailed Inspection Items", colspan: 2 }],
                        rows: [
                            [
                                { label: "Document Inspection", style: "text-align: center;" },
                                "· Confirmation of product and Partner Company license and permission documents · Confirmation of product function and performance related content",
                                "· Confirmation of all product-related documents",
                            ],
                            [
                                { label: "Physical Inspection", style: "text-align: center;" },
                                "· Product safety and whether there are any external defects · Product specifications, labeling, configuration confirmation · Confirmation of suitability of packaging condition",
                                "· Confirmation of overall product status before delivery to customers",
                            ],
                            [
                                { label: "Performance Inspection", style: "text-align: center;" },
                                "· Product function/performance check and durability confirmation through testing",
                                "· Product durability and function/performance check",
                            ],
                        ],
                    },
                ],
            },
            {
                no: "10",
                title: "Quality Approval",
                items: [
                    { num: "1", title: "Partner Companies must submit samples and related quality documents to GS SHOP's quality and safety staff for quality approval." },
                    { num: "2", title: "When submitting samples, Partner Companies must submit them in the packaging form delivered to customers, and the samples must comply with GS SHOP's packaging standards by product."},
                    { num: "3", title: "GS SHOP must return samples to Partner Companies through courier delivery or other methods in accordance with established procedures after completing sample inspection."},
                ],
            },
            {
                no: "11",
                title: "Broadcast Scheduling and Operation Principles",
                items: [
                    { num: "1", title: "GS SHOP shall establish quantified and measurable evaluation indicators each year, and shall schedule broadcasts fairly and transparently based on objective indicators that differentiate the value by time slot according to customers' viewing patterns, etc." },
                    { num: "2", title: "GS SHOP shall, in scheduling, consider season, time slot, day of the week, time interval from the previous broadcast, etc., and shall avoid consecutively scheduling the same product in the same time slot."},
                    { num: "3", title: "For new products from SMEs, GS SHOP shall, absent special circumstances, provide at least 3 scheduling opportunities, including the launch. However, exceptions shall apply if requested by the Partner Company or if reasons for scheduling disqualification specified in Article 13 apply."},
                    { num: "4", title: "GS SHOP shall not coerce Partner Companies into unreasonable linked scheduling, etc., as a condition of broadcast scheduling." },
                    { num: "5", title: "Specific criteria for complying with paragraph ④ and types of prohibited acts shall be governed by a separate guideline."},
                ],
            },
            {
                no: "12",
                title: "Scheduling Procedure",
                items: [
                    { num: "1", title: "GS SHOP shall establish and operate a dedicated scheduling department for fair and independent broadcast scheduling, and schedule broadcasts through a Scheduling Committee that operates independently and separately from the product selection procedure." },
                    { num: "2", title: "The Scheduling Committee shall have the dedicated scheduling department as the supervising department, and shall consist of scheduling professionals from each department, and shall deliberate for fair and transparent scheduling 10 to 15 days prior to broadcast."},
                    { num: "3", title: "Once scheduling is confirmed by the Scheduling Committee, GS SHOP shall notify Partner Companies of the scheduling results and execute a written contract with Partner Companies for the mutually agreed scheduling results."},
                    { num: "4", title: "To ensure the independence of scheduling, GS SHOP shall confirm all scheduling solely through the Scheduling Committee, and the Scheduling Committee's procedure may not be omitted except in cases requiring urgent scheduling due to force majeure circumstances preventing normal broadcasts (such as responding to transmission accidents)." },
                    { num: "5", title: "If the scheduling is to be cancelled or the scheduling date and time changed, the dedicated scheduling department must confirm in advance that the Partner Company has agreed, and must review the validity of the reason before proceeding."},
                ],
            },
            {
                no: "13",
                title: "Grounds for Scheduling Disqualification",
                lead: "GS SHOP may change or cancel all or part of the scheduling in any of the following cases in order to respond swiftly to changes in the broadcasting environment and provide a satisfying shopping environment for customers. However, in such cases, each reason must be clearly verified and confirmed, and GS SHOP shall give consideration to minimizing the disadvantage to Partner Companies:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. Issues with product quality, safety, etc." },
                    { num: "2", title: "2. Social issues such as customer complaints"},
                    { num: "3", title: "3. Infringement or anticipated infringement of intellectual property rights such as patents and trademarks"},
                    { num: "4", title: "4. Unresolved major customer claims from the previous broadcast" },
                    { num: "5", title: "5. Scheduling disqualification due to Partner Company's inadequate preparation, etc."},
                    { num: "6", title: "6. Other cases similar to the above where it is determined that smooth broadcasting, etc., is severely impossible"},
                ],
            },
            {
                no: "14",
                title: "Scheduling Preference",
                lead: "GS SHOP shall comply with the following when scheduling broadcasts in order to protect SMEs and customers, ensure the public service function of broadcasting, and fulfill its public responsibilities as a broadcasting operator:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. SME products shall be given preferential scheduling at a certain ratio or more among product sales broadcasts" },
                    { num: "2", title: "2. Free sales broadcasts for SMEs, farmers, livestock farmers, and fishermen, and socially marginalized groups such as persons with disabilities and the elderly"},
                    { num: "3", title: "3. Public interest advertisements, ombudsman programs, and viewer information programs for public purposes"},
                    { num: "4", title: "4. Provision of viewing support services for persons with disabilities to guarantee viewing rights, including closed captions, sign language broadcasts, and audio description" },
                    { num: "5", title: "5. Prohibition on sales of harmful products for the protection of youth"},
                ],
            },
            {
                no: "15",
                title: "Suspension of Product Sales",
                lead: "GS SHOP may suspend sales of a product if any of the following circumstances arise in relation to products delivered by Partner Companies or the content of their advertisements. In such cases, GS SHOP shall immediately notify Partner Companies of the specific details related to the sales suspension, including the reason for and period of suspension, and the method, timing, and procedure of sales suspension shall, in principle, be determined through prior consultation with Partner Companies taking into account urgency and importance, except in unavoidable cases:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. Receipt of a warning from a third party regarding infringement of intellectual property rights, etc." },
                    { num: "2", title: "2. Initiation of an investigation by a government agency, etc. (including investigative agencies such as the police and prosecution, and consumer organizations) or receipt of a request for attendance or submission of materials on the grounds of violation of related laws, etc."},
                    { num: "3", title: "3. Cases where it is objectively determined that the Partner Company is unable to conduct normal sales of the relevant product or normal A/S of sold products due to third-party provisional/permanent seizure, provisional/permanent disposition, or debt collection by coercive execution against the Partner Company's major assets"},
                    { num: "4", title: "4. Cases where it is objectively determined that the Partner Company is unable to conduct normal sales of the relevant product, normal A/S of sold products, or customer complaint handling due to the Partner Company's dishonor, bankruptcy, business transfer, closure, or significant deterioration of financial condition" },
                    { num: "5", title: "5. Cases where normal sales and business activities are difficult due to license or permit cancellation, business suspension orders, etc., from supervisory authorities"},
                    { num: "6", title: "6. Cases where customers who purchased the product have applied for collective dispute mediation to the Korea Consumer Agency or filed a consumer group lawsuit in court, or a consumer organization has requested mass exchange, refund, or compensation from GS SHOP for the relevant product, in connection with violations of various product-related standards required by law (safety, hygiene, labeling/advertising, etc.) or issues with product quality, performance, and stability (including accessories) (however, this shall not apply if it is objectively confirmed that the aforementioned standards have not been violated and there are no quality, performance, or stability issues)" },
                    { num: "7", title: "7. Cases where multiple customer claims regarding the relevant product arise due to media reports related to items 1 through 6 (including broadcast previews), resulting in or objectively expected to result in damage to GS SHOP"},
                    { num: "8", title: "8. Cases where the Partner Company refuses without justifiable cause to provide the collateral requested by GS SHOP, or fails to renew it, and the value of the collateral is lost during the contract period"},
                    { num: "9", title: "9. Cases where it is objectively difficult to expect profitability, such as no sales whatsoever occurring for a period of three months for the relevant product" },
                    { num: "10", title: "10. Cases where there are objective circumstances recognizing that smooth supply or delivery of the product is difficult to expect, such as three or more delivery delays (for direct delivery or delegated direct delivery only) occurring within the most recent six months (provided, however, that this shall not apply if the Partner Company demonstrates that there were justifiable reasons for the delivery delay)"},
                ],
            },
            {
                no: "16",
                title: "Grounds for Trade Termination",
                lead: "GS SHOP may request trade suspension and termination from Partner Companies if Partner Companies fall under any of the following criteria, and GS SHOP shall continuously share such criteria with Partner Companies through the Transparent Trading System and Partner Company training:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. Errors in country of origin labeling" },
                    { num: "2", title: "2. Intentional submission of false documents related to quality, advertising, or review"},
                    { num: "3", title: "3. Intentional false or exaggerated advertising" },
                    { num: "4", title: "4. Intentional false orders" },
                    { num: "5", title: "5. Occurrence of grounds for contract cancellation or termination specified in the basic transaction agreement, etc., concluded with Partner Companies"},
                ],
            },
            {
                no: "17",
                title: "Transaction Termination Procedure",
                lead: "GS SHOP may request trade suspension and termination from Partner Companies if Partner Companies fall under any of the following criteria, and GS SHOP shall continuously share such criteria with Partner Companies through the Transparent Trading System and Partner Company training:",
                items: [
                    { num: "1", title: "If GS SHOP intends to terminate transactions with a Partner Company, GS SHOP shall clearly state the termination date and reason in writing and deliver it to the Partner Company." },
                    { num: "2", title: "If the reason for trade termination with a Partner Company is due to the Partner Company's violation of laws, these Standards, or contract provisions, the Partner Company shall be given an opportunity to explain."},
                    { num: "3", title: "GS SHOP shall faithfully fulfill the follow-up procedures arising from trade termination (settlement of payments, return of products, return of Partner Company materials, etc.)." },
                ],
            },
            {
                no: "18",
                title: "Prohibition on Other Unfair Trade Practices",
                lead: "In handling product selection and broadcast scheduling-related matters, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these Standards, engage in any act of abusing its trading position to cause disadvantage to Partner Companies or to impose other unfair trading conditions.",
            },
            {
                no: "19",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `If a Partner Company finds that GS SHOP has violated these Standards in the course of consulting or deciding on transaction conditions with the Partner Company, or if the Partner Company otherwise has a complaint related to the determination of transaction conditions, the Partner Company may report the violation to GS SHOP or file a complaint, and in such case GS SHOP shall process the matter in accordance with the procedures stipulated in the separate standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`,
            },
            {
                no: "20",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these Standards, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the separate standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`,
            },
            {
                no: "21",
                title: "Subsidiary Guidelines",
                usePlainList:true,
                items:[
                    { num: "1", title: "Guideline 1. Standards and Procedures for Intangible Product Selection" },
                    { num: "2", title: "Guideline 2. Guideline for Prohibition on Coercive Acts of Linked Scheduling" },
                ]
            },
            {
                no: "22",
                title: "Appendix",
                usePlainList: true,
                items: [
                    { num: "1", title: "1. Partner Company Evaluation Criteria" },
                    { num: "2", title: "New Product Evaluation Criteria" },
                    { num: "3", title: "New Product Priority Selection Criteria" },
                ],
                commonTables: [
                    {
                        appendixTitle: "Partner Company Evaluation Criteria",
                        tableClass: "tbl_dual_grid",
                        cols: [
                            "Category",
                            "Product Group (Primary)",
                            "Credit Rating",
                            "Product Group (Primary)",
                            "Credit Rating",
                        ],
                        rows: [
                            [{ html: 'TV Home Shopping<br class="p_br" />Partner Company</span><span class="m_txt">TV Home Shopping Partner Companies</span>'/* 260604 번역 */, rowspan: 10, style:"text-align: center !important;", txt_verticle: true }, "Digital Devices/Mobile Phones", "B", "Sports/Leisure/Automotive Products", "CCC"],
                            ["Computers/Gaming Consoles/Software", "B", "Furniture/Interior", "CCC"],
                            ["Large Appliances", "B", "Clothing", "CCC"],
                            ["Home/Small Appliances", "B", "Fashion Accessories", "CCC"],
                            ["Home Health Products", "B", "Underwear", "CCC"],
                            ["Health Foods", "B", "Jewelry/Watches/Accessories/Ornaments", "CCC"],
                            ["General Foods", "B", "Bedding/Curtains", "CCC"],
                            ["Kitchen Appliances", "B", "Baby/Infant/Children", "CCC"],
                            ["Kitchen Utensils", "B", "Musical Instruments/Hobbies/Culture/Pets", "CCC"],
                            ["Cosmetics/Beauty Devices/Perfume", "B", "Travel/Services/Gift Vouchers", "CCC"],
                        ],
                    },
                    {
                        appendixTitle: "[Appendix 2] New Product Evaluation Criteria (Related to Article 7, Paragraph 1)",
                        tableClass: "type_02",
                        theadRows: [
                            [
                                { label: "Category", rowspan: 2 },
                                { label: "Evaluator", rowspan: 2 },
                                { label: "Evaluation Item", rowspan: 2 },
                                { label: "Detailed Evaluation Criteria", colspan: 5 },
                            ],
                            ["5 Points", "4 Points", "3 Points", "2 Points", "1 Point"],
                        ],
                        rows: [
                            [{ html: '<span class="p_txt">Internal Assessment Team</span><span class="m_txt">Internal Assessment Team</span>'/* 260604 번역 */, rowspan: 8, style:"text-align: center !important;", txt_verticle: true }, { html: "PD", rowspan: 2 }, "Differentiation of Appeal Points", "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            ["Product Saleability", "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            [{ html: "Quality & Safety", rowspan: 2 }, "Legal Compliance", "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            ["Usage Safety", "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            [{ html: "Review", rowspan: 2 }, "Review Suitability", "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            ["External Issue Status (Low Risk)", "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            [{ html: "Product Strategy", rowspan: 2 }, "Price Competitiveness", "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            ["Commission Rate Appropriateness", "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            [{ html: '<span class="p_txt">External Assessment Team</span><span class="m_txt">External Assessment Team</span>'/* 260604 번역 */, rowspan: 5, style:"text-align: center !important;", txt_verticle: true }, { html: "Design Excellence", colspan: 2 }, "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            [{ html: "Purchase Intent", colspan: 2 }, "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            [{ html: "Price Competitiveness", colspan: 2 }, "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            [{ html: "Functionality", colspan: 2 }, "Excellent", "Good", "Average", "Insufficient", "Poor"],
                            [{ html: "Market Trend", colspan: 2 }, "Excellent", "Good", "Average", "Insufficient", "Poor"],
                        ],
                    },
                    {
                        appendixTitle: "[Appendix 3] New Product Priority Selection Criteria (Related to Article 7, Paragraph 2)",
                        tableClass: "appendix_new_product_priority",
                        cols: [
                            "Evaluation Content",
                            { label: "Detailed Evaluation Criteria", colspan: 2 },
                        ],
                        rows: [
                            [{ label: "SME", style: "text-align: center;" },
                             "Cases where the manufacturer or Partner Company qualifies as an SME pursuant to the Framework Act on Small and Medium Enterprises", "Product MD confirms size of the enterprise through Korea Credit Information after verifying business registration certificate"],
                            [{ label: "Disadvantaged Groups", style: "text-align: center;" },
                             "Products supplied by socially marginalized groups such as persons with disabilities and the elderly, or products intended for such groups", "Product MD receives relevant supporting documents through the trading partner and submits to the product planning and strategy department"],
                            [ { label: "Agricultural/Livestock/Fishery Foods", style: "text-align: center;" },
                              "Products where farmers, livestock farmers, or fishermen are the final manufacturer or directly supply the product", "Applicable only to food-related business units; product MD obtains approval from food team leader"],
                        ],
                    },
                ],
                cautionItems: [
                    "Maximum 5 points per item; approved if overall average is 3 or above",
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Article 1 (Effective Date)<br />① These Standards are enacted and take effect on May 9, 2016.<br />② These Standards are amended and take effect on January 1, 2017.<br />③ These Standards are amended and take effect on August 2, 2018.<br />④ These Standards are amended and take effect on December 30, 2020.<br />⑤ These Standards are amended and take effect on November 15, 2021.<br />⑥ These Standards are amended and take effect on August 1, 2025.",
            },
        ],
        // 10.무형상품 선정 기준과 절차
        FairTradeHomeShoppingIntangibleProductSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These guidelines set out detailed criteria and procedures for selecting intangible products introduced and sold in the TV home shopping and data home shopping broadcasts (hereinafter collectively "broadcasts") operated by GS Retail Co., Ltd. (hereinafter "GS SHOP"), as specified in the higher-level standard, the "Standards and Procedures for Product Selection and Broadcast Scheduling," with the purpose of enabling GS SHOP to select intangible products objectively and fairly so as to protect consumers and fulfill the public responsibilities of broadcasting.`,
            },
            {
                no: "02",
                title: "Definitions and Basic Principles",
                items: [
                    { num: "1", title: "The definitions of key terms used in these guidelines are as follows:",
                        details: [
                            "1. “Intangible product” means a product that has no fixed form—such as travel products, construction products, or car rentals—or for which, even if a tangible item is involved, the right to use or the provision of a service constitutes the essence of the transaction."/* 260604 번역 */,
                            "2. “Partner Company” means, among the ‘suppliers’ under Article 2, item 2 of the 「Act on Fair Transactions in Large Retail Business (hereinafter the ‘Large Retail Business Act’)」, a party that has concluded a basic transaction contract (store-opening contract) with GS SHOP."/* 260604 번역 */,
                            "3. “Consumer” means a person who purchases an intangible product from GS SHOP to consume, use, or utilize it."/* 260604 번역 */
                        ],
                    },
                    { num: "2", title: "In addition to these guidelines, GS SHOP executives and employees must strictly comply, in transactions with partner companies, with the fair trade-related laws such as the 「Monopoly Regulation and Fair Trade Act (hereinafter the ‘Fair Trade Act’)」 and the Large Retail Business Act, as well as the matters stipulated in the 「Broadcasting Act」."/* 260604 번역 */ },
                    { num: "3", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "These guidelines shall, in principle, be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) board, and shall also be disclosed during individual onboarding consultations for Partner Companies' GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training." },
                ],
            },
            {
                no: "03",
                title: "Scope of Exclusion", 
                lead:"For intangible products under Article 2, paragraph 1, item 1 that are sold by GS SHOP in the capacity of an agent (dealer) after concluding a sales agency agreement with a Partner Company, if the relevant Partner Company and its products satisfy all qualification requirements for manufacturing and sales required by law, these guidelines shall not separately apply.",
            },
            {
                no: "04",
                title: "Partner Company Selection Procedure and Criteria",
                items: [
                    { num: "1", title: `When a specific company requests new onboarding, GS SHOP shall evaluate whether the company meets Partner Company qualifications, etc., through the review of GS SHOP's internal Pre-Risk Review Committee (hereinafter "Risk Review Committee"), and then select the Partner Company.` },
                    { num: "2", title: "Companies that have proposed onboarding may check online the progress of their onboarding proposal and the status of proposals that have been rejected." },
                    { num: "3", title: "When selecting partner companies, GS SHOP selects them by considering the following factors. In this case, the detailed criteria for item 1 shall be as set forth in Appendix 1."/* 260604 번역 */,
                      details:[
                          "1. The company's credit rating"/* 260604 번역 */,
                          "2. Whether the company holds the licenses/permits required under the laws related to the intangible product"/* 260604 번역 */,
                          "3. In the case of travel products, whether guarantee insurance under the Tourism Promotion Act has been subscribed to"/* 260604 번역 */,
                          "4. Whether guarantee insurance under other laws related to the intangible product has been subscribed to"/* 260604 번역 */,
                          "5. Whether the consumer protection mechanisms for the intangible product proposed by the company are in place"/* 260604 번역 */,
                      ]
                    },
                    { num: "4", title: "When selecting partner companies, GS SHOP may exclude from partner company selection, or request supplementation through measures such as increasing guarantee insurance, any company falling under any of the following grounds."/* 260604 번역 */,
                      details:[
                          "1. Where it is determined that the risk of the company's closure or bankruptcy is very high upon comprehensive review of management-related data such as financial statements voluntarily provided by the company, or objectively obtainable external information such as credit ratings"/* 260604 번역 */,
                          "2. Where the company fails to appropriately provide and maintain the means of securing performance of the intangible product supply contract to GS SHOP and customers"/* 260604 번역 */,
                          "3. Where it is judged that the company lacks the ability to perform the intangible product after-sales service agreement"/* 260604 번역 */,
                          "4. Where it is judged that the company's intangible product falls under Article 64 (Prohibition of Broadcast) of the 「Regulations on the Deliberation of Product Introduction and Sales Broadcasts」, or that there is otherwise room for it to be problematic—such as room for violation of other deliberation rules, or conflict with intellectual property-related laws such as the Patent Act or Trademark Act, etc."/* 260604 번역 */
                      ]
                    }
                ],
            },
            {
                no: "05",
                title: "Intangible Product Selection Procedure and Criteria",
                items: [
                    { num: "1", title: "GS SHOP shall select products after evaluating the eligibility of the intangible products proposed by Partner Companies through the Risk Review Committee, and in doing so, GS SHOP may simultaneously evaluate and select the intangible products of a new company together with the Partner Company selection procedure. However, after new onboarding, if there are no changes to the requirements specified in Article 4, paragraphs 3 and 4, such as the Partner Company's credit rating and consumer protection mechanisms, the relevant intangible product business division may operate without a separate evaluation by the Risk Review Committee." },
                    { num: "2", title: "Even if an intangible product has been reviewed by the Risk Review Committee, it must be re-reviewed if the scope of services provided to consumers changes thereafter."},
                    { num: "3", title: "Intangible products evaluated by the Risk Review Committee must undergo quality inspection and broadcast review procedures conducted in accordance with the guidelines established for each product category through the quality and safety department and the review department."},
                    { num: "4", title: "GS SHOP shall evaluate intangible products by considering the following elements when selecting them:",
                        details:[
                          "1. Price and composition of the product",
                          "2. Differentiation of the product",
                          "3. Competitiveness of the product",
                          "4. Whether stable service provision is possible (e.g., if the seller and manufacturer of the intangible product are different, confirmation of the contractual relationship between the two parties)",
                          "5. Whether consumer protection mechanisms are in place (e.g., withdrawal period, notification methods, etc.)"
                        ]
                    },
                ],
            },
            {
                no: "06",
                title: "Composition of the Risk Review Committee",
                items: [
                    { num: "1", title: "The Risk Review Committee shall consist of approximately 6 evaluators." },
                    { num: "2", title: "The evaluators of the Risk Review Committee shall consist of GS SHOP product planning and strategy business staff, financial and accounting business staff, legal affairs or compliance business staff, consumer protection business staff, review staff, etc., and may be varied depending on the type of risk." }
                ],
            },
            {
                no: "07",
                title: "Convening, Operation, and Functions of the Risk Review Committee",
                items: [
                    { num: "1", title: "The Risk Review Committee shall operate online to promptly evaluate proposals from Partner Companies." },
                    { num: "2", title: "The operation of the Risk Review Committee shall be administered by the consumer protection affairs department." },
                    { num: "3", title: "The Risk Review Committee shall fairly and transparently review and evaluate intangible product risks in accordance with the procedures and criteria of Article 5." },
                ],
            },
            {
                no: "08",
                title: "Consumer Protection Standards",
                items: [
                    { num: "1", title: `GS SHOP and Partner Companies, in selling products to consumers, shall comply with the Consumer Protection Act (hereinafter "Consumer Protection Act"), the Act on the Consumer Protection in Electronic Commerce (hereinafter "Electronic Commerce Act"), the Regulations on Broadcast Review, and the Regulations on the Review of Product Introduction and Sales Broadcasts, and shall endeavor to protect and promote consumers' rights and interests.` },
                    { num: "2", title: "GS SHOP and Partner Companies shall provide consumers with accurate information on products sold, including the identity of the service provider, the method of withdrawal, and whether the product is covered by liability insurance."},
                    { num: "3", title: "GS SHOP and Partner Companies shall faithfully fulfill the obligations of business operators pursuant to Article 19 of the Consumer Protection Act."},
                    { num: "4", title: "If GS SHOP sells consulting or introduced products pursuant to a Partner Company's consignment for sales, GS SHOP shall notify consumers in a manner recognizable pursuant to the Electronic Commerce Act that GS SHOP is not the contracting party for product sales."},
                    { num: "5", title: "If a consumer is damaged in the process of purchasing, using, or obtaining a refund for a product through GS SHOP, GS SHOP shall bear the responsibility pursuant to the Electronic Commerce Act and related laws, and if GS SHOP bears direct liability for compensation to consumers pursuant to related laws, the specific method of damage relief and dispute resolution procedure shall follow related laws and the Consumer Dispute Resolution Standards."},
                ],
            },
            {
                no: "09",
                title: "Scheduling Procedure",
                items: [
                    { num: "1", title: "GS SHOP shall establish and operate a dedicated scheduling department for fair and independent broadcast scheduling, and schedule broadcasts through a Scheduling Committee that operates independently and separately from the product selection procedure." },
                    { num: "2", title: "The Scheduling Committee shall have the dedicated scheduling department as the supervising department, and shall consist of scheduling professionals from each department, and shall deliberate for fair and transparent scheduling within the period from 10 to 15 days prior to broadcast."},
                    { num: "3", title: "Once scheduling is confirmed by the Scheduling Committee, GS SHOP shall notify Partner Companies of the scheduling results and execute a written contract with Partner Companies for the mutually agreed scheduling results." },
                    { num: "4", title: "To ensure the independence of scheduling, GS SHOP shall confirm all scheduling solely through the Scheduling Committee, and the Scheduling Committee's procedure may not be omitted except in cases requiring urgent scheduling due to force majeure circumstances preventing normal broadcasts (such as responding to transmission accidents)."},
                ],
            },
            {
                no: "10",
                title: "Grounds for Scheduling Disqualification",
                lead: "GS SHOP may change or cancel all or part of the scheduling in any of the following cases in order to respond swiftly to changes in the broadcasting environment and provide a satisfying shopping environment for customers. However, in such cases, each reason must be clearly verified and confirmed, and GS SHOP shall give consideration to minimizing the disadvantage to Partner Companies:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. Issues with product quality, safety, etc." },
                    { num: "2", title: "2. Social issues such as customer complaints"},
                    { num: "3", title: "3. Infringement or anticipated infringement of intellectual property rights such as patents and trademarks"},
                    { num: "4", title: "4. Unresolved major customer claims from the previous broadcast" },
                    { num: "5", title: "5. Scheduling disqualification due to Partner Company's inadequate preparation, etc."},
                    { num: "6", title: "6. Other cases similar to the above where it is determined that smooth broadcasting, etc., is severely impossible"},
                ],
            },
            {
                no: "11",
                title: "Criteria for Trade Suspension and Exit",
                lead: `The criteria for trade suspension and exit with Partner Companies shall follow the provisions of Chapter 7 (Criteria for Trade Suspension and Exit) of GS SHOP's "Standards and Procedures for Product Selection and Broadcast Scheduling."`
            },
            {
                no: "12",
                title: "Prohibition on Other Unfair Trade Practices",
                lead: "In handling intangible product selection-related matters, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these guidelines, engage in any act of abusing its trading position to cause disadvantage to Partner Companies or to impose other unfair trading conditions."
            },
            {
                no: "13",
                title: "Receipt and Processing of Complaints and Reports",
                lead: `If a Partner Company finds that GS SHOP has violated these guidelines in the course of consulting or deciding on intangible product-related transaction conditions with the Partner Company, or if the Partner Company otherwise has a complaint related to the determination of transaction conditions, the Partner Company may report the violation to GS SHOP or file a complaint, and in such case GS SHOP shall process the matter in accordance with the procedures stipulated in the separate standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`,
            },
            {
                no: "14",
                title: "Sanctions",
                lead: `If a GS SHOP employee is confirmed to have violated the provisions set forth in these guidelines, sanction proceedings shall be initiated against the relevant employee in accordance with the procedures stipulated in the separate standard, the "Standards and Procedures for Fair Transactions with Partner Companies."`,
            },
            {
                no: "15",
                title: "Appendix",
                lead: "1. Partner Company Credit Rating Criteria",
                commonTables: [
                    {
                        appendixTitle: "1. Partner Company Credit Rating Criteria<br />[Appendix 1] Partner Company Credit Rating Criteria (Related to Article 4, Paragraph 3, Item 1)",
                        tableClass: "tbl_dual_grid",
                        cols: [
                            "Category",
                            "Product Group (Primary)",
                            "Credit Rating",
                            "Product Group (Primary)",
                            "Credit Rating",
                        ],
                        rows: [
                            [{ html: 'TV Home Shopping<br class="p_br" />Partner Company</span><span class="m_txt">TV Home Shopping Partner Companies</span>'/* 260604 번역 */, rowspan: 10, style:"text-align: center !important;", txt_verticle: true }, "Digital Devices/Mobile Phones", "B", "Sports/Leisure/Automotive Products", "CCC"],
                            ["Computers/Gaming Consoles/Software", "B", "Furniture/Interior", "CCC"],
                            ["Large Appliances", "B", "Clothing", "CCC"],
                            ["Home/Small Appliances", "B", "Fashion Accessories", "CCC"],
                            ["Home Health Products", "B", "Underwear", "CCC"],
                            ["Health Foods", "B", "Jewelry/Watches/Accessories/Ornaments", "CCC"],
                            ["General Foods", "B", "Bedding/Curtains", "CCC"],
                            ["Kitchen Appliances", "B", "Baby/Infant/Children", "CCC"],
                            ["Kitchen Utensils", "B", "Musical Instruments/Hobbies/Culture/Pets", "CCC"],
                            ["Cosmetics/Beauty Devices/Perfume", "B", "Travel/Services/Gift Vouchers", "CCC"],
                        ],
                    },
                ],
                cautionItems: [
                    "※ To support the distribution channels of new SME Partner Companies, if a company has not received a credit rating from a credit rating agency within 3 years of business registration, or does not meet the above credit rating criteria, the credit rating may be substituted through measures such as increasing liability insurance coverage.",
                ],
                
            },
            {
                no: "",
                title: "Supplementary Provisions",
                addendumText: "Supplementary Provisions<br />Article 1 (Effective Date)<br />① These guidelines are enacted and take effect on January 1, 2019.<br />② These guidelines are amended and take effect on December 30, 2020.<br />③ These guidelines are amended and take effect on November 15, 2021.<br />④ These guidelines are amended and take effect on August 1, 2025.",
            },
        ],
        // 11. 연계편성의 부당한 강요행위 금지 기준
        FairTradeHomeShoppingLinkedProgrammingSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These guidelines set out detailed requirements regarding the prohibition on coercive acts of unjust linked scheduling, as specified in the higher-level standard, the "Standards and Procedures for Product Selection and Broadcast Scheduling," in order to ensure that Partner Companies are guaranteed autonomy and fair opportunities related to broadcast scheduling, etc., from GS Retail Co., Ltd. (hereinafter "GS SHOP"), and that GS SHOP and Partner Companies maintain a relationship of continuous cooperation.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "GS SHOP employees must familiarize themselves with and comply with these guidelines when consulting with Partner Companies for broadcasts."},
                    { num: "2", title: `In addition to these guidelines, GS SHOP employees must strictly comply with the provisions of fair trade-related laws and regulations in transactions with Partner Companies, including the Monopoly Regulation and Fair Trade Act, the Act on Fair Transactions in Large-Scale Distribution Industries, and related fair trade laws and regulations (hereinafter collectively "fair trade-related laws and regulations") and the Broadcasting Act.` },
                    { num: "3", title: "This Guideline shall apply only to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." },
                    { num: "4", title: "This Guideline shall in principle be announced through the official website (http://www.gsretail.com) or the GS SHOP Transparent Trading System (http://withgs.gsshop.com) bulletin board, and shall also be disclosed during individual consultation with Partner Companies for their listing for GS SHOP broadcasts." },
                    { num: "5", title: "GS SHOP shall continuously notify and share this Guideline through Partner Company training." },
                    { num: "6", title: "GS SHOP shall prepare for and conduct sales broadcasts in accordance with fair and transparent principles." },
                ],
            },
            {
                no: "03",
                title: "Definition of Terms", 
                items: [
                    { num: "1", title: `"Sponsorship" refers to a party not involved in the production of a broadcast program providing, directly or indirectly, expenses, goods, services, personnel, or locations necessary for the production of the broadcast program.`},
                    { num: "2", title: `"Linked Scheduling" refers to scheduling the same product on a program on a channel other than the home shopping channel at a time similar to the home shopping channel and having it introduced through sponsorship.` },
                    { num: "3", title: `"Coercion" refers to an act of compelling a trading counterpart to perform a certain act or make a certain decision against the trading counterpart's will by exploiting a superior trading relationship, etc., even though the trading counterpart has no intention of performing the act or paying the costs.` },
                ],
                
            },
            {
                no: "04",
                title: "Prohibition on Determination, Cancellation, and Change of Scheduling Based on Presence or Absence of Linked Scheduling",
                items: [
                    { num: "1", title: "GS SHOP shall not unfairly determine, cancel, or change the date, time, duration, and production costs of product sales broadcasts on the condition of linked scheduling by Partner Companies." },
                    { num: "2", title: `GS SHOP's scheduling supervisors and scheduling staff shall comply with the scheduling principles of Article 4 (Broadcast Scheduling and Operation Principles) of GS SHOP's "Standards and Procedures for Product Selection and Broadcast Scheduling," and shall not unfairly determine, cancel, or change scheduling due to the direct or indirect influence of whether Partner Company products are linked-scheduled on terrestrial or general programming channels (hereinafter "general programming channels").` },
                ],
            },
            {
                no: "05",
                title: "Prohibition on Coercion of Sponsorship and Linked Scheduling Planning and Production",
                items: [
                    { num: "1", title: "GS SHOP shall not coerce Partner Companies to engage in advertising for their products, such as by requesting that Partner Companies provide sponsorship to other broadcasting operators or independent production companies." },
                    { num: "2", title: "GS SHOP's product planners (MDs) shall not use the fact that a Partner Company's products are currently sponsoring or plan to sponsor a terrestrial or general programming channel program as a basis for determining the onboarding or sales of the Partner Company's products, and shall not require Partner Companies to provide information on the current status or plans for sponsorship of products during the review process."},
                ],
            },
            {
                no: "06",
                title: "Prohibition on Involvement in the Planning and Preparation Stage of Linked Scheduling",
                items: [
                    { num: "1", title: "When a Partner Company conducts product sales broadcasts through GS SHOP and proceeds with sponsorship, linked scheduling (advertising activities), etc., through other broadcasting companies for the purpose of advertising the relevant products, such acts are within the scope of the Partner Company's own judgment and execution, and GS SHOP shall not be involved in any part of the entire process related to the Partner Company's linked scheduling." },
                    { num: "2", title: "Since a Partner Company's sponsorship or linked scheduling (advertising activities) through other broadcasting companies other than GS SHOP is entirely unrelated to the preparation and conduct of GS SHOP's product sales broadcasts, the Partner Company may not ask GS SHOP's opinion on the execution thereof, nor shall GS SHOP present any opinions or benefits related to the Partner Company's linked scheduling. It is hereby clarified that the decision-making and execution responsibility for such acts is entirely within the Partner Company's own domain. Furthermore, GS SHOP shall not demand information from Partner Companies regarding such acts." }
                ],
            },
            {
                no: "07",
                title: "Prohibition on Sharing Sponsorship and Linked Scheduling Production Costs",
                items: [
                    { num: "1", title: "It is hereby mutually confirmed that a Partner Company's sponsorship or advertising activities are not promotional activities utilized in GS SHOP's product sales broadcasts." },
                    { num: "2", title: "GS SHOP shall bear all costs related to program production required for product sales broadcasts, and matters additionally requested by Partner Companies shall be separately determined by mutual agreement in accordance with the Broadcasting Act and fair trade-related laws and regulations. GS SHOP shall not bear any costs whatsoever incurred for a Partner Company's sponsorship, linked scheduling (advertising activities), etc., through other broadcasting companies that are not directly related to GS SHOP's product sales broadcasts." },
                ],
            },
            {
                no: "08",
                title: "Prohibition on Other Unfair Trade Practices",
                lead: "In transactions with Partner Companies, GS SHOP shall not, even if not explicitly stipulated as an obligation or prohibition in these guidelines, engage in unfair trade practices equivalent thereto that disadvantage Partner Companies or restrict competition."
            },
            {
                no: "09",
                title: "Receipt and Processing of Complaints and Reports",
                items: [
                    { num: "1", title: "If a Partner Company finds that a GS SHOP employee has violated these guidelines or has a complaint due to unfair treatment, etc., in the course of transactions with GS SHOP, the Partner Company may report the violation or file a complaint through channels such as Red Whistle on the GS SHOP website or Transparent Trading System." },
                    { num: "2", title: `GS SHOP shall confirm the facts through due diligence and auditing by GS SHOP's audit affairs department, legal affairs or compliance affairs department, etc. (hereinafter "audit affairs department, etc.") regarding reports received under paragraph ①, and shall notify the relevant Partner Company of the results of the report processing, including the facts investigated, sanctions taken against the relevant employees, remedies for Partner Company damage, and recurrence prevention measures.`},
                    { num: "3", title: "GS SHOP shall protect the information and personal details of Partner Companies and their related parties as confidential information in the process of handling Partner Company reports under this Article and thereafter, and shall ensure that Partner Companies do not receive unfair differential treatment or suffer retaliatory measures such as trade suspension due to reporting." },
                    { num: "4", title: "GS SHOP shall make every effort to resolve complaints and grievances of Partner Companies arising in the course of transactions with Partner Companies, and shall endeavor to prevent recurrence."},
                ],
            },
            {
                no: "10",
                title: "Sanctions",
                items: [
                    { num: "1", title: "If GS SHOP's audit affairs department, etc., becomes aware — through a Partner Company's report or ex officio — that a GS SHOP employee has violated these guidelines, fair trade-related laws and regulations, the ethics code of conduct guidelines, or other company regulations, GS SHOP shall immediately investigate the relevant employee's violation, and if confirmed as fact, shall report to the Ethics Committee, which shall make the final decision on whether and to what extent to sanction the relevant employee." },
                    { num: "2", title: "If a GS SHOP employee's violation constitutes fraud, embezzlement, breach of trust, bribery, improper solicitation and acceptance of money and valuables, etc., requiring criminal liability, GS SHOP may file a criminal complaint against the relevant employee with investigative authorities for objective fact-finding and recurrence prevention."},
                ],
            },
            {
                no: "11",
                title: "Supervising and Responsible Departments",
                items: [
                    { num: "1", title: "The supervising department of these guidelines shall be the broadcast business support affairs department. The supervising department shall oversee the interpretation of these guidelines and, when necessary, the coordination of work among teams related to the relevant matter." },
                    { num: "2", title: "The responsible department of these guidelines shall be the food product group sales department. The responsible department shall manage compliance with these guidelines and the management of established standards in consultation with related departments including the scheduling department, sales strategy department, and product planning and strategy department."},
                ],
               
            },
            {
                no: "",
                title: "Supplementary Provisions",
                addendumText: "Supplementary Provisions<br />Article 1 (Effective Date)<br />① These guidelines are enacted and take effect on January 1, 2021.<br />② These guidelines are amended and take effect on November 15, 2021.<br />③ These guidelines are amended and take effect on August 1, 2025.",
            },
        ], 
        //12. 불공정거래행위로 인한 협력사 피해 보상 기준
        FairTradeHomeShoppingDamageCompensationSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These Standards are prepared to set out the details concerning Partner Company damage compensation procedures, and the composition and operation of the Damage Compensation Council (hereinafter "Council"), in cases where GS Retail Co., Ltd. (hereinafter "GS SHOP") violates prohibited act provisions under fair trade-related laws and regulations, including the Monopoly Regulation and Fair Trade Act and the Act on Fair Transactions in Large-Scale Distribution Industries (hereinafter collectively "fair trade-related laws and regulations"), in the course of transactions for TV home shopping and data home shopping broadcasts (hereinafter collectively "broadcasts") with Partner Companies, thereby causing damage to Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "If a Partner Company suffers damage due to GS SHOP's unfair trade practices, GS SHOP shall make its best efforts to compensate for the Partner Company's damage through objective and transparent procedures."},
                    { num: "2", title: "These Standards apply exclusively to Partner Companies conducting broadcasts through GS SHOP and transactions with such Partner Companies." }, 
                ],
            },
            {
                no: "03",
                title: "Subjects of Damage Compensation", 
                items: [
                    { num: "1", title: "The subject of damage compensation under these Standards shall be Partner Companies that have suffered damage due to GS SHOP's violation of prohibited act provisions under fair trade-related laws and regulations in the course of transactions with GS SHOP, where the relevant damaged Partner Company has reported the damage through GS SHOP's unfair trade practice reporting channel (Red Whistle, etc.) and applied for compensation."},
                    { num: "2", title: "The Council may dismiss a Partner Company's damage compensation application if it is evident that the Partner Company's reported case does not constitute a violation of prohibited acts under fair trade-related laws and regulations, or if the causal relationship with the damage suffered by the Partner Company is unclear, or if it is impossible to identify what damage has occurred to the Partner Company." },
                ],
                
            },
            {
                no: "04",
                title: "Case Investigation",
                items: [
                    { num: "1", title: "If a Partner Company's reported case received through the reporting channel falls under the subject of damage compensation under these Standards, the Council shall immediately conduct an investigation of GS SHOP's unfair trade practices and the scale of damage suffered by the Partner Company, targeting GS SHOP employees and the relevant Partner Company, for fact-finding purposes." },
                    { num: "2", title: "The Council may delegate the fact-finding duties under paragraph ① to the internal audit affairs department for objective and transparent investigation." },
                    { num: "3", title: "The Council may refer to related enforcement decrees, public notices, and guidelines in addition to fair trade-related laws and regulations in order to determine whether specific acts constitute legal violations." },
                ],
            },
            {
                no: "05",
                title: "General Assembly",
                items: [
                    { num: "1", title: "Upon completion of the case investigation under Article 4, the audit affairs department shall immediately report the investigation results to the Council. If the Council determines that there are errors or deficiencies in the investigation results, the Council may request re-investigation or additional investigation." },
                    { num: "2", title: "If the Council determines that the case investigation is complete, the Council shall convene a General Assembly to deliberate and resolve on compensation plans, etc., for the damaged Partner Company."},
                    { num: "3", title: "The matters under the jurisdiction of the General Assembly are as follows:",
                      details:[
                          "1. Deliberation on compensation plans for damage compensation application cases",
                          "2. Resolution on compensation plans for damage compensation application cases",
                          "3. Decision on dismissal if it is evident that the damage compensation application case does not fall under the subject of damage compensation under these Standards",
                      ]
                    },
                ],
            },
            {
                no: "06",
                title: "Presentation of Compensation Plan",
                items: [
                    { num: "1", title: "In principle, the Council shall notify Partner Companies of compensation plans resolved at the General Assembly within 14 days from the date of resolution." },
                    { num: "2", title: "If the Partner Company notified of the compensation plan under paragraph ① accepts it, GS SHOP shall without delay consult with the Partner Company on the specific compensation plan, procedure, etc." },
                    { num: "3", title: "If the Partner Company notified of the compensation plan under paragraph ① refuses it, the Council shall convene a General Assembly once more to re-deliberate and re-resolve the compensation plan." }
                ],
            },
            {
                no: "07",
                title: "Termination of Procedure",
                lead: "The Council shall terminate the damage compensation procedure in any of the following cases:",
                usePlainList: true,
                items: [
                    { num: "1", title: "1. If the damaged Partner Company accepts the Council's compensation plan" },
                    { num: "2", title: "2. If the damaged Partner Company withdraws the report on its own or requests termination of the procedure" },
                    { num: "3", title: "3. If the damaged Partner Company refuses the Council's final compensation plan under Article 6" },
                    { num: "4", title: "4. If the damaged Partner Company files a report with the Fair Trade Commission, etc., applies for mediation through the Korea Fair Trade Mediation Agency, etc., or files a lawsuit in court with respect to the relevant case, separately from the report through GS SHOP's reporting channel" },
                ],
            },
            {
                no: "08",
                title: "Composition of the Council",
                items: [
                    { num: "1", title: "The chairperson of the Council shall be designated as the fair trade Voluntary Compliance manager. The chairperson shall oversee all Council affairs as the representative of the Council and preside over meetings." },
                    { num: "2", title: "The members of the Council shall consist of department heads in the compliance, legal affairs, audit, and external relations fields, one person from among practitioners in fair trade or ethical management, and one person from among practitioners in sales or business strategy; and an external legal expert may be included as necessary for objectivity and fairness." },
                    { num: "3", title: "The external legal expert shall participate in the damage compensation procedures of Chapter 3 and provide the Council with opinions on the illegality of the damage facts and the validity of the compensation plan." },
                    { num: "4", title: "The chairperson may add or exclude members as deemed necessary for rational decision-making." },
                ],
            },
            {
                no: "09",
                title: "Meeting Proceedings and Resolutions of the Council",
                lead: "The General Assembly shall be presided over by the chairperson, and shall be convened with the attendance of a majority of incumbent members, and resolutions shall be adopted with the approval of a majority of attending members."
            },
            {
                no: "10",
                title: "Referral to the Ethics Committee",
                lead: "If the Council confirms, in connection with a Partner Company's damage compensation application case, that a GS SHOP employee has violated applicable laws, internal standards, or ethical norms, etc., the Council shall refer the relevant case and employee to the Ethics Committee."
            },
            {
                no: "11",
                title: "Recurrence Prevention",
                items: [
                    { num: "1", title: "If the Council confirms GS SHOP's unfair trade practices in connection with a Partner Company's damage compensation application case, the Council shall immediately request the relevant departments to prevent recurrence and to formulate a specific plan for doing so." },
                    { num: "2", title: "The relevant department that receives the request under paragraph ① from the Council shall formulate a recurrence prevention plan and report it to the Council, and shall report the results immediately upon completion of recurrence prevention measures."},
                ],
               
            },
            {
                no: "",
                title: "Supplementary Provisions",
                addendumText: "Supplementary Provisions<br />Article 1 (Effective Date)<br />① These Standards are enacted on December 26, 2016 and take effect on January 1, 2017.<br />② These Standards are amended and take effect on December 30, 2020.<br />③ These Standards are amended and take effect on November 15, 2021.<br />④ These Standards are amended and take effect on November 30, 2022.<br />⑤ These Standards are amended and take effect on August 1, 2025.",
            },
        ],

        // 1. 파트너사 선정 및 운용기준
        FairTradePartnerStandardSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These standards aim to enhance transparency and fairness in the process of selecting and operating partner companies (hereinafter "Partner Company") in partnership with GS Retail Co., Ltd. (hereinafter "the Company"), to establish a rational and fair trade order, and to fulfill social responsibility in providing safe products to customers.`,
            },
            {
                no: "02",
                title: "Compliance Obligation",
                items: [
                    { num: "1", title: "The Company's employees must strictly comply with relevant laws and regulations, including the Monopoly Regulation and Fair Trade Act and the Act on Fair Transactions in Large-Scale Retail Business, in addition to these standards when transacting with Partner Companies." },
                    { num: "2", title: "These standards shall be posted on the Company's website, etc. for Partner Companies to check at any time, and internal employees shall be regularly trained to comply with them." },
                ],
            },
            {
                no: "03",
                title: "Definition of Terms",
                definitions: [
                    { term: "1", desc: `"Partner Company" refers to a business entity that is expected to be or is currently engaged in product supply transactions, etc. with the Company.` },
                    { term: "2", desc: `"Partner Company Pool" refers to the group of Partner Companies registered in the master system and managed and operated according to the standards set by the Company.` },
                    { term: "3", desc: `"Selection of Partner Company" means registration in the Company's Partner Company Pool.` },
                    { term: "4", desc: `"Operation of Partner Company" means the management of the Partner Company Pool according to certain standards, including granting the opportunity to commence transactions with companies selected and registered as Partner Companies, and cancellation of registration.` },
                ],
            },
            {
                no: "04",
                title: "Partner Company Selection Criteria",
                lead: "The Company must ensure fairness in the selection criteria for commencing transactions when selecting Partner Companies, and shall select Partner Companies based on the following criteria to secure trust and soundness with customers and third parties.",
                criteria: [
                    { term: "Expertise", details: ["Product development capability", "Price competitiveness", "Promotional capability", "Years in business"] },
                    { term: "Credibility", details: ["Credit rating", "Cash flow", "Collateral capability", "Transaction record"] },
                    { term: "ESG Criteria", details: ["Environment", "Safety and health", "Labor and human rights", "Code of ethics", "Anti-corruption and legal compliance"] },
                    { term: "Other criteria based on product characteristics (hygiene, certification, delivery capability, etc.)", desc: "" },
                ],
            },
            {
                no: "05",
                title: "Partner Company Application Procedure",
                lead: "The Partner Company selection procedure shall proceed fairly and transparently in the following order:",
                usePlainList:true,
                items: [
                    { num: "1", title: "1. Application for consultation by attaching documents such as the partnership application form, company profile, and product proposal through the Business Inquiry page on the Company's website (www.gsretail.com)" },
                    { num: "2", title: "2. Notification of document review results within 10 business days from the consultation application receipt date" },
                    { num: "3", title: "3. If document review is passed, a consultation is scheduled and conducted" },
                    { num: "4", title: "4. Final partnership decision made through fair quantitative evaluation of submitted documents, consultation results, and other factors" },
                    { num: "5", title: "5. Notification to the approved Partner Company of the necessary matters, procedures, and schedule for concluding a transaction agreement" },
                    { num: "6", title: "6. Contract concluded through mutual consultation" },
                ],
            },
            {
                no: "06",
                title: "Commencement of Transactions",
                items: [
                    { num: "1", title: "To commence fair transactions with a Partner Company, a product supply contract must be concluded after sufficient mutual consultation on all transaction-related matters." },
                    { num: "2", title: "Transactions commence when the product supply contract is signed (including electronic signatures) with a name and seal or signature, and the written document (including electronic documents) is provided to the Partner Company." },
                    { num: "3", title: "The Company does not change transaction terms during the contract period." },
                    { num: "4", title: "The Company does not place verbal orders." },
                ],
            },
            {
                no: "07",
                title: "Prohibition of Unfair Trade Practices",
                items: [
                    {
                        num: "1",
                        title: "The Company shall comply with the following matters when transacting with Partner Companies, and shall not force Partner Companies into unfair transactions by exploiting a superior position. These standards follow the provisions of fair trade-related laws and regulations.",
                        details: [
                            "1. Obligation to conclude written contracts",    
                            "2. Prohibition on price reduction of goods",
                            "3. Obligation to pay product sales proceeds",
                            "4. Prohibition on improper refusal or delay in receiving goods",
                            "5. Prohibition on improper return of goods",
                            "6. Prohibition on improper coercion of promotional costs, etc.",
                            "7. Prohibition on coercion of exclusive transactions",
                            "8. Prohibition on requesting management information",
                            "9. Prohibition on interference in management activities",
                            "10. Prohibition on improper receipt of economic benefits",
                            "11. Prohibition on provision of disadvantages such as improper contract changes",
                            "12. Prohibition on requiring Partner Companies to transact through specific vendors",
                            "13. Prohibition on imposing disadvantages on Partner Companies for not using specific vendors",
                        ],
                    },
                    { num: "2", title: "The Company, except in unavoidable circumstances of the Partner Company, shall in principle conduct direct purchases." },
                    { num: "3", title: "When the supply cost of delivered products changes due to minimum wage increases, rising raw material prices, etc., making adjustment of the delivery price unavoidable, the Partner Company may request the Company to adjust the delivery price." },
                    { num: "4", title: "If the Company's MD in charge requests unfair transactions, the Partner Company may submit a report through the Ethics Management reporting page on the Company's website." },
                    { num: "5", title: "Sales-volume-based purchase transactions that unfairly transfer inventory burden to Partner Companies are in principle prohibited. However, exceptions may be recognized when, taking into account the characteristics of the product and the needs of the Partner Company, it is recognized that the purpose is not to unfairly transfer inventory burden to the Partner Company." },
                ],
            },
            {
                no: "08",
                title: "Exclusion of Transactions with Conflicted Parties",
                items: [
                    { num: "1", title: "If executives or employees of Partner Companies are persons with an interest relationship, such as relatives of the Company's employees, the Company shall exclude the relevant employees from directly or indirectly participating in the process of product selection and trade condition negotiations with the relevant Partner Company." },
                    {
                        num: "2",
                        title: "The criteria for the persons with an interest relationship in paragraph 1 are as follows:",
                        details: [
                            {
                                text: "1. Relatives under Article 777 of the Civil Code, including the following:",
                                children: [
                                    "a. Blood relatives within 8 degrees",
                                    "b. Relatives by marriage within 4 degrees (the scope of relatives by marriage follows Article 769 of the Civil Code)",
                                    "c. Spouses",
                                ],
                            },
                            "2. Former employees with work history at the Company",
                            "3. Persons associated with GS Group affiliates",
                        ],
                    },
                    { num: "3", title: "③ Notwithstanding paragraph 1, if an employee with an interest relationship with a Partner Company has participated in a transaction stage, the relevant transaction shall be re-reviewed through a fair procedure." },
                ],
            },
            {
                no: "09",
                title: "Transaction Termination",
                items: [
                    {
                        num: "1",
                        title: "The Company and Partner Companies may suspend or terminate the product supply contract in any of the following cases:",
                        details: [
                            "1. Where there is a written agreement between both parties"/* 260604 번역 */,
                            "2. Where a bill or check issued by the “Company” or the “Partner Company” is dishonored, or where an application for rehabilitation or bankruptcy proceedings is filed by the “Company” or the “Partner Company” itself, or such proceedings are commenced upon a creditor's application"/* 260604 번역 */,
                            "3. Where the company is judged to be a company showing signs of insolvency under the Corporate Restructuring Promotion Act and the relevant procedures have been commenced"/* 260604 번역 */,
                            "4. Where compulsory auction, etc. is enforced against the major assets of the “Company” or the “Partner Company” (including the delivery payment claim that the “Partner Company” holds against the “Company” under this contract), making further performance of this contract difficult"/* 260604 번역 */,
                            "5. Where the company has been subject to a disposition such as business suspension or business license cancellation by a related agency"/* 260604 번역 */,
                            "6. Where the product delivered by the “Partner Company” conflicts with relevant laws, or where delivery or sale of the relevant product becomes impossible because the license contract concluded between the “Partner Company” and the license holder has terminated"/* 260604 번역 */,
                            "7. Where production of the brand or transaction item specified in the goods supply contract has been discontinued or terminated"/* 260604 번역 */,
                            {
                                text: "8. Where other grounds significantly hindering smooth contract performance arise, as exemplified in each of the following items"/* 260604 번역 */,
                                children: [
                                    "When production of the supplied product is suspended or terminated for an extended period",
                                    "b. In the case of an error in the indication of country of origin"/* 260604 번역 */,
                                    "c. Where quality defects caused by the Partner Company's negligence in management are detected three or more times"/* 260604 번역 */,
                                    "d. Where the sales performance of the goods is markedly poor"/* 260604 번역 */,
                                    "e. Where the Company or the Partner Company violates a material matter of the goods supply contract, and the other party requests correction within a period of 14 days or more, but the correction is not made"/* 260604 번역 */,
                                    "f. Where it falls under other grounds for termination or rescission of the contract stated in the goods supply contract"/* 260604 번역 */,
                                ],
                            },
                        ],
                    },
                    { num: "2", title: "Even where the transaction has been suspended or terminated pursuant to paragraph (1), goods supplied by the Partner Company shall not be returned. However, cases falling under grounds for return permitted by laws and regulations shall be exceptions."/* 260604 번역 */ },
                ],
            },
            {
                no: "10",
                title: "Transaction Termination Procedure",
                items: [
                    { num: "1", title: "When the Company terminates its transaction with a Partner Company, it must clearly state the reason for termination in writing and deliver it; in the case of transaction termination due to contract expiration, the reason for refusing contract renewal must be specifically stated in writing and notified at least 30 days before the contract expiration date." },
                    { num: "2", title: "When the Company terminates a transaction due to grounds attributable to the Partner Company, the Partner Company must be given an opportunity to explain." },
                    { num: "3", title: "The Company and Partner Companies shall faithfully perform procedures such as payment settlement arising from transaction termination." },
                ],
            },
            {
                no: "11",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    { num: "1", title: "If a Partner Company suffers a disadvantage due to unfair treatment resulting from the Company's employees violating these standards, it may submit a report through the Ethics Management reporting page on the Company's website, and the Company must process the reported content through the prescribed procedure." },
                    { num: "2", title: "In the course of processing the Partner Company's report, the Company shall protect the Partner Company's related information and personal details, and shall ensure that the Partner Company does not receive unfair discriminatory treatment or transaction suspension as a result of the report." },
                    { num: "3", title: "The Company shall make its best efforts to prevent recurrence of all civil complaint matters arising during transactions with Partner Companies." },
                ],
            },
            {
                no: "12",
                title: "Sanctions",
                items: [
                    { num: "1", title: "The Company's employees must comply with these standards in performing their duties; if a party is confirmed to have violated these standards intentionally or through gross negligence, sanctions shall be imposed in accordance with the Company's Code of Ethics, etc." },
                    { num: "2", title: "If a Company employee is found to have committed fraud, embezzlement, breach of trust, receipt of money, improper solicitation, or similar offenses the Company may file a criminal complaint against the relevant employee." },
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />These standards are enacted and take effect on April 1, 2018.<br />Supplementary Provisions (June 11, 2024)<br />These standards are revised and take effect on June 11, 2024.",
            },
        ],
        // 2. 판매장려금 결정, 변경에 대한 기준
        FairTradeSalesIncentiveSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These standards aim to clarify the criteria for the reasonable recognized scope of sales incentives in the transaction relationship between GS Retail Co., Ltd. (hereinafter "the Company") and partner companies (hereinafter "Partner Company"), thereby preventing unfair acts and establishing fair trade relations with Partner Companies in compliance with relevant laws and regulations.`,
            },
            {
                no: "02",
                title: "Compliance Obligation",
                items: [
                    { num: "1", title: "The Company's employees must strictly comply with relevant laws and regulations, including the Act on Fair Transactions in Large-Scale Retail Business and the Guidelines for Review of Unfairness of Sales Incentives in the Large-Scale Retail Business Sector, in addition to these standards when transacting with Partner Companies." },
                    { num: "2", title: "These standards shall be posted on the Company's website, etc. for Partner Companies to check at any time, and internal employees shall be regularly trained to comply with them." },
                ],
            },
            {
                no: "03",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "Sales incentives shall be based on the principle that Partner Companies pay sales incentives to the Company to increase consumer demand for products and promote sales, thereby sharing in the profits of sales performance." },
                    { num: "2", title: "Sales incentive agreements must contribute to the benefit of both the Company and Partner Companies, and there must be a reasonable proportional relationship between the sales incentive amount received by the Company during the incentive payment target period and the profit resulting from the increase in the Partner Company's delivery volume during the same period." },
                ],
            },
            {
                no: "04",
                title: "Definition of Terms",
                definitions: [
                    { term: "1", desc: `"Sales Incentive" refers to the economic benefit paid by Partner Companies to the Company under the conditions specified in the annual transaction product supply contract for the purpose of promoting sales of products in direct purchase transactions.` },
                    { term: "2", desc: `② "Performance Incentive" refers to a type of sales incentive paid by Partner Companies to the Company when a delivery volume growth target (delivery unit price × delivery quantity) compared to the same period of the previous year, agreed upon between the Company and the Partner Company, is achieved.` },
                    { term: "3", desc: `"New Product Incentive" refers to a type of sales incentive received by the Company from Partner Companies in exchange for displaying the Partner Company's new products in the store. In this case, whether a product is a new product shall in principle be based on products launched within 6 months, taking into account industry trade practices; renewed products where only the product code has changed from an existing product shall not be considered new products.` },
                    { term: "4", desc: `"Display Incentive" refers to a type of sales incentive received by the Company from Partner Companies as compensation for the service of displaying the Partner Company's products on shelving units with high sales potential` },
                ],
            },
            {
                no: "05",
                title: "Disallowed Sales Incentives",
                lead: "In direct purchase transactions, the Company acquires ownership of products received from Partner Companies, has the right to sell products, and simultaneously bears responsibility for inventory arising from poor sales; therefore, the following types of incentives shall not be permitted as sales incentives:",
                items: [
                    { num: "1", title: `"Base Incentive" refers to an incentive in which the Company receives from Partner Companies a fixed percentage or fixed amount of the purchase price of products, regardless of whether the Partner Company's sales increase.` },
                    { num: "2", title: `"No-Return Incentive" refers to an incentive received by the Company from Partner Companies on the condition that directly purchased products will not be returned.` },
                    { num: "3", title: `"Market Price Response Incentive" refers to an incentive received by the Company from Partner Companies for the purpose of reducing the selling price of products already received from Partner Companies.` },
                    { num: "4", title: `"Inventory Clearance Incentive" refers to an incentive in which the Company receives from Partner Companies an amount corresponding to a certain percentage of inventory in order to clear inventory of directly purchased products.` },
                    { num: "5", title: `"Store Closure Incentive" refers to an incentive received by the Company from Partner Companies to cover costs incurred in the process of clearing remaining products through dumping, price discounts, etc. upon store closure.` },
                ],
            },
            {
                no: "06",
                title: "Determination and Change of Sales Incentives",
                items: [
                    { num: "1", title: "The Company may receive sales incentives from Partner Companies in accordance with a product supply contract fairly concluded with the Partner Company for the purpose of sales promotion." },
                    { num: "2", title: "Sales incentives shall be determined through consultation between the Company and Partner Companies based on criteria consistent with the purpose of payment, using product supply contracts and individual agreement forms." },
                    { num: "3", title: "If the Company and Partner Companies have an agreement to do so, or at the Partner Company's request, due to reasons such as an unexpected sharp increase or decrease in sales or changes in market conditions, the sales incentive items in the product supply contract may be changed or abolished, or the payment conditions of existing sales incentives may be changed. In such cases, changes shall be made in the same manner as the determination procedure in paragraph 2." },
                ],
            },
            {
                no: "07",
                title: "Procedural Requirements for Sales Incentives",
                items: [
                    {
                        num: "1",
                        title: "When the Company receives sales incentives from Partner Companies, the following agreed matters shall be provided in writing to the Partner Company before contract conclusion and sufficiently discussed in advance:",
                        details: [
                            "1. Type and name of the sales incentive",    
                            "2. Purpose, payment timing, and payment frequency of the sales incentive",
                            "3. Ratio or amount of the sales incentive",
                            "4. Criteria and procedure for determining the sales incentive",
                            "5. Grounds, criteria, and procedure for changing the sales incentive",
                        ],
                    },
                    { num: "2", title: "The Company and Partner Companies shall conclude an agreement on sales incentives through free mutual agreement rather than coercion." },
                    { num: "3", title: "The Company and Partner Companies shall include the sales incentive agreement in the annual transaction master contract and immediately deliver the contract document after sealing." },
                ],
            },
            {
                no: "08",
                title: "Prohibited Acts",
                items: [
                    { num: "1", title: "The Company receiving sales incentives from Partner Companies beyond what has been agreed upon or exceeding the agreed scope in the annual transaction product supply contract" },
                    { num: "2", title: "The Company comprehensively stipulating that individual sales incentive agreements may be concluded later without specifically stating the type and name, payment purpose, timing, and frequency, and ratio or amount of the sales incentive, and then sporadically receiving sales incentives" },
                    { num: "3", title: "The Company unilaterally increasing the sales incentive rate or amount during the contract period without regard to the Partner Company's wishes" },
                    { num: "4", title: "The Company unilaterally determining and notifying the sales incentive items and ratios without a consultation process when concluding the annual transaction master contract, and then receiving sales incentives" },
                    { num: "5", title: "The Company receiving sales incentives unilaterally according to its own regulations without clearly and specifically stipulating in advance the location and period of display for the Partner Company's products related to display incentives, and the sales incentive rate or amount per location, etc." },
                    { num: "6", title: "Concluding a sales incentive agreement in a state where the Partner Company's autonomous will is restricted, such as directly or indirectly implying that the Partner Company may suffer disadvantages such as trade suspension if it does not accept the Company's proposed content" },
                ],
            },
            {
                no: "09",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    { num: "1", title: "If a Partner Company suffers a disadvantage due to unfair treatment resulting from the Company's employees violating these standards, it may submit a report through the Ethics Management reporting page on the Company's website, and the Company must process the reported content through the prescribed procedure." },
                    { num: "2", title: "In the course of processing the Partner Company's report, the Company shall protect the Partner Company's related information and personal details, and shall ensure that the Partner Company does not receive unfair discriminatory treatment or transaction suspension as a result of the report." },
                    { num: "3", title: "The Company shall make its best efforts to prevent recurrence of all civil complaint matters arising during transactions with Partner Companies." },
                ],
            },
            {
                no: "10",
                title: "Sanctions",
                items: [
                    { num: "1", title: "The Company's employees must comply with these standards in performing their duties; if a party is confirmed to have violated these standards intentionally or through gross negligence, sanctions shall be imposed in accordance with the Company's Code of Ethics, etc." },
                    { num: "2", title: "If a Company employee is found to have committed fraud, embezzlement, breach of trust, receipt of money, improper solicitation, or similar offenses the Company may file a criminal complaint against the relevant employee." },
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />These standards are enacted and take effect on April 1, 2018.<br />Supplementary Provisions (June 11, 2024)<br />These standards are revised and take effect on June 11, 2024.",
            },
        ],
        // 3. 판매촉진행사 진행 및 비용분담 기준
        FairTradePromotionCostSharingSections: [
            {
                no: "01",
                title: "Purpose",
                lead: "These standards aim to prevent unfair acts that may arise in conducting sales promotion events with Partner Companies in partnership with GS Retail Co., Ltd., and to establish fair trade relations with Partner Companies in compliance with relevant laws and regulations.",
            },
            {
                no: "02",
                title: "Compliance Obligation",
                items: [
                    { num: "1", title: `The Company's employees must strictly comply with relevant laws and regulations, including the Monopoly Regulation and Fair Trade Act (hereinafter "Fair Trade Act") and the Act on Fair Transactions in Large-Scale Retail Business (hereinafter "Large-Scale Retail Business Act"), in addition to these standards when transacting with Partner Companies.` },
                    { num: "2", title: "These standards shall be posted on the Company's website, etc. for Partner Companies to check at any time, and internal employees shall be regularly trained to comply with them." },
                ],
            },
            {
                no: "03",
                title: "Definition of Terms",
                definitions: [
                    { term: "1", desc: `"Promotional Event" means an event or activity conducted for the purpose of increasing demand for products and boosting sales, with the specific purposes set forth in the following subparagraphs:`, details: ["1. Promotion of new products and newly listed products, and expansion of sales", "2. Expansion of sales by offering additional benefits that differentiate from competing products of competitors", "3. Increase of sales and expansion of market share (MS) through promotional activities within the relevant product category during the applicable period"] },
                    { term: "2", desc: `② "Agreement" means a document in which the Company and the Partner Company have recorded mutually agreed-upon terms in writing.` },
                    { term: "3", desc: `③ "Promotional Cost-Sharing Ratio" means the ratio in which the Company and the Partner Company share the costs required for a promotional event.` },
                ],
            },
            {
                no: "04",
                title: "Requirements for Conducting Promotional Events",
                items: [
                    { num: "1", title: "When planning to conduct a promotional event, the Company must obtain a proposal from the Partner Company before the event begins." },
                    { num: "2", title: "Both parties shall complete consultations at least 15 days before the start of the event in order to carry out a promotional event." },
                    { num: "3", title: "Both parties shall sufficiently discuss the concept, category, period, methods, and other matters when planning a promotional event, and neither party shall unilaterally change the terms of the promotional event agreed upon through mutual consultation without justifiable reason." },
                ],
            },
            {
                no: "05",
                title: "Procedure for Conducting Promotional Events",
                items: [
                    {
                        num: "1",
                        title: "Before conducting a promotional event, both parties shall enter into a written agreement signed or sealed by each party covering the following items, and shall each receive one copy of such written agreement immediately upon signing or sealing:",
                        details: [
                            "1. Name, nature, and period of the promotional event",
                            "2. Items of products to be sold through the promotional event",
                            "3. Estimated scale and breakdown of costs required for the promotional event",
                            "4. Ratio of economic benefits expected to be directly gained by the Company and the Partner Company through the promotional event",
                            "5. Ratio or amount of all costs to be shared for the promotional event",
                        ],
                    },
                    { num: "2", title: "The decision on whether to proceed with a promotional event and the mutual cost-sharing ratio shall be reasonably determined through sufficient consultation with the Partner Company so as to be mutually beneficial, and shall not be unilaterally decided in an unfair manner or changed without justifiable reason." },
                    { num: "3", title: "The Company must retain all documents related to promotional events for five (5) years after the termination of the transaction with the Partner Company." },
                ],
            },
            {
                no: "06",
                title: "Procedures for Fulfilling Promotional Event Agreements",
                items: [
                    { num: "1", title: "After a promotional event agreement is reached, the Company's responsible MD is obligated to verify whether the promotional event is being carried out in accordance with the agreed terms." },
                    { num: "2", title: "If the promotional event is not being carried out in accordance with the agreed terms, the Partner Company must be notified, appropriate measures must be taken to prevent harm to the Partner Company, and if the Partner Company suffers damages, compensation shall be provided in accordance with applicable laws and regulations." },
                    { num: "3", title: "The Company shall not transfer to the Partner Company any promotional event costs or economic disadvantages under a name not previously agreed upon with the Partner Company or not specified in the contract." },
                ],
            },
            {
                no: "07",
                title: "Cost Sharing",
                items: [
                    { num: "1", title: "The Company and the Partner Company shall determine the cost-sharing ratio for promotional expenses in proportion to the ratio of economic benefits expected to be directly gained through the promotional event." },
                    { num: "2", title: "If the Company and the Partner Company are unable to calculate the expected economic benefits, the expected benefits of both parties shall be presumed to be equal." },
                    { num: "3", title: "The Partner Company's share of promotional costs shall not exceed 50%. However, if a promotional event that is differentiated from other Partner Companies is conducted at the voluntary request of the Partner Company, the sharing ratio may be determined through mutual consultation." },
                    { num: "4", title: "Even if the Company plans the promotional event, including the event period, theme, publicity, and customer support measures, if participating companies are publicly recruited and the Partner Company independently decides whether to participate and determines on its own the discounted items and discount levels for its products, the requirements of the proviso to paragraph ③ shall be deemed satisfied." },
                    { num: "5", title: "Promotional costs shall be settled on the payment date of the purchase price in the month following the sales closing date of the month in which the promotional event ends. As a general rule, the settlement method shall involve deducting the Partner Company's share of promotional costs from the purchase price paid by the Company to the Partner Company. In such cases, the Company shall notify the Partner Company in writing of the deduction details no later than one day before payment." },
                ],
            },
            {
                no: "08",
                title: "Prohibition of Unfair Trade Practices",
                items: [
                    {
                        num: "1",
                        title: "With respect to promotional costs, the Company shall not engage in any of the following acts:",
                        details: [
                            "1. Conducting a promotional event without entering into a written agreement",
                            "2. Transferring promotional costs to the Partner Company without a prior agreement",
                            "3. Requiring the Partner Company to bear promotional costs without agreeing on a sharing ratio",
                        ],
                    },
                    { num: "2", title: "In negotiating and conducting promotional events with the Partner Company, even if an act is not explicitly stated as mandatory or prohibited under these Standards, the Company shall not abuse its superior position in the trade to disadvantage the Partner Company, impose other unfair trade conditions, or cause the Partner Company to participate in a promotional event against its will without justifiable reason." },
                ],
            },
            {
                no: "09",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    { num: "1", title: "If a Partner Company suffers a disadvantage due to unfair treatment resulting from the Company's employees violating these standards, it may submit a report through the Ethics Management reporting page on the Company's website, and the Company must process the reported content through the prescribed procedure." },
                    { num: "2", title: "In the course of processing the Partner Company's report, the Company shall protect the Partner Company's related information and personal details, and shall ensure that the Partner Company does not receive unfair discriminatory treatment or transaction suspension as a result of the report." },
                    { num: "3", title: "The Company shall make its best efforts to prevent recurrence of all civil complaint matters arising during transactions with Partner Companies." },
                ],
            },
            {
                no: "10",
                title: "Sanctions",
                items: [
                    { num: "1", title: "The Company's employees must comply with these standards in performing their duties; if a party is confirmed to have violated these standards intentionally or through gross negligence, sanctions shall be imposed in accordance with the Company's Code of Ethics, etc." },
                    { num: "2", title: "If a Company employee is found to have committed fraud, embezzlement, breach of trust, receipt of money, improper solicitation, or similar offenses the Company may file a criminal complaint against the relevant employee." },
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />These standards are enacted and take effect on April 1, 2018.<br />Supplementary Provisions (June 11, 2024)<br />These standards are revised and take effect on June 11, 2024.",
            },
        ],
        // 4. 인테리어 및 홍보물 비용분담 기준
        FairInteriorAndPromotionCostSharingSections:[
            {
                no: "01",
                title: "Purpose",
                lead: `The purpose of these Standards is to prevent unfair acts that may arise in the process of producing store interiors and promotional materials in transactions between GS Retail Co., Ltd. (hereinafter "the Company") and Partner Companies (hereinafter "Partner Company"), to comply with relevant laws and regulations, and to establish fair trade relations with Partner Companies.`,
            },
            {
                no: "02",
                title: "Compliance Obligation",
                items: [
                    { num: "1", title: `Employees of the Company must strictly comply with relevant laws and regulations, including the Monopoly Regulation and Fair Trade Act (hereinafter "Fair Trade Act") and the Act on Fair Transactions in Large-Scale Retail Business (hereinafter "Large-Scale Retail Business Act"), in addition to these Standards when transacting with Partner Companies.` },
                    { num: "2", title: "These standards shall be posted on the Company's website, etc. for Partner Companies to check at any time, and internal employees shall be regularly trained to comply with them." },
                ],
            },
            {
                no: "03",
                title: "Definition of Terms",
                definitions: [
                    { term: "1", desc: `"Store Interior" refers to all costs incurred by a Partner Company for installing, improving, or upgrading interior fixtures and equipment in its store within the Company's premises, as well as all costs for setting up facilities necessary for retail sales of products in that store.`},
                    { term: "2", desc: `"Promotional Materials" refers to materials produced by the Company and the Partner Company for the promotion of products.` },
                    { term: "3", desc: `"Cost Sharing" refers to the sharing of costs required for the Company and the Partner Company to produce store interiors, promotional materials, and similar items.` },
                ],
            },
            {
                no: "04",
                title: "Requirements and Procedures for Store Interiors",
                items: [
                    { num: "1", title: "Store interior costs must be expenses incurred by the Partner Company for facilities in its store within the premises." },
                    { num: "2", title: "Under Article 16 of the 'Act on Fair Transactions in Large-Scale Retail Business,' the store facility cost compensation system shall be intended to protect the expected profits, during the contract period, of a 'Partner Company' that has incurred initial costs in order to transact with the 'Company.'"/* 260604 번역 */ },
                    {
                        num: "3",
                        title: "The requirements for the compensation obligation are as set forth in the following subparagraphs:",
                        details: [
                            "1. Where the “Company” requests the “Partner Company” to refuse or suspend transactions during the contract period. However, this shall not apply to contract termination due to the “Partner Company's” default or grounds attributable to it."/* 260604 번역 */,
                            "2. Where the contract is terminated by agreement of both parties or due to grounds attributable to both parties."/* 260604 번역 */,
                            "3. Where, during the contract period, the “Company” carries out a renewal or changes the location, area, or facilities of the store according to its needs."/* 260604 번역 */,
                            "4. Where the transaction is suspended due to force majeure such as a natural disaster, no obligation to compensate arises."/* 260604 번역 */,
                            "5. The formula for compensation is as follows."/* 260604 번역 */,
                            " Total store facility cost expenditure of the 'Partner Company'* X [(Last day of the contract period – Date on which the transaction was suspended, etc.) / Contract period]"/* 260604 번역 */,
                            " * Subject to the matters stated in the documents prepared upon mutual consultation between the “Company” and the “Partner Company” at the time of contract conclusion"/* 260604 번역 */,
                        ],
                    },
                ],
            },
            {
                no: "05",
                title: "Requirements and Procedures for Promotional Materials",
                items: [
                    {num: "1", title: "Promotional materials shall be produced for the purpose of promoting sales.",},
                    {num: "2", title: "In principle, the Company shall bear the costs of promotional materials. However, if the Partner Company requests a format other than the Company's standard promotional material format, the Partner Company may bear the additional costs." },
                ],
            },
            {
                no: "06",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    {num:"1", title: "If a Partner Company suffers a disadvantage due to unfair treatment resulting from the Company's employees violating these standards, it may submit a report through the Ethics Management reporting page on the Company's website, and the Company must process the reported content through the prescribed procedure."},
                    {num:"2", title: "In the course of processing the Partner Company's report, the Company shall protect the Partner Company's related information and personal details, and shall ensure that the Partner Company does not receive unfair discriminatory treatment or transaction suspension as a result of the report."},
                    {num:"3", title: "③ The Company shall make its best efforts to prevent recurrence of all civil complaint matters arising during transactions with Partner Companies."}
                ]
            },
            {
                no: "07",
                title: "Sanctions",
                items: [
                    { num: "1", title: "The Company's employees must comply with these standards in performing their duties; if a party is confirmed to have violated these standards intentionally or through gross negligence, sanctions shall be imposed in accordance with the Company's Code of Ethics, etc." },
                    { num: "2", title: "If a Company employee is found to have committed fraud, embezzlement, breach of trust, receipt of money, improper solicitation, or similar offenses the Company may file a criminal complaint against the relevant employee." },
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />These standards are enacted and take effect on April 1, 2018.<br />Supplementary Provisions (June 11, 2024)<br />These standards are revised and take effect on June 11, 2024.",
            },
        ],
        //5. 파트너사 경영정보요구 기준
        FairPartnerCompanyManagementSections:[
            {
                no: "01",
                title: "Purpose",
                lead: `These standards aim to prohibit unfair requests for management information from Partner Companies in the course of transactions (including all types of transactions such as direct purchase, special purchase, and consignment/commission transactions) between GS Retail Co., Ltd. (hereinafter "the Company") and Partner Companies (hereinafter "Partner Company"), and to establish fair trade relations with Partner Companies in compliance with relevant laws and regulations.<br />02 | Basic Principles | ▲`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: "The Company's employees must strictly comply with relevant laws and regulations, including the Monopoly Regulation and Fair Trade Act and the Act on Fair Transactions in Large-Scale Retail Business, in addition to these standards when transacting with Partner Companies." },
                    { num: "2", title: "These standards shall be posted on the Company's website, etc. for Partner Companies to check at any time, and internal employees shall be regularly trained to comply with them." },
                ],
            },
            {
                no: "03",
                title: "Definition of Terms",
                definitions: [
                    { term: "1", desc: `"Partner Company" refers to a business entity that provides the Company with product supply transactions, goods delivery transactions, services, and similar, regardless of the form of transaction, and includes not only suppliers but also general counterparties.`},
                    { term: "2", desc: `"Business Information" includes information on the supply conditions of products that the Partner Company supplies to other businesses, conditions for entering the stores of other businesses, and information about the Partner Company or the Partner Company's counterparties.` },
                ],
            },
            {
                no: "04",
                title: "Prohibition on Demanding Business Information",
                lead: "The Company shall not unfairly demand from a Partner Company any of the following categories of business information, whether before or after the commencement of a transaction:",
                usePlainList: true,
                items: [
                    { num: "1", title: "1. Information on the supply conditions under which the Partner Company supplies products to other businesses (supply price, supply volume, timing and method of supply, timing and method of payment, return conditions, etc.)" },
                    { num: "2", title: "2. Information on the cost of products supplied or sold by the Partner Company" },
                    { num: "3", title: "3. Sales-related information on products sold by the Partner Company to other businesses (sales amounts by customer, sales volumes by period, etc.)" },
                    { num: "4", title: "4. Information on promotional events conducted by the Partner Company with other businesses (timing, frequency, event content, and trade conditions of promotional events by customer, etc.)" },
                    { num: "5", title: "5. Information needed to access computer networks used by the Partner Company in transactions with other businesses (IDs, passwords, etc. used to access computer networks used in transactions with other businesses)" },
                    { num: "6", title: "6. Other business information equivalent to any of the above subparagraphs that may disadvantage the Partner Company" },
                ],
            },
            {
                no: "05",
                title: "Exceptions",
                items: [
                    {
                        num: "1",
                        title: "Notwithstanding Article 4, the Company may request the provision of business information from the Partner Company through legitimate procedures if the Company has provided a document bearing the signatures or seals of both the Company and the Partner Company, stating each of the following matters:",
                        details: [
                            "1. Purpose of requesting the provision of business information",
                            "2. Matters relating to confidentiality of the requested information, such as confidentiality methods, and matters relating to damages in case of breach of confidentiality",
                            "3. Date of demand, date of provision, and method of provision of business information",
                            "4. Matters that can objectively demonstrate the inevitability of the demand for business information",
                        ],
                    },
                    {
                        num: "2",
                        title: "The following information is considered publicly available or necessary for the commencement or maintenance of transactions with the Partner Company, and in principle may be requested from the Partner Company:",
                        details: [
                            "1. General information on the Partner Company that is publicly disclosed (background of representative, number of employees, names of handled products, etc.)",
                            "2. Financial statements of the Partner Company",
                            "3. Total annual sales of the Partner Company (excluding sales by customer or by channel)",
                            "4. Information equivalent to items 1 through 3 above that has no possibility of disadvantaging the Partner Company",
                        ],
                    },
                    { num: "3", title: "Even where the Company requests business information from the Partner Company through legitimate procedures, the request must be limited to the minimum scope necessary, and the business information received must be used only within the scope of the stated purpose." },
                ],
            },
            {
                no: "06",
                title: "Prohibition of Other Unfair Trade Practices",
                lead: "In demanding business information or similar from Partner Companies, even if an act is not explicitly stated as mandatory or prohibited under these Standards, the Company shall not engage in unfair trade practices such as disadvantaging or obstructing the business activities of a Partner Company on the grounds that the Partner Company has refused to provide business information.",
            },
            {
                no: "07",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    { num: "1", title: "If a Partner Company suffers a disadvantage due to unfair treatment resulting from the Company's employees violating these standards, it may submit a report through the Ethics Management reporting page on the Company's website, and the Company must process the reported content through the prescribed procedure." },
                    { num: "2", title: "In the course of processing the Partner Company's report, the Company shall protect the Partner Company's related information and personal details, and shall ensure that the Partner Company does not receive unfair discriminatory treatment or transaction suspension as a result of the report." },
                    { num: "3", title: "The Company shall make its best efforts to prevent recurrence of all civil complaint matters arising during transactions with Partner Companies." },
                ],
            },
            {
                no: "08",
                title: "Sanctions",
                items: [
                    { num: "1", title: "The Company's employees must comply with these standards in performing their duties; if a party is confirmed to have violated these standards intentionally or through gross negligence, sanctions shall be imposed in accordance with the Company's Code of Ethics, etc." },
                    { num: "2", title: "② If a Company employee is found to have committed fraud, embezzlement, breach of trust, receipt of money, improper solicitation, or similar offenses the Company may file a criminal complaint against the relevant employee." },
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />These standards are enacted and take effect on April 1, 2018.<br />Supplementary Provisions (June 11, 2024)<br />These standards are revised and take effect on June 11, 2024.",
            },

        ],
        // 6. 파트너사 종업원 파견 기준
        FairPartnerEmployeeDispatchSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `These standards aim to prevent unfair acts in the process of the Company receiving employees or other personnel employed by Partner Companies (hereinafter "Partner Company") to work in the Company's stores, in compliance with relevant laws and regulations, and to establish fair trade relations with Partner Companies.`,
            },
            {
                no: "02",
                title: "Compliance Obligation",
                items: [
                    { num: "1", title: `Employees of the Company must strictly comply with relevant laws and regulations, including the Act on Fair Transactions in Large-Scale Retail Business (hereinafter "Large-Scale Retail Business Act") and the Guidelines on Dispatch and Use of Employees of Suppliers in the Large-Scale Retail Business Sector, in addition to these Standards when transacting with Partner Companies.` },
                    { num: "2", title: "These standards shall be posted on the Company's website, etc. for Partner Companies to check at any time, and internal employees shall be regularly trained to comply with them." },
                ],
            },
            {
                no: "03",
                title: "Definition of Terms",
                definitions: [
                    { term: "1", desc: `"Partner company" refers to a business entity that is expected to be or is currently engaged in product supply transactions, goods delivery transactions, etc. with the Company, including not only suppliers but also general transaction counterparties.`},
                    { term: "2", desc: `"Consignment purchase transaction" refers to a form of transaction in which the Company purchases products on credit from a supplier on the condition that unsold products may be returned, and after selling the products, pays the supplier the product sales proceeds minus a fixed percentage or fixed amount of sales revenue.` },
                    { term: "3", desc: `"Sales incentive" refers, regardless of its name, to economic benefits paid by a supplier to the Company in direct purchase transactions for the purpose of promoting product sales, in accordance with conditions specified in the annual basic transaction agreement.` },
                ],
            },
            {
                no: "04",
                title: "Dispatch of Employees",
                items: [
                    { num: "1", title: "The Company in principle prohibits receiving dispatched employees from Partner Companies and having them work at the Company's stores." },
                    {
                        num: "2",
                        title: "However, this shall not apply where the case falls under any of the following items and the dispatch conditions are agreed upon in writing with the Partner Company in advance, and the dispatched employees are engaged in the sale and management of goods delivered by the Partner Company that employs such employees."/* 260604 번역 */,
                        details: [
                            "1. Where the “Company” bears the personnel costs of the dispatched employees as well as various actual expenses such as meal costs and transportation costs, and other costs incurred by the dispatched employees in engaging in product sales and related work at the “Company's” store"/* 260604 번역 */,
                            "2. Where the “Partner Company” voluntarily requests the “Company” to dispatch employees it has hired, in accordance with a written document that objectively and specifically sets forth the breakdown and calculation basis of the expected benefits and costs arising from the employee dispatch"/* 260604 번역 */,
                            "3. Where skilled employees with special sales techniques or abilities are dispatched"/* 260604 번역 */,
                            "4. Where, in operating in the form of a store that permanently operates the products of a “Partner Company” engaged in a special-contract purchase transaction, employees are dispatched to sell and manage product categories that the Fair Trade Commission designates and announces as ones for which expertise is important due to the nature of the relevant products"/* 260604 번역 */,
                        ],
                    },
                    {
                        num: "3",
                        title: "An act falling under any of the following items shall not be included in the grounds for permitting dispatch."/* 260604 번역 */,
                        details: [
                            "1. The act of, having received a dispatch on the condition of bearing the dispatch costs, demanding a reduction of the product purchase cost from the “Partner Company” on the grounds of bearing the costs paid to the dispatched personnel, or additionally collecting sales incentives or advertising costs"/* 260604 번역 */,
                            "2. The act of, having received a dispatch on the condition of bearing the dispatch costs, imposing on the “Partner Company” some of the costs that the “Company” should bear—such as the installation costs of display stands, etc. and sample product costs incurred in performing the sales activities stated in the agreement"/* 260604 번역 */,
                            "3. The act of, prior to the “Partner Company's” voluntary request, informally requesting the dispatch of employees verbally, by phone, or by email under the pretext of a request for cooperation, etc., and subsequently having the “Partner Company” submit a dispatch request form"/* 260604 번역 */,
                            "4. Where, while requesting the “Partner Company” to dispatch employees, a disadvantage such as refusal to commence transactions or suspension of continued transactions is imposed or implied if it refuses, such that the “Partner Company” has no choice but to comply with the request"/* 260604 번역 */,
                            "5. The act of dispatching employees to perform simple product sales work that is feasible with only prescribed training related to the product characteristics or sales work, even though the case does not fall under one in which the Company bears all attendant dispatch costs or the “Partner Company” voluntarily requests the dispatch"/* 260604 번역 */,
                            "6. The act of requesting skilled employees and receiving a dispatch of promotional staff for simple promotional work at the level of raising customer interest, which requires no special skills"/* 260604 번역 */,
                            "7. The act of requesting skilled employees and receiving a dispatch for simple sales-assistance work, such as receiving sales proceeds, unrelated to special sales techniques or abilities"/* 260604 번역 */,
                            "8. Where, during the “Company”-level promotional event period, additional temporary event staff are requested and dispatched to perform event-assistance work"/* 260604 번역 */,
                        ],
                    },
                ],
            },
            {
                no: "05",
                title: "Written Agreement",
                items: [
                    {
                        num: "1",
                        title: "When the Company receives dispatched employees from a Partner Company, the dispatch conditions must be agreed upon in advance in writing, and both the Company and the Partner Company must sign or affix their seals to the document.",
                    },
                    {
                        num: "2",
                        title: "The matters that must be included in the written document under paragraph (1) are as follows."/* 260604 번역 */,
                        details: [
                            "1. The number of employees"/* 260604 번역 */,
                            "2. The employees' work period and working hours"/* 260604 번역 */,
                            "3. The content of the work in which the employees will engage"/* 260604 번역 */,
                            "4. Whether and on what conditions the employees' personnel costs are shared"/* 260604 번역 */,
                        ],
                    },
                    {
                        num: "3",
                        title: "A case falling under any of the following items shall be deemed a violation of the Act on Fair Transactions in Large Retail Business."/* 260604 번역 */,
                        details: [
                            {
                                text: "1. Where a written agreement is made after receiving the dispatched employees"/* 260604 번역 */,
                                children: [
                                    "a. Where, on the grounds that it is a short-term promotional event, the Company additionally requests the 'Partner Company' to dispatch promotional staff without a written agreement, and subsequently obtains a dispatch request and a written agreement (including a name and seal) from the 'Partner Company'"/* 260604 번역 */,
                                    "b. Where the time at which employees were first dispatched differs from the time of the agreement, and the agreement is applied retroactively from a period prior to the agreement, or the agreement date is altered to be entered as a date prior to the time of the first dispatch"/* 260604 번역 */,
                                    "c. Where the agreement on dispatch conditions, such as the number of dispatched employees, is deferred to a later time"/* 260604 번역 */,
                                    "d. Where the preparation of the written document specifying the dispatch conditions was made before the dispatch of employees, but the signature or affixing of name and seal of one party or both parties was made after the dispatch"/* 260604 번역 */,
                                ],
                            },
                            {
                                text: "2. Where no agreement has been concluded on some or all of the matters required to be included in the written document"/* 260604 번역 */,
                                children: [
                                    "a. Where employees are dispatched by requesting their dispatch orally, by email, through a dispatch request document, or the like, without agreeing on the dispatch conditions in writing in advance"/* 260604 번역 */,
                                    "b. Where a written agreement is not concluded in advance on the grounds that the 'Partner Company' voluntarily requested the dispatch of employees"/* 260604 번역 */,
                                    "c. Where the working hours, work period, and job content of employees are clearly agreed upon, but the number of employees is not specified in the agreement on the grounds that it is difficult to predict"/* 260604 번역 */,
                                ],
                            },
                            {
                                text: "3. Where some or all of the matters required to be included in the written document are agreed upon unclearly"/* 260604 번역 */,
                                children: [
                                    "a. Where regular sales staff, whose dispatch conditions are foreseeable, are dispatched without clearly agreeing on the number of dispatched personnel and working hours, etc."/* 260604 번역 */,
                                    "b. Where, even when the number of required employees can be anticipated to be a maximum of 10, etc. due to fluctuations in product sales or a short-term promotional event, the agreement is made in broad terms such as '5 to 30 persons' or '30 persons or fewer'"/* 260604 번역 */,
                                    `c. Where the work period of employees is vaguely defined as "during the first half of the year" or "during the third quarter," etc., making it difficult for the Partner Company to predict the dispatch period`/* 260604 번역 */,
                                    "d. Where the Partner Company merely signs or affixes its name and seal to a written document in which specific dispatch conditions are not stated, and the specific dispatch conditions are entered unilaterally by the Company at a later time"/* 260604 번역 */,
                                ],
                            },
                            {
                                text: "4. Where the agreed written document is incomplete"/* 260604 번역 */,
                                children: [
                                    "a. Where a document specifying the dispatch conditions has been prepared, but the signature or name and seal of one party or both parties is omitted"/* 260604 번역 */,
                                    "b. Where, when concluding an agreement through an electronic document, the Company retains the Partner Company's signature and enters it into the agreement"/* 260604 번역 */,
                                ],
                            },
                            "5. Where the agreed written document is not delivered to the “Partner Company”"/* 260604 번역 */
                        ],
                    },
                    { 
                        num:"4",
                        title:"A document in which the 'Company' and the 'Partner Company' have agreed upon the conditions for the dispatch of employees shall be delivered to the 'Partner Company' immediately upon conclusion, and such document shall be retained for five years from the date on which the agreement ends."/* 260604 번역 */
                    }
                ],
            },
            {
                no: "06",
                title: "Scope of Duties of Dispatched Employees",
                items: [
                    { num: "1", title: "Dispatched employees shall engage only in the sale and management of products supplied by the Partner Company that employs them." },
                    { num: "2", title: "An act falling under any of the following items shall not fall within the scope of work of dispatched employees."/* 260604 번역 */,
                        details: [
                            "1. The act of having dispatched employees engage in cash-handling assistance at the checkout counter, packaging work, etc."/* 260604 번역 */,
                            "2. The act of instructing dispatched employees to clean shared store spaces such as passageways and restrooms, or to perform store-wide customer service and guidance in shared store spaces, etc."/* 260604 번역 */,
                            "3. The act of having dispatched employees engage in product unloading, warehouse-receiving work, shopping cart recovery/arrangement, parking lot management, and parking assistance work"/* 260604 번역 */,
                            "4. The act of assigning dispatched employees not only the sale of the “Partner Company's” own products but also the sale, inventory checking and management, display work, etc. of products delivered by other “Partner Companies”"/* 260604 번역 */,
                            "5. The act of having dispatched employees check the inventory of the “Partner Company's” own products in order to smoothly perform regular inventory inspection work, etc. carried out as part of the “Company's” intrinsic duties"/* 260604 번역 */,
                        ],
                    },
                ],
            },
            {
                no: "07",
                title: "Partner Company's Employee Dispatch Request",
                lead: "If a Partner Company, judging from the Partner Company's perspective that dispatching its employees to the Company would be beneficial in terms of promoting and increasing sales of products in accordance with Article 4, paragraph 2, subparagraph 2, wishes to request the dispatch of the Partner Company's employees to the Company, the Partner Company must submit to the Company an employee dispatch request form that objectively and specifically states the expected benefits and cost breakdown of the employee dispatch, prior to concluding the product contract.",
            },
            {
                no: "08",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    { num: "1", title: "If a Partner Company suffers a disadvantage due to unfair treatment resulting from the Company's employees violating these standards, it may submit a report through the Ethics Management reporting page on the Company's website, and the Company must process the reported content through the prescribed procedure." },
                    { num: "2", title: "In the course of processing the Partner Company's report, the Company shall protect the Partner Company's related information and personal details, and shall ensure that the Partner Company does not receive unfair discriminatory treatment or transaction suspension as a result of the report." },
                    { num: "3", title: "The Company shall make its best efforts to prevent recurrence of all civil complaint matters arising during transactions with Partner Companies." },
                ],
            },
            {
                no: "09",
                title: "Sanctions",
                items: [
                    { num: "1", title: "The Company's employees must comply with these standards in performing their duties; if a party is confirmed to have violated these standards intentionally or through gross negligence, sanctions shall be imposed in accordance with the Company's Code of Ethics, etc." },
                    { num: "2", title: "If a Company employee is found to have committed fraud, embezzlement, breach of trust, receipt of money, improper solicitation, or similar offenses the Company may file a criminal complaint against the relevant employee." },
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />These standards are enacted and take effect on April 1, 2018.<br />Supplementary Provisions (June 11, 2024)<br />These standards are revised and take effect on June 11, 2024.",
            },
        ],
        // 7. 파트너사 특약매입거래 기준
        FairPartnerSpecialPurchaseSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `The purpose of these Standards is to establish clear standards for cost sharing that may arise in the consignment purchase transaction process between GS Retail Co., Ltd. (hereinafter "the Company") and Partner Companies (hereinafter "Partner Company"), to prevent unfair trade practices that may arise in the course of conducting related promotional events, and to comply with relevant laws and regulations, thereby establishing fair trade relations with Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: `Employees of the Company must strictly comply with relevant laws and regulations, including the Act on Fair Transactions in Large-Scale Retail Business (hereinafter "Large-Scale Retail Business Act") and the Guidelines for Reviewing Unfairness of Consignment Purchase Transactions in the Large-Scale Retail Business Sector, in addition to these Standards when transacting with Partner Companies.` },
                    { num: "2", title: "These standards shall be posted on the Company's website, etc. for Partner Companies to check at any time, and internal employees shall be regularly trained to comply with them." },
                ],
            },
            {
                no: "03",
                title: "Definition of Terms",
                definitions: [
                    { term: "1", desc: `"Partner company" refers to a business entity that is expected to be or is currently engaged in product supply transactions, goods delivery transactions, etc. with the Company, including not only suppliers but also general transaction counterparties.`},
                    { term: "2", desc: `"Consignment purchase transaction" refers to a form of transaction in which the Company purchases products on credit from a supplier on the condition that unsold products may be returned, and after selling the products, pays the supplier the product sales proceeds minus a fixed percentage or fixed amount of sales revenue.` },
                    { term: "3", desc: `"Promotional Event," regardless of its name or form, refers to all events or activities conducted for the purpose of increasing demand for products and boosting sales, with the specific purposes set forth in the following subparagraphs:`,
                      details:[
                          "1. Promotion of new products and newly listed products, and expansion of sales",
                          "2. Expansion of sales by offering additional benefits that differentiate from competing products of competitors",
                          "3. Increase of sales and expansion of market share (MS) through promotional activities within the relevant product category during the applicable period"
                      ]
                    },
                ],
            },
            {
                no: "04",
                title: "Transaction Process",
                items: [
                    { num: "1", title: "Upon concluding a consignment purchase transaction agreement with a Partner Company, the Company must immediately provide the Partner Company with a written document specifying the terms of the agreement, and both the Company and the Partner Company must each sign or affix their seals to the document." },
                    { num: "2",title: "The Company shall not cause the manufacture or ordering of products to be supplied until the written document under paragraph ① has been provided to the Partner Company."},
                    { num: "3", title: "In consignment purchase transactions, the sales commission, return conditions, promotional costs, and other terms must be specifically agreed upon through consultation between the Company and the Partner Company at the time of contract execution and must be stated in the contract."},
                    { num: "4", title: "If unexpected costs arise after the conclusion of a consignment purchase transaction, the additional costs shall be determined through consultation between the Company and the Partner Company."},
                ],
            },
            {
                no: "05",
                title: "Role Division",
                items: [
                    {
                        num: "1",
                        title: "The Company acquires ownership of products supplied through the Partner Company, and after receiving the sales proceeds in the Company's name, tabulates monthly sales revenue and pays the Partner Company the amount after deducting the sales commission agreed upon in advance.",
                    },
                    {
                        num: "2",
                        title: "The Company carries out activities such as advertising, publicity, and planning of promotional events at the level of the entire store for the purpose of attracting customers and creating demand.",
                    },
                    {
                        num: "3",
                        title: "The Partner Company dispatches promotional staff within the store to promote sales of supplied products and performs duties related to selling, displaying, and storing those products within the store.",
                    },
                    { 
                        num:"4",
                        title:"In this process, the Partner Company manages the inventory of the relevant Partner Company's products and, in consultation with the Company, retrieves (returns) unsold products."
                    }
                ],
            },
            {
                no: "06",
                title: "Cost Sharing",
                lead: "The standards for sharing costs arising in the course of consignment purchase transactions between the Company and the Partner Company are as follows:",
                usePlainList: true,
                items: [
                    {
                        num: "1",
                        title: "1. Product Receiving and Management Stage",
                        criteria: [
                            {
                                details: [
                                    {
                                        text: "a. Property Protection Insurance Costs for Products",
                                        desc: "The cost of property protection insurance taken out to cover damage to held products due to natural disasters such as fire and floods, or due to theft, shall be borne by the Company.",
                                    },
                                    {
                                        text: "b. Product Storage Costs",
                                        desc: "Costs incurred for storing products in warehouses or other facilities after product inspection and acceptance shall be borne by the Company.",
                                    },
                                    {
                                        text: "c. Costs of Product Loss or Damage",
                                        desc: "Where delivered goods are lost or damaged after the Company's inspection and acceptance, the Company shall, as a general rule, bear the costs incurred. However, where there is a clear cause attributable to the Partner Company or to sales promotion staff dispatched by the Partner Company, the Partner Company shall bear the costs of the loss or damage of the goods."/* 260604 번역 */,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        num: "2",
                        title: "2. Store operation and management stage"/* 260604 번역 */,
                        criteria: [
                            {
                                details: [
                                    {
                                        text: "a. Store interior costs"/* 260604 번역 */,
                                        desc: "The interior costs incurred when replacing store fixtures and the like shall be borne by the Company"/* 260604 번역 */,
                                    },
                                    {
                                        text: "b. Cost and scale of sales promotion staff"/* 260604 번역 */,
                                        desc: "The labor costs of dispatched sales promotion staff, actual expenses such as meal and transportation costs, and the costs of engaging in product sales and related work shall be shared by the Company and the Partner Company through consultation, and the scale of sales promotion staff to be dispatched to the store shall be determined autonomously by the Partner Company."/* 260604 번역 */,
                                    },
                                    {
                                        text: "c. Store management costs"/* 260604 번역 */,
                                        desc: "Various management costs incurred in the course of selling products supplied by the 'Partner Company,' such as electricity charges and fees for the use of payment processing equipment, shall be borne by the 'Company.'"/* 260604 번역 */,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        num: "3",
                        title: "3. Advertising and sales promotion activity stage"/* 260604 번역 */,
                        criteria: [
                            {
                                details: [
                                    {
                                        text: "a. Advertising costs at the store level"/* 260604 번역 */,
                                        children:[
                                            "1) The “Company” shall bear the advertising costs for enhancing the brand image of the “Company.”"/* 260604 번역 */,
                                            "2) The “Company” shall bear advertising costs such as flyers for attracting customers at the store level."/* 260604 번역 */,
                                            "3) The “Company” shall bear the costs of promotional/advertising decorations and production materials, such as POP and posters, that the “Company” uniformly arranges on a store-wide basis."/* 260604 번역 */  ]
                                    },
                                    {
                                        text: "b. Sales promotion event costs at the store level"/* 260604 번역 */,
                                        desc:"The costs incurred for sales promotion events conducted by the 'Company' as the principal party at the level of all stores or individual stores shall be borne by the 'Company.'"/* 260604 번역 */
                                    },
                                    {
                                        text: "c. Cost of joint sales promotion events between the Company and the Partner Company"/* 260604 번역 */,
                                        desc:"The costs incurred for sales promotion events conducted jointly by the 'Company' and the 'Partner Company' shall be shared in proportion to the directly expected profits; provided, however, that where such proportion cannot be calculated, the expected profits of the 'Company' and the 'Partner Company' shall be presumed to be equal. However, the share borne by the 'Partner Company' shall not exceed 50%."/* 260604 번역 */
                                    },
                                    {
                                        text: "d. Cost of the Partner Company's voluntary sales promotion events"/* 260604 번역 */,
                                        desc:"Where the 'Partner Company' voluntarily requests the 'Company' to conduct a sales promotion event differentiated from those of other businesses, the costs incurred shall be shared by the 'Company' and the 'Partner Company' through mutual consultation."/* 260604 번역 */
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                no: "07",
                title: "Scope of Promotional Staff Duties",
                items: [
                    {num: "1", title: "Promotional staff dispatched by the Partner Company shall work during the business hours of the Company's store."},
                    {num: "2", title: "Promotional staff shall engage only in the sale and management of products supplied by the Partner Company that employs them, and shall not be made to engage in the sale and management of products supplied by other Partner Companies, or in the Company's inherent duties such as assisting with cash handling, parking support, and similar tasks."},
                    {num: "3", title: "Promotional staff shall endeavor to maintain a quality of service at or above the level that customers would normally expect to receive."}
                ]
            },
            {
                no: "08",
                title: "Participation in Promotional Events",
                items: [
                    { num: "1", title: "The Company shall not compulsorily involve Partner Companies in promotional events against their will." },
                    { num: "2", title: "Whether participation in a promotional event is compulsory shall be determined by comprehensively considering the following matters:",
                        details:[
                            "1. The genuine and voluntary intention of the Partner Company to participate",
                            "2. Whether sanctions or disadvantages exist in the event of non-participation in the promotional event",
                            "3. The nature of the promotional event and the degree of superior position in the transaction",
                            "4. The Partner Company's degree of trade dependence",
                            "5. The continuity of the trade relationship between the Company and the Partner Company",
                            "6. Characteristics of the traded products",
                        ]
                    },
                ],
            },
            {
                no: "09",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    { num: "1", title: "If a Partner Company suffers a disadvantage due to unfair treatment resulting from the Company's employees violating these standards, it may submit a report through the Ethics Management reporting page on the Company's website, and the Company must process the reported content through the prescribed procedure." },
                    { num: "2", title: "In the course of processing the Partner Company's report, the Company shall protect the Partner Company's related information and personal details, and shall ensure that the Partner Company does not receive unfair discriminatory treatment or transaction suspension as a result of the report." },
                    { num: "3", title: "The Company shall make its best efforts to prevent recurrence of all civil complaint matters arising during transactions with Partner Companies." },
                ],
            },
            {
                no: "10",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    { num: "1", title: "Employees of the Company must comply with these Standards in carrying out their duties. If it is confirmed that a party has intentionally or with gross negligence violated these Standards, disciplinary action shall be taken in accordance with the Company's ethical norms and other regulations." },
                    { num: "2", title: "If a Company employee is found to have committed fraud, embezzlement, breach of trust, receipt of money, improper solicitation, or similar offenses the Company may file a criminal complaint against the relevant employee." },
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />These standards are enacted and take effect on April 1, 2018.<br />Supplementary Provisions (June 11, 2024)<br />These standards are revised and take effect on June 11, 2024.",
            },
        ],
        // 8. 파트너사 반품관련 기준
        FairPartnerReturnRelatedSections: [
            {
                no: "01",
                title: "Purpose",
                lead: `The purpose of these Standards is to clearly set out standards for the handling of returns in transactions between GS Retail Co., Ltd. (hereinafter "the Company") and Partner Companies (hereinafter "Partner Company"), to prevent unfair trade practices that may arise in the course of returns, to comply with relevant laws and regulations, and thereby establish fair trade relations with Partner Companies.`,
            },
            {
                no: "02",
                title: "Basic Principles",
                items: [
                    { num: "1", title: `Employees of the Company must strictly comply with relevant laws and regulations, including the Act on Fair Transactions in Large-Scale Retail Business (hereinafter "Large-Scale Retail Business Act") and the Guidelines for Reviewing Illegality of Return Practices by Large-Scale Distributors, in addition to these Standards when transacting with Partner Companies.` },
                    { num: "2", title: "These standards shall be posted on the Company's website, etc. for Partner Companies to check at any time, and internal employees shall be regularly trained to comply with them." },
                ],
            },
            {
                no: "03",
                title: "Definition of Terms",
                definitions: [
                    { term: "1", desc: `"Supply" refers to the act of supplying products to the Company for sale, regardless of the form of transaction. The act of a Partner Company directly supplying products already sold by the Company to consumers shall also be deemed a supply in the relationship between the Company and the Partner Company.`},
                    { term: "2", desc: `"Return" refers to all acts by which the Company substantively returns products received from a Partner Company back to the Partner Company. Even if the transaction takes the form of exchanging for other products of the Partner Company while returning the originally supplied products, or any other form, if the originally supplied products are returned to the Partner Company, it shall be deemed a return regardless of the form.` },
                    { term: "3", desc: `"Direct purchase transaction" refers to a form of transaction in which the Company purchases products from a Partner Company. The inventory of purchased products not sold to consumers shall be borne by the Company.`},
                    { term: "4", desc: `"Consignment purchase transaction" refers to a form of transaction in which the Company purchases products from a Partner Company on credit on the condition that products not sold to consumers may be returned. After selling the products, the Company pays the Partner Company the product sales proceeds minus a fixed percentage or fixed amount of sales revenue.`},
                    { term: "5", desc: `"Consignment sale transaction" refers to a form of transaction in which the Company sells products received from a Partner Company under the Company's own name, and after selling the products, pays the Partner Company the product sales proceeds minus a fixed percentage or fixed amount of commission.` },
                ],
            },
            {
                no: "04",
                title: "Conditions for Returns",
                items: [
                    { num: "1", title: "The Company shall not return all or part of the products received from a Partner Company without justifiable reason." },
                    { num: "2",title: "Notwithstanding paragraph (1), returns may be made exceptionally in cases falling under any of the following items."/* 260604 번역 */, 
                      details:[
                          "1. In the case of a special-contract purchase transaction, where the return conditions are specifically agreed upon at the time of contract conclusion and a written document specifying those return conditions is given to the “Partner Company,” returns may be made if they fall under those return conditions. The “Company” may reflect specific return conditions in the “Company's” standard goods supply contract (special-contract purchase) and utilize them."/* 260604 번역 */,
                          "2. In the case of a consignment transaction, the remaining inventory products after sale may be returned without separate restriction."/* 260604 번역 */,
                          "3. Where the delivered product has been soiled or damaged due to grounds attributable to the “Partner Company,” or has a defect, the product may be returned."/* 260604 번역 */,
                          "4. Where the delivered product differs from the contracted product—that is, where important product characteristics such as the country of origin, expiration date, or size differ from the originally contracted content—the product may be returned."/* 260604 번역 */,
                          "5. Where the “Company” itself bears the loss arising from the return and obtains the consent of the relevant “Partner Company” for the return, the product may be returned."/* 260604 번역 */,
                          "6. In the case of a direct purchase transaction, for products sold intensively during a certain period or season (hereinafter “seasonal products”), where the return conditions are specifically agreed upon at the time of contract conclusion and a written document specifying those return conditions is given to the “Partner Company,” the products may be returned."/* 260604 번역 */,
                          "7. In the case of a direct purchase transaction, where the “Partner Company” voluntarily requests a return before the return date by a written document attaching objective supporting data showing that the return is directly beneficial to it, the product may be returned."/* 260604 번역 */,
                          "8. For products returned to the “Company” by a franchisee that has gone out of business, the “Company” may return them to the “Partner Company” again. In this case, products that cannot be resold may not be returned."/* 260604 번역 */,
                          "9. In other cases of direct purchase transactions where there is justifiable reason, the product may be returned. In such cases, the determination of justifiable reason shall be made individually and specifically, comprehensively considering the form and characteristics of the delivery transaction, the intent and purpose of the return, the effect on the “Partner Company,” etc."/* 260604 번역 */

                      ]},
                    { num: "3", title: "The return under paragraph (2) must be made within a period recognized as reasonable in the relevant field of transactions, and the following cases shall be presumed to be a period recognized as reasonable in the relevant field of transactions."/* 260604 번역 */,
                        details:[
                          "1. For the cases under items 3 and 4 of paragraph 2, within 10 business days from the delivery date. However, where there is a reasonable ground that the cause falling under items 3 and 4 of paragraph 2 cannot be immediately discovered by external appearance on the delivery date, the period may be extended by separate mutual agreement."/* 260604 번역 */,
                          "2. Where the product under items 3 and 4 of paragraph 2 is an agricultural, marine, or livestock product, within 2 days from the time of delivery"/* 260604 번역 */,
                          "3. For the case under item 6 of paragraph 2, within 30 days from the end of the sales season. However, where it is expected to exceed 30 days due to grounds attributable to the “Company” or the “Partner Company,” the period may be extended by mutual written agreement at least 15 days before the end of the sales season."/* 260604 번역 */]
                    },
                ],
            },
            {
                no: "05",
                title: "Detailed Return Procedures",
                items: [
                    {
                        num: "1",
                        title: "In the case of returns of products in direct purchase transactions for soiling, damage, or defects, or for supply of products different from those contracted, the Partner Company must be immediately notified and the relevant facts mutually confirmed before proceeding with return procedures.",
                    },
                    {
                        num: "2",
                        title: "If, as a result of confirmation under paragraph ①, the soiling or damage to the product was caused by the intentional act or negligence of the Company, the return may not be made. However, even in such cases, a return may be made if the Company bears all losses of the Partner Company arising from the soiling, damage, and return of the product, and obtains the Partner Company's consent.",
                    },
                    {
                        num: "3",
                        title: "In the case of consignment purchase transactions or consignment sale transactions, after the sales period has closed, unsold products must be returned to the Partner Company within the period agreed upon with the Partner Company.",
                    },
                    { 
                        num:"4",
                        title:"When returning products that have been soiled, damaged, or are defective, upon discovery of such defects, the party to whom the cause of the defect is attributable, whether the Company or the Partner Company, must be mutually confirmed through objective evidence, and the return must be made only when the attributable cause lies with the Partner Company."
                    },
                    { 
                        num:"5",
                        title:"Where products received differ from contracted products, the Partner Company must be immediately notified of the fact, and the difference from the contracted products must be mutually confirmed with the Partner Company before the return is made."
                    },
                    { 
                        num:"6",
                        title:"⑥ Where the Company intends to return products while bearing all losses incurred by the Partner Company as a result of the return and having obtained the Partner Company's consent, the Company must consult with the Partner Company in advance on the amount of losses before proceeding with the return."
                    }
                ],
            },
            {
                no: "06",
                title: "Document Exchange and Retention",
                items: [
                    {
                        num: "1",
                        title: "Where the Company and the Partner Company mutually agree on the return conditions of goods, the Company shall give the Partner Company a written document setting forth such conditions, and the written document shall be signed or sealed by the Company and the Partner Company respectively."/* 260604 번역 */,
                    },
                    {
                        num: "2",
                        title: "The agreement document may be issued in the form of an electronic document under the Framework Act on Electronic Documents and Transactions, and it is also possible to sign it with a certified electronic signature, etc., under the Digital Signature Act."/* 260604 번역 */,
                    },
                    {
                        num: "3",
                        title: "As a general rule, the 'Company' shall not have the 'Partner Company' manufacture or order products until it has issued to the supplier a document stating the return conditions. However, even before issuing a document stating the return conditions, the 'Company' may request the manufacture or ordering of products by means of a document signed or affixed with a name and seal by the 'Company.'"/* 260604 번역 */,
                    },
                    {
                        num: "4",
                        title: "The 'Company' shall retain documents stating the following matters for five years from the date on which the contract with the 'Partner Company' ends."/* 260604 번역 */,
                        details:[
                            "1. Return conditions"/* 260604 번역 */,
                            "2. List of returned products"/* 260604 번역 */,
                            "3. Quantity of returned products"/* 260604 번역 */,
                            "4. Transaction form of the returned product (direct purchase, special-contract purchase, consignment transaction)"/* 260604 번역 */,
                            "5. Return date of the returned product"/* 260604 번역 */,
                            "6. Delivery payment related to the returned product"/* 260604 번역 */,
                            "7. Reason for return of the returned product"/* 260604 번역 */,
                            "8. Where the “Partner Company” requests a return from the “Company” in writing while submitting objective supporting data proving the fact that the relevant return is directly beneficial to it: the written document and supporting data submitted by the “Partner Company”"/* 260604 번역 */,
                        ]
                    },

                ],
            },
            {
                no: "07",
                title: "Prohibition of Other Unfair Trade Practices",
                lead: "In processing return-related duties with Partner Companies, even if an act is not explicitly stated as mandatory or prohibited under these Standards, the Company shall not abuse its superior position in the trade to disadvantage Partner Companies or impose other unfair trade conditions.",
            },
            {
                no: "08",
                title: "Receipt and Processing of Reports of Unfair Acts",
                items: [
                    { num: "1", title: "If a Partner Company suffers a disadvantage due to unfair treatment resulting from the Company's employees violating these standards, it may submit a report through the Ethics Management reporting page on the Company's website, and the Company must process the reported content through the prescribed procedure." },
                    { num: "2", title: "In the course of processing the Partner Company's report, the Company shall protect the Partner Company's related information and personal details, and shall ensure that the Partner Company does not receive unfair discriminatory treatment or transaction suspension as a result of the report."},
                    { num: "3", title: "The Company shall make its best efforts to prevent recurrence of all civil complaint matters arising during transactions with Partner Companies."},
                ],
            },
            {
                no: "09",
                title: "Sanctions",
                items: [
                    { num: "1", title: "The Company's employees must comply with these standards in performing their duties; if a party is confirmed to have violated these standards intentionally or through gross negligence, sanctions shall be imposed in accordance with the Company's Code of Ethics, etc." },
                    { num: "2", title: "If a Company employee is found to have committed fraud, embezzlement, breach of trust, receipt of money, improper solicitation, or similar offenses the Company may file a criminal complaint against the relevant employee." },
                ],
            },
            {
                no: "Supplementary Provisions",
                title: "",
                addendumText: "Supplementary Provisions (April 1, 2018)<br />These standards are enacted and take effect on April 1, 2018.<br />Supplementary Provisions (June 11, 2024)<br />These standards are revised and take effect on June 11, 2024.",
            },
        ],
        ComplianceManagerBannerP1:
            "The compliance manager is appointed by the highest decision-making body, such as the board of directors, for the effective operation of the Fair Trade Compliance Program (CP)."/* 260604 번역 */,
        ComplianceManagerBannerP2:
            "The appointed manager supports the compliance of all members with laws and regulations in accordance with the CP standards and procedures, and performs a role to ensure that voluntary compliance activities are realized in the field."/* 260604 번역 */,
        ComplianceManualTitle: "Fair Trade Voluntary Compliance Handbook"/* 260604 번역 */,
        ComplianceManualMeta: "(Revised December 2024)",
        ComplianceManualBtnEbook: "View Fair Trade Compliance Manual e-Book",
        ComplianceManualBtnDownload: "Download ↓",
        WhistleGuideSections: [
            {
                key: "wg-01",
                title: "Reporting Usage Guide",
                desc: "GS Retail strives to uphold its Code of Ethics and Practice Guidelines as the standard of proper conduct and value judgment that all employees must observe.<br />The establishment of a culture of free and safe raising of issues and reporting ensures the sustainable growth of GS Retail."/* 260604 번역 */,
            },
            {
                key: "wg-02",
                title: "Reporting Operations Policy",
                desc: "We operate various reporting methods so that all executives and employees, stakeholders, and customers of the company can report any matter that violates or is feared to violate the company's code of ethics and related regulations."/* 260604 번역 */,
            },
            {
                key: "wg-03",
                title: "Scope of Reporting",
                desc: "We receive reports of cases of ethical management violations by executives, employees, and Partner Companies (acceptance of money and valuables, entertainment/hospitality, other improper conduct, etc.), unfair transactions and unjust acts, violations of laws and regulations and accounting fraud, and human rights violations such as sexual harassment and rude conduct by executives and employees, as well as other good suggestions for integrity management."/* 260604 번역 */,
            },
            {
                key: "wg-04",
                title: "Reporting Policy",
                desc: "The Company thoroughly protects the identity and confidentiality of whistleblowers and protects them from any discrimination, disadvantage, or the like in connection with their report. In addition, a reward may be paid in accordance with the reward policy for whistleblowers."/* 260604 번역 */,
            },
            {
                key: "wg-05",
                title: "5. Report Processing Procedure",
                desc: "Reports will be investigated after securing objective evidence, and appropriate follow-up measures will be taken.",
            },
            {
                key: "wg-06",
                title: "6. Reporting Methods",
                desc: "Online submission, phone, and email",
            },
        ],
        WhistleProcessSteps: ["Submission of Report", "Receipt and Investigation", "Action against Reported Party"],
        WhistleRewardPageTitle: "Reporter Reward Program",
        WhistleRewardSections: [
            {
                key: "wr-01",
                title: "1. Reportable Content",
                desc: "Reports on fraudulent and unfair acts by the Company's employees<br />Fraudulent and unfair acts by partner companies, etc.",
            },
            {
                key: "wr-02",
                title: "Reward Eligibility",
                desc: "Whistleblower: executives and employees and outside members of the public (partner companies/partner company staff/third parties)"/* 260604 번역 */,
            },
            {
                key: "wr-03",
                title: "Reward Criteria",
                criteriaTables: [
                    {
                        sectionLead:
                            "Voluntary Self-Reporting<br />&nbsp;&nbsp; The partner company is guaranteed 「transactional benefits by the CEO」."/* 260604 번역 */,
                        cols: ["Employees", "Partner Companies"],
                        cells: [
                            {
                                sub: "Exemption from or reduction of penalty for voluntary self-reporting within the deadline (within one month of the occurrence); cases where money was demanded first are excluded from eligibility",
                                desc: "Exemption from or reduction of penalty for voluntary self-reporting within the deadline (within one month of the occurrence); cases where money was demanded first are excluded from eligibility",
                            },
                            {
                                sub: "Guarantee of business-related benefits; the CEO guarantees business-related benefits. The specific benefits are determined through the Company's internal review.",
                                desc: "Guarantee of business-related benefits; the CEO guarantees business-related benefits. The specific benefits are determined through the Company's internal review.",
                            },
                        ],
                    },
                    {
                        sectionLead: "(2) Report by Third Party<br />&nbsp;&nbsp; Rewards of up to 「KRW 100 million」 are granted."/* 260604 번역 */,
                        cols: ["Monetizable", "Non-monetizable"],
                        cells: [
                            {
                                sub: "If the report can be monetized and contributes to establishing ethical management at the Company, up to KRW 100 million may be paid based on internal standards, taking into account the amount of loss reduction (revenue increase)",
                                desc: "If the report can be monetized and contributes to establishing ethical management at the Company, up to KRW 100 million may be paid based on internal standards, taking into account the amount of loss reduction (revenue increase)",
                            },
                            {
                                sub: "If the report cannot be monetized and contributes to establishing ethical management at the Company, a fixed amount of KRW 500,000 is paid",
                                desc: "If the report cannot be monetized and contributes to establishing ethical management at the Company, a fixed amount of KRW 500,000 is paid",
                            },
                        ],
                    },
                ],
            },
            {
                key: "wr-04",
                title: "4. Selection of Reward",
                desc: "- The content of the report must be verified as fact by the secretariat of the Company's Ethics Committee (Management Diagnosis Team).<br />- The determination and finalization of the reward details (amount or transactional benefit) shall be decided after deliberation by the Company.<br />- Where grounds for reward arise in duplicate, the largest amount or benefit shall be used as the basis."/* 260604 번역 */,
            },
            {
                key: "wr-05",
                title: "Reward Payment Criteria",
                desc: "- The commendation money shall be determined by considering the reporter's contribution to detecting and handling the misconduct through their report.<br />- Where two or more reporters report the same misconduct of the same reported person, no reward or commendation money shall be paid to the reporter who reported later.<br />&nbsp;&nbsp;(An exception applies where a later-filed report is used as decisive material in resolving a misconduct case.)<br />- Where two or more persons jointly report the same misconduct of the same reported person, the commendation money shall be paid in equal shares within the scope of the payment criteria."/* 260604 번역 */,
            },
            {
                key: "wr-06",
                title: "Criteria for Determining Reporter's Contribution",
                desc: "Accuracy of the report, including credibility of evidence<br />- Whether the reported person's misconduct has already been disclosed by media outlets such as newspapers and broadcasts<br />Whether the reporter engaged in illegal acts related to the report<br />- Whether the reporter was under an obligation to report the misconduct, or whether they reported corruption in connection with their duties<br />The extent to which the reporter contributed to resolving the misconduct case"/* 260604 번역 */,
            },
            {
                key: "wr-07",
                title: "Results of Report Verification",
                desc: "Rewards will not be given in the following cases:<br />- Where the content of the report is found to be untrue, or where it is difficult to verify its truth due to insufficient evidence<br />- For reports of unethical conduct not related to work involving external stakeholders (however, acts that cause direct loss to the Company, such as embezzlement of public funds or theft of company assets, are eligible for reward)<br />- Matters already reported, or matters already recognized by the Management Diagnosis Team or other departments or external agencies and currently under investigation, or for which disciplinary procedures, etc. are in progress or have been completed<br />When the matter has been disclosed through media coverage or similar means<br />- Where a report is made anonymously or under a pseudonym such that the reporter's identity cannot be ascertained<br />When the matter is solely related to business process improvement<br />- Where the report is made by an employee of the Management Diagnosis Team or a similar department engaged in investigation-related duties<br />When the reward review determines that compensation is inappropriate for any other reason"/* 260604 번역 */,
            },
        ],
        WhistleProtectPageTitle: "Reporter Protection Program",
        WhistleProtectPageDesc: "By establishing new employee conduct standards and providing employee training, the Company strengthens confidentiality protections for reporters as follows:",
        WhistleProtectSections: [
            {
                key: "wp-01",
                title: "Prohibition of revealing and investigating the reporter's identity",
                desc: "By establishing new employee conduct standards and providing employee training, the Company strengthens confidentiality protections for reporters as follows:<br />1. Prohibition of revealing and investigating the reporter's identity<br />The Management Audit Team, which verifies facts related to reports, is prohibited from disclosing or hinting at the identity of reporters and investigation cooperators without the consent of the reporter.<br />Any employee who becomes aware of a reporter's identity, whether through their duties or by chance, is prohibited from disclosing that identity.<br />Any acts by the reported party, the reported party's department, or other related departments that could expose the reporter's identity, including inquiries to the Management Audit Team about the reporter's identity or investigative activities to identify the reporter, are strictly prohibited.<br />Relevant parties who violate the obligation to protect identity (personnel or business disadvantage) shall be subject to disciplinary action. (Referred to the company-wide Ethics Committee.)<br />The following disadvantageous measures against employees and companies that have submitted reports are prohibited, and employees who impose such disadvantageous measures shall be referred to the company-wide Ethics Committee.",
                grayBox: {
                    title: "Definition of Disadvantageous Measures",
                    desc: "1) Personnel disadvantages amounting to loss of status, such as dismissal, removal from office, discharge, or other loss of status<br />Disciplinary action, suspension, promotion restrictions, or other improper personnel measures<br />3) Personnel measures against one's will, such as transfer, relocation, non-assignment of duties, reassignment of duties, etc.<br />4) Acts that cause mental or physical harm, such as preparing a list of persons subject to caution or disclosing such a list, collective ostracism, assault or abusive language, etc.<br />5) Termination of a goods contract or service contract, or other measures that impose economic disadvantage"/* 260604 번역 */,
                },
            },
            {
                key: "wp-02",
                title: "2. When the Reporter's Identity Is at Risk of Exposure",
                desc: "2. When the Reporter's Identity Is at Risk of Exposure<br />If the reporter's identity is at risk of exposure, the party concerned shall notify the Management Audit Team; the Management Audit Team shall investigate how the identity was exposed and refer the relevant parties to the company-wide Ethics Committee.<br />If the reporter so wishes, they may request a meeting with the Management Audit Team; in such a case, the Management Audit Team may, after reporting to the CEO, recommend immediate personnel measures, such as reassignment or relocation, for the employee who attempted to identify the reporter.",
            },
        ],
        ReportIntroTitle: "This is where you can submit reports of fraudulent or unfair acts by GS Retail employees and partner companies, as well as improvement suggestions.",
        ReportIntroDesc: "Please refer to the guidance for each menu below when writing your submission.",
        ReportChannelItems: [
            {
                key: "voice",
                title: "Customer Feedback",
                desc: "For complaints, inconveniences, or compliments regarding GS25, GS SHOP, GS THE FRESH, or POP, please submit them through the Customer Feedback channel, where the relevant department will respond promptly.",
                btnText: "Go to Customer Feedback >",
            },
            {
                key: "ethics",
                title: "Ethics Hotline",
                desc: "Reports of fraudulent or unfair acts by employees and partner companies → Submit to the investigation department (Management Audit Team)",
                btnText: "Contact Us >",
            },
            {
                key: "redwhistle",
                title: "Red Whistle (External Reporting Channel)",
                desc: "Reports of unfair acts and ethics violations related to GS Retail's Ethics Management<br />⇒ An anonymous reporting system operated by an external organization, with strict protection of anonymity and confidentiality",
                btnText: "Contact Us >",
            },
        ],
        ReportNotice: [
            "※ Other reporting methods: GS Retail Management Audit Team (+82-2-2006-2088 / singo@gsretail.com)",
            "※ GS Retail operates a Reporter Reward Program and a Reporter Protection Program.",
        ],
        EthicsReportTargetItems: [
            {
                num: "01",
                title: "Poor Performance of Duties",
                desc: "Poor Performance of Duties<br />Neglect/insufficiency of duties and concurrent employment (second jobs, etc.)<br />Violation of standards",
            },
            {
                num: "02",
                title: "Receipt of Money or Gifts and Entertainment",
                desc: "Receipt of Money or Gifts and Entertainment<br />Acts of giving or receiving money, gifts, or other valuables, or providing entertainment involving the Company's employees",
            },
            {
                num: "03",
                title: "Financial Transactions and Joint Investment",
                desc: "Financial Transactions and Joint Investment<br />Acts by the Company's employees involving financial transactions, etc.",
            },
            {
                num: "04",
                title: "Unfair Trade and Improper Solicitation",
                desc: "Unfair Trade and Improper Solicitation<br />Non-compliance with standards and unfair acts when opening new stores",
            },
            {
                num: "05",
                title: "Proposals to improve unreasonable work practices/systems"/* 260604 번역 */,
                desc: "Request for improvement of unnecessary work"/* 260604 번역 */,
            },
            {
                num: "06",
                title: "Sexual Harassment and Workplace Bullying",
                desc: "",
            },
        ],
        EthicsConsentRequired: "[Optional]"/* 260604 번역 */,
        EthicsConsentTitle: "Consent to Provision of Personal Information"/* 260708 번역 */,
        EthicsConsentNotice: "You have the right to refuse this consent; however, if you do not consent, you may have difficulty receiving accurate and prompt answers to inquiries that require verification."/* 260708 번역 */,
        EthicsConsentItems: [
            "The information you enter will be transmitted to the relevant department (person in charge) for prompt and accurate processing and will be used to respond to inquiries and complaints.",
            "- Recipients: the manager of the GS Retail store to which you submitted your inquiry, GS Retail subsidiaries, and the manager (handler) of the manufacturer of products carried by GS Retail"/* 260604 번역 */,
            "Purpose of Use: Used for confirming inquiries and providing responses",
            "Personal Information Items: Name, contact number, email address",
            "- Retention and Use Period: One year after receipt",
        ],
        EthicsConsentRequired2: "[Required]"/* 260604 번역 */,
        EthicsConsentItems2: [
            "- The information you enter is used solely to verify your inquiry. The items collected, the use and purpose, and the retention and use period are as follows. For other matters concerning the handling of personal information, please refer to the 'Privacy Policy' at the bottom of the website."/* 260604 번역 */,
            "Items of personal information collected: Name, contact number, email",
            "- Collection, use, and purpose: Use of the collected personal information to identify the individual and to verify and respond to inquiries"/* 260604 번역 */,
            "- Retention and Use Period: One year after receipt",
        ],
        EthicsCardItems: [
            {
                key: "ethics-01",
                image: imgEthics01,
                imgAlt: "1. Image related to responsibility and obligations toward customers"/* 260604 번역 */,
                title: "1. Responsibilities and Obligations to Customers",
                desc: "1. Responsibilities and Obligations to Customers<br />Under the belief that customers are the foundation of business, the Company respects customer opinions and creates and delivers value that benefits customers, thereby earning customer trust.",
            },
            {
                key: "ethics-02",
                image: imgEthics02,
                imgAlt: "2. Image related to fair competition"/* 260604 번역 */,
                title: "2. Fair Competition",
                desc: "2. Fair Competition<br />In all business activities worldwide, the Company complies with applicable local laws and regulations and secures a competitive advantage through legitimate means.",
            },
            {
                key: "ethics-03",
                image: imgEthics03,
                imgAlt: "3. Image related to fair trade"/* 260604 번역 */,
                title: "3. Fair Trade",
                desc: "3. Fair Trade<br />All transactions are conducted on the basis of free competition, with equal participation opportunities guaranteed, and mutual trust and cooperative relationships are built through transparent and fair trade, thereby pursuing mutual growth from a long-term perspective.",
            },
            {
                key: "ethics-04",
                image: imgEthics04,
                imgAlt: "4. Image related to the basic ethics of executives and employees"/* 260604 번역 */,
                title: "4. Basic ethics of executives and employees"/* 260604 번역 */,
                desc: "4. Basic Ethics of Employees<br />Employees shall establish sound values grounded in honesty and fairness, and fulfill their given mission through continuous self-development and fair execution of duties.",
            },
            {
                key: "ethics-05",
                image: imgEthics05,
                imgAlt: "5. Image related to responsibility toward executives and employees"/* 260604 번역 */,
                title: "5. Responsibility toward executives and employees"/* 260604 번역 */,
                desc: "5. Responsibilities toward Employees<br />The Company respects all employees as human beings and treats them fairly based on their capabilities and achievements, and endeavors to enable employees to fully express their creativity.",
            },
            {
                key: "ethics-06",
                image: imgEthics06,
                imgAlt: "6. Image related to responsibility toward the nation and society"/* 260604 번역 */,
                title: "6. Responsibilities toward the Nation and Society",
                desc: "6. Responsibilities toward the Nation and Society<br />Through sound business development, the Company grows into a healthy enterprise that protects shareholder interests and contributes to the prosperity of the people and the advancement of society.",
            },
        ],
        EthicsPracticeItems: [
            {
                key: "practice-01",
                title: "01. Accepting remuneration from stakeholders",
                desc: "No money, valuables, or the like shall be received from a stakeholder, and when a gift is given, it must be politely declined or returned."/* 260604 번역 */,
            },
            {
                key: "practice-02",
                title: "02. Joint investment with stakeholders, joint acquisition of assets, and improper equity participation in business partners",
                desc: "Where executives, employees, and their families jointly invest funds with a stakeholder (regardless of purpose) to jointly acquire movable or immovable property, the amount equivalent to their share shall be deemed to have been received from the stakeholder, and the unjust acquisition of equity in the listed or unlisted securities of a trading company with which there is a conflict of interest is absolutely prohibited."/* 260604 번역 */,
            },
            {
                key: "practice-03",
                title: "Illegal use of company assets",
                desc: "The company's tangible and intangible assets, confidential information, and the like are important assets of the company, and these assets must be used only for the company's business activities and approved purposes, and executives and employees are responsible for guarding against the loss, misuse, and theft of assets.​ The company's expenses, as public funds, must be used in accordance with their designated purposes and must comply with the company's standards."/* 260604 번역 */,
            },
            {
                key: "practice-04",
                title: "Poor Performance of Duties",
                desc: "Executives and employees shall fulfill their duty of care as a good manager, and shall not commit any act that causes loss to the company or damages its reputation by violating this duty."/* 260604 번역 */,
            },
            {
                key: "practice-05",
                title: "05. Using one's position for personal gain",
                desc: "Executives and employees shall not use information or knowledge acquired through their duties for personal profit, and shall not give unjust instructions or make unjust demands to stakeholders over whom they exert business influence by means of their duties."/* 260604 번역 */,
            },
            {
                key: "practice-06",
                title: "06. Manipulation of documents and figures and false reporting",
                desc: "No one shall, by intentionally manipulating or falsifying documents or figures contrary to the facts, or by directing or inducing such acts, cloud the decision-making and judgment of a superior or relevant department or cause a misjudgment; and all information shall be recorded and reported accurately and honestly."/* 260604 번역 */,
            },
            {
                key: "practice-07",
                title: "Prohibition of sexual harassment",
                desc: "Executives and employees shall not engage in any verbal, physical, or visual conduct that causes offense to others, including any act of sexual harassment that may infringe upon an individual's human rights and undermine the working atmosphere."/* 260604 번역 */,
            },
            {
                key: "practice-08",
                title: "08. Prohibition of workplace bullying",
                desc: "Executives and employees shall not, by taking advantage of superiority such as their position or relationships in the workplace and exceeding the appropriate scope of work, commit any act that causes physical or mental suffering to other workers or worsens the working environment."/* 260604 번역 */,
            },
            {
                key: "practice-09",
                title: "09. Acts that damage the Company's reputation",
                desc: "No act shall be committed that damages the company's reputation externally through poor job performance or for personal gain."/* 260604 번역 */,
            },
        ],
        EthicsPledgeText: "I hereby pledge to make every effort to uphold the detailed provisions of GS Retail's Code of Ethics.",
        EthicsPledgeMeta: "20**. 01. 01",
        EthicsPledgeCompany: "***** Division *** Points *********"/* 260604 번역 */,
        EthicsPledgeName: "Hong Gil-dong (signature)"/* 260604 번역 */,
        hcEmailLabel: "Email"/* 260708 번역 */,
        hcAriaHistory: "Integrity Management History"/* 260708 번역 */,
        hcAriaOfficerProc: "Compliance Officer Appointment Procedure"/* 260708 번역 */,
        hcAltSign: "Kwak Chang-heon's signature"/* 260708 번역 */,
        hcPlaceholder5W1H: "1. Who:\n2. When:\n3. Where:\n4. Details:\n5. Persons aware:\n6. Means of verification:"/* 260708 번역 */,
        hc01: "* When uploading multiple files, please compress them into a zip file before uploading (*Size limit: 20MB)"/* 260708 번역 */,
        hc02: "* Required fields"/* 260708 번역 */,
        hc03: "Since 1995, we have declared our commitment to transparent transactions both internally and externally and have voluntarily practiced fair trade,"/* 260708 번역 */,
        hc04: "In accordance with GS Group's integrity management policy, our company has also been carrying out various activities in line with this policy since 1995."/* 260708 번역 */,
        hc05: "Dear employees of GS Retail!"/* 260708 번역 */,
        hc06: "Scope of GS Retail Integrity Management Reporting"/* 260708 번역 */,
        hc07: "GS Retail Sustainability Management Division"/* 260708 번역 */,
        hc08: "GS Retail is"/* 260708 번역 */,
        hc09: "In order to establish a transparent transaction order and continuously implement its voluntary compliance program, GS Retail"/* 260708 번역 */,
        hc10: "With transparent, fair, and reasonable thinking and"/* 260708 번역 */,
        hc11: "Through trust and cooperation with its partner companies, GS Retail pursues mutual development and, for the"/* 260708 번역 */,
        hc12: "※ When entering details, please refrain from writing personal information such as contact numbers or addresses in order to protect personal data."/* 260708 번역 */,
        hc13: "Please write your report based on the 5W1H principle wherever possible; if the content is inaccurate, it may be excluded from investigation."/* 260708 번역 */,
        hc14: "Thank you."/* 260708 번역 */,
        hc15: "so that we may earn the trust of our customers and partner companies and continue to grow, we ask for your"/* 260708 번역 */,
        hc16: "Customer Information"/* 260708 번역 */,
        hc17: "we have adopted and applied the Four Major Fair Trade Guidelines."/* 260708 번역 */,
        hc18: "It is a system designed not only to prevent violations of fair trade laws and regulations in advance, but also to detect and correct any violations at an early stage."/* 260708 번역 */,
        hc19: "Fair Trade Voluntary Compliance"/* 260708 번역 */,
        hc20: "The Fair Trade Voluntary Compliance Program (CP: Compliance Program) is"/* 260708 번역 */,
        hc21: "The Fair Trade Voluntary Compliance Program is not solely the responsibility of the Compliance Officer and the CP administrative department,"/* 260708 번역 */,
        hc22: "Through proper business conduct based on fair trade voluntary compliance, we can reduce risk and achieve sustainable"/* 260708 번역 */,
        hc23: "Kwak Chang-heon"/* 260708 번역 */,
        hc24: "Category"/* 260708 번역 */,
        hc25: "Therefore, it is not an option but an indispensable requirement for a company and its members to voluntarily comply with the established laws and regulations governing fair competition."/* 260708 번역 */,
        hc26: "It is a compliance system operated by a company to voluntarily comply with fair trade laws and regulations,"/* 260708 번역 */,
        hc27: "Details"/* 260708 번역 */,
        hc28: "Store Name"/* 260708 번역 */,
        hc29: "It is the principle and standard that all employees must observe in carrying out their daily work."/* 260708 번역 */,
        hc30: "an exemplary company."/* 260708 번역 */,
        hc31: "Purpose and Intent"/* 260708 번역 */,
        hc32: "protects GS Retail and its employees from violations of laws and regulations, and"/* 260708 번역 */,
        hc33: "It protects GS Retail and its employees from violations of laws and regulations and earns the trust of customers and partner companies,"/* 260708 번역 */,
        hc34: "We will ensure that no disadvantage of any kind arises for those who seek consultation or make a report."/* 260708 번역 */,
        hc35: "Executive Vice President"/* 260708 번역 */,
        hc36: "growth."/* 260708 번역 */,
        hc37: "Submit"/* 260708 번역 */,
        hc38: "strong execution, we realize ethical management as our foremost fundamental value."/* 260708 번역 */,
        hc39: "Hello. I am Kwak Chang-heon, Executive Vice President and Compliance Officer."/* 260708 번역 */,
        hc40: "We will always put ourselves in our customers' shoes and listen to even the smallest voices."/* 260708 번역 */,
        hc41: "Contact"/* 260708 번역 */,
        hc42: "History"/* 260708 번역 */,
        hc43: "Today, fulfilling social responsibility and establishing a fair and transparent management system have become key factors in determining a company's potential for sustainable growth."/* 260708 번역 */,
        hc44: "We ask for your active practice of voluntary compliance so that GS Retail may continue to grow."/* 260708 번역 */,
        hc45: "Please be assured that all submissions received here are handled with thorough security and safety."/* 260708 번역 */,
        hc46: "Name"/* 260708 번역 */,
        hc47: "Despite the inherent nature of business activities that pursue profit maximization,"/* 260708 번역 */,
        hc48: "Compliance Officer"/* 260708 번역 */,
        hc49: "Compliance Officer Appointment Procedure"/* 260708 번역 */,
        hc50: "Role of the Compliance Officer"/* 260708 번역 */,
        hc51: "The Compliance Officer and the CP administrative department will do their utmost to assist all employees."/* 260708 번역 */,
        hc52: "an exemplary company in fair trade voluntary compliance, dedicated to establishing and spreading a culture of voluntary compliance."/* 260708 번역 */,
        hc53: "Through proper business conduct based on voluntary compliance, we can reduce risk and achieve sustainable growth."/* 260708 번역 */,
        hc54: "for its active implementation, GS Retail has appointed and operates a ‘Compliance Officer’ in accordance with established standards and procedures."/* 260708 번역 */,
        hc55: "active practice of voluntary compliance."/* 260708 번역 */,
        hc56: "Voice of Integrity Management"/* 260708 번역 */,
        hc57: "Voice of Integrity Management accepts not only reports of unfair practices by employees or partner company staff (accepting money or valuables, entertainment and hospitality, omission of sales, unfair trade, and other misconduct), but also constructive opinions for integrity management."/* 260708 번역 */,
        hc58: "Integrity Management Cyber Ombudsman"/* 260708 번역 */,
        hc59: "Title"/* 260708 번역 */,
        hc60: "Report Category"/* 260708 번역 */,
        hc61: "Report Details"/* 260708 번역 */,
        hc62: "Reporting Guidelines"/* 260708 번역 */,
        hc63: "Whistleblower Protection System"/* 260708 번역 */,
        hc64: "Whistleblower Reward System"/* 260708 번역 */,
        hc65: "Submit a Report"/* 260708 번역 */,
        hc66: "Cancel"/* 260708 번역 */,
        hc67: "Attach File"/* 260708 번역 */,
        hc68: "GS Retail, a leader in the convenience store, supermarket, and home shopping businesses, in order to meet the demands of the times for fair business practices,"/* 260708 번역 */,
        hc69: "Please absolutely refrain from any act that damages an individual's reputation by reporting false facts."/* 260708 번역 */,
        hc70: "Method of Reply"/* 260708 번역 */,
        hc71: "1. Who:&#10;2. When:&#10;3. Where:&#10;4. Details:&#10;5. Persons aware:&#10;6. Means of verification:"/* 260708 번역 */,
        hc72: "Kwak Chang-heon's signature"/* 260708 번역 */,
        hc73: "Compliance Officer Appointment Procedure"/* 260708 번역 */,
        hc74: "Integrity Management History"/* 260708 번역 */,
        hc75: "Report Processing Stages"/* 260708 번역 */,
        EthicsMainTitle: "GS Retail realizes ethical management as its foremost core value through transparent, fair, and rational thinking and execution."/* 260708 번역 */,
        EthicsCodeTitle: "GS Retail Code of Ethics"/* 260708 번역 */,
        EthicsCodeDesc: "Based on mutual trust and cooperation, GS Retail pursues shared interests with all stakeholders and, to grow into the admired Value No.1 company, has established its Code of Ethics as the standard for right conduct and value judgment, walking the path of integrity management."/* 260708 번역 */,
        EthicsCodeBtn: "GS Retail Co., Ltd. Code of Ethics"/* 260708 번역 */,
        EthicsGuideTitle: "GS Retail Practice Guidelines"/* 260708 번역 */,
        EthicsGuideDesc: "This content specifically explains the \"Basic Ethics of Employees\" that GS Retail members must uphold to create a new organizational culture of honesty and fairness, and is institutionalized for ease of practice."/* 260708 번역 */,
        EthicsPracticeSubTitle: "Detailed Practice Guidelines"/* 260708 번역 */,
        EthicsPledgeTitle: "Code of Ethics Practice Pledge"/* 260708 번역 */,
        EthicsPledgeDesc: "Having fully understood the basic ethics of employees for integrity management, as a member of GS Retail I shall not engage in the following acts in performing company duties."/* 260708 번역 */,
        EthicsPledgeDateLabel: "Date"/* 260708 번역 */,
        EthicsPledgeDeptLabel: "Affiliation"/* 260708 번역 */,
        EthicsPledgeNameLabel: "Name"/* 260708 번역 */,
        EthicsPledgeToCompany: "To GS Retail Co., Ltd."/* 260708 번역 */,
        PurposeFeatureItems: [
            {
                title: "Gaining Legitimacy",
                desc: "Gaining Legitimacy<br />To establish a foundation for gaining social legitimacy regarding the company's reason for existence.",
            },
            {
                title: "Enhancement of Competitiveness",
                desc: "Enhancement of Competitiveness<br />To enhance the competitiveness of the company and the nation over the long term.",
            },
            {
                title: "Resolution of Friction and Conflicts",
                desc: "Resolution of Friction and Conflicts<br />By establishing clear behavioral standards, friction and conflicts among members can be effectively resolved.",
            },
        ],
        HistoryItems: [
            {
                period: "2016 ~ Present",
                summary: null,
                details: [
                    { term: "Key Company Activities", desc: "- Introduction of a continuous monitoring system" },
                    { term: null, desc: "- Fair DNA campaign conducted" },
                    { term: null, desc: "- Support for ethical management activities of subsidiaries" },
                    { term: null, desc: "- Establishment of Code of Ethics and Integrity Regulations (July 2021)" },
                    { term: null, desc: "- Reflection of ethical management items in evaluations for all position holders company-wide (2021~)" },
                ],
            },
            {
                period: "2003 ~ 2015",
                summary: "Continuous Implementation",
                details: [
                    { term: "Key Group Activities", desc: "Launch of Ethics Management TFT (April 2003)" },
                    { term: null, desc: "Implementation of Code of Ethics and strengthening of fairness and transparency audits at affiliate companies" },
                    { term: "Key Company Activities", desc: "Transition from fraud investigation audits to pre-emptive business diagnosis" },
                    { term: null, desc: "Establishment of Ethics Management website (July 2003)" },
                    { term: null, desc: "GS Retail Forbes Management Quality Grand Prize, 1st place in the Ethical Management category (August 2007)"/* 260604 번역 */ },
                ],
            },
            {
                period: "2002 ~ 2003",
                summary: "Establishing the Foundation for Code of Ethics Implementation",
                details: [
                    { term: "Key Group Activities", desc: "Operation of a performance-linked evaluation system" },
                    { term: null, desc: "Verification audits on Code of Ethics compliance" },
                    { term: "Key Company Activities", desc: "Following the merger of the three companies in July 2002, the Tax Practice Guidelines for the Code of Ethics were established and promulgated (August 2002)."/* 260604 번역 */ },
                    { term: null, desc: "All employees signed the Code of Ethics Pledge" },
                    { term: null, desc: "Continued Code of Ethics training for new and experienced hires" },
                ],
            },
            {
                period: "1995 ~ 2001",
                summary: "Establishing the Foundation for Code of Ethics Implementation",
                details: [
                    { term: "Key Group Activities", desc: "1993: Fairness, honesty, and integrity report" },
                    { term: null, desc: "1995: Establishment and proclamation of Code of Ethics; completion of fair trade system" },
                    { term: "Key Company Activities", desc: "Code of Ethics implementation department: Audit Team (1996)" },
                    { term: null, desc: "April 1996: Code of Ethics training and pledge of commitment to its practice: company-wide, assistant manager level and above"/* 260604 번역 */ },
                    { term: null, desc: "Operation of unfair practices reporting center; continued internal audit related to fraud and corruption" },
                ],
            },
        ],
    }
};
const t = computed(() => {
    const selected = langData[props.lang];
    if (selected && Array.isArray(selected.Tabs1) && selected.Tabs1.length > 0) {
        return selected;
    }
    return langData.ko;
});

watch(CTabIdxCompliance, () => {
    CTabIdxFairTradeBiz.value = 0;
});

const resetEthicsInquiryState = () => {
    isEthicsInquiryOpen.value = false;
    isEthicsConsentAgreed.value = false;
    isEthicsConsentAgreed2.value = false;
};

const onTabChange1 = (idx) => {
    CTabIdx.value = idx;
    CTabIdxEsgArchive.value = 0;
    CTabIdxEsgSystem.value = 0;
    CTabIdxCompliance.value = 0;
    resetEthicsInquiryState();
};

const goToWhistleTab = (idx) => {
    CTabIdxEsgSystem.value = idx;
};

const openEthicsInquiry = () => {
    isEthicsInquiryOpen.value = true;
};

const closeEthicsInquiry = () => {
    resetEthicsInquiryState();
};
const openModal=event => {
    const el = event.currentTarget;
    const popId = el.dataset.popid;
    const type = el.dataset.type || "default";
    const cont = el.dataset.cont;
    modal.open(popId, type, el, cont);
}
</script>

<style scoped>
:deep(.p_br) { display: block; }
img { width:100%; height:auto; display:block; object-fit: cover; }
.main-container { width: 100%; position: relative; display: block; }
.title_wrap { width: 100%; height: 480px; padding: 10.91% 0 11.25%; background: url(@/assets/images/dummy/gsrsu040101_bg.jpg) no-repeat center / cover; text-align: center; position: relative; display: block; }
.title_wrap::after { content:'';width:100%; height:100%; background-color:rgba(0, 0, 0, 0.5);position:absolute;left: 0; top:0; z-index:1; }
.page_title { color: #fff; font-size: 7.2rem; font-weight: 700;line-height:1.24;letter-spacing: -0.02em; text-align: center; position: relative; display: block; z-index: 2; }
.visual_sub { color:#fff;font-weight: 700;font-size: 3.2rem;line-height: 1.3;letter-spacing: -0.01em;text-align: center; position: relative; z-index: 2;}
.panel { padding-top:80px; }
.panel_third_depth { padding-top: 80px; }
:deep(.txt_blue) { color:#107AF2 !important; }
:deep(.txt_red) { color:#FB6432 !important; }
section + section { padding-top:120px; }
.sub_header { margin-bottom:40px; }
.sub_header h3 { font-weight: 700; font-size: 4rem; line-height: 1.35; letter-spacing: -0.01em; }
.sub_header p { margin-top: 16px; font-size: 2.4rem; line-height: 1.5; letter-spacing: -0.01em; }
.tab_header { margin-bottom:80px; padding: 20px 0; text-align: center; }
.tab_header > h2 { font-weight: 700;font-size: 4rem;line-height: 1.3;letter-spacing: -0.01em; } /* 2026.07.06 edit 이소라 */
.tab_header > p { margin-top: 16px; font-size: 2.4rem; line-height: 1.5; letter-spacing: -0.01em; }

:deep(.feature_cards_grid.feature_card_list) { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
:deep(.feature_cards_grid.ft_gd_cards.feature_card_list) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
:deep(.feature_cards_grid.ft_gd_cards.feature_card_list .feature_card_item) { min-height:288px; }
.ft_gd_cards :deep(.feature_card_action) { margin-top: 40px; }
/* :deep(.feature_cards_grid .feature_card_item) {  min-width: 0; } */
:deep(.law_feature_cards .feature_card_item){width: 100%; min-height:140px;}
:deep(.law_feature_cards .feature_card_num), .law_feature_cards :deep(.feature_card_title) { margin-bottom:6px; }

.purpose_feature_cards :deep(.feature_card_desc), .law_feature_cards :deep(.feature_card_desc) { color:#161616; font-size: 1.8rem; line-height: 1.4;}
.cp_manager_role_cards :deep(.feature_card_item) { min-height: 140px; }
.ft_acc_wrap :deep(dl.board_type_toggle) { border-top: 1px solid #161616; }
.ft_acc_wrap :deep(dl.board_type_toggle > dd) { border-bottom: 1px solid #d7d7df; }
.ft_acc_wrap :deep(dt > a.acc_tit_btn) { min-height: 80px; padding: 24px 20px; font-weight: 700; font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
.ft_acc_wrap :deep(dt > a.acc_tit_btn .acc_tit_txt) { font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: inline-flex; align-items: center; }
.ft_acc_wrap :deep(dt > a.acc_tit_btn .acc_num) { margin-right: 8px; padding:2px 9px; font-weight: 700; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }


.cp_manager_banner { width: 100%; min-height: 588px; padding:67px 130px; background: url(@/assets/images/dummy/gsrsu040101_10.png) no-repeat center center / cover; display: flex; justify-content: flex-end; align-items: center; }
.cp_manager_banner figcaption { max-width:621px; margin-left:auto; }
.cp_manager_banner figcaption > strong { font-size: 4rem;line-height: 1.3;letter-spacing: -0.01em; }
.cp_manager_banner figcaption p { margin-top:40px;font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em; }
.cp_manager_banner_content { margin-top:40px; display: flex; gap: 17px; align-items: center; }
.cp_manager_banner + p { margin-top:64px;font-size: 2.4rem;line-height: 1.5;letter-spacing: -0.01em; }
.cp_manager_banner_content dl dt, .cp_manager_banner_content dl dd { font-size: 1.4rem;line-height: 1.4;letter-spacing: -0.01em; }
.cp_manager_banner_content dl dd strong { font-size: 1.6rem; font-weight: 700; line-height: 1.24; }
.cp_manager_banner_content >div { flex: 0 1 auto; }
.cp_appoint_board .process_flow { display: flex; gap: 20px; align-items: center; width: 100%; box-sizing: border-box; flex-wrap: wrap; justify-content:center; }
.cp_appoint_board .process_flow > article { flex: 0 1 200px; aspect-ratio: 1; min-width: 0; background-color: #f8f8f8; border-radius: 999px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; overflow: hidden; }
.cp_appoint_board .process_flow > article > h4 { color: #000000; font-size:2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.cp_appoint_board .process_flow > article > h4 + p { margin: 12px 0 0; color: #000000; font-size:1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em; word-break: keep-all; }
.purpose_feature_cards :deep(.feature_card_title) { color: #107af2; }
:deep(.ethics_target_list.num_info_list) { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 64px 60px; }
.ethics_target_list :deep(.num_info_item) { padding: 0; border-bottom: 0; }
.ethics_target_list :deep(.num_info_title) { margin-bottom: 24px; }
.ethics_target_list :deep(.num_info_num) { font-size: 2.8rem; line-height: 1.35; letter-spacing: -0.01em; }
.ethics_target_list :deep(.num_info_title > strong) { font-size: 2.4rem; line-height: 1.35; letter-spacing: -0.01em; }
.ethics_target_list :deep(.num_info_body > p) { font-size: 1.6rem; font-weight: 700; line-height: 1.24; letter-spacing: 0; }
.ethics_target_list :deep(.num_info_icon)::before {content: ''; width: 40px; height: 40px; display: block; background: url(@/assets/images/sub/icon_cont_40.png) no-repeat; position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);}
:deep(.ethics_target_list.num_info_list) li:first-child .num_info_icon::before {background: url(@/assets/images/sub/icon_gsrsu040104_01.png) no-repeat center;}
:deep(.ethics_target_list.num_info_list) li:nth-child(2) .num_info_icon::before {background-position: -20px -266px;}
:deep(.ethics_target_list.num_info_list) li:nth-child(3) .num_info_icon::before {background: url(@/assets/images/sub/icon_gsrsu040104_03.png) no-repeat center;}
:deep(.ethics_target_list.num_info_list) li:nth-child(4) .num_info_icon::before {background: url(@/assets/images/sub/icon_gsrsu040104_04.png) no-repeat center;}
:deep(.ethics_target_list.num_info_list) li:nth-child(5) .num_info_icon::before {background-position: -660px -186px;}
:deep(.ethics_target_list.num_info_list) li:nth-child(6) .num_info_icon::before {background-position: -740px -104px;}
.report_form_wrap .apply_form .form_field > :deep(.select), .report_form_wrap .apply_form .form_field > :deep(.input_wrap) { width: 428px; max-width: 428px; }
.report_form_wrap .apply_form .form_field_phone label.select, .report_form_wrap .apply_form .form_field_phone > :deep(.input_wrap) { width: 134px; max-width: 134px; }
.report_form_wrap .apply_form .form_field_name > :deep(.input_wrap) { width: 205px; max-width: 205px; }
.report_form_wrap .apply_form .form_field_email > :deep(.input_wrap:nth-child(1)) { width: 205px; max-width: 205px; }
.report_form_wrap .apply_form .form_field_email > :deep(.input_wrap:nth-child(3)), .report_form_wrap .apply_form .form_field_email label.select { width: 180px; max-width: 180px; }
.report_form_wrap .apply_form .form_field_content > textarea { width: 600px; min-height: 170px; padding: 12px 16px; border: 1px solid #c4c4d0; border-radius: 12px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; resize: none; }
.report_form_wrap .apply_form .form_field_content > textarea::placeholder { color: #A4A4B0; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.report_form_wrap .apply_form .form_row_content { align-items: start; }
.report_form_wrap .apply_form .form_row_content .form_label { padding-top: 68px; }
.report_form_wrap .apply_form .form_field_file .file_row { display: flex; align-items: center; gap: 10px; }
.report_form_wrap .apply_form .form_field_file .file_row > span { color: #161616; font-size: 1.4rem; line-height: 1.4; }
.purpose_feature_cards :deep(.feature_card_item) { min-height: 194px; padding: 32px; }
.purpose_feature_cards :deep(.feature_card_title) { margin-bottom: 6px; font-size: 2rem; line-height: 1.35; } /* 2026.07.06 edit 이소라 */
.purpose_feature_cards :deep(.feature_card_desc) { color: #161616; font-weight: 700; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
@media screen and (min-width: 769px) {
}
@media screen and (max-width: 1200px) {
    .cp_manager_banner {padding-left: 60px; padding-right: 60px; background-position: -90px 0;}
}
@media screen and (max-width: 1024px) {
    :deep(.ethics_target_list.num_info_list) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px 20px; }
    .cp_manager_banner figcaption {max-width: 300px;}
}
@media screen and (max-width: 768px) {
    .cont_inner {padding-top:80px;}

    :deep(.feature_cards_grid.feature_card_swiper) { width: calc(100% + 40px); padding: 0 20px; margin: 0 -20px; }
    .purpose_feature_cards :deep(.feature_card_item) { padding:32px 20px; min-height: 171px !important; }
    :deep(.purpose_feature_cards.feature_card_swiper .swiper-slide) { width: 80vw; box-sizing: border-box; }
    :deep(.purpose_feature_cards .feature_card_item){min-height: 171px;}
    :deep(.feature_card_desc) {color:#161616;font-size: 1.6rem;line-height: 1.5;}
    .purpose_feature_cards :deep(.feature_card_desc) {font-size: 1.8rem;letter-spacing: 0%;}
    /* :deep(.feature_cards_grid.feature_card_list) { grid-template-columns: none; grid-auto-columns: 300px; grid-auto-flow: column; gap: 12px; white-space: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; } */
    :deep(.feature_cards_grid.ft_gd_cards.feature_card_list) { grid-template-columns: none; }
    .ft_acc_wrap :deep(dt > a.acc_tit_btn) { min-height: 64px; padding: 0 10px; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
    .ft_acc_wrap :deep(dt > a.acc_tit_btn .acc_tit_txt) { font-size: 1.6rem; line-height: 1.24; letter-spacing: 0 }
    .ethics_target_list :deep(.num_info_icon) { width: 60px; height: 60px; }
    .ethics_target_list :deep(.num_info_title) { margin-bottom: 6px; }
    .ethics_target_list :deep(.num_info_num) { font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
    .ethics_target_list :deep(.num_info_title > strong) { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
    .ethics_target_list :deep(.num_info_body > p) { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .report_form_wrap .apply_form .form_field > :deep(.input_wrap), .report_form_wrap .apply_form .form_field_phone label.select, .report_form_wrap .apply_form .form_field_phone > :deep(.input_wrap), .report_form_wrap .apply_form .form_field_email > :deep(.input_wrap:nth-child(1)), .report_form_wrap .apply_form .form_field_email > :deep(.input_wrap:nth-child(3)), .report_form_wrap .apply_form .form_field_email label.select { width: 100%; max-width: 100%; }
    .report_form_wrap .apply_form .form_field_content > textarea { width: 100%; }
    .report_form_wrap .apply_form .form_row_content .form_label { padding-top: 0; }
    :deep(.ethics_target_list.num_info_list) { grid-template-columns: 1fr; }
    :deep(.feature_cards_grid.ft_gd_cards.feature_card_list .feature_card_item) { min-height:233px; }
    .ft_gd_cards :deep(.feature_card_action) { margin-top: 32px; }
    .ft_gd_cards :deep(.feature_card_action > button) { width:100%; }
    :deep(.law_feature_cards .feature_card_item){min-height:151px !important;}
}
.sec_history { position: relative; }
.history_list { padding-left:48px;position:relative;}
.history_item { display: flex; gap: 32px; position: relative; }
.history_item::before { content: ""; width: 8px; height: 8px; background-color: #107af2; border: 8px solid #cfe4fc; border-radius: 50%; position: absolute; top: 11px; left: -48px; z-index: 5; }
.history_item:not(:last-child)::after { content: ""; width: 1px;height:100%; background-color: #107af2; position: absolute; top: 12px; bottom: 0; left: -36px; }
.history_period { width: 300px; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; flex-shrink: 0; display: block; }
.history_summary { font-size: 1.6rem;line-height: 1.5; letter-spacing: -0.01em; }
.history_detail_list { display: grid; grid-template-columns: 103px minmax(0, 1fr); row-gap: 0; column-gap: 20px; align-items: start; }
.history_detail_list > dt { padding:14px 0; color:#90909A; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; grid-column: 1; }
.history_detail_list > dd { padding:14px 0; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; word-break: keep-all; grid-column: 2; }
.history_detail_list > dd + dt { margin-top: 32px; }
.history_detail_list > dd + dt + dd { margin-top: 32px; }
/* 정도경영 > 지침 */
.gray_box { padding: 60px; background-color: #f8f8f8; border-radius: 20px; }
.gray_box p { margin-top:40px; }
.gray_box > .button_area { width: 100%; display: flex; justify-content: center; }
.sec_ethics_cards .card_list { display: grid; width: 100%; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 80px 40px; align-items: stretch; }
.sec_ethics_cards .card_list > li { min-width: 0; min-height: 0; display: flex; flex-direction: column; }
.sec_ethics_cards .card_list > li > * { flex: 1; min-height: 0; }
.sec_ethics_cards .card_list :deep(.card_thumb) { aspect-ratio: 690 / 360; border-radius: 12px; background-size: cover; background-blend-mode: multiply; }
.sec_ethics_cards .card_list :deep(.card_item .card_body) { padding-top: 32px; }
.sec_ethics_cards .card_list :deep(.card_desc) { margin-top: 8px; }
.card_list :deep(.card_tit) { font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.card_list :deep(.card_desc) { margin-top:12px; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
.practice_title { margin-top:80px;font-weight: 700;font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em; }
.practice_desc { margin-top: 16px; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
.base_item { padding: 40px 0; border-bottom: 1px solid #E5E5E9; }
.base_item > em { color: #107af2; font-size: 2rem; font-style: normal; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: block; }
.base_item > strong { margin-top:4px; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: block; }
.base_item p { margin-top:16px; color: #67676F; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
.base_item > .button_area { margin-top:24px; display: flex; justify-content: center; gap:10px; justify-content: flex-start; }
.base_list.type02 { padding: 64px; background-color: #f8f8f8; border-radius: 20px; }
.base_list.type02 .base_item:first-child { padding-top: 0; }
.base_list.type02 .base_item:last-child { padding-bottom: 0; border-bottom: 0; }
.panel_third_depth .base_list .base_item:first-child { border-top: 1px solid #E5E5E9; }
.signature_box { margin-top: 40px; padding: 40px 64px; border: 1px solid #E5E5E9; border-radius: 12px; display: flex; align-items: flex-end; justify-content: space-between; }
.signature_box > div { flex:1; }
.signature_box p { font-weight: 700;font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em; }
.signature_box dl { margin-top: 40px; }
.signature_box dl > dt { color:#67676F;font-size: 1.8rem;line-height: 1.4; }
.signature_box dl > dd { color:#67676F;font-size: 1.8rem;line-height: 1.4; }
.signature_box dl > dd { margin-top: 4px; }
.signature_box span { color:#C4C4D0; font-size: 1.8rem; font-weight: 700; line-height: 1.5; }
/* 정도경영 > 제도 — type_03 (Figma TAB_3, node 470:17025) */
.wrap_tabs_type03 { width: 100%; }
.wrap_tabs_type03 .tab_wrap{margin:0;}
.wrap_tabs_type03 :deep(.tab_wrap ul.type_03) { width: 100%; gap: 0; }
.wrap_tabs_type03 :deep(.tab_wrap ul.type_03 li) { flex: 1; min-width: 0; }
.wrap_tabs_type03 :deep(.tab_wrap ul.type_03 li .item) { width: 100%; height: 60px; padding: 0 16px; color: #90909a; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; text-align: center; background-color: #ffffff; border: 1px solid #c4c4d0; border-radius: 0; display: flex; align-items: center; justify-content: center; }
.wrap_tabs_type03 :deep(.tab_wrap ul.type_03 li + li .item) { margin-left: -1px; }
.wrap_tabs_type03 :deep(.tab_wrap ul.type_03 li.current .item) { color: #ffffff; background-color: #107af2; border-color: #107af2; position: relative; z-index: 1; }
/* 정도경영 > 제도 > 제보 이용 안내 */
.base_item .gray_box { margin-top:20px; padding:56px 64px; }
.base_item .gray_box .process_flow { display: flex; gap: 20px; align-items: center; }
.base_item .gray_box .process_flow p { margin:0;padding:20px;color:#107AF2; font-weight: 700;font-size: 1.6rem;line-height: 1.24;text-align: center; border-radius: 99px; background-color:#E7F2FE; flex:0 1 300px; }
.panel_third_depth .reward_criteria { width: 100%; margin-top: 16px; }
.reward_criteria .common_table_scroll{margin-top:20px;}
.base_item .gray_box.type02 { padding:40px 64px; border-radius: 0; }
.base_item .gray_box.type02 strong { color: #67676F; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
.panel_third_depth .table_wrap { margin-top: 24px; }
.panel_third_depth .common_table_scroll { width: 100%; padding: 0 20px; min-width: 0; overflow-x: visible; }
.panel_third_depth .common_table_scroll + .common_table_scroll { margin-top: 24px; }
.panel_third_depth .common_table { width: 100%; min-width: 0; border-collapse: collapse; position: relative; }
.panel_third_depth .common_table:before { content: ''; width: 100%; height: 1px; background-color: #161616; position: absolute; top: 0; left: 0; z-index: 1; display: block; }
.panel_third_depth .common_table th, .panel_third_depth .common_table td { border-bottom: 1px solid #e5e5e9; text-align: left; }
.panel_third_depth .common_table td p { color:#161616; }
.panel_third_depth .common_table th { padding:19px 24px; background-color: #f8f8f8; font-size: 1.8rem; font-weight: 700; line-height: 1.5; }
.panel_third_depth .common_table th + th { border-left: 1px solid #e5e5e9; }
.panel_third_depth .common_table thead tr:not(:first-child) th:first-child { border-left: 1px solid #e5e5e9; }
.panel_third_depth .common_table td { padding:12px 24px; }
.panel_third_depth .common_table td p { margin: 0; }
.panel_third_depth .common_table td p + p { margin-top: 12px; }
.panel_third_depth .common_table.type_01 td { text-align: left; }
.panel_third_depth .common_table.type_02 td { text-align: left; }
.panel_third_depth .common_table_sub { margin: 0 0 12px; color: #4095F5; font-size: 1.6rem; font-weight: 700; line-height: 1.24; }
.panel_third_depth .reward_report_btn { width: 100%; margin-top: 40px; display: flex; justify-content: center; }
.ft_sec_list .common_table_scroll { padding: 0; }
.ft_sec_list .common_table_scroll.common_table_scroll_type_02 { overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; }
.ft_sec_list .common_table thead th { text-align: center; }
.ft_sec_list :deep(.m_txt) { display: none; }
.ft_sec_list .common_table th { padding: 19px 10px !important; font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
.ft_sec_list .common_table td { padding: 12px 24px; }
.ft_sec_list .common_table td:not(:last-child) { border-right: 1px solid #e5e5e9; }
.ft_sec_list .common_table.type_01 { table-layout: auto; min-width: 0; width: 100%; }
.ft_sec_list .common_table.type_01 colgroup col:first-child { width: 250px; min-width: 250px; max-width: 250px; }
.ft_sec_list .common_table.type_01 colgroup col:not(:first-child) { width: auto; min-width: 0; }
.ft_sec_list .common_table.type_01 colgroup col, .ft_sec_list .common_table.type_02 colgroup col { min-width: 0; }
.ft_sec_list .common_table.type_02 colgroup col:nth-child(1) { width: 250px; }
.ft_sec_list .common_table.type_02 colgroup col:nth-child(2), .ft_sec_list .common_table.type_02 colgroup col:nth-child(3) { width: 290px; }
.ft_sec_list .common_table.type_02 colgroup col:nth-child(n+4):nth-child(-n+8) { width: 100px; }
.ft_sec_list .common_table.type_01 th, .ft_sec_list .common_table.type_02 th { overflow-wrap: break-word; word-break: keep-all; }
.ft_sec_list .common_table.type_02 tbody tr td:nth-last-child(-n+5) { text-align: center; }
.ft_sec_list .common_table td p.txt_warn { padding-left: 12px; }
.ft_sec_list .common_table td p.dot_txt { padding-left: 12px; position: relative; }
.ft_sec_list .common_table td p.dot_txt::before { width: 4px; height: 4px; margin: 0 8px 0 0; background-color: #161616; border-radius: 50%; display: inline-block; vertical-align: 0.45em; position: absolute; top: 10px; left: 0; content: ""; }
.ft_sec_list .common_table td p.warn_txt { margin: 6px 0 0; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.ft_sec_list .common_table .common_num_list { margin: 0; padding: 0; list-style: none; counter-reset: common-cell-num; }
.ft_sec_list .common_table .common_num_list > li { margin: 0; padding-left: 32px; position: relative; counter-increment: common-cell-num; }
.ft_sec_list .common_table .common_num_list > li + li { margin-top: 8px; }
.ft_sec_list .common_table .common_num_list > li::before { content: counter(common-cell-num); width: 20px; height: 20px; font-size: 12px; line-height: 1.2; border: 1px solid #161616; border-radius: 50%; text-align: center; display: inline-flex; align-items: center; justify-content: center; position: absolute; top: 2px; left: 0; box-sizing: border-box; }
.tbl_dual_mo { display: none; }
.ft_sec_list .common_table.tbl_dual_grid { width: 100%; min-width: 0; table-layout: auto; }
.ft_sec_list .common_table.tbl_dual_grid colgroup col:nth-child(1) { width: 250px; min-width: 0; max-width: 250px; }
.ft_sec_list .common_table.tbl_dual_grid colgroup col:nth-child(2), .ft_sec_list .common_table.tbl_dual_grid colgroup col:nth-child(4) { width: 390px; min-width: 0; }
.ft_sec_list .common_table.tbl_dual_grid colgroup col:nth-child(3), .ft_sec_list .common_table.tbl_dual_grid colgroup col:nth-child(5) { width: 150px; min-width: 0; }
.ft_sec_list .common_table.tbl_dual_grid thead th:nth-child(2), .ft_sec_list .common_table.tbl_dual_grid thead th:nth-child(4) { border-right: 0; }
.ft_sec_list .common_table.tbl_dual_grid thead th:nth-child(3), .ft_sec_list .common_table.tbl_dual_grid thead th:nth-child(5) { border-left: 0; }
.ft_sec_list .common_table.tbl_dual_grid tbody tr:first-child td:nth-child(2), .ft_sec_list .common_table.tbl_dual_grid tbody tr:first-child td:nth-child(4), .ft_sec_list .common_table.tbl_dual_grid tbody tr:not(:first-child) td:nth-child(1), .ft_sec_list .common_table.tbl_dual_grid tbody tr:not(:first-child) td:nth-child(3) { border-right: 0; }
.ft_sec_list .common_table.tbl_dual_grid tbody tr:first-child td:nth-child(3), .ft_sec_list .common_table.tbl_dual_grid tbody tr:first-child td:nth-child(5), .ft_sec_list .common_table.tbl_dual_grid tbody tr:not(:first-child) td:nth-child(2), .ft_sec_list .common_table.tbl_dual_grid tbody tr:not(:first-child) td:nth-child(4) { text-align: center; }
/* 정도경영 > 제보 (Figma 474:29330) */
.report_intro_desc { margin-bottom: 80px; font-size: 2.4rem; line-height: 1.5; letter-spacing: -0.01em; text-align: center; }
.report_channel_list { width: 100%; border-top: 1px solid #e5e5e9; }
.report_channel_item { border-bottom: 1px solid #e5e5e9; }
.report_channel_card { width: 100%; padding: 40px 0; display: flex; gap: 40px; }
.report_channel_thumb { width: 340px; min-width: 340px; height: 230px; background-color: #f8f8f8; border-radius: 12px; display: block; background-repeat: no-repeat; background-position: center; background-size: cover; }
.report_channel_thumb.thumb_voice { background-image: url(@/assets/images/dummy/gsrsu040101_07.png); }
.report_channel_thumb.thumb_ethics { background-image: url(@/assets/images/dummy/gsrsu040101_08.png); }
.report_channel_thumb.thumb_redwhistle { background-image: url(@/assets/images/dummy/gsrsu040101_09.png); }
.report_channel_body { width: calc(100% - 380px); }
.report_channel_body h3 { font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.report_channel_body > p { margin-top: 16px; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
.report_channel_body .button_area { margin-top: 24px; }
.list_cuation { margin-top: 16px; }
.list_cuation li + li { margin-top: 8px; }
.list_cuation :deep(span) { text-decoration: underline; }
.signature_box.type02 { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.signature_box.type02 strong { font-weight: 700; font-size: 2.8rem; line-height: 1.35; letter-spacing: -0.01em; display: block; }
.signature_box.type02 .button_area { margin-top: 0; display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
.panel_inner header.sub_header p:only-child { margin-top: 0; }
@media screen and (max-width: 768px) {
    :deep(.p_br) { display: none; }
    .panel { padding-top:60px; }
    .panel_third_depth { padding-top: 32px; }
    .title_wrap { display: none; }
    .page_title { font-size: 4rem; }
    .visual_sub { font-size: 2rem; }
    .tab_header { margin-bottom:60px; padding: 0;  }
    .tab_header > h2 { font-size: 1.8rem; line-height: 1.4; }
    .tab_header > p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .sub_header { margin-bottom:16px; }
    .sub_header h3 { font-size: 2.4rem; text-align: left; }
    .sub_header p { margin-top: 12px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    section + section { padding-top:80px; }
    .gray_box { padding: 40px; }
    .gray_box p { margin-top: 32px; }
    .button_area [class*="btn_"] { width:auto; flex:1 1 auto; }
    .history_list { padding-left: 20px; }
    .history_item { gap: 8px; flex-direction: column; }
    .history_item::before { width: 8px; height: 8px; border-width: 4px; top: 8px; left: -20px; }
    .history_item:not(:last-child)::after { top: 16px; left: -12px; }
    .history_item:last-child .history_body { padding-bottom: 0; }
    .history_period { width: 100%; font-size: 2rem; line-height: 1.35; }
    .history_summary { font-size: 1.4rem; line-height: 1.4; }
    .history_detail_list { display: grid; grid-template-columns: minmax(0, 1fr); row-gap: 6px; column-gap: 0; }
    .history_detail_list > dt { padding: 6px 0; font-size: 1.6rem; line-height: 1.4; grid-column: 1; }
    .history_detail_list > dd { padding: 0; font-size: 1.4rem; line-height: 1.4; grid-column: 1; }
    .history_detail_list > dd + dt { margin-top: 12px; }
    .history_detail_list > dd + dt + dd { margin-top: 0; }
    .sec_ethics_cards .card_list { grid-template-columns: minmax(0, 1fr); gap: 40px; }
    .sec_ethics_cards .card_list :deep(.card_thumb) { aspect-ratio: 335 / 190; }
    .sec_ethics_cards .card_list :deep(.card_item .card_body) { padding-top: 20px; display: block; }
    .sec_ethics_cards .card_list :deep(.card_desc) { margin-top: 16px; }
    .card_list :deep(.card_tit) { font-size: 1.8rem; line-height: 1.5;letter-spacing: 0; }
    .card_list :deep(.card_desc) { font-size: 1.6rem;line-height: 1.5; letter-spacing: -0.01em; }
    .practice_title { margin-top:0; font-size: 2rem; line-height: 1.35; }
    .practice_desc { margin-top: 12px; font-size: 1.6rem; }
    .base_item { padding: 16px 0; }
    .base_item > em { font-size: 1.6rem; line-height: 1.24;letter-spacing: 0; }
    .base_item > strong { font-size: 1.6rem; line-height: 1.24;letter-spacing: 0; }
    .base_item p { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .base_item .gray_box.type02 {padding: 20px;}
    .base_list.type02 { padding: 32px; border-radius: 12px; }
    .signature_box { margin-top: 24px; padding: 24px 20px; border-radius: 12px; display: flex; flex-direction: column; align-items: flex-start; gap: 16px; }
    .signature_box p { font-size: 1.6rem; line-height: 1.5; }
    .signature_box.type02 { justify-content: flex-start;align-items: flex-start; }
    .signature_box.type02 strong { font-size: 2rem; }
    .base_item .button_area, .signature_box.type02 .button_area { width: 100%; display: flex; flex-direction: column; gap: 8px; }
    .base_item .button_area :deep([class*="btn_"]), .signature_box.type02 .button_area :deep([class*="btn_"]) { width: 100%; }
    .signature_box dl { width: 100%; margin-top: 20px; }
    .signature_box dl > dt { font-size: 1.4rem; line-height: 1.5; }
    .signature_box dl > dd { font-size: 1.4rem; line-height: 1.5; }
    .signature_box dl > dd { margin-top: 2px; }
    .signature_box span { width: 100%; font-size: 1.4rem; line-height: 1.4; text-align: right; }
    .wrap_tabs_type03 :deep(.tab_wrap ul.type_03 li) { flex: 1; }
    .wrap_tabs_type03 :deep(.tab_wrap ul.type_03 li .item) { width: auto; height: 48px; padding: 12px 0; font-size: 1.4rem; line-height: 1.43; }
    .base_item .gray_box { padding: 40px 24px; }
    .base_item .gray_box .process_flow { flex-direction: column; gap: 12px; }
    .base_item .gray_box .process_flow p { flex: 1 1 auto; width: 100%; max-width: none; }
    .cp_appoint_board .process_flow { flex-direction: column; }
    .cp_manager_banner { display: block; padding: 0; background:#F2F2F4; border-radius: 12px; overflow: hidden; }
    .cp_manager_banner:before { content:''; display:block; width:100%; height:338px; background: url(@/assets/images/dummy/gsrsu040101_10.png) no-repeat 0 0 / cover; }
    .cp_manager_banner > figcaption { width: 100%; max-width: none; min-width: 0; padding: 32px; }
    .cp_manager_banner > figcaption > strong { font-size: 2.4rem; }
    .cp_manager_banner > figcaption > p { font-size: 1.6rem; }
    .cp_manager_banner > figcaption > p + p { margin-top: 12px; font-size: 1.6rem; }
    .cp_manager_banner + p { margin-top:40px;font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em; }
    .reward_criteria .common_table_scroll{margin-top:6px;}
    .panel_third_depth .common_table th, .panel_third_depth .common_table td { padding: 16px 12px; }
    .panel_third_depth .common_table th { font-size: 1.6rem; }
    .panel_third_depth .common_table td p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .panel_third_depth .common_table_sub { font-size: 1.4rem; }
    .panel_third_depth .reward_report_btn { margin-top: 32px; }
    .base_list .gray_box { padding: 24px 20px; }
    .base_list .gray_box > strong { font-size: 1.8rem; }
    .base_list .gray_box > p { margin-top: 12px; font-size: 1.4rem; }
    .report_intro_desc { margin-top: -44px; margin-bottom: 40px; font-size: 1.6rem; text-align: left; }
    .report_channel_card { padding: 24px 0; flex-direction: column; gap: 20px; }
    .report_channel_thumb { width: 100%; min-width: 0; height:auto; min-height: 174px; aspect-ratio: 335 / 174; }
    .report_channel_body { width: 100%; }
    .report_channel_body h3 { font-size: 2rem; }
    .report_channel_body > p { margin-top: 12px; font-size: 1.6rem; }
    .report_channel_body .button_area { margin-top: 16px; }
    .ft_sec_list .common_table td { padding: 12px 10px; }
    .ft_sec_list .common_table td p.warn_txt { padding-left: 12px; }
    .ft_sec_list .common_table.type_01 colgroup col:first-child { width: 100px; min-width: 100px; max-width: 100px; }
    .ft_sec_list .common_table.type_01 colgroup col:not(:first-child) { width: auto; min-width: 0; }
    .ft_sec_list .tbl_dual_pc { display: none !important; }
    .ft_sec_list .tbl_dual_mo { display: table; width: 100%; min-width: 0; table-layout: auto; }
    .ft_sec_list .tbl_dual_mo.type_01 colgroup col:nth-child(1) { width: 50px !important; min-width: 50px !important; max-width: 50px !important; }
    .ft_sec_list .tbl_dual_mo.type_01 colgroup col:nth-child(2) { width: 165px !important; min-width: 0; }
    .ft_sec_list .tbl_dual_mo.type_01 colgroup col:nth-child(3) { width: 80px !important; min-width: 80px !important; max-width: 80px !important; }
    .ft_sec_list .tbl_dual_mo td .mo_cell_lead { margin: 0; line-height: 1.15; text-align: center; letter-spacing: 0; }
    .list_cuation { margin-top: 8px; }
    .panel_third_depth .table_wrap { margin-top: 16px; }
    .ft_acc_wrap :deep(.acc_panel_inner) { padding: 16px 20px 24px; }
    .ft_acc_wrap :deep(dd+ dt) { border-top: 0; }
    .ft_sec_list > li > article { gap: 16px; }
    .ft_sec_list > li > article > h4 { font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
    .ft_sec_list .common_table .common_num_list > li { padding-left: 26px; }
    .panel_third_depth .common_table td p + p { margin-top: 6px; }
    .ft_sec_list .common_table td p.dot_txt { margin: 0; position: relative; padding-left: 8px; }
    .ft_sec_list .common_table td p.dot_txt::before { width: 2px; height: 2px; margin: 0 6px 0 0; background-color: #161616; display: inline-block; vertical-align: 0.45em; position: absolute; top: 10px; left: 0; content: ""; }
    .ft_sec_list .common_table.type_02 { table-layout: fixed; min-width: 695px; width: max-content; }
    .ft_sec_list .common_table.type_02 colgroup col:nth-child(1) { width: 50px; min-width: 50px; max-width: 50px; }
    .ft_sec_list .common_table.type_02 colgroup col:nth-child(2) { width: 90px; min-width: 90px; max-width: 90px; }
    .ft_sec_list .common_table.type_02 colgroup col:nth-child(3) { width: 155px; min-width: 155px; max-width: 155px; }
    .ft_sec_list .common_table.type_02 colgroup col:nth-child(n+4):nth-child(-n+8) { width: 80px; min-width: 80px; max-width: 80px; }
    .ft_sec_list .common_table td.txt_verticle { vertical-align: middle; text-align: center; }
    .ft_sec_list .common_table td.txt_verticle > p { text-align: center; display: inline-block; writing-mode: vertical-rl; text-orientation: upright; }
    .ft_sec_list :deep(.p_txt) { display: none !important; }
    .ft_sec_list :deep(.m_txt) { display: inline; }
}

</style>


