<template>
    <div class="modal_cont delivery_modal">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <!-- 26.06.22 add 정다희 : header 추가 -->
            <header>
                <h2 v-html="t.HeaderTitle"></h2>
                <p>{{ t.HeaderDesc }}</p>
                <p>{{ t.HeaderSubDesc }}</p>
            </header>
            <!-- //26.06.22 add 정다희 : header 추가 -->
            <section class="tip_section">
                <h3 v-html="t.TipTitle"></h3>
                <ul>
                    <li v-for="(tip, idx) in t.Tips" :key="idx">
                        <p v-html="tip.text"></p>
                    </li>
                </ul>
            </section>

            <!-- 26.06.10 del 정다희 : GS25 브랜드 소개 섹션 미사용 -->
            <!-- <section class="brand_intro_section">
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
            </section> -->
            <!-- //26.06.10 del 정다희 : GS25 브랜드 소개 섹션 미사용 -->

            <section v-if="t.DiscountSteps?.length" class="discount_section">
                <div>
                    <h4>{{ t.DiscountTitle }}</h4>
                    <p>{{ t.DiscountDesc }}</p>
                    <p class="txt_sub">{{ t.DiscountSubDesc }}</p>
                </div>
                <ul class="how_to_list">
                    <li v-for="(step, idx) in t.DiscountSteps" :key="idx">
                        <div class="card_tit">
                            <span class="num">{{ step.num }}</span>
                            <strong v-html="step.text"></strong>
                            <p v-if="step.desc" class="txt_sub">{{ step.desc }}</p>
                        </div>
                        <figure>
                            <img :src="isMobile ? step.imgMo : step.img" :alt="'Step ' + step.num"> <!-- 26.06.10 add 정다희 : 이미지 모바일 전용 추가 -->
                        </figure>
                    </li>
                </ul>
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
                            <!-- 26.06.10 add 정다희 : 클래스 수정 및 stpes > steps_2 데이터 사용 -->
                            <ul class="how_to_list">
                                <li v-for="(step_2, idx) in t.Steps_2" :key="idx">
                                    <div class="card_tit">
                                        <span class="num">{{ step_2.num }}</span>
                                        <strong v-html="step_2.text"></strong>
                                    </div>
                                </li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem item-key="child-food-receive">
                            <template #title>{{ t.AccTitle_2 }}</template>
                            <!-- 26.06.10 del 정다희 : 수령방법 안내 문구 미사용 -->
                            <!-- <div class="receive_info">
                                <p>{{ t.pickupNotice }}</p>
                            </div> -->
                            <!-- 26.06.10 add 정다희 : 클래스 수정 및 stpes2 > steps_3 데이터 사용 -->
                            <ul class="how_to_list">
                                <li v-for="(step_3, idx) in t.Steps_3" :key="idx">
                                    <div class="card_tit">
                                        <span class="num">{{ step_3.num }}</span>
                                        <strong v-html="step_3.text"></strong>
                                    </div>
                                </li>
                            </ul>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>

            <!-- 26.06.22 delete 정다희 : GS THE FRESH 배달 픽업 문구 영역 삭제 -->
            <!-- <section class="brand_intro_section">
                <div>
                    <h4>GS THE FRESH</h4>
                    <p>{{ t.FreshTitle }}</p>
                    <p class="txt_sub" v-html="t.FreshDesc"></p>
                </div>
            </section> -->
            <!-- //26.06.22 delete 정다희 : GS THE FRESH 배달 픽업 문구 영역 삭제 -->
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
                    // 26.06. 22 add 정다희: header 컨텐츠 추가
                    HeaderTitle: "간식부터 장보기까지,<br class=\"m_br\"> 내 폰 안의 편의점·수퍼",
                    HeaderDesc: "스낵/음료, 간편식, 신선식품, 생필품",
                    HeaderSubDesc: "편의점과 수퍼 매장의 상품을 원하는 곳으로 배달받거나, 원하는 시간에 대기 없이 픽업하는 서비스 (전국 GS25, GS THE FRESH)",
                    // //26.06. 22 add 정다희: header 컨텐츠 추가
                    TipTitle: "우리동네GS <br class='m_br'/>배달·픽업 활용 팁",
                    Tips: [
                        { text: "KT, LGU+<br/>통신사 할인" },
                        { text: "GS ALL 포인트<br/> 적립/사용" },
                        { text: "GS Pay만의<br/> 할인/증정 혜택" },
                        { text: "모바일 팝 결제시<br/> 추가 할인" },
                        { text: "1+1, 2+1 등<br/> 다양한 행사" },
                        { text: "우리동네GS 앱 전용<br/> 추가 할인쿠폰" }
                    ],
                    DiscountTitle: "마감할인",
                    DiscountDesc: "소비기한 임박상품을 할인된 가격으로 픽업하고 환경도 보호하는 착한 서비스 입니다.",
                    DiscountSubDesc: "*소비기한 45분 전까지 구매 가능(소비 기한 이후 픽업 불가)",
                    DiscountSteps: [
                        { num: "혜택 안내", text: "GS ALL 포인트 적립, 통신사 할인,<br />장바구니 쿠폰 이용 가능", desc: "*단 타 할인행사와 중복 적용 불가", img: require("@/assets/images/dummy/gsrbr0401_sale_01.png"), imgMo: require("@/assets/images/dummy/gsrbr0401_sale_01_mo.png") },
                        { num: "대상 품목", text: "마감할인 대상 품목 안내<br />샌드위치, 도시락, 햄버거, 삼각김밥, 김밥", img: require("@/assets/images/dummy/gsrbr0401_sale_02.png"), imgMo: require("@/assets/images/dummy/gsrbr0401_sale_02_mo.png") },
                        { num: "구매 시간", text: "마감할인 상품 구매 가능 시간", img: require("@/assets/images/dummy/gsrbr0401_sale_03.png"), imgMo: require("@/assets/images/dummy/gsrbr0401_sale_03_mo.png") },
                        { num: "마감할인 이용 꿀TIP", text: "다른 지역도 확인하고 싶다면<br />마감할인 알림 받고 빠르게 구매하세요!", img: require("@/assets/images/dummy/gsrbr0401_sale_04.png"), imgMo: require("@/assets/images/dummy/gsrbr0401_sale_04_mo.png") }
                    ],
                    Steps_2: [
                        { num: "01", text: "우리동네GS 접속 후<br />'아동급식' 아이콘 선택" },
                        { num: "02", text: "소지한 아동급식카드 지역의 GS25 매장을<br />수령매장으로 설정" },
                        { num: "03", text: "상품 선택후<br />수령정보 입력" },
                        { num: "04", text: "아동급식 카드번호 및 유효기간 작성 후<br />결제 완료" }
                    ],
                    // 26.06.10 del 정다희 : Gs25Categories 미사용 (GS25 섹션 주석 처리)
                    // Gs25Categories: [
                    //     { name: "도시락/김밥", img: require("@/assets/images/dummy/gsrbr0401_food1.png") },
                    //     { name: "햄버거", img: require("@/assets/images/dummy/gsrbr0401_food2.png") },
                    //     { name: "샌드위치", img: require("@/assets/images/dummy/gsrbr0401_food3.png") },
                    //     { name: "조리면", img: require("@/assets/images/dummy/gsrbr0401_food4.png") },
                    //     { name: "요리/반찬", img: require("@/assets/images/dummy/gsrbr0401_food5.png") },
                    //     { name: "샐러드", img: require("@/assets/images/dummy/gsrbr0401_food6.png") }
                    // ],
                    // 26.06.10 del 정다희 : NoticeTxt 미사용 (GS25 섹션 주석 처리)
                    // NoticeTxt: "사전예약 기획전 택배 배송 행사도 발 빠르게 확인하세요!",
                    ChildFoodTitle: "아동급식 사전예약",
                    ChildFoodDesc: "우리동네GS 앱에서 '아동급식카드'로 사전예약 매장수령 결제 시 20%할인된 가로 구매 가능한 서비스입니다.<br/> 만 18세 미만 아동/청소년 이용 가능한 서비스로 아래 지자체에서 아동급 식카드를 제공받은 대상자라면 누구나 이용 가능합니다.",
                    ChildFoodNotice: "* 신한카드 대행 지자체 : 서울특별시, 인천광역시, 부산광역시, 춘천시, 원주시, 속초시\n* 농협은행 대행 지자체 : 경기도, 경상북도, 경상남도, 충청북도, 충청남도, 대전광역시, 울산광역시, 제주특별자치도",
                    AccTitle: "아동급식 사전예약 이용방법",
                 
                    AccTitle_2: "아동급식 사전예약 수령방법",
                    // 26.06.22 del 정다희 : GS THE FRESH 섹션 삭제 (FreshTitle, FreshDesc 미사용)
                    // FreshTitle: "사전예약으로 더 알뜰한 장보기!",
                    // FreshDesc: "산지의 신선함을 집 앞까지 배송하는 사전예약 서비스는 제철 상품을 합리적인 가격으로 제공하여 많은 사랑을 받고 있습니다.<br />주문한 상품을 매장에서 수령할 수 있고, 주문 방법이 어렵다면 매장으로 문의 바랍니다.",
                    Steps_3: [
                        { num: "01", text: "우리동네GS 접속 후<br/>'나만의 냉장고' 또는 '주문내역' 선택" },
                        { num: "02", text: "나만의 냉장고 선택 시, '아동급식 사전예약 상품' 선택" },
                        { num: "03", text: "주문내역 선택 시, '픽업 바코드 보기'버튼 선택" },
                        { num: "04", text: "점원에게 바코드 제시" }
                    ]
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    pickupNotice: "You can pick up your ordered items by presenting a physical Child Meal Card or the mobile app barcode at the selected GS25 store."/* 260708 번역 */, 
                    MainTitle: "Delivery & Pickup",
                    HeaderTitle: "From snacks to grocery shopping,<br class=\"m_br\"> a convenience store and supermarket in your phone"/* 260708 번역 */,
                    HeaderDesc: "Snacks/beverages, ready meals, fresh food, daily necessities"/* 260708 번역 */,
                    HeaderSubDesc: "A service that delivers products from convenience stores and supermarkets to wherever you want, or lets you pick them up at your chosen time without waiting (GS25 and GS THE FRESH nationwide)"/* 260708 번역 */,
                    TipTitle: "Our Neighborhood GS Delivery & Pickup Tips",
                    Tips: [
                        { text: "KT and LG U+ <br />Carrier Discounts" },
                        { text: "GS ALL Points<br />Earning & Redemption" },
                        { text: "Exclusive GS Pay <br />Discounts and Gifts" },
                        { text: "Additional Discount<br />When Paying with<br />Mobile POP" },
                        { text: "Buy-One-Get-One, 2+1, <br />and More Promotions" },
                        { text: "Exclusive Discount Coupons <br />for the Our Neighborhood GS App" }
                    ],
                    // 26.06.10 add 정다희 : 마감할인 영역 en 미작업 (추후 작업 예정)
                    // DiscountTitle: "",
                    // DiscountDesc: "",
                    // DiscountSubDesc: "",
                    // DiscountSteps: [],
                    // 26.06.10 del 정다희 : Gs25Categories 미사용 (GS25 섹션 주석 처리)
                    // Gs25Categories: [
                    //     { name: "Lunchbox and Gimbap", img: require("@/assets/images/dummy/gsrbr0401_food1.png") },
                    //     { name: "Burger", img: require("@/assets/images/dummy/gsrbr0401_food2.png") },
                    //     { name: "Sandwich", img: require("@/assets/images/dummy/gsrbr0401_food3.png") },
                    //     { name: "Ready-to-Eat Noodles", img: require("@/assets/images/dummy/gsrbr0401_food4.png") },
                    //     { name: "Cooking / side dishes"/* 260604 번역 */, img: require("@/assets/images/dummy/gsrbr0401_food5.png") },
                    //     { name: "Salad", img: require("@/assets/images/dummy/gsrbr0401_food6.png") }
                    // ],
                    // 26.06.10 del 정다희 : NoticeTxt 미사용 (GS25 섹션 주석 처리)
                    // NoticeTxt: "Stay up to date on pre-order special events and parcel delivery promotions!"/* 260604 번역 */,
                    ChildFoodTitle: "Children's Meal Card Pre-Order",
                    ChildFoodDesc: "This service lets you purchase items at a 20% discount when paying with a Children's Meal Card for pre-ordered in-store pickup through the Our Neighborhood GS app.<br/>Available to children and youth under 18 who have been issued a Children's Meal Card by one of the local governments listed below."/* 260604 번역 */,
                    ChildFoodNotice: "* Local governments serviced by Shinhan Card: Seoul, Incheon, Busan, Chuncheon, Wonju, Sokcho\n* Local governments serviced by NH Bank: Gyeonggi-do, Gyeongsangbuk-do, Gyeongsangnam-do, Chungcheongbuk-do, Chungcheongnam-do, Daejeon, Ulsan, Jeju Special Self-Governing Province"/* 260604 번역 */,
                    AccTitle: "How to Use the Children's Meal Card Pre-Order Service",
                    AccTitle_2: "How to Collect Children's Meal Card Pre-Orders",
                    // 26.06.22 del 정다희 : GS THE FRESH 섹션 삭제 (FreshTitle, FreshDesc 미사용)
                    // FreshTitle: "Smarter Grocery Shopping with Pre-Orders!",
                    // FreshDesc: "산지의 신선함을 집 앞까지 배송하는 사전예약 서비스는 제철 상품을 합리적인 가격으로 제공하여 많은 사랑을 받고 있습니다. 주문한 상품을 매장에서 수령할 수 있고, 주문 방법이 어렵다면 매장으로 문의 바랍니다.",
                    Steps_2: [
                        { num: "01", text: "Open Our Neighborhood GS<br />and select the 'Children's Meal' icon" },
                        { num: "02", text: "Set a GS25 store in your Children's Meal Card area <br />as your pickup store" },
                        { num: "03", text: "Select your items<br />and enter pickup information" },
                        { num: "04", text: "Enter your Children's Meal Card number<br />and expiry date, then complete payment" }
                    ],
                    // 26.06.10 del 정다희 : en Steps_2 img 미사용 (이미지 렌더링 제거)
                    // { num: "01", img: require("@/assets/images/dummy/gsrbr0401_1.png") },
                    // { num: "02", img: require("@/assets/images/dummy/gsrbr0401_2.png") },
                    // { num: "03", img: require("@/assets/images/dummy/gsrbr0401_3.png") },
                    // { num: "04", img: require("@/assets/images/dummy/gsrbr0401_4.png") },
                    Steps_3: [
                        { num: "01", text: "Open Our Neighborhood GS<br/>and select 'My Fridge' or 'Order History'" },
                        { num: "02", text: "When selecting 'My Fridge', choose your pre-ordered Children's Meal item" },
                        { num: "03", text: "When selecting 'Order History', tap the 'View Pickup Barcode' button" },
                        { num: "04", text: "Present the barcode to the store staff" }
                    ]
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
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
:deep(.p_br) { display: block }
:deep(.m_br) { display: none }
section + seciton{ margin-top: 80px; }
section h4 + p{margin-top:8px; font-weight: 700;font-size: 1.8rem;line-height: 1.5;}
section p.txt_sub{margin-top:8px;color:#67676F;font-weight: 400;font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}

/* 26.06.22 add 정다희 */
.modal_content > header{margin-bottom:40px;}
.modal_content > header h2{margin-bottom: 16px; font-weight: 700;font-size: 3.2rem;line-height: 1.3;letter-spacing: -0.01em;}
.modal_content > header p{font-size: 1.8rem;line-height: 1.4;}
.modal_content > header p + p{margin-top:8px;}
/* Tip Section */
.tip_section h3 { margin-bottom: 40px; color: #161616; font-size: 32px; font-weight: 700; }
.tip_section ul { display: flex; gap: 8px; list-style: none; }
.tip_section li { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.tip_section li::before { content: ''; display: inline-block; width: 64px; height: 64px; background: #F8F8F8; border-radius: 50%; }
.tip_section li p { color: #161616; font-size: 16px; line-height: 1.3; text-align: center; }

.tip_section li::after {width:24px; height:24px; background-position:50% 50%; background-repeat:no-repeat; background-size:cover; content:''; position:absolute; top:20px; left:50%; transform:translateX(-50%);}
.tip_section li:nth-of-type(1)::after {background-image:url('@/assets/images/sub/gsrbr04/icon_tip_01.png');}
.tip_section li:nth-of-type(2)::after {background-image:url('@/assets/images/sub/gsrbr04/icon_tip_02.png');}
.tip_section li:nth-of-type(3)::after {background-image:url('@/assets/images/sub/gsrbr04/icon_tip_03.png');}
.tip_section li:nth-of-type(4)::after {background-image:url('@/assets/images/sub/gsrbr04/icon_tip_04.png');}
.tip_section li:nth-of-type(5)::after {background-image:url('@/assets/images/sub/gsrbr04/icon_tip_05.png');}
.tip_section li:nth-of-type(6)::after {background-image:url('@/assets/images/sub/gsrbr04/icon_tip_06.png');}

/* 26.06.22 del 정다희 : GS THE FRESH 섹션 삭제 (brand_intro_section 미사용) */
/* Brand Header Area */
/* .brand_intro_section div { display: block; padding-bottom: 0; margin-bottom: 24px; } */
/* .brand_intro_section h4 {margin-bottom: 8px; color: #161616; font-size: 24px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center;} */
/* .brand_intro_section div p:nth-of-type(1) { margin-bottom: 8px; color: #161616; font-size: 1.8rem;} */
/* .brand_intro_section div p:nth-of-type(2) { color: #67676f; font-size: 16px; line-height: 1.5; } */

/* 26.06.10 del 정다희 : product_category 미사용 (GS25 섹션 주석 처리) */
/* .product_category { display: flex; gap: 8px; margin-bottom: 24px; list-style: none; } */
/* .product_category li { flex: 1; display: flex; flex-direction: column; gap: 8px; } */
/* .product_category figure { display: flex; align-items: center; justify-content: center; height: 136px; background: #f8f8f8; border-radius: 12px; overflow: hidden; } */
/* .product_category figure img { width: 80%; object-fit: contain; } */
/* .product_category span { color: #67676f; font-size: 16px; text-align: center; } */

/* 26.06.10 del 정다희 : notice_bar 미사용 (GS25 섹션 주석 처리) */
/* .notice_bar { padding: 16px !important; background: #f8f8f8; border-radius: 6px;  display: flex; align-items: center; gap: 6px;} */
/* .notice_bar p {margin-bottom:0px !important; padding-left: 26px; color: #161616; font-size: 16px; position: relative; } */
/* .notice_bar p::before { content: ''; display: inline-block; position: absolute; top: 0; left: 0; width: 20px; height: 20px; background: url('@/assets/images/common/icon_set_20.png') -935px -24px no-repeat; } */

/* Child Food Section */
.child_food_section div { display: block; padding-bottom: 0; }
.child_food_section h4 { display: inline-flex; align-items: center; justify-content: center; margin-bottom: 8px; color: #161616; font-size: 24px; font-weight: 700; }
.child_food_section div div p:nth-of-type(1) { color: #161616; font-size: 16px; line-height: 1.5; }
.child_food_section div div p:nth-of-type(2) { margin-top: 8px; color: #67676f; font-size: 14px; line-height: 1.4; white-space: pre-line; }
.child_food_section ul.how_to_list { margin:12px auto 24px;}
/* Accordion */
.accordion_container { margin-top: 40px; border-top: 1px solid #161616; }

/* 26.06.10 del 정다희 : 아코디언 dt 테두리 스타일 미사용 */
/* :deep(.board_type_toggle) dt {border-top:1px solid #D7D7DF !important; border-bottom:1px solid #D7D7DF !important;} */
/* :deep(.board_type_toggle) dt:first-of-type {border-bottom:0 !important;} */
:deep(.board_type_toggle dd + dt) {border-top:1px solid #D7D7DF;}
:deep(.board_type_toggle dd:last-of-type) {border-bottom:1px solid #D7D7DF;}

/* 26.06.10 del 정다희 : how_to_grid 미사용 (how_to_list로 변경) */
/* .how_to_grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 20px 0; list-style: none; } */
/* .how_to_grid li { display: flex; flex-direction: column; gap: 40px; padding: 32px; background: #f8f8f8; border-radius: 12px; } */
/* .card_tit .num { display: block; margin-bottom: 6px; color: #107af2; font-size: 16px; font-weight: 700; } */
/* .card_tit strong { color: #161616; font-size: 16px; font-weight: 700; line-height: 1.4; } */
/* .how_to_grid figure { height: 200px; text-align: center; } */
/* .how_to_grid figure img { height: 100%; object-fit: contain; } */

/* 26.06.10 del 정다희 : receive_info 미사용 */
/* .receive_info { padding: 20px !important; background: #f8f8f8; border-radius: 12px; } */
/* .receive_info p { color: #161616; font-size: 16px; line-height: 1.5; } */

/* 26.06.10 del 정다희 : mt80 미사용 */
/* .mt80 { margin-top: 80px; } */

/* 26.06.10 add 정다희 */
.how_to_list { margin-top:40px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;}
.how_to_list > li { padding: 32px; background-color: #f8f8f8; border-radius: 12px; overflow: hidden; }
.how_to_list > li:first-of-type {padding-bottom:0;}
.accordion_container .how_to_list > li:first-of-type {padding:32px;}
.how_to_list .card_tit > span.num {margin-bottom:6px;color: #107af2; font-size: 1.6rem; font-weight: 700; line-height: 1.24; display: block;}
.how_to_list .card_tit > strong { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.24; display: block;}
.how_to_list > li p.txt_sub{margin-top:6px;}
.how_to_list > li > figure { width: 100%; height: auto; margin-top: 40px; }
.how_to_list > li > figure > img { width: 100%; height: 100%; object-fit: contain; }

/* Responsive */
@media screen and (max-width: 1024px) {
    .tip_section ul { flex-wrap: wrap; gap:20px;}
    .tip_section li { flex: 0 0 calc(33.33% - 8px); }
    /* 26.06.10 del 정다희 : product_category 반응형 미사용 */
    /* .product_category { flex-wrap: wrap; gap:20px;} */
    /* .product_category li { flex: 0 0 calc(33.33% - 8px); } */
}
@media screen and (max-width: 768px) {
    /* 26.06.10 del 정다희 : notice_bar 반응형 미사용 */
    /* .notice_bar p {font-size:12px !important; font-weight:400 !important;} */
    /* .notice_bar p::before {top:-2px;} */
    :deep(.p_br) { display: none }
    :deep(.m_br) { display: inline }
    .modal_content { padding-bottom: 100px; }
    .modal_content > header{margin-bottom:60px;}
    .modal_content > header h2{margin-bottom:12px;font-size: 2.8rem;line-height: 1.35;}
    .modal_content > header p{font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
    section + section { margin-top:60px; }
    .tip_section h3 { font-size: 2.8rem; }
    .tip_section ul { flex-wrap: wrap; gap: 20px 8px; }
    .tip_section ul li { flex: 0 0 calc(33.33% - 8px); }
    .tip_section ul li p { font-size: 12px; }
    /* 26.06.10 del 정다희 : product_category, how_to_grid 반응형 미사용 */
    /* .product_category li { flex: 0 0 calc(50% - 10px); } */
    /* .how_to_grid { grid-template-columns: 1fr; } */
    /* .product_category figure img {width:50%;} */
    .child_food_section h4 {margin-bottom:12px;}

    /* 26.06.10 add 정다희 */
    .how_to_list { grid-template-columns: 1fr; }
}
</style>