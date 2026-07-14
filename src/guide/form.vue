<template>
    <div class="contents">

        <h2>Form</h2>

        <section>
            <h4>Inputs</h4>
            <ul class="explain">
                <li><strong>type</strong> : text/password/check/radio/switch 선택 // default="text"</li>
                <li><strong>isswitch</strong> : true/false ※checkbox의 스위치 형태 // default="false"</li>
            </ul>

            <p class="tit_wrap">
                <strong class="tit">Design</strong>
            </p>

            <ul class="toolbar">
                <li><button class="current" @click="tool_select('text')">Text</button></li>
                <li><button @click="tool_select('text_err')">Text Error</button></li>
                <li><button @click="tool_select('error')">Error Message</button></li>
                <li><button @click="tool_select('pw')">Password</button></li>
                <li><button @click="tool_select('check')">Checkbox</button></li>
                <li><button @click="tool_select('radio')">Radio</button></li>
                <li><button @click="tool_select('isswitch')">Switch</button></li>
            </ul>
            <div class="design_box">
                <Inputs :type="input_opt.type" :isswitch="input_opt.isswitch" :placeholder="input_opt.Placeholder" text="Label" :isDisabled="_disabled" :isError="input_opt.isError" :errText="input_opt.err_text" :class="input_opt.class" />
            </div>

            <p class="tit_wrap">
                <strong class="tit">Code</strong>
                <a href="#none">OPEN</a>
            </p>
            <pre class="code_box">
<code>&lt;Inputs {{ input_opt.opt }} /&gt;</code></pre>
        </section>

        <section>
            <h4>Textarea</h4>
            <ul class="explain">
                <li><strong>v-model</strong> : 입력 값</li>
                <li><strong>label</strong> · <strong>#label</strong> : 필드 안내(선택)</li>
                <li><strong>placeholder</strong> · <strong>rows</strong> · <strong>maxlength</strong>(0이면 미사용 · 1 이상이면 메타 행 우측에 글자수 표시)</li>
                <li><strong>hint</strong> : 도움말(선택) · <strong>isError</strong> + <strong>errText</strong> : 오류(Inputs와 동일)</li>
            </ul>

            <p class="tit_wrap">
                <strong class="tit">Design</strong>
            </p>

            <ul class="toolbar">
                <li><button :class="{ current: ta_tool === 'default' }" @click="ta_select('default')">기본</button></li>
                <li><button :class="{ current: ta_tool === 'hint' }" @click="ta_select('hint')">도움말</button></li>
                <li><button :class="{ current: ta_tool === 'error' }" @click="ta_select('error')">오류</button></li>
                <li><button :class="{ current: ta_tool === 'disabled' }" @click="ta_select('disabled')">비활성</button></li>
            </ul>
            <div class="design_box form_textarea_guide">
                <Textarea
                    id="guide_textarea"
                    v-model="textareaVal"
                    name="guide_textarea"
                    :label="ta_opt.label"
                    :placeholder="ta_opt.placeholder"
                    :hint="ta_opt.hint"
                    :is-error="ta_opt.isError"
                    :err-text="ta_opt.errText"
                    :is-disabled="ta_opt.isDisabled"
                    :rows="ta_opt.rows"
                    :maxlength="ta_opt.maxlength"
                />
            </div>

            <p class="tit_wrap">
                <strong class="tit">Code</strong>
                <a href="#none">OPEN</a>
            </p>
            <pre class="code_box">
<code>&lt;Textarea
    v-model="body"
    label="문의 내용"
    name="inquiry_body"
    placeholder="내용을 입력해 주세요"
    hint="최대 500자까지 입력할 수 있습니다."
    :rows="6"
    :maxlength="500"
/&gt;
&lt;!-- :maxlength &gt; 0 이면 메타 행 우측에 현재/최대 글자수 자동 출력 --&gt;

&lt;!-- 오류 --&gt;
&lt;Textarea
    v-model="body"
    label="비고"
    :is-error="true"
    err-text="필수 입력 항목입니다."
/&gt;</code></pre>
        </section>

        <section>
            <h4>Select</h4>
            <ul class="explain">
                <li><strong>v-model</strong> : 선택한 옵션값 적용</li>
                <li><strong>initMsg</strong> : placeholder // default = "선택하세요."</li>
            </ul>

            <p class="tit_wrap">
                <strong class="tit">Design</strong>
            </p>

            <div class="design_box">
                <SelectBox :options="options" v-model="selected" initMsg="선택해주세요" />
            </div>

            <p class="tit_wrap">
                <strong class="tit">Code</strong>
                <a href="#none">OPEN</a>
            </p>
            <pre class="code_box">
<code>&lt;template&gt;
    &lt;SelectBox :options="[
        { value: '', label: '선택하세요' },
        { value: 'A', label: '옵션 A' },
        { value: 'B', label: '옵션 B' }
    ]" v-model="selected" initMsg="선택해주세요" /&gt;
&lt;/template&gt;

&lt;script&gt;
    data() {
        return {
            selected: "" //초기 선택값 지정할땐 vaule 값 입력
        };
    }
&lt;/script&gt;</code></pre>
        </section>

    </div>
</template>

<script>
import Inputs from "@/components/Inputs.vue";
import SelectBox from "@/components/SelectBox.vue";
import Textarea from "@/components/Textarea.vue";

export default {
    name: "form",
    components: {
        Inputs,
        SelectBox,
        Textarea,
    },

    data() {
        return {
            // 현재 선택된 버튼 index
            selectedIndex: 0,

            // Inputs 옵션 상태
            input_opt: {
                type: "text",
                isswitch: false,
                Placeholder: "문구를 입력해주세요",
                isError: false,
                err_text: "",
                class: "",
                opt: 'type="text" placeholder="문구를 입력해주세요"',
            },

            // toolbar 버튼 리스트
            toolbarButtons: [
                "text",
                "text_err",
                "error",
                "pw",
                "check",
                "radio",
                "isswitch",
            ],

            /* select */
            selected: "", //초기 선택값 지정할땐 vaule 값 입력
            options: [
                { value: "opt1", label: "text 01" },
                { value: "opt2", label: "text 02" },
                { value: "opt3", label: "text 03" },
                { value: "opt4", label: "text 04" },
                { value: "opt5", label: "text 05" },
                { value: "opt6", label: "text 06" },
            ],

            /* textarea */
            textareaVal: "",
            ta_tool: "default",
            ta_opt: {
                label: "내용",
                placeholder: "내용을 입력해 주세요",
                hint: "",
                isError: false,
                errText: "",
                isDisabled: false,
                rows: 5,
                maxlength: 100,
            },
        };
    },
    mounted() {
        /* 소스보기 */
        $('.tit_wrap a').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active').parent().siblings('.code_box').slideUp();
            } else {
                $(this).addClass('active').parent().siblings('.code_box').slideDown();
            }
        });
    },
    methods: {
        tool_select(type, index) {
            // 선택된 버튼 index
            this.selectedIndex = index;

            // 기본 초기화
            this.input_opt.isswitch = false;
            this.input_opt.isError = false;
            this.input_opt.err_text = "";
            this.input_opt.class = "";
            this.input_opt.Placeholder = "문구를 입력해주세요";

            switch (type) {
            case "text":
                this.input_opt.type = "text";
                this.input_opt.opt = `type="${this.input_opt.type}" placeholder="${this.input_opt.Placeholder}"`;
                break;

            case "text_err":
                this.input_opt.type = "text";
                this.input_opt.isError = true;
                this.input_opt.opt = `type="${this.input_opt.type}" placeholder="${this.input_opt.Placeholder}" isError="true"`;
                break;

            case "error":
                this.input_opt.type = "text";
                this.input_opt.isswitch = false;
                this.input_opt.isError = true;
                this.input_opt.err_text = "에러 노출 문구";
                this.input_opt.opt = `type="${this.input_opt.type}" placeholder="${this.input_opt.Placeholder}" isError="${this.input_opt.isError}" errText="${this.input_opt.err_text}"`;
                break;

            case "pw":
                this.input_opt.type = "password";
                this.input_opt.Placeholder = "비밀번호를 입력해주세요";
                this.input_opt.opt = `type="${this.input_opt.type}" placeholder="${this.input_opt.Placeholder}"`;
                break;

            case "check":
                this.input_opt.type = "checkbox";
                this.input_opt.opt = `type="${this.input_opt.type}" text="Label"`;
                break;

            case "radio":
                this.input_opt.type = "radio";
                this.input_opt.opt = `type="${this.input_opt.type}" text="Label"`;
                break;

            case "isswitch":
                this.input_opt.type = "checkbox";
                this.input_opt.isswitch = true;
                this.input_opt.opt = `type="${this.input_opt.type}" isswitch="${this.input_opt.isswitch}" text="Label"`;
                break;
            }
        },

        ta_select(type) {
            this.ta_tool = type;
            this.ta_opt.isError = false;
            this.ta_opt.errText = "";
            this.ta_opt.hint = "";
            this.ta_opt.isDisabled = false;
            this.ta_opt.label = "내용";
            this.ta_opt.placeholder = "내용을 입력해 주세요";
            this.ta_opt.rows = 5;
            this.ta_opt.maxlength = 100;

            switch (type) {
            case "default":
                break;
            case "hint":
                this.ta_opt.hint = "도움말·입력 안내 문구는 hint로 표시합니다.";
                break;
            case "error":
                this.ta_opt.isError = true;
                this.ta_opt.errText = "입력 형식을 확인해 주세요.";
                break;
            case "disabled":
                this.ta_opt.isDisabled = true;
                break;
            }
        },
    },
};
</script>

<style scoped>

</style>