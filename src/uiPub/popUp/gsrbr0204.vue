<template>
    <div class="modal_cont gsrbr0204">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">

            <ul class="card_grid owner_card_layout">
                <li v-for="(item, idx) in t.cards" :key="'owner-feat-'+idx" class="strategy_card">
                    <div class="card_head">
                        <figure class="image_wrap">
                            <img :src="item.imgSrc" :alt="item.alt" />
                        </figure>
                        <strong>{{ item.tit }}</strong>
                    </div>
                    <p class="card_desc" v-html="item.desc"></p>
                    <a :href="item.link" class="btn_icon btn_big border">
                        {{ item.Btn }}
                    </a>
                </li>
            </ul>

            <!-- modal bottom -->
            <div class="modal_bottom">
                <div class="btnBox">
                    <a href="#none" @click="closeModal" class="btn_big primary">{{ t.check}}</a>
                </div>
            </div>
            <!-- //modal bottom -->
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";
import img01 from "@/assets/images/dummy/gsrbr0204_01.png";
import img02 from "@/assets/images/dummy/gsrbr0204_02.png";

export default {
    name: "gsrbr0204",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "입지제안",
                    cards: [
                        { imgSrc: img01, alt: "GS25 로고", tit: "추천기준", desc: "지역 : 전국<br/>규모: 영업면적 10평 이상 임차점포", Btn:"입지제안 바로가기", link:"gsrst02010101" },
                        { imgSrc: img02, alt: "GS THE FRESH 로고", tit: "추천기준", desc: "지역 : 전국<br/>규모: 전용면적 50평 이상", Btn:"입지제안 바로가기",link:"gsrst01010101" },
                    ],
                    check: "확인",
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Location Inquiry",
                    cards: [
                        { imgSrc: img01, alt: "GS25 Logo"/* 260604 번역 */, tit: "Recommendation criteria"/* 260604 번역 */, desc: "Region: Nationwide<br/>Size: Leased store with a business area of 10 pyeong or more"/* 260604 번역 */, Btn:"Go to location proposal"/* 260604 번역 */ },
                        { imgSrc: img02, alt: "GS THE FRESH Logo"/* 260604 번역 */, tit: "Recommendation criteria"/* 260604 번역 */, desc: "Region: Nationwide<br/>Size: Exclusive area of 50 pyeong or more"/* 260604 번역 */, Btn:"Go to location proposal"/* 260604 번역 */ },
                    ],
                    check: "Confirm",
                }
            }
        };
    },
    computed: {
        t() {
            return this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko;
        }
    },
    methods: {
        closeModal(event) {
            modal.close(event.currentTarget);
        }
    }
};
</script>

<style scoped>
.sub_title { font-family: "Pretendard", Helvetica; font-weight: 700; font-size: 32px; color: #161616; }
.card_grid { display: flex; gap: 20px; }
.strategy_card { padding: 40px; background: #F8F8F8; border-radius: 12px; flex: 1;}
.card_head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 20px; }
.card_head .image_wrap { margin-bottom: 24px; }
.card_head strong { font-size: 24px; color: #161616; }
.card_desc { margin-bottom: 20px; font-size: 18px; color: #67676F; line-height: 140%; }
.modal_bottom { margin-top: 60px; }
.modal_bottom .btn_big { min-width: 134px; }

img {max-width:100%;}
@media screen and (max-width: 1024px) {
    .card_grid {margin-bottom:20px; flex-direction:column;}
    .modal_bottom { display: none }
}
</style>