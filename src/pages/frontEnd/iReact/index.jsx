import React from 'react';
import { Switch } from 'react-router';
import authUtils from '@/utils/authUtils';

const IReact = (props) => {
    return (
        <Switch>
            {authUtils.renderRouter(props.routes, true)}
        </Switch>
    )
}

export default IReact;