import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import NavbarStu from "../components/NavbarStu";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import "dayjs/locale/th"
import Avatar from '@mui/material/Avatar';




interface StudentData {
  stu_id: String;
  stu_grade: string;
  stu_faculty: string;
  stu_major: string;
  avatar: string;
  uid: any;


}

export default function StudentComponent() {
  const [rid, setRid] = React.useState<number>(0);
  const [datastudent, setdatastudent] = React.useState<any>(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [editData, setEditData] = React.useState<StudentData>({
    stu_id: "",
    stu_grade: "",
    stu_faculty: "",
    stu_major: "",
    avatar: "",
    uid: "",
  });
  const [username, setUsername] = React.useState("");
  const [stuId, setStuId] = React.useState("");
  const [stuEmail, setStuEmail] = React.useState("");
  const [stuGrade, setStuGrade] = React.useState("");
  const [stuFaculty, setStuFaculty] = React.useState("");
  const [stuMajor, setStuMajor] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [uid, setuid] = React.useState("");

  React.useEffect(() => {
    setRid(Number(localStorage.getItem("rid")));
  }, []);

  React.useEffect(() => {
    axios
      .get<any[]>(`http://localhost:4000/api/student?id=${rid}`)
      .then(function (response) {
        setUsername(response.data[0].username);
        setStuEmail(response.data[0].stuEmail);
        setStuId(response.data[0].stuId);
        setStuGrade(response.data[0].stuGrade);
        setStuFaculty(response.data[0].stuGrade);
        setStuMajor(response.data[0].stuMajor);
        setAvatar(response.data[0].avatar);
        setuid(response.data[0].uid);
        setdatastudent(response.data[0]);
        console.log(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [rid]);


  const handleUpdate = () => {
    const newData: StudentData = {
      stu_id: stuId,
      stu_grade: stuGrade,
      stu_faculty: stuFaculty,
      stu_major: stuMajor,
      avatar: avatar,
      uid: {
        username: username,
        stu_email: stuEmail,
      }
    };

    axios
      .put(`http://localhost:4000/api/student/${rid}`, newData)
      .then(function (response) {
        console.log(response.data);
        //window.location.reload();

      })
      .catch(function (error) {
        console.log(error);
      }); console.log(newData);
  }


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
  };



  return (
    <Box component="form" noValidate autoComplete="off">
      <NavbarStu />
      <Card sx={{ width: 844, height: 512, ml: 55, backgroundColor: "#368980" }}>
        <CardContent>
          {datastudent && (
            <Grid container>
              <Grid item xs={3}>
                {imageUrls && (
                  <div>
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      src={`${imageUrls.length > 0 ? imageUrls[0] : datastudent.avatar}`}
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
                  onChange={(e) => setStuId((e.target.value))}
                  defaultValue={datastudent.stu_id}
                  InputProps={{ style: { color: '#FFFFFF' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  disabled={!isEdit}
                  onChange={(e) => setUsername((e.target.value))}
                  defaultValue={datastudent.username}
                  InputProps={{ style: { color: '#FFFFFF' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  disabled={!isEdit}
                  onChange={(e) => setStuEmail((e.target.value))}
                  defaultValue={datastudent.stu_email}
                  InputProps={{ style: { color: '#FFFFFF' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  disabled={!isEdit}
                  onChange={(e) => setStuGrade((e.target.value))}
                  defaultValue={datastudent.stu_grade}
                  InputProps={{ style: { color: '#FFFFFF' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  disabled={!isEdit}
                  onChange={(e) => setStuFaculty((e.target.value))}
                  defaultValue={datastudent.stu_faculty}
                  InputProps={{ style: { color: '#FFFFFF' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  disabled={!isEdit}
                  onChange={(e) => setStuMajor((e.target.value))}
                  defaultValue={datastudent.stu_major}
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

