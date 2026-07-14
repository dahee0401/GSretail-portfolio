<template>
    <a
        :href="href"
        :target="blank ? '_blank' : target"
        :rel="blank ? 'noopener noreferrer' : rel || undefined"
        :class="['anchor_btn', `anchor_btn_${size}`]"
    >
        <slot />
    </a>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    href: { type: String, default: "#none" },
    blank: { type: Boolean, default: false },
    target: { type: String, default: "_self" },
    rel: { type: String, default: "" },
    /** "md"(기본) : 72×72, 배경 #F2F2F4 / "sm" : 아이콘만 16×16, 배경 투명 */
    size: { type: String, default: "md" },
});
</script>

<style scoped>
.anchor_btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    flex-shrink: 0;
}

/* md (기본) */
.anchor_btn_md {
    width: 72px;
    height: 72px;
    border-radius: 10px;
    background-color: #f2f2f4;
}

.anchor_btn_md::after {
    content: "";
    display: block;
    width: 24px;
    height: 24px;
    background-image: url("@/assets/images/icon/ico_goLink.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

/* sm */
.anchor_btn_sm {
    width: 16px;
    height: 16px;
    padding: 0;
    background-color: transparent;
}

.anchor_btn_sm::after {
    content: "";
    display: block;
    width: 16px;
    height: 16px;
    background-image: url("@/assets/images/icon/ico_goLink.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}
</style>
