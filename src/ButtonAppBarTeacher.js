import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ButtonGroup, Divider } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CallIcon from '@mui/icons-material/Call';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import styles from './ButtonAppBar.module.css';
import {
  Link, Outlet, useNavigate
} from "react-router-dom";
import { createContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { userContext } from './App';
import { useContext } from 'react';
import { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Fragment } from 'react';


export const TeacherContext = createContext();

// protected route

export default function ButtonAppBar() {

  const {user,setUser} = useContext(userContext);


  const navigate = useNavigate();

  useEffect(()=>{
    if(!user.auth) {
      navigate("../login");
    }
  }, []);


  useEffect(()=>{
    if(!user.auth) {
      navigate("../login");
    }
  }, [user]); // mada bi ovo pokupio i onMountEvent tj ovo sto sam stavio da se desi iznad al hajd



  const [exams, setExams] = useState([{
    id: 1,
    examTitle: "Ispit 1", // i po ovome sortirati ima smisla
    createdTime: new Date("2020-05-12T23:50:21.817Z"), // po ovome sortirati
    examKey: "xdaswdD1",
    open: false
},
{
    id: 2,
    examTitle: "Ispit 2",
    createdTime: new Date("2020-05-12T23:50:21.817Z"),
    examKey: "xdaswdD2",
    open: false
},
{
    id: 3,
    examTitle: "Ispit 3",
    createdTime: new Date("2018-05-12T23:50:21.817Z"),
    examKey: "xdaswdD3",
    open: true
}]);


const handleLogout = (e) => {
  e.preventDefault(e);
  axios.get('/logout')
  .then(res=>{
  localStorage.removeItem('jwtToken')
  delete axios.defaults.headers.common['Authorization']
  setUser({ auth:false, name:'' })
  })
  .catch(err=>console.log(err))
}

  return (
    <TeacherContext.Provider value={{exams, setExams}}>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="sticky">
          <Toolbar>
            <DoneAllIcon fontSize='large'/>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
            <Link className={styles.ButtonAppBarLink} to="/home">E-Ispit</Link>
            </Typography>
            <Divider className='dividerGeneral' orientation="vertical" flexItem/>
            <ButtonGroup>
              <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
              <Button startIcon={<FormatListBulletedIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text'>
                  <Link className={styles.ButtonAppBarLink} to="../teacher/exams">Exams list</Link>
              </Button>
              </ButtonGroup>
              <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
              <Button startIcon={<AccountBoxIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text'>
                  <Link className={styles.ButtonAppBarLink} to="../teacher/profile">Profile</Link>
              </Button>
              </ButtonGroup>
              <Divider className='dividerGeneral' orientation="vertical" flexItem/>
              <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
              <Button className={styles.ButtonAppBarLink} startIcon={<CallIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text'>
                  <Link className={styles.ButtonAppBarLink} to="/contact">Contact</Link>
              </Button>
              </ButtonGroup>
                <Divider className='dividerGeneral' orientation="vertical" flexItem/>
                <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
                <Button className={styles.ButtonAppBarLink} startIcon={<AccountCircleIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text'>
                    <Link className={styles.ButtonAppBarLink} to="../teacher/profile">{user.name}</Link>
                </Button>
                </ButtonGroup>
                <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
                <Button startIcon={<LogoutIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text' onClick={handleLogout}  sx={{"&:hover":{color: "black"}}}>
                    Log out
                </Button>
                </ButtonGroup>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
        <Outlet/>
      </Box>
    </TeacherContext.Provider>
  );
}