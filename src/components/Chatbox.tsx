import React, { useState, useRef, useEffect } from 'react';
import { Card, Input, Button, Space, Typography, Spin, Empty } from 'antd';
import { SendOutlined, MessageOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { ResizableBox } from 'react-resizable';
import MessageBubble from './MessageBubble';
import { ChatboxProps } from '../types/chat';
import 'react-resizable/css/styles.css';

const { Text } = Typography;

const Chatbox: React.FC<ChatboxProps> = ({ 
  messages, 
  onSendMessage, 
  isLoading = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [dimensions, setDimensions] = useState({ width: 400, height: 500 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <Button
          type="primary"
          size="large"
          icon={<MessageOutlined />}
          onClick={toggleChatbox}
          style={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      <ResizableBox
        width={dimensions.width}
        height={dimensions.height}
        minConstraints={[350, 400]}
        maxConstraints={[600, 800]}
        onResizeStop={(e, data) => {
          setDimensions({ width: data.size.width, height: data.size.height });
        }}
        resizeHandles={['nw', 'n', 'w']}
        handleStyles={{
          nw: {
            cursor: 'nw-resize',
            width: '20px',
            height: '20px',
            left: '-10px',
            top: '-10px',
          },
          n: {
            cursor: 'n-resize',
            height: '10px',
            top: '-5px',
            left: '10px',
            right: '10px',
          },
          w: {
            cursor: 'w-resize',
            width: '10px',
            left: '-5px',
            top: '10px',
            bottom: '10px',
          },
        }}
      >
        <Card
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            overflow: 'hidden',
          }}
          bodyStyle={{ padding: 0, height: '100%' }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid #f0f0f0',
              backgroundColor: '#fafafa',
            }}
          >
            <Space>
              <MessageOutlined style={{ color: '#1890ff' }} />
              <Text strong>Chat Assistant</Text>
            </Space>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<MinusOutlined />}
                onClick={toggleChatbox}
                style={{ color: '#666' }}
              />
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={toggleChatbox}
                style={{ color: '#666' }}
              />
            </Space>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              height: `${dimensions.height - 120}px`,
              backgroundColor: '#fff',
            }}
          >
            {messages.length === 0 ? (
              <Empty
                description="No messages yet"
                style={{ marginTop: '50px' }}
              />
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}
            {isLoading && (
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Spin size="small" />
                <Text style={{ marginLeft: '8px', color: '#666' }}>
                  Typing...
                </Text>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #f0f0f0',
              backgroundColor: '#fafafa',
            }}
          >
            <Space.Compact style={{ width: '100%' }}>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleKeyPress}
                placeholder="Type a message..."
                disabled={isLoading}
                style={{ borderRadius: '6px' }}
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                style={{ borderRadius: '6px' }}
              />
            </Space.Compact>
          </div>
        </Card>
      </ResizableBox>
    </div>
  );
};

export default Chatbox;