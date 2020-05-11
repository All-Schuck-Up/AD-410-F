import React, { Fragment, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadPatient } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Component paths
import Landing from './components/layout/Landing.component';
import LoginPatient from './components/auth/LoginPatient.component';
import LoginProvider from './components/auth/LoginProvider.component';
import RegisterPatient from './components/auth/RegisterPatient.component';
import RegisterProvider from './components/auth/RegisterProvider.component';
import CreateSymptom from './components/Create-patient-symptom.component';
import PatientProfile from './components/PatientProfile.component';
import WelcomeProvider from './components/WelcomeProvider.component';
import PatientSearch from './components/PatientSearch.component';
import PatientAlertList from './components/PatientAlertList.component';
import PatientImmediateAttList from './components/PatientImmediateAttList.component';

// Check for user token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadPatient());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='container'>
            <br />
            <Route exact path='/'>
              <Landing />
            </Route>
          </div>
          <section className='container'>
            <Switch>
              <Route exact path='/patient/login' component={LoginPatient} />
              <Route
                exact
                path='/patient/register'
                component={RegisterPatient}
              />
              <Route exact path='/provider/login' component={LoginProvider} />
              <Route
                exact
                path='/provider/register'
                component={RegisterProvider}
              />
              <Route exact path='/patient/:id' component={CreateSymptom} />
              <Route
                exact
                path='/patient/:id/profile'
                component={PatientProfile}
              />
              <Route
                exact
                path='/provider/:id'
                component={
                  (WelcomeProvider,
                  PatientSearch,
                  PatientAlertList,
                  PatientImmediateAttList)
                }
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}
export default App;
