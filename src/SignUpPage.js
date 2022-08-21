import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './SignUpPage.module.css';
import {Link as LinkRouter, useNavigate} from 'react-router-dom';
import axios from 'axios';


import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useEffect } from 'react';


const theme = createTheme();

export default function SignUp() {

  const [errors, setErrors] = useState("");
  
  const navigate = useNavigate();

  const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false);

  useEffect(()=>{
    if(registeredSuccessfully) {
      navigate("../login");
    }
  },[registeredSuccessfully]);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required("Password is required").min(6, "Password too short! Must be at least 6 characters.").matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    }),
    onSubmit: values => {
      axios.post("/register", values).then((res)=>{
        setRegisteredSuccessfully(true);
        setErrors("");
        alert("Registration successful! Login now.");
      }).catch(err => {
        if(err.response.status === 400) setErrors("Email already in use.");
        else setErrors("Internal server error. Please try again.");
      });
    },
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registracija
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Ime"
                  autoFocus
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{padding: "5px"}}
                />
                {formik.touched.firstName && formik.errors.firstName ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.firstName}</Typography>) : null}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Prezime"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{padding: "5px"}}
                />
                {formik.touched.lastName && formik.errors.lastName ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.lastName}</Typography>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email adresa"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{padding: "5px"}}
                />
                {formik.touched.email && formik.errors.email ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.email}</Typography>) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Lozinka"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{padding: "5px"}}
                />
                {formik.touched.password && formik.errors.password ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.password}</Typography>) : null}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Želim da me smarate putem maila."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={formik.handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <LinkRouter to="/login" className={styles.helpLinks}>
                  Already have an account? Sign in
                </LinkRouter>
              </Grid>
            </Grid>
          </Box>
          {<Typography variant='subtitle1' sx={{color: "#ff355e", marginTop: 2, fontWeight: "bold"}}>{errors}</Typography>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}