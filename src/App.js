import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store';
import Home from './pages/HomePage/Homepage'
import MoiveDetail from './pages/MovieDetailpage/MovieDetailpage';
import Moives from './pages/MoviesPage/Moviespage';
import Reviews from './pages/ReviewsPage/Reviewspage'
import Wishlist from './pages/WishListpage/WishListpage'
import './App.css';



function App () {
  useEffect(() => {
    if (!localStorage.getItem('wishlist')) {
      localStorage.setItem('wishlist', JSON.stringify([]))
    }
  })
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/movie/:id" component={MoiveDetail}>
            </Route>
            <Route exact path="/movies/:key" component={Moives}>
            </Route>
            <Route exact path="/reviews/:id" component={Reviews}>
            </Route>
            <Route exact path="/wishlist" component={Wishlist}>
            </Route>
            <Route path="/" component={Home}>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
