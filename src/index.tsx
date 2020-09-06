import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from "./components/button";
import './global.scss';

ReactDOM.render(
    <div>Hello World
        <Button onClick={console.log} >Button</Button>
        <img src="../public/assets/1.jpg" />
    </div>,
    document.getElementById('root')
);