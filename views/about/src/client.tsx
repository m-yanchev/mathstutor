import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

function Main() {

    React.useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    return <App/>
}

ReactDOM.hydrate(<Main/>, document.getElementById('root'))