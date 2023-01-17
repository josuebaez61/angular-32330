import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const setAuthenticatedUser = createAction(
  '[AUTH] SET AUTHENTICATED USER',
  props<{ authenticatedUser: User }>()
)

export const unsetAuthenticatedUser = createAction(
  '[AUTH] UNSET AUTHENTICATED USER',
)