<template>
    <div class="bookmarks-container">
        <div class="bookmarks">
            <div class="bookmark"
                 v-for="(bookmark, index) in bookmarks"
                 v-bind:key="index"
                 @click="navigateTo(bookmark.url)">
                <div v-if="edit" class="delete" @click="deleteBookmark(index)">
                    <i class="fas fa-trash"></i>
                </div>
                <div class="icon">
                    <img :src="bookmark.icon">
                </div>
                <div class="title">
                    <input v-if="edit" v-model="bookmark.title" @keyup.enter="saveBookmarks"/>
                    <input v-if="edit" v-model="bookmark.url" @keyup.enter="saveBookmarks"/>
                    <p v-else>{{ bookmark.title }}</p>
                </div>
            </div>
            <div class="bookmark new"
                 v-if="edit" >
                <div class="icon">
                    <div @click="toggleAdd()">
                        <i class="fas fa-plus"></i>
                    </div>
                    <div v-if="add">
                        <input ref="newIcon" type="file" accept="image/*">
                    </div>
                </div>
                <div class="title" v-if="add">
                    <input ref="newTitle" @keyup.enter="saveNewBookmark" />
                    <input ref="newURL" @keyup.enter="saveNewBookmark" />
                </div>
            </div>
        </div>
        <div id="edit" @click="edit = !edit">
            <i class="fas fa-edit"></i>
        </div>
    </div>
</template>

<script>
    let bookmarkStorage = {
        fetch: function () {
             return JSON.parse(window.localStorage.getItem('bookmarks') || '[]');
        },
        save: function (bookmarks) {
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        }

    };
    export default {
        name: "bookmark",
        data () {
            let data = {
                bookmarks: bookmarkStorage.fetch(),
                edit: false,
                add: false
            };

            if (data.bookmarks.length === 0) {
                data.bookmarks = [
                    { url: 'https://www.youtube.com/', title: 'Youtube', icon: require('../assets/bookmarks/yt_logo_rgb_light.png') },
                    { url: 'https://www.reddit.com/', title: 'Reddit', icon: require('../assets/bookmarks/Reddit_logo_full_1.png') },
                    { url: 'https://www.gitlab.com/', title: 'Gitlab', icon: require('../assets/bookmarks/wm_web.svg') },
                    { url: 'https://www.github.com/', title: 'Github', icon: require('../assets/bookmarks/GitHub-Logo.png') },
                ];
                bookmarkStorage.save(data.bookmarks);
            }
            return data;
        },
        methods: {
            navigateTo (url) {
                if (!this.edit) {
                    location.href = url;
                }
            },
            saveBookmarks () {
                bookmarkStorage.save(this.bookmarks);
                this.edit = false;
            },
            toggleAdd () {
                this.add = !this.add;
                if (this.add) {
                    this.$nextTick(() => this.$refs.newTitle.focus());
                }
            },
            saveNewBookmark () {
                const file = this.$refs.newIcon.files[0];

                const reader = new FileReader();

                reader.onload = (event) => {
                    this.add = false;
                    this.bookmarks.push({title: this.$refs.newTitle.value,
                        url: this.$refs.newURL.value,
                        icon: event.target.result});
                    this.saveBookmarks();
                };
                reader.readAsDataURL(file);
            },
            deleteBookmark (index) {
                this.bookmarks.splice(index, 1);
                bookmarkStorage.save(this.bookmarks);
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
        grid-auto-flow: column;
    }
    .bookmark {
        background-color: rgba(255, 255, 255, .5);
        box-shadow: 4px 4px 3px rgba(0, 0, 0, .5);
        width: 15em;
        margin: 5% auto;
        transition: all 150ms ease-out;
        cursor: pointer;
        position: relative;
    }
    .bookmark:hover {
        box-shadow: 8px 8px 5px rgba(0, 0, 0, .5);

    }
    .new .icon {
        display: block;
        margin: auto;
        height: 15vh;
        width: 15vh;
    }
    .icon {
        height: 15vh;
        width: 15vh;
        margin: auto;
        display: flex;
    }
    .icon * {
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

    .delete {
        position: absolute;
        right: 2px;
        top: 2px;
    }

</style>
