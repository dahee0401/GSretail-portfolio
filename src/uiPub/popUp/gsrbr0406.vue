<template>
    <div class="modal_cont pre_order_modal">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <section class="gs25_section">
                <h3 class="sec_tit">{{ t.Gs25SectionTitle }}</h3>
                <div class="brand_intro">
                    <!-- <h4>GS25</h4> -->
                    <div class="brand_intro_txt">
                        <p>{{ t.Gs25Title }}</p>
                        <p class="txt_sub">{{ t.Gs25Desc }}</p>
                    </div>
                </div>

                <div class="tip_box">
                    <ul>
                        <li v-for="(item, idx) in t.Gs25Categories" :key="idx">
                            <figure><img :src="item.img" :alt="item.name"></figure>
                            <p>{{ item.name }}</p>
                        </li>
                    </ul>
                </div>

                <div class="notice_bar">
                    <p>{{ t.NoticeTxt }}</p>
                </div>
            </section>

            <section class="gsfresh_section">
                <h3 class="sec_tit">{{ t.FreshSectionTitle }}</h3>
                <div class="brand_intro">
                    <p>{{ t.FreshTitle }}</p>
                    <p class="txt_sub" v-html="t.FreshDesc"></p>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "gsrbr0406",
    props: {
        lang: { type: String, default: "ko" }
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "사전예약",
                    Gs25SectionTitle: "GS25 사전예약",
                    Gs25Title: "도시락, 샌드위치 등 먹거리 상품을 원하는 시간, 원하는 점포에서 찾아가기",
                    Gs25Desc: "우리동네GS 앱에서 품절 걱정없이, 원하는 상품을 미리 주문하고 원하는 날짜에 수령할 수 있는 사전예약 서비스.",
                    Gs25Categories: [
                        { name: "도시락/김밥", img: require("@/assets/images/dummy/gsrbr0401_food1.png") },
                        { name: "햄버거", img: require("@/assets/images/dummy/gsrbr0401_food2.png") },
                        { name: "샌드위치", img: require("@/assets/images/dummy/gsrbr0401_food3.png") },
                        { name: "조리면", img: require("@/assets/images/dummy/gsrbr0401_food4.png") },
                        { name: "요리/반찬", img: require("@/assets/images/dummy/gsrbr0401_food5.png") },
                        { name: "샐러드", img: require("@/assets/images/dummy/gsrbr0401_food6.png") }
                    ],
                    NoticeTxt: "사전예약 기획전 택배 배송 행사도 발 빠르게 확인하세요!",
                    FreshSectionTitle: "GS THE FRESH 사전예약",
                    FreshTitle: "사전예약으로 더 알뜰한 장보기!",
                    FreshDesc: "가장 맛있는 제철 상품과 대용량 상품까지, 이제 사전예약으로 선점하고 편하게 수령하세요.<br />원하는 날짜에 집 앞 매장에서 직접 받거나, 택배로 집 앞까지 편리하게 만나보실 수 있습니다."
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Pre-Order"/* 260708 번역 */,
                    Gs25SectionTitle: "GS25 Pre-Order"/* 260708 번역 */,
                    Gs25Title: "Pick up food items such as lunch boxes and sandwiches at your preferred time and store"/* 260708 번역 */,
                    Gs25Desc: "A pre-order service on the Our Neighborhood GS app that lets you order the products you want in advance—without worrying about sold-outs—and pick them up on your desired date."/* 260708 번역 */,
                    Gs25Categories: [
                        { name: "Lunch Box/Gimbap"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0401_food1.png") },
                        { name: "Hamburger"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0401_food2.png") },
                        { name: "Sandwich"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0401_food3.png") },
                        { name: "Cooked Noodles"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0401_food4.png") },
                        { name: "Dishes/Side Dishes"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0401_food5.png") },
                        { name: "Salad"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0401_food6.png") }
                    ],
                    NoticeTxt: "Be quick to check out pre-order special exhibitions and parcel delivery events, too!"/* 260708 번역 */,
                    FreshSectionTitle: "GS THE FRESH Pre-Order"/* 260708 번역 */,
                    FreshTitle: "Smarter grocery shopping with pre-orders!"/* 260708 번역 */,
                    FreshDesc: "From the most delicious seasonal products to large-volume items, secure them in advance with pre-orders and pick them up with ease.<br />Receive them in person at your neighborhood store on your desired date, or have them conveniently delivered right to your door."/* 260708 번역 */
                }
            }
        };
    },
    computed: {
        t() { return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko; }
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
section { padding-bottom: 80px; }
.sec_tit {color: #161616; font-size: 3.2rem; line-height:1.3; letter-spacing:-0.01em; font-weight: 700; }
.brand_intro { margin-bottom: 40px; }
.brand_intro > h4 { margin-bottom: 8px; color: #161616; font-size: 3.2rem; font-weight: 700; }
.brand_intro_txt > p { color: #161616; font-size: 1.8rem; font-weight: 700; line-height: 1.5; }
.brand_intro_txt > p.txt_sub { margin-top: 8px; color: #67676f; font-weight: 400; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.gsfresh_section .brand_intro > p { margin-top:8px;color: #161616; font-size: 1.8rem; font-weight: 700; line-height: 1.5; }
.gsfresh_section .brand_intro > p.txt_sub { margin-top: 8px; color: #67676f; font-weight: 400; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.gs25_section .tip_box { padding-bottom: 0; }
.tip_box ul { display: flex; gap: 8px; list-style: none; }
.tip_box li { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.tip_box li > figure { display: flex; align-items: center; justify-content: center; width: 100%; height: 136px; background: #f8f8f8; border-radius: 12px; overflow: hidden; }
.tip_box li > figure > img {  object-fit: contain; }
.tip_box li > p { color: #67676f; font-size: 1.6rem; line-height: 1.5; text-align: center; }
.notice_bar { margin-top:24px; padding: 16px; background: #f8f8f8; border-radius: 6px; display: flex; align-items: center; gap: 6px; }
.notice_bar > p { margin: 0; padding-left: 26px; color: #161616; font-size: 1.6rem; position: relative; }
.notice_bar > p::before { content: ""; display: inline-block; position: absolute; top: 0; left: 0; width: 20px; height: 20px; background: url("@/assets/images/common/icon_set_20.png") -935px -24px no-repeat; }
.gsfresh_section { padding-bottom: 0; }
.gsfresh_section .brand_intro { margin-bottom: 0; }


@media screen and (max-width: 1024px) {
    .tip_box ul { flex-wrap: wrap; gap: 20px 8px; }
    .tip_box li { flex: 0 0 calc(33.33% - 8px); }
}

@media screen and (max-width: 768px) {
    .gs25_section .brand_intro_txt > p:not(.txt_sub){ display: none; }
    section { padding-bottom: 60px; }
    .sec_tit { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0;}
    .brand_intro > h4 { font-size: 2.4rem; }
    .tip_box ul { gap: 20px 8px; }
    .tip_box li { flex: 0 0 calc(50% - 4px); }
    .notice_bar > p { padding-left: 22px; font-size: 1.2rem; font-weight: 400; line-height: 1.2; }
    .notice_bar > p::before { content: ""; width: 16px; height: 16px; background: url("@/assets/images/common/icon_set_16.png") -736px -14px no-repeat; }
    .gsfresh_section { padding-bottom: 80px; }
    .gsfresh_section .sec_tit{font-size: 2.4rem;line-height: 1.35;letter-spacing: -0.01em;}
}
</style>
