import { combineEpics } from 'redux-observable'
import loginEpic from './epics/loginEpic'

const streamEpics = [loginEpic]

const rootEpic = combineEpics(...streamEpics)

export default rootEpic
