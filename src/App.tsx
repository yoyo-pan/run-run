import { Provider } from 'react-redux'

import store from './store/store'

import AgoraRTC from 'agora-rtc-sdk'
import { Button } from 'antd'
import { useCallback } from 'react'
import './app.css'

// Handle errors.
let handleError = function (err: any) {
  console.log('Error: ', err)
}

// Add video streams to the container.
function addVideoStream(elementId: string) {
  // Query the container to which the remote stream belong.
  let remoteContainer = document.getElementById('remote-container')
  // Creates a new div for every stream
  let streamDiv = document.createElement('div')
  // Assigns the elementId to the div.
  streamDiv.id = elementId
  // Takes care of the lateral inversion
  streamDiv.style.transform = 'rotateY(180deg)'
  // Adds the div to the container.
  remoteContainer?.appendChild(streamDiv)
}

// Remove the video stream from the container.
function removeVideoStream(elementId: string) {
  let remoteDiv = document.getElementById(elementId)
  remoteDiv?.parentNode?.removeChild(remoteDiv)
}

let client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'h264',
})

const APP_ID = '3795a482d0bf4f22b6ba4db6c8a09a3b'

client.init(APP_ID)

const TEMP_TOKEN =
  '0063795a482d0bf4f22b6ba4db6c8a09a3bIACqny7Wrdf3xxakGHRv3oHClBdRUuAn+dWzXnDWEHWD2I94pKkAAAAAEADQTRPKJjfXXwEAAQAmN9df'

const CHANNEL_NAME = 'Run-run'
// Subscribe to the remote stream when it is published
client.on('stream-added', function (evt) {
  client.subscribe(evt.stream, { video: true, audio: true }, handleError)
})
// Play the remote stream when it is subscribed
client.on('stream-subscribed', function (evt) {
  let stream = evt.stream
  let streamId = String(stream.getId())
  addVideoStream(streamId)
  stream.play(streamId)
})

// Remove the corresponding view when a remote user unpublished.
client.on('stream-removed', function (evt) {
  let stream = evt.stream
  let streamId = String(stream.getId())
  stream.close()
  removeVideoStream(streamId)
})
// Remove the corresponding view when a remote user leaves the channel.
client.on('peer-leave', function ({ uid, reason }) {
  console.log('remote user left ', uid, 'reason: ', reason)
})

let localStream = AgoraRTC.createStream({
  audio: true,
  video: true,
})

function App() {
  const join = useCallback(() => {
    // Join a channel
    client.join(
      TEMP_TOKEN,
      CHANNEL_NAME,
      null,
      undefined,
      (uid: number) => {
        // Create a local stream
        console.log(uid)
      },
      handleError,
    )
  }, [])

  const createStream = useCallback(() => {
    // Initialize the local stream
    localStream.init(() => {
      // Play the local stream
      localStream.play('me')
      // Publish the local stream
      client.publish(localStream, handleError)
    }, handleError)
  }, [])

  return (
    <Provider store={store}>
      <main style={{ width: '100vw', height: '100vh', background: '#FAF9F8' }}>
        <h4>Local video</h4>
        <div id="me"></div>
        <h4>Remote video</h4>
        <div id="remote-container"></div>
        <Button type="primary" onClick={join}>
          Join
        </Button>
        <Button type="primary" onClick={createStream}>
          Create stream
        </Button>
      </main>
    </Provider>
  )
}

export default App
