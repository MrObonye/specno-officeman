import * as officeActions from '../actions/office.actions';
import { AppAction } from '../../../app.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Office } from '../../models';

export interface State {
    data: Office[];
    selected: Office;
    action: string;
    done: boolean;
    error?: Error;
}

const initialState: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null
};

export function reducer(state = initialState, action: AppAction): State {
    // ...state create immutable state object
    switch (action.type) {
        /*************************
   * GET all offices actions
   ************************/

        case officeActions.GET_OFFICES:
            return {
                ...state,
                action: officeActions.GET_OFFICES,
                done: false,
                error: null
            };
        case officeActions.GET_OFFICES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                done: true,
                error: null
            };
        case officeActions.GET_OFFICES_ERROR:
            return {
                ...state,
                done: true,
                error: action.payload
            };
        /*************************
* Create office actions
************************/
        case officeActions.CREATE_OFFICE:
            return {
                ...state,
                data: action.payload,
                action: officeActions.CREATE_OFFICE,
                done: false,
                error: null
            };
        case officeActions.CREATE_OFFICE_SUCCESS:

            return {
                ...state,
                data: action.payload,
                done: true,
                error: null
            };

        case officeActions.CREATE_OFFICE_ERROR:
            return {
                ...state,
                done: true,
                error: action.payload
            };

        /*************************
           * Update office actions
           ************************/
        case officeActions.UPDATE_OFFICE:
            return {
                ...state,
                action: officeActions.UPDATE_OFFICE,
                data: action.payload,
                done: true,
                error: null
            };
        case officeActions.UPDATE_OFFICE_SUCCESS:
            {
                const key = state.data.filter(office => office.key === state.selected.key);
                return {
                    ...state,
                    data: action.payload,
                    done: false,
                    error: null
                };
            }


        case officeActions.UPDATE_OFFICE_ERROR:
            return {
                ...state,
                done: true,
                error: action.payload
            };
        /*************************
      * Delete office actions
      ************************/
        case officeActions.DELETE_OFFICE:
            return {
                ...state,
                data: action.payload,
                action: officeActions.DELETE_OFFICE,
                done: false,
                error: null

            };
        case officeActions.DELETE_OFFICE_SUCCESS:
            const data = state.data.filter(office => office.key === state.selected.key);
            return {
                ...state,
                data,
                selected: null,
                error: null,
                done: true

            };
        case officeActions.DELETE_OFFICE_ERROR:
            return {
                ...state,
                selected: null,
                done: true,
                error: action.payload
            };

    }
    return state;
}
/*************************
 * SELECTORS
 ************************/
export const getOfficesState = createFeatureSelector<State>('offices');
export const getOffices = createSelector(getOfficesState, (state: State) => state.data);
export const isDeleted = createSelector
    (getOfficesState, (state: State) =>
        state.action === officeActions.DELETE_OFFICE && state.done && !state.error
    );
export const isCreated = createSelector(getOfficesState, (state: State) =>
    state.action === officeActions.CREATE_OFFICE && state.done && !state.error);
export const isUpdated = createSelector(
    getOfficesState, (state: State) =>
    state.action === officeActions.UPDATE_OFFICE && state.done && !state.error);

export const getDeleteError = createSelector(getOfficesState, (state: State) => {
    return state.action === officeActions.DELETE_OFFICE
    ? state.error : null;
});
export const getCreatorError = createSelector(getOfficesState, (state: State) => {
    return state.action === officeActions.CREATE_OFFICE ? state.error : null;
});
export const getUpdateError = createSelector(getOfficesState, (state: State) => {
    return state.action === officeActions.UPDATE_OFFICE ? state.error : null;
});
export const getOfficesError = createSelector(getOfficesState, (state: State) => {
    return state.action === officeActions.GET_OFFICES ? state.error : null;
});
