<template>
    <div id="container">
        <BreadCrumb />
        <div id="content_wrap">
            <router-view v-slot="{ Component }">
                <component :is="Component" :lang="lang" />
            </router-view>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';

export default {
    name: 'App',
    components: {
        BreadCrumb
    },
    props: {
        lang: String
    },
    data() {
        return {}
    },
    mounted(){
    }
}
</script>

<style scoped>
</style>
