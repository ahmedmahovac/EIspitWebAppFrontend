import { Component, useState } from 'react';
import { Box, Container, Typography, Tooltip, Button, IconButton, TextField, Paper, FormControlLabel, Checkbox, FormGroup, FormControl, FormLabel, FormHelperText, TextareaAutosize, Input} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import UploadImages from './UploadImages';

import '@react-pdf-viewer/core/lib/styles/index.css';

import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';




export default function NewExam() {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const [numberOfAddedQuestions, setNumberOfAddedQuestions] = useState(0);
    const [addingQuestionActive, setAddingQuestionActive] = useState(false);

    const [checkboxState, setCheckBoxState] = useState({
        checkboxText: false,
        checkboxImages: false,
        checkboxPdf: false
    });

    const [pdfFile, setPdfFile] = useState(null);
    const [errorPdfFile, setErrorPdfFile] = useState("");

    const handleAddQuestion = (event) => {
        setAddingQuestionActive(true);

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

    return(
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
                        <TextField  required label="title" fullWidth sx={{padding: "5px" , marginTop: 1}}></TextField>
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
                            backgroundColor: "#22c1c3",
                            marginTop: 1,
                            marginBottom: 1,
                            marginLeft: 1
                        }}>
                            <CancelIcon/>
                        </Button>
                    </Tooltip>
                    : null}
                        <Typography variant='h6' sx={{marginLeft: "auto", marginRight: 1}}>
                            {numberOfAddedQuestions} questions added
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
                            <TextField  required label="question title" fullWidth sx={{padding: "5px" , marginTop: 1}}></TextField>
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
                            <TextField multiline rows={6} required label="Enter question text" fullWidth sx={{padding: "5px" , marginTop: 1}}></TextField>
                            : null}
                            {checkboxState.checkboxImages&&(
                                <UploadImages/>
                            )}
                            {checkboxState.checkboxPdf ? 
                            <Box sx={{m: 1}}>
                            <Typography variant='h6' sx={{fontWeight: "bold"}}> Upload pdf</Typography>
                            <Input type='file' onChange={onFileSelected}></Input>
                            <Typography color="error">{errorPdfFile}</Typography>
                            <Typography variant='h6' sx={{fontWeight: "bold"}}>View pdf</Typography>
                            {pdfFile&&(
                                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                                    <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={pdfFile} />;
                                </Worker>
                            )}
                            {!pdfFile&&(
                                <Typography variant='subtitle1'>No pdf file selected</Typography>
                            )}
                            </Box>
                            : null}
                        </Paper> : null }
                </Box> 
            </Box>
        </Container>
    );
}

