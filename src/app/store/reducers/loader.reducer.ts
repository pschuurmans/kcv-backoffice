import { createReducer, on } from '@ngrx/store';
import { activate, deactivate } from '../actions/loader.actions';

export const initialState = false;

export const loaderReducer = createReducer(initialState,
    on(activate, state => true),
    on(deactivate, state => false)
);
