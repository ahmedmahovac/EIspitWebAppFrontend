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

import styles from './ButtonAppBar.module.css';

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


        // objedini sve stateove u jedan objekat!!

       /*

        const [exams, setExams] = useState([{
            id: 1,
            examTitle: "Ispit 1", // i po ovome sortirati ima smisla
            createdTime: new Date("2020-05-12T23:50:21.817Z"), // po ovome sortirati
            examKey: "xdaswdD1",
            open: false
        },
        {
            id: 2,
            examTitle: "Ispit 2",
            createdTime: new Date("2020-05-12T23:50:21.817Z"),
            examKey: "xdaswdD2",
            open: false
        },
        {
            id: 3,
            examTitle: "Ispit 3",
            createdTime: new Date("2020-05-12T23:50:21.817Z"),
            examKey: "xdaswdD3",
            open: true
        }]);
        */

        const navigate = useNavigate();

        const {exams, setExams} = useContext(TeacherContext);

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
           let updatedQuestions = exams.map((item)=>{
                                if(item.id == id) {
                                    return {...item, open: value}
                                }
                                else return item
                            });
            setExams(updatedQuestions);
        }

// promijenit id-ove ovih ikona, jer vec takve postoje
        const onClickHandlerDelete = (event) => {
            let id = event.currentTarget.id;
            let updatedQuestions = exams.filter((item)=>{
                return item.id != id;
            });   
            setExams(updatedQuestions);

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
                                {searchedExams.map((row) => ( // inace se ne bi ispravno prikazivalo , ne bi se osvjezilo searcQ nakon dodavanja ispita
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
                                    <TableCell align="right">{row.createdTime.toLocaleDateString()}</TableCell>
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
