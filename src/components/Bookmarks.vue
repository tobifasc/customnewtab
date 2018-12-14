<template>
    <div class="bookmarks">
        <div class="bookmark"
             v-for="bookmark in bookmarks"
             v-bind:key="bookmark.id"
             v-on:click="navigateTo(bookmark.url)">
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
                    { id: 1, url: 'https://www.youtube.com/', title: 'Youtube' },
                    { id: 2, url: 'https://www.reddit.com/', title: 'Reddit' },
                    { id: 3, url: 'https://www.gitlab.com/', title: 'Gitlab' },
                    { id: 4, url: 'https://www.github.com/', title: 'Github' },
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

</style>