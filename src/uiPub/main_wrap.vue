<template>
    <div id="container">
        <div id="content_wrap">
            <router-view v-slot="{ Component }">
                <component :is="Component" :lang="lang" />
            </router-view>
        </div>
    </div>
</template>

<script> 
export default {
    name: 'App',
    components: {
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
