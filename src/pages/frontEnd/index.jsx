import React from 'react';
import { Switch, Redirect } from 'react-router';
import Content from '@/components/Content';
import authUtils from '@/utils/authUtils';

const componentsMap = {
    iReact: React.lazy(() => import('./iReact')),
    iVue: React.lazy(() => import('./iVue')),
}

const FrontEnd = (props) => {
    return (
        <Content name="frontEnd" componentsMap={componentsMap}>
            {/* <Switch>
                {authUtils.renderRouter(props.routes, componentsMap)}
                <Redirect from={props.path} to={authUtils.getRootRedirect(props.routes)} />
            </Switch> */}
        </Content>
    )
}

export default FrontEnd;