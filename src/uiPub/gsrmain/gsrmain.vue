<template>
    <div class="content">
        <div class="main_visual top_visual">
            <div class="swiper mainSwiper" ref="mainSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in t.mainVisual.items" :key="item.img">
                        <div class="slide">
                            <div class="video_wrap">
                                <video autoplay muted playsinline loop ref="heroVideo"> 
                                    <source :src="item.vod" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="hero_message" ref="heroMessageRef" v-if="t.heroMessage">
            <div class="inner">
                <a :href="t.heroMessage.link"><span class="blind">{{ t.newWindow }}</span></a>
                <p v-html="t.heroMessage.title"></p>
                <ul>
                    <li v-for="(item, index) in t.heroMessage.items" :key="index">
                        <dl>
                            <dt>{{ item.dt }}</dt>
                            <dd>
                                <strong class="num_count">
                                    <span class="num_motion_wrap"><span class="num_motion">{{ item.num }}</span></span>
                                    <span class="num_unit_wrap"><span class="num_unit">{{ item.unit }}</span></span>
                                </strong>
                                <span class="num_desc" v-html="item.desc"></span>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
        <div class="section_wrap">
            <section v-if="t.sec03" class="sec03">
                <div class="inner">
                    <h2 v-html="t.sec03.title"></h2>

                    <div class="swiper Swiper" ref="sec03Swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in t.sec03.items" :key="item.img">
                                <a :href="item.link" class="slide" :class="item.class" @mouseenter="hoverIndex = index">
                                    <strong class="cate">{{ item.cate }}</strong>
                                    
                                    <span class="thumb">
                                        <em><img :src="item.img" :alt="item.brand" /></em>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="hover_layer" :class="{ active: hoverIndex !== null }" @mouseleave="hoverIndex = null">
                        <ul>
                            <li
                                v-for="(item, index) in t.sec03.items"
                                :key="index" @mouseenter="hoverIndex = index" :class="item.class" :style="hoverIndex !== null ? { backgroundImage: `url(${require('@/assets/images/main/img_hover_layer_' + t.sec03.items[hoverIndex].class + '_' + (index + 1) + '.png')})` } : {}">
                                <a :href="item.link" v-if="hoverIndex === index">
                                    <p>
                                        <strong>
                                            <img
                                                :src="item.sub"
                                                :alt="item.brand + t.logoSuffix"
                                            />
                                        </strong>
                                        <span v-html="item.txt"></span>
                                    </p>
                                </a>
                            </li>
                        </ul>                     
                    </div>
                </div>
            </section>

            <section v-if="t.sec04" class="sec04">
                <h2 v-html="t.sec04.title"></h2>
                <ul class="quick">
                    <li v-for="item in t.sec04.quick" :key="item.quick">
                        <a :href="item.link">{{ item.txt }}</a>
                    </li>
                </ul>

                <div class="swiper" ref="sec04Swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, i) in sec04SwiperItems" :key="i">
                            <a :href="item.link" class="slide">
                                <span class="thumb">
                                    <em><img :src="item.img" :alt="item.title.replace(/<[^>]*>/g, '')" /></em>
                                </span>

                                <div class="txt">
                                    <ul>
                                        <li v-for="(sub, i) in item.item" :key="i">
                                            <em>{{ sub.cate }}</em>
                                        </li>
                                    </ul>

                                    <p v-html="item.title"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    </div>
</template>

```vue
<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Swiper from "swiper";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

export default {
    name: "gsrmain",

    props: {
        lang: { type: String },
    },

    data() {
        return {
            /* swiper 인스턴스 */
            swipers: {},

            gsapCtx: null,
            numMotionPlayed: false,
            numMotionScrollTrigger: null,

            isDesktopView: typeof window !== "undefined" ? window.innerWidth > 768 : true,

            /* language contents */
            langData: {
                ko: {
                    newWindow: "새창 열기",
                    logoSuffix: " 로고",
                    mainVisual: {
                        items: [
                            {
                                title: "Every Life.<br/> One Platform.",
                                sub: "GS리테일",
                                img: require("@/assets/images/dummy/main_visual_01.png"),
                                vod: require("@/assets/images/main/vod_visual_01.mp4")

                            },
                        ]
                    },

                    heroMessage: {
                        title: '고객의 모든 경험을 <span class="txt_orange">연결</span>하고, <br />데이터로 <span class="txt_green">공감</span>하며,<br />상품과 서비스로 <span class="txt_blue">신뢰</span>받는 플랫폼',
                        items: [
                            {
                                dt: "전국 오프라인 점포 수",
                                num: "18,600+",
                                unit: "점",
                                desc: "(2025. 12기준)", 
                            },
                            {
                                dt: "GS ALL 멤버십 가입자 수",
                                num: "2,344+",
                                unit: "만명",
                                desc: "(2026. 1분기) 기준", 
                            },
                            {
                                dt: "고객 만족도&서비스 품질",
                                num: "1",
                                unit: "위",
                                desc: "2025 한국산업의 고객 만족도 (편의점, 수퍼)<br />2025 한국서비스 품질지수 (편의점, 수퍼, 홈쇼핑)",
                            },
                        ],
                        link: "/gsrab02", 
                    },

                    sec03: {
                        title: "GS리테일의 사업을 소개합니다.",

                        items: [
                            {
                                img: require("@/assets/images/main/main_sec03_01.png"),
                                sub: require("@/assets/images/main/main_sec03_01-1.png"),
                                brand: "GS25",
                                txt: "일상생활의 중심,<br/> 하루의 시작",
                                cate: "편의점",
                                class: "gs25",
                                link: "/gsrbr010101"
                            },
                            {
                                img: require("@/assets/images/main/main_sec03_02.png"),
                                sub: require("@/assets/images/main/main_sec03_02-1.png"),
                                brand: "GS THE FRESH",
                                txt: "신선한 행복을<br/> 채우다",
                                cate: "수퍼",
                                class: "fresh",
                                link: "/gsrbr020101"
                            },
                            {
                                img: require("@/assets/images/main/main_sec03_03.png"),
                                sub: require("@/assets/images/main/main_sec03_03-1.png"),
                                brand: "GS SHOP",
                                txt: "고객의 라이프스타일을<br/> 가치 있게",
                                cate: "홈쇼핑",
                                class: "shopping",
                                link: "/gsrbr0301"
                            },
                        ]
                    },

                    sec04: {
                        title: "GS리테일의 소식을 전합니다.",

                        quick: [
                            { link: "/gsrne01", txt: "보도자료" },
                            { link: "/gsrne02", txt: "뉴스룸" },
                        ],

                        items: [
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: '02GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"',
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: '02GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"',
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: '03GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"',
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: '04GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"',
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: '05GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"',
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: '06GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"',
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "보도자료" }
                                ],
                                title: '07GS리테일, 상반기 공개채용 돌입…<br/> "청년 채용 물꼬 튼다!"',
                                link:'/gsrne0101'
                            },
                        ]
                    }
                },
                en: {
                    newWindow: "Open in new window"/* 260708 번역 */,
                    logoSuffix: " Logo"/* 260708 번역 */,
                    mainVisual: {
                        items: [
                            {
                                title: "Every Life.<br/> One Platform.",
                                sub: "GS Retail",
                                img: require("@/assets/images/dummy/main_visual_01.png"),
                                vod: require("@/assets/images/main/vod_visual_01.mp4")

                            },
                        ]
                    },

                    heroMessage: {
                        title: 'A platform that <span class="txt_orange">connects</span> every customer experience, <br /><span class="txt_green">empathizes</span> through data, <br />and earns <span class="txt_blue">trust</span> through its products and services'/* 260708 번역 */,
                        items: [
                            {
                                dt: "Offline stores nationwide"/* 260708 번역 */,
                                num: "18,600+",
                                unit: "stores"/* 260708 번역 */,
                                desc: "(As of Dec. 2025)"/* 260708 번역 */,
                            },
                            {
                                dt: "GS ALL Membership members"/* 260708 번역 */,
                                num: "23.44M+",
                                unit: "members"/* 260708 번역 */,
                                desc: "(As of Q1 2026)"/* 260708 번역 */,
                            },
                            {
                                dt: "Customer satisfaction & service quality"/* 260708 번역 */,
                                num: "1",
                                unit: "st"/* 260708 번역 */,
                                desc: "2025 Korea Customer Satisfaction Index (convenience stores, supermarkets)<br />2025 Korea Service Quality Index (convenience stores, supermarkets, home shopping)"/* 260708 번역 */,
                            },
                        ],
                        link: "/gsrab02",
                    },

                    sec03: {
                        title: "GS Retail's<br/> Introducing our businesses."/* 260604 번역 */,

                        items: [
                            {
                                img: require("@/assets/images/main/main_sec03_01.png"),
                                sub: require("@/assets/images/main/main_sec03_01-1.png"),
                                brand: "GS25",
                                txt: "The center of daily life, the start of the day",/* 260604 번역 */
                                class: "gs25",
                            },
                            {
                                img: require("@/assets/images/main/main_sec03_02.png"),
                                sub: require("@/assets/images/main/main_sec03_02-1.png"),
                                brand: "GS THE FRESH",
                                txt: "Meet Fresh Happiness",/* 260604 번역 */
                                class: "fresh",
                            },
                            {
                                img: require("@/assets/images/main/main_sec03_03.png"),
                                sub: require("@/assets/images/main/main_sec03_03-1.png"),
                                brand: "GS SHOP",
                                txt: "Adding value to customers' lifestyles",/* 260604 번역 */
                                class: "shopping",
                            },
                        ]
                    },

                    sec04: {
                        title: "GS Retail's<br/> Sharing our news."/* 260604 번역 */,

                        quick: [
                            { link: "#none", txt: "Press Releases" },
                            { link: "#none", txt: "GS Retail Newsroom" },
                        ],

                        items: [
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "Press Releases" }
                                ],
                                title: '01 GS Retail Launches First-Half Open Recruitment…<br/> "Paving the Way for Youth Employment!"'/* 260604 번역 */,
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "Press Releases" }
                                ],
                                title: '02 GS Retail Launches First-Half Open Recruitment…<br/> "Paving the Way for Youth Employment!"'/* 260604 번역 */,
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "Press Releases" }
                                ],
                                title: '03 GS Retail Launches First-Half Open Recruitment…<br/> "Paving the Way for Youth Employment!"'/* 260604 번역 */,
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "Press Releases" }
                                ],
                                title: '04 GS Retail Launches First-Half Open Recruitment…<br/> "Paving the Way for Youth Employment!"'/* 260604 번역 */,
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "Press Releases" }
                                ],
                                title: '05 GS Retail Launches First-Half Open Recruitment…<br/> "Paving the Way for Youth Employment!"'/* 260604 번역 */,
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "Press Releases" }
                                ],
                                title: '06 GS Retail Launches First-Half Open Recruitment…<br/> "Paving the Way for Youth Employment!"'/* 260604 번역 */,
                                link:'/gsrne0101'
                            },
                            {
                                img: require("@/assets/images/dummy/main_news_00.png"),
                                item: [
                                    { cate: "GS25" },
                                    { cate: "Press Releases" }
                                ],
                                title: '07 GS Retail Launches First-Half Open Recruitment…<br/> "Paving the Way for Youth Employment!"'/* 260604 번역 */,
                                link:'/gsrne0101'
                            },
                        ]
                    }
                }
            },

            hoverIndex: null,
            userScrolling: false
        };
    },

    computed: {
        t() {
            return this.langData[this.lang] || this.langData.ko;
        },
        sec04SwiperItems() {
            const items = this.t?.sec04?.items ?? [];

            if (!items.length) return [];

            return this.isDesktopView ? items.concat(items) : items;
        },
    },

    mounted() {
        this.$nextTick(() => {
            this.handleSwiper();
            this.initNumMotion();
        });

        window.addEventListener(
            "resize",
            this.handleSwiper
        );

        let scrollTimeout = null;

        window.addEventListener("scroll", () => {
            this.userScrolling = true;

            clearTimeout(scrollTimeout);

            scrollTimeout = setTimeout(() => {
                this.userScrolling = false;
            }, 150);
        });

        this.$nextTick(() => {
            this.initVideoScrollDelay();
        });
    },

    beforeUnmount() {

        window.removeEventListener(
            "resize",
            this.handleSwiper
        );

        this.destroySwiper([
            "main",
            "sec03",
            "sec04"
        ]);

        if (this.numMotionScrollTrigger) {
            this.numMotionScrollTrigger.kill();
            this.numMotionScrollTrigger = null;
        }

        if (this.gsapCtx) {
            this.gsapCtx.revert();
            this.gsapCtx = null;
        }
    },

    methods: {

        /* =========================
           num_motion 숫자 애니메이션
        ========================= */

        parseNumMotionValue(text) {
            const suffix = text.endsWith("+") ? "+" : "";
            const value = parseInt(text.replace(/[^0-9]/g, ""), 10) || 0;
            const useComma = text.includes(",");

            return { value, suffix, useComma };
        },

        formatNumMotionValue(num, useComma, suffix) {
            const formatted = useComma
                ? Math.round(num).toLocaleString("en-US")
                : String(Math.round(num));

            return `${formatted}${suffix}`;
        },

        initNumMotion() {
            if (this.numMotionPlayed || this.gsapCtx) return;

            const heroEl = this.$refs.heroMessageRef;

            if (!heroEl) return;

            const numEls = heroEl.querySelectorAll(".num_motion");

            if (!numEls.length) return;

            const timelines = [];

            const playNumMotion = () => {
                if (this.numMotionPlayed) return;

                this.numMotionPlayed = true;

                timelines.forEach((tl) => {
                    if (!tl.isActive()) tl.play(0);
                });

                if (this.numMotionScrollTrigger) {
                    this.numMotionScrollTrigger.kill();
                    this.numMotionScrollTrigger = null;
                }
            };

            this.gsapCtx = gsap.context(() => {
                numEls.forEach((el) => {
                    const targetText = el.textContent.trim();
                    const { value, suffix, useComma } = this.parseNumMotionValue(targetText);
                    const counter = { val: 0 };
                    const unitWrap = el.closest(".num_count")?.querySelector(".num_unit_wrap");

                    el.textContent = "0";
                    gsap.set(el, { y: "100%", opacity: 0, willChange: "transform, opacity" });
                    if (unitWrap) unitWrap.style.display = "none";

                    const tl = gsap.timeline({ paused: true, repeat: 0 });

                    tl.to(el, {
                        y: "0%",
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    }).to(counter, {
                        val: value,
                        duration: value > 100 ? 1.8 : 1,
                        ease: "power2.out",
                        onStart: () => {
                            if (unitWrap) unitWrap.style.display = "inline-block";
                        },
                        onUpdate: () => {
                            el.textContent = this.formatNumMotionValue(counter.val, useComma, suffix);
                        },
                        onComplete: () => {
                            gsap.set(el, { willChange: "auto" });
                        },
                    }, ">");

                    timelines.push(tl);
                });

                this.numMotionScrollTrigger = ScrollTrigger.create({
                    trigger: heroEl,
                    start: "top 35%",
                    once: true,
                    onEnter: playNumMotion,
                });
            }, this.$el);
        },

        /* =========================
           Swiper 생성
        ========================= */

        createSwiper(key, el, options) {

            if (!el) return;

            if (!this.swipers[key]) {

                this.swipers[key] = new Swiper(
                    el,
                    options
                );
            }
        },

        /* =========================
           Swiper 제거
        ========================= */

        destroySwiper(names) {

            if (!Array.isArray(names)) {
                names = [names];
            }

            names.forEach(name => {

                if (this.swipers[name]) {

                    this.swipers[name].destroy(
                        true,
                        true
                    );

                    delete this.swipers[name];
                }

                /* 남은 클래스 제거 */
                const el = this.$refs[`${name}Swiper`];

                if (el) {

                    el.classList.remove(
                        "swiper-initialized",
                        "swiper-horizontal",
                        "swiper-backface-hidden"
                    );

                    /* inline style 제거 */
                    el.removeAttribute("style");

                    const wrapper =
                        el.querySelector(".swiper-wrapper");

                    if (wrapper) {

                        wrapper.removeAttribute("style");
                    }

                    const slides =
                        el.querySelectorAll(".swiper-slide");

                    slides.forEach(slide => {

                        slide.removeAttribute("style");
                    });
                }
            });
        },

        initSec04Swiper() {

            const el = this.$refs.sec04Swiper;

            if (!el) return;

            this.destroySwiper("sec04");

            this.swipers.sec04 = new Swiper(el, {
                loop: true,
                slidesPerView: "auto",
                spaceBetween: 12,
                speed: 800,
                watchSlidesProgress: true,
                on: {
                    init(swiper) {
                        requestAnimationFrame(() => {
                            swiper.update();
                            swiper.slideToLoop(0, 0, false);
                        });
                    },
                },
            });

            this.syncSec04Swiper();
        },

        syncSec04Swiper() {

            const swiper = this.swipers.sec04;
            const el = this.$refs.sec04Swiper;

            if (!swiper || !el) return;

            const refresh = () => {
                swiper.update();
                swiper.slideToLoop(swiper.realIndex || 0, 0, false);
            };

            const imgs = el.querySelectorAll("img");
            let pending = 0;

            imgs.forEach((img) => {
                if (img.complete) return;
                pending += 1;
                img.addEventListener("load", () => {
                    pending -= 1;
                    if (pending <= 0) refresh();
                }, { once: true });
            });

            refresh();
        },

        /* =========================
           반응형 swiper
        ========================= */

        handleSwiper() {

            const width = window.innerWidth;

            this.isDesktopView = width > 768;

            /* 메인 비주얼 */
            this.createSwiper(
                "main",
                this.$refs.mainSwiper,
                {
                    loop: true,
                    slidesPerView: 1,
                    speed: 800,
                }
            );

            /* desktop */
            if (this.isDesktopView) {

                this.createSwiper(
                    "sec03",
                    this.$refs.sec03Swiper,
                    {
                        loop: false,
                        slidesPerView: 3,
                        spaceBetween: 12,
                        speed: 800,
                    }
                );

                this.$nextTick(() => {
                    this.initSec04Swiper();
                });

            } else {

                /* mobile */
                this.destroySwiper([
                    "sec03",
                    "sec04"
                ]);
            }
        },

        initVideoScrollDelay() {
            this.$nextTick(() => {

                if (window.innerWidth <= 768) {
                    return;
                }

                const video = this.$el.querySelector(".swiper-slide-active video");
                const hero = this.$refs.heroMessageRef;

                console.log("[video]", video);
                console.log("[hero]", hero);

                if (!(video instanceof HTMLVideoElement)) {
                    console.warn("[ERROR] video is not HTMLVideoElement");
                    return;
                }

                if (!hero) return;

                let triggered = false;

                const start = () => {
                    if (triggered) return;

                    triggered = true;

                    setTimeout(() => {
                        const rect = hero.getBoundingClientRect();
                        const targetTop = window.scrollY + rect.top - 400;

                        if (window.scrollY >= targetTop) return;

                        this.scrollHeroMessage();

                        setTimeout(() => {
                            const header = document.getElementById("header");
                            header?.classList.remove("hide");
                        }, 500);
                        
                    }, 5000); //비디오 1회 loop 시간
                };

                if (video.readyState >= 3) {
                    start();
                } else {
                    video.addEventListener("canplay", start, { once: true });
                }
            });
        },

        scrollHeroMessage() {
            const p = this.$refs.heroMessageRef?.querySelector("p");

            if (!p) return;

            const rect = p.getBoundingClientRect();

            const targetTop =
                window.scrollY +
                rect.top -
                (window.innerHeight - p.offsetHeight - 40);

            window.scrollTo({
                top: targetTop,
                behavior: "smooth"
            });
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
    background-position: 50%;
    background-size: cover;
    position:relative;
    display: flex;
    align-items: center;
}

.main_visual .slide .video_wrap {
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
}

.main_visual .slide .video_wrap video {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
.blind { position: absolute; width: 1px; height: 1px; clip: rect(0, 0, 0, 0); overflow: hidden; }
.hero_message{padding-top:100px;background-color: #fff;position: relative;}
.hero_message .inner{max-width: 1720px;margin: 0 auto;padding: 0 20px;}
.hero_message .inner > a {width:50px; height:50px; margin-bottom:10px; display:inline-block; background:url('@/assets/images/main/icon_brand_arrow2.png') no-repeat center; background-size:contain;}
.hero_message p{font-weight: 700;font-size: 6.8rem;line-height: 1.4;letter-spacing: -0.02em;}
.hero_message p span{font-weight: 800;}
.hero_message p span.txt_orange{color: #FB6432;}
.hero_message p span.txt_green{color: #15B874;}
.hero_message p span.txt_blue{color: #248BFF;}
.hero_message ul{max-width:1045px;margin-top:100px;margin-left: auto;;}
.hero_message ul > li{padding: 20px 8px;border-bottom: 1px solid #000;}
.hero_message ul > li:first-child{border-top: 1px solid #000;}
.hero_message ul > li dl{display: grid;grid-template-columns: minmax(200px, 240px) minmax(0, 1fr);column-gap: clamp(32px, 6vw, 120px);align-items: center;}
.hero_message ul > li dl > dt{width: auto;font-weight: 600;font-size: 2.4rem;line-height: 1.35;letter-spacing: -0.03em;}
.hero_message ul > li dl > dd{display: flex;align-items: flex-end;flex-wrap: nowrap;min-width: 0;}
.hero_message ul > li dl > dd .num_count { display: inline-flex; align-items: flex-end; flex-wrap: nowrap; flex-shrink: 0; white-space: nowrap; }
.hero_message ul > li dl > dd .num_count > .num_motion_wrap { display: inline-block; overflow: hidden; vertical-align: bottom; flex-shrink: 0; }
.hero_message ul > li dl > dd .num_count > .num_motion_wrap > .num_motion { display: inline-block; font-weight: 700; font-size: 7.2rem; letter-spacing: -0.02em; line-height: 1.24; }
.hero_message ul > li dl > dd .num_count > .num_unit_wrap { display: none; vertical-align: bottom; flex-shrink: 0; }
.hero_message ul > li dl > dd .num_count > .num_unit_wrap > .num_unit{margin-left:4px;margin-bottom:10px; display: inline-block;font-weight: 600; font-size: 3.2rem;line-height: 1.3;letter-spacing: -0.03em;}
.hero_message ul > li dl > dd .num_count + .num_desc{margin-bottom:10px; margin-left: clamp(12px, 1.25vw, 18px);color:#4C4C53;font-weight: 400;font-size: 2rem;line-height: 1.35;letter-spacing: 0%;min-width: 0;flex-shrink: 1;}
.hero_message ul > li:last-child dl > dd .num_count + .num_desc{margin-left: clamp(12px, 1.25vw, 18px);}
.section_wrap {
    background-color: #fff;
    position: relative;
    z-index: 1;
}

section {
    padding-top: 200px;
    position: relative;
}

.sec03 .inner {
    max-width: 1720px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
}

.sec03 .swiper {
    width: 100%;
    max-width: 1680px;
    margin: 0 auto;
}

.sec03 .slide {
    position: relative;
    display:block;
}

.sec03 .slide .thumb {
    padding-top:117.210144%;
    border-radius:12px;
    display:block;

}

.sec03 .slide .thumb em {
    position:absolute;
    top:0; right:0; bottom:0; left:0;
}

.sec03 .slide div {padding:60px 30px; position:absolute; right:0; bottom:0; left:0; flex: 1;
    display: flex;
    align-items: center;
    gap: 20px;}

.sec03 .slide div em {display:flex; align-items:center;}

.sec03 .slide .cate {color:#fff; font-size:5.6rem; letter-spacing:-0.01em; line-height:130%; position:absolute; top:50%; left:50%; z-index:1; transform:translate(-50%, -50%);}

.sec03 .slide p {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.sec03 .slide p strong {
    margin-bottom:6px;
    display:block;
}

.sec03 .slide.gs25 p strong {width:86px;}
.sec03 .slide.fresh p strong {width:240px;}
.sec03 .slide.shopping p strong {width:140px;}

.sec03 .slide p strong img {
    width:100%;
    display:block;
}

.sec03 .slide p span {
    color: #E5E5E9;
    font-size: 2.4rem;
    letter-spacing: -0.01em;
    line-height: 150%;
}
.sec03 .slide p span br {display:none;}

.sec03 .hover_layer {position:absolute; bottom:0; right:20px; left:20px; z-index:10;}
.sec03 .hover_layer.active {opacity:1;}
.sec03 .hover_layer ul {display:flex;}
.sec03 .hover_layer li {width:calc(33.3333% - 6px); background-position:50% 0; background-repeat:no-repeat; background-size:cover; border-radius:12px; border-radius:12px; opacity:0; transition:background 0.3s, opacity 0.25s ease;}
.sec03 .hover_layer.active li {opacity:1; transition:background 0.25s, opacity 0.25s ease;}
.sec03 .hover_layer li + li {margin-left:12px;}
.sec03 .hover_layer.active li a {padding-top:117.210144%; position:relative; display:block;}
.sec03 .hover_layer.active li p {padding-bottom:31.702898%; position:absolute; top:0; right:0; bottom:0; left:0; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:20px;}
.sec03 .hover_layer.active li p strong {display:block;}
.sec03 .hover_layer.active li p strong img {width:100%; display:block;}
.sec03 .hover_layer.active li p span {color:#fff; font-size:3.2rem; font-weight:700; letter-spacing:-0.01em; line-height:130%; text-align:center; display:flex; flex-direction:column; align-items:center;}
.sec03 .hover_layer.active li p span:after {width:56px; height:56px; margin-top:20px; background:url('@/assets/images/main/icon_brand_arrow.png') 0 0 no-repeat; content:''; display:block;}

.sec03 .hover_layer.active li.gs25 p strong {width:124px;}
.sec03 .hover_layer.active li.fresh p strong {width:396px;}
.sec03 .hover_layer.active li.shopping p strong {width:218px;}

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
    margin-top: 40.5px;
}

.sec04 .quick a {
    padding: 0 24px;
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
    width: 28px;
    height: 28px;
    border-radius: 4px;
    background: #F2F2F4 url('@/assets/images/main/icon_arrow.png') center no-repeat;
    content: '';
    display: block;
}

.sec03 .swiper{
    margin-top: 80px;
}

 .sec04 .swiper {
    margin-top: 40.5px;
}

.sec04 .swiper { width: 100%; overflow: hidden; }

.sec04 .swiper-slide { width: 552px; flex-shrink: 0; }

.sec04 .slide {
    position: relative;
}
.sec04 .slide .thumb em { width: 100%; display: block; }
.sec04 .slide .thumb img{width:100%; height:550px; object-fit: cover;display:block;}
.sec04 .slide .txt {
    padding: 30px 20px 0;
    display: flex;
    flex-direction: column;
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
    border: 1px solid #161616;
    border-radius: 100px;
    display: block;
}

.sec04 .slide .txt p {
    font-size: 2.4rem;
    letter-spacing: -0.01em;
    line-height: 150%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

/* --- [Small PC: 1300px 이하] --- */
@media screen and (max-width: 1300px) {
    .hero_message ul > li dl {grid-template-columns: minmax(200px, 232px) minmax(0, 1fr);column-gap: clamp(20px, 3vw, 56px); }
    .hero_message ul > li dl > dd .num_count > .num_motion_wrap > .num_motion { font-size:6.6rem }
    .hero_message ul > li dl > dd .num_count > .num_unit_wrap > .num_unit { font-size: 3rem }
}

/* --- [Tablet: 769px ~ 1024px] --- */
@media screen and (max-width: 1024px) {
    h2 {
        font-size: 5.2rem;
    }

    .hero_message p { font-size: 5.2rem; line-height: 1.2; word-break: keep-all; }
    .hero_message ul { max-width: 100%; margin-top: 64px; }
    .hero_message ul > li { padding: 18px 0; }
    .hero_message ul > li dl { flex-direction: column; gap: 16px; }
    .hero_message ul > li dl > dt { width: 100%; font-size: 2rem; }
    .hero_message ul > li dl > dd { width: 100%; margin-left: 0; flex-wrap: nowrap; }
    .hero_message ul > li dl > dd .num_count { flex-shrink: 0; }
    .hero_message ul > li dl > dd .num_count > .num_motion_wrap > .num_motion { font-size: 4.8rem; line-height: 1.24; }
    .hero_message ul > li dl > dd .num_count > .num_unit_wrap > .num_unit { font-size: 2.4rem; }
    .hero_message ul > li dl > dd .num_count + .num_desc { margin-left: 16px; font-size: 1.6rem; flex-shrink: 1; min-width: 0; }
    .hero_message ul > li:last-child dl > dd .num_count + .num_desc { margin-left: 14px;/* padding: 12px 0;*/}

    .sec03 h2 {
        position: relative;
        left: 0;
        width: 100%;
        margin-bottom: 40px;
    }

    .sec03 .slide .cate {font-size:4rem;}
    .sec03 .slide div {padding:38px 15px;}

    .sec03 .slide.gs25 p strong {width:62px;}
    .sec03 .slide.fresh p strong {width:198px;}
    .sec03 .slide.shopping p strong {width:109px;}

    .sec03 .slide p span {font-size:1.6rem;}

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
    
    .hero_message{padding-bottom:100px;}
    .hero_message p{font-size: 2.8rem;line-height: 1.35;letter-spacing: -0.01em;}
    .hero_message ul{margin-top:50px;}
    .hero_message ul > li{padding:20px;}
    .hero_message ul > li:last-child {padding-bottom:4px;}
    .hero_message ul > li dl { display: grid; grid-template-columns: 1fr; row-gap: 10px; align-items: start; }
    .hero_message ul > li dl > dt { width: 100%; font-size: 2rem; line-height: 1.35; letter-spacing: -0.01em;}
    .hero_message ul > li dl > dd { width: 100%; justify-content: flex-start; align-items:flex-start; flex-wrap: wrap; gap: 4px; }
    .hero_message ul > li dl > dd .num_count > .num_motion_wrap > .num_motion { font-size: 4rem; line-height: 1.3; letter-spacing: -0.01em;}
    .hero_message ul > li dl > dd .num_count > .num_unit_wrap > .num_unit { margin-bottom:10px; font-size: 2rem; letter-spacing: -0.01em; line-height: 1.35;}
    .hero_message ul > li dl > dd .num_count + .num_desc { margin:0; padding:22px 0 16px; font-size: 1.2rem; line-height: 1.2;letter-spacing: 0;}
    .hero_message ul > li:last-child dl > dd { align-items: center; }

    .sec03 {
        padding-top: 50px;
        padding-bottom: 100px;
    }

    .sec03 .swiper {
        width: auto;
        margin:0;
    }

    .sec03 .swiper-wrapper {
        flex-direction:column;
    }

    .sec03 .swiper-slide + .swiper-slide {margin-top:12px;}

    .sec03 .slide {
        align-items: flex-start;
        flex-direction: column;
    }

    .sec03 .slide .thumb {
        width: 100%;
        padding-top:125.373134%;
    }

    .sec03 .slide p strong {
        margin-bottom:6px;
    }

    .sec03 .slide.gs25 p strong {
        width:62px;
    }

    .sec03 .slide.fresh p strong {
        width:198px;
    }

    .sec03 .slide.shopping p strong {
        width:109px;
    }

    .sec03 .slide p span {
        font-size: 1.6rem;
        line-height:124%;
    }

    .sec03 .slide .cate {font-size:4rem;}

    .sec03 .hover_layer {display:none;}

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
        margin-top: 48px;
    }

    .sec04 .quick a {
        padding: 0 10px;
        font-size: 1.6rem;
    }

    .sec04 .swiper {
        margin-top: 46px;
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
        font-weight:700;
        line-height: 135%;
    }

    .sec04 .slide .txt li em {
        border-color: #222;
    }
}
</style>