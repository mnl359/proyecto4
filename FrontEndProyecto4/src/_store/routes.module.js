import { routeService } from '../_services';
import { router } from '../_helpers';

export const routes = {
    namespaced: true, 
    state: {
        all : {},
        create: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            routeService.getAll()
                .then(
                    routes => commit('getAllSuccess', routes),
                    error => commit('getAllFailure', error)
                );
        },
        createRoute({ commit, dispatch }, { name }) {
            commit('createRouteRequest');

            routeService.createRoute(name);
            commit('createRouteSuccess');
            dispatch('routes/getAll', {}, { root: true });
        }
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, routes) {
            state.all = { items: routes };
        },
        getAllFailure(state, error) {
            state.all = { error };
        },
        createRouteRequest(state) {
            state.create = { saving: true };
        },
        createRouteSuccess(state) {
            state.create = {};
        }
    }
}