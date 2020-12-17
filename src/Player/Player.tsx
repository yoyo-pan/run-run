import StreamPlayer from 'agora-stream-player'
import { Row } from 'antd'
import React, { useCallback, useState } from 'react'
import { AudioOutlined, VideoCameraOutlined } from '@ant-design/icons'

interface Props {
  stream: AgoraRTC.Stream
}

export default function Player({ stream }: Props) {
  const [isAudioMute, toggleAudio] = useState(false)
  const [isVideoMute, toggleVideo] = useState(false)

  const onMuteAudio = useCallback(() => {
    if (isAudioMute) {
      stream.unmuteAudio()
    } else {
      stream.muteAudio()
    }
    toggleAudio(!isAudioMute)
  }, [stream, toggleAudio, isAudioMute])

  const onMuteVideo = useCallback(() => {
    if (isVideoMute) {
      stream.unmuteVideo()
    } else {
      stream.muteVideo()
    }
    toggleVideo(!isVideoMute)
  }, [stream, toggleVideo, isVideoMute])

  return (
    <>
      <StreamPlayer stream={stream} fit="contain" label="local" />
      <br />
      <Row>
        <AudioOutlined style={{ fontSize: '40px', opacity: isAudioMute ? 0.5 : 1 }} onClick={onMuteAudio} />
        <VideoCameraOutlined style={{ fontSize: '40px', opacity: isVideoMute ? 0.5 : 1 }} onClick={onMuteVideo} />
      </Row>
    </>
  )
}
