import {
    Box,
    MenuItem,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    InputLabel,
    Select,
    FormControl,
    Avatar,
} from "@mui/material";
import React, { useState } from "react";
import NavbarLect from "../components/NavbarLect";
import axios from "axios";
import { Api } from "./api/api";
import NavbarStu from "../components/NavbarStu";

interface LecturerData {
    lect_roomnum: String;
    avatar: String;
    uid: any;


}

export default function LecturerComponent() {



    const [rid, setRid] = React.useState<number>(0);
    const [datalecturer, setdataLecturer] = React.useState<any>(null);
    const [isEdit, setIsEdit] = React.useState(false);
    const [editData, setEditData] = React.useState<LecturerData>({
        lect_roomnum: "",
        avatar: "",
        uid: "",

    });
    const [user_name, setUsername] = React.useState("");
    const [user_email, setUserEmail] = React.useState("");
    const [lect_roomnum, setLectRoomum] = React.useState("");
    const [avatar, setAvatar] = React.useState("");
    const [uid, setuid] = React.useState("");
    React.useEffect(() => {
        setRid(Number(localStorage.getItem("rid")));
    }, []);

    React.useEffect(() => {
        axios
            .get<any[]>(`http://localhost:4000/api/lecturer?id=${rid}`)
            .then(function (response) {
                setUsername(response.data[0].user_name);
                setUserEmail(response.data[0].user_email);
                setLectRoomum(response.data[0].lect_roomnum);
                setAvatar(response.data[0].avatar);
                setuid(response.data[0].uid);
                setdataLecturer(response.data[0]);
                console.log(response.data[0]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [rid]);

    const handleUpdate = () => {
        const newData = {
            lect_roomnum: lect_roomnum,
            avatar: avatar,
            uid: {
                user_name: user_name,
                user_email: user_email,
            },
        };
        axios
            .put(`http://localhost:4000/api/lecturer/${rid}`, newData)
            .then(function (response) {
                console.log(response.data);
                //window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(newData);
    };

    const [files, setFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const upload_single_image = async (e: any) => {
        const file = e.target.files[0];
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"]; // ประเภทไฟล์รูปภาพที่ยอมรับ
        if (validImageTypes.includes(file.type)) { // ตรวจสอบว่าเป็นไฟล์รูปภาพหรือไม่
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "student");
            axios.post("https://api.cloudinary.com/v1_1/drynd8ioj/image/upload", data)
                .then((res) => {
                    setImageUrls([res.data.secure_url]);
                    setAvatar(res.data.secure_url);
                });
        } else {
            alert("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
        }
    }
    return (
        <Box component="form" noValidate autoComplete="off">
            <NavbarLect />
            <Card sx={{ width: 844, height: 512, ml: 55, backgroundColor: "#368980" }}>
                <CardContent>
                    {datalecturer && (
                        <Grid container>
                            <Grid item xs={3}>
                                {imageUrls && (
                                    <div>
                                        <Avatar
                                            sx={{ width: 100, height: 100 }}
                                            src={`${imageUrls.length > 0 ? imageUrls[0] : datalecturer.avatar}`}
                                            alt="avatar"
                                        />
                                        <Button variant="contained" component="label" disabled={!isEdit}>
                                            Upload
                                            <input
                                                hidden
                                                accept=".jpg,.jpeg,.png*"
                                                id="fileInput"
                                                onChange={upload_single_image}
                                                multiple
                                                type="file"
                                                style={{ marginTop: "10px" }}
                                            />
                                        </Button>
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled={!isEdit}
                                    onChange={(e) => setUsername((e.target.value))}
                                    defaultValue={datalecturer.user_name}
                                    InputProps={{ style: { color: '#FFFFFF' } }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled={!isEdit}
                                    onChange={(e) => setUserEmail((e.target.value))}
                                    defaultValue={datalecturer.user_email}
                                    InputProps={{ style: { color: '#FFFFFF' } }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    disabled={!isEdit}
                                    onChange={(e) => setLectRoomum((e.target.value))}
                                    value={lect_roomnum}
                                    InputProps={{ style: { color: '#FFFFFF' } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" onClick={() => setIsEdit(!isEdit)}>
                                    {isEdit ? "ยกเลิก" : "แก้ไข"}
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        {isEdit && (
                            <Button variant="contained" onClick={() => handleUpdate()}>
                                บันทึกการแก้ไข
                            </Button>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
