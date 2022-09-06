import { Component, useContext, useEffect, useState } from 'react';
import { Avatar, Box, Button, Collapse, Container, CssBaseline, Grid, Paper, TextField, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userContext } from './App';

export default function ExamAccess() {

    let navigate = useNavigate();


    const [examKey, setExamKey] = useState("");

    const[searchParams, setSearchParams] = useSearchParams();

    const [validationSuccess, setValidationSuccess] = useState(false);

    const {user, setExamTakeId, setExamDuration} = useContext(userContext);

    const fetchExamAxios = (queryParams) => {
        axios.get("/student/exam?"+queryParams).then((res)=>{
            setInfo("Exam key validation successful. Please enter your personal info now to continue.");
            setSearchParams({examKey: res.data.examKey});
            setValidationSuccess(true);
            // mogu uzet i lokalni key jer sam pomocu njega dobio ovaj sto mi je u respondu
            // navigate("../examAccessEnterPersonalInfo?examKey="+res.data.examKey);
        }).catch(err => {
            setSearchParams({});
            setValidationSuccess(false);
            if(err.response.status===404) {
                setInfo("Exam with provided exam key doesn't exist.");
            }
            else if(err.response.status===451) {
                setInfo("Exam is not yet opened for students. Check back later.");
            }
            else setInfo("Unexpected error has occured. Please try again.");
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const queryParams = new URLSearchParams({
            examKey: examKey,
        }).toString();
        fetchExamAxios(queryParams);
    };

    const [info, setInfo] = useState("");

    const [fetchRequestSent, setFetchRequestSent] = useState(false);



    useEffect(()=>{
        console.log("uso u useeffect");
        if(user.auth) {
            alert("You have to logout to gain exam access.");
            navigate("../teacher/");
        }
        const examKey = searchParams.get("examKey");
        if(examKey) {
            fetchExamAxios(new URLSearchParams({examKey: examKey}).toString());
        }
    }, []); // prilikom mountanja ako je ucitana QUERY ruta
    

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
            setFetchRequestSent(true); // kad se dobavi stavi opet na false
          // registruj studenta u bazu
          const examKey = searchParams.get("examKey");
          axios.post("/student/takeExam",{...values, examKey: examKey}).then((res)=>{
            // OVDJE dostavi podatak o examtakeu
            axios.get("/teacher/examDuration/"+examKey).then(respondExam=>{
                setExamDuration(respondExam.duration);
                setExamTakeId(res.data._id); // jer kreirani objekat vracam kao respond, ovo mi treba kasnije za upload rjesenja
                setFetchRequestSent(false);
                navigate("../exam/"+examKey);
            }).catch(err => {
                console.log(err);
            });
          }).catch(err => {
            if(err.response.status===400) {
                setInfo("Student with given email address has already been registered to this exam.");
                setFetchRequestSent(false);
            }
            else {
                setInfo("Unexpected error has occured. Please try again.");
            }
          });
          
        },
      });

      return (
        <Container maxWidth="md"> 
            <CssBaseline />
                <Box sx={{
                    marginTop: 30,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography variant='h5'>
                        Enter Exam Key
                    </Typography>
                    <Box component="form" noValidate sx={{
                        mt: 1, padding: "5px"
                    }}>
                        <TextField
                        name='examKey'
                        label="Exam key"
                        fullWidth
                        required
                        value={examKey}
                        onChange={(event)=>{setExamKey(event.target.value)}}
                        id='examKey'
                        autoFocus
                        sx={{padding: "5px"}}
                        />
                    <Button variant='contained' onClick={handleSubmit} type='submit' fullWidth sx={{
                        mt: 1, mb: 1
                    }}>
                            NEXT
                    </Button> 
                    </Box>
                    {<Typography variant='subtitle1' sx={{color: validationSuccess===true ? "#22c1c3" : "#ff355e", marginTop: 2, fontWeight: "bold", textAlign: "center"}}>{info}</Typography>}
                    <Collapse in={searchParams.get("examKey") && validationSuccess} timeout="auto" unmountOnExit>
                    <Paper
                    sx={{
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 5
                    }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
                            <SchoolIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Enter personal info
                        </Typography>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                autoComplete="given-name"
                                name="firstName"
                                fullWidth
                                id="firstName"
                                label="First name"
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
                                label="Last name"
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
                                label="Email address"
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
                                label="Student ID"
                                id="index"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{padding: "5px"}}
                                />
                                {formik.touched.index && formik.errors.index ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.index}</Typography>) : null}
                            </Grid>
                            </Grid>
                            <LoadingButton
                            loadingPosition="start"
                            loading={fetchRequestSent}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 , padding: 1}}
                            >
                            Fetch the exam
                            </LoadingButton>
                            
                        </Box>
                    </Paper>
                    </Collapse>
                </Box>    
        </Container>
      );
            }
  