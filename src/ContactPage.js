import { Component } from 'react';
import { Box, Button, Container, CssBaseline, TextField, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ContactPage() {

    const handleSend = (event) => {
        console.log(event.currentTarget);
    };

      return (
        <Container maxWidth="md">
            <CssBaseline />
                <Box sx={{
                    marginTop: 35,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography variant='h5'>
                        Opišite svoj upit ili sugestiju
                    </Typography>
                    <Box component="form" onSubmit={handleSend} noValidate sx={{
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
                        name='messageFromContact'
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
                        <Link to="/">
                            Pošalji
                        </Link>
                    </Button>
                    </Box>
                </Box>    
        </Container>
      );
            }
  