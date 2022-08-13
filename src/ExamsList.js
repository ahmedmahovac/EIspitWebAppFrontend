import { Box, Button, ButtonGroup, Container, Typography, IconButton, Tooltip } from "@mui/material";
import React, { Component, useState, useEffect } from "react";


import {makeStyles} from "@mui/styles";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import Switch from "react-switch";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TablePagination from '@mui/material/TablePagination';

import SearchBar from "material-ui-search-bar";
import {Link} from 'react-router-dom';


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

        const [searchBarValue, setSearchBarValue] = useState(""); 
        const [searchedExams, setsearchedExams] = useState(exams);

        const [orderDirectionCreatedTime, setOrderDirectionCreatedTime] = useState("asc");
        const [orderDirectionTitle, setOrderDirectionTitle] = useState("asc");



        const sortArray = (id, arr, orderBy) => {
            switch (orderBy) {
              case "asc":
              default:
                return arr.sort((a, b) => {
                    if(id=="cellCreatedTime") {
                        return a.createdTime > b.createdTime ? 1 : b.createdTime > a.createdTime ? -1 : 0
                    }
                    else if(id=="cellTitle") {
                        return a.examTitle > b.examTitle ? 1 : b.examTitle > a.examTitle ? -1 : 0
                    }
                }
                );
              case "desc":
                return arr.sort((a, b) => {
                    if(id=="cellCreatedTime")
                    return a.createdTime < b.createdTime ? 1 : b.createdTime < a.createdTime ? -1 : 0
                    else if(id=="cellTitle")
                    return a.examTitle < b.examTitle ? 1 : b.examTitle < a.examTitle ? -1 : 0
                }
                );
            }
          };



          
        useEffect(()=>{
            console.log("promijenjeni exams");
            onSearchBarChange(searchBarValue);
        }, [exams]);

        useEffect(()=>{
            console.log("promijenjen orderDirectionCreatedTime");
        }, [orderDirectionCreatedTime]);


        useEffect(()=>{
            console.log("promijenjen orderDirectionTitle");
        }, [orderDirectionTitle]);

        const handleSortRequest = (event) => {
            let id = event.currentTarget.id;
            switch(id){
                case "cellCreatedTime": 
                default:
                setExams(sortArray(id, exams, orderDirectionCreatedTime));
                setOrderDirectionCreatedTime(orderDirectionCreatedTime === "asc" ? "desc" : "asc");
                break;
                case "cellTitle": 
                setExams(sortArray(id, exams, orderDirectionTitle));
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
                            <SearchBar
                                onChange={onSearchBarChange}
                                value={searchBarValue}
                                placeholder="Search by title"
                                onCancelSearch={onCancelSearch}
                            />
                            <Table aria-label="simple table">
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
                                                    <DeleteIcon color="primary" fontSize="large"/>
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
                        <Button variant="contained" onClick={(event)=>{
                            setExams((prevQuestions)=>{
                                return [...prevQuestions, {
                                    id: prevQuestions.length+1,
                                    examTitle: "Ispit " + (prevQuestions.length+1),
                                    createdTime: new Date("2022-05-12T23:50:21.817Z"),
                                    examKey: "xdaswdD3",
                                    open: false
                                }];
                            })
                        }} sx={{
                            marginTop: 2,
                            justifySelf: "center",
                            backgroundColor: "#22c1c3"
                        }}>
                            <Link className="ButtonAppBarLink" to="../newExam">Add new exam</Link> 
                        </Button>
                    </Box>
                </Container>
        ); 
}
// postavi da id novog ispita bude unikatan !!
