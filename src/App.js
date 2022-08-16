import './App.css';
import { Component } from 'react';
import ButtonAppBarHome from './ButtonAppBarHome';
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
import ExamsList from './ExamsList';
import UploadImages from './UploadImages';
import NewExam from './NewExam.js';
import Exam from './Exam';
import InsightAccess from './InsightAccess';
import ExamInsight from './ExamInsight';

import ButtonAppBarExam from './ButtonAppBarExam';
import EnterPersonalInfoExam from './EnterPersonalInfoExam';
import ButtonAppBarTeacher from './ButtonAppBarTeacher';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


class App extends Component {

  render() {
    return (
      <Router>
          <Box>
            <Routes>
              <Route exact path='' element={<ButtonAppBarHome/>}>
                <Route exact path='login' element={<SignIn/>}>
                  
                </Route>
                <Route exact path='registration' element={<SignUp/>}>

                </Route>
                <Route exact path='examAccess' element={<ExamAccess/>}>

                </Route>

                <Route exact path='insightAccess' element={<InsightAccess/>}>
                  
                  </Route>

                  <Route exact path='examInsight' element={<ExamInsight/>}>
                  
                  </Route>

                <Route exact path='examAccessEnterPersonalInfo' element={<EnterPersonalInfoExam/>}>
                  
                  </Route>
                <Route exact path='contact' element={<ContactPage/>}>

                </Route>
                <Route exact path='uploadImage' element={<UploadImages/>}>

                </Route>
                <Route exact path='home' element={<MainPage/>}>

                </Route>
              </Route>
              <Route exact path='exam' element={<ButtonAppBarExam/>}>
                <Route exact path='' element={<Ispit/>}>
                  
                </Route>
              </Route>
              <Route exact path='teacher' element={<ButtonAppBarTeacher/>}>
                <Route exact path='exams/exam' element={<Exam/>}></Route>
                <Route exact path='exams' element={<ExamsList/>}>
                </Route>
                <Route exact path='newExam' element={<NewExam/>}></Route>
              </Route>
              <Route path='*' element={
                <div>
                  <h1>Unknown route!</h1>
                </div>
              }/>
            </Routes>
          </Box>  
      </Router>
    );
  }
}

export default App;
