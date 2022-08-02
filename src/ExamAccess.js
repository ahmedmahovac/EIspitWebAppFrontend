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
                    marginTop: 25,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography variant='h4'>
                        Enter Exam Key
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                        name='examKey'
                        label="Enter exam key"
                        fullWidth
                        required
                        id='examKey'
                        autofocus
                        />
                    <Button variant='contained' type='submit' fullWidth>
                        <Link to="/">
                            Start
                        </Link>
                    </Button>
                    </Box>
                </Box>    
        </Container>
      );
            }
  