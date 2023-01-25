import classes from './App.module.css';

import SigninPage from './pages/signinPage/signinPage';
import SignupPage from './pages/signupPage/signupPage';
import HomePage from './pages/homePage/homePage';

import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.background} />
      <div className={classes.components}>
        <Switch>
          <Route exact path="/signin" component={SigninPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/letstalk" component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
