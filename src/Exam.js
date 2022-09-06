import { Box, Button, Card, CardContent, CardMedia, Collapse, Container, FormControlLabel, FormLabel, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Modal, Paper, Switch, TextField, Typography } from '@mui/material';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import StudentInformation from './StudentInformation';
import TimerIcon from '@mui/icons-material/Timer';
import Advantagecard from './Advantagecard';
import { useParams } from 'react-router-dom';
import Switchv2 from "react-switch";
import { TeacherContext } from './ButtonAppBarTeacher';

export const ExamContext = createContext();


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


export default function Exam() {


    const {exams} = useContext(TeacherContext);

    const [students, setStudents] = useState([]); 
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchNameValue, setSearchNameValue] = useState("");


    const [selectedQuestion, setSelectedQuestion] = useState("");


    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        const examTakeId = students[index]._id;
        axios.get("student/answers/"+examTakeId).then((res)=>{
            console.log(res.data);
          setAnswers(res.data);
          setSelectedQuestion("");
        }).catch(err => {
          console.log(err);
        });
    }

    const {examId} = useParams();

    useEffect(()=>{
        axios.get("/teacher/examTakes/"+examId).then(res => {
            console.log(res);
            exams.map((exam,index)=>{
                if(exam.id === examId){
                    setInsightOpen(exam.insightOpen);
                }
            });
            setStudents(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);



    const [showMonitoringOptions, setShowMonitoringOptions] = useState(false);

    const handleShowMonitoringOptionsChange = (event) => {
        setShowMonitoringOptions(event.target.checked);
    }


    const [openSetAdditionalTimeModal, setOpenSetAdditionalTimeModal] = useState(false);

    const handleOpenSetAdditionalTime = (event) => {
        setOpenSetAdditionalTimeModal(true);
    }

    const handleCloseSetAdditionalTimeModal = (event) => {
        setOpenSetAdditionalTimeModal(false);
    }


    const [insightOpen, setInsightOpen] = useState(false);

    const handleSwitchInsightOpen = (value) => {
        axios.post("/teacher/exam/insight/", {open: value, examId: examId}).then(res=>{
            console.log(res);
            setInsightOpen(value);
        }).catch(err=>{
            console.log(err);
        });
    }


    const [answers, setAnswers] = useState([]);


    const handleSearchNameValue = (event) => {
        setSearchNameValue(event.target.value);
    }


    useEffect(()=>{
        console.log("uso u useEffect Exama");
    }, [selectedIndex]);

    return(
        <ExamContext.Provider value={{students, selectedIndex, answers, selectedQuestion, setSelectedQuestion}}>
            <Container maxWidth="xl">
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "left",
                    alignItems: "left",
                    marginTop: "30px",
                }}>
                    <Paper sx={{
                        
                    }}>
                        <TextField autoFocus value={searchNameValue} onChange={handleSearchNameValue} label="search name" sx={{m: 1, padding: "5px"}}></TextField>
                        <List component="nav" aria-label="students list">
                            {students.map((item, index)=>{
                                return(
                                    <ListItemButton
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(index)}
                                >
                                    <ListItemIcon>
                                        <SchoolIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.firstName + " " + item.lastName} />
                                </ListItemButton>
                                );  
                            })}
                        </List>
                    </Paper>
                    <Paper sx={{
                        flexGrow: 1,
                        marginLeft: 2,
                        padding: 2,
                        width: 150
                    }}>
                        {students.length!==0 ? <StudentInformation/> : null}
                    </Paper>
                </Box>
                <Paper sx={{
                    marginTop: "10px",
                    backgroundColor: "#96ccff"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <FormControlLabel control={<Switch defaultChecked checked={showMonitoringOptions} onChange={handleShowMonitoringOptionsChange} />} label="Show monitoring options" />
                    </Box>
                    <Collapse in={showMonitoringOptions} timeout="auto" unmountOnExit> 
                        <Grid container spacing={2}>
                            <Grid item>
                                <Paper elevation={10} sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    margin: "5px"
                                }}>
                                    <IconButton onClick={handleOpenSetAdditionalTime}>
                                        <TimerIcon sx={{fontSize: 50}} color="primary"></TimerIcon>
                                    </IconButton>
                                    <Typography variant='h5'>Set additional time</Typography>
                                </Paper>
                                <Paper elevation={10} sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: "5px",
                                    margin: "5px"
                                }}>
                                    <Typography>{insightOpen ? "On" : "Off"}</Typography>
                                    <Switchv2 offColor={"#ff355e"} onColor={"#22c1c3"} checked={insightOpen} onChange={handleSwitchInsightOpen}/>
                                    <Typography variant='h5'>Set insight access</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Collapse>
                </Paper>
                <Modal
                open={openSetAdditionalTimeModal}
                onClose={handleCloseSetAdditionalTimeModal}
                >
                    <Box sx={modalStyle}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <TextField label="Enter time in minutes" sx={{margin: 1, padding: 1}}></TextField>
                            <Button color='primary' variant='contained'>Set time</Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </ExamContext.Provider>
    );
}

