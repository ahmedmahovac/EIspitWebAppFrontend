import { Box, Collapse, Container, CssBaseline, Typography } from '@mui/material';
import { Component, useEffect, useState } from 'react';
import CardPitanje from './CardPitanje';
import pitanja from './Pitanja.js';
import Odgovor from './Odgovor.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function Ispit() {


    const [answeringAvailable, setAnsweringAvailable] = useState(true); //asinhrono cemo provjeravati dal je od servera poslano da je ovo omoguceno, u nekim vremenskim intervalima

    const [examQuestions, setExamQuestions] = useState([]); 

    const {examKey} = useParams();

    useEffect(()=>{
        console.log(examKey)
        axios.get("/student/questions/"+examKey).then((res)=>{
            setExamQuestions(res.data);
        }).catch(err=>{
            console.log(err);
        });
    }, []);

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
                {examQuestions.map((item, index)=>{
                        return(
                            <Box key={item._id} sx={{
                                padding: "2",
                                width: "100%"
                            }}>
                                <CardPitanje text={item.text} imageUrl="" index={index+1}/>
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