import Vue from 'vue';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';


//var mapDiv = this.$refs.map;

/*var map = L.map(mapDiv).setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=oaBlvSrAtK2z6OOgCy9n', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
}).addTo(map);*/


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

