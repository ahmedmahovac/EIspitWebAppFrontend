import { Box, Collapse, Container, FormControlLabel, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Switch, TextField, Typography } from '@mui/material';
import React, { createContext, useState } from 'react';
import { Dimensions } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';
import StudentInformation from './StudentInformation';
import TimerIcon from '@mui/icons-material/Timer';

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



    const [showMonitoringOptions, setShowMonitoringOptions] = useState(false);

    const handleShowMonitoringOptionsChange = (event) => {
        setShowMonitoringOptions(event.target.checked);
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
                            <Grid >
                                <Paper>
                                    <TimerIcon></TimerIcon>
                                    <Typography>Add additional time</Typography>
                                </Paper>
                            </Grid>
                            <Grid>
                                <Paper>
                                    <TimerIcon></TimerIcon>
                                    <Typography>Add additional time</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Collapse>

                </Paper>
            </Container>
        </ExamContext.Provider>
    );
}

