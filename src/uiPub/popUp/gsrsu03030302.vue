<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <p class="intro_desc">{{ t.intro }}</p>

                <section class="fresh_guide_list">
                    <ol>
                        <li v-for="(step, index) in t.steps" :key="index">
                            <div>
                                <strong class="title">{{ step.title }}</strong>
                                <p class="desc">{{ step.content }}</p>
                            </div>
                        </li>
                    </ol>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "gsrsu03030302",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    closeLabel: "닫기",
                    MainTitle: "맛, 선도 지킴이",
                    intro: '신선, 맛, NO.1을 위한 GS리테일의 선도 지킴이 활동을 확인해보세요.\nGS리테일은 가장 맛있고 신선하며 안전이 검증된, 차별화된 상품만을 엄선하여 고객님께 제공합니다.',
                    steps: [
                        { title: 'Step 01. 신선한 상품', content: '당사기준에 적합한 산지의 신선한 상품만을 공급합니다.' },
                        { title: 'Step 02. 완벽한 검품', content: '물류센터에 상품이 입고되면 완벽한 검품 활동을 통해, 불량상품 입고를 원천봉쇄 합니다.' },
                        { title: 'Step 03. 최적의 온도', content: '차량 내 할로겐과 냉장기를 통해 신선함을 유지할 수 있는 최적의 온도로 배송합니다.' },
                        { title: 'Step 04. 점포 내 관리', content: '점포에서는 가장 신선한 상품을 고객에게 제공하기 위하여 점포별 선도지킴이를 운영하고 있으며 선도지킴이는 상품의 선도 및 판매기간을 수시로 확인하여 최고의 상품을 고객님께 제공하고 있습니다.' },
                        { title: 'Step 05. 고객 만족', content: '산지, 물류센터를 거쳐 점포 및 고객님께 판매되기까지 완벽한 콜드체인시스템(Cold Chain System) 으로 고객님에게 산지의 맛과 신선함을 그대로 전달해드리고 있습니다.' }
                    ]
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    MainTitle: "Guardian of Taste and Freshness"/* 260604 번역 */,
                    intro: `Discover GS Retail's Freshness Guardian program, dedicated to being No. 1 in freshness, taste, and quality. GS Retail carefully selects only the most delicious, fresh, and safety-verified products for our customers.`,
                    steps: [
                        { title: 'Step 01. Fresh Products', content: 'Only fresh products from producing regions that meet our standards are supplied.' },
                        { title: 'Step 02. Thorough Quality Inspection', content: 'When products arrive at the distribution center, thorough inspection procedures are carried out to block all defective products from entering.' },
                        { title: 'Step 03. Optimal Temperature', content: 'Products are delivered at optimal temperatures using in-vehicle halogen heaters and refrigeration units to maintain freshness.' },
                        { title: 'Step 04. In-Store Management', content: 'Each store operates a designated Freshness Guardian to provide customers with the freshest products possible. The Freshness Guardian regularly monitors product freshness and remaining shelf life to ensure only the finest products reach our customers.' },
                        { title: 'Step 05. Customer Satisfaction', content: 'From growing regions through distribution centers to stores and into your hands, our complete Cold Chain System delivers the original taste and freshness straight from the source.' }
                    ]
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
.pop_space .intro_desc {color:#444; font-size:18px; line-height:26px; white-space: pre-line;}
.fresh_guide_list {margin-top:35px; white-space: pre-line;}
.fresh_guide_list ol li{height:140px;padding-left:145px;border-top:1px solid #DFDFDF}
.fresh_guide_list ol li:after{content:"";display:inline-block;height:100%;vertical-align:middle}
.fresh_guide_list ol li:first-child{background-image:url('@/assets/images/dummy/fresh_guide_img01.png'); background-repeat:no-repeat; background-position:0 center}
.fresh_guide_list ol li:nth-child(2){background-image:url('@/assets/images/dummy/fresh_guide_img02.png'); background-repeat:no-repeat; background-position:0 center}
.fresh_guide_list ol li:nth-child(3){background-image:url('@/assets/images/dummy/fresh_guide_img03.png'); background-repeat:no-repeat; background-position:0 center}
.fresh_guide_list ol li:nth-child(4){background-image:url('@/assets/images/dummy/fresh_guide_img04.png'); background-repeat:no-repeat; background-position:0 center}
.fresh_guide_list ol li:nth-child(5){background-image:url('@/assets/images/dummy/fresh_guide_img05.png'); background-repeat:no-repeat; background-position:0 center}
.fresh_guide_list ol li {display:flex;align-items:center;}
.fresh_guide_list ol li .title {margin-bottom:10px;font-size:18px;font-weight:700;color:#222}
.fresh_guide_list ol li .desc {font-size:15px;color:#444;line-height:25px}

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; padding-bottom:24px;}
    .fresh_guide_list {margin-top:25px;}
    .fresh_guide_list ol li {height:auto; padding-top:20px;margin-top:20px;padding-left:90px;background-size:auto 80px;}
    .fresh_guide_list ol li .title {font-size:16px;}
}
</style>