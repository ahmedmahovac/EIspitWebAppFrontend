import { Component } from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ExamAccess() {

    const handleSubmit = (event) => {
        console.log(event.target);
    };

      return (
        <Container maxWidth="xs">
            <CssBaseline />
                <Box sx={{
                    marginTop: 35,
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
                        label="Enter exam key"
                        fullWidth
                        required
                        id='examKey'
                        autoFocus
                        sx={{padding: "5px"}}
                        />
                    <Button variant='contained' type='submit' fullWidth sx={{
                        mt: 1, mb: 1
                    }}>
                        <Link to="#">
                            Start
                        </Link>
                    </Button>
                    </Box>
                </Box>    
        </Container>
      );
            }
  