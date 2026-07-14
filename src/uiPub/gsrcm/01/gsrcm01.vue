<template>
    <div class="cont_inner">
        <header class="title_wrap">
            <h2>{{ t.pageTitle }}</h2>
        </header>

        <div class="button_wrap">
            <Buttons
                v-for="(btn, bIdx) in t.quickBtns"
                :key="'quick-' + bIdx"
                btn-class="btn_icon_arrow btn_big border after"
                :data-popid="btn.popId" 
                :data-type="btn.type"
                :data-cont="btn.cont"
                @click.prevent="onQuickBtnClick($event, btn)"
            >
                {{ btn.text }}
            </Buttons>
        </div>

        <section class="sec_policy">
            <header class="policy_head">
                <h3 class="tit">{{ t.revisionTitle }}</h3>
                <div class="filter_wrap">
                    <div class="filter_year">
                        <SelectBox v-model="selectedYear" :options="t.yearOptions" />
                    </div>
                    <div class="filter_version">
                        <SelectBox v-model="selectedVersion" :options="t.versionOptions" />
                    </div>
                </div>
            </header>

            <p class="lead">{{ t.lead }}</p>

            <aside class="toc_box">
                <h4 class="toc_tit">{{ t.tocTitle }}</h4>
                <ul>
                    <li v-for="(item, idx) in t.tocItems" :key="'toc-' + idx">
                        <span class="num">{{ item.num }}</span>
                        <span class="txt">{{ item.text }}</span>
                    </li>
                </ul>
            </aside>
            <div class="sec_block_wrap">
                <article v-for="(block, bIdx) in t.sections" :key="'sec-' + bIdx" class="sec_block">
                    <header v-if="block.title">
                        <h3 class="tit_md">{{ block.title }}</h3>
                    </header>
                    <p v-for="(line, dIdx) in block.desc" :key="'desc-' + dIdx" class="desc">{{ line }}</p>
                    <ul v-if="block.items?.length">
                        <li v-for="(item, iIdx) in block.items" :key="'item-' + iIdx">
                            <p v-for="(line, lIdx) in item.lines" :key="'line-' + lIdx" class="desc">{{ line }}</p>
                            <div v-if="item.img !== undefined" class="img_scroll">
                                <figure class="img_box" :class="{ is_sm: item.imgSm }" :style="{ backgroundImage: `url(${sectionImgs[item.img]})` }"></figure>
                            </div>
                        </li>
                    </ul>
                    <div v-else-if="block.img !== undefined" class="img_scroll">
                        <figure class="img_box" :class="{ is_sm: block.imgSm }" :style="{ backgroundImage: `url(${sectionImgs[block.img]})` }"></figure>
                    </div>
                </article>
            </div>
        </section>
    </div>



    <!-- modal_wrap · 알기 쉬운 개인정보 처리방침 -->
    <div id="gsrcm0101" class="modal_wrap">
        <div class="modal_container"></div>
    </div>

    <!-- 위치기반서비스 이용약관 -->
    <div id="gsrcm0102" class="modal_wrap">
        <div class="modal_container"></div>
    </div>

    <!-- 고정형 영상정보처리기기 운영·관리 방침 -->
    <div id="gsrcm0103" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
    <div id="gsrcm0103-1" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
    <div id="gsrcm0103-2" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
    <div id="gsrcm0103-3" class="modal_wrap">
        <div class="modal_container"></div>
    </div>


</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";
import SelectBox from "@/components/SelectBox.vue";
import imgGsrcm0101 from "@/assets/images/dummy/gsrcm01_01.png";
import imgGsrcm0102 from "@/assets/images/dummy/gsrcm01_02.png";
import imgGsrcm0103 from "@/assets/images/dummy/gsrcm01_03.png";

const sectionImgs = [imgGsrcm0101, imgGsrcm0102, imgGsrcm0103];

const props = defineProps({
    lang: { type: String, default: "ko" },
});

const langData = {
    ko: {
        pageTitle: "개인정보처리방침",
        revisionTitle: "2026.04.22 개정판 고시",
        lead:
            "GS리테일(이하 ‘회사’)은 정보주체의 자유와 권리 보호를 위해 ｢개인정보 보호법｣및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 ｢개인정보 보호법｣ 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련된 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립•공개합니다.",
        tocTitle: "목차",
        quickBtns: [
            {
                text: "알기 쉬운 개인정보 처리방침",
                popId: "gsrcm0101",
                type: "lg",
                cont: "gsrcm0101",
            },
            { 
                text: "위치기반서비스 이용약관", 
                popId: "gsrcm0102",
                type: "lg",
                cont: "gsrcm0102",
            },
            { text: "영상정보처리기기 운영 관리방침",
              popId: "gsrcm0103",
              type: "lg",
              cont: "gsrcm0103",
            },
        ],
        yearOptions: [
            { value: "2026", label: "2026" },
            { value: "2025", label: "2025" },
            { value: "2024", label: "2024" },
        ],
        versionOptions: [
            { value: "20260422", label: "20260422" },
            { value: "20250422", label: "20250422" },
            { value: "20240422", label: "20240422" },
        ],
        tocItems: [
            { num: "01", text: "개인정보의 처리목적, 처리항목, 처리 및 보유기간" },
            { num: "02", text: "개인정보의 제3자 제공" },
            { num: "03", text: "개인정보의 처리 위탁" },
            { num: "04", text: "개인정보의 파기" },
            { num: "05", text: "개인정보의 안전성 확보조치" },
            { num: "06", text: "14세 미만 아동의 개인정보 처리에 관한 사항" },
            { num: "07", text: "이용자와 법정대리인의 권리 의무 및 행사방법" },
            { num: "08", text: "14세 미만 아동의 개인정보 처리에 관한 사항" },
            { num: "09", text: "자동수집장치의 설치, 운영 및 거부" },
            { num: "10", text: "자동수집장치의 설치, 운영 및 거부" },
            { num: "11", text: "개인정보처리방침의 변경에 관한 사항" },
        ],
        sections: [
            {
                title: "1. 개인정보의 처리목적, 처리항목, 처리 및 보유기간",
                desc: ["회사는 「개인정보 보호법」 에 따라 서비스 제공을 위해 필요 최소한의 범위에서 개인정보를 수집•이용합니다."],
                items: [
                    {
                        lines: [
                            "1) 정보주체의 동의를 받아 처리하는 개인정보 항목",
                            "• 법적 근거: 「개인정보 보호법」 제15조 제1항 제1호 (동의)",
                        ],
                        img: 0,
                        imgSm: false,
                    },
                    {
                        lines: ["2) 정보주체의 동의를 받지 않고 처리하는 개인정보 항목"],
                        img: 1,
                        imgSm: true,
                    },
                ],
            },
            {
                title: "2. 개인정보의 제3자 제공",
                desc: [
                    "회사는 원활한 서비스 제공을 위해 다음의 경우 「개인정보 보호법」 제17조제1항제1호에 따라 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.",
                ],
                img: 2,
                imgSm: false,
            },
        ],
    },
};

const selectedYear = ref("2026");
const selectedVersion = ref("20260422");

const t = computed(() => langData[props.lang] || langData.ko);

// function onQuickBtnClick(event, btn) {
//     if (btn.popId) {
//         modal.open(btn.popId, btn.type || "default", { dataset: { cont: btn.cont } });
//         return;
//     }
//     if (btn.link && btn.link !== "#none") {
//         window.open(btn.link, "_blank");
//     }
// }

function onQuickBtnClick(event, btn) {
    const el = event.currentTarget;

    modal.open(
        btn.popId,
        btn.type || "default",
        el,
        btn.cont
    );
}
</script>

<style scoped>
.title_wrap { padding: 200px 0 100px; }
.title_wrap > h2 { color: #161616; font-size: 7.2rem; font-weight: 700; line-height: 1.24; letter-spacing: -0.02em; text-align: center; }
.panel { padding-top: 80px; }
.button_wrap { width: 100%; margin-bottom: 24px; display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; }
.sec_policy { width: 100%; padding: 60px 0 0; border-top: 1px solid #242428; }
.policy_head { width: 100%; margin-bottom: 40px; display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; }
.policy_head > h3.tit { color: #161616; font-size: 4rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; flex: 1; min-width: 0; }
.filter_wrap { display: flex; flex-shrink: 0; gap: 8px; }
.filter_year { width: 160px; }
.filter_version { width: 200px; }
.filter_wrap :deep(label.select) { width: 100%; display: block; }
.filter_wrap :deep(label.select > div) { display: block; }
.filter_wrap :deep(label.select > div::after) { width: 20px; height: 20px; margin-top: 0; border: 0; background: url('@/assets/images/common/icon_set_20.png') no-repeat -192px -25px; right: 16px; transform: translateY(-50%); }
.filter_wrap :deep(label.select select) { width: 100%; height: 52px; padding: 14px 44px 14px 16px; color: #161616; font-size: 1.6rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; background-color: #f8f8f8; border: 0; border-radius: 12px; -webkit-appearance: none; appearance: none; cursor: pointer; }
.filter_wrap :deep(label.select select.changed) { color: #161616; }
.sec_policy > p.lead { margin-bottom: 60px; color: #161616; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.toc_box { width: 100%; margin-bottom: 60px; padding: 40px 64px; background-color: #f8f8f8; border-radius: 12px; }
.toc_box > h4.toc_tit { margin-bottom: 16px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.toc_box > ul { width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 16px; row-gap: 16px; }
.toc_box > ul > li { display: flex; align-items: flex-start; gap: 4px; }
.toc_box > ul > li > span.num { color: #107af2; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; flex-shrink: 0; }
.toc_box > ul > li > span.txt { color: #161616; font-size: 2rem; font-weight: 400; line-height: 1.35; letter-spacing: -0.01em; }
.sec_block_wrap{padding-top:60px;border-top:1px solid #E5E5E9;}
.sec_block + .sec_block { margin-top: 100px; }
.sec_block > ul { width: 100%; list-style: none; }
.sec_block > ul > li + li { margin-top: 40px; }
.sec_block > header > h3.tit_md { margin-bottom: 40px; padding-left: 42px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; position: relative; }
.sec_block > header > h3.tit_md::before { content: ''; width: 32px; height: 32px; position: absolute; top: 50%; left: 0; transform: translateY(-50%); background-image: url('@/assets/images/sub/icon_cont_32.png'); background-repeat: no-repeat; }
.sec_block:nth-of-type(1) > header > h3.tit_md::before { background-position: -900px -104px; }
.sec_block:nth-of-type(2) > header > h3.tit_md::before { background-position: -100px -266px; }
.sec_block > p.desc, .sec_block > ul > li > p.desc { color: #67676f; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; }
.sec_block > p.desc, .sec_block > ul > li > p.desc:last-of-type { margin-bottom: 20px; }
.sec_block > .img_scroll, .sec_block > ul > li > .img_scroll { width: 100%; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.sec_block > .img_scroll > figure.img_box, .sec_block > ul > li > .img_scroll > figure.img_box { width: 961px; min-width: 961px; height: 670px; flex-shrink: 0; background-color: #e5e5e9; background-repeat: no-repeat; background-position: left top; background-size: 961px auto; border-radius: 12px; }
.sec_block > .img_scroll > figure.img_box.is_sm, .sec_block > ul > li > .img_scroll > figure.img_box.is_sm { height: 152px; background-size: 961px auto; }
@media screen and (max-width: 1024px) {
    .toc_box > ul { grid-template-columns: 1fr; }
}
@media screen and (max-width: 768px) {
    .title_wrap{padding: 100px 0 40px;}
    .title_wrap > h2{ font-weight: 700;font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em; text-align: left;}
    .panel { padding-top: 60px; }
    .button_wrap { margin-bottom: 24px; justify-content: flex-start; }
    .button_wrap :deep(.btn_big) { width: 100%; justify-content: flex-start; }
    .button_wrap :deep(.btn_icon_arrow.after:after){margin-left:auto;}
    .sec_policy { padding-top: 60px; }
    .policy_head { margin-bottom: 8px; flex-direction: column-reverse; align-items: stretch; }
    .policy_head > h3.tit { font-size: 2.4rem; }
    .filter_wrap { width: 100%; flex-wrap: wrap; }
    .filter_year, .filter_version { width: 100%; }
    .sec_policy > p.lead { margin-bottom: 60px; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0;}
    .toc_box { margin-bottom: 60px; padding: 30px 20px; }
    .toc_box > ul{row-gap:10px;}
    .toc_box > h4.toc_tit { margin-bottom: 16px; font-size: 2.4rem; }
    .toc_box > ul > li > span.num{font-weight: 700;font-size: 1.6rem;line-height: 1.24;letter-spacing: 0;}
    .toc_box > ul > li > span.txt { font-size: 1.4rem; line-height: 1.4;}
    .sec_block + .sec_block { margin-top: 62px; }
    .sec_block > ul > li + li { margin-top: 24px; }
    .sec_block > header > h3.tit_md { margin-bottom: 40px; font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
    .sec_block > p.desc, .sec_block > ul > li > p.desc { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
}
</style>
