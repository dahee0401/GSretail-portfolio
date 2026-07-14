<template>
    <dl class="board_type_toggle" :class="{ single: !multiple }">
        <slot />
    </dl>
</template>

<script setup>
import { ref, computed, provide, defineProps } from "vue";

const ACCORDION_INJECT_KEY = Symbol.for("gsretail.accordion.context");

const props = defineProps({
    /** false: 한 번에 하나만 열림 · true: 여러 패널 동시 오픈 */
    multiple: { type: Boolean, default: false },
});

const openSingle = ref(null);
const openMulti = ref([]);

function normalizeKey(key) {
    return String(key);
}

const isOpen = (key) => {
    const k = normalizeKey(key);
    if (props.multiple) return openMulti.value.includes(k);
    return openSingle.value === k;
};

const toggle = (key) => {
    const k = normalizeKey(key);
    if (props.multiple) {
        const arr = openMulti.value;
        const i = arr.indexOf(k);
        openMulti.value =
            i >= 0 ? arr.filter((x) => x !== k) : [...arr, k];
    } else {
        openSingle.value = openSingle.value === k ? null : k;
    }
};

provide(ACCORDION_INJECT_KEY, {
    isOpen,
    toggle,
    multiple: computed(() => props.multiple),
});
</script>

<style scoped>
</style>
