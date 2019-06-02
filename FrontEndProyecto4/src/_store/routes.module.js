import { routeService } from '../_services';

export const routes = {
    namespaced: true, 
    state: {
        all : {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            routeService.getAll()
                .then(
                    routes => commit('getAllSuccess', routes),
                    error => commit('getAllFailure', error)
                );
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
        }
    }
}