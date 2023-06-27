import { AssignmentLate, PeopleAlt } from "@mui/icons-material";
import { Box, Typography, Card, CardContent, Grid, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarLayout from "../components/NavbarLayout";

export default function BasicCard() {
  const [problemCount, setProblemCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [lecturerCount, setLecturerCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response1 = await axios.get("http://localhost:4000/api/user/problem");
      const response2 = await axios.get("http://localhost:4000/api/student/all");
      const response3 = await axios.get("http://localhost:4000/api/lecturer/all");

      setProblemCount(response1.data.length);
      setStudentCount(response2.data.length);
      setLecturerCount(response3.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("problemCount:", problemCount);
  console.log("studentCount:", studentCount);
  console.log("lecturerCount:", lecturerCount);

  return (
    <Box>
      <NavbarLayout />
      <Card sx={{ width: 1100, ml: 40 }}>
        <CardContent>
          <Typography style={{ textAlign: 'center' }}>
            จำนวนผู้ใช้
          </Typography>
          <Grid container spacing={12}>
            <Grid item xs={4}>
              <Paper
                sx={{
                  backgroundColor: '#368980',
                  padding: '8px',
                  textAlign: 'center',
                  color: '#FFF',
                  height: 150,
                  width: 300,
                }}
              >
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item xs={3}>
                    <Typography sx={{ mt: 3 }}>{studentCount} คน</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <PeopleAlt sx={{ fontSize: 80, color: '#FFF' }} />
                  </Grid>
                </Grid>
                <br />
                <Typography>Student</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                sx={{
                  backgroundColor: '#368980',
                  padding: '8px',
                  textAlign: 'center',
                  color: '#FFF',
                  height: 150,
                  width: 300,
                }}
              >
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item xs={3}>
                    <Typography sx={{ mt: 3 }}>{lecturerCount} คน</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <PeopleAlt sx={{ fontSize: 80, color: '#FFF' }} />
                  </Grid>
                </Grid>
                <br />
                <Typography>Lecturer</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                sx={{
                  backgroundColor: '#368980',
                  padding: '8px',
                  textAlign: 'center',
                  color: '#FFF',
                  height: 150,
                  width: 300,
                }}
              >
                <Grid container sx={{ justifyContent: 'center' }}>
                  <Grid item xs={4}>
                    <Typography sx={{ mt: 3 }}>{problemCount} รายงาน</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <AssignmentLate sx={{ fontSize: 80, color: '#FFF' }} />
                  </Grid>
                </Grid>
                <br />
                <Typography>Report</Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
