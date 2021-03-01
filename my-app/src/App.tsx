import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/***** Components *****/
// import Search from './pages/Search';
// import Review from './pages/Review';
// import Sign from './pages/Sign';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      {/* <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/mypage' component={Mypage} />
        <Route path='/search' component={Search} />
        <Route path='/recommend' component={RecommendedModal} />
        <Route path='/review/:id' component={Review} />
        <Route path='/review/:id/page?' component={Review} />
        <Route path='/signin' component={Sign} />
        <Route path='/signup' component={SignUp} />
      </Switch>
      <Footer /> */}
    </Router>
  );
}

export default App;
