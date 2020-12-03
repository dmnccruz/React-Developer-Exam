import * as type from '../types';

export function getLocations(locations) {
    return {
        type: type.GET_LOCATIONS_REQUESTED,
        payload: locations,
    }
}

export function deleteLocation(id) {
    return {
        type: type.DELETE_LOCATION_REQUESTED,
        payload: id,
    }
}

export function addLocation(postInput) {
    return {
        type: type.ADD_LOCATION_REQUESTED,
        payload: postInput,
    }
}

export function updateLocation(postInput, id) {
    return {
        type: type.UPDATE_LOCATION_REQUESTED,
        payload: {postInput, id},
    }
}



