import React from 'react';
import { Result } from 'antd';

const NoFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            style={{ width: '100%', height: '100%' }}
        />
    )
}

export default NoFound;