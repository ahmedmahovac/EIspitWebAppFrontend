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

class App extends Component {

  render() {
    return (
      <Router>
          <div>
                  <ButtonAppBar/>
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
          </div>
      </Router>
    );
  }
}

export default App;
