import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

const getId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id')
}

ReactDOM.render(<App id={getId()}/>, document.getElementById('root'))