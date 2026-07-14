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
                        <div class="activity_grid">
                            <div v-for="(activity, index) in t.section3.activities" :key="index" class="activity_item">
                                <strong class="title_b">{{ activity.subject }}</strong>
                                <p class="desc">{{ activity.content }}</p>
                            </div>
                        </div>
                    </section>

                    <!-- 4. 인권위험실사 프로세스 -->
                    <section class="section">
                        <strong class="title">{{ t.section4.title }}</strong>
                        <p class="desc">{{ t.section4.desc }}</p>

                        <strong class="title">{{ t.section4.processTitle }}</strong>
                        <ul class="conti_step_list_orange">
                            <li v-for="(step, index) in t.section4.steps" :key="index">
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

                    <!-- 5. 인권 고충 처리 채널 -->
                    <section class="section">
                        <strong class="title">{{ t.section5.title }}</strong>
                        <p class="desc">{{ t.section5.desc }}</p>
                        <p class="desc">{{ t.section5.desc2 }}</p>

                        <!-- 이미지 영역 -->
                        <figure class="image_wrap">
                            <img :src="t.section5.image.src" :alt="t.section5.image.alt">
                        </figure>
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
    name: "gsrsu03030101",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "GS리테일 인권경영 정책",
                    section1: {
                        title: '1. 제정목적',
                        desc: 'GS리테일은 인권을 존중하며 인간으로서의 가치와 존엄성을 보장하고, 인권관련한 리스크를 발견하고 이를 방지하기 위해 본 인권경영정책을 선언합니다.\nGS리테일은 세계인권선언(Universal Declaration of Human Rights)과 UNGC 10대 원칙(UN Global Compact), 그리고 국내외 노동 및 인권 관련 표준과 가이드라인을 지지하고 준수하여 회사의 경영활동에서 발생할 수 있는 모든 인권 관련 문제에 대한 방지와 해결을 위해 최선의 노력을 다하겠습니다.'
                    },
                    section2: {
                        title: '2. 적용범위',
                        desc: '인권경영정책의 적용 범위는 GS리테일의 임직원이며, 관계기업의 모든 임직원을 포함합니다. GS리테일 임직원은 상품/서비스/경영활동을 통해 접하는 모든 이해관계자들을 대할 때에도 본 인권경영정책을 따르며, 당사와 거래하는 협력사도 본 인권경영정책을 존중할 수 있도록 권장해야 합니다.'
                    },
                    section3: {
                        title: '3. 기본원칙',
                        desc: '지역사회 참여활동은 지역사회 성장을 위한 활동들로 이루어지며, 사회공헌 관련한 활동은 사회공헌파트가 주관하고 지역 특산물 관련 판로개척은 MD 및 방송사업지원팀이 담당하고 있습니다.',
                        activities: [
                            { subject: '1조. 강제노동 금지', content: '임직원의 자유의사에 반하는 모든 종류의 강제노동(채무노동, 노예노동 등)을 금지한다.' },
                            { subject: '2조. 아동노동 금지', content: '국가별 노동 관련 법규에서 정한 최저 고용 연령을 준수하며, 아동 노동을 원칙적으로 금지한다. 또한, 만 18세 미만의 청소년 고용 시 안전보건 상 유해한 업무를 부여하지 않는다.' },
                            { subject: '3조. 차별 금지', content: '인종, 국적, 성별, 나이, 장애, 종교, 임신, 노조가입 여부, 결혼여부, 성적지향, 사회적 신분 등의 이유로 채용, 보상, 승진, 교육, 임금 등에 있어 차별하지 않는다.' },
                            { subject: '4조. 결사의 자유 보장', content: '회사와 모든 근로자 간의 자유로운 의사소통 기회를 제공하고 나아가 결사의 자유를 보장한다. 또한 노동조합 가입 및 결성 등을 이유로 해당 근로자에게 불이익을 주지 않는다.' },
                            { subject: '5조. 근로조건 준수', content: '국가별 노동 관련 법규에서 명시한 최저임금, 초과 근로수당 지급, 사회보험 가입, 휴식/휴가 등을 준수하며 모든 임직원의 삶의 질과 근로조건 향상을 위해 최선을 다한다.' },
                            { subject: '6조. 보건 및 산업안전 보장', content: '임직원에게 안전하고 청결한 근무환경을 제공하고 이를 정기적으로 점검하며 관리한다. 임직원의 근로 중 발생할 수 있는 신체적/정신적 리스크에 대한 선제적 예방조치 실시 등 안전사고 예방을 위해 노력한다.' }
                        ]
                    },
                    section4: {
                        title: '4. 인권위험실사 프로세스',
                        desc: '인권관련한 위험을 식별하고 완화조치를 시행하기 위해 매년 1회 정기적으로 인권영향평가를 실시하고 있으며, 해당 평가는 인사총무본부의 ER팀 및 홈쇼핑BP팀에서 실행하고 있습니다. 인권위험실사 프로세스는 평가대상 선정> 인권위험 항목을 식별> 위험 평가 및 개선 등 완화조치> 모니터링 실시 순으로 진행됩니다. 또한, 모니터링 이후 개선의 효과성 평가까지 이루어질 수 있도록 하고 있습니다.\n이외, 상시로 인권위험을 파악하고 개선할 수 있도록 홈페이지를 통한 인권관련 고충을 익명을 통해 수시로 접수할 수 있으며 이 과정에서 실질적인 위험이 발견되면 현장실사를 진행하고 이를 완화할 수 있는 조치를 적절히 시행하고 있습니다.',
                        steps: [
                            { id: '01', title: '1단계<br>평가대상 선정', details: ['인권관련 취약 대상 등\n평가대상 선정'] },
                            { id: '02', title: '2단계<br>인권위험 식별', details: ['이해관계자별 인권 위험 리스크 식별'] },
                            { id: '03', title: '3단계<br>위험 평가 및 실사', details: ['임직원 대상 평가 연1회','상시 접수채널을 통한 위험파악','위험에 대한 현장실사','완화조치'] },
                            { id: '04', title: '4단계<br>모니터링', details: ['평가 외 전 임직원대상 모니터링 설문 진행', '완화조치에 대한 효과성 평가'] }
                        ]
                    },
                    section5: {
                        title: '5.인권 고충 처리 채널',
                        desc: '홈페이지 內 정도경영 목소리, CEO에게말한다 및 사내 익명접수 채널(동수, 아리)을 통해 상시로 인권관련 고충을 접수 받고 있으며, 제보 대상 항목을 홈페이지를 통해 공개하고 있습니다. 인권 고충 접수는 익명으로 제보 가능하며, 제보자의 신분누설 및 색출행위를 금지하고 해당 불이익 조치를 행한 임직원에 대해서는 전사 윤리위원회에 상정하여 제보자를 보호하고 있습니다.',
                        desc2: '인권 고충 처리는 아래의 프로세스로 진행되고 있으며, 특히 직장 내 괴롭힘·성희롱 건에 대해서는 접수 즉시 CEO직접 보고 및 위기대응 협의체(커뮤니케이션팀, 법무팀, 조직문화서비스팀)에 내용을 전달하고 조직문화서비스팀을 통해 사실 확인을 진행하고 있습니다. 이후 윤리위원회를 통해 징계여부를 결정하며, 이러한 사항이 발생되지 않도록 임직원 대상 연1회 교육도 실행하고 있습니다.',
                        processTitle: "인권 고충 처리 프로세스",
                        image: {
                            src: require("@/assets/images/dummy/human_mana_pop_img02.jpg"),
                            alt: '인권 고충 처리 프로세스'
                        }
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "GS Retail Human Rights Management Policy",
                    section1: {
                        title: 'Purpose of Establishment',
                        desc: `GS Retail respects human rights, guarantees human value and dignity, and declares this Human Rights Management Policy to identify and prevent human rights-related risks.\nGS Retail supports and complies with the Universal Declaration of Human Rights, the Ten Principles of the UN Global Compact (UNGC), and domestic and international labor and human rights standards and guidelines, and will make every effort to prevent and resolve all human rights-related issues that may arise in the Company's business activities.`/* 260604 번역 */
                    },
                    section2: {
                        title: 'Scope of Application',
                        desc: 'The scope of application of the Human Rights Management Policy covers the executives and employees of GS Retail and includes all executives and employees of affiliated companies. GS Retail executives and employees shall follow this Human Rights Management Policy when dealing with all stakeholders they encounter through products, services, and management activities, and shall encourage partner companies doing business with the Company to respect this Human Rights Management Policy.'/* 260604 번역 */
                    },
                    section3: {
                        title: 'Basic Principles',
                        desc: 'Community engagement activities consist of activities for the growth of the local community. Activities related to social contribution are organized by the Social Contribution Part, and the development of sales channels related to local specialty products is handled by the MD and Broadcasting Business Support Team.'/* 260604 번역 */,
                        activities: [
                            { subject: 'Article 1. Prohibition of Forced Labor', content: 'All types of forced labor (debt bondage, slave labor, etc.) against the free will of executives and employees are prohibited.'/* 260604 번역 */ },
                            { subject: 'Article 2. Prohibition of Child Labor', content: `We comply with the minimum employment age set by each country's labor-related laws and regulations and prohibit child labor as a general rule. In addition, when employing adolescents under the age of 18, we do not assign work that is hazardous to safety and health.`/* 260604 번역 */ },
                            { subject: 'Article 3. Prohibition of Discrimination', content: 'We do not discriminate in recruitment, compensation, promotion, training, wages, and the like on the grounds of race, nationality, gender, age, disability, religion, pregnancy, union membership, marital status, sexual orientation, social status, or the like.'/* 260604 번역 */ },
                            { subject: 'Article 4. Guarantee of Freedom of Association', content: 'We provide opportunities for free communication between the company and all workers, and furthermore guarantee freedom of association. In addition, we do not impose any disadvantage on workers on the grounds of joining or forming a labor union, or the like.'/* 260604 번역 */ },
                            { subject: 'Article 5. Compliance with Working Conditions', content: `We comply with the minimum wage, payment of overtime allowances, enrollment in social insurance, and rest/leave specified in each country's labor-related laws and regulations, and do our utmost to improve the quality of life and working conditions of all employees.`/* 260604 번역 */ },
                            { subject: 'Article 6. Guarantee of Health and Occupational Safety', content: `We provide executives and employees with a safe and clean working environment, and we inspect and manage it regularly. We strive to prevent safety accidents, including by implementing preemptive preventive measures against physical and mental risks that may arise during executives' and employees' work.`/* 260604 번역 */ }
                        ]
                    },
                    section4: {
                        title: 'Human Rights Risk Due Diligence Process',
                        desc: 'To identify human rights-related risks and implement mitigation measures, we conduct a human rights impact assessment regularly once a year, and this assessment is carried out by the ER Team and the Home Shopping BP Team of the HR and General Affairs Division. The human rights risk due diligence process proceeds in the following order: selection of assessment targets > identification of human rights risk items > risk assessment and mitigation measures such as improvement > monitoring. In addition, we ensure that an evaluation of the effectiveness of improvements is conducted following monitoring.\nApart from this, in order to identify and improve human rights risks at all times, human rights-related grievances can be submitted anonymously at any time through the website, and where an actual risk is found in this process, on-site due diligence is conducted and appropriate measures to mitigate it are implemented.'/* 260604 번역 */,
                        steps: [
                            { id: '01', title: 'Step 1<br>Selection of Assessment Targets', details: ['Human rights-related vulnerable groups, etc.\nSelection of Assessment Targets'/* 260604 번역 */] },
                            { id: '02', title: 'Step 2<br>Identification of human rights risks'/* 260604 번역 */, details: ['Identification of human rights risks by stakeholder'/* 260604 번역 */] },
                            { id: '03', title: 'Step 3<br>Risk Assessment and Due Diligence', details: ['Annual assessment of employees','Risk identification through ongoing reporting channels','On-site due diligence for identified risks','Mitigation measures'] },
                            { id: '04', title: 'Step 4<br>Monitoring', details: ['In addition to the assessment, a monitoring survey is conducted for all executives and employees'/* 260604 번역 */, 'Evaluation of the effectiveness of mitigation measures'/* 260604 번역 */] }
                        ]
                    },
                    section5: {
                        title: '5. Human Rights Grievance Processing Channels',
                        desc: `We receive human rights-related grievances at all times through the Integrity Management Voice and Speak to the CEO sections within the website and the internal anonymous reporting channels (Dongsu, Ari), and we disclose the items subject to reporting through the website. Human rights grievances can be reported anonymously, and the disclosure of a whistleblower's identity and acts of seeking them out are prohibited; executives and employees who take such disadvantageous measures are referred to the company-wide Ethics Committee, thereby protecting whistleblowers.`/* 260604 번역 */,
                        desc2: 'Human rights grievances are handled through the process below. In particular, for cases of workplace harassment and sexual harassment, upon receipt, the matter is immediately reported directly to the CEO and conveyed to the crisis response council (Communication Team, Legal Team, Organizational Culture Service Team), and fact-finding is conducted through the Organizational Culture Service Team. Thereafter, the Ethics Committee determines whether to impose disciplinary action, and to prevent such matters from occurring, training is also conducted once a year for executives and employees.'/* 260604 번역 */,
                        processTitle: "Human Rights Grievance Handling Process",
                        image: {
                            src: require("@/assets/images/dummy/human_mana_pop_img02.jpg"),
                            alt: 'Human Rights Grievance Handling Process'
                        }
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
.smp_announcement_pop .section .smp_announcement>dl {overflow:hidden;}
.smp_announcement_pop .section .smp_announcement>dl dt {display:block;font-size:15px;font-weight:700;padding-bottom:6px}
.smp_announcement_pop .section .smp_announcement>dl dd {line-height:19px;font-size:15px}
.smp_announcement_pop .section .smp_announcement>dl dd + dt {padding-top:20px}
.smp_announcement_pop .section .desc + .desc {padding-top:20px}
.smp_announcement_pop .image_wrap {margin:30px 0; text-align:center;}
.smp_announcement_pop .image_wrap img {width:100%; max-width:676px;}
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
    .conti_step_list_orange>li {flex: 0 0 calc(50% - 10px);}
}
</style>