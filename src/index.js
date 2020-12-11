import React from 'react';
import ReactDom from 'react-dom';
import Home from './home';

class App extends React.Component {
    render() {
        return (
            <div>
                <Home />
            </div>
        )
    }
}

ReactDom.render(<App />, document.getElementById("app"));