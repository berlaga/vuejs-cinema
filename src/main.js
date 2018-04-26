import Vue from 'vue';
import './style.scss';

import genres from './util/genres';
import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() {return this.$root.moment} });

import VueResource from 'vue-resource';
Vue.use(VueResource);

import {checkFilter} from './util/bus.js';

const bus = new Vue(); //global Vue event bus
Object.defineProperty(Vue.prototype, '$bus', { get() {return this.$root.bus} });

new Vue({

    el:'#app',
    data:{
        genre:[],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus: bus //global Vue bus, may just declare as bus
    },
 
    components: {
        MovieList,
        MovieFilter
    },

    created(){
        //load data
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });

        this.$bus.$on('check-filter', checkFilter.bind(this)); //bind this context to checkFilter function defined in bus.js
    }

});