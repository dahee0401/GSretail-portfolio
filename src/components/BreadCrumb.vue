<template>
    <div class="breadcrumb">
        <ul>
            <!-- home -->
            <li class="home">
                <a href="/">Home</a>
            </li>

            <!-- depth1 -->
            <li v-if="depth1" class="depth_1" @focusin="setFocus($event)" @focusout="removeFocus($event)">
                <button v-if="depth1.children?.length">{{ depth1.text }}</button>
                <a v-else :href="depth1.link">{{ depth1.text }}</a>

                <ul v-if="depth1.children?.length">
                    <li v-for="child in depth1.children" :key="child.link">
                        <a :href="child.link" @click="close($event)">{{ child.text }}</a>
                    </li>
                </ul>
            </li>

            <!-- depth2 -->
            <li v-if="depth2" class="depth_2" @focusin="setFocus($event)" @focusout="removeFocus($event)">
                <button v-if="depth2.children?.length">{{ depth2.text }}</button>
                <a v-else :href="depth2.link">{{ depth2.text }}</a>

                <ul v-if="depth2.children?.length">
                    <li v-for="child in depth2.children" :key="child.link">
                        <a :href="child.link" @click="close($event)">{{ child.text }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    name: "Breadcrumb",

    props: {
        items: {
            type: Array,
            default: () => []
        }
    },

    computed: {
        depth1() {
            return this.items[0] || null;
        },
        depth2() {
            return this.items[1] || null;
        }
    },

    methods: {
        close(e) {
            const el = e.currentTarget;
            const openParent = el.closest(".is_open");

            el.closest('ul').previousElementSibling.textContent = el.textContent;

            document.activeElement.blur();

            // setTimeout(() => {
            //     // openParent.classList.remove("is_open");
            // }, 150);
        },
        /* 접근성 관련 */
        setFocus(e) {
            const li = e.currentTarget;
            const CLOSE_DELAY = 150; // methods 안에서 상수 정의

            // 기존에 타이머가 있으면 clear
            if (li.closeTimer) clearTimeout(li.closeTimer);

            li.closeTimer = setTimeout(() => {
                if (li.contains(document.activeElement)) {
                    li.classList.add("is_open");
                }
                li.closeTimer = null;
            }, CLOSE_DELAY);
        },
        removeFocus(e) {
            const li = e.currentTarget;
            const CLOSE_DELAY = 150; // methods 안에서 상수 정의

            if (li.closeTimer) clearTimeout(li.closeTimer);

            li.closeTimer = setTimeout(() => {
                if (!li.contains(document.activeElement)) {
                    li.classList.remove("is_open");
                }
                li.closeTimer = null;
            }, CLOSE_DELAY);
        }
        /* //접근성 관련 */
    }
};
</script>

<style scoped></style>