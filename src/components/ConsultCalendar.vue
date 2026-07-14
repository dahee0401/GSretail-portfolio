<template>
    <div class="consult_calendar" aria-label="상담 날짜 선택">
        <div class="consult_calendar_inner">
            <div class="consult_calendar_head">
                <button type="button" class="calendar_nav prev" aria-label="이전 달" @click="slidePrev"></button>
                <p class="calendar_month">{{ activeSlide?.label }}</p>
                <button type="button" class="calendar_nav next" aria-label="다음 달" @click="slideNext"></button>
            </div>

            <Swiper
                class="calendar_month_swiper"
                :slides-per-view="1"
                :space-between="0"
                :allow-touch-move="true"
                :initial-slide="initialSlideIndex"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
            >
                <SwiperSlide v-for="slide in monthSlides" :key="slide.id">
                    <ul class="calendar_weekdays">
                        <li v-for="(day, wi) in weekdays" :key="day" :class="{ is_sun: wi === 0, is_sat: wi === 6 }">{{ day }}</li>
                    </ul>
                    <div class="calendar_grid">
                        <button
                            v-for="(cell, ci) in slide.cells"
                            :key="`${slide.id}-${ci}`"
                            type="button"
                            class="calendar_day"
                            :class="{
                                is_empty: !cell.isCurrentMonth,
                                is_today: cell.isToday,
                                is_selected: isSelected(cell),
                                is_sun: cell.weekdayIndex === 0,
                                is_sat: cell.weekdayIndex === 6,
                            }"
                            :disabled="!cell.isCurrentMonth"
                            @click="selectDay(cell)"
                        >
                            <span v-if="cell.day != null">{{ cell.day }}</span>
                        </button>
                    </div>
                </SwiperSlide>
            </Swiper>

            <p v-if="selectedLabel" class="calendar_selected">{{ selectedLabel }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const props = defineProps({
    modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

const today = new Date();
today.setHours(0, 0, 0, 0);

function pad(value) {
    return String(value).padStart(2, "0");
}

function toDateKey(year, month, day) {
    return `${year}-${pad(month)}-${pad(day)}`;
}

function parseDateKey(key) {
    if (!key) return null;
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function buildMonthGrid(year, month) {
    const firstDay = new Date(year, month - 1, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const cells = [];

    for (let i = 0; i < startWeekday; i += 1) {
        const d = new Date(year, month - 1, i - startWeekday + 1);
        cells.push({
            day: d.getDate(),
            dateKey: toDateKey(d.getFullYear(), d.getMonth() + 1, d.getDate()),
            isCurrentMonth: false,
            isToday: d.getTime() === today.getTime(),
            weekdayIndex: d.getDay(),
        });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
        const dateObj = new Date(year, month - 1, day);
        cells.push({
            day,
            dateKey: toDateKey(year, month, day),
            isCurrentMonth: true,
            isToday: dateObj.getTime() === today.getTime(),
            weekdayIndex: dateObj.getDay(),
        });
    }

    let nextDay = 1;
    while (cells.length % 7 !== 0) {
        const d = new Date(year, month, nextDay);
        cells.push({
            day: d.getDate(),
            dateKey: toDateKey(d.getFullYear(), d.getMonth() + 1, d.getDate()),
            isCurrentMonth: false,
            isToday: d.getTime() === today.getTime(),
            weekdayIndex: d.getDay(),
        });
        nextDay += 1;
    }

    return cells;
}

const monthSlides = computed(() => {
    const list = [];
    const start = new Date(today.getFullYear(), today.getMonth() - 3, 1);

    for (let i = 0; i < 18; i += 1) {
        const date = new Date(start.getFullYear(), start.getMonth() + i, 1);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        list.push({
            id: `${year}-${month}`,
            year,
            month,
            label: `${year}년 ${month}월`,
            cells: buildMonthGrid(year, month),
        });
    }

    return list;
});

const initialSlideIndex = 3;

const activeIndex = ref(initialSlideIndex);
const calendarSwiper = ref(null);

const activeSlide = computed(() => monthSlides.value[activeIndex.value] ?? null);

const selectedLabel = computed(() => {
    const date = parseDateKey(props.modelValue);
    if (!date) return "";
    return `선택 : ${date.getMonth() + 1}월 ${date.getDate()}일 (${weekdays[date.getDay()]})`;
});

function isSelected(cell) {
    return Boolean(cell.dateKey && cell.dateKey === props.modelValue);
}

function selectDay(cell) {
    if (!cell.isCurrentMonth || !cell.dateKey) return;
    emit("update:modelValue", cell.dateKey);
}

function onSwiper(swiper) {
    calendarSwiper.value = swiper;
}

function onSlideChange(swiper) {
    activeIndex.value = swiper.activeIndex;
}

function slidePrev() {
    calendarSwiper.value?.slidePrev();
}

function slideNext() {
    calendarSwiper.value?.slideNext();
}
</script>

<style scoped>
.consult_calendar { width: 100%; max-width: 740px; }
.consult_calendar_inner { padding: 32px 40px; border: 1px solid #d7d7df; border-radius: 20px; box-sizing: border-box; }
.consult_calendar_head { display: flex; align-items: center; justify-content: center; gap: 24px; position: relative; margin-bottom: 12px; }
.consult_calendar_head > .calendar_month { margin: 0; color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.39; letter-spacing: 0; text-align: center; }
.consult_calendar_head > .calendar_nav { width: 20px; height: 20px; background-color: #d9d9d9; border: 0; cursor: pointer; flex-shrink: 0; background: url(@/assets/images/common/icon_set_20.png) no-repeat; }
.consult_calendar_head > .calendar_nav.prev { left: 0; background-position: -281px -24px;}
.consult_calendar_head > .calendar_nav.next { right: 0; background-position: -324px -24px; }
.calendar_month_swiper { width: 100%; overflow: hidden; }
.calendar_weekdays { margin: 0; padding: 16px 0; list-style: none; display: grid; grid-template-columns: repeat(7, 1fr); gap: 0; border-bottom: 1px solid #e5e5e9; }
.calendar_weekdays > li { color: #161616; font-size: 1.8rem; font-weight: 400; line-height: 1.39; letter-spacing: 0; text-align: center; }
.calendar_weekdays > li.is_sun { color: #ed3030; }
.calendar_weekdays > li.is_sat { color: #107af2; }
.calendar_grid {padding:12px 0; display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px 0; }
.calendar_day { width: 100%; min-height: 50px; margin: 0; padding: 0; background: none; border: 0; border-radius: 99px; color: #161616; font-size: 1.8rem; font-weight: 400 !important; line-height: 1.39; letter-spacing: 0; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.calendar_day.is_empty { color: #a4a4b0; pointer-events: none; cursor: default; }
.calendar_day.is_empty.is_sun, .calendar_day.is_empty.is_sat { color: #a4a4b0; }
.calendar_day.is_empty.is_today { background-color: transparent; }
.calendar_day.is_sun:not(.is_selected):not(.is_empty) { color: #ed3030; }
.calendar_day.is_sat:not(.is_selected):not(.is_empty) { color: #107af2; }
.calendar_day.is_today:not(.is_selected):not(.is_empty) { background-color: #e7f2fe; }
.calendar_day.is_selected { background-color: #107af2; color: #ffffff; font-weight: 700; }
.calendar_day.is_selected.is_sun, .calendar_day.is_selected.is_sat { color: #ffffff; }
.calendar_day:disabled { cursor: default; }
.calendar_selected { margin: 12px 0 0; padding-top: 24px; border-top: 1px solid #d7d7df; color: #107af2; font-size: 1.8rem; font-weight: 700; line-height: 1.5; letter-spacing: 0; text-align: center; }

@media (max-width: 768px) {
    .consult_calendar { max-width: none; }
    .calendar_grid { gap: 8px 0;}
    .consult_calendar_inner { padding: 16px; border-radius: 12px; }
    .consult_calendar_head { margin-bottom: 12px; }
    .calendar_weekdays { padding: 10px 0; }
    .calendar_day { width: 100%; min-height: unset; aspect-ratio: 1; align-self: center; border-radius: 10px; }
    .calendar_day.is_empty { border-radius: 10px; }
    .calendar_day.is_selected { border-radius: 50%; }
    .calendar_day.is_today:not(.is_selected):not(.is_empty) { border-radius: 50%; }
    .calendar_selected { margin-top: 0; padding-top: 16px; font-size: 1.6rem; line-height: 1.24; }
}
</style>
