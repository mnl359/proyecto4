<template>
    <div>
        <h2> Recorded points </h2>
            <div v-for="point in points.items">
                {{ addPoint(point.lat, point.lng) }}
            </div>
        {{displayPoly() }}
        <div id="mapid" ref="mapid" style=" width: 600px; height: 600px"> </div> 
        <div>
            <button class="btn btn-primary" v-on:click='startTracking'>Start tracking</button>
            <button class="btn btn-primary" v-on:click='stopTracking'>Stop tracking</button>
        </div>
        <router-link to="/">Back</router-link>
    </div>    
</template>
<script>
var map;
var poly = [];
export default {    
    data () {
        return {
            id: '',
        }
    },
    created () {
    	this.id = this.$route.params.id;
      	this.$store.dispatch('points/getAll', {route_id: this.$route.params.id});
        poly = [];
        map = '';
    },
    mounted: function () {
        this.$nextTick(function () {
            poly = [];
            var mapContainer = this.$refs.mapid;
            map = L.map(mapContainer).setView([6.2442, -75.5812], 13);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        })
    },
 	computed: {
        points () {
            return this.$store.state.points.all;
        }
    },
    methods: {
        displayPoly () {
            if(poly.length > 0) {
                var polyLine = L.polyline(poly, {color: 'red'}).addTo(map);
                map.fitBounds(polyLine.getBounds());
            }
        },
        addPoint (lat, lng) {
            poly.push([lat, lng]);
        },
        refresh () {
            this.$forceUpdate();
        },
		startTracking () {
            const { dispatch } = this.$store;
            dispatch('points/startTracking', {'id' : this.id} );
        },
      
		stopTracking () {
            const { dispatch } = this.$store;
            dispatch('points/stopTracking');
        }
    }
}
</script>