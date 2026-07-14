<template>
    <div class="main-container">
        <div class="title_wrap ac top_visual">
            <h2 class="page-title">{{ t.MainTitle }}</h2>
            <!-- 26.06.10 Del 이종환 <p class="visual-sub">{{ t.MainsubTitle }}</p> -->
        </div>

        <section class="section-investor">
            <div class="cont_inner">
                <Tabs v-model="CTabIdx" :tab-items="t.Tabs1" tab-class="type_01" :tab-slide="true" @change="onTabChange1" />
                
                <!--  -->
                <div class="tab_content_wrap">
                    <section class="tab_content gsrin0201" v-if="CTabIdx === 0" :aria-label="t.Tabs1[0].item">
                        <div class="performance_charts">
                            <div class="chart_grid">
                                <div class="chart_item" v-for="(chart, idx) in t.PerformanceCharts" :key="'chart-'+idx">
                                    <div class="chart_header">
                                        <h3 class="chart_title">{{ chart.title }}</h3>
                                        <span class="unit">{{ chart.unit }}</span>
                                    </div>
                                    <div class="chart_img">
                                        <picture>
                                            <source :srcset="require(`@/assets/images/dummy/${chart.imgName}_mo.png`)" media="(max-width: 768px)" /><!-- 26.06.18 edit 정다희 : 접근성오류 source 닫는태그 수정 -->
                                            <img :src="require(`@/assets/images/dummy/${chart.imgName}.png`)" :alt="chart.title">
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="table_section">
                            <div class="table_header">
                                <h3 class="section-sub-title">{{ t.TableTitle1 }}</h3>
                                <span class="unit">{{ t.UnitMillion }}</span>
                            </div>
                            <div class="policy_wrap">
                                <table class="base_table">
                                    <colgroup>
                                        <col style="width:90px;">
                                        <col style="width:150px;">
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col" colspan="2" class="ac">{{ t.Labels.Common.Category }}</th>
                                            <th scope="col" class="ac" v-for="year in t.SummaryYears" :key="year">{{ year }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- 자산 영역 -->
                                        <tr>
                                            <th rowspan="2" scope="rowgroup" class="ac border_right">{{ t.Labels.Finance.Asset }}</th>
                                            <td class="ac border_right">{{ t.Labels.Finance.CurrentAsset }}</td>
                                            <td class="ar" v-for="(val, idx) in t.FSD.Asset.Current" :key="'ac-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <td class="ac border_right">{{ t.Labels.Finance.NonCurrentAsset }}</td>
                                            <td class="ar" v-for="(val, idx) in t.FSD.Asset.NonCurrent" :key="'anc-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr class="bg_light bold">
                                            <td class="ac border_right" colspan="2">{{ t.Labels.Finance.TotalAsset }}</td>
                                            <td class="ar fc_red" v-for="(val, idx) in t.FSD.Asset.Total" :key="'at-'+idx">{{ val }}</td>
                                        </tr>
                                        <!-- 부채 영역 -->
                                        <tr>
                                            <th rowspan="2" scope="rowgroup" class="ac border_right">{{ t.Labels.Finance.Debt }}</th>
                                            <td class="ac border_right">{{ t.Labels.Finance.CurrentDebt }}</td>
                                            <td class="ar" v-for="(val, idx) in t.FSD.Debt.Current" :key="'dc-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <td class="ac border_right">{{ t.Labels.Finance.NonCurrentDebt }}</td>
                                            <td class="ar" v-for="(val, idx) in t.FSD.Debt.NonCurrent" :key="'dnc-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr class="bg_light bold">
                                            <td class="ac border_right" colspan="2">{{ t.Labels.Finance.TotalDebt }}</td>
                                            <td class="ar fc_red" v-for="(val, idx) in t.FSD.Debt.Total" :key="'dt-'+idx">{{ val }}</td>
                                        </tr>
                                        <!-- 자본 영역 -->
                                        <tr>
                                            <th rowspan="2" scope="rowgroup" class="ac border_right">{{ t.Labels.Finance.Capital }}</th>
                                            <td class="ac border_right">{{ t.Labels.Finance.BaseCapital }}</td>
                                            <td class="ar" v-for="(val, idx) in t.FSD.Capital.Base" :key="'cb-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <td class="ac border_right">{{ t.Labels.Finance.ProfitCapital }}</td>
                                            <td class="ar" v-for="(val, idx) in t.FSD.Capital.Profit" :key="'cp-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr class="bg_light bold">
                                            <td class="ac border_right" colspan="2">{{ t.Labels.Finance.TotalCapital }}</td>
                                            <td class="ar fc_red" v-for="(val, idx) in t.FSD.Capital.Total" :key="'ct-'+idx">{{ val }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="table_section">
                            <div class="table_header">
                                <h3 class="section-sub-title">{{ t.TableTitle2 }}</h3>
                                <span class="unit">{{ t.UnitMillion }}</span>
                            </div>
                            <div class="policy_wrap">
                                <table class="base_table">
                                    <colgroup>
                                        <col style="width: 350px;">
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                    </colgroup>
                                    <thead>
                                        <tr class="bold">
                                            <th scope="col" class="ac">{{ t.Labels.Common.Category }}</th>
                                            <th scope="col" class="ac" v-for="year in t.SummaryYears" :key="'h-'+year">{{ year }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="bold">
                                            <th scope="row" class="ac">{{ t.Labels.Finance.Sales }}</th>
                                            <td class="ar" v-for="(val, idx) in t.ISD.Sales" :key="'s-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr class="bold">
                                            <th scope="row" class="ac">{{ t.Labels.Finance.GrossProfit }}</th>
                                            <td class="ar" v-for="(val, idx) in t.ISD.GrossProfit" :key="'gp-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Finance.SGA }}</th>
                                            <td class="ar" v-for="(val, idx) in t.ISD.SGA" :key="'sga-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Finance.OperatingIncome }}</th>
                                            <td class="ar" v-for="(val, idx) in t.ISD.OperatingIncome" :key="'oi-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Finance.OtherIncome }}</th>
                                            <td class="ar" v-for="(val, idx) in t.ISD.OtherIncome" :key="'other-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Finance.FinancialIncome }}</th>
                                            <td class="ar" v-for="(val, idx) in t.ISD.FinancialIncome" :key="'fi-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Finance.EquityMethod }}</th>
                                            <td class="ar" v-for="(val, idx) in t.ISD.EquityMethod" :key="'em-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr class="bold">
                                            <th scope="row" class="ac">{{ t.Labels.Finance.IncomeBeforeTax }}</th>
                                            <td class="ar" v-for="(val, idx) in t.ISD.IncomeBeforeTax" :key="'ibt-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr class="bg_light bold">
                                            <td scope="row" class="ac">{{ t.Labels.Finance.NetIncome }}</td>
                                            <td class="ar fc_red" v-for="(val, idx) in t.ISD.NetIncome" :key="'ni-'+idx">{{ val }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <!-- gsrin0202: 배당 정보 -->
                    <section class="tab_content gsrin0202" v-if="CTabIdx === 1" :aria-label="t.Tabs1[1].item">
                        <p :class="['title-sub-text', { 'is_dividend': CTabIdx === 1 }]" v-html="t.MainDesc[CTabIdx]"></p>
                        <p class="policy_desc" v-html="t.DividendPolicyDesc"></p>
                        <div class="table_section">
                            <div class="table_header">
                                <h3 class="section-sub-title">{{ t.TableTitle3 }}</h3>
                            </div>
                            <div class="table_info_group">
                                <span class="unit">{{ t.Recent5Years }}</span>
                                <span class="unit ml20">{{ t.UnitMillion }}</span>
                            </div>
                            
                            <div class="policy_wrap">
                                <table class="base_table">
                                    <colgroup>
                                        <col style="width: 150px;">
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                        <col style="width: auto;">
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th scope="col" class="ac">{{ t.Labels.Dividend.Year }}</th>
                                            <th scope="col" class="ac" v-for="year in t.DividendYears" :key="year">{{ year }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Dividend.TotalAmount }}</th>
                                            <td class="ar" v-for="(val, idx) in t.DividendData.TotalAmount" :key="'total-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Dividend.Type }}</th>
                                            <td class="ar" v-for="(val, idx) in t.DividendData.Type" :key="'type-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Dividend.PerShare }}</th>
                                            <td class="ar" v-for="(val, idx) in t.DividendData.PerShare" :key="'per-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Dividend.Propensity }}</th>
                                            <td class="ar" v-for="(val, idx) in t.DividendData.Propensity" :key="'prop-'+idx">{{ val }}</td>
                                        </tr>
                                        <tr>
                                            <th scope="row" class="ac">{{ t.Labels.Dividend.Yield }}</th>
                                            <td class="ar" v-for="(val, idx) in t.DividendData.Yield" :key="'yield-'+idx">{{ val }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    <!-- gsrin0203: 실적자료 등 -->
                    <section class="tab_content gsrin0203" v-if="CTabIdx === 2" :aria-label="t.Tabs1[2].item">

                        <div class="search_filter_area">
                            <Search 
                                v-model="searchData" 
                                :search_opt="t.options"  @search="handleSearch"
                                :placeholder="t.searchPlaceholder"
                            />
                        </div>

                        <div class="table_container">
                            <div class="policy_wrap">
                                <table class="base_table ir_table">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="ac">{{ t.Labels.Board.Num }}</th>
                                            <th scope="col" class="ac">{{ t.Labels.Board.Title }}</th>
                                            <th scope="col" class="ac">{{ t.Labels.Board.Download }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, idx) in t.IRListData" :key="'ir-'+idx">
                                            <td class="ac border_right">{{ item.id }}</td>
                                            <td class="al border_right">
                                                <a href="javascript:void(0);" class="link_title">{{ item.title }}</a>
                                            </td>
                                            <td class="ac">
                                                <button type="button" class="btn_download_file" @click="handleDownload(item.link)">
                                                    <span class="file_type_text">PDF</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <Pagination 
                                v-model="currentPage" 
                                :total-pages="10" 
                                @change="onPageChange" 
                            />
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";

export default {
    name: "gsrin0201",
    components: { Tabs, Search, Pagination },
    props: { lang: { type: String, default: "ko" } },
    data() {
        return {
            CTabIdx: 0,
            currentPage: 1,
            searchData: {
                type: "all",
                keyword: ""
            },
            langData: {
                ko: {
                    MainTitle: "경영성과",
                    searchPlaceholder: "검색어 입력",
                    MainsubTitle: "Business Performance",
                    MainDesc: ["투명한 GS리테일<br/> 경영성과 입니다.", "배당정책", "투명한 GS리테일<br/> 경영성과 입니다."],
                    Tabs1: [{ item: "재무현황" }, { item: "배당 정보" }, { item: "실적자료 등" }],
                    UnitMillion: "(단위 : 원, %)",
                    Recent5Years: "(최근 5개년 기준)",
                    SummaryYears: ["2023", "2024", "2025"],
                    TableTitle1: "요약 연결재무상태표",
                    TableTitle2: "요약 연결손익계산서",
                    TableTitle3: "투명한 GS리테일 경영성과 입니다.",
                    
                    // 추출된 텍스트 라벨들
                    Labels: {
                        Common: {
                            Category: "구분"
                        },
                        Finance: {
                            Asset: "자산",
                            CurrentAsset: "유동자산",
                            NonCurrentAsset: "비유동자산",
                            TotalAsset: "자산총계",
                            Debt: "부채",
                            CurrentDebt: "유동부채",
                            NonCurrentDebt: "비유동부채",
                            TotalDebt: "부채총계",
                            Capital: "자본",
                            BaseCapital: "자본금",
                            ProfitCapital: "이익잉여금 등",
                            TotalCapital: "자본총계",
                            Sales: "매출액",
                            GrossProfit: "매출총이익",
                            SGA: "판매비와 관리비 등",
                            OperatingIncome: "영업이익",
                            OtherIncome: "기타손익",
                            FinancialIncome: "금융손익",
                            EquityMethod: "지분법손익",
                            IncomeBeforeTax: "법인세비용 차감전순이익",
                            NetIncome: "당기순이익"
                        },
                        Dividend: {
                            Year: "년도",
                            TotalAmount: "2025",
                            Type: "2024",
                            PerShare: "2023",
                            Propensity: "2022",
                            Yield: "2021"
                        },
                        Board: {
                            Num: "구분",
                            Title: "제목",
                            Download: "다운로드"
                        }
                    },

                    FSD: {
                        Asset: {
                            Current: ["1,857,062", "1,481,155", "1,797,888"],
                            NonCurrent: ["8,184,954", "6,100,488", "5,685,209"],
                            Total: ["10,042,016", "7,581,643", "7,483,097"]
                        },
                        Debt: {
                            Current: ["2,688,039", "1,898,446", "1,995,791"],
                            NonCurrent: ["2,920,238", "2,501,679", "2,211,212"],
                            Total: ["5,608,277", "4,400,125", "4,207,003"]
                        },
                        Capital: {
                            Base: ["104,718", "83,607", "83,607"],
                            Profit: ["4,329,021", "3,097,911", "3,192,488"],
                            Total: ["4,433,739", "3,181,518", "3,276,095"]
                        }
                    },
                    ISD: {
                        Sales: ["11,080,326", "11,579,430", "11,957,422"],
                        GrossProfit: ["2,829,457", "2,879,228", "2,911,663"],
                        SGA: ["2,515,001", "2,623,102", "2,619,543"],
                        OperatingIncome: ["314,456", "256,126", "292,120"],
                        OtherIncome: ["-7,522", "-52,690", "-62,857"],
                        FinancialIncome: ["-67,586", "-122,055", "-38,128"],
                        EquityMethod: ["-154,794", "-40,445", "-101,903"],
                        IncomeBeforeTax: ["84,554", "40,935", "89,231"],
                        NetIncome: ["22,148", "9,792", "50,239"]
                    },
                    PerformanceCharts: [
                        { title: "매출액", unit: "(단위 : 억원)", imgName: "gsrin0201_chat_1" },
                        { title: "영업이익", unit: "(단위 : 억원)", imgName: "gsrin0201_chat_2" },
                        { title: "당기 순이익", unit: "(단위 : 억원)", imgName: "gsrin0201_chat_3" },
                        { title: "총자산", unit: "(단위 : 억원)", imgName: "gsrin0201_chat_4" }
                    ],
                    DividendPolicyDesc: "주주가치 제고를 위하여 배당을 지속적으로 실시해 오고 있으며, 배당 규모는 향후 회사의 지속적인 성장을 위한 투자와 경영실적 및 Cash-flow 상황 등을 전반적으로 고려하여 결정하고 있습니다.<br/><br/>배당금은 비경상 손익을 제외한 (지배지분)연결당기순이익 중 40% 수준에서 배당금 산정이 적정하다고 판단하여, 향후에도 40%수준의 배당성향을 유지할 계획입니다.",
                    DividendYears: ["배당총액", "배당종류", "주당 배당금", "배당성향", "배당수익률"],
                    DividendData: {
                        TotalAmount: ["50,139,354,000", "현금", "600", "115.4", "2.7"],
                        Type: ["41,782,795,000", "현금", "500", "1,639.8", "3.3"],
                        PerShare: ["51,719,128,000", "현금", "500", "292.6", "2.1"],
                        Propensity: ["43,937,410,750", "현금", "430", "108.7", "1.5"],
                        Yield: ["122,616,030,000", "현금", "1,200", "15.0", "3.9"]
                    },
                    IRListData: [
                        { id: "60", title: "2025년 4분기 경영실적", fileUrl: "#" },
                        { id: "59", title: "2025년 3분기 경영실적", fileUrl: "#" },
                        { id: "58", title: "2025년 2분기 경영실적", fileUrl: "#" },
                        { id: "57", title: "2025년 1분기 경영실적", fileUrl: "#" },
                        { id: "56", title: "2024년 4분기 경영실적", fileUrl: "#" },
                        { id: "55", title: "2024년 3분기 경영실적", fileUrl: "#" },
                        { id: "54", title: "2024년 2분기 경영실적", fileUrl: "#" },
                        { id: "53", title: "(주)GS리테일 인적분할 설명자료", fileUrl: "#" },
                        { id: "52", title: "2024년 1분기 경영실적", fileUrl: "#" },
                        { id: "51", title: "2023년 4분기 경영실적", fileUrl: "#" }
                    ],
                    options: [
                        { value: "all", label: "전체" },
                        { value: "title", label: "제목" },
                        { value: "content", label: "내용" }
                    ]
                },
                en: {
                    MainTitle: "Financial Performance",
                    searchPlaceholder: "Enter search term"/* 260708 번역 */,
                    MainsubTitle: "Business Performance",
                    MainDesc: ["Transparent GS Retail<br/> These are the business results."/* 260604 번역 */, "Dividend Policy"/* 260604 번역 */, "Transparent GS Retail<br/> These are the business results."/* 260604 번역 */],
                    Tabs1: [{ item: "Financial Status"/* 260604 번역 */ }, { item: "Dividend Information"/* 260604 번역 */ }, { item: "Performance Materials, etc."/* 260604 번역 */ }],
                    UnitMillion: "(Unit: KRW, %)"/* 260604 번역 */,
                    Recent5Years: "(Based on the last 5 years)"/* 260604 번역 */,
                    SummaryYears: ["2023", "2024", "2025"],
                    TableTitle1: "Summary Consolidated Statement of Financial Position"/* 260604 번역 */,
                    TableTitle2: "Summary Consolidated Income Statement"/* 260604 번역 */,
                    TableTitle3: "These are the transparent business results of GS Retail."/* 260604 번역 */,
                    
                    // 추출된 텍스트 라벨들
                    Labels: {
                        Common: {
                            Category: "Category"
                        },
                        Finance: {
                            Asset: "Assets"/* 260604 번역 */,
                            CurrentAsset: "Current Assets"/* 260604 번역 */,
                            NonCurrentAsset: "Non-current Assets"/* 260604 번역 */,
                            TotalAsset: "Total Assets"/* 260604 번역 */,
                            Debt: "Liabilities"/* 260604 번역 */,
                            CurrentDebt: "Current Liabilities"/* 260604 번역 */,
                            NonCurrentDebt: "Non-current Liabilities"/* 260604 번역 */,
                            TotalDebt: "Total Liabilities"/* 260604 번역 */,
                            Capital: "Equity"/* 260604 번역 */,
                            BaseCapital: "Capital Stock"/* 260604 번역 */,
                            ProfitCapital: "Retained Earnings, etc."/* 260604 번역 */,
                            TotalCapital: "Total Equity"/* 260604 번역 */,
                            Sales: "Revenue"/* 260604 번역 */,
                            GrossProfit: "Gross Profit"/* 260604 번역 */,
                            SGA: "Selling and Administrative Expenses, etc."/* 260604 번역 */,
                            OperatingIncome: "Operating Profit"/* 260604 번역 */,
                            OtherIncome: "Other Income and Expenses"/* 260604 번역 */,
                            FinancialIncome: "Financial Income and Expenses"/* 260604 번역 */,
                            EquityMethod: "Equity-Method Gains and Losses"/* 260604 번역 */,
                            IncomeBeforeTax: "Income Before Income Tax"/* 260604 번역 */,
                            NetIncome: "Net Income for the Period"/* 260604 번역 */
                        },
                        Dividend: {
                            Year: "Year"/* 260604 번역 */,
                            TotalAmount: "2025",
                            Type: "2024",
                            PerShare: "2023",
                            Propensity: "2022",
                            Yield: "2021"
                        },
                        Board: {
                            Num: "Category",
                            Title: "Title",
                            Download: "Download ↓"
                        }
                    },

                    FSD: {
                        Asset: {
                            Current: ["1,857,062", "1,481,155", "1,797,888"],
                            NonCurrent: ["8,184,954", "6,100,488", "5,685,209"],
                            Total: ["10,042,016", "7,581,643", "7,483,097"]
                        },
                        Debt: {
                            Current: ["2,688,039", "1,898,446", "1,995,791"],
                            NonCurrent: ["2,920,238", "2,501,679", "2,211,212"],
                            Total: ["5,608,277", "4,400,125", "4,207,003"]
                        },
                        Capital: {
                            Base: ["104,718", "83,607", "83,607"],
                            Profit: ["4,329,021", "3,097,911", "3,192,488"],
                            Total: ["4,433,739", "3,181,518", "3,276,095"]
                        }
                    },
                    ISD: {
                        Sales: ["11,080,326", "11,579,430", "11,957,422"],
                        GrossProfit: ["2,829,457", "2,879,228", "2,911,663"],
                        SGA: ["2,515,001", "2,623,102", "2,619,543"],
                        OperatingIncome: ["314,456", "256,126", "292,120"],
                        OtherIncome: ["-7,522", "-52,690", "-62,857"],
                        FinancialIncome: ["-67,586", "-122,055", "-38,128"],
                        EquityMethod: ["-154,794", "-40,445", "-101,903"],
                        IncomeBeforeTax: ["84,554", "40,935", "89,231"],
                        NetIncome: ["22,148", "9,792", "50,239"]
                    },
                    PerformanceCharts: [
                        { title: "Revenue"/* 260604 번역 */, unit: "(Unit: KRW 100 million)"/* 260604 번역 */, imgName: "gsrin0201_chat_1" },
                        { title: "Operating Profit"/* 260604 번역 */, unit: "(Unit: KRW 100 million)"/* 260604 번역 */, imgName: "gsrin0201_chat_2" },
                        { title: "Net Income for the Period"/* 260604 번역 */, unit: "(Unit: KRW 100 million)"/* 260604 번역 */, imgName: "gsrin0201_chat_3" },
                        { title: "Total Assets"/* 260604 번역 */, unit: "(Unit: KRW 100 million)"/* 260604 번역 */, imgName: "gsrin0201_chat_4" }
                    ],
                    DividendPolicyDesc: "We have continuously paid dividends to enhance shareholder value, and the dividend amount is determined by comprehensively considering investments for the company's continued growth, business performance, and cash-flow conditions.<br/><br/>We have determined that it is appropriate to set dividends at around 40% of consolidated net income (controlling interest), excluding non-recurring gains and losses, and we plan to maintain a payout ratio of around 40% going forward."/* 260604 번역 */,
                    DividendYears: ["Total Dividends"/* 260604 번역 */, "Dividend Type"/* 260604 번역 */, "Dividend per Share"/* 260604 번역 */, "Dividend Payout Ratio"/* 260604 번역 */, "Dividend Yield"/* 260604 번역 */],
                    DividendData: {
                        TotalAmount: ["50,139,354,000", "Cash"/* 260604 번역 */, "600", "115.4", "2.7"],
                        Type: ["41,782,795,000", "Cash"/* 260604 번역 */, "500", "1,639.8", "3.3"],
                        PerShare: ["51,719,128,000", "Cash"/* 260604 번역 */, "500", "292.6", "2.1"],
                        Propensity: ["43,937,410,750", "Cash"/* 260604 번역 */, "430", "108.7", "1.5"],
                        Yield: ["122,616,030,000", "Cash"/* 260604 번역 */, "1,200", "15.0", "3.9"]
                    },
                    IRListData: [
                        { id: "60", title: "Q4 2025 Business Results"/* 260604 번역 */, fileUrl: "#" },
                        { id: "59", title: "Q3 2025 Business Results"/* 260604 번역 */, fileUrl: "#" },
                        { id: "58", title: "Q2 2025 Business Results"/* 260604 번역 */, fileUrl: "#" },
                        { id: "57", title: "Q1 2025 Business Results"/* 260604 번역 */, fileUrl: "#" },
                        { id: "56", title: "Q4 2024 Business Results"/* 260604 번역 */, fileUrl: "#" },
                        { id: "55", title: "Q3 2024 Business Results"/* 260604 번역 */, fileUrl: "#" },
                        { id: "54", title: "Q2 2024 Business Results"/* 260604 번역 */, fileUrl: "#" },
                        { id: "53", title: "GS Retail Spin-off Briefing Materials"/* 260604 번역 */, fileUrl: "#" },
                        { id: "52", title: "Q1 2024 Business Results"/* 260604 번역 */, fileUrl: "#" },
                        { id: "51", title: "Q4 2023 Business Results"/* 260604 번역 */, fileUrl: "#" }
                    ],
                    options: [
                        { value: "all", label: "All" },
                        { value: "title", label: "Title" },
                        { value: "content", label: "Details" }
                    ]
                }
            }
        };
    },
    computed: { t() { return this.langData[this.lang] || this.langData.ko; } },
    methods: { 
        onTabChange1(idx) { this.CTabIdx = idx; },
        onPageChange(page) { this.currentPage = page; },
        handleSearch(val) {
            console.log("검색 실행:", val);
            this.currentPage = 1;
        },
        handleDownload(link) {
            if(link && link !== '#') window.open(link, "_blank");
            else alert("파일 준비 중입니다.");
        }
    }
};
</script>

<style scoped>
.main-container { width: 100%; position: relative; }
.title_wrap { width: 100%; height: 480px; padding: 10.91% 0 11.25%; background: url('/src/assets/images/dummy/gsrin0201_bg.png') no-repeat center / cover; text-align: center; position: relative; display: block;}
.page-title { color: #FFFFFF; font-size: 72px; font-weight: 700; text-align: center; }
.visual-sub { margin-top: 10px; color: #FFFFFF; font-size: 32px; font-weight: 700; text-align: center; }
.title-sub-text { width: 100%; color: #161618; font-size: 48px; font-weight: 700; text-align: center; line-height: 1.4; }
.title-sub-text.is_dividend {text-align:left; }
.tab_content_wrap{padding-top:100px;}

/* Charts */
.performance_charts { width: 100%; }
.chart_grid { display: grid; grid-template-columns: repeat(2, 1fr); gap:100px 40px; }
.chart_item { width: 100%; display: flex; flex-direction: column; gap: 32px; }
.chart_header { display: flex; align-items: flex-end; justify-content:space-between; }
.chart_title { font-size: 40px; font-weight: 700; color: #161618; }
.unit { font-size: 16px; color: #67676f; }
.chart_img img { width: 100%; height: auto; }

.gsrin0203 .search_filter_area {margin-top:0;}


/* 배당정책 설명 */
.dividend_policy_info { width: 100%; text-align: left; }
.section-sub-title { font-size: 48px; font-weight: 700; color: #161616; letter-spacing: -0.48px; }
.policy_desc { font-size: 24px; color: #161616; line-height: 1.5; letter-spacing: -0.24px; word-break: keep-all; }
.title-sub-text + .policy_desc {margin-top:16px;}
.table_info_group {margin-top:32px; display:flex; justify-content:space-between;}
.gsrin0202 .policy_wrap {overflow-x:auto;}

/* Table 스타일 */
.policy_wrap table {width: 100%; margin-top:32px; border-collapse: collapse; border-top: 2px solid #161616; border-left: 0 !important; border-right: 0 !important; }
.policy_wrap th, .policy_wrap td {padding: 18px 24px; border: 1px solid #e5e5e9; font-size: 1.8rem; line-height: 1.4; vertical-align: middle;}
.policy_wrap th:first-child, .policy_wrap td:first-child { border-left: 0; }
.policy_wrap th:last-child, .policy_wrap td:last-child { border-right: 0; }
.policy_wrap thead th { background-color: #f8f8f8; color: #161618; font-weight: 700; }
.policy_wrap tbody th { background-color: #ffffff; font-weight: 400; }
.border_right { border-right: 1px solid #e5e5e9; }
.table_header {display:flex; justify-content:space-between; align-items:flex-end;}
.table_header h3 {font-size:40px;}
.gsrin0203 .policy_wrap td {height: 82px; color: #161616; border-left:0; border-right:0; }
.gsrin0203 .policy_wrap th {border-left:0; border-right:0;}
.policy_wrap td a {font-size:18px;}
.table_section {margin-top:100px;}

/* 강조 스타일 */
.bg_light { background-color: #f8f8f8 !important; }
.fc_red { color: #ed3030 !important; }
tr.bold td, tr.bold th { font-weight: 700 !important; }


/* 태블릿릿 */
@media screen and (max-width: 1024px) {
    .policy_wrap {overflow:auto;}
    .gsrin0201 .base_table, .gsrin0202 .base_table { min-width:1000px; }
}

/* 모바일 */
@media screen and (max-width: 767px) {
    h3 { font-size: 24px !important; }
    .unit { font-size: 14px !important; }
    .title_wrap { display: none !important; }
    .gsrin0201 .policy_wrap, .gsrin0201 .base_table  { overflow-x: auto; }
    .gsrin0201 .base_table, .gsrin0202 .base_table { min-width: 800px; }

    /* 차트 영역  */
    .chart_grid { grid-template-columns: 1fr; gap:80px; } 
    .title-sub-text { font-size: 2.4rem;}
    :deep(.title-sub-text) br {display:block;}
    .policy_wrap th, .policy_wrap td { padding: 12px 15px; font-size: 14px; }
    .gsrin0203 .policy_wrap th:first-child, .gsrin0203 .policy_wrap td:first-child { display: none; }
    .gsrin0203 .policy_wrap thead {display:none;}
    .policy_desc{font-size: 1.8rem;line-height: 1.4;}
    .table_section {margin-top:80px;}
    .cont_inner > .tab_wrap.tabSlide {margin-top: 84px;}  /* 26.06.26 add 이소라 */
    .tab_content_wrap{padding-top:36px;} /* 26.06.26 add 이소라 */
    .search_filter_area + .table_container .base_table{margin:0;} 
}
</style>