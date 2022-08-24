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

    const [imageSrcTest, setImageSrcTest] = useState("");

    useEffect(()=>{
        console.log(examKey)
        axios.get("/student/questions/"+examKey).then((res)=>{
            // dohvati sve slike za svako pitanje
            const questions = res.data;
            questions.map((question, index) => { // moram dohvatit jedno pa drugo, da bih znao kad sam zavrsio sa kompletnim ucitavanjem pitanja
                axios.get("/student/imageQuestion/"+question._id).then(res => {
                    console.log(res);
                    setImageSrcTest(res.data);
                    // stavi u question ovo sto je doslo kao rez
                    axios.get("student/pdfQuestion/"+question._id).then(res => {
                        console.log(res);
                        // stavi u question ovo sto je doslo kao rez
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                });
            });
            // dohvati pdf za svako pitanje
            setExamQuestions(questions);
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
            <Typography>Test</Typography>
            <img src={imageSrcTest}></img>
        </Container>
    );



}