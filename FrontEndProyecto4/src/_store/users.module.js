import { userService } from '../_services';
import { router } from '../_helpers';

export const users = {
    namespaced: true,
    state: {
        all: {},
        create: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            userService.getAll()
                .then(
                    users => commit('getAllSuccess', users),
                    error => commit('getAllFailure', error)
                );
        },
        createUser({ commit }, { name, email, password }) {
            commit('createUserRequest');

            userService.signup(name, email, password);
            router.push('/');
        }
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, users) {
            state.all = { items: users };
        },
        getAllFailure(state, error) {
            state.all = { error };
        },
        createUserRequest(state) {
            state.create = { loading: true };
        },
        createUserSuccess(state, user) {
            state.create = {};
        },
        createUserFailure(state, error) {
            state.create = { error };
        }
    }
}
