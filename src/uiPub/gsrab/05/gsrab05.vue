<template>
    <div class="main-container">
        <!-- 26.06.15 add 정다희 : top_visual 클래스 추가 -->
        <header class="title_wrap ac top_visual">
            <h2 class="page_title">{{ t.pageTitle }}</h2>
        </header>
        <main class="cont_inner">
            <section class="sec_location">
                <header class="header">
                    <h3>{{ t.location.title }}</h3>
                </header>
                <article class="location_panel">
                    <div class="location_info">
                        <div>
                            <h4>{{ t.location.addressLabel }}</h4>
                            <p>{{ t.location.address }}</p>
                        </div>
                        <div>
                            <h4>{{ t.location.subwayLabel }}</h4>
                            <p>{{ t.location.subwayDesc }}</p>
                        </div>
                        <div>
                            <h4>{{ t.location.busLabel }}</h4>
                            <p><span class="bus_tag_reg">{{ t.location.busMainLabel }}</span> {{ t.location.busMainRoutes }}</p>
                            <p><span class="bus_tag_reg">{{ t.location.busExpressLabel }}</span> {{ t.location.busExpressRoutes }}</p>
                        </div>
                    </div>
                    <!-- 26.06.17 edit 정다희 : 웹접근성 대응 iframe title 적용 -->
                    <div class="map_area">
                        <iframe :title="t.location.mapTitle" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.2584135599163!2d127.03451977629449!3d37.50182292783558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca3fee398641d%3A0x237e08643e54191d!2zR1Mg7YOA7JuM!5e0!3m2!1sko!2skr!4v1779151657505!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </article>
            </section>

            <section class="sec_location">
                <header class="header">
                    <h3>{{ t.location2.title }}</h3>
                </header>
                <article class="location_panel">
                    <div class="location_info">
                        <div>
                            <h4>{{ t.location2.addressLabel }}</h4>
                            <p><span>{{ t.location2.addressLine1Label }}</span> {{ t.location2.addressLine1 }}</p>
                            <p><span>{{ t.location2.addressLine2Label }}</span> {{ t.location2.addressLine2 }}</p>
                        </div>
                        <div>
                            <h4>{{ t.location2.subwayLabel }}</h4>
                            <p>{{ t.location2.subwayLine1 }}</p>
                            <p>{{ t.location2.subwayLine2 }}</p>
                        </div>
                        <div>
                            <h4>{{ t.location2.busLabel }}</h4>
                            <ul class="route_list">
                                <li v-for="(item, idx) in t.location2.busItems" :key="'bus-' + idx">
                                    <strong class="txt_blue">{{ item.stop }}</strong>
                                    <p><span>{{ t.location2.busGanLabel }}</span> {{ t.location2.busGanNums }}</p>
                                    <p><span>{{ t.location2.busExpressLabel }}</span> {{ item.express }}</p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4>{{ t.location2.carLabel }}</h4>
                            <ul class="route_list">
                                <li v-for="(item, idx) in t.location2.carItems" :key="'car-' + idx">
                                    <strong class="txt_blue">{{ item.route }}</strong>
                                    <p>{{ item.desc }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 26.06.17 edit 정다희 : 웹접근성 대응 iframe title 적용 -->
                    <div class="map_stack">
                        <div class="map_area">
                            <iframe :title="t.location2.mapTitle1" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101262.58408041636!2d126.73666359726565!3d37.52075259999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9e8cae0efbf5%3A0xa6a88cc52747434a!2zR1PqsJXshJztg4Dsm4w!5e0!3m2!1sko!2skr!4v1779151880978!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div class="map_area">
                            <iframe :title="t.location2.mapTitle2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.4355804119828!2d126.88768577629516!3d37.52122822672419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9ef339ed8173%3A0x58fcaf41d3848615!2zR1PqsJXshJxO7YOA7JuM!5e0!3m2!1sko!2skr!4v1779151949828!5m2!1sko!2skr" width="600" height="450" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const langData = {
    ko: {
        pageTitle: "오시는 길",
        location: {
            title: "GS타워",
            addressLabel: "주소",
            address: "서울시 강남구 논현로 508 (역삼동 679번지 GS타워)",
            subwayLabel: "지하철",
            subwayDesc: "2호선 역삼역 7번 출구 (GS타워 지하 연결통로 이용)",
            busLabel: "버스",
            busMainLabel: "간선/순환",
            busMainRoutes: "146, 147, 341, 360, 740, 41",
            busExpressLabel: "직행/급행",
            busExpressRoutes: "1100, 1700, 2000, 7007, 8001",
            mapTitle: "GS타워 위치 지도 영역(퍼블용 이미지)",/* 26.06.17 edit 정다희 : mapAriaLabel -> mapTitle 키 변경 */
        },
        location2: {
            title: "GS강서타워/GS강서N타워",
            addressLabel: "주소",
            addressLine1Label: "강서타워",
            addressLine2Label: "강서N타워",
            addressLine1: "서울특별시 영등포구 선유로 75 GS강서타워",
            addressLine2: "서울특별시 영등포구 선유로 82 GS강서N타워",
            subwayLabel: "지하철",
            subwayLine1: "2호선 문래역 3번 출구 (출구방향 도보 7분)",
            subwayLine2: "5호선 양평역 2번 출구 (출구방향 도보 15분)",
            busLabel: "버스",
            busGanLabel: "간선",
            busGanNums: "640, 650",
            busExpressLabel: "직행/급행",
            busItems: [
                { stop: "영등포기계상가 정류장(영등포역 방향 운행)", express: "6211, 6628, 6629, 6625, 6640, 6630, 5012" },
                { stop: "영등포기계상가(오목교역 방향 운행)", express: "5616, 6211, 6628, 6629, 6625, 6640, 6630, 5012" },
                { stop: "양남동로타리", express: "5616, 6211, 6628, 6629, 6640, 6630, 5012" },
            ],
            carLabel: "자동차",
            carItems: [
                { route: "올림픽대로", desc: "양화대교 남단에서 문래동 사거리 방향으로 직진, 약 10분 소요" },
                { route: "강변북로", desc: "영등포 시장에서 오목교 방향으로 직진, 양남사거리에서 좌회전 후 50m 직진" },
            ],
            mapTitle1: "GS강서타워 위치 지도 영역(퍼블용 이미지)",/* 26.06.17 edit 정다희 : mapAriaLabel1 -> mapTitle1 키 변경 */
            mapTitle2: "GS강서N타워 위치 지도 영역(퍼블용 이미지)",/* 26.06.17 edit 정다희 : mapAriaLabel2 -> mapTitle2 키 변경 */
        },
    },
    en: {
        pageTitle: "Location"/* 2026.07.06 edit 이소라 */,
        location: {
            title: "GS Tower",
            addressLabel: "Address",
            address: "508 Nonhyeon-ro, Gangnam-gu, Seoul (679 Yeoksam-dong, GS Tower)",
            subwayLabel: "Subway",
            subwayDesc: "Line 2, Yeoksam Station, Exit 7 (via GS Tower underground passageway)",
            busLabel: "Bus",
            busMainLabel: "Trunk / Circular Line"/* 260604 번역 */,
            busMainRoutes: "146, 147, 341, 360, 740, 41",
            busExpressLabel: "Direct / Express"/* 260604 번역 */,
            busExpressRoutes: "1100, 1700, 2000, 7007, 8001",
            mapTitle: "GS Tower location map area (publishing image)"/* 260604 번역, 26.06.17 edit 정다희 : mapAriaLabel -> mapTitle 키 변경 */,
        },
        location2: {
            title: "GS Gangseo Tower / GS Gangseo N Tower",
            addressLabel: "Address",
            addressLine1Label: "Gangseo Tower"/* 260604 번역 */,
            addressLine2Label: "Gangseo N Tower"/* 260604 번역 */,
            addressLine1: "Gangseo Tower: 75 Seonyu-ro, Yeongdeungpo-gu, Seoul (GS Gangseo Tower)",
            addressLine2: "Gangseo N Tower: 82 Seonyu-ro, Yeongdeungpo-gu, Seoul (GS Gangseo N Tower)",
            subwayLabel: "Subway",
            subwayLine1: "Line 2, Munrae Station, Exit 3 (7-minute walk from exit)",
            subwayLine2: "Line 5, Yangpyeong Station, Exit 2 (15-minute walk from exit)",
            busLabel: "Bus",
            busGanLabel: "Trunk Line"/* 260604 번역 */,
            busGanNums: "640, 650",
            busExpressLabel: "Direct / Express"/* 260604 번역 */,
            busItems: [
                { stop: "Yeongdeungpo Machinery Mall Stop (toward Yeongdeungpo Station)", express: "6211, 6628, 6629, 6625, 6640, 6630, 5012" },
                { stop: "Yeongdeungpo Machinery Mall Stop (toward Omokgyo Station)", express: "5616, 6211, 6628, 6629, 6625, 6640, 6630, 5012" },
                { stop: "Yangnam-dong Rotary", express: "5616, 6211, 6628, 6629, 6640, 6630, 5012" },
            ],
            carLabel: "By Car",
            carItems: [
                { route: "Olympic Expressway", desc: "Go straight from the south end of Yanghwa Bridge toward Munrae-dong Intersection, approximately a 10-minute drive" },
                { route: "Gangbyeon Expressway", desc: "Go straight from Yeongdeungpo Market toward Omokgyo Station; turn left at Yangnam Intersection and continue straight for 50m" },
            ],
            mapTitle1: "GS Gangseo Tower location map area (publishing image)"/* 260604 번역, 26.06.17 edit 정다희 : mapAriaLabel1 -> mapTitle1 키 변경 */,
            mapTitle2: "GS Gangseo N Tower location map area (publishing image)"/* 260604 번역, 26.06.17 edit 정다희 : mapAriaLabel2 -> mapTitle2 키 변경 */,
        },
    }
};

const t = computed(() => langData[props.lang] || langData.ko);
</script>

<style scoped>
    .main-container { width: 100%; position: relative; display: block; }
    .title_wrap { width: 100%; max-height: 480px; padding: 10.91% 0 11.25%; position: relative; display: block; overflow: hidden; text-align: center; background-color: transparent; }
    .title_wrap::before { width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 0; content: ""; background-image: url("@/assets/images/dummy/gsrab_05_01.jpg"); background-repeat: no-repeat; background-position: 40% center; background-size: cover; transform-origin: center; }
    .title_wrap::after { width: 100%; height: 100%; position: absolute; left: 0; top: 0; z-index: 1; content: ""; background-color: rgba(0, 0, 0, 0.5); }
    .title_wrap > h2 { position: relative; z-index: 2; color: #fff; font-weight: 700; font-size: 7.2rem; line-height: 1.24; letter-spacing: -0.02em; }
    section + section { padding: 200px 0 0; }
    section { padding:120px 0 0;display: flex; flex-direction: column; gap: 64px; }
    .header h3 { font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
    .header p { margin: 16px 0 0; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .sec_location > .location_panel { width: 100%; padding: 40px 0; border-top: 1px solid #e5e5e9; display: flex; flex-wrap: nowrap; gap: 20px; justify-content: space-between; }
    .sec_location .location_info { max-width: 700px; min-width: 474px; flex: 1 1 0; display: flex; flex-direction: column; gap: 56px; }
    .sec_location .location_info > div h4 { margin-bottom: 16px; color: #161616; font-size: 2.4rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .sec_location .location_info > div p { color: #67676f; font-size: 1.8rem; font-weight: 400; line-height: 1.4; letter-spacing: 0; display: flex; }
    .sec_location .location_info > div > p + p,
    .sec_location .location_info .route_list > li > p + p{ margin-top: 6px; }
    .sec_location .location_info > div > p > span { margin-right: 8px; font-weight: 700; display: block; flex: 0 0 auto; letter-spacing: -0.02em; }
    .sec_location .location_info .route_list { display: flex; flex-direction: column; gap: 16px; }
    .sec_location .location_info .route_list > li > p { letter-spacing: -0.02em; }
    .sec_location .location_info .route_list > li > p > span { margin-right: 8px; font-weight: 700; display: block; flex: 0 0 auto; }
    .sec_location .location_panel > .map_area, .sec_location .location_panel > .map_stack { flex: 0 1 700px; min-width: 0; align-self: flex-start; }
    .sec_location .map_area { width: 100%; max-width: 700px; aspect-ratio: 700 / 440; height: auto; border-radius: 12px; background-color: #e5e5e9; background-repeat: no-repeat; background-position: center; background-size: contain; box-sizing: border-box; }
    .sec_location .map_area iframe { width: 100%;}
    .map_stack { width: 100%; max-width: 700px; min-width: 0; display: flex; flex-direction: column; gap: 16px; box-sizing: border-box; }
    .sec_location .location_info strong.txt_blue { margin-bottom: 8px; color: #107af2; font-weight: 700; font-size: 1.8rem; line-height: 1.24; letter-spacing: 0; display: block; }

    @media screen and (max-width: 1024px) {
        .sec_location > .location_panel { flex-wrap: wrap; padding: 40px 0 32px; }
        .sec_location .location_info { flex: 1 1 100%; max-width: none; min-width: 0; order: 2; }
        .sec_location .location_panel > .map_area, .sec_location .location_panel > .map_stack { flex: none; width: 100%; max-width: 700px; }
        .sec_location .map_area { max-width: 100%; }
        .map_stack { max-width: 100%; }
    }
    @media screen and (max-width: 768px) {
        .title_wrap { display: none; }
        section{padding:60px 0 0;}
        section + section { padding: 60px 0 0; }
        .header h3 { font-size: 2.4rem; line-height: 1.35; text-align: left; }
        .sec_location { gap: 30px; }
        .sec_location:nth-of-type(1) { padding-top: 120px; } /* 26.06.26 edit 이소라 */
        .sec_location > .location_panel { padding: 30px 0 36px; flex-direction: column; flex-wrap: nowrap; gap: 0; align-items: stretch; border-top: 1px solid #e5e5e9; }
        .sec_location .location_info { order: 2; flex: none; padding-top: 30px; gap: 36px; }
        .sec_location .location_panel > .map_area, .sec_location .location_panel > .map_stack { order: 1; max-width: 100%;}
        .sec_location .map_area iframe {height:100%;}
        .sec_location .map_area { aspect-ratio: 335 / 211; }
        .map_stack { gap: 24px; }
        .sec_location .location_info > div h4 { font-size: 2rem; }
        .sec_location .location_info > div p { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
        .sec_location .location_info strong.txt_blue { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
        .sec_location .location_info .bus_tag_reg { font-weight: 400; }
    }
</style>