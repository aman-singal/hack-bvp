import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import Profile from '../Profile/Profile'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import NoMatch from '../sub-components/NoMatch'
import AppBar from '../sub-components/AppBar'
import OldPatient from '../OldPatient/OldPatient'
import CurrentPatient from '../CurrentPatient/CurrentPatient'
import CheckDisease from '../CheckDisease/CheckDisease'
import AddPatientProfile from '../AddPatientProfile/AddPatientProfile'
import Main from '../Main/Main'
import NewPatient from '../NewPatient/NewPatient'
import VerifyStatus from '../VerifyStatus/VerifyStatus'
import VerifyMedication from '../VerifyMedication/VerifyMedication'

function ReactRouter() {
    return (
    <Router>
      <div>
        <AppBar />
        <Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route  path="/login">
            <Login />
          </Route>
          <Route  path="/signup">
            <Signup />
          </Route>
          <Route  path="/currentpatient">
            <CurrentPatient />
          </Route>
          <Route  path="/oldpatient">
            <OldPatient />
          </Route>
          <Route  path="/checkdisease">
            <CheckDisease />
          </Route>
          <Route  path="/addpatientprofile">
            <AddPatientProfile />
          </Route>
          <Route  path="/newpatient">
            <NewPatient />
          </Route>
          <Route  path="/verifystatus">
            <VerifyStatus />
          </Route>
          <Route  path="/verifymedication">
            <VerifyMedication />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route>
              <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

export default ReactRouter
