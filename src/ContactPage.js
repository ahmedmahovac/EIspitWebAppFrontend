import { Component } from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import apiKey from './emailkey';
import styles from './ButtonAppBar.module.css';

export default function ContactPage() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        console.log(event.currentTarget);
        event.preventDefault();
        emailjs.sendForm(apiKey.SERVICE_ID, apiKey.TEMPLATE_ID, event.target, apiKey.USER_ID)
        .then((result) => {
        alert("Message Sent, We will get back to you shortly", result.text);
        navigate("/");
        },
        (error) => {
        alert("An error occurred, Please try again", error.text);
        });
    };

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
                        Opišite svoj upit ili sugestiju
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{
                        mt: 1, padding: "5px", width: "100%"
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Ime"
                                autoFocus
                                sx={{padding: "5px"}}
                                />
                            </Grid>
                            <Grid item item xs={12} sm={6}>
                                <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Prezime"
                                name="lastName"
                                autoComplete="family-name"
                                sx={{padding: "5px"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email adresa"
                                name="email"
                                autoComplete="email"
                                sx={{padding: "5px"}}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                        name='message'
                        label="Poruka"
                        fullWidth
                        required
                        id='contactArea'
                        autoFocus
                        multiline
                        maxRows={Infinity}
                        sx={{padding: "5px", marginTop: "10px"}}
                        />
                        <Button variant='contained' type='submit' fullWidth sx={{
                            mt: 1, mb: 1
                        }}>
                            Pošalji
                    </Button>
                    </Box>
                </Box>    
        </Container>
      );
            }
  