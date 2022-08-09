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
import './SignUpPage.css';
import {Link as LinkRouter} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';


const theme = createTheme();

export default function EnterPersonalInfoExam() {


  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      index: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      index: Yup.string().required("Index is required")
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      index: data.get('index'),
    });
  };

  const handleTakeExam = (event) => {
    event.preventDefault();
    navigate("../exam");
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Unesite lične podatke
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                  name="index"
                  label="Index"
                  id="index"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{padding: "5px"}}
                />
                {formik.touched.index && formik.errors.index ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.index}</Typography>) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleTakeExam}
              sx={{ mt: 3, mb: 2 }}
            >
              Započni ispit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}