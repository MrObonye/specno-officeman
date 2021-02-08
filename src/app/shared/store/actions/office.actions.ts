import { Action } from '@ngrx/store';
import { Office } from '../../models';

export const GET_OFFICES = '[ALL] Get All Offices';
export const GET_OFFICES_SUCCESS = '[ALL] Offices Success';
export const GET_OFFICES_ERROR = '[ALL] Offices Error';

export const CREATE_OFFICE = '[CREATE] Create Office';
export const CREATE_OFFICE_SUCCESS = '[CREATE] Create Office Success';
export const CREATE_OFFICE_ERROR = '[CREATE] Create Office Error';

export const DELETE_OFFICE = '[DELETE] Delete Office';
export const DELETE_OFFICE_SUCCESS = '[DELETE] Delete Office Success';
export const DELETE_OFFICE_ERROR = '[DELETE] Delete Office Error';

export const UPDATE_OFFICE = '[UPDATE] Update Office';
export const UPDATE_OFFICE_SUCCESS = '[UPDATE] Update Office Success';
export const UPDATE_OFFICE_ERROR = '[UPDATE] Update Office Error';

/****************************************
 * GET all the offices
 ****************************************/
export class GetAllOffices implements Action {
    readonly type = GET_OFFICES;
}

export class GetAllOfficesSuccess implements Action {
    readonly type = GET_OFFICES_SUCCESS;

    constructor(public payload: Office[]) {
    }
}
export class GetAllOfficesError implements Action {
    readonly type = GET_OFFICES_ERROR;

    constructor(public payload: Error) {
    }
}

/****************************************
 * ADD new Office
 ****************************************/
export class AddOffice implements Action {
    readonly type = CREATE_OFFICE;

    constructor(public payload: Office) {
    }
}

export class AddOfficeSuccess implements Action {
    readonly type = CREATE_OFFICE_SUCCESS;

    constructor() {
    }
}

export class AddOfficeError implements Action {
    readonly type = CREATE_OFFICE_ERROR;

    constructor(public payload: Error) {
    }
}
/****************************************
 * REMOVE an office by id
 ****************************************/
export class RemoveOffice implements Action {
    readonly type = DELETE_OFFICE;

    constructor(public payload: string) {
    }
}

export class RemoveOfficeSuccess implements Action {
    readonly type = DELETE_OFFICE_SUCCESS;

    constructor(public payload: Office) {
    }
}

export class RemoveOfficeError implements Action {
    readonly type = DELETE_OFFICE_ERROR;

    constructor(public payload: Error) {
    }
}

/****************************************
 * UPDATE office by id
 ****************************************/
export class UpdateOffice implements Action {
    readonly type = UPDATE_OFFICE;

    constructor(public payload: Office) {
    }
}

export class UpdateOfficeSuccess implements Action {
    readonly type = UPDATE_OFFICE_SUCCESS;
}

export class UpdateOfficeError implements Action {
    readonly type = UPDATE_OFFICE_ERROR;

    constructor(public payload: Error) {
    }
}
export type officeActions
    = GetAllOffices
    | GetAllOfficesSuccess
    | GetAllOfficesError
    | AddOffice
    | AddOfficeSuccess
    | AddOfficeError
    | RemoveOffice
    | RemoveOfficeSuccess
    | RemoveOfficeError
    | UpdateOffice
    | RemoveOfficeSuccess
    | RemoveOfficeError;
