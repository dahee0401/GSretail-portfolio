<template>
    <div class="modal_cont gsrcm0102">
        <div class="modal_header">
            <span class="tit_pc" v-html="t.title"></span>
            <span class="tit_mo" v-html="t.titleMoHeader"></span>
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <header class="mo_content_tit">
                <h2 v-html="t.title"></h2>
            </header>

            <ol class="ft_sec_list">
                <li v-for="(section, sIdx) in t.sections" :key="'sec-' + sIdx">
                    <article>
                        <h4>{{ section.title }}</h4>
                        <div class="ft_stack">
                            <p v-if="section.lead">{{ section.lead }}</p>
                            <ul v-if="section.items" class="plain_list">
                                <li v-for="(row, rIdx) in section.items" :key="'row-' + sIdx + '-' + rIdx">
                                    <p>{{ row.title }}</p>
                                    <ul v-if="row.details">
                                        <li v-for="(detail, dIdx) in row.details" :key="'detail-' + sIdx + '-' + rIdx + '-' + dIdx">{{ detail }}</li>
                                    </ul>
                                </li>
                            </ul>
                            <div v-if="section.img !== undefined" class="img_scroll">
                                <figure class="img_box" :class="{ is_sm: section.imgSm }" :style="{ backgroundImage: `url(${sectionImgs[section.img]})` }"></figure>
                            </div>
                        </div>
                    </article>
                </li>
            </ol>
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
import imgGsrcm0102 from "@/assets/images/dummy/gsrcm01_02.png";

const sectionImgs = [imgGsrcm0102];

const props = defineProps({
    lang: { type: String, default: "ko" },
});

const langData = {
    ko: {
        title: "위치기반서비스 이용약관",
        titleMoHeader: "이용약관",
        closeLabel: "닫기",
        submitLabel: "확인",
        sections: [
            {
                title: "제 1 조 (목적)",
                lead: "이 약관은 (주)GS리테일(이하 “회사”)이 제공하는 위치기반서비스에 대해 회사와 위치기반서비스를 이용하는 개인위치정보주체(이하 “이용자)간의 권리, 의무 및 책임사항, 기타 필요한 사항 규정을 목적으로 합니다.",
            },
            {
                title: "제 2 조 (이용약관의 효력 및 변경)",
                items: [
                    { title: "① 본 약관은 이용자가 본 약관에 동의하고 회사가 정한 절차에 따라 위치기반서비스의 이용자로 등록됨으로써 효력이 발생합니다." },
                    { title: "② 이용자가 본 약관의 “동의하기” 버튼을 클릭하였을 경우 본 약관의 내용을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한 것으로 봅니다." },
                    { title: "③ 회사는 위치기반서비스의 변경사항을 반영하기 위한 목적 등으로 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 수정할 수 있습니다." },
                    { title: "④ 약관이 변경되는 경우 회사는 변경사항을 그 적용일자 최소 7일 전에 회사의 홈페이지 또는 서비스 공지사항 등(이하, 홈페이지 등)을 통해 공지합니다. 다만, 개정되는 내용이 이용자 권리의 중대한 변경을 발생시키는 경우 적용일 최소 30일 전에 홈페이지 등에 공지합니다." },
                    { title: "⑤ 회사가 전항에 따라 이용자에게 공지 또는 통지한 경우 이용자가 공지 또는 통지⋅고지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 약관에 승인한 것으로 봅니다. 이용자가 개정약관에 동의하지 않을 경우 본 약관에 대한 동의를 철회 할 수 있습니다." },
                ],
            },
            {
                title: "제 3 조 (약관 외 준칙)",
                lead: "이 약관에 명시되지 않은 사항에 대해서는 위치정보의 보호 및 이용 등에 관한 법률, 개인정보보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계법령 및 회사가 정한 지침 등의 규정에 따릅니다.",
                img: 0,
                imgSm: true,
            },
        ],
    },
    en: {},
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
.modal_header{margin-bottom:80px;}
.modal_header > .tit_mo { display: none; }
.mo_content_tit { display: none; }
.ft_sec_list{gap:60px;}
.ft_sec_list > li > article{gap:40px;}
.ft_stack{padding-left:0;}
.ft_stack p{margin:0;}
.ft_stack p + .img_scroll{margin-top:20px;}
.ft_stack > .img_scroll { width: 100%; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.ft_stack > .img_scroll > figure.img_box { width: 961px; min-width: 961px; height: 670px; flex-shrink: 0; background-color: #e5e5e9; background-repeat: no-repeat; background-position: left top; background-size: 961px auto; border-radius: 12px; }
.ft_stack > .img_scroll > figure.img_box.is_sm { height: 152px; background-size: 961px auto; }
.modal_bototm { margin-top: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.modal_bototm > :deep(.btn_big) { width: 134px; text-align: center; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.ft_sec_list{padding:0;}


@media (min-width: 769px) {
    .ft_sec_list > li > article > h4{font-size: 2.4rem;}

}
@media (max-width: 768px) {
    .modal_header{margin-bottom:40px;}
    .modal_header > .tit_pc { display: none; }
    .modal_header > .tit_mo { display: block; }
    .ft_stack p{font-size: 1.4rem;line-height: 1.4;}
    .mo_content_tit { display: block; }
    .mo_content_tit > h2 { margin-bottom: 80px; color: #161616; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .modal_bototm { justify-content: center; }
    .modal_bototm > :deep(.btn_big) { width: 100%; flex: 1; }
}
</style>
