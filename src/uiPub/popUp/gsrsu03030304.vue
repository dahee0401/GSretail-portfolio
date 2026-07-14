<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <p class="intro_desc">{{ t.intro }}</p>

                <!-- 위해상품 차단 절차안내 -->
                <section class="section">
                    <strong class="title">{{ t.section1.title }}</strong>
                    <p class="desc">{{ t.section1.desc }}</p>
                    <!-- 이미지 영역 -->
                    <picture class="image_wrap">
                        <source media="(max-width: 768px)" :srcset="t.section1.image.srcMo" />
                        <img :src="t.section1.image.src" :alt="t.section1.image.alt">
                    </picture>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "gsrsu03030304",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "위해상품 차단 시스템",
                    intro: '안전한 상품을 제공해 드리기 위해 위해상품 차단 시스템에 참여하고 있습니다.',
                    section1: {
                        title: '위해상품 차단 절차안내',
                        desc: '09년 멜라닌 파동 등 위해상품 판매사고가 연이어 발생하여 상품 안전성에 대한 국민적 관심이 고조 되었으나,\n판매점으로 정보 전달 및 위해상품 수거가 원할하게 이루어지지 않아 이에 정부는 위해 상품 발견 시 판매 즉시차단 및 조기 소거되도록\n“위해상품차단시스템”을 구축하였으며, 당사는 시스템 운영 초기부터 참여하고 있습니다.',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img13.png"),
                            srcMo: require("@/assets/images/dummy/mo/safe_fresh_img13_mo.png"),
                            alt: '위해상품 차단 절차안내'
                        }
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Hazardous Product Blocking System",
                    intro: 'To provide safe products, we participate in the Hazardous Product Blocking System.'/* 260604 번역 */,
                    section1: {
                        title: 'Guide to the Hazardous Product Blocking Procedure'/* 260604 번역 */,
                        desc: 'In 2009, sales accidents involving hazardous products, such as the melamine scandal, occurred one after another, heightening public concern over product safety.\nHowever, as the transmission of information to retail outlets and the recovery of hazardous products were not carried out smoothly, the government established the “Hazardous Product Blocking System” so that, upon discovery of a hazardous product, its sale is immediately blocked and it is removed early. The Company has participated in this system since the early stage of its operation.'/* 260604 번역 */,
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img13.png"),
                            srcMo: require("@/assets/images/dummy/mo/safe_fresh_img13_mo.png"),
                            alt: 'Guide to the Hazardous Product Blocking Procedure'/* 260604 번역 */
                        }
                    }
                }
            }
        };
    },
    computed: { 
        t() { 
            // langData가 없거나, 해당 언어 데이터가 없을 경우를 모두 대비
            const data = this.langData[(document.querySelector('.language button.current')?.textContent.trim().toLowerCase()||'ko')] || this.langData.ko;
            return data || {}; 
        } 
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
.pop_space .intro_desc {color:#444; font-size:18px; line-height:26px;}
.pop_space .title {display:block;font-size:18px;font-weight:700;padding-bottom:20px}
.pop_space .title_b {display:block;font-size:15px;font-weight:700;padding:25px 0 6px 0}
.pop_space .section {padding:35px 0;border-bottom:1px solid #dfdfdf}
.pop_space .section:last-child {border-bottom:0}
.pop_space .section .desc {font-size:15px;line-height:25px;white-space:pre-line}
.pop_space .image_wrap {display:block; margin-top:30px}
.pop_space .image_wrap img {width:100%}

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; padding-bottom:24px;}
}
</style>