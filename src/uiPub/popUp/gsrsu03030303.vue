<template>
    <div class="modal_cont">
        <div class="modal_header">
            {{ t.MainTitle }}
            <a href="#none" @click="closeModal" class="btn_close">{{ t.closeLabel }}</a>
        </div>

        <div class="modal_content">

            <div class="pop_space">
                <p class="intro_desc">{{ t.intro }}</p>
                
                <Tabs v-model="CTabIdx" :tab-items="t.tabs" tab-class="type_02" :tab-slide="true" @change="onTabChange1" />

                <div class="tab_content_wrap">
                    
                    <section class="tab_content" v-if="CTabIdx === 0" :aria-label="t.tabs[0].item">
                        <!-- 1. 실시배경 -->
                        <div class="section">
                            <strong class="title">{{ t.section11.title }}</strong>
                            <p class="desc">{{ t.section11.desc }}</p>
                        </div>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 2. 위생관리 Process -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section12.title }}</strong>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section12.image.src" :alt="t.section12.image.alt">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 3. 위생지원 항목 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section13.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section13.activities" :key="index" class="activity_item">
                                                <strong class="title_b">{{ activity.subject }}</strong>
                                                <p class="desc">{{ activity.content }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ul>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 4. 지원 주기 -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section14.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section14.activities" :key="index" class="activity_item">
                                                <strong class="title_b">{{ activity.subject }}</strong>
                                                <p class="desc">{{ activity.content }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 5. 지원 기관 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section15.title }}</strong>
                                        <p class="desc">{{ t.section15.desc }}</p>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section15.image.src" :alt="t.section15.image.alt" style="max-width:200px">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                        </ul>

                    </section>
                    
                
                    <section class="tab_content" v-if="CTabIdx === 1" :aria-label="t.tabs[1].item">
                        <!-- 1. 실시배경 -->
                        <div class="section">
                            <strong class="title">{{ t.section21.title }}</strong>
                            <p class="desc">{{ t.section21.desc }}</p>
                        </div>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 2. 위생관리 Process -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section22.title }}</strong>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section22.image.src" :alt="t.section22.image.alt">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 3. 위생지원 항목 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section23.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section23.activities" :key="index" class="activity_item">
                                                <strong class="title_b">{{ activity.subject }}</strong>
                                                <p class="desc">{{ activity.content }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ul>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 4. 지원 주기 -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section24.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section24.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 5. 지원 기관 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section25.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section25.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section25.image.src" :alt="t.section25.image.alt" style="max-width:200px">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </section>

                    
                    <section class="tab_content" v-if="CTabIdx === 2" :aria-label="t.tabs[2].item">
                        <!-- 1. 실시배경 -->
                        <div class="section">
                            <strong class="title">{{ t.section31.title }}</strong>
                            <p class="desc">{{ t.section31.desc }}</p>
                        </div>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 2. 위생관리 Process -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section32.title }}</strong>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section32.image.src" :alt="t.section32.image.alt">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 3. 위생지원 항목 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section33.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section33.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section33.image.src" :alt="t.section33.image.alt" style="max-width:250px">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                        </ul>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 4. 지원 주기 -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section34.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section34.activities" :key="index" class="activity_item">
                                                <strong class="title_b">{{ activity.subject }}</strong>
                                                <p class="desc">{{ activity.content }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 5. 지원 기관 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section35.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section35.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </section>

                    
                    <section class="tab_content" v-if="CTabIdx === 3" :aria-label="t.tabs[3].item">
                        <!-- 1. 실시배경 -->
                        <div class="section">
                            <strong class="title">{{ t.section41.title }}</strong>
                            <p class="desc">{{ t.section41.desc }}</p>
                        </div>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 2. 위생관리 Process -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section42.title }}</strong>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section42.image.src" :alt="t.section42.image.alt">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 3. 위생지원 항목 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section43.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section43.activities" :key="index" class="activity_item">
                                                <strong class="title_b">{{ activity.subject }}</strong>
                                                <p class="desc">{{ activity.content }}</p>
                                            </div>
                                        </div>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section43.image.src" :alt="t.section43.image.alt" style="max-width:200px">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                        </ul>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 4. 지원 주기 -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section44.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section44.activities" :key="index" class="activity_item">
                                                <strong class="title_b">{{ activity.subject }}</strong>
                                                <p class="desc">{{ activity.content }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 5. 지원 기관 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section45.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section45.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </section>

                    
                    <section class="tab_content" v-if="CTabIdx === 4" :aria-label="t.tabs[4].item">
                        <!-- 1. 실시배경 -->
                        <div class="section">
                            <strong class="title">{{ t.section51.title }}</strong>
                            <p class="desc">{{ t.section51.desc }}</p>
                        </div>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 2. 위생관리 Process -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section52.title }}</strong>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section52.image.src" :alt="t.section52.image.alt">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 3. 위생지원 항목 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section53.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section53.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section53.image.src" :alt="t.section53.image.alt" style="max-width:200px">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                        </ul>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 4. 지원 주기 -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section54.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section54.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 5. 지원 기관 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section55.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section55.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </section>

                    
                    <section class="tab_content" v-if="CTabIdx === 5" :aria-label="t.tabs[5].item">
                        <!-- 1. 실시배경 -->
                        <div class="section">
                            <strong class="title">{{ t.section61.title }}</strong>
                            <p class="desc">{{ t.section61.desc }}</p>
                        </div>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 2. 위생관리 Process -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section62.title }}</strong>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section62.image.src" :alt="t.section62.image.alt">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 3. 위생지원 항목 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section63.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section63.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                        <!-- 이미지 영역 -->
                                        <figure class="image_wrap">
                                            <img :src="t.section63.image.src" :alt="t.section63.image.alt" style="max-width:200px">
                                        </figure>
                                    </div>
                                </article>
                            </li>
                        </ul>

                        <ul class="card_list section" role="list">
                            <li>
                                <article class="card_item">
                                    <!-- 4. 지원 주기 -->
                                    <div class="card_body">
                                        <strong class="title">{{ t.section64.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section64.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                            <li>
                                <article class="card_item">
                                    <!-- 5. 지원 기관 -->
                                    <div class="card_body section">
                                        <strong class="title">{{ t.section65.title }}</strong>
                                        <div class="activity_grid">
                                            <div v-for="(activity, index) in t.section65.activities" :key="index" class="activity_item">
                                                <strong class="title_b first">{{ activity.subject }}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </section>
                </div>

            </div>
        </div>
    </div>
</template>



<script>
import modal from "@/assets/js/modal";
import Buttons from "@/components/Buttons.vue";
import Tabs from "@/components/Tabs.vue";

export default {
    name: "gsrsu03030303",
    components: {
        Buttons,
        Tabs,
    },
    data() {
        return {
            CTabIdx: 0,
            selectedFilter: "",  
            langData: {
                ko: {
                    closeLabel: "닫기",
                    tabs: [ //탭 아이템 배열
                        { item: "협력업체위생관리" },
                        { item: "FF공장위생관리" },
                        { item: "경기도청 식품안전관리 협약" },
                        { item: "농/수산물 안전성 검사" },
                        { item: "미생물검사" },
                        { item: "위해물질검사" }
                    ],
                    MainTitle: "안전, 위생관리 제도 안내",
                    intro: 'GS리테일의 안전, 위생관리 제도를 확인해 보세요.',
                    section11: {
                        title: '실시배경',
                        desc: '당사에 상품을 공급 또는 공급을 원하는 협력업체에 대한 자체 위생진단을 통해 제품생산 전 과정에 대해\n위해요소를 모니터링하여 위생적이고 품질관리 시스템이 잘 운영되고 있는 업체만을 선정해서 안전한 상품만 공급받아\n고객에게 제공하고 있습니다.'
                    },
                    section12: {
                        title: '위생관리 Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img01.png"),
                            alt: '위생관리 Process'
                        }
                    },
                    section13: {
                        title: '위생지원 항목',
                        activities: [
                            { subject: '1. 법규관리 충족여부 확인', content: '- 식품위생법 등(품목제조보고, 영업신고 등)' },
                            { subject: '2. 현장관리 확인', content: '- 위해요소' }
                        ]
                    },
                    section14: {
                        title: '지원 주기',
                        activities: [
                            { subject: '1. PB업체', content: '- 식품위생법, 축산물 위생관리법 등' },
                            { subject: '2. PB외', content: '- 등급별 차등 지원' }
                        ]
                    },
                    section15: {
                        title: '지원 기관',
                        desc: 'GS리테일 품질관리팀, SGS코리아(공인인증기관)',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img02.png"),
                            alt: 'GS리테일 품질관리팀, SGS코리아(공인인증기관)'
                        }
                    },
                    section21: {
                        title: '실시배경',
                        desc: 'GS리테일 품질관리팀에서는 FF공장 제조공정 전 과정에 대한 위생관리 및 현장 미생물검사와 사용 원재료, 반제품 등의 안전성 검사를 실시하고 있으며, 편의점 FF공장 최초로 HACCP인증을 취득하여 체계적이고 효율적인 관리시스템을 도입하여 소비자들이 위생적이고 안전성이 충분히 확보된 식품을 구입하여 안심하게 드실 수 있도록 선도적 역할을 수행하고 있습니다.'
                    },
                    section22: {
                        title: '위생관리 Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img03.png"),
                            alt: '위생관리 Process'
                        }
                    },
                    section23: {
                        title: '위생지원 항목',
                        activities: [
                            { subject: '1. 법규관리 충족여부 확인', content: '- 식품위생법 등(품목제조보고, 영업신고 등)' },
                            { subject: '2. 현장관리 확인', content: '- 위해요소' }
                        ]
                    },
                    section24: {
                        title: '지원 주기',
                        activities: [
                            { subject: '월 1회 지원' }
                        ]
                    },
                    section25: {
                        title: '지원 기관',
                        activities: [
                            { subject: 'GS리테일 품질관리팀' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img04.png"),
                            alt: 'GS리테일 품질관리팀'
                        }
                    },
                    section31: {
                        title: '실시배경',
                        desc: '경기도청 및 경남도청과 협업하여 당사에서 취급하는 농축수산물 먹거리 안전성(잔류농약, 중금속 등)검사를 진행하고 있으며, 유통단계에서 부적합 농축수산물을 차단하여 고객에게 안전한 먹거리를 제공하고 있습니다.'
                    },
                    section32: {
                        title: '위생관리 Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img05.png"),
                            alt: '위생관리 Process'
                        }
                    },
                    section33: {
                        title: '위생지원 항목',
                        activities: [
                            { subject: '농산물 : 18품목(잔류농약 218종,중금속2종' },
                            { subject: '수산물 : 4품목(중금속 3종)' },
                            { subject: '축산물 : 4품목(잔류항생물질, 농약34종)' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img06.png"),
                            alt: '위생관리 Process'
                        }
                    },
                    section34: {
                        title: '지원 주기',
                        activities: [
                            { subject: '농수축산물 수거/검사 진행', content: '- 매월' }
                        ]
                    },
                    section35: {
                        title: '지원 기관',
                        activities: [
                            { subject: '보건환경연구원(농/수)'},
                            { subject: '동물 위생시험소(축)' }
                        ]
                    },
                    section41: {
                        title: '실시배경',
                        desc: '매월 지차체 협업 농산물 검사 이외에도 1차 농산물이 다소비 되는 시즌(설,추석 등) 식품 안전성 확보를 위해 공인 시험분석기관에 의뢰하여 기준 규격 준수 여부 확인을 위한 모니터링을 하고 있으며, 방사능 오염 이슈에 대응하고자 물류센터에서 다소비 수산물 대상 간이 방사능 검사를 실시하여 안전성이 검증된 수산물만 출하될 수 있는 프로세스를 운영하고 있습니다.'
                    },
                    section42: {
                        title: '위생관리 Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img07.png"),
                            alt: '위생관리 Process'
                        }
                    },
                    section43: {
                        title: '위생지원 항목',
                        activities: [
                            { subject: '농산물 : 잔류농약 463종, 중금속2종' },
                            { subject: '수산물 : 중금속, 벤조피렌, PCBs' },
                            { subject: '축산물 : 식품첨가물, VBN' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img08.png"),
                            alt: '위생지원 항목'
                        }
                    },
                    section44: {
                        title: '지원 주기',
                        activities: [
                            { subject: '1차 농산물 별 기준규격검사 (한국SGS 공인인증기관) - 시즌별' },
                            { subject: '2. 수산물 간이 방사능검사(당사 물류센터) - 매주' }
                        ]
                    },
                    section45: {
                        title: '지원 기관',
                        activities: [
                            { subject: '한국SGS(공인인증기관)' }
                        ]
                    },
                    section51: {
                        title: '실시배경',
                        desc: '품질이 좋고 안전한 상품을 제공하는 것은 고객 만족을 넘어서 사회적 책임이라 할 수 있으며, 이를 만족시키고자\nGS리테일 품질관리팀에서는 상품이 최종적으로 판매되기 까지의 유통과정 전반에 걸친 사전 검사를 거쳐 안전/안심의 매장 분위기를 조성하고\n상품 안전성 확보를 통한 컴플레인 저감화를 위해 선도적 역할을 수행하고 있습니다.'
                    },
                    section52: {
                        title: '위생관리 Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img09.png"),
                            alt: '위생관리 Process'
                        }
                    },
                    section53: {
                        title: '위생지원 항목',
                        activities: [
                            { subject: '일반세균, 대장균군, 대장균\n식중독균(황색포도상구균, 살모넬라균 등)\n표면(Surface) 미생물 오염도 측정' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img10.png"),
                            alt: '위생지원 항목'
                        }
                    },
                    section54: {
                        title: '지원 주기',
                        activities: [
                            { subject: '매월 사전 연구 활동을 통한 고 위험 예상 품목 선정' },
                            { subject: '전 사업 영역에 걸쳐 Rotation 검사를 통한\n사전 예방 활동진행' }
                        ]
                    },
                    section55: {
                        title: '지원 기관',
                        activities: [
                            { subject: 'GS리테일 품질관리팀\n한국SGS(공인인증기관)' }
                        ]
                    },
                    section61: {
                        title: '실시배경',
                        desc: '각종 식품 첨가물의 과다 사용 및 고도의 속임수 상품이 속출하여 먹을거리에 대한 불감증이 사회적 문제로 대두됨에 따라\nGS리테일 품질관리팀에서는멜라민, 보존료, 인공감미료 등의 위해물질 검사를 진행하고 있으며, 철저한 모니터링 활동을 통해\n부정/불량 상품의 유통 경로를 원천 봉쇄하기 위해 최선의 노력을 다하고 있습니다.'
                    },
                    section62: {
                        title: '위생관리 Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img11.png"),
                            alt: '위생관리 Process'
                        }
                    },
                    section63: {
                        title: '위생지원 항목',
                        activities: [
                            { subject: '이산화황, 합성보존료, 타르색소, 항생제,\n증발잔류물,산가, 과산화물가, 인공감미료, 곰팡이독소 등' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img12.png"),
                            alt: '위생지원 항목'
                        }
                    },
                    section64: {
                        title: '지원 주기',
                        activities: [
                            { subject: '월 단위로 진행되는 정기적 검사 외 이슈 발생에 따른\n신속 대응 검사 체제 유지' }
                        ]
                    },
                    section65: {
                        title: '지원 기관',
                        activities: [
                            { subject: '한국SGS(공인인증기관)' }
                        ]
                    }
                },
                en: {
                    closeLabel: "Close"/* 260708 번역 */,
                    tabs: [ //탭 아이템 배열
                        { item: "Partner company hygiene management"/* 260604 번역 */ },
                        { item: "FF Factory Sanitation Management"/* 260604 번역 */ },
                        { item: "Food Safety Management Agreement with the Gyeonggi Provincial Government"/* 260604 번역 */ },
                        { item: "Safety inspection of agricultural and fishery products"/* 260604 번역 */ },
                        { item: "Microbiological testing"/* 260604 번역 */ },
                        { item: "Hazardous substance testing"/* 260604 번역 */ }
                    ],
                    MainTitle: "Safety and Hygiene Management Programs",
                    intro: `Explore GS Retail's safety and hygiene management programs.`,
                    section11: {
                        title: 'Background',
                        desc: 'Through our own hygiene diagnosis of partner companies that supply or wish to supply goods to us, we monitor hazardous factors throughout the entire production process,\nselecting only companies that are hygienic and operate a sound quality management system, so that we are supplied with only safe products\nand provide them to our customers.'/* 260604 번역 */
                    },
                    section12: {
                        title: 'Hygiene Management Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img01.png"),
                            alt: 'Hygiene Management Process'
                        }
                    },
                    section13: {
                        title: 'Hygiene Support Items',
                        activities: [
                            { subject: '1. Verification of compliance with statutory management requirements'/* 260604 번역 */, content: '- Food Sanitation Act, etc. (product manufacturing report, business registration, etc.)'/* 260604 번역 */ },
                            { subject: '2. On-site management verification'/* 260604 번역 */, content: '- Hazard factors'/* 260604 번역 */ }
                        ]
                    },
                    section14: {
                        title: 'Support Frequency',
                        activities: [
                            { subject: '1. PB suppliers'/* 260604 번역 */, content: '- Food Sanitation Act, Livestock Products Sanitary Control Act, etc.'/* 260604 번역 */ },
                            { subject: '2. Other than PB'/* 260604 번역 */, content: '- Differentiated support by grade'/* 260604 번역 */ }
                        ]
                    },
                    section15: {
                        title: 'Supporting Organization',
                        desc: 'GS Retail Quality Control Team, SGS Korea (accredited certification body)'/* 260604 번역 */,
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img02.png"),
                            alt: 'GS Retail Quality Control Team, SGS Korea (accredited certification body)'/* 260604 번역 */
                        }
                    },
                    section21: {
                        title: 'Background',
                        desc: 'The GS Retail Quality Control Team conducts sanitation management of the entire FF factory manufacturing process, on-site microbiological testing, and safety testing of raw materials used, semi-finished products, etc. As the first convenience store FF factory to obtain HACCP certification, it has introduced a systematic and efficient management system and plays a leading role so that consumers can purchase and eat hygienic and sufficiently safe food with peace of mind.'/* 260604 번역 */
                    },
                    section22: {
                        title: 'Hygiene Management Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img03.png"),
                            alt: 'Hygiene Management Process'
                        }
                    },
                    section23: {
                        title: 'Hygiene Support Items',
                        activities: [
                            { subject: '1. Verification of compliance with statutory management requirements'/* 260604 번역 */, content: '- Food Sanitation Act, etc. (product manufacturing report, business registration, etc.)'/* 260604 번역 */ },
                            { subject: '2. On-site management verification'/* 260604 번역 */, content: '- Hazard factors'/* 260604 번역 */ }
                        ]
                    },
                    section24: {
                        title: 'Support Frequency',
                        activities: [
                            { subject: 'Provided once a month'/* 260604 번역 */ }
                        ]
                    },
                    section25: {
                        title: 'Supporting Organization',
                        activities: [
                            { subject: 'GS Retail Quality Management Team' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img04.png"),
                            alt: 'GS Retail Quality Management Team'
                        }
                    },
                    section31: {
                        title: 'Background',
                        desc: 'In collaboration with the Gyeonggi Provincial Government and the Gyeongnam Provincial Government, we conduct food safety inspections (for residual pesticides, heavy metals, etc.) of the agricultural, livestock, and fishery products we handle, and we provide safe food to our customers by blocking non-conforming agricultural, livestock, and fishery products at the distribution stage.'/* 260604 번역 */
                    },
                    section32: {
                        title: 'Hygiene Management Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img05.png"),
                            alt: 'Hygiene Management Process'
                        }
                    },
                    section33: {
                        title: 'Hygiene Support Items',
                        activities: [
                            { subject: 'Agricultural products: 18 items (218 types of residual pesticides, 2 types of heavy metals'/* 260604 번역 */ },
                            { subject: 'Fishery products: 4 items (3 types of heavy metals)' },
                            { subject: 'Livestock products: 4 items (residual antibiotics, 34 types of pesticides)' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img06.png"),
                            alt: 'Hygiene Management Process'
                        }
                    },
                    section34: {
                        title: 'Support Frequency',
                        activities: [
                            { subject: 'Collection and inspection of agricultural, fishery, and livestock products'/* 260604 번역 */, content: '- Monthly'/* 260604 번역 */ }
                        ]
                    },
                    section35: {
                        title: 'Supporting Organization',
                        activities: [
                            { subject: 'Public Health and Environment Research Institute (agricultural and fishery products)'},
                            { subject: 'Animal Hygiene Testing Institute (livestock products)' }
                        ]
                    },
                    section41: {
                        title: 'Background',
                        desc: 'In addition to the monthly agricultural product inspections conducted in collaboration with local governments, during seasons when primary agricultural products are consumed in large quantities (e.g., Lunar New Year, Chuseok), we commission accredited testing and analysis institutions to monitor compliance with standards and specifications in order to ensure food safety. To respond to radioactive contamination issues, we conduct simple radioactivity tests on high-consumption fishery products at our distribution centers, operating a process whereby only fishery products verified as safe can be shipped.'/* 260604 번역 */
                    },
                    section42: {
                        title: 'Hygiene Management Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img07.png"),
                            alt: 'Hygiene Management Process'
                        }
                    },
                    section43: {
                        title: 'Hygiene Support Items',
                        activities: [
                            { subject: 'Agricultural products: 463 types of residual pesticides, 2 types of heavy metals' },
                            { subject: 'Fishery products: heavy metals, benzo[a]pyrene, PCBs' },
                            { subject: 'Livestock products: food additives, VBN (volatile basic nitrogen)' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img08.png"),
                            alt: 'Hygiene Support Items'
                        }
                    },
                    section44: {
                        title: 'Support Frequency',
                        activities: [
                            { subject: '1. Standard specification testing for primary agricultural products (SGS Korea, accredited certification body) — Seasonal' },
                            { subject: '2. Simplified radiation testing for fishery products (company distribution centers) — Weekly' }
                        ]
                    },
                    section45: {
                        title: 'Supporting Organization',
                        activities: [
                            { subject: 'SGS Korea (accredited certification body)' }
                        ]
                    },
                    section51: {
                        title: 'Background',
                        desc: 'Providing high-quality, safe products can be said to be a social responsibility that goes beyond customer satisfaction, and to fulfill this,\nthe GS Retail Quality Control Team conducts preliminary inspections throughout the entire distribution process until products are finally sold, creating a safe and reassuring store atmosphere\nand playing a leading role in reducing complaints by ensuring product safety.'/* 260604 번역 */
                    },
                    section52: {
                        title: 'Hygiene Management Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img09.png"),
                            alt: 'Hygiene Management Process'
                        }
                    },
                    section53: {
                        title: 'Hygiene Support Items',
                        activities: [
                            { subject: 'Total bacteria, coliform bacteria, Escherichia coli\nFood poisoning bacteria (Staphylococcus aureus, Salmonella, etc.)\nSurface microorganism contamination measurement' }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img10.png"),
                            alt: 'Hygiene Support Items'
                        }
                    },
                    section54: {
                        title: 'Support Frequency',
                        activities: [
                            { subject: 'Monthly pre-research activities to identify high-risk items' },
                            { subject: 'Rotation-based inspections across all business areas for preventive monitoring' }
                        ]
                    },
                    section55: {
                        title: 'Supporting Organization',
                        activities: [
                            { subject: 'GS Retail Quality Management Team\nSGS Korea (accredited certification body)' }
                        ]
                    },
                    section61: {
                        title: 'Background',
                        desc: 'As the excessive use of various food additives and the proliferation of highly deceptive products have brought desensitization toward food safety to the fore as a social issue,\nthe GS Retail Quality Control Team conducts testing for hazardous substances such as melamine, preservatives, and artificial sweeteners, and, through thorough monitoring activities,\nis making its utmost efforts to fundamentally block the distribution channels of fraudulent and defective products.'/* 260604 번역 */
                    },
                    section62: {
                        title: 'Hygiene Management Process',
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img11.png"),
                            alt: 'Hygiene Management Process'
                        }
                    },
                    section63: {
                        title: 'Hygiene Support Items',
                        activities: [
                            { subject: 'Sulfur dioxide, synthetic preservatives, tar dyes, antibiotics,\nevaporation residues, acid value, peroxide value, artificial sweeteners, mycotoxins, etc.'/* 260604 번역 */ }
                        ],
                        image: {
                            src: require("@/assets/images/dummy/safe_fresh_img12.png"),
                            alt: 'Hygiene Support Items'
                        }
                    },
                    section64: {
                        title: 'Support Frequency',
                        activities: [
                            { subject: 'In addition to regular inspections conducted on a monthly basis, we maintain a rapid-response inspection system\nin the event of an issue'/* 260604 번역 */ }
                        ]
                    },
                    section65: {
                        title: 'Supporting Organization',
                        activities: [
                            { subject: 'SGS Korea (accredited certification body)' }
                        ]
                    }
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
        onTabChange1(idx) {
            this.CTabIdx = idx;
            this.selectedFilter = "";
        },
        closeModal(event) { modal.close(event.currentTarget); }
    }
};
</script>

<style scoped>
.pop_space .intro_desc {margin-bottom:35px; color:#444; font-size:18px; line-height:26px;}
.pop_space .title {display:block;font-size:18px;font-weight:700;padding-bottom:20px}
.pop_space .title_b {display:block;font-size:18px;font-weight:normal;padding:25px 0 6px 0}
.pop_space .activity_item:first-child .title_b {padding-top:0}
.pop_space .title_b.first {padding-top:0}
.pop_space .section {padding:35px 0;border-bottom:1px solid #dfdfdf}
.pop_space .section.first {padding-top:0}
.pop_space .section:last-child {border-bottom:0}
.pop_space .section .desc {font-size:15px;line-height:25px;white-space:pre-line;}
.pop_space .section .smp_announcement>dl {overflow:hidden;}
.pop_space .section .smp_announcement>dl dt {display:block;font-size:15px;font-weight:700;padding-bottom:6px}
.pop_space .section .smp_announcement>dl dd {line-height:19px;font-size:15px}
.pop_space .section .smp_announcement>dl dd + dt {padding-top:20px}
.pop_space .section .desc + .desc {padding-top:20px}
.pop_space .card_list {display:grid; width:100%; max-width:1200px; margin:0; padding:0; list-style:none; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:30px; box-sizing:border-box;}
.pop_space .card_body {padding-top:24px; width:100%; min-height:0;}
.pop_space .image_wrap {margin:20px 0;}
.pop_space .image_wrap img {width:100%; max-width:676px;}

/* 모달 레이아웃 */
.modal_cont {background-color: #fff;}
.modal_header {display:flex; justify-content:space-between; align-items:center; padding-bottom:40px; font-size:40px; font-weight:700; border-bottom:0;}
.modal_content {max-height:700px; overflow-y:auto; padding-right:10px;}
.btn-wrap {display:flex; justify-content:flex-end;}

/* 반응형 */
@media screen and (max-width: 767px) {
    .modal_header {font-size:18px; padding-bottom:24px;}
    .pop_space .card_list {grid-template-columns:1fr;}
    .pop_space .section {padding:24px 0 0 0;border:0px}
    .pop_space .tab_wrap {margin-bottom:0;}
    .pop_space .image_wrap {margin-bottom:0}
}
</style>