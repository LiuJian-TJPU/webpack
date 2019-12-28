import React from 'react';
import { Input, Button } from 'antd';
import Home from './Home'

const App = () => (
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
    <Button type="link">Link</Button>
    <Input />
    <Home />
  </div>
)

export default App;