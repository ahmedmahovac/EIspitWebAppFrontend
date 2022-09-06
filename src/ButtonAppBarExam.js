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
import PublishIcon from '@mui/icons-material/Publish';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Countdown from 'react-countdown';
import styles from './ButtonAppBar.module.css';
import {
  Link, Outlet
} from "react-router-dom";
import BatteryGauge from 'react-battery-gauge';
import { userContext } from './App';
import { useContext } from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';



const Completionist = () => <div>Time is up</div>;


export const ExamWorkContext = createContext();


export default function ButtonAppBar() {


  const {examDuration, examOpenedTime} = useContext(userContext);


  
  const [answeringAvailable, setAnsweringAvailable] = useState(false); //asinhrono cemo provjeravati dal je od servera poslano da je ovo omoguceno, u nekim vremenskim intervalima


  const [remainingTime, setRemainingTime] = useState(examOpenedTime.setMinutes(examOpenedTime.getMinutes()+examDuration));

  return (
    <ExamWorkContext.Provider value={{answeringAvailable: answeringAvailable}}>
        <Box sx={{ flexGrow: 1}}>
          <AppBar position="sticky"> 
            <Toolbar>
              <DoneAllIcon fontSize='large'/>
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                E-Ispit
              </Typography>
              <Divider className='dividerGeneral' orientation="vertical" flexItem/>
              <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
                <ButtonGroup variant='text' size='large'>
                    <AccessTimeFilledIcon fontSize='small'/>
                    <Countdown date={remainingTime} onTick={(remainingTime)=>{
                      if(answeringAvailable===false && remainingTime.minutes <= 14) { // 15 minuta pred kraj po defaultu omogucit odgovaranje na pitanja
                        setAnsweringAvailable(true);
                        // ovo forsira rerender i Countdown komponente pa se dodaju dvaput minute trajanja ispita
                        // ovako se u state-u postavi samo jednom 
                      }
                    }}>
                        <Completionist/>
                    </Countdown>
                </ButtonGroup>  
                <Typography variant="subtitle2" align='center' >
                  Time remaining
                </Typography>
              </ButtonGroup>
              <Divider className='dividerGeneral' orientation="vertical" flexItem/>
              <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
                <ButtonGroup variant='text' size='large'>
                  <Button startIcon={<CloseIcon/>} color="inherit">
                    <Link className={styles.ButtonAppBarLink} to="/">Leave without submitting</Link>
                  </Button>
                  <Button startIcon={<PublishIcon/>} color="inherit">
                  <Link className={styles.ButtonAppBarLink} to="/">Submit</Link>
                  </Button>
                </ButtonGroup>
                <Typography variant="subtitle2" align='center' >
                  Options
                </Typography>
              </ButtonGroup>
            </Toolbar>
          </AppBar>
          <Outlet/>
        </Box>
      </ExamWorkContext.Provider>
  );
}