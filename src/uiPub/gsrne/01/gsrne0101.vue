<template>
    <div class="content">

        <div class="board_detail_wrap">
            <!-- board title -->
            <div class="detail_title">
                <strong class="tit">{{ t.title }}</strong>
                <p class="info">
                    <em>{{ t.cate }}</em>
                    <span class="date">{{ t.date }}</span>
                </p>
            </div>
            <!-- //board title -->

            <!-- board body -->
            <div class="board_detail_cont">
                <!-- 26.05.26 Edit 정다희 : 소제목 및 요약정보 추가 -->
                <h2>{{ t.subTitle }}</h2>
                <dl>
                    <dt>{{ t.summaryTitle }}</dt>
                    <dd>
                        <ul class="list_dotted">
                            <li v-for="(item, index) in t.summaryList" :key="index"><p>{{ item }}</p></li>
                        </ul>
                    </dd>
                </dl>
                <!-- //26.05.26 Edit 정다희 : 소제목 및 요약정보 추가 -->
                <!-- editor 내용 노출 -->
                <div class="img_wrap"><img src="@/assets/images/dummy/sample_news_detail_01.png" :alt="t.detailImageAlt" /></div>
                <p>{{ t.detail }}</p>
                <!-- editor 내용 노출 -->
                <!-- 26.05.26 Edit 정다희 : FAQ 영역 추가 -->
                <div class="faq_box">
                    <h3>{{ t.faqTitle }}</h3>
                    <ul class="ft_sec_list">
                        <li v-for="(faq, faqIndex) in t.faqList" :key="faqIndex">
                            <article>
                                <h4>{{ faq.title }}</h4>
                                <ol class="num_list">
                                    <li v-for="(item, itemIndex) in faq.items" :key="itemIndex">
                                        <p>{{ item }}</p>
                                    </li>
                                </ol>
                            </article>
                        </li>
                    </ul>
                </div>
                <!-- //26.05.26 Edit 정다희 : FAQ 영역 추가 -->
            </div>
            <!-- //board body -->

            <!-- 26.05.11 Edit 이종환 : 하단 목록 버튼 통일 -->
            <div class="bottom_btns">
                <button class="btn_back" @click="handleBack">{{ t.ListBack }}</button>
            </div>
            <!-- //26.05.11 Edit 이종환 : 하단 목록 버튼 통일 -->
        </div>

    </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    name: "gsrin04",
    components: {},
    setup() {
        const route = useRoute();
        const router = useRouter();
        const isGuide = computed(() => route.path.startsWith("/guide"));

        const lang = ref("ko");

        const setLang = (value) => {
            lang.value = value;
        };

        const langData = {
            ko: {
                title: "GS샵 분트로이, AI 모델 입은 S/S 컬렉션 공개. 출근복과 일상복의 경계 허문다",
                cate: "GS SHOP",
                date: "2026.02.05",
                subTitle: "소제목이 들어가는 영역입니다",
                summaryTitle: "요약 정보가 들어가는 영역입니다",
                summaryList: [
                    "2009년 (주)신한은행 부행장",
                    "2009년 (주)신한은행 부행장",
                    "2009년 (주)신한은행 부행장",
                    "2009년 (주)신한은행 부행장",
                ],
                detailImageAlt: "",
                detail: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 ‘퍼포먼스 워크웨어’ 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트 GS샵 자체 패션 브랜드 중 남성 라인 첫  정식 론칭하고, AI 남성 모델로 콘텐츠 일괄 제작 18일(수) 21시 45분 방송서 아스킨 니트, 플렉슈라 재킷∙팬츠, 카프리 팬츠 등 선보일 예정",
                faqTitle: "FAQ",
                faqList: [
                    {
                        title: "1. 주주의 권리",
                        items: [
                            "주주는 회사의 소유자이며, 이익 분배에 참여 할 수 있는 권리, 주주총회 참석 및 의결권을 행사 할 수 있는 권리, 주주총회의 목적사항을 제안할 수 있는 권리 등 관련 법령이 보장하는 기본적인 권리를 보장 받는다.",
                            "정관의 변경, 합병, 영업양수도 및 기업의 분할, 해산, 자본금의 감소 등 관련 법령이 정하는 사항 중 회사의 존립과 주주권에 중대한 변화를 가져오는 사항은 주주의 권리를 최대한 보장하여, 주주총회를 통해 결정한다.",
                            "회사는 주주총회의 결의가 투명하고 공정한 절차에 따라 이루어지도록 노력하며, 주주에 대하여 주주총회 참석 전에 주주총회의 일시와 장소 및 의안 의결권의 행사 방법 등에 관하여 충분한 정보를 제공한다.",
                            "주주권의 행사는 주주의 자유로운 의사에 따라 행사되어야 한다.",
                        ],
                    },
                    {
                        title: "2. 주주의 공평한 대우",
                        items: [
                            "주주는 1주 1의결권 원칙에 따라 권리를 보장 받는다. 단, 법령에 의거하여, 특정 주주의 의결권이 제한되는 경우, 관련 법령을 따른다. 회사는 상법 및 관련 법령이 정하는 기준에 따라 주주의 본질적인 권리가 훼손되지 않도록 공평하게 대우한다.",
                            "회사는 주주에게 필요한 정보를 적시에 충분히 이해할 수 있도록 쉽게 구성하여, 공평한 방법으로 제공한다. 또한 부당한 내부거래 및 자기거래로부터 주주가 보호될 수 있도록 노력한다.",
                        ],
                    },
                    {
                        title: "3. 주주의 책임",
                        items: [
                            "주주는 회사의 발전과 이익을 위하여. 자신의 의결권을 적극적으로 행사하여야 한다.",
                            "회사 경영에 영향력을 행사하는 지배주주는 회사와 다른 모든 주주의 이익을 고려하여 주주권을 행사하며, 그 지배권을 남용하여 다른 주주에게 손해가 발생하지 않도록 노력해야 한다.",
                        ],
                    },
                ],
                ListBack: "목록으로 돌아가기",
            },
            en: {
                title: "GS샵 분트로이, AI 모델 입은 S/S 컬렉션 공개. 출근복과 일상복의 경계 허문다",
                cate: "GS SHOP",
                date: "2026.02.05",
                subTitle: "소제목이 들어가는 영역입니다",
                summaryTitle: "요약 정보가 들어가는 영역입니다",
                summaryList: [
                    "2009: Deputy President, Shinhan Bank",
                    "2009: Deputy President, Shinhan Bank",
                    "2009: Deputy President, Shinhan Bank",
                    "2009: Deputy President, Shinhan Bank",
                ],
                detailImageAlt: "",
                detail: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 ‘퍼포먼스 워크웨어’ 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트 GS샵 자체 패션 브랜드 중 남성 라인 첫  정식 론칭하고, AI 남성 모델로 콘텐츠 일괄 제작 18일(수) 21시 45분 방송서 아스킨 니트, 플렉슈라 재킷∙팬츠, 카프리 팬츠 등 선보일 예정",
                faqTitle: "FAQ",
                faqList: [
                    {
                        title: "1. Shareholder Rights",
                        items: [
                            "1. Shareholder Rights<br />(1) Shareholders are the owners of the Company and are guaranteed fundamental rights protected by applicable laws, including the right to participate in profit distribution, the right to attend and vote at General Meetings of Shareholders, and the right to propose agenda items at General Meetings of Shareholders.",
                            "정관의 변경, 합병, 영업양수도 및 기업의 분할, 해산, 자본금의 감소 등 관련 법령이 정하는 사항 중 회사의 존립과 주주권에 중대한 변화를 가져오는 사항은 주주의 권리를 최대한 보장하여, 주주총회를 통해 결정한다.",
                            "회사는 주주총회의 결의가 투명하고 공정한 절차에 따라 이루어지도록 노력하며, 주주에 대하여 주주총회 참석 전에 주주총회의 일시와 장소 및 의안 의결권의 행사 방법 등에 관하여 충분한 정보를 제공한다.",
                            "주주권의 행사는 주주의 자유로운 의사에 따라 행사되어야 한다.",
                        ],
                    },
                    {
                        title: "2. Equal Treatment of Shareholders",
                        items: [
                            "주주는 1주 1의결권 원칙에 따라 권리를 보장 받는다. 단, 법령에 의거하여, 특정 주주의 의결권이 제한되는 경우, 관련 법령을 따른다. 회사는 상법 및 관련 법령이 정하는 기준에 따라 주주의 본질적인 권리가 훼손되지 않도록 공평하게 대우한다.",
                            "회사는 주주에게 필요한 정보를 적시에 충분히 이해할 수 있도록 쉽게 구성하여, 공평한 방법으로 제공한다. 또한 부당한 내부거래 및 자기거래로부터 주주가 보호될 수 있도록 노력한다.",
                        ],
                    },
                    {
                        title: "3. Shareholder Responsibilities",
                        items: [
                            "주주는 회사의 발전과 이익을 위하여. 자신의 의결권을 적극적으로 행사하여야 한다.",
                            "회사 경영에 영향력을 행사하는 지배주주는 회사와 다른 모든 주주의 이익을 고려하여 주주권을 행사하며, 그 지배권을 남용하여 다른 주주에게 손해가 발생하지 않도록 노력해야 한다.",
                        ],
                    },
                ],
                ListBack: "Back to Brand List",
            },
        };

        const t = computed(() => {
            const current = langData[lang.value];
            return current && Object.keys(current).length ? current : langData.ko;
        });

        const handleBack = () => {
            router.back();
        };

        onMounted(() => {
            const header = document.getElementById("header");
            header?.classList.add("head_black");
        });

        return { isGuide, lang, setLang, t, handleBack };
    },
};
</script>

<style scoped>
.btnSection.bottom {margin-top:20px; display:flex; justify-content:space-between;}
.btnSection.bottom .btn_icon_back {height:auto; padding:4px; color:#161616; font-size:2rem; line-height:135%; letter-spacing:-0.01em; background-color:#fff; display:inline-flex; align-items:center;}
.btnSection.bottom .btn_icon_back:before {width:16px; height:27px; margin-right:12px; background-color:red; content:''; display:block;}
.board_detail_cont h2{font-weight: 400;font-size: 2.4rem;line-height: 1.5;letter-spacing: -0.01em;}
.board_detail_cont dl {margin-top:48px;}
.board_detail_cont dl > dt{font-weight: 700;font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;}
.board_detail_cont dl > dd > .list_dotted li{margin-top:10px;}
.board_detail_cont dl > dd > .list_dotted li >p{color:#67676F;font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;}
.board_detail_cont .img_wrap{margin-top:48px;}
.board_detail_cont .img_wrap > img{border-radius:24px;}
.board_detail_cont > p{color: #67676F;max-width:661px;margin-top:48px;font-size: 2rem;line-height: 1.35;letter-spacing: -0.01em;}
/* faq 리스트 */
.faq_box {margin-top:48px;padding:30px; border-radius:8px; background-color:#F8F8F8;}
.faq_box >h3{margin-bottom:32px;font-size: 2.4rem;line-height: 1.35;letter-spacing: -0.01em;}
.faq_box .ft_sec_list{padding:0;}


@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 767px) {
    .board_detail_cont h2{font-size:2rem;line-height:1.35;}
    .board_detail_cont dl{margin-top:38px;} 
    .board_detail_cont dl > dd > .list_dotted li{margin-top:4px;}
    .board_detail_cont dl > dd > .list_dotted li > p{font-size:1.6rem;line-height:1.5;}
    .board_detail_cont .img_wrap{margin-top:38px;}
    .board_detail_cont > p{margin-top:38px;}
    .faq_box{margin-top:38px;}
    .ft_sec_list > li > article{gap:16px;}
}
</style>