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
              <Route exact path='/examAccess'>

              </Route>
              <Route exact path='/contact'>

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
