import React from 'react';
import './index.less';

const Loading = () => {
    return (
        <div className="loadingPage">
            <div className="loadingContent">
                <div className="loadingProcess">
                    <div className="loadingRect"></div>
                    <div className="loadingRect"></div>
                    <div className="loadingRect"></div>
                    <div className="loadingRect"></div>
                    <div className="loadingRect"></div>
                </div>
                <div className="loadingText">
                    <span>加载中...</span>
                </div>
            </div>
        </div>
    )
}

export default Loading;