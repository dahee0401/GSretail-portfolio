<template>
    <div class="search_wrap">
        <!-- select -->
        <SelectBox v-if="useSelect" :options="search_opt" :modelValue="searchValue.type"  @update:modelValue="onChangeType" :initMsg="initMsg" />

        <div class="input_search_wrap">
            <!-- input -->
            <Inputs type="text" :placeholder="placeholder" v-model="searchValue.keyword" @update:modelValue="onChangeKeyword" />
            <!-- button -->
            <button class="btn_search" @click="onSearch">검색</button>
        </div>
    </div>
</template>

<script>
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "Search",

    components: {
        Inputs,
        SelectBox,
        Buttons,
    },

    props: {
        useSelect: { // 26.04.21 이종환 Add : select 사용 여부 선택
            type: Boolean,
            default: true
        },
        initMsg: {
            type: String,
            default: "선택하세요."
        },
        search_opt: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: Object,
            default: () => ({
                type: "",
                keyword: ""
            })
        },
        placeholder: {
            type: String,
            default: "문구를 입력하세요."
        }

    },

    emits: ["update:modelValue", "search"],

    computed: {
        searchValue: {
            get() {
                return this.modelValue;
            },
            set(v) {
                this.$emit("update:modelValue", v);
            }
        }
    },

    methods: {
        onChangeType(val) {
            this.searchValue = {
                ...this.searchValue,
                type: val
            };
        },

        onChangeKeyword(val) {
            this.searchValue = {
                ...this.searchValue,
                keyword: val
            };
        },

        onSearch() {
            this.$emit("search", this.searchValue);
        }
    }
};
</script>