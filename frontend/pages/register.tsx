import {
    Paper,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

import router from "next/router";
import React from "react";
import { Api } from "./api/api"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function register() {
    const inputStyle = { backgroundColor: "white", mt: 2, boxShadow: 5, width: "30vw" }
    const [data, setData] = React.useState<any>({
        user_name: "",
        user_email: "",
        user_password: "",
        role_id: 0,
    });
    const [student, setstudent] = React.useState<any>({
        stu_id: "",
        stu_major: "",
        stu_grade: "",
        stu_faculty: "",
        avatar: "",
        user_id: "",
    });

    const [lecturer, setlecturer] = React.useState<any>({
        lect_roomnum: "",
        avatar: "",
        user_id: "",
    });

    const goToLogin = () => router.push("/")
    const handleSubmitstu = async () => {
        console.log(student)
        if (Object.values(student).includes("")) {
            alert("กรุณากรอกข้อมูลให้ครบ");
        } else {
            console.log(student);
            const res = await Api.post("/student", student);
            if (res.status == 200) {
                toast.success("คุณลงทะเบียนเรียบร้อยแล้ว", {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setTimeout(goToLogin, 3000)
                ;
            }
        }
    }

    const handleSubmitlect = async () => {
        console.log(lecturer)
        if (Object.values(lecturer).includes("")) {
            alert("กรุณากรอกข้อมูลให้ครบ");
        } else {
            const res = await Api.post("/lecturer", lecturer);
            if (res.status == 200) {
                toast.success("คุณลงทะเบียนเรียบร้อยแล้ว", {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  setTimeout(goToLogin, 3000)
                ;
            }
        }
    }



    const [mailValid, setMailValid] = React.useState(false);
    const [file, setFile] = React.useState<any>();

    const [studentOpen, setStudentOpen] = React.useState(false);
    const [lecturerOpen, setlecturerOpen] = React.useState(false);

    const handleMail = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.match(/.+@ubu.ac.th/g)) {
            setMailValid(false);
            setData({ ...data, user_email: event.target.value });
        } else {
            setMailValid(true);
        }
    }

    const handleChangestu = (event: React.ChangeEvent<HTMLInputElement>) => {
        setstudent({ ...student, [event.target.name]: event.target.value });
    }

    const handleChangelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setlecturer({ ...lecturer, [event.target.name]: event.target.value });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, role_id: Number(event.target.value) });
    }

    const handleSubmit = async () => {
        if (Object.values(data).includes("")) {
            alert("กรุณากรอกข้อมูลให้ครบ");
        } else {
            console.log(data);
            const res = await Api.post("/register", data);
            console.log(res);
            if (data.role_id === 1) {
                setstudent({ ...student, user_id: res.data.id });
                setStudentOpen(true);
            } else if (data.role_id === 2) {
                setlecturer({ ...lecturer, user_id: res.data.id });
                setlecturerOpen(true);
            }
        }
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const img = event.target.files![0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setFile(e.target!.result)
            setstudent({ ...student, avatar: e.target!.result });
        };
        reader.readAsDataURL(img);
    }

    const handleUploadlect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const img = event.target.files![0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setFile(e.target!.result)
            setlecturer({ ...lecturer, avatar: e.target!.result });
        };
        reader.readAsDataURL(img);
    }

    return (<>
        <Paper elevation={3} sx={{ width: "40vw", mx: "auto", height: "70vh", mt: 10, backgroundColor: "#00796B", textAlign: "center" }}>
        <ToastContainer />
            <br />
            <Typography variant="h4" component="div" sx={{ color: "white" }}>
                สมัครสมาชิก
            </Typography>
            <Typography variant="h6" component="div" sx={{ color: "white" }}>
                รายละเอียดพื้นฐาน
            </Typography>
            <TextField id="outlined-basic" label="Username" variant="filled" name="user_name" onChange={handleChange} size="small" sx={inputStyle} /><br />
            <TextField id="outlined-basic" label="Email" error={mailValid} variant="filled" onChange={handleMail} helperText={mailValid && 'email much be ubu.ac.th'} size="small" sx={inputStyle} /><br />
            <TextField id="outlined-basic" label="Password" variant="filled" onChange={handleChange} name="user_password" type="password" size="small" sx={inputStyle} /><br />
            <TextField id="outlined-basic" label="Password Matching" variant="filled" size="small" type="password" sx={inputStyle} />
            <FormControl sx={{ mt: 2, backgroundColor: "white", boxShadow: 5 }}>
                <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="role"
                    onChange={handleRole}
                >
                    <FormControlLabel value="1" sx={{ ml: 0.5 }} control={<Radio />} label="Student" />
                    <FormControlLabel value="2" sx={{ ml: 0.5 }} control={<Radio />} label="Teacher" />
                </RadioGroup>
            </FormControl><br />
            <Button variant="contained" sx={{ mt: 2, width: "10vw", fontSize: "1.2rem" }} onClick={handleSubmit}>ลงทะเบียน</Button>
            <Button variant="contained" sx={{ mt: 2, width: "10vw", fontSize: "1.2rem" }} href="http://localhost:3000/" >Log-in</Button>
        </Paper>

        <Dialog open={studentOpen} >
            <DialogTitle>รายละเอียด นักเรียน</DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
                {file && <img src={file} height="200" />}
                <TextField
                    margin="dense"
                    id="name"
                    name="stu_id"
                    label=" รหัสนักศึกษา"
                    fullWidth
                    variant="standard"
                    onChange={handleChangestu}
                />
                <TextField
                    margin="dense"
                    id="name"
                    name="stu_major"
                    label="สาขา"
                    fullWidth
                    variant="standard"
                    onChange={handleChangestu}
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="คณะ"
                    name="stu_faculty"

                    fullWidth
                    variant="standard"
                    onChange={handleChangestu}
                />
                <FormControl sx={{ mt: 2 }}>
                    <FormLabel id="demo-row-radio-buttons-group-label">ชั้นปี</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="stu_grade" onChange={handleChangestu}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                        <FormControlLabel value="4" control={<Radio />} label="4" />
                    </RadioGroup>
                </FormControl><br />
                <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" name="avatar" onChange={handleUpload} multiple type="file" />
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmitstu}>ยืนยัน</Button>
            </DialogActions>
        </Dialog>



        <Dialog open={lecturerOpen}>
            <DialogTitle>รายละเอียด อาจารย์</DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
                {file && <img src={file} height="200" />}
                <TextField
                    margin="dense"
                    id="name"
                    name="lect_roomnum"
                    label="เลขห้อง"
                    fullWidth
                    variant="standard"
                    onChange={handleChangelect}
                />
                <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" name="avatar" onChange={handleUploadlect} multiple type="file" />
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmitlect}>ยืนยัน</Button>
            </DialogActions>
        </Dialog></>
    );
}

