import { combineEpics } from 'redux-observable'
import getTasksEpic from './epics/getTasksEpic'
import newTasksEpic from './epics/newEpic'
import loginEpic from './epics/loginEpic'
import getCamerasEpic from './epics/getCamerasEpic'
import getLocationsEpic from './epics/getLocationsEpic'

const taskEpics = [getTasksEpic, newTasksEpic]
const userEpics = [loginEpic]
const cameraEpics = [getCamerasEpic]
const locationEpics = [getLocationsEpic]

const rootEpic = combineEpics(...taskEpics, ...userEpics, ...cameraEpics, ...locationEpics)

export default rootEpic
