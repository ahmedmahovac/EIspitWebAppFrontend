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
          <ButtonGroup>
            <ButtonGroup orientation='vertical' className='btnGroupGeneral'>
            <Button startIcon={<FormatListBulletedIcon/>} color="inherit" className='btnGroupGeneral' variant='text'>
                <Link className='ButtonAppBarLink' to="../teacher/exams">Exams list</Link>
            </Button>
            </ButtonGroup>
            <ButtonGroup orientation='vertical' className='btnGroupGeneral'>
            <Button startIcon={<AccountBoxIcon/>} color="inherit" className='btnGroupGeneral' variant='text'>
                <Link className='ButtonAppBarLink' to="/">Profile</Link>
            </Button>
            </ButtonGroup>
            <ButtonGroup orientation='vertical' className='btnGroupGeneral'>
            <Button startIcon={<LogoutIcon/>} color="inherit" className='btnGroupGeneral' variant='text'>
                <Link className='ButtonAppBarLink' to="/">Log out</Link>
            </Button>
            </ButtonGroup>
            <Divider className='dividerGeneral' orientation="vertical" flexItem/>
            <ButtonGroup orientation='vertical' className='btnGroupGeneral'>
            <Button className='ButtonAppBarLink' startIcon={<CallIcon/>} color="inherit" className='btnGroupGeneral' variant='text'>
                <Link className='ButtonAppBarLink' to="/contact">Contact</Link>
            </Button>
            </ButtonGroup>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Outlet/>
    </Box>
  );
}