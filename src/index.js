import React from 'react';
import ReactDom from 'react-dom';
import Router from './router';

class App extends React.Component {
    render() {
        return (
            <div>
                <Router />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById("app"));