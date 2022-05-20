import './App.css';
import RegistrationAndLoginSection from './RegistrationAndLoginSection';
import ShortSummarySection from './ShortSummarySection';
import AdvantagesSection from './AdvantagesSection';
import { Component } from 'react';
import {advantages} from './advantagesData.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


class App extends Component {

  render() {
    return (
        <Router>
          <div>
            <Routes>
              <Route exact path='/' >
                  <RegistrationAndLoginSection/>
                  <ShortSummarySection/>
                  <AdvantagesSection advantages = {advantages}/>
              </Route>
              <Route path='/login'>
                <h1>login</h1>
              </Route>
              <Route path='/registration'>
                <h1>registration</h1>
              </Route>
            </Routes>
          </div>
        </Router>
    );
  }
}

export default App;
