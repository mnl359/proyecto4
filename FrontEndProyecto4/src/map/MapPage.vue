<template>
    <div>
		<div>
            <h1> Recorded points </h1>
            <em v-if="points.loading"> Loading routes...</em>
            <span v-if="points.error" class="text-danger">ERROR: {{routes.error}}</span>
            <ul v-if="points.items">
                <li v-for="point in points.items">
                    {{point.lat}}, {{point.lng}}
                </li>
            </ul>
        </div>         
        <div>
            <button class="btn btn-primary" v-on:click='startTracking'>Start tracking</button>
            <button class="btn btn-primary" v-on:click='stopTracking'>Stop tracking</button>
        </div>
    </div>    
</template>
<script>
export default {
    data () {
        return {
            id: '',
        }
    },
    created () {
    	this.id = this.$route.params.id;
      	this.$store.dispatch('points/getAll', {route_id: this.$route.params.id});
    },
  	computed: {
        points () {
            return this.$store.state.points.all;
        }
    },
    methods: {
		startTracking() {
            const { dispatch } = this.$store;
            dispatch('points/startTracking', {'id' : this.id} );
        },
      
		stopTracking() {
            const { dispatch } = this.$store;
            dispatch('points/stopTracking');
        }
    }
}
</script>