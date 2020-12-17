import { Provider, useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import store from './store/store'

import Player from './Player/Player'
import VideoForm from './VideoForm/VideoForm'
import { APP_ID, CHANNEL_NAME, client, initClient, joinChannel, publishStream } from './client'
import { RootState } from './store/rootReducer'
import { Row, Col } from 'antd'

function App() {
  const { mainStream } = useSelector((state: RootState) => state.stream)
  const [isPlaying, setIsPlaying] = useState(false)
  const [streams, setStreams] = useState<AgoraRTC.Stream[]>([])

  useEffect(() => {
    // Subscribe to the remote stream when it is published
    client.on('stream-added', function (evt) {
      client.subscribe(evt.stream, { video: true, audio: true })
    })

    // Play the remote stream when it is subscribed
    client.on('stream-subscribed', function (evt) {
      const stream = evt.stream
      setStreams(prev => [...prev, stream])
    })

    // Remove the stream when the user leaves
    client.on('peer-leave', function ({ uid }) {
      setStreams(prev => prev.filter(s => s.getId() !== uid))
    })
  }, [])

  const onJoin = useCallback(async (values: any) => {
    await initClient(values.appId || APP_ID)
    await joinChannel(values.username, values.channel || CHANNEL_NAME)
    await publishStream()
    setIsPlaying(true)
  }, [])

  return (
    <main style={{ width: '100vw', height: '100vh', background: '#FAF9F8' }}>
      <VideoForm onReady={onJoin} />
      {isPlaying && (
        <>
          <h1>You</h1>
          <Player stream={mainStream} />
        </>
      )}
      <Row gutter={[16, 16]}>
        {streams.map(stream => (
          <Col span={8}>
            <h1>{stream.getId()}</h1>
            <Player stream={stream} />
          </Col>
        ))}
      </Row>
    </main>
  )
}

function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppWrapper
