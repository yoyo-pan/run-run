import { Input, Button, Form } from 'antd'
import { useCallback } from 'react'
import { APP_ID, CHANNEL_NAME } from '../client'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

interface Props {
  onReady: (values: any) => void
}

export default function VideoForm({ onReady }: Props) {
  const onFinish = useCallback(
    values => {
      // Do some validation here
      onReady(values)
    },
    [onReady],
  )

  return (
    <Form {...layout} name="basic" onFinish={onFinish}>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="Yoyo" />
      </Form.Item>
      <Form.Item label="App ID" name="appId">
        <Input width="50%" placeholder={APP_ID} />
      </Form.Item>
      <Form.Item label="Channel" name="channel">
        <Input width="50%" placeholder={CHANNEL_NAME} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Join
        </Button>
      </Form.Item>
    </Form>
  )
}
