<template>
    <div id="app">
        <Bookmarks class="container" />
        <Clock />
        <div class="container"></div>
        <div class="container"></div>
        <div class="container"></div>
        <div class="container"></div>
    </div>
</template>

<script>
import Bookmarks from './components/Bookmarks.vue'
import Clock from './components/Clock.vue'

export default {
    name: 'app',
    components: {
        Bookmarks,
        Clock
    },
}
</script>

<style>
#app {
    background: url("./assets/pexels-photo-1482777.jpeg") no-repeat center center fixed;
    background-size: cover;

    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 7em 1fr 1fr;
    grid-template-areas:
        "top top"
        "status status"
        "left right"
        "bottom bottom"
    ;
    grid-gap: 5% 5%;

    box-sizing: border-box;
    padding: 2%;
}

.container {
    background-color: rgba(255, 255, 255, .3);
    border-radius: 0.3em;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
}

</style>
