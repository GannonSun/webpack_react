import React from 'react';
import { inject, observer } from 'mobx-react';
import { Breadcrumb } from 'antd';

const CustomBreadcrumb = ({ breadcrumb }) => {
    const breadcrumbVal = breadcrumb.getValue;

    return (
        <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
            {breadcrumbVal && breadcrumbVal.map(item => (
                <Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    )
}

export default inject('breadcrumb')(observer(CustomBreadcrumb));