<template>
    <div class="modal_cont delivery_modal">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <section class="tip_section">
                <h3 v-html="t.TipTitle"></h3>
                <ul>
                    <li v-for="(tip, idx) in t.Tips" :key="idx">
                        <p v-html="tip.text"></p>
                    </li>
                </ul>
            </section>

            <section class="brand_intro_section">
                <div>
                    <h4>GS25</h4>
                    <p>{{ t.Gs25Title }}</p>
                    <p>{{ t.Gs25Desc }}</p>
                </div>
                <ul class="product_category">
                    <li v-for="(item, idx) in t.Gs25Categories" :key="idx">
                        <figure><img :src="item.img" :alt="item.name"></figure>
                        <span>{{ item.name }}</span>
                    </li>
                </ul>
                <div class="notice_bar">
                    <p>{{ t.NoticeTxt }}</p>
                </div>
            </section>

            <section class="child_food_section">
                <div>
                    <h4>{{ t.ChildFoodTitle }}</h4>
                    <div>
                        <p v-html="t.ChildFoodDesc"></p>
                        <p>{{ t.ChildFoodNotice }}</p>
                    </div>
                </div>

                <div class="accordion_container">
                    <Accordion>
                        <AccordionItem item-key="child-food-how-to">
                            <template #title>{{ t.AccTitle }}</template>
                            <ul class="how_to_grid">
                                <li v-for="(step, idx) in t.Steps" :key="idx">
                                    <div class="card_tit">
                                        <span class="num">{{ step.num }}</span>
                                        <strong v-html="step.text"></strong>
                                    </div>
                                    <figure><img :src="step.img" alt="step image"></figure>
                                </li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem item-key="child-food-receive">
                            <template #title>{{ t.AccTitle_2 }}</template>
                            <div class="receive_info">
                                <p>{{ t.pickupNotice }}</p>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            <section class="brand_intro_section">
                <div>
                    <h4>GS THE FRESH</h4>
                    <p>{{ t.FreshTitle }}</p>
                    <p>{{ t.FreshDesc }}</p>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Accordion from "@/components/Accordion.vue";
import AccordionItem from "@/components/AccordionItem.vue";

export default {
    name: "gsrbr0401",
    components: {
        Accordion,
        AccordionItem
    },
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            isMobile: false,
            langData: {
                ko: {
                    closeLabel: "닫기",
                    pickupNotice: "주문하신 상품은 선택하신 GS25 매장에서 아동급식카드 실물 또는 모바일 앱 바코드를 제시하여 수령하실 수 있습니다.",
                    MainTitle: "배달·픽업",
                    TipTitle: "우리동네GS<br/> 배달·픽업 활용 팁",
                    Tips: [
                        { text: "KT, LGU+<br/>통신사 할인" },
                        { text: "GS ALL 포인트<br/> 적립/사용" },
                        { text: "GS Pay만의<br/> 할인/증정 혜택" },
                        { text: "모바일 팝 결제시<br/> 추가 할인" },
                        { text: "1+1, 2+1 등<br/> 다양한 행사" },
                        { text: "우리동네GS 앱 전용<br/> 추가 할인쿠폰" }
                    ],
                    Gs25Title: "도시락, 샌드위치 등 먹거리 상품을 원하는 시간, 원하는 점포에서 찾아가기",
                    Gs25Desc: "우리동네GS 앱에서 원하는 매장, 원하는 시간에 수령해갈 수 있는 사전예약 서비스",
                    Gs25Categories: [
                        { name: "도시락/김밥", img: require("@/assets/images/dummy/gsrbr0401_food1.png") },
                        { name: "햄버거", img: require("@/assets/images/dummy/gsrbr0401_food2.png") },
                        { name: "샌드위치", img: require("@/assets/images/dummy/gsrbr0401_food3.png") },
                        { name: "조리면", img: require("@/assets/images/dummy/gsrbr0401_food4.png") },
                        { name: "요리/반찬", img: require("@/assets/images/dummy/gsrbr0401_food5.png") },
                        { name: "샐러드", img: require("@/assets/images/dummy/gsrbr0401_food6.png") }
                    ],
                    NoticeTxt: "사전예약 기획전 택배 배송 행사도 발 빠르게 확인하세요!",
                    ChildFoodTitle: "아동급식 사전예약",
                    ChildFoodDesc: "우리동네GS 앱에서 '아동급식카드'로 사전예약 매장수령 결제 시 20%할인된 가로 구매 가능한 서비스입니다. 만 18세 미만 아동/청소년 이용 가능한 서비스로 아래 지자체에서 아동급 식카드를 제공받은 대상자라면 누구나 이용 가능합니다.",
                    ChildFoodNotice: "* 신한카드 대행 지자체 : 서울특별시, 인천광역시, 부산광역시, 춘천시, 원주시, 속초시\n* 농협은행 대행 지자체 : 경기도, 경상북도, 경상남도, 충청북도, 충청남도, 대전광역시, 울산광역시, 제주특별자치도",
                    AccTitle: "아동급식 사전예약 이용방법",
                    Steps: [
                        { num: "01", text: "우리동네GS 접속 후<br/>'아동급식' 아이콘 선택", img: require("@/assets/images/dummy/gsrbr0401_1.png") },
                        { num: "02", text: "소지한 아동급식카드 지역의 GS25 매장을<br/>수령매장으로 설정", img: require("@/assets/images/dummy/gsrbr0401_2.png") },
                        { num: "03", text: "상품 선택후<br/>수령정보 입력", img: require("@/assets/images/dummy/gsrbr0401_3.png") },
                        { num: "04", text: "아동급식 카드번호 및 유효기간 작성 후<br/>결제 완료", img: require("@/assets/images/dummy/gsrbr0401_4.png") }
                    ],
                    AccTitle_2: "아동급식 사전예약 수령방법",
                    FreshTitle: "사전예약으로 더 알뜰한 장보기!",
                    FreshDesc: "산지의 신선함을 집 앞까지 배송하는 사전예약 서비스는 제철 상품을 합리적인 가격으로 제공하여 많은 사랑을 받고 있습니다. 주문한 상품을 매장에서 수령할 수 있고, 주문 방법이 어렵다면 매장으로 문의 바랍니다."
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    pickupNotice: "You can pick up your ordered items by presenting a physical Child Meal Card or the mobile app barcode at the selected GS25 store."/* 260708 번역 */,
                    MainTitle: "Delivery & Pickup",
                    TipTitle: "Our Neighborhood GS Delivery & Pickup Tips",
                    Tips: [
                        { text: "KT and LG U+ <br />Carrier Discounts" },
                        { text: "GS ALL Points<br />Earning & Redemption" },
                        { text: "Exclusive GS Pay <br />Discounts and Gifts" },
                        { text: "Additional Discount<br />When Paying with<br />Mobile POP" },
                        { text: "Buy-One-Get-One, 2+1, <br />and More Promotions" },
                        { text: "Exclusive Discount Coupons <br />for the Our Neighborhood GS App" }
                    ],
                    Gs25Title: "Lunchboxes, sandwiches, and more — <br />pick them up at your preferred store at your chosen time.",
                    Gs25Desc: "A pre-order service that lets you collect your items at your preferred store and time through the Our Neighborhood GS app.",
                    Gs25Categories: [
                        { name: "Lunchbox and Gimbap", img: require("@/assets/images/dummy/gsrbr0401_food1.png") },
                        { name: "Burger", img: require("@/assets/images/dummy/gsrbr0401_food2.png") },
                        { name: "Sandwich", img: require("@/assets/images/dummy/gsrbr0401_food3.png") },
                        { name: "Ready-to-Eat Noodles", img: require("@/assets/images/dummy/gsrbr0401_food4.png") },
                        { name: "Cooking / side dishes"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrbr0401_food5.png") },
                        { name: "Salad", img: require("@/assets/images/dummy/gsrbr0401_food6.png") }
                    ],
                    NoticeTxt: "Stay up to date on pre-order special events and parcel delivery promotions!"/* 260604 번역 */,
                    ChildFoodTitle: "Children's Meal Card Pre-Order",
                    ChildFoodDesc: "This is a service that allows payment at a 20% discount when using the 'Children's Meal Card' for advance-reservation in-store pickup on the Our Neighborhood GS app. It is available to children/adolescents under the age of 18, and anyone who has received a Children's Meal Card from the local governments below can use it."/* 260604 번역 */,
                    ChildFoodNotice: "* Local governments serviced by Shinhan Card: Seoul, Incheon, Busan, Chuncheon, Wonju, Sokcho\n* Local governments serviced by NH Bank: Gyeonggi-do, Gyeongsangbuk-do, Gyeongsangnam-do, Chungcheongbuk-do, Chungcheongnam-do, Daejeon, Ulsan, Jeju Special Self-Governing Province"/* 260604 번역 */,
                    AccTitle: "How to Use the Children's Meal Card Pre-Order Service",
                    Steps: [
                        { num: "01", text: "Open Our Neighborhood GS<br />and select the 'Children's Meal' icon", img: require("@/assets/images/dummy/gsrbr0401_1.png") },
                        { num: "02", text: "Set a GS25 store in your Children's Meal Card area <br />as your pickup store", img: require("@/assets/images/dummy/gsrbr0401_2.png") },
                        { num: "03", text: "Select your items<br />and enter pickup information", img: require("@/assets/images/dummy/gsrbr0401_3.png") },
                        { num: "04", text: "Enter your Children's Meal Card number<br />and expiry date, then complete payment", img: require("@/assets/images/dummy/gsrbr0401_4.png") }
                    ],
                    AccTitle_2: "How to Collect Children's Meal Card Pre-Orders",
                    FreshTitle: "Smarter Grocery Shopping with Pre-Orders!",
                    FreshDesc: "Our pre-order service delivers farm-fresh seasonal products to your doorstep <br />at reasonable prices and has earned widespread customer love.<br />You can also pick up your order in-store. <br />If you need help placing an order, please contact your nearest store."
                }
            }
        };
    },
    computed: {
        t() { return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko; }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    },
    methods: {
        checkMobile() { this.isMobile = window.innerWidth < 768; },
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
/* Common Layout */
.modal_header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 40px; color: #161616; font-size: 40px; font-weight: 700; border-bottom: 0 !important; }
.modal_content { flex: 1; overflow-y: auto; }
section { padding-bottom: 80px; }

/* Tip Section */
.tip_section h3 { margin-bottom: 40px; color: #161616; font-size: 32px; font-weight: 700; }
.tip_section ul { display: flex; gap: 8px; list-style: none; }
.tip_section li { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.tip_section li::before { content: ''; display: inline-block; width: 64px; height: 61px; background: red; border-radius: 50%; }
.tip_section li p { color: #161616; font-size: 16px; line-height: 1.3; text-align: center; }

/* Brand Header Area */
.brand_intro_section div { display: block; padding-bottom: 0; margin-bottom: 24px; }
.brand_intro_section h4 {margin-bottom: 8px; color: #161616; font-size: 24px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center;}
.brand_intro_section div p:nth-of-type(1) { margin-bottom: 8px; color: #161616; font-size: 1.8rem; font-weight: 700; }
.brand_intro_section div p:nth-of-type(2) { color: #67676f; font-size: 16px; line-height: 1.5; }

/* Product Category */
.product_category { display: flex; gap: 8px; margin-bottom: 24px; list-style: none; }
.product_category li { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.product_category figure { display: flex; align-items: center; justify-content: center; height: 136px; background: #f8f8f8; border-radius: 12px; overflow: hidden; }
.product_category figure img { width: 80%; object-fit: contain; }
.product_category span { color: #67676f; font-size: 16px; text-align: center; }

/* Notice Bar */
.notice_bar { display: flex; align-items: center; gap: 6px; padding: 16px; background: #f8f8f8; border-radius: 6px; }
.notice_bar p { position: relative; padding-left: 20px; color: #161616; font-size: 16px; }
.notice_bar p::before { content: ''; display: inline-block; position: absolute; top: 2px; left: 0; width: 16px; height: 16px; background: red; }

/* Child Food Section */
.child_food_section div { display: block; padding-bottom: 0; }
.child_food_section h4 { display: inline-flex; align-items: center; justify-content: center; margin-bottom: 8px; color: #161616; font-size: 24px; font-weight: 700; }
.child_food_section div div p:nth-of-type(1) { color: #161616; font-size: 16px; line-height: 1.5; }
.child_food_section div div p:nth-of-type(2) { margin-top: 8px; color: #67676f; font-size: 14px; line-height: 1.4; white-space: pre-line; }

/* Accordion Grid */
.accordion_container { margin-top: 40px; border-top: 1px solid #161616; }
:deep(.board_type_toggle) dt {border-top:1px solid #D7D7DF !important; border-bottom:1px solid #D7D7DF !important;}
:deep(.board_type_toggle) dt:first-of-type {border-bottom:0 !important;}
.how_to_grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 20px 0; list-style: none; }
.how_to_grid li { display: flex; flex-direction: column; gap: 40px; padding: 32px; background: #f8f8f8; border-radius: 12px; }
.card_tit .num { display: block; margin-bottom: 6px; color: #107af2; font-size: 16px; font-weight: 700; }
.card_tit strong { color: #161616; font-size: 16px; font-weight: 700; line-height: 1.4; }
.how_to_grid figure { height: 200px; text-align: center; }
.how_to_grid figure img { height: 100%; object-fit: contain; }

/* Receive Info */
.receive_info { padding: 20px; background: #f8f8f8; border-radius: 12px; }
.receive_info p { color: #161616; font-size: 16px; line-height: 1.5; }

.mt80 { margin-top: 80px; }

/* Responsive */
@media screen and (max-width: 1024px) {
    .tip_section ul, .product_category { flex-wrap: wrap; }
    .tip_section li, .product_category li { flex: 0 0 calc(33.33% - 8px); }
}
@media screen and (max-width: 767px) {
    .modal_header { font-size: 1.8rem; padding-bottom: 24px; }
    section { padding-bottom:60px; }
    .tip_section h3 { font-size: 2.8rem; }
    .tip_section ul { flex-wrap: wrap; gap: 20px 8px; }
    .tip_section ul li { flex: 0 0 calc(33.33% - 8px); }
    .tip_section ul li p { font-size: 12px; }
    .product_category li { flex: 0 0 calc(50% - 8px); }
    .how_to_grid { grid-template-columns: 1fr; }
}
</style>