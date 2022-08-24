import { Component, createContext, useContext, useEffect, useState } from 'react';
import { Box, Container, Typography, Tooltip, Button, IconButton, TextField, Paper, FormControlLabel, Checkbox, FormGroup, FormControl, FormLabel, FormHelperText, TextareaAutosize, Input} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import UploadQuestionImages from './UploadQuestionImages';
import PitanjePreview from './PitanjePreview';
import '@react-pdf-viewer/core/lib/styles/index.css';


import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { TeacherContext } from './ButtonAppBarTeacher';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

export const NewExamContext = createContext();


export default function NewExam() {


    const {exams, setExams} = useContext(TeacherContext);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    let navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const  [questionTitle, setQuestionTitle] = useState("");
    const  [questionText, setQuestionText] = useState("");


    const [selectedImagesForUpload, setSelectedImagesForUpload] = useState([]);

    const [addingQuestionActive, setAddingQuestionActive] = useState(false);
    const [addingTeacherActive, setAddingTeacherActive] = useState(false);

    const [checkboxState, setCheckBoxState] = useState({
        checkboxText: false,
        checkboxImages: false,
        checkboxPdf: false
    });

    const [pdfFile, setPdfFile] = useState(null);
    const [errorPdfFile, setErrorPdfFile] = useState("");


    const [addExamSent, setAddExamSent] = useState(false);
    
    const handleAddQuestion = (event) => {
        setAddingQuestionActive(true);
    }




    const handleAddTeacher = (event) => {
        setAddingTeacherActive(true);
    }

    const handleCancelAddingTeacher = (event) => {
        setAddingTeacherActive(false);
    }

    const [examTitle, setExamTitle] = useState("");

    const onChangeQuestionTitle = (event) => {
        setQuestionTitle(event.currentTarget.value);
    }

    const handleCancelAddingQuestion = (event) => {
        setAddingQuestionActive(false);
    }


    const handleCheckBoxChange = (event) => {
        setCheckBoxState({
            ...checkboxState,
            [event.target.name] : event.target.checked
        });
    }

    const handleQuestionTextChange = (event) => {
        setQuestionText(event.currentTarget.value);
    }

    const handleQuestionAdded = (event) => {
        // ovdje vec predstavi sliku i pdf u pogodnom formatu za spremanju u bazu
        setQuestions([...questions, {title: questionTitle, questionText: questionText, pdfIncluded: (pdfFile!=null ? true : false), images: selectedImagesForUpload}]);
        // ovo sve skupa moze u neku fju koja se npr zove resetuj unesene podatke za dodavanje pitanja
        setAddingQuestionActive(false);
        setCheckBoxState({checkboxText: false, checkboxImages: false,checkboxPdf: false});
        setPdfFile(null);
        setErrorPdfFile("");
        setQuestionText("");
        setQuestionTitle("");
        setSelectedImagesForUpload([]); // nema potrebe da vise pamtimo slike za ovo pitanje, vec je spremljeno lokalno
    }



    const onFileSelected = (event) => {
        const selectedFile = event.target.files[0];
        if(selectedFile && selectedFile.type==="application/pdf") {
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e)=>{
                setErrorPdfFile("");
                setPdfFile(e.target.result);
            }
        }
        else {
            setErrorPdfFile("Please select PDF file only.");
        }
    }

    /*
    const handleAddExam = (event) => {
        // dodaj exam u bazu
        const formData = new FormData();

        selectedImagesForUpload.map((item)=>{
            formData.append("image", item);
          });
        axios.post("/teacher/addExam", {title: examTitle, questions: questions}, {headers: {"Content-Type": "multipart/form-data"}}).then((res)=>{
            // treba ponovo trazit sve exams, zato je bolje u examslist na mountu to radit jer bih sad ovdje samo mogao redirectat na tu komponentu i automatski bi se ponovo dobili svjezi podaci
            // mada mogu jednostavno dodati jedan button "refresh" na examsList, i to ima smisla
            // mogu i nakon kreiranja vratiti kreirani exam i ovdje postavit state. To je vjerovatno najlakse. Al pozeljno bi bilo dodat i refresh btn
            let exam = res.data;
            setExams([...exams, {examTitle: exam.title, createdTime: exam.createdTime, open: exam.open, examKey: exam._id, id: exam._id}]); // exam key je za sada ID ispita, mogu i refreshat umjesto sto odmah stavljam al je dosta skuplja operacija
            navigate("../exams");
        }).catch(err=>{
            alert(err);
        });
    
        setExams([...exams, {
            id: Math.random(),
            examTitle: examTitle, // i po ovome sortirati ima smisla
            createdTime: new Date("2020-05-12T23:50:21.817Z"), // po ovome sortirati
            examKey: "noviIspit",
            open: false
        }]);
    }
    */


    const handleAddExam = (event) => {
        setAddExamSent(true);
        // dodaj exam u bazu
        axios.post("/teacher/addExam", {title: examTitle,}).then((res)=>{
            let exam = res.data;
            questions.map((question, index)=>{
                axios.post("/teacher/question", {title: question.title, text: questionText, examId: exam._id}).then(res=>{ // da ne saljem bezveze ostale vrijednosti
                    let createdQuestion = res.data;
                    // sad imam id pitanja i mogu uputit zahtjev za spremanje slika pitanja
                    const formData = new FormData();
                    question.images.map((item)=>{
                        formData.append("image", item);
                    });
                    formData.append("questionId", createdQuestion._id);
                    axios.post("/teacher/questionImages", formData, {headers: {"Content-Type": "multipart/form-data"}}).then(res=>{
                        console.log(res.data);
                        if(index===questions.length-1) { // ovo je znak da je svako dodavanje uspjesno proslo
                            setAddExamSent(false);
                            setExams([...exams, {examTitle: exam.title, createdTime: exam.createdTime, open: exam.open, examKey: exam._id, id: exam._id}]); // exam key je za sada ID ispita, mogu i refreshat umjesto sto odmah stavljam al je dosta skuplja operacija
                            navigate("../exams");
                        }
                    }).catch(err => {
                        alert.err(err);
                    });
                }).catch(err => {
                    alert(err);
                }); 
            });
        }).catch(err=>{
            alert(err);
        });
        /*
        setExams([...exams, {
            id: Math.random(),
            examTitle: examTitle, // i po ovome sortirati ima smisla
            createdTime: new Date("2020-05-12T23:50:21.817Z"), // po ovome sortirati
            examKey: "noviIspit",
            open: false
        }]);
        */
    }



    const handleExamTitle = (event) => {
        setExamTitle(event.currentTarget.value);
    }


    

    return(
        <NewExamContext.Provider value={{selectedFilesForUpload: selectedImagesForUpload, setSelectedFilesForUpload: setSelectedImagesForUpload}}>
            <Container component="main" maxWidth="xl">
                <Box sx={{
                    marginTop: 15,
                    marginBottom: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        padding: "2",
                        width: "100%",
                        m: 3
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#96ccff"
                        }}>
                            <Typography variant='h4'>
                                Add exam title
                            </Typography>
                            <Tooltip title="Enter the title of the exam. " placement='right' arrow>
                                <IconButton sx={{marginLeft: "auto"}}>
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Paper>
                            <TextField onChange={handleExamTitle} value={examTitle} required label="title" fullWidth sx={{padding: "5px" , marginTop: 1}}></TextField>
                        </Paper>
                        
                    </Box>     
                    <Box sx={{
                        padding: "2",
                        width: "100%",
                        m: 3
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#96ccff"
                        }}>
                            <Typography variant='h4'>
                                Add questions
                            </Typography>
                            <Tooltip title="Add desired exam questions, one by one. " placement='right' arrow>
                                <IconButton sx={{marginLeft: "auto"}}>
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Paper sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "left",
                                alignItems: "center"
                        }}>
                            <Tooltip title="Add question">
                                <Button disabled={addingQuestionActive} onClick={handleAddQuestion} variant='contained' sx={{
                                    backgroundColor: "#22c1c3",
                                    marginTop: 1,
                                    marginBottom: 1,
                                    marginLeft: 1
                                }}>
                                    <AddIcon/>
                                </Button>
                            </Tooltip>
                            {addingQuestionActive ? 
                            <Tooltip title="Cancel adding question">
                            <Button onClick={handleCancelAddingQuestion} variant='contained' sx={{
                                backgroundColor: "#ff355e",
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 1
                            }}>
                                <CloseIcon/>
                            </Button>
                        </Tooltip>
                        : null}
                            <Typography variant='h6' sx={{marginLeft: "auto", marginRight: 1}}>
                                {questions.length} questions added
                            </Typography>
                        </Paper>
                        {addingQuestionActive ? 
                            <Paper elevation={10} sx={{
                                marginTop: 1,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "left"
                                }}> 
                                <TextField onChange={onChangeQuestionTitle} value={questionTitle} required label="question title" fullWidth sx={{padding: "5px" , marginTop: 1}}></TextField>
                                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                                    <FormLabel>Assign what you want to include in this question</FormLabel>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                            <Checkbox sx={{color: "#22c1c3"}} checked={checkboxState.checkboxText} onChange={handleCheckBoxChange} name="checkboxText" />
                                            }
                                            label="Include text"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox sx={{color: "#22c1c3"}} checked={checkboxState.checkboxImages} onChange={handleCheckBoxChange} name="checkboxImages" />
                                            }
                                            label="Include images"
                                        />
                                        <FormControlLabel
                                            control={
                                            <Checkbox sx={{color: "#22c1c3"}} checked={checkboxState.checkboxPdf} onChange={handleCheckBoxChange} name="checkboxPdf" />
                                            }
                                            label="Include pdf"
                                        />
                                    </FormGroup>
                                    <FormHelperText>Check at least one</FormHelperText>
                                </FormControl>
                                {checkboxState.checkboxText ? 
                                <Paper elevation={2} sx={{m: 1}}>
                                    <Typography variant='subtitle1' sx={{fontWeight: "bold", m: 2}}>Descripe a formulation of the question precisely.</Typography>
                                    <TextField onChange={handleQuestionTextChange} value={questionText} multiline rows={6} required label="Enter question text" fullWidth sx={{padding: "5px" , marginTop: 1}}></TextField>
                                </Paper>
                                : null}
                                {checkboxState.checkboxImages&&(
                                    <Paper elevation={2} sx={{m: 1}}>
                                        <Typography variant='subtitle1' sx={{fontWeight: "bold", m: 2}}>Upload images as formulation of question.</Typography>
                                        <UploadQuestionImages/>
                                    </Paper>
                                )}
                                {checkboxState.checkboxPdf ? 

                                <Paper elevation={2} sx={{m: 1}}>
                                <Typography variant='subtitle1' sx={{fontWeight: "bold", m: 2}}> Upload pdf</Typography>
                                <Input type='file' onChange={onFileSelected}></Input>
                                <Typography color="error">{errorPdfFile}</Typography>
                                <Typography variant='subtitle1' sx={{fontWeight: "bold", m: 2}}>View uploaded pdf</Typography>
                                {pdfFile&&(
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                                        <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={pdfFile} />;
                                    </Worker>
                                )}
                                {!pdfFile&&(
                                    <Typography variant='subtitle1' sx={{color: "#ff355e"}}>No pdf file selected</Typography>
                                )}
                                </Paper>
                                : null}
                                <Button onClick={handleQuestionAdded} startIcon={<AddIcon/>} variant='contained' sx={{backgroundColor: "#22c1c3", m: 1}}>
                                    Add question
                                </Button>
                            </Paper>
                            : null }
                    </Box> 
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",

                    }}>
                        {questions.length!=0 && questions.map((item)=>{
                            return(
                                <PitanjePreview {...item}/>
                            );
                        })}
                    </Box>
                    <Box sx={{
                        padding: "2",
                        width: "100%",
                        m: 3
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "#96ccff"
                        }}>
                            <Typography variant='h4'>
                                Add responsible persons
                            </Typography>
                            <Tooltip title="Add people who can view and correct students' answers, be able to interact with them during exam time etc " placement='right' arrow>
                                <IconButton sx={{marginLeft: "auto"}}>
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Paper sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "left",
                                alignItems: "center"
                        }}>
                            <Tooltip title="Add teacher">
                                <Button disabled={addingTeacherActive} onClick={handleAddTeacher} variant='contained' sx={{
                                    backgroundColor: "#22c1c3",
                                    marginTop: 1,
                                    marginBottom: 1,
                                    marginLeft: 1
                                }}>
                                    <AddIcon/>
                                </Button>
                            </Tooltip>
                            {addingTeacherActive ? 
                            <Tooltip title="Cancel adding teacher">
                            <Button onClick={handleCancelAddingTeacher} variant='contained' sx={{
                                backgroundColor: "#ff355e",
                                marginTop: 1,
                                marginBottom: 1,
                                marginLeft: 1
                            }}>
                                <CloseIcon/>
                            </Button>
                        </Tooltip>
                        : null}
                            <Typography variant='h6' sx={{marginLeft: "auto", marginRight: 1}}>
                                {questions.length} teachers added
                            </Typography>
                        </Paper>
                        {addingTeacherActive && (
                      <Paper elevation={2} sx={{marginTop: 1}}>
                        <TextField sx={{m: 1}} id="outlined-search" label="Search teacher" type="search" />
                      </Paper>
                        )}
                    </Box>  
                    <Paper sx={{
                        padding: "2",
                        width: "100%",
                        m: 3,
                        height: "100px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <LoadingButton loading={addExamSent} onClick={handleAddExam} size='large' variant='contained' sx={{backgroundColor: "#22c1c3"}}>ADD EXAM</LoadingButton>
                    </Paper>
                </Box>
            </Container>
        </NewExamContext.Provider>
    );
}

