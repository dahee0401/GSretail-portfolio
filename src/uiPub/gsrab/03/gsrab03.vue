<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page_title">{{ t.MainTitle }}</h2>
        </div>
        <div class="cont_inner">
            <Tabs v-model="MainTabIdx" :tab-items="t.MainTabs" tab-class="type_01" :tab-slide="true" />
            <div v-show="MainTabIdx <= 5" class="panel" :aria-label="t.MainTabs?.[MainTabIdx]?.item || ''">
                <section class="sec_history" :key="'history-tab-' + MainTabIdx">
                    <div class="history_intro">
                        <header>
                            <p>{{ currentHistoryTab.period }}</p>
                            <h3 v-html="currentHistoryTab.title"></h3>
                        </header>
                    </div>
                    <HistoryTimeline :items="currentHistoryTab.items" />
                </section>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from "vue";
import Tabs from "@/components/Tabs.vue";
import HistoryTimeline from "@/components/HistoryTimeline.vue";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
});

const MainTabIdx = ref(0);

const langData = {
    ko: {
        MainTitle: "기업 연혁",
        MainTabs: [
            { item: "현재 - 2019" },
            { item: "2018 - 2011" },
            { item: "2010 - 2004" },
            { item: "2002 - 1999" },
            { item: "1997 - 1990" },
            { item: "1987 - 1971" },
        ],
        HistoryTabs: [
            {
                period: "현재-2019",
                title: "라이프스타일 <br />플랫폼으로 도약",
                items: [
                    { period: "2025", details: [
                        { term: ["12월", "GS리테일"], desc: "'1천만불 수출의 탑' 수상 공정거래 자율준수프로그램(CP) 등급평가 'AA' 등급 획득" }, /* 260624 edit 이소라 */
                        { term: ["11월"], subDetails: [
                            { term: "GS25", desc: "베트남 전역 400호점·하노이 50호점 돌파" },
                            { term: "GS리테일", desc: "ESG평가 2년 연속 'A+' 등급 획득" }
                        ] },
                        { term: ["10월", "GS25"], desc: "인스타그램 100만 팔로워 돌파" },
                        { term: ["9월", "GS SHOP"], desc: "- GS SHOP 시그니처 프로그램 '지금 백지연' 론칭 <br />- BI 리뉴얼" }, /* 260624 edit 이소라 */
                        { term: ["8월", "GS SHOP"], desc: "르네크루 리브랜딩 론칭" },
                        { term: ["6월", "GS25"], desc: "태국 방콕 'THAIFEX 2025' 박람회 참가" },
                        { term: ["5월", "GS25"], desc: "PB·차별화 상품 일본 돈키호테 수출" },
                        { term: ["4월", "GS25"], desc: "FC서울 특화 매장 오픈" },
                        { term: ["3월"], subDetails: [
                            { term: "GS25", desc: "한국 편의점 최초 베트남 하노이 진출" },
                            { term: "GS리테일", desc: "GS리테일 허서홍 대표이사 취임" }
                        ] },
                        { term: ["1월", "GS리테일"], desc: "통합 멤버십 GS ALL 론칭" },
                    ] },
                    { period: "2024", details: [
                        { term: ["11월", "GS리테일"], desc: "허서홍 신임 대표 내정" },
                        { term: ["10월", "GS리테일"], desc: "- 동반성장지수 '최우수' 등급 획득 <br />- ESG통합 'A+' 등급 획득" }, /* 20260622 edit 이소라 : 텍스트수정 */
                        { term: ["9월", "GS SHOP"], desc: "'AI 라이프스타일 커머스' 앱으로 개편" },
                        { term: ["8월"], subDetails: [
                            { term: "GS SHOP", desc: "업계 최초 생성형 'AI 스튜디오' 구현" },
                            { term: "GS25", desc: "'그라운드블루49' 오픈" }
                        ] },
                        { term: ["7월", "GS THE FRESH"], desc: "500호점 돌파" },
                        { term: ["6월", "GS SHOP"], desc: "숏픽 오픈 6개월만에 1억뷰 달성" },
                        { term: ["5월"], subDetails: [
                            { term: "GS THE FRESH", desc: "50주년" },
                            { term: "GS25", desc: "베트남 GS25 300호점 돌파" }
                        ] },
                        { term: ["4월", "GS리테일"], desc: "고피자와 MOU 체결" },
                        { term: ["3월", "GS25"], desc: "배달·픽업 주문 증정품 보관서비스 론칭" }
                    ] },
                    { period: "2023", details: [
                        { term: ["12월", "GS SHOP"], desc: "소비자중심경영(CCM) 7회차 재인증 획득" },
                        { term: ["11월", "GS25"], desc: "편의점 업계 최초로 ESG 환경분야 평가 A+(매우 우수) 획득" },
                        { term: ["9월"], subDetails: [
                            { term: "GS리테일", desc: "'우리동네GS' MAU, 오프라인 유통사 앱 중 1위 달성" }, /* 20260622 edit 이소라 : 텍스트수정 */
                            { term: "GS SHOP", desc: "홈쇼핑 업계 최초 네트워크 기반 방송시스템(NDI) 구축" }
                        ] },
                        { term: ["6월", "GS THE FRESH"], desc: "400호점 돌파" },
                        { term: ["3월", "GS리테일"], desc: "통합 멤버십 출범" },
                        { term: ["2월"], subDetails: [
                            { term: "GS25", desc: "혜자로운 집밥(김혜자 도시락) 재출시"},
                            { term: "GS리테일", desc: "2023 대한민국 일하기 좋은 기업 선정" },
                        ] },
                        { term: ["1월"], subDetails: [
                            { term: "GS리테일", desc: "요기요와 손잡고 '요편의점' 서비스 론칭" },
                            { term: "GS25", desc: "제28회 코리아 베스트 디자인 어워드' 브랜드아이덴티티 부문 대상 수상 (GS25 갓생기획)" }
                        ] },
                    ] },
                    { period: "2022", details: [
                        { term: ["12월"], subDetails: [
                            { term: "GS리테일", desc: "GS리테일 캐비아와 전략적 제휴 체결" },
                            { term: "GS Fresh Mall", desc: "GS Fresh Mall 바로배달 서비스 론칭" },
                            { term: "GS25", desc: "베트남GS25 200호점 돌파" }
                        ] },
                        { term: ["11월", "GS THE FRESH"], desc: "GS THE FRESH 수산물 이력제 도입" },
                        { term: ["10월"], subDetails: [
                            { term: "GS리테일", desc: "GS리테일 극지연구소와 기후 위기 대응 업무협약 체결" },
                            { term: "GS25", desc: "몽골GS25 100호점 오픈" }
                        ] },
                        { term: ["8월", "GS25"], desc: "GS25 유튜브 채널 '이리오너라' 업계 최초 구독자 100만 돌파" },
                        { term: ["7월", "GS Fresh Mall"], desc: "온라인 통합 유료 멤버십 서비스 '프라임 멤버십' 론칭(GS Fresh Mall)" },
                        { term: ["6월", "GS25"], desc: "편의점 최초 서울시 아동급식카드 온라인 결제 시스템 론칭" },
                        { term: ["4월", "GS THE FRESH"], desc: "슈퍼마켓 최초 금융혁신점포 오픈(GS THE FRESH 광진화양점)" },
                        { term: ["2월", "GS25"], desc: "편의점 최초 치킨 조리 로봇 도입(로보아르테 협업)" },
                        { term: ["1월", "GS리테일"], desc: "쿠캣 지분 인수" }
                    ] },
                    { period: "2021", details: [
                        { term: ["8월", "GS리테일"], desc: "GS페이 론칭" },
                        { term: ["7월", "GS리테일"], desc: "GS리테일 X GS홈쇼핑 합병" },
                        { term: ["5월", "GS리테일"], desc: "업계 최초 ISO14001·9001동시 인증" },
                        { term: ["3월"], subDetails: [
                            { term: "GS25", desc: "베트남 GS25 100호점 돌파" },
                            { term: "GS리테일", desc: "ESG추진위원회 출범" }
                        ] }
                    ] },
                    { period: "2020", details: [
                        { term: ["12월", "GS SHOP"], desc: "블록체인 품질이력관리시스템(b-link) 오픈" },
                        { term: ["11월"], subDetails: [
                            { term: "GS리테일", desc: "GS리테일-GS홈쇼핑 합병 결의" },
                            { term: "GS25", desc: "AI로봇배달 서비스 론칭" }
                        ] },
                        { term: ["10월", "달리살다"], desc: "유기농 전문몰 '달리살다' 오픈" },
                        { term: ["9월", "GS THE FRESH"], desc: "사회공헌형 슈퍼마켓 '내일스토어' 오픈" },
                        { term: ["8월", "GS리테일"], desc: "배달플랫폼 사업 '우딜' 론칭" },
                        { term: ["7월", "GS25"], desc: "주류 스마트오더 와인25 플러스 론칭" },
                        { term: ["6월", "GS리테일"], desc: "업계 최초 드론 배송 시범서비스 진행" },
                        { term: ["4월"], subDetails: [
                            { term: "GS리테일", desc: "GS리테일 통합 멤버십 THE POP 출범" },
                            { term: "GS SHOP", desc: "군포물류센터 오픈" },
                        ] },
                        { term: ["1월", "GS25"], desc: "미래형 편의점 GS25 을지스마트점 오픈" }
                    ] },
                    { period: "2019", details: [
                        { term: ["11월", "GS리테일"], desc: "유기견 전문봉사단 'GS벳러버' 출범" },
                        { term: ["9월", "GS25"], desc: "'나만의냉장고앱' 누적 다운로드 수 1000만 건 돌파" },
                        { term: ["7월", "GS SHOP"], desc: "친환경 배송서비스 도입" },
                        { term: ["5월", "GS THE FRESH"], desc: "알뜰형 슈퍼 오픈" },
                        { term: ["3월", "GS25"], desc: "GS25/GS수퍼마켓 신규앱 론칭, 반값 택배 론칭" },
                        { term: ["1월", "GS25"], desc: "올플스토어 오픈" }
                    ] }
                ],
            },
            {
                period: "2018-2011",
                title: "글로벌 <br />시장진출",
                items: [
                    { period: "2018", details: [
                        { term: ["12월", "GS리테일"], desc: "GSPark24 인수" },
                        { term: ["9월", "GS25"], desc: "스마트 GS25 오픈 (마곡 사이언스파크 LG CNS 본사 내)" },
                        { term: ["4월", "GS SHOP"], desc: "공정방송센터 신설" },
                        { term: ["2월", "랄라블라"], desc: "랄라블라 론칭" },
                        { term: ["1월", "GS25"], desc: "베트남 점포 오픈" },
                    ] },
                    { period: "2017", details: [
                        { term: ["12월", "GS리테일"], desc: "심플리쿡(SIMPLY COOK) 론칭" },
                        { term: ["9월"], subDetails: [
                            { term: "GS리테일", desc: "행정안전부 재난구호 업무협약 체결" },
                            { term: "GS SHOP", desc: "NHN 페이코에 500억원 전략적 투자" },
                        ] },
                        { term: ["7월"], subDetails: [
                            { term: "GS25", desc: "편의점 업계 최초 상생안 발표" },
                            { term: "GS SHOP", desc: "글로벌 키친웨어 제조사 월드키친(코렐)에 2,500만불 투자" },
                        ] },
                        { term: ["6월"], subDetails: [
                            { term: "GS리테일", desc: "보건복지부와 저소득층 일자리 창출 위한 업무 협약" },
                            { term: "GS25", desc: "편의점 업계 유일의 동반성장지수 '우수' 획득" },
                        ] },
                        { term: ["1월", "GS25"], desc: "아시아태평양 유통산업 어워즈 수상" },
                    ] },
                    { period: "2016", details: [
                        { term: ["7월", "GS25"], desc: "업계 최초 경영주와 상생협력협약 체결" },
                        { term: ["6월"], subDetails: [
                            { term: "GS리테일", desc: "업계 최초 전기차충전 점포 오픈 (GS25서귀대포점)" },
                            { term: "GS25", desc: "GS25, 1만점 돌파" },
                        ] },
                        { term: ["5월", "GS리테일"], desc: "파트너사와 식품 안전 세미나 및 다짐대회 <br />파트너사와의 소통하는 유어스데이(youus Day) 진행" },
                        { term: ["3월"], subDetails: [
                            { term: "GS리테일", desc: "통합 PB브랜드 유어스 론칭" },
                            { term: "GS25", desc: "경영주 위한 무료법률자문 서비스 시작" },
                        ] },
                        { term: ["1월", "GS SHOP"], desc: "기획재정부와 (협동조합 판로 지원 협약식) 체결" },
                    ] },
                    { period: "2015", details: [
                        { term: ["11월", "GS25"], desc: "네이버와 O2O 서비스 활성화를 위한 전략적 MOU 체결" },
                        { term: ["8월", "GS리테일"], desc: "전역간부 취창업 활성화를 위한 국방전직교육원과 MOU 체결" },
                        { term: ["7월"], subDetails: [
                            { term: "GS리테일", desc: "파르나스 호텔 인수" },
                            { term: "GS SHOP", desc: "데이터 홈쇼핑 GS MY SHOP 개국" },
                        ] },
                        { term: ["4월", "GS리테일"], desc: "우리은행과 상생결제시스템 MOU 체결" },
                    ] },
                    { period: "2014", details: [
                        { term: ["7월", "GS리테일"], desc: "한국기상산업진흥원과 CS WIN-WIN 협약 체결, <br />협력사와 식품안전세미나 및 다짐대회 진행" },
                        { term: ["6월", "GS SHOP"], desc: "GS강서타워 준공" },
                        { term: ["4월", "GS25"], desc: "서울시와 '여성안심지킴이 집' 공동협력 협약 체결" },
                        { term: ["2월", "GS SHOP"], desc: "말레이시아 시장 진출" },
                        { term: ["1월", "GS리테일"], desc: "중소 파트너사 임직원과 동반성장 세미나 진행" },
                    ] },
                    { period: "2013", details: [
                        { term: ["11월", "GS리테일"], desc: "안동시 우수 농수축산물 공급 및 유통에 관한 양해각서(MOU) 체결" },
                        { term: ["5월", "GS리테일"], desc: "대한무역투자진흥공사와 CS WIN-WIN 협약 체결 <br />우리은행과 2천억 상생펀드 조성" },
                        { term: ["3월", "GS리테일"], desc: "공주물류센터 오픈" },
                    ] },
                    { period: "2012", details: [
                        { term: ["8월", "GS리테일"], desc: "진주물류센터 오픈" },
                        { term: ["7월", "GS SHOP"], desc: "인도네시아 시장 진출" },
                        { term: ["4월"], subDetails: [
                            { term: "GS리테일", desc: "통영시와 MOU체결" },
                            { term: "GS SHOP", desc: "중국 시장 진출" },
                        ] },
                        { term: ["3월", "GS리테일"], desc: "중소 파트너사 임직원과 동반성장 세미나 진행" },
                        { term: ["2월", "GS SHOP"], desc: "베트남 시장 진출" },
                        { term: ["1월", "GS리테일"], desc: "푸드뱅크와 업무 협약 체결" },
                    ] },
                    { period: "2011", details: [
                        { term: ["12월", "GS리테일"], desc: "유가증권 상장" },
                        { term: ["11월", "GS리테일"], desc: "POP카드출시" },
                        { term: ["8월", "GS리테일"], desc: "전라남도 진도군과 MOU체결" },
                        { term: ["5월", "GS SHOP"], desc: "태국 시장 진출" },
                        { term: ["4월", "GS리테일"], desc: "전라남도 보성군과 MOU체결" },
                        { term: ["3월", "GS리테일"], desc: "발안물류센터 오픈" },
                    ] },
                ],
            },
            {
                period: "2010-2004",
                title: "업계 최고 차별화 <br />경쟁력 확보",
                items: [
                    { period: "2010", details: [
                        { term: ["5월", "GS25"], desc: "해군PX 운영자로 선정" },
                        { term: ["4월", "GS리테일"], desc: "무안군-무안황토랑 유통공사와 MOU체결" },
                        { term: ["3월"], subDetails: [
                            { term: "GS리테일", desc: "서울특별시와 '시민고객이 행복한 서울만들기' 협약체결" },
                            { term: "GS SHOP", desc: "모바일 웹/앱 서비스 개시" },
                        ] },
                        { term: ["1월", "GS리테일"], desc: "농가에 상생매출 지원 통합 콜센터 오픈" },
                    ] },
                    { period: "2009", details: [
                        { term: ["12월", "GS SHOP"], desc: "2009년 공정거래 자율준수프로그램(CP) 등급평가 'AA' 등급 획득" },
                        { term: ["11월"], subDetails: [
                            { term: "GS리테일", desc: "고객만족 경영대상 종합대상 수상" },
                            { term: "GS SHOP", desc: "통합 브랜드 GS SHOP 출범" },
                        ] },
                        { term: ["9월", "GS리테일"], desc: "미스터도넛 가맹사업 실시" },
                        { term: ["6월", "GS리테일"], desc: "㈜후레쉬서브(FRESH SERVE) HACCP(식품위해요소중점관리기준) 획득" },
                    ] },
                    { period: "2008", details: [
                        { term: ["11월", "GS리테일"], desc: "지하철 9호선 상가운영자로 선정" },
                        { term: ["9월", "GS리테일"], desc: "㈜후레쉬서브(FRESH SERVE) 준공" },
                        { term: ["3월", "GS리테일"], desc: "GS넷비전 출범" },
                    ] },
                    { period: "2007", details: [
                        { term: ["9월", "GS SHOP"], desc: "부산 콜센터 개소" },
                        { term: ["4월", "GS리테일"], desc: "미스터도넛 1호점 개점" },
                    ] },
                    { period: "2006", details: [
                        { term: ["10월", "GS SHOP"], desc: "홈쇼핑 전용 이천 물류센터 개소" },
                        { term: ["1월", "GS 리테일"], desc: "메리츠화재/AIG손해보험과 금융서비스 MOU체결" },
                    ] },
                    { period: "2005", details: [
                        { term: ["11월"], subDetails: [
                            { term: "GS25", desc: "2천호점 돌파(구로에이스점)" },
                            { term: "GS리테일", desc: "GS리테일-넥슨, 전략적 업무제휴 체결<br />한국물류대상 종합산업포장 수상" },
                        ] },
                        { term: ["4월", "GS SHOP"], desc: "GS홈쇼핑으로 사명 변경" },
                        { term: ["3월", "GS리테일"], desc: "GS리테일로 사명변경 및 사업명칭 변경 <br />(편의점 GS25, 대형슈퍼 GS수퍼마켓, 할인점 GS마트, <br />백화점 GS스퀘어, GS왓슨스 1호점 개점)" },
                        { term: ["2월", "GS리테일"], desc: "LG유통, 코오롱마트 인수" },
                    ] },
                    { period: "2004", details: [
                        { term: ["12월", "랄라블라"], desc: "헬스&뷰티 전문기업 GS왓슨스 설립" },
                        { term: ["11월", "GS SHOP"], desc: "㈜GS텔레서비스(콜센터) 개소" },
                        { term: ["7월", "GS리테일"], desc: "LG유통, ㈜LG에서 분할되어 ㈜GS홀딩스로 편입" },
                        { term: ["6월", "GS리테일"], desc: "LG25, 우정사업본부와 전략적 제휴 – 우체국에 편의점 설치" },
                        { term: ["5월", "GS리테일"], desc: "LG유통, 안성시와 우리 농산물 사랑협약서 체결" },
                    ] },
                ],
            },
            {
                period: "2002-1999",
                title: "새로운 유통업 <br />강자로의 발돋움",
                items: [
                    { period: "2002", details: [
                        { term: ["9월"], subDetails: [
                            { term: "GS리테일", desc: "월간조선 선정 '한국의 50대 기업' 선정" },
                            { term: "GS25", desc: "LG25 1천호점 개점" },
                        ] },
                        { term: ["7월", "GS리테일"], desc: "LG그룹 유통 3사 ㈜LG유통으로 통합 - ㈜LG유통, ㈜LG수퍼센터, <br />㈜LG백화점" },
                        { term: ["1월", "GS리테일"], desc: "FM 사업 별도법인으로 독립 - ㈜GMRO" },
                    ] },
                    { period: "2000", details: [
                        { term: ["11월", "GS리테일"], desc: "FOOD SERVICE 사업 별도법인으로 분리 - ㈜아워홈" },
                        { term: ["5월", "GS SHOP"], desc: "인터넷 쇼핑몰 오픈" },
                    ] },
                    { period: "1999", details: [
                        { term: ["8월", "GS리테일"], desc: "LG강남타워 준공" },
                    ] },
                ],
            },
            {
                period: "1997-1990",
                title: "종합유통사로의 <br />도약",
                items: [
                    { period: "1997", details: [
                        { term: ["3월", "GS SHOP"], desc: "LG홈쇼핑으로 사명 변경" },
                        { term: ["1월", "GS리테일"], desc: "마트 사업 LG상사로 이관" },
                    ] },
                    { period: "1996", details: [
                        { term: ["11월", "GS리테일"], desc: "LG마트 1호점 고양점 개점" },
                        { term: ["4월", "GS SHOP"], desc: "카탈로그 사업 개시"},
                    ] },
                    { period: "1995", details: [
                        { term: ["10월", "GS SHOP"], desc: "국내최초 24시간 TV 홈쇼핑 방송" },
                        { term: ["8월", "GS SHOP"], desc: "국내최초 TV 홈쇼핑 방송 개시"},
                    ] },
                    { period: "1994", details: [
                        { term: ["12월", "GS SHOP"], desc: "법인 설립 (㈜한국홈쇼핑)" },
                        { term: ["7월", "GS리테일"], desc: "백화점 사업 별도법인으로 분리 - ㈜LG백화점"},
                    ] },
                    { period: "1992", details: [
                        { term: ["1월", "GS리테일"], desc: "LG마키(백화점) 1호점 안산점 개점" },
                    ] },
                    { period: "1991", details: [
                        { term: ["1월", "GS리테일"], desc: "㈜LG유통으로 상호 변경" },
                    ] },
                    { period: "1990", details: [
                        { term: ["12월", "GS25"], desc: "LG25 1호점 경희점 개점" },
                    ] },
                ],
            },
            {
                period: "1987-1971",
                title: "유통업의 <br />기반을 다지다",
                items: [
                    { period: "1987", details: [ 
                        { term: ["7월", "GS리테일"], desc: "Food Service 사업 1호점 트윈타워 사원 식당 운영 개시" },
                        { term: ["6월", "GS리테일"], desc: "LG트윈타워 준공" },
                    ] },
                    { period: "1984", details: [
                        { term: ["7월", "GS리테일"], desc: "광고사업 별도법인으로 분리 - ㈜엘지애드" },
                        { term: ["1월", "GS리테일"], desc: "희성제지㈜ 합병" },
                    ] },
                    { period: "1980", details: [
                        { term: ["7월", "GS리테일"], desc: "럭키체인㈜ 합병" },
                    ] },
                    { period: "1978", details: [
                        { term: ["4월", "GS리테일"], desc: "금성사 광고부문 인수" },
                    ] },
                    { period: "1975", details: [
                        { term: ["2월", "GS리테일"], desc: "희성산업㈜으로 상호변경" },
                    ] },
                    { period: "1974", details: [
                        { term: ["5월", "GS리테일"], desc: "럭키수퍼 1호점 을지로 삼풍점 개점" },
                    ] },
                    { period: "1971", details: [
                        { term: ["2월", "GS리테일"], desc: "금성전공㈜ 설립" },
                    ] },
                ],
            },
        ],
    },
    en: {
        MainTitle: "History",
        MainTabs: [
            { item: "Present - 2019" },
            { item: "2018 - 2011" },
            { item: "2010 - 2004" },
            { item: "2002 - 1999" },
            { item: "1997 - 1990" },
            { item: "1987 - 1971" },
        ],
        HistoryTabs: [
            {
                period: "Present-2019",
                title: "Leaping Forward as a <br />Lifestyle Platform",
                items: [
                    { period: "2025", details: [
                        { term: ["Dec", "GS Retail"], desc: "Awarded '$10 Million Export Tower' & Achieved 'AA' grade in Compliance Program (CP) evaluation" }, /* 260624 edit 이소라 */
                        { term: ["Nov"], subDetails: [
                            { term: "GS25", desc: "Surpassed 400 stores nationwide in Vietnam & 50 stores in Hanoi" },
                            { term: "GS Retail", desc: "Achieved 'A+' grade in ESG evaluation for two consecutive years" }
                        ] },
                        { term: ["Oct", "GS25"], desc: "Surpassed 1 million followers on Instagram" },
                        { term: ["Sep", "GS25"], desc: "- GS SHOP Signature Program 'Jigeum Baek Ji-yeon' Launch <br />- BI Renewal" }, /* 260624 edit 이소라 */
                        { term: ["Aug", "GS SHOP"], desc: "Launched 'RENEECRU' rebranding" },
                        { term: ["Jun", "GS SHOP"], desc: "Participated in 'THAIFEX 2025' exhibition in Bangkok, Thailand" },
                        { term: ["May", "GS25"], desc: "Exported PB and differentiated products to Don Quijote in Japan" },
                        { term: ["Apr", "GS25"], desc: "Opened FC Seoul brand specialized store" },
                        { term: ["Mar"], subDetails: [
                            { term: "GS25", desc: "First Korean convenience store to expand into Hanoi, Vietnam" },
                            { term: "GS Retail", desc: "Appointment of Seo Hong Hur as CEO of GS Retail" }
                        ] },
                        { term: ["Jan", "GS Retail"], desc: "Launched integrated membership 'GS ALL'" },
                    ] },
                    { period: "2024", details: [
                        { term: ["Nov", "GS Retail"], desc: "Nominated new CEO Seo Hong Hur" },
                        { term: ["Oct", "GS Retail"], desc: "- Achieved 'Best' grade in Win-Win Growth Index <br />- 'A+' integrated grade in ESG" }, /* 20260622 edit 이소라 : 텍스트수정 */
                        { term: ["Sep", "GS SHOP"], desc: "Reorganized into 'AI Lifestyle Commerce' application" },
                        { term: ["Aug"], subDetails: [
                            { term: "GS SHOP", desc: "Implemented the industry's first generative 'AI Studio'" },
                            { term: "GS25", desc: "Opened 'Ground Blue 49'" }
                        ] },
                        { term: ["Jul", "GS THE FRESH"], desc: "Surpassed 500 stores" },
                        { term: ["Jun", "GS SHOP"], desc: "Reached 100 million views within 6 months of launching 'Shortpick'" },
                        { term: ["May"], subDetails: [
                            { term: "GS THE FRESH", desc: "Celebrated 50th Anniversary" },
                            { term: "GS25", desc: "Surpassed 300 GS25 stores in Vietnam" }
                        ] },
                        { term: ["Apr", "GS Retail"], desc: "Signed an MOU with GOPIZZA" },
                        { term: ["Mar", "GS25"], desc: "Launched gift item storage service for delivery & pickup orders" }
                    ] },
                    { period: "2023", details: [
                        { term: ["Dec", "GS SHOP"], desc: "Acquired the 7th Consumer Centered Management (CCM) re-certification" },
                        { term: ["Nov", "GS25"], desc: "First in the convenience store industry to achieve an A+ (Excellent) grade in ESG Environmental evaluation" },
                        { term: ["Sep"], subDetails: [
                            { term: "GS Retail", desc: "'Our Neighborhood GS' MAU. Achieves No. 1 Among Offline Retailer Apps" },  /* 20260622 edit 이소라 : 텍스트수정 */
                            { term: "GS SHOP", desc: "First in the home shopping industry to build a network-based broadcast system (NDI)" }
                        ] },
                        { term: ["Jun", "GS THE FRESH"], desc: "Surpassed 400 stores" },
                        { term: ["Mar", "GS Retail"], desc: "Launched integrated membership system" },
                        { term: ["Feb"], subDetails: [
                            { term: "GS25", desc: "Relaunched 'Hyeja-round Jipbap' (Kim Hye-ja Lunch Box)"},
                            { term: "GS Retail", desc: "Selected as Korea's Best Workplace 2023" },
                        ] },
                        { term: ["Jan"], subDetails: [
                            { term: "GS Retail", desc: "Launched 'Yo-Convenience Store' service in partnership with Yogiyo" },
                            { term: "GS25", desc: "Won the Grand Prize in Brand Identity category at the 28th Korea Best Design Awards (GS25 Godsang Project)" }
                        ] },
                    ] },
                    { period: "2022", details: [
                        { term: ["Dec"], subDetails: [
                            { term: "GS Retail", desc: "Signed strategic alliance with KAVIAR" },
                            { term: "GS Fresh Mall", desc: "Launched GS Fresh Mall 'Immediate Delivery' service" },
                            { term: "GS25", desc: "Surpassed 200 GS25 stores in Vietnam" }
                        ] },
                        { term: ["11월", "GS THE FRESH"], desc: "Introduced GS THE FRESH Seafood Traceability System" },
                        { term: ["Oct"], subDetails: [
                            { term: "GS Retail", desc: "Signed climate crisis response business agreement with Korea Polar Research Institute" },
                            { term: "GS25", desc: "Opened the 100th GS25 store in Mongolia" }
                        ] },
                        { term: ["Aug", "GS25"], desc: "GS25 YouTube channel 'Come Here' became first in industry to exceed 1M subscribers" },
                        { term: ["Jul", "GS Fresh Mall"], desc: "Launched online integrated paid membership service 'Prime Membership' (GS Fresh Mall)" },
                        { term: ["Jun", "GS25"], desc: "First convenience store to launch online payment system for child meal cards in Seoul" },
                        { term: ["Apr", "GS THE FRESH"], desc: "First supermarket to open a financial innovation store (GS THE FRESH Gwangjin Hwayang branch)" },
                        { term: ["Feb", "GS25"], desc: "First convenience store to introduce chicken cooking robot (Cooperation with Roboarete)" },
                        { term: ["Jan", "GS Retail"], desc: "Acquired stakes in Cookat" }
                    ] },
                    { period: "2021", details: [
                        { term: ["Aug", "GS Retail"], desc: "Launched GS Pay" },
                        { term: ["Jul", "GS Retail"], desc: "Merger of GS Retail X GS Home Shopping" },
                        { term: ["May", "GS Retail"], desc: "First in industry to simultaneously acquire ISO14001 and 9001 certifications" },
                        { term: ["Mar"], subDetails: [
                            { term: "GS25", desc: "Surpassed 100 GS25 stores in Vietnam" },
                            { term: "GS Retail", desc: "Launched ESG Steering Committee" }
                        ] }
                    ] },
                    { period: "2020", details: [
                        { term: ["Dec", "GS SHOP"], desc: "Opened Blockchain Quality Traceability Management System (b-link)" },
                        { term: ["Nov"], subDetails: [
                            { term: "GS Retail", desc: "Approved merger between GS Retail and GS Home Shopping" },
                            { term: "GS25", desc: "Launched AI robot delivery service" }
                        ] },
                        { term: ["Oct", "Dalisalda"], desc: "Opened organic specialized mall 'Dalisalda'" },
                        { term: ["Sep", "GS THE FRESH"], desc: "Opened corporate social responsibility supermarket 'Tomorrow Store'" },
                        { term: ["Aug", "GS Retail"], desc: "Launched delivery platform business 'Woodil'" },
                        { term: ["Jul", "GS25"], desc: "Opened corporate social responsibility convenience store 'Tomorrow Store'" },
                        { term: ["Jun", "GS Retail"], desc: "Launched alcohol smart order service 'Wine25 Plus'" },
                        { term: ["Apr"], subDetails: [
                            { term: "GS Retail", desc: "Conducted the industry's first drone delivery pilot service" },
                            { term: "GS SHOP", desc: "Opened Gunpo Logistics Center" }
                        ] },
                        { term: ["Jan", "GS25"], desc: "Opened future-oriented convenience store GS25 Eulji Smart branch" }
                    ] },
                    { period: "2019", details: [
                        { term: ["Nov", "GS Retail"], desc: "Launched abandoned dog volunteer group 'GS Vet Lovers'" },
                        { term: ["Sep", "GS25"], desc: "'My Own Refrigerator App' surpassed 10 million cumulative downloads" },
                        { term: ["Jul", "GS SHOP"], desc: "Introduced eco-friendly delivery service" },
                        { term: ["May", "GS THE FRESH"], desc: "Opened discount-type supermarket store" },
                        { term: ["Mar", "GS25"], desc: "Launched new application for GS25/GS Supermarket & Half-price Delivery service" },
                        { term: ["Jan", "GS25"], desc: "Opened All Plus Store" }
                    ] }
                ],
            },
            {
                period: "2018-2011",
                title: "Global Market <br />Expansion",
                items: [
                    { period: "2018", details: [
                        { term: ["Dec", "GS Retail"], desc: "Acquired GSPark24" },
                        { term: ["Sep", "GS25"], desc: "Opened Smart GS25 (inside LG CNS Headquarters at Magok Science Park)" },
                        { term: ["Apr", "GS SHOP"], desc: "Established Fair Broadcasting Center" },
                        { term: ["Feb", "lalavla"], desc: "Launched lalavla" },
                        { term: ["Jan", "GS25"], desc: "Opened first branch in Vietnam" },
                    ] },
                    { period: "2017", details: [
                        { term: ["Dec", "GS Retail"], desc: "Launched SIMPLY COOK" },
                        { term: ["Sep"], subDetails: [
                            { term: "GS Retail", desc: "Signed disaster relief business agreement with Ministry of the Interior and Safety" },
                            { term: "GS SHOP", desc: "Invested 50 billion KRW strategically in NHN PAYCO" },
                        ] },
                        { term: ["Jul"], subDetails: [
                            { term: "GS25", desc: "Announced the convenience store industry's first win-win cooperation plan" },
                            { term: "GS SHOP", desc: "Invested $25 million in global kitchenware manufacturer World Kitchen (Corelle)" },
                        ] },
                        { term: ["Jun"], subDetails: [
                            { term: "GS25", desc: "Achieved 'Excellent' in Win-Win Growth Index, sole in convenience store industry" },
                            { term: "GS Retail", desc: "Signed an agreement with Ministry of Health and Welfare for job creation for low-income citizens" },
                        ] },
                        { term: ["Jan", "GS25"], desc: "Won the Asia-Pacific Retail Excellence Awards" },
                    ] },
                    { period: "2016", details: [
                        { term: ["Jul", "GS25"], desc: "First in industry to sign a Win-Win Cooperation Agreement with franchise owners" },
                        { term: ["Jun"], subDetails: [
                            { term: "GS Retail", desc: "Opened industry's first EV charging store (GS25 Seogwi Daepo branch)" },
                            { term: "GS25", desc: "GS25 surpassed 10,000 stores" },
                        ] },
                        { term: ["May", "GS Retail"], desc: "Conducted Food Safety Seminar and Resolution Meeting with partner companies <br />& Hosted 'Youus Day' to communicate with partners" },
                        { term: ["Mar"], subDetails: [
                            { term: "GS Retail", desc: "Launched integrated PB brand 'Youus'" },
                            { term: "GS25", desc: "Started free legal consultation service for store owners" },
                        ] },
                        { term: ["Jan", "GS SHOP"], desc: "Signed an agreement with Ministry of Economy and Finance to support cooperative market channels" },
                    ] },
                    { period: "2015", details: [
                        { term: ["Nov", "GS25"], desc: "Signed a strategic MOU with Naver for vitalizing O2O services" },
                        { term: ["Aug", "GS Retail"], desc: "Signed an MOU with Defense Employment Training Institute to support veterans employment and startup" },
                        { term: ["Jul"], subDetails: [
                            { term: "GS Retail", desc: "Acquired Parnas Hotel" },
                            { term: "GS SHOP", desc: "Opened Data Home Shopping 'GS MY SHOP'" },
                        ] },
                        { term: ["Apr", "GS Retail"], desc: "Signed an MOU with Woori Bank for Win-Win Payment System" },
                    ] },
                    { period: "2014", details: [
                        { term: ["Jul", "GS Retail"], desc: "Signed CS WIN-WIN agreement with Korea Meteorological Industry Promotion Agency <br />& Hosted Food Safety Seminar with partner firms" },
                        { term: ["Jun", "GS SHOP"], desc: "Completed GS Gangseo Tower construction" },
                        { term: ["Apr", "GS25"], desc: "Signed safe haven project for women agreement with Seoul Metropolitan Government" },
                        { term: ["Feb", "GS SHOP"], desc: "Expanded into Malaysian Market" },
                        { term: ["Jan", "GS Retail"], desc: "Conducted Win-Win Growth Seminar with executives of small and medium partners" },
                    ] },
                    { period: "2013", details: [
                        { term: ["Nov", "GS Retail"], desc: "Signed an MOU with Andong City for supply and distribution of excellent agricultural, marine and livestock products" },
                        { term: ["May", "GS Retail"], desc: "Signed CS WIN-WIN agreement with KOTRA <br />& Created a 200 billion KRW win-win fund with Woori Bank" },
                        { term: ["Mar", "GS Retail"], desc: "Opened Gongju Logistics Center" },
                    ] },
                    { period: "2012", details: [
                        { term: ["Aug", "GS Retail"], desc: "Opened Jinju Logistics Center" },
                        { term: ["Jul", "GS SHOP"], desc: "Expanded into Indonesian Market" },
                        { term: ["Apr"], subDetails: [
                            { term: "GS Retail", desc: "Signed an MOU with Tongyeong City" },
                            { term: "GS SHOP", desc: "Expanded into Chinese Market" },
                        ] },
                        { term: ["Mar", "GS Retail"], desc: "Conducted Shared Growth Seminar with small and medium partners" },
                        { term: ["Feb", "GS SHOP"], desc: "Expanded into Vietnamese Market" },
                        { term: ["Jan", "GS Retail"], desc: "Signed a business agreement with Food Bank" },
                    ] },
                    { period: "2011", details: [
                        { term: ["Dec", "GS Retail"], desc: "Listed on the KOSPI market" },
                        { term: ["Nov", "GS Retail"], desc: "Launched POP Card" },
                        { term: ["Aug", "GS Retail"], desc: "Signed an MOU with Jindo-gun, Jeollanam-do" },
                        { term: ["May", "GS SHOP"], desc: "Expanded into Thailand Market" },
                        { term: ["Apr", "GS Retail"], desc: "Signed an MOU with Boseong-gun, Jeollanam-do" },
                        { term: ["Mar", "GS Retail"], desc: "Opened Balan Logistics Center" },
                    ] },
                ],
            },
            {
                period: "2010-2004",
                title: "Securing Top-tier <br />Differentiated Competitiveness",
                items: [
                    { period: "2010", details: [
                        { term: ["May", "GS25"], desc: "Selected as the official operator for Navy PX" },
                        { term: ["Apr", "GS Retail"], desc: "Signed an MOU with Muan-gun and Muan Hwangtorang Distribution Corporation" },
                        { term: ["Mar"], subDetails: [
                            { term: "GS Retail", desc: "Signed an agreement with Seoul Metropolitan Government for 'Making Happy Seoul for Citizens'" },
                            { term: "GS SHOP", desc: "Launched mobile web and application services" },
                        ] },
                        { term: ["Jan", "GS Retail"], desc: "Opened integrated call center to support farm win-win sales" },
                    ] },
                    { period: "2009", details: [
                        { term: ["Dec", "GS SHOP"], desc: "Achieved 'AA' grade in 2009 Compliance Program (CP) evaluation" },
                        { term: ["Nov"], subDetails: [
                            { term: "GS Retail", desc: "Won the Grand Prize at Customer Satisfaction Management Awards" },
                            { term: "GS25", desc: "Launched integrated brand GS SHOP" },
                        ] },
                        { term: ["Sep", "GS Retail"], desc: "Initiated Mister Donut franchise business operations" },
                        { term: ["Jun", "GS Retail"], desc: "FRESH SERVE Co., Ltd. acquired HACCP certification" },
                    ] },
                    { period: "2008", details: [
                        { term: ["Nov", "GS Retail"], desc: "Selected as the store operator for Subway Line 9" },
                        { term: ["Sep", "GS Retail"], desc: "Completed FRESH SERVE Co., Ltd. facility construction" },
                        { term: ["Aug", "GS Retail"], desc: "Launched GS Netvision" },
                    ] },
                    { period: "2007", details: [
                        { term: ["Sep", "GS SHOP"], desc: "Opened Busan Call Center" },
                        { term: ["Apr", "GS Retail"], desc: "Opened the 1st branch of Mister Donut" },
                    ] },
                    { period: "2006", details: [
                        { term: ["Oct", "GS SHOP"], desc: "Opened Icheon Logistics Center dedicated to home shopping" },
                        { term: ["Jan", "GS Retail"], desc: "Signed an MOU for financial services with Meritz Fire & AIG Insurance" },
                    ] },
                    { period: "2005", details: [
                        { term: ["Nov"], subDetails: [
                            { term: "GS25", desc: "Surpassed 2,000 stores (Guro Ace branch)" },
                            { term: "GS Retail", desc: "Signed strategic business alliance between GS Retail and Nexon <br />& Received Korea Logistics Awards Industrial Service Medal" },
                        ] },
                        { term: ["Apr", "GS SHOP"], desc: "Changed company name to GS Home Shopping" },
                        { term: ["Mar", "GS Retail"], desc: "Changed company and business names to GS Retail <br />(Convenience store GS25, Supermarket GS Supermarket, Discount store GS Mart, <br />Department store GS Square, & Opened the 1st branch of GS Watsons)" },
                        { term: ["Feb", "GS Retail"], desc: "LG Mart acquired Kolon Mart" },
                    ] },
                    { period: "2004", details: [
                        { term: ["Dec", "lalavla"], desc: "Established GS Watsons, a health & beauty enterprise" },
                        { term: ["Nov", "GS SHOP"], desc: "Opened GS Teleservice Co., Ltd. (Call Center)" },
                        { term: ["Jul", "GS Retail"], desc: "LG Mart split from LG Co., Ltd. and incorporated into GS Holdings" },
                        { term: ["Jun", "GS Retail"], desc: "LG25 signed strategic alliance with Korea Post to install stores in post offices" },
                        { term: ["May", "GS Retail"], desc: "LG Mart signed an agreement with Ansing City to promote local agricultural products" },
                    ] },
                ],
            },
            {
                period: "2002-1999",
                title: "Emerging as a New Power <br />in the Retail Industry",
                items: [
                    { period: "2002", details: [
                        { term: ["Sep"], subDetails: [
                            { term: "GS Retail", desc: "Selected as one of 'Korea's Top 50 Companies' by Monthly Chosun" },
                            { term: "GS25", desc: "LG25 opened its 1,000th store" },
                        ] },
                        { term: ["Jul", "GS Retail"], desc: "Integrated three retail affiliates of LG Group into LG Mart Co., Ltd. - LG Mart, LG Super Center, <br />and LG Department Store" },
                        { term: ["Jan", "GS Retail"], desc: "FM business split into an independent entity - GMRO Co., Ltd." },
                    ] },
                    { period: "2000", details: [
                        { term: ["Nov", "GS Retail"], desc: "FOOD SERVICE business split into an independent corporation - Ourhome Co., Ltd." },
                        { term: ["May", "GS SHOP"], desc: "Opened online internet shopping mall" },
                    ] },
                    { period: "1999", details: [
                        { term: ["Aug", "GS Retail"], desc: "Completed LG Gangnam Tower construction" },
                    ] },
                ],
            },
            {
                period: "1997-1990",
                title: "Leaping into a Comprehensive <br />Retail Enterprise",
                items: [
                    { period: "1997", details: [
                        { term: ["Mar", "GS SHOP"], desc: "Changed company name to LG Home Shopping" },
                        { term: ["Jan", "GS Retail"], desc: "Transferred Mart business division to LG International Corp." },
                    ] },
                    { period: "1996", details: [
                        { term: ["Nov", "GS Retail"], desc: "Opened the 1st LG Mart branch in Goyang" },
                        { term: ["Apr", "GS SHOP"], desc: "Started catalog business division operations"},
                    ] },
                    { period: "1995", details: [
                        { term: ["Oct", "GS SHOP"], desc: "First 24-hour TV home shopping broadcast in Korea" },
                        { term: ["Aug", "GS SHOP"], desc: "Launched the first TV home shopping broadcast in Korea"},
                    ] },
                    { period: "1994", details: [
                        { term: ["Dec", "GS SHOP"], desc: "Established legal corporation (Korea Home Shopping Co., Ltd.)" },
                        { term: ["Jul", "GS Retail"], desc: "Department store division split into independent legal entity - LG Department Store Co., Ltd."},
                    ] },
                    { period: "1992", details: [
                        { term: ["Jan", "GS Retail"], desc: "Opened the 1st branch of LG Mart (Department Store) in Ansan" },
                    ] },
                    { period: "1991", details: [
                        { term: ["Jan", "GS Retail"], desc: "Changed corporate name to LG Mart Co., Ltd." },
                    ] },
                    { period: "1990", details: [
                        { term: ["Dec", "GS25"], desc: "Opened the 1st LG25 branch (Gyeonghui branch)" },
                    ] },
                ],
            },
            {
                period: "1987-1971",
                title: "Laying the Foundations <br />of Retail Business",
                items: [
                    { period: "1987", details: [ 
                        { term: ["Jul", "GS Retail"], desc: "Started Food Service business at the Twin Towers cafeteria" },
                        { term: ["Jun", "GS Retail"], desc: "Completed LG Twin Towers facility construction" },
                    ] },
                    { period: "1984", details: [
                        { term: ["Jul", "GS Retail"], desc: "Advertising business split into independent corporation - LG Ad Co., Ltd." },
                        { term: ["Jan", "GS Retail"], desc: "Merged with Heesung Paper Co., Ltd." },
                    ] },
                    { period: "1980", details: [
                        { term: ["Jul", "GS Retail"], desc: "Merged with Lucky Chain Co., Ltd." },
                    ] },
                    { period: "1978", details: [
                        { term: ["Apr", "GS Retail"], desc: "Acquired GoldStar Advertising business division" },
                    ] },
                    { period: "1975", details: [
                        { term: ["Feb", "GS Retail"], desc: "Changed corporate name to Heesung Industries Co., Ltd." },
                    ] },
                    { period: "1974", details: [
                        { term: ["May", "GS Retail"], desc: "Opened the 1st branch of Lucky Supermarket (Euljiro Samphung branch)" },
                    ] },
                    { period: "1971", details: [
                        { term: ["Feb", "GS Retail"], desc: "Established GoldStar Electric Enterprise Co., Ltd." },
                    ] },
                ],
            },
        ],
    }
};

const t = computed(() => langData[props.lang] || langData.ko);
const currentHistoryTab = computed(() => t.value.HistoryTabs?.[MainTabIdx.value] || { period: "", title: "", items: [] });
</script>
<style scoped>
.main-container { width: 100%; position: relative; display: block; }
.title_wrap { width: 100%; max-height: 480px; padding: 10.91% 0 11.25%; text-align: center; position: relative; display: block; background-color: transparent; background-image: url("@/assets/images/dummy/gsrab02_01.png"); background-repeat: no-repeat; background-size: cover; background-position: center -90px; }
.title_wrap::after { content: ""; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3); position: absolute; left: 0; top: 0; z-index: 1; }
.title_wrap > h2 { color: #fff; font-weight: 700; font-size: 7.2rem; line-height: 1.24; letter-spacing: -0.02em; position: relative; z-index: 2; }
.panel { padding: 120px 0 0; }
.sec_history { display: grid; grid-template-columns: clamp(280px, 32vw, 480px) minmax(0, 1fr); gap: 20px; align-items: start; }
.history_intro > header { min-height: 230px; }
.history_intro > header > p { margin: 0; color: #67676f; font-size: 2.4rem; font-weight: 400; line-height: 1.5; letter-spacing: -0.01em; }
.history_intro > header > h3 { margin: 8px 0 0; font-size: 4.8rem; font-weight: 700; line-height: 1.3; letter-spacing: -0.01em; }
.sec_history :deep(.history_period) { width: auto; padding:7px 0;}
.sec_history :deep(.history_detail_row) { grid-template-columns: 40px minmax(0, 1fr); }
.sec_history :deep(.history_detail_content) { padding-top:14.5px;gap:0; }
.sec_history :deep(.history_detail_content:last-child) { padding-bottom:30.5px; }
.sec_history :deep(.history_detail_content + .history_detail_content) { padding-top:4.5px; }
.sec_history :deep(.history_detail_content > dd) { margin-left:12px; }
.sec_history :deep(.history_term_primary) { padding:14.5px 0;}

@media screen and (max-width: 1024px) {
    .sec_history :deep(.history_detail_content) { grid-auto-flow: row;grid-template-columns: minmax(0, 1fr);}
}

@media screen and (max-width: 768px) {
    .main-container{padding-top:84px;} /* 26.06.09 add 정다희 : 모바일 스타일 적용 */
    :deep(.tab_wrap){margin:0;}
    .title_wrap { display: none; }
    .panel { padding: 60px 0 0; }  /* 26.06.26 edit 이소라 */
    .sec_history { grid-template-columns: minmax(0, 1fr); gap: 60px; }
    .history_intro > header { min-height: 0; }
    .history_intro > header > p { display: none; }
    .history_intro > header > h3 { margin-top: 0; font-size: 2.8rem; line-height: 1.35; }
    .sec_history :deep(.history_period) { font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.01em; }
    .sec_history :deep(.history_body) { margin: 0; padding-bottom: 94px; }
    .sec_history :deep(.history_detail_list) { gap: 0; }
    .sec_history :deep(.history_item) { gap: 32px; }
    .sec_history :deep(.history_list) { padding-left: 48px; }
    .sec_history :deep(.history_item::before) { width: 8px; height: 8px; border-width: 8px; left: -48px; }
    .sec_history :deep(.history_item:not(:last-child)::after) { left: -36px; }
    .sec_history :deep(.history_detail_row) { gap: 10px; padding: 0; }
    .sec_history :deep(.history_term_primary) { padding: 16px 0; }
    .sec_history :deep(.history_detail_content) { min-height: 95px; padding: 16px 0; row-gap: 12px; }
    .sec_history :deep(.history_detail_content + .history_detail_content) { padding-top:16px; }
    .sec_history :deep(.history_detail_content > dt), .sec_history :deep(.history_detail_content > dd) { font-size: 1.6rem; line-height: 1.24; letter-spacing: 0%; }
    .sec_history :deep(.history_detail_content > dd) { margin: 0; }
}
</style>
