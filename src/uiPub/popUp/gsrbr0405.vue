<template>
    <div class="modal_cont fridge_modal">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <section v-if="t.CaseSteps?.length" class="discount_section">
                <div>
                    <h4 v-html="t.CaseTitle"></h4>
                </div>
                <ul class="how_to_list">
                    <li v-for="(step, idx) in t.CaseSteps" :key="idx">
                        <div class="card_tit">
                            <span class="num">{{ step.num }}</span>
                            <strong v-html="step.text"></strong>
                        </div>
                        <figure>
                            <img :src="isMobile ? step.imgMo : step.img" :alt="step.num">
                        </figure>
                        <p v-if="step.desc" class="txt_sub" v-html="step.desc"></p>
                        <p v-if="step.notice" class="txt_sub txt_notice" v-html="step.notice"></p>
                    </li>
                </ul>
            </section>

            <section v-if="t.TipSteps?.length" class="discount_section">
                <div>
                    <h4>{{ t.TipSectionTitle }}</h4>
                </div>
                <ul class="how_to_list">
                    <li v-for="(step, idx) in t.TipSteps" :key="idx">
                        <div class="card_tit">
                            <span class="num">{{ step.num }}</span>
                            <strong v-html="step.text"></strong>
                        </div>
                        <figure>
                            <img :src="isMobile ? step.imgMo : step.img" :alt="step.num">
                        </figure>
                        <p v-if="step.desc" class="txt_sub" v-html="step.desc"></p>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "gsrbr0405",
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            isMobile: false,
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "나만의 냉장고",
                    CaseTitle: "나만의 냉장고 100% 활용법",
                    CaseSteps: [
                        {
                            num: "CASE 01",
                            text: "+1 혜택은 받고 싶고<br />한번에 필요하지 않을 때",
                            desc: "1+1, 2+1 상품 결제 후 지금 필요한<br /><strong>하나'만 가져가고 나머지는 냉장고 보관!</strong>",
                            img: require("@/assets/images/dummy/gsrbr0405_01.png"),
                            imgMo: require("@/assets/images/dummy/mo/gsrbr0405_01_mo.png"),
                        },
                        {
                            num: "CASE 02",
                            text: "재고가 부족해도<br />OK!",
                            desc: "점포에 재고가 하나만 있어도 OK!<br /><strong>부족한 수량은 냉장고에 저장하고 재고가 있는 가까운 점포에서 꺼내기!</strong>",
                            notice: "*나만의 냉장고 보관은 구매품 최소 1개 수령 후 나머지 상품 보관 가능해요.",
                            img: require("@/assets/images/dummy/gsrbr0405_02.png"),
                            imgMo: require("@/assets/images/dummy/mo/gsrbr0405_02_mo.png"),
                        },
                    ],
                    TipSectionTitle: "더 편리하게 이용하는 꿀팁",
                    TipSteps: [
                        {
                            num: "TIP 01",
                            text: "GS25 배달/픽업<br />주문시에도 가능해요",
                            desc: "1+1, 2+1 상품을 담고 주문할 때<br /><strong>증정품 선택에서 '보관하기'</strong>하면 냉장고로 쏙~>",
                            img: require("@/assets/images/dummy/gsrbr0405_03.png"),
                            imgMo: require("@/assets/images/dummy/mo/gsrbr0405_03_mo.png"),
                        },
                        {
                            num: "TIP 02",
                            text: "보관 상품으로<br />마음을 전해요",
                            desc: "나만의 냉장고 <strong>보관 중인 상품은 선물하기도 가능!</strong><br />따뜻한 메시지와 함께 마음을 전해요",
                            img: require("@/assets/images/dummy/gsrbr0405_04.png"),
                            imgMo: require("@/assets/images/dummy/mo/gsrbr0405_04_mo.png"),
                        },
                    ],
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "My Refrigerator",
                    CaseTitle: "From storing free gifts to gifting them",
                    CaseDesc: "100% My Fridge utilization tips",
                    CaseSubDesc: "*You can store remaining items in My Fridge only after picking up at least one purchased item.",
                    CaseSteps: [
                        {
                            num: "CASE 01",
                            text: "When you want the +1 benefit<br />but do not need everything at once",
                            desc: "After paying for 1+1 or 2+1 items,<br />take only what you need now and store the rest in My Fridge!",
                            img: require("@/assets/images/dummy/gsrbr0405_01.png"),
                            imgMo: require("@/assets/images/dummy/mo/gsrbr0405_01_mo.png"),
                        },
                        {
                            num: "CASE 02",
                            text: "Low stock?<br />OK!",
                            desc: "Even if a store has only one item in stock,<br />store the rest in My Fridge and pick them up at a nearby store with inventory!",
                            notice: "*You can store remaining items in My Fridge only after picking up at least one purchased item.",
                            img: require("@/assets/images/dummy/gsrbr0405_02.png"),
                            imgMo: require("@/assets/images/dummy/mo/gsrbr0405_02_mo.png"),
                        },
                    ],
                    /* 26.07.03 add 정다희 : Figma 943:10098 — TIP section EN */
                    TipSectionTitle: "Tips for more convenient use",
                    TipSteps: [
                        {
                            num: "TIP 01",
                            text: "Available for GS25<br />delivery and pickup orders too",
                            desc: "When adding 1+1 or 2+1 items to your order,<br />select 'Store' for free gifts and they go straight into My Fridge!",
                            img: require("@/assets/images/dummy/gsrbr0405_03.png"),
                            imgMo: require("@/assets/images/dummy/mo/gsrbr0405_03_mo.png"),
                        },
                        {
                            num: "TIP 02",
                            text: "Share your heart<br />with stored items",
                            desc: "Items stored in My Fridge can be gifted too!<br />Send a warm message along with your gift.",
                            img: require("@/assets/images/dummy/gsrbr0405_04.png"),
                            imgMo: require("@/assets/images/dummy/mo/gsrbr0405_04_mo.png"),
                        },
                    ],
                }
            }
        };
    },
    computed: {
        t() { return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko; }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener("resize", this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkMobile);
    },
    methods: {
        checkMobile() { this.isMobile = window.innerWidth < 768; },
        closeModal(event) { modal.close(event.currentTarget); },
    }
};
</script>

<style scoped>
:deep(.p_br) { display: block; }
:deep(.m_br) { display: none; }

.modal_content { flex: 1; overflow-y: auto; }
section + section{margin-top : 80px;}
section h4 + p { margin-top: 8px; font-weight: 700; font-size: 1.8rem; line-height: 1.5; }
section p.txt_sub { margin-top: 8px; color: #161616; font-weight: 400; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
section p.txt_notice { color: #fb6432; font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }

.how_to_list { margin-top: 40px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.how_to_list > li { padding: 32px; background-color: #f8f8f8; border-radius: 12px; overflow: hidden; }
.how_to_list .card_tit > span.num { margin-bottom: 6px; color: #107af2; font-size: 1.6rem; font-weight: 700; line-height: 1.24; display: block; }
.how_to_list .card_tit > strong { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.24; display: block; }
.how_to_list > li p.txt_sub { margin-top: 20px; }
.how_to_list > li p.txt_sub :deep(strong) { font-weight: 700; line-height: 1.24; display: inline-block;}
.discount_section:nth-child(2) .how_to_list > li p.txt_sub { margin-top: 40px; }
.how_to_list > li p.txt_sub + p{margin-top : 12px;}
.how_to_list > li > figure { width: 100%; margin-top: 40px; }
.how_to_list > li > figure > img { width: 100%; height: auto; object-fit: cover; display:block;}

@media screen and (max-width: 768px) {
    :deep(.p_br) { display: none; }
    :deep(.m_br) { display: inline; }
    .modal_content { padding-bottom: 100px; }
    section + section{ margin-top : 60px; }
    .how_to_list { margin-top:24px; grid-template-columns: 1fr; }

}
</style>
