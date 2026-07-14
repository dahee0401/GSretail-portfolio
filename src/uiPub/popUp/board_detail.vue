<template>
    <div class="modal_cont">
        <div class="modal_header">
            <a href="#none" @click="closeModal" class="btn_close">닫기</a>
        </div>

        <div class="modal_content">

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

                    <!-- editor 내용 노출 -->
                    <p><img src="@/assets/images/dummy/sample_news_detail_01.png" alt="" /></p> <!-- 26.06.17 add 정다희 : 상단 제목과 중복되어 장식 이미지 처리 -->
                    <p>{{ t.detail }}</p>
                    <!-- editor 내용 노출 -->

                </div>
                <!-- //board body -->
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
                    detail: "분트로이, 기존 콘셉트에 내구성과 활동성 강화한 S/S 시즌 ‘퍼포먼스 워크웨어’ 선보여 공간 제약 극복해 고객 선택폭 확대, 주문 방식으로 보다 합리적인 가격도 주목 포인트 GS샵 자체 패션 브랜드 중 남성 라인 첫  정식 론칭하고, AI 남성 모델로 콘텐츠 일괄 제작 18일(수) 21시 45분 방송서 아스킨 니트, 플렉슈라 재킷∙팬츠, 카프리 팬츠 등 선보일 예정",
                    ListBack: "목록으로 돌아가기"
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
        closeModal(event) { modal.close(event.currentTarget); },
    },
    mounted() {
        const header = document.getElementById("header");

        header.classList.add("head_black");
    }
};
</script>

<style scoped>
.btnSection.bottom {margin-top:20px; display:flex; justify-content:space-between;}
.btnSection.bottom .btn_icon_back {height:auto; padding:4px; color:#161616; font-size:2rem; line-height:135%; letter-spacing:-0.01em; background-color:#fff; display:inline-flex; align-items:center;}
.btnSection.bottom .btn_icon_back:before {width:16px; height:27px; margin-right:12px; background-color:red; content:''; display:block;}

@media screen and (max-width: 1024px) {
}
@media screen and (max-width: 767px) {
}
</style>