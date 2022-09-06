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



const Completionist = () => <div>Time is up</div>;





export default function ButtonAppBar() {


  const {examDuration} = useContext(userContext);

  return (
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
                <Countdown date={Date.now() + 10000*3600}>
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
  );
}