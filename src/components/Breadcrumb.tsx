import React, { ReactNode } from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  title?: string;
  link?: string;
  icon?: ReactNode;
}
interface BreadcrumbProps {
  className?: string;
  items: Array<BreadcrumbItem>;
}
const Breadcrumb = (props: BreadcrumbProps) => {
  return (
    <AntdBreadcrumb separator=">" className={props.className}>
      {props.items.map((item, index) => {
        return (
          <AntdBreadcrumb.Item key={index}>
            {item.link ? (
              <Link to={item.link}>
                {item.icon || <></>}
                {item.title ? <span>{item.title}</span> : <></>}
              </Link>
            ) : (
              <>
                {item.icon || <></>}
                {item.title ? <span>{item.title}</span> : <></>}
              </>
            )}
          </AntdBreadcrumb.Item>
        );
      })}
    </AntdBreadcrumb>
  );
};

export default Breadcrumb;
