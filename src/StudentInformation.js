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

export default function StudentInformation() {

    const {students, selectedIndex} = useContext(ExamContext);
    const [open, setOpen] = useState(false);
    const itemData = [ // ovdje ce se stavljati images za trenutno odabrano pitanje
      {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
      },
      {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
      },
      {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
      },
      {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
      },
      {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
      },
      {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
      },
      {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        cols: 2,
      },
    ];

      const [includeComment, setIncludeComment] = useState(itemData.map(()=>{return false;}));

      const handleChangeIncludeComment = (event) => {
        setIncludeComment(includeComment.map(()=>event.target.checked));
      }

      const [annotation, setAnnotation] = useState(itemData.map((item,index)=>{return {};}));
      const [annotations, setAnnotations] = useState(itemData.map((item,index)=>{return [];}));
    

      const [disableAnnotations, setDisableAnnotations] = useState(itemData.map(()=>true));

      const [clickedImage, setClickedImage] = useState(null);

      const [selectedQuestion, setSelectedQuestion] = useState(0);

      const handleSelectQuestion = (event) => {
        // ovdje stavis setItemData na slike samo poslane za izabrano pitanje
        setSelectedQuestion(event.target.value);
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

      }, [clickedImage]);

      useEffect(()=>{
        console.log("promijenjen annotations niz");
        annotation.map((item)=>{
          console.log(item.length);
        })  
      }, [annotations]);


      useEffect(()=>{
        console.log("promijenjen annotation niz");
        annotation.map((item)=>{
          console.log(item);
        })       
      }, [annotation]);

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
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
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
                    {itemData.map((item,index) => (
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