<template>
    <div id="guide_wrap">
        <GuideHeader />

        <div id="guide_container">
            <router-view :open-modal="openModal" :close-modal="closeModal" />
        </div>

        <GuideFooter />
    </div>
</template>

<script>
import GuideHeader from "@/guide/inc/guideHeader.vue";
import GuideFooter from "@/guide/inc/guideFooter.vue";

import modal from "@/assets/js/modal";

export default {
    name:'Guide_wrap',
    components:{
        GuideHeader,
        GuideFooter,
    },
    props:{
        isguide:{
            type:Boolean,
            default:true
        }
    },
    mounted() {
    },
    methods:{
        openModal(event) {
            const el = event.currentTarget;
            const type = el.dataset.type || "default";
            const popid = el.dataset.popid;

            modal.open(popid, type, el);
        },
        closeModal(event) {
            modal.close(event.currentTarget);
        }
    },
}
</script>

<style scope>
@import "@/assets/css/ui.css";
@import "@/assets/css/common.css";

#guide_container {margin:50px auto; padding:0 20px;}
#guide_wrap .contents > h2 {margin-bottom:20px; padding-bottom:5px; color:#009999; font-size:2.4rem; border-bottom:1px dotted #d4d4d4;}
#guide_wrap section + section {margin-top:20px; padding-top:20px; border-top:1px dashed #d4d4d4;}

#guide_wrap .design_box {margin-top:10px; padding:10px; border:1px solid #ddd;}

#guide_wrap .tit_wrap a {margin-left:5px; font-size:0; font-weight:500; vertical-align:middle; display:inline-block;}
#guide_wrap .tit_wrap a:before {padding-right:5px; color:#333; font-size:1.2rem; vertical-align:top; content:':'; display:inline-block;}
#guide_wrap .tit_wrap a:after {color:#333; font-size:1rem; content:'OPEN'; vertical-align:top; display:inline-block;}
#guide_wrap .tit_wrap a.active:after {content:'CLOSE';}
#guide_wrap #guide_container > .contents > section > .tit_wrap > strong.tit {margin-top:10px; padding:3px 10px; color:#fff; font-size:1.1rem; font-weight:500; line-height:1; background-color:#009999; border-radius:100px; display:inline-block;}

#guide_wrap .code_box {margin-top:10px; padding:20px; color:#fff; font-size:1.4rem; font-family:dotum !important; line-height:1.4; white-space:pre-wrap; background-color:#000; border:1px solid #ddd; display:none;}
#guide_wrap .code_box code {color:#fff; font-size:1.2rem;}

#guide_wrap .explain {margin-top:10px; margin-bottom:10px;}
#guide_wrap .explain li {padding-left:10px; font-size:1.2rem; position:relative;}
#guide_wrap .explain li strong {font-size:1.2rem;}
#guide_wrap .explain li + li {margin-top:5px;}
#guide_wrap .explain li:before {width:3px; height:3px; background-color:#666; content:''; position:absolute; top:10px; left:0; display:inline-block;}
#guide_wrap .explain li em {font-size:1.2rem;}

#guide_wrap .toolbar {margin-top:12px; display:flex; gap:4px;}
#guide_wrap .toolbar button {padding:4px 8px; color:#fff; background-color:#222; border-radius:3px;}
</style>
