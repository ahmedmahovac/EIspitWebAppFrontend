import ShortSummarySection from './ShortSummarySection';
import AdvantagesSection from './AdvantagesSection';
import { Component } from 'react';
import {advantages} from './advantagesData.js';

class MainPage extends Component {

    render() {
      return (
            <div>     
                <ShortSummarySection/>
                <AdvantagesSection advantages = {advantages}/> 
            </div>
      );
    }
  }
  
  export default MainPage;