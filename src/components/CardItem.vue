<template>
    <article class="card_item">
        <div
            v-if="thumbSrc"
            class="card_thumb"
            :role="thumbAlt ? 'img' : undefined"
            :aria-label="thumbAlt || undefined"
            :aria-hidden="thumbAlt ? undefined : true"
            :style="{ backgroundImage: `url(${thumbSrc})` }"
        />
        <div v-if="showBody" class="card_body">
            <em v-if="showNum" class="card_num">
                <slot name="num" />
            </em>
            <h3 v-if="showTitle" class="card_tit">
                <slot name="title" />
            </h3>
            <div v-if="showDesc" class="card_desc">
                <slot />
            </div>
        </div>
    </article>
</template>

<script setup>
import { computed, defineProps, useSlots } from "vue";

defineProps({
    /** import 한 이미지 URL (문자열). 있으면 썸 영역에 background-image로 표시 */
    thumbSrc: { type: String, default: "" },
    /** 썸이 의미 있는 이미지일 때 대체 텍스트. 없으면 장식용으로 처리(aria-hidden) */
    thumbAlt: { type: String, default: "" },
});

const slots = useSlots();

const showNum = computed(() => !!slots.num);
const showTitle = computed(() => !!slots.title);
const showDesc = computed(() => !!slots.default);
const showBody = computed(() => showNum.value || showTitle.value || showDesc.value);
</script>

<style scoped>
.card_item {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
}

.card_thumb {
    flex-shrink: 0;
    width: 100%;
    background-color:#F8F8F8;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.card_body {
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
}



.card_num {color: #107af2;font-style:normal;font-weight: 700;font-size: 2.8rem; line-height: 1.35;letter-spacing: -0.01em;display: block;}
.card_tit {font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em;}
.card_num + .card_tit {margin-top:4px;}
.card_desc{margin-top:16px;color:#67676F;font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;}



.card_desc {
    flex: 1 1 auto;
}

@media screen and (max-width:768px) {
.card_tit {font-size: 1.6rem;line-height: 1.24;letter-spacing: 0%;}
.card_desc {font-size: 1.6rem;}
}

</style>
