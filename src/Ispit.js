import { Box, Collapse, Container, CssBaseline, IconButton, Typography } from '@mui/material';
import { Component, createContext, useEffect, useState } from 'react';
import CardPitanje from './CardPitanje';
import pitanja from './Pitanja.js';
import Odgovor from './Odgovor.js';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



export default function Ispit() {


    const [answeringAvailable, setAnsweringAvailable] = useState(true); //asinhrono cemo provjeravati dal je od servera poslano da je ovo omoguceno, u nekim vremenskim intervalima

    const [examQuestions, setExamQuestions] = useState([]); 

    const {examKey} = useParams();

    const [showQuestions, setShowQuestions] = useState(false);


    const [questionsAdded, setQuestionsAdded] = useState(false);

    useEffect(()=>{
    console.log(examQuestions);
    }, [examQuestions]);



   

    const getQuestions= ()=>{
        axios.get("/student/questions/"+examKey).then((res)=>{
            // dohvati sve slike za svako pitanje
            const questions = res.data;
            console.log(questions);
            questions.map((question, indexQuestion) => { // moram dohvatit jedno pa drugo, da bih znao kad sam zavrsio sa kompletnim ucitavanjem pitanja
                    axios.get("/student/pdfQuestion/"+question._id).then(res => {
                        let dataPdf = "";
                        if(question.pdfIncluded) {
                            dataPdf = "data:" + res.headers["content-type"] + ";base64," + Buffer.from(res.data).toString('base64');
                        }
                        axios.get("/student/imageQuestionTemporary/" + question._id, {responseType: 'arraybuffer'}).then(res => {
                            let dataImage = "";
                            if(question.imagesIncluded){
                                dataImage = "data:" + res.headers["content-type"] + ";base64," + Buffer.from(res.data).toString('base64');
                            }
                            setExamQuestions((prevQuestions)=>{
                                return [...prevQuestions, {_id: question._id, title: question.title, text: question.text, _examId: question._examId, pdfIncluded: question.pdfIncluded, imagesIncluded: question.imagesIncluded, image: dataImage, pdf: dataPdf}]
                            });
                           // setExamQuestions(examQuestions.concat());
                        }).catch(err =>{
                            console.log(err);
                        });
                        /*
                       axios.get("/student/imageQuestions/"+question._id).then(res => {
                        const imageQuestions = res.data;
                        let dataImages = [];
    
                        if(imageQuestions.length===0) {
                            questionsToBeAdded = questionsToBeAdded.concat({_id: question._id, title: question.title, text: question.text, _examId: question._examId, pdfIncluded: question.pdfIncluded, imagesIncluded: question.imagesIncluded, images: dataImages, pdf: dataPdf});
                            if(indexQuestion===questions.length-1){
                                setExamQuestions(questionsToBeAdded);
                            }
                        }
                        
                       
                        imageQuestions.map((imageQuestion, index)=>{
                            axios.get("/student/imageQuestion/"+imageQuestion._id, {responseType: 'arraybuffer'}).then(res => {
                                const dataImage = "data:" + res.headers["content-type"] + ";base64," + Buffer.from(res.data).toString('base64');
                                dataImages.push(dataImage);
                                if(index===imageQuestions.length-1){
                                    questionsToBeAdded = questionsToBeAdded.concat({_id: question._id, title: question.title, text: question.text, _examId: question._examId, pdfIncluded: question.pdfIncluded, imagesIncluded: question.imagesIncluded, images: dataImages, pdf: dataPdf});
                                    if(indexQuestion===questions.length-1){
                                        setExamQuestions(questionsToBeAdded);
                                    }
                                }
                             });
                            });
                            }).catch(err=>{
                                console.log(err)
                            });
                            */
                    }).catch(err => {
                        console.log(err);
                    });
    });
});
}
    return(
                <Container component="main" maxWidth="xl">
                                <IconButton
                                size="small"
                                onClick={() => {
                                    if(!questionsAdded){
                                        setQuestionsAdded(true);
                                        getQuestions();
                                    }
                                    setShowQuestions(!showQuestions);
                                }}
                                >
                                {showQuestions ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                    <CssBaseline/>
                    <Collapse in={showQuestions} timeout="auto" unmountOnExit>
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
                            {
                                examQuestions.map((item, index)=>{
                                    return(
                                        <Box key={item._id} sx={{
                                            padding: "2",
                                            width: "100%"
                                        }}>
                                            <CardPitanje title={item.title} text={item.text} imageUrl={item.image} />
                                            <Collapse in={answeringAvailable} timeout="auto" unmountOnExit>
                                            <Odgovor question={item} />
                                            </Collapse>
                                        </Box>
                                    );
                            })}
                        </Box>
                    </Collapse>
                </Container>
    );



}