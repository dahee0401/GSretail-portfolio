<template>
    <div class="diff_qr_row" :class="variant">
        <!-- 26.07.08 add 정다희 : variant에 따라 figure 분기 -->
        <template v-if="variant === 'gopizza'">
            <figure aria-hidden="true">
                <img :src="imgGoPizza" alt="GOPIZZQ 앱" width="90" height="90" />
            </figure>
        </template>
        <template v-else>
            <figure class="qr" aria-hidden="true">
                <img :src="imgQr" alt="앱 다운로드 QR코드" width="90" height="90" />
            </figure>
            <figure aria-hidden="true">
                <img :src="imgGs" alt="우리동네 GS 앱" width="90" height="90" />
            </figure>
        </template>
        <!-- //26.07.08 add 정다희 : variant에 따라 figure 분기 -->
        <div>
            <strong>{{ title }}</strong>
            <p v-html="isMobileView && mobileDesc ? mobileDesc : desc"></p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from "vue";
import imgQr from "@/assets/images/dummy/qr-app-download.svg"; /**26.07.08 add 정다희 : QR 이미지 추가 */
import imgGs from "@/assets/images/dummy/qr_app.png"; /**26.07.08 add 정다희 : 우리동네 GS 이미지 추가 */
// import imgGsMo from "@/assets/images/dummy/mo/qr_app_mo.png"; /**26.07.08 add 정다희 : 우리동네 GS 모바일 이미지 추가 */
import imgGoPizza from "@/assets/images/dummy/qr_app_gopizza.png"; /**26.07.08 add 정다희 : GoPizza QR 이미지 추가 */
defineProps({
    title: { type: String, default: "" },
    desc:  { type: String, default: "" },
    mobileDesc: { type: String, default: "GS25의 다양한 이벤트와 차별화 상품" },
    variant: { type: String, default: "app" }, /**26.07.08 add 정다희 : app(QR+우리동네GS) / gopizza(단일 QR) */
});

const isMobileView = ref(window.innerWidth <= 768);
const onResize = () => { isMobileView.value = window.innerWidth <= 768; };

onMounted(() => window.addEventListener("resize", onResize));
onUnmounted(() => window.removeEventListener("resize", onResize));
</script>

<style scoped>
img {
    width: 100%;
    display: block;
}

.diff_qr_row {
    max-width: 100%;
    margin-top: 40px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.diff_qr_row > figure {
    width: 90px;
    height: 90px;
    margin: 0;
    background-color: #fff;
    border-radius: 10px;
    flex-shrink: 0;
}
/* .diff_qr_row > figure:nth-child(2){
    padding:0;
    border:0;
} */
.diff_qr_row > div { 
    min-width: 0;
    flex: 1;
}

.diff_qr_row > div > strong {
    margin: 0 0 5px;
    color: #161618;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: -0.01em;
}

.diff_qr_row > div > strong + p {
    margin: 0;
    color: #67676f;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: -0.01em;
}

/* 26.07.08 add 정다희 : gopizza title에만 ::after (예: 화살표 아이콘) */
.diff_qr_row.gopizza > div > strong{display:inline-flex; align-items:center;}
.diff_qr_row.gopizza > div > strong::after { content: ""; width: 20px; height: 20px; margin-left: 8px; background: url('@/assets/images/common/icon_set_20.png') -979px -24px no-repeat; display: block;}

@media (max-width: 768px) {
    .diff_qr_row {
        position:relative;
        gap:12px;
    }
    .diff_qr_row > figure {
        width: 48px;
        height: 48px;
        padding:0;
        border:0;
    }
    .diff_qr_row > figure.qr{display:none;}
    .diff_qr_row > figure > img{
        height: 48px;
    }
    .diff_qr_row > div{
        padding:0;
    }
    .diff_qr_row > div > strong{
        margin: 0 0 4px;
        font-size: 1.6rem;
    }
    .diff_qr_row:after{
        content:"";
        width: 16px;
        height: 16px;
        position:absolute;
        top: 50%;
        right:16px;
        transform: translateY(-50%);
        background:url('@/assets/images/common/arrow_set_16.png') -56px -20px no-repeat;
    }
    .diff_qr_row.gopizza > div > strong::after{display:none;}
}

</style>
