<template>
    <div>
        <h1>Your routes</h1>
        <em v-if="routes.loading">Loading routes...</em>
        <span v-if="routes.error" class="text-danger">ERROR: {{routes.error}}</span>
        <ul v-if="routes.items">
            <li v-for="route in routes.items">
        		<router-link :to="{ name: 'ShowRoute', params: { id: route._id.$oid } }"> {{route.name}} </router-link>
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>

        <h2>Create route</h2>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name"> Route name</label>
                <input type="text" v-model="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && !name }" />
                <div v-show="submitted && !name" class="invalid-feedback"> Invalid route name</div>
            </div>            
            <div class="form-group">
                <button class="btn btn-primary"> Save route </button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name : '',
            submitted: false
        }
    },
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
        routes () {
            return this.$store.state.routes.all;
        }
    },
    created () {
        this.$store.dispatch('routes/getAll');
    },
    methods: {
        handleSubmit (e) {
            this.submitted = true;
            const { name } = this;
            const { dispatch } = this.$store;
            if (name) {
                dispatch('routes/createRoute', { name });
            }
            this.name = "";
            this.submitted = false;
            this.$forceUpdate();
        }
    }
};
</script>