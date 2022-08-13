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
import './ButtonAppBar.css';
import {
  Link, Outlet
} from "react-router-dom";


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="sticky">
        <Toolbar>
          <DoneAllIcon fontSize='large'/>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
          <Link className='ButtonAppBarLink' to="/home">E-Ispit</Link>
          </Typography>
          <Divider className='dividerGeneral' orientation="vertical" flexItem/>
          <ButtonGroup orientation='vertical' className='btnGroupGeneral'>
            <ButtonGroup variant='text' size='large'>
              <Button startIcon={<InputIcon/>} color="inherit">
                <Link className='ButtonAppBarLink' to="/login">Prijava</Link>
              </Button>
              <Button startIcon={<HowToRegIcon/>} color="inherit">
              <Link className='ButtonAppBarLink' to="/registration">Registracija</Link>
              </Button>
            </ButtonGroup>
            <Typography variant="subtitle2" align='center' >
              Za nastavnike
            </Typography>
          </ButtonGroup>
          <Divider className='dividerGeneral' orientation="vertical" flexItem/>
          <ButtonGroup orientation='vertical' className='btnGroupGeneral'>
            <ButtonGroup variant='text' >
              <Button startIcon={<PlayArrowIcon/>} color="inherit">
                <Link className='ButtonAppBarLink' to="/examAccess">Pristup Ispitu</Link>
              </Button>
            </ButtonGroup>
            <Typography variant="subtitle2" align='center'>
              Za studente
            </Typography>
          </ButtonGroup>
          <Divider className='dividerGeneral' orientation="vertical" flexItem/>
          <ButtonGroup orientation='vertical' className='btnGroupGeneral'>
          <Button startIcon={<CallIcon/>} color="inherit" className='btnGroupGeneral' variant='text'>
            <Link className='ButtonAppBarLink' to="/contact">Kontakt</Link>
          </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Outlet/>
    </Box>
  );
}