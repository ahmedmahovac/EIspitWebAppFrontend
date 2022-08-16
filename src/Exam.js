import { Box, Container, List, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material';
import React, { createContext, useState } from 'react';
import { Dimensions } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import StudentInformation from './StudentInformation';

export const ExamContext = createContext();

export default function Exam() {


    const [students, setStudents] = useState([{firstName: "ahmed", lastName: "mahovac", email: "amahovac1@etf.unsa.ba", index: "18735"},
    {firstName: "ahmed2", lastName: "mahovac", email: "amahovac1@etf.unsa.ba", index: "18735"},
    {firstName: "ahmed3", lastName: "mahovac", email: "amahovac1@etf.unsa.ba", index: "18735"},
    {firstName: "ahmed4", lastName: "mahovac", email: "amahovac1@etf.unsa.ba", index: "18735"},
    {firstName: "ahmed5", lastName: "mahovac", email: "amahovac1@etf.unsa.ba", index: "18735"}]); 
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [searchNameValue, setSearchNameValue] = useState("");

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    }

    return(
        <ExamContext.Provider value={{students, selectedIndex}}>
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
                        <TextField autoFocus value={searchNameValue} label="search name" sx={{m: 1, padding: "5px"}}></TextField>
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
                                    <ListItemText primary="Student" />
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
                        <StudentInformation/>
                    </Paper>
                </Box>
            </Container>
        </ExamContext.Provider>
    );
}

