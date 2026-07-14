<template>
    <div class="contents">

        <h2>Popup</h2>

        <section>
            <h4>modal</h4>
            <ul class="explain">
                <li><strong>Modal 호출</strong> : @click="openModal" data-popid="호출할 아이디" data-type="타입" //사이즈 = full, small || dim 미노출 원할 시 타입에 no_dim 추가</li>
                <li><strong>data-cont</strong> : 모달 콘텐츠 호출하여 사용할 경우 사용 [data-cont="호출할 콘텐츠"] ※팝업 콘텐츠의 기본경로: /uiPub/popUp/</li>
            </ul>
            
            <p class="tit_wrap">
                <strong class="tit">Design</strong>
            </p>
            <div class="design_box">
                <button class="btn_small fill" @click="openModal" data-popid="sample_id" data-type="full" data-cont="modal_test">Sample Popup</button>
            </div>

            <p class="tit_wrap">
                <strong class="tit">Code</strong>
                <a href="#none">OPEN</a>
            </p>
            <pre class="code_box">
<code>&lt;template&gt;
    &lt;button @click="openModal" data-popid="팝업 아이디" data-type="크기(형태)" data-cont="호출할 팝업"&gt;Sample Popup&lt;/button&gt;

    &lt;!-- modal_wrap --&gt;
    &lt;div id="sample_id" class="modal_wrap"&gt;
        &lt;div class="modal_container"&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- //modal_wrap --&gt;
&lt;/template&gt;

&lt;script&gt;
import modal from "@/assets/js/modal";

export default {
    props: ["openModal"],
    methods: {
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default";
            const cont = el.dataset.cont;
            modal.open(popId, type, el, cont);
        },
        closeModal(event) {
            modal.close(event.currentTarget);
        }
    }
}
&lt;/script&gt;
</code></pre>
        </section>

        <section>
            <h4>toast</h4>
            <ul class="explain">
                <li><strong>Toast 호출</strong> : @click="toast" data-type="자동:auto / 수동:confirm" data-time="토스트팝업 닫히는 시간(type="auto"인 경우만 적용 : default = 3s)"</li>
                <li><strong>노출 문구</strong> :  data-msg="노출문구"</li>
            </ul>
            
            <p class="tit_wrap">
                <strong class="tit">Design</strong>
            </p>
            <div class="design_box">
                <div class="btnBox">
                    <button class="btn_small fill" @click="toast" data-type="auto" data-msg="Auto Toast" data-time="3000">Toast Auto</button>
                    <button class="btn_small fill" @click="toast" data-type="confirm" data-msg="Confirm Toast">Toast Confirm</button>
                </div>
            </div>

            <p class="tit_wrap">
                <strong class="tit">Code</strong>
                <a href="#none">OPEN</a>
            </p>
            <pre class="code_box">
<code>&lt;template&gt;
    &lt;!-- Auto --&gt;
    &lt;button class="btn_small fill" @click="toast" data-type="auto" data-msg="Auto Toast" data-time="3000"&gt;Toast Auto&lt;/button&gt;

    &lt;!-- Confirm --&gt;
    &lt;button class="btn_small fill" @click="toast" data-type="confirm" data-msg="Confirm Toast"&gt;Toast Confirm&lt;/button&gt;
&lt;/template&gt;

&lt;script&gt;
import modal from "@/assets/js/modal";

export default {
    props: ["openModal"],
    methods: {
        toast(event) {
            const el = event.currentTarget;
            const type = el.dataset.type || 'auto';
            const msg = el.dataset.msg;
            const time = el.dataset.time;
            modal.toast(type, msg, time);
        }
    }
}
&lt;/script&gt;
</code></pre>
        </section>

        <!-- modal_wrap -->
        <div id="sample_id" class="modal_wrap">
            <div class="modal_container"></div>
        </div>
        <!-- //modal_wrap -->


    </div>
</template>

<script>
import modal from "@/assets/js/modal";

export default {
    name: 'popup',
    props: ["openModal"],
    components: {
    },
    data() {
            return {
            }
    },
    mounted() {
        /* 소스보기 */
        $('.tit_wrap a').click(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').parent().siblings('.code_box').slideUp();
            } else {
                $(this).addClass('active').parent().siblings('.code_box').slideDown();
            }
        });
    },
    methods: {
        openModal(event) {
            const el = event.currentTarget;
            const popId = el.dataset.popid;
            const type = el.dataset.type || "default";
            const cont = el.dataset.cont;
            modal.open(popId, type, el, cont);
        },
        closeModal(event) {
            modal.close(event.currentTarget);
        },
        toast(event) {
            const el = event.currentTarget;
            const type = el.dataset.type || 'auto';
            const msg = el.dataset.msg;
            const time = el.dataset.time;
            modal.toast(type, msg, time);
        }
    }
}
</script>

<style scoped>
</style>
