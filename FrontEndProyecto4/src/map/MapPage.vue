<template>
    <div>
        <h1> {{id}} </h1>
        <button class="btn btn-primary" v-on:click='startTracking'>Start tracking</button>
        <button class="btn btn-primary" v-on:click='stopTracking'>Stop tracking</button>
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