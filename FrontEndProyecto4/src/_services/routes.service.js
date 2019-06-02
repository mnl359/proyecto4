import config from 'config';
import { authHeader } from '../_helpers';

export const routeService = {
    getAll,
    createRoute
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/routes`, requestOptions).then(handleResponse);
}


function createRoute(name) {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign({}, authHeader(), { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ 'route': { name } })
    }
    /* http://localhost:3000/routes**/
    return fetch(`${config.apiUrl}/routes`, requestOptions)
    .then(handleResponse)
    .then(route => {
        return route;
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}