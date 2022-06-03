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
          <div>
                  <RegistrationAndLoginSection/>
                  <ShortSummarySection/>
                  <AdvantagesSection advantages = {advantages}/>
          </div>
    );
  }
}

export default App;
