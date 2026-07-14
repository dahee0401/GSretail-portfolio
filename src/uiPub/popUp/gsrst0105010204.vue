<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">닫기</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <dl>
                    <dt>전화 번호</dt>
                    <dd>010-0000-0000</dd>
                    <dt>카카오톡</dt>
                    <dd>
                        <figure class="image_wrap">
                            <img src="" alt="QR Code">
                        </figure>
                    </dd>
                    <dd>* 카카오톡 상담 가능</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: "gsrst0105010204",
    data() {
        return {
            langData: {
                ko: {
                    MainTitle: "연락처",
                },
                en: {
                    MainTitle: "Contact",
                }
            }
        };
    },
    computed: { 
        t() { 
            // langData가 없거나, 해당 언어 데이터가 없을 경우를 모두 대비
            const data = this.langData[this.lang] || this.langData.ko;
            return data || {}; 
        } 
    },
    methods: {
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
.pop_space dt { font-size: 1.6rem; line-height: 150%;}
.pop_space dd { font-size: 1.6rem; line-height: 150%;}
.pop_space dd + dt {margin-top:16px;}
.pop_space dd .image_wrap {margin:16px 0;width:120px; height:120px;}
.pop_space dd .image_wrap img {width:100%; height:100%;}

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; margin-bottom:24px;}
}
</style>