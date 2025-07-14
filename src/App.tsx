import React from 'react';
import { ConfigProvider } from 'antd';
import Dashboard from './components/Dashboard';
import 'antd/dist/reset.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <Dashboard />
    </ConfigProvider>
  );
}

export default App;