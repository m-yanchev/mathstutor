import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

const getId = () => {
    const queryString = document.location.search;
    const urlParams = new URLSearchParams(queryString);
    return Number(urlParams.get('id'))
}

ReactDOM.render(<App id={getId()}/>, document.getElementById('root'))