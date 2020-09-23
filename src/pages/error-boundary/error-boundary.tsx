import React, { Component } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as style from './error-boundary.module.scss';

interface IErrorBoundaryProps {
    children: React.ReactNode;
}

export class ErrorBoundary extends Component<IErrorBoundaryProps> {
    state = {
        isErrorContent: false,
        errorMessage: '',
    };

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        if (error) {
            this.setState({
                isErrorContent: true,
                errorMessage: error,
            });
        }
    }

    render() {
        const { isErrorContent, errorMessage } = this.state;
        const { children } = this.props;

        return isErrorContent ? <div className={style.wrapper}>{errorMessage}</div> : children;
    }
}
