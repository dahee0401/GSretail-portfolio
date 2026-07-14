<template>
    <div class="tab_wrap" :class="{tabSlide}" ref="tabWrap">
        <!-- more button -->
        <a v-if="moreTxt" :href="moreLink" class="more">{{ moreTxt }}</a>
        <!-- //more button -->

        <ul :class="tabClass" ref="tabList" :style="tabTransformStyle">
            <li 
                v-for="(item, index) in tabItems" 
                :key="index" 
                :class="{ current: currentTab === index && !item.link }"
            >
                <!-- 26.06.25 add 정다희 : link 있으면 외부 이동, 없으면 기존 탭 전환 -->
                <a
                    v-if="item.link"
                    :href="item.link"
                    :target="item.target || '_blank'"
                    rel="noopener noreferrer"
                    class="item"
                >{{ item.item }}</a>
                <a v-else href="javascript:void(0);" class="item" @click="selectTab(index)">{{ item.item }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed, watch, onMounted, nextTick } from "vue";

export default {
    name: "Tabs",
    props: {
        tabItems: { type: Array, required: true },
        modelValue: { type: Number, default: 0 }, // v-model
        tabClass: { type: String, default: "type_01" },
        tabSlide: { type: Boolean, default: false }, // 'slide' 등
        moreLink: { type: String, default: "#" },
        moreTxt: { type: String, default: "" },
    },
    emits: ["update:modelValue", "change"],
    setup(props, { emit }) {
        const currentTab = ref(props.modelValue);
        const tabWrap = ref(null);
        const tabList = ref(null);
        const transformX = ref(0);

        // v-model sync
        watch(() => props.modelValue, val => {
            currentTab.value = val;
        });

        const tabTransformStyle = computed(() => ({
            transform: `translateX(${transformX.value}px)`
        }));

        const selectTab = (index) => {
            currentTab.value = index;
            emit("update:modelValue", index);
            emit("change", index);
            nextTick(() => adjustSlide(index));
        };

        const adjustSlide = (index) => {
            if (!props.tabSlide) return;

            const wrap = tabWrap.value;
            const list = tabList.value;
    
            if (!wrap || !list) return;

            const wrapWidth = wrap.offsetWidth;
            const listWidth = list.scrollWidth;

            if (listWidth <= wrapWidth) {
                transformX.value = 0;
                return;
            }

            const item = list.children[index];
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            let newX = wrapWidth / 2 - itemCenter;

            // 제한
            newX = Math.min(0, newX);
            newX = Math.max(wrapWidth - listWidth, newX);

            transformX.value = newX;
        };

        // 초기 슬라이드 조정
        onMounted(() => nextTick(() => adjustSlide(currentTab.value)));

        // ===========================
        // 터치 이벤트 (모바일)
        // ===========================
        onMounted(() => {
            if (!props.tabSlide) return;

            const list = tabList.value;
            const wrap = tabWrap.value;
            if (!list || !wrap) return;

            let startX = 0;
            let lastX = 0;

            const onTouchStart = (e) => {
                startX = e.touches[0].clientX;
                lastX = transformX.value;
            };

            const onTouchMove = (e) => {
                const delta = e.touches[0].clientX - startX;
                let newX = lastX + delta;

                // 제한
                newX = Math.min(0, newX);
                newX = Math.max(wrap.offsetWidth - list.scrollWidth, newX);

                transformX.value = newX;
            };

            list.addEventListener("touchstart", onTouchStart, { passive: true });
            list.addEventListener("touchmove", onTouchMove, { passive: true });

            // ===========================
            // 마우스 이벤트 (PC)
            // ===========================
            let isDragging = false;
            let dragStartX = 0;
            let dragStartTransform = 0;

            const onMouseDown = (e) => {
                isDragging = true;
                dragStartX = e.clientX;
                dragStartTransform = transformX.value;
                e.preventDefault();
            };

            const onMouseMove = (e) => {
                if (!isDragging) return;
                let delta = e.clientX - dragStartX;
                let newX = dragStartTransform + delta;
                newX = Math.min(0, newX);
                newX = Math.max(wrap.offsetWidth - list.scrollWidth, newX);
                transformX.value = newX;
            };

            const onMouseUp = () => {
                isDragging = false;
            };

            list.addEventListener("mousedown", onMouseDown);
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        });

        return { currentTab, selectTab, tabWrap, tabList, tabTransformStyle };
    },
};
</script>

<style scoped>
</style>