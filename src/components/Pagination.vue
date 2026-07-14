<template>
    <div class="pagination" v-if="totalPages > 1">

        <!-- 처음 페이지 -->
        <button v-if="currentPage !== 1" @click="goToPage(1)">
            «
        </button>

        <!-- prev -->
        <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
            이전
        </button>

        <!-- 앞쪽 생략 -->
        <span v-if="showEllipsis && startPage > 1">...</span>

        <!-- page numbers -->
        <button v-for="page in pages" :key="page" :class="{ active: page === currentPage }" @click="goToPage(page)">
            {{ page }}
        </button>

        <!-- 뒤쪽 생략 -->
        <span v-if="showEllipsis && endPage < totalPages">...</span>

        <!-- next -->
        <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
            다음
        </button>

        <!-- 마지막 페이지 -->
        <button v-if="currentPage !== totalPages" @click="goToPage(totalPages)">
            »
        </button>

    </div>
</template>

<script>
export default {
    name: "Pagination",

    props: {
        modelValue: { // 현재 페이지
            type: Number,
            default: 1
        },

        totalPages: { // 🔥 전체 페이지 수 직접 지정
            type: Number,
            required: true
        },

        visiblePages: { // 보여질 페이지 개수
            type: Number,
            default: 5
        },

        showEllipsis: { // ... 표시 여부
            type: Boolean,
            default: false
        }
    },

    emits: ["update:modelValue", "change"],

    computed: {
        currentPage() {
            return this.modelValue;
        },

        startPage() {
            const half = Math.floor(this.visiblePages / 2);
            let start = this.currentPage - half;

            if (start < 1) start = 1;
            if (start + this.visiblePages - 1 > this.totalPages) {
                start = this.totalPages - this.visiblePages + 1;
            }

            return Math.max(start, 1);
        },

        endPage() {
            return Math.min(
                this.startPage + this.visiblePages - 1,
                this.totalPages
            );
        },

        pages() {
            const arr = [];
            for (let i = this.startPage; i <= this.endPage; i++) {
                arr.push(i);
            }
            return arr;
        }
    },

    methods: {
        goToPage(page) {
            const target = Math.min(Math.max(1, page), this.totalPages);
            if (target === this.currentPage) return;

            this.$emit("update:modelValue", target);
            this.$emit("change", target);
        }
    }
};
</script>

<style scoped>
</style>