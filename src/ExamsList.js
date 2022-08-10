import { Box, Button, Container, Typography } from "@mui/material";
import {Datatable} from "@o2xp/react-datatable";
import React, { Component, useState } from "react";
import {
    FreeBreakfast as CoffeeIcon,
    CallSplit as CallSplitIcon
  } from "@material-ui/icons";

  import EditIcon from '@mui/icons-material/Edit';
  import Switch from "react-switch";

const handleOpenExamChange = (event) => {

}


export default function ExamsList() {

        const [questions, setQuestions] = useState([{
            examTitle: "Ispit 1",
            createdTime: "12.6.2000",
            examKey: "xdaswdD1",
            open: false
        },
        {
            examTitle: "Ispit 2",
            createdTime: "12.6.2000",
            examKey: "xdaswdD2",
            open: true
        },
        {
            examTitle: "Ispit 3",
            createdTime: "12.6.2000",
            examKey: "xdaswdD3",
            open: false
        }]);


        let options  = {
            keyColumn: 'examTitle',
            dimensions: {
                datatable: {
                    width: "90%",
                    height: "40%"
                },
                row: {
                  height: "60px"
                }
              },
            data: {
                columns: [ 
                    {
                        id: "examTitle",
                        label: "Exam title",
                        colSize: "150px"
                    },
                    {
                        id: "createdTime",
                        label: "Created",
                        colSize: "50px",
                        editable: false,
                        dataType: "dateTime",
                        dateFormatIn: "YYYY-MM-DDTHH:mm",
                        dateFormatOut: "YYYY-MM-DDTHH:mm",
                    },
                    {
                        id: "examKey",
                        label: "Exam key",
                        colSize: "80px"
                    },
                    {
                        id: "open",
                        label: "Open",
                        colSize: "50px",
                        editable: false,
                        dataType: "boolean",
                        inputType: "checkbox"
                    }
                ],
                rows: questions
            },
            title : "Exam list",
            features: {
                canDelete: true,
                canSearch: true,
                canFilter: true,
                canSelectRow: true,
                isUpdatingRows: true,
                additionalIcons: [
                    {
                      title: "Coffee",
                      icon: <CoffeeIcon color="primary" />,
                      onClick: () => alert("Coffee Time!")
                    }
                  ],
                  selectionIcons: [
                    {
                      title: "Selected Rows",
                      icon: <CallSplitIcon color="primary" />,
                      onClick: rows => console.log(rows)
                    }
                  ]
            }
        }

    

       const buildCustomTableBodyCell = ({ cellVal, column, rowId }) => {
          let val;
          switch (column.dataType) {
            case "boolean":
              val =  
              <div style={{textAlign: "center"}}>
                <Switch
                checked={cellVal}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                onChange={handleOpenExamChange}
                />
              </div>
              break;
            default:
              val = <div style={{ color: "blue" }}>{cellVal}</div>;
              break;
          }
          return val;
        }
        return(
                <Container sx={{
                    width: "100%", 
                    height: "100%"
                }}>
                    <Box sx={{
                        marginTop: 15,
                        marginBottom: 15,
                        padding: 2
                    }}>
                        <Datatable options={options} CustomTableBodyCell={buildCustomTableBodyCell}></Datatable>
                        <Button textAlign="center" variant="contained" onClick={(event)=>{
                            setQuestions((prevQuestions)=>{
                                console.log("prosla pitanja: ");
                                prevQuestions.map((item)=>console.log(item.examTitle));
                                return [...prevQuestions, {
                                    examTitle: "Ispit " + (prevQuestions.length + 1),
                                    createdTime: "12.6.2000",
                                    examKey: "xdaswdD3",
                                    open: false
                                }];
                            });
                        }}>
                            Add exam    
                        </Button>
                        {questions.map(item => <div>{item.examTitle}</div>)}
                    </Box>
                </Container>
        ); 
}
