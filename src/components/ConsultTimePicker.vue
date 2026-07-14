<template>
    <div class="consult_time_picker" aria-label="상담 시간 선택">
        <div class="consult_time_picker_inner">
            <ul class="time_slot_grid" role="listbox" aria-label="예약 가능 시간">
                <li v-for="slot in timeSlots" :key="slot.value" role="presentation">
                    <button
                        type="button"
                        class="time_slot"
                        role="option"
                        :class="{ is_selected: isSelected(slot), is_unavailable: !slot.available }"
                        :disabled="!slot.available"
                        :aria-selected="isSelected(slot)"
                        @click="selectSlot(slot)"
                    >
                        {{ slot.label }}
                    </button>
                </li>
            </ul>
            <div class="time_slot_legend">
                <p><span class="legend_dot is_unavailable" aria-hidden="true"></span> 예약불가</p>
                <p><span class="legend_dot is_selected" aria-hidden="true"></span> 선택됨</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const unavailableTimes = ["10:00", "13:00", "15:00"];

const timeValues = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
];

const timeSlots = timeValues.map((value) => ({
    value,
    label: value,
    available: !unavailableTimes.includes(value),
}));

function isSelected(slot) {
    return Boolean(slot.available && slot.value === props.modelValue);
}

function selectSlot(slot) {
    if (!slot.available) return;
    emit("update:modelValue", slot.value);
}
</script>

<style scoped>
.consult_time_picker { width: 100%; max-width: min(1000px, 100%); min-width: 0; box-sizing: border-box; }
.consult_time_picker_inner { width: 100%; min-width: 0; padding: 32px 40px; border: 1px solid #d7d7df; border-radius: 20px; box-sizing: border-box; }
.time_slot_grid { width: 100%; min-width: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px 10px; }
.time_slot_grid > li { min-width: 0; }
.time_slot { width: 100%; min-width: 0; min-height: 50px; margin: 0; padding: 0 8px; background-color: #ffffff; border: 1px solid #e5e5e9; border-radius: 12px; color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.39; letter-spacing: 0; text-align: center; cursor: pointer; box-sizing: border-box; display: flex; align-items: center; justify-content: center; }
.time_slot.is_unavailable { background-color: #f8f8f8; color: #a4a4b0; cursor: not-allowed; text-decoration: line-through; text-decoration-color: currentColor; text-decoration-thickness: 1px; }
.time_slot.is_selected { background-color: #107af2; border-color: #107af2; color: #ffffff; font-weight: 700; }
.time_slot:disabled { cursor: not-allowed; }
.time_slot_legend { margin: 10px 0 0; padding: 10px 0 0; border:0; display: flex; align-items: center; gap: 8px; }
.time_slot_legend > p { margin: 0; display: inline-flex; align-items: center; gap: 8px; color: #161616; font-size: 1.2rem; font-weight: 400; line-height: 1.2; letter-spacing: 0; }
.time_slot_legend .legend_dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
.time_slot_legend .legend_dot.is_unavailable { background-color: #d9d9d9; }
.time_slot_legend .legend_dot.is_selected { background-color: #107af2; }

@media (max-width: 768px) {
    .consult_time_picker { max-width: none; } 
    .consult_time_picker_inner { padding: 16px; border-radius: 12px; }
    .time_slot { min-height: 50px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .time_slot_grid{gap:10px;}
}
</style>
