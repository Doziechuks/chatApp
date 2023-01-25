import classes from './App.module.css';

import SigninPage from './pages/signinPage/signinPage';
import SignupPage from './pages/signupPage/signupPage';

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.background} />
     <div className={classes.components}>
      {/* <SigninPage /> */}
      <SignupPage />
     </div>
    </div>
  );
}

export default App;
