import React, { FC, MouseEvent, ReactNode } from 'react';
import cn from 'classnames';
import * as style from './button.module.scss';

interface IPropsInput {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
}

export const Button: FC<IPropsInput> = (props: IPropsInput) => {
    const { children, disabled, className, onClick } = props;

    return (
        <button
            type="submit"
            className={cn(className, style.button, 'test')}
            disabled={disabled}
            onClick={onClick}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    onClick: undefined,
    disabled: undefined,
    className: undefined,
};
