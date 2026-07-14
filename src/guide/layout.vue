<template>
    <div class="contents">

        <h2>Info</h2>

        <section>
            <h4>Language Set</h4>
            <ul class="explain">
                <li><strong>App.vue에서 설정 가능</strong> : const lang = ref("ko/en"); // default="ko"</li>
                <li>main_wrap.vue, sub_wrap.vue 공통 선언</li>
            </ul>
            <pre class="code_box">
<code>&lt;script&gt;
import { ref, computed } from "vue";

export default {
    name: "App",
    components: {},
    setup() {
        const route = useRoute();
        const isGuide = computed(() =&gt; route.path.startsWith("/guide"));

        const lang = ref("ko"); // 언어 선택 ko/en [default = "ko"]

        const setLang = (value) =&gt; {
            lang.value = value; // 'ko' or 'en'
        };

        return { lang, setLang };
    }
};
&lt;/script&gt;


================ type : setup===============
&lt;template&gt;
    &lt;div v-for="item in t.sample"&gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
    import { ref, computed } from "vue";

    const props = defineProps({
        lang: {
            type: String,
            default: "ko",
        },
    });

    const langData = {
        ko: {
            sample: [
                { title: "개인정보처리방침", path: "#none" },
                { title: "채용안내", path: "https://gsretail.recruiter.co.kr/career/home", blank: true },
                { title: "입점상담", path: "gsrse01" },
                { title: "멤버십/홈페이지문의", path: "#none" },
                { title: "입지제안", path: "gsrbr0204", pop:true, popId:"gsrbr0204", popType:'lg' },
                { title: "임대상가안내", path: "#none" },
                { title: "정도경영제보", path: "#none" },
                { title: "고객센터", path: "gsrcu01" },
                { title: "GS SHOP 시청자 관련", path: "#none" }
            ]
        },
        en: {
            sample: [
                { title: "Privacy Policy", path: "#none" },
                { title: "Store Franchise", path: "#none" },
                { title: "Partnership", path: "#none" },
                { title: "Customer Center", path: "#none" }
            ]
        }
    };

    // =====================
    // computed
    // =====================
    const t = computed(() =&gt; langData[props.lang] || langData.ko);
&lt;/script&gt;</code></pre>
        </section>

        <section>
            <h4>Header Menu</h4>
            <ul class="explain">
                <li><strong>language</strong> : /assets/languag/menu/menu.(ko/en).json</li>
            </ul>
            <pre class="code_box">
<code>[
    {
        "title": "1Depth",
        "path": "link주소",
        "children": [
            {
                "title": "2Depth",
                "path": "link주소",
                "blank": true, // 새창여부 true = 새창열기 // default = "false" 생략가능
                "children": [
                    { "title": "3Depth", "path": "link주소" },
                ]
            },
        ]
    },
]</code></pre>
        </section>

        <section>
            <h4>Contents Use Language</h4>
            <ul class="explain">
                <li><strong>단일 선언</strong> : &#123;&#123; t.langData값 &#125;&#125;</li>
                <li><strong>HTML 선언</strong> : v-html="t.MixType"</li>
            </ul>
            <pre class="code_box">
<code>&lt;template&gt;
    &lt;div&gt;
        &lt;p&gt;&#123;&#123; t.Text1 &#125;&#125;&lt;/p&gt;
        &lt;strong&gt;&#123;&#123; t.Text2 &#125;&#125;&lt;/strong&gt;
        &lt;div v-html="t.MixType"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
    name: "gsr-00-00-00",
    props: {
        lang: { type: String }, // ko/en
    },
    data() {
        return {
            langData: {
                ko: {
                    Text1: "문구1",
                    Text2: "문구2",
                    MixType: "이것은 &lt;strong&gt;혼합형&lt;/strong&gt;입니다."
                },
                en: {
                    Text1: "Text1",
                    Text2: "Test2",
                    MixType: "This is &lt;strong&gt;MixType&lt;/strong&gt;"
                }
            }
        };
    },
    computed: {
        t() {
            return this.langData[this.lang] || this.langData.ko;
        }
    },
    mounted() {
    }
};
&lt;/script&gt;</code></pre>
        </section>

    </div>
</template>

<script>
import Header from "@/inc/Header.vue";
import Footer from "@/inc/Footer.vue";

export default {
    name: "Layout",
    props: {
        lang: {
        type: String,
        default: "ko"
        },
        openModal: {
            type: Function,
            default: () => {}
        }
    },
    components: {
        Header,
        Footer,
    },
    data() {
        return {}
    },
    computed: {
        t() {
            return this.langData[this.lang] || this.langData.ko;
        }
    },
}
</script>

<style scoped>
#sample_wrap div {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    position: relative;
}

#sample_wrap em {
    padding: 3px 6px;
    color: #fff;
    font-size: 1.1rem;
    font-style: normal;
    background-color: #222;
    border-radius: 4px;
    position: absolute;
    top: -12px;
    left: 12px;
    display: inline-block;
}

#guide_wrap .code_box {
    display:block;
}
</style>
