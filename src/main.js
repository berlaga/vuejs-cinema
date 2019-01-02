import Vue from 'vue';
import './style.scss';

import genres from './util/genres';

import moment from 'moment-timezone';
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype, '$moment', { get() {return this.$root.moment} });

import VueResource from 'vue-resource';
Vue.use(VueResource);

import {checkFilter, setDay} from './util/bus';

const bus = new Vue(); //global Vue event bus
Object.defineProperty(Vue.prototype, '$bus', { get() {return this.$root.bus} });

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routs';
const router = new VueRouter({ routes });

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
 
    created(){
        //load data
        this.$http.get('/api').then(response => {
            this.movies = response.data;
        });

        this.$bus.$on('check-filter', checkFilter.bind(this)); //bind this context to checkFilter function defined in bus.js
        this.$bus.$on('set-day', setDay.bind(this)); 

    },
    router: router

});