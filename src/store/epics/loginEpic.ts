import { PayloadAction } from '@reduxjs/toolkit'
import { ofType, ActionsObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { login, loginSucceed } from '../reducers/userSlice'
import { LoginPayload } from './types'

import { apiSucceed, APPLICATION_JSON, EMPTY_ACTION, _ajax } from './utils'

const loginEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(login),
    switchMap(({ payload }: PayloadAction<LoginPayload>) =>
      _ajax(
        {
          url: 'auth/jwt/create/',
          method: 'POST',
          headers: {
            ...APPLICATION_JSON,
          },
          body: payload,
        },
        false,
      ).pipe(
        map((resp: any) => {
          apiSucceed.next(loginSucceed.type, resp.response)
          return EMPTY_ACTION
        }),
      ),
    ),
  )

export default loginEpic
