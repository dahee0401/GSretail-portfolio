<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <div class="smp_announcement_pop">
                    <!-- 1. 제정목적 -->
                    <section class="section first">
                        <strong class="title">{{ t.section1.title }}</strong>
                        <p class="desc">{{ t.section1.desc }}</p>
                    </section>

                    <!-- 2. 적용범위 -->
                    <section class="section">
                        <strong class="title">{{ t.section2.title }}</strong>
                        <p class="desc">{{ t.section2.desc }}</p>
                    </section>

                    <!-- 3. 기본원칙 -->
                    <section class="section">
                        <strong class="title">{{ t.section3.title }}</strong>
                        <div class="smp_announcement">
                            <dl class="direction_list">
                            <template v-for="(item, index) in t.section3.items" :key="index">
                                <dt>{{ item.label }}</dt>
                                <dd>{{ item.content }}</dd>
                            </template>
                            </dl>
                        </div>
                    </section>

                    <!-- 4. 인권위험실사 프로세스 -->
                    <section class="section">
                        <strong class="title">{{ t.section4.title }}</strong>
                        <p class="desc">{{ t.section4.desc }}</p>

                        <strong class="title">{{ t.section4.processTitle }}</strong>
                        <div class="activity_grid">
                            <div v-for="(activity, index) in t.section4.activities" :key="index" class="activity_item">
                                <strong class="title_b">{{ activity.subject }}</strong>
                                <p class="desc">{{ activity.content }}</p>
                            </div>
                        </div>

                        <div class="inner_box">
                            <strong class="subject">{{ t.section4.subject }}</strong>
                            <ul>
                                <li v-for="(policy, index) in t.section4.policies" :key="index">
                                    <span class="num">{{ policy.num }}</span>
                                    <p>{{ policy.content }}</p>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <!-- 5. 인권 고충 처리 채널 -->
                    <section class="section">
                        <strong class="title">{{ t.section5.title }}</strong>
                        <p class="desc">{{ t.section5.desc }}</p>

                        <strong class="title">{{ t.section5.processTitle }}</strong>
                        <!-- 이미지 영역 -->
                        <figure class="image_wrap">
                            <img :src="t.section5.image.src" :alt="t.section5.image.alt">
                        </figure>

                        <strong class="title">{{ t.section5.stepTitle }}</strong>
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

                        <p class="desc">{{ t.section5.desc2 }}</p>
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
    name: "gsrsu03030301",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "GS리테일 소비자권익보호 정책",
                    section1: {
                        title: '1. 제정목적',
                        desc: 'GS리테일은 고객에게 신뢰 주고 사랑받는 플랫폼이라는 고객만족 비전하에, 각 사업별 관리 지표에 따른 고객만족도 관리수행이라는 고객만족 경영목표를 가지고 있습니다. 또한, 고객만족도 관리·서비스 품질관리·자긍심함양이라는 3가지 고객만족 경영전략을 가지고 있습니다. GS리테일의 모든 임직원은 경영활동에서 발생할 수 있는 소비자 권익 보호를 위해 이로운 상품과 서비스를 제공하여 신뢰받는 GS리테일이 되고자 소비자권익보호 정책을 수립하고 실천하고 있습니다.'
                    },
                    section2: {
                        title: '2. 적용범위',
                        desc: '소비자권익보호정책의 적용 범위는 GS리테일의 상품 및 서비스를 이용하는 소비자(고객)입니다. GS리테일 임직원은 소비자 권익 보호를 위해 소비자권익보호 정책을 숙지하며, 당사와 거래하는 협력사도 본 소비자권익보호정책을 존중할 수 있도록 권장해야 합니다.'
                    },
                    section3: {
                        title: '3. 기본원칙',
                        desc: '지역사회 참여활동은 지역사회 성장을 위한 활동들로 이루어지며, 사회공헌 관련한 활동은 사회공헌파트가 주관하고 지역 특산물 관련 판로개척은 MD 및 방송사업지원팀이 담당하고 있습니다.',
                        items: [
                            { label: '1조', content: '소비자의 합리적인 소비를 위해 충분하고 정확한 정보를 제공하겠습니다.' },
                            { label: '2조', content: '소비자에게 적합한 상품과 최상의 서비스를 제공하여 고객의 편익을 증진을 위해 노력하겠습니다.' },
                            { label: '3조', content: '소비자의 권익을 침해하는 불공정 거래행위를 근절하겠습니다.' },
                            { label: '4조', content: '소비자의 개인정보는 동의절차를 거치며 그 목적에 부합하는 최소한의 정보만 수집하겠습니다.' },
                            { label: '5조', content: '소비자의 소리에 귀 기울이고 불편사항은 즉시 시정하여 최상의 상품을 제공하기 위해 노력하겠습니다.' }
                        ]
                    },
                    section4: {
                        title: '4. 소비자 권익보호 활동',
                        desc: 'GS리테일은 소비자 권익보호를 위해 다음과 같은 활동을 수행하고 있습니다.',
                        activities: [
                            { subject: '① 품질 강화', content: 'GS리테일은 품질경영체계 인증인 ISO9001을 획득하고, 제품의 안전성을 확보하기 위해 선도 및 위생점검을 비롯한 다양한 점검활동을 진행하고 있습니다.' },
                            { subject: '② 공정한 거래 지원', content: 'GS리테일은 소비자의 구매 결정과정에 이르는 전 단계에서 공정한 거래가 이루어 지도록 최선을 다하며 정확한 상품 정보를 제공합니다.' },
                            { subject: '③ 개인정보보호 및 안전', content: '소비자의 개인정보는 동의절차를 통해 목적에 맞는 최소한의 절차만 수집하며, 동의된 활용기간에 한해서만 활용 후 폐기합니다.' },
                            { subject: '④ 진심을 담은 마케팅 정책 이행', content: 'GS리테일은 ‘진심을 담은 마케팅정책’ 6가지를 수립하고 마케팅 유관부서를 대상으로 교육을 진행하고 있습니다.' }
                        ],
                        subject: '[진심을 담은 마케팅 정책]',
                        policies: [
                            { num: '1.', content: '우리는 홍보, 판매와 관련된 법령 및 소비자 권익 보호 등의 국가가 정한 방침에 근거하여 책임을 다하겠습니다.' },
                            { num: '2.', content: '우리는 상품 구매, 서비스 등 고객과 만나는 모든 과정에서 정확하고 일관된 정보를 제공하고, 이해하기 쉬운 단어를 사용합니다.' },
                            { num: '3.', content: '우리는 공정한 경쟁의 원칙을 준수하고 상품/서비스에 대한 균형 잡힌 시각을 제공할 수 있도록 하겠습니다.' },
                            { num: '4.', content: '우리는 소비자 특히 유아·아동·청소년에게 신체적 또는 심리적으로 해가 가는 마케팅을 하지 않도록 유의하겠습니다.' },
                            { num: '5.', content: '우리는 특정 계층에 편중되거나 갈등을 조장하지 않으며, 인권을 존중하는 마케팅을 하겠습니다.' },
                            { num: '6.', content: '우리는 주기적으로 마케팅 관련 부서를 대상으로 진심을 담은 마케팅 정책에 대한 교육을 실시하겠습니다.' }
                        ]
                    },
                    section5: {
                        title: '5. 소비자 권익 보호 관련 위험파악 및 피해대응',
                        desc: 'GS리테일은 내·외부 다양한 채널을 통해 소비자의 권익피해발생 위험을 파악하고 있으며, 하기의 운영 프로세스와 피해대응 절차에 따라 대응하고 있습니다. 또한, 소비자 권익피해 위험이 발생되면 위험을 완화하기 위한 개선조치를 시행하고 그 효과성 평가를 통해 지속 보완해가고 있습니다.',
                        processTitle: "VOC 운영 프로세스",
                        image: {
                            src: require("@/assets/images/dummy/smp_img04.jpg"),
                            alt: 'VOC 운영 프로세스'
                        },
                        stepTitle: "피해대응 절차",
                        steps: [
                            { id: '01', title: '1단계<br>접수', details: [] },
                            { id: '02', title: '2단계<br>접수 내용<br>고객안내', details: ['접수 내용 고객\n재확인','회신기간안내'] },
                            { id: '03', title: '3단계<br>접수 내용<br>파악/분석', details: ['접수 내용에 대해\n유관 부서 확인'] },
                            { id: '04', title: '4단계<br>피해 분석 내용<br>고객 안내', details: ['소비자기본법 기반,\n사실관계 및 원인,\n귀책 사유 등 확인'] },
                            { id: '05', title: '5단계<br>고객안내<sup>1)</sup>', details: [] }
                        ],
                        desc2: '1) GS리테일의 책임 확인 시 사업부 기준에 따른 보상조치 실시 & GS리테일의 책임 확인 불가 시, 설득 등을 통해 소비자 분쟁을 조속히 해결하기 위해 노력',
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "GS Retail Consumer Rights Protection Policy",
                    section1: {
                        title: 'Purpose of Establishment',
                        desc: 'Under its customer satisfaction vision of being a platform that earns customer trust and affection, GS Retail has set the customer satisfaction management objective of managing customer satisfaction in accordance with the management indicators of each business. In addition, GS Retail pursues three customer satisfaction management strategies: customer satisfaction management, service quality management, and cultivation of pride. To protect consumer rights and interests that may be affected in the course of business activities, all employees of GS Retail have established and implemented a consumer rights protection policy, aiming to become a trusted GS Retail by providing beneficial products and services.'/* 260604 번역 */
                    },
                    section2: {
                        title: 'Scope of Application',
                        desc: `The scope of application of the Consumer Rights Protection Policy covers consumers (customers) who use GS Retail's products and services. GS Retail executives and employees shall be familiar with the Consumer Rights Protection Policy in order to protect consumer rights, and shall encourage partner companies doing business with the Company to respect this Consumer Rights Protection Policy.`/* 260604 번역 */
                    },
                    section3: {
                        title: 'Basic Principles',
                        desc: 'Community engagement activities consist of activities for the growth of the local community. Activities related to social contribution are organized by the Social Contribution Part, and the development of sales channels related to local specialty products is handled by the MD and Broadcasting Business Support Team.'/* 260604 번역 */,
                        items: [
                            { label: 'Article 1'/* 260604 번역 */, content: 'We will provide sufficient and accurate information for the rational consumption of consumers.'/* 260604 번역 */ },
                            { label: 'Article 2'/* 260604 번역 */, content: 'We will strive to enhance customer benefits by providing products suitable for consumers and the best service.'/* 260604 번역 */ },
                            { label: 'Article 3'/* 260604 번역 */, content: 'We will eradicate unfair trade practices that infringe upon consumer rights and interests.'/* 260604 번역 */ },
                            { label: 'Article 4'/* 260604 번역 */, content: `We will collect consumers' personal information only to the minimum extent consistent with its purpose, through a consent procedure.`/* 260604 번역 */ },
                            { label: 'Article 5'/* 260604 번역 */, content: 'We will listen to the voice of consumers and immediately correct any inconveniences, striving to provide the best products.'/* 260604 번역 */ }
                        ]
                    },
                    section4: {
                        title: 'Consumer Rights Protection Activities',
                        desc: 'GS Retail carries out the following activities to protect consumer rights and interests.'/* 260604 번역 */,
                        activities: [
                            { subject: 'Quality Enhancement', content: 'GS Retail has obtained ISO 9001 quality management system certification and conducts various inspection activities, including freshness and hygiene inspections, to ensure product safety.'/* 260604 번역 */ },
                            { subject: 'Fair Trade Support', content: `GS Retail does its utmost to ensure fair transactions at every stage leading up to the consumer's purchase decision and provides accurate product information.`/* 260604 번역 */ },
                            { subject: 'Personal Data Protection and Security', content: `We collect consumers' personal information only to the minimum extent appropriate to its purpose through a consent procedure, and we use it only for the agreed-upon period of use, after which it is destroyed.`/* 260604 번역 */ },
                            { subject: 'Implementing a Sincere Marketing Policy', content: `GS Retail has established six 'Sincere Marketing Policies' and conducts training for marketing-related departments.`/* 260604 번역 */ }
                        ],
                        subject: '[Sincere Marketing Policy]',
                        policies: [
                            { num: '1.', content: 'We will fulfill our responsibilities based on the laws related to promotion and sales and the policies set by the state, such as the protection of consumer rights and interests.'/* 260604 번역 */ },
                            { num: '2.', content: 'In all processes where we meet customers, such as product purchases and services, we provide accurate and consistent information and use easy-to-understand words.'/* 260604 번역 */ },
                            { num: '3.', content: 'We will comply with the principles of fair competition and provide a balanced perspective on products/services.'/* 260604 번역 */ },
                            { num: '4.', content: 'We will take care not to engage in marketing that causes physical or psychological harm to consumers, especially infants, children, and adolescents.'/* 260604 번역 */ },
                            { num: '5.', content: 'We will conduct marketing that respects human rights, without being biased toward a particular group or fostering conflict.'/* 260604 번역 */ },
                            { num: '6.', content: 'We will periodically conduct training on sincere marketing policies for marketing-related departments.'/* 260604 번역 */ }
                        ]
                    },
                    section5: {
                        title: 'Consumer Rights Violation Risk Identification and Damage Response',
                        desc: 'GS Retail identifies the risk of harm to consumer rights and interests through various internal and external channels, and responds in accordance with the operational process and harm response procedures set out below. In addition, when a risk of harm to consumer rights and interests arises, GS Retail implements improvement measures to mitigate the risk and continuously supplements them through effectiveness evaluations.'/* 260604 번역 */,
                        processTitle: "VOC Operating Process",
                        image: {
                            src: require("@/assets/images/dummy/smp_img04.jpg"),
                            alt: 'VOC Operating Process'
                        },
                        stepTitle: "Damage Response Procedure",
                        steps: [
                            { id: '01', title: 'Step 1<br />Receipt', details: [] },
                            { id: '02', title: 'Step 2<br />Customer Notification on <br />Received Complaint', details: ['Customer\nreconfirmation of the received content'/* 260604 번역 */,'Notification of expected response time'] },
                            { id: '03', title: 'Step 3<br>Customer Notification on<br>Identification/analysis'/* 260604 번역 */, details: ['* Verification of the received complaint by the relevant department'] },
                            { id: '04', title: 'Step 4<br>Content of the damage analysis<br>Received Complaint'/* 260604 번역 */, details: ['* Verification of facts, causes, and attributable grounds based on the Consumer Protection Act'] },
                            { id: '05', title: 'Stage 5<br>Customer Information<sup>1)</sup>'/* 260604 번역 */, details: [] }
                        ],
                        desc2: `Damage Response Procedure<br />1) When GS Retail's responsibility is confirmed: implement compensation measures according to business unit standards. When GS Retail's responsibility cannot be confirmed: make efforts to promptly resolve consumer disputes through persuasion and other means.`,
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
.smp_announcement_pop .title {display:block;font-size:18px;font-weight:700;padding-bottom:20px}
.smp_announcement_pop .title_b {display:block;font-size:15px;font-weight:700;padding:25px 0 6px 0}
.smp_announcement_pop .activity_item:first-child .title_b {padding-top:0}
.smp_announcement_pop .section {padding:35px 0;border-bottom:1px solid #dfdfdf}
.smp_announcement_pop .section.first {padding-top:0}
.smp_announcement_pop .section:last-child {border-bottom:0}
.smp_announcement_pop .section .desc {font-size:15px;line-height:25px;white-space:pre-line;}
.smp_announcement_pop .section .smp_announcement>dl {display:grid;grid-template-columns:auto 1fr;gap:7px 12px;margin-top:10px;align-items:start}
.smp_announcement_pop .section .smp_announcement>dl dt {justify-self:start;background:#0072bc;border-radius:15px;color:#fff;text-align:center;min-width:42px;padding:0 8px;box-sizing:border-box;font-size:13px;line-height:19px;white-space:nowrap}
.smp_announcement_pop .section .smp_announcement>dl dd {line-height:19px;font-size:15px}
.smp_announcement_pop .section .desc + .title {padding-top:20px}
.smp_announcement_pop .image_wrap {margin:30px 0; text-align:center;}
.smp_announcement_pop .image_wrap img {width:100%; max-width:676px;}
.conti_step_list_orange {overflow:hidden; display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px}
.conti_step_list_orange>li {flex: 0 0 calc(20% - 10px);position:relative;height:232px;border:3px solid #ebebeb;border-radius:8px;text-align:center;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;white-space:pre-line;}
.conti_step_list_orange>li:after {content:"";display:inline-block;height:100%;vertical-align:middle}
.conti_step_list_orange>li .num {position:absolute;top:-3px;left:20px;padding-top:6px;font-size:16px;font-weight:700;color:#f26522;border-top:3px solid #f26522}
.conti_step_list_orange>li .txt {display:block;font-size:15px;line-height:22px;padding:38px 0 15px 0;font-weight:700}
.conti_step_list_orange>li ul.list {font-size:14px;text-align:left!important;padding-bottom:0;padding:0 11px;line-height:22px}
.sust_purc_policy_popup .dot,
.conti_step_list_orange>li ul li {position:relative;padding-left:10px;padding-top:0px}
.sust_purc_policy_popup .dot:before,
.conti_step_list_orange>li ul li:before {content:'';position:absolute;top:10px;left:0;width:4px;height:4px;border-radius:50%;background:#f26522}
.conti_step_list_orange>li:first-child:before {content:'';position:absolute;bottom:30px;left:50%;width:95px;height:95px;background:url('@/assets/images/dummy/smp_img05.jpg') no-repeat -20px -106px;transform:translateX(-50%);}
.conti_step_list_orange>li:last-child:before {content:'';position:absolute;bottom:30px;left:50%;width:95px;height:95px;background:url('@/assets/images/dummy/smp_img05.jpg') no-repeat -566px -106px;transform:translateX(-50%);}
.conti_step_list_orange>li .txt sup {font-weight:normal}
.smp_announcement_pop .inner_box {background:#f7f7f7;padding:35px 25px;margin-top:26px;}
.smp_announcement_pop .inner_box .subject{display:block;font-size:18px;font-weight:700;text-align:center;margin-bottom:30px}
.smp_announcement_pop .inner_box li{overflow:hidden;font-size:15px}
.smp_announcement_pop .inner_box li span {float:left;color:#0072bc;margin-bottom:12px;line-height:21px}
.smp_announcement_pop .inner_box li p {padding-left:18px;margin-bottom:12px;line-height:21px}

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; padding-bottom:24px;}
    .conti_step_list_orange>li {flex: 0 0 calc(50% - 10px);}
}
</style>