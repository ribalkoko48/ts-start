import React, {FC, ChangeEvent, useCallback} from 'react';
import cn from 'classnames';
import * as style from './input.module.scss';

interface IPropsInput {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onEnter?: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    disabled?: boolean;
    className?: string;

    [key: string]: any;
}

export const Input: FC<IPropsInput> = (props: IPropsInput) => {
    const {className, onChange, onEnter, disabled, value, label, icon, ...otherProps} = props;

    const handleOnEnter = useCallback(event => {
        if (event.key === 'Enter' && onEnter) {
            onEnter(event);
        }
    }, [onEnter]);

    return (
        <div className={cn(style.wrapper, className)}>
            {icon && <div className={style.icon}>{icon}</div>}
            <input
                {...otherProps}
                className={style.input}
                value={value}
                disabled={disabled}
                onChange={onChange}
                onKeyDown={handleOnEnter}
            />
            {label && <label className={style.label}>{label}</label>}
        </div>
    )
};