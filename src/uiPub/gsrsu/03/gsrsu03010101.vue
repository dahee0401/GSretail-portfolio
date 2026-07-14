<template>
    <div class="main-container" v-if="t">
        <div class="title_wrap ac top_visual">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
            <!-- 26.06.10 Del 이종환 <p class="visual-sub">{{ t.MainsubTitle }}</p> -->
        </div>

        <section class="section-investor">
            <div class="cont_inner">
                <Tabs  mb120
                    v-model="CTabIdx" 
                    :tab-items="t.Tabs1" 
                    tab-class="type_01" 
                    :tab-slide="true" 
                    @change="onTabChange1" 
                />

                <div class="tab_content_wrap">
                    <article v-if="CTabIdx === 0">
                        <Tabs 
                            v-model="SubTabIdx1" 
                            :tab-items="t.Tabs2_1" 
                            tab-class="type_02" 
                            @change="SubTabIdx2 = 0" 
                            :tab-slide="true" 
                        />

                        <div class="sub_tab_content">
                            <div v-if="SubTabIdx1 === 0" class="winwin_intro">
                                <div class="intro_summary">
                                    <h3 class="text_summary">{{ t.WinWinIntro.Summary }}</h3>
                                </div>

                                <div class="intro_contents">
                                    <section class="intro_section">
                                        <h3 class="section_title">{{ t.WinWinIntro.Philosophy.Title }}</h3>
                                        <div class="philosophy_box mt40">
                                            <ul class="circle_grid">
                                                <li class="item_wrap">
                                                    <div 
                                                        v-for="(item, idx) in t.WinWinIntro.Philosophy.Items" 
                                                        :key="'phil-'+idx" 
                                                        :class="['color_0' + (idx+1)]"
                                                    >
                                                        <strong>{{ item.tit }}</strong>
                                                        <p v-html="item.desc"></p>
                                                    </div>
                                                </li>
                                                <li class="btn-wrap ac mt40">
                                                    <Buttons btn-class="btn_icon_arrow btn_xl border after">
                                                        {{ t.WinWinIntro.Philosophy.Btn }}
                                                    </Buttons>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section class="intro_section">
                                        <h4 class="section_title">{{ t.WinWinIntro.Strategy.Title }}</h4>
                                        <div class="strategy_box">
                                            <picture class="diagram_img_wrap">
                                                <source media="(max-width: 768px)" :srcset="t.WinWinIntro.Strategy.imgMo" />
                                                <img :src="t.WinWinIntro.Strategy.img" :alt="t.WinWinIntro.Strategy.alt">
                                            </picture>
                                            
                                            <ul class="card_grid">
                                                <li v-for="(card, idx) in t.WinWinIntro.Strategy.Cards" :key="'card-'+idx" class="strategy_card">
                                                    <div class="card_head">
                                                        <span class="num">{{ card.num }}</span>
                                                        <strong>{{ card.tit }}</strong>
                                                    </div>
                                                    <ul class="bullet_01">
                                                        <li v-for="(li, lIdx) in card.list" :key="'li-'+lIdx">{{ li }}</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section class="intro_section">
                                        <h3 class="section_title">{{ t.WinWinIntro.Index.Title }}</h3>
                                        <div class="index_box mt40">
                                            <figure class="index_visual">
                                                <img src="@/assets/images/dummy/gsrsu03010101_2.png" :alt="t.WinWinIntro.Index.alt">
                                            </figure>
                                            <strong>{{ t.WinWinIntro.Index.SubTitle }}</strong>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            
                            <div v-if="SubTabIdx1 === 1">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.Partnersupport.Summary"></h3>
                                </div>
                                <Tabs 
                                    v-model="SubTabIdx2" 
                                    :tab-items="t.Tabs3_1" 
                                    tab-class="type_04 col_3" 
                                    class="mb40" 
                                    :tab-slide="true" 
                                />
                                <div class="inner_content">

                                    <!-- gsrsu0301010201 -->
                                    <div v-if="SubTabIdx2 === 0" class="finance_support">

                                        <p class="text_summary_sub" v-html="t.Partnersupport.FinanceSupport.Summary"></p>

                                        <section class="support_item">
                                            <div class="wide_info_box">
                                                <figure class="img_frame">
                                                    <img src="@/assets/images/dummy/gsrsu0301010201_1.png" :alt="t.Partnersupport.FinanceSupport.Fund.Title">
                                                </figure>
                                                <div class="text_area">
                                                    <h4>{{ t.Partnersupport.FinanceSupport.Fund.Title }}</h4>
                                                    <p>{{ t.Partnersupport.FinanceSupport.Fund.Desc }}</p>
                                                </div>
                                            </div>

                                            <div class="process_container">
                                                <h3 class="section_title_sub">{{ t.Partnersupport.FinanceSupport.Fund.ProcessTitle }}</h3>
                                                <div class="process_flow">
                                                    <div 
                                                        v-for="(step, idx) in t.Partnersupport.FinanceSupport.Fund.Steps" 
                                                        :key="'step-'+idx" 
                                                        class="step_unit"
                                                    >
                                                        <p class="step_desc" v-html="step.tit"></p>
                                                        <span 
                                                            v-if="idx < t.Partnersupport.FinanceSupport.Fund.Steps.length - 1" 
                                                            class="arrow_next"
                                                        ></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <section class="support_item grid_column_2">
                                            <div 
                                                v-for="(item, idx) in t.Partnersupport.FinanceSupport.SubFunds" 
                                                :key="'subfund-'+idx" 
                                                class="sub_fund_item"
                                            >
                                                <figure class="img_frame_small">
                                                    <img :src="item.img" :alt="item.tit">
                                                </figure>
                                                <div class="text_area mt32">
                                                    <h4>{{ item.tit }}</h4>
                                                    <p v-html="item.desc"></p>
                                                    <!-- <strong v-html="item.desc2"></strong> 20260623 delete 이소라 -->
                                                </div>
                                            </div>
                                        </section>

                                        <section class="support_item card_grid">
                                            <div 
                                                v-for="(card, idx) in t.Partnersupport.FinanceSupport.Cards" 
                                                :key="'fcard-'+idx" 
                                                class="strategy_card"
                                            >
                                                <div class="card_head">
                                                    <strong v-html="card.tit"></strong>
                                                </div>
                                                <p class="card_desc">{{ card.desc }}</p>
                                            </div>
                                        </section>
                                    </div>

                                    <!--gsrsu0301010202 -->
                                    <div v-if="SubTabIdx2 === 1" class="market_support">
                                        <section class="support_item">

                                            <p class="text_summary_sub" v-html="t.MarketSupport.Marketing.Summary"></p>

                                            <div class="div mb40">
                                                <h4>{{ t.MarketSupport.Marketing.Title }}</h4>
                                                <p class="p">{{ t.MarketSupport.Marketing.Desc }}</p>
                                            </div>
                                            
                                            <ul class="brand_grid">
                                                <li v-for="(brand, idx) in t.MarketSupport.Marketing.Brands" :key="'brand-'+idx">
                                                    <div class="marketing_item">
                                                        <figure class="brand_img_box">
                                                            <img :src="brand.img" :alt="brand.name">
                                                        </figure>
                                                        <div class="brand_name mt16">
                                                            <strong>{{ brand.name }}</strong>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </section>

                                        <section class="support_item program_grid">
                                            <article v-for="(item, idx) in t.MarketSupport.Programs" :key="'prog-'+idx" class="program_item">
                                                <figure class="program_visual">
                                                    <img :src="item.img" :alt="item.tit">
                                                </figure>
                                                <div class="text_area mt40">
                                                    <h4 class="text-wrapper-4" v-html="item.tit"></h4>
                                                    <p class="text-wrapper-5" v-html="item.desc"></p>
                                                </div>
                                            </article>
                                        </section>
                                    </div>

                                    <!-- gsrsu0301010203 -->
                                    <div v-if="SubTabIdx2 === 2" class="competency_support">

                                        <p class="text_summary_sub" v-html="t.CompetencySupport.Summary"></p>

                                        <section class="support_item">
                                            <div class="div mb40">
                                                <h4 class="section_title_sub">{{ t.CompetencySupport.Education.Title }}</h4>
                                                <p class="p">{{ t.CompetencySupport.Education.Desc }}</p>
                                            </div>
                                            
                                            <ul>
                                                <li>
                                                    <figure class="img_frame">
                                                        <img src="@/assets/images/dummy/gsrsu0301010203_1.png" :alt="t.CompetencySupport.Education.alt">
                                                    </figure>
                                                    <figure class="img_frame">
                                                        <img src="@/assets/images/dummy/gsrsu0301010203_2.png" :alt="t.CompetencySupport.Program.Title">
                                                    </figure>
                                                </li>
                                            </ul>
                                            <div class="policy_wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 20%;">
                                                        <col style="width: 15%;">
                                                        <col style="width: auto;">
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th class="ac" v-for="(tr, idx) in t.CompetencySupport.Education.Table.Thead" :key="idx">{{ tr }}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(tr, idx) in t.CompetencySupport.Education.Table.Tbody" :key="idx">
                                                            <td class="ac">{{ tr.name }}</td>
                                                            <td class="ac">{{ tr.period }}</td>
                                                            <td>{{ tr.desc }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </section>
                                        <section class="support_item">
                                            <div class="div mb40">
                                                <h4 class="section_title_sub">{{ t.CompetencySupport.Program.Title }}</h4>
                                                <p class="p">{{ t.CompetencySupport.Program.Desc }}</p>
                                            </div>

                                            <div class="visual_wrap">
                                                <figure class="img_frame">
                                                    <img src="@/assets/images/dummy/gsrsu0301010203_3.png" :alt="t.CompetencySupport.Program.Title">
                                                </figure>
                                            </div>
                                        </section>

                                    </div>

                                    <!-- gsrsu0301010204 -->
                                    <div v-if="SubTabIdx2 === 3 && t.WelfareSupport" class="welfare_support">
                                        
                                        <p class="text_summary_sub" v-html="t.WelfareSupport.Summary"></p>

                                        <section class="support_item">
                                            <div class="div mb40">
                                                <h4 class="section_title_sub">{{ t.WelfareSupport.Football.Title }}</h4>
                                                <p class="p" v-html="t.WelfareSupport.Football.Desc"></p>
                                            </div>

                                            <div class="visual_wrap">
                                                <figure class="img_frame" style="width:100%; height:340px;">
                                                    <img src="@/assets/images/dummy/gsrsu0301010204.png" :alt="t.WelfareSupport.Football.Title">
                                                </figure>
                                            </div>
                                        </section>
                                    </div>

                                    <!-- gsrsu0301010205 -->
                                    <div v-if="SubTabIdx2 === 4 && t.BroadcastingSupport" class="broadcasting_support">

                                        <p class="text_summary_sub" v-html="t.BroadcastingSupport.Summary"></p>

                                        <section class="support_item">
                                            <div class="div mb40">
                                                <h3 class="section_title_sub mb16">{{ t.BroadcastingSupport.PrepSupport.Title }}</h3>
                                                <p class="p">{{ t.BroadcastingSupport.PrepSupport.Desc }}</p>
                                            </div>
                                            <figure class="img_frame">
                                                <img src="@/assets/images/sub/gsrsu03010101/img_01-02-05-01.png" :alt="t.BroadcastingSupport.PrepSupport.Title">
                                            </figure>
                                        </section>

                                        <section class="support_item small_business">
                                            <figure class="img_frame">
                                                <img src="@/assets/images/dummy/gsrsu0301010205_2.png" :alt="t.BroadcastingSupport.PrioritySupport.Title">
                                            </figure>

                                            <div>
                                                <div 
                                                    v-for="(sub, idx) in t.BroadcastingSupport.PrioritySupport.SubItems" 
                                                    :key="'broad-sub-'+idx"
                                                    class="sub_item"
                                                >
                                                    <h4>{{ sub.Title }}</h4>
                                                    <p class="p" v-html="sub.Desc"></p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <!-- gsrsu0301010206 -->
                                    <div v-if="SubTabIdx2 === 5 && t.CommunicationSupport" class="communication_support">
                                            
                                        <p class="text_summary_sub" v-html="t.CommunicationSupport.Summary"></p>

                                        <section class="support_item ">
                                            <figure class="img_frame">
                                                <img src="@/assets/images/dummy/gsrsu0301010206_1.png" :alt="t.aChannelVisual">
                                            </figure>
                                        </section>

                                        <section class="support_item">
                                            <div class="div mb40">
                                                <h4 class="section_title_sub">{{ t.CommunicationSupport.Title }}</h4>
                                            </div>

                                            <div class="policy_wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 250px;">
                                                        <col style="width: 200px;">
                                                        <col style="width: auto;">
                                                    </colgroup>
                                                    <thead>
                                                        <tr>
                                                            <th v-for="th in t.CommunicationSupport.Table.Thead" :key="th">{{ th }}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(tr, idx) in t.CommunicationSupport.Table.Tbody" :key="idx">
                                                            <td class="ac">{{ tr.name }}</td>
                                                            <td class="ac">{{ tr.period }}</td>
                                                            <td class="al">{{ tr.desc }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>

                            <div v-if="SubTabIdx1 === 2">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.OwnerSupport.Summary"></h3>
                                </div>

                                <Tabs 
                                    v-model="SubTabIdx2" 
                                    :tab-items="t.Tabs3_2" 
                                    tab-class="type_04 col_2" 
                                    class="mb40" 
                                    :tab-slide="true" 
                                />
                                <div class="inner_content">

                                    <!-- gsrsu03010103 -->
                                    <div v-if="SubTabIdx2 === 0 && t.OwnerSupport" class="gs25_owner_support">
                                            
                                        <p class="text_summary_sub" v-html="t.OwnerSupport.part_1.Summary"></p>

                                        <section class="support_item">
                                            <div class="div mb40">
                                                <h4 class="section_title_sub">{{ t.OwnerSupport.part_1.MainTitle }}</h4>
                                            </div>
                                            
                                            <ul class="card_grid owner_card_layout">
                                                <li v-for="(item, idx) in t.OwnerSupport.part_1.Features" :key="'owner-feat-'+idx" class="strategy_card">
                                                    <div class="card_head">
                                                        <span class="num">{{ item.num }}</span>
                                                        <strong>{{ item.tit }}</strong>
                                                    </div>
                                                    <p class="card_desc">{{ item.desc }}</p>
                                                </li>
                                            </ul>
                                            <p class="notice_text">{{ t.OwnerSupport.part_1.Notice }}</p>
                                        </section>

                                        <section class="support_item">
                                            <div class="div mb40">
                                                <h4 class="section_title_sub">{{ t.OwnerSupport.part_1.OtherTitle }}</h4>
                                            </div>
                                            
                                            <div class="program_grid">
                                                <article v-for="(other, idx) in t.OwnerSupport.part_1.OtherItems" :key="'owner-other-'+idx" class="program_item">
                                                    <figure class="program_visual">
                                                        <img :src="other.img" :alt="other.tit">
                                                    </figure>
                                                    <div class="text_area mt40">
                                                        <h4 class="text-wrapper-4">{{ other.tit }}</h4>
                                                        <p class="p" style="font-size:20px;">{{ other.desc }}</p>
                                                    </div>
                                                </article>
                                            </div>
                                        </section>
                                    </div>

                                    <!-- gsrsu03010103_1 -->
                                    <div v-if="SubTabIdx2 === 1 && t.OwnerSupport.part_2" class="fresh_owner_support">

                                        <p class="text_summary_sub" v-html="t.OwnerSupport.part_2.Summary"></p>

                                        <section class="support_item">
                                            <div class="div mb40">
                                                <h4 class="section_title_sub">{{ t.OwnerSupport.part_2.MainTitle }}</h4>
                                            </div>

                                            <div class="program_grid">
                                                <article 
                                                    v-for="(item, idx) in t.OwnerSupport.part_2.Items" 
                                                    :key="'fresh-owner-'+idx" 
                                                    class="program_item"
                                                >
                                                    <figure class="program_visual">
                                                        <img :src="item.img" :alt="item.tit">
                                                    </figure>
                                                    <div class="text_area mt40">
                                                        <h4 class="text-wrapper-4">{{ item.tit }}</h4>
                                                        <p class="p" style="font-size:20px;">{{ item.desc }}</p>
                                                    </div>
                                                </article>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>

                            <!-- gsrsu03010104 -->
                            <div v-if="SubTabIdx1 === 3 && t.community" class="community_policy">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.community.Summary"></h3>
                                </div>

                                <section class="support_item">
                                    <div class="div mb40">
                                        <h4 class="section_title_sub">{{ t.community.Purpose.Title }}</h4>
                                    </div>
                                    
                                    <ul class="card_grid owner_card_layout">
                                        <li v-for="(item, idx) in t.community.Purpose.Items" :key="'purp-'+idx" class="strategy_card">
                                            <div class="card_head">
                                                <span class="num">{{ item.num }}</span>
                                            </div>
                                            <p class="p" style="font-weight:700; font-size:20px;" v-html="item.desc"></p>
                                        </li>
                                    </ul>

                                    <div class="btn-wrap ac mt40">
                                        <Buttons btn-class="btn_icon_arrow btn_xl border after"
                                            @click="openModal" 
                                            data-popid="gsrsu0301010401" 
                                            data-type="lg" 
                                            data-cont="gsrsu0301010401">
                                            {{ t.community.Purpose.BtnText }}
                                        </Buttons>
                                    </div>
                                </section>

                                <section class="support_item">
                                    <div class="div mb40">
                                        <h4 class="section_title_sub">{{ t.community.Goal.Title }}</h4>
                                    </div>

                                    <ul class="card_grid owner_card_layout">
                                        <li v-for="(item, idx) in t.community.Goal.Items" :key="'goal-'+idx" class="strategy_card">
                                            <div class="card_head">
                                                <span class="num">{{ item.num }}</span>
                                            </div>
                                            <p class="p" style="font-weight:700; font-size:20px;" v-html="item.desc"></p>
                                        </li>
                                    </ul>

                                    <picture class="diagram_img_wrap">
                                        <source media="(max-width: 768px)" :srcset="t.community.Goal.DiagramImgMo" />
                                        <img :src="t.community.Goal.DiagramImg" :alt="t.community.Goal.alt">
                                    </picture>
                                </section>
                            </div>

                            <!-- gsrsu03010105 -->
                            <div v-if="SubTabIdx1 === 4 && t.supplychain" class="supplychain_policy">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.supplychain.Summary"></h3>
                                </div>

                                <section class="support_item">
                                    <div class="policy_box_wrap">
                                        <div class="div mb40">
                                            <h4 class="section_title_sub">{{ t.supplychain.Policy.Title }}</h4>
                                        </div>
                                        
                                        <ul class="policy_list">
                                            <li v-for="(item, idx) in t.supplychain.Policy.Items" :key="'pol-'+idx" class="policy_item">
                                                <span class="label">{{ item.label }}</span>
                                                <p class="desc">{{ item.desc }}</p>
                                            </li>
                                        </ul>

                                        <div class="btn-wrap ac mt60">
                                            <Buttons btn-class="btn_icon_arrow btn_xl border after"
                                                @click="openModal" 
                                                data-popid="gsrsu0301010501" 
                                                data-type="lg" 
                                                data-cont="gsrsu0301010501">
                                                {{ t.supplychain.Policy.BtnText }}
                                            </Buttons>
                                        </div>
                                    </div>
                                </section>

                                <section class="support_item">
                                    <div class="div mb40">
                                        <h4 class="section_title_sub">{{ t.supplychain.System.Title }}</h4>
                                    </div>

                                    <picture class="diagram_img_wrap system_bg">
                                        <source media="(max-width: 768px)" :srcset="t.supplychain.System.DiagramImgMo" />
                                        <img :src="t.supplychain.System.DiagramImg" :alt="t.supplychain.System.alt">
                                    </picture>
                                </section>
                            </div>
                        </div>
                    </article>

                    <article v-if="CTabIdx === 1">
                        <Tabs
                            :class="class_test" 
                            v-model="SubTabIdx1" 
                            :tab-items="t.Tabs2_2" 
                            tab-class="type_02" 
                            :tab-slide="true"
                        />
                        <div class="sub_tab_content">

                            <!-- gsrsu030201 -->
                            <div v-if="SubTabIdx1 === 0" class="csr_outline">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.CSR.outline.Summary"></h3>
                                </div>

                                <section class="support_item">
                                    <div class="view_box">
                                        <div class="strategy_header mb40">
                                            <h4 class="text_xl_bold">{{ t.CSR.outline.Strategy.Title }}</h4>
                                        </div>
                                        
                                        <div class="strategy_grid ">
                                            <div class="strategy_info">
                                                <span class="label_blue">{{ t.CSR.outline.Strategy.VisionLabel }}</span>
                                                <p class="text_l_bold">{{ t.CSR.outline.Strategy.Vision }}</p>
                                            </div>
                                            <div class="strategy_info">
                                                <span class="label_blue">{{ t.CSR.outline.Strategy.MissionLabel }}</span>
                                                <p class="text_l_bold">{{ t.CSR.outline.Strategy.Mission }}</p>
                                            </div>
                                        </div>

                                        <picture class="diagram_canvas ac">
                                            <source media="(max-width: 768px)" :srcset="t.CSR.outline.Strategy.DiagramImgMo" />
                                            <img :src="t.CSR.outline.Strategy.DiagramImg" :alt="t.CSR.outline.Strategy.alt" class="strategy_main_img">
                                        </picture>
                                    </div>
                                </section>

                                <section class="support_item">
                                    <div class="strategy_header mb40">
                                        <h4 class="text_xl_bold">{{ t.CSR.outline.HistoryTitle }}</h4>
                                    </div>
                                    
                                    <div class="timeline_wrapper">
                                        <div class="timeline_content_area">
                                            <div v-for="(history, hIdx) in t.CSR.outline.History" :key="'hist-'+hIdx" class="history_row">
                                                <div class="history_year">
                                                    <span>{{ history.year }}</span>
                                                </div>
                                                <ul class="history_details">
                                                    <li v-for="(item, iIdx) in history.items" :key="'item-'+iIdx" class="history_item">
                                                        {{ item }}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <!-- gsrsu030202 -->
                            <div v-if="SubTabIdx1 === 1 && t.CSR && t.CSR.vulnerable" class="vulnerable_support">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.CSR.vulnerable.Summary"></h3>
                                </div>

                                <section class="support_item">
                                    <div class="program_grid">
                                        <article v-for="(project, pIdx) in t.CSR.vulnerable.Projects" :key="'proj-'+pIdx" class="program_item">
                                            <figure class="program_visual">
                                                <img :src="project.img" :alt="project.tit">
                                            </figure>
                                            <div class="text_area mt40">
                                                <h4 class="text-wrapper-4">{{ project.tit }}</h4>
                                                <p class="p">{{ project.desc }}</p>
                                            </div>
                                        </article>
                                    </div>
                                </section>

                                <section class="support_item">
                                    <div class="div mb40">
                                        <h4 class="section_title_sub">{{ t.CSR.vulnerable.Partners.Title }}</h4>
                                    </div>
                                    <ul class="brand_grid">
                                        <li v-for="(partner, ptnIdx) in t.CSR.vulnerable.Partners.Items" :key="'ptn-'+ptnIdx">
                                            <figure class="brand_img_box">
                                                <img :src="partner.img" :alt="partner.name">
                                            </figure>
                                            <div class="brand_name mt16">
                                                <strong>{{ partner.name }}</strong>
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                            </div>

                            <!-- gsrsu030203 -->
                            <div v-if="SubTabIdx1 === 2 && t.CSR && t.CSR.communitysupport" class="community_support_area">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.CSR.communitysupport.Summary"></h3>
                                </div>

                                <section class="support_item">
                                    <div class="program_grid">
                                        <article v-for="(project, pIdx) in t.CSR.communitysupport.Projects" :key="'comm-proj-'+pIdx" class="program_item">
                                            <figure class="program_visual">
                                                <img :src="project.img" :alt="project.tit">
                                            </figure>
                                            <div class="text_area mt40">
                                                <h4 class="text-wrapper-4">{{ project.tit }}</h4>
                                                <p class="p">{{ project.desc }}</p>
                                            </div>
                                        </article>
                                    </div>
                                </section>

                                <section class="support_item">
                                    <div class="div mb40">
                                        <h4 class="section_title_sub">{{ t.CSR.communitysupport.Partners.Title }}</h4>
                                    </div>
                                    <ul class="brand_grid">
                                        <li v-for="(partner, ptnIdx) in t.CSR.communitysupport.Partners.Items" :key="'comm-ptn-'+ptnIdx" style="margin-bottom:40px;">
                                            <figure class="brand_img_box">
                                                <img :src="partner.img" :alt="partner.name">
                                            </figure>
                                            <div class="brand_name mt16">
                                                <strong>{{ partner.name }}</strong>
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                            </div>

                            <!-- gsrsu030204 -->
                            <div v-if="SubTabIdx1 === 3 && t.CSR.broadcasting" class="broadcasting_development">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.CSR.broadcasting.Summary"></h3>
                                </div>

                                <section class="support_item">
                                    <div class="program_grid">
                                        <article v-for="(project, pIdx) in t.CSR.broadcasting.Projects" :key="'broad-proj-'+pIdx" class="program_item">
                                            <figure class="program_visual">
                                                <img :src="project.img" :alt="project.tit">
                                            </figure>
                                            <div class="text_area mt40">
                                                <h4 class="text_xl_bold" style="font-size:32px;">{{ project.tit }}</h4>
                                                <p class="p">{{ project.desc }}</p>
                                            </div>
                                        </article>
                                    </div>
                                </section>

                                <section class="support_item">
                                    <div class="div mb40">
                                        <h4 class="section_title_sub">{{ t.CSR.broadcasting.Partners.Title }}</h4>
                                    </div>
                                    <ul class="brand_grid">
                                        <li v-for="(partner, ptnIdx) in t.CSR.broadcasting.Partners.Items" :key="'broad-ptn-'+ptnIdx">
                                            <figure class="brand_img_box">
                                                <img :src="partner.img" :alt="partner.name">
                                            </figure>
                                            <div class="brand_name mt16">
                                                <strong>{{ partner.name }}</strong>
                                            </div>
                                        </li>
                                    </ul>
                                </section>
                            </div>

                            <!-- gsrsu030205 -->
                            <div v-if="SubTabIdx1 === 4 && t.CSR.sharing" class="sharing_angel">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.CSR.sharing.Summary"></h3>
                                </div>

                                <div class="sharing_list_wrap">
                                    <div class="program_grid">
                                        <article v-for="(item, idx) in t.CSR.sharing.List" :key="'angel-'+idx" class="program_item sharing_card">
                                            <figure class="program_visual">
                                                <img :src="item.img" :alt="item.tit">
                                            </figure>
                                            <div class="text_area mt32">
                                                <h4 class="text_l_bold">{{ item.tit }}</h4>
                                                <p class="p mb24">{{ item.desc }}</p>
                                                <div class="card_footer">
                                                    <span class="badge_gray">{{ item.badge }}</span>
                                                    <span class="date_text">{{ item.date }}</span>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                    <Pagination v-model="page" :totalPages="32" :visiblePages="10" :showEllipsis="false" @change="handlePage" />
                                </div>
                            </div>
                        </div>
                    </article>

                    <article v-if="CTabIdx === 2">
                        <Tabs 
                            v-model="SubTabIdx1" 
                            :tab-items="t.Tabs2_3" 
                            tab-class="type_02" 
                            :tab-slide="true" 
                            @change="SubTabIdx2 = 0" 
                        />
                        <div class="sub_tab_content">
                            <!-- gsrsu030301 -->
                            <div v-if="SubTabIdx1 === 0 && t.protect.humanrights" class="human_rights_management">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.protect.humanrights.Summary"></h3>
                                </div>

                                <!-- 인권경영정책 -->
                                <section class="support_item">
                                    <div class="policy_box_wrap">
                                        <div class="div mb40">
                                            <h4 class="section_title_sub">{{ t.protect.humanrights.Policy.Title }}</h4>
                                        </div>
                                        <div class="GS-universal-wrapper">
                                            <p class="p" v-html="t.protect.humanrights.Policy.Desc"></p>
                                        </div>
                                        <div class="btn-wrap ac mt60">
                                            <Buttons btn-class="btn_icon_arrow btn_xl border after"
                                                @click="openModal" 
                                                data-popid="gsrsu03030101" 
                                                data-type="lg" 
                                                data-cont="gsrsu03030101">
                                                {{ t.protect.humanrights.Policy.BtnText }}
                                            </Buttons>
                                        </div>
                                    </div>
                                </section>

                                <!-- 임직원 인권 목표 -->
                                <section class="support_item">
                                    <div class="div mb40">
                                        <h4 class="section_title_sub">{{ t.protect.humanrights.Goals.Title }}</h4>
                                    </div>
                                    <ul class="card_grid owner_card_layout">
                                        <li v-for="(item, idx) in t.protect.humanrights.Goals.Items" :key="'goal-'+idx" class="strategy_card">
                                            <div class="card_head">
                                                <span class="num">{{ item.num }}</span>
                                            </div>
                                            <strong>{{ item.desc }}</strong>
                                        </li>
                                    </ul>
                                </section>

                                <!-- 인권침해 방지 프로그램 (태블릿 2열, 모바일 1열) -->
                                <section class="support_item">
                                    <div class="div mb40">
                                        <h4 class="section_title_sub">{{ t.protect.humanrights.Programs.Title }}</h4>
                                    </div>
                                    <div class="program_grid">
                                        <article v-for="(item, idx) in t.protect.humanrights.Programs.Items" :key="'prog-'+idx" class="program_item">
                                            <figure class="program_visual">
                                                <img :src="item.img" :alt="item.tit">
                                            </figure>
                                            <div class="text_area">
                                                <strong>{{ item.tit }}</strong>
                                            </div>
                                        </article>
                                    </div>
                                </section>

                                <!-- 인권영향평가 -->
                                <section class="support_item">
                                    <div class="policy_box_wrap">
                                        <div class="wide_info_box">
                                            <figure class="img_frame">
                                                <img :src="t.protect.humanrights.Assessment.img" :alt="t.protect.humanrights.Assessment.alt">
                                            </figure>
                                            <div class="text_area">
                                                <span>{{ t.protect.humanrights.Assessment.Title }}</span>
                                                <p class="p" v-html="t.protect.humanrights.Assessment.Desc"></p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div v-if="SubTabIdx1 === 1">
                                <Tabs 
                                    v-model="SubTabIdx2" 
                                    :tab-items="t.Tabs3_3" 
                                    tab-class="type_04 col_2" 
                                    class="mb40" 
                                    :tab-slide="true" 
                                />
                                <div class="inner_content">
                                    <!-- gsrsu03030201 -->
                                    <div v-if="SubTabIdx2 === 0" class="talent_vision">
                                        <div class="intro_summary">
                                            <h3 class="text_summary_sub al">{{ t.protect.talentmanagement.part_1.Summary }}</h3>
                                        </div>

                                        <!-- 상단 핵심 가치 비주얼 (서클 레이아웃) -->
                                        <section class="philosophy_box">
                                            <div>
                                                <h3 class="ac mb60" v-html="t.protect.talentmanagement.part_1.MainTitle"></h3>
                                                <div class="circle_visual_wrap">
                                                    <div class="circle_item value">
                                                        <strong>{{ t.protect.talentmanagement.part_1.Philosophy.Items[0].tit }}</strong>
                                                        <span>{{ t.protect.talentmanagement.part_1.Philosophy.Items[0].sub }}</span>
                                                    </div>
                                                    <div class="circle_item way">
                                                        <strong>{{ t.protect.talentmanagement.part_1.Philosophy.Items[1].tit }}</strong>
                                                        <span>{{ t.protect.talentmanagement.part_1.Philosophy.Items[1].sub }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- 상세 가치 리스트 (화이트 박스) -->
                                            <div class="value_detail_grid">
                                                <div class="detail_card">
                                                    <div class="card_title">GS Value</div>
                                                    <ul class="value_list">
                                                        <li v-for="(item, idx) in t.protect.talentmanagement.part_1.Details.Value" :key="'val-'+idx">
                                                            <strong class="eng">{{ item.tit }}</strong>
                                                            <p>{{ item.desc }}</p>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="detail_card">
                                                    <div class="card_title">GS Way</div>
                                                    <ul class="way_list">
                                                        <li v-for="(item, idx) in t.protect.talentmanagement.part_1.Details.Way" :key="'way-'+idx">
                                                            <strong>{{ item.tit }}</strong>
                                                            <div class="tags">
                                                                <span v-for="txt in item.list" :key="txt">{{ txt }}</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </section>


                                        <!-- 하단 꿈 실현 섹션 (이미지 + 텍스트) -->
                                        <section class="dream_realization">
                                            <div class="wide_info_box type_bg">
                                                <figure class="img_frame">
                                                    <img src="@/assets/images/dummy/gsrsu03030201_2.png" :alt="t.protect.talentmanagement.part_1.alt">
                                                </figure>
                                                <div class="text_area">
                                                    <h4 v-html="t.protect.talentmanagement.part_1.Description"></h4>
                                                    <ul class="bullet_01 no_type mt32">
                                                        <li v-for="(effort, idx) in t.protect.talentmanagement.part_1.Efforts" :key="'eff-'+idx" class="effort_item">
                                                            <span class="num">{{ idx + 1 }}.</span>
                                                            <span class="desc" v-html="effort"></span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <!-- gsrsu03030202: 인재육성체계 -->
                                    <div v-if="SubTabIdx2 === 1" class="talent_development">
                                        <div class="intro_summary">
                                            <p class="text_summary_sub al" v-html="t.protect.talentmanagement.part_2.Summary"></p>
                                        </div>

                                        <section class="support_item">
                                            <!-- 상단 다이어그램 -->
                                            <figure class="diagram_img_wrap ac">
                                                <img :src="t.protect.talentmanagement.part_2.DiagramImg" :alt="t.protect.talentmanagement.part_2.DiagramAlt">
                                            </figure>

                                            <!-- 인재육성 카드 그리드 -->
                                            <div class="div mb40">
                                                <h4 class="section_title_sub">{{ t.protect.talentmanagement.part_2.MainTitle }}</h4>
                                            </div>

                                            <div class="card_grid owner_card_layout">
                                                <article 
                                                    v-for="(card, idx) in t.protect.talentmanagement.part_2.Cards" 
                                                    :key="'talent-card-'+idx" 
                                                    class="strategy_card"
                                                >
                                                    <div class="card_head">
                                                        <span class="num">{{ card.num }}</span>
                                                        <strong>{{ card.tit }}</strong>
                                                        <p class="p_desc" v-html="card.desc"></p>
                                                    </div>
                                                    <ul class="bullet_01">
                                                        <li v-for="(li, lIdx) in card.list" :key="'li-'+lIdx">
                                                            {{ li }}
                                                        </li>
                                                    </ul>
                                                </article>
                                            </div>
                                        </section>
                                    </div>

                                    <!-- gsrsu03030203: 인재경영 지표 -->
                                    <div v-if="SubTabIdx2 === 2" class="talent_indicators">
                                        <div class="intro_summary">
                                            <p class="text_summary_sub al" v-html="t.protect.talentmanagement.part_3.Summary"></p>
                                        </div>

                                        <!-- 복리후생 섹션 (Work, Engagement, Life, Leisure) -->
                                        <section v-for="(section, sIdx) in t.protect.talentmanagement.part_3.Sections" :key="'sec-'+sIdx" class="icon_wrap support_section">
                                            <div class="section_head">
                                                <h4 class="section_title_sub">{{ section.title }}</h4>
                                                <p class="p" v-html="section.desc"></p>
                                            </div>
                                            
                                            <!-- 디자인에 맞춘 2열 리스트 구조 -->
                                            <div class="support_grid">
                                                <article v-for="(item, iIdx) in section.items" :key="'item-'+iIdx" class="support_item">
                                                    <div class="item_inner">
                                                        <div class="content_box">
                                                            <div class="tit_area">
                                                                <span class="num">{{ item.num }}</span>
                                                                <strong class="tit">{{ item.tit }}</strong>
                                                            </div>
                                                            <p class="desc">{{ item.desc }}</p>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        </section>

                                        <!-- 인재경영 관련 인증 및 대외 수상 이력 -->
                                        <section class="support_section award_section">
                                            <h4 class="section_title_sub mb40 al">{{ t.protect.talentmanagement.part_3.Awards.Title }}</h4>
                                            
                                            <!-- 상단 리스트 영역 -->
                                            <div class="award_list">
                                                <div v-for="(item, idx) in t.protect.talentmanagement.part_3.Awards.List" :key="'award-'+idx" class="award_row">
                                                    <span class="year">{{ item.year }}</span>
                                                    <span class="month">{{ item.month }}</span>
                                                    <span class="desc">{{ item.desc }}</span>
                                                </div>
                                            </div>

                                            <!-- 하단 강조 카드 영역 (요청하신 부분) -->
                                            <div>
                                                <ul class="brand_grid mt60">
                                                    <li>
                                                        <figure class="brand_img_box">
                                                            <img :src="t.protect.talentmanagement.part_3.Awards.Highlight.Img" :alt="t.protect.talentmanagement.part_3.Awards.Highlight.alt">
                                                        </figure>
                                                    </li>
                                                </ul>
                                                <div class="info_box">
                                                    <strong class="tit" v-html="t.protect.talentmanagement.part_3.Awards.Highlight.Tit"></strong>
                                                    <span class="date">{{ t.protect.talentmanagement.part_3.Awards.Highlight.Date }}</span>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                    <!-- gsrsu03030204 -->
                                    <div v-if="SubTabIdx2 === 3" class="talent_performance_data">
                                        <div class="intro_summary al">
                                            <p class="text_summary_sub">{{ t.protect.talentmanagement.part_4.Summary }}</p>
                                            <p class="GS" v-html="t.protect.talentmanagement.part_4.Desc"></p>
                                        </div>

                                        <div class="policy_wrap mt60">
                                            <table>
                                                <colgroup>
                                                    <col style="width: 100px;">
                                                    <col style="width: auto;">
                                                    <col style="width: 200px;">
                                                    <col style="width: 200px;">
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th v-for="th in t.protect.talentmanagement.part_4.Table.Thead" :key="th" class="ac">{{ th }}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(tr, idx) in t.protect.talentmanagement.part_4.Table.Tbody" :key="'perf-'+idx">
                                                        <td class="ac">{{ tr.num }}</td>
                                                        <td class="al">{{ tr.tit }}</td>
                                                        <td class="ac">
                                                            <!-- item.link를 tr.link로 수정 -->
                                                            <button type="button" class="btn_download_file" @click="handleDownload(tr.link)">
                                                                <span class="file_type_text">{{ t.protect.talentmanagement.part_4.txt }}</span>
                                                            </button>
                                                        </td>
                                                        <td class="ac">{{ tr.date }}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!-- 페이지네이션 (기본 Pagination 컴포넌트 활용) -->
                                        <Pagination v-model="page" :totalPages="5" :visiblePages="5" @change="handlePage" />
                                    </div>
                                </div>
                            </div>

                            <!-- gsrsu030303: 고객만족경영 -->
                            <div v-if="SubTabIdx1 === 2 && t.protect.customer" class="customer_satisfaction">
                                <!-- 상단 요약 -->
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.protect.customer.Summary"></h3>
                                </div>

                                <!-- 소비자 권익보호 정책 -->
                                <section class="support_item">
                                    <div class="policy_box_wrap">
                                        <div class="title_area mb40">
                                            <h4 class="section_title_sub">{{ t.protect.customer.Policy.Title }}</h4>
                                        </div>
                                        <div class="GS-universal-wrapper">
                                            <p class="p" v-html="t.protect.customer.Policy.Desc"></p>
                                        </div>
                                        <div class="policy_list_container mt40">
                                            <ul class="policy_list">
                                                <li v-for="(item, idx) in t.protect.customer.Policy.Items" :key="'policy-'+idx" class="policy_item">
                                                    <span class="label">{{ item.label }}</span>
                                                    <p class="desc">{{ item.text }}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="btn-wrap ac mt60">
                                            <Buttons btn-class="btn_icon_arrow btn_xl border after" 
                                                @click="openModal" 
                                                data-popid="gsrsu03030301" 
                                                data-type="lg" 
                                                data-cont="gsrsu03030301">
                                                {{ t.protect.customer.Policy.BtnText }}
                                            </Buttons>
                                        </div>
                                    </div>
                                </section>

                                <!-- 고객만족경영 주요 활동 -->
                                <section class="support_item">
                                    <div class="title_area mb40">
                                        <h4 class="section_title_sub">{{ t.protect.customer.Activities.Title }}</h4>
                                    </div>
                                    <div class="program_grid">
                                        <article v-for="(item, idx) in t.protect.customer.Activities.Items" :key="'activity-'+idx" class="program_item">
                                            <!-- 활동 사진은 img 태그 유지 -->
                                            <figure class="program_visual">
                                                <img :src="item.img" :alt="item.tit">
                                            </figure>
                                            <div class="text_area">
                                                <h4 class="text-wrapper-4">{{ item.tit }}</h4>
                                                <div class="card_desc">
                                                    <p class="sub_tit">{{ item.subTit }}</p>
                                                    <p class="p">{{ item.desc }}</p>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </section>

                                <!-- 서비스 우수 직원 추천 -->
                                <section class="support_item">
                                    <div class="recommend_banner_wrap">
                                        <div class="title_area mb40">
                                            <h4 class="section_title_sub">{{ t.protect.customer.Recommend.Title }}</h4>
                                        </div>
                                        <div class="recommend_box">
                                            <div class="text_area">
                                                <strong class="point_tit">{{ t.protect.customer.Recommend.PointTit }}</strong>
                                                <p class="desc" v-html="t.protect.customer.Recommend.Desc"></p>
                                            </div>
                                            <!-- '서비스 우수 직원 추천하기' 버튼 -->
                                            <a class="btn_icon_arrow btn_xl border after" :href="t.protect.customer.Recommend.link" target="_blank">
                                                {{ t.protect.customer.Recommend.BtnText }}
                                            </a>
                                        </div>
                                    </div>
                                </section>

                                <!-- 제품과 서비스 안전 제도 -->
                                <section class="support_item">
                                    <div class="title_area mb40">
                                        <h4 class="section_title_sub" v-html=" t.protect.customer.Safety.Title"></h4>
                                    </div>
                                    <ul class="safety_system_list">
                                        <li v-for="(item, idx) in t.protect.customer.Safety.Items" :key="'safety-'+idx">
                                            <!-- 아이콘 영역만 ::before 사용 (태그 내부 비움) -->
                                            <span class="num">{{ item.step }}</span>
                                            <div class="tit_wrap">
                                                <strong class="tit">
                                                    {{ item.tit }}
                                                    <button class="icon_link_before" 
                                                        @click="openModal" 
                                                        :data-popid="item.popContId" 
                                                        data-type="lg" 
                                                        :data-cont="item.popContId">
                                                    </button>
                                                </strong>
                                                <!-- 링크 아이콘 영역 ::before 사용 -->
                                            </div>
                                            <p class="desc">{{ item.desc }}</p>
                                        </li>
                                    </ul>
                                </section>

                                <!-- 피해 보상 프로그램 -->
                                <section class="support_item">
                                    <div class="title_area mb40">
                                        <h4 class="section_title_sub" v-html="t.protect.customer.Compensation.Title"></h4>
                                    </div>
                                    <div class="compensation_process_wrap">
                                        <div class="process_steps">
                                            <div v-for="(step, idx) in t.protect.customer.Compensation.Steps" :key="'step-'+idx" class="step_box">
                                                <div class="step_info">
                                                    <span class="label">{{ step.label }}</span>
                                                    <p class="desc" v-html="step.desc"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="btn-wrap ac mt40">
                                            <Buttons btn-class="btn_icon_arrow btn_xl primary after">
                                                {{ t.protect.customer.Compensation.BtnText }}
                                            </Buttons>
                                        </div>
                                    </div>
                                </section>

                                <!-- 수상 이력 및 인증 -->
                                <section class="support_item">
                                    <div class="title_area mb40">
                                        <h4 class="section_title_sub" v-html="t.protect.customer.Awards.Title"></h4>
                                    </div>
                                    
                                    <!-- 상단 리스트 영역 -->
                                    <div class="award_list mb80">
                                        <div v-for="(item, idx) in t.protect.customer.Awards.History" :key="'award-'+idx" class="award_row">
                                            <span class="year">{{ item.year }}</span>
                                            <span class="month">{{ item.month }}</span>
                                            <span class="desc">{{ item.desc }}</span>
                                        </div>
                                    </div>

                                    <section class="award_section">
                                        <div v-for="(mark, idx) in t.protect.customer.Awards.Marks" :key="'mark-' + idx" class="mark_item_group">
                                            <ul class="brand_grid mt60">
                                                <li>
                                                    <figure class="brand_img_box">
                                                        <!-- 각 마크의 이미지 바인딩 -->
                                                        <img :src="mark.img" :alt="mark.tit">
                                                    </figure>
                                                </li>
                                            </ul>
                                            <div class="info_box">
                                                <!-- 제목 및 날짜 바인딩 -->
                                                <strong class="tit" v-html="mark.tit"></strong>
                                                <span class="date">{{ mark.date }}</span>
                                            </div>
                                        </div>
                                    </section>
                                </section>
                            </div>

                            <!-- gsrsu030304 -->
                            <section v-if="SubTabIdx1 === 3 && t.protect.safetymanagement" class="safety_management_wrap">
                                <Tabs 
                                    v-model="SubTabIdx2" 
                                    :tab-items="t.Tabs3_4" 
                                    tab-class="type_04 col_2" 
                                    class="mb80" 
                                    :tab-slide="true" 
                                />
                                <!-- 1. 안전·보건 경영방침 -->
                                <div v-if="SubTabIdx2 === 0" class="">
                                    <div class="intro_summary">
                                        <h3 class="text_summary" v-html="t.protect.safetymanagement.Summary"></h3>
                                    </div>

                                    <div class="contents">
                                        <section class="protection_section">
                                            <div class="policy_card_box">
                                                <div class="section_title_area mb40">
                                                    <h4 class="section_title_sub">{{ t.protect.safetymanagement.Policy.Title }}</h4>
                                                </div>
                                                <ul class="policy_list_wrap">
                                                    <li v-for="(item, idx) in t.protect.safetymanagement.Policy.Items" :key="'policy-'+idx" class="policy_item">
                                                        <strong class="item_label">{{ item.label }}</strong>
                                                        <p class="item_text">{{ item.text }}</p>
                                                    </li>
                                                </ul>
                                                <div class="btn-wrap ac mt40">
                                                    <button type="button" class="btn_icon_arrow btn_xl border after" 
                                                        @click="openModal" 
                                                        data-popid="gsrsu03030401" 
                                                        data-type="lg" 
                                                        data-cont="gsrsu03030401">
                                                        {{ t.protect.safetymanagement.Policy.BtnText }}
                                                    </button>
                                                </div>
                                            </div>
                                        </section>

                                        <!-- 2. 안전보건 거버넌스 -->
                                        <section class="protection_section">
                                            <div class="section_title_area mb40">
                                                <h4 class="section_title_sub">{{ t.protect.safetymanagement.Governance.Title }}</h4>
                                                <p class="p_desc" v-html="t.protect.safetymanagement.Governance.Desc"></p>
                                            </div>
                                            <figure class="diagram_box_wrap">
                                                <div class="visual_area mb20">
                                                    <img :src="isMobile ? t.protect.safetymanagement.Governance.imgMo1 : t.protect.safetymanagement.Governance.img1" :alt="t.protect.safetymanagement.Governance.alt">
                                                    <p class="notice_text">{{ t.protect.safetymanagement.Governance.Notice }}</p>
                                                </div>
                                            </figure>
                                        </section>

                                        <!-- 3. 안전보건 교육 및 관리 체계 -->
                                        <section class="protection_section">
                                            <div class="section_title_area mb40">
                                                <h4 class="section_title_sub">{{ t.protect.safetymanagement.Safety.Title }}</h4>
                                                <p class="p_desc" v-html="t.protect.safetymanagement.Safety.Desc"></p>
                                            </div>
                                            <ul class="safety_system_grid">
                                                <li v-for="(item, idx) in t.protect.safetymanagement.Safety.Systems" :key="'system-'+idx" class="system_item">
                                                    <div class="text_box">
                                                        <span class="num">{{ item.num }}</span>
                                                        <strong class="tit">{{ item.tit }}</strong>
                                                        <span v-if="item.sub" class="sub">{{ item.sub }}</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </section>
                                    </div>
                                </div>

                                <!-- 4. 안전·보건 의견 청취함 (문의 폼) -->
                                <div v-if="SubTabIdx2 === 1" class="">

                                    <div class="contents">
                                        <section class="listening_form_area">
                                            <div class="section_title_area mb40">
                                                <h4 class="section_title_sub">{{ t.protect.safetymanagement.listening.Title }}</h4>
                                                <p class="p_desc" v-html="t.protect.safetymanagement.listening.Desc"></p>
                                                <ul class="bullet_01">
                                                    <li v-for="(list, lIdx) in t.protect.safetymanagement.listening.items" :key="'list-'+lIdx">{{ list }}</li>
                                                </ul>
                                            </div>
                                            
                                            <!-- 개인정보 동의 영역 (반복) -->
                                            <div class="consent_container mb40">
                                                <article v-for="(consent, cIdx) in t.protect.safetymanagement.listening.Consents" :key="'consent-'+cIdx" class="consent_box">
                                                    <strong class="consent_tit">{{ consent.title }}</strong>
                                                    <ul class="consent_list">
                                                        <li v-for="(list, lIdx) in consent.items" :key="'list-'+lIdx">{{ list }}</li>
                                                    </ul>
                                                    <div class="consent_agree">
                                                        <p class="guide_text" v-html="consent.guide"></p>
                                                        <Inputs type="checkbox" :text="consent.ConsentText" />
                                                    </div>
                                                </article>
                                            </div>

                                            <article class="noti_non_member">
                                                <span>{{ t.protect.safetymanagement.listening.Nonmember.title }}</span>
                                                <ul class="bullet_01">
                                                    <li v-for="(list, lIdx) in t.protect.safetymanagement.listening.Nonmember.items" :key="'list-'+lIdx">{{ list }}</li>
                                                </ul>
                                            </article>

                                            <!-- 문의 폼 입력 영역 (필수 요소만 유지) -->
                                            <div class="form_container">
                                                <article class="listening_form_wrap">
                                                    <div class="form_section">
                                                        <div class="form_header">
                                                            <h5 class="form_title">{{ lp.part1.title }}</h5>
                                                            <span class="required_guide">{{ lp.part1.requiredText }}</span>
                                                        </div>
                                                        <div class="form_body">
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part1.nameLabel }}</span>
                                                                    <span class="required_mark">*</span>
                                                                </div>
                                                                <div class="input_item">
                                                                    <Inputs type="text" v-model="formData.name" :placeholder="lp.part1.namePlaceholder" />
                                                                </div>
                                                            </div>
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part1.emailLabel }}</span>
                                                                    <span class="required_mark">*</span>
                                                                </div>
                                                                <div class="input_group email">
                                                                    <div class="group_wrap">
                                                                        <div class="input_flex_item"><Inputs type="text" v-model="formData.emailId" placeholder="" /></div>
                                                                        <span class="unit">@</span>
                                                                        <div class="input_flex_item"><Inputs type="text" v-model="formData.emailDomain" placeholder="" /></div>
                                                                    </div>
                                                                    <SelectBox :options="lp.part1.emailOptions" v-model="formData.emailSelect" :initMsg="t.phDirectInput" />
                                                                </div>
                                                            </div>
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part1.telLabel }}</span>
                                                                    <span class="required_mark">*</span>
                                                                </div>
                                                                <div class="input_group">
                                                                    <div class="input_flex_item"><Inputs type="text" v-model="formData.tel1" is-disabled="true" /></div>
                                                                    <span class="unit">-</span>
                                                                    <div class="input_flex_item"><Inputs type="text" v-model="formData.tel2" /></div>
                                                                    <span class="unit">-</span>
                                                                    <div class="input_flex_item"><Inputs type="text" v-model="formData.tel3" /></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form_section">
                                                        <div class="form_header">
                                                            <h5 class="form_title">{{ lp.part2.title }}</h5>
                                                            <span class="required_guide">{{ lp.part1.requiredText }}</span>
                                                        </div>
                                                        <div class="form_body">
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part2.categoryLabel }}</span>
                                                                    <span class="required_mark">*</span>
                                                                </div>
                                                                <div class="input_item full">
                                                                    <SelectBox :options="lp.part2.categoryOptions" v-model="formData.category" :initMsg="t.phSelectWorkplace" class="w428" />
                                                                </div>
                                                            </div>
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part2.storeLabel }}</span>
                                                                </div>
                                                                <div class="input_complex">
                                                                    <Inputs type="text" v-model="formData.storeName" placeholder="" class="w428"/>
                                                                    <p class="guide_msg">{{ lp.part2.storeGuide }}</p>
                                                                </div>
                                                            </div>
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part2.subjectLabel }}</span>
                                                                    <span class="required_mark">*</span>
                                                                </div>
                                                                <div class="input_item full">
                                                                    <Inputs type="text" v-model="formData.subject" placeholder="" class="w428"/>
                                                                </div>
                                                            </div>
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part2.contentLabel }}</span>
                                                                    <span class="required_mark">*</span>
                                                                </div>
                                                                <div class="input_complex">
                                                                    <Textarea
                                                                        v-model="formData.body"
                                                                        :placeholder="lp.part2.contentPlaceholder"
                                                                        :rows="6"
                                                                        :maxlength="500"
                                                                    />
                                                                    <p class="guide_msg_multi" v-html="lp.part2.noticeText"></p>
                                                                </div>
                                                            </div>
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part2.fileLabel }}</span>
                                                                </div>
                                                                <div class="input_complex">
                                                                    <FileUpload :lang="lang" :multiple="true" accept="*" @update:files="onFiles" />
                                                                    <p class="guide_msg">{{ lp.part2.fileNotice }}</p>
                                                                </div>
                                                            </div>
                                                            <div class="form_row">
                                                                <div class="label_item">
                                                                    <span class="label_text">{{ lp.part2.replyLabel }}</span>
                                                                </div>
                                                                <div class="input_item full">
                                                                    <SelectBox :options="lp.part2.replyOptions" v-model="formData.replyType" :initMsg="t.phSelectReply" class="w428"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                                <div class="btn-wrap">
                                                    <Buttons btn-class="btn_big primary">{{ lp.part2.btnSubmit }}</Buttons>
                                                    <Buttons btn-class="btn_big gray">{{ lp.part2.btnCancel }}</Buttons>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </section>

                            <!-- gsrsu030305 -->
                            <section v-if="SubTabIdx1 === 4 && t.protect.informationprotection" class="information_protection_management">
                                <div class="intro_summary">
                                    <h3 class="text_summary" v-html="t.protect.informationprotection.Summary"></h3>
                                </div>

                                <div class="contents">
                                    <section class="protection_section ">
                                        <div class="section_title_area mb40">
                                            <h4 class="section_title_sub">{{ t.protect.informationprotection.Governance.Title }}</h4>
                                            <p class="p_desc" v-html="t.protect.informationprotection.Governance.Desc"></p>
                                        </div>
                                        
                                        <figure class="diagram_box_wrap">
                                            <div class="visual_area">
                                                <img 
                                                    :src="isMobile ? t.protect.informationprotection.Governance.imgMo : t.protect.informationprotection.Governance.img" 
                                                    :alt="t.protect.informationprotection.Governance.Title"
                                                >
                                            </div>
                                        </figure>

                                        <div class="committee_detail_area mt80">
                                            <p class="p_desc mb40" v-html="t.protect.informationprotection.Committee.Desc"></p>
                                            <figure class="diagram_box_wrap scroll">
                                                <div class="visual_area scroll_wrap">
                                                    <img 
                                                        :src="isMobile ? t.protect.informationprotection.Committee.imgMo : t.protect.informationprotection.Committee.img" 
                                                        :alt="t.protect.informationprotection.Committee.Notice"
                                                    >
                                                </div>
                                                <figcaption>{{ t.protect.informationprotection.Committee.Notice }}</figcaption>
                                            </figure>
                                        </div>
                                    </section>

                                    <section class="protection_section">
                                        <div class="section_title_area mb40">
                                            <h4 class="section_title_sub">{{ t.protect.informationprotection.Policy.Title }}</h4>
                                            <p class="p_desc" v-html="t.protect.informationprotection.Policy.Desc"></p>
                                        </div>
                                        <figure class="diagram_box_wrap">
                                            <div class="visual_area">
                                                <img 
                                                    :src="isMobile ? t.protect.informationprotection.Policy.imgMo : t.protect.informationprotection.Policy.img" 
                                                    :alt="t.protect.informationprotection.Policy.Title"
                                                >

                                            </div>
                                        </figure>
                                    </section>

                                    <section class="protection_section">
                                        <div class="section_title_area mb40">
                                            <h4 class="section_title_sub">{{ t.protect.informationprotection.Activities.Title }}</h4>
                                            <p class="p_desc">{{ t.protect.informationprotection.Activities.Desc }}</p>
                                        </div>
                                        
                                        <div class="policy_wrap">
                                            <table>
                                                <caption class="blind">{{ t.capProtectList }}</caption>
                                                <colgroup>
                                                    <col style="width: 350px;">
                                                    <col style="width: auto;">
                                                </colgroup>
                                                <tbody>
                                                    <tr v-for="(item, idx) in t.protect.informationprotection.Activities.Table" :key="'activity-'+idx">
                                                        <th scope="row" class="al"><strong>{{ item.tit }}</strong></th>
                                                        <td class="al" v-html="item.desc"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div class="btn-wrap ac mt40">
                                            <a class="btn_icon_arrow btn_xl border after" :href="t.protect.informationprotection.Activities.link" target="_blank">
                                                {{ t.protect.informationprotection.Activities.BtnText }}
                                            </a>
                                        </div>
                                    </section>
                                    <section class="award_section">
                                        <div class="mark_item_group">
                                            <ul class="brand_grid mt60">
                                                <li>
                                                    <figure class="brand_img_box">
                                                        <!-- 각 마크의 이미지 바인딩 -->
                                                        <img :src="t.protect.informationprotection.Certification.Img" :alt="t.aIsmsp">
                                                    </figure>
                                                </li>
                                            </ul>
                                            <div class="info_box">
                                                <!-- 제목 및 날짜 바인딩 -->
                                                <strong class="tit">
                                                    <span v-html="t.protect.informationprotection.Certification.Title"></span>
                                                    (2025.06.18 ~ 2028.06.17)
                                                </strong>
                                                <em v-html="t.protect.informationprotection.Certification.Desc"></em>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <div id="gsrsu0301010401" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu0301010501" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu03030101" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu03030301" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu03030302" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu03030303" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu03030304" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

        <div id="gsrsu03030401" class="modal_wrap">
            <div class="modal_container"></div>
        </div>

    </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import Buttons from "@/components/Buttons.vue";
import Pagination from "@/components/Pagination.vue";
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue"; 
import Textarea from "@/components/Textarea.vue";
import modal from "@/assets/js/modal";
import FileUpload from "@/components/FileUpload.vue";

export default {
    name: "gsrsu03010101",
    components: { Tabs, Buttons, Pagination, Inputs, SelectBox, Textarea, FileUpload },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            formData: {
                name: "",
                emailId: "",
                emailDomain: "",
                emailSelect: "",
                tel1: "010",
                tel2: "",
                tel3: "",
                category: "",
                storeName: "",
                subject: "",
                body: "",
                replyType: ""
            },
            isMobile: false, // 모바일 여부 체크 변수
            page: 2,
            CTabIdx: 0,      // 1depth
            SubTabIdx1: 0,   // 2depth
            SubTabIdx2: 0,   // 3depth
            selected: "", //초기 선택값 지정할땐 vaule 값 입력
            langData: {
                ko: {
                    MainTitle: "사회적 책임",
                    MainsubTitle: "Social responsibility",
                    aChannelVisual: "파트너사 소통 채널 비주얼",
                    phDirectInput: "직접입력",
                    phSelectWorkplace: "사업장 선택",
                    phSelectReply: "회신방법 선택",
                    capProtectList: "정보보호 활동 상세 리스트",
                    aIsmsp: "ISMS-P 인증",
                    alertNoFile: "연결된 파일이 없습니다.",
                    // 1depth
                    Tabs1: [
                        { item: "상생경영" }, 
                        { item: "나눔경영" }, 
                        { item: "권익보호" }
                    ],
                    
                    // 2depth (상생경영 하위)
                    Tabs2_1: [
                        { item: "동반성장" }, /* 26.06.29 edit 이소라 */
                        { item: "파트너사 지원제도" }, 
                        { item: "경영주 지원제도" }, 
                        { item: "지역사회 참여정책" },
                        { item: "공급망 지속가능성 관리정책" }
                    ],
                    // 3depth (파트너사 지원제도 하위)
                    Tabs3_1: [
                        { item: "금융지원" }, 
                        { item: "판로지원" }, 
                        { item: "경쟁력 강화 지원" }, 
                        { item: "복리후생 제도" }, 
                        { item: "방송 편성" }, 
                        { item: "소통제도" }
                    ],
                    // 3depth (경영주 지원제도 하위 - 신규 추가)
                    Tabs3_2: [
                        { item: "GS25 경영주 지원제도" }, 
                        { item: "GS THE FRESH 경영주 지원제도" }
                    ],

                    // 2depth (나눔경영 하위)
                    Tabs2_2: [
                        { item: "개요" }, 
                        { item: "아동/사회 취약계층지원" }, 
                        { item: "지역사회 지원" }, 
                        { item: "방송발전" }, 
                        { item: "숨은나눔천사" }
                    ],

                    // 2depth (권익보호 하위)
                    Tabs2_3: [
                        { item: "인권경영" }, 
                        { item: "인재경영" }, 
                        { item: "고객만족경영" }, 
                        { item: "안전경영" },
                        { item: "정보보호" }
                    ],
                    // 3depth (인재경영 하위)
                    Tabs3_3: [
                        { item: "인재상" }, 
                        { item: "인재육성체계" }, 
                        { item: "인재경영 지표" }, 
                        { item: "인재경영 실적자료" }
                    ],
                    // 3depth (안전경영 하위)
                    Tabs3_4: [
                        { item: "안전경영 소개" }, 
                        { item: "안전보건 의견 청취함" }, 
                    ],
                    WinWinIntro: {
                        Summary: "GS리테일의 동반성장 철학과 추진전략을 확인하실 수 있습니다.",
                        Philosophy: {
                            Title: "동반성장철학",
                            Btn: "동반성장 활동보기",
                            Items: [
                                { tit: "Win-Win", desc: "어느 일방의 희생이 아닌 상생 협력체계 구축" },
                                { tit: "신뢰", desc: "끊임 없는 소통과 경청을 통한 신뢰를 기반"},
                                { tit: "미래지향", desc: "일회성, 단기적 성과보다 지속 가능한 성장 추구"}
                            ]
                        },
                        Strategy: {
                            Title: "추진전략",
                            Cards: [/* 2026.07.06 edit 이소라 */
                                { num: "01", tit: "공정한 거래 문화 정착", list: ["공정거래 법규 준수", "불공정거래 사전 예방 시스템", "공정한 거래 기회 제공"] },
                                { num: "02", tit: "실질적 경영지원", list: ["금융지원 / 대금조기 지급", "업무 역량 지원", "기타/복리후생 지원"] },
                                { num: "03", tit: "지속적 성장 추구", list: ["공동 상품 개발 확대", "브랜드마케팅 지원", "성과공유제 도입/운용"] },
                                { num: "04", tit: "열린소통", list: ["정기적 간담회 운영", "문화 교류 (Family-Day)", "파트너사 만족도 개선"] }
                            ],
                            img: require("@/assets/images/dummy/gsrsu03010101_1.png"),
                            imgMo: require("@/assets/images/sub/gsrsu/gsrsu03010101_1_mo.png"),
                            alt: "동반성장 추진전략 다이어그램"
                        },
                        Index: {
                            Title: "동반성장지수",
                            SubTitle: "동반성장부문 2023 최우수",
                            alt: "동반성장지수 최우수 등급",
                        }
                    },
                    Partnersupport : {
                        Summary :"GS리테일은 상생경영을 통해 파트너사와 공동의 발전을 도모하고 있습니다. <br/> 이를 실현하기 위해 아래와 같은 제도를 운영하고 있습니다.",
                        FinanceSupport: {
                            Summary: "파트너사의 지속성장 기반 강화를 위한<br/> 다양한 자금 지원 프로그램을 운영하고 있습니다.",
                            Fund: {
                                Title: "상생펀드",
                                Desc: "파트너사가 경영/운영상의 긴급 자금이 필요할 때 상생펀드를 활용해 저리의 자금을 대출 받을 수 있는 제도입니다.",
                                ProcessTitle: "신청절차",
                                Steps: [
                                    { tit: "추천의뢰 (파트너사→MD)" },
                                    { tit: "추천서 작성 (MD)" },
                                    { tit: "지원신청 (GS리테일→은행)" },
                                    { tit: "대출지원 (은행심사 후 대출실행)"}
                                ]
                            },
                            SubFunds: [
                                { 
                                    tit: "상생파트너론", 
                                    img: require("@/assets/images/dummy/gsrsu0301010201_2.png"),
                                    desc: "파트너사에 상환청구권이 없는 외상매출채권 담보대출로 협력기업의 상환부담을 경감할 수 있는 제도 입니다.",
                                    desc2: "GS리테일의 1,2,3차 협력기관<br>연 0.60%+가산금리" 
                                },
                                { 
                                    tit: "친환경농수산펀드/ 농식품창업 아이디어 펀드", 
                                    img: require("@/assets/images/dummy/gsrsu0301010201_3.png"),
                                    desc: "전남창조경제혁신센터와 친환경 농수산 융자지원 업무협약을 체결 후, 전남소재 창업 및 중소기업에 대한 금융지원을 통해 농·수산 식품 산업을 육성하는 제도 입니다." 
                                }
                            ],
                            Cards: [
                                { tit: "네트워크론 /패밀리론", desc: "기업은행과 협약을 맺고 파트너사와의 거래내역, 보증, 담보 등의 제공 또는 추천을 통해 저리 대출 제공" },
                                { tit: "선급금 지급", desc: "FF 생산공장의 재료 수급과 공급의 안정성 및 설비 관리를 위한 단기자금 조달 등 지원을 위해 파트너사에 선급금 지원" },
                                { tit: "명절 조기 지급 /100% 현금결제", desc: "파트너사 및 경영주의 원활한 자금 유동성 확보를 위해 년 2회 명절에 물품대금 및 정산금을 조기지급" },
                                { tit: "수수료 환급제도", desc: "GS SHOP은 분기별 목표 대비 실적이 기준에 미치지 못한 협력사를 대상으로 수취 수수료의 일부를 환급하는 제도를 운영" }
                            ]
                        }
                    },
                    MarketSupport: {
                        Marketing: {
                            Summary: "파트너사의 국내·외 판로 개척을 위한<br/>다양한 지원 프로그램을 운영하고 있습니다.",
                            Title: "마케팅 지원",
                            Desc: "인기 맛집, TV프로그램, 유명연예인 등 고객들에게 소구력이 높은 브랜드를 GS리테일이 자체적으로 유치하고, 해당 브랜드를 파트너사가 공급하는 상품의 브랜드 경쟁력을 높일 수 있도록 무상 사용을 지원하는 제도입니다.",
                            Brands: [
                                { name: "김혜자 도시락", img: require("@/assets/images/dummy/gsrsu0301010202_1.png") },
                                { name: "오모리", img: require("@/assets/images/dummy/gsrsu0301010202_2.png") },
                                { name: "유어스", img: require("@/assets/images/dummy/gsrsu0301010202_3.png") },
                                { name: "리얼프라이스", img: require("@/assets/images/dummy/gsrsu0301010202_4.png") }
                            ]
                        },
                        Programs: [
                            { 
                                tit: "해외수출지원", 
                                img: require("@/assets/images/dummy/gsrsu0301010202_2_1.png"),
                                desc: "GS리테일의 글로벌 인프라와 노하우를 통해 파트너사의 해외 수출을 지원하고 있습니다. <br/>GS리테일의 PB 상품을 비롯하여 편의점 시설·집기류 까지 수출하여 2020년 무역의 날 ‘300만불 수출의 탑’을 수상하기도 했습니다." 
                            },
                            { 
                                tit: "지자체 MOU", 
                                img: require("@/assets/images/dummy/gsrsu0301010202_2_2.png"),
                                desc: "지역 농가 및 어민, 중소 파트너사와의 상생을 위해 충남, 전남(13개 시·군), 밀양시 등 다양한 지자체와 업무협약을 체결해 지역 농축수산물 구매 약정 및 판로를 제공 합니다." 
                            },
                            { 
                                tit: "지정농장/지역농산물 기획전", 
                                img: require("@/assets/images/dummy/gsrsu0301010202_2_3.png"),
                                desc: "지정농장 운영을 통해 농장은 유통망이 갖춰진 GS리테일이라는 안정적인 판로를 공급받고, 상품의 작목·사육 등에만 집중할 수 있으며 GS리테일은 보다 경쟁력 있는 상품을 고객에게 제공하게 됩니다.<br/><br/>지정농장의 투자비 부담 축소를 위한 상생대출 지원, 위생교육 등을 지원하며, 지역 농가 활성화를 위해 지역특산물 판매·기획전을 정기개최 합니다." 
                            },
                            { 
                                tit: "수수료 인하 방송 (TV홈쇼핑 및 DATA홈쇼핑)", 
                                img: require("@/assets/images/dummy/gsrsu0301010202_2_4.png"),
                                desc: "GS SHOP은 신규 아이템 파일럿 테스트 및 기존 방송상품 재고 소진을 ‘I love 중소기업’ 프로그램을 통해 지원합니다. 또한, 모바일/인터넷 판매 협력사 등 신규 소상공인, 영세 기업의 홈쇼핑 시장 진입 기회를 ‘꿈꾸는 가게’ 프로그램을 통해 제공합니다." 
                            }
                        ]
                    },
                    CompetencySupport: {
                        Summary: "파트너사의 경쟁력 강화를 위한 <br/>전문 교육 및 정기세미나 등의 프로그램을 운영하고 있습니다.",
                        Education: {
                            Title: "교육지원",
                            Desc: "외부교육기관 및 GS리테일의 전문부서 등이 파트너사 임직원의 직무역량 향상을 위해 각종 교육 프로그램을 정기적으로 지원하는 제도입니다.",
                            Table: {
                                Thead: ["프로그램명", "시기", "주요내용"],
                                Tbody: [
                                    { name: "안전/위생 교육", period: "반기 1회", desc: "식품 협력사의 품질관리 능력 향상을 위해 식품위생법, 원산지 관리법 등의 교육을 지원합니다." },
                                    { name: "HACCP 아카데미", period: "년 1회", desc: "중소 PB파트너사 대상으로 HACCP 운영 역량 향상을 위해 관련 위생관리 및 법규 교육을 지원함으로써 상생과 안전한 상품 공급을 위한 지원 제도" },
                                    { name: "파트너사 품질/위생 점검", period: "년 1회", desc: "당사에 상품을 납품하는 파트너사 대상으로 사전 위생 심사를 통해 미흡사항에 대한 개선 및 코칭과 컨설팅을 진행합니다." },
                                    { name: "선도·위생관리 코칭 및 지원", period: "상시", desc: "당사에 상품을 납품하는 파트너사 대상으로 사전 위생 심사를 통해 미흡사항에 대한 개선 및 코칭과 컨설팅을 진행하고 있으며, 입점 이후에도 지속 방문하여 선도·위생관리에 대한 사후 지원활동을 수행 '20년 선도 관련 262개 업체, 위생관련 237개 업체 방문 교육 실시" }
                                ]
                            },
                            alt: "교육지원 프로세스 다이어그램",
                        },
                        Program: {
                            Title: "품질, 생산성 등 경쟁력 강화 지원 프로그램",
                            Desc: "GS SHOP은 시험/분석비용 지원, 혁신파트너십 사업, 산업혁신 활동, CCM 인증 컨설팅 지원 등을 통해 중소 파트너사가 품질, 생산성 측면의 경쟁력을 강화할 수 있도록 지원하고 있습니다."
                        }
                    },
                    WelfareSupport: {
                        Summary: "파트너사를 위한 복리후생 제도를 지원하고 있습니다.",
                        Football: {
                            Title: "FC서울 축구경기 무료관람",
                            Desc: "파트너사 임직원들간의 단합대회 및 가족간의 나들이에 FC서울 홈경기(상암구장)를 무료로 관람할 수 있는 제도로, <br/>일반석 티켓으로 1인 4매 가능하며 매 경기당 선착순 20매 한도 내에서 이용하실 수 있습니다.<br/>경기시작 1주일 이전에 담당MD에게 신청 해주시면 됩니다."
                        }
                    },
                    BroadcastingSupport: {
                        Summary: "GS SHOP은 파트너사를 위한 <br/>방송편성 지원 제도를 운영하고 있습니다.",
                        PrepSupport: {
                            Title: "방송준비 지원",
                            Desc: "방송 경험이 없어 방송 준비를 외주에 맡기거나 매 방송 시마다 샘플준비, 디스플레이 등의 방송 준비를 해야 하는 협력사의 부담을 덜어드리기 위한 제도입니다. GS SHOP의 전문가들이 상품 스타일링부터 디스플레이, 판넬제작 등을 지원하여 방송 준비에 대한 부담을 해소하고 매출 확대에 기여하고자 합니다."
                        },
                        PrioritySupport: {
                            SubItems: [
                                {
                                    Title: "중소기업 편성우대",
                                    Desc: "GS SHOP은 중소기업이 안정적으로 성장할 수 있도록 상품 편성 전반에서 중소기업을 우대하고 있습니다.<br/> TV홈쇼핑과 데이터홈쇼핑 전반에 걸쳐 중소기업 상품의 편성 비중을 확대해, 지속적인 판로 확보와 매출 성장을 지원하고 있습니다.<br/> 또한 고객 유입이 높은 프라임 시간대에도 중소기업 상품을 우선적으로 편성하는 제도를 운영하여, 중소기업 상품이 보다 효과적으로 고객과 만날 수 있는 기회를 제공하고 있습니다. 이를 통해 중소기업의 시장 경쟁력 강화와 동반성장을 도모하고 있습니다."
                                },
                                {
                                    Title: "중소기업 무료판매방송",
                                    Desc: "GS SHOP은 중소기업의 원활한 시장 진입과 판로 확대를 지원하기 위해 무료판매방송을 운영하고 있습니다.<br/><br/>방송 제작 및 편성에 대한 부담을 완화하여, 중소기업 상품이 고객에게 소개될 수 있는 기회를 제공하고 있으며, 이를 통해 중소기업의 안정적인 성장 기반 마련을 지원하고 있습니다."
                                },
                                {
                                    Title: "인서트영상 제작비 지원",
                                    Desc: "GS SHOP은 중소기업의 홈쇼핑 진입 장벽 완화를 위해 신규 중소기업 협력사를 대상으로<br/>홈쇼핑 방송용 인서트영상 제작비를 지원합니다."
                                }
                            ]
                        }
                    },
                    CommunicationSupport: {
                        Summary: "GS리테일은 다양한 소통과 교류의 장을 마련하여 <br/>중소파트너사의 고충 및 건의사항을 수렴하고 적극 개선하고자 소통제도를 운영하고 있습니다.",
                        Title: "주요 프로그램",
                        Table: {
                            Thead: ["프로그램명", "시기", "주요내용"],
                            Tbody: [
                                { name: "파트너사 간담회", period: "분기 1회", desc: "MD팀장 주관하에 각 시기별, 업종별 이슈에 맞추어 상품정책 추진방향을 함께 고민하고 협의해 나가는 소통제도" },
                                { name: "유어스데이", period: "년 1회", desc: "GS리테일의 전체 MD와 파트너사의 임직원 모두가 야외 단체활동을 통해 화합 및 단합의 시간을 가질 수 있는 문화교류 제도" },
                                { name: "Best 파트너사 시상식", period: "년 1회", desc: "한 해 동안 GS리테일과 함께 협력하고 성장해 온 파트너사를 선정하여, 그 노고에 감사하고 축하하는 제도" }
                            ]
                        }
                    },
                    OwnerSupport: {
                        Summary: "GS리테일은 경영주와의 공동의 발전을 위해<br/>아래와 같은 다양한 상생 제도를 운영하고 있습니다.",
                        // 모든 본문 콘텐츠를 part_1으로 통합
                        part_1: {
                            Summary: "GS25 경영주님의 원활한 점포 운영을 위한<br/>지원 제도 입니다.",
                            MainTitle: "GS25 경영주 지원제도",
                            // 인센티브 카드 데이터
                            Features: [
                                { num: "01", tit: "판매이익 인센티브 제도", desc: "Fresh Food / FF간편식 / 신선 / 치킨25" },
                                { num: "02", tit: "경쟁력 향상 인센티브 제도", desc: "구색 강화 인센티브, 수익 개선 인센티브, 서비스 향상 인센티브" },
                                { num: "03", tit: "경조사 지원 제도", desc: "경조금, 점포 운영 지원금, 장례용품, 출산용품, 경조사 자율휴무" },
                                { num: "04", tit: "상생지원 보험", desc: "안심상해, 횡령, 택배도난, 현금도난, 재산종합" },
                                { num: "05", tit: "장기운영 지원 혜택", desc: "10년차, 20년차, 30년차" },
                                { num: "06", tit: "우수점포 경영주 포상", desc: "우수점포 대상 혜택 지급" },
                                { num: "07", tit: "법률/노무 무료 상담", desc: "변호사 무료 법률 상담, 노무 상담 콜센터 운영" },
                                { num: "08", tit: "경영주 복지 / 제휴 혜택", desc: "상생대출, 경영주 복지몰, 종합건강검진 할인, 엔젤리조트, 엔젤 렌터카(장기/중고차)" }
                            ],
                            Notice: "※ 해당 혜택 및 제도는 상황에 따라 변경/폐지/추가 될 수 있습니다.",
                            
                            // 기타 상세 제도 데이터
                            OtherTitle: "기타 제도",
                            OtherItems: [
                                {
                                    tit: "경영주복지몰",
                                    desc: "경영주 복지몰은 GS25 경영주님들을 위한 생필품 복지 매장으로, 국내 5대 쇼핑몰 보다 더 저렴한 가격으로 이용이 가능합니다. 또한, 제휴사를 통해 생필품 외 여행/숙박 등 다양한 할인혜택을 제공해 드립니다.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1.png")
                                },
                                {
                                    tit: "복리후생",
                                    desc: "장례용품 지원 및 건강검진을 저렴한 가격에 이용하실 수 있도록 하는 지원제도를 비롯해, 경조사 지원 등을 통해 경영주님의 복리후생을 지원하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_2.png")
                                },
                                {
                                    tit: "경영주 열린제안",
                                    desc: "경영주님의 다양한 제안과 아이디어 접수를 통해 생생한 현장의 목소리를 청취하여 점포 운영 및 본부 정책에 개선 반영하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_3.png")
                                }
                            ]
                        },
                        // GS THE FRESH 데이터 (part_2로 신규 추가)
                        part_2: {
                            Summary: "GS THE FRESH 경영주님의 원활한 점포 운영을 위한 <br/>지원 제도 입니다.",
                            MainTitle: "GS THE FRESH 경영주 지원제도",
                            Items: [
                                {
                                    tit: "최소 운영 보조",
                                    desc: "계약당시 조건에 따라, 개점일로부터 정해진 기간에 한해 경영주 총수입을 기준으로 하여 일정 금액이 보장될 수 있도록 본부지원금을 통해 최소 운영 보조를 지원하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1_1.png")
                                },
                                {
                                    tit: "기타 운영지원 제도",
                                    desc: "부진 점포에 한해, 본사 지원 활동으로 ‘부진점 케어활동’을 진행하며, 상권 특성 및 각종 이슈 사항으로 정착지원금이 필요한 경우 특정점에 한해 ‘신규점 조기 정착 지원금’을 운영합니다. 또한, 필요시 양수도점 매출 향상을 위한 지원금을 지급하고 매년 가맹지원제도를 수립 및 운영하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1_2.png")
                                },
                                {
                                    tit: "복리후생",
                                    desc: "경조사 발생시(가맹점 실경영주 기준 결혼 또는 조위) 경조금 및 화환 등을 지급하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1_3.png")
                                },
                                {
                                    tit: "스토어매니저(근무자) 구인인사이트 지원",
                                    desc: "GS THE FRESH 전용 배너 업체(알바천국) 운영",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1_4.png")
                                }
                            ]
                        }
                    },
                    community: {
                        Summary: "GS리테일은 지역 경제 활성화 및 성장 기반 마련을 목적으로<br/>가이드라인을 구축하고 있습니다.",
                        Purpose: {
                            Title: "지역사회 참여 정책의 목적",
                            Items: [
                                { num: "01", desc: "지역사회와의 연계 활동을 통한 <br/>협력모델 구현" },
                                { num: "02", desc: "지역중소기업, 스타트업, 중소시장 등 <br/>다양한 이해관계자들과 관계 개선" },
                                { num: "03", desc: "지역사회의 중요 이슈를 <br/>해결 지원" }
                            ],
                            BtnText: "전문보기"
                        },
                        Goal: {
                            Title: "지역 사회 참여 정책의 목표",
                            DiagramImg: require("@/assets/images/dummy/gsrsu03010104_diagram.png"),
                            DiagramImgMo: require("@/assets/images/dummy/mo/gsrsu03010104_diagram_mo.png"),
                            Items: [
                                { num: "01", desc: "고객의 동참을 이끌어내 선한 영향력을 확산한다." },
                                { num: "02", desc: "지역사회의 문제에 공감하고 해결을 지원하기 위해 노력한다." },
                                { num: "03", desc: "미래세대 투자를 고려한 프로그램을 개발한다." }
                            ],
                            alt: "지역 사회 참여 정책의 목표 다이어그램",
                        }
                    },
                    supplychain: {
                        Summary: "GS리테일은 공급망의 ESG역량과 경쟁력 향상은 물론, 지속가능성과 관련된 리스크와 기회를<br/> 관리하기 위해 공급망 지속가능성 관리정책을 수립하고 실천하고 있습니다.",
                        // 공급망 지속가능성 관리 방침
                        Policy: {
                            Title: "공급망 지속가능성 관리 방침",
                            Items: [
                                { label: "하나", desc: "공정거래를 준수하여 공정하고 투명한 거래를 하겠습니다." },
                                { label: "둘", desc: "공급망의 지속가능성 향상을 위해 ESG 교육 및 컨설팅을 비롯한 동반성장 프로그램 지원을 통한 공급망 역량강화를 위해 노력하겠습니다." },
                                { label: "셋", desc: "공급망 구매 경쟁력 강화를 위해 녹색구매정책에 기반한 녹색구매를 강화하고, 지속적으로 우수 공급사를 발굴하겠습니다." },
                                { label: "넷", desc: "정기적으로 공급망에 대한 지속가능성을 평가하고, 가이드라인 제공을 통해 공급망을 지원 및 리스크를 관리하겠습니다." },
                                { label: "다섯", desc: "공급망과의 원활한 소통을 위한 협력사간담회 및 익명제보채널 운영 등을 통해 소통을 강화하겠습니다." }
                            ],
                            BtnText: "전문보기"
                        },
                        // 공급망 지속가능성 관리 체계
                        System: {
                            Title: "공급망 지속가능성 관리 체계",
                            DiagramImg: require("@/assets/images/dummy/gsrsu03010105.png"),// 요청하신 파일명 적용
                            DiagramImgMo : require("@/assets/images/dummy/mo/gsrsu03010105_mo.png"),
                            alt: "공급망 지속가능성 관리 체계 R&R 다이어그램"
                        }
                    },
                    CSR: {
                        outline: {
                            Summary: "GS리테일은 사회적 책임을 다하고 지역사회와 환경에 기여할 수 있는<br/> 지속적인 목표를 통해 일상에서 함께하는 나눔을 실천합니다.",
                            Strategy: {
                                Title: "사회공헌 전략",
                                Vision: "일상에서 함께하는 나눔 플랫폼, Give & Share",
                                Mission: "유통 플랫폼을 통한 지속 가능한 사회적 가치창출",
                                DiagramImg: require("@/assets/images/dummy/gsrsu030201.png"),
                                DiagramImgMo: require("@/assets/images/dummy/mo/gsrsu030201_mo.png"),
                                alt: "사회공헌 전략 다이어그램",
                                VisionLabel:"비전",
                                MissionLabel:"미션"
                            },
                            HistoryTitle: "발자취",
                            /* 260624 edit 이소라 */
                            History: [
                                {
                                    year: "2025",
                                    items: [
                                        "백혈병소아암환아 치료비 등 지원사업 (2025~)",
                                        "에코크리에이터(2019~2025)",
                                        "에코소셜임팩트(2017~2025)",
                                        "식품 사막화 지역 물품지원 (2024~)",
                                        "이주배경 아동 지원사업 (2024~)",
                                        "저소득학대아동 가족심리 지원사업 (2022~2024)",
                                        "해피스타트 자립준비청년 지원사업 (2022~2024)",
                                        "GS25심장제세동기 설치 (2022)",
                                        "나눔키트 지원 (2020~)",
                                        "업사이클링 친구캠페인(2021~)",
                                        "사랑의 이불 기부 (2022)",
                                        "사랑의 마스크 기부(2020)",
                                    ]
                                },
                                {
                                    year: "2019",
                                    items: [
                                        "사랑의 떡국 기부(2019)",
                                        "GS25 늘봄스토어 오픈 (장애인훈련형 점포, 2017~ )",
                                        "GS25 내일스토어 오픈 (취업이 어려운 이웃을 지원하는 사회공헌형 편의점, 2017~)",
                                        "독립군 알리기 도시락 (2017~)",
                                        "GS아동안전지킴이 / GS안전지킴이 심폐소생술교육(2017~)",
                                        "마음모아펀드 지역아동센터 식사지원(2016~)",
                                        "해외봉사(2016~2017)",
                                        "사랑의 연탄 기부(2016~2024)",
                                        "저소득 화상환자 지원(2015~)",
                                        "나눔매장 물품 지원(2013~)",
                                        "사랑의 김장 기부(2013~)",
                                        "사회적기업 판로지원 사업(2013~2023)",
                                        "FC서울 다문화가정 아동 축구교실 지원(2013~)",
                                        "북드림 도서기부캠페인(2012~2024)"
                                    ]
                                },
                                {
                                    year: "2011",
                                    items: [
                                        "헌혈증 백혈병소아암환아 지원(2010~)",
                                        "푸드뱅크 기부(2011~)",
                                        "태안 기름유출 사고 지원(2008)",
                                        "장학금, 키트 지원(2007~)"
                                    ]
                                },
                                {
                                    year: "2006",
                                    items: [
                                        "GS나누미 봉사단 설립(2006~)",
                                        "무지개상자 아동음악교육 사업(2006~)",
                                        "재해재난 지원 프로세스 구축",
                                        "대한적십자사 헌혈약정식 체결"
                                    ]
                                }
                            ]
                        },
                        vulnerable: {
                            Summary: "아동/청년 및 장애인, 독거 어르신 등의 자립 지원을 위한<br/>사업과 안전 플랫폼의 역할을 실천합니다.",
                            // 주요 사업 리스트 (2열 그리드 활용)
                            Projects: [
                                { 
                                    tit: "무지개 상자 오케스트라", 
                                    desc: "음악교육을 통해 취약계층 아동의 문화 격차 해소 및 정서적 지지와 자존감 향상을 위한 다양한 활동을 지원하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu030202_1.png")
                                },
                                { 
                                    tit: "백혈병소아암환아지원", 
                                    desc: "백혈병, 소아암 환아와 가족의 지원을 위해 “드림온“ 활동을 지원합니다. 치료비 지원(드림온 케어), 새출발 축하선물 지원(드림온 스텝), 환아와 가족을 위한 심리 정서 회복 지원(드림온데이) 소아암 환아의  치료, 회복, 희망의 여정을 함께 동행하는 회복 지원 활동입니다.",
                                    img: require("@/assets/images/dummy/gsrsu030202_2.png")
                                },
                                { 
                                    tit: "소방관 희망나눔 달력", 
                                    desc: "건강한 소방관들의 모습을 담은 달력을 판매하고 수익금으로 화상 환자의 일상회복을 위한 치료비를 지원하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu030202_3.png")
                                },
                                { 
                                    tit: "FC서울 다문화 가정 아동 축구교실", 
                                    desc: "우리 사회 다문화 가정 아동이 건강하게 자랄 수 있도록 축구교실 및 식사 지원 등 다양한 지원활동이 이루어지고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu030202_4.png")
                                }
                            ],
                            // 주요 협력기관 (3열 그리드 활용)
                            Partners: {
                                Title: "주요 협력기관",
                                Items: [
                                    { name: "기아대책", img: require("@/assets/images/dummy/gsrsu030202_logo_1.png") },
                                    { name: "서울특별시 소방재난본부", img: require("@/assets/images/dummy/gsrsu030202_logo_2.png") },
                                    { name: "사회복지법인 한림화상재단", img: require("@/assets/images/dummy/gsrsu030202_logo_3.png") }
                                ]
                            }
                        },
                        communitysupport: {
                            Summary: "지역사회봉사, 기부 및 사회적 기업 지원을 통해 <br/>함께하는 나눔을 실천합니다.",
                            // 2열 그리드 활용 (기존 program_grid 스타일 재활용)
                            /* 20260624 edit 이소라 */
                            Projects: [
                                { 
                                    tit: "GS나누미 봉사", 
                                    desc: "2006년부터 전국 30여 개의 봉사처에서 임직원, 경영주, 고객이 함께 나눔을 실천하고 있습니다.", 
                                    img: require("@/assets/images/dummy/gsrsu030203_1.png") 
                                },
                                { 
                                    tit: "임원/임직원 현충원 봉사",  
                                    desc: "호국보훈의 달엔 임원의 현충원 환경정화 봉사활동과 함께 순국선열의 숭고함을 기립니다.",
                                    img: require("@/assets/images/dummy/gsrsu030203_2.png") 
                                },
                                { 
                                    tit: "연말 테마봉사", 
                                    desc: "매년 연말, 전국 봉사단의 릴레이 봉사로 따뜻한 겨울나기를 위한 하나 된 마음을 전합니다.",
                                    img: require("@/assets/images/dummy/gsrsu030203_3.png") 
                                },
                                { 
                                    tit: "푸드뱅크 기부", 
                                    desc: "GS THE FRESH 식품 기부는 푸드뱅크를 통해 어려운 이웃의 따뜻한 식사로 지원됩니다.",
                                    img: require("@/assets/images/dummy/gsrsu030203_4.png") 
                                },
                                { 
                                    tit: "심폐소생술 교육 / 심장제세동기 지원", 
                                    desc: "위급 상황이 발생하였을 때 소중한 생명을 지킬 수 있도록 임직원들은 자발적으로 심폐소생술 교육에 참여, 대한적십자사와 협업하여 심장제세동기와 체험 교육 차량을 지원하였습니다.",
                                    img: require("@/assets/images/dummy/gsrsu030203_5.png") 
                                },
                                { 
                                    tit: "마음모아펀드", 
                                    desc: "임직원이 기부한 금액과 동일하게 회사가 기부하는 매칭그랜트로 영양부족 식사를 하고있는 취약계층 아동들에게 신선한 먹거리와 과일 등 '든든한 한 끼' 를 지원합니다.", 
                                    img: require("@/assets/images/dummy/gsrsu030203_6.png") 
                                },
                                { 
                                    tit: "헌혈캠페인", 
                                    desc: "매년 헌혈캠페인을 진행하여 백혈병, 소아암 환아 등에게 따뜻한 지원을 이어나가고 있습니다.", 
                                    img: require("@/assets/images/dummy/gsrsu030203_7.png") 
                                },
                                { 
                                    tit: "재해재난 지원", 
                                    desc: "재해재난이 일어난 경우 이재민이 긴급구호물품이 빠른 시간 내 전달받을 수 있게 하였습니다.",
                                    img: require("@/assets/images/dummy/gsrsu030203_8.png") 
                                }
                            ],
                            // 주요 협력기관 (brand_grid 스타일 재활용)
                            Partners: {
                                Title: "주요 협력기관",
                                Items: [
                                    { name: "등촌9종합사회복지관", img: require("@/assets/images/dummy/gsrsu030203_logo_1.png") },
                                    { name: "서울SOS어린이마을", img: require("@/assets/images/dummy/gsrsu030203_logo_10.png") },
                                    { name: "홀트일산복지타운/요양원", img: require("@/assets/images/dummy/gsrsu030203_logo_3.png") },
                                    { name: "", img: require("@/assets/images/dummy/gsrsu030203_logo_4.png") },
                                    { name: "푸드뱅크", img: require("@/assets/images/dummy/gsrsu030203_logo_5.png") },
                                    { name: "대한적십자사", img: require("@/assets/images/dummy/gsrsu030203_logo_6.png") },
                                    { name: "아름다운가게", img: require("@/assets/images/dummy/gsrsu030203_logo_8.png") },
                                    { name: "(주)한국백혈병소아암협회", img: require("@/assets/images/dummy/gsrsu030203_logo_9.png") }
                                ]
                            }
                        },
                        broadcasting: {
                            Summary: "미디어 접근 지원과 인재 육성을 통해 <br/>방송의 공공성과 책임 있는 미디어 문화를 이끌어냅니다.",
                            Projects: [
                                { 
                                    tit: "미디어나눔버스 지원", 
                                    desc: "도서·산간 지역민과 노인·장애인 등 취약계층 미디어교육을 지원하기 위해 방송제작 시설과 장비를 탑재한 이동형 스튜디오 차량인 ‘찾아가는 미디어나눔버스’ 운영을 지원하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu030204_1.png")
                                },
                                { 
                                    tit: "콘텐츠리더장학금/소비자리더장학금 지원", 
                                    desc: "GS SHOP 콘텐츠리더장학금과 소비자리더장학금을 지원하여 방송분야와 소비자권익보호를 위한 분야에서 활동할 미래 인재육성을 지원하고 있습니다.",
                                    img: require("@/assets/images/dummy/gsrsu030204_2.png")
                                }
                            ],
                            Partners: {
                                Title: "주요 협력기관",
                                Items: [
                                    { name: "시청자미디어재단", img: require("@/assets/images/dummy/gsrsu030204_logo_1.png") },
                                    { name: "KCOP", img: require("@/assets/images/dummy/gsrsu030204_logo_2.png") }
                                ]
                            }
                        },
                        sharing: {
                            Summary: "GS리테일 숨은 나눔천사의 따뜻한 이야기를 전해드립니다.",
                            List: [
                                {
                                    tit: "GS25 명륜아남점 박우정 스토어매니저",
                                    desc: "신속한 판단과 실행으로 인명을 구한 GS25 명륜아남점 박우정 스토어매니저를 소개합니다.",
                                    date: "2026.02.22",
                                    badge: "GS25",
                                    img: require("@/assets/images/dummy/gsrsu030205_1.png")
                                },
                                {
                                    tit: "GS THE FRESH 상계점 김준영 매니저",
                                    desc: "신속한 판단과 실행으로 인명을 구한 GS THE FRESH 상계점 김준영 매니저를 소개합니다.",
                                    date: "2026.02.22",
                                    badge: "GS THE FRESH",
                                    img: require("@/assets/images/dummy/gsrsu030205_2.png")
                                },
                                {
                                    tit: "편의점 1부문4지역)개발2팀 우찬용 팀장",
                                    desc: "용기있는 행동으로 2번의 선행을 실천한 편의점 1부문4지역)개발2팀 우찬용 팀장을 소개합니다.",
                                    date: "2026.02.22",
                                    badge: "GS25",
                                    img: require("@/assets/images/dummy/gsrsu030205_3.png")
                                },
                                {
                                    tit: "수퍼사업부 가맹4팀 오동흠팀장",
                                    desc: "무더운 날씨에 집에 오랜 시간 갇힌 어르신을 구조한 수퍼사업부 가맹4팀 오동흠 팀장을 소개합니다.",
                                    date: "2026.02.22",
                                    badge: "GS THE FRESH",
                                    img: require("@/assets/images/dummy/gsrsu030205_4.png")
                                },
                                {
                                    tit: "GS THE FRESH 안양메가트리아점 양승용부점장",
                                    desc: "신속한 판단과 실행으로 인명을 구한 수퍼사업부 직영3팀 안양메가트리아점 양승용 부점장을 소개합니다.",
                                    date: "2026.02.22",
                                    badge: "GS THE FRESH",
                                    img: require("@/assets/images/dummy/gsrsu030205_5.png")
                                },
                                {
                                    tit: "GS THE FRESH 안양메가트리아점 양승용부점장",
                                    desc: "신속한 판단과 실행으로 인명을 구한 수퍼사업부 직영3팀 안양메가트리아점 양승용 부점장을 소개합니다.",
                                    date: "2026.02.22",
                                    badge: "GS THE FRESH",
                                    img: require("@/assets/images/dummy/gsrsu030205_6.png")
                                }
                            ]
                        }
                    },
                    protect: {
                        humanrights: {
                            Summary: "GS리테일은 임직원뿐만 아니라, 모든 이해관계자들의 인권을 존중하며 <br/>인간으로서의 가치와 존엄성을 보장하겠습니다.",
                            Policy: {
                                Title: "GS리테일 인권경영정책",
                                Desc: "GS리테일은 세계인권선언(Universal Declaration of Human Rights)과 UNGC 10대 원칙(UN Global Compact),<br/>그리고 국내외 노동 및 인권 관련 표준과 가이드라인을 지지하고 준수하여 회사의 경영활동에서 발생할 수 있는 모든 인권 관련 문제에 대한 방지와 해결을 위해 최선의 노력을 다하겠습니다.<br/><br/>이를 위해, GS리테일 인권경영정책을 수립해 임직원 외 협력사를 포함한 모든 이해관계자의 인권 존중을 실천하고자 합니다.<br/>또한, 협력사의 경우 '협력사 행동강령'에 인권관련 사항 역시 포함하여 인권경영을 실천할 수 있도록 하고 있습니다.",
                                BtnText: "전문보기"
                            },
                            Goals: {
                                Title: "일하기 좋은 직장 만들기, 임직원 인권 목표",
                                Items: [
                                    { num: "01", desc: "즐겁고 보람된 일터를 만들어 갑니다." },
                                    { num: "02", desc: "누구나 차별없이 존중 받는 근무 환경을 만들어 갑니다." },
                                    { num: "03", desc: "장애인, 취약근로자, 여성 및 임산부 근로자들의 행복하고, 일할 수 있는 근로환경을 제공합니다." },
                                    { num: "04", desc: "GS리테일은 수평적 조직 문화를 통해 누구나 소신 있는 발언과 의견을 존중합니다." }
                                ]
                            },
                            Programs: {
                                Title: "인권침해 방지 프로그램 운영",
                                Items: [
                                    { tit: "내부 신고제도 운영 (익명제보)", img: require("@/assets/images/dummy/gsrsu030301_1.png") },
                                    { tit: "고충 상담실 운영", img: require("@/assets/images/dummy/gsrsu030301_2.png") },
                                    { tit: "장애인 직업 훈련형 매장 운영", img: require("@/assets/images/dummy/gsrsu030301_3.png") },
                                    { tit: "조직역량 서베이 운영", img: require("@/assets/images/dummy/gsrsu030301_4.png") },
                                    { tit: "블라인드 채용 운영", img: require("@/assets/images/dummy/gsrsu030301_5.png") },
                                    { tit: "아동 고용(노동) 금지", img: require("@/assets/images/dummy/gsrsu030301_6.png") },
                                    { tit: "작은사랑 나눔회 운영", img: require("@/assets/images/dummy/gsrsu030301_7.png") },
                                    { tit: "심리상담 (EAP)", img: require("@/assets/images/dummy/gsrsu030301_8.png") }
                                ]
                            },
                            Assessment: {
                                Title: "인권영향평가",
                                Desc: "GS리테일은 2021년부터 임직원 대상 인권영향평가를 실시해, 현황 및 개선점을 도출하고 즉시 개선하고자 노력하고 있습니다.<br/><br/> 이외에도 인권 관련 임직원 교육을 실시하고, 인권영향평가 등이 이해관계자를 대상으로 확대될 수 있도록 협업을 계속해 나가겠습니다.",
                                img: require("@/assets/images/dummy/gsrsu030301_2_1.png"),
                                alt: "인권영향평가"
                            }
                        },
                        talentmanagement: {
                            part_1:{
                                Summary: "Value No.1 GS리테일이 함께하고자 하는 인재의 모습입니다.",
                                MainTitle:`“GS Value와 Way를<br/> 잘 실천하는 인재”`,
                                Description: "GS리테일과 함께 할 인재의 모습과<br/> 직원들의 꿈을 실현시키기 위해 인재경영을 실현해 나아가고 있습니다.",
                                Philosophy: {
                                    Items: [
                                        { tit: "GS Value", sub: "우리의 가치관", desc: "Fair, Friendly, Fresh, Fun" },
                                        { tit: "GS Way", sub: "우리의 일하는 방식", desc: "고객 최우선, 성장 마인드, 열린 소통, AX 실행력" }
                                    ]
                                },
                                Details: {
                                    Value: [
                                        { tit: "Fair", desc: "공정함을 지키고\n사회와 환경에 기여합니다." },
                                        { tit: "Friendly", desc: "다양성을 인정하고\n서로를 존중합니다." },
                                        { tit: "Fresh", desc: "창의와 도전을 장려하여\n회사와 개인이 함께 성장합니다." },
                                        { tit: "Fun", desc: "유연하고 자율적인 환경에서\n즐겁게 일합니다." }
                                    ],
                                    Way: [
                                        { tit: "고객 최우선", list: ["# 업무의 시작과 끝을 고객으로 연결합니다.", "# 고객을 위해 '되는 방법'을 먼저 찾습니다."] },
                                        { tit: "성장 마인드", list: ["# 작고 빠르게 시도하며 성공 경험을 만듭니다.", "# 매일의 성장과 변화를 추구합니다."] },
                                        { tit: "열린 소통", list: ["# 명확한 목표와 과정 공유로 눈높이를 맞춥니다.", "# 치열하게 논의하고, One Team으로 해냅니다."] },
                                        { tit: "AX 실행력", list: ["# 설득과 결정 모두 데이터가 기준입니다.", "# 디지털/AI툴로 업무 방식을 개선합니다."] }
                                    ]
                                },
                                Efforts: [
                                    "직원들의 안전/보건을 최우선으로 하고,",
                                    "교육훈련프로그램을 통한 인재육성,",
                                    "인권 존중을 통한 배려와 선의의 경쟁,",
                                    "최고의 처우수준과 다양한 복리후생 지원을 통한 자긍심 함양 등<br/> 인재경영을 실현해 나아가고 있습니다."
                                ],
                                alt: "인재경영 회의", 
                            },
                            part_2:{
                                Summary: "GS리테일은 핵심역량(직무·리더십·GS Way·온보딩)을 체계적으로 강화하고,<br/>구성원의 성장을 지원하는 인재육성체계를 운영하고 있습니다.",
                                MainTitle: "GS 인재육성 체계",
                                DiagramImg: require("@/assets/images/dummy/gsrsu03030202.png"),
                                DiagramAlt: "GS 인재육성 체계 다이어그램",
                                Cards: [
                                    {
                                        num: "01",
                                        tit: "직무 역량",
                                        desc: "직무 수행에 필요한 전문 지식과 실무 역량을 확장하여,<br/>개인의 직무 성장을 체계적으로 이루도록 돕습니다.",
                                        list: ["직무 Academy / GenAI Academy", "직무성장플랜(나의 성장계획 작성)"]
                                    },
                                    {
                                        num: "02",
                                        tit: "리더십 역량",
                                        desc: "리더로서 구성원의 잠재력을 이해하고, 신뢰와 협력을 기반으로 함께 성장하는 리더십을 개발할 수 있도록 지원합니다.",
                                        list: [
                                            "팀장 리더십 스쿨",
                                            "BOLD Leader / BOLD Manager 과정",
                                            "조직책임자 리더십 워크숍, 임원/팀장 리더십 진단 및 피드백"
                                        ]
                                    },
                                    {
                                        num: "03",
                                        tit: "GS Way 내재화",
                                        desc: "GS리테일의 핵심가치를 공통의 기준으로 깊이 이해하고, 업무 전반에서 일관된 방식으로 실천할 수 있는 실행력을 학습합니다.",
                                        list: ["GS Way 내재화 교육 프로그램(리더·구성원)", "GS Way 현업 적용 학습(Post Learning) 및 업무 적용 워크숍"]
                                    },
                                    {
                                        num: "04",
                                        tit: "온보딩",
                                        desc: "각 직책 · 경력 단계별 구성원이 조직과 역할을 이해하고,<br/>성장의 출발점을 형성할 수 있도록 지원합니다.",
                                        list: [
                                            "신임임원/신임팀장/신입사원/경력사원 온보딩 프로그램",
                                            "신입사원/경력사원 리텐션 프로그램",
                                            "GS그룹 신입사원 프로그램"
                                        ]
                                    },
                                    {
                                        num: "05",
                                        tit: "자기주도 학습",
                                        desc: "구성원이 스스로 학습하고 지속적으로 성장할 수 있도록,<br/>학습 인프라와 제도적 지원을 제공합니다.",
                                        list: ["내일On (온라인 연수원) / 전사 인사이트 특강", "자기주도학습 / 어학 / 자격증 / 사외과정 지원제도"]
                                    }
                                ]
                            },
                            part_3: {
                                Summary: "GS리테일은 인재의 가치를 소중히 여기고 있으며, 인재를 위한<br/>다양한 제도를 운영하고 있습니다.",
                                Sections: [
                                    {
                                        title: "Work",
                                        desc: "모든 구성원이 일과 성장에 온전히 집중할 수 있도록 최상의 환경과 자원을 제공합니다.",
                                        items: [
                                            { num: "01", tit: "어학 지원", desc: "구성원의 자기개발을 위한 어학 학습 비용을 지원합니다." },
                                            { num: "02", tit: "자격증 지원", desc: "직무 전문가를 육성하기 위해 자격증학습에 소요되는 비용을 지원합니다." },
                                            { num: "03", tit: "셔틀/통근버스 운영", desc: "구성원의 안전하고 편리한 출근길을 지원합니다." },
                                            { num: "04", tit: "원거리 지원금", desc: "실제 근무 지역과 연고지가 일정 거리 이상일 경우, 주거비 일부를 지원합니다." },
                                            { num: "05", tit: "이동통신비 지원", desc: "업무상 통화할 일이 잦은 구성원을 위해 이동통신비를 지원합니다." },
                                            { num: "06", tit: "시차근무제", desc: "일의 몰입도와 삶의 균형을 위해, 출퇴근 시간을 유연하게 조율합니다." }
                                        ]
                                    },
                                    {
                                        title: "Engagement",
                                        desc: "모든 구성원이 자부심을 가지고 일하며 자신의 역량을 발휘할 수 있도록 아낌없는 지원을 제공합니다.",
                                        items: [
                                            { num: "01", tit: "임직원 할인 제공", desc: "구성원을 위해 GS홈쇼핑 & GS THE FRESH에서 임직원 한정 할인을 제공합니다." },
                                            { num: "02", tit: "축하 선물 지급", desc: "출산 축하 선물 및 다자녀 출산 경조금을 제공합니다." },
                                            { num: "03", tit: "명절 선물 지급", desc: "풍성하고 행복한 명절을 보낼 수 있도록 적극 지원합니다." },
                                            { num: "04", tit: "심리상담 지원", desc: "구성원의 마음이 건강할 수 있도록 근로자 심리 상담을 제공합니다." },
                                            { num: "05", tit: "장기 근속 포상", desc: "장기 근속 구성원에게 감사의 마음을 담아 포상 및 휴가를 제공합니다." }
                                        ]
                                    },
                                    {
                                        title: "Life",
                                        desc: "일과 삶의 조화를 이루며 행복한 삶을 누릴 수 있도록 구성원들의 더 나은 내일을 지원합니다.",
                                        items: [
                                            { num: "01", tit: "보육비 / 유치원 보조비, 자녀 학자금 지원", desc: "구성원 자녀분들은 우리의 미래입니다. GS리테일이 함께 돌보고 지원합니다." },
                                            { num: "02", tit: "사내 어린이집 운영", desc: "GS강서타워 / GS강남타워 사내 어린이집을 운영합니다." },
                                            { num: "03", tit: "재해 지원", desc: "예상치 못한 재해도 GS리테일이 든든히 함께합니다." },
                                            { num: "04", tit: "의료비/건강검진 지원", desc: "구성원의 건강을 위해 예방부터 치료까지 세심하게 케어합니다." },
                                            { num: "05", tit: "아이사랑 휴직", desc: "아이와 함께하는 소중한 시간을 존중합니다." },
                                            { num: "06", tit: "임직원 자녀 입학선물", desc: "임직원 자녀의 새 출발을 축하하며 입학 선물을 전달합니다." },
                                            { num: "07", tit: "경조금 지원", desc: "구성원 경조사 발생 시, GS리테일이 기쁨과 슬픔을 함께 하고자 휴가 및 지원금을 지원합니다." },
                                            { num: "08", tit: "작은사랑나눔회", desc: "구성원의 갑작스러운 어려움에 함께 힘을 보태는 상생 지원 제도입니다." },
                                        ]
                                    },
                                    {
                                        title: "Leisure",
                                        desc: "즐거운 여가 생활이 최고의 성과를 만든다는 믿음으로, 리프레시를 위한 충전의 기회도 마련합니다.",
                                        items: [
                                            { num: "01", tit: "휴양시설 지원", desc: "구성원의 행복한 여행을 위해 휴양시설 할인혜택을 지원합니다." },
                                            { num: "02", tit: "하계휴가 추가 지원", desc: "법정 연차 외에 별도로 부여되는 여름휴가! 일상의 행복을 GS리테일이 응원합니다." },
                                            { num: "03", tit: "휴가(연차) 보상", desc: "잔여 연차 미사용 분에 대해 일부 1.5배 보상을 지원합니다." },
                                            { num: "04", tit: "스포츠티켓 지원", desc: "축구, 야구, 배구 원하는 스포츠를 즐길 수 있도록 아낌없이 지원합니다." },
                                            { num: "05", tit: "인포멀(사내동호회)", desc: "구성원의 상호 이해와 친목도모를 지원합니다." }
                                        ]
                                    }
                                ],
                                Awards: {
                                    Title: "인재경영 관련 인증 및 대외 수상 이력",
                                    List: [
                                        { year: "2025", month: "4월", desc: "장애인 고용 우수기업 선정(강남구청)" },
                                        { year: "2024", month: "11월", desc: "공정채용 우수기업 장관상 수상(고용노동부)" },
                                        { year: "2023", month: "2월", desc: "대한민국 일하기 좋은 기업 인증 획득 (GPTW코리아)" }
                                    ],
                                    Highlight: {
                                        Img: require("@/assets/images/dummy/gsrsu03030203.png"), // GPTW 로고 이미지
                                        Tit: "대한민국 일하기 좋은 기업 인증 획득<br/> (GPTW코리아)",
                                        Date: "2023.02",
                                        alt: "GPTW 인증 로고",
                                    }
                                }
                            },
                            part_4: {
                                Summary: "GS리테일의 인재 경영과 관련된 실적 자료들을 열람하실 수 있습니다.",
                                Desc: "본 자료는 이해 관계자 및 기관,주주들을 위해 공개된 GS리테일의 정보자산, 구성원들의 정보가 포함되어 있으므로<br/>용도 외 활용, 불법 유출시에는 법에 의해 처벌을 받으실 수 있습니다.",
                                Table: {
                                    Tbody: [
                                        {num: 4, tit: "인권 교육 실적 자료", date: "2021.06.21", url: "/files/human_rights_edu_2021.pdf" },
                                        {num: 3, tit: "퇴직자 지원(창업·재고용) 제도", date: "2021.02.19", url: "/files/retirement_support.pdf" },
                                        {num: 2, tit: "인원, 임금, 교육훈련비 현황", date: "2021.02.19", url: "/files/salary_status.pdf" },
                                        {num: 1, tit: "산업안전보건 교육 자료", date: "2021.02.19", url: "/files/safety_edu.pdf" }
                                    ]
                                },
                                txt:'다운로드'
                            },
                        },
                        customer: {
                            Summary: "고객 한 분 한 분의 만족이 GS리테일의 사명이자 존재 이유입니다.<br/>GS리테일의 고객만족경영은 생활과 문화입니다.",
                            Policy: {
                                Title: "소비자 권익보호 정책",
                                Desc: "GS리테일의 모든 임직원은 소비자의 권익 보호를 위해<br/>이로운 상품과 서비스를 제공하여 신뢰받는 GS리테일이 되고자 다음의 정책을 실천하고 있습니다.",
                                BtnText: "전문보기",
                                Items: [
                                    { label: "하나", text: "소비자의 합리적인 소비를 위해 충분하고 정확한 정보를 제공하겠습니다." },
                                    { label: "둘", text: "소비자에게 적합한 상품과 최상의 서비스를 제공하여 고객의 편익을 증진을 위해 노력하겠습니다." },
                                    { label: "셋", text: "소비자의 권익을 침해하는 불공정 거래행위를 근절하겠습니다." },
                                    { label: "넷", text: "소비자의 개인정보는 동의절차를 거치며 그 목적에 부합하는 최소한의 정보만 수집하겠습니다." },
                                    { label: "다섯", text: "소비자의 소리에 귀 기울이고 불편사항은 즉시 시정하여 최상의 상품을 제공하기 위해 노력하겠습니다." }
                                ]
                            },
                            Activities: {
                                Title: "고객만족경영 주요 활동",
                                Items: [
                                    { img: require("@/assets/images/dummy/gsrsu030303_1.png"), tit: "TOTAL 서비스", subTit: "고객관계관리를 통한 근본적 문제 해결", desc: "고객이 입점에서 퇴점까지 각 Value-Chain의 고객기대가치 만족을 위한 활동 및 고객의 소리를 지속 개선합니다." },
                                    { img: require("@/assets/images/dummy/gsrsu030303_2.png"), tit: "가치공유 및 소통", subTit: "가치공유 및 열린 소통 문화 정착", desc: "GS리테일의 모든 리더는 구성원과 매주 모닝톡, 매월 커넥팅데이를 진행합니다." },
                                    { img: require("@/assets/images/dummy/gsrsu030303_3.png"), tit: "서비스 붐업활동", subTit: "고객, 임직원 참여하는 다양한 서비스 프로그램 진행", desc: "매년, 매월 정기적으로 진행하는 서비스붐업활동을 통해 고객지향적인 마인드를 심화합니다." },
                                    { img: require("@/assets/images/dummy/gsrsu030303_4.png"), tit: "내부직원만족", subTit: "다양한 자긍심 함양 프로젝트", desc: "만족한 직원이 만족한 서비스를 제공한다는 철학아래 다양한 자긍심 함양제도를 진행합니다." }
                                ]
                            },
                            Recommend: {
                                Title: "서비스 우수 직원 추천",
                                PointTit: "진심어린 서비스",
                                Desc: "나의 마음(心)을 담아, 고객입장에서 기대에 앞서가는 서비스를 지속적으로 제공하는 것입니다.<br/>고객(동료)에게 진심어린 서비스를 실천한 서비스 우수 직원을 추천해주세요.",
                                BtnText: "서비스 우수 직원 추천하기",
                                link: "https://forms.office.com/pages/responsepage.aspx?id=XMJFRnWXd02nNnAPq3ZhFvCl7ccQQtpLvT4o0ubaQFFUOEVXQzJNMkg3U1NWT1VONklWUUhSREc1NC4u&route=shorturl"
                            },
                            Safety: {
                                Title: "제품과 서비스 안전을 위한<br/> 제도 운영",
                                Items: [
                                    { step: "01", tit: "맛, 신선도 지킴이 안내", desc: "신선, 맛, NO.1을 위한 GS리테일의 선도 지킴이 활동을 확인해보세요.", popContId: "gsrsu03030302"},
                                    { step: "02", tit: "안전, 위생관리 제도", desc: "GS리테일의 안전, 위생관리 제도를 확인해 보세요.", popContId: "gsrsu03030303"},
                                    { step: "03", tit: "위해상품 차단시스템", desc: "안전한 상품을 제공해 드리기 위해 위해상품 차단 시스템에 참여하고 있습니다.", popContId: "gsrsu03030304"}
                                ]
                            },
                            Compensation: {
                                Title: "제품, 고객 서비스<br/> 피해 보상 프로그램 운영",
                                BtnText: "소비자 피해보상 매뉴얼 보기",
                                Steps: [
                                    {label: "Step 1", desc: "제품 이상,<br/>서비스 불만족 접수" },
                                    { label: "Step 2", desc: "사실관계 확인" },
                                    { label: "Step 3", desc: "이상 여부에 따른<br/>보상 정책 적용" }
                                ]
                            },
                            Awards: {
                                Title: "제품과 서비스 인증 및<br/> 대외 수상 이력",
                                History: [
                                    { year: "2019", month: "12월", desc: "대한민국브랜드 대상(산업통상자원부)" },
                                    { year: "", month: "7월", desc: "GS리테일, 한국서비스대상 종합유통부문 최초 명예의 전당 헌액 (한국표준협회)" },
                                    { year: "", month: "6월", desc: "국가서비스대상 신선식품 쇼핑몰 부분 대상 (산업정책연구원)" },
                                    { year: "2016", month: "9월", desc: "GS리테일, 한국의 경영대상 명예의 전당 헌액 (한국능률협회)" }
                                ],
                                Marks: [
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo1.png"), tit: "ISO9001 인증획득 (한국기업인증원)", date: "2021. 05" },
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo2.png"), tit: "대한민국브랜드 대상 (산업통상자원부)", date: "2019. 12" },
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo3.png"), tit: "GS리테일, 한국서비스대상 종합유통부문 최초 명예의 전당 헌액 (한국표준협회)", date: "2019. 07" },
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo4.png"), tit: "국가서비스대상 신선식품 쇼핑몰 부분 대상 (산업정책연구원)", date: "2019. 06" },
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo5.png"), tit: "GS리테일, 한국의 경영대상 명예의 전당 헌액 (한국능률협회)", date: "2016. 09" }
                                ]
                            }
                        },
                        safetymanagement: {
                            Summary: "GS리테일은 안전한 근무환경을 조성하여 사고 및 재해를 예방하고,<br/> 모든 구성원(임직원, 협력사), 시민(고객, 일반시민)의 건강한 삶의 질 향상을 위해<br/> 경영방침을 적극 실천하고 있습니다.",
                            Policy: {
                                Title: "안전·보건 경영방침",
                                BtnText: "안전·보건 경영방침",
                                Items: [
                                    { label: "하나", text: "회사는 산업안전보건법과 안전보건관리규정 등 관련 법규를 준수한다." },
                                    { label: "둘", text: "회사는 안전중심의 경영의지와 실적이 최고 수준에 도달하도록 노력한다." },
                                    { label: "셋", text: "회사는 안전보건업무를 경영의 한 요소로 인식하여 필요한 자원과 기술을 제공하고 안전·보건활동을 지속적으로 전개한다." },
                                    { label: "넷", text: "회사는 구성원(임직원, 협력사), 시민(고객, 일반시민)의 참여 및 의견을 적극 반영하고 불안전한 행동, 환경 등 사업장의 유해·위험 요소를 지속적으로 점검·제거하여 사고 및 재해를 예방하기 위해 노력한다." },
                                    { label: "다섯", text: "회사는 매년 사업장의 안전·보건 관련 법규 준수 상태를 확인하고 필요한 인력, 예산 등을 편성하여 집행한다." },
                                    { label: "여섯", text: "회사의 전 구성원은 본부의 안전·보건 활동 계획과 안전·보건 매뉴얼을 준수하여 중대재해 및 산업재해 예방활동에 적극 동참한다." }
                                ]
                            },
                            Governance: {
                                Title: "안전보건 거버넌스",
                                Desc: "안전보건에 대한 전문성 강화를 위해 플랫폼 BU와 홈쇼핑 BU에 각각 안전보건경영책임자(CSO)를 선임하였으며,<br/>안전보건경영책임자 산하에 안전보건에 관한 업무를 총괄 관리하는 전담조직인 안전보건팀과 안전보건파트를 운영하고 있습니다.<br class='m_br2x' />또한 사업장별 안전보건 관리책임자, 관리감독자를 선임하고 유해요인 조사, 위험성 평가 등을 실시하여 안전보건관리체계를 고도화하고 있습니다.",
                                img1: require("@/assets/images/dummy/gsrsu030304_1.png"),
                                imgMo1: require("@/assets/images/dummy/gsrsu030304_1_mo.png"),
                                alt: "플랫폼 BU 안전보건 조직도",
                                Notice: "1) 강서, N타워, 군포 물류센터, 이천 물류센터"
                            },
                            Safety: {
                                Title: "안전보건 교육 및 관리 체계",
                                Desc: "GS리테일은 임직원들의 최고의 안전보건 상태를 지속하기 위해 안전보건교육을 실시하고 있으며,<br/> 다양한 보건 관리 활동을 통해 사전에 사고를 차단하고 있습니다.",
                                Systems: [
                                    { num: "01", tit: "근골격계 운동", sub: "(매일 비전 미팅시)" },
                                    { num: "02", tit: "심리상담 서비스", sub: "(스트레스 관리)"},
                                    { num: "03", tit: "보건 목표 지수관리"},
                                    { num: "04", tit: "정기/수시 매일 안전 진단"},
                                    { num: "05", tit: "종합검진 실시",},
                                    { num: "06", tit: "금연 활동 지원",},
                                    { num: "07", tit: "위험성 평가 안전 교육 활동",}
                                ]
                            },
                            listening : {
                                Title: "안전·보건 의견 청취함",
                                Desc: "GS리테일은 안전 및 보건에 관한 사항에 대해 구성원의 의견을 성실히 청취합니다.<br/>건전한 제보는 회사의 발전과 안전보건 경영을 위한 소중한 밑거름이 됩니다.",
                                items: [
                                    "안전·보건 의견 청취함은 시민 및 구성원의 안전과 보건에 대하여 의견 및 제보를 받습니다.",
                                    "안전과 보건에 관한 사항 이외에는 별도 답변이나 조치 등을 하지 않을 수 있습니다.",
                                    "의견 또는 제보에 대하여 어떤 불이익도 발생하지 않습니다."
                                ],
                                Consents: [
                                    {
                                        title: "개인정보 제공 동의",
                                        items: [
                                            "입력하신 개인정보는 신속하고 정확한 처리를 위해 안전담당 부서에만 전달되며 문의 내용 확인 및 답변에 사용 됩니다.",
                                            "수집하는 개인정보 항목: 이름, 이메일, 휴대폰번호",
                                            "개인정보의 보유 및 이용기간: 목적 달성 시 지체 없이 파기(최대 1년)"
                                        ],
                                        guide: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우<br/> 정보가 확인해야 하는 문의에 대해 정확하고 신속한 답변을 받으시는데 어려움이 있습니다.",
                                        ConsentText: "동의합니다."
                                    },
                                    {
                                        title: "개인정보 수집·이용 동의",
                                        items: [
                                            "수집·이용 및 목적: 문의사항 확인 및 답변 활용",
                                            "수집하는 개인정보 항목: 이름, 연락처, 이메일",
                                            "보유 및 이용기간: 접수 후 1년"
                                        ],
                                        guide: "고객님께서는 본 동의에 거부하실 권리가 있으나, 동의하지 않으실 경우<br/> 문의 글 작성이 불가능합니다.",
                                        ConsentText: "동의합니다."
                                    }
                                ],
                                Nonmember : {
                                    title:"고객님께서는 현재 비회원(비로그인)으로 문의를 접수 중이십니다.",
                                    items: [
                                        "비회원 문의를 하신 경우 답변은 '등록하신 연락처(문자,전화) 또는 이메일을 통해서만' 확인하실 수 있습니다.",
                                        "연락처를 정확하게 입력해주세요. (홈페이지 내에서 이전 문의이력 확인 불가)",
                                        "로그인 후 고객문의를 접수하시면, 마이페이지에서 문의/답변 내역 확인이 가능합니다.(단,정도경영 제외)"
                                    ],
                                },
                                InputWrapcont: {
                                    part1: {
                                        title: "제보자 정보",
                                        requiredText: "* 필수 입력사항",
                                        nameLabel: "이름",
                                        namePlaceholder: "",
                                        emailLabel: "이메일",
                                        emailOptions: [
                                            { value: 'naver.com', label: 'naver.com' },
                                            { value: 'gmail.com', label: 'gmail.com' }
                                        ],
                                        telLabel: "연락처",
                                        telOptions: '010',
                                    },
                                    part2: {
                                        title: "상담내용",
                                        categoryLabel: "구분",
                                        categoryOptions: [
                                            { value: 'store', label: '편의점/수퍼' },
                                            { value: 'home', label: '홈쇼핑' }
                                        ],
                                        storeLabel: "매장명",
                                        storeGuide: "* 단, 점포명을 모르시는 경우 점포위치를 적어주세요",
                                        subjectLabel: "제목",
                                        contentLabel: "내용",
                                        contentPlaceholder: "문의사항을 입력해주세요.",
                                        noticeText: "<span>※ 매장 관련 제보내용은 정확한 점포명을 작성해 주셔야 보다 원할한 답변을 받아보실수 있습니다.</span><span>※ 내용 입력 시 개인정보보호를 위해 연락처, 주소 등의 개인정보를 작성하지 않도록 주의 부탁드립니다.</span><span>※ 제보내용에 욕설이나 비속어가 포함되어 있으면 답변 되지 않을 수 있습니다.</span>",
                                        fileLabel: "파일첨부",
                                        fileNotice: "* 여러 개의 파일 업로드 시 zip파일로 압축하여 올려주세요 (*용량제한 20MB)",
                                        replyLabel: "회신방법",
                                        replyOptions: [
                                            { value: 'email', label: '이메일' },
                                            { value: 'sms', label: 'SMS' }
                                        ],
                                        btnSubmit: "신청",
                                        btnCancel: "취소"
                                    }
                                }
                                
                            }
                        },
                        // data() 리턴 객체 내 langData.ko.protect.informationprotection 섹션
                        informationprotection: {
                            Summary: "GS리테일은 정보보호 및 개인정보보호에 대해 매우 중요하게 생각합니다.<br/>전사 차원의 정보보호 거버넌스를 수립하여 운영하며,<br/>이를 통해 고객들에게 안전하고 신뢰성 있는 서비스를 제공하기 위해 항상 노력하고 있습니다.",
                            Governance: {
                                Title: "정보보호 및 개인정보보호 거버넌스 체계",
                                Desc: "GS리테일은 고객 개인정보 보호를 위해 CEO 직속의 거버넌스 체계를 운영하고 있습니다. CISO/CPO는 개인정보보호책임자 및 정보보호최고책임자로서 전사 개인정보 보호를 총괄하며, CISO/CPO 직속 조직을 통해 보안 전략 수립, 보안 기술 운영, 개인정보 보호 업무를 통합적으로 관리·수행하고 있습니다. 해당 조직은 보안전략, 보안기술, 개인정보보호의 3대 기능을 중심으로 전사 정보보호 및 개인정보 보호 체계를 일관되게 운영하고 있습니다.",
                                img: require("@/assets/images/dummy/gsrsu030305_1.png"),
                                imgMo: require("@/assets/images/dummy/mo/gsrsu030305_1_mo.png"),
                            },
                            Committee: {
                                Desc: "GS리테일은 중요 이슈를 관리하기 위해 정보보호위원회를 운영하고 있습니다. <br/>본 위원회는 CEO를 중심으로 각 BU장(임원)으로 구성된 전사 정보보호 및 개인정보보호 거버넌스 기구입니다. 간사 위원으로 CISO/CPO, 준법지원실장이 참여하며, 실무그룹과 정보보안부문이 연계되어 전사 정보보호 및 개인정보보호 거버넌스의 체계적 운영과 의사결정을 지원합니다.",
                                img: require("@/assets/images/dummy/gsrsu030305_2.png"),
                                imgMo: require("@/assets/images/dummy/gsrsu030305_2_mo.png"),
                                CommitteeImg: "gsrsu030305_2",
                                Notice: "이사회(ESG위원회) 정기보고" // 텍스트 수정 : 26.06.08 add 정다희 
                            },
                            Policy: {
                                Title: "정보보호 및 개인정보보호 정책",
                                Desc: "GS리테일은 정보보호 정책, 정보보호지침, 매뉴얼을 기반으로 개인정보보호 & 정보보안 활동을 정의하고 있으며, 이를 바탕으로 각종 활동을 수행합니다.<br/>사내 게시판 내 정책, 지침 및 매뉴얼을 게재하며, 매년 개인정보보호법 등 관련 법령의 개정을 확인하여 정책, 지침, 매뉴얼을 제·개정하고 있습니다. 또한 GS리테일은 홈페이지 내 ‘알기 쉬운 개인정보처리방침’을 게시하여, 고객의 정보를 보호하고 있는 당사의 방안을 투명하게 공개하고 있습니다.",
                                img: require("@/assets/images/dummy/gsrsu030305_3.png"),
                                imgMo: require("@/assets/images/dummy/mo/gsrsu030305_3_mo.png"),
                            },
                            Activities: {
                                Title: "정보보호활동",
                                Desc: "GS리테일은 정보보호 관리체계에 맞춰 실제 다양한 정보보호 활동을 수행하고 있으며, 정보보호 공시를 통해 이러한 활동을 안내하고 있습니다.",
                                Table: [
                                    { tit: "ISMS-P 인증", desc: "정보보호 및 개인정보보호 관리체계(ISMS-P) 인증을 유지하기 위해 관리,기술적 통제항목 등 다양한 정보보호 감사를 주기적으로 실시하고 있으며, 공신력 있는 기관을 통해 ISMS-P 인증심사를 수검 받고 있습니다." },
                                    { tit: "서비스 보안 검토", desc: "신규 및 변경되는 서비스에 대하여 개발보안 프로세스를 운영하고 있습니다. 서비스 기획 단계에서 중요도평가를 통해 보안요구사항을 정의하고 이를 프로젝트 각 단계에 반영하고 있으며, 오픈 전 보안요구사항에 맞도록 개인정보생명주기, 개발보안, 어플리케이션 보안, 소스코드 및 인프라점검, 웹/앱 취약점 점검 등 전반적인 보안점검을 수행하고 식별된 취약점에 대한 조치를 진행하고 있습니다." },
                                    { tit: "정보보호 교육", desc: "전사 임직원을 대상으로 개인정보보호 교육과, 정보보호 교육을 실시하고 있으며, 위치정보 및 다량의 개인정보를 취급하는 임직원 대상으로 별도의 심화교육을 실시하고 있습니다." },
                                    { tit: "정보보호 인식제고", desc: "임직원의 정보보호 인식을 향상시키기 위해 개인정보보호의 날·정보보호의 날 캠페인을 운영하며, 꼭 지켜야 하는 사항 등에 대해 정기 메일링을 진행하고 있습니다." },
                                    { tit: "모의훈련", desc: "임직원 대상으로 악성메일 모의훈련을 실시하여, 악성메일에 대한 보안인식을 향상시키고 있습니다. 또한, 개인정보 유·노출 사고에 대한 모의훈련을 실시하여, 실제 사고 발생 시 고객분들께 발생하는 개인정보침해를 줄이기 위해 노력하고 있습니다." },
                                    { tit: "위험관리", desc: "정보자산(인프라 등) 및 프로세스 등에서 발생하는 위험을 관리하기 위해 매년 취약점 점검 및 위험평가를 실시하고 있으며, 도출된 위험에 대해 관리할 수 있는 계획을 수립하여 운영하고 있습니다." }
                                ],
                                BtnText: "정보보호 공시 바로가기",
                                link:'https://isds.kisa.or.kr/kr/publish/list.do?pageNum=1&limit=10&type=ALL&keyword=%EC%A7%80%EC%97%90%EC%8A%A4%EB%A6%AC%ED%85%8C%EC%9D%BC&menuNo=204942'
                            },
                            Certification: {
                                Img: require("@/assets/images/dummy/gsrsu030305_logo.png"),
                                Title: "GS리테일 온라인 서비스",
                                date:"(2025.06.18 ~ 2028.06.17)",
                                Desc: "정보보호 관리체계 및 정보보호 활동의 적정성 및 적합성을 객관적으로 입증하기 위해, <br/>정보보호 및 개인정보보호 관리체계(ISMS-P) 인증을 획득하여, 운영하고 있습니다."
                            }
                        }


                    },
                },
                en: {
                    MainTitle: "Social Responsibility",
                    MainsubTitle: "Social responsibility",
                    aChannelVisual: "Partner company communication channel visual"/* 260708 번역 */,
                    phDirectInput: "Direct input"/* 260708 번역 */,
                    phSelectWorkplace: "Select workplace"/* 260708 번역 */,
                    phSelectReply: "Select reply method"/* 260708 번역 */,
                    capProtectList: "Information protection activity detail list"/* 260708 번역 */,
                    aIsmsp: "ISMS-P Certification"/* 260708 번역 */,
                    alertNoFile: "No file attached."/* 260708 번역 */,
                    // 1depth
                    Tabs1: [
                        { item: "Mutual Growth Management" }, 
                        { item: "Philanthropy Management" }, 
                        { item: "Rights and Interests Protection" }
                    ],
                    
                    // 2depth (상생경영 하위)
                    Tabs2_1: [
                        { item: "Overview" }, 
                        { item: "Partner Support Programs" }, 
                        { item: "Store Owner Support Programs" }, 
                        { item: "Community Participation Policy" },
                        { item: "Supply Chain Sustainability Management Policy" }
                    ],
                    // 3depth (파트너사 지원제도 하위)
                    Tabs3_1: [
                        { item: "Financial Support" }, 
                        { item: "Sales Channel Support" }, 
                        { item: "Competitiveness Enhancement Support" }, 
                        { item: "Welfare Programs" }, 
                        { item: "Broadcast Scheduling" }, 
                        { item: "Communication Programs" }
                    ],
                    // 3depth (경영주 지원제도 하위 - 신규 추가)
                    Tabs3_2: [
                        { item: "GS25 Store Owner Support Programs" }, 
                        { item: "GS THE FRESH Store Owner Support Programs" }
                    ],

                    // 2depth (나눔경영 하위)
                    Tabs2_2: [
                        { item: "Overview" }, 
                        { item: "Children and Socially Vulnerable Group Support" }, 
                        { item: "Community Support" }, 
                        { item: "Broadcasting Development" }, 
                        { item: "Hidden Sharing Angel" }
                    ],

                    // 2depth (권익보호 하위)
                    Tabs2_3: [
                        { item: "Human Rights Management" }, 
                        { item: "Talent Management" }, 
                        { item: "Customer Satisfaction Management" }, 
                        { item: "Safety Management" },
                        { item: "Information Security" }
                    ],
                    // 3depth (인재경영 하위)
                    Tabs3_3: [
                        { item: "Talent Model" }, 
                        { item: "Talent Development System" }, 
                        { item: "HR Management Indicators" }, 
                        { item: "HR Management Performance Data" }
                    ],
                    // 3depth (안전경영 하위)
                    Tabs3_4: [
                        { item: "Introduction to Safety Management"/* 260604 번역 */ }, 
                        { item: "Safety and Health Feedback Box" }, 
                    ],
                    WinWinIntro: {
                        Summary: "Here, you can learn about GS Retail's co-growth philosophy and implementation strategy.",
                        Philosophy: {
                            Title: "Co-Growth Philosophy",
                            Btn: "View Co-Growth Activities",
                            Items: [
                                { tit: "Win-Win", desc: "Win-Win Building a cooperative framework that benefits all parties, not at the expense of any one" },
                                { tit: "Trust", desc: "Trust Built on trust through constant communication and active listening"},
                                { tit: "Future-Oriented", desc: "Future-Oriented Pursuing sustainable growth over short-term, one-off gains"}
                            ]
                        },
                        Strategy: {
                            Title: "Implementation Strategy",
                            Cards: [
                                { num: "01", tit: "1. Establishing a Fair Trade Culture", list: ["- Compliance with fair trade laws and regulations", "- Proactive unfair trade prevention system", "- Provision of fair trading opportunities"] },
                                { num: "02", tit: "Substantive Business Support", list: ["- Financial support and early payment of fees", "- Operational capability support", "- Other welfare and benefits support"] },
                                { num: "03", tit: "Pursuit of Continuous Growth", list: ["- Expansion of joint product development", "- Brand marketing support", "- Introduction and operation of profit-sharing programs"] },
                                { num: "04", tit: "Open Communication", list: ["- Regular roundtable meetings", "- Cultural exchange (Family Day)", "- Partner satisfaction improvement"] }
                            ],
                            img: require("@/assets/images/dummy/gsrsu03010101_1.png"),
                            imgMo: require("@/assets/images/sub/gsrsu/gsrsu03010101_1_mo.png"),
                            alt: "Diagram of the Win-Win Growth Promotion Strategy"/* 260604 번역 */
                        },
                        Index: {
                            Title: "Win-Win Index",
                            SubTitle: "2023 Best in the Win-Win Growth Category"/* 260604 번역 */,
                            alt: "Highest grade in the Win-Win Growth Index"/* 260604 번역 */,
                        }
                    },
                    Partnersupport : {
                        Summary :"GS Retail fosters mutual growth with its partners through mutual growth management.<br />To this end, the following programs are in place.",
                        FinanceSupport: {
                            Summary: "GS Retail operates various financial support programs to strengthen the foundation for sustainable growth of its partners.",
                            Fund: {
                                Title: "Mutual Growth Fund",
                                Desc: "Mutual Growth Fund<br />A program that allows partners to obtain low-interest loans through the Mutual Growth Fund when they need emergency funds for business or operational purposes.",
                                ProcessTitle: "Application Procedure",
                                Steps: [
                                    { tit: "Referral Request (Partner → MD)" },
                                    { tit: "Referral Letter Preparation (MD)" },
                                    { tit: "Loan Application (GS Retail → Bank)" },
                                    { tit: "Loan Support (Loan executed after bank review)"}
                                ]
                            },
                            SubFunds: [
                                { 
                                    tit: "Mutual Growth Partner Loan", 
                                    img: require("@/assets/images/dummy/gsrsu0301010201_2.png"),
                                    desc: "This is a program that can ease the repayment burden of partner companies through a non-recourse accounts receivable-secured loan to the Partner Company."/* 260604 번역 */,
                                    desc2: "GS Retail's 1st, 2nd, and 3rd-tier partner companies<br>Annual rate: 0.60% + additional rate" 
                                },
                                { 
                                    tit: "Eco-Friendly Agriculture and Fishery Fund and Agri-Food Startup Idea Fund", 
                                    img: require("@/assets/images/dummy/gsrsu0301010201_3.png"),
                                    desc: "A program to support the agriculture and fishery food industry through financial assistance to startups and SMEs located in South Jeolla Province, following an MOU on eco-friendly agriculture and fishery loan support with the Jeonnam Centers for Creative Economy & Innovation." 
                                }
                            ],
                            Cards: [
                                { tit: "Network Loan and Family Loan", desc: "Network Loan and Family Loan Low-interest loans provided through an agreement with IBK Industrial Bank, using transaction records with partners, guarantees, and collateral as support or referrals" },
                                { tit: "Advance Payment", desc: "Advance Payment Advance payments provided to partners to support material procurement, supply stability, and equipment management at FF production facilities, including short-term financing" },
                                { tit: "Holiday Early Payment and 100% Cash Settlement /100% cash payment"/* 260604 번역 */, desc: "Holiday Early Payment and 100% Cash Settlement Early payment of goods fees and settlement amounts is made twice a year at major holidays to ensure smooth cash flow for partners and store owners" },
                                { tit: "Commission Refund Program", desc: "Commission Refund Program GS SHOP operates a program that refunds a portion of commissions collected from partner companies that fall short of quarterly performance targets" }
                            ]
                        }
                    },
                    MarketSupport: {
                        Marketing: {
                            Summary: "GS Retail operates various support programs to develop domestic and international sales channels for its partners.",
                            Title: "Marketing Support",
                            Desc: "Marketing Support<br />GS Retail independently secures brands with strong customer appeal, such as popular restaurants, TV programs, and celebrities, and provides free licensing of these brands to help enhance the competitiveness of products supplied by partner companies.",
                            Brands: [
                                { name: "Kim Hye-ja Lunch Box", img: require("@/assets/images/dummy/gsrsu0301010202_1.png") },
                                { name: "Omori", img: require("@/assets/images/dummy/gsrsu0301010202_2.png") },
                                { name: "YOUUS", img: require("@/assets/images/dummy/gsrsu0301010202_3.png") },
                                { name: "REAL Price", img: require("@/assets/images/dummy/gsrsu0301010202_4.png") }
                            ]
                        },
                        Programs: [
                            { 
                                tit: "Overseas Export Support", 
                                img: require("@/assets/images/dummy/gsrsu0301010202_2_1.png"),
                                desc: "Overseas Export Support<br />GS Retail supports its partner companies in expanding overseas exports through its global infrastructure and expertise. Exports range from GS Retail's own private-brand products to convenience store facilities and fixtures, earning the '3 Million Dollar Export Tower' award at the 2020 Trade Day ceremony." 
                            },
                            { 
                                tit: "Local Government MOU", 
                                img: require("@/assets/images/dummy/gsrsu0301010202_2_2.png"),
                                desc: "Local Government MOU<br />In pursuit of mutual growth with local farms, fishermen, and small and medium-sized partners, GS Retail has signed MOUs with various local governments including South Chungcheong Province, South Jeolla Province (13 cities and counties), and Miryang City, providing purchase commitments and sales channels for local agricultural, livestock, and fishery products." 
                            },
                            { 
                                tit: "Designated Farm and Regional Agricultural Products Promotional Events", 
                                img: require("@/assets/images/dummy/gsrsu0301010202_2_3.png"),
                                desc: "Designated Farm and Regional Agricultural Products Promotional Events<br />Through the operation of designated farms, farms receive a stable sales channel through GS Retail's established distribution network and can focus solely on cultivation and raising, while GS Retail is able to provide customers with more competitive products.<br />GS Retail supports mutual growth loans to reduce investment costs for designated farms, provides hygiene training, and regularly holds regional specialty product sales and promotional events to support and revitalize local farms." 
                            },
                            { 
                                tit: "Reduced Commission Broadcasts", 
                                img: require("@/assets/images/dummy/gsrsu0301010202_2_4.png"),
                                desc: "Reduced Commission Broadcasts<br />(TV Home Shopping and DATA Home Shopping)<br />GS SHOP supports new item pilot tests and inventory clearance of existing broadcast products through the 'I Love SMEs' program. Additionally, the 'Dream Store' program provides opportunities for new small business owners and micro-enterprises involved in mobile and internet sales to enter the home shopping market." 
                            }
                        ]
                    },
                    CompetencySupport: {
                        Summary: "GS Retail operates professional training programs and regular seminars to strengthen the competitiveness of its partner companies.",
                        Education: {
                            Title: "Training Support",
                            Desc: "Training Support<br />A program in which external training institutions and GS Retail's specialized departments regularly provide various training programs to enhance the job competencies of partner company employees.",
                            Table: {
                                Thead: ["Program Name", "Timing", "Key Content"],
                                Tbody: [
                                    { name: "Safety and Hygiene Training", period: "Semi-annually", desc: "Training on food hygiene law and origin management law to improve the quality management capabilities of food partner companies." },
                                    { name: "HACCP Academy", period: "Annually", desc: "A support program to enhance HACCP operational capabilities for small and medium PB partner companies through hygiene management and regulatory training, in support of mutual growth and safe product supply." },
                                    { name: "Partner Quality and Hygiene Inspection", period: "Annually", desc: "Pre-hygiene assessment conducted for partner companies supplying products to the Company, providing improvement coaching and consulting for identified deficiencies." },
                                    { name: "Freshness/Hygiene Management Coaching and Support", period: "At all times"/* 260604 번역 */, desc: "For Partner Companies that deliver goods to us, we conduct prior hygiene assessments to provide improvement, coaching, and consulting on deficiencies, and we continue to visit them even after they begin operations to carry out follow-up support activities related to freshness and hygiene management. In 2020, we conducted on-site training at 262 companies regarding freshness and 237 companies regarding hygiene."/* 260604 번역 */ }
                                ]
                            },
                            alt: "Training Support Process Diagram"/* 260604 번역 */,
                        },
                        Program: {
                            Title: "Quality and Productivity Competitiveness Enhancement Program",
                            Desc: "Quality and Productivity Competitiveness Enhancement Program<br />GS SHOP supports small and medium partner companies in strengthening their competitiveness in quality and productivity through test and analysis cost support, innovation partnership programs, industrial innovation activities, and CCM certification consulting support."
                        }
                    },
                    WelfareSupport: {
                        Summary: "We support welfare and benefit programs for Partner Companies."/* 260604 번역 */,
                        Football: {
                            Title: "Complimentary FC Seoul Football Match Tickets",
                            Desc: "Complimentary FC Seoul Football Match Tickets<br />A program that allows partner company employees to watch FC Seoul home games (Sangam Stadium) free of charge for team-building events or family outings. Up to 4 general admission tickets per person are available, limited to 20 tickets per game on a first-come, first-served basis.<br />Applications can be made through the responsible MD at least one week prior to the match."
                        }
                    },
                    BroadcastingSupport: {
                        Summary: "GS SHOP operates broadcast scheduling support programs for partner companies.",
                        PrepSupport: {
                            Title: "Broadcast Preparation Support",
                            Desc: "Broadcast Preparation Support<br />A program designed to ease the burden on partner companies that outsource broadcast preparation due to lack of experience, or that must prepare samples, displays, and other materials for every broadcast.<br />GS SHOP's experts support everything from product styling to display and panel production, helping to relieve the stress of broadcast preparation and contribute to sales growth."
                        },
                        PrioritySupport: {
                            SubItems: [
                                {
                                    Title: "SME Broadcast Scheduling Priority",
                                    Desc: "SME Broadcast Scheduling Priority<br />GS SHOP prioritizes SMEs in broadcast scheduling across all programming to support their stable growth.<br />Across both TV home shopping and data home shopping, the proportion of SME products in the broadcast lineup is expanded to support continuous channel access and sales growth.<br />GS SHOP also operates a program that gives priority scheduling to SME products during prime time, when customer traffic is highest, providing SME products with more effective exposure to customers. This helps strengthen SME market competitiveness and foster mutual growth."
                                },
                                {
                                    Title: "Free Sales Broadcasts for SMEs",
                                    Desc: "Free Sales Broadcasts for SMEs<br />GS SHOP operates free sales broadcasts to support smooth market entry and sales channel expansion for SMEs.<br />By alleviating the burden of broadcast production and scheduling, GS SHOP provides SME products with opportunities to be introduced to customers, thereby supporting the establishment of a stable growth foundation for SMEs."
                                },
                                {
                                    Title: "Insert Video Production Support",
                                    Desc: "Insert Video Production Support<br />To lower the barriers for SMEs entering home shopping, GS SHOP covers insert video production costs for new SME partner companies."
                                }
                            ]
                        }
                    },
                    CommunicationSupport: {
                        Summary: "GS Retail operates communication programs that create diverse forums for dialogue and exchange, gathering and actively addressing the concerns and suggestions of small and medium-sized partner companies.",
                        Title: "Key Programs",
                        Table: {
                            Thead: ["Program Name", "Timing", "Key Content"],
                            Tbody: [
                                { name: "Partner Roundtable", period: "Quarterly", desc: "A communication program in which the MD team leader facilitates discussions on product policy directions, tailored to the issues of each period and industry sector" },
                                { name: "YOUUS Day", period: "Annually", desc: "A cultural exchange program where all GS Retail MDs and partner company employees engage in outdoor group activities to foster harmony and unity" },
                                { name: "Best Partner Company Award Ceremony", period: "Annually", desc: "A program recognizing partner companies that have cooperated and grown alongside GS Retail throughout the year, expressing gratitude and celebrating their efforts" }
                            ]
                        }
                    },
                    OwnerSupport: {
                        Summary: "GS Retail operates various mutual growth programs for mutual development with store owners.",
                        // 모든 본문 콘텐츠를 part_1으로 통합
                        part_1: {
                            Summary: "These are support programs to facilitate smooth store operations for GS25 store owners.",
                            MainTitle: "GS25 Store Owner Support Programs",
                            // 인센티브 카드 데이터
                            Features: [
                                { num: "01", tit: "Sales Profit Incentive Program", desc: "Fresh Food / FF Convenience Meals / Fresh / Chicken25" },
                                { num: "02", tit: "Competitiveness Enhancement Incentive Program", desc: "Assortment enhancement incentives, profit improvement incentives, and service enhancement incentives"/* 260604 번역 */ },
                                { num: "03", tit: "Congratulations and Condolences Support Program", desc: "Congratulatory and condolence money, store operation support funds, funeral supplies, childbirth supplies, and discretionary leave for family events"/* 260604 번역 */ },
                                { num: "04", tit: "Win-Win Support Insurance", desc: "Safety Accident Insurance, Embezzlement Insurance, Delivery Theft Insurance, Cash Theft Insurance, Property Comprehensive Insurance" },
                                { num: "05", tit: "Long-Term Operation Benefits", desc: "10-Year, 20-Year, 30-Year" },
                                { num: "06", tit: "Outstanding Store Owner Awards", desc: "- Benefits for Outstanding Stores" },
                                { num: "07", tit: "Free Legal and Labor Consultation", desc: "Free legal consultation with an attorney, labor consultation call center operation" },
                                { num: "08", tit: "Store Owner Welfare and Partnership Benefits", desc: "Win-Win Loans, store owner welfare mall, comprehensive health checkup discounts, Angel Resort, Angel Rent-a-Car (long-term/used cars)"/* 260604 번역 */ }
                            ],
                            Notice: "※ The above benefits and programs are subject to change, discontinuation, or addition without prior notice.",
                            
                            // 기타 상세 제도 데이터
                            OtherTitle: "Other Programs",
                            OtherItems: [
                                {
                                    tit: "Store Owner Benefits Portal",
                                    desc: "The Store Owner Benefits Portal is a benefits platform for GS25 store owners, offering daily necessities at prices lower than Korea's top five online shopping platforms.<br />Additional discounts on travel, accommodation, and more are also available through affiliated partners.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1.png")
                                },
                                {
                                    tit: "Welfare and Benefits",
                                    desc: "Support programs are available for funeral supplies and health screenings at discounted prices, along with Congratulations and Condolences support, to provide comprehensive welfare and benefit coverage for store owners.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_2.png")
                                },
                                {
                                    tit: "Store Owner Open Suggestion",
                                    desc: "By accepting various suggestions and ideas from store owners, GS Retail listens to real on-site voices and reflects improvements in store operations and headquarters policies.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_3.png")
                                }
                            ]
                        },
                        // GS THE FRESH 데이터 (part_2로 신규 추가)
                        part_2: {
                            Summary: "These are support programs to facilitate smooth store operations for GS THE FRESH store owners.",
                            MainTitle: "GS THE FRESH Store Owner Support Programs",
                            Items: [
                                {
                                    tit: "Minimum Revenue Guarantee",
                                    desc: "Based on the conditions at the time of the contract, the Company provides a minimum revenue guarantee through headquarters support funds to guarantee a minimum income to store owners for a set period from the opening date.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1_1.png")
                                },
                                {
                                    tit: "Other Operational Support Programs",
                                    desc: "For underperforming stores, the headquarters carries out 'underperforming store care activities', and where settlement support is needed due to trade area characteristics or various issues, a 'new store early settlement support fund' is operated for specific stores. Additionally, where necessary, support funds are provided to improve sales at transferred stores, and an annual franchise support program is established and operated.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1_2.png")
                                },
                                {
                                    tit: "Welfare and Benefits",
                                    desc: "Upon a life event (marriage or bereavement of the actual franchise store owner), Congratulations and Condolences allowances and flower wreaths are provided.",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1_3.png")
                                },
                                {
                                    tit: "Store Manager (Staff) Job Posting Insight Support",
                                    desc: "Dedicated Banner Service for GS THE FRESH (Albachunguk)",
                                    img: require("@/assets/images/dummy/gsrsu03010103_1_4.png")
                                }
                            ]
                        }
                    },
                    community: {
                        Summary: "GS Retail has established guidelines aimed at revitalizing local economies and laying the foundation for community growth.",
                        Purpose: {
                            Title: "Purpose of the Community Participation Policy",
                            Items: [
                                { num: "01", desc: "01. Building a cooperative model through community-linked activities" },
                                { num: "02", desc: "02. Strengthening relationships with diverse stakeholders, including local SMEs, startups, and small markets" },
                                { num: "03", desc: "03. Supporting the resolution of key community issues" }
                            ],
                            BtnText: "View Full Text >"
                        },
                        Goal: {
                            Title: "Goals of the Community Participation Policy",
                            DiagramImg: require("@/assets/images/dummy/gsrsu03010104_diagram.png"),
                            DiagramImgMo: require("@/assets/images/dummy/mo/gsrsu03010104_diagram_mo.png"),
                            Items: [
                                { num: "01", desc: "01. Inspire customer participation and spread a positive influence." },
                                { num: "02", desc: "02. Engage with community issues and strive to support their resolution." },
                                { num: "03", desc: "03. Develop programs with investment in future generations in mind." }
                            ],
                            alt: "Diagram of the objectives of the Community Engagement Policy"/* 260604 번역 */,
                        }
                    },
                    supplychain: {
                        Summary: "GS Retail has established and is implementing a Supply Chain Sustainability Management Policy to improve the ESG capabilities and competitiveness of the supply chain, as well as to manage sustainability-related risks and opportunities.",
                        // 공급망 지속가능성 관리 방침
                        Policy: {
                            Title: "Supply Chain Sustainability Management Policy",
                            Items: [
                                { label: "One"/* 260604 번역 */, desc: "We will comply with fair trade principles to conduct fair and transparent transactions."/* 260604 번역 */ },
                                { label: "Two"/* 260604 번역 */, desc: "To enhance the sustainability of the supply chain, we will strive to strengthen supply chain capabilities through support for shared growth programs, including ESG education and consulting."/* 260604 번역 */ },
                                { label: "Three"/* 260604 번역 */, desc: "To strengthen supply chain procurement competitiveness, we will reinforce green purchasing based on our green purchasing policy and continuously identify excellent suppliers."/* 260604 번역 */ },
                                { label: "Four"/* 260604 번역 */, desc: "We will regularly assess the sustainability of our supply chain and, by providing guidelines, support the supply chain and manage risks."/* 260604 번역 */ },
                                { label: "Five"/* 260604 번역 */, desc: "We will strengthen communication through measures such as holding Partner Company meetings and operating an anonymous reporting channel for smooth communication with the supply chain."/* 260604 번역 */ }
                            ],
                            BtnText: "View Full Text >"
                        },
                        // 공급망 지속가능성 관리 체계
                        System: {
                            Title: "Supply Chain Sustainability Management System",
                            DiagramImg: require("@/assets/images/dummy/gsrsu03010105.png"),// 요청하신 파일명 적용
                            DiagramImgMo : require("@/assets/images/dummy/mo/gsrsu03010105_mo.png"),
                            alt: "Supply Chain Sustainability Management System R&R Diagram"/* 260604 번역 */
                        }
                    },
                    CSR: {
                        outline: {
                            Summary: "GS Retail fulfills its social responsibilities and fosters a culture of everyday sharing through ongoing goals that contribute to the community and the environment.",
                            Strategy: {
                                Title: "Social Contribution Strategy",
                                Vision: "Vision: Give & Share, An Everyday Sharing Platform",
                                Mission: "Mission: Creating Sustainable Social Value through the Retail Platform",
                                DiagramImg: require("@/assets/images/dummy/gsrsu030201.png"),
                                DiagramImgMo: require("@/assets/images/dummy/mo/gsrsu030201_mo.png"),
                                alt: "Diagram of the Social Contribution Strategy"/* 260604 번역 */,
                                VisionLabel:"Vision"/* 260604 번역 */,
                                MissionLabel:"Mission"/* 260604 번역 */
                            },
                            HistoryTitle: "Milestones",
                            /* 260624 edit 이소라 */
                            History: [ 
                                {
                                    year: "2025",
                                    items: [
                                        "Leukemia and childhood cancer patient treatment support program (2025~)",
                                        "Eco Creator (2019~2025)",
                                        "Eco Social Impact (2017~2025)",
                                        "Food supply support for food desert areas (2024~)",
                                        "Support program for children of migrant backgrounds (2024~)",
                                        "Family Psychological Support Project for Low-Income Abused Children (2022–2024)"/* 260604 번역 */,
                                        "Happy Start Support Project for Youth Preparing for Independence (2022–2024)"/* 260604 번역 */,
                                        "GS25 AED (Automated External Defibrillator) installation (2022)",
                                        "Sharing Kit support (2020~)",
                                        "Upcycling Friend Campaign (2021~)",
                                        "Blanket of Love donation (2022)",
                                        "Mask of Love donation (2020)",
                                    ]
                                },
                                {
                                    year: "2019",
                                    items: [
                                        "Rice Cake Soup of Love donation (2019)",
                                        "GS25 Neulbom Store opening (disability training-type store, 2017~)",
                                        "GS25 Naeil Store opening (community-serving convenience store supporting neighbors who have difficulty finding employment, 2017~)",
                                        "Independence Army Awareness Lunchbox (2017~)",
                                        "GS Child Safety Guardian and GS Safety Guardian CPR education",
                                        "Hearts Together Fund community children's center meal support (2016~)",
                                        "Overseas volunteering (2016~2017)",
                                        "Coal Briquette of Love donation (2016~2024)",
                                        "Low-income burn patient support (2015~)",
                                        "Sharing Store goods support (2013~)",
                                        "Kimchi of Love donation (2013~)",
                                        "Social enterprise distribution channel support project (2013~2023)",
                                        "FC Seoul multicultural family children's soccer school support (2013~)",
                                        "Book Dream book donation campaign (2012~2024)"
                                    ]
                                },
                                {
                                    year: "2011",
                                    items: [
                                        "Blood donation certificate leukemia and childhood cancer patient support",
                                        "Food bank donation (2011~)",
                                        "Taean oil spill accident support (2008)",
                                        "Scholarship and kit support (2007~)"
                                    ]
                                },
                                {
                                    year: "2006",
                                    items: [
                                        "GS Nanumi Volunteer Corps established (2006~)",
                                        "Rainbow Box children's music education program (2006~)",
                                        "Disaster and Emergency Relief support process established",
                                        "Korean Red Cross blood donation agreement signed"
                                    ]
                                }
                            ]
                        },
                        vulnerable: {
                            Summary: "GS Retail supports the self-reliance of children, youth, people with disabilities, and elderly people living alone, while fulfilling its role as a safety platform.",
                            // 주요 사업 리스트 (2열 그리드 활용)
                            Projects: [
                                { 
                                    tit: "Rainbow Box Orchestra", 
                                    desc: "Through music education, we support various activities to bridge the cultural gap for children from vulnerable groups and to enhance their emotional support and self-esteem."/* 260604 번역 */,
                                    img: require("@/assets/images/dummy/gsrsu030202_1.png")
                                },
                                { 
                                    tit: "Support for children with leukemia and childhood cancer"/* 260604 번역 */, 
                                    desc: `We support "Dream On" activities to assist children with leukemia and childhood cancer and their families. These include medical expense support (Dream On Care), congratulatory gifts for a fresh start (Dream On Step), and psychological and emotional recovery support for children and their families (Dream On Day). These are recovery support activities that accompany children with childhood cancer on their journey of treatment, recovery, and hope.`/* 260604 번역 */,
                                    img: require("@/assets/images/dummy/gsrsu030202_2.png")
                                },
                                { 
                                    tit: "Firefighters' Hope-Sharing Calendar"/* 260604 번역 */, 
                                    desc: "We sell a calendar featuring images of healthy firefighters and use the proceeds to support treatment costs for the recovery of daily life of burn patients."/* 260604 번역 */,
                                    img: require("@/assets/images/dummy/gsrsu030202_3.png")
                                },
                                { 
                                    tit: "FC Seoul Multicultural Family Children's Soccer School", 
                                    desc: "FC Seoul Multicultural Family Children's Soccer School<br />GS Retail carries out various support activities, including a soccer school and meal support, to help children from multicultural families grow up in a healthy environment.",
                                    img: require("@/assets/images/dummy/gsrsu030202_4.png")
                                }
                            ],
                            // 주요 협력기관 (3열 그리드 활용)
                            Partners: {
                                Title: "Key Partner Organizations",
                                Items: [
                                    { name: "Korea Food for the Hungry International"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030202_logo_1.png") },
                                    { name: "Seoul Metropolitan Fire and Disaster Headquarters"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030202_logo_2.png") },
                                    { name: "Hallym Burn Foundation (Social Welfare Corporation)"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030202_logo_3.png") }
                                ]
                            }
                        },
                        communitysupport: {
                            Summary: "GS Retail fosters a culture of sharing through community volunteering, donations, and social enterprise support.",
                            // 2열 그리드 활용 (기존 program_grid 스타일 재활용)
                            /* 20260624 edit 이소라 */
                            Projects: [
                                { 
                                    tit: "GS Nanumi Volunteer Service", 
                                    desc: "Since 2006, employees, store owners, and customers have been practicing sharing together at over 30 volunteer centers nationwide.",
                                    img: require("@/assets/images/dummy/gsrsu030203_1.png") 
                                },
                                { 
                                    tit: "Executive and employees Volunteer Service at National Cemetery",  
                                    desc: "Every year-end, volunteer groups across the country take part in relay volunteering to share a united spirit of warmth for the winter season.",
                                    img: require("@/assets/images/dummy/gsrsu030203_2.png") 
                                },
                                { 
                                    tit: "Year-End Theme Volunteer Service", 
                                    desc: "Every year-end, volunteer groups across the country take part in relay volunteering to share a united spirit of warmth for the winter season.",
                                    img: require("@/assets/images/dummy/gsrsu030203_3.png") 
                                },
                                { 
                                    tit: "Food Bank Donation", 
                                    desc: "GS THE FRESH food donations are provided through food banks to support warm meals for neighbors in need.",
                                    img: require("@/assets/images/dummy/gsrsu030203_4.png") 
                                },
                                { 
                                    tit: "CPR Training and AED Support", 
                                    desc: "To protect precious lives in emergency situations, employees voluntarily participate in CPR training and, in collaboration with the Korean Red Cross, provide AED units and experiential education vehicles.",
                                    img: require("@/assets/images/dummy/gsrsu030203_5.png") 
                                },
                                { 
                                    tit: "Hearts Together Fund", 
                                    desc: "Through a matching grant system where the company donates an equal amount to employee contributions, we provide fresh food and fruits for a 'hearty meal' to underprivileged children suffering from nutritional deficiencies.",
                                    img: require("@/assets/images/dummy/gsrsu030203_6.png") 
                                },
                                { 
                                    tit: "Blood Donation Campaign", 
                                    desc: "Every year, we conduct a blood donation campaign to provide warm support for patients with leukemia, childhood cancer, and more.",
                                    img: require("@/assets/images/dummy/gsrsu030203_7.png") 
                                },
                                { 
                                    tit: "Disaster and Emergency Relief Support", 
                                    desc: "In the event of a disaster or emergency, GS Retail ensures that emergency relief supplies are delivered to affected residents as quickly as possible.",
                                    img: require("@/assets/images/dummy/gsrsu030203_8.png") 
                                }
                            ],
                            // 주요 협력기관 (brand_grid 스타일 재활용)
                            Partners: {
                                Title: "Key Partner Organizations",
                                Items: [
                                    { name: "Deungchon 9 Community Welfare Center"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030203_logo_1.png") },
                                    { name: "Seoul SOS Children's Village"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030203_logo_10.png") },
                                    { name: "Holt Ilsan Welfare Town/Nursing Home"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030203_logo_3.png") },
                                    { name: "", img: require("@/assets/images/dummy/gsrsu030203_logo_4.png") },
                                    { name: "Food Bank"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030203_logo_5.png") },
                                    { name: "Korean Red Cross"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030203_logo_6.png") },
                                    { name: "Beautiful Store", img: require("@/assets/images/dummy/gsrsu030203_logo_8.png") },
                                    { name: "Korea Childhood Leukemia & Cancer Association"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030203_logo_9.png") }
                                ]
                            }
                        },
                        broadcasting: {
                            Summary: "Through media access support and talent development, GS Retail leads public service broadcasting and a responsible media culture.",
                            Projects: [
                                { 
                                    tit: "Media Sharing Bus Outreach Program", 
                                    desc: `Media Sharing Bus Outreach Program<br />GS Retail supports the operation of the "Media Sharing Bus Outreach," a mobile studio vehicle equipped with broadcast production facilities and equipment, to provide media education for residents of remote island and mountainous areas, as well as vulnerable groups including the elderly and people with disabilities.`,
                                    img: require("@/assets/images/dummy/gsrsu030204_1.png")
                                },
                                { 
                                    tit: "Content Leader Scholarship and Consumer Leader Scholarship Support", 
                                    desc: "Content Leader Scholarship and Consumer Leader Scholarship Support<br />GS SHOP provides Content Leader Scholarships and Consumer Leader Scholarships to support the development of future talent who will be active in the broadcasting sector and in the field of consumer rights protection.",
                                    img: require("@/assets/images/dummy/gsrsu030204_2.png")
                                }
                            ],
                            Partners: {
                                Title: "Key Partner Organizations",
                                Items: [
                                    { name: "Korea Communications Agency (Viewer Media Foundation)"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrsu030204_logo_1.png") },
                                    { name: "KCOP", img: require("@/assets/images/dummy/gsrsu030204_logo_2.png") }
                                ]
                            }
                        },
                        sharing: {
                            Summary: "Here, we share the warm stories of GS Retail's Hidden Sharing Angels.",
                            List: [
                                {
                                    tit: "Woo-jeong Park, Store Manager at GS25 Myeongnyun Anam Branch",
                                    desc: "Woo-jeong Park, Store Manager at GS25 Myeongnyun Anam Branch<br />Introducing Woo-jeong Park, Store Manager at GS25 Myeongnyun Anam Branch, who saved a life through quick judgment and decisive action.",
                                    date: "2026.02.22",
                                    badge: "GS25",
                                    img: require("@/assets/images/dummy/gsrsu030205_1.png")
                                },
                                {
                                    tit: "GS THE FRESH Sanggye Store, Manager Kim Jun-young"/* 260604 번역 */,
                                    desc: "Jun-young Kim, Manager at GS THE FRESH Sanggye Branch<br />Introducing Jun-young Kim, Manager at GS THE FRESH Sanggye Branch, who saved a life through quick judgment and decisive action.",
                                    date: "2026.02.22",
                                    badge: "GS THE FRESH",
                                    img: require("@/assets/images/dummy/gsrsu030205_2.png")
                                },
                                {
                                    tit: "Chan-yong Woo, Team Leader, CVS Division 1 Region 4 Development Team 2",
                                    desc: "Introducing Chan-yong Woo, Team Leader at CVS Division 1 Region 4 Development Team 2, who carried out two acts of goodwill through courageous action.",
                                    date: "2026.02.22",
                                    badge: "GS25",
                                    img: require("@/assets/images/dummy/gsrsu030205_3.png")
                                },
                                {
                                    tit: "Dong-heum Oh, Team Leader, Supermarket Business Division Franchise Team 4",
                                    desc: "Dong-heum Oh, Team Leader, Supermarket Business Division Franchise Team 4<br />Introducing Dong-heum Oh, Team Leader at Supermarket Business Division Franchise Team 4, who rescued an elderly person trapped at home in sweltering heat for an extended period.",
                                    date: "2026.02.22",
                                    badge: "GS THE FRESH",
                                    img: require("@/assets/images/dummy/gsrsu030205_4.png")
                                },
                                {
                                    tit: "Seung-yong Yang, Deputy Branch Manager at GS THE FRESH Anyang Megatria Branch",
                                    desc: "Seung-yong Yang, Deputy Branch Manager at GS THE FRESH Anyang Megatria Branch<br />Introducing Seung-yong Yang, Deputy Branch Manager at GS THE FRESH Anyang Megatria Branch (Supermarket Business Division Direct Operations Team 3), who saved a life through quick judgment and decisive action.",
                                    date: "2026.02.22",
                                    badge: "GS THE FRESH",
                                    img: require("@/assets/images/dummy/gsrsu030205_5.png")
                                },
                                {
                                    tit: "Seung-yong Yang, Deputy Branch Manager at GS THE FRESH Anyang Megatria Branch",
                                    desc: "Seung-yong Yang, Deputy Branch Manager at GS THE FRESH Anyang Megatria Branch<br />Introducing Seung-yong Yang, Deputy Branch Manager at GS THE FRESH Anyang Megatria Branch (Supermarket Business Division Direct Operations Team 3), who saved a life through quick judgment and decisive action.",
                                    date: "2026.02.22",
                                    badge: "GS THE FRESH",
                                    img: require("@/assets/images/dummy/gsrsu030205_6.png")
                                }
                            ]
                        }
                    },
                    protect: {
                        humanrights: {
                            Summary: "GS Retail will respect the human rights of not only its employees but also all stakeholders, guaranteeing the value and dignity of every person.",
                            Policy: {
                                Title: "GS Retail Human Rights Management Policy",
                                Desc: `GS Retail Human Rights Management Policy<br />GS Retail supports and complies with the Universal Declaration of Human Rights, the 10 Principles of the UN Global Compact (UNGC), and domestic and international labor and human rights standards and guidelines, and will make every effort to prevent and address all human rights-related issues that may arise in the course of the Company's business operations.<br />To this end, GS Retail has established a Human Rights Management Policy to practice respect for the human rights of all stakeholders, including not only employees but also partner companies.<br />In addition, for partner companies, human rights-related matters are incorporated into the "Partner Company Code of Conduct" to enable them to advance human rights management.`,
                                BtnText: "View Full Text >"
                            },
                            Goals: {
                                Title: "Creating a Great Place to Work: Employee Human Rights Goals",
                                Items: [
                                    { num: "01", desc: "1. We create a joyful and fulfilling workplace." },
                                    { num: "02", desc: "2. We create a work environment where everyone is respected without discrimination." },
                                    { num: "03", desc: "3. We provide a supportive and inclusive working environment for employees with disabilities, vulnerable workers, and female and pregnant workers." },
                                    { num: "04", desc: "4. Through a flat organizational culture, GS Retail respects everyone's right to speak up and share their opinions." }
                                ]
                            },
                            Programs: {
                                Title: "Human Rights Violation Prevention Programs",
                                Items: [
                                    { tit: "Internal Reporting System (Anonymous Reporting)", img: require("@/assets/images/dummy/gsrsu030301_1.png") },
                                    { tit: "Grievance Counseling Center", img: require("@/assets/images/dummy/gsrsu030301_2.png") },
                                    { tit: "Disability Vocational Training Store", img: require("@/assets/images/dummy/gsrsu030301_3.png") },
                                    { tit: "Organizational Capability Survey", img: require("@/assets/images/dummy/gsrsu030301_4.png") },
                                    { tit: "Blind Recruitment", img: require("@/assets/images/dummy/gsrsu030301_5.png") },
                                    { tit: "Prohibition of Child Employment (Labor)", img: require("@/assets/images/dummy/gsrsu030301_6.png") },
                                    { tit: "Small Love Sharing Society", img: require("@/assets/images/dummy/gsrsu030301_7.png") },
                                    { tit: "Psychological Counseling (EAP)", img: require("@/assets/images/dummy/gsrsu030301_8.png") }
                                ]
                            },
                            Assessment: {
                                Title: "Human Rights Impact Assessment",
                                Desc: "GS Retail has been conducting human rights impact assessments for employees since 2021, identifying the current status and areas for improvement, and striving to implement immediate improvements.<br />In addition, GS Retail provides human rights-related employee training and will continue to collaborate to expand human rights impact assessments to cover all stakeholders.",
                                img: require("@/assets/images/dummy/gsrsu030301_2_1.png"),
                                alt: "Human Rights Impact Assessment"
                            }
                        },
                        talentmanagement: {
                            part_1:{
                                Summary: "Value No.1: This is the profile of the talent GS Retail seeks to work alongside.",
                                MainTitle:`"Talent Who Excels at Embodying GS Values and Ways"`,
                                Description: "the profile of the talent who will join GS Retail, and<br/> In order to realize the dreams of our employees, we are realizing talent management."/* 260604 번역 */,
                                Philosophy: {
                                    Items: [
                                        { tit: "GS Value", sub: "Our Values"/* 260604 번역 */, desc: "Fair, Friendly, Fresh, Fun" },
                                        { tit: "GS Way", sub: "Our Way of Working"/* 260604 번역 */, desc: "Customer First, Growth Mindset, Open Communication, and AX Execution Capability"/* 260604 번역 */ }
                                    ]
                                },
                                Details: {
                                    Value: [
                                        { tit: "Fair", desc: "We uphold fairness and\ncontribute to society and the environment."/* 260604 번역 */ },
                                        { tit: "Friendly", desc: "We recognize diversity and\nrespect one another."/* 260604 번역 */ },
                                        { tit: "Fresh", desc: "By encouraging creativity and challenge,\nthe company and individuals grow together."/* 260604 번역 */ },
                                        { tit: "Fun", desc: "Fun – We enjoy our work in a flexible and autonomous environment" }
                                    ],
                                    Way: [
                                        { tit: "Customer First", list: ["# Every aspect of our work begins and ends with the customer.", "# For our customers, we always look for a way to make it work."] },
                                        { tit: "Growth Mindset", list: ["# We start small, move fast, and build on every success.", "# We pursue growth and continuous improvement every day."] },
                                        { tit: "Open Communication", list: ["# We get on the same page by sharing clear goals and progress.", "# We debate passionately and deliver as One Team."] },
                                        { tit: "AX Execution", list: ["# We let data guide both our reasoning and our decisions.", "# We continuously improve how we work through digital and AI tools."] }
                                    ]
                                },
                                Efforts: [
                                    "Employee safety and health are the top priority,",
                                    "Talent development through training programs,",
                                    "Mutual consideration and healthy competition grounded in respect for human rights,",
                                    "Fostering pride through the highest level of treatment and various welfare and benefit support, etc.<br/> We are realizing talent management."/* 260604 번역 */
                                ],
                                alt: "Talent Management Meeting"/* 260604 번역 */, 
                            },
                            part_2:{
                                Summary: "GS Retail systematically strengthens core competencies (job skills, leadership, the GS Way, and onboarding), and<br/>We operate a talent development system that supports the growth of our members."/* 260604 번역 */,
                                MainTitle: "GS Talent Development System"/* 260604 번역 */,
                                DiagramImg: require("@/assets/images/dummy/gsrsu03030202.png"),
                                DiagramAlt: "GS Talent Development System Diagram"/* 260604 번역 */,
                                Cards: [
                                    {
                                        num: "01",
                                        tit: "1. Job Competency",
                                        desc: "By expanding the expertise and practical capabilities necessary for performing duties,<br/>and helps individuals achieve systematic growth in their job competencies."/* 260604 번역 */,
                                        list: ["Job Academy and GenAI Academy", "Job Growth Plan (My Growth Plan preparation)"]
                                    },
                                    {
                                        num: "02",
                                        tit: "2. Leadership Competency",
                                        desc: "We support leaders in understanding the potential of their members and in developing leadership that grows together based on trust and cooperation."/* 260604 번역 */,
                                        list: [
                                            "Team Leader Leadership School"/* 260604 번역 */,
                                            "BOLD Leader / BOLD Manager Program"/* 260604 번역 */,
                                            "Organizational leader leadership workshops, executive/team leader leadership diagnosis and feedback"/* 260604 번역 */
                                        ]
                                    },
                                    {
                                        num: "03",
                                        tit: "GS Way Internalization",
                                        desc: "Employees gain a deep understanding of GS Retail's core values as a common standard and learn the execution capabilities to practice them consistently across their work."/* 260604 번역 */,
                                        list: ["GS Way Internalization Training Program (leaders and members)", "GS Way On-the-Job Application Learning (Post Learning) and Work Application Workshop"/* 260604 번역 */]
                                    },
                                    {
                                        num: "04",
                                        tit: "Onboarding",
                                        desc: "members at each position and career stage understand the organization and their roles, and<br/>We provide support so that a starting point for growth can be formed."/* 260604 번역 */,
                                        list: [
                                            "Onboarding programs for new executives/new team leaders/new employees/experienced hires"/* 260604 번역 */,
                                            "New employee and experienced hire retention programs",
                                            "GS Group new employee program"
                                        ]
                                    },
                                    {
                                        num: "05",
                                        tit: "Self-Directed Learning",
                                        desc: "so that members can learn on their own and continuously grow,<br/>We provide learning infrastructure and institutional support."/* 260604 번역 */,
                                        list: ["Naeil-On (online training academy) / Company-wide insight special lectures", "Self-directed learning, language, certification, and external course support programs"]
                                    }
                                ]
                            },
                            part_3: {
                                Summary: "GS Retail values its talent and operates a variety of programs for its people.",
                                Sections: [
                                    {
                                        title: "Work",
                                        desc: "GS Retail provides the best environment and resources to enable all members to fully focus on work and growth.",
                                        items: [
                                            { num: "01", tit: "Language support"/* 260604 번역 */, desc: "We support language learning costs for our members' self-development."/* 260604 번역 */ },
                                            { num: "02", tit: "Certification support"/* 260604 번역 */, desc: "In order to cultivate job experts, we support the costs incurred in studying for certifications."/* 260604 번역 */ },
                                            { num: "03", tit: "Operation of shuttle/commuter buses"/* 260604 번역 */, desc: "We support a safe and convenient commute for our members."/* 260604 번역 */ },
                                            { num: "04", tit: "Long-distance allowance"/* 260604 번역 */, desc: "Where the actual work location is more than a certain distance from one's hometown, we provide a portion of housing expenses."/* 260604 번역 */ },
                                            { num: "05", tit: "Mobile communication expense support"/* 260604 번역 */, desc: "We support mobile communication expenses for members who frequently make business calls."/* 260604 번역 */ },
                                            { num: "06", tit: "Staggered working hours system"/* 260604 번역 */, desc: "For work engagement and work-life balance, we flexibly adjust commuting hours."/* 260604 번역 */ }
                                        ]
                                    },
                                    {
                                        title: "Engagement",
                                        desc: "GS Retail provides unwavering support so that all members can work with pride and demonstrate their capabilities.",
                                        items: [
                                            { num: "01", tit: "Employee Discount: Exclusive employee discounts are offered at GS Home Shopping and GS THE FRESH for all members.", desc: "Employee Discount: Exclusive employee discounts are offered at GS Home Shopping and GS THE FRESH for all members." },
                                            { num: "02", tit: "Congratulatory Gifts: Birth celebration gifts and multi-child birth congratulatory allowances are provided.", desc: "Congratulatory Gifts: Birth celebration gifts and multi-child birth congratulatory allowances are provided." },
                                            { num: "03", tit: "Holiday Gifts: GS Retail provides generous support to help members enjoy a plentiful and happy holiday season.", desc: "Holiday Gifts: GS Retail provides generous support to help members enjoy a plentiful and happy holiday season." },
                                            { num: "04", tit: "Psychological Counseling Support: Employee psychological counseling is provided to support members' mental wellness.", desc: "Psychological Counseling Support: Employee psychological counseling is provided to support members' mental wellness." },
                                            { num: "05", tit: "Long-Service Award: Awards and leave are provided to long-serving members as a token of appreciation.", desc: "Long-Service Award: Awards and leave are provided to long-serving members as a token of appreciation." }
                                        ]
                                    },
                                    {
                                        title: "Life",
                                        desc: "GS Retail supports a better tomorrow for members to achieve work-life harmony and enjoy a fulfilling life.",
                                        items: [
                                            { num: "01", tit: "Childcare and Kindergarten Subsidy, Children's Tuition Support: The children of our members are our future. GS Retail cares for and supports them together.", desc: "Childcare and Kindergarten Subsidy, Children's Tuition Support: The children of our members are our future. GS Retail cares for and supports them together." },
                                            { num: "02", tit: "IIn-House Daycare Center: Daycare centers are operated at GS Gangseo Tower and GS Gangnam Tower.", desc: "IIn-House Daycare Center: Daycare centers are operated at GS Gangseo Tower and GS Gangnam Tower." },
                                            { num: "03", tit: "Disaster Support: GS Retail stands by its members even in the face of unexpected disasters.", desc: "Disaster Support: GS Retail stands by its members even in the face of unexpected disasters." },
                                            { num: "04", tit: "Medical and Health Screening Support: GS Retail carefully supports members' health from prevention to treatment.", desc: "Medical and Health Screening Support: GS Retail carefully supports members' health from prevention to treatment." },
                                            { num: "05", tit: "Childcare Leave: GS Retail respects the precious time members spend with their children.", desc: "Childcare Leave: GS Retail respects the precious time members spend with their children." },
                                            { num: "06", tit: "Children's School Entrance Gift: GS Retail celebrates employees' children's new chapter with school entrance gifts.", desc: "Children's School Entrance Gift: GS Retail celebrates employees' children's new chapter with school entrance gifts." },
                                            { num: "07", tit: "Congratulations and Condolences Support: When life events occur, GS Retail shares in members' joy and sorrow with leave and financial support.", desc: "Congratulations and Condolences Support: When life events occur, GS Retail shares in members' joy and sorrow with leave and financial support." },
                                            { num: "08", tit: "Small Love Sharing Society: A mutual growth support program that rallies together when members face sudden difficulties.", desc: "Small Love Sharing Society: A mutual growth support program that rallies together when members face sudden difficulties." },
                                        ]
                                    },
                                    {
                                        title: "Leisure",
                                        desc: "With the belief that an enjoyable leisure life drives the best performance, GS Retail also provides opportunities for rest and recharging.",
                                        items: [
                                            { num: "01", tit: "Recreation Facility Support: Discounts on recreation facilities are provided to help members enjoy a happy getaway.", desc: "Recreation Facility Support: Discounts on recreation facilities are provided to help members enjoy a happy getaway." },
                                            { num: "02", tit: "Additional Summer Vacation Support: An extra summer vacation beyond statutory annual leave — GS Retail cheers on everyday happiness!", desc: "Additional Summer Vacation Support: An extra summer vacation beyond statutory annual leave — GS Retail cheers on everyday happiness!" },
                                            { num: "03", tit: "Leave (Annual) Compensation: Partial compensation of 1.5x is provided for unused remaining annual leave.", desc: "Leave (Annual) Compensation: Partial compensation of 1.5x is provided for unused remaining annual leave." },
                                            { num: "04", tit: "Sports Ticket Support: Football, baseball, volleyball — generous support to enjoy your favorite sport.", desc: "Sports Ticket Support: Football, baseball, volleyball — generous support to enjoy your favorite sport." },
                                            { num: "05", tit: "Informal Groups (In-House Clubs): GS Retail supports mutual understanding and social bonding among members.", desc: "Informal Groups (In-House Clubs): GS Retail supports mutual understanding and social bonding among members." }
                                        ]
                                    }
                                ],
                                Awards: {
                                    Title: "HR Management-Related Certifications and External Awards",
                                    List: [
                                        { year: "2025", month: "April"/* 260604 번역 */, desc: "2025. 04 Selected as Outstanding Company for Employment of People with Disabilities (Gangnam-gu Office)" },
                                        { year: "2024", month: "November"/* 260604 번역 */, desc: "2024. 11 Minister's Award for Outstanding Fair Recruitment Company (Ministry of Employment and Labor)" },
                                        { year: "2023", month: "February"/* 260604 번역 */, desc: "Korea Great Place<br />to Work Certification<br />(GPTW Korea)" }
                                    ],
                                    Highlight: {
                                        Img: require("@/assets/images/dummy/gsrsu03030203.png"), // GPTW 로고 이미지
                                        Tit: "Korea Great Place<br />to Work Certification<br />(GPTW Korea)",
                                        Date: "2023.02",
                                        alt: "GPTW Certification Logo"/* 260604 번역 */,
                                    }
                                }
                            },
                            part_4: {
                                Summary: "Here, you can view performance data related to GS Retail's talent management.",
                                Desc: "This document contains GS Retail's information assets and employee information disclosed for stakeholders, institutions, and shareholders. Any unauthorized use or illegal disclosure may be subject to legal penalties.",
                                Table: {
                                    Tbody: [
                                        {num: 4, tit: "Human Rights Training Performance Data", date: "2021.06.21", url: "/files/human_rights_edu_2021.pdf" },
                                        {num: 3, tit: "Retiree Support Program (Startup and Re-Employment)", date: "2021.02.19", url: "/files/retirement_support.pdf" },
                                        {num: 2, tit: "Headcount, Wages, and Training Cost Status", date: "2021.02.19", url: "/files/salary_status.pdf" },
                                        {num: 1, tit: "Occupational Safety and Health Training Data", date: "2021.02.19", url: "/files/safety_edu.pdf" }
                                    ]
                                },
                                txt:'Download ↓'
                            },
                        },
                        customer: {
                            Summary: "The satisfaction of every single customer is GS Retail's mission and reason for existence.<br />For GS Retail, customer satisfaction management is a way of life and culture.",
                            Policy: {
                                Title: "Consumer Rights Protection Policy",
                                Desc: "To protect consumer rights and interests, all employees of GS Retail<br/>In order to become a trusted GS Retail by providing beneficial products and services, we practice the following policies."/* 260604 번역 */,
                                BtnText: "View Full Text >",
                                Items: [
                                    { label: "One"/* 260604 번역 */, text: "We will provide sufficient and accurate information for the rational consumption of consumers."/* 260604 번역 */ },
                                    { label: "Two"/* 260604 번역 */, text: "We will strive to enhance customer benefits by providing products suitable for consumers and the best service."/* 260604 번역 */ },
                                    { label: "Three"/* 260604 번역 */, text: "We will eradicate unfair trade practices that infringe upon consumer rights and interests."/* 260604 번역 */ },
                                    { label: "Four"/* 260604 번역 */, text: "We will collect consumers' personal information only to the minimum extent consistent with its purpose, through a consent procedure."/* 260604 번역 */ },
                                    { label: "Five"/* 260604 번역 */, text: "We will listen to the voice of consumers and immediately correct any inconveniences, striving to provide the best products."/* 260604 번역 */ }
                                ]
                            },
                            Activities: {
                                Title: "Key Customer Satisfaction Management Activities",
                                Items: [
                                    { img: require("@/assets/images/dummy/gsrsu030303_1.png"), tit: "TOTAL Service", subTit: "Fundamental problem-solving through customer relationship management"/* 260604 번역 */, desc: "GS Retail carries out activities to meet customer expectations at each stage of the value chain from store entry to exit, and continually improves based on Customer Feedback." },
                                    { img: require("@/assets/images/dummy/gsrsu030303_2.png"), tit: "Value Sharing and Communication", subTit: "Establishing Value Sharing and an Open Communication Culture", desc: "Establishing Value Sharing and an Open Communication Culture All leaders at GS Retail hold a weekly Morning Talk and a monthly Connecting Day with their members." },
                                    { img: require("@/assets/images/dummy/gsrsu030303_3.png"), tit: "Service Boom-Up Activities", subTit: "Conducting various service programs involving the participation of customers and employees"/* 260604 번역 */, desc: "Under the philosophy that satisfied employees deliver exceptional service, various pride-building programs are conducted." },
                                    { img: require("@/assets/images/dummy/gsrsu030303_4.png"), tit: "Internal Employee Satisfaction", subTit: "Various Pride-Building Projects", desc: "Under the philosophy that satisfied employees deliver exceptional service, various pride-building programs are conducted." }
                                ]
                            },
                            Recommend: {
                                Title: "Recommendation of Service Excellence Employees",
                                PointTit: "Sincere Service",
                                Desc: "It is about continuously providing service that goes beyond customer expectations, putting your whole heart into it.<br />Please recommend an employee who has demonstrated sincere service to customers (or colleagues).",
                                BtnText: "Recommend a Service Excellence Employee",
                                link: "https://forms.office.com/pages/responsepage.aspx?id=XMJFRnWXd02nNnAPq3ZhFvCl7ccQQtpLvT4o0ubaQFFUOEVXQzJNMkg3U1NWT1VONklWUUhSREc1NC4u&route=shorturl"
                            },
                            Safety: {
                                Title: "Product and Service Safety Programs",
                                Items: [
                                    { step: "01", tit: "Taste and Freshness Guardian Information", desc: "Discover GS Retail's Freshness Guardian program, dedicated to being No. 1 in freshness, taste, and quality. GS Retail carefully selects only the most delicious, fresh, and safety-verified products for our customers.", popContId: "gsrsu03030302"},
                                    { step: "02", tit: "Safety and Hygiene Management System", desc: "Explore GS Retail's safety and hygiene management programs.", popContId: "gsrsu03030303"},
                                    { step: "03", tit: "Hazardous Product Blocking System", desc: "To provide safe products, we participate in the Hazardous Product Blocking System."/* 260604 번역 */, popContId: "gsrsu03030304"}
                                ]
                            },
                            Compensation: {
                                Title: "Product and Customer Service Damage Compensation Programs",
                                BtnText: "View Consumer Compensation Manual >",
                                Steps: [
                                    {label: "Step 1", desc: "Receipt of Product Defects <br />and Service Complaints" },
                                    { label: "Step 2", desc: "Fact Verification" },
                                    { label: "Step 3", desc: "Application of Compensation Policy<br />Based on Defect Determination" }
                                ]
                            },
                            Awards: {
                                Title: "Product and Service Certifications and External Award History",
                                History: [
                                    { year: "2019", month: "December"/* 260604 번역 */, desc: "Korea Brand Award (Ministry of Trade, Industry and Energy)"/* 260604 번역 */ },
                                    { year: "", month: "July"/* 260604 번역 */, desc: "GS Retail Inducted into the Hall of Fame in the Comprehensive Distribution Category at the Korea Service Awards for the First Time (Korean Standards Association)"/* 260604 번역 */ },
                                    { year: "", month: "June"/* 260604 번역 */, desc: "Grand Prize in the Fresh Food Shopping Mall Category at the National Service Awards (Institute for Industrial Policy Studies)"/* 260604 번역 */ },
                                    { year: "2016", month: "September"/* 260604 번역 */, desc: "GS Retail Inducted into the Korea Management Awards Hall of Fame (Korea Management Association)"/* 260604 번역 */ }
                                ],
                                Marks: [
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo1.png"), tit: "ISO 9001 Certification Obtained (Korea Management Registrar Inc.)"/* 260604 번역 */, date: "2021. 05" },
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo2.png"), tit: "Korea Brand Award (Ministry of Trade, Industry and Energy)"/* 260604 번역 */, date: "2019. 12" },
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo3.png"), tit: "GS Retail Inducted into the Hall of Fame in the Comprehensive Distribution Category at the Korea Service Awards for the First Time (Korean Standards Association)"/* 260604 번역 */, date: "2019. 07" },
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo4.png"), tit: "Grand Prize in the Fresh Food Shopping Mall Category at the National Service Awards (Institute for Industrial Policy Studies)"/* 260604 번역 */, date: "2019. 06" },
                                    { img: require("@/assets/images/dummy/gsrsu030303_logo5.png"), tit: "GS Retail Inducted into the Korea Management Awards Hall of Fame (Korea Management Association)"/* 260604 번역 */, date: "2016. 09" }
                                ]
                            }
                        },
                        safetymanagement: {
                            Summary: "GS Retail is actively implementing its management policy to create a safe working environment, prevent accidents and disasters, and improve the quality of life and health of all members (employees and partner companies) and citizens (customers and the genal public).",
                            Policy: {
                                Title: "Safety and Health Management Policy",
                                BtnText: "Safety and Health Management Policy",
                                Items: [
                                    { label: "One"/* 260604 번역 */, text: "The Company shall comply with the Occupational Safety and Health Act, safety and health management regulations, and other relevant laws and regulations." },
                                    { label: "Two"/* 260604 번역 */, text: "The Company shall strive to achieve the highest standards in its commitment to safety-centered management and performance." },
                                    { label: "Three"/* 260604 번역 */, text: "The Company shall recognize safety and health duties as an element of management, provide the necessary resources and technology, and continuously conduct safety and health activities." },
                                    { label: "Four"/* 260604 번역 */, text: "The Company shall actively reflect the participation and opinions of its members (employees and partner companies) and citizens (customers and the general public), and shall continuously inspect and eliminate hazardous and risk factors at workplaces, including unsafe behaviors and environmental conditions, in order to prevent accidents and disasters." },
                                    { label: "Five"/* 260604 번역 */, text: "The Company shall annually verify compliance with workplace safety and health-related laws and regulations, and allocate and execute the necessary personnel and budget." },
                                    { label: "Six"/* 260604 번역 */, text: "All members of the Company shall comply with the headquarters' safety and health activity plans and safety and health manuals, and shall actively participate in activities to prevent serious accidents and industrial accidents." }
                                ]
                            },
                            Governance: {
                                Title: "Safety and Health Governance"/* 260604 번역 */,
                                Desc: "To strengthen expertise in safety and health, a Chief Safety Officer (CSO) has been appointed for each of the Platform BU and Home Shopping BU, and a dedicated Safety and Health Team and Safety and Health Division, responsible for overseeing all safety and health-related matters, operate under the CSO.<br />In addition, GS Retail appoints safety and health management officers and supervisors at each workplace, and hazard factor investigations and risk assessments are conducted to advance the safety and health management system.",
                                img1: require("@/assets/images/dummy/gsrsu030304_1.png"),
                                imgMo1: require("@/assets/images/dummy/gsrsu030304_1_mo.png"),
                                alt: "Platform BU Safety and Health Organizational Chart"/* 260604 번역 */,
                                Notice: "1) Gangseo, N Tower, Gunpo, and Icheon Distribution Centers"
                            },
                            Safety: {
                                Title: "Safety and Health Education and Management System",
                                Desc: "GS Retail conducts safety and health education to maintain the highest level of safety and health for its employees, and proactively prevents accidents through various health management activities.",
                                Systems: [
                                    { num: "01", tit: "Musculoskeletal Exercise (Daily, during Vision Meeting)", sub: "(at each daily vision meeting)"/* 260604 번역 */ },
                                    { num: "02", tit: "Psychological Counseling Service (Stress Management)", sub: "(Stress Management)"/* 260604 번역 */},
                                    { num: "03", tit: "Health Target Index Management"},
                                    { num: "04", tit: "Regular and Ad-hoc Daily Safety Diagnosis"},
                                    { num: "05", tit: "Comprehensive Health Screening",},
                                    { num: "06", tit: "Smoking Cessation Support",},
                                    { num: "07", tit: "Risk Assessment Safety Education Activities",}
                                ]
                            },
                            listening : {
                                Title: "Safety and Health Feedback Box",
                                Desc: "GS Retail sincerely listens to the opinions of its members on matters related to safety and health.<br/>Sound reporting serves as a valuable foundation for the Company's development and its safety and health management."/* 260604 번역 */,
                                items: [
                                    "The Safety and Health Suggestion Box receives opinions and reports regarding the safety and health of citizens and members."/* 260604 번역 */,
                                    "We may not provide a separate response or take action on matters other than those concerning safety and health."/* 260604 번역 */,
                                    "No disadvantage shall arise as a result of an opinion or report."/* 260604 번역 */
                                ],
                                Consents: [
                                    {
                                        title: "Consent to personal data sharing",
                                        items: [
                                            "The personal information you enter will be transmitted only to the safety management department for prompt and accurate processing, and will be used for confirming and responding to inquiries.",
                                            "Personal information items collected: name, email, mobile phone number"/* 260604 번역 */,
                                            "Retention and use period of personal information: Destroyed without delay upon achievement of the purpose (up to 1 year)"/* 260604 번역 */
                                        ],
                                        guide: "※ You have the right to refuse this consent; however, if you do not consent, you may experience difficulty receiving prompt and accurate responses to inquiries that require verification.",
                                        ConsentText: "I agree."
                                    },
                                    {
                                        title: "Consent to Collection and Use of Personal Information",
                                        items: [
                                            "- Purpose of Collection and Use: Confirmation of inquiries and use in responses",
                                            "Items of personal information collected: Name, contact number, email",
                                            "- Retention and Use Period: One year after receipt"
                                        ],
                                        guide: "You have the right to refuse this consent; however, if you do not consent,<br/> Writing an inquiry is not possible."/* 260604 번역 */,
                                        ConsentText: "I agree."
                                    }
                                ],
                                Nonmember : {
                                    title:"You are currently submitting your inquiry as a non-member (not logged in)."/* 260604 번역 */,
                                    items: [
                                        "If you make an inquiry as a non-member, the response can be checked 'only through the contact information you registered (text message, phone call) or email.'"/* 260604 번역 */,
                                        "Please enter your contact information accurately. (Previous inquiry history cannot be checked within the website.)"/* 260604 번역 */,
                                        "If you submit a customer inquiry after logging in, you can check the inquiry/response history on My Page. (Except for Integrity Management)"/* 260604 번역 */
                                    ],
                                },
                                InputWrapcont: {
                                    part1: {
                                        title: "Reporter Information",
                                        requiredText: "* Required fields",
                                        nameLabel: "Name",
                                        namePlaceholder: "",
                                        emailLabel: "Email",
                                        emailOptions: [
                                            { value: 'naver.com', label: 'naver.com' },
                                            { value: 'gmail.com', label: 'gmail.com' }
                                        ],
                                        telLabel: "Contact",
                                        telOptions: '010',
                                    },
                                    part2: {
                                        title: "Consultation Content",
                                        categoryLabel: "Category",
                                        categoryOptions: [
                                            { value: 'store', label: 'Convenience store/supermarket'/* 260604 번역 */ },
                                            { value: 'home', label: 'Home Shopping' }
                                        ],
                                        storeLabel: "Store Name",
                                        storeGuide: "If you do not know the store name, please write the store location.",
                                        subjectLabel: "Title",
                                        contentLabel: "Details",
                                        contentPlaceholder: "Please enter any questions related to store onboarding",
                                        noticeText: "※ For store-related reports, please provide the exact store name to receive a more accurate response.<br />※ When entering content, please refrain from including personal information such as contact numbers and addresses to protect your privacy.<br />※ Reports containing abusive or offensive language may not receive a response.",
                                        fileLabel: "File Attachment",
                                        fileNotice: "* When uploading multiple files, please compress them into a zip file (* File size limit: 20MB)",
                                        replyLabel: "Reply Method",
                                        replyOptions: [
                                            { value: 'email', label: 'Email' },
                                            { value: 'sms', label: 'SMS' }
                                        ],
                                        btnSubmit: "Apply"/* 260604 번역 */,
                                        btnCancel: "Cancel"
                                    }
                                }
                                
                            }
                        },
                        // data() 리턴 객체 내 langData.ko.protect.informationprotection 섹션
                        informationprotection: {
                            Summary: "GS Retail places the utmost importance on information security and personal data protection.<br />The Company has established and operates a company-wide information security governance framework, and continually strives to provide customers with safe and reliable services through this framework.",
                            Governance: {
                                Title: "Information Security and Personal Data Protection Governance Framework",
                                Desc: "GS Retail operates a governance framework directly under the CEO to protect customer personal data. The CISO/CPO, serving as both Chief Privacy Officer and Chief Information Security Officer, oversees company-wide personal data protection and, through the organization directly under the CISO/CPO, comprehensively manages and oversees security strategy development, security technology operations, and personal data protection. This organization consistently operates the company-wide information security and personal data protection framework, centered on three core functions: security strategy, security technology, and personal data protection.",
                                img: require("@/assets/images/dummy/gsrsu030305_1.png"),
                                imgMo: require("@/assets/images/dummy/mo/gsrsu030305_1_mo.png"),
                            },
                            Committee: {
                                Desc: "GS Retail operates an Information Security Committee to manage critical issues. This committee is a company-wide information security and personal data protection governance body composed of the CEO and heads of each BU (executives). The CISO/CPO and head of the Legal Compliance Office participate as secretary members, and the working group and information security division are linked to support the systematic operation and decision-making of the company-wide information security and personal data protection governance.",
                                img: require("@/assets/images/dummy/gsrsu030305_2.png"),
                                imgMo: require("@/assets/images/dummy/gsrsu030305_2_mo.png"),
                                CommitteeImg: "gsrsu030305_2",
                                Notice: "* Regular reporting to the Board of Directors (ESG Committee)"/* 260604 번역 */
                            },
                            Policy: {
                                Title: "Information Security and Personal Data Protection Policy",
                                Desc: "GS Retail defines its personal data protection and information security activities based on its information security policies, guidelines, and manuals, and carries out various activities accordingly.<br />Policies, guidelines, and manuals are posted on the company's internal bulletin board and are reviewed and revised annually in line with amendments to relevant laws such as the Personal Information Protection Act. In addition, GS Retail transparently discloses its personal data protection measures by posting an 'Easy-to-Understand Personal Data Processing Policy' on its website.",
                                img: require("@/assets/images/dummy/gsrsu030305_3.png"),
                                imgMo: require("@/assets/images/dummy/mo/gsrsu030305_3_mo.png"),
                            },
                            Activities: {
                                Title: "Information Security Activities",
                                Desc: "GS Retail conducts a variety of information security activities in line with its information security management system, and communicates these activities through its information security disclosure.",
                                Table: [
                                    { tit: "ISMS-P Certification", desc: "In order to maintain the Information Security and Personal Data Protection Management System (ISMS-P) certification, various information security audits, including management and technical control items, are conducted on a regular basis, and ISMS-P certification assessments are conducted by accredited organizations." },
                                    { tit: "Service Security Review", desc: "A development security process is operated for new and modified services. Security requirements are defined through a criticality assessment at the service planning stage and reflected in each phase of the project; prior to launch, comprehensive security inspections are conducted in line with the security requirements, including personal data lifecycle, development security, application security, source code and infrastructure inspection, and web and app vulnerabilirequirements, and any identified vulnerabilities are remediated." },
                                    { tit: "Information Security Training", desc: "Information security education and personal data protection training are conducted for all employees company-wide, and advanced training is provided separately for employees who handle location information and large volumes of personal data." },
                                    { tit: "Information Security Awareness Enhancement", desc: "To enhance employees' Information Security Awareness Enhancement, GS Retail operates Personal Data Protection Day and Information Security Day campaigns, and GS Retail sends regular mailings regarding key compliance matters." },
                                    { tit: "Simulation Drills", desc: "Malicious email simulation drills are conducted for employees to improve security awareness regarding malicious emails. In addition, simulation drills for personal data leakage and exposure incidents are conducted to reduce personal data breaches that may affect customers in the event of an actual incident." },
                                    { tit: "Risk Management", desc: "Vulnerability assessments and risk evaluations are conducted annually to manage risks arising from information assets (including infrastructure) and processes, and plans are established and operated to manage identified risks." }
                                ],
                                BtnText: "Go to Information Security Disclosure >",
                                link:'https://isds.kisa.or.kr/kr/publish/list.do?pageNum=1&limit=10&type=ALL&keyword=%EC%A7%80%EC%97%90%EC%8A%A4%EB%A6%AC%ED%85%8C%EC%9D%BC&menuNo=204942'
                            },
                            Certification: {
                                Img: require("@/assets/images/dummy/gsrsu030305_logo.png"),
                                Title: "GS Retail Online Services",
                                date:"(2025.06.18 ~ 2028.06.17)",
                                Desc: "In order to objectively demonstrate the adequacy and appropriateness of the information security management system and information security activities, GS Retail has obtained and operates the Personal information & Information Security Management System (ISMS-P) certification."
                            }
                        }


                    },
                }
            }
        };
    },
    computed: {
        t() {
            return this.langData[this.lang] || this.langData.ko;
        },
        // 바인딩 경로 단축을 위한 헬퍼
        lp() {
            return this.t.protect.safetymanagement.listening.InputWrapcont;
        }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        onTabChange1(idx) {
            this.CTabIdx = idx;
            this.SubTabIdx1 = 0;
            this.SubTabIdx2 = 0;
        },
        handlePage(page) {
            console.log("선택된 페이지:", page);
            this.page = page;
        },
        handleDownload(link) {
            if (!link) {
                alert(this.t.alertNoFile);
                return;
            }
            window.open(link, '_blank');
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 767;
        },
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default";
            const cont = el.dataset.cont;
            modal.open(popId, type, el, cont);
        }
    }
};
</script>

<style scoped>
    .main-container { width: 100%; position: relative; background-color: #ffffff; }    
    img {max-width:100%;}
    /* Visual Area */
    .title_wrap { display: block; width: 100%; height: 480px; padding: 160px 0; background: url('/src/assets/images/dummy/gsrsu03010101_bg.png') no-repeat center / cover; position: relative; }
    .page-title { color: #FFFFFF; font-size: 72px; font-weight: 700; letter-spacing: -1.44px; }
    .visual-sub { margin-top: 10px; color: #FFFFFF; font-size: 32px; font-weight: 700; }
    /* Typography */
    h3 { color: #161616; font-size: 40px; font-weight: 700; line-height: 1.3; }
    h4 { color: #161616; font-size: 32px; font-weight: 700; line-height: 1.3; margin-bottom: 12px; }
    p { color: #161616; font-size: 20px; line-height: 1.45; word-break: keep-all; }
    .sub_tab_content {min-height: 300px; margin-top:100px; }
    .inner_content {padding-top:40px; border-radius: 10px; }
    .tab_content_wrap {margin-top:20px !important;}
    :deep(.section_title_sub) br {display:none;}
    .date {font-size:16px;}

    .support_item + .support_item {margin-top:120px;}

    .finance_support .process_container {margin-top:60px;}
    .finance_support h3 {margin-bottom:40px;}
    .finance_support .text_area strong {display:block; margin-top:6px; line-height:1.45}

    /* 상생경영 개요 특화 스타일 */
    .text_summary { font-size: 32px; font-weight: 700; color: #161616; padding: 20px 0; }
    .philosophy_box { padding: 60px; background: #F8F8F8; border-radius: 12px; }
    .circle_grid { display: flex; justify-content: center; flex-direction:column; gap: 40px; background: #fff; padding: 60px 0; border-radius: 12px; list-style: none; }
    .item_wrap {width: 100%; display: flex; justify-content: center; gap: 40px; }
    .item_wrap div { width: 300px; height: 300px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; color: #fff; opacity: 0.8; }

    .item_wrap div  img { width: 60px; height: 60px; margin-bottom: 8px; }
    
    .item_wrap div strong { font-size: 24px; margin-bottom: 8px; font-weight: 700; display:flex; flex-direction:column; align-items:center; gap:8px;}
    .item_wrap div strong::before {content:''; width:60px; height:60px; background-repeat:no-repeat; display:block;}
    .item_wrap .color_01 strong::before {background:url('@/assets/images/sub/icon_su03_01-01-01_60.png') 0 0;}
    .item_wrap .color_02 strong::before {background:url('@/assets/images/sub/icon_su03_01-01-02_60.png') 0 0;}
    .item_wrap .color_03 strong::before {background:url('@/assets/images/sub/icon_su03_01-01-03_60.png') 0 0;}

    .item_wrap div p { font-size: 1.8rem; color: #fff; text-align: center; line-height: 1.4; }
    .item_wrap div.color_01 { background-color: #107AF2; }
    .item_wrap div.color_02 { background-color: #15B874; }
    .item_wrap div.color_03 { background-color: #FB6432; }
    .item_wrap div img { width: 60px; height: 60px; margin-bottom: 8px; }
    .item_wrap div p { font-size: 1.8rem; color: #fff; text-align: center; line-height: 1.4; }
    .card_grid { display: flex; gap: 20px; flex-wrap:wrap; }
    .strategy_card { min-width: calc(25% - 15px); padding: 32px 32px 56px; background: #F8F8F8; border-radius: 12px; flex: 1;}
    .card_head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
    .card_head .num { font-size: 1.8rem; font-weight: 700; color: #107AF2; }
    .card_head strong { font-size: 20px; color: #161616; }
    .index_visual { position: relative; width: 100%; height: 340px; background: #F8F8F8; border-radius: 12px; overflow: hidden; }
    .index_visual img { width: 100%; height: 100%; object-fit: cover; }
    .index_badge { position: absolute; top: 65px; right: 50px; width: 210px; height: 210px; background: rgba(159, 202, 250, 0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .badge_inner { text-align: center; }
    .category { display: inline-block; padding: 4px 12px; background: #107AF2; color: #fff; border-radius: 99px; font-size: 14px; font-weight: 700; margin-bottom: 10px; }
    .result { color: #107AF2; }
    .result .year { display: block; font-size: 24px; font-weight: 700; }
    .result strong { font-size: 32px; font-weight: 700; }
    .index_title strong { font-size: 2.8rem; color: #161616; }
    .btn_xl {font-weight:700;}
    .bullet_01 li {font-size:16px;}
    .index_box strong {margin-top:20px; font-size:2.8rem; font-weight:700; display:block;}
    .strategy_box .diagram_img_wrap {margin:0;}

    /* 금융지원 */
    .text_summary_sub { margin-bottom:80px; font-size: 2.8rem; font-weight: 700; color: #90909A;}
    .section_title_sub {margin-bottom:16px; font-size: 40px; font-weight: 700; color: #161616; }
    .wide_info_box { display: flex; gap: 40px; align-items: flex-start; }
    .img_frame {height: 360px; max-height:100%; border-radius: 12px; overflow: hidden; }
    .img_frame img { width: 100%; height: 100%; object-fit: cover; }
    .text_area { flex: 1; }
    .process_flow { display: flex; align-items: center; justify-content: center; background: #fff; padding: 60px 0; border-radius: 12px; gap:80px; }
    .step_unit { position: relative; width: 220px; height:220px; padding:40px 0; background:#F8F8F8; border-radius:50%; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .circle_icon { width: 100px; height: 100px; background: #F8F8F8; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .circle_icon img { width: 40px; }
    .step_desc { font-size: 16px; font-weight: 700; text-align: center; color: #000; line-height: 1.2; display:flex; align-items:center; flex-direction:column;}
    .step_desc::before {content:''; width:80px; height:80px; margin-bottom:12px; display:block; background-repeat:no-repeat;}
    .arrow_next { width: 40px; height:40px; background:url('@/assets/images/sub/arrow_su03_01-02-01_40.png') 50% 50% no-repeat; position:absolute; right:-60px; top:50%; transform:translateY(-50%);}
    .grid_column_2 { display: flex; gap: 40px; }
    .grid_column_2 .sub_item {width:50%;}
    .sub_fund_item { flex: 1; }
    .img_frame_small { width: 100%; height: 360px; border-radius: 12px; overflow: hidden; }
    .img_frame_small img { width: 100%; height: 100%; object-fit: cover; }

    .process_flow .step_unit:nth-child(1) .step_desc:before {background:url('@/assets/images/sub/icon_su03_01-02-01_80.png') 0 0;}
    .process_flow .step_unit:nth-child(2) .step_desc:before {background:url('@/assets/images/sub/icon_su03_01-02-02_80.png') 0 0;}
    .process_flow .step_unit:nth-child(3) .step_desc:before {background:url('@/assets/images/sub/icon_su03_01-02-03_80.png') 0 0;}
    .process_flow .step_unit:nth-child(4) .step_desc:before {background:url('@/assets/images/sub/icon_su03_01-02-04_80.png') 0 0;}

    /* 하단 카드 보정 */
    .card_desc { font-size: 16px; color: #67676F; line-height: 1.5; letter-spacing: -1%; margin-top: 8px; }

    /* 판로지원 전용 스타일 */
    .brand_grid { display: flex; gap: 10px; list-style: none; }
    .brand_grid li { flex: 1; text-align: center; }
    .brand_img_box { width: 100%; height: 240px; background: #F8F8F8; border-radius: 12px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .brand_img_box img { max-width: 150px; object-fit: contain; }
    .brand_name  {text-align:left;}
    .brand_name strong { font-size: 20px; color: #161616; font-weight: 700; }
    .program_grid { display: flex; flex-wrap: wrap; gap: 80px 40px; }
    .program_item { width: calc(50% - 20px); }
    .program_visual { width: 100%; height: 340px; border-radius: 12px; overflow: hidden; }
    .program_visual img { width: 100%; height: 100%; object-fit: cover; }

    .marketing_item {height:260px; padding:20px; background-color:#F8F8F8; border-radius:12px; display:flex; flex-direction:column; align-items:center;}
    .marketing_item .brand_img_box {height:auto; flex:1;}

    /* 테이블 공통 스타일 */
    .policy_wrap { width: 100%; margin-top:40px; overflow-x: auto;}
    .policy_wrap table { width: 100%; min-width:1000px; border-collapse: collapse; table-layout: fixed; }
    .policy_wrap th { padding: 16px 24px; color: #161616; font-size: 1.8rem; font-weight: 600; }
    .policy_wrap td { padding: 16px 24px; color: #161616; font-size: 1.8rem; line-height: 1.5; }
    .policy_wrap th:first-child, .policy_wrap td:first-child { border-left: none; }
    .policy_wrap th:last-child, .policy_wrap td:last-child { border-right: none; }
    .policy_wrap td strong { font-weight: 600; }
    .competency_support ul li {display:flex; justify-content:space-between; gap:20px;}
    .competency_support .visual_wrap .img_frame {width:48.59%; background:#F8F8F8; position: relative; display:flex; align-items:center; justify-content:center; overflow: hidden; }
    .competency_support .visual_wrap .img_frame img {width:auto; height:auto;}
    .competency_support .section_title_sub {margin-bottom: 16px; color: #161616; font-size: 40px; font-weight: 700; line-height: 1.3; letter-spacing: -0.4px;}
    .competency_support .p {color: #161616; font-size: 24px; font-weight: 400; line-height: 1.5; letter-spacing: -0.24px;}


    /* 방송편성 */
    .broadcasting_support .small_business {display:flex; gap:2.816%;}
    .broadcasting_support .small_business figure {width:35.21%; height:auto;}
    .broadcasting_support .small_business figure + div {width:61.97%;}
    .broadcasting_support .small_business figure + div .sub_item {margin-bottom:40px;}
    .broadcasting_support .small_business figure + div .sub_item:last-of-type {margin-bottom:0;}

    /* 소통제도 */
    .communication_support .support_item:last-of-type {margin-top:80px;}

    /* 경영주 지원제도 */
    .notice_text {margin-top:20px; color:#67676F; font-size:16px;}
    .owner_card_layout {display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;}
    .owner_card_layout .strategy_card {min-width: auto; padding: 32px 32px 48px; height: 100%; display: flex; flex-direction: column;}
    .diagram_img_wrap {display: block; margin:100px 0 0; text-align:center;}

    /* 공급망 지속가능성 정책 한 줄 규칙 수정 */
    .policy_box_wrap { padding: 60px; background-color: #F8F8F8; border-radius: 20px; }
    .policy_list { display: flex; flex-direction: column; gap: 24px; }
    .policy_item { display: flex; align-items: flex-start; gap: 12px; }
    .policy_item .label { min-width: 35px; font-size: 20px; font-weight: 700; color: #161616; white-space: nowrap; line-height: 1.45; }
    .policy_item .desc { font-size: 20px; font-weight: 400; color: #161616; line-height: 1.45; }
    .supplychain_policy .system_bg {display: block; margin-top:0; padding: 60px; background-color: #F8F8F8; border-radius: 12px; display: flex; justify-content: center; align-items: center; }

    /* 공통 폰트 및 컬러 변수 활용 */
    .csr_outline .view_box { padding: 60px; background-color: #F8F8F8; border-radius: 20px; }
    .csr_outline .text_xl_bold { font-size: 40px; font-weight: 700; color: #161616; }
    .csr_outline .text_l_bold { font-size: 2.8rem; font-weight: 700; color: #161616; }
    .csr_outline .label_blue { font-size: 20px; font-weight: 700; color: #107AF2; margin-bottom: 8px; display: block; }
    .strategy_grid { margin-bottom:80px; display: flex; gap: 24px; }
    .strategy_info { flex: 1; border-radius: 12px; }
    .diagram_canvas { background-color: #ffffff; border-radius: 12px; padding: 60px 0; display: flex; justify-content: center; }
    .strategy_main_img { width: 100%; max-width: 780px; height: auto; }
    .timeline_wrapper { display: flex; gap: 48px; position: relative; margin-top: 40px; }
    .timeline_axis { width: 24px; position: relative; }
    .axis_svg { width: 100%; height: auto; }
    .timeline_content_area { flex: 1; display: flex; flex-direction: column; }
    .history_row {padding-bottom: 100px; display: flex; gap: 32px; position:relative; }
    .history_row::before {content:''; width:1px; height:100%; background:#107AF2; position:absolute; bottom:0; top:0; left:12px; display: block;}
    .history_row::after {content:''; width:24px; height:24px; background:url('@/assets/images/sub/icon_history_dot.png') 50% 50% no-repeat; position:absolute; bottom:0; top:0; display:block;}
    .history_row:last-child { padding-bottom: 0; }
    .history_row:last-child::before {display:none;}
    .history_year { width: 80px; margin-left:60px; font-size: 32px; font-weight: 700; color: #000;}
    .history_details { flex: 1; list-style: none; padding: 0; }
    .history_item {padding-bottom:40px; color:#161616; font-size:20px; font-weight:400;} /* 가이드상의 여백 유지 */f

    /* 아동/사회 취약계층지원, 방송발전 */
    .vulnerable_support .program_item .text_area {text-align: left;}
    .vulnerable_support .section_title_sub {margin-bottom: 40px; font-size: 40px; font-weight: 700;}
    .vulnerable_support .brand_img_box, .broadcasting_development .brand_img_box {background-color: #F8F8F8;}
    .vulnerable_support .brand_grid li {max-width:340px;}
    .community_support_area .brand_grid, .broadcasting_development .brand_grid {display: flex; flex-wrap: wrap; gap: 40px 20px;}
    .community_support_area .brand_grid li, .broadcasting_development .brand_grid li {width: calc(25% - 15px); flex: none; text-align: left;}

    /* 숨은나눔천사 특화 스타일 */
    .sharing_card { width: calc(33.333% - 27px); } /* 3열 그리드 */
    .sharing_card .text_l_bold { font-size: 20px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .sharing_card .p { font-size: 1.8rem; color: #161616; min-height: 50px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .sharing_card .program_visual {height:auto;}
    .card_footer { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
    .badge_gray { padding: 4px 8px; background: #F2F2F4; color: #67676F; border-radius: 4px; font-size: 14px; }
    .date_text { font-size: 16px; color: #67676F; }

    /* 인권경영 */
    .human_rights_management .GS-universal-wrapper .p {color: #161616; font-size: 20px; line-height: 1.45;}
    .human_rights_management .program_grid .program_item { width: calc(25% - 30px);}
    .human_rights_management .program_visual { height: 240px;}
    .human_rights_management .text_area {margin-top:24px;}
    .human_rights_management strong  {font-size:20px; display:block;}
    .human_rights_management .text_area span {margin-bottom:12px; font-size:32px; font-weight:700; display:block;}
    .human_rights_management .owner_card_layout {grid-template-columns: repeat(4, 1fr);}
    .human_rights_management .policy_box_wrap .img_frame { height: 300px; }

    /* 인재육성체계 */
    .p_desc {font-size:16px;}

    /* 인재경영실적자료 */
    .talent_performance_data .text_summary_sub {margin-bottom:16px; color:#161616;}
    .talent_performance_data .intro_summary .GS {color:#161616; font-size: 20px; line-height: 1.5;}
    .talent_performance_data .policy_wrap table {border-top: 1px solid #161616;}
    .talent_performance_data .policy_wrap th {background-color: #fff; border-bottom: 1px solid #E5E5E5;}
    .talent_performance_data .policy_wrap td {border-right:0; border-left:0; border-bottom: 1px solid #E5E5E5; padding: 24px;}

    /* 인재상 전용 스타일 (한 줄 정리 버전) */
    .talent_vision .philosophy_box {display:flex; flex-direction:column; align-items:center;}
    .talent_vision .philosophy_box > div:first-of-type {margin-bottom:40px; display:flex; align-items:center; justify-content:space-around; gap:65px;}
    .talent_vision .circle_visual_wrap { display: flex; justify-content: center; align-items: center; gap: -40px; }
    .talent_vision .circle_item { width: 320px; height: 320px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; mix-blend-mode: multiply; }
    .talent_vision .circle_item.value { background-color: #4A90E2; margin-right: -40px; }
    .talent_vision .circle_item.way { background-color: #50C878; }
    .talent_vision .circle_item strong { font-size: 44px; font-weight: 700; }
    .talent_vision .circle_item span { font-size: 1.8rem; margin-top: 8px; opacity: 0.9; }
    .value_detail_grid {width:100%; padding:40px 0; background:#fff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); display:flex; justify-content:space-evenly;}
    .value_detail_grid .detail_card { width:100%; max-width:400px; }
    .card_title { font-size: 2.8rem; font-weight: 700; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 2px solid #E5E5E9; }
    .value_list li, .way_list li { margin-bottom: 24px; display: flex; align-items: flex-start; }
    .way_list li {gap:30px;}
    .value_list strong, .way_list strong { min-width: 100px; font-size: 20px; font-weight: 700; color: #161616; }
    .value_list p { font-size: 16px; color: #67676F; white-space: pre-line; }
    .way_list .tags { display: flex; flex-direction: column; gap: 4px; }
    .way_list .tags span { font-size: 16px; color: #67676F; }
    .dream_realization {margin-top:120px;}
    .dream_realization .type_bg { background: #F8F8F8; padding: 60px; border-radius: 20px; }
    .bullet_01.no_type {list-style: none;padding: 0;}
    .effort_item {display: flex; align-items: flex-start;}
    .effort_item .num {flex-shrink:0; width: 25px; font-size: 1.8rem; color: #161616;}
    .effort_item .desc {font-size: 1.8rem; color: #161616; line-height: 1.5; word-break: keep-all;}

    /* 인재경영지표 */
    /* 섹션 공통 */
    .talent_indicators .support_section .section_head {margin-bottom:40px;}
    .talent_indicators .support_section + .support_section {margin-top:100px;}
      .talent_indicators .support_section .section_head p {font-size: 24px;} /* 2026.07.06 edit 이소라 */
    .talent_indicators .section_title_sub { font-size: 32px; font-weight: 700; margin-bottom: 16px; }
    .talent_indicators .support_section.award_section .award_row {padding: 9px 0;}
    /* 2열 그리드 레이아웃 */
    .talent_indicators .support_grid {position:relative; display: grid; grid-template-columns: repeat(2, 1fr); row-gap: 64px;}
    .talent_indicators .support_grid:after {content:''; position:absolute; left:0; right:0; bottom:0; border-bottom: 1px solid #E5E5E5;}
    .talent_indicators .support_item {min-height: 80px; padding-left: 100px; padding-bottom:64px; border-bottom:1px solid #E5E5E9; position: relative; }
    .talent_indicators .support_item + .support_item {margin-top:0;}
    /* .talent_indicators .support_item:nth-last-child(-n+2) {border-bottom: 0; padding-bottom: 0;} */

    .talent_indicators .support_item:before {content: ''; width: 80px; height: 80px; background: #F2F2F4; border-radius: 50%; position: absolute; left: 0; top: 0;}
    .talent_indicators .support_item:after {width:40px; height:40px; background:url('@/assets/images/sub/icon_cont2_40.png') no-repeat; content:''; position:absolute; top:20px; left:20px; display:block;}

    .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(1):after {background-position: -4px 0;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(2):after {background-position: -4px -60px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(3):after {background-position: -4px -120px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(4):after {background-position: -4px -180px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(5):after {background-position: -4px -240px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(6):after {background-position: -4px -300px;}

    .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(1):after {background-position: -4px -360px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(2):after {background-position: -4px -420px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(3):after {background-position: -4px -480px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(4):after {background-position: -4px -540px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(5):after {background-position: -4px -600px;}

    .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(1):after {background-position: -4px -660px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(2):after {background-position: -4px -720px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(3):after {background-position: -4px -780px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(4):after {background-position: -4px -840px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(5):after {background-position: -4px -900px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(6):after {background-position: -4px -960px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(7):after {background-position: -4px -1020px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(8):after {background-position: -4px -1080px;}

    .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(1):after {background-position: 0px -1140px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(2):after {background-position: 0px -1200px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(3):after {background-position: 0px -1260px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(4):after {background-position: 0px -1320px;}
    .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(5):after {width: 44px; background-position: 0px -1380px;}
    
    .talent_indicators .item_inner .tit_area { margin-bottom: 24px; }
    .talent_indicators .item_inner .num { display: block; margin-bottom:4px; color: #107AF2; font-size: 2.8rem; font-weight: 700; line-height:130% }
    .talent_indicators .item_inner .tit { color: #000; font-size: 2.8rem; font-weight: 600; line-height:130% }
    .talent_indicators .item_inner .desc { color: #666; font-size: 2.4rem; line-height: 1.5; } /* 2026.07.06 edit 이소라 */

    /* 수상 이력 리스트 (하단) */
    .award_list {margin-top:20px;}
    .award_row {padding: 20px 0; font-size: 1.8rem; display: flex; align-items:center;}
    .award_row .year { width: 130px; font-size:32px; font-weight: 700; }
    .award_row .month { width: 70px; color: #90909A;  font-size:20px; }
    .award_row .name { flex: 1; color: #161616; font-size:20px; }
    .award_section .brand_grid li {max-width:340px;}
    .award_section .info_box {margin-top:24px; display:flex; flex-direction:column; gap:12px;}
    .award_section .info_box .tit {color:#161616; font-size:20px; font-weight:700;}
    .award_section .info_box .data {color:#161616; font-size:16px;;}
    .award_section .info_box em {font-size:16px;}


    /* 고객만족경영 */
    .customer_satisfaction .text_area {margin-top:32px;}
    .customer_satisfaction strong {margin-bottom:12px; font-size:32px; font-weight:700; display:inline-block;}
    .customer_satisfaction .sub_tit {margin-bottom:12px; font-size:20px; font-weight:700;}
    .customer_satisfaction .recommend_box {padding:60px; background:#E7F2FE; border-radius:20px; display:flex; align-items:center; justify-content:space-between;}
    .customer_satisfaction .recommend_box .text_area {margin-top:0}
    .customer_satisfaction .safety_system_list {padding:60px 0px; border-radius:20px; display:flex; align-items:center; justify-content:space-between; gap:60px;}
    .customer_satisfaction .safety_system_list li {width:33.333%; padding-left:104px; position:relative;}
    .customer_satisfaction .safety_system_list li::before{content: ''; width: 80px; height: 80px; background: #F2F2F4; border-radius: 50%; position: absolute; left: 0; top: 0;}
    .customer_satisfaction .safety_system_list li::after {content:''; width:40px; height:40px; background:url('@/assets/images/sub/icon_cont_40.png') no-repeat; position:absolute; top:20px; left:20px; display:block;}
    .customer_satisfaction .safety_system_list li:first-child:after {background-position:-1140px -103px;}
    .customer_satisfaction .safety_system_list li:nth-child(2):after {background-position:-180px -266px;}
    .customer_satisfaction .safety_system_list li:nth-child(3):after {background:url('@/assets/images/sub/icon_gsrsu030303_03.png') no-repeat 0 0;}
    .customer_satisfaction .safety_system_list .num {color:#107AF2; font-size:2.8rem; font-weight:700; }
    .customer_satisfaction .safety_system_list .tit_wrap {margin-top:10px;}
    .customer_satisfaction .safety_system_list .tit_wrap strong {margin-bottom:24px; font-size:24px; font-weight:700; position:relative;}
    .customer_satisfaction .safety_system_list .tit_wrap strong button {width:24px; height:24px; background:url('@/assets/images/common/icon_set_24.png') -832px -15px no-repeat;  position:absolute; right:-35px; top:50%; transform: translateY(-50%);}
    .customer_satisfaction .safety_system_list .desc {color:#67676F; font-size:16px; font-weight:600;}
    .customer_satisfaction .compensation_process_wrap .process_steps {padding:56px 64px; background:#F8F8F8; border-radius:12px; display:flex; gap:20px;}
    .customer_satisfaction .compensation_process_wrap .process_steps .step_box {width:33.333%; padding-top:56px; position:relative;}
    .customer_satisfaction .compensation_process_wrap .process_steps .step_info span {color:#107AF2; font-size:18px; font-weight:700; display:flex;}
    .customer_satisfaction .compensation_process_wrap .process_steps .step_info span::before {content:''; width:32px; height:32px; display:inline-block; background:url('@/assets/images/sub/icon_cont_32.png') no-repeat; position:absolute; top:0; left:0;}
    .customer_satisfaction .compensation_process_wrap .process_steps .step_box:first-child .step_info span::before {background-position:-660px -186px;}
    .customer_satisfaction .compensation_process_wrap .process_steps .step_box:nth-child(2) .step_info span::before {background-position:-180px -266px;}
    .customer_satisfaction .compensation_process_wrap .process_steps .step_box:nth-child(3) .step_info span::before {background-position: -100px -103px;}
    .customer_satisfaction .compensation_process_wrap .process_steps .step_info p {margin-top:8px; font-size:20px; font-weight:700;}
    .customer_satisfaction .award_section {display:flex; flex-wrap:wrap; gap: 40px 20px;}
    .customer_satisfaction .award_section .mark_item_group {width: calc(25% - 15px); box-sizing: border-box;}
    .customer_satisfaction .award_row {padding: 9px 0}


    /* 안전경영 */
    .safety_management_wrap .policy_card_box { background-color: #f8f8f8; padding: 60px; border-radius: 20px; }
    .safety_management_wrap .section_title_sub { font-size: 40px; font-weight: 700; color: #161616; letter-spacing: -0.4px; }
    .safety_management_wrap .p_desc { font-size: 24px; font-weight: 400; color: #161616; line-height: 1.5; word-break: keep-all; }
    .safety_management_wrap .policy_list_wrap { display: flex; flex-direction: column; gap: 24px; }
    .safety_management_wrap .policy_item { display: flex; align-items: flex-start; gap: 8px; }
    .safety_management_wrap .item_label { min-width: 35px; font-size: 20px; font-weight: 700; color: #161616; white-space: nowrap; } /* 2026.07.06 edit 이소라 */
    .safety_management_wrap .item_text { font-size: 20px; color: #161616; line-height: 1.35; }
    .safety_management_wrap .diagram_box_wrap { width: 100%; padding: 60px 0; background-color: #f8f8f8; border-radius: 12px; display: flex; flex-direction: column; align-items: center; }
    .safety_management_wrap .notice_text { font-size: 14px; color: #67676f; }
    .safety_management_wrap .safety_system_grid { display: flex; flex-wrap:wrap; border-bottom: 1px solid #e5e5e9; }
    .safety_management_wrap .system_item:first-of-type, .safety_management_wrap .system_item:nth-of-type(2)  {padding-top:0;}
    .safety_management_wrap .system_item {width:50%; padding: 64px 0 64px 104px; border-bottom: 1px solid #e5e5e9; position:relative; display: flex; align-items: center; gap: 24px;}
    .safety_management_wrap .system_item:last-of-type {border-bottom:0}
    .safety_management_wrap .text_box:before {content: ''; width: 80px; height: 80px; background: #F2F2F4; border-radius: 50%; position: absolute; left: 0; top: 60px;}
    .safety_management_wrap .text_box:after {width:40px; height:40px; background:url('@/assets/images/sub/icon_cont2_40.png') no-repeat; content:''; position:absolute; top:80px; left:20px; display:block;}
    .safety_management_wrap .system_item:nth-of-type(1) .text_box:before {top:0;}
    .safety_management_wrap .system_item:nth-of-type(2) .text_box:before {top:0;}
    .safety_management_wrap .system_item:nth-of-type(1) .text_box:after {top:20px; background-position: -4px -660px;}
    .safety_management_wrap .system_item:nth-of-type(2) .text_box:after {top:20px; background-position: -4px -720px;}
    .safety_management_wrap .system_item:nth-of-type(3) .text_box:after {background-position: -4px -780px;}
    .safety_management_wrap .system_item:nth-of-type(4) .text_box:after {background-position: -4px -840px;}
    .safety_management_wrap .system_item:nth-of-type(5) .text_box:after {background-position: -4px -900px;}
    .safety_management_wrap .system_item:nth-of-type(6) .text_box:after {background-position: -4px -960px;}
    .safety_management_wrap .system_item:nth-of-type(7) .text_box:after {background-position: -4px -1020px;}

    .safety_management_wrap .system_item:first-of-type .text_box::before {top:0px;}
    .safety_management_wrap .system_item:nth-of-type(2) .text_box::before {top:0px;}
    .safety_management_wrap .system_item .num { font-size: 2.8rem; font-weight: 700; color: #107af2; display: block; }
    .safety_management_wrap .system_item .tit { font-size: 2.8rem; font-weight: 700; color: #161616; }
    .safety_management_wrap .system_item .sub { font-size: 20px; color: #67676f; margin-top: 8px; display: block; }
    .input_wrap {display:flex; align-items:center; justify-content:flex-end;}
    .noti_non_member {padding:24px; background:#F9F2EA; border-radius:12px;}
    .noti_non_member span {margin-bottom:12px; padding-left:34px; font-size:18px; position:relative; display:block;}
    .noti_non_member span::before {content:''; width:24px; height:24px; background:url('@/assets/images/common/icon_set_24.png') no-repeat -160px -56px; display:inline-block; position:absolute; top:0; left:0px;}
    .noti_non_member ul {padding-left:34px;}
    .listening_form_area .consent_box { background-color: #f8f8f8; padding: 32px; border-radius: 12px;}
    .listening_form_area .consent_tit {margin-bottom: 24px; font-size: 24px; font-weight: 700; display: block; }
    .listening_form_area .consent_list {padding-bottom:24px;}
    .listening_form_area .consent_list li { font-size: 16px; color: #67676f; margin-bottom: 8px; position: relative; padding-left: 12px; }
    .listening_form_area .consent_list li::before { content: ""; position: absolute; left: 0; top: 10px; width: 4px; height: 1px; background-color: #67676f; }
    .listening_form_area .form_table { border-top: 1px solid #242428; }
    .listening_form_area .form_row { display: flex; align-items: center; }
    .listening_form_area .form_row .label { width: 134px; padding: 24px; font-size: 16px; color: #161616; }
    .listening_form_area .required { color: #fb6432; }
    .listening_form_area input, .listening_form_area textarea { width: 100%; padding: 14px 16px; border: 1px solid #c4c4d0; border-radius: 12px; font-size: 16px; }
    .listening_form_area textarea { height: 160px; resize: none; }
    .listening_form_area .consent_agree {padding-top:24px; border-top:1px solid #D7D7DF; display:flex; justify-content:space-between; align-items:center;}
    .listening_form_area .consent_agree p {font-size:16px; font-weight:700;}
    .listening_form_area article {margin-bottom:40px;}
    .listening_form_wrap .form_header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; border-bottom: 1px solid #242428; }
    .listening_form_wrap .form_title { font-size: 24px; font-weight: 700; color: #161616; }
    .listening_form_wrap .required_guide { font-size: 14px; color: #fb6432; }
    .form_section:first-of-type {margin-bottom:64px;}
    .listening_form_wrap .form_body {padding:10px 0 12px; border-bottom: 1px solid #e5e5e9; }
    .listening_form_wrap .form_row { display: flex; align-items: flex-start; gap: 8px; padding: 12px 0; }
    .listening_form_wrap .label_item { display: flex; width: 134px; align-items: center; gap: 4px; padding-top: 14px; }
    .listening_form_wrap .label_text { font-size: 16px; color: #161616; }
    .listening_form_wrap .required_mark { color: #fb6432; font-size: 16px; }
    .listening_form_wrap .input_group { display: flex; align-items: center; gap: 8px;}
    .listening_form_wrap .input_group .group_wrap { display: flex; align-items: center; gap: 8px;}
    .listening_form_wrap .input_flex_item { flex: 1; min-width: 0; }
    .listening_form_wrap .unit { color: #67676f; font-size: 16px; padding: 0 4px; }
    .listening_form_wrap .input_complex { display: flex; flex-direction: column; gap: 8px;}
    .listening_form_wrap .input_complex .textarea_wrap {max-width:600px;}
    .listening_form_wrap .guide_msg { font-size: 14px; color: #67676f; }
    .listening_form_wrap :deep(.guide_msg_multi) span { display:block; font-size: 12px; color: #67676f; line-height: 18px; margin-top: 8px; }
    .listening_form_wrap .file_upload_group { display: flex; align-items: center; gap: 10px; }
    .listening_form_wrap .btn_file { height: 38px; padding: 0 12px; font-size: 16px; cursor: pointer; }
    .listening_form_wrap .file_name { font-size: 14px; color: #161616; }
    .form_container .btn-wrap {display:flex; justify-content:flex-end; gap:8px;}
    .form_container .btn-wrap * {width:134px;}
    .w428 {width:428px; display:inline-block;}

    /* 정보보호 */
    .blind { position: absolute; width: 1px; height: 1px; clip: rect(0, 0, 0, 0); overflow: hidden; }
    .information_protection_management .text_summary {font-size: 32px; font-weight: 700; color: #161616; letter-spacing: -0.32px; line-height: 1.3; }
    .information_protection_management .contents { width: 100%; display: flex; flex-direction: column; align-items: flex-start; }
    .contents .protection_section + .protection_section {margin-top:120px;}
    .information_protection_management .protection_section {display: flex; flex-direction: column; }
    .information_protection_management .section_title_sub {font-size: 40px; font-weight: 700; color: #161616; letter-spacing: -0.4px; line-height: 1.3; }
    .information_protection_management .p_desc {font-size: 24px; font-weight: 400; color: #161616; letter-spacing: -0.24px; line-height: 1.5; }
    .information_protection_management .diagram_box_wrap { width: 100%; padding: 60px 80px; background-color: #f8f8f8;  display: flex; flex-direction: column; align-items: center; }
    .information_protection_management .diagram_box_wrap.scroll { width: 100%; max-width:100%; background-color: #f8f8f8; overflow: hidden; }
    /* 26.06.08 add 정다희 : diagram_box_wrap figcaption 수정  */
    .information_protection_management .diagram_box_wrap figcaption { width: 100%; margin-top: 20px; padding-left: 30px; min-height: 20px; color: #67676F; font-size: 1.4rem; line-height: 20px; letter-spacing: -0.01em; display: block; position: relative; }
    .information_protection_management .diagram_box_wrap figcaption::before{content:'1';width:20px;height:20px; border-radius:50%;color:#fff;font-weight: 700;font-size: 1.2rem;text-align: center;background-color:#9FCAFA;display:inline-flex; align-items:center; justify-content:center; position:absolute; top:0; left:0; z-index:1;}
    .information_protection_management .visual_area img { max-width: 100%; height: auto; }
    .information_protection_management .notice_text { font-size: 14px; color: #67676f; }
    .information_protection_management .policy_wrap { width: 100%; margin-top: 0; border-top: 2px solid #161616; }
    .information_protection_management .policy_wrap table { margin-top:0; }
    .information_protection_management .policy_wrap th { border-top:0; }
    .information_protection_management table th { font-size: 1.8rem; font-weight: 700; color: #161616; padding: 24px;}
    .information_protection_management table td { font-size: 1.8rem; color: #161616; line-height: 1.6; padding: 24px;}


    .intro_section + .intro_section {margin-top:120px;}

    .intro_summary {margin-bottom:100px; text-align:center;}


    @media screen and (max-width: 1024px) {
        .item_wrap {flex-direction:column; align-items:center;}
        .card_grid {flex-wrap:wrap;}
        :deep(.section_title_sub) br {display:block;}
        .strategy_card {width: calc(50% - 10px); flex: none;}
        .wide_info_box { flex-direction: column; }
        .process_flow {flex-direction:column; flex-wrap: wrap; gap: 80px 20px; }
        .arrow_next {right:auto; top:auto; bottom:-60px; transform:translateY(0) rotate(90deg);}
        .customer_satisfaction strong {font-size:20px;}
        .customer_satisfaction strong + p {font-size:16px;}
        span.label, p.desc {font-size:16px !important;}
        .num {font-size:16px !important;}
        /* 마케팅 지원: 태블릿 2열 */
        .brand_grid { flex-wrap: wrap; }
        .brand_grid li { flex: none; width: calc(50% - 10px); }
        .grid_column_2 .sub_item {width:100%;}
        .owner_card_layout { grid-template-columns: repeat(2, 1fr); }
        .owner_card_layout .strategy_card {width:auto;}
        .supplychain_policy .policy_box_wrap { padding: 40px; }
        .supplychain_policy .system_bg { padding: 40px; }
        .strategy_info_grid { flex-direction: column; }
        .strategy_info_grid .p_bold { font-size: 22px; }
        .strategy_grid { flex-direction: column; gap: 40px; }
        .timeline_wrapper { gap: 20px; }
        .history_row { gap: 20px; }
        .history_year { font-size: 24px; width: 60px; }
        .sharing_card {width: calc(50% - 20px);}
        .human_rights_management .program_grid .program_item {width: calc(50% - 20px);}
        .human_rights_management .wide_info_box .img_frame {width: 100%; flex: none;}
        .human_rights_management .owner_card_layout {grid-template-columns: repeat(2, 1fr);}
        .talent_vision .circle_item { width: 240px; height: 240px; } 
        .value_detail_grid {display:grid; grid-template-columns: 1fr; padding: 20px; }
        .value_detail_grid .detail_card { max-width:100%; }
        .talent_vision .philosophy_box > div:first-of-type {flex-direction:column;}
        .talent_vision .circle_item strong { font-size: 32px; } 
        .talent_indicators .support_grid {grid-template-columns: 1fr; row-gap: 40px;}
        .talent_indicators .support_item {padding-bottom:0px;}
        .award_section .brand_grid li {width:100%; max-width:100%;}
        .customer_satisfaction .recommend_box {padding:20px; flex-direction:column; gap:24px}
        .btn_icon {width:100%;}
        .customer_satisfaction .recommend_box .btn_icon {margin-top:40px; display:block;}
        .customer_satisfaction .recommend_box [class*="btn_"] {width:100%}
        .customer_satisfaction .safety_system_list{padding:0;}
        .customer_satisfaction .safety_system_list li, .customer_satisfaction .compensation_process_wrap .process_steps .step_box {width:100%;}
        .customer_satisfaction .safety_system_list li::before {width:60px; height:60px;}
        .customer_satisfaction .safety_system_list .tit_wrap strong {font-size:18px;}
        .customer_satisfaction .safety_system_list, .process_steps {flex-direction:column;}
        .customer_satisfaction .award_section .mark_item_group {width: calc(33.333% - 14px);}
        .customer_satisfaction .award_section .mark_item_group .brand_grid.mt60 {margin-top:0px !important}
        .customer_satisfaction .brand_img_box img {width: 100%; max-width: 160px; margin: 0 auto;}
        .safety_management_wrap .diagram_box_wrap {padding: 20px;}
        .award_row .year, .award_row .month {width:60px;}
        .award_row .desc {width:calc(100% - 60px - 60px); display:inline-block;}
        .award_row .year,.award_row .month, .award_row .desc {font-size:14px;}
        .information_protection_management .diagram_box_wrap {padding:20px;}
        .information_protection_management .protection_section.mb120 {margin-bottom:80px !important}
        .information_protection_management .text_summary { font-size: 26px; } 
        .information_protection_management .section_title_sub { font-size: 32px; } 
        .information_protection_management .p_desc { font-size:18px; } 
        .information_protection_management th strong { font-size:16px; font-weight:700; } 
        .information_protection_management td { font-size:16px !important; } 
        .information_protection_management .policy_wrap table {min-width:auto !important;}
        .information_protection_management .policy_wrap colgroup col:first-child { width: 100px !important; } 
        .information_protection_management .policy_wrap + .btn-wrap [class*="btn_"] {width:100%}
        .information_protection_management .mark_item_group { flex-direction: column; align-items: flex-start; gap: 20px; } 
        .information_protection_management .brand_img_box { width: 100%; height: auto; padding: 40px 0; }
        .information_protection_management .notice_wrap {width:100%;}
        .information_protection_management .notice_text {margin-left:20px; margin-right:auto;}
        .information_protection_management .mark_item_group .brand_grid li {width: calc(100vw - 40px);}
        .information_protection_management .mark_item_group .brand_grid.mt60 {margin-top:0px !important}

        .listening_form_wrap .form_row {flex-direction:column;}
        /* 26.06.08 add 정다희 : diagram_box_wrap figcaption 수정  */
        .information_protection_management .diagram_box_wrap figcaption { margin-left: 20px; font-size: 1.2rem; line-height: 20px; min-height: 20px; }
    }

    @media screen and (max-width:768px){
        .cont_inner {padding-top:80px;} /* 26.07.01 Add 이종환 : 탭 헤더 겹침 수정 */

        .title_wrap {display:none;}
        .type_02 {margin-right:-20px; margin-left:-20px; padding:0 20px;}

        .marketing_item {height:200px;}
        .marketing_item .brand_name strong {font-size:1.8rem;}
    }

    @media screen and (max-width: 767px) {
        h3, h4 { font-size:20px !important; }
        h4 + p, .p {font-size:16px !important;}
        .m_br2x {margin-bottom:20px}
        .sub_tab_content {margin-top:0px;}
        :deep(.text_summary) {padding: 60px 0 20px;}
        :deep(.text_summary) br {display:none;}
        .card_grid {flex-wrap:nowrap; overflow-x:auto;}
        .strategy_card {width:335px;/*width:calc(100vw - 80px)*/ flex-direction:column;}
        .philosophy_box {padding:20px;}
        .philosophy_box .btn_icon {width:90%;}.btn_icon_arrow.after:after
        .item_wrap div {width:200px; height:200px;}
        .item_wrap div p {font-size:16px !important;}
        .tab_wrap.tabSlide.mb40 {margin-bottom:0 !important}

        .item_wrap div strong::before {width:40px; height:40px;}
        .item_wrap div strong {font-size:1.8rem;}
        .item_wrap .color_01 strong::before {background:url('@/assets/images/sub/icon_su03_01-01-01_40.png') 0 0;}
        .item_wrap .color_02 strong::before {background:url('@/assets/images/sub/icon_su03_01-01-02_40.png') 0 0;}
        .item_wrap .color_03 strong::before {background:url('@/assets/images/sub/icon_su03_01-01-03_40.png') 0 0;}

        .img_frame { width: 100%; flex: none; height: auto; aspect-ratio: 690/360; }
        .grid_column_2 { flex-direction: column; }
        .intro_summary { margin-bottom:40px }
        .strategy_box .diagram_img_wrap {margin:24px 0 40px;}
        .market_support .support_item .text_area.mt40 {margin-top:16px !important;}
        .market_support .support_item {gap:40px;}

        /* .brand_grid {gap:10px;} */
        /* 프로그램 그리드: 모바일 1열 */
        .program_item { width: 100%; }
        .program_visual { height: auto; aspect-ratio: 16/9; }
        /* 모바일에서 테이블 가독성을 위해 최소폭 지정 */
        .policy_wrap table { min-width: 600px; }
        .policy_wrap th, .policy_wrap td { font-size: 16px; padding: 12px 16px; }
        .competency_support ul li {flex-direction:column;}
        .competency_support .policy_wrap col:first-child { width:100px !important; }
        .competency_support .policy_wrap col:nth-child(2) { width:90px !important; }
        .competency_support .policy_wrap table { min-width:0 }

        .communication_support .support_item div.mb40 {margin-bottom:0 !important}
        .communication_support .policy_wrap { margin-top:0; }
        .communication_support .policy_wrap col:first-child { width:100px !important; }
        .communication_support .policy_wrap col:nth-child(2) { width:90px !important; }
        .communication_support .policy_wrap table { min-width:0 }
        .dream_realization {margin-top:80px}
        .dream_realization .type_bg {padding:0; background:#Fff;}
        .dream_realization .effort_item .desc br {display:none}
        .talent_indicators .support_grid {gap:20;}
        .talent_indicators .support_grid {min-height: 100px;}
        
        /* 하단 섹션 이미지/텍스트 정렬 보정 */
        .wide_info_box { flex-direction: column; }
        .wide_info_box .img_frame { width: 100%; flex: none; }
        :deep(.sub_item) p br {display:none;}
        .owner_card_layout {grid-auto-flow: column; grid-auto-columns: 350px; }
        .owner_card_layout .strategy_card {width:350px}
        .supplychain_policy .policy_box_wrap { padding: 32px 20px; }
        .supplychain_policy .policy_box_wrap .btn-wrap.mt60 { margin-top:24px !important }
        .supplychain_policy .policy_box_wrap .btn-wrap.mt60 [class*="btn_"] { width:100% }
        .gs25_owner_support .program_item { width: 100% !important; }
        .human_rights_management .policy_box_wrap .btn-wrap.mt60 { margin-top:24px !important }
        .human_rights_management .policy_box_wrap .btn-wrap [class*="btn_"] { width:100% }
        .human_rights_management .program_visual {height: auto; aspect-ratio: 16/11;}
        .human_rights_management .program_grid {gap: 32px 10px}
        .human_rights_management .program_grid .program_item {width: calc(50% - 5px);}
        .policy_box_wrap { padding: 32px 20px; }
        .policy_list {gap:20px}
        .policy_list_container.mt40 {margin-top:8px !important}
        .policy_item .label { font-size: 1.8rem; }
        .policy_item .desc { font-size: 16px; }
        .policy_list_container + .btn-wrap.mt60 {margin-top:40px !important}
        .supplychain_policy .system_bg { padding: 20px; }
        .supplychain_policy .system_bg img {padding:0;}
        .strategy_main_img { max-width: 295px; }
        .csr_outline .view_box { padding: 30px 20px; }
        .csr_outline .text_l_bold { font-size: 20px; white-space: normal; }
        .history_row { flex-direction:column;}
        .history_item { font-size: 16px; line-height: 1.4; height: auto; padding: 0  0 12px 0; }
        .history_year { font-size: 20px; line-height: 1.4; width: 50px; margin-left: 40px; }
        .history_details { margin-left:40px; }
        .vulnerable_support .text_area.mt40,
        .community_support_area .text_area.mt40,
        .broadcasting_development .text_area.mt40,
        .sharing_angel .text_area.mt40 {margin-top:16px !important;}
        .community_support_area .program_grid,
        .broadcasting_development .program_grid,
        .sharing_angel .program_grid {gap:40px;}
        .broadcasting_development .brand_grid {gap:0px 20px; flex-wrap: nowrap; overflow-x: auto;}
        .community_support_area .brand_grid li,
        .broadcasting_development .brand_grid li {width:calc(50% - 10px); margin-bottom:0 !important; flex:none}
        .vulnerable_support .brand_grid li .brand_img_box,
        .community_support_area .brand_grid li .brand_img_box,
        .broadcasting_development .brand_grid li .brand_img_box { height: 162px; }
        .vulnerable_support .brand_grid li .brand_img_box img,
        .community_support_area .brand_grid li .brand_img_box img,
        .broadcasting_development .brand_grid li .brand_img_box img { max-width: 80%; }
        .vulnerable_support .brand_grid li .brand_name,
        .community_support_area .brand_grid li .brand_name,
        .broadcasting_development .brand_grid li .brand_name { text-align: center; }
        .community_support_area .brand_grid li .brand_name strong,
        .broadcasting_development .brand_grid li .brand_name strong { font-size:16px; white-space: nowrap;}
        .vulnerable_support .brand_grid li .brand_name strong { word-break: keep-all; }
        .community_support_area div.mb40 { margin-bottom:24px; }
        .human_rights_management .owner_card_layout {grid-template-columns: repeat(1, 1fr);}
        .talent_performance_data .policy_wrap table {min-width: 500px;}
        .talent_performance_data .intro_summary .GS {font-size: 16px;}
        .talent_performance_data .intro_summary :deep(.GS) br {display:none;}
        .talent_performance_data .policy_wrap.mt60 {margin-top:40px !important; border-top:1px solid #161616;}
        .talent_performance_data .policy_wrap *:not(button) {all:unset}
        .talent_performance_data .policy_wrap thead {display:none}
        .talent_performance_data .policy_wrap tr {position:relative; display:flex; justify-content:space-between; align-items:center; padding:13px 10px; border-bottom:1px solid #E5E5E5;}
        .talent_performance_data .policy_wrap tr td {padding:0; border:0;}
        .talent_performance_data .policy_wrap tr td:nth-of-type(1) {display:none;}
        .talent_performance_data .policy_wrap tr td:nth-of-type(2) {padding-bottom:20px; font-size:16px;}
        .talent_performance_data .policy_wrap tr td:last-of-type {position:absolute; left:10px; bottom:13px; font-size:12px; color:#67676F }
        .talent_performance_data .policy_wrap tr td .btn_download_file span {display:none;}
        .value_detail_grid { padding: 0;} 
        .detail_card { padding: 24px; }
        .customer_satisfaction .award_section .mark_item_group {width: calc(50% - 10px);}
        .customer_satisfaction .award_section {gap:32px 10px}
        .customer_satisfaction .award_section .info_box {gap:6px}
        .customer_satisfaction .award_section .info_box .tit {margin-bottom:0;}
        .customer_satisfaction .brand_img_box {height:162px;}
        .customer_satisfaction .brand_img_box img {width:50%;}
        .customer_satisfaction .policy_box_wrap .btn-wrap [class*="btn_"] {width:100%;}
        .award_section .info_box .tit {font-size:16px; text-align:center;}
        :deep(.award_section) .info_box .tit br {display:none;}
        .award_section .info_box .date {font-size:14px; color:#67676F; text-align:center;}
        .customer_satisfaction .compensation_process_wrap .process_steps {padding:40px;}
        .customer_satisfaction .compensation_process_wrap .process_steps .step_box {padding-top:0; padding-left:60px;}
        .information_protection_management .award_section .info_box .tit, .information_protection_management .award_section .info_box .date  {text-align:left;}
        .information_protection_management .award_section .info_box .tit span {font-size:16px; font-weight:700;}
        .information_protection_management .award_section .info_box .tit {font-size:14px; font-weight:400; display:flex; flex-direction:column;}
        .customer_satisfaction .compensation_process_wrap .process_steps + .btn-wrap [class*="btn_"] {width:100%;}
        .input_item, .input_complex, .input_wrap, .w428 {width:100%;}
        .form_body .form_row:first-of-type {padding-top:0px;}
        .listening_form_area .consent_box {padding:30px 20px;}
        .listening_form_wrap .input_group.email {flex-direction:column;}
        .listening_form_wrap .input_group.email .select {width:100%;}
        .safety_management_wrap .tab_wrap.mb80 {margin-bottom:32px !important;}
        .safety_management_wrap .text_summary {padding-top:0px;}
        .safety_management_wrap .system_item {width:100%;}
        .safety_management_wrap .system_item {padding: 24px 0 24px 76px;}
        .safety_management_wrap .text_box::before {width:60px; height:60px; top:50%; transform:translateY(-50%);}
        .system_item:first-of-type .text_box::before {transform:translateY(0%);}
        .safety_management_wrap .system_item:nth-of-type(2) .text_box::before {top:50%}
        .safety_management_wrap .system_item:nth-of-type(2) {padding-top:24px;}
        .safety_management_wrap .system_item .num { font-size: 16px;}
        .safety_management_wrap .system_item .tit { font-size: 1.8rem;}
        .safety_management_wrap .system_item .sub { font-size: 16px;}
        .safety_management_wrap .text_summary, .safety_management_wrap .section_title_sub {font-size:20px !important;}
        .safety_management_wrap .consent_agree  {flex-direction:column;}
        .safety_management_wrap .policy_card_box {padding:32px 20px;}
        .safety_management_wrap .policy_list_wrap { display: flex;}
        .safety_management_wrap .policy_item { display: flex; flex-direction:row; align-items: flex-start; gap: 8px; }
        .safety_management_wrap .item_label {font-size:16px; font-weight: 700; color: #161616; white-space: nowrap; }
        .safety_management_wrap .item_text { font-size:16px;}
        .safety_management_wrap .p_desc, .safety_management_wrap .consent_tit {font-size:18px;}
        .safety_management_wrap .consent_list li, .safety_management_wrap .consent_agree p, .listening_form_wrap .guide_msg_multi {font-size:14px;}
        .safety_management_wrap .policy_card_box .btn-wrap [class*="btn_"] {width:100%;}
        .safety_management_wrap .protection_section.mb120 {margin-bottom:80px !important;}
        .listening_form_wrap .input_complex .textarea_wrap {max-width:600px;}
        :deep(.guide_msg_multi) span {margin-bottom:8px; display:block;}
        :deep(.guide_msg_multi) span:last-of-type {margin-bottom:0;}
        :deep(.check) em {font-size:16px !important;}
        .guide_text + .input_wrap {justify-content:flex-start; margin-top:16px;}
        .form_container .btn-wrap {display:flex; justify-content:flex-start; gap:8px;}
        .form_container .btn-wrap * {width:50%;}
        .information_protection_management .diagram_box_wrap.scroll {padding:0; background-color: #fff; align-items: flex-start;}
        .information_protection_management .visual_area.scroll_wrap {width: calc(100vw - 40px); overflow-x: auto;  overflow-y: hidden; display: block; -webkit-overflow-scrolling: touch;}
        .information_protection_management .visual_area.scroll_wrap img {min-width: 700px; width: auto;max-width: none;  display: block;}
        .noti_non_member span {font-size:14px; line-height:20px;}
        .noti_non_member ul {padding-left:0;}
        .noti_non_member ul li {font-size:12px;}


        .index_box strong {font-size:2rem;}

        .intro_section + .intro_section {margin-top:80px;}

        .process_flow {gap:60px 20px;}
        .step_unit {width:200px; height:200px;}
        .step_desc::before {width:60px; height:60px;}
        .arrow_next {width:20px; height:20px; background-image:url('@/assets/images/sub/arrow_su03_01-02-01_20.png'); bottom:-40px; transform:rotate(0deg);}

        .process_flow .step_unit:nth-child(1) .step_desc:before {background:url('@/assets/images/sub/icon_su03_01-02-01_60.png') 0 0;}
        .process_flow .step_unit:nth-child(2) .step_desc:before {background:url('@/assets/images/sub/icon_su03_01-02-02_60.png') 0 0;}
        .process_flow .step_unit:nth-child(3) .step_desc:before {background:url('@/assets/images/sub/icon_su03_01-02-03_60.png') 0 0;}
        .process_flow .step_unit:nth-child(4) .step_desc:before {background:url('@/assets/images/sub/icon_su03_01-02-04_60.png') 0 0;}


        .support_item + .support_item {margin-top:80px;}
        .finance_support h3 {margin-bottom:20px;}
        .finance_support .card_grid {flex-wrap:wrap;}
        .finance_support .card_grid .strategy_card {width:100%; padding:32px;}
        .text_summary_sub {margin-bottom:40px; font-size:1.6rem; line-height:124%;}

            /* 방송편성 */
        .broadcasting_support .small_business {flex-direction:column;}
        .broadcasting_support .small_business figure {width:100%; height:335px; margin-bottom:32px;}
        .broadcasting_support .small_business figure + div {width:100%;}
        .broadcasting_support .small_business figure + div .sub_item {margin-bottom:32px;}
        .broadcasting_support .small_business figure + div .sub_item:last-of-type {margin-bottom:0;}

        .competency_support .visual_wrap .img_frame {width:100%;}
        .talent_indicators .item_inner .tit {font-size:1.8rem}
        .talent_indicators .support_item {min-height: 0; padding-bottom: 24px; padding-left: 76px;}
        .talent_indicators .support_item::before {width: 60px; height: 60px;}
        .talent_indicators .support_item:after {width: 32px; height: 32px; top: 14px; left: 14px; background-size: 32px auto;}

        .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(1):after {background-position: -2px 0;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(2):after {background-position: -2px -43px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(3):after {background-position: -2px -86px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(4):after {background-position: -2px -129px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(5):after {background-position: -2px -173px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(1) .support_item:nth-of-type(6):after {background-position: -2px -217px;}

        .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(1):after {background-position: -2px -261px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(2):after {background-position: -2px -305px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(3):after {background-position: -1px -348px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(4):after {background-position: -1px -392px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(2) .support_item:nth-of-type(5):after {background-position: -2px -436px;}

        .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(1):after {background-position: -1px -479px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(2):after {background-position: -1px -522px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(3):after {background-position: -2px -566px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(4):after {background-position: -1px -610px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(5):after {background-position: -1px -653px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(6):after {background-position: -1px -697px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(7):after {background-position: -1px -740px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(3) .support_item:nth-of-type(8):after {background-position: -2px -784px;}

        .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(1):after {background-position: 0px -828px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(2):after {background-position: 1px -872px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(3):after {background-position: 1px -915px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(4):after {background-position: 1px -958px;}
        .talent_indicators .icon_wrap.support_section:nth-of-type(4) .support_item:nth-of-type(5):after {background-position: 1px -1002px;}

        .customer_satisfaction .safety_system_list li {padding-left:76px;}
        .customer_satisfaction .safety_system_list li:after {width: 32px; height: 32px; top: 14px; left: 14px;}
        .customer_satisfaction .safety_system_list li:nth-of-type(1):after {background: url('@/assets/images/sub/icon_cont_32.png') no-repeat -1141px -103px;}
        .customer_satisfaction .safety_system_list li:nth-of-type(2):after {background: url('@/assets/images/sub/icon_cont_32.png') no-repeat -179px -266px;}
        .customer_satisfaction .safety_system_list li:nth-of-type(3):after {background-size: 32px auto;}

        
        .safety_management_wrap .text_box:before {width: 60px; height: 60px;}
        .safety_management_wrap .text_box:after {width: 32px; height: 32px; top: 26px; left: 14px; background-size: 32px auto;}
        .safety_management_wrap .system_item:nth-of-type(1) .text_box:after {top: 12px; background-position: -1px -479px;}
        .safety_management_wrap .system_item:nth-of-type(2) .text_box:after {top: 40px; background-position: -1px -522px;}
        .safety_management_wrap .system_item:nth-of-type(3) .text_box:after {background-position: -2px -566px;}
        .safety_management_wrap .system_item:nth-of-type(4) .text_box:after {background-position: -1px -610px;}
        .safety_management_wrap .system_item:nth-of-type(5) .text_box:after {background-position: -1px -653px;}
        .safety_management_wrap .system_item:nth-of-type(6) .text_box:after {background-position: -1px -697px;}
        .safety_management_wrap .system_item:nth-of-type(7) .text_box:after {background-position: -1px -740px;}

        /* 인재경영지표 */
        .talent_indicators .support_section.award_section .award_list + div {width:340px;}
        .talent_indicators .support_section.award_section .info_box .tit,
        .talent_indicators .support_section.award_section .info_box .date {text-align: left;}
        .talent_indicators :deep(.award_section) .info_box .tit br {display: block;}
    }
</style>