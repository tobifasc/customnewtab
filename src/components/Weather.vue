<template>
    <div class="weather">
        <div class="day"
             v-for="(weather, index) in weather.daily.data.slice(0, 5)"
             v-bind:key="index">
            <p>{{ Math.round(weather.temperatureMax) }}°</p>
            <p>{{ Math.round(weather.temperatureMin) }}°</p>
        </div>

    </div>
</template>

<script>
    import request from 'request';

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
                weather: []
            }
        },
        created () {
            this.weather = weatherData.fetch();
        },
        methods: {
        }
    }
</script>

<style scoped>
    .weather {
        display: grid;
        grid-auto-flow: column;
    }

</style>