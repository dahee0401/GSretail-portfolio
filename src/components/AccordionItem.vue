<template>
    <!-- 26.04.20 이종환 Del : div class="acc_item" 제거 -->
    <dt>
        <a
            :id="headerId"
            href="#none"
            class="acc_tit_btn"
            :class="{ acc_tit_open: expanded }"
            role="button"
            :aria-expanded="expanded"
            :aria-controls="panelId"
            @click.prevent="onToggle"
            @keydown.enter.prevent="onToggle"
            @keydown.space.prevent="onToggle"
        >
            <slot name="title">제목</slot>
        </a>
    </dt>
    <dd
        :id="panelId"
        ref="panelRef"
        class="acc_panel"
        role="region"
        :aria-labelledby="headerId"
        :aria-hidden="!expanded"
    >
        <div class="acc_panel_inner">
            <div class="acc_panel_cont">
                <slot />
            </div>
        </div>
    </dd>
</template>

<script setup>
import {
    computed,
    inject,
    defineProps,
    defineEmits,
    defineExpose,
    ref,
    watch,
    nextTick,
} from "vue";

const ACCORDION_INJECT_KEY = Symbol.for("gsretail.accordion.context");

const props = defineProps({
    /** Accordion 내에서 고유한 키 (문자·숫자) */
    itemKey: { type: [String, Number], required: true },
});

const emit = defineEmits(["opened", "closed"]);

const ctx = inject(ACCORDION_INJECT_KEY, null);

const expanded = computed(() => {
    if (!ctx) return false;
    return ctx.isOpen(props.itemKey);
});

const headerId = computed(() => `acc-h-${normalize(props.itemKey)}`);
const panelId = computed(() => `acc-p-${normalize(props.itemKey)}`);

const panelRef = ref(null);

/** 펼침/닫힘 전환 겹침 시 이전 transitionend 무시 */
let transitionToken = 0;

function normalize(key) {
    return String(key).replace(/\s+/g, "-");
}

function onToggle() {
    if (!ctx) {
        console.warn("[AccordionItem] Accordion 바깥에서 사용되었습니다.");
        return;
    }
    ctx.toggle(props.itemKey);
}

function expandPanel() {
    const el = panelRef.value;
    if (!el) return;
    if (el.classList.contains("acc_show") && el.style.height === "auto") {
        return;
    }

    const myToken = ++transitionToken;
    el.classList.add("acc_animating");
    el.classList.add("acc_show");
    el.style.height = "auto";
    const heightPx = `${el.scrollHeight}px`;
    el.style.height = "0px";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (myToken !== transitionToken) return;
            el.style.height = heightPx;
        });
    });

    const onEnd = (e) => {
        if (e.target !== el || e.propertyName !== "height") return;
        if (myToken !== transitionToken) {
            if (!expanded.value) {
                el.classList.remove("acc_show", "acc_animating");
                el.style.height = "";
            }
            return;
        }
        el.style.height = "auto";
        el.classList.remove("acc_animating");
        emit("opened");
    };
    el.addEventListener("transitionend", onEnd, { once: true });
}

function collapsePanel() {
    const el = panelRef.value;
    if (!el) return;
    if (!el.classList.contains("acc_show")) {
        return;
    }

    const myToken = ++transitionToken;
    el.classList.add("acc_animating");
    const h = el.scrollHeight;
    if (h === 0) {
        el.classList.remove("acc_show");
        el.classList.remove("acc_animating");
        el.style.height = "";
        return;
    }
    el.style.height = `${h}px`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (myToken !== transitionToken) return;
            el.style.height = "0px";
        });
    });

    const onEnd = (e) => {
        if (e.target !== el || e.propertyName !== "height") return;
        if (myToken !== transitionToken) {
            if (!expanded.value) {
                el.classList.remove("acc_show", "acc_animating");
                el.style.height = "";
            }
            return;
        }
        el.classList.remove("acc_show");
        el.classList.remove("acc_animating");
        el.style.height = "";
    };
    el.addEventListener("transitionend", onEnd, { once: true });
}

watch(
    expanded,
    (open, wasOpen) => {
        if (wasOpen === undefined && !open) return;
        nextTick(() => {
            if (open) expandPanel();
            else collapsePanel(); 
        });
    },
    { flush: "post" }
);

defineExpose({ expanded });
</script>

<style scoped>
</style>
