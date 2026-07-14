<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
        </div>

        <section class="section-partnership">
            <div class="cont_inner">
                <Tabs 
                    v-model="MainTabIdx" 
                    :tab-items="t.MainTabs" 
                    tab-class="type_01" 
                    :tab-slide="true"
                    @change="onMainTabChange"
                />
                <div class="tab_content_wrap mt100" v-if="MainTabIdx === 0">
                    <div class="partnership_intro mb100">
                        <h3 class="section-sub-title mb16">{{ t.IntroTitle }}</h3>
                        <p class="intro_desc">{{ t.IntroDesc }}</p>
                    </div>

                    <div class="guide_step_area mb100">
                        <h4 class="guide_title mb40">{{ t.GuideTitle }}</h4>
                        <ul class="step_list">
                            <li v-for="(step, idx) in t.StepList" :key="'step-' + idx">
                                <div class="step_info">
                                    <span class="step_label">{{ t.StepPrefix }} {{ idx + 1 }}</span>
                                    <strong class="step_text">{{ step.title }}</strong>
                                    <p class="step_desc mo" v-html="step.desc"></p>
                                </div>
                            </li>
                        </ul>
                    </div>


                    <div class="sub_tab_wrap ac mb40">
                        <Tabs 
                            v-model="SubTabIdx" 
                            :tab-items="t.SubTabs" 
                            tab-class="type_02" 
                            :tab-slide="true"
                            @change="onSubTabChange" 
                            v-if="MainTabIdx === 0"
                        />
                    </div>

                    <!-- gsrse01 공지사항 -->
                    <section class="notice_list_area" v-if="SubTabIdx === 0">
                        <h4 class="guide_title mb40">{{ t.SubTabs[0].item }}</h4>
                        <div class="policy_wrap">
                            <table class="base_table">
                                <tbody>
                                    <tr v-for="(item, idx) in t.NoticeList" :key="'notice-'+idx">
                                        <td class="ac color_gray">{{ item.id }}</td>
                                        <td class="al title_cell">
                                            <!-- 26.05.19 Edit 이종환 : 공지사항 상세 팝업 -->
                                            <a href="javascript:void(0);" @click="openModal" data-popid="modal01" data-type="lg" data-cont="board_detail" class="link_title">{{ item.title }}</a>
                                            <!-- //26.05.19 Edit 이종환 : 공지사항 상세 팝업 -->
                                        </td>
                                        <td class="ac color_gray date_cell">{{ item.date }}</td>
                                        <td class="ac color_gray view_cell">{{ t.ViewCountText }} {{ item.views }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="pagination_area mt64">
                            <Pagination v-model="currentPage" :total-pages="5" @change="onPageChange" />
                        </div>
                        <div class="bottom_link_btns">
                            <a 
                                v-for="(link, idx) in t.SystemLinks" 
                                :key="'link-' + idx"
                                :href="link.url" 
                                target="_blank" 
                                class="btn_system_link"
                            >
                                {{ link.title }}
                            </a>
                        </div>
                    </section>

                    <!-- gsrse02 -->    
                    <section class="gsrse02 mb100" v-if="SubTabIdx === 1">
                        <article class="guide_view mb100">
                            <div class="guide_header">
                                <h4 class="text-wrapper mb12">{{ t.ProcessTitle }}</h4>
                                <ul class="div_desc" v-html="t.ProcessDesc"></ul>
                            </div>
                            <picture class="img_box">
                                <source media="(max-width: 768px)" srcset="@/assets/images/dummy/gsrse01_01_mo.png" style="max-width:336px" />
                                <img class="full_img" src="@/assets/images/dummy/gsrse01_01.png" :alt="t.ProcessTitle">
                            </picture>
                        </article>

                        <article class="guide_view mb100">
                            <div class="guide_header">
                                <h4 class="text-wrapper mb12">{{ t.ContractSiteTitle }}</h4>
                                <ul class="bullet_01">
                                    <li v-for="(desc, dIdx) in t.ContractSiteDesc" :key="'site-desc-'+dIdx">{{ desc }}</li>
                                </ul>
                            </div>

                            <div class="auth_table_area pc">
                                <h5 class="text-wrapper-2 mb24">{{ t.AuthTableTitle }}</h5>
                                <div class="policy_wrap">
                                    <table class="base_table">
                                        <thead>
                                            <tr>
                                                <th scope="col" v-for="h in t.AuthTableHeader" :key="h">{{ h }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(row, rIdx) in t.AuthAgencies" :key="'auth-'+rIdx">
                                                <td>{{ row.name1 }}</td>
                                                <td class="ac"><a :href="row.url1" target="_blank" class="link_url">{{ row.url1 }}</a></td>
                                                <td class="ac">{{ row.name2 }}</td>
                                                <td class="ac"><a :href="row.url2" target="_blank" class="link_url">{{ row.url2 }}</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="auth_table_area mo">
                                <h5 class="text-wrapper-2 mb24">{{ t.AuthTableTitle }}</h5>
                                <div class="auth_header">
                                    <span>{{t.AuthTableHeader_mo[0]}}</span>
                                    <span>{{t.AuthTableHeader_mo[1]}}</span>
                                </div>
                                <div class="auth_card_list">
                                    <div class="auth_card_item" v-for="(row, rIdx) in t.AuthAgencies_mo" :key="'auth-mo-' + rIdx">
                                        <div class="auth_row">
                                            <span class="agency_name">{{ row.name1 }}</span>
                                            <a :href="row.url1" target="_blank" class="btn_go_link">{{ t.BtnGoDetail }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>

                        <article class="guide_view mb100">
                            <h4 class="guide_header">{{ t.RelatedSitesTitle }}</h4>
                            <div class="card_grid">
                                <div class="info_card" v-for="(card, cIdx) in t.RelatedSites" :key="'site-'+cIdx">
                                    <div class="card_head mb16">
                                        <span class="card_num">{{ card.num }}</span>
                                        <strong class="card_name">{{ card.name }}</strong>
                                    </div>
                                    <p class="card_desc">{{ card.desc }}</p>
                                </div>
                            </div>
                        </article>

                        <article class="help_desk_area">
                            <div class="guide_header">
                                <h4 class="text-wrapper mb12">{{ t.HelpDeskTitle }}</h4>
                                <p class="div_desc">{{ t.HelpDeskDesc }}</p>
                            </div>
                            <ul>
                                <li v-for="(help, hIdx) in t.HelpDeskItems" :key="'help-'+hIdx">
                                    <div class="info">
                                        <span class="brand">{{ help.brand }}</span>
                                        <strong class="tel">{{ help.tel }}</strong>
                                        <p class="note">※ {{ help.note }}</p>
                                        <a :href="help.link" class="btn_big border btn_icon_arrow after mt20" target="_blank">
                                            {{ t.BtnGoDetail }}
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </article>
                    </section>

                    <!-- gsrse03 -->  
                    <section class="gsrse03 mb100" v-if="SubTabIdx === 2">
                        <div class="faq_frame">
                            <h4 class="text-wrapper mb40">{{ t.SubTabs[2].item }}</h4>
                            
                            <div class="faq_view">
                                <Accordion :multiple="false" class="accordion_wrap">
                                    <AccordionItem 
                                        v-for="(faq, fIdx) in t.FaqList" 
                                        :key="'faq-' + fIdx"
                                        :item-key="String(fIdx)"
                                    >
                                        <template #title>
                                            <div class="q_box">
                                                {{ faq.question }}
                                            </div>
                                        </template>

                                        <div class="a_box" v-html="faq.answer"></div>
                                    </AccordionItem>
                                </Accordion>

                                <div class="pagination_area mt64">
                                    <Pagination v-model="currentPage" :total-pages="5" @change="onPageChange" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- gsrse04 -->
                    <section class="gsrse04 mb100" v-if="SubTabIdx === 3">
                        <article class="guide_view">
                            <div class="guide_header">
                                <h4 class="text-wrapper mb12">{{ t.counselTitle }}</h4> 
                            </div>
                        </article>
                        <section class="listening_form_area">
                            <div class="consent_container">
                                <article v-for="(consent, cIdx) in t.listening.Consents" :key="'consent-'+cIdx" class="consent_box">
                                    <strong class="consent_tit">{{ consent.title }}</strong>
                                    <ul class="consent_list">
                                        <li v-for="(list, lIdx) in consent.items" :key="'list-'+lIdx">{{ list }}</li>
                                    </ul>
                                    <div class="consent_agree">
                                        <p class="guide_text" v-html="consent.guide"></p>
                                        <Inputs type="checkbox" :text="t.listening.agreeText" v-model="formData.agreements[cIdx]" />
                                    </div>
                                </article>
                            </div>
                        </section>


                        <div class="form_container">
                            <article class="listening_form_wrap">
                                <div class="form_section form_section_customer">
                                    <div class="form_header">
                                        <h5 class="form_title">{{ t.listening.InputWrapcont.part1.title }}</h5>
                                        <span class="required_guide">{{ t.listening.InputWrapcont.part1.requiredText }}</span>
                                    </div>
                                    <div class="form_body">
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part1.nameLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item name" >
                                                <Inputs type="text" v-model="formData.name" />
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part1.emailLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_group email">
                                                <div class="group_wrap">
                                                    <div class="input_flex_item"><Inputs type="text" v-model="formData.emailId" /></div>
                                                    <span class="unit">@</span>
                                                    <div class="input_flex_item"><Inputs type="text" v-model="formData.emailDomain" /></div>
                                                </div>
                                                <SelectBox :options="t.listening.InputWrapcont.part1.emailOptions" v-model="formData.emailSelect" :initMsg="t.listening.InputWrapcont.part1.emailInitMsg" />
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part1.telLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_group phone">
                                                <SelectBox :options="t.listening.InputWrapcont.part1.telOptions" v-model="formData.tel1" />
                                                <span class="unit">-</span>
                                                <div class="input_flex_item"><Inputs type="text" v-model="formData.tel2" /></div>
                                                <span class="unit">-</span>
                                                <div class="input_flex_item"><Inputs type="text" v-model="formData.tel3" /></div>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part1.companyname }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_group companyname">
                                                <Inputs type="text" v-model="formData.emailId" />
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part1.department }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_group department">
                                                <p>
                                                    <em>{{ t.listening.InputWrapcont.part1.department_1 }}</em>
                                                    <Inputs type="text" v-model="formData.emailId" />
                                                </p>
                                                <p>
                                                    <em>{{ t.listening.InputWrapcont.part1.rank }}</em>
                                                    <Inputs type="text" v-model="formData.emailId"  />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="form_section form_section_business">
                                    <div class="form_header">
                                        <h5 class="form_title">{{ t.listening.InputWrapcont.part2.title }}</h5>
                                        <span class="required_guide">{{ t.listening.InputWrapcont.part1.requiredText }}</span>
                                    </div>
                                    <div class="form_body">
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.bizNoLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.bizNo" />
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.companyNameLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item company_search full">
                                                <Inputs type="text" v-model="formData.subject"/>
                                                <Buttons btn-class="btn_big gray">{{ t.listening.InputWrapcont.part2.btnSearch }}</Buttons>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item full">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.bizTypeLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.storeName" :is-readonly="true"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.ceoNameLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.subject" :is-readonly="true"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.businessTypeLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.subject" :is-readonly="true"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.businessItemLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.subject" :is-readonly="true"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.brandLabel }}</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.subject"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.addressLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_complex address_field">
                                                <div class="address_top">
                                                    <Inputs type="text" v-model="formData.bizZipCode" />
                                                    <Buttons btn-class="btn_big gray">{{ t.listening.InputWrapcont.part2.btnZipCode }}</Buttons>
                                                </div>
                                                <div class="address_bottom">
                                                    <Inputs type="text" v-model="formData.bizAddress1" />
                                                    <Inputs type="text" v-model="formData.bizAddress2" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.foundedDateLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.subject"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.entranceSectorLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item radio_wrap">
                                                <Inputs v-for="(opt, oIdx) in t.listening.InputWrapcont.part2.entranceOptions" :key="'entrance-'+oIdx" type="radio" :text="opt.text" :name="t.listening.InputWrapcont.part2.entranceRadioName" :value="opt.value" />
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.productCategoryLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.storeName"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.productDetailLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.storeName"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.productNameLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.subject"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.supplyCostLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.storeName"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.salePriceLabel }}</span>
                                                <span class="required_mark">*</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.subject"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.productSpecLabel }}</span>
                                            </div>
                                            <div class="input_item">
                                                <div class="product_spec_wrap">
                                                    <div class="product_spec_row">
                                                        <Inputs type="text" v-model="formData.productSpec1" />
                                                        <span class="unit">{{ t.listening.InputWrapcont.part2.specUnit }}</span>
                                                        <Inputs type="text" v-model="formData.productSpec2" />
                                                        <span class="unit">{{ t.listening.InputWrapcont.part2.specUnit }}</span>
                                                        <Inputs type="text" v-model="formData.productSpec3" />
                                                    </div>
                                                    <div class="product_spec_area">
                                                        <Inputs type="text" v-model="formData.productSpecArea" />
                                                        <p class="guide_msg">{{ t.listening.InputWrapcont.part2.productSpecGuide }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.attachImageLabel }}<span class="label_desc">{{ t.listening.InputWrapcont.part2.attachImageDesc }}</span></span>
                                            </div>
                                            <div class="input_item">
                                                <FileUpload :lang="lang" :multiple="true" accept="*" @update:files="onFiles" />
                                                <p class="guide_msg">{{ t.listening.InputWrapcont.part2.fileNotice }}</p>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.proposalLabel }}<span class="label_desc">{{ t.listening.InputWrapcont.part2.proposalDesc }}</span></span>
                                            </div>
                                            <div class="input_item">
                                                <FileUpload :lang="lang" :multiple="true" accept="*" @update:files="onFiles" />
                                                <p class="guide_msg">{{ t.listening.InputWrapcont.part2.fileNotice }}</p>
                                            </div>
                                        </div>





                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.applyTitleLabel }}</span>
                                            </div>
                                            <div class="input_item full">
                                                <Inputs type="text" v-model="formData.subject"/>
                                            </div>
                                        </div>
                                        <div class="form_row">
                                            <div class="label_item">
                                                <span class="label_text">{{ t.listening.InputWrapcont.part2.applyContentLabel }}</span>
                                            </div>
                                            <div class="input_item full_textarea">
                                                <Textarea v-model="formData.body" :placeholder="t.listening.InputWrapcont.part2.contentPlaceholder" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                            <div class="btn-wrap">
                                <Buttons btn-class="btn_big primary" @click="openModal" data-popid="gsrcu010101" data-type="small" data-cont="gsrcu010101">{{ t.listening.InputWrapcont.part2.btnSubmit }}</Buttons>
                                <Buttons btn-class="btn_big gray" @click="closeModal">{{ t.listening.InputWrapcont.part2.btnCancel }}</Buttons>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </section>


        <!-- 26.05.19 Add 이종환 : 게시물 상세 팝업 -->
        <div id="modal01" class="modal_wrap">
            <div class="modal_container"></div>
        </div>
        <!-- //26.05.19 Add 이종환 : 게시물 상세 팝업 -->

    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Tabs from "@/components/Tabs.vue";
import Pagination from "@/components/Pagination.vue";
import Accordion from "@/components/Accordion.vue";
import AccordionItem from "@/components/AccordionItem.vue";
import Buttons from "@/components/Buttons.vue";
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue"; 
import Textarea from "@/components/Textarea.vue";
import FileUpload from "@/components/FileUpload.vue";


export default {
    name: "gsrst01",
    components: { Tabs, Pagination, Accordion, AccordionItem, Buttons, Inputs, SelectBox, Textarea, FileUpload  },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            MainTabIdx: 0,
            SubTabIdx: 0,
            currentPage: 1,
            formData: {
                agreements: [false],
                name: "", emailId: "", emailDomain: "", emailSelect: "",
                tel1: "010", tel2: "", tel3: "", storeName: "",
                bizNo: "", bizZipCode: "", bizAddress1: "", bizAddress2: "",
                productSpec1: "", productSpec2: "", productSpec3: "", productSpecArea: "",
                subject: "", body: ""
            },
            langData: {
                ko: {
                    StepPrefix: "Step",
                    MainTitle: "입점상담",
                    MainTabs: [{ item: "GS25/GS THE FRESH/지원부문" }, { item: "GS SHOP" }],
                    SubTabs: [{ item: "공지사항" }, { item: "입점 안내" }, { item: "자주하는 질문 FAQ" }, { item: "상담 신청" }],
                    IntroTitle: "입점상담 신청 ",
                    IntroDesc: "GS25/GS THE FRESH/지원부문 입점에 관한 상담을 신청하고 결과를 확인하세요.",
                    GuideTitle: "입점 상담 가이드",
                    StepList: [{ title: "신규업체 등록", desc: "GS THE FRESH 가맹 계약<br/>조건안내 및 절차소개" }, { title: "입점상담 신청", desc: "가맹본부로부터 정보공개서를 제공받아<br/>GS THE FRESH 사업성 검토" }, { title: "담당MD 상담", desc: "지원서 제출은 월~금요일 수시가능<br/>(우편 접수 가능)" }, { title: "입점계약 진행", desc: "지원서를 토대로 면담 진행하여<br/>사업 타당성 검토함" }],
                    NoticeList: [
                        { id: 1, title: "2026년 GS25 입점 상담 안내", date: "2026.02.10", views: "1234" },
                        { id: 2, title: "GS THE FRESH 신규 입점 지역 안내", date: "2026.02.10", views: "1234" }
                    ],
                    // 입점 안내 섹션 데이터 바인딩
                    ProcessTitle: "입점 절차 안내",
                    ProcessDesc: "<li>입점상담부터 계약체결에 이르기까지의 입점절차 안내 입니다.</li><li>GS리테일과 거래를 원하는 모든 파트너사들이 공정한 절차를 통해 입점상담을 진행할 수 있도록 아래 절차대로 입점과정이 진행됩니다.</li>",
                    ContractSiteTitle: "전자계약 사이트 안내",
                    ContractSiteDesc: [
                        "GS리테일은 전자문서 시대에 발 맞추어 거래의 공정성 및 투명성과 신뢰성을 확보코자 온라인 상담에 이어 계약시에도 인감과 동일한 효력이 있는 전자서명을 시행하고 있습니다.",
                        "접속시 업체정보가 등록이 되신 기존 파트너회사는 상담시스템에서 재방문 로그인으로 접속 하시거나 또는 바로 전자계약 메뉴를 선택하시고 접속하여 사용하실 수 있습니다."
                    ],
                    AuthTableTitle: "전자인증 공인기관",
                    AuthTableHeader: ["상호", "사이트명", "상호", "사이트명"],
                    AuthAgencies: [
                        { name1: "한국정보인증", url1: "https://www.signgate.com", name2: "한국전산원", url2: "http://sign.nca.or.kr/" },
                        { name1: "한국증권전산", url1: "http://www.signkorea.com/", name2: "한국전자인증", url2: "http://gca.crosscert.com/" },
                        { name1: "금융결제원", url1: "http://www.yessign.or.kr/", name2: "한국무역정보통신", url2: "http://www.tradesign.net/" }
                    ],
                    AuthTableHeader_mo: ["상호", "사이트"],
                    AuthAgencies_mo: [
                        { name1: "한국정보인증", url1: "https://www.signgate.com", name2: "한국전산원", url2: "http://sign.nca.or.kr/" },
                        { name1: "한국증권전산", url1: "http://www.signkorea.com/", name2: "한국전자인증", url2: "http://gca.crosscert.com/" },
                        { name1: "금융결제원", url1: "http://www.yessign.or.kr/", name2: "한국무역정보통신", url2: "http://www.tradesign.net/" }
                    ],
                    RelatedSitesTitle: "기타 관련 사이트 안내",
                    RelatedSites: [
                        { num: "01", name: "전자인증 공인기관", desc: "GS리테일이 공정하고 투명하며 합리적인 가격으로 상품과 서비스를 구매 및 도입하기 위한 인터넷 구매시스템 사이트 입니다." },
                        { num: "02", name: "eSCM21", desc: "데이콤망을 이용하여 GS리테일과 거래하는 파트너사와의 업무처리(수/발주, 대금결제, 세금계산서, 재고/판매정보등)를 인터넷 사이트를 통해 접속 처리하여 효율적인 업무를 지원하는 사이트 입니다." }
                    ],
                    HelpDeskTitle: "HELP DESK",
                    HelpDeskDesc: "협력사 상담 지원센터 관련하여 궁금하거나 불편한 사항이 있으면 아래 연락처로 연락 주시면 친절하게 안내해 드리겠습니다.",
                    HelpDeskItems: [
                        { brand: "GS25", tel: "1644-5425", note: "GS25 창업상담 문의", link: "/gsrst02010101" },
                        { brand: "GS THE FRESH (GS수퍼마켓)", tel: "1833-9779", note: "GS THE FRESH 가맹상담 문의", link: "/gsrst01010101" }
                    ],
                    BtnGoDetail: "바로가기",
                    FaqList: [
                        { question: "입점 비용은 얼마인가요?", answer: "입점 비용은 브랜드, 면적, 지역에 따라 상이합니다. <br/>상담 신청을 통해 정확한 비용을 안내받으실 수 있습니다." },
                        { question: "기존 매장 리뉴얼도 가능한가요?", answer: "네, 기존 매장 리뉴얼 상담도 가능합니다. 상세 내용은 담당 MD와 상담해 주세요." },
                        { question: "입점 후 운영 지원은 어떻게 받나요?", answer: "정기적인 보수 교육 및 운영 가이드를 제공하며, 담당 SV가 배정되어 지원합니다." },
                        { question: "계약 기간은 어떻게 되나요?", answer: "기본 계약 기간은 브랜드별로 상이하며, 일반적으로 2년 단위로 갱신됩니다." },
                        { question: "입점 상담 취소는 가능한가요?", answer: "신청 완료 후에도 마이페이지 또는 상담 조회 메뉴에서 취소 요청이 가능합니다." }
                    ],
                    counselTitle: "상담 신청",
                    listening: {
                        agreeText: "동의합니다.",
                        Consents: [
                            {
                                title: "개인정보 수집·이용 동의",
                                items: [
                                    "입력하신 정보는 입점 상담을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같으며, 기타 개인정보 취급 사항은 홈페이지 하단의 '개인정보 처리방침'을 참고하시기 바랍니다.",
                                    "수집하는 개인정보 항목: 이름, 휴대폰번호, 생년월일",
                                    "수집 및 목적: 수집한 개인정보를 본인 식별 및 문의사항 확인 및 답변을 위해 활용",
                                    "보유 및 이용기간: 접수 후 1년"
                                ],
                                guide: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우 문의 글 작성이 불가능합니다."
                            }
                        ],
                        InputWrapcont: {
                            part1: {
                                title: "고객정보",
                                requiredText: "* 필수 입력사항",
                                nameLabel: "이름",
                                emailLabel: "이메일",
                                emailInitMsg: "직접입력",
                                emailOptions: [{ value: "naver.com", label: "naver.com" }, { value: "gmail.com", label: "gmail.com" }],
                                telLabel: "휴대폰",
                                telOptions: [
                                    { value: "010", label: "010" },
                                    { value: "011", label: "011" },
                                    { value: "016", label: "016" },
                                    { value: "017", label: "017" },
                                    { value: "018", label: "018" },
                                    { value: "019", label: "019" },
                                ],
                                companyname: "소속회사명",
                                department: "부서명 / 직급",
                                department_1: "부서",
                                rank: "직급",
                            },
                            part2: {
                                title: "사업자정보",
                                bizNoLabel: "사업자등록번호",
                                companyNameLabel: "회사명",
                                btnSearch: "조회/검색",
                                bizTypeLabel: "사업자구분",
                                ceoNameLabel: "대표자 성명",
                                businessTypeLabel: "업태",
                                businessItemLabel: "업종",
                                brandLabel: "대표브랜드",
                                addressLabel: "주소",
                                btnZipCode: "우편번호 찾기",
                                foundedDateLabel: "설립일자",
                                entranceSectorLabel: "입점부문",
                                entranceRadioName: "입점부문",
                                entranceOptions: [
                                    { text: "GS25", value: "GS25" },
                                    { text: "GS THE FRESH", value: "GSTHEFRESH" },
                                ],
                                productCategoryLabel: "신청상품군",
                                productDetailLabel: "신청상세품목",
                                productNameLabel: "상품명",
                                supplyCostLabel: "납품 원가 (원)",
                                salePriceLabel: "판매 희망가 (원)",
                                productSpecLabel: "상품 규격 (단위 생략)",
                                specUnit: "X",
                                productSpecGuide: "가로X세로X높이cm, 무게kg",
                                attachImageLabel: "상품 이미지 첨부",
                                attachImageDesc: " (000 X 000 px)",
                                proposalLabel: "입점 제안서 첨부",
                                proposalDesc: " (최대 00MB)",
                                fileNotice: "* 여러 개의 파일 업로드 시 zip파일로 압축하여 올려주세요 (*용량제한 20MB)",
                                applyTitleLabel: "신청제목",
                                applyContentLabel: "신청내용",
                                contentPlaceholder: "내용을 입력해주세요.",
                                btnSubmit: "상담신청",
                                btnCancel: "다시작성",
                            },
                        },
                    },
                    ViewCountText: "조회",
                    SystemLinks: [
                        { title: "GS리테일 전자계약 시스템", url: "https://partner.gsretail.com:7300/web/main/index.jsp" },
                        { title: "GS리테일 협력업체 포털", url: "https://gs.escm21.net/escm21/home/index.jsp" },
                    ],
                    GsShopUrl: "https://withgs.gsshop.com/sug/suggest"
                },
                en: {
                    MainTitle: "Business Inquiry",
                    MainTabs: [{ item: "GS25/GS THE FRESH/Support Division"/* 260604 번역 */ }, { item: "GS SHOP" }],
                    SubTabs: [{ item: "Notices"/* 260604 번역 */ }, { item: "Partnership Guide"/* 260604 번역 */ }, { item: "Frequently Asked Questions (FAQ)"/* 260604 번역 */ }, { item: "Consultation Application"/* 260604 번역 */ }],
                    IntroTitle: "Apply for Partnership Consultation "/* 260604 번역 */,
                    IntroDesc: "Apply for a consultation on partnership with GS25/GS THE FRESH/Support Division and check the results."/* 260604 번역 */,
                    GuideTitle: "Partnership Consultation Guide"/* 260604 번역 */,
                    StepList: [{ title: "New Company Registration"/* 260604 번역 */, desc: "GS THE FRESH Franchise Contract<br/>Conditions guide and procedure introduction"/* 260604 번역 */ }, { title: "Apply for Partnership Consultation"/* 260604 번역 */, desc: "Receive the information disclosure document from the franchise headquarters<br/>GS THE FRESH Business Feasibility Review"/* 260604 번역 */ }, { title: "Consultation with the Responsible MD"/* 260604 번역 */, desc: "Applications can be submitted any time, Monday through Friday<br/>(Postal submission available)"/* 260604 번역 */ }, { title: "Proceed with Partnership Contract"/* 260604 번역 */, desc: "Conducting an interview based on the application,<br/>Conducted Business Feasibility Review"/* 260604 번역 */ }],
                    NoticeList: [
                        { id: 1, title: "2026 GS25 Store Partnership Consultation Guide"/* 260604 번역 */, date: "2026.02.10", views: "1234" },
                        { id: 2, title: "GS THE FRESH New Store Location Guide"/* 260604 번역 */, date: "2026.02.10", views: "1234" }
                    ],
                    // 입점 안내 섹션 데이터 바인딩
                    ProcessTitle: "Partnership Process Guide"/* 260604 번역 */,
                    ProcessDesc: "<li>This is a guide to the partnership process, from consultation to contract signing.</li><li>For all partner companies wishing to do business with GS Retail to proceed with partnership consultation through a fair process, the partnership process is carried out according to the procedure below.</li>"/* 260604 번역 */,
                    ContractSiteTitle: "Electronic Contract Site Guide"/* 260604 번역 */,
                    ContractSiteDesc: [
                        "In keeping with the era of electronic documents, GS Retail implements electronic signatures—which carry the same legal effect as a seal—not only for online consultations but also at the time of contract signing, in order to ensure fairness, transparency, and reliability in transactions."/* 260604 번역 */,
                        "Existing partner companies whose information is already registered can log in to the consultation system as a returning visitor, or access and use the electronic contract menu directly."/* 260604 번역 */
                    ],
                    AuthTableTitle: "Accredited Electronic Certification Authorities"/* 260604 번역 */,
                    AuthTableHeader: ["Company Name"/* 260604 번역 */, "Site Name"/* 260604 번역 */, "Company Name"/* 260604 번역 */, "Site Name"/* 260604 번역 */],
                    AuthAgencies: [
                        { name1: "Korea Information Certificate Authority"/* 260604 번역 */, url1: "https://www.signgate.com", name2: "National Computerization Agency"/* 260604 번역 */, url2: "http://sign.nca.or.kr/" },
                        { name1: "Korea Securities Computer Corporation"/* 260604 번역 */, url1: "http://www.signkorea.com/", name2: "Korea Electronic Certification Authority"/* 260604 번역 */, url2: "http://gca.crosscert.com/" },
                        { name1: "Korea Financial Telecommunications & Clearings Institute"/* 260604 번역 */, url1: "http://www.yessign.or.kr/", name2: "Korea Trade Network (KTNET)"/* 260604 번역 */, url2: "http://www.tradesign.net/" }
                    ],
                    AuthTableHeader_mo: ["Company Name"/* 260604 번역 */, "Site"/* 260604 번역 */],
                    AuthAgencies_mo: [
                        { name1: "Korea Information Certificate Authority"/* 260604 번역 */, url1: "https://www.signgate.com", name2: "National Computerization Agency"/* 260604 번역 */, url2: "http://sign.nca.or.kr/" },
                        { name1: "Korea Securities Computer Corporation"/* 260604 번역 */, url1: "http://www.signkorea.com/", name2: "Korea Electronic Certification Authority"/* 260604 번역 */, url2: "http://gca.crosscert.com/" },
                        { name1: "Korea Financial Telecommunications & Clearings Institute"/* 260604 번역 */, url1: "http://www.yessign.or.kr/", name2: "Korea Trade Network (KTNET)"/* 260604 번역 */, url2: "http://www.tradesign.net/" }
                    ],
                    RelatedSitesTitle: "Other Related Sites"/* 260604 번역 */,
                    RelatedSites: [
                        { num: "01", name: "Accredited Electronic Certification Authorities"/* 260604 번역 */, desc: "This is the internet purchasing system site through which GS Retail purchases and procures products and services fairly, transparently, and at reasonable prices."/* 260604 번역 */ },
                        { num: "02", name: "eSCM21", desc: "This is a site that supports efficient operations by allowing business processing (ordering/receiving, payment settlement, tax invoices, inventory/sales information, etc.) with partner companies that trade with GS Retail to be handled online via the DACOM network."/* 260604 번역 */ }
                    ],
                    HelpDeskTitle: "HELP DESK",
                    HelpDeskDesc: "If you have any questions or concerns regarding the Partner Consultation Support Center, please contact us at the number below and we will be happy to assist you."/* 260604 번역 */,
                    HelpDeskItems: [
                        { brand: "GS25", tel: "1644-5425", note: "GS25 Startup Consultation Inquiry"/* 260604 번역 */, link: "/gsrst02010101", imgName: "gsrst01_gs25.png" },
                        { brand: "GS THE FRESH", tel: "1833-9779", note: "GS THE FRESH Franchise Consultation Inquiry"/* 260604 번역 */, link: "/gsrst01010101", imgName: "gsrst01_fresh.png" }
                    ],
                    BtnGoDetail: "Go >",
                    FaqList: [
                        { 
                            question: "How much does it cost to open a store?"/* 260604 번역 */, 
                            answer: "Partnership costs vary depending on the brand, floor area, and region. <br/>You can receive accurate cost information through a consultation request."/* 260604 번역 */,
                            isOpen: true // 첫 번째 항목 기본 오픈
                        },
                        { 
                            question: "Is renovation of an existing store also possible?"/* 260604 번역 */, 
                            answer: "Yes, consultations for renovating existing stores are also available. For details, please consult with the responsible MD."/* 260604 번역 */,
                            isOpen: false 
                        },
                        { 
                            question: "How do I receive operational support after opening?"/* 260604 번역 */, 
                            answer: "We provide regular refresher training and operational guides, and an assigned SV provides support."/* 260604 번역 */,
                            isOpen: false 
                        },
                        { 
                            question: "How long is the contract period?"/* 260604 번역 */, 
                            answer: "The basic contract period varies by brand and is generally renewed every two years."/* 260604 번역 */,
                            isOpen: false 
                        },
                        { 
                            question: "Can I cancel a partnership consultation?"/* 260604 번역 */, 
                            answer: "Even after completing your application, you can request cancellation from My Page or the consultation inquiry menu."/* 260604 번역 */,
                            isOpen: false 
                        }
                    ],
                    counselTitle:"Consultation Application"/* 260604 번역 */,
                    listening: {
                        Txt:"We will always put ourselves in our customers' shoes and listen even to the smallest voice.",
                        Title: "Inquiries Related to Brand Store Use",
                        Desc: "We will always listen attentively to even the smallest voice, putting ourselves in our customers' position.<br />Inquiries Related to Brand Store Use<br />Please leave your comments, compliments, complaints, or suggestions regarding your experience visiting our stores.",
                        Consents: [

                            {
                                title: "Consent to Collection and Use of Personal Information",
                                items: [
                                    "The information you enter is used solely for partnership consultation. The collected items, use and purpose, and retention and use period are as follows. For other personal information handling matters, please refer to the 'Privacy Policy' at the bottom of the website."/* 260604 번역 */,
                                    "Personal information collected: name, mobile phone number, date of birth"/* 260604 번역 */,
                                    "Collection and purpose: The collected personal information is used for identity verification and to confirm and respond to inquiries."/* 260604 번역 */,
                                    "- Retention and Use Period: One year after receipt"
                                ],
                                guide: "You have the right to refuse this consent; however, if you do not consent,<br/> Writing an inquiry is not possible."/* 260604 번역 */
                            }
                        ],
                        InputWrapcont: {
                            part1: {
                                title: "Customer Information",
                                requiredText: "* Required fields",
                                nameLabel: "Name",
                                namePlaceholder: "Please enter your name"/* 260604 번역 */,
                                emailLabel: "Email",
                                emailOptions: [{ value: 'naver.com', label: 'naver.com' }, { value: 'gmail.com', label: 'gmail.com' }],
                                telLabel: "Mobile phone"/* 260604 번역 */,
                                companyname :"Company Name"/* 260604 번역 */,
                                department:"Department / Position"/* 260604 번역 */,
                                department_1:"Department",
                                rank:"Position"/* 260604 번역 */,
                                

                            },
                            part2: {
                                title: "Business Information"/* 260604 번역 */,
                                사업자등록번호: "Business Registration Number"/* 260604 번역 */,
                                placeholder_1:" Enter numbers without '-'"/* 260604 번역 */,
                                회사명:"Company Name "/* 260604 번역 */,
                                사업자구분: "Business Type"/* 260604 번역 */,
                                대표자성명: "Representative's Name"/* 260604 번역 */,
                                placeholder_2:"Representative's Name"/* 260604 번역 */,
                                업태: "Business Condition"/* 260604 번역 */,
                                업종:"Business Category"/* 260604 번역 */,
                                대표브랜드:"Flagship Brand"/* 260604 번역 */,
                                주소:"Address",
                                placeholder_3_1:" Address field 1 (region, street name)"/* 260604 번역 */,
                                placeholder_3_2:" Address field 2 (detailed address)"/* 260604 번역 */,
                                placeholder_3_3:" Postal Code field"/* 260604 번역 */,
                                설립일자:"Establishment Date"/* 260604 번역 */
                            },
                            part3: {
                                title: "Application Information"/* 260604 번역 */,
                                입점부문: "Partnership Division"/* 260604 번역 */,
                                신청상품군:"Product Category Applied For"/* 260604 번역 */,
                                신청상세품목: "Detailed Items Applied For"/* 260604 번역 */,
                                상품명: "Plan Name",
                                납품원가: "Supply Cost (KRW)"/* 260604 번역 */,
                                판매희망가: "Desired Selling Price (KRW)"/* 260604 번역 */,
                                상품규격 : "Product Specifications (unit omitted)"/* 260604 번역 */,
                                상품규격상세: "Width x Length x Height cm, Weight kg"/* 260604 번역 */,
                                첨부파일:"Attach Product Image"/* 260604 번역 */,
                                첨부_desc:"(000x000 px)",
                                입점제안서:"Attach Partnership Proposal"/* 260604 번역 */,
                                입점_desc:"(Max 00MB)"/* 260604 번역 */,
                                신청제목:"Application Title"/* 260604 번역 */,
                                신청내용:"Application Details"/* 260604 번역 */,
                                파일추가:"Add File"/* 260604 번역 */,
                                btnSubmit: "Consultation Request"/* 260604 번역 */,
                                btnCancel: "Rewrite"/* 260604 번역 */
                            }
                        }
                    },
                    ViewCountText: "View"/* 260604 번역 */,
                    ExternalMoveText: "Redirecting to the GS SHOP partnership consultation page."/* 260604 번역 */,
                    SystemLinks: [
                        { title: "GS Retail Electronic Contract System"/* 260604 번역 */, url: "https://partner.gsretail.com:7300/web/main/index.jsp" },
                        { title: "GS Retail Partner Company Portal"/* 260604 번역 */, url: "https://gs.escm21.net/escm21/home/index.jsp" }
                    ],
                    GsShopUrl: "https://withgs.gsshop.com/sug/suggest"
                }
            }
        };
    },
    computed: {
        t() { return this.langData[this.lang] || this.langData.ko; }
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); },
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default"; // data-type 속성 읽기
            const cont = el.dataset.cont; // data-cont 속성 읽기
            modal.open(popId, type, el, cont); // 4개 인자 모두 전달
        },
        onFiles() {},
        onMainTabChange(idx) {
            // GS SHOP 탭(인덱스 1) 클릭 시 외부 페이지 오픈
            if (idx === 1) {
                window.open(this.t.GsShopUrl, "_blank");
                // 화면상에서는 다시 GS25 탭으로 되돌리거나 현재 상태 유지 (기획에 따라 조절)
                this.$nextTick(() => {
                    this.MainTabIdx = 0;
                });
            } else {
                this.MainTabIdx = idx;
            }
        },
        onSubTabChange(idx) { this.SubTabIdx = idx; },
        onPageChange(page) { this.currentPage = page; },
    }
};
</script>

<style scoped>
/* 1. 공통 레이아웃 및 간격 */
.main-container { width: 100%; position: relative; }
.title_wrap { width: 100%; height: 480px; padding: 10.91% 0 11.25%; background: url('/src/assets/images/dummy/gsrst01_bg.png') no-repeat center / cover; text-align: center; position: relative; display: block;}
.page-title { color: #FFFFFF; font-size: 7.2rem; font-weight: 700; letter-spacing: -1.44px; }
.mo {display:none;}
.pc {display:block;}

/* 2. 텍스트 스타일 가이드 */
.section-sub-title { font-size: 4rem; font-weight: 700; color: #161616; }
.intro_desc { font-size: 2.4rem; color: #161616; line-height: 1.5; }
.text-wrapper { font-size: 2.8rem; font-weight: 700; color: #161616; }
.text-wrapper-2 { font-size: 2.4rem; font-weight: 700; color: #161616; }
.div_desc { font-size: 2rem; line-height: 1.4; color: #161616; }
.div_desc :deep(li) { font-size: 2rem; line-height: 1.4; color: #161616; }

/* 3. 가이드 Step 리스트 (ul/li 최적화) */
.guide_header{margin-bottom:40px;}
.guide_title { font-size: 2.8rem; font-weight: 700; color: #161616; }
.step_list { display: flex; align-items: center;}
.step_list li {padding: 56px 64px; background-color: #f8f8f8; border-radius: 8px;  flex: 1; display: flex; align-items: center; }
.step_list li::before { content:''; width:40px; height:40px; margin-right:24px; background-image:url('@/assets/images/sub/icon_cont_40.png'); background-repeat:no-repeat;  display:inline-block; flex-shrink:0; } /* 아이콘 영역 */
.step_list li:first-of-type::before {background-position:-100px -266px;} /* 아이콘 영역 */
.step_list li:nth-of-type(2)::before {background-position:-900px -186px;} /* 아이콘 영역 */
.step_list li:nth-of-type(3)::before {background-position:-1140px -266px;} /* 아이콘 영역 */
.step_list li:last-of-type::before {background-position:-660px -103px;} /* 아이콘 영역 */
.step_info { display: flex; flex-direction: column; gap: 6px; }
.step_label { font-size: 1.8rem; font-weight: 700; color:#15B874; }
.step_text { font-size: 2rem; font-weight: 700; color: #161616; }

/* 4. 테이블 리스트 (공지사항 등) */
.policy_wrap table { width: 100%; border-collapse: collapse; border-top:0;}
.policy_wrap th {border-top-color: #E5E5E9;}
.policy_wrap th, .policy_wrap td { padding: 18px 24px; border-bottom: 1px solid #E5E5E9; font-size: 1.8rem; vertical-align: middle; }
.policy_wrap td a {font-size: 1.8rem;}
.policy_wrap thead th { background-color: #F8F8F8; color: #161616; font-weight: 700; }
.policy_wrap td { height: 82px; color: #161616; border-left: 0; border-right: 0; }
.policy_wrap th { border-left: 0; border-right: 0; }
.notice_list_area .policy_wrap tbody tr:first-of-type td {border-top:1px solid #161616;}

/* 5. 입점 안내 상세 컨텐츠 (Table, Bullet, Card) */
.full_img { width: 100%; height: auto; display: block; }
.link_url { color: #161616; text-decoration: none; word-break: break-all; }

.card_grid {display:flex; gap:20px}
.info_card {width:340px; padding: 32px 32px 56px; background: #f8f8f8; border-radius: 12px; }
.card_num { font-size: 1.8rem; font-weight: 700; color: #15B874; display: block; margin-bottom: 4px; }
.card_name { font-size: 2rem; font-weight: 700; color: #161616; }
.card_desc { font-size: 1.6rem; line-height: 1.5; color: #67676f; margin-top: 12px; }

/* 6. HELP DESK (ul/li 및 가상요소 최적화) */
.help_desk_area { width: 100%; }
.help_desk_area ul { display: flex; gap:20px; list-style: none; padding: 0; }
.help_desk_area ul li {width:calc(100% / 2 - 10px); padding: 32px; background-color: #f8f8f8; border-radius: 10px; position: relative; }

/* li::before를 이용한 브랜드 로고 처리 */
.help_desk_area ul li::before { content: ''; width: 160px; height: 160px; margin-right:40px; background-repeat: no-repeat; background-position: center; background-size: contain; display:inline-block; flex-shrink: 0; }
.help_desk_area ul li:nth-child(1)::before { background-image: url('@/assets/images/dummy/gsrst01_gs25.png'); }
.help_desk_area ul li:nth-child(2)::before { background-image: url('@/assets/images/dummy/gsrst01_fresh.png'); }

.help_desk_area .info {vertical-align:top; display:inline-block;}
.help_desk_area .brand { font-size: 1.8rem; font-weight: 700; color: #161616; }
.help_desk_area .tel { font-size: 2.8rem; font-weight: 700; color: #161616; margin: 4px 0; display: block; }
.help_desk_area .note { font-size: 1.6rem; color: #67676f; }

/* 7. 하단 공통 배너 (사용자 수정 CSS 반영) */
.bottom_link_btns { margin-top: 60px; display: flex; gap: 20px; }
.bottom_link_btns a { padding: 94px 32px 32px; color:#161616; font-size: 1.8rem; font-weight:700; background-color: #f8f8f8; border-radius: 10px; text-decoration: none; transition: background-color 0.2s; position:relative; flex: 1; display: flex; align-items: center; justify-content: center; }
.bottom_link_btns a:first-of-type::before { content:''; width:40px; height:40px; background-image:url('@/assets/images/common/system.png'); } /* 아이콘 가상요소 */
.bottom_link_btns a:last-of-type::before { content:''; width:40px; height:40px; background-image:url('@/assets/images/common/system2.png'); } /* 아이콘 가상요소 */
.bottom_link_btns a:hover:first-of-type::before { content:''; width:40px; height:40px; background-image:url('@/assets/images/common/system_wh.png'); } /* 아이콘 가상요소 */
.bottom_link_btns a:hover:last-of-type::before { content:''; width:40px; height:40px; background-image:url('@/assets/images/common/system2_wh.png'); } /* 아이콘 가상요소 */
.bottom_link_btns a::after {content:''; width:20px; height:20px; margin-left:8px; background:url('@/assets/images/common/icon_set_20.png') -324px -25px no-repeat; display:inline-block; } /* 아이콘 가상요소 */
.bottom_link_btns a:hover::after {background:url('@/assets/images/common/arrow_wh.png')} /* 아이콘 가상요소 */
.bottom_link_btns a::before { position:absolute; top:32px; left:50%; transform:translateX(-50%); }
.bottom_link_btns a:hover { color:#fff; background:#15B874; }

/* 8. FAQ 공통 */
.q_box {font-size: 1.8rem; display:flex;}
.q_box::before {content:'Q'; margin-right:16px;}
.a_box {padding:0px 30px 24px; color:#67676F; font-size: 1.8rem;}
.pagination_area { display: flex; justify-content: center; }
:deep(.primary){background-color:#15B874}

/* 입점안내 */
.gsrse02 .img_box {display:block; text-align:center;}

/* 상담신청 */
.radio_wrap {display:flex; gap:20px;}
.input_wrap.type-radio {width: auto !important;flex: 0 1 auto;}
.listening_form_area .consent_box { background-color: #f8f8f8; padding: 32px; border-radius: 12px;}
.listening_form_area .consent_tit {margin-bottom: 24px; font-size: 2.4rem; font-weight: 700; display: block; }
.listening_form_area .consent_list {padding-bottom:24px;}
.listening_form_area .consent_list li { font-size: 1.6rem; color: #67676f; margin-bottom: 8px; padding-left: 12px; line-height:1.5; position: relative; }
.listening_form_area .consent_list li::before { content: ""; position: absolute; left: 0; top: 10px; width: 4px; height: 1px; background-color: #67676f; }
.listening_form_area .consent_agree {padding-top:24px; border-top:1px solid #D7D7DF; display:flex; justify-content:space-between; align-items:center;}
.listening_form_area .consent_agree p {font-size: 1.6rem; font-weight:700;}
.listening_form_area article {margin-bottom:40px;}
.listening_form_wrap .form_header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid #242428; }
.listening_form_wrap .form_title { font-size: 2.4rem; font-weight: 700; color: #161616; }
.listening_form_wrap .required_guide { font-size: 1.4rem; color: #fb6432; }
.form_section {margin-bottom:64px;}
.form_section:last-of-type {margin-bottom:40px;}
.listening_form_wrap .form_body {padding:10px 0 12px; border-bottom: 1px solid #e5e5e9; }
.listening_form_wrap .form_row { display: flex; align-items: flex-start; gap: 8px; padding: 12px 0; }
.listening_form_wrap .label_item {width: 150px; align-items: center; gap: 4px; padding-top: 14px; }
.listening_form_wrap .label_text {color: #161616; font-size: 1.6rem; display:inline-block; margin-right:5px; }
.listening_form_wrap .label_text .label_desc {display:inline;}

@media screen and (min-width: 769px) {
    .listening_form_wrap .label_text .label_desc {display:block;}
}
.listening_form_wrap .required_mark { color: #fb6432; font-size: 1.6rem; }
.listening_form_wrap .input_group { display: flex; align-items: center; gap: 8px;}
.listening_form_wrap .input_item.company_search{display:flex;gap:8px;align-items: center;}
.listening_form_wrap .input_item.company_search:deep(button){width:134px;}
.listening_form_wrap .input_item.full{width:100%; max-width:400px;}
.listening_form_wrap .input_item.full_textarea{width:100%; max-width:886px;}
.listening_form_wrap .input_item.full_textarea :deep(.textarea_field > textarea) {height:160px; min-height:160px; resize:none;}
.listening_form_wrap .input_item.name {width:100%; max-width:205px;}
.listening_form_wrap .input_group.email .input_flex_item{max-width:205px;}
.listening_form_wrap .input_group.email .select{width:205px;}
.listening_form_wrap .input_group.phone .select {width:134px;}
.listening_form_wrap .input_group.phone .input_flex_item {max-width:134px;}
.listening_form_wrap .input_group.companyname {width:100%;max-width:447px;}
.listening_form_wrap .input_group .group_wrap { display: flex; align-items: center; gap: 8px;}
.listening_form_wrap .input_flex_item { flex: 1; min-width: 0; }
.listening_form_wrap .unit { color: #67676f; font-size: 1.6rem; padding: 0 4px; }
.listening_form_wrap .input_complex {width:calc(100% - 134px);  display: flex; flex-direction: column; gap: 8px;}
.listening_form_wrap .product_spec_wrap {display:flex; align-items:center; gap:8px; flex-wrap:wrap;}
.listening_form_wrap .product_spec_row {display:flex; align-items:center; gap:8px;}
.listening_form_wrap .product_spec_wrap .product_spec_area {margin-left:16px; display:flex; align-items:center; gap:24px;}
.listening_form_wrap .product_spec_wrap :deep(.input_wrap) {width:100%; max-width:134px; flex:0 0 auto;}
.listening_form_wrap .product_spec_wrap .unit {color:#67676f; font-size: 1.6rem; flex:0 0 auto;}
.listening_form_wrap .product_spec_wrap .guide_msg {margin-top:0; color:#67676f; font-size: 1.4rem;}
.listening_form_wrap .input_complex.address_field {width:100%; max-width:757px; gap:8px;}
.listening_form_wrap .address_top {display:flex; align-items:center; gap:8px;}
.listening_form_wrap .address_top :deep(.input_wrap) {width:100%; max-width:207px;}
.listening_form_wrap .address_top :deep(button) {width:134px; flex-shrink:0;}
.listening_form_wrap .address_bottom {display:flex; align-items:center; gap:8px; width:100%;}
.listening_form_wrap .address_bottom :deep(.input_wrap) {flex:1; min-width:0;}
.listening_form_wrap .guide_msg {margin-top:5px; color: #67676f; font-size: 1.4rem; }
.listening_form_wrap .department {display:flex; gap:20px;}
.listening_form_wrap .department p {display:flex; align-items:center; gap:10px;}
.listening_form_wrap .department em { font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
.form_container .btn-wrap {display:flex; justify-content:flex-end; gap:8px;}
.form_container .btn-wrap * {width:134px;}


/* 9. 반응형 미디어 쿼리 */
@media screen and (max-width: 1024px) {
    .step_list {flex-wrap:wrap;}
    .step_list li {width:50%; padding:40px 30px; flex: none;}
    .bottom_link_btns, .help_desk_area ul { flex-direction: column; grid-template-columns: 1fr; }
    .help_desk_area ul li { width:100%; padding:20px; flex-direction:column;}
    .policy_wrap th, .policy_wrap td, .policy_wrap td a {font-size: 1.6rem !important; }
    .listening_form_wrap .form_row {flex-direction:column;}
}
@media screen and (max-width: 767px) {
    .mo {display:block;}
    .pc {display:none;}
    .mt100 {margin-top:60px !important}
    .mb100 {margin-bottom:60px !important}
    .cont_inner {padding-top:84px;} /* 26.06.26 add 이소라 */
    :deep(.tab_wrap) ul.type_02 {padding-left:0px !important;}
    .text-wrapper { font-size: 2.4rem;}
    .title_wrap  {display:none;}
    .section-sub-title, .guide_title {font-size: 2.4rem;}
    .intro_desc {font-size: 1.8rem;}
    .step_list {flex-direction: column; align-items: flex-start; padding:0; }
    .div_desc :deep(li), .bullet_01 li, .div_desc { font-size: 1.8rem; margin-top:12px; }
    .step_list {padding:40px 30px; gap:24px; background-color:#f8f8f8; border-radius:8px}
    .step_list li {width:100%; padding:0}
    .step_text {font-size: 1.8rem;}
    .step_desc { font-size: 1.4rem; font-weight:400; color: #67676F; }
    .sub_tab_wrap.mb40,
    .guide_title.mb40 {margin-bottom:24px !important}
    .notice_list_area .base_table tbody tr td:first-of-type {display:none;}
    /* 기존 테이블 레이아웃 해제 */
    .notice_list_area .base_table tbody, .notice_list_area .base_table tr, .notice_list_area .base_table td {display: block; width: 100%; height:auto; border: 0;}
    .notice_list_area .base_table tr {padding:12px 10px; border-bottom: 1px solid #EEE; display: flex; flex-wrap: wrap;}
    /* 제목 셀: 상단 전체 너비 차지 */
    .notice_list_area .policy_wrap tbody tr:first-of-type td {border-top:0;}
    .notice_list_area .base_table {border-top:1px solid #161616;}
    .notice_list_area .base_table .title_cell {padding: 0 0 8px 0; order: 1;}
    .notice_list_area .base_table .title_cell .link_title {color: #161616; font-size: 1.6rem !important; font-weight: 500; line-height: 1.4;}
    .notice_list_area .base_table .date_cell, .notice_list_area .base_table .view_cell {width: 50%; padding: 0; color: #999; font-size: 1.2rem !important; text-align: left !important; order: 2;}
    .notice_list_area .base_table .view_cell {color:#67676F; text-align:right !important; order: 3;}
    .notice_list_area .base_table .view_cell::before {margin-right: 4px;}
    .help_desk_area ul li { width:100%; padding:20px; display:flex; flex-direction:row; gap:20px; align-items:center;}
    .help_desk_area ul li::before {width:100px; margin-right:0;}
    .help_desk_area .info .brand { font-size: 1.4rem;}
    .help_desk_area .info .tel { font-size: 2rem;}
    .help_desk_area .info .note { font-size: 1.2rem;}
    .help_desk_area .info .btn_big {height:38px; font-size: 1.6rem;}
    .card_grid {overflow-x:auto; flex-wrap:nowrap;}
    .card_grid .info_card {width:324px; flex:none;}
    .policy_wrap th, .policy_wrap td, .policy_wrap td a {font-size: 1.6rem !important; }

    /* 입점안내 */
    .gsrse02 .img_box .full_img {max-width:336px; display:inline-block;}
    .auth_table_area.mo { width: 100%; display: flex; flex-direction: column; box-sizing: border-box; }
    .auth_table_area.mo .text-wrapper-2.mb24 { margin-bottom: 24px; color: #161616; font-size: 1.8rem; font-weight: 700; }
    .auth_table_area.mo .auth_header { display: flex; width: 100%; background-color: #f8f8f8; border-top:1px solid #161616; border-bottom: 1px solid #e5e5e9; }
    .auth_table_area.mo .auth_header span { flex: 1; padding: 18px 0; color: #161616; font-size: 1.6rem; font-weight: 700; text-align: center; }
    .auth_table_area.mo .auth_card_list { display: flex; flex-direction: column; width: 100%; }
    .auth_table_area.mo .auth_card_item { display: flex; width: 100%; border-bottom: 1px solid #e5e5e9; }
    .auth_table_area.mo .auth_row { display: flex; width: 100%; align-items: center; }
    .auth_table_area.mo .agency_name { flex: 1; padding: 20px 24px; color: #161616; font-size: 1.6rem; font-weight: 400; text-align: left; }
    .auth_table_area.mo .btn_go_link { flex: 1; padding: 20px 0; color: #107af2; font-size: 1.6rem; font-weight: 400; text-align: center; text-decoration: underline; cursor: pointer; }
    .auth_table_area.mo .btn_go_link:hover { color: #0056b3; }
    .input_item, .input_complex, .input_wrap {width:100%;}
    .listening_form_area .consent_box {margin-bottom:20px; padding:30px 20px;}
    .listening_form_wrap .input_group.email {flex-direction:column; align-items:stretch;}
    .consent_agree {flex-direction:column; align-items:flex-start; gap:15px;}
    .guide_text + .input_wrap {justify-content:flex-start;}
    .form_container .btn-wrap {display:flex; justify-content:flex-start; gap:8px;}
    .form_container .btn-wrap * {width:50%;}
    .form_body .form_row:first-of-type .label_item {padding-top: 0px;}
    .consent_tit {font-size: 1.8rem !important;}
    .consent_list li, .consent_agree p  {font-size: 1.4rem !important;}
    :deep(.check) em {font-size: 1.6rem !important;}
    :deep(.guide_text) br {display:none;}
    .listening_form_wrap .form_row{gap:12px;}
    .listening_form_wrap .form_section_customer .form_header {padding-bottom:16px;}
    .listening_form_wrap .form_section_customer .form_title {font-size: 2.4rem; line-height:1.35;}
    .listening_form_wrap .form_section_customer .required_guide {font-size: 1.4rem; line-height:1.4;}
    .listening_form_wrap .form_section_customer .form_body {padding:24px 0 12px;}
    .listening_form_wrap .form_section_customer .form_row {flex-direction:column; align-items:stretch; gap:12px; padding:20px 0;}
    .listening_form_wrap .form_section_customer .form_body .form_row:first-of-type {padding-top:0;}
    .listening_form_wrap .form_section_customer .label_item {width:100%; padding-top:0; display:flex; align-items:center; gap:4px;}
    .listening_form_wrap .form_section_customer .input_item,
    .listening_form_wrap .form_section_customer .input_group {width:100%; max-width:100%;}
    .listening_form_wrap .form_section_customer .input_item.name {max-width:100%;}
    .listening_form_wrap .form_section_customer .input_item.name :deep(.input_wrap) {max-width:100%;}
    .listening_form_wrap .form_section_customer .input_group.email {flex-direction:column; align-items:stretch; gap:8px;}
    .listening_form_wrap .form_section_customer .input_group.email .group_wrap {display:flex; align-items:center; gap:8px; width:100%;}
    .listening_form_wrap .form_section_customer .input_group.email .group_wrap .input_flex_item {flex:1; min-width:0; max-width:none;}
    .listening_form_wrap .form_section_customer .input_group.email .group_wrap :deep(.input_wrap) {max-width:100%;}
    .listening_form_wrap .form_section_customer .input_group.email :deep(.select) {width:100%; max-width:100%;}
    .listening_form_wrap .form_section_customer .input_group.phone {flex-wrap:nowrap; width:100%;}
    .listening_form_wrap .form_section_customer .input_group.phone :deep(.select) {flex:1 1 0; min-width:0; max-width:none; width:auto;}
    .listening_form_wrap .form_section_customer .input_group.phone .input_flex_item {flex:1 1 0; min-width:0; max-width:none;}
    .listening_form_wrap .form_section_customer .input_group.phone .unit {flex:0 0 auto;}
    .listening_form_wrap .form_section_customer .input_group.companyname {max-width:100%;}
    .listening_form_wrap .form_section_customer .input_group.companyname :deep(.input_wrap) {max-width:100%;}
    .listening_form_wrap .form_section_customer .input_group.department {flex-direction:row; flex-wrap:nowrap; align-items:center; gap:8px; width:100%;}
    .listening_form_wrap .form_section_customer .input_group.department p {display:flex; align-items:center; gap:8px; flex:1; min-width:0; margin:0;}
    .listening_form_wrap .form_section_customer .input_group.department em {width:auto; flex:0 0 auto; color:#67676f; font-size: 1.6rem; font-weight:400; font-style:normal;}
    .listening_form_wrap .form_section_customer .input_group.department :deep(.input_wrap) {flex:1; min-width:0; max-width:100%;}
    .listening_form_wrap .form_section_business .form_header {padding-bottom:16px;}
    .listening_form_wrap .form_section_business .form_title {font-size: 2.4rem; line-height:1.35;}
    .listening_form_wrap .form_section_business .required_guide {font-size: 1.4rem; line-height:1.4;}
    .listening_form_wrap .form_section_business .form_body {padding:24px 0 12px;}
    .listening_form_wrap .form_section_business .form_row {flex-direction:column; align-items:stretch; gap:12px; padding:20px 0;}
    .listening_form_wrap .form_section_business .form_body .form_row:first-of-type {padding-top:0;}
    .listening_form_wrap .form_section_business .label_item {width:100%; padding-top:0; display:flex; align-items:center; gap:4px;}
    .listening_form_wrap .form_section_business .label_item.full {width:100%;}
    .listening_form_wrap .form_section_business .input_item,
    .listening_form_wrap .form_section_business .input_group,
    .listening_form_wrap .form_section_business .input_complex {width:100%; max-width:100%;}
    .listening_form_wrap .form_section_business .input_item :deep(.input_wrap),
    .listening_form_wrap .form_section_business .input_item.full :deep(.input_wrap) {max-width:100%;}
    .listening_form_wrap .form_section_business .input_item.company_search {flex-direction:row; flex-wrap:nowrap; align-items:center; gap:8px;}
    .listening_form_wrap .form_section_business .input_item.company_search :deep(.input_wrap) {flex:1; min-width:0; max-width:none;}
    .listening_form_wrap .form_section_business .input_item.company_search :deep(button) {width:93px; flex-shrink:0;}
    .listening_form_wrap .form_section_business .input_complex.address_field {max-width:100%; gap:8px;}
    .listening_form_wrap .form_section_business .address_top {flex-direction:row; align-items:center; gap:8px;}
    .listening_form_wrap .form_section_business .address_top :deep(.input_wrap) {flex:1; min-width:0; max-width:none;}
    .listening_form_wrap .form_section_business .address_top :deep(button) {width:119px; flex-shrink:0;}
    .listening_form_wrap .form_section_business .address_bottom {flex-direction:row; align-items:center; gap:8px;}
    .listening_form_wrap .form_section_business .address_bottom :deep(.input_wrap) {flex:1; min-width:0; max-width:none;}
    .listening_form_wrap .form_section_business .input_item.radio_wrap {display:flex; flex-wrap:wrap; gap:16px;}
    .listening_form_wrap .form_section_business .product_spec_wrap {flex-direction:column; align-items:stretch; gap:8px;}
    .listening_form_wrap .form_section_business .product_spec_row {display:flex; align-items:center; gap:8px; width:100%;}
    .listening_form_wrap .form_section_business .product_spec_row :deep(.input_wrap) {flex:1 1 0; min-width:0; max-width:none;}
    .listening_form_wrap .form_section_business .product_spec_area {margin-left:0; flex-direction:column; align-items:stretch; gap:8px; width:100%;}
    .listening_form_wrap .form_section_business .product_spec_area :deep(.input_wrap) {max-width:100%;}
    .listening_form_wrap .form_section_business .product_spec_area .guide_msg {font-size: 1.6rem; line-height:1.5;}
    .listening_form_wrap .form_section_business .input_item.full_textarea :deep(.textarea_field > textarea) {height:160px; min-height:160px;}
    .listening_form_wrap .input_complex {width:100%; max-width:100%;}
    
    /* 7. 하단 공통 배너 */
    .bottom_link_btns a {padding:20px 32px; justify-content:flex-start; gap:12px;}
    .bottom_link_btns a::before {position:static; transform:none;}
    .bottom_link_btns a::after {margin-left:0;}
    .pagination_area.mt64 {margin-top:0px !important}
}
</style>