import ShortSummarySection from './ShortSummarySection';
import AdvantagesSection from './AdvantagesSection';
import { Component } from 'react';
import {advantages} from './advantagesData.js';
import { Box } from '@mui/material';

class MainPage extends Component {

    render() {
      return (
            <Box>     
                <ShortSummarySection/>
                <AdvantagesSection advantages = {advantages}/> 
            </Box>
      );
    }
  }
  
  export default MainPage;