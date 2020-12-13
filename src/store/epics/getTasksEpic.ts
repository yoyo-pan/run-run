import { ofType, ActionsObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { getTasks, getTasksSucceed } from '../reducers/taskSlice'
import { Action } from '@reduxjs/toolkit'
import { _ajax } from './utils'

const getTasksEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(getTasks),
    switchMap(() =>
      _ajax({
        url: 'api/camera-tasks',
        method: 'GET',
      }).pipe(map((resp: any) => getTasksSucceed(resp.response))),
    ),
  )

export default getTasksEpic
