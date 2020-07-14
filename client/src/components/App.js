import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import NotFound from './NotFound';
import Signin from './Signin';
import Signup from './Signup';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import './App.css';
const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <UserRoute exact path='/user/dashboard' component={UserDashboard} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
