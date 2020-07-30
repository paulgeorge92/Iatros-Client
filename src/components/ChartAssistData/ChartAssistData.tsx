import React from 'react';
import { Col, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './ChartAssisData.css';

interface Props {
  title: string;
  caption?: string;
  value: string;
  color?: string;
}

export const ChartAssistData = (props: Props) => {
  return (
    <Col xs={24} md={12} lg={24}>
      <Row align="middle">
        <Col span={16}>
          <h5 className="chart-assist-title">{props.title}</h5>
          {props.caption ? <span className="chart-assist-caption">{props.caption}</span> : ''}
        </Col>
        <Col style={props.color ? { color: props.color, textAlign: 'right' } : { textAlign: 'right' }} span={8}>
          <div className="chart-assist-value">{props.value === undefined ? <LoadingOutlined /> : props.value}</div>
        </Col>
      </Row>
    </Col>
  );
};
