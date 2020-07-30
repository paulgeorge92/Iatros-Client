import React, { ReactNode } from 'react';
import { Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './StatCard.css';

interface StatCardProps {
  className?: string;
  icon?: ReactNode;
  title?: string;
  value?: any;
  iconColor?: string;
}

export const StatCard = (props: StatCardProps) => {
  return (
    <Card className={`custom-card ${props.className || ''}`}>
      <div className="content">
        <h2>{props.title}</h2>
        <p>{props.value === undefined ? <LoadingOutlined /> : props.value}</p>
      </div>
      <div className="icon" style={props.iconColor ? { color: props.iconColor } : {}}>
        {props.icon}
      </div>
    </Card>
  );
};
