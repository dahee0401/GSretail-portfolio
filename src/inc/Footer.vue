<template>
    <footer ref="footerEl">
        <div class="inner">
            <nav>
                <dl v-for="item in menuList" :key="item.title">
                    <dt><a :href="item.path">{{ item.title }}</a></dt>
                    <dd>
                        <ul v-for="(group, i) in chunk(item.children || [])" :key="i">
                            <li v-for="s_item in group" :key="s_item.title">
                                <a :href="s_item.path">{{ s_item.title }}</a>
                            </li>
                        </ul>
                    </dd>
                </dl>

                <!-- 26.06.30 Add 이종환 : 사이트맵 숨김 버튼 -->
                <button class="sitemapCloser" :aria-label="t.sitemapCloseTxt" @click="closeSitemap()">Close</button>
                <!-- //26.06.30 Add 이종환 : 사이트맵 숨김 버튼 -->
            </nav>

            <div class="quick" v-if="t.quick" ref="quickWrap">
                <ul ref="quickList" :style="quickStyle">
                    <li v-for="item in t.quick" :key="item.title" :class="item.class"><!-- 26.06.30 Edit 이종환 : mo에서 사이트맵 숨김 -->
                        <button v-if="item.pop" @click="openModal" 
                            :data-popid="item.popId" 
                            :data-type="item.popType" 
                            :data-cont="item.path">{{ item.title }}</button>
                        <a v-else :href="item.path" :target="item.blank ? '_blank' : '_self'" @click="e => e.currentTarget.parentElement.classList.contains('sitemap') && openSitemap()">{{ item.title }}</a>
                    </li>
                </ul>
            </div>

            <!-- 26.06.30 Add 이종환 -->
            <div class="cs_info" v-if="t.cscenter"><!-- 26.07.09 Edit 이종환 : 영문관련 조건 추가 -->
                <strong class="tit">{{ t.cscenter.title }}</strong>
                <div>
                    <dl v-for="item in t.cscenter.info" :key="item.brand">
                        <dt>{{ item.brand }}</dt>
                        <dd>{{ item.tel }}</dd>
                    </dl>
                </div>
            </div>
            <!-- //26.06.30 Add 이종환 -->             

            <div class="info">
                <div>
                    <strong>{{ t.info.logo }}</strong>
                    <span>{{ t.info.address }}</span>
                    <span>{{ t.info.ceo }}</span>
                    <span>{{ t.info.brn }}</span>
                </div>
                <p>{{ t.info.copyright }}</p>
            </div>

            <button class="go_top" :class="{ hide: isTop, isStatic: isFooterVisible }" @click="scrollTop">Go to top</button>

            <div class="family_site_wrap">
                <button class="family_site_btn" @click="toggleFamilySite">
                    FAMILY SITE
                </button>
                <ul class="family_site_list" v-if="isFamilyOpen">
                    <li v-for="option in t.familyOptions" :key="option.value" @click="navigateToLink(option.value)" :class="option.class">
                        {{ option.label }}
                    </li>
                </ul>
            </div>
        </div>

        <!-- 26.06.02 Add 이종환 : sky quick 공통처리 및 수정 -->
        <div class="sky_quick sub" :class="{ istop: isTop, isStatic: isFooterVisible , active: isActive}"><!-- 26.07.01 Edit 이종환 : 메인페이지가 아닌 경우 "sub"클래스 추가 -->
            <ul class="quick_menu">
                <li v-for="item in t.skybanner" :key="item"><a :href="item.link">{{ item.txt }}</a></li>
                <!-- <li><button type="button">입점상담</button></li>
                <li><button type="button">고객센터</button></li> -->
            </ul>
            <button class="btn_toggle" @click="isActive = !isActive"></button>
        </div>
        <!-- //26.06.02 Add 이종환 : sky quick 공통처리 및 수정 -->
    </footer>

    <!-- 입지제안 팝업 -->
    <div id="gsrbr0204" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
    <!-- //입지제안 팝업 -->

    <!-- 26.06.09 Add 이종환 : 멤버십 팝업 -->
    <div id="gsrcu0101" class="modal_wrap">
        <div class="modal_container"></div>
    </div>
    <!-- //26.06.09 Add 이종환 : 멤버십 팝업 -->
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue";
import menuEn from "@/assets/language/menu/menu.en.json";
import menuKo from "@/assets/language/menu/menu.ko.json";

import modal from "@/assets/js/modal";
import SelectBox from "@/components/SelectBox.vue";

// =====================
// props
// =====================
const props = defineProps({
    lang: { type: String, default: "ko" }
});

// =====================
// refs
// =====================
const footerEl = ref(null);
const quickWrap = ref(null);
const quickList = ref(null);
const familySiteRef = ref("");
const isFamilyOpen = ref(false); // 26.06.25 Add 이소라

const showQuickMenu = ref(true); //26.06.01 Add 이종환 : 
const isActive = ref(false); //26.06.02 Add 이종환 : 

// =====================
// state
// =====================
const isFooterVisible = ref(false);
const isTop = ref(true);

const quickX = ref(0);
const isQuickSlide = ref(false);

const observer = ref(null);

// =====================
// language data
// =====================
const langData = {
    ko: {
        quick: [ //메뉴 수정 26.06.19 Edit 이종환
            { title: "개인정보처리방침", path: "#none" },
            // { title: "채용안내", path: "https://gsretail.recruiter.co.kr/career/home", blank: true },
            // { title: "입점상담", path: "gsrse01" },
            // { title: "멤버십/홈페이지문의", path: "gsrcu0101", pop:true, popId:"gsrcu0101", popType:'lg' }, //, type: "popup", popId: "gsrcu0101", cont: "gsrcu0101"
            // { title: "입지제안", path: "gsrbr0204", pop:true, popId:"gsrbr0204", popType:'lg' },
            // { title: "임대상가안내", path: "gsrbr1101" },
            // { title: "고객센터", path: "gsrcu01" },
            { title: "GS SHOP 시청자 관련", path: "gsrcm0401" },
            { title: "정도경영제보", path: "gsrsu040101" },
            { title: "공지사항", path: "gsrnotice" },
            { title: "사이트맵", path: "#none", class:'sitemap' } //26.06.30 Add 이종환
        ],
        info: {
            logo: "(주)GS리테일",
            address: "서울시 강남구 논현로 508(역삼동 679번지 GS강남타워)",
            ceo: "대표이사 허서홍",
            brn: "사업자등록번호 116-81-18746",
            copyright: "Copyright ⓒGS Retail. All rights reserved."
        },
        familyOptions: [
            { value: '', label: 'GS SHOP' }, 
            { value: '', label: '밀박스25' }, 
            { value: '', label: 'GS25 베트남' }, 
            { value: '', label: 'GS25 몽골' }, 
            { class: 'fs_line' }, 
            { value: '', label: 'GS네트웍스' }, 
            { value: '', label: 'GS넷비전' }, 
            { value: '', label: 'GS텔레서비스' }, 
            { class: 'fs_line' }, 
            { value: '', label: '(주)GS' }, 
            { value: '', label: 'GS에너지' }, 
            { value: '', label: 'GS칼텍스' }, 
            { value: '', label: 'GS EPS' }, 
            { value: '', label: 'GS E&R' }, 
            { value: '', label: 'GS P&L' }, 
            { value: '', label: 'GS스포츠' }, 
            { value: '', label: 'GS건설' }, 
            { value: '', label: 'GS글로벌' }
        ],
        skybanner: [ // 26.06.19 Edit 이종환 : 문구수정
            { txt:'점포 창업 안내', link:"gsrst_smain" },
            { txt:'상품 입점 상담', link:"gsrse01" },
            { txt:'고객센터', link:"gsrcu01" }
        ],
        // 26.06.30 Add 이종환
        cscenter: {
            title: "※ 고객센터 대표전화",
            info: [
                {brand:"GS25", tel:"080-999-5425"},
                {brand:"GS SHOP", tel:"080-414-4545"},
                {brand:"GS THE FRESH", tel:"080-345-7700"}
            ]
        },
        sitemapCloseTxt:'사이트맵 닫기'
    },
    en: {
        quick: [
            { title: "Privacy Policy", path: "#none" },
            { title: "Store Franchise", path: "#none" },
            { title: "Partnership", path: "#none" },
            { title: "Customer Center", path: "#none" },
            { title: "Sitemap", path: "#none", class:'sitemap' }
        ],
        info: {
            logo: "GS Retail",
            address: "Seoul, Korea",
            ceo: "CEO Heo Seo-hong",
            brn: "116-81-18746",
            copyright: "Copyright ⓒ GS Retail"
        }
    }
};

// =====================
// computed
// =====================
const t = computed(() => langData[props.lang] || langData.ko);

const menuList = computed(() =>
    props.lang === "en" ? menuEn : menuKo
);

const quickStyle = computed(() => ({
    transform: `translateX(${quickX.value}px)`
}));

// =====================
// chunk (FIX: 에러 해결 핵심)
// =====================
const chunk = (arr = [], size = 6) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
};

// =====================
// scroll
// =====================
const handleScroll = () => {
    isTop.value = window.scrollY < 50;

    if(window.innerWidth > 768){
        isTop.value = window.scrollY < 50;
    }
};

const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// =====================
// quick slide
// =====================
const checkQuickSlide = () => {
    isQuickSlide.value = window.innerWidth <= 1024;
};

const initQuickSlide = () => {
    const wrap = quickWrap.value;
    const list = quickList.value;

    if (!wrap || !list) return;

    let startX = 0;
    let baseX = 0;

    const getLimit = () => wrap.offsetWidth - list.scrollWidth;

    // touch
    const onTouchStart = (e) => {
        startX = e.touches[0].clientX;
        baseX = quickX.value;
    };

    const onTouchMove = (e) => {
        if (!isQuickSlide.value) return;

        const delta = e.touches[0].clientX - startX;
        let next = baseX + delta;

        const minX = getLimit();
        quickX.value = Math.min(0, Math.max(minX, next));
    };

    // mouse
    let dragging = false;
    let mx = 0;
    let bx = 0;

    const onMouseDown = (e) => {
        if (!isQuickSlide.value) return;

        dragging = true;
        mx = e.clientX;
        bx = quickX.value;
    };

    const onMouseMove = (e) => {
        if (!dragging || !isQuickSlide.value) return;

        const delta = e.clientX - mx;
        let next = bx + delta;

        const minX = getLimit();
        quickX.value = Math.min(0, Math.max(minX, next));
    };

    const onMouseUp = () => {
        dragging = false;
    };

    list.addEventListener("touchstart", onTouchStart, { passive: true });
    list.addEventListener("touchmove", onTouchMove, { passive: true });

    list.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
};

// =====================
// family site
// =====================
const toggleFamilySite = () => {
    isFamilyOpen.value = !isFamilyOpen.value;
};

const navigateToLink = (value) => {
    if (value) {
        window.open(value, '_blank');
        isFamilyOpen.value = false;
        nextTick(() => {
            familySiteRef.value = "";
        });
    }
};

// 외부 클릭 시 드롭다운 닫기
const handleOutsideClick = (e) => {
    if (!e.target.closest('.family_site_wrap')) {
        isFamilyOpen.value = false;
    }
};

/* modal */
const openModal=event => {
    const el = event.currentTarget;
    const popId = el.dataset.popid;
    const type = el.dataset.type || "default";
    const cont = el.dataset.cont;
    modal.open(popId, type, el, cont);
}

//26.06.30 Add 이종환 : 사이트맵 클릭 시 푸터 메뉴 오픈
const openSitemap = () => {
    footerEl.value?.classList.add("open");
    
    nextTick(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });
    });
};

const closeSitemap = () => {
    footerEl.value?.classList.remove("open");
};

// =====================
// lifecycle
// =====================
onMounted(() => {
    observer.value = new IntersectionObserver(([entry]) => {
        isFooterVisible.value = entry.isIntersecting;
    }, { threshold: 0.1 });

    nextTick(() => {
        if (footerEl.value) {
            observer.value.observe(footerEl.value);
        }

        checkQuickSlide();
        initQuickSlide();
    });

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkQuickSlide);
    document.addEventListener("click", handleOutsideClick); // 추가: 외부 클릭 감지
});

onBeforeUnmount(() => {
    observer.value?.disconnect();
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", checkQuickSlide);
    document.removeEventListener("click", handleOutsideClick); // 추가: 이벤트 제거
});
</script>

<style>
</style>
