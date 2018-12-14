<template>
    <div class="clock">
        <div id="time">{{ time }}</div>
        <div id="date">{{ date }}</div>
    </div>
</template>

<script>
    let moment = require('moment');

    export default {
        name: "clock",
        data () {
            return {
                time: '',
                date: ''
            }
        },
        methods: {
            updateTime () {
                this.time = moment().format('HH:mm:ss');
            }
        },
        mounted () {
            this.updateTime();
            this.interval = setInterval(this.updateTime, 1000);

            this.date = moment().format('YYYY-MM-DD');
        },
        beforeDestroy () {
            clearInterval(this.interval);
        }
    }
</script>

<style scoped>
    .clock {
        grid-area: status;
    }
    #time {
        font-size: 4em;

    }

</style>