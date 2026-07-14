<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <p class="intro_desc">{{ t.intro }}</p>

                <div class="pop_guide_wrap">

                    <!-- I. 목적 -->
                    <section class="section">
                        <strong class="title">{{ t.section1.title }}</strong>
                        <ul>
                            <li v-for="(item, index) in t.section1.items" :key="index">
                                <p class="desc">{{ item.content }}</p>
                            </li>
                        </ul>
                    </section>

                    <!-- Ⅱ. 실천사항의 구성 -->
                    <section class="section">
                        <strong class="title">{{ t.section2.title }}</strong>
                        <ul>
                            <li v-for="(item, index) in t.section2.items" :key="index">
                                <p class="desc">{{ item.content }}</p>
                            </li>
                        </ul>
                    </section>

                    <!-- Ⅲ. 계약체결 인프라 구축 -->
                    <section class="section">
                        <strong class="title">{{ t.section3.title }}</strong>
                        
                        <div class="smp_announcement">
                            <strong class="title_b">{{ t.section3.step1.title }}</strong>
                            <ul>
                                <li v-for="(item, index) in t.section3.step1.items" :key="index">
                                    <p class="desc">{{ item.content }}</p>
                                </li>
                            </ul>
                            <table class="base_table">
                                <colgroup>
                                    <col style="width:180px" />
                                    <col style="" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col" class="ac">{{ t.section3.step1.TableHeader.col1 }}</th>
                                        <th scope="col" class="ac">{{ t.section3.step1.TableHeader.col2 }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in t.section3.step1.IRListData" :key="'ir-'+idx">
                                        <td class="ac" v-if="item.span > 0" :rowspan="item.span">{{ item.title }}</td>
                                        <td class="al">{{ item.content }}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <strong class="title_b">{{ t.section3.step2.title }}</strong>
                            <ul>
                                <li v-for="(item, index) in t.section3.step2.items" :key="index">
                                    <p class="desc">{{ item.content }}</p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <!-- Ⅳ. 자기결정권이 보장된 계약체결 -->
                    <section class="section">
                        <strong class="title">{{ t.section4.title }}</strong>
                        
                        <div class="smp_announcement">
                            <strong class="title_b">{{ t.section4.step1.title }}</strong>
                            
                            <!-- 가. 공개 관련 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section4.step1.partA.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section4.step1.partA.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- 나. 구체성 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section4.step1.partB.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section4.step1.partB.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- 다. 공정성 (절차 이미지 포함) -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section4.step1.partC.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section4.step1.partC.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- 라. 공평한 거래개시 기회 부여 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section4.step1.partD.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section4.step1.partD.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- 마. 파트너사 등록취소 기준 및 절차의 공개성 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section4.step1.partE.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section4.step1.partE.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- 바. 파트너사 등록취소 기준의 구체성 및 명확성 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section4.step1.partF.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section4.step1.partF.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- 사. 등록취소 기준 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section4.step1.partG.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section4.step1.partG.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                                <div class="cancel_criteria">
                                    <strong class="title_b">{{ t.section4.step1.partG.label2 }}</strong>
                                    <ul class="row">
                                        <li v-for="(row, idx) in t.section4.step1.partG.rows" :key="'can'+idx">
                                            {{ row }}
                                        </li>
                                    </ul>

                                    <strong class="title_b">{{ t.section4.step1.partG.label3 }}</strong>
                                    <ul class="row">
                                        <li v-for="(row, idx) in t.section4.step1.partG.rows2" :key="'un'+idx">
                                            {{ row }}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="section">
                        <strong class="title">{{ t.section5.title }}</strong>
                        
                        <div class="smp_announcement">
                            <strong class="title_b">{{ t.section5.step1.title }}</strong>
                            
                            <!-- 가. 민법 등 관련 법령의 준수 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step1.partA.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step1.partA.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- 나. 단가 인하 시 사전 충분한 합의 및 서면 발급 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step1.partB.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step1.partB.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!-- 다. 계약변경에 따른 대금 조정 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step1.partC.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step1.partC.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>


                            <strong class="title_b">{{ t.section5.step2.title }}</strong>
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partA.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partA.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partB.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partB.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partC.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partC.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                             <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partD.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partD.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                             <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partE.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partE.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <!--<div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partF.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partF.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>-->

                             <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partG.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partG.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                             <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partH.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partH.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partI.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partI.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partJ.label }}</strong>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partJ.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>

                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section5.step2.partK.label }}</strong>

                                <strong class="title_b">{{ t.section5.step2.partK.label2 }}</strong>
                                <ul class="row">
                                    <li v-for="(row, idx) in t.section5.step2.partK.rows" :key="'can'+idx">
                                        {{ row }}
                                    </li>
                                </ul>
                                <ul>
                                    <li v-for="(item, index) in t.section5.step2.partK.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                    
                    <!--ⅤI. 시스템운영 -->
                    <section class="section">
                        <strong class="title">{{ t.section6.title }}</strong>
                        <ul>
                            <li v-for="(item, index) in t.section6.items" :key="index">
                                <p class="desc">{{ item.content }}</p>
                            </li>
                        </ul>
                    </section>

                    <!-- 부칙 -->
                    <section class="section addendum">
                        <strong>{{ t.addendum.title }}</strong>
                        <div class="addendum_box">
                            <strong>{{ t.addendum.article }}</strong>
                            <p v-for="(line, idx) in t.addendum.lines" :key="idx" class="desc">
                                {{ line }}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "gsrsu04020302",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "서면 발급,보존 가이드 라인",
                    intro: '2021.04.\nGS리테일\n\n GS리테일대·중소기업간 상생협력을 위한 계약 체결 가이드라인',
                    section1: {
                        title: "Ⅰ. 목적",
                        items: [
                            { content: '- 이 실천사항은 공정거래위원회의 "대중소기업간 상생협력을 위한 계약체결 가이드라인"을 준용하여 GS리테일(이하 “회사”)과 중소 파트너사간 계약체결에 있어 중소 파트너사의 이익을 정당하게 반영할 수 있게 하는데 그 목적이 있다.' },
                            { content: "- 회사가 중소 파트너사와의 거래에서 우월한 교섭력을 남용하여 계약 자유의 원칙을 저해하는 것을 방지하고, 회사와 중소 파트너사간 계약체결에 있어 합리적이고 공정한 거래 관행을 구축, 실천하고자 한다." },
                        ]
                    },
                    section2: {
                        title: "Ⅱ. 실천사항의 구성",
                        items: [
                            { content: '- 이 실천사항은 계약체결전 회사가 구축해야할 "계약체결 인프라", 자기결정권이 보장된 상황에서 계약회사자들이 포함해야 할 바람직한 사항 등이 제시된 "자기결정권이 보장된 계약체결", 계약이행에 있어 준수해야 할 사항이 제시된 "계약서 및 관련 법령에 충실한 계약 이행"으로 구성되어 있다.' },
                        ]
                    },
                    section3: {
                        title: "Ⅲ. 계약체결 인프라 구축",
                        step1: {
                            title: "1. 계약체결 방식의 선택 기준",
                            items: [
                                { content: '- 회사는 거래상 지위 및 시장에서의 파급력을 고려하여 일정한 기준에 따라 계약체결방식을 선택한다. 물품의 중요성, 거래가능상대방의 수, 거래경험, 전체거래금액 대비 기준 등을 고려하여 계약 체결방식을 선택하여 체결한다.' },
                            ],
                            TableHeader: { col1: "계약체결방식", col2: "요건" },
                            IRListData: [
                                { title: "수의계약", content: "원자재의 가격급등 기타 이에 준하는 경우로서 경쟁에 부칠 여유가 없을 경우", span: 4 },
                                { title: "", content: "사실상 경쟁이 불가능한 경우\n- 특허공법이나 신기술에 의한 공사\n- 특허를 받았거나 실용신안등록 또는 디자인등록이 된 물품을 제조하게 하거나 구매하는 경우", span: 0 },
                                { title: "", content: "현재의 거래 상대방과 계약을 할 수 밖에 없는 경우\n- 당해 물품을 제조·공급한 자가 직접 그 물품을 설치·조립 또는 정비하는 경우\n- 당해 물품 등을 제조·공급한 자 외의 자로부터 제조·공급을 받게 되면 호환성이 없게 되는 경우", span: 0 },
                                { title: "", content: "기타 특정인의 기술·용역,특정한 위치·구조·품질·성능·효율 등으로 인하여 경쟁을 할 수 없는 경우", span: 0 },
                                { title: "일반경쟁계약", content: "물품 등의 유형 및 중요성, 거래상대방 수 등을 고려 선택", span: 1 },
                                { title: "제한경쟁계약", content: "특수한 설비 또는 기술이 요구되는 물품제조계약", span: 4 },
                                { title: "", content: "특수한 성능 또는 품질이 요구되는 물품구매계약", span: 0 },
                                { title: "", content: "특수한 기술이 요구되는 용역계약", span: 0 },
                                { title: "", content: "계약이행의 부실화를 방지하기 위하여 필요한 경우에는 경쟁참가자의 재무상태\n※ 경쟁참가자의 자격을 제한하고자 할때에는 입찰 공고 시 그 제한사항과 기준을 명시", span: 0 },
                                { title: "지명경쟁계약", content: "계약의 성질 또는 목적에 비추어 특수한 설비·기술·자재·물품 또는 실적이 있는 자가 아니면 계약의 목적을 달성하기 곤란한 경우로서 입찰대상자가 5인 이내인 경우", span: 2 },
                                { title: "", content: "규격표시를 인증받은 제품, 환경표지의 인증을 받은 제품을 구매할 경우", span: 0 },
                            ],
                        },
                        step2: {
                            title: "2. 파트너사 협업 시스템 및 지원조직 운영",
                            items: [
                                { content: '- 회사는 소싱포탈시스템을 통하여 파트너사 및 신규업체와의 거래에 필요한 정보 등을 제공하며, 상생을 도모한다.' },
                                { content: '- 거래를 희망한 신규업체는 자사 소싱포탈이나 자사 고객센터를 통하여 거래 희망을 제안할 수 있다.' },
                                { content: '- 회사는 파트너사에 대한 기술지원, 자금지원, 교육, 제안제도 등을 담당하는 지원조직을 운영한다.' }
                            ],
                        }
                    },
                    section4: {
                        title: "Ⅲ. 파트너사 선정·운용 실천사항",
                        step1: {
                            title: "1. 파트너사 선정 기준, 절차",
                            partA: {
                                label: "가. 서면의 사전 발급",
                                items: [
                                    { content: '➀ 사전에 계약서를 체결하는 것을 원칙으로하며, 최소한 납품 등을 위한 작업에 착수하기 전에 기명날인이 있는 계약서를 체결한다.' },
                                    { content: '➁ 계약서에는 하도급대금과 그 지급방법 등 하도급계약의 내용과 원자재 가격변동에 따른 하도급대금의 조정요건, 방법 및 절차 등 시행령에서 규정하고 있는 내용을 반드시 포함한다.' },
                                    { content: '➂ 경미하고 빈번한 추가 작업으로 인해 물량변동이 명백히 예상되는 경우 납품 등의 완료 후 즉시 정산합의서를 교부한다.' },
                                    { content: '➃ 통상 허용되는 기간보다 현저히 짧은 기간내에 추가로 요구할 경우에는 주요 내용에 대해 사전에 서면으로 합의한다.' },
                                ],
                            },
                            partB: {
                                label: "나. 합리적인 산정방식에 의한 단가 결정",
                                items: [
                                    { content: '➀ 부품의 단가는 수량·품질·사양·납기·대금지급방법·재료가격·노무비 또는 시가의 동향 등을 고려하고 적정한 관리비 및 이익을 가산한 합리적인 산정방식에 따라 협의하여 결정한다.' },
                                    { content: '➁ 계약기간 중 최초 단가에 변경사유가 발생한 때에는 회사에게 단가조정신청을 할 수 있으며, 이 경우 신청일로부터 30일(30일 연장 가능) 이내에 상호 협의하여 다시 정한다.' },
                                    { content: '➂ 단가결정이 특별한 사유로 인하여 지연될 경우에는 협의하여 정한 임시단가를 적용하되, 이 경우 임시단가와 확정단가의 차액은 확정단가를 정하는 때에 소급하여 정산한다.' },
                                    { content: '➃ 원가산정에 있어 기준이 되는 임률을 정기적으로 조사하여 현실에 맞는 단가를 제시하되, 동종업계의 인건비를 고려하여 작업여건, 파트너사 규모, 기술수준 등 업체별 특성에 따라 임률을 책정한다.' },
                                    { content: '➄ 최초 정해진 단가가 변경될 때 당사자간 협의할 수 있는 기준 및 절차를 계약서에 규정한다.' },
                                    { content: '➅ 단가변경의 사유(물가, 원자재 가격, 환율 변화 등), 협의기간, 대금지급조건 등 구체적인 내용을 적시한다.' },
                                ],
                            },
                            partC: {
                                label: "다. 명확한 납기",
                                items: [
                                    { content: '➀ 업종별 특성 및 정상적인 관행에 적합한 납기를 파트너사와 충분한 합의를 거쳐 결정한다.' },
                                    { content: '➁ 계약체결시 납기를 정하고 납기를 변경할 경우 이를 명확히 하여야 하며, 긴급발주 등의 명목으로 평소보다 짧은 납기를 정할 경우에는 파트너사와 협의를 거쳐 합의한다.' },
                                    { content: '➂ 파트너사에게 책임을 돌릴 사유가 없음에도 불구하고, 부당한 수령지연 또는 거부로 인하여 파트너사가 손해를 입은 경우에 이를 배상한다.' },
                                ],
                            },
                            partD: {
                                label: "라. 객관적 검사 기준",
                                items: [
                                    { content: '➀ 납품물 등에 대한 검사에 있어 파트너사와 협의하여 객관적이고 공정·타당한 검사의 기준 및 방법을 정한다.' },
                                    { content: '➁ 납품 등이 있는 때에는 검사전이라도 즉시 수령증을 교부하여야 하며, 검사는 미리 정한 검사규정 및 절차에 따라 신속히 실시한다.' },
                                    { content: '➂ 정당한 사유가 있는 경우를 제외하고는 파트너사로부터 납품물을 수령한 날로부터 10일 이내에 검사결과를 통지한다.' },
                                    { content: '➃ 검사 전 또는 검사기간 중의 발주부품에 대하여 선량한 관리자의 주의를 가지고 관리한다.' },
                                ],
                            },
                            partE: {
                                label: "마. 합리적인 대금지급 기일 결정",
                                items: [
                                    { content: '➁ 파트너사에게 제조 등의 위탁을 한 경우로서 발주자로부터 제조·수리·시공 또는 용역수행행위의 완료에 따라 준공금 등을 받은 때에는 대금을 그 지급받은 날부터 15일(대금의 지급기일이 그 전에 도래하는 경우에는 그 지급기일) 이내에 지급한다.' },
                                    { content: '➂ 제조·수리·시공 또는 용역수행행위의 진척에 따라 기성금 등을 받은 때에는 파트너사가 제조·수리·시공 또는 용역수행한 분에 상당한 금액을 그 지급받은 날부터 15일(대금의 지급기일이 그 전에 도래하는 경우에는 그 지급기일)이내에 파트너사에게 지급한다.' },
                                    { content: '➃ 파트너사에게 대금을 지급함에 있어서는 발주자로부터 당해 제조 등의 위탁과 관련하여 지급받은 현금비율 이상으로 지급한다.' },
                                    { content: '➄ 대금을 어음으로 지급하는 경우에는 당해 제조 등의 위탁과 관련하여 발주자로부터 교부받은 어음의 지급기간(발행일로부터 만기일까지)내의 어음을 교부한다.' },
                                    { content: '➅ 대금을 어음으로 지급하는 경우에 그 어음은 법률에 근거하여 설립된 금융기관에서 할인이 가능한 것이어야 하며, 어음을 교부한 날로부터 어음의 만기일까지의 기간에 대한 할인료(공정위가 정하여 고시하는 할인율)를 어음을 교부하는 날에 지급한다.' },
                                    { content: '➆ 납품물 등의 수령일부터 60일 이내에 어음을 교부하는 경우에는 납품물 등의 수령일로부터 60일을 초과한 날 이후 만기일까지의 기간에 대한 할인료를 납품물 등의 수령일부터 60일 이내에 지급한다.' },
                                    { content: '➇ 대금을 어음대체결제수단을 이용하여 지급하는 경우 지급일(기업구매전용카드의 경우는 카드결제 승인일을, 외상매출채권 담보대출의 경우는 납품 등의 내역전송일을, 구매론의 경우는 구매자금결제일을 말함)부터 하도급대금 상환기일까지의 기간에 대한 수수료(대출이자를 포함)를 지급일에 지급한다.' },
                                    { content: '➈ 납품물 등의 수령일부터 60일 이내에 어음대체결제수단을 이용하여 지급하는 경우에는 목적물등의 수령일부터 60일을 초과한 날 이후 하도급대금 상환기일까지의 기간에 대한 수수료를 납품물 등의 수령일부터 60일 이내에 파트너사에게 지급한다.' },
                                    { content: '➉ 대금을 납품물 등의 수령일로부터 60일을 초과하여 지급하는 경우에는 그 초과기간에 대하여 공정위가 정하여 고시하는 이율에 의한 이자를 지급한다.' },
                                ],
                            },
                            partF: {
                                label: "바. 납품 등 이후 발견되는 하자에 대한 합리적인 반품 처리",
                                items: [
                                    { content: '- 하자원인 규명 주체, 하자원인의 종류, 그에 따른 책임부담비율 등을 규정하여 당사자간 합의에 의한 반품처리한다.' },
                                ],
                            },
                            partG: {
                                label: "사. 계약 해제·해지",
                                items: [
                                    { content: '① 사유는 회사자 간의 합의에 의해 정하고 ‘최고 없이 가능한 경우’와 ‘최고가 필요한 경우’를 구분하되 해제·해지사유가 발생한 경우에는 서면으로 지체 없이 통보한다.' },
                                ],
                                label2: "② 최고 없이 가능한 경우는 다음 각 호와 같다.",
                                rows: [
                                    "- 거래상대방이 금융기관으로부터 거래정지처분을 받거나, 감독관청으로부터 영업취소·영업정지 등의 처분을 받은 경우",
                                    "- 거래상대방이 해산, 영업의 양도 또는 타 회사로의 합병을 결의하거나, 재해 기타 사유로 인하여 기본계약 또는 개별계약의 내용을 이행하기 곤란하다고 쌍방이 인정한 경우"
                                ],
                                label3: "③ 최고가 필요한 경우는 다음 각 호와 같으며 이 경우에는 상대방에게 1개월 이상의 기간을 정하여 그 이행을 최고하고, 그 기간내에 이행하지 아니한 때에 해제·해지할 수 있다.",
                                rows2: [
                                    "- 거래상대방이 본 계약 또는 개별계약의 중요한 내용을 위반한 경우, 납품 등을 받는 업체가 정당한 사유없이 발주부품의 제작에 필요한 사항의 이행을 지연하여 파트너사의 작업에 지장을 초래한 경우",
                                    "- 거래상대방이 정당한 사유없이 발주부품의 제작을 거부하거나 착수를 지연하여 납기내에 납품 등이 곤란하다고 인정되는 경우",
                                    "- 거래상대방의 기술·생산 및 품질관리능력이 부족하여 계약내용을 원만히 이행할 수 없다고 인정되는 상당한 이유가 있는 경우"
                                ],
                            },
                        },
                        step2: {
                            title: "2. 계약체결 시 지양 사항",
                            partA: {
                                label: "가. 서면을 발급하지 않거나 보존하지 않는 행위",
                                items: [
                                    { content: '➀ 정당한 사유없이 위탁시점에 확정하기 곤란한 사항에 대하여 해회사항을 기재하지 아니한 서면을 발급하면서 해회사항이 정하여지지 아니한 이유, 그 사항을 정하게 되는 예정기일을 기재하지 않고 발급하는 행위' },
                                    { content: '➁ 일부사항을 기재하지 아니한 서면을 발급한 이후 해회사항이 확정되었음에도 불구하고 파트너사에게 새로운 서면을 지연 발급하거나 발급하지 아니하는 행위' },
                                    { content: '➂ 구두위탁(발주)한 내용에 대해 파트너사로부터 위탁한 작업의 내용, 하도급대금, 위탁일시 등 위탁내용의 확인을 요청받고도 15일 이내에 인정(認定) 또는 부인(否認)의 의사를 서면으로 회신하지 아니하는 행위' },
                                    { content: '➃ 구두위탁(발주)한 내용에 대해 위탁내용의 인정 또는 부인의 의사를 회신하면서 원사업자(계약담당임원 등 회사 계약책임자)의 서명 또는 기명날인을 하지 아니하는 행위' },
                                    { content: '➄ 추가작업의 범위가 구분되고 금액이 상당함에도 이에 대한 구체적인 추가계약서나 작업지시서 등을 발급하지 아니한 행위' },
                                    { content: '➅ 법정서류를 3년간 보존하지 아니하고 원사업자의 규정 등에 따라 임의적으로 3년 이내 폐기하는 행위' },
                                    { content: '➆ 거래종료일로부터 3년간 서면(서류)을 보존하고 있으나 허위서면(서류)이거나 허위내용의 서류를 사후 작성하여 보존하는 행위' },
                                    { content: '➇ 입찰내역서, 낙찰자 결정품의서, 견적서, 건설위탁의 경우 현장설명서, 시방서 등 하도급대금 결정과 관련된 서류를 보존하지 아니하는 행위' },
                                ],
                            },
                            partB: {
                                label: "나. 부당한 하도급대금 결정 행위",
                                items: [
                                    { content: '① 정당한 이유 없이 일률적인 비율로 단가를 인하하여 하도급대금을 결정하는 행위' },
                                    { content: '② 협조요청 등 명목여하를 불문하고 일방적으로 일정금액을 할당한 후 당해 금액을 감하여 하도급대금을 결정하는 행위' },
                                    { content: '③ 정당한 이유 없이 특정 파트너사를 차별취급 하여 대금을 결정하거나, 파트너사와의 합의없이 일방적으로 낮은 단가에 의하여 대금을 결정하는 행위' },
                                    { content: '④ 발주량 등 거래조건에 대하여 착오를 일으키게 하거나 다른 사업자의 견적 또는 거짓견적을 내보이는 등의 방법으로 파트너사를 기만하고 이를 이용하여 대금을 결정하는 행위' },
                                    { content: '⑤ 수의계약으로 계약을 체결함에 있어서 정당한 사유 없이 직접공사비 항목의 값을 합한 금액보다 낮은 금액으로 대금을 결정하는 행위' },
                                    { content: '⑥ 경쟁입찰에 의하여 계약을 체결함에 있어서 정당한 사유없이 최저가로 입찰한 금액보다 낮은 금액으로 대금을 결정하는 행위' },
                                    { content: '⑦ 자재의 가격하락 및 노임하락 등 객관적으로 타당한 단가인하 사유없이 일률적으로 단가를 인하하여 대금을 결정하는 행위' },
                                    { content: '⑧ 대금지급조건, 거래수량, 작업의 난이도 등의 차이가 없음에도 특정 파트너사를 차별취급하여 대금을 낮게 결정하는 행위' },
                                    { content: '⑨ 다량 발주를 전제로 하여 견적하도록 한 후, 실제로는 소량 발주하면서 그 견적가격을 기준으로 대금을 결정하는 행위' },
                                    { content: '⑩ 대금을 정하지 않은 채 제조 등의 위탁을 한 후, 거래상대방과 협의를 거치지 않고 통상 지급되는 대가를 하회하여 대금을 결정하는 행위' },
                                    { content: '⑪ 납품관련 기술자료 등을 요구하여 넘겨받은 후, 이를 다른 사업자에게 제공하고 다른 사업자의 견적가격 등을 근거로 대금을 인하하는 행위' },
                                    { content: '⑫ 원도급 대금에 비하여 현저히 낮은 실행예산을 작성하여 같은 실행예산 범위 내로 시공하여야 함을 이유로 대금을 낮게 결정하는 행위' },
                                    { content: '⑬ 수출, 할인특별판매, 경품류, 견본용 등을 이유로 통상 지급되는 대가보다 현저하게 하회하여 대금을 결정하는 행위' },
                                    { content: '⑭ 할인판매, 염가판매 등의 특별판매행사를 하기 위하여 거래상대방에게 통상적인 납품가격보다 현저히 낮은 가격으로 납품하도록 강요하는 행위' },
                                ],
                            },
                            partC: {
                                label: "다. 구두에 의한 제안서 제시요구 혹은 개발의뢰 행위",
                                items: [
                                    { content: '- 설비완료 혹은 생산준비 완료 후 개발을 취소하거나 구두로 요구시 제시한 단가를 인하할 것을 요구하는 행위' },
                                ],
                            },
                            partD: {
                                label: "라. 부당한 경영간섭 행위",
                                items: [
                                    { content: '① 파트너사의 임직원을 선임·해임함에 있어 회사의 지시 또는 승인을 얻게 하거나 파트너사의 의사에 반하여 특정인을 채용하게 하는 등의 방법으로 인사에 간섭하는 행위' },
                                    { content: '② 위탁한 납품물 등의 품질 유지 및 납기내 납품여부 등 하도급거래의 목적과 관계없이 재하도급거래 선정·계약조건 설정 등 재하도급거래내용을 제한하는 행위' },
                                    { content: '③ 정상적으로 공사를 시공 중에 있음에도 불구하고 파트너사의 의사에 반하여 현장근로자를 동원하여 공사를 시공케하는 행위' },
                                    { content: '④ 파트너사의 생산품목·시설규모 등을 제한하거나 파트너사로 하여금 회사 또는 회사 계열회사의 경쟁사업자와 거래하지 못하도록 하는 행위' },
                                    { content: '⑤ 파트너사에게 납품관련 기술자료 등을 정당한 이유 없이 요구하여 제공하도록 하는 행위' },
                                    { content: '⑥ 경품부판매, 할인판매 등의 특별판매행사에 파트너사가 참여토록 강요하거나, 상품이나 상품권 등의 구입을 강요하는 행위' },
                                ],
                            },
                            partE: {
                                label: "마. 원재료 가격변동에 따른 하도급대금의 미조정 행위",
                                items: [
                                    { content: '① 협의신청에 응답하지 않거나 협의를 개시하겠다고 통보한 후 회의개최, 의견교환, 단가조정안 제시 등 실질적인 협의절차를 진행하지 아니하는 행위' },
                                    { content: '② 협의를 신청한 후 30일이 경과하였음에도 불구하고, 실질적인 단가조정 권한을 가지고 있는 책임자가 협의에 임하지 아니하는 행위' },
                                    { content: '③ 단가조정을 위한 시장조사, 원가산정 등 객관적 근거 없이 상대방이 수용할 수 없는 가격을 되풀이하여 제시하는 행위' },
                                ],
                            },
                            partF: {
                                label: "바. 전속적 거래 요구 행위",
                                items: [
                                    { content: '- 파트너사로 하여금 회사 및 회사가 지정하는 업체와는 거래하지 못하게 하는 행위(기술개발을 거래 상대방과 공동으로 하는 것을 이유로 파트너사와 전속적 거래에 합의하는 경우는 제외)' },
                                ],
                            },
                            partG: {
                                label: "사. 민원처리 일방적 전가 행위",
                                items: [
                                    { content: '- 공사 중 각종 민원발생에 대하여는 경제적·행정적 일체의 책임을 지며, 민원이 해결되지 않고 분쟁의 소지가 계속 지속될 경우 회사가 민원에 관해 처리 후 제반비용을 기성에서 공제하는 행위' },
                                ],
                            },
                            partH: {
                                label: "아. 부당특약 행위",
                                items: [
                                    { content: '① 파트너사의 이익을 부당하게 침해하거나 제한하는 계약조건을 설정하는 행위' },
                                    { content: '② 계약에 기재되지 아니한 사항을 요구함에 따라 발생된 비용을 파트너사에게 부담시키는 약정을 설정하는 행위' },
                                    { content: '③ 회사가 부담하여야 할 민원처리, 산업재해 등과 관련된 비용을 회사 파트너사에게 부담시키는 약정을 설정하는 행위' },
                                    { content: '④ 입찰내역에 없는 사항을 요구함에 따라 발생된 비용을 파트너사에게 부담시키는 약정을 설정하는 행위' },
                                ],
                            },
                        },
                    },
                    section5: {
                        title: "Ⅴ. 계약서 및 관련 법령에 따른 충실한 계약 이행",
                        step1: {
                            title: "1. 계약이행 준수 사항",
                            partA: {
                                label: "가. 민법 등 관련 법령의 준수",
                                items: [
                                    { content: '- 신의성실의 원칙, 하도급법, 공정거래법 등 관련 법령을 준수하되 분쟁발생시 서면 자료에 의하여 해결한다.' },
                                ],
                            },
                            partB: {
                                label: "나. 단가 인하 시 사전 충분한 합의 및 서면 발급",
                                items: [
                                    { content: '- 원자재 가격하락, 물량 증대 등을 이유로 한 단가인하의 경우 물량증대에 따른 단가인하폭에 대한 합리적인 근거를 제시한다.' },
                                ],
                            },
                            partC: {
                                label: "다. 계약변경에 따른 대금 조정",
                                items: [
                                    { content: '- 추가적인 사양요구 등 계약변경으로 인해 추가비용이 소요될 경우 그에 따른 대금을 지급 해결한다.' },
                                ],
                            },
                        },
                        step2: {
                            title: "2. 계약이행 지양 사항",
                            partA: {
                                label: "가. 부당한 수령거부 행위",
                                items: [
                                    { content: '① 위탁내용이 불명확하여 납품/시공한 납품물 등의 내용의 위탁내용과 상이한지 판단이 곤란함에도 불구하고 수령을 거부하는 행위' },
                                    { content: '② 발주자·외국수입업자·고객의 클레임, 판매부진 등을 이유로 이미 위탁한 물품의 수령을 거부하는 행위' },
                                    { content: '③ 공급하기로 되어 있는 원자재 또는 건축자재 등을 늦게 공급함으로써 납기·공기내 납품 또는 시공이 불가능함에도 납기지연을 이유로 수령을 거부하는 행위' },
                                    { content: '④ 검사기준을 정하지 아니하고도 통상의 기준보다 높은 기준을 적용하는 행위' },
                                    { content: '⑤ 검사기준을 정하였다고 하더라도 내용이 불분명하거나 당초계약에서 정한 검사기준보다 높은 기준을 적용하여 수령을 거부하는 행위' },
                                    { content: '⑥ 협력업체로부터 납품 등의 수령요구가 있었음에도 보관장소 부족 등 정당한 이유없이 수령을 거부하는 행위' },
                                    { content: '⑦ 협력업체의 부도 등에 따라 안정적인 공급이 어렵다고 판단해서 이미 발주한 물품의 수령을 임의로 거부하는 행위' },
                                    { content: '⑧ 여러 품목을 제조위탁하고 일부품목의 불량을 이유로 다른 품목에 대하여도 수령을 거부하거나, 발주자의 발주취소 또는 발주중단 등을 이유로 수령을 거부하는 행위' },
                                ],
                            },
                            partB: {
                                label: "나. 부당 반품 행위",
                                items: [
                                    { content: '① 거래상대방으로부터의 발주취소 또는 경제상황의 변동 등을 이유로 반품하는 행위' },
                                    { content: '② 검사의 기준 및 방법을 불명확하게 정함으로써 부당하게 불합격으로 판정하여 이를 반품하는 행위' },
                                    { content: '③ 공급한 원재료의 품질불량으로 인하여 불합격품으로 판정되었음에도 불구하고 이를 반품하는 행위' },
                                    { content: '④ 원재료 공급지연에 의한 납기지연임에도 불구하고 이를 이유로 반품하는 행위' },
                                    { content: '⑤ 이미 수령한 물품을 발주자·외국수입업자·고객의 클레임, 판매부진 등을 이유로 반품하는 행위' },
                                    { content: '⑥ 거래업체 이외의 제3자에게 검사를 위탁한 경우로서 파트너사가 제3자의 검사를 필하여 납품하였음에도 이를 반품하는 행위' },
                                    { content: '⑦ 협력업체의 납기·공기지연이 있었으나 이를 용인한 객관적 사실이 있었음에도 이를 수령한 후 납기·공기지연을 이유로 반품하는 행위' },
                                ],
                            },
                            partC: {
                                label: "다. 부당한 대금 감액 행위",
                                items: [
                                    { content: '① 위탁할 때 대금을 감액할 조건 등을 명시하지 아니하고 위탁 후 협조요청 또는 거래상대방으로부터의 발주취소, 경제상황의 변동 등 불합리한 이유를 들어 대금을 감액하는 행위' },
                                    { content: '② 단가인하에 관한 합의가 성립한 경우 당해 합의 성립전에 위탁한 부분에 대하여도 일방적으로 이를 소급적용하는 방법으로 대금을 감액하는 행위' },
                                    { content: '③ 대금을 현금으로 또는 지급기일전에 지급함을 이유로 과다하게 감액하는 행위' },
                                    { content: '④ 손해발생에 실질적 영향을 미치지 아니하는 경미한 파트너사의 과오를 이유로 일방적으로 대금을 감액하는 행위' },
                                    { content: '⑤ 제조·수리·시공 또는 용역수행에 필요한 물품 등을 회사로부터 사게 하거나 회사의 장비 등을 사용하게 한 경우에 적정한 구매대금 또는 사용대가 이상의 금액을 대금에서 공제하는 행위' },
                                    { content: '⑥ 대금 지급시점의 물가나 자재가격 등이 납품 등의 시점에 비하여 떨어진 것을 이유로 대금을 감액하는 행위' },
                                    { content: '⑦ 경영적자 또는 판매가격 인하 등 불합리한 이유로 부당하게 대금을 감액하는 행위' },
                                    { content: '⑧ 당초 계약내용과 다르게 간접노무비, 일반관리비, 이윤, 부가가치세 등을 감액하는 행위' },
                                    { content: '⑨ 고용보험 및 산업재해보장보험의 보험료 징수 등에 관한 법률, 산업안전보건법 등에 따라 회사가 부담하여야 하는 고용보험료, 산업안전보건관리비, 그 밖의 경비 등을 협력업체에게 부담시키는 행위' },
                                    { content: '⑩ 자재 및 장비 등을 공급하기로 한 경우 이를 지연하여 공급하거나 사실상 무리한 납기·공기를 정해 놓고 이 기간 내에 납품 또는 준공하지 못함을 이유로 감액하는 행위' },
                                    { content: '⑪ 계속적 발주를 이유로 이미 확정된 하도급대금을 감액하거나, 총액으로 계약한 후 제조 또는 공사의 구체적 내역을 이유로 감액하는 행위' },
                                    { content: '⑫ 납품물 등을 저가로 수주하였다는 등의 이유로 당초계약과 다르게 대금을 감액하는 행위' },
                                    { content: '⑬ 위탁내용 및 조건에는 변함이 없음에도 계약을 변경하는 등 결과적으로 대금을 감액하는 행위' },
                                    { content: '⑭ 환차손 등을 협력업체에게 당초계약조건과 다르게 전가시켜 대금을 감액하는 행위' },

                                ],
                            },
                            partD: {
                                label: "라. 경제적 이익의 부당요구 행위",
                                items: [
                                    { content: '① 거래 개시 또는 다량거래 등을 조건으로 협찬금, 장려금, 지원금 등 경제적 이익을 요구하는 행위' },
                                    { content: '② 수익 또는 경영여건 악화 등 불합리한 이유로 협찬금, 장려금, 지원금 등 경제적 이익을 요구하는 행위' },
                                    { content: '③ 기타 협력업체가 부담하여야 할 법률상 의무가 없음에도 협찬금, 장려금, 지원금 등 경제적 이익을 요구하는 행위' },
                                ],
                            },
                            partE: {
                                label: "마. 자사 원인에 기인한 비용 전가행위",
                                items: [
                                    { content: '- 회사의 임금상승, 내부적인 품의절차 지연으로 인한 비용을 파트너사에게 전가하는 행위 바. 부당한 대물변제 행위' },
                                    { content: '- 최초 계약과는 달리 파트너사의 의사에 반하여 정해진 대금을 물품으로 지급하고 이를 받아들일 것을 요구하는 행위' },
                                ],
                            },
                           /*partF: {
                                label: "바. ",
                                items: [
                                    { content: '' },
                                ],
                            },*/
                            partG: {
                                label: "사. 보복 조치 행위",
                                items: [
                                    { content: '- 파트너사가 공정위에 하도급법 위반으로 신고한 것을 이유로 수주기회를 제한하거나 거래의 정지, 기타 불이익을 주는 행위' },
                                ],
                            },
                            partH: {
                                label: "아. 탈법 행위",
                                items: [
                                    { content: '① 하도급거래와 관련하여 우회적인 방법에 의하여 실질적으로 하도급법의 적용을 면탈하려는 행위' },
                                    { content: '② 공정위의 시정조치에 따라 대금 등을 파트너사에게 지급한 후 이를 회수하거나 납품대금에서 공제하는 등의 방법으로 환수하는 행위' },
                                    { content: '③ 어음할인료·지연이자 등을 파트너사게 지급한 후 이에 상응하는 금액만큼 일률적으로 단가를 인하하는 행위' },
                                ],
                            },
                            partI: {
                                label: "자. 물품 등의 구매 강제 행위",
                                items: [
                                    { content: '① 정당한 사유없이 자사, 계열사 또는 특정회사 등의 제품이나 서비스 등을 협력업체에게 강제로 판매하거나 이용하게 하는 행위' },
                                    { content: '② 정당한 사유없이 공사현장에서 파트너사가 사용하는 자재를 파트너사의 의사에 반하여 부당하게 구입을 강제하거나 그가 지정하는 물품·장비를 구입·사용하도록 강요하는 행위' },
                                    { content: '③ 정당한 사유없이 파트너사가 구매 의사가 없다고 표시하였거나, 의사표시가 없어도 명확히 구매의사가 없다고 인정됨에도 재차 구매를 요청하는 행위' },
                                ],
                            },
                            partJ: {
                                label: "차. 물품구매대금 등의 부당결제청구 행위",
                                items: [
                                    { content: '① 협력업체에게 납품 등에 필요한 물품 등을 회사로부터 사게 하거나 회사 장비 등을 사용하게 하고, 대금 지급기일에 앞서 구매대금이나 사용대금의 전부 또는 일부를 지급하게 하는 행위' },
                                    { content: '② 파트너사에게 납품 등에 필요한 물품 등을 회사로부터 사게 하거나 회사 장비 등을 사용하게 하고, 회사가 구입·사용 또는 제3자에게 공급하는 조건보다 현저하게 불리한 조건으로 지급하는 행위' },
                                ],
                            },
                            partK: {
                                label: "카. 기술자료 제공 강요금지 행위",
                                label2: "① 정당한 사유없이 파트너사에게 다음 기술자료를 회사 또는 제3자에게 제공하도록 강요하는 행위",
                                rows: [
                                    "- 상당한 노력에 의하여 비밀로 유지된 제조·수리·시공 또는 용역 수행 방법에 관한 자료",
                                    "- 특허권, 실용신안권, 디자인권, 저작권 등 지식재산권과 관련된 정보",
                                    "- 그 밖에 영업활동에 유용하고 독립된 경제적 가치가 있는 기술상 또는 경영상의 정보"
                                ],
                                items: [
                                    { content: '② 협력업체로부터 취득한 기술자료를 회사 또는 제3자를 위해 유용하는 행위' },
                                ],
                            },
                        },
                    },
                    section6: {
                        title: "ⅤI. 시스템운영",
                        items: [
                            { content: '1. 파트너사 협업시스템은 홈페이지 내 입점상담이 해당되며' },
                            { content: '2. 지원조직은 업무성격(기술지원,교육 등)에 맞는 현업 부서가 진행한다' },
                        ]
                    },
                    addendum: {
                        title: "[부칙]",
                        article: "제 1조[시행일]",
                        lines: ["- 이 지침은 2020년 4월 1일부터 시행한다.", "- 이 지침은 2021년 4월 1일부터 시행한다."]
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Guidelines for Issuance and Retention of Written Documents"/* 260604 번역 */,
                    intro: 'April 2021\nGS Retail\n\n GS Retail Guidelines for Contract Conclusion for Win-Win Cooperation between Large and Small/Medium Enterprises'/* 260604 번역 */,
                    section1: {
                        title: "Purpose",
                        items: [
                            { content: `- These practice items, in accordance with the Fair Trade Commission's "Guidelines for Contract Conclusion for Win-Win Cooperation between Large and Small/Medium Enterprises," are intended to ensure that the interests of small and medium-sized partner companies are duly reflected in contract conclusion between GS Retail (hereinafter the “Company”) and small and medium-sized partner companies.`/* 260604 번역 */ },
                            { content: "- The Company seeks to prevent the abuse of superior bargaining power that undermines the principle of freedom of contract in transactions with small and medium-sized partner companies, and to establish and practice reasonable and fair trade practices in contract conclusion between the Company and small and medium-sized partner companies."/* 260604 번역 */ },
                        ]
                    },
                    section2: {
                        title: "II. Structure of the Practices",
                        items: [
                            { content: '- These practice items consist of the "contract-conclusion infrastructure" that the Company must establish before contract conclusion, the "contract conclusion with guaranteed self-determination" presenting desirable matters that contracting parties should include under conditions in which self-determination is guaranteed, and the "contract performance faithful to the contract and relevant laws" presenting matters to be observed in performing the contract.'/* 260604 번역 */ },
                        ]
                    },
                    section3: {
                        title: "III. Establishment of Contract Conclusion Infrastructure",
                        step1: {
                            title: "Criteria for Selecting Contract Conclusion Method",
                            items: [
                                { content: '- The Company selects the contract conclusion method according to certain criteria, taking into account its transactional position and influence in the market. It selects and concludes the contract conclusion method by considering the importance of the goods, the number of possible counterparties, transaction experience, and the standard relative to the total transaction amount, etc.'/* 260604 번역 */ },
                            ],
                            TableHeader: { col1: "Contract Method", col2: "Requirements" },
                            IRListData: [
                                { title: "Negotiated Contract", content: "When competitive bidding cannot be conducted due to a sudden surge in raw material prices or similar circumstances", span: 4 },
                                { title: "", content: "Where competition is virtually impossible\n- Construction using patented methods or new technology\n- Where having goods manufactured or purchasing goods that are patented, registered as a utility model, or registered as a design"/* 260604 번역 */, span: 0 },
                                { title: "", content: "Where there is no choice but to contract with the current trading counterparty\n- Where the person who manufactured and supplied the relevant goods directly installs, assembles, or maintains those goods\n- Where receiving manufacture and supply from a person other than the one who manufactured and supplied the relevant goods would result in incompatibility"/* 260604 번역 */, span: 0 },
                                { title: "", content: "Other cases where competition is not possible due to a specific party's special technology or services, or specific location, structure, quality, performance, efficiency, or similar factors", span: 0 },
                                { title: "General Competitive Bidding", content: "Selected by considering the type and importance of goods, the number of potential counterparties, etc.", span: 1 },
                                { title: "Restricted Competitive Bidding", content: "Manufacturing contracts for goods requiring special facilities or technology", span: 4 },
                                { title: "", content: "Purchase contracts for goods requiring special performance or quality", span: 0 },
                                { title: "", content: "Service contracts requiring special technology", span: 0 },
                                { title: "", content: "When necessary to prevent inadequate contract performance, the financial standing of competitive bidders may be considered ※ When restricting the qualifications of competitive bidders, the restrictions and criteria shall be specified in the bid announcement", span: 0 },
                                { title: "Designated Competitive Bidding", content: "When only a party with special facilities, technology, materials, goods, or performance can achieve the purpose of the contract given its nature or objective, and there are no more than 5 prospective bidders", span: 2 },
                                { title: "", content: "When purchasing products with certified quality marks or products with environmental certification", span: 0 },
                            ],
                        },
                        step2: {
                            title: "2. Partner Company Collaboration System and Support Organization Operations",
                            items: [
                                { content: '- Through the sourcing portal system, the Company provides information necessary for transactions with partner companies and new companies, and promotes win-win cooperation.'/* 260604 번역 */ },
                                { content: `- A new company wishing to do business may propose its intent to trade through the Company's sourcing portal or the Company's customer center.`/* 260604 번역 */ },
                                { content: '- The Company operates a support organization responsible for technical support, financial support, education, the suggestion system, etc. for partner companies.'/* 260604 번역 */ }
                            ],
                        }
                    },
                    section4: {
                        title: "III. Guidelines for the Selection and Operation of Partner Companies",
                        step1: {
                            title: "1. Partner company selection criteria and procedures"/* 260604 번역 */,
                            partA: {
                                label: "Prior Issuance of Written Documents",
                                items: [
                                    { content: '① As a general rule, a contract shall be concluded in advance, and at a minimum, a contract bearing a name and seal shall be concluded before commencing work for supply, etc.'/* 260604 번역 */ },
                                    { content: '② The contract must include the content of the subcontracting contract, such as the subcontract payment and its method of payment, as well as the matters prescribed in the Enforcement Decree, such as the requirements, methods, and procedures for adjusting the subcontract payment in accordance with changes in raw material prices.'/* 260604 번역 */ },
                                    { content: '③ Where changes in volume are clearly anticipated due to minor and frequent additional work, a settlement agreement shall be issued immediately after the completion of supply, etc.'/* 260604 번역 */ },
                                    { content: '④ Where an additional request is made within a period significantly shorter than the usually permitted period, the principal matters shall be agreed upon in writing in advance.'/* 260604 번역 */ },
                                ],
                            },
                            partB: {
                                label: "Unit Price Determination Based on a Reasonable Calculation Method",
                                items: [
                                    { content: '① The unit price of parts shall be determined through consultation in accordance with a reasonable calculation method that takes into account quantity, quality, specifications, delivery deadline, payment method, material prices, labor costs, or market price trends, with appropriate management costs and profit added.'/* 260604 번역 */ },
                                    { content: '② Where a cause for changing the initial unit price arises during the contract period, the Partner Company may file a request for unit price adjustment with the Company, in which case the parties shall mutually consult and re-determine it within 30 days (extendable by 30 days) from the date of the request.'/* 260604 번역 */ },
                                    { content: '③ Where the determination of the unit price is delayed for special reasons, a provisional unit price determined through consultation shall be applied; in such case, the difference between the provisional unit price and the final unit price shall be settled retroactively when the final unit price is determined.'/* 260604 번역 */ },
                                    { content: `④ The wage rate that serves as the basis for cost calculation shall be periodically surveyed to present a unit price that reflects reality; and the wage rate shall be set according to each company's characteristics, such as working conditions, Partner Company size, and technical level, taking into account labor costs in the same industry.`/* 260604 번역 */ },
                                    { content: '⑤ The criteria and procedures by which the parties may consult when the initially determined unit price is changed shall be stipulated in the contract.'/* 260604 번역 */ },
                                    { content: '⑥ Specific matters such as the reasons for the unit price change (changes in prices, raw material prices, exchange rates, etc.), the consultation period, and the payment terms shall be specified.'/* 260604 번역 */ },
                                ],
                            },
                            partC: {
                                label: "Clear Delivery Date",
                                items: [
                                    { content: '① A delivery deadline suitable to the characteristics of each industry and normal practice shall be determined through sufficient agreement with the Partner Company.'/* 260604 번역 */ },
                                    { content: '② The delivery deadline shall be set at the time of concluding the contract and clarified if it is changed; and where a shorter-than-usual delivery deadline is set under the pretext of an urgent order, etc., it shall be agreed upon through consultation with the Partner Company.'/* 260604 번역 */ },
                                    { content: '③ Where the Partner Company suffers damage due to an unfair delay in or refusal of receipt, despite the absence of any cause attributable to the Partner Company, such damage shall be compensated.'/* 260604 번역 */ },
                                ],
                            },
                            partD: {
                                label: "Objective Inspection Standards",
                                items: [
                                    { content: '① In inspecting supplies, etc., the Company shall, in consultation with the Partner Company, set objective, fair, and reasonable inspection criteria and methods.'/* 260604 번역 */ },
                                    { content: '② When supply, etc. takes place, a receipt shall be issued immediately even before inspection, and the inspection shall be carried out promptly in accordance with predetermined inspection rules and procedures.'/* 260604 번역 */ },
                                    { content: '③ Except where there are justifiable grounds, the inspection results shall be notified within 10 days from the date of receiving the supplies from the Partner Company.'/* 260604 번역 */ },
                                    { content: '④ Ordered parts shall be managed with the care of a good manager before inspection or during the inspection period.'/* 260604 번역 */ },
                                ],
                            },
                            partE: {
                                label: "Determination of a Reasonable Payment Due Date",
                                items: [
                                    { content: '② Where the Company has consigned manufacturing, etc. to the Partner Company and receives completion payment, etc. from the ordering party upon completion of the manufacturing, repair, construction, or performance of services, the Company shall pay the amount within 15 days from the date of receiving such payment (or by the payment due date if the payment due date arrives before then).'/* 260604 번역 */ },
                                    { content: '③ Where progress payment, etc. is received in accordance with the progress of manufacturing, repair, construction, or performance of services, the amount corresponding to the portion of manufacturing, repair, construction, or performance of services carried out by the Partner Company shall be paid to the Partner Company within 15 days from the date of receiving such payment (or by the payment due date if the payment due date arrives before then).'/* 260604 번역 */ },
                                    { content: '④ In paying the Partner Company, payment shall be made at a cash ratio equal to or higher than the cash ratio received from the ordering party in connection with the relevant consignment of manufacturing, etc.'/* 260604 번역 */ },
                                    { content: '⑤ Where the payment is made by bill, a bill within the payment period (from the issue date to the maturity date) of the bill received from the ordering party in connection with the relevant consignment of manufacturing, etc. shall be delivered.'/* 260604 번역 */ },
                                    { content: '⑥ Where the payment is made by bill, such bill must be discountable at a financial institution established under the law, and the discount fee (the discount rate determined and announced by the Fair Trade Commission) for the period from the date the bill is delivered to the maturity date of the bill shall be paid on the date the bill is delivered.'/* 260604 번역 */ },
                                    { content: '⑦ Where a bill is delivered within 60 days from the date of receiving the supplies, etc., the discount fee for the period from the day exceeding 60 days from the date of receiving the supplies, etc. until the maturity date shall be paid within 60 days from the date of receiving the supplies, etc.'/* 260604 번역 */ },
                                    { content: '⑧ Where the payment is made using a bill-substitute payment method, the fee (including loan interest) for the period from the payment date (in the case of a corporate purchase card, the card payment approval date; in the case of an accounts receivable-secured loan, the date of transmitting the supply details, etc.; and in the case of a purchase loan, the purchase fund settlement date) until the subcontract payment repayment date shall be paid on the payment date.'/* 260604 번역 */ },
                                    { content: '⑨ Where the payment is made using a bill-substitute payment method within 60 days from the date of receiving the supplies, etc., the fee for the period from the day exceeding 60 days from the date of receiving the objects, etc. until the subcontract payment repayment date shall be paid to the Partner Company within 60 days from the date of receiving the supplies, etc.'/* 260604 번역 */ },
                                    { content: '⑩ Where the payment is made more than 60 days after the date of receiving the supplies, etc., interest at the rate determined and announced by the Fair Trade Commission shall be paid for such excess period.'/* 260604 번역 */ },
                                ],
                            },
                            partF: {
                                label: "Reasonable Return Processing for Defects Discovered after Delivery, Etc.",
                                items: [
                                    { content: '- The subject responsible for identifying the cause of the defect, the type of defect cause, and the corresponding ratio of responsibility shall be stipulated, and returns shall be processed by mutual agreement between the parties.'/* 260604 번역 */ },
                                ],
                            },
                            partG: {
                                label: "Contract Cancellation and Termination",
                                items: [
                                    { content: `① The grounds shall be determined by agreement between the contracting parties, distinguishing between 'cases possible without a demand for performance' and 'cases requiring a demand for performance'; and where grounds for cancellation or termination arise, notification shall be given in writing without delay.`/* 260604 번역 */ },
                                ],
                                label2: "② The cases in which cancellation or termination is possible without a demand for performance are as set out in each of the following subparagraphs."/* 260604 번역 */,
                                rows: [
                                    "- Where the counterparty has been subject to a suspension of transactions by a financial institution, or to a disposition such as business cancellation or business suspension by a supervisory authority"/* 260604 번역 */,
                                    "- Where both parties acknowledge that performance of the basic contract or individual contract is difficult because the counterparty has resolved upon dissolution, transfer of business, or merger into another company, or due to disaster or other causes"/* 260604 번역 */
                                ],
                                label3: "③ The cases requiring a demand for performance are as set out in each of the following subparagraphs; in such cases, the counterparty shall be given a period of at least one month to demand performance, and cancellation or termination may be made if performance is not rendered within that period."/* 260604 번역 */,
                                rows2: [
                                    "- Where the counterparty has violated material terms of this contract or an individual contract, or where the company receiving the delivery, etc. has delayed, without justifiable reason, the performance of matters necessary for manufacturing the ordered parts, thereby hindering the partner company's work"/* 260604 번역 */,
                                    "- Where it is found that delivery, etc. within the delivery deadline is difficult because the counterparty has refused, without justifiable reason, to manufacture the ordered parts or has delayed commencement thereof"/* 260604 번역 */,
                                    "- Where there are substantial grounds to find that the counterparty cannot smoothly perform the contract due to a lack of technical, production, or quality control capability"/* 260604 번역 */
                                ],
                            },
                        },
                        step2: {
                            title: "2. Matters to avoid at the time of contract conclusion"/* 260604 번역 */,
                            partA: {
                                label: "a. Failing to issue or retain documents"/* 260604 번역 */,
                                items: [
                                    { content: '① Without justifiable grounds, issuing a document that does not state matters difficult to finalize at the time of consignment, while failing to state the reason why such matters have not been determined and the scheduled date on which such matters will be determined'/* 260604 번역 */ },
                                    { content: '② After issuing a document that omits some matters, delaying or failing to issue a new document to the Partner Company even though such matters have been finalized'/* 260604 번역 */ },
                                    { content: '③ Failing to reply in writing within 15 days, expressing an intention to acknowledge or deny, after being requested by the Partner Company to confirm the consignment content of an orally consigned (ordered) matter, such as the content of the consigned work, the subcontract payment, and the date and time of consignment'/* 260604 번역 */ },
                                    { content: `④ In replying with an intention to acknowledge or deny the consignment content of an orally consigned (ordered) matter, failing to provide the signature or name and seal of the principal business operator (the company's contract officer, such as the executive in charge of contracts)`/* 260604 번역 */ },
                                    { content: '⑤ Failing to issue a specific additional contract or work order, etc. even though the scope of the additional work is distinguishable and the amount is substantial'/* 260604 번역 */ },
                                    { content: `⑥ Failing to retain statutory documents for three years and arbitrarily destroying them within three years in accordance with the principal business operator's rules, etc.`/* 260604 번역 */ },
                                    { content: '⑦ Retaining documents (records) for three years from the transaction termination date, but where they are false documents (records), or subsequently preparing and retaining documents with false content'/* 260604 번역 */ },
                                    { content: '⑧ Failing to retain documents related to the determination of the subcontract payment, such as the bid specification, the successful bidder determination approval document, the quotation, and, in the case of construction consignment, the site description and the specification'/* 260604 번역 */ },
                                ],
                            },
                            partB: {
                                label: "Acts of Unfair Determination of Subcontracting Price",
                                items: [
                                    { content: '① Determining the subcontract payment by reducing unit prices at a uniform rate without justifiable reason'/* 260604 번역 */ },
                                    { content: '② Regardless of the pretext, such as a request for cooperation, unilaterally allocating a certain amount and then determining the subcontract payment by deducting such amount'/* 260604 번역 */ },
                                    { content: '③ Without justifiable reason, determining the payment by discriminating against a particular Partner Company, or unilaterally determining the payment at a low unit price without agreement with the Partner Company'/* 260604 번역 */ },
                                    { content: `④ Deceiving the Partner Company by causing a mistake regarding transaction conditions such as the order quantity, or by showing another business operator's quotation or a false quotation, and exploiting this to determine the payment`/* 260604 번역 */ },
                                    { content: '⑤ In concluding a contract by private contract, determining the payment at an amount lower than the sum of the direct construction cost items without justifiable grounds'/* 260604 번역 */ },
                                    { content: '⑥ In concluding a contract by competitive bidding, determining the payment at an amount lower than the lowest bid amount without justifiable grounds'/* 260604 번역 */ },
                                    { content: '⑦ Determining the payment by uniformly reducing the unit price without an objectively valid reason for the unit price reduction, such as a decline in material prices or wages'/* 260604 번역 */ },
                                    { content: '⑧ Determining a lower payment by discriminating against a particular Partner Company even though there is no difference in payment terms, transaction quantity, difficulty of work, or the like'/* 260604 번역 */ },
                                    { content: '⑨ Having a quotation made on the premise of a large-volume order, but then actually placing a small-volume order while determining the payment based on that quotation price'/* 260604 번역 */ },
                                    { content: '⑩ After consigning manufacturing, etc. without determining the payment, determining the payment below the usually paid consideration without consultation with the counterparty'/* 260604 번역 */ },
                                    { content: `⑪ Requesting and receiving supply-related technical data, etc., then providing it to another business operator and reducing the payment based on that other operator's quotation price, etc.`/* 260604 번역 */ },
                                    { content: '⑫ Preparing an execution budget significantly lower than the prime contract amount and determining a lower payment on the grounds that construction must be performed within the same execution budget'/* 260604 번역 */ },
                                    { content: '⑬ Determining the payment significantly below the usually paid consideration on grounds such as export, discount special sales, premiums, or sample use'/* 260604 번역 */ },
                                    { content: '⑭ Coercing the counterparty to supply at a price significantly lower than the usual supply price in order to hold a special sales event such as a discount sale or bargain sale'/* 260604 번역 */ },
                                ],
                            },
                            partC: {
                                label: "Act of Requesting Proposal Presentation or Development Request Verbally",
                                items: [
                                    { content: '- The act of cancelling development after completion of equipment or production preparation, or demanding a reduction of the unit price presented, by verbal request'/* 260604 번역 */ },
                                ],
                            },
                            partD: {
                                label: "Acts of Improper Management Interference",
                                items: [
                                    { content: `① Interfering in personnel matters by requiring the Company's direction or approval for the appointment or dismissal of the Partner Company's executives and employees, or by causing the hiring of a specific person against the Partner Company's will`/* 260604 번역 */ },
                                    { content: '② Restricting the content of re-subcontracting transactions, such as the selection of re-subcontractors or the setting of contract terms, irrespective of the purpose of the subcontracting transaction such as maintaining the quality of the consigned supplies and whether delivery is made within the deadline'/* 260604 번역 */ },
                                    { content: `③ Mobilizing on-site workers against the Partner Company's will to carry out construction even though construction is being properly performed`/* 260604 번역 */ },
                                    { content: `Restricting the partner company's production items or facility scale, or preventing the partner company from transacting with competitors of the Company or its affiliated companies` },
                                    { content: '⑤ Requiring the Partner Company to provide supply-related technical data, etc. by demanding it without justifiable reason'/* 260604 번역 */ },
                                    { content: '⑥ Coercing the Partner Company to participate in special sales events such as premium sales or discount sales, or coercing it to purchase products or gift certificates, etc.'/* 260604 번역 */ },
                                ],
                            },
                            partE: {
                                label: "Failure to Adjust Subcontracting Price in Response to Raw Material Price Changes",
                                items: [
                                    { content: '① Failing to respond to a request for consultation, or, after notifying that consultation will commence, failing to proceed with substantive consultation procedures such as holding meetings, exchanging opinions, or presenting a unit price adjustment proposal'/* 260604 번역 */ },
                                    { content: '② Despite the lapse of 30 days after a consultation was requested, the person in charge who holds actual authority over unit price adjustments failing to engage in the consultation'/* 260604 번역 */ },
                                    { content: '③ Repeatedly presenting a price unacceptable to the counterparty without objective grounds such as market research or cost calculation for unit price adjustment'/* 260604 번역 */ },
                                ],
                            },
                            partF: {
                                label: "Acts of Requesting Exclusive Transactions",
                                items: [
                                    { content: '- The act of preventing a partner company from doing business with the Company and the companies designated by the Company (excluding cases where exclusive transactions with the partner company are agreed upon on the grounds of conducting joint technology development with the counterparty)'/* 260604 번역 */ },
                                ],
                            },
                            partG: {
                                label: "Acts of Unilaterally Shifting the Burden of Civil Complaints",
                                items: [
                                    { content: '- The act of bearing all economic and administrative responsibility for various civil complaints arising during construction, and, where a complaint remains unresolved and the potential for dispute continues, the Company handling the complaint and then deducting all related costs from the completed-work payment'/* 260604 번역 */ },
                                ],
                            },
                            partH: {
                                label: "Improper Special Agreement Acts",
                                items: [
                                    { content: '① Setting contract terms that unfairly infringe upon or restrict the interests of the Partner Company'/* 260604 번역 */ },
                                    { content: '② Setting an agreement that imposes on the Partner Company the costs arising from demanding matters not stated in the contract'/* 260604 번역 */ },
                                    { content: '③ Setting an agreement that imposes on the Partner Company the costs related to complaint handling, industrial accidents, etc. that should be borne by the Company'/* 260604 번역 */ },
                                    { content: '④ Setting an agreement that imposes on the Partner Company the costs arising from demanding matters not included in the bid specifications'/* 260604 번역 */ },
                                ],
                            },
                        },
                    },
                    section5: {
                        title: "Faithful Contract Performance in Accordance with the Contract and Applicable Laws",
                        step1: {
                            title: "Matters to be Observed in Contract Performance",
                            partA: {
                                label: "Compliance with Relevant Laws Including the Civil Code",
                                items: [
                                    { content: '- Comply with relevant laws such as the principle of good faith, the Subcontracting Act, and the Fair Trade Act, and resolve disputes, when they arise, based on written materials.'/* 260604 번역 */ },
                                ],
                            },
                            partB: {
                                label: "Sufficient Advance Agreement and Written Issuance at the Time of Unit Price Reduction",
                                items: [
                                    { content: '- In the case of a unit-price reduction on grounds of a decline in raw material prices, an increase in volume, etc., a reasonable basis for the extent of the unit-price reduction corresponding to the volume increase shall be presented.'/* 260604 번역 */ },
                                ],
                            },
                            partC: {
                                label: "Price Adjustment Due to Contract Changes",
                                items: [
                                    { content: '- Where additional costs are incurred due to a contract change, such as additional specification requirements, the corresponding price shall be paid and resolved.'/* 260604 번역 */ },
                                ],
                            },
                        },
                        step2: {
                            title: "Matters to be Avoided in Contract Performance",
                            partA: {
                                label: "Acts of Improper Refusal to Accept Delivery",
                                items: [
                                    { content: '① Refusing receipt despite the difficulty of determining whether the content of the supplied or constructed goods differs from the consignment content because the consignment content is unclear'/* 260604 번역 */ },
                                    { content: '② Refusing receipt of already consigned goods on grounds such as claims from the ordering party, foreign importer, or customer, or poor sales'/* 260604 번역 */ },
                                    { content: '③ Refusing receipt on the grounds of delayed delivery, even though delivery or construction within the delivery or construction deadline is impossible due to the late supply of raw materials or building materials, etc. that were to be supplied'/* 260604 번역 */ },
                                    { content: '④ Applying a standard higher than the ordinary standard even without having set inspection criteria'/* 260604 번역 */ },
                                    { content: '⑤ Refusing receipt by applying a standard whose content is unclear, even if inspection criteria were set, or higher than the inspection criteria stipulated in the original contract'/* 260604 번역 */ },
                                    { content: '⑥ Refusing receipt without justifiable reason, such as a lack of storage space, even though the partner company has requested receipt of the supply, etc.'/* 260604 번역 */ },
                                    { content: `⑦ Arbitrarily refusing receipt of already ordered goods on the judgment that stable supply is difficult due to the partner company's insolvency, etc.`/* 260604 번역 */ },
                                    { content: `⑧ Consigning the manufacture of multiple items and refusing receipt of other items on the grounds of defects in some items, or refusing receipt on grounds such as the ordering party's cancellation or suspension of orders`/* 260604 번역 */ },
                                ],
                            },
                            partB: {
                                label: "Acts of Improper Return",
                                items: [
                                    { content: '① Returning goods on grounds such as the cancellation of orders by the counterparty or changes in economic conditions'/* 260604 번역 */ },
                                    { content: '② Unfairly determining goods to have failed inspection and returning them by setting the inspection criteria and methods ambiguously'/* 260604 번역 */ },
                                    { content: '③ Returning goods even though they were determined to be defective due to the poor quality of the raw materials supplied'/* 260604 번역 */ },
                                    { content: '④ Returning goods on the grounds of a delivery delay even though the delivery delay was caused by a delay in the supply of raw materials'/* 260604 번역 */ },
                                    { content: '⑤ Returning already received goods on grounds such as claims from the ordering party, foreign importer, or customer, or poor sales'/* 260604 번역 */ },
                                    { content: `⑥ Where inspection has been consigned to a third party other than the transacting company, returning goods even though the Partner Company supplied them after passing the third party's inspection`/* 260604 번역 */ },
                                    { content: `⑦ Where there was a delay in the partner company's delivery or construction deadline but there was an objective fact that it was tolerated, returning the goods after receiving them on the grounds of the delivery or construction delay`/* 260604 번역 */ },
                                ],
                            },
                            partC: {
                                label: "Acts of Improper Price Reduction",
                                items: [
                                    { content: '① Reducing the payment, without specifying at the time of consignment the conditions under which the payment may be reduced, by citing unreasonable grounds after consignment such as a request for cooperation, cancellation of orders by the counterparty, or changes in economic conditions'/* 260604 번역 */ },
                                    { content: '② Where an agreement on a unit price reduction has been reached, reducing the payment by unilaterally applying it retroactively even to portions consigned before the agreement was reached'/* 260604 번역 */ },
                                    { content: '③ Excessively reducing the payment on the grounds of paying in cash or before the payment due date'/* 260604 번역 */ },
                                    { content: '④ Unilaterally reducing the payment on the grounds of a minor fault of the Partner Company that has no substantial effect on the occurrence of damage'/* 260604 번역 */ },
                                    { content: `Deducting from the payment an amount in excess of the appropriate purchase price or usage fee in cases where partner companies are required to purchase goods from the Company or use the Company's equipment in the manufacturing, repair, construction, or service performance` },
                                    { content: '⑥ Reducing the payment on the grounds that prices or material costs, etc. at the time of payment have fallen compared with those at the time of supply, etc.'/* 260604 번역 */ },
                                    { content: '⑦ Unfairly reducing the payment for unreasonable reasons such as a management deficit or a reduction in the selling price'/* 260604 번역 */ },
                                    { content: '⑧ Reducing indirect labor costs, general administrative expenses, profit, value-added tax, etc. contrary to the original contract content'/* 260604 번역 */ },
                                    { content: '⑨ Imposing on the partner company the employment insurance premiums, occupational safety and health management expenses, and other costs, etc. that the Company must bear under the Act on the Collection of Insurance Premiums for Employment Insurance and Industrial Accident Compensation Insurance, the Occupational Safety and Health Act, and the like'/* 260604 번역 */ },
                                    { content: '⑩ Where materials and equipment, etc. were to be supplied, supplying them late or, having set in effect an unreasonable delivery or construction deadline, reducing the payment on the grounds of failure to deliver or complete within that period'/* 260604 번역 */ },
                                    { content: '⑪ Reducing the already finalized subcontract payment on the grounds of continued orders, or reducing it on the grounds of the specific details of manufacturing or construction after contracting on a lump-sum basis'/* 260604 번역 */ },
                                    { content: '⑫ Reducing the payment contrary to the original contract on grounds such as having won the order for the supplies, etc. at a low price'/* 260604 번역 */ },
                                    { content: '⑬ Reducing the payment as a result by amending the contract, etc., even though there is no change in the consignment content and conditions'/* 260604 번역 */ },
                                    { content: '⑭ Reducing the payment by shifting foreign exchange losses, etc. onto the partner company contrary to the original contract conditions'/* 260604 번역 */ },

                                ],
                            },
                            partD: {
                                label: "d. Act of unjustly demanding economic benefits"/* 260604 번역 */,
                                items: [
                                    { content: '① Demanding economic benefits such as sponsorship money, incentives, or subsidies on the condition of commencing a transaction or conducting large-volume transactions'/* 260604 번역 */ },
                                    { content: '② Demanding economic benefits such as sponsorship money, incentives, or subsidies for unreasonable reasons such as deteriorating profits or business conditions'/* 260604 번역 */ },
                                    { content: '③ Otherwise demanding economic benefits such as sponsorship money, incentives, or subsidies even though the partner company has no legal obligation to bear them'/* 260604 번역 */ },
                                ],
                            },
                            partE: {
                                label: "e. Act of passing on costs attributable to one's own causes"/* 260604 번역 */,
                                items: [
                                    { content: `- The act of passing on to the partner company costs arising from the Company's wage increases or delays in its internal approval procedures. F. Unfair payment-in-kind acts`/* 260604 번역 */ },
                                    { content: `- The act of, contrary to the original contract and against the partner company's will, paying the agreed price in goods and demanding that the partner company accept this`/* 260604 번역 */ },
                                ],
                            },
                           /*partF: {
                                label: "바. ",
                                items: [
                                    { content: '' },
                                ],
                            },*/
                            partG: {
                                label: "g. Act of retaliation"/* 260604 번역 */,
                                items: [
                                    { content: '- The act of restricting order opportunities, suspending transactions, or imposing other disadvantages on a partner company on the grounds that it reported a violation of the Subcontracting Act to the Fair Trade Commission'/* 260604 번역 */ },
                                ],
                            },
                            partH: {
                                label: "h. Act of evading the law"/* 260604 번역 */,
                                items: [
                                    { content: '① Attempting, in connection with a subcontracting transaction, to substantively evade the application of the Subcontracting Act through indirect means'/* 260604 번역 */ },
                                    { content: '② Recovering payments, etc. paid to the Partner Company pursuant to a corrective measure by the Fair Trade Commission, or recouping them by means such as deducting them from supply payments'/* 260604 번역 */ },
                                    { content: '③ After paying bill discount fees, delay interest, etc. to the Partner Company, uniformly reducing the unit price by an amount corresponding thereto'/* 260604 번역 */ },
                                ],
                            },
                            partI: {
                                label: "i. Act of compelling the purchase of goods, etc."/* 260604 번역 */,
                                items: [
                                    { content: 'Forcing partner companies to sell or use products or services of the Company, its affiliates, or specific companies without justifiable reason' },
                                    { content: '② Without justifiable grounds, unfairly compelling the Partner Company to purchase materials used at the construction site against its will, or coercing it to purchase or use goods or equipment designated by the Company'/* 260604 번역 */ },
                                    { content: '③ Without justifiable grounds, repeatedly requesting a purchase even though the Partner Company has indicated that it has no intention to purchase, or even where no such indication has been made, it is clearly recognized that there is no intention to purchase'/* 260604 번역 */ },
                                ],
                            },
                            partJ: {
                                label: "j. Act of unjustly claiming payment for the purchase of goods, etc."/* 260604 번역 */,
                                items: [
                                    { content: `① Having the partner company purchase from the Company goods, etc. necessary for supply, etc., or use the Company's equipment, etc., and causing the partner company to pay all or part of the purchase price or usage fee prior to the payment due date`/* 260604 번역 */ },
                                    { content: `② Having the Partner Company purchase from the Company goods, etc. necessary for supply, etc., or use the Company's equipment, etc., and requiring payment on terms significantly more unfavorable than those on which the Company purchases, uses, or supplies to a third party`/* 260604 번역 */ },
                                ],
                            },
                            partK: {
                                label: "k. Act of prohibited coercion to provide technical data"/* 260604 번역 */,
                                label2: "① Coercing the Partner Company, without justifiable grounds, to provide the following technical data to the Company or a third party"/* 260604 번역 */,
                                rows: [
                                    "- Data on methods of manufacturing, repair, construction, or service performance that have been maintained as confidential through substantial effort"/* 260604 번역 */,
                                    "- Information related to intellectual property rights such as patent rights, utility model rights, design rights, and copyrights"/* 260604 번역 */,
                                    "- Other technical or managerial information that is useful for business activities and has independent economic value"/* 260604 번역 */
                                ],
                                items: [
                                    { content: '② Misappropriating technical data acquired from a partner company for the benefit of the Company or a third party'/* 260604 번역 */ },
                                ],
                            },
                        },
                    },
                    section6: {
                        title: "VI. System Operation"/* 260604 번역 */,
                        items: [
                            { content: '1. The partner company collaboration system refers to store-opening consultation on the website, and'/* 260604 번역 */ },
                            { content: '2. The support organization is operated by the relevant business department suited to the nature of the work (technical support, education, etc.).'/* 260604 번역 */ },
                        ]
                    },
                    addendum: {
                        title: "Supplementary Provisions",
                        article: "Article 1 (Effective Date)",
                        lines: ["These guidelines shall take effect from April 1, 2020.", "These guidelines shall take effect from April 1, 2021."]
                    }
                }
            }
        };
    },
    computed: { 
        t() { 
            // langData가 없거나, 해당 언어 데이터가 없을 경우를 모두 대비
            const data = this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko;
            return data || {}; 
        } 
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
.pop_space .intro_desc {color:#444; font-size:18px; line-height:26px;white-space:pre-line;background:url('@/assets/images/dummy/pop_guide_tit.png') no-repeat right top;}
.pop_guide_wrap {font-size:15px; line-height:25px;}
.pop_guide_wrap .title {display:block;font-size:18px;font-weight:700;padding-bottom:20px}
.pop_guide_wrap .title_b {display:block;font-size:15px;font-weight:normal;margin-bottom:20px;}
.pop_guide_wrap .section {padding:20px 0;}
.pop_guide_wrap .section:last-child {border-bottom:0}
.pop_guide_wrap .section .desc {font-size:15px;line-height:25px;white-space:pre-line;}
.pop_guide_wrap .section .smp_announcement>dl {overflow:hidden;margin-top:10px}
.pop_guide_wrap .section .smp_announcement>dl dt {float:left;background:#0072bc;border-radius:15px;color:#fff;text-align:center;width:42px;font-size:13px;line-height:19px}
.pop_guide_wrap .section .smp_announcement>dl dd {padding-left:50px;margin-bottom:7px;padding-bottom:7px;line-height:19px;font-size:15px}
.pop_guide_wrap .image_wrap {margin:30px 0; text-align: center;}
.pop_guide_wrap .image_wrap img {width:100%}
.pop_guide_wrap .row {padding-left:20px;color: #666666}
.pop_guide_wrap .sub_content_block {margin-bottom:25px;}
.pop_guide_wrap .sub_content_block .title_b {margin-bottom:0;}
.pop_guide_wrap .cancel_criteria {margin-bottom:25px;}
.pop_guide_wrap .section.addendum strong {font-weight:normal}
.pop_guide_wrap .base_table {width: 100%; margin:5px 0 30px 0; border-collapse: collapse; border-top: 2px solid #161616; }
.pop_guide_wrap .base_table th, 
.pop_guide_wrap .base_table td { padding:12px 24px; border-bottom: 1px solid #E5E5E9; border-right: 1px solid #E5E5E9; font-size:1.8rem; line-height:26px; vertical-align: middle; white-space:pre-line;}
.pop_guide_wrap .base_table th:last-child ,
.pop_guide_wrap .base_table td:last-child { border-right: 0; }
.pop_guide_wrap .base_table thead th { padding:28px 24px; background-color:#F8F8F8; color:#161616; font-weight:700; }
.pop_guide_wrap .base_table td { color: #161616; border-left: 0; }
.pop_guide_wrap .base_table th { border-left: 0; }
.pop_guide_wrap .base_table td a { font-size: 1.8rem; color: #161616; text-decoration: none; }
.pop_guide_wrap .base_table td a:hover { text-decoration: underline; }

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; padding-bottom:24px;}
    .pop_space .intro_desc {padding-top:80px; background-position:center top;}
    .pop_guide_wrap .base_table th, 
    .pop_guide_wrap .base_table td {padding:6px 12px; font-size:1.5rem; line-height:22px;}
    .pop_guide_wrap .base_table thead th {padding:18px 12px;}
}
</style>