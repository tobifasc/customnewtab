<template>
    <div class="bookmarks-container">
        <div class="bookmarks">
            <div class="bookmark"
                 v-for="bookmark in bookmarks"
                 v-bind:key="bookmark.id"
                 @click="navigateTo(bookmark.url)">
                <div class="icon">
                    <img :src="bookmark.icon">
                </div>
                <div class="title">
                    <input v-if="edit" v-model="bookmark.title"/>
                    <p v-else>{{ bookmark.title }}</p>
                </div>
            </div>
        </div>
        <div id="edit" @click="edit = !edit">
            <i class="fas fa-edit"></i>
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
                ],
                edit: false
            }
        },
        methods: {
            navigateTo (url) {
                if (!this.edit) {
                    location.href = url;
                }
            }
        }
    }
</script>

<style scoped>
    .bookmarks-container {
        position: relative;
        grid-area: top;
    }
    .bookmarks {
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

    #edit {
        position: absolute;
        bottom: 1em;
        right: 1em;
        height: 2em;
        width: 2em;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, .5);
        box-shadow: 4px 4px 3px rgba(0, 0, 0, .5);
        cursor: pointer;
        display: flex;
    }
    #edit i {
        margin: auto;
    }

</style>