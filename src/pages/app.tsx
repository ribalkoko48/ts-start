import React, { useCallback, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Loader } from '../components/loader';
import { Modal } from '../components/modal';
import './app.css';

export function App() {
    const [isOn, setOn] = useState(false);
    const handleOn = useCallback(() => {
        setOn(!isOn);
    }, [isOn, setOn]);

    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">+++++++++</Link>
                        </li>
                        <li>
                            <Link to="/about">--------</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/about">
                        <Button onClick={handleOn}>Modal</Button>
                        <Modal isActive={isOn}>модалка</Modal>
                    </Route>
                    <Route path="/users">
                        <Input onChange={console.log} value="1" />
                    </Route>
                    <Route path="/">
                        <Loader />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
