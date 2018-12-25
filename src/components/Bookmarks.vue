<template>
    <div class="bookmarks">
        <div class="bookmark"
             v-for="bookmark in bookmarks"
             v-bind:key="bookmark.id"
             v-on:click="navigateTo(bookmark.url)">
            <div class="icon">
                <img :src="bookmark.icon">
            </div>
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
                    { id: 1, url: 'https://www.youtube.com/', title: 'Youtube', icon: require('../assets/bookmarks/yt_logo_rgb_light.png') },
                    { id: 2, url: 'https://www.reddit.com/', title: 'Reddit', icon: require('../assets/bookmarks/Reddit_logo_full_1.png') },
                    { id: 3, url: 'https://www.gitlab.com/', title: 'Gitlab', icon: require('../assets/bookmarks/wm_web.svg') },
                    { id: 4, url: 'https://www.github.com/', title: 'Github', icon: require('../assets/bookmarks/GitHub-Logo.png') },
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
        transition: all 150ms ease-out;
        cursor: pointer;
    }
    .bookmark:hover {
        box-shadow: 8px 8px 5px rgba(0, 0, 0, .5);

    }
    .icon {
        height: 15vh;
        width: 15vh;
        margin: auto;
        display: flex;
    }
    .icon img {
        max-height: 15vh;
        max-width: 15vh;
        margin: auto;
    }
    .title {
        border-top: 1px solid rgb(150, 150, 150);
        padding: 1em;
        color: darkslategray;
    }

</style>