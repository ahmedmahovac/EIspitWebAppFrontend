import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, ImageList, ImageListItem, InputLabel, MenuItem, Paper, Select, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ExamContext } from './Exam';
import Annotation from 'react-image-annotation';
import {Collapse} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import UndoIcon from '@mui/icons-material/Undo';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { Buffer } from 'buffer';

export default function StudentInformation() {

    const {students, selectedIndex} = useContext(ExamContext);
    const [open, setOpen] = useState(false);
    const [answerImages, setAnswerImages] = useState([]); // ovdje ce se stavljati images za trenutno odabrano pitanje
     

  

   

      const [answers, setAnswers] = useState([]);

      const [includeComment, setIncludeComment] = useState([]);

      const handleChangeIncludeComment = (event) => {
        setIncludeComment(includeComment.map(()=>event.target.checked));
      }

      const [annotation, setAnnotation] = useState();
      const [annotations, setAnnotations] = useState();
    
      useEffect(()=>{
        setAnnotation(answerImages.map((item,index)=>{return {};}));
        setAnnotations(answerImages.map((item,index)=>{return [];}));
      },[answerImages]);

      const [disableAnnotations, setDisableAnnotations] = useState(answerImages.map(()=>true));

      const [clickedImage, setClickedImage] = useState(null);

      const [selectedQuestion, setSelectedQuestion] = useState("");

      const handleSelectQuestion = (event) => {
        // ovdje stavis setItemData na slike samo poslane za izabrano pitanje
        const index = event.target.value;
        const answer = answers[index];
        axios.get("/student/imageAnswers/"+answer._id).then(res => {
          const imageAnswers = res.data;
          imageAnswers.map((imageAnswer, index)=>{
            axios.get("/student/imageAnswer/"+imageAnswer._id, {responseType: 'arraybuffer'}).then(res => {
              const dataImage = "data:" + res.headers["content-type"] + ";base64," + Buffer.from(res.data).toString('base64');
              setAnswerImages((prevImages)=> {
                return [...prevImages, {title: "", img: dataImage}];
              });
            }).catch(err => {
              console.log(err);
            });
          });
        }).catch(err => {
          console.log(err);
        });
        setSelectedQuestion(index);
      }

      const onChange = (ann) => {
        setAnnotation(annotation.map((item,index)=>{
          if(index===clickedImage) return ann;
          else return item;
        }));
      }
    
      const handleUndo = (event) => {
        setAnnotations(annotations.map((item,index)=>{
          if(index===clickedImage) return annotations[clickedImage].slice(0,-1);
          else return item;
        }));
      }

      const onSubmit = (ann) => {
        const { geometry, data } = ann
        console.log(data)
        setAnnotation(annotation.map((item,index)=>{return {};}));
        setAnnotations(annotations.map((item,index)=>{
          if(index===clickedImage) {
           return item.concat({
              geometry,
              data: {
                ...data,
                id: Math.random()
              }
            })
          }
          else return item;
          }))
      }



    

      
      useEffect(()=>{
        const examTakeId = students[selectedIndex]._id;
        axios.get("student/answers/"+examTakeId).then((res)=>{
          console.log(res.data);
          setAnswers(res.data);
        }).catch(err => {
          console.log(err);
        });
      }, []);

    return(
        <Box>
          <Paper>
            <Typography variant='h4'>{students[selectedIndex].firstName + ' ' + students[selectedIndex].lastName}</Typography>
            <Typography variant='subtitle1'></Typography>
            <Typography variant='subtitle1'>{students[selectedIndex].email}</Typography>
            <Typography variant='subtitle1'>{students[selectedIndex].index}</Typography>
          </Paper>
          <Box component={Paper} sx={{
            marginTop: 1
          }}>
            <Box sx={{
              display: "flex",
              flexDireciton: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Typography variant='subtitle1'>Show student answer</Typography>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <FormControl fullWidth >
                <InputLabel sx={{m: 1}}>Question</InputLabel>
                <Select
                  sx={{m: 1}}
                  value={selectedQuestion}
                  onChange={handleSelectQuestion}
                  label="Question"
                >
                  {answers.map((answer,index)=>{
                    return <MenuItem key={answer._id} value={index}>{index+1}</MenuItem>
                  })}
                </Select>
                <FormHelperText>Select question for answers presence</FormHelperText>
              </FormControl>
                <Box sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <Tooltip title="Rate answer">
                      <TextField label="Points" sx={{padding: 1, margin: 1}}></TextField>
                    </Tooltip>
                    <FormControlLabel
                    control={
                    <Checkbox sx={{color: "#22c1c3"}} checked={includeComment[selectedQuestion]} onChange={handleChangeIncludeComment} name="checkboxAdditionalComment" />
                    }
                    label="Include general comment on this question's answer"
                    />
                  </Box>
                  <Collapse in={includeComment[selectedQuestion]} timeout="auto" unmountOnExit>
                    <TextField sx={{padding: 1}} label="Comment here" multiline fullWidth></TextField>
                  </Collapse>
                <ImageList sx={{ width: "100%"}} cols={1}>
                    {answerImages.map((item,index) => (
                            <ImageListItem key={item.img}>
                            <Annotation
                                src={item.img}
                                alt={item.title}
                                annotations={annotations[index]}
                                value={annotation[index]}
                                onChange={onChange}
                                onSubmit={onSubmit}
                                allowTouch
                                disableAnnotation={clickedImage!==index}
                            />
                              <Paper sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "right",
                                alignItems: "center",
                                width: "100%"
                              }}>
                                <Tooltip title="Delete previously added annotation">
                                  <IconButton disabled={clickedImage!==index} size='large' onClick={handleUndo}>
                                    <UndoIcon/>
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Add annotations to this image">
                                <IconButton disabled={clickedImage===index} onClick={(event)=>{
                                setClickedImage(index);
                                setDisableAnnotations(disableAnnotations.map((item,i)=>{
                                  if(index===i) return false;
                                  else return true;
                                }));
                                }}>
                                      <AddIcon />
                                </IconButton>
                                </Tooltip>
                                <Tooltip title="Close adding annotation">
                                  <IconButton disabled={clickedImage!==index} onClick={(event)=>{
                                  setClickedImage(null);
                                  setDisableAnnotations(disableAnnotations.map((item,i)=>{
                                    return true;
                                  }));
                                  setAnnotation(annotation.map((item,index)=>{return {};}));
                                  }}>
                                        <CloseIcon />
                                  </IconButton>
                                </Tooltip>
                            </Paper>
                            </ImageListItem>
                    ))} 
                </ImageList>
              </Collapse>
          </Box>
        </Box>
    );
}