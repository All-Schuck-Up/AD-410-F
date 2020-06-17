import React, { Fragment, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// Redux
import store from './store';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from './actions/auth';
import { getCurrentProfile } from './actions/profile';
import setAuthToken from './utils/setAuthToken';

// Components
import Landing from './components/Landing.component';
import Spinner from './components/spinner/Spinner';
import LoginPatient from './components/auth/LoginPatient.component';
import RegisterPatient from './components/auth/RegisterPatient.component';
import LoginProvider from './components/auth/LoginProvider.component';
import RegisterProvider from './components/auth/RegisterProvider.component';
import Navbar from './components/Nbar.component';
import CreateSymptom from './components/Create-patient-symptom.component';
import PatientProfile from './components/PatientProfile.component';
import ProviderProfile from './components/ProviderProfile';
import ProviderNote from './components/ProviderNote.component';

// check for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ auth: { loading, user }, profile: { profile } }) {
  useEffect(() => {
    store.dispatch(getCurrentProfile());
  }, []);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return loading && profile === null && user === null ? (
    <Spinner />
  ) : (
    <Router>
      <Fragment>
        <div className='mainBody'>
          <div className='container'>
            <br />
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route exact path='/patient/login'>
              <LoginPatient />
            </Route>
            <Route exact path='/patient/register'>
              <RegisterPatient />
            </Route>
            <Route exact path='/provider/login'>
              <LoginProvider />
            </Route>
            <Route exact path='/provider/register'>
              <RegisterProvider />
            </Route>
            <Route exact path='/patient/login/:id'>
              <Navbar lastName={profile && profile.firstName}/>
              <CreateSymptom
                patientId="5ecaabd07dfcc538bce811fc"
                lastName={profile && profile.lastName}
              />
            </Route>
            <Route exact path='/patient/:id/profile'>
              <Navbar lastName={profile && profile.firstName} />
              <PatientProfile patientId="5ecaabd07dfcc538bce811fc" accountType={user && user.accountType} lastName={profile && profile.firstName}/>
            </Route>
            <Route exact path='/patient/doctorNotes'>
              <Navbar lastName={profile && profile.firstName}/>
              <ProviderNote
                patientId="5ecaabd07dfcc538bce811fc"
                lastName={profile && profile.lastName}
              />
            </Route>
            <Route exact path='/provider/login/:id'>
              <Navbar lastName={profile && profile.firstName}/>
              <ProviderProfile />
            </Route>
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

App.prototypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(App);
