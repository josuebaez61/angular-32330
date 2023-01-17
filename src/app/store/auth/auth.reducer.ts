import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { setAuthenticatedUser, unsetAuthenticatedUser } from "./auth.actions";
import produce from "immer";

export interface AuthState {
  authenticatedUser: User | null;
}

const initialState: AuthState = {
  authenticatedUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(setAuthenticatedUser, (state, { authenticatedUser }) => {
    // state.authenticatedUser = authenticatedUser
    // const copyState = { ...state };
    // copyState.authenticatedUser = authenticatedUser;
    // return copyState

    // npm i immer
    return produce(state, draft => {
      draft.authenticatedUser = authenticatedUser
    })
  }),
  on(unsetAuthenticatedUser, (state) => ({ ...state, authenticatedUser: null }))
)