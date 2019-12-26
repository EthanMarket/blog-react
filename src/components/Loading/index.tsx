import { Spin } from 'antd'
import * as React from 'react'
const Loading = () => (
  <div className="spin" style={{
    textAlign: 'center',
    padding: 50,
    fontSize: 16,
  }}>
    <Spin size="large" />
  </div>
)

export default Loading
