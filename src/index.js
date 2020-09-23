import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { App } from './pages/app';

ReactDOM.render(
    <BrowserRouter>
        <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <App />
        </SnackbarProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
