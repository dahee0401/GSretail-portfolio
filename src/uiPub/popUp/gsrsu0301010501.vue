<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <div class="smp_announcement_pop">
                    <p class="intro_desc">{{ t.intro }}</p>

                    <!-- 1.공급망 지속가능성 관리 선언 -->
                    <section class="section">
                        <strong class="title">{{ t.section1.title }}</strong>
                        <div class="smp_announcement">
                            <dl>
                                <template v-for="(declaration, idx) in t.section1.declarations" :key="idx">
                                    <dt>{{ declaration.number }}</dt>
                                    <dd>{{ declaration.description }}</dd>
                                </template>
                            </dl>
                        </div>
                    </section>
                    
                    <!-- 2.정책의 목표 -->
                    <section class="section">
                        <strong class="title">{{ t.section2.title }}</strong>
                        <p class="desc">{{ t.section2.desc }}</p>
                    </section>
                    
                    <!-- 3.적용 범위 -->
                    <section class="section">
                        <strong class="title">{{ t.section3.title }}</strong>
                        <p class="desc">{{ t.section3.desc }}</p>
                    </section>
                    
                    <!-- 4.공급망 지속가능성 관리 체계 -->
                    <section class="section">
                        <strong class="title">{{ t.section4.title }}</strong>
                        <p class="desc">{{ t.section4.desc }}</p>
                        <figure class="image_wrap">
                            <img :src="t.section4.image.src" :alt="t.section4.image.alt">
                        </figure>
                    </section>
                    
                    <!-- 공급망 위험 실사 프로세스 -->
                    <section class="section">
                        <strong class="title">{{ t.section5.title }}</strong>
                        <p class="desc">{{ t.section5.desc }}</p>

                        <strong class="title_b">{{ t.section5.processTitle }}</strong>
                        <ul class="conti_step_list_orange">
                            <li v-for="(step, index) in t.section5.steps" :key="index">
                                <span class="num">{{ step.id }}</span>
                                <span class="txt" v-html="step.title"></span>
                                <ul class="list">
                                    <li v-for="(detail, dIndex) in step.details" :key="dIndex">
                                        {{ detail }}
                                    </li>
                                </ul>
                            </li>
                        </ul>
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
    name: "gsrsu0301010501",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "GS리테일 공급망 지속가능성 관리 정책",
                    intro: 'GS리테일은 공급망 내 협력사의 ESG역량과 경쟁력 향상은 물론, 지속가능성과 관련된 리스크와 기회를 관리하기 위해 공급망 지속가능성 관리 정책을 수립하여 실천하고 있습니다. 또한, 파트너사의 ESG경영 실천을 위해 노동/인권, 안전보건, 환경보호, 윤리경영, 경영시스템 등에 대한 ESG 행동규범을 제정하여 파트너사 사이트 등을 통해 안내하고 있습니다.',
                    section1: {
                        title: '1. 공급망 지속가능성 관리 선언',
                        desc: '본 정책은 GS리테일이 파트너사들과 지속가능한 공급망을 구축하여 건전한 기업 생태계 조성에 앞장서고, 파트너사들과의 동반성장을 실현하고자 하는 것을 목표로 합니다.',
                        declarations: [
                            { number: "하나", description: "공정거래를 준수하여 공정하고 투명한 거래를 하겠습니다." },
                            { number: "둘", description: "공급망의 지속가능성 향상을 위해 ESG 교육 및 컨설팅을 비롯한 동반성장 프로그램 지원을 통한 공급망 역량강화를 위해 노력하겠습니다." },
                            { number: "셋", description: "공급망 구매 경쟁력 강화를 위해 녹색구매정책에 기반한 녹색구매를 강화하고, 지속적으로 우수 공급사를 발굴하겠습니다." },
                            { number: "넷", description: "정기적으로 공급망에 대한 지속가능성을 평가하고, 가이드라인 제공을 통해 공급망을 지원 및 리스크를 관리하겠습니다." },
                            { number: "다섯", description: "공급망과의 원활한 소통을 위한 협력사간담회 및 익명제보채널 운영 등을 통해 소통을 강화하겠습니다." }
                        ]
                    },
                    section2: {
                        title: '2. 정책의 목표',
                        desc: "본 정책은 GS리테일과 거래하는 공급업체, 하도급업체 등의 이해관계자와 근로자 등 기업의 생산 제품 및 서비스를 유통하는 과정에서 영향을 미칠 수 있는 모든 공급망 관련 이해관계자를 대상으로 합니다. 또한, 본 정책은 GS리테일과 거래하는 파트너사에게도 본 정책과 유사한 수준의 정책 준수를 권장합니다.",
                    },
                    section3: {
                        title: '3. 적용 범위',
                        desc: '지역사회 참여활동은 지역사회 성장을 위한 활동들로 이루어지며, 사회공헌 관련한 활동은 사회공헌파트가 주관하고 지역 특산물 관련 판로개척은 MD 및 방송사업지원팀이 담당하고 있습니다.'
                    },
                    section4: {
                        title: '4.공급망 지속가능성 관리 체계',
                        desc: '공급망의 지속가능성 관리를 위해 협력사 소싱 및 계약, 협력사 지원, 품질관리 및 공정거래 관련하여 아래와 같이 관리 체계를 구성하고 있습니다.',
                        image: {
                            src: require("@/assets/images/dummy/gsrsu03010105.png"),
                            alt: '공급망 지속가능성 관리 체계'
                        }
                    },
                    section5: {
                        title: '5.공급망 리스크 식별 및 관리 프로세스',
                        desc: '공급망 리스크를 식별하고 관리하기 위해 협력사 계약시점 및 거래 과정 중에 공급망 진단평가를 시행하고 있으며, ESG진단평가는 각 사업별 MD기획팀에서 실행하고 정책지원팀에서 리스크 항목 설계 등을 지원하고 있습니다. 공급망 실사 프로세스는 평가대상 선정> 위험 항목 식별> 위험 평가> 실사> 개선 진행 등으로 진행됩니다. 이중, 공급망 진단 시 품질관련 위험 관리를 위해 품질관리팀에서 위험평가와 현장 검증 실사를 실시하고 개선책에 대한 가이드를 제공하며, 개선이 되었는지 효과성 평가를 진행합니다. 또한, 개선이 진행되었는지 모니터링까지 진행하고 있습니다. 이외, 상시로 공급망 리스크를 파악할 수 있도록 홈페이지를 통한 협력사 고충을 익명으로 상시 접수할 수 있으며 이 과정에서 실질적인 위험이 발견되면 현장실사를 진행하고 이를 완화할 수 있는 조치를 적절히 시행하고 있습니다.',
                        processTitle: "공급망 위험 실사 프로세스",
                        steps: [
                            { id: '01', title: '1단계<br>평가대상 선정', details: ['평가 대상 선정\n(신규 및 기존 협력사)'] },
                            { id: '02', title: '2단계<br>공급망 위험 식별', details: ['공급망 위험 요소 식별'] },
                            { id: '03', title: '3단계<br>위험 평가 및 실사', details: ['위험 평가 실행','위험발견 시 실사 진행','ESG 교육 및 컨설팅 지원'] },
                            { id: '04', title: '4단계<br>모니터링', details: ['위험 개선에 대한 모니터링', '상시 공급망 고충 확인/모니터링'] }
                        ]
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "GS Retail Supply Chain Sustainability Management Policy",
                    intro: `GS Retail has established and implemented a supply chain sustainability management policy to enhance the ESG capabilities and competitiveness of Partner Companies within its supply chain, as well as to manage sustainability-related risks and opportunities. In addition, to support Partner Companies' implementation of ESG management, GS Retail has established an ESG Code of Conduct covering labor/human rights, safety and health, environmental protection, ethical management, and management systems, and provides guidance through the Partner Company website and other channels.`/* 260604 번역 */,
                    section1: {
                        title: 'Supply Chain Sustainability Management Declaration',
                        desc: 'This policy aims for GS Retail to take the lead in creating a sound corporate ecosystem by building a sustainable supply chain with its Partner Companies, and to realize win-win growth with its Partner Companies.'/* 260604 번역 */,
                        declarations: [
                            { number: "One"/* 260604 번역 */, description: "We will comply with fair trade principles to conduct fair and transparent transactions."/* 260604 번역 */ },
                            { number: "Two"/* 260604 번역 */, description: "To enhance the sustainability of the supply chain, we will strive to strengthen supply chain capabilities through support for shared growth programs, including ESG education and consulting."/* 260604 번역 */ },
                            { number: "Three"/* 260604 번역 */, description: "To strengthen supply chain procurement competitiveness, we will reinforce green purchasing based on our green purchasing policy and continuously identify excellent suppliers."/* 260604 번역 */ },
                            { number: "Four"/* 260604 번역 */, description: "We will regularly assess the sustainability of our supply chain and, by providing guidelines, support the supply chain and manage risks."/* 260604 번역 */ },
                            { number: "Five"/* 260604 번역 */, description: "We will strengthen communication through measures such as holding Partner Company meetings and operating an anonymous reporting channel for smooth communication with the supply chain."/* 260604 번역 */ }
                        ]
                    },
                    section2: {
                        title: 'Policy Objectives',
                        desc: "This policy applies to all supply chain-related stakeholders who may be affected in the process of distributing the company's products and services, including stakeholders such as suppliers and subcontractors that do business with GS Retail, as well as workers. In addition, this policy recommends that Partner Companies doing business with GS Retail comply with policies at a level similar to this policy."/* 260604 번역 */,
                    },
                    section3: {
                        title: 'Scope of Application',
                        desc: 'Community engagement activities consist of activities for the growth of the local community. Activities related to social contribution are organized by the Social Contribution Part, and the development of sales channels related to local specialty products is handled by the MD and Broadcasting Business Support Team.'/* 260604 번역 */
                    },
                    section4: {
                        title: 'Supply Chain Sustainability Management System',
                        desc: 'To manage the sustainability of the supply chain, we have established the following management system covering Partner Company sourcing and contracting, Partner Company support, quality control, and fair trade.'/* 260604 번역 */,
                        image: {
                            src: require("@/assets/images/dummy/gsrsu03010105.png"),
                            alt: 'Supply Chain Sustainability Management System'
                        }
                    },
                    section5: {
                        title: '5. Supply Chain Risk Identification and Management Process',
                        desc: 'To identify and manage supply chain risks, we conduct supply chain diagnostic assessments at the time of contracting with Partner Companies and during the course of transactions. ESG diagnostic assessments are carried out by the MD Planning Team of each business, with the Policy Support Team supporting the design of risk items and other tasks. The supply chain due diligence process proceeds through the selection of assessment targets > identification of risk items > risk assessment > due diligence > implementation of improvements. Among these, to manage quality-related risks during supply chain diagnosis, the Quality Control Team conducts risk assessments and on-site verification due diligence, provides guidance on improvement measures, and carries out effectiveness evaluations to confirm whether improvements have been made. The team also monitors whether the improvements have been implemented. In addition, to identify supply chain risks at all times, Partner Company grievances can be submitted anonymously at any time through our website; and where a substantive risk is identified in this process, we conduct on-site due diligence and appropriately implement measures to mitigate it.'/* 260604 번역 */,
                        processTitle: "Supply Chain Risk Due Diligence Process",
                        steps: [
                            { id: '01', title: 'Step 1<br>Selection of Assessment Targets', details: ['(new and existing partner companies)'] },
                            { id: '02', title: 'Step 2<br>Supply Chain Risk Identification', details: ['Identification of supply chain risk factors'] },
                            { id: '03', title: 'Step 3<br>Risk Assessment and Due Diligence', details: ['Conduct risk assessment','Conduct due diligence when risks are identified','ESG training and consulting support'] },
                            { id: '04', title: 'Step 4<br>Monitoring', details: ['Monitoring of risk improvements', 'Ongoing partner grievance verification and monitoring'] }
                        ]
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
/* smp_announcement_pop 스타일 */
.smp_announcement_pop {font-size:15px; line-height:25px;}
.smp_announcement_pop .intro_desc {color:#444; font-size:18px; line-height:26px;}
.smp_announcement_pop .title {display:block;font-size:18px;font-weight:700;padding-bottom:20px}
.smp_announcement_pop .title_b {display:block;font-size:18px;font-weight:700;padding:50px 0 18px 0}
.smp_announcement_pop .section {padding:35px 0;border-bottom:1px solid #dfdfdf}
.smp_announcement_pop .section.first {padding-top:0}
.smp_announcement_pop .section:last-child {border-bottom:0}
.smp_announcement_pop .section .desc {font-size:15px;line-height:25px}
.smp_announcement_pop .section .smp_announcement>dl {overflow:hidden;margin-top:10px}
.smp_announcement_pop .section .smp_announcement>dl dt {float:left;background:#0072bc;border-radius:15px;color:#fff;text-align:center;width:42px;font-size:13px;line-height:19px}
.smp_announcement_pop .section .smp_announcement>dl dd {padding-left:50px;margin-bottom:7px;padding-bottom:7px;line-height:19px;font-size:15px}
.smp_announcement_pop .image_wrap {margin:30px 0}
.smp_announcement_pop .image_wrap img {width:100%}
.conti_step_list_orange {overflow:hidden; display:flex; gap:10px; flex-wrap:wrap;}
.conti_step_list_orange>li {flex: 0 0 calc(25% - 10px);position:relative;height:268px;border:3px solid #ebebeb;border-radius:8px;text-align:center;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;white-space:pre-line;}
.conti_step_list_orange>li:after {content:"";display:inline-block;height:100%;vertical-align:middle}
.conti_step_list_orange>li .num {position:absolute;top:-3px;left:20px;padding-top:6px;font-size:16px;font-weight:700;color:#f26522;border-top:3px solid #f26522}
.conti_step_list_orange>li .txt {display:block;font-size:15px;line-height:22px;padding:38px 0 15px 0;font-weight:700}
.conti_step_list_orange>li ul.list {font-size:14px;text-align:left!important;padding-bottom:0;padding:0 11px;line-height:22px}
.sust_purc_policy_popup .dot,
.conti_step_list_orange>li ul li {position:relative;padding-left:10px;padding-top:0px}
.sust_purc_policy_popup .dot:before,
.conti_step_list_orange>li ul li:before {content:'';position:absolute;top:10px;left:0;width:4px;height:4px;border-radius:50%;background:#f26522}

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; padding-bottom:24px;}
    .smp_announcement_pop .title_b {padding:25px 0 10px 0}
    .conti_step_list_orange>li {flex: 0 0 calc(50% - 10px);}
}
</style>