import React from 'react';
import { Router, BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Home from './home';
import Blog from './blog';
import Code from './code';

const AppRouter = () => {
    return (
        <BrowserRouter>
            {/* <ul>
                <li><Link to="/home">home</Link></li>
                <li><Link to="/blog">blog</Link></li>
                <li><Link to="/code/codeInfo/422020122108215061">code</Link></li>
            </ul> */}
            <div>
                {/* Switch只显示一个组件。加exact表示精确匹配。如果不加exact，/xxx也会匹配到 */}
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/codeInfo/:code" component={Code} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default AppRouter;