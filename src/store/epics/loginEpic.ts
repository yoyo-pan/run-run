import { PayloadAction } from '@reduxjs/toolkit'
import { ofType, ActionsObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { login, loginSucceed } from '../reducers/streamSlice'

import { apiSucceed, APPLICATION_JSON, EMPTY_ACTION, _ajax } from './utils'

const loginEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(login),
    switchMap(({ payload }: PayloadAction<{ username: string; password: string }>) =>
      _ajax({
        url: 'v1/api/login',
        method: 'POST',
        headers: {
          ...APPLICATION_JSON,
        },
        body: payload,
      }).pipe(
        map((resp: any) => {
          apiSucceed.next(loginSucceed.type, resp.response)
          return EMPTY_ACTION
        }),
      ),
    ),
  )

export default loginEpic
