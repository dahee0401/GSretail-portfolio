<template>
    <div class="contents">
        <h2>Contents</h2>

        <div class="index">
            <dl>
                <dt>Info</dt>
                <dd>
                    <ul>
                        <li>language</li>
                        <li>Header Menu</li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>Elements</dt>
                <dd>
                    <ul>
                        <li>headline(h2~5)</li>
                        <li>breadcrumb</li>
                        <li>button</li>
                        <li>tab</li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>Forms</dt>
                <dd>
                    <ul>
                        <li>input / radio / check</li>
                        <li>selectbox</li>
                        <li><del>multi form</del></li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>List</dt>
                <dd>
                    <ul>
                        <li>search</li>
                        <li>pagination</li>
                        <li><del>board</del></li>
                        <li><del>thumb</del></li>
                        <li><del>gallery</del></li>
                    </ul>
                </dd>
            </dl>

            <dl>
                <dt>Popup</dt>
                <dd>
                    <ul>
                        <li>modal</li>
                        <li>toast</li>
                    </ul>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GuideIndex',
    props: {
        path:{
            type:String,
            default:'index'
        }
    }
}
</script>

<style scoped>
    .index {margin-top:-36px; margin-left:-16px; display:flex; flex-wrap:wrap;}
    .index dl {padding-top:36px; padding-left:16px; display:flex; flex:1; flex-direction:column;}
    .index dt {margin-bottom:12px; font-size:1.6rem; font-weight:700;}
    .index dd {padding:12px 16px; background-color:#eee; border-radius:4px; flex:1;}
    .index li {padding-left:10px; position:relative;}
    .index li + li {margin-top:6px;}
    .index li:before {width:4px; border-top:1px solid #222; content:''; position:absolute; top:11px; left:0;}
</style>
