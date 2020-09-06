import React, {FC, ReactNode, useEffect, useMemo, useState} from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import * as style from './modal.module.scss';

interface IPropsModal {
    isActive: boolean;
    children: ReactNode;
}

export const ANIMATION_DELAY = 1000;
let blockTimeoutId = null;
let activeTimeoutId = null;

export const Modal: FC<IPropsModal> = (props: IPropsModal) => {
    const {isActive, children} = props;
    const [block, setBlock] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);

    const isActiveMemo = useMemo(() => isActive, [isActive])
    useEffect(() => {
        if (isActiveMemo) {
            setBlock(true)
        } else {
            // delete portal block when animation end
            blockTimeoutId = setTimeout(() => {
                setBlock(false)
            }, ANIMATION_DELAY)
        }
    }, [isActiveMemo, setBlock]);
    useEffect(() => {
        if (isActiveMemo) {
            // start animation when portal block mount
            activeTimeoutId = setTimeout(() => {
                setActive(true)
            }, 10)
        } else {
            setActive(false)
        }
    }, [isActiveMemo, setActive]);
    useEffect(() => () => {
        // clear timers when modal unmount
        clearTimeout(blockTimeoutId)
        clearTimeout(activeTimeoutId)
    }, [])

    return block
        ? ReactDOM.createPortal(
            <div className={cn(style.modal)}>
                <div className={cn(style.content, active && style.active)}>
                    {children}
                </div>
            </div>,
            document.getElementById('root')
        )
        : null;
};