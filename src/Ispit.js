import { Box, Collapse, Container, CssBaseline, Typography } from '@mui/material';
import { Component, useState } from 'react';
import CardPitanje from './CardPitanje';
import pitanja from './Pitanja.js';
import Odgovor from './Odgovor.js';


export default function Ispit() {


    const [answeringAvailable, setAnsweringAvailable] = useState(true); //asinhrono cemo provjeravati dal je od servera poslano da je ovo omoguceno, u nekim vremenskim intervalima

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
                                <Collapse in={answeringAvailable} timeout="auto" unmountOnExit>
                                 <Odgovor/>
                                </Collapse>
                            </Box>
                        );
                })}
            </Box>
        </Container>
    );



}