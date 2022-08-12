import { Component } from 'react';
import { Box, Container, Typography, Tooltip, Button, IconButton, TextField} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';


export default function NewExam() {
    return(
        <Container maxWidth="xl">
            <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 5,
                        marginBottom: 5,
                        padding: 2
            }}>
                <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 1,
                        marginBottom: 1,
                        padding: 2
                    }}>
                    <Box fullWidth sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#96ccff"
                    }}>
                        <Typography variant='h3'>
                            Add exam title
                        </Typography>
                        <Tooltip title="Enter the title of the exam. " placement='right' arrow>
                            <IconButton>
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <TextField fullWidth></TextField>
                </Box>     
                <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 1,
                        marginBottom: 1,
                        padding: 2
                    }}>
                        <Typography variant='h3' sx={{
                            backgroundColor: "#96ccff"
                        }}>
                            Add questions
                        </Typography>
                </Box>
            </Box>
        </Container>
    );
}

