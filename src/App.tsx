import React from 'react';
import './assets/css/reset.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomeRouter from './HomeRouters'
export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <Router >
        <Switch>
          <Route path="/" component={HomeRouter} />
        </Switch>
      </Router>
    );
  }
}

