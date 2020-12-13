import { Action } from '@reduxjs/toolkit'
import { ActionsObservable, ofType } from 'redux-observable'
import { getLocations, getLocationsSucceed } from '../reducers/locationSlice'
import { map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

const getLocationsEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(getLocations),
    switchMap(() => of([{ id: 1, name: 'fake location 1' }]).pipe(map((resp: any) => getLocationsSucceed(resp)))),
  )

export default getLocationsEpic
