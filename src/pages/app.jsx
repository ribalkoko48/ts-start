import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Tabs } from '../components/tabs/tabs';
import {
    RATES_URL,
    SERVICES_URL,
    SMS_ITEMS_URL,
    SMS_TYPES_URL,
    SERVICE_PACKAGES_URL,
    BK_URL,
    OTHER_DIRECTORIES_URL,
} from '../constants/routes';
/* import RatePlans from './RatePlans';
import Services from './Services';
import SimCardsProductPositionsAndRegions from './SimCardsProductPositionsAndRegions'; */

const RatePlans = () => <div>RatePlans</div>;
const Services = () => <div>RatePlans</div>;
const SimCardsProductPositionsAndRegions = () => <div>RatePlans</div>;

const tabs = [
    { label: 'Тарифы', href: RATES_URL, id: RATES_URL },
    { label: 'Услуги', href: SERVICES_URL, id: SERVICES_URL },
    { label: 'Товарные позиции SIM-карт и Регионы', href: SMS_ITEMS_URL, id: SMS_ITEMS_URL },
    { label: 'Типы SIM-карт', href: SMS_TYPES_URL, id: SMS_TYPES_URL },
    { label: 'Пакеты обслуживания', href: SERVICE_PACKAGES_URL, id: SERVICE_PACKAGES_URL },
    { label: 'БК', href: BK_URL, id: BK_URL },
    { label: 'Другие справочники', href: OTHER_DIRECTORIES_URL, id: OTHER_DIRECTORIES_URL },
];

const AppComponent = (props) => {
    const {
        location: { pathname },
    } = props;

    return (
        <div className="app-wrapper">
            <Tabs tabs={tabs} currentId={pathname} />
            <Switch>
                <Route exact path={RATES_URL} component={RatePlans} />
                <Route path={SERVICES_URL} component={Services} />
                <Route path={SMS_ITEMS_URL} component={SimCardsProductPositionsAndRegions} />
                <Route path={SMS_TYPES_URL} render={() => <div>В разработке</div>} />
                <Route path={SERVICE_PACKAGES_URL} render={() => <div>В разработке</div>} />
                <Route path={BK_URL} render={() => <div>В разработке</div>} />
                <Route path={OTHER_DIRECTORIES_URL} render={() => <div>В разработке</div>} />
                <Redirect to={RATES_URL} />
            </Switch>
        </div>
    );
};

AppComponent.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
};

export const App = withRouter(AppComponent);
