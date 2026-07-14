<template>
    <div class="modal_cont gsrcm0101">
        <div class="modal_header">
            <span class="tit_pc" v-html="t.title"></span>
            <span class="tit_mo" v-html="t.titleMoHeader"></span>
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <header class="mo_content_tit">
                <h2 v-html="t.title"></h2>
            </header>

            <header class="info_intro">
                <p>{{ t.intro.lead }}</p>
            </header>

            <div class="article_wrap">
                <article
                    v-for="(sec, sIdx) in t.sections"
                    :key="'sec-' + sIdx"
                    class="info_sec"
                    :class="[sec.type, sec.secClass]"
                >
                    <h3 class="tit" v-html="sec.title"></h3>
    
                    <ul v-if="sec.type === 'points'" class="point_list">
                        <li v-for="(pt, pIdx) in sec.points" :key="'pt-' + pIdx">
                            <span class="i" aria-hidden="true"></span>
                            <div>
                                <strong>{{ pt.title }}</strong>
                                <p>{{ pt.desc }}</p>
                            </div>
                        </li>
                    </ul>
    
    
                    <ul v-else-if="sec.type === 'cards'" class="card_list" :class="'col_' + (sec.cols || 3)">
                        <li v-for="(card, cIdx) in sec.cards" :key="'card-' + cIdx">
                            <span class="i" aria-hidden="true"></span>
                            <p v-if="card.label" class="label">{{ card.label }}</p>
                            <strong class="card_tit">{{ card.title }}</strong>
                            <p class="card_desc">{{ card.desc }}</p>
                        </li>
                    </ul>
                </article>
            </div>
        </div>

        <div class="modal_bototm">
            <Buttons btn-class="btn_big fill primary" @click="closeModal">{{ t.submitLabel }}</Buttons>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

const props = defineProps({
    lang: { type: String, default: "ko" },
});

const langData = {
    ko: {
        title: "알기 쉬운 개인정보 처리방침<br />(개인정보 처리방침 인포그래픽 버전)",
        titleMoHeader: "알기 쉬운 개인정보 처리방침",
        closeLabel: "닫기",
        submitLabel: "확인",
        intro: {
            lead: "GS리테일이 고객님의 개인정보를 보호하는 정책을 한눈에 알기 쉽게 안내해드립니다.",
        },
        sections: [
            {
                type: "points",
                secClass: "sec_collect",
                title: "GS리테일은 <span class='txt_primary'>최소한의 개인정보</span>를 수집합니다",
                points: [
                    {
                        title: "회원 가입 시",
                        desc: "이름, ID, 비밀번호, 성별, 생년월일, 휴대폰번호, 이메일, 연계정보(CI) 등",
                    },
                    {
                        title: "상품 구매 시",
                        desc: "본인확인정보(CI, DI 등), 이름, 신용카드정보, 은행계좌정보 등 결제수단 정보 등",
                    },
                    {
                        title: "택배 이용 시",
                        desc: "주문자 이름, 주문자 연락처, 수취인 이름, 주소 연락처 등",
                    },
                    {
                        title: "이벤트 진행 시",
                        desc: "이름, 휴대폰번호, 주소 등",
                    },
                ],
            },
            {
                type: "cards",
                secClass: "sec_use",
                title: "<span class='txt_primary'>동의한 목적</span>으로만 <span class='txt_primary'>개인정보</span>를 이용합니다.",
                cols: 3,
                cards: [
                    {
                        title: "자사 서비스 이용",
                        desc: "GS25, GS SHOP, GS THE FRESH등 자사 서비스 이용에 따른 상품 배송, 반품, 환불 등 제반 서비스 제공",
                    },
                    {
                        title: "고객과의 의사소통",
                        desc: "서비스 관련 중요사항 고지, 이용자의 서비스 문의 및 불만사항 처리 등",
                    },
                    {
                        title: "이벤트 및 프로모션",
                        desc: "신상품 홍보 및 판매권유, 고객 맞춤형 서비스를 제공 등",
                    },
                ],
            },
            {
                type: "cards",
                secClass: "sec_provide",
                title: "개인정보 <span class='txt_primary'>제공</span>은 고객 <span class='txt_primary'>동의</span> 혹은 <span class='txt_primary'>법적</span> 근거에 따라 처리합니다.",
                cols: 3,
                cards: [
                    {
                        label: "더 나은 서비스 제공을 위해 필수적인 경우",
                        title: "개인정보의 처리위탁",
                        desc: "정보 전산 처리\n상품배송 및 배송정보 제공\n상담 및 고객 응대 서비스",
                    },
                    {
                        label: "고객께서 동의하신 경우",
                        title: "개인정보 제3자 제공",
                        desc: "외부 제휴사의 서비스 이용",
                    },
                    {
                        title: "관련 법령에 따른 경우",
                        desc: "재난, 감염병, 급박한 생명∙신체 위험을 초래하는 사건∙사고 발생 시",
                    },
                ],
            },
            {
                type: "cards",
                secClass: "sec_delete",
                title: "이용목적을 달성한 개인정보는 <span class='txt_primary'>즉시 삭제</span>합니다.",
                cols: 2,
                cards: [
                    {
                        title: "회원탈퇴 시",
                        desc: "회원탈퇴한 고객님의 개인정보\n안전한 방법으로 즉시 삭제",
                    },
                    {
                        title: "관련 법령 준수",
                        desc: "전자상거래법, 통신비밀 보호법 등 관련 법령의규정에\n의하여 개인정보를 보존할 필요가 있는 경우\n법령에서 정한 일정한 기간 동안 개인정보 보관",
                    },
                ],
            },
            {
                type: "points",
                secClass: "sec_protect",
                title: "고객님의 <span class='txt_primary'>개인정보는 안전하게 보호</span>하기 위해 GS리테일은<br /> 다음과 같은 노력을 하고 있습니다.",
                points: [
                    {
                        title: "개인정보 보관",
                        desc: "안전한 알고리즘을 사용하여\n암호화 처리 후 보관",
                    },
                    {
                        title: "보안시스템 운영",
                        desc: "개인정보를 안전하게 관리할 수 있는\n보안시스템 운영",
                    },
                    {
                        title: "객관적인 검증",
                        desc: "국내 개인정보보호 인증(ISMS-P) 취득",
                    },
                    {
                        title: "개인정보 교육",
                        desc: "개인정보처리직원을 최소한으로 제한하고, \n주기적으로 교육 진행",
                    },
                ],
            },
        ],
    },
    en: {

    },
};

const t = computed(() => {
    const selected = langData[props.lang];
    return selected && Object.keys(selected).length ? selected : langData.ko;
});

function closeModal(event) {
    modal.close(event.currentTarget);
}
</script>

<style scoped>
:deep(.txt_primary) { color: #107af2; }
.modal_header > .tit_mo { display: none; }
.mo_content_tit { display: none; }
.info_intro > p { color: #161616; font-size: 2rem; font-weight: 400; line-height: 1.35; letter-spacing: -0.01em; }


.article_wrap{ margin-top:56px;padding:56px 0 60px;border-top: 1px solid #161616; border-bottom: 1px solid #E5E5E9;}
.info_sec + .info_sec { margin-top: 80px; }
.info_sec > h3.tit { margin-bottom: 40px; color: #161616; font-size: 3.2rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.point_list { width: 100%;  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 40px; }

.point_list > li { display: flex; align-items: flex-start; gap: 8px; }
.point_list > li > span.i { width: 64px; height: 64px; flex-shrink: 0; background-color: #f8f8f8; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.point_list > li > span.i::before { content: ''; width: 32px; height: 32px; background-position:center; background-repeat: no-repeat;}
.sec_collect{padding-bottom:60px; border-bottom: 1px solid #E5E5E9;}
.sec_collect .point_list > li:nth-child(1) > span.i::before { background-image: url('@/assets/images/sub/gsrcm/icon_info_01.png'); }
.sec_collect .point_list > li:nth-child(2) > span.i::before { background-image: url('@/assets/images/sub/gsrcm/icon_info_02.png'); }
.sec_collect .point_list > li:nth-child(3) > span.i::before { background-image: url('@/assets/images/sub/gsrcm/icon_info_03.png'); }
.sec_collect .point_list > li:nth-child(4) > span.i::before { background-image: url('@/assets/images/sub/gsrcm/icon_info_04.png'); }
.sec_protect .point_list > li:nth-child(1) > span.i::before { background-image: url('@/assets/images/sub/gsrcm/icon_info_01.png'); }
.sec_protect .point_list > li:nth-child(2) > span.i::before { background-image: url('@/assets/images/sub/gsrcm/icon_info_05.png'); }
.sec_protect .point_list > li:nth-child(3) > span.i::before { background-image: url('@/assets/images/sub/gsrcm/icon_info_06.png'); }
.sec_protect .point_list > li:nth-child(4) > span.i::before { background-image: url('@/assets/images/sub/gsrcm/icon_info_07.png'); }

 .point_list > li > div > strong { color: #161616; font-size: 1.8rem; font-weight: 700; line-height: 1.5; letter-spacing: 0; display: block; }
 .point_list > li > div > p { margin-top: 8px; color: #161616; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; white-space: pre-line; }
 .card_list { width: 100%; list-style: none; display: grid; gap: 20px; }
 .card_list.col_3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
 .card_list.col_2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 .card_list > li { padding: 32px; background-color: #f8f8f8; border-radius: 12px; }
 .card_list > li > span.i { width: 40px; height: 40px; margin-bottom: 16px; background-color: #f8f8f8; background-repeat: no-repeat; background-position: center center;  display: block; }
.sec_use .card_list > li:nth-child(1) > span.i { background-image: url('@/assets/images/sub/gsrcm/icon_card_01.png'); }
.sec_use .card_list > li:nth-child(2) > span.i { background-image: url('@/assets/images/sub/gsrcm/icon_card_02.png'); }
.sec_use .card_list > li:nth-child(3) > span.i { background-image: url('@/assets/images/sub/gsrcm/icon_card_03.png'); }
.sec_provide .card_list > li:nth-child(1) > span.i { background-image: url('@/assets/images/sub/gsrcm/icon_card_04.png'); }
.sec_provide .card_list > li:nth-child(2) > span.i { background-image: url('@/assets/images/sub/gsrcm/icon_card_05.png'); }
.sec_provide .card_list > li:nth-child(3) > span.i { background-image: url('@/assets/images/sub/gsrcm/icon_card_06.png'); }
.sec_delete .card_list > li:nth-child(1) > span.i { background-image: url('@/assets/images/sub/gsrcm/icon_card_07.png'); }
.sec_delete .card_list > li:nth-child(2) > span.i { background-image: url('@/assets/images/sub/gsrcm/icon_card_08.png'); }


 .card_list > li > p.label { margin-bottom: 6px; color: #67676f; font-size: 1.6rem; font-weight: 700; line-height: 1.24; letter-spacing: 0; }
 .card_list > li > strong.card_tit { color: #161616; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; display: block; }
 .card_list > li > p.card_desc { margin-top: 16px; color: #67676f; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; white-space: pre-line; }
 .modal_bototm { margin-top: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
 .modal_bototm > :deep(.btn_big) { width: 134px; text-align: center; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
@media (max-width: 768px) {
     .modal_header > .tit_pc { display: none; }
     .modal_header > .tit_mo { display: block; }
     .mo_content_tit { display: block; margin-bottom: 24px; }
     .mo_content_tit > h2 { margin-bottom:16px;color: #161616; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
     .info_intro > p { font-size: 1.4rem; line-height: 1.4;}
     .article_wrap{margin-top:80px; padding:0; border:0;}
     .info_sec > h3.tit { margin-bottom: 40px; font-size: 2.4rem; }
     .point_list > li{flex-direction: column;}
     .card_list.col_3,  .card_list.col_2 { grid-template-columns: 1fr; }
     .card_list > li {padding:32px 32px 50px; min-height: 240px; }
     .modal_bototm { justify-content: center; }
     .modal_bototm > :deep(.btn_big) { width: 100%; flex: 1; }
}
</style>
