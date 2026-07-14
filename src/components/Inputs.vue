<template>
    <div class="input_wrap" :class="[wrapperTypeClass, $attrs.class]" :style="$attrs.style">
        <label v-if="isCheckType" :class="['check', { check_ani: isswitch, is_checked: isChecked }]">
            <input :id="id" :name="name" :type="type" :value="value" v-model="model" :disabled="isDisabled" />
            <em class="label">{{ text }}</em>
        </label>

        <div v-else class="label_wrap">
            <label class="input" :class="{ 'is_search': type === 'search' }">
                <i v-if="showPlaceholder">{{ placeholder }}</i>
                <input ref="inputRef" v-bind="inputRestAttrs" :id="id" :name="name" :type="currentType" v-model="model" :readonly="inputReadonly" :disabled="isDisabled" @focus="isFocused = true" @blur="isFocused = false" />
                
                <Buttons v-if="showClear" btn-class="icon_del" :class="{ active: hasValue }" @click.prevent="clear">전체삭제</Buttons>

                <button v-if="isPassword" :class="[passwordClass, { active: hasValue }]" @click.prevent="togglePassword" />
            </label>

            <em v-if="isError" class="err_txt">{{ errText }}</em>
        </div>
    </div>
</template>

<script>
import Buttons from "@/components/Buttons.vue";

export default { 
    name: "Inputs",
    inheritAttrs: false,
    components: {
        Buttons
    },
    props: {
        id: { type: String, default: "" },
        name: { type: String, default: "" },
        type: { type: String, default: "text" },
        value: { type: [String, Number, Boolean], default: null },
        modelValue: { type: [String, Number, Boolean, Array], default: "" },
        text: { type: String, default: "" },
        placeholder: { type: String, default: "" },
        errText: { type: String, default: "" },
        isError: { type: Boolean, default: false },
        isReadonly: { type: Boolean, default: false },
        readonly: { type: Boolean, default: false },
        readOnly: { type: Boolean, default: false },
        isDisabled: { type: Boolean, default: false },
        isswitch: { type: Boolean, default: false }
    },
    emits: ["update:modelValue"],
    data() {
        return {
            model: this.modelValue,
            isFocused: false,
            showPassword: false
        };
    },
    watch: {
        model(v) { this.$emit("update:modelValue", v); },
        modelValue(v) { this.model = v; }
    },
    computed: {
        wrapperTypeClass() { return [`type-${this.type}`, { err: this.isError, disabled: this.isDisabled }]; },
        inputRestAttrs() {
            const rest = { ...this.$attrs };
            delete rest.class;
            delete rest.style;
            return rest;
        },
        isPassword() { return this.type === "password"; },
        isCheckType() { return this.type === "checkbox" || this.type === "radio"; },
        isChecked() {
            if (!this.isCheckType) return false;
            if (this.type === "radio") return this.model === this.value;
            if (Array.isArray(this.model)) return this.model.includes(this.value);
            if (typeof this.model === "boolean") return this.model;
            if (this.value !== null) return this.model === this.value;
            return Boolean(this.model);
        },
        currentType() {
            if (!this.isPassword) return this.type;
            return this.showPassword ? "text" : "password";
        },
        hasValue() { return this.model !== null && this.model !== ""; },
        showPlaceholder() { return Boolean(this.placeholder && !this.hasValue && (!this.isFocused || this.inputReadonly)); },
        inputReadonly() {
            if (this.isReadonly || this.readonly || this.readOnly) return true;
            const roAttr = this.$attrs.readonly;
            return roAttr === true || roAttr === "";
        },
        showClear() { return !this.isPassword && this.type !== 'search' && this.hasValue && !this.inputReadonly; },
        passwordClass() { return this.showPassword ? "icon_text" : "icon_pass"; }
    },
    methods: {
        clear() { this.model = ""; },
        togglePassword() { this.showPassword = !this.showPassword; }
    }
};
</script>

<style scoped>
.input_wrap { position: relative; width: 100%; }
.input { display: flex; align-items: center; position: relative; width: 100%; }
.check em { font-weight: 400; font-style: normal; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
.input input { width: 100%; height: 52px; padding: 0 16px; border: 1px solid #c4c4d0; border-radius: 12px; background: #fff; font-size: 16px; box-sizing: border-box; }
.input i { position: absolute; left: 16px; color: #a4a4b0; font-style: normal; pointer-events: none; }
/* 🔥 search 타입 가상 선택자 영역 */
.is_search::after { content: ''; position: absolute; right: 16px; width: 20px; height: 20px; background: red; display: block; top: 50%; transform: translateY(-50%); }
input[type="search"] {position:relative;}
.is_search input { padding-right: 48px; }
.err_txt { display: block; margin-top: 8px; color: #fb6432; font-size: 14px; }
.disabled { opacity: 0.5; pointer-events: none; }

@media (max-width: 768px) {
    .check em {font-size: 1.6rem;line-height: 1.5;letter-spacing: -0.01em;}
}
</style>