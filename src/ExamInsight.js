import { Button, Collapse, Container, FormControl, FormHelperText, Grid, IconButton, ImageList, ImageListItem, InputLabel, MenuItem, Paper, Select, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Annotation from 'react-image-annotation';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';
import axios from 'axios';
import { useParams } from 'react-router-dom';





export default function ExamInsight() {

    const [answers, setAnswers] = useState([]);

    const [answerImages, setAnswerImages] = useState([]);

    const [annotations, setAnnotations] = useState(answerImages.map((item,index)=>{return [];}));

    const [openWritingComplaint, setOpenWritingComplaint] = useState(answerImages.map((item,index)=>{return false;}));

    const [openImages, setOpenImages] = useState(false);

    const [selectedQuestion, setSelectedQuestion] = useState(0);


    const handleSelectQuestion = (event) => {
        // prvo resetuj zapamcene slike i anotacije za prethodno pitanja
        setAnswerImages([]);
        setAnnotations([]);

        const index = event.target.value;
        const answer = answers[index];
        axios.get("/student/imageAnswers/"+answer._id).then(res => {
          const imageAnswers = res.data;
          imageAnswers.map((imageAnswer, indexImageAnswer)=>{
            axios.get("/student/imageAnswer/"+imageAnswer._id, {responseType: 'arraybuffer'}).then(res => {
              const dataImage = "data:" + res.headers["content-type"] + ";base64," + Buffer.from(res.data).toString('base64');

              axios.get("/annotations/" + imageAnswer._id).then((res)=>{
                console.log(res);
                const annotations = JSON.parse(res.data);
                setAnswerImages((prevImages)=> {
                    return [...prevImages, {title: "", img: dataImage}];
                });
                setAnnotations((prev)=>{
                return [...prev, annotations];
                });
                setSelectedQuestion(index);
              }).catch(err => {
                console.log(err);
              });
            }).catch(err => {
              console.log(err);
            });
          });
        }).catch(err => {
          console.log(err);
        });
    }

    const handleComplaintSubmit = (event) => {
        event.preventDefault();
        setOpenWritingComplaint(openWritingComplaint.map(item=>false));
    }

    const {examTakeId} = useParams();

    useEffect(()=>{
        console.log("uso u useffect examinsight");
        axios.get("student/answers/"+examTakeId).then((res)=>{
          console.log(res);

          setSelectedQuestion("");
        }).catch(err => {
          console.log(err);
        });
    }, []);


    return(
        <Container maxWidth="xl" component={Paper} sx={{marginTop: 5}}>
            <Box sx={{
              display: "flex",
              flexDireciton: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenImages(!openImages)}
            >
              {openImages ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Typography variant='subtitle1'>Show images</Typography>
            </Box>
            <Collapse in={openImages} timeout="auto" unmountOnExit>
                <FormControl fullWidth >
                    <InputLabel sx={{m: 1}}>Question</InputLabel>
                    <Select
                    sx={{m: 1}}
                    value={selectedQuestion}
                    onChange={handleSelectQuestion}
                    label="Question"
                    >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    </Select>
                    <FormHelperText>Select question for answers presence</FormHelperText>
                </FormControl>
                <ImageList sx={{ width: "100%"}} cols={1}>
                        {answerImages.map((item,index) => (
                                <ImageListItem key={item.img}>
                                <Annotation
                                    src={item.img}
                                    alt={item.title}
                                    annotations={annotations[index]}
                                    allowTouch
                                    disableAnnotation
                                    renderOverlay={() =>  (
                                        <div
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            color: 'white',
                                            padding: 5,
                                            pointerEvents: 'none',
                                            position: 'absolute',
                                            top: 5,
                                            left: 5
                                        }}
                                        >
                                        {"Image " + (index + 1)}
                                        </div>
                                    )}
                                />
                                <Paper sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                                }}>
                                    <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "right",
                                    alignItems: "center",
                                    width: "100%"
                                    }}>
                                    <Tooltip title="Write complaint">
                                        <IconButton size='large' disabled={openWritingComplaint[index]} onClick={()=>{
                                            let newArray = openWritingComplaint.map((item,i)=>{
                                                if(i===index) return true;
                                                else return false;
                                            });
                                            setOpenWritingComplaint(newArray);
                                        }}>
                                        <CreateIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    </Box>
                                    <Collapse in={openWritingComplaint[index]} timeout="auto" unmountOnExit>
                                        <Typography variant='h5'>
                                            Explain your complaint on comments found on this image
                                        </Typography>
                                        <Box component="form" onSubmit={handleComplaintSubmit} noValidate sx={{
                                            mt: 1, padding: "5px", width: "100%"
                                        }}>
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
                                                Submit
                                        </Button>
                                        </Box>  
                                    </Collapse>
                                </Paper>
                                </ImageListItem>
                        ))} 
                    </ImageList>
                </Collapse>
        </Container>
    );

}