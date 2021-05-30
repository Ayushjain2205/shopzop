import React, { useState, useEffect } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { UserContext } from "./context/UserContext";
import { checkUser } from "./services/magic";
import Authenticate from "./components/Authenticate";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/Private";

import { GraphQLClient } from "graphql-request";
import "./App.css";

import Shop from "./components/Shop/Shop";
import Home from "./components/Home/Home";

const App = () => {
  const [shops, setShops] = useState(null);
  const [users, setUsers] = useState(null);
  const graphcms = new GraphQLClient(
    "https://api-ap-northeast-1.graphcms.com/v2/ckp8dwi04vju901xp03oz89yu/master"
  );
  console.log(shops);

  useEffect(() => {
    const fetchUsers = async () => {
      const { users } = await graphcms.request(
        `{
          customers {
           id
           name
          email
          mobile
        }
      }`
      );
      setUsers(users);
    };

    const fetchShops = async () => {
      const { shops } = await graphcms.request(
        `
      { 
        shops {
          name
          rating
          slug
          category
          location
          logo{
            id
            handle
          }
          shopPicture{
            id
            handle
          }
          description{
            html
          }
          googleLink
          websiteLink
          products{
            name
            price
            image{
              id
              handle
            }
          }
        }
      }
    `
      );

      setShops(shops);
    };

    fetchUsers();
    fetchShops();
    console.log(shops);
  }, []);

  const [user, setUser] = useState({ isLoggedIn: null, email: "" });
  const [loading, setLoading] = useState();
  useEffect(() => {
    const validateUser = async () => {
      setLoading(true);
      try {
        await checkUser(setUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    validateUser();
  }, [user.isLoggedIn]);
  if (loading) {
    return (
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: "100vh" }}
      >
        <Spinner animation='border' />
      </div>
    );
  }
  return (
    <UserContext.Provider value={user}>
      <div className='App'>
        <Router>
          {user.isLoggedIn && <Redirect to={{ pathname: "/home" }} />}
          {!shops ? (
            "Loading"
          ) : (
            <Switch>
              <Route exact path='/' component={Authenticate} />
              <Route
                exact
                path='/home'
                render={(props) => <Home shops={shops} />}
              />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route path='/shops/:slug'>
                <Shop shops={shops} />
              </Route>
              <PrivateRoute path='/home' component={Home} />
            </Switch>
          )}
        </Router>
      </div>
    </UserContext.Provider>
  );
};
export default App;
