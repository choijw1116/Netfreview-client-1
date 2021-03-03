import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import axios from 'axios';

/***** Components *****/
import Header from './components/Header';
import Main from './pages/Main';
import Footer from './components/Footer';
// import Search from './pages/Search';
// import Review from './pages/Review';
// import Sign from './pages/Sign';

import './App.css';
import ReviewBanner from './components/ReviewBanner';
import SmallPoster from './components/SmallPoster';
import InfoCard from './components/InfoCard';
import Myreview from './components/Myreview';
import SignIn from './components/SignIn';
import ReviewComment from './components/ReviewComment';
import ReviewList from './components/ReviewComment';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Main} />
        {/* <Route path='/mypage' component={Mypage} />
        <Route path='/search' component={Search} />
        <Route path='/recommend' component={RecommendedModal} />
        <Route path='/review/:id' component={Review} />
        <Route path='/review/:id/page?' component={Review} />
        <Route path='/signin' component={Sign} />
        <Route path='/signup' component={SignUp} /> */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
