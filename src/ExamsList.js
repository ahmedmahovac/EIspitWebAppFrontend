import { Box, Button, ButtonGroup, Container, Typography, IconButton, Tooltip, Paper, TextField, TableSortLabel } from "@mui/material";
import React, { Component, useState, useEffect, useContext } from "react";


import {makeStyles} from "@mui/styles";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Switch from "react-switch";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from '@mui/material/TablePagination';

import {Link, Outlet, useNavigate} from 'react-router-dom';

import { TeacherContext } from "./ButtonAppBarTeacher";
import SearchBar from "material-ui-search-bar";
import CloseIcon from '@mui/icons-material/Close';
import Close from "@mui/icons-material/Close";
import RefreshIcon from '@mui/icons-material/Refresh';

import styles from './ButtonAppBar.module.css';
import axios from "axios";

const useStyles = makeStyles({
    headerRow: {
        backgroundColor: "#1976d2"
    },
    basicRow: {
        backgroundColor:"#96ccff"
    },

});




export default function ExamsList() {




        const classes = useStyles();


        const navigate = useNavigate();

        const {exams, setExams, getAndSetExams} = useContext(TeacherContext);

        const [searchBarValue, setSearchBarValue] = useState(""); 
        const [searchedExams, setsearchedExams] = useState(exams);

        const [orderDirectionCreatedTime, setOrderDirectionCreatedTime] = useState("asc");
        const [orderDirectionTitle, setOrderDirectionTitle] = useState("asc");



        const sortArray = (id, arr, orderBy) => {
            switch (orderBy) {
              case "asc":
              default:
                arr = arr.sort((a, b) => {
                    if(id=="cellCreatedTime") {
                        return a.createdTime > b.createdTime ? 1 : b.createdTime > a.createdTime ? -1 : 0
                    }
                    else if(id=="cellTitle") {
                        return a.examTitle > b.examTitle ? 1 : b.examTitle > a.examTitle ? -1 : 0
                    }
                }
                );
              break; 
              case "desc":
                arr = arr.sort((a, b) => {
                    if(id=="cellCreatedTime")
                    return a.createdTime < b.createdTime ? 1 : b.createdTime < a.createdTime ? -1 : 0
                    else if(id=="cellTitle")
                    return a.examTitle < b.examTitle ? 1 : b.examTitle < a.examTitle ? -1 : 0
                }
                );
            }
            return arr;
          };



          
        useEffect(()=>{
            onSearchBarChange(searchBarValue);
        }, [exams]);


        const handleSortRequest = (event) => {
            let id = event.currentTarget.id;
            switch(id){
                case "cellCreatedTime": 
                default:
                setExams([].concat(sortArray(id, exams, orderDirectionCreatedTime)));
                setOrderDirectionCreatedTime(orderDirectionCreatedTime === "asc" ? "desc" : "asc");
                break;
                case "cellTitle": 
                setExams([].concat(sortArray(id, exams, orderDirectionTitle)));
                setOrderDirectionTitle(orderDirectionTitle === "asc" ? "desc" : "asc");
            }
        };


        const handleSwitchChange = (value, event, id) => {
            axios.put("/teacher/exam/"+id, {open: value}).then(res=>{
                console.log(res);
                getAndSetExams(); // svjezi podaci
            }).catch((err)=>{
                console.log(err.response);
            });
            // refreshovat cu, da imam sigurno svjeze podatke
            /*
           let updatedQuestions = exams.map((item)=>{
                                if(item.id == id) {
                                    return {...item, open: value}
                                }
                                else return item
                            });
            setExams(updatedQuestions);
            */
        }

// promijenit id-ove ovih ikona, jer vec takve postoje
        const onClickHandlerDelete = (event) => {
            axios.delete("/teacher/exam/"+event.currentTarget.id).then(res=>{
                console.log(res.data); // i za ovo mogu dodat neki indikator da je uspjesno izbrisan mada ne mora, vidi se da ga nema
                getAndSetExams();
            }).catch(err => {
                console.log(err); // dodaj neki indikator na UI
            });
            /*
            let id = event.currentTarget.id;
            let updatedQuestions = exams.filter((item)=>{ // skupo je brisat lokalno + brisat u bazi ali je idalje stabilno stanje. Mozda je bolje da samo obrisem u bazi i onda forsiram dobavljanje svjezih podataka
                return item.id != id;
            });   
            setExams(updatedQuestions);
            */
        }


        const onClickHandlerEdit = (event) => {
            navigate("../editExam"); // samo da upamti koji exam otvaramo i prikaze vec podesene stvari, onda da se jos moze dodat itd. Ovo je slican prikaz ko
            // ruta newExam al ce imat drugi kontekst. nema smisla da preusmjerimo na rutu koja se tako zove, tako da cemo dodat novu editExam
        }

        const onClickHandlerViewResults = (event) => {
            navigate("../exams/exam");
        }



        const handleSearchBarChange = (event) => {
            onSearchBarChange(event.target.value);
        }

        const onSearchBarChange = (value) => {
            setSearchBarValue(value);
            let filteredQuestions = exams.filter(item =>{
                return item.examTitle.toLowerCase().includes(value.toLowerCase());
            });
            setsearchedExams(filteredQuestions);
        }


        const onCancelSearch = () => {
            setSearchBarValue("");
            setsearchedExams(exams);
        }

        const handleRefresh = (event) => {
            getAndSetExams();
        }

        return(
                <Container sx={{
                    width: "100%", 
                    height: "100%"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 15,
                        marginBottom: 15,
                        padding: 2
                    }}>
                        <TableContainer component={Paper}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "right",
                                alignItems: "center"
                            }}>
                                <TextField fullWidth label="Search by title" onChange={handleSearchBarChange} value={searchBarValue} sx={{padding: "5px", margin: "5px"}}/>
                                {searchBarValue.length != 0 ? 
                                    <IconButton onClick={onCancelSearch}>
                                     <CloseIcon/>
                                    </IconButton>
                                : 
                                <IconButton onClick={onCancelSearch}>
                                     <SearchIcon/>
                                </IconButton>
                                }
                                <Tooltip title="Refresh exams list.">
                                    <IconButton onClick={handleRefresh}>
                                        <RefreshIcon/>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Table>
                            <TableHead>
                                <TableRow className={classes.headerRow}>
                                    <TableCell></TableCell>
                                    <TableCell id="cellTitle" align="right" onClick={handleSortRequest}>
                                        <TableSortLabel active direction={orderDirectionTitle}>
                                            Title
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell id="cellCreatedTime" align="right" onClick={handleSortRequest}>
                                        <TableSortLabel active direction={orderDirectionCreatedTime}>
                                            Created time
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="right">Exam key</TableCell>
                                    <TableCell align="right">Open</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchedExams.map((row) => ( 
                                <TableRow key={row.id} className={classes.basicRow}>
                                    <TableCell align="left">
                                        <ButtonGroup variant="">
                                            <Tooltip title="Edit">
                                                <IconButton id={row.id} onClick={onClickHandlerEdit} >
                                                    <EditIcon fontSize="large"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton id={row.id} onClick={onClickHandlerDelete} >
                                                    <DeleteIcon  fontSize="large"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Monitoring and results">
                                                <IconButton id={row.id} onClick={onClickHandlerViewResults} >
                                                    <VisibilityIcon  fontSize="large"/>
                                                </IconButton>
                                            </Tooltip>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell align="right">{row.examTitle}</TableCell>
                                    <TableCell align="right">{row.createdTime}</TableCell>
                                    <TableCell align="right">{row.examKey}</TableCell>
                                    <TableCell align="right">{
                                        <Switch offColor={"#ff355e"} onColor={"#22c1c3"} id={""+ row.id} checked={row.open} onChange={handleSwitchChange}/>
                                    }</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <Button variant="contained" sx={{
                            marginTop: 2,
                            justifySelf: "center",
                            backgroundColor: "#22c1c3"
                        }}>
                            <Link className={styles.ButtonAppBarLink} to="../newExam">Add new exam</Link> 
                        </Button>
                    </Box>
                    <Outlet/>
                </Container>
        ); 
}
// postavi da id novog ispita bude unikatan !!

// postavi add new exam da bude obicni button, zbog stila
