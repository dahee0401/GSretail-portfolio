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

                    <!-- 1. 제정목적 -->
                    <section class="section">
                        <strong class="title">{{ t.section1.title }}</strong>
                        <p class="desc">{{ t.section1.desc }}</p>
                    </section>

                    <!-- 2. 정책 방향성 -->
                    <section class="section">
                        <strong class="title">{{ t.section2.title }}</strong>
                        <p class="desc">{{ t.section2.desc }}</p>
                        <div class="smp_announcement">
                            <dl class="direction_list">
                            <template v-for="(item, index) in t.section2.items" :key="index">
                                <dt>{{ item.label }}</dt>
                                <dd>{{ item.content }}</dd>
                            </template>
                            </dl>
                        </div>
                    </section>

                    <!-- 3. 관리체계 -->
                    <section class="section">
                        <strong class="title">{{ t.section3.title }}</strong>
                        <p class="desc">{{ t.section3.desc }}</p>
                    </section>

                    <!-- 4. 주요 활동 -->
                    <section class="section">
                        <strong class="title">{{ t.section4.title }}</strong>
                        <p class="desc">{{ t.section4.desc }}</p>

                        <!-- 이미지 영역 -->
                        <figure class="image_wrap">
                            <img :src="t.section4.image.src" :alt="t.section4.image.alt">
                        </figure>

                        <!-- 활동 카드 리스트 -->
                        <div class="activity_grid">
                            <div v-for="(activity, index) in t.section4.activities" :key="index" class="activity_item">
                                <strong class="title_b">{{ activity.subject }}</strong>
                                <p class="desc">{{ activity.content }}</p>
                            </div>
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
    name: "gsrsu04010201",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "GS리테일 지역사회 참여 정책",
                    intro: 'GS리테일은 지역 경제 활성화 및 지역사회 성장 기반 마련을 목적으로 지역사회 지원 활동을 하고 있습니다. 특히 유통업의 특성을 살린 다양한 판로 지원 활동을 통해 상생의 문화를 만들어 나가는 중입니다.',
                    section1: {
                        title: '1. 제정목적',
                        desc: 'GS리테일은 기업의 사회적책임을 다하고자 사회공헌 활동을 비롯해 지역사회를 대상으로한 참여활동을 전개하고자 합니다. 또한, 이러한 활동에 있어 고객의 동참을 이끌어내 선한 영향력을 확산하기위해 노력합니다. 사회에 긍정적인 변화를 가져오기 위해서는 GS리테일 뿐만 아니라, 고객, 임직원이 함께 노력해야 하기 때문입니다. 따라서 함께 지역사회에 공헌할 수 있는 기회를 꾸준히 마련하고자 합니다. 미래세대 투자를 고려한 프로그램을 개발할 것입니다. 미래세대는 지속가능한 사회를 만들어가야 하는 주요한 이유 중 하나입니다. 미래세대에게 필요한 지역사회 참여프로그램 발굴함으로써 지역사회의 건강한 미래를 위해 힘쓸 것입니다.'
                    },
                    section2: {
                        title: '2. 정책 방향성',
                        desc: '지역사회 참여 정책의 방향성은 다음과 같습니다.',
                        items: [
                            { label: '하나', content: '지역사회와의 연계활동을 통한 협력모델 구현입니다. 지역 스타트업과의 제품 개발, 상품 입점 지원 등을 통해 함께 성장하는 사업 모델을 확대하고자 합니다.' },
                            { label: '둘', content: '지역 중소기업, 지역 전통시장, 스타트업 등 다양한 이해 관계자들과의 관계 강화입니다. 우리 사회의 다양한 이해관계자들과 건강한 관계를 유지하고 적극적인 교류를 이어 나가 함께 지역경제 활성화를 추진하고자 노력할 것입니다.' },
                            { label: '셋', content: '지역사회의 중요 이슈 해결 지원입니다. 지역사회의 구성원으로서 우리가 당면한 문제를 해결하기 위해 함께 해결책을 모색하고 적극적으로 지원하고자 합니다.' }
                        ]
                    },
                    section3: {
                        title: '3. 지역사회 참여정책 관리체계',
                        desc: '지역사회 참여활동은 지역사회 성장을 위한 활동들로 이루어지며, 사회공헌 관련한 활동은 사회공헌파트가 주관하고 지역 특산물 관련 판로개척은 MD 및 방송사업지원팀이 담당하고 있습니다.'
                    },
                    section4: {
                        title: '4. 지역사회 참여정책 관련 주요 활동',
                        desc: 'GS리테일은 지역사회가 가지고 있는 고민들에 공감하고 이를 해결하기 위해 꾸준히 지원하고 있습니다. GS리테일이 가지고 있는 유통경쟁력을 바탕으로 지역사회의 성장을 위한 선순환고리를 구축해 나가는 중입니다. 지역사회 관련 주요 활동은 아래와 같습니다.',
                        image: {
                            src: require("@/assets/images/dummy/gsrsu03010104_diagram.png"),
                            alt: '지역사회 참여정책 관련 주요 활동'
                        },
                        activities: [
                            { subject: '지역 관광 상품 발굴', content: 'GS리테일은 지역과 관련된 국내 여행 상품을 개발하고 홈쇼핑을 통해 방송 판매하였습니다. 기존 지역 관광 상품 다변화뿐만 아니라 연 1~2개 신규 상품 개발을 목표로 진행하고 있습니다. 또한, 지역 농협 및 전통시장과 연계하여 지역 축제-먹거리-체험-지역 농협∙전통시장 방문 등 코스의 다양화도 추진하고 있습니다.' },
                            { subject: '지역 연계 먹거리 상품 발굴', content: 'GS리테일은 지자체와 업무협약을 체결해 대표 먹거리 상품 발굴 사업을 추진하고, 상품 출시는 물론 지자체와의 연계를 강화하여 다양한 지원을 통한 지역사회 성장에 기여하고 있습니다.' },
                            { subject: '지역사회 긴급 재난지원', content: 'GS리테일은 자연재해 등의 피해 지역주민을 대상으로 긴급 재난 지원 활동을 매년 진행해 지역의 이재민에게 긴급 물품 등을 지원하였습니다.' },
                            { subject: '지역 협동조합 연계 등으로 농축수산물 유통활성화', content: 'GS리테일은 기존 농협, 수협, 영농조합외에 지역 협동조합‧기획재정부와 상품 판로 지원 협약을 맺고 지역 특산물을 브랜드화하여 육성하고 있습니다.' },
                            { subject: '중소기업 홈쇼핑 방송을 통한 유통판로 확대', content: 'GS리테일은 상대적으로 판로 기회가 적은 지역 중소기업에게 ‘전국 중소기업 특별전’이란 프로그램을 개설하여 유통 판로 확대를 지원했습니다. 해당 프로그램은 판매수수료가 없는 무료 판매 방송이었으며, 수도권을 제외한 지역 중소기업 공산품, 특산품 위주로 구성하였습니다. 또한, 지방 특산물을 브랜드화하여 성장을 지원하였습니다.' }
                        ]
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "GS Retail Community Engagement Policy",
                    intro: 'GS Retail carries out community support activities with the aim of revitalizing the local economy and laying the foundation for community growth. In particular, we are building a culture of mutual growth through various sales channel support activities that leverage the characteristics of the distribution industry.'/* 260604 번역 */,
                    section1: {
                        title: 'Purpose of Establishment',
                        desc: 'To fulfill its corporate social responsibility, GS Retail seeks to carry out community engagement activities, including social contribution initiatives. We also strive to encourage customer participation in these activities to spread positive influence. This is because bringing about positive change in society requires the joint efforts of not only GS Retail but also our customers and employees. Therefore, we aim to continuously create opportunities to contribute to local communities together. We will develop programs that take investment in future generations into account. Future generations are one of the key reasons we must build a sustainable society. By identifying community engagement programs needed by future generations, we will work toward a healthy future for local communities.'/* 260604 번역 */
                    },
                    section2: {
                        title: 'Policy Direction',
                        desc: 'The directions of the Community Engagement Policy are as follows:',
                        items: [
                            { label: 'One'/* 260604 번역 */, content: 'This is the implementation of a cooperation model through linkage activities with the local community. Through product development with local startups, support for product placement, and the like, we seek to expand a business model that grows together.'/* 260604 번역 */ },
                            { label: 'Two'/* 260604 번역 */, content: 'This is the strengthening of relationships with various stakeholders such as local small and medium-sized enterprises, local traditional markets, and startups. We will strive to maintain healthy relationships with the various stakeholders of our society and to continue active exchange, so as to promote the revitalization of the local economy together.'/* 260604 번역 */ },
                            { label: 'Three'/* 260604 번역 */, content: 'This is support for resolving important issues in the local community. As members of the local community, we seek solutions together and actively provide support in order to resolve the problems we face.'/* 260604 번역 */ }
                        ]
                    },
                    section3: {
                        title: 'Community Engagement Policy Governance',
                        desc: 'Community engagement activities consist of activities for the growth of the local community. Activities related to social contribution are organized by the Social Contribution Part, and the development of sales channels related to local specialty products is handled by the MD and Broadcasting Business Support Team.'/* 260604 번역 */
                    },
                    section4: {
                        title: 'Key Activities Related to Community Engagement Policy',
                        desc: 'GS Retail empathizes with the concerns of local communities and provides continuous support to address them. Leveraging its distribution competitiveness, GS Retail is building a virtuous cycle for community growth. The main community-related activities are as follows.'/* 260604 번역 */,
                        image: {
                            src: require("@/assets/images/dummy/gsrsu03010104_diagram.png"),
                            alt: 'Key Activities Related to Community Engagement Policy'
                        },
                        activities: [
                            { subject: 'Local Tourism Product Development', content: 'GS Retail has developed domestic travel products connected to local regions and sold them via home shopping broadcasts. We aim not only to diversify existing regional tourism products but also to develop one to two new products each year. In addition, in partnership with regional agricultural cooperatives and traditional markets, we are diversifying course offerings, including local festivals, food, hands-on experiences, and visits to regional agricultural cooperatives and traditional markets.'/* 260604 번역 */ },
                            { subject: 'Local Food Product Development', content: 'GS Retail signs business agreements with local governments to pursue projects that discover signature food products, and contributes to community growth through various forms of support by launching products and strengthening collaboration with local governments.'/* 260604 번역 */ },
                            { subject: 'Emergency Community Disaster Relief', content: 'GS Retail conducts emergency disaster relief activities every year for residents affected by natural disasters and other calamities, providing emergency supplies and other assistance to local disaster victims.'/* 260604 번역 */ },
                            { subject: 'Revitalizing Agricultural, Livestock, and Fishery Distribution through Local Cooperative Partnerships', content: 'In addition to existing partnerships with the National Agricultural Cooperative Federation, the National Federation of Fisheries Cooperatives, and farming associations, GS Retail has signed product sales support agreements with regional cooperatives and the Ministry of Economy and Finance to brand and nurture regional specialty products.'/* 260604 번역 */ },
                            { subject: 'Expanding Distribution Channels through SME Home Shopping Broadcasts', content: `GS Retail launched a program called the 'National Small and Medium-Sized Enterprise Special Exhibition' to support the expansion of distribution channels for regional small and medium-sized enterprises that have relatively limited sales opportunities. This program consisted of free sales broadcasts with no sales commission and was organized primarily around manufactured goods and specialty products from regional SMEs outside the Seoul metropolitan area. In addition, GS Retail supported growth by branding regional specialty products.`/* 260604 번역 */ }
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
.smp_announcement_pop .title_b {display:block;font-size:15px;font-weight:700;padding:25px 0 6px 0}
.smp_announcement_pop .section {padding:35px 0;border-bottom:1px solid #dfdfdf}
.smp_announcement_pop .section:last-child {border-bottom:0}
.smp_announcement_pop .section .desc {font-size:15px;line-height:25px}
.smp_announcement_pop .section .smp_announcement>dl {display:grid;grid-template-columns:auto 1fr;gap:7px 12px;margin-top:10px;align-items:start}
.smp_announcement_pop .section .smp_announcement>dl dt {justify-self:start;background:#0072bc;border-radius:15px;color:#fff;text-align:center;min-width:42px;padding:0 8px;box-sizing:border-box;font-size:13px;line-height:19px;white-space:nowrap}
.smp_announcement_pop .section .smp_announcement>dl dd {line-height:19px;font-size:15px}
.smp_announcement_pop .image_wrap {margin:30px 0}
.smp_announcement_pop .image_wrap img {width:100%}

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; padding-bottom:24px;}
}
</style>