<template>
    <div class="modal_cont gsrst010301">
        <!-- 타이틀 -->
        <div v-if="!inlineMode" class="modal_header">
            {{ t.title }}
            <a href="#none" @click="closeModal" class="btn_close">닫기</a>
        </div>

        <div class="modal_content smn_body">
            <!-- 인트로 -->
            <div class="smn_intro">
                <strong v-html="t.intro.title"></strong>
                <p v-html="t.intro.desc"></p>
            </div>
            <!-- 컨설턴트와 1:1 상담 -->
            <div class="gray_box consult_box">
                <div class="consent_body">
                    <div class="flex_wrap">
                        <div class="consent_img_wrap">
                        </div>
                        <div class="consent_info">
                            <h3 class="consent_info_title">{{ t.consultBox.title }}</h3>
                            <p v-html="t.consultBox.desc"></p>
                            <button type="button">{{ t.consultBox.consultantName }}</button>
                        </div>
                    </div>
                    <div class="consent_notice">
                        <ul class="list_caution">
                            <li>
                                <p>{{ t.consultBox.notice }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 개인정보 동의 -->
            <div class="gray_box consent_box">
                <div class="consent_info">
                    <h3 class="consent_info_title">{{ t.consent.title }}</h3>
                    <ul class="consent_info_list">
                        <li v-for="(item, index) in t.consent.items" :key="index">{{ item }}</li>
                    </ul>
                </div>
            </div>

            <div class="middle_bts_wrap">
                <button :class="{ active: hasStore === true }" @click="hasStore = true">{{ t.storeButtons.hasStore }}</button>
                <button :class="{ active: hasStore === false }" @click="hasStore = false">{{ t.storeButtons.noStore }}</button>
            </div>

            <!-- 고객정보 폼 -->
            <div class="apply_form">
                <div class="form_head">
                    <h3 class="form_head_title">{{ t.customerForm.title }}</h3>
                    <span class="form_required_note">{{ t.requiredNote }}</span>
                </div>
                <div class="form_body">
                    <!-- 이름 -->
                    <div class="form_row">
                        <div class="form_label">{{ t.customerForm.nameLabel }}<span class="form_required">*</span></div>
                        <div class="form_field">
                            <Inputs type="text" />
                        </div>
                    </div>
                    <!-- 이메일 -->
                    <div class="form_row">
                        <div class="form_label">{{ t.customerForm.emailLabel }}</div>
                        <div class="form_field form_field_email">
                            <Inputs type="text" v-model="consultForm.emailId" />
                            <span class="form_sep">@</span>
                            <Inputs v-if="consultForm.emailDomain === ''" type="text" v-model="consultForm.emailDomainCustom" :placeholder="t.customerForm.emailPlaceholder" />
                            <Inputs v-else type="text" :model-value="consultForm.emailDomain" :is-readonly="true" />
                            <SelectBox :options="emailDomainOptions" v-model="consultForm.emailDomain" />
                        </div>
                    </div>
                    <!-- 연락처 -->
                    <div class="form_row">
                        <div class="form_label">{{ t.customerForm.phoneLabel }}<span class="form_required">*</span></div>
                        <div class="form_field form_field_phone">
                            <SelectBox :options="phoneOptions" v-model="consultForm.phone1" />
                            <span class="form_sep">-</span>
                            <Inputs type="text" v-model="consultForm.phone2" />
                            <span class="form_sep">-</span>
                            <Inputs type="text" v-model="consultForm.phone3" />
                        </div>
                    </div>

                    <!-- 개설희망지역 -->
                    <div class="form_row">
                        <div class="form_label" v-html="t.customerForm.addressLabel"></div>
                        <div class="form_field form_field_region">
                            <SelectBox :options="sidoOptions" v-model="consultForm.regionSido" :initMsg="t.customerForm.sidoInitMsg" @update:modelValue="consultForm.regionSigungu = ''" />
                            <SelectBox :options="sigunguOptions" v-model="consultForm.regionSigungu" :initMsg="t.customerForm.sigunguInitMsg" :disabled="!consultForm.regionSido" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 상담내용 폼 (점포 소유 시에만 표시) -->
            <div class="apply_form" v-show="hasStore === true">
                <div class="form_head">
                    <h3 class="form_head_title">{{ t.consultForm.title }}</h3>
                    <span class="form_required_note">{{ t.requiredNote }}</span>
                </div>
                <div class="form_body">
                    <!-- 소유점포 면적 -->
                    <div class="form_row form_row_area">
                        <div class="form_label">{{ t.consultForm.areaLabel }}</div>
                        <div class="form_field form_field_area">
                            <div class="form_sub_group">
                                <span class="form_sub_label">{{ t.consultForm.contractAreaLabel }}</span>
                                <div class="form_sub_input_wrap">
                                    <Inputs type="text" v-model="consultForm.areaContract" />
                                    <span class="form_sub_unit">m²</span>
                                </div>
                            </div>
                            <div class="form_sub_group">
                                <span class="form_sub_label">{{ t.consultForm.exclusiveAreaLabel }}</span>
                                <div class="form_sub_input_wrap">
                                    <Inputs type="text" v-model="consultForm.areaExclusive" />
                                    <span class="form_sub_unit">m²</span>
                                </div>
                            </div>
                            <span class="area_note">{{ t.consultForm.areaNote }}</span>
                        </div>
                    </div>
                    <!-- 수퍼 운영자 일 경우 -->
                    <div class="form_row check_row">
                        <div class="form_label">{{ t.consultForm.superOperatorLabel }}</div>
                        <div class="form_field form_field_check">
                            <div class="form_sub_group">
                                <span class="form_sub_label">{{ t.consultForm.itemCheckLabel }}</span>
                                <div class="check_list">
                                    <Inputs v-for="opt in superItemOptions" :key="opt.value"
                                            type="checkbox" :value="opt.value" v-model="consultForm.superItems" :text="opt.label" />
                                </div>
                            </div>
                            <div class="check_etc">
                                <span class="form_sub_label">{{ t.consultForm.etcLabel }}</span>
                                <Inputs type="text" v-model="consultForm.superItemEtc" />
                            </div>
                        </div>
                    </div>
                    <!-- 계약조건 -->
                    <div class="form_row contract_row">
                        <div class="form_label">{{ t.consultForm.contractLabel }}</div>
                        <div class="form_field form_field_contract">
                            <div class="form_sub_group">
                                <span class="form_sub_label">{{ t.consultForm.contractPeriodLabel }}</span>
                                <div class="form_sub_inputs">
                                    <Inputs type="text" v-model="consultForm.contractStart"/>
                                    <span class="form_sep">~</span>
                                    <Inputs type="text" v-model="consultForm.contractEnd" />
                                </div>
                            </div>
                            <div class="form_sub_group">
                                <span class="form_sub_label">{{ t.consultForm.depositRentLabel }}</span>
                                <div class="contract_rent">
                                    <div class="form_sub_input_wrap">
                                        <Inputs type="text" v-model="consultForm.deposit" />
                                        <span class="form_sub_unit">만원</span>
                                    </div>
                                    <div class="form_sub_input_wrap">
                                        <Inputs type="text" v-model="consultForm.monthlyRent" />
                                        <span class="form_sub_unit">만원</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="apply_form" v-show="hasStore === false">
                <div class="form_head">
                    <h3 class="form_head_title">{{ t.consultFormNoStore.title }}</h3>
                    <span class="form_required_note">{{ t.requiredNote }}</span>
                </div>
                <div class="form_body">
                    <div class="form_row">
                        <div class="form_label">{{ t.consultFormNoStore.investmentLabel }}<span class="form_required">*</span></div>
                        <div class="form_field">
                            <SelectBox :options="t.consultFormNoStore.investmentOptions" v-model="consultForm.investmentAmount" />
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.consultFormNoStore.incomeLabel }}<span class="form_required">*</span></div>
                        <div class="form_field">
                            <SelectBox :options="t.consultFormNoStore.incomeOptions" v-model="consultForm.expectedIncome" />
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.consultFormNoStore.openRegionLabel }}<span class="form_required">*</span></div>
                        <div class="form_field form_field_region">
                            <SelectBox :options="sidoOptions" v-model="consultForm.openRegionSido" :initMsg="t.customerForm.sidoInitMsg" @update:modelValue="consultForm.openRegionSigungu = ''" />
                            <SelectBox :options="openSigunguOptions" v-model="consultForm.openRegionSigungu" :initMsg="t.customerForm.sigunguInitMsg" :disabled="!consultForm.openRegionSido" />
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.consultFormNoStore.openTimeLabel }}<span class="form_required">*</span></div>
                        <div class="form_field form_field_region">
                            <SelectBox :options="t.consultFormNoStore.openYearOptions" v-model="consultForm.openYear" />
                            <SelectBox :options="t.consultFormNoStore.openMonthOptions" v-model="consultForm.openMonth" />
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.consultFormNoStore.typeLabel }}<span class="form_required">*</span></div>
                        <div class="form_field form_field_franchise">
                            <div class="franchise_type_item" v-for="opt in t.consultFormNoStore.franchiseTypeOptions" :key="opt.value">
                                <Inputs type="radio" :name="'franchiseType'" :value="opt.value" v-model="consultForm.franchiseType" :text="opt.label" />
                                <Buttons btn-class="btn_small border">{{ t.consultFormNoStore.viewLabel }}</Buttons>
                            </div>
                        </div>
                    </div>
                    <div class="form_row">
                        <div class="form_label">{{ t.consultFormNoStore.inquiryLabel }}<span class="form_required">*</span></div>
                        <div class="form_field">
                            <textarea v-model="consultForm.inquiry" :placeholder="t.consultFormNoStore.inquiryPlaceholder"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal_bottom">
            <Buttons btn-class="btn_big primary">{{ t.submitLabel }}</Buttons>
            <Buttons btn-class="btn_big gary" @click="closeModal">{{ inlineMode ? t.closeLabel : t.resetLabel }}</Buttons>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, computed, defineProps, defineEmits } from "vue";
import modal from "@/assets/js/modal";
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue";
import Buttons from "@/components/Buttons.vue";

const props = defineProps({
    lang: {
        type: String,
        default: "ko",
    },
    inlineMode: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(["close"]);

const langData = {
    ko: {
        title: "사업설명회 신청",
        intro: {
            title: "안녕하세요!<br>GS THE FRESH 1:1 상담<br class=\"m_br\">컨설턴트 윤경진 입니다.",
            desc: "아래의 상담 신청서를 작성하시면 귀하만의 창업 상담을 받아 보실 수있습니다. <br />담당자와 통화가 원활하지 않는 경우 상담신청 부탁 드립니다. 담당자가 확인 후 연락 드리겠습니다.",
        },
        consultBox: {
            title: "컨설턴트와 1:1 상담",
            desc: "가맹/창업 컨설턴트가 1:1로 상담해 드립니다.<br />가맹/창업 컨설턴트에게 문의하시면 자세한 상담을 받으실 수 있습니다.",
            consultantName: "윤경진 컨설턴트",
            notice: '※ 입력하신 정보는 입지상담을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같으며, 기타 개인정보 취급사항은 홈페이지 하단의 "개인정보 처리방침"을 참고하시기 바랍니다.',
        },
        consent: {
            title: "개인정보 수집·이용 동의",
            items: [
                '입력하신 정보는 입지상담을 위해서만 사용합니다. 수집항목, 이용 및 목적, 보유 및 이용기간은 다음과 같으며,기타 개인정보 취급사항은 홈페이지 하단의 "개인정보 처리방침"을 참고하시기 바랍니다.',
                "수집하는 개인정보 항목: 이름, 이메일, 휴대폰번호",
                "수집이용 및 목적: 수집한 개인정보를 본인 식별 및 문의사항 확인 및 답변을 위해 활용",
                "보유 및 이용기간: 접수 후 1년",
            ],
        },
        storeButtons: {
            hasStore: "내가 소유한 점포가 있다.",
            noStore: "내가 소유한 점포가 없다.",
        },
        requiredNote: "* 필수 입력사항",
        customerForm: {
            title: "고객정보",
            nameLabel: "이름",
            emailLabel: "이메일",
            emailPlaceholder: "직접입력",
            phoneLabel: "연락처",
            addressLabel: '소유점포 주소 <br class="p_br"/>(과거, 현재 점포소유 <br class="p_br">신청자에 한함)<span class="form_required">*</span>',
            sidoInitMsg: "시/도 선택",
            sigunguInitMsg: "구/군 선택",
        },
        consultForm: {
            title: "상담내용",
            areaLabel: "소유점포 면적",
            contractAreaLabel: "계약면적",
            exclusiveAreaLabel: "전용면적",
            areaNote: "* m² = (기준)평 x 3.3",
            superOperatorLabel: "수퍼 운영자 일 경우",
            itemCheckLabel: "취급 품목 체크",
            etcLabel: "기타",
            contractLabel: "계약조건",
            contractPeriodLabel: "계약 기간",
            depositRentLabel: "보증금/월임대료",
            superItemOptions: [
                { value: "농산", label: "농산" },
                { value: "축산", label: "축산" },
                { value: "수산", label: "수산" },
                { value: "공산품", label: "공산품" },
                { value: "조리", label: "조리" },
            ],
            sidoOptions: [
                { value: "서울", label: "서울특별시" },
                { value: "부산", label: "부산광역시" },
                { value: "대구", label: "대구광역시" },
                { value: "인천", label: "인천광역시" },
                { value: "광주", label: "광주광역시" },
                { value: "대전", label: "대전광역시" },
                { value: "울산", label: "울산광역시" },
                { value: "세종", label: "세종특별자치시" },
                { value: "경기", label: "경기도" },
                { value: "강원", label: "강원특별자치도" },
                { value: "충북", label: "충청북도" },
                { value: "충남", label: "충청남도" },
                { value: "전북", label: "전북특별자치도" },
                { value: "전남", label: "전라남도" },
                { value: "경북", label: "경상북도" },
                { value: "경남", label: "경상남도" },
                { value: "제주", label: "제주특별자치도" },
            ],
            sigunguMap: {
                서울: ["종로구","중구","용산구","성동구","광진구","동대문구","중랑구","성북구","강북구","도봉구","노원구","은평구","서대문구","마포구","양천구","강서구","구로구","금천구","영등포구","동작구","관악구","서초구","강남구","송파구","강동구"],
                부산: ["중구","서구","동구","영도구","부산진구","동래구","남구","북구","해운대구","사하구","금정구","강서구","연제구","수영구","사상구","기장군"],
                대구: ["중구","동구","서구","남구","북구","수성구","달서구","달성군","군위군"],
                인천: ["중구","동구","미추홀구","연수구","남동구","부평구","계양구","서구","강화군","옹진군"],
                광주: ["동구","서구","남구","북구","광산구"],
                대전: ["동구","중구","서구","유성구","대덕구"],
                울산: ["중구","남구","동구","북구","울주군"],
                세종: ["세종시"],
                경기: ["수원시","성남시","의정부시","안양시","부천시","광명시","평택시","동두천시","안산시","고양시","과천시","구리시","남양주시","오산시","시흥시","군포시","의왕시","하남시","용인시","파주시","이천시","안성시","김포시","화성시","광주시","양주시","포천시","여주시","연천군","가평군","양평군"],
                강원: ["춘천시","원주시","강릉시","동해시","태백시","속초시","삼척시","홍천군","횡성군","영월군","평창군","정선군","철원군","화천군","양구군","인제군","고성군","양양군"],
                충북: ["청주시","충주시","제천시","보은군","옥천군","영동군","증평군","진천군","괴산군","음성군","단양군"],
                충남: ["천안시","공주시","보령시","아산시","서산시","논산시","계룡시","당진시","금산군","부여군","서천군","청양군","홍성군","예산군","태안군"],
                전북: ["전주시","군산시","익산시","정읍시","남원시","김제시","완주군","진안군","무주군","장수군","임실군","순창군","고창군","부안군"],
                전남: ["목포시","여수시","순천시","나주시","광양시","담양군","곡성군","구례군","고흥군","보성군","화순군","장흥군","강진군","해남군","영암군","무안군","함평군","영광군","장성군","완도군","진도군","신안군"],
                경북: ["포항시","경주시","김천시","안동시","구미시","영주시","영천시","상주시","문경시","경산시","군위군","의성군","청송군","영양군","영덕군","청도군","고령군","성주군","칠곡군","예천군","봉화군","울진군","울릉군"],
                경남: ["창원시","진주시","통영시","사천시","김해시","밀양시","거제시","양산시","의령군","함안군","창녕군","고성군","남해군","하동군","산청군","함양군","거창군","합천군"],
                제주: ["제주시","서귀포시"],
            },
        },
        consultFormNoStore: {
            title: "상담내용",
            investmentLabel: "투자 가능금액",
            investmentOptions: ["3000만원 이하", "3000만원~5000만원", "5000만원 이상"],
            incomeLabel: "기대 소득",
            incomeOptions: ["150~200만원", "200~300만원", "300만원 이상"],
            openRegionLabel: "개설 희망지역",
            openTimeLabel: "개설 희망시기",
            openYearOptions: ["2026년", "2027년", "2028년"],
            openMonthOptions: ["01월", "02월", "03월", "04월", "05월", "06월", "07월", "08월", "09월", "10월", "11월", "12월"],
            typeLabel: "개설희망 가맹타입",
            franchiseTypeOptions: [
                { value: "GSF1", label: "GSF1 타입" },
                { value: "GSF2", label: "GSF2 타입" },
                { value: "GSF3", label: "GSF3타입" },
            ],
            viewLabel: "보기",
            inquiryLabel: "문의내용",
            inquiryPlaceholder: "문의내용을 입력해주세요.",
        },
        submitLabel: "상담신청",
        resetLabel: "다시작성",
        closeLabel: "닫기",
    },
    en: {
        title: "Apply for Business Briefing Session"/* 260604 번역 */,
        intro: {
            title: `Hello!<br>GS THE FRESH 1:1 Consultation<br class=\"m_br\">This is consultant Yoon Gyeong-jin.`/* 260604 번역 */,
            desc: "If you fill out the consultation request form below, you can receive a personalized startup consultation. <br />If you are unable to reach our representative by phone, please submit a consultation request. Our representative will review it and contact you."/* 260604 번역 */,
        },
        consultBox: {
            title: "1:1 consultation with a consultant"/* 260604 번역 */,
            desc: "A franchise/startup consultant will provide a 1:1 consultation.<br />If you inquire with a franchise/startup consultant, you can receive a detailed consultation."/* 260604 번역 */,
            consultantName: "Consultant Yoon Gyeong-jin"/* 260604 번역 */,
            notice: '※ The information you enter is used only for location consultation. The collected items, use and purpose, and retention and use period are as follows; for other matters regarding the handling of personal information, please refer to the "Privacy Policy" at the bottom of the homepage.'/* 260604 번역 */,
        },
        consent: {
            title: "Consent to Collection and Use of Personal Information",
            items: [
                'The information you enter is used solely for location consulting. The items collected, the use and purpose, and the retention and use period are as follows. For other matters regarding the handling of personal information, please refer to the "Privacy Policy" at the bottom of the website.'/* 260604 번역 */,
                "Personal information items collected: name, email, mobile phone number"/* 260604 번역 */,
                "Collection, Use, and Purpose: The collected personal information is used for identity verification and to verify and respond to inquiries."/* 260604 번역 */,
                "- Retention and Use Period: One year after receipt",
            ],
        },
        storeButtons: {
            hasStore: "I own a store."/* 260604 번역 */,
            noStore: "I do not own a store."/* 260604 번역 */,
        },
        requiredNote: "* Required fields",
        customerForm: {
            title: "Customer Information",
            nameLabel: "Name",
            emailLabel: "Email",
            emailPlaceholder: "Enter directly",
            phoneLabel: "Contact",
            addressLabel: 'Owned Store Address <br class="p_br"/>(Past or current store ownership <br class="p_br">Applicants only)<span class="form_required">*</span>'/* 260604 번역 */,
            sidoInitMsg: "Select City/Province"/* 260604 번역 */,
            sigunguInitMsg: "Select District/County"/* 260604 번역 */,
        },
        consultForm: {
            title: "Consultation Content",
            areaLabel: "Owned Store Area"/* 260604 번역 */,
            contractAreaLabel: "Contract Area"/* 260604 번역 */,
            exclusiveAreaLabel: "Net floor area"/* 260604 번역 */,
            areaNote: "* m² = (standard) pyeong x 3.3"/* 260604 번역 */,
            superOperatorLabel: "If you are a supermarket operator"/* 260604 번역 */,
            itemCheckLabel: "Check items handled"/* 260604 번역 */,
            etcLabel: "Other",
            contractLabel: "Contract Terms"/* 260604 번역 */,
            contractPeriodLabel: "Contract Period",
            depositRentLabel: "Deposit/Monthly Rent"/* 260604 번역 */,
            superItemOptions: [
                { value: "Agricultural Products"/* 260604 번역 */, label: "Agricultural Products"/* 260604 번역 */ },
                { value: "Livestock", label: "Livestock" },
                { value: "Seafood", label: "Seafood" },
                { value: "Manufactured Goods"/* 260604 번역 */, label: "Manufactured Goods"/* 260604 번역 */ },
                { value: "Cooking"/* 260604 번역 */, label: "Cooking"/* 260604 번역 */ },
            ],
            sidoOptions: [
                { value: "Seoul", label: "Seoul Special City"/* 260604 번역 */ },
                { value: "Busan", label: "Busan Metropolitan City"/* 260604 번역 */ },
                { value: "Daegu", label: "Daegu Metropolitan City"/* 260604 번역 */ },
                { value: "Incheon", label: "Incheon Metropolitan City"/* 260604 번역 */ },
                { value: "Gwangju", label: "Gwangju Metropolitan City"/* 260604 번역 */ },
                { value: "Daejeon", label: "Daejeon Metropolitan City"/* 260604 번역 */ },
                { value: "Ulsan", label: "Ulsan Metropolitan City"/* 260604 번역 */ },
                { value: "Sejong", label: "Sejong Special Self-Governing City"/* 260604 번역 */ },
                { value: "Gyeonggi", label: "Gyeonggi Province" },
                { value: "Gangwon", label: "Gangwon Special Self-Governing Province"/* 260604 번역 */ },
                { value: "North Chungcheong", label: "Chungcheongbuk-do"/* 260604 번역 */ },
                { value: "South Chungcheong", label: "South Chungcheong Province" },
                { value: "North Jeolla", label: "Jeonbuk State"/* 260604 번역 */ },
                { value: "South Jeolla", label: "South Jeolla Province" },
                { value: "North Gyeongsang", label: "Gyeongsangbuk-do"/* 260604 번역 */ },
                { value: "South Gyeongsang", label: "South Gyeongsang Province" },
                { value: "Jeju", label: "Jeju Special Self-Governing Province"/* 260604 번역 */ },
            ],
            sigunguMap: {
                서울: ["Jongno-gu"/* 260604 번역 */,"Jung-gu"/* 260604 번역 */,"Yongsan-gu"/* 260604 번역 */,"Seongdong-gu"/* 260604 번역 */,"Gwangjin-gu"/* 260604 번역 */,"Dongdaemun-gu"/* 260604 번역 */,"Jungnang-gu"/* 260604 번역 */,"Seongbuk-gu"/* 260604 번역 */,"Gangbuk-gu"/* 260604 번역 */,"Dobong-gu"/* 260604 번역 */,"Nowon-gu"/* 260604 번역 */,"Eunpyeong-gu"/* 260604 번역 */,"Seodaemun-gu"/* 260604 번역 */,"Mapo-gu"/* 260604 번역 */,"Yangcheon-gu"/* 260604 번역 */,"Gangseo-gu"/* 260604 번역 */,"Guro-gu"/* 260604 번역 */,"Geumcheon-gu"/* 260604 번역 */,"Yeongdeungpo-gu"/* 260604 번역 */,"Dongjak-gu"/* 260604 번역 */,"Gwanak-gu"/* 260604 번역 */,"Seocho-gu"/* 260604 번역 */,"Gangnam-gu"/* 260604 번역 */,"Songpa-gu"/* 260604 번역 */,"Gangdong-gu"/* 260604 번역 */],
                부산: ["Jung-gu"/* 260604 번역 */,"Seo-gu"/* 260604 번역 */,"Dong-gu"/* 260604 번역 */,"Yeongdo-gu"/* 260604 번역 */,"Busanjin-gu"/* 260604 번역 */,"Dongnae-gu"/* 260604 번역 */,"Nam-gu"/* 260604 번역 */,"Buk-gu"/* 260604 번역 */,"Haeundae-gu"/* 260604 번역 */,"Saha-gu"/* 260604 번역 */,"Geumjeong-gu"/* 260604 번역 */,"Gangseo-gu"/* 260604 번역 */,"Yeonje-gu"/* 260604 번역 */,"Suyeong-gu"/* 260604 번역 */,"Sasang-gu"/* 260604 번역 */,"Gijang-gun"/* 260604 번역 */],
                대구: ["Jung-gu"/* 260604 번역 */,"Dong-gu"/* 260604 번역 */,"Seo-gu"/* 260604 번역 */,"Nam-gu"/* 260604 번역 */,"Buk-gu"/* 260604 번역 */,"Suseong-gu"/* 260604 번역 */,"Dalseo-gu"/* 260604 번역 */,"Dalseong-gun"/* 260604 번역 */,"Gunwi-gun"/* 260604 번역 */],
                인천: ["Jung-gu"/* 260604 번역 */,"Dong-gu"/* 260604 번역 */,"Michuhol-gu"/* 260604 번역 */,"Yeonsu-gu"/* 260604 번역 */,"Namdong-gu"/* 260604 번역 */,"Bupyeong-gu"/* 260604 번역 */,"Gyeyang-gu"/* 260604 번역 */,"Seo-gu"/* 260604 번역 */,"Ganghwa-gun"/* 260604 번역 */,"Ongjin-gun"/* 260604 번역 */],
                광주: ["Dong-gu"/* 260604 번역 */,"Seo-gu"/* 260604 번역 */,"Nam-gu"/* 260604 번역 */,"Buk-gu"/* 260604 번역 */,"Gwangsan-gu"/* 260604 번역 */],
                대전: ["Dong-gu"/* 260604 번역 */,"Jung-gu"/* 260604 번역 */,"Seo-gu"/* 260604 번역 */,"Yuseong-gu"/* 260604 번역 */,"Daedeok-gu"/* 260604 번역 */],
                울산: ["Jung-gu"/* 260604 번역 */,"Nam-gu"/* 260604 번역 */,"Dong-gu"/* 260604 번역 */,"Buk-gu"/* 260604 번역 */,"Ulju-gun"/* 260604 번역 */],
                세종: ["Sejong-si"/* 260604 번역 */],
                경기: ["Suwon-si"/* 260604 번역 */,"Seongnam-si"/* 260604 번역 */,"Uijeongbu-si"/* 260604 번역 */,"Anyang-si"/* 260604 번역 */,"Bucheon-si"/* 260604 번역 */,"Gwangmyeong-si"/* 260604 번역 */,"Pyeongtaek-si"/* 260604 번역 */,"Dongducheon-si"/* 260604 번역 */,"Ansan-si"/* 260604 번역 */,"Goyang-si"/* 260604 번역 */,"Gwacheon-si"/* 260604 번역 */,"Guri-si"/* 260604 번역 */,"Namyangju-si"/* 260604 번역 */,"Osan-si"/* 260604 번역 */,"Siheung-si"/* 260604 번역 */,"Gunpo-si"/* 260604 번역 */,"Uiwang-si"/* 260604 번역 */,"Hanam-si"/* 260604 번역 */,"Yongin-si"/* 260604 번역 */,"Paju-si"/* 260604 번역 */,"Icheon-si"/* 260604 번역 */,"Anseong-si"/* 260604 번역 */,"Gimpo-si"/* 260604 번역 */,"Hwaseong-si"/* 260604 번역 */,"Gwangju-si"/* 260604 번역 */,"Yangju-si"/* 260604 번역 */,"Pocheon-si"/* 260604 번역 */,"Yeoju-si"/* 260604 번역 */,"Yeoncheon-gun"/* 260604 번역 */,"Gapyeong-gun"/* 260604 번역 */,"Yangpyeong-gun"/* 260604 번역 */],
                강원: ["Chuncheon-si"/* 260604 번역 */,"Wonju-si"/* 260604 번역 */,"Gangneung-si"/* 260604 번역 */,"Donghae-si"/* 260604 번역 */,"Taebaek-si"/* 260604 번역 */,"Sokcho-si"/* 260604 번역 */,"Samcheok-si"/* 260604 번역 */,"Hongcheon-gun"/* 260604 번역 */,"Hoengseong-gun"/* 260604 번역 */,"Yeongwol-gun"/* 260604 번역 */,"Pyeongchang-gun"/* 260604 번역 */,"Jeongseon-gun"/* 260604 번역 */,"Cheorwon-gun"/* 260604 번역 */,"Hwacheon-gun"/* 260604 번역 */,"Yanggu-gun"/* 260604 번역 */,"Inje-gun"/* 260604 번역 */,"Goseong-gun"/* 260604 번역 */,"Yangyang-gun"/* 260604 번역 */],
                충북: ["Cheongju-si"/* 260604 번역 */,"Chungju-si"/* 260604 번역 */,"Jecheon-si"/* 260604 번역 */,"Boeun-gun"/* 260604 번역 */,"Okcheon-gun"/* 260604 번역 */,"Yeongdong-gun"/* 260604 번역 */,"Jeungpyeong-gun"/* 260604 번역 */,"Jincheon-gun"/* 260604 번역 */,"Goesan-gun"/* 260604 번역 */,"Eumseong-gun"/* 260604 번역 */,"Danyang-gun"/* 260604 번역 */],
                충남: ["Cheonan-si"/* 260604 번역 */,"Gongju-si"/* 260604 번역 */,"Boryeong-si"/* 260604 번역 */,"Asan-si"/* 260604 번역 */,"Seosan-si"/* 260604 번역 */,"Nonsan-si"/* 260604 번역 */,"Gyeryong-si"/* 260604 번역 */,"Dangjin-si"/* 260604 번역 */,"Geumsan-gun"/* 260604 번역 */,"Buyeo-gun"/* 260604 번역 */,"Seocheon-gun"/* 260604 번역 */,"Cheongyang-gun"/* 260604 번역 */,"Hongseong-gun"/* 260604 번역 */,"Yesan-gun"/* 260604 번역 */,"Taean-gun"/* 260604 번역 */],
                전북: ["Jeonju-si"/* 260604 번역 */,"Gunsan-si"/* 260604 번역 */,"Iksan-si"/* 260604 번역 */,"Jeongeup-si"/* 260604 번역 */,"Namwon-si"/* 260604 번역 */,"Gimje-si"/* 260604 번역 */,"Wanju-gun"/* 260604 번역 */,"Jinan-gun"/* 260604 번역 */,"Muju-gun"/* 260604 번역 */,"Jangsu-gun"/* 260604 번역 */,"Imsil-gun"/* 260604 번역 */,"Sunchang-gun"/* 260604 번역 */,"Gochang-gun"/* 260604 번역 */,"Buan-gun"/* 260604 번역 */],
                전남: ["Mokpo-si"/* 260604 번역 */,"Yeosu-si"/* 260604 번역 */,"Suncheon-si"/* 260604 번역 */,"Naju-si"/* 260604 번역 */,"Gwangyang-si"/* 260604 번역 */,"Damyang-gun"/* 260604 번역 */,"Gokseong-gun"/* 260604 번역 */,"Gurye-gun"/* 260604 번역 */,"Goheung-gun"/* 260604 번역 */,"Boseong-gun"/* 260604 번역 */,"Hwasun-gun"/* 260604 번역 */,"Jangheung-gun"/* 260604 번역 */,"Gangjin-gun"/* 260604 번역 */,"Haenam-gun"/* 260604 번역 */,"Yeongam-gun"/* 260604 번역 */,"Muan-gun"/* 260604 번역 */,"Hampyeong-gun"/* 260604 번역 */,"Yeonggwang-gun"/* 260604 번역 */,"Jangseong-gun"/* 260604 번역 */,"Wando-gun"/* 260604 번역 */,"Jindo-gun"/* 260604 번역 */,"Sinan-gun"/* 260604 번역 */],
                경북: ["Pohang-si"/* 260604 번역 */,"Gyeongju-si"/* 260604 번역 */,"Gimcheon-si"/* 260604 번역 */,"Andong-si"/* 260604 번역 */,"Gumi-si"/* 260604 번역 */,"Yeongju-si"/* 260604 번역 */,"Yeongcheon-si"/* 260604 번역 */,"Sangju-si"/* 260604 번역 */,"Mungyeong-si"/* 260604 번역 */,"Gyeongsan-si"/* 260604 번역 */,"Gunwi-gun"/* 260604 번역 */,"Uiseong-gun"/* 260604 번역 */,"Cheongsong-gun"/* 260604 번역 */,"Yeongyang-gun"/* 260604 번역 */,"Yeongdeok-gun"/* 260604 번역 */,"Cheongdo-gun"/* 260604 번역 */,"Goryeong-gun"/* 260604 번역 */,"Seongju-gun"/* 260604 번역 */,"Chilgok-gun"/* 260604 번역 */,"Yecheon-gun"/* 260604 번역 */,"Bonghwa-gun"/* 260604 번역 */,"Uljin-gun"/* 260604 번역 */,"Ulleung-gun"/* 260604 번역 */],
                경남: ["Changwon-si"/* 260604 번역 */,"Jinju-si"/* 260604 번역 */,"Tongyeong-si"/* 260604 번역 */,"Sacheon-si"/* 260604 번역 */,"Gimhae-si"/* 260604 번역 */,"Miryang-si"/* 260604 번역 */,"Geoje-si"/* 260604 번역 */,"Yangsan-si"/* 260604 번역 */,"Uiryeong-gun"/* 260604 번역 */,"Haman-gun"/* 260604 번역 */,"Changnyeong-gun"/* 260604 번역 */,"Goseong-gun"/* 260604 번역 */,"Namhae-gun"/* 260604 번역 */,"Hadong-gun"/* 260604 번역 */,"Sancheong-gun"/* 260604 번역 */,"Hamyang-gun"/* 260604 번역 */,"Geochang-gun"/* 260604 번역 */,"Hapcheon-gun"/* 260604 번역 */],
                제주: ["Jeju-si"/* 260604 번역 */,"Seogwipo-si"/* 260604 번역 */],
            },
        },
        consultFormNoStore: {
            title: "Consultation Content",
            investmentLabel: "Available investment amount"/* 260604 번역 */,
            investmentOptions: ["30 million won or less"/* 260604 번역 */, "30 million to 50 million won"/* 260604 번역 */, "50 million won or more"/* 260604 번역 */],
            incomeLabel: "Expected Income"/* 260604 번역 */,
            incomeOptions: ["1.5 to 2 million won"/* 260604 번역 */, "2 to 3 million won"/* 260604 번역 */, "3 million won or more"/* 260604 번역 */],
            openRegionLabel: "Desired Opening Area"/* 260604 번역 */,
            openTimeLabel: "Desired Opening Time"/* 260604 번역 */,
            openYearOptions: ["2026"/* 260604 번역 */, "2027"/* 260604 번역 */, "2028"/* 260604 번역 */],
            openMonthOptions: ["January"/* 260604 번역 */, "February"/* 260604 번역 */, "March"/* 260604 번역 */, "April"/* 260604 번역 */, "May"/* 260604 번역 */, "June"/* 260604 번역 */, "July"/* 260604 번역 */, "August"/* 260604 번역 */, "September"/* 260604 번역 */, "October"/* 260604 번역 */, "November"/* 260604 번역 */, "December"/* 260604 번역 */],
            typeLabel: "Desired Franchise Type for Opening"/* 260604 번역 */,
            franchiseTypeOptions: [
                { value: "GSF1", label: "GSF1 Type"/* 260604 번역 */ },
                { value: "GSF2", label: "GSF2 Type"/* 260604 번역 */ },
                { value: "GSF3", label: "GSF3 Type"/* 260604 번역 */ },
            ],
            viewLabel: "View"/* 260604 번역 */,
            inquiryLabel: "Inquiry Details"/* 260604 번역 */,
            inquiryPlaceholder: "Please enter your inquiry."/* 260604 번역 */,
        },
        submitLabel: "Consultation Request"/* 260604 번역 */,
        resetLabel: "Rewrite"/* 260604 번역 */,
        closeLabel: "Close"/* 260604 번역 */,
    },
};

const t = computed(() => {
    const selected = langData[props.lang];
    return selected && Object.keys(selected).length ? selected : langData.ko;
});

const hasStore = ref(null); // null: 미선택 / true: 있다 / false: 없다

const superItemOptions = computed(() => t.value.consultForm.superItemOptions);
const sidoOptions = computed(() => t.value.consultForm.sidoOptions);

const sigunguMap = computed(() => t.value.consultForm.sigunguMap);

const sigunguOptions = computed(() => {
    const list = sigunguMap.value[consultForm.regionSido] || [];
    return list.map(v => ({ value: v, label: v }));
});
const openSigunguOptions = computed(() => {
    const list = sigunguMap.value[consultForm.openRegionSido] || [];
    return list.map(v => ({ value: v, label: v }));
});

const consultForm = reactive({
    name: "",
    phone1: "010",
    phone2: "",
    phone3: "",
    emailId: "",
    emailDomain: "",
    emailDomainCustom: "",
    regionSido: "",
    regionSigungu: "",
    investmentAmount: "",
    expectedIncome: "",
    openRegionSido: "",
    openRegionSigungu: "",
    openYear: "",
    openMonth: "",
    franchiseType: "",
    inquiry: "",
    prevJob: "",
    areaContract: "",
    areaExclusive: "",
    superItems: [],
    superItemEtc: "",
    contractStart: "",
    contractEnd: "",
    deposit: "",
    monthlyRent: "",
});

const phoneOptions = [
    { value: "010", label: "010" },
    { value: "011", label: "011" },
    { value: "016", label: "016" },
    { value: "017", label: "017" },
    { value: "018", label: "018" },
    { value: "019", label: "019" },
];
const emailDomainOptions = [
    { value: "naver.com", label: "naver.com" },
    { value: "gmail.com", label: "gmail.com" },
    { value: "daum.net",  label: "daum.net" },
    { value: "kakao.com", label: "kakao.com" },
    { value: "hanmail.net", label: "hanmail.net" },
];

function closeModal(event) {
    if (props.inlineMode) {
        emit("close");
        return;
    }
    modal.close(event.currentTarget);
}
</script>

<style scoped>
:deep(.m_br) { display: none; }
:deep(.p_br) { display: block; }
.smn_intro strong { color: #161616; font-size: 3.2rem; line-height: 1.3; letter-spacing: -0.01em; }
.smn_intro > p { margin-top: 16px; color: #161616; font-size: 2rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.35; }
.consent_body { padding: 32px; }
.flex_wrap { display: flex; align-items: flex-start; gap: 20px; }
.consent_img_wrap { width: 114px; height: 152px; border: 1px solid #000; flex-shrink: 0; overflow: hidden; }
.consent_img_wrap > img { width: 100%; height: 100%; object-fit: cover; display: block; }
.consult_box .consent_info { padding: 0; display: flex; flex-direction: column; gap: 24px; }
.consult_box .consent_info_title { font-size: 2.4rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.35; color: #161616; }
.consult_box .consent_info > p { font-size: 1.6rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.5; color: #161616; }
.consult_box .consent_info > button { width: fit-content; padding: 4px 12px; background: #e8f8f1; border: 1px solid #15b874; border-radius: 100px; color: #15b874; font-size: 1.4rem; font-weight: 500; letter-spacing: -0.01em; line-height: 1.4; cursor: default; }
.consult_box .consent_notice { border-top: 1px solid #e5e5e9; }
.list_caution { list-style: none; margin: 0; padding: 0; }
.list_caution > li > p { color: #67676f; font-size: 1.6rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.5; }
.gray_box { margin-top: 40px; border-radius: 12px; background-color: #f8f8f8; overflow: hidden; }
.consent_info { padding: 32px; }
.consent_info_title { font-size: 2.4rem; font-weight: 700; letter-spacing: -0.01em; line-height: 1.35; color: #161616; }
.consent_info_list { margin-top: 24px; display: flex; flex-direction: column; gap: 8px; }
.consent_info_list > li { padding-left: 10px; color: #67676f; font-size: 1.6rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.5; position: relative; }
.consent_info_list > li::before { content: ""; width: 4px; height: 1px; background-color: #67676f; position: absolute; left: 0; top: 0.5lh; }
.consent_notice { margin-top: 24px; padding-top: 24px; border-top: 1px solid #d7d7df; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.consent_notice_text { font-size: 1.6rem; font-weight: 700; line-height: 1.24; color: #161616; }
.consent_notice > :deep(.input_wrap) { width: auto !important; flex: 0 1 auto;}
.consent_notice :deep(.label) { font-size: 1.8rem; color: #161616; }
.middle_bts_wrap { margin-top: 40px; display: flex; gap: 8px; }
.middle_bts_wrap > button { height: 52px; padding: 0 16px; background: #fff; border: 1px solid #90909a; border-radius: 10px; font-size: 1.8rem; font-weight: 700; cursor: pointer; transition: border-color 0.15s, color 0.15s; color: #161616; }
.middle_bts_wrap > button:hover, .middle_bts_wrap > button.active { border-color: #107af2; color: #107af2; }
.form_field > :deep(.input_wrap) { flex: 1; min-width: 0; max-width: 205px; }
.form_field_phone :deep(.select) { width: 134px; flex-shrink: 0; }
.form_field_phone :deep(.select select) { width: 100%; font-size: 1.6rem; }
.form_field_phone > :deep(.input_wrap) { max-width: 134px; flex: 1; min-width: 80px; }
.form_field_email > :deep(.input_wrap:nth-child(1)) { flex: 0 0 205px; width: 205px; min-width: 0; }
.form_field_email > :deep(.input_wrap:nth-child(3)) { flex: 0 0 180px; width: 180px; min-width: 0; }
.form_field_email :deep(.select) { flex: 0 0 180px; width: 180px; min-width: 0; }
.form_field_email :deep(.select select) { width: 100%; font-size: 1.6rem; }
.form_field_region :deep(.select) { flex: 1; min-width: 0; max-width: 220px; }
.form_field_region :deep(.select select) { width: 100%; font-size: 1.6rem; }
.form_field_area .form_sub_input_wrap :deep(.input_wrap) { width: 160px; }
.check_list :deep(.input_wrap) { width: auto !important; flex:none !important;}

.check_etc .form_sub_label { min-width: 28px; }
.check_etc :deep(.input_wrap) { flex: 1; max-width: 428px; }
.form_sub_inputs :deep(.input_wrap) { width: 134px; }
.contract_rent .form_sub_input_wrap :deep(.input_wrap) { width: 134px; }
.form_field_franchise { display: flex; flex-wrap: wrap; gap: 12px 20px; }
.franchise_type_item { display: inline-flex; align-items: center; gap: 8px; }
.franchise_type_item :deep(.input_wrap) { width: auto; }
.franchise_type_item :deep(.btn_small) { min-width: 60px; height: 44px; }
.form_field > textarea { width: 100%; min-height: 160px; padding: 14px 16px; border: 1px solid #c4c4d0; border-radius: 12px; color: #161616; font-size: 1.6rem; line-height: 1.5; resize: vertical; box-sizing: border-box; }
.form_field > textarea::placeholder { color: #a4a4b0; }
.modal_bottom { margin-top: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.modal_bottom > :deep(.btn_big) { width: 134px; text-align: center; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }

@media (max-width: 768px) {
    :deep(.m_br) { display: block; }
    :deep(.p_br) { display: none; }
    .modal_content { padding: 40px 0; }
    .smn_intro > p { margin-top: 12px; }
    .consent_info { padding: 30px 20px; }
    .consent_info_list > li { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .consent_info_title { font-weight: 700; font-size: 1.8rem; line-height: 1.5; }
    .consent_notice { flex-direction: column; align-items: flex-start; gap: 16px; }
    .consent_notice_text { font-size: 1.4rem; line-height: 1.4; }
    .form_field_phone > :deep(.input_wrap) { max-width: none; flex: 1; }
    .form_field_email > :deep(.input_wrap:nth-child(1)) { flex: 1; min-width: 80px; }
    .form_field_email > :deep(.input_wrap:nth-child(3)) { flex: 1; min-width: 60px; }
    .form_field_email :deep(.select) { flex: 1 0 100%; width: 100%; }
    .form_field_region :deep(.select) { flex: 1 0 100%; width: 100%; max-width: 100%; }
    .consent_notice :deep(.label) { font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .modal_bottom { margin-top: 0; justify-content: center; }
    .modal_bottom > :deep(.btn_big) { width: 100%; flex: 1; }
    .modal_bottom :deep(.primary) { background-color: var(--color-brand-primary); }
    .smn_intro strong { font-weight: 700; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em; }
    .smn_intro > p { margin-top: 12px; font-size: 1.8rem; line-height: 1.4; letter-spacing: 0; }
    .gray_box { margin-top: 32px; }
    .gray_box + .gray_box { margin-top: 60px; }
    .consent_body { padding: 30px 20px; }
    .consent_img_wrap { width: 90px; height: 120px; }
    .consult_box .consent_info_title { font-size: 1.8rem; line-height: 1.5; letter-spacing: 0; }
    .consult_box .consent_info { gap: 6px; }
    .consult_box .consent_info > p { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .consult_box .consent_info > button { margin-top: 6px; }
    .consent_notice { margin-top: 24px; padding-top: 24px; }
    .consult_box .consent_notice { margin-top: 16px; padding-top: 16px; }
    .list_caution > li > p { font-size: 1.4rem; line-height: 1.4; letter-spacing: -0.01em; }
    .middle_bts_wrap { gap: 6px; }
    .middle_bts_wrap > button { padding: 0 5px; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
    .form_field_area .form_sub_input_wrap { width: 100%; }
    .form_field_area .form_sub_input_wrap :deep(.input_wrap) { width: 100%; }
    .form_field > :deep(.input_wrap) { max-width: 100%; }
    .form_sub_inputs :deep(.input_wrap) { width: 100%; }
    .form_field_franchise { gap: 8px 12px; }
    .franchise_type_item :deep(.btn_small) { height: 38px; }
}
</style>
