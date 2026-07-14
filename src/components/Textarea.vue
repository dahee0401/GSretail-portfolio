<template>
    <div class="textarea_wrap" :class="{ err: isError, disabled: isDisabled }">
        <label v-if="label || $slots.label" :for="fieldId">
            <slot name="label">{{ label }}</slot>
        </label>

        <div class="textarea_field">
            <textarea
                :id="fieldId"
                :name="name"
                :value="modelValue"
                :placeholder="placeholder"
                :rows="rows"
                :maxlength="maxlength > 0 ? maxlength : undefined"
                :readonly="isReadonly"
                :disabled="isDisabled"
                :aria-invalid="isError ? 'true' : 'false'"
                :aria-describedby="describedBy"
                @input="onInput"
            />
        </div>

        <div
            v-if="showMetaRow"
            class="textarea_meta"
        >
            <div>
                <p v-if="hint && !isError" :id="hintId">
                    {{ hint }}
                </p>
                <p
                    v-if="isError && errText"
                    :id="errId"
                    class="textarea_err"
                    role="alert"
                >
                    {{ errText }}
                </p>
            </div>
            <p
                v-if="maxlength > 0"
                :id="countId"
                aria-live="polite"
            >
                <span>{{ charCount }}</span><span>/{{ maxlength }}</span>
            </p>
        </div>
    </div>
</template>

<script setup>
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps({
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    label: { type: String, default: "" },
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    hint: { type: String, default: "" },
    errText: { type: String, default: "" },
    isError: { type: Boolean, default: false },
    isReadonly: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
    rows: { type: Number, default: 5 },
    maxlength: { type: Number, default: 0 },
});

const emit = defineEmits(["update:modelValue"]);

const instanceUid = `ta_${Math.random().toString(36).slice(2, 11)}`;
const fieldId = computed(() => (props.id && props.id.length ? props.id : instanceUid));
const hintId = computed(() => `${fieldId.value}_hint`);
const errId = computed(() => `${fieldId.value}_err`);
const countId = computed(() => `${fieldId.value}_count`);

const charCount = computed(() => (props.modelValue || "").length);

const showMetaRow = computed(
    () =>
        props.maxlength > 0 ||
        (props.hint && !props.isError) ||
        (props.isError && props.errText)
);

const describedBy = computed(() => {
    const ids = [];
    if (props.maxlength > 0) ids.push(countId.value);
    if (props.hint && !props.isError) ids.push(hintId.value);
    if (props.isError && props.errText) ids.push(errId.value);
    return ids.length ? ids.join(" ") : undefined;
});

function onInput(e) {
    emit("update:modelValue", e.target.value);
}
</script>

<style scoped>
.textarea_wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    max-width: 100%;
    
}

.textarea_wrap.disabled {
    opacity: 0.55;
    pointer-events: none;
}

.textarea_wrap > label {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    color: #222;
}

.textarea_field {
    border-radius: 12px;
}

.textarea_field > textarea {
    display: block;
    width: 100%;
    min-height: 120px;
    height: auto;
    margin: 0;
    padding: 12px 15px;
    font-size: 16px;
    line-height: 1.4;
    resize: vertical;
    background-color: #fff;
    border: 1px solid #C4C4D0;
    border-radius: 12px;
    
    -webkit-appearance: none;
    appearance: none;
}

.textarea_wrap.err .textarea_field > textarea {
    border-color: #f24f39;
}

.textarea_field > textarea::placeholder {
    color: #A4A4B0;
    font-size: 1.6rem;
    line-height: 1.5;
    letter-spacing: -0.01em;

    
}

.textarea_field > textarea:focus {
    border-color: #246beb;
    border-width: 2px;
    outline: none;
}

.textarea_field > textarea:disabled {
    background-color: #eee;
    border-color: #ddd;
    color: #888;
}

.textarea_meta {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px 16px;
    width: 100%;
    
}

.textarea_meta > div {
    flex: 1 1 auto;
    min-width: 0;
}

.textarea_meta > div > p {
    width: 100%;
    margin: 0;
    font-size: 12px;
    line-height: 1.4;
    text-align: left;
    overflow-wrap: anywhere;
    color: #666;
}

.textarea_meta > div > p.textarea_err {
    color: #f24f39;
    font-weight: 400;
}

.textarea_meta > p {
    flex: 0 0 auto;
    margin: 0;
    margin-left: auto;
    font-size: 13px;
    line-height: 1.4;
    text-align: right;
    white-space: nowrap;
    color: #666;
}

.textarea_meta > p > span:first-of-type {
    font-weight: 600;
    color: #246beb;
}

.textarea_wrap.err .textarea_meta > p > span:first-of-type {
    color: #f24f39;
}

.textarea_meta > p > span:last-of-type {
    font-weight: 400;
    color: #888;
}
</style>
