import React from 'react';
import App from "./App";
import {getIdParam} from "../../common/paramsGetter";
import {render} from "../../common/appRender";

const id = getIdParam()
const app = <App id={id}/>
render(app)