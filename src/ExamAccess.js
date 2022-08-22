import { Component, useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Annotation from 'react-image-annotation';
import axios from 'axios';

export default function ExamAccess() {

    let navigate = useNavigate();


    const [examKey, setExamKey] = useState("");

    const handleSubmit = (event) => {
        console.log(examKey);
        event.preventDefault();
        const queryParams = new URLSearchParams({
            examKey: examKey,
        }).toString();
        axios.get("/student/exam?"+queryParams).then((res)=>{
            console.log(res); // redirectaj dalje
        }).catch(err => {
            if(err.response.status===404) {
                setError("Exam with provided exam key doesn't exist.");
            }
            else if(err.response.status===451) {
                setError("Exam is not yet opened for students. Check back later.");
            }
            else setError("Unexpected error has occured. Please try again.");
        });
    };

    const [error, setError] = useState("");

    const handleClick = (event) => {
        navigate("../examAccessEnterPersonalInfo");
    }

      return (
        <Container maxWidth="xs">
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{
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
                    <Button variant='contained' type='submit' fullWidth sx={{
                        mt: 1, mb: 1
                    }}>
                            NEXT
                    </Button>
                    </Box>
                    {<Typography variant='subtitle1' sx={{color: "#ff355e", marginTop: 2, fontWeight: "bold"}}>{error}</Typography>}
                </Box>    
        </Container>
      );
            }
  