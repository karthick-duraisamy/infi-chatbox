import React, { useState } from 'react';
import { Layout, Card, Row, Col, Typography, Button, Space } from 'antd';
import { BarChartOutlined, TableOutlined, LineChartOutlined, PieChartOutlined } from '@ant-design/icons';
import Chatbox from './Chatbox';
import { Message } from '../types/chat';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'text',
      content: 'Welcome to the reporting dashboard! I can help you with various reports and analytics.',
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

  const addSampleData = (type: 'table' | 'bar' | 'line' | 'pie') => {
    let sampleMessage: Message;

    switch (type) {
      case 'table':
        sampleMessage = {
          id: Date.now().toString(),
          type: 'table',
          content: {
            title: 'Sales Performance Report',
            columns: [
              { title: 'Region', dataIndex: 'region', key: 'region' },
              { title: 'Sales', dataIndex: 'sales', key: 'sales' },
              { title: 'Target', dataIndex: 'target', key: 'target' },
              { title: 'Achievement', dataIndex: 'achievement', key: 'achievement' },
            ],
            data: [
              { key: '1', region: 'North', sales: '$125,000', target: '$120,000', achievement: '104%' },
              { key: '2', region: 'South', sales: '$98,000', target: '$100,000', achievement: '98%' },
              { key: '3', region: 'East', sales: '$87,000', target: '$90,000', achievement: '97%' },
              { key: '4', region: 'West', sales: '$112,000', target: '$110,000', achievement: '102%' },
            ],
          },
          timestamp: new Date(),
          sender: 'system',
        };
        break;
      case 'bar':
        sampleMessage = {
          id: Date.now().toString(),
          type: 'chart',
          chartType: 'bar',
          title: 'Quarterly Sales',
          data: [
            { name: 'Q1 2024', value: 4000 },
            { name: 'Q2 2024', value: 3000 },
            { name: 'Q3 2024', value: 5000 },
            { name: 'Q4 2024', value: 4500 },
          ],
          config: { xField: 'name', yField: 'value' },
          timestamp: new Date(),
          sender: 'system',
        };
        break;
      case 'line':
        sampleMessage = {
          id: Date.now().toString(),
          type: 'chart',
          chartType: 'line',
          title: 'User Growth',
          data: [
            { name: 'Jan', value: 1200 },
            { name: 'Feb', value: 1900 },
            { name: 'Mar', value: 1500 },
            { name: 'Apr', value: 2200 },
            { name: 'May', value: 2800 },
            { name: 'Jun', value: 3200 },
          ],
          config: { xField: 'name', yField: 'value' },
          timestamp: new Date(),
          sender: 'system',
        };
        break;
      case 'pie':
        sampleMessage = {
          id: Date.now().toString(),
          type: 'chart',
          chartType: 'pie',
          title: 'Budget Distribution',
          data: [
            { name: 'Marketing', value: 30 },
            { name: 'Development', value: 40 },
            { name: 'Operations', value: 20 },
            { name: 'Other', value: 10 },
          ],
          config: { angleField: 'value', colorField: 'name' },
          timestamp: new Date(),
          sender: 'system',
        };
        break;
    }

    setMessages(prev => [...prev, sampleMessage]);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Title level={3} style={{ color: '#fff', margin: 0 }}>
            Reporting Dashboard
          </Title>
        </div>
      </Header>
      
      <Content style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card>
              <Title level={4}>Dashboard Overview</Title>
              <Text>
                Welcome to the reporting dashboard. Use the chat assistant to generate reports, 
                view analytics, and interact with your data.
              </Text>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card>
              <Title level={4}>Quick Actions</Title>
              <Space wrap>
                <Button 
                  icon={<TableOutlined />} 
                  onClick={() => addSampleData('table')}
                >
                  Sample Table
                </Button>
                <Button 
                  icon={<BarChartOutlined />} 
                  onClick={() => addSampleData('bar')}
                >
                  Bar Chart
                </Button>
                <Button 
                  icon={<LineChartOutlined />} 
                  onClick={() => addSampleData('line')}
                >
                  Line Chart
                </Button>
                <Button 
                  icon={<PieChartOutlined />} 
                  onClick={() => addSampleData('pie')}
                >
                  Pie Chart
                </Button>
              </Space>
            </Card>
          </Col>
          
          <Col span={12}>
            <Card>
              <Title level={4}>Statistics</Title>
              <Space direction="vertical" size="small">
                <Text>Total Reports: 24</Text>
                <Text>Active Users: 156</Text>
                <Text>Data Points: 1,234</Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>

      <Chatbox 
        messages={messages} 
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default Dashboard;