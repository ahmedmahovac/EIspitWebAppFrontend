import './App.css';
import { Component } from 'react';
import Navbar from './Navbar';
import ButtonAppBar from './ButtonAppBar';
import ResponsiveAppBar from './ResponsiveAppBar';
import MainPage from './MainPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import SignIn from './SignInPage';
import SignUp from './SignUpPage';
import ExamAccess from './ExamAccess';
import ContactPage from './ContactPage';
import Ispit from './Ispit';
import UploadImageFromMobilePage from './UploadImageFromMobilePage';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

class App extends Component {

  render() {
    return (
      <Router>
        <Container>  
          <ButtonAppBar/>
          <Box>
            <Routes>
              <Route exact path='/login' element={<SignIn/>}>
                
              </Route>
              <Route exact path='/registration' element={<SignUp/>}>

              </Route>
              <Route exact path='/examAccess' element={<ExamAccess/>}>

              </Route>
              <Route exact path='/contact' element={<ContactPage/>}>

              </Route>
              <Route exact path='/ispit' element={<Ispit/>}>

              </Route>
              <Route exact path='/uploadImage' element={<UploadImageFromMobilePage/>}>

              </Route>
              <Route exact path='/' element={<MainPage/>}>

              </Route>
            </Routes>
          </Box>
        </Container>    
      </Router>
    );
  }
}

export default App;
