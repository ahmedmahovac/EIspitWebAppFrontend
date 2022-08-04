import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { Component } from 'react';
import CardPitanje from './CardPitanje';
import pitanja from './Pitanja.js';
import Odgovor from './Odgovor.js';


export default function Ispit() {

    return(
        <Container component="main" maxWidth="xl">
            <CssBaseline/>
            <Box sx={{
                marginTop: 15,
                marginBottom: 15,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography variant='h3'>
                    Pitanja:
                </Typography>
                {pitanja.map((item, index)=>{
                        return(
                            <Box sx={{
                                padding: "2",
                                width: "100%"
                            }}>
                                <CardPitanje text={item.text} imageUrl={item.imageUrl} index={index+1}/>
                                <Odgovor/>
                            </Box>
                        );
                })}
            </Box>
        </Container>
    );



}