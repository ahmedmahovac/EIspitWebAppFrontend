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
import InputIcon from '@mui/icons-material/Input';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CallIcon from '@mui/icons-material/Call';
import styles from './ButtonAppBar.module.css';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userContext } from './App';
import {
  Link, Outlet
} from "react-router-dom";
import { useContext } from 'react';
import { Fragment } from 'react';


export default function ButtonAppBar() {

  const {user,setUser} = useContext(userContext);

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="sticky">
        <Toolbar>
          <DoneAllIcon fontSize='large'/>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <Link className={styles.ButtonAppBarLink} to="/home">E-Ispit</Link>
          </Typography>
          <Divider className='dividerGeneral' orientation="vertical" flexItem/>
          <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
            <ButtonGroup variant='text' size='large'>
              <Button startIcon={<InputIcon/>} color="inherit">
                <Link className={styles.ButtonAppBarLink} to="/login">Prijava</Link>
              </Button>
              <Button startIcon={<HowToRegIcon/>} color="inherit">
              <Link className={styles.ButtonAppBarLink} to="/registration">Registracija</Link>
              </Button>
            </ButtonGroup>
            <Typography variant="subtitle2" align='center' >
              Za nastavnike
            </Typography>
          </ButtonGroup>
          <Divider className='dividerGeneral' orientation="vertical" flexItem/>
          <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
            <ButtonGroup variant='text' >
              <Button startIcon={<PlayArrowIcon/>} color="inherit">
                <Link className={styles.ButtonAppBarLink} to="/examAccess">Pristup Ispitu</Link>
              </Button>
              <Button startIcon={<ImageSearchIcon/>} color="inherit">
                <Link className={styles.ButtonAppBarLink} to="/insightAccess">E-Uvid</Link>
              </Button>
            </ButtonGroup>
            <Typography variant="subtitle2" align='center'>
              Za studente
            </Typography>
          </ButtonGroup>
          <Divider className='dividerGeneral' orientation="vertical" flexItem/>
          <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
          <Button startIcon={<CallIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text'>
            <Link className={styles.ButtonAppBarLink} to="/contact">Kontakt</Link>
          </Button>
          </ButtonGroup>
          {user.auth && (
            <Fragment>
              <Divider className='dividerGeneral' orientation="vertical" flexItem/>
              <ButtonGroup orientation='vertical' className={styles.btnGroupGeneral}>
              <Button className={styles.ButtonAppBarLink} startIcon={<AccountCircleIcon/>} color="inherit" className={styles.btnGroupGeneral} variant='text'>
                  <Link className={styles.ButtonAppBarLink} to="../teacher/profile">{user.name}</Link>
              </Button>
              </ButtonGroup>
            </Fragment>
          )
          }
        </Toolbar>
      </AppBar>
      <Outlet/>
    </Box>
  );
}