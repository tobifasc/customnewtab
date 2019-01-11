<template>
    <div class="weather">
        <div class="day"
             v-for="(weather, index) in weather.weather"
             v-bind:key="index" >
            <p>{{ kelvinToCelcius(weather.main.temp) }}</p>
        </div>

    </div>
</template>

<script>
    import request from 'request';
    let moment = require('moment');

    let weatherData = {
        fetch: function () {
            if (!this.isValid()) {
                request('https://api.openweathermap.org/data/2.5/forecast?id=2761369&APPID=' + process.env.VUE_APP_OWM_KEY, {json: true}, (error, response, body) => {
                    if (error) {
                        return error;
                    }
                    localStorage.setItem('weather', JSON.stringify({time: Date.now(), weather: this.getDailyFromHourly(body.list)}));
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
        },
        getDailyFromHourly: function (list) {
            let oldDate = null;
            let oldEntry = null;
            let weather = [];
            let gotWeather = false;
            list.forEach((entry) => {
                let currentDate = moment(entry.dt * 1000);
                if (oldDate == null ||
                    !oldDate.isSame(currentDate, 'day')) {
                    // new Day
                    if (!gotWeather && oldEntry != null) {
                        weather.push(oldEntry);
                    }
                    oldDate = currentDate;
                    oldEntry = entry;
                    gotWeather = false;
                }
                if (currentDate.hour() >= 12 && !gotWeather) {
                    weather.push(entry);
                    gotWeather = true;
                }
            });
            return weather;
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
            kelvinToCelcius (temp) {
                return Math.round(temp - 273.15);
            }
        }
    }
</script>

<style scoped>
    .weather {
        display: grid;
        grid-auto-flow: column;
    }

</style>