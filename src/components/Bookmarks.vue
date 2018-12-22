<template>
    <div class="bookmarks">
        <div class="bookmark"
             v-for="bookmark in bookmarks"
             v-bind:key="bookmark.id"
             v-on:click="navigateTo(bookmark.url)">
            <img class="icon" :src="bookmark.icon">
            <div class="title">
                {{ bookmark.title }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bookmark",
        data () {
            return {
                bookmarks: [
                    { id: 1, url: 'https://www.youtube.com/', title: 'Youtube', icon: require('../assets/logo.png') },
                    { id: 2, url: 'https://www.reddit.com/', title: 'Reddit', icon: require('../assets/logo.png') },
                    { id: 3, url: 'https://www.gitlab.com/', title: 'Gitlab', icon: require('../assets/logo.png') },
                    { id: 4, url: 'https://www.github.com/', title: 'Github', icon: require('../assets/logo.png') },
                ]
            }
        },
        methods: {
            navigateTo (url) {
                location.href=url;
            }
        },
    }
</script>

<style scoped>
    .bookmarks {
        grid-area: top;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .bookmark {
        background-color: rgba(255, 255, 255, .5);
        box-shadow: 4px 4px 3px rgba(0, 0, 0, .5);
        width: 15em;
        margin: 5% auto;
    }
    .icon {
        height: 15vh;
    }
    .title {
        border-top: 1px solid rgb(150, 150, 150);
        padding: 1em;
        color: darkslategray;
    }

</style>