export interface BaseMessage {
  id: string;
  timestamp: Date;
  sender: 'user' | 'system';
}

export interface TextMessage extends BaseMessage {
  type: 'text';
  content: string;
}

export interface TableMessage extends BaseMessage {
  type: 'table';
  content: {
    columns: Array<{
      title: string;
      dataIndex: string;
      key: string;
      width?: number;
    }>;
    data: Array<Record<string, any>>;
    title?: string;
  };
}

export interface ChartMessage extends BaseMessage {
  type: 'chart';
  chartType: 'bar' | 'line' | 'pie' | 'donut';
  data: Array<Record<string, any>>;
  title?: string;
  config?: {
    xField?: string;
    yField?: string;
    colorField?: string;
    angleField?: string;
    categoryField?: string;
  };
}

export type Message = TextMessage | TableMessage | ChartMessage;

export interface ChatboxProps {
  messages: Message[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
}