import { ofType, ActionsObservable } from 'redux-observable'
import { map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { getTasksSucceed, newTasks } from '../reducers/taskSlice'

const newTasksEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(newTasks),
    switchMap(() =>
      of([{ name: 'new task 3' }, { name: 'new task 4' }]).pipe(map((resp: any) => getTasksSucceed(resp))),
    ),
  )

export default newTasksEpic
