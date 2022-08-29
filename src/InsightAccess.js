import { Component, useContext, useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { userContext } from './App';
import axios from 'axios';

export default function ExamAccess() {

    let navigate = useNavigate();

    const {user} = useContext(userContext);


    const[searchParams, setSearchParams] = useSearchParams();

    const [insightKey, setInsightKey] = useState("");

    const [info, setInfo] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
    };

    

    const fetchReviewAxios = (queryParams) => {
        console.log(queryParams);
        axios.get("/student/student?"+queryParams).then(res=>{
            console.log(res);
            navigate("../examInsight/"+res.data.insightKey);
        }).catch(err => {
            console.log("uso");
            setSearchParams({});
            if(err.response.status===404) {
                setInfo("Student with provided insight key doesn't exist.");
            }
            else if(err.response.status===451) {
                setInfo("Exam insight is not yet opened for students. Check back later.");
            }
            else {
                setInfo("Unexpected error has occured. Please try again.");
            }
            console.log(err);
        })
    }

    const handleFetchReview = (event) => {
        event.preventDefault();
        const queryParams = new URLSearchParams({
            insightKey: insightKey,
        }).toString();
        fetchReviewAxios(queryParams);
    }


    useEffect(()=>{
        console.log("uso u useffect");
        if(user.auth) {
            alert("You have to logout to gain insight access.");
            navigate("../teacher/");
        }
        const insightKey = searchParams.get("insightKey");
        if(insightKey) {
            fetchReviewAxios(new URLSearchParams({insightKey: insightKey}).toString());
        }
    }, []); // prilikom mountanja ako je ucitana QUERY ruta

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
                        Enter Insight Key
                    </Typography>
                    <Box component="form"  noValidate sx={{
                        mt: 1, padding: "5px"
                    }}>
                        <TextField
                        value={insightKey}
                        onChange={(event)=>{setInsightKey(event.currentTarget.value)}}
                        name='examKey'
                        label="Insight key"
                        fullWidth
                        required
                        id='examKey'
                        autoFocus
                        sx={{padding: "5px"}}
                        />
                    <Button variant='contained' type='submit' onClick={handleFetchReview} fullWidth sx={{
                        mt: 1, mb: 1
                    }}>
                            NEXT
                    </Button>
                    </Box>
                    {<Typography variant='subtitle1' sx={{color: "#ff355e", marginTop: 2, fontWeight: "bold", textAlign: "center"}}>{info}</Typography>}
                </Box>    
        </Container>
      );
            }
  