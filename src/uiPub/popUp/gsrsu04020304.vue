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

                    <!-- Ⅰ. 목적 -->
                    <section class="section">
                        <strong class="title">{{ t.section1.title }}</strong>
                        <p class="desc">{{ t.section1.desc }}</p>
                    </section>

                    <!-- Ⅱ. 하도급거래 과정에서의 각종 서면의 발급에 관한 사항 -->
                    <section class="section">
                        <strong class="title">{{ t.section2.title }}</strong>
                        <p class="desc">{{ t.section2.desc }}</p>
                        <p class="desc">{{ t.section2.desc2 }}</p>
                        <table class="base_table">
                            <colgroup>
                                <col style="width:80px" />
                                <col style="" />
                                <col style="width:250px" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col" class="ac">{{ t.section2.TableHeader.col1 }}</th>
                                    <th scope="col" class="ac">{{ t.section2.TableHeader.col2 }}</th>
                                    <th scope="col" class="ac">{{ t.section2.TableHeader.col3 }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, idx) in t.section2.IRListData" :key="'ir-'+idx">
                                    <td class="ac">{{ item.num }}</td>
                                    <td class="al">{{ item.title }}</td>
                                    <td class="al">{{ item.etc }}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <!-- 1. 하도급 계약서의 발급 -->
                        <div class="smp_announcement">
                            <strong class="title_b">{{ t.section2.step1.title }}</strong>
                            
                            <!-- 가. 서면발급 의무의 발생(하도급법 제3조) -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step1.partA.label }}</strong>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step1.partA.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                            </div>

                            <!-- 나. 서면 기재사항 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step1.partB.label }}</strong>
                                <p class="desc">{{ t.section2.step1.partB.desc }}</p>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step1.partB.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                            </div>

                            <!-- 다. 서면발급 시점 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step1.partC.label }}</strong>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step1.partC.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                                <ul class="row">
                                    <li v-for="(crit, idx) in t.section2.step1.partC.rows" :key="idx">
                                        {{ crit }}
                                    </li>
                                </ul>
                            </div>

                            <!-- 라. 서면발급 방법 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step1.partD.label }}</strong>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step1.partD.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                                <ul class="row">
                                    <li v-for="(crit, idx) in t.section2.step1.partD.rows" :key="idx">
                                        {{ crit }}
                                    </li>
                                </ul>
                            </div>

                            <!-- 마. 예외 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step1.partE.label }}</strong>
                                <p class="desc">{{ t.section2.step1.partE.desc }}</p>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step1.partE.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                            </div>

                            <!-- 바. 특칙-->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step1.partF.label }}</strong>
                                <p class="desc">{{ t.section2.step1.partF.desc }}</p>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step1.partF.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                                <p class="desc">{{ t.section2.step1.partF.desc2 }}</p>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step1.partF.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <!-- 2. 하도급 대금 감액 서면의 발급 -->
                        <div class="smp_announcement">
                            <strong class="title_b">{{ t.section2.step2.title }}</strong>
                            
                            <!-- 가. 서면발급 의무의 발생(하도급법 제3조) -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step2.partA.label }}</strong>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step2.partA.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                            </div>

                            <!-- 나. 서면 기재사항 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step2.partB.label }}</strong>
                                <p class="desc">{{ t.section2.step2.partB.desc }}</p>
                            </div>

                            <!-- 다. 서면발급 시점 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step2.partC.label }}</strong>
                                <p class="desc">{{ t.section2.step2.partC.desc }}</p>
                            </div>

                            <!-- 라. 서면발급 방법 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step2.partD.label }}</strong>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step2.partD.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                                <ul class="row">
                                    <li v-for="(crit, idx) in t.section2.step2.partD.rows" :key="idx">
                                        {{ crit }}
                                    </li>
                                </ul>
                            </div>

                            <!-- 마. 예외 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step2.partE.label }}</strong>
                                <p class="desc">{{ t.section2.step2.partE.desc }}</p>
                            </div>
                        </div>

                        <!-- 3. 기술자료 제공요구 서면의 발급 -->
                        <div class="smp_announcement">
                            <strong class="title_b">{{ t.section2.step3.title }}</strong>
                            
                            <!-- 가. 서면발급 의무의 발생(하도급법 제3조) -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step3.partA.label }}</strong>
                                <p class="desc">{{ t.section2.step3.partA.desc }}</p>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step3.partA.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                            </div>

                            <!-- 나. 서면 기재사항 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step3.partB.label }}</strong>
                                <p class="desc">{{ t.section2.step3.partB.desc }}</p>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step3.partB.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                            </div>

                            <!-- 다. 서면발급 시점 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step3.partC.label }}</strong>
                                <p class="desc">{{ t.section2.step3.partC.desc }}</p>
                            </div>

                            <!-- 라. 서면발급 방법 -->
                            <div class="sub_content_block">
                                <strong class="title_b">{{ t.section2.step3.partD.label }}</strong>
                                <ol>
                                    <li v-for="(item, index) in t.section2.step3.partD.items" :key="index">
                                        <p class="desc">{{ item.content }}</p>
                                    </li>
                                </ol>
                                <ul class="row">
                                    <li v-for="(crit, idx) in t.section2.step3.partD.rows" :key="idx">
                                        {{ crit }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <!-- Ⅲ. 서면의 보존에 관한 사항 -->
                    <section class="section">
                        <strong class="title">{{ t.section3.title }}</strong>
                        <ol>
                            <li v-for="(item, index) in t.section3.items" :key="index">
                                <p class="desc">{{ item.content }}</p>
                            </li>
                        </ol>
                        <ul class="row">
                            <li v-for="(row, idx) in t.section3.rows" :key="'un'+idx">
                                {{ row }}
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
    name: "gsrsu04020304",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "대·중소기업간 상생협력을 위한\n계약체결 가이드 라인",
                    intro: '2021.04.\nGS리테일\n\n 하도급 거래에서의 서면발급 및 보존에 관한 가이드라인',
                    section1: {
                        title: "Ⅰ. 목적",
                        desc: '- 이 실천사항은 공정거래위원회의 "하도급거래에서의 서면발급 및 보존에 관한 가이드라인"을 준용하여 GS리테일(이하 “회사”)과 파트너사가 「하도급거래 공정화에 관한 법률」(이하 "하도급법"이라 함) 상 서면발급에 관한 사항을 명확하게 인식하여 그에 따른 권리의 행사와 의무의 이행을 원활히 하는데 있다.'
                    },
                    section2: {
                        title: "Ⅲ. 파트너사 선정·운용 실천사항",  
                        desc: '- 회사는 하도급거래 계약의 체결 및 이행과정에서 이하에서 정하는 바에 따라 서면을 발급하여야 한다. 발급대상 서면은 다음 표 1과 같다.', 
                        desc2: '[표 1: 발급대상 서면]',
                        TableHeader: { col1: "번호", col2: "발급대상 서면", col3: "비고" },
                        IRListData: [
                            { num: "1", title: "기본계약서(추가 변경계약서 포함)", etc: "하도급법 제3조" },
                            { num: "2", title: "하도급계약 확인 서면", etc: "하도급법 제3조 제6항" },
                            { num: "3", title: "감액서면", etc: "하도급법 제11조" },
                            { num: "4", title: "기술자료 제공요구서", etc: "하도급법 제12조의 3" },
                            { num: "5", title: "목적물 등 수령증명서", etc: "하도급법 제8조" },
                            { num: "6", title: "검사결과통지서", etc: "하도급법 제9조" },
                            { num: "7", title: "계약변경내역 통지서", etc: "하도급법 제16조" }
                        ],
                        step1: {
                            title: "1. 하도급 계약서의 발급",
                            partA: {
                                label: "가. 파트너사 선정기준, 절차 및 결과의 공개",
                                items: [
                                    { content: "① 회사는 하도급법상 목적물 등의 제조·수리·시공 또는 용역 수행(이하 ‘제조 등’이라 함)을 파트너사에게 위탁하는 경우 파트너사와 위탁 목적물 등의 내용, 수량·단가 등 계약의 주요 내용을 합의하여 정한 후 서면으로 하도급 계약서를 발급한다." },
                                    { content: "② 당초 계약내용이 설계 변경 또는 추가 공사의 위탁 등으로 변경될 경우에는 특단의 사정이 없는 한 추가ㆍ변경 서면을 작성ㆍ발급한다." }
                                ],
                            },
                            partB: {
                                label: "나. 선정기준의 구체성 및 명확성",
                                desc: "- 하도급 계약 서면에는 실제 거래의 사실과 일치하는 내용이 반영되어야 하며 원칙적으로 다음 각 항의 사항을 기재한다.",
                                items: [
                                    { content: "① 위탁일, 위탁 목적물 등의 내용, 수량 및 단가, 목적물 등을 납품ㆍ인도 또는 제공하는 시기 및 장소, 목적물 등의 검사 방법 및 시기, 하도급 대금과 지급 방법ㆍ지급 기일" },
                                    { content: "② 회사가 파트너사에게 목적물 등의 제조 등에 소요되는 원재료 등을 제공하고자 하는 경우에는 그 원재료 등의 품명, 수량, 제공일, 대가의 지급 방법과 지급 기일" },
                                    { content: "③ 목적물 등의 제조 등을 위탁한 이후 원재료 등의 가격변동 등에 따른 하도급 대금 조정의 요건, 방법 및 절차 등" },
                                ],
                            },
                            partC: {
                                label: "다. 서면발급 시점",
                                items: [
                                    { content: "① 원칙적으로 당사는 협력기업과 위탁 계약의 주요 내용을 합의하여 정한 후 지체 없이 서면 계약서를 발급한다." },
                                    { content: "② 당사가 협력기업에게 지체없이 서면계약서를 교부하기 어려운 사정이 있다 하더 라도 특별한 사유가 없는 한 최소한 다음 각 호의 구분에 따른 기한까지는 서면으 로 계약서를 발급한다." }
                                ],
                                rows: [
                                    "- 제조위탁 : 협력기업이 물품 납품 등을 위한 작업을 시작하기 전",
                                    "- 용역위탁 : 협력기업이 계약이 체결된 용역수행행위를 시작하기 전"
                                ],
                            },
                            partD: {
                                label: "라. 서면발급 방법",
                                items: [
                                    { content: "① 회사는 회사 또는 대표자가 서명(전자서명법 제2조 제3호에 따른 공인전자서명을 포함한다)또는 기명날인한 계약서를 파트너사에게 발급한다." },
                                    { content: "② 하도급거래 회사자의 서명 또는 기명날인이 없는 서면을 발급한 경우에는 서면미 발급에 해당한다." },
                                    { content: "③ 다음과 같이 전자적인 기록의 제공으로 서면을 발급할 수 있다." }
                                ],
                                rows: [
                                    "- 전기통신회선을 통해 송신하고 파트너사가 사용하는 전자기록장치에 구비된 파일 에 기록하는 방법(예 : 전자메일)",
                                    "- 전기통신회선을 통해 파트너사의 열람에 제공하고 당해 파트너사가 사용하는 전자기록장치에 구비된 파일에 기록하는 방법(예 : 웹)",
                                    "- USB, CD-ROM 등 전자적 기록을 파트너사에게 교부하는 방법 등"
                                ],
                            },
                            partE: {
                                label: "마. 예외",
                                desc: "- 다음에서 예시한 바와 같이 하도급거래의 실제에 부합하는 합리적인 방식으로 서면이 발급된 경우에는 상기의 서면 기재사항 및 서면발급시점과 달리 서면발급 의무를 이행할 수 있다.",
                                items: [
                                    { content: "① 위탁시점에 확정하기 곤란한 사항에 대하여는 정당한 사유가 있는 경우. 단, 회사 가 위탁시점에 확정하기 곤란한 사항에 대하여는 정당한 사유가 있는 경우에 한해 해당 사항을 적지 아니한 서면을 발급 가능\n* 단, 이 경우에도 해당 사항이 정해지지 아니한 이유와 그 사항을 정하게 되는 예정 기일을 명시하고, 해당 사항이 확정되는 때에는 지체 없이 그 사항을 기재한 서면 을 발급하여야 한다." },
                                    { content: "② 하도급 거래 현실상 빈번한 거래가 있는 경우로서 업종 특성이나 현실에 비추어 계약 성립과 유지에 큰 문제가 없는 경우\n* 기본계약서를 교부하고 모사전송(Fax), 기타 전기·전자적인 형태 등에 의해 발주 한 것으로 발주 내용이 객관적으로 명백한 경우\n* 계약서에 법정 기재사항 일부가 누락되어 있으나, 건별 발주시 제공한 물량표·작업 지시서 등으로 누락 사항 파악이 가능한 경우\n* 기본계약서를 송부하고 수출용 물품을 제조하면서 파트너사가 회사에게 제출한 물품매도확약서(offer sheets)를 개별 계약서로 갈음할 수 있는 경우" },
                                ],
                            },
                            partF: {
                                label: "바. 특칙",
                                desc: "(1) 하도급계약의 추정",
                                items: [
                                    { content: "① 회사가 제조 등의 위탁을 하면서 하도급법 제3조 제2항의 사항을 적은 하도급 계약 서면을 발급하지 않는 경우(제3항에 따라 일부 사항을 적지 아니한 서면을 발급한 경우도 포함한다) 파트너사는 위탁받은 작업 내용, 하도급대금, 위탁받은 일시, 회사와 파트너사의 사업자 명과 주소, 기타 회사가 위탁한 내용 등을 기재 한 서면을 통지하여 확인을 요청할 수 있다." },
                                    { content: "② 회사는 파트너사로부터 상기 위탁내용 확인 요청서면을 통지받은 후 15일 이내에 그 내용에 대한 인정 또는 부인(否認)의 의사를 파트너사에게 서면으로 회신하여 야 한다." },
                                    { content: "③ 만약, 회사가 15일 이내에 회신을 발송하지 아니한 경우에는 천재나 그 밖의 사변 으로 회신이 불가능한 경우를 제외하고는 파트너사가 통지한 내용대로 위탁이 있 었던 것으로 추정한다." },
                                    { content: "④ 상기 위탁내용 확인요청 서면 통지와 위탁내용 확인요청에 대한 서면 회신은 회사와 파트너사의 주소로 하되, 내용증명 우편이나 그 밖에 통지와 회신의 내용 및 수신여부를 객관적으로 확인할 수 있는 방법(전자우편은 제외한다)으로 한다." },
                                ],
                                desc2: "(2) 공동도급계약의 경우",
                                item2: [
                                    { content: "- 공동이행방식의 공동도급계약의 경우에는 공동도급사 전원이 연명으로 하도급 계약을 체결하고 서면을 발급하거나 각자의 분담 부분에 대하여 개별적으로 하도급계약을 체결 또는 대표사가 공동수급체를 대표하여 하도급계약을 체결하고 서면을 발급한다." },
                                ],
                            },
                        },
                        step2: {
                            title: "2. 하도급 대금 감액 서면의 발급",
                            partA: {
                                label: "가. 서면발급 의무의 발생(하도급법 제 11조)",
                                items: [
                                    { content: "① 회사가 파트너사에게 제조 등의 “위탁을 할 때” 정한 하도급대금을 그대로 지급 하지 아니하고 그 금액에서 감하여 지급하고자 할 때에는 감액서면을 파트너사 에게 발급한다." },
                                    { content: "② 하도급 계약 체결시 거래가 빈번하여 대금결제․운송․검수․반품 등의 거래조건, 규격․재질, 제조공정 등과 관련된 일반적인 내용을 기본계약서에 담고, 단가․ 수량 등 하도급대금과 관련한 내용은 특약서 또는 발주서 등으로 위임하여 별도 의 특약 또는 발주내용에 의거 대금이 결정되는 경우에는 당해 특약 또는 발주 내용이 파트너사에게 통지되는 시점을 “위탁을 할 때”로 본다." }
                                ],
                            },
                            partB: {
                                label: "나. 서면 기재사항",
                                desc: "- 회사가 하도금대금을 감액하고자 할 때 교부해야 하는 서면에는 감액 사유와 기준 , 감액 대상이 되는 목적물 등의 물량, 감액 금액, 공제 등 감액 방법, 기타 감액의 정당성 입증 사항 등을 기재한다.다. 서면발급 시점",
                            },
                            partC: {
                                label: "다. 서면발급 시점",
                                desc: "- 회사가 감액 하고자 할 때에는 감액을 하기 전에 미리 파트너사에게 감액 서면을 발급한다.",
                            },
                            partD: {
                                label: "라. 서면발급 방식",
                                items: [
                                    { content: "① 회사가 파트너사에게 하도금 대금 감액을 서면으로 요구하는 경우에는 회사 또는 대표자가 서명(전자서명법 제2조 제3호에 따른 공인전자서명을 포함한다) 또는 기명날인한 서면을 교부한다." },
                                    { content: "② 회사가 하도급대금을 감액하고자 하는 경우, 서면으로 하여야 한다." },
                                    { content: "③ 다음과 같이 전자적인 기록의 서면을 발급할 수 있다." }
                                ],
                                rows: [
                                    "- 전기통신회선을 통해 송신하고 파트너사가 사용하는 전자기록장치에 구비된 파일에 기록하는 방법(예 : 전자메일)",
                                    "- 전기통신회선을 통해 파트너사의 열람에 제공하고 당해 파트너사가 사용하는 전자기록장치에 구비된 파일에 기록하는 방법(예 : 웹)",
                                    "- USB, CD-ROM 등 전자적 기록을 파트너사에게 교부하는 방법 등"
                                ],
                            },
                            partE: {
                                label: "마. 예외",
                                desc: "- 회사가 감액 서면을 발급하는 시점에 확정하기 곤란한 사항에 대하여는 정당한 사유가 있는 경우에 한해 해당 사항을 적지 아니한 서면을 발급할 수 있다. 다만, 이 경우에도 해당 사항이 정해지지 아니한 이유와 그 사항을 정하게 되는 예정기 일을 명시하며, 해당 사항이 확정되는 때에는 지체없이 그 사항을 기재한 서면을 발급한다.",
                            },
                        },
                        step3: {
                            title: "3. 기술자료 제공요구 서면의 발급",
                            partA: {
                                label: "가. 서면발급 의무의 발생(하도급법 제 12조의3)",
                                desc: "- 회사는 다음의 정당한 사유가 존재하여 파트너사에게 기술자료 제공을 요구하는 경우에는 요구 서면을 파트너사에게 발급한다.",
                                items: [
                                    { content: "① 수의계약, 경쟁입찰(일반경쟁, 제한경쟁, 지명경쟁 등) 등을 통해 하도급 계약을 체결하는 과정에서 협력업체의 기술력 평가, 주문품의 기준가격 마련, 제안서 검토, 공동기술개발, 발주처의 제안요청서(RFP) 요구조건 충족 등을 위해 기술 자료를 요구하는 경우" },
                                    { content: "② 회사가 하도급 거래 도중에 파트너사에 대한 기술지도, 품질관리, 성능테스트, 공동특허출원, 특허출원지원, 공동기술개발, 납품단가 조정을 위한 원가자료 요청 등의 명목으로 파트너사의 기술자료를 요구하는 경우" },
                                    { content: "③ 기술자료 임치계약을 체결한 기술에 대하여 임치계약 상의 교부조건이 발생하여 회사가 파트너사의 기술자료 제공을 요구하는 경우나." }
                                ],
                            },
                            partB: {
                                label: "나. 서면 기재 사항",
                                desc: "- 기술자료 제공요구 서면에는 기술자료의 명칭 및 범위, 요구 목적 및 다음 각 항에 따른 비밀유지에 관한 사항, 권리귀속관계와 기술자료의 대가, 요구일, 인도일, 인도방법, 기타 회사의 기술자료 제공 요구가 정당함을 입증할 수 있는 사항 등이 포함한다.",
                                items: [
                                    { content: "① 비밀유지에 관한 사항: 기술자료 중 어느 부분을 비밀로 유지할 것인지에 대해 적시하고 상호간 체결한 비밀유지각서 등이 있을 경우 이를 첨부" },
                                    { content: "② 권리귀속 관계: 회사가 요구하는 기술자료의 현재 권리 귀속자, 상호간 기술이전 계약을 체결하였는지 여부, 요구하는 기술이 공동개발한 기술인지 여부, 기술 자료가 제공된 후 권리귀속관계에 대한 상호 합의 사항 등" },
                                ],
                            },
                            partC: {
                                label: "다. 서면발급 시점",
                                desc: "- 회사가 기술자료 제공을 요구하는 경우 원칙적으로 당해 기술자료의 명칭 및 범위 요구 목적, 요구일, 인도일, 인도방법, 비밀유지에 관한 사항, 권리귀속관계, 기술 자료의 대가 등을 파트너사와 미리 협의하여 정한 후 지체없이 파트너사에게 서면을 발급한다",
                            },
                            partD: {
                                label: "라. 서면발급 방법",
                                items: [
                                    { content: "① 회사는 회사 또는 대표자가 서명(전자서명법 제2조 제3호에 따른 공인전자서명을 포함한다) 또는 기명날인한 기술자료 제공요구 서면을 파트너사에게 발급한다." },
                                    { content: "② 회사가 파트너사의 기술자료를 서면으로 요구하는 경우, 가급적 기술자료 요구 표준 서면양식[별지 4]을 사용한다." },
                                    { content: "③ 회사는 상기 표준 서식 이외에 특약서 등 별도의 계약 서면에 의해 기술자료 제공 을 요구할 수 있다. 다만, 별도 계약 서면에는 상기 2. 나.의 기재사항을 반드시 포함한다" },
                                    { content: "④ 다음과 같이전자적인 기록 제공으로 서면을 발급할 수 있다." },
                                ],
                                rows: [
                                    { content: "- 전기통신회선을 통해 송신하고 파트너사가 사용하는 전자기록장치에 구비된 파일 에 기록하는 방법(예 : 전자메일)" },
                                    { content: "- 전기통신회선을 통해 파트너사의 열람에 제공하고 당해 파트너사가 사용하는 전자기록장치에 구비된 파일에 기록하는 방법(예 : 웹)" },
                                    { content: "- USB, CD-ROM 등 전자적 기록을 파트너사에게 교부하는 방법 등" },
                                ],
                            },
                        },
                    },
                    section3: {
                        title: "Ⅲ. 서면의 보존에 관한 사항",
                        items: [
                            { content: "① 회사와 수급사업자는 모두 상기 Ⅱ. 에 열거된 서면과 기타 하도급법 시행령 제6조(서류의 보존) 제1항 각호의 서면을 보존하여야 한다. 보존하여야 하는 서면은 다음 표 2와 같다." },
                            { content: "② 보존해야 하는 서면은 당해 서면이 발급 ∙품의 ∙기타 용도에 따라 사용된 시점의 원본 상태로 보존되어야 한다. 컴퓨터 등 정보처리능력을 가진 장치에 의해 전자 적인 형태로 작성 ∙ 송수신 또는 저장된 것도 동일하다." },
                            { content: "③ 회사와 수급사업자는 회사자 간 하도급 거래가 끝난 날로부터 3년간 상기 서류를 보존하여야 한다. 여기서, 하도급 거래가 끝난 날이라 함은 다음 각 호의 기일을 의미한다." }
                        ],
                        rows: [
                            "- 제조위탁 ∙ 수리위탁 및 용역위탁 중 지식 ∙ 정보성과물의 작성위탁: 수급사업자가 회사에게 위탁받은 목적물을 납품 또는 인도한 날",
                            "- 용역위탁 중 역무의 공급위탁: 회사가 수급사업자에게 위탁한 역무 공급을 완료한 날",
                            "- 하도급계약이 중도 해지되거나 거래가 중지된 경우: 해지 또는 중지된 날"
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
                    MainTitle: "Guidelines for Contract Conclusion for Mutual Growth between\nLarge and Small and Medium-Sized Enterprises",
                    intro: '2021.04.\nGS Retail\n\nGuidelines for the Issuance and Retention of Written Documents in Subcontracting Transactions',
                    section1: {
                        title: "Purpose",
                        desc: `- These practice items, in accordance with the Fair Trade Commission's "Guidelines on the Issuance and Preservation of Written Documents in Subcontract Transactions," are intended to enable the Company (hereinafter the “Company”, i.e., GS Retail) and its partner companies to clearly understand the matters concerning the issuance of written documents under the Fair Transactions in Subcontracting Act (hereinafter the "Subcontracting Act"), and thereby to facilitate the exercise of rights and performance of obligations accordingly.`/* 260604 번역 */
                    },
                    section2: {
                        title: "III. Guidelines for the Selection and Operation of Partner Companies",  
                        desc: '- The Company shall issue written documents in the course of concluding and performing subcontract transaction contracts as set forth below. The written documents subject to issuance are as shown in Table 1 below.'/* 260604 번역 */, 
                        desc2: '[Table 1: Written Documents Subject to Issuance]',
                        TableHeader: { col1: "No.", col2: "Document Subject to Issuance", col3: "Remarks" },
                        IRListData: [
                            { num: "1", title: "Master contract (including addendum and change contracts)", etc: "Article 3 of the Subcontracting Act" },
                            { num: "2", title: "Subcontracting contract confirmation document", etc: "Article 3(6) of the Subcontracting Act" },
                            { num: "3", title: "Price reduction document", etc: "Article 11 of the Subcontracting Act" },
                            { num: "4", title: "Technical data provision request document", etc: "Article 12-3 of the Subcontracting Act" },
                            { num: "5", title: "Receipt confirmation of deliverables, etc.", etc: "Article 8 of the Subcontracting Act" },
                            { num: "6", title: "Inspection result notification", etc: "Article 9 of the Subcontracting Act" },
                            { num: "7", title: "Contract change details notification", etc: "Article 16 of the Subcontracting Act" }
                        ],
                        step1: {
                            title: "1. Issuance of Subcontracting Agreements",
                            partA: {
                                label: "a. Disclosure of the criteria, procedures, and results for selecting Partner Companies"/* 260604 번역 */,
                                items: [
                                    { content: "① Where the Company consigns to a Partner Company the manufacturing, repair, construction, or performance of services for objects, etc. under the Subcontracting Act (hereinafter referred to as 'manufacturing, etc.'), the Company shall, after agreeing upon and determining with the Partner Company the principal terms of the contract such as the content of the consigned objects, etc. and the quantity and unit price, issue a written subcontracting contract."/* 260604 번역 */ },
                                    { content: "② Where the original contract content is changed due to a design modification or the consignment of additional construction, etc., the Company shall, absent extraordinary circumstances, prepare and issue an addendum or amendment document."/* 260604 번역 */ }
                                ],
                            },
                            partB: {
                                label: "Specificity and Clarity of Selection Standards",
                                desc: "- The subcontract written document shall reflect contents consistent with the facts of the actual transaction and shall, in principle, state the matters in each of the following items."/* 260604 번역 */,
                                items: [
                                    { content: "① The consignment date; the content of the consigned objects, etc.; the quantity and unit price; the time and place for supplying, delivering, or providing the objects, etc.; the method and timing of inspection of the objects, etc.; and the subcontract payment and the method and date of payment"/* 260604 번역 */ },
                                    { content: "② Where the Company intends to provide the Partner Company with raw materials, etc. required for the manufacturing, etc. of the objects, etc., the name, quantity, and provision date of such raw materials, etc., and the method and date of payment of consideration"/* 260604 번역 */ },
                                    { content: "③ The requirements, methods, and procedures for adjusting the subcontract payment in accordance with changes in the prices of raw materials, etc. after the manufacturing, etc. of the objects, etc. has been consigned"/* 260604 번역 */ },
                                ],
                            },
                            partC: {
                                label: "c. Timing of issuance of the written document"/* 260604 번역 */,
                                items: [
                                    { content: "① As a general rule, after agreeing upon and determining the principal terms of the consignment contract with the partner company, the Company issues a written contract without delay."/* 260604 번역 */ },
                                    { content: "② Even where there are circumstances that make it difficult for the Company to deliver a written contract to the partner company without delay, the Company shall, absent special grounds, issue the contract in writing at least by the deadline corresponding to each of the following subparagraphs."/* 260604 번역 */ }
                                ],
                                rows: [
                                    "- Manufacturing consignment: before the partner company begins the work for product delivery, etc."/* 260604 번역 */,
                                    "- Service consignment: before the partner company begins the contracted service performance"/* 260604 번역 */
                                ],
                            },
                            partD: {
                                label: "d. Method of issuance of the written document"/* 260604 번역 */,
                                items: [
                                    { content: "① The Company shall issue to the Partner Company a contract signed (including a certified electronic signature under Article 2, subparagraph 3 of the Digital Signature Act) or affixed with the name and seal of the Company or its representative."/* 260604 번역 */ },
                                    { content: "② Where a document is issued without the signature or name and seal of the contracting party in the subcontracting transaction, it constitutes a failure to issue a document."/* 260604 번역 */ },
                                    { content: "③ A document may be issued through the provision of electronic records as follows."/* 260604 번역 */ }
                                ],
                                rows: [
                                    "- The method of transmitting via telecommunications lines and recording in a file provided in the electronic recording device used by the partner company (e.g., email)"/* 260604 번역 */,
                                    "- The method of providing for the partner company's viewing via telecommunications lines and recording in a file provided in the electronic recording device used by said partner company (e.g., web)"/* 260604 번역 */,
                                    "- Methods such as delivering electronic records to the partner company via USB, CD-ROM, etc."/* 260604 번역 */
                                ],
                            },
                            partE: {
                                label: "A method of providing electronic records such as USB, CD-ROM, etc. to the partner company",
                                desc: "- Where a written document has been issued in a reasonable manner consistent with the actual practice of subcontract transactions, as exemplified below, the obligation to issue a written document may be performed in a manner that differs from the above written-document particulars and the time of issuance."/* 260604 번역 */,
                                items: [
                                    { content: "When there are justifiable grounds for matters that are difficult to determine at the time of outsourcing; however, the Company may issue a document without stating such items only when there are justifiable grounds for matters that are difficult to determine at the time of outsourcing.\n* Provided, however, that even in such cases, the reason why the relevant matters have not been determined and the scheduled date on which such matters will be determined shall be specified, and when such matters are finalized, a document stating such matters shall be issued without delay."/* 260604 번역 */ },
                                    { content: "② Where frequent transactions exist in the actual practice of subcontracting transactions and there is no significant problem with the formation and maintenance of the contract in light of the characteristics or realities of the industry\n* Where a basic contract has been delivered and the order was placed by facsimile (fax) or other electrical or electronic form, and the order content is objectively clear\n* Where some statutorily required items are omitted from the contract, but the omitted items can be ascertained from the quantity sheet, work order, or the like provided at the time of each order\n* Where a basic contract has been sent and, in manufacturing goods for export, the offer sheets submitted by the Partner Company to the Company may substitute for an individual contract"/* 260604 번역 */ },
                                ],
                            },
                            partF: {
                                label: "Special Provisions",
                                desc: "Presumption of Subcontracting Contract",
                                items: [
                                    { content: "① Where the Company, in consigning manufacturing, etc., fails to issue a written subcontracting contract stating the matters set out in Article 3(2) of the Subcontracting Act (including cases where a document omitting some matters is issued pursuant to paragraph (3)), the Partner Company may request confirmation by notifying the Company in writing of the content of the consigned work, the subcontract payment, the date and time of consignment, the business names and addresses of the Company and the Partner Company, and other content consigned by the Company."/* 260604 번역 */ },
                                    { content: "② The Company shall, within 15 days after being notified by the Partner Company of the above request document for confirmation of the consignment content, reply in writing to the Partner Company expressing its intention to acknowledge or deny such content."/* 260604 번역 */ },
                                    { content: "③ If the Company does not dispatch a reply within 15 days, the consignment shall be presumed to have been made as notified by the Partner Company, except where the reply is impossible due to a natural disaster or other incident."/* 260604 번역 */ },
                                    { content: "④ The above written notice requesting confirmation of the consignment content and the written reply to the request for confirmation of the consignment content shall be sent to the addresses of the Company and the Partner Company, and shall be made by certified mail or another method (excluding email) by which the content of the notice and reply and whether they were received can be objectively confirmed."/* 260604 번역 */ },
                                ],
                                desc2: "In the Case of Joint Contract",
                                item2: [
                                    { content: "- In the case of a joint contract under the joint-performance method, all joint contractors shall jointly conclude the subcontract and issue the written document, or each shall individually conclude a subcontract for its respective allotted portion, or the representative company shall conclude the subcontract on behalf of the joint venture and issue the written document."/* 260604 번역 */ },
                                ],
                            },
                        },
                        step2: {
                            title: "Issuance of Written Document for Subcontracting Price Reduction",
                            partA: {
                                label: "Obligation to Issue Written Documents (Article 11 of the Subcontracting Act)",
                                items: [
                                    { content: "① Where the Company intends to pay an amount reduced from the subcontract payment determined 'at the time of consigning' manufacturing, etc. to the Partner Company, rather than paying it in full, the Company shall issue a reduction document to the Partner Company."/* 260604 번역 */ },
                                    { content: "② Where, due to frequent transactions at the time of concluding a subcontracting contract, general matters related to transaction conditions such as payment, transportation, inspection, and returns, as well as specifications, materials, and manufacturing processes, are set out in the basic contract, while matters related to the subcontract payment such as unit price and quantity are delegated to a special agreement or purchase order, and the payment is determined based on such separate special agreement or order content, the point at which such special agreement or order content is notified to the Partner Company shall be deemed the 'time of consignment.'"/* 260604 번역 */ }
                                ],
                            },
                            partB: {
                                label: "Written Statement Items",
                                desc: "- The written document the Company must deliver when it intends to reduce the subcontract payment shall state the grounds and criteria for the reduction, the volume of the subject matter, etc. subject to reduction, the reduction amount, the reduction method such as deduction, and other matters proving the legitimacy of the reduction. C. Time of written-document issuance"/* 260604 번역 */,
                            },
                            partC: {
                                label: "c. Timing of issuance of the written document"/* 260604 번역 */,
                                desc: "- When the Company intends to make a reduction, it shall issue a written reduction document to the partner company in advance, before making the reduction."/* 260604 번역 */,
                            },
                            partD: {
                                label: "When the Company intends to make a reduction, the price reduction document shall be issued to the partner company in advance before making the reduction.",
                                items: [
                                    { content: "① Where the Company requests in writing a reduction of the subcontract payment from the Partner Company, it shall deliver a document signed (including a certified electronic signature under Article 2, subparagraph 3 of the Digital Signature Act) or affixed with the name and seal of the Company or its representative."/* 260604 번역 */ },
                                    { content: "② Where the Company intends to reduce the subcontract payment, it shall do so in writing."/* 260604 번역 */ },
                                    { content: "When the Company intends to reduce the subcontracting price, it shall do so in writing." }
                                ],
                                rows: [
                                    "- The method of transmitting via telecommunications lines and recording in a file provided in the electronic recording device used by the partner company (e.g., email)"/* 260604 번역 */,
                                    "- The method of providing for the partner company's viewing via telecommunications lines and recording in a file provided in the electronic recording device used by said partner company (e.g., web)"/* 260604 번역 */,
                                    "- Methods such as delivering electronic records to the partner company via USB, CD-ROM, etc."/* 260604 번역 */
                                ],
                            },
                            partE: {
                                label: "A method of providing electronic records such as USB, CD-ROM, etc. to the partner company",
                                desc: "- For matters that are difficult to finalize at the time the Company issues the written reduction document, the Company may issue a written document that does not state such matters, only where there is justifiable reason. Even in such cases, however, the reason such matters have not been determined and the expected date on which they will be determined shall be specified, and when such matters are finalized, a written document stating those matters shall be issued without delay."/* 260604 번역 */,
                            },
                        },
                        step3: {
                            title: "A document without certain items may be issued only when there are justifiable grounds for matters that are difficult to determine at the time the Company issues the price reduction document. However, even in such cases, the reason why the item has not been determined and the scheduled date for its determination must be stated, and when the item is confirmed, a document stating the item must be issued without delay.",
                            partA: {
                                label: "Issuance of Written Document for Technical Data Provision Request",
                                desc: "- Where the following justifiable grounds exist and the Company requests the provision of technical data from a partner company, it shall issue a written request to the partner company."/* 260604 번역 */,
                                items: [
                                    { content: "① Where technical data is requested in the course of concluding a subcontracting agreement through a private contract, competitive bidding (open competition, limited competition, designated competition, etc.), or similar means, for purposes such as evaluating the partner company's technical capabilities, establishing the standard price of ordered goods, reviewing proposals, joint technology development, or meeting the requirements of the ordering party's Request for Proposal (RFP)"/* 260604 번역 */ },
                                    { content: "② Where the Company, during a subcontracting transaction, requests the Partner Company's technical data under the pretext of technical guidance, quality control, performance testing, joint patent applications, patent application support, joint technology development, or requests for cost data to adjust supply unit prices"/* 260604 번역 */ },
                                    { content: "③ Where, with respect to technology for which a technology escrow agreement has been concluded, the delivery conditions under the escrow agreement arise and the Company requests the Partner Company to provide the technical data; or"/* 260604 번역 */ }
                                ],
                            },
                            partB: {
                                label: "Written Statement Items",
                                desc: "- The written request for the provision of technical data shall include the name and scope of the technical data, the purpose of the request and matters concerning confidentiality under each of the following items, the attribution of rights and the consideration for the technical data, the request date, the delivery date, the delivery method, and other matters that can prove the legitimacy of the Company's request for the provision of technical data."/* 260604 번역 */,
                                items: [
                                    { content: "Matters relating to confidentiality: Specify which portions of the technical data are to be kept confidential, and if a mutual non-disclosure agreement or similar has been concluded, attach it" },
                                    { content: "② Allocation of rights: the current holder of the rights to the technical data requested by the Company, whether a technology transfer agreement has been concluded between the parties, whether the requested technology is jointly developed technology, matters mutually agreed regarding the allocation of rights after the technical data is provided, and the like"/* 260604 번역 */ },
                                ],
                            },
                            partC: {
                                label: "c. Timing of issuance of the written document"/* 260604 번역 */,
                                desc: "- Where the Company requests the provision of technical data, it shall, in principle, determine the name and scope of the technical data, the purpose, request date, delivery date, delivery method, matters concerning confidentiality, attribution of rights, and consideration for the technical data, etc. by prior consultation with the partner company, and then issue a written document to the partner company without delay."/* 260604 번역 */,
                            },
                            partD: {
                                label: "d. Method of issuance of the written document"/* 260604 번역 */,
                                items: [
                                    { content: "① The Company shall issue to the Partner Company a technical data provision request document signed (including a certified electronic signature under Article 2, subparagraph 3 of the Digital Signature Act) or affixed with the name and seal of the Company or its representative."/* 260604 번역 */ },
                                    { content: "② Where the Company requests the Partner Company's technical data in writing, it shall, to the extent possible, use the standard technical data request form [Annex 4]."/* 260604 번역 */ },
                                    { content: "③ In addition to the above standard form, the Company may request the provision of technical data by means of a separate contract document such as a special agreement. However, the separate contract document must include the items set out in 2.b. above."/* 260604 번역 */ },
                                    { content: "④ A document may be issued through the provision of electronic records as follows."/* 260604 번역 */ },
                                ],
                                rows: [
                                    { content: "- The method of transmitting via telecommunications lines and recording in a file provided in the electronic recording device used by the partner company (e.g., email)"/* 260604 번역 */ },
                                    { content: "- The method of providing for the partner company's viewing via telecommunications lines and recording in a file provided in the electronic recording device used by said partner company (e.g., web)"/* 260604 번역 */ },
                                    { content: "- Methods such as delivering electronic records to the partner company via USB, CD-ROM, etc."/* 260604 번역 */ },
                                ],
                            },
                        },
                    },
                    section3: {
                        title: "III. Matters Concerning the Retention of Documents"/* 260604 번역 */,
                        items: [
                            { content: "① Both the Company and the subcontractor shall retain the documents listed in II. above and the other documents set out in each subparagraph of Article 6(1) (Retention of Documents) of the Enforcement Decree of the Subcontracting Act. The documents that must be retained are as set out in Table 2 below."/* 260604 번역 */ },
                            { content: "② Documents that must be retained shall be retained in the original state as of the time the document was used for issuance, approval, or other purposes. The same applies to documents prepared, transmitted, received, or stored in electronic form by a device with information processing capability such as a computer."/* 260604 번역 */ },
                            { content: "③ The Company and the subcontractor shall retain the above documents for three years from the date on which the subcontracting transaction between the parties ended. Here, the date on which the subcontracting transaction ended means the dates set out in each of the following subparagraphs."/* 260604 번역 */ }
                        ],
                        rows: [
                            "- Manufacturing consignment, repair consignment, and consignment for the creation of knowledge/information work products within service consignment: the date on which the partner company delivers or hands over the subject matter consigned by the Company"/* 260604 번역 */,
                            "- Supply consignment of services within service consignment: the date on which the partner company completes the supply of services consigned by the Company"/* 260604 번역 */,
                            "- Where the subcontract is terminated midway or the transaction is suspended: the date of termination or suspension"/* 260604 번역 */
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
.modal_header {white-space:pre-line;}
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
.pop_guide_wrap .base_table thead th { padding:28px 24px; background-color: #F8F8F8; color: #161616; font-weight: 700; }
.pop_guide_wrap .base_table th:last-child ,
.pop_guide_wrap .base_table td:last-child { border-right: 0; }
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
    .pop_guide_wrap .base_table col {width:auto !important}
    .pop_guide_wrap .base_table col:first-child {width:70px !important}
    .pop_guide_wrap .base_table th, 
    .pop_guide_wrap .base_table td {padding:6px 12px; font-size:1.5rem; line-height:22px;}
    .pop_guide_wrap .base_table thead th {padding:14px 12px;}
}
</style>