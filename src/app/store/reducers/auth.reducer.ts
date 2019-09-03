import { createReducer, on } from '@ngrx/store';
import { login, logout } from '../actions/auth.actions';

export const initialState = false;

// tslint:disable-next-line:variable-name
const _authReducer = createReducer(initialState,
    on(login, state => true),
    on(logout, state => false)
);


export function authReducer(state, action) {
    return _authReducer(state, action);
}
