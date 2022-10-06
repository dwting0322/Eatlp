import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
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
import CreateReviewForm from './components/Review/CreateReviewForm';
import EditReviewForm from './components/Review/EditReviewForm';
import notFound from './Picture/404-error-page-not-found.jpg'


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar isLoaded={loaded} />
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <Route path='/' exact={true} >
          <Splash_Page />
        </Route>

        <Route exact path="/businesses/new" component={CreateBizForm} />

        <Route exact path="/businesses/:businessId/edit" component={EditBizForm} />

        <Route exact path="/businesses/:businessId/reviews" component={CreateReviewForm} />


        <Route exact path='/businesses/:id'  >
          <BusinessDetail />
        </Route>

        <Route exact path='/businesses'  >
          <BusinessBrower />
        </Route>

        {/* <Route exact path="/reviews/:reviewId/edit" component={EditReviewForm}/> */}
        

        <Route>
          <h1 style={{ textAlign: "center" }}>404 Page Not Found</h1>
          <img style={{ width: "60%", height: "auto", marginLeft: "auto", marginRight: "auto", display: "block" }} src={notFound} alt="404 Page" />
        </Route>

        <Route render={() => <Redirect to="/businesses" />} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
