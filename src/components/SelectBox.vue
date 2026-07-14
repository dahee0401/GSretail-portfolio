<template>
    <label class="select">
        <div>
            <select :class="{ changed }" :value="modelValue" @change="onChange" :disabled="isDisabled">
                <!-- placeholder -->
                <option value="" disabled :hidden="modelValue !== ''">
                <!-- <option value="" disabled hidden> -->
                    {{ initMsg }}
                </option>

                <!-- options -->
                <option v-for="(select, i) in options" :key="i" :value="select.value">
                    {{ select.label }}
                </option>
            </select>
        </div>
    </label>
</template>

<script>
export default {
    name: "SelectBox",

    props: {
        initMsg: {
            type: String,
            default: "선택하세요."
        },
        options: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: [String, Number],
            default: ""
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    },

    emits: ["update:modelValue", "change"],

    computed: {
        changed() {
            return this.modelValue !== "" && this.modelValue !== null;
        }
    },

    methods: {
        onChange(e) {
            const value = e.target.value;
            this.$emit("update:modelValue", value);
            this.$emit("change", value);
        }
    }
};
</script>

<style scoped></style>