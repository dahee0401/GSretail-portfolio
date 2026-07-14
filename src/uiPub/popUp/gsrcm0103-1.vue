<template>
    <div class="modal_cont gsrcm0103">
        <div class="modal_header">
            <span class="tit_pc" v-html="t.title"></span>
            <span class="tit_mo" v-html="t.titleMoHeader"></span>
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">
            <header class="mo_content_tit">
                <h2 v-html="t.title"></h2>
            </header>

            <div class="policy_wrap type_pop">
                <div class="inner" v-html="t.cont"></div>

                <nav v-if="t.btns">
                    <Buttons
						v-for="(btn, bIdx) in t.btns"
						:key="'btn-' + bIdx"
						btn-class="btn_icon_arrow btn_big border after"
						:data-popid="btn.link"
						:data-type="'lg'"
						:data-cont="btn.link"
						@click.prevent="movePolicy"
					>
                        <span class="txt_pc">{{ btn.textPc }}</span>
                        <span class="txt_mo">{{ btn.textMo }}</span>
                    </Buttons>
                </nav>
            </div>
        </div>

        <div class="modal_bototm">
            <Buttons btn-class="btn_big fill primary" @click="closeModal">{{ t.submitLabel }}</Buttons>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from "vue";
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";

// 26.07.08 Add 이종환
const emit = defineEmits([
    "change-policy"
]);

const props = defineProps({
    lang: { type: String, default: "ko" },
});

const langData = {
    ko: {
        title: "영상정보처리기기 운영·관리 방침",
        titleMoHeader: "운영·관리 방침",
        closeLabel: "닫기",
        submitLabel: "확인",
        cont:`<div class="policy_tit">
            <strong>2025.11.6 개정판 고시</strong>
            <p>GS 리테일(이하 회사라 함)은 영상정보처리기기 운영·관리 방침을 통해 회사에서 처리하는 개인영상정보가 어떠한 용도와 방식으로 이용·관리되고 있는지 알려드립니다.</p>
        </div>
        
        <dl>
            <dt>1. 영상정보처리기기의 설치 근거 및 설치 목적</dt>
            <dd>
                <p>회사는「개인정보 보호법」제25조 제1항에 따라 다음과 같은 목적으로 영상정보처리기기를 설치·운영 합니다.</p>
                <ul class="bullet_02">
                    <li>시설안전 및 관리, 화재 예방</li>
                    <li>고객의 안전을 위한 범죄 예방</li>
                    <li>차량도난 및 파손방지</li>
                </ul>
            </dd>

            <dt>2. 설치 대수, 설치 위치 및 촬영범위</dt>
            <dd>
                <div class="table_wrap type_open">
                    <div class="inner">
                        <table class="ac" summary="설치 대수, 설치 위치 및 촬영범위">
							<caption>설치 대수, 설치 위치 및 촬영범위</caption>
							<colgroup>
								<col style="width:30%">
								<col style="width:20%">
								<col style="width:50%">
							</colgroup>
							<thead>
								<tr>
									<th>구분</th>
									<th>설치 대수</th>
									<th>설치 위치 및 촬영 범위</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>GS 강남타워</td>
									<td>22대</td>
									<td>각 층 비상계단, 금고실, RPA센터, 고객상담실 내/외부 등</td>
								</tr>
								<tr>
									<td>GS 강서타워</td>
									<td>173대</td>
									<td rowspan="4" style="vertical-align: middle;">건물 로비, E/V홀<br>계단 전실, 출입구<br>주차장, 주요시설물 등</td>
								</tr>
								<tr>
									<td>GS 강서N타워</td>
									<td>152대</td>
								</tr>
								<tr>
									<td>이천 물류센터</td>
									<td>88대</td>
								</tr>
								<tr>
									<td>군포 물류센터</td>
									<td>109대</td>
								</tr>
								<tr>
									<td>포천 심소원</td>
									<td>56대</td>
									<td>캠핑장, 워크숍센터, 숙소동, 도서관 등</td>
								</tr>
								<tr>
									<td>GS25 영업점포</td>
									<td>(점당) 5대</td>
									<td>점포 내/외부</td>
								</tr>
								<tr>
									<td>GS THE FRESH 영업점포</td>
									<td>(점당) 16대</td>
									<td>점포 내/외부</td>
								</tr>
							</tbody>
						</table>
                    </div>
                    <p class="explain mt10">* 영업점포별 설치 대수는 상이할 수 있습니다.</p>
                </div>
            </dd>

            <dt>3. 관리책임자 및 접근권한자</dt>
            <dd>
                <div class="table_wrap type_open">
                    <p class="explain mb10">귀하의 개인영상정보를 보호하고 개인영상정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인영상정보 관리책임자 및 접근권한자를 두고 있습니다.</p>
                    <div class="inner">
                        <table class="ac" summary="관리책임자 및 접근권한자">
							<caption>관리책임자 및 접근권한자</caption>
							<colgroup>
								<col style="width:25%">
								<col style="width:25%">
								<col style="width:25%">
								<col style="width:25%">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">구분</th>
									<th scope="col">직위</th>
									<th scope="col">소속</th>
									<th scope="col">연락처</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>GS 강남타워</td>
									<td>매니저</td>
									<td>피플지원팀</td>
									<td>02-2006-2051</td>
								</tr>
								<tr>
									<td>GS 강서타워</td>
									<td>팀장, 매니저</td>
									<td>홈쇼핑피플지원팀</td>
									<td>02-2007-4102</td>
								</tr>
								<tr>
									<td>GS 강서N타워</td>
									<td>팀장, 매니저</td>
									<td>홈쇼핑피플지원팀</td>
									<td>02-2007-4102</td>
								</tr>
								<tr>
									<td>이천 물류센터</td>
									<td>파트장</td>
									<td>이천Site</td>
									<td>010-2963-8119</td>
								</tr>
								<tr>
									<td>군포 물류센터</td>
									<td>센터장</td>
									<td>군포센터</td>
									<td>02-2007-0920</td>
								</tr>
								<tr>
									<td>포천 심소원</td>
									<td>팀장, 매니저</td>
									<td>홈쇼핑피플지원팀</td>
									<td>02-2007-4102</td>
								</tr>
								<tr>
									<td>GS25, GS THE FRESH 영업점포</td>
									<td colspan="2">각 영업점 점장</td>
									<td>점포번호</td>
								</tr>
							</tbody>
						</table>
                    </div>
                </div>
            </dd>

            <dt>4. 개인영상정보의 촬영시간, 보관기간, 보관장소 및 처리방법</dt>
            <dd>
                <div class="table_wrap type_open">
                    <div class="inner">
                        <table class="ac" summary="영상정보의 촬영시간, 보관기간, 보관장소 및 처리방법">
							<caption>영상정보의 촬영시간, 보관기간, 보관장소 및 처리방법</caption>
							<colgroup>
								<col style="width:25%">
								<col style="width:25%">
								<col style="width:25%">
								<col style="width:25%">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">구분</th>
									<th scope="col">촬영시간</th>
									<th scope="col">보관기간</th>
									<th scope="col">보관장소</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>GS 강남타워</td>
									<td>24시간</td>
									<td>촬영일로부터 30일</td>
									<td>17층 전산실(접근통제 구역)</td>
								</tr>
								<tr>
									<td>GS 강서타워</td>
									<td>24시간</td>
									<td>촬영일로부터 30일<br>(2F 어린이집의 경우 60일 보관)</td>
									<td>GS 강서타워 : B1층 상황실</td>
								</tr>
								<tr>
									<td>GS 강서N타워</td>
									<td>24시간</td>
									<td>촬영일로부터 30일</td>
									<td>GS 강서N타워 : B1층 상황실</td>
								</tr>
								<tr>
									<td>포천심소원</td>
									<td>24시간</td>
									<td>촬영일로부터 30일</td>
									<td>포천 심소원 : 관리소</td>
								</tr>
								<tr>
									<td>이천 물류센터</td>
									<td>24시간</td>
									<td>촬영일로부터 30일</td>
									<td>이천 물류센터 : 3층 사무실 內</td>
								</tr>
								<tr>
									<td>군포 물류센터</td>
									<td>24시간</td>
									<td>촬영일로부터 30일</td>
									<td>군포 물류센터 : 1층 경비실 內</td>
								</tr>
								<tr>
									<td>GS25, GS THE FRESH 영업점포</td>
									<td>24시간</td>
									<td>촬영일로부터 40일</td>
									<td>각 점포 사무실 녹화기기</td>
								</tr>
							</tbody>
						</table>
                    </div>
                    <p class="mt10 explain">* 영업점포별 보관기간은 상이할 수 있습니다.</p>

                    <ul class="bullet_02">
                        <li>처리방법 : 개인영상정보의 목적 외 이용, 제3자 제공, 파기, 열람 등 요구에 관한 사항을 기록·관리하고, 보관기간 만료 시 복원이 불가능한 방법으로 영구삭제(출력물의 경우 파쇄 또는 소각)합니다.</li>
                    </ul>
                </div>
            </dd>

            <dt>5. 영상정보처리기기 설치 및 관리 등의 위탁에 관한 사항</dt>
            <dd>
                <div class="table_wrap type_open">
                    <p class="explain mb10">회사는 아래와 같이 영상정보처리기기 설치 및 관리 등을 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.</p>
                    <div class="inner">
                        <table class="ac" summary="영상정보처리기기 설치 및 관리 등의 위탁에 관한 사항">
							<caption>영상정보처리기기 설치 및 관리 등의 위탁에 관한 사항</caption>
							<colgroup>
								<col style="width:33.3%">
								<col style="width:33.3%">
								<col style="width:33.3%">
							</colgroup>
							<thead>
								<tr>
									<th scope="col">수탁업체</th>
									<th scope="col">담당자</th>
									<th scope="col">연락처</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>㈜S&amp;I코퍼레이션(구 서브원)</td>
									<td>함훈식</td>
									<td>02-6718-2222, 2111</td>
								</tr>
							</tbody>
						</table>
                    </div>
                </div>
            </dd>

            <dt>6. 개인영상정보의 확인 방법 및 장소에 관한 사항</dt>
            <dd>
                <ul class="bullet_02">
                    <li>확인 방법 : 개인영상정보 관리책임자에게 미리 연락하고 회사를 방문하시면 확인 가능합니다. 단, 타인의 개인정보보호를 위해 열람은 제한됩니다.</li>
                    <li>확인 장소 : GS 강남/강서/강서N타워/물류센터/심소원 및 해당점포</li>
                </ul>
            </dd>

            <dt>7. 정보주체의 개인영상정보 열람 등 요구에 대한 조치</dt>
            <dd>
                <p>귀하는 개인영상정보에 관하여 열람 또는 존재확인•삭제를 원하는 경우 언제든지 영상정보처리기기 운영자에게 요구하실 수 있습니다. 단, 귀하가 촬영된 개인영상정보에 한정됩니다.<br/> 회사는 개인영상정보에 관하여 열람 또는 존재확인•삭제를 요구한 경우 지체 없이 필요한 조치를 하겠습니다.</p>
            </dd>

            <dt>8. 개인영상정보의 안전성 확보조치</dt>
            <dd>
                <p>회사는 처리하는 개인영상정보는 암호화 조치 등을 통하여 안전하게 관리되고 있습니다.<br/> 회사는 개인영상정보보호를 위한 관리적 대책으로서 개인정보에 대한 접근 권한을 차등부여하고 있고, 개인영상정보의 위·변조 방지를 위하여 개인영상정보의 생성 일시, 열람 시 열람 목적·열람자·열람 일시 등을 기록하여 관리하고 있습니다. 이 외에도 개인영상정보의 안전한 물리적 보관을 위하여 설치하고 있습니다.</p>
            </dd>

            <dt>9. 영상정보처리기기 운영·관리방침 변경에 관한 사항</dt>
            <dd>
                <p>법령ㆍ정책 또는 보안기술의 변경에 따라 내용의 추가ㆍ삭제 및 수정이 있을 시에는 회사 홈페이지를 통해 변경내용 등을 공지하도록 하겠습니다.</p>
            </dd>
        </dl>
        
        <ul class="notice_date">
            <li>공고일자 : 2025년 11월 6일</li>
            <li>시행일자 : 2025년 11월 6일</li>
        </ul>`,

        btns: [
            { textPc: "2024.07.24 ~ 2025.11.05 이전방침 보러가기", textMo: "2024.07.24 ~ 2025.11.05 이전방침", link: "gsrcm0103-2" },
            { textPc: "2021.07.01 ~ 2024.07.23 이전방침 보러가기", textMo: "2021.07.01 ~ 2024.07.23 이전방침", link: "gsrcm0103-3" },
        ],
    },
    en: {},
};

const t = computed(() => {
    const selected = langData[props.lang];
    return selected && Object.keys(selected).length ? selected : langData.ko;
});

function closeModal(event) {
    modal.close(event.currentTarget);
}

function movePolicy(event) {
    const el = event.currentTarget;

    modal.close(document.querySelector(".modal_wrap.active"));

    modal.open(
        el.dataset.popid,
        el.dataset.type,
        el,
        el.dataset.cont
    );
}
</script>

<style scoped>
.modal_header{margin-bottom:80px;}
.modal_header > .tit_mo { display: none; }
.mo_content_tit { display: none; }
.ft_sec_list{gap:60px;}
.ft_sec_list > li > article{gap:40px;}
.ft_stack{padding-left:0;}
.ft_stack p{margin:0;}
.ft_stack > .desc_group { margin-top: 30px; }
.ft_stack > nav { margin-top:30px; display: inline-flex; flex-direction: column; gap: 8px; }
.ft_stack > nav :deep(.txt_mo) { display: none; }
.ft_stack p + .img_scroll{margin-top:20px;}
.ft_stack > .img_scroll { width: 100%; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.ft_stack > .img_scroll > figure.img_box { width: 961px; min-width: 961px; height: 670px; flex-shrink: 0; background-color: #e5e5e9; background-repeat: no-repeat; background-position: left top; background-size: 961px auto; border-radius: 12px; }
.ft_stack > .img_scroll > figure.img_box.is_sm { height: 152px; background-size: 961px auto; }
.modal_bototm { margin-top: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
.modal_bototm > :deep(.btn_big) { width: 134px; text-align: center; font-size: 1.6rem; line-height: 1.5; letter-spacing: -0.01em; }
.ft_sec_list{padding:0;}


@media (min-width: 769px ) {
    .ft_sec_list > li > article > h4{font-size: 2.4rem;}

}
@media (max-width: 768px) {
    .modal_header{margin-bottom:40px;}
    .modal_header > .tit_pc { display: none; }
    .modal_header > .tit_mo { display: block; }
    .ft_stack p{font-size: 1.4rem;line-height: 1.4;}
    .mo_content_tit { display: block; }
    .mo_content_tit > h2 { margin-bottom: 80px; color: #161616; font-size: 2rem; font-weight: 700; line-height: 1.35; letter-spacing: -0.01em; }
    .ft_stack > nav :deep(.txt_pc) { display: none; }
    .ft_stack > nav :deep(.txt_mo) { display: inline; }
    .modal_bototm { justify-content: center; }
    .modal_bototm > :deep(.btn_big) { width: 100%; flex: 1; }
}
</style>
