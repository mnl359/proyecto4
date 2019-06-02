<template>
    <div>
        <h1>Your routes</h1>
        <em v-if="routes.loading">Loading routes...</em>
        <span v-if="routes.error" class="text-danger">ERROR: {{routes.error}}</span>
        <ul v-if="routes.items">
            <li v-for="route in routes.items">
                {{route.name}}
            </li>
        </ul>
        <p>
            <router-link to="/login">Logout</router-link>
        </p>
    </div>
</template>

<script>
export default {
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
    }
};
</script>