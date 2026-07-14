<template>
    <div class="modal_cont gsrbr0601">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <section class="gs25_event">
                <!-- 26.06.09 add 정다희 : 서브 타이틀 모바일 전용 줄바꿈(m_br) 적용 -->
                <h4 v-html="t.sub_Title1"></h4>
                <!-- 26.06.09 add 정다희 : 서브 설명 문구 p.desc 시맨틱 태그 적용 -->
                <p class="desc">{{ t.sub_desc1 }}</p>

                <!-- 26.06.09 add 정다희 : 재고찾기 이용방법(how to) 목록 영역 추가 -->
                <ul class="how_to_list">
                    <li v-for="(step, idx) in t.Steps" :key="idx">
                        <div class="card_tit">
                            <span class="num">{{ step.num }}</span>
                            <strong v-html="step.text"></strong>
                        </div>
                        <figure>
                            <img :src="step.img" :alt="'Step ' + step.num">
                        </figure>
                    </li>
                </ul>
                <!-- //26.06.09 add 정다희 : 재고찾기 이용방법(how to) 목록 영역 추가 -->
            </section>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "gsrbr0403", // 26.06.09 add 정다희 : 컴포넌트명 gsrbr0403 정정
    props: {
        lang: { type: String, default: "ko" } // 26.06.09 add 정다희 : lang prop 추가
    },
    data() {
        return {
            isMobile: false, // 26.06.09 add 정다희 : 반응형 분기용 isMobile 추가
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "재고찾기",
                    sub_Title1: "품절 걱정 끝!<br class=\"m_br\" />전국 매장 실시간 재고 확인", // 26.06.09 add 정다희 : 서브 타이틀 모바일 전용 줄바꿈(m_br) 데이터
                    sub_desc1: "전국 GS25 · GS THE FRESH 매장별,\n 원하는 상품의 실시간 재고 현황 및 잔여 수량을 간편하게 확인할 수 있습니다.",
                    // 26.06.09 add 정다희 : 재고찾기 이용방법 Steps 데이터(gsrbr0403_01~04 이미지)
                    Steps: [
                        { num: "01", text: "우리동네GS 앱 첫 화면에서<br/>[재고찾기] 클릭", img: require("@/assets/images/dummy/gsrbr0403_01.png") },
                        { num: "02", text: "요즘 핫한 신상품이나<br/>지금 사고싶은 상품 검색!", img: require("@/assets/images/dummy/gsrbr0403_02.png") },
                        { num: "03", text: "현재 위치 기반으로 근처 GS25 또는<br />GS더프레시 점포 재고 확인", img: require("@/assets/images/dummy/gsrbr0403_03.png") },
                        { num: "04", text: "다른 지역도 확인하고 싶다면<br />원하는 지역 직접 검색!", img: require("@/assets/images/dummy/gsrbr0403_04.png") }
                    ]
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Stock Finder",
                    sub_Title1: "No more worrying about sold-out items! Real-time stock checks at stores nationwide"/* 260604 번역 */,
                    sub_desc1:"For each GS25 and GS THE FRESH store nationwide,\n you can easily check the real-time stock status and remaining quantity of the products you want."/* 260604 번역 */,
                    Steps: [
                        { num: "01", text: "On the home screen of the Our Neighborhood GS app,<br/>tap [Stock Finder]"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0403_01.png") },
                        { num: "02", text: "Search for trending new products<br/>or items you want to buy right now!"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0403_02.png") },
                        { num: "03", text: "Check stock at nearby GS25 or<br />GS THE FRESH stores based on your current location"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0403_03.png") },
                        { num: "04", text: "Want to check other areas?<br />Search your desired area directly!"/* 260708 번역 */, img: require("@/assets/images/dummy/gsrbr0403_04.png") }
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
.gs25_event > h4 { color: #161616; font-size: 3.2rem; font-weight: 700; }
/* 26.06.09 add 정다희 : 서브 타이틀 m_br PC 숨김 */
:deep(.m_br) { display: none; }
.gs25_event > p.desc { margin: 16px 0 40px; color: #161616; font-size: 1.8rem; line-height: 1.4; white-space: pre-line; }
/* 26.06.09 add 정다희 : 재고찾기 이용방법(how to) 2열 그리드 스타일 */
.how_to_list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;}
.how_to_list > li { padding: 32px; background-color: #f8f8f8; border-radius: 12px; overflow: hidden; }
.how_to_list .card_tit > span.num {margin-bottom:6px;color: #107af2; font-size: 1.6rem; font-weight: 700; line-height: 1.24; display: block;}
.how_to_list .card_tit > strong { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.24; display: block;}
.how_to_list > li > figure { width: 100%; height: 360px; margin-top: 40px; }
.how_to_list > li > figure > img { width: 100%; height: 100%; object-fit: contain; }

/* 26.06.09 add 정다희 : 모바일 m_br 표시, 이용방법 1열, 이미지 높이 조정 */
@media screen and (max-width: 768px) {
    :deep(.m_br) { display: block; }
    .modal_content { padding-bottom: 100px; }
    .gs25_event > h4 { font-size: 2.8rem; }
    .gs25_event > p.desc { margin: 12px 0; font-size: 1.6rem; }
    .how_to_list { grid-template-columns: 1fr; }
    .how_to_list > li > figure { height: 270px; }
}
</style>
