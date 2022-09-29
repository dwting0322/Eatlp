import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import BusinessBrower from './components/Business/BusinessBrower';
import Splash_Page from './Splash/Splash_Page';
import BusinessDetail from './components/Business/BusinessDetail';
import CreateBizForm from './components/Business/CreateBizForm';
import EditBizForm from './components/Business/EditBizForm';



function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <Splash_Page />
        </Route>

        <Route path='/businesses/all' exact={true} >
          <BusinessBrower />
        </Route>

        <Route path='/businesses/:id' exact={true} >
        <BusinessDetail />
        </Route>

        <Route exact path="/businesses" component={CreateBizForm}/>

        <Route exact path="/businesses/:businessId/edit" component={EditBizForm}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
