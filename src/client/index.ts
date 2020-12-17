import AgoraRTC from 'agora-rtc-sdk'

export const APP_ID = process.env.REACT_APP_AGORA_APP_ID!
export const CHANNEL_NAME = process.env.REACT_APP_AGORA_CHANNEL_NAME!
export const localStream = AgoraRTC.createStream({
  audio: true,
  video: true,
})
const TEMP_TOKEN = process.env.REACT_APP_AGORA_TOKEN!
export const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'h264',
})

export const initClient = (appId: string) => {
  return Promise.race([
    new Promise((resolve, reject) => client.init(appId, () => resolve('ok'), reject)),
    new Promise((_, reject) => setTimeout(reject, 10 * 1000)),
  ])
}

export const joinChannel = (uid: string, channel: string) => {
  return Promise.race([
    new Promise((resolve, reject) => client.join(TEMP_TOKEN, channel, uid, undefined, uid => resolve(uid), reject)),
    new Promise((_, reject) => setTimeout(reject, 10 * 1000)),
  ])
}

export const publishStream = () => {
  return Promise.race([
    new Promise((resolve, reject) => {
      localStream.init(() => {
        client.publish(localStream, reject)
        resolve('ok')
      })
    }),
    new Promise((_, reject) => setTimeout(reject, 10 * 1000)),
  ])
}
