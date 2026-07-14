<template>
    <figure v-if="hero" class="brand_panel_bg" :style="heroBg ? { backgroundColor: heroBg } : {}">
        <img :src="hero" :alt="heroAlt || ''" width="1420" height="340" />
    </figure>

    <header v-if="title" class="brand_panel_title">
        <h2 v-html="title"></h2>
        <p v-if="desc" v-html="desc" />
        <slot />
    </header>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    hero:    { type: String, default: null },
    heroAlt: { type: String, default: "" },
    title:   { type: String, default: "" },
    desc:    { type: String, default: "" },
    heroBg:  { type: String, default: "" },
});
</script>

<style scoped>
img {
    width: 100%;
    display: block;
}

.brand_panel_bg {
    margin: 0 0 40px;
    padding: 0;
    background-color: #e8e8ec;
    border-radius: 12px;
    overflow: hidden; 
}
@media (max-width: 768px) {
    .brand_panel_bg {
        border-radius: 0;
    }
}

.brand_panel_bg > img {
    object-fit: cover;
}

.brand_panel_title {
    padding: 0 0 100px;
}

.brand_panel_title > h2 {
    margin: 0 0 16px;
    color: #161618;
    font-size: 4rem;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.01em;
}

.brand_panel_title > p {
    margin: 0;
    color: #161618;
    font-size: 2.4rem;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: -0.01em;
}
@media (max-width: 768px){
    .brand_panel_title{
        padding: 0 0 64px;
    }
    .brand_panel_bg {
        margin: 0 0 24px;
    }
}

@media (max-width: 1024px) {
    .brand_panel_title > h2 {
        font-size: 3.2rem;
    }

    .brand_panel_title > p {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .brand_panel_bg > img{
        max-height: 245px;
    }
    .brand_panel_title > h2 {
        margin-bottom: 12px;
        font-family: Pretendard;
        font-size: 2.8rem;
        line-height: 1.35;
        letter-spacing: -0.01em;

    }

    .brand_panel_title > p {
        font-size: 1.6rem;
        line-height: 1.5;
        letter-spacing: -0.01em;

    }
}
</style>
