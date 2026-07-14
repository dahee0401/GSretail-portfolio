<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">닫기</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <p class="intro_desc">{{ t.intro }}</p>

                <div class="pop_guide_wrap">

                    <section class="section">
                        <div class="smp_announcement">
                            <table class="base_table">
                                <colgroup>
                                    <col style="width:150px" />
                                    <col style="width:120px" />
                                    <col style="width:150px" />
                                    <col style="" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th scope="col" class="ac" colspan="3">항목</th>
                                        <th scope="col" class="ac">비용</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, idx) in t.IRListData" :key="'ir-'+idx">
                                        <th class="al" v-if="item.rs1 > 0" :rowspan="item.rs1" :colspan="item.cs1 || 1">{{ item.title }}</th>
                                        <th class="al" v-if="item.rs2 > 0" :rowspan="item.rs2" :colspan="item.cs2 || 1">{{ item.item1 }}</th>
                                        <th class="al" v-if="item.rs3 > 0" :rowspan="item.rs3" :colspan="item.cs3 || 1">{{ item.item2 }}</th>
                                        <td class="ac" v-if="item.rs4 > 0" :rowspan="item.rs4" :colspan="item.cs4 || 1">{{ item.fee }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="info_banner">
                            <p>점포 총 투자비는 임차비용, 시설투자비용, 개점투자비의 총 합계임.<br>경영주 총수입(경영주 월매출총이익 + 본부지원금) 기준이며, 인건비 등 영업비용 차감 전 입니다.(개점일로부터 최초 1년만 적용)</p>
                        </div>
                    </section>

                    <div class="btn-wrap">
                        <Buttons btn-class="btn_big primary">확인</Buttons>
                        <Buttons btn-class="btn_big gray">인쇄하기</Buttons>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

export default {
    name: "gsrst0105010202",
    components: {
        Buttons
    },
    data() {
        return {
            langData: {
                ko: {
                    MainTitle: "GSF2타입",
                    intro: '경영주가 총투자비의 51% 부담. 경영주 운영',
                    IRListData: [
                        { title: "투자금액", item1: "개점투자", item2: "가맹비", fee: "1,100만원 (부가세포함)", rs1: 9, cs1: 1, rs2: 5, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "", item2: "초기 상품대", fee: "7,000만원", rs1: 0, cs1: 1, rs2: 0, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "", item2: "소모품", fee: "700만원", rs1: 0, cs1: 1, rs2: 0, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "", item2: "시설보증금", fee: "500만원", rs1: 0, cs1: 1, rs2: 0, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "", item2: "개점투자 계", fee: "9,300만원", rs1: 0, cs1: 1, rs2: 0, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "임차비용 부담주체", item2: "", fee: "본부", rs1: 0, cs1: 1, rs2: 1, cs2: 2, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "", item1: "시설투자 부담주체", item2: "", fee: "본부", rs1: 0, cs1: 1, rs2: 1, cs2: 2, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "", item1: "예치보증금", item2: "", fee: "* 점포 총 투자비 X 51% - 9,300만원\n(현금)", rs1: 0, cs1: 1, rs2: 1, cs2: 2, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "", item1: "경영주 투자 합계", item2: "", fee: "9,300만원 + 예치보증금", rs1: 0, cs1: 1, rs2: 1, cs2: 2, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "가맹 수수료(부가세별도)", item1: "", item2: "", fee: "49%\n매출총이익 구간별\n49% ~ 55%", rs1: 1, cs1: 3, rs2: 0, cs2: 0, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "계약기간 (최초/재계약)", item1: "", item2: "", fee: "3년 / 3년 단위", rs1: 1, cs1: 3, rs2: 0, cs2: 0, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "담보설정", item1: "", item2: "", fee: "5천만원", rs1: 1, cs1: 3, rs2: 0, cs2: 0, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "* 최저 수입 보조금", item1: "", item2: "", fee: "영업면적 200㎡ 초과 : 18백만/월\n영업면적 165㎡ 이상~200㎡ 이하 : 16백만/월\n영업면적 165㎡ 미만 : 13백만/월", rs1: 1, cs1: 3, rs2: 0, cs2: 0, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                    ]
                },
                en: {
                    MainTitle: "GSF2 Type"/* 260604 번역 */,
                    intro: 'Store owner bears 51% of total investment cost. Store owner operates'/* 260604 번역 */,
                    IRListData: [
                        { title: "Investment amount"/* 260604 번역 */, item1: "Opening Investment"/* 260604 번역 */, item2: "Franchise Fee"/* 260604 번역 */, fee: "11 million won (VAT included)"/* 260604 번역 */, rs1: 9, cs1: 1, rs2: 5, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "", item2: "Initial merchandise cost"/* 260604 번역 */, fee: "70 million won"/* 260604 번역 */, rs1: 0, cs1: 1, rs2: 0, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "", item2: "Consumables", fee: "7 million won"/* 260604 번역 */, rs1: 0, cs1: 1, rs2: 0, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "", item2: "Facility Deposit"/* 260604 번역 */, fee: "5 million won"/* 260604 번역 */, rs1: 0, cs1: 1, rs2: 0, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "", item2: "Opening Investment Total"/* 260604 번역 */, fee: "93 million won"/* 260604 번역 */, rs1: 0, cs1: 1, rs2: 0, cs2: 1, rs3: 1, cs3: 1, rs4: 1, cs4: 1 },
                        { title: "", item1: "Party responsible for lease costs"/* 260604 번역 */, item2: "", fee: "Headquarters"/* 260604 번역 */, rs1: 0, cs1: 1, rs2: 1, cs2: 2, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "", item1: "Party Bearing Facility Investment"/* 260604 번역 */, item2: "", fee: "Headquarters"/* 260604 번역 */, rs1: 0, cs1: 1, rs2: 1, cs2: 2, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "", item1: "Security Deposit", item2: "", fee: "* Total store investment cost X 51% - 93 million won\n(cash)"/* 260604 번역 */, rs1: 0, cs1: 1, rs2: 1, cs2: 2, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "", item1: "Total Store Owner Investment"/* 260604 번역 */, item2: "", fee: "93 million won + deposit"/* 260604 번역 */, rs1: 0, cs1: 1, rs2: 1, cs2: 2, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "Franchise Fee (VAT not included)"/* 260604 번역 */, item1: "", item2: "", fee: "49%\nby gross sales profit bracket\n49% ~ 55%"/* 260604 번역 */, rs1: 1, cs1: 3, rs2: 0, cs2: 0, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "Contract Period", item1: "", item2: "", fee: "3 years / in 3-year units"/* 260604 번역 */, rs1: 1, cs1: 3, rs2: 0, cs2: 0, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "Collateral Setup"/* 260604 번역 */, item1: "", item2: "", fee: "50 million won"/* 260604 번역 */, rs1: 1, cs1: 3, rs2: 0, cs2: 0, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                        { title: "* Minimum income subsidy"/* 260604 번역 */, item1: "", item2: "", fee: "Sales area over 200㎡: 18 million/month\nSales area 165㎡ or more to 200㎡ or less: 16 million/month\nSales area under 165㎡: 13 million/month"/* 260604 번역 */, rs1: 1, cs1: 3, rs2: 0, cs2: 0, rs3: 0, cs3: 0, rs4: 1, cs4: 1 },
                    ]
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
.pop_space .intro_desc {color:#444; margin-bottom:40px; font-size:20px; line-height:26px;white-space:pre-line;}
.pop_guide_wrap {font-size:15px; line-height:25px;}
.pop_guide_wrap .base_table {width: 100%; margin:5px 0 30px 0; border-collapse: collapse; border-top: 2px solid #161616; }
.pop_guide_wrap .base_table th, 
.pop_guide_wrap .base_table td { padding:12px 24px; border-bottom: 1px solid #E5E5E9; border-right: 1px solid #E5E5E9; font-size:1.8rem; line-height:26px; vertical-align: middle; white-space:pre-line;}
.pop_guide_wrap .base_table th:last-child ,
.pop_guide_wrap .base_table td:last-child { border-right: 0; }
.pop_guide_wrap .base_table thead th { padding:28px 24px; background-color:#F8F8F8; color:#161616; font-weight:700; }
.pop_guide_wrap .base_table td { color: #161616; border-left: 0; }
.pop_guide_wrap .base_table th { border-left: 0;background-color:#F8F8F8; color:#161616; font-weight:normal }
.pop_guide_wrap .base_table td a { font-size: 1.8rem; color: #161616; text-decoration: none; }
.pop_guide_wrap .base_table td a:hover { text-decoration: underline; }
.pop_space .info_banner { margin:40px 0; padding: 20px 20px 24px; background-color: #F9F2EA; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap:wrap;}
.pop_space .info_banner > p { display: flex; align-items: flex-start; gap: 12px; font-size: 1.4rem; line-height: 1.4; }
.pop_space .info_banner > p::before { content: ''; width: 20px; height: 20px; flex-shrink: 0; background-color: #FFB724;  display: block; }
.pop_space .btn-wrap {display:flex; justify-content:flex-end; gap:8px;}
.pop_space .btn-wrap * {width:134px;}
.pop_space .btn-wrap .primary { background: #15b874; }

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; margin-bottom:24px;}
    .pop_space .intro_desc {font-size:16px; padding-bottom:24px;}
    .pop_guide_wrap .base_table col {width: auto !important}
    .pop_guide_wrap .base_table th, 
    .pop_guide_wrap .base_table td {padding:6px 12px; font-size:1.5rem; line-height:22px;}
    .pop_guide_wrap .base_table thead th {padding:18px 12px;}
    .info_banner{margin:24px 0;}
}
</style>