import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import * as style from './tabs.module.scss';

const Tab = ({ currentId, label, id, onClick, disabled }) => (
    <div
        role="presentation"
        onClick={(event) => onClick && onClick({ ...event, label, id })}
        className={cn(style.tab, currentId === id && style.tabActive, disabled && style.tabDisabled)}>
        {label}
    </div>
);

export class Tabs extends PureComponent {
    constructor(props) {
        super(props);

        props.tabs.forEach(({ id }) => {
            this[id] = createRef();
        });

        this.state = {
            left: 0,
            width: 0,
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize, false);

        this.updateLinePosition();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }

    componentDidUpdate(prevProps) {
        const { currentId } = this.props;
        if (prevProps.currentId !== currentId) {
            this.updateLinePosition();
        }
    }

    onResize = () => {
        const { width } = this.state;
        if (width !== 0) {
            this.setState({
                width: 0,
            });
        }
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(this.updateLinePosition, 500);
    };

    updateLinePosition = () => {
        const { currentId } = this.props;

        if (this[currentId]) {
            const { offsetLeft = 0, clientWidth = 0 } = this[currentId].current;

            this.setState({
                left: offsetLeft,
                width: clientWidth,
            });
        }
    };

    render() {
        const { tabs, currentId = 0 } = this.props;
        const { left, width } = this.state;

        return (
            <div className={style.tabs}>
                {tabs.map((tab) =>
                    tab.href && !tab.disabled ? (
                        <div key={tab.label} ref={this[tab.id]} className={style.tabWrapper}>
                            <Link to={tab.href} href={tab.href} className={style.link}>
                                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                                <Tab currentId={currentId} {...tab} />
                            </Link>
                        </div>
                    ) : (
                        <div key={tab.label} ref={this[tab.id]} className={style.tabWrapper}>
                            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                            <Tab currentId={currentId} {...tab} />
                        </div>
                    )
                )}
                <div style={{ left, width }} className={style.line} />
            </div>
        );
    }
}

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            onClick: PropTypes.func,
            href: PropTypes.string,
            disabled: PropTypes.bool,
        })
    ).isRequired,
    currentId: PropTypes.string.isRequired,
};

Tab.propTypes = {
    currentId: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClick: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
};

Tab.defaultProps = {
    onClick: null,
    id: null,
    disabled: false,
};
