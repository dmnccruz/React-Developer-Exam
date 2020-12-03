import * as type from '../types';

const initialState = {
    locations: [],
    loading: false,
    error: null,
}

export default function locations(state = initialState, action) {
    switch(action.type) {
        case type.GET_LOCATIONS_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_LOCATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                locations: action.locations,
            }
        case type.GET_LOCATIONS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        case type.DELETE_LOCATION_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.DELETE_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                locations: state.locations.filter(location => location.id !== action.payload),
            }
        case type.DELETE_LOCATION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        case type.ADD_LOCATION_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.ADD_LOCATION_SUCCESS:
            return {
                ...state,
                loading: false,
                locations: [action.payload, ...state.locations],
            }
        case type.ADD_LOCATION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }

        case type.UPDATE_LOCATION_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.UPDATE_LOCATION_SUCCESS:
            return Object.assign({}, state, {
                    locations: state.locations.map(location => {
                    return location.id === action.payload.id ? action.payload : location;
                })
            });
        case type.UPDATE_LOCATION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.message,
            }

            default:
                return state;
    }
}