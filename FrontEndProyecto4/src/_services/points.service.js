import config from 'config';
import { authHeader } from '../_helpers';

export const pointService = {
    startTracking,
    stopTracking,
	getAll
};

function getAll(route_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/routes/` + route_id, requestOptions).then(handleResponse);
}

var tracker, ROUTE_ID;
function startTracking(route_id) {
    tracker = setInterval(trackLocation, 5000);
	ROUTE_ID = route_id;
}
function stopTracking() {
    clearInterval(tracker);
    ROUTE_ID = '';
}
function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } 
}

function savePosition(position) {  
    console.log(ROUTE_ID);
    const requestOptions = {
        method: 'POST',
        headers: Object.assign({}, authHeader(), { 'Content-Type': 'application/json' }),        
        body: JSON.stringify({ 'point' : {
              'lat' : position.coords.latitude,
              'lng' : position.coords.longitude,
			  'route_id': ROUTE_ID
			}
		})
    };

    return fetch(`${config.apiUrl}/points`, requestOptions)
        .then(handleResponse)
        .then(point => {
			return point;
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