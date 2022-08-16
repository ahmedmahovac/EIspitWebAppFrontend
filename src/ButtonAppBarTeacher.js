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
  Link, Outlet
} from "react-router-dom";
import { createContext } from 'react';
import { useState } from 'react';



export const TeacherContext = createContext();


export default function ButtonAppBar() {

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
                  <Link className={styles.ButtonAppBarLink} to="/">Profile</Link>
              </Button>
              </ButtonGroup>
              <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
              <Button startIcon={<LogoutIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text'>
                  <Link className={styles.ButtonAppBarLink} to="/">Log out</Link>
              </Button>
              </ButtonGroup>
              <Divider className='dividerGeneral' orientation="vertical" flexItem/>
              <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
              <Button className={styles.ButtonAppBarLink} startIcon={<CallIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text'>
                  <Link className={styles.ButtonAppBarLink} to="/contact">Contact</Link>
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