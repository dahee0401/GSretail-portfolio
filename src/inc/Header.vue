<template>
    <header id="header" :class="{ sub_header: isSubPage }"><div class="inner">
        <h1><a href="/">GS리테일</a></h1>
            
        <div class="btn_prev_wrap">
            <button>이전</button>
            <strong>페이지명</strong>
        </div>
        <nav id="gnb_nav">
            <ul class="depth1">
                <li v-for="item1 in menuList" :key="item1.title"
                    :class="{ current: currentDepth1Key && item1.path?.startsWith(currentDepth1Key) }"
                    @focusin="setFocus($event)"
                    @focusout="removeFocus($event)" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">

                    <!-- 26.06.01 Edit 이종환 : 모바일에서 depth1에 하위메뉴가 있으면 링크 없애고 하위메뉴 펼침닫힘 기능 -->
                    <a
                        :href="!isDesktop() && item1.children?.length
                            ? '#'
                            : getLink(item1)"
                        :target="item1.blank ? '_blank' : null"
                        @click="!isDesktop() && item1.children?.length ? toggleMenu($event) : null"
                    >
                        {{ item1.title }}
                    </a>

                    <!-- 26.06.12 Edit 정다희 : depth2_wrap을 1depth a 밖 li 형제로 분리 -->
                    <div class="depth2_wrap" v-if="item1.children && item1.children.length">
                        <!-- 26.06.12 Edit 정다희 : depth2 3개씩 묶기(chunkedChildren) 삭제 → children 직접 순회 -->
                        <ul class="depth2">
                            <li v-for="item2 in item1.children" :key="item2.title">
                                <a :href="getLink(item2)" :target="item2.blank ? '_blank' : null">{{
                                    item2.title }}</a>

                                <ul class="depth3" v-if="item2.children && item2.children.length">
                                    <li v-for="item3 in item2.children" :key="item3.title">
                                        <a :href="getLink(item3)" :target="item3.blank ? '_blank' : null">{{
                                            item3.title }}</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                </li>
            </ul>
        </nav>

        <div class="quick_wrap">
            <ul class="quick">
                <li v-for="item1 in quickMenu" :key="item1.title">
                    <strong v-if="item1.children && item1.children.length" @click="toggleMenu($event)">{{
                        item1.title }}</strong>
                    <a v-else :href="item1.path" :target="item1.blank ? '_blank' : null">{{ item1.title }}</a>
                    <ul v-if="item1.children && item1.children.length">
                        <li v-for="item2 in item1.children" :key="item2.title">
                            <strong v-if="item2.children && item2.children.length">{{ item2.title }}</strong>
                            <a v-else :href="getLink(item2)" :target="item2.blank ? '_blank' : null">{{ item2.title
                            }}</a>
                            <ul class="depth3" v-if="item2.children && item2.children.length">
                                <li v-for="item3 in item2.children" :key="item3.title">
                                    <a :href="getLink(item3)" :target="item3.blank ? '_blank' : null">{{ item3.title
                                    }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul class="language">
                <li><button @click="changeLang('ko')" :class="{ 'current': currentLang === 'ko' }">KO</button></li>
                <li><button @click="changeLang('en')" :class="{ 'current': currentLang === 'en' }">EN</button></li>
            </ul>
        </div>
        <button class="btn_allMenu" @click="mo_menuToggle();">전체메뉴</button>
    </div>
    </header>
</template>

<script>
import menuEn from "@/assets/language/menu/menu.en.json";
import quickEn from "@/assets/language/menu/quick.en.json";

import menuKo from "@/assets/language/menu/menu.ko.json";
import quickKo from "@/assets/language/menu/quick.ko.json";
import { ref, onMounted, onUnmounted, computed } from "vue";

export default {
    name: "Header",
    components: {
    },
    props: {
        lang: { type: String, default: "ko" }, // ko/en
    },
    emits: ["change-lang"], // language change for publish
    setup(props, { emit }) {
        // 메뉴 목록 computed
        const menuList = computed(() => {
            return props.lang === "en" ? menuEn : menuKo;
        });

        // 26.06.15 Add 정다희 : 퍼블 테스트용 — URL pathname 앞 5글자로 1depth current 매칭 (개발 시 라우트 기준으로 교체)
        const currentDepth1Key = computed(() => {
            const path = window.location.pathname.replace(/^\//, ""); // 앞 슬래시 제거
            return path.length >= 5 ? path.substring(0, 5) : null; // 예: /gsrbr/01/... → "gsrbr"
        });

        // 링크 처리: blank 또는 lang 기반 경로
        const getLink = (item) => {

            if (!item.path || item.path === "#none" || item.path === "#") return "#";
            return item.blank ? item.path : `/${item.path}`;
        };

        // ✅ PC 여부 체크 함수 (768px 초과 시 true)
        /* 26.06.01 Add 이종환 : 반응형으로 리사이징 isDesktop 체크 */
        const windowWidth = ref(window.innerWidth);
        const isDesktop = () => windowWidth.value > 768;
        /* //26.06.01 Add 이종환 : 반응형으로 리사이징 isDesktop 체크 */

        // 26.06.12 Add 정다희 : 2depth 풀폭 패널 — 활성 1depth li 왼쪽 정렬
        const setDepth2Position = (li) => {
            const depth2 = li.querySelector(".depth2_wrap");
            // li.getBoundingClientRect().left → CSS var(--menu-left)로 전달 (ui.css depth2_wrap padding/margin 연동)
            if (depth2) depth2.style.setProperty("--menu-left", `${li.getBoundingClientRect().left}px`);
        };
        // 26.06.12 Add 정다희 : 열린 메뉴 전체 좌표 재계산 (리사이즈·스크롤·초기 로드 시)
        const updateOpenDepth2Position = () => {
            document.querySelectorAll("#gnb_nav ul.depth1 > li.is-open").forEach(setDepth2Position);
        };

        // 26.06.23 Add 이소라 : GNB 2depth 슬라이드 — depth2_wrap 내부 ul.depth2 height 전환
        const depth2SlideTokens = new WeakMap();
        const getDepth2SlideEl = (li) => li?.querySelector(".depth2_wrap > ul.depth2");
        const resetDepth2Slide = (slideEl) => {
            if (!slideEl) return;
            depth2SlideTokens.set(slideEl, (depth2SlideTokens.get(slideEl) || 0) + 1);
            slideEl.classList.remove("is-slide-open", "is-sliding");
            slideEl.style.height = "";
            slideEl.style.overflow = "";
        };
        const resetAllDepth2Slides = () => {
            document.querySelectorAll("#gnb_nav ul.depth2").forEach(resetDepth2Slide);
        };
        const openDepth2Slide = (li) => {
            const slideEl = getDepth2SlideEl(li);
            if (!slideEl) return;
            if (slideEl.classList.contains("is-slide-open") && slideEl.style.height === "auto") return;
            const token = (depth2SlideTokens.get(slideEl) || 0) + 1;
            depth2SlideTokens.set(slideEl, token);
            slideEl.classList.add("is-sliding", "is-slide-open");
            slideEl.style.overflow = "hidden";
            slideEl.style.height = "auto";
            const heightPx = `${slideEl.scrollHeight}px`;
            slideEl.style.height = "0px";
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (depth2SlideTokens.get(slideEl) !== token) return;
                    slideEl.style.height = heightPx;
                });
            });
            const onEnd = (e) => {
                if (e.target !== slideEl || e.propertyName !== "height") return;
                if (depth2SlideTokens.get(slideEl) !== token) return;
                slideEl.style.height = "auto";
                slideEl.classList.remove("is-sliding");
            };
            slideEl.addEventListener("transitionend", onEnd, { once: true });
        };
        const closeDepth2Slide = (li, onComplete) => {
            const slideEl = getDepth2SlideEl(li);
            if (!slideEl || !slideEl.classList.contains("is-slide-open")) {
                onComplete?.();
                return;
            }
            const token = (depth2SlideTokens.get(slideEl) || 0) + 1;
            depth2SlideTokens.set(slideEl, token);
            slideEl.classList.add("is-sliding");
            slideEl.style.overflow = "hidden";
            const currentHeight = slideEl.scrollHeight;
            if (currentHeight === 0) {
                resetDepth2Slide(slideEl);
                onComplete?.();
                return;
            }
            slideEl.style.height = `${currentHeight}px`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (depth2SlideTokens.get(slideEl) !== token) return;
                    slideEl.style.height = "0px";
                });
            });
            const onEnd = (e) => {
                if (e.target !== slideEl || e.propertyName !== "height") return;
                if (depth2SlideTokens.get(slideEl) !== token) return;
                resetDepth2Slide(slideEl);
                onComplete?.();
            };
            slideEl.addEventListener("transitionend", onEnd, { once: true });
        };

        // 26.06.15 Add 정다희 : GNB 열림 시 팝업과 동일 딤 처리 (.gnb_dim — ui.css, z-index:98 / header:99)
        const updateGnbDim = () => {
            const dim = document.querySelector(".gnb_dim");
            if (!isDesktop()) {
                dim?.remove(); // 26.06.15 Add 정다희 : 모바일(768px 이하)에서는 GNB 딤 미사용 → body 잔여 요소 제거
                return;
            }
            const hasOpen = document.querySelector("#gnb_nav ul.depth1 > li.is-open");
            if (hasOpen) {
                if (!dim) {
                    const el = document.createElement("div");
                    el.className = "gnb_dim"; // .modal_dim과 동일 rgba(0,0,0,0.6) — modal.js와 클래스 분리(충돌 방지)
                    el.setAttribute("aria-hidden", "true");
                    document.body.appendChild(el); // header 밖 body에 삽입 — 전체 화면 딤
                }
            } else {
                dim?.remove(); // 26.06.15 Add 정다희 : 열린 1depth 없으면 딤 제거
            }
        };
        // 26.06.15 Add 정다희 : GNB 열림 상태 통합 — add_bg(헤더 흰배경) + gnb_dim 동기화
        const syncHeaderOpenState = () => {
            const header = document.getElementById("header");
            if (!header || !isDesktop()) {
                header?.classList.remove("add_bg"); // 모바일·비PC 구간에서는 add_bg 해제
                updateGnbDim();
                return;
            }
            const hasOpen = document.querySelector("#gnb_nav ul.depth1 > li.is-open");
            if (hasOpen) header.classList.add("add_bg"); // 2depth 패널 열림 시 header 배경 흰색 전환
            else header.classList.remove("add_bg");
            updateGnbDim(); // is-open 유무에 따라 .gnb_dim 생성/제거
        };
        const switchDepth1Menu = (targetLi) => {
            if (!targetLi || !isDesktop()) return;
            const slideEl = getDepth2SlideEl(targetLi);
            if (!slideEl) return;
            const openLi = document.querySelector("#gnb_nav ul.depth1 > li.is-open");
            if (openLi === targetLi && slideEl.classList.contains("is-slide-open") && slideEl.style.height === "auto") return;
            document.querySelectorAll("#gnb_nav ul.depth1 > li.is-open").forEach((li) => {
                if (li === targetLi) return;
                li.classList.remove("is-open");
                closeDepth2Slide(li);
            });
            targetLi.classList.add("is-open");
            setDepth2Position(targetLi);
            resetDepth2Slide(slideEl);
            openDepth2Slide(targetLi);
            syncHeaderOpenState();
        };

        // 26.06.12 Edit 정다희 : PC GNB hover — is-open + --menu-left + add_bg + gnb_dim
        const handleMouseEnter = (e) => {
            if (!isDesktop()) return;
            switchDepth1Menu(e.currentTarget);
        }
        // 26.06.12 Edit 정다희 : PC GNB mouseleave — li 밖으로 나갈 때만 is-open 해제 후 상태 동기화
        const handleMouseLeave = (e) => {
            if (!isDesktop()) return;
            const li = e.currentTarget;
            // relatedTarget: 2depth_wrap 내부로 이동 시 contains → true, is-open 유지
            if (li.contains(e.relatedTarget)) return;
            if (e.relatedTarget?.closest?.("#gnb_nav ul.depth1 > li")) return;
            li.classList.remove("is-open");
            closeDepth2Slide(li, () => syncHeaderOpenState());
        };

        // quick menu
        const quickMenu = computed(() => {
            return props.lang === "en" ? quickEn : quickKo;
        });

        // const openMenu = ref(null);
        const toggleMenu = (e) => {
            e.preventDefault();
            const li = e.currentTarget.parentElement;
            if (li.classList.contains("is-open")) {
                closeDepth2Slide(li, () => {
                    li.classList.remove("is-open");
                });
            } else if (isDesktop()) {
                switchDepth1Menu(li);
            } else {
                document.querySelectorAll("#gnb_nav ul.depth1 > li.is-open").forEach((openLi) => {
                    if (openLi === li) return;
                    openLi.classList.remove("is-open");
                    closeDepth2Slide(openLi);
                });
                li.classList.add("is-open");
                openDepth2Slide(li);
            }
        }

        // 26.06.12 Edit 정다희 : 키보드 focusin — closeTimer로 focusout/focusin 순서 깜빡임 방지 + 2depth 좌표·딤 동기화
        const setFocus = (e) => {
            const li = e.currentTarget;
            const FOCUS_DELAY = 150; // focusout 직후 activeElement 이동 대기 (BreadCrumb.vue 동일 패턴)
            if (li.closeTimer) clearTimeout(li.closeTimer);
            li.closeTimer = setTimeout(() => {
                if (li.contains(document.activeElement)) {
                    switchDepth1Menu(li);
                }
                li.closeTimer = null;
            }, FOCUS_DELAY);
        };

        // 26.06.12 Edit 정다희 : 키보드 focusout — li 밖으로 포커스가 나갔을 때만 is-open·딤 해제
        const removeFocus = (e) => {
            const li = e.currentTarget;
            const FOCUS_DELAY = 150;
            if (li.closeTimer) clearTimeout(li.closeTimer);
            li.closeTimer = setTimeout(() => {
                if (!li.contains(document.activeElement)) {
                    closeDepth2Slide(li, () => {
                        li.classList.remove("is-open");
                        syncHeaderOpenState(); // 26.06.15 Add 정다희 : 포커스 이탈 시 add_bg + gnb_dim 제거
                    });
                }
                li.closeTimer = null;
            }, FOCUS_DELAY);
        };

        // language change for publish
        // ✅ 현재 선택된 언어 상태 관리 (기본값 props.lang)
        const currentLang = ref(props.lang);

        // language change
        const changeLang = (lang) => {
            // 1. Vue 상태 업데이트 (원본 버튼의 클래스 변경)
            currentLang.value = lang;
            emit("change-lang", lang);

            // 2. [추가] 복제된 버튼들(GNB 내부) 클래스 수동 업데이트
            // resize로 인해 생성된 복제본(.is-cloned) 내부의 버튼들을 찾아 클래스를 직접 수정합니다.
            const clonedLanguageWrap = document.querySelector("#gnb_nav .quick_wrap.is-cloned .language");
            if (clonedLanguageWrap) {
                const buttons = clonedLanguageWrap.querySelectorAll("button");
                buttons.forEach((btn) => {
                    // 버튼 텍스트가 클릭한 언어와 일치하면 current 추가, 아니면 제거
                    if (btn.textContent.toLowerCase().trim() === lang.toLowerCase()) {
                        btn.classList.add("current");
                    } else {
                        btn.classList.remove("current");
                    }
                });
            }
        };

        /* header scroll show/hide */
        let lastScrollY = 0;

        const handleScroll = () => {
            const header = document.getElementById("header");            
            const visual = document.querySelector('.top_visual');
            const currentScrollY = window.scrollY;

            if (!header) return;

            // 1. [추가] 특정 영역(visual) 기준 검정색 테마 적용
            if (visual) {
                const head_black_threshold = visual.offsetHeight - (header.offsetHeight * 0.5);
                if (currentScrollY > head_black_threshold) {
                    header.classList.add("head_black");
                } else {
                    header.classList.remove("head_black");
                }
            } else {
                header.classList.add("head_black");
            }

            // 2. [추가] 최상단 바운스 방지: 스크롤 위치가 0보다 작으면(iOS 반동) 무조건 노출
            if (currentScrollY <= 0) {
                header.classList.remove("hide");
                lastScrollY = currentScrollY;
                return;
            }

            const scrollHeight = document.documentElement.scrollHeight;
            const innerHeight = window.innerHeight;
            const buffer = 20;

            // 3. [추가] 스크롤 감도 설정: 최소 5px 이상 움직였을 때만 동작 (미세한 반동 무시)
            const tolerance = 5;
            const diff = currentScrollY - lastScrollY;

            const isBottom = innerHeight + currentScrollY >= scrollHeight - buffer;

            if (isBottom) {
                header.classList.remove("hide");
            } else if (Math.abs(diff) > tolerance) { // 설정한 감도보다 더 많이 움직였을 때만 실행
                if (currentScrollY > lastScrollY) {
                    // 아래로 스크롤 중
                    header.classList.add("hide");
                    document.querySelectorAll("#gnb_nav ul.depth1 > li.is-open").forEach((openLi) => {
                        openLi.classList.remove("is-open");
                        resetDepth2Slide(getDepth2SlideEl(openLi));
                    });
                    syncHeaderOpenState();
                } else {
                    // 위로 스크롤 중
                    header.classList.remove("hide");
                }
            }

            lastScrollY = currentScrollY;

            // 26.06.12 Add 정다희 : 스크롤 후에도 열린 2depth 패널 좌표 유지
            if (window.innerWidth > 768) updateOpenDepth2Position();
        };

        // 26.06.12 delete 정다희 : depth2 3개씩 묶기 로직 삭제
        /*
        // 2depth 아이템을 3개씩 나누는 함수
        const chunkArray = (array, size) => {
            const result = [];
            for (let i = 0; i < array.length; i += size) {
                result.push(array.slice(i, i + size));
            }
            return result;
        };

        // 2depth가 그룹화된 메뉴 리스트
        const chunkedMenuList = computed(() => {
            return menuList.value.map(item => {
                if (item.children && item.children.length > 0) {
                    return {
                        ...item,
                        // children을 3개씩 묶은 이차원 배열로 변환
                        chunkedChildren: chunkArray(item.children, 3)
                    };
                }
                return item;
            });
        });
        */

        /* mo 전체메뉴 펼침/닫힘 */
        const mo_menuToggle = () => {
            const header = document.getElementById("header");
            const body = document.body;

            if (header.classList.contains('mo_open')) {
                // ✅ 메뉴 닫기
                header.classList.remove('mo_open');

                // 1. 고정 해제 및 저장했던 위치로 복구
                const scrollY = body.style.top;
                body.style.removeProperty('overflow');
                body.style.removeProperty('position');
                body.style.removeProperty('top');
                body.style.removeProperty('width');

                // 2. 원래 스크롤 위치로 이동 (단위 제거 필요)
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            } else {
                // ✅ 메뉴 열기
                // 1. 현재 스크롤 위치 저장
                const currentScrollY = window.scrollY;

                // 2. 바디 고정 (현재 위치에서 멈추게 함)
                body.style.position = 'fixed';
                body.style.top = `-${currentScrollY}px`;
                body.style.width = '100%';
                body.style.overflow = 'hidden';

                header.classList.add('mo_open');
            }
        };

        /* resize */
        const handleResize = () => {
            const width = window.innerWidth;
            const gnbNav = document.getElementById("gnb_nav");
            const quickWrap = document.querySelector(".quick_wrap");

            windowWidth.value = window.innerWidth; //26.06.01 Add 이종환 : 반응형으로 리사이징 isDesktop 체크

            // 중복 방지를 위해 이미 복제된 요소가 있는지 체크
            const clonedQuick = gnbNav?.querySelector(".quick_wrap.is-cloned");

            if (width <= 768) {
                // ✅ 768px 이하: GNB 안에 없으면 복제해서 추가
                if (gnbNav && quickWrap && !clonedQuick) {
                    const clone = quickWrap.cloneNode(true);
                    clone.classList.add("is-cloned"); // 식별을 위한 클래스 추가
                    gnbNav.appendChild(clone);
                }
            } else {
                // ✅ 768px 초과: 복제된 소스가 있으면 삭제
                if (clonedQuick) {
                    clonedQuick.remove();
                }

                // 26.06.15 Edit 정다희 : PC형태로 복귀 시 모바일용 style 잔재 및 펼침 클래스 강제 제거 방어
                document.querySelectorAll("#gnb_nav ul.depth1 > li").forEach(li => {
                    if (!li.contains(document.activeElement)) {
                        li.classList.remove("is-open");
                    }
                });
                resetAllDepth2Slides();
            }

            if (width <= 768) {
                resetAllDepth2Slides();
            }

            // 26.06.12 Add 정다희 : 리사이즈 시 열린 2depth 패널 --menu-left 재계산
            if (width > 768) updateOpenDepth2Position();

            // 26.06.15 Add 정다희 : 리사이즈·PC/모바일 전환 시 add_bg·gnb_dim 동기화
            syncHeaderOpenState();

            // 이전 답변에서 드린 header hide 로직 호출 (필요 시)
            // handleScroll(); 
        };

        /* 퍼블 테스트용 : 파라미터를 이용한 sub page h1, 이전버튼 노출 숨김 처리 */
        const isSubPage = computed(() => {
            return window.location.pathname !== "/";
        });
        /* //퍼블 테스트용 : 파라미터를 이용한 sub page h1, 이전버튼 노출 숨김 처리 */

        onMounted(() => {
            window.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleResize);
            handleResize(); // 초기 로드 시 1회 실행

            // 26.06.12 Add 정다희 : 폰트/레이아웃 로드 후 2depth 좌표 보정
            if (window.innerWidth > 768) {
                setTimeout(updateOpenDepth2Position, 100);
            }

            // ✅ 복제된 요소의 클릭 이벤트를 처리하기 위한 이벤트 위임
            const gnbNav = document.getElementById("gnb_nav");
            if (gnbNav) {
                gnbNav.addEventListener("click", (e) => {
                    // 1. 언어 변경 버튼 (KO/EN) 클릭 시
                    if (e.target.tagName === 'BUTTON' && e.target.closest('.language')) {
                        const langText = e.target.textContent.toLowerCase().trim(); // "ko" 또는 "en"
                        changeLang(langText);
                    }

                    // 2. 퀵메뉴 아코디언 (strong) 클릭 시
                    if (e.target.tagName === 'STRONG' && e.target.closest('.quick')) {
                        // 원본 toggleMenu와 유사한 로직 실행
                        const parent = e.target.parentElement;
                        if (parent.classList.contains("is-open")) {
                            parent.classList.remove("is-open");
                        } else {
                            parent.classList.add("is-open");
                        }
                    }
                });
            }

            /* 26.06.04 Add 이종환 : mo header 상단 비주얼 확인하여 head_black 클래스 추가/제거 */
            const width = window.innerWidth;

            if(width <= 768){
                setTimeout(() => {
                    const header = document.getElementById("header");
                    const visual = document.querySelector(".top_visual");

                    const isVisible =
                        visual &&
                        window.getComputedStyle(visual).display !== "none";

                    isSubPage.value = !isVisible;

                    if(!isVisible){
                        header.classList.add('head_black');
                    }

                    console.log("visual:", visual);
                    console.log("display:", visual ? window.getComputedStyle(visual).display : "not found");
                    console.log("isVisible:", isVisible);
                    console.log("isSubPage:", isSubPage.value);
                }, 100);
                console.log('mo');
            }
            /* //26.06.04 Add 이종환 : mo header 상단 비주얼 확인하여 head_black 클래스 추가/제거 */
        });

        onUnmounted(() => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
            // 26.06.15 Add 정다희 : SPA 전환·컴포넌트 해제 시 body에 남은 .gnb_dim 제거 (modal_dim과 별도 관리)
            document.querySelector(".gnb_dim")?.remove();
        });

        return {
            menuList,
            currentDepth1Key, // 26.06.15 Edit 정다희 : 누락되었던 리턴 스코프 추가 보완
            quickMenu,
            getLink,
            handleMouseEnter,
            handleMouseLeave,
            setFocus,
            removeFocus,

            changeLang, //language change
            currentLang,

            toggleMenu,
            // 26.06.12 delete 정다희 : depth2 3개씩 묶기 로직 삭제
            // chunkedMenuList, // 템플릿에서 사용할 새로운 변수
            mo_menuToggle,
            handleResize,

            isDesktop,

            isSubPage //[퍼블테스트용] 파라미터로 서브 구분
        };
    },
};
</script>