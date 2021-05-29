import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { GraphQLClient } from "graphql-request";
import "./App.css";

import Shop from "./components/Shop/Shop";
import Home from "./components/Home/Home";

function App() {
  const [shops, setShops] = useState(null);
  const graphcms = new GraphQLClient(
    "https://api-ap-northeast-1.graphcms.com/v2/ckp8dwi04vju901xp03oz89yu/master"
  );
  useEffect(() => {
    const fetchShops = async () => {
      const { shops } = await graphcms.request(
        `
      { 
        shops {
          name
          rating
          slug
          category
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

    fetchShops();
    console.log(shops);
  }, []);

  return (
    <div className='App'>
      <Router>
        {!shops ? (
          "Loading"
        ) : (
          <Switch>
            <Route exact path='/' render={(props) => <Home shops={shops} />} />
            <Route path='/shops/:slug'>
              <Shop shops={shops} />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
