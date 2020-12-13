import { Action } from '@reduxjs/toolkit'
import { ActionsObservable, ofType } from 'redux-observable'
import { getCameras, getCamerasSucceed } from '../reducers/cameraSlice'
import { map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

const getCamerasEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(getCameras),
    switchMap(() =>
      of([
        { id: 11, name: 'fake Camera 1' },
        { id: 12, name: 'fake Camera 2' },
      ]).pipe(map((resp: any) => getCamerasSucceed(resp))),
    ),
  )

export default getCamerasEpic
