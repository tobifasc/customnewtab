<template>
    <div class="clock">
        <span>{{ time }}</span>
    </div>
</template>

<script>
    let moment = require('moment');

    export default {
        name: "clock",
        data () {
            return {
                time: ''
            }
        },
        methods: {
            updateTime () {
                this.time = moment().format('LTS');
            }
        },
        mounted () {
            this.updateTime();
            this.interval = setInterval(this.updateTime, 1000);
        },
        beforeDestroy () {
            clearInterval(this.interval);
        }
    }
</script>

<style scoped>
    .clock {
        grid-area: status;
        font-size: 4em;

    }

</style>