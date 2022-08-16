import { Component } from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function ExamAccess() {

    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
    };

    const handleClick = (event) => {
        navigate("../ExamInsight"); // ovdje dodat neku rutu sa parametrom koji je jedinstveni kljuc studenta...
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
                        Enter Insight Key
                    </Typography>
                    <Box component="form"  noValidate sx={{
                        mt: 1, padding: "5px"
                    }}>
                        <TextField
                        name='examKey'
                        label="Insight key"
                        fullWidth
                        required
                        id='examKey'
                        autoFocus
                        sx={{padding: "5px"}}
                        />
                    <Button variant='contained' type='submit' onClick={handleClick} fullWidth sx={{
                        mt: 1, mb: 1
                    }}>
                            NEXT
                    </Button>
                    </Box>
                </Box>    
        </Container>
      );
            }
  