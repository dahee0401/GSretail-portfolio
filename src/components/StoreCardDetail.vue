<template>
    <div class="detail_card">
        <!-- 담당자 -->
        <div class="detail_manager">
            <div class="manager_photo"></div>
            <div class="manager_info">
                <span class="manager_label">담당자</span>
                <p class="manager_name">{{ item.managerName || '한승희 창업지원담당' }}</p>
                <a :href="'tel:' + (item.managerTel || '053-6789-0123')" class="manager_tel">
                    {{ item.managerTel || '053-6789-0123' }}
                </a>
            </div>
            <Buttons btn-class="btn_xl fill primary btn_icon_arrow after">무료 상담 신청하기</Buttons>
        </div>

        <!-- 상세 정보 -->
        <ul class="detail_info_list">
            <li>
                <span>면적</span>
                <strong>{{ item.area }}</strong>
            </li>
            <li>
                <span>투자비</span>
                <strong>{{ item.cost }}</strong>
            </li>
            <li>
                <span>타입</span>
                <strong>{{ Array.isArray(item.type) ? item.type.join(', ') : item.type }}</strong>
            </li>
            <li>
                <span>유형</span>
                <strong>{{ item.form }}</strong>
            </li>
            <li class="cell_full">
                <span>상권 특징</span>
                <p>{{ item.feature }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps } from "vue";
import Buttons from "@/components/Buttons.vue";

defineProps({
    item: { type: Object, required: true },
});
</script>

<style scoped>
/* 카드 */
.detail_card { --color-brand-primary: #15b874; }
.detail_card :deep([class*="btn_"][class*="fill"][class*="primary"]) { color: #fff; background-color: var(--color-brand-primary); }
.detail_card { padding: 32px 40px; background: #fff; border: 1px solid var(--color-brand-primary); border-radius: 12px; display: flex; flex-direction: column; gap: 32px; }

/* 담당자 */
.detail_manager { display: flex; align-items: center; gap: 28px; }
.manager_photo { width: 103px; height: 103px; background: #e5e5e9; border-radius: 50%; flex-shrink: 0; }
.manager_info { min-width: 300px; text-align: left;}
.manager_label { color: #161616; font-size: 1.6rem; font-weight: 700; }
.manager_name { margin-top: 2px; color: #161616; font-size: 2.8rem; font-weight: 700; letter-spacing: -0.01em; }
.manager_tel { margin-top: 16px; color:  var(--color-brand-primary); font-size: 2rem; letter-spacing: -0.01em; text-decoration: none; display: inline-flex; align-items: center; gap: 12px; }
.manager_tel::before { content: ''; width: 16px; height: 16px; background:url('@/assets/images/sub/icon_tel.png') no-repeat 0 0; display: inline-block; }
.detail_manager :deep([class*="btn_"]) { flex-shrink: 0; }

/* 상세 정보 */
.detail_info_list { list-style: none; margin: 0; padding: 0; border-top: 1px solid #e5e5e9; border-bottom: 1px solid #e5e5e9; display: flex; flex-wrap: wrap; }
.detail_info_list > li { flex: 1; display: flex; align-items: center; gap: 26px; padding: 27px 24px; min-height: 80px; }
.detail_info_list > li > span { color: #67676f; font-size: 1.8rem; white-space: nowrap; display: inline-flex; align-items: center; gap: 8px; }
.detail_info_list > li > span::before { content: ''; width: 24px; height: 24px; display: inline-block; }
.detail_info_list > li:nth-of-type(1) > span::before { background:url('@/assets/images/sub/icon_gsrst0103_01.png') no-repeat 0 0 / contain; }
.detail_info_list > li:nth-of-type(2) > span::before { background:url('@/assets/images/sub/icon_gsrst0103_02.png') no-repeat 0 0 / contain; }
.detail_info_list > li:nth-of-type(3) > span::before { background:url('@/assets/images/sub/icon_gsrst0103_03.png') no-repeat 0 0 / contain; }
.detail_info_list > li:nth-of-type(4) > span::before { background:url('@/assets/images/sub/icon_gsrst0103_04.png') no-repeat 0 0 / contain; }
.detail_info_list > li:nth-of-type(5) > span::before { background:url('@/assets/images/sub/icon_gsrst0103_05.png') no-repeat 0 0 / contain; }
.detail_info_list > li > strong { color: #161616; font-size: 1.8rem; font-weight: 700; }
.detail_info_list > li.cell_full { flex: 1 0 100%; flex-direction: column; align-items: flex-start; gap: 8px; padding: 16px 24px; border-top: 1px solid #E5E5E9;}
.detail_info_list > li.cell_full > p { color: #161616; font-size: 1.8rem; line-height: 1.4; }

@media (max-width: 768px) {
    .detail_card { padding: 22px 20px; }
    .detail_manager { flex-wrap: wrap; column-gap: 24px; row-gap: 16px; }
    .manager_photo { width: 80px; height: 80px; }
    .manager_info { min-width: 0; }
    .manager_label { color: #161616; font-size: 1.4rem; font-weight: 400; line-height: 1.4; letter-spacing: -0.01em; }
    .manager_name { font-size: 1.8rem; line-height: 1.35; }
    .manager_tel { margin-top: 12px; color:var(--color-brand-primary); font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .detail_manager :deep([class*="btn_"]) { width: 100%; height: 44px; margin-left: 0; font-size: 1.6rem; }
    .detail_info_list { border-top: 0; }
    .detail_info_list > li { flex: 1 0 100%; min-height: 56px; padding: 18px 0; gap: 10px; border-top: 1px solid #e5e5e9; }
    .detail_info_list > li.cell_full { padding: 16px 0; gap: 8px; }
    .detail_info_list > li > span { min-width: 80px; color: #67676f; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .detail_info_list > li > span::before { width: 20px; height: 20px; }
    .detail_info_list > li > strong { color: #161616; font-size: 1.6rem; font-weight: 700; line-height: 1.24; }
    .detail_info_list > li.cell_full > p { padding-left: 32px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
}
</style>
