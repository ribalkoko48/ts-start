import React, { FC } from 'react';
import cn from 'classnames';
import * as style from './loader.module.scss';

interface ILoaderProps {
    width?: number; // в px
    color?: string;
}

export const Loader: FC<ILoaderProps> = (props: ILoaderProps) => {
    const { width = 32, color = '#af3d7f' } = props;

    const loaderStyle = {
        width: `${width}px`,
        height: `${width}px`,
        left: `calc(50% - ${width / 2}px)`,
        top: `calc(50% - ${width / 2}px)`,
    };

    return (
        <div style={loaderStyle} className={style.loader}>
            <div style={{ borderBottom: `3px solid ${color}` }} className={cn(style.inner, style.one)} />
            <div style={{ borderRight: `3px solid ${color}` }} className={cn(style.inner, style.two)} />
            <div style={{ borderTop: `3px solid ${color}` }} className={cn(style.inner, style.three)} />
        </div>
    );
};
