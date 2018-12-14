<template>
    <div class="bookmarks">
    </div>
</template>

<script>
    export default {
        name: "bookmarks"
    }
</script>

<style scoped>
    .bookmarks {
        grid-area: top;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

</style>