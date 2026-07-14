<template>
    <div class="content">
        <div class="main_visual top_visual">
            <div class="swiper mainSwiper" ref="mainSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in t.mainVisual.items" :key="item.img">
                        <div class="slide" :style="{ backgroundImage: 'url(' + item.img + ')' }">
                            <p class="main_copy">
                                <strong v-html="item.title"></strong>
                                <span>{{ item.sub }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="section_wrap">

            <section v-if="t.sec01" class="sec01">
                <div class="inner">
                    <div>
                        <h2 v-html="t.sec01.title"></h2>
                        <p class="explain" v-html="t.sec01.explain"></p>
                        <ul>
                            <li v-for="item in t.sec01.link" :key="item.txt"><a :href="item.link">{{ item.txt }}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="clip_mask" :style="{ backgroundImage: 'url(' + t.sec01.img + ')' }">
                        <div>
                            <strong>Lifestyle</strong>
                            <em></em>
                            <strong>Platformed.</strong>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="t.sec02" class="sec02">
                <h2 v-html="t.sec02.title"></h2>

                <div class="expWrap">
                    <div class="expTrack">
                        <div class="expSlide" v-for="item in t.sec02.items" :key="item.txt">
                            <div class="card">
                                <span class="thumb">
                                    <em><img :src="item.img" /></em>
                                </span>
                                <div class="txt">
                                    <strong>{{ item.txt }}</strong>
                                    <span>{{ item.sub }}</span>
                                    <p>{{ item.exp }}</p>
                                    <a href="#none">바로가기</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="t.sec03" class="sec03">
                <div class="inner">
                    <h2 v-html="t.sec03.title"></h2>

                    <div class="swiper Swiper" ref="sec03Swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="item in t.sec03.items" :key="item.img">
                                <div class="slide">
                                    <span class="thumb">
                                        <em><img :src="item.img" /></em>
                                    </span>
                                    <div>
                                        <em><img :src="item.sub" /></em>
                                        <p>
                                            <strong>{{ item.brand }}</strong>
                                            <span>{{ item.txt }}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section v-if="t.sec04" class="sec04">
                <h2 v-html="t.sec04.title"></h2>
                <p class="explain" v-html="t.sec04.explain"></p>
                <ul class="quick">
                    <li v-for="item in t.sec04.quick" :key="item.quick">
                        <a :href="item.link">{{ item.txt }}</a>
                    </li>
                </ul>

                <div class="swiper" ref="sec04Swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, i) in t.sec04.items" :key="i">
                            <div class="slide">
                                <span class="thumb">
                                    <em><img :src="item.img" /></em>
                                </span>

                                <div class="txt">
                                    <ul>
                                        <li v-for="(sub, i) in item.item" :key="i">
                                            <em>{{ sub.cate }}</em>
                                        </li>
                                    </ul>

                                    <p v-html="item.title"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Swiper from "swiper";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

export default {
    name: "gsrmain",
    components: {
    },
    props: {
        lang: { type: String }, // ko/en
    },
    data() {
        return {
            /* language contents */
            langData: {
                ko: {
                    mainVisual: {
                        items: [
                            { title: "Every Life.<br/> One Platform.", sub: "GS리테일", img: require("@/assets/images/dummy/main_visual_01.png") },
                            { title: "Every Life.<br/> One Platform.", sub: "GS리테일", img: require("@/assets/images/dummy/main_visual_02.png") },
                            { title: "Every Life.<br/> One Platform.", sub: "GS리테일", img: require("@/assets/images/dummy/main_visual_03.png") }
                        ]
                    },

                    sec01: {
                        title: "GS리테일이<br/> 세상을 마주하는 모습",
                        explain: "온·오프라인을 아우르는 통합 경험을 제공하고<br/> 고객 데이터와 현장을 담아 지속적으로 혁신하며<br/> 변함없는 상품과 서비스 품질을 지킵니다.",
                        link: [
                            { txt: "경영이념 및 가치 체계", link: "#none" },
                            { txt: "기업 연혁", link: "#none" },
                            { txt: "수상 이력", link: "#none" }
                        ],
                        img: require("@/assets/images/dummy/bg_sec01.png")
                    },
                    sec02: {
                        title: "GS리테일이 실천하는<br/> Together Green",
                        items: [
                            { img: require("@/assets/images/dummy/main_sec02_01.png"), txt: "2년", sub: "연속 최우수", exp: "유통 대기업 중 유일하게 2년 연속 동반성장지수 평가 최우수 등급 달성" },
                            { img: require("@/assets/images/dummy/main_sec02_02.png"), txt: "223+", sub: "사회공헌형 매장 운영 (2025)", exp: "내일 스토어·늘봄 스토어·시니어스토어 등 취약계층 자립 지원" },
                            { img: require("@/assets/images/dummy/main_sec02_03.png"), txt: "A+", sub: "KCGS ESG 통합등급 (2025)", exp: "2년 연속, 환경 A+·사회 A+·지배구조 A 805개 기업 중 상위 2.4%의 성과" },
                        ]
                    },
                    sec03: {
                        title: "GS리테일이 만드는<br/> 편리한 일상",
                        items: [
                            { img: require("@/assets/images/dummy/main_sec03_01.png"), sub: require("@/assets/images/dummy/main_sec03_01-1.png"), brand: "GS25", txt: "모든 순간, 일상의 중심" },
                            { img: require("@/assets/images/dummy/main_sec03_01.png"), sub: require("@/assets/images/dummy/main_sec03_01-1.png"), brand: "GS25", txt: "모든 순간, 일상의 중심" },
                            { img: require("@/assets/images/dummy/main_sec03_01.png"), sub: require("@/assets/images/dummy/main_sec03_01-1.png"), brand: "GS25", txt: "모든 순간, 일상의 중심" }
                        ]
                    },
                    sec04: {
                        title: "GS리테일의<br/> 일상 속 생생한 이야기",
                        explain: "뉴스룸의 흥미로운 영상 콘텐츠부터 브랜드별 공식 보도자료까지,<br/> GS리테일이 만들어가는 변화를 가장 먼저 확인하세요.",
                        quick: [
                            { link: "#none", txt: "보도자료" },
                            { link: "#none", txt: "GS리테일 Newsroom" },
                        ],
                        items: [
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: 'GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_01.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: 'GS25, 1300만 유튜버 쯔양과<br/> 공동 개발한 ‘대식가 시리즈’ 론칭'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: 'GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_01.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: 'GS25, 1300만 유튜버 쯔양과<br/> 공동 개발한 ‘대식가 시리즈’ 론칭'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: 'GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_01.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: 'GS25, 1300만 유튜버 쯔양과<br/> 공동 개발한 ‘대식가 시리즈’ 론칭'
                            }
                        ]
                    }
                },
                en: {
                    mainVisual: {
                        title: "Every Life.<br/> One Platform.",
                        sub: "GS Retail",
                        img: require("@/assets/images/dummy/main_visual_01.png"),
                    }
                }
            },
            /* //language contents */
            /* ✅ swiper 인스턴스 관리 */
            swipers: {},
        };
    },
    computed: {
        t() {
            return this.langData[this.lang] || this.langData.ko;
        }
    },
    mounted() {
        /* swiper init */
        this.handleSwiper();
        window.addEventListener('resize', this.handleSwiper);

        /* scroll */
        //this.handleScroll = this.handleScroll.bind(this);
        //window.addEventListener("scroll", this.handleScroll);

        this.initClipAnimation();
        this.initSec02();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleSwiper);
        this.destroyAllSwipers();

        //window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        /* =========================
           ✅ Swiper 관리
        ========================= */

        createSwiper(key, el, options) {
            if (!this.swipers[key] && el) {
                this.swipers[key] = new Swiper(el, options);
            }
        },

        destroySwiper(key) {
            if (this.swipers[key]) {
                this.swipers[key].destroy(true, true);
                delete this.swipers[key];
            }
        },

        destroyAllSwipers() {
            Object.keys(this.swipers).forEach(key => {
                this.destroySwiper(key);
            });
        },

        handleSwiper() {
            const width = window.innerWidth;
            const isMobile = width <= 1024; // 요청하신 조건 (tablet ~ mobile)

            // 기존 공통 스와이퍼 로직
            this.createSwiper('main', this.$refs.mainSwiper, {
                loop: true,
                slidesPerView: 1,
                speed: 800,
            });

            /* --- sec01 Swiper 제어 --- */
            if (isMobile) {
                // 모바일일 때만 Swiper 생성 (만약 sec01에 swiper를 쓰기로 하셨다면)
                this.createSwiper('sec02', this.$refs.sec01Swiper, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                });
            } else {
                // PC일 때는 Swiper 제거
                this.destroySwiper('sec02');
            }

            /* sec03 - 태블릿/모바일 대응 */
            this.createSwiper('sec03', this.$refs.sec03Swiper, {
                loop: false,
                speed: 800,
                breakpoints: {
                    0: { slidesPerView: "auto", spaceBetween: 20 },
                    769: { slidesPerView: 1, spaceBetween: 0 }
                }
            });

            /* sec04 - 768px 초과시에만 Swiper 작동 */
            if (width > 768) {
                this.createSwiper('sec04', this.$refs.sec04Swiper, {
                    loop: true,
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    speed: 800,
                });
            } else {
                this.destroySwiper('sec04'); // 모바일은 세로 리스트
            }
        },

        /* =========================
           기존 기능 유지
        ========================= */

        initSec02() {
            const wrap = this.$el.querySelector(".expWrap");
            const track = this.$el.querySelector(".expTrack");
            const slides = gsap.utils.toArray(".expSlide");

            if (!wrap || !track || slides.length === 0) return;

            const isMobile = window.innerWidth <= 1024;

            // 1. 기존 리소스 해제
            const oldTrigger = ScrollTrigger.getById("sec02_trigger");
            if (oldTrigger) oldTrigger.kill();
            this.destroySwiper('sec02_mobile');

            // 2. 초기화 (clearProps로 GSAP 스타일 제거)
            gsap.set([track, wrap, ...slides], { clearProps: "all" });
            track.classList.remove("swiper-wrapper");
            slides.forEach(slide => slide.classList.remove("swiper-slide", "active", "prev"));

            if (isMobile) {
                track.classList.add("swiper-wrapper");
                slides.forEach(slide => slide.classList.add("swiper-slide"));

                const slideCount = slides.length;
                this.createSwiper('sec02_mobile', wrap, {
                    wrapperClass: 'expTrack',
                    slideClass: 'expSlide',
                    slidesPerView: "auto",
                    spaceBetween: 16,
                    centeredSlides: true, // 루프 계산을 위해 활성화
                    loop:false
                    // loop: slideCount >= 3,
                    // loopedSlides: slideCount,
                    // loopAdditionalSlides: 1,
                });
            } else {
                // PC 로직 유지 (기존 코드와 동일)
                const scrollLength = slides.length * 100;
                slides[0].classList.add("active");

                ScrollTrigger.create({
                    id: "sec02_trigger",
                    trigger: wrap,
                    start: "top top",
                    end: () => `+=${scrollLength}%`,
                    pin: true,
                    scrub: true,
                    onUpdate: (self) => {
                        const index = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
                        slides.forEach((slide, i) => {
                            slide.classList.remove("active", "prev");
                            if (i === index) slide.classList.add("active");
                            if (i === index - 1) slide.classList.add("prev");
                        });
                    }
                });
            }
        },

        /*handleScroll() {
            const header = document.getElementById("header");
            if (!header) return;

            const head_black =
                document.querySelector('.visual').offsetHeight -
                (header.offsetHeight * 0.5);

            if (window.scrollY > head_black) {
                header.classList.add("head_black");
            } else {
                header.classList.remove("head_black");
            }
        },*/

        initClipAnimation() {
            const el = this.$el.querySelector(".clip_mask");
            const innerDiv = el.querySelector("div");
            const isMobile = window.innerWidth <= 1024;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".sec01",
                    // start: "top top", // 섹션이 상단에 닿으면 고정 및 시작
                    start: "top top",
                    end: "+=200%",
                    scrub: true,
                    pin: true,
                }
            });

            if (isMobile) {
                // ✅ 0.2 (약 10~20% 지점) 위치 파라미터를 사용하여 애니메이션 시작을 지연시킵니다.
                // 섹션은 고정되어 있지만, 잠시 멈췄다가 아래에서 위로 올라오는 효과를 줍니다.
                tl.to(el, {
                    bottom: "-20px",        // -20px에서 0으로 붙음
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                    ease: "none",
                    onStart: () => {
                        // 시작 시점에 위치 기준 재설정
                        gsap.set(el, { top: "auto", bottom: "-20px", left: "50%", x: "-50%" });
                    }
                }, 0.2);// 👈 지연 시작 (0은 즉시, 숫자가 클수록 늦게 시작)

                tl.to(innerDiv, {
                    height: "70vh",
                    ease: "none"
                }, 0.2); // 👈 마스크 확장과 동시에 시작
            } else {
                // ✅ PC: 중앙에서 사방으로 확장
                tl.to(el, {
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                    top: "-200px",
                    left: "50%",
                    x: "-50%",
                    ease: "none"
                });
            }

            // 공통: 내부 텍스트(Lifestyle Platformed) 노출
            tl.to(innerDiv, {
                height: "100vh",
                ease: "none"
            }, 0);//"<");
        },

        destroySwiper(key) {
            if (this.swipers[key]) {
                // Swiper 내부적으로 클래스와 이벤트를 제거하도록 설정
                this.swipers[key].destroy(true, true);
                delete this.swipers[key];

                // 추가 조치: DOM에 남은 Swiper 관련 클래스 수동 제거
                const swiperEl = this.$refs[`${key}Swiper`] || this.$el.querySelector(`.${key}`);
                if (swiperEl) {
                    swiperEl.classList.remove('swiper-initialized', 'swiper-horizontal', 'swiper-android', 'swiper-ios');
                }
            }
        }
    }
};
</script>

<style scope>
h2 {
    font-size: 7.2rem;
    font-weight: 700;
    line-height: 124%;
    letter-spacing: -0.02em;
    text-align: center;
}

h2+.explain {
    font-size: 2rem;
    line-height: 150%;
    letter-spacing: -0.02em;
}

.main_visual {
    width: 100%;
    position: sticky;
    top: 0;
    overflow: hidden;
}

.main_visual .slide {
    height: 100vh;
    padding: 60px 120px;
    background-position: 50%;
    background-size: cover;
    display: flex;
    align-items: center;
}

.main_copy strong {
    color: #fff;
    font-size: 8rem;
    line-height: 1.2;
    text-align: center;
}

.main_copy span {
    margin-top: 20px;
    color: #fff;
    font-size: 4rem;
    display: block;
}

.section_wrap {
    background-color: #fff;
    position: relative;
    z-index: 1;
}

section {
    padding: 200px 0;
    position: relative;
}

.sec01 {
    height: 100vh;
    padding: 200px 20px 20px;
    overflow: hidden;
}

.sec01:after {
    width: 100vw;
    height: 100%;
    background-image: url('@/assets/images/main/bg_about.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}

.sec01 .inner {
    width: 100%;
    max-width: 1720px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: flex-end;
}

.sec01 h2 {
    text-align: left;
}

.sec01 .explain {
    margin-top: 80px;
    margin-bottom: 60px;
}

.sec01 ul {
    border-top: 1px solid #000;
}

.sec01 li {
    border-bottom: 1px solid #aaa;
}

.sec01 li a {
    padding: 24px 16px 24px 0;
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.sec01 li a:after {
    width: 16px;
    height: 16px;
    background-color: red;
    content: '';
    display: block;
}

.sec01 .clip_mask {
    width: 32.093023%;
    max-width: 100vw;
    min-height: 338px;
    border-radius: 10px;
    background-position: 50%;
    background-size: cover;
    overflow: hidden;
    position: absolute;
    bottom: 16.728971%;
    left: 0;
}

.sec01 .clip_mask div {
    height: 0;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%);
}

.sec01 .clip_mask strong {
    color: #fff;
    font-size: 8rem;
    line-height: 124%;
    letter-spacing: -0.02em;
    text-align: center;
    display: block;
}

.sec01 .clip_mask em {
    width: 1px;
    background-color: #fff;
    flex: 1;
}

.sec02 {
    padding: 200px 0 0;
    background-image: url('@/assets/images/main/bg_subtain.png');
    background-position: 0 0;
    background-repeat: no-repeat;
    position: relative;
}

.sec02 .expWrap {
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
}

.sec02 .expTrack {
    width: 100%;
    height: 100%;
    max-width: 1720px;
    max-height: 860px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}

.sec02 .expSlide {
    width: 0;
    height: 0;
    pointer-events: none;

    transition: all 0.95s cubic-bezier(0.82, 1, 0.86, 1);
}

.sec02 .expSlide:first-child {
    margin-bottom: auto;
}

.sec02 .expSlide:first-child.active {
    margin-left: 294px;
}

.sec02 .expSlide:last-child {
    margin-top: auto;
}

.sec02 .expSlide:last-child.active {
    margin-right: 242px;
}

.sec02 .expSlide.active {
    width: 100%;
    height: 100vh;

    max-width: 834px;
    max-height: 860px;

    pointer-events: auto;
}

.sec02 .expSlide.active+.expSlide {
    margin-left: 52px;
}

.sec02 .expSlide .card {
    width: 100%;
    height: 100%;
    border-radius: 10px;
}

.sec02 .expSlide.active+.expSlide {
    width: 242px;
    height: 242px;
}

.sec02 .expSlide.prev {
    width: 242px;
    height: 242px;
    margin-right: 52px;
    margin-bottom: auto;
}

.sec02 .expSlide.active .txt {
    opacity: 1;
    visibility: visible;
    position: absolute;
    bottom: 329px;
    right: 0;
    left: calc(50% + 467px);
    display: flex;
    flex-direction: column;
}

.sec02 .expSlide .txt {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.6s 1s;
}

.sec02 .expSlide .txt * {
    color: #242428;
}

.sec02 .expSlide .txt strong {
    font-size: 7.2rem;
    letter-spacing: -0.02em;
    line-height: 124%;
}

.sec02 .expSlide .txt span {
    font-size: 2.4rem;
    letter-spacing: -0.01em;
    line-height: 150%;
}

.sec02 .expSlide .txt p {
    margin-top: 24px;
    color: #67676F;
    font-size: 2rem;
    letter-spacing: -0.01em;
    line-height: 135%;
}

.sec02 .expSlide .txt a {
    width: 56px;
    height: 56px;
    margin-top: 40px;
    font-size: 0;
    background-color: #F2F2F4;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sec02 .expSlide .txt a:before {
    width: 24px;
    height: 24px;
    background-color: red;
    content: '';
    display: block;
}

/* 썸네일 */
.sec02 .expSlide .thumb {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 16px;
    display: block;

    transition: all 0.7s ease;
}

.sec02 .expSlide.active .thumb {
    border-radius: 12px;
}

.sec02 .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.sec03 .inner {
    max-width: 1720px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
}

.sec03 h2 {
    text-align: left;
    position: absolute;
    right: 20px;
    left: 67.142856%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.sec03 .swiper {
    width: 100%;
    max-width: 1680px;
    margin: 0 auto;
}

.sec03 .slide {
    position: relative;
    display: flex;
    align-items: flex-end;
}

.sec03 .slide .thumb {
    width: 58.035714%;
    margin-right: 9.107142%;
}

.sec03 .slide div {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 40px;
}

.sec03 .slide div em img {
    display: block;
}

.sec03 .slide p {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.sec03 .slide p strong {
    color: #000;
    font-size: 4rem;
    letter-spacing: -0.01em;
    line-height: 130%;
}

.sec03 .slide p span {
    color: #67676F;
    font-size: 2.4rem;
    letter-spacing: -0.01em;
    line-height: 150%;
}

.sec04:after {
    width: 100vw;
    height: 200vh;
    background-image: url('@/assets/images/main/bg_news.png');
    background-position: 100% 100%;
    background-repeat: no-repeat;
    content: '';
    position: absolute;
    bottom: 30%;
    right: 0;
    z-index: -1;
}

.sec04 .explain {
    margin-top: 24px;
    font-size: 2rem;
    letter-spacing: -0.01em;
    line-height: 135%;
    text-align: center;
}

.sec04 .quick {
    display: flex;
    justify-content: center;
    gap: 12px;
}

.sec04 .quick a {
    padding: 20px 24px;
    color: #000;
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    line-height: 135%;
    display: flex;
    align-items: center;
    gap: 12px;
}

.sec04 .quick a:after {
    width: 16px;
    height: 24px;
    background-color: red;
    content: '';
    display: block;
}

.sec04 .swiper {
    margin-top: 80px;
}

.sec04 .swiper-slide {
    width: 552px;
}

.sec04 .slide {
    position: relative;
}

.sec04 .slide .txt {
    padding: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
}

.sec04 .slide .txt * {
    color: #fff;
}

.sec04 .slide .txt ul {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
}

.sec04 .slide .txt li em {
    padding: 1px 11px;
    font-size: 1.6rem;
    letter-spacing: -0.01em;
    line-height: 150%;
    border: 1px solid #fff;
    border-radius: 100px;
    display: block;
}

.sec04 .slide .txt p {
    font-size: 2.4rem;
    letter-spacing: -0.01em;
    line-height: 150%;
}

/* --- [Tablet: 769px ~ 1024px] --- */
@media screen and (max-width: 1024px) {
    h2 {
        font-size: 5.2rem;
    }

    .sec01 {
        position: relative;
        height: 100vh;
        /* 핀 효과를 위해 높이 고정[cite: 1] */
        padding-top: 100px;
        overflow: hidden;
    }

    .sec01 .inner {
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 0;
    }

    .sec01 ul {
        background-color: #fff;
    }

    .sec01 .clip_mask {
        /* 초기 위치를 하단 끝에 배치[cite: 1] */
        position: absolute;
        bottom: -20px;
        top: auto;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        height: 0;
        /* 초기 박스 높이[cite: 1] */
        min-height: 0;
        margin: 0;
        z-index: 10;
        display: block;
        /* relative 해제 확인 */
    }

    .sec01 .inner>div:first-child {
        width: 100%;
        text-align: center;
        flex: 1;

        display: flex;
        flex-direction: column;
        align-items: center;
        /*margin-bottom: 50px;*/
        /* 텍스트와 마스크 사이 간격 */
    }

    .sec01 h2 {
        text-align: center;
    }

    .sec01 .explain {
        margin-top: 30px;
        flex: 1;
    }

    .sec01 ul {
        display: inline-block;
        width: 100%;
    }

    /* 마스크를 하단으로 이동 */
    .sec01 .clip_mask {
        width: 90%;
        /* 화면 양옆 여백 */
        bottom: 0;
        left: auto;
        margin: 60px auto 0;
        transform: none;
    }

    .sec01 .clip_mask strong {
        font-size: 5.6rem;
        /* 모바일 대응 폰트 크기 축소 */
    }

    .sec02 {
        height: auto !important;
        padding: 100px 0 !important;
    }

    .sec02 .expWrap {
        height: auto !important;
        padding-top: 40px !important;
        overflow: hidden;
        /* 슬라이더 영역 제한 */
    }

    /* ✅ 가로 슬라이드 트랙 설정 */
    .sec02 .expTrack {
        display: flex !important;
        flex-direction: row !important;
        align-items: stretch !important;
        justify-content: flex-start !important;
        width: 100%;
        max-height: none !important;
    }

    /* ✅ GSAP 애니메이션 값 강제 초기화 */
    .sec02 .expSlide {
        width: 33.3333%;
        height: auto !important;
        margin-top: 0 !important;
        opacity: 1 !important;
        pointer-events: auto !important;
        flex-shrink: 0;
        /* PC용 margin-left 제거 */
        transform: none !important;
        transition: unset;
    }

    .sec02 .expSlide .card {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .sec02 .expSlide .thumb {
        width: auto;
        height: auto;
        padding-top: 100%;
        border-radius: 12px;
        display: flex;
        align-items: flex-end;
    }

    .sec02 .expSlide .thumb em {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }

    .sec02 .expSlide .thumb img {
        height: 60%;
        border-radius: 12px;

        transition: all 0.25s;
    }

    /* ✅ 텍스트 영역 가시성 확보 */
    .sec02 .expSlide .txt {
        opacity: 1 !important;
        visibility: visible !important;
        position: relative !important;
        inset: auto !important;
        margin-top: 20px;
        text-align: left;
        display: none;
    }

    .sec02 .expSlide.swiper-slide-active .thumb img {
        width: 100%;
        height: 100%;
    }

    .sec02 .expSlide.swiper-slide-active .txt {
        display: flex;
        flex-direction: column;
    }

    .sec03 h2 {
        position: relative;
        left: 0;
        width: 100%;
        margin-bottom: 40px;
    }

    .sec03 .slide .thumb {
        width: 50%;
    }
}

/* --- [Mobile: 768px 이하] --- */
@media screen and (max-width: 768px) {
    #container {
        padding-top:0;
        padding-bottom:0;
    }

    h2 {
        font-size: 3.2rem;
        text-align: center;
        word-break: keep-all;
    }

    h2+.explain {
        font-size: 1.6rem;
        text-align: center;
        padding: 0 20px;
    }

    /* 메인 비주얼 */
    .main_visual .slide {
        padding: 40px 20px;
        height: 100vh;
    }

    .main_copy strong {
        font-size: 4.8rem;
    }

    .main_copy span {
        font-size: 2.4rem;
    }

    /* Section 01 */
    .sec01 {
        padding: 80px 20px 20px;
    }

    .sec01:after {
        background-size: 100% auto;
        transform: rotate(90deg);
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
    }

    .sec01 h2 {
        text-align: center;
    }

    .sec01 .clip_mask strong {
        font-size: 3.8rem;
    }

    .sec02 {
        background-size: 60vw;
    }

    .sec02 .expTrack {
        width: 100% !important;
        display: flex !important;
    }

    .sec02 .expSlide {
        width: 286px !important;
        transform: scale(0.9); /* 미리 작게 설정 */
        opacity: 0.7;          /* 미리 투명하게 설정 */
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .sec02 .expSlide.swiper-slide-active {
        transform: scale(1);    /* 원래 크기로 */
        opacity: 1;             /* 불투명하게 */
    }

    .sec02 .expSlide .thumb {
        height: 286px;
    }

    .sec02 .expSlide .txt {
        margin-top: 36px;
    }

    .sec02 .expSlide .txt strong {
        font-size: 4rem;
        line-height: 130%;
    }

    .sec02 .expSlide .txt span {
        font-size: 2rem;
        line-height: 130%;
    }

    .sec02 .expSlide .txt p {
        margin-top: 10px;
        font-size: 1.4rem;
        line-height: 140%;
    }

    .sec02 .expSlide .txt a {
        width: 50px;
        height: 50px;
        margin-top: 20px;
    }

    .sec03 {
        padding-top: 50px;
        padding-bottom: 100px;
    }

    .sec03 .swiper {
        width: auto;
        margin: 0 -20px 0 -40px;
        padding-right: 40px;
    }

    .sec03 .slide {
        align-items: flex-start;
        flex-direction: column;
    }

    .sec03 .slide .thumb {
        width: 100%;
    }

    .sec03 .slide div {
        margin-top: 36px;
        padding-left: 40px;
        gap: 20px;
    }

    .sec03 .slide p strong {
        font-size: 2.4rem;
    }

    .sec03 .slide p span {
        font-size: 1.4rem;
    }

    /* Section 04 (세로 리스트화) */
    .sec04 {
        padding-top: 50px;
        padding-right: 20px;
        padding-bottom: 150px;
        padding-left: 20px;
    }

    .sec04:after {
        width: 60vw;
        height: 100vw;
        background-size: contain;
        bottom: 95%;
    }

    .sec04 .explain {
        font-size: 1.4rem;
        line-height: 140%;
    }

    .sec04 .quick {
        margin-top: 22px;
    }

    .sec04 .quick a {
        padding: 26px 10px;
        font-size: 1.6rem;
    }

    .sec04 .swiper {
        margin-top: 60px;
    }

    .sec04 .swiper-wrapper {
        display: flex;
        flex-direction: column;
        gap: 28px;
    }

    .sec04 .swiper-slide {
        width: 100% !important;
    }

    .sec04 .slide .txt {
        position: relative;
        padding: 20px 0;
        background: none;
    }

    .sec04 .slide .txt * {
        color: #222;
    }

    .sec04 .slide .txt p {
        font-size: 2rem;
        line-height: 135%;
    }

    .sec04 .slide .txt li em {
        border-color: #222;
    }
}
</style>