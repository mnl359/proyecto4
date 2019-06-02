import { pointService } from '../_services';

export const points = {
    namespaced: true,
    actions: {
        startTracking({}, { id }) {
            pointService.startTracking(id);
        },
		stopTracking({}) {
			pointService.stopTracking();
		}
    },
    mutations: {
    }
}