import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link} from "react-router-dom";
import { userContext} from './App';
import axios from 'axios';


import { useFormik } from 'formik';
import * as Yup from 'yup';

import styles from './SignUpPage.module.css';
import { useContext } from 'react';

const theme = createTheme();



export default function SignIn() {

  const [errors, setErrors] = React.useState("");
  
  const {setUser} = useContext(userContext); 

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required("Password is required").min(6, "Password too short! Must be at least 6 characters.")
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post('/login', data)
    .then(res=> {
       localStorage.setItem('jwtToken', res.data.token)
       axios.defaults.headers.common['Authorization'] =    
         'Bearer'+res.data.token
       setUser({ auth:true, name: res.data.username }) // vraca mi username jer sam dao tu informaciju prilikom registracije (first + lastname cemo stavit da je username)
    })
    .catch(err=>{
       if(err.response){
         if(err.response.status===401) setErrors('Invalid credentials')
         else setErrors('Please try again.')
    }
       console.log(err)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prijava
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email adresa"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              sx={{padding: "5px"}}
            />
            {formik.touched.email && formik.errors.email ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.email}</Typography>) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lozinka"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              sx={{padding: "5px"}}
            />
            {formik.touched.password && formik.errors.password ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.password}</Typography>) : null}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Zapamti me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prijava
            </Button>
            <Grid container sx={{
              width: "100%"
            }}>
              <Grid item xs={6}>
              <Link to="/" className={styles.helpLinks}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs={6}>
              <Link sx={{marginLeft: 10}} to="/registration" className={styles.helpLinks}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
          {errors}
        </Box>
      </Container>
    </ThemeProvider>
  );
}