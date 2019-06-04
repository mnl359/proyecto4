import { pointService } from '../_services';

export const points = {
    namespaced: true,
	state: {
		all: {},
		create: {}
	},
    actions: {
		getAll({commit}, {route_id}) {
			commit('getAllRequest');
        	pointService.getAll(route_id)
            	.then(
                    route => commit('getAllSuccess', route),
                    error => commit('getAllFailure', error)
                );
		},
        startTracking({}, { id }) {
            pointService.startTracking(id);
        },
		stopTracking({}) {
			pointService.stopTracking();
		}
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, route) {
            state.all = { items: route.points, name:route.name };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}