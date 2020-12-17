import { Subject } from 'rxjs'
import { AjaxRequest, ajax, AjaxError } from 'rxjs/ajax'

const API_URL = 'http://localhost:8000/'

export const EMPTY_ACTION = {
  type: 'Empty',
}

export const APPLICATION_JSON = {
  'Content-Type': 'application/json',
}

export function _ajax(options: AjaxRequest, withCredential = true) {
  options.url = 'https://cors-anywhere.herokuapp.com/' + API_URL + options.url

  const accessToken = localStorage.getItem('access_token')
  options.headers = Object.assign(
    options.headers ? { ...options.headers } : {},
    withCredential
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : null,
  )

  return ajax(options)
}

type succeedSubjectType = { type: string; data?: any }

const succeedSubject = new Subject<succeedSubjectType>()

export const apiSucceed = {
  next: (type: string, data?: any) => succeedSubject.next({ type, data }),
  subscribe: (
    // Support single action in string format or multiple actions in array format
    actions: string | string[],
    observer: { next: (data: any, type?: string) => void },
  ) =>
    succeedSubject.subscribe({
      next: ({ type, data }: succeedSubjectType) => {
        // Observer subscribes next event
        if (observer.next) {
          if (actions === type || actions.includes(type)) {
            observer.next(data, type)
          }
        }
      },
      // subject.error & subject.complete will terminate this data stream, so we should not use it
    }),
}

type errorSubjectType = { type: string; error?: AjaxError }

const errorSubject = new Subject<errorSubjectType>()

export const apiError = {
  next: (type: string, error: any) => errorSubject.next({ type, error }),
  subscribe: (
    // Support single action in string format or multiple actions in array format
    actions: string | string[],
    observer: { next: (error: any, type?: string) => void },
  ) =>
    errorSubject.subscribe({
      next: ({ type, error }: errorSubjectType) => {
        if (actions === type || actions.includes(type)) {
          observer.next(error, type)
        }
      },
      // subject.error & subject.complete will terminate this data stream, so we should not use it
    }),
}
