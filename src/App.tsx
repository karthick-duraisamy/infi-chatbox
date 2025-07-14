
import React, { useState } from 'react';
import { ConfigProvider } from 'antd';
import Chatbox from './components/Chatbox';
import { Message } from './types/chat';
import 'antd/dist/reset.css';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'text',
      content: 'Welcome! I can help you with various reports and analytics.',
      timestamp: new Date(),
      sender: 'system',
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'text',
      content,
      timestamp: new Date(),
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate processing and response
    setTimeout(() => {
      let systemResponse: Message;

      if (content.toLowerCase().includes('table') || content.toLowerCase().includes('data')) {
        systemResponse = {
          id: (Date.now() + 1).toString(),
          type: 'table',
          content: {
            title: 'Sample Report Data',
            columns: [
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
              { title: 'Growth', dataIndex: 'growth', key: 'growth' },
              { title: 'Status', dataIndex: 'status', key: 'status' },
            ],
            data: [
              { key: '1', name: 'Product A', revenue: '$45,000', growth: '+12%', status: 'Active' },
              { key: '2', name: 'Product B', revenue: '$32,000', growth: '+8%', status: 'Active' },
              { key: '3', name: 'Product C', revenue: '$28,000', growth: '-3%', status: 'Inactive' },
              { key: '4', name: 'Product D', revenue: '$52,000', growth: '+15%', status: 'Active' },
            ],
          },
          timestamp: new Date(),
          sender: 'system',
        };
      } else if (content.toLowerCase().includes('chart') || content.toLowerCase().includes('bar')) {
        systemResponse = {
          id: (Date.now() + 1).toString(),
          type: 'chart',
          chartType: 'bar',
          title: 'Monthly Revenue',
          data: [
            { name: 'Jan', value: 400 },
            { name: 'Feb', value: 300 },
            { name: 'Mar', value: 500 },
            { name: 'Apr', value: 280 },
            { name: 'May', value: 590 },
            { name: 'Jun', value: 320 },
          ],
          config: { xField: 'name', yField: 'value' },
          timestamp: new Date(),
          sender: 'system',
        };
      } else if (content.toLowerCase().includes('line')) {
        systemResponse = {
          id: (Date.now() + 1).toString(),
          type: 'chart',
          chartType: 'line',
          title: 'Growth Trend',
          data: [
            { name: 'Q1', value: 240 },
            { name: 'Q2', value: 320 },
            { name: 'Q3', value: 180 },
            { name: 'Q4', value: 450 },
          ],
          config: { xField: 'name', yField: 'value' },
          timestamp: new Date(),
          sender: 'system',
        };
      } else if (content.toLowerCase().includes('pie')) {
        systemResponse = {
          id: (Date.now() + 1).toString(),
          type: 'chart',
          chartType: 'pie',
          title: 'Market Share',
          data: [
            { name: 'Product A', value: 35 },
            { name: 'Product B', value: 25 },
            { name: 'Product C', value: 20 },
            { name: 'Product D', value: 20 },
          ],
          config: { angleField: 'value', colorField: 'name' },
          timestamp: new Date(),
          sender: 'system',
        };
      } else {
        systemResponse = {
          id: (Date.now() + 1).toString(),
          type: 'text',
          content: 'I can help you with various reports including tables, charts, and analytics. Try asking for "show me a table", "create a bar chart", "line chart", or "pie chart".',
          timestamp: new Date(),
          sender: 'system',
        };
      }

      setMessages(prev => [...prev, systemResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <Chatbox 
          messages={messages} 
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </ConfigProvider>
  );
}

export default App;
