import React from 'react';
import { Card, Table, Typography, Space } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Message } from '../types/chat';

const { Text, Title } = Typography;

interface MessageBubbleProps {
  message: Message;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const renderContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <Text style={{ fontSize: '14px', lineHeight: '1.5' }}>
            {message.content}
          </Text>
        );
      
      case 'table':
        return (
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {message.content.title && (
              <Title level={5} style={{ margin: 0 }}>
                {message.content.title}
              </Title>
            )}
            <Table
              columns={message.content.columns}
              dataSource={message.content.data}
              pagination={false}
              size="small"
              scroll={{ y: 200 }}
              style={{ maxWidth: '100%' }}
            />
          </Space>
        );
      
      case 'chart':
        return (
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {message.title && (
              <Title level={5} style={{ margin: 0 }}>
                {message.title}
              </Title>
            )}
            <div style={{ width: '100%', height: '250px' }}>
              {!message.data || message.data.length === 0 ? (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  color: '#999'
                }}>
                  No data available for {message.chartType} chart
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                {message.chartType === 'bar' && (
                  <BarChart data={message.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={message.config?.xField || 'name'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={message.config?.yField || 'value'} fill="#8884d8" />
                  </BarChart>
                )}
                {message.chartType === 'line' && (
                  <LineChart data={message.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={message.config?.xField || 'name'} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={message.config?.yField || 'value'} stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                )}
                {(message.chartType === 'pie' || message.chartType === 'donut') && (
                  <PieChart>
                    <Pie
                      data={message.data}
                      cx="50%"
                      cy="50%"
                      innerRadius={message.chartType === 'donut' ? 40 : 0}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey={message.config?.angleField || 'value'}
                      fill="#8884d8"
                    >
                      {message.data && message.data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
                </ResponsiveContainer>
              )}
            </div>
          </Space>
        );
      
      default:
        return <Text>Unsupported message type</Text>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
      }}
    >
      <Card
        size="small"
        style={{
          maxWidth: '85%',
          minWidth: '120px',
          backgroundColor: isUser ? '#1890ff' : '#f5f5f5',
          borderRadius: '12px',
          border: 'none',
        }}
        bodyStyle={{
          padding: '12px',
          color: isUser ? '#fff' : '#000',
        }}
      >
        {renderContent()}
        <div
          style={{
            fontSize: '11px',
            opacity: 0.7,
            marginTop: '6px',
            textAlign: 'right',
            color: isUser ? '#fff' : '#666',
          }}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </Card>
    </div>
  );
};

export default MessageBubble;