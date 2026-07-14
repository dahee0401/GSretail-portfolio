<template>
    <div class="content">

        <div class="board_detail_wrap">
            <!-- board title -->
            <div class="detail_title">
                <strong class="tit">
                    {{ t.title }}
                </strong>
                <p class="info">
                    <em>{{ t.cate }}</em>
                    <span class="date">{{ t.date }}</span>
                </p>
            </div>
            <!-- //board title -->

            <!-- board body -->
            <div class="board_detail_cont">
                <section class="summary_box">
                    <p class="summary_text">{{ t.summaryText }}</p>
                    <ul class="summary_list">
                        <li v-for="(item, idx) in t.summaryList" :key="'summary-' + idx">{{ item }}</li>
                    </ul>
                </section>

                <section class="toc_section">
                    <h3>{{ t.tocTitle }}</h3>
                    <ul class="toc_list">
                        <li v-for="(item, idx) in t.tocList" :key="'toc-' + idx">{{ item }}</li>
                    </ul>
                </section>

                <section class="content_section" v-for="(item, idx) in t.contentSections" :key="'section-' + idx">
                    <dl>
                        <dt><span>{{ idx + 1 }}.</span>{{ item.title }}</dt>
                        <dd>{{ item.text1 }}</dd>
                        <dd>{{ item.text2 }}</dd>
                    </dl>
                </section>
            </div>
            <!-- //board body -->

            <div class="bottom_btns">
                <button class="btn_back" @click="handleBack">{{ t.ListBack }}</button>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "gsrin04",
    components: { },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            /* 언어별 텍스트 데이터 */
            langData: {
                ko: {
                    title: "GS샵 분트로이, AI 모델 입은 S/S 컬렉션 공개. 출근복과 일상복의 경계 허문다",
                    cate: "GS SHOP",
                    date: "2026.02.05",
                    summaryText: "전체 컨텐츠에 대한 요약 정리 내용이 나오는 부분입니다.",
                    summaryList: [
                        "이런 항목 리스트가 나올 수도 있을 것 같습니다.",
                        "이런 항목 리스트가 나올 수도 있을 것 같습니다."
                    ],
                    tocTitle: "목차",
                    tocList: ["목차 리스트 제목 1", "목차 리스트 제목 2", "목차 리스트 제목 3", "목차 리스트 제목 4"],
                    contentSections: [
                        {
                            title: "목차 리스트 제목 1번이 나오는 부분입니다.",
                            text1: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 퍼포먼스 워크웨어를 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트 GS샵 자체 패션 브랜드 중 남성 라인 첫 정식 론칭하고, AI 남성 모델로 콘텐츠 일괄 제작한 내용입니다.",
                            text2: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 퍼포먼스 워크웨어를 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트입니다."
                        },
                        {
                            title: "목차 리스트 제목 2번이 나오는 부분입니다.",
                            text1: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 퍼포먼스 워크웨어를 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트 GS샵 자체 패션 브랜드 중 남성 라인 첫 정식 론칭하고, AI 남성 모델로 콘텐츠 일괄 제작한 내용입니다.",
                            text2: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 퍼포먼스 워크웨어를 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트입니다."
                        },
                        {
                            title: "목차 리스트 제목 3번이 나오는 부분입니다.",
                            text1: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 퍼포먼스 워크웨어를 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트 GS샵 자체 패션 브랜드 중 남성 라인 첫 정식 론칭하고, AI 남성 모델로 콘텐츠 일괄 제작한 내용입니다.",
                            text2: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 퍼포먼스 워크웨어를 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트입니다."
                        },
                        {
                            title: "목차 리스트 제목 4번이 나오는 부분입니다.",
                            text1: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 퍼포먼스 워크웨어를 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트 GS샵 자체 패션 브랜드 중 남성 라인 첫 정식 론칭하고, AI 남성 모델로 콘텐츠 일괄 제작한 내용입니다.",
                            text2: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 퍼포먼스 워크웨어를 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트입니다."
                        }
                    ],
                    ListBack: "목록으로 돌아가기"
                },
                en: {
                    title: "GS Shop's Buntroy unveils its S/S collection on AI models, blurring the line between workwear and everyday wear"/* 260604 번역 */,
                    cate: "GS SHOP",
                    date: "2026.02.05",
                    summaryText: "This is where the summary of all content appears."/* 260604 번역 */,
                    summaryList: [
                        "A list of items like this could also appear."/* 260604 번역 */,
                        "A list of items like this could also appear."/* 260604 번역 */
                    ],
                    tocTitle: "Table of Contents",
                    tocList: ["Table of Contents Item Title 1"/* 260604 번역 */, "Table of Contents Item Title 2"/* 260604 번역 */, "Table of Contents Item Title 3"/* 260604 번역 */, "Table of Contents Item Title 4"/* 260604 번역 */],
                    contentSections: [
                        {
                            title: "This is where Table of Contents Item Title 1 appears."/* 260604 번역 */,
                            text1: "Buntroy showcases performance workwear for the S/S season with enhanced durability and mobility added to its existing concept. Overcoming spatial constraints to broaden customer choice, with a made-to-order approach offering more reasonable prices as a key highlight. This marks the first official launch of a menswear line among GS Shop's own fashion brands, with all content produced using AI male models."/* 260604 번역 */,
                            text2: "Buntroy showcases performance workwear for the S/S season with enhanced durability and mobility added to its existing concept. Overcoming spatial constraints to broaden customer choice, with a made-to-order approach offering more reasonable prices as a key highlight."/* 260604 번역 */
                        },
                        {
                            title: "This is where Table of Contents Item Title 2 appears."/* 260604 번역 */,
                            text1: "Buntroy showcases performance workwear for the S/S season with enhanced durability and mobility added to its existing concept. Overcoming spatial constraints to broaden customer choice, with a made-to-order approach offering more reasonable prices as a key highlight. This marks the first official launch of a menswear line among GS Shop's own fashion brands, with all content produced using AI male models."/* 260604 번역 */,
                            text2: "Buntroy showcases performance workwear for the S/S season with enhanced durability and mobility added to its existing concept. Overcoming spatial constraints to broaden customer choice, with a made-to-order approach offering more reasonable prices as a key highlight."/* 260604 번역 */
                        },
                        {
                            title: "This is where Table of Contents Item Title 3 appears."/* 260604 번역 */,
                            text1: "Buntroy showcases performance workwear for the S/S season with enhanced durability and mobility added to its existing concept. Overcoming spatial constraints to broaden customer choice, with a made-to-order approach offering more reasonable prices as a key highlight. This marks the first official launch of a menswear line among GS Shop's own fashion brands, with all content produced using AI male models."/* 260604 번역 */,
                            text2: "Buntroy showcases performance workwear for the S/S season with enhanced durability and mobility added to its existing concept. Overcoming spatial constraints to broaden customer choice, with a made-to-order approach offering more reasonable prices as a key highlight."/* 260604 번역 */
                        },
                        {
                            title: "This is where Table of Contents Item Title 4 appears."/* 260604 번역 */,
                            text1: "Buntroy showcases performance workwear for the S/S season with enhanced durability and mobility added to its existing concept. Overcoming spatial constraints to broaden customer choice, with a made-to-order approach offering more reasonable prices as a key highlight. This marks the first official launch of a menswear line among GS Shop's own fashion brands, with all content produced using AI male models."/* 260604 번역 */,
                            text2: "Buntroy showcases performance workwear for the S/S season with enhanced durability and mobility added to its existing concept. Overcoming spatial constraints to broaden customer choice, with a made-to-order approach offering more reasonable prices as a key highlight."/* 260604 번역 */
                        }
                    ],
                    ListBack: "Back to Brand List"
                }
            }
        };
    },
    computed: { 
        t() { 
            return this.langData[this.lang] || this.langData.ko; 
        } 
    },
    methods: {
    },
    mounted() {
        const header = document.getElementById("header");

        header.classList.add("head_black");
    }
};
</script>

<style scoped>
/* .board_detail_cont { width: 100%; } */
.summary_box { padding: 48px 60px; background: #f2f2f4; border-radius: 16px; }
.summary_text { color: #161616; font-size: 2.4rem; font-weight: 400; line-height: 1.5; }
.summary_list { margin-top: 16px; }
.summary_list > li { position: relative; margin-top: 8px; padding-left: 13px; color: #161616; font-size: 2rem; font-weight: 400; line-height: 1.35; }
.summary_list > li::before { position: absolute; top: 12px; left: 0; width: 3px; height: 3px; background: #67676f; border-radius: 50%; content: ""; }
.summary_list > li:first-child { margin-top: 0; }

.toc_section { margin-top: 48px; }
.toc_section > h3 { color: #161616; font-size: 2rem; font-weight: 700; line-height: 1.35; }
.toc_list { margin-top: 8px; }
.toc_list > li { position: relative; margin-top: 8px; padding-left: 13px; color: #161616; font-size: 2rem; font-weight: 400; line-height: 1.35; }
.toc_list > li::before { position: absolute; top: 12px; left: 0; width: 3px; height: 3px; background: #67676f; border-radius: 50%; content: ""; }
.toc_list > li:first-child { margin-top: 0; }

.content_section { padding: 40px 0; border-top: 1px solid #e5e5e9; }
.toc_section + .content_section { margin-top: 48px; }
.content_section > dl > dt { display: flex; align-items: center; gap: 8px; color: #161616; font-size: 2rem; font-weight: 700; line-height: 1.35; }
.content_section > dl > dt > span { display: inline-block; }
.content_section > dl > dd { margin-top: 24px; color: #67676f; font-size: 2rem; font-weight: 400; line-height: 1.35; word-break: keep-all; }
.content_section > dl > dd + dd { margin-top: 16px; }
@media screen and (max-width: 1024px) {
    .summary_box { padding: 40px; }
}
@media screen and (max-width: 767px) {
    .summary_box { padding: 24px 20px; border-radius: 12px; }
    .summary_text { font-size: 1.8rem; line-height: 1.44; text-align: left; }
    .summary_list { margin-top: 12px; }
    .summary_list > li { margin-top: 6px; font-size: 1.6rem; line-height: 1.5; }
    .summary_list > li::before { top: 10px; }
    .toc_section { margin-top: 32px; }
    .toc_section > h3 { font-size: 1.8rem; line-height: 1.44; }
    .toc_list { margin-top: 10px; }
    .toc_list > li { margin-top: 6px; font-size: 1.6rem; line-height: 1.5; }
    .toc_list > li::before { top: 10px; }
    .toc_section + .content_section { margin-top: 32px; }
    .content_section { padding: 24px 0; }
    .content_section > dl > dt { font-size: 1.8rem; line-height: 1.44; }
    .content_section > dl > dd { margin-top: 16px; font-size: 1.6rem; line-height: 1.5; }
    .content_section > dl > dd + dd { margin-top: 12px; }
}
</style>