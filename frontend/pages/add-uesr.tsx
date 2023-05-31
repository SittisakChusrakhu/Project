import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer ,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import NavbarLayout from "../components/NavbarLayout";
import axios from 'axios'
import { Api } from "./api/api"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function BasicCard() {
  var config = {
    method: 'get',
    url: 'http://localhost:4000/api/student/all',
    headers: {}

  };

  
  const deletestudent = async (sid:any,uid:any) => {
    console.log("yyy")
    Api.delete(`/student/${sid}/${uid}`).then((response)=>{
      toast.error('ลบผู้ใช้งานแล้ว', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }).then((response) => {
      setTimeout(location.reload.bind(location), 1000);
    });
    
  }
    
  const [datat, setDatat] = React.useState([])
  React.useEffect(() => {
    axios(config).then(function (response: any) {
      setDatat(response.data)
    })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  return (
    <Box>
      <ToastContainer />
      <NavbarLayout />
      <Card sx={{
        width: 1100,
        ml: 40
      }}>
        <CardContent>
          <div style={{ height: 475, width: 'auto' }}>
          <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> รหัสนักศึกษา</TableCell>
            <TableCell >ชื่อ - นามสกุล</TableCell>
            <TableCell >อีเมล์</TableCell>
            <TableCell >ชั้นปี</TableCell>
            <TableCell >สาขา</TableCell>
            <TableCell >คณะ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datat.map((row:any) => (
            <TableRow
              key={row.id}>
              <TableCell >{row.stu_id}</TableCell>
              <TableCell >{row.username}</TableCell>
              <TableCell >{row.stu_email}</TableCell>
              <TableCell >{row.stu_grade}</TableCell>
              <TableCell >{row.stu_faculty}</TableCell>
              <TableCell >{row.stu_major}</TableCell>
              <TableCell ><Button variant="contained" color="warning" onClick={e=> deletestudent(row.id,row.uid)} >
            ลบชื่อนักศึกษา
          </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
          <br />
          
        </CardContent>
      </Card>
    </Box>


  );
}