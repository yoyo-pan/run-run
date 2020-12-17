import StreamPlayer from 'agora-stream-player'

interface Props {
  stream: AgoraRTC.Stream
}

export default function Player({ stream }: Props) {
  return (
    <>
      <StreamPlayer stream={stream} fit="contain" label="local" />
    </>
  )
}
