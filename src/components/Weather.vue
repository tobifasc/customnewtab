<template>
    <div class="weather-container">
        <div class="weather">
            <div class="day"
                 v-for="(weather, index) in weather.daily.data.slice(0, 5)"
                 v-bind:key="index">
                <skycon :condition="weather.icon"></skycon>
                <p>{{ Math.round(weather.temperatureMax) }}°</p>
                <p>{{ Math.round(weather.temperatureMin) }}°</p>
                <p>{{ moment.unix(weather.time).utcOffset(2).format("dddd") }}</p>
            </div>
        </div>
        <a id="attribution" href="https://darksky.net/poweredby/">
            <img :src="require('../assets/darksky.png')">
        </a>

    </div>
</template>

<script>
    import request from 'request';
    let moment = require('moment');

    let weatherData = {
        fetch: function () {
            if (!this.isValid()) {
                request('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/' + process.env.VUE_APP_DARKSKY_KEY + '/48.208176,16.373819?units=si&exclude=currently,minutely,hourly,alerts,flags', {json: true}, (error, response, body) => {
                    if (error) {
                        return error;
                    }
                    localStorage.setItem('weather', JSON.stringify({time: Date.now(), daily: body.daily}));
                });
            }
            return JSON.parse(localStorage.getItem('weather'));
        },
        isValid: function () {
            let weather = JSON.parse(localStorage.getItem('weather') || '[]');
            if ((weather.length === 0) ||
                ((Date.now() - (1000 * 3600)) > weather.time)) { //hourly
                return false;
            }
            return true;
        }
    };
    export default {
        name: "weather",
        data () {
            return {
                weather: [],
                moment: moment
            }
        },
        created () {
            this.weather = weatherData.fetch();
        },
        mounted () {
        },
        methods: {
        }
    }
</script>

<style scoped>
    .weather-container {
        position: relative;
    }
    .weather {
        display: grid;
        grid-auto-flow: column;
    }
    #attribution {
        position: absolute;
        bottom: 2em;
        right: 3em;
        height: 2em;
        width: 3em;
        display: flex;
    }

</style>