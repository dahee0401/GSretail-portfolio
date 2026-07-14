<script setup>
import { defineProps } from "vue";

defineProps({
    items: { type: Array, default: () => [] },
    showIcon: { type: Boolean, default: false },
    descClass: { type: String, default: "" },
});
</script>

<template>
    <ul v-if="items && items.length" class="num_info_list">
        <li v-for="(item, ii) in items" :key="ii" class="num_info_item">
            <article>
                <div v-if="showIcon" class="num_info_icon" aria-hidden="true"></div>
                <div class="num_info_content">
                    <div class="num_info_title">
                        <span v-if="item.em || item.num" class="num_info_num">{{ item.em || item.num }}</span>
                        <strong>
                            {{ item.title }}
                            <a
                                v-if="item.link"
                                :href="item.link"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="num_info_link"
                                aria-label="링크 바로가기"
                            />
                        </strong>
                    </div>
                    <div class="num_info_body">
                        <p v-if="item.desc" :class="descClass" v-html="item.desc"></p>
                        <ul v-if="item.bullets && item.bullets.length" class="list_dotted">
                            <li v-for="(b, bi) in item.bullets" :key="bi"><p>{{ b }}</p></li>
                        </ul>
                    </div>
                </div>
            </article>
        </li>
    </ul>
</template>

<style scoped>
.num_info_list { margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; }
.num_info_item { padding: 64px 0; border-bottom: 1px solid #e5e5e9; }
.num_info_item:nth-child(-n+2) { padding-top: 0; }
.num_info_item:last-child, .num_info_item:nth-last-child(2):nth-child(odd) { border-bottom: none; }
.num_info_item > article { display: flex; gap: 24px; align-items: flex-start; }
.num_info_icon { width: 80px; height: 80px; background-color: #f2f2f4; border-radius: 50%; flex-shrink: 0; position:relative;}
.num_info_icon:before { content:''; width: 40px; height: 40px; background-image: url('@/assets/images/sub/icon_cont_40.png'); background-repeat: no-repeat; display: block; position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); filter: brightness(0) saturate(100%) invert(28%) sepia(65%) saturate(2816%) hue-rotate(202deg) brightness(102%) contrast(90%);}
.num_info_item:nth-of-type(1) .num_info_icon:before { background-position: -900px -267px; }
.num_info_item:nth-of-type(2) .num_info_icon:before { background-position: -820px -267px; }
.num_info_item:nth-of-type(3) .num_info_icon:before { background-position: -500px -344px; }
.num_info_item:nth-of-type(4) .num_info_icon:before { background-position: -500px -344px; background: red; }
.num_info_title { margin-bottom: 24px; }
.num_info_num, .num_info_title > strong { font-size: 2.8rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.num_info_num { margin-bottom: 4px; color: #107af2; display:inline-block; }
.num_info_title > strong { color: #161616; display: flex; align-items: center; gap: 8px; }
.num_info_link { width: 24px; height: 24px; border-radius: 4px; flex-shrink: 0; display: inline-flex; align-items:center;}
.num_info_link:after {width:24px; height:24px; background:url('@/assets/images/common/icon_set_24.png') -832px -15px no-repeat; content:''; display:block;}
.num_info_body > p { color: #67676f; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
.num_info_body > p.num_info_desc_light { font-weight: 400; }
.num_info_body .list_dotted { margin-top: 16px; }
.num_info_body .list_dotted > li::before { background-color: #67676f; }
.num_info_body .list_dotted > li + li { margin-top: 6px; }
.num_info_body .list_dotted > li > p { color:#67676f; font-size: 1.8rem; line-height: 1.4; }
@media (max-width: 768px) {
    .num_info_list { grid-template-columns: 1fr; gap: 40px; }
    .num_info_item { padding: 0; border: 0; }
    .num_info_item > article { gap: 16px; }
    .num_info_icon { width: 60px; height: 60px; }
    .num_info_content { gap: 6px; }
    .num_info_num { font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
    .num_info_title { margin-bottom: 6px; }
    .num_info_title > strong { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
    .num_info_body > p { font-size: 1.6rem; line-height: 1.24; letter-spacing: 0; }
    .num_info_body .list_dotted > li p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .num_info_body .list_dotted > li + li { margin-top: 4px; }
    .num_info_icon:before { width: 32px; height: 32px; background-image: url('@/assets/images/sub/icon_cont_32.png');}
}
</style>
