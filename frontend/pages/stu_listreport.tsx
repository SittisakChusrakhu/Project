import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  styled,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tabs,
  Tab
} from "@mui/material";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import NavbarStu from "../components/NavbarStu";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Api } from "./api/api";
import dayjs, { Dayjs } from "dayjs";

interface Problem {
  id: string;
  pro_title: string;
  pro_type: string;
  pro_desc: string;
  pro_image: string;
  lect_id: string;
  sid: string;
  datetime: string;
  course: string;
  status: string;
}




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#368980',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: 280,
  width: 300
}));

export default function StudentComponent() {

  const [modelproblem, setmodelproblem] = React.useState<Problem[]>([]);
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    const lid = localStorage.getItem("rid");
    console.log(lid);

    var config = {
      method: "get",
      url: `http://localhost:4000/api/user/problem/?sid=${lid}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setmodelproblem(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);



  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const deleteproblem = async (pid: any) => {
    Api.delete(`/problem/${pid}`).then((response) => {
      toast.error('ลบรายงานปัญหาของคุณแล้ว', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const lid = localStorage.getItem("rid");
      var config = {
        method: "get",
        url: `http://localhost:4000/api/user/problem/?sid=${lid}`,
        headers: {},
      };

      axios(config)
        .then(function (response: any) {
          setmodelproblem(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      //setTimeout(location.reload.bind(location), 1000);
    });

  };

  const [Id, setId] = React.useState();

  const [dialogData, setDialogData] = React.useState<any>({});
  const [openDialog, setOpenDialog] = React.useState(false);

  const openModal = (id: any) => {
    setDialogData(modelproblem.find((i: any) => i.id === id));
    setOpenDialog(true);
  };

  const [openEdit, setOpenEdit] = React.useState(false);
  const [editData, setEditData] = React.useState<any>();
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [courseData, setCourseData] = React.useState("");
  const handleEdit = (id: any, data: any) => {
    setId(id);
    setOpenEdit(true);
    setEditData(data);
  };



  const onUpdate = () => {
    Api.put(`/problem/${Id}`, {
      pro_title: title,
      pro_type: type,
      pro_desc: details,
      course: courseData,
    }).then((res) => {
      setTimeout(location.reload.bind(location), 1000);
    });
  };

  return (
    <Box>
      <ToastContainer />
      <NavbarStu />
      <Card
        sx={{
          width: 1100,
          ml: 40,
        }}>
        <Box sx={{ width: '100%' }}>
        </Box >
      </Card>
    </Box>
  );
}