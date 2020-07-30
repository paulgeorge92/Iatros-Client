import React, { ReactNode } from 'react';
import Title from 'antd/lib/typography/Title';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface props {
  Title: string;
  breadcrumb: {
    title: ReactNode;
    link?: string;
  }[];
}
const TitleWithBreadcrumb = (props: props) => {
  return (
    <>
      <Title level={4}>{props.Title}</Title>
      <Breadcrumb separator=">">
        {props.breadcrumb.map((item) => {
          return <Breadcrumb.Item>{item.link ? <Link to={item.link}>{item.title}</Link> : <>{item.title}</>}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
    </>
  );
};
