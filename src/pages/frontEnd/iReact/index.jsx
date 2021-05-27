import React from 'react';
import { Switch } from 'react-router';
import authUtils from '@/utils/authUtils';

const componentsMap = {
    classComponent: React.lazy(() => import('./classComponent')),
    hooksComponent: React.lazy(() => import('./hooksComponent')),
}

const IReact = (props) => {
    return (
        <Switch>
            {authUtils.renderRouter(props.routes, componentsMap)}
        </Switch>
    )
}

export default IReact;