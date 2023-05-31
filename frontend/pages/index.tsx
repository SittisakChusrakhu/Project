import {
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import router from "next/router";
import React from "react";
import { Api } from "./api/api"

export default function BasicCard() {

  const [data, setData] = React.useState({
    user_email: "",
    user_password: "",
  });
  
  const onLogin = () => {
    Api.post("/login", data)
      .then((res) => {
        localStorage.setItem("Logged", res.data);
        localStorage.setItem("rid", res.data.id);
        if (res.data.stu_id) {
          router.push("/stu_home");
        } else if (res.data.lect_roomnum) {
          router.push("/lect_home");
        } else if (res.data.role_id === 3) {
          router.push("/admin");
        } else {
          // แสดงข้อความผิดพลาดหากไม่พบข้อมูลที่เหมาะสม
          alert("ไม่พบข้อมูลที่เหมาะสม");
        }
      })
      .catch((error) => {
        // แสดงข้อความผิดพลาดเมื่อส่งข้อมูลผิดพลาด
        alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
      });
  };
  
  React.useEffect(() => {
    if (localStorage.getItem("Logged")) {
      router.push("/");
    }
  }, []);
  
  const handleData = (event:any) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  return (

    <Card sx={{
      width: 600, mx: 'auto', mt: 20,
      border: 'none'
    }}>
      <CardContent>
        <Typography sx={{
          fontSize: 26,
          textAlign: 'center',
          mb: 5,
        }} color="text.secondary" gutterBottom>
          Log-in to your account
        </Typography>
        <CardContent sx={{
          width: 450,
          mx: 'auto',
          backgroundColor: '#368980'
          , borderRadius: 3
        }}>
          {/* email */}
          <TextField id="outlined-basic"
            label="E-mail address"
            variant="outlined"
            name="user_email"
            size="small"
            onChange={handleData}
            fullWidth
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: 2,
              mb: 3
            }} />
          <br />

          {/* password */}
          <TextField id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            name="user_password"
            onChange={handleData}
            type="password"
            fullWidth
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: 2,
              mb: 3
            }} />

          {/* ปุ่ม */}
          <Button variant="contained"
            color="primary"
            onClick={onLogin}
            sx={{ width: '100%' }}>
            Login
          </Button>
          <Button variant="text"
            sx={{ textAlign: 'center', color: '#FFFFFF' }}
            href="/register">
            register
          </Button>
        </CardContent>
      </CardContent>
    </Card>
  );
}

